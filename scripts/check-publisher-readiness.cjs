'use strict';
const fs=require('fs'),path=require('path'),assert=require('assert/strict');
const {chromium}=require(process.env.KS_QA_MODULE_PATH||'playwright');
const AxeBuilder=require(path.join(path.dirname(process.env.KS_QA_MODULE_PATH||require.resolve('playwright')),'@axe-core/playwright')).default;
const ROOT=path.resolve(__dirname,'..'),OUT=path.join(ROOT,'docs/publisher-audit');
fs.mkdirSync(OUT,{recursive:true});
const base='http://localhost:3000',layouts=[],accessibility=[],requests=[],errors=[];
async function run(){
 const browser=await chromium.launch({headless:true});
 try{
  for(const width of [360,768,1440]){
   const ctx=await browser.newContext({viewport:{width,height:900}});
   await ctx.route('**/*',route=>{const url=route.request().url();if(/adsbygoogle|googletagmanager|google-analytics/.test(url))requests.push(url);return new URL(url).origin===base?route.continue():route.abort();});
   const page=await ctx.newPage();page.on('pageerror',e=>errors.push(e.message));
   for(const file of ['/guides/restaurant-confidence.html','/guides/subway-first-journey.html','/about.html','/ja/about.html','/privacy.html','/ja/privacy.html','/learn/index.html','/culture/index.html','/travel/index.html','/quiz.html']){
    const r=await page.goto(base+file);assert.equal(r.status(),200,file);
    assert.equal(await page.locator('meta[name="ks-publisher-release"]').getAttribute('content'),'2026-10-02-editorial');
    const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);assert.equal(overflow,false,width+' '+file+' horizontal overflow');
    layouts.push({width,file,pass:true});
    if(width===360&&file==='/guides/restaurant-confidence.html')await page.screenshot({path:path.join(OUT,'restaurant-360.png')});
    if(width===1440&&file==='/guides/subway-first-journey.html')await page.screenshot({path:path.join(OUT,'subway-1440.png')});
   }
   if(width===360){
    for(const slug of ['restaurant-confidence','subway-first-journey']){
     await page.goto(base+'/guides/'+slug+'.html');
     for(const q of await page.locator('.study-question').all())await q.locator('input[value="'+await q.getAttribute('data-correct')+'"]').check();
     await page.getByRole('button',{name:'Check my answers'}).click();assert.match(await page.locator('.study-score').innerText(),/4 of 4 correct/);assert.equal(await page.locator('.study-answer[open]').count(),4);
     await page.getByRole('button',{name:'Try again'}).click();assert.equal(await page.locator('input:checked').count(),0);assert.equal(await page.locator('.study-answer[open]').count(),0);
     const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze();accessibility.push({file:slug,violations:axe.violations});assert.equal(axe.violations.length,0,slug+' accessibility');
    }
    await page.goto(base+'/ja/quiz.html#quiz-set-6');
    await page.locator('#quiz-question-101 .study-answer summary').click();
    await page.locator('a[href="/quiz.html#quiz-question-101"]').click();
    assert.equal(await page.locator('#quiz-set-6').isVisible(),true);assert.equal(await page.locator('#quiz-question-101 .study-answer').getAttribute('open'),'');
    assert.match(await page.locator('#quiz-question-101 .quiz-explanation').innerText(),/topic particle/);
    await page.goto(base+'/quiz.html#quiz-question-161');
    assert.equal(await page.locator('#quiz-set-9').isVisible(),true);assert.equal(await page.locator('#quiz-question-161 .study-answer').getAttribute('open'),'');
    assert.match(await page.locator('#quiz-question-161 .quiz-explanation').innerText(),/not a sourced claim/);
    await page.locator('#quiz-question-161').scrollIntoViewIfNeeded();await page.screenshot({path:path.join(OUT,'quiz-explanation-360.png')});
    await page.goto(base+'/culture/index.html');
    await page.locator('.publisher-note summary').click();assert.match(await page.locator('.publisher-note').innerText(),/Independent review/);
    const axe=await new AxeBuilder({page}).include('.publisher-note').withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze();accessibility.push({file:'culture publisher note',violations:axe.violations});assert.equal(axe.violations.length,0,'publisher note accessibility');
   }
   await ctx.close();
  }
  const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:360,height:900}});await nojs.route('**/*',r=>new URL(r.request().url()).origin===base?r.continue():r.abort());const page=await nojs.newPage();await page.goto(base+'/guides/subway-first-journey.html');assert.equal(await page.locator('.study-question').count(),4);await page.locator('.study-answer summary').first().click();assert.match(await page.locator('.study-answer[open]').innerText(),/transfer/);await page.goto(base+'/quiz.html');assert.equal(await page.locator('.study-question .quiz-explanation[data-experience-generated]').count(),239);await nojs.close();
  assert.equal(requests.length,0,'Ad or Analytics request attempted');assert.deepEqual(errors,[],'Browser errors');
  const report={pass:true,layouts,accessibility,noJavaScript:true,guideScoringAndReset:true,translatedExplanationNavigation:true,quizDeepLink:true,optionalTrackingRequests:requests,browserErrors:errors};fs.writeFileSync(path.join(OUT,'browser.json'),JSON.stringify(report,null,2)+'\n');console.log(`PASS: ${layouts.length} layouts, 3 accessibility samples, 8 explained guide questions, quiz explanation links/deep links, no-JavaScript answers, no ad/Analytics requests, no browser errors.`);
 }finally{await browser.close();}
}
run().catch(e=>{fs.writeFileSync(path.join(OUT,'browser.json'),JSON.stringify({pass:false,error:e.message,layouts,accessibility,requests,errors},null,2)+'\n');console.error(e);process.exitCode=1;});
