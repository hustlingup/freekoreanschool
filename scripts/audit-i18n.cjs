#!/usr/bin/env node
/* ═══════════════════════════════════════════════════════════════════════
   audit-i18n.cjs — one gate for every localization invariant.

   There is no CI in this repo (.github was removed with the news section),
   so this is a manual pre-deploy check. Run it after touching learn/data/*,
   js/langs/*, or any localized HTML.

     node scripts/audit-i18n.cjs          # report
     node scripts/audit-i18n.cjs --check  # exit 1 if any invariant fails

   WHY THIS EXISTS. Every localization defect found on 2026-07-26 was
   invisible to the tooling that was supposed to find it, and in each case
   the measurement — not the translation — was the bug:

     • qa-translations.cjs detected translatable fields by looking for a
       `_th` sibling, so anything missing in THAI was unmeasurable in every
       language. 219 untranslated strings reported as "0 gaps".
     • the word-bank coverage note counted title/body/meaning and called it
       "title/body/tip/meaning". The 210 missing `tip` strings were real.
     • the noindex gate asserted a stale snapshot instead of measuring, and
       would have re-noindexed 15 fully-translated pages.
     • js/langs/*.js was never audited by anything at all. Thai was missing
       68% of the site chrome while its lesson content scored 4/5.

   So the rule this file encodes: A CHECK THAT CANNOT SEE A CLASS OF DEFECT
   IS WORSE THAN NO CHECK, because it reports success. Each check below
   states what it can and cannot see.
═══════════════════════════════════════════════════════════════════════ */
'use strict';
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const CHECK = process.argv.includes('--check');
const results = [];

const record = (name, ok, detail) => {
  results.push({ name, ok, detail });
  console.log(`${ok ? '  PASS' : '  FAIL'}  ${name}${detail ? ' — ' + detail : ''}`);
};

function runScript(label, file, args) {
  try {
    execFileSync(process.execPath, [path.join(__dirname, file), ...args],
      { cwd: ROOT, stdio: 'pipe' });
    record(label, true);
  } catch (e) {
    const out = ((e.stdout || '') + (e.stderr || '')).toString().trim().split('\n').pop();
    record(label, false, out.slice(0, 120));
  }
}

console.log('i18n invariants\n');

/* 1. lesson-content coverage — every localizable unit populated in all 8.
      Sees: any field with at least one locale sibling (qa-lang.cjs walker).
      Cannot see: a field with NO locale sibling anywhere — nothing marks it
      as translatable, so it is indistinguishable from English-only content. */
{
  const { execFileSync: run } = require('child_process');
  const out = run(process.execPath, [path.join(__dirname, 'qa-lang.cjs'), '--status'],
    { cwd: ROOT, encoding: 'utf8' });
  const last = out.trim().split('\n').pop();
  const nums = (last.match(/\d+/g) || []).map(Number).slice(1);   // drop the unit total
  const gaps = nums.reduce((a, b) => a + b, 0);
  record('lesson coverage (2015 units x 8 locales)', gaps === 0,
    gaps ? `${gaps} gap(s): ${last.trim()}` : 'no gaps');
}

/* 2. UI language packs at parity with the de baseline.
      Sees: keys present in de but absent elsewhere.
      Cannot see: a chrome string that is in NO pack — it never reaches
      LangManager, so it renders in English everywhere and looks intentional. */
{
  const { dictOf } = require('./ui-lang.cjs');
  const base = Object.keys(dictOf('de'));
  const bad = [];
  ['ja', 'zh-tw', 'es', 'de', 'fr', 'vi', 'th', 'id'].forEach(l => {
    const d = dictOf(l);
    const missing = base.filter(k => !(k in d)).length;
    if (missing) bad.push(`${l}:${missing}`);
  });
  record('UI pack parity (631-key baseline)', bad.length === 0,
    bad.length ? 'missing ' + bad.join(', ') : 'all 8 complete');
}

/* 3. every language pack still parses and registers.
      A pack is a plain JS dict: one bad append kills the whole locale. */
{
  const { dictOf } = require('./ui-lang.cjs');
  const broken = [];
  ['ja', 'zh-tw', 'es', 'de', 'fr', 'vi', 'th', 'id'].forEach(l => {
    try { if (!Object.keys(dictOf(l)).length) broken.push(l + ' (empty)'); }
    catch (e) { broken.push(l + ' (' + e.message.slice(0, 40) + ')'); }
  });
  record('language packs parse + register', broken.length === 0, broken.join(', '));
}

/* 4. Korean text purity.
      Sees: a CJK/kana character fused between two Hangul syllables inside
      text that is DECLARED Korean (lang="ko" nodes, *_kr fields) — the
      세界가 / 발現합니다 corruption class.
      Cannot see, deliberately: mixed script anywhere else. ja/zh-tw prose
      quoting two Korean tokens ("다と신") and Hanja glosses ("한방(韓方)") are
      correct; an unscoped version of this check flags 178 of those and is
      therefore useless. */
{
  const FUSED = /[가-힣][一-鿿぀-ヿ]+[가-힣]/;
  const hits = [];
  const scanHtml = f => {
    const s = fs.readFileSync(f, 'utf8');
    const re = /<[^>]*lang=["']ko["'][^>]*>([^<]+)</g;
    let m;
    while ((m = re.exec(s))) if (FUSED.test(m[1])) hits.push(path.relative(ROOT, f) + ' → ' + m[1].match(FUSED)[0]);
  };
  const walk = d => {
    if (!fs.existsSync(d)) return;
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) { if (!/node_modules|\.git|_trans/.test(p)) walk(p); }
      else if (e.name.endsWith('.html')) scanHtml(p);
    }
  };
  ['culture', 'travel', 'learn'].forEach(d => walk(path.join(ROOT, d)));

  const KO_FIELD = /(^|_)(kr|ko)$/;
  fs.readdirSync(path.join(ROOT, 'learn', 'data')).filter(n => n.endsWith('.json')).forEach(n => {
    const j = JSON.parse(fs.readFileSync(path.join(ROOT, 'learn', 'data', n), 'utf8'));
    (function w(o, key) {
      if (Array.isArray(o)) return o.forEach(e => w(e, key));
      if (o && typeof o === 'object') return Object.entries(o).forEach(([k, v]) => w(v, k));
      if (typeof o === 'string' && KO_FIELD.test(key || '') && FUSED.test(o)) hits.push(n + ' → ' + o.match(FUSED)[0]);
    })(j, null);
  });
  record('Korean text purity (declared-Korean only)', hits.length === 0,
    hits.length ? `${hits.length}: ${hits[0]}` : 'no Hangul-CJK fusions');
}

/* 5. culture/ + travel/ prose actually localized.
      Sees: sentence-length nodes byte-identical to the English source page,
      with romanization classes and locale-swap pairs excluded.
      Cannot see: prose that was translated BADLY — this is a coverage
      measure, not a quality one. It also cannot see a page with no English
      counterpart to compare against. */
{
  const { execFileSync: run } = require('child_process');
  const out = run(process.execPath, [path.join(__dirname, 'audit-content-locale-dup.cjs'), '--json'],
    { cwd: ROOT, encoding: 'utf8', maxBuffer: 1 << 26 });
  const rows = JSON.parse(out);
  const bad = rows.filter(r => r.sentenceRatio >= 0.5);
  const leftover = rows.reduce((a, r) => a + r.sentenceDupChars, 0);
  record(`culture/travel prose localized (${rows.length} pages)`, bad.length === 0,
    bad.length ? `${bad.length} page(s) >=50% English`
               : leftover ? `no page >=50%; ${leftover} char(s) of leftover English remain`
                          : 'no leftover English');
}

/* 6. sidebar nav labels are localized, and do not repeat their icon.
      Reported by a human, not by any audit: the rail widget showed
      "라면 가이드" on non-Korean pages, because js/app.js clones sidebar-link
      innerHTML. The prose audits could never see it — they drop every node
      containing Hangul, on the correct principle that Korean is the subject
      being taught. That principle holds for lesson text and FAILS for
      navigation chrome, where Korean is an untranslated UI string.

      The icon check is here because the first fix for the above introduced
      "♨️ ♨️ Jjimjilbang" across 64 pages: ♨ is U+2668, outside the
      U+1F300–1FAFF range the label harvester was stripping. */
{
  const HANGUL_ONLY = /[가-힣]/;
  const OTHER_SCRIPT = /[A-Za-zÀ-ÿ฀-๿぀-ヿ一-鿿]/;
  const LINK = /<a[^>]*class="[^"]*sidebar-link[^"]*"[^>]*>([\s\S]*?)<\/a>/g;
  const ICON = /<span class="link-icon">([^<]*)<\/span>/;
  let korean = 0, doubled = 0;
  const walk = d => {
    if (!fs.existsSync(d)) return;
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) { walk(p); continue; }
      if (!e.name.endsWith('.html')) continue;
      const s = fs.readFileSync(p, 'utf8');
      let m; LINK.lastIndex = 0;
      while ((m = LINK.exec(s)) !== null) {
        const inner = m[1];
        const ic = ICON.exec(inner);
        const txt = inner.replace(/<[^>]+>/g, '')
          .replace(/[\u{1F000}-\u{1FAFF}\u{2190}-\u{21FF}\u{2300}-\u{27BF}\u{2B00}-\u{2BFF}\u{FE0F}\u{200D}]/gu, '')
          .trim();
        if (txt && HANGUL_ONLY.test(txt) && !OTHER_SCRIPT.test(txt)) korean++;
        if (ic && ic[1].trim()) {
          const after = inner.replace(ICON, '').replace(/<[^>]+>/g, '').trim();
          if (after.startsWith(ic[1].trim())) doubled++;
        }
      }
    }
  };
  ['culture', 'travel', 'learn'].forEach(d => walk(path.join(ROOT, d)));
  const bits = [];
  if (korean) bits.push(`${korean} Korean-only label(s)`);
  if (doubled) bits.push(`${doubled} label(s) repeat their icon`);
  record('sidebar nav labels localized', korean === 0 && doubled === 0,
    bits.length ? bits.join('; ') : 'all localized, no duplicated icons');
}

/* 7–9. delegate to the scripts that own these invariants. */
runScript('locale number formatting', 'fix-locale-number-format.cjs', ['--check']);
runScript('word-bank noindex gate', 'noindex-untranslated-vocab.cjs', ['--check']);
runScript('es proverbs keep Hangul', 'fix-es-proverbs-hangul.cjs', ['--check']);

/* ── the one mirror rule the whole site follows ──────────────────────────
   index.html → <loc>/index.html;  <section>/<rest> → <section>/<loc>/<rest>.
   searchResolveUrl() in js/app.js implements the same rule at runtime; the
   two are deliberately independent so a change to one is caught by the other,
   but they must agree. */
const LOCALES = ['zh-tw', 'ja', 'es', 'fr', 'de', 'vi', 'th', 'id'];
const mirrorPath = (p, loc) =>
  p.includes('/') ? p.replace(/^([^/]+)\//, '$1/' + loc + '/') : loc + '/' + p;

/* 9. every English page has all 8 locale mirrors.
      Sees: a missing mirror file for any page at the site root or directly
      under learn/, culture/, travel/.
      WHY: this is the invariant that makes `<html lang>`-authoritative
      rendering safe (docs/i18n-locale-leak.md, step 1). Before that fix an
      English URL rendered a Thai/English hybrid for a reader whose stored
      language was Thai; now it renders English, which is only the right
      answer because a real Thai mirror exists to send them to instead. Delete
      a mirror and honoring the declared language strands that reader.
      Cannot see: a mirror that exists but was never translated (check 5's
      job), or a section not listed here — add new sections to SECTIONS. */
{
  const SECTIONS = ['learn', 'culture', 'travel'];
  const htmlIn = d => fs.readdirSync(d, { withFileTypes: true })
    .filter(e => e.isFile() && e.name.endsWith('.html')).map(e => e.name);

  const pages = htmlIn(ROOT);
  SECTIONS.forEach(sec => htmlIn(path.join(ROOT, sec)).forEach(n => pages.push(sec + '/' + n)));

  const missing = [];
  pages.forEach(p => LOCALES.forEach(loc => {
    const m = mirrorPath(p, loc);
    if (!fs.existsSync(path.join(ROOT, m))) missing.push(m);
  }));
  record(`English page mirrors (${pages.length} pages x ${LOCALES.length} locales)`,
    missing.length === 0,
    missing.length ? `${missing.length} missing: ${missing.slice(0, 3).join(', ')}`
                   : `all ${pages.length * LOCALES.length} mirrors present`);
}

/* 10. every static SEARCH_INDEX url resolves in English AND in all 8 locales.
      Sees: an index entry pointing at a file that does not exist, in any
      locale. searchResolveUrl() rewrites every result url into the reader's
      locale (docs/i18n-locale-leak.md, step 2), so an index entry whose
      mirror is missing is now a 404 for that locale rather than a page in the
      wrong language — a louder failure, and this check is what keeps it from
      shipping. If a mirror genuinely cannot exist, list it in
      SEARCH_MIRROR_MISSING in js/app.js and add it to EXEMPT below.
      Cannot see: whether the localized page is actually about the thing the
      entry claims, and nothing here measures the result TITLES, which are
      still English in every locale (step 3 of the doc, not done). */
{
  const EXEMPT = {};   // 'travel/planner.html': ['th'] — must match js/app.js
  const src = fs.readFileSync(path.join(ROOT, 'js', 'app.js'), 'utf8');
  const HEAD = 'window.SEARCH_INDEX = ';
  const start = src.indexOf(HEAD + '[');
  const end = start === -1 ? -1 : src.indexOf('\n];', start);

  if (start === -1 || end === -1) {
    record('search index urls resolve in all locales', false,
      'could not locate window.SEARCH_INDEX in js/app.js');
  } else {
    let entries = null, err = '';
    try { entries = eval('(' + src.slice(start + HEAD.length, end + 2) + ')'); }
    catch (e) { err = e.message.slice(0, 60); }

    if (!Array.isArray(entries)) {
      record('search index urls resolve in all locales', false,
        'SEARCH_INDEX did not parse as an array: ' + err);
    } else {
      const bad = [];
      entries.forEach(e => {
        const p = String(e.url || '').split(/[?#]/)[0];
        if (!p) { bad.push('(empty url)'); return; }
        if (!fs.existsSync(path.join(ROOT, p))) { bad.push(p + ' [en]'); return; }
        LOCALES.forEach(loc => {
          if ((EXEMPT[p] || []).includes(loc)) return;
          const m = mirrorPath(p, loc);
          if (!fs.existsSync(path.join(ROOT, m))) bad.push(m);
        });
      });
      record(`search index urls resolve (${entries.length} entries x ${LOCALES.length + 1})`,
        bad.length === 0,
        bad.length ? `${bad.length} unresolvable: ${[...new Set(bad)].slice(0, 3).join(', ')}`
                   : `all ${entries.length * (LOCALES.length + 1)} targets exist`);
    }
  }
}

/* 13. the blind spot itself: a lesson field that NOTHING measures.
      qa-lang.cjs (check 1) decides a field is localizable by finding a locale
      sibling for it. That is circular: a field with no sibling anywhere is
      not "translated", it is invisible, and it measures as covered BECAUSE it
      is uncovered. Two real defects lived in exactly that hole:

        • typing.json key_intro/typing_drill title+instruction — 50 fields, no
          sibling in any of the 8 locales, so all 8 rendered English while
          --status reported 0 gaps.
        • syllable-blocks.json patterns_label_<lang> — a PARALLEL ARRAY on the
          parent step, with no un-suffixed `patterns_label` base to key off.
          6 locales were filled, th and vi were not, and nothing noticed.

      Two rules, because neither shape catches the other:

        A. corpus-calibrated. A base name that carries a locale sibling
           SOMEWHERE is provably translatable; flag every occurrence of it
           that has none. Self-extending — a new field enters the rule the
           moment it is translated once.
        B. per-object parity. Any `<base>_<lang>` key obliges all 8 langs on
           that same object, whether or not an un-suffixed base exists.

      Cannot see: a prose field whose name has never been translated anywhere
      AND which uses neither convention — nothing in the data marks it as
      text. A heuristic on "looks like English prose" was tried and is not
      usable here: it cannot tell "initial + vowel" from the deliberately
      language-neutral pattern codes CV / VC / CVC, so it reports both. */
{
  const LANGS = ['ja', 'zh_tw', 'es', 'fr', 'de', 'vi', 'th', 'id'];
  const SUFFIX = new RegExp('_(' + LANGS.join('|') + ')$');
  // Codes, not prose: "CV", "VC", "CVC" are the same in every language.
  const CODE = /^[A-Z]{1,4}$/;
  const dataDir = path.join(ROOT, 'learn', 'data');
  const files = fs.readdirSync(dataDir).filter(n => n.endsWith('.json') &&
    n !== 'manifest.json' && n !== 'search-words.json');

  // Only lessons the site actually serves. learn/data/vocabulary.json is
  // orphaned — vocabulary.html loads vocabulary-<cat>.json and nothing reads
  // it — so its untranslated fields are dead data, not a shipping defect.
  // Same manifest test gen-search-words.cjs uses.
  const live = new Set(JSON.parse(fs.readFileSync(path.join(dataDir, 'manifest.json'), 'utf8'))
    .lessons.map(l => l.id));
  const skipped = [];

  const objects = [];
  for (const f of files) {
    const j = JSON.parse(fs.readFileSync(path.join(dataDir, f), 'utf8'));
    if (j.lesson && !live.has(j.lesson)) { skipped.push(f); continue; }
    (function walk(o) {
      if (Array.isArray(o)) return o.forEach(walk);
      if (!o || typeof o !== 'object') return;
      objects.push({ f, o });
      Object.values(o).forEach(walk);
    })(j);
  }

  // rule A — base names proven translatable somewhere in the corpus
  const known = new Set();
  for (const { o } of objects) {
    for (const k of Object.keys(o)) {
      if (!SUFFIX.test(k)) continue;
      const base = k.replace(SUFFIX, '');
      if (base in o) known.add(base);
    }
  }

  const gapsA = [], gapsB = [], orphans = [];
  for (const { f, o } of objects) {
    const where = `${f}:${o.type || 'obj'}`;

    for (const base of known) {
      const v = o[base];
      const filled = typeof v === 'string' ? v.trim() && !CODE.test(v.trim())
                   : v && typeof v === 'object' && !Array.isArray(v) && (v.text || v.label);
      if (!filled) continue;
      if (LANGS.some(l => o[`${base}_${l}`] !== undefined)) continue;
      gapsA.push(`${where}.${base}`);
    }

    const bases = new Set();
    for (const k of Object.keys(o)) if (SUFFIX.test(k)) bases.add(k.replace(SUFFIX, ''));
    for (const base of bases) {
      const present = LANGS.filter(l => o[`${base}_${l}`] !== undefined);
      if (present.length === LANGS.length) continue;
      // A single locale with no English base is an ORPHAN, not a gap: some
      // locale carries content the source language never had. Real (vi has a
      // gloss the other seven do not), but the opposite of English leaking
      // through, and not something to block a deploy on. Counted and shown.
      if (!(base in o) && present.length < 2) { orphans.push(`${where}.${base} [${present}]`); continue; }
      gapsB.push(`${where}.${base} [missing ${LANGS.filter(l => o[`${base}_${l}`] === undefined).join(',')}]`);
    }
  }

  const bits = [];
  if (gapsA.length) bits.push(`${gapsA.length} field(s) with no locale sibling at all: ${[...new Set(gapsA)].slice(0, 3).join(', ')}`);
  if (gapsB.length) bits.push(`${gapsB.length} field(s) missing some locales: ${[...new Set(gapsB)].slice(0, 3).join(', ')}`);
  if (!bits.length) bits.push('every localizable field has all 8 locales');
  if (orphans.length) bits.push(`${orphans.length} orphan single-locale field(s) (not a failure): ${orphans[0]}`);
  if (skipped.length) bits.push(`skipped ${skipped.length} lesson file(s) absent from manifest: ${skipped.join(', ')}`);
  record(`lesson fields measurable at all (${objects.length} objects, ${known.size} known field names)`,
    gapsA.length === 0 && gapsB.length === 0, bits.join('; '));
}

/* 8. lesson JSON parses. */
{
  const bad = [];
  fs.readdirSync(path.join(ROOT, 'learn', 'data')).filter(n => n.endsWith('.json')).forEach(n => {
    try { JSON.parse(fs.readFileSync(path.join(ROOT, 'learn', 'data', n), 'utf8')); }
    catch (e) { bad.push(n); }
  });
  record('lesson JSON parses', bad.length === 0, bad.join(', '));
}

const failed = results.filter(r => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} invariants hold.`);
if (failed.length) console.log('failing: ' + failed.map(r => r.name).join('; '));
if (CHECK) process.exit(failed.length ? 1 : 0);
