#!/usr/bin/env node
// Batch 03: Add _vi fields to grammar.json + pronunciation.json
'use strict';
const fs = require('fs');
const path = require('path');
const DATA = path.join(__dirname, '..', 'learn', 'data');

function patch(file, stageMap, stepMap) {
  const p = path.join(DATA, file);
  const data = JSON.parse(fs.readFileSync(p, 'utf8'));
  for (const s of data.stages) if (stageMap[s.id]) s.name_vi = stageMap[s.id];
  for (const s of data.steps) {
    const m = stepMap[s.id];
    if (!m) continue;
    if (m.meaning_vi !== undefined) s.meaning_vi = m.meaning_vi;
  }
  fs.writeFileSync(p, JSON.stringify(data, null, 2), 'utf8');
  console.log('✓ ' + file);
}

// ── grammar.json ────────────────────────────────────────────────
patch('grammar.json',
  {
     1: 'Câu',
     2: 'Trợ từ',
     3: 'Chia động từ',
     4: 'Phủ định',
     5: 'Câu hỏi',
     6: 'Mẫu câu cốt lõi',
     7: 'Từ nối',
     8: 'Và/Cùng',
     9: 'Đến/Từ',
    10: 'Thời gian',
    11: 'Từ đếm',
    12: 'Tiếp diễn',
    13: 'Giới thiệu bản thân',
    14: 'Ngày tháng',
    15: 'Trạng từ',
    16: 'Danh từ hóa',
    17: 'So sánh',
    18: 'Thích',
    19: 'Vẫn/Đã',
    20: 'Bất định',
    21: 'Câu mệnh lệnh',
    22: 'Câu cấm',
    23: 'Phương pháp',
    24: 'Giỏi/Kém',
    25: 'Tất cả/Thêm',
    26: '-도 Nâng cao',
  },
  {
    2:  { meaning_vi: 'Tôi ăn cơm. (Chủ ngữ + Tân ngữ + Động từ)' },
    5:  { meaning_vi: 'Tôi là sinh viên. (는 = trợ từ chủ đề)' },
    7:  { meaning_vi: 'Mưa đến. / Trời đang mưa. (가 = trợ từ chủ ngữ)' },
    9:  { meaning_vi: 'Tôi uống cà phê ở quán cà phê. (에서 = nơi xảy ra hành động)' },
    13: { meaning_vi: 'Tôi đi / Hãy cùng đi. (가다 → 가요, hiện tại lịch sự)' },
    14: { meaning_vi: 'Tôi ăn / đang ăn. (먹다 → 먹어요, hiện tại lịch sự)' },
    17: { meaning_vi: 'Tôi đã đến Seoul.' },
    24: { meaning_vi: 'Tên bạn là gì?' },
    29: { meaning_vi: 'Trời mưa. Vì vậy tôi ở nhà.' },
    34: { meaning_vi: 'Bây giờ là mấy giờ?' },
    37: { meaning_vi: 'Cho tôi ba quả táo.' },
    40: { meaning_vi: 'Tôi đang ăn ngay lúc này.' },
    45: { meaning_vi: 'Thật sự ngon quá!' },
    48: { meaning_vi: 'Học tiếng Hàn thật thú vị.' },
    51: { meaning_vi: 'Tiếng Hàn khó hơn tiếng Nhật.' },
    60: { meaning_vi: 'Vui lòng nói chậm lại.' },
    68: { meaning_vi: 'Tiếng Hàn vừa khó vừa thú vị.' },
  }
);

// ── pronunciation.json ──────────────────────────────────────────
patch('pronunciation.json',
  {
    1: 'Batchim (받침)',
    2: 'Liên âm (연음화)',
    3: 'Đồng hóa mũi',
    4: 'Biến âm căng',
    5: 'Ngạc hóa & ㄹ',
    6: 'Lỗi thường gặp',
  },
  {
    3:  { meaning_vi: 'canh — nhóm batchim ㄱ, phát âm k (không bật hơi)' },
    4:  { meaning_vi: 'núi — nhóm batchim ㄴ, phát âm n' },
    5:  { meaning_vi: 'quần áo — nhóm batchim ㄷ (ㅅ→t), phát âm t (không bật hơi)' },
    6:  { meaning_vi: 'trăng — nhóm batchim ㄹ, phát âm l' },
    7:  { meaning_vi: 'đêm / hạt dẻ — nhóm batchim ㅁ, phát âm m' },
    8:  { meaning_vi: 'miệng — nhóm batchim ㅂ, phát âm p (không bật hơi)' },
    9:  { meaning_vi: 'sông — nhóm batchim ㅇ, phát âm ng' },
    10: { meaning_vi: 'gà — batchim kép ㄺ (ㄹ+ㄱ) → nhóm ㄱ → âm k' },
    11: { meaning_vi: 'hoa — batchim ㅊ thuộc nhóm ㄷ → âm t' },
    15: { meaning_vi: 'Tôi ăn / đang ăn — batchim ㄱ của 먹 liên âm với 어, nghe như 머거요' },
    16: { meaning_vi: 'cơm (dạng tân ngữ) — batchim ㅂ của 밥 liên âm với 을, nghe như 바블' },
    17: { meaning_vi: 'Tốt / Tôi thích — batchim ㅎ yếu đi và liên âm (xem giai đoạn 4 về quy tắc ㅎ)' },
    18: { meaning_vi: 'tiếng Hàn — batchim ㄱ của 국 liên âm với 어, nghe như 한구거' },
    23: { meaning_vi: 'là/thì (trang trọng) — ㅂ + ㄴ → ㅁ: viết 입니다, nghe như 임니다' },
    24: { meaning_vi: 'nước dùng — ㄱ + ㅁ → ㅇ: viết 국물, nghe như 궁물' },
    25: { meaning_vi: 'năm học / lớp — ㄱ + ㄴ → ㅇ: viết 학년, nghe như 항년' },
    26: { meaning_vi: 'đi bộ / đi dạo — ㄷ + ㄴ → ㄴ: viết 걷는다, nghe như 건는다' },
    27: { meaning_vi: 'sân trước — ㅂ + ㅁ → ㅁ: viết 앞마당, nghe như 암마당' },
    33: { meaning_vi: 'trường học — batchim ㄱ gây biến âm căng: ㄱ→ㄲ, nghe như 학꾜' },
    34: { meaning_vi: 'nhà hàng — batchim ㄱ gây biến âm căng: ㄷ→ㄸ, nghe như 식땅' },
    35: { meaning_vi: 'đóng — batchim ㄷ gây biến âm căng: ㄷ→ㄸ, nghe như 닫따' },
    36: { meaning_vi: 'lối vào — batchim ㅂ gây biến âm căng: ㄱ→ㄲ, nghe như 입꾸' },
    40: { meaning_vi: 'Tốt / Tôi thích — batchim ㅎ yếu đi: nghe như 조아요 (không phải 조하요)' },
    41: { meaning_vi: 'Có rất nhiều — ㅎ trong batchim ㄶ yếu đi: nghe như 마나요' },
    42: { meaning_vi: 'Tôi bỏ vào — batchim ㅎ yếu đi giữa các nguyên âm: nghe như 너어요' },
    44: { meaning_vi: 'thả ra / đặt — batchim ㅎ + ㄷ → ㅌ: viết 놓다, nghe như 노타' },
    47: { meaning_vi: 'cùng nhau — ㅌ + 이 → ㅊ: viết 같이, nghe như 가치' },
    48: { meaning_vi: 'cố tình / cứng đầu — ㄷ + 이 → ㅈ: viết 굳이, nghe như 구지' },
    52: { meaning_vi: 'mì ăn liền — ㄹ ở đầu (trước nguyên âm): âm r nhanh' },
    53: { meaning_vi: 'trăng — ㄹ là batchim cuối: âm l kéo dài' },
    54: { meaning_vi: 'nhanh chóng — ㄹㄹ kép: âm l kéo dài rồi r nhanh' },
    55: { meaning_vi: 'Tôi yêu bạn — ㄹ giữa các nguyên âm (랑→해): âm r nhanh' },
  }
);

console.log('\nBatch 03 complete.');
