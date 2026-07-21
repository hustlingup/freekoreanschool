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
 *   ONLY_TOPIC=<slug>    — Generate for a single topic only (testing)
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

// ── Article angle pool (rotated deterministically, never random) ──────────
const ARTICLE_ANGLES = [
  'straight news report — who, what, when, where; a clear neutral account of the specific event',
  'daily life impact — how this specific event touches ordinary Koreans day-to-day',
  'explainer — unpack the background a foreigner needs to understand this specific event',
  'human interest — the specific people, company, or community at the center of this event',
  'what happens next — the concrete stakes and likely consequences of this event',
];

// ── Google News RSS query variants per topic slug ──────────────────────────
// Multiple variants per topic, rotated by day, so each day surfaces a
// different slice of the topic instead of the same headline cluster.
const TOPIC_RSS_QUERIES = {
  kpop: [
    'K-pop comeback album debut chart',
    'K-pop agency HYBE SM JYP YG news',
    'Korean idol concert tour fan event',
    'K-pop survival show trainee rookie group',
  ],
  tech: [
    'South Korea startup funding app service launch',
    'Samsung SK Hynix chip factory investment',
    'Korea AI robot service adoption',
    'Naver Kakao Coupang Korean tech company',
  ],
  food: [
    'Korean restaurant chef michelin opening',
    'Korea food trend convenience store new product',
    'Korean food export ramyeon kimchi frozen',
    'Seoul cafe dessert food festival',
  ],
  sports: [
    'South Korea football K-League match result',
    'Korean baseball KBO player record',
    'Korean athlete international tournament medal',
    'Son Heung-min Lee Kang-in Kim Min-jae',
  ],
  culture: [
    'Korean drama series premiere Netflix cast',
    'Korean film festival box office director',
    'Korea webtoon novel exhibition museum',
    'Korean traditional heritage festival event',
  ],
  society: [
    'South Korea population housing policy change',
    'Korea workplace law court ruling',
    'Seoul city new rule residents',
    'South Korea survey statistics young people',
  ],
  education: [
    'Korea suneung exam university admission change',
    'South Korea school policy teachers ministry',
    'Korean university research students international',
    'Korea private academy hagwon regulation',
  ],
  fashion: [
    'Seoul fashion week designer brand collection',
    'K-beauty brand product launch export',
    'Korean fashion brand collaboration pop-up',
    'Korea beauty cosmetics olive young trend',
  ],
  travel: [
    'Korea tourism new route airline flight',
    'Jeju Busan Gangwon travel attraction opening',
    'Korea visa tourist policy foreign visitors',
    'Seoul festival event travel destination',
  ],
  economy: [
    'South Korea exports data monthly figures',
    'Bank of Korea interest rate inflation',
    'Korean company earnings investment deal',
    'Korea won exchange rate stock KOSPI',
  ],
  politics: [
    'South Korea National Assembly bill vote',
    'Korea president policy announcement',
    'South Korea diplomacy summit US Japan China',
    'Korea election party leader statement',
  ],
};

function rssQueryFor(topicSlug) {
  const variants = TOPIC_RSS_QUERIES[topicSlug];
  if (!variants) return `South Korea ${topicSlug}`;
  const dayOfYear = Math.floor((Date.now() - Date.parse(new Date().getFullYear() + '-01-01')) / 86400000);
  return variants[dayOfYear % variants.length];
}

function angleFor(topicSlug, salt = 0) {
  const dayOfYear = Math.floor((Date.now() - Date.parse(new Date().getFullYear() + '-01-01')) / 86400000);
  let hash = salt;
  for (const c of topicSlug) hash = (hash * 31 + c.charCodeAt(0)) >>> 0;
  return ARTICLE_ANGLES[(dayOfYear + hash) % ARTICLE_ANGLES.length];
}

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

    // Original-source URL. Google News RSS wraps publisher links in a
    // news.google.com redirect; it still resolves to the publisher's page and
    // is what we surface to readers as "original source".
    const link = (
      raw.match(/<link><!\[CDATA\[([\s\S]*?)\]\]><\/link>/)?.[1] ??
      raw.match(/<link>([\s\S]*?)<\/link>/)?.[1] ?? ''
    ).replace(/&amp;/g, '&').trim();

    const sourceUrl = (raw.match(/<source[^>]*url="([^"]*)"/)?.[1] ?? '').replace(/&amp;/g, '&').trim();

    if (title) items.push({ title, desc, source, pubDate, link, sourceUrl });
    if (items.length >= 10) break;
  }
  return items;
}

// ── Fetch real headlines from Google News RSS ─────────────────────────────
async function fetchRealNews(topicSlug) {
  const query = rssQueryFor(topicSlug);
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

// ── Recent-article memory (avoid re-telling the same story) ───────────────
async function getRecentArticles(topicId, days = 21) {
  const since = new Date(Date.now() - days * 86400000).toISOString();
  const { data, error } = await supabase
    .from('articles')
    .select('title_en, summary_en')
    .eq('topic_id', topicId)
    .gte('published_at', since)
    .order('published_at', { ascending: false })
    .limit(15);
  if (error) {
    console.warn(`  [memory] fetch failed: ${error.message}`);
    return [];
  }
  return data ?? [];
}

// ── Title similarity guard ─────────────────────────────────────────────────
const STOPWORDS = new Set(['the','a','an','of','in','on','for','and','or','to','how','what','why','is','are','its','korea','korean','koreas','south','k']);
function titleWords(title) {
  return new Set(
    title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').split(/[\s-]+/)
      .filter(w => w.length > 2 && !STOPWORDS.has(w))
  );
}
function tooSimilar(newTitle, recentTitles) {
  const a = titleWords(newTitle);
  if (a.size === 0) return false;
  for (const prev of recentTitles) {
    const b = titleWords(prev);
    if (b.size === 0) continue;
    let overlap = 0;
    for (const w of a) if (b.has(w)) overlap++;
    if (overlap / Math.min(a.size, b.size) >= 0.5) return true;
  }
  return false;
}

// ── Generate one article grounded in real headlines ───────────────────────
async function generateArticle(topic, { attempt = 0 } = {}) {
  const newsItems = await fetchRealNews(topic.slug);
  const hasRealNews = newsItems.length > 0;
  const angle = angleFor(topic.slug, attempt);
  const recent = await getRecentArticles(topic.id);

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
      `Write a factual article about a genuine, verifiable, SPECIFIC recent development in this area in Korea — ` +
      `do NOT invent specific events, named people, or statistics.`;
  }

  const factInstruction = hasRealNews
    ? `STEP 1 — PICK ONE STORY: From the headlines above, choose the single most newsworthy SPECIFIC story that is NOT already covered in the recent-article list below. A specific story has a concrete event, a named person/company/place, and a "this week" time anchor — not a general trend.
STEP 2 — WRITE ABOUT THAT ONE STORY ONLY. Every paragraph must relate to that one event. Do NOT zoom out into a survey of the whole topic. Do NOT invent events, statistics, or named individuals not supported by the headlines.`
    : `Write a factual, educational piece about ONE specific, verifiable aspect of this topic — not a broad overview.`;

  const recentBlock = recent.length
    ? `ARTICLES ALREADY PUBLISHED on this topic in the last 3 weeks — you MUST NOT retell these stories or reuse their framing:\n` +
      recent.map(r => `- "${r.title_en}"${r.summary_en ? ` — ${r.summary_en}` : ''}`).join('\n')
    : `No recent articles on this topic.`;

  const prompt = `You are a news reporter for a Korean language-learning website. Your readers already get generic "Korea overview" content everywhere — your job is to give them ONE concrete, current story with real specifics.

Today's date: ${TODAY}
Assigned article angle: "${angle}"

${newsContext}

${recentBlock}

${factInstruction}

REQUIREMENTS:
1. SPECIFIC, NOT BROAD: the article covers one concrete event/development. The first paragraph is a news lede: what happened, who did it, when. If you cannot name the who/what/when in the first two sentences, you chose too broad a story.
2. BANNED OPENINGS: never start with "Over the past decade", "In recent years", "Korea has long been", "[X] has moved from a niche" or any similar trend-essay opener.
3. BANNED TEMPLATE: do not structure the article as "supporters argue... however critics say...". Only present a debate if the specific story IS a debate.
4. FRESH: the title and content must not resemble any recently published article listed above.
5. LEARNER-FOCUSED: briefly explain context a non-Korean reader needs, but keep the specific story in the foreground.
6. VOCABULARY: identify 4-5 key Korean words or phrases that naturally appear in the Korean content. Pick words specific to THIS story, not generic topic words already used in recent articles.

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
      "reading_ja": "katakana reading of the Korean pronunciation (e.g. パンドチェ)",
      "part_of_speech": "noun / verb / adjective / phrase",
      "definition_en": "concise English definition",
      "definition_ja": "concise Japanese definition",
      "example_ko": "Short Korean example sentence using the word",
      "example_en": "English translation of the example",
      "example_ja": "Japanese translation of the example"
    }
  ],
  "source_index": 1,
  "seo_description": "Meta description under 155 chars",
  "seo_keywords": "5-7 comma-separated keywords",
  "level": "beginner or intermediate or advanced",
  "reading_time_en": 3,
  "reading_time_ko": 4,
  "reading_time_ja": 4
}

Guidelines:
- "source_index": the number (from the headline list above) of the ONE headline this article is based on. This is required — readers are shown a link to that original report. If no headlines were supplied, use 0.
- "level": beginner = everyday simple words; intermediate = common news vocabulary; advanced = technical or political terms
- content_en, content_ko, and content_ja cover the same story but are NOT word-for-word translations; Japanese must use natural phrasing — not a translation of the English
- Korean text must use actual Hangul characters — not romanization
- Japanese text must use actual Kanji/Hiragana/Katakana — not romanization
- No trailing commas after the last item in any array or object
- Return only the JSON object — no markdown fences, no extra text`;

  const retryNote = attempt > 0
    ? `\n\nIMPORTANT: A previous draft was rejected for being too similar to recently published articles. Choose a completely DIFFERENT story from the headlines this time.`
    : '';

  const message = await anthropic.messages.create({
    model: MODEL,
    max_tokens: MAX_TOKENS,
    messages: [{ role: 'user', content: prompt + retryNote }],
  });

  const article = parseJSON(message.content[0].text.trim(), topic.slug);

  // Reject near-duplicate titles once; second attempt rotates the angle and
  // carries an explicit "pick a different story" instruction.
  if (attempt === 0 && tooSimilar(article.title_en, recent.map(r => r.title_en))) {
    console.log(`  [dedup] "${article.title_en}" too close to a recent article — retrying`);
    return generateArticle(topic, { attempt: 1 });
  }

  // Attach the original report this summary was based on, so every published
  // article can link out to it. Falls back to the first headline if the model
  // returned an out-of-range index.
  const idx = Number(article.source_index);
  const picked = (Number.isInteger(idx) && idx >= 1 && idx <= newsItems.length)
    ? newsItems[idx - 1]
    : newsItems[0];
  if (picked) {
    article.source_url   = picked.link || picked.sourceUrl || null;
    article.source_name  = picked.source || null;
    article.source_title = picked.title || null;
    if (!article.source_url) console.warn(`  [source] no URL captured for "${topic.slug}"`);
  } else {
    article.source_url = article.source_name = article.source_title = null;
    console.warn(`  [source] no headlines for "${topic.slug}" — publishing without a source link`);
  }
  delete article.source_index;

  return article;
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
    source_url:      article.source_url   || null,
    source_name:     article.source_name  || null,
    source_title:    article.source_title || null,
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
    source_url:      article.source_url   || null,
    source_name:     article.source_name  || null,
    source_title:    article.source_title || null,
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

  let topics = await getActiveTopics();
  if (process.env.ONLY_TOPIC) topics = topics.filter(t => t.slug === process.env.ONLY_TOPIC);
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
