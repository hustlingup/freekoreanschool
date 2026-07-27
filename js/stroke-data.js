/* ═══════════════════════════════════════════════════════
   HangulStrokes — stroke-order geometry for hangul
   (Pure data. No DOM access at load; safe to require()
   from node. Consumed by js/stroke-writer.js, which
   converts these primitives into absolute-coordinate SVG
   path `d` strings with transforms baked in numerically.)

   ── Primitive types ────────────────────────────────────
   Every stroke is exactly one of:

     { type:'line',   pts:[[x1,y1],[x2,y2]] }
        A straight stroke. Point order IS the pen
        direction (start → end).

     { type:'poly',   pts:[[x,y],…] }
        ONE continuous bent stroke — not several strokes.
        e.g. ㄱ is a single poly: right, then down.
        Points are traversed in pen order.

     { type:'circle', c:[cx,cy], r:R }
        Drawn starting at the TOP point and travelling
        counterclockwise (Korean handwriting convention
        for ㅇ / the ㅎ bowl). Under non-uniform slot
        scaling it renders as an ellipse — the engine
        handles that; only `c` and `r` are stored here.

   ── Coordinate space ───────────────────────────────────
   All coordinates live in the jamo's OWN normalized
   `0 0 100 100` box. Nothing here is in syllable space;
   placement into a syllable happens via `composites[].box`
   and `layouts[]` slot boxes, both also `[x,y,w,h]` in a
   100×100 space. Raw SVG `d` strings never appear in data.

   ── Ordering + pen-direction rules ─────────────────────
   • The `strokes` array order IS the writing order.
   • The `parts` array order of a composite IS its stroke
     order (parts expand in place), so recipes inherit
     correct ordering for free.
   • Horizontals are written left → right.
   • Verticals are written top → bottom.
   • Diagonals are written from the apex outward/downward.
   • Fixed convention: ㅈ = 2 strokes, ㅊ = 3 strokes;
     ㅓ writes the tick FIRST, then the vertical.

   Each base shape carries a `variants: {}` map, read by
   the engine as `shapes[ch].variants?.[slotKey]` with
   fallback to the base `strokes`. Slot keys: `cho_v`,
   `cho_h`, `cho_m`, `jong`. Exactly TWO variants exist —
   `ㄱ.cho_v` and `ㅋ.cho_v` — see the variant note below.
   A variant's stroke COUNT must equal its base's.

   ═══════════════════════════════════════════════════════
   ── CALIBRATION (2026-07-24) ───────────────────────────
   Every coordinate below was refitted against measured
   Noto Sans KR outline geometry (fontTools raster of the
   real glyphs, expressed in this same 0..100 viewBox).
   The numbers, not taste, are the spec.

   Frame: the measured y values are corrected by −4.816
   units before use. The ?swdebug=1 reference glyph is
   drawn with `dominant-baseline:central`, which Blink
   resolves from usWinAscent/Descent (baselineY 87.496)
   rather than Noto's ideographic centre (82.680) — so the
   raw rendered glyph sits 4.816 units BELOW the box
   centre. Calibrating to the raw render would have put
   every stroke 4.8 units low once that overlay is fixed.

   Per-class solo boxes: a single `jamo.solo` box cannot
   fit both consonants and vowels — consonant ink is wide
   and short, vertical-vowel ink is narrow and tall, and
   horizontal-vowel ink is wide and very short. The four
   boxes below are least-squares fits of
   `measured = a·authored + b` per axis, per class:
     solo    consonants      X [18.5 .. +63.9]  Y (see below)
     solo_v  ㅏㅑㅓㅕㅣ + kin  X [31   .. +42.9]
     solo_h  ㅗㅛㅜㅠㅡ        X [ 6.3 .. +87.5]
     solo_m  compound ㅘ…     union of solo_v and solo_h
   The consonant Y size (53) comes from the ㅊ/ㅎ-excluded
   fit (0.5275); solo_v/solo_h Y were re-derived after the
   vowel shapes were rebuilt, because the raw Y fit for the
   horizontal vowels was degenerate (origin −16, size 145)
   — proof that the ㅗ/ㅜ SHAPES were wrong, not the box.
   Authored ㅗ/ㅜ bars sat at 58/42 (spread 16, mirrored
   about 50); the font puts them 22 apart, mirrored about
   52.2. Both were rebuilt.

   ㅎ / ㅊ top tick: measured as a short, near-upright mark
   (ㅎ 7.0×10.0 aspect 0.70, ㅊ 7.5×11.0 aspect 0.68),
   centred on x≈50 and FUSED to the bar below it (measured
   gap 0.00), protruding 10 / 11 units above the bar's top
   edge. It is authored here as a ~75° diagonal drawn from
   the apex downward, matching the pen-direction rule
   above. It is deliberately NOT the horizontal dash the
   data used to carry: that form comes from English learner
   charts, not from 훈민정음 or from any 고딕 typeface, and
   국립국어원 records no official rule either way. Same
   treatment on both letters — the consistency is the
   point. Stroke counts are untouched: ㅎ = 3, ㅊ = 3.

   ㅊ crowding: with the Y scale dropping from 0.70 to
   0.527, the OLD ㅊ (tick y=8, bar y=30) collapses to a
   3.66-unit gap between the tick's ink and the ㅈ-poly's
   apex — two near-parallel horizontals almost touching.
   The fix is structural, not "nudge the tick up": ㅊ's
   ㅈ-part is re-seated at the measured bar height (39.2
   rendered, 7 units lower than a standalone ㅈ — the font
   makes room for the tick by shortening the ㅈ, not by
   cramping the mark), and the tick becomes a diagonal that
   fuses into that bar exactly as the outline does.

   ── VARIANTS (2026-07-24, second pass) ─────────────────
   ㄱ and ㅋ get a `cho_v` variant: before a vertical vowel
   the font does NOT draw the leg straight down.

   The first pass declined this for lack of evidence — the
   metric set only had cho BOUNDING BOXES, which cannot
   tell a slanted leg from a vertical one. That gap is now
   closed: the leg's centreline is extracted row by row
   from the rasterised cho and measured directly. In the
   jamo's own 0..100 box, leg top x → bottom x:

     ㄱ  cho_v  78.3 → 17.0   (Δ −61.4, 43.2° off vertical)
     ㅋ  cho_v  83.2 → 18.4   (Δ −64.8, 43.1° off vertical)
     ㄱ  cho_h  81.4 → 81.2   (Δ  −0.2,  0.5°)  ← straight
     ㅋ  cho_h  81.9 → 81.0   (Δ  −0.9,  1.4°)  ← straight

   So the slant is real, it is ~43°, it is the SAME for
   both letters (not forced symmetry — measured
   independently), and it is absent before horizontal
   vowels. Hence `cho_v` only; there is deliberately no
   `cho_h`, no `cho_m` and no `jong` variant.

   The leg is a smooth ARC, near-vertical at the corner and
   steepening as it descends. A straight diagonal — the
   form prompt-B §4 suggested — misses the ink by 5.3–5.4
   rendered units at mid-leg, most of a stroke width. One
   interior knot brings it to 2.9 mean / 5.2 worst, against
   28.2 mean / 30.3 worst for the base straight-down leg.
   The knot costs no strokes: ㄱ stays one poly, ㅋ stays
   poly + bar.

   Pinned to the base on purpose: the top bar's y, the
   corner x, and the leg's bottom y. The layouts[*].cho
   boxes were least-squares fitted to the ink extent of the
   BASE shapes, so a variant that changed that extent would
   silently invalidate them. What does change is measured
   and positional (differs between cho_v and cho_h by more
   than the ~1-unit calibration noise):
     • the leg path (above);
     • the top bar's left end — cho_v ㄱ 24.0 / ㅋ 26.4 vs
       cho_h ㄱ 18.5 / ㅋ 19.5, the latter being what the
       base already carries;
     • ㅋ's middle bar height, which rides up from 53 to a
       measured 44.3 (v) / 49.6 (vf). 47.5 is the minimax
       over both, worst error 2.5 rendered units vs 6.3 for
       the base's 53.
   ㅋ's middle-bar LEFT end is NOT positional (v 18.5, vf
   17.2, h 16.8) so it keeps the base value; its RIGHT end
   is moved to 65.5 so it terminates ON the diagonal, which
   is where the outline fuses it.

   Verified by baking through BOTH archetypes that use this
   slot key — `v` and `vf`, since slotKey is
   'cho_' + vowelClass(jung) and ignores the batchim — over
   가 개 갸 기 갈 감 김 겁 카 키 킬 캄. Worst residual is
   개 at 5.2 rendered units, still inside the 8-unit stroke;
   개's cho is genuinely narrowed by the wide ㅐ, which is a
   layout-box limitation, not a shape one.
═══════════════════════════════════════════════════════ */

'use strict';

const HangulStrokes = (() => {
  const shapes = {
    // ── consonants ──
    // cho_v: before a vertical vowel the leg sweeps down-LEFT at ~43°, as an
    // arc — near-vertical at the corner, steepening as it falls. Still 1 stroke.
    'ㄱ': { variants: {
              cho_v: { strokes: [ {type:'poly', pts:[[24,18],[81,18],[63,59.5],[24.5,82.5]]} ] },
            },
            strokes: [ {type:'poly',  pts:[[17.5,18],[81,18],[81,82.5]]} ] },
    'ㄴ': { variants: {}, strokes: [ {type:'poly',  pts:[[17.5,20],[17.5,82.5],[83,82.5]]} ] },
    'ㄷ': { variants: {}, strokes: [ {type:'line',  pts:[[18,17.5],[80.5,17.5]]},
                                     {type:'poly',  pts:[[18,17.5],[18,84],[82,84]]} ] },
    'ㄹ': { variants: {}, strokes: [ {type:'poly',  pts:[[16.5,16],[82,16],[82,50.5]]},
                                     {type:'line',  pts:[[16.5,50.5],[82,50.5]]},
                                     {type:'poly',  pts:[[16.5,50.5],[16.5,85.5],[83.5,85.5]]} ] },
    'ㅁ': { variants: {}, strokes: [ {type:'line',  pts:[[17.5,18.5],[17.5,83.5]]},
                                     {type:'poly',  pts:[[17.5,18.5],[82.5,18.5],[82.5,83.5]]},
                                     {type:'line',  pts:[[17.5,83.5],[82.5,83.5]]} ] },
    'ㅂ': { variants: {}, strokes: [ {type:'line',  pts:[[17.5,17.5],[17.5,84]]},
                                     {type:'line',  pts:[[81.5,17.5],[81.5,84]]},
                                     {type:'line',  pts:[[17.5,43.5],[81.5,43.5]]},
                                     {type:'line',  pts:[[17.5,84],[81.5,84]]} ] },
    'ㅅ': { variants: {}, strokes: [ {type:'line',  pts:[[50,16.5],[13.5,84.5]]},
                                     {type:'line',  pts:[[37,40],[86.5,84.5]]} ] },
    'ㅇ': { variants: {}, strokes: [ {type:'circle', c:[49,50.5], r:32.5} ] },
    'ㅈ': { variants: {}, strokes: [ {type:'poly',  pts:[[18.5,16.5],[82,16.5],[15.5,83.5]]},
                                     {type:'line',  pts:[[50,48.5],[85,83.5]]} ] },
    // 1 = the 75° top tick (apex → downward), 2 = the ㅈ-motion, 3 = the right leg.
    'ㅊ': { variants: {}, strokes: [ {type:'line',  pts:[[47.5,9],[51.5,26.5]]},
                                     {type:'poly',  pts:[[18,29.5],[81,29.5],[15,86]]},
                                     {type:'line',  pts:[[50,56],[84.5,86]]} ] },
    // cho_v: same 43° arc as ㄱ's, measured independently. The middle bar rides
    // up to 47.5 and stops at 65.5, where the diagonal is. Still 2 strokes.
    'ㅋ': { variants: {
              cho_v: { strokes: [ {type:'poly', pts:[[26.5,16],[82.5,16],[56.5,64.5],[28.5,83.5]]},
                                  {type:'line', pts:[[18.5,47.5],[65.5,47.5]]} ] },
            },
            strokes: [ {type:'poly',  pts:[[18.5,16],[82.5,16],[82.5,83.5]]},
                       {type:'line',  pts:[[16.5,53],[82.5,53]]} ] },
    'ㅌ': { variants: {}, strokes: [ {type:'line',  pts:[[18,17.5],[81,17.5]]},
                                     {type:'line',  pts:[[18,50.5],[81,50.5]]},
                                     {type:'poly',  pts:[[18,17.5],[18,84.5],[82.5,84.5]]} ] },
    'ㅍ': { variants: {}, strokes: [ {type:'line',  pts:[[16.5,17.5],[83,17.5]]},
                                     {type:'line',  pts:[[32,17.5],[32,85]]},
                                     {type:'line',  pts:[[68,17.5],[68,85]]},
                                     {type:'line',  pts:[[15,85],[84.5,85]]} ] },
    // 1 = the 75° top tick (apex → downward), 2 = the wide bar, 3 = the bowl.
    'ㅎ': { variants: {}, strokes: [ {type:'line',  pts:[[48,8],[51.5,24]]},
                                     {type:'line',  pts:[[15.5,27],[84.5,27]]},
                                     {type:'circle', c:[50,69.5], r:21.5} ] },
    // ── vowels ──
    'ㅏ': { variants: {}, strokes: [ {type:'line', pts:[[39,5],[39,95]]},
                                     {type:'line', pts:[[39,45],[80,45]]} ] },
    'ㅑ': { variants: {}, strokes: [ {type:'line', pts:[[33,5],[33,95]]},
                                     {type:'line', pts:[[33,33],[73,33]]},
                                     {type:'line', pts:[[33,61],[73,61]]} ] },
    'ㅓ': { variants: {}, strokes: [ {type:'line', pts:[[21,44.5],[62,44.5]]},
                                     {type:'line', pts:[[62,5],[62,95]]} ] },
    'ㅕ': { variants: {}, strokes: [ {type:'line', pts:[[21,32],[63,32]]},
                                     {type:'line', pts:[[21,58.5],[63,58.5]]},
                                     {type:'line', pts:[[63,5],[63,95]]} ] },
    'ㅗ': { variants: {}, strokes: [ {type:'line', pts:[[50,18],[50,67.5]]},
                                     {type:'line', pts:[[14,67.5],[86,67.5]]} ] },
    'ㅛ': { variants: {}, strokes: [ {type:'line', pts:[[35,18],[35,70.5]]},
                                     {type:'line', pts:[[65,18],[65,70.5]]},
                                     {type:'line', pts:[[14,70.5],[86,70.5]]} ] },
    'ㅜ': { variants: {}, strokes: [ {type:'line', pts:[[14,33],[86,33]]},
                                     {type:'line', pts:[[50,33],[50,83]]} ] },
    'ㅠ': { variants: {}, strokes: [ {type:'line', pts:[[14,32.5],[86,32.5]]},
                                     {type:'line', pts:[[35,32.5],[35,83]]},
                                     {type:'line', pts:[[65,32.5],[65,83]]} ] },
    'ㅡ': { variants: {}, strokes: [ {type:'line', pts:[[14,45.5],[86,45.5]]} ] },
    'ㅣ': { variants: {}, strokes: [ {type:'line', pts:[[45,5],[45,95]]} ] },
  };

  const composites = {
    // doubles (side by side)
    'ㄲ': { parts: [ {ref:'ㄱ', box:[0,0,46,100]}, {ref:'ㄱ', box:[54,0,46,100]} ] },
    'ㄸ': { parts: [ {ref:'ㄷ', box:[0,0,46,100]}, {ref:'ㄷ', box:[54,0,46,100]} ] },
    'ㅃ': { parts: [ {ref:'ㅂ', box:[0,0,46,100]}, {ref:'ㅂ', box:[54,0,46,100]} ] },
    'ㅆ': { parts: [ {ref:'ㅅ', box:[0,0,46,100]}, {ref:'ㅅ', box:[54,0,46,100]} ] },
    'ㅉ': { parts: [ {ref:'ㅈ', box:[0,0,46,100]}, {ref:'ㅈ', box:[54,0,46,100]} ] },
    // Vertical compound vowels (base + ㅣ). The first part's box is widened so
    // the base's tick actually REACHES the second vertical, which is the stated
    // design intent and was not true of the shipped boxes (ㅏ's tick stopped
    // ~21 units short of ㅣ). ㅔ/ㅖ need no widening: ㅓ/ㅕ write their ticks to
    // the LEFT of their own stem, so the two verticals already read correctly.
    'ㅐ': { parts: [ {ref:'ㅏ', box:[0,0,81,100]}, {ref:'ㅣ', box:[40,0,55,100]} ] },
    'ㅒ': { parts: [ {ref:'ㅑ', box:[0,0,88,100]}, {ref:'ㅣ', box:[40,0,55,100]} ] },
    'ㅔ': { parts: [ {ref:'ㅓ', box:[0,0,55,100]}, {ref:'ㅣ', box:[40,0,55,100]} ] },
    'ㅖ': { parts: [ {ref:'ㅕ', box:[0,0,55,100]}, {ref:'ㅣ', box:[40,0,55,100]} ] },
    // Mixed compound vowels (horizontal base + vertical tail). Measured from
    // 과 / 관 / 원: the ㅗ/ㅜ part reaches ~68% of the compound's width (it was
    // authored at ~47%) and sits in the lower ~40..96% of its height.
    'ㅘ': { parts: [ {ref:'ㅗ', box:[0,28,72,68]}, {ref:'ㅏ', box:[52,0,48,100]} ] },
    'ㅙ': { parts: [ {ref:'ㅗ', box:[0,28,66,68]}, {ref:'ㅐ', box:[46,0,54,100]} ] },
    'ㅚ': { parts: [ {ref:'ㅗ', box:[0,28,78,68]}, {ref:'ㅣ', box:[58,0,42,100]} ] },
    'ㅝ': { parts: [ {ref:'ㅜ', box:[0,34,72,66]}, {ref:'ㅓ', box:[52,0,48,100]} ] },
    'ㅞ': { parts: [ {ref:'ㅜ', box:[0,34,66,66]}, {ref:'ㅔ', box:[46,0,54,100]} ] },
    'ㅟ': { parts: [ {ref:'ㅜ', box:[0,34,78,66]}, {ref:'ㅣ', box:[58,0,42,100]} ] },
    'ㅢ': { parts: [ {ref:'ㅡ', box:[0,25,80,55]}, {ref:'ㅣ', box:[62,0,38,100]} ] },
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
  };

  // Slot boxes [x, y, w, h] in the syllable's own 100×100 space.
  // Archetype key = vowel class ('v'/'h'/'m' from HangulUtil.vowelClass)
  // + 'f' when a batchim is present; bare jamo render uses 'jamo'.
  //
  // v/h/m/vf/hf/mf were solved per slot from the connected-component ink of
  // 가 고 과 간 곤 관 빛 닭 값 흙 원 한 곰 햟 (y bias-corrected), by inverting
  //     inkBBox = slotBox ∘ shapeBBox  ⊕ stroke-width 8
  // and averaging per archetype. n is 1 for v/h/m (one measured sample each),
  // 6 for vf, 3 for hf, 2 for mf.
  //
  // `jamo` now carries FOUR boxes, one per shape class. The engine picks
  // solo_v / solo_h / solo_m by vowel class and falls back to `solo`
  // (consonants, and anything unclassified).
  const layouts = {
    v:    { cho:[11,10.5,49,73],     jung:[60.5,12,28,77] },
    h:    { cho:[13,13,73,56],       jung:[6.5,39,87,52.5] },
    m:    { cho:[13.5,16.5,49.5,42], jung:[10,12,81,78] },
    vf:   { cho:[11.5,12,51,45],     jung:[62,13.5,26,44],     jong:[20,58,64,31.5] },
    hf:   { cho:[13,13,73.5,32],     jung:[6.5,32,86.5,27],    jong:[17.5,60.5,65.5,28.5] },
    mf:   { cho:[15.5,15,47.5,29.5], jung:[10.5,13,79,56.5],   jong:[17.5,64,70,24] },
    jamo: {
      solo:   [18.5, 23.5, 64, 53],   // consonants (vowelClass null)
      solo_v: [31,   13,   43, 76],   // ㅏㅐㅑㅒㅓㅔㅕㅖㅣ
      solo_h: [6.5,  20,   87, 64],   // ㅗㅛㅜㅠㅡ
      solo_m: [6.5,  13,   87, 76],   // ㅘㅙㅚㅝㅞㅟㅢ
    },
  };

  return { shapes, composites, layouts };
})();

if (typeof window !== 'undefined') window.HangulStrokes = HangulStrokes;
if (typeof module !== 'undefined') module.exports = HangulStrokes;
