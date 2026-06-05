-- ═══════════════════════════════════════════════════════════
-- Korean School News — Migration 002: Add Japanese language
-- Run this in Supabase SQL Editor after 001_init.sql
-- ═══════════════════════════════════════════════════════════

-- ── Japanese columns for articles ────────────────────────
ALTER TABLE articles
  ADD COLUMN IF NOT EXISTS title_ja        TEXT,
  ADD COLUMN IF NOT EXISTS summary_ja      TEXT,
  ADD COLUMN IF NOT EXISTS content_ja      TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS reading_time_ja INT DEFAULT 4;

-- ── Japanese summary for daily_summaries ─────────────────
ALTER TABLE daily_summaries
  ADD COLUMN IF NOT EXISTS summary_ja TEXT;

-- ── Japanese topic names ──────────────────────────────────
ALTER TABLE topics ADD COLUMN IF NOT EXISTS name_ja TEXT;

UPDATE topics SET name_ja = 'K-ポップ／音楽'  WHERE slug = 'kpop';
UPDATE topics SET name_ja = 'テクノロジー'    WHERE slug = 'tech';
UPDATE topics SET name_ja = '料理・グルメ'    WHERE slug = 'food';
UPDATE topics SET name_ja = 'スポーツ'        WHERE slug = 'sports';
UPDATE topics SET name_ja = '韓国文化'        WHERE slug = 'culture';
UPDATE topics SET name_ja = '社会・生活'      WHERE slug = 'society';
UPDATE topics SET name_ja = '教育'            WHERE slug = 'education';
UPDATE topics SET name_ja = 'ファッション'    WHERE slug = 'fashion';
UPDATE topics SET name_ja = '旅行'            WHERE slug = 'travel';
UPDATE topics SET name_ja = '経済'            WHERE slug = 'economy';
UPDATE topics SET name_ja = '政治'            WHERE slug = 'politics';
