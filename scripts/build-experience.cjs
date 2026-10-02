'use strict';
// Additive, repeatable enhancement. Never regenerates or translates lesson prose.
const fs=require('fs'),path=require('path'),crypto=require('crypto'),cheerio=require('cheerio');
const ROOT=path.resolve(__dirname,'..');
const locales=require('./_locales.cjs').live();
const COPY=require('./_experience-copy.cjs'),COURSE=require('./_course-labels.cjs');
const read=p=>fs.readFileSync(path.join(ROOT,p),'utf8');
const save=(p,s)=>{if(!fs.existsSync(path.join(ROOT,p))||read(p)!==s)fs.writeFileSync(path.join(ROOT,p),s);};
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const route=(section,code,slug='index')=>`/${section}/${code==='en'?'':code+'/'}${slug}.html`;
const groups={foundations:['hangul','syllable-blocks','pronunciation'],sentences:['vocabulary','nouns','pronouns','grammar','speech-levels'],conversation:['dialogues','shopping','emotions','business-korean','writing-essays','classical-korean'],tools:['letter-writing','typing','vocabulary-browser','flashcard']};
const sequence=['hangul','syllable-blocks','pronunciation','vocabulary','nouns','pronouns','grammar','speech-levels','dialogues','shopping','emotions','business-korean','writing-essays','classical-korean'];
const quizLessons=['hangul','hangul','syllable-blocks','dialogues','vocabulary','grammar','vocabulary','grammar','grammar','vocabulary'];
const quizExplanations=require('./_quiz-explanations.cjs');
const quizSignatures=require('./quiz-explanation-signatures.json');
{
 const $=cheerio.load(read('quiz.html'));
 const questions=$('.study-question');
 if(questions.length!==200||quizExplanations.length!==10||quizExplanations.some(set=>set.length!==20))throw new Error('Quiz explanation coverage must be 10 × 20.');
 questions.each((i,el)=>{
  const q=$(el),answer=q.find('input').filter((_,n)=>$(n).attr('value')===q.attr('data-correct')).closest('label').text().replace(/\s+/g,' ').trim();
  const hash=crypto.createHash('sha256').update(q.find('legend').text().replace(/\s+/g,' ').trim()+'|'+answer).digest('hex');
  if(hash!==quizSignatures[i])throw new Error(`Question ${i+1} changed; review its authored explanation before updating the signature.`);
 });
}
function title($){const h=$('h1').first().clone();h.find('.ja-block,.zh-block,.kr-trans').remove();return h.text().replace(/\s+/g,' ').trim();}
function normalizeHead($){
 // Several legacy documents closed <head> before their actual metadata. Restore
 // valid metadata placement and keep base styles before the enhancement layers.
 $('body > title,body > meta,body > link,body > base,body > style').appendTo('head');
 for(const file of ['study','course','editorial','hubs','experience','publisher'])$('link[rel="stylesheet"][href="/css/'+file+'.css"]').appendTo('head');
}
function attach($,code){
 if(!$('link[href="/css/experience.css"]').length)$('head').append('<link rel="stylesheet" href="/css/experience.css">');
 for(const src of ['/js/experience-labels.js','/js/experience.js'])if(!$(`script[src="${src}"]`).length)$('body').append(`<script src="${src}" defer></script>`);
 $('header .nav-links a').each((_,el)=>{const a=$(el);if(/learn\/.+hangul|learn\/hangul/.test(a.attr('href')||''))a.attr('href',route('learn',code));});
 const section=$('body').attr('data-section');
 $('header .nav-links a').removeAttr('aria-current').each((_,el)=>{const a=$(el),href=a.attr('href')||'';if(section==='quiz'?href.includes('quiz'):href.includes(section+'/'))a.attr('aria-current','page');});
 const input=$('#search-input');if(input.length&&!input.attr('aria-label'))input.attr('aria-label',input.attr('placeholder')||COPY[code].search);
 normalizeHead($);
}
function filter(c,categories){return `<div class="explore-filter" data-explore-filter hidden><label class="explore-search"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></svg><span class="experience-sr">${esc(c.search)}</span><input type="search" placeholder="${esc(c.search)}" data-explore-search></label><div class="explore-chips" role="group" aria-label="${esc(c.search)}">${[['all',c.all],...categories].map(([key,text])=>`<button type="button" data-filter="${key}" aria-pressed="${key==='all'}">${esc(text)}</button>`).join('')}</div><div class="explore-filter-status"><p data-explore-count role="status"></p><button type="button" data-explore-clear>${esc(c.clear)}</button></div></div><p class="explore-empty" data-explore-empty hidden>${esc(c.empty)}</p>`;}

// A real learning entrance in every live language, with authored local metadata.
for(const loc of locales){
 const code=loc.code,c=COPY[code],cc=COURSE[code],lessons={};
 for(const [group,slugs] of Object.entries(groups))for(const slug of slugs){
  const url=route('learn',code,slug),$=cheerio.load(read(url.slice(1)));
  const nav=$('.course-directory a').filter((_,el)=>(($(el).attr('href')||'').split('#')[0]).endsWith(slug+'.html')).first().clone();nav.find('.link-icon,.link-badge').remove();
  lessons[slug]={url,group,title:nav.text().replace(/\s+/g,' ').trim()||title($),description:$('meta[name="description"]').attr('content')||''};
 }
 const template=cheerio.load(read(route('learn',code,'hangul').slice(1)));
 const head=template('head').clone();head.find('title,meta[name="description"],link[rel="canonical"],link[rel="alternate"],script[type="application/ld+json"],meta[property^="og:"],meta[name^="twitter:"],style,script[src*="adsbygoogle"]').remove();
 head.find('[href],[src]').each((_,el)=>{for(const attr of ['href','src']){const v=head.find(el).attr(attr);if(v&&/^\.\.?\//.test(v))head.find(el).attr(attr,new URL(v,'https://freekoreanschool.com'+route('learn',code,'hangul')).pathname);}});
 const canonical='https://freekoreanschool.com'+route('learn',code).replace(/\/index.html$/,'');
 const card=(slug,i)=>{const l=lessons[slug];return `<a class="learn-card" href="${l.url}" data-explore-item data-category="${l.group}" data-study-slug="${slug}"><span class="learn-card-top"><span>${esc(c[l.group])}</span><span class="learn-card-number">${String(i+1).padStart(2,'0')}</span></span><h3>${esc(l.title)}</h3><p>${esc(l.description)}</p><span class="learn-card-bottom">${esc(l.group==='tools'?cc.practice:cc.lesson)} <span aria-hidden="true">↗</span></span></a>`;};
 const body=`<a class="study-skip course-skip" href="#main-content">${esc(cc.skip)}</a>${template('header').prop('outerHTML')}<div class="course-layout"><main class="course-content" id="main-content" tabindex="-1">
 <section class="learn-hero"><div><p class="experience-eyebrow">KOREAN SCHOOL <span lang="ko">· 배우다</span></p><h1>${esc(c.library)}</h1><p class="experience-lead">${esc(c.intro)}</p><div class="experience-actions"><a class="btn btn-primary" href="${lessons.hangul.url}">${esc(c.path)} <span aria-hidden="true">→</span></a><a class="btn btn-outline" href="#lesson-library">${esc(c.all)}</a></div></div><div class="hangul-art" aria-hidden="true"><span class="hangul-art-label">한 걸음씩</span><div><span>한</span><span>글</span></div><span class="hangul-art-note">ㄱ + ㅏ = 가</span></div></section>
 <section class="learning-path" aria-labelledby="learning-path-title"><div><p class="experience-eyebrow">01 → 02 → 03</p><h2 id="learning-path-title">${esc(c.path)}</h2></div><ol>${['hangul','syllable-blocks','dialogues'].map((slug,i)=>`<li><a href="${lessons[slug].url}"><span>${String(i+1).padStart(2,'0')}</span><strong>${esc(lessons[slug].title)}</strong><span aria-hidden="true">→</span></a></li>`).join('')}</ol></section>
 <div class="experience-resume" data-resume hidden></div><section class="learn-library" id="lesson-library" data-explore><div class="experience-section-heading"><div><p class="experience-eyebrow">${esc(cc.topics)}</p><h2>${esc(c.all)}</h2></div><span class="experience-count">${Object.keys(lessons).length}</span></div>${filter(c,Object.keys(groups).map(k=>[k,c[k]]))}<div class="learn-grid">${Object.keys(lessons).map(card).join('')}</div></section></main></div>${template('footer').prop('outerHTML')}<script src="/js/lang-core.js"></script><script src="/js/app.js"></script><script src="/js/course-labels.js" defer></script><script src="/js/course.js" defer></script><script src="/js/editorial-cleanup.js" defer></script>`;
 const $=cheerio.load(`<!doctype html><html lang="${loc.htmlLang}" data-theme="light"><head>${head.html()}<title>${esc(c.library)} | Korean School</title><meta name="description" content="${esc(c.intro)}"><link rel="canonical" href="${canonical}"><meta property="og:type" content="website"><meta property="og:title" content="${esc(c.library)}"><meta property="og:description" content="${esc(c.intro)}"><meta property="og:url" content="${canonical}"><meta property="og:image" content="https://freekoreanschool.com/assets/images/og-image.webp">${locales.map(l=>`<link rel="alternate" hreflang="${l.hreflang}" href="https://freekoreanschool.com${route('learn',l.code).replace(/\/index.html$/,'')}">`).join('')}<link rel="alternate" hreflang="x-default" href="https://freekoreanschool.com/learn"><script type="application/ld+json">${JSON.stringify({'@context':'https://schema.org','@type':'CollectionPage',name:c.library,description:c.intro,url:canonical,inLanguage:loc.htmlLang,mainEntity:{'@type':'ItemList',itemListElement:Object.values(lessons).map((l,i)=>({'@type':'ListItem',position:i+1,name:l.title,url:'https://freekoreanschool.com'+l.url}))}})}</script></head><body class="study-page course-page experience-hub learn-hub" data-section="learn">${body}</body></html>`);
 attach($,code);save(route('learn',code).slice(1),$.html());
}

const baseline=JSON.parse(read('docs/guide-ui-baseline.json'));
for(const file of Object.keys(baseline.resources)){
 const $=cheerio.load(read(file)),code=$('html').attr('lang').toLowerCase(),c=COPY[code],cc=COURSE[code];
 const section=$('body').attr('data-section'),slug=path.basename(file,'.html');
 attach($,code);
 $('[data-experience-generated]').remove();
 const main=$('main');
 if(slug==='index'&&['culture','travel'].includes(section)){
  $('body').addClass('experience-hub');
  $('.hub-hero-lead').text(c[section+'Intro']);
  const index=$('.travel-promo-grid').first().closest('.travel-section');index.attr('data-explore','');
  index.find('.explore-filter,.explore-empty').remove();
  const cards=index.find('.travel-promo-card');
  cards.each((i,el)=>{const n=$(el);n.attr('data-explore-item','').attr('data-category',section==='culture'?(i<3?'screen':i===3?'food':'life'):'all');n.find('.experience-card-number').remove();n.prepend(`<span class="experience-card-number" aria-hidden="true">${String(i+1).padStart(2,'0')}</span>`);});
  const labels=section==='culture'?[["screen",cards.eq(0).find('.travel-promo-label').text().split('·')[0].trim()+' / '+cards.eq(1).find('.travel-promo-title').text()],["food",cards.eq(3).find('.travel-promo-title').text()],["life",cards.eq(6).find('.travel-promo-label').text().split('·')[0].trim()]]:[];
  index.find('.travel-promo-grid').before(filter(c,labels));
  const links=[];$('.course-page-index > ol > li > a').each((_,el)=>{const a=$(el),target=$(a.attr('href'));if(!target.closest('.place-card').length)links.push(`<a href="${a.attr('href')}">${esc(a.text())}</a>`);});
  $('.hub-hero').after(`<nav class="experience-jumps" aria-label="${esc(cc.toc)}" data-experience-generated>${links.join('')}</nav>`);
  // Put browsing before the long introduction, while keeping every paragraph.
  if(section==='culture')$('.experience-jumps').after(index);
  const dir=`${section}/${code==='en'?'':code+'/'}`;
  const savedLinks=fs.readdirSync(path.join(ROOT,dir)).filter(name=>name.endsWith('.html')&&name!=='index.html').map(name=>{
   const slug=name.replace('.html',''),article=cheerio.load(read(dir+name));
   return `<a data-saved-page="${section}/${slug}" href="/${dir+name}" hidden>${esc(title(article))} <span aria-hidden="true">→</span></a>`;
  }).join('');
  $('.experience-jumps').after(`<section class="experience-saved" data-saved-library data-experience-generated hidden><h2>${esc(c.saved)}</h2><nav aria-label="${esc(c.saved)}">${savedLinks}</nav><p class="experience-storage-note">${esc(c.local)}</p></section>`);
 }
 if(section!=='quiz'&&slug!=='index'){
  const heading=main.find('.course-title-block,.food-page-hero,.travel-hero').first();
  const toolbar='<div class="experience-toolbar" data-reading-tools data-experience-generated></div>';
  if(heading.length)heading.append(toolbar);else main.find('h1').first().after(toolbar);
  const nextSlug=section==='learn'&&sequence.includes(slug)?sequence[sequence.indexOf(slug)+1]:null;
  const nextUrl=nextSlug?route('learn',code,nextSlug):route(section,code);
  const nextTitle=nextSlug?title(cheerio.load(read(nextUrl.slice(1)))):c.all;
  main.append(`<nav class="experience-next" aria-label="${esc(c.next)}" data-experience-generated><div><p class="experience-eyebrow">${esc(c.next)}</p><a href="${nextUrl}">${esc(nextTitle)} <span aria-hidden="true">→</span></a></div><a class="btn btn-outline" href="${route(section,code)}">${esc(cc.browse)}</a></nav>`);
 }
 if(section==='quiz'){
  $('body').addClass('experience-quiz');
  const alphabet=cheerio.load(read(route('learn',code,'hangul').slice(1))),notes=new Map();
  alphabet('#lesson-static .ls-table tbody tr').each((_,el)=>{
   const cells=alphabet(el).children('td'),symbols=cells.first().text().match(/[ㄱ-ㅎㅏ-ㅣ]/g)||[],note=cells.last().text().trim();
   if(symbols.length===1&&cells.length>=3&&note.length>2&&!notes.has(symbols[0]))notes.set(symbols[0],note);
  });
  $('.quiz-hero > p').text(c.quizIntro);
  const sets=$('.course-quiz-set');
  $('.quiz-hero').append(`<div class="quiz-overview" data-experience-generated><span><strong>${sets.length}</strong> ${esc(c.sets)}</span><span><strong>${$('.study-question').length}</strong> ${esc(c.questions)}</span></div>`);
  const chooser=`<section class="quiz-picker" id="quiz-topics" data-experience-generated aria-label="${esc(c.choose)}"><p class="experience-eyebrow">${esc(c.choose)}</p><nav class="quiz-map">${sets.map((i,el)=>{const s=$(el);return `<a href="#${s.attr('id')}" data-quiz-link="${s.attr('id')}"><span class="quiz-map-number">${String(i+1).padStart(2,'0')}</span><span>${esc(s.find('h2').text().replace(/^\d+\s*·\s*/,''))}</span><span class="quiz-map-status" aria-hidden="true">↗</span></a>`;}).get().join('')}</nav><p class="experience-storage-note">${esc(c.local)}</p></section>`;
  $('.quiz-hero').after(chooser);
  sets.each((i,el)=>{
   const s=$(el),url=route('learn',code,quizLessons[i]);
   s.find('h2').after(`<div class="quiz-set-tools" data-experience-generated><a href="${url}">${esc(cc.lesson)} →</a><a href="#quiz-topics">${esc(c.back)} ↑</a></div>`);
   if(code==='en'&&i<2)s.find('.quiz-set-tools').append('<a href="https://www.korean.go.kr/front_eng/roman/roman_01.do">NIKL romanization reference →</a>');
   s.find('.study-question').each((j,el)=>{
    const q=$(el),labels=q.children('label').toArray();
    q.attr('id',`quiz-question-${i*20+j+1}`);
    // Every source answer is index 0. Stable shuffling fixes the visible bias,
    // preserving values, names, translations, correct answers, and saved drafts.
    const rank=el=>crypto.createHash('sha256').update(`${i}/${j}/${$(el).find('input').attr('value')}`).digest('hex');
    labels.sort((a,b)=>rank(a).localeCompare(rank(b)));
    q.find('legend').after(labels);
    if(i<2){
     const correct=q.find(`input[value="${q.attr('data-correct')}"]`).closest('label').text();
     const symbols=correct.match(/[ㄱ-ㅎㅏ-ㅣ]/g)||q.find('legend').text().match(/[ㄱ-ㅎㅏ-ㅣ]/g)||[];
     if(symbols.length===1&&notes.has(symbols[0]))q.find('.study-answer').append(`<p class="quiz-explanation" data-experience-generated><span lang="ko">${symbols[0]}</span> · ${esc(notes.get(symbols[0]))}</p>`);
    }
    if(code==='en')q.find('.study-answer').append(`<p class="quiz-explanation" data-experience-generated>${esc(quizExplanations[i][j])}</p>`);
    else q.find('.study-answer').append(`<a class="quiz-answer-lesson" lang="en" href="/quiz.html#quiz-question-${i*20+j+1}" data-experience-generated>English explanation →</a>`);
    if(code==='en'&&i===4&&j===18)q.find('.study-answer').append('<a class="quiz-answer-lesson" href="https://krdict.korean.go.kr/eng/dicSearch/SearchView?ParaWordNo=61142&amp;nation=eng" data-experience-generated>NIKL dictionary: 삼촌 →</a>');
    q.find('.study-answer').append(`<a class="quiz-answer-lesson" href="${url}" data-experience-generated>${esc(cc.lesson)} →</a>`);
   });
  });
 }
 save(file,$.html());
}
// Consistent Learn destination in existing public headers, without rewriting bodies.
for(const loc of locales){
 const prefix=loc.code==='en'?'':loc.code+'/';
 for(const name of fs.readdirSync(path.join(ROOT,prefix)).filter(n=>n.endsWith('.html'))){
  const file=prefix+name;let raw=read(file);
  raw=raw.replace(/<header\b[\s\S]*?<\/header>/g,header=>header.replace(/(<a\b[^>]*href=")[^"]*learn\/(?:[a-z-]+\/)?hangul\.html("[^>]*>)/g,`$1${route('learn',loc.code)}$2`));const $=cheerio.load(raw);normalizeHead($);save(file,$.html());
 }
}
for(const name of fs.readdirSync(path.join(ROOT,'guides')).filter(name=>name.endsWith('.html'))){const file='guides/'+name;save(file,read(file).replace(/(<a href="\/learn\/)hangul(\.html">Lessons<\/a>)/g,'$1index$2'));}
save('js/experience-labels.js','/* Generated by scripts/build-experience.cjs. */\nwindow.ExperienceStrings='+JSON.stringify(COPY,null,2)+';\n');
console.log(`Experience: ${Object.keys(baseline.resources).length} reading pages and ${locales.length} learning libraries.`);
require('./build-publisher-readiness.cjs');
