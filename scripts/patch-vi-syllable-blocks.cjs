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

patch('syllable-blocks.json', null, {
  1: {
    title_vi: 'Khối âm tiết là gì?',
    body_vi: 'Mỗi âm tiết tiếng Hàn được viết bên trong một ô vuông vô hình. Khác với tiếng Anh nơi các chữ cái xếp từ trái sang phải thành một hàng, tiếng Hàn xếp chồng phụ âm và nguyên âm lại với nhau thành những khối gọn gàng, cân đối về mặt thị giác. Mỗi khối biểu thị đúng một âm tiết — một đơn vị âm thanh.',
    tip_vi: { label: 'Bạn có biết?', text: 'Mỗi khối âm tiết luôn có đúng một nguyên âm. Nó có thể có 0, 1 hoặc 2 phụ âm — nhưng không bao giờ có quá một nguyên âm.' }
  },
  2: {
    title_vi: 'Ba vị trí',
    body_vi: 'Mỗi khối âm tiết tiếng Hàn có ba vị trí được đặt tên. Hai vị trí là bắt buộc (phụ âm đầu và nguyên âm giữa) và một vị trí là tùy chọn (phụ âm cuối). Học tên của các vị trí này là điều thiết yếu — ngữ pháp tiếng Hàn tham chiếu đến chúng liên tục.',
    tip_vi: { label: 'Mẹo', text: 'Với các nguyên âm dọc như ㅏ, ㅓ và ㅣ: phụ âm đầu nằm bên trái, nguyên âm bên phải. Với các nguyên âm ngang như ㅗ, ㅜ và ㅡ: phụ âm đầu nằm trên, nguyên âm ở dưới.' }
  },
  3: {
    title_vi: 'Bốn kiểu khối âm tiết',
    body_vi: 'Âm tiết tiếng Hàn tuân theo bốn kiểu cấu trúc cơ bản, tùy thuộc vào việc có phụ âm cuối (받침) hay không và âm tiết bắt đầu bằng nguyên âm hay phụ âm.',
    tip_vi: { label: 'Quy tắc ㅇ giữ chỗ', text: 'Khi một âm tiết bắt đầu bằng âm nguyên âm, bạn phải viết ㅇ làm ký tự giữ chỗ ở vị trí đầu. ㅇ hoàn toàn câm ở đầu âm tiết — nó chỉ báo hiệu rằng khối bắt đầu bằng một nguyên âm. Ví dụ: 아 = ㅇ+ㅏ   이 = ㅇ+ㅣ   우 = ㅇ+ㅜ' }
  },
  4: { hint_vi: 'Mỗi âm tiết là một khối vuông — phụ âm đầu, nguyên âm và phụ âm cuối tùy chọn.' },
  5: { hint_vi: 'Khối này có cả ba vị trí: 초성 (ㄱ) + 중성 (ㅜ) + 받침 (ㄱ).' },
  6: { hint_vi: 'Âm tiết bắt đầu bằng nguyên âm dùng ㅇ câm làm ký tự giữ chỗ. ㅇ ở đây không phát ra âm nào.' },
  7: { prompt_vi: 'Mỗi khối âm tiết tiếng Hàn chứa chính xác bao nhiêu nguyên âm?', choices_vi: ['Không có', 'Đúng một', 'Một hoặc hai', 'Bao nhiêu tùy nhu cầu'] },
  8: { prompt_vi: 'Vị trí phụ âm ĐẦU (phụ âm thứ nhất) được gọi là…', choices_vi: ['받침', '중성', '초성', '모음'] },
  9: { prompt_vi: 'Khi một âm tiết bắt đầu bằng âm NGUYÊN ÂM, bạn viết __ làm phụ âm đầu giữ chỗ.', choices_vi: ['ㄱ', 'ㄴ', 'ㄹ', 'ㅇ'] },
  10: { hint_vi: 'Kiểu CV — kiểu khối đơn giản nhất. Chỉ gồm một phụ âm đầu và một nguyên âm.' },
  11: { hint_vi: 'Kiểu chỉ có V — ㅇ câm ở vị trí đầu, chỉ phát âm nguyên âm.' },
  12: { hint_vi: 'Kiểu CVC — phụ âm đầu + nguyên âm + phụ âm cuối (받침). Ba phần.' },
  13: { prompt_vi: '안 (bên trong / không) — đây là kiểu cấu trúc nào?', choices_vi: ['CV', 'CVC', 'VC (ㅇ câm + nguyên âm + phụ âm cuối)', 'Chỉ V'] },
  14: {
    title_vi: 'Nguyên âm dọc và nguyên âm ngang',
    body_vi: 'Hình dạng của nguyên âm quyết định vị trí của phụ âm đầu trong khối. Nguyên âm cao, dọc đẩy phụ âm sang trái; nguyên âm rộng, ngang đẩy phụ âm lên trên. Đây chính là điều tạo nên hình dáng vuông đặc trưng của tiếng Hàn.',
    tip_vi: { label: 'Mẹo hình dung nhanh', text: 'Khi bạn thấy một nguyên âm cao (ㅏ, ㅓ, ㅣ và các biến thể), phụ âm đầu nằm bên trái nó. Khi bạn thấy một nguyên âm rộng (ㅗ, ㅜ, ㅡ và các biến thể), phụ âm đầu nằm phía trên nó. Nguyên âm ghép như ㅘ, ㅝ, ㅚ hoạt động như nguyên âm dọc — phụ âm nằm bên trái.' }
  },
  16: { example_meaning_vi: 'bạn (thân mật)', hint_vi: 'ㅓ cũng là một nguyên âm dọc cao — phụ âm bên TRÁI, nguyên âm bên PHẢI.' },
  17: { example_meaning_vi: 'thời gian', hint_vi: 'ㅣ là nguyên âm cao nhất. Phụ âm luôn nằm bên trái nó.' },
  18: { example_meaning_vi: 'cảm ơn', hint_vi: 'ㅗ là một nguyên âm ngang RỘNG. Phụ âm đầu nằm PHÍA TRÊN nguyên âm.' },
  19: { example_meaning_vi: 'ai', hint_vi: 'ㅜ là một nguyên âm ngang rộng — phụ âm ở trên, nguyên âm ở dưới. Vạch chỉ XUỐNG.' },
  20: { example_meaning_vi: 'và', hint_vi: 'ㅡ là một nguyên âm ngang phẳng — phụ âm nằm phía trên nó.' },
  21: { prompt_vi: 'Với nguyên âm CAO như ㅏ, ㅓ hoặc ㅣ — phụ âm đầu nằm ở đâu?', choices_vi: ['Ở trên', 'Bên trái', 'Bên phải', 'Ở dưới cùng'] },
  22: { prompt_vi: 'Với nguyên âm RỘNG như ㅗ, ㅜ hoặc ㅡ — phụ âm đầu nằm ở đâu?', choices_vi: ['Bên trái', 'Bên phải', 'Ở trên', 'Ở dưới cùng'] },
  23: { prompt_vi: '배 (bụng / thuyền) chứa ㅐ — ㅐ là loại nguyên âm nào?', choices_vi: ['Ngang rộng', 'Dọc cao', 'Ghép rộng', 'Câm'] },
  24: { prompt_vi: 'Đâu là một nguyên âm RỘNG (ngang)?', choices_vi: ['ㅏ', 'ㅓ', 'ㅣ', 'ㅜ'] },
  25: {
    title_vi: 'Xây dựng những âm tiết đầu tiên của bạn',
    body_vi: 'Bây giờ hãy cùng luyện tập xây dựng các âm tiết CV đơn giản — phụ âm + nguyên âm, không có batchim. Đây là những khối dễ đọc và dễ viết nhất. Hãy nghe từng khối và tự mình thử phát ra âm thanh.'
  },
  34: {
    title_vi: 'Thêm batchim — phụ âm cuối',
    body_vi: 'Khi bạn thêm một phụ âm ở đáy khối, phụ âm đó trở thành 받침 (batchim) — phụ âm cuối. Batchim là thứ tạo nên phần kết thúc phong phú, vang vọng cho nhiều từ tiếng Hàn. Hãy xem cách việc thêm batchim biến những âm tiết đơn giản thành những từ thực sự.',
    tip_vi: { label: 'Mẹo', text: 'Khối âm tiết có batchim được nén lại theo chiều dọc một chút để chừa chỗ ở dưới. Phụ âm batchim nằm bên dưới cả phụ âm đầu và nguyên âm, hoàn thiện hình vuông của khối.' }
  },
  35: { hint_vi: 'ㄴ là 받침 ở đây — nó nằm ở đáy khối, bên dưới ㅅ và ㅏ.' },
  36: { hint_vi: 'ㄹ 받침 — lưỡi chạm nhẹ vào vòm miệng để tạo phần kết thúc.' },
  37: { hint_vi: "ㅂ받침 — môi khép lại ở cuối mà không bật ra. Âm 'p' không được bật hơi." },
  38: { hint_vi: 'ㅁ 받침 — môi khép nhẹ ở cuối. Một phần kết thúc vang âm mũi.' },
  39: { hint_vi: "ㄹ 받침 lần nữa — lưỡi nán lại ở vòm miệng. Nghe giống âm 'l' nhẹ." },
  40: { prompt_vi: '밥 (cơm) — 받침 (batchim) của nó là gì?', choices_vi: ['ㅏ', 'ㅂ', 'ㄴ', 'ㄱ'] },
  41: { prompt_vi: '달 (mặt trăng) kết thúc bằng âm phụ âm nào?', choices_vi: ['n', 'm', 'l/r', 'k'] },
  42: { prompt_vi: 'Trong một khối âm tiết CVC, 받침 (batchim) nằm ở đâu?', choices_vi: ['Trên nguyên âm', 'Bên phải nguyên âm', 'Ở dưới cùng, bên dưới mọi thứ', 'Bên cạnh phụ âm đầu'] },
  43: { prompt_vi: 'Từ nào sau đây KHÔNG có 받침?', choices_vi: ['산', '달', '가', '봄'] },
  44: { prompt_vi: '봄 (mùa xuân) = ㅂ + ㅗ + ? — batchim là gì?', choices_vi: ['ㄴ', 'ㄱ', 'ㅁ', 'ㄹ'] },
  45: {
    title_vi: 'Đọc những từ tiếng Hàn thực sự',
    body_vi: 'Giờ bạn đã có mọi thứ cần thiết để giải mã những từ tiếng Hàn thực sự. Hãy cùng phân tích 10 từ thiết yếu theo từng âm tiết, xác định từng thành phần. Nhấn nút loa để nghe các từ được đọc thành tiếng.'
  },
  46: { meaning_vi: 'Hàn Quốc' },
  47: { meaning_vi: 'người' },
  48: { meaning_vi: 'trường học' },
  49: { meaning_vi: 'xin chào / bình an' },
  50: { meaning_vi: 'lòng biết ơn' },
  51: { meaning_vi: 'tình yêu' },
  52: { meaning_vi: 'âm nhạc' },
  53: { meaning_vi: 'bạn bè' },
  54: { meaning_vi: 'gia đình' },
  55: { meaning_vi: 'biển / đại dương' },
  56: { meaning_vi: 'giấc mơ' },
  57: {
    title_vi: 'Luyện tập & tóm tắt',
    body_vi: 'Chúc mừng — bạn đã học được cấu trúc cốt lõi của các khối âm tiết tiếng Hàn! Dưới đây là bản tóm tắt nhanh năm quy tắc chi phối mọi âm tiết trong hệ thống chữ viết tiếng Hàn.',
    rules_vi: [
      'Mỗi khối có đúng một nguyên âm (중성 / Jungseong)',
      'Âm tiết bắt đầu bằng nguyên âm dùng ㅇ câm làm phụ âm đầu giữ chỗ',
      'Nguyên âm cao (ㅏ, ㅓ, ㅣ) — phụ âm đầu nằm bên trái, nguyên âm bên phải',
      'Nguyên âm rộng (ㅗ, ㅜ, ㅡ) — phụ âm đầu nằm trên, nguyên âm ở dưới',
      '받침 (batchim) tùy chọn nằm ở đáy khối, bên dưới mọi thứ khác'
    ],
    tip_vi: { label: 'Sắp có bài tự kiểm tra!', text: 'Ba câu hỏi nhanh dưới đây để xác nhận bạn đã nắm được. Hãy xác định các thành phần của mỗi âm tiết.' }
  },
  58: { prompt_vi: '남 (nam / phương nam) — 초성 (phụ âm đầu) của nó là gì?', choices_vi: ['ㄴ', 'ㅏ', 'ㅁ', 'ㄱ'] },
  59: { prompt_vi: '달 (mặt trăng) — xác định 받침 (batchim / phụ âm cuối).', choices_vi: ['ㄷ', 'ㅏ', 'ㄹ', 'ㄴ'] },
  60: { prompt_vi: '봄 (mùa xuân) — ba thành phần theo thứ tự là gì?', choices_vi: ['ㅂ + ㅗ + ㅁ', 'ㅂ + ㅜ + ㄴ', 'ㅍ + ㅗ + ㄴ', 'ㅂ + ㅗ + ㄴ'] },
  61: { message_vi: 'Bạn đã làm chủ các khối cấu tạo của toàn bộ chữ viết tiếng Hàn — 5 chặng, 61 bước. Mỗi từ tiếng Hàn đều được tạo thành từ chính những khối này. 화이팅!' }
});
