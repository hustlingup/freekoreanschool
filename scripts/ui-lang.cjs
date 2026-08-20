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

     node scripts/ui-lang.cjs --status [--locales pt-br,ru]
     node scripts/ui-lang.cjs --extract [--langs th,id] [--chunk 110]
     node scripts/ui-lang.cjs --apply <lang> <corrections.json>

   Coverage is measured against the de pack, which is the complete UI set
   (ja and zh-tw are supersets: they additionally carry whole-article prose).

   LOCALE LIST comes from scripts/_locales.cjs. --status covers the LIVE
   locales by default; pass --locales to include 'planned' ones during a
   rollout. A locale whose js/langs/lang-<code>.js does not exist yet is
   reported as `— pack missing —` with the full baseline counted as missing,
   NOT skipped: skipping it would report 0 missing keys for a locale that has
   no translations at all, which is the exact "check reports success because
   it cannot see the defect" failure audit-i18n.cjs exists to prevent.

   --apply appends the new pairs in a marked block just before the dict's
   closing brace, so the hand-maintained ordering above it is untouched. It
   skips keys already present, so it is idempotent, and it re-executes the
   file afterwards to prove the result still parses and registers.
═══════════════════════════════════════════════════════════════════════ */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const REG = require('./_locales.cjs');

const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'scripts', '_trans', 'ui');
const PACK = code => path.join(ROOT, 'js', 'langs', `lang-${code}.js`);
const LANGS = REG.liveDirs();                      // shipped locales, en excluded
const BASELINE = 'de';
const MARKER = '// ── added by scripts/ui-lang.cjs ───────────────────────';

/* Execute a pack in a sandbox and capture what it registers. Parsing these
   with a regex is not reliable — the values contain quotes, apostrophes and
   escaped newlines. */
const hasPack = code => fs.existsSync(PACK(code));

function dictOf(code) {
  if (!hasPack(code)) throw new Error(`no UI pack: js/langs/lang-${code}.js does not exist`);
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

/* Resolve a --locales / --langs spec against the registry. Unknown codes are a
   hard error — a typo must not quietly narrow the audit to nothing. */
function resolveLocales(spec, dflt) {
  if (!spec) return dflt;
  return spec.split(',').map(s => s.trim().toLowerCase()).filter(Boolean).map(c => {
    if (!REG.get(c)) throw new Error(`unknown locale "${c}" — not in scripts/_locales.cjs`);
    if (c === 'en') throw new Error('en is the source language, not a UI pack');
    return c;
  });
}

/* coverage row for one locale; `null` dict = the pack file does not exist */
function rowFor(code, baseKeys) {
  if (!hasPack(code)) return { code, keys: 0, missing: baseKeys.length, echoed: 0, absent: true };
  const d = dictOf(code);
  return {
    code, absent: false,
    keys: Object.keys(d).length,
    missing: baseKeys.filter(k => !(k in d)).length,
    echoed: Object.keys(d).filter(k => typeof d[k] === 'string' && d[k].trim() === k.trim()).length,
  };
}

function status() {
  const langs = resolveLocales(arg('--locales') || arg('--langs'), LANGS);
  const base = dictOf(BASELINE);
  const baseKeys = Object.keys(base);
  console.log(`UI baseline = the ${BASELINE} pack: ${baseKeys.length} keys\n`);
  console.log('lang     keys   missing   value===English');
  const absent = [];
  langs.forEach(l => {
    const r = rowFor(l, baseKeys);
    if (r.absent) {
      absent.push(l);
      console.log(l.padEnd(8) + '    —' + String(r.missing).padStart(10) + '              —   (pack missing)');
      return;
    }
    console.log(l.padEnd(8) + String(r.keys).padStart(5) +
      String(r.missing).padStart(10) + String(r.echoed).padStart(15));
  });
  console.log('\n"value===English" counts entries whose translation is byte-identical to the key.');
  console.log('Many are correct (K-Pop, Hangul, K-Beauty); they are a review queue, not a defect count.');
  if (absent.length) {
    console.log(`\n${absent.length} locale(s) have NO pack file at all: ${absent.join(', ')}.`);
    console.log(`Counted as ${baseKeys.length} missing keys each — 0% of the UI chrome is translated for them.`);
  }
}

function extract() {
  const langs = resolveLocales(arg('--locales') || arg('--langs'), ['th', 'id', 'zh-tw', 'ja']);
  const chunkSize = Math.max(1, parseInt(arg('--chunk', 110), 10) || 110);
  const base = dictOf(BASELINE);
  const baseKeys = Object.keys(base);

  fs.mkdirSync(OUT, { recursive: true });
  langs.forEach(lang => {
    /* A locale with no pack yet needs the WHOLE baseline extracted — this is
       the fresh-locale path (00-plan.md §4 stage 2). */
    const d = hasPack(lang) ? dictOf(lang) : {};
    if (!hasPack(lang)) console.log(`  ${lang}: no pack file yet — extracting the full ${baseKeys.length}-key baseline`);
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
  /* Any registry locale, live or planned — stage 2 of a rollout fills the pack
     while the locale is still `planned`. The pack FILE must already exist:
     creating it is stage 1's job and this script has no template for it. */
  if (!REG.get(lang) || lang === 'en') throw new Error(`lang must be a locale in scripts/_locales.cjs (not en); got "${lang}"`);
  if (!hasPack(lang)) throw new Error(`js/langs/lang-${lang}.js does not exist — create the empty registered dict first (00-plan.md §4 stage 1)`);
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
  /* An EMPTY dict — `const PT_BR = {` immediately before the close — is the
     stage-1 starting state of every new locale. It has no trailing comma
     either, so the naive test below says "needs a comma" and emits `{ , …`,
     which is a SyntaxError. The rollback guard catches it, but the operator
     is then stuck with a pack that can never be filled. Detect the empty
     body explicitly. Found on the first pt-BR apply, 2026-08-13. */
  const head = src.slice(0, anchor);
  const isEmptyDict = /\{\s*$/.test(head);
  const needsComma = !isEmptyDict && !/,\s*$/.test(head);

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
      console.log('usage:\n  node scripts/ui-lang.cjs --status [--locales pt-br,ru]\n' +
        '  node scripts/ui-lang.cjs --extract [--langs th,id] [--chunk 110]\n' +
        '  node scripts/ui-lang.cjs --apply <lang> <corrections.json>\n\n' +
        `live locales: ${LANGS.join(', ')}\n` +
        `planned:      ${REG.all().filter(l => l.status === 'planned').map(l => l.code).join(', ') || '(none)'}`);
      process.exit(1);
    }
  } catch (e) { console.error('ERROR: ' + e.message); process.exit(1); }
}

module.exports = { dictOf, hasPack, rowFor, LANGS, BASELINE };
