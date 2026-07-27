#!/usr/bin/env node
// ══════════════════════════════════════════════════════════════════════════
// test-hangul-ime.cjs — verify js/hangul-ime.js against the spec in
// docs/writing-typing/prompt-D-ime-typing-engine.md §1.
//
//   node scripts/test-hangul-ime.cjs
//
// Run after ANY edit to js/hangul-ime.js or js/hangul-util.js.
// Accumulates EVERY failure (no early bail), prints a summary, exits 1 if any.
//
// Group 1 is the 18-row golden table from spec §1.3 verbatim. Note the spec's
// inline Verification snippet lists only 17 of those rows — it omits `dk<`.
// That row is in the table, so it is tested here.
//
// Groups 2–8 go past the goldens into the states that break real IMEs:
// every KEYMAP jamo standing alone, a full keystroke round-trip over all
// 11,172 modern syllables, keymap invertibility, backspace teardown from
// every reachable block shape, reset/flush reusability, and instance
// isolation.
// ══════════════════════════════════════════════════════════════════════════
'use strict';

const path = require('path');

const IME = require(path.join(__dirname, '..', 'js', 'hangul-ime.js'));
const HangulUtil = require(path.join(__dirname, '..', 'js', 'hangul-util.js'));

const { CHO, JUNG, JONG, JONG_SPLIT, JUNG_COMBINE } = HangulUtil;

// ── harness ───────────────────────────────────────────────────────────────
const failures = [];
let checks = 0;
let goldenChecks = 0;

function check(group, name, got, want) {
  checks++;
  if (group === 'golden') goldenChecks++;
  if (got !== want) {
    failures.push(`[${group}] ${name}\n    expected: ${JSON.stringify(want)}\n    got:      ${JSON.stringify(got)}`);
    return false;
  }
  return true;
}

function checkTruthy(group, name, cond, detail) {
  checks++;
  if (group === 'golden') goldenChecks++;
  if (!cond) failures.push(`[${group}] ${name}${detail ? '\n    ' + detail : ''}`);
  return !!cond;
}

// QWERTY string → value(). Same helper as the spec's Verification snippet:
// lowercase = unshifted, UPPERCASE = shifted, '<' = backspace.
function type(str, ime) {
  const m = ime || IME.create();
  for (const ch of str) {
    if (ch === '<') { m.backspace(); continue; }
    const shifted = ch !== ch.toLowerCase();
    m.input(IME.jamoForCode('Key' + ch.toUpperCase(), shifted));
  }
  return m.value();
}

// ── 1. golden table (spec §1.3) — all 18 rows ─────────────────────────────
const GOLDEN = [
  ['rk',        '가',   'ㄱ+ㅏ'],
  ['rkr',       '각',   'jong attach'],
  ['rkrt',      '갃',   'jong ㄱ+ㅅ→ㄳ compound'],
  ['rkrtk',     '각사', 'vowel steals batchim; ㄳ splits, ㅅ becomes new cho'],
  ['rkk',       '가ㅏ', 'ㅏ+ㅏ not combinable → commit 가, standalone-vowel block'],
  ['gksrnrdj',  '한국어', 'full word: 한 / 국 (jong ㄱ kept) / 어'],
  ['dhk',       '와',   'ㅇ + (ㅗ+ㅏ→ㅘ)'],
  ['dnjs',      '원',   'ㅇ + (ㅜ+ㅓ→ㅝ) + ㄴ'],
  ['Rkc',       '깣',   'shifted ㄲ cho, jong ㅊ'],
  ['anfR',      '물ㄲ', 'ㄹ+ㄲ is no compound jong → commit 물, new block ㄲ'],
  ['ekfr',      '닭',   'ㄷㅏㄹ + ㄱ → jong ㄺ'],
  ['dml',       '의',   'ㅇ + (ㅡ+ㅣ→ㅢ)'],
  ['dk<',       'ㅇ',   'backspace removes jung, cho remains (omitted by the snippet)'],
  ['ekfr<',     '달',   'compound jong ㄺ peels to ㄹ'],
  ['ekfr<<',    '다',   'then jong removed'],
  ['ekfr<<<',   'ㄷ',   'then jung removed'],
  ['ekfr<<<<',  '',     'then cho removed'],
  ['rkrtk<',    '각ㅅ', 'current block {ㅅ,ㅏ} loses ㅏ; committed 각 untouched'],
];

GOLDEN.forEach(([seq, want, why]) => {
  check('golden', `"${seq}" — ${why}`, type(seq), want);
});

// ── 2. every one of the 33 KEYMAP jamo as a lone first input ──────────────
const ALL_JAMO = [];
Object.keys(IME.KEYMAP).forEach(code => {
  IME.KEYMAP[code].forEach(j => { if (ALL_JAMO.indexOf(j) === -1) ALL_JAMO.push(j); });
});

checkTruthy('jamo-set', 'KEYMAP exposes exactly 33 distinct jamo',
  ALL_JAMO.length === 33, `got ${ALL_JAMO.length}: ${ALL_JAMO.join('')}`);

ALL_JAMO.forEach(j => {
  const ime = IME.create();
  ime.input(j);
  check('lone-jamo', `input('${j}') → value()`, ime.value(), j);
  check('lone-jamo', `input('${j}') → current()`, ime.current(), j);
  ime.backspace();
  check('lone-jamo', `input('${j}') then backspace → empty`, ime.value(), '');
});

// ── 3. codeForJamo is a true inverse of jamoForCode ───────────────────────
ALL_JAMO.forEach(j => {
  const hit = IME.codeForJamo(j);
  if (!checkTruthy('keymap-inverse', `codeForJamo('${j}') returns a mapping`, !!hit)) return;
  check('keymap-inverse', `jamoForCode(codeForJamo('${j}')) round-trips`,
    IME.jamoForCode(hit.code, hit.shifted), j);
  checkTruthy('keymap-inverse', `codeForJamo('${j}').code is a real KEYMAP code`,
    Object.prototype.hasOwnProperty.call(IME.KEYMAP, hit.code), `got ${hit.code}`);
});

Object.keys(IME.KEYMAP).forEach(code => {
  const pair = IME.KEYMAP[code];
  check('keymap-inverse', `jamoForCode('${code}', false)`, IME.jamoForCode(code, false), pair[0]);
  check('keymap-inverse', `jamoForCode('${code}', true)`,
    IME.jamoForCode(code, true), pair.length > 1 ? pair[1] : pair[0]);
});

check('keymap-inverse', 'jamoForCode of an unmapped code', IME.jamoForCode('Space', false), null);
check('keymap-inverse', 'jamoForCode of Backspace', IME.jamoForCode('Backspace', true), null);
check('keymap-inverse', 'codeForJamo of a non-KEYMAP jamo (ㅘ)', IME.codeForJamo('ㅘ'), null);
check('keymap-inverse', 'codeForJamo of a compound batchim (ㄳ)', IME.codeForJamo('ㄳ'), null);
check('keymap-inverse', 'codeForJamo of a latin letter', IME.codeForJamo('a'), null);

// ── 4. keystroke round-trip over all 11,172 modern syllables ──────────────
// Decompose → expand each part into the keystrokes a learner would actually
// press (compound jung/jong that have no key of their own split into their
// two components) → type them → the syllable must come back.
function keystrokesFor(jamo, splitTable) {
  if (IME.codeForJamo(jamo)) return [jamo];        // has its own key (incl. ㅐㅔㅒㅖ)
  const parts = splitTable[jamo];
  if (!parts) return null;
  return parts;
}

let rtTested = 0;
const rtFails = [];
for (let cp = 0xAC00; cp <= 0xD7A3; cp++) {
  const syl = String.fromCodePoint(cp);
  const d = HangulUtil.decompose(syl);
  const seq = [];
  let ok = true;

  [keystrokesFor(d.cho, {}), keystrokesFor(d.jung, invertJung()), d.jong ? keystrokesFor(d.jong, JONG_SPLIT) : []]
    .forEach(parts => { if (parts === null) ok = false; else parts.forEach(p => seq.push(p)); });

  if (!ok) { rtFails.push(`${syl}: no keystroke expansion`); continue; }

  const ime = IME.create();
  seq.forEach(j => {
    const hit = IME.codeForJamo(j);
    ime.input(hit ? IME.jamoForCode(hit.code, hit.shifted) : j); // go through the keyboard
  });
  rtTested++;
  if (ime.value() !== syl) rtFails.push(`${syl}: typed ${seq.join('')} → ${JSON.stringify(ime.value())}`);
  if (ime.current() !== syl) rtFails.push(`${syl}: current() was ${JSON.stringify(ime.current())}`);
}

// Local inverse of JUNG_COMBINE (hangul-util ships JONG_SPLIT but not this).
function invertJung() {
  if (invertJung.cache) return invertJung.cache;
  const inv = {};
  Object.keys(JUNG_COMBINE).forEach(pair => { inv[JUNG_COMBINE[pair]] = [pair[0], pair[1]]; });
  invertJung.cache = inv;
  return inv;
}

checks += rtTested;              // one assertion per syllable
checkTruthy('round-trip', `all ${rtTested} syllables round-trip through the keyboard`,
  rtFails.length === 0, rtFails.slice(0, 12).join('\n    ') + (rtFails.length > 12 ? `\n    …and ${rtFails.length - 12} more` : ''));
checkTruthy('round-trip', 'every one of the 11,172 syllables was exercised', rtTested === 11172, `got ${rtTested}`);

// ── 5. backspace teardown from every reachable block shape ────────────────
// Build sequences that reach: {cho}, {jung}, {cho,jung}, {cho,jung+composed},
// {jung composed alone}, {cho,jung,simple jong}, {cho,jung,compound jong},
// committed text + each of those.
const TEARDOWN = [
  'r', 'k', 'rk', 'rkr', 'rkrt', 'rkrtk', 'rkk', 'gksrnrdj', 'dhk', 'dnjs',
  'Rkc', 'anfR', 'ekfr', 'dml', 'dkl', 'do', 'dO', 'dhk', 'dho', 'dnjp',
  'RKRT', 'anfRkrtek', 'gksrnrdjfmf', 'dlqfur', 'Wkfek', 'vnfek', 'ehfk',
];
TEARDOWN.forEach(seq => {
  const ime = IME.create();
  let threw = null;
  try {
    type(seq, ime);
    for (let i = 0; i < seq.length + 3; i++) ime.backspace();
  } catch (e) { threw = e; }
  checkTruthy('teardown', `"${seq}" backspaces to empty without throwing`,
    !threw, threw && threw.stack);
  if (threw) return;
  check('teardown', `"${seq}" → value() empty after teardown`, ime.value(), '');
  check('teardown', `"${seq}" → current() empty after teardown`, ime.current(), '');
  // no orphaned block state: the instance must behave like a fresh one
  check('teardown', `"${seq}" → instance reusable after teardown`, ime.input('ㄱ'), 'ㄱ');
  check('teardown', `"${seq}" → current() after reuse`, ime.current(), 'ㄱ');
});

// The jungComposed distinction — the single most misimplemented rule.
check('jung-flag', 'dkl (ㅏ+ㅣ→ㅐ) then backspace splits back to ㅏ', type('dkl<'), '아');
check('jung-flag', 'do (ㅐ from its own key) then backspace removes it whole', type('do<'), 'ㅇ');
check('jung-flag', 'dO (ㅒ from shift+O) then backspace removes it whole', type('dO<'), 'ㅇ');
check('jung-flag', 'dP (ㅖ from shift+P) then backspace removes it whole', type('dP<'), 'ㅇ');
check('jung-flag', 'dp (ㅔ from its own key) then backspace removes it whole', type('dp<'), 'ㅇ');
check('jung-flag', 'djl (ㅓ+ㅣ→ㅔ) then backspace splits back to ㅓ', type('djl<'), '어');
check('jung-flag', 'dho (ㅗ+ㅐ→ㅙ) then backspace splits back to ㅗ', type('dho<'), '오');
check('jung-flag', 'dhk (ㅗ+ㅏ→ㅘ) then backspace splits back to ㅗ', type('dhk<'), '오');
check('jung-flag', 'dml (ㅡ+ㅣ→ㅢ) then backspace splits back to ㅡ', type('dml<'), '으');
check('jung-flag', 'ㅘ peeled to ㅗ then ㅏ retyped recomposes', type('dhk<k'), '와');
check('jung-flag', 'ㅐ removed whole then retyped', type('do<o'), '애');
check('jung-flag', 'standalone composed vowel peels then clears', type('hk<'), 'ㅗ');
check('jung-flag', 'standalone composed vowel fully cleared', type('hk<<'), '');

// ── 6. batchim stealing, both shapes ──────────────────────────────────────
check('batchim', 'simple jong moves wholesale (ㄴ → next cho)', type('gksk'), '하나');
check('batchim', 'uncombinable doubled jong commits instead', type('gkssk'), '한나');
check('batchim', 'uncombinable consonant after a jong commits', type('dkstpdy'), '안세요');
check('batchim', 'compound jong ㄶ splits: 많아', type('aksgdk'), '많아');
check('batchim', 'compound jong ㄼ splits: 밟아', type('qkfqdk'), '밟아');
check('batchim', 'compound jong ㅄ splits: 값이', type('rkqtdl'), '값이');
check('batchim', 'double jong ㅆ moves wholesale: 있어', type('dlTdj'), '있어');
check('batchim', 'ㄸ/ㅃ/ㅉ are never batchim: 아ㄸ', type('dkE'), '아ㄸ');
check('batchim', 'ㅃ after a full block starts a new block', type('rkQ'), '가ㅃ');
check('batchim', 'ㅉ after a full block starts a new block', type('rkW'), '가ㅉ');
check('batchim', 'compound jong then a consonant commits', type('ekfrr'), '닭ㄱ');
check('batchim', 'ㄺ + ㅅ has no compound → commit', type('ekfrt'), '닭ㅅ');

// ── 7. reset() / flush() leave the instance usable ────────────────────────
{
  const ime = IME.create();
  type('gksrnr', ime);
  check('lifecycle', 'flush() returns value()', ime.flush(), '한국');
  check('lifecycle', 'flush() clears the current block', ime.current(), '');
  check('lifecycle', 'flush() keeps committed text', ime.value(), '한국');
  check('lifecycle', 'flush() on an empty block is a no-op', ime.flush(), '한국');
  ime.input(IME.jamoForCode('KeyD', false));
  ime.input(IME.jamoForCode('KeyJ', false));
  check('lifecycle', 'typing continues after flush()', ime.value(), '한국어');
  check('lifecycle', 'current() after flush + typing', ime.current(), '어');
  ime.reset();
  check('lifecycle', 'reset() clears value()', ime.value(), '');
  check('lifecycle', 'reset() clears current()', ime.current(), '');
  check('lifecycle', 'instance usable after reset()', type('rk', ime), '가');
  ime.reset();
  ime.backspace();
  check('lifecycle', 'backspace on a reset instance is safe', ime.value(), '');
  check('lifecycle', 'typing after that backspace', type('rk', ime), '가');
}
{
  // whole-char delete of committed text (documented simplification)
  const ime = IME.create();
  type('rk', ime);
  ime.flush();
  ime.backspace();
  check('committed-delete', 'flushed 가 is deleted whole, not decomposed', ime.value(), '');
  const ime2 = IME.create();
  type('gksrnrdj', ime2);
  ime2.flush();
  ime2.backspace();
  check('committed-delete', 'flushed 한국어 loses 어 whole', ime2.value(), '한국');
  ime2.backspace();
  ime2.backspace();
  check('committed-delete', 'and then empties', ime2.value(), '');
  ime2.backspace();
  check('committed-delete', 'backspace past empty is a no-op', ime2.value(), '');
}

// ── 8. two instances from create() do not share state ─────────────────────
{
  const a = IME.create();
  const b = IME.create();
  type('gksrnr', a);
  check('isolation', 'b unaffected by typing in a', b.value(), '');
  check('isolation', 'b.current() unaffected', b.current(), '');
  type('dhk', b);
  check('isolation', 'a unaffected by typing in b', a.value(), '한국');
  check('isolation', 'b holds its own value', b.value(), '와');
  b.reset();
  check('isolation', 'b.reset() does not touch a', a.value(), '한국');
  a.backspace();
  check('isolation', 'a.backspace() does not touch b', b.value(), '');
  check('isolation', 'a peeled its own jong', a.value(), '한구');
  check('isolation', 'create() returns a fresh object each call', a === b, false);
}

// ── 9. defensive input handling ───────────────────────────────────────────
{
  const ime = IME.create();
  type('rk', ime);
  check('defensive', 'input(null) is a no-op', ime.input(null), '가');
  check('defensive', "input('') is a no-op", ime.input(''), '가');
  check('defensive', "input(' ') is a no-op", ime.input(' '), '가');
  check('defensive', "input('a') is a no-op", ime.input('a'), '가');
  check('defensive', 'input(undefined) is a no-op', ime.input(undefined), '가');
  check('defensive', 'input(jamoForCode of unmapped key) is a no-op',
    ime.input(IME.jamoForCode('Enter', false)), '가');
  check('defensive', 'pre-composed vowel ㅘ lands whole', IME.create().input('ㅘ'), 'ㅘ');
  check('defensive', 'backspace() returns value()', ime.backspace(), 'ㄱ');
  check('defensive', 'input() returns value()', ime.input('ㅏ'), '가');
}

// ── 10. structural sanity on the exported surface ─────────────────────────
['KEYMAP', 'jamoForCode', 'codeForJamo', 'create'].forEach(k => {
  checkTruthy('exports', `HangulIME.${k} is exported`, IME[k] !== undefined);
});
checkTruthy('exports', 'create() returns the six documented methods',
  ['input', 'backspace', 'flush', 'value', 'current', 'reset']
    .every(m => typeof IME.create()[m] === 'function'));
checkTruthy('exports', 'KEYMAP has the 26 letter keys', Object.keys(IME.KEYMAP).length === 26,
  `got ${Object.keys(IME.KEYMAP).length}`);
checkTruthy('exports', 'exactly 7 dual-legend keys',
  Object.keys(IME.KEYMAP).filter(c => IME.KEYMAP[c].length === 2).length === 7);
// The valid-batchim set: every KEYMAP consonant EXCEPT ㄸ ㅃ ㅉ.
{
  const consonants = ALL_JAMO.filter(j => CHO.indexOf(j) !== -1);
  checkTruthy('exports', 'KEYMAP carries all 19 choseong', consonants.length === 19,
    `got ${consonants.length}`);
  consonants.forEach(c => {
    // Behavioural probe rather than a private table read: type 가 then c —
    // a valid batchim attaches to the block, anything else starts a new one.
    const expected = 'ㄸㅃㅉ'.indexOf(c) === -1;
    const ime = IME.create();
    ime.input('ㄱ'); ime.input('ㅏ'); ime.input(c);
    const attached = ime.current() !== c;
    check('valid-jong', `${c} ${expected ? 'is' : 'is NOT'} a valid batchim`, attached, expected);
    if (expected) {
      check('valid-jong', `${c} composes a real syllable as batchim`,
        HangulUtil.isSyllable(ime.current()) && JONG.indexOf(c) !== -1, true);
    }
  });
}

// ── report ────────────────────────────────────────────────────────────────
console.log('');
console.log('  hangul-ime.js — spec docs/writing-typing/prompt-D-ime-typing-engine.md §1');
console.log('  ' + '─'.repeat(70));
console.log(`  golden table rows (§1.3):  ${goldenChecks} / 18`);
console.log(`  additional assertions:     ${checks - goldenChecks}`);
console.log(`  syllable round-trips:      ${rtTested}`);
console.log(`  total assertions:          ${checks}`);
console.log('  ' + '─'.repeat(70));

if (failures.length) {
  console.log(`  ${failures.length} FAILURE(S):\n`);
  failures.forEach(f => console.log('  ✗ ' + f));
  console.log('');
  process.exit(1);
}

console.log(`  ✓ all ${checks} assertions passed`);
console.log('');
process.exit(0);
