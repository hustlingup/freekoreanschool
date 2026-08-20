#!/usr/bin/env node
/* ═══════════════════════════════════════════════════════════════════════
   qa-lesson-chunks.cjs — structural QA for translated lesson chunks,
   BEFORE they are applied into learn/data/*.json.

   WHY BEFORE. qa-lang.cjs --apply is loss-free and deterministic: it walks
   each unit's stored trail and writes the exact `<field>_<suffix>` slot. It
   does not, and should not, judge the value it is handed. So a corrupted
   translation applies just as cleanly as a good one, and then it is spread
   across 35 lesson JSONs and re-rendered into 45 static pages by
   gen-lesson-static.cjs. Catching it in the chunk file is one `git checkout`;
   catching it after apply is an archaeology exercise.

   WHAT IT SEES:
     • Hangul dropped, altered, or invented. The Korean IS the lesson — a
       translator who "helpfully" translates 감사합니다 into the target
       language has destroyed the content, and qa-lang.cjs --status will
       still report the unit as translated.
     • {placeholders} translated (they render literally to the reader).
     • Empty or whitespace-only values that would count as "filled".
     • Values left byte-identical to the English source.
     • Wrong-variety terms, using the SAME trap table as qa-ui-pack.cjs —
       required from there so the two passes can never disagree about what
       counts as a wrong-variety term.
     • Missing / extra / duplicate ids vs the source chunk.

   WHAT IT CANNOT SEE: whether the translation is CORRECT. In particular it
   cannot see a grammar explanation that was smoothed over into something
   false — the highest-severity defect class in this corpus, and the one
   only a fluent reader catches. A PASS here means "structurally sound",
   never "right".

     node scripts/qa-lesson-chunks.cjs <locale> [--check]
═══════════════════════════════════════════════════════════════════════ */
'use strict';
const fs = require('fs');
const path = require('path');
const REG = require('./_locales.cjs');
const { VARIETY_TRAPS } = require('./qa-ui-pack.cjs');

const ROOT = path.resolve(__dirname, '..');
const argv = process.argv.slice(2);
const LOC = argv.find(a => !a.startsWith('--'));
const CHECK = argv.includes('--check');

if (!LOC || !REG.get(LOC)) {
  console.error(`usage: node scripts/qa-lesson-chunks.cjs <locale> [--check]`);
  if (LOC) console.error(`unknown locale "${LOC}" — not in scripts/_locales.cjs`);
  process.exit(2);
}

const DIR = path.join(ROOT, 'scripts', '_trans', 'qa', 'lang', LOC);
if (!fs.existsSync(DIR)) {
  console.log(`${LOC}: NOT PRESENT — no ${path.relative(ROOT, DIR)}/`);
  console.log('  This is "nothing to measure", NOT "everything passes".');
  process.exit(CHECK ? 1 : 0);
}

const srcFiles = fs.readdirSync(DIR).filter(f => /^chunk-\d+\.json$/.test(f)).sort();
const doneFiles = fs.readdirSync(DIR).filter(f => /^chunk-\d+\.done\.json$/.test(f)).sort();

if (!srcFiles.length) { console.log(`${LOC}: no source chunks in ${path.relative(ROOT, DIR)}/`); process.exit(CHECK ? 1 : 0); }

/* ── index the source units ───────────────────────────────────────────── */
const src = new Map();          // id -> {ko, en, chunk}
for (const f of srcFiles) {
  const j = JSON.parse(fs.readFileSync(path.join(DIR, f), 'utf8'));
  for (const u of j.units) src.set(u.id, { ko: u.ko || '', en: u.en || '', chunk: f });
}

/* ── index the translations ──────────────────────────────────────────── */
const done = new Map();
const dupes = [];
for (const f of doneFiles) {
  const arr = JSON.parse(fs.readFileSync(path.join(DIR, f), 'utf8'));
  if (!Array.isArray(arr)) { console.error(`${f}: expected an ARRAY of {id,value}`); process.exit(2); }
  for (const { id, value } of arr) {
    if (done.has(id)) dupes.push(id);
    done.set(id, value);
  }
}

/* ── checks ──────────────────────────────────────────────────────────── */
const HANGUL_RUN = /[가-힣ㄱ-ㆎ]+/g;
const PLACEHOLDER = /\{[a-zA-Z_][a-zA-Z0-9_]*\}/g;
const runs = (s, re) => (String(s == null ? '' : s).match(re) || []).join('|');

const traps = (VARIETY_TRAPS[LOC] || []).map(t =>
  t instanceof RegExp ? { re: t, label: t.source.slice(0, 40) }
                      : { lit: t.toLowerCase(), label: t.trim() });

const fail = { missing: [], extra: [], dupes, empty: [], hangul: [], placeholder: [] };
const warn = { variety: [], identical: [], reordered: [], added: [] };
const info = { headword: [] };

/* The hard check compares the multiset of Hangul CHARACTERS, not the ordered
   sequence of Hangul runs. Two things a correct translation legitimately does
   broke the stricter version on the first pt-BR run:
     • reordering — "ㄹ 받침" reads better in Portuguese as "받침 ㄹ";
     • resegmenting — English wrote "ㅂ받침" with no space, Portuguese wrote
       "받침 ㅂ", so one run became two while every character survived.
   Character multiset is immune to both and still catches the defect that
   matters: Korean dropped, or Korean invented. Sequence changes are reported
   separately as a WARN, so a genuinely swapped pair (이/가 in a particle
   explanation) stays visible to a reader. */
const HANGUL_CHAR = /[가-힣ㄱ-ㆎ]/g;
const chars = s => (String(s == null ? '' : s).match(HANGUL_CHAR) || []);

/* Multiset difference: which Hangul characters of `a` are not covered by `b`.
   DIRECTION MATTERS, and conflating the two directions is wrong:

     LOST  (in English, gone from the translation) — destructive. The Korean
           IS the lesson; qa-lang.cjs --status still counts the unit as
           translated, so nothing else would ever catch it. HARD FAIL.

     ADDED (not in English, present in the translation) — established site
           convention. Verified against learn/data/pronunciation.json,
           2026-08-13: stage name "Batchim" is "Batchim (받침)" in es, de, vi
           and id, and step 62's title renders "i-Vowels" as "Vocales 이" in
           es and "voyelles 이" in fr. Flagging these as failures marked four
           correct pt-BR units as defects. WARN so it stays visible. */
function missingFrom(a, b) {
  const pool = chars(b).slice();
  const out = [];
  for (const c of chars(a)) {
    const i = pool.indexOf(c);
    if (i === -1) out.push(c); else pool.splice(i, 1);
  }
  return out;
}
const LATIN = /[A-Za-zÀ-ÿ]/;

for (const id of src.keys()) if (!done.has(id)) fail.missing.push(id);
for (const id of done.keys()) if (!src.has(id)) fail.extra.push(id);

for (const [id, value] of done) {
  const s = src.get(id);
  if (!s) continue;
  if (typeof value !== 'string' || !value.trim()) { fail.empty.push(id); continue; }

  /* A field whose English value is ENTIRELY Hangul is a headword, not prose —
     e.g. vocabulary-proverbs `title`, where the Korean lives in the `title_kr`
     sibling and EVERY locale replaces `title` with its own rendering (es
     "Hablando del rey de Roma…", zh-tw "說曹操，曹操到"). Verified against
     learn/data/vocabulary-proverbs.json, 2026-08-13. Replacing the Hangul here
     is required, not a defect — so exclude it from the Hangul check and count
     it instead. */
  const enIsHeadword = /[가-힣]/.test(s.en) && !LATIN.test(s.en);
  if (enIsHeadword) {
    info.headword.push(`${id}  ${JSON.stringify(s.en.slice(0, 46))} -> ${JSON.stringify(value.slice(0, 46))}`);
  } else {
    const lost = missingFrom(s.en, value);
    const added = missingFrom(value, s.en);
    if (lost.length) {
      fail.hangul.push(`${id}  [lost: ${lost.join('')}]\n        EN : ${s.en.slice(0, 110)}\n        ${LOC.toUpperCase()}: ${value.slice(0, 110)}`);
    } else if (added.length) {
      warn.added.push(`${id}  [added: ${added.join('')}]  ${JSON.stringify(value.slice(0, 80))}`);
    } else if (runs(s.en, HANGUL_RUN) !== runs(value, HANGUL_RUN)) {
      warn.reordered.push(`${id}  ${JSON.stringify(s.en.slice(0, 70))} -> ${JSON.stringify(value.slice(0, 70))}`);
    }
  }
  if (runs(s.en, PLACEHOLDER) !== runs(value, PLACEHOLDER)) {
    fail.placeholder.push(`${id}  ${JSON.stringify(s.en.slice(0, 70))} -> ${JSON.stringify(value.slice(0, 70))}`);
  }

  const lower = value.toLowerCase();
  for (const t of traps) {
    const hit = t.re ? t.re.test(value) : lower.includes(t.lit);
    if (hit) { warn.variety.push(`${id}  ${JSON.stringify(value.slice(0, 90))}  [${t.label}]`); break; }
  }
  if (value === s.en) warn.identical.push(`${id}  ${JSON.stringify(s.en.slice(0, 70))}`);
}

/* ── report ──────────────────────────────────────────────────────────── */
console.log(`qa-lesson-chunks ${LOC}`);
console.log(`  ${srcFiles.length} source chunk(s), ${doneFiles.length} translated`);
console.log(`  ${src.size} units expected, ${done.size} translated\n`);

let failed = 0;
const block = (label, list, hard, note) => {
  const ok = list.length === 0;
  if (!ok && hard) failed++;
  console.log(`  ${ok ? 'PASS' : (hard ? 'FAIL' : 'WARN')}  ${label} — ${list.length}`);
  if (ok && note) console.log(`        ${note}`);
  list.slice(0, 12).forEach(x => console.log(`        ${x}`));
  if (list.length > 12) console.log(`        … and ${list.length - 12} more`);
};

block('every source id translated', fail.missing, true);
block('no ids that are not in the source', fail.extra, true);
block('no duplicate ids across chunks', fail.dupes, true);
block('no empty values', fail.empty, true);
block('no Korean LOST from the source', fail.hangul, true);
block('Korean added by the translator', warn.added, false,
  'none — no unit gained Korean the English source did not have');
block('{placeholders} preserved', fail.placeholder, true);
block('Hangul order unchanged within prose', warn.reordered, false,
  'none — Korean appears in the same order as the source');
block(`wrong-variety terms (${traps.length} patterns for ${LOC})`, warn.variety, false,
  traps.length ? 'none found' : `no trap list defined for ${LOC} in qa-ui-pack.cjs — this check saw nothing`);
block('values byte-identical to English', warn.identical, false,
  'none — every unit differs from its source');
block('headword fields translated (English value is pure Hangul)', info.headword, false,
  'none in this corpus');
if (info.headword.length) {
  console.log('        ^ Required, not a defect: the Korean lives in the *_kr sibling and');
  console.log('          every locale renders its own version. Verified against');
  console.log('          learn/data/vocabulary-proverbs.json, 2026-08-13.');
}

console.log(`\n  ${failed ? `${failed} hard check(s) FAILED — do NOT run qa-lang.cjs --apply` : 'all hard checks pass — safe to apply'}`);
console.log('  Structural only. A grammar explanation translated into something FALSE');
console.log('  passes every check here. That needs a fluent reader.');
process.exit(CHECK && failed ? 1 : 0);
