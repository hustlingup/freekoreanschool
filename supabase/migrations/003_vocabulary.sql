-- ═══════════════════════════════════════════════════════════
-- Korean School News — Migration 003: Add vocabulary column
-- Run this in Supabase SQL Editor after 002_add_japanese.sql
-- ═══════════════════════════════════════════════════════════

-- ── Vocabulary for articles ───────────────────────────────
-- Each entry: { word, reading, part_of_speech, definition_en, example_ko, example_en }
ALTER TABLE articles
  ADD COLUMN IF NOT EXISTS vocabulary JSONB DEFAULT '[]'::jsonb;
