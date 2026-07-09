#!/usr/bin/env node
/**
 * inject-ad-zones.cjs — the ONLY way ad zones enter pages (adsense/GUIDE.md §7.1).
 *
 *   node scripts/inject-ad-zones.cjs <scope> [--rail] [--dry-run]
 *
 * <scope>: culture | culture/es | learn | travel | news | root | a single .html file | all
 * Directory scopes match DIRECT children only ("culture" = English pages;
 * "culture/es" = Spanish mirror). "all" walks everything recursively.
 *
 * Pure string insertion. Never regenerates, reformats, or re-serializes pages.
 * Idempotent per zone: top/bottom skip if that zone class already exists; mid
 * zones are placed at sub-heading intervals (every 3rd anchor) and each spot is
 * skipped when an ad-zone already sits in the surrounding section neighborhood.
 * Re-running upgrades pages injected by older single-mid versions in place.
 * NEVER confuse with gen-content-mirrors.cjs / gen-root-mirrors.cjs — do not run those.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SLOTS_FILE = path.join(__dirname, 'ad-slots.json');

// §4 exclusion list — zero ads, matched by basename in every language dir.
// lesson-header-mobile-options is a scratch file slated for deletion (§3.2).
const EXCLUDED_BASENAMES = /^(privacy|terms|contact|search|quiz|article|board|admin|lesson-header-mobile-options)\.html$/;
const SKIP_DIRS = new Set(['.git', '.github', 'node_modules', 'scripts', 'adsense', 'translation']);
const LANGS = new Set(['ja', 'zh-tw', 'es', 'de', 'fr', 'vi', 'th', 'id']);

const ANCHOR = '<div class="culture-sub-heading"';

// ── args ────────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const RAIL = args.includes('--rail');
const DRY = args.includes('--dry-run');
const scope = args.filter((a) => !a.startsWith('--'))[0];

if (!scope) {
  console.error('Usage: node scripts/inject-ad-zones.cjs <scope> [--rail] [--dry-run]');
  console.error('  scope: culture | culture/es | learn | travel | news | root | <file.html> | all');
  process.exit(1);
}

// ── slot IDs ────────────────────────────────────────────────────────────────
let slots;
try {
  slots = JSON.parse(fs.readFileSync(SLOTS_FILE, 'utf8'));
} catch (e) {
  console.error(`Cannot read ${SLOTS_FILE}: ${e.message}`);
  process.exit(1);
}
const CLIENT = slots.client;
const needed = RAIL ? ['top', 'mid', 'bottom', 'rail'] : ['top', 'mid', 'bottom'];
const missing = needed.filter((k) => !/^\d+$/.test(String(slots.slots[k] || '')));
if (missing.length && !DRY) {
  console.error('ABORT — scripts/ad-slots.json is missing numeric slot IDs for: ' + missing.join(', '));
  console.error('Owner step (GUIDE §6): AdSense → Ads → By ad unit → Display ads —');
  console.error('create units ks-top / ks-mid / ks-bottom / ks-rail and paste their');
  console.error('numeric IDs into scripts/ad-slots.json. Then re-run this command.');
  process.exit(1);
}
if (missing.length && DRY) {
  console.log(`(dry-run with empty slot IDs for: ${missing.join(', ')} — plan only, real run will abort)\n`);
}

// ── file list ───────────────────────────────────────────────────────────────
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
  if (scope.endsWith('.html')) {
    const f = path.resolve(ROOT, scope);
    if (!fs.existsSync(f)) { console.error(`No such file: ${scope}`); process.exit(1); }
    return [f];
  }
  const dir = scope === 'root' ? ROOT : path.resolve(ROOT, scope);
  if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) {
    console.error(`No such scope directory: ${scope}`);
    process.exit(1);
  }
  return fs.readdirSync(dir)
    .filter((n) => n.endsWith('.html'))
    .map((n) => path.join(dir, n));
}

// ── page-type matrix (§4) ───────────────────────────────────────────────────
// Returns the zones this page is entitled to, or null if no matrix rule applies.
function zonesFor(rel) {
  const parts = rel.split('/');
  let section = parts.length === 1 ? 'root' : parts[0];
  // language mirrors: culture/ja/x.html → culture; ja/about.html → root-type
  if (LANGS.has(section) ) section = 'root';
  const base = path.basename(rel, '.html');
  switch (section) {
    case 'culture':
      return base === 'index' ? ['bottom'] : ['top', 'mid', 'bottom'];
    case 'learn':
      return ['bottom']; // NEVER inside/above the step-runner
    case 'travel':
      return ['top', 'bottom']; // top only lands if an anchor exists
    case 'news':
      return base === 'index' ? ['bottom'] : null;
    case 'root':
      return (base === 'index' || base === 'about') ? ['bottom'] : null;
    default:
      return null;
  }
}

// ── markup builders ─────────────────────────────────────────────────────────
function zoneHtml(type, indent) {
  const slot = slots.slots[type] || 'NNNNNNNNNN';
  return [
    `${indent}<div class="ad-zone ad-zone--${type}">`,
    `${indent}  <ins class="adsbygoogle" style="display:block"`,
    `${indent}       data-ad-client="${CLIENT}"`,
    `${indent}       data-ad-slot="${slot}"`,
    `${indent}       data-ad-format="auto"`,
    `${indent}       data-full-width-responsive="true"></ins>`,
    `${indent}</div>`,
    '',
  ].join('\n');
}

function railHtml(indent) {
  const slot = slots.slots.rail || 'NNNNNNNNNN';
  return `\n${indent}<aside class="ad-rail"><div class="ad-zone ad-zone--rail"><ins class="adsbygoogle" style="display:block" data-ad-client="${CLIENT}" data-ad-slot="${slot}" data-ad-format="auto"></ins></div></aside>`;
}

function lineIndentAt(text, idx) {
  const lineStart = text.lastIndexOf('\n', idx - 1) + 1;
  return { lineStart, indent: (text.slice(lineStart, idx).match(/^[ \t]*/) || [''])[0] };
}

function anchorOffsets(text) {
  const out = [];
  let i = text.indexOf(ANCHOR);
  while (i !== -1) { out.push(i); i = text.indexOf(ANCHOR, i + 1); }
  return out;
}

// ── per-file plan + apply ───────────────────────────────────────────────────
const rows = [];
let wrote = 0;

for (const abs of listFiles().sort()) {
  const rel = path.relative(ROOT, abs).split(path.sep).join('/');
  const base = path.basename(rel);

  if (EXCLUDED_BASENAMES.test(base)) { rows.push([rel, '—', 'excluded page (§4)']); continue; }
  const wanted = zonesFor(rel);
  if (!wanted) { rows.push([rel, '—', 'no matrix rule']); continue; }

  const text = fs.readFileSync(abs, 'utf8');

  // bottom anchor: end of <main>, else before <footer> (section-based pages like index.html)
  let mainClose = text.lastIndexOf('</main>');
  if (mainClose === -1) mainClose = text.lastIndexOf('<footer');
  if (mainClose === -1) { rows.push([rel, '—', 'no </main> or <footer> — skipped']); continue; }

  const anchors = anchorOffsets(text);
  // insertions: { offset, html } — applied in descending offset order
  const ins = [];
  const placed = [];
  const skipped = [];

  for (const type of wanted) {
    if (type === 'bottom') {
      if (text.includes('ad-zone--bottom')) { skipped.push('bottom: exists'); continue; }
      const { lineStart, indent } = lineIndentAt(text, mainClose);
      ins.push({ offset: lineStart, html: zoneHtml('bottom', indent + '  ') });
      placed.push('bottom');
    } else if (type === 'top') {
      if (!anchors.length) { skipped.push('top: no anchor'); continue; }
      if (text.includes('ad-zone--top')) { skipped.push('top: exists'); continue; }
      const { lineStart, indent } = lineIndentAt(text, anchors[0]);
      ins.push({ offset: lineStart, html: zoneHtml('top', indent) });
      placed.push('top');
    } else if (type === 'mid') {
      if (anchors.length < 4) { skipped.push(`mid: only ${anchors.length} anchors (<4)`); continue; }
      // interval placement: one mid before every 3rd sub-heading, skipping any
      // spot whose surrounding sections already contain an ad-zone
      const STEP = 3;
      let placedMid = 0;
      for (let ai = STEP; ai < anchors.length; ai += STEP) {
        const hoodStart = anchors[Math.max(0, ai - 2)];
        const hoodEnd = ai + 1 < anchors.length ? anchors[ai + 1] : mainClose;
        if (text.slice(hoodStart, hoodEnd).includes('class="ad-zone')) continue;
        const { lineStart, indent } = lineIndentAt(text, anchors[ai]);
        ins.push({ offset: lineStart, html: zoneHtml('mid', indent) });
        placedMid++;
      }
      if (placedMid) placed.push(`mid×${placedMid}`);
      else skipped.push('mid: all interval spots occupied');
    }
  }

  if (RAIL && text.includes('class="sidebar"') && !text.includes('class="ad-rail"')) {
    const { indent } = lineIndentAt(text, mainClose);
    ins.push({ offset: mainClose + '</main>'.length, html: railHtml(indent) });
    placed.push('rail');
  }

  if (!placed.length) { rows.push([rel, '—', skipped.join('; ') || 'nothing to place']); continue; }

  // ads.js script tag before </body>, ../ depth from file location
  let out = text;
  ins.sort((a, b) => b.offset - a.offset);
  for (const { offset, html } of ins) out = out.slice(0, offset) + html + out.slice(offset);

  if (!out.includes('js/ads.js')) {
    const depth = rel.split('/').length - 1;
    const prefix = '../'.repeat(depth);
    const bodyClose = out.lastIndexOf('</body>');
    if (bodyClose !== -1) {
      out = out.slice(0, bodyClose) + `<script defer src="${prefix}js/ads.js"></script>\n` + out.slice(bodyClose);
      placed.push('ads.js tag');
    }
  }

  if (!DRY) { fs.writeFileSync(abs, out); wrote++; }
  rows.push([rel, placed.join(' + '), skipped.join('; ')]);
}

// ── summary ─────────────────────────────────────────────────────────────────
const w = Math.max(...rows.map((r) => r[0].length), 4);
console.log(`${DRY ? 'DRY-RUN PLAN' : 'INJECTED'} — scope: ${scope}${RAIL ? ' (+rail)' : ''}\n`);
console.log('file'.padEnd(w) + ' | inserted            | skipped/why');
console.log('-'.repeat(w) + '-+---------------------+------------');
for (const [f, p, s] of rows) console.log(f.padEnd(w) + ' | ' + p.padEnd(19) + ' | ' + s);
console.log(`\n${rows.length} files scanned, ${DRY ? rows.filter((r) => r[1] !== '—').length + ' would change' : wrote + ' written'}.`);
