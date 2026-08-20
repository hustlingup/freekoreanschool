#!/usr/bin/env node
// ══════════════════════════════════════════════════════════════════════════
// noindex-vocab-tools.cjs — keep learn/vocabulary-browser and learn/flashcard
// out of the index in every locale.
//
// WHY: measured 2026-08-12. learn/vocabulary.html, learn/vocabulary-browser.html
// and learn/flashcard.html share the SAME embedded word bank, so their
// main-content text is 97.9–98.3% identical (Jaccard, whitespace-token sets):
//
//     vocabulary  vs vocabulary-browser   0.983
//     vocabulary  vs flashcard            0.979
//     vocabulary-browser vs flashcard     0.982
//
// At ~9,200 words each they were also the three LONGEST pages under learn/,
// which is why they flattered every median-word-count audit while being the
// site's largest block of internal duplicate content: 3 pages × 9 locales =
// 27 indexed URLs carrying one document.
//
// `vocabulary` is the lesson and stays indexable. The other two are TOOLS — a
// picker UI and a study deck. They have no standalone reading value, so they
// get `noindex, follow`: dropped from search, link equity still flows.
//
// NOT a canonical: Google asks that noindex and rel=canonical not be combined
// on the same URL (conflicting instructions — canonical says "consolidate onto
// the target", noindex says "drop this"). These pages keep their self-canonical
// and rely on the robots meta alone.
//
// gen-sitemap.cjs reads the robots meta and drops noindex pages automatically,
// so rerun it after this. Expect the sitemap to fall by 18 URLs.
//
// IDEMPOTENT — inserts the meta only where absent, always immediately after
// the <meta name="viewport"> line so it precedes any other head content.
//
//   node scripts/noindex-vocab-tools.cjs           # write
//   node scripts/noindex-vocab-tools.cjs --check   # verify only, exit 1 on drift
//   node scripts/noindex-vocab-tools.cjs --lift    # undo (re-index the tools)
// ══════════════════════════════════════════════════════════════════════════
'use strict';

const fs = require('fs');
const path = require('path');
const REG = require('./_locales.cjs');

const ROOT = path.join(__dirname, '..');
const LEARN = path.join(ROOT, 'learn');

const CHECK = process.argv.includes('--check');
const LIFT = process.argv.includes('--lift');

/* The two tool pages. `vocabulary` is deliberately absent — it is the lesson. */
const TOOLS = ['vocabulary-browser', 'flashcard'];

const META = '  <meta name="robots" content="noindex, follow">';
const HAS_NOINDEX = /<meta\s+name=["']robots["']\s+content=["'][^"']*noindex[^"']*["']\s*\/?>/i;
const VIEWPORT = /^.*<meta\s+name=["']viewport["'][^>]*>.*$/im;

/** Every shipped path for the two tools: en at learn/, others at learn/<code>/. */
function targets() {
  const out = [];
  for (const loc of REG.live()) {
    const dir = loc.code === 'en' ? LEARN : path.join(LEARN, loc.code);
    for (const tool of TOOLS) {
      const file = path.join(dir, `${tool}.html`);
      if (fs.existsSync(file)) out.push(file);
    }
  }
  return out;
}

function rel(file) {
  return path.relative(ROOT, file).split(path.sep).join('/');
}

let changed = 0;
let already = 0;
const problems = [];

for (const file of targets()) {
  const before = fs.readFileSync(file, 'utf8');
  const has = HAS_NOINDEX.test(before);

  if (LIFT) {
    if (!has) { already++; continue; }
    const after = before.replace(new RegExp(`\\n?${META.trim().replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')}`), '');
    if (!CHECK) fs.writeFileSync(file, after);
    changed++;
    console.log(`  lifted  ${rel(file)}`);
    continue;
  }

  if (has) { already++; continue; }

  if (CHECK) {
    problems.push(rel(file));
    continue;
  }

  // Anchor on the viewport meta: present in every shipped shell, and placing
  // the robots directive right after it keeps it above the title/canonical
  // block where a human reading the head expects to find it.
  if (!VIEWPORT.test(before)) {
    problems.push(`${rel(file)} — no <meta name="viewport"> to anchor on`);
    continue;
  }
  const after = before.replace(VIEWPORT, m => `${m}\n${META}`);
  fs.writeFileSync(file, after);
  changed++;
  console.log(`  noindex ${rel(file)}`);
}

console.log('');
if (CHECK) {
  if (problems.length) {
    console.error(`FAIL — ${problems.length} tool page(s) missing the noindex directive:`);
    problems.forEach(p => console.error(`  ${p}`));
    console.error('\nRun: node scripts/noindex-vocab-tools.cjs');
    process.exit(1);
  }
  console.log(`PASS — all ${already} vocab tool pages carry noindex.`);
} else {
  console.log(`${changed} changed, ${already} already correct.`);
  if (problems.length) {
    problems.forEach(p => console.error(`  SKIPPED ${p}`));
    process.exit(1);
  }
  if (!LIFT) console.log('Now rerun: node scripts/gen-sitemap.cjs   (expect -18 URLs)');
}
