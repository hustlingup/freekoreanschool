# Prompt E — Typing lesson: step types + typing.json + finished page

Prerequisites: prompts A, D completed (and C, so the step-runner patterns below already have one precedent in the file). Read `docs/writing-typing/00-overview.md` first.

**Edit:** `js/step-runner.js`, `js/app.js`, `learn/typing.html`.
**Create:** `learn/data/typing.json`.
**Regenerate:** `learn/data/manifest.json`.

⚠️ Shared-file rule applies: every hook guarded, regression check at the end.

---

## 1. New step types in `js/step-runner.js`

Add to the `renderers` map (same block prompt C used):

```js
key_intro: renderKeyIntro,
typing_drill: renderTypingDrill,
```

Both renderers output a header (title/instruction via per-language ternary, `loc()` for JSON fields) + `<div class="sr-typing-mount" id="kb-step-mount"></div>` + optional tip line `esc(loc(step,'tip'))`. All game UI (keyboard, prompts, stats) is built by `TypingGame.mountStep` — renderers stay thin.

Mount hook — extend the guarded block added in prompt C (after `content.innerHTML = …`):

```js
if ((step.type === 'key_intro' || step.type === 'typing_drill') && window.TypingGame) {
  const mount = document.getElementById('kb-step-mount');
  if (mount) TypingGame.mountStep(step, mount, () => {
    markDone(index, step.type);
    const b = document.getElementById('kb-continue');
    if (b) b.style.display = '';
  });
}
```

(Use whatever `mountStep` signature prompt D actually implemented — check the header comment in `js/typing-game.js` and match it.)

Continue button: same pattern as prompt C's `stroke_trace` — renderers include a hidden `#kb-continue` button wired to `StepRunner.strokeContinue()` (rename that helper to something neutral like `stepContinue()` now that two features use it — update the prompt-C call sites in the same edit).

Gating: add `'key_intro'` and `'typing_drill'` to `hideTypes` in `updateNavButtons`.

## 2. Counter buckets in `js/app.js`

In `KSProgress.markStepDone`:
- `key_intro` → `letters` bucket (extend the same line prompt C touched),
- `typing_drill` → `quizzes` bucket (extend the `match_quiz` line).

## 3. Progress grid entry in `js/app.js`

In `LessonProgressGrid.LESSONS`, insert after the `pronunciation` row:

```js
{ id: 'typing', url: 'typing.html', name: 'Korean Typing', level: 'starter', k: '타' },
```

## 4. `learn/data/typing.json`

Same top-level shape as prompt C (`lesson: "typing"`, sequential step `id`s, `stage` numbers, EN + `name_kr` only — translations in prompt F2). `totalSteps: 29`.

### Stages

| id | name | name_kr | first_step | last_step | time_minutes |
|---|---|---|---|---|---|
| 1 | Meet the Keyboard | 키보드 소개 | 1 | 2 | 2 |
| 2 | Consonant Keys | 자음 키 | 3 | 9 | 7 |
| 3 | Vowel Keys | 모음 키 | 10 | 15 | 6 |
| 4 | Shift Keys | 쌍자음 키 | 16 | 18 | 3 |
| 5 | Type Syllables | 음절 입력 | 19 | 23 | 8 |
| 6 | Type Words | 단어 입력 | 24 | 29 | 10 |

### Steps

**Stage 1 — two `reading_card`s:**
1. "The 2-Set Keyboard (두벌식)" — body: Korea's standard layout since 1985; consonants under the LEFT hand, vowels under the RIGHT; you type jamo and the computer assembles syllables. Include a `rules`-style list if the reading_card schema supports it (copy shape from hangul.json): left = consonants, right = vowels, Shift = double consonants.
2. "How Syllables Assemble" — body: type ㅎ+ㅏ+ㄴ and 한 forms by itself; typing a vowel after a batchim moves that consonant to the next syllable (mention 각+ㅏ→각사... use a clean example: 가+ㄱ+ㅅ+ㅏ → 각사). Tip: no Korean IME needed on this page — the lesson keyboard does everything.

**Stage 2 — 7 `key_intro` steps** covering the 14 basic consonants in keyboard-friendly pairs, `reps: 3` each:

| id | jamo | tip focus |
|---|---|---|
| 3 | ["ㅁ","ㄴ"] | home row, left hand (A, S) |
| 4 | ["ㅇ","ㄹ"] | home row (D, F) |
| 5 | ["ㅎ","ㄱ"] | G on home row; R for ㄱ |
| 6 | ["ㅂ","ㅈ"] | top row (Q, W) |
| 7 | ["ㄷ","ㅅ"] | top row (E, T) |
| 8 | ["ㅋ","ㅌ"] | bottom row (Z, X) |
| 9 | ["ㅊ","ㅍ"] | bottom row (C, V) |

`key_intro` schema:
```json
{ "id": 3, "stage": 2, "type": "key_intro", "jamo": ["ㅁ","ㄴ"], "reps": 3,
  "tip": "ㅁ sits on A and ㄴ on S — the left home row is all consonants." }
```

**Stage 3 — 6 `key_intro` steps** for the vowel keys:

| id | jamo | keys |
|---|---|---|
| 10 | ["ㅗ","ㅓ"] | H, J (right home row) |
| 11 | ["ㅏ","ㅣ"] | K, L |
| 12 | ["ㅛ","ㅕ"] | Y, U |
| 13 | ["ㅑ","ㅐ"] | I, O |
| 14 | ["ㅔ"] | P |
| 15 | ["ㅠ","ㅜ","ㅡ"] | B, N, M — vowels reach the bottom row |

**Stage 4 — 3 `key_intro` steps** with shift: 16 `["ㅃ","ㅉ"]`, 17 `["ㄸ","ㄲ","ㅆ"]`, 18 `["ㅒ","ㅖ"]`. Tips explain hold-Shift (or tap the on-screen ⇧).

**Stage 5 — 5 `typing_drill` steps:**
- 19: `mode:"jamo"`, `items` = all 14 basic consonants as `{ "ko":"ㄱ" }` entries, `target:{ "count": 20 }`, tip about accuracy first.
- 20: `mode:"jamo"`, items = the 10 basic vowels, `target:{ "count": 15 }`.
- 21: `mode:"syllable"`, items 가 나 다 마 사 (no batchim), each `{ "ko":"가", "romanization":"ga" }`.
- 22: `mode:"syllable"`, items 한 국 말 밥 손 (batchim).
- 23: `mode:"syllable"`, items 과 워 의 왜 쥐 (compound vowels).

**Stage 6 — 4 `typing_drill` word steps + complete:**
- 24: items 물 (water) 밥 (rice) 집 (house) 코 (nose) — `{ "ko":"물", "meaning":"water", "romanization":"mul" }`.
- 25: items 한국 (Korea) 사랑 (love) 친구 (friend) 김치 (kimchi).
- 26: items 안녕하세요 (hello) 감사합니다 (thank you).
- 27: `mode:"word"`, `target:{ "seconds": 60 }`, items = the full word pool from steps 24–25 cycled — a 60-second CPM sprint; tip: 200+ 타/분 is beginner-solid, Korean pros hit 600+.
- 28: **`reading_card` — "Type Korean on Your Own Devices"** (added 2026-07-24 at the user's request; this is why `totalSteps` is **29**, not 28, and stage 6 runs 24–29).

  Rationale: every drill on this site works with **no** Korean IME installed — that is deliberate (no editable element exists, input is keyed off `e.code`, mobile users tap the on-screen keys). A tester nonetheless asked whether the widget should tell them to install a Korean keyboard, which showed the question is live in learners' minds. The widget itself now answers it inline ("no Korean keyboard needed"), and that is the right place for it — but *actually* enabling Korean input on your own phone and computer is real learner content, so it belongs here in the lesson, where prompt F2 translates it into all 8 languages. Do **not** move these instructions into `js/typing-game.js`.

  Body: state plainly that nothing needs installing to practise here, then give the real steps as a `rules` list (verify each against current OS versions before writing — these menu paths drift):
  - **iOS** — Settings → General → Keyboard → Keyboards → Add New Keyboard → Korean (한국어), 2-set/두벌식. Switch with the 🌐 key.
  - **Android** — Settings → System → Languages & input → On-screen keyboard → Gboard → Languages → Add keyboard → Korean, 2-set. Switch with the 🌐 key or long-press Space.
  - **Windows** — Settings → Time & language → Language & region → Add a language → 한국어. Switch with Win+Space; toggle Hangul/English with the Han/Eng key (right Alt).
  - **macOS** — System Settings → Keyboard → Text Input → Edit → + → Korean → 2-Set. Switch with Ctrl+Space.

  Tip: the layout is the same 두벌식 you just learned, so muscle memory transfers directly.

- 29: `lesson_complete` (shape from hangul.json; `next_url` to `/learn/vocabulary` or the next logical lesson; message points at the free-play typing pad below).

## 5. Finish `learn/typing.html`

Enable `StepRunner.init('/learn/data/typing.json');` before `TypingGame.initFreePlay(...)`. Update `.lesson-meta` (~29 steps / ~38 min) and intro bullets.

## 6. Regenerate manifest

```bash
node scripts/gen-lesson-manifest.cjs
```
Expect a `typing` row: `steps: 29`, `countable: 28`, `group: "core"`.

## Acceptance criteria + verification

```bash
node -e "JSON.parse(require('fs').readFileSync('learn/data/typing.json','utf8')); console.log('json OK')"
node scripts/gen-lesson-manifest.cjs
node dev.js
```

Browser (http://localhost:3000/learn/typing.html):
1. All 29 steps click through; stage tabs correct; `?step=19` deep-links into the first drill.
2. `key_intro`: target key pulses, physical AND on-screen presses both count, step completes after reps, continue button appears, Next was hidden.
3. `typing_drill`: jamo/syllable/word modes all complete; CPM and accuracy numbers are plausible (type ~1 key/sec → CPM ≈ 60); `counters.quizzes` increments per drill, `counters.letters` per key_intro.
4. The 60-second sprint ends on time and reports a summary.
5. Mobile emulation: whole lesson completable via on-screen keyboard only.
6. With a Korean OS IME enabled (if available): no double input anywhere.
7. **Regression:** `learn/hangul.html` and `learn/letter-writing.html` still fully work.
8. Progress grid shows "Korean Typing" tile with live %.
