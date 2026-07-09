#!/usr/bin/env node
// Batch 10: Fill remaining _th gaps in hangul.json and syllable-blocks.json
'use strict';
const fs = require('fs');
const path = require('path');
const DATA = path.join(__dirname, '..', 'learn', 'data');

// --- hangul.json: listen_repeat steps 74-83 ---
{
  const p = path.join(DATA, 'hangul.json');
  const data = JSON.parse(fs.readFileSync(p, 'utf8'));
  const stepMap = {
    74: { meaning_th: 'สวัสดี / ลาก่อน (ไม่เป็นทางการ)' },
    75: { meaning_th: 'โรงเรียน' },
    76: { meaning_th: 'เกาหลี' },
    77: { meaning_th: 'ความรัก' },
    78: { meaning_th: 'น้ำ' },
    79: { meaning_th: 'ข้าว / อาหาร' },
    80: { meaning_th: 'คน' },
    81: { meaning_th: 'เพื่อน' },
    82: { meaning_th: 'ท้องฟ้า' },
    83: { meaning_th: 'ขอบคุณ (ไม่เป็นทางการ)' },
  };
  for (const s of data.steps) {
    const m = stepMap[s.id];
    if (!m) continue;
    Object.entries(m).forEach(([k, v]) => { s[k] = v; });
  }
  fs.writeFileSync(p, JSON.stringify(data, null, 2), 'utf8');
  console.log('✓ hangul.json listen_repeat filled.');
}

// --- syllable-blocks.json: card_reveal example_meaning_th ---
{
  const p = path.join(DATA, 'syllable-blocks.json');
  const data = JSON.parse(fs.readFileSync(p, 'utf8'));
  const stepMap = {
    4:  { example_meaning_th: 'เกาหลี' },
    5:  { example_meaning_th: 'เกาหลี' },
    6:  { example_meaning_th: 'ภาษาเกาหลี' },
    10: { example_meaning_th: 'ไป' },
    11: { example_meaning_th: 'ทารก' },
    12: { example_meaning_th: 'ตับ / ไปแล้ว' },
    15: { example_meaning_th: 'ไป (ตัวอย่าง CV: ㄱ + ㅏ)' },
    16: { example_meaning_th: 'คุณ (ไม่เป็นทางการ)' },
    17: { example_meaning_th: 'เวลา' },
    18: { example_meaning_th: 'ขอบคุณ' },
    19: { example_meaning_th: 'ใคร' },
    20: { example_meaning_th: 'และ' },
    35: { example_meaning_th: 'ภูเขา' },
    36: { example_meaning_th: 'ดวงจันทร์ / เดือน' },
    37: { example_meaning_th: 'ข้าว / อาหาร' },
    38: { example_meaning_th: 'ฤดูใบไม้ผลิ' },
    39: { example_meaning_th: 'ถนน / ทาง' },
  };
  for (const s of data.steps) {
    const m = stepMap[s.id];
    if (!m) continue;
    Object.entries(m).forEach(([k, v]) => { s[k] = v; });
  }
  fs.writeFileSync(p, JSON.stringify(data, null, 2), 'utf8');
  console.log('✓ syllable-blocks.json example_meaning_th filled.');
}

console.log('Batch 10 complete.');
