/* Progressive enhancement only: guide content and answers live in HTML. */
(() => {
  'use strict';
  const copy = window.CourseStrings?.[document.documentElement.lang.toLowerCase()];
  const c = (key,fallback) => copy?.[key] || fallback;
  const storageKey = 'koreanschool_study_week_v1';
  const boxes = [...document.querySelectorAll('[data-study-day]')];
  let storageAvailable = true;
  let ticks = [];
  try {
    const stored = JSON.parse(localStorage.getItem(storageKey) || '[]');
    if (Array.isArray(stored)) ticks = stored.filter(x => Number.isInteger(x) && x >= 1 && x <= 7);
  } catch { storageAvailable = false; }
  const updateWeek = () => {
    const status = document.getElementById('study-week-status');
    if (status) status.textContent = `${boxes.filter(x => x.checked).length} of 7 study days ticked. ${storageAvailable ? 'Saved in this browser.' : 'Storage unavailable; ticks last only for this visit.'}`;
  };
  boxes.forEach(box => {
    box.checked = ticks.includes(Number(box.dataset.studyDay));
    box.addEventListener('change', () => {
      try { localStorage.setItem(storageKey, JSON.stringify(boxes.filter(x => x.checked).map(x => Number(x.dataset.studyDay)))); }
      catch { storageAvailable = false; }
      updateWeek();
    });
  });
  document.getElementById('study-week-clear')?.addEventListener('click', () => {
    boxes.forEach(box => { box.checked = false; });
    try { localStorage.removeItem(storageKey); } catch { storageAvailable = false; }
    updateWeek();
  });
  updateWeek();
  document.querySelector('[data-study-print]')?.addEventListener('click', () => window.print());
  document.getElementById('study-route')?.addEventListener('submit', event => {
    event.preventDefault();
    const routes = {
      reading: ['/learn/hangul.html', 'Read your first syllable in the Hangul lesson'],
      sentences: ['/guides/particles.html', 'Build a sentence with the particles guide'],
      conversation: ['/guides/order-at-a-cafe.html', 'Practise a café conversation']
    };
    const route = routes[document.getElementById('study-level').value];
    if (!route) return;
    const link = document.createElement('a');
    link.href = route[0];
    link.textContent = route[1] + ' →';
    document.getElementById('study-route-result').replaceChildren(link);
  });
  document.querySelectorAll('.study-practice').forEach(form => {
    form.addEventListener('submit', event => {
      event.preventDefault();
      let correct = 0, answered = 0;
      const questions = [...form.querySelectorAll('.study-question')];
      questions.forEach(q => {
        const selected = q.querySelector('input:checked');
        const feedback = q.querySelector('.study-feedback');
        if (!selected) { feedback.textContent = c('missing','Choose an answer, then check again.'); q.dataset.result = 'missing'; return; }
        answered++;
        const ok = selected.value === q.dataset.correct;
        if (ok) correct++;
        q.dataset.result = ok ? 'correct' : 'retry';
        feedback.textContent = ok ? c('correct','Correct. Read the explanation, then try changing the example.') : c('retry','Try again. The explanation below shows why.');
        q.querySelector('details').open = true;
      });
      form.querySelector('.study-score').textContent = copy
        ? copy.score.replace('{correct}',correct).replace('{total}',questions.length).replace('{remaining}',questions.length-answered)
        : `${correct} of ${questions.length} correct. ${answered < questions.length ? `${questions.length - answered} unanswered.` : 'Use the explanations to review.'}`;
    });
    form.addEventListener('reset', () => {
      form.querySelectorAll('.study-feedback, .study-score').forEach(el => { el.textContent = ''; });
      form.querySelectorAll('.study-question').forEach(q => { delete q.dataset.result; q.querySelector('details').open = false; });
    });
  });
})();
