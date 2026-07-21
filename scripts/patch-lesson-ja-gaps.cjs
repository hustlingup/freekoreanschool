#!/usr/bin/env node
/**
 * patch-lesson-ja-gaps.cjs — fill the remaining missing `_ja` fields in the
 * non-vocabulary lesson JSONs.
 *
 *   node scripts/patch-lesson-ja-gaps.cjs
 *   node scripts/patch-lesson-ja-gaps.cjs --check
 *
 * WHY. After the word-bank fixes, the only learn pages still measuring as
 * mostly-English were nine Japanese ones — grammar, hangul, shopping,
 * emotions, speech-levels, pronouns, nouns. Their `#lesson-static` block is
 * generated from these JSONs, and gen-lesson-static.cjs falls back to the
 * English field wherever `<field>_ja` is missing. 53 such gaps accounted for
 * all of it.
 *
 * Values whose English field is itself Korean are skipped — the Hangul is the
 * content being taught.
 *
 * IDEMPOTENT: only writes an absent key; never overwrites an existing
 * translation. Preserves each file's line endings and trailing-newline state.
 *
 * AFTER RUNNING: node scripts/gen-lesson-static.cjs
 */

'use strict';
const fs = require('fs');
const path = require('path');

const DATA = path.join(__dirname, '..', 'learn', 'data');
const CHECK = process.argv.includes('--check');
const FILES = ['grammar', 'hangul', 'shopping', 'emotions', 'speech-levels', 'pronouns', 'nouns'];
const BASES = ['title', 'body', 'tip', 'meaning', 'hint', 'example_meaning', 'message', 'question'];

const JA = {
  "Word Order — SOV": "語順 — SOV（主語・目的語・動詞）",
  "Korean follows Subject → Object → Verb (SOV) order. The verb always comes LAST.": "韓国語は「主語 → 目的語 → 動詞」（SOV）の語順に従います。動詞は必ず最後に来ます。",
  "Korean Particles": "韓国語の助詞",
  "Particles attach to nouns to show their role: topic, subject, object, location. They replace fixed word order.": "助詞は名詞に付いて、その名詞の役割（主題・主語・目的語・場所）を示します。語順を固定する代わりに助詞が働きます。",
  "Verbs — Dictionary Form": "動詞 — 辞書形",
  "Making Sentences Negative": "文を否定形にする",
  "Forming Questions": "疑問文の作り方",
  "Korean questions use the SAME word order as statements — just add rising intonation (↑) or a question mark.": "韓国語の疑問文は平叙文と語順がまったく同じです。語尾を上げるイントネーション（↑）か疑問符を加えるだけです。",
  "Essential Sentence Patterns": "必須の文型",
  "Master these 6 patterns to express the most common ideas in Korean conversations.": "この6つの文型を身につければ、韓国語の会話で最もよく使う考えを表現できます。",
  "Connectors": "接続詞",
  "These 4 conjunctions connect sentences. Place them at the START of the second sentence.": "この4つの接続詞は文と文をつなぎます。必ず後ろの文の文頭に置きます。",
  "And, With": "「〜と」「〜や」",
  "Use these particles between nouns (not sentences) to mean 'and' or 'with'.": "これらの助詞は（文ではなく）名詞と名詞の間に使い、「〜と」「〜や」の意味を表します。",
  "To/From Someone": "人に対する「〜に」「〜から」",
  "Use person-directional particles when giving to or receiving from people, not places.": "人に何かを与えたり人から受け取ったりするときは、場所用ではなく人用の方向助詞を使います。",
  "Telling Time": "時刻の言い方",
  "Counters": "助数詞",
  "Present Progressive": "現在進行形",
  "Self Introduction": "自己紹介",
  "Dates and Months": "日付と月",
  "Degree Adverbs": "程度を表す副詞",
  "Comparatives": "比較表現",
  "Still & Already": "「まだ」と「もう」",
  "Someone, Something": "「誰か」「何か」",
  "Combine question words with context to express indefinite ideas like 'someone' or 'nothing'.": "疑問詞を文脈と組み合わせることで、「誰か」「何も〜ない」といった不定の意味を表せます。",
  "Good/Poor At": "得意・不得意",
  "Grammar Complete!": "文法編、修了！",
  "hello / goodbye (informal)": "こんにちは／さようなら（くだけた言い方）",
  "school": "学校",
  "Korea": "韓国",
  "love": "愛",
  "water": "水",
  "rice / meal": "ご飯／食事",
  "person": "人",
  "friend": "友達",
  "sky": "空",
  "thank you (informal)": "ありがとう（くだけた言い方）",
  "You can read Korean!": "韓国語が読めるようになりました！",
  "Shopping Complete!": "買い物編、修了！",
  "You're ready to shop in Korea! You know the key vocabulary, phrases for asking prices, bargaining, checking availability, and completing payment transactions.": "これで韓国での買い物は万全です！主要な語彙に加え、値段の尋ね方、値切り方、在庫の確認、支払いを済ませるまでの表現が身につきました。",
  "Conjugating Emotion Adjectives": "感情形容詞の活用",
  "Common Emotional Sentence Patterns": "感情を表すよく使う文型",
  "Emotions Complete!": "感情編、修了！",
  "Korean Speech Levels Overview": "韓国語の敬語体系の概観",
  "Speech Level Comparison Chart": "語体の比較一覧",
  "Mixing Speech Levels — A Common Mistake": "語体を混ぜてしまう — よくある間違い",
  "Speech Levels Complete!": "敬語体系編、修了！",
  "Korean Pronouns Overview": "韓国語の代名詞の概観",
  "Saying 'You' in Korean": "韓国語で「あなた」をどう言うか",
  "Pronouns Complete!": "代名詞編、修了！",
  "Nouns Complete!": "名詞編、修了！",
  "You've covered the essential Korean nouns — people, places, objects, time words, counters, and possessives. Keep going with Pronouns next.": "韓国語の基本的な名詞——人・場所・物・時間を表す語・助数詞・所有表現——をひととおり学びました。次は代名詞に進みましょう。",
};

let filled = 0, files = 0;
const unmatched = new Set();

for (const name of FILES) {
  const abs = path.join(DATA, `${name}.json`);
  if (!fs.existsSync(abs)) { console.warn(`  missing ${name}.json`); continue; }
  const raw = fs.readFileSync(abs, 'utf8');
  const crlf = raw.includes('\r\n');
  const json = JSON.parse(raw);
  let touched = false;

  for (const step of json.steps || []) {
    for (const base of BASES) {
      const en = step[base];
      if (typeof en !== 'string') continue;
      if (typeof step[`${base}_ja`] === 'string') continue;
      if (/[가-힣]/.test(en)) continue;
      if (en.replace(/[^a-zA-Z]/g, '').length < 3) continue;
      const v = JA[en];
      if (!v) { unmatched.add(en.slice(0, 70)); continue; }
      step[`${base}_ja`] = v;
      filled++;
      touched = true;
    }
  }

  if (!touched) continue;
  files++;
  if (CHECK) { console.log(`  DRIFT ${name}.json`); continue; }
  let out = JSON.stringify(json, null, 2) + (/\n$/.test(raw) ? '\n' : '');
  if (crlf) out = out.replace(/\n/g, '\r\n');
  fs.writeFileSync(abs, out, 'utf8');
}

console.log(`${filled} ja fields ${CHECK ? 'would be ' : ''}filled across ${files} files`);
if (unmatched.size) {
  console.log(`\n${unmatched.size} English values had no table entry:`);
  for (const u of unmatched) console.log('  ' + u);
}
if (!CHECK && filled) console.log('\nNow run: node scripts/gen-lesson-static.cjs');
