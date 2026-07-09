'use strict';
// Adds hreflang="id" links to English source HTML pages (learn/, culture/,
// travel/, news/, and root), inserting right after the existing hreflang="es"
// line (the most consistently-present alternate across sections) and right
// before hreflang="x-default" as a fallback if "es" is absent.
const fs   = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

function insertId(html, idLine) {
  const esRe = /(<link rel="alternate" hreflang="es"[^>]*>)/;
  const idRe = /<link rel="alternate" hreflang="id"/;
  const xdefaultRe = /(<link rel="alternate" hreflang="x-default"[^>]*>)/;

  if (idRe.test(html)) return html; // already present

  if (esRe.test(html)) {
    return html.replace(esRe, `$1\n  ${idLine}`);
  }
  if (xdefaultRe.test(html)) {
    return html.replace(xdefaultRe, `${idLine}\n  $1`);
  }
  return html; // no hreflang block at all — skip
}

function patchFile(filepath, idLine) {
  const html = fs.readFileSync(filepath, 'utf8');
  const patched = insertId(html, idLine);
  if (patched === html) return false;
  fs.writeFileSync(filepath, patched, 'utf8');
  return true;
}

let total = 0;

// ── learn/*.html ─────────────────────────────────────────────────────────────
const learnFiles = fs.readdirSync(path.join(ROOT, 'learn')).filter(f => f.endsWith('.html'));
for (const f of learnFiles) {
  const slug = f.replace('.html', '');
  const idLine = `<link rel="alternate" hreflang="id" href="https://freekoreanschool.com/learn/id/${slug}">`;
  if (patchFile(path.join(ROOT, 'learn', f), idLine)) { console.log(`✓ learn/${f}`); total++; }
}

// ── culture/*.html ─────────────────────────────────────────────────────────
const cultureFiles = fs.readdirSync(path.join(ROOT, 'culture')).filter(f => f.endsWith('.html'));
for (const f of cultureFiles) {
  const slug = f.replace('.html', '');
  const idLine = `<link rel="alternate" hreflang="id" href="https://freekoreanschool.com/culture/id/${slug}">`;
  if (patchFile(path.join(ROOT, 'culture', f), idLine)) { console.log(`✓ culture/${f}`); total++; }
}

// ── travel/*.html ────────────────────────────────────────────────────────────
const travelFiles = fs.readdirSync(path.join(ROOT, 'travel')).filter(f => f.endsWith('.html'));
for (const f of travelFiles) {
  const slug = f.replace('.html', '');
  const idLine = `<link rel="alternate" hreflang="id" href="https://freekoreanschool.com/travel/id/${slug}">`;
  if (patchFile(path.join(ROOT, 'travel', f), idLine)) { console.log(`✓ travel/${f}`); total++; }
}

// ── news/*.html ──────────────────────────────────────────────────────────────
const newsFiles = fs.readdirSync(path.join(ROOT, 'news')).filter(f => f.endsWith('.html'));
for (const f of newsFiles) {
  const slug = f.replace('.html', '');
  const idHref = slug === 'index'
    ? 'https://freekoreanschool.com/news/id'
    : `https://freekoreanschool.com/news/id/${slug}`;
  const idLine = `<link rel="alternate" hreflang="id" href="${idHref}">`;
  if (patchFile(path.join(ROOT, 'news', f), idLine)) { console.log(`✓ news/${f}`); total++; }
}

// ── root *.html ────────────────────────────────────────────────────────────
const rootFiles = fs.readdirSync(ROOT).filter(f => f.endsWith('.html'));
for (const f of rootFiles) {
  const slug = f.replace('.html', '');
  const idHref = slug === 'index'
    ? 'https://freekoreanschool.com/id/'
    : `https://freekoreanschool.com/id/${slug}`;
  const idLine = `<link rel="alternate" hreflang="id" href="${idHref}">`;
  if (patchFile(path.join(ROOT, f), idLine)) { console.log(`✓ ${f}`); total++; }
}

console.log(`\n✓ Updated ${total} file(s)`);
