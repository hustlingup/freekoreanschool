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
      speakKorean(char);
    });
  });
}

let _currentAudio = null;

function _googleTTS(text, speed) {
  if (_currentAudio) {
    _currentAudio.pause();
    _currentAudio.src = '';
    _currentAudio = null;
  }
  window.speechSynthesis && window.speechSynthesis.cancel();

  const params = new URLSearchParams({ text });
  if (speed && speed < 1) params.set('speed', speed);
  const audio = new Audio('/api/tts?' + params);
  _currentAudio = audio;

  // If the proxy isn't available (localhost, etc.), fall back to Web Speech API.
  audio.addEventListener('error', () => {
    if (_currentAudio !== audio) return;
    _currentAudio = null;
    _speakFallback(text, speed < 1 ? 0.7 : 0.9);
  }, { once: true });

  audio.play().catch(() => {});
}

function _speakFallback(text, rate) {
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
    window.speechSynthesis.speak(utt);
  };
  const voices = window.speechSynthesis.getVoices();
  if (voices.length) attempt(voices);
  else window.speechSynthesis.addEventListener('voiceschanged',
    () => attempt(window.speechSynthesis.getVoices()), { once: true });
}

function speakKorean(text) {
  if (!text) return;
  _googleTTS(text, 1);
}

function speakSyllable(text) {
  if (!text) return;
  _googleTTS(text, 0.7);
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

  async function play(text) {
    if (!text) return;
    const buf = _cache[text];
    if (!buf) { speakKorean(text); return; }
    try {
      const ctx = new AudioContext();
      const decoded = await ctx.decodeAudioData(buf.slice(0));
      const src = ctx.createBufferSource();
      src.buffer = decoded;
      src.connect(ctx.destination);
      src.start();
    } catch (_) { speakKorean(text); }
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
      <button onclick="speakKorean('${char}')" class="btn btn-primary btn-sm" style="margin-top: 16px;">
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
  { title: 'Korean School 한국어 학교', url: 'index.html', category: 'home', icon: '🏠', tags: ['home', 'korean', 'learn', 'start', 'welcome', 'free', 'language', 'hangul'], desc: 'Free Korean language learning — lessons, culture, travel, and news.' },

  // ── LEARN ──────────────────────────────────────────
  { title: 'Hangul Alphabet (한글)', url: 'learn/hangul.html', category: 'learn', icon: '📚', tags: ['hangul', 'alphabet', 'consonants', 'vowels', 'beginner', '한글', 'writing', 'korean letters', 'king sejong', '세종대왕', 'hall of worthies', '집현전', 'hangul day', '한글날'], desc: 'Learn the Korean alphabet created by King Sejong — consonants, vowels, and syllable blocks.' },
  { title: 'Basic Consonants (자음)', url: 'learn/hangul.html#consonants', category: 'learn', icon: '📚', tags: ['consonants', 'hangul', 'ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ', 'alphabet', 'beginner', '자음', '14 consonants', 'jaeum'], desc: 'The 14 basic Korean consonants with pronunciation and stroke order.' },
  { title: 'Basic Vowels (모음)', url: 'learn/hangul.html#vowels', category: 'learn', icon: '📚', tags: ['vowels', 'hangul', 'ㅏ', 'ㅓ', 'ㅗ', 'ㅜ', 'ㅡ', 'ㅣ', 'ㅑ', 'ㅕ', 'ㅛ', 'ㅠ', 'alphabet', 'beginner', '모음', '10 vowels', 'moeum', 'vowel mnemonic', 'shape'], desc: 'The 10 basic Korean vowels and vowel shape mnemonics.' },
  { title: 'Compound Vowels (복합 모음)', url: 'learn/hangul.html#compound', category: 'learn', icon: '📚', tags: ['compound vowels', 'diphthong', 'ㅐ', 'ㅔ', 'ㅒ', 'ㅖ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅢ', 'hangul', 'intermediate', '복합모음', '11 vowels'], desc: '11 compound vowels formed by combining basic vowels.' },
  { title: 'Aspirated & Tense Consonants', url: 'learn/hangul.html#aspirated', category: 'learn', icon: '📚', tags: ['aspirated', 'tense', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅊ', 'ㄲ', 'ㄸ', 'ㅃ', 'ㅆ', 'ㅉ', '거센소리', '된소리', 'double consonants', 'pronunciation', 'puff of air'], desc: 'Aspirated (거센소리) and tense (된소리) consonant pairs with minimal pair practice.' },
  { title: 'Double Consonants (쌍자음)', url: 'learn/hangul.html#tense', category: 'learn', icon: '📚', tags: ['double consonants', 'ssang', '쌍자음', 'ㄲ', 'ㄸ', 'ㅃ', 'ㅆ', 'ㅉ', 'tense sounds', 'ssang jaeum'], desc: 'The 5 double (tense) consonants — ㄲㄸㅃㅆㅉ — and how to pronounce them.' },
  { title: 'Syllable Structure & Blocks', url: 'learn/syllable-blocks.html', category: 'learn', icon: '🔡', tags: ['syllable', 'blocks', 'reading', 'writing', 'hangul structure', '음절', 'initial', 'medial', 'final', 'batchim', '받침', 'combine'], desc: 'How to combine consonants and vowels into Korean syllable blocks.' },
  { title: 'Pronunciation Guide (발음)', url: 'learn/pronunciation.html', category: 'learn', icon: '🎤', tags: ['pronunciation', 'sounds', 'phonetics', 'listening', 'speaking', '발음', 'linking', 'nasalization', 'liaison'], desc: 'Korean pronunciation rules — aspirated, tense, linking, and nasalization.' },
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

  // ── NEWS ──────────────────────────────────────────
  { title: 'Korean News (한국 뉴스)', url: 'news/index.html', category: 'news', icon: '📰', tags: ['news', '뉴스', 'korea news', 'current events', 'bilingual', 'reading', 'daily', '한국 뉴스', 'beginner news', 'intermediate', 'advanced', 'ai news', '8am kst', 'korea daily'], desc: 'AI-generated bilingual Korean news — learn Korean through daily current events.' },
  { title: 'News Vocabulary (핵심 어휘)', url: 'news/index.html', category: 'news', icon: '📖', tags: ['news vocabulary', '뉴스', '경제', 'economy', '정치', 'politics', '사회', 'society', '문화', 'culture', '스포츠', 'sports', '과학', 'science', '환경', 'environment', '교육', 'education', '국제', 'international', 'korean news words'], desc: 'Key news vocabulary — 뉴스, 경제, 정치, 사회, 문화, 과학, and more.' },
  { title: 'K-Pop & Music News', url: 'news/index.html', category: 'news', icon: '🎵', tags: ['kpop news', '케이팝 뉴스', 'music news', 'idol news', 'entertainment news', 'comeback', 'album release', 'concert', 'award', 'melon', 'gaon chart', 'billboard korea'], desc: 'Latest K-Pop and Korean music news in English and Korean.' },
  { title: 'Technology News (기술 뉴스)', url: 'news/index.html', category: 'news', icon: '💻', tags: ['technology', 'tech news', '기술', 'samsung', '삼성', 'lg', 'sk', 'hyundai', 'kakao', 'naver', 'startup', 'ai', 'semiconductor', '반도체', 'innovation', 'korean tech', 'korea tech news'], desc: 'Korean technology news — Samsung, AI, semiconductors, and Korean startups.' },
  { title: 'Food & Culture News', url: 'news/index.html', category: 'news', icon: '🍜', tags: ['food news', '음식 뉴스', 'cuisine news', 'restaurant trend', 'kimchi news', 'korean food global', 'michelin', 'culture news', 'drama news', 'film news', 'bong joon-ho', 'parasite'], desc: 'Korean food and culture news — culinary trends, global cuisine, and Korean arts.' },
  { title: 'Sports News (스포츠 뉴스)', url: 'news/index.html', category: 'news', icon: '⚽', tags: ['sports news', '스포츠 뉴스', 'soccer news', 'baseball news', 'son heung-min news', '손흥민', 'kbo', 'k-league', 'olympics', 'asian games', 'korea national team', 'taekwondo'], desc: 'Korean sports news — football, baseball, Son Heung-min, and Olympic coverage.' },
  { title: 'Society & Politics News', url: 'news/index.html', category: 'news', icon: '🏙️', tags: ['society news', 'politics news', '정치 뉴스', '사회 뉴스', 'economy news', '경제 뉴스', 'gdp', 'unemployment', 'election', '선거', 'government', '정부', 'korea society', 'education news', '교육 뉴스', 'fashion news', 'travel news'], desc: 'Korean society, politics, economy, and education news in bilingual format.' },
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
function initSearch() {
  const searchInput = document.getElementById('search-input');
  if (!searchInput) return;

  const isSubpage = /\/(learn|culture|travel|news)\//.test(window.location.pathname);
  const searchBase = isSubpage ? '../search.html' : 'search.html';

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

  searchInput.addEventListener('input', debounce((e) => {
    const q = e.target.value.toLowerCase().trim();
    if (!q) { hideDropdown(); return; }
    const results = searchIndex(q).slice(0, 6);
    showDropdown(results, searchInput, q, searchBase);
  }, 200));

  document.addEventListener('click', hideDropdown);
}

function searchIndex(q) {
  const words = q.toLowerCase().split(/\s+/).filter(Boolean);
  const titleMatches = [], otherMatches = [];
  window.SEARCH_INDEX.forEach(item => {
    const inTitle = words.some(w => item.title.toLowerCase().includes(w));
    const inTags  = words.some(w => item.tags.some(t => t.includes(w)));
    const inDesc  = words.some(w => item.desc.toLowerCase().includes(w));
    if (inTitle) titleMatches.push(item);
    else if (inTags || inDesc) otherMatches.push(item);
  });
  return [...titleMatches, ...otherMatches];
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
    `<a href="${escHtml(r.url)}" style="display:flex;align-items:center;gap:10px;padding:10px 16px;color:var(--text);text-decoration:none;font-size:0.875rem;border-bottom:1px solid var(--border);" onmouseover="this.style.background='var(--glass-md)'" onmouseout="this.style.background=''">
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

/* ── Lesson Progress Grid ───────────────────────────── */
const LessonProgressGrid = (() => {
  const LESSONS = [
    { id: 'hangul-basics',    url: 'hangul.html',          name: 'Hangul Alphabet',  level: 'starter',      k: '가' },
    { id: 'syllable-blocks',  url: 'syllable-blocks.html', name: 'Syllable Blocks',  level: 'starter',      k: '한' },
    { id: 'pronunciation',    url: 'pronunciation.html',   name: 'Pronunciation',    level: 'starter',      k: '음' },
    { id: 'vocabulary',       url: 'vocabulary.html',      name: 'Vocabulary',       level: 'beginner',     k: '어' },
    { id: 'pronouns',         url: 'pronouns.html',        name: 'Pronouns',         level: 'beginner',     k: '나' },
    { id: 'nouns',            url: 'nouns.html',           name: 'Common Nouns',     level: 'beginner',     k: '명' },
    { id: 'korean-grammar',   url: 'grammar.html',         name: 'Grammar',          level: 'intermediate', k: '문' },
    { id: 'speech-levels',    url: 'speech-levels.html',   name: 'Speech Levels',    level: 'intermediate', k: '경' },
    { id: 'emotions',         url: 'emotions.html',        name: 'Emotions',         level: 'intermediate', k: '감' },
    { id: 'shopping',         url: 'shopping.html',        name: 'Shopping',         level: 'intermediate', k: '쇼' },
    { id: 'korean-dialogues', url: 'dialogues.html',       name: 'Dialogues',        level: 'intermediate', k: '대' },
    { id: 'writing-essays',   url: 'writing-essays.html',  name: 'Writing Essays',   level: 'advanced',     k: '작' },
    { id: 'business-korean',  url: 'business-korean.html', name: 'Business Korean',  level: 'advanced',     k: '사' },
    { id: 'classical-korean', url: 'classical-korean.html',name: 'Classical Korean', level: 'advanced',     k: '고' },
  ];

  const STORAGE_KEY = 'ks-progress';

  function getProgress() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
    catch { return {}; }
  }

  function getCurrentId() {
    const filename = window.location.pathname.split(/[/\\]/).pop();
    const match = LESSONS.find(l => l.url === filename);
    return match ? match.id : null;
  }

  function render() {
    const container = document.getElementById('lesson-progress-grid');
    if (!container) return;

    const progress = getProgress();
    const currentId = getCurrentId();
    const completed = LESSONS.filter(l => progress[l.id]).length;
    const pct = Math.round((completed / LESSONS.length) * 100);

    const blocks = LESSONS.map((l, i) => {
      const done = !!progress[l.id];
      const active = l.id === currentId;
      const cls = `lpg-block${done ? ' lpg-done' : ''}${active ? ' lpg-active' : ''}`;
      const check = done ? '<span class="lpg-check">✓</span>' : '';
      return `<a href="${l.url}" class="${cls}" data-level="${l.level}" title="${l.name}" aria-label="${l.name}">${i + 1}${check}</a>`;
    }).join('');

    container.innerHTML = `
      <div class="lpg-header">
        <div style="display:flex;align-items:center;gap:5px">
          <span class="lpg-title">Progress</span>
          <button class="lpg-reset-btn" onclick="ProgressTracker.reset()" aria-label="Reset progress" title="Reset all progress">↺</button>
        </div>
        <span class="lpg-count">${completed} / ${LESSONS.length}</span>
      </div>
      <div class="lpg-bar"><div class="lpg-bar-fill" style="width:${pct}%"></div></div>
      <div class="lpg-grid">${blocks}</div>`;
  }

  function init() { render(); }
  function refresh() { render(); }

  return { init, refresh };
})();

/* ── Progress Tracker ───────────────────────────────── */
const ProgressTracker = (() => {
  const STORAGE_KEY = 'ks-progress';

  function getProgress() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch { return {}; }
  }

  function markComplete(lessonId) {
    const prog = getProgress();
    prog[lessonId] = { completed: true, timestamp: Date.now() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prog));
    LessonProgressGrid.refresh();
  }

  function init() {
    LessonProgressGrid.refresh();

    document.querySelectorAll('[data-lesson-complete]').forEach(btn => {
      btn.addEventListener('click', () => {
        const lessonId = btn.dataset.lessonComplete;
        markComplete(lessonId);
        btn.textContent = '✓ Completed!';
        btn.disabled = true;
        btn.style.opacity = '0.7';
      });
    });
  }

  function reset() {
    localStorage.removeItem(STORAGE_KEY);
    LessonProgressGrid.refresh();
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

/* ── News Feed Simulation ───────────────────────────── */
function initNewsTicker() {
  const ticker = document.getElementById('news-ticker');
  if (!ticker) return;

  const items = [
    '🇰🇷 BTS announces world tour — learn tour city names in Korean!',
    '🍜 Korean cuisine ranked #3 globally — explore food vocabulary',
    '🎬 New K-Drama "별빛 속으로" premieres — perfect for learners',
    '🏔️ Jeju Island voted best Asian destination — plan your trip!',
    '📱 Korean tech giant launches AI language model with Korean support',
  ];

  let i = 0;
  ticker.textContent = items[0];

  setInterval(() => {
    ticker.style.opacity = '0';
    setTimeout(() => {
      i = (i + 1) % items.length;
      ticker.textContent = items[i];
      ticker.style.opacity = '1';
    }, 400);
  }, 4000);
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
    .filter(Boolean);
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

/* ── Init All ───────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  FlashcardManager.cacheAllVocab(); // must run before LangManager.init() translates DOM text
  ThemeManager.init();
  window.LangManager?.init();

  document.getElementById('theme-toggle')?.addEventListener('click', ThemeManager.toggle);
  document.getElementById('lang-toggle')?.addEventListener('click', () => {
    const btn = document.getElementById('lang-toggle');
    const jaUrl = btn?.dataset?.jaUrl;
    if (jaUrl) { window.location.href = jaUrl; return; }
    if (window.LangManager) {
      const cur = window.LangManager.getLang();
      window.LangManager.setLang(cur === 'ja' ? 'en' : 'ja');
    }
  });

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
  initNewsTicker();
  initVocabBookmarks();
  initFlashcardPage();
  initSidebarAccordions();
  initKrTransSpeakButtons();
  highlightActiveNav();
  initSidebarScrollSpy();
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
    if (window.LangManager?.getLang() === 'ja' && rawKana) {
      backRomEl.textContent = rawKana;
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
  document.getElementById('fc-speak')?.addEventListener('click', () => {
    if (deck[index]) speakKorean(deck[index].korean);
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

  if (window.LangManager?.getLang() === 'ja') {
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
    btn.addEventListener('click', () => speakKorean(text));
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
    learn:   { label: 'Learn',   icon: '📚', badgeClass: 'tag-beginner' },
    culture: { label: 'Culture', icon: '🎵', badgeClass: 'tag-kpop'    },
    travel:  { label: 'Travel',  icon: '🗺️', badgeClass: 'tag-travel'  },
    news:    { label: 'News',    icon: '📰', badgeClass: 'tag-news'    },
    home:    { label: 'Home',    icon: '🏠', badgeClass: 'tag-news'    },
  };
  const ORDER = ['learn', 'culture', 'travel', 'news', 'home'];

  function getQuery() {
    return decodeURIComponent((new URLSearchParams(window.location.search).get('q') || '').trim());
  }

  function render(q) {
    const meta  = document.getElementById('search-results-meta');
    const container = document.getElementById('search-results-container');
    if (!container) return;

    if (!q) {
      meta.textContent = 'Enter a search term above.';
      container.innerHTML = '';
      return;
    }

    const results = searchIndex(q);
    const grouped = {};
    results.forEach(r => { (grouped[r.category] = grouped[r.category] || []).push(r); });

    meta.textContent = results.length
      ? `${results.length} result${results.length !== 1 ? 's' : ''} for "${q}"`
      : '';

    if (!results.length) {
      container.innerHTML = `<div class="search-no-results"><div style="font-size:2.5rem;margin-bottom:16px">🔍</div><div style="font-size:1.1rem;font-weight:700;margin-bottom:8px">No results for "${escHtml(q)}"</div><div style="font-size:0.875rem;color:var(--text-muted)">Try different keywords — e.g. "hangul", "kimchi", "seoul"</div></div>`;
      return;
    }

    container.innerHTML = ORDER.filter(cat => grouped[cat]).map(cat => {
      const { label, icon, badgeClass } = CAT_META[cat];
      const items = grouped[cat].map(r =>
        `<a href="${escHtml(r.url)}" class="search-result-item">
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
  }

  return { init };
})();

/* ── Expose globals ─────────────────────────────────── */
window.speakKorean = speakKorean;
window.speakSyllable = speakSyllable;
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

/* ══════════════════════════════════════════════════════════
   NEWS SECTION — NewsAPI · NewsPage · ArticlePage · AdminPage
   ══════════════════════════════════════════════════════════
   Fill in your Supabase project URL and anon key below after
   completing the one-time setup described in supabase/migrations/001_init.sql
   ══════════════════════════════════════════════════════════ */
const SUPABASE_URL = (typeof window !== 'undefined' && window.SUPABASE_URL) || '';
const SUPABASE_ANON_KEY = (typeof window !== 'undefined' && window.SUPABASE_ANON_KEY) || '';

/* ── Helpers ─────────────────────────────────────────── */
function newsFormatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function newsEscape(str) {
  if (!str) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function newsParagraphs(text) {
  if (!text) return '';
  return text.split(/\n\n+/).map(p => `<p>${newsEscape(p.trim())}</p>`).join('');
}

function newsTopicColor(slug) {
  const map = { kpop:'tag-kpop', tech:'tag-tech', food:'tag-food', sports:'tag-sports', culture:'tag-culture', society:'tag-society', education:'tag-education', fashion:'tag-fashion', travel:'tag-travel', economy:'tag-economy', politics:'tag-politics' };
  return map[slug] || 'tag-news';
}

function newsLevelClass(level) {
  return { beginner:'tag-beginner', intermediate:'tag-intermediate', advanced:'tag-advanced' }[level] || 'tag-beginner';
}

function newsTopicIcon(slug) {
  const icons = { kpop:'🎵', tech:'💻', food:'🍜', sports:'⚽', culture:'🎬', society:'🏙️', education:'📚', fashion:'👗', travel:'✈️', economy:'📈', politics:'🏛️' };
  return icons[slug] || '📰';
}

function newsThumbHTML(article, size) {
  if (article.thumbnail_url) {
    return `<img src="${newsEscape(article.thumbnail_url)}" alt="${newsEscape(article.thumbnail_alt || article.title_en)}" loading="lazy" />`;
  }
  const icon = article.topics ? newsTopicIcon(article.topics.slug) : '📰';
  return `<span style="font-size:${size || '3rem'};position:relative;z-index:1;">${icon}</span>`;
}

function newsArticleURL(slug) {
  return `article.html?slug=${encodeURIComponent(slug)}`;
}

function newsRenderCard(article) {
  const lang = window.LangManager?.getLang() || 'en';
  const topic = article.topics || {};
  const tagClass = newsTopicColor(topic.slug);
  const levelClass = newsLevelClass(article.level);
  const date = newsFormatDate(article.published_at);
  const aiTag = article.ai_generated ? '<span class="ai-badge">AI</span>' : '';
  const summary = (lang === 'ja' && article.summary_ja) ? article.summary_ja : (article.summary_en || '');
  const readMin = lang === 'ja' ? (article.reading_time_ja || 4) : (article.reading_time_en || 3);
  const readLabel = lang === 'ja' ? 'JA' : 'EN';
  const primaryTitle = lang === 'ja' ? (article.title_ja || article.title_en) : article.title_en;
  const topicName = lang === 'ja' ? (topic.name_ja || topic.name_en || 'ニュース') : (topic.name_en || 'News');
  const readLink = lang === 'ja' ? '読む →' : 'Read →';
  return `
    <a class="article-card" href="${newsArticleURL(article.slug)}" style="text-decoration:none;color:inherit;">
      <div class="article-thumb" style="background:var(--bg-2);height:180px;aspect-ratio:unset;position:relative;">
        ${newsThumbHTML(article, '3rem')}
      </div>
      <div class="article-body">
        <div class="article-tags">
          <span class="tag ${tagClass}">${newsEscape(topicName)}</span>
          <span class="tag ${levelClass}">${newsEscape(article.level || 'Beginner')}</span>
          ${aiTag}
        </div>
        <h3 class="article-title">${newsEscape(primaryTitle)}</h3>
        <p style="font-size:0.78rem;color:var(--text-muted);font-family:var(--font-korean);margin:4px 0 8px;line-height:1.4;">${newsEscape(article.title_ko)}</p>
        <p class="article-excerpt" style="font-size:0.82rem;color:var(--text-secondary);line-height:1.6;">
          ${newsEscape(summary)}
        </p>
        <div class="article-footer" style="display:flex;align-items:center;justify-content:space-between;margin-top:auto;padding-top:12px;border-top:1px solid var(--border);font-size:0.75rem;color:var(--text-muted);">
          <span>⏱ ${readMin} min ${readLabel} · ${date}</span>
          <span style="color:var(--primary-light);font-weight:700;">${readLink}</span>
        </div>
      </div>
    </a>`;
}

/* ── NewsAPI module ──────────────────────────────────── */
const NewsAPI = (() => {
  let client = null;

  function init() {
    if (typeof supabase === 'undefined' || SUPABASE_URL.includes('YOUR_PROJECT')) return;
    client = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }

  function ready() { return client !== null; }

  async function getArticles({ topicSlug, level, offset = 0, limit = 9 } = {}) {
    if (!ready()) return { data: [], count: 0 };
    let q = client.from('articles')
      .select('*, topics(name_en, name_ko, name_ja, slug, icon, color)', { count: 'exact' })
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .range(offset, offset + limit - 1);
    if (topicSlug && topicSlug !== 'all') {
      const { data: topic } = await client.from('topics').select('id').eq('slug', topicSlug).single();
      if (topic) q = q.eq('topic_id', topic.id);
    }
    if (level && level !== 'all') q = q.eq('level', level);
    const { data, count, error } = await q;
    if (error) { console.error('NewsAPI.getArticles', error); return { data: [], count: 0 }; }
    return { data: data || [], count: count || 0 };
  }

  async function getArticle(slug) {
    if (!ready()) return null;
    const { data, error } = await client.from('articles')
      .select('*, topics(name_en, name_ko, slug, icon, color)')
      .eq('slug', slug).eq('status', 'published').single();
    if (error) { console.error('NewsAPI.getArticle', error); return null; }
    return data;
  }

  async function getWeeklyTop(limit = 5) {
    if (!ready()) return [];
    const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const { data, error } = await client.from('articles')
      .select('id, slug, title_ko, title_en, title_ja, thumbnail_url, thumbnail_alt, view_count, topics(slug)')
      .eq('status', 'published')
      .gte('published_at', since)
      .order('view_count', { ascending: false })
      .limit(limit);
    if (error) return [];
    return data || [];
  }

  async function getTodaySummary() {
    if (!ready()) return null;
    const today = new Date().toISOString().slice(0, 10);
    const { data } = await client.from('daily_summaries').select('*').eq('date', today).maybeSingle();
    return data;
  }

  async function incrementView(id) {
    if (!ready()) return;
    await client.rpc('increment_view', { article_id: id });
  }

  async function getAdjacentArticles(publishedAt) {
    if (!ready()) return { prev: null, next: null };
    const [prevRes, nextRes] = await Promise.all([
      client.from('articles').select('slug, title_ko, title_en, title_ja').eq('status', 'published').lt('published_at', publishedAt).order('published_at', { ascending: false }).limit(1),
      client.from('articles').select('slug, title_ko, title_en, title_ja').eq('status', 'published').gt('published_at', publishedAt).order('published_at', { ascending: true }).limit(1),
    ]);
    return { prev: prevRes.data?.[0] || null, next: nextRes.data?.[0] || null };
  }

  async function getRelated(topicId, excludeId, limit = 3) {
    if (!ready()) return [];
    const { data } = await client.from('articles')
      .select('*, topics(name_en, slug)')
      .eq('status', 'published').eq('topic_id', topicId).neq('id', excludeId)
      .order('published_at', { ascending: false }).limit(limit);
    return data || [];
  }

  return { init, ready, getArticles, getArticle, getWeeklyTop, getTodaySummary, incrementView, getAdjacentArticles, getRelated };
})();

/* ── NewsPage module (news/index.html) ───────────────── */
const NewsPage = (() => {
  let currentTopic = 'all';
  let currentOffset = 0;
  const PAGE_SIZE = 11;
  let totalCount = 0;

  function init() {
    if (document.body.dataset.page !== 'news-index') return;
    NewsAPI.init();
    if (!NewsAPI.ready()) {
      showConfigWarning();
      return;
    }
    loadSummary();
    loadGrid(true);
    loadWeeklyTop();
    bindFilters();
  }

  function showConfigWarning() {
    const bar = document.getElementById('news-summary-bar');
    if (bar) bar.innerHTML = '<div class="news-summary-flag">⚙️</div><div class="news-summary-content"><div class="news-summary-eyebrow">SETUP REQUIRED</div><div class="news-summary-col-en" style="grid-column:1/-1;">Supabase is not configured yet. Fill in SUPABASE_URL and SUPABASE_ANON_KEY in js/app.js after completing the setup in supabase/migrations/001_init.sql.</div></div>';
    const hero = document.getElementById('news-hero-card');
    if (hero) hero.innerHTML = '<div class="news-hero-thumb"><span class="news-hero-thumb-emoji">⚙️</span></div><div class="news-hero-body"><div class="news-hero-tags"></div><p class="news-hero-title-ko">Supabase Setup Required</p><p class="news-hero-title-en">Configure Supabase to load live articles. See supabase/migrations/001_init.sql for setup instructions.</p></div>';
    const grid = document.getElementById('news-articles-grid');
    if (grid) grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:60px 0;color:var(--text-muted);"><div style="font-size:3rem;margin-bottom:16px;">📋</div><div style="font-size:1rem;font-weight:700;color:var(--text);margin-bottom:8px;">Database not connected</div><div>Follow the setup guide in supabase/migrations/001_init.sql then enter your project credentials in js/app.js</div></div>';
  }

  async function loadSummary() {
    const lang = window.LangManager?.getLang() || 'en';
    const summary = await NewsAPI.getTodaySummary();
    const dateEl = document.getElementById('news-summary-date');
    const enEl = document.getElementById('news-summary-en');
    const koEl = document.getElementById('news-summary-ko');
    if (!summary) {
      const bar = document.getElementById('news-summary-bar');
      if (bar) bar.style.display = 'none';
      return;
    }
    const d = new Date(summary.date);
    if (dateEl) dateEl.textContent = `TODAY'S KOREA · ${d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`;
    if (enEl) enEl.textContent = (lang === 'ja' && summary.summary_ja) ? summary.summary_ja : summary.summary_en;
    if (koEl) koEl.textContent = summary.summary_ko;
  }

  async function loadHero() {
    const { data } = await NewsAPI.getArticles({ limit: 11 });
    if (!data.length) return;
    const hero = data[Math.floor(Math.random() * data.length)];
    const el = document.getElementById('news-hero-card');
    if (!el) return;
    const topic = hero.topics || {};
    const tagClass = newsTopicColor(topic.slug);
    const levelClass = newsLevelClass(hero.level);
    const aiTag = hero.ai_generated ? '<span class="ai-badge">AI</span>' : '';
    const imgPanel = hero.thumbnail_url
      ? `<img src="${newsEscape(hero.thumbnail_url)}" alt="${newsEscape(hero.thumbnail_alt || hero.title_en)}" loading="eager" />`
      : `<div class="news-hero-cover-emoji">${newsTopicIcon(topic.slug)}</div>`;
    el.outerHTML = `
      <a class="news-hero-cover" href="${newsArticleURL(hero.slug)}">
        <div class="news-hero-cover-body">
          <div class="news-hero-cover-label">TODAY'S PICK 🎲</div>
          <div class="news-hero-cover-tags">
            <span class="tag ${tagClass}">${newsEscape(topic.name_en || 'News')}</span>
            <span class="tag ${levelClass}">${newsEscape(hero.level)}</span>
            ${aiTag}
          </div>
          <h2 class="news-hero-cover-title">${newsEscape(hero.title_ko)}</h2>
          <p class="news-hero-cover-en">${newsEscape(hero.title_en)}</p>
          <p class="news-hero-cover-summary">${newsEscape(hero.summary_en || '')}</p>
          <div class="news-hero-cover-meta">
            <span>⏱ ${hero.reading_time_en || 3} min EN · ${hero.reading_time_ko || 4} min KO</span>
            <span>📅 ${newsFormatDate(hero.published_at)}</span>
            <span>👁 ${hero.view_count || 0} views</span>
            <a href="${newsArticleURL(hero.slug)}" class="btn btn-sm btn-primary" style="margin-left:auto;">Read Article →</a>
          </div>
        </div>
        <div class="news-hero-cover-img">
          ${imgPanel}
          <div class="news-hero-cover-img-fade"></div>
        </div>
      </a>`;
  }

  async function loadGrid(reset) {
    if (reset) { currentOffset = 0; totalCount = 0; }
    const { data, count } = await NewsAPI.getArticles({ topicSlug: currentTopic, offset: currentOffset, limit: PAGE_SIZE });
    totalCount = count;
    currentOffset += data.length;
    const el = document.getElementById('news-articles-grid');
    if (el) {
      if (reset) el.innerHTML = '';
      el.innerHTML += data.map(newsRenderCard).join('');
      if (!data.length && reset) el.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:60px 0;color:var(--text-muted);">No articles found for this filter.</div>';
    }
    const btn = document.getElementById('news-load-more');
    const txt = document.getElementById('news-load-more-text');
    if (btn) {
      const isJa = (window.LangManager?.getLang() || 'en') === 'ja';
      const hasMore = currentOffset < totalCount;
      btn.disabled = !hasMore;
      if (txt) txt.textContent = hasMore ? (isJa ? 'もっと見る' : '더 보기 — Load More') : (isJa ? '全記事を読み込みました' : 'All articles loaded');
    }
  }

  async function loadWeeklyTop() {
    const articles = await NewsAPI.getWeeklyTop(5);
    const el = document.getElementById('news-weekly-strip');
    if (!el) return;
    if (!articles.length) { el.innerHTML = '<div style="color:var(--text-muted);padding:20px;">No articles this week yet.</div>'; return; }
    const lang = window.LangManager?.getLang() || 'en';
    el.innerHTML = articles.map((a, i) => {
      const weeklyTitle = lang === 'ja' ? (a.title_ja || a.title_en) : a.title_en;
      const rankLabel = lang === 'ja' ? `#${i + 1} 今週のランキング` : `#${i + 1} THIS WEEK`;
      return `
      <a class="news-weekly-item" href="${newsArticleURL(a.slug)}">
        <div class="news-weekly-thumb" style="position:relative;">
          ${newsThumbHTML(a, '2rem')}
        </div>
        <div class="news-weekly-body">
          <div class="news-weekly-rank">${rankLabel}</div>
          <div class="news-weekly-title">${newsEscape(weeklyTitle)}</div>
          <div style="font-size:0.72rem;color:var(--text-muted);font-family:var(--font-korean);margin-top:2px;">${newsEscape(a.title_ko)}</div>
        </div>
      </a>`;
    }).join('');
  }

  function bindFilters() {
    document.getElementById('news-topic-tabs')?.addEventListener('click', e => {
      const tab = e.target.closest('.news-tab[data-topic]');
      if (!tab) return;
      document.querySelectorAll('.news-tab[data-topic]').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentTopic = tab.dataset.topic;
      loadGrid(true);
    });
    document.getElementById('news-load-more')?.addEventListener('click', () => loadGrid(false));
  }

  return { init };
})();

/* ── BoardPage module (news/board.html) ──────────────── */
const BoardPage = (() => {
  let currentTopic = 'all';
  let currentOffset = 0;
  const PAGE_SIZE = 33;
  let totalCount = 0;

  const LEVEL_JA = { beginner: '初級', intermediate: '中級', advanced: '上級' };
  function levelToJa(level) { return LEVEL_JA[(level || '').toLowerCase()] || level || '初級'; }

  function updateHeaders() {
    const isJa = (window.LangManager?.getLang() || 'en') === 'ja';
    const set = (id, en, ja) => { const el = document.getElementById(id); if (el) el.textContent = isJa ? ja : en; };
    set('board-th-title',  'Title',  'タイトル');
    set('board-th-topic',  'Topic',  'トピック');
    set('board-th-level',  'Level',  'レベル');
    set('board-th-date',   'Date',   '日付');
    set('board-th-views',  'Views',  '閲覧数');
  }

  function init() {
    if (document.body.dataset.page !== 'news-board') return;
    NewsAPI.init();
    if (!NewsAPI.ready()) { showConfigWarning(); return; }
    updateHeaders();
    loadArticles(true);
    bindFilters();
  }

  function showConfigWarning() {
    const tbody = document.getElementById('board-tbody');
    if (tbody) tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:60px 24px;color:var(--text-muted);"><div style="font-size:2rem;margin-bottom:12px;">⚙️</div>Database not configured.</td></tr>';
  }

  async function loadArticles(reset) {
    if (reset) { currentOffset = 0; totalCount = 0; }
    const tbody = document.getElementById('board-tbody');
    if (!tbody) return;
    if (reset) tbody.innerHTML = '';

    const { data, count } = await NewsAPI.getArticles({ topicSlug: currentTopic, offset: currentOffset, limit: PAGE_SIZE });
    totalCount = count;
    currentOffset += data.length;

    if (!data.length && reset) {
      tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:60px 0;color:var(--text-muted);">No articles found for this filter.</td></tr>';
    } else {
      renderRows(tbody, data);
    }

    const btn = document.getElementById('board-load-more');
    const txt = document.getElementById('board-load-more-text');
    const isJa = (window.LangManager?.getLang() || 'en') === 'ja';
    if (btn) {
      const hasMore = currentOffset < totalCount;
      btn.disabled = !hasMore;
      if (txt) txt.textContent = hasMore ? (isJa ? 'もっと見る' : '더 보기 — Load More') : (isJa ? '全記事を読み込みました' : 'All articles loaded');
    }
    const countEl = document.getElementById('board-article-count');
    if (countEl && totalCount) countEl.textContent = isJa ? `全 ${totalCount.toLocaleString()} 記事` : `${totalCount.toLocaleString()} total articles`;
  }

  function renderRows(tbody, articles) {
    const lang = window.LangManager?.getLang() || 'en';
    const isJa = lang === 'ja';
    articles.forEach(a => {
      const topic = a.topics || {};
      const tr = document.createElement('tr');
      tr.style.cursor = 'pointer';
      tr.addEventListener('click', () => { window.location.href = newsArticleURL(a.slug); });
      const primaryTitle = isJa ? (a.title_ja || a.title_en) : a.title_en;
      const topicName = isJa ? (topic.name_ja || topic.name_en || '—') : (topic.name_en || '—');
      const levelText = isJa ? levelToJa(a.level) : (a.level || 'beginner');
      const readText = isJa ? '読む →' : 'Read →';
      tr.innerHTML = `
        <td style="max-width:340px;">
          <div style="font-weight:700;color:var(--text);font-size:0.85rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${newsEscape(primaryTitle)}</div>
          <div style="font-size:0.75rem;color:var(--text-muted);font-family:var(--font-korean);margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${newsEscape(a.title_ko)}</div>
        </td>
        <td><span class="tag ${newsTopicColor(topic.slug)}" style="font-size:0.68rem;">${newsEscape(topicName)}</span></td>
        <td><span class="tag ${newsLevelClass(a.level)}" style="font-size:0.68rem;">${newsEscape(levelText)}</span></td>
        <td style="white-space:nowrap;font-size:0.8rem;color:var(--text-muted);">${newsFormatDate(a.published_at)}</td>
        <td style="font-size:0.82rem;color:var(--text-muted);">${(a.view_count || 0).toLocaleString()}</td>
        <td><a href="${newsArticleURL(a.slug)}" style="color:var(--primary-light);font-weight:700;font-size:0.8rem;white-space:nowrap;text-decoration:none;" onclick="event.stopPropagation();">${readText}</a></td>`;
      tbody.appendChild(tr);
    });
  }

  function bindFilters() {
    document.getElementById('board-topic-tabs')?.addEventListener('click', e => {
      const tab = e.target.closest('.news-tab[data-topic]');
      if (!tab) return;
      document.querySelectorAll('#board-topic-tabs .news-tab[data-topic]').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentTopic = tab.dataset.topic;
      loadArticles(true);
    });
    document.getElementById('board-load-more')?.addEventListener('click', () => loadArticles(false));
  }

  return { init };
})();

/* ── ArticlePage module (news/article.html) ─────────── */
const ArticlePage = (() => {
  function init() {
    if (document.body.dataset.page !== 'news-article') return;
    NewsAPI.init();
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('slug');
    if (!slug) { showError('No article specified.'); return; }
    if (!NewsAPI.ready()) { showError('Database not configured. See js/app.js.'); return; }
    loadArticle(slug);
  }

  function showError(msg) {
    const root = document.getElementById('article-root');
    if (root) root.innerHTML = `<div style="padding:80px 24px;text-align:center;color:var(--text-muted);"><div style="font-size:3rem;margin-bottom:16px;">😕</div><div style="font-size:1.1rem;font-weight:700;color:var(--text);margin-bottom:8px);">Article not found</div><div>${newsEscape(msg)}</div><a href="index.html" class="btn btn-outline" style="margin-top:24px;">← Back to News</a></div>`;
  }

  async function loadArticle(slug) {
    const article = await NewsAPI.getArticle(slug);
    if (!article) { showError('Article not found or not published.'); return; }
    NewsAPI.incrementView(article.id);
    renderMeta(article);
    renderHeader(article);
    renderThumbnail(article);
    renderVocabulary(article);
    renderBody(article);
    renderImages(article);
    loadWeeklyStrip();
    loadRelated(article);
    loadNavigation(article);
  }

  function renderMeta(a) {
    const topic = a.topics || {};
    const pageTitle = `${a.seo_title || a.title_en} | Korean School`;
    document.getElementById('seo-title').textContent = pageTitle;
    const desc = a.seo_description || a.summary_en || '';
    setMeta('seo-desc', 'content', desc);
    setMeta('seo-keywords', 'content', a.seo_keywords || '');
    setMeta('og-title', 'content', a.title_en);
    setMeta('og-desc', 'content', desc);
    setMeta('og-img', 'content', a.thumbnail_url || '');
    setMeta('og-url', 'content', window.location.href);
    setMeta('tw-title', 'content', a.title_en);
    setMeta('tw-desc', 'content', desc);
    setMeta('tw-img', 'content', a.thumbnail_url || '');
    const canonical = document.getElementById('canonical');
    if (canonical) canonical.href = window.location.href;
    const jsonld = document.getElementById('json-ld');
    if (jsonld) jsonld.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      headline: a.title_en,
      description: desc,
      image: a.thumbnail_url || undefined,
      datePublished: a.published_at,
      dateModified: a.updated_at,
      inLanguage: ['en', 'ko'],
      url: window.location.href,
      author: { '@type': 'Organization', name: 'Korean School' },
      publisher: { '@type': 'Organization', name: 'Korean School' }
    });
    const crumb = document.getElementById('article-topic-crumb');
    if (crumb) crumb.textContent = topic.name_en || 'News';
  }

  function setMeta(id, attr, val) {
    const el = document.getElementById(id);
    if (el) el.setAttribute(attr, val);
  }

  function renderHeader(a) {
    const topic = a.topics || {};
    const tagClass = newsTopicColor(topic.slug);
    const levelClass = newsLevelClass(a.level);
    const aiTag = a.ai_generated ? '<span class="ai-badge">AI Generated</span>' : '';
    const tagsEl = document.getElementById('article-tags');
    if (tagsEl) tagsEl.innerHTML = `<span class="tag ${tagClass}">${newsEscape(topic.name_en || 'News')}</span><span class="tag ${levelClass}">${newsEscape(a.level)}</span>${aiTag}`;
    const lang = window.LangManager?.getLang() || 'en';
    const titleKo = document.getElementById('article-title-ko');
    if (titleKo) titleKo.textContent = a.title_ko;
    const titleEn = document.getElementById('article-title-en');
    if (titleEn) titleEn.textContent = (lang === 'ja' && a.title_ja) ? a.title_ja : a.title_en;
    const meta = document.getElementById('article-meta');
    if (meta) meta.innerHTML = `
      <span>📅 ${newsFormatDate(a.published_at)}</span>
      <span>⏱ ${lang === 'ja' ? `JA: ${a.reading_time_ja || 4}` : `EN: ${a.reading_time_en || 3}`} min</span>
      <span>⏱ KO: ${a.reading_time_ko || 4} min</span>
      <span>👁 ${a.view_count || 0} views</span>`;
  }

  function renderThumbnail(a) {
    const wrap = document.getElementById('article-thumb');
    if (!wrap) return;
    if (a.thumbnail_url) {
      wrap.innerHTML = `<img src="${newsEscape(a.thumbnail_url)}" alt="${newsEscape(a.thumbnail_alt || a.title_en)}" />`;
    } else {
      const topic = a.topics || {};
      wrap.innerHTML = `<span style="font-size:6rem;">${newsTopicIcon(topic.slug)}</span>`;
    }
    const row = document.getElementById('article-thumb-caption-row');
    if (row && (a.thumbnail_alt || a.thumbnail_source)) {
      row.style.display = 'flex';
      const cap = document.getElementById('article-thumb-caption');
      if (cap) cap.textContent = a.thumbnail_alt || '';
      const src = document.getElementById('article-thumb-source');
      if (src && a.thumbnail_source) src.textContent = `Source: ${a.thumbnail_source}`;
    }
  }

  function renderVocabulary(a) {
    let vocab = a.vocabulary;
    if (typeof vocab === 'string') { try { vocab = JSON.parse(vocab); } catch (_) { vocab = []; } }
    if (!Array.isArray(vocab)) vocab = [];
    const section = document.getElementById('article-vocabulary-section');
    if (!section || !vocab.length) return;
    const lang = window.LangManager?.getLang() || 'en';
    const isJa = lang === 'ja';
    const title = isJa ? 'キーボキャブラリー · 주요 단어' : 'Key Vocabulary · 주요 단어';
    const sub = isJa ? 'この記事の単語' : 'Words from this article';
    section.innerHTML = `
      <div class="news-vocab-block">
        <div class="news-vocab-block-header">
          <span class="news-vocab-block-icon">📖</span>
          <h3 class="news-vocab-block-title">${title}</h3>
          <span class="news-vocab-block-sub">${sub}</span>
        </div>
        <div class="vocab-grid">
          ${vocab.map(v => `
            <div class="vocab-card">
              <div class="vocab-word">${newsEscape(v.word || '')}</div>
              <div class="vocab-reading">${newsEscape(isJa ? (v.reading_ja || v.reading || '') : (v.reading || ''))}</div>
              <div class="vocab-pos">${newsEscape(v.part_of_speech || '')}</div>
              <div class="vocab-definition">${newsEscape(isJa ? (v.definition_ja || v.definition_en || '') : (v.definition_en || ''))}</div>
              <div class="vocab-examples">
                <div class="vocab-ex-ko">${newsEscape(v.example_ko || '')}</div>
                <div class="vocab-ex-en">${newsEscape(isJa ? (v.example_ja || v.example_en || '') : (v.example_en || ''))}</div>
              </div>
            </div>`).join('')}
        </div>
      </div>`;
    section.style.display = 'block';
  }

  function renderBody(a) {
    const lang = window.LangManager?.getLang() || 'en';
    const enEl = document.getElementById('article-col-en');
    const koEl = document.getElementById('article-col-ko');
    if (enEl) {
      if (lang === 'ja' && a.content_ja) {
        enEl.innerHTML = newsParagraphs(a.content_ja);
        enEl.style.fontFamily = 'var(--font-korean)';
      } else {
        enEl.innerHTML = newsParagraphs(a.content_en);
      }
    }
    if (koEl) koEl.innerHTML = newsParagraphs(a.content_ko);

    if (a.main_image_url) {
      const body = document.getElementById('article-body');
      const imgDiv = document.createElement('div');
      imgDiv.className = 'article-main-image-wrap';
      imgDiv.innerHTML = `<img src="${newsEscape(a.main_image_url)}" alt="${newsEscape(a.main_image_alt || '')}" />`;
      body.insertAdjacentElement('afterend', imgDiv);
      if (a.main_image_alt || a.main_image_source) {
        const cap = document.createElement('div');
        cap.className = 'image-caption-row';
        cap.innerHTML = `<span class="image-caption">${newsEscape(a.main_image_alt || '')}</span>${a.main_image_source ? `<span class="image-source">Source: ${newsEscape(a.main_image_source)}</span>` : ''}`;
        imgDiv.insertAdjacentElement('afterend', cap);
      }
    }
  }

  function renderImages(a) {
    const images = Array.isArray(a.images) ? a.images : [];
    if (!images.length) return;
    const section = document.getElementById('article-images-section');
    if (!section) return;
    const grid = document.createElement('div');
    grid.className = 'article-images-grid';
    grid.style.cssText = 'margin-top:16px;margin-bottom:16px;';
    images.forEach(img => {
      const item = document.createElement('div');
      item.className = 'article-image-item';
      item.innerHTML = `
        <img src="${newsEscape(img.url)}" alt="${newsEscape(img.alt || '')}" loading="lazy" />
        ${img.alt || img.source ? `<div class="image-caption-row" style="margin-top:4px;"><span class="image-caption">${newsEscape(img.alt || '')}</span>${img.source ? `<span class="image-source">Source: ${newsEscape(img.source)}</span>` : ''}</div>` : ''}`;
      grid.appendChild(item);
    });
    section.appendChild(grid);
  }

  async function loadWeeklyStrip() {
    const articles = await NewsAPI.getWeeklyTop(5);
    const el = document.getElementById('article-weekly-strip');
    if (!el) return;
    if (!articles.length) { document.getElementById('article-weekly-section').style.display = 'none'; return; }
    const lang = window.LangManager?.getLang() || 'en';
    el.innerHTML = articles.map((a, i) => {
      const weeklyTitle = lang === 'ja' ? (a.title_ja || a.title_en) : a.title_en;
      const rankLabel = lang === 'ja' ? `#${i + 1} 今週のランキング` : `#${i + 1} THIS WEEK`;
      return `
      <a class="news-weekly-item" href="${newsArticleURL(a.slug)}">
        <div class="news-weekly-thumb" style="position:relative;">${newsThumbHTML(a, '2rem')}</div>
        <div class="news-weekly-body">
          <div class="news-weekly-rank">${rankLabel}</div>
          <div class="news-weekly-title">${newsEscape(weeklyTitle)}</div>
          <div style="font-size:0.72rem;color:var(--text-muted);font-family:var(--font-korean);margin-top:2px;">${newsEscape(a.title_ko)}</div>
        </div>
      </a>`;
    }).join('');
  }

  async function loadRelated(article) {
    if (!article.topic_id) return;
    const articles = await NewsAPI.getRelated(article.topic_id, article.id, 3);
    if (!articles.length) return;
    const section = document.getElementById('article-related');
    const grid = document.getElementById('article-related-grid');
    if (section) section.style.display = 'block';
    if (grid) grid.innerHTML = articles.map(newsRenderCard).join('');
  }

  async function loadNavigation(article) {
    const { prev, next } = await NewsAPI.getAdjacentArticles(article.published_at);
    const nav = document.getElementById('article-nav');
    if (!nav) return;
    const lang = window.LangManager?.getLang() || 'en';
    const navTitle = (a) => lang === 'ja' ? (a.title_ja || a.title_en) : a.title_en;
    let hasItems = false;
    if (prev) {
      const el = document.getElementById('article-prev');
      const title = document.getElementById('article-prev-title');
      if (el) { el.href = newsArticleURL(prev.slug); hasItems = true; }
      if (title) title.textContent = navTitle(prev);
    } else {
      const el = document.getElementById('article-prev');
      if (el) el.style.display = 'none';
    }
    if (next) {
      const el = document.getElementById('article-next');
      const title = document.getElementById('article-next-title');
      if (el) { el.href = newsArticleURL(next.slug); hasItems = true; }
      if (title) title.textContent = navTitle(next);
    } else {
      const el = document.getElementById('article-next');
      if (el) el.style.display = 'none';
    }
    if (hasItems && nav) nav.style.display = 'flex';
  }

  return { init };
})();

/* ── AdminPage module (news/admin.html) ─────────────── */
const AdminPage = (() => {
  let supaClient = null;
  let editingId = null;
  let topics = [];
  let adminOffset = 0;
  const ADMIN_PAGE = 20;
  let extraImageCount = 0;

  function init() {
    if (document.body.dataset.page !== 'news-admin') return;
    if (typeof supabase === 'undefined' || SUPABASE_URL.includes('YOUR_PROJECT')) {
      showAdminConfigError(); return;
    }
    supaClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    checkAuth();
  }

  function showAdminConfigError() {
    const gate = document.getElementById('admin-gate');
    if (gate) gate.innerHTML = '<div class="admin-login-card"><div class="section-eyebrow" style="margin-bottom:12px;">⚙️ SETUP REQUIRED</div><div class="admin-login-title">Configure Supabase</div><div class="admin-login-sub">Enter your SUPABASE_URL and SUPABASE_ANON_KEY in js/app.js before using the admin panel.</div></div>';
  }

  async function checkAuth() {
    const { data: { session } } = await supaClient.auth.getSession();
    if (session) showPanel(session.user);
    else showGate();
  }

  function showGate() {
    document.getElementById('admin-gate').style.display = 'flex';
    document.getElementById('admin-panel').classList.remove('visible');
    document.getElementById('admin-signout-btn').style.display = 'none';
    bindLogin();
  }

  function showPanel(user) {
    document.getElementById('admin-gate').style.display = 'none';
    document.getElementById('admin-panel').classList.add('visible');
    document.getElementById('admin-signout-btn').style.display = '';
    const emailEl = document.getElementById('admin-user-email');
    if (emailEl) emailEl.textContent = user.email;
    bindPanel();
    loadTopics().then(() => { loadStats(); loadArticlesTable(); });
  }

  function bindLogin() {
    const btn = document.getElementById('admin-login-btn');
    if (!btn) return;
    btn.addEventListener('click', async () => {
      const email = document.getElementById('admin-email').value.trim();
      const pass = document.getElementById('admin-password').value;
      const err = document.getElementById('admin-login-error');
      btn.textContent = 'Signing in…'; btn.disabled = true;
      const { data, error } = await supaClient.auth.signInWithPassword({ email, password: pass });
      btn.textContent = 'Sign In →'; btn.disabled = false;
      if (error) { err.textContent = error.message; return; }
      showPanel(data.user);
    });
    document.getElementById('admin-password')?.addEventListener('keydown', e => { if (e.key === 'Enter') document.getElementById('admin-login-btn').click(); });
    document.getElementById('admin-signout-btn')?.addEventListener('click', async () => { await supaClient.auth.signOut(); showGate(); });
  }

  function bindPanel() {
    document.querySelectorAll('.admin-tab[data-admin-tab]').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.admin-tab[data-admin-tab]').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.admin-tab-panel').forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById(`admin-tab-${tab.dataset.adminTab}`)?.classList.add('active');
        if (tab.dataset.adminTab === 'summaries') loadSummariesTable();
        if (tab.dataset.adminTab === 'topics') loadTopicsTable();
      });
    });
    document.getElementById('admin-signout-btn')?.addEventListener('click', async () => { await supaClient.auth.signOut(); showGate(); });
    document.getElementById('admin-create-btn')?.addEventListener('click', openCreateForm);
    document.getElementById('admin-form-cancel-btn')?.addEventListener('click', cancelForm);
    document.getElementById('admin-form-cancel-btn-2')?.addEventListener('click', cancelForm);
    document.getElementById('admin-article-form')?.addEventListener('submit', saveArticle);
    document.getElementById('articles-status-filter')?.addEventListener('change', () => { adminOffset = 0; loadArticlesTable(); });
    document.getElementById('articles-topic-filter')?.addEventListener('change', () => { adminOffset = 0; loadArticlesTable(); });
    document.getElementById('admin-load-more-btn')?.addEventListener('click', () => loadArticlesTable(true));
    document.getElementById('admin-add-image-btn')?.addEventListener('click', addExtraImageRow);
    document.getElementById('admin-add-topic-btn')?.addEventListener('click', addTopicRow);
    document.getElementById('form-seo-desc')?.addEventListener('input', function() {
      const counter = document.getElementById('seo-desc-counter');
      if (counter) {
        const len = this.value.length;
        counter.textContent = `${len}/155`;
        counter.classList.toggle('over', len > 155);
      }
    });
    bindImagePreview('form-thumb-file', 'thumb-preview', 'thumb-upload-status');
    bindImagePreview('form-main-img-file', 'main-img-preview', 'main-img-upload-status');
  }

  function bindImagePreview(inputId, previewId, statusId) {
    document.getElementById(inputId)?.addEventListener('change', function() {
      const file = this.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = e => {
        const prev = document.getElementById(previewId);
        if (prev) prev.innerHTML = `<img src="${e.target.result}" alt="Preview" style="width:100%;height:100%;object-fit:cover;" />`;
      };
      reader.readAsDataURL(file);
    });
  }

  async function loadTopics() {
    const { data } = await supaClient.from('topics').select('*').order('name_en');
    topics = data || [];
    const selects = document.querySelectorAll('#form-topic, #articles-topic-filter');
    selects.forEach(sel => {
      const current = sel.value;
      if (sel.id === 'articles-topic-filter') {
        sel.innerHTML = '<option value="all">All Topics</option>';
      } else {
        sel.innerHTML = '<option value="">Select topic…</option>';
      }
      topics.forEach(t => {
        const opt = document.createElement('option');
        opt.value = t.id; opt.textContent = `${t.icon} ${t.name_en}`;
        sel.appendChild(opt);
      });
      if (current) sel.value = current;
    });
  }

  async function loadStats() {
    const [totalRes, todayRes, aiRes] = await Promise.all([
      supaClient.from('articles').select('id', { count: 'exact', head: true }),
      supaClient.from('articles').select('id', { count: 'exact', head: true }).gte('published_at', new Date().toISOString().slice(0, 10)),
      supaClient.from('articles').select('id', { count: 'exact', head: true }).eq('ai_generated', true),
    ]);
    const viewsRes = await supaClient.from('articles').select('view_count');
    const totalViews = (viewsRes.data || []).reduce((s, a) => s + (a.view_count || 0), 0);
    document.getElementById('stat-total').textContent = totalRes.count ?? '—';
    document.getElementById('stat-today').textContent = todayRes.count ?? '—';
    document.getElementById('stat-ai').textContent = aiRes.count ?? '—';
    document.getElementById('stat-views').textContent = totalViews.toLocaleString();
  }

  async function loadArticlesTable(append = false) {
    if (!append) adminOffset = 0;
    const statusFilter = document.getElementById('articles-status-filter')?.value || 'all';
    const topicFilter = document.getElementById('articles-topic-filter')?.value || 'all';
    let q = supaClient.from('articles')
      .select('id, title_en, title_ko, level, published_at, view_count, status, ai_generated, topic_id, topics(name_en, slug)')
      .order('published_at', { ascending: false })
      .range(adminOffset, adminOffset + ADMIN_PAGE - 1);
    if (statusFilter !== 'all') q = q.eq('status', statusFilter);
    if (topicFilter !== 'all') q = q.eq('topic_id', topicFilter);
    const { data } = await q;
    adminOffset += (data || []).length;
    const tbody = document.getElementById('admin-articles-tbody');
    if (!tbody) return;
    if (!append) tbody.innerHTML = '';
    if (!data?.length && !append) { tbody.innerHTML = '<tr><td colspan="8" style="text-align:center;padding:32px;color:var(--text-muted);">No articles found.</td></tr>'; return; }
    (data || []).forEach(a => {
      const tr = document.createElement('tr');
      const topic = a.topics || {};
      tr.innerHTML = `
        <td style="max-width:260px;"><div style="font-weight:600;color:var(--text);font-size:0.83rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${newsEscape(a.title_en)}</div><div style="font-size:0.72rem;color:var(--text-muted);font-family:var(--font-korean);">${newsEscape(a.title_ko)}</div></td>
        <td><span class="tag ${newsTopicColor(topic.slug)}" style="font-size:0.68rem;">${newsEscape(topic.name_en || '—')}</span></td>
        <td><span class="tag ${newsLevelClass(a.level)}" style="font-size:0.68rem;">${newsEscape(a.level)}</span></td>
        <td style="white-space:nowrap;font-size:0.8rem;">${newsFormatDate(a.published_at)}</td>
        <td style="font-size:0.82rem;">${a.view_count || 0}</td>
        <td><span class="tag" style="font-size:0.68rem;background:${a.status === 'published' ? 'rgba(34,197,94,0.12)' : a.status === 'draft' ? 'rgba(245,158,11,0.12)' : 'rgba(100,116,139,0.12)'};color:${a.status === 'published' ? '#4ade80' : a.status === 'draft' ? '#fbbf24' : '#94a3b8'};">${a.status}</span></td>
        <td style="font-size:0.72rem;color:var(--text-muted);">${a.ai_generated ? '<span class="ai-badge">AI</span>' : 'Manual'}</td>
        <td><div class="admin-table-actions"><button class="admin-action-btn admin-action-edit" data-edit="${a.id}">Edit</button><button class="admin-action-btn admin-action-delete" data-delete="${a.id}" data-title="${newsEscape(a.title_en)}">Delete</button></div></td>`;
      tbody.appendChild(tr);
    });
    tbody.querySelectorAll('[data-edit]').forEach(btn => btn.addEventListener('click', () => openEditForm(btn.dataset.edit)));
    tbody.querySelectorAll('[data-delete]').forEach(btn => btn.addEventListener('click', () => deleteArticle(btn.dataset.delete, btn.dataset.title)));
  }

  function openCreateForm() {
    editingId = null;
    document.getElementById('admin-form-heading').textContent = 'Create New Article';
    document.getElementById('admin-article-form').reset();
    document.getElementById('form-article-id').value = '';
    document.getElementById('thumb-preview').innerHTML = '🖼️';
    document.getElementById('main-img-preview').innerHTML = '🖼️';
    document.getElementById('admin-extra-images-list').innerHTML = '';
    extraImageCount = 0;
    switchToTab('create');
  }

  async function openEditForm(id) {
    const { data: a } = await supaClient.from('articles').select('*').eq('id', id).single();
    if (!a) return;
    editingId = id;
    document.getElementById('admin-form-heading').textContent = 'Edit Article';
    document.getElementById('form-article-id').value = a.id;
    document.getElementById('form-title-en').value = a.title_en || '';
    document.getElementById('form-title-ko').value = a.title_ko || '';
    document.getElementById('form-topic').value = a.topic_id || '';
    document.getElementById('form-level').value = a.level || 'beginner';
    document.getElementById('form-status').value = a.status || 'published';
    document.getElementById('form-summary-en').value = a.summary_en || '';
    document.getElementById('form-summary-ko').value = a.summary_ko || '';
    document.getElementById('form-content-en').value = a.content_en || '';
    document.getElementById('form-content-ko').value = a.content_ko || '';
    document.getElementById('form-thumb-url').value = a.thumbnail_url || '';
    document.getElementById('form-thumb-alt').value = a.thumbnail_alt || '';
    document.getElementById('form-thumb-source').value = a.thumbnail_source || '';
    document.getElementById('form-main-img-url').value = a.main_image_url || '';
    document.getElementById('form-main-img-alt').value = a.main_image_alt || '';
    document.getElementById('form-main-img-source').value = a.main_image_source || '';
    document.getElementById('form-seo-title').value = a.seo_title || '';
    document.getElementById('form-seo-desc').value = a.seo_description || '';
    document.getElementById('form-seo-keywords').value = a.seo_keywords || '';
    document.getElementById('form-read-en').value = a.reading_time_en || 3;
    document.getElementById('form-read-ko').value = a.reading_time_ko || 4;
    if (a.thumbnail_url) document.getElementById('thumb-preview').innerHTML = `<img src="${newsEscape(a.thumbnail_url)}" style="width:100%;height:100%;object-fit:cover;" alt="" />`;
    if (a.main_image_url) document.getElementById('main-img-preview').innerHTML = `<img src="${newsEscape(a.main_image_url)}" style="width:100%;height:100%;object-fit:cover;" alt="" />`;
    document.getElementById('admin-extra-images-list').innerHTML = '';
    extraImageCount = 0;
    (Array.isArray(a.images) ? a.images : []).forEach(img => addExtraImageRow(img));
    switchToTab('create');
  }

  function cancelForm() { switchToTab('articles'); }

  function switchToTab(name) {
    document.querySelectorAll('.admin-tab[data-admin-tab]').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.admin-tab-panel').forEach(p => p.classList.remove('active'));
    document.querySelector(`[data-admin-tab="${name}"]`)?.classList.add('active');
    document.getElementById(`admin-tab-${name}`)?.classList.add('active');
  }

  function addExtraImageRow(existing) {
    const list = document.getElementById('admin-extra-images-list');
    if (!list) return;
    const idx = extraImageCount++;
    const row = document.createElement('div');
    row.className = 'admin-image-upload-row';
    row.style.cssText = 'border-top:1px solid var(--border);padding-top:12px;margin-top:4px;';
    row.innerHTML = `
      <div class="admin-image-preview" id="extra-prev-${idx}" style="display:flex;align-items:center;justify-content:center;font-size:1.5rem;">🖼️</div>
      <div class="admin-image-fields">
        <input class="admin-input" type="file" id="extra-file-${idx}" accept="image/*" aria-label="Upload image ${idx + 1}" />
        <input class="admin-input" type="text" id="extra-url-${idx}" placeholder="Or paste image URL" value="${newsEscape(existing?.url || '')}" />
        <input class="admin-input" type="text" id="extra-alt-${idx}" placeholder="Alt text" value="${newsEscape(existing?.alt || '')}" />
        <input class="admin-input" type="text" id="extra-src-${idx}" placeholder="Source" value="${newsEscape(existing?.source || '')}" />
        <button type="button" class="admin-remove-image-btn" style="align-self:flex-start;">✕ Remove</button>
      </div>`;
    row.querySelector('.admin-remove-image-btn').addEventListener('click', () => row.remove());
    if (existing?.url) row.querySelector(`#extra-prev-${idx}`).innerHTML = `<img src="${newsEscape(existing.url)}" style="width:100%;height:100%;object-fit:cover;" alt="" />`;
    row.querySelector(`#extra-file-${idx}`).addEventListener('change', function() {
      const file = this.files[0]; if (!file) return;
      const reader = new FileReader();
      reader.onload = e => { row.querySelector(`#extra-prev-${idx}`).innerHTML = `<img src="${e.target.result}" style="width:100%;height:100%;object-fit:cover;" alt="" />`; };
      reader.readAsDataURL(file);
    });
    list.appendChild(row);
  }

  async function uploadImage(file, bucket = 'news-images') {
    const ext = file.name.split('.').pop();
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supaClient.storage.from(bucket).upload(path, file, { upsert: false });
    if (error) throw error;
    const { data } = supaClient.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
  }

  async function resolveImageURL(fileInputId, urlInputId, statusId) {
    const fileInput = document.getElementById(fileInputId);
    const urlInput = document.getElementById(urlInputId);
    const statusEl = document.getElementById(statusId);
    if (fileInput?.files[0]) {
      try {
        if (statusEl) statusEl.textContent = 'Uploading…';
        const url = await uploadImage(fileInput.files[0]);
        if (statusEl) statusEl.textContent = 'Uploaded ✓';
        return url;
      } catch (err) {
        if (statusEl) statusEl.textContent = `Upload failed: ${err.message}`;
        return urlInput?.value.trim() || null;
      }
    }
    return urlInput?.value.trim() || null;
  }

  async function saveArticle(e) {
    e.preventDefault();
    const saveBtn = document.getElementById('admin-save-btn');
    const errEl = document.getElementById('admin-save-error');
    saveBtn.textContent = 'Saving…'; saveBtn.disabled = true;
    if (errEl) errEl.textContent = '';

    const thumbnailUrl = await resolveImageURL('form-thumb-file', 'form-thumb-url', 'thumb-upload-status');
    const mainImgUrl = await resolveImageURL('form-main-img-file', 'form-main-img-url', 'main-img-upload-status');

    const extraImages = [];
    document.querySelectorAll('#admin-extra-images-list .admin-image-upload-row').forEach(async (row, i) => {
      const url = row.querySelector('[id^="extra-url-"]')?.value.trim() || '';
      const alt = row.querySelector('[id^="extra-alt-"]')?.value.trim() || '';
      const src = row.querySelector('[id^="extra-src-"]')?.value.trim() || '';
      if (url) extraImages.push({ url, alt, source: src });
    });

    const titleEn = document.getElementById('form-title-en').value.trim();
    const titleKo = document.getElementById('form-title-ko').value.trim();
    if (!titleEn || !titleKo) { if (errEl) errEl.textContent = 'Title (EN and KO) are required.'; saveBtn.textContent = 'Save Article'; saveBtn.disabled = false; return; }

    const slug = editingId ? undefined : `${titleEn.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}-${Date.now()}`;
    const payload = {
      title_en: titleEn,
      title_ko: titleKo,
      topic_id: document.getElementById('form-topic').value || null,
      level: document.getElementById('form-level').value,
      status: document.getElementById('form-status').value,
      summary_en: document.getElementById('form-summary-en').value.trim(),
      summary_ko: document.getElementById('form-summary-ko').value.trim(),
      content_en: document.getElementById('form-content-en').value.trim(),
      content_ko: document.getElementById('form-content-ko').value.trim(),
      thumbnail_url: thumbnailUrl,
      thumbnail_alt: document.getElementById('form-thumb-alt').value.trim(),
      thumbnail_source: document.getElementById('form-thumb-source').value.trim(),
      main_image_url: mainImgUrl,
      main_image_alt: document.getElementById('form-main-img-alt').value.trim(),
      main_image_source: document.getElementById('form-main-img-source').value.trim(),
      images: extraImages,
      seo_title: document.getElementById('form-seo-title').value.trim(),
      seo_description: document.getElementById('form-seo-desc').value.trim(),
      seo_keywords: document.getElementById('form-seo-keywords').value.trim(),
      reading_time_en: parseInt(document.getElementById('form-read-en').value) || 3,
      reading_time_ko: parseInt(document.getElementById('form-read-ko').value) || 4,
      updated_at: new Date().toISOString(),
    };
    if (!editingId) { payload.slug = slug; payload.published_at = new Date().toISOString(); payload.ai_generated = false; }

    const { error } = editingId
      ? await supaClient.from('articles').update(payload).eq('id', editingId)
      : await supaClient.from('articles').insert(payload);

    saveBtn.textContent = 'Save Article'; saveBtn.disabled = false;
    if (error) { if (errEl) errEl.textContent = error.message; return; }
    cancelForm();
    loadStats();
    loadArticlesTable();
  }

  async function deleteArticle(id, title) {
    if (!confirm(`Delete article: "${title}"?\nThis cannot be undone.`)) return;
    const { error } = await supaClient.from('articles').delete().eq('id', id);
    if (error) { alert(`Error: ${error.message}`); return; }
    loadStats();
    loadArticlesTable();
  }

  async function loadSummariesTable() {
    const { data } = await supaClient.from('daily_summaries').select('*').order('date', { ascending: false }).limit(30);
    const tbody = document.getElementById('admin-summaries-tbody');
    if (!tbody) return;
    if (!data?.length) { tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;padding:32px;color:var(--text-muted);">No summaries yet. They will be generated daily by GitHub Actions.</td></tr>'; return; }
    tbody.innerHTML = data.map(s => `
      <tr>
        <td style="white-space:nowrap;font-weight:700;font-size:0.85rem;">${s.date}</td>
        <td style="font-size:0.82rem;max-width:360px;">${newsEscape(s.summary_en)}</td>
        <td style="font-size:0.82rem;max-width:360px;font-family:var(--font-korean);">${newsEscape(s.summary_ko)}</td>
        <td><button class="admin-action-btn admin-action-edit" data-summary-edit="${s.id}" data-en="${newsEscape(s.summary_en)}" data-ko="${newsEscape(s.summary_ko)}">Edit</button></td>
      </tr>`).join('');
    tbody.querySelectorAll('[data-summary-edit]').forEach(btn => btn.addEventListener('click', () => editSummary(btn.dataset.summaryEdit, btn.dataset.en, btn.dataset.ko)));
  }

  async function editSummary(id, en, ko) {
    const newEn = prompt('Edit English summary:', en);
    if (newEn === null) return;
    const newKo = prompt('Edit Korean summary:', ko);
    if (newKo === null) return;
    await supaClient.from('daily_summaries').update({ summary_en: newEn, summary_ko: newKo }).eq('id', id);
    loadSummariesTable();
  }

  async function loadTopicsTable() {
    await loadTopics();
    const tbody = document.getElementById('admin-topics-tbody');
    if (!tbody) return;
    tbody.innerHTML = topics.map(t => `
      <tr>
        <td style="font-size:1.2rem;">${t.icon || '📰'}</td>
        <td style="font-weight:600;font-size:0.85rem;">${newsEscape(t.name_en)}</td>
        <td style="font-size:0.85rem;font-family:var(--font-korean);">${newsEscape(t.name_ko)}</td>
        <td style="font-size:0.78rem;color:var(--text-muted);">${newsEscape(t.slug)}</td>
        <td><span class="tag ${t.color || 'tag-news'}" style="font-size:0.7rem;">${newsEscape(t.color || 'tag-news')}</span></td>
        <td><span style="color:${t.active ? '#4ade80' : '#ef4444'};font-weight:700;">${t.active ? '✓' : '✕'}</span></td>
        <td><div class="admin-table-actions"><button class="admin-action-btn admin-action-edit" data-topic-toggle="${t.id}" data-active="${t.active}">${t.active ? 'Deactivate' : 'Activate'}</button><button class="admin-action-btn admin-action-delete" data-topic-del="${t.id}">Delete</button></div></td>
      </tr>`).join('');
    tbody.querySelectorAll('[data-topic-toggle]').forEach(btn => btn.addEventListener('click', async () => {
      await supaClient.from('topics').update({ active: btn.dataset.active === 'true' ? false : true }).eq('id', btn.dataset.topicToggle);
      loadTopicsTable();
    }));
    tbody.querySelectorAll('[data-topic-del]').forEach(btn => btn.addEventListener('click', async () => {
      if (!confirm('Delete this topic? Articles linked to it will lose their topic.')) return;
      await supaClient.from('topics').delete().eq('id', btn.dataset.topicDel);
      loadTopicsTable();
    }));
  }

  async function addTopicRow() {
    const nameEn = prompt('Topic name (English):'); if (!nameEn) return;
    const nameKo = prompt('Topic name (Korean):'); if (!nameKo) return;
    const slug = nameEn.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const icon = prompt('Icon (emoji):', '📰') || '📰';
    const color = prompt('CSS tag class (e.g. tag-tech):', 'tag-news') || 'tag-news';
    const { error } = await supaClient.from('topics').insert({ name_en: nameEn, name_ko: nameKo, slug, icon, color });
    if (error) { alert(error.message); return; }
    loadTopicsTable();
  }

  return { init };
})();

/* ── Quiz Page ───────────────────────────────────────── */
const QuizPage = (() => {
  const LEVELS = [
    null,
    { name: 'Vowel Recognition',      ja: '母音の識別',     kr: '모음 인식',      topics: 'ㅏ ㅓ ㅗ ㅜ ㅡ ㅣ and all vowels',            diff: 'Beginner',        badge: 'tag-beginner' },
    { name: 'Consonant Recognition',  ja: '子音の識別',     kr: '자음 인식',      topics: 'ㄱ ㄴ ㄷ ㄹ + tense & aspirated',             diff: 'Beginner',        badge: 'tag-beginner' },
    { name: 'Syllable & Word Reading',ja: '音節と単語の読み', kr: '음절과 단어 읽기', topics: '안녕하세요 · 친구 · 학교 · 사랑',            diff: 'Beginner',        badge: 'tag-beginner' },
    { name: 'Greetings & Phrases',    ja: '挨拶とフレーズ', kr: '인사말',          topics: '감사합니다 · 반갑습니다 · 잘 먹겠습니다',       diff: 'Beginner',        badge: 'tag-beginner' },
    { name: 'Numbers & Family',       ja: '数字と家族',     kr: '숫자와 가족',    topics: '일 이 삼 · 하나 둘 셋 · 형 오빠 언니',          diff: 'Beginner',        badge: 'tag-beginner' },
    { name: 'Essential Particles',    ja: '基本助詞',       kr: '핵심 조사',      topics: '은/는 · 이/가 · 을/를 · 에 · 에서',             diff: 'Beg–Int',         badge: 'tag-intermediate' },
    { name: 'Daily Life Vocabulary',  ja: '日常語彙',       kr: '일상 어휘',      topics: '음식 · 장소 · 감정 · 색깔 · 신체',              diff: 'Intermediate',    badge: 'tag-intermediate' },
    { name: 'Verb Conjugation',       ja: '動詞の活用',     kr: '동사 변화',      topics: '가요 · 먹었어요 · 갈 거예요 · 먹고 있어요',     diff: 'Intermediate',    badge: 'tag-intermediate' },
    { name: 'Grammar Patterns',       ja: '文法パターン',   kr: '문법 패턴',      topics: '-보다 더 · -(으)세요 · -는 것 · 그래서',        diff: 'Int–Advanced',    badge: 'tag-advanced' },
    { name: 'Advanced Vocabulary',    ja: '上級語彙',       kr: '고급 어휘',      topics: '속담 · 관용어 · 콩글리시 · 학문 어휘',          diff: 'Advanced',        badge: 'tag-advanced' },
  ];

  let _lv = 0, _qs = [], _qi = 0, _sc = 0, _correctIdx = 0;

  function init() {
    const c = document.getElementById('quiz-container');
    if (c) _showSelect(c);
  }

  function _showSelect(c) {
    const isJa = typeof LangManager !== 'undefined' && LangManager.getLang() === 'ja';
    let html = '<div class="quiz-level-grid">';
    for (let i = 1; i <= 10; i++) {
      const lv = LEVELS[i];
      const displayName = isJa ? lv.ja : lv.name;
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
    const isJa = typeof LangManager !== 'undefined' && LangManager.getLang() === 'ja';
    const jaData = isJa && window.QUIZ_JA ? window.QUIZ_JA[q.q] : null;
    const qText = jaData ? jaData.qja : q.q;
    const choicesArr = (jaData && jaData.choicesja) ? jaData.choicesja : q.choices;
    const lvName = isJa ? lv.ja : lv.name;
    const backLabel = isJa ? '← レベル一覧' : '← All Levels';
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
    const isJa = typeof LangManager !== 'undefined' && LangManager.getLang() === 'ja';
    const pct = Math.round((_sc / _qs.length) * 100);
    const emoji = pct >= 90 ? '🏆' : pct >= 70 ? '⭐' : pct >= 50 ? '👍' : '📚';
    const msg = pct >= 90
      ? (isJa ? '훌륭해요！素晴らしい！' : '훌륭해요! Outstanding!')
      : pct >= 70
        ? (isJa ? '잘 했어요！よくできました！' : '잘 했어요! Great work!')
        : pct >= 50
          ? (isJa ? '계속 연습하세요！頑張りましょう！' : '계속 연습하세요! Keep going!')
          : (isJa ? '더 공부하세요！もっと勉強しましょう！' : '더 공부하세요! Keep studying!');
    const gradeLabel = isJa ? `Level ${_lv} クリア！` : `Level ${_lv} Complete!`;
    const lvName = isJa ? `${LEVELS[_lv].name} · ${LEVELS[_lv].ja}` : LEVELS[_lv].name;
    const retryLabel = isJa ? 'もう一度' : 'Try Again';
    const nextLabel = isJa ? '次のレベル →' : 'Next Level →';
    const homeLabel = isJa ? '全レベル' : 'All Levels';
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
  if (page === 'news-index') NewsPage.init();
  else if (page === 'news-board') BoardPage.init();
  else if (page === 'news-article') ArticlePage.init();
  else if (page === 'news-admin') AdminPage.init();
  else if (page === 'quiz') QuizPage.init();
});
