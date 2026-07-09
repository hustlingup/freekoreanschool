#!/usr/bin/env node
/**
 * gen-lesson-manifest.cjs
 * Generates learn/data/manifest.json from all lesson JSONs so the sidebar
 * progress grid never drifts from the real lesson inventory.
 *
 * Rerun after adding/removing lessons or changing step counts:
 *   node scripts/gen-lesson-manifest.cjs
 */
const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'learn', 'data');
const OUT_FILE = path.join(DATA_DIR, 'manifest.json');

// Static pages with no step JSON — completion via [data-lesson-complete] buttons
const STATIC_LESSONS = [
  { id: 'dialogues',        url: 'dialogues.html',        group: 'static' },
  { id: 'writing-essays',   url: 'writing-essays.html',   group: 'static' },
  { id: 'business-korean',  url: 'business-korean.html',  group: 'static' },
  { id: 'classical-korean', url: 'classical-korean.html', group: 'static' },
];

const lessons = [];

for (const file of fs.readdirSync(DATA_DIR).sort()) {
  if (!file.endsWith('.json') || file === 'manifest.json') continue;
  // vocabulary.json is orphaned: vocabulary.html only loads vocabulary-<cat>.json
  if (file === 'vocabulary.json') continue;
  const data = JSON.parse(fs.readFileSync(path.join(DATA_DIR, file), 'utf8'));
  if (!data.lesson || !Array.isArray(data.steps)) continue;

  const id = data.lesson;
  const isVocabTopic = id.startsWith('vocab-');
  const steps = data.steps.length;
  // trailing lesson_complete step is not countable progress
  const completeSteps = data.steps.filter(s => s.type === 'lesson_complete').length;

  lessons.push({
    id,
    url: isVocabTopic
      ? 'vocabulary.html?cat=' + id.slice('vocab-'.length)
      : path.basename(file, '.json') + '.html',
    steps,
    countable: steps - completeSteps,
    stages: Array.isArray(data.stages) ? data.stages.length : 1,
    group: isVocabTopic ? 'vocab' : 'core',
  });
}

lessons.push(...STATIC_LESSONS.map(l => ({ ...l, steps: 0, countable: 0, stages: 0 })));

const manifest = { generated: new Date().toISOString().slice(0, 10), lessons };
fs.writeFileSync(OUT_FILE, JSON.stringify(manifest, null, 2) + '\n');
console.log(`Wrote ${OUT_FILE}: ${lessons.length} lessons (${lessons.filter(l => l.group === 'core').length} core, ${lessons.filter(l => l.group === 'vocab').length} vocab, ${STATIC_LESSONS.length} static)`);
