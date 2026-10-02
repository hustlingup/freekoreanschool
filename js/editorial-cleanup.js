/* Shared static/runtime emoji cleanup. Numbers and text control symbols survive. */
(() => {
  'use strict';
  const pictograph='(?![©®™▶◀↔↕↖↗↘↙])\\p{Extended_Pictographic}';
  const sequences=new RegExp('\\p{Regional_Indicator}{2}|'+pictograph+'(?:\\uFE0F|\\p{Emoji_Modifier})*(?:\\u200D'+pictograph+'(?:\\uFE0F|\\p{Emoji_Modifier})*)*','gu');
  const stripEmoji=text=>String(text).replace(/([0-9#*])\uFE0F?\u20E3/gu,'$1').replace(sequences,'').replace(/[\uFE0F\u20E3\u{E0020}-\u{E007F}]/gu,'');
  const iconSVG=kind=>{
    const paths={
      sound:'<path d="M11 5 6 9H3v6h3l5 4V5Z"/><path d="M15 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"/>',
      globe:'<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18M5 7h14M5 17h14"/>',
      search:'<circle cx="10" cy="10" r="6"/><path d="m15 15 6 6"/>',
      moon:'<path d="M20 15A9 9 0 0 1 9 4a9 9 0 1 0 11 11Z"/>',
      sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/>',
      menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',
      stop:'<rect x="5" y="5" width="14" height="14" rx="1"/>',
      close:'<path d="m6 6 12 12M18 6 6 18"/>'
    };
    return '<svg class="editorial-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+paths[kind]+'</svg>';
  };
  const buttonKind=(text,label='')=>/⏹/.test(text)?'stop':/menu/i.test(label)?'menu':/🔊|🔈|🔉/.test(text)?'sound':/🌐|🌍|🌎|🌏/.test(text)?'globe':/🔍|🔎/.test(text)?'search':/☀/.test(text)?'sun':/🌙/.test(text)?'moon':'close';
  if(typeof module!=='undefined'&&module.exports) {module.exports={stripEmoji,iconSVG,buttonKind};return;}
  window.EditorialText={stripEmoji};
  function clean(root) {
    if(!root||root.closest?.('script,style,textarea,pre,code,svg'))return;
    const buttons=[...(root.matches?.('button,a[role="button"]')?[root]:[]),...root.querySelectorAll('button,a[role="button"]')];
    for(const button of buttons) {
      const text=button.textContent.trim();
      if(!text||stripEmoji(text).trim()||button.querySelector('img,svg'))continue;
      const kind=buttonKind(text,(button.id||'')+' '+(button.getAttribute('aria-label')||button.title));
      if(!button.getAttribute('aria-label'))button.setAttribute('aria-label',stripEmoji(button.title)||({sound:window.CourseStrings?.[document.documentElement.lang]?.listen||'Listen',globe:'Language',search:'Search',moon:'Theme',sun:'Theme',menu:'Menu',stop:'Stop',close:'Close'})[kind]);
      button.innerHTML=iconSVG(kind);
    }
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:n=>n.parentElement?.closest('script,style,textarea,pre,code,svg')?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT});
    let text;while((text=walker.nextNode())) {const value=stripEmoji(text.data);if(value!==text.data)text.data=value;}
    for(const el of [root,...root.querySelectorAll('*')]) {
      for(const attr of ['title','aria-label','placeholder'])if(el.hasAttribute(attr)) {const value=stripEmoji(el.getAttribute(attr));if(value!==el.getAttribute(attr))el.setAttribute(attr,value);}
      if(/(?:^|[\s-])(?:emoji|icon)(?:[\s-]|$)/.test(el.className||'')&&!el.textContent.trim()&&!el.children.length&&!el.matches('button,input,select,textarea'))el.classList.add('editorial-empty');
    }
  }
  const start=()=>{
    clean(document.body);
    new MutationObserver(records=>{
      const roots=new Set();
      for(const r of records) {
        if(r.type==='characterData')roots.add(r.target.parentElement);
        else for(const node of r.addedNodes)roots.add(node.nodeType===1?node:node.parentElement);
      }
      for(const root of roots)if(root?.isConnected)clean(root);
    }).observe(document.body,{childList:true,characterData:true,subtree:true});
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
