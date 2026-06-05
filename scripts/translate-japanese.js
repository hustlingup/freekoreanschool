/**
 * Korean School — Japanese Translation Script
 *
 * Fetches articles from Supabase that are missing Japanese content,
 * uses Claude to translate them, then saves to the database.
 *
 * Usage:
 *   node translate-japanese.js            — preview only (no save)
 *   node translate-japanese.js --save     — translate and save to DB
 *   node translate-japanese.js --id <uuid> --save  — single article
 *
 * Required env vars (same as generate-news.js):
 *   ANTHROPIC_API_KEY
 *   SUPABASE_URL
 *   SUPABASE_SERVICE_KEY
 */

import { config as loadEnv } from 'dotenv';
loadEnv();

import Anthropic from '@anthropic-ai/sdk';
import { createClient } from '@supabase/supabase-js';

const ANTHROPIC_API_KEY    = process.env.ANTHROPIC_API_KEY;
const SUPABASE_URL         = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

if (!ANTHROPIC_API_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('Missing required env vars: ANTHROPIC_API_KEY, SUPABASE_URL, SUPABASE_SERVICE_KEY');
  process.exit(1);
}

const args    = process.argv.slice(2);
const SAVE    = args.includes('--save');
const idIdx   = args.indexOf('--id');
const ONLY_ID = idIdx !== -1 ? args[idIdx + 1] : null;

const anthropic = new Anthropic({ apiKey: ANTHROPIC_API_KEY });
const supabase  = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

const MODEL      = 'claude-sonnet-4-6';
const MAX_TOKENS = 3000;

// ── Translate one article to Japanese ────────────────────────────────────────
async function translateArticle(article) {
  const prompt = `You are a professional Japanese translator working for a Korean language-learning website targeting Japanese-speaking learners.

Translate the following Korean news article into Japanese. Your output must:
- Use natural, fluent Japanese (not word-for-word translation)
- Use Kanji, Hiragana, and Katakana appropriately
- Be engaging and appropriate for a news article format
- Keep Korean proper nouns (people/place names) in their common Japanese reading or katakana
- Maintain the same paragraph structure as the source

Source article:
Title (English): ${article.title_en}
Title (Korean): ${article.title_ko}

Summary (English): ${article.summary_en || ''}
Summary (Korean): ${article.summary_ko || ''}

Full article (English):
${article.content_en}

Full article (Korean):
${article.content_ko}

Return ONLY valid JSON with exactly these fields (no markdown fences, no extra text):
{
  "title_ja": "Japanese headline (under 60 characters)",
  "summary_ja": "1-2 sentence Japanese summary",
  "content_ja": "Full Japanese article, same paragraph structure as source, paragraphs separated by \\n\\n",
  "reading_time_ja": 4
}`;

  const message = await anthropic.messages.create({
    model: MODEL,
    max_tokens: MAX_TOKENS,
    messages: [{ role: 'user', content: prompt }],
  });

  const raw = message.content[0].text.trim();
  try {
    return JSON.parse(raw);
  } catch {
    const match = raw.match(/\{[\s\S]*\}/);
    if (match) return JSON.parse(match[0]);
    throw new Error(`JSON parse failed: ${raw.slice(0, 200)}`);
  }
}

// ── Save Japanese fields to Supabase ─────────────────────────────────────────
async function saveTranslation(id, translation) {
  const { error } = await supabase
    .from('articles')
    .update({
      title_ja:        translation.title_ja,
      summary_ja:      translation.summary_ja,
      content_ja:      translation.content_ja,
      reading_time_ja: translation.reading_time_ja || 4,
      updated_at:      new Date().toISOString(),
    })
    .eq('id', id);

  if (error) throw new Error(`Update failed for ${id}: ${error.message}`);
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log(`\n=== Korean School — Japanese Translator ===`);
  console.log(`Mode: ${SAVE ? 'SAVE TO DB' : 'PREVIEW (dry run)'}  |  Model: ${MODEL}\n`);

  // Fetch articles missing Japanese content
  let query = supabase
    .from('articles')
    .select('id, slug, title_en, title_ko, summary_en, summary_ko, content_en, content_ko, title_ja, published_at')
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (ONLY_ID) {
    query = query.eq('id', ONLY_ID);
  } else {
    query = query.is('title_ja', null);   // only articles missing Japanese
  }

  const { data: articles, error } = await query;
  if (error) { console.error('Fetch error:', error.message); process.exit(1); }
  if (!articles?.length) {
    console.log('✓ No articles need Japanese translation.');
    return;
  }

  console.log(`Found ${articles.length} article(s) to translate:\n`);
  articles.forEach((a, i) => console.log(`  ${i + 1}. [${a.slug}] "${a.title_en}"`));
  console.log('');

  const results = { success: [], failed: [] };

  for (const article of articles) {
    process.stdout.write(`Translating [${article.slug}]…\n`);
    try {
      const translation = await translateArticle(article);

      console.log(`  ✓ title_ja: "${translation.title_ja}"`);
      console.log(`  ✓ summary_ja: "${(translation.summary_ja || '').slice(0, 80)}…"`);
      console.log(`  ✓ content_ja: ${(translation.content_ja || '').length} chars\n`);

      if (SAVE) {
        await saveTranslation(article.id, translation);
        console.log(`  ✓ Saved to database.\n`);
      } else {
        console.log(`  [DRY RUN — use --save to write to database]\n`);
        // Print full translation for manual review
        console.log('  ─── FULL TRANSLATION (copy for manual input) ───');
        console.log(`  title_ja: ${translation.title_ja}`);
        console.log(`  summary_ja: ${translation.summary_ja}`);
        console.log(`  content_ja:\n${translation.content_ja}`);
        console.log('  ────────────────────────────────────────────────\n');
      }

      results.success.push(article.slug);
    } catch (err) {
      console.log(`  ✗ FAILED: ${err.message}\n`);
      results.failed.push({ slug: article.slug, error: err.message });
    }

    // Rate limit protection
    if (articles.length > 1) await new Promise(r => setTimeout(r, 1500));
  }

  console.log(`\n=== Results ===`);
  console.log(`✓ Success: ${results.success.length} / ${articles.length}`);
  if (results.failed.length) {
    console.log(`✗ Failed:  ${results.failed.length}`);
    results.failed.forEach(f => console.log(`  - ${f.slug}: ${f.error}`));
    process.exit(1);
  }
  if (!SAVE) {
    console.log('\nRun with --save to write translations to the database.');
  }
  console.log('Done.\n');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
