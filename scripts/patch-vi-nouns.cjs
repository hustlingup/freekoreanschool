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

patch('nouns.json', null, {
  1: {
    title_vi: 'Danh từ tiếng Hàn (명사)',
    body_vi: "Danh từ tiếng Hàn (명사) không thay đổi theo giống hay số. Cùng một từ 사람 có nghĩa là 'người', 'những người', 'một người' và 'người đó'. Số nhiều được hiểu từ ngữ cảnh hoặc được thêm riêng bằng các từ như 들 (들 là hậu tố số nhiều, ví dụ 사람들 = mọi người). Không có mạo từ như 'a' hay 'the'. Điều này khiến danh từ tiếng Hàn rất dễ học — bạn chỉ cần biết bản thân từ đó.",
    tip_vi: { label: 'Hậu tố số nhiều 들', text: '들 nhẹ nhàng thêm ý số nhiều: 친구들 (bạn bè), 학생들 (học sinh). Bạn có thể gắn 들 vào người hoặc động vật, nhưng nó là tùy chọn và thường được bỏ khi ngữ cảnh đã rõ.' }
  },
  7: { prompt_vi: "Từ nào có nghĩa là 'bạn bè'?", choices_vi: ['남자', '여자', '친구', '아이'] },
  8: {
    title_vi: 'Danh từ gia đình (가족 명사)',
    body_vi: 'Các từ chỉ gia đình trong tiếng Hàn thường khác nhau tùy theo giới tính của người nói. 오빠 (oppa) là cách một người nữ gọi anh trai của mình, còn 형 (hyung) là cách một người nam gọi anh trai của mình. Tương tự, 언니 (unni) = chị gái (người nói là nữ) và 누나 (nuna) = chị gái (người nói là nam). Với cha mẹ, 아버지 / 어머니 là các từ trang trọng, còn 아빠 / 엄마 là các từ thân mật tương đương.',
    tip_vi: { label: 'Cách xưng hô theo giới tính', text: "Khác với tiếng Anh, tiếng Hàn không có một từ đơn 'anh chị em'. Việc bạn nói 오빠/형 hay 언니/누나 phụ thuộc hoàn toàn vào giới tính của chính bạn và độ tuổi tương đối của người anh chị em đó. Đây là điều cốt lõi trong từ vựng gia đình tiếng Hàn." }
  },
  11: {
    title_vi: 'Danh từ chỉ nơi chốn (장소 명사)',
    body_vi: "Danh từ chỉ nơi chốn trong tiếng Hàn tuân theo cùng quy tắc không-mạo-từ như mọi danh từ khác. 학교 có nghĩa là 'trường học', 'một trường học' hoặc 'trường học đó' — ngữ cảnh cho bạn biết là cái nào. Khi chỉ đường hoặc nêu vị trí, tiếng Hàn thêm trợ từ 에 (tại/ở) sau danh từ nơi chốn: 학교에 가요 (Tôi đi đến trường). Danh từ nơi chốn là một trong những từ thực dụng nhất nên học sớm.",
    tip_vi: { label: 'Trợ từ vị trí 에', text: "Gắn 에 vào một danh từ nơi chốn để mang nghĩa 'tại', 'ở' hoặc 'đến': 집에 (ở nhà), 학교에 (đến trường), 식당에 (tại nhà hàng). 에서 có nghĩa là 'từ' hoặc 'tại (khi làm gì đó)': 학교에서 공부해요 (Tôi học ở trường)." }
  },
  16: { prompt_vi: "Từ nào có nghĩa là 'trường học'?", choices_vi: ['집', '식당', '병원', '학교'] },
  17: {
    title_vi: 'Danh từ chỉ thời gian (시간 명사)',
    body_vi: 'Danh từ chỉ thời gian trong tiếng Hàn hoạt động độc lập — không cần chia. Bạn chỉ cần nêu từ chỉ thời gian ở đầu câu: 오늘 가요 (Hôm nay tôi đi), 내일 만나요 (Ngày mai gặp nhau nhé). Cách diễn đạt thời gian tiếng Hàn dùng số Hán Hàn cho giờ và số thuần Hàn cho phút. Những từ chỉ thời gian thiết yếu nhất là 오늘 (hôm nay), 내일 (ngày mai), 어제 (hôm qua) và 지금 (bây giờ).',
    tip_vi: { label: 'Từ chỉ thời gian mở đầu câu', text: 'Tiếng Hàn rất linh hoạt về trật tự từ, nhưng cách diễn đạt thời gian thường đứng ở đầu câu — trước chủ ngữ hoặc ngay sau nó. \'오늘 학교에 가요\' và \'학교에 오늘 가요\' đều đúng, dù câu đầu tự nhiên hơn.' }
  },
  19: { prompt_vi: "Từ nào có nghĩa là 'hôm nay'?", choices_vi: ['내일', '어제', '오늘', '지금'] },
  20: {
    title_vi: 'Danh từ chỉ đồ vật (사물 명사)',
    body_vi: 'Đồ vật hằng ngày là một trong những từ tiếng Hàn hữu ích ngay lập tức nhất. Tiếng Hàn có cả từ thuần Hàn lẫn từ Hán Hàn (gốc Trung) cho đồ vật, và trong nhiều trường hợp Konglish (từ mượn từ tiếng Anh) được dùng: 커피 (cà phê), 핸드폰 (hand phone / điện thoại di động). Khi đồ vật là đối tượng trực tiếp nhận hành động của động từ, thêm 을/를 sau danh từ: 책을 읽어요 (Tôi đọc sách). Đây là trợ từ đánh dấu tân ngữ.',
    tip_vi: { label: 'Trợ từ tân ngữ 을/를', text: 'Dùng 을 sau danh từ kết thúc bằng phụ âm: 책을. Dùng 를 sau danh từ kết thúc bằng nguyên âm: 가방을. Trong lời nói thân mật, trợ từ này thường bị bỏ hoàn toàn.' }
  },
  24: { prompt_vi: "Từ nào có nghĩa là 'tiền'?", choices_vi: ['책', '가방', '돈', '핸드폰'] },
  25: {
    title_vi: 'Loại từ tiếng Hàn (수사)',
    body_vi: 'Tiếng Hàn dùng các từ đếm gọi là loại từ (수사) gắn vào con số khi đếm những vật cụ thể. Loại từ 개 dùng cho đồ vật nói chung: 한 개 (một cái), 세 개 (ba cái). 명 dùng để đếm người: 두 명 (hai người). 잔 dùng cho tách/ly: 한 잔 (một tách). Mẫu là: số + loại từ, đặt ngay trước hoặc sau danh từ. Số tiếng Hàn dùng với loại từ thuộc bộ thuần Hàn: 하나(1), 둘(2), 셋(3), 넷(4), 다섯(5).',
    tip_vi: { label: 'Số thuần Hàn với loại từ', text: 'Khi kết hợp số thuần Hàn với loại từ, con số thay đổi một chút: 하나 → 한, 둘 → 두, 셋 → 세, 넷 → 네. Vậy nên là 한 개 (không phải 하나 개), 두 명 (không phải 둘 명).' }
  },
  27: { prompt_vi: 'Loại từ nào dùng cho người (đếm người)?', choices_vi: ['개', '명', '잔', '권'] },
  28: {
    title_vi: 'Trợ từ sở hữu 의',
    body_vi: "Trợ từ sở hữu 의 (ui, thường được đọc là '에') gắn vào danh từ để thể hiện sự sở hữu, giống 's trong tiếng Anh. 저의 가방 = túi của tôi, 친구의 집 = nhà của bạn. Trong lời nói hằng ngày, 의 thường bị bỏ: 제 가방 (túi của tôi, lịch sự) hoặc 내 가방 (túi của tôi, thân mật). Đại từ 저 và 나 có dạng sở hữu đặc biệt: 제 (lịch sự, của tôi) và 내 (thân mật, của tôi).",
    tip_vi: { label: '제 và 내', text: "제 là dạng sở hữu lịch sự/khiêm nhường 'của tôi' (từ 저 = tôi, lịch sự). 내 là dạng sở hữu thân mật 'của tôi' (từ 나 = tôi, thân mật). Dùng 제 với người lạ hoặc người lớn tuổi, 내 với bạn thân." }
  },
  31: { prompt_vi: "Nói 'túi của tôi' bằng tiếng Hàn lịch sự như thế nào?", choices_vi: ['내 가방', '저의 책', '제 가방', '나의 집'] },
  33: { prompt_vi: '의 là trợ từ sở hữu tiếng Hàn. Nó tương ứng với gì trong tiếng Anh?', choices_vi: ['trợ từ chủ ngữ', "'s (sở hữu)", 'trợ từ tân ngữ', 'hậu tố số nhiều'] },
  34: { message_vi: 'Bạn đã học qua những danh từ tiếng Hàn thiết yếu — người, nơi chốn, đồ vật, từ chỉ thời gian, loại từ và sở hữu. Hãy tiếp tục với Đại từ tiếp theo.' }
});
