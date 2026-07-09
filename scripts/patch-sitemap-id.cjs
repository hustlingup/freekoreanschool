'use strict';
const fs   = require('fs');
const path = require('path');
const file = path.join(__dirname, '..', 'sitemap.xml');

let xml = fs.readFileSync(file, 'utf8');

// Insert hreflang="id" line after every hreflang="es" line
// by replacing /es/ with /id/ in the URL and es with id in the hreflang attribute
xml = xml.replace(
  /(<xhtml:link rel="alternate" hreflang="es"[^>]*\/>)/g,
  (esLine) => {
    const idLine = esLine
      .replace(/hreflang="es"/, 'hreflang="id"')
      .replace(/\/es\//g, '/id/');
    return `${esLine}\n    ${idLine}`;
  }
);

// Add id URL entries for the id/ mirror pages (duplicating es/* <url> blocks)
const esUrlRe = /<url>\s*<loc>([^<]*\/es\/[^<]*)<\/loc>([\s\S]*?)<\/url>/g;
let idUrls = '';
let match;
while ((match = esUrlRe.exec(xml)) !== null) {
  const idUrl = match[1].replace('/es/', '/id/');
  const innerBlock = match[2]
    .replace(/\/es\//g, '/id/')
    .replace(/hreflang="id"/g, 'hreflang="id"'); // no-op, kept for clarity
  idUrls += `\n  <url>\n    <loc>${idUrl}</loc>${innerBlock}</url>`;
}

if (idUrls) {
  xml = xml.replace('</urlset>', idUrls + '\n\n</urlset>');
}

fs.writeFileSync(file, xml, 'utf8');
console.log('✓ patched sitemap.xml');
console.log(`  — added hreflang="id" to existing url blocks`);
console.log(`  — added ${(idUrls.match(/<url>/g) || []).length} id mirror <url> entries`);
