'use strict';
// Targeted UI rebuild; localized copy and guide destinations come from each page.
const fs=require('fs'),path=require('path'),cheerio=require('cheerio');
const REG=require('./_locales.cjs'),redesign=require('./_hub-hero.cjs');
const ROOT=path.resolve(__dirname,'..');let count=0;
for(const loc of REG.live())for(const section of ['culture','travel']) {
  const file=path.join(ROOT,section,loc.code==='en'?'':loc.code,'index.html');
  const before=fs.readFileSync(file,'utf8'),$=cheerio.load(before);
  redesign($,section,loc.code);
  const out=$.html().replace(/[\t ]+$/gm,'');if(out!==before)fs.writeFileSync(file,out);
  count++;
}
console.log(`Updated ${count} hub heroes with localized copy and solid backgrounds.`);
require('./build-experience.cjs');
