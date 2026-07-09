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

patch('grammar.json', null, {
  1: {
    title_vi: 'Trật tự từ — SOV',
    body_vi: 'Tiếng Hàn tuân theo trật tự Chủ ngữ → Tân ngữ → Động từ (SOV). Động từ luôn đứng CUỐI.',
    rules_vi: [
      'Tiếng Anh (SVO): I eat rice. (Tôi ăn cơm.)',
      'Tiếng Hàn (SOV): 나는 밥을 먹어요. (Tôi cơm ăn.)',
      'Mẹo: Hãy lắng nghe từ cuối cùng — đó là động từ, là hành động!'
    ],
    tip_vi: { label: 'Mẹo ngữ pháp', text: 'Một khi bạn biết động từ đứng cuối, mọi thứ trở nên rõ ràng. Phần còn lại của câu có thể sắp xếp lại — người Hàn dùng trợ từ để giữ mọi thứ rành mạch.' }
  },
  3: { prompt_vi: 'Trong một câu tiếng Hàn, động từ luôn đứng...', choices_vi: ['Cuối', 'Đầu', 'Thứ hai', 'Ở bất kỳ đâu'] },
  4: {
    title_vi: 'Trợ từ tiếng Hàn',
    body_vi: 'Trợ từ gắn vào danh từ để thể hiện vai trò của chúng: chủ đề, chủ ngữ, tân ngữ, vị trí. Chúng thay thế cho trật tự từ cố định.',
    rules_vi: [
      '은/는 → Đánh dấu chủ đề (은 sau phụ âm, 는 sau nguyên âm)',
      '이/가 → Đánh dấu chủ ngữ (이 sau phụ âm, 가 sau nguyên âm)',
      '을/를 → Đánh dấu tân ngữ (을 sau phụ âm, 를 sau nguyên âm)',
      '에 → Vị trí / Hướng',
      '에서 → Vị trí của hành động',
      "의 → Sở hữu ('của')"
    ]
  },
  6: { prompt_vi: '은/는 đánh dấu ___', choices_vi: ['Chủ đề', 'Chủ ngữ', 'Tân ngữ', 'Vị trí'] },
  8: { prompt_vi: 'Để đánh dấu 밥 (cơm) là TÂN NGỮ: 밥___ 먹어요', choices_vi: ['을', '는', '가', '에'] },
  10: { prompt_vi: '에서 đánh dấu...', choices_vi: ['Vị trí của hành động', 'Đích đến', 'Chủ đề', 'Tân ngữ'] },
  11: {
    title_vi: 'Động từ — dạng nguyên thể',
    body_vi: 'Mọi động từ tiếng Hàn ở dạng nguyên thể đều kết thúc bằng 다 (da). Bỏ 다 để có gốc động từ, rồi thêm một đuôi.',
    rules_vi: [
      '가다 (đi) → gốc: 가-',
      '먹다 (ăn) → gốc: 먹-',
      '공부하다 (học) → gốc: 공부하-',
      '하다 (làm) → gốc: 하-'
    ]
  },
  12: {
    title_vi: 'Thì hiện tại: -아요 / -어요',
    body_vi: 'Thêm -아요 sau gốc có ㅏ hoặc ㅗ. Thêm -어요 cho tất cả các trường hợp khác. Động từ 하다 dùng -해요.',
    rules_vi: [
      '가다 → 가요 (đi · gốc ㅏ)',
      '오다 → 와요 (đến · gốc ㅗ)',
      '먹다 → 먹어요 (ăn · khác)',
      '마시다 → 마셔요 (uống · khác)',
      '공부하다 → 공부해요 (học · 하다)'
    ],
    tip_vi: { label: 'Quy tắc nguyên âm', text: "ㅏ và ㅗ là các nguyên âm 'sáng' → -아요. Tất cả các nguyên âm khác là 'tối' → -어요. Một khi bạn biết nguyên âm của gốc, việc chia động từ trở nên tự động." }
  },
  15: { prompt_vi: '가다 (đi) → dạng hiện tại lịch sự?', choices_vi: ['가요', '가아요', '가어요', '갔어요'] },
  16: {
    title_vi: 'Thì quá khứ: -았어요 / -었어요',
    body_vi: 'Thêm -았어요 sau gốc ㅏ/ㅗ và -었어요 cho các trường hợp khác. 하다 → 했어요.',
    rules_vi: [
      '가다 → 갔어요 (đã đi)',
      '오다 → 왔어요 (đã đến)',
      '먹다 → 먹었어요 (đã ăn)',
      '마시다 → 마셨어요 (đã uống)',
      '공부하다 → 공부했어요 (đã học)'
    ]
  },
  18: { prompt_vi: 'Thì quá khứ của 먹다 (ăn)?', choices_vi: ['먹었어요', '먹아요', '먹어요', '먹을 거예요'] },
  19: {
    title_vi: 'Thì tương lai: -(으)ㄹ 거예요',
    body_vi: 'Thêm -(으)ㄹ 거예요 vào gốc động từ để nói về kế hoạch hay dự đoán trong tương lai.',
    rules_vi: [
      '가다 → 갈 거예요 (sẽ đi)',
      '먹다 → 먹을 거예요 (sẽ ăn)',
      '공부하다 → 공부할 거예요 (sẽ học)'
    ]
  },
  20: { prompt_vi: '가다 (đi) → thì tương lai?', choices_vi: ['갈 거예요', '갔어요', '가요', '가지 마세요'] },
  21: {
    title_vi: 'Làm câu phủ định',
    body_vi: 'Phủ định ngắn: 안 + động từ. Phủ định dài: gốc động từ + 지 않아요. Không thể: 못 + động từ.',
    rules_vi: [
      '안 먹어요 (không ăn — dạng ngắn)',
      '먹지 않아요 (không ăn — dạng dài)',
      '못 가요 (không thể đi — không có khả năng)'
    ]
  },
  22: { prompt_vi: "'Tôi không ăn' — dạng phủ định ngắn", choices_vi: ['안 먹어요', '먹지 않아요', '못 먹어요', '안 가요'] },
  23: {
    title_vi: 'Đặt câu hỏi',
    body_vi: 'Câu hỏi tiếng Hàn dùng CÙNG trật tự từ như câu trần thuật — chỉ cần thêm ngữ điệu lên (↑) hoặc dấu chấm hỏi.',
    rules_vi: [
      '뭐 / 무엇 — Cái gì',
      '누구 — Ai',
      '어디 — Ở đâu',
      '언제 — Khi nào',
      '왜 — Tại sao',
      '어떻게 — Như thế nào',
      '얼마 — Bao nhiêu (giá tiền)',
      '몇 — Mấy / Bao nhiêu (số lượng)'
    ],
    tip_vi: { label: 'Mẹo ngữ pháp', text: '밥을 먹어요 = Tôi ăn cơm. 밥을 먹어요? = Bạn ăn cơm không? Cùng từ ngữ — chỉ là một ngữ điệu lên ở cuối. Không đảo từ như tiếng Anh!' }
  },
  25: { prompt_vi: "'Ở đâu' trong tiếng Hàn?", choices_vi: ['어디', '뭐', '왜', '언제'] },
  26: {
    title_vi: 'Các mẫu câu thiết yếu',
    body_vi: 'Hãy làm chủ 6 mẫu câu này để diễn đạt những ý phổ biến nhất trong hội thoại tiếng Hàn.',
    rules_vi: [
      '~이에요/예요 — là (danh từ): 학생이에요 (Tôi là học sinh)',
      '~고 싶어요 — muốn: 한국에 가고 싶어요 (Tôi muốn đi Hàn Quốc)',
      '~ㄹ/을 수 있어요 — có thể: 한국어를 할 수 있어요 (Tôi có thể nói tiếng Hàn)',
      '~아/어야 해요 — phải: 공부해야 해요 (Tôi phải học)',
      '~(으)면 — nếu/khi: 비가 오면 집에 있어요 (Nếu trời mưa, tôi ở nhà)',
      '~때문에 — vì: 비 때문에 못 가요 (Không thể đi vì trời mưa)'
    ]
  },
  27: { prompt_vi: "Mẫu câu cho 'Tôi muốn đi Hàn Quốc': 한국에 ___", choices_vi: ['가고 싶어요', '가야 해요', '갈 거예요', '갈 수 있어요'] },
  28: {
    title_vi: 'Từ nối',
    body_vi: 'Bốn liên từ này nối các câu lại với nhau. Hãy đặt chúng ở ĐẦU câu thứ hai.',
    rules_vi: [
      '그리고 — Và / Rồi thì (thêm thông tin hoặc trình tự)',
      '그래서 — Vì vậy / Do đó (nguyên nhân → kết quả)',
      '그렇지만 — Nhưng / Tuy nhiên (tương phản mạnh, trang trọng)',
      '그런데 — Nhưng / À mà (tương phản nhẹ, thân mật — phổ biến nhất!)'
    ],
    tip_vi: { label: 'Mẹo sử dụng', text: '그런데 là một trong những từ phổ biến nhất trong tiếng Hàn nói — nó làm dịu sự tương phản và chuyển chủ đề một cách mượt mà. 그렇지만 mạnh hơn và trang trọng hơn.' }
  },
  30: { prompt_vi: 'Tương phản nhẹ hoặc chuyển chủ đề — phổ biến nhất trong tiếng Hàn nói?', choices_vi: ['그런데', '그렇지만', '그래서', '그리고'] },
  31: {
    title_vi: 'Và, với',
    body_vi: "Dùng các trợ từ này giữa các danh từ (không phải giữa các câu) để mang nghĩa 'và' hoặc 'với'.",
    rules_vi: [
      '-하고 — sau bất kỳ danh từ nào, trung tính/thân mật: 친구하고 갔어요 (đã đi với một người bạn)',
      '-(이)랑 — 이랑 (phụ âm) / 랑 (nguyên âm), rất thân mật: 오빠랑 놀았어요 (đã chơi với anh trai)',
      '-와/과 — 와 (nguyên âm) / 과 (phụ âm), trang trọng/văn viết: 선생님과 상담했어요 (đã tư vấn với giáo viên)'
    ]
  },
  32: {
    title_vi: 'Đến/Từ ai đó',
    body_vi: 'Dùng các trợ từ chỉ hướng-người khi cho hoặc nhận từ người, không phải nơi chốn.',
    rules_vi: [
      '-한테 — đến (một người): 친구한테 전화했어요 (đã gọi cho bạn tôi)',
      '-한테서 — từ (một người): 선생님한테서 배웠어요 (đã học từ giáo viên)',
      '-에게 / -에게서 — các dạng trang trọng tương đương',
      '-께 — đến (kính ngữ, dành cho người lớn tuổi): 선생님께 드렸어요'
    ]
  },
  33: {
    title_vi: 'Nói giờ',
    body_vi: 'Dùng số ĐẾM THUẦN HÀN cho giờ (시) và số HÁN HÀN cho phút (분). Sáng = 오전, chiều/tối = 오후.',
    rules_vi: [
      'Giờ (시): 한(1), 두(2), 세(3), 네(4), 다섯(5)... + 시',
      'Phút (분): 일(1), 이(2), 삼(3), 사(4), 오(5)... + 분',
      'Rưỡi: 반 — 세 시 반 = 3:30',
      'Ví dụ: 오후 두 시 삼십 분 = 2:30 chiều'
    ],
    tip_vi: { label: 'Mẫu câu chính', text: 'Giờ dùng số đếm thuần Hàn (한, 두, 세...). Phút dùng số Hán Hàn (일, 이, 삼...). Rưỡi = 반. Sáng = 오전, chiều/tối = 오후.' }
  },
  35: { prompt_vi: 'Giờ trong cách nói thời gian tiếng Hàn dùng hệ số nào?', choices_vi: ['Thuần Hàn (한, 두, 세...)', 'Hán Hàn (일, 이, 삼...)', 'Cái nào cũng được', 'Chữ số Ả Rập'] },
  36: {
    title_vi: 'Danh từ đơn vị (loại từ)',
    body_vi: 'Tiếng Hàn dùng loại từ cụ thể sau [Danh từ] + [Số]. Số đếm thuần Hàn (한, 두, 세...) được dùng với hầu hết các loại từ.',
    rules_vi: [
      '개 — đồ vật nói chung: 사과 세 개 (3 quả táo)',
      '명 — người (trung tính): 학생 두 명 (2 học sinh)',
      '분 — người (kính ngữ): 손님 두 분 (2 vị khách)',
      '마리 — động vật: 고양이 한 마리 (1 con mèo)',
      '권 — sách: 책 세 권 (3 quyển sách)',
      '잔 — ly/đồ uống: 커피 두 잔 (2 ly cà phê)',
      '번 — lần/lượt: 세 번 (3 lần)'
    ]
  },
  38: { prompt_vi: 'Loại từ dùng cho người (trung tính)?', choices_vi: ['명', '개', '마리', '잔'] },
  39: {
    title_vi: 'Thì hiện tại tiếp diễn',
    body_vi: "Thêm -고 있어요 vào gốc động từ để nói ai đó ĐANG làm gì đó (dạng '-ing' của tiếng Hàn).",
    rules_vi: [
      '먹다 → 먹고 있어요 (đang ăn)',
      '가다 → 가고 있어요 (đang đi)',
      '공부하다 → 공부하고 있어요 (đang học)',
      '읽다 → 읽고 있어요 (đang đọc)'
    ],
    tip_vi: { label: 'Tiếp diễn và đơn giản', text: "먹어요 = Tôi ăn (nói chung hoặc ngay lúc này, tùy ngữ cảnh). 먹고 있어요 = Tôi đang ăn (cụ thể đang diễn ra ngay lúc này). Dạng tiếp diễn thêm ý 'đang trong hành động'." }
  },
  41: { prompt_vi: "'đang học' → 공부하다 + -고 있어요 =", choices_vi: ['공부하고 있어요', '공부고 있어요', '공부하고 있다', '공부해요'] },
  42: {
    title_vi: 'Giới thiệu bản thân',
    body_vi: 'Từ vựng quan trọng: 이름 (tên), 나이 (tuổi), 나라 (quốc gia), 직업 (nghề nghiệp), 취미 (sở thích), 고향 (quê hương).',
    rules_vi: [
      '안녕하세요! 저는 [tên]이에요/예요.',
      '저는 [나라]에서 왔어요. (Tôi đến từ [quốc gia].)',
      '저는 [직업]이에요. (Tôi là [nghề nghiệp].)',
      '제 취미는 [sở thích]예요. (Sở thích của tôi là [sở thích].)',
      '잘 부탁드려요! (Rất vui được gặp bạn!)'
    ],
    tip_vi: { label: 'Mẫu', text: 'Dùng 안녕하세요 + 잘 부탁드려요 cho những dịp trang trọng. Với bạn bè hoặc người ngang hàng: 안녕! + 잘 부탁해! Luôn cúi đầu nhẹ khi giới thiệu bản thân trực tiếp.' }
  },
  43: {
    title_vi: 'Ngày và tháng',
    body_vi: 'Ngày tháng tiếng Hàn dùng số Hán Hàn theo thứ tự Năm → Tháng → Ngày. Tháng 6 = 유월, tháng 10 = 시월 (ngoại lệ).',
    rules_vi: [
      '일월(1월), 이월(2월), 삼월(3월), 사월(4월), 오월(5월), 유월(6월)',
      '칠월(7월), 팔월(8월), 구월(9월), 시월(10월), 십일월(11월), 십이월(12월)',
      'Định dạng ngày: 2026년 6월 16일 (16 tháng 6, 2026)',
      '오늘이 며칠이에요? — Hôm nay là ngày mấy?'
    ]
  },
  44: {
    title_vi: 'Trạng từ chỉ mức độ',
    body_vi: 'Trạng từ chỉ mức độ đứng ngay trước từ mà chúng bổ nghĩa: 조금 (một chút), 정말 (thật sự), 아주 (rất), 많이 (nhiều).',
    rules_vi: [
      '조금 / 좀 — một chút (좀 nhẹ nhàng/thân mật hơn)',
      '정말 — thật sự / quả thật (trung tính)',
      '진짜 — thật sự (thân mật, cảm giác mạnh hơn)',
      '아주 — rất',
      '많이 — nhiều',
      '별로 + phủ định — không hẳn (별로 안 좋아요 = Tôi không thích lắm)',
      '전혀 + phủ định — hoàn toàn không (전혀 모르겠어요 = Tôi hoàn toàn không biết)'
    ],
    tip_vi: { label: 'Trạng từ phủ định', text: '별로 và 전혀 BẮT BUỘC phải dùng với động từ phủ định (안, 못, 없다, 모르다). Nói 별로 좋아요 (không có phủ định) là sai ngữ pháp. Hãy coi chúng như \'không hẳn\' và \'hoàn toàn không\'.' }
  },
  46: { prompt_vi: '별로 và 전혀 phải được dùng với...', choices_vi: ['Một động từ phủ định', 'Một động từ khẳng định', 'Chỉ tính từ', 'Chỉ thì quá khứ'] },
  47: {
    title_vi: 'Danh từ hóa: -는 것',
    body_vi: "Thêm -는 것 vào gốc động từ tạo ra một cụm danh từ — 'việc làm ~'. Nó khiến động từ hoạt động như danh từ.",
    rules_vi: [
      '먹는 것 — việc ăn',
      '배우는 것 — việc học',
      '한국어를 배우는 것이 재미있어요 — Việc học tiếng Hàn thật thú vị',
      '요리하는 것을 좋아해요 — Tôi thích nấu ăn (việc nấu ăn)'
    ],
    tip_vi: { label: 'Các dạng thì', text: '-는 것 (hiện tại/thói quen) · -(으)ㄴ 것 (quá khứ/đã hoàn thành) · -(으)ㄹ 것 (tương lai/dự định). Dạng hiện tại là phổ biến nhất trong lời nói hằng ngày.' }
  },
  49: { prompt_vi: '-는 것 biến một động từ thành...', choices_vi: ['Một cụm danh từ', 'Thì quá khứ', 'Thì tương lai', 'Một câu hỏi'] },
  50: {
    title_vi: 'So sánh hơn',
    body_vi: "Cấu trúc: [A]이/가 [B]보다 더 [tính từ]. 보다 nghĩa là 'hơn' và 더 nghĩa là 'nhiều hơn'.",
    rules_vi: [
      '한국어가 영어보다 더 어려워요 — Tiếng Hàn khó hơn tiếng Anh',
      '오늘이 어제보다 더 더워요 — Hôm nay nóng hơn hôm qua',
      '더 có thể được lược bỏ trong lời nói thân mật: 한국어가 영어보다 어려워요'
    ]
  },
  52: { prompt_vi: "Cách nói 'nhiều hơn' trong một phép so sánh tiếng Hàn?", choices_vi: ['더', '많이', '아주', '보다'] },
  53: {
    title_vi: '좋다 và 좋아하다',
    body_vi: '좋다 dùng trợ từ chủ ngữ (이/가): 한국어가 좋아요. 좋아하다 dùng trợ từ tân ngữ (을/를): 한국어를 좋아해요.',
    rules_vi: [
      '좋다 — tốt / cảm thấy thích (trạng thái): 커피가 좋아요 (Tôi thích cà phê / Cà phê ngon)',
      '좋아하다 — thích (sự yêu thích chủ động): 커피를 좋아해요 (Tôi thích cà phê)',
      "Cả hai đều dịch là 'tôi thích' nhưng 좋다 tập trung vào cảm giác, còn 좋아하다 vào sự yêu thích"
    ],
    tip_vi: { label: 'Khác biệt chính', text: '좋아요 → trợ từ chủ ngữ (이/가) đứng trước nó. 좋아해요 → trợ từ tân ngữ (을/를) đứng trước nó. Khi phân vân, 좋아해요 nghe tự nhiên hơn để diễn đạt sự yêu thích.' }
  },
  54: {
    title_vi: 'Vẫn & đã',
    body_vi: '아직 + động từ phủ định = vẫn chưa. 벌써 = đã (sớm hơn dự kiến). 이미 = đã (trung tính, trang trọng).',
    rules_vi: [
      '아직 안 먹었어요 — Vẫn chưa ăn (vẫn chưa)',
      '아직 여기 있어요 — Vẫn còn ở đây (đang tiếp diễn)',
      '벌써 도착했어요? — Đã đến rồi à? (ngạc nhiên)',
      '이미 알아요 — Tôi đã biết rồi (trung tính)'
    ]
  },
  55: { prompt_vi: "'아직' nghĩa là gì?", choices_vi: ['Vẫn / Chưa', 'Đã', 'Ngay cả', 'Nhiều hơn'] },
  56: {
    title_vi: 'Ai đó, cái gì đó',
    body_vi: "Kết hợp từ để hỏi với ngữ cảnh để diễn đạt những ý không xác định như 'ai đó' hoặc 'không gì cả'.",
    rules_vi: [
      '누군가 — ai đó: 누군가 왔어요 (Ai đó đã đến)',
      '무언가 / 뭔가 — cái gì đó: 뭔가 이상해요 (Có gì đó lạ)',
      '어딘가 — đâu đó: 어딘가에 있어요 (Nó ở đâu đó)',
      '아무도 + phủ định — không ai: 아무도 없어요 (Không có ai ở đây)',
      '아무것도 + phủ định — không gì cả: 아무것도 몰라요 (Tôi không biết gì cả)'
    ]
  },
  57: { prompt_vi: "'Không có ai ở đây' — 아무도 ___", choices_vi: ['없어요', '있어요', '알아요', '와요'] },
  58: {
    title_vi: 'Mệnh lệnh: -(으)세요',
    body_vi: 'Thêm -(으)세요 vào gốc động từ để đưa ra một yêu cầu hoặc mệnh lệnh lịch sự.',
    rules_vi: [
      '가다 → 가세요 (mời đi)',
      '앉다 → 앉으세요 (mời ngồi)',
      '먹다 → 드세요 (mời ăn — kính ngữ)'
    ]
  },
  59: {
    title_vi: 'Đừng: -지 마세요',
    body_vi: 'Thêm -지 마세요 vào gốc động từ để lịch sự bảo ai đó ĐỪNG làm gì đó.',
    rules_vi: [
      '말하다 → 말하지 마세요 (xin đừng nói)',
      '가다 → 가지 마세요 (xin đừng đi)',
      '먹다 → 먹지 마세요 (xin đừng ăn)'
    ]
  },
  61: { prompt_vi: "'Xin đừng nói' trong tiếng Hàn?", choices_vi: ['말하지 마세요', '말해 주세요', '말하세요', '말 안 해요'] },
  62: {
    title_vi: 'Phương tiện: -(으)로',
    body_vi: "-(으)로 đánh dấu phương thức hoặc phương tiện — 'bằng' một công cụ/cách làm gì đó.",
    rules_vi: [
      '-(으)로 sau phụ âm, -로 sau nguyên âm: 버스로 가요 (đi bằng xe buýt)',
      '지하철로 와요 (đến bằng tàu điện ngầm)',
      '한국어로 말해요 (nói bằng tiếng Hàn)'
    ]
  },
  63: {
    title_vi: 'Giỏi/Kém về',
    body_vi: '잘하다 = giỏi về. 못하다 = kém về. Cả hai gắn sau trợ từ tân ngữ 을/를.',
    rules_vi: [
      '한국어를 잘해요 (giỏi tiếng Hàn)',
      '수학을 못해요 (kém toán)',
      '수영을 잘 못해요 (bơi không giỏi lắm)'
    ]
  },
  64: { prompt_vi: "'giỏi tiếng Hàn' — 한국어를 ___", choices_vi: ['잘해요', '못해요', '좋아해요', '잘 못해요'] },
  65: {
    title_vi: 'Tất cả, hơn: 다, 더',
    body_vi: '다 = tất cả/mọi thứ. 더 = nhiều hơn. Cả hai đều là trạng từ đơn giản đặt trước động từ.',
    rules_vi: [
      '다 먹었어요 — đã ăn hết / tất cả',
      '더 주세요 — xin cho thêm',
      '다 더 다르게 쓰여요 — cả hai được dùng rất khác nhau theo ngữ cảnh'
    ]
  },
  66: { prompt_vi: "'Xin cho tôi thêm' — ___ 주세요", choices_vi: ['더', '다', '좀', '잘'] },
  67: {
    title_vi: 'Tất cả, hơn & -도',
    body_vi: "-도 có 4 cách dùng nâng cao ngoài nghĩa 'cũng' đơn giản: nhấn mạnh, phủ định nhấn mạnh, và 'vừa...vừa'.",
    rules_vi: [
      '아이도 알아요 — ngay cả trẻ em cũng biết (nhấn mạnh: sự bao gồm bất ngờ)',
      '하나도 없어요 — không có lấy một cái (phủ định nhấn mạnh: 하나도 + phủ định)',
      '먹기도 해요 — đôi khi cũng ăn / cũng ăn (-기도 하다)',
      '좋기도 하고 나쁘기도 해요 — vừa tốt vừa xấu'
    ]
  },
  69: { prompt_vi: "'Ngay cả trẻ em cũng biết' — dùng -도 nào?", choices_vi: ['아이도 알아요', '아이가 알아요', '아이를 알아요', '아이는 알아요'] },
  70: { message_vi: 'Bạn đã làm chủ cả 26 chặng ngữ pháp — từ trật tự từ SOV và trợ từ đến các mẫu -도 nâng cao. Hãy bắt đầu áp dụng chúng vào những cuộc hội thoại thực tế!' }
});
