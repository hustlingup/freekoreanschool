// For any match_quiz step that has `choices` but no `choices_es`, copy choices → choices_es.
// This covers Korean-only and romanization quizzes where no translation is needed.
const fs = require('fs');
const path = require('path');
const DATA = path.join(__dirname, '..', 'learn', 'data');

const FILES = [
  'hangul.json',
  'syllable-blocks.json',
  'pronunciation.json',
  'grammar.json',
  'nouns.json',
  'pronouns.json',
];

FILES.forEach(filename => {
  const file = path.join(DATA, filename);
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  let fixed = 0;
  data.steps.forEach(step => {
    if (step.type === 'match_quiz' && step.choices && !step.choices_es) {
      step.choices_es = step.choices;
      fixed++;
    }
  });
  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
  console.log(`✓ ${filename} — copied choices → choices_es on ${fixed} steps`);
});

console.log('\nDone! choices copy complete.');
