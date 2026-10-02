'use strict';
const fs=require('fs'),path=require('path'),assert=require('assert/strict');
const {chromium}=require(process.env.KS_QA_MODULE_PATH||'playwright');
const cheerio=require('cheerio');
const ROOT=path.resolve(__dirname,'..'),OUT=path.join(ROOT,'docs/experience-qa'),BASE='http://localhost:3000';
fs.mkdirSync(OUT,{recursive:true});
const locales=require('./_locales.cjs').live();
const failures=[],errors=[];
for(const file of Object.keys(JSON.parse(fs.readFileSync(path.join(ROOT,'docs/guide-ui-baseline.json'),'utf8')).resources)){
 const $=cheerio.load(fs.readFileSync(path.join(ROOT,file),'utf8'));
 assert.equal($('body > title,body > meta,body > link').length,0,file+' has misplaced metadata');
 assert.equal($('head title').length,1,file+' title');assert.equal($('head link[rel=canonical]').length,1,file+' canonical');
}
for(const loc of locales){
 const file=`learn/${loc.code==='en'?'':loc.code+'/'}index.html`,$=cheerio.load(fs.readFileSync(path.join(ROOT,file),'utf8'));
 assert.equal($('h1').length,1);assert.equal($('.learn-card').length,18);assert.equal($('link[rel=alternate]').length,11);
 $('script[type="application/ld+json"]').each((_,el)=>JSON.parse($(el).html()));
 $('[href^="/"],[src^="/"]').each((_,el)=>{const url=$(el).attr('href')||$(el).attr('src');if(url.includes('#'))return;const target=path.join(ROOT,url);assert.ok([target,target+'.html',path.join(target,'index.html')].some(p=>fs.existsSync(p)),file+' broken resource '+url);});
}
(async()=>{
 const browser=await chromium.launch({headless:true});
 const context=await browser.newContext({viewport:{width:1440,height:1050}});
 await context.route('**/*',route=>new URL(route.request().url()).origin===BASE?route.continue():route.abort());
 const page=await context.newPage();page.on('pageerror',e=>errors.push({url:page.url(),error:e.message}));
 const go=url=>page.goto(BASE+url,{waitUntil:'load'});
 try{
  await go('/learn/index.html');
  assert.equal(await page.locator('.learn-card:visible').count(),18);
  await page.locator('[data-filter=foundations]').click();assert.equal(await page.locator('.learn-card:visible').count(),3);
  await page.locator('[data-explore-search]').fill('zzzz_no_match');assert.ok(await page.locator('[data-explore-empty]').isVisible());
  await page.locator('[data-explore-clear]').click();assert.equal(await page.locator('.learn-card:visible').count(),18);
  await go('/learn/hangul.html');await page.getByRole('button',{name:'Save for later',exact:true}).click();await page.getByRole('button',{name:'Mark as studied',exact:true}).click();
  await page.locator('.course-page-index a').nth(2).click();await page.waitForTimeout(150);
  await go('/learn/index.html');assert.ok(await page.locator('[data-resume]').isVisible());assert.equal(await page.locator('[data-study-slug=hangul]').getAttribute('data-studied'),'true');await page.locator('[data-filter=saved]').click();assert.equal(await page.locator('.learn-card:visible').count(),1);await page.locator('[data-explore-clear]').click();
  await go('/learn/hangul.html');assert.equal(await page.getByRole('button',{name:'Saved',exact:true}).getAttribute('aria-pressed'),'true');
  await page.evaluate(()=>LangManager.setLang('ja'));await page.waitForURL('**/learn/ja/hangul*');
  await go('/learn/ja/index.html');await page.evaluate(()=>LangManager.setLang('en'));await page.waitForURL(/\/learn\/?(?:index.html)?$/);
  await go('/culture/index.html');await page.locator('[data-filter=food]').click();assert.equal(await page.locator('.travel-promo-card:visible').count(),1);
  await page.locator('[data-explore-clear]').click();assert.equal(await page.locator('.travel-promo-card:visible').count(),9);
  await go('/culture/kimchi.html');await page.getByRole('button',{name:'Save for later',exact:true}).click();await go('/culture/index.html');assert.ok(await page.locator('[data-saved-page="culture/kimchi"]').isVisible());
  await go('/quiz.html');assert.equal(await page.locator('.course-quiz-set:visible').count(),1);
  assert.ok(await page.locator('.quiz-explanation').count()>=30,'Alphabet answers must include lesson explanations');
  assert.ok(await page.locator('.study-question').evaluateAll(qs=>qs.filter(q=>q.querySelector('label input').value!==q.dataset.correct).length)>130,'Correct options must not always be first');
  await page.locator('[data-quiz-link=quiz-set-3]').click();assert.ok(await page.locator('#quiz-set-3').isVisible());
  await page.reload();assert.ok(await page.locator('#quiz-set-3').isVisible());
  await page.locator('[data-quiz-link=quiz-set-1]').click();
  const form=page.locator('#quiz-set-1 .study-practice'),questions=await form.locator('.study-question').all();
  await form.locator('button[type=submit]').click();assert.match(await form.locator('.study-score').innerText(),/20 unanswered/);
  for(const [i,q] of questions.entries()){const correct=await q.getAttribute('data-correct');await q.locator(`input[value="${i===0?(Number(correct)+1)%4:correct}"]`).check();}
  await form.locator('button[type=submit]').click();assert.match(await form.locator('.study-score').innerText(),/19 of 20/);
  await form.getByRole('button',{name:'Review missed answers',exact:true}).click();assert.equal(await form.locator('.study-question:visible').count(),1);
  await form.getByRole('button',{name:'Show all questions',exact:true}).click();assert.equal(await form.locator('.study-question:visible').count(),20);
  await page.reload();assert.equal(await form.locator('input:checked').count(),20);
  await form.locator('button[type=submit]').click();
  await form.locator('button[type=reset]').click();await page.waitForFunction(()=>document.querySelector('#quiz-set-1 progress').value===0);assert.equal(await form.locator('input:checked').count(),0);
  for(const q of await form.locator('.study-question').all()){const v=await q.getAttribute('data-correct');await q.locator(`input[value="${v}"]`).check();}
  await form.locator('button[type=submit]').click();await form.getByRole('button',{name:'Review missed answers',exact:true}).click();assert.equal(await form.locator('.study-question:visible').count(),0);assert.match(await form.locator('.quiz-review-tools + p').innerText(),/All correct/);
  await page.emulateMedia({media:'print'});assert.equal(await page.locator('.course-quiz-set:visible').count(),10);assert.equal(await page.locator('.study-question:visible').count(),200);await page.emulateMedia({media:'screen'});
  // All new entrances, each locale, at mobile and desktop widths.
  for(const width of [360,768,1440]){
   await page.setViewportSize({width,height:950});
   for(const loc of locales){const sub=loc.code==='en'?'':loc.code+'/';for(const url of [`/learn/${sub}index.html`,`/culture/${sub}index.html`,`/travel/${sub}index.html`,`/${sub}quiz.html`]){
    await go(url);const result=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth-innerWidth,heading:document.querySelectorAll('h1').length,blankButtons:[...document.querySelectorAll('button')].filter(b=>b.offsetWidth&&!b.textContent.trim()&&!b.getAttribute('aria-label')).length}));
    if(result.overflow>1||result.heading!==1||result.blankButtons)failures.push({width,url,...result});
    if(loc.code==='en'&&width!==768)await page.screenshot({path:path.join(OUT,`${url.split('/').filter(Boolean).join('-').replace('.html','')}-${width}.png`)});
   }}console.log(`Checked all locale entrances at ${width}px.`);
  }
  // Semantic and contrast audit of the new library, reading page, and quiz.
  const {default:AxeBuilder}=require(path.join(path.dirname(process.env.KS_QA_MODULE_PATH),'@axe-core/playwright'));
  const accessibility=[];
  for(const url of ['/learn/index.html','/learn/hangul.html','/culture/index.html','/travel/index.html','/quiz.html']){
   await go(url);const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();accessibility.push({url,violations:result.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))});
  }
  fs.writeFileSync(path.join(OUT,'accessibility.json'),JSON.stringify(accessibility,null,2));assert.deepEqual(accessibility.filter(p=>p.violations.length),[],'WCAG A/AA audit');
  const noJS=await browser.newContext({javaScriptEnabled:false});await noJS.route('**/*',r=>new URL(r.request().url()).origin===BASE?r.continue():r.abort());const reader=await noJS.newPage();
  await reader.goto(BASE+'/learn/index.html');assert.equal(await reader.locator('.learn-card:visible').count(),18);
  await reader.goto(BASE+'/quiz.html');assert.equal(await reader.locator('.study-question:visible').count(),200);await reader.locator('.study-answer summary').first().click();assert.ok(await reader.locator('.study-answer p').first().isVisible());await noJS.close();
  const denied=await browser.newContext();await denied.route('**/*',r=>new URL(r.request().url()).origin===BASE?r.continue():r.abort());await denied.addInitScript(()=>{Object.defineProperty(window,'localStorage',{get(){throw new DOMException('Denied','SecurityError');}});});const privatePage=await denied.newPage();privatePage.on('pageerror',e=>errors.push({url:privatePage.url(),error:e.message}));
  await privatePage.goto(BASE+'/learn/hangul.html');await privatePage.getByRole('button',{name:'Mark as studied',exact:true}).click();assert.match(await privatePage.locator('.experience-storage-note').innerText(),/unavailable/);await privatePage.goto(BASE+'/quiz.html');assert.equal(await privatePage.locator('.course-quiz-set:visible').count(),1);await denied.close();
  fs.writeFileSync(path.join(OUT,'results.json'),JSON.stringify({entranceLayouts:120,failures,errors,checks:['filters and empty states','study state survives navigation','same-page language switching','quiz selection and deep links','wrong/missing/correct answers','review and reset','quiz drafts survive reload','print all questions','no-JavaScript reading','storage-denied fallback']},null,2));
  assert.deepEqual(failures,[]);assert.deepEqual(errors,[]);console.log('PASS: experience interactions, 120 entrance layouts, no-JS, print, and storage fallback. See accessibility.json for audit.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
