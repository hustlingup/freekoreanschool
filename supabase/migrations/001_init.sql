-- ═══════════════════════════════════════════════════════════
-- Korean School News — Supabase Database Migration 001
-- Run this in Supabase SQL Editor (supabase.com → SQL Editor)
-- ═══════════════════════════════════════════════════════════

-- ── Topics ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS topics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_en TEXT NOT NULL,
  name_ko TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  icon TEXT DEFAULT '📰',
  color TEXT DEFAULT 'tag-news',
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── Articles ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_id UUID REFERENCES topics(id) ON DELETE SET NULL,
  title_en TEXT NOT NULL,
  title_ko TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  summary_en TEXT,
  summary_ko TEXT,
  content_en TEXT NOT NULL DEFAULT '',
  content_ko TEXT NOT NULL DEFAULT '',
  thumbnail_url TEXT,
  thumbnail_alt TEXT,
  thumbnail_source TEXT,
  main_image_url TEXT,
  main_image_alt TEXT,
  main_image_source TEXT,
  images JSONB DEFAULT '[]'::jsonb,
  seo_title TEXT,
  seo_description TEXT,
  seo_keywords TEXT,
  level TEXT DEFAULT 'beginner' CHECK (level IN ('beginner','intermediate','advanced')),
  reading_time_en INT DEFAULT 3,
  reading_time_ko INT DEFAULT 4,
  view_count INT DEFAULT 0,
  status TEXT DEFAULT 'published' CHECK (status IN ('published','draft','archived')),
  ai_generated BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  published_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── Daily Summaries ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS daily_summaries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE UNIQUE NOT NULL,
  summary_en TEXT NOT NULL,
  summary_ko TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── Increment view count RPC ──────────────────────────────
CREATE OR REPLACE FUNCTION increment_view(article_id UUID)
RETURNS void AS $$
  UPDATE articles SET view_count = view_count + 1 WHERE id = article_id;
$$ LANGUAGE sql SECURITY DEFINER;

-- ── Row Level Security ────────────────────────────────────
ALTER TABLE topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_summaries ENABLE ROW LEVEL SECURITY;

-- Public: read published articles only
CREATE POLICY "topics_public_read" ON topics FOR SELECT USING (active = TRUE);
CREATE POLICY "articles_public_read" ON articles FOR SELECT USING (status = 'published');
CREATE POLICY "summaries_public_read" ON daily_summaries FOR SELECT TO anon USING (TRUE);

-- Authenticated admin: full access
CREATE POLICY "topics_admin_all" ON topics FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "articles_admin_all" ON articles FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "summaries_admin_all" ON daily_summaries FOR ALL USING (auth.role() = 'authenticated');

-- ── Seed Topics ───────────────────────────────────────────
INSERT INTO topics (name_en, name_ko, slug, icon, color) VALUES
  ('K-Pop & Music',  'K-팝/음악',  'kpop',      '🎵', 'tag-kpop'),
  ('Technology',     '기술',       'tech',       '💻', 'tag-tech'),
  ('Food & Cuisine', '음식',       'food',       '🍜', 'tag-food'),
  ('Sports',         '스포츠',     'sports',     '⚽', 'tag-sports'),
  ('K-Culture',      '한국 문화',  'culture',    '🎬', 'tag-culture'),
  ('Society & Life', '사회/생활',  'society',    '🏙️', 'tag-society'),
  ('Education',      '교육',       'education',  '📚', 'tag-news'),
  ('Fashion',        '패션',       'fashion',    '👗', 'tag-fashion'),
  ('Travel',         '여행',       'travel',     '✈️', 'tag-travel'),
  ('Economy',        '경제',       'economy',    '📈', 'tag-economy'),
  ('Politics',       '정치',       'politics',   '🏛️', 'tag-politics')
ON CONFLICT (slug) DO NOTHING;

-- ── Storage: run separately in Storage settings ───────────
-- 1. Create bucket "news-images" (set to PUBLIC)
-- 2. Add RLS policy: authenticated users can upload/delete

-- ── After running this script ─────────────────────────────
-- 1. Go to Authentication → Users → Add user (email + password for admin)
-- 2. Go to Settings → API → copy Project URL and anon key → paste into js/app.js
-- 3. Copy service_role key → add to GitHub repository secrets
