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

patch('emotions.json', null, {
  1: {
    title_vi: 'Cảm xúc trong tiếng Hàn (감정)',
    body_vi: "Từ chỉ cảm xúc trong tiếng Hàn chủ yếu là tính từ ở dạng gốc. Khác với tiếng Anh ('I am happy'), tính từ tiếng Hàn hoạt động như động từ và chia trực tiếp: 행복해요 (Tôi hạnh phúc / Thật tốt) mà không cần một từ 'am' riêng. Dạng nguyên thể kết thúc bằng -다: 행복하다, 슬프다, 무섭다. Bỏ -다 và thêm -아요/-어요 cho thì hiện tại lịch sự. Từ vựng cảm xúc đặc biệt hữu ích để nói về K-drama, đời sống hằng ngày và cảm xúc cá nhân.",
    tip_vi: { label: 'Tính từ chia như động từ', text: '행복하다 → 행복해요 (Tôi hạnh phúc). 슬프다 → 슬퍼요 (Tôi buồn). 피곤하다 → 피곤해요 (Tôi mệt). Đuôi -아요/-어요 khiến tính từ vừa lịch sự vừa ở thì hiện tại cùng lúc.' }
  },
  6: { prompt_vi: "Từ nào có nghĩa là 'hạnh phúc'?", choices_vi: ['슬프다', '무섭다', '행복하다', '화가 나다'] },
  7: {
    title_vi: 'Chia tính từ cảm xúc',
    body_vi: 'Để dùng tính từ cảm xúc trong hội thoại lịch sự, bỏ -다 khỏi dạng nguyên thể và thêm đuôi hiện tại lịch sự. Với gốc kết thúc bằng 하: 하다 → 해요 (행복하다 → 행복해요). Với gốc kết thúc bằng nguyên âm sáng (ㅏ, ㅗ): thêm -아요. Với các trường hợp khác: thêm -어요, thường được rút gọn — 슬프다 → 슬프 + 어요 → 슬퍼요, 무섭다 → 무서워요. Cùng mẫu này áp dụng cho hầu hết động từ miêu tả (tính từ) tiếng Hàn.',
    tip_vi: { label: 'Bảng chia nhanh', text: '행복하다 → 행복해요. 슬프다 → 슬퍼요. 화나다 → 화나요. 무섭다 → 무서워요. 피곤하다 → 피곤해요. 기쁘다 → 기뻐요. Lưu ý 슬프다 bỏ 으 trước -어요.' }
  },
  10: {
    title_vi: 'Thêm từ chỉ cảm giác (감정 어휘)',
    body_vi: "Tiếng Hàn có một bộ từ chỉ cảm xúc phong phú ngoài những từ cơ bản. 기쁘다 (vui mừng) là niềm vui mạnh hơn hoặc cụ thể hơn một chút so với 행복하다. 걱정되다 (lo lắng) nghĩa đen là 'nỗi lo trở nên/xảy ra'. 신나다 (phấn khích/hào hứng) thường dùng cho các tình huống sôi động — buổi hòa nhạc, thể thao, lễ hội. 피곤하다 (mệt) là từ thiết yếu cho đời sống hằng ngày, đặc biệt khi giải thích rằng bạn không thể làm gì đó.",
    tip_vi: { label: '신나다 trong văn hóa đại chúng', text: '신나다 và 신나요 có mặt khắp nơi trong văn hóa đại chúng Hàn Quốc. Các bài hát K-pop thường dùng 신나 để mô tả một nhịp điệu hay tâm trạng phấn khích. Bạn cũng sẽ nghe 신난다! như một câu cảm thán (Phấn khích quá!) tại các sự kiện và bữa tiệc.' }
  },
  15: { prompt_vi: "Từ nào có nghĩa là 'mệt'?", choices_vi: ['기쁘다', '신나다', '피곤하다', '걱정되다'] },
  16: {
    title_vi: '기분 — Tâm trạng & cảm giác',
    body_vi: '기분 (gibun) là từ then chốt để mô tả tâm trạng hay trạng thái cảm giác chung của bạn. 기분이 좋다 (gibuni jota) = cảm thấy dễ chịu / có tâm trạng tốt. 기분이 나쁘다 = cảm thấy khó chịu / có tâm trạng xấu. 기분 có thể mô tả sắc thái cảm xúc rộng hơn so với các từ chỉ một cảm xúc — nó nói về trạng thái tổng thể của bạn. Bạn sẽ nghe 기분이 어때요? (Bạn cảm thấy thế nào?) trong hội thoại hằng ngày.',
    tip_vi: { label: '기분 và 감정', text: '기분 = tâm trạng, trạng thái cảm giác chung (tùy ngữ cảnh, có thể thay đổi). 감정 = cảm xúc (cảm giác cụ thể hơn như giận, vui, sợ). 기분이 좋아요 = Tôi đang thấy dễ chịu. 감정을 표현하다 = biểu lộ cảm xúc.' }
  },
  18: { prompt_vi: '기분이 좋아요 nghĩa là…', choices_vi: ['Tôi thấy khó chịu', 'Tôi thấy dễ chịu', 'Tôi đói', 'Tôi mệt'] },
  19: {
    title_vi: 'Những cảm xúc sâu hơn (깊은 감정)',
    body_vi: 'Tiếng Hàn có một số từ chỉ cảm xúc không có từ tương đương đơn lẻ trong tiếng Anh. 그립다 (geuripda) mô tả nỗi nhớ ai đó hay điều gì đó — sự khao khát một người vắng mặt hay một nơi bạn yêu quý. 외롭다 (oeropda) là sự cô đơn, nhưng mang chiều sâu văn hóa của sự cô lập. 부끄럽다 (bukkeureopda) là sự ngượng ngùng hay bẽn lẽn. 뿌듯하다 (ppudeuthada) là niềm tự hào hay sự mãn nguyện ấm áp khi đạt được điều gì — cảm giác bạn có khi hoàn thành một việc khó hoặc chứng kiến người mình quan tâm thành công.',
    tip_vi: { label: '한 (Han) — nỗi buồn không thể dịch của người Hàn', text: '한 (han) là một cảm xúc mang tính văn hóa đặc thù: một nỗi buồn sâu sắc pha lẫn sự kiên cường, bắt nguồn từ đau khổ lịch sử nhưng được chuyển hóa thành năng lượng sáng tạo. Nó vang lên trong pansori (nhạc kịch dân gian Hàn Quốc), được mô tả trong thơ ca và được nhắc đến trong các cuộc bàn luận về bản sắc Hàn Quốc. Không phải từ dùng tùy tiện, nhưng thiết yếu để hiểu văn hóa.' }
  },
  24: { prompt_vi: '그립다 nghĩa là…', choices_vi: ['vui mừng', 'nhớ ai đó (khao khát)', 'mệt', 'cô đơn'] },
  26: { prompt_vi: '뿌듯하다 nghĩa là…', choices_vi: ['ngượng ngùng', 'tự hào/mãn nguyện', 'cô đơn', 'nhớ ai đó'] },
  27: {
    title_vi: 'Các mẫu câu cảm xúc thường gặp',
    body_vi: "Một số mẫu câu đặc biệt hữu ích để biểu lộ cảm xúc trong tiếng Hàn. '보고 싶어요' (Tôi nhớ bạn / Tôi muốn gặp bạn) dùng 보다 (nhìn/gặp) + -고 싶다 (muốn). '감동받았어요' (Tôi đã xúc động) dùng 감동 (cảm xúc sâu sắc) + 받다 (nhận). '괜찮아요' (Tôi ổn / Không sao) là một trong những câu linh hoạt nhất — dùng cho 'Tôi ổn', 'không sao', 'không vấn đề gì' và 'đừng bận tâm'.",
    tip_vi: { label: '괜찮아요 — câu đa dụng', text: "괜찮아요 nghĩa đen là 'ổn thôi/không sao'. Dùng nó để trấn an ai đó rằng bạn ổn (sau khi vấp ngã), để chấp nhận một lời mời bạn từng từ chối, để nói 'không, cảm ơn', hoặc để bày tỏ 'thế cũng được'. Làm chủ giọng điệu của nó là điều then chốt — cùng từ ngữ nhưng thông điệp rất khác nhau." }
  },
  31: { prompt_vi: '보고 싶어요 nghĩa là…', choices_vi: ['Tôi ổn', 'Tôi xúc động', 'Tôi nhớ bạn / Tôi muốn gặp bạn', 'Tôi cô đơn'] },
  33: { message_vi: 'Bạn đã khám phá từ vựng cảm xúc tiếng Hàn — từ những cảm giác cơ bản đến những từ giàu tính văn hóa như 그립다, 뿌듯하다 và 설레다. Tiếng Hàn cảm xúc của bạn đang lớn dần!' }
});
