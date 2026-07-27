# Letter-Writing + Korean Typing — Implementation Overview

Two new learn sections for freekoreanschool.com:

1. **Letter Writing** (`learn/letter-writing.html`, lesson id `letter-writing`) — animated SVG stroke-order for hangul, from single jamo (ㄱ) to complex syllables (햟), with watch mode and trace-practice mode.
2. **Korean Typing** (`learn/typing.html`, lesson id `typing`) — Dubeolsik (두벌식 2-set) keyboard guide with on-screen keyboard + typing games (jamo drills → syllable typing → word typing, CPM scoring), working **without** a Korean IME installed.

Both are StepRunner lessons with a free-play widget at the bottom, fully wired into progress grid, search, sitemap, and all 8 language mirrors.

## Execution order

Execute prompts strictly in order. Each is self-contained and ends with verification steps that MUST pass before moving on.

| Prompt | Deliverable |
|---|---|
| `prompt-A-foundation.md` | `js/hangul-util.js`, `js/stroke-data.js`, `scripts/validate-stroke-data.cjs` (pure data + node-testable, no UI) |
| `prompt-B-stroke-writer.md` | `js/stroke-writer.js` (StrokeWriter engine + StrokeFreePlay widget), `.sw-*` CSS, skeleton `learn/letter-writing.html` |
| `prompt-C-writing-lesson.md` | Step types `stroke_demo`/`stroke_trace` in step-runner.js, `learn/data/letter-writing.json` (EN), finished page |
| `prompt-D-ime-typing-engine.md` | `js/hangul-ime.js` (2-set IME automaton), `js/typing-game.js` (keyboard UI + 3 games + free-play), `.kb-*` CSS, skeleton `learn/typing.html` |
| `prompt-E-typing-lesson.md` | Step types `key_intro`/`typing_drill`, `learn/data/typing.json` (EN), finished page |
| `prompt-F1-translations-writing.md` | All 8 language fields in `letter-writing.json` |
| `prompt-F2-translations-typing.md` | All 8 language fields in `typing.json` + widget UI labels |
| `prompt-G-mirrors-wiring.md` | Sidebars (16 EN pages), LESSONS grid array, search index, 8-language mirror pages, sitemap/hreflang, ad zones |
| `prompt-H-final-qa.md` | End-to-end QA checklist |

## Architecture summary

### Stroke data (prompt A)
- Author only **24 base jamo shapes** (14 basic consonants + 10 basic vowels) as **geometric primitives** (`line`, `poly`, `circle`) in a normalized `0 0 100 100` viewBox. Never raw SVG `d` strings in data.
- All other jamo (**27 composites**: doubles ㄲㄸㅃㅆㅉ, compound vowels ㅐㅒㅔㅖㅘㅙㅚㅝㅞㅟㅢ, compound batchim ㄳㄵㄶㄺㄻㄼㄽㄾㄿㅀㅄ) are **recipes**: two refs to base shapes placed in sub-boxes. Recipe part order = correct stroke order for free.
- Any of the 11,172 syllables is composed at runtime by placing cho/jung/jong shapes into slot boxes from a **7-row layout archetype table** keyed on vowel class (vertical / horizontal / mixed, ± batchim).

### Engines
- `js/hangul-util.js` — `window.HangulUtil`: compose/decompose (Unicode formula `0xAC00 + (cho*21 + jung)*28 + jong`), vowel class, jamo combine/split tables. Shared by both features. **Do NOT refactor `js/syllable-builder.js` to use it** — leave that file untouched; duplication is accepted.
- `js/stroke-writer.js` — `window.StrokeWriter`: converts primitives → absolute-coordinate path `d` strings (transforms baked numerically, never SVG `transform` attributes), animates via stroke-dasharray/dashoffset + rAF, trace mode via pointer events with tolerance checking, debug font-overlay mode for calibration.
- `js/hangul-ime.js` — `window.HangulIME`: pure 2-set input automaton (no DOM), node-testable, with batchim stealing and component-level backspace.
- `js/typing-game.js` — `window.TypingGame`: on-screen HTML keyboard, physical-key capture, 3 game modes, CPM (타/분) scoring.

### Codebase conventions (apply to ALL prompts)
- **No build step.** Vanilla HTML/CSS/JS served directly. New JS files are IIFE modules assigned to a `const` + `window.<Name>` global, `'use strict';` at top, matching `js/syllable-builder.js` style.
- Node-testable files (`hangul-util.js`, `stroke-data.js`, `hangul-ime.js`) end with:
  ```js
  if (typeof module !== 'undefined') module.exports = <TheGlobal>;
  ```
  and must not touch `document`/`window` at load time except the global assignment (guard with `typeof window !== 'undefined'`).
- **Localization**: lesson JSON fields use suffixes `_ja`, `_zh_tw`, `_es`, `_fr`, `_de`, `_vi`, `_th`, `_id` on the English base field. step-runner's `loc(obj, base)` picks the variant. Pronunciation aids are dedicated fields: `katakana` (ja), `zhuyin` (zh-tw), `reading_vi`, `reading_th`; fallback `romanization`.
- Widget UI strings (outside step-runner) use the inline lang-detection pattern from `js/syllable-builder.js` `init()` (lines 67–73), extended to all 8 langs like step-runner's `_detectLang()` (js/step-runner.js:68).
- **CSS**: single file `css/style.css`, CSS custom properties only. Dark is default; light via `[data-theme="light"]` selectors. Tokens: `--primary` (#E8003D), `--secondary`, `--accent`, `--bg-card`, `--border`, `--text`, `--text-secondary`. Every new component must look right in BOTH themes.
- Escape all user/data strings interpolated into HTML with the local `esc()` helper (step-runner has one at js/step-runner.js:707; widgets define their own).
- Audio/feedback globals available on every page: `AudioCache.play(text)`, `speakKorean(text)`, `playDing()`, `spawnConfetti()`.
- **AdSense**: ⚠️ **STALE — corrected 2026-07-24.** This doc set was written 2026-07-09, before commit `8fc0bbc` ("chore(ads): remove all manual ad units for Auto Ads migration"). `js/ads.js`, the `window.KSAds` global, and `scripts/audit-ad-zones.cjs` **no longer exist**. Do not add `<script defer src="../js/ads.js">` to any new page, do not call `window.KSAds.push()`, and do not run `audit-ad-zones.cjs` (prompts B §3, D §150, G §68–70, H are wrong on this). No `learn/*.html` page carries an `ad-zone` div any more — the site is on Auto Ads. The surviving rule, should a zone ever return: collapse via `height:0`, NEVER `display:none`.

- **CSS token names**: the token is `--text`, not `--text-primary` (the latter is defined nowhere in `css/style.css`). Corrected 2026-07-24.

## Non-negotiable rules for the executor

1. **`js/step-runner.js` and `js/app.js` are shared by every lesson page.** Any new hook you add must be guarded: `if (window.StrokeWriter) …` / `if (window.TypingGame) …`. After editing either file, load `learn/hangul.html` and confirm it still works — that is a mandatory regression check.
2. **Never run** `scripts/gen-content-mirrors.cjs`, `scripts/gen-root-mirrors.cjs`, or any `gen-*-site.cjs` — they overwrite translated prose.
3. Run `node scripts/validate-stroke-data.cjs` after ANY edit to `js/stroke-data.js`.
4. Rerun `node scripts/gen-lesson-manifest.cjs` after adding/changing lesson JSONs, and `node scripts/gen-search-words.cjs` after content edits. Never hand-edit `learn/data/manifest.json` or `learn/data/search-words.json`.
5. Dev server: `node dev.js` → http://localhost:3000. Test in browser at each phase's verification step.
6. Stroke-count convention is fixed: **ㅈ = 2 strokes, ㅊ = 3 strokes** (handwriting convention). Lesson copy and quiz answers must match `stroke-data.js` counts exactly — the validator table in prompt A is the single source of truth.
7. Don't commit unless asked. Keep `git status` clean of stray files (scratch scripts go to the OS temp dir, not the repo).

## Known risks (mitigations are built into the prompts)

- **Jamo shape quality**: shapes are teaching diagrams, not font glyphs. Calibrate with StrokeWriter's `debug:true` font overlay (prompt B). Positional variants are capped: only ㄱ/ㅋ get an optional `cho_v` variant, decided in prompt B.
  - ⚠️ **The debug overlay was biased — read this before re-running calibration.** `dominant-baseline:central` renders Noto Sans KR **4.82 units too low** in the 100×100 viewBox: the browser centres on the hhea ascender/descender midpoint (436 font units), but the font's Hangul design centre is the ideographic centre (380 fu). Anyone who trusts the raw overlay will push every shape down by that amount to make it "line up". Fixed in `js/stroke-writer.js` — do not revert it, and do not calibrate against an overlay that lacks the correction.
  - Calibration was executed 2026-07-24 against measured glyph ink. Consequences recorded elsewhere: `js/stroke-data.js` (not prompt A §2.2–2.4) is now the source of truth for coordinates; `layouts.jamo` gained `solo_v`/`solo_h`/`solo_m` alongside `solo` (prompt A §2.4); ㅎ/ㅊ's top tick became a slanted dot, with learner-facing copy required by prompt C. **No stroke count changed** — rule 6 below still holds exactly.
- **Trace on mobile**: `touch-action:none` on the trace SVG is mandatory (otherwise scrolling eats pointermove); touch gets looser tolerance; 3 failed attempts auto-plays the stroke as a hint.
- **IME double input**: typing games never use `<input>`/`<textarea>` — a focused `tabindex="0"` div + `keydown` with `e.code` + `preventDefault()` + ignoring `e.isComposing` makes the OS Korean IME irrelevant.
- **Translation volume**: prompts F1/F2 are data-only, no code. Follow the suffix checklist and completeness check exactly.
