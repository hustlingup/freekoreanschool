#!/usr/bin/env node
/* ═══════════════════════════════════════════════════════════════════════
   qa-triage-sample.cjs — Phase A triage sampler.

   Deterministically samples a small slice of every lesson JSON, tagged by
   content group, and emits one review file per language. The triage
   workflow then has a single native agent per language score each group,
   producing a quality heatmap that tells us WHERE deep review (Phase B) is
   worth paying for — instead of auditing 13k+ units on faith.

     node scripts/qa-triage-sample.cjs

   Writes scripts/_trans/qa/triage/<lang>.json for the 8 locales. Sampling
   is stride-based (no RNG) so the sample is reproducible run to run.
═══════════════════════════════════════════════════════════════════════ */
'use strict';
const fs = require('fs');
const path = require('path');
const { unitsFor } = require('./qa-translations.cjs');

const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'scripts', '_trans', 'qa', 'triage');
const LANGS = ['ja', 'zh-tw', 'es', 'de', 'fr', 'vi', 'th', 'id'];

// per-group sample size (vocabulary is the largest surface → sample more)
const N = { vocabulary: 20, _default: 12 };

// representative prose pages every native also reads and rates
const HTML = lang => [
  `learn/${lang}/hangul.html`,
  `culture/${lang}/kpop.html`,
  `travel/${lang}/cities.html`,
];

function groupOf(lessonId) {
  if (lessonId.startsWith('vocabulary-')) return 'vocabulary';
  if (lessonId === 'letter-writing' || lessonId === 'typing') return 'writing-typing';
  if (['hangul', 'syllable-blocks', 'pronunciation'].includes(lessonId)) return 'hangul';
  if (['grammar', 'speech-levels', 'pronouns', 'nouns'].includes(lessonId)) return 'grammar';
  return 'phrases';           // emotions, shopping, …
}

/* re-address a unit's localized value for an arbitrary language, reusing
   the structural `loc` the walker produced (same navigation as --apply) */
function localized(data, loc, lang) {
  const suffix = lang.replace('-', '_');   // code 'zh-tw' → field suffix '_zh_tw'
  let o = data;
  for (const s of loc.trail) o = ('k' in s) ? o[s.k] : o[s.i];
  let v = o[loc.field + '_' + suffix];
  if (v == null) return '';
  if (loc.kind === 'arrayEl') v = Array.isArray(v) ? v[loc.element] : '';
  else if (loc.kind === 'objSub') v = (v && typeof v === 'object') ? v[loc.subfield] : '';
  return typeof v === 'string' ? v : '';
}

// gather every unit across all lesson JSONs, tagged by group, keeping a
// handle on its source data object for per-language value lookup
const files = fs.readdirSync(path.join(ROOT, 'learn', 'data'))
  .filter(n => n.endsWith('.json') &&
    !/^(manifest|search-words|vocabulary)\.json$/.test(n));

const dataById = {};
const unitsByGroup = {};
files.forEach(fname => {
  const id = fname.replace(/\.json$/, '');
  const data = JSON.parse(fs.readFileSync(path.join(ROOT, 'learn', 'data', fname), 'utf8'));
  dataById[id] = data;
  const g = groupOf(id);
  const us = unitsFor(id, data);
  (unitsByGroup[g] = unitsByGroup[g] || []).push(...us);
});

// stride-sample each group to its cap
function sample(arr, cap) {
  if (arr.length <= cap) return arr.slice();
  const step = arr.length / cap, out = [];
  for (let i = 0; i < cap; i++) out.push(arr[Math.floor(i * step)]);
  return out;
}
const sampled = {};
Object.keys(unitsByGroup).forEach(g => {
  sampled[g] = sample(unitsByGroup[g], N[g] || N._default);
});

fs.mkdirSync(OUT, { recursive: true });
const summary = [];
LANGS.forEach(lang => {
  const groups = {};
  Object.keys(sampled).sort().forEach(g => {
    groups[g] = sampled[g].map(u => ({
      id: u.id,
      path: u.path,
      ko: u.ko,
      en: u.en,
      val: localized(dataById[u.loc.file], u.loc, lang),
    }));
  });
  const gapCount = Object.values(groups).flat().filter(x => !x.val).length;
  const total = Object.values(groups).flat().length;
  fs.writeFileSync(path.join(OUT, `${lang}.json`),
    JSON.stringify({ lang, htmlSamples: HTML(lang), groups }, null, 2) + '\n');
  summary.push(`  ${lang.padEnd(6)} ${total} sampled units, ${gapCount} empty (untranslated)`);
});

console.log(`Sampled ${Object.values(sampled).flat().length} units per language ` +
  `across ${files.length} lessons → ${path.relative(ROOT, OUT)}`);
console.log(`groups: ${Object.keys(sampled).sort().map(g => `${g}(${sampled[g].length})`).join(', ')}`);
console.log(summary.join('\n'));
