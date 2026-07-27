export const meta = {
  name: 'qa-phaseb',
  description: 'Phase B follow-ups from the 2026-07-26 triage: fill the 321 untranslated ja units, deep-review th phrases, de-anglicize fr section titles, and translate the 9 lesson_complete headings the extractor was blind to',
  phases: [
    { title: 'JA fill',    detail: 'native JA translates each gap chunk; 2nd native adjudicates' },
    { title: 'TH review',  detail: 'adversarial native review of emotions+shopping, then verify each flag' },
    { title: 'FR titles',  detail: 'French sentence-case + grammar pass on stage/step titles' },
    { title: 'Complete',   detail: 'the 9 lesson_complete titles missing th/vi/zh-tw (2 also missing ja)' },
  ],
};

/* Inputs prepared by scripts/qa-lang.cjs --extract (see the triage results doc).
     scripts/_trans/qa/lang/manifest.json          all 1964 units, every locale
     scripts/_trans/qa/lang/<lang>/chunk-NN.json   the per-stream work batches
     scripts/_trans/qa/lang/complete-titles.json   the 9 blind-spot titles
   Agents only READ. Every value they return is applied afterwards by
   scripts/qa-lang.cjs --apply, which writes the exact structural slot the
   unit id points to — no string matching in the write path. */
const DIR = 'scripts/_trans/qa/lang';
const chunk = (lang, i) => `${DIR}/${lang}/chunk-${String(i).padStart(2, '0')}.json`;

const JA_CHUNKS = 6, TH_CHUNKS = 3, FR_CHUNKS = 3;

/* House style, sampled from the ja strings already in the corpus so filled
   gaps are indistinguishable from the existing translation. */
const JA_STYLE = `Match the Japanese already in these lessons EXACTLY:
• Polite です/ます throughout; explanatory lines may end without 。 where the existing hints do.
• Full-width punctuation: 、 。 （） 「」 ：, and —— for the English em-dash.
• Korean text, Hangul, romanization (hak-gyo), and key names are DATA — reproduce them character-for-character, never translate or re-romanize them.
• Grammar terms use the standard Japanese ones: 助詞 (particle), 目的語 (object), パッチム (batchim), 連音化, 形容詞, 動詞, 助数詞.
• Real examples of the house voice:
  EN "to be embarrassed / shy" → JA "恥ずかしい"
  EN "Counter for people (neutral)?" → JA "人を数える助数詞（中立的なもの）は？"
  EN "ㄷ-group: ㄷ, ㅅ … → pronounced t (unreleased) — example: 옷 (clothes)" → JA "ㄷグループ：ㄷ、ㅅ…→t音（開放なし）——例：옷（服）"
  EN "Like 'o' in 'more'. Round your lips as if blowing a candle." → JA "「オ」の音で、唇を丸めてロウソクを吹き消すように"`;

const FILL_SCHEMA = {
  type: 'object', required: ['items'],
  properties: { items: { type: 'array', items: {
    type: 'object', required: ['id', 'value'],
    properties: { id: { type: 'string' }, value: { type: 'string' } } } } },
};
const ADJ_SCHEMA = {
  type: 'object', required: ['decisions'],
  properties: { decisions: { type: 'array', items: {
    type: 'object', required: ['id', 'value', 'changed'],
    properties: {
      id: { type: 'string' }, value: { type: 'string' },
      changed: { type: 'boolean' }, note: { type: 'string' } } } } },
};
const REVIEW_SCHEMA = {
  type: 'object', required: ['checked', 'findings'],
  properties: {
    checked: { type: 'number' },
    findings: { type: 'array', items: {
      type: 'object', required: ['id', 'verdict', 'issue', 'fix'],
      properties: {
        id: { type: 'string' },
        verdict: { type: 'string', enum: ['awkward', 'wrong'] },
        severity: { type: 'string', enum: ['low', 'med', 'high'] },
        issue: { type: 'string' }, fix: { type: 'string' } } } } },
};
const VERDICT_SCHEMA = {
  type: 'object', required: ['decisions'],
  properties: { decisions: { type: 'array', items: {
    type: 'object', required: ['id', 'accept', 'value'],
    properties: {
      id: { type: 'string' }, accept: { type: 'boolean' },
      value: { type: 'string' }, note: { type: 'string' } } } } },
};
const TITLES_SCHEMA = {
  type: 'object', required: ['titles'],
  properties: { titles: { type: 'array', items: {
    type: 'object', required: ['file', 'step', 'lang', 'value'],
    properties: {
      file: { type: 'string' }, step: { type: 'number' },
      lang: { type: 'string' }, value: { type: 'string' } } } } },
};

/* ── Stream 1 — fill the 321 empty ja units ─────────────────────────── */
async function jaFill() {
  return pipeline(
    Array.from({ length: JA_CHUNKS }, (_, i) => i),
    // Stage A — a native Japanese Korean-teacher writes the missing strings.
    i => agent(
`You are a native Japanese speaker and a Korean-language teacher writing for absolute beginners on a Japanese-language Korean course. These strings are MISSING in Japanese — the site currently falls back to raw English mid-lesson, which is the defect you are fixing.

Use the Read tool on ${chunk('ja', i)}. Each unit has:
  en       — the authoritative English meaning you must convey
  ko       — the Korean being taught (may be null)
  ref_th   — the Thai translation of the same unit (already shipped)
  ref_es   — the Spanish translation of the same unit (already shipped)
The two refs exist only to disambiguate the English — never translate FROM them.

Write natural Japanese for EVERY unit in the chunk. Requirements:
• Japanese sentence structure — SOV, verb/copula final, correct は/が/を/に/で. Never mirror English word order. A string that is lexically right but reads like translated English is a failure.
• Convey the full meaning of en. Do not omit clauses, do not add explanation that is not there.
• These are UI strings of specific kinds — a stage name must read like a section label, a quiz choice like a choice, a hint like a hint. Keep the length close to the English; do not turn a 3-word label into a sentence.
${JA_STYLE}

Return one item {id, value} for EVERY unit id in the chunk — no omissions, no extras.`,
      { label: `ja-fill:${i}`, phase: 'JA fill', model: 'sonnet', schema: FILL_SCHEMA }),

    // Stage B — a SECOND native audits the batch against the English.
    (proposed, i) => {
      const items = (proposed && proposed.items) || [];
      if (!items.length) return { decisions: [] };
      return agent(
`You are a DIFFERENT native Japanese speaker — a second reviewer and a professional JA localizer for language-learning products. Another translator filled in these missing Japanese strings. Audit every one against the English source before it ships.

Use the Read tool on ${chunk('ja', i)} for each unit's en / ko / path so you can check fidelity yourself.

For each proposed string decide the FINAL Japanese to ship:
• Meaning — does it say exactly what en says? Fix drift, omission, or invented additions.
• Fluency — is it natural Japanese with native word order and particles, or an English calque? Rewrite calques.
• Register and length — consistent です/ます, and appropriate to the string's role (label vs hint vs quiz choice).
• Data integrity — Korean text, Hangul and romanization must be reproduced exactly as in en/ko. If the translator altered, translated, or re-romanized any Korean, that is the most serious class of error; restore it.
${JA_STYLE}

Return a decision for EVERY id: {id, value (the final Japanese to ship), changed (true if you altered the proposal), note (only when changed)}.
Proposed: ${JSON.stringify(items)}`,
        { label: `ja-check:${i}`, phase: 'JA fill', model: 'sonnet', schema: ADJ_SCHEMA });
    });
}

/* ── Stream 2 — deep review of the th phrases group ─────────────────── */
async function thReview() {
  return pipeline(
    Array.from({ length: TH_CHUNKS }, (_, i) => i),
    // Stage A — adversarial native review.
    i => agent(
`You are a native Thai speaker and a Korean-language teacher, PROOFREADING the Thai in a beginner Korean course (the emotions and shopping lessons). Be skeptical — the Phase-A triage scored this group 3/5 for accuracy and found tips whose worked examples had been silently dropped. Assume more of that exists and find it.

Use the Read tool on ${chunk('th', i)}. Each unit has id, path, ko, en (authoritative meaning) and current (the Thai in production).

Flag a unit when:
• Meaning — the Thai omits, adds or drifts from en. OMISSION IS THE PRIORITY: if en contains example sentences, a list, or a second clause and the Thai does not, that is a finding even when what remains is correct.
• Fluency — English word order calqued into Thai; noun-before-adjective violated; missing/incorrect classifiers (ลักษณนาม); unnatural connectives. Lexically-correct-but-translated-sounding counts.
• Script — Thai word-boundary segmentation (Thai has no word spaces), tone marks, sara/vowel placement.
• Terminology — Korean grammar terms should use the established Thai linguistic vocabulary (e.g. ตัวสะกด for 받침), not an ad-hoc transliteration like บัดชิม. Flag inconsistent terminology.
• Do NOT flag: the Korean characters themselves, romanization, or numerals — those are intentional.

For every finding give {id, verdict: 'awkward'|'wrong', severity, issue (one line), fix (the corrected FULL Thai string, complete with anything that was missing)}. Return checked = how many units you examined. An empty findings array is a valid answer.`,
      { label: `th-review:${i}`, phase: 'TH review', model: 'sonnet', schema: REVIEW_SCHEMA }),

    // Stage B — second native adjudicates each flag against the source.
    (rev, i) => {
      const findings = ((rev && rev.findings) || []).filter(f => f && f.fix && f.fix.trim());
      if (!findings.length) return { decisions: [] };
      return agent(
`You are a DIFFERENT native Thai speaker and Korean teacher — the second reviewer. A first reviewer proposed changes to production Thai strings. Your job is to stop bad changes shipping as much as to confirm good ones.

Use the Read tool on ${chunk('th', i)} and look up each id's en (true meaning), ko, and current Thai.

For each proposal decide:
• accept=false — the current Thai was already fine, or the proposed fix introduces an error, drops information, or changes meaning. Say why in note.
• accept=true — with value = the exact final Thai to ship. Prefer the fix, but if it is accurate yet still reads like translated English, rewrite it into natural Thai yourself.
Check especially: does the fix RESTORE everything en contains (all example sentences and clauses), keep Korean/romanization byte-identical, and use correct Thai segmentation and tone marks?

Proposals: ${JSON.stringify(findings.map(f => ({ id: f.id, issue: f.issue, fix: f.fix })))}`,
        { label: `th-verify:${i}`, phase: 'TH review', model: 'sonnet', schema: VERDICT_SCHEMA });
    });
}

/* ── Stream 3 — French section-title casing and grammar ─────────────── */
async function frTitles() {
  return parallel(Array.from({ length: FR_CHUNKS }, (_, i) => () =>
    agent(
`You are a native French speaker and a professional French localizer. These are stage and step titles from a Korean course. The Phase-A triage found English-style Title Case applied throughout ("Conjonctions de Coordination", "Émotions Fondamentales") where French capitalizes only the first word — and the corpus is inconsistent, since sibling titles like "Nourriture et boissons" are already correct.

Use the Read tool on ${chunk('fr', i)}. Each unit has id, path, en, and current (the French in production).

Fix French capitalization to sentence case, plus any other French error you find. Apply real French typographic rules, NOT a blind lowercase:
• Only the first word of the title is capitalized. "Ordre des Mots — SOV" → "Ordre des mots — SOV".
• A segment after a separator (/, —, –, :, |) starts a NEW segment and keeps its own initial capital. "Encore / Déjà" and "À / De Quelqu'un" are already correct — do not lowercase Déjà or De.
• Proper nouns, languages-as-nouns, place names and acronyms keep their capital (Corée, Séoul, SOV, K-pop). Note that a language used as an ADJECTIVE is lowercase in French: "en coréen", not "en Coréen".
• Elision: "D'Autres Mots" → "D'autres mots".
• Korean text (Hangul), romanization and emoji are DATA — reproduce them exactly, never translate or re-case them.
• Also fix outright French errors if you see them: missing articles, wrong agreement, English ampersand "&" where French wants "et", missing space before ! ? : ; (French uses a space before double punctuation).

Return an item {id, value} ONLY for titles you are actually changing. If a title is already correct, omit it entirely. Do not return unchanged strings.`,
      { label: `fr-titles:${i}`, phase: 'FR titles', model: 'sonnet', schema: FILL_SCHEMA })));
}

/* ── Stream 4 — the 9 lesson_complete titles the extractor missed ───── */
async function completeTitles() {
  return agent(
`You are a professional localizer fluent in Traditional Chinese (Taiwan), Vietnamese, Thai and Japanese, working on a beginner Korean course.

Use the Read tool on ${DIR}/complete-titles.json. It lists 9 lesson-completion headings. Each entry has: file, step, en (the English heading shown to users), kr (the Korean equivalent already on the page), and missing (the locales whose translation is absent — those pages currently display the ENGLISH heading).

For EVERY entry, produce a translation for EVERY locale listed in its "missing" array. Use these exact lang codes in your output: zh_tw, vi, th, ja.

These are short celebratory headings at the end of a lesson ("Grammar Complete!", "You can read Korean!"). Requirements:
• Natural, idiomatic, and celebratory in the target language — not a literal gloss. Keep them SHORT, like a heading.
• zh_tw must be Traditional characters and Taiwan usage, never Simplified.
• vi must carry every diacritic correctly.
• th must be correctly segmented, with no word spaces inside a Thai phrase.
• ja must be polite です/ます and use full-width punctuation （！）.
• Do NOT translate the Korean in kr — it is only there to show you the intended sense.

Return one {file, step, lang, value} per (entry × missing locale). The 9 entries need zh_tw, vi and th; two of them (pronunciation, syllable-blocks) additionally need ja.`,
    { label: 'complete-titles', phase: 'Complete', model: 'sonnet', schema: TITLES_SCHEMA });
}

/* ── run the four streams concurrently ──────────────────────────────── */
const [jaBatches, thBatches, frBatches, titles] = await parallel([
  jaFill, thReview, frTitles, completeTitles,
]);

const ja = (jaBatches || []).filter(Boolean)
  .flatMap(b => (b.decisions || []))
  .filter(d => d.value && d.value.trim())
  .map(d => ({ id: d.id, value: d.value }));

const thDecisions = (thBatches || []).filter(Boolean).flatMap(b => (b.decisions || []));
const th = thDecisions.filter(d => d.accept && d.value && d.value.trim())
  .map(d => ({ id: d.id, value: d.value }));

const fr = (frBatches || []).filter(Boolean)
  .flatMap(b => (b.items || []))
  .filter(x => x.value && x.value.trim())
  .map(x => ({ id: x.id, value: x.value }));

log(`ja: ${ja.length} filled (of 321 gaps)`);
log(`th: ${th.length} corrections accepted, ${thDecisions.length - th.length} rejected`);
log(`fr: ${fr.length} titles re-cased`);
log(`complete-titles: ${((titles && titles.titles) || []).length} headings translated`);

return {
  ja, th, fr,
  completeTitles: (titles && titles.titles) || [],
  counts: { ja: ja.length, th: th.length, thRejected: thDecisions.length - th.length, fr: fr.length },
  next: 'Orchestrator: write each list to scripts/_trans/qa/lang/corrections-<lang>.json, apply with node scripts/qa-lang.cjs --apply <lang> <file>, patch the 9 lesson_complete titles, then rerun gen-lesson-static.cjs and gen-search-words.cjs.',
};
