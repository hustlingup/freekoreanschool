#!/usr/bin/env node
/* ═══════════════════════════════════════════════════════════════════════
   gen-locales-js.cjs — projects scripts/_locales.cjs into the browser.

   Two outputs, both GENERATED, neither ever hand-edited:

     1. js/locales.js
        A standalone ES5 script that sets window.KS_LOCALES /
        KS_LOCALE_BY_CODE / KS_LIVE_LOCALES. Nothing loads it yet; it exists
        so any FUTURE browser consumer (app.js, step-runner.js, the search
        index) can read the registry with one <script> tag instead of
        growing another hardcoded list.

     2. the /* ks:locales:start * / … /* ks:locales:end * / block inside
        js/lang-core.js
        A minimal projection (code, native, flag, flagSvg, status) inlined
        directly into lang-core.

   ── WHY lang-core GETS AN INLINE COPY RATHER THAN A <script> DEPENDENCY ──
   lang-core.js ends with a document.write() bootstrap that must run while
   the <head> is still parsing, on all ~420 pages, and those pages load it
   with a bare <script src="js/lang-core.js">. Making it depend on
   js/locales.js would mean editing every one of those pages to add a second
   <script> before it — 420 edits, an extra request in the critical path, and
   a hard failure (blank language pack) on any page that was missed. So the
   data lang-core actually needs is inlined between markers, exactly the
   idempotent marker-guarded injection fix-culture-travel-seo.cjs already
   uses. lang-core stays self-contained and zero-extra-request; js/locales.js
   is still written for future consumers; `--check` proves the two copies and
   the registry cannot drift.

   USAGE
     node scripts/gen-locales-js.cjs            write both outputs
     node scripts/gen-locales-js.cjs --check    write nothing; exit 1 if
                                                either output is missing or
                                                stale

   Idempotent: running twice produces byte-identical files.
   See docs/i18n-expansion/00-plan.md §0.1 / §0.3.
═══════════════════════════════════════════════════════════════════════ */
'use strict';

const fs = require('fs');
const path = require('path');
const { LOCALES } = require('./_locales.cjs');

const ROOT = path.resolve(__dirname, '..');
const OUT_LOCALES = path.join(ROOT, 'js', 'locales.js');
const LANG_CORE = path.join(ROOT, 'js', 'lang-core.js');

const START = '/* ks:locales:start */';
const END = '/* ks:locales:end */';

const BANNER_LINES = [
  'GENERATED FILE — do not edit; run node scripts/gen-locales-js.cjs',
  'Source of truth: scripts/_locales.cjs',
];

/* ── js/locales.js ─────────────────────────────────────────────────────── */

/* JSON.stringify gives deterministic output (object key order is the literal
   order in _locales.cjs), which is what makes this idempotent. The result is
   valid ES5 expression syntax — no trailing commas, no shorthand. */
function emitLocalesJs() {
  const data = JSON.stringify(LOCALES, null, 2)
    .split('\n')
    .map((l, i) => (i === 0 ? l : '  ' + l))
    .join('\n');

  return [
    '/* ═══════════════════════════════════════════════════════════════════',
    '   ' + BANNER_LINES[0],
    '   ' + BANNER_LINES[1],
    '',
    '   Plain ES5 <script> — no modules, no arrow functions, no optional',
    '   chaining. It is loaded alongside js/lang-core.js, which is ES5-ish.',
    '',
    '   window.KS_LOCALES        every record, registry order (en first)',
    '   window.KS_LOCALE_BY_CODE code → record',
    "   window.KS_LIVE_LOCALES   status === 'live', registry order (en first)",
    '',
    "   `status` gates visibility: 'planned' records exist so tooling can be",
    '   built ahead of a rollout, and must not be surfaced to readers. Read',
    '   KS_LIVE_LOCALES unless you specifically want the planned ones too.',
    '═══════════════════════════════════════════════════════════════════ */',
    '(function (w) {',
    "  'use strict';",
    '',
    '  var LOCALES = ' + data + ';',
    '',
    '  var byCode = {};',
    '  for (var i = 0; i < LOCALES.length; i++) byCode[LOCALES[i].code] = LOCALES[i];',
    '',
    '  var live = [];',
    "  for (var j = 0; j < LOCALES.length; j++) if (LOCALES[j].status === 'live') live.push(LOCALES[j]);",
    '',
    '  w.KS_LOCALES = LOCALES;',
    '  w.KS_LOCALE_BY_CODE = byCode;',
    '  w.KS_LIVE_LOCALES = live;',
    '}(window));',
    '',
  ].join('\n');
}

/* ── the inline block in js/lang-core.js ───────────────────────────────── */

/* Deliberately a NARROW projection. lang-core needs the picker label, the
   flag swap and the live/planned gate — nothing else. Widening this costs
   every page bytes in the critical path, so add a field only when lang-core
   actually reads it. */
function emitLangCoreBlock() {
  const rows = LOCALES.map(l => (
    '    { code: ' + JSON.stringify(l.code) +
    ', native: ' + JSON.stringify(l.native) +
    ', status: ' + JSON.stringify(l.status) +
    ',\n      flag: ' + JSON.stringify(l.flag) +
    ',\n      flagSvg: ' + JSON.stringify(l.flagSvg) + ' }'
  )).join(',\n');

  return [
    START,
    '  /* ' + BANNER_LINES[0] + ' */',
    '  /* Projection of scripts/_locales.cjs: code, native, flag, flagSvg,',
    '     status. Inlined rather than loaded from js/locales.js — see that',
    '     script\'s header for why. */',
    '  var KS_LOCALE_DATA = [',
    rows,
    '  ];',
    END,
  ].join('\n');
}

function patchLangCore(src, block) {
  const a = src.indexOf(START);
  const b = src.indexOf(END);
  if (a === -1 || b === -1) {
    throw new Error(
      'js/lang-core.js is missing the ' + START + ' … ' + END + ' markers. ' +
      'Restore them before running this script — it will not guess where the ' +
      'registry block belongs.'
    );
  }
  if (b < a) throw new Error('js/lang-core.js: ks:locales markers are out of order');
  return src.slice(0, a) + block + src.slice(b + END.length);
}

/* ── run ───────────────────────────────────────────────────────────────── */

function main() {
  const check = process.argv.indexOf('--check') !== -1;

  const wantLocalesJs = emitLocalesJs();
  const coreSrc = fs.readFileSync(LANG_CORE, 'utf8');
  const wantCore = patchLangCore(coreSrc, emitLangCoreBlock());

  const problems = [];

  if (!fs.existsSync(OUT_LOCALES)) {
    problems.push('js/locales.js is missing');
  } else if (fs.readFileSync(OUT_LOCALES, 'utf8') !== wantLocalesJs) {
    problems.push('js/locales.js is stale (does not match scripts/_locales.cjs)');
  }
  if (coreSrc !== wantCore) {
    problems.push('js/lang-core.js ks:locales block is stale');
  }

  if (check) {
    if (problems.length) {
      problems.forEach(p => console.error('FAIL  ' + p));
      console.error('\nRun: node scripts/gen-locales-js.cjs');
      process.exit(1);
    }
    console.log('PASS  js/locales.js and the lang-core ks:locales block match scripts/_locales.cjs');
    console.log('      ' + LOCALES.length + ' locales (' +
      LOCALES.filter(l => l.status === 'live').length + ' live, ' +
      LOCALES.filter(l => l.status === 'planned').length + ' planned)');
    return;
  }

  let wrote = 0;
  if (!fs.existsSync(OUT_LOCALES) || fs.readFileSync(OUT_LOCALES, 'utf8') !== wantLocalesJs) {
    fs.writeFileSync(OUT_LOCALES, wantLocalesJs);
    console.log('wrote  js/locales.js');
    wrote++;
  }
  if (coreSrc !== wantCore) {
    fs.writeFileSync(LANG_CORE, wantCore);
    console.log('wrote  js/lang-core.js  (ks:locales block)');
    wrote++;
  }
  if (!wrote) console.log('up to date  (no changes)');
  console.log(LOCALES.length + ' locales (' +
    LOCALES.filter(l => l.status === 'live').length + ' live, ' +
    LOCALES.filter(l => l.status === 'planned').length + ' planned)');
}

main();
