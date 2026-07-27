#!/usr/bin/env node
/* ═══════════════════════════════════════════════════════════════════════
   fix-hidden-locale-swap-fills.cjs — undo the 18 culture/ translations that
   were written into locale-swap elements the reader never sees.

     node scripts/fix-hidden-locale-swap-fills.cjs           # apply
     node scripts/fix-hidden-locale-swap-fills.cjs --check   # verify, exit 1

   Idempotent: once a node holds its original text again nothing matches.

   WHY. `.en-only`, `.ja-only` and `.ja-kana` are locale-swap classes —
   css/style.css:5365-5412 hides `.en-only` on all 8 localized bodies and
   `.ja-only` everywhere but lang-ja. The culture/travel content fill
   extracted the text inside them as untranslated prose and had it
   translated, so e.g. culture/de/kdrama.html got a German sentence inside a
   `span.ja-kana` that German readers never see.

   This is the extractor bug the previous session found and fixed while
   building the measurement — scripts/_locale-prose.cjs EXCLUDE_CLASS now
   covers ja-block|ja-kana|ja-only, no-ja, en-only, zh-tw-only. These 18 are
   residue applied before that rule tightened.

   Nothing here is visible to a reader either way, so this is tidying, not a
   rendering fix. The reason to do it: text translated into the page's own
   visible language but kept display:none is the shape that reads worst to a
   search-quality reviewer. Restoring the original locale-swap content puts
   those nodes back to the state the translation audit signed off on.

   The list in scripts/_trans/content/hidden-locale-swap.json was produced by
   loading every affected page in a real browser and walking up from the text
   node to the first ancestor with display:none — it cannot be derived from
   the HTML alone, because the class is only hidden by a body-level selector.
═══════════════════════════════════════════════════════════════════════ */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const LIST = path.join(__dirname, '_trans', 'content', 'hidden-locale-swap.json');
const CHECK = process.argv.includes('--check');

const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const entries = JSON.parse(fs.readFileSync(LIST, 'utf8'));

/* Two phases. The first version wrote each file as it went and only exited
   non-zero at the end, so a problem on the last page left the earlier ones
   already rewritten — a half-applied "failed" run. Plan everything first,
   write nothing unless the whole plan is valid. */
const problems = [];
const planned = new Map();   // file -> { src, edits: n }
let already = 0;

/* Replace the nth occurrence only. A value can appear twice on one page —
   once in .en-only, once in .ja-only — with DIFFERENT originals collapsed to
   the same translation, so "replace the first match" restores the wrong text
   into one of them. */
function replaceNth(src, needle, replacement, n) {
  let at = -1;
  for (let k = 0; k <= n; k++) {
    at = src.indexOf(needle, at + 1);
    if (at === -1) return null;
  }
  return src.slice(0, at) + replacement + src.slice(at + needle.length);
}

for (const e of entries) {
  const file = path.join(ROOT, e.page);
  if (!fs.existsSync(file)) { problems.push(`${e.page}: file missing`); continue; }
  if (e.original === undefined) { problems.push(`${e.page}: no original recorded`); continue; }

  if (!planned.has(file)) planned.set(file, { src: fs.readFileSync(file, 'utf8'), edits: 0 });
  const slot = planned.get(file);

  const raw = slot.src.includes(e.translated) ? e.translated
            : slot.src.includes(esc(e.translated)) ? esc(e.translated) : null;
  if (!raw) { already++; continue; }                       // already reverted

  const back = raw === e.translated ? e.original : esc(e.original);
  // Always take the FIRST remaining occurrence. Entries for one page/value are
  // stored in ascending `occurrence` order and each consumes one, so after the
  // .en-only match is restored the next entry finds what was occurrence 1 —
  // the .ja-only one — and gives it its own (Japanese) original. Safe because
  // a restored original never contains the translated string.
  const next = replaceNth(slot.src, raw, back, 0);
  if (next === null) { problems.push(`${e.page}: occurrence ${e.occurrence} no longer present`); continue; }
  slot.src = next;
  slot.edits++;
}

if (problems.length) {
  console.error(`${problems.length} problem(s) — nothing written:`);
  problems.forEach(p => console.error('  ' + p));
  process.exit(1);
}

let reverted = 0;
for (const [file, slot] of planned) {
  if (!slot.edits) continue;
  if (!CHECK) fs.writeFileSync(file, slot.src);
  reverted += slot.edits;
}

if (CHECK) {
  console.log(reverted
    ? `${reverted} translated string(s) still sitting in hidden locale-swap elements`
    : `all ${already} hidden locale-swap fills already reverted`);
  process.exit(reverted ? 1 : 0);
}
console.log(`reverted ${reverted} hidden fill(s); ${already} already clean`);
