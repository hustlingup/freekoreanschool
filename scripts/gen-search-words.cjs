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
 *   x: extra searchable text, same lang map — matched but NEVER displayed
 *   c: kind, when not a plain word — 't' topic, 'l' letter, 'd' drill, 'q' quiz
 *
 * COVERAGE. This used to index 4 step types and skip 430 of 1,072 steps, so
 * the letter-writing and typing lessons were almost entirely unsearchable
 * (their content lives in stroke_trace / key_intro / typing_drill) and no
 * reading_card prose was reachable at all. Types and what is taken from each:
 *
 *   listen_repeat, card_reveal, stroke_demo, syllable_builder — the word
 *   stroke_trace   char + romanization, hint as the gloss
 *   key_intro      the jamo taught, title as the gloss, tip into x
 *   typing_drill   drill title, instruction as the gloss
 *   reading_card   title_kr as headword, title as the gloss, tip into x
 *   match_quiz     the `correct` answer, prompt as the gloss — ONLY when that
 *                  headword is not already indexed (65 of 184 are), so a word
 *                  never appears twice with a quiz question as its meaning
 *
 * DELIBERATELY SKIPPED:
 *   reading_card `body` — 395.8 KB across 9 locales, more than doubling the
 *     file for full-text prose search. Titles and tips are indexed instead.
 *     If full-text is wanted, it belongs in a SEPARATE index loaded only on
 *     the results page, not in the payload every focus of the search box.
 *   lesson_complete — titles are "Emotions Complete!"; no learning content.
 */
const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'learn', 'data');
const OUT_FILE = path.join(DATA_DIR, 'search-words.json');
const LANGS = ['ja', 'zh_tw', 'es', 'fr', 'de', 'vi', 'th', 'id'];

const manifest = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'manifest.json'), 'utf8'));
const urlById = Object.fromEntries(manifest.lessons.map(l => [l.id, l.url]));

/* A `tip` is a plain string on key_intro / typing_drill but an
   { icon, label, text } object on reading_card — the same split step-runner's
   typingTipHtml() has to absorb. String(obj) yields "[object Object]", which
   is not a crash, just 9 locales of unsearchable garbage in the tags, so
   flatten explicitly rather than coercing. */
function flat(v) {
  if (v == null) return '';
  if (typeof v === 'string') return v;
  if (typeof v === 'object') return [v.label, v.text].filter(Boolean).join(' ');
  return String(v);
}

function meanings(step, base) {
  const m = {};
  if (flat(step[base])) m.en = flat(step[base]);
  for (const l of LANGS) {
    const v = flat(step[`${base}_${l}`]);
    if (v) m[l] = v;
  }
  return m;
}

/* Join two locale maps per language — lets one entry carry both its
   instruction and its tip as searchable-but-never-displayed text. */
function mergeMaps(a, b) {
  const out = {};
  for (const k of new Set([...Object.keys(a || {}), ...Object.keys(b || {})])) {
    out[k] = [(a || {})[k], (b || {})[k]].filter(Boolean).join(' ');
  }
  return out;
}

const out = [];
const seen = new Set();       // t|meaning — exact duplicate rows
const headwords = new Set();  // t alone — used to keep quizzes from re-listing a word
const quizQueue = [];         // match_quiz deferred to a 2nd pass (see below)
const counts = {};

function extract(step) {
  switch (step.type) {
    case 'listen_repeat':
      return { t: step.word || step.audio || (step.syllables || []).join(''),
               m: meanings(step, 'meaning') };
    case 'card_reveal':
      return { t: step.char || step.jamo, w: step.example_word,
               m: meanings(step, 'example_meaning') };
    case 'stroke_demo':
      return { t: step.char, w: step.example_word,
               m: meanings(step, 'example_meaning') };
    case 'syllable_builder':
      return { t: step.result, m: meanings(step, 'meaning') };
    case 'stroke_trace':
      return { t: step.char, m: meanings(step, 'hint'), c: 'l' };
    case 'key_intro':
      return { t: (step.jamo || []).join(' '), m: meanings(step, 'title'),
               x: mergeMaps(meanings(step, 'instruction'), meanings(step, 'tip')), c: 'l' };
    case 'typing_drill':
      return { t: step.title, m: meanings(step, 'title'),
               x: meanings(step, 'instruction'), c: 'd' };
    case 'reading_card':
      return { t: step.title_kr || step.title, m: meanings(step, 'title'),
               x: meanings(step, 'tip'), c: 't' };
    default:
      return null;
  }
}

function push(step, lessonUrl, got) {
  if (!got || !got.t || !got.m || !got.m.en) return false;
  const key = got.t + '|' + got.m.en;
  if (seen.has(key)) return false;
  seen.add(key);
  headwords.add(got.t);

  const sep = lessonUrl.includes('?') ? '&' : '?';
  const e = { t: got.t, u: `learn/${lessonUrl}${sep}step=${step.id}`, m: got.m };
  if (got.w) e.w = got.w;
  if (step.romanization) e.r = step.romanization;
  if (step.katakana) e.k = step.katakana;
  if (step.zhuyin) e.z = step.zhuyin;
  if (step.reading_vi) e.v = step.reading_vi;
  if (step.reading_th) e.h = step.reading_th;
  if (got.x && got.x.en) e.x = got.x;
  if (got.c) e.c = got.c;
  out.push(e);
  counts[step.type] = (counts[step.type] || 0) + 1;
  return true;
}

for (const file of fs.readdirSync(DATA_DIR).sort()) {
  if (!file.endsWith('.json') || file === 'manifest.json' || file === 'search-words.json') continue;
  const data = JSON.parse(fs.readFileSync(path.join(DATA_DIR, file), 'utf8'));
  const lessonUrl = urlById[data.lesson];
  if (!lessonUrl) continue; // orphaned lesson (e.g. vocabulary.json)

  for (const step of data.steps || []) {
    // A quiz answer is a word taught somewhere else, and file order is
    // alphabetical — so the lesson that teaches it may be read AFTER the
    // lesson that quizzes it. Defer every quiz to a second pass, once all
    // real headwords are known, or a word gets listed twice: once with its
    // meaning, once with "Which word means …?" as its meaning.
    if (step.type === 'match_quiz') {
      if (step.correct) quizQueue.push({ step, lessonUrl });
      continue;
    }
    push(step, lessonUrl, extract(step));
  }
}

for (const { step, lessonUrl } of quizQueue) {
  if (headwords.has(step.correct)) continue;
  push(step, lessonUrl, { t: step.correct, m: meanings(step, 'prompt'), c: 'q' });
}

fs.writeFileSync(OUT_FILE, JSON.stringify(out));
const kb = (fs.statSync(OUT_FILE).size / 1024).toFixed(1);
console.log(`search-words.json: ${out.length} entries, ${kb} KB`);
console.log('  by step type: ' + Object.entries(counts).sort((a, b) => b[1] - a[1])
  .map(([t, n]) => `${t} ${n}`).join(', '));
