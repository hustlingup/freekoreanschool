'use strict';
const fs=require('fs'),path=require('path'),crypto=require('crypto'),assert=require('assert/strict');
const cheerio=require('cheerio');
const {stripEmoji}=require('../js/editorial-cleanup.js');
const {chromium}=require(process.env.KS_QA_MODULE_PATH || 'playwright');
const ROOT=path.resolve(__dirname,'..'),BASE='http://localhost:3000',OUT=path.join(ROOT,'docs/guide-ui-qa');
fs.mkdirSync(OUT,{recursive:true});
const baseline=JSON.parse(fs.readFileSync(path.join(ROOT,'docs/guide-ui-baseline.json')));
const pages=Object.keys(baseline.resources);
const failures=[];
for(const [p,expected] of Object.entries(baseline.jsonHashes)) assert.equal(crypto.createHash('sha256').update(fs.readFileSync(path.join(ROOT,p))).digest('hex'),expected,'Lesson JSON changed: '+p);
for(const p of pages) {
  const html=fs.readFileSync(path.join(ROOT,p),'utf8'),$=cheerio.load(html);
  assert.ok($('body').hasClass('course-page'),p+' not redesigned');
  assert.equal($('#step-shell').length,0,p+' step shell');
  assert.equal($('script[src*="step-runner"]').length,0,p+' step runner');
  assert.equal($('main').length,1,p+' main landmarks');
  assert.equal($('h1').length,1,p+' titles');
  const photos=$('img').map((_,el)=>$(el).attr('src')).get().filter(src=>!/(?:favicon|android-chrome|apple-touch|brand\/)/.test(src));
  assert.deepEqual(photos.sort(),baseline.resources[p].sort(),p+' photo references changed');
  if(/\/(?:flashcard|vocabulary-browser)\.html$/.test(p)) assert.equal($('#lesson-static').length,0,p+' duplicate bank');
  $('script[type="application/ld+json"]').each((_,el)=>JSON.parse($(el).html()));
  $('.course-page-index a').each((_,el)=>{const id=$(el).attr('href').slice(1);assert.equal($('[id]').filter((_,e)=>$(e).attr('id')===id).length,1,p+' toc '+id)});
  const targets=$('.course-page-index a').map((_,el)=>$(el).attr('href')).get();assert.equal(new Set(targets).size,targets.length,p+' repeated TOC targets');
  assert.equal($('.course-toc > .sidebar-link,.course-toc > .sidebar-accordion-btn,.course-toc > .travel-sidebar-header').length,0,p+' legacy navigation outside disclosure');
  const visible=$('main,.course-toc,header').clone();visible.find('script,style,textarea,pre,code,svg').remove();
  assert.equal(stripEmoji(visible.text()),visible.text(),p+' remaining static emojis');
  $('.course-page-index > ol > li').each((i,el)=>{
    const id=$(el).children('a').attr('href').slice(1),target=$('[id]').filter((_,e)=>$(e).attr('id')===id);
    const h=target.is('h2')?target:target.children('h2').first();
    const n=h.find('.section-num').text().trim();if(/^\d+$/.test(n))assert.equal(Number(n),i+1,p+' navigation numbering differs from heading');
  });
}
if(process.argv.includes('--static-only')) {console.log(`PASS: ${pages.length} static reading structures, distinct TOC targets, original data hashes and photo references.`);process.exit(0)}
(async()=>{
  const browser=await chromium.launch({headless:true});
  try {
    const context=await browser.newContext({viewport:{width:1440,height:1000}});
    await context.route('**/*',route=>new URL(route.request().url()).origin===BASE?route.continue():route.abort());
    const page=await context.newPage();let current='';const errors=[];page.on('pageerror',e=>errors.push({page:current,error:e.message}));
    for(const url of ['/learn/hangul.html','/culture/kimchi.html','/travel/cities.html','/quiz.html','/learn/typing.html','/learn/letter-writing.html']) {
      current=url;await page.goto(BASE+url);await page.screenshot({path:path.join(OUT,url.split('/').filter(Boolean).join('-').replace('.html','')+'-desktop.png'),fullPage:false});
    }
    current='/learn/hangul.html';await page.goto(BASE+current);
    const form=page.locator('#lesson-static .study-practice').first();assert.ok(await form.isVisible());
    for(const q of await form.locator('.study-question').all()){const v=await q.getAttribute('data-correct');await q.locator(`input[value="${v}"]`).check();}
    await form.locator('button[type="submit"]').click();assert.match(await form.locator('.study-score').innerText(),/0 unanswered/);
    await form.locator('button[type="reset"]').click();assert.equal(await form.locator('input:checked').count(),0);
    assert.ok(await page.locator('#syllable-builder-widget button').count()>10);
    current='/learn/typing.html';await page.goto(BASE+current);assert.ok(await page.locator('#typing-freeplay-widget').innerText());
    current='/learn/letter-writing.html';await page.goto(BASE+current);assert.ok(await page.locator('#stroke-freeplay-widget svg,#stroke-freeplay-widget canvas').count()>0);
    current='/learn/ja/vocabulary-browser.html';await page.goto(BASE+current);await page.locator('.vb-row').first().waitFor();
    const meaning=await page.locator('.vb-eng').first().innerText();assert.match(meaning,/[\u3040-\u30ff\u4e00-\u9fff]/,'Japanese word browser must stay Japanese');
    current='/learn/vocabulary.html?cat=numbers';await page.goto(BASE+current);assert.match(await page.evaluate(()=>location.hash),/numbers/);
    await page.locator('#lesson-static .bookmark-btn').first().click();assert.equal(await page.locator('#lesson-static .bookmark-btn').first().innerText(),'★');
    current='/learn/flashcard.html';await page.goto(BASE+current);assert.ok((await page.locator('#fc-card').innerText()).length>0);
    current='/quiz.html';await page.goto(BASE+current);assert.equal(await page.locator('.course-quiz-set').count(),10);
    const quiz=page.locator('#quiz-container .study-practice').first();assert.equal(await quiz.locator('.study-question').count(),20);
    await quiz.locator('button[type="submit"]').click();assert.match(await quiz.locator('.study-score').innerText(),/20 unanswered/);
    for(const q of await quiz.locator('.study-question').all()){const v=await q.getAttribute('data-correct');await q.locator(`input[value="${v}"]`).check();}
    await quiz.locator('button[type="submit"]').click();assert.match(await quiz.locator('.study-score').innerText(),/20 of 20 correct/);
    assert.equal(await quiz.locator('input:checked').count(),20,'no auto-advance destroys answers');
    // Every requested public page gets an actual narrow-screen browser check.
    await page.setViewportSize({width:390,height:844});
    for(let i=0;i<pages.length;i++) {
      current='/'+pages[i];await page.goto(BASE+current,{waitUntil:'domcontentloaded'});
      const result=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth-innerWidth,heading:!!document.querySelector('h1'),main:!!document.querySelector('main'),logo:document.querySelector('header .logo-mark')?.getAttribute('src'),emojis:window.EditorialText?.stripEmoji(document.body.innerText)!==document.body.innerText,culprits:[...document.querySelectorAll('main *')].filter(e=>e.getBoundingClientRect().right>innerWidth+2).slice(0,4).map(e=>e.className)}));
      if(result.overflow>1)failures.push({page:current,...result});
      if(!result.heading||!result.main)failures.push({page:current,reason:'missing reading structure'});
      if(result.emojis)failures.push({page:current,reason:'runtime emojis remain'});
      if(i%50===0)console.log(`Mobile checked ${i+1}/${pages.length}`);
    }
    for(const url of ['/learn/hangul.html','/culture/kimchi.html','/travel/cities.html','/quiz.html']) {current=url;await page.goto(BASE+url);await page.screenshot({path:path.join(OUT,url.split('/').filter(Boolean).join('-').replace('.html','')+'-mobile.png'),fullPage:false});}
    const noJS=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
    await noJS.route('**/*',route=>new URL(route.request().url()).origin===BASE?route.continue():route.abort());
    const offline=await noJS.newPage();await offline.goto(BASE+'/learn/hangul.html');
    assert.ok(await offline.locator('#lesson-static').isVisible());await offline.locator('.study-answer summary').first().click();assert.ok(await offline.locator('.study-answer p').first().isVisible());
    await offline.goto(BASE+'/quiz.html');assert.equal(await offline.locator('.study-question').count(),200);await noJS.close();
    const report={staticPages:pages.length,preservedJSONFiles:Object.keys(baseline.jsonHashes).length,preservedPhotoReferences:true,emojiFree:true,navigationNumberingMatchesHeadings:true,errors,failures};
    fs.writeFileSync(path.join(OUT,'results.json'),JSON.stringify(report,null,2));
    assert.deepEqual(errors,[],'Browser script errors');assert.deepEqual(failures,[],'Responsive layout failures');
    console.log(`PASS: ${pages.length} static structures and mobile browser layouts; lesson data and photos preserved; full-page exercises, 200-question quiz, vocabulary translation, bookmarks/flashcards, free-play writing/typing/syllables, and no-JS reading.`);
  } finally {await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
