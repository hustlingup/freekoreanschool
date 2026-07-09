#!/usr/bin/env node
/**
 * gen-search-words.cjs — build the site-wide word search index.
 *
 * Scans every lesson JSON in learn/data/, extracts each Korean word /
 * phrase together with its romanization, pronunciation aids, and meaning
 * in ALL languages, and writes a compact index to
 * learn/data/search-words.json. The frontend (js/app.js loadWordIndex)
 * lazy-loads this file so any word on the site is searchable from the
 * header search bar in any language.
 *
 * Idempotent — safe to re-run after editing lesson data.
 *
 * Entry shape (kept short to minimize payload):
 *   t: Korean headword           u: url (root-relative, ?step= deep link)
 *   w: example word (hangul)     r: romanization
 *   k: katakana (ja aid)         z: zhuyin (zh-tw aid)
 *   v: reading_vi                h: reading_th
 *   m: { en, ja, zh_tw, es, fr, de, vi, th, id } meanings (present ones)
 */
const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'learn', 'data');
const OUT_FILE = path.join(DATA_DIR, 'search-words.json');
const LANGS = ['ja', 'zh_tw', 'es', 'fr', 'de', 'vi', 'th', 'id'];

const manifest = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'manifest.json'), 'utf8'));
const urlById = Object.fromEntries(manifest.lessons.map(l => [l.id, l.url]));

function meanings(step, base) {
  const m = {};
  if (step[base]) m.en = String(step[base]);
  for (const l of LANGS) {
    const v = step[`${base}_${l}`];
    if (v) m[l] = String(v);
  }
  return m;
}

const out = [];
const seen = new Set();

for (const file of fs.readdirSync(DATA_DIR).sort()) {
  if (!file.endsWith('.json') || file === 'manifest.json' || file === 'search-words.json') continue;
  const data = JSON.parse(fs.readFileSync(path.join(DATA_DIR, file), 'utf8'));
  const lessonUrl = urlById[data.lesson];
  if (!lessonUrl) continue; // orphaned lesson (e.g. vocabulary.json)

  for (const step of data.steps || []) {
    let t, w, m;
    switch (step.type) {
      case 'listen_repeat':
        t = step.word || step.audio || (step.syllables || []).join('');
        m = meanings(step, 'meaning');
        break;
      case 'card_reveal':
        t = step.char || step.jamo;
        w = step.example_word;
        m = meanings(step, 'example_meaning');
        break;
      case 'syllable_builder':
        t = step.result;
        m = meanings(step, 'meaning');
        break;
      default:
        continue;
    }
    if (!t || !m.en) continue;
    const key = t + '|' + m.en;
    if (seen.has(key)) continue;
    seen.add(key);

    const sep = lessonUrl.includes('?') ? '&' : '?';
    const e = { t, u: `learn/${lessonUrl}${sep}step=${step.id}`, m };
    if (w) e.w = w;
    if (step.romanization) e.r = step.romanization;
    if (step.katakana) e.k = step.katakana;
    if (step.zhuyin) e.z = step.zhuyin;
    if (step.reading_vi) e.v = step.reading_vi;
    if (step.reading_th) e.h = step.reading_th;
    out.push(e);
  }
}

fs.writeFileSync(OUT_FILE, JSON.stringify(out));
const kb = (fs.statSync(OUT_FILE).size / 1024).toFixed(1);
console.log(`search-words.json: ${out.length} words, ${kb} KB`);
