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

# Daily news generation (also runs via GitHub Actions at 08:00 KST)
node scripts/generate-news.js

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
# learn/culture/travel/news/root page in any language.
node scripts/gen-sitemap.cjs
```

**Do not run** `gen-content-mirrors.cjs`, `gen-root-mirrors.cjs`, or any language-specific `gen-*-site.cjs` scripts during Phase 2 translation work — they overwrite translated prose with English source.

Secrets needed for Supabase/news scripts go in `.env` (gitignored): `SUPABASE_URL`, `SUPABASE_SERVICE_KEY`. `ANTHROPIC_API_KEY` is also needed for `generate-news.js`.

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

**Step types**: `reading_card`, `listen_repeat`, `conjugation_practice`, `choose_syllables`, `copy_phrase`, `write_answer`, `syllable_builder`, `group_by_type`, `drag_reorder`

Localized fields in JSON use `_<lang>` suffixes (e.g. `title_ja`, `body_zh_tw`, `meaning_es`). The helper `loc(obj, base)` inside step-runner picks the right variant based on the current language. Pronunciation aids use dedicated fields: `katakana` (JA), `zhuyin` (ZH-TW), `reading_vi`/`reading_th` (others).

### Localization architecture
- **8 language versions**: `ja`, `zh-tw`, `es`, `de`, `fr`, `vi`, `th`, `id`
- **Full translation** (prose + chrome): `es`, `ja`, `zh-tw`
- **Chrome-only** (nav/sidebar translated, article prose still English — Phase 2 in progress): `de`, `fr`, `vi`, `th`, `id`
- Each language's pages live under `/<lang>/` for root pages and `learn/<lang>/`, `culture/<lang>/`, etc. for content
- All language versions load the **same** `learn/data/*.json` files — JSON contains all translations

### CSS design system
Single file: `css/style.css`. Uses CSS custom properties only — no preprocessor.
- Dark mode is default; light mode via `[data-theme="light"]` on `<html>`
- Primary color: `#E8003D` (Korean red); secondary: `#003478` (blue); accent: `#FFD700` (gold)
- Layout: 64px header, 270px left sidebar, 1200px max content width

### Supabase backend
- Tables: `articles`, `topics`, `daily_summaries`
- Storage: `news-images` bucket
- Frontend credentials (public anon key) live in `js/config.js`
- Admin operations use service key from `.env`
- RPC `increment_view()` handles article view counts

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
- Density pass 2026-07-09: culture pages get interval mids (one per 3 sub-headings; `inject-ad-zones.cjs` is now per-zone idempotent — rerunning upgrades in place), news index gets a top zone + JS in-feed ads every 4 cards, news article shells (all 9 langs) get 3 static zones + a JS in-article ad between body halves. Dynamic renderers must call `window.KSAds.push()` after inserting slots. Pre-render zones collapse via `height:0` — NOT `display:none`, which broke the visibility-guarded push in `js/ads.js`
- Low-value dev files (`lesson-header-mobile-options.html`, `culture_travel_news_extract.txt`, `learn_extract.txt`) deleted 2026-07-07; working `.md` files moved to `docs/`

## Deployment
Hosted on Vercel. Config in `vercel.json`: `cleanUrls: true`, no trailing slashes. The GitHub Actions workflow `.github/workflows/generate-news.yml` runs daily news generation (23:00 UTC / 08:00 KST) using `ANTHROPIC_API_KEY`, `SUPABASE_URL`, `SUPABASE_SERVICE_KEY` secrets.
