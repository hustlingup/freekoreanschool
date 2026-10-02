#!/usr/bin/env node
/* Apply translations to prose nodes that also contain Hangul glosses.
 * Corrections: [{ en, value }]. Unlike apply-content-translations.cjs this
 * permits Hangul, but requires its exact character multiset to survive. */
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const lang = process.argv[2], file = process.argv[3];
if (!lang || !file) throw new Error('usage: node scripts/apply-mixed-content-translations.cjs <lang> <corrections.json>');
const corrections = JSON.parse(fs.readFileSync(path.resolve(file), 'utf8'));
const han = s => [...s].filter(c => /[\uAC00-\uD7A3]/.test(c)).sort().join('');
const enc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const map = new Map();
for (const { en, value } of corrections) {
  if (!en || !value || !han(en)) throw new Error('Each correction needs nonempty en/value and a Hangul gloss');
  if (han(en) !== han(value)) throw new Error(`Hangul changed in correction: ${en.slice(0, 70)}`);
  map.set(en, value);
}
let hits = 0;
const matched = new Set();
for (const section of ['culture', 'travel']) {
  const dir = path.join(ROOT, section, lang);
  if (!fs.existsSync(dir)) continue;
  for (const name of fs.readdirSync(dir).filter(n => n.endsWith('.html'))) {
    const abs = path.join(dir, name), src = fs.readFileSync(abs, 'utf8');
    const masked = src.replace(/<(head|script|style)\b[\s\S]*?<\/\1>/gi, m => ' '.repeat(m.length));
    let count = 0;
    let out = '', last = 0;
    for (const m of masked.matchAll(/>([^<>]+)</g)) {
      const value = map.get(m[1].trim());
      if (!value) continue;
      matched.add(m[1].trim());
      const start = m.index + 1, end = start + m[1].length;
      const leading = (m[1].match(/^\s*/) || [''])[0];
      const trailing = (m[1].match(/\s*$/) || [''])[0];
      out += src.slice(last, start) + leading + enc(value) + trailing;
      last = end;
      count++;
    }
    if (count) out += src.slice(last);
    if (count) { fs.writeFileSync(abs, out, 'utf8'); hits += count; console.log(`${section}/${lang}/${name}: ${count}`); }
  }
}
const unmatched = [...map.keys()].filter(key => !matched.has(key));
console.log(`Applied ${hits} mixed-content translation(s) for ${lang}; ${unmatched.length} correction(s) unmatched.`);
if (unmatched.length) unmatched.slice(0, 5).forEach(key => console.log(`  unmatched: ${key.slice(0, 100)}`));
