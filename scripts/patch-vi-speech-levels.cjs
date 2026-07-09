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

patch('speech-levels.json', null, {
  1: {
    title_vi: 'Tổng quan về các cấp độ kính ngữ tiếng Hàn',
    body_vi: 'Tiếng Hàn có một hệ thống cấp độ kính ngữ (높임말) quyết định mức độ trang trọng hay lịch sự trong lời nói của bạn. Cấp độ bạn chọn phụ thuộc vào mối quan hệ xã hội, tuổi tác, cấp bậc và ngữ cảnh của cuộc trò chuyện. Ba cấp độ bạn gặp nhiều nhất là: 합쇼체 (kính ngữ trang trọng, dùng trong thuyết trình, quân đội và dịch vụ khách hàng), 해요체 (lịch sự hằng ngày, mặc định cho người lớn nói với những người quen không thân), và 반말 (nói thân mật, dùng với bạn thân và người nhỏ tuổi hơn). Dùng sai cấp độ có thể bị coi là bất lịch sự, lạnh lùng hoặc quá suồng sã.',
    tip_vi: { label: 'Vì sao cấp độ kính ngữ quan trọng ở Hàn Quốc', text: 'Hàn Quốc là một xã hội có tôn ti được định hình bởi các giá trị Nho giáo — tuổi tác, cấp bậc và mối quan hệ đều quyết định cách bạn nói. Dùng 반말 (nói thân mật) với người lạ hay người lớn tuổi là bất lịch sự. Dùng 합쇼체 quá trang trọng với bạn bè có thể gây cảm giác cứng nhắc và xa cách. Chọn đúng cấp độ là một kỹ năng xã hội then chốt.' }
  },
  2: {
    title_vi: '합쇼체 — Ngữ vực trang trọng',
    body_vi: '합쇼체 là cấp độ kính ngữ trang trọng cao nhất trong tiếng Hàn. Nó được dùng trong bản tin truyền hình, mệnh lệnh quân đội, thuyết trình trang trọng, lời nói của nhân viên khách sạn/hàng không và dịch vụ khách hàng. Đuôi động từ đổi thành -ㅂ니다 / -습니다 cho câu trần thuật và -ㅂ니까? / -습니까? cho câu hỏi. Từ vựng cũng thay đổi — 밥 (cơm) thành 식사, 있어요 thành 있습니다. Cấp độ này thể hiện sự tôn trọng và chuyên nghiệp tối đa.',
    tip_vi: { label: 'Nghe 합쇼체 ở đâu', text: 'Bật bản tin Hàn Quốc (KBS, MBC, SBS) và bạn sẽ nghe 합쇼체 xuyên suốt. Nhân viên khách sạn, thông báo hàng không, nghi lễ trang trọng và môi trường quân đội đều dùng cấp độ này. Nó cũng là cấp độ dùng trong văn bản trang trọng, dù văn phong viết thuần túy (문어체) có khác một chút.' }
  },
  6: { prompt_vi: '합쇼체 được mô tả đúng nhất là…', choices_vi: ['nói thân mật', 'cấp độ kính ngữ trang trọng nhất', 'lịch sự không trang trọng', 'tiếng lóng'] },
  7: {
    title_vi: 'Đuôi động từ 합쇼체 (-ㅂ니다/-습니다)',
    body_vi: 'Dấu hiệu đặc trưng của 합쇼체 là đuôi -ㅂ니다 / -습니다. Dùng -ㅂ니다 sau gốc động từ kết thúc bằng nguyên âm: 가다 → 갑니다 (Tôi đi). Dùng -습니다 sau gốc kết thúc bằng phụ âm: 먹다 → 먹습니다 (Tôi ăn). Với câu hỏi, đuôi đổi thành -ㅂ니까? / -습니까?: 가다 → 갑니까? (Bạn đi à?). Lưu ý phát âm: 갑니다 được đọc là [감니다] do đồng hóa âm mũi.',
    tip_vi: { label: 'Biến đổi phát âm trong -ㅂ니다', text: '갑니다 (Tôi đi) được viết là 갑니다 nhưng đọc là 감니다. Đó là vì ㅂ trước ㄴ chuyển thành ㅁ do đồng hóa âm mũi (cùng vị trí miệng, luồng hơi qua mũi). Quy luật này xuất hiện xuyên suốt các dạng 합쇼체.' }
  },
  10: {
    title_vi: '해요체 — Lời nói lịch sự hằng ngày',
    body_vi: "해요체 là cấp độ kính ngữ bạn sẽ dùng nhiều nhất trong đời sống tiếng Hàn hằng ngày. Nó đủ lịch sự với người lạ và người quen nhưng đủ ấm áp để nghe tự nhiên. Đuôi -아요 / -어요 / -해요 được thêm vào gốc động từ. 해요체 được dùng trong cửa hàng, với đồng nghiệp không quá thân, với người lớn bạn gặp lần đầu, và trong hầu hết tương tác giữa người học và người bản xứ. Đây là mức 'lịch sự mặc định' của tiếng Hàn.",
    tip_vi: { label: '해요체 là cài đặt mặc định của bạn', text: 'Khi phân vân, hãy dùng 해요체. Đó là cấp độ an toàn nhất và phù hợp phổ quát nhất ở Hàn Quốc. Bạn không bao giờ sai khi lịch sự và tôn trọng. Chuyển sang 합쇼체 hay 반말 chỉ nên xảy ra khi tình huống rõ ràng đòi hỏi.' }
  },
  15: { prompt_vi: '해요체 được mô tả đúng nhất là…', choices_vi: ['rất trang trọng / tiếng Hàn trên truyền hình', 'dạng thân mật nhất', 'lịch sự hằng ngày / lời nói mặc định của người lớn', 'kính ngữ cổ xưa'] },
  16: {
    title_vi: 'Mẫu -아요 / -어요',
    body_vi: 'Quy tắc đuôi 해요체: thêm -아요 nếu nguyên âm cuối của gốc là ㅏ hoặc ㅗ (nguyên âm sáng), và thêm -어요 cho các nguyên âm khác. Động từ 하다 dùng -해요 thay thế. Ví dụ: 가다 → 가 + 아요 = 가요 (rút gọn). 먹다 → 먹 + 어요 = 먹어요. 공부하다 → 공부해요. Trong thực tế, 아/어 thường rút gọn với nguyên âm cuối của gốc: 가 + 아요 → 가요, 오 + 아요 → 와요.',
    tip_vi: { label: 'Bảng nhanh', text: '가다 → 가요. 오다 → 와요. 먹다 → 먹어요. 마시다 → 마셔요. 하다 → 해요. 보다 → 봐요. 자다 → 자요. Các đuôi tuân theo quy luật hòa âm nguyên âm — hãy cố nhận ra sự phân biệt nguyên âm sáng/tối trong gốc.' }
  },
  18: { prompt_vi: "Dạng nào của 'Tôi đi' là 해요체 (lịch sự hằng ngày)?", choices_vi: ['가', '갑니다', '가요', '가라'] },
  19: {
    title_vi: '반말 — Lời nói thân mật',
    body_vi: "반말 (ban-mal, nghĩa đen là 'nửa lời') là ngữ vực thân mật dùng giữa bạn thân cùng độ tuổi, với người nhỏ tuổi hơn và trong gia đình. Nó bỏ -요 khỏi đuôi 해요체: 가요 → 가, 먹어요 → 먹어, 좋아요 → 좋아. 반말 có thể nghe bất lịch sự nếu dùng với người lớn tuổi hơn hoặc người lạ — hãy luôn bắt đầu bằng 해요체 và chỉ chuyển sang 반말 nếu người kia chủ động hoặc gợi ý rõ ràng. Trong K-drama, việc nhân vật chuyển từ 해요체 sang 반말 báo hiệu một sự thay đổi lớn về mức độ thân thiết.",
    tip_vi: { label: 'Xin phép để dùng 반말', text: "Một cách tự nhiên để xin phép: '말 놓아도 돼요?' (Tôi nói chuyện thoải mái được không?) hoặc '반말해도 돼요?' (Dùng 반말 có được không?). Bạn cũng có thể chờ người kia tự chuyển trước — đó là lời mời của bạn." }
  },
  24: { prompt_vi: 'Lời chào nào là 반말 (thân mật)?', choices_vi: ['안녕하세요', '안녕하십니까', '안녕', '반갑습니다'] },
  25: {
    title_vi: 'Khi nào dùng 반말 (và khi nào KHÔNG)',
    body_vi: 'Dùng 반말 với: bạn thân cùng độ tuổi, em ruột nhỏ tuổi hơn, học sinh nhỏ tuổi hơn, hoặc trẻ em. ĐỪNG dùng 반말 với: người lạ, bất kỳ ai lớn tuổi hơn bạn, sếp hay giáo viên của bạn, nhân viên phục vụ, hoặc người bạn vừa gặp (dù họ có vẻ trạc tuổi). Lỗi nhiều người học tiếng Hàn mắc phải là cho rằng vì ai đó thân thiện nên 반말 là phù hợp. Sự thân thiện và việc được phép dùng cấp độ kính ngữ là hai chuyện riêng — hãy luôn chờ một tín hiệu.',
    tip_vi: { label: 'Một ngoại lệ: tự nói với mình', text: 'Khi người Hàn tự nói với mình, lẩm bẩm hay viết nhật ký, họ dùng 반말 hoặc thậm chí một văn phong trung tính không có đuôi nào. Điều này tự nhiên và không hướng đến ai — nên không cần lịch sự. Đây cũng là lý do các đoạn độc thoại và suy nghĩ nội tâm trong phim ở dạng 반말.' }
  },
  26: { prompt_vi: 'Bạn đang nói chuyện với một người lạ trạc tuổi bạn trên phố. Bạn nên dùng cấp độ nào?', choices_vi: ['반말', '해요체', 'cái nào cũng được', 'chỉ 합쇼체'] },
  27: {
    title_vi: '문어체 — Văn phong viết/trang trọng',
    body_vi: "문어체 (mun-eo-che, 'văn phong ngôn ngữ viết') được dùng trong văn bản trang trọng — bài báo khoa học, bài báo tin tức, văn bản pháp lý và văn học. Đuôi động từ là -다 (dạng nguyên thể thường): 가다, 먹는다, 했다. Nó nghe thiếu tự nhiên trong hội thoại nói nhưng xuất hiện khắp nơi trong tiếng Hàn viết. Người học gặp điều này khi đọc văn bản tiếng Hàn và có thể thắc mắc vì sao nó khác với những gì được dạy — đó là vì sách giáo khoa dạy các ngữ vực nói, còn việc đọc đòi hỏi nhận ra 문어체.",
    tip_vi: { label: '문어체 và 합쇼체', text: 'Cả hai đều trang trọng, nhưng 합쇼체 dành cho lời nói (người nói tới người nghe) và 문어체 dành cho văn viết (không có người nghe cụ thể). Một người dẫn bản tin nói bằng 합쇼체. Một bài báo ở dạng 문어체. Trong K-drama, bạn sẽ nghe 문어체 khi nhân vật đọc to từ sách hoặc thư.' }
  },
  29: {
    title_vi: 'Bảng so sánh các cấp độ kính ngữ',
    body_vi: "Đây là cách cùng một ý xuất hiện qua các cấp độ kính ngữ. 'Tôi ăn': 먹습니다 (trang trọng 합쇼체) → 먹어요 (lịch sự 해요체) → 먹어 (thân mật 반말) → 먹는다 (văn viết 문어체). 'Cảm ơn': 감사합니다 (trang trọng) → 감사해요 (lịch sự) → 고마워 (thân mật). 'Tôi đi': 갑니다 (trang trọng) → 가요 (lịch sự) → 가 (thân mật) → 간다 (văn viết). Nhận ra những mẫu này sẽ giúp bạn xác định người nói đang dùng cấp độ nào khi bạn xem phim Hàn hoặc nghe người bản xứ nói.",
    tip_vi: { label: 'Dùng K-drama để luyện tai', text: 'K-drama là mỏ vàng để luyện tập cấp độ kính ngữ. Sếp nói 합쇼체 với nhóm của mình. Bạn bè chuyển sang 반말 với nhau. Các cảnh ở bệnh viện hay văn phòng dùng 해요체. Nếu bạn nhận thấy một sự thay đổi đột ngột về cấp độ kính ngữ giữa các nhân vật — đó là một khoảnh khắc kịch tính.' }
  },
  30: { prompt_vi: "감사합니다 là dạng ___ của 'cảm ơn'", choices_vi: ['반말', '해요체', '합쇼체', '문어체'] },
  31: { prompt_vi: 'Trong một buổi phỏng vấn xin việc ở Hàn Quốc, bạn nên dùng cấp độ kính ngữ nào?', choices_vi: ['반말', '해요체', '합쇼체', '문어체'] },
  32: {
    title_vi: 'Trộn lẫn các cấp độ kính ngữ — một lỗi thường gặp',
    body_vi: 'Một trong những lỗi phổ biến nhất của người học là trộn lẫn các cấp độ kính ngữ — dùng 먹어요 (해요체) ở câu này và 먹습니다 (합쇼체) ở câu tiếp theo. Người bản xứ nhận ra điều này ngay lập tức. Nó nghe như trộn lẫn trang trọng và thân mật trong cùng một hơi thở. Hãy chọn một cấp độ cho cuộc trò chuyện và giữ nguyên nó. Ngoại lệ duy nhất là chuyển đổi có chủ ý vì hiệu quả tu từ (như một email công việc mở đầu trang trọng và kết thúc ấm áp), nhưng ngay cả điều này cũng theo những mẫu rõ ràng.',
    tip_vi: { label: 'Đừng trộn đuôi giữa câu', text: 'Sai: 저는 학생이에요. 공부합니다. (Trộn 해요체 và 합쇼체). Đúng: 저는 학생이에요. 공부해요. (Toàn 해요체). Hoặc: 저는 학생입니다. 공부합니다. (Toàn 합쇼체). Sự nhất quán trong một cuộc trò chuyện thể hiện sự trôi chảy và ý thức xã hội.' }
  },
  33: { message_vi: 'Bạn đã làm chủ hệ thống cấp độ kính ngữ tiếng Hàn — 합쇼체 trang trọng, 해요체 hằng ngày, 반말 thân mật và 문어체 văn viết. Giờ bạn đã đủ khả năng đọc các tình huống xã hội và nói ở đúng cấp độ.' }
});
