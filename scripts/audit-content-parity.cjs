// ══════════════════════════════════════════════════════════════════════════
// audit-content-parity.cjs — Phase 3 tracker: detects language mirror pages
// whose CONTENT STRUCTURE is behind the English source (missing sections /
// cards), independent of translation state. Complements
// audit-content-translation.cjs (which only checks prose language, and cannot
// audit es/ because es/ is its own reference).
//
//   node scripts/audit-content-parity.cjs                     → all langs, all pages (summary)
//   node scripts/audit-content-parity.cjs <lang>              → one lang (summary)
//   node scripts/audit-content-parity.cjs <lang> <sec/page>   → per-anchor detail
//       e.g. node scripts/audit-content-parity.cjs es culture/kdrama
//
// Method, per page vs the English source, using the <main>…</main> region:
//   1. <div> count — a stale page has far fewer (structure = styled divs here).
//   2. id="…" anchors — missing anchors = whole sections absent.
//   3. per-anchor <div> deltas — pinpoints WHICH section is short.
//   4. untranslated-prose estimate: text nodes verbatim in the English source,
//      with ≥3 latin letters, not kept in the reference mirror (ja/, or zh-tw/
//      when auditing ja) — works for es/ too, unlike the Phase-2 audit tool.
//
// Verdict: ✅ in-sync (Δdiv ≤2% and no missing anchors), ⚠️ partial (Δdiv ≤40%),
// 🚨 STALE (Δdiv >40% — old standalone page, regenerate rather than patch).
// ══════════════════════════════════════════════════════════════════════════
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const REG = require('./_locales.cjs');
const argLang = process.argv[2];
const only = process.argv[3]; // optional "section/page"

if (argLang && (!REG.get(argLang) || argLang === 'en')) {
  throw new Error(`unknown locale "${argLang}" — not in scripts/_locales.cjs`);
}
// LANGS comes from the registry so a locale added there is audited here
// automatically. Default scope is the live 8; pass a code explicitly
// (including a 'planned' one) to audit a single locale on its own — this is
// the fresh-locale path, and it must report honestly rather than pretend a
// locale with zero pages is "in sync" (see the pages===0 branch below).
const LANGS = argLang ? [argLang] : REG.liveDirs();
// 'news' was the deleted news/ section (removed 2026-07-21, see CLAUDE.md) —
// there is no news/ directory on disk any more. Do not reintroduce it. This
// is unrelated to the "News & Society" VOCABULARY topic
// (learn/data/vocabulary-news.json), which is real content and untouched.
const SECTIONS = ['culture', 'travel'];

const DEC = { '&amp;': '&', '&#39;': "'", '&quot;': '"', '&lt;': '<', '&gt;': '>', '&nbsp;': ' ' };
const decode = s => s.replace(/&amp;|&#39;|&quot;|&lt;|&gt;|&nbsp;/g, m => DEC[m]);
const isProse = n => (decode(n).match(/[A-Za-z]/g) || []).length >= 3;

function mainRegion(file) {
  if (!fs.existsSync(file)) return null;
  const h = fs.readFileSync(file, 'utf8');
  const a = h.indexOf('<main');
  const b = h.indexOf('</main>');
  return a >= 0 && b > a ? h.slice(a, b) : h;
}
const divs = m => (m.match(/<div/g) || []).length;
function anchors(m) {
  // ordered [offset, id] pairs of id="…" anchors inside <main>
  const out = [];
  for (const x of m.matchAll(/ id="([a-zA-Z0-9_-]+)"/g)) out.push([x.index, x[1]]);
  return out;
}
function textNodes(m) {
  const set = new Set();
  const clean = m.replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, '');
  for (const x of clean.matchAll(/>([^<>]+)</g)) {
    const n = x[1].replace(/\s+/g, ' ').trim();
    if (n) set.add(n);
  }
  return set;
}
function perAnchorDivs(m) {
  const ids = anchors(m);
  ids.unshift([0, '(top)']);
  ids.push([m.length, 'END']);
  const out = {};
  for (let i = 0; i < ids.length - 1; i++)
    out[ids[i][1]] = (out[ids[i][1]] || 0) + divs(m.slice(ids[i][0], ids[i + 1][0]));
  return out;
}

for (const lang of LANGS) {
  const ref = lang === 'ja' ? 'zh-tw' : 'ja'; // kept-terms reference for prose check
  let flagged = 0, pages = 0, enPagesSeen = 0;
  const rows = [];
  for (const section of SECTIONS) {
    const srcDir = path.join(ROOT, section);
    if (!fs.existsSync(srcDir)) continue;
    for (const file of fs.readdirSync(srcDir)) {
      if (!file.endsWith('.html')) continue;
      const page = file.replace(/\.html$/, '');
      if (only && only !== `${section}/${page}`) continue;

      const en = mainRegion(path.join(srcDir, file));
      if (en) enPagesSeen++;
      const tgt = mainRegion(path.join(srcDir, lang, file));
      if (!en || !tgt) continue;
      pages++;

      const enDiv = divs(en), tgtDiv = divs(tgt);
      const delta = enDiv ? (enDiv - tgtDiv) / enDiv : 0;
      const enIds = new Set(anchors(en).map(a => a[1]));
      const tgtIds = new Set(anchors(tgt).map(a => a[1]));
      const missing = [...enIds].filter(i => !tgtIds.has(i));

      const refSet = textNodes(mainRegion(path.join(srcDir, ref, file)) || '');
      const enSet = textNodes(en);
      const pendingNodes = [];
      for (const n of textNodes(tgt))
        if (enSet.has(n) && isProse(n) && !refSet.has(n)) pendingNodes.push(n);
      const pending = pendingNodes.length;

      const verdict = (delta <= 0.02 && missing.length === 0) ? '✅'
        : (delta <= 0.40 ? '⚠️ partial' : '🚨 STALE');
      if (verdict !== '✅' || pending > 0) flagged++;
      rows.push({ key: `${section}/${lang}/${page}`, enDiv, tgtDiv, missing, pending, verdict });

      if (only) {
        console.log(`\n── per-anchor <div> counts: ${section}/${page} — en vs ${lang} ──`);
        const a = perAnchorDivs(en), b = perAnchorDivs(tgt);
        for (const k of new Set([...Object.keys(a), ...Object.keys(b)])) {
          const x = a[k] || 0, y = b[k] || 0;
          if (x !== y) console.log(`  ${k.padEnd(26)} en:${String(x).padStart(4)}  ${lang}:${String(y).padStart(4)}  ${y < x ? '← behind' : '(extra ok)'}`);
        }
        if (missing.length) console.log(`  MISSING anchors: ${missing.join(', ')}`);
        console.log(`  untranslated-prose estimate (vs ${ref}/ kept-terms): ${pending}`);
        for (const n of pendingNodes) console.log(`    · ${n.length > 110 ? n.slice(0, 110) + '…' : n}`);
      }
    }
  }
  if (!only) {
    console.log(`\n════ ${lang} (prose ref: ${ref}/) ════`);
    for (const r of rows) {
      const miss = r.missing.length ? `  missing:[${r.missing.join(',')}]` : '';
      const pend = r.pending ? `  en-prose:${r.pending}` : '';
      console.log(`${r.verdict.padEnd(10)} ${r.key.padEnd(34)} div ${String(r.tgtDiv).padStart(4)}/${String(r.enDiv).padStart(4)}${miss}${pend}`);
    }
    // A locale directory that does not exist yet produces pages===0 for every
    // section, which used to print "0/0 pages fully in sync & translated" —
    // read at a glance, that looks like a vacuous PASS. It is the opposite:
    // nothing was compared because there is nothing on disk to compare.
    if (pages === 0 && enPagesSeen > 0) {
      console.log(`${lang}: NOT PRESENT — 0 of ${enPagesSeen} English page(s) have a ${lang}/ counterpart on disk. 0% covered, not a pass.`);
    } else {
      console.log(`${lang}: ${pages - flagged}/${pages} pages fully in sync & translated`);
    }
  }
}
