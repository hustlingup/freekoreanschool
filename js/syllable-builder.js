/* ═══════════════════════════════════════════════════════
   SyllableBuilder — Stage 3 interactive syllable UI
   (Standalone module; StepRunner calls revealSyllable
   for inline builder steps. This module provides the
   full free-play builder widget on the hangul page.)
═══════════════════════════════════════════════════════ */

'use strict';

const HangulFreeBuilder = (() => {
  const consonants  = ['ㄱ','ㄴ','ㄷ','ㄹ','ㅁ','ㅂ','ㅅ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
  const vowels      = ['ㅏ','ㅑ','ㅓ','ㅕ','ㅗ','ㅛ','ㅜ','ㅠ','ㅡ','ㅣ'];
  const batchimList = ['','ㄱ','ㄴ','ㄷ','ㄹ','ㅁ','ㅂ','ㅅ','ㅇ'];

  // Unicode formula: 0xAC00 + (cho * 21 + jung) * 28 + jong
  const choMap  = {'ㄱ':0,'ㄲ':1,'ㄴ':2,'ㄷ':3,'ㄸ':4,'ㄹ':5,'ㅁ':6,'ㅂ':7,'ㅃ':8,'ㅅ':9,'ㅆ':10,'ㅇ':11,'ㅈ':12,'ㅉ':13,'ㅊ':14,'ㅋ':15,'ㅌ':16,'ㅍ':17,'ㅎ':18};
  const jungMap = {'ㅏ':0,'ㅐ':1,'ㅑ':2,'ㅒ':3,'ㅓ':4,'ㅔ':5,'ㅕ':6,'ㅖ':7,'ㅗ':8,'ㅘ':9,'ㅙ':10,'ㅚ':11,'ㅛ':12,'ㅜ':13,'ㅝ':14,'ㅞ':15,'ㅟ':16,'ㅠ':17,'ㅡ':18,'ㅢ':19,'ㅣ':20};
  const jongMap = {'':0,'ㄱ':1,'ㄲ':2,'ㄳ':3,'ㄴ':4,'ㄵ':5,'ㄶ':6,'ㄷ':7,'ㄹ':8,'ㄺ':9,'ㄻ':10,'ㄼ':11,'ㄽ':12,'ㄾ':13,'ㄿ':14,'ㅀ':15,'ㅁ':16,'ㅂ':17,'ㅄ':18,'ㅅ':19,'ㅆ':20,'ㅇ':21,'ㅈ':22,'ㅊ':23,'ㅋ':24,'ㅌ':25,'ㅍ':26,'ㅎ':27};

  const cvMap = buildCVMap();

  let selectedCons = null;
  let selectedVow  = null;
  let selectedBat  = '';
  let batchimMode  = false;

  function buildCVMap() {
    const m = {};
    const pairs = [
      ['ㄱ',['가','갸','거','겨','고','교','구','규','그','기']],
      ['ㄴ',['나','냐','너','녀','노','뇨','누','뉴','느','니']],
      ['ㄷ',['다','댜','더','뎌','도','됴','두','듀','드','디']],
      ['ㄹ',['라','랴','러','려','로','료','루','류','르','리']],
      ['ㅁ',['마','먀','머','며','모','묘','무','뮤','므','미']],
      ['ㅂ',['바','뱌','버','벼','보','뵤','부','뷰','브','비']],
      ['ㅅ',['사','샤','서','셔','소','쇼','수','슈','스','시']],
      ['ㅇ',['아','야','어','여','오','요','우','유','으','이']],
      ['ㅈ',['자','쟈','저','져','조','죠','주','쥬','즈','지']],
      ['ㅊ',['차','챠','처','쳐','초','쵸','추','츄','츠','치']],
      ['ㅋ',['카','캬','커','켜','코','쿄','쿠','큐','크','키']],
      ['ㅌ',['타','탸','터','텨','토','툐','투','튜','트','티']],
      ['ㅍ',['파','퍄','퍼','펴','포','표','푸','퓨','프','피']],
      ['ㅎ',['하','햐','허','혀','호','효','후','휴','흐','히']],
    ];
    pairs.forEach(([c, syllables]) => {
      vowels.forEach((v, i) => { m[c + v] = syllables[i]; });
    });
    return m;
  }

  function computeSyllable(cons, vow, bat) {
    const cho  = choMap[cons];
    const jung = jungMap[vow];
    const jong = jongMap[bat === undefined ? '' : bat];
    if (cho === undefined || jung === undefined || jong === undefined) return '?';
    return String.fromCodePoint(0xAC00 + (cho * 21 + jung) * 28 + jong);
  }

  function init(containerId, opts) {
    const el = document.getElementById(containerId);
    if (!el) return;
    batchimMode  = !!(opts && opts.batchim);
    selectedCons = null;
    selectedVow  = null;
    selectedBat  = '';

    const _htmlLang = document.documentElement.lang.toLowerCase();
    const _lmLang   = window.LangManager ? window.LangManager.getLang() : 'en';
    const _lang     = _lmLang !== 'en' ? _lmLang
                    : _htmlLang.startsWith('zh') ? 'zh-tw'
                    : _htmlLang === 'ja' ? 'ja' : 'en';
    const isJa   = _lang === 'ja';
    const isZhTw = _lang === 'zh-tw';

    const batchimSection = batchimMode ? `
      <p class="syl-builder-label">${isJa
        ? '받침を選ぶ <span style="font-weight:400;opacity:.7">（任意の終声）：</span>'
        : isZhTw
        ? '選擇收尾音 받침 <span style="font-weight:400;opacity:.7">（可選尾音）：</span>'
        : 'Pick a 받침 <span style="font-weight:400;opacity:.7">(optional final consonant):</span>'}</p>
      <div class="syl-builder-row" id="sb-batchim">
        ${batchimList.map(b =>
          `<button class="syl-picker-btn${b === '' ? ' active' : ''}" data-char="${b}" onclick="HangulFreeBuilder.pickBat('${b}', this)">${b === '' ? '—' : b}</button>`
        ).join('')}
      </div>` : '';

    const batchimSlots = batchimMode ? `
      <span class="syl-plus">+</span>
      <span class="syl-slot" id="sb-bat-slot" style="font-size:1.1rem;min-width:36px;opacity:.7">—</span>` : '';

    el.innerHTML = `
      <div class="syl-builder-widget">
        <p class="syl-builder-label">${isJa
          ? `子音を選ぶ${batchimMode ? '（초성）：' : '：'}`
          : isZhTw
          ? `選擇子音${batchimMode ? '（초성）：' : '：'}`
          : `Pick a consonant${batchimMode ? ' <span style="font-weight:400;opacity:.7">(초성)</span>' : ''}:`}</p>
        <div class="syl-builder-row" id="sb-consonants">
          ${consonants.map(c =>
            `<button class="syl-picker-btn" data-char="${c}" onclick="HangulFreeBuilder.pickCons('${c}', this)">${c}</button>`
          ).join('')}
        </div>
        <p class="syl-builder-label">${isJa
          ? `母音を選ぶ${batchimMode ? '（중성）：' : '：'}`
          : isZhTw
          ? `選擇母音${batchimMode ? '（중성）：' : '：'}`
          : `Pick a vowel${batchimMode ? ' <span style="font-weight:400;opacity:.7">(중성)</span>' : ''}:`}</p>
        <div class="syl-builder-row" id="sb-vowels">
          ${vowels.map(v =>
            `<button class="syl-picker-btn" data-char="${v}" onclick="HangulFreeBuilder.pickVow('${v}', this)">${v}</button>`
          ).join('')}
        </div>
        ${batchimSection}
        <div class="syl-builder-result-row">
          <span class="syl-slot" id="sb-cons-slot">?</span>
          <span class="syl-plus">+</span>
          <span class="syl-slot" id="sb-vow-slot">?</span>
          ${batchimSlots}
          <span class="syl-eq">=</span>
          <span class="syl-slot syl-result-slot" id="sb-result-slot">?</span>
          <button class="btn btn-primary btn-sm" id="sb-play-btn" onclick="HangulFreeBuilder.playResult()" style="display:none">🔊</button>
        </div>
      </div>`;
  }

  function pickCons(c, btn) {
    selectedCons = c;
    document.querySelectorAll('#sb-consonants .syl-picker-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const slot = document.getElementById('sb-cons-slot');
    if (slot) slot.textContent = c;
    tryCombine();
  }

  function pickVow(v, btn) {
    selectedVow = v;
    document.querySelectorAll('#sb-vowels .syl-picker-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const slot = document.getElementById('sb-vow-slot');
    if (slot) slot.textContent = v;
    tryCombine();
  }

  function pickBat(b, btn) {
    selectedBat = b;
    document.querySelectorAll('#sb-batchim .syl-picker-btn').forEach(x => x.classList.remove('active'));
    btn.classList.add('active');
    const slot = document.getElementById('sb-bat-slot');
    if (slot) slot.textContent = b === '' ? '—' : b;
    tryCombine();
  }

  function tryCombine() {
    if (!selectedCons || !selectedVow) return;
    const syllable = batchimMode
      ? computeSyllable(selectedCons, selectedVow, selectedBat)
      : (cvMap[selectedCons + selectedVow] || '?');

    const resultSlot = document.getElementById('sb-result-slot');
    const playBtn    = document.getElementById('sb-play-btn');

    if (resultSlot) {
      resultSlot.textContent = syllable;
      resultSlot.classList.add('syl-revealed');
    }
    if (playBtn) playBtn.style.display = '';

    if (syllable !== '?') {
      if (window.AudioCache) AudioCache.play(syllable);
      else if (window.speakKorean) speakKorean(syllable);
      if (window.playDing) playDing();
    }
  }

  function playResult() {
    const resultSlot = document.getElementById('sb-result-slot');
    const syllable = resultSlot?.textContent;
    if (syllable && syllable !== '?') {
      if (window.AudioCache) AudioCache.play(syllable);
      else if (window.speakKorean) speakKorean(syllable);
    }
  }

  return { init, pickCons, pickVow, pickBat, playResult };
})();

const HangulSyllableBuilder = HangulFreeBuilder;
