'use strict';
// Static migration to the guide reading layout. No source lesson JSON or photo
// files are modified. Re-run after rebuilding static lesson content.
const fs=require('fs'), path=require('path'), crypto=require('crypto');
const cheerio=require('cheerio');
const REG=require('./_locales.cjs');
const COPY=require('./_course-labels.cjs');
const HOME_COPY=require('./_course-home-copy.cjs');
const cleanEditorialHTML=require('./_editorial-cleanup.cjs');
const {stripEmoji}=require('../js/editorial-cleanup.js');
const redesignHubHero=require('./_hub-hero.cjs');
const {buildBlock,PAGES,START,END}=require('./gen-lesson-static.cjs');
const ROOT=path.resolve(__dirname,'..');
const read=p=>fs.readFileSync(path.join(ROOT,p),'utf8');
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const save=(p,s)=>{
  const target=path.join(ROOT,p),tmp=target+'.guide-'+process.pid+'.tmp';
  fs.writeFileSync(tmp,s,'utf8');
  try {
    for(let i=0;;i++) {
      try {fs.renameSync(tmp,target);break;}
      catch(error) {if(i===3)throw error;Atomics.wait(new Int32Array(new SharedArrayBuffer(4)),0,0,25);}
    }
  } finally {if(fs.existsSync(tmp))fs.unlinkSync(tmp);}
};
const hash=p=>crypto.createHash('sha256').update(fs.readFileSync(path.join(ROOT,p))).digest('hex');
const vm=require('vm');
const appSource=read('js/app.js');
function literal(head,close) {const start=appSource.indexOf(head);const end=appSource.indexOf(close,start)+close.length;return vm.runInNewContext('('+appSource.slice(start+head.length,end).trim().replace(/;$/,'')+')');}
const quizData=literal('window.QUIZ_DATA = ','\n};');
const levels=literal('  const LEVELS = ','\n  ];');
const packs={};
for(const loc of REG.live()) {
  if(loc.code==='en') {packs.en={dict:{},special:{}};continue;}
  let dict={};const win={};const lm={register:(_,d)=>{dict=d}};win.LangManager=lm;
  vm.runInNewContext(read('js/langs/lang-'+loc.code+'.js'),{window:win,LangManager:lm});
  packs[loc.code]={dict,special:win.QUIZ_JA||win.QUIZ_ZH_TW||{}};
}
function quizWorksheet(code) {
  const c=COPY[code],pack=packs[code],seen=new Set();
  return Object.entries(quizData).map(([n,questions])=>{
    const level=levels[Number(n)],title=code==='ja'?level.ja:code==='zh-tw'?(level.zh||level.name):(pack.dict[level.name]||level.name);
    const rows=questions.filter(q=>{const key=q.q+'|'+q.choices.join('|');if(seen.has(key))return false;seen.add(key);return true;});
    if(!rows.length)return '';
    return `<section class="course-quiz-set" id="quiz-set-${n}"><h2>${n} · ${esc(title)}</h2><form class="study-practice" data-practice="quiz-${n}">${rows.map((q,i)=>{
      const trans=pack.special[q.q];const prompt=trans?.qja||trans?.qzh||pack.dict[q.q]||q.q;
      const choices=trans?.choicesja||trans?.choiceszh||q.choices.map(choice=>pack.dict[choice]||choice);
      const english=code!=='en'&&prompt===q.q&&/[a-zA-Z]{3}/.test(prompt)?' lang="en"':'';
      return `<fieldset class="study-question" data-correct="${q.answer}"><legend${english}>${i+1}. ${esc(prompt)}</legend>${choices.map((v,j)=>`<label><input type="radio" name="quiz-${n}-${i}" value="${j}"><span>${esc(v)}</span></label>`).join('')}<p class="study-feedback" aria-live="polite"></p><details class="study-answer"><summary>${c.answer}</summary><p>${esc(choices[q.answer])}</p></details></fieldset>`;
    }).join('')}<button class="btn btn-primary" type="submit">${c.check}</button> <button class="btn btn-outline" type="reset">${c.reset}</button><p class="study-score" role="status"></p></form></section>`;
  }).join('');
}
const files=[];
for(const loc of REG.live()) {
  if(!COPY[loc.code]) throw new Error('Missing course labels: '+loc.code);
  for(const section of ['learn','culture','travel']) {
    const dir=section+'/'+(loc.code==='en'?'':loc.code+'/');
    for(const name of fs.readdirSync(path.join(ROOT,dir)).filter(n=>n.endsWith('.html'))) files.push({p:dir+name,section,code:loc.code,slug:name.slice(0,-5)});
  }
  files.push({p:(loc.code==='en'?'':loc.code+'/')+'quiz.html',section:'quiz',code:loc.code,slug:'quiz'});
}
const baselineFile='docs/guide-ui-baseline.json';
if(!fs.existsSync(path.join(ROOT,baselineFile))) {
  const resources={};
  for(const {p} of files) {const $=cheerio.load(read(p));resources[p]=$('img').map((_,el)=>$(el).attr('src')).get().filter(src=>!/(?:favicon|android-chrome|apple-touch|brand\/)/.test(src));}
  const jsonHashes=Object.fromEntries(fs.readdirSync(path.join(ROOT,'learn/data')).filter(n=>n.endsWith('.json')).map(n=>['learn/data/'+n,hash('learn/data/'+n)]));
  save(baselineFile,JSON.stringify({resources,jsonHashes},null,2));
}
save('js/course-labels.js','/* Generated from scripts/_course-labels.cjs. */\nwindow.CourseStrings='+JSON.stringify(COPY,null,2)+';\n');
let duplicateParagraphs=0, removedBanks=0, removedRunners=0;
const report=[];
for(const f of files) {
  const {p,section,code,slug}=f,c=COPY[code];let raw=read(p);
  const prefix=code==='en'?'':code+'/';
  const tools=section==='learn' && ['flashcard','vocabulary-browser'].includes(slug);
  // Rebuild exactly the translated content from the shared data, once.
  if(section==='learn' && PAGES[slug]) {
    const lessons=PAGES[slug].map(name=>({name,data:JSON.parse(read('learn/data/'+name+'.json'))}));
    const block=buildBlock(code,lessons,{isVocab:slug==='vocabulary'});
    const a=raw.indexOf(START),b=raw.indexOf(END);
    if(a>=0&&b>=a) raw=raw.slice(0,a)+block+raw.slice(b+END.length);
    else throw new Error('Missing static lesson block: '+p);
  }
  const $=cheerio.load(raw);
  $('html').attr('data-theme','light');$('body').addClass('study-page course-page').attr('data-section',section);
  if(!$('link[href="/css/study.css"]').length) $('head').append('\n<link rel="stylesheet" href="/css/study.css">');
  if(!$('link[href="/css/course.css"]').length) $('head').append('\n<link rel="stylesheet" href="/css/course.css">');
  // Keep existing localized navigation, search, and the language menu.
  const header=$('header').first();header.removeClass('header').addClass('study-header course-header');
  header.find('#theme-toggle,.mobile-menu-btn').remove();
  if(header.find('.nav-links').length&&!header.find('.course-nav').length) header.find('.nav-links').wrap('<nav class="course-nav" aria-label="'+esc(c.browse)+'"></nav>');
  let main=$('main').first();
  if(!main.length) {
    $('.quiz-hero,#quiz-container').wrapAll('<main class="course-content"></main>');main=$('main').first();
  }
  if(!main.length) throw new Error('No main: '+p);
  main.removeAttr('style').removeClass('main-content study-main').addClass('course-content').attr('id','main-content').attr('tabindex','-1');
  if(section==='quiz') $('#quiz-container').html(quizWorksheet(code));
  if(slug==='index'&&['culture','travel'].includes(section))redesignHubHero($,section,code);
  if(!$('a.course-skip').length) $('body').prepend(`<a class="study-skip course-skip" href="#main-content">${c.skip}</a>`);
  if($('#step-shell').length) removedRunners++;
  $('#step-shell,#stage-nav,#xp-badge,.lesson-meta,.lesson-progress-bar').remove();
  // Remove the loader and its initializer, while retaining free-play widgets.
  $('script').each((_,el)=>{
    const node=$(el),src=node.attr('src')||'',body=node.html()||'';
    if(src.includes('step-runner.js')) node.remove();
    else if(body.includes('StepRunner')) {
      if(body.includes('VOCAB_CATS')) node.remove();
      else node.html(body.replace(/(?:await\s+)?StepRunner\.init\([^;]+;\s*/g,''));
    }
  });
  main.find('.lesson-intro-bullets').remove();
  if(section==='learn') {
    const title=main.find('h1').first().text().replace(/\s+/g,' ').trim();
    const description=title+'. '+c.intro;
    $('meta[name="description"],meta[property="og:description"],meta[name="twitter:description"]').attr('content',description);
    $('script[type="application/ld+json"]').each((_,el)=>{try {const obj=JSON.parse($(el).html());obj.description=description;obj.dateModified='2026-10-02';$(el).html(JSON.stringify(obj,null,2));} catch(err){throw new Error(p+': invalid schema: '+err.message)}});
  }
  // The word bank has one canonical reading page, not three copies.
  if(tools) {
    if($('#lesson-static').length) removedBanks++;
    $('#lesson-static').remove();
    if(!main.find('.course-tool-reference').length) main.append(`<aside class="course-tool-reference"><p>${c.toolIntro}</p><a href="vocabulary.html">${c.vocabLink} →</a></aside>`);
  }
  $('style').each((_,el)=>{if(($(el).html()||'').includes('#lesson-static')) $(el).remove();});
  // Deduplicate only identical explanatory prose within one language/page.
  // Never treat translations or repeated short Korean examples as duplicates.
  const seen=new Set();main.find('p').each((_,el)=>{
    const n=$(el),str=n.text().replace(/\s+/g,' ').trim();
    if(str.length<120||n.find('img,button,input').length||n.closest('.study-question,.study-answer').length) return;
    if(seen.has(str)) {n.remove();duplicateParagraphs++;} else seen.add(str);
  });
  // Quiet title block and a real TOC drawn from actual headings.
  main.find('.lesson-header').addClass('course-title-block');
  main.find('table').each((_,el)=>{const table=$(el);if(!table.parent().hasClass('course-table-wrap'))table.wrap('<div class="course-table-wrap"></div>');});
  let aside=$('aside.sidebar,aside.course-toc').first();
  if(!aside.length) aside=$('<aside class="course-toc study-toc"></aside>');
  aside.removeAttr('style').removeAttr('id').removeClass('sidebar').addClass('course-toc study-toc');
  aside.find('.sidebar-search,.sidebar-level-filter,.sidebar-progress,.progress-grid-wrap').remove();
  aside.find('.course-index-disclosure,.course-page-index').remove();
  if(!aside.children('.course-directory').length&&aside.children().length) {
    const directory=$('<details class="course-directory"><summary>'+c.browse+'</summary></details>');
    directory.append(aside.contents());aside.append(directory);
  }
  const heads=main.find('#lesson-static .ls-stage > h2, .lesson-section > h2, h2[id], .food-section-heading, .food-section-title').toArray();
  const links=[],used=new Set();
  const headingText=h=>{
    const clone=h.clone();clone.find('.section-num').remove();
    for(const l of ['en','ja','zh-tw']) if(l!==code) clone.find('.'+l+'-only').remove();
    return stripEmoji(clone.text()).replace(/^\d+\s*·\s*/,'').replace(/\s+/g,' ').trim();
  };
  heads.forEach((el,i)=>{
    const h=$(el),title=headingText(h);if(!title||used.has(title))return;used.add(title);
    const section=h.closest('section[id],.lesson-section[id]');
    let target=h.attr('id')||(section.children('h2').first()[0]===el?section.attr('id'):null);
    if(!target) {target='reading-section-'+(i+1);h.attr('id',target);}
    const parent=section.children('h2').first()[0]===el?null:section.attr('id');
    const link={target,title,children:[]};
    const parentLink=parent&&links.find(item=>item.target===parent);
    if(parentLink)parentLink.children.push(link);else links.push(link);
  });
  if(!links.length) main.find('h2').each((i,el)=>{const h=$(el),text=headingText(h);if(!text||used.has(text))return;used.add(text);let id=h.attr('id')||'reading-section-'+(i+1);h.attr('id',id);links.push({target:id,title:text,children:[]});});
  const tocHTML=items=>items.map(item=>`<li><a href="#${esc(item.target)}">${esc(item.title)}</a>${item.children.length?'<ul>'+tocHTML(item.children)+'</ul>':''}</li>`).join('');
  if(links.length) aside.prepend(`<details class="course-index-disclosure" open><summary>${c.toc}</summary><nav class="course-page-index" aria-label="${c.toc}"><ol>${tocHTML(links)}</ol></nav></details>`);
  // Old hash links remain useful even where the previous renderer omitted IDs.
  aside.find('a[href]').each((_,el)=>{
    const href=$(el).attr('href');
    const same=href.startsWith('#') || href.split('#')[0]===slug+'.html';
    if(!same||!href.includes('#')) return;
    const id=href.split('#')[1]; if(!id||$('[id]').toArray().some(e=>$(e).attr('id')===id))return;
    const aliases=main.find('.course-legacy-anchors').first().length?main.find('.course-legacy-anchors').first():$('<div class="course-legacy-anchors"></div>').prependTo(main);
    aliases.append(`<span id="${esc(id)}" aria-hidden="true"></span>`);
  });
  if(!main.parent().hasClass('course-layout')) {
    main.wrap('<div class="course-layout"></div>');main.before(aside);
  }
  if(!links.length&&!aside.find('.sidebar-nav').length) {aside.remove();main.parent().addClass('course-layout--single');}
  // Retain local policy links, without repeating all section navigation again.
  const footer=$('footer').first();
  if(!footer.hasClass('course-footer')) {
    const info=[];const hrefs=new Set();
    footer.find('.footer-links a,.ks-trust-links a').each((_,el)=>{const a=$(el),href=a.attr('href')||'';if(!/(?:about|contact|privacy|terms|guides\/)/.test(href)||hrefs.has(href))return;hrefs.add(href);info.push($.html(el));});
    footer.removeClass('footer').addClass('study-footer course-footer').html(`<a class="study-brand" href="${code==='en'?'/':'/'+code+'/'}"><img src="/assets/brand/korean-school-mark.png" alt="" width="36" height="36"> Korean School <span lang="ko">한국어 학교</span></a><nav aria-label="${c.browse}">${info.join('')}</nav><p>© 2026 Korean School</p>`);
  }
  // Existing free-play and quiz JS stay; progressive inline exercises are new.
  for(const src of ['/js/course-labels.js','/js/study.js','/js/course.js']) if(!$(`script[src="${src}"]`).length) $('body').append(`<script src="${src}" defer></script>`);
  cleanEditorialHTML($,c);
  const output=$.html().replace(/[\t ]+$/gm,'');if(output!==read(p))save(p,output);
  report.push({page:p,section,language:code,headings:links.length,fullLesson:$('#lesson-static').length,photos:main.find('img').length});
}
// Apply the new identity to every public page, including guides and legal pages.
const publicFiles=new Set(files.map(f=>f.p));
for(const l of REG.live()) {
  const dir=l.code==='en'?'':l.code+'/';
  fs.readdirSync(path.join(ROOT,dir)).filter(n=>n.endsWith('.html')).forEach(n=>publicFiles.add(dir+n));
}
fs.readdirSync(path.join(ROOT,'guides')).filter(n=>n.endsWith('.html')).forEach(n=>publicFiles.add('guides/'+n));
for(const p of publicFiles) {
  let s=read(p);
  if(p==='index.html'||REG.liveDirs().some(code=>p===code+'/index.html')) {
    const code=p==='index.html'?'en':p.split('/')[0],copy=HOME_COPY[code],$=cheerio.load(s);
    $('main p').each((_,el)=>{
      const n=$(el),links=n.find('a[href]');
      if(['hangul.html','grammar.html','vocabulary.html'].every(name=>links.toArray().some(a=>($(a).attr('href')||'').endsWith(name)))) {
        n.html(esc(copy[0])+' '+links.toArray().map(a=>$.html(a)).join(' · '));
      }
    });
    $('script[type="application/ld+json"]').each((_,el)=>{
      const obj=JSON.parse($(el).html());if(obj['@type']!=='FAQPage')return;
      const q=obj.mainEntity[obj.mainEntity.length-1];q.acceptedAnswer.text=copy[1];
      const headings=$('main h3,main .faq-item summary').filter((_,h)=>$(h).next('p').length);
      headings.last().next('p').text(copy[1]);
      $(el).html(JSON.stringify(obj,null,2));
    });
    s=$.html();
  }
  s=s.replace(/(<img\b[^>]*\bsrc=")[^"]*android-chrome-(?:192|512)x(?:192|512)\.png("[^>]*>)/g,'$1/assets/brand/korean-school-mark.png$2');
  s=s.replace(/(<link\b[^>]*\brel="(?:icon|apple-touch-icon)"[^>]*\bhref=")[^"]+("[^>]*>)/g,(_,a,b)=>a+(a.includes('apple-touch-icon')?'/assets/brand/apple-touch-icon.png':b.includes('16x16')?'/assets/brand/favicon-16.png':'/assets/brand/favicon-32.png')+b);
  s=s.replace(/(<link\b[^>]*rel="icon"[^>]*type=")image\/x-icon"/g,'$1image/png"');
  s=s.replace(/https:\/\/freekoreanschool\.com\/assets\/images\/android-chrome-512x512\.png/g,'https://freekoreanschool.com/assets/brand/icon-512.png');
  s=s.replace(/(<meta\b[^>]*name="theme-color"[^>]*content=")[^"]+("[^>]*>)/g,'$1#186554$2');
  if(p.startsWith('guides/')) s=s.replace(/(<a class="study-brand"[^>]*>)(?!<img)/,'$1<img src="/assets/brand/korean-school-mark.png" alt="" width="36" height="36">');
  const $=cheerio.load(s);cleanEditorialHTML($,COPY[p.split('/')[0]]||COPY.en);
  s=$.html().replace(/[\t ]+$/gm,'');if(s!==read(p))save(p,s);
}
const manifest=JSON.parse(read('site.webmanifest'));
manifest.icons=[{src:'/assets/brand/icon-192.png',sizes:'192x192',type:'image/png'},{src:'/assets/brand/icon-512.png',sizes:'512x512',type:'image/png'}];manifest.theme_color='#186554';manifest.background_color='#f8f7f3';save('site.webmanifest',JSON.stringify(manifest,null,2)+'\n');
const revisions=JSON.parse(read('scripts/content-revisions.json'));
for(const f of files)if(f.section==='learn')revisions[f.p]='2026-10-02';save('scripts/content-revisions.json',JSON.stringify(revisions,null,2)+'\n');
save('docs/guide-ui-migration.json',JSON.stringify({pages:report.length,fullReadingLessons:report.filter(r=>r.fullLesson).length,dedicatedVocabularyTools:20,removedStepRunnerPages:120,thisRun:{removedRunners,removedBanks,duplicateParagraphs},report},null,2));
console.log(`Guide UI: ${report.length} pages. Removed ${removedRunners} step runners, ${removedBanks} duplicate word banks, ${duplicateParagraphs} identical paragraphs. Branding: ${publicFiles.size} pages.`);
// Restore discovery controls and varied quiz choices after the reading renderer.
require('./build-experience.cjs');
