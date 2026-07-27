export const meta = {
  name: 'qa-verify',
  description: 'Blind back-translation audit of the 1,121 strings written during the 2026-07-26 translation pass — the newest and least-verified content on the site',
  phases: [
    { title: 'Back-translate', detail: 'blind: translator sees only the shipped string, never the English source' },
    { title: 'Adjudicate',     detail: 'native compares source vs blind back-translation and rules on drift' },
  ],
};

/* Inputs from: node scripts/qa-verify-extract.cjs --chunk 120
     scripts/_trans/verify/<lang>/blind-NN.json  {ref, text}        ← stage A
     scripts/_trans/verify/<lang>/chunk-NN.json  {ref, en, shipped} ← stage B

   The letter-writing/typing pass verified itself this way and the
   2026-07-26 rounds did not: they were write-then-audit, and two batches
   (the 9 lesson_complete titles, the 98 French section titles) had no second
   pass at all. Back-translation catches what a same-language audit cannot —
   a fluent, confident string that quietly says something else.

   Stage A MUST stay blind. If the back-translator sees the English it will
   reproduce it and the check becomes circular. */
const DIR = 'scripts/_trans/verify';
const JOBS = [
  { code: 'th', name: 'Thai',                            chunks: 5 },
  { code: 'ja', name: 'Japanese',                        chunks: 3 },
  { code: 'fr', name: 'French',                          chunks: 2 },
  { code: 'vi', name: 'Vietnamese',                      chunks: 1 },
  { code: 'id', name: 'Indonesian',                      chunks: 1 },
  { code: 'de', name: 'German',                          chunks: 1 },
  { code: 'zh-tw', name: 'Traditional Chinese (Taiwan)', chunks: 1 },
];

const BACK_SCHEMA = {
  type: 'object', required: ['items'],
  properties: { items: { type: 'array', items: {
    type: 'object', required: ['ref', 'en_back'],
    properties: { ref: { type: 'string' }, en_back: { type: 'string' } } } } },
};
const VERDICT_SCHEMA = {
  type: 'object', required: ['checked', 'findings'],
  properties: {
    checked: { type: 'number' },
    findings: { type: 'array', items: {
      type: 'object', required: ['ref', 'severity', 'issue', 'fix'],
      properties: {
        ref: { type: 'string' },
        severity: { type: 'string', enum: ['minor', 'major', 'critical'] },
        issue: { type: 'string' },
        fix: { type: 'string' } } } } },
};

const results = await pipeline(
  JOBS,
  // ── Stage A — blind back-translation ──────────────────────────────────
  ({ code, name, chunks }) => agent(
`Translate each ${name} string below into plain English.

Use the Read tool on ${Array.from({ length: chunks }, (_, i) => `${DIR}/${code}/blind-${String(i).padStart(2, '0')}.json`).join(', ')}. Each unit has a "ref" and a "text".

You are NOT given any source or reference, and you must not try to guess what the original English "should" have been. Translate ONLY what the ${name} actually says — literally enough that a meaning error, a missing clause, or an added claim would show up plainly in your English. If a string is a short UI label, return a short English label. If part of the string is Korean, romanization, a brand name, an emoji or a number, carry it through as-is rather than translating it.

Return {ref, en_back} for EVERY unit across all your chunk files. Return the ref exactly as given.`,
    { label: `back:${code}`, phase: 'Back-translate', model: 'fable', schema: BACK_SCHEMA }),

  // ── Stage B — native adjudicates source vs blind back-translation ─────
  (back, { code, name, chunks }) => {
    const items = (back && back.items) || [];
    if (!items.length) return { checked: 0, findings: [] };
    return agent(
`You are a native ${name} speaker and a Korean-language teacher, auditing ${name} strings that are ALREADY LIVE on a beginner Korean course. Your job is to catch meaning errors that a same-language proofread would miss.

Use the Read tool on ${Array.from({ length: chunks }, (_, i) => `${DIR}/${code}/chunk-${String(i).padStart(2, '0')}.json`).join(', ')}. Each unit has:
  ref      — the identifier
  en       — the AUTHORITATIVE English source
  shipped  — the ${name} currently live

Below is an independent, blind back-translation of each shipped string into English, produced by a translator who never saw "en". Where "en_back" diverges from "en", the shipped ${name} may have drifted — but the back-translation is also just evidence, not truth: a faithful translation often back-translates as a loose paraphrase. Judge the SHIPPED ${name} itself; use en_back only as a signal about where to look hard.

Report a finding ONLY where the shipped string is genuinely defective:
• critical — it states something the source does not, teaches the WRONG Korean, or drops a whole clause/example the source has. Any alteration of Korean text, Hangul or romanization is critical.
• major — meaningful drift, omission or addition that changes what a learner takes away.
• minor — awkward or non-idiomatic ${name}, or a register/length problem in a UI label.
Do NOT report: a faithful translation that merely back-translates loosely, a UI label that is a normal localization of the English rather than a literal gloss, Korean/romanization/brand names deliberately left as-is, or stylistic preference.

For each finding give {ref, severity, issue (one line), fix (the corrected FULL ${name} string, ready to ship)}. Return "checked" = how many units you examined. An empty findings array is the expected result for most chunks.

Blind back-translations: ${JSON.stringify(items)}`,
      { label: `judge:${code}`, phase: 'Adjudicate', model: 'sonnet', schema: VERDICT_SCHEMA });
  });

const byLang = {};
let totalChecked = 0, totalFindings = 0;
JOBS.forEach(({ code }, i) => {
  const r = results[i] || {};
  const f = (r.findings || []).filter(x => x && x.fix && x.fix.trim());
  byLang[code] = f;
  totalChecked += r.checked || 0;
  totalFindings += f.length;
  const crit = f.filter(x => x.severity === 'critical').length;
  const maj = f.filter(x => x.severity === 'major').length;
  log(`${code}: ${r.checked || 0} checked, ${f.length} findings (${crit} critical, ${maj} major)`);
});

return {
  byLang,
  totals: { checked: totalChecked, findings: totalFindings },
  next: 'Orchestrator: review findings by severity. Route unit fixes through qa-lang.cjs --apply and UI fixes through ui-lang.cjs --apply, then rerun gen-lesson-static.cjs.',
};
