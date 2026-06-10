/**
 * Korean School — Bulk Article Revision Script
 *
 * Rewrites all existing published articles with improved, learner-friendly prompts:
 * - Balanced perspective (not just promotional Korea praise)
 * - Varied article angles (history, daily life, comparison, debate, etc.)
 * - Key vocabulary section (4-5 words per article with readings and examples)
 * - Genuine Japanese rewrites (not translations of the English)
 *
 * Also re-generates all daily summaries with the improved summary prompt.
 *
 * Required env vars:
 *   ANTHROPIC_API_KEY    — Anthropic API key
 *   SUPABASE_URL         — Supabase project URL
 *   SUPABASE_SERVICE_KEY — Supabase service role key (bypasses RLS)
 *
 * Optional env vars:
 *   DRY_RUN=true         — Generate but do not save to database
 *   LIMIT=10             — Only process the first N articles (for testing)
 *   SKIP_SUMMARIES=true  — Skip daily summary revision
 */

import { config as loadEnv } from 'dotenv';
loadEnv();

import Anthropic from '@anthropic-ai/sdk';
import { createClient } from '@supabase/supabase-js';

const ANTHROPIC_API_KEY    = process.env.ANTHROPIC_API_KEY;
const SUPABASE_URL         = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
const DRY_RUN              = process.env.DRY_RUN        === 'true';
const SKIP_SUMMARIES       = process.env.SKIP_SUMMARIES  === 'true';
const SUMMARIES_ONLY       = process.env.SUMMARIES_ONLY  === 'true';
const LIMIT                = process.env.LIMIT ? parseInt(process.env.LIMIT, 10) : Infinity;

if (!ANTHROPIC_API_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('Missing required env vars: ANTHROPIC_API_KEY, SUPABASE_URL, SUPABASE_SERVICE_KEY');
  process.exit(1);
}

const anthropic = new Anthropic({ apiKey: ANTHROPIC_API_KEY });
const supabase  = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

const MODEL      = 'claude-sonnet-4-6';
const MAX_TOKENS = 4000;
const DELAY_MS   = 1500;

const ARTICLE_ANGLES = [
  'current events — report what is happening right now in a clear, neutral tone',
  'historical context — explain how this topic developed over time in Korea',
  'daily life impact — focus on how this affects ordinary Koreans day-to-day',
  'comparison — contrast the Korean situation with trends in other countries',
  'debate and diverse views — present at least two contrasting perspectives',
  'practical guide — give learners actionable cultural or language insight',
  'human interest — focus on a specific community or group affected by this topic',
];

// ── Fetch all published articles with topic info ──────────────────────────
async function fetchAllArticles() {
  const PAGE = 50;
  let all = [];
  let offset = 0;
  while (true) {
    const { data, error } = await supabase
      .from('articles')
      .select('id, title_en, title_ko, topics(name_en, name_ko, slug)')
      .eq('status', 'published')
      .order('published_at', { ascending: true })
      .range(offset, offset + PAGE - 1);
    if (error) throw new Error(`Failed to fetch articles: ${error.message}`);
    if (!data || data.length === 0) break;
    all = all.concat(data);
    if (data.length < PAGE) break;
    offset += PAGE;
  }
  return all;
}

// ── Fetch all daily summaries ─────────────────────────────────────────────
async function fetchAllSummaries() {
  const { data, error } = await supabase
    .from('daily_summaries')
    .select('id, date, summary_en, summary_ko, summary_ja')
    .order('date', { ascending: true });
  if (error) throw new Error(`Failed to fetch summaries: ${error.message}`);
  return data ?? [];
}

// ── Fetch articles for a given date (for summary context) ─────────────────
async function fetchArticlesForDate(date) {
  const start = `${date}T00:00:00Z`;
  const end   = `${date}T23:59:59Z`;
  const { data } = await supabase
    .from('articles')
    .select('title_en')
    .eq('status', 'published')
    .gte('published_at', start)
    .lte('published_at', end);
  return data ?? [];
}

// ── Robust JSON extraction (handles markdown fences) ─────────────────────
function parseJSON(raw, context) {
  // Strip markdown code fences (any position, any whitespace)
  const cleaned = raw.replace(/```(?:json)?/g, '').trim();
  // Attempt 1: parse as-is
  try { return JSON.parse(cleaned); } catch { /* continue */ }
  // Attempt 2: extract outermost {...}
  const match = cleaned.match(/\{[\s\S]*\}/);
  if (match) {
    try { return JSON.parse(match[0]); } catch { /* continue */ }
    // Attempt 3: collapse unescaped newlines inside string values
    const fixed = match[0].replace(/\n/g, ' ');
    try { return JSON.parse(fixed); } catch { /* continue */ }
  }
  throw new Error(`JSON parse failed for ${context}: ${raw.slice(0, 200)}`);
}

// ── Rewrite a single article ──────────────────────────────────────────────
async function rewriteArticle(article) {
  const topic = article.topics || {};
  const angle = ARTICLE_ANGLES[Math.floor(Math.random() * ARTICLE_ANGLES.length)];

  const prompt = `You are rewriting an existing article for a Korean language-learning website to make it more educational, balanced, and learner-friendly.

EXISTING ARTICLE:
Topic: ${topic.name_en || 'General'}
English title: "${article.title_en}"
Korean title: "${article.title_ko}"

Assigned angle: "${angle}"

REQUIREMENTS:
1. Keep the same general subject as the title but REWRITE the content completely
2. BALANCED: include both positives AND challenges, debates, or critical perspectives — avoid promotional or tourist-brochure tone
3. LEARNER-FOCUSED: explain context that a non-Korean reader needs; do not assume cultural familiarity
4. Japanese version MUST be a genuine rewrite adapted for Japanese readers — not a machine translation of the English; use natural Japanese phrasing with Kanji/Hiragana/Katakana
5. VOCABULARY: pick 4-5 key Korean words or phrases that naturally appear in the Korean content; choose words useful or interesting for learners

Return ONLY valid JSON with exactly these fields:
{
  "title_en": "Headline in English (under 100 chars)",
  "title_ko": "Korean headline (under 60 chars)",
  "title_ja": "Japanese headline (under 60 chars)",
  "summary_en": "1-2 sentence English summary",
  "summary_ko": "1-2 sentence Korean summary",
  "summary_ja": "1-2 sentence Japanese summary",
  "content_en": "Full article in English, 3-4 paragraphs separated by \\n\\n",
  "content_ko": "Full article in Korean, 3-4 paragraphs separated by \\n\\n",
  "content_ja": "Full article in Japanese, 3-4 paragraphs separated by \\n\\n",
  "vocabulary": [
    {
      "word": "Korean word in Hangul",
      "reading": "romanization (e.g. ban-do-che)",
      "part_of_speech": "noun / verb / adjective / phrase",
      "definition_en": "concise English definition",
      "example_ko": "Short Korean example sentence using the word",
      "example_en": "English translation of the example"
    }
  ],
  "seo_description": "Meta description under 155 chars",
  "seo_keywords": "5-7 comma-separated keywords",
  "level": "beginner or intermediate or advanced",
  "reading_time_en": 3,
  "reading_time_ko": 4,
  "reading_time_ja": 4
}

Guidelines:
- "level": beginner = everyday simple words; intermediate = common news vocabulary; advanced = technical or political terms
- content_en, content_ko, content_ja cover the same story but are NOT word-for-word translations
- Korean text must use actual Hangul characters — not romanization
- Japanese text must use actual Kanji/Hiragana/Katakana — not romanization
- No trailing commas after the last item in any array or object
- Return only the JSON object — no markdown fences, no extra text`;

  const message = await anthropic.messages.create({
    model: MODEL,
    max_tokens: MAX_TOKENS,
    messages: [{ role: 'user', content: prompt }],
  });

  return parseJSON(message.content[0].text.trim(), `"${article.title_en}"`);
}

// ── Rewrite a daily summary ───────────────────────────────────────────────
async function rewriteSummary(summary) {
  const articles = await fetchArticlesForDate(summary.date);
  if (!articles.length) {
    console.log(`  ⚠ No articles found for ${summary.date} — skipping summary`);
    return null;
  }

  const headlines = articles.map(a => `- ${a.title_en}`).join('\n');
  const prompt = `You are a news editor writing a briefing for a Korean language-learning site.

Date: ${summary.date}
Korea news stories from that day:
${headlines}

Write a brief, engaging editorial summary (2-3 sentences) that:
1. Highlights the most interesting or contrasting themes across the stories — avoid listing topics one by one
2. Includes ONE useful Korean word or phrase (with its English meaning in parentheses) that connects to the news

Return ONLY valid JSON:
{ "summary_en": "2-3 sentence English summary with one Korean term and translation", "summary_ko": "2-3 sentence Korean summary (Hangul)", "summary_ja": "2-3 sentence Japanese summary (Kanji/Hiragana)" }`;

  const message = await anthropic.messages.create({
    model: MODEL,
    max_tokens: 1200,
    messages: [{ role: 'user', content: prompt }],
  });

  return parseJSON(message.content[0].text.trim(), `summary ${summary.date}`);
}

// ── Update an article in Supabase ─────────────────────────────────────────
async function updateArticle(id, article) {
  const { error } = await supabase.from('articles').update({
    title_en:        article.title_en,
    title_ko:        article.title_ko,
    title_ja:        article.title_ja,
    summary_en:      article.summary_en,
    summary_ko:      article.summary_ko,
    summary_ja:      article.summary_ja,
    content_en:      article.content_en,
    content_ko:      article.content_ko,
    content_ja:      article.content_ja,
    vocabulary:      article.vocabulary || [],
    seo_description: article.seo_description,
    seo_keywords:    article.seo_keywords,
    level:           article.level,
    reading_time_en: article.reading_time_en || 3,
    reading_time_ko: article.reading_time_ko || 4,
    reading_time_ja: article.reading_time_ja || 4,
    updated_at:      new Date().toISOString(),
  }).eq('id', id);
  if (error) throw new Error(`Update failed (${id}): ${error.message}`);
}

// ── Update a daily summary in Supabase ────────────────────────────────────
async function updateSummary(id, summary) {
  const { error } = await supabase.from('daily_summaries').update({
    summary_en: summary.summary_en,
    summary_ko: summary.summary_ko,
    summary_ja: summary.summary_ja,
  }).eq('id', id);
  if (error) throw new Error(`Summary update failed (${id}): ${error.message}`);
}

// ── Main ──────────────────────────────────────────────────────────────────
async function main() {
  const mode = DRY_RUN ? 'DRY RUN' : 'LIVE';
  console.log(`\n=== Korean School Article Revision Script ===`);
  console.log(`Mode: ${mode}  |  Model: ${MODEL}\n`);

  // ── Revise articles ───────────────────────────────────────────────────
  const results = { success: 0, failed: 0 };

  if (!SUMMARIES_ONLY) {
    const articles = await fetchAllArticles();
    const toProcess = LIMIT < Infinity ? articles.slice(0, LIMIT) : articles;
    console.log(`Found ${articles.length} published article(s). Processing ${toProcess.length}.\n`);

    for (let i = 0; i < toProcess.length; i++) {
    const a = toProcess[i];
    const topic = a.topics || {};
    process.stdout.write(`[${i + 1}/${toProcess.length}] [${topic.slug || '?'}] "${a.title_en}"… `);
    try {
      const revised = await rewriteArticle(a);
      if (DRY_RUN) {
        console.log(`✓ DRY RUN — new title: "${revised.title_en}", vocab: ${revised.vocabulary?.length ?? 0} words`);
      } else {
        await updateArticle(a.id, revised);
        console.log(`✓ Updated — "${revised.title_en}"`);
      }
      results.success++;
    } catch (err) {
      console.log(`✗ FAILED: ${err.message}`);
      results.failed++;
    }
    await new Promise(r => setTimeout(r, DELAY_MS));
    }
  } // end if (!SUMMARIES_ONLY)

  // ── Revise daily summaries ────────────────────────────────────────────
  if (!SKIP_SUMMARIES) {
    const summaries = await fetchAllSummaries();
    console.log(`\nFound ${summaries.length} daily summar${summaries.length === 1 ? 'y' : 'ies'} to revise.\n`);

    for (let i = 0; i < summaries.length; i++) {
      const s = summaries[i];
      process.stdout.write(`[${i + 1}/${summaries.length}] Summary for ${s.date}… `);
      try {
        const revised = await rewriteSummary(s);
        if (!revised) continue;
        if (DRY_RUN) {
          console.log(`✓ DRY RUN — "${revised.summary_en?.slice(0, 80)}…"`);
        } else {
          await updateSummary(s.id, revised);
          console.log(`✓ Updated`);
        }
      } catch (err) {
        console.log(`✗ FAILED: ${err.message}`);
      }
      await new Promise(r => setTimeout(r, DELAY_MS));
    }
  }

  // ── Final report ─────────────────────────────────────────────────────
  console.log(`\n=== Results ===`);
  console.log(`✓ Articles: ${results.success} succeeded, ${results.failed} failed`);
  console.log('Done.\n');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
