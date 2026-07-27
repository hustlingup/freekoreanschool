export const meta = {
  name: 'qa-glossary',
  description: 'Agree one rendering per Korean teaching term per locale, then rewrite the strings that disagree',
  phases: [
    { title: 'Agree', detail: 'native reads all 142 term-bearing strings and fixes the canonical rendering' },
    { title: 'Align', detail: 'native rewrites only the strings that contradict the agreed term' },
  ],
};

/* Inputs from: node scripts/qa-glossary-extract.cjs --chunk 90
     scripts/_trans/glossary/<lang>/chunk-NN.json  {id, term, en, value}

   Why: the triage found Thai transliterating 받침 as บัดชิม where the
   established Thai linguistic term is ตัวสะกด. Probing showed the class is
   wider — German uses BOTH Endkonsonant and Schlusskonsonant for the same
   concept; Japanese uses 받침 / パッチム / 終声.

   The judgement belongs to the native, not to a counter: introducing the
   Korean term and glossing it once ("batchim (consonante final)") is correct
   teaching. Only a competing STANDALONE rendering is a defect. */
const DIR = 'scripts/_trans/glossary';
const CHUNKS = 2;
const LANGS = [
  { code: 'ja', name: 'Japanese' },
  { code: 'zh-tw', name: 'Traditional Chinese (Taiwan)' },
  { code: 'es', name: 'Spanish' },
  { code: 'de', name: 'German' },
  { code: 'fr', name: 'French' },
  { code: 'vi', name: 'Vietnamese' },
  { code: 'th', name: 'Thai' },
  { code: 'id', name: 'Indonesian' },
];
const files = code => Array.from({ length: CHUNKS },
  (_, i) => `${DIR}/${code}/chunk-${String(i).padStart(2, '0')}.json`).join(' and ');

const GLOSSARY_SCHEMA = {
  type: 'object', required: ['terms', 'offenders'],
  properties: {
    terms: { type: 'array', items: {
      type: 'object', required: ['concept', 'canonical', 'rationale'],
      properties: {
        concept: { type: 'string' }, canonical: { type: 'string' },
        observed: { type: 'array', items: { type: 'string' } },
        rationale: { type: 'string' } } } },
    offenders: { type: 'array', items: {
      type: 'object', required: ['id', 'concept', 'problem'],
      properties: { id: { type: 'string' }, concept: { type: 'string' }, problem: { type: 'string' } } } },
  },
};
const FIX_SCHEMA = {
  type: 'object', required: ['fixes'],
  properties: { fixes: { type: 'array', items: {
    type: 'object', required: ['id', 'value'],
    properties: { id: { type: 'string' }, value: { type: 'string' }, note: { type: 'string' } } } } },
};

const results = await pipeline(
  LANGS,
  // ── Phase 1 — decide the canonical rendering, name the offenders ──────
  ({ code, name }) => agent(
`You are a native ${name} speaker and a Korean-language teacher. You are setting the TERMINOLOGY STANDARD for a beginner Korean course in ${name}, then finding the strings that break it.

Use the Read tool on ${files(code)}. Each unit has: id, term (which concept it teaches), en (the English source), value (the ${name} currently live).

STEP 1 — for each concept present (batchim, syllable block, particle, verb stem, dictionary form, speech level, counter/classifier, liaison, aspirated, tense consonant), read how the corpus actually renders it and decide the SINGLE canonical ${name} rendering the course should use everywhere. Consider:
• What a real ${name} textbook or linguistics reference uses. Prefer your language's established technical term over an ad-hoc phonetic transliteration of the Korean — a Thai text says ตัวสะกด, not บัดชิม.
• Whether the Korean term itself should be kept (some courses teach 받침 as a word the learner must know) and glossed on first use. That is a legitimate choice — but it must then be the consistent one, and say so in the rationale.
• Report every rendering you actually observed in "observed", including ones you reject.

STEP 2 — list the units that CONTRADICT your canonical choice as "offenders" {id, concept, problem}.
⚠️ Do NOT flag a unit that merely glosses: "batchim (consonante final)" alongside the canonical term is good teaching, not a defect. Flag only where a COMPETING rendering is used standalone in place of the canonical one, or where two different words for one concept would confuse a learner. If your locale is already consistent, return an empty offenders array — that is a good answer, not a failure.`,
    { label: `glossary:${code}`, phase: 'Agree', model: 'sonnet', schema: GLOSSARY_SCHEMA }),

  // ── Phase 2 — rewrite only the offenders, carrying the glossary through ─
  (gloss, { code, name }) => {
    const offenders = ((gloss && gloss.offenders) || []).filter(o => o && o.id);
    if (!offenders.length) return { fixes: [], glossary: gloss };
    const terms = ((gloss.terms) || []).map(t => `${t.concept} = ${t.canonical}`).join('; ');
    return agent(
`You are the same native ${name} Korean teacher, now applying the terminology standard you just set.

Agreed glossary: ${terms}

Use the Read tool on ${files(code)} to get each flagged unit's full current "value" and its "en".

Rewrite each flagged unit so it uses the canonical term:
• Change ONLY what the terminology fix requires. Do not restyle, re-punctuate or re-translate the rest of the sentence.
• The result must be grammatical ${name} — swapping a term often forces an article, case, particle, classifier or agreement change around it. Fix those too.
• Korean text, Hangul, romanization and worked examples are DATA — reproduce them exactly.
• Keep a first-use gloss where it helps a beginner. The goal is consistency, not stripping explanation.

Flagged: ${JSON.stringify(offenders)}

Return {id, value (the full corrected string), note} for each. If on reflection a flagged unit was actually fine, omit it.`,
      { label: `align:${code}`, phase: 'Align', model: 'sonnet', schema: FIX_SCHEMA })
      // pipeline yields only the LAST stage, so carry phase 1's glossary forward
      .then(r => ({ ...r, glossary: gloss }));
  });

const fixes = {}, glossaries = {};
LANGS.forEach(({ code }, i) => {
  const r = results[i] || {};
  fixes[code] = (r.fixes || []).filter(x => x.id && x.value && x.value.trim());
  glossaries[code] = (r.glossary && r.glossary.terms) || [];
  const flagged = (r.glossary && r.glossary.offenders || []).length;
  log(`${code}: ${glossaries[code].length} term(s) agreed, ${flagged} flagged, ${fixes[code].length} rewritten`);
});

return {
  fixes, glossaries,
  counts: Object.fromEntries(Object.entries(fixes).map(([k, v]) => [k, v.length])),
  next: 'Orchestrator: write each to scripts/_trans/glossary/fixes-<lang>.json, apply with node scripts/qa-lang.cjs --apply <lang> <file>, then rerun gen-lesson-static.cjs.',
};
