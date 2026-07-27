/* ═══════════════════════════════════════════════════════
   한국어 학교 — Main Application JavaScript
   Multi-Agent Korean Learning Platform
═══════════════════════════════════════════════════════ */

'use strict';

/* ── Theme Manager ──────────────────────────────────── */
const ThemeManager = (() => {
  const STORAGE_KEY = 'ks-theme';

  function init() {
    const saved = localStorage.getItem(STORAGE_KEY) || 'light';
    apply(saved);
  }

  function apply(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
    updateBtn(theme);
  }

  function toggle() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    apply(current === 'dark' ? 'light' : 'dark');
  }

  function updateBtn(theme) {
    const btn = document.getElementById('theme-toggle');
    if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
  }

  return { init, toggle };
})();


/* ── Floating Korean Characters ─────────────────────── */
const FloatingChars = (() => {
  const chars = ['가', '나', '다', '라', '마', '바', '사', '아', '자', '차', '카', '타', '파', '하',
                 '한', '국', '어', '학', '교', '문', '화', '여', '행', '음', '식', '사', '랑'];

  function init(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    chars.forEach((char, i) => {
      const el = document.createElement('span');
      el.className = 'floating-char';
      el.textContent = char;

      const size = Math.random() * 40 + 30;
      el.style.cssText = `
        left: ${Math.random() * 100}%;
        font-size: ${size}px;
        animation-duration: ${Math.random() * 15 + 12}s;
        animation-delay: ${Math.random() * 8}s;
      `;
      container.appendChild(el);
    });
  }

  return { init };
})();

/* ── Scroll Animations ──────────────────────────────── */
const ScrollAnimator = (() => {
  let observer;

  function init() {
    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
  }

  function observe(el) {
    if (observer) observer.observe(el);
  }

  return { init, observe };
})();

/* ── Mobile Sidebar ─────────────────────────────────── */
const MobileSidebar = (() => {
  let overlay;

  function init() {
    const btn = document.getElementById('mobile-menu-btn');
    const sidebar = document.querySelector('.sidebar');
    if (!btn || !sidebar) return;

    overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed; inset: 0; background: rgba(0,0,0,0.6);
      z-index: 99; display: none; backdrop-filter: blur(4px);
    `;
    document.body.appendChild(overlay);

    // Inject close button into sidebar header on mobile
    const sidebarHeader = sidebar.querySelector('.sidebar-header');
    if (sidebarHeader && !sidebarHeader.querySelector('.sidebar-close-btn')) {
      const closeBtn = document.createElement('button');
      closeBtn.className = 'icon-btn sidebar-close-btn';
      closeBtn.setAttribute('aria-label', 'Close menu');
      closeBtn.textContent = '✕';
      closeBtn.addEventListener('click', close);
      sidebarHeader.appendChild(closeBtn);
    }

    btn.addEventListener('click', open);
    overlay.addEventListener('click', close);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  }

  function open() {
    const sidebar = document.querySelector('.sidebar');
    sidebar?.classList.add('open');
    overlay.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  function close() {
    const sidebar = document.querySelector('.sidebar');
    sidebar?.classList.remove('open');
    overlay.style.display = 'none';
    document.body.style.overflow = '';
  }

  return { init };
})();

/* ── Mobile Nav (non-sidebar pages) ─────────────────── */
const MobileNav = (() => {
  let panel, overlay;

  function buildPanel() {
    const links = Array.from(document.querySelectorAll('.nav-links a'));
    const items = links.map(a =>
      `<a href="${a.getAttribute('href')}" class="mobile-nav-link${a.classList.contains('active') ? ' active' : ''}">${a.innerHTML}</a>`
    ).join('');

    panel = document.createElement('div');
    panel.className = 'mobile-nav-panel';
    panel.innerHTML = `
      <div class="mobile-nav-panel-head">
        <span class="mobile-nav-panel-title">Menu</span>
        <button class="icon-btn" id="mobile-nav-close" aria-label="Close menu">✕</button>
      </div>
      <nav class="mobile-nav-panel-links">${items}</nav>
    `;

    overlay = document.createElement('div');
    overlay.className = 'mobile-nav-overlay';

    document.body.appendChild(overlay);
    document.body.appendChild(panel);

    document.getElementById('mobile-nav-close').addEventListener('click', close);
    overlay.addEventListener('click', close);
    panel.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  }

  function open() {
    panel.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    if (!panel) return;
    panel.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  function init() {
    const btn = document.getElementById('mobile-menu-btn');
    if (!btn || document.querySelector('.sidebar')) return;
    buildPanel();
    btn.addEventListener('click', open);
  }

  return { init };
})();

/* ── Hangul Quiz ────────────────────────────────────── */
const HangulQuiz = (() => {
  const questions = [
    { char: 'ㅏ', options: ['a', 'o', 'i', 'u'], answer: 'a' },
    { char: 'ㅗ', options: ['a', 'o', 'i', 'e'], answer: 'o' },
    { char: 'ㅣ', options: ['a', 'o', 'i', 'u'], answer: 'i' },
    { char: 'ㅜ', options: ['a', 'o', 'u', 'e'], answer: 'u' },
    { char: 'ㅓ', options: ['a', 'eo', 'i', 'e'], answer: 'eo' },
    { char: 'ㄱ', options: ['n', 'g/k', 'd', 'm'], answer: 'g/k' },
    { char: 'ㄴ', options: ['n', 'g', 'd', 'l'], answer: 'n' },
    { char: 'ㅁ', options: ['b', 'n', 'm', 'h'], answer: 'm' },
    { char: '가', options: ['ga', 'na', 'da', 'ba'], answer: 'ga' },
    { char: '나', options: ['ga', 'na', 'da', 'ba'], answer: 'na' },
    { char: '안녕', options: ['hello', 'thank you', 'goodbye', 'yes'], answer: 'hello' },
    { char: '감사', options: ['sorry', 'thank you', 'hello', 'please'], answer: 'thank you' },
  ];

  let current = 0;
  let score = 0;
  let total = 0;

  function init() {
    const quizEl = document.getElementById('hangul-quiz');
    if (!quizEl) return;
    loadQuestion();
  }

  function loadQuestion() {
    const quizEl = document.getElementById('hangul-quiz');
    if (!quizEl) return;

    if (current >= questions.length) {
      showResult();
      return;
    }

    const q = questions[current];
    const questionEl = quizEl.querySelector('.quiz-question');
    const optionsEl = quizEl.querySelector('.quiz-options');
    const scoreEl = quizEl.querySelector('.quiz-score');

    if (questionEl) questionEl.textContent = q.char;
    if (scoreEl) scoreEl.textContent = `${score}/${total} correct`;
    if (!optionsEl) return;

    optionsEl.innerHTML = '';
    const shuffled = [...q.options].sort(() => Math.random() - 0.5);

    shuffled.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option';
      btn.textContent = opt;
      btn.addEventListener('click', () => selectAnswer(btn, opt, q.answer));
      optionsEl.appendChild(btn);
    });
  }

  function selectAnswer(btn, selected, correct) {
    const optionsEl = document.querySelector('.quiz-options');
    if (!optionsEl) return;

    total++;
    const isCorrect = selected === correct;
    if (isCorrect) score++;

    optionsEl.querySelectorAll('.quiz-option').forEach(b => {
      b.disabled = true;
      if (b.textContent === correct) b.classList.add('correct');
      else if (b === btn && !isCorrect) b.classList.add('wrong');
    });

    setTimeout(() => {
      current++;
      if (current >= questions.length) current = 0;
      loadQuestion();
    }, 1200);
  }

  function showResult() {
    const quizEl = document.getElementById('hangul-quiz');
    if (!quizEl) return;

    const pct = Math.round((score / total) * 100);
    quizEl.innerHTML = `
      <div style="text-align:center; padding: 20px;">
        <div style="font-size:3rem; margin-bottom:12px;">${pct >= 80 ? '🎉' : pct >= 60 ? '👍' : '💪'}</div>
        <div style="font-size:1.5rem; font-weight:800; margin-bottom:8px;">${pct}% Score</div>
        <div style="color:var(--text-muted); margin-bottom:20px;">${score} out of ${total} correct</div>
        <button class="btn btn-primary" onclick="HangulQuiz.reset()">Try Again</button>
      </div>`;
  }

  function reset() {
    current = 0; score = 0; total = 0;
    init();
  }

  return { init, reset };
})();

/* ── Hangul Card Interaction ────────────────────────── */
function initHangulCards() {
  document.querySelectorAll('.hangul-card').forEach(card => {
    card.addEventListener('click', function() {
      const char = this.querySelector('.hangul-char')?.textContent;
      const rom = this.querySelector('.hangul-rom')?.textContent;
      if (char && rom) showCharModal(char, rom);
    });
  });

  document.querySelectorAll('.hangul-sound-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      const char = this.closest('.hangul-card')?.querySelector('.hangul-char')?.textContent;
      speakKorean(char, this);
    });
  });
}

let _currentAudio = null;
let _currentBtn = null;

function _revertCurrent() {
  const btn = _currentBtn;
  _currentBtn = null;
  if (btn && btn.dataset.speakOrig !== undefined) {
    btn.innerHTML = btn.dataset.speakOrig;
    btn.setAttribute('aria-label', '듣기');
    delete btn.dataset.speakOrig;
  }
}

function _setBtnPlaying(btn) {
  if (!btn) return;
  _currentBtn = btn;
  btn.dataset.speakOrig = btn.innerHTML;
  btn.innerHTML = '⏹';
  btn.setAttribute('aria-label', '정지');
}

function stopSpeaking() {
  if (_currentAudio) {
    _currentAudio.pause();
    _currentAudio.src = '';
    _currentAudio = null;
  }
  window.speechSynthesis && window.speechSynthesis.cancel();
  _revertCurrent();
}

function _googleTTS(text, speed, btn) {
  stopSpeaking();

  const params = new URLSearchParams({ text });
  if (speed && speed < 1) params.set('speed', speed);
  const audio = new Audio('/api/tts?' + params);
  _currentAudio = audio;
  _setBtnPlaying(btn);

  audio.addEventListener('ended', () => {
    if (_currentAudio !== audio) return;
    _currentAudio = null;
    _revertCurrent();
  }, { once: true });

  // If the proxy isn't available (localhost, etc.), fall back to Web Speech API.
  audio.addEventListener('error', () => {
    if (_currentAudio !== audio) return;
    _currentAudio = null;
    _revertCurrent();
    _speakFallback(text, speed < 1 ? 0.7 : 0.9, btn);
  }, { once: true });

  audio.play().catch(() => {});
}

function _speakFallback(text, rate, btn) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const attempt = voices => {
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = 'ko-KR';
    utt.rate = rate || 0.8;
    const best = voices
      .filter(v => /^ko/i.test(v.lang))
      .sort((a, b) => {
        const rank = v => (v.name.includes('Natural') ? 4 : 0) +
                          (v.name.includes('Online')  ? 3 : 0) +
                          (!v.localService            ? 2 : 0);
        return rank(b) - rank(a);
      })[0];
    if (best) utt.voice = best;
    _setBtnPlaying(btn);
    utt.onend = () => { if (_currentBtn === btn) _revertCurrent(); };
    utt.onerror = () => { if (_currentBtn === btn) _revertCurrent(); };
    window.speechSynthesis.speak(utt);
  };
  const voices = window.speechSynthesis.getVoices();
  if (voices.length) attempt(voices);
  else window.speechSynthesis.addEventListener('voiceschanged',
    () => attempt(window.speechSynthesis.getVoices()), { once: true });
}

function speakKorean(text, btn) {
  if (!text) return;
  if (btn && btn === _currentBtn) { stopSpeaking(); return; }
  _googleTTS(text, 1, btn);
}

function speakSyllable(text, btn) {
  if (!text) return;
  if (btn && btn === _currentBtn) { stopSpeaking(); return; }
  _googleTTS(text, 0.7, btn);
}

/* ── Dopamine: Ding (Web Audio API) ─────────────────── */
function playDing() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 880;
    osc.type = 'sine';
    gain.gain.setValueAtTime(0.4, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.4);
  } catch (_) {}
}

/* ── Dopamine: Confetti burst ───────────────────────── */
function spawnConfetti(anchorEl) {
  const colors = ['#E8003D', '#0055CC', '#FFD700', '#28c864', '#FF6B8A'];
  const rect = anchorEl ? anchorEl.getBoundingClientRect() : { left: window.innerWidth / 2, top: window.innerHeight / 2, width: 0 };
  const cx = rect.left + rect.width / 2;
  const cy = rect.top;

  for (let i = 0; i < 24; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = Math.max(4, Math.min(window.innerWidth - 12, cx + (Math.random() - 0.5) * 120)) + 'px';
    piece.style.top  = cy + 'px';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDelay = Math.random() * 0.2 + 's';
    document.body.appendChild(piece);
    piece.addEventListener('animationend', () => piece.remove(), { once: true });
  }
}

/* ── Audio Cache (prefetch + cache-first playback) ──── */
const AudioCache = (() => {
  const _cache = {};

  async function prefetch(textArray) {
    for (const text of textArray) {
      if (!text || _cache[text]) continue;
      fetch(`/api/tts?text=${encodeURIComponent(text)}&speed=1`)
        .then(r => r.ok ? r.arrayBuffer() : Promise.reject())
        .then(buf => { _cache[text] = buf; })
        .catch(() => {});
    }
  }

  async function play(text, btn) {
    if (!text) return;
    stopSpeaking();
    const buf = _cache[text];
    if (!buf) { speakKorean(text, btn); return; }
    _setBtnPlaying(btn);
    try {
      const ctx = new AudioContext();
      const decoded = await ctx.decodeAudioData(buf.slice(0));
      const src = ctx.createBufferSource();
      src.buffer = decoded;
      src.connect(ctx.destination);
      src.onended = () => { if (_currentBtn === btn) _revertCurrent(); };
      src.start();
    } catch (_) {
      if (_currentBtn === btn) _revertCurrent();
      speakKorean(text, btn);
    }
  }

  return { prefetch, play };
})();

function showCharModal(char, romanization) {
  const existing = document.getElementById('char-modal');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.id = 'char-modal';
  modal.style.cssText = `
    position: fixed; inset: 0; z-index: 500;
    display: flex; align-items: center; justify-content: center;
    background: rgba(0,0,0,0.7); backdrop-filter: blur(8px);
    animation: fadeInUp 0.2s ease;
  `;

  modal.innerHTML = `
    <div style="
      background: var(--bg-2); border: 1px solid var(--border);
      border-radius: 24px; padding: 40px; text-align: center;
      max-width: 300px; width: 90%; position: relative;
      box-shadow: var(--shadow-lg);
    ">
      <button onclick="document.getElementById('char-modal').remove()" style="
        position: absolute; top: 14px; right: 14px;
        background: var(--glass); border: 1px solid var(--border);
        border-radius: 8px; width: 32px; height: 32px;
        display: flex; align-items: center; justify-content: center;
        cursor: pointer; color: var(--text-muted); font-size: 1.1rem;
      ">×</button>
      <div style="font-family: 'Noto Sans KR', sans-serif; font-size: 6rem; font-weight: 900; line-height: 1; margin-bottom: 16px; color: var(--text);">${char}</div>
      <div style="font-size: 1.4rem; color: var(--primary-light); font-weight: 700; margin-bottom: 8px;">${romanization}</div>
      <button onclick="speakKorean('${char}', this)" class="btn btn-primary btn-sm" style="margin-top: 16px;">
        🔊 Hear Pronunciation
      </button>
    </div>`;

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.remove();
  });

  document.body.appendChild(modal);
}

/* ── AI Chat Interface ──────────────────────────────── */
const AgentChat = (() => {
  const agents = {
    language: {
      name: '언어 선생님 (Language Teacher)',
      avatar: '🎓',
      responses: [
        { trigger: ['hello', 'hi', 'hey'], reply: '안녕하세요! (Annyeonghaseyo!) Hello! I\'m your Korean language tutor. What would you like to learn today?' },
        { trigger: ['hangul', 'alphabet', 'letters'], reply: '한글 (Hangul) is the Korean alphabet created in 1443! It has 14 consonants and 10 vowels. It\'s very logical and most people can learn to read it in just a few hours!' },
        { trigger: ['how', 'learn', 'start'], reply: 'Great question! Start with 한글 (Hangul) — the Korean alphabet. Once you can read/write, practice basic phrases like:\n• 안녕하세요 (Annyeonghaseyo) - Hello\n• 감사합니다 (Gamsahamnida) - Thank you\n• 괜찮아요 (Gwaenchanayo) - It\'s okay' },
        { trigger: ['grammar', 'sentence'], reply: 'Korean grammar follows SOV (Subject-Object-Verb) order, opposite to English! For example:\n"I apple eat" = 나는 사과를 먹어요 (I apple eat)\nParticles are used to mark roles — 은/는 for topics, 이/가 for subjects.' },
        { trigger: ['number', 'count'], reply: 'Korean has TWO number systems!\n• Native Korean: 하나(1) 둘(2) 셋(3) 넷(4) 다섯(5)\n• Sino-Korean: 일(1) 이(2) 삼(3) 사(4) 오(5)\nUse Sino-Korean for dates, money, and phone numbers!' },
        { trigger: [], reply: '좋은 질문이에요! (Good question!) Keep studying — consistency is key to learning Korean. Try to practice 30 minutes daily. 화이팅! (Hwaiting!) - You\'ve got this!' },
      ]
    },
    culture: {
      name: '문화 가이드 (Culture Guide)',
      avatar: '🎵',
      responses: [
        { trigger: ['kpop', 'bts', 'blackpink', 'music'], reply: 'K-Pop (케이팝) is a global phenomenon! Learning Korean through K-Pop lyrics is a great method. Popular artists like BTS, BLACKPINK, and NewJeans use a mix of Korean and English — perfect for learners!' },
        { trigger: ['kdrama', 'drama', 'show', 'netflix'], reply: 'K-Dramas (한국 드라마) are amazing for learning! Watching with Korean subtitles helps you connect sounds to text. Popular picks: "이태원 클라쓰", "사랑의 불시착", "오징어 게임"' },
        { trigger: ['food', 'eat', 'kimchi'], reply: '한국 음식 (Korean Food) is incredible! Must-try dishes:\n• 김치 (Kimchi) - fermented cabbage\n• 비빔밥 (Bibimbap) - mixed rice bowl\n• 삼겹살 (Samgyeopsal) - grilled pork belly\n• 떡볶이 (Tteokbokki) - spicy rice cakes' },
        { trigger: [], reply: '한국 문화는 정말 아름다워요! Korean culture is truly beautiful — from its ancient traditions to modern pop culture. Explore both to enrich your language learning journey!' },
      ]
    }
  };

  let currentAgent = 'language';
  let conversationEl = null;

  function init() {
    conversationEl = document.getElementById('chat-messages');
    const input = document.getElementById('chat-input');
    const sendBtn = document.getElementById('chat-send');
    const agentBtns = document.querySelectorAll('[data-agent]');

    if (!conversationEl) return;

    agentBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        currentAgent = btn.dataset.agent;
        agentBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        clearChat();
        addAgentMessage(getGreeting());
      });
    });

    sendBtn?.addEventListener('click', send);
    input?.addEventListener('keypress', (e) => e.key === 'Enter' && send());

    addAgentMessage(getGreeting());
  }

  function getGreeting() {
    const agent = agents[currentAgent];
    if (!agent) return 'Hello!';
    return currentAgent === 'language'
      ? '안녕하세요! 저는 여러분의 한국어 선생님이에요. How can I help you learn Korean today?'
      : '안녕하세요! I\'m your K-Culture guide! Ask me about K-Pop, K-Drama, Korean food, and more!';
  }

  function send() {
    const input = document.getElementById('chat-input');
    if (!input || !input.value.trim()) return;

    const msg = input.value.trim();
    input.value = '';

    addUserMessage(msg);

    setTimeout(() => {
      const reply = getReply(msg);
      addAgentMessage(reply);
    }, 600 + Math.random() * 400);
  }

  function getReply(msg) {
    const lower = msg.toLowerCase();
    const agent = agents[currentAgent];
    if (!agent) return 'I\'m processing your question...';

    for (const resp of agent.responses) {
      if (resp.trigger.length === 0) continue;
      if (resp.trigger.some(t => lower.includes(t))) return resp.reply;
    }
    return agent.responses[agent.responses.length - 1].reply;
  }

  function addUserMessage(text) {
    if (!conversationEl) return;
    const div = document.createElement('div');
    div.className = 'chat-msg user';
    div.innerHTML = `<div class="chat-bubble">${escHtml(text)}</div>`;
    conversationEl.appendChild(div);
    scrollToBottom();
  }

  function addAgentMessage(text) {
    if (!conversationEl) return;
    const div = document.createElement('div');
    div.className = 'chat-msg agent';
    const agent = agents[currentAgent];
    div.innerHTML = `
      <div class="chat-avatar" style="width:32px;height:32px;border-radius:50%;background:var(--grad-primary);display:flex;align-items:center;justify-content:center;font-size:1rem;flex-shrink:0;">${agent?.avatar || '🤖'}</div>
      <div class="chat-bubble">${escHtml(text).replace(/\n/g, '<br>')}</div>`;
    conversationEl.appendChild(div);
    scrollToBottom();
  }

  function clearChat() {
    if (conversationEl) conversationEl.innerHTML = '';
  }

  function scrollToBottom() {
    if (conversationEl) conversationEl.scrollTop = conversationEl.scrollHeight;
  }

  function escHtml(str) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  return { init };
})();

/* ── Search Index ───────────────────────────────────── */
window.SEARCH_INDEX = [
  // HOME
  { title: 'Korean School 한국어 학교', url: 'index.html', category: 'home', icon: '🏠', tags: ['home', 'korean', 'learn', 'start', 'welcome', 'free', 'language', 'hangul'], desc: 'Free Korean language learning — lessons, culture, and travel.' },

  // ── LEARN ──────────────────────────────────────────
  { title: 'Hangul Alphabet (한글)', url: 'learn/hangul.html', category: 'learn', icon: '📚', tags: ['hangul', 'alphabet', 'consonants', 'vowels', 'beginner', '한글', 'writing', 'korean letters', 'king sejong', '세종대왕', 'hall of worthies', '집현전', 'hangul day', '한글날'], desc: 'Learn the Korean alphabet created by King Sejong — consonants, vowels, and syllable blocks.' },
  { title: 'Basic Consonants (자음)', url: 'learn/hangul.html#consonants', category: 'learn', icon: '📚', tags: ['consonants', 'hangul', 'ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ', 'alphabet', 'beginner', '자음', '14 consonants', 'jaeum'], desc: 'The 14 basic Korean consonants with pronunciation and stroke order.' },
  { title: 'Basic Vowels (모음)', url: 'learn/hangul.html#vowels', category: 'learn', icon: '📚', tags: ['vowels', 'hangul', 'ㅏ', 'ㅓ', 'ㅗ', 'ㅜ', 'ㅡ', 'ㅣ', 'ㅑ', 'ㅕ', 'ㅛ', 'ㅠ', 'alphabet', 'beginner', '모음', '10 vowels', 'moeum', 'vowel mnemonic', 'shape'], desc: 'The 10 basic Korean vowels and vowel shape mnemonics.' },
  { title: 'Compound Vowels (복합 모음)', url: 'learn/hangul.html#compound', category: 'learn', icon: '📚', tags: ['compound vowels', 'diphthong', 'ㅐ', 'ㅔ', 'ㅒ', 'ㅖ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅢ', 'hangul', 'intermediate', '복합모음', '11 vowels'], desc: '11 compound vowels formed by combining basic vowels.' },
  { title: 'Aspirated & Tense Consonants', url: 'learn/hangul.html#aspirated', category: 'learn', icon: '📚', tags: ['aspirated', 'tense', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅊ', 'ㄲ', 'ㄸ', 'ㅃ', 'ㅆ', 'ㅉ', '거센소리', '된소리', 'double consonants', 'pronunciation', 'puff of air'], desc: 'Aspirated (거센소리) and tense (된소리) consonant pairs with minimal pair practice.' },
  { title: 'Double Consonants (쌍자음)', url: 'learn/hangul.html#tense', category: 'learn', icon: '📚', tags: ['double consonants', 'ssang', '쌍자음', 'ㄲ', 'ㄸ', 'ㅃ', 'ㅆ', 'ㅉ', 'tense sounds', 'ssang jaeum'], desc: 'The 5 double (tense) consonants — ㄲㄸㅃㅆㅉ — and how to pronounce them.' },
  { title: 'Korean Letter Writing (획순)', url: 'learn/letter-writing.html', category: 'learn', icon: '✍️', tags: ['stroke order', 'writing', '획순', 'hangul', 'trace', 'handwriting', 'letters', 'penmanship', 'consonants', 'vowels', 'how to write hangul', 'stroke direction'], desc: 'Learn Korean handwriting — correct stroke order for every hangul consonant and vowel, with tracing practice.' },
  { title: 'Syllable Structure & Blocks', url: 'learn/syllable-blocks.html', category: 'learn', icon: '🔡', tags: ['syllable', 'blocks', 'reading', 'writing', 'hangul structure', '음절', 'initial', 'medial', 'final', 'batchim', '받침', 'combine'], desc: 'How to combine consonants and vowels into Korean syllable blocks.' },
  { title: 'Pronunciation Guide (발음)', url: 'learn/pronunciation.html', category: 'learn', icon: '🎤', tags: ['pronunciation', 'sounds', 'phonetics', 'listening', 'speaking', '발음', 'linking', 'nasalization', 'liaison'], desc: 'Korean pronunciation rules — aspirated, tense, linking, and nasalization.' },
  { title: 'Korean Typing (타자)', url: 'learn/typing.html', category: 'learn', icon: '⌨️', tags: ['keyboard', 'typing', 'dubeolsik', '두벌식', '타자', 'hangul keyboard', 'type korean', 'korean input', 'ime', 'keyboard layout', 'qwerty korean', 'touch typing'], desc: 'Learn to type Korean on the 두벌식 (Dubeolsik) keyboard — key layout, finger positions, and typing drills.' },
  { title: 'Korean Grammar (문법)', url: 'learn/grammar.html', category: 'learn', icon: '📝', tags: ['grammar', 'particles', 'conjugation', 'sentence', 'structure', '문법', 'sov', 'subject object verb', 'korean sentence order'], desc: 'Core Korean grammar — SOV sentence structure, particles, and verb conjugation.' },
  { title: 'Sentence Structure (어순)', url: 'learn/grammar.html#sentence-structure', category: 'learn', icon: '📝', tags: ['sentence structure', 'word order', 'sov', '어순', 'subject', 'object', 'verb', 'grammar'], desc: 'Korean SOV word order — how sentences are built differently from English.' },
  { title: 'Topic Particle (은/는)', url: 'learn/grammar.html#topic', category: 'learn', icon: '📝', tags: ['particle', 'topic marker', '은', '는', 'eun', 'neun', 'grammar', 'beginner', 'topic'], desc: 'The topic marker particle 은/는 — when and how to use it.' },
  { title: 'Subject Particle (이/가)', url: 'learn/grammar.html#subject', category: 'learn', icon: '📝', tags: ['particle', 'subject marker', '이', '가', 'i', 'ga', 'grammar', 'subject'], desc: 'The subject marker particle 이/가 and when to use it.' },
  { title: 'Object Particle (을/를)', url: 'learn/grammar.html#object', category: 'learn', icon: '📝', tags: ['particle', 'object marker', '을', '를', 'eul', 'reul', 'grammar', 'object'], desc: 'The object marker particle 을/를 — marking what the action is done to.' },
  { title: 'Verb Conjugation (동사 활용)', url: 'learn/grammar.html#conjugation', category: 'learn', icon: '📝', tags: ['verb conjugation', '동사', 'tense', 'present', 'past', 'future', '-아요', '-어요', 'polite form', 'conjugate'], desc: 'How to conjugate Korean verbs in present, past, and future tenses.' },
  { title: 'Question Forms (의문문)', url: 'learn/grammar.html#questions', category: 'learn', icon: '📝', tags: ['questions', '의문문', 'interrogative', '-요', 'what', 'where', 'when', 'who', 'how', '어디', '뭐', '언제'], desc: 'Forming questions in Korean — interrogative words and question endings.' },
  { title: 'Counters (수량사)', url: 'learn/grammar.html#counters', category: 'learn', icon: '📝', tags: ['counters', '수량사', 'counting', 'things', 'people', 'animals', '개', '명', '마리', 'classifiers'], desc: 'Korean counter words for counting things, people, and animals.' },
  { title: 'Self Introduction (자기소개)', url: 'learn/grammar.html#self-intro', category: 'learn', icon: '📝', tags: ['self introduction', '자기소개', 'introduce', 'name', 'age', 'nationality', 'beginner', '안녕하세요', '저는'], desc: 'How to introduce yourself in Korean — name, age, nationality, and hobbies.' },
  { title: 'Vocabulary (어휘)', url: 'learn/vocabulary.html', category: 'learn', icon: '📖', tags: ['vocabulary', 'words', 'korean words', 'vocab', '어휘', 'dictionary', 'word list'], desc: 'Korean vocabulary organized by theme — greetings, food, numbers, and more.' },
  { title: 'Greetings & Phrases (인사)', url: 'learn/vocabulary.html#greetings', category: 'learn', icon: '📖', tags: ['greetings', '안녕하세요', '안녕히 계세요', '감사합니다', '죄송합니다', 'hello', 'goodbye', 'thank you', 'sorry', 'phrases', 'beginner', '인사', '괜찮아요', '네', '아니요'], desc: 'Essential Korean greetings — annyeonghaseyo, gamsahamnida, and everyday phrases.' },
  { title: 'Numbers (숫자)', url: 'learn/vocabulary.html#numbers', category: 'learn', icon: '📖', tags: ['numbers', 'counting', '숫자', 'sino-korean', 'native korean', '일이삼', '하나둘셋', 'one two three', '1 2 3', 'sinokorean', 'pure korean', 'date money phone'], desc: 'Korean native and Sino-Korean number systems — when to use each.' },
  { title: 'Food & Drink Vocabulary (음식)', url: 'learn/vocabulary.html#food', category: 'learn', icon: '📖', tags: ['food', '음식', 'vocabulary', 'restaurant', 'eating', 'kimchi', '김치', '밥', '국', '찌개', 'menu', 'ordering', '먹다', '마시다', 'drink'], desc: 'Korean food and drink words — restaurant ordering, ingredients, and dishes.' },
  { title: 'Family Words (가족)', url: 'learn/vocabulary.html#family', category: 'learn', icon: '📖', tags: ['family', '가족', 'mother', 'father', '어머니', '아버지', '엄마', '아빠', 'siblings', '형', '오빠', '언니', '누나', 'relatives', '할머니', '할아버지', 'grandparents'], desc: 'Korean family vocabulary — parents, siblings, and extended family.' },
  { title: 'Colors (색깔)', url: 'learn/vocabulary.html#colors', category: 'learn', icon: '📖', tags: ['colors', '색깔', '색', 'red', 'blue', 'yellow', '빨간', '파란', '노란', 'black', 'white', '검은', '하얀', 'green', 'pink', 'purple', 'orange'], desc: 'Korean color vocabulary — all basic colors in Korean.' },
  { title: 'Days & Time (날짜와 시간)', url: 'learn/vocabulary.html#days', category: 'learn', icon: '📖', tags: ['days', 'time', 'week', 'month', '날짜', '시간', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일', 'monday tuesday wednesday', 'clock', '몇 시', '오전', '오후'], desc: 'Korean days of the week, months, and telling the time.' },
  { title: 'Places (장소)', url: 'learn/vocabulary.html#places', category: 'learn', icon: '📖', tags: ['places', '장소', 'school', 'hospital', 'station', 'market', '학교', '병원', '역', '시장', 'supermarket', 'park', 'bank', '은행', 'library', '도서관', 'restaurant', '식당'], desc: 'Korean place vocabulary — common locations and where-questions.' },
  { title: 'Emotions (감정)', url: 'learn/vocabulary.html#emotions', category: 'learn', icon: '📖', tags: ['emotions', 'feelings', '감정', 'happy', 'sad', 'angry', '행복', '슬프다', '화나다', 'excited', 'tired', '피곤', 'lonely', 'scared', 'surprised', '놀라다'], desc: 'Korean emotional vocabulary — expressing feelings and moods.' },
  { title: 'Body Parts (신체)', url: 'learn/vocabulary.html#body', category: 'learn', icon: '📖', tags: ['body parts', '신체', '몸', 'head', 'eye', 'nose', 'mouth', 'hand', 'foot', '머리', '눈', '코', '입', '손', '발', '귀', 'ear', 'heart', '심장'], desc: 'Korean body part vocabulary — head to toe in Korean.' },
  { title: 'Travel Vocabulary (여행)', url: 'learn/vocabulary.html#travel', category: 'learn', icon: '📖', tags: ['travel vocabulary', '여행', 'passport', 'ticket', 'hotel', 'airport', '여권', '티켓', '호텔', '공항', 'luggage', '짐', 'tourist', '관광객'], desc: 'Korean vocabulary for travel — airports, hotels, and tourist situations.' },
  { title: 'Shopping Vocabulary (쇼핑)', url: 'learn/vocabulary.html#shopping', category: 'learn', icon: '📖', tags: ['shopping', '쇼핑', 'price', 'discount', '얼마', '할인', 'receipt', 'card', '카드', 'cash', '현금', 'market', 'mall', 'store', '가게'], desc: 'Korean shopping vocabulary — prices, bargaining, and store words.' },
  { title: 'Weather (날씨)', url: 'learn/vocabulary.html#weather', category: 'learn', icon: '📖', tags: ['weather', '날씨', 'rain', 'snow', 'hot', 'cold', '비', '눈', '덥다', '춥다', 'sunny', 'cloudy', '맑다', '흐리다', 'spring summer autumn winter', '봄여름가을겨울'], desc: 'Korean weather vocabulary — seasons, temperatures, and conditions.' },
  { title: 'Pronouns (대명사)', url: 'learn/pronouns.html', category: 'learn', icon: '👤', tags: ['pronouns', 'I', 'you', '나', '저', '당신', '너', 'we', '우리', 'he', 'she', '그', '그녀', '이것', '저것', '대명사', 'this that'], desc: 'Korean pronouns — I, you, he, she, we, this, that — formal and informal forms.' },
  { title: 'Common Nouns (명사)', url: 'learn/nouns.html', category: 'learn', icon: '📌', tags: ['nouns', 'common words', '명사', 'vocabulary', 'people', 'objects', 'things', 'everyday', '책', '집', '차', 'book', 'house', 'car'], desc: 'Common Korean nouns — people, objects, places, and abstract concepts.' },
  { title: 'Speech Levels (존댓말/반말)', url: 'learn/speech-levels.html', category: 'learn', icon: '🎭', tags: ['speech levels', 'formal', 'informal', '존댓말', '반말', 'politeness', 'honorific', 'casual', 'polite', '합쇼체', '해요체', '해체', 'age hierarchy', 'formal language'], desc: 'Korean speech levels — formal 합쇼체, polite 해요체, and casual 반말.' },
  { title: 'Expressing Emotions (감정 표현)', url: 'learn/emotions.html', category: 'learn', icon: '❤️', tags: ['emotions', 'feelings', '감정', 'express', '너무 좋아요', '슬퍼요', '화났어요', 'happy', 'sad', 'angry', 'excited', 'love', '사랑해요'], desc: 'How to express emotions and feelings naturally in Korean.' },
  { title: 'Shopping Phrases (쇼핑 표현)', url: 'learn/shopping.html', category: 'learn', icon: '🛍️', tags: ['shopping', 'store', 'price', '얼마예요', '좀 싸게', 'discount', 'buying', 'market', '쇼핑', 'bargain', '신용카드', '영수증', 'receipt'], desc: 'Korean shopping phrases — asking prices, getting discounts, and store vocabulary.' },
  { title: 'Dialogues (대화 연습)', url: 'learn/dialogues.html', category: 'learn', icon: '💬', tags: ['dialogue', 'conversation', 'speaking', 'practice', 'real-world', '대화', 'listening', 'skit', 'restaurant', 'taxi', 'introduction'], desc: 'Real-world Korean dialogues — restaurant, transport, shopping, and social situations.' },
  { title: 'Flashcards (플래시카드)', url: 'learn/flashcard.html', category: 'learn', icon: '🃏', tags: ['flashcards', 'practice', 'quiz', 'study', 'memory', 'review', '암기', 'spaced repetition', 'drill', 'test yourself'], desc: 'Interactive Korean flashcard tool for vocabulary and hangul practice.' },
  { title: 'Business Korean (비즈니스)', url: 'learn/business-korean.html', category: 'learn', icon: '💼', tags: ['business', 'office', '비즈니스', 'formal', 'workplace', 'professional', 'email', 'meeting', '회의', '이메일', '직장', 'company', '회사', 'colleague', '동료'], desc: 'Professional Korean for the workplace — meetings, emails, and office culture.' },
  { title: 'Classical Korean (고전 한국어)', url: 'learn/classical-korean.html', category: 'learn', icon: '📜', tags: ['classical', 'hanja', '고전', 'traditional', 'literary', 'advanced', '한자', 'old korean', 'history', 'archaic', 'literary korean'], desc: 'Classical Korean — hanja roots, literary forms, and historical texts.' },
  { title: 'Writing Essays (에세이)', url: 'learn/writing-essays.html', category: 'learn', icon: '✍️', tags: ['writing', 'essays', 'advanced', 'composition', 'formal writing', '에세이', 'structure', 'connectors', '논리적', 'essay format'], desc: 'Advanced Korean essay writing — structure, connectives, and formal composition.' },

  // ── CULTURE — K-Pop (culture/index.html) ──────────
  { title: 'K-Pop · 한국 팝', url: 'culture/index.html', category: 'culture', icon: '🎵', tags: ['kpop', 'k-pop', '케이팝', 'music', 'idol', 'bts', 'blackpink', 'twice', 'exo', 'newjeans', 'ive', 'aespa', 'groups', 'bands', 'korean pop', 'hallyu', '한류'], desc: 'K-Pop history, idol groups, agencies, fan culture, vocabulary, and slang.' },
  { title: 'Norebang · 노래방 (Karaoke)', url: 'culture/index.html#kpop-history', category: 'culture', icon: '🎤', tags: ['norebang', '노래방', 'karaoke', 'singing', 'song room', 'nore bang', 'private room', 'tambourine', 'microphone', 'score', 'karaoke room', 'korean karaoke', '노래', '가사', '박자'], desc: 'Korean norebang (private karaoke room) culture — how it works and key vocabulary.' },
  { title: 'K-Pop History Timeline', url: 'culture/index.html#kpop-history', category: 'culture', icon: '📜', tags: ['kpop history', 'timeline', '서태지와 아이들', 'seo taiji', '1992', 'h.o.t.', 'hot', 'psy', 'gangnam style', '강남스타일', 'bts', 'dynamite', 'billboard', 'grammy', '2012', '2018', '2020', '2021', 'history', 'evolution'], desc: 'Full K-Pop history from 1988 norebang to 2024 — milestones, groups, and global breakthroughs.' },
  { title: 'PSY & Gangnam Style (강남스타일)', url: 'culture/index.html#kpop-history', category: 'culture', icon: '🕺', tags: ['psy', 'gangnam style', '강남스타일', 'horse dance', 'youtube', '1 billion views', '2012', 'viral', 'un', 'white house', 'dance', 'meme', 'park jae-sang'], desc: 'PSY\'s Gangnam Style — the K-Pop moment that made the world listen (2012).' },
  { title: 'BTS (방탄소년단)', url: 'culture/index.html#kpop-history', category: 'culture', icon: '💜', tags: ['bts', '방탄소년단', 'bangtan', 'army', 'rm', 'jin', 'suga', 'j-hope', 'jimin', 'v', 'jungkook', 'dynamite', 'butter', 'billboard hot 100', 'grammy', 'un speech', 'hybe', 'big hit', 'love yourself', 'weverse'], desc: 'BTS (방탄소년단) — from debut in 2013 to Billboard #1 and Grammy nominations.' },
  { title: 'BLACKPINK (블랙핑크)', url: 'culture/index.html#kpop-history', category: 'culture', icon: '🌹', tags: ['blackpink', '블랙핑크', 'jennie', 'jisoo', 'lisa', 'rose', 'yg', 'how you like that', 'youtube record', '2016', 'coachella', 'blink', 'girl group', 'how do you like that'], desc: 'BLACKPINK — YG\'s global girl group that broke YouTube records.' },
  { title: 'K-Pop Entertainment Agencies', url: 'culture/index.html#kpop-agencies', category: 'culture', icon: '🏢', tags: ['agencies', 'entertainment company', '기획사', 'sm', 'yg', 'jyp', 'hybe', 'big3', 'big4', '빅3', '빅4', 'starship', 'cube', 'trainee system', '연습생', 'training', 'idol factory', 'sm entertainment', 'yg entertainment', 'jyp entertainment'], desc: 'SM, YG, JYP, HYBE and other major K-Pop agencies — history, artists, and CEO profiles.' },
  { title: 'SM Entertainment', url: 'culture/index.html#kpop-agencies', category: 'culture', icon: '🔴', tags: ['sm entertainment', 'sm', '에스엠', 'lee soo-man', '이수만', 'hot', 'ses', 'tvxq', 'super junior', 'girls generation', 'snsd', 'shinee', 'exo', 'red velvet', 'nct', 'aespa', 'big3', 'sm sound', 'idol system'], desc: 'SM Entertainment — K-Pop\'s pioneer agency behind H.O.T., EXO, aespa, and the idol system.' },
  { title: 'YG Entertainment', url: 'culture/index.html#kpop-agencies', category: 'culture', icon: '🟡', tags: ['yg entertainment', 'yg', '와이지', 'yang hyun-suk', '양현석', 'bigbang', '빅뱅', '2ne1', 'psy', 'winner', 'ikon', 'blackpink', 'treasure', 'hip-hop', 'swag', 'big3', 'g-dragon'], desc: 'YG Entertainment — hip-hop, swag, and BIGBANG to BLACKPINK.' },
  { title: 'JYP Entertainment', url: 'culture/index.html#kpop-agencies', category: 'culture', icon: '🔵', tags: ['jyp entertainment', 'jyp', '제이와이피', 'park jin-young', '박진영', 'jy park', 'wonder girls', '원더걸스', '2pm', 'got7', 'twice', '트와이스', 'stray kids', '스트레이 키즈', 'itzy', 'nmixx', 'big3', 'pied piper'], desc: 'JYP Entertainment — from Wonder Girls to TWICE and Stray Kids.' },
  { title: 'HYBE (Big Hit Entertainment)', url: 'culture/index.html#kpop-agencies', category: 'culture', icon: '🌐', tags: ['hybe', 'big hit', '하이브', '빅히트', 'bang si-hyuk', '방시혁', 'hitman bang', 'bts', 'txt', 'enhypen', 'le sserafim', '르세라핌', 'newjeans', '뉴진스', 'bts universe', 'weverse', 'big4', 'stock market', 'kospi'], desc: 'HYBE (Big Hit) — from a small studio to K-Pop\'s largest company through BTS.' },
  { title: 'K-Pop Generations (1st–4th Gen)', url: 'culture/index.html#kpop-generations', category: 'culture', icon: '⭐', tags: ['generations', '1세대', '2세대', '3세대', '4세대', '1st generation', '2nd generation', '3rd generation', '4th generation', 'kpop eras', 'idol history', 'hot', 'tvxq', 'bts', 'newjeans', 'seo taiji', 'hallyu'], desc: 'K-Pop idol generations 1 through 4 — from H.O.T. in 1996 to NewJeans today.' },
  { title: 'NewJeans · IVE · aespa (4th Gen)', url: 'culture/index.html#kpop-generations', category: 'culture', icon: '✨', tags: ['newjeans', '뉴진스', 'ive', '아이브', 'aespa', '에스파', 'le sserafim', '르세라핌', 'stray kids', '스트레이 키즈', 'ateez', 'enhypen', 'txt', 'illit', '4세대', 'fourth gen', 'y2k', 'jersey club', 'tiktok'], desc: '4th generation K-Pop — NewJeans, IVE, aespa, and the new wave of idols.' },
  { title: 'K-Pop Music Genres (음악 장르)', url: 'culture/index.html#kpop-genres', category: 'culture', icon: '🎼', tags: ['genres', 'idol pop', 'hip-hop', 'r&b', 'trot', '트로트', 'ballad', '발라드', 'dance pop', 'indie', 'rock', 'kpop genre', 'music style', 'concept', 'performance', 'aespa genre', 'r&b korean'], desc: 'Korean music genres — idol pop, hip-hop, trot, ballad, indie, and more.' },
  { title: 'K-Pop Vocabulary & Fan Terms', url: 'culture/index.html#kpop-vocab', category: 'culture', icon: '📖', tags: ['kpop vocabulary', 'fan terms', 'idol slang', 'comeback', 'sasaeng', 'fandom', 'lightstick', 'photocard', 'fan sign', 'weverse', 'vlive', 'bias', 'ult', 'anti-fan', '아이돌', '팬클럽', 'trainee', '연습생', 'debut', '데뷔', 'member', 'group', 'agency', 'concept'], desc: 'Essential K-Pop vocabulary — comeback, sasaeng, bias, lightstick, photocard, fandom.' },
  { title: 'K-Pop Fan Chants (응원 구호)', url: 'culture/index.html#kpop-chants', category: 'culture', icon: '📣', tags: ['fan chants', '응원 구호', 'chant', 'concert', 'fandom', 'bts chant', 'blackpink chant', 'lightstick', 'sing along', 'fan culture', 'cheering', '응원'], desc: 'How to do K-Pop fan chants at concerts — BTS, BLACKPINK, and more.' },
  { title: 'K-Pop Fan Slang (팬덤 은어)', url: 'culture/index.html#kpop-slang', category: 'culture', icon: '🔥', tags: ['fan slang', '은어', 'army slang', 'kpop slang', 'blink', 'once', 'onces', 'exo-l', 'my', 'orbit', 'fandom names', 'fan club names', 'kpop internet slang', 'idol phrases'], desc: 'K-Pop fan slang — fandom names, internet terms, and idol community vocabulary.' },
  { title: 'K-Pop Idol Phrases (아이돌 표현)', url: 'culture/index.html#kpop-phrases', category: 'culture', icon: '💬', tags: ['idol phrases', '아이돌', '사랑해', 'saranghae', '보고싶어', 'bogoshipo', 'fighting', '화이팅', 'hwaiting', '감사합니다', 'fan interaction', 'stage expressions', 'korean phrases from kpop'], desc: 'Phrases Korean idols say to fans — saranghae, hwaiting, and more.' },
  { title: 'K-Pop Variety Shows (예능)', url: 'culture/index.html#kpop-variety', category: 'culture', icon: '📺', tags: ['variety shows', '예능', 'running man', 'knowing brothers', 'weekly idol', 'inkigayo', 'music bank', 'mnet', 'show champion', 'music show', 'korean tv', 'entertainment show'], desc: 'Korean variety shows — Running Man, Knowing Brothers, and music broadcast programs.' },

  // ── CULTURE — Other pages ──────────────────────────
  { title: 'K-Drama (드라마)', url: 'culture/kdrama.html', category: 'culture', icon: '🎬', tags: ['kdrama', 'drama', 'netflix', 'series', 'romance', 'thriller', '드라마', 'shows', 'squid game', '오징어 게임', 'crash landing', '사랑의 불시착', 'historical', 'saeguk', '사극', 'webtoon', 'genres', 'speech levels drama'], desc: 'K-Drama genres, must-watch titles, speech patterns, and vocabulary.' },
  { title: 'Korean Food Culture (한식)', url: 'culture/kfood.html', category: 'culture', icon: '🍜', tags: ['kfood', '한식', 'kimchi', '김치', 'bibimbap', '비빔밥', 'tteokbokki', '떡볶이', 'samgyeopsal', '삼겹살', 'bulgogi', '불고기', 'japchae', '잡채', 'doenjang', '된장', 'gochujang', '고추장', 'ramen', '라면', 'korean cuisine', 'food culture', 'dosirak', '도시락', 'hansik'], desc: 'Korean cuisine — kimchi, bibimbap, samgyeopsal, street food, and dining culture.' },
  { title: '라면 가이드 (Ramyeon Bible)', url: 'culture/ramyeon.html', category: 'culture', icon: '🍜', tags: ['ramyeon', '라면', 'instant noodle', '신라면', '불닭볶음면', '진라면', '너구리', '짜파게티', '비빔면', '왕뚜껑', '육개장', '열라면', '오징어짬뽕', '스파게티', '안성탕면', '핵불닭', '짜파구리', '괄도네넴띤', '마라탕면', '봉지라면', '컵라면', 'nongshim', '농심', 'samyang', '삼양', 'ottogi', '오뚜기', 'paldo', '팔도', 'buldak', 'shin ramyun', 'fire noodle', 'nuclear buldak', 'chapagetti', 'parasite movie noodle', 'cup noodle', 'fire noodle challenge', 'spicy noodle challenge', 'mala noodle'], desc: 'The complete Korean ramyeon guide — 50+ instant noodles from Nongshim, Samyang, Ottogi, and Paldo.' },
  { title: '만두 가이드 (Korean Dumplings)', url: 'culture/mandu.html', category: 'culture', icon: '🥟', tags: ['mandu', '만두', 'dumpling', '군만두', '찐만두', '물만두', '김치만두', '고기만두', '갈비만두', '왕교자', '공갈만두', '개성만두', '사찰만두', '손만두', 'bibigo', '비비고', '해태', 'haetae', 'gyoza', 'jiaozi', 'pan fried', 'steamed', 'boiled', 'korean dumpling', 'filling', 'pork dumpling', 'kimchi dumpling', 'temple mandu', 'goryeo mandu'], desc: 'Complete guide to Korean mandu — cooking styles, fillings, brands, and traditional dumplings.' },
  { title: '치킨 가이드 (Korean Fried Chicken)', url: 'culture/kchicken.html', category: 'culture', icon: '🍗', tags: ['치킨', 'korean fried chicken', 'kfc', '교촌', '굽네', 'bhc', 'bbq chicken', '처갓집', '멕시칸', '멕시카나', '페리카나', '지코바', '네네치킨', '60계', '호식이두마리치킨', '노란통닭', '치맥', 'chimaek', '양념치킨', '간장치킨', '후라이드', 'yangnyeom', 'soy garlic chicken', 'fried chicken', 'double fried', '이중튀김', 'crispy', 'chains', 'delivery', '배달치킨'], desc: 'Korean fried chicken — 15+ major chains, iconic styles, and the chimaek (chicken+beer) culture.' },
  { title: 'K-BBQ 가이드 (한국 고기구이)', url: 'culture/kbbq.html', category: 'culture', icon: '🥩', tags: ['kbbq', 'korean bbq', '고기구이', '소고기', '돼지고기', '닭고기', '오리고기', '삼겹살', '목살', '항정살', '살치살', '안창살', '꽃등심', '갈비살', '차돌박이', '오겹살', '흑돼지', '막창', '곱창', '대창', '껍데기', '닭갈비', '오리로스', '오리주물럭', '숯불', '쌈', '한우', '한돈', 'beef', 'pork', 'duck', 'offal', 'jeju black pig', 'daegu specialty', 'charcoal grill', 'galbi', '갈비', 'samgyeopsal', 'brisket', 'prime cuts'], desc: 'K-BBQ deep dive — beef, pork, chicken, duck, and offal cuts with full descriptions.' },
  { title: '김치 가이드 (Korean Kimchi Guide)', url: 'culture/kimchi.html', category: 'culture', icon: '🥬', tags: ['kimchi', '김치', '배추김치', '깍두기', '총각김치', '백김치', '물김치', '동치미', '묵은지', '겉절이', '갓김치', '파김치', '오이소박이', '깻잎김치', '고들빼기', '나박김치', '순무김치', '부추김치', '콩나물김치', '열무김치', '김장', '발효', 'fermented', 'fermentation', 'napa cabbage', 'radish', 'daikon', 'cucumber', 'green onion', 'perilla leaf', 'aged kimchi', 'white kimchi', 'water kimchi', 'UNESCO', 'kimchi in cooking', 'kimchi jjigae', 'kimchi fried rice', 'kimchi pancake', '김치냉장고'], desc: 'Complete kimchi guide — 20+ varieties from배추김치 to 묵은지, fermentation, and kimchi in cooking.' },
  { title: 'K-Beauty (뷰티) & Skincare', url: 'culture/kbeauty.html', category: 'culture', icon: '✨', tags: ['kbeauty', 'k-beauty', '뷰티', 'skincare', '10 step', 'ten step', 'glass skin', 'cushion', 'bb cream', 'ampoule', 'essence', 'toner', 'sunscreen', '선크림', 'makeup', 'cosmetics', 'brands', 'innisfree', 'laneige', 'amorepacific', 'dermatology', '피부과'], desc: 'K-Beauty 10-step skincare routine, iconic brands, ingredients, and beauty vocabulary.' },
  { title: 'K-Fashion (패션) & Hanbok', url: 'culture/kfashion.html', category: 'culture', icon: '👗', tags: ['kfashion', 'fashion', 'style', 'hanbok', '한복', 'streetwear', 'idol fashion', '패션', 'seoul fashion week', '서울 패션위크', 'dongdaemun', '동대문', 'hongdae fashion', 'aesthetic', 'oppa style', 'unnie style', 'haul'], desc: 'Korean fashion — hanbok, K-Pop idol fashion, streetwear, and Seoul Fashion Week.' },
  { title: 'K-Gaming (게임) & Esports', url: 'culture/kgaming.html', category: 'culture', icon: '🎮', tags: ['gaming', '게임', 'esports', 'pc방', 'pcbang', 'league of legends', 'lol', 'starcraft', 'faker', 'streaming', 'twitch', 'afreeca tv', 'gamer slang', '게임방', 'pro gamer', 'korea gaming', 'pubg', 'nexon'], desc: 'Korean gaming culture — PC방, StarCraft, Faker, League of Legends, and esports.' },
  { title: 'K-Sports (스포츠) & Taekwondo', url: 'culture/ksports.html', category: 'culture', icon: '⚽', tags: ['sports', '스포츠', 'football', 'soccer', 'baseball', '야구', 'taekwondo', '태권도', 'son heung-min', '손흥민', 'park ji-sung', '박지성', 'kbo', 'k-league', 'ssireum', '씨름', 'archery', 'marathon', 'kimchi cup', 'olympics', '올림픽'], desc: 'Korean sports — football, baseball, taekwondo, Son Heung-min, and sports vocabulary.' },
  { title: 'Korean Things (한국 특유 문화)', url: 'culture/koreanthing.html', category: 'culture', icon: '🇰🇷', tags: ['korean things', 'ppalli ppalli', '빨리빨리', 'fast culture', 'bap', '밥', 'rice culture', '배달', 'delivery', 'fast delivery', 'coupang', '쿠팡', 'table bell', 'call button', '진동벨', 'public transport', 'unique korea'], desc: 'Uniquely Korean phenomena — fast delivery, rice obsession, table bells, and more.' },
  { title: 'Jjimjilbang · 찜질방 (Korean Sauna)', url: 'culture/koreanthing.html#jjimjilbang', category: 'culture', icon: '♨️', tags: ['jjimjilbang', '찜질방', 'sauna', 'spa', 'bathhouse', 'korean spa', 'jimjilbang', 'hot room', 'cold room', 'sikhye', '식혜', '계란', 'hard boiled egg', 'gown', 'overnight', 'sleeping', 'women section', 'men section', 'fomentation bath'], desc: 'Korean jjimjilbang — sauna culture, rooms, food, etiquette, and vocabulary.' },
  { title: 'Military Service (군대) Culture', url: 'culture/koreanthing.html#military', category: 'culture', icon: '🪖', tags: ['military', '군대', 'conscription', 'mandatory service', 'army', '육군', 'navy', '해군', 'marines', '해병대', 'airforce', '공군', 'katusa', 'social service', '대체복무', 'enlistment', 'discharge', 'ranks', '병장', '상병', '일병', '이병', 'bts military', 'korean military'], desc: 'Korean mandatory military service — branches, ranks, social dynamics, and vocabulary.' },
  { title: 'MBTI Obsession in Korea', url: 'culture/koreanthing.html#mbti', category: 'culture', icon: '🧠', tags: ['mbti', 'personality type', 'mbti korea', 'infp', 'infj', 'entp', 'intj', 'enfp', 'isfj', 'esfj', 'introvert', 'extrovert', 'intuition', 'sensing', 'feeling', 'thinking', '성격유형', '외향형', '내향형', 'dating mbti', 'korea mbti culture', 'mbti app', 'mbti 열풍'], desc: "Korea's MBTI obsession — personality types used for dating, friendship, and social identity." },
  { title: 'Jeonse System (전세) Housing', url: 'culture/koreanthing.html#jeonse', category: 'culture', icon: '🏠', tags: ['jeonse', '전세', 'housing', 'rent', 'deposit', 'apartment', 'real estate', 'lump sum', 'key money', 'monthly rent', '월세', '보증금', 'landlord', 'tenant', 'korea housing', 'housing system', 'jeonse fraud'], desc: "Korea's unique jeonse housing system — lump-sum deposit instead of monthly rent." },
  { title: 'Outdoor Drinking & Han River (야외음주)', url: 'culture/koreanthing.html#outdoor-drinking', category: 'culture', icon: '🍺', tags: ['outdoor drinking', '야외음주', 'han river', '한강', 'hangang', 'chimaek', '치맥', 'chicken', 'beer', 'soju', '소주', 'pojangmacha', '포장마차', 'convenience store', 'GS25', '7-eleven', 'han river park', 'outdoor picnic', 'night picnic', 'korean drinking culture'], desc: 'Korean outdoor drinking — Han River picnics, chimaek (chicken+beer), and pojangmacha.' },
  { title: 'Korean Traditions & Holidays', url: 'culture/koreanthing.html#traditions', category: 'culture', icon: '🏮', tags: ['traditions', 'chuseok', '추석', 'seollal', '설날', 'hanbok', '한복', 'lunar new year', 'harvest festival', 'ancestral rites', '제사', 'sebae', '세배', 'holidays', 'public holiday', 'traditional games', 'yutnori', '윷놀이', 'korean new year'], desc: 'Korean traditional holidays — Chuseok, Seollal, hanbok, and ancestral customs.' },
  { title: 'Korean Proverbs (속담)', url: 'culture/koreanthing.html#sodams', category: 'culture', icon: '📜', tags: ['proverbs', '속담', 'sayings', 'wisdom', 'idioms', 'korean expressions', 'traditional sayings', 'old saying', 'folk wisdom', '격언'], desc: '100 Korean proverbs and sayings — traditional wisdom in modern context.' },

  // ── TRAVEL (travel/index.html content) ────────────
  { title: 'Korea Travel Guide', url: 'travel/index.html', category: 'travel', icon: '🗺️', tags: ['travel', 'korea', 'visit', 'south korea', 'tourism', 'trip', 'guide', 'tourist', 'vacation', 'holiday', 'itinerary', '여행', '한국 여행', 'visa', 'culture shock', 'tips'], desc: 'Complete South Korea travel guide — cities, phrases, transport, food, and cultural tips.' },
  { title: 'Seoul (서울)', url: 'travel/index.html', category: 'travel', icon: '🏙️', tags: ['seoul', '서울', 'capital', 'hongdae', '홍대', 'myeongdong', '명동', 'gangnam', '강남', 'gyeongbokgung', '경복궁', 'han river', '한강', 'insadong', '인사동', 'bukchon', '북촌', 'n seoul tower', 'itaewon', 'dongdaemun', 'lotte tower', 'namdaemun market', 'sinchon', 'edae'], desc: 'Seoul travel — Gyeongbokgung palace, Hongdae, Myeongdong, Gangnam, and Han River.' },
  { title: 'Busan (부산)', url: 'travel/index.html', category: 'travel', icon: '🏖️', tags: ['busan', '부산', 'beach', 'haeundae', '해운대', 'gamcheon', '감천', 'gamcheon village', 'jagalchi', '자갈치', 'gwangalli', '광안리', 'gwangalli bridge', 'seafood', 'fish market', 'temple', 'haedong yonggung', '해동 용궁사', 'biff square', 'busanfinancecenter', 'busan film festival'], desc: 'Busan — Haeundae Beach, Gamcheon Village, Jagalchi seafood market, and Gwangalli.' },
  { title: 'Jeju Island (제주도)', url: 'travel/index.html', category: 'travel', icon: '🌋', tags: ['jeju', '제주도', '제주', 'island', 'hallasan', '한라산', 'seongsan', '성산일출봉', 'manjanggul', '만장굴', 'haenyeo', '해녀', 'divers', 'olle trail', '올레길', 'volcanic', 'lava tube', 'black pig', '흑돼지', 'jeju bbq', 'tangerine', '감귤', 'hallasan mountain hike', 'sunrise peak', 'jeju world heritage', 'horse riding'], desc: 'Jeju Island — Hallasan hike, Seongsan Sunrise Peak, haenyeo culture, and black pig BBQ.' },
  { title: 'Gyeongju (경주)', url: 'travel/index.html', category: 'travel', icon: '🏯', tags: ['gyeongju', '경주', 'silla', '신라', 'bulguksa', '불국사', 'cheomseongdae', '첨성대', 'royal tumuli', 'tumuli park', 'ancient capital', 'history', 'temple', 'open-air museum', 'gyeongju museum', 'anapji pond', '안압지', 'seokguram', '석굴암', 'dynasty', 'baekje', 'world heritage'], desc: 'Gyeongju — Bulguksa Temple, Cheomseongdae observatory, and Silla dynasty history.' },
  { title: 'Incheon (인천)', url: 'travel/index.html', category: 'travel', icon: '✈️', tags: ['incheon', '인천', 'airport', 'incheon international airport', '인천국제공항', 'songdo', '송도', 'smart city', 'chinatown', '차이나타운', 'wolmido', '월미도', 'gateway', 'transit', 'layover', 'best airport', 'korea airport'], desc: 'Incheon — Incheon Airport, Songdo smart city, Chinatown, and Wolmido Island.' },
  { title: 'Suwon (수원) & Hwaseong Fortress', url: 'travel/index.html', category: 'travel', icon: '🏰', tags: ['suwon', '수원', 'hwaseong', '화성', 'hwaseong fortress', 'galbi', '갈비', 'suwon galbi', 'ribs', 'korean folk village', '한국민속촌', 'unesco', 'fortress wall', 'joseon', 'king jeongjo', 'world heritage', 'city walls'], desc: 'Suwon — UNESCO Hwaseong Fortress and famous Suwon galbi BBQ ribs.' },
  { title: 'Korean Transportation — Getting Around', url: 'travel/index.html', category: 'travel', icon: '🚇', tags: ['transportation', 'transport', 'getting around', 'subway', '지하철', 't-money', '티머니', 'tmoney', 'card', 'transit card', 'bus', '버스', 'ktx', 'high speed rail', 'train', 'taxi', '택시', 'kakao', 'korail', 'express bus', '고속버스'], desc: 'How to get around Korea — subway, T-Money card, KTX, bus, and taxi.' },
  { title: 'Seoul Subway & T-Money Card', url: 'travel/index.html', category: 'travel', icon: '🚇', tags: ['subway', '지하철', 'seoul metro', 't-money', '티머니', 'tmoney', 'transit card', 'transportation card', 'contactless', 'busan subway', 'metro', '9 lines', 'line 1 2 3 4', 'fare', '요금', 'transfer', '환승', 'convenience store card'], desc: 'Seoul subway system and T-Money card — how to use and where to get one.' },
  { title: 'KTX High-Speed Train (고속열차)', url: 'travel/index.html', category: 'travel', icon: '🚄', tags: ['ktx', 'korea train express', '고속철도', 'high speed rail', 'korail', 'train', 'busan', 'seoul', '2 hours', '305km/h', 'ticket', 'book', 'korail.com', 'ktx booking', 'srt', 'gyeongbu line', 'honam line'], desc: 'KTX high-speed train — Seoul to Busan in 2h15m at 305 km/h; booking via Korail.' },
  { title: 'Korean Taxi & KakaoTaxi', url: 'travel/index.html', category: 'travel', icon: '🚕', tags: ['taxi', '택시', 'kakao taxi', '카카오택시', 'kakaotaxi', 'ride hailing', 'metered', 'black taxi', '모범택시', 'premium taxi', 'late night', 'safe', 'app', 'card payment', 'english taxi'], desc: 'Korean taxis and KakaoTaxi app — metered rides, card payment, and safe late-night transport.' },
  { title: 'Travel Phrases — Arrival (도착)', url: 'travel/index.html', category: 'travel', icon: '✈️', tags: ['arrival', 'airport', 'passport', '여권', 'visa', '비자', 'tourist visa', 'customs', 'immigration', 'arrival phrase', 'korean phrases arrival', '입국', '관광비자', '한국어를 배우고 있어요'], desc: 'Korean phrases for arriving in Korea — passport, visa, and immigration.' },
  { title: 'Travel Phrases — Getting Around (교통)', url: 'travel/index.html', category: 'travel', icon: '🗺️', tags: ['directions', 'getting around', '교통', '지하철역이 어디예요', '버스 정류장', 'subway station', 'bus stop', 'how much', '얼마예요', 'taxi phrases', '이 주소로', 'address', '내려주세요', 'drop here', 'transport phrases', 'korean directions'], desc: 'Korean phrases for transport — directions, subway, bus stop, taxi, and fares.' },
  { title: 'Travel Phrases — Food & Dining (식사)', url: 'travel/index.html', category: 'travel', icon: '🍜', tags: ['dining phrases', '식사', '맛있어요', '메뉴 주세요', 'menu', '채식주의자', 'vegetarian', '맵지 않게', 'not spicy', '계산서', 'bill', '포장해', 'takeout', 'to go', 'restaurant phrases', 'food ordering korean', 'delicious'], desc: 'Korean restaurant phrases — ordering, spice level, vegetarian, and asking for the bill.' },
  { title: 'Travel Phrases — Shopping (쇼핑)', url: 'travel/index.html', category: 'travel', icon: '🛍️', tags: ['shopping phrases', '쇼핑', '이거 얼마예요', 'how much is this', '좀 싸게', 'discount please', 'bargain', '영수증', 'receipt', '신용카드', 'credit card', 'do you accept', '되나요', 'shopping korea phrases', 'market haggling'], desc: 'Korean shopping phrases — prices, discounts, receipts, and card payment.' },
  { title: 'Travel Phrases — Emergency (비상)', url: 'travel/index.html', category: 'travel', icon: '🚨', tags: ['emergency', '비상', '도와주세요', 'help', '경찰', 'police', '병원이 어디예요', 'hospital', '약이 필요해요', 'medicine', '구급차', 'ambulance', '112', '119', 'emergency number', 'fire', 'korean emergency', 'help me phrase'], desc: 'Korean emergency phrases — help, police, hospital, and medicine.' },
  { title: 'Travel Phrases — Hotel (호텔)', url: 'travel/index.html', category: 'travel', icon: '🏨', tags: ['hotel', '호텔', 'check in', '체크인', 'room', '방이 있나요', 'wifi password', '와이파이 비밀번호', 'checkout', 'reservation', '예약', 'key', 'hostel', 'guesthouse', 'airbnb', 'accommodation', 'hotel phrases korea'], desc: 'Korean hotel phrases — check-in, room availability, and WiFi password.' },
  { title: 'Korean Regional Food Tour', url: 'travel/index.html', category: 'travel', icon: '🍽️', tags: ['food tour', 'regional food', '지역 음식', '설렁탕', 'seolleongtang', '삼겹살', 'samgyeopsal', '치맥', 'chimaek', '돼지국밥', 'dwaeji gukbap', '밀면', 'milmyeon', '씨앗호떡', 'hotteok', '흑돼지', 'black pig', '성게국수', 'sea urchin', '갈치조림', '황남빵', 'gyeongju bread', '쌈밥', 'ssambap', '경주법주', 'rice wine'], desc: 'Regional Korean food — Seoul ox bone soup, Busan pork soup, Jeju black pig BBQ.' },
  { title: 'Seoul Food (서울 음식)', url: 'travel/index.html', category: 'travel', icon: '🏙️', tags: ['seoul food', '설렁탕', 'seolleongtang', 'ox bone soup', '삼겹살', 'samgyeopsal', 'grilled pork belly', '치맥', 'chimaek', 'fried chicken', 'beer', '맥주', '치킨', 'seoul specialties', 'seoul restaurant', 'street food seoul', '서울 음식'], desc: 'Seoul food specialties — 설렁탕 ox bone soup, 삼겹살 pork belly, and 치맥.' },
  { title: 'Busan Food (부산 음식)', url: 'travel/index.html', category: 'travel', icon: '🏖️', tags: ['busan food', '돼지국밥', 'dwaeji gukbap', 'pork rice soup', '밀면', 'milmyeon', 'cold wheat noodles', '씨앗호떡', 'seed hotteok', 'sweet pancake', 'street food busan', '부산 음식', 'busan specialties', 'jagalchi market food', 'seafood busan'], desc: 'Busan food specialties — 돼지국밥 pork soup, 밀면 cold noodles, and 씨앗호떡.' },
  { title: 'Jeju Food (제주 음식)', url: 'travel/index.html', category: 'travel', icon: '🌋', tags: ['jeju food', '흑돼지', 'heukdwaeji', 'black pig bbq', '성게국수', 'urchin noodle', '갈치조림', 'hairtail fish', 'jeju specialties', '제주 음식', 'abalone', '전복', 'tangerine', '한라봉', 'jeju mandarin', 'jeju restaurant'], desc: 'Jeju food — black pig (흑돼지) BBQ, sea urchin noodles, and braised hairtail fish.' },
  { title: 'Korean Cultural Etiquette (예절)', url: 'travel/index.html', category: 'travel', icon: '🙇', tags: ['etiquette', 'manners', '예절', 'bowing', '인사', 'bow', 'age', '나이', 'shoes', '신발', 'remove shoes', 'two hands', '두 손', 'eating', 'spoon', 'drinking', 'pour', 'quiet', 'subway', 'tipping', '팁', 'tip', 'no tipping', 'gift giving', 'respect', 'confucian', '유교', 'culture tips'], desc: 'Korean cultural etiquette — bowing, shoes, tipping, table manners, and more.' },
  { title: 'No Tipping in Korea', url: 'travel/index.html', category: 'travel', icon: '💳', tags: ['tipping', 'tip', '팁', 'no tip', 'service included', 'korea etiquette', 'restaurant korea', 'gratuity', 'money manners'], desc: 'Tipping is not customary or expected in South Korea — service is included.' },
  { title: 'Essential Travel Apps for Korea', url: 'travel/index.html', category: 'travel', icon: '📱', tags: ['apps', 'travel apps', 'kakaomap', '카카오맵', 'papago', '파파고', 'naver', 'naver map', 'kakaotaxi', 'coupang eats', '쿠팡이츠', 'delivery', 'translation app', 'map app', 'food delivery', 'korea apps', 'must have apps', 'translate menu', 'camera translation'], desc: 'Must-have apps for Korea — KakaoMap, Papago translator, KakaoTaxi, and Naver Map.' },
  { title: 'KakaoMap & Naver Map', url: 'travel/index.html', category: 'travel', icon: '🗺️', tags: ['kakaomap', '카카오맵', 'naver map', '네이버 지도', 'maps', 'navigation', 'transit', 'walking', 'directions', 'real-time bus', 'indoor map', 'english map', 'korea navigation'], desc: 'KakaoMap and Naver Map — Korea\'s best navigation apps with transit and indoor maps.' },
  { title: 'Papago Translation App', url: 'travel/index.html', category: 'travel', icon: '🌐', tags: ['papago', '파파고', 'translate', 'translation', 'naver translate', 'korean translation', 'camera translate', 'menu translation', 'better than google translate', 'ai translator', 'korean translator app'], desc: 'Papago — Naver\'s AI translation app, best for Korean (camera translation for menus).' },
  { title: 'Day-by-Day Itineraries', url: 'travel/itineraries.html', category: 'travel', icon: '📅', tags: ['itinerary', 'schedule', '1 day', '2 days', '3 days', '5 days', '1 week', '10 days', '2 weeks', '1 month', 'day trip', '당일치기', '일박이일', 'trip plan', 'route', 'korea itinerary', 'travel schedule', 'time blocking'], desc: 'Korea travel itineraries from 1-day dash to 1-month adventure — fully planned.' },
  { title: 'City Guides (By City)', url: 'travel/cities.html', category: 'travel', icon: '🏙️', tags: ['cities', 'city guide', 'seoul', 'busan', 'jeju', 'gyeongju', 'incheon', 'suwon', 'by city', '도시별', 'daegu', 'gwangju', 'jeonju', 'gangwon', 'destinations'], desc: 'City-by-city travel guides — Seoul, Busan, Jeju, Gyeongju, Incheon, Suwon, and beyond.' },
  { title: 'Themed Travel (By Theme)', url: 'travel/themes.html', category: 'travel', icon: '🎯', tags: ['food tour', 'temple stay', 'events', 'festivals', 'sightseeing', 'k-pop tour', 'hiking', 'coastal walk', 'river bike', 'cross-country', 'road trip', 'theme', 'themed travel', '테마별 여행'], desc: 'Themed Korea travel — food tours, hiking, festivals, coastal walks, and K-Pop tours.' },
  { title: 'Trip Planner (여행 계획표)', url: 'travel/planner.html', category: 'travel', icon: '📋', tags: ['planner', 'plan', 'trip planner', '여행 계획', 'itinerary builder', 'custom', 'time blocking', 'schedule', 'print', 'export', 'flight', 'hotel', 'meals'], desc: 'Interactive Korea trip planner — build, time-block, and print your custom itinerary.' },

];

/* ── Quiz Data ──────────────────────────────────────── */
window.QUIZ_DATA = {
  1: [
    { q: 'What sound does ㅏ make?', choices: ['a', 'eo', 'o', 'ya'], answer: 0, korean: true },
    { q: 'What sound does ㅓ make?', choices: ['eo', 'a', 'o', 'eu'], answer: 0, korean: true },
    { q: 'What sound does ㅗ make?', choices: ['o', 'u', 'yo', 'eo'], answer: 0, korean: true },
    { q: 'What sound does ㅜ make?', choices: ['u', 'o', 'eu', 'yu'], answer: 0, korean: true },
    { q: 'What sound does ㅡ make?', choices: ['eu', 'o', 'u', 'i'], answer: 0, korean: true },
    { q: 'What sound does ㅣ make?', choices: ['i', 'e', 'ae', 'eu'], answer: 0, korean: true },
    { q: 'What sound does ㅑ make?', choices: ['ya', 'a', 'yeo', 'yo'], answer: 0, korean: true },
    { q: 'What sound does ㅕ make?', choices: ['yeo', 'eo', 'ya', 'yo'], answer: 0, korean: true },
    { q: 'What sound does ㅛ make?', choices: ['yo', 'o', 'ya', 'yeo'], answer: 0, korean: true },
    { q: 'What sound does ㅠ make?', choices: ['yu', 'u', 'yo', 'yi'], answer: 0, korean: true },
    { q: 'Which vowel makes the sound "a"?', choices: ['ㅏ', 'ㅓ', 'ㅗ', 'ㅣ'], answer: 0, korean: true },
    { q: 'Which vowel makes the sound "eo"?', choices: ['ㅓ', 'ㅏ', 'ㅗ', 'ㅡ'], answer: 0, korean: true },
    { q: 'What sound does ㅐ make?', choices: ['ae', 'ya', 'e', 'oe'], answer: 0, korean: true },
    { q: 'What sound does ㅔ make?', choices: ['e', 'ae', 'eu', 'yo'], answer: 0, korean: true },
    { q: 'What sound does ㅘ make?', choices: ['wa', 'wae', 'wo', 'oe'], answer: 0, korean: true },
    { q: 'What sound does ㅝ make?', choices: ['weo / wo', 'wa', 'we', 'wi'], answer: 0, korean: true },
    { q: 'What sound does ㅟ make?', choices: ['wi', 'we', 'ui', 'wu'], answer: 0, korean: true },
    { q: 'What sound does ㅢ make?', choices: ['ui', 'wi', 'eu', 'i'], answer: 0, korean: true },
    { q: 'Which vowel is formed by combining ㅗ + ㅏ?', choices: ['ㅘ', 'ㅙ', 'ㅚ', 'ㅝ'], answer: 0, korean: true },
    { q: 'Which vowel is formed by combining ㅜ + ㅣ?', choices: ['ㅟ', 'ㅞ', 'ㅝ', 'ㅢ'], answer: 0, korean: true },
  ],
  2: [
    { q: 'What sound does ㄱ make?', choices: ['g / k', 'n', 'd / t', 'r / l'], answer: 0, korean: true },
    { q: 'What sound does ㄴ make?', choices: ['n', 'm', 'ng', 'b / p'], answer: 0, korean: true },
    { q: 'What sound does ㄷ make?', choices: ['d / t', 'g / k', 'b / p', 'j'], answer: 0, korean: true },
    { q: 'What sound does ㄹ make?', choices: ['r / l', 'n', 'm', 'h'], answer: 0, korean: true },
    { q: 'What sound does ㅁ make?', choices: ['m', 'n', 'b', 'p'], answer: 0, korean: true },
    { q: 'What sound does ㅂ make?', choices: ['b / p', 'm', 'p', 'd / t'], answer: 0, korean: true },
    { q: 'What sound does ㅅ make?', choices: ['s', 'sh', 'j', 'z'], answer: 0, korean: true },
    { q: 'What sound does ㅇ make at the START of a syllable?', choices: ['silent', 'ng', 'o', 'a'], answer: 0, korean: true },
    { q: 'What sound does ㅇ make at the END of a syllable?', choices: ['ng', 'silent', 'n', 'm'], answer: 0, korean: true },
    { q: 'What sound does ㅈ make?', choices: ['j', 'z', 'ch', 'g'], answer: 0, korean: true },
    { q: 'Which is the tensed (double) version of ㄱ?', choices: ['ㄲ', 'ㅋ', 'ㄳ', 'ㄴ'], answer: 0, korean: true },
    { q: 'Which is the tensed (double) version of ㄷ?', choices: ['ㄸ', 'ㅌ', 'ㄹ', 'ㅅ'], answer: 0, korean: true },
    { q: 'Which is the tensed (double) version of ㅂ?', choices: ['ㅃ', 'ㅍ', 'ㅁ', 'ㄴ'], answer: 0, korean: true },
    { q: 'Which is the aspirated version of ㄱ?', choices: ['ㅋ', 'ㄲ', 'ㅎ', 'ㄴ'], answer: 0, korean: true },
    { q: 'Which is the aspirated version of ㄷ?', choices: ['ㅌ', 'ㄸ', 'ㅊ', 'ㄹ'], answer: 0, korean: true },
    { q: 'Which is the aspirated version of ㅂ?', choices: ['ㅍ', 'ㅃ', 'ㅁ', 'ㄹ'], answer: 0, korean: true },
    { q: 'What sound does ㄲ make?', choices: ['kk (tense)', 'k (aspirated)', 'g (plain)', 'ng'], answer: 0, korean: true },
    { q: 'What sound does ㅋ make?', choices: ['k (aspirated)', 'kk (tense)', 'g (plain)', 'h'], answer: 0, korean: true },
    { q: 'What sound does ㅎ make?', choices: ['h', 'ng', 'silent', 'k'], answer: 0, korean: true },
    { q: 'The compound batchim ㄳ is made of which two consonants?', choices: ['ㄱ + ㅅ', 'ㄴ + ㅈ', 'ㄹ + ㄱ', 'ㅂ + ㅅ'], answer: 0, korean: true },
  ],
  3: [
    { q: '안녕하세요 is read as?', choices: ['Annyeonghaseyo', 'Gamsahamnida', 'Mianhaeyo', 'Joheun achim'], answer: 0, korean: true },
    { q: 'Which word means "love"?', choices: ['사랑', '친구', '학교', '가방'], answer: 0, korean: true },
    { q: '감사합니다 is read as?', choices: ['Gamsahamnida', 'Annyeonghaseyo', 'Bogosipeo', 'Saranghae'], answer: 0, korean: true },
    { q: 'Which word means "school"?', choices: ['학교', '집', '사랑', '물'], answer: 0, korean: true },
    { q: 'What does 물 mean?', choices: ['Water', 'Milk', 'Rice', 'Food'], answer: 0, korean: true },
    { q: 'What does 밥 mean?', choices: ['Rice / Meal', 'Fish', 'Bread', 'Noodles'], answer: 0, korean: true },
    { q: 'Which word means "person / people"?', choices: ['사람', '나라', '아이', '남자'], answer: 0, korean: true },
    { q: '한국 is the Korean word for?', choices: ['Korea', 'Japan', 'China', 'America'], answer: 0, korean: true },
    { q: 'What does 집 mean?', choices: ['House / Home', 'Street', 'Town', 'Building'], answer: 0, korean: true },
    { q: 'Which word means "friend"?', choices: ['친구', '가족', '선생님', '학생'], answer: 0, korean: true },
    { q: 'What does 하늘 mean?', choices: ['Sky', 'Sun', 'Star', 'Moon'], answer: 0, korean: true },
    { q: 'Which word means "sea / ocean"?', choices: ['바다', '산', '강', '숲'], answer: 0, korean: true },
    { q: '화이팅 / 파이팅 is an expression meaning?', choices: ['You can do it! / Go for it!', 'I love you!', "It's delicious!", 'Thank you!'], answer: 0, korean: true },
    { q: 'What does 맛있어요 mean?', choices: ["It's delicious", "I'm hungry", "I'm full", "It's spicy"], answer: 0, korean: true },
    { q: 'Which word means "heart / mind"?', choices: ['마음', '머리', '몸', '손'], answer: 0, korean: true },
    { q: 'In Hangul syllable blocks, 받침 refers to?', choices: ['The final consonant', 'The initial consonant', 'The vowel', 'The syllable boundary'], answer: 0 },
    { q: 'What does 영어 mean?', choices: ['English language', 'Korean language', 'Japanese', 'Chinese'], answer: 0, korean: true },
    { q: 'Which word means "tree"?', choices: ['나무', '꽃', '풀', '잎'], answer: 0, korean: true },
    { q: '카메라 is a loanword meaning?', choices: ['Camera', 'Computer', 'Car', 'Calendar'], answer: 0, korean: true },
    { q: 'What does 가방 mean?', choices: ['Bag', 'Street', 'Store', 'Table'], answer: 0, korean: true },
  ],
  4: [
    { q: 'How do you say "Hello" formally?', choices: ['안녕하세요', '안녕', '반갑습니다', '잘 지냈어요?'], answer: 0, korean: true },
    { q: 'What does 감사합니다 mean?', choices: ['Thank you (formal)', "I'm sorry", "You're welcome", 'Hello'], answer: 0 },
    { q: 'How do you say "Nice to meet you"?', choices: ['반갑습니다', '잘 지냈어요?', '안녕히 가세요', '어서 오세요'], answer: 0, korean: true },
    { q: 'What does 죄송합니다 mean?', choices: ["I'm very sorry (formal)", 'Excuse me', 'Goodbye', 'Please'], answer: 0 },
    { q: 'What does 괜찮아요 mean?', choices: ["It's okay / I'm fine", "I'm hungry", 'Thank you', 'Sorry'], answer: 0 },
    { q: 'How do you say "Long time no see"?', choices: ['오랜만이에요', '또 봐요', '잘 가요', '반갑습니다'], answer: 0, korean: true },
    { q: '어서 오세요 is said when...?', choices: ['Welcoming someone to your store or home', 'Saying goodbye', 'Asking how someone is', 'Meeting for the first time'], answer: 0 },
    { q: 'What does 잘 먹겠습니다 mean?', choices: ['I will eat well (said before meals)', 'I ate well', 'Please give me food', 'This is delicious'], answer: 0 },
    { q: 'What does 잘 먹었습니다 mean?', choices: ['I ate well (said after meals)', 'I will eat', 'This is tasty', 'Thank you for the food'], answer: 0 },
    { q: 'How do you say "See you again"?', choices: ['또 봐요', '안녕히 가세요', '잘 자요', '어서 오세요'], answer: 0, korean: true },
    { q: '안녕히 가세요 is said to...?', choices: ['The person who is leaving', 'The person who is staying', 'Everyone around', 'A stranger on the street'], answer: 0 },
    { q: '안녕히 계세요 is said when...?', choices: ['You yourself are the one leaving', 'The other person is leaving', 'Greeting someone in the morning', 'Meeting someone new'], answer: 0 },
    { q: 'What does 수고하세요 mean?', choices: ['Good work / Take care', "You're welcome", "I'm sorry", 'Congratulations'], answer: 0 },
    { q: '천만에요 means?', choices: ["You're welcome", 'Thank you', 'I understand', 'Of course'], answer: 0 },
    { q: 'How do you say "How have you been?"?', choices: ['잘 지냈어요?', '뭐 해요?', '어디 가요?', '왜요?'], answer: 0, korean: true },
    { q: '처음 뵙겠습니다 is a formal phrase used when?', choices: ['Meeting someone for the very first time', 'Meeting a close friend', 'Saying goodbye formally', 'Answering the phone'], answer: 0 },
    { q: 'What does 잘 부탁드립니다 mean?', choices: ['Please take care of me / Best regards', 'Goodbye', 'See you again', 'Thank you very much'], answer: 0 },
    { q: '고마워요 is which speech level?', choices: ['Polite informal (해요체)', 'Formal (합쇼체)', 'Casual (반말)', 'Honorific (존칭)'], answer: 0 },
    { q: 'What does 미안해요 mean?', choices: ['Sorry (polite)', 'Thank you', "You're welcome", 'Excuse me'], answer: 0 },
    { q: '네 / 아니요 means?', choices: ['Yes / No', 'Hello / Goodbye', 'Please / Thank you', "I know / I don't know"], answer: 0 },
  ],
  5: [
    { q: 'What is the Sino-Korean word for "one"?', choices: ['일', '하나', '이', '한'], answer: 0, korean: true },
    { q: 'What is the native Korean word for "two"?', choices: ['둘', '이', '두', '일'], answer: 0, korean: true },
    { q: 'What is the Sino-Korean word for "ten"?', choices: ['십', '열', '백', '만'], answer: 0, korean: true },
    { q: 'What is the native Korean word for "three"?', choices: ['셋', '삼', '세', '서'], answer: 0, korean: true },
    { q: 'What is the Sino-Korean word for "hundred"?', choices: ['백', '천', '만', '십'], answer: 0, korean: true },
    { q: 'When counting hours on a clock, which number system is used?', choices: ['Native Korean (하나, 둘...)', 'Sino-Korean (일, 이...)', 'Either works', 'Neither — cardinal only'], answer: 0 },
    { q: 'When talking about money (price), which number system is used?', choices: ['Sino-Korean (일, 이...)', 'Native Korean (하나, 둘...)', 'Either works', 'No fixed rule'], answer: 0 },
    { q: 'How does a MALE speaker say "older brother"?', choices: ['형', '오빠', '남동생', '언니'], answer: 0, korean: true },
    { q: 'How does a FEMALE speaker say "older brother"?', choices: ['오빠', '형', '언니', '누나'], answer: 0, korean: true },
    { q: 'How does a FEMALE speaker say "older sister"?', choices: ['언니', '누나', '오빠', '여동생'], answer: 0, korean: true },
    { q: 'How does a MALE speaker say "older sister"?', choices: ['누나', '언니', '여동생', '형'], answer: 0, korean: true },
    { q: 'What is the Korean word for "grandmother"?', choices: ['할머니', '할아버지', '어머니', '이모'], answer: 0, korean: true },
    { q: 'What does 남동생 mean?', choices: ['Younger brother', 'Older brother', 'Younger sister', 'Uncle'], answer: 0, korean: true },
    { q: 'What does 여동생 mean?', choices: ['Younger sister', 'Older sister', 'Niece', 'Female cousin'], answer: 0, korean: true },
    { q: 'What is the Sino-Korean number for "four"?', choices: ['사', '넷', '네', '서'], answer: 0, korean: true },
    { q: 'What is the native Korean word for "ten"?', choices: ['열', '십', '열하나', '십일'], answer: 0, korean: true },
    { q: 'What does 아버지 / 아빠 mean?', choices: ['Father / Dad', 'Mother / Mom', 'Grandfather', 'Uncle'], answer: 0, korean: true },
    { q: 'What does 이모 mean?', choices: ["Aunt (mother's sister)", "Aunt (father's sister)", 'Uncle', 'Grandmother'], answer: 0, korean: true },
    { q: 'What does 삼촌 mean?', choices: ["Uncle (father's brother)", "Uncle (mother's brother)", 'Cousin', 'Nephew'], answer: 0, korean: true },
    { q: 'What is the Sino-Korean word for "ten thousand"?', choices: ['만', '천', '백', '억'], answer: 0, korean: true },
  ],
  6: [
    { q: '나___ 학생이에요. (I am a student — topic marker)', choices: ['는', '가', '를', '의'], answer: 0, korean: true },
    { q: '비___ 와요. (The rain is coming — subject marker)', choices: ['가', '는', '를', '에'], answer: 0, korean: true },
    { q: '밥___ 먹어요. (I eat rice — object marker)', choices: ['을', '이', '는', '에'], answer: 0, korean: true },
    { q: '학교___ 가요. (I go to school — direction/destination)', choices: ['에', '에서', '을', '의'], answer: 0, korean: true },
    { q: '학교___ 공부해요. (I study at school — location of action)', choices: ['에서', '에', '를', '로'], answer: 0, korean: true },
    { q: '나___ 친구 (my friend — possessive)', choices: ['의', '에', '와', '도'], answer: 0, korean: true },
    { q: '사과___ 바나나 (apple AND banana — noun connector)', choices: ['와', '과', '랑', '하고'], answer: 0, korean: true },
    { q: '은/는 is the ___ marker', choices: ['Topic', 'Subject', 'Object', 'Location'], answer: 0 },
    { q: '이/가 is the ___ marker', choices: ['Subject', 'Topic', 'Object', 'Direction'], answer: 0 },
    { q: '을/를 is the ___ marker', choices: ['Object', 'Subject', 'Topic', 'Possessive'], answer: 0 },
    { q: 'Which particle marks a direction or destination?', choices: ['에', '에서', '의', '도'], answer: 0 },
    { q: 'Which particle marks WHERE an action takes place?', choices: ['에서', '에', '의', '까지'], answer: 0 },
    { q: '친구___ 만났어요. (I met WITH a friend)', choices: ['하고', '한테', '한테서', '에게서'], answer: 0, korean: true },
    { q: '엄마___ 물었어요. (I asked Mom — to a person)', choices: ['한테', '한테서', '에서', '에게서'], answer: 0, korean: true },
    { q: '친구___ 선물을 받았어요. (I received a gift FROM a friend)', choices: ['한테서', '한테', '에서', '에게'], answer: 0, korean: true },
    { q: 'When do you use 은 vs 는?', choices: ['은 after consonant, 는 after vowel', '는 after consonant, 은 after vowel', 'They are always interchangeable', 'Depends on formality'], answer: 0 },
    { q: 'When do you use 이 vs 가?', choices: ['이 after consonant, 가 after vowel', '가 after consonant, 이 after vowel', '이 is more formal', '가 is more formal'], answer: 0 },
    { q: 'When do you use 을 vs 를?', choices: ['을 after consonant, 를 after vowel', '를 after consonant, 을 after vowel', '을 is more formal', 'No difference — either works always'], answer: 0 },
    { q: '버스___ 가요. (I go BY bus — method/means)', choices: ['로', '에', '에서', '의'], answer: 0, korean: true },
    { q: 'The particle -도 can mean?', choices: ['Also / Even / Too', 'With / And', 'From', 'Until'], answer: 0 },
  ],
  7: [
    { q: 'Which word means "hospital"?', choices: ['병원', '학교', '공원', '시장'], answer: 0, korean: true },
    { q: 'What does 슬프다 mean?', choices: ['Sad', 'Happy', 'Angry', 'Scared'], answer: 0, korean: true },
    { q: 'Which word means "restaurant"?', choices: ['식당', '병원', '서점', '약국'], answer: 0, korean: true },
    { q: 'What does 빨간색 mean?', choices: ['Red', 'Blue', 'Yellow', 'Green'], answer: 0, korean: true },
    { q: 'Which word means "airport"?', choices: ['공항', '역', '버스 정류장', '항구'], answer: 0, korean: true },
    { q: 'What does 무섭다 mean?', choices: ['Scary / Frightened', 'Angry', 'Sad', 'Surprised'], answer: 0, korean: true },
    { q: 'Which word means "pharmacy"?', choices: ['약국', '병원', '식당', '학교'], answer: 0, korean: true },
    { q: 'What does 피곤하다 mean?', choices: ['Tired', 'Hungry', 'Full', 'Sick'], answer: 0, korean: true },
    { q: 'What does 파란색 mean?', choices: ['Blue', 'Green', 'Purple', 'Red'], answer: 0, korean: true },
    { q: 'Which body part is 눈?', choices: ['Eye(s)', 'Ear(s)', 'Nose', 'Mouth'], answer: 0, korean: true },
    { q: 'Which body part is 입?', choices: ['Mouth', 'Eye', 'Hand', 'Foot'], answer: 0, korean: true },
    { q: 'What does 배고프다 mean?', choices: ['Hungry', 'Full', 'Tired', 'Thirsty'], answer: 0, korean: true },
    { q: 'Which word means "train station"?', choices: ['역', '공항', '버스 정류장', '항구'], answer: 0, korean: true },
    { q: 'What does 기쁘다 mean?', choices: ['Joyful / Happy', 'Sad', 'Angry', 'Surprised'], answer: 0, korean: true },
    { q: 'Which word is "green" in Korean?', choices: ['초록색', '파란색', '노란색', '빨간색'], answer: 0, korean: true },
    { q: 'What does 배부르다 mean?', choices: ['Full (after eating)', 'Hungry', 'Thirsty', 'Tired'], answer: 0, korean: true },
    { q: '손 refers to which body part?', choices: ['Hand', 'Foot', 'Arm', 'Leg'], answer: 0, korean: true },
    { q: 'Which word means "bookstore"?', choices: ['서점', '도서관', '학교', '식당'], answer: 0, korean: true },
    { q: 'What does 화나다 mean?', choices: ['To be angry', 'To be happy', 'To be sad', 'To be scared'], answer: 0, korean: true },
    { q: 'Which word is "yellow" in Korean?', choices: ['노란색', '초록색', '파란색', '빨간색'], answer: 0, korean: true },
  ],
  8: [
    { q: 'Polite present form of 가다 (to go)?', choices: ['가요', '갑니다', '가', '갔어요'], answer: 0, korean: true },
    { q: 'Formal present form of 먹다 (to eat)?', choices: ['먹습니다', '먹어요', '먹어', '먹었어요'], answer: 0, korean: true },
    { q: 'Past tense (polite) of 가다?', choices: ['갔어요', '가요', '갈 거예요', '가고 있어요'], answer: 0, korean: true },
    { q: 'Past tense (polite) of 먹다?', choices: ['먹었어요', '먹어요', '먹을 거예요', '먹고 있어요'], answer: 0, korean: true },
    { q: 'Future tense of 가다?', choices: ['갈 거예요', '가요', '갔어요', '가고 있어요'], answer: 0, korean: true },
    { q: 'Present progressive of 먹다?', choices: ['먹고 있어요', '먹어요', '먹었어요', '먹을 거예요'], answer: 0, korean: true },
    { q: 'Polite present of 오다 (to come)?', choices: ['와요', '옵니다', '왔어요', '올 거예요'], answer: 0, korean: true },
    { q: 'Korean dictionary form verbs always end in?', choices: ['다', '요', '어', '니다'], answer: 0 },
    { q: '공부하다 (to study) in polite present is?', choices: ['공부해요', '공부합니다', '공부해', '공부했어요'], answer: 0, korean: true },
    { q: 'Polite present tense uses which ending?', choices: ['-아요 or -어요', '-었어요', '-ㄹ 거예요', '-고 있어요'], answer: 0 },
    { q: '마시다 (to drink) in polite present is?', choices: ['마셔요', '마십니다', '마셨어요', '마실 거예요'], answer: 0, korean: true },
    { q: '하다 verbs in polite present use?', choices: ['-해요 (not -하아요)', '-입니다', '-어요 normally', '-이에요'], answer: 0 },
    { q: 'The polite past tense ending is?', choices: ['-았어요 or -었어요', '-고 있어요', '-ㄹ 거예요', '-아요'], answer: 0 },
    { q: '자다 (to sleep) in polite present is?', choices: ['자요', '잡니다', '잤어요', '잘 거예요'], answer: 0, korean: true },
    { q: 'Which verb ending shows an ONGOING action?', choices: ['-고 있어요', '-았어요', '-ㄹ 거예요', '-아요'], answer: 0 },
    { q: '배우다 (to learn) in polite present is?', choices: ['배워요', '배웁니다', '배웠어요', '배울 거예요'], answer: 0, korean: true },
    { q: 'Casual (반말) form of 가요 is?', choices: ['가', '가요', '갑니다', '갔어요'], answer: 0, korean: true },
    { q: 'Which marker indicates the formal/written style?', choices: ['-ㅂ니다 / -습니다', '-아요 / -어요', '-아 / -어', '-고 있어요'], answer: 0 },
    { q: '좋아하다 (to like) in polite present is?', choices: ['좋아해요', '좋아합니다', '좋아했어요', '좋아해'], answer: 0, korean: true },
    { q: '오다 (to come) in past tense (polite) is?', choices: ['왔어요', '와요', '올 거예요', '오고 있어요'], answer: 0, korean: true },
  ],
  9: [
    { q: '"Seoul is bigger than Busan" in Korean is?', choices: ['서울이 부산보다 더 커요', '부산이 서울보다 더 커요', '서울과 부산은 같아요', '서울이 커요 부산은 작아요'], answer: 0, korean: true },
    { q: 'Polite imperative of 앉다 (to sit) is?', choices: ['앉으세요', '앉아요', '앉지 마세요', '앉고 있어요'], answer: 0, korean: true },
    { q: '걱정하지 마세요 means?', choices: ["Please don't worry", 'Please worry about it', 'Are you worried?', "I'm not worried"], answer: 0, korean: true },
    { q: '공부하는 것이 재미있어요 means?', choices: ['Studying is fun', 'Studying is boring', 'I enjoy studying', "Let's study together"], answer: 0, korean: true },
    { q: 'Which connector means "therefore / so"?', choices: ['그래서', '그리고', '그렇지만', '그런데'], answer: 0, korean: true },
    { q: 'Which connector means "but / however"?', choices: ['그렇지만', '그래서', '그리고', '그래도'], answer: 0, korean: true },
    { q: '아직 먹고 있어요 means?', choices: ['Still eating', 'Already eaten', 'Not eating anymore', 'About to eat'], answer: 0, korean: true },
    { q: '벌써 끝났어요 means?', choices: ['Already finished', 'Not finished yet', 'Just finishing now', 'About to finish'], answer: 0, korean: true },
    { q: 'The pattern -(으)로 can express?', choices: ['Direction, method, or material', 'Time, location, and reason', 'Subject or topic marking', 'Comparison'], answer: 0 },
    { q: '버스로 가요 means?', choices: ['I go by bus', 'I go to the bus', 'The bus goes there', 'I arrived by bus'], answer: 0, korean: true },
    { q: '한국어를 잘해요 means?', choices: ["I'm good at Korean", 'I study Korean', 'I learn Korean', 'I like Korean'], answer: 0, korean: true },
    { q: '수영을 못해요 means?', choices: ["I can't swim", "I don't want to swim", 'I swim poorly', "I won't swim"], answer: 0, korean: true },
    { q: 'The pattern -는 것 turns a verb into a?', choices: ['Noun (gerund)', 'Adjective', 'Adverb', 'Another verb form'], answer: 0 },
    { q: '더 주세요 means?', choices: ['Please give me more', 'Give it all', 'Please stop', "I don't want more"], answer: 0, korean: true },
    { q: '다 먹었어요 means?', choices: ['I ate it all', "I didn't eat", 'I ate a little', "I'm eating now"], answer: 0, korean: true },
    { q: '누군가 means?', choices: ['Someone', 'Something', 'Somewhere', 'Sometime'], answer: 0, korean: true },
    { q: '어딘가 means?', choices: ['Somewhere', 'Someone', 'Sometime', 'Something'], answer: 0, korean: true },
    { q: 'The pattern -보다 더 expresses?', choices: ['Comparison (more than)', 'Contrast (but)', 'Addition (also)', 'Ability (can)'], answer: 0 },
    { q: '좋다 is used for?', choices: ['Describing that something is nice/good (state)', 'Actively liking something or someone', 'Wanting something', 'Preferring one thing over another'], answer: 0, korean: true },
    { q: '좋아하다 is used for?', choices: ['Actively liking something or someone', 'Describing that something is nice (state)', 'Feeling good emotionally', 'Preferring something'], answer: 0, korean: true },
  ],
  10: [
    { q: 'What does the proverb 백지장도 맞들면 낫다 mean?', choices: ['Many hands make light work', "Two's company, three's a crowd", 'The pen is mightier than the sword', 'Out of sight, out of mind'], answer: 0, korean: true },
    { q: '아이쇼핑 (Konglish) means?', choices: ['Window shopping', 'Eye drops', "Children's fashion shopping", 'Online shopping'], answer: 0, korean: true },
    { q: 'The idiom 발이 넓다 (lit. "wide feet") means?', choices: ['To know many people / well-connected', 'To walk a lot', 'To be clumsy', 'To be very busy'], answer: 0, korean: true },
    { q: '핸드폰 (Konglish) refers to?', choices: ['Mobile phone / cell phone', 'Handheld game', 'Headphones', 'Landline phone'], answer: 0, korean: true },
    { q: 'The proverb 가는 말이 고와야 오는 말이 곱다 means?', choices: ['Treat others as you wish to be treated', 'First impressions matter', 'Actions speak louder than words', 'Silence is golden'], answer: 0, korean: true },
    { q: '오피스텔 (Konglish) refers to?', choices: ['Officetel — small residential studio unit', 'A hotel with office space', 'A large office complex', 'An apartment building'], answer: 0, korean: true },
    { q: 'The idiom 눈이 높다 (lit. "high eyes") means?', choices: ['To have high standards', 'To be arrogant', 'To see far ahead', 'To be very observant'], answer: 0, korean: true },
    { q: '파이팅 / 화이팅 is best described as?', choices: ['A cheer meaning "You can do it!"', 'A military command', 'An expression of anger', 'A formal greeting'], answer: 0, korean: true },
    { q: 'The academic term 민주주의 means?', choices: ['Democracy', 'Communism', 'Capitalism', 'Nationalism'], answer: 0, korean: true },
    { q: 'The idiom 손이 크다 (lit. "big hands") means?', choices: ['To be generous / give abundantly', 'To be skilled with your hands', 'To be clumsy', 'To work very hard'], answer: 0, korean: true },
    { q: '매너있다 (Konglish) means?', choices: ['To have good manners', 'To have great style', 'To be trendy', 'To be popular'], answer: 0, korean: true },
    { q: 'The academic term 경제 means?', choices: ['Economy', 'Society', 'Culture', 'Politics'], answer: 0, korean: true },
    { q: 'The idiom 배보다 배꼽이 더 크다 means?', choices: ['The side issue is bigger than the main one', 'Waste more than you earn', 'Being ungrateful', 'Not seeing the big picture'], answer: 0, korean: true },
    { q: '원샷 (Konglish) in drinking culture means?', choices: ['Bottoms up / drink all at once', 'One drink only', 'The first toast', 'Cheers'], answer: 0, korean: true },
    { q: 'The proverb 세 살 버릇 여든까지 간다 means?', choices: ['Old habits die hard (lit: 3-yr-old habit lasts til 80)', 'Never too old to learn', 'Practice makes perfect', 'Better late than never'], answer: 0, korean: true },
    { q: '글로벌 (Konglish) means?', choices: ['Global / worldwide', 'Graduate school', 'Glowing', 'Glossy'], answer: 0, korean: true },
    { q: 'The idiom 귀가 얇다 (lit. "thin ears") means?', choices: ["Easily swayed by others' opinions", 'To be a great listener', 'To be very sensitive', 'To be hard of hearing'], answer: 0, korean: true },
    { q: 'The academic word 사회 means?', choices: ['Society', 'Company', 'History', 'Science'], answer: 0, korean: true },
    { q: '아르바이트 (from German Arbeit) means in Korean?', choices: ['Part-time job', 'Volunteer work', 'Internship', 'Full-time employment'], answer: 0, korean: true },
    { q: 'The idiom 간이 크다 (lit. "big liver") means?', choices: ['To be bold / brave / gutsy', 'To be selfish', 'To be very healthy', 'To eat a lot'], answer: 0, korean: true },
  ],
};


/* ── Mobile Table: data-label + scroll wrap ──────────── */
function initMobileTables() {
  document.querySelectorAll('.vocab-table, .compare-table').forEach(table => {
    const headers = Array.from(table.querySelectorAll('thead th'))
      .map(th => th.textContent.trim());
    if (headers.length) {
      table.querySelectorAll('tbody tr').forEach(row => {
        row.querySelectorAll('td').forEach((td, i) => {
          td.setAttribute('data-label', headers[i] || '');
        });
      });
    }
    if (!table.parentElement.classList.contains('table-scroll-wrap')) {
      const wrap = document.createElement('div');
      wrap.className = 'table-scroll-wrap';
      table.parentNode.insertBefore(wrap, table);
      wrap.appendChild(table);
    }
  });
}

/* ── Search ─────────────────────────────────────────── */
function searchDocLang() {
  return (document.documentElement.lang || 'en').toLowerCase();
}

/* All SEARCH_INDEX urls are root-relative (no leading slash) and written in
   English. Resolve them against the site root AND against the locale of the
   page doing the searching — sending a Thai reader who searched 찜질방 to the
   English culture page is defect B in docs/i18n-locale-leak.md.

   One mirror rule covers every page on this site:
       index.html         → <loc>/index.html
       <section>/<rest>   → <section>/<loc>/<rest>
   Any ?query and #hash ride along untouched.

   Guard: only sections known to be mirrored are rewritten, and
   SEARCH_MIRROR_MISSING can opt a single page out of a single locale. Anything
   else falls back to the English url — English is worse than the reader's own
   language, but a 404 is worse than both. scripts/audit-i18n.cjs asserts that
   all 111 index urls resolve in all 8 locales, so this is insurance, not a
   workaround. Do NOT read localStorage here: `<html lang>` is the only source
   of truth for what language a page is. */
const SEARCH_LOCALES = ['zh-tw', 'ja', 'es', 'fr', 'de', 'vi', 'th', 'id'];
const SEARCH_MIRRORED_SECTIONS = ['learn', 'culture', 'travel'];
const SEARCH_MIRROR_MISSING = {};   // e.g. 'travel/planner.html': ['th']

function searchResolveUrl(url, lang) {
  const loc = (lang || searchDocLang()).toLowerCase();
  const clean = String(url).replace(/^\//, '');
  const cut = clean.search(/[?#]/);
  const filePath = cut === -1 ? clean : clean.slice(0, cut);
  const suffix   = cut === -1 ? ''    : clean.slice(cut);

  if (SEARCH_LOCALES.indexOf(loc) === -1) return '/' + clean;          // English page

  const parts = filePath.split('/');
  if (SEARCH_LOCALES.indexOf(parts[0]) !== -1 ||
      SEARCH_LOCALES.indexOf(parts[1]) !== -1) return '/' + clean;     // already localized

  const optedOut = SEARCH_MIRROR_MISSING[filePath];
  if (optedOut && optedOut.indexOf(loc) !== -1) return '/' + clean;

  let mirrored;
  if (parts.length === 1) mirrored = loc + '/' + parts[0];
  else if (SEARCH_MIRRORED_SECTIONS.indexOf(parts[0]) !== -1)
    mirrored = parts[0] + '/' + loc + '/' + parts.slice(1).join('/');
  else return '/' + clean;                                            // unmirrored section

  return '/' + mirrored + suffix;
}

/* Lazy word index — every word, letter, drill and lesson topic on the site,
   in all 9 languages. Generated by scripts/gen-search-words.cjs into
   learn/data/search-words.json.

   `c` marks what an entry is; a plain word has no `c`. Only 't' (a lesson
   topic) gets its own results-page category — the rest are words wearing a
   different icon, because an unknown category is silently dropped by the
   ORDER filter in SearchPage rather than rendered. */
const WORD_KIND = {
  t: { category: 'topics', icon: '📄' },   // reading_card
  l: { category: 'words',  icon: '✍️' },   // stroke_trace / key_intro
  d: { category: 'words',  icon: '⌨️' },   // typing_drill
  q: { category: 'words',  icon: '❓' }    // match_quiz
};
const WORD_KIND_DEFAULT = { category: 'words', icon: '🔤' };
const LOCALE_AID = { ja: 'k', zh_tw: 'z', vi: 'v', th: 'h' };

let _wordIndexReady = false;
let _wordIndexPromise = null;
function loadWordIndex() {
  if (_wordIndexPromise) return _wordIndexPromise;
  _wordIndexPromise = fetch('/learn/data/search-words.json')
    .then(r => r.ok ? r.json() : [])
    .then(entries => {
      const lang = searchDocLang();
      const mKey = lang.replace('-', '_');
      entries.forEach(e => {
        const tags = [e.t, e.w, e.r, e.k, e.z, e.v, e.h].filter(Boolean);
        Object.keys(e.m || {}).forEach(k => tags.push(e.m[k]));
        Object.keys(e.x || {}).forEach(k => tags.push(e.x[k]));

        /* locText = everything a reader of THIS page could reasonably type:
           the Korean, its romanization, their own pronunciation aid, and the
           meaning in their own language. altText = the other eight languages.
           searchRank() uses the split; matching still uses every language. */
        const aid = e[LOCALE_AID[mKey]];
        const locText = [e.t, e.w, e.r, aid, (e.m || {})[mKey], (e.x || {})[mKey]]
          .filter(Boolean).join(' ').toLowerCase();
        const altText = [e.m, e.x].reduce((acc, map) => acc.concat(
          Object.keys(map || {}).filter(k => k !== mKey).map(k => map[k])), []
        ).join(' ').toLowerCase();

        const kind = WORD_KIND[e.c] || WORD_KIND_DEFAULT;
        window.SEARCH_INDEX.push({
          title: e.t + (e.w ? ' · ' + e.w : '') + (e.r ? ' (' + e.r + ')' : ''),
          // Stored in English; searchResolveUrl() localizes at render time so
          // there is exactly one mirror rule for the whole index.
          url: e.u,
          category: kind.category,
          icon: kind.icon,
          tags: tags.map(s => String(s).toLowerCase()),
          desc: (e.m && (e.m[mKey] || e.m.en)) || '',
          locText, altText
        });
      });
      _wordIndexReady = true;
    })
    .catch(() => { _wordIndexReady = true; });
  return _wordIndexPromise;
}

function initSearch() {
  const searchInput = document.getElementById('search-input');
  if (!searchInput) return;

  const lang = searchDocLang();
  const searchBase = lang !== 'en' ? '/' + lang + '/search.html' : '/search.html';

  if (!document.getElementById('search-submit-btn')) {
    const btn = document.createElement('button');
    btn.id = 'search-submit-btn';
    btn.className = 'search-submit-btn';
    btn.textContent = 'Search';
    btn.setAttribute('aria-label', 'Go to search results');
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const q = searchInput.value.trim();
      if (q) location.href = searchBase + '?q=' + encodeURIComponent(q);
    });
    searchInput.parentElement.appendChild(btn);
  }

  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const q = searchInput.value.trim();
      if (q) location.href = searchBase + '?q=' + encodeURIComponent(q);
    }
  });

  searchInput.addEventListener('focus', () => loadWordIndex(), { once: true });

  searchInput.addEventListener('input', debounce((e) => {
    const q = e.target.value.toLowerCase().trim();
    if (!q) { hideDropdown(); return; }
    const rerender = () => showDropdown(searchIndex(q).slice(0, 6), searchInput, q, searchBase);
    rerender();
    if (!_wordIndexReady) loadWordIndex().then(() => {
      if (searchInput.value.toLowerCase().trim() === q) rerender();
    });
  }, 200));

  searchInput.addEventListener('click', (e) => e.stopPropagation());
  document.addEventListener('click', hideDropdown);
}

/* Matching is cross-language on purpose: a Thai learner who only knows a word
   in English must still find it, and the index carries all 9 languages for
   exactly that reason. What that costs is relevance — a query can match an
   entry solely because some locale the reader does not read happens to
   contain the string. So rank, don't filter:

     3 title    the query is in the headword itself
     2 locale   matched in THIS reader's language (or the Korean/romanization)
     1 neutral  static index entry — English titles/descs are all it has
     0 foreign  matched only via another language's meaning

   Dropping tier 0 instead of demoting it would re-break the multilingual
   reader this ordering exists to serve. */
const RANK_TITLE = 3, RANK_LOCALE = 2, RANK_NEUTRAL = 1, RANK_FOREIGN = 0;

function searchRank(item, words) {
  if (words.every(w => item.title.toLowerCase().includes(w))) return RANK_TITLE;
  if (item.locText && words.every(w => item.locText.includes(w))) return RANK_LOCALE;
  if (!item.altText) return RANK_NEUTRAL;
  return RANK_FOREIGN;
}

function searchIndex(q) {
  const words = q.toLowerCase().split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  const buckets = [[], [], [], []];
  window.SEARCH_INDEX.forEach(item => {
    // haystack is stable per item and the index is now 944 entries — build once
    if (!item._hay) {
      item._hay = (item.title + ' ' + item.tags.join(' ') + ' ' + (item.desc || '')).toLowerCase();
    }
    if (!words.every(w => item._hay.includes(w))) return;
    buckets[searchRank(item, words)].push(item);
  });
  return [...buckets[RANK_TITLE], ...buckets[RANK_LOCALE],
          ...buckets[RANK_NEUTRAL], ...buckets[RANK_FOREIGN]];
}

function showDropdown(results, input, q, searchBase) {
  let dd = document.getElementById('search-dropdown');
  if (!dd) {
    dd = document.createElement('div');
    dd.id = 'search-dropdown';
    dd.style.cssText = 'position:absolute;top:calc(100% + 8px);left:0;right:0;background:var(--bg-2);border:1px solid var(--border);border-radius:12px;z-index:500;overflow:hidden;box-shadow:var(--shadow-lg);min-width:320px;';
    input.parentElement.style.position = 'relative';
    input.parentElement.appendChild(dd);
  }
  const rows = results.map(r =>
    `<a href="${escHtml(searchResolveUrl(r.url))}" style="display:flex;align-items:center;gap:10px;padding:10px 16px;color:var(--text);text-decoration:none;font-size:0.875rem;border-bottom:1px solid var(--border);" onmouseover="this.style.background='var(--glass-md)'" onmouseout="this.style.background=''">
      <span style="font-size:1rem;flex-shrink:0">${r.icon}</span>
      <span style="flex:1;min-width:0">
        <span style="display:block;font-weight:600">${escHtml(r.title)}</span>
        <span style="display:block;font-size:0.72rem;color:var(--text-muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${escHtml(r.desc)}</span>
      </span>
      <span style="font-size:0.62rem;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;background:var(--glass);padding:2px 7px;border-radius:99px;color:var(--text-muted);flex-shrink:0">${r.category}</span>
    </a>`
  ).join('');

  const allCount = searchIndex(q).length;
  const footer = allCount > 0
    ? `<a href="${escHtml(searchBase)}?q=${encodeURIComponent(q)}" style="display:block;padding:10px 16px;font-size:0.8rem;font-weight:600;color:var(--primary);text-align:center;text-decoration:none;">See all ${allCount} result${allCount !== 1 ? 's' : ''} →</a>`
    : `<div style="padding:12px 16px;font-size:0.875rem;color:var(--text-muted);">No results for "${escHtml(q)}"</div>`;

  dd.innerHTML = rows + footer;
  dd.style.display = 'block';
}

function hideDropdown() {
  const dd = document.getElementById('search-dropdown');
  if (dd) dd.style.display = 'none';
}

function escHtml(str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(typeof str === 'string' ? str : ''));
  return div.innerHTML;
}

/* ── KSProgress — unified progress store (ks-progress-v2) ──
   Single source of truth for step completion, lesson completion,
   daily study streak, learned counters, and resume position.
   Replaces ks-progress / ks-lessons-done / ks-*-xp / ks-*-stagemap. */
const KSProgress = (() => {
  const KEY = 'ks-progress-v2';
  let state = null;

  function _dateStr(offsetDays) {
    const d = new Date();
    if (offsetDays) d.setDate(d.getDate() + offsetDays);
    return d.getFullYear() + '-' +
      String(d.getMonth() + 1).padStart(2, '0') + '-' +
      String(d.getDate()).padStart(2, '0');
  }

  function _blank() {
    return {
      v: 2,
      streak: { count: 0, best: 0, last: '' },
      today: { date: '', steps: 0 },
      counters: { steps: 0, words: 0, letters: 0, quizzes: 0 },
      last: null,
      lessons: {},
    };
  }

  function _lesson(s, id) {
    if (!s.lessons[id]) s.lessons[id] = { done: [] };
    if (!Array.isArray(s.lessons[id].done)) s.lessons[id].done = [];
    return s.lessons[id];
  }

  function _load() {
    if (state) return state;
    try {
      const raw = localStorage.getItem(KEY);
      const parsed = raw ? JSON.parse(raw) : null;
      state = parsed && parsed.v === 2 ? parsed : null;
    } catch (_) { state = null; }
    if (!state) state = _migrate();
    return state;
  }

  function _save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (_) {}
    document.dispatchEvent(new CustomEvent('ks-progress-change'));
  }

  /* One-time import from the old fragmented keys, then delete them. */
  function _migrate() {
    const s = _blank();
    const OLD_ID_MAP = { 'hangul-basics': 'hangul', 'korean-grammar': 'grammar', 'korean-dialogues': 'dialogues' };
    try {
      JSON.parse(localStorage.getItem('ks-lessons-done') || '[]')
        .forEach(id => { _lesson(s, id).completed = true; });
      const old = JSON.parse(localStorage.getItem('ks-progress') || '{}');
      Object.keys(old).forEach(k => { _lesson(s, OLD_ID_MAP[k] || k).completed = true; });
      const toDelete = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (!k) continue;
        const m = k.match(/^ks-(.+)-stagemap$/);
        if (m) {
          try { _lesson(s, m[1]).stages = JSON.parse(localStorage.getItem(k) || '{}'); } catch (_) {}
        }
        if (k === 'ks-progress' || k === 'ks-lessons-done' || /^ks-.+-(xp|stagemap)$/.test(k)) toDelete.push(k);
      }
      toDelete.forEach(k => localStorage.removeItem(k));
      localStorage.setItem(KEY, JSON.stringify(s));
    } catch (_) {}
    return s;
  }

  /* Returns true only the first time this step is completed. */
  function markStepDone(lessonId, stepIndex, stepType) {
    const s = _load();
    const l = _lesson(s, lessonId);
    if (l.done.includes(stepIndex)) return false;
    l.done.push(stepIndex);
    l.done.sort((a, b) => a - b);
    l.ts = Date.now();

    s.counters.steps++;
    if (stepType === 'listen_repeat') s.counters.words++;
    else if (stepType === 'card_reveal' || stepType === 'syllable_builder' ||
        stepType === 'stroke_demo' || stepType === 'stroke_trace' ||
        stepType === 'key_intro') s.counters.letters++;
    else if (stepType === 'match_quiz' || stepType === 'typing_drill') s.counters.quizzes++;

    const today = _dateStr();
    if (s.today.date !== today) s.today = { date: today, steps: 0 };
    s.today.steps++;
    if (s.streak.last !== today) {
      s.streak.count = s.streak.last === _dateStr(-1) ? s.streak.count + 1 : 1;
      s.streak.last = today;
      if (s.streak.count > s.streak.best) s.streak.best = s.streak.count;
    }
    _save();
    return true;
  }

  function markLessonComplete(lessonId) {
    const s = _load();
    const l = _lesson(s, lessonId);
    if (l.completed) return;
    l.completed = true;
    l.ts = Date.now();
    _save();
  }

  function setLastPosition(lessonId, stepIndex) {
    const s = _load();
    const url = new URL(location.href);
    url.searchParams.delete('step');
    s.last = { lesson: lessonId, step: stepIndex, href: url.pathname + url.search, ts: Date.now() };
    _save();
  }

  function getStageMap(lessonId) {
    return Object.assign({}, _lesson(_load(), lessonId).stages || {});
  }

  function saveStageMap(lessonId, map) {
    _lesson(_load(), lessonId).stages = map;
    _save();
  }

  function getLesson(lessonId) {
    const l = _load().lessons[lessonId];
    return { done: (l && l.done) ? l.done : [], completed: !!(l && l.completed) };
  }

  function getStreak()     { const s = _load(); return s.streak.last === _dateStr() || s.streak.last === _dateStr(-1) ? s.streak.count : 0; }
  function getBestStreak() { return _load().streak.best; }
  function getTodaySteps() { const s = _load(); return s.today.date === _dateStr() ? s.today.steps : 0; }
  function getCounters()   { return Object.assign({}, _load().counters); }
  function getLast()       { return _load().last; }

  function resetLessonPosition(lessonId) {
    const s = _load();
    if (s.lessons[lessonId]) delete s.lessons[lessonId].stages;
    _save();
  }

  function resetAll() {
    state = _blank();
    try { localStorage.removeItem(KEY); } catch (_) {}
    _save();
  }

  return {
    markStepDone, markLessonComplete, setLastPosition,
    getStageMap, saveStageMap, getLesson,
    getStreak, getBestStreak, getTodaySteps, getCounters, getLast,
    resetLessonPosition, resetAll,
  };
})();
window.KSProgress = KSProgress;

/* ── Lesson Progress Grid ───────────────────────────── */
const LessonProgressGrid = (() => {
  // Display metadata only — step counts come from learn/data/manifest.json.
  // Ids match lessonData.lesson in learn/data/*.json ('vocab' aggregates all vocab-* topics).
  const LESSONS = [
    { id: 'hangul',           url: 'hangul.html',          name: 'Hangul Alphabet',  level: 'starter',      k: '가' },
    { id: 'letter-writing',   url: 'letter-writing.html',  name: 'Letter Writing',   level: 'starter',      k: '쓰' },
    { id: 'syllable-blocks',  url: 'syllable-blocks.html', name: 'Syllable Blocks',  level: 'starter',      k: '한' },
    { id: 'pronunciation',    url: 'pronunciation.html',   name: 'Pronunciation',    level: 'starter',      k: '음' },
    { id: 'typing',           url: 'typing.html',          name: 'Korean Typing',    level: 'starter',      k: '타' },
    { id: 'vocab',            url: 'vocabulary.html',      name: 'Vocabulary',       level: 'beginner',     k: '어' },
    { id: 'pronouns',         url: 'pronouns.html',        name: 'Pronouns',         level: 'beginner',     k: '나' },
    { id: 'nouns',            url: 'nouns.html',           name: 'Common Nouns',     level: 'beginner',     k: '명' },
    { id: 'grammar',          url: 'grammar.html',         name: 'Grammar',          level: 'intermediate', k: '문' },
    { id: 'speech-levels',    url: 'speech-levels.html',   name: 'Speech Levels',    level: 'intermediate', k: '경' },
    { id: 'emotions',         url: 'emotions.html',        name: 'Emotions',         level: 'intermediate', k: '감' },
    { id: 'shopping',         url: 'shopping.html',        name: 'Shopping',         level: 'intermediate', k: '쇼' },
    { id: 'dialogues',        url: 'dialogues.html',       name: 'Dialogues',        level: 'intermediate', k: '대' },
    { id: 'writing-essays',   url: 'writing-essays.html',  name: 'Writing Essays',   level: 'advanced',     k: '작' },
    { id: 'business-korean',  url: 'business-korean.html', name: 'Business Korean',  level: 'advanced',     k: '사' },
    { id: 'classical-korean', url: 'classical-korean.html',name: 'Classical Korean', level: 'advanced',     k: '고' },
  ];

  let manifest = null; // { lessons: [{id, url, steps, countable, stages, group}] }

  function _t(s) { return window.LangManager ? LangManager.t(s) : s; }

  function getCurrentId() {
    const filename = window.location.pathname.split(/[/\\]/).pop();
    if (filename === 'vocabulary.html') return 'vocab';
    const match = LESSONS.find(l => l.url === filename);
    return match ? match.id : null;
  }

  /* Real completion % for a grid entry (0-100). */
  function lessonPct(l) {
    const p = KSProgress.getLesson(l.id);
    if (l.id === 'vocab') {
      if (!manifest) return 0;
      let done = 0, total = 0;
      manifest.lessons.forEach(m => {
        if (m.group !== 'vocab') return;
        total += m.countable;
        const lp = KSProgress.getLesson(m.id);
        done += lp.completed ? m.countable : Math.min(lp.done.length, m.countable);
      });
      return total ? Math.round((done / total) * 100) : 0;
    }
    if (p.completed) return 100;
    const m = manifest && manifest.lessons.find(x => x.id === l.id);
    if (!m || !m.countable) return 0;
    return Math.round((Math.min(p.done.length, m.countable) / m.countable) * 100);
  }

  function renderResumeCard() {
    const last = KSProgress.getLast();
    if (!last || last.lesson === getCurrentId()) return '';
    if (last.lesson.startsWith('vocab-') && getCurrentId() === 'vocab') return '';
    const m = manifest && manifest.lessons.find(x => x.id === last.lesson);
    const entry = LESSONS.find(l => l.id === last.lesson) ||
      (last.lesson.startsWith('vocab-') && LESSONS.find(l => l.id === 'vocab'));
    if (!entry) return '';
    const href = last.href + (last.href.includes('?') ? '&' : '?') + 'step=' + (last.step + 1);
    const stepInfo = m
      ? _t('Step {n} of {m}').replace('{n}', last.step + 1).replace('{m}', m.steps)
      : '';
    return `
      <a class="lpg-resume" href="${href}">
        <span class="lpg-resume-play">▶</span>
        <span class="lpg-resume-text">
          <span class="lpg-resume-label">${_t('Continue')}</span>
          <span class="lpg-resume-lesson">${_t(entry.name)}${stepInfo ? ' · ' + stepInfo : ''}</span>
        </span>
      </a>`;
  }

  function render() {
    const container = document.getElementById('lesson-progress-grid');
    if (!container) return;

    const currentId = getCurrentId();
    let completed = 0, pctSum = 0;

    const blocks = LESSONS.map((l, i) => {
      const pct = lessonPct(l);
      pctSum += pct;
      const done = pct >= 100;
      if (done) completed++;
      const active = l.id === currentId;
      const cls = `lpg-block${done ? ' lpg-done' : ''}${active ? ' lpg-active' : ''}${pct > 0 && !done ? ' lpg-started' : ''}`;
      const check = done ? '<span class="lpg-check">✓</span>' : '';
      const name = _t(l.name);
      const title = pct > 0 && !done ? `${name} · ${pct}%` : name;
      return `<a href="${l.url}" class="${cls}" style="--p:${pct}%" data-level="${l.level}" title="${title}" aria-label="${title}">${i + 1}${check}</a>`;
    }).join('');

    const totalPct = Math.round(pctSum / LESSONS.length);
    const streak = KSProgress.getStreak();
    const streakHtml = streak > 0
      ? `<span class="lpg-streak" title="${_t('{n}-day streak').replace('{n}', streak)}">🔥 ${streak}</span>`
      : '';

    container.innerHTML = `
      ${renderResumeCard()}
      <div class="lpg-header">
        <div style="display:flex;align-items:center;gap:5px">
          <span class="lpg-title">${_t('Progress')}</span>
          <button class="lpg-reset-btn" onclick="ProgressTracker.reset()" aria-label="${_t('Reset all progress')}" title="${_t('Reset all progress')}">↺</button>
        </div>
        <span class="lpg-count">${streakHtml}${completed} / ${LESSONS.length}</span>
      </div>
      <div class="lpg-bar"><div class="lpg-bar-fill" style="width:${totalPct}%"></div></div>
      <div class="lpg-grid">${blocks}</div>`;
  }

  function init() {
    render();
    fetch('/learn/data/manifest.json')
      .then(r => r.json())
      .then(data => { manifest = data; render(); })
      .catch(() => {});
    document.addEventListener('ks-progress-change', render);
  }

  function refresh() { render(); }

  return { init, refresh };
})();

/* ── Progress Tracker (static pages' Mark Complete buttons) ── */
const ProgressTracker = (() => {
  function markComplete(lessonId) {
    KSProgress.markLessonComplete(lessonId);
  }

  function init() {
    document.querySelectorAll('[data-lesson-complete]').forEach(btn => {
      if (KSProgress.getLesson(btn.dataset.lessonComplete).completed) {
        btn.textContent = '✓ Completed!';
        btn.disabled = true;
        btn.style.opacity = '0.7';
      }
      btn.addEventListener('click', () => {
        markComplete(btn.dataset.lessonComplete);
        btn.textContent = '✓ Completed!';
        btn.disabled = true;
        btn.style.opacity = '0.7';
      });
    });
  }

  function reset() {
    KSProgress.resetAll();
  }

  return { init, markComplete, reset };
})();

/* ── Stats Counter Animation ────────────────────────── */
function animateCounters() {
  document.querySelectorAll('[data-counter]').forEach(el => {
    const target = parseInt(el.dataset.counter);
    const suffix = el.dataset.suffix || '';
    let current = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = Math.floor(current).toLocaleString() + suffix;
      if (current >= target) clearInterval(timer);
    }, 16);
  });
}

/* ── Lesson Content Tabs ────────────────────────────── */
function initTabs() {
  document.querySelectorAll('.tab-group').forEach(group => {
    const tabs = group.querySelectorAll('.tab-btn');
    const panels = group.querySelectorAll('.tab-panel');

    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        panels[i]?.classList.add('active');
      });
    });
  });
}

/* ── Level Filter ───────────────────────────────────── */
function initLevelFilter() {
  const levelContainer = document.querySelector('.sidebar-level');
  if (!levelContainer) return;

  const resetBtn = document.createElement('button');
  resetBtn.className = 'level-reset-btn';
  resetBtn.textContent = '×';
  resetBtn.title = 'Clear filter';
  resetBtn.setAttribute('aria-label', 'Clear level filter');
  resetBtn.style.display = 'none';
  levelContainer.appendChild(resetBtn);

  function applyFilter(level) {
    document.querySelectorAll('.sidebar-nav [data-level]').forEach(item => {
      item.style.display = (level === 'all' || item.dataset.level === level) ? '' : 'none';
    });
    resetBtn.style.display = level === 'all' ? 'none' : '';
  }

  document.querySelectorAll('.level-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.level-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      applyFilter(this.dataset.level);
    });
  });

  resetBtn.addEventListener('click', () => {
    document.querySelectorAll('.level-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('.level-btn[data-level="all"]')?.classList.add('active');
    applyFilter('all');
  });
}

/* ── Utility ────────────────────────────────────────── */
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

/* ── Copy to Clipboard ──────────────────────────────── */
function initCopyButtons() {
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const target = this.dataset.copy;
      const text = document.getElementById(target)?.textContent || this.dataset.text;
      if (!text) return;

      navigator.clipboard.writeText(text).then(() => {
        const original = this.textContent;
        this.textContent = '✓ Copied!';
        this.style.color = '#22C55E';
        setTimeout(() => {
          this.textContent = original;
          this.style.color = '';
        }, 2000);
      });
    });
  });
}

/* ── Syllable Builder ───────────────────────────────── */
const SyllableBuilder = (() => {
  // 초성 (initial): 14 basic consonants + 5 쌍자음
  const initials = [
    {c:'ㄱ',i:0,r:'g'}, {c:'ㄴ',i:2,r:'n'},  {c:'ㄷ',i:3,r:'d'},
    {c:'ㄹ',i:5,r:'r'}, {c:'ㅁ',i:6,r:'m'},  {c:'ㅂ',i:7,r:'b'},
    {c:'ㅅ',i:9,r:'s'}, {c:'ㅇ',i:11,r:''},  {c:'ㅈ',i:12,r:'j'},
    {c:'ㅊ',i:14,r:'ch'},{c:'ㅋ',i:15,r:'k'},{c:'ㅌ',i:16,r:'t'},
    {c:'ㅍ',i:17,r:'p'},{c:'ㅎ',i:18,r:'h'},
    {c:'ㄲ',i:1,r:'kk'},{c:'ㄸ',i:4,r:'tt'},{c:'ㅃ',i:8,r:'pp'},
    {c:'ㅆ',i:10,r:'ss'},{c:'ㅉ',i:13,r:'jj'},
  ];
  // 중성 (medial): 10 basic vowels + 11 compound vowels
  const medials = [
    {c:'ㅏ',i:0,r:'a'},  {c:'ㅑ',i:2,r:'ya'}, {c:'ㅓ',i:4,r:'eo'},
    {c:'ㅕ',i:6,r:'yeo'},{c:'ㅗ',i:8,r:'o'},  {c:'ㅛ',i:12,r:'yo'},
    {c:'ㅜ',i:13,r:'u'}, {c:'ㅠ',i:17,r:'yu'},{c:'ㅡ',i:18,r:'eu'},
    {c:'ㅣ',i:20,r:'i'},
    {c:'ㅐ',i:1,r:'ae'}, {c:'ㅒ',i:3,r:'yae'},{c:'ㅔ',i:5,r:'e'},
    {c:'ㅖ',i:7,r:'ye'}, {c:'ㅘ',i:9,r:'wa'}, {c:'ㅙ',i:10,r:'wae'},
    {c:'ㅚ',i:11,r:'oe'},{c:'ㅝ',i:14,r:'wo'},{c:'ㅞ',i:15,r:'we'},
    {c:'ㅟ',i:16,r:'wi'},{c:'ㅢ',i:19,r:'ui'},
  ];
  // 종성 (final / 받침): none + 16 single + 11 compound (겹받침)
  const finals = [
    {c:'—',  i:0,  r:'', title:'없음 (none)'},
    {c:'ㄱ', i:1,  r:'k'}, {c:'ㄴ', i:4,  r:'n'},
    {c:'ㄷ', i:7,  r:'t'}, {c:'ㄹ', i:8,  r:'l'},
    {c:'ㅁ', i:16, r:'m'}, {c:'ㅂ', i:17, r:'p'},
    {c:'ㅅ', i:19, r:'t'}, {c:'ㅆ', i:20, r:'t'},
    {c:'ㅇ', i:21, r:'ng'},{c:'ㅈ', i:22, r:'t'},
    {c:'ㅊ', i:23, r:'t'}, {c:'ㅋ', i:24, r:'k'},
    {c:'ㅌ', i:25, r:'t'}, {c:'ㅍ', i:26, r:'p'},
    {c:'ㅎ', i:27, r:'t'}, {c:'ㄲ', i:2,  r:'k'},
    {sep:true, label:'── 겹받침 (compound) ──'},
    {c:'ㄳ', i:3,  r:'k'}, {c:'ㄵ', i:5,  r:'n'},
    {c:'ㄶ', i:6,  r:'n'}, {c:'ㄺ', i:9,  r:'k'},
    {c:'ㄻ', i:10, r:'m'}, {c:'ㄼ', i:11, r:'l'},
    {c:'ㄽ', i:12, r:'l'}, {c:'ㄾ', i:13, r:'l'},
    {c:'ㄿ', i:14, r:'p'}, {c:'ㅀ', i:15, r:'l'},
    {c:'ㅄ', i:18, r:'p'},
  ];

  let selC = initials[0];
  let selV = medials[0];
  let selF = finals[0];

  function buildSyllable() {
    return String.fromCharCode(0xAC00 + (selC.i * 21 + selV.i) * 28 + selF.i);
  }
  function buildRom() {
    return (selC.r || '') + selV.r + (selF.r || '') || selV.r;
  }
  function buildBreakdown() {
    const cPart = selC.r ? `${selC.c} (${selC.r})` : `${selC.c} (silent)`;
    const vPart = `${selV.c} (${selV.r})`;
    return selF.i ? `${cPart} + ${vPart} + ${selF.c} (${selF.r})` : `${cPart} + ${vPart}`;
  }

  function refresh() {
    const d = document.getElementById('syllable-display');
    const r = document.getElementById('syllable-rom');
    const b = document.getElementById('syllable-breakdown');
    if (d) d.textContent = buildSyllable();
    if (r) r.textContent = buildRom();
    if (b) b.textContent = buildBreakdown();
  }

  function addSep(label, container) {
    const s = document.createElement('div');
    s.style.cssText = 'width:100%;font-size:0.62rem;color:var(--text-muted);padding:4px 0 2px;letter-spacing:0.05em;';
    s.textContent = label;
    container.appendChild(s);
  }

  function makeBtn(data, cls, container, onSelect) {
    const btn = document.createElement('button');
    btn.className = `syllable-btn ${cls}`;
    btn.textContent = data.c;
    btn.title = data.title || (data.r ? `${data.c} (${data.r})` : `${data.c} (silent)`);
    btn.addEventListener('click', () => {
      container.querySelectorAll(`.${cls}`).forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      onSelect(data);
      refresh();
    });
    return btn;
  }

  function init() {
    const builder = document.getElementById('syllable-builder');
    if (!builder) return;

    const consRow = builder.querySelector('.syllable-consonants');
    const vowRow  = builder.querySelector('.syllable-vowels');
    const batRow  = builder.querySelector('.syllable-batchim');

    if (!consRow || !vowRow) return;

    consRow.innerHTML = '';
    vowRow.innerHTML  = '';
    if (batRow) batRow.innerHTML = '';

    initials.forEach((data, idx) => {
      if (idx === 14) addSep('── 쌍자음 (double) ──', consRow);
      const btn = makeBtn(data, 'consonant-btn', consRow, d => { selC = d; });
      if (idx === 0) btn.classList.add('active');
      consRow.appendChild(btn);
    });

    medials.forEach((data, idx) => {
      if (idx === 10) addSep('── 복합모음 (compound) ──', vowRow);
      const btn = makeBtn(data, 'vowel-btn', vowRow, d => { selV = d; });
      if (idx === 0) btn.classList.add('active');
      vowRow.appendChild(btn);
    });

    if (batRow) {
      finals.forEach((data, idx) => {
        if (data.sep) { addSep(data.label, batRow); return; }
        const btn = makeBtn(data, 'batchim-btn', batRow, d => { selF = d; });
        if (idx === 0) btn.classList.add('active');
        batRow.appendChild(btn);
      });
    }

    refresh();
  }

  return { init };
})();

/* ── Typewriter Effect ──────────────────────────────── */
function typewriter(el, texts, speed = 80, pause = 2000) {
  if (!el) return;
  let textIdx = 0;
  let charIdx = 0;
  let deleting = false;

  function tick() {
    const text = texts[textIdx];
    if (!deleting) {
      el.textContent = text.slice(0, ++charIdx);
      if (charIdx === text.length) {
        deleting = true;
        setTimeout(tick, pause);
        return;
      }
    } else {
      el.textContent = text.slice(0, --charIdx);
      if (charIdx === 0) {
        deleting = false;
        textIdx = (textIdx + 1) % texts.length;
      }
    }
    setTimeout(tick, deleting ? speed / 2 : speed);
  }
  tick();
}

/* ── Vocabulary Panel Switcher ──────────────────────── */
function initVocabTabs() {
  const sections = document.querySelectorAll('.vocab-section');
  if (!sections.length) return;

  const categoryLinks = document.querySelectorAll('.sidebar-nav a[href^="#"]');
  if (!categoryLinks.length) {
    sections.forEach(s => { s.classList.add('active'); s.classList.add('visible'); });
    return;
  }

  function showSection(id) {
    sections.forEach(s => s.classList.remove('active'));
    categoryLinks.forEach(l => l.classList.remove('active'));

    const target = document.getElementById(id);
    const link = document.querySelector(`.sidebar-nav a[href="#${id}"]`);

    if (target && target.classList.contains('vocab-section')) {
      target.classList.add('active');
      target.classList.add('visible');
      if (link) link.classList.add('active');

      if (target === sections[0]) {
        window.scrollTo(0, 0);
      } else {
        requestAnimationFrame(() => {
          const headerH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 70;
          const top = target.getBoundingClientRect().top + window.scrollY - headerH - 16;
          window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
        });
      }
    } else {
      sections[0]?.classList.add('active');
      categoryLinks[0]?.classList.add('active');
      window.scrollTo(0, 0);
    }
  }

  const initialHash = window.location.hash.slice(1);
  showSection(initialHash || sections[0]?.id || '');

  categoryLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const id = link.getAttribute('href').slice(1);
      showSection(id);
      history.replaceState(null, '', '#' + id);
    });
  });
}

/* ── Active Nav Highlight ───────────────────────────── */
function highlightActiveNav() {
  const currentPath = window.location.pathname;
  const currentParams = new URLSearchParams(window.location.search);
  document.querySelectorAll('.nav-links a, .sidebar-link').forEach(a => {
    const linkHref = a.getAttribute('href');
    if (!linkHref) return;
    if (linkHref.indexOf('#') >= 0) return; // skip anchor links — active state set in HTML
    try {
      const resolved = new URL(linkHref, window.location.href);
      if (resolved.pathname !== currentPath) return;
      // When the link has query params, every param must match the current URL
      if (resolved.search) {
        for (const [key, val] of new URLSearchParams(resolved.search)) {
          if (currentParams.get(key) !== val) return;
        }
      }
      a.classList.add('active');
    } catch (e) {}
  });
}

/* ── Sidebar Scroll Spy ─────────────────────────────── */
function initSidebarScrollSpy() {
  const anchorLinks = Array.from(document.querySelectorAll('.sidebar-link')).filter(a =>
    (a.getAttribute('href') || '').startsWith('#')
  );
  if (!anchorLinks.length) return;

  const sections = anchorLinks
    .map(a => document.getElementById(a.getAttribute('href').slice(1)))
    .filter(Boolean)
    .sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING) ? -1 : 1);
  if (!sections.length) return;

  function getHeaderH() {
    return parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 70;
  }

  function setActive(id) {
    anchorLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${id}`));
  }

  function onScroll() {
    const offset = getHeaderH() + 40;
    let activeId = sections[0].id;
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= offset) activeId = section.id;
    }
    setActive(activeId);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  anchorLinks.forEach(a => {
    a.addEventListener('click', () => setActive(a.getAttribute('href').slice(1)));
  });
}

/* ── Lesson Header: mobile nav row (back · tag · xp) ──── */
function initLessonNavRow() {
  const header  = document.querySelector('.lesson-header');
  if (!header) return;

  const tag     = header.querySelector(':scope > .lesson-tag');
  const crumb   = document.querySelector('.lesson-breadcrumb');
  const xpBadge = document.getElementById('xp-badge');
  if (!tag) return;

  const row = document.createElement('div');
  row.className = 'lesson-nav-row';

  // Left: back link from breadcrumb's first <a>
  const srcLink = crumb?.querySelector('a');
  const back = document.createElement('a');
  back.href = srcLink?.href || '../index.html';
  back.className = 'lesson-nav-back';
  back.innerHTML =
    '<span class="en-only">← Home</span>' +
    '<span class="ja-only">← ホーム</span>';
  row.appendChild(back);

  // Center: cloned tag (original hidden on mobile via CSS class)
  const tagClone = tag.cloneNode(true);
  row.appendChild(tagClone);
  tag.classList.add('lesson-tag--in-nav');

  // Right: XP value — mirrors fixed badge, hides fixed badge on mobile
  if (xpBadge) {
    const xp = document.createElement('div');
    xp.className = 'lesson-nav-xp';
    xp.textContent = xpBadge.textContent;
    new MutationObserver(() => { xp.textContent = xpBadge.textContent; })
      .observe(xpBadge, { childList: true, characterData: true, subtree: true });
    row.appendChild(xp);
    xpBadge.classList.add('xp-badge--in-nav');
  }

  header.prepend(row);
  if (crumb) crumb.classList.add('lesson-breadcrumb--in-nav');

  if (document.body.classList.contains('lang-ja')) {
    window.LangManager?.translateNode(row);
  }
}

/* ── Lesson Header: mobile progressive-reveal accordion ── */
function initLessonHeaderAccordion() {
  const header = document.querySelector('.lesson-header');
  if (!header) return;

  const meta    = header.querySelector('.lesson-meta');
  const bullets = header.querySelector('.lesson-intro-bullets');
  const metaSpans = meta ? Array.from(meta.querySelectorAll(':scope > span')) : [];

  // Nothing to collapse
  if (metaSpans.length < 3 && !bullets) return;

  // Build button
  const btn = document.createElement('button');
  btn.className = 'lesson-details-btn';
  btn.setAttribute('aria-expanded', 'false');
  btn.innerHTML =
    '<span class="en-only">About this lesson</span>' +
    '<span class="ja-only">このレッスンについて</span>' +
    '<span class="lesson-details-caret" aria-hidden="true">▼</span>';

  // Build body wrapper
  const body  = document.createElement('div');
  body.className = 'lesson-details-body';
  const inner = document.createElement('div');
  inner.className = 'lesson-details-body-inner';
  body.appendChild(inner);

  // Move bullets into accordion body (hidden on mobile, always visible on desktop via max-height rule)
  if (bullets) inner.appendChild(bullets);

  // Insert after meta (or after title if no meta)
  const anchor = meta || header.querySelector('.lesson-title');
  if (!anchor) return;
  anchor.after(btn, body);

  // If already in Japanese mode, apply lang-ja visibility rules to new nodes
  if (document.body.classList.contains('lang-ja')) {
    window.LangManager?.translateNode(btn);
  }

  // Toggle
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    header.classList.toggle('lesson-header--expanded', !expanded);
  });
}

/* ── Content Rail (desktop ≥1280px utility rail) ────── */
const ContentRail = (() => {
  const STRINGS = {
    en:    { wod: 'Word of the Day',  explore: 'Keep Exploring' },
    ja:    { wod: '今日の単語',        explore: '関連ページ' },
    zh_tw: { wod: '每日一詞',          explore: '繼續探索' },
    es:    { wod: 'Palabra del día',  explore: 'Sigue explorando' },
    de:    { wod: 'Wort des Tages',   explore: 'Weiter entdecken' },
    fr:    { wod: 'Mot du jour',      explore: 'À découvrir' },
    vi:    { wod: 'Từ vựng hôm nay',  explore: 'Khám phá thêm' },
    th:    { wod: 'คำศัพท์ประจำวัน',    explore: 'สำรวจต่อ' },
    id:    { wod: 'Kata hari ini',    explore: 'Jelajahi lainnya' },
  };
  const lang = () => (document.documentElement.lang || 'en').toLowerCase().replace('-', '_');
  const t = key => (STRINGS[lang()] || STRINGS.en)[key] || STRINGS.en[key];

  function relatedWidgetHTML() {
    const current = window.location.pathname.replace(/\/$/, '');
    const seen = new Set();
    const links = [];
    document.querySelectorAll('.sidebar-nav .sidebar-link').forEach(a => {
      const href = a.getAttribute('href');
      if (!href || href.startsWith('#')) return;
      let resolved;
      try { resolved = new URL(href, window.location.href); } catch { return; }
      if (resolved.origin !== window.location.origin) return;
      const path = resolved.pathname.replace(/\/$/, '');
      if (path === current || seen.has(path)) return;
      seen.add(path);
      const clone = a.cloneNode(true);
      clone.querySelectorAll('.link-badge').forEach(b => b.remove());
      links.push(`<a class="rail-link" href="${href}">${clone.innerHTML}</a>`);
    });
    if (!links.length) return '';
    return `<div class="rail-widget"><div class="rail-widget-title">${t('explore')}</div>
      <div class="rail-links">${links.slice(0, 5).join('')}</div></div>`;
  }

  const WOD_FILES = [
    'academic', 'adjectives', 'body-parts', 'colors', 'days-time', 'emotions',
    'family', 'food-drink', 'greetings', 'health', 'konglish', 'media', 'news',
    'numbers', 'places', 'shopping', 'travel', 'verbs', 'weather', 'workplace',
  ];

  function initWordOfDay(rail) {
    const holder = rail.querySelector('#rail-wod');
    if (!holder) return;
    const day = Math.floor(Date.now() / 86400000);
    fetch('/learn/data/vocabulary-' + WOD_FILES[day % WOD_FILES.length] + '.json')
      .then(r => (r.ok ? r.json() : Promise.reject()))
      .then(data => {
        const words = (data.steps || []).filter(s =>
          s.type === 'listen_repeat' && s.meaning && (s.syllables || s.word));
        if (!words.length) return;
        const w = words[day % words.length];
        const korean = Array.isArray(w.syllables) ? w.syllables.join('') : (w.word || '');
        const meaning = w['meaning_' + lang()] || w.meaning;
        const reading = (lang() === 'ja' && w.katakana) ? w.katakana
          : (lang() === 'zh_tw' && w.zhuyin) ? w.zhuyin
          : (w.romanization || '');
        holder.innerHTML = `
          <div class="rail-widget-title">${t('wod')}</div>
          <div class="rail-wod-row">
            <div>
              <div class="rail-wod-korean">${korean}</div>
              <div class="rail-wod-roman">${reading}</div>
              <div class="rail-wod-meaning">${meaning}</div>
            </div>
            <button class="rail-speak-btn" aria-label="Listen">🔊</button>
          </div>`;
        holder.hidden = false;
        holder.querySelector('.rail-speak-btn').addEventListener('click', e => {
          if (typeof speakKorean === 'function') speakKorean(w.audio || korean, e.currentTarget);
        });
      })
      .catch(() => holder.remove());
  }

  function init() {
    const wrap = document.querySelector('.main-content .lesson-wrap');
    if (!wrap || document.querySelector('.content-rail')) return;

    const shell = document.createElement('div');
    shell.className = 'content-shell';
    wrap.parentNode.insertBefore(shell, wrap);
    shell.appendChild(wrap);

    const rail = document.createElement('aside');
    rail.className = 'content-rail';
    rail.innerHTML = `
      <div class="rail-widget" id="rail-wod" hidden></div>
      ${relatedWidgetHTML()}`;
    shell.appendChild(rail);

    initWordOfDay(rail);
  }

  return { init };
})();

/* ── Init All ───────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  FlashcardManager.cacheAllVocab(); // must run before LangManager.init() translates DOM text
  ThemeManager.init();
  window.LangManager?.init();

  // When a non-English locale is active on an English learn page, rewrite sidebar / nav links
  // so they point to the translated equivalents (e.g. zh-tw/hangul.html).
  (function rewriteLearnLinksForLocale() {
    const lang = window.LangManager?.getLang();
    if (!lang || lang === 'en') return;
    const m = window.location.pathname.match(/^(.*\/learn\/)(?!zh-tw\/|ja\/)([^/]+\.html)$/);
    if (!m) return;
    document.querySelectorAll('.sidebar-link, .lesson-nav-btn').forEach(a => {
      const href = a.getAttribute('href');
      if (!href || /^(https?:|\/|\.\.)/.test(href) || !href.includes('.html')) return;
      a.setAttribute('href', lang + '/' + href);
    });
  })();

  document.getElementById('theme-toggle')?.addEventListener('click', ThemeManager.toggle);

  FloatingChars.init('floating-chars');
  ScrollAnimator.init();
  MobileSidebar.init();
  MobileNav.init();
  initMobileTables();
  HangulQuiz.init();
  AgentChat.init();
  LessonProgressGrid.init();
  ProgressTracker.init();
  SyllableBuilder.init();
  initHangulCards();
  initSearch();
  initTabs();
  initLevelFilter();
  initVocabTabs();
  initCopyButtons();
  initVocabBookmarks();
  initVocabBrowser();
  initFlashcardPage();
  initSidebarAccordions();
  initLessonNavRow();
  initLessonHeaderAccordion();
  initKrTransSpeakButtons();
  highlightActiveNav();
  initSidebarScrollSpy();
  ContentRail.init();
  if (document.body.dataset.page === 'search') SearchPage.init();

  const typewriterEl = document.getElementById('hero-typewriter');
  if (typewriterEl) {
    typewriter(typewriterEl, ['한국어를 배우세요', 'Learn Korean', '한국을 경험하세요', 'Experience Korea', '지금 시작하세요!']);
  }

  const statsSection = document.querySelector('.hero-stats');
  if (statsSection) {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        animateCounters();
        observer.disconnect();
      }
    });
    observer.observe(statsSection);
  }
});

/* ── FlashcardManager ───────────────────────────────── */
const FlashcardManager = {
  CARDS_KEY: 'koreanschool_flashcards',
  VOCAB_KEY: 'koreanschool_all_vocab',

  THEME_LABELS: {
    greetings: 'Greetings', numbers: 'Numbers', family: 'Family',
    food: 'Food & Drink', colors: 'Colors', days: 'Days & Time',
    places: 'Places', emotions: 'Emotions', body: 'Body Parts',
    travel: 'Travel', shopping: 'Shopping', weather: 'Weather',
    verbs: 'Verbs & Actions', adjectives: 'Adjectives', workplace: 'Workplace',
    health: 'Health & Medicine', media: 'Media & K-Culture',
    proverbs: 'Proverbs & Idioms', academic: 'Academic Korean',
    news: 'News & Society', konglish: 'Konglish',
  },

  _read(key) {
    try { return JSON.parse(localStorage.getItem(key) || '[]'); } catch { return []; }
  },

  getMyCards() { return this._read(this.CARDS_KEY); },
  getAllVocab() { return this._read(this.VOCAB_KEY); },
  saveMyCards(cards) { localStorage.setItem(this.CARDS_KEY, JSON.stringify(cards)); },
  hasCard(id) { return this.getMyCards().some(c => c.id === id); },

  addCard(card) {
    const cards = this.getMyCards();
    if (!cards.find(c => c.id === card.id)) { cards.push(card); this.saveMyCards(cards); }
  },

  removeCard(id) { this.saveMyCards(this.getMyCards().filter(c => c.id !== id)); },
  getByTheme(theme) { return this.getAllVocab().filter(c => c.theme === theme); },

  getRandom(n) {
    const all = this.getAllVocab();
    return [...all].sort(() => Math.random() - 0.5).slice(0, Math.min(n, all.length));
  },

  cacheAllVocab() {
    const vocab = [];
    document.querySelectorAll('.vocab-section').forEach(section => {
      const theme = section.id;
      section.querySelectorAll('.vocab-table tbody tr').forEach(row => {
        const kor = row.querySelector('.kor-cell')?.textContent.trim();
        const romCell = row.querySelector('.rom-cell');
        const kana = romCell?.querySelector('.ja-kana')?.textContent.trim() || '';
        const rom = romCell ? (() => {
          const c = romCell.cloneNode(true);
          c.querySelectorAll('.ja-kana').forEach(el => el.remove());
          return c.textContent.trim();
        })() : '';
        const eng = pickEngCell(row);
        if (kor) vocab.push({ id: kor, korean: kor, romanization: rom, kana, english: eng, theme });
      });
    });
    if (vocab.length) localStorage.setItem(this.VOCAB_KEY, JSON.stringify(vocab));
    return vocab;
  },
};

function pickEngCell(row) {
  const explicit = row.querySelector('.eng-cell');
  if (explicit) return explicit.textContent.trim();
  for (const td of row.querySelectorAll('td')) {
    if (td.classList.contains('kor-cell') || td.classList.contains('rom-cell') ||
        td.classList.contains('example-cell')) continue;
    if (td.querySelector('button, .tag, .hangul-sound-btn')) continue;
    const text = td.textContent.trim();
    if (text && !/^\d+$/.test(text)) return text;
  }
  return '';
}

/* ── Vocab Bookmark Buttons ──────────────────────────── */
function initVocabBookmarks() {
  if (!document.querySelector('.vocab-section')) return;

  document.querySelectorAll('.vocab-section').forEach(section => {
    const theme = section.id;
    section.querySelectorAll('.vocab-table tbody tr').forEach(row => {
      const kor = row.querySelector('.kor-cell')?.textContent.trim();
      const romCell2 = row.querySelector('.rom-cell');
      const kana2 = romCell2?.querySelector('.ja-kana')?.textContent.trim() || '';
      const rom = romCell2 ? (() => {
        const c = romCell2.cloneNode(true);
        c.querySelectorAll('.ja-kana').forEach(el => el.remove());
        return c.textContent.trim();
      })() : '';
      const eng = pickEngCell(row);
      if (!kor) return;
      const lastTd = row.querySelector('td:last-child');
      if (!lastTd) return;

      const saved = FlashcardManager.hasCard(kor);
      const btn = document.createElement('button');
      btn.className = 'bookmark-btn' + (saved ? ' saved' : '');
      btn.setAttribute('aria-label', saved ? 'Remove from flashcards' : 'Add to flashcards');
      btn.textContent = saved ? '★' : '☆';

      btn.addEventListener('click', e => {
        e.stopPropagation();
        if (FlashcardManager.hasCard(kor)) {
          FlashcardManager.removeCard(kor);
          btn.textContent = '☆'; btn.classList.remove('saved');
          btn.setAttribute('aria-label', 'Add to flashcards');
        } else {
          const cached = FlashcardManager.getAllVocab().find(w => w.id === kor);
          FlashcardManager.addCard(cached || { id: kor, korean: kor, romanization: rom, kana: kana2, english: eng, theme });
          btn.textContent = '★'; btn.classList.add('saved');
          btn.setAttribute('aria-label', 'Remove from flashcards');
        }
      });
      lastTd.appendChild(btn);
    });
  });
}

/* ── Vocabulary Browser Page ─────────────────────────── */
function initVocabBrowser() {
  const listEl = document.getElementById('vb-list');
  if (!listEl) return;

  const CATS = [
    { cat: 'greetings',  icon: '👋', label: 'Greetings'    },
    { cat: 'numbers',    icon: '🔢', label: 'Numbers'      },
    { cat: 'family',     icon: '👨‍👩‍👧', label: 'Family'       },
    { cat: 'food-drink', icon: '🍜', label: 'Food & Drink' },
    { cat: 'colors',     icon: '🎨', label: 'Colors'       },
    { cat: 'days-time',  icon: '📅', label: 'Days & Time'  },
    { cat: 'places',     icon: '🏙️', label: 'Places'       },
    { cat: 'emotions',   icon: '😊', label: 'Emotions'     },
    { cat: 'body-parts', icon: '🫁', label: 'Body Parts'   },
    { cat: 'travel',     icon: '✈️', label: 'Travel'       },
    { cat: 'shopping',   icon: '🛒', label: 'Shopping'     },
    { cat: 'weather',    icon: '🌤️', label: 'Weather'      },
    { cat: 'verbs',      icon: '⚡', label: 'Verbs'        },
    { cat: 'adjectives', icon: '✨', label: 'Adjectives'   },
    { cat: 'workplace',  icon: '💼', label: 'Workplace'    },
    { cat: 'health',     icon: '🏥', label: 'Health'       },
    { cat: 'media',      icon: '🎬', label: 'Media'        },
    { cat: 'proverbs',   icon: '📜', label: 'Proverbs'     },
    { cat: 'academic',   icon: '🎓', label: 'Academic'     },
    { cat: 'news',       icon: '📰', label: 'News'         },
    { cat: 'konglish',   icon: '🌐', label: 'Konglish'     },
  ];

  const searchEl  = document.getElementById('vb-search');
  const countEl   = document.getElementById('vb-fc-count');
  const addAllBtn = document.getElementById('vb-add-all');
  let currentWords = [];

  function escStr(s) {
    return String(s ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  function updateCount() {
    if (!countEl) return;
    const n = FlashcardManager.getMyCards().length;
    const suffix = LangManager.t('saved to flashcards');
    countEl.textContent = n + ' ' + suffix;
  }

  function renderRows() {
    const query = (searchEl?.value || '').trim().toLowerCase();
    const filtered = query
      ? currentWords.filter(w =>
          w.korean.includes(query) ||
          w.english.toLowerCase().includes(query) ||
          w.romanization.toLowerCase().includes(query))
      : currentWords;

    if (!filtered.length) {
      listEl.innerHTML = '<div class="vb-empty-msg">' + LangManager.t('No words match your search.') + '</div>';
      return;
    }

    listEl.innerHTML = filtered.map(w => {
      const saved = FlashcardManager.hasCard(w.id);
      return `<div class="vb-row" data-id="${escStr(w.id)}">
        <span class="vb-kor">${escStr(w.korean)}</span>
        <span class="vb-rom">${escStr(w.romanization)}</span>
        <span class="vb-eng">${escStr(w.english)}</span>
        <button class="bookmark-btn${saved ? ' saved' : ''}"
          aria-label="${saved ? 'Remove from flashcards' : 'Add to flashcards'}">${saved ? '★' : '☆'}</button>
      </div>`;
    }).join('');

    listEl.querySelectorAll('.vb-row').forEach((row, i) => {
      const word = filtered[i];
      const btn = row.querySelector('.bookmark-btn');
      btn.addEventListener('click', () => {
        if (FlashcardManager.hasCard(word.id)) {
          FlashcardManager.removeCard(word.id);
          btn.textContent = '☆';
          btn.classList.remove('saved');
          btn.setAttribute('aria-label', 'Add to flashcards');
        } else {
          FlashcardManager.addCard(word);
          btn.textContent = '★';
          btn.classList.add('saved');
          btn.setAttribute('aria-label', 'Remove from flashcards');
        }
        updateCount();
      });
    });
  }

  async function loadCat(cat) {
    history.replaceState({}, '', '?cat=' + cat);
    document.querySelectorAll('.vb-tab').forEach(t =>
      t.classList.toggle('active', t.dataset.cat === cat));

    listEl.innerHTML = '<div class="vb-loading">' + LangManager.t('Loading vocabulary…') + '</div>';

    try {
      const res = await fetch('/learn/data/vocabulary-' + cat + '.json');
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const data = await res.json();
      currentWords = data.steps
        .filter(s => s.type === 'listen_repeat')
        .map(s => ({
          id: s.audio,
          korean: s.syllables.join(''),
          romanization: s.romanization,
          kana: s.katakana || '',
          zhuyin: s.zhuyin || '',
          english: s.meaning,
          theme: cat,
        }));
    } catch {
      listEl.innerHTML = '<div class="vb-empty-msg">' + LangManager.t('Failed to load vocabulary.') + '</div>';
      return;
    }

    if (searchEl) searchEl.value = '';
    renderRows();
    updateCount();

    if (addAllBtn) {
      addAllBtn.onclick = () => {
        currentWords.forEach(w => FlashcardManager.addCard(w));
        renderRows();
        updateCount();
      };
    }
  }

  const tabNav = document.getElementById('vb-tabs');
  if (tabNav) {
    tabNav.innerHTML = CATS.map(c =>
      `<button class="vb-tab" data-cat="${c.cat}" role="tab" aria-label="${c.label}"><span aria-hidden="true">${c.icon}</span> ${c.label}</button>`
    ).join('');
    tabNav.querySelectorAll('.vb-tab').forEach(btn =>
      btn.addEventListener('click', () => loadCat(btn.dataset.cat)));
  }

  if (searchEl) searchEl.addEventListener('input', renderRows);

  const initCat = new URLSearchParams(location.search).get('cat') || 'greetings';
  loadCat(initCat);
}

/* ── Flashcard Page ──────────────────────────────────── */
function initFlashcardPage() {
  const cardEl = document.getElementById('fc-card');
  if (!cardEl) return;

  const cardInner = cardEl.querySelector('.fc-card-inner');
  const frontKorEl = document.getElementById('fc-front-kor');
  const backEngEl = document.getElementById('fc-back-eng');
  const backRomEl = document.getElementById('fc-back-rom');
  const backThemeEl = document.getElementById('fc-back-theme');
  const progressFill = document.getElementById('fc-progress-fill');
  const progressCounter = document.getElementById('fc-progress-counter');
  const setNameEl = document.getElementById('fc-set-name');
  const setCountEl = document.getElementById('fc-set-count');
  const stageEl = document.getElementById('fc-stage');
  const emptyEl = document.getElementById('fc-empty');
  const bookmarkBtn = document.getElementById('fc-bookmark-btn');

  let deck = [], index = 0, isFlipped = false;

  function themeLabel(t) { return FlashcardManager.THEME_LABELS[t] || t || '—'; }

  function renderCard() {
    const hasCards = deck.length > 0;
    stageEl.style.display = hasCards ? '' : 'none';
    emptyEl.style.display = hasCards ? 'none' : '';
    if (!hasCards) return;

    const t = k => window.LangManager?.t(k) ?? k;

    isFlipped = false;
    cardInner.classList.remove('flipped');
    const card = deck[index];
    const allVocab = FlashcardManager.getAllVocab();
    const full = allVocab.find(w => w.id === card.id) || card;
    frontKorEl.textContent = full.korean;
    backEngEl.textContent = t(full.english || card.english || '') || '—';
    const rawRom = full.romanization || card.romanization || '';
    const rawKana = full.kana || card.kana || '';
    const _fcLang = window.LangManager?.getLang() || 'en';
    const rawZhuyin = full.zhuyin || card.zhuyin || '';
    if (_fcLang === 'ja' && rawKana) {
      backRomEl.textContent = rawKana;
    } else if (_fcLang === 'zh-tw' && rawZhuyin) {
      backRomEl.textContent = rawZhuyin;
    } else {
      backRomEl.textContent = rawRom.replace(/[぀-ヿ･-ﾟ]/g, '').trim();
    }
    backThemeEl.textContent = t(themeLabel(card.theme));
    progressFill.style.width = ((index + 1) / deck.length * 100) + '%';
    progressCounter.textContent = `${index + 1} / ${deck.length}`;

    const isSaved = FlashcardManager.hasCard(card.id || card.korean);
    if (bookmarkBtn) {
      bookmarkBtn.textContent = isSaved ? t('★ Remove from My Words') : t('☆ Add to My Words');
      bookmarkBtn.classList.toggle('saved', isSaved);
    }
  }

  function loadDeck(cards, name) {
    deck = [...cards];
    index = 0;
    const t = k => window.LangManager?.t(k) ?? k;
    if (setNameEl) setNameEl.textContent = t(name);
    if (setCountEl) {
      setCountEl.textContent = deck.length
        ? (window.LangManager?.getLang() === 'ja' ? `${deck.length}枚` : `${deck.length} cards`)
        : t('No cards');
    }
    renderCard();
  }

  function updateSidebarCounts() {
    const myBadge = document.getElementById('fc-count-my');
    const allBadge = document.getElementById('fc-count-all');
    if (myBadge) myBadge.textContent = FlashcardManager.getMyCards().length;
    if (allBadge) allBadge.textContent = FlashcardManager.getAllVocab().length;
    document.querySelectorAll('[data-fc-theme-count]').forEach(el => {
      el.textContent = FlashcardManager.getByTheme(el.dataset.fcThemeCount).length;
    });
  }

  cardEl.addEventListener('click', () => {
    isFlipped = !isFlipped;
    cardInner.classList.toggle('flipped', isFlipped);
  });

  document.getElementById('fc-prev')?.addEventListener('click', () => {
    if (index > 0) { index--; renderCard(); }
  });
  document.getElementById('fc-next')?.addEventListener('click', () => {
    if (index < deck.length - 1) { index++; renderCard(); }
    else { index = 0; renderCard(); }
  });
  document.getElementById('fc-flip-btn')?.addEventListener('click', () => {
    isFlipped = !isFlipped;
    cardInner.classList.toggle('flipped', isFlipped);
  });
  document.getElementById('fc-shuffle')?.addEventListener('click', () => {
    deck = [...deck].sort(() => Math.random() - 0.5);
    index = 0; renderCard();
  });
  document.getElementById('fc-speak')?.addEventListener('click', function() {
    if (deck[index]) speakKorean(deck[index].korean, this);
  });
  bookmarkBtn?.addEventListener('click', () => {
    const card = deck[index]; if (!card) return;
    const id = card.id || card.korean;
    const t = k => window.LangManager?.t(k) ?? k;
    if (FlashcardManager.hasCard(id)) {
      FlashcardManager.removeCard(id);
      bookmarkBtn.textContent = t('☆ Add to My Words');
      bookmarkBtn.classList.remove('saved');
    } else {
      FlashcardManager.addCard(card);
      bookmarkBtn.textContent = t('★ Remove from My Words');
      bookmarkBtn.classList.add('saved');
    }
    updateSidebarCounts();
  });
  document.getElementById('fc-restart')?.addEventListener('click', () => { index = 0; renderCard(); });

  document.querySelectorAll('.fc-set-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.fc-set-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const set = btn.dataset.set;
      const name = btn.querySelector('.fc-set-label')?.textContent.trim() || '';
      let cards = [];
      if (set === 'my') cards = FlashcardManager.getMyCards();
      else if (set === 'all') cards = FlashcardManager.getAllVocab();
      else if (set === 'theme') cards = FlashcardManager.getByTheme(btn.dataset.theme);
      else if (set === 'random') cards = FlashcardManager.getRandom(parseInt(btn.dataset.n, 10));
      loadDeck([...cards].sort(() => Math.random() - 0.5), name);
    });
  });

  document.addEventListener('keydown', e => {
    if (!document.getElementById('fc-card')) return;
    if (['INPUT','TEXTAREA'].includes(document.activeElement?.tagName)) return;
    if (e.key === 'ArrowRight') document.getElementById('fc-next')?.click();
    else if (e.key === 'ArrowLeft') document.getElementById('fc-prev')?.click();
    else if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); document.getElementById('fc-flip-btn')?.click(); }
  });

  updateSidebarCounts();
  loadDeck(FlashcardManager.getMyCards(), 'My Words');

  const _fcPageLang = window.LangManager?.getLang() || 'en';
  if (_fcPageLang === 'ja') {
    const lessonTag = document.querySelector('.lesson-tag');
    if (lessonTag) lessonTag.textContent = '📇 スタディツール';
    const titleEl = document.querySelector('.lesson-title');
    if (titleEl) titleEl.innerHTML = 'フラッシュ<span class="grad-text">カード</span> — 단어 카드';
    const metaSpans = document.querySelectorAll('.lesson-meta span');
    ['📇 1枚ずつ', '🔊 音声発音', '⭐ 単語を保存', '🎲 ランダムセット']
      .forEach((txt, i) => { if (metaSpans[i]) metaSpans[i].textContent = txt; });
    const prev = document.getElementById('fc-prev');
    if (prev) prev.textContent = '← 前へ';
    const flipBtn = document.getElementById('fc-flip-btn');
    if (flipBtn) flipBtn.textContent = 'カードをめくる';
    const next = document.getElementById('fc-next');
    if (next) next.textContent = '次へ →';
    const speak = document.getElementById('fc-speak');
    if (speak) speak.textContent = '🔊 発音';
    const shuffleBtn = document.getElementById('fc-shuffle');
    if (shuffleBtn) shuffleBtn.textContent = '🔀 シャッフル';
    const restartBtn = document.getElementById('fc-restart');
    if (restartBtn) restartBtn.textContent = '↩ リスタート';
    const kbHint = document.querySelector('.fc-kb-hint');
    if (kbHint) kbHint.innerHTML = '<kbd>←</kbd> <kbd>→</kbd> 移動 &nbsp; <kbd>Space</kbd> 裏返す';
    const tipLabel = document.querySelector('.tip-label');
    if (tipLabel) tipLabel.textContent = 'デッキの作り方';
    const tipText = document.querySelector('.tip-text');
    if (tipText) tipText.innerHTML = '<a href="vocabulary.html" style="color:var(--accent)">語彙ページ</a>にアクセスし、単語の<strong>☆</strong>をクリックして<em>マイ単語</em>に保存してください。サイドバーのセットですぐに練習できます。テーマセットとランダムセットは語彙キャッシュから自動的に読み込まれます。';
    const emptyTitle = document.querySelector('.fc-empty-title');
    if (emptyTitle) emptyTitle.textContent = 'このセットにカードはありません';
    const emptyDesc = document.querySelector('.fc-empty-desc');
    if (emptyDesc) emptyDesc.innerHTML = '<a href="vocabulary.html" style="color:var(--primary)">語彙ページ</a>にアクセスし、単語の<strong>☆</strong>をクリックしてここに追加してください。<br>またはサイドバーから組み込みセットを選択してください。';
    const browseBtn = document.querySelector('#fc-empty .btn-primary');
    if (browseBtn) browseBtn.textContent = '語彙を見る →';
    const bcSpans = document.querySelectorAll('.lesson-breadcrumb span:not(.sep)');
    if (bcSpans.length) bcSpans[bcSpans.length - 1].textContent = 'フラッシュカード';
  } else if (_fcPageLang === 'zh-tw') {
    const lessonTag = document.querySelector('.lesson-tag');
    if (lessonTag) lessonTag.textContent = '📇 學習工具';
    const titleEl = document.querySelector('.lesson-title');
    if (titleEl) titleEl.innerHTML = '字<span class="grad-text">卡</span> — 단어 카드';
    const metaSpans = document.querySelectorAll('.lesson-meta span');
    ['📇 每次一張', '🔊 語音發音', '⭐ 儲存單字', '🎲 隨機組合']
      .forEach((txt, i) => { if (metaSpans[i]) metaSpans[i].textContent = txt; });
    const prev = document.getElementById('fc-prev');
    if (prev) prev.textContent = '← 上一張';
    const flipBtn = document.getElementById('fc-flip-btn');
    if (flipBtn) flipBtn.textContent = '翻轉字卡';
    const next = document.getElementById('fc-next');
    if (next) next.textContent = '下一張 →';
    const speak = document.getElementById('fc-speak');
    if (speak) speak.textContent = '🔊 發音';
    const shuffleBtn = document.getElementById('fc-shuffle');
    if (shuffleBtn) shuffleBtn.textContent = '🔀 隨機排列';
    const restartBtn = document.getElementById('fc-restart');
    if (restartBtn) restartBtn.textContent = '↩ 重新開始';
    const kbHint = document.querySelector('.fc-kb-hint');
    if (kbHint) kbHint.innerHTML = '<kbd>←</kbd> <kbd>→</kbd> 移動 &nbsp; <kbd>Space</kbd> 翻轉';
    const tipLabel = document.querySelector('.tip-label');
    if (tipLabel) tipLabel.textContent = '如何建立字組';
    const tipText = document.querySelector('.tip-text');
    if (tipText) tipText.innerHTML = '前往<a href="vocabulary.html" style="color:var(--accent)">詞彙頁面</a>，點擊單字的<strong>☆</strong>儲存到<em>我的單字</em>。從側欄的組合立即練習。主題組合與隨機組合會自動從詞彙快取載入。';
    const emptyTitle = document.querySelector('.fc-empty-title');
    if (emptyTitle) emptyTitle.textContent = '此組合中沒有字卡';
    const emptyDesc = document.querySelector('.fc-empty-desc');
    if (emptyDesc) emptyDesc.innerHTML = '前往<a href="vocabulary.html" style="color:var(--primary)">詞彙頁面</a>，點擊單字的<strong>☆</strong>加入此處。<br>或從側欄選擇內建組合。';
    const browseBtn = document.querySelector('#fc-empty .btn-primary');
    if (browseBtn) browseBtn.textContent = '瀏覽詞彙 →';
    const bcSpans = document.querySelectorAll('.lesson-breadcrumb span:not(.sep)');
    if (bcSpans.length) bcSpans[bcSpans.length - 1].textContent = '字卡';
  }
}

/* ── Korean Translation Speak Buttons ───────────────── */
function initKrTransSpeakButtons() {
  document.querySelectorAll('.kr-trans').forEach(el => {
    const text = el.textContent.trim();
    const wrapper = document.createElement('span');
    wrapper.className = 'kr-trans-text';
    wrapper.innerHTML = el.innerHTML;
    const btn = document.createElement('button');
    btn.className = 'kr-speak-btn';
    btn.setAttribute('aria-label', '듣기');
    btn.textContent = '🔊';
    btn.addEventListener('click', () => speakKorean(text, btn));
    el.innerHTML = '';
    el.appendChild(wrapper);
    el.appendChild(btn);
  });
}

/* ── Sidebar Accordions ─────────────────────────────── */
function initSidebarAccordions() {
  const page = window.location.pathname;
  document.querySelectorAll('.sidebar-accordion-btn').forEach(btn => {
    const id = btn.dataset.accordion;
    const content = document.getElementById('accordion-' + id);
    if (!content) return;
    const autoOpen =
      (id === 'vocab'   && page.includes('vocabulary')) ||
      (id === 'grammar' && page.includes('grammar'));
    if (autoOpen) {
      btn.classList.add('open', 'active');
      content.classList.add('open');
    }
    btn.addEventListener('click', () => {
      btn.classList.toggle('open');
      content.classList.toggle('open');
    });
  });
}

/* ── Search Results Page ────────────────────────────── */
const SearchPage = (() => {
  const CAT_META = {
    words:   { label: 'Words',   icon: '🔤', badgeClass: 'tag-beginner' },
    topics:  { label: 'Topics',  icon: '📄', badgeClass: 'tag-beginner' },
    learn:   { label: 'Learn',   icon: '📚', badgeClass: 'tag-beginner' },
    culture: { label: 'Culture', icon: '🎵', badgeClass: 'tag-kpop'    },
    travel:  { label: 'Travel',  icon: '🗺️', badgeClass: 'tag-travel'  },
    home:    { label: 'Home',    icon: '🏠', badgeClass: 'tag-news'    },
  };
  // A category absent from ORDER is silently dropped, not rendered — any new
  // category in WORD_KIND must be added here AND to CAT_META.
  const ORDER = ['learn', 'topics', 'words', 'culture', 'travel', 'home'];

  function T(s) {
    return (window.LangManager && LangManager.t) ? LangManager.t(s) : s;
  }

  function getQuery() {
    // URLSearchParams already decodes — a second decodeURIComponent
    // throws URIError on queries containing a literal "%"
    return (new URLSearchParams(window.location.search).get('q') || '').trim();
  }

  function render(q) {
    const meta  = document.getElementById('search-results-meta');
    const container = document.getElementById('search-results-container');
    if (!container) return;

    if (!q) {
      meta.textContent = T('Enter a search term above.');
      container.innerHTML = '';
      return;
    }

    const results = searchIndex(q);
    const grouped = {};
    results.forEach(r => { (grouped[r.category] = grouped[r.category] || []).push(r); });

    meta.textContent = results.length
      ? `${results.length} ${T(results.length !== 1 ? 'results for' : 'result for')} "${q}"`
      : '';

    if (!results.length) {
      container.innerHTML = `<div class="search-no-results"><div style="font-size:2.5rem;margin-bottom:16px">🔍</div><div style="font-size:1.1rem;font-weight:700;margin-bottom:8px">No results for "${escHtml(q)}"</div><div style="font-size:0.875rem;color:var(--text-muted)">Try different keywords — e.g. "hangul", "kimchi", "seoul"</div></div>`;
      return;
    }

    container.innerHTML = ORDER.filter(cat => grouped[cat]).map(cat => {
      const { label, icon, badgeClass } = CAT_META[cat];
      const items = grouped[cat].map(r =>
        `<a href="${escHtml(searchResolveUrl(r.url))}" class="search-result-item">
          <span class="search-result-icon">${r.icon}</span>
          <span class="search-result-body">
            <span class="search-result-title">${escHtml(r.title)}</span>
            <span class="search-result-desc">${escHtml(r.desc)}</span>
          </span>
          <span class="tag search-result-badge ${badgeClass}">${label}</span>
        </a>`
      ).join('');
      return `<div class="search-cat-header">${icon} ${label.toUpperCase()} <span style="font-weight:400;opacity:0.6">(${grouped[cat].length})</span></div>${items}`;
    }).join('');
  }

  function init() {
    const q = getQuery();
    const pageInput = document.getElementById('search-page-input');
    const pageBtn   = document.getElementById('search-page-btn');
    if (pageInput) pageInput.value = q;

    function submit() {
      const val = pageInput ? pageInput.value.trim() : '';
      if (val) {
        history.pushState(null, '', '?q=' + encodeURIComponent(val));
        render(val);
      }
    }
    if (pageBtn) pageBtn.addEventListener('click', submit);
    if (pageInput) pageInput.addEventListener('keydown', e => { if (e.key === 'Enter') submit(); });

    render(q);
    // word index loads async — re-render so vocab results appear
    loadWordIndex().then(() => render(getQuery() || (pageInput ? pageInput.value.trim() : '')));
  }

  return { init };
})();

/* ── Expose globals ─────────────────────────────────── */
window.speakKorean = speakKorean;
window.speakSyllable = speakSyllable;
window.stopSpeaking = stopSpeaking;
window.HangulQuiz = HangulQuiz;
window.ThemeManager = ThemeManager;
window.ProgressTracker = ProgressTracker;

/* ═══════════════════════════════════════════════════════
   TRAVEL PLANNER MODULE
═══════════════════════════════════════════════════════ */
const TravelPlanner = (() => {
  const STORAGE_KEY = 'travel-plan';
  const MAX_EVENTS = 6;
  const LEGEND_ORDER = ['wake','sleep','arrive','depart','breakfast','lunch','dinner','snack','sight','shopping','event','experience','free','note','taxi','bus','train','subway','motorbike','walk'];

  const EVENT_LABELS = {
    wake:'Wake Up', sleep:'Sleep', arrive:'Airport Arrival', depart:'Airport Departure',
    breakfast:'Breakfast', lunch:'Lunch', dinner:'Dinner', snack:'Snack',
    sight:'Sightseeing', shopping:'Shopping', event:'Event', experience:'Experience',
    free:'Free Time', note:'Note',
    taxi:'Taxi', bus:'Bus', train:'Train', subway:'Subway', motorbike:'Motorbike', walk:'Walk',
    // legacy
    airport:'Airport/Flight', transport:'Transport', transfer:'Transfer',
    wait:'Wait', cafe:'Cafe', drink:'Drink', party:'Party',
  };

  const EVENT_META = {
    wake:       { icon:'☀️',  cls:'event-type-wake'       },
    sleep:      { icon:'🌙',  cls:'event-type-sleep'      },
    arrive:     { icon:'🛬',  cls:'event-type-arrive'     },
    depart:     { icon:'🛫',  cls:'event-type-depart'     },
    breakfast:  { icon:'🍳',  cls:'event-type-breakfast'  },
    lunch:      { icon:'🍱',  cls:'event-type-lunch'      },
    dinner:     { icon:'🍽️', cls:'event-type-dinner'     },
    snack:      { icon:'🧁',  cls:'event-type-snack'      },
    sight:      { icon:'🏛️', cls:'event-type-sight'      },
    shopping:   { icon:'🛍️', cls:'event-type-shopping'   },
    event:      { icon:'🎟️', cls:'event-type-event'      },
    experience: { icon:'🎭',  cls:'event-type-experience' },
    free:       { icon:'🗺️', cls:'event-type-free'       },
    note:       { icon:'📝',  cls:'event-type-note'       },
    taxi:       { icon:'🚕',  cls:'event-type-taxi'       },
    bus:        { icon:'🚌',  cls:'event-type-bus'        },
    train:      { icon:'🚄',  cls:'event-type-train'      },
    subway:     { icon:'🚇',  cls:'event-type-subway'     },
    motorbike:  { icon:'🛵',  cls:'event-type-motorbike'  },
    walk:       { icon:'🚶',  cls:'event-type-walk'       },
    // legacy
    airport:    { icon:'✈️',  cls:'event-type-airport'    },
    transport:  { icon:'🚄',  cls:'event-type-train'      },
    transfer:   { icon:'🔄',  cls:'event-type-transfer'   },
    wait:       { icon:'⏳',  cls:'event-type-wait'       },
    cafe:       { icon:'☕',  cls:'event-type-cafe'       },
    drink:      { icon:'🍺',  cls:'event-type-drink'      },
    party:      { icon:'🎉',  cls:'event-type-party'      },
  };

  function makeTimeSlots() {
    const slots = [];
    for (let h = 7; h <= 24; h++) {
      slots.push(`${String(h).padStart(2,'0')}:00`);
    }
    return slots;
  }

  function formatTimeAMPM(time) {
    const h = parseInt(time.split(':')[0], 10);
    if (h === 24) return '12 AM';
    const period = h < 12 ? 'AM' : 'PM';
    const h12 = h % 12 || 12;
    return `${h12} ${period}`;
  }

  let state = { title:'My Korea Trip', startDate:'', days:3, city:'', minimalMode:false, events:{}, memos:{} };
  let pendingDay = null;

  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        state = { ...state, ...parsed };
      }
    } catch(e) {}
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function formatDate(startDateStr, dayIndex) {
    if (!startDateStr) return `Day ${dayIndex + 1}`;
    const d = new Date(startDateStr);
    d.setDate(d.getDate() + dayIndex);
    return d.toLocaleDateString('en-GB', { weekday:'short', month:'short', day:'numeric' });
  }

  function getEventsForSlot(dayIdx, time) {
    return state.events[`${dayIdx}:${time}`] || [];
  }

  function renderEventEl(ev, dayIdx, time, slotEl) {
    const meta = EVENT_META[ev.type] || EVENT_META.note;
    const div = document.createElement('div');
    div.className = `planner-event ${meta.cls}`;
    div.dataset.id = ev.id;
    div.setAttribute('draggable', 'true');
    div.innerHTML = `<span class="event-emoji">${meta.icon}</span> <span class="planner-event-label">${ev.label}</span>${ev.notes ? `<span class="planner-event-time">${ev.notes}</span>` : ''}<button class="planner-event-delete" aria-label="Remove event">✕</button>`;
    div.querySelector('.planner-event-delete').addEventListener('click', (e) => {
      e.stopPropagation();
      removeEvent(dayIdx, time, ev.id);
    });
    div.addEventListener('click', (e) => {
      if (e.target.closest('.planner-event-delete')) return;
      openEditModal(dayIdx, time, ev.id);
    });
    div.addEventListener('dragstart', (e) => {
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', JSON.stringify({ from:'event', dayIdx, time, evId:ev.id }));
      div.classList.add('planner-event-dragging');
      e.stopPropagation();
    });
    div.addEventListener('dragend', () => div.classList.remove('planner-event-dragging'));
    slotEl.appendChild(div);
  }

  function renderGrid() {
    const container = document.getElementById('planner-grid');
    if (!container) return;

    const numDays = state.days;
    const timeSlots = makeTimeSlots();
    const wrapper = document.getElementById('planner-grid-wrapper');
    const wrapperW = wrapper ? wrapper.offsetWidth : 0;
    const TIME_COL = 56;
    const colMinW = wrapperW > 0 ? Math.max(140, Math.floor((wrapperW - TIME_COL) / 5)) : 200;
    const colTemplate = `${TIME_COL}px repeat(${numDays}, minmax(${colMinW}px, 1fr))`;

    container.innerHTML = '';
    container.style.cssText = '';

    const grid = document.createElement('div');
    grid.className = 'planner-grid-inner';
    grid.style.cssText = `display:grid;grid-template-columns:${colTemplate};`;

    const cornerCell = document.createElement('div');
    cornerCell.className = 'planner-time-cell planner-time-header';
    cornerCell.innerHTML = `<span style="font-size:0.65rem;font-weight:900;letter-spacing:0.07em;">TIME</span><span style="font-size:0.55rem;opacity:0.5;font-weight:600;letter-spacing:0.05em;">DAY</span>`;
    grid.appendChild(cornerCell);

    for (let d = 0; d < numDays; d++) {
      const hdr = document.createElement('div');
      hdr.className = 'planner-day-header';

      const dayNumEl = document.createElement('div');
      dayNumEl.className = 'planner-day-num';
      dayNumEl.contentEditable = 'true';
      dayNumEl.spellcheck = false;
      dayNumEl.textContent = state.dayNames?.[d] || `Day ${d + 1}`;
      dayNumEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') { e.preventDefault(); dayNumEl.blur(); }
      });
      dayNumEl.addEventListener('blur', () => {
        const val = dayNumEl.textContent.trim();
        if (!state.dayNames) state.dayNames = {};
        state.dayNames[d] = val || `Day ${d + 1}`;
        if (!val) dayNumEl.textContent = state.dayNames[d];
        saveState();
      });

      const dayDateEl = document.createElement('div');
      dayDateEl.className = 'planner-day-date';
      dayDateEl.textContent = formatDate(state.startDate, d);

      hdr.appendChild(dayNumEl);
      hdr.appendChild(dayDateEl);
      grid.appendChild(hdr);
    }

    timeSlots.forEach(time => {
      const timeCell = document.createElement('div');
      timeCell.className = 'planner-time-cell';
      timeCell.textContent = formatTimeAMPM(time);
      grid.appendChild(timeCell);

      for (let d = 0; d < numDays; d++) {
        const cell = document.createElement('div');
        cell.className = 'planner-cell';
        cell.dataset.day = d;
        cell.dataset.time = time;

        const cellEvents = getEventsForSlot(d, time);
        cellEvents.forEach(ev => renderEventEl(ev, d, time, cell));
        if (cellEvents.length >= MAX_EVENTS) cell.classList.add('cell-full');

        const addBtn = document.createElement('button');
        addBtn.className = 'planner-add-btn';
        addBtn.setAttribute('aria-label', `Add event at ${time} on Day ${d + 1}`);
        if (cellEvents.length >= MAX_EVENTS) {
          addBtn.textContent = `✕ Full (${MAX_EVENTS})`;
          addBtn.disabled = true;
        } else {
          addBtn.textContent = '+ Add';
          addBtn.addEventListener('click', () => openModal(d, time));
        }
        cell.appendChild(addBtn);

        cell.addEventListener('dragover', (e) => {
          e.preventDefault();
          e.dataTransfer.dropEffect = 'move';
          cell.classList.add('drag-over');
        });
        cell.addEventListener('dragleave', (e) => {
          if (!cell.contains(e.relatedTarget)) cell.classList.remove('drag-over');
        });
        cell.addEventListener('drop', (e) => {
          e.preventDefault();
          cell.classList.remove('drag-over');
          try {
            const data = JSON.parse(e.dataTransfer.getData('text/plain'));
            if (data.from === 'legend') {
              openModalWithType(d, time, data.type);
            } else if (data.from === 'event') {
              moveEvent(data.dayIdx, data.time, data.evId, d, time);
            }
          } catch {}
        });

        grid.appendChild(cell);
      }
    });

    // Memo row (3× row height, one textarea per day)
    const memoTimeCell = document.createElement('div');
    memoTimeCell.className = 'planner-time-cell planner-memo-time-cell';
    memoTimeCell.innerHTML = `<span style="font-size:1rem;">📝</span><span style="font-size:0.55rem;font-weight:900;letter-spacing:0.07em;">MEMO</span>`;
    grid.appendChild(memoTimeCell);

    for (let d = 0; d < numDays; d++) {
      const memoCell = document.createElement('div');
      memoCell.className = 'planner-cell planner-memo-cell';
      const ta = document.createElement('textarea');
      ta.className = 'planner-memo-input';
      ta.placeholder = `Notes for Day ${d + 1}…`;
      ta.value = state.memos?.[d] || '';
      ta.addEventListener('input', () => {
        if (!state.memos) state.memos = {};
        state.memos[d] = ta.value;
        saveState();
      });
      memoCell.appendChild(ta);
      grid.appendChild(memoCell);
    }

    container.appendChild(grid);
    if (state.minimalMode) container.classList.add('planner-minimal');
  }

  function bindLegendDrag() {
    const legend = document.getElementById('planner-legend');
    if (!legend) return;
    legend.querySelectorAll('.planner-legend-item').forEach((item) => {
      const type = item.dataset.type || 'note';
      item.setAttribute('draggable', 'true');
      item.dataset.eventType = type;
      item.addEventListener('dragstart', (e) => {
        e.dataTransfer.effectAllowed = 'all';
        e.dataTransfer.setData('text/plain', JSON.stringify({ from:'legend', type }));
        item.classList.add('legend-dragging');
      });
      item.addEventListener('dragend', () => item.classList.remove('legend-dragging'));
    });
  }

  function openModal(dayIdx, time) {
    pendingDay = dayIdx;
    const modal = document.getElementById('event-modal');
    if (!modal) return;
    document.getElementById('event-label').value = '';
    document.getElementById('event-time').value = time !== '24:00' ? time : '00:00';
    document.getElementById('event-notes').value = '';
    document.getElementById('event-day-idx').value = dayIdx;
    document.getElementById('event-edit-id').value = '';
    document.getElementById('event-orig-time').value = '';
    modal.querySelectorAll('.planner-type-btn').forEach(b => b.classList.remove('selected'));
    modal.querySelector('.planner-modal-title').textContent = 'Add Event · 일정 추가';
    document.getElementById('modal-save-btn').textContent = 'Add Event';
    document.getElementById('modal-delete-btn').style.display = 'none';
    modal.classList.add('open');
    setTimeout(() => document.getElementById('event-label').focus(), 50);
  }

  function openModalWithType(dayIdx, time, type) {
    openModal(dayIdx, time);
    const modal = document.getElementById('event-modal');
    if (!modal) return;
    modal.querySelectorAll('.planner-type-btn').forEach(b => {
      b.classList.toggle('selected', b.dataset.type === type);
    });
  }

  function openEditModal(dayIdx, time, evId) {
    const ev = (state.events[`${dayIdx}:${time}`] || []).find(e => e.id === evId);
    if (!ev) return;
    pendingDay = dayIdx;
    const modal = document.getElementById('event-modal');
    if (!modal) return;
    document.getElementById('event-label').value = ev.label;
    document.getElementById('event-time').value = time !== '24:00' ? time : '00:00';
    document.getElementById('event-notes').value = ev.notes || '';
    document.getElementById('event-day-idx').value = dayIdx;
    document.getElementById('event-edit-id').value = evId;
    document.getElementById('event-orig-time').value = time;
    modal.querySelectorAll('.planner-type-btn').forEach(b => b.classList.toggle('selected', b.dataset.type === ev.type));
    modal.querySelector('.planner-modal-title').textContent = 'Edit Event · 일정 수정';
    document.getElementById('modal-save-btn').textContent = 'Save Changes';
    document.getElementById('modal-delete-btn').style.display = 'inline-flex';
    modal.classList.add('open');
    setTimeout(() => document.getElementById('event-label').focus(), 50);
  }

  function closeModal() {
    const modal = document.getElementById('event-modal');
    if (modal) modal.classList.remove('open');
    pendingDay = null;
    const editId = document.getElementById('event-edit-id');
    if (editId) editId.value = '';
  }

  function addEvent(dayIdx, time, type, label, notes) {
    const key = `${dayIdx}:${time}`;
    if (!state.events[key]) state.events[key] = [];
    if (state.events[key].length >= MAX_EVENTS) return;
    const ev = { id: Date.now().toString(36) + Math.random().toString(36).slice(2), type, label, notes };
    state.events[key].push(ev);
    saveState();
    document.querySelectorAll(`.planner-cell[data-day="${dayIdx}"][data-time="${time}"]`).forEach(cell => {
      const addBtn = cell.querySelector('.planner-add-btn');
      renderEventEl(ev, dayIdx, time, cell);
      const count = getEventsForSlot(dayIdx, time).length;
      if (addBtn) {
        if (count >= MAX_EVENTS) {
          cell.classList.add('cell-full');
          addBtn.textContent = `✕ Full (${MAX_EVENTS})`;
          addBtn.disabled = true;
        }
        cell.appendChild(addBtn);
      }
    });
  }

  function removeEvent(dayIdx, time, evId) {
    const key = `${dayIdx}:${time}`;
    if (!state.events[key]) return;
    state.events[key] = state.events[key].filter(e => e.id !== evId);
    if (!state.events[key].length) delete state.events[key];
    saveState();
    document.querySelectorAll(`.planner-event[data-id="${evId}"]`).forEach(el => el.remove());
    document.querySelectorAll(`.planner-cell[data-day="${dayIdx}"][data-time="${time}"]`).forEach(cell => {
      const count = getEventsForSlot(dayIdx, time).length;
      if (count < MAX_EVENTS) {
        cell.classList.remove('cell-full');
        const addBtn = cell.querySelector('.planner-add-btn');
        if (addBtn && addBtn.disabled) {
          addBtn.textContent = '+ Add';
          addBtn.disabled = false;
          addBtn.addEventListener('click', () => openModal(dayIdx, time));
        }
      }
    });
  }

  function editEvent(dayIdx, time, evId, type, label, notes) {
    const key = `${dayIdx}:${time}`;
    if (!state.events[key]) return;
    const ev = state.events[key].find(e => e.id === evId);
    if (!ev) return;
    ev.type = type;
    ev.label = label;
    ev.notes = notes;
    saveState();
    renderGrid();
  }

  function moveEvent(fromDay, fromTime, evId, toDay, toTime) {
    const fromKey = `${fromDay}:${fromTime}`;
    const toKey = `${toDay}:${toTime}`;
    if (!state.events[fromKey]) return;
    const evIdx = state.events[fromKey].findIndex(e => e.id === evId);
    if (evIdx === -1) return;
    if (!state.events[toKey]) state.events[toKey] = [];
    if (state.events[toKey].length >= MAX_EVENTS) return;
    const [ev] = state.events[fromKey].splice(evIdx, 1);
    if (!state.events[fromKey].length) delete state.events[fromKey];
    state.events[toKey].push(ev);
    saveState();
    renderGrid();
  }

  function syncToolbarToState() {
    const f = (id, val) => { const el = document.getElementById(id); if (el) el.value = val; };
    f('trip-start', state.startDate);
    f('trip-days',  state.days);
  }

  function bindToolbar() {
    function onToolbarChange() {
      const g = (id, fallback) => { const el = document.getElementById(id); return el ? el.value : fallback; };
      state.startDate = g('trip-start', state.startDate);
      state.days = Math.max(1, Math.min(30, parseInt(g('trip-days', '3'), 10) || 1));
      saveState();
      renderGrid();
    }
    ['trip-start','trip-days'].forEach(id => {
      document.getElementById(id)?.addEventListener('change', onToolbarChange);
    });

    document.getElementById('planner-print-btn')?.addEventListener('click', () => window.print());

    window.addEventListener('beforeprint', () => {
      document.querySelectorAll('.planner-grid-inner').forEach(el => {
        el.dataset.savedCols = el.style.gridTemplateColumns;
        el.style.gridTemplateColumns = el.style.gridTemplateColumns
          .replace(/^56px/, '44px')
          .replace(/minmax\([^)]+\)/g, '1fr');
      });
    });
    window.addEventListener('afterprint', () => {
      document.querySelectorAll('.planner-grid-inner').forEach(el => {
        if (el.dataset.savedCols != null) {
          el.style.gridTemplateColumns = el.dataset.savedCols;
          delete el.dataset.savedCols;
        }
      });
    });

    document.getElementById('planner-reset-btn')?.addEventListener('click', () => {
      if (confirm('Clear all events? This cannot be undone.')) {
        state.events = {};
        saveState();
        renderGrid();
      }
    });

  }

  function bindLegendToggle() {
    const btn = document.getElementById('planner-legend-toggle');
    const legend = document.getElementById('planner-legend');
    const hint = document.getElementById('planner-legend-hint');
    if (!btn || !legend || !hint) return;
    let collapsed = false;
    btn.addEventListener('click', () => {
      collapsed = !collapsed;
      legend.style.display = collapsed ? 'none' : '';
      hint.style.display = collapsed ? '' : 'none';
      btn.textContent = (collapsed ? '▶' : '▼') + ' Event Types';
    });
  }

  function bindMinimalToggle() {
    const btn = document.getElementById('planner-minimal-btn');
    if (!btn) return;
    const updateBtn = () => {
      const grid = document.getElementById('planner-grid');
      if (grid) grid.classList.toggle('planner-minimal', !!state.minimalMode);
      btn.classList.toggle('planner-btn-minimal-active', !!state.minimalMode);
      btn.textContent = state.minimalMode ? '🎨 Rich Mode' : '📋 Minimal';
    };
    updateBtn();
    btn.addEventListener('click', () => {
      state.minimalMode = !state.minimalMode;
      saveState();
      updateBtn();
    });
  }

  function bindEmojiToggle() {
    const btn = document.getElementById('legend-emoji-toggle');
    const content = document.querySelector('.planner-content');
    if (!btn || !content) return;
    btn.addEventListener('click', () => {
      const hidden = content.classList.toggle('no-emoji');
      btn.textContent = hidden ? 'Emojis' : 'No Emojis';
    });
  }

  function bindModal() {
    const modal = document.getElementById('event-modal');
    if (!modal) return;
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    document.getElementById('modal-cancel-btn')?.addEventListener('click', closeModal);

    modal.querySelectorAll('.planner-type-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        modal.querySelectorAll('.planner-type-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
      });
    });

    document.getElementById('modal-delete-btn')?.addEventListener('click', () => {
      const dayIdx = parseInt(document.getElementById('event-day-idx')?.value || '0', 10);
      const origTime = document.getElementById('event-orig-time')?.value || '';
      const evId = document.getElementById('event-edit-id')?.value || '';
      if (evId && origTime) removeEvent(dayIdx, origTime, evId);
      closeModal();
    });

    document.getElementById('modal-save-btn')?.addEventListener('click', () => {
      const label = document.getElementById('event-label')?.value.trim();
      if (!label) { document.getElementById('event-label')?.focus(); return; }
      const type = modal.querySelector('.planner-type-btn.selected')?.dataset.type || 'note';
      const time = document.getElementById('event-time')?.value || '09:00';
      const notes = document.getElementById('event-notes')?.value.trim() || '';
      const dayIdx = parseInt(document.getElementById('event-day-idx')?.value || '0', 10);
      const editId = document.getElementById('event-edit-id')?.value || '';
      if (editId) {
        const origTime = document.getElementById('event-orig-time')?.value || time;
        editEvent(dayIdx, origTime, editId, type, label, notes);
      } else {
        addEvent(dayIdx, time, type, label, notes);
      }
      closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (!modal.classList.contains('open')) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'Enter' && e.target !== document.getElementById('event-notes')) {
        document.getElementById('modal-save-btn')?.click();
      }
    });
  }

  function bindGridDragScroll() {
    const grid = document.getElementById('planner-grid');
    if (!grid) return;

    let dragging = false;
    let scrolled = false;
    let startX = 0;
    let startScrollLeft = 0;

    grid.addEventListener('mousedown', (e) => {
      if (!e.target.closest('.planner-cell, .planner-add-btn')) return;
      if (e.target.closest('.planner-event')) return;
      dragging = true;
      scrolled = false;
      startX = e.clientX;
      startScrollLeft = grid.scrollLeft;
    });

    document.addEventListener('mousemove', (e) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 4) {
        scrolled = true;
        grid.scrollLeft = startScrollLeft - dx;
        grid.style.cursor = 'grabbing';
        grid.style.userSelect = 'none';
      }
    });

    document.addEventListener('mouseup', () => {
      if (!dragging) return;
      dragging = false;
      grid.style.cursor = '';
      grid.style.userSelect = '';
    });

    // Suppress click after a scroll drag so modal doesn't open accidentally
    grid.addEventListener('click', (e) => {
      if (scrolled) {
        e.stopPropagation();
        scrolled = false;
      }
    }, true);
  }

  function init() {
    if (!document.getElementById('planner-grid')) return;
    loadState();
    syncToolbarToState();
    renderGrid();
    bindToolbar();
    bindModal();
    bindLegendDrag();
    bindLegendToggle();
    bindMinimalToggle();
    bindEmojiToggle();
    bindGridDragScroll();
  }

  return { init, addEvent, removeEvent };
})();

document.addEventListener('DOMContentLoaded', () => TravelPlanner.init());
window.TravelPlanner = TravelPlanner;

/* ── Quiz Page ───────────────────────────────────────── */
const QuizPage = (() => {
  const LEVELS = [
    null,
    { name: 'Vowel Recognition',      ja: '母音の識別',     zh: '母音辨識',   kr: '모음 인식',      topics: 'ㅏ ㅓ ㅗ ㅜ ㅡ ㅣ and all vowels',            diff: 'Beginner',        badge: 'tag-beginner' },
    { name: 'Consonant Recognition',  ja: '子音の識別',     zh: '子音辨識',   kr: '자음 인식',      topics: 'ㄱ ㄴ ㄷ ㄹ + tense & aspirated',             diff: 'Beginner',        badge: 'tag-beginner' },
    { name: 'Syllable & Word Reading',ja: '音節と単語の読み', zh: '音節與單字閱讀', kr: '음절과 단어 읽기', topics: '안녕하세요 · 친구 · 학교 · 사랑',          diff: 'Beginner',        badge: 'tag-beginner' },
    { name: 'Greetings & Phrases',    ja: '挨拶とフレーズ', zh: '問候與短語', kr: '인사말',          topics: '감사합니다 · 반갑습니다 · 잘 먹겠습니다',       diff: 'Beginner',        badge: 'tag-beginner' },
    { name: 'Numbers & Family',       ja: '数字と家族',     zh: '數字與家族', kr: '숫자와 가족',    topics: '일 이 삼 · 하나 둘 셋 · 형 오빠 언니',          diff: 'Beginner',        badge: 'tag-beginner' },
    { name: 'Essential Particles',    ja: '基本助詞',       zh: '基礎助詞',   kr: '핵심 조사',      topics: '은/는 · 이/가 · 을/를 · 에 · 에서',             diff: 'Beg–Int',         badge: 'tag-intermediate' },
    { name: 'Daily Life Vocabulary',  ja: '日常語彙',       zh: '日常詞彙',   kr: '일상 어휘',      topics: '음식 · 장소 · 감정 · 색깔 · 신체',              diff: 'Intermediate',    badge: 'tag-intermediate' },
    { name: 'Verb Conjugation',       ja: '動詞の活用',     zh: '動詞變化',   kr: '동사 변화',      topics: '가요 · 먹었어요 · 갈 거예요 · 먹고 있어요',     diff: 'Intermediate',    badge: 'tag-intermediate' },
    { name: 'Grammar Patterns',       ja: '文法パターン',   zh: '文法句型',   kr: '문법 패턴',      topics: '-보다 더 · -(으)세요 · -는 것 · 그래서',        diff: 'Int–Advanced',    badge: 'tag-advanced' },
    { name: 'Advanced Vocabulary',    ja: '上級語彙',       zh: '高級詞彙',   kr: '고급 어휘',      topics: '속담 · 관용어 · 콩글리시 · 학문 어휘',          diff: 'Advanced',        badge: 'tag-advanced' },
  ];

  let _lv = 0, _qs = [], _qi = 0, _sc = 0, _correctIdx = 0;

  function init() {
    const c = document.getElementById('quiz-container');
    if (c) _showSelect(c);
  }

  function _showSelect(c) {
    const _sLang = typeof LangManager !== 'undefined' ? LangManager.getLang() : 'en';
    const isJa = _sLang === 'ja';
    const isZhTw = _sLang === 'zh-tw';
    let html = '<div class="quiz-level-grid">';
    for (let i = 1; i <= 10; i++) {
      const lv = LEVELS[i];
      const displayName = isJa ? lv.ja : isZhTw ? (lv.zh || lv.name) : lv.name;
      html += `<div class="quiz-level-card" data-level="${i}">
        <div class="quiz-level-num">Level ${i}</div>
        <div class="quiz-level-name">${displayName}</div>
        <div class="quiz-level-kr">${lv.kr}</div>
        <div class="quiz-level-topics">${lv.topics}</div>
        <div class="quiz-level-foot">
          <span class="tag ${lv.badge}">${lv.diff}</span>
          <span class="quiz-q-count">20 questions</span>
        </div>
      </div>`;
    }
    html += '</div>';
    c.innerHTML = html;
    c.addEventListener('click', _onCardClick);
  }

  function _onCardClick(e) {
    const card = e.target.closest('[data-level]');
    if (!card) return;
    const c = document.getElementById('quiz-container');
    c.removeEventListener('click', _onCardClick);
    _start(parseInt(card.dataset.level), c);
  }

  function _start(n, c) {
    _lv = n; _qi = 0; _sc = 0;
    _qs = _shuffle([...window.QUIZ_DATA[n]]);
    _showQ(c);
  }

  function _showQ(c) {
    const q = _qs[_qi];
    const lv = LEVELS[_lv];
    const pct = (_qi / _qs.length) * 100;
    const _qLang = typeof LangManager !== 'undefined' ? LangManager.getLang() : 'en';
    const isJa = _qLang === 'ja';
    const isZhTw = _qLang === 'zh-tw';
    const jaData = isJa && window.QUIZ_JA ? window.QUIZ_JA[q.q] : null;
    const zhTwData = isZhTw && window.QUIZ_ZH_TW ? window.QUIZ_ZH_TW[q.q] : null;
    const qText = jaData ? jaData.qja : zhTwData ? zhTwData.qzh : q.q;
    const choicesArr = (jaData && jaData.choicesja) ? jaData.choicesja : (zhTwData && zhTwData.choiceszh) ? zhTwData.choiceszh : q.choices;
    const lvName = isJa ? lv.ja : isZhTw ? (lv.zh || lv.name) : lv.name;
    const backLabel = isJa ? '← レベル一覧' : isZhTw ? '← 所有關卡' : '← All Levels';
    const qStyle = q.korean ? ' style="font-family:var(--font-korean);font-size:1.55rem;"' : '';
    const idxOrder = _shuffle([0, 1, 2, 3]);
    _correctIdx = idxOrder.indexOf(q.answer);
    let opts = '';
    idxOrder.forEach((origIdx, i) => { opts += `<button class="quiz-option" data-idx="${i}">${choicesArr[origIdx]}</button>`; });
    c.innerHTML = `
      <div class="quiz-progress-wrap"><div class="quiz-progress-bar" style="width:${pct}%"></div></div>
      <div class="quiz-box">
        <div class="quiz-header">
          <div class="quiz-title">Level ${_lv} · ${lvName}</div>
          <div class="quiz-score">${_qi + 1} / ${_qs.length} &nbsp;⭐ ${_sc}</div>
        </div>
        <div class="quiz-question"${qStyle}>${qText}</div>
        <div class="quiz-options" id="qopts">${opts}</div>
      </div>
      <button class="btn btn-outline quiz-back-btn" data-action="home">${backLabel}</button>`;
    document.getElementById('qopts').addEventListener('click', _onOptClick);
    c.querySelector('[data-action="home"]').addEventListener('click', () => { _showSelect(document.getElementById('quiz-container')); });
  }

  function _onOptClick(e) {
    const btn = e.target.closest('[data-idx]');
    if (!btn) return;
    const opts = document.getElementById('qopts');
    if (!opts) return;
    opts.querySelectorAll('.quiz-option').forEach(b => { b.disabled = true; });
    const idx = parseInt(btn.dataset.idx);
    const correct = _correctIdx;
    opts.querySelectorAll('.quiz-option')[correct].classList.add('correct');
    if (idx !== correct) btn.classList.add('wrong');
    else _sc++;
    setTimeout(() => {
      _qi++;
      const c = document.getElementById('quiz-container');
      if (_qi < _qs.length) _showQ(c); else _showResult(c);
    }, 1200);
  }

  function _showResult(c) {
    const _rLang = typeof LangManager !== 'undefined' ? LangManager.getLang() : 'en';
    const isJa = _rLang === 'ja';
    const isZhTw = _rLang === 'zh-tw';
    const pct = Math.round((_sc / _qs.length) * 100);
    const emoji = pct >= 90 ? '🏆' : pct >= 70 ? '⭐' : pct >= 50 ? '👍' : '📚';
    const msg = pct >= 90
      ? (isJa ? '훌륭해요！素晴らしい！' : isZhTw ? '훌륭해요！太棒了！' : '훌륭해요! Outstanding!')
      : pct >= 70
        ? (isJa ? '잘 했어요！よくできました！' : isZhTw ? '잘 했어요！做得好！' : '잘 했어요! Great work!')
        : pct >= 50
          ? (isJa ? '계속 연습하세요！頑張りましょう！' : isZhTw ? '계속 연습하세요！繼續努力！' : '계속 연습하세요! Keep going!')
          : (isJa ? '더 공부하세요！もっと勉強しましょう！' : isZhTw ? '더 공부하세요！繼續學習！' : '더 공부하세요! Keep studying!');
    const gradeLabel = isJa ? `Level ${_lv} クリア！` : isZhTw ? `第${_lv}關 完成！` : `Level ${_lv} Complete!`;
    const lvName = isJa ? `${LEVELS[_lv].name} · ${LEVELS[_lv].ja}` : isZhTw ? `${LEVELS[_lv].zh || LEVELS[_lv].name}` : LEVELS[_lv].name;
    const retryLabel = isJa ? 'もう一度' : isZhTw ? '再試一次' : 'Try Again';
    const nextLabel = isJa ? '次のレベル →' : isZhTw ? '下一關 →' : 'Next Level →';
    const homeLabel = isJa ? '全レベル' : isZhTw ? '全部關卡' : 'All Levels';
    const nextBtn = _lv < 10 ? `<button class="btn btn-primary" data-action="next">${nextLabel}</button>` : '';
    c.innerHTML = `
      <div class="quiz-result-wrap">
        <div class="quiz-result-emoji">${emoji}</div>
        <div class="quiz-result-grade">${gradeLabel}</div>
        <div class="quiz-result-name">${lvName} · ${LEVELS[_lv].kr}</div>
        <div class="quiz-result-score">${_sc} / ${_qs.length}</div>
        <div class="quiz-result-pct">${pct}% &nbsp;·&nbsp; ${msg}</div>
        <div class="quiz-result-actions">
          <button class="btn btn-outline" data-action="retry">${retryLabel}</button>
          ${nextBtn}
          <button class="btn btn-secondary" data-action="home">${homeLabel}</button>
        </div>
      </div>`;
    c.addEventListener('click', _onResultClick);
  }

  function _onResultClick(e) {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    const c = document.getElementById('quiz-container');
    c.removeEventListener('click', _onResultClick);
    const a = btn.dataset.action;
    if (a === 'retry') _start(_lv, c);
    else if (a === 'next') _start(_lv + 1, c);
    else _showSelect(c);
  }

  function _shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  return { init };
})();

/* ── DOMContentLoaded boot ───────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.dataset.page;
  if (page === 'quiz') QuizPage.init();
});
