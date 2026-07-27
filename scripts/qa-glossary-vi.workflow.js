export const meta = {
  name: 'qa-glossary-vi',
  description: 'Redo the Vietnamese align stage of qa-glossary, which returned a placeholder instead of real fixes',
  phases: [{ title: 'Align', detail: 'rewrite the 11 Vietnamese strings that contradict the agreed glossary' }],
};

/* The main qa-glossary run produced a valid Vietnamese glossary in phase 1
   but its phase-2 agent returned {"id":"test","value":"test"} — a placeholder,
   not a fix. The manifest check rejected it (unknown id "test"), so nothing
   bad shipped, but the 11 flagged units were left unfixed. This redoes only
   that stage. */
const DIR = 'scripts/_trans/glossary';
const GLOSSARY = [
  'batchim = batchim',
  'syllable block = khối âm tiết',
  'particle = trợ từ',
  'verb stem = gốc động từ',
  'dictionary form = dạng từ điển',
  'speech level = cấp độ kính ngữ',
  'counter/classifier = đơn vị đếm',
  'liaison = nối âm',
  'aspirated = bật hơi',
  'tense consonant = phụ âm căng',
].join('; ');

const FIX_SCHEMA = {
  type: 'object', required: ['fixes'],
  properties: { fixes: { type: 'array', items: {
    type: 'object', required: ['id', 'value'],
    properties: { id: { type: 'string' }, value: { type: 'string' }, note: { type: 'string' } } } } },
};

phase('Align');
const r = await agent(
`You are a native Vietnamese speaker and a Korean-language teacher, applying an agreed terminology standard to a beginner Korean course.

Agreed glossary: ${GLOSSARY}

Use the Read tool on:
  ${DIR}/vi-offenders.json  — the flagged units {id, concept, problem}
  ${DIR}/vi/chunk-00.json and ${DIR}/vi/chunk-01.json — every unit's id, en (English source) and value (the Vietnamese currently live)

Rewrite each flagged unit so it uses the canonical term:
• Change ONLY what the terminology fix requires. Do not restyle, re-punctuate or re-translate the rest of the sentence.
• The result must be grammatical Vietnamese — swapping a term often forces a classifier or word-order adjustment around it. Fix those too.
• KOREAN TEXT IS DATA. Every Hangul word in the current value (명, 세, 종성, 받침, …) must survive byte-identical. Removing or substituting a Korean term the lesson teaches is the most serious error possible here.
• Keep a first-use gloss where it helps a beginner. The goal is consistency, not stripping explanation.
• Vietnamese diacritics must be exact — a wrong dấu is a different word.

Return {id, value (the FULL corrected string, not a fragment), note} for every unit you actually change. Use the real unit ids from the files — never a placeholder. If a flagged unit turns out to be fine, omit it.`,
  { label: 'align:vi', phase: 'Align', model: 'sonnet', schema: FIX_SCHEMA });

const fixes = ((r && r.fixes) || []).filter(x => x.id && x.value && x.value.trim() && x.id !== 'test');
log(`vi: ${fixes.length} string(s) rewritten`);
return { fixes, next: 'Validate Korean-run preservation, then qa-lang.cjs --apply vi' };
