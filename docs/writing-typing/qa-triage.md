# Phase A — translation-quality triage (all 8 languages)

A cheap sampling audit that produces a **quality heatmap** across every
language × content group, so Phase B deep review is spent only where it pays
off — instead of natively re-reading ~13k lesson units on faith.

This is triage, not correction. It changes **no source files**. Output is a
report + a ranked Phase-B target list.

## What it samples
Prepared by `scripts/qa-triage-sample.cjs` (already run):
- **68 units per language** stride-sampled across all 31 lesson JSONs, tagged
  by group: `grammar (12)`, `hangul (12)`, `phrases (12)`, `vocabulary (20)`,
  `writing-typing (12)`.
- **3 representative prose pages per language**: `learn/<lang>/hangul.html`,
  `culture/<lang>/kpop.html`, `travel/<lang>/cities.html`.
- Files: `scripts/_trans/qa/triage/<lang>.json` (ja, zh-tw, es, de, fr, vi, th, id).

Sampling is stride-based (no RNG) → reproducible. An empty `val` = untranslated
(runtime falls back to English); the sampler already surfaced one real gap:
**ja has ~11/68 empty**, others full. Re-run `node scripts/qa-triage-sample.cjs`
only if lesson JSON changed.

## Agent architecture
| Role | Model | Job |
|---|---|---|
| Orchestrator | Opus (this session) | run workflow, write the heatmap report, pick Phase-B targets. No source edits. |
| Native triager ×8 | Sonnet | one per language: score each group on accuracy / naturalness / script, count gaps, name worst examples, rate 3 prose pages, recommend deep-review yes/no |

One agent per language is enough for triage — it locates problems; it does not
fix them. (Phase B, `qa-review.workflow.js`, is the one with 2-vote +
back-translation rigor.)

### Scoring is whole-sentence, not word-for-word
Each native scores three axes per group, judging the sentence as a whole:
- **accuracy** — meaning fidelity (no drift/omission/addition).
- **naturalness** — **fluency**: correct grammar (agreement, tense/aspect,
  particles, honorifics), **native word order**, and idiom. A string that is
  lexically accurate but mirrors English syntax is marked down. Each language
  carries its own structural traps the workflow spells out — e.g. ja/ko SOV &
  verb-final, de verb-final subordinate clauses, es/fr/vi/th/id adjective-after-
  noun, zh-tw topic-comment + measure words + Traditional-not-Simplified, th/vi
  classifiers. This is what makes it a *quality* check, not a dictionary check.
- **script** — orthography (Thai segmentation/tones, Vietnamese diacritics,
  Traditional characters, kana/kanji, accents).

## Run it (needs the multi-agent opt-in keyword in your prompt)
```
Workflow({ scriptPath: "scripts/qa-triage.workflow.js" })
```
~8 agents, one pass. Returns `{ heatmap: [ {lang, overall, groups[], prose[], summary} ], ... }`. Nothing is written to source.

## After it returns (orchestrator)
1. Write `docs/writing-typing/qa-triage-results.md`:
   - a lang × group grid of scores (min of accuracy/naturalness/script per cell),
   - the ja coverage gaps and any others,
   - a **Phase-B target list ordered by lowest score** — only cells scoring ≤3
     and/or `recommend_deep_review:true`, indexed content only.
2. Recommend scope. Expected priority order by risk: **th / vi / id** (Phase-2,
   newest) before **de / fr**, and **es / ja / zh-tw** (Phase-1, mature) last —
   let the actual scores override this prior.
3. No commit needed (no source changed); commit the results doc if you want it
   tracked.

## Phase B (only for flagged cells, later)
The deep workflow already exists: `scripts/qa-review.workflow.js` +
`scripts/qa-translations.cjs`. To extend it beyond the two writing/typing
lessons, add the target lesson JSONs to `FILES` in `qa-translations.cjs`, add
the target language(s) to `LANGS`, re-extract, and run the review workflow.
Spec: `docs/writing-typing/qa-thai-viet.md`.

## Guardrails
- No git write commands inside any agent.
- Field/sample-level judgment only — never whole-page similarity (it gave false
  "done" verdicts historically).
- Thai = no word spaces; Vietnamese = diacritic-critical; zh-tw = Traditional
  not Simplified. Any metric that ignores these lies.
- Judge whole-sentence fluency (grammar + word order + idiom), never
  word-for-word — an English-calqued sentence must score low even when every
  word is individually correct.
- Triage scores are a prioritization signal, not certification.
