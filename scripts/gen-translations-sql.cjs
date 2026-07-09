// Assembles docs/manual-translations-2026-07.sql.md from per-article translation
// JSON files in scripts/_trans/aN.json. Idempotent + resumable: regenerates the
// whole output from whatever aN.json files are present. Validates vocab JSON by
// construction. Never touches en/ko/ja.
const fs = require('fs');
const path = require('path');

const LANGS = ['zh_tw', 'es', 'de', 'fr', 'vi', 'th', 'id'];
const DUMP = require('../docs/articles-to-translate.json');
const TRANS_DIR = path.join(__dirname, '_trans');
const OUT = path.join(__dirname, '..', 'docs', 'manual-translations-2026-07.sql.md');

// dollar-quote: our content contains no `$` sequences that collide with $uN$,
// but assert anyway.
function dq(tag, val) {
  if (val == null) throw new Error('null value for ' + tag);
  if (String(val).includes('$u')) throw new Error('tag collision in value ' + tag);
  return `$${tag}$${val}$${tag}$`;
}

function buildVocab(orig, tData) {
  if (!Array.isArray(orig) || orig.length === 0) return null;
  if (!tData || !Array.isArray(tData.vocab) || tData.vocab.length !== orig.length) {
    throw new Error('vocab length mismatch');
  }
  return orig.map((entry, i) => {
    const t = tData.vocab[i];
    const merged = { ...entry };
    for (const l of LANGS) {
      if (!merged['definition_' + l]) merged['definition_' + l] = t.def[l];
      if (!merged['example_' + l]) merged['example_' + l] = t.ex[l];
    }
    return merged;
  });
}

function buildUpdate(n, art, tData) {
  const tag = 'u' + n;
  const sets = [];
  for (const l of LANGS) {
    sets.push(`  title_${l} = ${dq(tag, tData.title[l])}`);
    sets.push(`  summary_${l} = ${dq(tag, tData.summary[l])}`);
    sets.push(`  content_${l} = ${dq(tag, tData.content[l])}`);
  }
  const vocab = buildVocab(art.vocabulary, tData);
  if (vocab) {
    const json = JSON.stringify(vocab, null, 0);
    JSON.parse(json); // sanity
    sets.push(`  vocabulary = $${tag}$${json}$${tag}$::jsonb`);
  }
  return `UPDATE articles SET\n${sets.join(',\n')}\nWHERE slug = '${art.slug}';`;
}

const BATCHES = [
  [1, 7], [8, 14], [15, 21], [22, 28], [29, 35],
  [36, 42], [43, 49], [50, 56], [57, 63], [64, 67],
];

let out = `# Manual translations backfill — 67 legacy articles

Adds the 7 missing languages (zh_tw, es, de, fr, vi, th, id) to the 67 legacy
articles that only had en/ko/ja. Each article is one \`UPDATE ... WHERE slug\`.
Every value is dollar-quoted with a per-article tag (u1 … u67). Vocabulary is
rewritten as a full jsonb array with the 7 new definition_/example_ keys added.

en / ko / ja columns are never touched. Paste each SQL block below into the
Supabase SQL editor separately.

`;

let done = 0;
const present = [];
for (let b = 0; b < BATCHES.length; b++) {
  const [lo, hi] = BATCHES[b];
  out += `## Batch ${b + 1} (articles ${lo}–${hi})\n\n\`\`\`sql\n`;
  const stmts = [];
  for (let n = lo; n <= hi; n++) {
    const art = DUMP[n - 1];
    const f = path.join(TRANS_DIR, `a${n}.json`);
    if (!fs.existsSync(f)) continue;
    const tData = JSON.parse(fs.readFileSync(f, 'utf8'));
    stmts.push(buildUpdate(n, art, tData));
    done++;
    present.push(n);
  }
  out += (stmts.length ? stmts.join('\n\n') : `-- (articles ${lo}–${hi} pending)`) + '\n```\n\n';
}

fs.writeFileSync(OUT, out);
console.log('assembled', done, 'articles; present:', present.join(','));
const missing = [];
for (let n = 1; n <= 67; n++) if (!present.includes(n)) missing.push(n);
console.log('pending:', missing.length ? missing.join(',') : 'none');
