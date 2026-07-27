#!/usr/bin/env node
/* ═══════════════════════════════════════════════════════════════════════
   ui-lang.cjs — coverage + extract/apply for the UI language packs in
   js/langs/lang-<code>.js.

   These packs are what LangManager.t() substitutes into page chrome: nav,
   buttons, card titles, section headings, "Mark as Complete ✓". They are
   PLAIN JS DICTS, not lesson JSON, so every translation tool in this repo
   was blind to them. Measured 2026-07-26:

       de 631   es 631   fr 631   vi 631   id 624   zh-tw 703   ja 7814
       th 215  ← missing 430 of the 631-key baseline (68% of the UI)

   i.e. Thai users saw two thirds of the site chrome in English on every
   page, while the Thai LESSON content scored 4/5 in the translation triage.
   The triage could not see it: it told its agents to ignore UI chrome.

     node scripts/ui-lang.cjs --status
     node scripts/ui-lang.cjs --extract [--langs th,id] [--chunk 110]
     node scripts/ui-lang.cjs --apply <lang> <corrections.json>

   Coverage is measured against the de pack, which is the complete UI set
   (ja and zh-tw are supersets: they additionally carry whole-article prose).

   --apply appends the new pairs in a marked block just before the dict's
   closing brace, so the hand-maintained ordering above it is untouched. It
   skips keys already present, so it is idempotent, and it re-executes the
   file afterwards to prove the result still parses and registers.
═══════════════════════════════════════════════════════════════════════ */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'scripts', '_trans', 'ui');
const PACK = code => path.join(ROOT, 'js', 'langs', `lang-${code}.js`);
const LANGS = ['ja', 'zh-tw', 'es', 'de', 'fr', 'vi', 'th', 'id'];
const BASELINE = 'de';
const MARKER = '// ── added by scripts/ui-lang.cjs ───────────────────────';

/* Execute a pack in a sandbox and capture what it registers. Parsing these
   with a regex is not reliable — the values contain quotes, apostrophes and
   escaped newlines. */
function dictOf(code) {
  const src = fs.readFileSync(PACK(code), 'utf8');
  const captured = {};
  const sandbox = {
    console: { log() {}, warn() {}, error() {} },
    document: { addEventListener() {}, documentElement: { lang: '' } },
  };
  sandbox.window = sandbox;
  sandbox.LangManager = { register(_c, dict) { Object.assign(captured, dict); } };
  sandbox.globalThis = sandbox;
  vm.runInNewContext(src, sandbox, { timeout: 20000 });
  return captured;
}

function arg(name, dflt) {
  const i = process.argv.indexOf(name);
  return i > -1 && process.argv[i + 1] && !process.argv[i + 1].startsWith('--') ? process.argv[i + 1] : dflt;
}

function status() {
  const base = dictOf(BASELINE);
  const baseKeys = Object.keys(base);
  console.log(`UI baseline = the ${BASELINE} pack: ${baseKeys.length} keys\n`);
  console.log('lang     keys   missing   value===English');
  LANGS.forEach(l => {
    const d = dictOf(l);
    const missing = baseKeys.filter(k => !(k in d));
    const echoed = Object.keys(d).filter(k => typeof d[k] === 'string' && d[k].trim() === k.trim());
    console.log(l.padEnd(8) + String(Object.keys(d).length).padStart(5) +
      String(missing.length).padStart(10) + String(echoed.length).padStart(15));
  });
  console.log('\n"value===English" counts entries whose translation is byte-identical to the key.');
  console.log('Many are correct (K-Pop, Hangul, K-Beauty); they are a review queue, not a defect count.');
}

function extract() {
  const langs = (arg('--langs') || 'th,id,zh-tw,ja').split(',').map(s => s.trim()).filter(Boolean);
  const chunkSize = Math.max(1, parseInt(arg('--chunk', 110), 10) || 110);
  const base = dictOf(BASELINE);
  const baseKeys = Object.keys(base);

  fs.mkdirSync(OUT, { recursive: true });
  langs.forEach(lang => {
    const d = dictOf(lang);
    const missing = baseKeys.filter(k => !(k in d));
    const dir = path.join(OUT, lang);
    fs.mkdirSync(dir, { recursive: true });
    fs.readdirSync(dir).filter(n => /^chunk-\d+\.json$/.test(n)).forEach(n => fs.unlinkSync(path.join(dir, n)));
    let c = 0;
    for (let i = 0; i < missing.length; i += chunkSize, c++) {
      const units = missing.slice(i, i + chunkSize).map(k => ({
        key: k,
        ref_de: base[k],                       // a shipped translation, to disambiguate the English
      }));
      fs.writeFileSync(path.join(dir, `chunk-${String(c).padStart(2, '0')}.json`),
        JSON.stringify({ lang, chunk: c, count: units.length, units }, null, 2) + '\n');
    }
    console.log(`  ${lang}: ${missing.length} missing → ${c} chunk(s)`);
  });
  console.log(`\nWrote → ${path.relative(ROOT, OUT)}`);
}

/* JS string literal in single quotes, with the escapes that matter here. */
const q = s => "'" + String(s)
  .replace(/\\/g, '\\\\').replace(/'/g, "\\'")
  .replace(/\r/g, '\\r').replace(/\n/g, '\\n') + "'";

function applyCorrections(lang, file) {
  if (!LANGS.includes(lang)) throw new Error(`lang must be one of ${LANGS.join(', ')}`);
  const abs = PACK(lang);
  const before = dictOf(lang);
  const corrections = JSON.parse(fs.readFileSync(path.resolve(file), 'utf8'));

  const fresh = [];
  let skipped = 0;
  corrections.forEach(({ key, value }) => {
    if (typeof key !== 'string' || typeof value !== 'string' || !value.trim()) { skipped++; return; }
    if (key in before) { skipped++; return; }              // idempotent
    fresh.push([key, value]);
  });
  if (!fresh.length) { console.log(`Nothing to add (${skipped} skipped).`); return; }

  const src = fs.readFileSync(abs, 'utf8');
  const eol = src.includes('\r\n') ? '\r\n' : '\n';
  /* Insert before the dict's closing `};` — the last one that precedes the
     LangManager.register call. */
  const anchor = src.lastIndexOf('  };');
  if (anchor === -1) throw new Error('could not locate the dict close in ' + path.relative(ROOT, abs));

  /* Some packs end their last entry with a trailing comma (th) and some do
     not (id, zh-tw, ja). Appending `'k': 'v',` after a comma-less last entry
     yields two adjacent string literals — a SyntaxError that takes the whole
     pack, and with it every translation on the site for that locale. Look at
     what actually precedes the anchor instead of assuming. */
  const needsComma = !/,\s*$/.test(src.slice(0, anchor));

  const block = (needsComma ? ',' + eol : '') +
    [`    ${MARKER}`]
      .concat(fresh.map(([k, v]) => `    ${q(k)}: ${q(v)},`))
      .join(eol) + eol;
  const out = src.slice(0, anchor) + block + src.slice(anchor);
  fs.writeFileSync(abs, out, 'utf8');

  /* Prove it still parses AND that every new key really registered. dictOf
     throws on a syntax error, so it has to be guarded — otherwise a broken
     write escapes as an exception and the file is left broken on disk. */
  let after;
  try {
    after = dictOf(lang);
  } catch (e) {
    fs.writeFileSync(abs, src, 'utf8');                     // roll back
    throw new Error(`${path.relative(ROOT, abs)} did not parse after the write; rolled back. ${e.message}`);
  }
  const bad = fresh.filter(([k, v]) => after[k] !== v);
  if (bad.length) {
    fs.writeFileSync(abs, src, 'utf8');                     // roll back
    throw new Error(`${bad.length} key(s) did not survive re-parse; rolled back. First: ${bad[0][0]}`);
  }
  console.log(`  ${path.relative(ROOT, abs)}: ${Object.keys(before).length} → ${Object.keys(after).length} keys ` +
    `(+${fresh.length}, ${skipped} skipped)`);
}

if (require.main === module) {
  const mode = process.argv[2];
  try {
    if (mode === '--status') status();
    else if (mode === '--extract') extract();
    else if (mode === '--apply') applyCorrections(process.argv[3], process.argv[4]);
    else {
      console.log('usage:\n  node scripts/ui-lang.cjs --status\n' +
        '  node scripts/ui-lang.cjs --extract [--langs th,id] [--chunk 110]\n' +
        '  node scripts/ui-lang.cjs --apply <lang> <corrections.json>');
      process.exit(1);
    }
  } catch (e) { console.error('ERROR: ' + e.message); process.exit(1); }
}

module.exports = { dictOf };
