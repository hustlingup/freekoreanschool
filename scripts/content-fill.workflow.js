export const meta = {
  name: 'content-fill',
  description: 'Translate the 79 English prose strings still shown on culture/travel pages — 253 jobs across 8 locales, including 9 paragraphs left English in every single locale',
  phases: [{ title: 'Translate', detail: 'one native per locale writes the leftover prose' }],
};

/* Inputs from: node scripts/extract-content-untranslated.cjs --chunk 45
     scripts/_trans/content/<lang>/chunk-NN.json  {ref, en}

   Found by scripts/audit-content-locale-dup.cjs, which is the first thing to
   measure culture/ and travel/ at all — the 2026-07-26 triage rated 3 pages
   per locale by eye and nothing else had ever looked at the other 156.

   Coverage there turned out to be good (0 of 160 pages are >=50% English),
   but 55 pages carry leftover paragraphs, and grouping by string showed why
   it looked worse than it is: 9 strings are English in ALL 8 locales and 9
   more in 7, so this is a small set of never-translated paragraphs rather
   than 55 independent problems.

   These are prose paragraphs in a long-form magazine register (K-drama
   history timelines, sports profiles, food guides), not UI labels. */
const DIR = 'scripts/_trans/content';
const JOBS = [
  { code: 'ja', name: 'Japanese', chunks: 1, trap: 'SOV, verb/copula final, correct particles; です/ます; full-width punctuation （）、。; no English word order' },
  { code: 'zh-tw', name: 'Traditional Chinese (Taiwan)', chunks: 1, trap: 'Traditional characters and Taiwan usage, never Simplified/PRC; topic-comment structure; correct measure words' },
  { code: 'es', name: 'Spanish', chunks: 1, trap: 'adjective after the noun; gender/number agreement; ser vs estar; natural pronoun drop' },
  { code: 'de', name: 'German', chunks: 1, trap: 'verb-second in main clauses, verb-FINAL in subordinate; correct case and gender; natural compounds' },
  { code: 'fr', name: 'French', chunks: 1, trap: 'mostly post-nominal adjectives; agreement; sentence case in headings, not English Title Case; space before ! ? : ;' },
  { code: 'vi', name: 'Vietnamese', chunks: 1, trap: 'noun before adjective; classifiers; every tone mark correct — a wrong dấu is a different word' },
  { code: 'th', name: 'Thai', chunks: 1, trap: 'no word spaces inside a Thai phrase; noun before adjective; classifiers (ลักษณนาม)' },
  { code: 'id', name: 'Indonesian', chunks: 2, trap: 'correct affixation (me-/ber-/-kan/-i); noun before adjective; natural word order' },
];

const FILL_SCHEMA = {
  type: 'object', required: ['items'],
  properties: { items: { type: 'array', items: {
    type: 'object', required: ['en', 'value'],
    properties: { en: { type: 'string' }, value: { type: 'string' } } } } },
};

const results = await parallel(JOBS.map(({ code, name, chunks, trap }) => () =>
  agent(
`You are a native ${name} speaker and a professional localizer working on a Korean-culture and Korean-travel magazine site. The paragraphs below are still displayed in ENGLISH on the ${name} pages — that is the defect you are fixing.

Use the Read tool on ${Array.from({ length: chunks }, (_, i) => `${DIR}/${code}/chunk-${String(i).padStart(2, '0')}.json`).join(' and ')}. Each unit has:
  ref — the page it appears on, for context about the surrounding topic
  en  — the English paragraph to translate

Requirements:
• Long-form editorial register — these are body paragraphs in a magazine-style article (K-drama history timelines, athlete profiles, food and beauty guides), NOT UI labels. Write the way a ${name} culture journalist would, in complete natural sentences.
• Native ${name} structure: ${trap}. A sentence that is lexically accurate but mirrors English syntax is a failure — restructure it.
• Convey everything the English says. Do not drop a clause, a date, a statistic or a name, and do not add claims that are not there.
• PROPER NOUNS AND TITLES ARE DATA. Korean text, Hangul, romanized titles, show names, artist names, brand names, platform names (Netflix, Disney+), years and numbers must survive exactly. Where your language conventionally localizes a well-known show or film title, you may use the established ${name} title, but never invent one.
• Keep any punctuation that carries structure — em dashes separating clauses, parenthetical years like (Jumong, 2006), percentage and currency figures.

Return one item {en, value} for EVERY unit in your chunk(s). The "en" must be returned byte-identical to the input — it is the key used to place your translation back into the page.`,
    { label: `content:${code}`, phase: 'Translate', model: 'sonnet', schema: FILL_SCHEMA })));

const byLang = {};
JOBS.forEach(({ code }, i) => {
  const r = results[i];
  byLang[code] = ((r && r.items) || []).filter(x => x.en && x.value && x.value.trim());
  log(`${code}: ${byLang[code].length} paragraphs translated`);
});

return {
  byLang,
  counts: Object.fromEntries(Object.entries(byLang).map(([k, v]) => [k, v.length])),
  next: 'Orchestrator: write each to scripts/_trans/content/corrections-<lang>.json, apply with node scripts/apply-content-translations.cjs <lang> <file>, then re-run audit-content-locale-dup.cjs.',
};
