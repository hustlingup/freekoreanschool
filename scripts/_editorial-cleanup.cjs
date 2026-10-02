'use strict';
const {stripEmoji,iconSVG,buttonKind}=require('../js/editorial-cleanup.js');
module.exports=function cleanEditorialHTML($,copy) {
  $('#legend-emoji-toggle').remove();
  $('body button,body a[role="button"]').each((_,el)=>{
    const node=$(el),text=node.text().trim();
    if(!text||stripEmoji(text).trim()||node.find('img,svg').length)return;
    const kind=buttonKind(text,(node.attr('id')||'')+' '+(node.attr('aria-label')||node.attr('title')||''));
    if(!node.attr('aria-label'))node.attr('aria-label',stripEmoji(node.attr('title')||'')||({sound:copy?.listen||'Listen',globe:'Language',search:'Search',moon:'Theme',sun:'Theme',menu:'Menu',stop:'Stop',close:'Close'})[kind]);
    node.attr('data-editorial-icon',kind);
    node.html(iconSVG(kind));
  });
  $('#mobile-menu-btn').attr('data-editorial-icon','menu').html(iconSVG('menu'));
  $('body *').not('script,style,textarea,pre,code,svg,svg *').each((_,el)=>{
    const node=$(el);if(node.closest('script,style,textarea,pre,code,svg').length)return;
    node.contents().each((_,child)=>{if(child.type==='text')child.data=stripEmoji(child.data)});
    for(const attr of ['title','aria-label','placeholder'])if(node.attr(attr))node.attr(attr,stripEmoji(node.attr(attr)));
    if(/(?:^|[\s-])(?:emoji|icon)(?:[\s-]|$)/.test(node.attr('class')||'')&&!node.text().trim()&&!node.children().length&&!node.is('button,input,select,textarea'))node.addClass('editorial-empty');
  });
  if(!$('link[href="/css/editorial.css"]').length)$('head').append('<link rel="stylesheet" href="/css/editorial.css">');
  if(!$('script[src="/js/editorial-cleanup.js"]').length)$('body').append('<script src="/js/editorial-cleanup.js" defer></script>');
};
