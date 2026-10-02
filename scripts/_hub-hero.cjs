'use strict';
const COPY=require('./_course-labels.cjs');
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
module.exports=function redesignHubHero($,section,code) {
  const main=$('main').first(),hero=main.find('.hub-hero,.travel-hero').first();
  if(!hero.length)throw new Error('Missing '+section+' hub hero: '+code);
  const c=COPY[code],title=hero.find('.hub-hero-title').text().trim()||hero.find('h1 .grad-text').text().trim()||hero.find('h1').text().trim();
  const eyebrow=hero.find('.hub-hero-eyebrow,.hero-eyebrow').text().replace(/^\s*·\s*/,'').replace(/\s+/g,' ').trim();
  const intro=hero.find('.hub-hero-lead,.travel-hero-sub').text().replace(/\s+/g,' ').trim();
  const byline=hero.find('.page-byline').clone().removeAttr('style').addClass('hub-hero-meta');
  const cards=main.find('.travel-promo-card').slice(0,4).toArray().map(el=>{
    const n=$(el);return {href:n.attr('href'),title:n.find('.travel-promo-title').text().trim(),label:n.find('.travel-promo-label').text().trim()};
  });
  if(cards.length!==4)throw new Error('Expected four existing guide links: '+section+' '+code);
  const allTopics=section==='culture'?main.find('h2').filter((_,el)=>$(el).closest('.travel-section').find('.travel-promo-grid').length).first():main.find('h2[id]').first();
  if(!allTopics.length)throw new Error('Missing hub guide section: '+section+' '+code);
  const destination=allTopics.attr('id')||section+'-guide-index';allTopics.attr('id',destination);
  const panelLabel=allTopics.closest('.travel-section').find('.section-eyebrow').first().text().trim()||c.browse;
  const titleId=section+'-hub-title',routesId=section+'-hub-routes';
  hero.replaceWith(`<section class="hub-hero hub-hero--${section}" aria-labelledby="${titleId}">
    <div class="hub-hero-copy">
      <p class="hub-hero-eyebrow">${escape(eyebrow)}</p>
      <h1 id="${titleId}" class="hub-hero-title">${escape(title)}</h1>
      <p class="hub-hero-lead">${escape(intro)}</p>
      <div class="hub-hero-actions"><a class="btn btn-primary" href="#${escape(destination)}">${escape(c.browse)} <span aria-hidden="true">→</span></a></div>
      ${$.html(byline)}
    </div>
    <nav class="hub-hero-routes" aria-labelledby="${routesId}">
      <p class="hub-hero-routes-label" id="${routesId}">${escape(panelLabel)}</p>
      <div class="hub-hero-route-list">${cards.map(card=>`<a class="hub-hero-route" href="${escape(card.href)}"><span class="hub-hero-route-label">${escape(card.label)}</span><span class="hub-hero-route-title">${escape(card.title)}</span><span class="hub-hero-route-arrow" aria-hidden="true">↗</span></a>`).join('')}</div>
    </nav>
  </section>`);
  if(!$('link[href="/css/hubs.css"]').length)$('head').append('<link rel="stylesheet" href="/css/hubs.css">');
};
