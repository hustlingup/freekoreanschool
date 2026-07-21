#!/usr/bin/env node
/**
 * audit-vocab-quizzes.cjs — enforce docs/vocab-quiz-standard.md
 *
 * A 2026-07-21 audit found 48 of 78 match_quiz steps broken: options in English
 * where the question asks the learner to pick a Korean word, and answers stated
 * in the prompt. This is the check that keeps them fixed.
 *
 *   node scripts/audit-vocab-quizzes.cjs [file...]   # exit 1 if any problem
 */
const fs = require('fs');
const path = require('path');

const DATA = path.join(__dirname, '..', 'learn', 'data');
const LANGS = ['ja', 'zh_tw', 'es', 'de', 'fr', 'vi', 'th', 'id'];
const HANGUL = /[가-힣]/;

/** Strip parentheticals and punctuation so "to go" matches "To go." */
const norm = s => String(s).replace(/\([^)]*\)/g, ' ')
  .replace(/[^\p{L}\p{N}\s]/gu, ' ').replace(/\s+/g, ' ').trim().toLowerCase();

/** A prompt that asks which KOREAN word/form — options must be Hangul. */
function wantsKorean(prompt) {
  const p = prompt.toLowerCase();
  return /which (word|verb|adjective|noun|term|expression|phrase)/.test(p)
      || /polite (present|past)|→|conjugat|form is|opposite is/.test(p)
      || /how do you say|what is the korean/.test(p);
}

function auditFile(file) {
  const problems = [];
  const json = JSON.parse(fs.readFileSync(path.join(DATA, file), 'utf8'));
  (json.steps || []).forEach((s, i) => {
    if (s.type !== 'match_quiz' || !Array.isArray(s.choices)) return;
    const at = `${file} steps.${i}`;
    const prompt = s.prompt || '';
    const anyHangul = s.choices.some(c => HANGUL.test(c));

    // Runtime contract: data-value is the untranslated choice, compared to `correct`.
    if (!s.choices.includes(s.correct)) problems.push(`${at}: correct not in choices`);
    if (new Set(s.choices).size !== s.choices.length) problems.push(`${at}: duplicate options`);
    if (s.choices.length < 3) problems.push(`${at}: fewer than 3 options`);

    // Kind 1/3 — asking for a Korean form means the options must be Korean.
    if (wantsKorean(prompt) && !anyHangul) problems.push(`${at}: asks for a Korean form but options are not Korean`);

    // Korean options must not carry per-locale copies: Hangul is Hangul everywhere.
    if (anyHangul && s.choices.every(c => HANGUL.test(c))) {
      for (const l of LANGS) {
        if (s[`choices_${l}`]) problems.push(`${at}: choices_${l} present on an all-Korean option set — delete it`);
      }
    }

    // Answer leak, checked in English and in every locale.
    if (norm(prompt) && norm(s.correct) && norm(prompt).includes(norm(s.correct))) {
      problems.push(`${at}: answer "${s.correct}" appears in the prompt`);
    }
    for (const l of LANGS) {
      const lp = s[`prompt_${l}`], lc = s[`choices_${l}`];
      if (!lc) continue;
      if (lc.length !== s.choices.length) { problems.push(`${at}: choices_${l} length ${lc.length} != ${s.choices.length}`); continue; }
      if (lc.some(c => !c || !String(c).trim())) problems.push(`${at}: choices_${l} has an empty option`);
      if (new Set(lc.map(norm)).size !== lc.length) problems.push(`${at}: choices_${l} has options that collide once translated`);
      const ci = s.choices.indexOf(s.correct);
      if (lp && ci >= 0 && lc[ci] && norm(lp).includes(norm(lc[ci]))) {
        problems.push(`${at}: prompt_${l} leaks its answer`);
      }
    }
  });
  return problems;
}

const files = process.argv.slice(2).length
  ? process.argv.slice(2).map(f => path.basename(f))
  : fs.readdirSync(DATA).filter(f => /^vocabulary.*\.json$/.test(f)).sort();

let total = 0, quizzes = 0;
for (const f of files) {
  const p = auditFile(f);
  quizzes += (JSON.parse(fs.readFileSync(path.join(DATA, f), 'utf8')).steps || [])
    .filter(s => s.type === 'match_quiz').length;
  if (p.length) { total += p.length; p.forEach(x => console.log('  ' + x)); }
}
console.log(`${files.length} file(s), ${quizzes} quizzes — ${total} problem(s)`);
process.exit(total ? 1 : 0);
