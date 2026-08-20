#!/usr/bin/env node
/**
 * apply-content-translations.cjs — write translated prose back into
 * culture/<locale>/*.html and travel/<locale>/*.html.
 *
 *   node scripts/apply-content-translations.cjs <lang> <corrections.json>
 *   node scripts/apply-content-translations.cjs <lang> <file> --dry
 *
 * corrections.json is [{en, value}] as returned by content-fill.workflow.js.
 *
 * Matching: a text node is replaced when its WHITESPACE-NORMALIZED content
 * equals `en` exactly. Extraction normalized runs of whitespace, so a raw
 * indexOf on the file would miss any paragraph wrapped across lines. The
 * replacement is written into the original span, so surrounding markup and
 * indentation are untouched.
 *
 * Safety rails, in order of how badly each would hurt:
 *   • ONLY files under <section>/<lang>/ are opened. The English source pages
 *     at <section>/*.html are never candidates — patching those would destroy
 *     the source of truth every locale is compared against.
 *   • Nodes inside excluded elements (romanization, locale-swap pairs) are
 *     skipped, matching the audit's rules. Those are supposed to be identical.
 *   • Nodes containing Hangul are skipped.
 *   • Idempotent: once a node is translated it no longer matches `en`, so a
 *     second run is a no-op rather than a double substitution.
 *   • <script>/<style>/<head> are masked out before matching.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SECTIONS = ['culture', 'travel'];
const DRY = process.argv.includes('--dry');

const { HANGUL, norm, prepare } = require('./_locale-prose.cjs');

const encode = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const lang = process.argv[2];
const file = process.argv[3];
if (!lang || !file) {
  console.log('usage: node scripts/apply-content-translations.cjs <lang> <corrections.json> [--dry]');
  process.exit(1);
}
const corrections = JSON.parse(fs.readFileSync(path.resolve(file), 'utf8'));
const map = new Map();
corrections.forEach(({ en, value }) => {
  if (typeof en !== 'string' || typeof value !== 'string' || !value.trim()) return;
  if (norm(value) === norm(en)) return;                 // unchanged — nothing to write
  map.set(norm(en), value);
});
if (!map.size) { console.log('no usable corrections'); process.exit(0); }


let filesChanged = 0, totalHits = 0;
const unmatched = new Set(map.keys());

// A locale with no directory in EITHER section means every correction below
// is guaranteed to end up in `unmatched` for a reason that has nothing to do
// with matching quality — say so up front rather than letting it surface
// only as an opaque "N correction(s) matched nothing" at the end.
if (!SECTIONS.some(s => fs.existsSync(path.join(ROOT, s, lang)))) {
  console.log(`NOT PRESENT: neither culture/${lang}/ nor travel/${lang}/ exists on disk — 0% of this locale has been scaffolded yet, nothing to patch.`);
}

for (const section of SECTIONS) {
  const dir = path.join(ROOT, section, lang);
  if (!fs.existsSync(dir)) continue;
  for (const name of fs.readdirSync(dir).filter(n => n.endsWith('.html'))) {
    const abs = path.join(dir, name);
    const src = fs.readFileSync(abs, 'utf8');
    const masked = prepare(src, true);

    let hits = 0;
    let out = '';
    let last = 0;
    const re = />([^<]+)</g;
    let m;
    while ((m = re.exec(masked)) !== null) {
      const raw = src.slice(m.index + 1, m.index + 1 + m[1].length);
      const key = norm(raw);
      if (!key || HANGUL.test(key)) continue;
      const value = map.get(key);
      if (!value) continue;
      out += src.slice(last, m.index + 1) + encode(value);
      last = m.index + 1 + m[1].length;
      hits++;
      unmatched.delete(key);
    }
    if (!hits) continue;
    out += src.slice(last);
    totalHits += hits;
    filesChanged++;
    console.log(`  ${DRY ? '[dry] ' : ''}${section}/${lang}/${name}: ${hits} paragraph(s)`);
    if (!DRY) fs.writeFileSync(abs, out, 'utf8');
  }
}

console.log(`\n${DRY ? 'would replace' : 'replaced'} ${totalHits} node(s) in ${filesChanged} file(s) for ${lang}.`);
if (unmatched.size) {
  console.log(`${unmatched.size} correction(s) matched nothing (already translated, or text changed):`);
  [...unmatched].slice(0, 5).forEach(k => console.log('   • ' + k.slice(0, 90)));
}
