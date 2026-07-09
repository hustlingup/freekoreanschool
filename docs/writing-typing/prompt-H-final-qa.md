# Prompt H — Final QA: end-to-end acceptance of Letter Writing + Korean Typing

Prerequisites: prompts A–G all completed. This prompt makes NO feature changes — only verification and small fixes for anything the checklist catches. Run with `node dev.js` on http://localhost:3000.

## 1. Automated checks (all must pass)

```bash
node scripts/validate-stroke-data.cjs
node scripts/gen-lesson-manifest.cjs      # rerun must be a no-op diff (idempotent)
node scripts/gen-search-words.cjs         # rerun must be a no-op diff
node scripts/audit-ad-zones.cjs
node scripts/audit-content-parity.cjs
git diff --stat                            # after the reruns above: no changes
```

Plus the golden tests from prompts A (roundtrip + spot checks), C (stroke_count cross-check), D (IME goldens), F1/F2 (translation completeness) — rerun all of them verbatim.

## 2. Fresh-profile lesson run-through (EN)

In a private/incognito window (clean localStorage):

- **letter-writing.html**: complete steps 1–10 by hand (2 reading cards, ㄱ/ㄴ demo+trace pairs). Verify: trace gating (Next hidden until strokes pass), continue button appears, streak badge updates, `ks-progress-v2` accumulates `letters`. Jump `?step=63`, complete the 빛 pair and one quiz. Jump to the final step, confirm confetti + `completed: true`. Free-play: type 햟 → 12 strokes render; trace mode works; `?swdebug=1` still shows the overlay (leave the feature in — it's harmless).
- **typing.html**: complete stage 1–2 by hand; key_intro highlights keys, physical + on-screen input both count. Run one syllable drill and the 60s sprint. Verify `quizzes` counter, CPM plausibility, summary card. Free-play pad: type 안녕하세요 via physical keys.

## 3. Cross-cutting

- **Progress grid**: sidebar grid shows Letter Writing (after Hangul) and Korean Typing (after Pronunciation) with live % on both new pages AND on an old page (grammar.html). Resume card points at the most recent lesson/step.
- **Search**: header search finds "Letter Writing", "Typing", "ㄱ", "두벌식" (if tagged), and a typing.json word; deep links land on the right `?step=`.
- **Themes**: toggle dark/light on both pages — stroke guides, keyboard keys, stats bar all legible in both.
- **Mobile emulation** (iPhone-class viewport): trace a full syllable without page scroll; complete a key_intro step via on-screen keyboard; ad zones don't overlap widgets; lesson-header accordion behavior matches other learn pages.
- **Regression sweep**: hangul.html (quiz + syllable_builder step + free builder), vocabulary.html (category tabs), one culture page, index.html — all normal. No console errors on any of them.

## 4. Mirrors (2-language spot check minimum)

For `ja` and one Phase-2 language (`th` or `id`): open both new pages — chrome language correct, lesson steps show translated hints/tips, widgets show localized labels, hreflang lang-switcher round-trips, progress persists across EN ↔ mirror (same lesson id, shared localStorage).

## 5. Housekeeping

- `git status`: no stray scratch files, no accidental edits to `learn/data/vocabulary.json`, no regenerated files outside the intended set.
- `git diff js/step-runner.js js/app.js`: additions only in the planned hook points (renderers map, mount hook, hideTypes, `strokeContinue`/`stepContinue` + replay exposure, counter buckets, LESSONS array, SEARCH_INDEX entries).
- Confirm nothing was committed unless the user asked.

## 6. Report

End with a summary: what passed, what was fixed during QA, any known cosmetic gaps (e.g. jamo shapes vs font fidelity, variant coverage capped at ㄱ/ㅋ), and the exact list of files changed across the whole feature (from `git status`).
