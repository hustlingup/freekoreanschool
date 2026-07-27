export const meta = {
  name: 'qa-deep',
  description: 'Second, deeper quality pass: 97 never-reviewed lesson units judged by a native in all 8 locales (776 string reviews), then each finding verified before it can ship',
  phases: [
    { title: 'Review', detail: 'native judges accuracy, fluency and script on unreviewed units' },
    { title: 'Verify', detail: 'second native adjudicates each proposed change' },
  ],
};

/* Inputs from: node scripts/qa-deep-sample.cjs --rate 0.05 --chunk 55
     scripts/_trans/deep/<lang>/chunk-NN.json  {id, path, ko, en, value}

   The Phase-A triage sampled 0.5% and everything since has been targeted, so
   ~1,900 units per locale have never been quality-checked. This is the second,
   deeper cut.

   The SAME 97 unit ids are reviewed in every locale on purpose: if seven or
   eight natives independently flag the same unit, the defect is almost
   certainly in the ENGLISH SOURCE rather than in eight separate translations.
   That cross-locale signal is computed by the orchestrator afterwards. */
const DIR = 'scripts/_trans/deep';
const CHUNKS = 2;
const LANGS = [
  { code: 'ja', name: 'Japanese', trap: 'SOV and verb/copula-final clauses; correct は/が/を/に/で; consistent です/ます; full-width punctuation' },
  { code: 'zh-tw', name: 'Traditional Chinese (Taiwan)', trap: 'topic-comment structure; correct measure words (量詞); 的/得/地; Traditional characters and Taiwan usage, never Simplified' },
  { code: 'es', name: 'Spanish', trap: 'adjective after the noun; gender/number agreement; ser vs estar; natural pronoun drop' },
  { code: 'de', name: 'German', trap: 'verb-second in main clauses but verb-FINAL in subordinate; correct case and gender; natural compounds' },
  { code: 'fr', name: 'French', trap: 'mostly post-nominal adjectives; agreement; sentence case in headings, not English Title Case; space before ! ? : ;' },
  { code: 'vi', name: 'Vietnamese', trap: 'noun before adjective; classifiers; every tone mark correct — a wrong dấu is a different word' },
  { code: 'th', name: 'Thai', trap: 'no word spaces inside a Thai phrase; noun before adjective; classifiers (ลักษณนาม); use ตัวสะกด-style established terms, not ad-hoc transliteration' },
  { code: 'id', name: 'Indonesian', trap: 'correct affixation (me-/ber-/-kan/-i); noun before adjective; natural word order' },
];
const files = code => Array.from({ length: CHUNKS },
  (_, i) => `${DIR}/${code}/chunk-${String(i).padStart(2, '0')}.json`).join(' and ');

const REVIEW_SCHEMA = {
  type: 'object', required: ['checked', 'findings'],
  properties: {
    checked: { type: 'number' },
    findings: { type: 'array', items: {
      type: 'object', required: ['id', 'severity', 'issue', 'fix'],
      properties: {
        id: { type: 'string' },
        severity: { type: 'string', enum: ['minor', 'major', 'critical'] },
        axis: { type: 'string', enum: ['accuracy', 'fluency', 'script', 'terminology'] },
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

const results = await pipeline(
  LANGS,
  // ── Review ────────────────────────────────────────────────────────────
  ({ code, name, trap }) => agent(
`You are a native ${name} speaker and a Korean-language teacher, proofreading ${name} strings that are ALREADY LIVE on a beginner Korean course. These units have never been reviewed by anyone. Be skeptical, but precise.

Use the Read tool on ${files(code)}. Each unit has id, path, ko (the Korean being taught, may be null), en (the authoritative English meaning) and value (the ${name} currently live).

Flag a unit only for a real defect:
• accuracy — the ${name} omits, adds or drifts from what en says. If en contains examples, a list or a second clause and the ${name} does not, that is a finding even when what remains is correct.
• fluency — English word order calqued into ${name}; wrong agreement, tense, particle or classifier. ${name} traps: ${trap}. Lexically correct but translated-sounding counts.
• script — ${code === 'th' ? 'Thai word-boundary segmentation, tone marks, vowel placement'
  : code === 'vi' ? 'Vietnamese diacritics and tone marks — a wrong dấu is a different word'
  : code === 'zh-tw' ? 'Traditional (not Simplified) characters, Taiwan usage'
  : code === 'ja' ? 'kanji/kana correctness and natural particle use'
  : 'spelling, accents, agreement'}.
• terminology — a Korean teaching term rendered inconsistently with the rest of the course.

Do NOT flag: Korean text, Hangul, romanization, brand names or key names left as-is (all intentional); a UI-style short label that is a normal localization rather than a literal gloss; or your own stylistic preference where the existing string is already correct and natural.

⚠️ Whatever you propose in "fix" must reproduce every Korean character from the current value and from en EXACTLY. Altering the Korean being taught is the worst defect possible here, so never introduce one while fixing something else.

For each finding: {id, severity (minor|major|critical), axis, issue (one line), fix (the corrected FULL ${name} string)}. Return "checked" = how many units you examined. An empty findings array is a good answer if the sample is clean.`,
    { label: `deep:${code}`, phase: 'Review', model: 'sonnet', schema: REVIEW_SCHEMA }),

  // ── Verify ────────────────────────────────────────────────────────────
  (rev, { code, name, trap }) => {
    const findings = ((rev && rev.findings) || []).filter(f => f && f.id && f.fix && f.fix.trim());
    if (!findings.length) return { decisions: [], checked: (rev && rev.checked) || 0, findings: [] };
    return agent(
`You are a DIFFERENT native ${name} speaker and Korean teacher — the second reviewer. A first reviewer proposed changes to ${name} strings that are already live. Your job is to stop bad changes shipping as much as to confirm good ones.

Use the Read tool on ${files(code)} and look up each id's en (true meaning), ko and current value.

For each proposal decide:
• accept=false — the current string was already fine, or the proposed fix introduces an error, drops information, changes meaning, or is mere stylistic preference. Explain in note.
• accept=true — with value = the exact final ${name} to ship. Prefer the fix; if it is accurate but still reads like translated English, rewrite it into natural ${name} yourself (${trap}).

Check especially: does the fix keep EVERY Korean character from en and from the current value, byte for byte? Reject any fix that alters, drops or substitutes Korean text, even if the rest of it is an improvement.

Proposals: ${JSON.stringify(findings.map(f => ({ id: f.id, severity: f.severity, axis: f.axis, issue: f.issue, fix: f.fix })))}`,
      { label: `verify:${code}`, phase: 'Verify', model: 'sonnet', schema: VERDICT_SCHEMA })
      .then(v => ({ ...v, checked: (rev && rev.checked) || 0, findings }));
  });

const out = {}, raw = {};
let totalChecked = 0, totalFlagged = 0, totalAccepted = 0;
LANGS.forEach(({ code }, i) => {
  const r = results[i] || {};
  const decisions = r.decisions || [];
  const accepted = decisions.filter(d => d.accept && d.value && d.value.trim());
  out[code] = accepted.map(d => ({ id: d.id, value: d.value }));
  raw[code] = (r.findings || []).map(f => ({ id: f.id, severity: f.severity, axis: f.axis, issue: f.issue }));
  totalChecked += r.checked || 0;
  totalFlagged += (r.findings || []).length;
  totalAccepted += accepted.length;
  log(`${code}: ${r.checked || 0} checked, ${(r.findings || []).length} flagged, ${accepted.length} accepted, ${decisions.length - accepted.length} rejected`);
});

return {
  fixes: out, findings: raw,
  totals: { checked: totalChecked, flagged: totalFlagged, accepted: totalAccepted },
  next: 'Orchestrator: check the cross-locale signal (a unit flagged in most locales implicates the ENGLISH source), validate Korean-run preservation, then qa-lang.cjs --apply per locale.',
};
