# Prompt B — StrokeWriter engine, free-play widget, skeleton page

Prerequisite: prompt A completed (`js/hangul-util.js`, `js/stroke-data.js`, `scripts/validate-stroke-data.cjs` all passing). Read `docs/writing-typing/00-overview.md` first.

**Create:** `js/stroke-writer.js`, skeleton `learn/letter-writing.html`.
**Edit:** `css/style.css` (append `.sw-*` styles).
**Do not edit:** `js/step-runner.js`, `js/app.js` (that's prompt C).

---

## 1. `js/stroke-writer.js`

One file, two IIFE modules: `StrokeWriter` (engine) and `StrokeFreePlay` (widget). Both on `window`. `'use strict';` at top. Requires `window.HangulUtil` and `window.HangulStrokes` — fail soft with `console.error` if missing.

### 1.1 Stroke resolution — `StrokeWriter.getStrokes(char)`

Returns a flat array `[{ d, len?, jamoChar, jamoSlot, strokeIndex }]` of ABSOLUTE-coordinate SVG path strings in the final `0 0 100 100` syllable space. Algorithm:

1. Classify `char`:
   - `HangulUtil.isSyllable(char)` → `decompose` → slots: cho (box from layout), jung, jong (if any). Layout key = `vowelClass(jung) + (jong ? 'f' : '')`.
   - `HangulUtil.isJamo(char)` → single slot with `layouts.jamo.solo` box.
   - else → return `null`.
2. For each slot, resolve the jamo to primitive strokes:
   - If in `HangulStrokes.shapes` → its strokes (check `variants[slotKey]` first, fallback base; slotKey = `'cho_'+vowelClass` for cho slot, `'jong'` for jong slot).
   - Else look up `HangulStrokes.composites[jamo]` and recurse into each part, mapping the part's box into the parent box (nested affine: `x' = px + (x/100)*pw` etc., depth ≤ 2).
3. **Bake the transform numerically** — map every primitive's coordinates from its 100×100 space into the slot box. NEVER emit SVG `transform` attributes (keeps `getTotalLength()` and stroke-width uniform).
4. Convert primitives to `d`:
   - `line`/`poly` → `M x0 y0 L x1 y1 …` (round to 1 decimal).
   - `circle` → after baking, it's an ellipse with radii `rx = r*sx`, `ry = r*sy`. Start at top point, counterclockwise, two arcs:
     `M cx (cy-ry) A rx ry 0 1 0 cx (cy+ry) A rx ry 0 1 0 cx (cy-ry)`
     (sweep-flag 0 = counterclockwise in SVG's y-down coordinates).

### 1.2 Rendering + animation — `StrokeWriter.render(containerEl, char, opts)`

```js
// opts (all optional):
// { mode:'watch'|'trace' (default 'watch'), speed:1, numbers:true, debug:false,
//   size:280, onStrokeComplete(i), onComplete() }
// returns instance: { play, pause, replay, setSpeed(x), setMode(m), setChar(ch), destroy, el }
```

DOM it builds inside `containerEl`:

```html
<div class="sw-widget">
  <svg class="sw-svg" viewBox="0 0 100 100" style="width:<size>px;max-width:100%">
    <!-- debug overlay (only when opts.debug): -->
    <text class="sw-debug-glyph" x="50" y="50">가</text>
    <!-- guide grid: light cross-hair lines at 50,50 -->
    <!-- per stroke, in order:
         <path class="sw-guide" d="…"/>          gray full path, opacity .18
         <path class="sw-stroke" d="…"/>          colored, animated
         <g class="sw-num"><circle/><text>1</text></g>  at stroke start point -->
    <rect class="sw-trace-surface" x="0" y="0" width="100" height="100" fill="transparent"/>
  </svg>
  <div class="sw-controls">…replay / speed buttons (watch mode)…</div>
</div>
```

- Debug glyph: `<text>` centered (`text-anchor:middle; dominant-baseline:central`), `font-family:'Noto Sans KR',sans-serif; font-size:86px; opacity:.10; fill:currentColor`. Toggleable via `opts.debug`.
- Animation: for each `.sw-stroke` path, set `stroke-dasharray = stroke-dashoffset = path.getTotalLength()` (compute AFTER insertion into DOM), then a single `requestAnimationFrame` loop drives dashoffset → 0 stroke by stroke. Duration per stroke: `(350 + len*6) ms / speed` (min 300ms), 250ms gap between strokes. Fire `onStrokeComplete(i)` per stroke, `onComplete()` at end.
- Stroke style: `stroke: var(--primary); stroke-width: 8; stroke-linecap: round; stroke-linejoin: round; fill: none`. Guides: `stroke: currentColor; opacity: .18`; same width.
- Stroke numbers: circle r=5 + text font-size 6 at each stroke's first point, class toggled by `opts.numbers`. Hide the current/upcoming number while its stroke animates (optional polish).
- `setSpeed` accepts 0.5 / 1 / 1.5; `replay` resets all dashoffsets and restarts.

### 1.3 Trace mode

Activated by `opts.mode === 'trace'` or `setMode('trace')`. Behavior:

- All strokes shown as guides only; current target stroke's guide pulses (CSS class `sw-guide--target`, animation opacity .18→.45).
- The `.sw-trace-surface` rect captures input: `pointerdown` → `setPointerCapture`, collect points on `pointermove`, finish on `pointerup`. Convert client coords → viewBox via `svg.getScreenCTM().inverse()` (use `DOMPoint`/`matrixTransform`).
- While drawing, render the user's trail as a live polyline (class `sw-user-stroke`, `stroke: var(--secondary)` in light — use a token that reads in both themes, e.g. `var(--primary)` at 60% opacity).
- **Pass check** for the current target stroke (reference sampled at 24 points via `getPointAtLength`):
  1. first user point within `tol` of reference start (enforces direction),
  2. last user point within `tol` of reference end,
  3. mean distance from each user point to its nearest reference sample < 10 units,
  4. coverage: every reference sample has a user point within 18 units.
  `tol = 14`, plus 5 when `e.pointerType === 'touch'`. Reject if user path total length < 40% of reference length.
- On pass: replace guide with a solid drawn path (`.sw-stroke` fully shown), `playDing()`, advance target; on all strokes done → `spawnConfetti()` (if available) + `onComplete()`.
- On fail: `wrong-shake` CSS animation on the svg, clear the trail. After **3 consecutive fails on one stroke**: auto-play that stroke's animation once as a hint and multiply tolerances by 1.25 for that stroke.
- Requirements: `.sw-svg { touch-action: none; }` in trace mode (mandatory — otherwise mobile scroll eats pointermove). Ignore multi-touch (track a single pointerId).

### 1.4 `StrokeFreePlay.init(containerId)`

Free-play widget for the bottom of the page (mirrors `HangulFreeBuilder.init` structure, including the 8-language label detection — copy step-runner's `_detectLang()` ladder locally):

- Text input (`maxlength` generous, we take the LAST hangul char of the value; `HangulUtil.isSyllable || isJamo` to validate) + Go button.
- Mode tabs Watch / Trace (reuse `.stage-tab` classes), speed select (0.5/1/1.5), stroke-numbers toggle.
- Renders via `StrokeWriter.render`. Shows stroke count ("N strokes").
- Quick-pick row of chips: ㄱ ㅅ ㅈ ㅎ ㅏ ㅘ 가 한 빛 닭 햟 (buttons that fill the input and render).
- Add `?swdebug=1` URL param support: when present, pass `debug:true` to render (this is the calibration hook).

Label strings (EN baseline; other languages arrive in prompt F2 — for now ship EN with the detection scaffold in place): "Write any character", "Watch", "Trace", "Speed", "Stroke numbers", "N strokes", input placeholder "가".

## 2. CSS — append to `css/style.css`

New section comment `/* ── Stroke Writer ── */`. Classes: `.sw-widget`, `.sw-svg`, `.sw-guide`, `.sw-guide--target` (pulse keyframes), `.sw-stroke`, `.sw-user-stroke`, `.sw-num`, `.sw-controls` (+ buttons reuse `.syl-picker-btn` where possible), `.sw-chip-row`, `.sw-debug-glyph`. Both themes must work: rely on `currentColor` + existing tokens (`--primary`, `--border`, `--text-secondary`); check `[data-theme="light"]` needs no extra overrides (if guide contrast is bad in light, add one override block). Mobile: widget min canvas 260px, controls wrap.

## 3. Skeleton `learn/letter-writing.html`

Copy `learn/syllable-blocks.html` wholesale, then:

- Replace head meta: title `Korean Letter Writing — Stroke Order | Free Korean School`, description mentioning animated stroke order + tracing, canonical `https://freekoreanschool.com/learn/letter-writing`, hreflang alternates for all 8 langs + x-default following the exact pattern in the source file (`/learn/<lang>/letter-writing` respecting the vi `.html` quirk if present in source), OG/Twitter updated, JSON-LD `Course` name/description updated.
- Lesson header: breadcrumb "Learn → Letter Writing", tag "Getting Started", title "Korean Letter Writing ✍️", subtitle about stroke order; keep the `.lesson-meta` / intro-bullets structure.
- Keep `<div id="step-shell">` with its loading placeholder.
- Replace the free-play section: `<section id="stroke-freeplay-section">` with heading ("Free practice — write any character") and `<div id="stroke-freeplay-widget"></div>`. Keep the `.en-only`/`.ja-only` span pattern used by the source page for the heading.
- Keep all ad zones exactly as in the source page (collapsed `height:0` pattern).
- Sidebar: keep as-is for now (prompt G does the sidebar mass-edit) — but set the active link correctly if a letter-writing link is added later; for now no `.active` change needed.
- Scripts block:
  ```html
  <script src="../js/lang-core.js"></script>
  <script src="../js/app.js"></script>
  <script src="../js/hangul-util.js"></script>
  <script src="../js/stroke-data.js"></script>
  <script src="../js/stroke-writer.js"></script>
  <script src="../js/step-runner.js"></script>
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      // StepRunner.init('/learn/data/letter-writing.json'); // enabled in prompt C
      StrokeFreePlay.init('stroke-freeplay-widget');
    });
  </script>
  <script defer src="../js/ads.js"></script>
  ```

## 4. Calibration pass (mandatory)

Run `node dev.js`, open `http://localhost:3000/learn/letter-writing.html?swdebug=1`, and check each of these against the debug font glyph:

- every base jamo: ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎ ㅏㅑㅓㅕㅗㅛㅜㅠㅡㅣ
- syllables: 가 고 과 간 곤 관 빛 닭 값 흙 원 한 곰 햟

Acceptance bar: every stroke lies ON its glyph region (allow style drift — these are teaching diagrams, not font outlines; the ㅅ/ㅈ diagonals and circle sizes will not match the font exactly and that is fine). If a stroke sits in the wrong REGION (e.g. cho overlapping jung), fix the layout box or composite box in `js/stroke-data.js`, rerun `node scripts/validate-stroke-data.cjs`, re-check.

**Variant decision (capped):** after calibration, look at ㄱ and ㅋ before vertical vowels (가, 카). If the straight-down tail looks unacceptable next to the vowel, add ONE variant each — `shapes['ㄱ'].variants.cho_v = { strokes:[{type:'poly', pts:[[15,15],[80,15],[45,88]]}] }` (diagonal tail), analogous for ㅋ (both strokes; middle bar shortened to hit the diagonal, e.g. `[[15,50],[62,50]]`). Update the validator ONLY if it checks variant geometry (it should apply rule 3 to variants too — extend it if needed; stroke COUNTS of variants must equal the base). Add NO other variants.

## Acceptance criteria

- `StrokeWriter.getStrokes('햟')` returns exactly **12** paths (ㅎ 3 + ㅑ 3 + ㅀ 6); `getStrokes('간')` returns 4 (ㄱ1+ㅏ2+ㄴ1); `getStrokes('ㄱ')` returns 1. Counts must match the prompt-A validator table sums.
- Watch mode animates strokes sequentially with numbers; replay + speed work.
- Trace mode: completing 가 stroke-by-stroke with the mouse passes; drawing a stroke backwards fails; 3 fails triggers the hint replay.
- Mobile emulation (DevTools device mode): tracing works, page does not scroll during a trace.
- Both themes look correct.
- `learn/hangul.html` unaffected (no shared files edited except style.css append).

## Verification

```bash
node scripts/validate-stroke-data.cjs
node -e "global.window={}; require('./js/hangul-util.js'); require('./js/stroke-data.js'); console.log('loads OK')"
node dev.js  # then browser checks above, including ?swdebug=1 calibration list
```
