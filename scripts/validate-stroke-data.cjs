#!/usr/bin/env node
// ══════════════════════════════════════════════════════════════════════════
// validate-stroke-data.cjs — verify js/stroke-data.js against the spec in
// docs/writing-typing/prompt-A-foundation.md §3.
//
//   node scripts/validate-stroke-data.cjs
//
// Run after ANY edit to js/stroke-data.js or js/hangul-util.js.
// Exits 0 with a summary line, or prints every failure and exits 1.
//
// The stroke-count table below is the SINGLE SOURCE OF TRUTH (overview.md
// rule 6: ㅈ = 2 strokes, ㅊ = 3 strokes — handwriting convention). If the
// data disagrees, fix the data — never the table. The 2026-07-24 calibration
// pass changed SHAPES only; it did not move a single count.
//
// Coordinates are the other way round: after that pass the shipped
// js/stroke-data.js is authoritative, not the tables in prompt-A §2.2–2.4.
// This script therefore checks coordinate STRUCTURE (ranges, point counts,
// slot names), never specific coordinate values.
// ══════════════════════════════════════════════════════════════════════════
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const UTIL_FILE = path.join(ROOT, 'js', 'hangul-util.js');
const DATA_FILE = path.join(ROOT, 'js', 'stroke-data.js');

// ── expected stroke counts (spec §3.2) ────────────────────────────────────
const STROKE_COUNTS = {
  consonants: {
    'ㄱ': 1, 'ㄴ': 1, 'ㄷ': 2, 'ㄹ': 3, 'ㅁ': 3, 'ㅂ': 4, 'ㅅ': 2,
    'ㅇ': 1, 'ㅈ': 2, 'ㅊ': 3, 'ㅋ': 2, 'ㅌ': 3, 'ㅍ': 4, 'ㅎ': 3,
  },
  doubles: {
    'ㄲ': 2, 'ㄸ': 4, 'ㅃ': 8, 'ㅆ': 4, 'ㅉ': 4,
  },
  vowels: {
    'ㅏ': 2, 'ㅑ': 3, 'ㅓ': 2, 'ㅕ': 3, 'ㅗ': 2,
    'ㅛ': 3, 'ㅜ': 2, 'ㅠ': 3, 'ㅡ': 1, 'ㅣ': 1,
  },
  compoundVowels: {
    'ㅐ': 3, 'ㅒ': 4, 'ㅔ': 3, 'ㅖ': 4, 'ㅘ': 4, 'ㅙ': 5,
    'ㅚ': 3, 'ㅝ': 4, 'ㅞ': 5, 'ㅟ': 3, 'ㅢ': 2,
  },
  compoundBatchim: {
    'ㄳ': 3, 'ㄵ': 3, 'ㄶ': 4, 'ㄺ': 4, 'ㄻ': 6, 'ㄼ': 7,
    'ㄽ': 5, 'ㄾ': 6, 'ㄿ': 7, 'ㅀ': 6, 'ㅄ': 6,
  },
};

const EXPECTED = Object.assign({}, ...Object.values(STROKE_COUNTS));

const LAYOUT_KEYS = ['v', 'h', 'm', 'vf', 'hf', 'mf', 'jamo'];
// `jamo` is the bare-letter (no syllable) frame. It carries FOUR boxes, not
// one: the measured font ink of a consonant, a vertical vowel, a horizontal
// vowel and a mixed vowel differ too much for a single box to centre them all
// (calibration pass 2026-07-24). solo = consonants, solo_v/_h/_m = vowels by
// HangulUtil.vowelClass.
const LAYOUT_SLOTS = {
  v:    ['cho', 'jung'],
  h:    ['cho', 'jung'],
  m:    ['cho', 'jung'],
  vf:   ['cho', 'jung', 'jong'],
  hf:   ['cho', 'jung', 'jong'],
  mf:   ['cho', 'jung', 'jong'],
  jamo: ['solo', 'solo_v', 'solo_h', 'solo_m'],
};

// ── failure collection — never bail on the first problem ──────────────────
const failures = [];
function fail(section, msg) { failures.push(section + ': ' + msg); }
function pass(msg) { console.log('  ✓ ' + msg); }

// ── load the modules (graceful, no stack traces) ──────────────────────────
function load(file, label) {
  if (!fs.existsSync(file)) {
    console.error('ERROR: ' + label + ' not found at ' + path.relative(ROOT, file).replace(/\\/g, '/'));
    console.error('       This file is created by prompt-A-foundation.md. Nothing to validate yet.');
    process.exit(1);
  }
  try {
    const mod = require(file);
    if (!mod || typeof mod !== 'object') {
      console.error('ERROR: ' + label + ' did not export an object (missing `module.exports` tail?).');
      process.exit(1);
    }
    return mod;
  } catch (err) {
    console.error('ERROR: could not load ' + label + ' — ' + err.message);
    console.error('       (it must be requireable from node: no DOM access at load time)');
    process.exit(1);
  }
}

const HangulUtil = load(UTIL_FILE, 'js/hangul-util.js');
const HangulStrokes = load(DATA_FILE, 'js/stroke-data.js');

for (const key of ['CHO', 'JUNG', 'JONG']) {
  if (!Array.isArray(HangulUtil[key])) {
    console.error('ERROR: HangulUtil.' + key + ' is missing or not an array.');
    process.exit(1);
  }
}
if (typeof HangulUtil.vowelClass !== 'function') {
  console.error('ERROR: HangulUtil.vowelClass is missing or not a function.');
  process.exit(1);
}
for (const key of ['shapes', 'composites', 'layouts']) {
  if (!HangulStrokes[key] || typeof HangulStrokes[key] !== 'object') {
    console.error('ERROR: HangulStrokes.' + key + ' is missing or not an object.');
    process.exit(1);
  }
}

const shapes = HangulStrokes.shapes;
const composites = HangulStrokes.composites;
const layouts = HangulStrokes.layouts;

console.log('validate-stroke-data — ' +
  Object.keys(shapes).length + ' shapes, ' +
  Object.keys(composites).length + ' composites\n');

// ── resolver: strokes for a jamo, recursing through composites ────────────
// depth 0 = the jamo itself. A composite may reference another composite
// (ㅙ → ㅐ), so composite nesting is allowed at depth 0 and 1 only (≤ 2).
const resolveCache = new Map();

function resolveStrokes(ch, depth, chain, origin) {
  if (chain.includes(ch)) {
    fail('coverage', 'cycle detected: ' + chain.concat(ch).join(' → '));
    return null;
  }
  if (depth === 0 && resolveCache.has(ch)) return resolveCache.get(ch);

  let result = null;
  if (Object.prototype.hasOwnProperty.call(shapes, ch)) {
    const s = shapes[ch];
    if (!s || !Array.isArray(s.strokes)) {
      fail('coverage', "shapes['" + ch + "'] has no strokes array");
    } else {
      result = s.strokes.length;
    }
  } else if (Object.prototype.hasOwnProperty.call(composites, ch)) {
    if (depth > 1) {
      fail('coverage', "composite '" + ch + "' nested deeper than 2 levels (via " +
        chain.join(' → ') + ')');
      return null;
    }
    const c = composites[ch];
    if (!c || !Array.isArray(c.parts) || c.parts.length === 0) {
      fail('coverage', "composites['" + ch + "'] has no parts array");
    } else {
      let sum = 0;
      let ok = true;
      for (let i = 0; i < c.parts.length; i++) {
        const part = c.parts[i];
        if (!part || typeof part.ref !== 'string' || !part.ref) {
          fail('coverage', "composites['" + ch + "'].parts[" + i + '] has no ref');
          ok = false;
          continue;
        }
        const n = resolveStrokes(part.ref, depth + 1, chain.concat(ch), origin);
        if (n === null) { ok = false; continue; }
        sum += n;
      }
      if (ok) result = sum;
    }
  } else {
    fail('coverage', "'" + ch + "' is in neither shapes nor composites" +
      (chain.length ? ' (referenced by ' + chain.join(' → ') + ')' : '') +
      (origin && origin !== ch ? ' [needed by ' + origin + ']' : ''));
  }

  if (depth === 0) resolveCache.set(ch, result);
  return result;
}

// ── 1. coverage ───────────────────────────────────────────────────────────
console.log('1. coverage');
{
  const before = failures.length;
  let resolved = 0;
  let total = 0;
  const sets = [['CHO', HangulUtil.CHO], ['JUNG', HangulUtil.JUNG], ['JONG', HangulUtil.JONG]];
  for (const [name, list] of sets) {
    for (const ch of list) {
      if (ch === '') continue;
      total++;
      const n = resolveStrokes(ch, 0, [], name + ' ' + ch);
      if (n !== null) resolved++;
    }
  }
  if (failures.length === before) {
    pass(resolved + '/' + total + ' CHO+JUNG+JONG jamo resolve (refs ≤ 2 deep, no cycles)');
  } else {
    console.log('  ✗ ' + resolved + '/' + total + ' jamo resolve');
  }
}

// ── 2. stroke counts ──────────────────────────────────────────────────────
console.log('2. stroke counts');
{
  const before = failures.length;
  let checked = 0;
  for (const [group, table] of Object.entries(STROKE_COUNTS)) {
    for (const [ch, want] of Object.entries(table)) {
      checked++;
      const got = resolveStrokes(ch, 0, [], ch);
      if (got === null) {
        fail('strokes', "'" + ch + "' (" + group + ') does not resolve — expected ' + want + ' strokes');
      } else if (got !== want) {
        fail('strokes', "'" + ch + "' (" + group + ') has ' + got + ' strokes, expected ' + want);
      }
    }
  }
  // Anything in the data but absent from the table is undeclared drift.
  for (const ch of Object.keys(shapes)) {
    if (!(ch in EXPECTED)) fail('strokes', "shapes['" + ch + "'] is not in the stroke-count table");
  }
  for (const ch of Object.keys(composites)) {
    if (!(ch in EXPECTED)) fail('strokes', "composites['" + ch + "'] is not in the stroke-count table");
  }
  if (failures.length === before) pass(checked + '/' + checked + ' jamo match the reference table exactly');
  else console.log('  ✗ ' + checked + ' jamo checked against the reference table');
}

// ── 3. geometry ───────────────────────────────────────────────────────────
console.log('3. geometry');
function num(v) { return typeof v === 'number' && Number.isFinite(v); }
function inRange(v) { return num(v) && v >= 0 && v <= 100; }

// One primitive, wherever it lives (base strokes or a positional variant).
function checkStroke(at, st) {
  if (!st || typeof st !== 'object') { fail('geometry', at + ' is not an object'); return; }
  if (st.type === 'line' || st.type === 'poly') {
    if (!Array.isArray(st.pts)) { fail('geometry', at + ' (' + st.type + ') has no pts array'); return; }
    if (st.type === 'line' && st.pts.length !== 2) {
      fail('geometry', at + ' (line) has ' + st.pts.length + ' pts, expected exactly 2');
    }
    if (st.type === 'poly' && st.pts.length < 3) {
      fail('geometry', at + ' (poly) has ' + st.pts.length + ' pts, expected ≥ 3');
    }
    st.pts.forEach((p, j) => {
      if (!Array.isArray(p) || p.length !== 2) {
        fail('geometry', at + '.pts[' + j + '] is not an [x,y] pair');
        return;
      }
      if (!inRange(p[0])) fail('geometry', at + '.pts[' + j + '] x=' + p[0] + ' outside [0,100]');
      if (!inRange(p[1])) fail('geometry', at + '.pts[' + j + '] y=' + p[1] + ' outside [0,100]');
    });
  } else if (st.type === 'circle') {
    if (!Array.isArray(st.c) || st.c.length !== 2 || !num(st.c[0]) || !num(st.c[1])) {
      fail('geometry', at + ' (circle) needs c as two numbers');
      return;
    }
    if (!num(st.r) || st.r <= 0) {
      fail('geometry', at + ' (circle) needs r > 0, got ' + st.r);
      return;
    }
    if (!inRange(st.c[0])) fail('geometry', at + ' (circle) cx=' + st.c[0] + ' outside [0,100]');
    if (!inRange(st.c[1])) fail('geometry', at + ' (circle) cy=' + st.c[1] + ' outside [0,100]');
    const ext = [
      ['cx-r', st.c[0] - st.r], ['cx+r', st.c[0] + st.r],
      ['cy-r', st.c[1] - st.r], ['cy+r', st.c[1] + st.r],
    ];
    for (const [label, v] of ext) {
      if (v < 0 || v > 100) fail('geometry', at + ' (circle) extent ' + label + '=' + v + ' outside [0,100]');
    }
  } else {
    fail('geometry', at + " has unknown type '" + st.type + "' (expected line|poly|circle)");
  }
}

// A variant slot holds either `{ strokes:[…] }` or a bare array of primitives
// (prompt B §4). Returns the stroke array, or null after recording a failure.
function variantStrokes(at, v) {
  if (Array.isArray(v)) return v;
  if (v && typeof v === 'object' && Array.isArray(v.strokes)) return v.strokes;
  fail('geometry', at + ' is neither an array of strokes nor { strokes:[…] }');
  return null;
}

{
  const before = failures.length;
  let strokeCount = 0;
  let variantCount = 0;
  for (const [ch, shape] of Object.entries(shapes)) {
    const list = (shape && Array.isArray(shape.strokes)) ? shape.strokes : [];
    list.forEach((st, i) => {
      strokeCount++;
      checkStroke("shapes['" + ch + "'].strokes[" + i + ']', st);
    });

    // Positional variants (prompt B §4). `variants: {}` is normal — ship state
    // has no variants at all, so this loop is a no-op until one is added.
    const variants = shape && shape.variants;
    if (variants === undefined || variants === null) continue;
    if (typeof variants !== 'object' || Array.isArray(variants)) {
      fail('geometry', "shapes['" + ch + "'].variants is not an object");
      continue;
    }
    for (const [slotKey, variant] of Object.entries(variants)) {
      variantCount++;
      const at = "shapes['" + ch + "'].variants." + slotKey;
      const vlist = variantStrokes(at, variant);
      if (vlist === null) continue;
      // A variant is an alternate DRAWING of the same letter — same strokes,
      // different shape. A different count would desync the lesson copy,
      // the quiz answers and the validator table all at once.
      if (vlist.length !== list.length) {
        fail('geometry', at + ' has ' + vlist.length + ' strokes, expected ' +
          list.length + " (must match shapes['" + ch + "'].strokes)");
      }
      vlist.forEach((st, i) => {
        strokeCount++;
        checkStroke(at + '.strokes[' + i + ']', st);
      });
    }
  }
  if (failures.length === before) {
    pass(strokeCount + ' primitives inside [0,100] with valid point counts' +
      ' (' + variantCount + ' variant' + (variantCount === 1 ? '' : 's') + ' checked)');
  } else {
    console.log('  ✗ ' + strokeCount + ' primitives checked');
  }
}

// ── 4. boxes ──────────────────────────────────────────────────────────────
console.log('4. boxes');
function checkBox(at, box) {
  if (!Array.isArray(box) || box.length !== 4 || !box.every(num)) {
    fail('boxes', at + ' is not an [x,y,w,h] of four numbers');
    return false;
  }
  const [x, y, w, h] = box;
  let ok = true;
  if (x < 0) { fail('boxes', at + ' x=' + x + ' < 0'); ok = false; }
  if (y < 0) { fail('boxes', at + ' y=' + y + ' < 0'); ok = false; }
  if (w <= 0) { fail('boxes', at + ' w=' + w + ' must be > 0'); ok = false; }
  if (h <= 0) { fail('boxes', at + ' h=' + h + ' must be > 0'); ok = false; }
  if (x + w > 100) { fail('boxes', at + ' x+w=' + (x + w) + ' > 100'); ok = false; }
  if (y + h > 100) { fail('boxes', at + ' y+h=' + (y + h) + ' > 100'); ok = false; }
  return ok;
}

{
  const before = failures.length;
  let boxCount = 0;
  for (const [ch, comp] of Object.entries(composites)) {
    const parts = (comp && Array.isArray(comp.parts)) ? comp.parts : [];
    parts.forEach((part, i) => {
      boxCount++;
      checkBox("composites['" + ch + "'].parts[" + i + '].box', part && part.box);
    });
  }
  for (const [key, layout] of Object.entries(layouts)) {
    if (!layout || typeof layout !== 'object') continue;
    for (const [slot, box] of Object.entries(layout)) {
      boxCount++;
      checkBox("layouts." + key + '.' + slot, box);
    }
  }
  if (failures.length === before) pass(boxCount + ' composite + layout boxes stay inside the 100×100 frame');
  else console.log('  ✗ ' + boxCount + ' boxes checked');
}

// ── 5. layouts ────────────────────────────────────────────────────────────
// Slot PRESENCE only — every slot box found here is also geometry-checked by
// section 4, which walks all of `layouts`. Re-checking would double-report.
console.log('5. layouts');
{
  const before = failures.length;
  const got = Object.keys(layouts);
  for (const k of LAYOUT_KEYS) {
    if (!got.includes(k)) fail('layouts', "missing archetype '" + k + "'");
  }
  for (const k of got) {
    if (!LAYOUT_KEYS.includes(k)) fail('layouts', "unexpected archetype '" + k + "' (allowed: " + LAYOUT_KEYS.join(',') + ')');
  }
  for (const [k, wantSlots] of Object.entries(LAYOUT_SLOTS)) {
    const layout = layouts[k];
    if (!layout || typeof layout !== 'object') continue;
    const slots = Object.keys(layout);
    for (const s of wantSlots) {
      if (!slots.includes(s)) fail('layouts', "layouts." + k + " is missing slot '" + s + "'");
    }
    for (const s of slots) {
      if (!wantSlots.includes(s)) fail('layouts', 'layouts.' + k + " has unexpected slot '" + s + "' (allowed: " + wantSlots.join(',') + ')');
    }
  }
  if (failures.length === before) pass(LAYOUT_KEYS.length + ' archetypes with exactly the expected slots (jamo: solo + solo_v/_h/_m)');
  else console.log('  ✗ layout archetypes checked');
}

// ── 6. vowel classes ──────────────────────────────────────────────────────
console.log('6. vowel classes');
{
  const before = failures.length;
  let classified = 0;
  for (const ch of HangulUtil.JUNG) {
    if (ch === '') continue;
    let cls;
    try {
      cls = HangulUtil.vowelClass(ch);
    } catch (err) {
      fail('vowels', "vowelClass('" + ch + "') threw: " + err.message);
      continue;
    }
    if (cls !== 'v' && cls !== 'h' && cls !== 'm') {
      fail('vowels', "vowelClass('" + ch + "') returned " + JSON.stringify(cls) + ", expected 'v'|'h'|'m'");
    } else {
      classified++;
    }
  }
  const spot = [['ㅏ', 'v'], ['ㅗ', 'h'], ['ㅘ', 'm'], ['ㅢ', 'm']];
  for (const [ch, want] of spot) {
    let cls;
    try {
      cls = HangulUtil.vowelClass(ch);
    } catch (err) {
      fail('vowels', "vowelClass('" + ch + "') threw: " + err.message);
      continue;
    }
    if (cls !== want) {
      fail('vowels', "vowelClass('" + ch + "') === " + JSON.stringify(cls) + ", expected '" + want + "'");
    }
  }
  if (failures.length === before) {
    pass(classified + '/' + classified + " JUNG chars classify as v|h|m (spot checks ㅏ=v ㅗ=h ㅘ=m ㅢ=m)");
  } else {
    console.log('  ✗ vowel classification');
  }
}

// ── report ────────────────────────────────────────────────────────────────
const jamoResolved = ['CHO', 'JUNG', 'JONG']
  .reduce((n, k) => n + HangulUtil[k].filter(c => c !== '').length, 0);

if (failures.length) {
  console.log('\n' + failures.length + ' FAILURE' + (failures.length === 1 ? '' : 'S') + ':');
  for (const f of failures) console.log('  ✗ ' + f);
  process.exit(1);
}

console.log('\n✓ stroke data valid: ' +
  Object.keys(shapes).length + ' shapes, ' +
  Object.keys(composites).length + ' composites, ' +
  jamoResolved + ' jamo resolved');
