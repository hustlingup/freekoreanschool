// ══════════════════════════════════════════════════════════════════════════
// audit-content-translation.cjs — progress tracker + validator for Phase 2
// translation of culture/<lang>/, travel/<lang>/, news/<lang>/ pages.
//
//   node scripts/audit-content-translation.cjs <lang>            → per-page summary
//   node scripts/audit-content-translation.cjs <lang> <sec/page> → list untranslated
//       e.g. node scripts/audit-content-translation.cjs vi culture/kpop
//
// Method: a text node in the generated <lang> page is "untranslated English"
// when it appears VERBATIM in the clean English source AND is NOT kept as-is in
// the fully-localized Spanish reference (es/). That precisely separates real
// prose (es translated it → you must too) from brand/proper-noun terms that
// every language keeps in English (present in es/ verbatim → leave it).
// ══════════════════════════════════════════════════════════════════════════
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const lang = process.argv[2];
const only = process.argv[3]; // optional "section/page"
if (!lang) { console.error('usage: node scripts/audit-content-translation.cjs <lang> [section/page]'); process.exit(1); }

const SECTIONS = ['culture', 'travel', 'news'];

function nodes(file) {
  if (!fs.existsSync(file)) return null;
  let h = fs.readFileSync(file, 'utf8').replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, '');
  const set = new Set();
  for (const m of h.matchAll(/>([^<>]+)</g)) {
    const n = m[1].replace(/\s+/g, ' ').trim();
    if (n) set.add(n);
  }
  return set;
}

const DEC = { '&amp;': '&', '&#39;': "'", '&quot;': '"', '&lt;': '<', '&gt;': '>', '&nbsp;': ' ' };
const decode = s => s.replace(/&amp;|&#39;|&quot;|&lt;|&gt;|&nbsp;/g, m => DEC[m]);

// translatable prose: after decoding entities, has real Latin text (≥3 letters).
// Entity decode avoids the "&amp;"→"amp" false positive on pure-Korean labels.
function isProse(n) {
  const d = decode(n);
  return (d.match(/[A-Za-z]/g) || []).length >= 3;
}

let grandPending = 0, grandPages = 0;
for (const section of SECTIONS) {
  const srcDir = path.join(ROOT, section);
  if (!fs.existsSync(srcDir)) continue;
  for (const file of fs.readdirSync(srcDir)) {
    if (!file.endsWith('.html')) continue;
    const page = file.replace(/\.html$/, '');
    if (only && only !== `${section}/${page}`) continue;

    const en = nodes(path.join(srcDir, file));
    const es = nodes(path.join(srcDir, 'es', file)) || new Set();
    const tgt = nodes(path.join(srcDir, lang, file));
    if (!tgt) continue;

    const pending = [];
    for (const n of tgt) {
      if (!isProse(n)) continue;
      if (!en.has(n)) continue;      // not verbatim English → already translated
      if (es.has(n)) continue;       // es keeps it too → brand/proper noun, leave as-is
      pending.push(n);
    }
    grandPages++;
    if (pending.length) grandPending += pending.length;

    if (only) {
      console.log(`\n${section}/${lang}/${page}.html — ${pending.length} untranslated prose nodes:\n`);
      pending.forEach(p => console.log('  • ' + p));
    } else {
      const mark = pending.length === 0 ? '✅ DONE ' : '⏳ ' + String(pending.length).padStart(3) + ' left';
      console.log(`  ${mark}  ${section}/${lang}/${page}.html`);
    }
  }
}
if (!only) console.log(`\n${lang}: ${grandPending} untranslated prose nodes remaining across ${grandPages} pages` +
  (grandPending === 0 ? '  ✅ ALL DONE' : ''));
