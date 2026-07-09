# Prompt G — Site wiring: sidebars, search, 8-language mirrors, sitemap, ads

Prerequisites: prompts A–F2 all completed and verified. This is the integration pass — many files, mostly mechanical. Work through the sections IN ORDER.

⚠️ Reminder: **never run** `gen-content-mirrors.cjs`, `gen-root-mirrors.cjs`, or `gen-id-site.cjs`. The only generators used here: `gen-learn-mirrors.cjs`, `gen-learn-id.cjs` (inspect before running — see §5), `gen-lesson-manifest.cjs`, `gen-search-words.cjs`, `audit-ad-zones.cjs`, `audit-content-parity.cjs`.

---

## 1. English sidebars (~16 learn pages)

Every `learn/*.html` (all 16 English pages, including the two new ones) carries a duplicated hand-coded `<nav class="sidebar-nav">`. In the **Getting Started** section, change the link order to:

Introduction → Hangul Alphabet → **✍️ Letter Writing** (`letter-writing.html`) → Syllable Blocks → Pronunciation Guide → **⌨️ Korean Typing** (`typing.html`)

- Copy the exact `.sidebar-link` markup shape (icon span, badge conventions) from the neighboring links. Use a "NEW" badge only if other links use badges; otherwise plain.
- On `letter-writing.html` and `typing.html`, mark their own link `.active` (match how hangul.html marks its own).
- Files: `learn/hangul.html`, `letter-writing.html`, `typing.html`, `syllable-blocks.html`, `pronunciation.html`, `grammar.html`, `nouns.html`, `pronouns.html`, `shopping.html`, `emotions.html`, `speech-levels.html`, `dialogues.html`, `business-korean.html`, `classical-korean.html`, `writing-essays.html`, `vocabulary.html`, `flashcard.html`, `vocabulary-browser.html` (check each actually has the sidebar; app pages may share it too).
- Also update the lesson-nav footer prev/next chain (`.lesson-nav-footer`) so it flows: hangul → letter-writing → syllable-blocks → pronunciation → typing → vocabulary (edit the four affected pages' footers + the two new pages').

## 2. Search index

1. Hand-authored entries: in `js/app.js` `SEARCH_INDEX` (~line 650), add two page entries following the exact object shape of the hangul entry (title/url/category/icon/tags/desc): "Korean Letter Writing" → `learn/letter-writing.html` (tags: stroke order, writing, 획순, hangul, trace) and "Korean Typing" → `learn/typing.html` (tags: keyboard, typing, dubeolsik, 두벌식, 타자).
2. Generated word index: in `scripts/gen-search-words.cjs`, add a case to the step-type switch (line ~52):
   ```js
   case 'stroke_demo':
     t = step.char;
     w = step.example_word;
     m = meanings(step, 'example_meaning');
     break;
   ```
   (Do NOT index `stroke_trace`, `key_intro`, or `typing_drill` — no unique searchable content.) Then:
   ```bash
   node scripts/gen-lesson-manifest.cjs && node scripts/gen-search-words.cjs
   ```
   Deep links for duplicate chars (ㄱ exists in hangul.json too) are deduped by the `seen` set — first lesson wins; that's acceptable.

## 3. Mirror pages — de / es / fr / vi / th (generated)

`scripts/gen-learn-mirrors.cjs` SALVAGE strategy needs a per-language seed file to exist first.

1. For each lang in `de, es, fr, vi, th` create `learn/<lang>/letter-writing.html` and `learn/<lang>/typing.html`:
   - Copy the finished ENGLISH page, then fix relative paths (`../` → `../../`, script srcs get one more `../`, data URLs stay root-absolute `/learn/data/...`), set `<html lang="<lang>">`, add `<script src="../../js/langs/lang-<lang>.js"></script>` right after `lang-core.js` (copy placement from `learn/<lang>/hangul.html`).
   - Translate the head (title/description/OG) and the main-content prose (lesson header, intro bullets, free-play section heading) into the language. The step content itself comes from the shared JSON — already translated in F1/F2.
   - Canonical → `/learn/<lang>/<slug>` and hreflang cluster listing ALL 8 languages + en + x-default. **Copy the exact URL style from `learn/<lang>/hangul.html`** — note vi hreflang URLs keep the `.html` suffix (confirmed quirk: `learn/hangul.html:23`).
2. Add `'letter-writing', 'typing'` to `SALVAGE_PAGES` in `scripts/gen-learn-mirrors.cjs` (line ~37).
3. Run `node scripts/gen-learn-mirrors.cjs` — it rebuilds the chrome (header/sidebar/footer) of every salvage page from the English chrome + dictionary, which also propagates the §1 sidebar changes to all 5 languages. Verify it reports 15 pages per language.

## 4. Mirror pages — ja / zh-tw (manual)

Not covered by the generator. For each of `ja`, `zh-tw`:
- Create `learn/<lang>/letter-writing.html` and `learn/<lang>/typing.html` by copying `learn/<lang>/hangul.html` (correct chrome, lang pack, paths already in place) and replacing head meta + lesson header/main with translated content, `#step-shell`, the free-play widget div, and the new scripts block (hangul-util/stroke-data/stroke-writer for letter-writing; hangul-util/hangul-ime/typing-game for typing) with `../../js/` paths.
- Update the sidebar Getting Started section in ALL existing `learn/ja/*.html` and `learn/zh-tw/*.html` pages to include the two new links (translated labels: ja 文字の書き方 / タイピング, zh-tw 書寫筆順 / 打字練習) in the §1 order. This is a mechanical multi-file edit — do it with a small node script if you prefer, but verify one file by eye first.

## 5. Mirror pages — id

Inspect `scripts/gen-learn-id.cjs` first: it generates `learn/id/` pages from English chrome with per-page definitions. If it has a page list/config that cleanly supports adding `letter-writing` and `typing`, extend it and run it **checking that it only writes the two new files or regenerates existing id pages faithfully** (diff a regenerated page against git before accepting). If extending looks risky, create the two `learn/id/` pages manually exactly like §4 (copy `learn/id/hangul.html` chrome, translate to Indonesian). Update sidebars across `learn/id/*.html` like §4 (id labels: Menulis Huruf / Mengetik Korea).

## 6. sitemap.xml + SEO

- Add `<url>` entries following the existing per-page pattern (loc + lastmod): English `/learn/letter-writing` and `/learn/typing` + all 8 language versions (`/learn/<lang>/letter-writing` etc., vi keeping `.html` if that's what existing vi sitemap entries do — check and match).
- If existing sitemap entries carry `xhtml:link` hreflang alternates, replicate the full cluster for the new pages; otherwise plain entries.
- Do not run `inject-seo.mjs` unless you confirm (by reading it) that it is idempotent for these pages and won't clobber the hand-written heads.

## 7. Ad zones

The new pages inherited ad zones from `syllable-blocks.html` in prompts B/D. Now verify:
```bash
node scripts/audit-ad-zones.cjs
```
Expected: the two EN pages + 16 mirror pages report the standard learn-page zone set, zero missing-push warnings. If the audit flags the mirrors, copy the zone markup from the corresponding `hangul` mirror. Reminder: zones collapse via `height:0`, never `display:none`; dynamic slot inserts call `window.KSAds.push()`.

## 8. Final regen + parity

```bash
node scripts/gen-lesson-manifest.cjs
node scripts/gen-search-words.cjs
node scripts/audit-content-parity.cjs
```
Manifest must list `letter-writing` (74/73) and `typing` (28/27). Parity audit: the two new pages should appear for all 8 languages with no missing-file errors.

## Verification (browser, `node dev.js`)

1. EN: sidebar shows both links on 5 random learn pages; clicking through works; footer prev/next chain correct.
2. Mirrors: open `learn/ja/letter-writing.html`, `learn/de/typing.html`, `learn/th/letter-writing.html` — chrome in the right language, lesson JSON loads, step content shows the F1/F2 translations, free-play widgets work, lang switcher (hreflang nav) round-trips EN ↔ lang.
3. Search: type "stroke" and "typing" in the header search → the two page entries appear; type "ㄱ" → a letter-writing or hangul deep link appears; type a word from typing.json → resolves.
4. Progress grid on a mirror page shows 16 lessons including the two new tiles.
5. `git status`: only intended files changed; no generator wrote unexpected files (spot-check `git diff --stat` for surprises like regenerated unrelated mirrors — if `gen-learn-mirrors.cjs` rewrote all salvage pages, that's expected; eyeball one diff to confirm chrome-only changes).
