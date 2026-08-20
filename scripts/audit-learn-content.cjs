// ══════════════════════════════════════════════════════════════════════════
// audit-learn-content.cjs — report server-rendered main-content word count
// for every learn page in every locale.
//
//   node scripts/audit-learn-content.cjs            # full table
//   node scripts/audit-learn-content.cjs --summary  # per-locale roll-up only
//   node scripts/audit-learn-content.cjs --json out.json
//
// "Words" = whitespace-separated tokens PLUS one unit per CJK ideograph /
// Hangul syllable / Kana / Thai cluster, so that ja / zh-tw / th pages are
// measured fairly against en / es / de / fr / vi / id.
// ══════════════════════════════════════════════════════════════════════════
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const LEARN = path.join(ROOT, 'learn');
const REG = require('./_locales.cjs');
// LOCALES was a hardcoded array; now sourced from the registry so a locale
// added there is measured here without a second hand-edit. `--locales`
// overrides the default scope (live 8 + en) — pass a 'planned' code to see
// its honest 0-pages state instead of it silently vanishing from the table
// (see the missingLocales reporting below).
const argLocales = (() => {
  const i = process.argv.indexOf('--locales');
  return i !== -1 && process.argv[i + 1]
    ? process.argv[i + 1].split(',').map(s => s.trim().toLowerCase()).filter(Boolean)
    : null;
})();
if (argLocales) argLocales.forEach(c => {
  if (c !== 'en' && !REG.get(c)) throw new Error(`unknown locale "${c}" — not in scripts/_locales.cjs`);
});
const LOCALES = argLocales || ['en', ...REG.liveDirs()];
const THRESHOLD = 300;

// Characters that are meaning-dense enough that one char ≈ one word.
const DENSE = /[぀-ヿ㐀-䶿一-鿿가-힯฀-๿]/g;

function countWords(text) {
  const dense = (text.match(DENSE) || []).length;
  const latin = text.replace(DENSE, ' ')
    .split(/\s+/)
    .filter(w => /[\p{L}\p{N}]/u.test(w)).length;
  return dense + latin;
}

/** Extract visible text of <main>, minus scripts, styles, and nav chrome. */
function mainText(html) {
  const s = html.indexOf('<main');
  const e = html.indexOf('</main>');
  let m = s === -1 || e === -1 ? html : html.slice(s, e);
  m = m
    .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&[a-zA-Z#0-9]+;/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  return m;
}

function staticBlockWords(html) {
  const s = html.indexOf('<details id="lesson-static"');
  if (s === -1) return 0;
  const e = html.indexOf('</details>', html.lastIndexOf('<!-- /lesson-static -->') - 1);
  const end = html.indexOf('<!-- /lesson-static -->');
  const block = end === -1 ? html.slice(s) : html.slice(s, end);
  return countWords(
    block.replace(/<[^>]+>/g, ' ').replace(/&[a-zA-Z#0-9]+;/g, '').replace(/\s+/g, ' ')
  );
}

function localeDir(loc) {
  return loc === 'en' ? LEARN : path.join(LEARN, loc);
}

const rows = [];
const missingLocales = [];
for (const loc of LOCALES) {
  const dir = localeDir(loc);
  if (!fs.existsSync(dir)) { missingLocales.push(loc); continue; }
  for (const f of fs.readdirSync(dir).sort()) {
    if (!f.endsWith('.html')) continue;
    const html = fs.readFileSync(path.join(dir, f), 'utf8');
    const total = countWords(mainText(html));
    rows.push({
      locale: loc,
      page: f.replace(/\.html$/, ''),
      file: path.relative(ROOT, path.join(dir, f)).replace(/\\/g, '/'),
      words: total,
      staticWords: staticBlockWords(html),
      hasStatic: html.includes('id="lesson-static"'),
      hasRunner: html.includes('StepRunner.init'),
    });
  }
}

const args = process.argv.slice(2);
const jsonIdx = args.indexOf('--json');
if (jsonIdx !== -1 && args[jsonIdx + 1]) {
  fs.writeFileSync(args[jsonIdx + 1], JSON.stringify(rows, null, 2), 'utf8');
  console.log('wrote ' + args[jsonIdx + 1]);
}

const summary = args.includes('--summary');

if (!summary) {
  console.log('locale  page                    words  static  runner  ok');
  console.log('─'.repeat(64));
  for (const r of rows) {
    console.log(
      r.locale.padEnd(7) +
      r.page.padEnd(23) +
      String(r.words).padStart(6) +
      String(r.staticWords).padStart(8) +
      (r.hasRunner ? '     yes' : '      — ') +
      (r.words >= THRESHOLD ? '   ✓' : '   ✗')
    );
  }
  console.log('─'.repeat(64));
}

const byLocale = {};
for (const r of rows) {
  (byLocale[r.locale] ||= []).push(r.words);
}
console.log('\nPer-locale (min / median / max words, pages under ' + THRESHOLD + '):');
for (const [loc, ws] of Object.entries(byLocale)) {
  const s = [...ws].sort((a, b) => a - b);
  const med = s[Math.floor(s.length / 2)];
  const under = s.filter(w => w < THRESHOLD).length;
  console.log(
    `  ${loc.padEnd(6)} n=${String(s.length).padStart(2)}  min=${String(s[0]).padStart(5)}  median=${String(med).padStart(5)}  max=${String(s[s.length - 1]).padStart(6)}  under=${under}`
  );
}
// A locale with no directory at all produces zero rows and used to vanish
// from the table above with no trace — indistinguishable from "0 thin
// pages", i.e. a silent pass on a locale that was never scanned. Name it.
if (missingLocales.length) {
  console.log(`\n${missingLocales.length} locale(s) NOT PRESENT on disk — 0% scanned, not "0 thin pages": ${missingLocales.join(', ')}`);
}

const all = rows.map(r => r.words).sort((a, b) => a - b);
const under = rows.filter(r => r.words < THRESHOLD);
console.log(
  `\nTOTAL ${rows.length} pages · median ${all[Math.floor(all.length / 2)]} words · ` +
  `${under.length} below ${THRESHOLD}`
);
if (under.length) {
  console.log('Below threshold:');
  for (const r of under) console.log(`  ${String(r.words).padStart(5)}  ${r.file}`);
}
