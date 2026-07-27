# Locale leak — the English page renders as a Thai/English hybrid

Reported from the browser 2026-07-27. Self-contained spec: everything needed
to fix this is below.

## Reproduce

1. Open `http://localhost:3000/culture/th/koreanthing.html` (fully Thai).
2. Type `찜질방` in the header search box.
3. The dropdown shows **one result, in English**.
4. Click it → lands on `http://localhost:3000/culture/koreanthing.html#jjimjilbang`
   — the **English** URL.
5. That page renders a **mixture**: Thai nav (`เรียนรู้`, `K-วัฒนธรรม`), Thai
   sidebar heading, Thai rail (`คำศัพท์ประจำวัน`, `ประวัติ K-Pop`), but English
   body prose, English sidebar links (`K-Pop`, `Minor Protection`, `Fast
   Delivery`), and an English "Classroom" gloss.

## Root cause — three separate defects

### A. `lang-core.js` applies the stored language to a page that declares a different one
This is what produces the hybrid, and it is the important one.

`js/lang-core.js` resolves the language **twice**, and both paths prefer
`localStorage` over the page's own `<html lang>`:

```js
// init(), ~line 25 — an explicit lang="en" falls through to the else
const htmlLang = (document.documentElement.getAttribute('lang') || '').toLowerCase();
if (htmlLang === 'zh-tw') _lang = 'zh-tw';
else if (htmlLang === 'ja') _lang = 'ja';
…
else _lang = localStorage.getItem(LS_KEY) || 'en';   // ← lang="en" lands HERE
if (_lang !== 'en') _apply(_lang);                    // ← translates an English page

// bootstrap, ~line 247 — localStorage wins outright
var lang = localStorage.getItem('ks-lang')
  || (document.documentElement.getAttribute('lang') || '').toLowerCase() || 'en';
```

`<html lang="en">` is an explicit statement that the page **is** English, but
the code treats `"en"` as "unknown — use the stored preference". With
`ks-lang=th`, the Thai pack is loaded and applied over the English page: every
string that exists in the Thai dict flips to Thai, everything else stays
English. Hence the hybrid.

**Scope is much wider than search.** Any arrival at an English URL by a user
whose stored language is not English hits this — a bookmark, a Google result,
a hardcoded link, the sitemap. Search is just how it was found.

⚠️ **This got worse on 2026-07-26.** The Thai UI pack went from 215 → 645 keys
(`docs/writing-typing/qa-triage-results.md`), so roughly three times as much
of an English page now flips to Thai. The defect predates that change; the
change made it obvious.

### B. Search never inserts the locale into a result URL
`js/app.js`:

```js
function searchResolveUrl(url) {
  return '/' + url;          // culture/koreanthing.html → /culture/koreanthing.html
}
```

The lazily-loaded **word** index does localize, but only for `learn/` paths:

```js
url: lang !== 'en' ? e.u.replace(/^learn\//, 'learn/' + lang + '/') : e.u
```

The static `window.SEARCH_INDEX` (js/app.js ~line 650, **111 entries** across
home/learn/culture/travel) is never localized at all, so every culture and
travel hit sends a Thai reader to the English page.

### C. Static `SEARCH_INDEX` titles and descriptions are English-only
111 titles and 109 descriptions, hardcoded English. Only 4–6 of the titles
happen to exist as UI-pack keys; **zero** descriptions do. That is why the
dropdown was in English on a Thai page.

## Measurements that constrain the fix

| fact | value | why it matters |
|---|--:|---|
| English pages | 45 | every one of them can leak |
| …with all 8 locale mirrors | **45 / 45** | honoring `<html lang>` strands nothing |
| static SEARCH_INDEX entries | 111 | the URL fix is mechanical |
| …with mirrors in all 8 locales | **111 / 111** | every result URL can be localized |
| titles / descs needing translation | 111 / 109 | ≈220 × 8 ≈ **1,760** strings |
| titles already in a UI pack | 4–6 | reuse is negligible; they need translating |

Mirror paths follow one rule: `index.html` → `<loc>/index.html`, and
`<section>/<page>` → `<section>/<loc>/<page>`.

## The fix

### Step 1 — stop the leak (do this first; it is small and self-contained)
In `js/lang-core.js`, make a declared `<html lang>` **authoritative in both
places**:

- `init()`: if `<html lang>` is any known locale **including `en`**, use it and
  do not consult `localStorage`. Only fall back to `localStorage` when the
  attribute is absent or unrecognised.
- bootstrap: same precedence — read `<html lang>` first, and only fall back to
  `localStorage` when it is missing. Do not `document.write` a pack whose code
  differs from the page's declared language.

`localStorage` keeps its real jobs: remembering the choice for `setLang()`
navigation and showing the active item in the picker. It must never translate
a page in place.

Verify: with `ks-lang=th` set, `/culture/koreanthing.html` renders fully
English, and `/culture/th/koreanthing.html` renders fully Thai.

### Step 2 — send search results to the reader's own locale
Rewrite `searchResolveUrl(url)` to insert the current locale, using
`searchDocLang()` (which already exists and reads `<html lang>`):

- `en` → `/` + url, unchanged.
- otherwise map to the mirror: `index.html` → `/<loc>/index.html`;
  `<section>/<rest>` → `/<section>/<loc>/<rest>`; preserve any `#hash`.

Both call sites must change — the dropdown (~line 1128) and the full results
page (~line 2677). The `learn/`-only rewrite inside `loadWordIndex()` then
becomes redundant; fold it into the same helper so there is one rule.

Add a guard so a locale whose mirror is missing falls back to the English URL
rather than producing a 404. All 111 currently have mirrors, so this is
insurance, not a workaround.

### Step 3 — localize the search result text
Translate the 111 titles and 109 descriptions into the 8 locales (~1,760
strings) and look them up at render time. Two options:

- **Preferred:** move them into the existing UI packs (`js/langs/lang-*.js`)
  keyed by the English string, and render with `t(title)` / `t(desc)`. This
  reuses `scripts/ui-lang.cjs --apply`, which already handles the
  trailing-comma hazard and re-parses with rollback.
- Alternative: a generated `search-index-<loc>.json`. Only worth it if pack
  size becomes a problem — `lang-ja.js` is already 1.3 MB.

This step is a translation job, not a bug fix. Steps 1 and 2 are what stop
users seeing a broken page.

### Step 4 — make it an invariant
Add to `scripts/audit-i18n.cjs`, which already gates 10 i18n invariants and
is fault-tested:

- every English page has all 8 mirrors (currently 45/45);
- every static `SEARCH_INDEX` url resolves to a real file in all 8 locales
  (currently 111/111);
- after step 3, every title/desc has an entry in all 8 packs.

Then fault-test each new check by breaking it deliberately and confirming a
named failure and exit 1, as the existing checks were.

## Guardrails

- **Do not auto-redirect** an English URL to a locale mirror based on
  `localStorage`. It would make English unreachable for a returning non-English
  reader, and redirecting on a crawlable URL risks the SEO position this site
  is actively trying to repair. Fixing search (step 2) means the reader lands
  on the right page to begin with. If a nudge is wanted, use a dismissible
  banner, never a redirect.
- **`<html lang>` is the single source of truth** for what language a page is.
  Any new code that reads `localStorage` to decide *rendering* is reintroducing
  this bug.
- Do not change `setLang()`'s hreflang-based navigation; it is correct.
- After touching `js/langs/*.js`, run `node scripts/ui-lang.cjs --status` and
  `node scripts/audit-i18n.cjs --check`. A malformed pack is a silent,
  total-loss failure for that locale — it has happened once already.
- Verify in a real browser, not only with static checks. This entire class of
  bug is invisible to file-level analysis: the page source is correct English,
  and the damage happens at runtime.
