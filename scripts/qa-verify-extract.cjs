#!/usr/bin/env node
/* ═══════════════════════════════════════════════════════════════════════
   qa-verify-extract.cjs — assemble everything written during the 2026-07-26
   translation pass for a blind back-translation check.

   Why: the frozen letter-writing/typing pass (qa-review.workflow.js) verified
   its output with blind back-translation plus a second native adjudicating
   the drift. The 2026-07-26 rounds did NOT — they were write-then-audit, and
   two batches (the 9 lesson_complete titles, the 98 French section titles)
   shipped with no second pass at all. So the newest ~1,150 strings on the
   site are also the least verified. This rebuilds them for that check.

   It reads the CURRENT value out of source rather than trusting what the
   workflows returned, so what gets verified is what actually shipped.

     node scripts/qa-verify-extract.cjs [--chunk 120]

   Writes scripts/_trans/verify/<lang>/chunk-NN.json:
     {ref, en, shipped}   ref = the unit id / dict key / file:step, so a
                          correction can be routed back through the right
                          --apply path (qa-lang.cjs or ui-lang.cjs).
═══════════════════════════════════════════════════════════════════════ */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const QA = path.join(ROOT, 'scripts', '_trans', 'qa', 'lang');
const UI = path.join(ROOT, 'scripts', '_trans', 'ui');
const OUT = path.join(ROOT, 'scripts', '_trans', 'verify');
const { dictOf } = require('./ui-lang.cjs');

const arg = (n, d) => { const i = process.argv.indexOf(n); return i > -1 && process.argv[i + 1] ? process.argv[i + 1] : d; };
const CHUNK = Math.max(1, parseInt(arg('--chunk', 120), 10) || 120);

const readJson = p => JSON.parse(fs.readFileSync(p, 'utf8'));
const exists = p => fs.existsSync(p);

const manifest = readJson(path.join(QA, 'manifest.json'));
const byId = new Map(manifest.map(u => [u.id, u]));

const rows = [];               // {lang, ref, kind, en, shipped}
const add = (lang, ref, kind, en, shipped) => {
  if (!en || !shipped || !String(shipped).trim()) return;
  if (String(shipped).trim() === String(en).trim()) return;   // deliberately identical (romanization, brand names)
  rows.push({ lang, ref, kind, en: String(en), shipped: String(shipped) });
};

/* 1. lesson-unit corrections — ja fill, th phrases, fr titles, vocab tips */
const unitFiles = [
  ['ja', 'corrections-ja.json'], ['th', 'corrections-th.json'], ['fr', 'corrections-fr.json'],
  ['de', 'corrections-tips-de.json'], ['fr', 'corrections-tips-fr.json'],
  ['vi', 'corrections-tips-vi.json'], ['th', 'corrections-tips-th.json'],
  ['id', 'corrections-tips-id.json'],
];
unitFiles.forEach(([lang, name]) => {
  const p = path.join(QA, name);
  if (!exists(p)) return;
  readJson(p).forEach(({ id }) => {
    const u = byId.get(id);
    if (!u) return;
    add(lang, id, 'unit', u.en, u.vals[lang]);
  });
});

/* 2. the 9 lesson_complete titles (invisible to the unit walker at the time) */
const titlesPath = path.join(QA, 'corrections-titles.json');
if (exists(titlesPath)) {
  readJson(titlesPath).forEach(({ file, step, lang }) => {
    const j = readJson(path.join(ROOT, 'learn', 'data', file + '.json'));
    const s = j.steps[step];
    if (!s) return;
    const code = lang.replace('_', '-');
    add(code, `${file}:${step}:title_${lang}`, 'complete-title', s.title, s['title_' + lang]);
  });
}

/* 3. UI language-pack strings — the dict key IS the English */
['th', 'id', 'zh-tw', 'ja'].forEach(code => {
  const p = path.join(UI, `corrections-${code}.json`);
  if (!exists(p)) return;
  const live = dictOf(code);
  readJson(p).forEach(({ key }) => add(code, key, 'ui', key, live[key]));
});

/* emit per language */
fs.mkdirSync(OUT, { recursive: true });
const byLang = {};
rows.forEach(r => (byLang[r.lang] = byLang[r.lang] || []).push(r));

let total = 0, agents = 0;
Object.keys(byLang).sort().forEach(lang => {
  const dir = path.join(OUT, lang);
  fs.mkdirSync(dir, { recursive: true });
  fs.readdirSync(dir).filter(n => /^chunk-\d+\.json$/.test(n)).forEach(n => fs.unlinkSync(path.join(dir, n)));
  fs.readdirSync(dir).filter(n => /^blind-\d+\.json$/.test(n)).forEach(n => fs.unlinkSync(path.join(dir, n)));
  const list = byLang[lang];
  let c = 0;
  for (let i = 0; i < list.length; i += CHUNK, c++) {
    const slice = list.slice(i, i + CHUNK);
    const n = String(c).padStart(2, '0');
    // full record — for the adjudicator, who is allowed to see the source
    fs.writeFileSync(path.join(dir, `chunk-${n}.json`),
      JSON.stringify({ lang, chunk: c, count: slice.length, units: slice }, null, 2) + '\n');
    /* blind copy — the back-translator must never see `en`, or it will
       reproduce the source instead of reporting what the shipped string
       actually says, and the whole check becomes circular. */
    fs.writeFileSync(path.join(dir, `blind-${n}.json`),
      JSON.stringify({ lang, chunk: c, count: slice.length,
        units: slice.map(r => ({ ref: r.ref, text: r.shipped })) }, null, 2) + '\n');
  }
  total += list.length; agents += c;
  const kinds = list.reduce((a, r) => { a[r.kind] = (a[r.kind] || 0) + 1; return a; }, {});
  console.log(`  ${lang.padEnd(6)} ${String(list.length).padStart(4)} strings → ${c} chunk(s)   ${JSON.stringify(kinds)}`);
});
console.log(`\n${total} strings to verify across ${Object.keys(byLang).length} languages, ${agents} chunk(s).`);
console.log(`Wrote → ${path.relative(ROOT, OUT)}`);
