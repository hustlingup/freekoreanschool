#!/usr/bin/env node
/* strip-ad-zones.cjs — pre-approval conservative pass (2026-07-09).
   1. Culture articles (all 9 langs): keep at most ONE ad-zone--mid (the
      middle-most); remove the surplus mids added by the density pass.
   2. News article shells (news/article.html + news/<lang>/article.html):
      remove ALL static ad zones — article pages are back on the §4
      exclusion list until AdSense approval.
   Pure string-level deletion, idempotent. --dry-run prints plan only. */

'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DRY = process.argv.includes('--dry-run');

const LANG_DIRS = ['', 'de', 'es', 'fr', 'id', 'ja', 'th', 'vi', 'zh-tw'];

// Matches one full injected zone block (open div, ins, close div) incl. its
// leading indentation and trailing newline.
const ZONE_RE = /[ \t]*<div class="ad-zone ad-zone--(top|mid|bottom)">\r?\n[\s\S]*?<\/div>\r?\n/g;

function zoneBlocks(html) {
  const out = [];
  let m;
  ZONE_RE.lastIndex = 0;
  while ((m = ZONE_RE.exec(html)) !== null) {
    out.push({ type: m[1], start: m.index, end: m.index + m[0].length });
  }
  return out;
}

function removeRanges(html, ranges) {
  let result = html;
  for (const r of [...ranges].sort((a, b) => b.start - a.start)) {
    result = result.slice(0, r.start) + result.slice(r.end);
  }
  return result;
}

let written = 0;

function processCulture(file) {
  const html = fs.readFileSync(file, 'utf8');
  const mids = zoneBlocks(html).filter(z => z.type === 'mid');
  if (mids.length <= 1) return;
  const keep = Math.floor((mids.length - 1) / 2); // middle-most mid stays
  const drop = mids.filter((_, i) => i !== keep);
  console.log(`${path.relative(ROOT, file)} — mids ${mids.length} → 1 (drop ${drop.length})`);
  if (!DRY) { fs.writeFileSync(file, removeRanges(html, drop)); written++; }
}

function processArticle(file) {
  const html = fs.readFileSync(file, 'utf8');
  const zones = zoneBlocks(html);
  if (!zones.length) return;
  console.log(`${path.relative(ROOT, file)} — remove ALL ${zones.length} zones (excluded page)`);
  if (!DRY) { fs.writeFileSync(file, removeRanges(html, zones)); written++; }
}

for (const lang of LANG_DIRS) {
  const dir = path.join(ROOT, 'culture', lang);
  if (!fs.existsSync(dir)) continue;
  for (const f of fs.readdirSync(dir)) {
    if (f.endsWith('.html')) processCulture(path.join(dir, f));
  }
  const art = path.join(ROOT, 'news', lang, 'article.html');
  if (fs.existsSync(art)) processArticle(art);
}

console.log(DRY ? '\n(dry run — nothing written)' : `\n${written} file(s) written`);
