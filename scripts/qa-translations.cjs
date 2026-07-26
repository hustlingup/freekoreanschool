#!/usr/bin/env node
/* ═══════════════════════════════════════════════════════════════════════
   qa-translations.cjs — Thai / Vietnamese translation-QA harness
   for the two writing/typing lessons.

   Deterministic, idempotent, loss-free. Two modes:

     node scripts/qa-translations.cjs --extract
        Walks learn/data/{letter-writing,typing}.json and emits, under
        scripts/_trans/qa/:
          manifest.json            every reviewable unit: {id, path, loc,
                                   ko?, en, th, vi}
          review/th/chunk-NN.json  per-language review batches (the review
          review/vi/chunk-NN.json  agents read exactly one chunk each)

     node scripts/qa-translations.cjs --apply <lang> <corrections.json>
        <lang> ∈ {th,vi}. <corrections.json> is [{id, value}, ...] as
        returned by the consensus phase. Writes each new string back into
        the source JSON at the exact <field>_<lang> slot the id points to.
        Never touches markup, English, or any other locale. Re-run
        gen-lesson-static.cjs afterwards.

   A unit's `id` is stable across runs (file + structural location), so an
   --extract → review → --apply round trip is a pure function of the
   reviewers' verdicts. NO string matching anywhere in the write path.
═══════════════════════════════════════════════════════════════════════ */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const OUT  = path.join(ROOT, 'scripts', '_trans', 'qa');
const LANGS = ['th', 'vi'];
const LOCALE_SUFFIXES = ['kr', 'ja', 'zh_tw', 'es', 'fr', 'de', 'vi', 'th', 'id'];
const CHUNK = 30;                       // units per review batch

const FILES = [
  { id: 'letter-writing', rel: 'learn/data/letter-writing.json' },
  { id: 'typing',         rel: 'learn/data/typing.json' },
];

const OBJ_SUBFIELDS = ['label', 'text']; // localizable leaves inside a tip{}-style object; icon is emoji

const isLocaleKey = k => LOCALE_SUFFIXES.some(s => k.endsWith('_' + s));

/* a base key is localizable when a `<key>_th` sibling exists beside it and
   the key itself is not already a locale variant */
function isBaseKey(obj, k) {
  if (isLocaleKey(k)) return false;
  return Object.prototype.hasOwnProperty.call(obj, k + '_th');
}

/* Recursive descent. `parent` is the object currently being scanned;
   `trail` is the segment list that leads TO it from the file root, so an
   emitted unit can be re-addressed deterministically on --apply.
   Segment = {k:'steps'} for an object key, {i:3} for an array index. */
function walk(parent, trail, fileId, human, units) {
  if (Array.isArray(parent)) {
    parent.forEach((el, i) => {
      if (el && typeof el === 'object')
        walk(el, trail.concat({ i }), fileId, `${human}[${i}]`, units);
    });
    return;
  }
  if (!parent || typeof parent !== 'object') return;

  Object.keys(parent).forEach(k => {
    if (isLocaleKey(k)) return;                 // never descend into a locale mirror
    const base = parent[k];

    if (isBaseKey(parent, k)) {
      const thSib = parent[k + '_th'], viSib = parent[k + '_vi'], krSib = parent[k + '_kr'];
      const at = `${human}/${k}`;
      const emit = (kind, element, subfield, en, ko, th, vi, pathStr) =>
        units.push({
          id: `${fileId}::${trail.map(s => 'k' in s ? s.k : s.i).join('.')}.${k}` +
              (element != null ? `[${element}]` : '') + (subfield != null ? `.${subfield}` : ''),
          path: pathStr,
          loc: { file: fileId, trail, field: k, kind, element, subfield },
          ko: ko || null, en, th: th || '', vi: vi || '',
        });

      if (typeof base === 'string') {
        emit('string', null, null, base, krSib, thSib, viSib, at);
      } else if (Array.isArray(base)) {
        base.forEach((el, j) => {
          if (typeof el === 'string')
            emit('arrayEl', j, null, el,
              krSib && krSib[j], thSib && thSib[j], viSib && viSib[j], `${at}[${j}]`);
        });
      } else if (base && typeof base === 'object') {
        OBJ_SUBFIELDS.forEach(sub => {
          if (typeof base[sub] === 'string')
            emit('objSub', null, sub, base[sub],
              krSib && krSib[sub], thSib && thSib[sub], viSib && viSib[sub], `${at}.${sub}`);
        });
      }
      return;                                   // handled — do not recurse into a localized base
    }

    // not localized here → keep descending (arrays of objects, plain nesting)
    if (base && typeof base === 'object')
      walk(base, trail.concat({ k }), fileId, `${human}/${k}`, units);
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

function extract() {
  let all = [];
  FILES.forEach(f => {
    const data = JSON.parse(fs.readFileSync(path.join(ROOT, f.rel), 'utf8'));
    const u = unitsFor(f.id, data);
    all = all.concat(u);
    console.log(`  ${f.id}: ${u.length} units`);
  });

  fs.mkdirSync(OUT, { recursive: true });
  fs.writeFileSync(path.join(OUT, 'manifest.json'),
    JSON.stringify(all, null, 2) + '\n');

  LANGS.forEach(lang => {
    const dir = path.join(OUT, 'review', lang);
    fs.mkdirSync(dir, { recursive: true });
    // wipe stale chunks so a re-extract is clean
    fs.readdirSync(dir).filter(n => /^chunk-\d+\.json$/.test(n))
      .forEach(n => fs.unlinkSync(path.join(dir, n)));

    const rows = all.map(u => ({
      id: u.id, path: u.path, ko: u.ko, en: u.en, [lang]: u[lang],
    }));
    let c = 0;
    for (let i = 0; i < rows.length; i += CHUNK, c++) {
      const slice = rows.slice(i, i + CHUNK);
      const name = `chunk-${String(c).padStart(2, '0')}.json`;
      fs.writeFileSync(path.join(dir, name),
        JSON.stringify({ lang, chunk: c, count: slice.length, units: slice }, null, 2) + '\n');
    }
    console.log(`  ${lang}: ${rows.length} units → ${c} chunks`);
  });

  console.log(`\nWrote ${all.length} units → ${path.relative(ROOT, OUT)}`);
}

function applyCorrections(lang, correctionsPath) {
  if (!LANGS.includes(lang)) throw new Error(`lang must be one of ${LANGS.join(', ')}`);
  const manifest = JSON.parse(fs.readFileSync(path.join(OUT, 'manifest.json'), 'utf8'));
  const byId = new Map(manifest.map(u => [u.id, u]));
  const corrections = JSON.parse(fs.readFileSync(path.resolve(correctionsPath), 'utf8'));

  // group by source file, load once, mutate, write once
  const dataCache = {};
  const load = fileId => {
    if (!dataCache[fileId]) {
      const rel = FILES.find(f => f.id === fileId).rel;
      dataCache[fileId] = { rel, data: JSON.parse(fs.readFileSync(path.join(ROOT, rel), 'utf8')) };
    }
    return dataCache[fileId];
  };

  let n = 0;
  corrections.forEach(({ id, value }) => {
    const u = byId.get(id);
    if (!u) { console.warn(`  ! unknown id, skipped: ${id}`); return; }
    if (typeof value !== 'string' || !value.trim()) { console.warn(`  ! empty value, skipped: ${id}`); return; }
    const { data } = load(u.loc.file);
    const { trail, field, kind, element, subfield } = u.loc;
    // navigate the trail to the parent object that holds `field`
    let obj = data;
    for (const seg of trail) obj = 'k' in seg ? obj[seg.k] : obj[seg.i];
    const key = field + '_' + lang;
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

  Object.values(dataCache).forEach(({ rel, data }) => {
    fs.writeFileSync(path.join(ROOT, rel), JSON.stringify(data, null, 2) + '\n');
    console.log(`  wrote ${rel}`);
  });
  console.log(`\nApplied ${n} ${lang} correction(s). Now run: node scripts/gen-lesson-static.cjs`);
}

const [, , mode, a, b] = process.argv;
if (mode === '--extract') extract();
else if (mode === '--apply') applyCorrections(a, b);
else {
  console.log('usage:\n  node scripts/qa-translations.cjs --extract\n' +
              '  node scripts/qa-translations.cjs --apply <th|vi> <corrections.json>');
  process.exit(1);
}
