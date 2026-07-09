'use strict';
// Adds hreflang="fr" and hreflang="de" links to all English source HTML pages
// that are already in x-default position, inserting after the ja hreflang line.
const fs   = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

// Returns the slug from an existing hreflang="ja" line
function insertAfterJa(html, frLine, deLine) {
  // Insert fr (if missing) and de after hreflang="ja"
  const jaRe = /(<link rel="alternate" hreflang="ja"[^>]*>)/;
  const esRe = /<link rel="alternate" hreflang="es"/;
  const frRe = /<link rel="alternate" hreflang="fr"/;
  const deRe = /<link rel="alternate" hreflang="de"/;

  if (!jaRe.test(html)) return html; // no ja hreflang → skip

  let result = html;

  // Build the insertion block (only lines not already present)
  const toInsert = [];
  if (frLine && !frRe.test(result) && !esRe.test(result)) {
    // Only insert fr if es is also missing (means neither was added yet)
    // Actually: insert fr whenever it's missing
  }
  if (frLine && !frRe.test(result)) toInsert.push(frLine);
  if (deLine && !deRe.test(result)) toInsert.push(deLine);

  if (toInsert.length === 0) return html; // nothing to add

  result = result.replace(jaRe, `$1\n  ${toInsert.join('\n  ')}`);
  return result;
}

function patchFile(filepath, frLine, deLine) {
  const html = fs.readFileSync(filepath, 'utf8');
  const patched = insertAfterJa(html, frLine, deLine);
  if (patched === html) return false;
  fs.writeFileSync(filepath, patched, 'utf8');
  return true;
}

let total = 0;

// ── learn/*.html ─────────────────────────────────────────────────────────────
const learnFiles = fs.readdirSync(path.join(ROOT, 'learn'))
  .filter(f => f.endsWith('.html'));
for (const f of learnFiles) {
  const slug = f.replace('.html', '');
  const frLine = `<link rel="alternate" hreflang="fr" href="https://freekoreanschool.com/learn/fr/${slug}">`;
  const deLine = `<link rel="alternate" hreflang="de" href="https://freekoreanschool.com/learn/de/${slug}">`;
  const changed = patchFile(path.join(ROOT, 'learn', f), frLine, deLine);
  if (changed) { console.log(`✓ learn/${f}`); total++; }
}

// ── culture/*.html ─────────────────────────────────────────────────────────
const cultureFiles = fs.readdirSync(path.join(ROOT, 'culture'))
  .filter(f => f.endsWith('.html'));
for (const f of cultureFiles) {
  const slug = f.replace('.html', '');
  const frLine = `<link rel="alternate" hreflang="fr" href="https://freekoreanschool.com/culture/fr/${slug}">`;
  const deLine = `<link rel="alternate" hreflang="de" href="https://freekoreanschool.com/culture/de/${slug}">`;
  const changed = patchFile(path.join(ROOT, 'culture', f), frLine, deLine);
  if (changed) { console.log(`✓ culture/${f}`); total++; }
}

// ── root *.html ────────────────────────────────────────────────────────────
const rootFiles = fs.readdirSync(ROOT)
  .filter(f => f.endsWith('.html'));
for (const f of rootFiles) {
  const slug = f.replace('.html', '');
  // Root pages: /fr/ and /de/ are language home pages (no slug path)
  let frHref, deHref;
  if (slug === 'index') {
    frHref = 'https://freekoreanschool.com/fr/';
    deHref = 'https://freekoreanschool.com/de/';
  } else {
    frHref = `https://freekoreanschool.com/fr/${slug}`;
    deHref = `https://freekoreanschool.com/de/${slug}`;
  }
  const frLine = `<link rel="alternate" hreflang="fr" href="${frHref}">`;
  const deLine = `<link rel="alternate" hreflang="de" href="${deHref}">`;
  const changed = patchFile(path.join(ROOT, f), frLine, deLine);
  if (changed) { console.log(`✓ ${f}`); total++; }
}

console.log(`\n✓ Updated ${total} file(s)`);
