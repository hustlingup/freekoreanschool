'use strict';
// Run with KS_QA_MODULE_PATH pointing to a temporary install of Playwright.
// Exercises behavior, storage failure, static fallback, and responsive layout.
const fs = require('fs');
const path = require('path');
const assert = require('assert/strict');
const { chromium } = require(path.join(process.env.KS_QA_MODULE_PATH || 'playwright'));
const ROOT = path.resolve(__dirname,'..');
const OUT = path.join(ROOT,'docs','renovation-qa');
fs.mkdirSync(OUT,{recursive:true});
const base = 'http://localhost:3000';
const guideFiles = fs.readdirSync(path.join(ROOT,'guides')).filter(x=>x.endsWith('.html'));
const read = p => fs.readFileSync(path.join(ROOT,p),'utf8');
const localFile = href => {
  const url = new URL(href,base+'/guides/index.html');
  if (url.origin!==base) return null;
  const pathname = decodeURIComponent(url.pathname).replace(/^\//,'');
  return [pathname,pathname+'.html',path.join(pathname,'index.html')].map(x=>path.join(ROOT,x)).find(x=>fs.existsSync(x)&&fs.statSync(x).isFile());
};
for (const file of guideFiles) {
  const html = read('guides/'+file);
  assert.match(html,/<main id="main-content"/);
  assert.match(html,/<link rel="canonical"/);
  assert.match(html,/AI-assisted material/);
  assert.ok(!html.includes('adsbygoogle.js'));
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const href = match[1].replace(/&amp;/g,'&');
    if (/^(?:https?:|mailto:|#)/.test(href)) continue;
    assert.ok(localFile(href),`${file}: broken link ${href}`);
  }
  for (const schema of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) JSON.parse(schema[1]);
}
const locales = require('./_locales.cjs').live();
let checkedAdPages = 0;
for (const l of locales) {
  const prefix=l.code==='en'?'':l.code+'/';
  const home=read(prefix+'index.html');
  assert.ok(!/data-counter="(?:5000|12000|42)"/.test(home));
  assert.match(home,/ks-study-entry:start/);
  for (const n of ['about','contact','privacy','terms','search','quiz']) {
    assert.ok(!read(prefix+n+'.html').includes('adsbygoogle.js'),`${prefix+n} should not request ads`); checkedAdPages++;
  }
  for (const [section,name] of [['learn','flashcard'],['learn','vocabulary-browser'],['travel','planner']]) {
    assert.ok(!read(section+'/'+prefix+name+'.html').includes('adsbygoogle.js')); checkedAdPages++;
  }
  for (const s of read(prefix+'privacy.html').matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) JSON.parse(s[1]);
}
(async()=>{
  const browser = await chromium.launch({headless:true});
  try {
    const context = await browser.newContext({viewport:{width:1440,height:1000}});
    await context.route('**/*',route=>new URL(route.request().url()).origin===base ? route.continue() : route.abort());
    const page=await context.newPage(); const errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    for (const file of guideFiles) {
      const response=await page.goto(base+'/guides/'+file); assert.equal(response.status(),200);
      assert.equal(await page.locator('h1').count(),1);
      const badIds=await page.evaluate(()=>{const ids=[...document.querySelectorAll('[id]')].map(x=>x.id);return ids.filter((id,i)=>ids.indexOf(id)!==i)});
      assert.equal(badIds.length,0,file+' duplicate ids');
      for (const a of await page.locator('a[href^="#"]').all()) {
        const target=await a.getAttribute('href'); assert.equal(await page.locator(target).count(),1,file+' missing anchor '+target);
      }
    }
    await page.goto(base+'/guides/first-conversation.html');
    await page.locator('[name="intro-name"][value="1"]').check();
    await page.locator('[name="intro-bye"][value="1"]').check();
    await page.locator('[name="intro-repeat"][value="0"]').check();
    await page.getByRole('button',{name:'Check my answers'}).click();
    assert.match(await page.locator('.study-score').innerText(),/3 of 3 correct/);
    assert.equal(await page.locator('details[open]').count(),3);
    await page.getByRole('button',{name:'Try again'}).click();
    assert.equal(await page.locator('input:checked').count(),0);
    assert.equal(await page.locator('.study-score').innerText(),'');
    await page.getByRole('button',{name:'Check my answers'}).click();
    assert.match(await page.locator('.study-score').innerText(),/3 unanswered/);
    await page.locator('[name="intro-name"][value="0"]').check();
    await page.getByRole('button',{name:'Check my answers'}).click();
    assert.equal(await page.locator('[data-result="retry"]').count(),1);
    // Every exercise's authored answer must agree with its scoring data.
    for (const file of ['particles.html','korean-numbers.html','order-at-a-cafe.html']) {
      await page.goto(base+'/guides/'+file);
      for (const q of await page.locator('.study-question').all()) {
        const correct=await q.getAttribute('data-correct');
        await q.locator(`input[value="${correct}"]`).check();
      }
      await page.getByRole('button',{name:'Check my answers'}).click();
      assert.match(await page.locator('.study-score').innerText(),/3 of 3 correct/);
    }
    await page.goto(base+'/guides/start-here.html');
    await page.locator('[data-study-day="1"]').check();
    await page.reload(); assert.ok(await page.locator('[data-study-day="1"]').isChecked());
    await page.getByRole('button',{name:'Clear my checklist'}).click(); assert.equal(await page.locator('input:checked').count(),0);
    await page.locator('#study-level').selectOption('sentences');
    await page.getByRole('button',{name:'Find my next lesson'}).click();
    assert.equal(await page.locator('#study-route-result a').getAttribute('href'),'/guides/particles.html');
    await page.goto(base+'/'); await page.screenshot({path:path.join(OUT,'home-desktop.png'),fullPage:false});
    assert.equal(await page.locator('.ks-study-entry-card').count(),5);
    await page.goto(base+'/search.html?q=cafe');
    await page.locator('a[href="/guides/order-at-a-cafe.html"]').first().waitFor();
    await page.goto(base+'/learn/hangul.html');
    assert.equal(await page.locator('#step-shell').count(),0);
    assert.ok(await page.locator('#lesson-static .study-practice').count()>0);
    assert.ok(await page.locator('#lesson-static').isVisible());
    await page.goto(base+'/guides/particles.html'); await page.screenshot({path:path.join(OUT,'guide-desktop.png'),fullPage:false});
    const mobileFiles=['/','/ja/','/privacy.html','/ja/privacy.html',...guideFiles.map(f=>'/guides/'+f)];
    await page.setViewportSize({width:390,height:844});
    for (const url of mobileFiles) {
      await page.goto(base+url);
      const overflow=await page.evaluate(()=>({screen:window.innerWidth,body:document.documentElement.scrollWidth}));
      assert.ok(overflow.body<=overflow.screen+1,`${url} mobile overflow: ${JSON.stringify(overflow)}`);
    }
    await page.goto(base+'/guides/order-at-a-cafe.html'); await page.screenshot({path:path.join(OUT,'guide-mobile.png'),fullPage:false});
    await page.goto(base+'/'); await page.screenshot({path:path.join(OUT,'home-mobile.png'),fullPage:false});
    assert.deepEqual(errors,[],'browser JavaScript errors');
    const noJS=await browser.newContext({javaScriptEnabled:false});
    await noJS.route('**/*',route=>new URL(route.request().url()).origin===base?route.continue():route.abort());
    const staticPage=await noJS.newPage(); await staticPage.goto(base+'/guides/particles.html');
    assert.ok(await staticPage.getByRole('heading',{name:'Use one scene to see the roles'}).isVisible());
    await staticPage.locator('.study-answer summary').first().click();
    assert.ok(await staticPage.locator('.study-answer p').first().isVisible());
    await noJS.close();
    const denied=await browser.newContext(); await denied.addInitScript(()=>Object.defineProperty(window,'localStorage',{get(){throw new Error('Storage disabled')}}));
    await denied.route('**/*',route=>new URL(route.request().url()).origin===base?route.continue():route.abort());
    const deniedPage=await denied.newPage(); await deniedPage.goto(base+'/guides/start-here.html');
    await deniedPage.locator('[data-study-day="1"]').check();
    assert.match(await deniedPage.locator('#study-week-status').innerText(),/Storage unavailable/);
    await denied.close();
    const report=`PASS: ${guideFiles.length} static guides; ${checkedAdPages} ad-free utility/policy pages; quiz feedback, reset, unanswered and wrong answers; local storage, reload and storage-denied fallback; route recommendation; complete static lessons with inline practice; guide search discovery; ${mobileFiles.length} mobile layouts; no-JavaScript answers; no browser JavaScript errors.\n`;
    fs.writeFileSync(path.join(OUT,'results.txt'),report);console.log(report);
  } finally {await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
