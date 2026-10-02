'use strict';
const fs=require('fs'),path=require('path'),assert=require('assert/strict'),cheerio=require('cheerio');
const {chromium}=require(process.env.KS_QA_MODULE_PATH||'playwright');
const root=path.resolve(__dirname,'..'),out=path.join(root,'docs/learning-visuals');
const manifest=JSON.parse(fs.readFileSync(path.join(out,'manifest.json'))),placements=JSON.parse(fs.readFileSync(path.join(out,'placements.json')));
const assets=new Map(manifest.assets.map(a=>[a.id,a]));let count=0;
for(const p of placements.pages){const q=cheerio.load(fs.readFileSync(path.join(root,p.page),'utf8'));assert.equal(q('main').length,1,p.page);q('img[data-learning-visual]').each((_,el)=>{const im=q(el),a=assets.get(im.attr('data-learning-visual'));assert.equal(a.status,'uploaded');assert.equal(im.attr('src'),a.publicUrl);assert.ok(im.attr('alt'));assert.equal(im.attr('loading'),'lazy');assert.ok(Number(im.attr('width'))>0);assert.ok(fs.existsSync(path.join(root,a.path)));count++;});}
assert.equal(count,placements.placements);
async function run(){const browser=await chromium.launch({headless:true});const results=[];try{
 for(const width of [360,768,1440]){
  const context=await browser.newContext({viewport:{width,height:1000}});
  // Test deployed image URLs using the exact verified local bytes, avoiding third-party latency.
  await context.route('**/*',async route=>{const u=new URL(route.request().url());if(u.origin==='http://localhost:3000')return route.continue();const a=manifest.assets.find(a=>a.publicUrl===u.href);if(a)return route.fulfill({path:path.join(root,a.path),contentType:'image/webp'});return route.abort();});
  const page=await context.newPage();
  for(const p of ['/learn/vocabulary.html','/learn/ja/vocabulary.html','/learn/nouns.html','/learn/dialogues.html','/travel/cities.html','/travel/index.html','/travel/itineraries.html','/learn/index.html']){
   await page.goto('http://localhost:3000'+p);const images=page.locator('img[data-learning-visual]');const number=await images.count();
   if(number){await images.first().scrollIntoViewIfNeeded();await images.first().evaluate(im=>im.decode());}
   const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);assert.equal(overflow,false,p+' horizontal overflow '+width);
   if(number){const box=await images.first().boundingBox();assert.ok(box.width>60,p+' invisible image');}
   if(width!==768)await page.screenshot({path:path.join(out,p.split('/').filter(Boolean).join('-').replace('.html','')+'-'+width+'.png')});
   results.push({page:p,width,images:number,overflow});
  }
  await page.goto('http://localhost:3000/learn/vocabulary.html');const card=page.locator('.visual-word-table tbody tr').first();assert.ok(await card.locator('.course-audio').count()>0,'Audio controls lost');assert.ok(await card.locator('.bookmark-btn').count()>0,'Save controls lost');
  await context.close();
 }
}finally{await browser.close();}
 fs.writeFileSync(path.join(out,'layout-checks.json'),JSON.stringify({staticPlacements:count,results},null,2)+'\n');console.log(JSON.stringify({staticPlacements:count,browserChecks:results.length,passed:true}));}
run().catch(e=>{console.error(e);process.exitCode=1});
