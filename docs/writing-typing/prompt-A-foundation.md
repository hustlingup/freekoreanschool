# Prompt A — Foundation: hangul-util.js, stroke-data.js, validator

Read `docs/writing-typing/00-overview.md` first, then execute this prompt. No UI in this phase — three files, all verifiable from node.

**Repo**: freekoreanschool.com, vanilla JS, no build step. Working directory = repo root.

**Create:**
1. `js/hangul-util.js`
2. `js/stroke-data.js`
3. `scripts/validate-stroke-data.cjs`

Do not modify any existing file.

---

## 1. `js/hangul-util.js`

IIFE module in the style of `js/syllable-builder.js`. Exposes `window.HangulUtil` (guard: `if (typeof window !== 'undefined') window.HangulUtil = HangulUtil;`) and ends with `if (typeof module !== 'undefined') module.exports = HangulUtil;`. No DOM access.

```js
'use strict';

const HangulUtil = (() => {
  // Index → char. Order is the Unicode standard order — do not reorder.
  const CHO  = ['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];                     // 19
  const JUNG = ['ㅏ','ㅐ','ㅑ','ㅒ','ㅓ','ㅔ','ㅕ','ㅖ','ㅗ','ㅘ','ㅙ','ㅚ','ㅛ','ㅜ','ㅝ','ㅞ','ㅟ','ㅠ','ㅡ','ㅢ','ㅣ'];             // 21
  const JONG = ['','ㄱ','ㄲ','ㄳ','ㄴ','ㄵ','ㄶ','ㄷ','ㄹ','ㄺ','ㄻ','ㄼ','ㄽ','ㄾ','ㄿ','ㅀ','ㅁ','ㅂ','ㅄ','ㅅ','ㅆ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ']; // 28, [0] = ''

  const JUNG_COMBINE = { 'ㅗㅏ':'ㅘ','ㅗㅐ':'ㅙ','ㅗㅣ':'ㅚ','ㅜㅓ':'ㅝ','ㅜㅔ':'ㅞ','ㅜㅣ':'ㅟ','ㅡㅣ':'ㅢ','ㅏㅣ':'ㅐ','ㅑㅣ':'ㅒ','ㅓㅣ':'ㅔ','ㅕㅣ':'ㅖ' };
  const JONG_COMBINE = { 'ㄱㅅ':'ㄳ','ㄴㅈ':'ㄵ','ㄴㅎ':'ㄶ','ㄹㄱ':'ㄺ','ㄹㅁ':'ㄻ','ㄹㅂ':'ㄼ','ㄹㅅ':'ㄽ','ㄹㅌ':'ㄾ','ㄹㅍ':'ㄿ','ㄹㅎ':'ㅀ','ㅂㅅ':'ㅄ' };
  const JONG_SPLIT   = {}; // built by inverting JONG_COMBINE: JONG_SPLIT['ㄳ'] = ['ㄱ','ㅅ'] etc.

  const V_VERT  = 'ㅏㅐㅑㅒㅓㅔㅕㅖㅣ';
  const V_HORIZ = 'ㅗㅛㅜㅠㅡ';
  const V_MIXED = 'ㅘㅙㅚㅝㅞㅟㅢ';

  function compose(choIdx, jungIdx, jongIdx) {
    return String.fromCodePoint(0xAC00 + (choIdx * 21 + jungIdx) * 28 + (jongIdx || 0));
  }

  // Returns { cho, jung, jong } as CHARS (jong '' when absent), or null if not a composed syllable.
  function decompose(char) {
    const cp = char.codePointAt(0);
    if (cp < 0xAC00 || cp > 0xD7A3) return null;
    const n = cp - 0xAC00;
    return {
      cho:  CHO[Math.floor(n / 28 / 21)],
      jung: JUNG[Math.floor(n / 28) % 21],
      jong: JONG[n % 28],
    };
  }

  function isSyllable(char) { /* cp in [0xAC00, 0xD7A3] */ }
  function isJamo(char)     { /* compatibility jamo block: cp in [0x3131, 0x3163] */ }
  function vowelClass(jungChar) { /* 'v' | 'h' | 'm' from the three strings above; null if not a vowel */ }

  return { CHO, JUNG, JONG, JUNG_COMBINE, JONG_COMBINE, JONG_SPLIT,
           compose, decompose, isSyllable, isJamo, vowelClass };
})();
```

`compose` must also accept a variant taking chars (look up indices via `indexOf`) OR keep it index-only — pick index-only and document it in the header comment; callers convert with `CHO.indexOf(ch)`.

## 2. `js/stroke-data.js`

> ⚠️ **Coordinates below are SUPERSEDED — corrected 2026-07-24.** The calibration pass mandated by prompt B §4 was executed on 2026-07-24 against measured Noto Sans KR glyph ink, and the shipped **`js/stroke-data.js` is now the single source of truth for every coordinate** on this page. The tables in §2.2, §2.3 and §2.4 are the *pre-calibration starting values*, kept for provenance only — do not copy them into the data, do not "restore" the data to match them, and do not retype the calibrated numbers into this doc (they would drift on the next pass). What remains binding here is **structure**, not values: the primitive types (§2.1), the stroke order and stroke counts (§2.2 rationale), the composite ref graph (§2.3), and the layout archetype/slot contract (§2.4). `scripts/validate-stroke-data.cjs` enforces exactly that split — it checks stroke counts and coordinate structure, never specific coordinate values.
>
> The calibration changed shapes only. **No stroke count moved**; ㅎ = 3 and ㅊ = 3 still hold.

Same module pattern: `window.HangulStrokes` global + `module.exports` tail. Pure data, three keys: `shapes`, `composites`, `layouts`.

### 2.1 Primitive types

Each stroke is one of:

- `{ type:'line', pts:[[x1,y1],[x2,y2]] }` — straight stroke. Point order = pen direction.
- `{ type:'poly', pts:[[x,y],…] }` — one continuous bent stroke (e.g. ㄱ is a single stroke: right, then down).
- `{ type:'circle', c:[cx,cy], r:R }` — drawn starting at the top point, counterclockwise (Korean handwriting convention for ㅇ). Under non-uniform scaling it becomes an ellipse — the engine handles that; you only store `c` and `r`.

All coordinates live in the jamo's own `0 0 100 100` box. Stroke array order = writing order. Pen direction rules baked into the data below: horizontals left→right, verticals top→bottom.

### 2.2 The 24 base shapes — copy these coordinates EXACTLY

These are calibrated starting values; prompt B has a visual tuning pass, so do not improvise here.

```js
shapes: {
  // ── consonants ──
  'ㄱ': { strokes: [ {type:'poly',  pts:[[15,18],[82,18],[82,88]]} ] },
  'ㄴ': { strokes: [ {type:'poly',  pts:[[18,12],[18,82],[85,82]]} ] },
  'ㄷ': { strokes: [ {type:'line',  pts:[[18,18],[82,18]]},
                     {type:'poly',  pts:[[18,18],[18,82],[82,82]]} ] },
  'ㄹ': { strokes: [ {type:'poly',  pts:[[15,15],[82,15],[82,48]]},
                     {type:'line',  pts:[[15,48],[82,48]]},
                     {type:'poly',  pts:[[15,48],[15,85],[85,85]]} ] },
  'ㅁ': { strokes: [ {type:'line',  pts:[[18,15],[18,85]]},
                     {type:'poly',  pts:[[18,15],[82,15],[82,85]]},
                     {type:'line',  pts:[[18,85],[82,85]]} ] },
  'ㅂ': { strokes: [ {type:'line',  pts:[[18,12],[18,88]]},
                     {type:'line',  pts:[[82,12],[82,88]]},
                     {type:'line',  pts:[[18,50],[82,50]]},
                     {type:'line',  pts:[[18,88],[82,88]]} ] },
  'ㅅ': { strokes: [ {type:'line',  pts:[[50,15],[15,85]]},
                     {type:'line',  pts:[[38,40],[85,85]]} ] },
  'ㅇ': { strokes: [ {type:'circle', c:[50,50], r:35} ] },
  'ㅈ': { strokes: [ {type:'poly',  pts:[[15,20],[80,20],[22,88]]},
                     {type:'line',  pts:[[50,48],[85,88]]} ] },
  'ㅊ': { strokes: [ {type:'line',  pts:[[38,8],[62,8]]},
                     {type:'poly',  pts:[[15,30],[80,30],[22,90]]},
                     {type:'line',  pts:[[50,56],[85,90]]} ] },
  'ㅋ': { strokes: [ {type:'poly',  pts:[[15,18],[82,18],[82,88]]},
                     {type:'line',  pts:[[15,52],[82,52]]} ] },
  'ㅌ': { strokes: [ {type:'line',  pts:[[18,15],[82,15]]},
                     {type:'line',  pts:[[18,50],[82,50]]},
                     {type:'poly',  pts:[[18,15],[18,85],[82,85]]} ] },
  'ㅍ': { strokes: [ {type:'line',  pts:[[15,18],[85,18]]},
                     {type:'line',  pts:[[32,18],[32,82]]},
                     {type:'line',  pts:[[68,18],[68,82]]},
                     {type:'line',  pts:[[15,82],[85,82]]} ] },
  'ㅎ': { strokes: [ {type:'line',  pts:[[36,6],[64,6]]},
                     {type:'line',  pts:[[18,26],[82,26]]},
                     {type:'circle', c:[50,64], r:24} ] },
  // ── vowels ──
  'ㅏ': { strokes: [ {type:'line', pts:[[35,8],[35,92]]},
                     {type:'line', pts:[[35,50],[78,50]]} ] },
  'ㅑ': { strokes: [ {type:'line', pts:[[35,8],[35,92]]},
                     {type:'line', pts:[[35,33],[78,33]]},
                     {type:'line', pts:[[35,66],[78,66]]} ] },
  'ㅓ': { strokes: [ {type:'line', pts:[[22,50],[62,50]]},
                     {type:'line', pts:[[62,8],[62,92]]} ] },
  'ㅕ': { strokes: [ {type:'line', pts:[[22,33],[60,33]]},
                     {type:'line', pts:[[22,66],[60,66]]},
                     {type:'line', pts:[[60,8],[60,92]]} ] },
  'ㅗ': { strokes: [ {type:'line', pts:[[50,12],[50,58]]},
                     {type:'line', pts:[[8,58],[92,58]]} ] },
  'ㅛ': { strokes: [ {type:'line', pts:[[35,12],[35,58]]},
                     {type:'line', pts:[[65,12],[65,58]]},
                     {type:'line', pts:[[8,58],[92,58]]} ] },
  'ㅜ': { strokes: [ {type:'line', pts:[[8,42],[92,42]]},
                     {type:'line', pts:[[50,42],[50,88]]} ] },
  'ㅠ': { strokes: [ {type:'line', pts:[[8,42],[92,42]]},
                     {type:'line', pts:[[35,42],[35,88]]},
                     {type:'line', pts:[[65,42],[65,88]]} ] },
  'ㅡ': { strokes: [ {type:'line', pts:[[8,50],[92,50]]} ] },
  'ㅣ': { strokes: [ {type:'line', pts:[[50,8],[50,92]]} ] },
},
```

Stroke-order rationale (fixed convention, matches the lesson copy in prompt C):
- ㄱ 1 · ㄴ 1 · ㄷ 2 (top bar, then ㄴ-motion) · ㄹ 3 (ㄱ-motion, middle bar, ㄴ-motion) · ㅁ 3 (left vertical, ㄱ-motion, bottom bar) · ㅂ 4 (left vertical, right vertical, middle bar, bottom bar) · ㅅ 2 (left leg from apex, right leg starting on the left leg) · ㅇ 1 · **ㅈ 2** (bar + left sweep as ONE stroke, then right leg) · **ㅊ 3** · ㅋ 2 · ㅌ 3 (top bar, middle bar, ㄴ-motion) · ㅍ 4 · ㅎ 3 (top tick, wide bar, circle)
- ㅏ 2 (vertical, then tick) · ㅑ 3 · **ㅓ 2 (tick FIRST, then vertical)** · ㅕ 3 (two ticks, then vertical) · ㅗ 2 (short vertical, then long horizontal) · ㅛ 3 · ㅜ 2 (horizontal, then vertical) · ㅠ 3 · ㅡ 1 · ㅣ 1

Optionally add an empty `variants: {}` key to each shape — the engine in prompt B reads `shapes[ch].variants?.[slotKey]` with fallback to the base strokes. Slot keys: `cho_v`, `cho_h`, `cho_m`, `jong`. Ship this phase with NO variants defined.

### 2.3 The 27 composites — copy exactly

Each part: `{ ref:'<base or composite jamo>', box:[x,y,w,h] }` placed inside the composite's own 100×100 box. Order = stroke order. Refs may point at other composites (ㅙ → ㅐ) — the engine resolves recursively; keep nesting depth ≤ 2.

```js
composites: {
  // doubles (side by side)
  'ㄲ': { parts: [ {ref:'ㄱ', box:[0,0,46,100]}, {ref:'ㄱ', box:[54,0,46,100]} ] },
  'ㄸ': { parts: [ {ref:'ㄷ', box:[0,0,46,100]}, {ref:'ㄷ', box:[54,0,46,100]} ] },
  'ㅃ': { parts: [ {ref:'ㅂ', box:[0,0,46,100]}, {ref:'ㅂ', box:[54,0,46,100]} ] },
  'ㅆ': { parts: [ {ref:'ㅅ', box:[0,0,46,100]}, {ref:'ㅅ', box:[54,0,46,100]} ] },
  'ㅉ': { parts: [ {ref:'ㅈ', box:[0,0,46,100]}, {ref:'ㅈ', box:[54,0,46,100]} ] },
  // vertical compound vowels (base + ㅣ)
  'ㅐ': { parts: [ {ref:'ㅏ', box:[0,0,55,100]}, {ref:'ㅣ', box:[40,0,55,100]} ] },
  'ㅒ': { parts: [ {ref:'ㅑ', box:[0,0,55,100]}, {ref:'ㅣ', box:[40,0,55,100]} ] },
  'ㅔ': { parts: [ {ref:'ㅓ', box:[0,0,55,100]}, {ref:'ㅣ', box:[40,0,55,100]} ] },
  'ㅖ': { parts: [ {ref:'ㅕ', box:[0,0,55,100]}, {ref:'ㅣ', box:[40,0,55,100]} ] },
  // mixed compound vowels (horizontal base + vertical tail)
  'ㅘ': { parts: [ {ref:'ㅗ', box:[0,22,55,68]}, {ref:'ㅏ', box:[52,0,48,100]} ] },
  'ㅙ': { parts: [ {ref:'ㅗ', box:[0,22,48,68]}, {ref:'ㅐ', box:[46,0,54,100]} ] },
  'ㅚ': { parts: [ {ref:'ㅗ', box:[0,22,60,68]}, {ref:'ㅣ', box:[58,0,42,100]} ] },
  'ㅝ': { parts: [ {ref:'ㅜ', box:[0,20,55,58]}, {ref:'ㅓ', box:[52,0,48,100]} ] },
  'ㅞ': { parts: [ {ref:'ㅜ', box:[0,20,48,58]}, {ref:'ㅔ', box:[46,0,54,100]} ] },
  'ㅟ': { parts: [ {ref:'ㅜ', box:[0,20,60,58]}, {ref:'ㅣ', box:[58,0,42,100]} ] },
  'ㅢ': { parts: [ {ref:'ㅡ', box:[0,25,62,55]}, {ref:'ㅣ', box:[62,0,38,100]} ] },
  // compound batchim (side by side)
  'ㄳ': { parts: [ {ref:'ㄱ', box:[0,0,46,100]}, {ref:'ㅅ', box:[54,0,46,100]} ] },
  'ㄵ': { parts: [ {ref:'ㄴ', box:[0,0,46,100]}, {ref:'ㅈ', box:[54,0,46,100]} ] },
  'ㄶ': { parts: [ {ref:'ㄴ', box:[0,0,46,100]}, {ref:'ㅎ', box:[54,0,46,100]} ] },
  'ㄺ': { parts: [ {ref:'ㄹ', box:[0,0,46,100]}, {ref:'ㄱ', box:[54,0,46,100]} ] },
  'ㄻ': { parts: [ {ref:'ㄹ', box:[0,0,46,100]}, {ref:'ㅁ', box:[54,0,46,100]} ] },
  'ㄼ': { parts: [ {ref:'ㄹ', box:[0,0,46,100]}, {ref:'ㅂ', box:[54,0,46,100]} ] },
  'ㄽ': { parts: [ {ref:'ㄹ', box:[0,0,46,100]}, {ref:'ㅅ', box:[54,0,46,100]} ] },
  'ㄾ': { parts: [ {ref:'ㄹ', box:[0,0,46,100]}, {ref:'ㅌ', box:[54,0,46,100]} ] },
  'ㄿ': { parts: [ {ref:'ㄹ', box:[0,0,46,100]}, {ref:'ㅍ', box:[54,0,46,100]} ] },
  'ㅀ': { parts: [ {ref:'ㄹ', box:[0,0,46,100]}, {ref:'ㅎ', box:[54,0,46,100]} ] },
  'ㅄ': { parts: [ {ref:'ㅂ', box:[0,0,46,100]}, {ref:'ㅅ', box:[54,0,46,100]} ] },
},
```

Note ㅐㅒㅔㅖ boxes deliberately overlap (the tick of ㅏ must reach the second vertical). That's fine — boxes are placement frames, not clip rects.

### 2.4 Layout archetypes

Slot boxes `[x, y, w, h]` in the syllable's 100×100 space. Archetype key = vowel class (`v`/`h`/`m` from `HangulUtil.vowelClass`) + `'f'` when a batchim is present; bare jamo render uses `jamo`.

```js
layouts: {
  v:    { cho:[10,12,42,76], jung:[56,5,36,90] },
  h:    { cho:[22,8,56,38],  jung:[8,48,84,44] },
  m:    { cho:[10,8,40,42],  jung:[6,6,88,88] },
  vf:   { cho:[10,8,40,52],  jung:[54,4,38,58],  jong:[15,66,70,28] },
  hf:   { cho:[24,5,52,28],  jung:[8,34,84,28],  jong:[15,68,70,26] },
  mf:   { cho:[8,5,38,34],   jung:[5,4,90,60],   jong:[15,68,70,26] },
  jamo: { solo:[15,15,70,70] },
},
```

**`layouts.jamo` carries four boxes, not one** (structural contract, added by the 2026-07-24 calibration — the coordinates above are pre-calibration and stale):

```js
jamo: { solo:[…], solo_v:[…], solo_h:[…], solo_m:[…] },
```

| slot | used for |
|---|---|
| `solo` | consonants (and anything not a vowel) |
| `solo_v` | vertical vowels — `vowelClass` `'v'` (ㅏㅐㅑㅒㅓㅔㅕㅖㅣ) |
| `solo_h` | horizontal vowels — `'h'` (ㅗㅛㅜㅠㅡ) |
| `solo_m` | mixed vowels — `'m'` (ㅘㅙㅚㅝㅞㅟㅢ) |

One box could not centre all four classes: measured font ink for a bare vertical vowel is ~0.36 wide × ~1.09 tall relative to the old 70×70 `solo` box, while a horizontal vowel is ~1.01 × ~0.55 — inverse aspect ratios. Renderers pick the slot with `'solo_' + vowelClass(ch)` for a vowel, falling back to `solo`. All four are ordinary `[x,y,w,h]` boxes and obey the §3 rule-4 bounds.

## 3. `scripts/validate-stroke-data.cjs`

Node script, style of the other `scripts/*.cjs` (plain `require`, `console.log`, exit code 1 on failure). It requires `../js/hangul-util.js` and `../js/stroke-data.js` and asserts:

1. **Coverage**: every char in `HangulUtil.CHO`, `HangulUtil.JUNG`, and `HangulUtil.JONG` (skip `''`) resolves — i.e. exists in `shapes` or in `composites` with all `ref`s recursively resolvable (depth ≤ 2, no cycles).
2. **Stroke counts** match this table EXACTLY (composites = sum of their resolved parts). Embed the table in the script as an object:
   - Consonants: ㄱ1 ㄴ1 ㄷ2 ㄹ3 ㅁ3 ㅂ4 ㅅ2 ㅇ1 ㅈ2 ㅊ3 ㅋ2 ㅌ3 ㅍ4 ㅎ3
   - Doubles: ㄲ2 ㄸ4 ㅃ8 ㅆ4 ㅉ4
   - Vowels: ㅏ2 ㅑ3 ㅓ2 ㅕ3 ㅗ2 ㅛ3 ㅜ2 ㅠ3 ㅡ1 ㅣ1
   - Compound vowels: ㅐ3 ㅒ4 ㅔ3 ㅖ4 ㅘ4 ㅙ5 ㅚ3 ㅝ4 ㅞ5 ㅟ3 ㅢ2
   - Compound batchim: ㄳ3 ㄵ3 ㄶ4 ㄺ4 ㄻ6 ㄼ7 ㄽ5 ㄾ6 ㄿ7 ㅀ6 ㅄ6
3. **Geometry**: every coordinate in every primitive is within `[0,100]`; `line` has exactly 2 pts; `poly` has ≥ 3 pts; `circle` has `c` (2 numbers) and `r > 0`; circle extents (`c ± r`) stay within `[0,100]`. This applies to **variant** stroke arrays too (`shapes[ch].variants[slotKey]`, either `{strokes:[…]}` or a bare array), and a variant's stroke **count must equal its base shape's count** — a variant is an alternate drawing of the same letter, so a differing count would desync the lesson copy, the quiz answers and the table in check 2 at once. `variants: {}` is valid and checks nothing.
4. **Boxes**: every composite `box` and every layout slot box satisfies `x,y ≥ 0`, `w,h > 0`, `x+w ≤ 100`, `y+h ≤ 100`. This is what geometry-checks the `jamo` slots — check 5 only verifies that they are present.
5. **Layouts**: keys exactly `v,h,m,vf,hf,mf,jamo`; `v/h/m` have `cho`+`jung`; `*f` also have `jong`; `jamo` has exactly `solo`, `solo_v`, `solo_h`, `solo_m` (§2.4) — no more, no fewer.
6. **Vowel classes**: every JUNG char returns `'v'|'h'|'m'` from `HangulUtil.vowelClass`; spot-assert `vowelClass('ㅏ')==='v'`, `('ㅗ')==='h'`, `('ㅘ')==='m'`, `('ㅢ')==='m'`.

Output: per-section pass lines + `✓ stroke data valid: 24 shapes, 27 composites, 67 jamo resolved` or a list of failures + `process.exit(1)`.

---

## Acceptance criteria

- Neither new js file touches the DOM at load (safe to `require` from node).
- `js/syllable-builder.js` untouched.
- All three files pass the verification below.

## Verification (run all, all must pass)

```bash
node scripts/validate-stroke-data.cjs

# compose/decompose roundtrip over all 11,172 syllables
node -e "
const H = require('./js/hangul-util.js');
let n = 0;
for (let cho = 0; cho < 19; cho++) for (let jung = 0; jung < 21; jung++) for (let jong = 0; jong < 28; jong++) {
  const ch = H.compose(cho, jung, jong);
  const d = H.decompose(ch);
  if (H.CHO[cho] !== d.cho || H.JUNG[jung] !== d.jung || H.JONG[jong] !== d.jong) { console.error('FAIL', ch); process.exit(1); }
  n++;
}
console.log('roundtrip OK:', n);
"

# spot checks
node -e "
const H = require('./js/hangul-util.js');
const d = H.decompose('햟');
console.assert(d.cho==='ㅎ' && d.jung==='ㅑ' && d.jong==='ㅀ', '햟 decompose', d);
console.assert(H.decompose('빛').jong==='ㅊ', '빛');
console.assert(H.decompose('닭').jong==='ㄺ', '닭');
console.assert(H.isJamo('ㄱ') && !H.isJamo('가') && H.isSyllable('가'), 'classify');
console.assert(H.JONG_SPLIT['ㄳ'][0]==='ㄱ' && H.JONG_SPLIT['ㄳ'][1]==='ㅅ', 'split');
console.log('spot checks OK');
"
```

Expected: `roundtrip OK: 11172`, both spot-check lines, validator success line.
