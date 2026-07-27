export const meta = {
  name: 'ui-lang-fill',
  description: 'Translate the missing UI language-pack strings — 430 for Thai (68% of site chrome), plus small gaps in id/zh-tw/ja',
  phases: [
    { title: 'Translate', detail: 'native writes the missing chrome strings' },
    { title: 'Check',     detail: 'second native audits length, register and placeholders' },
  ],
};

/* Inputs from: node scripts/ui-lang.cjs --extract --langs th,id,zh-tw,ja --chunk 110
     scripts/_trans/ui/<lang>/chunk-NN.json — {key, ref_de}

   These are CHROME strings, not lesson prose: nav items, buttons, card
   titles, badges, section headings, reading-time labels. The hard constraint
   is LENGTH — they sit in fixed-width nav bars, buttons and cards, so a
   translation twice the English width breaks the layout. */
const DIR = 'scripts/_trans/ui';
const JOBS = [
  { code: 'th', name: 'Thai',                          chunks: 4, trap: 'no word spaces inside a Thai phrase; keep it SHORT — Thai runs long and this is chrome, not prose; use ตัวสะกด for 받침, never a transliteration' },
  { code: 'id', name: 'Indonesian',                    chunks: 1, trap: 'correct affixation (me-/ber-/-kan/-i); noun before adjective' },
  { code: 'zh-tw', name: 'Traditional Chinese (Taiwan)', chunks: 1, trap: 'Traditional characters and Taiwan usage, never Simplified/PRC; correct measure words' },
  { code: 'ja', name: 'Japanese',                      chunks: 1, trap: 'natural particles; full-width punctuation （）、。; concise noun phrases for labels' },
];

const FILL_SCHEMA = {
  type: 'object', required: ['items'],
  properties: { items: { type: 'array', items: {
    type: 'object', required: ['key', 'value'],
    properties: { key: { type: 'string' }, value: { type: 'string' } } } } },
};
const ADJ_SCHEMA = {
  type: 'object', required: ['decisions'],
  properties: { decisions: { type: 'array', items: {
    type: 'object', required: ['key', 'value', 'changed'],
    properties: {
      key: { type: 'string' }, value: { type: 'string' },
      changed: { type: 'boolean' }, note: { type: 'string' } } } } },
};

const RULES = `
Hard rules for UI chrome:
• KEEP IT SHORT. These render in nav bars, buttons, badges and card titles. Aim at or below the English length; never more than ~1.4×. A label is not a sentence — do not add explanation.
• Preserve every non-text token EXACTLY as it appears in the key: emoji (🔥 📚 🎯 ✓ →), arrows, middots (·), Korean text (한글, 학습 경로, 여행), digits, and units like "min read" counts. Korean in a key is being displayed on purpose — never translate or romanize it.
• Preserve leading/trailing arrows and symbols in place: "Next →" keeps the trailing →; "← Back to Home" keeps the leading ←.
• Brand and genre names stay as-is: K-Pop, K-Drama, K-Beauty, K-Culture, Hangul, BTS. If the whole key is such a name, return it unchanged.
• Match the register already used by this pack: friendly, direct, second person where the language uses it.
• A key containing a "·" separator keeps the "·" and the structure around it.`;

const results = await pipeline(
  JOBS,
  // Stage A — native writes the missing chrome strings.
  ({ code, name, chunks, trap }) => agent(
`You are a native ${name} speaker localizing the UI of a Korean-learning website. These interface strings have NO ${name} translation, so ${name} users currently see them in English on every page.

Use the Read tool on ${Array.from({ length: chunks }, (_, i) => `${DIR}/${code}/chunk-${String(i).padStart(2, '0')}.json`).join(' and ')}. Each unit has:
  key     — the English UI string (also the lookup key; return it VERBATIM, unmodified)
  ref_de  — the shipped German rendering, to disambiguate the English meaning only

${name} structure to respect: ${trap}.
${RULES}

Return one item {key, value} for EVERY unit across your chunk(s). The "key" must be byte-identical to the input key — it is a dictionary lookup, so any edit to it silently breaks the translation.`,
    { label: `ui:${code}`, phase: 'Translate', model: 'sonnet', schema: FILL_SCHEMA }),

  // Stage B — second native audits, with length as a first-class check.
  (proposed, { code, name, trap }) => {
    const items = (proposed && proposed.items) || [];
    if (!items.length) return { decisions: [] };
    return agent(
`You are a DIFFERENT native ${name} speaker — a second reviewer and a UI localizer. Another translator produced these ${name} interface strings. Audit each one.

Check, in this order:
1. Key integrity — the "key" must be returned exactly as given. If the first translator altered a key, restore it.
2. Token integrity — emoji, arrows (→ ←), middots (·), Korean text, digits and brand names from the key must all survive unchanged and in the same position. This is the most common failure.
3. Length — chrome must stay short. If a value is much longer than its English key, shorten it to something a nav bar or button can hold.
4. Meaning and fluency — correct, idiomatic ${name} (${trap}), consistent register across the set.
5. Brand names (K-Pop, K-Drama, K-Beauty, Hangul) should be unchanged, not translated.
${RULES}

Return a decision for EVERY key: {key, value (final string to ship), changed (true if you altered it), note (only when changed)}.
Proposed: ${JSON.stringify(items)}`,
      { label: `ui-check:${code}`, phase: 'Check', model: 'sonnet', schema: ADJ_SCHEMA });
  });

const byLang = {};
JOBS.forEach(({ code }, i) => {
  const r = results[i];
  byLang[code] = ((r && r.decisions) || [])
    .filter(d => d.key && d.value && d.value.trim())
    .map(d => ({ key: d.key, value: d.value }));
  log(`${code}: ${byLang[code].length} UI strings`);
});

return {
  byLang,
  counts: Object.fromEntries(Object.entries(byLang).map(([k, v]) => [k, v.length])),
  next: 'Orchestrator: write each to scripts/_trans/ui/corrections-<lang>.json, then node scripts/ui-lang.cjs --apply <lang> <file>; re-check with --status.',
};
