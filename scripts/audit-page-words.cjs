#!/usr/bin/env node
// ══════════════════════════════════════════════════════════════════════════
// audit-page-words.cjs — report server-rendered main-content word count for
// EVERY shipped page in every section + locale, flag pages under a bar.
//
//   node scripts/audit-page-words.cjs                 # grouped table + summary
//   node scripts/audit-page-words.cjs --json out.json # machine-readable
//   node scripts/audit-page-words.cjs --under 2000    # only flag rows < N
//   node scripts/audit-page-words.cjs --page index.html   # one page, all locales
//
// "Words" = whitespace-separated Latin tokens PLUS one unit per CJK ideograph /
// Hangul syllable / Kana / Thai cluster, so ja / zh-tw / th are measured fairly
// against en / es / de / fr / vi / id. Chrome (header, footer, sidebar nav,
// scripts, styles) is stripped so the number reflects real page content.
// ══════════════════════════════════════════════════════════════════════════
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const BAR = (() => {
  const i = process.argv.indexOf('--under');
  return i !== -1 ? parseInt(process.argv[i + 1], 10) : 2000;
})();
const JSON_OUT = (() => {
  const i = process.argv.indexOf('--json');
  return i !== -1 ? process.argv[i + 1] : null;
})();
const ONE_PAGE = (() => {
  const i = process.argv.indexOf('--page');
  return i !== -1 ? process.argv[i + 1] : null;
})();

const SKIP_DIRS = new Set(['.git', 'node_modules', 'scripts', 'docs', 'adsense', 'supabase', 'assets', 'api', 'admin']);
const SKIP_PREFIX = ['translation' + path.sep];

const DENSE = /[぀-ヿ㐀-䶿一-鿿가-힯฀-๿]/g;
function countWords(text) {
  const dense = (text.match(DENSE) || []).length;
  const latin = text.replace(DENSE, ' ').split(/\s+/).filter(w => /[\p{L}\p{N}]/u.test(w)).length;
  return dense + latin;
}

// Content = <main> if present, else <body> with header/footer/aside/nav removed.
function contentText(html) {
  let m;
  const ms = html.indexOf('<main');
  const me = html.indexOf('</main>');
  if (ms !== -1 && me !== -1) {
    m = html.slice(ms, me);
  } else {
    const bs = html.indexOf('<body');
    const be = html.indexOf('</body>');
    m = bs !== -1 && be !== -1 ? html.slice(bs, be) : html;
    m = m
      .replace(/<header\b[\s\S]*?<\/header>/gi, ' ')
      .replace(/<footer\b[\s\S]*?<\/footer>/gi, ' ')
      .replace(/<aside\b[\s\S]*?<\/aside>/gi, ' ')
      .replace(/<nav\b[\s\S]*?<\/nav>/gi, ' ');
  }
  return m
    .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&[a-zA-Z#0-9]+;/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function isNoindex(html) {
  return /<meta[^>]+name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html);
}

// section + locale from a repo-relative path like culture/ja/kpop.html
const LOCALES = new Set(['ja', 'zh-tw', 'es', 'de', 'fr', 'vi', 'th', 'id']);
function classify(rel) {
  const parts = rel.split(/[\\/]/);
  let section = parts.length > 1 ? parts[0] : 'root';
  let locale = 'en';
  for (const p of parts) if (LOCALES.has(p)) { locale = p; break; }
  // root-locale pages like ja/index.html → section 'root'
  if (parts.length === 2 && LOCALES.has(parts[0])) section = 'root';
  return { section, locale };
}

function walk(dir, out) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const rel = path.relative(ROOT, full);
    if (SKIP_PREFIX.some(p => rel.startsWith(p))) continue;
    const st = fs.statSync(full);
    if (st.isDirectory()) {
      if (SKIP_DIRS.has(name)) continue;
      walk(full, out);
    } else if (name.endsWith('.html')) {
      out.push(full);
    }
  }
  return out;
}

const files = walk(ROOT, []).sort();
const rows = [];
for (const file of files) {
  const rel = path.relative(ROOT, file).replace(/\\/g, '/');
  if (ONE_PAGE && path.basename(file) !== ONE_PAGE) continue;
  const html = fs.readFileSync(file, 'utf8');
  const { section, locale } = classify(path.relative(ROOT, file));
  rows.push({ file: rel, section, locale, words: countWords(contentText(html)), noindex: isNoindex(html) });
}

if (JSON_OUT) {
  fs.writeFileSync(JSON_OUT, JSON.stringify(rows, null, 2));
  console.log(`wrote ${rows.length} rows to ${JSON_OUT}`);
  process.exit(0);
}

if (ONE_PAGE) {
  console.log(`\nWord counts for ${ONE_PAGE} (content only):\n`);
  for (const r of rows.sort((a, b) => a.locale.localeCompare(b.locale))) {
    console.log(`  ${r.locale.padEnd(6)} ${String(r.words).padStart(5)}  ${r.noindex ? '(noindex)' : ''}  ${r.file}`);
  }
  process.exit(0);
}

// Grouped summary
const bySection = {};
for (const r of rows) (bySection[r.section] ||= []).push(r);

console.log(`\n=== Thin-page inventory — content words per page (bar: ${BAR}) ===\n`);
let flagged = 0, flaggedIndexable = 0;
for (const section of Object.keys(bySection).sort()) {
  const rs = bySection[section];
  const under = rs.filter(r => r.words < BAR);
  const idx = under.filter(r => !r.noindex);
  const avg = Math.round(rs.reduce((s, r) => s + r.words, 0) / rs.length);
  console.log(`${section.padEnd(9)}  ${String(rs.length).padStart(3)} pages  avg ${String(avg).padStart(5)}w  · under-bar ${under.length} (${idx.length} indexable)`);
  flagged += under.length;
  flaggedIndexable += idx.length;
}
console.log(`\nTotal: ${rows.length} pages · ${flagged} under ${BAR}w (${flaggedIndexable} indexable, ${flagged - flaggedIndexable} noindex).`);
console.log(`Run with --json <file> for the full per-page list, or --page <name.html> for one page across locales.`);
