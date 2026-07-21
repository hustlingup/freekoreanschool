# Lesson quiz standard

Written 2026-07-21 after an audit found 48 of 78 `match_quiz` steps in
`learn/data/vocabulary*.json` were pedagogically broken, then extended the same
day to the nine core lessons (`grammar`, `hangul`, `pronunciation`,
`syllable-blocks`, `nouns`, `pronouns`, `speech-levels`, `shopping`,
`emotions`), which were worse. **Applies to every `match_quiz` in
`learn/data/`** — all 31 files, 193 quizzes.

## The checker is necessary, not sufficient

`scripts/audit-vocab-quizzes.cjs` catches mechanical faults. It does NOT catch:

- prompts phrased "X is best described as…" or "X means…" — `wantsKorean()`
  does not fire, so a form question with English options passes
- a *distractor* whose gloss gives the answer away (only the correct option is
  leak-checked)
- distractors that are eliminable without knowing any Korean
- a quiz that merely restates a reading card shown two steps earlier
- a rule taught in a card that no quiz tests

Every one of those was found by an agent reading a file the checker had passed.
**Read the quizzes.** A green audit is a floor.

## The data shape

```jsonc
{
  "type": "match_quiz",
  "prompt": "먹다 → polite present tense is...",
  "choices": ["마셔요", "먹다", "먹어요", "먹했어요"],
  "correct": "먹어요",
  "prompt_de": "…", "choices_de": [ … ]   // one pair per locale
}
```

Locales: `ja`, `zh_tw`, `es`, `de`, `fr`, `vi`, `th`, `id`.

`js/step-runner.js` `renderMatchQuiz()` puts the **untranslated** `choices[i]` in
`data-value` and only the localized string in the visible label, then compares
`data-value` against `correct`. So:

- `correct` must be byte-identical to one entry of `choices` (the English array).
- Every `choices_<lang>` must have the **same length and same order** as `choices`.
  A reordered or short array silently mislabels the answer.
- Never localize `correct`.

## The three quiz kinds

**1. Recognition — "which Korean word means X?"**
Options MUST be Korean. The learner is being asked to pick a Hangul form.
English or localized options make this untestable: the question becomes
"can you read the gloss I already gave you."

- `choices` = Korean words, all four plausible for the category.
- **Delete `choices_<lang>` entirely.** Korean is Korean in every locale;
  a localized copy of a Hangul array is noise and drifts.
- Only `prompt_<lang>` is translated.

"Korean" means Korean *only*. Bare jamo (`ㄱ`, `ㅏ`) count, and so does a
romanization tag (`ㅇ (ng)`). But `ㅌ (aspirated t)` or `ㄱ-group (k)` carries
real prose and DOES need `choices_<lang>`. The checker draws the line at a run
of 3+ Latin letters.

**2. Comprehension — "what does 〈Korean〉 mean?"**
Options are meanings, and SHOULD be localized. This is a legitimate item.

- `choices` = English meanings; `choices_<lang>` = translated meanings.
- The prompt must NOT contain the answer. See the leak rule below.

**3. Form/conjugation — "먹다 → polite present is…"**
Options MUST be Korean inflected forms, including at least one that is
plausibly wrong (`먹했어요`, not a random other verb). Same rule as kind 1:
delete the `choices_<lang>` arrays.

## Hard rules

**No answer in the prompt.** If the prompt glosses the Korean, the gloss cannot
also be the correct option. `Which verb means 'to study'?` → `To study` is not a
question. Either move to kind 1 (Korean options, prompt keeps the gloss) or drop
the gloss from the prompt.

**Distractors must be defensible.** All wrong options plausible, same category,
same register, similar length. No throwaways. For form questions, wrong options
should be errors a learner actually makes.

**Exactly one defensible answer.** Watch for near-synonyms in other languages —
a distractor glossed "big store" becomes correct once 백화점 is rendered
*grand magasin* in French. Check every locale, not just English.

**Don't leak through the gloss.** If options are Korean-plus-gloss
(`응급실 (emergency room)`), the gloss can answer the question by itself. Prefer
bare Korean for kind 1.

**Korean is never translated.** Hangul stays Hangul in every locale. Localize
only the surrounding natural language.

## After editing

```bash
node scripts/audit-vocab-quizzes.cjs     # must report 0 problems
node scripts/vocab-i18n.cjs audit        # must stay N/N for all 8 locales
node scripts/gen-lesson-static.cjs       # re-render the static blocks
node scripts/gen-search-words.cjs
```
