'use strict';
const fs   = require('fs');
const path = require('path');
const file = path.join(__dirname, '..', 'sitemap.xml');

let xml = fs.readFileSync(file, 'utf8');

// Insert hreflang="de" line after every hreflang="fr" line
// by replacing /fr/ with /de/ in the URL and fr with de in the hreflang attribute
xml = xml.replace(
  /(<xhtml:link rel="alternate" hreflang="fr"[^>]*>)/g,
  (frLine) => {
    const deLine = frLine
      .replace(/hreflang="fr"/, 'hreflang="de"')
      .replace(/\/fr\//g, '/de/');
    return `${frLine}\n    ${deLine}`;
  }
);

// Also add de URL entries for the de/ mirror pages (after fr/ entries)
// The sitemap already has fr/* entries — we need de/* entries too.
// Strategy: for each <url> block that has /fr/ in its <loc>, also add a <url> block for /de/.
// Actually, the sitemap should also include the de mirror pages as their own <url> entries.
// Let's add them by duplicating fr/* entries and replacing with de/*.

// Find all standalone url entries for fr mirrors and add de equivalents
// Pattern: <url>\n    <loc>...fr...<\loc>...<\/url>
const frUrlRe = /<url>\s*<loc>([^<]*\/fr\/[^<]*)<\/loc>([\s\S]*?)<\/url>/g;
let deUrls = '';
let match;
while ((match = frUrlRe.exec(xml)) !== null) {
  const deUrl = match[1].replace('/fr/', '/de/');
  const innerBlock = match[2]
    .replace(/\/fr\//g, '/de/')
    .replace(/hreflang="fr"/g, 'hreflang="de"');
  deUrls += `\n  <url>\n    <loc>${deUrl}</loc>${innerBlock}</url>`;
}

if (deUrls) {
  // Append de url entries before closing </urlset>
  xml = xml.replace('</urlset>', deUrls + '\n\n</urlset>');
}

fs.writeFileSync(file, xml, 'utf8');
console.log('✓ patched sitemap.xml');
console.log(`  — added hreflang="de" to existing url blocks`);
console.log(`  — added ${(deUrls.match(/<url>/g) || []).length} de mirror <url> entries`);
