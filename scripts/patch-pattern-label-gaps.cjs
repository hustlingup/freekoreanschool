#!/usr/bin/env node
/* ═══════════════════════════════════════════════════════════════════════
   patch-pattern-label-gaps.cjs — fill the missing `patterns_label_<lang>`
   arrays on the syllable-blocks lesson.

     node scripts/patch-pattern-label-gaps.cjs           # apply
     node scripts/patch-pattern-label-gaps.cjs --check   # verify, exit 1 on gaps

   Idempotent; never overwrites an array that is already there.

   WHY. `patterns` is an array of objects each carrying an English `label`,
   and the localization sits on the PARENT step as a parallel array
   (`patterns_label_ja`, …) rather than as a `label_ja` inside each element.
   Nothing measured that convention: there is no un-suffixed `patterns_label`
   base field, so qa-lang.cjs never treated it as a unit, and 6 locales were
   filled while `th` and `vi` silently rendered the English "initial + vowel"
   in both the interactive step (js/step-runner.js renderSyllableStructure)
   and the crawler-visible #lesson-static block.

   audit-i18n.cjs check 13 now enforces per-object locale parity, which is
   what catches this shape.
═══════════════════════════════════════════════════════════════════════ */
'use strict';
const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '..', 'learn', 'data', 'syllable-blocks.json');
const CHECK = process.argv.includes('--check');
const LANGS = ['ja', 'zh_tw', 'es', 'fr', 'de', 'vi', 'th', 'id'];

/* Authored against the English labels below. The Hangul ㅇ and 받침 stay as
   they are in every locale — they are the thing being taught, not prose. */
const EN = ['initial + vowel', 'silent ㅇ + vowel', 'initial + vowel + 받침', 'silent ㅇ + vowel + 받침'];
const TABLE = {
  th: ['พยัญชนะต้น + สระ', 'ㅇ ไม่ออกเสียง + สระ', 'พยัญชนะต้น + สระ + 받침', 'ㅇ ไม่ออกเสียง + สระ + 받침'],
  vi: ['phụ âm đầu + nguyên âm', 'ㅇ câm + nguyên âm', 'phụ âm đầu + nguyên âm + 받침', 'ㅇ câm + nguyên âm + 받침']
};

/* ── corrections ─────────────────────────────────────────────────────────
   SEPARATE from the backfill above, which never overwrites. These replace a
   specific, exactly-matched wrong value, so they are still idempotent: once
   applied, the old string is gone and nothing matches.

   zh-tw used the bare Hangul 초성 where every other locale uses its own word
   (inicial / Anfangskonsonant / 初声). A zh-tw reader cannot read it, and
   unlike the other Hangul in this locale's prose it carries no inline gloss
   — compare "유음화（流音化）" or "초성：第一個子音", which are glossed and are
   deliberate. 初聲 is already the established term in this repo's zh-tw
   lesson data (21 uses). 받침 stays: it is the taught term and is glossed
   here as 받침（收音）. */
const CORRECTIONS = {
  zh_tw: { '초성 + 母音': '初聲 + 母音',
           '초성 + 母音 + 받침（收音）': '初聲 + 母音 + 받침（收音）' }
};

const data = JSON.parse(fs.readFileSync(FILE, 'utf8'));
let added = 0, kept = 0, fixed = 0;
const problems = [];

for (const step of data.steps || []) {
  if (!Array.isArray(step.patterns) || !step.patterns.length) continue;
  const en = step.patterns.map(p => p.label);

  if (en.join('|') !== EN.join('|')) {
    problems.push(`step ${step.id}: English labels changed since translation ` +
      `(${JSON.stringify(en)})`);
    continue;
  }

  for (const lang of LANGS) {
    const key = `patterns_label_${lang}`;
    if (Array.isArray(step[key])) {
      if (step[key].length !== en.length) {
        problems.push(`step ${step.id} ${key}: ${step[key].length} label(s) for ${en.length} pattern(s)`);
      }
      kept++;
      continue;
    }
    const value = TABLE[lang];
    if (!value) { problems.push(`step ${step.id} ${key}: missing and not in table`); continue; }
    if (!CHECK) step[key] = value.slice();
    added++;
  }

  for (const [lang, map] of Object.entries(CORRECTIONS)) {
    const arr = step[`patterns_label_${lang}`];
    if (!Array.isArray(arr)) continue;
    arr.forEach((v, i) => {
      if (!(v in map)) return;
      if (!CHECK) arr[i] = map[v];
      fixed++;
    });
  }
}

if (problems.length) {
  console.error(`patch-pattern-label-gaps: ${problems.length} problem(s)`);
  problems.slice(0, 10).forEach(p => console.error('  ' + p));
  process.exit(1);
}

if (CHECK) {
  const bits = [];
  if (added) bits.push(`${added} patterns_label array(s) still missing`);
  if (fixed) bits.push(`${fixed} label(s) still carry an uncorrected value`);
  console.log(bits.length ? `syllable-blocks.json: ${bits.join('; ')}`
                          : `syllable-blocks.json: all ${kept} patterns_label arrays present, corrections applied`);
  process.exit(added || fixed ? 1 : 0);
}

fs.writeFileSync(FILE, JSON.stringify(data, null, 2) + '\n');
console.log(`syllable-blocks.json: +${added} patterns_label array(s) added, ${kept} left untouched, ${fixed} label(s) corrected`);
