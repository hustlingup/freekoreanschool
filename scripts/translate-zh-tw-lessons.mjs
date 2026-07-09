/**
 * Korean School — zh-TW Lesson Audit & Filler
 *
 * AUDIT mode (default): scans the 9 lesson JSON files for missing _zh_tw fields
 * and prints a per-file coverage report. Exits non-zero if any gaps remain.
 *
 * FILL mode (--save): calls Claude to translate each missing field and writes
 * the result back into the JSON file, inserting _zh_tw keys immediately after
 * their English siblings. Idempotent — existing _zh_tw fields are skipped.
 *
 * Usage:
 *   node scripts/translate-zh-tw-lessons.mjs                  -- audit all 9 files
 *   node scripts/translate-zh-tw-lessons.mjs --save           -- fill missing fields
 *   node scripts/translate-zh-tw-lessons.mjs --file hangul    -- scope to one file
 *   node scripts/translate-zh-tw-lessons.mjs --file hangul --save
 *
 * Required env var: ANTHROPIC_API_KEY
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { config as loadEnv } from 'dotenv';
import Anthropic from '@anthropic-ai/sdk';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);

// Load .env from the scripts/ directory regardless of cwd
loadEnv({ path: join(__dirname, '.env') });
const DATA_DIR   = join(__dirname, '..', 'learn', 'data');
const MODEL      = 'claude-sonnet-4-6';
const CHUNK_SIZE = 40; // max items per API call to avoid token limits

const LESSON_FILES = [
  'hangul',
  'syllable-blocks',
  'pronunciation',
  'grammar',
  'nouns',
  'pronouns',
  'shopping',
  'emotions',
  'speech-levels',
];

// ── CLI args ──────────────────────────────────────────────────────────────────
const args    = process.argv.slice(2);
const SAVE    = args.includes('--save');
const fileIdx = args.indexOf('--file');
const ONLY    = fileIdx !== -1 ? args[fileIdx + 1] : null;

// ── Field map: step type → translatable fields ────────────────────────────────
// shape: 'string' | 'string[]' | 'object' ({label, text})
const TRANSLATABLE = {
  reading_card: [
    { field: 'title',          shape: 'string'   },
    { field: 'body',           shape: 'string'   },
    { field: 'rules',          shape: 'string[]' },
    { field: 'tip',            shape: 'object'   },
    { field: 'patterns_label', shape: 'string[]' },
  ],
  match_quiz: [
    { field: 'prompt',   shape: 'string'   },
    { field: 'choices',  shape: 'string[]' },
  ],
  card_reveal: [
    { field: 'example_meaning', shape: 'string' },
    { field: 'hint',            shape: 'string' },
  ],
  syllable_builder: [
    { field: 'meaning', shape: 'string' },
  ],
  listen_repeat: [
    { field: 'meaning', shape: 'string' },
  ],
  lesson_complete: [
    { field: 'message', shape: 'string' },
  ],
};

// ── Taiwan system prompt ──────────────────────────────────────────────────────
const TAIWAN_SYSTEM = `\
You are a Traditional Chinese (Taiwan, zh-TW) translator for a Korean language learning website.

Rules:
- Write in natural Taiwan Traditional Chinese — never use Simplified Chinese characters
- Keep Korean terms as-is (한글, 받침, 조사, 이/가, 은/는, etc.) when the source text uses them
- Preserve {placeholders}, emoji, and \\n line breaks exactly as in the source
- For "hint" and "example_meaning" in card_reveal steps: translate to natural, learner-friendly Chinese
- For match_quiz "choices" that are English answer words (e.g. "Last", "First", "Anywhere"): translate to natural Chinese equivalents
- For match_quiz "choices" that are romanization/IPA tokens (e.g. "g/k", "b/p"): leave as-is or convert to Zhuyin where contextually appropriate
- Return ONLY a valid JSON array — no markdown fences, no extra explanation

Taiwan-standard vocabulary (use these, not mainland/Simplified equivalents):
- 計程車  (taxi, NOT 出租車)
- 公車    (bus, NOT 公共汽車)
- 便利商店 (convenience store, NOT 便利店)
- 部落格  (blog, NOT 博客)
- 網路    (internet, NOT 互聯網)
- 影片    (video/film, NOT 視頻)
- 地鐵    (Seoul subway — 捷運 = Taiwan MRT, do NOT use 捷運 for Seoul's subway)
- 護照    (passport)
- 預約    (reservation)`;

// ── Audit one file for missing _zh_tw fields ──────────────────────────────────
function auditFile(data) {
  const missing = [];
  for (const step of data.steps) {
    const fields = TRANSLATABLE[step.type];
    if (!fields) continue;
    for (const { field, shape } of fields) {
      if (step[field] == null) continue; // no English source, nothing to translate
      if (step[`${field}_zh_tw`] == null) {
        missing.push({ stepId: step.id, type: step.type, field, shape, value: step[field] });
      }
    }
  }
  return missing;
}

// ── Call Claude to translate a chunk of missing items ─────────────────────────
async function callClaude(anthropic, lessonName, chunk) {
  const payload = chunk.map(m => ({
    stepId: m.stepId,
    field:  m.field,
    shape:  m.shape,
    value:  m.value,
  }));

  const userPrompt = `\
Translate the following Korean lesson content fields to Traditional Chinese (Taiwan).
Lesson: "${lessonName}".

For each item return the translated "value" matching the same shape:
- shape "string"   → return a string
- shape "string[]" → return an array of strings with the same number of elements
- shape "object"   → return an object with exactly the keys { "label": "...", "text": "..." }

Input JSON array:
${JSON.stringify(payload, null, 2)}

Return a JSON array of the same length:
[{ "stepId": <number>, "field": "<field_name>", "translated": <value> }, ...]`;

  const msg = await anthropic.messages.create({
    model:      MODEL,
    max_tokens: 8096,
    system:     TAIWAN_SYSTEM,
    messages:   [{ role: 'user', content: userPrompt }],
  });

  const raw = msg.content[0].text.trim();
  try {
    return JSON.parse(raw);
  } catch {
    const match = raw.match(/\[[\s\S]*\]/);
    if (match) return JSON.parse(match[0]);
    throw new Error(`JSON parse failed:\n${raw.slice(0, 500)}`);
  }
}

// ── Apply translations and reorder keys so _zh_tw follows its base ────────────
function applyAndReorder(data, translations) {
  // Build stepId → { field → translated } map
  const transMap = new Map();
  for (const { stepId, field, translated } of translations) {
    if (!transMap.has(stepId)) transMap.set(stepId, {});
    transMap.get(stepId)[field] = translated;
  }

  data.steps = data.steps.map(step => {
    const pending = transMap.get(step.id);
    if (!pending) return step;

    // Rebuild step object; insert _zh_tw key immediately after its base key
    const out = {};
    for (const [k, v] of Object.entries(step)) {
      out[k] = v;
      if (pending[k] !== undefined) {
        out[`${k}_zh_tw`] = pending[k];
      }
    }
    return out;
  });
}

// ── Process one lesson file ───────────────────────────────────────────────────
async function processFile(anthropic, name) {
  const filePath = join(DATA_DIR, `${name}.json`);
  let rawText;
  try {
    rawText = readFileSync(filePath, 'utf8');
  } catch {
    console.log(`  ✗ Not found: ${name}.json`);
    return { missing: 0, error: true };
  }

  const data    = JSON.parse(rawText);
  const missing = auditFile(data);

  if (missing.length === 0) {
    console.log(`  ✓ ${name}.json — no missing _zh_tw fields`);
    return { missing: 0 };
  }

  console.log(`  ✗ ${name}.json — ${missing.length} missing _zh_tw field(s)`);

  if (!SAVE) {
    // Dry-run: show a preview of the gaps
    const preview = missing.slice(0, 6);
    for (const m of preview) {
      const v = typeof m.value === 'object'
        ? JSON.stringify(m.value).slice(0, 70)
        : String(m.value).slice(0, 70);
      console.log(`      step ${m.stepId} [${m.type}] .${m.field}: "${v}"`);
    }
    if (missing.length > 6) console.log(`      … and ${missing.length - 6} more`);
    return { missing: missing.length };
  }

  // FILL mode: chunk → translate → write
  const allTranslations = [];
  const totalChunks = Math.ceil(missing.length / CHUNK_SIZE);

  for (let i = 0; i < missing.length; i += CHUNK_SIZE) {
    const chunk = missing.slice(i, i + CHUNK_SIZE);
    const chunkNum = Math.floor(i / CHUNK_SIZE) + 1;
    process.stdout.write(`    chunk ${chunkNum}/${totalChunks} (${chunk.length} items)… `);

    const results = await callClaude(anthropic, name, chunk);
    allTranslations.push(...results);
    process.stdout.write(`done (${results.length} translated)\n`);

    // Brief pause between chunks to be rate-limit friendly
    if (i + CHUNK_SIZE < missing.length) {
      await new Promise(r => setTimeout(r, 1200));
    }
  }

  applyAndReorder(data, allTranslations);
  writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log(`    ✓ Saved ${allTranslations.length} translations → ${filePath}`);
  return { missing: 0, filled: allTranslations.length };
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('Error: ANTHROPIC_API_KEY env var is not set');
    process.exit(1);
  }

  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  console.log('\n=== Korean School — zh-TW Lesson Audit/Filler ===');
  console.log(`Mode : ${SAVE ? 'FILL (--save)' : 'AUDIT (dry run)'}`);
  console.log(`Model: ${MODEL}\n`);

  const files = ONLY ? [ONLY] : LESSON_FILES;
  let totalMissing = 0;
  let errors       = 0;
  let totalFilled  = 0;

  for (const name of files) {
    const result = await processFile(anthropic, name);
    totalMissing += result.missing  || 0;
    totalFilled  += result.filled   || 0;
    if (result.error) errors++;
  }

  console.log('');

  if (errors) {
    console.log(`⚠  ${errors} file(s) not found — check the --file argument or lesson file names`);
  }

  if (SAVE) {
    console.log(`✓ Filled ${totalFilled} _zh_tw field(s) across ${files.length} file(s).`);
    console.log('  Run without --save to audit remaining gaps.');
  } else if (totalMissing === 0 && !errors) {
    console.log('✓ All lesson content is translated — zero missing _zh_tw fields.');
    process.exit(0);
  } else {
    console.log(`✗ ${totalMissing} missing _zh_tw field(s) across ${files.length} file(s).`);
    console.log('  Run with --save to fill them.');
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Fatal:', err.message || err);
  process.exit(1);
});
