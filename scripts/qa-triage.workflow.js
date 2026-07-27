export const meta = {
  name: 'qa-triage',
  description: 'Phase A triage: one native speaker per language scores a sample of every content group → quality heatmap that says where Phase B deep review is worth paying for',
  phases: [{ title: 'Triage', detail: 'native scores sampled units + 3 prose pages per language' }],
};

/* Inputs prepared by scripts/qa-triage-sample.cjs:
   scripts/_trans/qa/triage/<lang>.json — {lang, htmlSamples[3], groups{group:[{id,path,ko,en,val}]}}
   Each native agent reads its own file and 3 representative HTML pages. */
const DIR = 'scripts/_trans/qa/triage';
const LANGS = [
  { code: 'ja', name: 'Japanese' }, { code: 'zh-tw', name: 'Traditional Chinese (Taiwan)' },
  { code: 'es', name: 'Spanish' }, { code: 'de', name: 'German' }, { code: 'fr', name: 'French' },
  { code: 'vi', name: 'Vietnamese' }, { code: 'th', name: 'Thai' }, { code: 'id', name: 'Indonesian' },
];

// per-language structural traps a word-for-word translation fails silently
const STRUCT = {
  ja: 'SOV order and verb/copula-final clauses; correct particles (は/が/を/に/で); keigo/politeness level consistent; avoid English SVO calques',
  'zh-tw': 'topic-comment structure; correct measure words (量詞); no English-word-order calque; 的/得/地 used correctly; Traditional characters and Taiwan usage (not Simplified/PRC)',
  es: 'adjective normally AFTER the noun; gender & number agreement; ser vs estar; natural pronoun-drop; not English word order',
  de: 'verb-second in main clauses but verb-FINAL in subordinate clauses; correct case (Nom/Akk/Dat/Gen); noun gender; natural compounds, not English order',
  fr: 'adjective placement (mostly post-nominal); gender/number agreement; natural use of articles and de; not calqued from English',
  vi: 'noun BEFORE adjective; classifiers/measure words (cái, con, …); correct tone marks; analytic word order, no English calque',
  th: 'no word spaces; noun before adjective; classifiers (ลักษณนาม); verb serialization; polite particles where register calls for it; no English calque',
  id: 'affixation (me-/ber-/-kan/-i) applied correctly; noun before adjective; natural word order, not literal from English',
};

const SCORE = { type: 'integer', minimum: 1, maximum: 5 };
const TRIAGE_SCHEMA = {
  type: 'object', required: ['lang', 'overall', 'groups', 'prose', 'summary'],
  properties: {
    lang: { type: 'string' },
    overall: SCORE,
    groups: { type: 'array', items: {
      type: 'object', required: ['group', 'accuracy', 'naturalness', 'script', 'coverage_gaps', 'recommend_deep_review'],
      properties: {
        group: { type: 'string' },
        accuracy: SCORE, naturalness: SCORE, script: SCORE,
        coverage_gaps: { type: 'integer' },
        worst_examples: { type: 'array', items: {
          type: 'object', required: ['id', 'problem'],
          properties: { id: { type: 'string' }, problem: { type: 'string' } } } },
        recommend_deep_review: { type: 'boolean' },
      } } },
    prose: { type: 'array', items: {
      type: 'object', required: ['page', 'score'],
      properties: { page: { type: 'string' }, score: SCORE, note: { type: 'string' } } } },
    summary: { type: 'string' },
  },
};

phase('Triage');
const results = await parallel(LANGS.map(({ code, name }) => () =>
  agent(
`You are a native ${name} speaker and a language teacher, triaging the ${name} translations on a beginner Korean-learning site. Be skeptical and fast — this is a sampling audit to locate weak areas, not a line edit.

STEP 1 — sampled lesson strings. Use the Read tool on ${DIR}/${code}.json. It has content groups (grammar, hangul, phrases, vocabulary, writing-typing); each unit has en (authoritative meaning) and val (the ${name} to judge; an empty val means untranslated — it falls back to English at runtime).
For EACH group score 1–5 (5 = a native teacher would ship it as-is). Judge the sentence as a whole, NOT word by word:
  • accuracy     — does val carry the exact meaning of en? No drift, omission, or addition.
  • naturalness  — FLUENCY, not literal translation. Correct grammar (agreement, tense/aspect, particles, honorifics) AND native WORD ORDER AND idiomatic phrasing a real ${name} teacher would use. A string can be lexically accurate and still fail here if it mirrors English syntax instead of ${name} structure — mark those down. ${name} structural traps to weigh: ${STRUCT[code] || 'native grammar and word order, not an English calque'}.
  • script       — ${code === 'th' ? 'Thai word-boundary segmentation, tone marks, vowel placement'
      : code === 'vi' ? 'Vietnamese diacritics/tone marks (a wrong dấu = a wrong word), spacing'
      : code === 'zh-tw' ? 'Traditional (not Simplified) characters, Taiwan usage'
      : code === 'ja' ? 'kanji/kana correctness, natural particle use'
      : 'spelling, accents, agreement'}
Count coverage_gaps = empty vals in the group. List up to 3 worst_examples {id, problem} — prefer examples of grammar/word-order/calque failure, not just single wrong words. Set recommend_deep_review=true if this group in ${name} needs the full Phase-B native pass.

STEP 2 — prose pages. Read these three and rate the visible ${name} body prose for FLUENCY — grammar, native word order, and idiom, not just vocabulary — flagging any English-calqued sentence structure (ignore Korean text, romanization, and UI chrome): ${JSON.stringify([`learn/${code}/hangul.html`, `culture/${code}/kpop.html`, `travel/${code}/cities.html`])}. Return {page, score 1–5, note}.

STEP 3 — return lang, an overall 1–5, the per-group scores, the prose scores, and a one-paragraph summary naming the weakest areas.`,
    { label: `triage:${code}`, phase: 'Triage', model: 'sonnet', schema: TRIAGE_SCHEMA })));

const heatmap = results.filter(Boolean);
heatmap.forEach(r => log(`${r.lang}: overall ${r.overall}/5 — ${r.groups.filter(g => g.recommend_deep_review).map(g => g.group).join(', ') || 'no deep review flagged'}`));

return {
  heatmap,
  langsReturned: heatmap.length,
  next: 'Orchestrator: write docs/writing-typing/qa-triage-results.md (lang×group score grid, coverage gaps, Phase-B target list ordered by lowest score). Then decide which (lang,group) cells to run through scripts/qa-review.workflow.js style deep review.',
};
