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
const REG = require('./_locales.cjs');

const ROOT = path.resolve(__dirname, '..');
const CHECK = process.argv.includes('--check');
const results = [];

const record = (name, ok, detail) => {
  results.push({ name, ok, detail });
  console.log(`${ok ? '  PASS' : '  FAIL'}  ${name}${detail ? ' — ' + detail : ''}`);
};

/* SCOPE — which locales every per-locale check below covers. Default is the
   live 8 (byte-identical to the pre-registry hardcoded arrays this replaces).
   `--locales <codes>` overrides it, including with 'planned' locales — this
   is the fresh-locale honesty path: a locale with no directories on disk
   yet must come back as an explicit "not present / 0% covered" FAIL, never
   a crash and never a silent PASS (see each check's own comment for how it
   degrades). An unknown code is a hard error, not a silently-empty scope. */
function resolveScope() {
  const i = process.argv.indexOf('--locales');
  if (i === -1 || !process.argv[i + 1]) return REG.liveDirs();
  const list = process.argv[i + 1].split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
  list.forEach(c => {
    if (!REG.get(c) || c === 'en') throw new Error(`unknown locale "${c}" — not in scripts/_locales.cjs`);
  });
  return list;
}
const SCOPE = resolveScope();

/* Single qa-lang.cjs invocation, scoped to SCOPE, reused by check 1 and the
   per-locale coverage table (check 16) so a fresh --locales run only pays
   for one subprocess. qa-lang.cjs itself never crashes on a planned locale —
   it just reports every unit as a gap, which is the correct, honest answer
   for a locale with no `_<suffix>` fields anywhere yet. */
function qaLangStatusByLocale(scope) {
  const out = execFileSync(process.execPath, [path.join(__dirname, 'qa-lang.cjs'), '--status', '--langs', scope.join(',')],
    { cwd: ROOT, encoding: 'utf8' });
  const lines = out.trim().split('\n');
  const totalLine = lines[lines.length - 1];
  const nums = (totalLine.match(/\d+/g) || []).map(Number);
  const perLocale = {};
  scope.forEach((l, i) => { perLocale[l] = nums[i + 1]; });
  return { total: nums[0] || 0, perLocale, raw: out };
}
const qaStatus = qaLangStatusByLocale(SCOPE);

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

/* 1. lesson-content coverage — every localizable unit populated in SCOPE.
      Sees: any field with at least one locale sibling (qa-lang.cjs walker),
      for exactly the locales in SCOPE (registry-driven — see resolveScope).
      Cannot see: a field with NO locale sibling anywhere — nothing marks it
      as translatable, so it is indistinguishable from English-only content
      (check 13 below narrows that blind spot for two known shapes). A
      locale with no directories on disk yet is NOT invisible here: qa-lang
      reports every unit as a gap for it, so this check FAILS loudly instead
      of silently passing on a locale that was never translated. */
{
  const gaps = SCOPE.reduce((a, l) => a + (qaStatus.perLocale[l] || 0), 0);
  record(`lesson coverage (${qaStatus.total} units x ${SCOPE.length} locale(s))`, gaps === 0,
    gaps ? `${gaps} gap(s): ` + SCOPE.map(l => `${l}:${qaStatus.perLocale[l] || 0}`).join(' ')
         : 'no gaps');
}

/* 2. UI language packs at parity with the de baseline, for every locale in
      SCOPE.
      Sees: keys present in de but absent elsewhere, AND a locale whose pack
      file does not exist at all — reported via ui-lang.cjs's own `rowFor`,
      which returns `absent:true` with the full baseline counted as missing
      instead of throwing. Before this used registry-scoped SCOPE, a planned
      locale here would have thrown out of dictOf() and crashed the whole
      audit rather than reporting "0% covered".
      Cannot see: a chrome string that is in NO pack — it never reaches
      LangManager, so it renders in English everywhere and looks intentional. */
{
  const { dictOf, rowFor } = require('./ui-lang.cjs');
  const baseKeys = Object.keys(dictOf('de'));
  const bad = [], notPresent = [];
  SCOPE.forEach(l => {
    const r = rowFor(l, baseKeys);
    if (r.absent) { notPresent.push(l); return; }
    if (r.missing) bad.push(`${l}:${r.missing}`);
  });
  const detail = [
    bad.length ? 'missing ' + bad.join(', ') : null,
    notPresent.length ? `${notPresent.length} locale(s) have NO pack file at all (0% covered): ${notPresent.join(', ')}` : null,
  ].filter(Boolean).join('; ') || `all ${SCOPE.length} complete`;
  record(`UI pack parity (${baseKeys.length}-key baseline)`, bad.length === 0 && notPresent.length === 0, detail);
}

/* 3. every language pack that EXISTS still parses and registers.
      A pack is a plain JS dict: one bad append kills the whole locale.
      Sees: a syntax error or an empty registration in any pack file present
      for a SCOPE locale.
      Cannot see, and does not claim to: a locale with no pack file — that is
      check 2's job, not this one's; a missing file is a coverage gap, not a
      parse failure, so it is called out in the detail without failing this
      check on it (failing "still parses" for a file that does not exist
      would be exactly the kind of dishonest signal this file exists to
      avoid in the other direction). */
{
  const { hasPack, dictOf } = require('./ui-lang.cjs');
  const broken = [], notPresent = [];
  SCOPE.forEach(l => {
    if (!hasPack(l)) { notPresent.push(l); return; }
    try { if (!Object.keys(dictOf(l)).length) broken.push(l + ' (empty)'); }
    catch (e) { broken.push(l + ' (' + e.message.slice(0, 40) + ')'); }
  });
  const detail = [
    broken.length ? broken.join(', ') : null,
    notPresent.length ? `${notPresent.length} locale(s) have no pack file yet, nothing to parse: ${notPresent.join(', ')}` : null,
  ].filter(Boolean).join('; ') || `all ${SCOPE.length} packs present and parse`;
  record('language packs parse + register', broken.length === 0, detail);
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
      counterpart to compare against.
      Cannot see, ALSO: English prose that carries an inline Hangul gloss.
      `_locale-prose.cjs` drops every node containing Hangul — correct, it is
      what protects the Korean being taught — so a page can score 0.000 here
      while still serving dozens of English sentences. That class has its own
      script: `scripts/qa-mixed-nodes.cjs` (plan §9 bug 8). This check does
      not subsume it and never will.

      ⚠️ SCOPE PROPAGATION: this invariant runs in a CHILD process, so it does
      not inherit SCOPE automatically. Until 2026-08-19 it called the child
      with only `--json`, which meant `--locales pt-br` scoped every OTHER
      check while this one silently reported on the live 8 instead — it
      printed "160 pages" during a run scoped to a single locale whose own 20
      pages it had not looked at, and PASSed. Forward the flag. When no
      --locales was given, nothing is forwarded and the output is unchanged. */
{
  const { execFileSync: run } = require('child_process');
  const i = process.argv.indexOf('--locales');
  const scopeArgs = (i !== -1 && process.argv[i + 1]) ? ['--locales', SCOPE.join(',')] : [];
  const out = run(process.execPath, [path.join(__dirname, 'audit-content-locale-dup.cjs'), '--json', ...scopeArgs],
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
   but they must agree.
   LOCALES was hardcoded here; it is now SCOPE (registry-driven, see above)
   so a locale added to scripts/_locales.cjs is covered without a second
   hand-edit in this file. */
const mirrorPath = (p, loc) =>
  p.includes('/') ? p.replace(/^([^/]+)\//, '$1/' + loc + '/') : loc + '/' + p;
const MIRROR_SECTIONS = ['learn', 'culture', 'travel'];
const enPageList = (() => {
  const htmlIn = d => fs.readdirSync(d, { withFileTypes: true })
    .filter(e => e.isFile() && e.name.endsWith('.html')).map(e => e.name);
  const pages = htmlIn(ROOT);
  MIRROR_SECTIONS.forEach(sec => htmlIn(path.join(ROOT, sec)).forEach(n => pages.push(sec + '/' + n)));
  return pages;
})();

/* 9. every English page has a mirror for every SCOPE locale.
      Sees: a missing mirror file for any page at the site root or directly
      under learn/, culture/, travel/ — including a locale with NO mirror
      directory at all (every one of its pages counts as missing, which is
      the honest answer for a locale that has not been scaffolded yet, not a
      reason to skip it).
      WHY: this is the invariant that makes `<html lang>`-authoritative
      rendering safe (docs/i18n-locale-leak.md, step 1). Before that fix an
      English URL rendered a Thai/English hybrid for a reader whose stored
      language was Thai; now it renders English, which is only the right
      answer because a real Thai mirror exists to send them to instead. Delete
      a mirror and honoring the declared language strands that reader.
      Cannot see: a mirror that exists but was never translated (check 5's
      job), or a section not listed here — add new sections to MIRROR_SECTIONS. */
{
  const pages = enPageList;
  const missing = [];
  pages.forEach(p => SCOPE.forEach(loc => {
    const m = mirrorPath(p, loc);
    if (!fs.existsSync(path.join(ROOT, m))) missing.push(m);
  }));
  record(`English page mirrors (${pages.length} pages x ${SCOPE.length} locale(s))`,
    missing.length === 0,
    missing.length ? `${missing.length} missing: ${missing.slice(0, 3).join(', ')}`
                   : `all ${pages.length * SCOPE.length} mirrors present`);
}

/* 15. page-count parity vs English, per locale (docs/i18n-expansion/00-plan.md
      §2: 45 pages/locale = 7 root + 15 culture + 5 travel + 18 learn).
      Reuses check 9's own page inventory and mirror rule — this is a
      per-locale PRESENTATION of the same inspection, not a new one, added
      because check 9 only ever reported one pooled pass/fail across every
      SCOPE locale and a single lagging locale could hide inside an otherwise-
      healthy aggregate. A locale with zero mirrors present is reported as
      "0/45", not omitted from the table.
      Cannot see anything check 9 cannot: a mirror file that exists but is a
      stub or was never translated still counts as "present". */
{
  const enCount = enPageList.length;
  const rows = SCOPE.map(loc => {
    const present = enPageList.filter(p => fs.existsSync(path.join(ROOT, mirrorPath(p, loc)))).length;
    return { loc, present };
  });
  const short = rows.filter(r => r.present < enCount);
  record(`page-count parity vs English (${enCount} pages/locale)`, short.length === 0,
    rows.map(r => `${r.loc}:${r.present}/${enCount}`).join(' '));
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
        SCOPE.forEach(loc => {
          if ((EXEMPT[p] || []).includes(loc)) return;
          const m = mirrorPath(p, loc);
          if (!fs.existsSync(path.join(ROOT, m))) bad.push(m);
        });
      });
      record(`search index urls resolve (${entries.length} entries x ${SCOPE.length + 1})`,
        bad.length === 0,
        bad.length ? `${bad.length} unresolvable: ${[...new Set(bad)].slice(0, 3).join(', ')}`
                   : `all ${entries.length * (SCOPE.length + 1)} targets exist`);
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
  // Registry-derived, in SCOPE's underscore-suffix form (e.g. 'zh-tw' ->
  // 'zh_tw') — was a hardcoded array; a locale added to the registry now
  // flows through automatically instead of needing a second hand-edit here.
  const LANGS = SCOPE.map(c => REG.suffixOf(c).replace(/^_/, ''));
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
  if (!bits.length) bits.push(`every localizable field has all ${SCOPE.length} locale(s)`);
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

/* 16. per-locale coverage table — lesson-JSON units and UI-pack keys side by
      side, one locale per entry (docs/i18n-expansion/00-plan.md §0.9: "extend
      the audit harnesses to a fresh locale"). Presentational reuse of check
      1's qa-lang run (qaStatus) and ui-lang.cjs's rowFor — no new inspection.
      Its purpose is that a locale passed via --locales, live or planned,
      shows its real numbers here even when it is 0/0 — check 1 and check 2
      only ever reported a pooled pass/fail, which is exactly the shape of
      blind spot this file's own header warns against ("a check that cannot
      see a class of defect is worse than no check"). */
{
  const { dictOf, rowFor } = require('./ui-lang.cjs');
  const baseKeys = Object.keys(dictOf('de'));
  const rows = SCOPE.map(l => {
    const lessonGaps = qaStatus.perLocale[l] || 0;
    const ui = rowFor(l, baseKeys);
    const uiMissing = ui.absent ? baseKeys.length : ui.missing;
    return { l, lessonGaps, uiMissing };
  });
  const bad = rows.filter(r => r.lessonGaps > 0 || r.uiMissing > 0);
  record(`per-locale coverage table (${SCOPE.length} locale(s))`, bad.length === 0,
    rows.map(r => `${r.l}[lesson:${qaStatus.total - r.lessonGaps}/${qaStatus.total} ui:${baseKeys.length - r.uiMissing}/${baseKeys.length}]`).join(' '));
}

/* 17. dir="rtl" and per-locale <link> fonts, for every SCOPE locale that has
      pages on disk.
      Sees: the <html …> tag's dir attribute and the <head> contents of every
      page under <locale>/, culture/<locale>/, travel/<locale>/, learn/<locale>/
      — compared against the registry's `writing` and `font` fields. A page
      missing dir="rtl" when the registry says writing:'rtl', a page carrying
      dir="rtl" when it should not, a missing font <link> when the registry
      names one, and a font <link> LEAKING from one of the three locales that
      need one (zh-hk, zh-cn, ar) onto a locale that should have none of them,
      are all caught.
      Cannot see: directional CSS correctness (00-plan.md §0.5's physical→
      logical property sweep) — this only checks the two HTML-level signals
      the registry actually encodes. A locale with zero pages on disk is
      named explicitly as "not present" rather than silently excluded from
      the loop, which is what happened here before SCOPE existed. Today none
      of the 8 live locales are rtl or carry a font, so a clean run proves
      only "nothing regressed", not that the rtl/font machinery has been
      exercised — that only happens once `ar`/`zh-hk`/`zh-cn` ship. */
{
  const FONT_HREFS = REG.all().filter(l => l.font).map(l => l.font.href);
  const pagesFor = code => {
    const dirs = [path.join(ROOT, code), path.join(ROOT, 'culture', code),
      path.join(ROOT, 'travel', code), path.join(ROOT, 'learn', code)]
      .filter(d => fs.existsSync(d));
    const files = [];
    dirs.forEach(d => fs.readdirSync(d).filter(n => n.endsWith('.html'))
      .forEach(n => files.push(path.join(d, n))));
    return files;
  };
  const rtlBad = [], fontBad = [], notPresent = [];
  SCOPE.forEach(code => {
    const rec = REG.get(code);
    const files = pagesFor(code);
    if (!files.length) { notPresent.push(code); return; }
    const wantRtl = rec.writing === 'rtl';
    const wantFontHref = rec.font ? rec.font.href : null;
    let rtlMissing = 0, rtlUnexpected = 0, fontMissing = 0, fontLeak = 0;
    files.forEach(f => {
      const html = fs.readFileSync(f, 'utf8');
      const htmlTag = (html.match(/<html\b[^>]*>/) || [''])[0];
      const hasRtl = /dir=["']rtl["']/.test(htmlTag);
      if (wantRtl && !hasRtl) rtlMissing++;
      if (!wantRtl && hasRtl) rtlUnexpected++;
      const headEnd = html.indexOf('</head>');
      const head = headEnd === -1 ? html : html.slice(0, headEnd);
      if (wantFontHref) { if (!head.includes(wantFontHref)) fontMissing++; }
      else if (FONT_HREFS.some(h => head.includes(h))) fontLeak++;
    });
    if (rtlMissing || rtlUnexpected) rtlBad.push(`${code}(${rtlMissing} missing/${rtlUnexpected} unexpected)`);
    if (fontMissing || fontLeak) fontBad.push(`${code}(${fontMissing} missing/${fontLeak} leaked)`);
  });
  const bits = [];
  if (rtlBad.length) bits.push('dir=rtl: ' + rtlBad.join(' '));
  if (fontBad.length) bits.push('font link: ' + fontBad.join(' '));
  if (notPresent.length) bits.push(`${notPresent.length} locale(s) not present on disk (nothing to check): ${notPresent.join(', ')}`);
  record(`dir="rtl" + per-locale font link correctness (${SCOPE.length} locale(s) scoped)`,
    rtlBad.length === 0 && fontBad.length === 0,
    bits.length ? bits.join('; ') : `all ${SCOPE.length} locale(s) correct (none require rtl or a font link today)`);
}

const failed = results.filter(r => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} invariants hold.`);
if (failed.length) console.log('failing: ' + failed.map(r => r.name).join('; '));
if (CHECK) process.exit(failed.length ? 1 : 0);
