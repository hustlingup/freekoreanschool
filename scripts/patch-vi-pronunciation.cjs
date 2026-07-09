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

patch('pronunciation.json', null, {
  1: {
    title_vi: 'Batchim là gì?',
    body_vi: "Batchim (받침, nghĩa đen là 'giá đỡ') là một phụ âm được đặt ở đáy khối âm tiết tiếng Hàn. Ví dụ, trong âm tiết 강, chữ ㅇ ở dưới cùng chính là batchim. Không phải âm tiết nào cũng có batchim — nhiều âm tiết chỉ kết thúc bằng nguyên âm. Batchim là lý do các từ tiếng Hàn như 산, 달 và 밥 kết thúc bằng một âm phụ âm rõ ràng thay vì một nguyên âm mở.",
    tip_vi: { label: 'Âm tiết nào có batchim?', text: 'Hãy nhìn vào bất kỳ khối âm tiết tiếng Hàn nào. Nếu có một ký tự bên dưới nguyên âm, đó là batchim. 가 không có batchim. 간 có batchim ㄴ. 닭 có batchim đôi ㄺ (đọc thành một âm).' }
  },
  2: {
    title_vi: '7 nhóm âm batchim',
    body_vi: 'Mặc dù nhiều phụ âm khác nhau có thể xuất hiện làm batchim trong chính tả, khi phát âm tất cả chỉ rút gọn thành 7 âm có thể có. Đây được gọi là 7 quy tắc batchim (받침 7종성). Học 7 nhóm này là điều thiết yếu — nó giải thích vì sao 닭 (gà) và 국 (canh) đều kết thúc bằng cùng một âm k.',
    rules_vi: [
      'Nhóm ㄱ: ㄱ, ㄲ, ㅋ, ㄳ, ㄺ → đọc là k (không bật hơi) — ví dụ: 국 (canh), 닭 (gà)',
      'Nhóm ㄴ: ㄴ, ㄵ, ㄶ → đọc là n — ví dụ: 산 (núi), 앉다 (ngồi)',
      'Nhóm ㄷ: ㄷ, ㅅ, ㅆ, ㅈ, ㅊ, ㅌ, ㅎ → đọc là t (không bật hơi) — ví dụ: 옷 (quần áo), 꽃 (hoa)',
      'Nhóm ㄹ: ㄹ, ㄼ, ㄽ, ㄾ, ㅀ → đọc là l — ví dụ: 달 (mặt trăng), 말 (ngựa)',
      'Nhóm ㅁ: ㅁ, ㄻ → đọc là m — ví dụ: 밤 (đêm), 삶 (cuộc đời)',
      'Nhóm ㅂ: ㅂ, ㅍ, ㄿ, ㄼ → đọc là p (không bật hơi) — ví dụ: 입 (miệng), 앞 (phía trước)',
      'Nhóm ㅇ: ㅇ → đọc là ng — ví dụ: 강 (sông), 방 (phòng)'
    ],
    tip_vi: { label: 'Âm tắc không bật hơi — nghĩa là gì?', text: "Các âm batchim k, t và p là âm không bật hơi: miệng bạn tạo thành vị trí phát âm nhưng không nhả ra luồng hơi. Hãy nghĩ đến việc giữ âm p cuối trong 'cup' — cup_ — mà không cho hơi thoát ra. Batchim ㄱ/ㄷ/ㅂ của tiếng Hàn hoạt động theo cách tương tự." }
  },
  12: { prompt_vi: 'ㅋ (kh), ㄲ (kk) và ㄳ đều là batchim trong cùng một nhóm. Chúng thuộc nhóm âm nào?', choices_vi: ['Nhóm ㄴ (n)', 'Nhóm ㄱ (k)', 'Nhóm ㅂ (p)', 'Nhóm ㄷ (t)'] },
  13: { prompt_vi: '방 (phòng) kết thúc bằng batchim ㅇ. Nó tạo ra âm gì?', choices_vi: ['Không có âm — ㅇ luôn câm', "ng (như trong 'sing')", 'n', 'm'] },
  14: {
    title_vi: 'Nối âm (Liaison)',
    body_vi: 'Khi một âm tiết kết thúc bằng batchim được theo ngay sau bởi một âm tiết bắt đầu bằng ㅇ câm, phụ âm batchim sẽ chuyển lên trước và trở thành phụ âm đầu của âm tiết tiếp theo. Chính tả vẫn giữ nguyên — chỉ cách phát âm thay đổi. Điều này gọi là nối âm (연음화) và là một trong những hiện tượng phát âm thường gặp nhất trong tiếng Hàn.',
    tip_vi: { label: 'Nhận diện quy luật', text: 'Hãy tìm: phụ âm batchim + âm tiết tiếp theo bắt đầu bằng ㅇ (ký tự giữ chỗ câm). Kết quả: batchim nghe như thể nó mở đầu âm tiết tiếp theo. 먹어요 → 머거요. 한국어 → 한구거. Dạng viết không bao giờ thay đổi — chỉ cách phát âm của bạn thay đổi.' }
  },
  19: {
    title_vi: 'Vì sao xảy ra nối âm?',
    body_vi: 'Cấu trúc âm tiết tiếng Hàn rất ưa chuộng kiểu phụ âm + nguyên âm. Khi một âm tiết bắt đầu bằng nguyên âm theo sau một batchim, về mặt ngữ âm sẽ dễ hơn nếu phụ âm gắn vào chỗ trống của nguyên âm đó. Kết quả là dòng lời nói tự nhiên, liền mạch hơn. Đây không phải tiếng lóng hay cách phát âm lười biếng — đây là tiếng Hàn chuẩn và bạn sẽ nghe thấy trong bản tin, bài phát biểu trang trọng lẫn hội thoại hằng ngày.',
    tip_vi: { label: 'Nối âm và chính tả', text: 'Tiếng Hàn viết vẫn giữ phụ âm gốc ở vị trí chính tả của nó ngay cả khi nó được phát âm ở âm tiết tiếp theo. Đây là lý do lúc đầu học đọc tiếng Hàn và học phát âm tiếng Hàn là hai kỹ năng riêng biệt — chữ viết ghi lại hình vị, không phải âm thanh chính xác.' }
  },
  20: { prompt_vi: 'Nối âm (연음화) xảy ra khi một batchim được theo sau bởi một âm tiết bắt đầu bằng…', choices_vi: ['Bất kỳ phụ âm nào', 'ㅇ câm (âm tiết bắt đầu bằng nguyên âm)', 'Chỉ ㄴ hoặc ㅁ', 'Một phụ âm bật hơi'] },
  21: { prompt_vi: 'Trong 한국어 (tiếng Hàn), batchim ㄱ của 국 nối lên trước. Nó được phát âm như thế nào?', choices_vi: ['한국어 → 항궈 (giữ ở 국)', '한국어 → 한구거 (ㄱ mở 어)', '한국어 → 한국어 (không đổi)', '한국어 → 한국아 (nguyên âm đổi)'] },
  22: {
    title_vi: 'Đồng hóa âm mũi',
    body_vi: 'Khi một batchim là phụ âm tắc thuộc nhóm ㄱ, ㄷ hoặc ㅂ được theo sau bởi các phụ âm mũi ㄴ hoặc ㅁ, âm tắc sẽ đồng hóa và chuyển thành âm mũi tương ứng. Điều này hoàn toàn mang tính cấu âm: phụ âm mũi đòi hỏi hạ màn hầu, kéo các âm tắc lân cận vào vùng âm mũi. Chính tả giữ nguyên; chỉ cách phát âm thay đổi.',
    rules_vi: [
      'ㅂ + ㄴ/ㅁ → ㅁ: âm tắc môi thành âm mũi môi — 입니다 → 임니다',
      'ㄱ + ㄴ/ㅁ → ㅇ: âm tắc ngạc mềm thành âm mũi ngạc mềm — 국물 → 궁물',
      'ㄷ + ㄴ/ㅁ → ㄴ: âm tắc lợi thành âm mũi lợi — 걷는다 → 건는다'
    ],
    tip_vi: { label: 'Vì sao cùng vị trí cấu âm?', text: "Mỗi cặp (ㅂ↔ㅁ, ㄱ↔ㅇ, ㄷ↔ㄴ) có chung chính xác cùng một vị trí cấu âm trong miệng — lần lượt là môi, phía sau họng và gờ lợi. Chỉ luồng hơi qua mũi thay đổi. Phụ âm mũi 'lây' sang âm tắc đứng trước, kéo nó thành âm mũi trong khi giữ nguyên vị trí miệng." }
  },
  28: { prompt_vi: 'Batchim ㅂ (hoặc ㅍ) theo sau bởi ㄴ hoặc ㅁ chuyển thành âm nào?', choices_vi: ['ㄴ', 'ㅁ', 'ㅇ', 'ㄱ'] },
  29: { prompt_vi: 'Batchim ㄱ theo sau bởi ㄴ hoặc ㅁ chuyển thành âm nào?', choices_vi: ['ㄴ', 'ㄷ', 'ㅇ (ng)', 'ㅁ'] },
  30: { prompt_vi: '입니다 (là / thì) — thực tế được phát âm như thế nào?', choices_vi: ['ip-ni-da', 'im-ni-da', 'ib-ni-da', 'ip-mi-da'] },
  31: {
    title_vi: 'Quy luật đồng hóa luôn theo một chiều',
    body_vi: "Đồng hóa âm mũi luôn diễn ra theo cùng một hướng: âm tắc trở thành âm mũi, không bao giờ ngược lại. Phụ âm mũi 'lây' sang âm đứng trước. Một khi đã nhận ra quy luật ㅂ→ㅁ, ㄷ→ㄴ, ㄱ→ㅇ, bạn sẽ bắt đầu tự động nghe và dự đoán được những thay đổi này trong tiếng Hàn thực tế.",
    tip_vi: { label: 'Mẹo ghi nhớ', text: 'Hãy nghĩ về mỗi cặp như chia sẻ một vị trí trong miệng bạn. Môi: ㅂ (tắc) ↔ ㅁ (mũi). Họng: ㄱ (tắc) ↔ ㅇ (mũi). Gờ lợi: ㄷ (tắc) ↔ ㄴ (mũi). Vị trí giữ nguyên; chỉ van mũi mở ra.' }
  },
  32: {
    title_vi: 'Căng âm (Tensification)',
    body_vi: 'Sau một số batchim nhất định — cụ thể là các âm batchim tắc không bật hơi thuộc nhóm ㄱ, ㄷ và ㅂ — phụ âm đứng sau trở nên căng (đôi). Dạng viết không thay đổi; chỉ cách phát âm thay đổi. Căng âm là lý do 학교 (trường học) nghe thành 학꾜 thay vì 학교.',
    tip_vi: { label: 'Vì sao xảy ra căng âm', text: 'Sau một âm tắc không bật hơi, đường phát âm đã ở tư thế căng, khép kín. Khi bạn bắt đầu phụ âm tiếp theo từ trạng thái này, sức căng cơ dư thừa được chuyển tiếp, tự động tạo ra âm căng. Căng âm không phải cố ý — nó là hệ quả cấu âm tự nhiên. Một khi nghe thấy nó trong lời nói thực, bạn không thể không nghe ra nữa.' }
  },
  37: { prompt_vi: 'Căng âm (경음화) xảy ra rõ ràng và dễ đoán nhất sau loại batchim nào?', choices_vi: ['Batchim âm mũi (ㄴ, ㅁ, ㅇ)', 'Batchim tắc không bật hơi (nhóm ㄱ, ㄷ, ㅂ)', 'Chỉ batchim ㄹ', 'Bất kỳ batchim nào'] },
  38: { prompt_vi: '학교 (trường học) — thực tế được phát âm như thế nào?', choices_vi: ['hak-gyo', 'hak-kyo (bật hơi)', 'hak-kkyo (căng)', 'ha-gyo'] },
  39: {
    title_vi: 'Sự yếu đi của ㅎ',
    body_vi: 'Phụ âm ㅎ là một trong những âm bất ổn định nhất của tiếng Hàn. Giữa hai nguyên âm — dù ㅎ là batchim hay phụ âm đầu — nó yếu đi đáng kể và thường gần như biến mất hoàn toàn. Đây là lý do 좋아요 (nó tốt) nghe thành 조아요 thay vì 조하요. Chữ ㅎ vẫn được viết, nhưng âm gần như biến mất.',
    tip_vi: { label: 'Lỗi thường gặp của người mới học', text: 'Nhiều người mới học đọc 조하요 cho 좋아요, giữ lại âm h. Trong tiếng Hàn thực tế điều này nghe thiếu tự nhiên và quá gượng ép. Cách phát âm chuẩn là 조아요 — âm ㅎ lặng lẽ biến mất giữa hai nguyên âm. Hãy tin vào quy tắc: ㅎ giữa các nguyên âm gần như biến mất.' }
  },
  43: {
    title_vi: 'ㅎ + phụ âm = bật hơi',
    body_vi: 'Khi batchim ㅎ gặp phụ âm đầu của âm tiết tiếp theo (hoặc ngược lại), cả hai hợp nhất thành một phụ âm bật hơi duy nhất. ㅎ + ㄷ thành ㅌ. ㄱ + ㅎ thành ㅋ. ㅂ + ㅎ thành ㅍ. ㄷ + ㅎ (hoặc ㅎ + ㄷ) thành ㅌ. Hãy nghĩ về ㅎ như việc thêm một luồng hơi vào phụ âm bên cạnh.',
    rules_vi: [
      'ㅎ + ㄷ → ㅌ: 놓다 (đặt xuống) → 노타',
      'ㄱ + ㅎ → ㅋ: 착하다 (tốt bụng) → 차카다',
      'ㅂ + ㅎ → ㅍ: 입학 (nhập học) → 이팍',
      'ㄷ + ㅎ → ㅌ: 못해요 (không thể làm) → 모태요'
    ]
  },
  45: { prompt_vi: 'ㅎ + ㄷ (hoặc ㄷ + ㅎ) tạo ra âm gì?', choices_vi: ['ㄷ (thường)', 'ㅌ (t bật hơi)', 'ㄸ (căng)', 'ㅎ (giữ nguyên h)'] },
  46: {
    title_vi: 'Ngạc hóa (Palatalization)',
    body_vi: 'Khi các phụ âm ㄷ hoặc ㅌ xuất hiện làm batchim và được theo sau bởi nguyên âm 이 (i), chúng dịch lên trước trong miệng và lần lượt chuyển thành ㅈ và ㅊ. Sự dịch chuyển này gọi là ngạc hóa — phụ âm di chuyển từ gờ lợi lên ngạc để đón trước nguyên âm hàng trước 이.',
    rules_vi: [
      'ㄷ + 이 → ㅈ이 → 지: 굳이 (cố tình) → 구지',
      'ㅌ + 이 → ㅊ이 → 치: 같이 (cùng nhau) → 가치'
    ],
    tip_vi: { label: 'Chỉ trong nội bộ hình vị', text: 'Ngạc hóa chỉ áp dụng trong cùng một từ hoặc khi một hậu tố bắt đầu bằng 이 gắn vào gốc từ. Nó không áp dụng qua ranh giới từ. 같이 kích hoạt ngạc hóa vì 이 là một phần của từ. Trong một cụm như 옷 입어요 (mặc quần áo), 이 bắt đầu một từ riêng — quy tắc khác áp dụng.' }
  },
  49: { prompt_vi: 'Khi batchim ㄷ được theo sau bởi nguyên âm 이, nó chuyển thành…', choices_vi: ['ㄴ', 'ㅈ', 'ㅊ', 'ㅅ'] },
  50: { prompt_vi: 'Khi batchim ㅌ được theo sau bởi nguyên âm 이, nó chuyển thành…', choices_vi: ['ㄴ', 'ㅈ', 'ㅊ', 'ㅅ'] },
  51: {
    title_vi: 'Âm ㄹ',
    body_vi: "Phụ âm ㄹ của tiếng Hàn thường được mô tả là nằm giữa r và l — và điều đó hoàn toàn chính xác. Cách phát âm thực tế của nó phụ thuộc vào vị trí trong âm tiết. Giữa hai nguyên âm, ㄹ là một cú gõ nhanh, duy nhất của đầu lưỡi vào gờ ngay sau răng cửa trên — cùng động tác như âm r vỗ trong tiếng Anh Mỹ 'butter' hay 'water'. Ở cuối âm tiết hoặc trước một phụ âm, hãy giữ lưỡi nhẹ tại gờ đó để tạo âm l êm dịu.",
    tip_vi: { label: 'Kỹ thuật gõ lưỡi', text: "Đừng rung ㄹ (không rung như tiếng Tây Ban Nha) và đừng dùng khẩu hình l kiểu tiếng Anh ở vị trí nguyên âm. Trong 라면, ㄹ là một cú gõ nhanh — hãy thử nói 'la' trong khi nghĩ 'ra'. Trong 달 (mặt trăng), ㄹ là âm l được giữ. Trong 빨리 (nhanh chóng) bạn có cả hai: một âm l giữ rồi một cú gõ." }
  },
  56: {
    title_vi: 'ㄹ + ㄴ hoặc ㄴ + ㄹ → ㄹㄹ',
    body_vi: 'Khi ㄹ và ㄴ đứng cạnh nhau qua các âm tiết, cả hai đều trở thành ㄹ — điều này gọi là biên âm hóa (유음화). Ví dụ: 신라 (triều đại Silla) được đọc là 실라 (silla), không phải sin-ra. Tương tự, 연락 (liên lạc) được đọc là 열락 (yeollak). ㄴ chuyển hoàn toàn thành ㄹ khi đứng cạnh ㄹ.',
    tip_vi: { label: 'Vì sao có biên âm hóa?', text: 'ㄹ và ㄴ có vị trí lưỡi rất giống nhau — cả hai đều là âm lợi phát ở gờ răng. Khi chúng đứng cạnh nhau, âm ㄹ (âm bên) mạnh hơn kéo ㄴ vào vùng của nó. Đây là một trong những thay đổi âm gây bất ngờ nhất vì chính tả không cho thấy gợi ý trực quan nào rằng điều đó đang xảy ra.' }
  },
  57: { prompt_vi: '신라 (Silla — một vương quốc lịch sử của Hàn Quốc) được phát âm là…', choices_vi: ['sin-ra', 'sin-la', 'sil-la', 'shi-ra'] },
  58: {
    title_vi: '6 lỗi thường gặp của người nói tiếng Anh',
    body_vi: 'Tiếng Hàn và tiếng Anh có hệ thống âm vị học rất khác nhau. Sáu bước tiếp theo mỗi bước đề cập một lỗi phát âm thường gặp của người nói tiếng Anh — kèm giải thích rõ ràng cách sửa. Nhận ra những quy luật này sớm giúp bạn tiết kiệm nhiều tháng thói quen xấu.',
    tip_vi: { label: 'Vì sao những lỗi này lại phổ biến đến vậy?', text: 'Người nói tiếng Anh tự động áp dụng âm vị học tiếng Anh cho các âm mới. Tiếng Hàn có những nguyên âm, sự đối lập phụ âm và ngữ điệu đơn giản là không tồn tại trong tiếng Anh. Mỗi lỗi này xuất phát từ việc ánh xạ một âm tiếng Hàn sang âm tiếng Anh gần nhất — điều gần như luôn sai.' }
  },
  59: {
    title_vi: "Lỗi 1 — Phát âm ㅡ giống 'oo'",
    body_vi: "ㅡ không có âm tương đương trong tiếng Anh. Đó là một nguyên âm hàng sau không tròn môi — lưỡi bạn ở tư thế oo nhưng môi hoàn toàn phẳng và không tròn, như thể bạn đang nói 'uh' với miệng cứng, dẹt. Các từ như 으, 크다, 든지 đều dùng âm này. Ngay khi môi bạn tròn lại, bạn đã phát ra sai nguyên âm.",
    tip_vi: { label: 'Cách luyện ㅡ', text: "Nói 'oo' như trong 'too'. Giờ giữ lưỡi ở đúng tư thế đó nhưng dẹt môi phẳng ra như thể đang mỉm cười nhẹ. Âm phát ra — cứng, không tròn môi, hơi lùi về sau — chính là ㅡ. Đừng thả lỏng lưỡi thành 'uh' hay âm mờ; hãy giữ nó cao và lùi sau." }
  },
  60: {
    title_vi: "Lỗi 2 — Coi ㅓ là 'er' của tiếng Anh",
    body_vi: "ㅓ thường được phiên là 'eo' hoặc 'uh' — nhưng nó không phải âm 'er' của tiếng Anh Mỹ vốn có màu sắc r. ㅓ tiếng Hàn là một nguyên âm hàng sau, độ mở trung bình, không tròn môi. Hãy nghĩ đến âm 'uh' trong 'but' hay 'cup' của tiếng Anh-Anh — không tròn môi, không có âm r, miệng hơi mở. Thêm bất kỳ chút âm r nào cũng lập tức khiến nguyên âm nghe như của người nước ngoài.",
    tip_vi: { label: 'Kiểm tra nhanh', text: "Nói cụm 'Uh-oh'. Âm tiết đầu 'Uh' — dẹt, hàng sau trung bình, không có r và không tròn môi — rất gần với ㅓ. Đừng căng nó, đừng tròn môi, đừng thêm r. Chỉ là một âm 'uh' mở đơn giản. Các từ để luyện: 어, 어머니, 뭐." }
  },
  61: {
    title_vi: 'Lỗi 3 — Bật hơi ở phụ âm đôi',
    body_vi: 'Người nói tiếng Anh tự nhiên thêm hơi bật vào các phụ âm tắc. Các phụ âm căng (đôi) của tiếng Hàn ㄲ, ㄸ, ㅃ, ㅆ, ㅉ không bao giờ bật hơi. Chúng được tạo ra với cơ căng và không có luồng hơi thoát ra. Hãy cầm một tờ giấy trước miệng — nó không được lay động khi bạn nói 까, 따, 빠, 싸, 짜. Sự khác biệt là giữa căng-và-giữ so với đẩy hơi ra ngoài.',
    tip_vi: { label: 'Bài kiểm tra tờ giấy', text: 'Phụ âm bật hơi (ㅋ, ㅌ, ㅍ, ㅊ) làm tờ giấy rung mạnh. Phụ âm thường (ㄱ, ㄷ, ㅂ, ㅈ) làm nó động nhẹ. Phụ âm căng (ㄲ, ㄸ, ㅃ, ㅉ) hầu như không được làm tờ giấy động chút nào — cơ căng cao, không nhả hơi.' }
  },
  62: {
    title_vi: 'Lỗi 4 — Lên giọng ở mọi câu hỏi',
    body_vi: 'Trong tiếng Anh, ngữ điệu lên ở cuối câu báo hiệu một câu hỏi. Trong tiếng Hàn, quy tắc ngữ điệu khác: câu hỏi có/không đúng là có lên giọng nhẹ ở cuối, nhưng câu hỏi có từ để hỏi (ai, gì, ở đâu, khi nào, tại sao, như thế nào) thường dùng ngữ điệu xuống hoặc trung tính — không lên giọng. Lạm dụng ngữ điệu lên kiểu tiếng Anh cho mọi câu hỏi tiếng Hàn nghe thiếu tự nhiên và đôi khi có vẻ do dự hay nài nỉ.',
    tip_vi: { label: 'Quy luật cần nhớ', text: 'Câu hỏi có/không: lên giọng nhẹ ở cuối. Ví dụ: 갔어요? (Bạn đã đi chưa?) — kết thúc lên. Câu hỏi có từ để hỏi: trung tính hoặc xuống. Ví dụ: 어디 갔어요? (Bạn đã đi đâu?) — kết thúc phẳng hoặc xuống. Từ để hỏi đã mang đủ thông tin; không cần giai điệu lên.' }
  },
  63: {
    title_vi: "Lỗi 5 — Đọc ㅅ như 's' thường trước các nguyên âm i",
    body_vi: "Trước các nguyên âm 이, 야, 여, 요, 유, phụ âm ㅅ được phát âm giống 'sh' của tiếng Anh. Vì vậy 시 là 'shi' chứ không phải 'si', và 셔츠 (áo sơ mi) bắt đầu bằng 'sh'. Điều này cũng áp dụng cho ㅆ căng trước 이 → 'sshi'. Người nói tiếng Anh học phiên âm trước thường nói 'si' trong khi người bản xứ nói 'shi', và điều đó lập tức bị nhận ra.",
    tip_vi: { label: 'Nguyên âm nào kích hoạt điều này?', text: "ㅅ được ngạc hóa (âm 'sh') xuất hiện trước các nguyên âm hàng i: 이 (i), 야 (ya), 여 (yeo), 요 (yo), 유 (yu). Trước tất cả các nguyên âm khác — 아, 어, 오, 우, 으, và các nguyên âm ghép của chúng — ㅅ vẫn là âm s thường. 사 là 'sa', nhưng 시 là 'shi'." }
  },
  64: {
    title_vi: 'Lỗi 6 — Đọc âm ㅎ trong 좋아요',
    body_vi: "Người mới học thường nói 'jo-ha-yo' cho 좋아요, coi ㅎ là âm h được phát âm rõ ràng. Nhưng do ㅎ yếu đi giữa các nguyên âm (mà bạn đã học ở Chặng 4), cách phát âm thực tế là 조아요 (jo-a-yo) — âm ㅎ gần như biến mất. Điều này áp dụng rộng rãi: 많아요 → 마나요, 낳아요 → 나아요. Bất cứ khi nào ㅎ nằm giữa các nguyên âm trong ngữ cảnh nói tự nhiên, nó mờ đi.",
    tip_vi: { label: 'Kết nối lại với Chặng 4', text: 'Bạn đã học sự yếu đi của ㅎ và sự bật hơi ㅎ + phụ âm. Lỗi 6 chỉ là nơi thực tế phổ biến nhất mà người mới học gặp sự yếu đi của ㅎ và làm sai. 좋아요 có lẽ là dạng tính từ được dùng nhiều nhất trong tiếng Hàn — phát âm đúng nó có ý nghĩa ngay lập tức.' }
  },
  65: { prompt_vi: 'Khi phát âm ㅡ, môi bạn nên…', choices_vi: ["Tròn như 'oo'", 'Phẳng và không tròn (dẹt)', "Hơi mở như 'ah'", 'Chụm lại như hôn'] },
  66: { prompt_vi: 'ㅅ trước nguyên âm 이 nghe giống…', choices_vi: ["'s' thường như trong 'see'", "'sh' như trong 'she'", "'z' như trong 'zero'", "'t' như trong 'tea'"] },
  67: { prompt_vi: '좋아요 (nó tốt / tôi thích nó) thực tế được phát âm là…', choices_vi: ['jo-ha-yo', 'jo-a-yo', 'joh-a-yo', 'jo-ha'] },
  68: { message_vi: 'Bạn đã làm chủ cả 8 quy tắc phát âm tiếng Hàn: rút gọn batchim, nối âm, đồng hóa âm mũi, căng âm, sự yếu đi của ㅎ, bật hơi ㅎ, ngạc hóa và âm ㄹ. Cộng với 6 lỗi thường gặp nhất của người nói tiếng Anh — và cách tránh chúng. Cách phát âm tiếng Hàn của bạn giờ sẽ nghe tự nhiên hơn nhiều.' }
});
