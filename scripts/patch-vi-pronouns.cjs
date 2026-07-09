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

patch('pronouns.json', null, {
  1: {
    title_vi: 'Tổng quan về đại từ tiếng Hàn',
    body_vi: "Tiếng Hàn có hai ngữ vực cho đại từ ngôi thứ nhất: lịch sự và thân mật. 저 (jeo) là 'tôi' lịch sự, dùng với người lạ, người lớn tuổi và trong các dịp trang trọng. 나 (na) là 'tôi' thân mật, dùng với bạn thân và người nhỏ tuổi hơn. Quan trọng là, tiếng Hàn rất thường lược bỏ hoàn toàn đại từ chủ ngữ khi ngữ cảnh đã rõ — 어디 가요? có thể nghĩa là 'Bạn đi đâu vậy?' mà không cần đại từ nào cả. Làm chủ khi nào KHÔNG dùng đại từ cũng quan trọng như biết bản thân các đại từ.",
    tip_vi: { label: 'Ngôn ngữ lược đại từ (pro-drop)', text: "Tiếng Hàn là một ngôn ngữ lược đại từ — khi chủ ngữ đã rõ ràng từ ngữ cảnh hoặc vừa được nhắc đến, hãy bỏ đại từ. Giữ lại nó có thể nghe thiếu tự nhiên hoặc thậm chí hơi bất lịch sự (quá thẳng thừng). 저 괜찮아요 và 괜찮아요 đều nghĩa là 'Tôi ổn', nhưng dạng ngắn hơn tự nhiên hơn." }
  },
  6: { prompt_vi: "Đại từ nào là dạng lịch sự của 'tôi'?", choices_vi: ['나', '너', '저', '당신'] },
  7: {
    title_vi: "Nói 'bạn' trong tiếng Hàn",
    body_vi: "Tiếng Hàn tránh dùng đại từ trực tiếp 'bạn' (당신) trong hầu hết lời nói hằng ngày — nó có thể nghe lạnh lùng, gây hấn hoặc quá trang trọng tùy ngữ cảnh. Thay vào đó, người Hàn dùng tên, chức danh hoặc từ chỉ mối quan hệ của người đó. Một giáo viên sẽ được gọi là 선생님 (thầy/cô), không phải 당신. Một người bạn sẽ được gọi bằng tên. Đại từ 당신 xuất hiện trong bài hát, thơ ca và văn bản trang trọng nhưng hiếm gặp trong hội thoại hằng ngày.",
    tip_vi: { label: 'Cách xưng hô mà không dùng 당신', text: "Dùng tên người + 씨 cho người lớn mà bạn chưa quen thân: 김민준씨. Dùng chức danh của họ: 사장님 (giám đốc), 과장님 (trưởng phòng). Dùng từ chỉ mối quan hệ: 언니, 오빠, 아저씨. Những cách này tự nhiên hơn nhiều so với 당신." }
  },
  9: { prompt_vi: 'Vì sao người Hàn hiếm khi nói 당신 trong hội thoại?', choices_vi: ["Nó nghĩa là 'kẻ thù'", 'Nó có thể nghe lạnh lùng hoặc gây hấn', 'Nó chỉ dùng trong văn viết', 'Nó quá thân mật'] },
  10: {
    title_vi: 'Ngôi thứ ba & chúng ta (그·그녀·우리)',
    body_vi: "Tiếng Hàn hiếm khi dùng đại từ anh ấy/cô ấy trong lời nói. Thay vào đó, người Hàn nói tên người đó hoặc dùng từ chỉ định: 그 사람 (người đó), 이 사람 (người này). 그 (geu) và 그녀 (geunyeo) — anh ấy/cô ấy — có tồn tại, nhưng chúng chủ yếu xuất hiện trong văn viết và bản dịch. 우리 (uri) nghĩa là 'chúng ta' hoặc 'của chúng ta'. Thú vị là, người Hàn dùng 우리 ở nơi tiếng Anh dùng 'của tôi': 우리 엄마 (mẹ tôi, nghĩa đen là 'mẹ của chúng ta') — điều này phản ánh ý thức văn hóa tập thể về gia đình chung.",
    tip_vi: { label: '우리 = của tôi (cho gia đình & đất nước)', text: '우리 나라 (đất nước chúng ta), 우리 집 (nhà tôi/của chúng ta), 우리 엄마 (mẹ tôi) — những cách này tự nhiên và phổ biến. Dùng 나의 나라 hay 나의 집 thay vào đó nghe thiếu tự nhiên, gần như lạnh lùng.' }
  },
  15: { prompt_vi: "우리 엄마 nghĩa đen là 'mẹ của chúng ta' nhưng được dùng để chỉ…", choices_vi: ['mẹ của người khác', 'mẹ tôi', 'giáo viên', 'một người lạ'] },
  17: { prompt_vi: "Dạng nào của 'chúng ta' khiêm nhường và lịch sự hơn, dùng với người lớn tuổi?", choices_vi: ['우리', '저희', '그들', '너희'] },
  18: {
    title_vi: 'Đại từ chỉ định (이·그·저)',
    body_vi: "Tiếng Hàn có ba mức độ chỉ định dựa trên khoảng cách không gian. 이 (i) = gần người nói. 그 (geu) = gần người nghe hoặc đã được nhắc đến trước đó. 저 (jeo) = xa cả người nói lẫn người nghe. Chúng gắn với 것 (geot, 'vật') để tạo thành đại từ: 이것 (cái này), 그것 (cái đó), 저것 (cái kia). Trong lời nói thân mật, chúng được rút gọn: 이거, 그거, 저거. Cùng các gốc 이/그/저 này cũng dùng với từ chỉ nơi chốn: 여기 (ở đây), 거기 (ở đó), 저기 (đằng kia).",
    tip_vi: { label: '이/그/저 và 여기/거기/저기', text: '이/그/저 + 것 = cái này/đó/kia. 이/그/저 + -(e)gi = ở đây/đó. Vậy 여기 (yeo-gi) = ở đây (gần người nói), 거기 (geo-gi) = ở đó (gần người nghe), 저기 (jeo-gi) = đằng kia (xa cả hai).' }
  },
  23: { prompt_vi: 'Từ chỉ định nào chỉ vật xa CẢ người nói LẪN người nghe?', choices_vi: ['이것', '그것', '저것', '어떤 것'] },
  25: { prompt_vi: '저것 là dạng trang trọng. Dạng thân mật là gì?', choices_vi: ['이거', '그거', '저거', '뭐'] },
  26: {
    title_vi: 'Đại từ nghi vấn (의문대명사)',
    body_vi: "Từ để hỏi trong tiếng Hàn được đặt ở cùng vị trí câu như từ mà chúng thay thế — khác với tiếng Anh vốn đưa 'what' và 'where' lên đầu. So sánh: 영화 봐요? (Bạn xem phim à?) và 뭐 봐요? (Bạn xem gì?). Từ để hỏi chỉ đơn giản thế vào chỗ trống ban đầu. Các đại từ nghi vấn chính là: 누구 (ai), 무엇/뭐 (cái gì), 어디 (ở đâu), 언제 (khi nào), 왜 (tại sao), 어떻게 (như thế nào), 얼마 (bao nhiêu tiền).",
    tip_vi: { label: 'Không cần đảo trật tự câu hỏi', text: "Tiếng Anh đưa từ để hỏi lên đầu và đảo trật tự chủ ngữ-động từ: 'What are you doing?' Tiếng Hàn giữ nguyên trật tự từ như câu trần thuật và chỉ thế từ để hỏi vào: 뭐 해요? (Bạn đang làm gì?) — nghĩa đen 'gì làm?'" }
  },
  31: { prompt_vi: "Đại từ nghi vấn nào có nghĩa là 'ai'?", choices_vi: ['뭐', '어디', '누구', '왜'] },
  32: { message_vi: 'Bạn đã làm chủ đại từ tiếng Hàn — từ 저 lịch sự đến 나 thân mật, từ 우리 (của chúng ta/của tôi), đến các từ chỉ định và từ để hỏi. Tiến bộ tuyệt vời!' }
});
