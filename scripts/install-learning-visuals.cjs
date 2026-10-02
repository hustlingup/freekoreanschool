'use strict';
const fs=require('fs'),path=require('path'),cheerio=require('cheerio');
const root=path.resolve(__dirname,'..'),dir=path.join(root,'docs/learning-visuals');
const manifest=JSON.parse(fs.readFileSync(path.join(dir,'manifest.json')));
const assets=manifest.assets.filter(a=>a.status==='uploaded');
const locales=['en','ja','zh-tw','es','de','fr','vi','th','id','pt-br'];
const labels={en:'AI-generated learning illustration',ja:'AI生成の学習用イラスト','zh-tw':'AI 生成的學習插圖',es:'Ilustración educativa generada con IA',de:'KI-generierte Lernillustration',fr:'Illustration pédagogique générée par IA',vi:'Hình minh họa học tập do AI tạo',th:'ภาพประกอบการเรียนรู้ที่สร้างด้วย AI',id:'Ilustrasi pembelajaran buatan AI','pt-br':'Ilustração educativa gerada por IA'};
const esc=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const image=(a,alt,extra='')=>`<img class="learning-visual ${extra}" data-learning-visual="${a.id}" src="${esc(a.publicUrl)}" alt="${esc(alt)}" width="${a.width}" height="${a.height}" loading="lazy" decoding="async">`;
const changed=[];let placements=0;
for(const area of ['learn','travel'])for(const locale of locales){const directory=path.join(root,area,locale==='en'?'':locale);for(const file of fs.readdirSync(directory).filter(f=>f.endsWith('.html'))){
 const full=path.join(directory,file),html=fs.readFileSync(full,'utf8'),q=cheerio.load(html),base=area+'/'+file;let added=0;
 // Rebuild only our generated markup, making subsequent production batches idempotent.
 q('[data-visual-generated]').remove();q('img[data-learning-visual]').remove();q('.visual-word-table').removeClass('visual-word-table');q('.visual-attraction-card').removeClass('visual-attraction-card');
 for(const a of assets){for(const p of a.placements.filter(p=>p.page===base)){
  if(p.kind==='word'){
   const section=q('#'+p.section);section.find('.ls-table tbody tr').each((_,tr)=>{const row=q(tr),cells=row.children('td'),ko=cells.eq(0).find('[lang="ko"]').text().trim();if(ko!==p.korean)return;
    cells.eq(0).prepend(image(a,ko+' — '+cells.eq(2).text().trim()));row.closest('table').addClass('visual-word-table');added++;
   });
  } else if(p.selector){
   const card=q(p.selector).eq(p.index);if(!card.length)throw Error('Missing card '+base+' '+a.id);
   const title=card.find('h3,.transport-name-kor,.transport-name-eng').map((_,e)=>q(e).text().trim()).get().join(' · ')||p.korean;
   card.prepend(image(a,title)+`<small class="visual-credit" data-visual-generated>${esc(labels[locale])}</small>`);card.addClass('visual-attraction-card');added++;
  } else if(p.section){
   const section=q('#'+p.section),heading=section.children('h2').first();if(!heading.length)throw Error('Missing scene section '+base+' '+p.section);
   const title=heading.text().trim();heading.after(`<figure class="visual-scene" data-visual-generated>${image(a,title)}<figcaption>${esc(labels[locale])}</figcaption></figure>`);added++;
  }
 }}
 // Share exact word illustrations with other lessons only where both Korean and sense match.
 if(area==='learn'&&!['index.html','vocabulary.html','flashcard.html','vocabulary-browser.html'].includes(file))q('.ls-table tbody tr').each((_,tr)=>{
  const row=q(tr),cells=row.children('td');if(cells.length!==3||row.find('[data-learning-visual]').length)return;
  const ko=cells.eq(0).find('[lang="ko"]').text().trim();
  const candidates=assets.filter(a=>a.placements[0].kind==='word'&&a.placements[0].korean===ko);
  if(candidates.length!==1||['눈','배','다리','이','쓰다','보다'].includes(ko))return;
  const a=candidates[0];cells.eq(0).prepend(image(a,ko+' — '+cells.eq(2).text().trim()));row.closest('table').addClass('visual-word-table');added++;
 });
 if(area==='travel'&&file==='themes.html'){
  const shared={'DDP 동대문':'travel-seoul-08','광안대교':'travel-busan-20','창덕궁 후원':'travel-seoul-09','한라산':'travel-jeju-30','화성':'travel-suwon-25','불국사 & 석굴암':'travel-gyeongju-38','제주 화산섬과 용암동굴':'travel-jeju-32','단풍 시즌':'vocab-weather-13'};
  q('.city-attraction-card,.festival-card').each((_,el)=>{const card=q(el),title=card.find('h3').text().trim(),a=assets.find(a=>a.id===shared[title]);if(!a)return;card.prepend(image(a,title)+`<small class="visual-credit" data-visual-generated>${esc(labels[locale])}</small>`);card.addClass('visual-attraction-card');added++;});
 }
 if(area==='learn'&&file==='index.html'){
  const covers={'vocabulary.html':'vocab-food-drink-04','nouns.html':'noun-backpack','dialogues.html':'dialogue-introductions','shopping.html':'dialogue-shopping','emotions.html':'vocab-emotions-01','business-korean.html':'vocab-workplace-13'};
  q('.learn-card').each((_,el)=>{const card=q(el),target=(card.attr('href')||'').split('/').pop(),a=assets.find(a=>a.id===covers[target]);if(!a)return;card.prepend(image(a,card.find('h3').text().trim(),'visual-hub-image'));added++;});
 }
 if(added){
  if(!q('link[href="/css/learning-visuals.css"]').length)q('head').append('<link rel="stylesheet" href="/css/learning-visuals.css">');
  if(q('.visual-word-table').length)q('.visual-word-table').first().before(`<p class="visual-disclosure" data-visual-generated>${esc(labels[locale])}</p>`);
  fs.writeFileSync(full,q.html());placements+=added;changed.push({page:path.relative(root,full).replace(/\\/g,'/'),images:added});
 }else if(html.includes('data-learning-visual'))fs.writeFileSync(full,q.html());
}}
fs.writeFileSync(path.join(dir,'placements.json'),JSON.stringify({assets:assets.length,placements,pages:changed},null,2)+'\n');
console.log(JSON.stringify({assets:assets.length,placements,pages:changed.length}));
