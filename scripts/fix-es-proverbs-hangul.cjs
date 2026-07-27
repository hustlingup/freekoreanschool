#!/usr/bin/env node
/* ═══════════════════════════════════════════════════════════════════════
   fix-es-proverbs-hangul.cjs — restore the Hangul head in Spanish
   `rules_es` entries of learn/data/vocabulary-proverbs.json.

   Found by the 2026-07-26 Phase-A translation triage
   (docs/writing-typing/qa-triage-results.md). The Spanish word-breakdown
   rules replaced the Korean word being taught with its romanization:

       EN      낫다 = to be better
       es      natda = ser mejor          ← the Hangul is gone
       de/fr/vi/th/id/ja/zh-tw            낫다 = besser sein / …

   es is the ONLY locale that does this, in 35 of the 218 rule entries that
   carry Hangul. The app exists to teach the script, and the romanization is
   already shown separately by the lesson UI, so the Hangul head is restored
   from the English source while the Spanish gloss is kept verbatim.

   Deterministic and idempotent: an entry that already contains Hangul is
   left untouched, and an entry whose segment structure does not match the
   English is reported and skipped rather than guessed at.

     node scripts/fix-es-proverbs-hangul.cjs [--check]

   --check writes nothing and exits 1 if any entry still needs repair.
   Rerun scripts/gen-lesson-static.cjs afterwards.
═══════════════════════════════════════════════════════════════════════ */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const REL = 'learn/data/vocabulary-proverbs.json';
const CHECK = process.argv.includes('--check');

const hasHangul = s => /[가-힣]/.test(s || '');

/* Entries are one or more `head = gloss` segments joined by ` | ` or `; `.
   Take each head from English, each gloss from Spanish. */
const SPLIT = /(\s*\|\s*|;\s+)/;             // capturing → separators preserved

function repair(en, es) {
  const enParts = en.split(SPLIT);
  const esParts = es.split(SPLIT);
  if (enParts.length !== esParts.length) return null;   // structure differs — skip
  const out = [];
  for (let i = 0; i < enParts.length; i++) {
    if (i % 2) { out.push(esParts[i]); continue; }       // separator: keep Spanish spacing
    const enSeg = enParts[i], esSeg = esParts[i];
    const enEq = enSeg.indexOf('=');
    const esEq = esSeg.indexOf('=');
    if (enEq < 0 || esEq < 0) return null;               // not a `head = gloss` pair
    const head = enSeg.slice(0, enEq).trim();
    if (!hasHangul(head)) return null;                   // nothing to restore
    out.push(`${head} ${esSeg.slice(esEq).trim()}`);     // Hangul head + Spanish gloss
  }
  return out.join('');
}

const file = path.join(ROOT, REL);
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

let fixed = 0, skipped = 0, already = 0;
const skips = [];

(function walk(node, trail) {
  if (Array.isArray(node)) return node.forEach((el, i) => walk(el, `${trail}[${i}]`));
  if (!node || typeof node !== 'object') return;

  if (Array.isArray(node.rules) && Array.isArray(node.rules_es)) {
    node.rules.forEach((en, i) => {
      const es = node.rules_es[i];
      if (typeof en !== 'string' || typeof es !== 'string') return;
      if (!hasHangul(en)) return;              // English has no Hangul to restore
      if (hasHangul(es)) { already++; return; } // already correct — idempotent
      const next = repair(en, es);
      if (next == null) { skipped++; skips.push(`${trail}.rules[${i}]  EN: ${en}\n      ES: ${es}`); return; }
      node.rules_es[i] = next;
      fixed++;
    });
  }
  Object.entries(node).forEach(([k, v]) => {
    if (v && typeof v === 'object' && k !== 'rules' && k !== 'rules_es') walk(v, `${trail}.${k}`);
  });
})(data, '');

if (skips.length) {
  console.log('Skipped (structure did not match English — fix by hand):');
  skips.forEach(s => console.log('  ' + s));
}

if (CHECK) {
  console.log(`${already} already correct, ${fixed} need repair, ${skipped} unmappable`);
  process.exit(fixed || skipped ? 1 : 0);
}

if (fixed) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
  console.log(`Restored Hangul in ${fixed} rules_es entr${fixed === 1 ? 'y' : 'ies'} → ${REL}`);
  console.log('Now run: node scripts/gen-lesson-static.cjs');
} else {
  console.log(`Nothing to do — ${already} entries already carry Hangul.`);
}
