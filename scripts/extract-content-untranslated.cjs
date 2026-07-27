#!/usr/bin/env node
/**
 * extract-content-untranslated.cjs — pull the sentence-length prose nodes that
 * are still verbatim English out of culture/<locale>/ and travel/<locale>/,
 * and group them by the English string.
 *
 *   node scripts/extract-content-untranslated.cjs [--chunk 45]
 *
 * Measured by audit-content-locale-dup.cjs: 11,009 characters across 55 of
 * the 160 pages, in all 8 locales. Most of it is the SAME paragraph left
 * English everywhere (every locale's ksports.html shows ~410 chars), so
 * grouping by string turns what looks like 55 page-problems into a much
 * smaller set of strings that each need N translations.
 *
 * Uses the same exclusion rules as audit-content-locale-dup.cjs — romanization
 * classes, locale-swap pairs, Korean-bearing nodes — because a node that is
 * SUPPOSED to be identical across locales is not untranslated.
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
const LOCALES = ['ja', 'zh-tw', 'es', 'de', 'fr', 'vi', 'th', 'id'];
const { HANGUL, SENTENCE_MIN, proseNodes } = require('./_locale-prose.cjs');

const arg = (n, d) => { const i = process.argv.indexOf(n); return i > -1 && process.argv[i + 1] ? process.argv[i + 1] : d; };
const CHUNK = Math.max(1, parseInt(arg('--chunk', 45), 10) || 45);

/* english string -> Set(locale) that still shows it */
const need = new Map();
let pageHits = 0;

for (const section of SECTIONS) {
  for (const loc of LOCALES) {
    const dir = path.join(ROOT, section, loc);
    if (!fs.existsSync(dir)) continue;
    for (const f of fs.readdirSync(dir).filter(x => x.endsWith('.html'))) {
      const srcPath = path.join(ROOT, section, f);
      if (!fs.existsSync(srcPath)) continue;
      const en = new Set(proseNodes(fs.readFileSync(srcPath, 'utf8')));
      const nodes = proseNodes(fs.readFileSync(path.join(dir, f), 'utf8'));
      let hit = false;
      for (const t of nodes) {
        if (t.length < SENTENCE_MIN || !en.has(t)) continue;
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

const all = [...need.values()];
console.log(`${all.length} distinct English strings still shown, across ${pageHits} page(s).`);
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
