#!/usr/bin/env node
/**
 * translate-learn-shell.cjs — apply an authored translation table to the
 * hand-written prose of a learn/<locale>/<lesson>.html shell page.
 *
 *   # 1. dump every string that is still verbatim English on the locale page
 *   node scripts/translate-learn-shell.cjs --extract <lesson> <locale>
 *
 *   # 2. author scripts/_trans/learn/<lesson>.<locale>.json  { "English": "…" }
 *
 *   # 3. apply (idempotent — a string already translated simply won't match)
 *   node scripts/translate-learn-shell.cjs --apply <lesson> <locale>
 *   node scripts/translate-learn-shell.cjs --apply <lesson> all
 *
 * WHY A TABLE AND NOT HAND EDITS. These pages are ~170 KB of markup around
 * ~10 KB of prose. Editing them by hand risks the <head> metadata block
 * (scripts/harden-page-metadata.cjs) and the generated #lesson-static block
 * (scripts/gen-lesson-static.cjs), both of which are committed and verified.
 * This script only ever rewrites the *contents of a text node* whose exact
 * trimmed value is a key in the table. Markup, attributes, classes, ids and
 * whitespace are untouched.
 *
 * NEVER TRANSLATED, by design:
 *   - anything containing Hangul (the Korean being taught)
 *   - .rom-line / romanization / pronunciation-aid nodes (transcriptions of
 *     Korean — identical in every locale on purpose)
 *   - the <head>, <script> and <style> blocks
 *   - the generated #lesson-static block (fix that in learn/data/*.json and
 *     rerun gen-lesson-static.cjs instead)
 *
 * Files are mixed LF/CRLF: read as text, normalized to LF for matching, and
 * restored to the file's original ending on write.
 */

'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const LEARN = path.join(ROOT, 'learn');
const TRANS = path.join(__dirname, '_trans', 'learn');
const LOCALES = ['es', 'de', 'fr', 'vi', 'th', 'id', 'ja', 'zh-tw'];

const HANGUL = /[가-힣ᄀ-ᇿ]/;
/* `.ja-block` is a Japanese gloss that every page carries but only shows when
 * body.lang-ja is set (`.ja-block{display:none}` in the page's own <style>).
 * It is already Japanese, so it is never a translation target. */
const TRANSCRIPTION_CLASS =
  /\b(rom-line|romanization|romaja|pron-line|pronunciation-aid|katakana|zhuyin|reading-aid|ja-block)\b/;

/* ── line-ending-preserving IO ─────────────────────────── */
function readLF(abs) {
  const raw = fs.readFileSync(abs, 'utf8');
  const crlf = raw.includes('\r\n');
  return { text: crlf ? raw.replace(/\r\n/g, '\n') : raw, crlf };
}
function writeLF(abs, text, crlf) {
  fs.writeFileSync(abs, crlf ? text.replace(/\n/g, '\r\n') : text, 'utf8');
}

function decodeEnt(s) {
  return s
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'");
}

/* Regions we must not touch: head, script, style, lesson-static. */
function protectedRanges(html) {
  const ranges = [];
  const push = (re) => {
    let m;
    while ((m = re.exec(html)) !== null) ranges.push([m.index, m.index + m[0].length]);
  };
  push(/<head\b[\s\S]*?<\/head>/gi);
  push(/<script\b[\s\S]*?<\/script>/gi);
  push(/<style\b[\s\S]*?<\/style>/gi);
  push(/<!--[\s\S]*?-->/g);
  const a = html.indexOf('lesson-static:start');
  const b = html.indexOf('lesson-static:end');
  if (a !== -1 && b !== -1) ranges.push([a, b + 'lesson-static:end'.length]);
  return ranges;
}

/**
 * Walk every text node outside the protected ranges. `fn(text, openTag)`
 * returns a replacement string, or null to leave the node alone.
 */
function mapTextNodes(html, fn) {
  const prot = protectedRanges(html);
  const inProt = (i) => prot.some(([s, e]) => i >= s && i < e);

  // Capture the opening tag before the text so we can read its class list.
  const re = /(<[^>]*>)([^<]+)(?=<)/g;
  let out = '';
  let last = 0;
  let m;
  while ((m = re.exec(html)) !== null) {
    const textStart = m.index + m[1].length;
    if (inProt(m.index)) continue;
    const raw = m[2];
    const trimmed = decodeEnt(raw).replace(/\s+/g, ' ').trim();
    if (!trimmed) continue;
    if (HANGUL.test(trimmed)) continue;
    if (TRANSCRIPTION_CLASS.test(m[1])) continue;
    if (trimmed.replace(/[^\p{L}]/gu, '').length < 2) continue;

    const rep = fn(trimmed, m[1]);
    if (rep == null || rep === trimmed) continue;

    // Preserve the node's original leading/trailing whitespace exactly.
    const lead = raw.match(/^\s*/)[0];
    const tail = raw.match(/\s*$/)[0];
    out += html.slice(last, textStart) + lead + rep + tail;
    last = textStart + raw.length;
  }
  return out + html.slice(last);
}

/* ── commands ──────────────────────────────────────────── */
const mode = process.argv[2];
const lesson = process.argv[3];
const localeArg = process.argv[4];

function enPath(l) { return path.join(LEARN, `${l}.html`); }
function locPath(l, loc) { return path.join(LEARN, loc, `${l}.html`); }
function tablePath(l, loc) { return path.join(TRANS, `${l}.${loc}.json`); }

if (mode === '--extract') {
  const en = new Set();
  mapTextNodes(readLF(enPath(lesson)).text, (t) => { en.add(t); return null; });
  const seen = new Map();
  mapTextNodes(readLF(locPath(lesson, localeArg)).text, (t) => {
    if (en.has(t)) seen.set(t, (seen.get(t) || 0) + 1);
    return null;
  });
  const rows = [...seen.entries()].sort((a, b) => b[0].length - a[0].length);
  console.error(`${rows.length} untranslated strings, ${rows.reduce((a, r) => a + r[0].length, 0)} chars`);
  console.log(JSON.stringify(Object.fromEntries(rows.map(([k]) => [k, ''])), null, 2));
  process.exit(0);
}

if (mode !== '--apply') {
  console.error('usage: --extract <lesson> <locale> | --apply <lesson> <locale|all>');
  process.exit(1);
}

const targets = localeArg === 'all' ? LOCALES : [localeArg];
let grandTotal = 0;

for (const loc of targets) {
  const tp = tablePath(lesson, loc);
  const fp = locPath(lesson, loc);
  if (!fs.existsSync(tp) || !fs.existsSync(fp)) continue;

  const table = JSON.parse(fs.readFileSync(tp, 'utf8'));
  const { text, crlf } = readLF(fp);

  let hits = 0;
  const missing = new Set();
  const out = mapTextNodes(text, (t) => {
    if (!Object.prototype.hasOwnProperty.call(table, t)) return null;
    const v = table[t];
    if (!v) { missing.add(t); return null; }
    hits++;
    return v;
  });

  if (missing.size) console.error(`  ${loc}: ${missing.size} table entries still empty`);
  if (out !== text) writeLF(fp, out, crlf);
  grandTotal += hits;
  console.log(`${lesson} ${loc}: ${hits} nodes translated`);
}
console.log(`total ${grandTotal}`);
