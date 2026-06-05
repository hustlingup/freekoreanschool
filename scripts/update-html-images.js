import { readFile, writeFile } from 'node:fs/promises';
import { resolve, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const USE_SUPABASE = process.argv.includes('--supabase');
const SUPABASE_BASE = 'https://juhkgpgrbueaijgfvwoa.supabase.co/storage/v1/object/public/site-images';

function imgSrc(svgPath, pageDir) {
  if (USE_SUPABASE) {
    const storagePath = svgPath.replace('assets/images/', '').replace(/\.svg$/, '.webp');
    return `${SUPABASE_BASE}/${storagePath}`;
  }
  return relative(pageDir, resolve(ROOT, svgPath)).replace(/\\/g, '/');
}

const manifest = JSON.parse(await readFile(resolve(__dirname, 'image-manifest.json'), 'utf8'));

// ── Build food-bg map: bgClass → { svgAbsolute, alt } ──────────────────────
const foodBgMap = {};
for (const entry of (manifest.foodBg || [])) {
  foodBgMap[entry.bgClass] = {
    svgAbsolute: resolve(ROOT, entry.svgPath),
    svgPath: entry.svgPath,
    alt: entry.alt,
  };
}

// ── 1. Process indexed entries (place-image, photo-frame, chef-banner) ──────
const byPage = {};
for (const entry of (manifest.indexed || [])) {
  if (!byPage[entry.page]) byPage[entry.page] = [];
  byPage[entry.page].push(entry);
}

for (const [pagePath, entries] of Object.entries(byPage)) {
  const filePath = resolve(ROOT, pagePath);
  let html = await readFile(filePath, 'utf8');
  const pageDir = dirname(filePath);
  let changed = false;

  const sorted = [...entries].sort((a, b) => a.elementIndex - b.elementIndex);

  for (const entry of sorted) {
    const svgRelative = imgSrc(entry.svgPath, pageDir);
    const cls = entry.element;

    // Find the Nth <div with this class
    const regex = new RegExp(`<div([^>]*\\bclass="[^"]*\\b${cls}\\b[^"]*"[^>]*)>`, 'g');
    let found = null;
    let count = 0;
    let m;
    while ((m = regex.exec(html)) !== null) {
      if (count === entry.elementIndex) { found = m; break; }
      count++;
    }

    if (!found) {
      console.warn(`⚠  Missing .${cls}[${entry.elementIndex}] in ${pagePath}`);
      continue;
    }

    // Idempotency: skip if img already injected
    const ahead = html.slice(found.index, found.index + 300);
    if (ahead.includes('<img ')) continue;

    // Strip gradient background from the opening tag
    const cleanTag = found[0].replace(/\s+style="[^"]*background\s*:[^;"]*(?:;[^"]*)?"/, '');

    // Prepend img right after the opening div tag
    const imgTag = `<img src="${svgRelative}" alt="${entry.alt}" loading="lazy">`;
    html = html.slice(0, found.index) + cleanTag + imgTag + html.slice(found.index + found[0].length);
    changed = true;
  }

  // Remove photo-frame-emoji spans (no longer needed with SVG)
  const hadFrameEmoji = /<span class="photo-frame-emoji">[^<]*<\/span>/.test(html);
  html = html.replace(/<span class="photo-frame-emoji">[^<]*<\/span>/g, '');

  // Remove chef-banner-emoji divs (kfashion uses <div> for these)
  const hadBannerEmoji = /<(?:span|div) class="chef-banner-emoji">[^<]*<\/(?:span|div)>/.test(html);
  html = html.replace(/<(?:span|div) class="chef-banner-emoji">[^<]*<\/(?:span|div)>/g, '');

  // Remove the large place-image emoji spans (no CSS class, inline style)
  if (entries.some(e => e.element === 'place-image')) {
    html = html.replace(/<span style="font-size:5rem;[^"]*">[^<]*<\/span>/g, '');
  }

  if (changed || hadFrameEmoji || hadBannerEmoji) {
    await writeFile(filePath, html, 'utf8');
    console.log(`✓  Updated ${pagePath}`);
  } else {
    console.log(`⏭  No changes: ${pagePath}`);
  }
}

// ── 2. Process food pages (replace food-card-img by bg-* class) ─────────────
const FOOD_PAGES = [
  'culture/ramyeon.html',
  'culture/kbbq.html',
  'culture/kimchi.html',
  'culture/kchicken.html',
  'culture/mandu.html',
];

for (const pagePath of FOOD_PAGES) {
  const filePath = resolve(ROOT, pagePath);
  let html = await readFile(filePath, 'utf8');
  const pageDir = dirname(filePath);

  // Idempotency: skip if any food-card-img already has an <img child
  if (/<div class="food-card-img [^"]*"><img /.test(html)) {
    console.log(`⏭  Already updated: ${pagePath}`);
    continue;
  }

  let count = 0;
  html = html.replace(
    /<div class="food-card-img (bg-[a-z0-9-]+)">/g,
    (match, bgClass) => {
      const entry = foodBgMap[bgClass];
      if (!entry) return match;
      const svgRel = USE_SUPABASE
        ? imgSrc(entry.svgPath, pageDir)
        : relative(pageDir, entry.svgAbsolute).replace(/\\/g, '/');
      count++;
      return `<div class="food-card-img ${bgClass}"><img src="${svgRel}" alt="${entry.alt}" loading="lazy">`;
    }
  );

  if (count > 0) {
    await writeFile(filePath, html, 'utf8');
    console.log(`✓  Updated ${pagePath} (${count} cards)`);
  } else {
    console.log(`⏭  No food-card-img found: ${pagePath}`);
  }
}

console.log('\nDone!');
