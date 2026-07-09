/**
 * Korean School — Generalized Lesson Audit & Filler
 *
 * AUDIT mode (default): scans the 9 lesson JSON files for missing _<suffix> fields
 * and prints a per-file coverage report. Exits non-zero if any gaps remain.
 *
 * FILL mode (--save): calls Claude to translate each missing field and writes
 * the result back into the JSON file, inserting _<suffix> keys immediately after
 * their English siblings. Idempotent — existing fields are skipped.
 *
 * Usage:
 *   node scripts/translate-lessons.mjs --lang es                   -- audit all 9 files
 *   node scripts/translate-lessons.mjs --lang es --save            -- fill missing fields
 *   node scripts/translate-lessons.mjs --lang es --file hangul     -- scope to one file
 *   node scripts/translate-lessons.mjs --lang es --file hangul --save
 *
 *   node scripts/translate-lessons.mjs --lang zh-tw                -- audit zh-TW
 *   node scripts/translate-lessons.mjs --lang ja                   -- audit Japanese
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

loadEnv({ path: join(__dirname, '.env') });
const DATA_DIR   = join(__dirname, '..', 'learn', 'data');
const MODEL      = 'claude-sonnet-4-6';
const CHUNK_SIZE = 40;

const LESSON_FILES = [
  'hangul', 'syllable-blocks', 'pronunciation', 'grammar',
  'nouns', 'pronouns', 'shopping', 'emotions', 'speech-levels',
];

// ── Per-language config ───────────────────────────────────────────────────────
const LANG_CONFIG = {
  es: {
    suffix:              'es',
    languageName:        'Spanish',
    pronunciationSystem: 'Latin romanization (same as English — no change needed)',
    specialInstructions: `
- Write in natural Latin American Spanish (neutral, universally understood)
- Keep Korean terms as-is (한글, 받침, 조사, 이/가, 은/는, etc.) when the source uses them
- Preserve {placeholders}, emoji, and \\n line breaks exactly
- For match_quiz "choices" that are romanization tokens (e.g. "g/k", "b/p"): leave as-is
- For match_quiz "choices" that are English answer words: translate to natural Spanish
- "hint" and "example_meaning" in card_reveal: translate to learner-friendly Spanish
- Do not translate brand/proper names: K-Pop, K-Beauty, K-Drama, KTX, Hangul, TOPIK
- Korean romanization stays unchanged — no Spanish-phonetics substitution
`,
    systemPrompt: null, // built below
  },

  'zh-tw': {
    suffix:              'zh_tw',
    languageName:        'Traditional Chinese (Taiwan)',
    pronunciationSystem: 'Zhuyin (注音) for reading aids',
    specialInstructions: `
- Write in natural Taiwan Traditional Chinese — never Simplified
- Keep Korean terms as-is when the source uses them
- Preserve {placeholders}, emoji, and \\n exactly
- For romanization match_quiz choices: convert to Zhuyin where contextually appropriate
- Taiwan-standard vocabulary: 計程車 (taxi), 公車 (bus), 便利商店, 地鐵 for Seoul subway
`,
    systemPrompt: null,
  },

  fr: {
    suffix:              'fr',
    languageName:        'French',
    pronunciationSystem: 'Latin romanization (same as English — no change needed)',
    specialInstructions: `
- Write in natural French (standard European French, neutral and clear)
- Keep Korean terms as-is (한글, 받침, 조사, 이/가, 은/는, etc.) when the source uses them
- Preserve {placeholders}, emoji, and \\n line breaks exactly
- For match_quiz "choices" that are romanization tokens (e.g. "g/k", "b/p"): leave as-is
- For match_quiz "choices" that are English answer words: translate to natural French
- "hint" and "example_meaning" in card_reveal: translate to learner-friendly French
- Do not translate brand/proper names: K-Pop, K-Beauty, K-Drama, KTX, Hangul, TOPIK
- Korean romanization stays unchanged — no French-phonetics substitution
- Use gender-neutral phrasing where possible; when gender is needed prefer masculine as default
`,
    systemPrompt: null,
  },

  de: {
    suffix:              'de',
    languageName:        'German',
    pronunciationSystem: 'Latin romanization (same as English — no change needed)',
    specialInstructions: `
- Write in natural Standard German (Hochdeutsch), clear and accessible
- Keep Korean terms as-is (한글, 받침, 조사, 이/가, 은/는, etc.) when the source uses them
- Preserve {placeholders}, emoji, and \\n line breaks exactly
- For match_quiz "choices" that are romanization tokens (e.g. "g/k", "b/p"): leave as-is
- For match_quiz "choices" that are English answer words: translate to natural German
- "hint" and "example_meaning" in card_reveal: translate to learner-friendly German
- Do not translate brand/proper names: K-Pop, K-Beauty, K-Drama, KTX, Hangul, TOPIK
- Korean romanization stays unchanged — no German-phonetics substitution
- Use informal "du" form consistently (target audience is language learners, informal tone is appropriate)
`,
    systemPrompt: null,
  },

  th: {
    suffix:              'th',
    languageName:        'Thai',
    pronunciationSystem: 'Thai script phonetics (no romanization needed)',
    specialInstructions: `
- Write in natural, modern Thai (Central Thai), clear and accessible for adult learners
- Keep Korean terms as-is (ฮันกึล, 받침, 조사, 이/가, 은/는, etc.) when the source uses them
- Preserve {placeholders}, emoji, and \\n line breaks exactly
- For match_quiz "choices" that are romanization tokens (e.g. "g/k", "b/p"): leave as-is
- For match_quiz "choices" that are Korean characters (ㄱ ㄴ ㅇ etc.): leave as-is
- For match_quiz "choices" that are English answer words: translate to natural Thai
- "hint" and "example_meaning" in card_reveal: translate to learner-friendly Thai
- Do not translate brand/proper names: K-Pop, K-Beauty, K-Drama, KTX, Hangul, TOPIK
- Korean romanization stays unchanged — no Thai-phonetics substitution
- Use polite but approachable Thai (ครับ/ค่ะ level implied, not overly formal)
`,
    systemPrompt: null,
  },

  vi: {
    suffix:              'vi',
    languageName:        'Vietnamese',
    pronunciationSystem: 'Latin romanization (same as English — no change needed)',
    specialInstructions: `
- Write in natural, modern Vietnamese, clear and accessible for adult learners
- Keep Korean terms as-is (Hangul, 받침, 조사, 이/가, 은/는, etc.) when the source uses them
- Preserve {placeholders}, emoji, and \\n line breaks exactly
- For match_quiz "choices" that are romanization tokens (e.g. "g/k", "b/p"): leave as-is
- For match_quiz "choices" that are Korean characters (ㄱ ㄴ ㅇ etc.): leave as-is
- For match_quiz "choices" that are English answer words: translate to natural Vietnamese
- "hint" and "example_meaning" in card_reveal: translate to learner-friendly Vietnamese
- Do not translate brand/proper names: K-Pop, K-Beauty, K-Drama, KTX, Hangul, TOPIK
- Korean romanization stays unchanged — no Vietnamese-phonetics substitution
- Use friendly neutral "bạn" register (target audience is language learners)
`,
    systemPrompt: null,
  },

  ja: {
    suffix:              'ja',
    languageName:        'Japanese',
    pronunciationSystem: 'Katakana for reading aids',
    specialInstructions: `
- Write in natural Japanese
- Keep Korean terms as-is when the source uses them
- Preserve {placeholders}, emoji, and \\n exactly
- For card_reveal reading aids: provide katakana pronunciation
`,
    systemPrompt: null,
  },

  id: {
    suffix:              'id',
    languageName:        'Indonesian',
    pronunciationSystem: 'Latin romanization (same as English — no change needed)',
    specialInstructions: `
- Write in natural Bahasa Indonesia (standard, neutral, accessible)
- Keep Korean terms as-is (한글, 받침, 조사, 이/가, 은/는, etc.) when the source uses them
- Preserve {placeholders}, emoji, and \\n line breaks exactly
- For match_quiz "choices" that are romanization tokens (e.g. "g/k", "b/p"): leave as-is
- For match_quiz "choices" that are English answer words: translate to natural Indonesian
- "hint" and "example_meaning" in card_reveal: translate to learner-friendly Indonesian
- Do not translate brand/proper names: K-Pop, K-Beauty, K-Drama, KTX, Hangul, TOPIK
- Korean romanization stays unchanged — no Indonesian-phonetics substitution
`,
    systemPrompt: null,
  },
};

// ── CLI args ──────────────────────────────────────────────────────────────────
const args    = process.argv.slice(2);
const SAVE    = args.includes('--save');
const langIdx = args.indexOf('--lang');
const LANG    = langIdx !== -1 ? args[langIdx + 1] : null;
const fileIdx = args.indexOf('--file');
const ONLY    = fileIdx !== -1 ? args[fileIdx + 1] : null;

if (!LANG || !LANG_CONFIG[LANG]) {
  console.error(`Error: --lang <code> is required. Available: ${Object.keys(LANG_CONFIG).join(', ')}`);
  process.exit(1);
}

const cfg = LANG_CONFIG[LANG];
const SUFFIX = `_${cfg.suffix}`;

// Build system prompt from config
cfg.systemPrompt = `\
You are a ${cfg.languageName} translator for a Korean language learning website.
Pronunciation system for this language: ${cfg.pronunciationSystem}.

Rules:${cfg.specialInstructions}
- Return ONLY a valid JSON array — no markdown fences, no extra explanation
`;

// ── Field map: step type → translatable fields ────────────────────────────────
const TRANSLATABLE = {
  reading_card:     [
    { field: 'title',          shape: 'string'   },
    { field: 'body',           shape: 'string'   },
    { field: 'rules',          shape: 'string[]' },
    { field: 'tip',            shape: 'object'   },
    { field: 'patterns_label', shape: 'string[]' },
  ],
  match_quiz:       [
    { field: 'prompt',   shape: 'string'   },
    { field: 'choices',  shape: 'string[]' },
  ],
  card_reveal:      [
    { field: 'example_meaning', shape: 'string' },
    { field: 'hint',            shape: 'string' },
  ],
  syllable_builder: [{ field: 'meaning', shape: 'string' }],
  listen_repeat:    [{ field: 'meaning', shape: 'string' }],
  lesson_complete:  [{ field: 'message', shape: 'string' }],
};

// Also translate stage names
const STAGE_FIELD = 'name';

// ── Audit one file ────────────────────────────────────────────────────────────
function auditFile(data) {
  const missing = [];

  // Stage names
  for (const stage of (data.stages || [])) {
    if (stage[STAGE_FIELD] != null && stage[`${STAGE_FIELD}${SUFFIX}`] == null) {
      missing.push({ stepId: `stage_${stage.id}`, type: 'stage', field: STAGE_FIELD, shape: 'string', value: stage[STAGE_FIELD] });
    }
  }

  for (const step of data.steps) {
    const fields = TRANSLATABLE[step.type];
    if (!fields) continue;
    for (const { field, shape } of fields) {
      if (step[field] == null) continue;
      if (step[`${field}${SUFFIX}`] == null) {
        missing.push({ stepId: step.id, type: step.type, field, shape, value: step[field] });
      }
    }
  }
  return missing;
}

// ── Call Claude ───────────────────────────────────────────────────────────────
async function callClaude(anthropic, lessonName, chunk) {
  const payload = chunk.map(m => ({
    stepId: m.stepId,
    field:  m.field,
    shape:  m.shape,
    value:  m.value,
  }));

  const userPrompt = `\
Translate the following Korean lesson content fields to ${cfg.languageName}.
Lesson: "${lessonName}".

For each item return the translated "value" matching the same shape:
- shape "string"   → return a string
- shape "string[]" → return an array of strings (same count)
- shape "object"   → return an object with exactly { "label": "...", "text": "..." }

Input JSON array:
${JSON.stringify(payload, null, 2)}

Return a JSON array of the same length:
[{ "stepId": <id>, "field": "<field_name>", "translated": <value> }, ...]`;

  const msg = await anthropic.messages.create({
    model:      MODEL,
    max_tokens: 8096,
    system:     cfg.systemPrompt,
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

// ── Apply translations ────────────────────────────────────────────────────────
function applyAndReorder(data, translations) {
  const transMap = new Map();
  for (const { stepId, field, translated } of translations) {
    if (!transMap.has(stepId)) transMap.set(stepId, {});
    transMap.get(stepId)[field] = translated;
  }

  // Apply to stages
  data.stages = (data.stages || []).map(stage => {
    const pending = transMap.get(`stage_${stage.id}`);
    if (!pending) return stage;
    const out = {};
    for (const [k, v] of Object.entries(stage)) {
      out[k] = v;
      if (pending[k] !== undefined) out[`${k}${SUFFIX}`] = pending[k];
    }
    return out;
  });

  // Apply to steps
  data.steps = data.steps.map(step => {
    const pending = transMap.get(step.id);
    if (!pending) return step;
    const out = {};
    for (const [k, v] of Object.entries(step)) {
      out[k] = v;
      if (pending[k] !== undefined) out[`${k}${SUFFIX}`] = pending[k];
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
    console.log(`  ✓ ${name}.json — no missing ${SUFFIX} fields`);
    return { missing: 0 };
  }

  console.log(`  ✗ ${name}.json — ${missing.length} missing ${SUFFIX} field(s)`);

  if (!SAVE) {
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

  const allTranslations = [];
  const totalChunks = Math.ceil(missing.length / CHUNK_SIZE);

  for (let i = 0; i < missing.length; i += CHUNK_SIZE) {
    const chunk = missing.slice(i, i + CHUNK_SIZE);
    const chunkNum = Math.floor(i / CHUNK_SIZE) + 1;
    process.stdout.write(`    chunk ${chunkNum}/${totalChunks} (${chunk.length} items)… `);

    const results = await callClaude(anthropic, name, chunk);
    allTranslations.push(...results);
    process.stdout.write(`done (${results.length} translated)\n`);

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

  console.log(`\n=== Korean School — ${cfg.languageName} Lesson Audit/Filler ===`);
  console.log(`Mode  : ${SAVE ? 'FILL (--save)' : 'AUDIT (dry run)'}`);
  console.log(`Lang  : ${LANG} (suffix: ${SUFFIX})`);
  console.log(`Model : ${MODEL}\n`);

  const files = ONLY ? [ONLY] : LESSON_FILES;
  let totalMissing = 0;
  let errors       = 0;
  let totalFilled  = 0;

  for (const name of files) {
    const result = await processFile(anthropic, name);
    totalMissing += result.missing || 0;
    totalFilled  += result.filled  || 0;
    if (result.error) errors++;
  }

  console.log('');
  if (errors) console.log(`⚠  ${errors} file(s) not found`);

  if (SAVE) {
    console.log(`✓ Filled ${totalFilled} ${SUFFIX} field(s) across ${files.length} file(s).`);
    console.log('  Run without --save to audit remaining gaps.');
  } else if (totalMissing === 0 && !errors) {
    console.log(`✓ All ${SUFFIX} lesson content is translated — zero gaps.`);
    process.exit(0);
  } else {
    console.log(`✗ ${totalMissing} missing ${SUFFIX} field(s) across ${files.length} file(s).`);
    console.log('  Run with --save to fill them.');
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Fatal:', err.message || err);
  process.exit(1);
});
