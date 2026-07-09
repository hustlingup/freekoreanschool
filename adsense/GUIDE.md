# AdSense Readiness Guide — ad zones + "Low value content" remediation

**Read this file in full before doing any AdSense work. It is the source of truth for the task.**
The paste-in prompts in [`PROMPTS.md`](PROMPTS.md) each tell a fresh session to read this guide first.

---

## 1. Background (where we are)

The site (https://freekoreanschool.com) applied for Google AdSense and was rejected with
**"Low value content"** ("Your site does not yet meet the criteria of use in the Google
publisher network" / thin-content webmaster guidelines). Since then the site has improved:

- ✅ AdSense **loader script** is in `<head>` of content pages
  (`ca-pub-6791974364232767`) + `<meta name="google-adsense-account">`
- ✅ `ads.txt` at root (`google.com, pub-6791974364232767, DIRECT, f08c47fec0942fa0`)
- ✅ SEO layer: canonical, OG, hreflang, Schema.org, `robots.txt`, `sitemap.xml` (~125 curated URLs)
- ✅ Google Analytics (`G-D94KSYG9DE`)
- ✅ `news/*/admin.html` pages are `noindex`
- ⏳ Phase 2 translations in progress (`translation/PROMPTS.md`) — vi/de/fr/th/id
  culture/travel/news mirrors still contain untranslated English prose
- ⏳ Owner is adding real images to image placeholders (separate manual task)
- ❌ **No ad units exist in any page body** — the loader is present but there are no ad zones

This task has two halves, and BOTH matter for approval:

1. **Approval half (§3):** remove every "low value / thin / duplicate content" signal before
   requesting re-review. This is what actually caused the rejection.
2. **Ad-zone half (§4–§8):** add w3schools-style reserved ad zones site-wide, implemented by
   scripts so all ~435 HTML files across 8 languages stay consistent.

---

## 2. The rules that prevent disaster

> **NEVER run `scripts/gen-content-mirrors.cjs` or `scripts/gen-root-mirrors.cjs`.**
> They rebuild pages from English and wipe all Phase 2 prose translations.

- The ad injector (§7) must be **pure insertion**: it adds ad markup at anchor points in the
  existing file and changes nothing else. It must never regenerate, reformat, or re-serialize
  whole pages.
- The injector must be **idempotent**: a file that already contains `class="ad-zone` is skipped,
  so re-running is always safe. (The audit tool + idempotent injector are the resume mechanism.)
- Ad zones carry **no visible text nodes** — the "Advertisement" label is CSS `::before` content
  (§5). This keeps `scripts/audit-content-translation.cjs` from flagging ad zones as
  untranslated English, so ad work and translation work can happen in any order.
- Inserting ad zones into `es/`, `ja/`, `zh-tw/` mirrors is allowed (insertion-only); editing
  their prose is still forbidden.
- Never place ads inside interactive components (step-runner stages, quiz, flashcards,
  syllable builder, planner) — only before/after them.
- Never exceed the per-page budget in §4. During re-review, conservative wins.

---

## 3. Approval half — "Low value content" remediation checklist

Google's "low value content" flag is about the **site**, not the ad code. Work through these
before requesting review (Prompt 4 in PROMPTS.md executes the auditable ones):

**3.1 Duplicate / half-translated mirrors (biggest risk).**
435 HTML files across 8 languages; vi/de/fr/th/id culture/travel/news pages currently mix
translated chrome with English prose — to a reviewer this looks like auto-generated duplicate
content. Decision rule at review time, per language
(`node scripts/audit-content-translation.cjs <lang>`):
- Language fully ✅ → keep indexed, keep in sitemap, hreflang intact.
- Language NOT ✅ → **finish it first** (preferred — `translation/PROMPTS.md`), or temporarily
  add `<meta name="robots" content="noindex,follow">` to its unfinished culture/travel/news
  pages and confirm they are absent from `sitemap.xml`. Remove the noindex once translated.

**3.2 Dev/scratch files deployed to production.** Delete or move out of the deploy root:
`lesson-header-mobile-options.html` (root), `culture_travel_news_extract.txt`,
`learn_extract.txt`, and consider working `.md` files (`adsense-audit.md`,
`learn-updates.md`, `article-vocabulary-*.md`, guides inside `culture/`). They are publicly
reachable and read as junk/thin pages. Do NOT touch `robots.txt`, `ads.txt`,
`sitemap.xml`, `site.webmanifest`.

**3.3 Thin utility shells.** `search.html`, `news/article.html`, `news/board.html` render via
JS and are near-empty to a crawler. Ensure they are either `noindex` or genuinely render
server-visible content; keep them out of the ad-zone rollout regardless (§4 exclusion list).

**3.4 Placeholder images.** Owner task (in progress). Reviewers treat obvious placeholders as
"under construction". Before review, verify no gray/empty placeholder boxes remain on the
pages listed in the sitemap.

**3.5 E-E-A-T touches (quick wins).** About page states who runs the site; add a visible
"Last updated: <month year>" line to the long culture articles if cheap to do; ensure every
sitemap page has a unique `<title>` + meta description (already largely true).

**3.6 Search Console before reapplying.** Coverage report should show the sitemap pages
indexed (or at least crawled, no soft-404s / duplicate-without-canonical clusters). Request
indexing for key pages. Only then request the AdSense review — repeated premature
resubmissions extend the review cycle (each review can take 1–4 weeks).

---

## 4. Ad zone architecture (w3schools model, adapted)

w3schools' pattern: fixed left nav • dominant content column • ads at natural breaks in the
content • right-hand ad rail on wide screens • every ad clearly separated and labeled, never
interleaved with interactive widgets. This site already has the left `.sidebar` (270px) +
`.main-content` flex layout (`.page-layout`), so the mapping is:

| Zone | Class | What | Where |
|---|---|---|---|
| A — top | `ad-zone--top` | responsive horizontal | after the page hero/intro, before the first content section — never above the H1 |
| B — mid | `ad-zone--mid` | in-article responsive rectangle | before the middle `.culture-sub-heading` of long articles |
| C — bottom | `ad-zone--bottom` | responsive horizontal | end of `<main>`, before the footer |
| D — rail | `ad-rail` | 300px sticky vertical, desktop ≥1500px only | `<aside>` appended after `.main-content` inside `.page-layout` |

**Per-page-type matrix (v1 = what we ship for re-review):**

| Page type | Zones (v1) | Notes |
|---|---|---|
| culture articles (15/lang) | top + mid + bottom | mid only if ≥4 `.culture-sub-heading` anchors |
| culture/index | bottom | hub page |
| learn lessons (16/lang) | bottom only | NEVER inside/above the step-runner |
| travel (5/lang) | bottom (+ top if an anchor exists) | planner is interactive → bottom only |
| news/index | bottom only | feed is JS-rendered |
| root index, about | bottom only | homepage stays clean |
| **EXCLUDED — zero ads** | — | privacy, terms, contact, search, quiz, news/article, news/board, news/admin (all languages) |

- **Budget: max 3 zones per page.** Policy pages and behavioral/utility pages get none
  (AdSense policy: no ads on screens without publisher content).
- **Zone D (rail) is built but OFF in v1.** The CSS and injector `--rail` flag exist, but the
  rail is only injected **after approval** (Prompt 6). Reason: during a "low value content"
  re-review, content-to-ad ratio should be unambiguous.
- Unfilled behavior: before approval (and whenever Google returns no ad) every zone
  **collapses to nothing** via `data-ad-status="unfilled"` CSS (§5) — pages look exactly as
  they do today, no empty labeled boxes.

---

## 5. Markup + CSS spec

**Zone markup the injector inserts** (indent to match surroundings; slot from
`scripts/ad-slots.json` §6):

```html
<div class="ad-zone ad-zone--top">
  <ins class="adsbygoogle" style="display:block"
       data-ad-client="ca-pub-6791974364232767"
       data-ad-slot="NNNNNNNNNN"
       data-ad-format="auto"
       data-full-width-responsive="true"></ins>
</div>
```

Rail variant: `<aside class="ad-rail"><div class="ad-zone ad-zone--rail"><ins … data-ad-format="auto"></ins></div></aside>`.

No inline `(adsbygoogle = window.adsbygoogle || []).push({})` per zone — pushes are
centralized in `js/ads.js` (§7.3). The injector also adds
`<script defer src="<rel>/js/ads.js"></script>` before `</body>` (correct `../` depth), only
on pages where it inserted at least one zone.

**CSS (append to `css/style.css`, using existing vars `--surface`, `--border`, `--text-muted`):**

```css
/* ── Ad zones ───────────────────────────────────────── */
.ad-zone { margin: 32px 0; text-align: center; }
.ad-zone::before {
  content: "Advertisement";           /* CSS content — invisible to translation audit */
  display: block; font-size: 0.65rem; letter-spacing: 0.12em;
  text-transform: uppercase; color: var(--text-muted); margin-bottom: 6px;
}
.ad-zone .adsbygoogle { display: block; min-height: 90px; }
.ad-zone--mid .adsbygoogle { min-height: 250px; }        /* CLS reservation */
/* collapse entirely when Google leaves the slot unfilled (incl. pre-approval) */
.ad-zone:has(.adsbygoogle[data-ad-status="unfilled"]),
.ad-zone:has(.adsbygoogle:not([data-ad-status])) { display: none; }

.ad-rail { display: none; }
@media (min-width: 1500px) {
  .ad-rail {
    display: block; width: 300px; flex-shrink: 0; padding: 40px 24px 40px 0;
  }
  .ad-rail .ad-zone { position: sticky; top: calc(var(--header-height) + 24px); margin: 0; }
}
```

Notes: the `:not([data-ad-status])` clause keeps zones hidden until the AdSense script has
actually rendered something, so nothing looks broken pre-approval; `min-height` only matters
once filled. Both dark (default) and light themes must look right — the label uses
`var(--text-muted)` so it adapts.

---

## 6. Slot IDs — owner's one-time manual step (blocks the injector)

The injector refuses to run until real slot IDs exist. Owner (hustlin.up@gmail.com):

1. In [AdSense](https://adsense.google.com) → **Ads → By ad unit → Display ads**, create four
   responsive display units named `ks-top`, `ks-mid`, `ks-bottom`, `ks-rail` (ad units can be
   created before approval).
2. Put the numeric slot IDs into `scripts/ad-slots.json`:

```json
{
  "client": "ca-pub-6791974364232767",
  "slots": { "top": "", "mid": "", "bottom": "", "rail": "" }
}
```

Prompt 1 creates this file with empty strings; the injector aborts with a clear message while
any needed slot is `""`.

---

## 7. Scripts to build (Prompt 1 builds all three)

### 7.1 `scripts/inject-ad-zones.cjs` — the only way zones enter pages

`node scripts/inject-ad-zones.cjs <scope> [--rail] [--dry-run]` where `<scope>` is a
directory-ish filter: `culture`, `culture/es`, `learn`, `travel`, `news`, `root`, a single
file, or `all`.

Behavior spec:
- Loads `scripts/ad-slots.json`; aborts (exit 1, instructions printed) if a required slot is empty.
- Builds the page list from the scope, **minus the §4 exclusion list** (match by basename in
  every language dir: `privacy|terms|contact|search|quiz|article|board|admin`), minus files
  already containing `class="ad-zone` (idempotency), minus files containing
  `name="robots" content="noindex` only if they're excluded-type pages (a temporarily
  noindexed translation page still gets zones — the noindex will be lifted).
- Per-file, string-level insertion only (indexOf/regex on the raw text, then splice):
  - **bottom**: insert before the final `</main>`.
  - **top** (culture articles + travel where applicable): insert immediately before the FIRST
    `<div class="culture-sub-heading"` (or the page-type's equivalent anchor). No anchor →
    skip zone, don't guess.
  - **mid** (culture articles only): count `culture-sub-heading` anchors; if ≥4, insert before
    anchor `floor(n/2)`. Else skip.
  - **rail** (only with `--rail`): insert the `<aside class="ad-rail">…</aside>` right after
    the closing `</main>` (inside `.page-layout`), only on pages that have `class="sidebar"`.
- Adds the `js/ads.js` script tag before `</body>` if it inserted ≥1 zone and the tag is absent;
  compute the `../` prefix from the file's depth.
- `--dry-run` prints the would-be per-file plan without writing.
- Prints a summary table: file → zones inserted / skipped-why.

### 7.2 `scripts/audit-ad-zones.cjs` — status + resume mechanism

`node scripts/audit-ad-zones.cjs [scope]` scans HTML files and reports per page:
zones present by type, `ads.js` tag present?, and flags: ⛔ excluded page containing a zone,
⚠️ over budget (>3 zones), ⚠️ zone present but loader script missing from `<head>`,
⚠️ `ins` without a numeric `data-ad-slot`. Ends with a per-section/per-language rollup
(done / pending counts). "Pending" = an includable page with 0 zones.

### 7.3 `js/ads.js` — centralized, visibility-guarded pushes

~20 lines, no dependencies: on DOMContentLoaded, for each `.ad-zone .adsbygoogle` that has no
`data-ad-status` yet AND whose container is actually visible (`offsetParent !== null` — this
skips the hidden rail below 1500px so we never push into a display:none slot), do
`(window.adsbygoogle = window.adsbygoogle || []).push({})` in a try/catch. Never re-push.

---

## 8. Rollout order

1. Prompt 1 — foundation: `ad-slots.json` scaffold, CSS, `js/ads.js`, both scripts; inject
   **English culture/** as the pilot; audit + browser spot-check.
2. Prompt 2 — English remainder: `learn`, `travel`, `news`, root pages.
3. Prompt 3 — all 8 language mirrors (`es, ja, zh-tw, de, fr, vi, th, id`), same script.
4. Prompt 4 — §3 content-quality cleanup.
5. Prompt 5 — final verification + pre-review report; owner requests AdSense review.
6. Prompt 6 — **post-approval only**: enable the rail (`--rail`), consider learn-page top
   zones, re-audit density.

Zones are inert until approval (collapsed via §5 CSS), so injecting before requesting review
is safe and lets Google review the site exactly as it will run with ads.

---

## 9. Verification & definition of done (pre-review)

1. `node scripts/audit-ad-zones.cjs` → every includable page has its matrix zones, zero ⛔/⚠️
   flags, all excluded pages clean.
2. `npx serve -l 5060 .` and spot-check (Playwright or browser):
   `index.html`, `culture/kpop.html`, `learn/hangul.html`, `travel/index.html`,
   `culture/ja/kpop.html`, one incomplete-language page — layout identical to before
   (zones collapsed), no console errors, dark + light themes fine, mobile viewport fine.
3. §3 checklist all done: no scratch files reachable, unfinished languages finished-or-noindexed,
   sitemap matches, no placeholder images on sitemap pages, Search Console coverage clean.
4. `git status` shows only intended changes; commit per rollout step.
5. Owner requests review in AdSense. **Do not** resubmit again while a review is pending.

---

## 10. Progress snapshot (update as you go)

- `scripts/ad-slots.json` + real slot IDs: ✅ owner filled 2026-07-07 (top 7160270874 · mid 7783087408 · bottom 9704719339 · rail 9403290839; unit code reference in `adsense/DISPLAY_UNITS.md`)
- CSS `.ad-zone` / `.ad-rail` + `js/ads.js` + injector + audit scripts: ✅ (Prompt 1, 2026-07-07)
- English culture zones: ✅ 16/16 injected 2026-07-07 (index bottom-only; 9 top+mid+bottom; 7 top+bottom, mid skipped <4 anchors); audit zero flags; idempotent re-run verified
- English learn/travel/news/root zones: ✅ 24/24 injected 2026-07-07 (Prompt 2 — learn 16 bottom-only; travel 5 bottom-only, no top anchors exist; news/index bottom; index.html + about.html bottom; all §4 exclusions respected). Injector+audit fixed for root-level files (`parts.length===1` → root section; bottom falls back to `<footer` when page has no `</main>`, e.g. index.html). Audit zero flags, all 5 English sections ✅; idempotent re-run verified; served spot-check on :5060 — hangul zone sits after `#step-shell` before `</main>`, div balance intact, `/learn/data/hangul.json` + `js/ads.js` 200
- Language mirrors zones: ✅ 320/320 injected 2026-07-07 (Prompt 3 — all 8 langs × 40 files each: 2 root (index+about), 16 culture, 5 travel, 1 news/index, 16 learn; culture mirrors match English pattern — index bottom-only, 8 top+mid+bottom, 7 top+bottom mid-skipped <4 anchors; §4 exclusions respected in every language incl. quiz/search/privacy/terms/contact + news article/board/admin). Audit zero flags, all 45 sections ✅; idempotent re-run 0 written; depth-2 pages use `../../js/ads.js`, depth-1 `../js/ads.js`. `audit-content-translation.cjs vi` output byte-identical before/after (zones add no text nodes). Served spot-check :5060 — culture/ja/kpop (3 zones, divs balanced 980/980, chrome ja), culture/vi/kfood (3 zones, chrome vi), learn/es/hangul (bottom zone after #step-shell before `</main>`); all relative js/css resolve 200
- §3 content cleanup: ✅ auditable parts done 2026-07-07 (Prompt 4):
  - **3.1 translation gate**: audited vi/de/fr/th/id — ALL five incomplete (vi 1436 / de 1630 / fr 1564 / th 1267 / id 1579 untranslated nodes). Added `noindex,follow` to all 110 unfinished culture/travel/news pages (5 admin pages already had it). Fully-done pages kept indexable: vi (culture index/kchicken/mandu, travel planner), th (culture index/kchicken/mandu, travel cities/planner, news index). Preferred end state: finish via `translation/PROMPTS.md`, then remove the noindex + re-add to sitemap.
  - **3.2 dev files**: deleted `lesson-header-mobile-options.html`, `culture_travel_news_extract.txt`, `learn_extract.txt`; moved working `.md` files (`SUPABASE_SETUP`, `ja-translation-guide`, `culture/deep-dives-ja-guide`, `culture/japanese-version-guide`, `adsense-audit`, `learn-updates`, `article-vocabulary-*`) into `docs/`; `scripts/build-vocab-ja-sql.mjs` output path updated. `robots.txt`/`ads.txt`/`sitemap.xml`/`site.webmanifest` untouched (ads.txt staged for commit — see blocker below).
  - **3.3 thin shells**: added `noindex,follow` to all 9 `search.html` (en + 8 langs) and en/es/ja/zh-tw `news/article.html` + `news/board.html` (other langs got it via 3.1).
  - **3.4 placeholder images**: ⏳ OWNER — scan of 44 English sitemap pages found **98 broken Supabase images (HTTP 400)**: index.html 7 (article-0..3, place-0..2), culture/kpop 16 (agency-0..5, gen-0..3, film-0..5), culture/kfood 35 (dish-0..14, street-0..7, dining-0..4, mens-0..2, chef-7..10), culture/kbbq 40 (food/beef-0..12, pork-0..10, chicken-0..5, duck-0..4, offal-0..4). Plus culture/kmovie has 6 emoji-only `photo-frame` boxes (📽️🎞️🏆🎭💰🎥) with no images. Most broken imgs have `onerror` hide, so pages don't look broken, but frames/sections are empty.
  - **sitemap sanity**: removed all 30 noindexed URLs from `sitemap.xml` (21 id culture/travel/news + 9 search/article/board shells) incl. their hreflang alternate lines; 125 → 95 `<loc>`; every remaining loc resolves to an existing file; XML validated.
- 🚨 **DEPLOY BLOCKER found 2026-07-07**: `ads.txt` and ALL language-mirror directories (`es/`, `id/`, `de/`, `fr/`, `vi/`, `th/`, `zh-tw/`, `ja/index|quiz|search`, `culture/<lang>/`, `learn/<lang>/`, `travel/<lang>/`, `news/<lang>/`, `learn/vocabulary-browser.html`) were **never committed to git** → Vercel never deployed them → live site 404s. Confirmed live: `https://www.freekoreanschool.com/ads.txt` = 404 (AdSense hard blocker), 42 of 95 sitemap URLs 404 (es + id roots, culture/es/*, travel/es/*, learn mirrors, /ja/). `ads.txt` is staged; owner must `git add` the mirror dirs + all pending changes, commit, push, then verify ads.txt + sitemap URLs return 200 before requesting review.
- **2026-07-09 pre-deploy remediation pass** (full-policy audit + fixes):
  - Density rollback: `scripts/strip-ad-zones.cjs` removed surplus mids (culture back to ≤3 zones, all 9 langs) and ALL static zones from `news/*/article.html` ×9 (back on §4 exclusion list). `audit-ad-zones.cjs` → zero flags.
  - JS-inserted ad units (rail ×2, news in-feed, in-article) gated behind `KS_ADS_LIVE = false` const at top of `js/app.js` — **flip to true after approval** (replaces the old Prompt-6 `--rail` plan for these).
  - Privacy policy ×9 langs: Advertising section now names Google AdSense + required disclosures (third-party vendors incl. Google use cookies based on prior visits; opt-out via Google Ads Settings + DAA; EEA/UK/CH consent note); GA section changed from "planned" to active. NOTE: de/fr privacy pages contained SPANISH prose — only these two sections were properly translated to de/fr; rest of those pages still Spanish (translation task).
  - E-E-A-T (§3.5): "Who Runs This Site" card added to about.html ×9 langs (해본놈RK, native Korean speaker in South Korea, contact email, last-updated line).
  - `.vercelignore` created — excludes adsense/, docs/, translation/, scripts/, admin/, CLAUDE.md, *.md, dev files from deploy.
  - Ad label CSS → "Advertisements" (policy-exact wording); planner's empty dashed "AD" placeholder box hidden pre-approval (`.planner-layout` single column).
  - `noindex,nofollow` added to `admin/upload-*.html` ×3.
  - Sitemap 95→109: added 14 zh-tw locs (root ×6, travel ×5, learn ×3 — pages that pass the translation gate). culture/ja + culture/zh-tw + news index ja/zh-tw NOT added — audit shows ja 278 / zh-tw 125 untranslated nodes remain; finish via translation/PROMPTS.md before adding.
  - Placeholder images (3.4): RESOLVED — Supabase images re-checked 200 (uploaded 2026-07-07); only kmovie's 6 stylized emoji frames remain (intentional design, low risk).
- Final verification + review requested: ⏳ (Prompt 5) — blocked on: commit+deploy, enable Google CMP (AdSense → Privacy & messaging) for EEA consent, Search Console coverage (3.6)
- Rail / post-approval density pass: 🔒 blocked until approval (Prompt 6)

Reference for site structure facts used above: left sidebar 270px, `--content-max: 1200px`,
`--header-height: 64px`; culture/learn pages use inline-styled
`<main class="main-content" style="margin-left:var(--sidebar-width);…">`; big culture articles
have 8–10 `.culture-sub-heading` anchors; learn lesson bodies are rendered by
`js/step-runner.js` from `learn/data/*.json`.
