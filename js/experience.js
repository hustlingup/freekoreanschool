/* Browsing, local study state, and focused quizzes. No account or remote storage. */
(() => {
 'use strict';
 const locale=document.documentElement.lang.toLowerCase();
 const c=window.ExperienceStrings?.[locale];if(!c)return;
 const section=document.body.dataset.section;
 const key='ks-experience-v1';
 let state={pages:{},quizzes:{}},storageAvailable=true;
 try {
  const stored=JSON.parse(localStorage.getItem(key)||'null');
  if(stored&&typeof stored==='object'&&!Array.isArray(stored)){
   if(stored.pages&&typeof stored.pages==='object'&&!Array.isArray(stored.pages))state.pages=stored.pages;
   if(stored.quizzes&&typeof stored.quizzes==='object'&&!Array.isArray(stored.quizzes))state.quizzes=stored.quizzes;
  }
  // A read can succeed even when writes are denied or the quota is full.
  localStorage.setItem(key,JSON.stringify(state));
 }catch{storageAvailable=false;}
 const persist=()=>{try{localStorage.setItem(key,JSON.stringify(state));}catch{storageAvailable=false;}document.querySelectorAll('.experience-storage-note').forEach(el=>el.textContent=storageAvailable?c.local:c.unavailable);};
 const make=(tag,className,text)=>{const el=document.createElement(tag);if(className)el.className=className;if(text!==undefined)el.textContent=text;return el;};
 const normalize=text=>text.normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase(locale).trim();
 const pageState=id=>{const value=state.pages[id];return value&&typeof value==='object'&&!Array.isArray(value)?value:{};};
 const rootPath=part=>'/'+part+'/'+(locale==='en'?'':locale+'/');

 document.querySelectorAll('[data-explore]').forEach(area=>{
  const controls=area.querySelector('[data-explore-filter]'),input=area.querySelector('[data-explore-search]');if(!controls||!input)return;
  if(area.querySelector('[data-study-slug]')){const saved=make('button','',c.saved);saved.type='button';saved.dataset.filter='saved';saved.setAttribute('aria-pressed','false');area.querySelector('.explore-chips').append(saved);}
  const items=[...area.querySelectorAll('[data-explore-item]')],chips=[...area.querySelectorAll('[data-filter]')];
  const texts=new Map(items.map(el=>[el,normalize(el.textContent)]));let category='all';
  const update=()=>{
   const query=normalize(input.value);let count=0;
   items.forEach(el=>{const match=category==='saved'?pageState('learn/'+el.dataset.studySlug).saved===true:category==='all'||el.dataset.category===category;el.hidden=!(match&&texts.get(el).includes(query));if(!el.hidden)count++;});
   chips.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.filter===category)));
   area.querySelector('[data-explore-count]').textContent=c.results.replace('{n}',count);
   area.querySelector('[data-explore-empty]').hidden=count>0;
  };
  chips.forEach(button=>button.addEventListener('click',()=>{category=button.dataset.filter;update();}));
  input.addEventListener('input',update);
  area.querySelector('[data-explore-clear]').addEventListener('click',()=>{input.value='';category='all';update();input.focus();});
  controls.hidden=false;update();
 });

 // Progress is explicit. Visiting or scrolling never marks a lesson as learned.
 const readingTools=document.querySelector('[data-reading-tools]');
 if(readingTools){
  const slug=location.pathname.split('/').filter(Boolean).pop().replace(/\.html$/,'');
  const pageId=section+'/'+slug;
  state.pages[pageId]={...pageState(pageId),visitedAt:Date.now()};
  const record=state.pages[pageId];
  const icons={save:'<path d="M6 3h12v18l-6-4-6 4V3Z"/>',mark:'<path d="m5 12 4 4L19 6"/>'};
  const addToggle=(property,off,on,icon)=>{
   const button=make('button');button.type='button';
   const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('viewBox','0 0 24 24');svg.setAttribute('aria-hidden','true');svg.setAttribute('fill','none');svg.setAttribute('stroke','currentColor');svg.setAttribute('stroke-width','1.7');svg.innerHTML=icons[icon];
   const label=make('span');button.append(svg,label);
   const update=()=>{button.setAttribute('aria-pressed',String(record[property]===true));label.textContent=record[property]===true?on:off;};
   button.addEventListener('click',()=>{record[property]=record[property]!==true;persist();update();});update();readingTools.append(button);
  };
  addToggle('saved',c.save,c.saved,'save');addToggle('studied',c.mark,c.done,'mark');
  readingTools.append(make('p','experience-storage-note',storageAvailable?c.local:c.unavailable));
  const libraryLink=make('a','experience-small-button',c.back+' →');libraryLink.href=rootPath(section)+'index.html';readingTools.insertBefore(libraryLink,readingTools.lastChild);
  const anchors=[...document.querySelectorAll('.course-page-index a[href^="#"]')].map(link=>({link,target:document.getElementById(link.hash.slice(1))})).filter(x=>x.target);
  const main=document.querySelector('main'),line=make('div','experience-reading-line');line.setAttribute('aria-hidden','true');document.body.append(line);
  let pending=false,current=null;
  const update=()=>{
   pending=false;const rect=main.getBoundingClientRect(),range=Math.max(1,main.scrollHeight-innerHeight);
   line.style.transform=`scaleX(${Math.max(0,Math.min(1,-rect.top/range))})`;
   let selected=anchors[0];for(const item of anchors){if(item.target.getBoundingClientRect().top<=150)selected=item;}
   if(selected&&current!==selected){current=selected;anchors.forEach(item=>item.link.removeAttribute('aria-current'));selected.link.setAttribute('aria-current','location');record.anchor=selected.target.id;}
  };
  const schedule=()=>{if(!pending){pending=true;requestAnimationFrame(update);}};
  addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);addEventListener('pagehide',persist);
  document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden')persist();});
  // Offer a return point; never move the reader unexpectedly on arrival.
  const previous=typeof record.anchor==='string'&&document.getElementById(record.anchor);
  if(previous&&!location.hash){const resume=make('a','experience-small-button',c.resume+' ↓');resume.href='#'+previous.id;readingTools.insertBefore(resume,readingTools.lastChild);}
  persist();update();
 }

 const resumePanel=document.querySelector('[data-resume]');
 if(resumePanel){
  const cards=[...document.querySelectorAll('[data-study-slug]')];
  cards.forEach(card=>{const record=pageState('learn/'+card.dataset.studySlug);if(record.studied===true){card.dataset.studied='true';card.querySelector('.learn-card-bottom').firstChild.textContent=c.done+' ';}if(record.saved===true)card.querySelector('.learn-card-number').textContent=c.saved;});
  const recent=cards.filter(card=>Number.isFinite(pageState('learn/'+card.dataset.studySlug).visitedAt)).sort((a,b)=>pageState('learn/'+b.dataset.studySlug).visitedAt-pageState('learn/'+a.dataset.studySlug).visitedAt)[0];
  if(recent){
   const record=pageState('learn/'+recent.dataset.studySlug),link=make('a','',recent.querySelector('h3').textContent+' →');
   link.href=recent.getAttribute('href')+(typeof record.anchor==='string'&&/^[\w-]+$/.test(record.anchor)?'#'+record.anchor:'');
   resumePanel.append(make('p','',c.resume),link,make('p','experience-storage-note',storageAvailable?c.local:c.unavailable));resumePanel.hidden=false;
  }
 }

 const savedLibrary=document.querySelector('[data-saved-library]');
 if(savedLibrary){let count=0;savedLibrary.querySelectorAll('[data-saved-page]').forEach(link=>{link.hidden=pageState(link.dataset.savedPage).saved!==true;if(!link.hidden)count++;});savedLibrary.hidden=count===0;}

 const sets=[...document.querySelectorAll('.course-quiz-set')];
 if(sets.length){
  const links=[...document.querySelectorAll('[data-quiz-link]')];
  const select=set=>{
   sets.forEach(s=>{s.hidden=s!==set;});
   links.forEach(link=>{if(link.dataset.quizLink===set.id)link.setAttribute('aria-current','true');else link.removeAttribute('aria-current');});
  };
  const hashSet=()=>{let id;try{id=decodeURIComponent(location.hash.slice(1));}catch{return null;}const target=document.getElementById(id);return target?.closest('.course-quiz-set');};
  select(hashSet()||sets[0]);
  const revealLinkedAnswer=()=>{const target=document.getElementById(location.hash.slice(1));if(target?.classList.contains('study-question')){const answer=target.querySelector('.study-answer');if(answer)answer.open=true;target.scrollIntoView();}};
  revealLinkedAnswer();
  document.addEventListener('click',event=>{
   const link=event.target.closest('a[href^="#"]');if(!link)return;
   const target=document.getElementById(link.getAttribute('href').slice(1)),set=target?.closest('.course-quiz-set');
   if(set){select(set);set.querySelector('h2').setAttribute('tabindex','-1');set.querySelector('h2').focus({preventScroll:true});}
  });
  addEventListener('hashchange',()=>{const set=hashSet();if(set){select(set);revealLinkedAnswer();document.getElementById(location.hash.slice(1))?.scrollIntoView();}});
  sets.forEach(set=>{
   const form=set.querySelector('.study-practice'),questions=[...form.querySelectorAll('.study-question')],quizKey=locale+'/'+set.id;
   const old=state.quizzes[quizKey];let record=old&&typeof old==='object'&&!Array.isArray(old)?old:{};
   state.quizzes[quizKey]=record;
   const top=make('div','quiz-progress'),label=make('label'),progress=make('progress');progress.id=set.id+'-progress';progress.max=questions.length;label.htmlFor=progress.id;top.append(label,progress);form.prepend(top);
   const actions=make('div','quiz-review-tools'),review=make('button','experience-small-button',c.review),all=make('button','experience-small-button',c.showAll),message=make('p','study-feedback');
   review.type=all.type='button';actions.append(review,all);actions.hidden=true;message.setAttribute('role','status');form.append(actions,message);
   const overview=links.find(a=>a.dataset.quizLink===set.id)?.querySelector('.quiz-map-status');
   if(overview&&Number.isInteger(record.score)&&record.score>=0&&record.score<=questions.length){overview.textContent=record.score+'/'+questions.length;overview.removeAttribute('aria-hidden');}
   if(Array.isArray(record.answers))questions.forEach((q,i)=>{const value=record.answers[i];if(typeof value==='string'&&/^[0-3]$/.test(value)){const input=q.querySelector(`input[value="${value}"]`);if(input)input.checked=true;}});
   const update=()=>{const n=questions.filter(q=>q.querySelector('input:checked')).length;label.textContent=c.answered.replace('{n}',n).replace('{total}',questions.length);progress.value=n;};
   const showAll=()=>{questions.forEach(q=>q.hidden=false);message.textContent='';};
   form.addEventListener('change',event=>{
    const q=event.target.closest('.study-question');if(!q)return;
    delete q.dataset.result;q.querySelector('.study-feedback').textContent='';
    form.querySelector('.study-score').textContent='';actions.hidden=true;showAll();
    record.answers=questions.map(q=>q.querySelector('input:checked')?.value??null);persist();update();
   });
   form.addEventListener('submit',()=>{
    record.score=questions.filter(q=>q.querySelector('input:checked')?.value===q.dataset.correct).length;
    record.answers=questions.map(q=>q.querySelector('input:checked')?.value??null);
    if(overview){overview.textContent=record.score+'/'+questions.length;overview.removeAttribute('aria-hidden');}
    actions.hidden=false;persist();update();
    const score=form.querySelector('.study-score');score.setAttribute('tabindex','-1');score.focus();
   });
   review.addEventListener('click',()=>{
    questions.forEach(q=>q.hidden=q.dataset.result==='correct');
    const first=questions.find(q=>!q.hidden);message.textContent=first?'':c.perfect;
    if(first){first.setAttribute('tabindex','-1');first.focus();}
   });
   all.addEventListener('click',showAll);
   form.addEventListener('reset',()=>setTimeout(()=>{
    showAll();actions.hidden=true;record={};state.quizzes[quizKey]=record;if(overview){overview.textContent='↗';overview.setAttribute('aria-hidden','true');}persist();update();
   },0));
   update();
  });
 }
 document.querySelectorAll('.experience-storage-note').forEach(el=>el.textContent=storageAvailable?c.local:c.unavailable);
})();
