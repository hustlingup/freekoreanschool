# Prompt D — Hangul IME + typing game engine + skeleton page

Prerequisite: prompt A completed (`js/hangul-util.js` exists and passes its tests). Prompts B/C are independent of this one. Read `docs/writing-typing/00-overview.md` first.

**Create:** `js/hangul-ime.js`, `js/typing-game.js`, skeleton `learn/typing.html`.
**Edit:** `css/style.css` (append `.kb-*` styles).
**Do not edit:** `js/step-runner.js`, `js/app.js` (that's prompt E).

---

## 1. `js/hangul-ime.js` — pure 2-set (두벌식) composer

IIFE, `window.HangulIME` + `module.exports` tail, NO DOM access ever (it must run under plain `node -e`). Uses `HangulUtil` (require-or-window pattern:
`const HangulUtil = (typeof window !== 'undefined' && window.HangulUtil) || require('./hangul-util.js');` — wrap the `require` branch in a `typeof require !== 'undefined'` check).

### 1.1 Key map — copy EXACTLY

Keyed by `KeyboardEvent.code` so the user's OS layout and IME state are irrelevant. Value = `[unshifted, shifted]`; single-element = same for both.

```js
const KEYMAP = {
  KeyQ:['ㅂ','ㅃ'], KeyW:['ㅈ','ㅉ'], KeyE:['ㄷ','ㄸ'], KeyR:['ㄱ','ㄲ'], KeyT:['ㅅ','ㅆ'],
  KeyY:['ㅛ'], KeyU:['ㅕ'], KeyI:['ㅑ'], KeyO:['ㅐ','ㅒ'], KeyP:['ㅔ','ㅖ'],
  KeyA:['ㅁ'], KeyS:['ㄴ'], KeyD:['ㅇ'], KeyF:['ㄹ'], KeyG:['ㅎ'],
  KeyH:['ㅗ'], KeyJ:['ㅓ'], KeyK:['ㅏ'], KeyL:['ㅣ'],
  KeyZ:['ㅋ'], KeyX:['ㅌ'], KeyC:['ㅊ'], KeyV:['ㅍ'], KeyB:['ㅠ'], KeyN:['ㅜ'], KeyM:['ㅡ'],
};
```

Export helpers: `HangulIME.KEYMAP`, `HangulIME.jamoForCode(code, shifted)` → jamo char or null, `HangulIME.codeForJamo(jamo)` → `{ code, shifted }` (reverse lookup, needed by the games to highlight keys).

### 1.2 The automaton — `HangulIME.create()`

Returns an instance: `{ input(jamo), backspace(), flush(), value(), current(), reset() }`.

State: `committed` (string) + current block `{ cho, jung, jong }` as **chars** (`null`/`''` when empty). `value()` = committed + rendered current block; `current()` = rendered current block only (`''` if none). Render a block with `HangulUtil.compose(CHO.indexOf(cho), JUNG.indexOf(jung), JONG.indexOf(jong||''))`; a block with only `cho` renders as the compatibility jamo itself; a block with only `jung` likewise.

Let `isC(j)` = j is a consonant (in `HangulUtil.CHO` or a compound-batchim char), `isV(j)` = j is in `HangulUtil.JUNG` or a base vowel. Input jamo are always the 33 chars from KEYMAP (all base jamo + 5 doubles + ㅒㅖㅐㅔ).

**Consonant input `c`:**
1. No block → new block `{cho:c}`. (If `c` can't be a cho — it always can from KEYMAP — commit raw.)
2. Block `{cho}` only → commit that cho as a bare jamo char, new block `{cho:c}`.
3. Block `{jung}` (standalone vowel) → commit it, new block `{cho:c}`.
4. Block `{cho,jung}` no jong → if `c` is a valid jong (any KEYMAP consonant EXCEPT ㄸ ㅃ ㅉ) → set `jong=c`; else commit block, new block `{cho:c}`.
5. Block `{cho,jung,jong}` → if `HangulUtil.JONG_COMBINE[jong+c]` exists → jong becomes the compound; else commit, new block `{cho:c}`.

**Vowel input `v`:**
1. No block → new block `{jung:v}`.
2. Block `{cho}` only → set `jung=v`.
3. Block `{jung}` only → if `HangulUtil.JUNG_COMBINE[jung+v]` → replace jung with compound; else commit, new block `{jung:v}`.
4. Block `{cho,jung}` no jong → if `JUNG_COMBINE[jung+v]` → compound jung; else commit, new block `{jung:v}`.
5. Block has jong → **batchim stealing**: if `HangulUtil.JONG_SPLIT[jong]` (compound) → block keeps first component as jong, commit it, new block `{cho: secondComponent, jung: v}`. If simple jong → remove jong from block, commit it, new block `{cho: jong, jung: v}`. Exception: if the stolen consonant cannot be a cho (only compound-batchim leftovers like ㄳ can't — the split second components ㅅㅈㅎㄱㅁㅂㅌㅍ all CAN) — no exception needed in practice.

**`backspace()`** — peel ONE component:
- Block with compound jong → jong becomes its first component (`JONG_SPLIT`).
- Block with simple jong → jong removed.
- Block `{cho,jung}` where jung is a compound built via JUNG_COMBINE → jung reverts to the first component (build a `JUNG_SPLIT` inverse locally; note ㅐㅔㅒㅖ typed directly via their own keys are NOT split — track a per-block flag `jungComposed` set only when combined by rule V3/V4; if the flag is unset, jung is removed whole).
- Block `{cho,jung}` (simple jung or unset flag) → jung removed.
- Block `{cho}` or `{jung}` only → block cleared.
- No block → remove last char of `committed` (whole char, no decomposition of committed text — matches real IME behavior after commit... real IMEs vary; whole-char delete is the simple, acceptable choice; state this in a comment).

**`flush()`** commits the current block and returns `value()`.

### 1.3 Golden tests — embed in the file's doc comment and run in Verification

Sequences given as QWERTY letters (lowercase = unshifted, UPPERCASE = shifted, `<` = backspace):

| input | value() | why |
|---|---|---|
| `rk` | 가 | ㄱ+ㅏ |
| `rkr` | 각 | jong attach |
| `rkrt` | 갃 | jong ㄱ+ㅅ→ㄳ compound |
| `rkrtk` | 각사 | vowel steals batchim; ㄳ splits, ㅅ becomes new cho |
| `rkk` | 가ㅏ | ㅏ+ㅏ not combinable → commit 가, standalone-vowel block |
| `gksrnrdj` | 한국어 | full word: 한 / 국 (jong ㄱ kept, next input is consonant) / 어 |
| `dhk` | 와 | ㅇ + (ㅗ+ㅏ→ㅘ) |
| `dnjs` | 원 | ㅇ + (ㅜ+ㅓ→ㅝ) + ㄴ |
| `Rkc` | 깣 | shifted ㄲ cho, jong ㅊ |
| `anfR` | 물ㄲ | ㄹ+ㄲ is no compound jong → commit 물, new block ㄲ |
| `ekfr` | 닭 | ㄷㅏㄹ + ㄱ → jong ㄺ |
| `dml` | 의 | ㅇ + (ㅡ+ㅣ→ㅢ) |
| `dk<` | ㅇ | backspace removes jung, cho remains |
| `ekfr<` | 달 | compound jong ㄺ peels to ㄹ |
| `ekfr<<` | 다 | then jong removed |
| `ekfr<<<` | ㄷ | then jung removed |
| `ekfr<<<<` | (empty) | then cho removed |
| `rkrtk<` | 각ㅅ | current block {ㅅ,ㅏ} loses ㅏ; committed 각 untouched |

## 2. `js/typing-game.js`

IIFE, `window.TypingGame`. Browser-only. Public API: `{ initFreePlay(containerId), mountStep(step, ctx) }` — `mountStep` is wired by prompt E; implement it now with the contract in §2.4 so prompt E only touches step-runner.

### 2.1 On-screen keyboard

`buildKeyboard(containerEl)` renders plain HTML (no SVG):

```html
<div class="kb-board" role="group" aria-label="Korean keyboard">
  <div class="kb-row"> <button class="kb-key" data-code="KeyQ"><span class="kb-jamo">ㅂ</span><span class="kb-latin">Q</span></button> … </div>
  <div class="kb-row"> …A row… </div>
  <div class="kb-row"> <button class="kb-key kb-key--wide" data-code="ShiftLeft">⇧</button> …Z row… <button class="kb-key kb-key--wide" data-code="Backspace">⌫</button> </div>
  <div class="kb-row"> <button class="kb-key kb-key--space" data-code="Space">␣</button> </div>
</div>
```

Rows: Q W E R T Y U I O P / A S D F G H J K L / Shift Z X C V B N M Backspace / Space. Jamo legends from `HangulIME.KEYMAP`; when shift is active (sticky on-screen toggle OR physical shift held), the 7 dual-legend keys (QWERT OP) swap to their shifted jamo and get class `kb-key--shifted`. Clicking a key routes through the same handler as physical input. Keys flash `.kb-key--active` on press (both physical and on-screen) and `.kb-key--hint` when a game wants to show where a target key is.

### 2.2 Input capture (IME-proofing — non-negotiable)

- The play surface is a `<div class="kb-capture" tabindex="0">` — **never** an `<input>` or `<textarea>`, so the OS Korean IME can never begin composition.
- `keydown` listener on that div: ignore if `e.isComposing || e.ctrlKey || e.metaKey || e.altKey`. If `e.code` in KEYMAP or is `Backspace`/`Space`: `e.preventDefault()`, route to the IME instance (`input(jamoForCode(e.code, e.shiftKey))`, `backspace()`, or the game's submit for Space).
- Show a "click here / tap keys to type" affordance when the capture div loses focus (`:focus-within` styling + a click-to-focus overlay message).
- The composed text is rendered by us into a display div (`.kb-display`), current in-progress block visually distinguished (underline via `.kb-display-current`).

### 2.3 Game modes

All games share: a prompt area, the display, the keyboard, a stats bar (`.kb-stats`: elapsed, CPM, accuracy, streak), start/restart button, and end-of-round summary card. Scoring is Korean-convention **타/분 (CPM)** = correct jamo keystrokes ÷ elapsed minutes — never English WPM. Accuracy = correct keystrokes / total keystrokes.

- **`jamo` drill**: a target jamo is shown huge; pressing its key scores +1 and advances (wrong key = miss, `wrong-shake`); round = 30 prompts (weight recently-missed keys 2×). Shifted jamo included only when `opts.includeShift`.
- **`syllable` drill**: target syllable shown; user composes it live; auto-advance the moment `ime.current() === target` (then `reset()`); round = the provided item list.
- **`word` drill**: target word + meaning + romanization shown; user types the whole word, Space or Enter submits; per-word feedback (correct → `correct-pop` + `playDing`, wrong → show diff, count misses); round = provided list.

`spawnConfetti()` on round completion when accuracy ≥ 90%.

### 2.4 `mountStep(step, ctx)` contract (consumed in prompt E)

- `step.type === 'key_intro'`: `step.jamo` = array of 1–3 jamo chars, `step.reps` (default 3). Renders keyboard + prompt cycling through the jamo; each must be pressed `reps` times (highlight the target key with `.kb-key--hint`). When done → `ctx.onComplete()`.
- `step.type === 'typing_drill'`: `step.mode` ∈ `jamo|syllable|word`, `step.items` = array of `{ ko, meaning?, romanization? }` (for jamo mode, `ko` is a jamo char), `step.target` = `{ count }` or `{ seconds }`. Run one round; on completion → `ctx.onComplete({ cpm, accuracy })`.
- `ctx` = `{ onComplete }`. TypingGame owns all DOM inside the mount element it's given (`ctx.mount`… simplest: `mountStep(step, mountEl, onComplete)` — pick ONE signature and keep it; document it in a header comment).

### 2.5 `initFreePlay(containerId)`

Open typing pad: keyboard + display + live CPM/accuracy + a "clear" button, plus mode chips that launch quick rounds (10 jamo / 5 syllables / 5 words with a built-in default word list: 한국 사랑 감사 안녕 김치 학교 친구 물 밥 집). Labels EN for now (prompt F2 localizes, using the syllable-builder lang-detection pattern).

## 3. CSS — append to `css/style.css`

Section `/* ── Korean Keyboard / Typing ── */`. `.kb-board` (grid rows, gap), `.kb-key` (base on `.syl-picker-btn` look: bg `--bg-card`, border `--border`, radius; DON'T reuse the class itself — keys need `position:relative` children), `.kb-jamo` (large), `.kb-latin` (corner, small, `--text-secondary`), `.kb-key--active` (pressed flash, `--primary` border + slight scale), `.kb-key--hint` (pulsing outline, keyframes), `.kb-key--shifted`, `.kb-capture` (focus ring when focused), `.kb-display` (large composed text, min-height), `.kb-display-current` (underline), `.kb-stats`, `.kb-summary`. Both themes. Mobile: keys shrink via `clamp()`, board `max-width:100%`, `touch-action: manipulation` on keys (kills double-tap zoom).

## 4. Skeleton `learn/typing.html`

Copy `learn/syllable-blocks.html` and adapt exactly as prompt B §3 did for letter-writing, with:
- title `Korean Typing — Dubeolsik Keyboard Guide & Games | Free Korean School`; canonical `/learn/typing`; hreflang set for `/learn/<lang>/typing`; updated OG/JSON-LD.
- Header/breadcrumb: "Learn → Korean Typing", tag "Getting Started", title "Korean Typing ⌨️".
- `<div id="step-shell">` kept; free-play section `<section id="typing-freeplay-section">` with `<div id="typing-freeplay-widget"></div>`.
- Scripts: `lang-core.js`, `app.js`, `hangul-util.js`, `hangul-ime.js`, `typing-game.js`, `step-runner.js`, then:
  ```js
  // StepRunner.init('/learn/data/typing.json'); // enabled in prompt E
  TypingGame.initFreePlay('typing-freeplay-widget');
  ```
  and `defer ads.js`. (No stroke-data/stroke-writer on this page.)

## Acceptance criteria

- `hangul-ime.js` passes every golden test under node.
- Free-play: physical typing with a US layout produces hangul; the same works with a Korean IME ENABLED in the OS (no double characters — because no editable element exists); on-screen clicking produces identical results; shift (physical hold and on-screen sticky) swaps legends and produces ㅃㅉㄸㄲㅆㅒㅖ.
- Backspace peels components exactly per the golden backspace sequences.
- Keyboard flashes the pressed key; hint highlight works.
- Both themes correct; mobile emulation: on-screen keys usable, no zoom on double-tap.
- No edits to step-runner.js/app.js; `learn/hangul.html` unaffected.

## Verification

```bash
# golden tests (write them into scripts/test-hangul-ime.cjs if you prefer a file — either is fine)
node -e "
const IME = require('./js/hangul-ime.js');
function type(str){ const ime = IME.create(); for (const ch of str){ if (ch==='<'){ ime.backspace(); continue; } const shifted = ch !== ch.toLowerCase(); const code = 'Key' + ch.toUpperCase(); ime.input(IME.jamoForCode(code, shifted)); } return ime.value(); }
const cases = { rk:'가', rkr:'각', rkrt:'갃', rkrtk:'각사', rkk:'가ㅏ', gksrnrdj:'한국어', dhk:'와', dnjs:'원', Rkc:'깣', anfR:'물ㄲ', ekfr:'닭', dml:'의', 'ekfr<':'달', 'ekfr<<':'다', 'ekfr<<<':'ㄷ', 'ekfr<<<<':'', 'rkrtk<':'각ㅅ' };
let bad = 0;
for (const [k,v] of Object.entries(cases)) { const got = type(k); if (got !== v) { console.error('FAIL', k, 'expected', v, 'got', got); bad++; } }
console.log(bad ? 'FAILED '+bad : 'IME golden tests OK: ' + Object.keys(cases).length);
process.exit(bad?1:0);
"
node dev.js  # then the browser checks above on /learn/typing.html
```
