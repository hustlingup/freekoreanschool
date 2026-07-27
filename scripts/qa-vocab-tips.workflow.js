export const meta = {
  name: 'qa-vocab-tips',
  description: 'Translate the 42 vocabulary tip objects missing in de/fr/vi/th/id (210 strings) — the residue that keeps the word-bank noindex gate alive',
  phases: [
    { title: 'Translate', detail: 'one native per language writes the 42 missing tips' },
    { title: 'Check',     detail: 'second native audits the batch against the English' },
  ],
};

/* Why this exists: learn/data/vocabulary-*.json carries a `tip` object
   ({label, text}) on ~42 steps. title/body/meaning are translated in all 8
   locales, but `tip` has NO _de/_fr/_vi/_th/_id variant at all — 210 strings
   that render in English inside the word-bank reference embedded in
   learn/<loc>/{vocabulary,vocabulary-browser,flashcard}.html.

   They measured as "0 gaps" for years because qa-translations.cjs detects a
   localizable field by looking for a `_th` sibling, and Thai is one of the
   missing locales. scripts/qa-lang.cjs now tests for ANY locale sibling,
   which is what surfaced them. See docs/writing-typing/qa-triage-results.md.

   Inputs: node scripts/qa-lang.cjs --extract --langs de,fr,vi,th,id \
             --lessons vocabulary --fields tip --gaps-only --chunk 60 */
const DIR = 'scripts/_trans/qa/lang';
const LANGS = [
  { code: 'de', name: 'German',     trap: 'verb-second in main clauses but verb-FINAL in subordinate clauses; correct case; noun gender; natural compounds' },
  { code: 'fr', name: 'French',     trap: 'post-nominal adjectives; gender/number agreement; sentence case in headings, not English Title Case; space before ! ? : ;' },
  { code: 'vi', name: 'Vietnamese', trap: 'noun BEFORE adjective; classifiers; every tone mark correct — a wrong dấu is a different word' },
  { code: 'th', name: 'Thai',       trap: 'no word spaces inside a Thai phrase; noun before adjective; classifiers (ลักษณนาม); use ตัวสะกด for 받침, never a transliteration' },
  { code: 'id', name: 'Indonesian', trap: 'correct affixation (me-/ber-/-kan/-i); noun before adjective; natural word order, not literal from English' },
];

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

const results = await pipeline(
  LANGS,
  // Stage A — native writes the missing tips.
  ({ code, name, trap }) => agent(
`You are a native ${name} speaker and a Korean-language teacher writing for absolute beginners. These lesson TIPS are missing in ${name} — the vocabulary pages currently show them in English, which is the defect you are fixing.

Use the Read tool on ${DIR}/${code}/chunk-00.json (and chunk-01.json, chunk-02.json if they exist). Each unit has:
  id       — return this verbatim
  path     — ends in /tip.label or /tip.text
  en       — the authoritative English to convey
  ref_es   — the Spanish rendering of the same unit, already shipped
  ref_th   — the Thai rendering, if one exists
Refs disambiguate the English only — never translate FROM them.

Two kinds of string, treat them differently:
• tip.label — a SHORT badge above the tip ("Tip", "Remember", "Watch out"). Keep it short and idiomatic; do not expand it into a sentence.
• tip.text  — one or two sentences of teaching advice. Convey the full meaning of en with no omission and no invented additions.

Requirements:
• Native ${name} structure — ${trap}. A string that is lexically accurate but mirrors English syntax is a failure; write what a ${name} teacher would actually say.
• Korean text, Hangul and romanization are DATA — reproduce them character-for-character. Never translate, re-romanize or re-order them.
• Keep the register friendly and consistent with a beginner course.

Return one item {id, value} for EVERY unit in your chunk(s) — no omissions, no extras.`,
    { label: `tips:${code}`, phase: 'Translate', model: 'sonnet', schema: FILL_SCHEMA }),

  // Stage B — second native audits.
  (proposed, { code, name, trap }) => {
    const items = (proposed && proposed.items) || [];
    if (!items.length) return { decisions: [] };
    return agent(
`You are a DIFFERENT native ${name} speaker — a second reviewer and professional localizer. Another translator wrote these missing ${name} tips. Audit each against the English before it ships.

Use the Read tool on ${DIR}/${code}/chunk-00.json (plus chunk-01/02 if present) for each unit's en and path.

For each, decide the FINAL ${name} string:
• Meaning — exactly what en says. Fix drift, omission, invented additions.
• Fluency — native ${name} grammar and word order (${trap}), not an English calque. Rewrite calques outright.
• Role — a /tip.label must stay a SHORT badge; a /tip.text may be a sentence or two. Reject a label that was expanded into a sentence.
• Data integrity — Korean, Hangul and romanization reproduced exactly. Any alteration there is the most serious error class; restore it.

Return a decision for EVERY id: {id, value (final string to ship), changed (true if you altered it), note (only when changed)}.
Proposed: ${JSON.stringify(items)}`,
      { label: `tips-check:${code}`, phase: 'Check', model: 'sonnet', schema: ADJ_SCHEMA });
  });

const byLang = {};
LANGS.forEach(({ code }, i) => {
  const r = results[i];
  byLang[code] = ((r && r.decisions) || [])
    .filter(d => d.value && d.value.trim())
    .map(d => ({ id: d.id, value: d.value }));
  log(`${code}: ${byLang[code].length} tips translated`);
});

return {
  byLang,
  counts: Object.fromEntries(Object.entries(byLang).map(([k, v]) => [k, v.length])),
  next: 'Orchestrator: write each to scripts/_trans/qa/lang/corrections-tips-<lang>.json, apply with node scripts/qa-lang.cjs --apply <lang> <file>, then rerun gen-lesson-static.cjs and re-check noindex-untranslated-vocab.cjs.',
};
