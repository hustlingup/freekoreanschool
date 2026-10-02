/* Full reading pages: audio, anchors, vocabulary saving, and legacy URL support. */
(() => {
  'use strict';
  const lang=document.documentElement.lang.toLowerCase();
  const c=window.CourseStrings?.[lang] || window.CourseStrings?.en;
  if(!c)return;
  const small=matchMedia('(max-width:800px)');
  const setIndex=()=>document.querySelectorAll('.course-index-disclosure').forEach(el=>{el.open=!small.matches});
  setIndex();small.addEventListener('change',setIndex);
  document.querySelectorAll('#lesson-static td.ls-ko-cell').forEach(cell=>{
    const ko=cell.querySelector('[lang="ko"]');if(!ko)return;
    const text=ko.textContent.trim();if(!text)return;
    const button=document.createElement('button');button.type='button';button.className='course-audio';
    button.setAttribute('aria-label',c.listen+': '+text);button.textContent='▶';
    button.addEventListener('click',()=>{if(typeof window.speakKorean==='function')window.speakKorean(text,button)});
    cell.append(button);
  });
  // The word list appears once, in the reading lesson; save words here or use
  // the dedicated browser. Its topic JSON remains the source of truth.
  const isVocabulary=/(?:^|\/)vocabulary(?:\.html)?$/.test(location.pathname);
  if(isVocabulary) {
    document.querySelectorAll('#lesson-static .ls-stage').forEach(section=>{
      section.querySelectorAll('.ls-table tbody tr').forEach(row=>{
        const cells=row.querySelectorAll('td');if(cells.length!==3)return;
        const korean=cells[0].querySelector('[lang="ko"]')?.textContent.trim();if(!korean)return;
        const manager=typeof FlashcardManager==='undefined'?null:FlashcardManager;
        const button=document.createElement('button');button.type='button';button.className='bookmark-btn';button.textContent=manager?.hasCard(korean)?'★':'☆';
        button.setAttribute('aria-label',window.LangManager?.t('Save to flashcards') || 'Save to flashcards');
        button.addEventListener('click',()=>{
          if(!manager)return;
          if(manager.hasCard(korean)){manager.removeCard(korean);button.textContent='☆'}
          else{manager.addCard({id:korean,korean,romanization:cells[1].textContent.trim(),english:cells[2].textContent.trim(),theme:section.id.replace(/^(?:vocab-|vocabulary-)/,'').replace(/-section-\d+$/,'')});button.textContent='★'}
        });cells[0].append(button);
      });
    });
  }
  // ?cat= and ?step= bookmarks now point into the complete lesson.
  const params=new URLSearchParams(location.search),cat=params.get('cat'),step=Number(params.get('step'));
  let target;
  if(cat&&/^[a-z-]+$/.test(cat)) target=document.getElementById('vocab-'+cat+'-section-1')||document.getElementById('vocabulary-'+cat+'-section-1');
  if(!target&&params.has('step')&&step>0) target=[...document.querySelectorAll('.ls-stage')].find(s=>step>=Number(s.dataset.firstStep)&&step<=Number(s.dataset.lastStep));
  if(target&&!location.hash) {history.replaceState({},'',location.pathname+location.search+'#'+target.id);target.scrollIntoView({block:'start'});}
})();
