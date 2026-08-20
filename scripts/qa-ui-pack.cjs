#!/usr/bin/env node
/* ═══════════════════════════════════════════════════════════════════════
   qa-ui-pack.cjs — structural QA for a UI language pack, before and after
   it is applied.

   WHAT IT SEES that nothing else does:
     • ui-lang.cjs --status counts KEYS. It cannot tell a correct
       translation from one that dropped the Hangul out of
       "Start with 한글", lost the → off a button, or answered in the
       wrong regional variety of the language.
     • qa-lang.cjs / audit-*-locale-dup.cjs are blind to js/langs/* entirely.
     • So a pack can read 631/631 and still be broken in three ways that a
       reader notices immediately. This closes that gap.

   WHAT IT CANNOT SEE: whether the translation is any GOOD. Fluency,
   register consistency and terminology adherence to the locale glossary
   need a human or a reading agent — see the QA-4 role in
   docs/i18n-expansion/00-plan.md §6. A PASS here means "structurally
   sound", never "correct".

     node scripts/qa-ui-pack.cjs <locale>            # applied pack
     node scripts/qa-ui-pack.cjs <locale> --chunks   # _trans/ui/<loc>/*.done.json
     node scripts/qa-ui-pack.cjs <locale> --check    # exit 1 on any failure
═══════════════════════════════════════════════════════════════════════ */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const REG = require('./_locales.cjs');

const ROOT = path.resolve(__dirname, '..');
const argv = process.argv.slice(2);
/* Required as a library by qa-lesson-chunks.cjs for VARIETY_TRAPS — the trap
   lists must live in ONE place or the two QA passes disagree about what a
   wrong-variety term is. Same rule _locale-prose.cjs follows for the prose
   exclusion rules. When required, do nothing and export. */
const AS_LIBRARY = require.main !== module;
const LOC = argv.find(a => !a.startsWith('--'));
const CHUNKS = argv.includes('--chunks');
const CHECK = argv.includes('--check');

if (!AS_LIBRARY) {
  if (!LOC) {
    console.error('usage: node scripts/qa-ui-pack.cjs <locale> [--chunks] [--check]');
    process.exit(2);
  }
  if (!REG.get(LOC)) {
    console.error(`unknown locale "${LOC}" — not in scripts/_locales.cjs`);
    process.exit(2);
  }
}

/* ── Wrong-variety / wrong-neighbour term lists ────────────────────────────
   Each entry is a word a NATIVE reader of that locale would flag as coming
   from the wrong variety or from the locale it was derived/seeded from.
   These are the specific, high-frequency traps — not an exhaustive
   dictionary. A hit is a WARNING, not a hard failure: a legitimate quotation
   or brand name could contain one. Read every hit.

   pt-br: European Portuguese.
   ms:    Indonesian (ms is seeded from id — this is its main risk).
   zh-cn: Taiwan-specific lexicon carried over from the zh-tw source.
   zh-hk: mainland lexicon where HK uses its own term.
   ar/ru/tr: none defined yet — add when a real defect is found, not before. */
const VARIETY_TRAPS = {
  'pt-br': [
    'ecrã', 'ecran', 'utilizador', 'utilizadores', 'telemóvel', 'autocarro',
    'comboio', 'equipa', 'pequeno-almoço', 'rapariga', 'casa de banho',
    'autoclismo', 'fixe',
    /* European progressive "está a aprender" vs Brazilian "está aprendendo".
       MUST be anchored on the estar auxiliary. A bare 'a aprender' also
       matches ordinary, correct Brazilian "Começar a Aprender" (start TO
       learn) — that produced 5 false positives on the first pt-BR run and
       is exactly how a warning channel gets trained into noise. */
    /\b(estou|estás|está|estamos|estão|estava|estavam|estive|estarei|estar)\s+a\s+\w+r\b/i,
  ],
  ms: [
    'bisa', 'mobil', 'kantor', 'ban ', 'cakap ', 'sudah pasti', 'silahkan',
    'kamu', 'nggak', 'gimana', 'bikin', 'lihat saja', 'mengapa saja',
  ],
  'zh-cn': [
    '軟體', '软体', '網路', '网路', '影片檔', '計程車', '资讯', '資訊',
    '檔案', '部落格', '滑鼠', '螢幕', '硬碟', '程式', '記憶體',
  ],
  'zh-hk': [
    '出租车', '公交车', '软件', '网络视频', '计程车', '公車', '捷運',
  ],
};

module.exports = { VARIETY_TRAPS };
if (AS_LIBRARY) return;

/* ── load the applied pack, or the chunk .done.json files ─────────────── */
function loadApplied(loc) {
  const file = path.join(ROOT, 'js', 'langs', `lang-${loc}.js`);
  if (!fs.existsSync(file)) return null;
  const captured = {};
  const sandbox = {
    console: { log() {}, warn() {}, error() {} },
    document: { addEventListener() {}, documentElement: { lang: '' } },
  };
  sandbox.window = sandbox;
  sandbox.globalThis = sandbox;
  sandbox.LangManager = { register(_c, d) { Object.assign(captured, d); } };
  vm.runInNewContext(fs.readFileSync(file, 'utf8'), sandbox, { timeout: 20000 });
  return captured;
}

function loadChunks(loc) {
  const dir = path.join(ROOT, 'scripts', '_trans', 'ui', loc);
  if (!fs.existsSync(dir)) return null;
  const out = {};
  let n = 0;
  for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.done.json')).sort()) {
    Object.assign(out, JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')));
    n++;
  }
  return n ? out : null;
}

const dict = CHUNKS ? loadChunks(LOC) : loadApplied(LOC);
if (!dict) {
  console.log(`${LOC}: NOT PRESENT — ${CHUNKS
    ? `no .done.json files in scripts/_trans/ui/${LOC}/`
    : `js/langs/lang-${LOC}.js missing or registers nothing`}`);
  console.log('  This is "nothing to measure", NOT "everything passes".');
  process.exit(CHECK ? 1 : 0);
}

/* ── the checks ────────────────────────────────────────────────────────── */
const HANGUL_RUN = /[가-힣ㄱ-ㆎ]+/g;
/* Symbols that carry meaning in the chrome and must survive translation:
   emoji, arrows, the interpunct the site uses as a separator. */
const SYMBOL = /[\u{1F300}-\u{1FAFF}\u{1F000}-\u{1F2FF}\u{2190}-\u{21FF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}·→←]/gu;
const PLACEHOLDER = /\{[a-zA-Z_][a-zA-Z0-9_]*\}/g;

const runs = (s, re) => (String(s).match(re) || []).join('|');

const fail = { hangul: [], symbol: [], placeholder: [], empty: [] };
const warn = { variety: [], identical: [] };
/* A trap is either a literal substring or a RegExp — some varieties are only
   distinguishable by a grammatical pattern, not a single word. */
const traps = (VARIETY_TRAPS[LOC] || []).map(t =>
  t instanceof RegExp ? { re: t, label: t.source.slice(0, 40) }
                      : { lit: t.toLowerCase(), label: t.trim() });

for (const [key, val] of Object.entries(dict)) {
  if (typeof val !== 'string') continue;

  if (!val.trim()) { fail.empty.push(key); continue; }

  /* Hangul is the language being taught. It is identical in every locale by
     design; dropping or altering it corrupts the lesson, not the UI. */
  if (runs(key, HANGUL_RUN) !== runs(val, HANGUL_RUN)) {
    fail.hangul.push(`${JSON.stringify(key)} -> ${JSON.stringify(val)}`);
  }
  /* An arrow or emoji lost in translation silently changes a button's
     meaning ("Next Level →" vs "Next Level"). */
  if (runs(key, SYMBOL) !== runs(val, SYMBOL)) {
    fail.symbol.push(`${JSON.stringify(key)} -> ${JSON.stringify(val)}`);
  }
  /* {n}, {stage}, {total} are substituted at runtime. A translated
     placeholder renders literally to the reader. */
  if (runs(key, PLACEHOLDER) !== runs(val, PLACEHOLDER)) {
    fail.placeholder.push(`${JSON.stringify(key)} -> ${JSON.stringify(val)}`);
  }

  const lower = val.toLowerCase();
  for (const t of traps) {
    const hit = t.re ? t.re.test(val) : lower.includes(t.lit);
    if (hit) { warn.variety.push(`${JSON.stringify(key)} -> ${JSON.stringify(val)}  [${t.label}]`); break; }
  }
  if (key === val) warn.identical.push(key);
}

/* ── report ───────────────────────────────────────────────────────────── */
const total = Object.keys(dict).length;
console.log(`qa-ui-pack ${LOC} — ${CHUNKS ? 'chunk .done.json files' : `js/langs/lang-${LOC}.js`}`);
console.log(`  ${total} entries\n`);

let failed = 0;
const block = (label, list, hard, note) => {
  const ok = list.length === 0;
  if (!ok && hard) failed++;
  console.log(`  ${ok ? 'PASS' : (hard ? 'FAIL' : 'WARN')}  ${label} — ${list.length}`);
  if (note && ok) console.log(`        ${note}`);
  list.slice(0, 15).forEach(x => console.log(`        ${x}`));
  if (list.length > 15) console.log(`        … and ${list.length - 15} more`);
};

block('empty translations', fail.empty, true);
block('Hangul preserved exactly', fail.hangul, true);
block('emoji / arrows / interpunct preserved', fail.symbol, true);
block('{placeholders} preserved', fail.placeholder, true);
block(`wrong-variety terms (${traps.length} patterns for ${LOC})`, warn.variety, false,
  traps.length ? 'none found' : `no trap list defined for ${LOC} — this check saw nothing`);
console.log(`  INFO  identical to English — ${warn.identical.length}`);
console.log('        Expected for brands (K-Pop, Hangul, Quiz, UNESCO). Review, do not assume.');
warn.identical.slice(0, 20).forEach(k => console.log(`        ${JSON.stringify(k)}`));
if (warn.identical.length > 20) console.log(`        … and ${warn.identical.length - 20} more`);

console.log(`\n  ${failed ? `${failed} hard check(s) FAILED` : 'all hard checks pass'}`);
console.log('  Structural only. Fluency, register and glossary adherence are NOT measured here.');
process.exit(CHECK && failed ? 1 : 0);
