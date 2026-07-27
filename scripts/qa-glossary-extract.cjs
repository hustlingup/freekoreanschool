#!/usr/bin/env node
/**
 * qa-glossary-extract.cjs — gather every lesson string that teaches a Korean
 * grammar/phonology term, so a native can agree ONE rendering per concept and
 * find the places that disagree with it.
 *
 *   node scripts/qa-glossary-extract.cjs [--chunk 90]
 *
 * The 2026-07-26 triage caught one instance: Thai transliterated 받침 as
 * บัดชิม instead of using the established linguistic term ตัวสะกด. Probing the
 * corpus showed the class is much wider — for "batchim" alone, standalone
 * alternates appear in every locale, and German uses two different native
 * synonyms for it (Endkonsonant AND Schlusskonsonant).
 *
 * ⚠️ MIXED RENDERINGS ARE NOT AUTOMATICALLY WRONG. Introducing the Korean
 * term and glossing it once — "batchim (consonante final)" — is correct
 * teaching, not inconsistency. A count of raw occurrences says every locale
 * is inconsistent and is useless. What matters is a competing rendering used
 * STANDALONE, where the canonical term appears nowhere in the same string,
 * and only a native can rule on whether that is a genuine defect or ordinary
 * descriptive prose. So this script gathers evidence; it does not judge.
 *
 * Writes scripts/_trans/glossary/<lang>/chunk-NN.json
 *   {id, term, en, value}
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const QA = path.join(ROOT, 'scripts', '_trans', 'qa', 'lang');
const OUT = path.join(ROOT, 'scripts', '_trans', 'glossary');
const LOCALES = ['ja', 'zh-tw', 'es', 'de', 'fr', 'vi', 'th', 'id'];

const arg = (n, d) => { const i = process.argv.indexOf(n); return i > -1 && process.argv[i + 1] ? process.argv[i + 1] : d; };
const CHUNK = Math.max(1, parseInt(arg('--chunk', 90), 10) || 90);

/* The teaching vocabulary a learner meets repeatedly. Each must have exactly
   one rendering per locale or the course contradicts itself. */
const TERMS = {
  batchim: /\bbatchim\b|\bfinal consonant\b/i,
  'syllable block': /\bsyllable block\b/i,
  particle: /\bparticle\b/i,
  'verb stem': /\bverb stem\b/i,
  'dictionary form': /\bdictionary form\b/i,
  'speech level': /\bhonorific\b|\bspeech level\b|\bpolite form\b/i,
  counter: /\bcounter\b|\bclassifier\b/i,
  liaison: /\bliaison\b/i,
  aspirated: /\baspirated\b/i,
  'tense consonant': /\btense consonant\b|\bdouble consonant\b/i,
};

const manifest = JSON.parse(fs.readFileSync(path.join(QA, 'manifest.json'), 'utf8'));

/* one row per (unit, term) pair, deduped so a unit naming two terms appears once */
const rows = [];
manifest.forEach(u => {
  const en = String(u.en || '');
  const hit = Object.keys(TERMS).filter(t => TERMS[t].test(en));
  if (!hit.length) return;
  rows.push({ id: u.id, terms: hit, en });
});

console.log(`${rows.length} units teach at least one of the ${Object.keys(TERMS).length} tracked terms.`);
const perTerm = {};
rows.forEach(r => r.terms.forEach(t => perTerm[t] = (perTerm[t] || 0) + 1));
Object.entries(perTerm).sort((a, b) => b[1] - a[1])
  .forEach(([t, n]) => console.log(`   ${t.padEnd(18)}${String(n).padStart(4)}`));

fs.mkdirSync(OUT, { recursive: true });
LOCALES.forEach(loc => {
  const byId = new Map(manifest.map(u => [u.id, u]));
  const list = rows.map(r => ({
    id: r.id, term: r.terms.join('|'), en: r.en,
    value: String((byId.get(r.id).vals || {})[loc] || ''),
  })).filter(r => r.value.trim());
  const dir = path.join(OUT, loc);
  fs.mkdirSync(dir, { recursive: true });
  fs.readdirSync(dir).filter(n => /^chunk-\d+\.json$/.test(n)).forEach(n => fs.unlinkSync(path.join(dir, n)));
  let c = 0;
  for (let i = 0; i < list.length; i += CHUNK, c++) {
    fs.writeFileSync(path.join(dir, `chunk-${String(c).padStart(2, '0')}.json`),
      JSON.stringify({ lang: loc, chunk: c, count: Math.min(CHUNK, list.length - i), units: list.slice(i, i + CHUNK) }, null, 2) + '\n');
  }
  console.log(`  ${loc.padEnd(6)} ${String(list.length).padStart(4)} units → ${c} chunk(s)`);
});
console.log(`\nWrote → ${path.relative(ROOT, OUT)}`);
