/**
 * Replaces old favicon link block with the current PNG-based set and adds
 * <link rel="manifest"> if missing.
 *
 * Run: node scripts/update-favicons.js
 */

import fs   from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT    = path.resolve(__dirname, '..');
const EXCLUDE = new Set(['node_modules', '.git', 'scripts']);

const MANIFEST_LINK = '  <link rel="manifest" href="/site.webmanifest">';

function collectHTML(dir, results = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!EXCLUDE.has(entry.name)) collectHTML(path.join(dir, entry.name), results);
    } else if (entry.name.endsWith('.html')) {
      results.push(path.join(dir, entry.name));
    }
  }
  return results;
}

const files = collectHTML(ROOT);
let updated = 0, skipped = 0;

for (const file of files) {
  let html = fs.readFileSync(file, 'utf8');
  let changed = false;

  if (!html.includes('rel="manifest"')) {
    // Insert after the apple-touch-icon link, or before </head> as fallback
    const patched = html.replace(
      /(<link rel="apple-touch-icon"[^>]*>)/,
      `$1\n${MANIFEST_LINK}`
    );
    if (patched !== html) {
      html = patched;
      changed = true;
    } else {
      const fb = html.replace('</head>', `${MANIFEST_LINK}\n</head>`);
      if (fb !== html) { html = fb; changed = true; }
    }
  }

  if (changed) {
    fs.writeFileSync(file, html, 'utf8');
    console.log(`  ✅ ${path.relative(ROOT, file)}`);
    updated++;
  } else {
    skipped++;
  }
}

console.log(`\nDone: ${updated} updated, ${skipped} already had manifest link`);
