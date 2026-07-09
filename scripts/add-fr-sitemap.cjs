#!/usr/bin/env node
'use strict';
const fs   = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '..', 'sitemap.xml');
let xml = fs.readFileSync(FILE, 'utf8');

// Before every x-default line, insert a fr alternate.
// Pattern: the es line immediately precedes x-default in every block.
// We replace:   hreflang="es"      href="X"
//               <xhtml:link rel="alternate" hreflang="x-default"
// With:         hreflang="es"      href="X"
//               <xhtml:link rel="alternate" hreflang="fr"      href="FR_URL"/>
//               <xhtml:link rel="alternate" hreflang="x-default"

let count = 0;

xml = xml.replace(
  /(<xhtml:link rel="alternate" hreflang="es"\s+href="([^"]+)"[^>]*\/>)\s*\n(\s*)(<xhtml:link rel="alternate" hreflang="x-default")/g,
  (match, esLine, esUrl, indent, xdefLine) => {
    // Derive fr URL from es URL
    const frUrl = esUrl
      .replace('freekoreanschool.com/es/', 'freekoreanschool.com/fr/')
      .replace('freekoreanschool.com/es', 'freekoreanschool.com/fr')
      .replace('freekoreanschool.com/culture/es/', 'freekoreanschool.com/culture/fr/')
      .replace('freekoreanschool.com/culture/es', 'freekoreanschool.com/culture/fr')
      .replace('freekoreanschool.com/travel/es/', 'freekoreanschool.com/travel/fr/')
      .replace('freekoreanschool.com/travel/es', 'freekoreanschool.com/travel/fr')
      .replace('freekoreanschool.com/news/es/', 'freekoreanschool.com/news/fr/')
      .replace('freekoreanschool.com/learn/es/', 'freekoreanschool.com/learn/fr/')
      // For en-only URLs (no es mirror), the es hreflang = en URL, so fr won't match above
      // But in those cases esUrl will equal the en URL — we need to construct fr URL
      ;

    // If fr URL = es URL (no es mirror in this block), construct fr URL from the en URL pattern
    // by treating the es line as a copy of en, then fr would equal the same URL
    // In our sitemap, es URLs always have /es/ or look like the en URL — check:
    let finalFrUrl = frUrl;
    if (frUrl === esUrl) {
      // This es hreflang is pointing to an en URL (no dedicated es mirror) → skip fr too
      return match; // no change
    }

    count++;
    return `${esLine}\n${indent}<xhtml:link rel="alternate" hreflang="fr"      href="${finalFrUrl}"/>\n${indent}${xdefLine}`;
  }
);

fs.writeFileSync(FILE, xml, 'utf8');
console.log(`✓ sitemap.xml — ${count} fr hreflang entries added`);
