#!/usr/bin/env node
// Batch 05: Add _vi fields to syllable-blocks.json
'use strict';
const fs = require('fs');
const path = require('path');
const DATA = path.join(__dirname, '..', 'learn', 'data');

const p = path.join(DATA, 'syllable-blocks.json');
const data = JSON.parse(fs.readFileSync(p, 'utf8'));

const stageMap = {
  1: 'Cơ bản về khối âm tiết',
  2: 'Hình dạng nguyên âm',
  3: 'Tự xây dựng',
  4: 'Batchim',
  5: 'Đọc từ',
};
for (const s of data.stages) if (stageMap[s.id]) s.name_vi = stageMap[s.id];

// syllable-blocks uses example_meaning for card_reveal/reading_card and meaning for others
const stepMap = {
  4:  { example_meaning_vi: 'Hàn Quốc' },
  5:  { example_meaning_vi: 'Hàn Quốc' },
  6:  { example_meaning_vi: 'tiếng Hàn' },
  10: { example_meaning_vi: 'đi' },
  11: { example_meaning_vi: 'em bé / trẻ sơ sinh' },
  12: { example_meaning_vi: 'gan / đã đi' },
  16: { meaning_vi: 'bạn (thân mật)' },
  17: { meaning_vi: 'thời gian' },
  18: { meaning_vi: 'cảm ơn' },
  19: { meaning_vi: 'ai' },
  20: { meaning_vi: 'và' },
  26: { meaning_vi: 'ba — 바나나 (chuối)' },
  27: { meaning_vi: 'na — 나 (tôi)' },
  28: { meaning_vi: 'sa — 사랑 (tình yêu)' },
  29: { meaning_vi: 'ha — 하늘 (bầu trời)' },
  30: { meaning_vi: 'go — 고마워 (cảm ơn, thân mật)' },
  31: { meaning_vi: 'nu — 누구 (ai)' },
  32: { meaning_vi: 'mi — 미래 (tương lai)' },
  33: { meaning_vi: 'gi — 기다리다 (chờ đợi)' },
  35: { example_meaning_vi: 'núi' },
  36: { example_meaning_vi: 'trăng / tháng' },
  37: { example_meaning_vi: 'cơm / bữa ăn' },
  38: { example_meaning_vi: 'mùa xuân' },
  39: { example_meaning_vi: 'con đường / cách' },
  46: { example_meaning_vi: 'Hàn Quốc' },
  47: { example_meaning_vi: 'người' },
  48: { example_meaning_vi: 'trường học' },
  49: { example_meaning_vi: 'xin chào / bình an' },
  50: { example_meaning_vi: 'biết ơn' },
  51: { example_meaning_vi: 'tình yêu' },
  52: { example_meaning_vi: 'âm nhạc' },
  53: { example_meaning_vi: 'bạn bè' },
  54: { example_meaning_vi: 'gia đình' },
  55: { example_meaning_vi: 'biển / đại dương' },
  56: { example_meaning_vi: 'giấc mơ' },
};

for (const s of data.steps) {
  const m = stepMap[s.id];
  if (!m) continue;
  if (m.example_meaning_vi !== undefined) s.example_meaning_vi = m.example_meaning_vi;
  if (m.meaning_vi !== undefined) s.meaning_vi = m.meaning_vi;
}

fs.writeFileSync(p, JSON.stringify(data, null, 2), 'utf8');
console.log('✓ syllable-blocks.json\nBatch 05 complete.');
