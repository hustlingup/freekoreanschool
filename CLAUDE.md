## Communication Style
Respond like a caveman. No articles, no filler words, no pleasantries. Short. Direct. Code speaks for itself. If asked for code, give code. No explain unless asked. No sycophancy. No restating the question. No sign-offs.

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Server

```bash
node dev.js        # serves on http://localhost:3000
```

`dev.js` is a plain Node.js HTTP server. It also proxies `/api/tts` to Google Translate TTS for the listen-repeat lesson steps.

## Scripts

All automation lives in `scripts/`. Dependencies: `@anthropic-ai/sdk`, `@supabase/supabase-js`, `dotenv`. Install with `npm install` from the root (package.json is at root).

```bash
# Translation coverage auditing
node scripts/audit-content-translation.cjs <lang> [path]

# Learn page mirror generation (idempotent — safe to re-run)
node scripts/gen-learn-mirrors.cjs

# Lesson manifest for sidebar progress grid — rerun after adding/removing
# lessons or changing step counts in learn/data/*.json
node scripts/gen-lesson-manifest.cjs

# Word search index (learn/data/search-words.json) — every Korean word with
# all-language meanings for the search bar; rerun after editing learn/data/*.json
node scripts/gen-search-words.cjs

# SEO metadata injection (canonical/OG/hreflang/Schema.org into EN+JA pages —
# does NOT touch sitemap.xml)
node scripts/inject-seo.mjs

# sitemap.xml — single source of truth, scans real file inventory across all
# 9 locales (en + ja/zh-tw/es/de/fr/vi/th/id). Rerun after adding/removing any
# learn/culture/travel/root page in any language.
node scripts/gen-sitemap.cjs

# News-section removal (2026-07-21) — idempotent, marker-guarded. Kept as the
# record of what was stripped; rerun only to re-clean if a generator script
# reintroduces a news nav link.
node scripts/remove-news-section.cjs [--check]

# culture/ + travel/ head metadata: robots, canonical, og:url, hreflang cluster,
# Schema.org, visible byline. Idempotent and marker-guarded — rerun to restore
# the work if a generator clobbers it. `--check` verifies without writing and
# exits 1 on drift. Dates come from scripts/culture-travel-dates.json (derived
# from real git history — regenerate it only from git, never by hand).
node scripts/fix-culture-travel-seo.cjs [--check]
```

**Do not run** `gen-content-mirrors.cjs`, `gen-root-mirrors.cjs`, or any language-specific `gen-*-site.cjs` scripts during Phase 2 translation work — they overwrite translated prose with English source.

Secrets needed for the Supabase-backed scripts go in `.env` (gitignored): `SUPABASE_URL`, `SUPABASE_SERVICE_KEY`. `ANTHROPIC_API_KEY` is needed by the translation/asset scripts (`translate-*.{js,mjs}`, `generate-svgs.js`, `revise-articles.js`).

## Architecture

### No build step
The entire frontend is **vanilla HTML + CSS + JS**. There is no bundler, transpiler, or preprocessor. Files are served directly. The only Node.js code is in `scripts/` and `dev.js`.

### JS loading order (every learn/culture/travel page)
1. `js/lang-core.js` — `LangManager` singleton; reads `<html lang>` attribute, exposes `t(key)` translation function, handles language switching via hreflang navigation
2. Language pack IIFE — registers translations via `LangManager.register(langCode, dict)`. Root pages load `js/lang-ja.js` etc.; language-subdirectory pages load `js/langs/lang-<code>.js`
3. `js/app.js` — UI modules: `ThemeManager`, `FloatingChars`, `MobileSidebar`, `SearchManager`, etc.
4. `js/step-runner.js` (learn pages only) — fetches `learn/data/<lesson>.json`, renders interactive lesson steps into `<div id="step-shell">`
5. `js/syllable-builder.js` (hangul/syllable pages) — standalone Hangul composer widget

### Learn page engine (step-runner.js)
Each learn page (`learn/hangul.html`, etc.) is a static HTML shell with an empty `<div id="step-shell">`. `step-runner.js` fetches the corresponding JSON from `/learn/data/<lesson>.json` and renders the step at the URL's `?step=N` param.

**Step types**: `reading_card`, `card_reveal`, `listen_repeat`, `match_quiz`, `syllable_builder`, `lesson_complete`. These six are the complete set — every other type this file used to list (`conjugation_practice`, `choose_syllables`, `copy_phrase`, `write_answer`, `group_by_type`, `drag_reorder`) appears in no lesson JSON and has no renderer.

#### Static lesson content (`#lesson-static`) — SEO-critical
A lesson renders only ONE step per `?step=N` URL, so the shell alone was ~62 crawler-visible words. That was the primary cause of the 2026-07 AdSense "Low value content" rejection. `scripts/gen-lesson-static.cjs` now pre-renders the *entire* lesson from the JSON as semantic HTML into `<details id="lesson-static">`, taking each page to a median 2,468 words. `step-runner.js` calls `hydrateStaticReference()` after the first successful `renderStep()`, which only removes the `open` attribute — the content stays in the DOM and stays reachable. This is progressive enhancement, not cloaking; do not change it to `display:none`.

⚠️ `#lesson-static` MUST be a sibling **after** `#step-shell`, never inside it. `buildShell()` does `innerHTML =` on `#step-shell`, so a nested block is destroyed on hydration.

Rerun `node scripts/gen-lesson-static.cjs` (idempotent) after editing any `learn/data/*.json`; verify with `node scripts/audit-learn-content.cjs`.

Localized fields in JSON use `_<lang>` suffixes (e.g. `title_ja`, `body_zh_tw`, `meaning_es`). The helper `loc(obj, base)` inside step-runner picks the right variant based on the current language. Pronunciation aids use dedicated fields: `katakana` (JA), `zhuyin` (ZH-TW), `reading_vi`/`reading_th` (others).

### Localization architecture
- **8 language versions**: `ja`, `zh-tw`, `es`, `de`, `fr`, `vi`, `th`, `id`
- **All 8 are fully translated** (prose + chrome). The old "chrome-only for `de`/`fr`/`vi`/`th`/`id`" claim was stale — a 2026-07-21 audit measured trigram overlap against the English source at .021–.044 for every locale, with spot-checks confirming genuine prose. Consequence: any `noindex` still applied to those locales by the 2026-07-07 translation gate is suppressing legitimate pages and should be lifted.
- The 2026-07-07 translation gate that noindexed 96 culture/travel pages was lifted 2026-07-21 by `scripts/fix-culture-travel-seo.cjs`. The only culture/travel pages that remain `noindex` are the 9 `travel/*/planner` tool pages (~100 words each, interactive, thin in every locale). Do not reintroduce a locale-based noindex.
- Each language's pages live under `/<lang>/` for root pages and `learn/<lang>/`, `culture/<lang>/`, etc. for content
- All language versions load the **same** `learn/data/*.json` files — JSON contains all translations

### CSS design system
Single file: `css/style.css`. Uses CSS custom properties only — no preprocessor.
- Dark mode is default; light mode via `[data-theme="light"]` on `<html>`
- Primary color: `#E8003D` (Korean red); secondary: `#003478` (blue); accent: `#FFD700` (gold)
- Layout: 64px header, 270px left sidebar, 1200px max content width

### Supabase backend
**The site itself no longer reads Supabase at runtime.** The news section — the
only feature that did — was deleted 2026-07-21 (see below). What remains:

- Storage bucket `site-images` — serves the culture/travel/homepage photography
  via plain `<img src="https://…supabase.co/storage/v1/object/public/site-images/…">`
  URLs baked into the HTML. This is the only live dependency and it needs no JS client.
- Tables `articles`, `topics`, `daily_summaries` and the `news-images` bucket still
  hold the 95 previously generated articles. **Nothing on the site reads them.**
  They were deliberately left intact — deleting the data was not authorized.
- `supabase/migrations/001–003` are kept as the schema of record for that retained
  data. `004_article_sources.sql` was deleted: never applied, and its only consumer
  (`generate-news.js`) is gone.
- `js/config.js` (public anon key) is now referenced by **no page** — orphaned but
  left in place. The `admin/` uploader pages hardcode their own credentials.
- Scripts that still talk to the `articles` table — `revise-articles.js`,
  `translate-japanese.js`, `dump-articles-to-translate.cjs` — were left in place so
  the retained data stays reachable. They can no longer publish anything to the site.
- Service-key operations read `.env`.

### Progress system (KSProgress)
- Single localStorage key `ks-progress-v2` (module `KSProgress` in `js/app.js`): per-lesson completed-step indices, lesson completion, daily study streak (calendar days), learned counters (steps/words/letters/quizzes), resume position. Auto-migrates and deletes legacy keys (`ks-progress`, `ks-lessons-done`, `ks-*-xp`, `ks-*-stagemap`) on first load.
- `step-runner.js` reports step completion via `KSProgress.markStepDone(lessonId, index, type)`; sidebar grid (`LessonProgressGrid`) re-renders on the `ks-progress-change` DOM event.
- Grid lesson list/step totals come from `learn/data/manifest.json` (generated — never hand-edit). `#xp-badge` element id kept for the mobile-mirror MutationObserver but now shows streak + steps today.
- `learn/data/vocabulary.json` is orphaned — `vocabulary.html` only ever loads `vocabulary-<cat>.json`; the grid's "Vocabulary" block aggregates all 21 `vocab-*` topics.

### Syllable builder math
Hangul Unicode formula: `0xAC00 + (cho_index * 21 + jung_index) * 28 + jong_index`

## Multi-language page generation conventions

When adding a new learn step or lesson:
1. Add content to the English JSON in `learn/data/`
2. Add all `_<lang>` translation fields for at least `ja`, `zh-tw`, `es` (others are Phase 2)
3. Run `node scripts/gen-learn-mirrors.cjs` to regenerate all language HTML shells if a new lesson page is needed

When adding a new culture/travel page:
1. Create the English source page first
2. Use the appropriate language-specific gen script or translation guide in `translation/GUIDE.md`
3. Do **not** run `gen-content-mirrors.cjs` — it wipes existing translations

## AdSense status
- Publisher ID: `ca-pub-6791974364232767`; Analytics: `G-D94KSYG9DE`
- Ad zones (`class="ad-zone"`) injected site-wide 2026-07-07 (collapsed until approval); rail is post-approval
- Density pass 2026-07-09: culture pages get interval mids (one per 3 sub-headings; `inject-ad-zones.cjs` is now per-zone idempotent — rerunning upgrades in place). The news index/article ad zones from that pass are gone with the section. Dynamic renderers must call `window.KSAds.push()` after inserting slots. Pre-render zones collapse via `height:0` — NOT `display:none`, which broke the visibility-guarded push in `js/ads.js`
- Low-value dev files (`lesson-header-mobile-options.html`, `culture_travel_news_extract.txt`, `learn_extract.txt`) deleted 2026-07-07; working `.md` files moved to `docs/`

## News section — removed 2026-07-21
The `news/` section was **deleted outright** (all 9 locales, 34 files) before the
AdSense resubmission. It published ~11 unreviewed AI-written articles per day
across 9 locales into near-empty client-rendered shells: Google's "scaled content
abuse" pattern, never indexed, not the site's core value, and still advertising a
cadence ("11 new articles every morning at 8AM KST") that the paused cron no longer
met. Deleted with it: `scripts/generate-news.js`, `scripts/harden-news-section.cjs`,
`.github/workflows/generate-news.yml` (this emptied `.github/` entirely — there are
now **no GitHub Actions workflows**), and `supabase/migrations/004_article_sources.sql`.

`scripts/remove-news-section.cjs` performed and documents the reference removal.
**Do not reintroduce a news nav item.** The generator scripts (`gen-*-site.cjs`,
`gen-content-mirrors.cjs`, `gen-learn-mirrors.cjs`, `inject-seo.mjs`, …) had their
nav templates patched too, so running one cannot bring the link back.

Deliberately **kept** — the "News & Society" *vocabulary topic* is real learning
content and is unrelated to the deleted section: `learn/data/vocabulary-news.json`,
`vocabulary.html?cat=news` / `#news`, the `news` entries in the `WOD_FILES` /
vocab-category maps in `js/app.js`, and `.tag-news` in `css/style.css` (still used
for the `home` badge in `SearchPage`).

## Deployment
Hosted on Vercel. Config in `vercel.json`: `cleanUrls: true`, no trailing slashes.
There is no CI: `.github/` was removed with the news workflow, so every generation
and SEO script is run manually from a workstation.

⚠️ `.vercelignore` does **not** list `supabase`, so `supabase/migrations/*.sql`
currently deploy as publicly fetchable files. Add `supabase` to `.vercelignore`.
