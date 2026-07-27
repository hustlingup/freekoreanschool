#!/usr/bin/env node
/* ═══════════════════════════════════════════════════════════════════════
   patch-typing-locale-gaps.cjs — backfill the 8 locale siblings for
   key_intro.title / .instruction and typing_drill.title / .instruction in
   learn/data/typing.json.

     node scripts/patch-typing-locale-gaps.cjs           # apply
     node scripts/patch-typing-locale-gaps.cjs --check   # verify, exit 1 on gaps

   Idempotent, and it NEVER overwrites a value that is already there — same
   contract as patch-vocab-ja-zhtw.cjs / patch-lesson-ja-gaps.cjs.

   WHY THIS EXISTED. These 50 fields had no `_<lang>` sibling in ANY locale.
   qa-lang.cjs decides a field is localizable by looking for at least one
   locale sibling, so a field missing in every language is invisible to it —
   `--status --lessons typing` reported 0 gaps while all 8 locales rendered
   English. It is not only a search problem: step-runner's loc() falls back to
   the English string, and that string is truthy, so it wins over the
   localized generic title renderKeyIntro()/renderTypingDrill() would
   otherwise generate. A Thai reader saw "ㅁ and ㄴ — the left home row".

   Translations live in scripts/_trans/learn/typing.locale-gaps.json, which
   carries the English source alongside each translation so a future edit to
   the English is visible as a mismatch rather than silently diverging.

   GUARD: every jamo in the English instruction must survive into every
   translation. The instructions are the one place a keyboard lesson can go
   wrong invisibly — a dropped or swapped jamo teaches the wrong key, and no
   prose audit in this repo can see it.
═══════════════════════════════════════════════════════════════════════ */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DATA = path.join(ROOT, 'learn', 'data', 'typing.json');
const TABLE = path.join(__dirname, '_trans', 'learn', 'typing.locale-gaps.json');
const LANGS = ['ja', 'zh_tw', 'es', 'fr', 'de', 'vi', 'th', 'id'];
const FIELDS = ['title', 'instruction'];
const CHECK = process.argv.includes('--check');

const data = JSON.parse(fs.readFileSync(DATA, 'utf8'));
const table = JSON.parse(fs.readFileSync(TABLE, 'utf8'));

const JAMO = /[ㄱ-ㆎ]/g;
const problems = [];
let added = 0, kept = 0, missing = 0;

for (const step of data.steps || []) {
  if (step.type !== 'key_intro' && step.type !== 'typing_drill') continue;
  const row = table[String(step.id)];
  if (!row) { problems.push(`step ${step.id} (${step.type}) has no translation row`); continue; }

  for (const base of FIELDS) {
    if (typeof step[base] !== 'string') continue;

    // The table records the English it was written against. If the lesson
    // copy changed, the translations are stale — say so instead of applying.
    if (row.en && row.en[base] !== undefined && row.en[base] !== step[base]) {
      problems.push(`step ${step.id} ${base}: English changed since translation ` +
        `(table has ${JSON.stringify(row.en[base])}, json has ${JSON.stringify(step[base])})`);
      continue;
    }

    const srcJamo = (step[base].match(JAMO) || []);
    for (const lang of LANGS) {
      const key = `${base}_${lang}`;
      const value = row[base] && row[base][lang];
      if (!value) { problems.push(`step ${step.id} ${key}: no translation in table`); missing++; continue; }

      const gotJamo = (value.match(JAMO) || []);
      if (srcJamo.join('') !== gotJamo.join('')) {
        problems.push(`step ${step.id} ${key}: jamo mismatch — ` +
          `English has [${srcJamo.join(' ')}], translation has [${gotJamo.join(' ')}]`);
        continue;
      }

      if (step[key] !== undefined) { kept++; continue; }   // never overwrite
      if (!CHECK) step[key] = value;
      added++;
    }
  }
}

if (problems.length) {
  console.error(`patch-typing-locale-gaps: ${problems.length} problem(s)`);
  problems.slice(0, 10).forEach(p => console.error('  ' + p));
  process.exit(1);
}

if (CHECK) {
  const gaps = added;   // in --check nothing was written, so `added` counts what is still absent
  console.log(gaps
    ? `typing.json: ${gaps} locale field(s) still missing`
    : `typing.json: all ${kept} locale fields present, jamo intact`);
  process.exit(gaps ? 1 : 0);
}

fs.writeFileSync(DATA, JSON.stringify(data, null, 2) + '\n');
console.log(`typing.json: +${added} locale field(s) added, ${kept} left untouched, ${missing} missing from table`);
