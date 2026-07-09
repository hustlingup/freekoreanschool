#!/usr/bin/env node
// Batch 04: Add _vi fields to hangul.json (example_meaning_vi + hint_vi)
'use strict';
const fs = require('fs');
const path = require('path');
const DATA = path.join(__dirname, '..', 'learn', 'data');

const p = path.join(DATA, 'hangul.json');
const data = JSON.parse(fs.readFileSync(p, 'utf8'));

const stageMap = {
  1: 'Phụ âm',
  2: 'Nguyên âm',
  3: 'Âm tiết',
  4: 'Ký tự đặc biệt',
  5: 'Nguyên âm ghép',
  6: 'Đọc từ',
};
for (const s of data.stages) if (stageMap[s.id]) s.name_vi = stageMap[s.id];

const stepMap = {
  // ── Consonants: example_meaning_vi ──
  1:  { example_meaning_vi: 'đi', hint_vi: 'Có hình dạng phần sau họng chặn luồng khí.' },
  2:  { example_meaning_vi: 'tôi', hint_vi: 'Có hình dạng đầu lưỡi chạm vào vòm miệng.' },
  3:  { example_meaning_vi: 'tất cả / mọi thứ', hint_vi: 'Như ㄴ nhưng có nóc — lưỡi chặn hoàn toàn vòm miệng.' },
  4:  { example_meaning_vi: 'lý do (tiền tố)', hint_vi: 'Âm bật lưỡi — nằm giữa âm \'r\' và \'l\'. Lưỡi chạm nhẹ vào vòm miệng.' },
  5:  { example_meaning_vi: 'trái tim / tâm trí', hint_vi: 'Có hình dạng môi khép lại để tạo âm \'m\'.' },
  6:  { example_meaning_vi: 'cơm / bữa ăn', hint_vi: 'Có hình dạng môi mở ra để phát âm \'b\' hoặc \'p\'.' },
  7:  { example_meaning_vi: 'người', hint_vi: 'Có hình dạng hai chiếc răng — không khí xì qua để tạo âm \'s\'.' },
  8:  { example_meaning_vi: 'trẻ em', hint_vi: 'Im lặng ở đầu âm tiết. Phát âm như \'ng\' ở cuối âm tiết.' },
  9:  { example_meaning_vi: 'bây giờ', hint_vi: 'Như \'j\' trong \'juice\'. Lưỡi ấn phía sau răng trên.' },
  10: { example_meaning_vi: 'trà / ô tô', hint_vi: 'Âm \'ch\' bật hơi — có một luồng khí thoát ra.' },
  11: { example_meaning_vi: 'cà phê', hint_vi: 'Âm \'k\' bật hơi — luồng khí mạnh. Cầm tờ giấy và nó sẽ bay phấp phới.' },
  12: { example_meaning_vi: 'cưỡi / lên (xe)', hint_vi: 'Âm \'t\' bật hơi — như \'t\' trong \'ten\'. Bật mạnh.' },
  13: { example_meaning_vi: 'hành lá', hint_vi: 'Âm \'p\' bật hơi — như \'p\' trong \'pot\'. Môi bật ra cùng luồng khí.' },
  14: { example_meaning_vi: 'bầu trời', hint_vi: 'Âm \'h\' nhẹ — như thở hơi ấm lên tay.' },
  // ── Vowels: hint_vi only ──
  22: { hint_vi: 'Mở miệng rộng, như khi nói \'ah\' tại bác sĩ.' },
  23: { hint_vi: 'Như \'ya\' trong \'yard\'. Nét thêm có nghĩa là thêm âm \'y\'.' },
  24: { hint_vi: 'Giống âm \'uh\' hoặc \'o\' trong \'the other\'. Môi hơi tròn.' },
  25: { hint_vi: 'Như \'yuh\' với môi tròn. Hai nét = tiền tố \'y\'.' },
  26: { hint_vi: 'Như \'o\' trong \'more\'. Tròn môi như thổi nến.' },
  27: { hint_vi: 'Như \'yo!\' — hai nét thêm âm \'y\'. Dùng nhiều trong lời nói.' },
  28: { hint_vi: 'Như \'oo\' trong \'boot\'. Nét hướng XUỐNG — miệng mở.' },
  29: { hint_vi: 'Như \'you\'. Hai nét hướng xuống biểu thị tiền tố \'y\'.' },
  30: { hint_vi: 'Như âm \'e\' khi không hài lòng: \'euugh\'. Môi dẹt.' },
  31: { hint_vi: 'Như \'ee\' trong \'bee\'. Nét dọc đơn giản — nguyên âm cao thuần túy.' },
  // ── Special consonants ──
  43: { hint_vi: 'Âm \'k\' căng — nín thở rồi bật ra. Không có luồng khí.' },
  44: { hint_vi: 'Âm \'t\' căng — cổ họng siết trước khi bật. Khác biệt với ㄷ và ㅌ.' },
  45: { hint_vi: 'Âm \'p\' căng — môi ép chặt trước khi bật ra. Không có không khí thoát.' },
  46: { hint_vi: 'Âm \'s\' căng — tiếng rít sắc và chặt. Dùng trong 있다 (tồn tại / có).' },
  47: { hint_vi: 'Âm \'j\' căng — sắc và đột ngột hơn ㅈ. Không có luồng khí.' },
  48: { hint_vi: 'Bật hơi — một luồng khí mạnh theo sau phụ âm.' },
  49: { hint_vi: 'Bật hơi — lưỡi bật ra khỏi vòm miệng cùng luồng khí.' },
  50: { hint_vi: 'Bật hơi — môi bật mở cùng tiếng phát. Như \'pot\'.' },
  51: { hint_vi: 'Âm \'ch\' bật hơi — như \'cheese\' ở đầu. Không khí thoát ra.' },
  52: { hint_vi: 'Phụ âm bật hơi nhẹ. Nhiều không khí nhất trong các phụ âm tiếng Hàn.' },
  // ── Compound vowels: hint_vi ──
  58: { hint_vi: 'ㅏ + ㅣ kết hợp. Như \'e\' trong \'bed\'. Tiếng Hàn hiện đại = giống 에.' },
  59: { hint_vi: 'ㅓ + ㅣ kết hợp. Như \'e\' trong \'bed\'. Ngày nay phát âm giống 애.' },
  60: { hint_vi: 'ㅑ + ㅣ. Hiếm — xuất hiện trong 얘 (đứa trẻ này, khẩu ngữ).' },
  61: { hint_vi: 'ㅕ + ㅣ. Như \'ye\' trong \'yes\'. 예쁘다 = đẹp.' },
  62: { hint_vi: 'ㅗ + ㅏ. Như \'wa\' trong \'water\'. 와! = Ồ!' },
  63: { hint_vi: 'ㅗ + ㅐ. Phát âm như \'wae\'. 왜 = tại sao.' },
  64: { hint_vi: 'ㅗ + ㅣ. Như \'we\'. 외국인 = người nước ngoài.' },
  65: { hint_vi: 'ㅜ + ㅓ. Như \'wuh\'. 뭐 = cái gì (khẩu ngữ).' },
  66: { hint_vi: 'ㅜ + ㅔ. Như \'we\'. Rất hiếm trong tiếng Hàn.' },
  67: { hint_vi: 'ㅜ + ㅣ. Như \'wee\'. 위 = phía trên / dạ dày.' },
  68: { hint_vi: 'ㅡ + ㅣ. Âm lướt độc đáo. 의사 = bác sĩ. Dùng như trợ từ sở hữu 의.' },
};

for (const s of data.steps) {
  const m = stepMap[s.id];
  if (!m) continue;
  if (m.example_meaning_vi !== undefined) s.example_meaning_vi = m.example_meaning_vi;
  if (m.hint_vi !== undefined) s.hint_vi = m.hint_vi;
}

fs.writeFileSync(p, JSON.stringify(data, null, 2), 'utf8');
console.log('✓ hangul.json\nBatch 04 complete.');
