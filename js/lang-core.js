/* ═══════════════════════════════════════════════════════
   한국어 학교 — Language Manager Core
   Load before app.js. Self-bootstraps the active language pack.
═══════════════════════════════════════════════════════ */
'use strict';

const _langCoreScript = document.currentScript;

/* The nine locales this site ships.
   `<html lang>` is the SINGLE SOURCE OF TRUTH for what language a page is —
   see docs/i18n-locale-leak.md. localStorage remembers the reader's *choice*
   for setLang() navigation; it must never translate a page in place. An
   explicit lang="en" means the page IS English, not "unknown, use the stored
   preference" — reading it the second way is what produced the Thai/English
   hybrid on every English URL a non-English reader arrived at. */
const KS_LANGS = ['en', 'zh-tw', 'ja', 'es', 'fr', 'de', 'vi', 'th', 'id'];

const LangManager = (() => {
  const LS_KEY = 'ks-lang';
  let _lang = 'en';
  const _dicts = {};

  function register(langCode, dict) {
    _dicts[langCode] = dict;
    if (_lang === langCode) _apply(langCode);
  }

  function getLang() { return _lang; }

  function t(key) { const d = _dicts[_lang]; return (d && d[key]) ? d[key] : key; }

  function init() {
    // <html lang> wins whenever it names a locale we ship — INCLUDING 'en'.
    // localStorage is consulted only when the attribute is absent or is a
    // locale we do not have a pack for.
    const htmlLang = (document.documentElement.getAttribute('lang') || '').toLowerCase();
    if (KS_LANGS.indexOf(htmlLang) !== -1) {
      _lang = htmlLang;
    } else {
      const stored = (localStorage.getItem(LS_KEY) || '').toLowerCase();
      _lang = KS_LANGS.indexOf(stored) !== -1 ? stored : 'en';
    }

    if (_lang !== 'en') _apply(_lang);
    _renderBtn(_lang);
    _renderHeroPicker();
    _initFlagSvgs(); // after _apply so dict lookups still match emoji-keyed strings

    document.addEventListener('keydown', e => { if (e.key === 'Escape') _closeLangModal(); });
  }

  function setLang(lang) {
    localStorage.setItem(LS_KEY, lang);

    // Learn pages: always start at Hangul in the target language
    if (/\/learn\//i.test(window.location.pathname)) {
      const base = window.location.pathname.replace(/\/learn\/.*$/, '');
      window.location.href = lang === 'en'
        ? base + '/learn/hangul.html'
        : base + '/learn/' + lang + '/hangul.html';
      return;
    }

    // All other pages: navigate to the same page in the target language via hreflang
    const links = document.querySelectorAll('link[rel="alternate"][hreflang]');
    for (const link of links) {
      if (link.getAttribute('hreflang').toLowerCase() === lang.toLowerCase()) {
        window.location.href = new URL(link.href).pathname;
        return;
      }
    }

    // Fallback: navigate to language root
    const roots = { en: '/', 'zh-tw': '/zh-tw/', ja: '/ja/', es: '/es/', fr: '/fr/', de: '/de/', vi: '/vi/', th: '/th/', id: '/id/' };
    window.location.href = roots[lang] || '/';
  }

  function _translateNode(root, dict) {
    const d = dict || _dicts[_lang];
    if (!d) return;
    const walker = document.createTreeWalker(
      root, NodeFilter.SHOW_TEXT,
      { acceptNode: n => n.textContent.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT }
    );
    let node;
    while ((node = walker.nextNode())) {
      const txt = node.textContent.trim().replace(/\s+/g, ' ');
      if (d[txt]) node.textContent = d[txt];
    }
  }

  function _apply(lang) {
    const dict = _dicts[lang];
    if (!dict) return;
    document.body.classList.add('lang-' + lang);
    _translateNode(document.body, dict);
    document.querySelectorAll('input[placeholder]').forEach(el => {
      if (dict[el.placeholder]) el.placeholder = dict[el.placeholder];
    });
    const obs = new MutationObserver(mutations => {
      for (const m of mutations) {
        if (m.type !== 'childList') continue;
        m.addedNodes.forEach(n => {
          if (n.nodeType === Node.ELEMENT_NODE) {
            _translateNode(n, dict);
          } else if (n.nodeType === Node.TEXT_NODE) {
            const txt = n.textContent.trim().replace(/\s+/g, ' ');
            if (dict[txt]) n.textContent = dict[txt];
          }
        });
      }
    });
    obs.observe(document.body, { childList: true, subtree: true });
  }

  /* ── Flag emoji → inline SVG ─────────────────────────────
     Windows has no flag emoji font: regional-indicator pairs render
     as letters (e.g. "KR"). Replace known flag emoji in text nodes
     with inline SVG so PC and mobile both show real flags. */
  const _FLAG_SVG = {
    '🇰🇷': '<svg viewBox="0 0 60 40"><rect width="60" height="40" fill="#fff"/><circle cx="30" cy="20" r="10" fill="#0047A0"/><path transform="rotate(45 30 20)" d="M20 20a10 10 0 0 1 20 0 5 5 0 0 0-10 0 5 5 0 0 1-10 0z" fill="#CD2E3A"/><g fill="#000"><g transform="translate(15.44 10.29) rotate(-56.31)"><rect x="-6" y="-5.4" width="12" height="2.7"/><rect x="-6" y="-1.35" width="12" height="2.7"/><rect x="-6" y="2.7" width="12" height="2.7"/></g><g transform="translate(44.56 10.29) rotate(56.31)"><rect x="-6" y="-5.4" width="5.3" height="2.7"/><rect x="0.7" y="-5.4" width="5.3" height="2.7"/><rect x="-6" y="-1.35" width="12" height="2.7"/><rect x="-6" y="2.7" width="5.3" height="2.7"/><rect x="0.7" y="2.7" width="5.3" height="2.7"/></g><g transform="translate(15.44 29.71) rotate(56.31)"><rect x="-6" y="-5.4" width="12" height="2.7"/><rect x="-6" y="-1.35" width="5.3" height="2.7"/><rect x="0.7" y="-1.35" width="5.3" height="2.7"/><rect x="-6" y="2.7" width="12" height="2.7"/></g><g transform="translate(44.56 29.71) rotate(-56.31)"><rect x="-6" y="-5.4" width="5.3" height="2.7"/><rect x="0.7" y="-5.4" width="5.3" height="2.7"/><rect x="-6" y="-1.35" width="5.3" height="2.7"/><rect x="0.7" y="-1.35" width="5.3" height="2.7"/><rect x="-6" y="2.7" width="5.3" height="2.7"/><rect x="0.7" y="2.7" width="5.3" height="2.7"/></g></g></svg>',
    '🇺🇸': '<svg viewBox="0 0 60 40"><rect width="60" height="40" fill="#B22234"/><g fill="#fff"><rect y="3.1" width="60" height="3.1"/><rect y="9.2" width="60" height="3.1"/><rect y="15.4" width="60" height="3.1"/><rect y="21.5" width="60" height="3.1"/><rect y="27.7" width="60" height="3.1"/><rect y="33.8" width="60" height="3.1"/></g><rect width="24" height="21.5" fill="#3C3B6E"/><g fill="#fff"><circle cx="4" cy="4" r="1.1"/><circle cx="12" cy="4" r="1.1"/><circle cx="20" cy="4" r="1.1"/><circle cx="8" cy="8" r="1.1"/><circle cx="16" cy="8" r="1.1"/><circle cx="4" cy="12" r="1.1"/><circle cx="12" cy="12" r="1.1"/><circle cx="20" cy="12" r="1.1"/><circle cx="8" cy="16" r="1.1"/><circle cx="16" cy="16" r="1.1"/></g></svg>',
    '🇹🇼': '<svg viewBox="0 0 60 40"><rect width="60" height="40" fill="#FE0000"/><rect width="30" height="20" fill="#000095"/><polygon fill="#fff" points="21,10 17.4,10.7 20.2,13 16.8,11.8 18,15.2 15.7,12.4 15,16 14.3,12.4 12,15.2 13.2,11.8 9.8,13 12.6,10.7 9,10 12.6,9.3 9.8,7 13.2,8.2 12,4.8 14.3,7.6 15,4 15.7,7.6 18,4.8 16.8,8.2 20.2,7 17.4,9.3"/><circle cx="15" cy="10" r="2.9" fill="#000095"/><circle cx="15" cy="10" r="2.2" fill="#fff"/></svg>',
    '🇯🇵': '<svg viewBox="0 0 60 40"><rect width="60" height="40" fill="#fff"/><circle cx="30" cy="20" r="12" fill="#BC002D"/></svg>',
    '🇪🇸': '<svg viewBox="0 0 60 40"><rect width="60" height="40" fill="#AA151B"/><rect y="10" width="60" height="20" fill="#F1BF00"/></svg>',
    '🇫🇷': '<svg viewBox="0 0 60 40"><rect width="60" height="40" fill="#fff"/><rect width="20" height="40" fill="#0055A4"/><rect x="40" width="20" height="40" fill="#EF4135"/></svg>',
    '🇩🇪': '<svg viewBox="0 0 60 40"><rect width="60" height="40" fill="#FFCE00"/><rect width="60" height="13.3" fill="#000"/><rect y="13.3" width="60" height="13.4" fill="#D00"/></svg>',
    '🇻🇳': '<svg viewBox="0 0 60 40"><rect width="60" height="40" fill="#DA251D"/><polygon fill="#FF0" points="30,8 32.8,16.1 41.4,16.3 34.6,21.5 37.1,29.7 30,24.8 22.9,29.7 25.4,21.5 18.6,16.3 27.2,16.1"/></svg>',
    '🇮🇩': '<svg viewBox="0 0 60 40"><rect width="60" height="40" fill="#fff"/><rect width="60" height="20" fill="#E70011"/></svg>',
    '🇹🇭': '<svg viewBox="0 0 60 40"><rect width="60" height="40" fill="#A51931"/><rect y="6.7" width="60" height="26.6" fill="#F4F5F8"/><rect y="13.3" width="60" height="13.4" fill="#2D2A4A"/></svg>',
    '🇨🇳': '<svg viewBox="0 0 60 40"><rect width="60" height="40" fill="#DE2910"/><polygon fill="#FFDE00" points="10,4 11.4,8.1 15.7,8.2 12.3,10.7 13.5,14.9 10,12.4 6.5,14.9 7.7,10.7 4.3,8.2 8.6,8.1"/><circle cx="20" cy="4" r="1.5" fill="#FFDE00"/><circle cx="23" cy="8" r="1.5" fill="#FFDE00"/><circle cx="23" cy="13" r="1.5" fill="#FFDE00"/><circle cx="20" cy="17" r="1.5" fill="#FFDE00"/></svg>',
    '🇲🇳': '<svg viewBox="0 0 60 40"><rect width="60" height="40" fill="#C4272F"/><rect x="20" width="20" height="40" fill="#015197"/><g fill="#F9CF02"><circle cx="10" cy="11" r="2.5"/><rect x="6" y="15" width="8" height="2"/><rect x="6" y="19" width="2" height="11"/><rect x="12" y="19" width="2" height="11"/><rect x="9" y="19" width="2" height="7"/><rect x="6" y="28" width="8" height="2"/></g></svg>'
  };
  const _FLAG_KEYS = Object.keys(_FLAG_SVG);
  const _FLAG_RE = new RegExp(_FLAG_KEYS.join('|'), 'g');

  function _svgifyTextNode(node) {
    const txt = node.textContent;
    if (!_FLAG_KEYS.some(k => txt.includes(k))) return;
    const p = node.parentNode;
    if (!p || /^(SCRIPT|STYLE|TEXTAREA|TITLE)$/i.test(p.nodeName)) return;
    if (p.closest && p.closest('.ks-flag')) return;
    const tpl = document.createElement('template');
    tpl.innerHTML = txt
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(_FLAG_RE, m => '<span class="ks-flag" aria-hidden="true">' + _FLAG_SVG[m] + '</span>');
    node.replaceWith(tpl.content);
  }

  function _svgifyFlags(root) {
    if (!root) return;
    if (root.nodeType === Node.TEXT_NODE) return _svgifyTextNode(root);
    if (root.nodeType !== Node.ELEMENT_NODE) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    let n;
    while ((n = walker.nextNode())) nodes.push(n);
    nodes.forEach(_svgifyTextNode);
  }

  function _initFlagSvgs() {
    _svgifyFlags(document.body);
    // Catch dynamic content: lang modal, search results, ticker, step-runner,
    // and dict translations that re-introduce flag emoji via textContent.
    new MutationObserver(muts => {
      for (const m of muts) {
        if (m.type === 'characterData') _svgifyTextNode(m.target);
        else m.addedNodes.forEach(_svgifyFlags);
      }
    }).observe(document.body, { childList: true, subtree: true, characterData: true });
  }

  function _renderHeroPicker() {
    const target = document.querySelector('.hero-content');
    if (!target) return;
    const picker = document.createElement('div');
    picker.className = 'lang-hero-picker';
    picker.innerHTML = `
      <span class="lang-hero-label">Choose your language / 언어 선택 / 選擇語言</span>
      <div class="lang-hero-btns">
        <button class="lang-hero-btn${_lang === 'en' ? ' active' : ''}" onclick="LangManager.setLang('en')">🇺🇸 English</button>
        <button class="lang-hero-btn${_lang === 'zh-tw' ? ' active' : ''}" onclick="LangManager.setLang('zh-tw')">🇹🇼 繁體中文</button>
        <button class="lang-hero-btn${_lang === 'ja' ? ' active' : ''}" onclick="LangManager.setLang('ja')">🇯🇵 日本語</button>
        <button class="lang-hero-btn${_lang === 'es' ? ' active' : ''}" onclick="LangManager.setLang('es')">🇪🇸 Español</button>
        <button class="lang-hero-btn${_lang === 'fr' ? ' active' : ''}" onclick="LangManager.setLang('fr')">🇫🇷 Français</button>
        <button class="lang-hero-btn${_lang === 'de' ? ' active' : ''}" onclick="LangManager.setLang('de')">🇩🇪 Deutsch</button>
        <button class="lang-hero-btn${_lang === 'vi' ? ' active' : ''}" onclick="LangManager.setLang('vi')">🇻🇳 Tiếng Việt</button>
        <button class="lang-hero-btn${_lang === 'th' ? ' active' : ''}" onclick="LangManager.setLang('th')">🇹🇭 ไทย</button>
        <button class="lang-hero-btn${_lang === 'id' ? ' active' : ''}" onclick="LangManager.setLang('id')">🇮🇩 Bahasa Indonesia</button>
      </div>`;
    target.prepend(picker);
  }

  function _renderBtn(lang) {
    // Support both English pages (#lang-toggle) and zh-tw pages (#lang-picker-btn)
    const btn = document.getElementById('lang-toggle') || document.getElementById('lang-picker-btn');
    if (!btn) return;
    btn.textContent = '🌐';
    // Remove any existing static dropdown
    const existingDd = document.getElementById('lang-dropdown');
    if (existingDd) existingDd.remove();
    btn.addEventListener('click', e => { e.stopPropagation(); _openLangModal(); });
  }

  function _buildLangModal(currentLang) {
    if (document.getElementById('lang-modal-overlay')) return;
    const overlay = document.createElement('div');
    overlay.id = 'lang-modal-overlay';
    overlay.className = 'lang-modal-overlay';
    const langs = [
      { code: 'en',    flag: '🇺🇸', name: 'English' },
      { code: 'zh-tw', flag: '🇹🇼', name: '繁體中文' },
      { code: 'ja',    flag: '🇯🇵', name: '日本語' },
      { code: 'es',    flag: '🇪🇸', name: 'Español' },
      { code: 'fr',    flag: '🇫🇷', name: 'Français' },
      { code: 'de',    flag: '🇩🇪', name: 'Deutsch' },
      { code: 'vi',    flag: '🇻🇳', name: 'Tiếng Việt' },
      { code: 'th',    flag: '🇹🇭', name: 'ไทย' },
      { code: 'id',    flag: '🇮🇩', name: 'Bahasa Indonesia' }
    ];
    overlay.innerHTML = `
      <div class="lang-modal" role="dialog" aria-modal="true" aria-label="Select language">
        <p class="lang-modal-title">Select Language</p>
        ${langs.map(l => `
          <button class="lang-modal-item${currentLang === l.code ? ' active' : ''}" data-lang="${l.code}">
            ${l.flag} ${l.name}
          </button>`).join('')}
      </div>`;
    overlay.addEventListener('click', e => { if (e.target === overlay) _closeLangModal(); });
    overlay.querySelectorAll('.lang-modal-item').forEach(item => {
      item.addEventListener('click', () => { _closeLangModal(); LangManager.setLang(item.dataset.lang); });
    });
    document.body.appendChild(overlay);
  }

  function _openLangModal() {
    _buildLangModal(_lang);
    document.getElementById('lang-modal-overlay').classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function _closeLangModal() {
    document.getElementById('lang-modal-overlay')?.classList.remove('open');
    document.body.style.overflow = '';
  }

  return { register, init, setLang, getLang, t, translateNode: (root) => _translateNode(root, _dicts[_lang]) };
})();

window.LangManager = LangManager;

/* Bootstrap: synchronously inject the active language pack into the parse stream.
   document.write during <head> parsing executes the script before the parser continues,
   guaranteeing zero race conditions and zero cost for English users. */
(function() {
  // Same precedence as init(): never document.write a pack whose code differs
  // from the page's declared language.
  var htmlLang = (document.documentElement.getAttribute('lang') || '').toLowerCase();
  var lang = KS_LANGS.indexOf(htmlLang) !== -1
    ? htmlLang
    : (localStorage.getItem('ks-lang') || '').toLowerCase();
  if (!lang || lang === 'en' || KS_LANGS.indexOf(lang) === -1 || !_langCoreScript) return;
  var src = _langCoreScript.src.replace(/lang-core\.js([^/]*)$/, 'langs/lang-' + lang + '.js');
  document.write('<script src="' + src + '"><\/script>'); // eslint-disable-line
})();
