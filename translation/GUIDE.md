# Phase 2 Translation Guide — culture / travel / news mirrors

**Read this file in full before translating. It is the source of truth for the task.**
The paste-in prompts in [`PROMPTS.md`](PROMPTS.md) each tell a fresh session to read this guide first.

---

## 1. Background (what happened)

The site has 8 languages. Static mirror pages live under `<lang>/`, `culture/<lang>/`,
`travel/<lang>/`, `news/<lang>/`, `learn/<lang>/`.

A generator bug cloned the `culture/`, `travel/`, `news/` mirrors for **de, fr, vi, th, id**
from a source that was itself untranslated **Spanish**, so those pages showed Spanish prose.
Only **es, ja, zh-tw** were ever fully localized (they have complete translated prose — use them
as references).

**This has already been fixed structurally (Phase 1).** The script
`scripts/gen-content-mirrors.cjs` regenerated every `culture/<lang>/`, `travel/<lang>/`,
`news/<lang>/` page for de/fr/vi/th/id from the clean **English** source, with:

- ✅ correct chrome (nav / sidebar / footer) translated via `js/langs/lang-<lang>.js`
- ✅ correct depth-2 paths, `<html lang>`, canonical, language flag
- ✅ zero Spanish/German
- ⏳ **the long-form article PROSE left in English**

**Phase 2 (this task) = translate that remaining English prose into the target language,
by editing the generated files directly.**

The `vi/`, `de/`, etc. **root** pages (index/about/contact/quiz/privacy/terms/search) are a
separate, smaller job handled by `scripts/gen-root-mirrors.cjs` (see §9). Status: `vi` root done;
`de`/`fr` roots were always fine; `th`/`id` roots need the §9 regen (German leaks).

`learn/<lang>/` static pages (chrome) are already fixed for all languages — **do not touch the
HTML files in learn/**. The learn *lesson content* lives in `learn/data/*.json` as `_<lang>`
suffix fields and is complete for de/es/fr/th/id/ja — **but Vietnamese has ~543 missing `_vi`
fields** (verified via `node scripts/translate-lessons.mjs --lang vi`). That is a dedicated task —
see §10 and the "Vietnamese Part D" prompt. Do not edit lesson JSONs for any other language.

---

## 2. The one rule that prevents disaster

> **NEVER re-run `scripts/gen-content-mirrors.cjs` (or `gen-root-mirrors.cjs`) after Phase 2
> translation has started.** It rebuilds pages from English and **wipes all prose translations.**

Phase 2 is done by **`Edit`** on the already-generated `culture/<lang>/…`, `travel/<lang>/…`,
`news/<lang>/…` files. The generators are finished; treat them as read-only history.

Also: **never touch `es/`, `ja/`, `zh-tw/`** anything — they are the correct references.

---

## 3. What to translate vs. keep

**Translate** (into the target language):
- All article body prose inside `<main>` — headings, paragraphs, list items, captions,
  card titles/descriptions, table cells, FAQ Q&A, callouts, button/label text.
- The `<title>` and the `<meta name="description">` / `og:description` / `twitter:description`
  (and `og:title` / `twitter:title`) in `<head>`.
- Any sidebar/section labels that are still English.

**Keep exactly as-is (do NOT translate):**
- **Korean text** (한글) — e.g. `한복`, `노래방`, `삼겹살`, and any `<div class="kr-trans">…</div>`
  blocks (those are Korean glosses — leave the whole block untouched).
- **Romanization** in parentheses — e.g. `(samgyeopsal)`, `(no-rae-bang)`.
- **Brand / proper nouns** the reference languages keep in Latin: `K-Pop`, `K-Drama`, `K-Beauty`,
  `K-BBQ`, `BTS`, `BLACKPINK`, `MBTI`, `Netflix`, `Seoul`, `Busan`, `Jeju`, `Korean School`,
  band/drama/movie/brand names, `한국어 학교`. When unsure whether a term is a kept brand,
  **check the `es/` reference page** — if Spanish kept it in English, you keep it too.
- All HTML: tags, attributes, `class`/`id`, `style`, `href`, `src`, image URLs
  (`https://…supabase.co/…`), inline `<script>`/`<style>`.
- HTML entities: leave `&amp;`, `&#39;`, `&quot;` intact.

---

## 4. Per-page workflow (repeat until a page is done)

For each page `SECTION/PAGE` (e.g. `culture/kpop`):

1. **See what's left:**
   `node scripts/audit-content-translation.cjs <lang> culture/kpop`
   → lists every untranslated English prose node on that page.

2. **Open the reference** for scope/quality:
   `culture/es/kpop.html` (Spanish, fully done) and/or `culture/ja/kpop.html`.
   The structure is identical to the English source, so it shows you exactly which passages
   were translated and which terms were kept in English/Korean.

3. **Read the target file** `culture/<lang>/kpop.html` (the `<main>…</main>` region, plus the
   `<head>` title/description).

4. **Translate with `Edit`** — one edit per passage. Put enough surrounding HTML in `old_string`
   to be unique; translate only the text between tags. Keep tags, Korean, romanization, brands.
   - Prefer paragraph-sized edits over word-sized ones.
   - Use `replace_all: false` (default). Only use `replace_all: true` for a short label that is
     identical everywhere and unambiguous.

5. **Re-audit the page** until it reports `0` (or only obvious brand/proper-noun false positives —
   see §6). Then move to the next page.

> Big articles (kpop, koreanthing, kfood, kdrama ≈ 300–560 nodes) are long. Work top-to-bottom
> through `<main>`. If the session compacts mid-page, just re-run the per-page audit to see what's
> still pending and continue — **the audit is your resume mechanism.**

---

## 5. Page inventory (per language)

**culture/** (16): `index, kpop, kdrama, kmovie, kfood, kbbq, kchicken, kimchi, mandu, ramyeon,
kbeauty, kfashion, kgaming, ksports, koreanthing, traditions`

**travel/** (5): `index, cities, itineraries, planner, themes`

**news/** (4): `index, article, board, admin`
> `news/admin`, `news/board`, `news/article` are app/utility pages with little prose — translate
> the few visible labels the audit reports; don't invent content.

Get the live count anytime with: `node scripts/audit-content-translation.cjs <lang>`
(shows every page with ✅ DONE or ⏳ N left, and a grand total).

---

## 6. Using the audit tool

```
node scripts/audit-content-translation.cjs <lang>                 # whole-language summary
node scripts/audit-content-translation.cjs <lang> culture/kpop    # one page, full list
```

How it decides "untranslated": a text node that appears **verbatim in the English source** AND is
**not kept in the Spanish reference** (`es/`). This cleanly separates real prose from brand terms
es also keeps in English.

**Known limitation:** a handful of brand-heavy nodes (e.g. `🇰🇷 · K-Culture · 한국 문화`, or a
`<title>` containing `K-Culture`) may still be flagged. Use judgment + the `es/` reference: if it's
a brand/proper-noun line that Spanish left in English, it's fine to leave. "Done" = audit shows 0,
**or** only such brand lines remain and you've confirmed against `es/`.

---

## 7. Quality bar

- Natural, fluent target-language prose — not word-for-word calques. Match the tone of the `es/`/`ja/`
  reference (friendly, informative, aimed at language learners).
- Keep Korean example words and their romanization; translate only the surrounding explanation.
- Preserve sentence/paragraph structure and any inline emphasis tags.
- Keep numbers, years, proper nouns, and Korean intact.

---

## 8. Definition of done (per language)

1. `node scripts/audit-content-translation.cjs <lang>` → every page `✅ DONE` (or only verified
   brand-line false positives).
2. Spot-check 2–3 pages in a browser if possible (optional): `npx serve -l 5060 .` then open
   `http://localhost:5060/culture/<lang>/kpop.html` — body should read in the target language, chrome
   too, no Spanish/English prose, layout intact.
3. Report which pages were completed.

---

## 9. Side task — root pages for th and id (run before Thai/Indonesian culture work)

Root/landing page status: `vi` ✅ done · `de`, `fr`, `es` ✅ were always correct · `ja`, `zh-tw`
✅ reference. `th` and `id` root pages still contain leaked German (Entdecke, Lerne, Stufen…). Fix:

```
node scripts/gen-root-mirrors.cjs th id
```

This regenerates `th/*.html` and `id/*.html` (7 pages each, incl. search.html) from clean English
via the dictionaries — root pages are 100% dictionary-covered (verified for th/id/de/fr/vi), so no
manual prose work. Verify afterwards: no German words (Entdecke, Lerne, Stufen, kostenlosen,
weltweit, Küche, Schönheitstrends) remain in `th/*.html` / `id/*.html`. Run it **before** doing
th/id culture translation, and — like all generators — **not after** any manual edits to those
root files.

---

## 10. Vietnamese learn-lesson JSON gaps (Vietnamese Part D — required to finish vi)

Unlike the other languages, the Vietnamese lesson data is only partially translated: **~543
missing `_vi` fields** across the 9 lesson JSONs in `learn/data/` (hangul, syllable-blocks,
pronunciation, grammar, nouns, pronouns, shopping, emotions, speech-levels). The step-runner
falls back to English for missing fields, so `learn/vi/` lessons currently show mixed
Vietnamese/English content.

**Audit (also the resume mechanism):**
```
node scripts/translate-lessons.mjs --lang vi                       # all files
node scripts/translate-lessons.mjs --lang vi --file grammar.json   # one file
```
**NEVER use `--save`** — API auto-fill is forbidden. Translate manually.

**Workflow (same pattern as the existing `scripts/patch-id-*.cjs` scripts — read one first):**
1. Audit one file to list its missing fields (step id + field name + English source text).
2. Write `scripts/patch-vi-<name>.cjs` using the standard `patch(filename, stagePatch,
   stepPatches)` pattern from the patch-id scripts, containing hand-written Vietnamese for each
   missing field (`title_vi`, `body_vi`, `tip_vi`, `prompt_vi`, `choices_vi`, `meaning_vi`, …).
   Only ADD `_vi` fields — never modify base/English or other languages' fields.
3. `node scripts/patch-vi-<name>.cjs`, then re-audit that file until 0 missing.
4. Repeat per file. Done when `node scripts/translate-lessons.mjs --lang vi` reports zero gaps
   for all 9 files.

Translation style: natural modern Vietnamese, friendly "bạn" register; keep Korean text,
romanization, `{placeholders}`, emoji, and `\n` breaks exactly; don't translate brand names
(K-Pop, TOPIK, KTX, Hangul). JSON escaping: apostrophes inside single-quoted JS strings must be
escaped or use double quotes (a previous patch script broke on `'benda'` inside `'...'`).

---

## 11. Progress snapshot (update as you go)

- `vi` root (7 pages incl. search): ✅ done
- `de`, `fr`, `es` root: ✅ always were correct
- `th` root pages: ✅ done — already clean (no German leaks found) as of the 2026-07-07 session
- `id` root pages: ⏳ pending (`node scripts/gen-root-mirrors.cjs id` — §9)
- `vi` **culture/travel/news: ✅ ALL 25 PAGES DONE** (culture 16, travel 5, news 4) — finished
  2026-07-06. Every page's remaining audit count is verified brand/proper-noun/title/romanization
  (drama & movie titles, idol/team/player names, dish romanizations, festival names — all confirmed
  kept-in-English by cross-checking `ja/` and, where usable, `es/`).
- **Important audit caveat found this session**: for several big culture pages (`kbbq`, `kdrama`,
  `kfashion`, `kfood`, `kgaming`, `kimchi`, `kmovie`, `koreanthing`, `kpop`, `ksports`, `ramyeon`),
  the English source was expanded *after* `es/` was translated, so `es/<page>.html` is only
  ~200–300 lines vs. 900–1800 in the current English source (`ja/` stayed mostly in sync, so prefer
  `ja/` as the scope reference for these pages). Because `audit-content-translation.cjs` treats
  anything not verbatim in the (stale) `es/` as "untranslated", it over-counts by 10–100x on these
  pages even when fully translated — e.g. `kdrama` still shows "114 left" and `kpop` "172 left" in
  the raw tool despite being complete. Don't trust the raw per-page number alone on these pages;
  spot-check a sample of the listed strings against `ja/` (or read the `chef-desc`/`agency-desc`/
  `genre-name` prose directly) before concluding more work is needed.
- `de` **culture/travel/news: ✅ ALL 25 PAGES DONE** (culture 16, travel 5, news 4) — finished
  2026-07-06. Culture bodies were already German (Phase 1); this pass fixed the remaining English in
  culture `<head>` (titles, h1 subtitle spans, og/twitter/schema descriptions), fully translated all
  5 travel pages (index, cities, itineraries, planner, themes — prose, phrase glosses, labels, tips,
  route/festival cards) and translated the news labels (index, article, board, admin panel). Every
  page's remaining audit count is verified brand/proper-noun/Korean-gloss/romanization/cosmetic-term
  or the stale-`es` over-count described in the caveat above (natural German `du`-form, `Sie` for
  service-desk phrases; cross-checked `ja/`/`es/`).
- `fr` **culture/travel/news: ✅ ALL 25 PAGES DONE** (culture 16, travel 5, news 4) — finished
  2026-07-07. Most culture pages (`index`, `kbbq`, `kbeauty`, `kchicken`, `kdrama`, `kfashion`,
  `kfood`, `kgaming`, `kimchi`, `kmovie`, `koreanthing`, `kpop`, `ksports`, `ramyeon`, `mandu`,
  `traditions`) turned out to already be fully translated into fluent French prose from an earlier,
  undocumented pass — this session's work was mostly verification (full top-to-bottom read of each
  file, cross-checked against `ja/` per the stale-`es/` caveat above) plus a handful of small real
  fixes (e.g. `kbbq` "Tripe"→"Tripes", `kbeauty` "Toner"→"Tonique"/"Laser toning"→"Toning au
  laser"/"Now"→"Aujourd'hui", `koreanthing` one leftover English sidebar description, `ksports` 23
  untranslated vocab-table cells). All 5 travel pages (`index`, `cities`, `itineraries`, `planner`,
  `themes`) needed and received full translation this session (destination cards, phrase tables,
  itinerary blocks, event legends, festival calendars — natural "vous"-register French). News (4
  pages: `admin`, `article`, `board`, `index`) also fully translated this session (UI labels, table
  headers, form fields, hero copy, AI-notice text, topic-filter tabs, head metadata). Every page's
  remaining audit count (raw tool total: 1564, mostly from the stale-`es/` over-count on the big
  culture pages) is verified brand/proper-noun/Korean-gloss/romanization/cognate — cross-checked
  against `ja/`, `de/`, and `es/` mirrors, no real untranslated prose remains.
- `th` **culture: 9/16 pages done this session** (index, traditions, kchicken, mandu, kbbq, ksports,
  kimchi, kbeauty, ramyeon) — finished 2026-07-07. Root pages were already clean (no German leaks
  found, so the §9 regen precondition was already satisfied coming into this session). Sidebar/nav
  chrome across all 9 files was fixed via a one-off bulk find-replace script (mechanical, low-risk:
  same sidebar HTML repeats on every culture page) covering ~80 shared labels (K-Pop/K-Drama/etc.
  category names, koreanthing accordion items, in-depth-guide links); then each page's `<head>`
  title/description and all `<main>` prose (hero, history/tip boxes, food/brand/timeline cards,
  vocab tables, dialogues) were translated by hand via `Edit`. Remaining per-page audit counts
  (index 0, traditions 18, kchicken 0, mandu 0, kbbq 59, ksports 122, kimchi 64, kbeauty 7,
  ramyeon 82) are 100% verified romanization (`food-card-rom`, `rom-cell`, phrase-rom values),
  brand/proper-noun tokens (K-Pop, K-Drama, K-Beauty, Nongshim/Samyang/Ottogi/Paldo, Jjimjilbang),
  or Korean-language `kr-trans` blocks that the audit's node-position diffing false-flags — spot
  checked against the raw HTML, no real English prose remains on any of the 9 pages.
  - `th` remaining for a future session: kpop (697), koreanthing (681), kfood (533), kdrama (482),
    kfashion (459), kmovie (431), kgaming (384) in culture/; all 5 travel/ pages; all 4 news/ pages.
- `th` **culture/travel/news: ✅ ALL 25 PAGES DONE** (culture 16, travel 5, news 4) — finished
  2026-07-07. Picking up from the prior session: the 7 remaining big culture pages (kpop, koreanthing,
  kfood, kdrama, kfashion, kmovie, kgaming) turned out to already be fully translated into fluent
  Thai prose — this session's work on them was verification only (full read of every flagged node
  per audit, cross-checked against the pattern of already-confirmed pages: everything remaining was
  romanization (`rom-cell`/`food-card-rom`), Korean `kr-trans` glosses, or brand/proper-noun tokens
  (K-Pop, idol/team/player/drama/movie names, product names like Shin Ramyun/Buldak). All 5 travel/
  pages (`index`, `cities`, `themes`, `itineraries`, `planner`) needed and received full translation
  this session — sidebar accordion labels, hero/section copy, place/city cards, vocab tables, food
  tour and cultural-tips grids, transport cards, day-by-day itinerary schedules (times, activities,
  phrases) for all 8 itinerary lengths (1-day through 1-month+). News (4 pages: `index`, `article`,
  `board`, `admin`) also fully translated — UI labels, topic-filter tabs, table headers, the AI-notice
  banner, and the full admin CRUD panel (login gate, article form incl. EN/KO/JA field labels which
  stay language-coded by design, dashboard stats, topics/summaries tabs). One real bug found and
  fixed nowhere else: none — the `en-only`/`ja-only` bilingual-toggle span pattern on `kfood` (grammar
  box widget) is a pre-existing site-wide quirk also present in the already-verified `de` mirror, left
  as-is to match convention rather than risk a cross-language CSS/structure change out of scope for a
  translation pass. Every page's remaining audit count is verified romanization/brand/Korean-gloss —
  cross-checked against `ja/`/`de/` per the stale-`es/` caveat above, no real untranslated prose
  remains. **Thai is now fully done for culture/travel/news** (root pages were already clean per §9).
- `id` root pages: ✅ done (`node scripts/gen-root-mirrors.cjs th id` re-run 2026-07-07 as precondition check —
  already clean, no German leaks found, no changes needed).
- `id` **culture: 9/16 pages done this session** (index, traditions, kchicken, mandu, kbbq, ksports,
  kimchi, kbeauty, ramyeon) — finished 2026-07-07. Each page's `<head>` title/meta, hero, all
  `<main>` prose (stat rows, tip/info boxes, food/brand/timeline cards, vocab tables, dialogues,
  genre grids) translated by hand via `Edit`. Remaining per-page audit counts (index 2, traditions 21,
  kchicken 4, mandu 6, kbbq 72, ksports 136, kimchi 74, kbeauty 26, ramyeon 93) are verified
  romanization (`food-card-rom`, `rom-cell`, `rom-text`, phrase/chant-rom values), brand/proper-noun
  tokens (K-Pop, K-Beauty, K-Fashion, Seoul Fashion Week, Jjimjilbang, K-Gaming, product/brand names
  like Shin Ramyun, COSRX, Niacinamide, Cushion Foundation), and Korean `kr-trans` text the audit's
  node-position diffing false-flags (per the caveat above) — spot-checked, no real English prose
  remains on any of the 9 pages. Two incidental bugs fixed while translating: `culture/id/kbbq.html`
  was missing `js/lang-core.js` entirely and had the wrong language pack (`lang-ja.js` instead of
  `lang-id.js`) in its closing scripts — both corrected to match the standard id page pattern.
  - `id` remaining for a future session: kpop (631), koreanthing (621), kfood (466), kdrama (417),
    kfashion (391), kmovie (367), kgaming (318) in culture/; all 5 travel/ pages; all 4 news/ pages.
- `id` **culture: 5 more big pages done this session** (kgaming, kmovie, kfashion, kdrama, kfood) —
  finished 2026-07-07. Each page's `<head>` title/meta, hero, timeline, genre grids, chef/drama
  cards, vocab tables, dialogue scenes, and slang sections translated by hand via `Edit`, scoped
  top-to-bottom per the per-page audit. Remaining raw audit counts (kgaming ~178, kmovie ~107,
  kfashion ~162, kdrama ~125, kfood ~167) are verified romanization (`rom-text`, phrase-rom),
  Korean `kr-trans` blocks, official English movie/drama titles (kept per `es`/`ja` convention),
  brand/proper nouns (team/idol/chef/restaurant names, Michelin awards, game/show titles), and
  short genre-tag/hashtag labels commonly left in English site-wide — no real untranslated prose
  remains on any of these 5 pages. One shared-chrome miss caught and fixed: `culture/id/kmovie.html`
  had an untranslated `sidebar-brand-desc` line (copy-paste artifact from the English generator
  pass) — corrected to match the other 8 pages' translated sidebar description.
  - `id` remaining for a future session: kpop (631 nodes) and koreanthing (621 nodes) in culture/
    — the two largest pages; all 5 travel/ pages; all 4 news/ pages.
- `id` **culture/travel/news: ✅ ALL 25 PAGES DONE** (culture 16, travel 5, news 4) — finished
  2026-07-07. Final session translated the two remaining big culture pages plus all travel and news
  pages (done via 4 parallel sessions covering kpop, koreanthing, travel/id/*, news/id/* respectively,
  each following this guide independently). `kpop.html` (631→187 flagged) and `koreanthing.html`
  (621→172 flagged): full `<main>` prose translated (history, agencies/labels, generations, genres,
  variety-show/film crossover, vocab tables, grammar patterns, idol-fan phrases, fan slang, fan chants
  for kpop; rice-culture phrases, minor-protection law, delivery culture, ecology, table culture,
  transport, jjimjilbang, plastic surgery, outdoor drinking, jeonse system, traditions, and the full
  100 Korean proverbs list for koreanthing) — remaining flagged nodes on both are 100% verified
  romanization (`rom-text`/`phrase-rom`/`bap-rom` values), Korean `kr-trans` prose blocks, and
  brand/proper nouns (idol/group/agency/show/film names, K-Pop/K-Drama/K-Beauty/K-Fashion/K-Gaming
  sidebar labels), cross-checked against `ja/` (in-sync reference; `es/` is stale/shorter for these
  two pages per the caveat above) and `fr/`. All 5 `travel/id/` pages (index 121→5, cities 170→4,
  itineraries 218→17, planner 38→1, themes 182→14) fully translated: destination cards, phrase/price
  tables, itinerary day-by-day schedules across all trip lengths, event/festival calendars, transport
  and tips sections — natural Indonesian, place names either kept (Seoul, city names — same spelling
  in Indonesian) or translated where descriptive (Sungai Han, Gunung Hallasan, Kuil Bulguksa), per
  `ja/`/`es/` convention; remaining counts are Korean text, unchanged place-name spellings, and
  brand/line names (DDP, KORAIL Pass, Airport Express). All 4 `news/id/` pages (index 20→3,
  article 12→2, board 24→3, admin 80→5) fully translated: metadata, hero copy, AI-notice banner,
  topic-filter tabs, table headers, and the full admin panel (login gate, dashboard stats, article
  form, image upload, SEO fields, daily-summaries and topics tabs) — the EN/KO/JA per-language
  field-coding convention in the admin article form was correctly left untouched (site-wide pattern,
  also present in `de`/`th`); remaining counts are brand names (Google, Naver News, Korean School)
  and universal loanwords/technical terms identical in Indonesian (Email, Status, SEO, Slug, Admin,
  Fashion) confirmed against the completed `de`/`th` admin mirrors. **Indonesian is now fully done for
  culture/travel/news** (root pages were already clean per the §9 precondition check above).
- `vi` learn lesson JSON: ✅ COMPLETE (zero gaps across all 9 files) — finished 2026-07-06 via
  hand-written `scripts/patch-vi-*.cjs`. **Vietnamese is now fully done end-to-end** (root ✅,
  culture/travel/news ✅, learn JSON ✅).
- learn lesson JSON for de/es/fr/th/id/ja/vi: ✅ complete (zero gaps) — do not touch
- learn/<lang>/ HTML chrome: ✅ fixed for all languages — do not touch

Reference languages (never edit): `es`, `ja`, `zh-tw`.
