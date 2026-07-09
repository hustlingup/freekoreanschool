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

patch('shopping.json', null, {
  1: {
    title_vi: 'Mua sắm ở Hàn Quốc (쇼핑)',
    body_vi: 'Hàn Quốc có văn hóa mua sắm phong phú — từ chợ truyền thống ngoài trời (시장) đến các trung tâm thương mại cao cấp (백화점) và cửa hàng tiện lợi 24 giờ (편의점) ở mọi góc phố. Mặc cả là chuyện bình thường ở chợ truyền thống nhưng không áp dụng tại cửa hàng chuỗi hay trung tâm mua sắm. Học cách hỏi giá, so sánh sản phẩm và hoàn tất giao dịch bằng tiếng Hàn sẽ khiến trải nghiệm mua sắm của bạn suôn sẻ và thân thiện hơn nhiều. Câu hỏi then chốt bạn sẽ dùng liên tục là 얼마예요? (Cái này bao nhiêu tiền?)',
    tip_vi: { label: 'Chợ Gwangjang và trung tâm thương mại', text: 'Ở các chợ truyền thống như 광장시장 (Chợ Gwangjang) tại Seoul, bạn có thể mặc cả — nhất là khi mua nhiều món. Tại 롯데백화점 (Trung tâm thương mại Lotte) hay bất kỳ chuỗi nào, giá cố định. Hãy để ý các bảng 세일 (sale) và khuyến mãi 할인 (giảm giá).' }
  },
  6: { prompt_vi: "Từ nào có nghĩa là 'chợ' (chợ truyền thống ngoài trời)?", choices_vi: ['가게', '백화점', '시장', '편의점'] },
  7: {
    title_vi: 'Từ chỉ đồ vật khi mua sắm (쇼핑 물건)',
    body_vi: 'Tiếng Hàn dùng nhiều từ mượn cho các sản phẩm hiện đại — 핸드폰 (điện thoại di động), 노트북 (laptop), 티셔츠 (áo thun). Từ thuần Hàn và Hán Hàn dùng cho các món truyền thống: 옷 (quần áo), 신발 (giày), 가방 (túi). Khi mua sắm, bạn sẽ thường chỉ vào một thứ và nói 이거 (cái này) — một chiến lược đơn giản mà hiệu quả. Kích cỡ thường được cho theo free-size (프리 사이즈), nhỏ (S), vừa (M) và lớn (L/XL).',
    tip_vi: { label: '이거 주세요 — cứu cánh khi mua sắm', text: '이거 주세요 (Cho tôi lấy cái này) + 얼마예요? (Bao nhiêu tiền?) sẽ giúp bạn vượt qua hầu hết các tình huống mua sắm ở Hàn Quốc ngay cả khi bạn biết rất ít. Hãy chỉ, nói hai câu này, và bạn đã ổn.' }
  },
  10: {
    title_vi: 'Các câu mua sắm quan trọng (쇼핑 표현)',
    body_vi: 'Vài câu thiết yếu bao quát gần như mọi tương tác mua sắm. 얼마예요? (Cái này bao nhiêu tiền?) dùng cho bất kỳ câu hỏi giá nào. 이거 주세요 (Cho tôi cái này) hoàn tất một giao dịch. 더 싸게 해 주세요 (Xin bớt giá đi) dùng để mặc cả ở chợ truyền thống. 있어요? (Có ... không?) + tên món hỏi xem có hàng không. 없어요 nghĩa là hết hàng hoặc không có.',
    tip_vi: { label: 'Giọng điệu lịch sự khi mua sắm', text: 'Ở các cửa hàng Hàn Quốc, nhân viên thường chào bạn bằng 어서 오세요! (Xin mời vào!). Hãy đáp lại bằng một cái gật đầu hoặc 안녕하세요. Khi mua sắm xong, 감사합니다 (cảm ơn) luôn được đón nhận. Hiếm khi hét ngang cửa hàng — hãy lại gần trước khi nói.' }
  },
  14: { prompt_vi: "Hỏi 'Cái này bao nhiêu tiền?' bằng tiếng Hàn như thế nào?", choices_vi: ['이거 주세요', '얼마예요?', '감사합니다', '있어요?'] },
  15: {
    title_vi: 'Hỏi về việc có hàng (있어요? / 없어요)',
    body_vi: '있어요? (Có không? / Bạn có ... không?) và 없어요 (Không có / Chúng tôi không có) là hai trong những từ hữu ích nhất khi mua sắm ở Hàn Quốc. Gắn một món trước 있어요?: 이거 있어요? (Có cái này không?), 더 큰 사이즈 있어요? (Có size lớn hơn không?). 없어요 là câu trả lời nếu đã bán hết. Bạn cũng có thể nói 다 팔렸어요 (Đã bán hết) chi tiết hơn.',
    tip_vi: { label: '있다 và 없다', text: '있다 = tồn tại / có. 없다 = không tồn tại / không có. 있어요? một mình ở cuối câu = Bạn có ... không? 없어요. = Chúng tôi không có. Hai từ này xuất hiện trong gần như mọi câu tiếng Hàn bàn về sở hữu, vị trí hay sự có sẵn.' }
  },
  18: { prompt_vi: '없어요 nghĩa là…', choices_vi: ['Chúng tôi có', 'Bao nhiêu tiền?', 'Không có / Chúng tôi không có', 'Vâng, cho tôi'] },
  19: {
    title_vi: 'Tiền tệ & giá cả Hàn Quốc (원)',
    body_vi: 'Tiền tệ Hàn Quốc là 원 (won, ₩). Giá có thể trông lớn vì 1.000 won ≈ 0,75 USD. Một ly cà phê có thể là 4.500원, một bữa ăn 8.000~12.000원. 비싸다 (đắt) và 싸다 (rẻ) là những từ nhận xét then chốt. Khi bạn nhận tiền thối, khoản trả lại là 거스름돈. Giá ở chợ truyền thống thường có thể thương lượng — 깎아 주세요 (Xin bớt giá cho tôi) hoặc 더 싸게요? (Rẻ hơn được không?) mở đầu việc mặc cả.',
    tip_vi: { label: 'Đọc giá tiền Hàn Quốc', text: 'Tiếng Hàn dùng số Hán Hàn cho giá: 일(1) 이(2) 삼(3) 사(4) 오(5). 만 = 10.000. Vậy 삼만 오천 원 = 35.000 won. Thu ngân thường cho bạn xem số tiền trên máy tính hoặc màn hình để tránh nhầm lẫn — chỉ vào con số cũng hoàn toàn ổn.' }
  },
  24: { prompt_vi: '비싸다 nghĩa là…', choices_vi: ['rẻ', 'miễn phí', 'đắt', 'đang giảm giá'] },
  26: { prompt_vi: "Từ nào có nghĩa là 'tiền thối' (tiền trả lại cho bạn sau khi thanh toán)?", choices_vi: ['거스름돈', '비싸다', '할인', '원'] },
  27: {
    title_vi: 'Phương thức thanh toán (결제 방법)',
    body_vi: 'Hàn Quốc là một xã hội gần như không tiền mặt — hầu hết nơi chấp nhận thẻ tín dụng (신용카드) hoặc thẻ ghi nợ (체크카드), và thanh toán di động qua các ứng dụng như KakaoPay và Samsung Pay cực kỳ phổ biến. Tiền mặt (현금) vẫn được chấp nhận ở mọi nơi nhưng ít được dùng hơn. Khi thanh toán, bạn có thể được hỏi 카드요, 현금이요? (Thẻ hay tiền mặt?). Yêu cầu hóa đơn là 영수증 주세요. Bảng hoàn thuế (Tax Refund) tại cửa hàng nghĩa là bạn có thể xin lại VAT ở sân bay với tư cách khách du lịch.',
    tip_vi: { label: '카카오페이 & 삼성페이', text: 'KakaoPay (카카오페이) và Samsung Pay (삼성페이) là các ứng dụng thanh toán di động thống trị ở Hàn Quốc. Khách du lịch có thể dùng thẻ tín dụng quốc tế ở gần như mọi nơi. Hãy tìm biểu tượng thanh toán không tiếp xúc — mức độ sử dụng thanh toán không tiếp xúc của Hàn Quốc thuộc hàng cao nhất thế giới.' }
  },
  31: { prompt_vi: "Nói 'Tôi sẽ thanh toán bằng thẻ' như thế nào?", choices_vi: ['현금으로 드릴게요', '카드로 할게요', '거스름돈 주세요', '결제해 주세요'] },
  33: { message_vi: 'Bạn đã sẵn sàng mua sắm ở Hàn Quốc! Bạn biết từ vựng then chốt, các câu hỏi giá, mặc cả, kiểm tra hàng có sẵn và hoàn tất giao dịch thanh toán.' }
});
