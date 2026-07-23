#!/usr/bin/env node
/* remove-all-ad-zones.cjs — Auto Ads migration (2026-07-23).
   Removes every manual ad unit from shipped HTML so the site relies on Google
   Auto Ads (single loader snippet) instead of empty manual <ins> slots.

   Per shipped .html file it deletes, preserving each file's exact byte layout
   (BOM + CRLF/LF), every:
     1. <div class="ad-zone ...">…<ins class="adsbygoogle">…</ins>…</div> block
        (and the never-shipped .planner-ad-zone variant, defensively).
     2. <script … src="…/ads.js"></script> include line.

   KEEPS the adsbygoogle.js loader in <head> (that IS the Auto Ads snippet) and
   ads.txt. Pure string-level, idempotent, marker-free (re-running is a no-op).
   --check exits 1 if any ad markup remains; writes nothing. */

'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const CHECK = process.argv.includes('--check');

// Directories that never ship (vercelignored / tooling / vendored).
const SKIP_DIRS = new Set(['.git', 'node_modules', 'scripts', 'docs', 'adsense', 'supabase']);
// translation/ holds _old-es (vercelignored). Skip the whole tree defensively.
const SKIP_PREFIX = ['translation' + path.sep];

// One full ad-zone block: leading indent, open div, single <ins>, close div,
// trailing newline. Non-greedy up to the block's own </div>; ad-zone blocks
// never nest a div, so this is exact. Handles CRLF or LF.
const ZONE_RE = /[ \t]*<div class="(?:ad-zone|planner-ad-zone)[^"]*">\r?\n[\s\S]*?<\/div>\r?\n/g;
// ads.js include line (any relative depth, defer/async), plus its newline.
const ADS_JS_RE = /[ \t]*<script\b[^>]*\bsrc="[^"]*\bads\.js"[^>]*><\/script>\r?\n/g;

function listHtml(dir, out) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const rel = path.relative(ROOT, full);
    if (SKIP_PREFIX.some(p => rel.startsWith(p))) continue;
    const st = fs.statSync(full);
    if (st.isDirectory()) {
      if (SKIP_DIRS.has(name)) continue;
      listHtml(full, out);
    } else if (name.endsWith('.html')) {
      out.push(full);
    }
  }
  return out;
}

const files = listHtml(ROOT, []);
let zonesRemoved = 0, includesRemoved = 0, filesChanged = 0;
const leftovers = [];

for (const file of files) {
  const orig = fs.readFileSync(file, 'utf8');
  const zoneHits = (orig.match(ZONE_RE) || []).length;
  const incHits = (orig.match(ADS_JS_RE) || []).length;

  if (CHECK) {
    if (/<ins class="adsbygoogle"/.test(orig) || /class="(?:ad-zone|planner-ad-zone)/.test(orig) || /\bsrc="[^"]*\bads\.js"/.test(orig)) {
      leftovers.push(path.relative(ROOT, file));
    }
    continue;
  }

  if (!zoneHits && !incHits) continue;
  const next = orig.replace(ZONE_RE, '').replace(ADS_JS_RE, '');
  if (next !== orig) {
    fs.writeFileSync(file, next);
    zonesRemoved += zoneHits;
    includesRemoved += incHits;
    filesChanged++;
    console.log(`${path.relative(ROOT, file)} — zones:${zoneHits} adsjs:${incHits}`);
  }
}

if (CHECK) {
  if (leftovers.length) {
    console.error(`FAIL — ad markup still present in ${leftovers.length} file(s):`);
    leftovers.forEach(f => console.error('  ' + f));
    process.exit(1);
  }
  console.log(`OK — no ad markup in ${files.length} shipped HTML files.`);
} else {
  console.log(`\n${filesChanged} file(s) changed; ${zonesRemoved} ad-zone blocks + ${includesRemoved} ads.js includes removed.`);
}
