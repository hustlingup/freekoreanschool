# Manual Backfill Articles — Guide + Opus 4.8 Prompt

**Purpose:** fill the article gap with hand-generated multilingual articles, delivered as SQL you paste into the Supabase SQL editor.

**The gap:** last full daily run was 2026-06-09. On 2026-07-02 a run started but died after 2 articles (education, economy) when API credits ran out. So backfill = **2026-06-10 → 2026-07-08, skipping 07-02 = 28 articles**, one per day.

**How to use:**
1. Run **Step 1 SQL** in Supabase SQL editor once (adds language columns).
2. In Claude Code, switch model to **Opus 4.8** (`/model opus`).
3. Paste the **Master Prompt** (Step 3) as one message. Opus will research real news per date via web search and write `docs/manual-articles-2026-07.sql.md` one article at a time.
4. Open that file, copy the entire SQL block, paste into Supabase SQL editor, run.
5. Run **Step 4 verification SQL**.

---

## Step 1 — Add language columns (run once, before anything else)

The `articles` table only has `_en`, `_ko`, `_ja` columns. The site now has 8 language versions (`ja`, `zh-tw`, `es`, `de`, `fr`, `vi`, `th`, `id`), so add the missing 7:

```sql
ALTER TABLE articles
  ADD COLUMN IF NOT EXISTS title_zh_tw text,   ADD COLUMN IF NOT EXISTS summary_zh_tw text,   ADD COLUMN IF NOT EXISTS content_zh_tw text,
  ADD COLUMN IF NOT EXISTS title_es text,      ADD COLUMN IF NOT EXISTS summary_es text,      ADD COLUMN IF NOT EXISTS content_es text,
  ADD COLUMN IF NOT EXISTS title_de text,      ADD COLUMN IF NOT EXISTS summary_de text,      ADD COLUMN IF NOT EXISTS content_de text,
  ADD COLUMN IF NOT EXISTS title_fr text,      ADD COLUMN IF NOT EXISTS summary_fr text,      ADD COLUMN IF NOT EXISTS content_fr text,
  ADD COLUMN IF NOT EXISTS title_vi text,      ADD COLUMN IF NOT EXISTS summary_vi text,      ADD COLUMN IF NOT EXISTS content_vi text,
  ADD COLUMN IF NOT EXISTS title_th text,      ADD COLUMN IF NOT EXISTS summary_th text,      ADD COLUMN IF NOT EXISTS content_th text,
  ADD COLUMN IF NOT EXISTS title_id text,      ADD COLUMN IF NOT EXISTS summary_id text,      ADD COLUMN IF NOT EXISTS content_id text;
```

Note: `js/app.js:3649` already reads `title_zh_tw`, so this also fixes a latent frontend reference. Rendering `content_es` etc. on news pages is separate frontend work — columns first, display later.

---

## Step 2 — Schedule (fixed, do not change)

28 days, 11 topics rotated in a fixed cycle starting with society (oldest coverage, 06-08). Result: 6 topics get 3 articles, 5 topics get 2 — plus education/economy already have real 07-02 articles, so overall distribution is even. Levels cycle beginner → intermediate → advanced.

| # | Article date | Topic slug | Level |
|---|---|---|---|
| 1 | 2026-06-10 | society | beginner |
| 2 | 2026-06-11 | kpop | intermediate |
| 3 | 2026-06-12 | travel | advanced |
| 4 | 2026-06-13 | tech | beginner |
| 5 | 2026-06-14 | food | intermediate |
| 6 | 2026-06-15 | sports | advanced |
| 7 | 2026-06-16 | culture | beginner |
| 8 | 2026-06-17 | fashion | intermediate |
| 9 | 2026-06-18 | politics | advanced |
| 10 | 2026-06-19 | education | beginner |
| 11 | 2026-06-20 | economy | intermediate |
| 12 | 2026-06-21 | society | advanced |
| 13 | 2026-06-22 | kpop | beginner |
| 14 | 2026-06-23 | travel | intermediate |
| 15 | 2026-06-24 | tech | advanced |
| 16 | 2026-06-25 | food | beginner |
| 17 | 2026-06-26 | sports | intermediate |
| 18 | 2026-06-27 | culture | advanced |
| 19 | 2026-06-28 | fashion | beginner |
| 20 | 2026-06-29 | politics | intermediate |
| 21 | 2026-06-30 | education | advanced |
| 22 | 2026-07-01 | economy | beginner |
| — | 2026-07-02 | *(skip — education + economy already exist)* | — |
| 23 | 2026-07-03 | society | intermediate |
| 24 | 2026-07-04 | kpop | advanced |
| 25 | 2026-07-05 | travel | beginner |
| 26 | 2026-07-06 | tech | intermediate |
| 27 | 2026-07-07 | food | advanced |
| 28 | 2026-07-08 | sports | beginner |

`published_at` = article date at 08:00 KST → stored as previous day `T23:00:00Z` UTC.

---

## Step 3 — Master Prompt (paste to Opus 4.8 in Claude Code)

Copy everything inside the block below as a single message:

````text
You are backfilling news articles for a Korean language-learning site (Supabase-backed). Work through the schedule below ONE article at a time, appending each finished INSERT to the output file before starting the next. Do not write article prose in chat — only into the file. This is a long job (28 articles) — keep going until the whole schedule is done; if the session is interrupted, I will re-paste this prompt and you resume from the last article present in the output file.

OUTPUT FILE: docs/manual-articles-2026-07.sql.md
Structure: a short header comment, then FOUR ```sql fenced blocks (Batch 1: articles 1–7, Batch 2: 8–14, Batch 3: 15–21, Batch 4: 22–28 + all daily_summaries), so I can paste each batch into the Supabase SQL editor separately without hitting size limits.

SCHEDULE (28 articles — date / topic slug / level):
1. 2026-06-10 society beginner
2. 2026-06-11 kpop intermediate
3. 2026-06-12 travel advanced
4. 2026-06-13 tech beginner
5. 2026-06-14 food intermediate
6. 2026-06-15 sports advanced
7. 2026-06-16 culture beginner
8. 2026-06-17 fashion intermediate
9. 2026-06-18 politics advanced
10. 2026-06-19 education beginner
11. 2026-06-20 economy intermediate
12. 2026-06-21 society advanced
13. 2026-06-22 kpop beginner
14. 2026-06-23 travel intermediate
15. 2026-06-24 tech advanced
16. 2026-06-25 food beginner
17. 2026-06-26 sports intermediate
18. 2026-06-27 culture advanced
19. 2026-06-28 fashion beginner
20. 2026-06-29 politics intermediate
21. 2026-06-30 education advanced
22. 2026-07-01 economy beginner
(2026-07-02 skipped — articles already exist)
23. 2026-07-03 society intermediate
24. 2026-07-04 kpop advanced
25. 2026-07-05 travel beginner
26. 2026-07-06 tech intermediate
27. 2026-07-07 food advanced
28. 2026-07-08 sports beginner

RESEARCH (per article, before writing):
- Use web search to find REAL South Korea news for that topic dated on or within ~2 days before the article date (e.g. search "South Korea society news June 10 2026").
- Pick ONE specific story: a concrete event with a named person/company/place and a clear date. NOT a trend overview.
- If search yields nothing usable for that exact date, pick a verifiable real event from that week. Never invent events, people, or statistics.
- Topics repeat 2–3 times in the schedule: each repeat MUST cover a completely different story than the earlier articles for that topic. Keep a running list.

STORY RULES (strict — the old auto-generated articles failed all of these):
- The article covers that ONE story only. First paragraph is a news lede: who, what, when, where.
- BANNED openers: "Over the past decade", "In recent years", "Korea has long been", "[X] has moved from a niche", or any trend-essay opener.
- BANNED structure: "supporters argue X... however critics say Y" template. Only present a debate if the story IS a debate.
- Must NOT resemble any of these recently published articles (titles): "Caught Between Prestige and Diplomas: Korea's Unaccredited School Families", "South Korea's Chip Workers Ride an Unexpected Economic Wave", "Jeju Locals and Travelers React to Restored Seoul-Jeju Flights", "How Korea's Chip Industry Shapes Everyday Life", "For Korean Fans, the 2026 World Cup Is Personal", "K-Pop in Daily Life", "Understanding Hallyu", "K-BBQ Goes Global", "K-Fashion Goes Global", "South Korea's Education System: Global Lessons and Local Tensions", "South Korea's Chip-Driven Economy: A Global Comparison".
- Explain context a non-Korean learner needs, but keep the specific story in the foreground.
- 3–4 paragraphs per language, separated by \n\n inside the SQL string.

LANGUAGES (every article needs ALL of these):
- title_, summary_, content_ for: en, ko, ja, zh_tw, es, de, fr, vi, th, id  (30 fields per article)
- Each language version covers the same story but written naturally in that language — NOT word-for-word translation of the English.
- ko = actual Hangul. ja = Kanji/Hiragana/Katakana. zh_tw = Traditional Chinese (Taiwan usage). th = Thai script. vi = Vietnamese with full diacritics.
- Titles: en under 100 chars, all others under 60 chars.

VOCABULARY (per article: exactly 5 entries, JSON array for the vocabulary jsonb column):
Each entry:
{
  "word": "<Hangul>",
  "reading": "<romanization>",
  "reading_ja": "<katakana of Korean pronunciation>",
  "part_of_speech": "noun|verb|adjective|phrase",
  "definition_en": "...", "definition_ja": "...", "definition_zh_tw": "...", "definition_es": "...",
  "definition_de": "...", "definition_fr": "...", "definition_vi": "...", "definition_th": "...", "definition_id": "...",
  "example_ko": "<short Korean sentence using the word, related to the article>",
  "example_en": "...", "example_ja": "...", "example_zh_tw": "...", "example_es": "...",
  "example_de": "...", "example_fr": "...", "example_vi": "...", "example_th": "...", "example_id": "..."
}
Pick words specific to THIS story — not generic topic words (avoid 한류, 김치, 반도체 unless the story is literally about them).

SQL FORMAT (one INSERT per article — follow exactly):
- Dollar-quote every text value with a per-article tag: $a1$...$a1$ for article 1, $a2$ for article 2, etc. (prevents any quote-escaping problems).
- Vocabulary: $a1$[ ...json array... ]$a1$::jsonb
- topic_id via subquery: (SELECT id FROM topics WHERE slug = 'society')
- slug: '<topic>-<date>' e.g. 'society-2026-07-03'
- published_at: '<date-1day>T23:00:00Z' (= 08:00 KST on the article date; e.g. article dated 2026-07-03 → '2026-07-02T23:00:00Z')
- Fixed values: status 'published', ai_generated true, view_count 0, reading_time_en 3, reading_time_ko 4, reading_time_ja 4, created_at/updated_at same as published_at
- seo_description under 155 chars; seo_keywords 5–7 comma-separated
- Column list per INSERT: topic_id, slug, title_en, title_ko, title_ja, title_zh_tw, title_es, title_de, title_fr, title_vi, title_th, title_id, summary_en, summary_ko, summary_ja, summary_zh_tw, summary_es, summary_de, summary_fr, summary_vi, summary_th, summary_id, content_en, content_ko, content_ja, content_zh_tw, content_es, content_de, content_fr, content_vi, content_th, content_id, seo_description, seo_keywords, level, reading_time_en, reading_time_ko, reading_time_ja, vocabulary, status, ai_generated, view_count, published_at, created_at, updated_at

DAILY SUMMARIES (in Batch 4, after the articles):
For each date 2026-06-10 … 2026-07-08 INCLUDING 2026-07-02 (29 rows), one row:
INSERT INTO daily_summaries (date, summary_en, summary_ko, summary_ja) VALUES ('2026-06-10', $s1$...$s1$, $s1$...$s1$, $s1$...$s1$) ON CONFLICT (date) DO UPDATE SET summary_en = EXCLUDED.summary_en, summary_ko = EXCLUDED.summary_ko, summary_ja = EXCLUDED.summary_ja;
2–3 sentences referencing that day's article, including ONE Korean word with English meaning in parentheses.
For 2026-07-02, reference the two existing articles: "Caught Between Prestige and Diplomas: Korea's Unaccredited School Families" (education) and "South Korea's Chip Workers Ride an Unexpected Economic Wave" (economy).

WORKFLOW:
1. Create the output file with the header and four empty sql blocks (or, if resuming, read the file and find the last completed article).
2. For each of the 28 articles: search → pick story → tell me in one line which story you picked → write the INSERT into the correct batch block.
3. Append the 29 daily_summaries INSERTs to Batch 4.
4. Final pass: verify every dollar-quote tag opens and closes, valid JSON in vocabulary, no missing fields, 28 article INSERTs + 29 summary INSERTs. Report a checklist.
````

---

## Step 4 — Verify after pasting into Supabase

```sql
-- expect 28 rows, one per date 06-10..07-08 (except 07-02), all_langs true, vocab_count 5
SELECT slug, level, published_at::date,
       (title_th IS NOT NULL AND title_id IS NOT NULL AND content_zh_tw IS NOT NULL) AS all_langs,
       jsonb_array_length(vocabulary) AS vocab_count
FROM articles
WHERE published_at >= '2026-06-09T20:00:00Z' AND slug NOT LIKE '%2026-07-02'
ORDER BY published_at;

-- expect 29 rows, 06-10..07-08
SELECT date, left(summary_en, 60) FROM daily_summaries WHERE date >= '2026-06-10' ORDER BY date;

-- topic balance check
SELECT t.slug, count(*) FROM articles a JOIN topics t ON t.id = a.topic_id
WHERE a.published_at >= '2026-06-09T20:00:00Z' GROUP BY t.slug ORDER BY count(*) DESC;
```

## Notes

- News pages currently render only `content_en` / `content_ko` / `content_ja` ([js/app.js:3932-3939](../js/app.js)). The new columns store the data; wiring `content_es`, `content_zh_tw`, etc. into `news/<lang>/article.html` is a separate frontend task.
- Top up Anthropic API credits before the next scheduled GitHub Action run — that's why generation stopped on 07-02.
- The improved `scripts/generate-news.js` (single-story focus, recent-article dedup, rotating queries) needs commit + push before the daily Action uses it.
