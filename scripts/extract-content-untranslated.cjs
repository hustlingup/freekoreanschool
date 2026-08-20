#!/usr/bin/env node
/**
 * extract-content-untranslated.cjs — pull the prose nodes that are still
 * verbatim English out of culture/<locale>/ and travel/<locale>/, and group
 * them by the English string.
 *
 *   node scripts/extract-content-untranslated.cjs [--chunk 45]
 *   node scripts/extract-content-untranslated.cjs --locales pt-br [--no-floor]
 *
 * Measured by audit-content-locale-dup.cjs: 11,009 characters across 55 of
 * the 160 pages, in all 8 locales. Most of it is the SAME paragraph left
 * English everywhere (every locale's ksports.html shows ~410 chars), so
 * grouping by string turns what looks like 55 page-problems into a much
 * smaller set of strings that each need N translations.
 *
 * Uses the same exclusion rules as audit-content-locale-dup.cjs — romanization
 * classes, locale-swap pairs, Korean-bearing nodes — because a node that is
 * SUPPOSED to be identical across locales is not untranslated. Those rules
 * live in _locale-prose.cjs and are NOT touched here (CLAUDE.md: change them
 * only there, or the audit/extractor/patcher trio disagrees with itself).
 *
 * --locales <codes>   scope to specific locale(s) instead of the default
 *                      live 8 (registry-driven — scripts/_locales.cjs). This
 *                      is the fresh-locale path: pass a 'planned' code, and
 *                      if its directories do not exist yet this prints an
 *                      explicit NOT PRESENT notice instead of the misleading
 *                      "0 distinct English strings" a silent empty sweep
 *                      would otherwise produce (which reads as "nothing to
 *                      translate" when the truth is "nothing was scanned").
 * --no-floor          drop the >=30-char SENTENCE_MIN floor from
 *                      _locale-prose.cjs so short labels/table cells are
 *                      also extracted. The floor's VALUE in _locale-prose.cjs
 *                      is unchanged — this only decides whether THIS run
 *                      applies it. Existing mop-up default behaviour
 *                      (no flags) is unchanged: floor still applies.
 *
 * Writes scripts/_trans/content/<lang>/chunk-NN.json  {ref, en}
 *   ref = "<section>/<locale>/<file>#<nodeIndex>" — but the patcher matches on
 *   the exact English text within that file, so ref is for reporting only.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'scripts', '_trans', 'content');
const SECTIONS = ['culture', 'travel'];
const REG = require('./_locales.cjs');
const { HANGUL, SENTENCE_MIN, proseNodes } = require('./_locale-prose.cjs');

const arg = (n, d) => { const i = process.argv.indexOf(n); return i > -1 && process.argv[i + 1] ? process.argv[i + 1] : d; };
const CHUNK = Math.max(1, parseInt(arg('--chunk', 45), 10) || 45);
const NO_FLOOR = process.argv.includes('--no-floor');
const FLOOR = NO_FLOOR ? 0 : SENTENCE_MIN;

const LOCALES = (() => {
  const spec = arg('--locales', null);
  if (!spec) return REG.liveDirs();
  const list = spec.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
  list.forEach(c => { if (!REG.get(c) || c === 'en') throw new Error(`unknown locale "${c}" — not in scripts/_locales.cjs`); });
  return list;
})();

/* english string -> Set(locale) that still shows it */
const need = new Map();
let pageHits = 0;
const seenLocales = new Set();
const missingLocales = new Set();

for (const section of SECTIONS) {
  for (const loc of LOCALES) {
    const dir = path.join(ROOT, section, loc);
    if (!fs.existsSync(dir)) { missingLocales.add(loc); continue; }
    seenLocales.add(loc);
    for (const f of fs.readdirSync(dir).filter(x => x.endsWith('.html'))) {
      const srcPath = path.join(ROOT, section, f);
      if (!fs.existsSync(srcPath)) continue;
      const en = new Set(proseNodes(fs.readFileSync(srcPath, 'utf8')));
      const nodes = proseNodes(fs.readFileSync(path.join(dir, f), 'utf8'));
      let hit = false;
      for (const t of nodes) {
        if (t.length < FLOOR || !en.has(t)) continue;
        hit = true;
        const key = t;
        if (!need.has(key)) need.set(key, { en: t, pages: new Set(), locales: new Set() });
        need.get(key).pages.add(`${section}/${loc}/${f}`);
        need.get(key).locales.add(loc);
      }
      if (hit) pageHits++;
    }
  }
}

// A requested locale that is not on disk in EITHER section produced zero
// hits above for a reason that has nothing to do with translation quality —
// it was never scanned. Reported loudly and BEFORE the summary line, so it
// cannot be misread as "0 distinct English strings = nothing to do".
const trulyMissing = [...missingLocales].filter(l => !seenLocales.has(l));
if (trulyMissing.length) {
  console.log(`${trulyMissing.length} locale(s) NOT PRESENT on disk — 0% scanned, NOT "0 strings need translation": ${trulyMissing.join(', ')}`);
  const scanned = LOCALES.filter(l => !trulyMissing.includes(l));
  console.log(scanned.length
    ? `Continuing with the ${scanned.length} locale(s) actually present: ${scanned.join(', ')}.\n`
    : `No requested locale has culture/<loc>/ or travel/<loc>/ on disk — nothing to scan. Run gen-content-mirrors.cjs for that locale first (00-plan.md stage 3), then re-run this extractor.\n`);
}

const all = [...need.values()];
console.log(`${all.length} distinct English strings still shown, across ${pageHits} page(s)` +
  (NO_FLOOR ? ' (--no-floor: no length minimum applied)' : ` (>=${FLOOR} chars)`) + '.');
const spread = all.reduce((a, r) => { const n = r.locales.size; a[n] = (a[n] || 0) + 1; return a; }, {});
console.log('strings by how many locales still show them:');
Object.keys(spread).sort((a, b) => b - a).forEach(n => console.log(`   ${n} locale(s): ${spread[n]} string(s)`));

/* emit per locale: what that locale needs translated */
fs.mkdirSync(OUT, { recursive: true });
let totalJobs = 0, chunks = 0;
LOCALES.forEach(loc => {
  const list = all.filter(r => r.locales.has(loc))
    .map(r => ({ ref: [...r.pages].filter(p => p.includes(`/${loc}/`))[0], en: r.en }));
  if (!list.length) return;
  const dir = path.join(OUT, loc);
  fs.mkdirSync(dir, { recursive: true });
  fs.readdirSync(dir).filter(n => /^chunk-\d+\.json$/.test(n)).forEach(n => fs.unlinkSync(path.join(dir, n)));
  let c = 0;
  for (let i = 0; i < list.length; i += CHUNK, c++) {
    fs.writeFileSync(path.join(dir, `chunk-${String(c).padStart(2, '0')}.json`),
      JSON.stringify({ lang: loc, chunk: c, count: Math.min(CHUNK, list.length - i), units: list.slice(i, i + CHUNK) }, null, 2) + '\n');
  }
  totalJobs += list.length; chunks += c;
  console.log(`  ${loc.padEnd(6)} ${String(list.length).padStart(4)} strings → ${c} chunk(s)`);
});
console.log(`\n${totalJobs} translation jobs across ${chunks} chunk(s) → ${path.relative(ROOT, OUT)}`);
