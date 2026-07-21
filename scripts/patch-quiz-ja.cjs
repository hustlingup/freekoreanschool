#!/usr/bin/env node
/**
 * patch-quiz-ja.cjs — add `prompt_ja` / `choices_ja` to every match_quiz step.
 *
 *   node scripts/patch-quiz-ja.cjs
 *   node scripts/patch-quiz-ja.cjs --check
 *
 * WHY. Japanese is the ONLY locale with no quiz translations: match_quiz steps
 * already carry prompt_/choices_ for zh_tw, es, fr, de, th, id and vi. With ja
 * missing, gen-lesson-static.cjs fell back to English, leaving the quiz Q&A of
 * eight otherwise-Japanese pages (grammar, hangul, emotions, shopping,
 * speech-levels, pronouns, nouns, syllable-blocks) in English — the last
 * source of duplicate English prose on any indexed learn page.
 *
 * CHOICES are translated element-wise against the same table, and any choice
 * with no entry is passed through UNCHANGED. That is deliberate: most choices
 * are romanizations (`hak-gyo`, `im-ni-da`), single jamo, or IPA-ish glosses
 * that must stay identical in every locale, exactly like the Hangul.
 *
 * IDEMPOTENT: never overwrites an existing prompt_ja/choices_ja.
 * Preserves line endings and trailing-newline state.
 *
 * AFTER RUNNING: node scripts/gen-lesson-static.cjs
 */

'use strict';
const fs = require('fs');
const path = require('path');

const DATA = path.join(__dirname, '..', 'learn', 'data');
const CHECK = process.argv.includes('--check');

const PROMPT = {
  "Which word means 'to be happy'?": "「うれしい」を意味する語はどれでしょう。",
  "Which word means 'to be tired'?": "「疲れている」を意味する語はどれでしょう。",
  "In a Korean sentence, the verb always comes...": "韓国語の文では、動詞は必ず…に来ます。",
  "'I don't eat' — short negation form": "「食べません」— 短い否定形",
  "'Where' in Korean?": "韓国語で「どこ」は？",
  "Soft contrast or topic shift — most common in spoken Korean?": "やわらかい対比や話題の転換 — 話し言葉で最もよく使われるのは？",
  "Hours in Korean time use which number system?": "韓国語の「〜時」にはどちらの数詞を使いますか。",
  "Counter for people (neutral)?": "人を数える助数詞（中立的なもの）は？",
  "How to say 'more' in a Korean comparison?": "韓国語の比較表現で「もっと」はどう言いますか。",
  "'Please don't speak' in Korean?": "韓国語で「話さないでください」は？",
  "ㄱ romanizes as…": "ㄱ のローマ字表記は…",
  "Which consonant is SILENT at the start of a syllable?": "音節の頭で無音になる子音はどれでしょう。",
  "ㄴ romanizes as…": "ㄴ のローマ字表記は…",
  "Which consonant sounds like 'j' in 'juice'?": "「juice」の j のような音になる子音はどれでしょう。",
  "ㅁ romanizes as…": "ㅁ のローマ字表記は…",
  "ㄹ romanizes as…": "ㄹ のローマ字表記は…",
  "Which vowel sounds like 'a' (as in 'father')?": "「father」の a のような音になる母音はどれでしょう。",
  "Which vowel sounds like 'o' (as in 'more')?": "「more」の o のような音になる母音はどれでしょう。",
  "Which vowel sounds like 'ee' (as in 'bee')?": "「bee」の ee のような音になる母音はどれでしょう。",
  "ㅠ romanizes as…": "ㅠ のローマ字表記は…",
  "ㅡ sounds like…": "ㅡ の音は…",
  "ㄲ romanizes as…": "ㄲ のローマ字表記は…",
  "ㅃ romanizes as…": "ㅃ のローマ字表記は…",
  "Aspirated consonants are produced with…": "激音は何を伴って発音されますか。",
  "ㅉ romanizes as…": "ㅉ のローマ字表記は…",
  "ㅘ romanizes as…": "ㅘ のローマ字表記は…",
  "ㅢ romanizes as…": "ㅢ のローマ字表記は…",
  "Which compound vowel uses ㅗ + ㅣ?": "ㅗ ＋ ㅣ からなる合成母音はどれでしょう。",
  "Which word means 'friend'?": "「友達」を意味する語はどれでしょう。",
  "Which word means 'school'?": "「学校」を意味する語はどれでしょう。",
  "Which word means 'today'?": "「今日」を意味する語はどれでしょう。",
  "Which word means 'money'?": "「お金」を意味する語はどれでしょう。",
  "Which counter is used for people (counting persons)?": "人を数えるときに使う助数詞はどれでしょう。",
  "How do you say 'my bag' in polite Korean?": "丁寧な韓国語で「私のかばん」はどう言いますか。",
  "Which pronoun is the polite form of 'I'?": "「私」の謙譲・丁寧な形の代名詞はどれでしょう。",
  "Which form of 'we' is more humble and polite, used toward seniors?": "目上の人に対して使う、より謙虚で丁寧な「私たち」はどれでしょう。",
  "Which demonstrative refers to something far from BOTH the speaker AND the listener?": "話し手からも聞き手からも遠いものを指す指示語はどれでしょう。",
  "Which question pronoun means 'who'?": "「誰」を意味する疑問代名詞はどれでしょう。",
  "ㅋ (kh), ㄲ (kk), and ㄳ are all batchim in the same group. Which sound group are they in?": "ㅋ（kh）、ㄲ（kk）、ㄳ はいずれも同じグループのパッチムです。どの音のグループでしょう。",
  "ㅂ (or ㅍ) batchim followed by ㄴ or ㅁ changes to which sound?": "ㅂ（または ㅍ）のパッチムの後に ㄴ や ㅁ が続くと、どの音に変わりますか。",
  "ㄱ batchim followed by ㄴ or ㅁ changes to which sound?": "ㄱ のパッチムの後に ㄴ や ㅁ が続くと、どの音に変わりますか。",
  "What sound does ㅎ + ㄷ (or ㄷ + ㅎ) produce?": "ㅎ ＋ ㄷ（または ㄷ ＋ ㅎ）はどの音になりますか。",
  "When pronouncing ㅡ, your lips should be…": "ㅡ を発音するとき、唇はどうなっているべきでしょう。",
  "Which word means 'market' (traditional outdoor market)?": "「市場」（伝統的な露天市場）を意味する語はどれでしょう。",
  "How do you ask 'How much is it?' in Korean?": "韓国語で「いくらですか」はどう尋ねますか。",
  "Which word means 'change' (money returned to you after paying)?": "「おつり」（支払い後に返ってくるお金）を意味する語はどれでしょう。",
  "How do you say 'I'll pay by card'?": "「カードで払います」はどう言いますか。",
  "You're talking to a stranger your same age on the street. Which level should you use?": "路上で同年代の見知らぬ人に話しかけます。どの語体を使うべきでしょう。",
  "In a job interview in Korea, which speech level should you use?": "韓国の就職面接では、どの語体を使うべきでしょう。",
  "Every Korean syllable block contains exactly how many vowels?": "韓国語の音節ブロックには、母音がちょうどいくつ含まれますか。",
  "The INITIAL consonant position (first consonant) is called…": "初声（最初の子音）の位置は何と呼ばれますか。",
  "When a syllable starts with a VOWEL sound, you write __ as a placeholder initial consonant.": "音節が母音の音で始まるとき、初声の位置にはプレースホルダーとして __ を書きます。",
  "With a TALL vowel like ㅏ, ㅓ, or ㅣ — where does the initial consonant go?": "ㅏ・ㅓ・ㅣ のような縦長の母音の場合、初声はどこに置きますか。",
  "With a WIDE vowel like ㅗ, ㅜ, or ㅡ — where does the initial consonant go?": "ㅗ・ㅜ・ㅡ のような横長の母音の場合、初声はどこに置きますか。",
  "Which of these is a WIDE (horizontal) vowel?": "次のうち横長（水平）の母音はどれでしょう。",
  "Which phrase means 'Hello' in the most formal way?": "最もフォーマルな「こんにちは」はどれでしょう。",
  "How do you say 'Thank you' in the most formal Korean?": "最もフォーマルな韓国語で「ありがとうございます」はどう言いますか。",
  "You are telling someone your age in Korean. Which number system do you use?": "韓国語で自分の年齢を伝えます。どちらの数詞を使いますか。",
  "A female speaker calls her older brother ___.": "女性が自分の兄を呼ぶときは ___ と言います。",
  "Which Korean word means 'ear'?": "「耳」を意味する韓国語はどれでしょう。",
  "Where do you go in Korea to buy medicine?": "韓国で薬を買うにはどこへ行きますか。",
  "How do you say 'airport' in Korean?": "韓国語で「空港」はどう言いますか。",
  "Which verb means 'to drink'?": "「飲む」を意味する動詞はどれでしょう。",
  "Which adjective means 'difficult' or 'hard'?": "「難しい」を意味する形容詞はどれでしょう。",
};

const CHOICE = {
  "I feel bad": "気分が悪い", "I feel good": "気分がいい", "I am hungry": "おなかがすいた",
  "I am tired": "疲れた", "to be glad": "うれしい", "to miss someone (longing)": "恋しい・会いたい",
  "to be tired": "疲れている", "to be lonely": "寂しい", "to be embarrassed": "恥ずかしい",
  "to feel proud/fulfilled": "誇らしい・充実している", "to miss someone": "人が恋しい",
  "I am fine": "大丈夫です", "I am moved": "感動した", "I miss you / I want to see you": "会いたい",
  "I am lonely": "寂しい", "Last": "最後", "First": "最初", "Second": "二番目", "Anywhere": "どこでも",
  "Topic": "主題", "Subject": "主語", "Object": "目的語", "Location": "場所",
  "Location of action": "動作の場所", "Destination": "目的地", "Either one": "どちらでも",
  "Arabic numerals": "アラビア数字", "A negative verb": "否定の動詞", "A positive verb": "肯定の動詞",
  "An adjective only": "形容詞のみ", "Past tense only": "過去形のみ", "A noun phrase": "名詞句",
  "Past tense": "過去形", "Future tense": "未来形", "A question": "疑問文",
  "Still / Not yet": "まだ", "Already": "もう", "Even": "〜さえ", "More": "もっと",
  "No air": "息を伴わない", "A strong puff of air": "強い息の放出", "A tense throat": "喉の緊張",
  "A nasal sound": "鼻音", "what": "何", "who": "誰", "why": "なぜ", "where": "どこ",
  "subject marker": "主格助詞", "'s (possession)": "〜の（所有）", "object marker": "目的格助詞",
  "plural suffix": "複数を表す接尾辞", "It means 'enemy'": "「敵」という意味になる",
  "It can sound cold or confrontational": "冷たく、対立的に響くことがある",
  "It only works in writing": "書き言葉でしか使えない", "It is too casual": "くだけすぎている",
  "someone else's mom": "他人の母親", "my mom": "自分の母親", "the teacher": "先生",
  "a stranger": "見知らぬ人", "ㄴ-group (n)": "ㄴ グループ（n）", "ㄱ-group (k)": "ㄱ グループ（k）",
  "ㅂ-group (p)": "ㅂ グループ（p）", "ㄷ-group (t)": "ㄷ グループ（t）",
  "No sound — ㅇ is always silent": "無音 — ㅇ は常に発音されない",
  "ng (like 'sing')": "ng（「sing」のような音）", "Any consonant": "どの子音でも",
  "Silent ㅇ (vowel-initial syllable)": "無音の ㅇ（母音で始まる音節）",
  "ㄴ or ㅁ only": "ㄴ か ㅁ のみ", "An aspirated consonant": "激音",
  "Nasal batchim (ㄴ, ㅁ, ㅇ)": "鼻音のパッチム（ㄴ・ㅁ・ㅇ）",
  "Unreleased stop batchim (ㄱ, ㄷ, ㅂ groups)": "内破する閉鎖音のパッチム（ㄱ・ㄷ・ㅂ グループ）",
  "The ㄹ batchim only": "ㄹ のパッチムのみ", "Any batchim consonant": "どのパッチム子音でも",
  "Rounded like 'oo'": "「oo」のように丸める",
  "Flat and unrounded (spread)": "平らで丸めない（横に引く）",
  "Slightly open like 'ah'": "「ah」のように少し開く", "Puckered like a kiss": "キスのようにすぼめる",
  "Plain 's' as in 'see'": "「see」のような平音の s", "'sh' as in 'she'": "「she」のような sh",
  "'z' as in 'zero'": "「zero」のような z", "'t' as in 'tea'": "「tea」のような t",
  "We have it": "あります", "How much?": "いくらですか",
  "There isn't any / We don't have it": "ありません", "Yes please": "お願いします",
  "to be cheap": "安い", "to be free": "無料である", "to be expensive": "高い",
  "to be on sale": "セール中である", "casual speech": "くだけた言い方",
  "the most formal speech level": "最もフォーマルな語体", "informal polite": "打ち解けた丁寧体",
  "slang": "俗語", "very formal / broadcast Korean": "非常にフォーマル／放送で使う韓国語",
  "the most casual form": "最もくだけた形",
  "everyday polite / default adult speech": "日常の丁寧体／大人の標準的な話し方",
  "archaic honorific": "古風な敬語", "both are fine": "どちらでもよい",
  "Zero": "ゼロ", "Exactly one": "ちょうど一つ", "One or two": "一つか二つ",
  "As many as needed": "必要なだけ", "V only": "母音のみ",
  "VC (silent ㅇ + vowel + final)": "VC（無音の ㅇ ＋ 母音 ＋ 終声）",
  "On top": "上", "To the left": "左", "To the right": "右", "At the bottom": "下",
  "Wide horizontal": "横長", "Tall vertical": "縦長", "Compound wide": "合成の横長",
  "Silent": "無音", "Above the vowel": "母音の上",
  "To the right of the vowel": "母音の右", "At the bottom, below everything": "一番下、すべての下",
  "Beside the initial consonant": "初声の横", "Either one is fine": "どちらでもよい",
  "Neither — use English numbers": "どちらでもない — 英語の数字を使う",
  "Spicy tofu stew": "辛い豆腐チゲ", "Korean BBQ beef": "韓国式焼き肉（牛）",
  "Cold noodles": "冷麺", "Grilled pork belly": "焼いた豚バラ肉",
  "ㄷ (plain)": "ㄷ（平音）", "ㅌ (aspirated t)": "ㅌ（激音の t）",
  "ㄸ (tensed)": "ㄸ（濃音）", "ㅎ (stays h)": "ㅎ（h のまま）",
  "hak-kyo (aspirated)": "hak-kyo（激音）", "hak-kkyo (tensed)": "hak-kkyo（濃音）",
  "Black": "黒", "Gray": "灰色", "White": "白", "Silver": "銀",
};

const HANGUL = /[가-힣]/;
let prompts = 0, choiceSets = 0, files = 0;
const unmatched = new Set();

for (const f of fs.readdirSync(DATA).filter((x) => x.endsWith('.json') && !/manifest|search-words/.test(x))) {
  const abs = path.join(DATA, f);
  const raw = fs.readFileSync(abs, 'utf8');
  const crlf = raw.includes('\r\n');
  const json = JSON.parse(raw);
  let touched = false;

  for (const s of json.steps || []) {
    if (s.type !== 'match_quiz') continue;

    if (typeof s.prompt === 'string' && typeof s.prompt_ja !== 'string' && !HANGUL.test(s.prompt)) {
      const v = PROMPT[s.prompt];
      if (v) { s.prompt_ja = v; prompts++; touched = true; }
      else unmatched.add('P ' + s.prompt.slice(0, 60));
    }

    if (Array.isArray(s.choices) && !Array.isArray(s.choices_ja)) {
      // Pass anything without an entry through unchanged — romanizations,
      // jamo and Hangul must stay identical across locales.
      const mapped = s.choices.map((c) => {
        if (typeof c !== 'string') return c;
        if (HANGUL.test(c)) return c;
        if (c.replace(/[^a-zA-Z]/g, '').length < 3) return c;
        const v = CHOICE[c];
        if (!v) { unmatched.add('C ' + c.slice(0, 60)); return c; }
        return v;
      });
      if (mapped.some((v, i) => v !== s.choices[i])) {
        s.choices_ja = mapped; choiceSets++; touched = true;
      }
    }
  }

  if (!touched) continue;
  files++;
  if (CHECK) { console.log(`  DRIFT ${f}`); continue; }
  let out = JSON.stringify(json, null, 2) + (/\n$/.test(raw) ? '\n' : '');
  if (crlf) out = out.replace(/\n/g, '\r\n');
  fs.writeFileSync(abs, out, 'utf8');
}

console.log(`${prompts} prompts + ${choiceSets} choice sets ${CHECK ? 'would be ' : ''}filled across ${files} files`);
if (unmatched.size) {
  console.log(`\n${unmatched.size} values passed through untranslated:`);
  for (const u of [...unmatched].slice(0, 40)) console.log('  ' + u);
}
if (!CHECK && (prompts || choiceSets)) console.log('\nNow run: node scripts/gen-lesson-static.cjs');
