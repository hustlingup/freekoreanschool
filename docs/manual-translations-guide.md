# Task: Backfill 7 missing languages for 67 legacy news articles

You are working in the koreanschool repo. The Supabase `articles` table has 67 legacy articles that only have **English, Korean, and Japanese** content. Your job is to write SQL `UPDATE` statements that add the 7 missing languages — **zh_tw, es, de, fr, vi, th, id** — for every legacy article, into one output file I can paste into the Supabase SQL editor batch by batch.

Do NOT touch en / ko / ja columns. Do NOT rewrite or re-report the stories. This is a translation/localization task only.

---

## STEP 0 — Dump the source articles

Write this script to `scripts/dump-articles-to-translate.cjs` and run it (`.env` already has `SUPABASE_URL` + `SUPABASE_SERVICE_KEY`):

```js
require('dotenv').config();
const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');
const sb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

const LANGS = ['zh_tw', 'es', 'de', 'fr', 'vi', 'th', 'id'];

(async () => {
  const { data, error } = await sb
    .from('articles')
    .select('*')
    .order('published_at', { ascending: true });
  if (error) throw error;

  const rows = data
    .map((a) => {
      const missing = LANGS.filter(
        (l) => !a['content_' + l] || !a['title_' + l] || !a['summary_' + l]
      );
      return { a, missing };
    })
    .filter((r) => r.missing.length > 0)
    .map(({ a, missing }) => ({
      slug: a.slug,
      missing_langs: missing,
      title_en: a.title_en,
      summary_en: a.summary_en,
      content_en: a.content_en,
      title_ko: a.title_ko,
      content_ko: a.content_ko,
      title_ja: a.title_ja,
      content_ja: a.content_ja,
      vocabulary: a.vocabulary,
    }));

  fs.writeFileSync(
    'docs/articles-to-translate.json',
    JSON.stringify(rows, null, 2)
  );
  console.log('dumped', rows.length, 'articles needing translation');
})();
```

Expected count is ~67 (the 28 manual 2026-06/07 articles already have all 10 languages and will be filtered out automatically because nothing is missing). Report the actual count, then proceed. Work from `docs/articles-to-translate.json` — never guess content you did not read from it.

---

## OUTPUT FILE

`docs/manual-translations-2026-07.sql.md`

Structure:

1. A short header comment (what the file is, how to use it).
2. **Ten ```sql fenced blocks** — Batch 1 = articles 1–7, Batch 2 = 8–14, … Batch 9 = 57–63, Batch 10 = 64–67 (adjust the last batches if the dump count differs from 67; always 7 articles per batch, remainder in the final batch). Each batch must be independently pasteable into Supabase.

Article order = the order in `articles-to-translate.json` (published_at ascending).

---

## SQL FORMAT (per article)

One `UPDATE` per article, keyed by slug:

```sql
UPDATE articles SET
  title_zh_tw   = $u1$…$u1$,
  summary_zh_tw = $u1$…$u1$,
  content_zh_tw = $u1$…$u1$,
  title_es      = $u1$…$u1$,
  … (all 3 fields × each language listed in that article's missing_langs) …,
  vocabulary    = $u1$[ …full updated json array… ]$u1$::jsonb
WHERE slug = 'the-article-slug';
```

Rules:

- Dollar-quote tag per article: `$u1$` … `$u67$` (tag number = article's position in the dump file). Use the SAME tag for every value in that article's UPDATE. Never use raw single-quoted strings for content.
- Only SET the language fields listed in that article's `missing_langs` — never overwrite a field that already has content.
- Do NOT set `updated_at`, `published_at`, `created_at`, `status`, or any other column.
- Every UPDATE ends with `WHERE slug = '<slug>';` — never `WHERE id = …` and never an UPDATE without a WHERE.

---

## TRANSLATION RULES

- **Source of truth is `content_en`.** Use `content_ko` / `content_ja` only to resolve ambiguity (names, nuance).
- Write **naturally in each language** — a fluent rewrite, not word-for-word machine translation. Sentence structure should feel native.
- Correct scripts: zh_tw = Traditional Chinese (Taiwan usage, e.g. 影片 not 视频), vi = full diacritics, th = Thai script, id = standard Bahasa Indonesia.
- Keep ALL facts exactly: names, dates, numbers, places, quotes. Never add or drop information.
- Same paragraph count as the English content, paragraphs separated by `\n\n`.
- Titles: under 60 characters per language. Summaries: 1–2 sentences.
- **Tone fix:** many legacy articles contain heavy self-praise ("Korea is taking the world by storm", "beloved global sensation", etc.). In the 7 new languages, render these in a **neutral, journalistic tone** — state the fact, drop the cheerleading adjective. Do not change facts, only temperature. (Leave en/ko/ja as they are — you are not editing them.)
- Korean proper nouns: use each language's established convention (zh_tw uses established Chinese names for Korean entities, e.g. 三星 for Samsung; es/de/fr/vi/id use romanized names; th uses Thai transcription for well-known names, romanization otherwise).

---

## VOCABULARY COLUMN

Each article's `vocabulary` is a jsonb array of word entries. For every entry:

1. Keep every existing key/value **byte-for-byte unchanged** (word, reading, reading_ja, part_of_speech, definition_en/ja, example_ko/en/ja, etc.).
2. ADD the missing keys for the 7 languages: `definition_zh_tw`, `definition_es`, `definition_de`, `definition_fr`, `definition_vi`, `definition_th`, `definition_id`, and `example_zh_tw`, `example_es`, `example_de`, `example_fr`, `example_vi`, `example_th`, `example_id` (each `example_<lang>` = translation of the entry's `example_ko` / `example_en` sentence).
3. If an entry already has some of these keys filled, keep them; only add what is missing or empty.
4. Write the **entire updated array** back via `$uN$[ … ]$uN$::jsonb`. It must be valid JSON (double quotes, no trailing commas, no comments).

If an article's `vocabulary` is null or empty, skip the vocabulary assignment for that article entirely (do not invent vocab).

---

## WORKFLOW

1. Run the dump script (STEP 0). Report the article count.
2. Create the output file skeleton: header + 10 empty ```sql blocks with batch comments. **If the output file already exists, do not recreate it — find the last `$uN$` present and resume from article N+1.**
3. For each article, in order: read it from the dump JSON → write its full UPDATE into the correct batch → tell me in ONE line: `N/67 <slug> — done`. Do NOT print article prose or SQL in chat — file only.
4. After all articles: final verification pass —
   - number of UPDATE statements = dump count,
   - every `$uN$` tag count is even (balanced),
   - every vocabulary array parses as valid JSON (write a small Node script that extracts each `$uN$[…]$uN$::jsonb` block and `JSON.parse`s it),
   - no UPDATE missing its `WHERE slug`,
   - every article covers all langs in its `missing_langs`.
   Report the checklist results.

Keep going until the whole dump is done. If the session is interrupted, I will re-paste this prompt and you resume from the last article present in the output file.
