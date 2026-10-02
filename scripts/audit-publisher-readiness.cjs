'use strict';
// Structural evidence is not an AdSense eligibility verdict. Live checks are
// separate so a successful local build cannot conceal a stale deployment.
const fs=require('fs'),path=require('path'),cheerio=require('cheerio');
const ROOT=path.resolve(__dirname,'..'),OUT=path.join(ROOT,'docs/publisher-audit');
const locales=require('./_locales.cjs').live(),release=require('./publisher-release.json');
fs.mkdirSync(OUT,{recursive:true});
const files=[];
for(const l of locales){const pre=l.code==='en'?'':l.code+'/';for(const dir of [pre,...['learn','culture','travel'].map(s=>s+'/'+pre)])for(const n of fs.readdirSync(path.join(ROOT,dir)).filter(n=>n.endsWith('.html')))files.push(dir+n);}
for(const n of fs.readdirSync(path.join(ROOT,'guides')).filter(n=>n.endsWith('.html')))files.push('guides/'+n);
const issues=[],images=new Map(),cache=new Map();let notes=0,adScripts=0,analyticsScripts=0,englishExplanations=0,translatedExplanationLinks=0,verificationTags=0;
const generatedPaths=fs.readFileSync(path.join(ROOT,'assets/generated-image-paths.txt'),'utf8').split(/\r?\n/).map(s=>s.replace(/\\/g,'/')).filter(s=>s.includes('/assets/')).map(s=>s.slice(s.indexOf('/assets/')+1));
const replacementPaths=[...fs.readFileSync(path.join(ROOT,'assets/existing-image-replacements.md'),'utf8').matchAll(/\[x\] `([^`]+)`/g)].map(m=>m[1]);
const parsed=file=>{if(!cache.has(file))cache.set(file,cheerio.load(fs.readFileSync(path.join(ROOT,file),'utf8')));return cache.get(file);};
const resolve=(href,from)=>{
 let u;try{u=new URL(href,'https://freekoreanschool.com/'+from);}catch{return null;}
 if(u.origin!=='https://freekoreanschool.com')return null;
 const p=decodeURIComponent(u.pathname).replace(/^\//,'');
 const f=[p,p+'.html',p+'index.html',p+'/index.html'].find(f=>fs.existsSync(path.join(ROOT,f))&&fs.statSync(path.join(ROOT,f)).isFile());
 return {file:f,hash:u.hash,path:u.pathname};
};
for(const file of files){
 const $=parsed(file);notes+=$('.publisher-note').length;
 if($('meta[name="ks-publisher-release"]').attr('content')!==release.release)issues.push({file,kind:'release-marker'});
 if($('head meta[name="google-adsense-account"]').attr('content')===release.verificationPublisher)verificationTags++;
 $('script').each((_,el)=>{const src=$(el).attr('src')||'',body=$(el).html()||'';if(/adsbygoogle\.js/.test(src)||/adsbygoogle\s*[.=\[]/.test(body))adScripts++;if(/googletagmanager\.com\/gtag\/js/.test(src)||/gtag\(['"](?:config|js)['"]/.test(body))analyticsScripts++;});
 $('img[src]').each((_,el)=>{const src=$(el).attr('src');if(!images.has(src))images.set(src,{src,pages:[],rights:'Not established by this audit; keep a licence or generation record.'});images.get(src).pages.push(file);});
 // Check only the new owned editorial links here. The broader old link graph
 // belongs to existing course and locale QA; do not imply full-site link QA.
 $('.publisher-note a,.publisher-practice a').each((_,el)=>{const href=$(el).attr('href'),dest=resolve(href,file);if(dest&&!dest.file)issues.push({file,kind:'editorial-link',href});if(dest?.file&&dest.hash&&!parsed(dest.file)('[id]').filter((_,e)=>parsed(dest.file)(e).attr('id')===dest.hash.slice(1)).length)issues.push({file,kind:'editorial-anchor',href});});
 if(file==='quiz.html')englishExplanations=$('.study-question').filter((_,el)=>$(el).find('.quiz-explanation[data-experience-generated]').last().text().trim().length>45).length;
 else if(/(?:^|\/)quiz\.html$/.test(file))translatedExplanationLinks+=$('a[lang="en"][href^="/quiz.html#quiz-question-"]').length;
 if(/(?:^|\/)about\.html$/.test(file)&&!$('#operator').length)issues.push({file,kind:'operator-profile'});
 $('script[type="application/ld+json"]').each((_,el)=>{try{JSON.parse($(el).html());}catch{issues.push({file,kind:'structured-data'})}});
}
const guides=['restaurant-confidence','subway-first-journey'].map(slug=>{const $=parsed('guides/'+slug+'.html');return {file:'guides/'+slug+'.html',questions:$('.study-question').length,explanations:$('.study-answer').length,sourceLinks:$('.study-article a[href^="https:"]').map((_,e)=>$(e).attr('href')).get(),staticWords:$('main').text().trim().split(/\s+/).length};});
const ads=fs.readFileSync(path.join(ROOT,'ads.txt'),'utf8').trim();
const stat={checkedAt:new Date().toISOString(),scope:'Public root/locale HTML, learn/culture/travel, and guides; new editorial links; static script sources. No comprehensive semantic, legal, account, or live audit implied.',release:release.release,pages:files.length,editorialNotes:notes,verificationTags,adScripts,analyticsScripts,englishQuizExplanations:englishExplanations,translatedExplanationLinks,guides,adsTxtMatches:ads===`google.com, ${release.verificationPublisher.replace('ca-','')}, DIRECT, f08c47fec0942fa0`,issues,manualOutstanding:['Image copyright/provenance verification','Independent linguistic review and remaining English in translations','AdSense account approval and applicable consent setup before ad activation','Live deployment and production browser verification','Real-user Core Web Vitals; crawler/account reports']};
fs.writeFileSync(path.join(OUT,'static.json'),JSON.stringify(stat,null,2)+'\n');
for(const item of images.values()){
 let pathname;try{pathname=decodeURIComponent(new URL(item.src,'https://freekoreanschool.com').pathname);}catch{pathname=item.src;}
 item.generationRecords=[];
 if(generatedPaths.some(p=>pathname.endsWith('/'+p)))item.generationRecords.push('assets/generated-image-paths.txt');
 if(replacementPaths.some(p=>pathname.endsWith('/'+p)))item.generationRecords.push('assets/existing-image-replacements.md');
 if(/\/assets\/brand\/korean-school-mark(?:-master)?\.png$/.test(pathname))item.generationRecords.push('assets/brand/README.md');
 item.recordedOrigin=item.generationRecords.length?'Listed as AI-generated in repository records; record accuracy/rights not independently verified.':'No matching generation record in the three files checked.';
}
fs.writeFileSync(path.join(OUT,'media-inventory.json'),JSON.stringify({checkedAt:stat.checkedAt,scope:'Static img[src] sources in audited HTML; does not inventory every CSS background, srcset candidate, or runtime-loaded image.',note:'Inventory only. An image being reachable, recorded, or AI-generated is not a rights clearance.',images:[...images.values()]},null,2)+'\n');
console.log(JSON.stringify({pages:stat.pages,editorialNotes:notes,verificationTags,adScripts,analyticsScripts,englishExplanations,translatedExplanationLinks,issues:issues.length,adsTxtMatches:stat.adsTxtMatches}));
if(issues.length||adScripts||analyticsScripts||englishExplanations!==200||translatedExplanationLinks!==1800||verificationTags!==files.length||!stat.adsTxtMatches)process.exitCode=1;
async function live(){
 const arg=process.argv.find(a=>a.startsWith('--base=')),base=arg?arg.slice(7):'https://freekoreanschool.com';
 const checks=[['/',200,true],['/learn',200,true],['/learn/hangul',200,true],['/culture',200,true],['/travel',200,true],['/quiz',200,true],['/about',200,true],['/privacy',200,true],['/guides/editorial-policy',200,true],['/guides/restaurant-confidence',200,true],['/guides/subway-first-journey',200,true],['/ads.txt',200,false],['/robots.txt',200,false],['/sitemap.xml',200,false],['/nonexistent-publisher-audit-20261002',404,false],['/admin/upload-culture-images',404,false],['/docs/editorial-source-register.json',404,false],['/assets/generated-image-paths.txt',404,false]];
 const results=await Promise.all(checks.map(async([url,expected,marker])=>{try{const r=await fetch(base+url,{signal:AbortSignal.timeout(20000)}),s=await r.text();const $=r.headers.get('content-type')?.includes('text/html')?cheerio.load(s):null;return {path:url,status:r.status,expected,url:r.url,statusPass:r.status===expected,release:$?.('meta[name="ks-publisher-release"]').attr('content')||null,releasePass:!marker||$?.('meta[name="ks-publisher-release"]').attr('content')===release.release,adScripts:$?$('script[src*="adsbygoogle.js"]').length:0,analyticsScripts:$?$('script[src*="googletagmanager.com/gtag/js"]').length:0,title:$?.('title').text(),adsTxtPass:url==='/ads.txt'?s.trim()===ads:undefined,robotsAllowsCrawl:url==='/robots.txt'?!/^Disallow:\s*\/\s*$/m.test(s):undefined,sitemapIncludesNewGuides:url==='/sitemap.xml'?s.includes('/guides/restaurant-confidence')&&s.includes('/guides/subway-first-journey'):undefined};}catch(e){return {path:url,error:e.message,statusPass:false,releasePass:false};}}));
 const out={checkedAt:new Date().toISOString(),base,expectedRelease:release.release,note:'HTTP and public HTML evidence only. No account status, geographic consent simulation, crawl guarantee, or real-user performance verification.',pass:results.every(r=>r.statusPass&&r.releasePass&&r.adsTxtPass!==false&&r.robotsAllowsCrawl!==false&&r.sitemapIncludesNewGuides!==false),results};
 fs.writeFileSync(path.join(OUT,'live.json'),JSON.stringify(out,null,2)+'\n');console.log(JSON.stringify({live:base,pass:out.pass,failed:results.filter(r=>!r.statusPass||!r.releasePass||r.sitemapIncludesNewGuides===false).map(r=>({path:r.path,status:r.status,release:r.release}))}));
 if(!out.pass)process.exitCode=1;
}
if(process.argv.includes('--live'))live().catch(e=>{console.error(e.message);process.exitCode=1;});
