#!/usr/bin/env node
/**
 * patch-vocab-ja-zhtw.cjs — fill the missing `_ja` / `_zh_tw` fields in
 * learn/data/vocabulary-*.json.
 *
 *   node scripts/patch-vocab-ja-zhtw.cjs
 *   node scripts/patch-vocab-ja-zhtw.cjs --check
 *
 * WHY. gen-lesson-static.cjs falls back to the English field when a
 * `<field>_<locale>` is absent, so 99 gaps for ja and 42 for zh_tw were
 * rendering English into the static word-bank reference embedded in
 * learn/{ja,zh-tw}/{vocabulary,vocabulary-browser,flashcard}.html — six pages
 * measuring 0.63–0.70 duplicate English by audit-learn-locale-dup.cjs.
 *
 * Fields whose English value is itself Korean (the proverb titles in
 * vocabulary-proverbs.json) are deliberately NOT patched — the Hangul is the
 * content being taught and must stay identical in every locale.
 *
 * IDEMPOTENT: only writes a `_ja`/`_zh_tw` key that is absent. Existing
 * translations are never overwritten. Preserves each file's line endings.
 *
 * AFTER RUNNING: `node scripts/gen-lesson-static.cjs` to re-render the static
 * blocks, then `node scripts/audit-learn-locale-dup.cjs` to confirm.
 */

'use strict';
const fs = require('fs');
const path = require('path');

const DATA = path.join(__dirname, '..', 'learn', 'data');
const CHECK = process.argv.includes('--check');

const JA = {
  "Academic Korean": "アカデミック韓国語",
  "Academic Complete!": "アカデミック編、修了！",
  "Korean Adjectives": "韓国語の形容詞",
  "Adjectives Complete!": "形容詞編、修了！",
  "Body Parts in Korean": "韓国語の体の部位",
  "Body Parts Complete!": "体の部位編、修了！",
  "Colors in Korean": "韓国語の色",
  "Colors Complete!": "色編、修了！",
  "Days & Time in Korean": "韓国語の曜日と時間",
  "Telling Time in Korean": "韓国語での時刻の言い方",
  "Days & Time Complete!": "曜日と時間編、修了！",
  "Emotions in Korean": "韓国語の感情表現",
  "Emotions Complete!": "感情編、修了！",
  "Family in Korean": "韓国語の家族の呼び方",
  "Family Complete!": "家族編、修了！",
  "Korean Food & Drink": "韓国の食べ物と飲み物",
  "Food & Drink Complete!": "食べ物と飲み物編、修了！",
  "Greetings in Korean": "韓国語のあいさつ",
  "Greetings Complete!": "あいさつ編、修了！",
  "Health in Korean": "韓国語の健康表現",
  "Health Complete!": "健康編、修了！",
  "Konglish — Korean + English": "コングリッシュ — 韓国語＋英語",
  "Konglish Complete!": "コングリッシュ編、修了！",
  "Korean Media & Entertainment": "韓国のメディアとエンターテインメント",
  "Media Complete!": "メディア編、修了！",
  "Korean News Vocabulary": "韓国語のニュース語彙",
  "News Complete!": "ニュース編、修了！",
  "Two Number Systems": "二つの数詞体系",
  "Sino-Korean Numbers": "漢字語数詞",
  "Korean Counters": "韓国語の助数詞",
  "Numbers Complete!": "数字編、修了！",
  "Places in Korean": "韓国語の場所の名前",
  "Places Complete!": "場所編、修了！",
  "Proverbs Complete!": "ことわざ編、修了！",
  "Shopping in Korea": "韓国での買い物",
  "Shopping Complete!": "買い物編、修了！",
  "Travel Korean": "旅行の韓国語",
  "Travel Complete!": "旅行編、修了！",
  "Korean Verbs": "韓国語の動詞",
  "Verbs Complete!": "動詞編、修了！",
  "Korean Weather": "韓国語の天気表現",
  "Weather Complete!": "天気編、修了！",
  "Workplace Korean": "職場の韓国語",
  "Workplace Complete!": "職場編、修了！",
  "Korean greetings change depending on who you are talking to and the situation. The most important distinction is formal vs. casual speech. Use formal forms with strangers, elders, and in professional settings. Casual forms are for friends and people younger than you.": "韓国語のあいさつは、相手が誰か、どんな場面かによって変わります。最も重要な区別は、フォーマルな言い方とくだけた言い方です。初対面の人、目上の人、仕事の場ではフォーマルな形を使います。くだけた形は友人や年下の相手に使います。",
  "Hello — formal, the most common greeting": "こんにちは — フォーマル。最もよく使われるあいさつ",
  "Hi / Bye (casual) — used with friends": "やあ／じゃあね（くだけた言い方）— 友人に使う",
  "Thank you — formal, very polite": "ありがとうございます — フォーマルで非常に丁寧",
  "I'm sorry — formal apology": "申し訳ありません — フォーマルな謝罪",
  "It's okay / Are you okay? — very versatile phrase": "大丈夫です／大丈夫ですか — 用途の広い便利な表現",
  "Nice to meet you — used when meeting someone for the first time": "はじめまして — 初対面のときに使う",
  "Goodbye — said to the person who is leaving": "さようなら — その場を去る相手に対して言う",
  "Fighting! / You can do it! — a Korean cheer of encouragement": "ファイティン！／頑張って！ — 韓国式の励ましのかけ声",
  "Body Parts": "体の部位",
  "Korean Food": "韓国の食べ物",
  "Rice / Meal — the cornerstone of Korean cuisine": "ご飯／食事 — 韓国料理の基本をなすもの",
  "Kimchi — fermented vegetables, Korea's most iconic side dish": "キムチ — 発酵させた野菜。韓国を象徴するおかず",
  "Bibimbap — mixed rice bowl with vegetables, egg, and gochujang": "ビビンバ — 野菜と卵、コチュジャンを混ぜて食べる丼料理",
  "Samgyeopsal — grilled pork belly, a classic Korean BBQ cut": "サムギョプサル — 焼いた豚バラ肉。韓国式焼肉の定番",
  "Tteokbokki — spicy rice cakes, a beloved Korean street food": "トッポッキ — 辛い餅料理。韓国で愛される屋台の味",
  "Colors": "色",
  "Places in Korea": "韓国の場所",
  "Travel Vocabulary": "旅行の語彙",
  "Whether you're booking a trip or navigating an airport, these travel words are essential. Korean airports and transit systems display signs in Korean and English, but knowing the Korean terms helps you ask questions confidently.": "旅行を予約するときも、空港を移動するときも、ここで扱う語彙は欠かせません。韓国の空港や交通機関の案内表示は韓国語と英語で併記されていますが、韓国語の用語を知っていれば自信を持って質問できます。",
  "Passport — keep it with you at all times when traveling": "パスポート — 旅行中は常に携帯しておくこと",
  "Reservation / Booking — used for hotels, restaurants, flights": "予約 — ホテル、レストラン、航空券などに使う",
  "Arrival — displayed on airport arrival boards": "到着 — 空港の到着案内板に表示される",
  "Departure — displayed on airport departure boards": "出発 — 空港の出発案内板に表示される",
  "How much is it? — essential shopping phrase": "いくらですか — 買い物に欠かせない表現",
  "Vocabulary Complete!": "語彙編、修了！",
};

const ZH_TW = {
  "Greetings in Korean": "韓語的問候語",
  "Korean greetings change depending on who you are talking to and the situation. The most important distinction is formal vs. casual speech. Use formal forms with strangers, elders, and in professional settings. Casual forms are for friends and people younger than you.": "韓語的問候語會隨著談話對象與場合而改變。最重要的區別在於敬語體與半語體。面對陌生人、長輩以及在正式場合時使用敬語體；半語體則用於朋友和比自己年幼的人。",
  "Hello — formal, the most common greeting": "你好 — 敬語體，最常用的問候語",
  "Hi / Bye (casual) — used with friends": "嗨／掰掰（半語體）— 對朋友使用",
  "Thank you — formal, very polite": "謝謝 — 敬語體，非常禮貌",
  "I'm sorry — formal apology": "對不起 — 正式的道歉用語",
  "It's okay / Are you okay? — very versatile phrase": "沒關係／你還好嗎 — 用途極廣的萬用句",
  "Nice to meet you — used when meeting someone for the first time": "很高興認識你 — 初次見面時使用",
  "Goodbye — said to the person who is leaving": "再見 — 對即將離開的人說",
  "Fighting! / You can do it! — a Korean cheer of encouragement": "加油！／你做得到！— 韓國式的加油打氣語",
  "Two Number Systems": "兩套數字系統",
  "Korean Counters": "韓語的量詞",
  "Family in Korean": "韓語的家族稱謂",
  "Body Parts": "身體部位",
  "Korean Food": "韓國食物",
  "Rice / Meal — the cornerstone of Korean cuisine": "飯／餐 — 韓國飲食的根本",
  "Kimchi — fermented vegetables, Korea's most iconic side dish": "泡菜 — 發酵蔬菜，韓國最具代表性的小菜",
  "Bibimbap — mixed rice bowl with vegetables, egg, and gochujang": "拌飯 — 加入蔬菜、雞蛋與辣椒醬拌勻的蓋飯",
  "Samgyeopsal — grilled pork belly, a classic Korean BBQ cut": "烤五花肉 — 韓式烤肉的經典部位",
  "Tteokbokki — spicy rice cakes, a beloved Korean street food": "辣炒年糕 — 廣受喜愛的韓國街頭小吃",
  "Colors": "顏色",
  "Places in Korea": "韓國的場所",
  "Travel Vocabulary": "旅遊詞彙",
  "Whether you're booking a trip or navigating an airport, these travel words are essential. Korean airports and transit systems display signs in Korean and English, but knowing the Korean terms helps you ask questions confidently.": "無論是預訂行程還是在機場找路，這些旅遊詞彙都不可或缺。韓國的機場與交通系統雖然以韓文和英文雙語標示，但認得韓文用語能讓你更有把握地開口詢問。",
  "Passport — keep it with you at all times when traveling": "護照 — 旅行期間務必隨身攜帶",
  "Reservation / Booking — used for hotels, restaurants, flights": "預訂 — 適用於飯店、餐廳與機票",
  "Arrival — displayed on airport arrival boards": "抵達 — 顯示於機場入境看板",
  "Departure — displayed on airport departure boards": "出發 — 顯示於機場出境看板",
  "How much is it? — essential shopping phrase": "多少錢？— 購物必備用語",
  "Korean Verbs": "韓語動詞",
  "Korean Adjectives": "韓語形容詞",
  "Vocabulary Complete!": "詞彙篇，完成！",
};

const TABLES = { ja: JA, zh_tw: ZH_TW };
const BASES = ['title', 'body', 'tip', 'meaning'];

let filled = 0, unmatched = new Set(), fileCount = 0;

for (const f of fs.readdirSync(DATA).filter((x) => /^vocabulary/.test(x))) {
  const abs = path.join(DATA, f);
  const raw = fs.readFileSync(abs, 'utf8');
  const crlf = raw.includes('\r\n');
  const json = JSON.parse(raw);
  let touched = false;

  for (const step of json.steps || []) {
    for (const base of BASES) {
      const en = step[base];
      if (typeof en !== 'string') continue;
      for (const [loc, table] of Object.entries(TABLES)) {
        const key = `${base}_${loc}`;
        if (typeof step[key] === 'string') continue;   // never overwrite
        if (/[가-힣]/.test(en)) continue;               // Korean stays Korean
        const v = table[en];
        if (!v) { unmatched.add(`${loc}: ${en.slice(0, 60)}`); continue; }
        step[key] = v;
        filled++;
        touched = true;
      }
    }
  }

  if (!touched) continue;
  fileCount++;
  if (CHECK) { console.log(`  DRIFT ${f}`); continue; }
  // These files round-trip byte-identically through JSON.stringify at indent 2,
  // so the diff stays limited to the added keys. Match the original's
  // trailing-newline state rather than imposing one.
  let out = JSON.stringify(json, null, 2) + (/\n$/.test(raw) ? '\n' : '');
  if (crlf) out = out.replace(/\n/g, '\r\n');
  fs.writeFileSync(abs, out, 'utf8');
}

console.log(`${filled} fields ${CHECK ? 'would be ' : ''}filled across ${fileCount} files`);
if (unmatched.size) {
  console.log(`\n${unmatched.size} English values had no table entry:`);
  for (const u of unmatched) console.log('  ' + u);
}
if (!CHECK && filled) console.log('\nNow run: node scripts/gen-lesson-static.cjs');
