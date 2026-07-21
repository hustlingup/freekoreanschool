-- 004_article_sources.sql
-- Capture the original news report each AI-assisted summary is based on.
--
-- Every published article must be able to link out to the report it
-- summarizes. scripts/generate-news.js now records the Google News RSS item
-- it selected (source_index in the model's JSON output) and writes these
-- three columns on insert and on rewrite.
--
-- Run this BEFORE the next generate-news.js run, otherwise the inserts will
-- fail on unknown columns.

ALTER TABLE articles ADD COLUMN IF NOT EXISTS source_url   TEXT;
ALTER TABLE articles ADD COLUMN IF NOT EXISTS source_name  TEXT;
ALTER TABLE articles ADD COLUMN IF NOT EXISTS source_title TEXT;

COMMENT ON COLUMN articles.source_url   IS 'URL of the original news report this article summarizes (Google News RSS link, resolves to the publisher).';
COMMENT ON COLUMN articles.source_name  IS 'Publisher name of the original report, e.g. "Yonhap News Agency".';
COMMENT ON COLUMN articles.source_title IS 'Headline of the original report, shown as the link text.';
