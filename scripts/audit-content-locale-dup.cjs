#!/usr/bin/env node
/**
 * audit-content-locale-dup.cjs — how much of each culture/<locale>/*.html and
 * travel/<locale>/*.html is still byte-identical English copied from the
 * English source page.
 *
 *   node scripts/audit-content-locale-dup.cjs            # ranked table
 *   node scripts/audit-content-locale-dup.cjs --json
 *   node scripts/audit-content-locale-dup.cjs --show culture/de/kpop.html
 *
 * learn/ is covered by audit-learn-locale-dup.cjs. This is the same method
 * for the 160 culture/travel pages, which nothing measured before — the
 * 2026-07-26 triage rated 3 pages per locale (24 of 180) by eye and nothing
 * else had ever looked.
 *
 * ⚠️ THE EXCLUSION LIST IS NOT THE SAME AS learn/'s, AND COPYING IT VERBATIM
 * WOULD GIVE A FALSE ANSWER. These pages carry ~8,300 romanization nodes
 * under class names that appear nowhere in learn/:
 *
 *     rom-text (2454)  food-card-rom (1737)  phrase-rom (1305)
 *     rom-cell (1101)  sodam-rom-text (648)  dialogue-rom (459)
 *     bap-rom, lang-mini-rom, chant-line-rom, chant-rom, skincare-rom
 *
 * Revised-Romanization of Korean is SUPPOSED to be identical in every locale.
 * Counting it as untranslated English is the exact error that produced two
 * wrong "everything is translated" verdicts historically, just with the sign
 * flipped — here it would report translated pages as untranslated.
 *
 * The pattern is deliberately anchored on token boundaries: `travel-promo-*`
 * contains the letters "rom" and is real prose. A naive /rom/ substring test
 * silently deletes seven classes of genuine content from the measurement.
 *
 * Also excluded: the `en-only` / `ja-only` / `ja-block` / `no-ja` locale-swap
 * pairs. The page ships several locales' copy and CSS reveals one; counting
 * the hidden English as untranslated is a false positive.
 *
 * `sentenceRatio` — duplication restricted to nodes >= 30 chars — is the
 * load-bearing number. Short strings (brand names, "OK", nav verbs) are
 * legitimately shared; whole shared sentences are not.
 *
 * Read-only. Writes nothing.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SECTIONS = ['culture', 'travel'];
const LOCALES = ['ja', 'zh-tw', 'es', 'de', 'fr', 'vi', 'th', 'id'];
const { HANGUL, SENTENCE_MIN, proseNodes } = require('./_locale-prose.cjs');

function score(localeHtml, enHtml) {
  const en = new Set(proseNodes(enHtml));
  const nodes = proseNodes(localeHtml);
  let total = 0, dup = 0, sTotal = 0, sDup = 0;
  const examples = [];
  for (const s of nodes) {
    const isDup = en.has(s);
    total += s.length;
    if (isDup) dup += s.length;
    if (s.length >= SENTENCE_MIN) {
      sTotal += s.length;
      if (isDup) { sDup += s.length; if (examples.length < 5) examples.push(s.slice(0, 110)); }
    }
  }
  return {
    ratio: total ? dup / total : 0,
    sentenceRatio: sTotal ? sDup / sTotal : 0,
    nodes: nodes.length, chars: total, dupChars: dup,
    sentenceChars: sTotal, sentenceDupChars: sDup, examples,
  };
}

const rows = [];
for (const section of SECTIONS) {
  for (const loc of LOCALES) {
    const dir = path.join(ROOT, section, loc);
    if (!fs.existsSync(dir)) continue;
    for (const f of fs.readdirSync(dir).filter(x => x.endsWith('.html'))) {
      const src = path.join(ROOT, section, f);
      if (!fs.existsSync(src)) continue;
      const r = score(fs.readFileSync(path.join(dir, f), 'utf8'), fs.readFileSync(src, 'utf8'));
      rows.push({ page: `${section}/${loc}/${f}`, section, locale: loc, file: f, ...r });
    }
  }
}

const showIdx = process.argv.indexOf('--show');
if (showIdx !== -1) {
  const want = process.argv[showIdx + 1].replace(/\\/g, '/');
  const row = rows.find(r => r.page === want);
  if (!row) { console.error('no such page'); process.exit(1); }
  console.log(JSON.stringify(row, null, 2));
} else if (process.argv.includes('--json')) {
  console.log(JSON.stringify(rows, null, 2));
} else {
  rows.sort((a, b) => b.sentenceRatio - a.sentenceRatio || b.ratio - a.ratio);
  console.log(' sent  ratio  nodes  sentChars  page');
  console.log('-----  -----  -----  ---------  ------------------------------------');
  for (const r of rows) {
    const flag = r.sentenceRatio >= 0.5 ? '  <<<' : r.sentenceRatio >= 0.2 ? '  <' : '';
    console.log(`${r.sentenceRatio.toFixed(3)}  ${r.ratio.toFixed(3)}  ` +
      `${String(r.nodes).padStart(5)}  ${String(r.sentenceChars).padStart(9)}  ${r.page}${flag}`);
  }
  const bad = rows.filter(r => r.sentenceRatio >= 0.5);
  const warn = rows.filter(r => r.sentenceRatio >= 0.2 && r.sentenceRatio < 0.5);
  console.log(`\n${bad.length} of ${rows.length} pages have >=50% of their sentence-length prose still verbatim English.`);
  console.log(`${warn.length} more are between 20% and 50%.`);
}
