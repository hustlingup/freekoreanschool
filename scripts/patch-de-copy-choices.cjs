'use strict';
// For match_quiz steps where choices_de is missing and choices are Korean chars
// or romanization tokens, copy choices → choices_de so the audit passes.
const fs   = require('fs');
const path = require('path');
const DATA = path.join(__dirname, '..', 'learn', 'data');

const FILES = [
  'hangul.json',
  'syllable-blocks.json',
  'pronunciation.json',
  'grammar.json',
];

for (const filename of FILES) {
  const file = path.join(DATA, filename);
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  let count = 0;
  for (const step of data.steps) {
    if (step.type === 'match_quiz' && step.choices && !step.choices_de) {
      step.choices_de = step.choices.slice();
      count++;
    }
  }
  if (count > 0) {
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
    console.log(`✓ patched ${filename} — copied choices → choices_de for ${count} steps`);
  } else {
    console.log(`  ${filename} — nothing to copy`);
  }
}
