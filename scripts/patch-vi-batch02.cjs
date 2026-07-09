#!/usr/bin/env node
// Batch 02: Add _vi fields to shopping.json + emotions.json + speech-levels.json
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

// ── shopping.json ───────────────────────────────────────────────
patch('shopping.json',
  { 1: 'Từ vựng mua sắm', 2: 'Trong cửa hàng', 3: 'Giá cả & Con số', 4: 'Giao dịch' },
  {
    2:  { meaning_vi: 'cửa hàng' },
    3:  { meaning_vi: 'chợ (ngoài trời truyền thống)' },
    4:  { meaning_vi: 'trung tâm thương mại / cửa hàng bách hóa' },
    5:  { meaning_vi: 'cửa hàng tiện lợi' },
    8:  { meaning_vi: 'quần áo / trang phục' },
    9:  { meaning_vi: 'giày dép' },
    11: { meaning_vi: 'Cái này bao nhiêu tiền?' },
    12: { meaning_vi: 'Cho tôi cái này / Tôi lấy cái này' },
    13: { meaning_vi: 'Làm ơn bớt giá / Bạn có thể giảm giá không?' },
    16: { meaning_vi: 'Có / Tôi có / Chúng tôi có (lịch sự)' },
    17: { meaning_vi: 'Không có / Chúng tôi không có / Hết hàng' },
    20: { meaning_vi: 'won — đồng tiền Hàn Quốc (₩)' },
    21: { meaning_vi: 'đắt' },
    22: { meaning_vi: 'rẻ / bình dân' },
    23: { meaning_vi: 'giảm giá / khuyến mãi' },
    25: { meaning_vi: 'tiền thừa (tiền trả lại sau khi thanh toán)' },
    28: { meaning_vi: 'Tôi trả bằng thẻ' },
    29: { meaning_vi: 'Tôi trả bằng tiền mặt (dạng khiêm nhường)' },
    30: { meaning_vi: 'Cho tôi hóa đơn' },
    32: { meaning_vi: 'Làm ơn giảm giá / Bớt giá cho tôi' },
  }
);

// ── emotions.json ───────────────────────────────────────────────
patch('emotions.json',
  { 1: 'Cảm xúc cơ bản', 2: 'Bày tỏ cảm xúc', 3: 'Cảm xúc phức tạp', 4: 'Cụm từ cảm xúc' },
  {
    2:  { meaning_vi: 'vui / hạnh phúc (dạng từ điển)' },
    3:  { meaning_vi: 'buồn (dạng từ điển)' },
    4:  { meaning_vi: 'tức giận (nghĩa đen: cơn giận bùng phát)' },
    5:  { meaning_vi: 'sợ hãi / đáng sợ' },
    8:  { meaning_vi: 'Tôi vui / Tôi hạnh phúc (hiện tại lịch sự)' },
    9:  { meaning_vi: 'Tôi buồn (hiện tại lịch sự)' },
    11: { meaning_vi: 'vui mừng / hân hoan' },
    12: { meaning_vi: 'lo lắng / bồn chồn' },
    13: { meaning_vi: 'mệt mỏi / kiệt sức' },
    14: { meaning_vi: 'hứng khởi / phấn khích' },
    17: { meaning_vi: 'Tôi cảm thấy tốt / Tôi đang vui' },
    20: { meaning_vi: 'nhớ ai đó/điều gì đó (khao khát)' },
    21: { meaning_vi: 'cô đơn' },
    22: { meaning_vi: 'xấu hổ / ngại ngùng' },
    23: { meaning_vi: 'tự hào / thỏa mãn (cảm giác ấm áp khi hoàn thành)' },
    25: { meaning_vi: 'cảm giác hồi hộp / tim đập nhanh (kỳ vọng lãng mạn)' },
    28: { meaning_vi: 'Tôi nhớ bạn / Tôi muốn gặp bạn' },
    29: { meaning_vi: 'Tôi đã xúc động / cảm động (về mặt cảm xúc)' },
    30: { meaning_vi: 'Tôi ổn / Không sao / Không có vấn đề gì' },
    32: { meaning_vi: 'Cố lên! / Kiên trì nào! (nghĩa đen: phát huy sức mạnh)' },
  }
);

// ── speech-levels.json ──────────────────────────────────────────
patch('speech-levels.json',
  { 1: '합쇼체 (Trang trọng)', 2: '해요체 (Lịch sự)', 3: '반말 (Thân mật)', 4: 'Chọn cấp độ nói' },
  {
    3:  { meaning_vi: 'là / thì — đuôi câu trần thuật trang trọng' },
    4:  { meaning_vi: 'Cảm ơn (trang trọng)' },
    5:  { meaning_vi: 'Xin chào? / Ngài có khỏe không? (lời chào trang trọng, dạng câu hỏi)' },
    8:  { meaning_vi: 'Tôi ăn / đang ăn (trang trọng)' },
    9:  { meaning_vi: 'Tôi đi / đang đi (trang trọng) — phát âm 감니다' },
    11: { meaning_vi: 'Xin chào / Chào (lịch sự, lời chào hàng ngày)' },
    12: { meaning_vi: 'Cảm ơn (lịch sự, ít trang trọng hơn 감사합니다)' },
    13: { meaning_vi: 'Tôi ăn / đang ăn (lịch sự)' },
    14: { meaning_vi: 'Tôi đi / đang đi (lịch sự)' },
    17: { meaning_vi: 'Tốt / Tôi thích (hiện tại lịch sự)' },
    20: { meaning_vi: 'Hi / Tạm biệt (lời chào và tạm biệt thân mật)' },
    21: { meaning_vi: 'Cảm ơn nhé (thân mật)' },
    22: { meaning_vi: 'ăn / tôi ăn (thân mật)' },
    23: { meaning_vi: 'đi / tôi đi (thân mật)' },
    28: { meaning_vi: 'là (liên từ, dạng viết/từ điển)' },
  }
);

console.log('\nBatch 02 complete.');
