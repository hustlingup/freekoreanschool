export const meta = {
  name: 'qa-thai-viet',
  description: 'Native-persona QA of Thai & Vietnamese writing/typing translations: glossary → adversarial native review → blind back-translation + 2nd-native adjudication',
  phases: [
    { title: 'Glossary', detail: 'Korean expert agrees one rendering per term' },
    { title: 'Review',   detail: 'native reviewer per chunk, adversarial' },
    { title: 'Verify',   detail: 'blind back-translation + 2nd native adjudicates each flag' },
  ],
};

/* ── config ────────────────────────────────────────────────────────────
   258 review units per language, pre-split into 9 chunks of ≤30 by
   scripts/qa-translations.cjs --extract. If you re-extract with a
   different CHUNK size, update CHUNKS below. Agents read their own chunk
   and the manifest with the Read tool — the script itself has no fs. */
const DIR = 'scripts/_trans/qa';
const CHUNKS = 9;
const LANGS = [{ code: 'th', name: 'Thai' }, { code: 'vi', name: 'Vietnamese' }];
const chunkPath = (lang, i) => `${DIR}/review/${lang}/chunk-${String(i).padStart(2, '0')}.json`;
const batch = (arr, n) => { const o = []; for (let i = 0; i < arr.length; i += n) o.push(arr.slice(i, i + n)); return o; };

// per-language structural traps a word-for-word translation fails silently
const STRUCT = {
  th: 'no word spaces; noun BEFORE adjective; classifiers (ลักษณนาม); verb serialization; polite particles where register calls for it; must NOT mirror English word order',
  vi: 'noun BEFORE adjective; classifiers/measure words (cái, con, …); correct tone marks (a wrong dấu is a different word); analytic word order that is Vietnamese, not an English calque',
};

/* ── schemas ───────────────────────────────────────────────────────── */
const GLOSSARY_SCHEMA = {
  type: 'object', required: ['terms'],
  properties: { terms: { type: 'array', items: {
    type: 'object', required: ['ko', 'th', 'vi'],
    properties: { ko: { type: 'string' }, concept: { type: 'string' }, th: { type: 'string' }, vi: { type: 'string' } } } } },
};
const REVIEW_SCHEMA = {
  type: 'object', required: ['checked', 'findings'],
  properties: {
    checked: { type: 'number' },
    findings: { type: 'array', items: {
      type: 'object', required: ['id', 'verdict', 'fix'],
      properties: {
        id: { type: 'string' },
        verdict: { type: 'string', enum: ['awkward', 'wrong'] },
        severity: { type: 'string', enum: ['low', 'med', 'high'] },
        issue: { type: 'string' },
        fix: { type: 'string' },
      } } },
  },
};
const BACKTRANS_SCHEMA = {
  type: 'object', required: ['items'],
  properties: { items: { type: 'array', items: {
    type: 'object', required: ['id', 'en_back'],
    properties: { id: { type: 'string' }, en_back: { type: 'string' } } } } },
};
const ADJUDICATE_SCHEMA = {
  type: 'object', required: ['decisions'],
  properties: { decisions: { type: 'array', items: {
    type: 'object', required: ['id', 'accept', 'value'],
    properties: {
      id: { type: 'string' }, accept: { type: 'boolean' }, value: { type: 'string' }, note: { type: 'string' },
    } } } },
};

/* ── Phase 1 — glossary ────────────────────────────────────────────── */
phase('Glossary');
const glossary = await agent(
  `You are a Korean-linguistics expert who is also a professional translator into BOTH Thai and Vietnamese, writing for absolute-beginner learners.
Use the Read tool on ${DIR}/glossary.seed.json.
For every term, fill "th" and "vi" with the SINGLE rendering the lessons should use everywhere. Honour "keep_korean": when true, keep the Korean form (optionally add a short native gloss in parentheses on first use) rather than translating it away — the lesson is teaching that term. Where "keep_korean" is false, give the clearest native word a beginner knows.
Return the completed term list.`,
  { label: 'glossary', phase: 'Glossary', model: 'sonnet', schema: GLOSSARY_SCHEMA });
const glossaryText = JSON.stringify(glossary.terms);
log(`glossary agreed for ${glossary.terms.length} terms`);

/* ── Phase 2 — adversarial native review, per lang per chunk ───────── */
const reviewByLang = {};
for (const { code, name } of LANGS) {
  phase('Review');
  const perChunk = await parallel(Array.from({ length: CHUNKS }, (_, i) => () =>
    agent(
`You are a native ${name} speaker and a Korean-language teacher. You are PROOFREADING machine-assisted ${name} translations in a beginner Hangul writing/typing course. Be skeptical — assume errors exist and find them.

Use the Read tool on ${chunkPath(code, i)}. Each unit has: id, path, ko (Korean being taught, may be null), en (authoritative English source of meaning), ${code} (the ${name} to judge).

Judge each unit as a whole sentence, NOT word by word. For EACH unit check:
• Meaning — does the ${name} say what the English says? No drift, no omission, no addition.
• Fluency (grammar & word order) — correct grammar (agreement, tense/aspect, particles, classifiers) AND native ${name} word order AND idiomatic phrasing a real teacher would use. A string that is lexically accurate but mirrors English syntax is WRONG here — flag it and fix the structure, not just the words. ${name} structural traps: ${STRUCT[code] || 'native grammar and word order, not an English calque'}.
• Register — right politeness level for a friendly beginner lesson, consistent throughout.
• Script correctness — ${code === 'th'
  ? 'Thai: correct word-boundary segmentation (Thai has no spaces), tone marks, sara/vowel placement, no stray Latin/Korean where Thai is expected.'
  : 'Vietnamese: every diacritic and tone mark correct — a wrong dấu is a different word — plus spacing and capitalisation.'}
• Terminology — Korean teaching terms must match this agreed glossary exactly: ${glossaryText}
• Keep as-is — do NOT flag the Korean characters, romanization, key names (Shift/Space), or the 타/분 units; those are intentional.

Return a finding ONLY for units that are "awkward" or "wrong". For each, give the id, verdict, severity, a one-line issue, and a corrected "fix" in ${name}. Also return "checked" = how many units you examined. If everything in the chunk is fine, return an empty findings array with the checked count.`,
      { label: `review:${code}:${i}`, phase: 'Review', model: 'sonnet', schema: REVIEW_SCHEMA }))).catch(() => []);
  const flat = perChunk.filter(Boolean);
  reviewByLang[code] = flat.flatMap(r => r.findings || []);
  const checked = flat.reduce((s, r) => s + (r.checked || 0), 0);
  log(`${name}: reviewed ${checked} units, ${reviewByLang[code].length} flagged`);
}

/* ── Phase 3 — verify each flag: blind back-translation + 2nd native ─ */
const corrections = { th: [], vi: [] };
const report = { th: {}, vi: {} };
for (const { code, name } of LANGS) {
  phase('Verify');
  const flagged = reviewByLang[code].filter(f => f && f.fix && f.fix.trim());
  report[code] = { flagged: flagged.length };
  if (!flagged.length) { log(`${name}: nothing to verify`); continue; }

  const decisionBatches = await pipeline(
    batch(flagged, 20),
    // Stage A — Fable back-translates the PROPOSED FIX to English, blind (never shown the source).
    (grp) => agent(
`Back-translate each ${name} string below into plain English. You are NOT shown any reference — translate only what the ${name} actually says, literally enough to expose meaning errors. Return {id, en_back} for each.
${JSON.stringify(grp.map(f => ({ id: f.id, str: f.fix })))}`,
      { label: `backtrans:${code}`, phase: 'Verify', model: 'fable', schema: BACKTRANS_SCHEMA }),
    // Stage B — a SECOND, independent native adjudicates fix vs. source, using the blind back-translation as a drift signal.
    (bt, grp) => agent(
`You are a DIFFERENT native ${name} speaker and Korean teacher — a second reviewer. Use the Read tool on ${DIR}/manifest.json; for each id below look up its "en" (true meaning), "ko", and current "${code}".
You are given the first reviewer's proposed "fix" and an independent blind back-translation ("en_back") of that fix. If en_back diverges from the true en, the fix drifted — reject or repair it.
Judge the final "value" on BOTH meaning fidelity AND fluency: it must use native ${name} grammar and word order, not an English calque (${STRUCT[code] || 'native structure, not literal from English'}). If the fix is accurate but reads like translated-English, rewrite it into natural ${name}.
For each id decide: accept=true with the final "value" to ship (the fix, or your own better ${name} if the fix is imperfect), or accept=false if the current translation was actually fine. Enforce the glossary: ${glossaryText}
Proposed fixes: ${JSON.stringify(grp.map(f => ({ id: f.id, issue: f.issue, fix: f.fix })))}
Blind back-translations: ${JSON.stringify(bt && bt.items || [])}`,
      { label: `adjudicate:${code}`, phase: 'Verify', model: 'sonnet', schema: ADJUDICATE_SCHEMA }));

  const decisions = decisionBatches.filter(Boolean).flatMap(d => d.decisions || []);
  const accepted = decisions.filter(d => d.accept && d.value && d.value.trim());
  corrections[code] = accepted.map(d => ({ id: d.id, value: d.value }));
  report[code].accepted = accepted.length;
  report[code].rejected = decisions.length - accepted.length;
  log(`${name}: ${accepted.length} corrections accepted, ${report[code].rejected} rejected`);
}

return {
  glossary: glossary.terms,
  corrections,
  report,
  next: 'Write corrections.th/vi to scripts/_trans/qa/corrections-<lang>.json, then: node scripts/qa-translations.cjs --apply <lang> <file>; node scripts/gen-lesson-static.cjs; node scripts/gen-learn-mirrors.cjs',
};
