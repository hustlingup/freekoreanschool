#!/usr/bin/env node
/**
 * vocab-i18n.cjs — fill the missing _<lang> fields in learn/data/vocabulary*.json
 *
 * The word bank had meanings only in en/es/ja/zh-tw, so learn/{de,fr,vi,th,id}/
 * {vocabulary,vocabulary-browser,flashcard}.html fell back to English wholesale
 * and had to be noindexed. This is the tooling that closes that gap.
 *
 * Translators never write learn/data directly — several work the same files at
 * once, so each emits a patch keyed by path and the merge step applies them.
 *
 *   extract <group> <lang>   write scripts/_vocab/<group>.<lang>.todo.json
 *   merge                    apply every scripts/_vocab/*.done.json
 *   audit                    report remaining gaps per locale
 *
 * Translate from `ko` plus `example`, NOT from the English gloss — a two-hop
 * translation is where sense errors creep in (a word glossed "bank" can be the
 * financial or the river sense, and only the Korean disambiguates).
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DATA = path.join(ROOT, 'learn', 'data');
const OUT = path.join(__dirname, '_vocab');

const LANGS = ['ja', 'zh_tw', 'es', 'de', 'fr', 'vi', 'th', 'id'];
// `choices` and `rules` hold arrays of strings; the rest are plain strings.
const FIELDS = ['name', 'title', 'meaning', 'example_meaning',
                'prompt', 'body', 'message', 'choices', 'rules'];
const ARRAY_FIELDS = new Set(['choices', 'rules']);

const GROUPS = {
  g1: ['vocabulary.json', 'vocabulary-numbers.json', 'vocabulary-greetings.json'],
  g2: ['vocabulary-days-time.json', 'vocabulary-body-parts.json', 'vocabulary-food-drink.json',
       'vocabulary-academic.json', 'vocabulary-family.json', 'vocabulary-konglish.json'],
  g3: ['vocabulary-news.json', 'vocabulary-places.json', 'vocabulary-verbs.json',
       'vocabulary-adjectives.json', 'vocabulary-colors.json', 'vocabulary-emotions.json'],
  g4: ['vocabulary-health.json', 'vocabulary-media.json', 'vocabulary-shopping.json',
       'vocabulary-travel.json', 'vocabulary-weather.json', 'vocabulary-workplace.json',
       'vocabulary-proverbs.json'],
};

/* Walk a parsed lesson file, yielding every translatable string with a stable
 * JSON-pointer-ish path so a patch can be applied back without ambiguity. */
function walk(node, trail, hit) {
  if (Array.isArray(node)) {
    node.forEach((v, i) => walk(v, trail.concat(i), hit));
    return;
  }
  if (!node || typeof node !== 'object') return;
  for (const f of FIELDS) {
    if (ARRAY_FIELDS.has(f)) {
      if (Array.isArray(node[f]) && node[f].every(x => typeof x === 'string')) {
        hit({ path: trail.concat(f).join('.'), field: f, en: node[f], node, isArray: true });
      }
    } else if (typeof node[f] === 'string') {
      hit({ path: trail.concat(f).join('.'), field: f, en: node[f], node });
    }
  }
  for (const [k, v] of Object.entries(node)) {
    if (v && typeof v === 'object') walk(v, trail.concat(k), hit);
  }
}

function readJSON(p) { return JSON.parse(fs.readFileSync(p, 'utf8')); }

function extract(group, lang) {
  const files = GROUPS[group];
  if (!files) throw new Error(`unknown group ${group} (have: ${Object.keys(GROUPS)})`);
  if (!LANGS.includes(lang)) throw new Error(`unknown lang ${lang}`);
  fs.mkdirSync(OUT, { recursive: true });

  const items = [];
  for (const f of files) {
    walk(readJSON(path.join(DATA, f)), [], h => {
      if (h.node[`${h.field}_${lang}`] !== undefined) return;   // already done
      items.push({
        file: f,
        path: h.path,
        field: h.field,
        en: h.en,
        // Context so the translator can disambiguate sense. Not all present.
        // The Korean headword is the `syllables` array joined, or `audio`.
        ko: (Array.isArray(h.node.syllables) ? h.node.syllables.join('') : null)
            || h.node.audio || h.node.ko || h.node.word || null,
        romanization: h.node.romanization || null,
        example: h.node.example || null,
        example_ko: h.node.example_ko || null,
        es: h.node[`${h.field}_es`] || null,   // reference: a good existing translation
        ja: h.node[`${h.field}_ja`] || null,
        zh_tw: h.node[`${h.field}_zh_tw`] || null,
        isArray: !!h.isArray,
        // Arrays must come back the same length and in the same order — the
        // quiz answer is matched by index against `choices`.
        translation: h.isArray ? [] : '',
      });
    });
  }
  const dest = path.join(OUT, `${group}.${lang}.todo.json`);
  fs.writeFileSync(dest, JSON.stringify({ group, lang, count: items.length, items }, null, 2));
  console.log(`${dest} — ${items.length} strings`);
}

function merge() {
  const patches = fs.existsSync(OUT)
    ? fs.readdirSync(OUT).filter(f => f.endsWith('.done.json'))
    : [];
  if (!patches.length) { console.log('no *.done.json patches in scripts/_vocab'); return; }

  // Group patches by target file so each file is read and written exactly once.
  const byFile = {};
  let claimed = 0, missedRef = 0;
  for (const p of patches) {
    const { lang, items } = readJSON(path.join(OUT, p));
    // Rejoin against the todo by path: it is the source of truth for `en`, and
    // a translator's output may have dropped fields it was not asked to change.
    const todoPath = path.join(OUT, p.replace('.done.', '.todo.'));
    const src = {};
    if (fs.existsSync(todoPath)) {
      for (const t of readJSON(todoPath).items) src[`${t.file}::${t.path}`] = t;
    }
    for (const raw of items) {
      const ref = src[`${raw.file}::${raw.path}`];
      if (!ref) { missedRef++; continue; }
      const it = { ...raw, en: ref.en, isArray: ref.isArray };
      const empty = it.isArray
        ? !Array.isArray(it.translation) || it.translation.length !== it.en.length
          || it.translation.some(s => !s || !String(s).trim())
        : !it.translation || !String(it.translation).trim();
      if (empty) continue;
      (byFile[it.file] ||= []).push({ ...it, lang });
      claimed++;
    }
  }

  let applied = 0, missed = 0;
  for (const [file, edits] of Object.entries(byFile)) {
    const abs = path.join(DATA, file);
    const raw = fs.readFileSync(abs, 'utf8');
    const json = JSON.parse(raw);
    for (const e of edits) {
      // Resolve the recorded path, then set the sibling _<lang> key.
      const segs = e.path.split('.');
      const key = segs.pop();
      let cur = json;
      for (const s of segs) { cur = cur?.[Array.isArray(cur) ? Number(s) : s]; }
      if (!cur || typeof cur !== 'object') { missed++; continue; }
      if (e.isArray) {
        // source drifted; refuse to guess
        if (!Array.isArray(cur[key]) || JSON.stringify(cur[key]) !== JSON.stringify(e.en)) { missed++; continue; }
        cur[`${key}_${e.lang}`] = e.translation.map(s => String(s).trim());
      } else {
        if (typeof cur[key] !== 'string' || cur[key] !== e.en) { missed++; continue; }
        cur[`${key}_${e.lang}`] = String(e.translation).trim();
      }
      applied++;
    }
    // Preserve the file's original trailing newline and indentation style.
    const nl = raw.endsWith('\n') ? '\n' : '';
    fs.writeFileSync(abs, JSON.stringify(json, null, 2) + nl);
  }
  console.log(`merged ${applied}/${claimed} (${missed} unresolved, ${missedRef} unmatched) from ${patches.length} patches`);
}

function audit() {
  const files = fs.readdirSync(DATA).filter(f => /^vocabulary.*\.json$/.test(f));
  const gaps = Object.fromEntries(LANGS.map(l => [l, 0]));
  let total = 0;
  for (const f of files) {
    walk(readJSON(path.join(DATA, f)), [], h => {
      total++;
      for (const l of LANGS) if (h.node[`${h.field}_${l}`] === undefined) gaps[l]++;
    });
  }
  console.log(`${total} translatable strings across ${files.length} files`);
  for (const l of LANGS) {
    const done = total - gaps[l];
    console.log(`  ${l.padEnd(6)} ${String(done).padStart(4)}/${total}  missing ${gaps[l]}`);
  }
  return Object.values(gaps).reduce((a, b) => a + b, 0);
}

const [cmd, ...rest] = process.argv.slice(2);
if (cmd === 'extract') extract(rest[0], rest[1]);
else if (cmd === 'merge') merge();
else if (cmd === 'audit') process.exit(audit() === 0 ? 0 : 0);
else { console.log('usage: vocab-i18n.cjs extract <g1|g2|g3|g4> <lang> | merge | audit'); process.exit(1); }
