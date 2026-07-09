'use strict';
const fs   = require('fs');
const path = require('path');
const DATA = path.join(__dirname, '..', 'learn', 'data');

function patch(filename, stagePatch, stepPatches) {
  const file = path.join(DATA, filename);
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  if (stagePatch) data.stages.forEach(s => {
    if (stagePatch[s.id]) Object.assign(s, stagePatch[s.id]);
  });
  data.steps.forEach(step => {
    const p = stepPatches[step.id];
    if (!p) return;
    Object.entries(p).forEach(([k, v]) => { step[k] = v; });
  });
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log('✓ patched', filename);
}

patch('hangul.json', null, {
  15: { prompt_vi: 'ㄱ được phiên âm là…', choices_vi: ['n', 'g/k', 'd/t', 'm'] },
  16: { prompt_vi: 'Phụ âm nào KHÔNG phát âm (câm) ở đầu âm tiết?', choices_vi: ['ㄱ', 'ㄴ', 'ㅇ', 'ㅅ'] },
  17: { prompt_vi: 'ㄴ được phiên âm là…', choices_vi: ['r/l', 'm', 'n', 'b/p'] },
  18: { prompt_vi: "Phụ âm nào nghe giống 'j' trong 'juice'?", choices_vi: ['ㅂ', 'ㅈ', 'ㅅ', 'ㄷ'] },
  19: { prompt_vi: 'ㅁ được phiên âm là…', choices_vi: ['b', 'n', 'm', 'h'] },
  20: { prompt_vi: 'ㄹ được phiên âm là…', choices_vi: ['n', 'd/t', 'r/l', 's'] },
  21: { prompt_vi: '밥 (cơm) bắt đầu bằng phụ âm nào?', choices_vi: ['ㅂ', 'ㅍ', 'ㅁ', 'ㅂ'] },
  32: { prompt_vi: "Nguyên âm nào nghe giống 'a' (như trong 'father')?", choices_vi: ['ㅏ', 'ㅗ', 'ㅜ', 'ㅣ'] },
  33: { prompt_vi: "Nguyên âm nào nghe giống 'o' (như trong 'more')?", choices_vi: ['ㅓ', 'ㅗ', 'ㅡ', 'ㅑ'] },
  34: { prompt_vi: "Nguyên âm nào nghe giống 'ee' (như trong 'bee')?", choices_vi: ['ㅓ', 'ㅛ', 'ㅣ', 'ㅠ'] },
  35: { prompt_vi: 'ㅠ được phiên âm là…', choices_vi: ['u', 'eu', 'yo', 'yu'] },
  36: { prompt_vi: 'ㅡ nghe giống…', choices_vi: ['ya', 'i', 'eu', 'yo'] },
  53: { prompt_vi: 'ㄲ được phiên âm là…', choices_vi: ['k', 'kk', 'g/k', 'ng'] },
  54: { prompt_vi: 'Đâu là phụ âm CĂNG (쌍자음)?', choices_vi: ['ㅋ', 'ㅌ', 'ㅆ', 'ㅊ'] },
  55: { prompt_vi: 'ㅃ được phiên âm là…', choices_vi: ['b', 'p', 'pp', 'bb'] },
  56: { prompt_vi: 'Phụ âm bật hơi được tạo ra bằng…', choices_vi: ['Không có hơi', 'Một luồng hơi mạnh', 'Cổ họng căng', 'Âm mũi'] },
  57: { prompt_vi: 'ㅉ được phiên âm là…', choices_vi: ['ss', 'ch', 'jj', 'tt'] },
  69: { prompt_vi: 'ㅘ được phiên âm là…', choices_vi: ['wo', 'wa', 'wae', 'oe'] },
  70: { prompt_vi: '왜 có nghĩa là…', choices_vi: ['cái gì', 'ai', 'tại sao', 'ở đâu'] },
  71: { prompt_vi: 'ㅢ được phiên âm là…', choices_vi: ['wi', 'ui', 'we', 'eu'] },
  72: { prompt_vi: 'Nguyên âm ghép nào dùng ㅗ + ㅣ?', choices_vi: ['ㅘ', 'ㅙ', 'ㅚ', 'ㅝ'] },
  73: { prompt_vi: '예 được phiên âm là…', choices_vi: ['yae', 'ye', 'ae', 'e'] },
  84: { message_vi: 'Tuyệt vời — bạn đã hoàn thành cả 6 chặng của Hangul. Giờ bạn có thể đọc và viết mọi ký tự trong bảng chữ cái tiếng Hàn. 화이팅!' }
});
