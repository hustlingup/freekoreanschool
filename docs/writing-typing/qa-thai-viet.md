# Thai & Vietnamese translation QA — execution spec

Simulated-native review of the two new lessons (`letter-writing`, `typing`).
Everything needed is prepared. This doc is self-contained: a fresh session can
execute from it alone.

## What is under review
- **258 indexed-content units per language** — every `_th` / `_vi` string in
  `learn/data/letter-writing.json` (138) and `learn/data/typing.json` (120):
  titles, bodies, rules, tips, hints, quiz prompts/choices, drill-word meanings,
  stage names. This is the crawlable prose that matters for quality + AdSense.
- **~47 UI-label strings** (buttons, hints) in JS — reviewed in place, see §5.

## Prepared files (already generated, do not regenerate unless re-extracting)
```
scripts/qa-translations.cjs              extract + apply harness (verified loss-free, bijective)
scripts/qa-review.workflow.js            the multi-agent workflow, ready to run
scripts/_trans/qa/manifest.json          all 258 units: {id, path, loc, ko, en, th, vi}
scripts/_trans/qa/review/th/chunk-00..08.json   9 review batches (≤30 units)
scripts/_trans/qa/review/vi/chunk-00..08.json
scripts/_trans/qa/glossary.seed.json     Korean term glossary skeleton (Phase 1 fills it)
```
Each unit `id` is a stable structural address (e.g.
`typing::steps.26.items.35.meaning`). `--apply` writes a corrected string back
into the exact `<field>_<lang>` slot that id names — no string matching in the
write path, so extract → review → apply is a pure function of the verdicts.

## Agent architecture
| Role | Model | Job |
|---|---|---|
| Orchestrator | Opus (this session + the workflow script) | control flow, merge, run `--apply`, audits, commit. Never translates. |
| Back-translator | Fable | blind `th`/`vi` → EN, no source shown — objective drift signal |
| Native reviewer ×N | Sonnet | per-chunk adversarial proofread: meaning, naturalness, script, glossary |
| 2nd native (adjudicator) | Sonnet | independent re-judge of each flagged fix, using the back-translation |
| Korean expert | Sonnet | Phase 1 glossary — one agreed rendering per Korean term |

Core rule: **the reviewer that proposes a fix never gets the final say.** A fix
ships only if a *second* independent native accepts it AND its blind
back-translation matches the English meaning.

## Execution workflow
1. **Glossary** — Korean expert fills `glossary.seed.json` th/vi. Locks
   terminology so 받침/초성/두벌식/etc. render one way across all 258 strings.
2. **Review** (fan-out, Sonnet) — one native reviewer per chunk, adversarial
   ("assume errors exist"). Flags `awkward`/`wrong` units with a proposed fix.
3. **Verify** (pipeline) — for each flag: Fable back-translates the fix blind →
   a second native adjudicates fix-vs-source using that back-translation →
   accept/repair/reject. Output: accepted corrections per language.

Run it (multi-agent → needs the opt-in keyword in your prompt):
```
Workflow({ scriptPath: "scripts/qa-review.workflow.js" })
```
It spawns ~1 (glossary) + 18 (review) + ~a few (verify) agents; the concurrency
cap (~14 live) throttles automatically. Returns
`{ glossary, corrections:{th,vi}, report }` — nothing is written to source yet.

## Apply → audit → commit (orchestrator, after the workflow returns)
```
# 1. persist the returned corrections
#    write corrections.th  -> scripts/_trans/qa/corrections-th.json  (JSON: [{id,value},...])
#    write corrections.vi  -> scripts/_trans/qa/corrections-vi.json
node scripts/qa-translations.cjs --apply th scripts/_trans/qa/corrections-th.json
node scripts/qa-translations.cjs --apply vi scripts/_trans/qa/corrections-vi.json

# 2. regenerate derived artifacts
node scripts/gen-lesson-static.cjs            # rebuild #lesson-static (AdSense crawl content)
node scripts/gen-learn-mirrors.cjs            # rebuild learn/<lang> HTML shells

# 3. verify nothing broke
node scripts/audit-learn-content.cjs          # word-count / static-block audit (expect 18/18 pass)
node scripts/audit-learn-locale-dup.cjs       # field-level dup — th/vi must not regress toward EN

# 4. also persist the agreed glossary for the record
#    write glossary -> scripts/_trans/qa/glossary.json

# 5. commit on the current feature branch
```
⚠️ `gen-learn-mirrors.cjs` regenerates vocabulary/flashcard/vocabulary-browser
wholesale — after running it, confirm those 15 app pages did not revert to
English (`git diff --stat`); if they did, `git checkout HEAD -- <those files>`
(this happened before — see CLAUDE.md).

## §5 — UI labels (review in place, ~47 strings)
Small, button-level, low risk. A native reads each `th:`/`vi:` block against its
`en:` sibling and edits directly. Do NOT translate the 타/분 units or the
⇧ ⌫ ␣ / Shift / Space key glyphs.
- `js/stroke-writer.js` — SWLabels: `en:` ~L63, `vi:` L173, `th:` L191
- `js/typing-game.js`   — TGLabels: `vi:` L417, `th:` L464
- `scripts/gen-lesson-static.cjs` — static UI labels: `th:` block ~L220
  (rerun `gen-lesson-static.cjs` after editing this one)

## Guardrails (project-specific, non-negotiable)
- **No git write commands inside any agent** (an agent `git checkout`'d away
  uncommitted work last time). Agents read; the orchestrator commits.
- **Field-level metric only.** Never judge "translated?" by whole-page
  similarity — it gave two false "done" verdicts historically. Exclude Korean,
  romanization, and locale-swap pairs.
- Thai has **no word spaces** and Vietnamese lives or dies on **diacritics** —
  any metric requiring a space silently passes them. Ban it.
- Simulated natives ≠ certified natives. Ship as "AI-reviewed", not "native-
  certified". The back-translation + 2-vote + glossary raise the floor hard on
  *meaning* errors; residual risk is register/cultural nuance.

## Re-extract (only if the JSON source changed)
```
node scripts/qa-translations.cjs --extract   # rebuilds manifest + chunks; if chunk count ≠ 9, update CHUNKS in the workflow
```
