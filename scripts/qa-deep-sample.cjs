#!/usr/bin/env node
/**
 * qa-deep-sample.cjs — a second, deeper quality sample of lesson units.
 *
 *   node scripts/qa-deep-sample.cjs [--rate 0.05] [--chunk 55]
 *
 * The Phase-A triage sampled 68 units per language (0.5%). Everything since
 * has been targeted: gap fills, the Thai phrases pass, the French title sweep,
 * the glossary. Measured against the manifest, 1,800–1,900 units per locale
 * have still never been looked at by anything — roughly 14,800 localized
 * strings. Coverage is 100%; quality is largely unmeasured.
 *
 * DESIGN NOTES
 *
 * The sample is SHARED across locales — the same unit ids are reviewed in all
 * eight. That costs nothing and buys the most useful signal in the whole
 * exercise: if seven or eight locales all flag the same unit, the defect is
 * almost certainly in the ENGLISH SOURCE, not in the translations. A
 * per-locale random sample can never show that.
 *
 * It EXCLUDES the triage's 68 ids, which are the only units already reviewed
 * in every locale. It does not exclude units fixed in one locale, because a
 * unit corrected in Japanese is still unreviewed in the other seven.
 *
 * Stratified by content group and stride-based within each group (no RNG), so
 * a re-run reproduces the same sample and results stay comparable. Groups are
 * sampled proportionally to their size, with a floor so small groups are not
 * rounded out of existence.
 *
 * Long units are sampled at a higher rate than short ones: a wrong single-word
 * gloss is one wrong word, but a wrong paragraph misteaches a rule. The stride
 * runs over units sorted by length, so each group's sample spans the range
 * rather than clustering.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const QA = path.join(ROOT, 'scripts', '_trans', 'qa', 'lang');
const OUT = path.join(ROOT, 'scripts', '_trans', 'deep');
const LOCALES = ['ja', 'zh-tw', 'es', 'de', 'fr', 'vi', 'th', 'id'];
const { groupOf } = require('./qa-lang.cjs');

const arg = (n, d) => { const i = process.argv.indexOf(n); return i > -1 && process.argv[i + 1] ? process.argv[i + 1] : d; };
const RATE = Math.min(1, Math.max(0.001, parseFloat(arg('--rate', 0.05)) || 0.05));
const CHUNK = Math.max(1, parseInt(arg('--chunk', 55), 10) || 55);
const MIN_PER_GROUP = 6;

const manifest = JSON.parse(fs.readFileSync(path.join(QA, 'manifest.json'), 'utf8'));

/* the triage's 68 ids — already reviewed in every locale */
let triageIds = new Set();
try {
  const t = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts', '_trans', 'qa', 'triage', 'ja.json'), 'utf8'));
  triageIds = new Set(Object.values(t.groups).flat().map(u => u.id));
} catch { /* triage sample absent — sample the whole corpus */ }

/* candidates: translated in every locale, not already triaged */
const candidates = manifest.filter(u =>
  !triageIds.has(u.id) && LOCALES.every(l => String(u.vals[l] || '').trim()));

const byGroup = {};
candidates.forEach(u => (byGroup[groupOf(u.loc.file)] = byGroup[groupOf(u.loc.file)] || []).push(u));

function stride(arr, n) {
  if (arr.length <= n) return arr.slice();
  const step = arr.length / n, out = [];
  for (let i = 0; i < n; i++) out.push(arr[Math.floor(i * step)]);
  return out;
}

const picked = [];
Object.keys(byGroup).sort().forEach(g => {
  const list = byGroup[g].slice().sort((a, b) => String(a.en).length - String(b.en).length);
  const n = Math.max(MIN_PER_GROUP, Math.round(list.length * RATE));
  const s = stride(list, n);
  picked.push(...s);
  console.log(`  ${g.padEnd(16)} ${String(list.length).padStart(4)} candidates → ${String(s.length).padStart(3)} sampled`);
});

console.log(`\n${picked.length} units sampled (${(100 * picked.length / candidates.length).toFixed(1)}% of ${candidates.length} never-triaged units)`);
console.log(`reviewed in all ${LOCALES.length} locales → ${picked.length * LOCALES.length} string reviews`);

fs.mkdirSync(OUT, { recursive: true });
LOCALES.forEach(loc => {
  const dir = path.join(OUT, loc);
  fs.mkdirSync(dir, { recursive: true });
  fs.readdirSync(dir).filter(n => /^chunk-\d+\.json$/.test(n)).forEach(n => fs.unlinkSync(path.join(dir, n)));
  const units = picked.map(u => ({
    id: u.id, path: u.path, ko: u.ko, en: u.en, value: String(u.vals[loc] || ''),
  }));
  let c = 0;
  for (let i = 0; i < units.length; i += CHUNK, c++) {
    fs.writeFileSync(path.join(dir, `chunk-${String(c).padStart(2, '0')}.json`),
      JSON.stringify({ lang: loc, chunk: c, count: Math.min(CHUNK, units.length - i), units: units.slice(i, i + CHUNK) }, null, 2) + '\n');
  }
  console.log(`  ${loc.padEnd(6)} ${units.length} units → ${c} chunk(s)`);
});
console.log(`\nWrote → ${path.relative(ROOT, OUT)}`);
