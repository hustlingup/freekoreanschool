#!/usr/bin/env node
// Batch 01: Add _vi fields to nouns.json + pronouns.json
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
    if (m.example_meaning_vi !== undefined) s.example_meaning_vi = m.example_meaning_vi;
    if (m.hint_vi !== undefined) s.hint_vi = m.hint_vi;
  }
  fs.writeFileSync(p, JSON.stringify(data, null, 2), 'utf8');
  console.log('✓ ' + file);
}

// ── nouns.json ──────────────────────────────────────────────────
patch('nouns.json',
  { 1: 'Người & Gia đình', 2: 'Địa điểm & Thời gian', 3: 'Đồ vật & Từ đếm', 4: 'Sở hữu' },
  {
    2:  { meaning_vi: 'người / con người' },
    3:  { meaning_vi: 'đàn ông / con trai' },
    4:  { meaning_vi: 'phụ nữ / con gái' },
    5:  { meaning_vi: 'trẻ em / đứa bé' },
    6:  { meaning_vi: 'bạn bè' },
    9:  { meaning_vi: 'cha (trang trọng)' },
    10: { meaning_vi: 'mẹ (trang trọng)' },
    12: { meaning_vi: 'nhà / nhà ở' },
    13: { meaning_vi: 'trường học' },
    14: { meaning_vi: 'nhà hàng / căng tin' },
    15: { meaning_vi: 'bệnh viện / phòng khám' },
    18: { meaning_vi: 'hôm nay' },
    21: { meaning_vi: 'sách' },
    22: { meaning_vi: 'túi xách / ba lô' },
    23: { meaning_vi: 'tiền' },
    26: { meaning_vi: 'ba người (명 = từ đếm người)' },
    29: { meaning_vi: 'túi của tôi (lịch sự)' },
    30: { meaning_vi: 'bạn của tôi (thân mật)' },
    32: { meaning_vi: 'nhà của bạn' },
  }
);

// ── pronouns.json ───────────────────────────────────────────────
patch('pronouns.json',
  { 1: 'Ngôi thứ nhất & thứ hai', 2: 'Ngôi thứ ba & Chúng tôi', 3: 'Đại từ chỉ định', 4: 'Đại từ nghi vấn' },
  {
    2:  { meaning_vi: 'tôi (lịch sự)' },
    3:  { meaning_vi: 'tôi (thân mật)' },
    4:  { meaning_vi: 'tôi (chủ ngữ, lịch sự) — 저 + trợ từ chủ ngữ 가 → 제가' },
    5:  { meaning_vi: 'bạn (thân mật) — hiếm khi dùng với người lớn' },
    8:  { meaning_vi: 'tôi (chủ đề, lịch sự) — 저 + trợ từ chủ đề 는 → 저는' },
    11: { meaning_vi: 'chúng ta / của chúng ta (thường dùng như \'của tôi\' cho đồ chung)' },
    12: { meaning_vi: 'chúng tôi / của chúng tôi (khiêm tốn, lịch sự của 우리)' },
    13: { meaning_vi: 'người đó (= anh ấy / cô ấy, cách thân mật)' },
    14: { meaning_vi: 'họ (dạng văn viết)' },
    16: { meaning_vi: 'đất nước của tôi/chúng ta (Hàn Quốc) — nghĩa đen \'đất nước của chúng ta\'' },
    19: { meaning_vi: 'cái này — gần người nói' },
    20: { meaning_vi: 'cái đó — gần người nghe hoặc đã đề cập' },
    21: { meaning_vi: 'cái kia — xa cả hai' },
    22: { meaning_vi: 'cái này (dạng thân mật của 이것)' },
    24: { meaning_vi: 'đây (gần người nói)' },
    27: { meaning_vi: 'ai' },
    28: { meaning_vi: 'cái gì (trang trọng)' },
    29: { meaning_vi: 'cái gì (thân mật, rất phổ biến)' },
    30: { meaning_vi: 'ở đâu' },
  }
);

console.log('\nBatch 01 complete.');
