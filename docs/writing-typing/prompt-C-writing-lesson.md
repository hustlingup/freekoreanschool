# Prompt C — Writing lesson: step types + letter-writing.json + finished page

Prerequisites: prompts A and B completed. Read `docs/writing-typing/00-overview.md` first.

**Edit:** `js/step-runner.js`, `js/app.js`, `learn/letter-writing.html`, `css/style.css` (small append if needed).
**Create:** `learn/data/letter-writing.json`.
**Regenerate:** `learn/data/manifest.json` via script.

⚠️ `js/step-runner.js` and `js/app.js` are loaded by EVERY lesson page. All additions must be guarded and additive. Mandatory regression check at the end.

---

## 1. New step types in `js/step-runner.js`

### 1.1 Renderers

Add to the `renderers` map (around line 263, after `lesson_complete`):

```js
stroke_demo: renderStrokeDemo,
stroke_trace: renderStrokeTrace,
```

Both renderers return HTML strings like the existing ones, using `loc(step, 'field')`, `esc()`, and `getPronunciationAid(step)`. Reuse existing `sr-*` CSS classes where they fit (`.sr-char`, `.sr-rom`, `.sr-example`); add minimal new classes (`.sr-stroke-step`, `.sr-stroke-mount`, `.sr-stroke-actions`) to `css/style.css` if needed.

`renderStrokeDemo(step)` layout:
- big char label + `esc(step.romanization)` + pronunciation aid
- `<div class="sr-stroke-mount" id="sw-step-mount"></div>` — the StrokeWriter mount point
- replay button (`StrokeWriter` instance replay — see mount hook) + audio button copying the markup/handler pattern of the existing card audio button (`AudioCache.play(step.audio)` fallback `speakKorean`)
- hint line: `esc(loc(step, 'hint'))`
- example: `esc(step.example_word)` — `esc(loc(step, 'example_meaning'))`

`renderStrokeTrace(step)` layout:
- instruction line (per-language inline ternary like other renderers: "Trace each stroke in order" / ja「順番どおりになぞってください」/ zh-tw「請依筆順描寫」/ es/fr/de/vi/th/id equivalents — follow the `stageLabel` ternary pattern at js/step-runner.js:115)
- `<div class="sr-stroke-mount" id="sw-step-mount"></div>`
- hint: `esc(loc(step, 'hint'))` if present
- hidden continue button: `<button class="btn btn-primary" id="sw-continue" style="display:none" onclick="StepRunner.goToStep(${index + 1})">…</button>` — renderers receive only `step`, so instead render `onclick="StepRunner.strokeContinue()"` and implement `strokeContinue()` as `goToStep(currentIndex + 1)`; expose it in the public return object (line ~723).

### 1.2 Mount hook

In `renderStep`, immediately after the `content.innerHTML = …` if/else (line ~277), add:

```js
if ((step.type === 'stroke_demo' || step.type === 'stroke_trace') && window.StrokeWriter) {
  mountStrokeStep(step, index);
}
```

`mountStrokeStep(step, index)` (new private function):
- `const mount = document.getElementById('sw-step-mount'); if (!mount) return;`
- demo: `StrokeWriter.render(mount, step.char, { mode:'watch', numbers:true, size:260, onComplete(){ markDone(index, 'stroke_demo'); } })`; keep the returned instance in a module-level `let strokeInstance` so the replay button can call `strokeInstance.replay()` (expose `strokeReplay()` publicly, same pattern as `strokeContinue`).
- trace: `StrokeWriter.render(mount, step.char, { mode:'trace', numbers:true, size:260, onComplete(){ markDone(index, 'stroke_trace'); const b = document.getElementById('sw-continue'); if (b) b.style.display=''; } })`.
- `destroy()` any previous instance before creating a new one.

The guard `window.StrokeWriter` is mandatory — other lesson pages don't load the engine; if data ever contained these types there, the renderer output without a mounted widget is acceptable degradation.

### 1.3 Gating + fallback marking

- `updateNavButtons` (line ~685): add `'stroke_trace'` to `hideTypes` (demo keeps a visible Next).
- In `nextStep`, where `reading_card`/`card_reveal` get `markDone` on advance, also include `stroke_demo` (fallback credit if the user skips before the animation finishes; `markDone` is idempotent — returns false on repeat).

## 2. Counter buckets in `js/app.js`

In `KSProgress.markStepDone` (lines 1248–1250), extend the `letters` line:

```js
else if (stepType === 'card_reveal' || stepType === 'syllable_builder'
      || stepType === 'stroke_demo' || stepType === 'stroke_trace') s.counters.letters++;
```

## 3. Progress grid entry in `js/app.js`

In `LessonProgressGrid`'s `LESSONS` array (line ~1327), insert after the `hangul` row:

```js
{ id: 'letter-writing', url: 'letter-writing.html', name: 'Letter Writing', level: 'starter', k: '쓰' },
```

## 4. `learn/data/letter-writing.json`

Follow `learn/data/hangul.json` structure exactly: top-level `{ "lesson": "letter-writing", "totalSteps": 74, "stages": [...], "steps": [...] }`. Steps have sequential numeric `id` starting at 1 and a `stage` number. **English + `name_kr` only in this prompt** — all `_lang` translations come in prompt F1 (stage objects still need their `name` + `name_kr` now).

### Stages

| id | name | name_kr | first_step | last_step | time_minutes |
|---|---|---|---|---|---|
| 1 | How Strokes Work | 획순 원리 | 1 | 2 | 2 |
| 2 | Consonants | 자음 쓰기 | 3 | 30 | 28 |
| 3 | Vowels | 모음 쓰기 | 31 | 50 | 20 |
| 4 | Syllable Blocks | 음절 쓰기 | 51 | 62 | 12 |
| 5 | Challenge | 도전 | 63 | 74 | 12 |

### Steps

**Stage 1 — two `reading_card` steps** (copy the field shape from hangul.json's reading_card steps: `title`, `body`, optional `rules` array, `tip`):
1. "The Three Rules of Stroke Order" — rules: top before bottom; left before right; horizontal before an intersecting vertical. Tip: every hangul letter follows these — learn 24 shapes and you can write all 11,172 syllables.
2. "One Letter, One Rhythm" — explain stroke counts are fixed (state explicitly: ㅈ is written in 2 strokes, ㅊ in 3 — handwriting convention used throughout this lesson), and that syllables are written cho → jung → jong (initial consonant, then vowel, then final).

**Stage 2 — 14 consonants, each as a `stroke_demo` immediately followed by a `stroke_trace` of the same char** (28 steps, order ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎ).

`stroke_demo` schema:
```json
{ "id": 3, "stage": 2, "type": "stroke_demo",
  "char": "ㄱ", "romanization": "g / k", "audio": "기역", "stroke_count": 1,
  "hint": "One single stroke: across, then down.",
  "example_word": "가다", "example_meaning": "to go" }
```
Reuse `romanization`, `audio` (letter names 기역 니은 디귿 리을 미음 비읍 시옷 이응 지읒 치읓 키읔 티읕 피읖 히읗), `example_word`, `example_meaning` from the matching `card_reveal` steps in `learn/data/hangul.json` (open it and copy). `stroke_count` must equal the prompt-A validator table (ㄱ1 ㄴ1 ㄷ2 ㄹ3 ㅁ3 ㅂ4 ㅅ2 ㅇ1 ㅈ2 ㅊ3 ㅋ2 ㅌ3 ㅍ4 ㅎ3). `hint` = one short sentence describing the stroke sequence in plain words (e.g. ㄹ: "Three strokes: the ㄱ motion, the middle bar, then the ㄴ motion.").

`stroke_trace` schema:
```json
{ "id": 4, "stage": 2, "type": "stroke_trace", "char": "ㄱ", "romanization": "g / k",
  "hint": "Start at the top-left. One stroke: across, then down." }
```

**Stage 3 — 10 vowels, same demo+trace pairing** (20 steps, order ㅏㅑㅓㅕㅗㅛㅜㅠㅡㅣ). `audio` = the vowel sound itself (아 야 어 여 오 요 우 유 으 이); `example_word`/`example_meaning` from hangul.json vowel cards; stroke counts ㅏ2 ㅑ3 ㅓ2 ㅕ3 ㅗ2 ㅛ3 ㅜ2 ㅠ3 ㅡ1 ㅣ1. Call out direction quirks in hints: ㅓ "tick first, then the vertical"; ㅗ "short vertical first, then the long base"; ㅜ "bar first, then the hanging vertical".

**Stage 4 — 6 syllables, demo+trace pairs** (12 steps): 가 (ga — "go"), 고 (go), 과 (gwa — fruit/lesson), 한 (han — Korea/one), 곰 (gom — bear), 원 (won — currency). `audio` = the syllable itself. Demo hints teach block order, e.g. 한: "Write ㅎ first, then ㅏ, then ㄴ underneath — 6 strokes total." `stroke_count`: 가3 고3 과5 한6 곰6 원5 (sum of jamo counts; double-check against the validator table).

**Stage 5 — challenge:** demo+trace pairs for 빛 (bit — light, ㅂ4+ㅣ1+ㅊ3 = 8 strokes), 닭 (dak — chicken, ㄷ2+ㅏ2+ㄺ4 = 8), 값 (gap — price, ㄱ1+ㅏ2+ㅄ6 = 9), 햟 (hyalh — a rare syllable to show off full coverage, ㅎ3+ㅑ3+ㅀ6 = 12). All counts are derived by summing the validator table — recompute rather than trusting this sentence. That's steps 63–70. Then 3 `match_quiz` steps (71–73), field shape copied from hangul.json match_quiz (`prompt`, `choices` array of 4, `correct` string):
- "How many strokes in ㅊ?" choices ["2","3","4","5"] correct "3"
- "Which stroke comes FIRST in ㅏ?" choices ["The vertical line","The short tick","Either one","The bottom bar"] correct "The vertical line"
- "How many strokes in 한?" choices ["5","6","7","8"] correct "6"

Step 74 — `lesson_complete`, field shape from hangul.json's final step (`title`, `title_kr`, `message`, `next_url`). `next_url`: `/learn/syllable-blocks` (match the URL style used in hangul.json's lesson_complete). Message mentions the free-play widget below for more practice.

**Consistency rule:** every `stroke_count` value and every quiz answer must agree with `scripts/validate-stroke-data.cjs`'s expected table. After writing the JSON, run the cross-check in Verification.

## 5. Finish `learn/letter-writing.html`

- Uncomment/enable `StepRunner.init('/learn/data/letter-writing.json');` in the DOMContentLoaded block (keep `StrokeFreePlay.init` after it).
- Lesson header intro bullets: mention 24 letters + syllable tracing + all-device tracing.
- Confirm `.lesson-meta` reflects ~74 steps / ~74 min (match the format used on syllable-blocks.html).

## 6. Regenerate manifest

```bash
node scripts/gen-lesson-manifest.cjs
```
`learn/data/manifest.json` must now contain a `letter-writing` row with `steps: 74`, `countable: 73`, `group: "core"`. Never hand-edit that file.

## Acceptance criteria + verification

```bash
node -e "JSON.parse(require('fs').readFileSync('learn/data/letter-writing.json','utf8')); console.log('json OK')"

# stroke_count / quiz consistency vs stroke data
node -e "
const H = require('./js/hangul-util.js'); global.window = undefined;
const S = require('./js/stroke-data.js');
const data = JSON.parse(require('fs').readFileSync('learn/data/letter-writing.json','utf8'));
function count(ch){
  if (S.shapes[ch]) return S.shapes[ch].strokes.length;
  if (S.composites[ch]) return S.composites[ch].parts.reduce((n,p)=>n+count(p.ref),0);
  const d = H.decompose(ch);
  return count(d.cho)+count(d.jung)+(d.jong?count(d.jong):0);
}
let bad = 0;
for (const s of data.steps) if (s.type==='stroke_demo' && s.stroke_count !== count(s.char)) { console.error('MISMATCH', s.id, s.char, s.stroke_count, count(s.char)); bad++; }
console.log(bad ? 'FAIL' : 'stroke counts OK');
process.exit(bad ? 1 : 0);
"

node scripts/gen-lesson-manifest.cjs
node dev.js
```

Browser checks (http://localhost:3000/learn/letter-writing.html):
1. Lesson loads; stage tabs show 5 stages; `?step=3` deep link renders the ㄱ demo.
2. Demo step: animation plays, replay works, audio button speaks, Next visible.
3. Trace step: Next hidden; completing the trace shows the continue button; DevTools → `localStorage['ks-progress-v2']` shows the step in `lessons['letter-writing'].done` and `counters.letters` incremented.
4. Quiz steps behave like hangul.json quizzes (wrong → shake, right → advance).
5. lesson_complete fires confetti and `lessons['letter-writing'].completed === true`.
6. Sidebar progress grid shows "Letter Writing" with live % (after `gen-lesson-manifest` rerun).
7. **Regression:** open `learn/hangul.html` and `learn/vocabulary.html` — both fully functional (step nav, quizzes, grid).
8. Free-play widget still works below the lesson.
