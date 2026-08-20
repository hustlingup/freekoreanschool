#!/usr/bin/env node
/* ═══════════════════════════════════════════════════════════════════════
   fix-locale-number-format.cjs — normalize thousands separators in the
   localized culture/ and travel/ pages.

   Found by the 2026-07-26 translation triage: travel/de/cities.html rendered
   its price chips with English comma separators (₩80,000) while the German
   body prose a few lines below used periods (₩20.000). Measuring the class
   showed it was not one page — es, fr, id and vi carry the English format
   too, and id/vi are internally inconsistent with their own prose.

   Convention per locale (what each language actually uses, and what the
   pages ALREADY use in their correctly-formatted majority):
       de, es, id, vi  →  period   1.000
       fr              →  space    1 000
       en, ja, th, zh-tw → comma   1,000   (already correct — untouched)

   The fr separator is a PLAIN space (U+0020), not a no-break space, because
   that is what the fr numbers on these pages overwhelmingly use — 96 U+0020
   groupings against 17 U+00A0 (measured 2026-08-12; the "zero U+00A0 anywhere"
   this comment used to claim was never true, and the constant below silently
   wrote U+00A0 for fr while the comment said U+0020). French typography would
   prefer a narrow no-break space so prices cannot wrap mid-number, but mixing
   space characters across the corpus is worse than matching what is there.
   Converting the whole fr corpus to U+202F is a separate change.

   ⚠️ THE HANGUL GUARD IS THE WHOLE TRICK. Most comma-thousands on these
   pages sit inside KOREAN text — "3,000만 개 이상 판매", "최대 1,000배" — which
   is shared verbatim across all nine locales and is CORRECT: Korean uses
   comma separators. A naive sweep converts ~50 correct Korean numbers per
   locale into corrupted ones.

   The guard is per-NUMBER, not per-node: a number is left alone when Hangul
   sits immediately beside it ("3,000만"), which is what marks it as part of
   the Korean. Guarding the whole node instead is too blunt — it skips
   genuinely Spanish sentences that merely mention a Korean brand
   ("…티머니… desde ₩1,400"), leaving those prices in English format.

   Also skipped: <script>/<style> bodies, tags and attributes (the rewrite
   only ever runs on text between > and <), and 4-digit bare years.

     node scripts/fix-locale-number-format.cjs [--check] [--locale de]

   --check writes nothing and exits 1 if any page still needs conversion.
   Idempotent: a page already in its locale's convention is left alone.
═══════════════════════════════════════════════════════════════════════ */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
/* ── Separators, from the registry (scripts/_locales.cjs) ──────────────────
   `numberSep` is the registry's per-locale thousands separator, and it is now
   the only place the convention is written down. de/es/id/vi period, fr space,
   en/ja/th/zh-tw comma — the same values this script used to hardcode, with ONE
   correction: the hardcoded fr separator was a NO-BREAK space (U+00A0) even
   though this file's own header states, twice, that fr uses a PLAIN space
   (U+0020) to match the ~96 pre-existing fr numbers on these pages. The
   registry says U+0020, which is what the header always intended. The 17
   U+00A0 groupings already sitting in culture/fr/{kbeauty,koreanthing,ramyeon}
   and travel/fr/cities are a pre-existing inconsistency in the PAGES, out of
   this script's reach (it only ever rewrites comma-grouped numbers).

   The default sweep covers LIVE locales whose separator is not the comma: a
   comma locale's pages are already in that format, so the rewrite is a
   guaranteed no-op there. `--locale <code>` accepts any registry code,
   including a 'planned' locale being staged, since normalizing numbers is not
   a public emission.

   ⚠️ `ms` groups with a COMMA and `id` with a PERIOD. They are not
   interchangeable — which is precisely why the value belongs in the registry
   instead of being copy-pasted between locales here. */
const registry = require('./_locales.cjs');
const SEP = Object.fromEntries(
  registry.all().filter(l => l.code !== 'en').map(l => [l.code, l.numberSep]));
const LOCALES = registry.live()
  .filter(l => l.code !== 'en' && l.numberSep !== ',')
  .map(l => l.code);
const DIRS = ['culture', 'travel'];

const CHECK = process.argv.includes('--check');
const only = (() => { const i = process.argv.indexOf('--locale'); return i > -1 ? process.argv[i + 1] : null; })();

const HANGUL = /[가-힣]/;

/* A number with English comma grouping: 1,000 / 80,000 / 1,234,567.
   Requires a digit-comma-3digits shape not glued to more digits. */
const GROUPED = /\b\d{1,3}(?:,\d{3})+\b/g;

function convert(num, sep) {
  return num.replace(/,/g, sep);
}

/* Rewrite only the text between tags. Each number is judged on its own
   immediate neighbours: Hangul touching it means it belongs to the Korean.

   <script>/<style> bodies are masked out first: their contents also sit
   between a > and a <, so without this a grouped number in inline JS (an
   analytics threshold, a price constant) would be silently rewritten and the
   script broken. No such number exists today — this keeps that true. */
const BLOCK = /<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi;
const SENTINEL = '\u0000';                 // cannot occur in these HTML files

function rewriteHtml(src, sep) {
  let changed = 0;

  // 1. lift script/style bodies out of reach
  const stash = [];
  const masked = src.replace(BLOCK, m => SENTINEL + (stash.push(m) - 1) + SENTINEL);

  // 2. rewrite grouped numbers in real text nodes only
  const out = masked.replace(/>([^<]*)</g, (m, text) => {
    if (!text) return m;
    GROUPED.lastIndex = 0;
    if (!GROUPED.test(text)) { GROUPED.lastIndex = 0; return m; }
    GROUPED.lastIndex = 0;
    const next = text.replace(GROUPED, (n, off, whole) => {
      const before = whole.slice(Math.max(0, off - 2), off);
      const after = whole.slice(off + n.length, off + n.length + 2);
      if (HANGUL.test(before) || HANGUL.test(after)) return n;   // part of the Korean
      changed++;
      return convert(n, sep);
    });
    return '>' + next + '<';
  });

  // 3. put the script/style bodies back verbatim
  const restored = out.replace(
    new RegExp(SENTINEL + '(\\d+)' + SENTINEL, 'g'), (_, i) => stash[+i]);
  return { out: restored, changed };
}

function pagesFor(loc) {
  const out = [];
  DIRS.forEach(d => {
    const dir = path.join(ROOT, d, loc);
    if (!fs.existsSync(dir)) return;
    fs.readdirSync(dir).filter(n => n.endsWith('.html')).forEach(n => out.push(path.join(d, loc, n)));
  });
  return out;
}

let totalChanged = 0, filesChanged = 0, drift = 0;

(only ? [only] : LOCALES).forEach(loc => {
  const sep = SEP[loc];
  if (sep === undefined) { console.error(`no such locale in the registry: ${loc}`); return; }
  if (sep === ',') { console.log(`${loc} groups with a comma — already correct, nothing to do`); return; }
  pagesFor(loc).forEach(rel => {
    const abs = path.join(ROOT, rel);
    const src = fs.readFileSync(abs, 'utf8');
    const { out, changed } = rewriteHtml(src, sep);
    if (!changed || out === src) return;
    if (CHECK) { drift++; totalChanged += changed; console.log(`  DRIFT ${rel}  (${changed})`); return; }
    fs.writeFileSync(abs, out, 'utf8');
    filesChanged++; totalChanged += changed;
    console.log(`  ${rel}: ${changed} number(s) → "${sep === ' ' ? 'space' : sep}"`);
  });
});

if (CHECK) {
  console.log(drift ? `${drift} file(s), ${totalChanged} number(s) still in English format`
                    : 'all localized pages use their locale number convention');
  process.exit(drift ? 1 : 0);
}
console.log(`\n${totalChanged} number(s) converted across ${filesChanged} file(s).`);
