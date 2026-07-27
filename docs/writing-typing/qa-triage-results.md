# Phase A results — translation-quality triage, all 8 languages

> **STATUS: Phase B executed 2026-07-26.** Everything below is the triage as
> it was written, followed by [what execution found](#phase-b-execution).
> Two of its headline numbers turned out to be wrong, both because the
> extractor was blind to a whole class of gap — see that section before
> trusting the coverage table.

Run 2026-07-26. Spec: [qa-triage.md](qa-triage.md). Workflow:
`scripts/qa-triage.workflow.js` — 8 native agents (Sonnet), one per language,
each scoring 68 stride-sampled lesson units across 5 content groups plus 3
prose pages. 8/8 returned, 0 errors.

**No source files were changed.** Scores are a prioritization signal, not
certification: 68 units per language is ~0.5% of the corpus.

## Score grid (lang × group)

Each cell is the **min of accuracy / naturalness / script** — the worst axis
governs, so a cell can be 3 on one bad axis while the other two are 5.
`*` = the native agent set `recommend_deep_review: true`.

| lang  | grammar | hangul | phrases | vocabulary | writing-typing | overall |
|-------|:-------:|:------:|:-------:|:----------:|:--------------:|:-------:|
| ja    | 4 *     | 4      | **3** * | 4          | 5              | 4       |
| zh-tw | 5       | 5      | 5       | 4          | 5              | **5**   |
| es    | 4       | 5      | 5       | **3** *    | 5              | 4       |
| de    | 5       | 4      | 5       | 4          | 4              | 4       |
| fr    | **3** * | 5      | 4       | 4          | 4              | 4       |
| vi    | 5       | 4      | 5       | 4          | 4              | 4       |
| th    | 4       | 4      | **3** * | 5          | 4              | 4       |
| id    | 4       | 4      | 5       | 4 *        | 4              | 4       |

Nothing scored 1 or 2. The floor across 40 cells is 3, hit four times.
`writing-typing` — the two new lessons — is the strongest group overall
(5,5,5,4,4,4,4,4), consistent with it having just been through the Phase-B
review in `qa-review.workflow.js`.

### Which axis pulled each 3-cell down
| cell | axis | cause |
|---|---|---|
| ja / phrases    | accuracy 3    | one corrupted Korean example + 4 empty vals |
| es / vocabulary | accuracy 3    | Hangul dropped from a taught word |
| th / phrases    | accuracy 3    | worked examples silently omitted |
| fr / grammar    | naturalness 3 | subject-pronoun-less verb glosses + English Title Case |

## Coverage gaps (empty `val` → falls back to English at runtime)

Measured directly from the sample files, not taken from agent counts:

| lang | grammar | hangul | phrases | vocabulary | writing-typing | total |
|------|:---:|:---:|:---:|:---:|:---:|:---:|
| ja   | 6 | 1 | 4 | 0 | 0 | **11 / 68** |
| all others | 0 | 0 | 0 | 0 | 0 | **0 / 68** |

**ja is the only language with a coverage problem, and it is a real one** —
16% of sampled units are empty, concentrated in grammar (6/12 = 50%) and
phrases (4/13 = 31%). These are not stylistic; they render as raw English
mid-lesson on an otherwise Japanese page. Confirmed examples:
`grammar::steps.44.tip.text` (the whole 별로/전혀-must-be-negative warning),
`grammar::steps.3.rules[1]` (the core 이/가 subject-particle rule),
`grammar::stages.0.name` and `hangul::stages.0.name` (stage labels leaking
English into the JP progress UI).

The ja agent reported 10; the true count is 11 (grammar is 6, not 5).

### Word bank — the CLAUDE.md coverage claim is stale
CLAUDE.md states 447 `title/body/meaning/tip` fields in
`learn/data/vocabulary-*.json` lack `_de/_fr/_vi/_th/_id` variants, and that
15 pages are `noindex` because of it. Measured today: **0 of 406 such fields
are missing in any of the 8 locales** — the word bank is fully translated. No
page under `learn/` currently carries a `noindex` tag, which is correct given
the data. `scripts/noindex-untranslated-vocab.cjs --check` still reports all
15 as DRIFT and would re-add the tag if run; its premise no longer holds.
Consequence for this report: **every sampled group is on indexed content**, so
the "indexed content only" filter excludes nothing.

## Verified defects

Every item below was re-checked against source after the agents returned.

**Confirmed as reported:**
- `emotions::steps.15.tip.text` **(ja)** — the embedded Korean example was
  altered: source teaches `감정을 표현하다`, the Japanese renders
  `감동을 표현하다`. This changes the Korean word being taught, in the string
  whose entire purpose is distinguishing 기분 from 감정. Highest-severity
  single finding in the run.
- `emotions::steps.15.tip.text` **(th)** — same string, different failure:
  both worked examples (`기분이 좋아요`, `감정을 표현하다`) are dropped
  entirely, and `fear` is missing from the 감정 gloss. Pedagogically
  load-bearing content, not paraphrase.
- `vocabulary-proverbs::steps.3.rules[2]` **(es)** — `낫다 = to be better`
  became `natda = ser mejor`. The Hangul the app exists to teach was replaced
  by romanization; every sibling entry keeps Hangul + gloss.
- `culture/zh-tw/kpop.html:425` — Korean-language `.kr-trans` span contains
  `세界가` instead of `세계가`: a Chinese character substituted into Korean
  text. Verified to be the only instance sitewide, so it is a one-off, not a
  systemic pipeline bug — but it is data corruption, not a translation issue.
- English leftovers in otherwise-localized prose (all confirmed present):
  `learn/ja/hangul.html:434` ("Incredible work — …", the closing paragraph of
  the SEO-critical `#lesson-static` block); `learn/{th,vi,zh-tw}/hangul.html:434`
  ("You can read Korean!"); `culture/ja/kpop.html:349` (stray English
  subheading). Each is per-locale, not a generator-wide gap.
- `travel/de/cities.html` — 6 price strings use English comma thousands
  separators against 8 using correct German periods, in the same page. A
  template/data-field issue, not prose quality.

**Confirmed but the agent overstated it:**
- `grammar::steps.16.rules[3]` **(fr)** — `(ai bu)` is indeed a fragment
  missing `j'`, but so is *every* entry in that array (`suis allé`,
  `ai mangé`, `ai étudié`). It is one consistent stylistic choice in one
  array, not a scattered grammatical bug — cheaper to sweep than to deep-review.

**Confirmed but not a defect — do not "fix":**
- `vocabulary-adjectives::steps.0.body` **(es and id)** — both agents flagged
  the source's "differently from **English** ones" being localized to
  "del español" / "bahasa Indonesia". The substituted claim is still true in
  both languages (Korean adjectives conjugate like verbs; Spanish and
  Indonesian ones do not), and reader-relative localization is the better
  choice here. Dismissed. This removes the only finding behind **id /
  vocabulary**'s deep-review flag.

## Phase-B target list, ordered by lowest score

Indexed content only (= all of it, per the word-bank note above). Cells
scoring ≤3 or flagged `recommend_deep_review`.

| # | cell | score | why | right tool |
|---|------|:-----:|-----|------------|
| 1 | **th / phrases**    | 3 | content omission — examples dropped from tips | full Phase-B native pass |
| 2 | **ja / phrases**    | 3 | corrupted Korean example + 4 empty vals | translation fill, then review |
| 3 | **es / vocabulary** | 3 | Hangul dropped for romanization | targeted spot-fix |
| 4 | **fr / grammar**    | 3 | systematic Title Case + pronoun-less glosses | style sweep |
| 5 | **ja / grammar**    | 4 | 6/12 empty — coverage, not quality | translation fill |
| 6 | ~~id / vocabulary~~ | 4 | sole finding dismissed above | **drop** |

## Recommendation

**The risk prior in the spec (th/vi/id → de/fr → es/ja/zh-tw) does not hold.**
The newest Phase-2 languages are not the weak ones: **vi and id came back
clean** (5s in grammar and phrases, no real defects surviving verification),
and the mature Phase-1 languages **ja and es** account for three of the six
targets. **zh-tw is the strongest language in the corpus** — 5/5 overall, its
only mark a single `我有頭痛` calque. Sequence by measured score, not by age.

Only one cell justifies the full Phase-B rigor (2-vote + back-translation):

1. **th / phrases — run Phase B.** Content is being silently dropped from
   pedagogical strings. That is the failure mode back-translation exists to
   catch, and a sample of 13 units surfacing one confirmed case implies more.
2. **ja — do a translation-fill pass first, not a review.** 11 empty vals is a
   coverage bug; reviewing empty strings finds nothing. Fill grammar + phrases
   `_ja` fields, fix the 감동/감정 corruption, then re-triage. Reviewing before
   filling wastes the pass.
3. **es / vocabulary and fr / grammar — sweeps, not reviews.** One string and
   one array respectively, both mechanically findable. Full deep review is not
   worth the tokens for either.
4. **No Phase B for zh-tw, de, vi, id.** Their findings are polish-level
   (`我有頭痛`, `bekerja secara mandiri`, `bạn bè` vs `bạn`, `Di kanan` vs
   `Di sebelah kanan`, `ist eine Streckung für`). Worth a copyedit queue; not
   worth a native pass.

Non-translation items to route separately: the `세界가` corruption, the
`travel/de/cities.html` separator inconsistency, the four English-leftover
prose lines, and the stale `noindex-untranslated-vocab.cjs` gate.

To run Phase B on th/phrases: add the phrases lesson JSONs to `FILES` in
`scripts/qa-translations.cjs`, set `LANGS` to `th`, re-extract, then run
`scripts/qa-review.workflow.js`. Spec: [qa-thai-viet.md](qa-thai-viet.md).

## Caveats
- 68 units/language ≈ 0.5% of ~13k. Absence of a finding is not absence of a
  defect — `de/kpop.html` was explicitly sampled only through its first third.
- One agent per language, no second vote and no back-translation. That is
  Phase B's job; several findings here were softened or dismissed on
  verification, which is the expected hit rate for single-pass triage.
- Sampling is stride-based and reproducible: re-run
  `node scripts/qa-triage-sample.cjs` only if lesson JSON changed.

---

# Phase B execution

Run the same day. 32 agents across two workflows
([qa-phaseb.workflow.js](../../scripts/qa-phaseb.workflow.js),
[qa-vocab-tips.workflow.js](../../scripts/qa-vocab-tips.workflow.js)), then
applied deterministically through
[qa-lang.cjs](../../scripts/qa-lang.cjs) `--apply`.

## Two things the triage got wrong

**1. The extractor could not see whole classes of gap.**
`qa-translations.cjs` decides a field is translatable by checking for a
`<field>_th` sibling. Thai is ~100% covered, so that holds almost
everywhere — but it is structurally blind to any field where **Thai itself**
is the missing locale, and such a field can then never be reported as a gap
in *any* language. It measured as translated *because* it was untranslated.

Two populations were hiding there:
- the 9 `lesson_complete` **titles** — no `_th`/`_vi`/`_zh_tw` anywhere, so
  nine lessons ended on an English heading in three locales;
- the 42 vocabulary **`tip`** objects — no `_de`/`_fr`/`_vi`/`_th`/`_id` at
  all: **210 English strings** inside the word-bank reference embedded in
  `learn/<loc>/{vocabulary,vocabulary-browser,flashcard}.html`.

`qa-lang.cjs` now tests for *any* locale sibling, which is the property that
actually makes a field localizable. Unit ids are derived from the trail and
field name, so every id the old walker produced is produced identically —
it strictly widens coverage without renumbering anything.

Corrected coverage, before any fixes:

| | ja | zh-tw | es | de | fr | vi | th | id | total |
|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|
| triage claimed | 321 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 321 |
| actually missing | 323 | 9 | 0 | 42 | 42 | 51 | 51 | 42 | **518** |

So "th gap = 0" — stated twice above — was wrong; th and vi were the joint
second-worst locales. The triage's *rate* estimate for ja grammar (50% of the
sample) was accurate; only the absolute scope was understated.

**2. The word bank was not "fully translated."** The pre-execution note above
claimed 0 of 406 fields missing and described that as covering tips. It
measured `title`/`body`/`meaning` only. Including `tip`, the real figure was
42 of 448 missing in five locales.

Some single findings were also much larger classes than reported: the es
Hangul-drop was **35 entries, not 1** (all in `vocabulary-proverbs.json`, and
es is the only locale that does it), and the de number-separator issue exists
in es/fr/id/vi too — see *Not done* below.

## What was changed

| stream | units | outcome |
|---|--:|---|
| ja gap fill | 321 | 2 natives per chunk (write → audit); ja gaps 323 → 0 |
| `lesson_complete` titles | 29 | 9 headings × th/vi/zh-tw, + 2 ja |
| th phrases deep review | 30 | 24 of 30 *restored dropped content* |
| fr section titles | 98 | English Title Case → French sentence case |
| vocabulary tips | 210 | 42 × de/fr/vi/th/id, written then audited |
| es proverbs | 35 | Hangul head restored, Spanish gloss kept |

Plus the single-string fixes: ja `감동을`→`감정을` (`emotions.json`), `세界가`→`세계가`
([kpop.html:425](../../culture/zh-tw/kpop.html)), the ja comparison subheading
in [culture/ja/kpop.html](../../culture/ja/kpop.html) (the only locale still
English there), and German thousands separators in
[travel/de/cities.html](../../travel/de/cities.html).

**The th result is the substantive one.** 24 of 30 accepted corrections made
the string *longer*, because the Thai had been truncating `body` and `tip`
text across both lessons — the triage caught one instance, and it was a
pattern. The known defect now reads correctly:

```
en      … 기분이 좋아요 = I feel good right now. 감정을 표현하다 = to express emotion.
before  기분 = อารมณ์ … 감정 = อารมณ์ความรู้สึก (เฉพาะเจาะจงกว่า เช่น ความโกรธ ความสุข)
after   … 감정 = อารมณ์ความรู้สึกเฉพาะเจาะจง (เช่น ความโกรธ ความสุข ความกลัว)
        기분이 좋아요 = ตอนนี้ฉันรู้สึกดี  감정을 표현하다 = แสดงออกทางอารมณ์
```

th accepted 30/30 with 0 rejections. That is a weak signal in general, but
here the defect class is objective — content present vs absent — rather than
a style judgement, and the length deltas corroborate it.

## Validation before applying
Every returned value was checked mechanically against the manifest first:
unknown ids, empty values, duplicate ids, and **Hangul integrity** (the Korean
in `en` must survive byte-identical into the translation). Results: 0 unknown,
0 empty, 0 duplicates, 0 Hangul corruption across all 529 applied strings.

The values flagged as "identical to English" were inspected rather than
assumed wrong, and all were correct as data: romanization quiz choices
(`ip-ni-da`, `sin-ra`), a Korean-vs-Korean title (`좋다 vs 좋아하다`), and the
`맛있어요 (mashisseoyo)` tip label. The French agents also correctly left
`Encore / Déjà`, `Bon / Mauvais` and `À / De Quelqu'un` untouched — the
per-segment-capital trap that would have made a regex sweep wrong.

## Verification after applying
- `qa-lang.cjs --status` — **0 gaps, all 2,015 units × 8 locales**
- `gen-lesson-static.cjs`, `gen-search-words.cjs`, `gen-lesson-manifest.cjs` rerun
- `audit-learn-content.cjs` — 162 pages, median 2,633 words, 0 below 300
- `audit-learn-locale-dup.cjs` — 0 of 144 pages ≥50% English prose
- `noindex-untranslated-vocab.cjs --check` — exit 0, all five locales at 0/448
- `fix-es-proverbs-hangul.cjs --check` — idempotent, exit 0
- all 35 lesson JSON files still parse

`learn/ja/hangul.html` still scores 0.467 on the duplication audit — the
highest on the site. It is a false positive: the page carries
`.en-only`/`.ja-only`/`.zh-tw-only` sibling nodes and CSS hides the English
(`body.lang-ja .en-only { display: none }`). No English prose remains. This is
the locale-swap trap CLAUDE.md documents; the metric counts the hidden sibling.

## The noindex gate
[noindex-untranslated-vocab.cjs](../../scripts/noindex-untranslated-vocab.cjs)
asserted a 2026-07-21 snapshot instead of measuring, so `--check` reported all
15 pages as DRIFT and a plain run would have **re-noindexed 15 pages whose
prose is now translated**. It now measures coverage itself and fires only
above `MIN_UNTRANSLATED_RATIO` (50%) — the "predominantly English" condition
it was actually written for, so a small backlog can no longer cost 15 URLs.
With the tips translated it reports 0/448 for all five locales.

---

# Follow-up round — UI chrome and number formatting

Scoping the "remaining problems" plan surfaced two more, both outside every
tool the triage used.

## Thai's UI pack was 68% English
`js/langs/lang-<code>.js` holds the dicts `LangManager.t()` substitutes into
page chrome: nav, buttons, card titles, badges, `Mark as Complete ✓`, reading
times. No lesson-JSON tool can see them. Measured coverage against the de
pack (631 keys, the complete UI set):

| | ja | zh-tw | es | de | fr | vi | th | id |
|---|--:|--:|--:|--:|--:|--:|--:|--:|
| before | 13 | 9 | 0 | 0 | 0 | 0 | **430** | 7 |
| after | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |

Thai scored 4/5 in the triage and its lesson content is fully translated,
while two thirds of the interface around it rendered in English on every
page. The triage could not have caught it: it instructed its agents to
*ignore UI chrome*. 459 strings translated and audited, then applied by
[ui-lang.cjs](../../scripts/ui-lang.cjs).

**A bug in that applier is worth recording.** It appends entries before the
dict's closing `};`. `th` ends its last entry with a trailing comma; `id`,
`zh-tw` and `ja` do not — so the first write produced two adjacent string
literals and a `SyntaxError`, which would have taken down *every* translation
for those three locales. Worse, the guard meant to catch it called `dictOf()`
outside a try/catch, so the parse error propagated and the rollback never
ran, leaving three broken files on disk. Restored from git; the applier now
detects the trailing comma, and re-parses inside a guard that rolls back.
Both failure modes are now covered.

## Number formatting was five locales, not one
185 numbers across 30 files: de/es/id/vi to periods, fr to spaces (matching
the ~26 pre-existing `30 000` on those pages — there was no `U+00A0` anywhere,
so none was introduced). en/ja/th/zh-tw already correct and untouched.
[fix-locale-number-format.cjs](../../scripts/fix-locale-number-format.cjs),
idempotent, `--check` exits 0.

The guard is the interesting part. Roughly 50 comma-numbers per locale sit
inside **Korean** text (`3,000만 개 이상 판매`) which is shared verbatim across
all nine locales and correct — Korean uses commas. A node-level Hangul guard
over-corrects the other way, skipping genuinely Spanish sentences that merely
mention `티머니`. Judging each number by its immediate neighbours handles both.
The script also masks `<script>`/`<style>` bodies, which sit between `>` and
`<` like any text node and would otherwise have had inline JS constants
silently rewritten; no such number exists today, and a unit test now keeps it
that way.

## Korean text corruption was 3 instances, not 1
`발現합니다` and `현象을` joined `세界가` — all zh-tw culture pages, all Hangul
syllables replaced by Hanja. Sitewide scan is now clean.

That detector needed two attempts. Naively it flagged 135 HTML nodes and 43
JSON strings, almost all correct: `한방(韓方)` Hanja glosses, the stylized
drama title `쓸쓸하고 찬란하神`, and ja/zh-tw prose legitimately quoting two
Korean tokens (`다と신`). It is only meaningful where text is supposed to be
monolingual Korean — `lang="ko"` nodes and `*_kr` fields. Scoped that way: 3
real, 0 false. **A checker that fires on correct content is worse than none.**

---

# Blind back-translation audit

The 2026-07-26 rounds were write-then-audit; two batches (the 9
`lesson_complete` titles, the 98 French section titles) had no second pass at
all. So the newest ~1,150 strings on the site were also the least verified.
[qa-verify.workflow.js](../../scripts/qa-verify.workflow.js) closed that:
every string was back-translated to English by a translator who never saw the
source, then a native ruled on the divergence.
[qa-verify-extract.cjs](../../scripts/qa-verify-extract.cjs) reads the CURRENT
value out of source, so what is verified is what actually shipped, and emits a
`blind-NN.json` without the `en` field — if the back-translator sees the
source it reproduces it and the check becomes circular.

**1,121 strings checked. 5 findings, 0 critical, 1 major.**

| lang | checked | findings |
|---|--:|---|
| th | 503 | 1 minor — phonetic aid used aspirated พ for plain ㅂ in 부끄럽다; the site uses unaspirated ป (ปูซาน, 59×) |
| fr | 139 | 1 major, 2 minor |
| id | 48 | 1 minor — `"Korean Typing" → "Mengetik Korea"` is ungrammatical and inconsistent with the pack's own `"Belajar Bahasa Korea"` |
| ja / vi / de / zh-tw | 431 | none |

The major: `pronunciation::stages.2.name` shipped as *"Assimilation nasale"*
where the English is bare *"Assimilation"*. Checking the stage's contents
made it worse than reported — every step in it is about **liaison** (연음화),
not nasal assimilation, so the French label actively mislabels the section.

**Attribution matters here.** Three of the five are French, and all three
PRE-EXISTED this session: git shows `"Assimilation Nasale"`,
`"Quatre Patterns de Blocs Syllabiques"`, `"« Tu » en Coréen"` in HEAD. The
casing sweep only lowercased them; back-translation surfaced the wording
underneath. The other two (th, id) were written this session and are mine.

All five applied. That a 1,121-string audit found five defects and no critical
ones is the evidence that write-then-audit held up — but it is also why the
audit was worth running, since a same-language proofread cannot catch a
fluent string that quietly says something else.

## Institutionalized
[audit-i18n.cjs](../../scripts/audit-i18n.cjs) now gates all eight
invariants: lesson coverage, UI pack parity, packs parse+register, Korean
purity, number formatting, the noindex gate, es Hangul, and JSON validity.
There is no CI, so it is a manual pre-deploy check.

It was fault-tested rather than trusted: deleting a Thai UI key and
re-injecting `현象을` both produced a named failure and exit 1. Every
sub-check documents what it **cannot** see, because that is where each defect
this session actually hid.

---

# culture/ + travel/ prose — first measurement, then fill

The triage rated 3 pages per locale by eye (24 of 180). Nothing had ever
measured the other 156.
[audit-content-locale-dup.cjs](../../scripts/audit-content-locale-dup.cjs) is
the first thing to look.

**Coverage was fine: 0 of 160 pages are ≥50% English, and none reaches even
20%.** That part of the concern was unfounded. But 55 pages carried leftover
paragraphs, and grouping by string is what made it tractable — **79 distinct
English strings, 9 of them English in all 8 locales** and 9 more in 7. A small
set of never-translated paragraphs, not 55 independent problems. 253 jobs, 8
agents, 93 real changes applied (the rest were proper-noun lists the natives
correctly returned unchanged).

Leftover English: **11,009 chars over 55 pages → 5,862 over 29**. The residue
is legitimately shared content — rosters (`LA Dodgers (2013–2019) · Toronto
Blue Jays`), film-title lists, romanized Korean, `BTS, BLACKPINK, TWICE…`.

## Three measurement bugs found while building this

Worth recording, because each would have produced a confident wrong number.

**1. The exclusion list could not be copied from learn/.** culture/travel
carry ~8,300 romanization nodes under class names absent from learn/ —
`rom-text` (2454), `food-card-rom` (1737), `phrase-rom` (1305), `rom-cell`
(1101), `sodam-rom-text` (648). Romanized Korean is supposed to be identical
in every locale, so reusing learn/'s list would have reported translated pages
as untranslated — the historical error with the sign flipped.

**2. A naive `/rom/` test also eats `travel-promo-*`.** Seven classes of real
prose contain "rom" inside "promo". The pattern is anchored on token
boundaries and unit-tested against 29 real class names.

**3. The trailing `<` was being consumed.** The matcher that blanks excluded
elements used `>([^<]*)<`, so `/g` resumed *after* the `<` that would have
started the next element — meaning an excluded element directly following
another excluded element was never tested. Concretely:

```html
<div class="dialogue-rom">Annyeonghaseyo…<span class="ja-kana"> アンニョン…</span>
```

the div is excluded, and the CSS-hidden Japanese behind it leaked into the
prose set and was reported as untranslated content on the Spanish page.
Changing it to a lookahead dropped the false positives from 35 strings/40
pages to 32/29. The same bug exists in the pre-existing
`audit-learn-locale-dup.cjs`; measured there it changes nothing (7,442 chars
either way — learn/ has no adjacent-excluded-element pattern), so that script
was left alone rather than churned on a hypothetical.

The three scripts now share
[_locale-prose.cjs](../../scripts/_locale-prose.cjs). They had each carried
their own copy of the rules and had already begun to drift — and a rule
missing from one is not cosmetic: the audit over-reports, the extractor hands
translators content that is already correct, and the patcher writes a
translation into a node that must stay identical in every locale.

---

# Terminology glossary

The triage caught one instance — Thai transliterating 받침 as บัดชิม instead of
the linguistic term ตัวสะกด. Probing the corpus showed a wider class.

**The first version of the measurement was useless and was thrown away.**
Counting raw occurrences flags every locale as inconsistent, because glossing
— `batchim (consonante final)` — is correct teaching, not a defect. Only a
*competing standalone* rendering, where the canonical term appears nowhere in
the same string, is a candidate defect. That filter surfaced the two
unambiguous cases: **German using two different native synonyms**
(`Endkonsonant` AND `Schlusskonsonant`) and Japanese using three forms.

[qa-glossary-extract.cjs](../../scripts/qa-glossary-extract.cjs) gathers the
142 units teaching any of 10 tracked terms;
[qa-glossary.workflow.js](../../scripts/qa-glossary.workflow.js) has a native
per locale agree the canonical rendering, then rewrite only the contradictions.
95 strings changed (84 + 11 vi).

## Thai disagreed with the triage, and Thai won
The triage recommended replacing บัดชิม with ตัวสะกด. The glossary native —
having read all 142 units rather than 12 sampled ones — chose to **keep**
บัดชิม, arguing that Thai has no single native word for a syllable-final
consonant slot carrying the seven-sound-reduction rules this course teaches,
so it is legitimately a loanword term glossed on first use. Both natives agreed
there IS a defect; they disagreed on which way to unify. The real problem was
`letter-writing.json` and parts of `syllable-blocks.json` switching to native
descriptive phrases mid-lesson. Unified to บัดชิม.

## The validator caught what review did not
Every returned fix was checked so that **every Hangul run in the source
survives into the translation**. This rejected 7 fixes that same-language
review had passed, including two Japanese ones that rewrote the Korean terms
`합쇼체`/`해요체`/`문어체` as `합쇼体`/`해요体`/`문어体` — substituting a Japanese
kanji into the Korean word the lesson exists to teach.

An earlier, looser version of this check ("en has Hangul, so value must have
Hangul") passed a Spanish fix that replaced the taught `종성` with `받침`. The
rule has to be *the same* Korean, not *some* Korean.

Vietnamese phase 2 returned `{"id":"test","value":"test"}` — a placeholder.
The manifest check rejected it as an unknown id, so nothing shipped; that
stage was re-run separately ([qa-glossary-vi.workflow.js](../../scripts/qa-glossary-vi.workflow.js))
and produced 11 real fixes.

## Result
Standalone alternates for *batchim* after the pass: **de and zh-tw now clean.**
Japanese still shows `パッチム`/`終声` in 23 units — and that is correct. The
screening probe conflated two different English terms: those units say *"final
consonant (종성)"*, not *"batchim"*, so `終声` is the right rendering. The
native flagged only the genuine cases. A mechanical unification would have
corrupted them, which is exactly why the decision was left to natives.

---

# Deep sample — the second, wider quality cut

Coverage reached 100% early; quality did not. Measured against the manifest,
**1,630–1,942 units per locale had never been looked at by anything** — the
triage sampled 0.5% and every pass since was aimed at a known problem.

[qa-deep-sample.cjs](../../scripts/qa-deep-sample.cjs) takes 97 units at 5% of
the never-triaged set, stratified across all five content groups, stride-based
so it reproduces. [qa-deep.workflow.js](../../scripts/qa-deep.workflow.js)
reviews them with a native per locale and adjudicates every finding with a
second native. **776 string reviews → 29 flagged (3.7%) → 27 accepted.**

| lang | flagged | accepted |
|---|--:|--:|
| fr | 9 | 8 |
| ja | 4 | 4 |
| es / de / vi / th | 3 each | 3, 2, 3, 3 |
| zh-tw / id | 2 each | 2 |

## Why the sample is shared across locales
The same 97 ids are reviewed in all eight. It costs nothing and buys a signal
no per-locale sample can produce: if many natives independently flag the same
unit, suspect the ENGLISH SOURCE rather than eight separate translations.

It fired once — `hangul::steps.11.hint`, flagged by 4 of 8. Reading the actual
strings showed it was **not** one shared source defect but three different
ones landing on the same fragile unit:

```
EN     Aspirated 't' — like 't' in 'ten' (at word start). Strong burst.
de     "wie t am Wortanfang"     ← anchor word dropped: circular, no example
fr     "comme le t au début"     ← same
th     "เหมือน ต ใน ten"          ← ต is UNASPIRATED, for an aspirated sound
vi     "như 't' trong 'ten'"     ← "(at word start)" qualifier dropped
zh-tw  "與中文ㄊ相似"              ← localized to Zhuyin: the best answer here
```

So the signal identified a genuinely fragile unit rather than a bad source —
a dense hint whose components different translators dropped differently. The
useful pattern underneath: **de and fr systematically dropped concrete
pronunciation anchor words** where other locales kept or localized them. The
German fix went further than restoring "ten" and anchored to `Tasse`, which is
what zh-tw had been doing with Zhuyin all along.

## The validator was wrong twice, in the safe direction
The Korean-preservation rule was first written as *"every Hangul run in `en`
must appear in the fix."* That falsely rejected two good fixes which were
purely additive, because the CURRENT translation already lacked a Korean token
and the fix simply didn't add it back — penalizing a fix for a pre-existing
gap it did not cause.

Corrected rule: **a fix may not remove Korean the current value has.** A
pre-existing gap against `en` is a real but separate problem, reported as a
warning instead of a veto. Re-checking every earlier rejection under the
corrected rule confirmed all the glossary ones were genuine
(`합쇼체`→`합쇼体`, dropped `종성`) except `th nouns::steps.24.body`, which was
recovered and applied.

Both errors failed safe — a good change was withheld, not a bad one shipped.
That is the right direction for this check to be wrong in, but it is still
worth stating that the first version of the rule was too blunt.

---

# Sidebar nav labels — found by a human, missed by every audit

Reported from the UI: the right-rail "explore" widget showed `라면 가이드` /
`만두 가이드` on non-Korean pages. The widget is innocent —
`js/app.js::relatedWidgetHTML` clones `.sidebar-nav .sidebar-link` innerHTML,
so it inherits whatever the sidebar says.

Scope, once measured: **17 distinct pure-Korean labels across 981 sidebar
links, in every locale including English** — `culture/kpop.html` itself showed
`🍜 라면 가이드`. 868 + 15 rewritten; 10/10 invariants now cover it.

**Why ten audits missed it.** Every prose audit drops text nodes containing
Hangul, on the correct principle that Korean is the subject being taught and
is supposed to be identical in every locale. That principle is true of lesson
content and **false of navigation chrome**, where Korean is not content — it
is an untranslated UI string. Nothing encoded the distinction, so the labels
were invisible by construction. The UI-pack audit did not cover them either:
these labels live in page HTML, not in `js/langs/`.

**The fix is a copy, not a translation.** The same locale already rendered
these links correctly on other pages — `culture/es/kfood.html` said "Guía del
ramyeon" where `culture/es/kpop.html` said `라면 가이드`. Labels are keyed by
basename+hash so `ramyeon.html` and `/culture/de/ramyeon.html` resolve to the
same link, which is what made the last 127 fixable. Only zh-tw's `찜질방` had
no localized form anywhere; it became `찜질방文化`, taken from that page's own
meta description and matching its sibling `X文化` pattern.

## I broke 64 pages fixing it
The first run produced `♨️ ♨️ Jjimjilbang`. The label harvester stripped emoji
with `U+1F300–1FAFF`, but **♨ is U+2668** — outside it — so the icon was
harvested into the canonical label and written back beside the existing
`<span class="link-icon">`. Verification caught it, the range was widened to
cover the symbol blocks plus VS16/ZWJ, and all 64 were repaired.

The first *detector* for the damage was also wrong: it stripped tags but kept
the icon span's text, so all 21,059 links "repeated their icon". Removing the
icon element before comparing gave the true number, 64 — all `♨️`, exactly the
emoji outside the original range.

Both halves are now invariants in `audit-i18n.cjs` and were fault-tested by
injecting a Korean-only label and a doubled icon; each failed the audit with a
named reason, then reverted.

## Not done — deliberately
- **Polish-level findings** for zh-tw/de/vi/id (`我有頭痛`,
  `bekerja secara mandiri`, `bạn bè` vs `bạn`, `Di kanan`, `ist eine Streckung
  für`). A copyedit queue; still not worth a dedicated native pass.
- **`de/kpop.html` past its first third** — the triage sampled only the
  opening of that file, so the rest has never been read. The deep sample
  covers lesson JSON, not long-form culture prose.
- **Locale-swap markup.** Every page ships other locales' copy hidden by CSS
  (`.ja-block`, `.ja-kana`, `.en-only`). It is correct and it is what the
  audits exclude, but it means each page carries bytes no reader will see.
  A real concern, unrelated to translation quality.
- **fr thousands separator is a plain space,** matching the ~26 pre-existing
  instances rather than the narrow no-break space French typography prefers.
  Converting the whole fr corpus to `U+202F` is a separate change.

*(The number-separator sweep and the culture/travel prose fill, listed here as
"not done" in earlier revisions, were completed in the follow-up rounds above.)*

## Caveat on all of this
The triage sampled 0.5% and got two structural facts wrong. Everything since
has been driven by measurement instead — and the recurring lesson is that the
**measurement** was almost always the bug, not the translation: a `_th`-sibling
detector blind to Thai gaps, a field list that omitted `tip`, a `noindex` gate
asserting a stale snapshot, a regex consuming the `<` that would have started
the next excluded element, a Korean-preservation rule too blunt to tell a new
defect from a pre-existing one.

What is now true: every localizable field is populated in all 8 locales, the
UI packs are at parity, and 5.5% of lesson units have been natively reviewed
(0.5% triage + 5% deep) with every finding adjudicated by a second native.

What is still not true: that the other ~94% is *good*. It is populated and it
passes every automated invariant. The deep sample's 3.7% flag rate is the best
current estimate of what a full review would surface, and at that rate roughly
70 more defects remain in the unreviewed remainder.
