#!/usr/bin/env node
/* ═══════════════════════════════════════════════════════════════════════
   fix-lang-manager-scripts.cjs — a page that renders the language button
   must also load the manager that drives it.

     node scripts/fix-lang-manager-scripts.cjs           # apply
     node scripts/fix-lang-manager-scripts.cjs --check   # verify, exit 1 on drift

   Idempotent and marker-free: it inserts nothing if lang-core.js (or the
   legacy js/lang-ja.js manager) is already loaded.

   WHY. 24 pages under travel/ ship `<button id="lang-toggle">🇺🇸 EN</button>`
   but load only js/app.js. With no LangManager:

     • _renderBtn() never replaces the label with 🌐, so the raw flag emoji
       stays — and Windows has no flag font, so 🇺🇸 renders as the letters
       "US". That is the "US EN" box reported in the top-right corner.
     • _initFlagSvgs() never runs, so the inline-SVG fallback that exists for
       exactly this reason never gets a chance either.
     • the button has no click handler at all — the language modal cannot be
       opened from these pages.
     • on the 20 localized ones the UI pack never loads, so page chrome that
       relies on LangManager.t() stays English.

   The fix mirrors what the working sibling pages already do: lang-core.js
   immediately before app.js, plus the locale pack on non-English pages.
═══════════════════════════════════════════════════════════════════════ */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CHECK = process.argv.includes('--check');
const LANGS = ['ja', 'zh-tw', 'es', 'fr', 'de', 'vi', 'th', 'id'];
const SKIP_DIR = /node_modules|\.git|scripts|docs|admin|translation|supabase|assets/;

const pages = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) { if (!SKIP_DIR.test(p)) walk(p); continue; }
    if (e.name.endsWith('.html')) pages.push(p);
  }
})(ROOT);

const fixed = [], problems = [];

for (const file of pages) {
  const src = fs.readFileSync(file, 'utf8');
  if (!/id="lang-toggle"|id="lang-picker-btn"/.test(src)) continue;
  if (/js\/lang-core\.js/.test(src) || /js\/lang-ja\.js/.test(src)) continue;   // already has a manager

  // Anchor on the page's own app.js tag so the relative depth is never guessed.
  const m = src.match(/([ \t]*)<script src="((?:\.\.\/)*|\/)js\/app\.js"><\/script>/);
  if (!m) { problems.push(`${path.relative(ROOT, file)}: no js/app.js script tag to anchor on`); continue; }
  const [tag, indent, rel] = m;

  const lang = (src.match(/<html[^>]*\blang="([^"]+)"/) || [])[1] || 'en';
  const code = lang.toLowerCase();
  const lines = [`${indent}<script src="${rel}js/lang-core.js"></script>`];
  if (LANGS.includes(code)) lines.push(`${indent}<script src="${rel}js/langs/lang-${code}.js"></script>`);

  if (!CHECK) fs.writeFileSync(file, src.replace(tag, lines.join('\n') + '\n' + tag));
  fixed.push(`${path.relative(ROOT, file).split(path.sep).join('/')} (${code})`);
}

if (problems.length) {
  console.error(`${problems.length} problem(s):`);
  problems.forEach(p => console.error('  ' + p));
  process.exit(1);
}

if (CHECK) {
  console.log(fixed.length
    ? `${fixed.length} page(s) render a language button with no LangManager:\n  ` + fixed.join('\n  ')
    : 'every page with a language button loads a LangManager');
  process.exit(fixed.length ? 1 : 0);
}
console.log(`patched ${fixed.length} page(s):\n  ` + fixed.join('\n  '));
