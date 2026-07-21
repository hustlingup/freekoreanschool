#!/usr/bin/env node
/**
 * verify-semantic-html.cjs
 *
 * Proves patch-semantic-html.cjs changed zero visible text.
 *
 *   node scripts/verify-semantic-html.cjs snapshot   # before patching
 *   node scripts/verify-semantic-html.cjs compare    # after patching
 *   node scripts/verify-semantic-html.cjs audit      # heading-hierarchy audit
 *
 * Snapshot is written to scripts/_text-snapshot.json (gitignored working file).
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SNAP = path.join(__dirname, '_text-snapshot.json');
const mode = process.argv[2] || 'compare';

function walk(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (e.isFile() && e.name.endsWith('.html')) acc.push(p);
  }
  return acc;
}

const ENT = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', '#39': "'", mdash: '—', ndash: '–' };

/** Normalized visible text: strip script/style/comments/tags, decode entities, collapse ws. */
function visibleText(html) {
  return html
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&([a-z]+|#\d+);/gi, (s, n) => (ENT[n.toLowerCase()] !== undefined ? ENT[n.toLowerCase()] : s))
    .replace(/\s+/g, ' ')
    .trim();
}

const files = [...walk(path.join(ROOT, 'culture')), ...walk(path.join(ROOT, 'travel'))].sort();

if (mode === 'snapshot') {
  const snap = {};
  for (const f of files) snap[path.relative(ROOT, f).replace(/\\/g, '/')] = visibleText(fs.readFileSync(f, 'utf8'));
  fs.writeFileSync(SNAP, JSON.stringify(snap), 'utf8');
  console.log(`snapshot: ${files.length} files -> ${path.relative(ROOT, SNAP)}`);
  process.exit(0);
}

if (mode === 'compare') {
  const snap = JSON.parse(fs.readFileSync(SNAP, 'utf8'));
  let diffs = 0, checked = 0;
  for (const f of files) {
    const rel = path.relative(ROOT, f).replace(/\\/g, '/');
    if (!(rel in snap)) { console.log(`NEW FILE (no baseline): ${rel}`); continue; }
    checked++;
    const now = visibleText(fs.readFileSync(f, 'utf8'));
    if (now !== snap[rel]) {
      diffs++;
      const a = snap[rel], b = now;
      let i = 0; while (i < a.length && i < b.length && a[i] === b[i]) i++;
      console.log(`\nTEXT DIFF: ${rel}  (len ${a.length} -> ${b.length}) at char ${i}`);
      console.log('  before: …' + JSON.stringify(a.slice(Math.max(0, i - 60), i + 80)));
      console.log('  after : …' + JSON.stringify(b.slice(Math.max(0, i - 60), i + 80)));
    }
  }
  console.log(`\ncompared ${checked} files — ${diffs} with differing visible text`);
  process.exit(diffs ? 1 : 0);
}

if (mode === 'audit') {
  const bad = [];
  const counts = [];
  for (const f of files) {
    const html = fs.readFileSync(f, 'utf8');
    const ms = html.search(/<main\b/i), me = html.lastIndexOf('</main>');
    if (ms === -1) continue;
    const main = html.slice(ms, me);
    const rel = path.relative(ROOT, f).replace(/\\/g, '/');

    const levels = [...main.matchAll(/<h([1-6])[\s>]/gi)].map((m) => +m[1]);
    const h1 = levels.filter((l) => l === 1).length;
    const problems = [];
    if (h1 !== 1) problems.push(`h1 count = ${h1}`);
    let prev = 0;
    levels.forEach((l, i) => {
      if (prev && l > prev + 1) problems.push(`skip h${prev}->h${l} at #${i}`);
      prev = l;
    });
    if (levels.length && levels[0] !== 1) problems.push(`first heading is h${levels[0]}`);

    counts.push({
      file: rel,
      h1, h2: levels.filter((l) => l === 2).length, h3: levels.filter((l) => l === 3).length,
      h4: levels.filter((l) => l === 4).length,
      p: (main.match(/<p[\s>]/gi) || []).length,
      ko: (main.match(/lang="ko"/g) || []).length,
    });
    if (problems.length) bad.push(`${rel}: ${problems.join('; ')}`);
  }
  console.log('=== hierarchy problems ===');
  console.log(bad.length ? bad.join('\n') : '(none)');
  console.log(`\n=== per-page counts (${counts.length} pages) ===`);
  for (const c of counts) console.log(`${c.file.padEnd(38)} h1=${c.h1} h2=${String(c.h2).padEnd(3)} h3=${String(c.h3).padEnd(3)} h4=${String(c.h4).padEnd(3)} p=${String(c.p).padEnd(4)} lang-ko=${c.ko}`);
  process.exit(bad.length ? 1 : 0);
}

console.error('usage: verify-semantic-html.cjs snapshot|compare|audit');
process.exit(2);
