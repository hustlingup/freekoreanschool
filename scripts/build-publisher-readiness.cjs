'use strict';
const fs=require('fs'),path=require('path'),cheerio=require('cheerio');
const ROOT=path.resolve(__dirname,'..'),locales=require('./_locales.cjs').live();
const COPY=require('./_publisher-copy.cjs'),release=require('./publisher-release.json');
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
// Do not re-enable blanket script injection by changing a boolean. Activation
// needs an explicit loader, approved inventory, and tested consent integration.
if(release.adsEnabled||release.analyticsEnabled)throw new Error('Implement and audit consent-aware loading before activating ads or analytics.');
const files=new Map();
for(const loc of locales){
 const prefix=loc.code==='en'?'':loc.code+'/';
 for(const dir of [prefix,...['learn','culture','travel'].map(s=>s+'/'+prefix)]){
  for(const name of fs.readdirSync(path.join(ROOT,dir)).filter(n=>n.endsWith('.html')))files.set(dir+name,loc.code);
 }
}
for(const name of fs.readdirSync(path.join(ROOT,'guides')).filter(n=>n.endsWith('.html')))files.set('guides/'+name,'en');
let changed=0,scriptRemovals=0,panels=0;
for(const [file,code] of files){
 const original=fs.readFileSync(path.join(ROOT,file),'utf8'),$=cheerio.load(original),t=COPY[code],contactUrl=`/${code==='en'?'':code+'/'}contact.html`;
 $('head meta[name="ks-publisher-release"]').remove();
 $('head').append(`<meta name="ks-publisher-release" content="${release.release}">`);
 if(!$('head meta[name="google-adsense-account"]').length)$('head').append(`<meta name="google-adsense-account" content="${release.verificationPublisher}">`);
 $('script').each((_,el)=>{
  const node=$(el),src=node.attr('src')||'',body=node.html()||'';
  if(/googlesyndication\.com\/pagead\/js\/adsbygoogle|googletagmanager\.com\/gtag\/js/.test(src)||(!src&&/gtag\(['"](?:config|js)['"]|adsbygoogle\s*[.=\[]/.test(body))){node.remove();scriptRemovals++;}
 });
 // Some old documents kept JSON-LD in the body. Give crawlers a consistent head.
 $('body > script[type="application/ld+json"]').appendTo('head');
 if(/(?:^|\/)about\.html$/.test(file)){
  const operator=$('h3').filter((_,n)=>$(n).text().trim()==='해본놈RK').first().parent();
  if(!operator.length)throw new Error('Operator block missing: '+file);
  operator.attr('id','operator').children('p,h4').remove();
  operator.append(`<p>${esc(t[7])}</p><h4>${esc(t[6])}</h4><p>${esc(t[8])}</p><p>${esc(t[9])}</p><p><a href="/guides/editorial-policy.html">${esc(t[2])}${code==='en'?'':' <span lang="en">(English)</span>'}</a> · <a href="${contactUrl}">${esc(t[3])}</a></p>`);
  const policy=$('#editorial-policy');policy.children('ul,p').remove();
  policy.append(`<p>${esc(t[4])}</p><p><a href="/guides/editorial-policy.html">${esc(t[2])}${code==='en'?'':' <span lang="en">(English)</span>'}</a> · <a href="/guides/updates.html" lang="en">Content updates (English)</a></p>`);
 }
 if(/(?:^|\/)privacy\.html$/.test(file)){
  const sections=$('main.ks-privacy section');
  if(sections.length!==5)throw new Error('Privacy layout changed: '+file);
  sections.eq(2).find('p').first().text(t[10]);
 }
 if(/(?:^|\/)vocabulary-browser\.html$/.test(file)){
  $('.tip-content').last().find('.tip-text').text(t[11]);
 }
 $('.publisher-note').remove();
 if(/^(learn|culture|travel)\//.test(file)||/(?:^|\/)quiz\.html$/.test(file)){
  const note=`<aside class="publisher-note"><p class="publisher-byline">${esc(t[1])}: <a href="/${code==='en'?'':code+'/'}about.html#operator">Korean School</a> · <a href="/guides/editorial-policy.html">${esc(t[2])}${code==='en'?'':' <span lang="en">(English)</span>'}</a></p><details><summary>${esc(t[0])}</summary><p>${esc(t[4])}</p><p class="publisher-image-disclosure">${esc(t[12])}</p><p><a href="${contactUrl}">${esc(t[3])}</a> · <a href="/guides/updates.html" lang="en">Content updates (English)</a></p></details></aside>`;
  const next=$('main .experience-next').last();if(next.length)next.before(note);else $('main').append(note);panels++;
  if(!$('link[href="/css/publisher.css"]').length)$('head').append('<link rel="stylesheet" href="/css/publisher.css">');
  $('link[href="/css/publisher.css"]').appendTo('head');
  $('.publisher-practice').remove();
  const section=file.split('/')[0],slug=path.basename(file,'.html');
  const guide=section==='culture'&&['index','kfood','koreanthing'].includes(slug)?'restaurant-confidence':section==='travel'&&['index','cities','phrases'].includes(slug)?'subway-first-journey':null;
  if(guide){const card=`<aside class="publisher-practice"><a href="/guides/${guide}.html">${esc(t[5])} <span aria-hidden="true">→</span></a></aside>`;const heading=$('main .hub-hero,main .course-title-block,main .travel-hero').first();if(heading.length)heading.after(card);else $('main h1').first().after(card);}
 }
 $('script[type="application/ld+json"]').each((_,el)=>{
  try{const data=JSON.parse($(el).html());const visit=node=>{if(Array.isArray(node))return node.forEach(visit);if(!node||typeof node!=='object')return;if(node.author)node.author={'@type':'Organization',name:'Korean School',url:'https://freekoreanschool.com/about#operator'};Object.values(node).forEach(visit);};visit(data);$(el).html(JSON.stringify(data).replace(/</g,'\\u003c'));}catch(e){throw new Error('Invalid structured data: '+file+' '+e.message);}
 });
 const updated=$.html();if(updated!==original){fs.writeFileSync(path.join(ROOT,file),updated);changed++;}
}
// Search must describe the actual flashcard implementation.
const appPath=path.join(ROOT,'js/app.js'),app=fs.readFileSync(appPath,'utf8');
fs.writeFileSync(appPath,app.replace("'spaced repetition'","'recall practice'"));
console.log(`Publisher release: ${files.size} pages, ${panels} editorial notes, ${scriptRemovals} tracking/ad scripts removed, ${changed} changed.`);
