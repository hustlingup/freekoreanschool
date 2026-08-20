# Locale Expansion Plan — 8 languages → 15

**Status:** authored 2026-08-12. Scope and order locked; Phase 0 in progress.
**Scope: 7 new languages, in this order** —
`pt-BR` → `ru` → `tr` → `zh-hk` → `zh-cn` → `ar` → `ms`.

Cut from the original fourteen:
- `mn`, `my`, `km`, `ne`, `uz` — Google does not support them as publisher languages, so they
  can earn **no** ad revenue and running ad code on them would violate Publisher Policies (§0a).
- `fil`, `hi` — owner decision 2026-08-12. Both are AdSense-supported but sit in the lower
  advertiser-demand tier; deferred rather than forbidden, and can be appended later at the
  cost of one pipeline run each (the Phase 0 infrastructure already covers them).
**Prerequisite reading:** `translation/GUIDE.md` (Phase 2 rules — translate-vs-keep §3,
per-page workflow §4, quality bar §7, audit caveats §6), `translation/GUIDE2.md` (Phase 3
parity rules), `CLAUDE.md` (script inventory + the "do not run these generators" list),
`docs/writing-typing/qa-triage-results.md` (how the last QA pass was structured).

This document is the source of truth for the expansion. Per-language prompts live in
`docs/i18n-expansion/prompts/`.

---

## 0. What is being added

| # | Code | Dir | hreflang | Native name | Script | AdSense language support |
|---|------|-----|----------|-------------|--------|--------------------------|
| Order | Code | Dir | hreflang | Native name | Script | New font? |
|---|------|-----|----------|-------------|--------|-----------|
| 1 | `pt-BR` | `pt-br/` | `pt-BR` | Português (Brasil) | Latin | no — Inter |
| 2 | `ru` | `ru/` | `ru` | Русский | Cyrillic | no — Inter |
| 3 | `tr` | `tr/` | `tr` | Türkçe | Latin | no — Inter |
| 4 | `zh-hk` | `zh-hk/` | `zh-HK` | 繁體中文（香港） | Han (Traditional) | Noto Sans HK |
| 5 | `zh-cn` | `zh-cn/` | `zh-Hans` | 简体中文 | Han (Simplified) | Noto Sans SC |
| 6 | `ar` | `ar/` | `ar` | العربية | Arabic **(RTL)** | Noto Sans Arabic |
| 7 | `ms` | `ms/` | `ms` | Bahasa Melayu | Latin | no — Inter |

Cut, unsupported by AdSense (§0a): ~~`mn`~~ ~~`my`~~ ~~`km`~~ ~~`ne`~~ ~~`uz`~~.
Deferred by owner decision: ~~`fil`~~ ~~`hi`~~.

Existing 8 (untouched by this work): `ja`, `zh-tw`, `es`, `de`, `fr`, `vi`, `th`, `id`.

🚫 **No `news/` section.** It was deleted outright on 2026-07-21 (all 9 locales, 34 files) —
unreviewed AI-written articles at ~11/day/locale, Google's "scaled content abuse" pattern,
and one of the causes of the second AdSense rejection. **A new locale gets 45 pages, never 49.**
Both translation guides in `translation/` predate the deletion and still describe a 4-page
`news/` inventory per locale — that part of them is a historical record, not an instruction.
Do not add a news nav item, a news directory, or a news entry to any locale list.

**Per-locale page count: 45.** 7 root + 15 culture + 5 travel + 18 learn.
7 × 45 = **315 new HTML pages**, taking the site from 422 to ~737 pages and the sitemap
from ~405 to ~720 URLs. Final hreflang cluster: **15 locales + `x-default`**.

### Three findings that change the shape of the job — read before committing

**(a) Five of the fourteen are not AdSense-serviceable languages. VERIFIED 2026-08-12.**
Source: [Languages Google publisher products support](https://support.google.com/adsense/answer/9727?hl=en).
The list is 50 languages. Google's policy statement is explicit:

> "Placing Google ad code on pages with content primarily in an unsupported language is not
> permitted by the Google Publisher Policies."

| Requested | On the list? |
|---|---|
| Filipino, Malay, Russian, Portuguese, Turkish, Hindi, Arabic, Chinese (simplified), Chinese (traditional) | ✅ yes |
| **Mongolian, Burmese, Khmer, Nepali, Uzbek** | ❌ **no** |

So those five would earn **zero AdSense revenue** — not "low revenue", zero, and running ad
code on them is a policy violation on a site that already carries two rejections. Since ad
revenue is the stated first-order purpose of the site, they are **cut from scope**. The plan
below covers **9 languages / 405 new pages**, not 14 / 630.

If they are ever wanted for reach rather than revenue, they ship with `class="ad-zone"` blocks
stripped for that locale only (`scripts/remove-all-ad-zones.cjs`, scoped) and the AdSense
loader omitted from those 45 pages — but that is a traffic decision, not a revenue one.

**Revenue is not uniform across the surviving nine either.** Advertiser demand per 1,000
impressions varies by roughly an order of magnitude between the top and bottom of this set.
Rough tiering for planning purposes (validate against your own AdSense reporting once live,
not against this table):

| Tier | Locales | Note |
|---|---|---|
| Higher | `pt-BR`, `ru`, `tr`, `zh-hk` | Established advertiser markets; HK is small but high-value |
| Middle | `zh-cn`, `ar`, `ms` | `zh-cn` audience here is diaspora-only by design (§0.7) |
| Lower | `hi`, `fil` | Large audiences, thin advertiser demand — volume plays, not RPM plays |

Adding languages multiplies **traffic**, not RPM. The existing 8 locales and the English
source are where RPM is won.

**(b) Publishing 405 translated pages in a burst is the exact pattern that caused the
2026-07 rejection.** "Scaled content abuse" is about volume of low-review machine output,
not about translation per se. The mitigation is already in the user's instruction —
strictly one language at a time, fully QA'd, before the next starts. Reinforce it:
do not begin language N+1 until language N passes every gate in §7, and do not submit an
AdSense review while a rollout is mid-flight.

**(c) `js/step-runner.js` cannot absorb 14 more locales in its current form.**
It contains **92 inline `lang === '<code>' ? … :` ternary chains** covering the current 8
locales. Extending each of them by 14 branches is ~1,290 hand edits per pass and guarantees
drift. This must be refactored to a lookup table *before* language #1 — see Phase 0.

---

## 1. Order — LOCKED 2026-08-12

| # | Locale | Why here |
|---|---|---|
| 1 | `pt-BR` | Largest audience of the set, top-tier RPM, Latin script, zero infra risk. Also the right pilot: any Phase 0 gap surfaces on an easy language before it costs anything. |
| 2 | `ru` | Large audience; Cyrillic already covered by the loaded Inter subset, so still no new font. |
| 3 | `tr` | Latin script, solid advertiser demand, no new infra. |
| 4 | `zh-hk` | **Cheapest of the seven** — derived from `zh-tw` (§5). Small audience, high value. Runs before `zh-cn` so the Traditional-script derivation is proven on the simpler case first. |
| 5 | `zh-cn` | Derived from `zh-tw` + a term-aware Simplified conversion (§5). The only locale needing `middleware.js` (§0.7). |
| 6 | `ar` | First and only RTL locale. All RTL CSS lands in Phase 0, so by the time it starts this is a pure content job. |
| 7 | `ms` | Seeded from `id` (§5). Last because its risk is a *quality* risk (false-friend divergence), and it benefits most from six prior runs of the QA pipeline. |

**Non-negotiable: Phase 0 completes and passes its gate before `pt-BR` starts.**

---

## 2. Volume per language

| Surface | Unit | Volume | Harness |
|---|---|---|---|
| UI chrome pack | keys | **631** | `scripts/ui-lang.cjs --extract/--apply` |
| Root pages (7) | words | 0 — 100% dictionary-covered | `gen-root-mirrors.cjs` |
| Lesson JSON | localizable units | **2,065** | `scripts/qa-lang.cjs --extract/--apply` |
| `learn/` shells (18) | words | **~11,800** (9,100 of it in `dialogues`, `writing-essays`, `classical-korean`, `business-korean`) | `translate-learn-shell.cjs` |
| `learn/` `#lesson-static` | — | 0 — regenerated from JSON | `gen-lesson-static.cjs` |
| `culture/` (15) + `travel/` (5) | words | **~95,400** | per-page `Edit`, then `extract/apply-content-translations.cjs` for mop-up |

**≈110,000 words + 2,065 structured units per language. ≈770,000 words across the 7** —
materially less in practice, since three of the seven (`zh-hk`, `zh-cn`, `ms`) are derived
rather than translated (§5). Genuine from-scratch translation: `pt-BR`, `ru`, `tr`, `ar`.

Largest single pages (culture, EN word counts): `koreanthing` 10,874 · `kfood` 10,392 ·
`kpop` 8,435 · `kmovie` 6,622 · `kfashion` 6,555 · `kgaming` 6,524 · `kdrama` 6,469.

---

## 3. Phase 0 — infrastructure (one-time, blocks everything)

Nine work items. None of them is translation. All must land and be verified before
language #1.

### 0.1 A single locale registry

Today the locale list is hardcoded in **17 scripts and 5 JS files**, each with its own
shape (array, flag map, suffix map, hreflang map). Confirmed sites:

```
scripts/  gen-sitemap.cjs · gen-lesson-static.cjs · gen-root-mirrors.cjs ·
          gen-content-mirrors.cjs · gen-learn-mirrors.cjs · ui-lang.cjs · qa-lang.cjs ·
          qa-translations.cjs · audit-i18n.cjs · audit-learn-content.cjs ·
          audit-learn-locale-dup.cjs · audit-content-locale-dup.cjs · audit-page-words.cjs ·
          extract-content-untranslated.cjs · fix-culture-travel-nav.cjs ·
          fix-culture-travel-seo.cjs · harden-page-metadata.cjs · _locale-prose.cjs
js/       lang-core.js (KS_LANGS, roots map, _FLAG_SVG, hero picker, modal) ·
          step-runner.js · app.js · syllable-builder.js
```

Create **`scripts/_locales.cjs`** (CommonJS, the source of truth) and
**`js/locales.js`** (a browser copy, generated from it — never hand-edited), with one record
per locale:

```js
{ code: 'pt-BR', dir: 'pt-br', hreflang: 'pt-BR', suffix: '_pt_br',
  native: 'Português (Brasil)', flag: '🇧🇷', flagSvg: '<svg …>',
  writing: 'ltr', numberGroup: '.', numberDecimal: ',', dateFmt: 'pt-BR',
  font: null, adsense: true, byline: 'Por', updated: 'Atualizado em' }
```

Then convert every site above to read from it. This is the single highest-leverage item in
the plan: without it, each of the 14 languages costs 22 hand-edits before a word is written,
and the audit scripts silently stop covering the new locales (`audit-i18n.cjs`'s own header
states the rule — *a check that cannot see a class of defect is worse than no check*).

**Acceptance:** `node scripts/audit-i18n.cjs --check` passes with the registry in place and
the existing 8 locales reporting byte-identical results to today's run.

### 0.2 Refactor `js/step-runner.js`'s 92 inline locale ternaries

Replace every `lang === 'ja' ? '聴く' : lang === 'zh-tw' ? '聽' : …` chain with a lookup:

```js
const SR_UI = { en: { hear: 'Hear it', … }, ja: { hear: '聴く', … }, … };
const ui = k => (SR_UI[lang] || SR_UI.en)[k] || SR_UI.en[k];
```

English is the fallback for any key a locale has not filled, which is the current behaviour
anyway. Also fix `loc()`'s suffix map (line ~130) and the `zh-tw`-specific pronunciation-slot
branches to read from the registry (`suffix`, and a `pronField` per locale).

**Acceptance:** all 8 existing locales render every step type identically before and after —
diff the rendered `#step-shell` HTML for one lesson per step type per locale.

Do the same, smaller, pass on `js/app.js` and `js/syllable-builder.js` (1 branch each).

### 0.3 Flag SVGs

`lang-core.js`'s `_FLAG_SVG` map exists because Windows has no flag-emoji font. It currently
holds 11 flags and already includes `🇨🇳`. **Five to add:** 🇧🇷 🇷🇺 🇹🇷 🇭🇰 🇸🇦 🇲🇾 (six).
Keep them in the registry (`flagSvg`), not inline. Simplified geometry is the established
convention here — the existing 🇨🇳 renders its stars as plain circles — so 🇧🇷's celestial
globe and 🇭🇰's bauhinia should be simplified, not traced.

### 0.4 A fresh-locale mode for `gen-learn-mirrors.cjs`

The script's current strategy **salvages** the existing translated `<head>` and `<main>` from
a locale's pages and rebuilds only the chrome — see its header comment. A brand-new locale has
nothing to salvage, so all 18 pages must be generated wholesale from English (the path it
already uses for the 3 `APP_PAGES`). Add a `--fresh <locale>` mode that treats all 18 pages as
app-page-style regenerations. Its hardcoded `LANGS = ['de','es','fr','vi','th']` and `FLAG` map
go to the registry.

Same treatment for `gen-root-mirrors.cjs` and `gen-content-mirrors.cjs`: their `FLAG` maps only
know 6 locales, so a new locale silently generates without a language flag.

> ⚠️ `gen-content-mirrors.cjs` remains **forbidden** for every locale that already has prose.
> The fresh-locale invocation must be explicitly locale-scoped and run exactly once per
> language, before any translation of that language begins. Same rule as
> `regen-es-stale-culture.cjs` in GUIDE2 §4.1.

### 0.5 RTL support for `ar`

`css/style.css` is ~single-file, custom-properties-only, with a 270px left sidebar and a 64px
header. Arabic needs:
- `<html lang="ar" dir="rtl">` emitted by the generators (registry `writing: 'rtl'`).
- Directional properties converted to logical ones (`margin-left` → `margin-inline-start`,
  `left:` → `inset-inline-start:`, `text-align: left` → `start`, `border-left` →
  `border-inline-start`). Audit with a grep for `\b(margin|padding|border)-(left|right)\b`
  and `\b(left|right)\s*:` in `css/style.css`.
- Keep Korean, romanization and code LTR inside RTL paragraphs (`<bdi>` or
  `[dir="rtl"] .kr-text { direction: ltr; unicode-bidi: isolate; }`).
- Sidebar, progress grid, syllable builder and the typing/stroke widgets need a visual pass —
  the syllable builder's cho/jung/jong columns are order-significant and must **not** mirror.

Do this in Phase 0 even though `ar` is late in the order: it is CSS churn that touches every
page, and it is cheaper to land once, verified against the current 8 locales, than to
retrofit after 13 more locales exist.

### 0.6 Fonts

Currently loaded: Inter, Noto Sans KR, Noto Serif KR (root `<link>`), plus Noto Sans TC via
the `@import` in `css/style.css`. That `@import` is the known double-load issue
(`docs/` / font-loading memo) — **do not delete it**, 172 culture/travel pages depend on it.

Inter covers Latin (incl. Turkish, Malay, Portuguese) and Cyrillic (Russian) — so `pt-BR`,
`ru`, `tr` and `ms` need **no new font at all**.
**New font families needed, for three locales only:** Noto Sans HK (`zh-hk`),
Noto Sans SC (`zh-cn`), Noto Sans Arabic (`ar`).

**Do not add these globally** — CJK and Indic subsets are heavy and would regress Core Web
Vitals on every existing page. Emit a per-locale `<link>` from the registry's `font` field,
injected by the generators into that locale's pages only.

### 0.7 `middleware.js` — mainland-China block for `zh-cn`

**✅ DONE 2026-08-12** — `middleware.js` exists at the repo root. What follows is corrected
against what the implementation actually found; the original draft of this section was wrong
in a way that would have shipped a block that never fired.

🚨 **`req.geo` does not exist on this project.** It is a Next.js `NextRequest` property. A
framework-less ("Other") Vercel project receives a plain web `Request`, so `req.geo?.country`
is permanently `undefined` — the middleware would deploy cleanly, log nothing, and never
block anyone. The working source of truth is the **`x-vercel-ip-country`** request header
(ISO 3166-1 alpha-2, set on every request; spoofed values are stripped at the edge).
`geolocation()` from `@vercel/functions` is the documented alternative but is **impossible
here**: there is no root `package.json`, and `.vercelignore` excludes `package.json`,
`package-lock.json` and `scripts/`, so the import could never resolve at build time.
`geolocation()` is itself only a header parser, so the raw header read is the same data.

Implemented shape: eight matcher entries — the four `zh-cn` prefixes **plus their bare roots**
(`/zh-cn`, `/culture/zh-cn`, …), because `cleanUrls: true` + `trailingSlash: false` serve
`zh-cn/index.html` at `/zh-cn`, which has no trailing segment for `:path*` to absorb.

**Response: 403 with a self-contained Simplified-Chinese page**, not the 451 originally
planned. RFC 7725 (451) means "Unavailable For Legal Reasons" and no legal demand exists —
the refusal is commercial (unmonetizable pageviews), so 451 would be a false claim. A
redirect to `/zh-tw` was also rejected: it silently serves Traditional script to a Simplified
reader. The page is dependency-free (that network would not load external CSS/fonts anyway),
states plainly that it is not censorship, and links `/zh-tw` and `/`. `Cache-Control:
no-store, private` so no shared cache replays the block to a non-CN visitor. No
`X-Robots-Tag: noindex` — a misfiring 403 is transient and self-healing, whereas noindex
would actively de-index the locale.

**Fails open**, deliberately: any country that is not exactly `CN`, *and* a missing header,
fall through to the static file. Exact equality also means HK, MO and TW — the intended
audience — are never caught.

⚠️ **Residual risk to check on first deploy: ESM.** Vercel requires non-framework projects to
declare `"type": "module"` or use `.mjs`. This repo has neither, and `middleware.js` uses
`export default`. It was shipped as `.js` on the empirical evidence that `api/tts.js` already
uses `export default` and runs in production on this same project. If the Functions list shows
no `middleware` entry after deploy, rename to `middleware.mjs` — **do not** add a root
`package.json`, `.vercelignore` would strip it.

Also confirm **Routing Middleware is available on the current Vercel plan** (the docs carry a
permissions badge) and that middleware invocations bill only against zh-cn traffic.

Four things to be honest about, and to write into the launch note:
- IP geolocation is best-effort. A VPN bypasses it. It is a signal, not a wall.
- Googlebot crawls from US IPs, so indexing and AdSense crawling are unaffected.
- AdSense does not operate in mainland China anyway, so the block matches ad-serving reality
  rather than creating a new constraint.
- `middleware.js` must be added to **neither** `.vercelignore` nor `.gitignore`. `.vercelignore`
  is the only deploy-surface gate in this repo (no CI). Verified 2026-08-12 by running git's own
  gitignore matcher against `.vercelignore`: `middleware.js` is not matched, and the positive
  control correctly excluded `dev.js`, `*.md`, `scripts/*` and `docs/*`. No `vercel.json` change
  is needed — `matcher` and `runtime` are configured by the middleware's own `config` export.

**Owner must verify after the first deploy** (cannot be tested locally — `dev.js` is a plain
Node server that never loads middleware):
1. Vercel dashboard → Deployment → **Functions** lists a `middleware` entry. If not, rename to
   `middleware.mjs` and redeploy.
2. From a normal connection, `curl -sI https://<domain>/zh-cn` → **200**. Anything else means
   the fail-open path is broken; revert immediately.
3. From a **mainland-China VPN exit**, `curl -si https://<domain>/zh-cn` → **403** with the
   Simplified-Chinese page.
4. From that same VPN: `/zh-tw`, `/`, `/learn/ja/hangul` → all **200**. Only `zh-cn` blocks.
5. Search Console → URL Inspection → Live Test on a `zh-cn` URL → fetches successfully.
6. Vercel Observability: middleware invocation count tracks zh-cn traffic only. A spike across
   all traffic means the matcher regressed to site-wide.

Consider `hreflang="zh-Hans"` rather than `zh-CN` for this locale, since the target audience is
Simplified-Chinese readers *outside* the mainland (Singapore, Malaysia, diaspora). Recorded as
a decision in §9.

### 0.8 Sitemap, SEO and nav scripts

`gen-sitemap.cjs`, `inject-seo.mjs`, `fix-culture-travel-seo.cjs` (hreflang cluster + byline
strings + date locale), `fix-culture-travel-nav.cjs`, `fix-locale-number-format.cjs`
(add the separator convention per locale — `ru`/`fr` space, `pt-BR`/`tr` period-group, `hi`
lakh/crore grouping is a real decision: **use Western grouping**, the site's numbers are
prices and years), `harden-page-metadata.cjs`, `noindex-untranslated-vocab.cjs`.
All of these read the registry after 0.1; each needs its per-locale strings filled in.

### 0.9 Extend the audit harnesses to a fresh locale

- `extract-content-untranslated.cjs` has a `SENTENCE_MIN` floor (≥30 chars), so it will not
  see short labels, card titles or table cells. That is correct for mop-up on a translated
  locale, wrong as the primary harness for a fresh one. Add `--locales <code>` and a
  `--no-floor` mode; use it only for the post-translation sweep (§6 stage 6).
- `audit-content-locale-dup.cjs` / `audit-learn-locale-dup.cjs` / `_locale-prose.cjs`: the
  exclusion rules live in `_locale-prose.cjs` — **change them only there** (CLAUDE.md).
  New locales need no new rules; they need to be in the locale list.
- `qa-lang.cjs`'s localizability test is "does **any** locale sibling exist", which is
  already correct for a brand-new locale. `qa-translations.cjs` is **not** — do not use it
  for coverage (documented blind spot).

**Phase 0 acceptance gate:** `node scripts/audit-i18n.cjs --check` exits 0; the 8 existing
locales are byte-identical to their pre-Phase-0 state except for the intended registry-driven
changes; `node dev.js` renders one page per section per existing locale with no console errors;
`git diff --stat` shows no unintended writes into `culture/*/`, `travel/*/`, `learn/*/`.

---

## 4. The per-language pipeline (repeat 14×, strictly sequential)

Seven stages. Stages 2–5 are the translation body; stage 6 is QA; stage 7 is the gate.
**No stage of language N+1 starts until language N clears stage 7.**

### Stage 1 — Scaffold (mechanical, no translation, ~1 agent)
0. ⚠️ **The registry is necessary but not sufficient.** Two hand-written per-locale UI-string
   tables live outside `scripts/_locales.cjs` and must ALSO gain a block for the new locale:
   `SR_UI` in `js/step-runner.js` (lesson-step chrome) and `L` in
   `scripts/gen-lesson-static.cjs` (the SEO static block). Both fall back to English if the
   locale is absent — `gen-lesson-static.cjs` now warns loudly, `step-runner.js` does not.
   Missing either produces English chrome on translated pages that every coverage audit
   reports as 100%.
1. Add the locale record to `scripts/_locales.cjs`; regenerate `js/locales.js`.
2. Create `js/langs/lang-<code>.js` as an empty registered dict.
   ⚠️ These packs are plain JS. `ui-lang.cjs --apply` appends before the closing `};` and
   trailing-comma conventions differ between packs — it self-verifies and rolls back, but
   **never hand-edit the tail** (CLAUDE.md).
3. Create the 4 directories: `<dir>/`, `culture/<dir>/`, `travel/<dir>/`, `learn/<dir>/`.
4. Author the **glossary** — see §4a. Blocking: nothing translates before it exists.

### Stage 2 — UI chrome pack (631 keys, 1–3 agents)
```
node scripts/ui-lang.cjs --extract --langs <code> --chunk 220
# agents fill scripts/_trans/ui/<code>/chunk-NN.json
node scripts/ui-lang.cjs --apply <code> <corrections.json>
node scripts/ui-lang.cjs --status          # must show 0 missing for <code>
```
This is the highest-leverage 631 strings in the whole language: it drives the nav, sidebar,
buttons, card titles **and** the generators in stage 3. Thai shipped with 68% of its chrome
in English while its lesson content scored 4/5 — that is the failure mode this stage prevents.

### Stage 3 — Generate the 45 page shells (mechanical, no agent)
```
node scripts/gen-root-mirrors.cjs <code>            # 7 root pages — 100% dict-covered, done
node scripts/gen-learn-mirrors.cjs --fresh <code>   # 18 learn shells (Phase 0.4)
node scripts/gen-content-mirrors.cjs <code>         # 15 culture + 5 travel, prose in English
```
Run **once**, before any prose translation of this locale. Re-running after stage 5 destroys
the work — the single most repeated warning in both guides.

### Stage 4 — Lesson JSON, 2,065 units (~20 agents, parallel within the language)
```
node scripts/qa-lang.cjs --extract --langs <code> --gaps-only --chunk 100
# agents fill scripts/_trans/qa/lang/<code>/chunk-NN.json
node scripts/qa-lang.cjs --apply <code> <corrections.json>
node scripts/qa-lang.cjs --status --langs <code>    # must be 0 across all 5 groups
node scripts/gen-lesson-static.cjs                  # regenerate the SEO static blocks
node scripts/gen-search-words.cjs
node scripts/gen-lesson-manifest.cjs
```
Group sizes: grammar 469 · hangul 435 · phrases 128 · vocabulary 725 · writing-typing 308.
`--apply` is loss-free and navigates a stored trail — no string matching in the write path.
Only ever **add** `_<suffix>` fields; never modify base/English or another locale's fields.

Locale-specific fields that are **not** covered by the generic suffix mechanism and need an
explicit decision per language (record in the glossary):
- pronunciation aids — `katakana` (ja), `zhuyin` (zh-tw), `reading_vi`, `reading_th`. New
  locales with a non-Latin script may want one (`reading_hi`, `reading_ar`, `reading_my`,
  `reading_km`, `reading_ne`, `reading_ru`); Latin-script locales use the existing
  Revised-Romanization line and add nothing.
- `zh-cn` / `zh-hk` should carry `zhuyin`-equivalent decisions: `zh-cn` → **pinyin**, `zh-hk`
  → **Jyutping** or nothing. Decide before stage 4, not during.

### Stage 5 — Prose (the bulk: ~107k words, ~24 agents)
**5a. `learn/` shells** — 18 pages, but only 4 carry real prose (`dialogues` 5,178 words,
`writing-essays` 1,416, `classical-korean` 1,317, `business-korean` 1,189). The other 14 are
150–350 words each.
```
node scripts/translate-learn-shell.cjs --extract <lesson> <code>
# author scripts/_trans/learn/<lesson>.<code>.json
node scripts/translate-learn-shell.cjs --apply <lesson> <code>
```
This harness only rewrites the contents of a text node whose exact trimmed value is a table
key. It never touches markup, `<head>`, or `#lesson-static` — which is why it is used instead
of hand `Edit`s on these 170 KB files.

**5b. `culture/` + `travel/`** — 20 pages, ~95,400 words. **One agent per page**, following
`translation/GUIDE.md` §3/§4/§7 verbatim. This is the model that actually delivered
de/fr/vi/th/id; the string-chunk harness is a mop-up tool, not a bulk tool (§0.9).
Order small → large so terminology settles before the expensive pages:
`travel/planner` (87w) → `travel/cities` → `travel/themes` → `travel/index` →
`culture/index` → `travel/itineraries` → `kchicken` → `mandu` → `kbbq` → `ramyeon` →
`kimchi` → `kbeauty` → `ksports` → `kdrama` → `kgaming` → `kfashion` → `kmovie` →
`kpop` → `kfood` → `koreanthing`.

Per page the agent must also translate `<title>`, `meta description`, `og:*`/`twitter:*`
titles and descriptions — the generator leaves those in English.

### Stage 6 — QA (4 agents in parallel, see §6)

### Stage 7 — Wire-up + gate (mechanical, then §7 checklist)

🚨 **FLIP `status: 'planned'` → `status: 'live'` in `scripts/_locales.cjs` FIRST, before
running a single script below.** Verified 2026-08-19 by reading the sources, not assumed:

- `fix-culture-travel-seo.cjs` builds `LOCALES`, `HREFLANG_ORDER`, `BYLINE`, `CJK` and `RTL`
  from `registry.live()`, and its page filter (`KNOWN_DIRS.has(dir) && !LIVE_DIRS.has(dir)`)
  **skips every page of a planned locale outright**.
- Consequence if run in the wrong order: the locale's 45 pages get no hreflang cluster, no
  canonical/og:url pass, and no byline normalization, while the script exits 0 and reports
  success. Every live page keeps a 10-tag cluster (9 locales + x-default) that does not
  mention the new locale, and `gen-sitemap.cjs` emits none of its URLs.
- Measured on pt-BR at this point in the rollout: `culture/pt-br/kimchi.html` carried
  **10** hreflang tags, `hreflang="pt-BR"` count **0** — on its own page.

This is the same defect shape as bug 4 (`gen-lesson-static.cjs` iterating live locales only):
a status gate standing in for a "has this been scaffolded" gate. Here the gate is correct —
a half-translated locale must not enter other locales' hreflang clusters — so the fix is
ordering, not code: **finish stage 5, pass stage 6, flip the status, then run stage 7.**

```
# 0. scripts/_locales.cjs: status: 'planned' → 'live'   ← MUST BE FIRST
node scripts/fix-sidebar-korean-labels.cjs --locale <code>
node scripts/fix-locale-number-format.cjs --locale <code>
node scripts/fix-culture-travel-seo.cjs
node scripts/fix-culture-travel-nav.cjs
node scripts/inject-seo.mjs
node scripts/gen-sitemap.cjs
node scripts/audit-i18n.cjs --check
```
Then add the locale to `lang-core.js`'s hero picker and modal (registry-driven after Phase 0),
commit, deploy, and only then start the next language.

---

## 4a. The glossary — the one artifact that makes parallel agents safe

Before any agent translates a word, author `scripts/_trans/glossary/<code>.json`
(the directory already exists; `qa-glossary-extract.cjs` is precedent). It must fix:

- **Register / politeness.** One choice, stated: `pt-BR` você, informal · `ru` **вы** for
  service/travel phrases, **ты** for direct learner address — pick one and hold it, do not
  mix mid-page · `tr` sen · `zh-hk`/`zh-cn` 你, Standard Written Chinese · `ar` MSA,
  second-person masculine-neutral · `ms` *anda* in chrome, *awak* avoided.
  `ja`-style politeness distinctions do not transfer — do not invent one.
- **Kept terms** (never translated): Korean 한글, Revised Romanization in parentheses,
  `kr-trans` blocks, `K-Pop`/`K-Drama`/`K-Beauty`/`K-BBQ`, band/drama/film/brand names,
  `TOPIK`, `Hangul`, `KTX`, `Seoul`/`Busan`/`Jeju` unless the locale has an established
  exonym (Arabic and Hindi do — decide once).
- **Script-transliteration policy for proper nouns.** Non-Latin locales must decide whether
  `BTS`/`Netflix`/`Seoul` are transliterated into the local script or kept in Latin. `ja` and
  `zh-tw` are precedents to consult, and the choice must be uniform across all 45 pages.
- **~40 recurring domain terms** with a fixed target: lesson, step, vocabulary, flashcard,
  syllable block, speech level, honorific, particle, stroke order, romanization, streak,
  quiz, word bank, pronunciation, batchim.
- **Numerals and dates**: thousands separator, decimal mark, date format, and whether the
  locale uses non-Western digits (Arabic — **use Western digits**, they are near-universal in
  modern Arabic web copy and the site's numbers are prices and years).

Every stage-2/4/5 agent is handed this file. Every stage-6 agent audits against it.

---

## 5. Accelerators — three of the seven should not be translated from scratch

These cut roughly 40% off three of the seven. Each carries a mandatory divergence review;
a naive copy is worse than a fresh translation because it reads as native but is wrong.

**`zh-cn` from `zh-tw`.** Traditional → Simplified is a script conversion, but Taiwan and
mainland lexicons genuinely differ: 軟體/软件, 網路/网络, 影片/视频, 計程車/出租车, 資訊/信息,
檔案/文件, 部落格/博客, 滑鼠/鼠标. Use a term-aware conversion (OpenCC `t2s` + a hand-authored
term table in the glossary), then a **full human-equivalent read of every page** by the
fluency reviewer. Also swap 注音 (`zhuyin`) for **pinyin** across the lesson JSON.

**`zh-hk` from `zh-tw`.** Script stays Traditional; the lexicon shifts to HK usage
(的士 not 計程車, 巴士 not 公車, 電郵 not 電子郵件, 質素 not 品質) and written HK Chinese is
Standard Written Chinese, **not** written Cantonese — do not colloquialize. Cheapest of the
seven. Decide up front whether to add Jyutping. **Runs before `zh-cn`** so the derivation
tooling is proven on the case that does not also change script.

**`ms` seeded from `id`.** Malay and Indonesian share ~70% of vocabulary but diverge on
high-frequency words in ways that read as wrong, not foreign: id *bisa* / ms *boleh*,
id *mobil* / ms *kereta*, id *ban* / ms *tayar*, id *kantor* / ms *pejabat*, id *cakap*
usage, and a systematic difference in loanword orthography (id from Dutch, ms from English).
Seed, then require a **line-by-line** divergence pass, not a spot check. If the fluency
reviewer cannot commit to that, translate `ms` from English instead. Scheduled last so it
inherits six prior runs of the QA pipeline.

---

## 6. The QA team — four roles, per language, run in parallel after stage 5

The user's requested three (leak, missing, AdSense) plus a fourth that the previous passes
proved is needed: nothing mechanical catches machine-translationese, and the 2026-07 rejection
was a *quality* judgment, not a coverage one.

### QA-1 · Leak auditor — "is any of this the wrong language?"
Catches: English left behind, and — the historical failure on this site — *another locale's*
prose bleeding in (the generator bug that put Spanish into de/fr/vi/th/id, and German into
th/id root pages).
```
node scripts/audit-content-locale-dup.cjs --json          # sentenceRatio is the number that matters
node scripts/audit-learn-locale-dup.cjs --json
node scripts/fix-sidebar-korean-labels.cjs --check --locale <code>
node scripts/extract-content-untranslated.cjs --locales <code> --no-floor
```
Plus a targeted scan for the eight existing locales' high-frequency function words appearing
in the new locale's files (the "Entdecke/Lerne/Stufen" class of defect).
**Must know:** duplication that is *supposed* to exist — Korean, romanization, `.ja-block`/
`.no-ja` locale-swap pairs, `rom-text`/`food-card-rom`/`phrase-rom`/`rom-cell` — is excluded
by `_locale-prose.cjs` and is not a finding. Two earlier audits reached the opposite, wrong
conclusion by ignoring this (CLAUDE.md, "Translation status under learn/").

### QA-2 · Coverage auditor — "is anything missing?"
```
node scripts/qa-lang.cjs --status --langs <code>     # 2,065 units → must be 0 gaps
node scripts/ui-lang.cjs --status                    # 631 keys → 0 missing for <code>
node scripts/audit-i18n.cjs --check
node scripts/audit-learn-content.cjs
node scripts/audit-content-parity.cjs <code>         # div-for-div structural parity vs English
```
**Must not** use `qa-translations.cjs` for coverage — documented structural blind spot
(it hid 219 untranslated strings behind a reported "0 gaps").
Also reviews `ui-lang.cjs`'s `value===English` column as a queue: some are correct
(`K-Pop`, `Hangul`), some are untranslated keys hiding as correct.

### QA-3 · AdSense / SEO auditor — "can this locale carry ads and be indexed?"
- **Language support** — already verified for all nine (§0(a)); re-confirm against the live
  list if Google has revised it since 2026-08-12, and record any change in §9.
- **Thin content** — `node scripts/audit-page-words.cjs`; no indexable page under ~300 words.
  `travel/<code>/planner` is ~100 words and interactive: it must be `noindex`, matching the
  9 existing planner pages. Do not reintroduce a locale-wide noindex for anything else.
- **hreflang reciprocity** — every one of the 45 pages must list every shipped locale plus
  `x-default`, and every listed target must link back. `fix-culture-travel-seo.cjs` enforces
  reciprocity and silently drops one-way links; verify the count is *(9 existing + N shipped
  new) + 1*, not "some". At full rollout that is **18 + x-default**.
- **Canonical / og:url** — self-referencing, `cleanUrls` form (no `.html`), no trailing slash.
- **Sitemap** — `gen-sitemap.cjs` re-run; the new locale's 45 URLs present; no `noindex` page
  emitted (the "Submitted URL marked noindex" class that sank the previous submission).
- **`<html lang>`** — correct on all 45 pages, and `dir="rtl"` where applicable. This attribute
  is the single source of truth for `LangManager`; a wrong value produces the hybrid-language
  bug documented in `docs/i18n-locale-leak.md`.
- **Ad zones** — present at the same density as the English source; `window.KSAds.push()`
  called by any dynamic renderer; zones collapse via `height:0`, **never** `display:none`
  (that broke the visibility-guarded push in `js/ads.js` once already).
- **Deploy surface** — nothing new added at the repo root without a `.vercelignore` line.

### ⚠️ Dispatch rule learned the expensive way (2026-08-13)

**An agent's completion report is a claim, not evidence. Measure the file.**

Two prose agents given a TWO-FILE prompt each responded by spawning their own subagents and
returning a confident report — *"Both translation agents are running in the background… I'll
wait for their completion notifications, then run the final verification"* — and then simply
terminated. Between them they burned **281k tokens and wrote nothing at all.** One of them
additionally claimed *"I already handled the `<head>` metadata myself"*; the `<title>` was
still `Korean BBQ Meat Guide`.

Nothing about the reports looked wrong. The only thing that caught it was re-running
`audit-content-locale-dup.cjs` and seeing the ratio unchanged at 0.859.

So, for every prose dispatch:
1. **One page per agent.** Both failures were two-file prompts; the single-page prompts all did
   the work themselves. A multi-file assignment appears to read as an invitation to parallelise.
2. **State `⛔ DO THE WORK YOURSELF. Do not spawn subagents`** explicitly in the prompt.
3. **Verify with the measurement, never the report.** `sentenceRatio` before and after. Tell the
   agent its report will be checked against the file — it costs nothing and sets the expectation.
4. **The prohibition is not fully reliable.** Even with `⛔ DO THE WORK YOURSELF. Do not spawn
   subagents` in the prompt, four single-page agents still delegated (their children showed up
   as separate tasks named "Translate kbbq.html main content to pt-BR" etc.). Those children DID
   do real work, so the outcome was fine — but plan for it: dispatch fewer agents per wave than
   the session budget appears to allow, because each one may quietly become two or three.

**Partial pages are always safe to resume.** Every `Edit` is atomic and the pages are static
HTML with no build step, so a mid-page death leaves a valid document. After every crash so far:
div balance exact on all 20 pages, `<html lang="pt-BR">` intact, all 45 pt-BR pages serving 200.
Nothing has ever needed unwinding. Re-measure with `audit-content-locale-dup.cjs --locales pt-br`
and hand the next agent the same page.

### QA-4 · Native fluency reviewer — "would a native speaker trust this site?"
Reads a stratified sample — the 7 root pages in full, 3 full culture pages including the
largest, 2 learn shells, 60 sampled lesson-JSON units, and the whole 631-key UI pack — and
judges:
- machine-translationese, calques, and English word order surviving into the target;
- glossary adherence (§4a) and terminology consistency **across** agents, which is exactly
  what parallel translation puts at risk;
- register consistency (the single politeness choice held everywhere);
- Korean pedagogy still correct after translation — a mistranslated grammar explanation is a
  worse defect than an untranslated one, and no mechanical check can see it;
- typography: correct quotation marks, no broken diacritics, no mojibake, CJK/Thai/Khmer/
  Myanmar line-breaking not obviously wrong, RTL punctuation correct for `ar`.
Produces a numbered defect list with file/line; a **fix agent** applies it; QA-4 re-reads the
fixed lines only.

---

## 7. Definition of done (per language) — all must pass before the next language starts

1. `node scripts/audit-i18n.cjs --check` → exit 0.
2. `node scripts/qa-lang.cjs --status --langs <code>` → 0 gaps in all 5 groups (2,065/2,065).
3. `node scripts/ui-lang.cjs --status` → 0 missing keys for `<code>`.
4. `node scripts/audit-content-parity.cjs <code>` → every culture and travel page ✅
   (⚠️ only where the cause is a verified brand/romanization-only count).
5. `node scripts/audit-content-locale-dup.cjs` → the locale's `sentenceRatio` in line with the
   existing 8; no page ≥50% English.
5b. `node scripts/qa-mixed-nodes.cjs <dir> --check` → 0. **Not optional and not implied by 5** —
   it is the only check that can see English prose carrying an inline Hangul gloss (§9 bug 8).
   A page at `sentenceRatio` 0.000 can still be serving 78 English sentences.
6. `node scripts/audit-learn-locale-dup.cjs` → same.
7. `node scripts/gen-sitemap.cjs` → 45 new URLs, 0 noindex URLs emitted, hreflang cluster
   = every shipped locale + `x-default`.
8. QA-4 sign-off recorded in §9 with the sample list and the defect count.
9. Browser spot-check via `node dev.js`: one page per section, correct `lang`/`dir`, no console
   errors, sidebar anchors resolve, ad zones present (or absent by policy, §0(a)).
10. Committed on its own branch, one language per PR. Never batch two languages into one commit.

---

## 8. Effort and agent budget

Per language, roughly: 1 scaffold + 1 glossary + 3 UI + 21 lesson-JSON + 4 learn-shell +
20 culture/travel + 4 QA + 2 fix ≈ **56 agents**. The three derived locales (`zh-hk`,
`zh-cn`, `ms`) run closer to 30 each, since translation is replaced by conversion plus
review. Across the 7 languages ≈ **320 agents**, plus Phase 0.

Phase 0 is ~2–4 focused sessions and is not parallelizable in any useful way — the registry
refactor touches the same 22 files every other item needs.

The honest read: this is a large, multi-month programme, not a single sitting. Strict
sequencing is the right call, and the plan is built so that stopping after any completed
language leaves the site in a fully consistent, deployable state.

**Revenue caveat worth restating.** Seven locales multiply reachable traffic; they do not
raise RPM. If ad revenue is the first-order goal, the highest-leverage work is not
necessarily here — AdSense approval status, and ad placement/density on the existing 9
locales and the English source, compound across every locale added later.

---

## 9. Decision log and progress (update as you go — this section is the resume mechanism)

| Item | Decision / status | Date |
|---|---|---|
| AdSense supported-language list checked | ✅ **verified** — 50 languages, [support.google.com/adsense/answer/9727](https://support.google.com/adsense/answer/9727?hl=en) | 2026-08-12 |
| `mn`, `my`, `km`, `ne`, `uz` | ✅ **CUT** — unsupported languages, zero possible ad revenue, ad code on them violates Publisher Policies | 2026-08-12 |
| `fil`, `hi` | ✅ **deferred** by owner — supported but lower-tier demand; Phase 0 covers them if ever resumed | 2026-08-12 |
| Language order | ✅ **LOCKED**: pt-BR → ru → tr → zh-hk → zh-cn → ar → ms | 2026-08-12 |
| `zh-cn` hreflang: `zh-Hans` vs `zh-CN` | ⏳ pending | — |
| `zh-hk` Jyutping: yes/no | ⏳ pending | — |
| Arabic numerals: Western vs Eastern-Arabic | proposed **Western** | 2026-08-12 |
| Phase 0.1 locale registry | ✅ `scripts/_locales.cjs` + `js/locales.js` + `gen-locales-js.cjs --check`; 16 records (9 live, 7 planned) | 2026-08-12 |
| Phase 0.2 step-runner refactor | ✅ 92 ternaries → 1; **equivalence proof still owed** | 2026-08-12 |
| Phase 0.3 flag SVGs | ✅ all in registry, 6 new authored | 2026-08-12 |
| Phase 0.4 fresh-locale generator mode | ✅ `--fresh <locale>` on gen-learn-mirrors (18 pages wholesale from English, refuses if dir populated unless `--force`); `--out <dir>` on all 3 mirror generators; `de` output proved byte-identical vs HEAD (md5, 0 diffs); dead `news/` path rewrites stripped from all 3 | 2026-08-12 |
| Phase 0.5 RTL CSS | ✅ 111 physical→logical substitutions, symmetric; **browser check still owed before `ar` ships** | 2026-08-12 |
| Phase 0.6 per-locale fonts | ✅ marker-guarded `<!-- ks:locale-font -->` injection in all 3 mirror generators; fires only where registry `font` is non-null (zh-hk, zh-cn, ar) | 2026-08-12 |
| Phase 0.7 `middleware.js` CN block | ✅ **done** — header-based (`x-vercel-ip-country`), 403 + zh-Hans page, fails open, 20/20 logic tests. Owner must run the post-deploy checklist in §0.7 | 2026-08-12 |
| CN block response code: 451 vs 403 | ✅ **403** — no legal demand exists, so 451 would be a false claim | 2026-08-12 |
| Phase 0.8 SEO/sitemap/nav scripts | ✅ all 7; sitemap `<loc>` set verified identical (378/378); `inject-seo.mjs` → 0 HTML files touched | 2026-08-12 |
| Phase 0.9 audit harness extension | ✅ 12 files; `audit-i18n.cjs` **13 → 16 invariants** (page-count parity, per-locale coverage table, rtl+font correctness); `--locales` override everywhere; fresh locales report NOT PRESENT, never a silent pass | 2026-08-12 |
| **PHASE 0 GATE** | ✅ **16/16 invariants hold, exit 0. Zero HTML files modified.** Two debts owed before `ar` ships — see below | 2026-08-12 |
| Language 1 `pt-BR` | 🔄 Stage 1–4 ✅ · Stage 5 in progress | 2026-08-13 |
| ↳ Stage 1 scaffold + glossary | ✅ `js/langs/lang-pt-br.js`, 4 dirs, `scripts/_trans/glossary/pt-br.json` | 2026-08-13 |
| ↳ Stage 2 UI pack | ✅ **631/631**, 0 missing; `qa-ui-pack.cjs` all hard checks pass | 2026-08-13 |
| ↳ Stage 3 page scaffold | ✅ **45 pages**; dry-run diffed first; scope confirmed by mtime | 2026-08-13 |
| ↳ Stage 4 lesson JSON | ✅ **2065/2065**; static blocks regenerated (median 399 w vs en 360 / de 354 / es 384) | 2026-08-13 |
| ↳ Stage 5a learn shells | ✅ **complete** — all 18 pages, 760 strings, **plus all 74 mixed EN+Hangul nodes** (bug 7). Hangul integrity verified: 18/18 pages within 3% of the English source's Hangul count, 0 with loss | 2026-08-14 |
| ↳ Stage 5b culture/travel | 🔄 **8 of 20 complete.** Exact state below | 2026-08-14 |

**Stage 5b resume table** — `sentenceRatio` from `node scripts/audit-content-locale-dup.cjs
--locales pt-br`. That number is the fraction of sentence-length prose still byte-identical to
English; it is the resume mechanism, so re-run it rather than trusting this snapshot.

Snapshot **2026-08-19**, mid-session. All 5 `travel/pt-br/` pages, the culture hub and 6
culture pages are done. **A page counts as done only when BOTH `sentenceRatio` is 0 and
`qa-mixed-nodes.cjs` reports 0 for it** (§9 bug 8) — `ramyeon` and `kimchi` each measured
`sentenceRatio` 0.000 while still serving English, and needed a second pass.

| page | sent | raw | mixed | state |
|---|---|---|---|---|
| `culture/pt-br/kbeauty.html` | 0.000 | 0.016 | 0 | ✅ |
| `culture/pt-br/kimchi.html` | 0.000 | 0.027 | 0 | ✅ |
| `culture/pt-br/index.html` | 0.000 | 0.028 | 0 | ✅ |
| `culture/pt-br/kbbq.html` | 0.000 | 0.029 | 0 | ✅ |
| `travel/pt-br/index.html` | 0.000 | 0.030 | 0 | ✅ |
| `culture/pt-br/kdrama.html` | 0.000 | 0.033 | 0 | ✅ |
| `culture/pt-br/mandu.html` | 0.000 | 0.034 | 0 | ✅ |
| `culture/pt-br/ramyeon.html` | 0.000 | 0.038 | 0 | ✅ |
| `travel/pt-br/planner.html` | 0.000 | 0.045 | 0 | ✅ |
| `travel/pt-br/cities.html` | 0.000 | 0.045 | 0 | ✅ |
| `culture/pt-br/kmovie.html` | 0.000 | 0.046 | 0 | ✅ |
| `culture/pt-br/kchicken.html` | 0.000 | 0.055 | 0 | ✅ |
| `culture/pt-br/kfashion.html` | 0.000 | 0.059 | 0 | ✅ |
| `travel/pt-br/itineraries.html` | 0.005 | 0.015 | 0 | ✅ |
| `travel/pt-br/themes.html` | 0.006 | 0.022 | 0 | ✅ |
| `culture/pt-br/ksports.html` | 0.028 | 0.065 | 0 | ✅ |
| `culture/pt-br/kgaming.html` | 0.030 | 0.098 | 0 | ✅ |
| `culture/pt-br/kfood.html` | 0.181 | 0.208 | 37 | ⏳ |
| `culture/pt-br/koreanthing.html` | 0.210 | 0.202 | 1 | ⏳ |
| `culture/pt-br/kpop.html` | 0.979 | 0.906 | 55 | ⏳ |

**Do NOT hand-fix these — Stage 7 regenerates them, and only after the status flip.**
Three cosmetic defects were spotted across the finished pt-BR pages. All three are owned by
`fix-culture-travel-seo.cjs`, which strips and rewrites them from the registry, so hand-editing
them now is wasted work that the script will overwrite anyway:
- **Byline drift.** 11 pages read `21 July 2026`, 8 read `21 de julho de 2026`; 6 read
  `Last updated`, 13 `Última atualização`. Agents localized it ad hoc. The script deletes the
  whole `<p class="page-byline">` and reinserts one from `byline: { by:'Por',
  upd:'Última atualização', fmt:'pt-BR' }`.
- **Schema.org `inLanguage`.** 18 of 20 pages still say `"inLanguage": "en"`. The script sets it
  from `LOCALES[loc]` and its `--check` mode flags the mismatch as `LD-INLANG-WRONG`.
- **JSON-LD `headline`/`description`** still English on most pages; regenerated from the page's
  own (now translated) `<title>`.

⚠️ All three are gated behind `registry.live()`. Running the script before the flip fixes
none of them and still exits 0.

**Two cheap lessons from this session, both worth reusing on `ru`:**
- The *vocabulary table* at the foot of each culture page and the *tag chips* on every food
  card are the two things agents most often leave in English, because neither is
  sentence-length and so neither moves `sentenceRatio`. `kimchi` alone had **68** English tag
  chips at `sentenceRatio` 0.000. Check them explicitly. Established column convention:
  `Coreano / Romanização / Português`.
- Session limits kill agents mid-page and that is genuinely fine. After 4 more kills this
  session, div balance stayed exact on all 20 pages and every page still served 200.
- 🔴 **Parallel agents share ONE scratchpad directory and WILL clobber each other.** Three
  agents independently hit this: one wrote `apply.cjs` at the scratchpad root, a second
  overwrote it, and the second's invocation then executed the *first* agent's script against
  the *first* agent's file. No damage occurred (the stale script matched 0 of 21 pairs and
  rewrote identical bytes — `ksports.html` Hangul verified 5166/5166 against the English
  source afterwards), but a collision on a script doing `fs.writeFileSync` could corrupt
  another agent's page. **Every prose-agent prompt must require a uniquely-named scratchpad
  subdirectory** (`<page>-<locale>/`) and forbid generic filenames at the root.

⚠️ Note `ratio` (raw) vs `sentenceRatio`: a finished page settles around raw 0.03–0.06 because
brand names, place names and romanization are legitimately identical to English. Judge by
`sentenceRatio` (first column), and confirm the residual is brand/name/Korean before calling a
page done.

Partial pages are SAFE to resume: each `Edit` is atomic, div balance verified exact on all six,
`<html lang="pt-BR">` intact, all 20 pages serve 200. Nothing needs unwinding. Head metadata
(`<title>`, `meta description`, `og:*`) is translated on all four completed pages, with the
`한국어 학교` brand element preserved in every title.

**Culture-hub wording — the 14 culture pages MUST match this.** The hub agent was cut off
before reporting it, so it is recorded here from the finished file:

- 🎵 K-Pop — a gíria e a fala de uma geração
- 🎬 K-Drama & cinema — a língua com emoção
- 🍜 Comida — o vocabulário que você mais vai usar
- ✨ Beleza & moda — palavras de tendência que viajam
- 🎮 Games & esportes — onde a Coreia compete
- 🇰🇷 A Coreia do dia a dia — o que os locais simplesmente sabem
- Hallyu is rendered "Hallyu (한류)" — keep the Hangul gloss.
| Language 2 `ru` | ⏳ not started | — |
| Language 3 `tr` | ⏳ not started | — |
| Language 4 `zh-hk` | ⏳ not started | — |
| Language 5 `zh-cn` | ⏳ not started | — |
| Language 6 `ar` | ⏳ not started | — |
| Language 7 `ms` | ⏳ not started | — |

### Open debts — must clear before the locale they gate ships
1. ~~**step-runner render-equivalence proof**~~ ✅ **CLEARED 2026-08-13.** Harness:
   `scratchpad/sr-equiv.cjs` — loads HEAD's step-runner and the working tree's in two isolated
   `vm` sandboxes with a stubbed DOM, renders one real step of every type from `learn/data/`
   in all 9 live locales, diffs the HTML.
   **Result: 81/81 identical, 0 failures.** 10 step types × 9 locales = 90 comparisons; the
   remaining 9 are `lesson_complete`, which throws identically in both (needs live `lessonData`
   and a fuller `KSProgress`) and is separately proven unaffected: its source is **byte-identical**
   between HEAD and the working tree (2,242 chars both) and contains neither `ui(` nor
   `lang === `, so the refactor could not have touched it.
   Two traps worth recording for anyone re-running this:
   - `match_quiz` shuffles its options with `Math.random`, so two independent runs differ by
     option *order* even when the refactor is a no-op. The harness gives each sandbox a seeded
     mulberry32 PRNG and resets both to the same seed before every comparison — that isolates
     the shuffle while still failing on a real text difference. Without it, 8 false failures.
   - Repo JS files are mixed LF/CRLF; the harness normalizes before matching source.
2. **RTL browser check** (gates `ar` only). 111 physical→logical CSS substitutions landed and
   are provably symmetric 1:1, so LTR cannot have changed — but nothing has rendered a page at
   `dir="rtl"` yet. No headless browser is installed here; a human must look at the sidebar,
   progress grid, syllable builder (its cho/jung/jong columns must NOT mirror) and the typing
   and stroke widgets.
3. **`middleware.js` post-deploy verification** (gates `zh-cn` only). Checklist in §0.7. The ESM
   `.js` vs `.mjs` question cannot be settled locally.

Also note: `audit-i18n.cjs`'s new rtl/font check currently runs against zero rtl and zero
font-bearing live locales, so a clean run proves only "nothing regressed", not that the
mechanism works. Real proof arrives with `zh-hk`.

### Tooling bugs found by running the pipeline for real (pt-BR, 2026-08-13)

Phase 0 converted every script to the registry, and all 16 invariants passed — yet the
first real rollout hit **six** blocking bugs. Every one of them would have hit all six
remaining locales. Recording them because the lesson generalises: *a locale list refactor
that passes its own audits still has not been exercised by a locale that does not exist yet.*

1. **`ui-lang.cjs --apply` could not fill an empty pack.** Its trailing-comma detector reads
   "no comma before the close → add one", but a stage-1 empty dict is `const PT_BR = {`, so it
   emitted `{ , …` — a SyntaxError. The rollback guard caught it and restored the file, but the
   operator is then stuck with a pack that can never be filled. Fixed by detecting the empty
   body explicitly.
2. **`qa-lang.cjs --extract` rejected a `planned` locale** while `--status` accepted it. The
   locale mid-rollout is the *only* one that ever has 2,065 gaps to extract, so the round trip
   was impossible for exactly the case it exists to serve. `--apply` had the same gate.
3. **The extract manifest built `vals` from live locales only**, so `vals['pt-br']` was
   `undefined` and `--gaps-only` threw on `.trim()`.
4. **`gen-lesson-static.cjs` iterated live locales only.** This is the serious one:
   `learn/pt-br/`'s `#lesson-static` block kept the **English** scaffold while
   `qa-lang.cjs --status` reported 2065/2065. That block is the SEO-critical one whose absence
   caused the 2026-07 AdSense rejection, and **nothing in the toolchain would have reported it.**
   `status` was the wrong gate — the loop already skips locales with no `learn/<code>/`
   directory, so "has been scaffolded" was always the real precondition.
5. **`gen-lesson-static.cjs` carries its own hardcoded per-locale UI-string table `L`** — the
   same class as `js/step-runner.js`'s `SR_UI`, missed by the Phase 0.2 sweep because that
   agent owned only step-runner. An unknown locale crashed with a bare
   `Cannot read properties of undefined (reading 'intro')`. Now falls back to English **loudly**,
   naming the file and key count.
6. **Adding a locale to `scripts/_locales.cjs` is necessary but NOT sufficient.** Two
   hand-written per-locale string tables exist outside it (`SR_UI`, `L`). Any future locale
   must fill both. Stage 1 of §4 amended to say so. `SR_UI` had no `pt-br` block, which would
   have rendered every lesson step's chrome (Continuar / Ouvir / Repetir / progress meter) in
   English on fully-translated pages, with every coverage audit reporting 100%.

7. 🔴 **`translate-learn-shell.cjs` was blind to MIXED nodes — and so is every locale on the
   site.** It skipped any text node containing Hangul, correctly protecting the Korean being
   taught, but that also hid English prose carrying an inline Korean gloss:

       "Formal Speech in Business (격식체)"
       ". Whether you are joining a Korean company … mastering professional Korean
        (비즈니스 한국어) will set you apart. The formal speech level (격식체) is essential …"

   Two agents independently hit this and both reported it as an unfixable structural boundary.
   Measured 2026-08-13 across `learn/<locale>/`, counting only nodes that carry Hangul **and**
   an English function word (Revised Romanization never does, so `가다 (gada)` stays protected):

   | locale | nodes | | locale | nodes |
   |---|---|---|---|---|
   | pt-br | 89 | | th | 52 |
   | de | 61 | | id | 52 |
   | vi | 56 | | ja | 13 |
   | es | 51 | | zh-tw | 7 |
   | fr | 51 | | **total** | **432** |

   **This is a pre-existing defect on all 8 shipped locales, not a pt-BR one.** Every audit
   reported those pages fully translated.

   Fixed by adding `--include-mixed` to `--extract` (opt-in; default behaviour unchanged) plus
   a guard in `--apply` that compares the multiset of Hangul characters between key and value
   and **refuses** any entry that drops or alters Korean. Verified by deliberately feeding it a
   lossy value: refused, and the target file came back byte-identical.

   ⏳ **Backlog:** pt-BR's 74 are being cleared now. The other ~343 across de/es/fr/vi/th/id/ja/
   zh-tw are a separate job — run `translate-learn-shell.cjs --extract <lesson> <locale>
   --include-mixed` per page and diff against the plain extract.

8. 🔴 **`audit-content-locale-dup.cjs` is blind to the SAME mixed-node class under `culture/`.**
   Found 2026-08-19 while mopping up `ramyeon`. `_locale-prose.cjs` excludes any text node
   containing Hangul — correct and load-bearing, it is what protects the Korean being taught
   and the romanization lines from counting as untranslated. But it also hides English prose
   that carries a parenthetical Korean gloss:

       "유리 피부 (glass skin) — skin so clear, smooth, and hydrated it appears translucent"
       "Collaboration between Paldo and Gonghwachun — Incheon's oldest ... premium instant 짜장면."

   A page therefore reports **sentenceRatio 0.000 — "fully translated" — while still serving
   dozens of English sentences.** `ramyeon` and `kimchi` both measured 0.000 with 5 such nodes
   each still in English. This is bug 7's twin: same root cause, different directory, and it
   was never checked under `culture/` because bug 7 was diagnosed as a `learn/` problem.

   Measured 2026-08-19 across `culture/pt-br` + `travel/pt-br`, at the point where 11 of 20
   pages were confirmed complete:

   | page | nodes | | page | nodes |
   |---|---|---|---|---|
   | kfood | 78 | | kfashion | 35 |
   | koreanthing | 64 | | kgaming | 25 |
   | kpop | 55 | | ksports | 23 |
   | kdrama | 44 | | kbeauty | 15 |

   Every page independently confirmed complete — `index`, `kbbq`, `kchicken`, `mandu`,
   `kimchi`, `ramyeon`, `kmovie` and all 5 travel pages — scores **exactly 0**, which is the
   calibration that shows the detector has no false positives.

   **Why this did not corrupt the rollout:** an agent told to translate a page reads the file,
   not just the audit, so it clears these nodes as a matter of course. The danger is narrower
   and more specific — it is *the completion check* that is wrong. A page finished by an agent
   that trusted `sentenceRatio` alone, or a mop-up pass driven only by `--show`, ships English.

   New script: **`scripts/qa-mixed-nodes.cjs`** (read-only, exits 1 on `--check`).
   ```
   node scripts/qa-mixed-nodes.cjs <locale-dir>
   node scripts/qa-mixed-nodes.cjs <locale-dir> --show <page>
   node scripts/qa-mixed-nodes.cjs <locale-dir> --check
   ```
   It flags a node when it contains Hangul AND >=2 English function words AND strictly more
   English function words than Portuguese/Malay-style ones. The comparative test is what kills
   the false positives: a correctly translated node like "As partes especiais do frango
   (특수부위) — coração (닭염통)" scores locale-heavy and is not flagged, and Revised
   Romanization ("가다 (gada)") carries no function words at all.

   ⚠️ **A page is not done at `sentenceRatio` 0. It is done at `sentenceRatio` 0 AND
   `qa-mixed-nodes` 0.** Add both to §7. The `LOC` word list in the script is currently
   pt/es/id-shaped; `ru`, `tr`, `zh-*` and `ar` will each need their own function words added
   before this check means anything for them.

   ⏳ **Backlog: the other 8 shipped locales have never been measured for this under
   `culture/`.** Bug 7's learn/ backlog (~343 nodes) is still open too.

9. 🔴 **`audit-i18n.cjs --locales <code>` did not scope invariant 5 — it reported a PASS on
   a locale it had never looked at.** Found 2026-08-19.

   Invariant 5 ("culture/travel prose localized") is the only one that runs in a **child
   process**, and it invoked `audit-content-locale-dup.cjs` with `--json` alone. Child
   processes do not inherit `SCOPE`, so the flag scoped every other check while this one
   quietly fell back to the live locale set. Observed output during a run explicitly scoped
   to pt-BR, at a moment when 5 pt-BR pages were >=50% English:

       node scripts/audit-i18n.cjs --locales pt-br --check
       PASS  culture/travel prose localized (160 pages) — no page >=50%
       16/16 invariants hold.        ← exit 0

   **160 pages is 8 locales × 20.** pt-BR's own 20 pages were never measured, and the run
   still exited 0. This is precisely the failure mode `audit-i18n.cjs`'s own header warns
   about — *a check that cannot see a class of defect is worse than no check* — because the
   operator reads "16/16" and believes the locale is gated.

   Fixed by forwarding the flag when, and only when, it was given:
   ```js
   const i = process.argv.indexOf('--locales');
   const scopeArgs = (i !== -1 && process.argv[i + 1]) ? ['--locales', SCOPE.join(',')] : [];
   ```
   Verified both directions — this matters, because the Phase 0 acceptance rule is that the
   live 8 stay byte-identical:
   - `--check` with no `--locales` → still `160 pages`, still **16/16**, unchanged.
   - `--check --locales pt-br` → now `20 pages`, **FAIL — 5 page(s) >=50% English**, 15/16,
     exit 1. A false PASS became a true FAIL.

   ⚠️ **Consequence for the other six locales:** `--locales` was the documented "fresh-locale
   honesty path" (§0.9), and for this invariant it never worked. Any earlier scoped run that
   reported 16/16 proved nothing about that locale's culture/travel prose.

   Note also that invariant 5 CANNOT see the bug-8 mixed-node class, and its comment now says
   so. `qa-mixed-nodes.cjs` is not subsumed by it — both must be run.

### Corrections to prior records found while writing and executing this plan
- **`CLAUDE.md` is wrong about `package.json`.** Its Scripts section says "package.json is at
  root" and tells you to `npm install` from the root. There is **no root `package.json`** —
  the only one is `scripts/package.json`, and `.vercelignore` excludes it from deploys.
  Corrected in CLAUDE.md 2026-08-12. This mattered: it is why `@vercel/functions` could not be
  used for the CN geo-block.
- The `AdSense Readiness` note claiming *"the entire 8-language localization tree is untracked
  in git"* is **false as of 2026-08-12**: `git ls-files "*.html"` returns 420 of the 422 files
  on disk, including all of `ja/`, `culture/ja/`, `learn/ja/`. Scope verification for this
  programme can and should use `git diff`, not mtimes.
