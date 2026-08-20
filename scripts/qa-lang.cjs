#!/usr/bin/env node
/* ═══════════════════════════════════════════════════════════════════════
   qa-lang.cjs — generalized translation extract/apply harness.

   qa-translations.cjs is the frozen record of the letter-writing/typing
   Thai+Vietnamese pass: two hard-coded lessons, two hard-coded languages.
   This script is the same machinery with the lessons, the languages and the
   gaps-only filter opened up, so the 2026-07-26 triage follow-ups
   (docs/writing-typing/qa-triage-results.md) can run without editing — and
   thus invalidating — that record.

   It reuses qa-translations.cjs's `unitsFor` walker verbatim, so unit ids
   and the structural `loc` addressing are identical between the two. A unit
   is localizable when a `<field>_th` sibling exists; Thai is 100% covered in
   every lesson, so that remains a sound detector even when scanning for a
   language whose field is missing entirely — which is exactly the ja case.

     node scripts/qa-lang.cjs --extract --langs ja --lessons grammar,phrases --gaps-only
     node scripts/qa-lang.cjs --extract --langs th --lessons phrases
     node scripts/qa-lang.cjs --apply <lang> <corrections.json>
     node scripts/qa-lang.cjs --status [--langs ja,th]

   LOCALE LIST comes from scripts/_locales.cjs — --status covers the LIVE
   locales by default. Naming a 'planned' locale explicitly (--langs pt-br)
   is supported and is the fresh-locale path: nothing in learn/data/*.json
   carries its suffix yet, so every unit reports as a gap and the footer says
   so in words. It does NOT silently report 0 gaps, and it is not skipped.

   --lessons accepts lesson ids (grammar, emotions, …) and/or the triage
   group names (grammar, hangul, phrases, vocabulary, writing-typing).
   --gaps-only keeps just the units whose target-language value is empty.

   Output lands in scripts/_trans/qa/lang/<lang>/ so it can never collide
   with the frozen scripts/_trans/qa/review/<lang>/ chunks.

   --apply is loss-free and deterministic: it navigates each unit's stored
   trail and writes the exact `<field>_<suffix>` slot. No string matching in
   the write path. Rerun gen-lesson-static.cjs afterwards.
═══════════════════════════════════════════════════════════════════════ */
'use strict';
const fs = require('fs');
const path = require('path');
const { LOCALE_SUFFIXES } = require('./qa-translations.cjs');
const REG = require('./_locales.cjs');

const ROOT = path.resolve(__dirname, '..');
const DATA = path.join(ROOT, 'learn', 'data');
const OUT = path.join(ROOT, 'scripts', '_trans', 'qa', 'lang');
const CHUNK_DEFAULT = 25;                          // override with --chunk N

const ALL_LANGS = REG.liveDirs();                  // shipped locales, en excluded
const PLANNED = REG.all().filter(l => l.status === 'planned').map(l => l.code);
/* The manifest must describe EVERY locale the registry knows, live or
   planned — the locale mid-rollout is precisely the one with 2,065 gaps to
   extract, and building `vals` from the live list alone left its column
   `undefined`, which then threw on `.trim()`. Found on pt-BR, 2026-08-13. */
const MANIFEST_LANGS = REG.all().filter(l => l.code !== 'en').map(l => l.code);

/* Registry suffixes are stored with the leading underscore ('_zh_tw'); every
   call site here wants it without. Derived, never hardcoded. */
const suffixOf = lang => {
  const l = REG.get(lang);
  if (!l) throw new Error(`unknown locale "${lang}" — not in scripts/_locales.cjs`);
  return l.suffix.replace(/^_/, '');
};

/* Accept live locales silently, planned ones with a warning, nothing else. A
   typo must be an error, not a quietly-empty audit. */
function resolveLangs(spec, dflt) {
  const list = (spec || dflt).split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
  list.forEach(l => {
    if (!REG.get(l) || l === 'en') throw new Error(`unknown lang: ${l} (live: ${ALL_LANGS.join(', ')}; planned: ${PLANNED.join(', ') || 'none'})`);
  });
  return list;
}

/* ── the walker, with qa-translations.cjs's blind spot removed ──────────
   qa-translations.cjs decides a field is localizable by looking for a
   `<field>_th` sibling. Thai is ~100% covered, so that holds almost
   everywhere — but it is structurally blind to any field where THAI ITSELF
   is the missing locale, and those fields can never be reported as a gap in
   any language. That blind spot hid, as of 2026-07-26:

     • the 9 lesson_complete `title` fields — no _th/_vi/_zh_tw anywhere, so
       9 lessons end on an English heading in three locales;
     • the 42 vocabulary `tip` objects — no _th/_de/_fr/_vi/_id at all,
       i.e. 210 untranslated strings that measured as "0 gaps".

   Both measured as fully translated precisely BECAUSE they were untranslated
   in Thai. So the test here is "does ANY locale sibling exist", which is the
   property that actually makes a field localizable. Unit ids are derived from
   the trail and field name, so every id the frozen walker produces is
   produced identically here — this strictly widens coverage, it does not
   renumber anything. */
const OBJ_SUBFIELDS = ['label', 'text'];

/* qa-translations.cjs is a FROZEN RECORD and its LOCALE_SUFFIXES list stops at
   the original eight. Widening it there would invalidate the record, so the
   union happens HERE: frozen list ∪ every registry suffix (live AND planned).
   Without the planned suffixes a fresh locale's `title_pt_br` would not be
   recognised as a locale variant at all — the walker would treat it as a base
   field and emit phantom units for it. Identical to the old set today, because
   no lesson JSON carries a planned suffix yet. */
const SUFFIXES = [...new Set([
  ...LOCALE_SUFFIXES,
  ...REG.all().filter(l => l.code !== 'en').map(l => l.suffix.replace(/^_/, '')),
])];
const isLocaleKey = k => SUFFIXES.some(s => k.endsWith('_' + s));
const CONTENT_LANGS = SUFFIXES.filter(s => s !== 'kr');

function isBaseKey(obj, k) {
  if (isLocaleKey(k)) return false;
  return CONTENT_LANGS.some(s => Object.prototype.hasOwnProperty.call(obj, k + '_' + s));
}

function walk(parent, trail, fileId, human, units) {
  if (Array.isArray(parent)) {
    parent.forEach((el, i) => {
      if (el && typeof el === 'object') walk(el, trail.concat({ i }), fileId, `${human}[${i}]`, units);
    });
    return;
  }
  if (!parent || typeof parent !== 'object') return;

  Object.keys(parent).forEach(k => {
    if (isLocaleKey(k)) return;
    const base = parent[k];

    if (isBaseKey(parent, k)) {
      const krSib = parent[k + '_kr'];
      const at = `${human}/${k}`;
      const emit = (kind, element, subfield, en, ko, pathStr) =>
        units.push({
          id: `${fileId}::${trail.map(s => 'k' in s ? s.k : s.i).join('.')}.${k}` +
              (element != null ? `[${element}]` : '') + (subfield != null ? `.${subfield}` : ''),
          path: pathStr,
          loc: { file: fileId, trail, field: k, kind, element, subfield },
          ko: ko || null, en,
        });

      if (typeof base === 'string') {
        emit('string', null, null, base, krSib, at);
      } else if (Array.isArray(base)) {
        base.forEach((el, j) => {
          if (typeof el === 'string') emit('arrayEl', j, null, el, krSib && krSib[j], `${at}[${j}]`);
        });
      } else if (base && typeof base === 'object') {
        OBJ_SUBFIELDS.forEach(sub => {
          if (typeof base[sub] === 'string')
            emit('objSub', null, sub, base[sub], krSib && krSib[sub], `${at}.${sub}`);
        });
      }
      return;
    }
    if (base && typeof base === 'object') walk(base, trail.concat({ k }), fileId, `${human}/${k}`, units);
  });
}

function unitsFor(fileId, data) {
  const units = [];
  ['stages', 'steps'].forEach(container => {
    if (Array.isArray(data[container]))
      walk(data[container], [{ k: container }], fileId, `${fileId}/${container}`, units);
  });
  return units;
}

/* same grouping the triage sampler used — keep in sync with
   scripts/qa-triage-sample.cjs::groupOf */
function groupOf(id) {
  if (id.startsWith('vocabulary-')) return 'vocabulary';
  if (id === 'letter-writing' || id === 'typing') return 'writing-typing';
  if (['hangul', 'syllable-blocks', 'pronunciation'].includes(id)) return 'hangul';
  if (['grammar', 'speech-levels', 'pronouns', 'nouns'].includes(id)) return 'grammar';
  return 'phrases';
}

function lessonIds() {
  return fs.readdirSync(DATA)
    .filter(n => n.endsWith('.json') && !/^(manifest|search-words|vocabulary)\.json$/.test(n))
    .map(n => n.replace(/\.json$/, ''));
}

/* resolve a --lessons spec into concrete lesson ids */
function resolveLessons(spec) {
  const all = lessonIds();
  if (!spec) return all;
  const want = spec.split(',').map(s => s.trim()).filter(Boolean);
  const out = new Set();
  want.forEach(w => {
    const byGroup = all.filter(id => groupOf(id) === w);
    if (byGroup.length) { byGroup.forEach(id => out.add(id)); return; }
    if (all.includes(w)) { out.add(w); return; }
    throw new Error(`--lessons: "${w}" is neither a lesson id nor a group name`);
  });
  return all.filter(id => out.has(id));          // stable order
}

/* read a unit's value for `lang`, reusing the structural loc (same
   navigation --apply performs) */
function localized(data, loc, lang) {
  const suf = suffixOf(lang);
  let o = data;
  for (const s of loc.trail) o = ('k' in s) ? o[s.k] : o[s.i];
  let v = o[loc.field + '_' + suf];
  if (v == null) return '';
  if (loc.kind === 'arrayEl') v = Array.isArray(v) ? v[loc.element] : '';
  else if (loc.kind === 'objSub') v = (v && typeof v === 'object') ? v[loc.subfield] : '';
  return typeof v === 'string' ? v : '';
}

function collect(lessons) {
  const out = [];
  lessons.forEach(id => {
    const data = JSON.parse(fs.readFileSync(path.join(DATA, id + '.json'), 'utf8'));
    unitsFor(id, data).forEach(u => out.push({ u, data }));
  });
  return out;
}

function arg(name, dflt) {
  const i = process.argv.indexOf(name);
  return i > -1 && process.argv[i + 1] && !process.argv[i + 1].startsWith('--')
    ? process.argv[i + 1] : dflt;
}
const has = name => process.argv.includes(name);

function extract() {
  const langs = (arg('--langs') || 'ja').split(',').map(s => s.trim()).filter(Boolean);
  /* Any registry locale, live OR planned. --status already accepted planned
     locales; --extract rejecting them made the round trip impossible for the
     locale currently being rolled out — which is the only locale that ever
     has 2,065 gaps to extract. Found on pt-BR, 2026-08-13. */
  langs.forEach(l => { if (!REG.get(l) || l === 'en') throw new Error(`unknown lang: ${l} (live: ${ALL_LANGS.join(', ')}; planned: ${PLANNED.join(', ') || 'none'})`); });
  const lessons = resolveLessons(arg('--lessons'));
  const gapsOnly = has('--gaps-only');
  const chunkSize = Math.max(1, parseInt(arg('--chunk', CHUNK_DEFAULT), 10) || CHUNK_DEFAULT);
  const fields = (arg('--fields') || '').split(',').map(s => s.trim()).filter(Boolean);

  /* The manifest is ALWAYS the full corpus, never just --lessons: --apply
     resolves ids against it, so a later narrower extract must not be able to
     shrink it out from under an earlier round trip. --lessons filters the
     review chunks only. */
  const rows = collect(lessonIds());
  const inScope = new Set(lessons);
  console.log(`lessons: ${lessons.join(', ')}`);
  console.log(`${rows.length} units scanned (full corpus; chunks limited to --lessons)\n`);

  fs.mkdirSync(OUT, { recursive: true });
  const manifest = rows.map(({ u, data }) => {
    const vals = {};
    MANIFEST_LANGS.forEach(l => { vals[l] = localized(data, u.loc, l); });
    return { id: u.id, path: u.path, loc: u.loc, ko: u.ko, en: u.en, vals };
  });
  fs.writeFileSync(path.join(OUT, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');

  langs.forEach(lang => {
    const dir = path.join(OUT, lang);
    fs.mkdirSync(dir, { recursive: true });
    fs.readdirSync(dir).filter(n => /^chunk-\d+\.json$/.test(n))
      .forEach(n => fs.unlinkSync(path.join(dir, n)));

    const picked = manifest.filter(m =>
      inScope.has(m.loc.file) &&
      (!gapsOnly || !(m.vals[lang] || '').trim()) &&
      (!fields.length || fields.includes(m.loc.field)));
    let c = 0;
    for (let i = 0; i < picked.length; i += chunkSize, c++) {
      const slice = picked.slice(i, i + chunkSize).map(m => ({
        id: m.id, path: m.path, ko: m.ko, en: m.en,
        current: m.vals[lang],
        // a sibling locale that IS translated, as a style reference
        ref_th: m.vals.th, ref_es: m.vals.es,
      }));
      fs.writeFileSync(path.join(dir, `chunk-${String(c).padStart(2, '0')}.json`),
        JSON.stringify({ lang, chunk: c, count: slice.length, units: slice }, null, 2) + '\n');
    }
    console.log(`  ${lang}: ${picked.length} units${gapsOnly ? ' (gaps only)' : ''} → ${c} chunks`);
  });
  console.log(`\nWrote → ${path.relative(ROOT, OUT)}`);
}

function status() {
  const langs = (arg('--langs') || ALL_LANGS.join(',')).split(',').map(s => s.trim());
  const lessons = resolveLessons(arg('--lessons'));
  const rows = collect(lessons);
  const byGroup = {};
  rows.forEach(({ u, data }) => {
    const g = groupOf(u.loc.file);
    byGroup[g] = byGroup[g] || { total: 0, gaps: {} };
    byGroup[g].total++;
    langs.forEach(l => {
      byGroup[g].gaps[l] = byGroup[g].gaps[l] || 0;
      if (!localized(data, u.loc, l).trim()) byGroup[g].gaps[l]++;
    });
  });
  console.log('group'.padEnd(16) + 'units'.padStart(6) + langs.map(l => l.padStart(7)).join(''));
  Object.keys(byGroup).sort().forEach(g => {
    const r = byGroup[g];
    console.log(g.padEnd(16) + String(r.total).padStart(6) +
      langs.map(l => String(r.gaps[l]).padStart(7)).join(''));
  });
  const tot = rows.length;
  const totGaps = langs.map(l => rows.filter(({ u, data }) => !localized(data, u.loc, l).trim()).length);
  console.log('TOTAL'.padEnd(16) + String(tot).padStart(6) + totGaps.map(n => String(n).padStart(7)).join(''));
}

function applyCorrections(lang, correctionsPath) {
  /* Same rule as extract(): a `planned` locale is exactly the one being
     filled, so --apply must accept it too. */
  if (!REG.get(lang) || lang === 'en') throw new Error(`lang must be a locale in scripts/_locales.cjs, not en (live: ${ALL_LANGS.join(', ')}; planned: ${PLANNED.join(', ') || 'none'})`);
  const manifest = JSON.parse(fs.readFileSync(path.join(OUT, 'manifest.json'), 'utf8'));
  const byId = new Map(manifest.map(u => [u.id, u]));
  const corrections = JSON.parse(fs.readFileSync(path.resolve(correctionsPath), 'utf8'));
  const suf = suffixOf(lang);

  const cache = {};
  const load = fileId => {
    if (!cache[fileId]) {
      const rel = path.join('learn', 'data', fileId + '.json');
      cache[fileId] = { rel, data: JSON.parse(fs.readFileSync(path.join(ROOT, rel), 'utf8')) };
    }
    return cache[fileId];
  };

  let n = 0, skipped = 0;
  corrections.forEach(({ id, value }) => {
    const u = byId.get(id);
    if (!u) { console.warn(`  ! unknown id, skipped: ${id}`); skipped++; return; }
    if (typeof value !== 'string' || !value.trim()) { console.warn(`  ! empty value, skipped: ${id}`); skipped++; return; }
    const { data } = load(u.loc.file);
    const { trail, field, kind, element, subfield } = u.loc;
    let obj = data;
    for (const seg of trail) obj = 'k' in seg ? obj[seg.k] : obj[seg.i];
    const key = field + '_' + suf;
    if (kind === 'arrayEl') {
      if (!Array.isArray(obj[key])) obj[key] = (obj[field] || []).slice();
      obj[key][element] = value;
    } else if (kind === 'objSub') {
      if (!obj[key] || typeof obj[key] !== 'object') obj[key] = Object.assign({}, obj[field]);
      obj[key][subfield] = value;
    } else {
      obj[key] = value;
    }
    n++;
  });

  Object.values(cache).forEach(({ rel, data }) => {
    fs.writeFileSync(path.join(ROOT, rel), JSON.stringify(data, null, 2) + '\n');
    console.log(`  wrote ${rel}`);
  });
  console.log(`\nApplied ${n} ${lang} value(s), ${skipped} skipped. Now run: node scripts/gen-lesson-static.cjs`);
}

if (require.main === module) {
  const mode = process.argv[2];
  try {
    if (mode === '--extract') extract();
    else if (mode === '--status') status();
    else if (mode === '--apply') applyCorrections(process.argv[3], process.argv[4]);
    else {
      console.log('usage:\n' +
        '  node scripts/qa-lang.cjs --extract --langs ja --lessons grammar,phrases,hangul --gaps-only\n' +
        '  node scripts/qa-lang.cjs --status [--langs ja,th] [--lessons <ids|groups>]\n' +
        '  node scripts/qa-lang.cjs --apply <lang> <corrections.json>');
      process.exit(1);
    }
  } catch (e) { console.error('ERROR: ' + e.message); process.exit(1); }
}

module.exports = { groupOf, localized, resolveLessons };
