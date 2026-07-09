#!/usr/bin/env node
/**
 * audit-ad-zones.cjs — ad-zone status + resume mechanism (adsense/GUIDE.md §7.2).
 *
 *   node scripts/audit-ad-zones.cjs [scope]
 *
 * Scans HTML files (same scope semantics as inject-ad-zones.cjs; default: all)
 * and reports per page: zones by type, ads.js tag, and flags:
 *   ⛔ excluded page containing a zone
 *   ⚠️ over budget (>3 zones)
 *   ⚠️ zone present but AdSense loader missing from <head>
 *   ⚠️ <ins> without a numeric data-ad-slot
 * Ends with a per-section/per-language rollup (done / pending).
 * "Pending" = includable page with 0 zones.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const EXCLUDED_BASENAMES = /^(privacy|terms|contact|search|quiz|article|board|admin|lesson-header-mobile-options)\.html$/;
const SKIP_DIRS = new Set(['.git', '.github', 'node_modules', 'scripts', 'adsense', 'translation']);
const LANGS = new Set(['ja', 'zh-tw', 'es', 'de', 'fr', 'vi', 'th', 'id']);

const scope = process.argv[2] || 'all';

function walk(dir, out) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ent.isDirectory()) {
      if (!SKIP_DIRS.has(ent.name)) walk(path.join(dir, ent.name), out);
    } else if (ent.name.endsWith('.html')) {
      out.push(path.join(dir, ent.name));
    }
  }
  return out;
}

function listFiles() {
  if (scope === 'all') return walk(ROOT, []);
  if (scope.endsWith('.html')) return [path.resolve(ROOT, scope)];
  const dir = scope === 'root' ? ROOT : path.resolve(ROOT, scope);
  if (!fs.existsSync(dir)) { console.error(`No such scope: ${scope}`); process.exit(1); }
  return fs.readdirSync(dir).filter((n) => n.endsWith('.html')).map((n) => path.join(dir, n));
}

// Same includability rule as the injector's matrix (§4).
function includable(rel) {
  const parts = rel.split('/');
  let section = parts.length === 1 ? 'root' : parts[0];
  if (LANGS.has(section)) section = 'root';
  const base = path.basename(rel, '.html');
  if (section === 'culture' || section === 'learn' || section === 'travel') return true;
  if (section === 'news') return base === 'index';
  if (section === 'root') return base === 'index' || base === 'about';
  return false;
}

function groupKey(rel) {
  const parts = rel.split('/');
  if (LANGS.has(parts[0])) return `root/${parts[0]}`;
  if (parts.length === 1) return 'root/en';
  const lang = LANGS.has(parts[1]) ? parts[1] : 'en';
  return `${parts[0]}/${lang}`;
}

const rows = [];
const groups = {}; // key → { done, pending }
let flagCount = 0;

for (const abs of listFiles().sort()) {
  const rel = path.relative(ROOT, abs).split(path.sep).join('/');
  const base = path.basename(rel);
  const text = fs.readFileSync(abs, 'utf8');

  const zones = { top: 0, mid: 0, bottom: 0, rail: 0 };
  const zoneRe = /class="ad-zone ad-zone--(top|mid|bottom|rail)"/g;
  let m;
  while ((m = zoneRe.exec(text))) zones[m[1]]++;
  const total = zones.top + zones.mid + zones.bottom + zones.rail;

  const hasAdsJs = text.includes('js/ads.js');
  const hasLoader = text.includes('pagead2.googlesyndication.com/pagead/js/adsbygoogle.js');
  const excluded = EXCLUDED_BASENAMES.test(base);

  const flags = [];
  if (excluded && total > 0) flags.push('⛔ excluded page has zones');
  if (total > 3) flags.push(`⚠️ over budget (${total} zones)`);
  if (total > 0 && !hasLoader) flags.push('⚠️ loader missing from <head>');
  const insRe = /<ins class="adsbygoogle"[^>]*data-ad-slot="([^"]*)"/g;
  while ((m = insRe.exec(text))) {
    if (!/^\d+$/.test(m[1])) { flags.push('⚠️ non-numeric data-ad-slot'); break; }
  }
  // also flag ins tags with no slot attribute at all
  if (/<ins class="adsbygoogle"(?![^>]*data-ad-slot=)[^>]*>/.test(text)) {
    flags.push('⚠️ ins without data-ad-slot');
  }
  flagCount += flags.length;

  const zoneDesc = total === 0 ? '-' :
    Object.entries(zones).filter(([, n]) => n).map(([t, n]) => (n > 1 ? `${t}×${n}` : t)).join('+');

  if (total > 0 || flags.length || includable(rel)) {
    rows.push([rel, zoneDesc, hasAdsJs ? 'yes' : '-', flags.join(', ')]);
  }

  if (!excluded && includable(rel)) {
    const key = groupKey(rel);
    groups[key] = groups[key] || { done: 0, pending: 0 };
    if (total > 0) groups[key].done++; else groups[key].pending++;
  }
}

const w = Math.max(...rows.map((r) => r[0].length), 4);
console.log(`AD-ZONE AUDIT — scope: ${scope}\n`);
console.log('file'.padEnd(w) + ' | zones            | ads.js | flags');
console.log('-'.repeat(w) + '-+------------------+--------+------');
for (const [f, z, a, fl] of rows) {
  console.log(f.padEnd(w) + ' | ' + z.padEnd(16) + ' | ' + a.padEnd(6) + ' | ' + fl);
}

console.log('\nRollup (includable pages):');
for (const key of Object.keys(groups).sort()) {
  const g = groups[key];
  const mark = g.pending === 0 ? '✅' : '⏳';
  console.log(`  ${mark} ${key.padEnd(14)} done ${String(g.done).padStart(3)} / pending ${String(g.pending).padStart(3)}`);
}
console.log(`\n${flagCount === 0 ? '✅ zero flags' : `⚠️ ${flagCount} flag(s) — fix before review`}`);
