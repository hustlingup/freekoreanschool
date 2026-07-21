#!/usr/bin/env node
/**
 * audit-learn-locale-dup.cjs — measure how much of each learn/<locale>/*.html
 * is still byte-identical English prose copied from the English source page.
 *
 *   node scripts/audit-learn-locale-dup.cjs           # ranked table
 *   node scripts/audit-learn-locale-dup.cjs --json    # machine-readable
 *   node scripts/audit-learn-locale-dup.cjs --show learn/de/dialogues.html
 *
 * WHY THIS METRIC. An earlier audit compared whole-page trigram overlap and
 * concluded every locale was translated. That was wrong: Korean example
 * sentences, Hangul and vocabulary are *supposed* to be identical across
 * locales, and they dominate the trigram signal, masking pages whose English
 * prose was never touched at all.
 *
 * Method: extract visible text NODES (split on element boundaries, never on
 * whitespace), drop every node containing Hangul, drop punctuation/number
 * noise, then ask what fraction of the remaining prose — weighted by
 * character length — appears verbatim in the English source page's own
 * non-Korean node set.
 *
 * Two measurement traps this avoids, both of which produced false results
 * earlier today:
 *   1. Splitting text on spaces instead of tags. That yields single words,
 *      not prose, and makes the ratio meaningless.
 *   2. Requiring a segment to contain a space to count as prose. Japanese,
 *      Chinese and Thai do not space their words, so such a rule discards
 *      every genuinely translated CJK/Thai node and leaves only leftover
 *      English — inflating those locales toward 1.0.
 *
 * `sentenceRatio` is the load-bearing number: duplication restricted to nodes
 * >= 30 chars. Short shared strings (brand names, nav verbs, "OK") are
 * legitimately identical across locales; whole shared sentences are not.
 *
 * Read-only. Writes nothing.
 */

'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const LEARN = path.join(ROOT, 'learn');
const LOCALES = ['ja', 'zh-tw', 'es', 'de', 'fr', 'vi', 'th', 'id'];
const HANGUL = /[가-힣ᄀ-ᇿ㄰-㆏]/;
const SENTENCE_MIN = 30;

function decode(s) {
  return s
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&[a-z]+;/gi, ' ');
}

/**
 * Elements whose Latin-script text is SUPPOSED to be identical in every
 * locale: Revised-Romanization of the Korean line, and the per-locale
 * pronunciation aids. These are transcriptions of Korean, not prose. Counting
 * them as "duplicate English" is the same error as counting the Hangul.
 * learn/dialogues.html alone carries 178 such nodes.
 *
 * `.ja-block` / `.no-ja` are likewise excluded. They are a locale-swap PAIR:
 * the page carries both an English line (`.no-ja`) and its Japanese
 * translation (`.ja-block`), and the page's own <style> shows exactly one —
 *     .ja-block { display:none; }
 *     body.lang-ja .ja-block { display:block; }
 *     body.lang-ja .no-ja    { display:none; }
 * So on the ja page the English is hidden and the Japanese shown. Counting
 * the hidden English as untranslated duplication is a false positive; the
 * content IS translated. (Shipping the other locale's copy in the DOM on
 * every page is a separate, minor concern — see the report.)
 */
const TRANSCRIPTION_CLASS = /\b(rom-line|romanization|romaja|pron-line|pronunciation-aid|katakana|zhuyin|reading-aid|ja-block|no-ja)\b/;

/** Visible text nodes, in document order. Split on TAGS, not on whitespace. */
function textNodes(html) {
  let s = html;
  s = s.replace(/<script\b[\s\S]*?<\/script>/gi, '<');
  s = s.replace(/<style\b[\s\S]*?<\/style>/gi, '<');
  s = s.replace(/<head\b[\s\S]*?<\/head>/gi, '<');
  s = s.replace(/<!--[\s\S]*?-->/g, '<');
  // Blank out transcription elements' contents, keeping the tags as boundaries.
  s = s.replace(
    /<(\w+)([^>]*\bclass="[^"]*"[^>]*)>([^<]*)</g,
    (full, tag, attrs, txt) =>
      TRANSCRIPTION_CLASS.test(attrs) ? `<${tag}${attrs}><` : full
  );

  const out = [];
  // Every run of characters between a '>' and the next '<' is a text node.
  const re = />([^<]+)</g;
  let m;
  while ((m = re.exec(s)) !== null) {
    const t = decode(m[1]).replace(/\s+/g, ' ').trim();
    if (t) out.push(t);
  }
  return out;
}

function proseNodes(html) {
  return textNodes(html).filter((t) => {
    if (HANGUL.test(t)) return false; // Korean content — correctly shared
    return t.replace(/[^\p{L}]/gu, '').length >= 3;
  });
}

function score(localeHtml, enHtml) {
  const en = new Set(proseNodes(enHtml));
  const nodes = proseNodes(localeHtml);
  let total = 0, dup = 0, sTotal = 0, sDup = 0;
  const examples = [];
  for (const s of nodes) {
    const isDup = en.has(s);
    total += s.length;
    if (isDup) dup += s.length;
    if (s.length >= SENTENCE_MIN) {
      sTotal += s.length;
      if (isDup) {
        sDup += s.length;
        if (examples.length < 5) examples.push(s.slice(0, 100));
      }
    }
  }
  return {
    ratio: total ? dup / total : 0,
    sentenceRatio: sTotal ? sDup / sTotal : 0,
    nodes: nodes.length,
    chars: total,
    dupChars: dup,
    sentenceChars: sTotal,
    sentenceDupChars: sDup,
    examples,
  };
}

const rows = [];
for (const loc of LOCALES) {
  const dir = path.join(LEARN, loc);
  if (!fs.existsSync(dir)) continue;
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.html'))) {
    const src = path.join(LEARN, f);
    if (!fs.existsSync(src)) continue;
    const r = score(
      fs.readFileSync(path.join(dir, f), 'utf8'),
      fs.readFileSync(src, 'utf8')
    );
    rows.push({ page: `learn/${loc}/${f}`, locale: loc, file: f, ...r });
  }
}

const showIdx = process.argv.indexOf('--show');
if (showIdx !== -1) {
  const want = process.argv[showIdx + 1].replace(/\\/g, '/');
  const row = rows.find((r) => r.page === want);
  if (!row) { console.error('no such page'); process.exit(1); }
  console.log(JSON.stringify(row, null, 2));
} else if (process.argv.includes('--json')) {
  console.log(JSON.stringify(rows, null, 2));
} else {
  rows.sort((a, b) => b.sentenceRatio - a.sentenceRatio || b.ratio - a.ratio);
  console.log(' sent  ratio  nodes  sentChars  page');
  console.log('-----  -----  -----  ---------  ----------------------------------');
  for (const r of rows) {
    const flag = r.sentenceRatio >= 0.5 ? '  <<<' : '';
    console.log(
      `${r.sentenceRatio.toFixed(3)}  ${r.ratio.toFixed(3)}  ` +
      `${String(r.nodes).padStart(5)}  ${String(r.sentenceChars).padStart(9)}  ${r.page}${flag}`
    );
  }
  const bad = rows.filter((r) => r.sentenceRatio >= 0.5);
  console.log(`\n${bad.length} of ${rows.length} pages have >=50% of their sentence-length prose still verbatim English.`);
}
