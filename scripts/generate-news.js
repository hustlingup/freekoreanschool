/**
 * Korean School — Daily News Generator
 *
 * Runs in GitHub Actions every day at 8AM KST.
 * Fetches real Korean news headlines via Google News RSS, then uses Claude
 * to write factual bilingual (English + Korean) articles for each topic.
 * Saves results to Supabase.
 *
 * Required env vars:
 *   ANTHROPIC_API_KEY    — Anthropic API key
 *   SUPABASE_URL         — Supabase project URL
 *   SUPABASE_SERVICE_KEY — Supabase service role key (bypasses RLS)
 *
 * Optional env vars:
 *   DRY_RUN=true         — Generate but do not save to database
 *   REWRITE_TODAY=true   — Rewrite today's existing articles instead of creating new ones
 */

import { config as loadEnv } from 'dotenv';
loadEnv();

import Anthropic from '@anthropic-ai/sdk';
import { createClient } from '@supabase/supabase-js';

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const SUPABASE_URL      = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
const DRY_RUN           = process.env.DRY_RUN       === 'true';
const REWRITE_TODAY     = process.env.REWRITE_TODAY === 'true';

if (!ANTHROPIC_API_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('Missing required env vars: ANTHROPIC_API_KEY, SUPABASE_URL, SUPABASE_SERVICE_KEY');
  process.exit(1);
}

const anthropic = new Anthropic({ apiKey: ANTHROPIC_API_KEY });
const supabase  = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

const TODAY      = new Date().toISOString().slice(0, 10);
const MODEL      = 'claude-sonnet-4-6';
const MAX_TOKENS = 4000;

// ── Article angle pool ────────────────────────────────────────────────────
const ARTICLE_ANGLES = [
  'current events — report what is happening right now in a clear, neutral tone',
  'historical context — explain how this topic developed over time in Korea',
  'daily life impact — focus on how this affects ordinary Koreans day-to-day',
  'comparison — contrast the Korean situation with trends in other countries',
  'debate and diverse views — present at least two contrasting perspectives',
  'practical guide — give learners actionable cultural or language insight',
  'human interest — focus on a specific community or group affected by this topic',
];

// ── Google News RSS search queries per topic slug ─────────────────────────
const TOPIC_RSS_QUERIES = {
  kpop:      'K-pop Korean music idol group BTS BLACKPINK',
  tech:      'South Korea technology AI semiconductor Samsung',
  food:      'Korean food cuisine restaurant Seoul',
  sports:    'South Korea sports soccer football athlete',
  culture:   'Korean culture hallyu drama film Netflix',
  society:   'South Korea society lifestyle trends',
  education: 'South Korea education school university students',
  fashion:   'Korean fashion Seoul style K-beauty',
  travel:    'South Korea travel tourism Jeju Seoul',
  economy:   'South Korea economy exports GDP trade',
  politics:  'South Korea politics government policy National Assembly',
};

// ── Parse Google News RSS XML ─────────────────────────────────────────────
function parseRSS(xml) {
  const items = [];
  for (const match of xml.matchAll(/<item>([\s\S]*?)<\/item>/g)) {
    const raw = match[1];

    const title = (
      raw.match(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>/)?.[1] ??
      raw.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? ''
    ).replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').trim();

    const desc = (
      raw.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/)?.[1] ??
      raw.match(/<description>([\s\S]*?)<\/description>/)?.[1] ?? ''
    ).replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').trim().slice(0, 400);

    const source  = (raw.match(/<source[^>]*>([\s\S]*?)<\/source>/)?.[1] ?? '').trim();
    const pubDate = (raw.match(/<pubDate>([\s\S]*?)<\/pubDate>/)?.[1] ?? '').trim();

    if (title) items.push({ title, desc, source, pubDate });
    if (items.length >= 5) break;
  }
  return items;
}

// ── Fetch real headlines from Google News RSS ─────────────────────────────
async function fetchRealNews(topicSlug) {
  const query = TOPIC_RSS_QUERIES[topicSlug] ?? `South Korea ${topicSlug}`;
  // tbs=qdr:2d = past 48 hours
  const url = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=en-US&gl=US&ceid=US:en&tbs=qdr:2d`;

  try {
    const resp = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; NewsAggregator/1.0)' },
      signal: AbortSignal.timeout(15000),
    });
    if (!resp.ok) {
      console.warn(`  [RSS] HTTP ${resp.status} for "${topicSlug}"`);
      return [];
    }
    const items = parseRSS(await resp.text());
    console.log(`  [RSS] ${items.length} headlines for "${topicSlug}"`);
    return items;
  } catch (err) {
    console.warn(`  [RSS] Failed for "${topicSlug}": ${err.message}`);
    return [];
  }
}

// ── Generate one article grounded in real headlines ───────────────────────
async function generateArticle(topic) {
  const newsItems = await fetchRealNews(topic.slug);
  const hasRealNews = newsItems.length > 0;
  const angle = ARTICLE_ANGLES[Math.floor(Math.random() * ARTICLE_ANGLES.length)];

  let newsContext;
  if (hasRealNews) {
    const list = newsItems
      .map((h, i) => {
        const parts = [`${i + 1}. "${h.title}"`];
        if (h.source)  parts.push(`(${h.source})`);
        if (h.desc)    parts.push(`— ${h.desc}`);
        return parts.join(' ');
      })
      .join('\n');
    newsContext =
      `Real current news headlines about "${topic.name_en}" from South Korea (past 48 hours):\n${list}`;
  } else {
    newsContext =
      `No live headlines found for "${topic.name_en}". ` +
      `Write a factual article about genuine, verifiable recent developments in this area in Korea — ` +
      `do NOT invent specific events, named people, or statistics.`;
  }

  const factInstruction = hasRealNews
    ? `Ground your article in the REAL headlines above. Expand naturally on what those headlines indicate with accurate context. ` +
      `Do NOT invent specific events, statistics, or named individuals not supported by the headlines.`
    : `Write a factual, educational piece based only on verifiable information about Korea in this topic area.`;

  const prompt = `You are creating educational content for a Korean language-learning website. Your goal is to inform and engage learners about real Korean life — not to market Korea. Write like a curious, balanced reporter.

Today's date: ${TODAY}
Assigned article angle: "${angle}"

${newsContext}

${factInstruction}

REQUIREMENTS:
1. BALANCED: include both positives AND challenges, debates, or critical perspectives. Avoid promotional language.
2. LEARNER-FOCUSED: explain context that a non-Korean reader needs. Do not assume cultural familiarity.
3. VOCABULARY: identify 4-5 key Korean words or phrases that naturally appear in the Korean content. Pick words that are useful, interesting, or topic-specific.

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
- content_en, content_ko, and content_ja cover the same story but are NOT word-for-word translations; Japanese must use natural phrasing — not a translation of the English
- Korean text must use actual Hangul characters — not romanization
- Japanese text must use actual Kanji/Hiragana/Katakana — not romanization
- No trailing commas after the last item in any array or object
- Return only the JSON object — no markdown fences, no extra text`;

  const message = await anthropic.messages.create({
    model: MODEL,
    max_tokens: MAX_TOKENS,
    messages: [{ role: 'user', content: prompt }],
  });

  return parseJSON(message.content[0].text.trim(), topic.slug);
}

function parseJSON(raw, context) {
  const cleaned = raw.replace(/```(?:json)?\s*/g, '').trim();
  try {
    return JSON.parse(cleaned);
  } catch {
    const match = cleaned.match(/\{[\s\S]*\}/);
    if (match) {
      try { return JSON.parse(match[0]); } catch { /* fall through */ }
    }
    throw new Error(`JSON parse failed for ${context}: ${raw.slice(0, 200)}`);
  }
}

// ── Generate editorial daily summary ─────────────────────────────────────
async function generateDailySummary(articles) {
  const headlines = articles.map(a => `- ${a.title_en}`).join('\n');
  const prompt = `You are a news editor writing today's briefing (${TODAY}) for a Korean language-learning site.

Today's Korea news stories:
${headlines}

Write a brief, engaging editorial summary (2-3 sentences) that:
1. Highlights the most interesting or contrasting themes across today's stories — avoid listing topics one by one
2. Includes ONE useful Korean word or phrase (with its English meaning in parentheses) that connects to today's news

Return ONLY valid JSON:
{ "summary_en": "2-3 sentence English summary with one Korean term and translation", "summary_ko": "2-3 sentence Korean summary (Hangul)", "summary_ja": "2-3 sentence Japanese summary (Kanji/Hiragana)" }`;

  const message = await anthropic.messages.create({
    model: MODEL,
    max_tokens: 1200,
    messages: [{ role: 'user', content: prompt }],
  });

  try {
    return parseJSON(message.content[0].text.trim(), 'daily-summary');
  } catch {
    return {
      summary_en: 'Korea news summary unavailable today.',
      summary_ko: '오늘의 한국 뉴스 요약을 불러올 수 없습니다.',
      summary_ja: '本日の韓国ニュース要約を取得できませんでした。',
    };
  }
}

// ── Supabase helpers ──────────────────────────────────────────────────────
async function getActiveTopics() {
  const { data, error } = await supabase.from('topics').select('*').eq('active', true).order('name_en');
  if (error) throw new Error(`Failed to fetch topics: ${error.message}`);
  return data ?? [];
}

async function getTodaysArticles() {
  const start = `${TODAY}T00:00:00Z`;
  const end   = `${TODAY}T23:59:59Z`;
  const { data, error } = await supabase
    .from('articles')
    .select('id, topic_id, title_en')
    .gte('published_at', start)
    .lte('published_at', end)
    .eq('status', 'published');
  if (error) throw new Error(`Failed to fetch today's articles: ${error.message}`);
  return data ?? [];
}

async function saveArticle(article, topic) {
  const baseSlug = `${topic.slug}-${TODAY}`;
  const { data: existing } = await supabase.from('articles').select('id').eq('slug', baseSlug).maybeSingle();
  const slug = existing ? `${baseSlug}-${Date.now()}` : baseSlug;

  const { error } = await supabase.from('articles').insert({
    topic_id:        topic.id,
    title_en:        article.title_en,
    title_ko:        article.title_ko,
    title_ja:        article.title_ja,
    slug,
    summary_en:      article.summary_en,
    summary_ko:      article.summary_ko,
    summary_ja:      article.summary_ja,
    content_en:      article.content_en,
    content_ko:      article.content_ko,
    content_ja:      article.content_ja,
    seo_description: article.seo_description,
    seo_keywords:    article.seo_keywords,
    level:           article.level,
    reading_time_en: article.reading_time_en || 3,
    reading_time_ko: article.reading_time_ko || 4,
    reading_time_ja: article.reading_time_ja || 4,
    vocabulary:      article.vocabulary || [],
    status:          'published',
    ai_generated:    true,
    published_at:    new Date().toISOString(),
    updated_at:      new Date().toISOString(),
  });
  if (error) throw new Error(`Insert failed for ${topic.slug}: ${error.message}`);
  return slug;
}

async function updateArticle(articleId, article, topicSlug) {
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
    seo_description: article.seo_description,
    seo_keywords:    article.seo_keywords,
    level:           article.level,
    reading_time_en: article.reading_time_en || 3,
    reading_time_ko: article.reading_time_ko || 4,
    reading_time_ja: article.reading_time_ja || 4,
    vocabulary:      article.vocabulary || [],
    updated_at:      new Date().toISOString(),
  }).eq('id', articleId);
  if (error) throw new Error(`Update failed for [${topicSlug}] (${articleId}): ${error.message}`);
}

async function saveDailySummary(summary) {
  const { error } = await supabase.from('daily_summaries').upsert(
    { date: TODAY, summary_en: summary.summary_en, summary_ko: summary.summary_ko, summary_ja: summary.summary_ja },
    { onConflict: 'date' }
  );
  if (error) throw new Error(`Failed to save daily summary: ${error.message}`);
}

// ── Main ──────────────────────────────────────────────────────────────────
async function main() {
  const mode = REWRITE_TODAY ? 'REWRITE' : DRY_RUN ? 'DRY RUN' : 'PUBLISH';
  console.log(`\n=== Korean School News Generator ===`);
  console.log(`Date: ${TODAY}  |  Mode: ${mode}  |  Model: ${MODEL}\n`);

  const topics = await getActiveTopics();
  console.log(`Found ${topics.length} active topics: ${topics.map(t => t.slug).join(', ')}\n`);

  const results = { success: [], failed: [] };
  const generatedArticles = [];

  if (REWRITE_TODAY) {
    // ── Rewrite mode: update today's existing articles ──────────────────
    const todaysArticles = await getTodaysArticles();
    console.log(`Found ${todaysArticles.length} existing article(s) to rewrite.\n`);

    const topicMap = Object.fromEntries(topics.map(t => [t.id, t]));

    for (const existing of todaysArticles) {
      const topic = topicMap[existing.topic_id];
      if (!topic) {
        console.warn(`  ✗ No topic found for article ${existing.id} — skipping`);
        continue;
      }

      process.stdout.write(`Rewriting [${topic.slug}] "${existing.title_en}"…\n`);
      try {
        const article = await generateArticle(topic);
        generatedArticles.push(article);
        if (DRY_RUN) {
          console.log(`  ✓ DRY RUN — new title: "${article.title_en}"\n`);
        } else {
          await updateArticle(existing.id, article, topic.slug);
          console.log(`  ✓ Updated → "${article.title_en}"\n`);
        }
        results.success.push(topic.slug);
      } catch (err) {
        console.log(`  ✗ FAILED: ${err.message}\n`);
        results.failed.push({ topic: topic.slug, error: err.message });
      }
      await new Promise(r => setTimeout(r, 1000));
    }
  } else {
    // ── Normal mode: create new articles ────────────────────────────────
    for (const topic of topics) {
      process.stdout.write(`Generating [${topic.slug}]…\n`);
      try {
        const article = await generateArticle(topic);
        generatedArticles.push(article);
        if (DRY_RUN) {
          console.log(`  ✓ DRY RUN — "${article.title_en}"\n`);
        } else {
          const slug = await saveArticle(article, topic);
          console.log(`  ✓ Saved as "${slug}"\n`);
        }
        results.success.push(topic.slug);
      } catch (err) {
        console.log(`  ✗ FAILED: ${err.message}\n`);
        results.failed.push({ topic: topic.slug, error: err.message });
      }
      await new Promise(r => setTimeout(r, 1000));
    }
  }

  // ── Daily summary ────────────────────────────────────────────────────────
  if (generatedArticles.length > 0) {
    process.stdout.write(`Generating daily summary… `);
    try {
      const summary = await generateDailySummary(generatedArticles);
      if (DRY_RUN) {
        console.log(`✓ DRY RUN — "${summary.summary_en}"`);
      } else {
        await saveDailySummary(summary);
        console.log(`✓ Saved`);
      }
    } catch (err) {
      console.log(`✗ FAILED: ${err.message}`);
    }
  }

  // ── Final report ─────────────────────────────────────────────────────────
  console.log(`\n=== Results ===`);
  console.log(`✓ Success: ${results.success.length} / ${results.success.length + results.failed.length} articles`);
  if (results.failed.length) {
    console.log(`✗ Failed: ${results.failed.length}`);
    results.failed.forEach(f => console.log(`  - ${f.topic}: ${f.error}`));
    process.exit(1);
  }
  console.log('Done.\n');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
