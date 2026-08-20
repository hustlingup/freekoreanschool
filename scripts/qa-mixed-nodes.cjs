#!/usr/bin/env node
/*
 * qa-mixed-nodes.cjs — find English prose nodes that carry an inline Hangul gloss.
 *
 * WHY THIS EXISTS
 * ---------------
 * `audit-content-locale-dup.cjs` (via `_locale-prose.cjs`) excludes any text node
 * containing Hangul. That rule is correct and load-bearing: it protects the Korean
 * being taught and the romanization lines from being counted as "untranslated".
 *
 * But it also makes a whole class of English INVISIBLE — prose that happens to carry
 * a parenthetical Korean gloss:
 *
 *     "유리 피부 (glass skin) — skin so clear, smooth, and hydrated it appears translucent"
 *     "Collaboration between Paldo and Gonghwachun — Incheon's oldest ... premium instant 짜장면."
 *
 * A page can therefore report sentenceRatio 0.000 — "fully translated" — while still
 * serving dozens of English sentences. This is the SAME defect class as plan §9 bug 7
 * (`translate-learn-shell.cjs` under learn/), rediscovered under culture/ 2026-08-19.
 *
 * HOW IT DECIDES
 * --------------
 * A node is flagged when it contains Hangul AND >=2 English function words AND strictly
 * more English function words than Portuguese/Spanish-style ones. The comparative test is
 * what removes the false positives: a correctly translated node like
 * "As partes especiais do frango (특수부위) — coração (닭염통), moela (닭모래집)" scores
 * PT-heavy and is not flagged. Revised Romanization ("가다 (gada)") carries no function
 * words at all and is never flagged.
 *
 * Calibration 2026-08-19 against pt-br: every page independently confirmed complete
 * (index, kbbq, kchicken, mandu, kimchi, all 5 travel pages) scores exactly 0.
 *
 * READ-ONLY. Writes nothing. Exits 1 with --check if any node is flagged.
 *
 *   node scripts/qa-mixed-nodes.cjs <locale-dir>            # per-page counts
 *   node scripts/qa-mixed-nodes.cjs <locale-dir> --show <page>
 *   node scripts/qa-mixed-nodes.cjs <locale-dir> --check
 */
const fs = require('fs');
const path = require('path');

const HAN = /[\uAC00-\uD7A3]/;
const EN = /\b(the|and|with|that|from|this|which|their|between|through|while|about|into|over|when|where|have|has|been|were|are|was|its|but|not|your|more|most|than|also|both|each|such|these|those|other|only|very|used|uses|using|makes|made|comes|become|became|first|world|during|after|before|every|still|being|means|meaning|known|called)\b/gi;
const LOC = /\b(de|do|da|dos|das|em|no|na|nos|nas|para|com|uma|que|são|mais|seu|sua|pelo|pela|ao|aos|como|não|também|entre|onde|quando|foi|ser|está|estão|você|pode|cada|todo|toda|desde|até|sobre|ou|se|por|dan|dengan|yang|dari|untuk|adalah|ini|itu)\b/gi;

const args = process.argv.slice(2);
const locale = args.find(a => !a.startsWith('--'));
if (!locale) {
  console.error('usage: node scripts/qa-mixed-nodes.cjs <locale-dir> [--show <page>] [--check]');
  process.exit(2);
}
const showIdx = args.indexOf('--show');
const showPage = showIdx >= 0 ? args[showIdx + 1] : null;
const check = args.includes('--check');

const roots = ['culture/' + locale, 'travel/' + locale].filter(d => fs.existsSync(d));
if (!roots.length) {
  console.error('no culture/' + locale + ' or travel/' + locale + ' directory found');
  process.exit(2);
}

const per = {};
const detail = {};
let total = 0;

for (const r of roots) {
  for (const f of fs.readdirSync(r).filter(x => x.endsWith('.html'))) {
    const p = path.join(r, f).split(String.fromCharCode(92)).join('/');
    const lines = fs.readFileSync(p, 'utf8').split('\n');
    let n = 0;
    detail[p] = [];
    for (let i = 0; i < lines.length; i++) {
      let L = lines[i];
      if (/^\s*<(script|style|link|meta)/i.test(L)) continue;
      // a kr-trans paragraph is Korean by design — everything from it onward on this line is skipped
      L = L.split('<p class="kr-trans')[0];
      const nodes = L.split('<')
        .map(s => { const j = s.indexOf('>'); return j < 0 ? '' : s.slice(j + 1); })
        .map(s => s.replace(/&[a-z]+;/gi, ' ').trim())
        .filter(s => s.length >= 25);
      for (const nd of nodes) {
        if (!HAN.test(nd)) continue;
        const en = (nd.match(EN) || []).length;
        const loc = (nd.match(LOC) || []).length;
        if (en >= 2 && en > loc) { n++; detail[p].push({ line: i + 1, text: nd }); }
      }
    }
    if (n) { per[p] = n; total += n; }
  }
}

if (showPage) {
  const key = showPage.split(String.fromCharCode(92)).join('/');
  const rows = detail[key] || detail[Object.keys(detail).find(k => k.endsWith(key)) || ''] || [];
  if (!rows.length) console.log('no mixed EN+Hangul nodes in ' + showPage);
  for (const r of rows) console.log(String(r.line).padStart(5) + '  ' + r.text);
  process.exit(0);
}

const rows = Object.entries(per).sort((a, b) => b[1] - a[1]);
if (!rows.length) {
  console.log('nodes  page');
  console.log('-----  ----');
  console.log('(none) — no English prose is hiding behind a Hangul gloss in ' + locale);
} else {
  console.log('nodes  page');
  console.log('-----  ----');
  for (const [k, v] of rows) console.log(String(v).padStart(5) + '  ' + k);
}
console.log('\nTOTAL mixed EN+Hangul prose nodes: ' + total);
console.log('These are INVISIBLE to audit-content-locale-dup.cjs by design (Hangul nodes are excluded).');
if (check && total > 0) process.exit(1);
