/**
 * apply-zh-tw-translations.mjs
 * Applies all 704 hardcoded zh-TW translation fields to the 9 lesson JSON files.
 * Run once: node scripts/apply-zh-tw-translations.mjs
 * Verify:   node scripts/translate-zh-tw-lessons.mjs   (should exit 0)
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);
const DATA_DIR   = join(__dirname, '..', 'learn', 'data');

function applyAndReorder(data, translations) {
  const transMap = new Map();
  for (const { stepId, field, translated } of translations) {
    if (!transMap.has(stepId)) transMap.set(stepId, {});
    transMap.get(stepId)[field] = translated;
  }
  data.steps = data.steps.map(step => {
    const pending = transMap.get(step.id);
    if (!pending) return step;
    const out = {};
    for (const [k, v] of Object.entries(step)) {
      out[k] = v;
      if (pending[k] !== undefined) out[`${k}_zh_tw`] = pending[k];
    }
    return out;
  });
}

function applyFile(name, translations) {
  const filePath = join(DATA_DIR, `${name}.json`);
  const data = JSON.parse(readFileSync(filePath, 'utf8'));
  applyAndReorder(data, translations);
  writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log(`✓ ${name}.json — ${translations.length} fields applied`);
}

// ═══════════════════════════════════════════════════════════
// hangul.json — 44 fields (22 match_quiz × prompt + choices)
// ═══════════════════════════════════════════════════════════
const HANGUL = [
  // Stage 1 Consonants
  { stepId: 15, field: 'prompt',  translated: 'ㄱ的羅馬拼音是…' },
  { stepId: 15, field: 'choices', translated: ['n', 'g/k', 'd/t', 'm'] },
  { stepId: 16, field: 'prompt',  translated: '哪個子音在音節開頭是無聲的？' },
  { stepId: 16, field: 'choices', translated: ['ㄱ', 'ㄴ', 'ㅇ', 'ㅅ'] },
  { stepId: 17, field: 'prompt',  translated: 'ㄴ的羅馬拼音是…' },
  { stepId: 17, field: 'choices', translated: ['r/l', 'm', 'n', 'b/p'] },
  { stepId: 18, field: 'prompt',  translated: '哪個子音的發音像「juice」中的「j」？' },
  { stepId: 18, field: 'choices', translated: ['ㅂ', 'ㅈ', 'ㅅ', 'ㄷ'] },
  { stepId: 19, field: 'prompt',  translated: 'ㅁ的羅馬拼音是…' },
  { stepId: 19, field: 'choices', translated: ['b', 'n', 'm', 'h'] },
  { stepId: 20, field: 'prompt',  translated: 'ㄹ的羅馬拼音是…' },
  { stepId: 20, field: 'choices', translated: ['n', 'd/t', 'r/l', 's'] },
  { stepId: 21, field: 'prompt',  translated: '밥（飯）以哪個子音開頭？' },
  { stepId: 21, field: 'choices', translated: ['ㅂ', 'ㅍ', 'ㅁ', 'ㅂ'] },
  // Stage 2 Vowels
  { stepId: 32, field: 'prompt',  translated: '哪個母音的發音像英文「father」中的「a」？' },
  { stepId: 32, field: 'choices', translated: ['ㅏ', 'ㅗ', 'ㅜ', 'ㅣ'] },
  { stepId: 33, field: 'prompt',  translated: '哪個母音的發音像英文「more」中的「o」？' },
  { stepId: 33, field: 'choices', translated: ['ㅓ', 'ㅗ', 'ㅡ', 'ㅑ'] },
  { stepId: 34, field: 'prompt',  translated: '哪個母音的發音像英文「bee」中的「ee」？' },
  { stepId: 34, field: 'choices', translated: ['ㅓ', 'ㅛ', 'ㅣ', 'ㅠ'] },
  { stepId: 35, field: 'prompt',  translated: 'ㅠ的羅馬拼音是…' },
  { stepId: 35, field: 'choices', translated: ['u', 'eu', 'yo', 'yu'] },
  { stepId: 36, field: 'prompt',  translated: 'ㅡ的發音像…' },
  { stepId: 36, field: 'choices', translated: ['ya', 'i', 'eu', 'yo'] },
  // Stage 4 Tense / Aspirated
  { stepId: 53, field: 'prompt',  translated: 'ㄲ的羅馬拼音是…' },
  { stepId: 53, field: 'choices', translated: ['k', 'kk', 'g/k', 'ng'] },
  { stepId: 54, field: 'prompt',  translated: '哪個是緊音（쌍자음）？' },
  { stepId: 54, field: 'choices', translated: ['ㅋ', 'ㅌ', 'ㅆ', 'ㅊ'] },
  { stepId: 55, field: 'prompt',  translated: 'ㅃ的羅馬拼音是…' },
  { stepId: 55, field: 'choices', translated: ['b', 'p', 'pp', 'bb'] },
  { stepId: 56, field: 'prompt',  translated: '氣音子音是如何發出的…' },
  { stepId: 56, field: 'choices', translated: ['無送氣', '強送氣', '喉嚨緊縮', '鼻音'] },
  { stepId: 57, field: 'prompt',  translated: 'ㅉ的羅馬拼音是…' },
  { stepId: 57, field: 'choices', translated: ['ss', 'ch', 'jj', 'tt'] },
  // Stage 5 Compound Vowels
  { stepId: 69, field: 'prompt',  translated: 'ㅘ的羅馬拼音是…' },
  { stepId: 69, field: 'choices', translated: ['wo', 'wa', 'wae', 'oe'] },
  { stepId: 70, field: 'prompt',  translated: '왜 是什麼意思…' },
  { stepId: 70, field: 'choices', translated: ['什麼', '誰', '為什麼', '哪裡'] },
  { stepId: 71, field: 'prompt',  translated: 'ㅢ的羅馬拼音是…' },
  { stepId: 71, field: 'choices', translated: ['wi', 'ui', 'we', 'eu'] },
  { stepId: 72, field: 'prompt',  translated: '哪個複合母音是由ㅗ + ㅣ組成的？' },
  { stepId: 72, field: 'choices', translated: ['ㅘ', 'ㅙ', 'ㅚ', 'ㅝ'] },
  { stepId: 73, field: 'prompt',  translated: '예的羅馬拼音是…' },
  { stepId: 73, field: 'choices', translated: ['yae', 'ye', 'ae', 'e'] },
];

// ══════════════════════════════════════════════════════════════
// syllable-blocks.json — 108 fields
// ══════════════════════════════════════════════════════════════
const SYLLABLE_BLOCKS = [
  // Reading cards
  { stepId: 1, field: 'title', translated: '什麼是音節方塊？' },
  { stepId: 1, field: 'body',  translated: '每個韓語音節都寫在一個隱形的方形區塊內。不像英文字母從左到右一字排開，韓語將子音和母音堆疊在一個緊湊、視覺上均衡的方塊中。每個方塊恰好代表一個音節——一個發音單位。' },
  { stepId: 1, field: 'tip',   translated: { label: '你知道嗎？', text: '每個音節方塊一定只有一個母音。它可以有0個、1個或2個子音——但絕對不超過一個母音。' } },

  { stepId: 2, field: 'title', translated: '三個位置' },
  { stepId: 2, field: 'body',  translated: '每個韓語音節方塊有三個命名位置。兩個是必要的（초성：第一個子音；중성：母音），一個是可選的（받침：最後的子音）。熟記這些位置名稱非常重要——韓語文法中會頻繁提到它們。' },
  { stepId: 2, field: 'tip',   translated: { label: '提示', text: '對於直立型母音（ㅏ、ㅓ、ㅣ）：초성在左側，母音在右側。對於水平型母音（ㅗ、ㅜ、ㅡ）：초성在上方，母音在下方。' } },

  { stepId: 3, field: 'title', translated: '四種音節方塊結構' },
  { stepId: 3, field: 'body',  translated: '韓語音節根據是否有終聲（받침）以及音節以母音或子音開頭，遵循四種基本結構模式。' },
  { stepId: 3, field: 'tip',   translated: { label: 'ㅇ 佔位符規則', text: '當音節以母音開頭時，必須在初聲位置寫上ㅇ作為佔位符。ㅇ在音節開頭完全無聲——它只是表示該方塊以母音開頭。例如：아 = ㅇ+ㅏ　이 = ㅇ+ㅣ　우 = ㅇ+ㅜ' } },

  { stepId: 14, field: 'title', translated: '直立型母音與水平型母音' },
  { stepId: 14, field: 'body',  translated: '母音的形狀決定了初聲在方塊內的位置。高挑的直立型母音把子音推到左側；寬扁的水平型母音把子音推到上方。這就是韓語外觀呈現獨特方形的原因。' },
  { stepId: 14, field: 'tip',   translated: { label: '快速視覺技巧', text: '看到高挑母音（ㅏ、ㅓ、ㅣ及其變體）時，初聲在其左側。看到寬扁母音（ㅗ、ㅜ、ㅡ及其變體）時，初聲在其上方。像ㅘ、ㅝ、ㅚ這樣的複合母音表現像直立母音——子音在左側。' } },

  { stepId: 25, field: 'title', translated: '建構你的第一個音節' },
  { stepId: 25, field: 'body',  translated: '現在讓我們練習建構簡單的CV音節——子音＋母音，無收音。這是最容易閱讀和書寫的方塊。聆聽每一個，並嘗試自己發音。' },

  { stepId: 34, field: 'title', translated: '加入收音——終聲子音' },
  { stepId: 34, field: 'body',  translated: '當你在方塊底部加入子音時，該子音就成為받침（收音）——終聲子音。收音賦予許多韓語單詞豐富、共鳴的尾音。看看加入收音如何把簡單的音節轉變成真實的單詞。' },
  { stepId: 34, field: 'tip',   translated: { label: '提示', text: '有收音的音節方塊在垂直方向上稍微被壓縮，以在底部騰出空間。收音子音位於初聲和母音的下方，完成方塊的方形外觀。' } },

  { stepId: 45, field: 'title', translated: '閱讀真正的韓語單詞' },
  { stepId: 45, field: 'body',  translated: '現在你擁有解讀真正韓語單詞所需的一切。讓我們逐音節拆解10個基本單詞，識別每個組成部分。點擊喇叭按鈕聆聽單詞的發音。' },

  { stepId: 57, field: 'title', translated: '練習與總結' },
  { stepId: 57, field: 'body',  translated: '恭喜——你已學會韓語音節方塊的核心結構！以下是管理韓語書寫系統中每個音節的五條規則的簡要總結。' },
  { stepId: 57, field: 'rules', translated: [
    '每個方塊恰好只有一個母音（중성／中聲）',
    '以母音開頭的音節使用無聲的ㅇ作為初聲佔位符',
    '直立型母音（ㅏ、ㅓ、ㅣ）——初聲在左側，母音在右側',
    '水平型母音（ㅗ、ㅜ、ㅡ）——初聲在上方，母音在下方',
    '可選的받침（收音）位於方塊底部，在所有元素的下方',
  ] },
  { stepId: 57, field: 'tip',   translated: { label: '即將進行自測！', text: '以下三個快速問題確認你已掌握這些知識。識別每個音節的組成部分。' } },

  // Card reveals
  { stepId: 4,  field: 'example_meaning', translated: '韓國' },
  { stepId: 4,  field: 'hint',            translated: '每個音節都是方形方塊——初聲、母音和可選的終聲。' },
  { stepId: 5,  field: 'example_meaning', translated: '韓國' },
  { stepId: 5,  field: 'hint',            translated: '這個方塊具有所有三個位置：초성（ㄱ）＋중성（ㅜ）＋받침（ㄱ）。' },
  { stepId: 6,  field: 'example_meaning', translated: '韓語' },
  { stepId: 6,  field: 'hint',            translated: '以母音開頭的音節使用無聲的ㅇ作為佔位符。這裡的ㅇ不發音。' },
  { stepId: 10, field: 'example_meaning', translated: '去' },
  { stepId: 10, field: 'hint',            translated: 'CV模式——最簡單的方塊類型。只有初聲和母音。' },
  { stepId: 11, field: 'example_meaning', translated: '嬰兒' },
  { stepId: 11, field: 'hint',            translated: '純母音模式——初聲位置使用無聲的ㅇ，只有母音發聲。' },
  { stepId: 12, field: 'example_meaning', translated: '肝臟／去了' },
  { stepId: 12, field: 'hint',            translated: 'CVC模式——初聲＋母音＋終聲（받침）。三個部分。' },
  { stepId: 15, field: 'hint',            translated: 'ㅏ是直立型母音。初聲在其左側。' },
  { stepId: 16, field: 'example_meaning', translated: '你（非正式）' },
  { stepId: 16, field: 'hint',            translated: 'ㅓ也是直立型母音——子音在左，母音在右。' },
  { stepId: 17, field: 'example_meaning', translated: '時間' },
  { stepId: 17, field: 'hint',            translated: 'ㅣ是最高挑的母音。子音始終在其左側。' },
  { stepId: 18, field: 'example_meaning', translated: '謝謝' },
  { stepId: 18, field: 'hint',            translated: 'ㅗ是寬扁的水平型母音。初聲在母音的上方。' },
  { stepId: 19, field: 'example_meaning', translated: '誰' },
  { stepId: 19, field: 'hint',            translated: 'ㅜ是寬扁的水平型母音——子音在上，母音在下。橫線朝下。' },
  { stepId: 20, field: 'example_meaning', translated: '而且，接著' },
  { stepId: 20, field: 'hint',            translated: 'ㅡ是平坦的水平型母音——子音在其上方。' },
  { stepId: 35, field: 'example_meaning', translated: '山' },
  { stepId: 35, field: 'hint',            translated: 'ㄴ是這裡的收音——它位於方塊底部，在ㅅ和ㅏ的下方。' },
  { stepId: 36, field: 'example_meaning', translated: '月亮／月份' },
  { stepId: 36, field: 'hint',            translated: 'ㄹ收音——舌頭輕輕點擊上顎。' },
  { stepId: 37, field: 'example_meaning', translated: '米飯／餐食' },
  { stepId: 37, field: 'hint',            translated: 'ㅂ收音——語末嘴唇閉合不放開。「p」音不送氣。' },
  { stepId: 38, field: 'example_meaning', translated: '春天（季節）' },
  { stepId: 38, field: 'hint',            translated: 'ㅁ收音——語末嘴唇輕柔閉合。鼻腔共鳴的尾音。' },
  { stepId: 39, field: 'example_meaning', translated: '道路／方向' },
  { stepId: 39, field: 'hint',            translated: '再次出現ㄹ收音——舌頭停留在上顎。像輕柔的「l」音。' },

  // Match quizzes
  { stepId: 7,  field: 'prompt',  translated: '每個韓語音節方塊恰好包含幾個母音？' },
  { stepId: 7,  field: 'choices', translated: ['零個', '恰好一個', '一或兩個', '需要多少就有多少'] },
  { stepId: 8,  field: 'prompt',  translated: '초성（第一個子音）的位置叫做…' },
  { stepId: 8,  field: 'choices', translated: ['받침', '중성', '초성', '모음'] },
  { stepId: 9,  field: 'prompt',  translated: '當音節以母音開頭時，你在初聲位置寫 __ 作為佔位符。' },
  { stepId: 9,  field: 'choices', translated: ['ㄱ', 'ㄴ', 'ㄹ', 'ㅇ'] },
  { stepId: 13, field: 'prompt',  translated: '안（裡面／不）——這是什麼結構模式？' },
  { stepId: 13, field: 'choices', translated: ['CV', 'CVC', 'VC（無聲ㅇ＋母音＋終聲）', '純母音'] },
  { stepId: 21, field: 'prompt',  translated: '對於ㅏ、ㅓ、ㅣ等直立型母音——初聲子音放在哪裡？' },
  { stepId: 21, field: 'choices', translated: ['上方', '左側', '右側', '下方'] },
  { stepId: 22, field: 'prompt',  translated: '對於ㅗ、ㅜ、ㅡ等寬扁型母音——初聲子音放在哪裡？' },
  { stepId: 22, field: 'choices', translated: ['左側', '右側', '上方', '下方'] },
  { stepId: 23, field: 'prompt',  translated: '배（肚子／船）含有ㅐ——ㅐ是哪種類型的母音？' },
  { stepId: 23, field: 'choices', translated: ['寬扁水平型', '高挑直立型', '複合寬扁型', '無聲型'] },
  { stepId: 24, field: 'prompt',  translated: '以下哪個是寬扁（水平型）母音？' },
  { stepId: 24, field: 'choices', translated: ['ㅏ', 'ㅓ', 'ㅣ', 'ㅜ'] },
  { stepId: 40, field: 'prompt',  translated: '밥（飯）——它的받침（收音）是什麼？' },
  { stepId: 40, field: 'choices', translated: ['ㅏ', 'ㅂ', 'ㄴ', 'ㄱ'] },
  { stepId: 41, field: 'prompt',  translated: '달（月亮）以哪個子音音收尾？' },
  { stepId: 41, field: 'choices', translated: ['n', 'm', 'l/r', 'k'] },
  { stepId: 42, field: 'prompt',  translated: '在CVC音節方塊中，받침（收音）位於哪裡？' },
  { stepId: 42, field: 'choices', translated: ['母音上方', '母音右側', '底部，在所有元素下方', '初聲子音旁邊'] },
  { stepId: 43, field: 'prompt',  translated: '以下哪個單詞沒有받침？' },
  { stepId: 43, field: 'choices', translated: ['산', '달', '가', '봄'] },
  { stepId: 44, field: 'prompt',  translated: '봄（春天）= ㅂ + ㅗ + ? ——收音是什麼？' },
  { stepId: 44, field: 'choices', translated: ['ㄴ', 'ㄱ', 'ㅁ', 'ㄹ'] },
  { stepId: 58, field: 'prompt',  translated: '남（南）——它的초성（初聲）是什麼？' },
  { stepId: 58, field: 'choices', translated: ['ㄴ', 'ㅏ', 'ㅁ', 'ㄱ'] },
  { stepId: 59, field: 'prompt',  translated: '달（月亮）——識別받침（收音／終聲子音）。' },
  { stepId: 59, field: 'choices', translated: ['ㄷ', 'ㅏ', 'ㄹ', 'ㄴ'] },
  { stepId: 60, field: 'prompt',  translated: '봄（春天）——按順序列出所有三個組成部分是什麼？' },
  { stepId: 60, field: 'choices', translated: ['ㅂ + ㅗ + ㅁ', 'ㅂ + ㅜ + ㄴ', 'ㅍ + ㅗ + ㄴ', 'ㅂ + ㅗ + ㄴ'] },

  // Syllable builders
  { stepId: 26, field: 'meaning', translated: 'ba — 바나나（香蕉）' },
  { stepId: 27, field: 'meaning', translated: 'na — 나（我）' },
  { stepId: 28, field: 'meaning', translated: 'sa — 사랑（愛）' },
  { stepId: 29, field: 'meaning', translated: 'ha — 하늘（天空）' },
  { stepId: 30, field: 'meaning', translated: 'go — 고마워（謝謝，非正式）' },
  { stepId: 31, field: 'meaning', translated: 'nu — 누구（誰）' },
  { stepId: 32, field: 'meaning', translated: 'mi — 미래（未來）' },
  { stepId: 33, field: 'meaning', translated: 'gi — 기다리다（等待）' },

  // Listen repeats
  { stepId: 46, field: 'meaning', translated: '韓國' },
  { stepId: 47, field: 'meaning', translated: '人' },
  { stepId: 48, field: 'meaning', translated: '學校' },
  { stepId: 49, field: 'meaning', translated: '你好／平安' },
  { stepId: 50, field: 'meaning', translated: '感謝' },
  { stepId: 51, field: 'meaning', translated: '愛' },
  { stepId: 52, field: 'meaning', translated: '音樂' },
  { stepId: 53, field: 'meaning', translated: '朋友' },
  { stepId: 54, field: 'meaning', translated: '家庭' },
  { stepId: 55, field: 'meaning', translated: '海洋' },
  { stepId: 56, field: 'meaning', translated: '夢' },

  // Lesson complete
  { stepId: 61, field: 'message', translated: '你已掌握所有韓語書寫方塊的基礎——5個階段，61個步驟。每個韓語單詞都是由這些方塊構成的。화이팅！' },
];

// ══════════════════════════════════════════════════════════════
// pronunciation.json — 125 fields
// ══════════════════════════════════════════════════════════════
const PRONUNCIATION = [
  // Reading cards
  { stepId: 1,  field: 'title', translated: '什麼是收音？' },
  { stepId: 1,  field: 'body',  translated: '收音（받침，字面意思是「支撐」）是放在韓語音節方塊底部的子音。例如，在音節강中，底部的ㅇ就是收音。並非所有音節都有收音——許多音節只以母音結尾。收音使산、달、밥這樣的韓語單詞以獨特的子音收尾，而非開放的母音。' },
  { stepId: 1,  field: 'tip',   translated: { label: '哪些音節有收音？', text: '看任何韓語音節方塊。如果母音下方有字符，那就是收音。가沒有收音。간的收音是ㄴ。닭有雙收音ㄺ（讀作一個音）。' } },

  { stepId: 2,  field: 'title', translated: '收音7種聲' },
  { stepId: 2,  field: 'body',  translated: '雖然拼寫時許多不同的子音可以作為收音出現，但發音時全部歸納為只有7種可能的音。這就是收音7종성規則。學習這7個組非常重要——它解釋了為什麼닭（雞）和국（湯）都以相同的k音收尾。' },
  { stepId: 2,  field: 'rules', translated: [
    'ㄱ組：ㄱ、ㄲ、ㅋ、ㄳ、ㄺ → 發k音（不送氣）——例：국（湯）、닭（雞）',
    'ㄴ組：ㄴ、ㄵ、ㄶ → 發n音——例：산（山）、앉다（坐下）',
    'ㄷ組：ㄷ、ㅅ、ㅆ、ㅈ、ㅊ、ㅌ、ㅎ → 發t音（不送氣）——例：옷（衣服）、꽃（花）',
    'ㄹ組：ㄹ、ㄼ、ㄽ、ㄾ、ㅀ → 發l音——例：달（月亮）、말（馬）',
    'ㅁ組：ㅁ、ㄻ → 發m音——例：밤（夜晚）、삶（生命）',
    'ㅂ組：ㅂ、ㅍ、ㄿ、ㄼ → 發p音（不送氣）——例：입（嘴巴）、앞（前面）',
    'ㅇ組：ㅇ → 發ng音——例：강（河流）、방（房間）',
  ] },
  { stepId: 2,  field: 'tip',   translated: { label: '不送氣塞音是什麼意思？', text: 'k、t、p的收音是不送氣的：你的嘴巴做出該形狀但不送出氣流。想像英文「cup」最後的p保持著不放氣——cup_——韓語的ㄱ/ㄷ/ㅂ收音也是同樣的方式。' } },

  { stepId: 14, field: 'title', translated: '連音化' },
  { stepId: 14, field: 'body',  translated: '當一個以收音結尾的音節後面緊接著一個以無聲ㅇ開頭的音節時，收音子音向前移動，成為下一個音節的初聲。拼寫不變——只有發音改變。這稱為연음화（連音化），是韓語中最常見的發音現象之一。' },
  { stepId: 14, field: 'tip',   translated: { label: '找出規律', text: '尋找：收音子音＋下一個音節以ㅇ（無聲佔位符）開頭。結果：收音聽起來像是開啟下一個音節。먹어요→머거요。한국어→한구거。書寫形式永遠不變——只有你的發音改變。' } },

  { stepId: 19, field: 'title', translated: '為什麼會發生連音化？' },
  { stepId: 19, field: 'body',  translated: '韓語音節結構強烈偏好子音＋母音的模式。當一個以母音開頭的音節緊接在收音後面時，從發音角度而言，子音附著在那個母音的開放位置更為自然。結果是更自然、連貫的語音流動。這不是俚語或懶惰的發音——它是標準韓語，在新聞播報、正式演講和日常對話中均可聽到。' },
  { stepId: 19, field: 'tip',   translated: { label: '連音化與拼寫', text: '書寫的韓語即使在下一個音節中發音，也會保持原有子音在其拼寫位置。這就是為什麼學習閱讀韓語和學習發音韓語最初是兩個獨立技能——文字記錄的是語素，而非精確的音。' } },

  { stepId: 22, field: 'title', translated: '鼻音同化' },
  { stepId: 22, field: 'body',  translated: '當ㄱ、ㄷ、ㅂ組的塞音收音後面跟著鼻音子音ㄴ或ㅁ時，塞音同化並變成對應的鼻音。這純粹是發音層面的：鼻音子音需要軟顎下降，這會把相鄰的塞音帶入鼻音領域。拼寫不變；只有發音改變。' },
  { stepId: 22, field: 'rules', translated: [
    'ㅂ＋ㄴ/ㅁ→ㅁ：唇塞音變成唇鼻音——입니다→임니다',
    'ㄱ＋ㄴ/ㅁ→ㅇ：軟顎塞音變成軟顎鼻音——국물→궁물',
    'ㄷ＋ㄴ/ㅁ→ㄴ：齒槽塞音變成齒槽鼻音——걷는다→건는다',
  ] },
  { stepId: 22, field: 'tip',   translated: { label: '為什麼是相同的發音部位？', text: '每一對（ㅂ↔ㅁ、ㄱ↔ㅇ、ㄷ↔ㄴ）在嘴巴中共享完全相同的發音部位——分別是嘴唇、喉嚨後部和齒槽。只有鼻腔氣流改變。鼻音「感染」前面的塞音，在保持口腔位置的同時將其鼻音化。' } },

  { stepId: 31, field: 'title', translated: '同化方向始終一致' },
  { stepId: 31, field: 'body',  translated: '鼻音同化始終朝同一方向進行：塞音變成鼻音，從不反向。鼻音子音「感染」前面的音。一旦你發現ㅂ→ㅁ、ㄷ→ㄴ、ㄱ→ㅇ的規律，就會開始在真實韓語語音中自動聽出並預測這些變化。' },
  { stepId: 31, field: 'tip',   translated: { label: '記憶技巧', text: '把每一對想成在你嘴巴裡的同一位置。嘴唇：ㅂ（塞音）↔ㅁ（鼻音）。喉嚨：ㄱ（塞音）↔ㅇ（鼻音）。齒槽：ㄷ（塞音）↔ㄴ（鼻音）。位置不變；只有鼻腔閥門打開。' } },

  { stepId: 32, field: 'title', translated: '硬音化' },
  { stepId: 32, field: 'body',  translated: '在某些收音子音——具體來說是ㄱ、ㄷ、ㅂ組的不送氣塞音收音——之後，後面的子音變成緊音（雙子音）。書寫形式不變；只有發音改變。硬音化是為什麼학교（學校）聽起來像학꾜而不是학교的原因。' },
  { stepId: 32, field: 'tip',   translated: { label: '為什麼會發生硬音化', text: '在不送氣塞音之後，聲道已處於緊張、閉合的狀態。從這種狀態開始發下一個子音時，額外的肌肉緊張自然地延續，自動創造出緊音。硬音化不是刻意的——它是自然的發音結果。一旦在真實語音中聽到，就無法忽視。' } },

  { stepId: 39, field: 'title', translated: 'ㅎ弱化' },
  { stepId: 39, field: 'body',  translated: '子音ㅎ是韓語中最不穩定的音之一。在母音之間——無論ㅎ是收音還是初聲——它都會顯著弱化，往往幾乎完全消失。這就是좋아요（好的／我喜歡）聽起來像조아요而不是조하요的原因。ㅎ仍然在書寫中存在，但音幾乎消失了。' },
  { stepId: 39, field: 'tip',   translated: { label: '初學者常見錯誤', text: '許多初學者把좋아요說成조하요，保留了h音。在真實的韓語語音中，這聽起來不自然且過於刻意。標準發音是조아요——ㅎ在兩個母音之間悄悄消失。相信這條規則：母音間的ㅎ幾乎消失。' } },

  { stepId: 43, field: 'title', translated: 'ㅎ＋子音＝氣音' },
  { stepId: 43, field: 'body',  translated: '當ㅎ收音遇到下一個音節的初聲子音（或反之）時，兩者合併成一個單一的氣音。ㅎ＋ㄷ變成ㅌ。ㄱ＋ㅎ變成ㅋ。ㅂ＋ㅎ變成ㅍ。ㄷ＋ㅎ（或ㅎ＋ㄷ）變成ㅌ。把ㅎ想成是在相鄰子音上添加一口氣。' },
  { stepId: 43, field: 'rules', translated: [
    'ㅎ＋ㄷ→ㅌ：놓다（放置）→노타',
    'ㄱ＋ㅎ→ㅋ：착하다（善良）→차카다',
    'ㅂ＋ㅎ→ㅍ：입학（入學）→이팍',
    'ㄷ＋ㅎ→ㅌ：못해요（不會）→모태요',
  ] },

  { stepId: 46, field: 'title', translated: '口蓋音化' },
  { stepId: 46, field: 'body',  translated: '當子音ㄷ或ㅌ作為收音出現，後面跟著母音이（i）時，它們在口腔中前移，分別變成ㅈ和ㅊ。這種轉換稱為口蓋音化——子音從齒槽移動到上顎，以準備前元音이。' },
  { stepId: 46, field: 'rules', translated: [
    'ㄷ＋이→ㅈ이→지：굳이（特意地）→구지',
    'ㅌ＋이→ㅊ이→치：같이（一起）→가치',
  ] },
  { stepId: 46, field: 'tip',   translated: { label: '僅適用於語素內部', text: '口蓋音化只適用於同一單詞內，或以이開頭的後綴附加到詞幹時。它不適用於跨越詞界的情況。같이觸發口蓋音化是因為이是該單詞的一部分。在옷 입어요（穿衣服）這樣的短語中，이開始了一個新詞——適用不同的規則。' } },

  { stepId: 51, field: 'title', translated: 'ㄹ的發音' },
  { stepId: 51, field: 'body',  translated: '韓語子音ㄹ通常被描述為介於r和l之間——這完全正確。其精確的發音取決於它在音節中的位置。在兩個母音之間，ㄹ是舌尖快速點擊上齒後方齒槽的動作——與美式英語「butter」或「water」中的閃音r相同。在音節末尾或子音之前，舌頭輕觸同一齒槽，發出輕柔的l音。' },
  { stepId: 51, field: 'tip',   translated: { label: '舌尖點擊技巧', text: '不要捲舌發ㄹ（無西班牙語顫音），也不要在母音位置使用英語l形狀。在라면中ㄹ是快速點擊——嘗試一邊想著「ra」一邊說「la」。在달（月亮）中ㄹ是持續的l音。在빨리（快速地）中兩者都有：持續的l接著快速點擊。' } },

  { stepId: 56, field: 'title', translated: '유음화（流音化）' },
  { stepId: 56, field: 'body',  translated: '當ㄹ和ㄴ跨越音節相鄰出現時，兩者都變成ㄹ——這稱為유음화（流音化）。例：신라（新羅王朝）發音為실라（silla），而不是sin-ra。同樣，연락（聯絡）發音為열락（yeollak）。ㄴ在緊鄰ㄹ時完全轉換為ㄹ。' },
  { stepId: 56, field: 'tip',   translated: { label: '為什麼會發生流音化？', text: 'ㄹ和ㄴ共享非常相似的舌位——兩者都是在齒槽發出的音。當它們相鄰出現時，較強的（側音）ㄹ把ㄴ吸引到自己的領域。這是最引人注目的音變之一，因為拼寫完全沒有給出任何視覺提示。' } },

  { stepId: 58, field: 'title', translated: '英語母語者的6個常見錯誤' },
  { stepId: 58, field: 'body',  translated: '韓語和英語有非常不同的音韻系統。接下來的六個步驟各涵蓋一個英語母語者常犯的發音錯誤——並附有清晰的糾正說明。及早認識這些規律可以省去數月的壞習慣。' },
  { stepId: 58, field: 'tip',   translated: { label: '為什麼這些錯誤如此常見？', text: '英語母語者自動把英語音韻學應用到新的音上。韓語有英語中不存在的母音、子音對比和語調模式。這些錯誤中的每一個都源於把韓語音映射到最接近的英語對應音——這幾乎總是錯誤的。' } },

  { stepId: 59, field: 'title', translated: '錯誤1——把ㅡ發成「oo」' },
  { stepId: 59, field: 'body',  translated: 'ㅡ在英語中沒有對應的音。它是後舌非圓唇母音——你的舌頭在「oo」的位置，但嘴唇完全扁平不圓，就像嘴角微微上揚說「uh」一樣。으、크다、든지這樣的單詞都使用這個音。嘴唇一旦圓起，你就發出了錯誤的母音。' },
  { stepId: 59, field: 'tip',   translated: { label: '如何練習ㅡ', text: '說「too」中的「oo」。現在把舌頭保持在完全相同的位置，但嘴唇扁平展開，就像微微微笑。發出的音——硬、非圓唇、稍微靠後——就是ㅡ。不要把舌頭放鬆成「uh」或央元音；保持高且靠後。' } },

  { stepId: 60, field: 'title', translated: '錯誤2——把ㅓ當成英語的「er」' },
  { stepId: 60, field: 'body',  translated: 'ㅓ通常被轉寫為「eo」或「uh」——但它不是帶有r色彩的美式英語「er」。韓語ㅓ是中後非圓唇母音。想想英式英語「but」或「cup」中的「uh」——不圓唇、無r音、嘴巴微微張開。任何一絲r音的加入都會立刻讓這個母音聽起來像外語。' },
  { stepId: 60, field: 'tip',   translated: { label: '快速測試', text: '說「Uh-oh」。第一個音節「Uh」——扁平、中後位置、無r且無嘴唇圓形——非常接近ㅓ。不要緊張它，不要圓唇，不要加r。就是平坦開放的「uh」。練習單詞：어、어머니、뭐。' } },

  { stepId: 61, field: 'title', translated: '錯誤3——在雙子音上送氣' },
  { stepId: 61, field: 'body',  translated: '英語母語者自然地在塞音子音上加送氣。韓語的緊音（雙子音）ㄲ、ㄸ、ㅃ、ㅆ、ㅉ從不送氣。它們用緊張的肌肉且不向外送氣的方式發音。在嘴前拿一張紙——說까、따、빠、싸、짜時紙不應該移動。對比是緊張保持與送氣之間的差異。' },
  { stepId: 61, field: 'tip',   translated: { label: '紙張測試', text: '氣音子音（ㅋ、ㅌ、ㅍ、ㅊ）會讓紙明顯抖動。平音（ㄱ、ㄷ、ㅂ、ㅈ）會讓它稍微移動。緊音（ㄲ、ㄸ、ㅃ、ㅉ）幾乎不應讓紙移動——高度肌肉緊張，零氣流釋放。' } },

  { stepId: 62, field: 'title', translated: '錯誤4——所有問句都用升調' },
  { stepId: 62, field: 'body',  translated: '在英語中，句末升調表示疑問句。在韓語中，語調規則不同：是/否問句確實在末尾使用輕微的升調，但疑問詞問句（誰、什麼、哪裡、何時、為什麼、如何）通常使用降調或中性語調——而非升調。對所有韓語問句過度使用英語式升調聽起來不自然，有時甚至顯得不確定或懇求。' },
  { stepId: 62, field: 'tip',   translated: { label: '要記住的規律', text: '是/否問句：末尾輕微升調。例：갔어요？（你去了嗎？）——升調結束。疑問詞問句：中性或降調。例：어디 갔어요？（你去哪裡了？）——平或降調結束。疑問詞承載了足夠的信息；不需要升調旋律。' } },

  { stepId: 63, field: 'title', translated: '錯誤5——在i類母音前把ㅅ發成普通的「s」' },
  { stepId: 63, field: 'body',  translated: '在母音이、야、여、요、유之前，子音ㅅ發音像英語「sh」。所以시是「shi」不是「si」，셔츠（襯衫）以「sh」開頭。這也適用於緊音ㅆ在이前→「sshi」。先學過羅馬拼音的英語母語者常把母語者說「shi」的地方說成「si」，這立刻就能被察覺。' },
  { stepId: 63, field: 'tip',   translated: { label: '哪些母音會觸發這個？', text: '口蓋化的ㅅ（sh音）在i類母音前出現：이（i）、야（ya）、여（yeo）、요（yo）、유（yu）。在所有其他母音——아、어、오、우、으及其複合——之前，ㅅ保持普通的s音。사是「sa」，但시是「shi」。' } },

  { stepId: 64, field: 'title', translated: '錯誤6——在좋아요中發出ㅎ的音' },
  { stepId: 64, field: 'body',  translated: '初學者常把좋아요說成「jo-ha-yo」，把ㅎ當作清晰的h音來發音。但由於ㅎ在母音間的弱化（你在第4階段學過），實際發音是조아요（jo-a-yo）——ㅎ幾乎消失。這廣泛適用：많아요→마나요、낳아요→나아요。每當ㅎ在自然語音中位於母音之間時，它就會淡化。' },
  { stepId: 64, field: 'tip',   translated: { label: '回顧第4階段', text: '你已經學了ㅎ弱化和ㅎ＋子音氣音化。錯誤6只是初學者遇到ㅎ弱化並犯錯最常見的現實場景。좋아요可以說是韓語中使用最多的形容詞形式——正確發音立刻變得重要。' } },

  // Listen repeats
  { stepId: 3,  field: 'meaning', translated: '湯——ㄱ組收音，發k音（不送氣）' },
  { stepId: 4,  field: 'meaning', translated: '山——ㄴ組收音，發n音' },
  { stepId: 5,  field: 'meaning', translated: '衣服——ㄷ組收音（ㅅ→t），發t音（不送氣）' },
  { stepId: 6,  field: 'meaning', translated: '月亮——ㄹ組收音，發l音' },
  { stepId: 7,  field: 'meaning', translated: '夜晚／栗子——ㅁ組收音，發m音' },
  { stepId: 8,  field: 'meaning', translated: '嘴巴——ㅂ組收音，發p音（不送氣）' },
  { stepId: 9,  field: 'meaning', translated: '河流——ㅇ組收音，發ng音' },
  { stepId: 10, field: 'meaning', translated: '雞——雙收音ㄺ（ㄹ＋ㄱ）→ㄱ組→k音' },
  { stepId: 11, field: 'meaning', translated: '花——收音ㅊ屬於ㄷ組→t音' },
  { stepId: 15, field: 'meaning', translated: '我吃／正在吃——먹的ㄱ收音連到어，聽起來像머거요' },
  { stepId: 16, field: 'meaning', translated: '飯（受格）——밥的ㅂ收音連到을，聽起來像바블' },
  { stepId: 17, field: 'meaning', translated: '好的／我喜歡——ㅎ收音弱化並連音（見第4階段ㅎ規則）' },
  { stepId: 18, field: 'meaning', translated: '韓語——국的ㄱ收音連到어，聽起來像한구거' },
  { stepId: 23, field: 'meaning', translated: '是／是（正式）——ㅂ＋ㄴ→ㅁ：拼寫為입니다，聽起來像임니다' },
  { stepId: 24, field: 'meaning', translated: '湯汁——ㄱ＋ㅁ→ㅇ：拼寫為국물，聽起來像궁물' },
  { stepId: 25, field: 'meaning', translated: '學年——ㄱ＋ㄴ→ㅇ：拼寫為학년，聽起來像항년' },
  { stepId: 26, field: 'meaning', translated: '走路——ㄷ＋ㄴ→ㄴ：拼寫為걷는다，聽起來像건는다' },
  { stepId: 27, field: 'meaning', translated: '前院——ㅂ＋ㅁ→ㅁ：拼寫為앞마당，聽起來像암마당' },
  { stepId: 33, field: 'meaning', translated: '學校——ㄱ收音引發硬音化：ㄱ→ㄲ，聽起來像학꾜' },
  { stepId: 34, field: 'meaning', translated: '餐廳——ㄱ收音引發硬音化：ㄷ→ㄸ，聽起來像식땅' },
  { stepId: 35, field: 'meaning', translated: '關閉——ㄷ收音引發硬音化：ㄷ→ㄸ，聽起來像닫따' },
  { stepId: 36, field: 'meaning', translated: '入口——ㅂ收音引發硬音化：ㄱ→ㄲ，聽起來像입꾸' },
  { stepId: 40, field: 'meaning', translated: '好的／我喜歡——ㅎ收音弱化：聽起來像조아요（不是조하요）' },
  { stepId: 41, field: 'meaning', translated: '有很多——ㄶ收音中的ㅎ弱化：聽起來像마나요' },
  { stepId: 42, field: 'meaning', translated: '我放進去——ㅎ收音在母音間弱化：聽起來像너어요' },
  { stepId: 44, field: 'meaning', translated: '放手／放置——ㅎ收音＋ㄷ→ㅌ：拼寫為놓다，聽起來像노타' },
  { stepId: 47, field: 'meaning', translated: '一起——ㅌ＋이→ㅊ：拼寫為같이，聽起來像가치' },
  { stepId: 48, field: 'meaning', translated: '特意地／固執地——ㄷ＋이→ㅈ：拼寫為굳이，聽起來像구지' },
  { stepId: 52, field: 'meaning', translated: '泡麵——初聲位置（母音前）的ㄹ：快速r點擊' },
  { stepId: 53, field: 'meaning', translated: '月亮——作為終聲收音的ㄹ：持續的l音' },
  { stepId: 54, field: 'meaning', translated: '快速地——雙ㄹㄹ：持續的l接著r點擊' },
  { stepId: 55, field: 'meaning', translated: '我愛你——母音間的ㄹ（랑→해）：r點擊音' },

  // Match quizzes
  { stepId: 12, field: 'prompt',  translated: 'ㅋ（kh）、ㄲ（kk）和ㄳ都是同一組的收音。它們屬於哪個音組？' },
  { stepId: 12, field: 'choices', translated: ['ㄴ組（n）', 'ㄱ組（k）', 'ㅂ組（p）', 'ㄷ組（t）'] },
  { stepId: 13, field: 'prompt',  translated: '방（房間）以收音ㅇ結尾。這個音發出什麼聲音？' },
  { stepId: 13, field: 'choices', translated: ['無聲——ㅇ始終是無聲的', 'ng音（像「sing」）', 'n音', 'm音'] },
  { stepId: 20, field: 'prompt',  translated: '연음화（連音化）發生在收音後面跟著以…開頭的音節時' },
  { stepId: 20, field: 'choices', translated: ['任何子音', '無聲ㅇ（以母音開頭的音節）', '只有ㄴ或ㅁ', '氣音子音'] },
  { stepId: 21, field: 'prompt',  translated: '在한국어（韓語）中，국的ㄱ收音向前連接。它如何發音？' },
  { stepId: 21, field: 'choices', translated: ['한국어→항궈（留在국中）', '한국어→한구거（ㄱ開啟어）', '한국어→한국어（不變）', '한국어→한국아（母音改變）'] },
  { stepId: 28, field: 'prompt',  translated: 'ㅂ（或ㅍ）收音後面跟著ㄴ或ㅁ變成哪個音？' },
  { stepId: 28, field: 'choices', translated: ['ㄴ', 'ㅁ', 'ㅇ', 'ㄱ'] },
  { stepId: 29, field: 'prompt',  translated: 'ㄱ收音後面跟著ㄴ或ㅁ變成哪個音？' },
  { stepId: 29, field: 'choices', translated: ['ㄴ', 'ㄷ', 'ㅇ（ng）', 'ㅁ'] },
  { stepId: 30, field: 'prompt',  translated: '입니다（是／是）——它實際上如何發音？' },
  { stepId: 30, field: 'choices', translated: ['ip-ni-da', 'im-ni-da', 'ib-ni-da', 'ip-mi-da'] },
  { stepId: 37, field: 'prompt',  translated: '硬音化（경음화）最可預測地發生在哪種收音之後？' },
  { stepId: 37, field: 'choices', translated: ['鼻音收音（ㄴ、ㅁ、ㅇ）', '不送氣塞音收音（ㄱ、ㄷ、ㅂ組）', '只有ㄹ收音', '任何收音子音'] },
  { stepId: 38, field: 'prompt',  translated: '학교（學校）——它實際上如何發音？' },
  { stepId: 38, field: 'choices', translated: ['hak-gyo', 'hak-kyo（氣音）', 'hak-kkyo（緊音）', 'ha-gyo'] },
  { stepId: 45, field: 'prompt',  translated: 'ㅎ＋ㄷ（或ㄷ＋ㅎ）發出什麼音？' },
  { stepId: 45, field: 'choices', translated: ['ㄷ（普通音）', 'ㅌ（氣音t）', 'ㄸ（緊音）', 'ㅎ（保持h音）'] },
  { stepId: 49, field: 'prompt',  translated: '當ㄷ收音後面跟著母音이時，它變成…' },
  { stepId: 49, field: 'choices', translated: ['ㄴ', 'ㅈ', 'ㅊ', 'ㅅ'] },
  { stepId: 50, field: 'prompt',  translated: '當ㅌ收音後面跟著母音이時，它變成…' },
  { stepId: 50, field: 'choices', translated: ['ㄴ', 'ㅈ', 'ㅊ', 'ㅅ'] },
  { stepId: 57, field: 'prompt',  translated: '신라（新羅——韓國歷史上的王朝）的發音是…' },
  { stepId: 57, field: 'choices', translated: ['sin-ra', 'sin-la', 'sil-la', 'shi-ra'] },
  { stepId: 65, field: 'prompt',  translated: '發ㅡ音時，你的嘴唇應該…' },
  { stepId: 65, field: 'choices', translated: ['像「oo」一樣圓', '扁平且不圓（展開）', '像「ah」一樣微微張開', '像吻一樣撅起'] },
  { stepId: 66, field: 'prompt',  translated: 'ㅅ在母音이前聽起來像…' },
  { stepId: 66, field: 'choices', translated: ['普通的「s」如「see」', '「sh」如「she」', '「z」如「zero」', '「t」如「tea」'] },
  { stepId: 67, field: 'prompt',  translated: '좋아요（好的／我喜歡）的實際發音是…' },
  { stepId: 67, field: 'choices', translated: ['jo-ha-yo', 'jo-a-yo', 'joh-a-yo', 'jo-ha'] },

  // Lesson complete
  { stepId: 68, field: 'message', translated: '你已掌握全部8條韓語發音規則：收音歸納、連音化、鼻音同化、硬音化、ㅎ弱化、ㅎ氣音化、口蓋音化以及ㄹ的發音。加上英語母語者最常犯的6個錯誤——以及如何避免它們。你的韓語發音現在將聽起來自然得多。' },
];

// ══════════════════════════════════════════════════════════════
// grammar.json — 161 fields
// ══════════════════════════════════════════════════════════════
const GRAMMAR = [
  // Reading cards
  { stepId: 1,  field: 'title', translated: '語序——SOV結構' },
  { stepId: 1,  field: 'body',  translated: '韓語遵循主語→受語→動詞（SOV）的語序。動詞始終放在最後。' },
  { stepId: 1,  field: 'rules', translated: ['英語（SVO）：I eat rice.（我吃飯。）', '韓語（SOV）：나는 밥을 먹어요.（我 飯 吃。）', '提示：聽最後一個詞——那就是動詞，即動作！'] },
  { stepId: 1,  field: 'tip',   translated: { label: '文法提示', text: '一旦你知道動詞放在最後，一切就迎刃而解。句子的其餘部分可以重新排列——韓語說話者用助詞來保持句子清晰。' } },

  { stepId: 4,  field: 'title', translated: '韓語助詞' },
  { stepId: 4,  field: 'body',  translated: '助詞附加在名詞後面，表示其角色：主題、主語、受語、位置。它們取代了固定的語序。' },
  { stepId: 4,  field: 'rules', translated: ['은/는 → 主題助詞（은接在子音後，는接在母音後）', '이/가 → 主語助詞（이接在子音後，가接在母音後）', '을/를 → 受語助詞（을接在子音後，를接在母音後）', '에 → 位置／方向', '에서 → 動作發生的地點', '의 → 所有格（的）'] },

  { stepId: 11, field: 'title', translated: '動詞——字典形' },
  { stepId: 11, field: 'body',  translated: '所有韓語動詞的字典形以다（da）結尾。去掉다得到動詞詞幹，然後加上語尾。' },
  { stepId: 11, field: 'rules', translated: ['가다（去）→ 詞幹：가-', '먹다（吃）→ 詞幹：먹-', '공부하다（學習）→ 詞幹：공부하-', '하다（做）→ 詞幹：하-'] },

  { stepId: 12, field: 'title', translated: '現在時：-아요 / -어요' },
  { stepId: 12, field: 'body',  translated: '詞幹最後母音是ㅏ或ㅗ時加-아요，其他情況加-어요。하다類動詞使用-해요。' },
  { stepId: 12, field: 'rules', translated: ['가다→가요（去·ㅏ詞幹）', '오다→와요（來·ㅗ詞幹）', '먹다→먹어요（吃·其他）', '마시다→마셔요（喝·其他）', '공부하다→공부해요（學習·하다）'] },
  { stepId: 12, field: 'tip',   translated: { label: '母音規則', text: 'ㅏ和ㅗ是「亮」母音→-아요。所有其他母音是「暗」母音→-어요。一旦你知道詞幹母音，變位就自動完成。' } },

  { stepId: 16, field: 'title', translated: '過去時：-았어요 / -었어요' },
  { stepId: 16, field: 'body',  translated: '詞幹最後母音是ㅏ/ㅗ時加-았어요，其他情況加-었어요。하다→했어요。' },
  { stepId: 16, field: 'rules', translated: ['가다→갔어요（去了）', '오다→왔어요（來了）', '먹다→먹었어요（吃了）', '마시다→마셨어요（喝了）', '공부하다→공부했어요（學習了）'] },

  { stepId: 19, field: 'title', translated: '未來時：-(으)ㄹ 거예요' },
  { stepId: 19, field: 'body',  translated: '在動詞詞幹後加-(으)ㄹ 거예요來談論未來的計劃或預測。' },
  { stepId: 19, field: 'rules', translated: ['가다→갈 거예요（將會去）', '먹다→먹을 거예요（將會吃）', '공부하다→공부할 거예요（將會學習）'] },

  { stepId: 21, field: 'title', translated: '構成否定句' },
  { stepId: 21, field: 'body',  translated: '短否定：안＋動詞。長否定：動詞詞幹＋지 않아요。不能：못＋動詞。' },
  { stepId: 21, field: 'rules', translated: ['안 먹어요（不吃——短形式）', '먹지 않아요（不吃——長形式）', '못 가요（不能去——能力上無法）'] },

  { stepId: 23, field: 'title', translated: '構成疑問句' },
  { stepId: 23, field: 'body',  translated: '韓語疑問句與陳述句使用相同的語序——只需在末尾加上升調（↑）或問號。' },
  { stepId: 23, field: 'rules', translated: ['뭐 / 무엇 — 什麼', '누구 — 誰', '어디 — 哪裡', '언제 — 什麼時候', '왜 — 為什麼', '어떻게 — 怎麼', '얼마 — 多少（錢）', '몇 — 幾個'] },
  { stepId: 23, field: 'tip',   translated: { label: '文法提示', text: '밥을 먹어요 = 我吃飯。밥을 먹어요？= 你吃飯嗎？相同的詞——只是末尾升調。不像英語那樣需要倒裝！' } },

  { stepId: 26, field: 'title', translated: '核心句型' },
  { stepId: 26, field: 'body',  translated: '掌握這6個句型，表達韓語對話中最常見的想法。' },
  { stepId: 26, field: 'rules', translated: ['~이에요/예요 — 是（名詞）：학생이에요（我是學生）', '~고 싶어요 — 想要：한국에 가고 싶어요（我想去韓國）', '~ㄹ/을 수 있어요 — 能夠：한국어를 할 수 있어요（我能說韓語）', '~아/어야 해요 — 必須：공부해야 해요（我必須學習）', '~(으)면 — 如果／當：비가 오면 집에 있어요（如果下雨，我待在家）', '~때문에 — 因為：비 때문에 못 가요（因為下雨無法去）'] },

  { stepId: 28, field: 'title', translated: '連接詞' },
  { stepId: 28, field: 'body',  translated: '這4個連接詞連接句子。把它們放在第二個句子的開頭。' },
  { stepId: 28, field: 'rules', translated: ['그리고 — 而且／然後（添加信息或順序）', '그래서 — 所以／因此（原因→結果）', '그렇지만 — 但是／然而（強烈對比，正式）', '그런데 — 但是／順便說一下（溫和對比，口語——最常用！）'] },
  { stepId: 28, field: 'tip',   translated: { label: '用法提示', text: '그런데是韓語口語中最常見的詞之一——它溫和地轉換對比並自然地轉換話題。그렇지만更強烈且更正式。' } },

  { stepId: 31, field: 'title', translated: '與……，和……一起' },
  { stepId: 31, field: 'body',  translated: '在名詞之間（而非句子之間）使用這些助詞，表示「和」或「一起」。' },
  { stepId: 31, field: 'rules', translated: ['-하고 — 接在任何名詞後，中性/口語：친구하고 갔어요（和朋友去了）', '-(이)랑 — 이랑（子音後）/ 랑（母音後），非常口語：오빠랑 놀았어요（和哥哥玩了）', '-와/과 — 와（母音後）/ 과（子音後），正式/書面：선생님과 상담했어요（和老師諮詢了）'] },

  { stepId: 32, field: 'title', translated: '給某人／從某人' },
  { stepId: 32, field: 'body',  translated: '給人或從人那裡接收時，使用人稱方向助詞，而不是地點助詞。' },
  { stepId: 32, field: 'rules', translated: ['-한테 — 給（某人）：친구한테 전화했어요（給朋友打電話了）', '-한테서 — 從（某人）：선생님한테서 배웠어요（從老師那裡學了）', '-에게 / -에게서 — 正式的對應形式', '-께 — 給（尊稱，用於長輩）：선생님께 드렸어요'] },

  { stepId: 33, field: 'title', translated: '說時間' },
  { stepId: 33, field: 'body',  translated: '小時（시）使用固有韓語數字，分鐘（분）使用漢字韓語數字。上午 = 오전，下午 = 오후。' },
  { stepId: 33, field: 'rules', translated: ['小時（시）：한（1）、두（2）、세（3）、네（4）、다섯（5）...＋시', '分鐘（분）：일（1）、이（2）、삼（3）、사（4）、오（5）...＋분', '半小時：반 — 세 시 반 = 3:30', '例：오후 두 시 삼십 분 = 下午2:30'] },
  { stepId: 33, field: 'tip',   translated: { label: '關鍵規律', text: '小時使用固有韓語數字（한、두、세...）。分鐘使用漢字韓語數字（일、이、삼...）。半小時 = 반。上午 = 오전，下午 = 오후。' } },

  { stepId: 36, field: 'title', translated: '量詞' },
  { stepId: 36, field: 'body',  translated: '韓語在【名詞】＋【數字】後使用特定量詞。大多數量詞使用固有韓語數字（한、두、세...）。' },
  { stepId: 36, field: 'rules', translated: ['개 — 一般物品：사과 세 개（3個蘋果）', '명 — 人（中性）：학생 두 명（2名學生）', '분 — 人（尊稱）：손님 두 분（2位客人）', '마리 — 動物：고양이 한 마리（1隻貓）', '권 — 書：책 세 권（3本書）', '잔 — 杯子/飲料：커피 두 잔（2杯咖啡）', '번 — 次/回：세 번（3次）'] },

  { stepId: 39, field: 'title', translated: '現在進行時：-고 있어요' },
  { stepId: 39, field: 'body',  translated: '在動詞詞幹後加-고 있어요，表示某人正在做某事（韓語的「-ing」形式）。' },
  { stepId: 39, field: 'rules', translated: ['먹다→먹고 있어요（正在吃）', '가다→가고 있어요（正在去）', '공부하다→공부하고 있어요（正在學習）', '읽다→읽고 있어요（正在讀）'] },
  { stepId: 39, field: 'tip',   translated: { label: '進行時vs簡單時', text: '먹어요 = 我吃（一般或當下，視語境）。먹고 있어요 = 我正在吃（特別指此刻進行中的動作）。進行時添加「當前正在行動」的含義。' } },

  { stepId: 42, field: 'title', translated: '自我介紹' },
  { stepId: 42, field: 'body',  translated: '關鍵詞彙：이름（名字）、나이（年齡）、나라（國家）、직업（職業）、취미（興趣）、고향（故鄉）。' },
  { stepId: 42, field: 'rules', translated: ['안녕하세요！저는 [name]이에요/예요。', '저는 [나라]에서 왔어요。（我來自[國家]。）', '저는 [직업]이에요。（我是[職業]。）', '제 취미는 [hobby]예요。（我的興趣是[興趣]。）', '잘 부탁드려요！（請多關照！）'] },
  { stepId: 42, field: 'tip',   translated: { label: '模板', text: '正式場合使用안녕하세요＋잘 부탁드려요。與朋友或同輩：안녕！＋잘 부탁해！當面自我介紹時始終略微鞠躬。' } },

  { stepId: 43, field: 'title', translated: '日期和月份' },
  { stepId: 43, field: 'body',  translated: '韓語日期使用漢字韓語數字，格式為年→月→日。6月 = 유월，10月 = 시월（特例）。' },
  { stepId: 43, field: 'rules', translated: ['일월（1월）、이월（2월）、삼월（3월）、사월（4월）、오월（5월）、유월（6월）', '칠월（7월）、팔월（8월）、구월（9월）、시월（10월）、십일월（11월）、십이월（12월）', '日期格式：2026년 6월 16일（2026年6月16日）', '오늘이 며칠이에요？——今天幾號？'] },

  { stepId: 44, field: 'title', translated: '程度副詞' },
  { stepId: 44, field: 'body',  translated: '程度副詞直接放在它所修飾的詞前：조금（一點）、정말（真的）、아주（非常）、많이（很多）。' },
  { stepId: 44, field: 'rules', translated: ['조금 / 좀 — 一點（좀更溫和/口語）', '정말 — 真的／確實（中性）', '진짜 — 真的（口語，感覺更強烈）', '아주 — 非常', '많이 — 很多', '별로 ＋ 否定 — 不太（별로 안 좋아요 = 我不太喜歡）', '전혀 ＋ 否定 — 完全不（전혀 모르겠어요 = 我完全不知道）'] },
  { stepId: 44, field: 'tip',   translated: { label: '否定副詞', text: '별로和전혀必須與否定動詞（안、못、없다、모르다）一起使用。說별로 좋아요（沒有否定）在文法上是錯誤的。把它們分別理解為「不太」和「完全不」。' } },

  { stepId: 47, field: 'title', translated: '名詞化：-는 것' },
  { stepId: 47, field: 'body',  translated: '在動詞詞幹後加-는 것創造名詞短語——「做～的行為」。它讓動詞像名詞一樣運作。' },
  { stepId: 47, field: 'rules', translated: ['먹는 것 — 吃的行為', '배우는 것 — 學習的行為', '한국어를 배우는 것이 재미있어요 — 學韓語很有趣', '요리하는 것을 좋아해요 — 我喜歡做飯（烹飪的行為）'] },
  { stepId: 47, field: 'tip',   translated: { label: '時態形式', text: '-는 것（現在/習慣）· -(으)ㄴ 것（過去/完成）· -(으)ㄹ 것（未來/計劃）。現在形式在日常口語中最常用。' } },

  { stepId: 50, field: 'title', translated: '比較表達' },
  { stepId: 50, field: 'body',  translated: '結構：[A]이/가 [B]보다 더 [形容詞]。보다的意思是「比」，더的意思是「更」。' },
  { stepId: 50, field: 'rules', translated: ['한국어가 영어보다 더 어려워요 — 韓語比英語更難', '오늘이 어제보다 더 더워요 — 今天比昨天更熱', '口語中더可以省略：한국어가 영어보다 어려워요'] },

  { stepId: 53, field: 'title', translated: '좋다 vs 좋아하다' },
  { stepId: 53, field: 'body',  translated: '좋다使用主語助詞（이/가）：한국어가 좋아요。좋아하다使用受語助詞（을/를）：한국어를 좋아해요。' },
  { stepId: 53, field: 'rules', translated: ['좋다 — 好的／感覺好（狀態）：커피가 좋아요（我喜歡咖啡／咖啡不錯）', '좋아하다 — 喜歡（主動偏好）：커피를 좋아해요（我喜歡咖啡）', '兩者都翻譯為「我喜歡」，但좋다側重感受，좋아하다側重偏好'] },
  { stepId: 53, field: 'tip',   translated: { label: '關鍵區別', text: '좋아요→前面接主語助詞（이/가）。좋아해요→前面接受語助詞（을/를）。有疑問時，좋아해요表達偏好聽起來更自然。' } },

  { stepId: 54, field: 'title', translated: '還沒・已經' },
  { stepId: 54, field: 'body',  translated: '아직＋否定動詞 = 還沒有。벌써 = 已經（比預期更早）。이미 = 已經（中性，正式）。' },
  { stepId: 54, field: 'rules', translated: ['아직 안 먹었어요 — 還沒吃（仍然沒有）', '아직 여기 있어요 — 還在這裡（持續中）', '벌써 도착했어요？— 已經到了？（驚訝）', '이미 알아요 — 我已經知道了（中性）'] },

  { stepId: 56, field: 'title', translated: '某人、某事' },
  { stepId: 56, field: 'body',  translated: '將疑問詞與語境結合，表達像「某人」或「什麼都沒有」這樣的不確定概念。' },
  { stepId: 56, field: 'rules', translated: ['누군가 — 某人：누군가 왔어요（某人來了）', '무언가 / 뭔가 — 某事：뭔가 이상해요（某事很奇怪）', '어딘가 — 某處：어딘가에 있어요（在某處）', '아무도 ＋ 否定 — 沒有人：아무도 없어요（這裡沒有人）', '아무것도 ＋ 否定 — 什麼都沒有：아무것도 몰라요（我什麼都不知道）'] },

  { stepId: 58, field: 'title', translated: '命令句：-(으)세요' },
  { stepId: 58, field: 'body',  translated: '在動詞詞幹後加-(으)세요，以禮貌的方式表達請求或命令。' },
  { stepId: 58, field: 'rules', translated: ['가다→가세요（請走／請去）', '앉다→앉으세요（請坐）', '먹다→드세요（請吃——尊稱）'] },

  { stepId: 59, field: 'title', translated: '禁止句：-지 마세요' },
  { stepId: 59, field: 'body',  translated: '在動詞詞幹後加-지 마세요，禮貌地告訴對方不要做某事。' },
  { stepId: 59, field: 'rules', translated: ['말하다→말하지 마세요（請不要說話）', '가다→가지 마세요（請不要去）', '먹다→먹지 마세요（請不要吃）'] },

  { stepId: 62, field: 'title', translated: '方式：-(으)로' },
  { stepId: 62, field: 'body',  translated: '-(으)로標記方式或手段——用某種工具或方式「做」某事。' },
  { stepId: 62, field: 'rules', translated: ['子音後接-(으)로，母音後接-로：버스로 가요（搭公車去）', '지하철로 와요（搭地鐵來）', '한국어로 말해요（用韓語說）'] },

  { stepId: 63, field: 'title', translated: '擅長／不擅長' },
  { stepId: 63, field: 'body',  translated: '잘하다 = 擅長。못하다 = 不擅長。兩者都接在受語助詞을/를後面。' },
  { stepId: 63, field: 'rules', translated: ['한국어를 잘해요（韓語說得好）', '수학을 못해요（數學不好）', '수영을 잘 못해요（游泳不太好）'] },

  { stepId: 65, field: 'title', translated: '全部、更多：다、더' },
  { stepId: 65, field: 'body',  translated: '다 = 全部/全都。더 = 更多。兩者都是簡單副詞，放在動詞前面。' },
  { stepId: 65, field: 'rules', translated: ['다 먹었어요 — 全部吃完了', '더 주세요 — 請再給（我）一些', '다和더在語境中的用法非常不同'] },

  { stepId: 67, field: 'title', translated: '全部、更多與-도' },
  { stepId: 67, field: 'body',  translated: '-도除了簡單的「也」之外還有4種進階用法：強調、強烈否定和「既…又…」。' },
  { stepId: 67, field: 'rules', translated: ['아이도 알아요 — 連孩子都知道（強調：出乎意料的包含）', '하나도 없어요 — 一個都沒有（強烈否定：하나도＋否定）', '먹기도 해요 — 有時吃／也吃（-기도 하다）', '좋기도 하고 나쁘기도 해요 — 既好又壞'] },

  // Listen repeats
  { stepId: 2,  field: 'meaning', translated: '我吃飯。（主語＋受語＋動詞）' },
  { stepId: 5,  field: 'meaning', translated: '我是學生。（는 = 主題助詞）' },
  { stepId: 7,  field: 'meaning', translated: '雨來了。／正在下雨。（가 = 主語助詞）' },
  { stepId: 9,  field: 'meaning', translated: '我在咖啡廳喝咖啡。（에서 = 動作地點）' },
  { stepId: 13, field: 'meaning', translated: '我去。／讓我們去。（가다→가요，禮貌現在時）' },
  { stepId: 14, field: 'meaning', translated: '我吃。（먹다→먹어요，禮貌現在時）' },
  { stepId: 17, field: 'meaning', translated: '我去了首爾。' },
  { stepId: 24, field: 'meaning', translated: '你叫什麼名字？' },
  { stepId: 29, field: 'meaning', translated: '下雨了。所以我待在家裡。' },
  { stepId: 34, field: 'meaning', translated: '現在幾點？' },
  { stepId: 37, field: 'meaning', translated: '請給我三個蘋果。' },
  { stepId: 40, field: 'meaning', translated: '我現在正在吃飯。' },
  { stepId: 45, field: 'meaning', translated: '真的很好吃！' },
  { stepId: 48, field: 'meaning', translated: '學韓語很有趣。' },
  { stepId: 51, field: 'meaning', translated: '韓語比日語更難。' },
  { stepId: 60, field: 'meaning', translated: '請慢慢說。' },
  { stepId: 68, field: 'meaning', translated: '韓語既難又有趣。' },

  // Match quizzes
  { stepId: 3,  field: 'prompt',  translated: '在韓語句子中，動詞始終放在…' },
  { stepId: 3,  field: 'choices', translated: ['最後', '最前', '第二個', '任何位置'] },
  { stepId: 6,  field: 'prompt',  translated: '은/는標記的是___' },
  { stepId: 6,  field: 'choices', translated: ['主題', '主語', '受語', '地點'] },
  { stepId: 8,  field: 'prompt',  translated: '把밥（飯）標記為受語：밥___ 먹어요' },
  { stepId: 8,  field: 'choices', translated: ['을', '는', '가', '에'] },
  { stepId: 10, field: 'prompt',  translated: '에서標記的是…' },
  { stepId: 10, field: 'choices', translated: ['動作發生的地點', '目的地', '主題', '受語'] },
  { stepId: 15, field: 'prompt',  translated: '가다（去）→禮貌現在時形式？' },
  { stepId: 15, field: 'choices', translated: ['가요', '가아요', '가어요', '갔어요'] },
  { stepId: 18, field: 'prompt',  translated: '먹다（吃）的過去時？' },
  { stepId: 18, field: 'choices', translated: ['먹었어요', '먹아요', '먹어요', '먹을 거예요'] },
  { stepId: 20, field: 'prompt',  translated: '가다（去）→未來時？' },
  { stepId: 20, field: 'choices', translated: ['갈 거예요', '갔어요', '가요', '가지 마세요'] },
  { stepId: 22, field: 'prompt',  translated: '「我不吃」——短否定形式' },
  { stepId: 22, field: 'choices', translated: ['안 먹어요', '먹지 않아요', '못 먹어요', '안 가요'] },
  { stepId: 25, field: 'prompt',  translated: '「哪裡」的韓語是？' },
  { stepId: 25, field: 'choices', translated: ['어디', '뭐', '왜', '언제'] },
  { stepId: 27, field: 'prompt',  translated: '「我想去韓國」的句型：한국에 ___' },
  { stepId: 27, field: 'choices', translated: ['가고 싶어요', '가야 해요', '갈 거예요', '갈 수 있어요'] },
  { stepId: 30, field: 'prompt',  translated: '口語韓語中最常用的溫和對比或話題轉換詞？' },
  { stepId: 30, field: 'choices', translated: ['그런데', '그렇지만', '그래서', '그리고'] },
  { stepId: 35, field: 'prompt',  translated: '韓語計時的小時使用哪種數字系統？' },
  { stepId: 35, field: 'choices', translated: ['固有韓語數字（한、두、세...）', '漢字韓語數字（일、이、삼...）', '兩者皆可', '阿拉伯數字'] },
  { stepId: 38, field: 'prompt',  translated: '計人（中性）的量詞？' },
  { stepId: 38, field: 'choices', translated: ['명', '개', '마리', '잔'] },
  { stepId: 41, field: 'prompt',  translated: '「正在學習」→ 공부하다 ＋ -고 있어요 =' },
  { stepId: 41, field: 'choices', translated: ['공부하고 있어요', '공부고 있어요', '공부하고 있다', '공부해요'] },
  { stepId: 46, field: 'prompt',  translated: '별로和전혀必須與…一起使用' },
  { stepId: 46, field: 'choices', translated: ['否定動詞', '肯定動詞', '只有形容詞', '只有過去時'] },
  { stepId: 49, field: 'prompt',  translated: '-는 것把動詞變成…' },
  { stepId: 49, field: 'choices', translated: ['名詞短語', '過去時', '未來時', '疑問句'] },
  { stepId: 52, field: 'prompt',  translated: '韓語比較中「更」怎麼說？' },
  { stepId: 52, field: 'choices', translated: ['더', '많이', '아주', '보다'] },
  { stepId: 55, field: 'prompt',  translated: '「아직」是什麼意思？' },
  { stepId: 55, field: 'choices', translated: ['還沒', '已經', '甚至', '更多'] },
  { stepId: 57, field: 'prompt',  translated: '「這裡沒有人」——아무도 ___' },
  { stepId: 57, field: 'choices', translated: ['없어요', '있어요', '알아요', '와요'] },
  { stepId: 61, field: 'prompt',  translated: '韓語中「請不要說話」是？' },
  { stepId: 61, field: 'choices', translated: ['말하지 마세요', '말해 주세요', '말하세요', '말 안 해요'] },
  { stepId: 64, field: 'prompt',  translated: '「韓語說得好」——한국어를 ___' },
  { stepId: 64, field: 'choices', translated: ['잘해요', '못해요', '좋아해요', '잘 못해요'] },
  { stepId: 66, field: 'prompt',  translated: '「請再給我一些」——___ 주세요' },
  { stepId: 66, field: 'choices', translated: ['더', '다', '좀', '잘'] },
  { stepId: 69, field: 'prompt',  translated: '「連孩子都知道」——哪種-도的用法？' },
  { stepId: 69, field: 'choices', translated: ['아이도 알아요', '아이가 알아요', '아이를 알아요', '아이는 알아요'] },

  // Lesson complete
  { stepId: 70, field: 'message', translated: '你已掌握全部26個文法階段——從SOV語序和助詞到進階的-도句型。開始在真實對話中應用這些吧！' },
];

// ══════════════════════════════════════════════════════════════
// nouns.json — 55 fields
// ══════════════════════════════════════════════════════════════
const NOUNS = [
  // Reading cards
  { stepId: 1,  field: 'title', translated: '韓語名詞（명사）' },
  { stepId: 1,  field: 'body',  translated: '韓語名詞（명사）不因性別或數量而改變。同一個詞사람可以表示「人」「人們」「某人」和「這個人」。複數由語境理解，或通過들（複數後綴，例如사람들 = 人們）另行表達。沒有「a」或「the」這樣的冠詞。這使韓語名詞非常容易學習——你只需要知道詞本身。' },
  { stepId: 1,  field: 'tip',   translated: { label: '複數後綴들', text: '들溫和地添加複數：친구들（朋友們）、학생들（學生們）。你可以把들附加在人或動物上，但它是可選的，語境清楚時通常省略。' } },

  { stepId: 8,  field: 'title', translated: '家族名詞（가족 명사）' },
  { stepId: 8,  field: 'body',  translated: '韓語的家族稱謂往往根據說話者的性別而不同。오빠（oppa）是女性稱呼她的哥哥，而형（hyung）是男性稱呼他的哥哥。同樣，언니（unni）= 哥哥（女性說話者）；누나（nuna）= 姐姐（男性說話者）。父母的正式稱謂是아버지／어머니，口語稱謂是아빠／엄마。' },
  { stepId: 8,  field: 'tip',   translated: { label: '依性別的稱謂', text: '不像英語，韓語沒有一個單詞代表「兄弟姐妹」。你說오빠/형還是언니/누나，完全取決於你自己的性別以及兄弟姐妹的相對年齡。這是韓語家族詞彙的核心。' } },

  { stepId: 11, field: 'title', translated: '地點名詞（장소 명사）' },
  { stepId: 11, field: 'body',  translated: '韓語地點名詞遵循與所有其他名詞相同的無冠詞規則。학교表示「學校」「一所學校」或「這所學校」——由語境判斷。在表達方向或位置時，韓語在地點名詞後加助詞에（在/到）：학교에 가요（我去學校）。地點名詞是最值得早期學習的實用詞彙之一。' },
  { stepId: 11, field: 'tip',   translated: { label: '位置助詞에', text: '在地點名詞後加에，表示「在」「往」「到」：집에（在家）、학교에（到學校）、식당에（在餐廳）。에서表示「從」或「在（做某事）」：학교에서 공부해요（我在學校學習）。' } },

  { stepId: 17, field: 'title', translated: '時間名詞（시간 명사）' },
  { stepId: 17, field: 'body',  translated: '韓語的時間名詞獨立運作——不需要變位。只需在句子開頭放上時間詞：오늘 가요（我今天去）、내일 만나요（明天見）。韓語時間表達使用漢字韓語數字表示小時，固有韓語數字表示分鐘。最基本的時間詞是오늘（今天）、내일（明天）、어제（昨天）和지금（現在）。' },
  { stepId: 17, field: 'tip',   translated: { label: '時間詞作為句子開頭', text: '韓語語序非常靈活，但時間表達通常出現在句子較早的位置——在主語之前或緊接主語之後。「오늘 학교에 가요」和「학교에 오늘 가요」都是正確的，但前者更自然。' } },

  { stepId: 20, field: 'title', translated: '物品名詞（사물 명사）' },
  { stepId: 20, field: 'body',  translated: '日常物品是最即時實用的韓語詞彙。韓語既有固有韓語詞也有漢字韓語詞，許多情況下使用外來語（英語借詞）：커피（咖啡）、핸드폰（手機）。當物品是動詞的直接受語時，在名詞後加을/를：책을 읽어요（我讀書）。這是受語助詞。' },
  { stepId: 20, field: 'tip',   translated: { label: '受語助詞을/를', text: '以子音結尾的名詞使用을：책을。以母音結尾的名詞使用를：가방을。在口語中，這個助詞通常完全省略。' } },

  { stepId: 25, field: 'title', translated: '韓語量詞（수사）' },
  { stepId: 25, field: 'body',  translated: '韓語使用稱為量詞（수사）的計數詞，在數數特定事物時附加在數字後面。개用於一般物品：한 개（一個）、세 개（三個）。명用於數人：두 명（兩人）。잔用於杯子／杯子：한 잔（一杯）。模式是：數字＋量詞，放在名詞正前方或正後方。量詞使用固有韓語數字：하나(1)、둘(2)、셋(3)、넷(4)、다섯(5)。' },
  { stepId: 25, field: 'tip',   translated: { label: '固有韓語數字與量詞', text: '固有韓語數字與量詞結合時，數字會稍微變化：하나→한、둘→두、셋→세、넷→네。所以是한 개（不是하나 개）、두 명（不是둘 명）。' } },

  { stepId: 28, field: 'title', translated: '所有格助詞의' },
  { stepId: 28, field: 'body',  translated: '所有格助詞의（ui，口語常發音為「에」）附加在名詞後面表示所有權，相當於英語的所有格用法。저의 가방 = 我的包，친구의 집 = 朋友的家。在日常口語中，의通常省略：제 가방（我的包，禮貌）或내 가방（我的包，隨意）。代詞저和나有特殊的所有格形式：제（禮貌，我的）和내（隨意，我的）。' },
  { stepId: 28, field: 'tip',   translated: { label: '제 vs 내', text: '제是禮貌／謙遜的「我的」（來自저 = 我，禮貌）。내是隨意的「我的」（來自나 = 我，隨意）。對陌生人或長輩使用제，對親密朋友使用내。' } },

  // Listen repeats
  { stepId: 2,  field: 'meaning', translated: '人' },
  { stepId: 3,  field: 'meaning', translated: '男性／男孩' },
  { stepId: 4,  field: 'meaning', translated: '女性／女孩' },
  { stepId: 5,  field: 'meaning', translated: '孩子' },
  { stepId: 6,  field: 'meaning', translated: '朋友' },
  { stepId: 9,  field: 'meaning', translated: '父親（正式）' },
  { stepId: 10, field: 'meaning', translated: '母親（正式）' },
  { stepId: 12, field: 'meaning', translated: '房子／家' },
  { stepId: 13, field: 'meaning', translated: '學校' },
  { stepId: 14, field: 'meaning', translated: '餐廳／食堂' },
  { stepId: 15, field: 'meaning', translated: '醫院／診所' },
  { stepId: 18, field: 'meaning', translated: '今天' },
  { stepId: 21, field: 'meaning', translated: '書' },
  { stepId: 22, field: 'meaning', translated: '包／背包' },
  { stepId: 23, field: 'meaning', translated: '錢' },
  { stepId: 26, field: 'meaning', translated: '三個人（명 = 人數量詞）' },
  { stepId: 29, field: 'meaning', translated: '我的包（禮貌）' },
  { stepId: 30, field: 'meaning', translated: '我的朋友（隨意）' },
  { stepId: 32, field: 'meaning', translated: '朋友的家' },

  // Match quizzes
  { stepId: 7,  field: 'prompt',  translated: '哪個詞的意思是「朋友」？' },
  { stepId: 7,  field: 'choices', translated: ['남자', '여자', '친구', '아이'] },
  { stepId: 16, field: 'prompt',  translated: '哪個詞的意思是「學校」？' },
  { stepId: 16, field: 'choices', translated: ['집', '식당', '병원', '학교'] },
  { stepId: 19, field: 'prompt',  translated: '哪個詞的意思是「今天」？' },
  { stepId: 19, field: 'choices', translated: ['내일', '어제', '오늘', '지금'] },
  { stepId: 24, field: 'prompt',  translated: '哪個詞的意思是「錢」？' },
  { stepId: 24, field: 'choices', translated: ['책', '가방', '돈', '핸드폰'] },
  { stepId: 27, field: 'prompt',  translated: '哪種量詞用於數人（計算人數）？' },
  { stepId: 27, field: 'choices', translated: ['개', '명', '잔', '권'] },
  { stepId: 31, field: 'prompt',  translated: '韓語禮貌語中「我的包」怎麼說？' },
  { stepId: 31, field: 'choices', translated: ['내 가방', '저의 책', '제 가방', '나의 집'] },
  { stepId: 33, field: 'prompt',  translated: '의是韓語的所有格助詞。它在英語中對應什麼？' },
  { stepId: 33, field: 'choices', translated: ['主語助詞', '\'s（所有格）', '受語助詞', '複數後綴'] },

  // Lesson complete
  { stepId: 34, field: 'message', translated: '你已學會韓語基本名詞——人物、地點、物品、時間詞、量詞和所有格。接下來繼續學習代名詞吧。' },
];

// ══════════════════════════════════════════════════════════════
// pronouns.json — 49 fields
// ══════════════════════════════════════════════════════════════
const PRONOUNS = [
  // Reading cards
  { stepId: 1,  field: 'title', translated: '韓語代名詞概覽' },
  { stepId: 1,  field: 'body',  translated: '韓語的第一人稱代名詞有兩個等級：禮貌級和隨意級。저（jeo）是禮貌的「我」，用於陌生人、長輩和正式場合。나（na）是隨意的「我」，用於親密朋友和年輕人。重要的是，當語境清楚時，韓語非常常見地完全省略主語代名詞——어디 가요？可以表示「你去哪裡？」而根本不用任何代名詞。掌握何時「不用」代名詞與知道代名詞本身同樣重要。' },
  { stepId: 1,  field: 'tip',   translated: { label: '省略主語的語言', text: '韓語是主語省略語言——當主語從語境或近期提及中顯而易見時，省略代名詞。留下代名詞可能聽起來不自然，甚至略顯無禮（過於直接）。저 괜찮아요和괜찮아요都表示「我沒事」，但較短的形式更自然。' } },

  { stepId: 7,  field: 'title', translated: '韓語中如何說「你」' },
  { stepId: 7,  field: 'body',  translated: '韓語在大多數日常口語中避免使用直接代名詞「你」（당신）——根據語境，它可能聽起來冷漠、對立或過於正式。取而代之，韓國人使用對方的名字、頭銜或關係稱謂。老師被稱為선생님（老師），而不是당신。朋友則直接叫名字。당신出現在歌曲、詩歌和正式寫作中，但在日常對話中並不常見。' },
  { stepId: 7,  field: 'tip',   translated: { label: '如何不用당신稱呼對方', text: '對不熟悉的成年人使用名字＋씨：김민준씨。使用職稱：사장님（老闆）、과장님（經理）。使用關係稱謂：언니、오빠、아저씨。這些都比당신自然得多。' } },

  { stepId: 10, field: 'title', translated: '第三人稱與我們（그·그녀·우리）' },
  { stepId: 10, field: 'body',  translated: '韓語在口語中很少使用他/她的代名詞。取而代之，韓國人說對方的名字或使用指示語：그 사람（那個人）、이 사람（這個人）。그（geu）和그녀（geunyeo）確實存在——他/她——但它們主要出現在書面和翻譯中。우리（uri）的意思是「我們」或「我們的」。有趣的是，韓國人在英語使用「我的」的地方用우리：우리 엄마（我媽，字面意思「我們的媽」）——這反映了一種集體主義的共享家庭文化感。' },
  { stepId: 10, field: 'tip',   translated: { label: '우리 = 我的（用於家庭與國家）', text: '우리 나라（我們的國家）、우리 집（我的/我們的家）、우리 엄마（我的媽媽）——這些自然且常見。用나의 나라或나의 집代替聽起來不自然，幾乎有些冷漠。' } },

  { stepId: 18, field: 'title', translated: '指示代名詞（이·그·저）' },
  { stepId: 18, field: 'body',  translated: '韓語根據空間距離有三個層次的指示詞。이（i）= 說話者附近。그（geu）= 聽話者附近或之前提到的。저（jeo）= 離說話者和聽話者都很遠。這些與것（geot，「東西」）結合形成代名詞：이것（這個）、그것（那個）、저것（那邊的那個）。在口語中縮短為：이거、그거、저거。同樣的이/그/저根也與地點詞結合：여기（這裡）、거기（那裡）、저기（那邊）。' },
  { stepId: 18, field: 'tip',   translated: { label: '이/그/저 vs 여기/거기/저기', text: '이/그/저 + 것 = 這個/那個/那邊的東西。이/그/저 + -(e)gi = 這裡/那裡/那邊。所以여기（yeo-gi）= 這裡（說話者附近）、거기（geo-gi）= 那裡（聽話者附近）、저기（jeo-gi）= 那邊（兩者都遠）。' } },

  { stepId: 26, field: 'title', translated: '疑問代名詞（의문대명사）' },
  { stepId: 26, field: 'body',  translated: '韓語的疑問詞放在與所替換詞相同的句子位置——不像英語把「what」和「where」移到句首。比較：영화 봐요?（你看電影嗎？）vs 뭐 봐요?（你看什麼？）。疑問詞直接替換到原來的位置。主要疑問代名詞有：누구（誰）、무엇/뭐（什麼）、어디（哪裡）、언제（什麼時候）、왜（為什麼）、어떻게（怎麼）、얼마（多少錢）。' },
  { stepId: 26, field: 'tip',   translated: { label: '不需要疑問倒裝', text: '英語把疑問詞移到句首並倒裝主語動詞：「What are you doing?」韓語保持與陳述句相同的語序，只是替換疑問詞：뭐 해요?（你在做什麼？）——字面意思「什麼 做？」' } },

  // Listen repeats
  { stepId: 2,  field: 'meaning', translated: '我（禮貌）' },
  { stepId: 3,  field: 'meaning', translated: '我（隨意）' },
  { stepId: 4,  field: 'meaning', translated: '我（主格，禮貌）——저＋主語助詞가→제가' },
  { stepId: 5,  field: 'meaning', translated: '你（隨意）——對成年人很少說' },
  { stepId: 8,  field: 'meaning', translated: '我（主題，禮貌）——저＋主題助詞는→저는' },
  { stepId: 11, field: 'meaning', translated: '我們／我們的（常用作「我的」表示共享事物）' },
  { stepId: 12, field: 'meaning', translated: '我們／我們的（謙遜，우리的禮貌形式）' },
  { stepId: 13, field: 'meaning', translated: '那個人（= 他／她，非正式方式）' },
  { stepId: 14, field: 'meaning', translated: '他們／她們（書面形式）' },
  { stepId: 16, field: 'meaning', translated: '我的／我們的國家（韓國）——字面意思「我們的國家」' },
  { stepId: 19, field: 'meaning', translated: '這個（東西）——說話者附近' },
  { stepId: 20, field: 'meaning', translated: '那個（東西）——聽話者附近或已提及' },
  { stepId: 21, field: 'meaning', translated: '那邊的那個東西——兩者都遠' },
  { stepId: 22, field: 'meaning', translated: '這個（이것的隨意形式）' },
  { stepId: 24, field: 'meaning', translated: '這裡（說話者附近）' },
  { stepId: 27, field: 'meaning', translated: '誰' },
  { stepId: 28, field: 'meaning', translated: '什麼（正式）' },
  { stepId: 29, field: 'meaning', translated: '什麼（隨意，非常常用）' },
  { stepId: 30, field: 'meaning', translated: '哪裡' },

  // Match quizzes
  { stepId: 6,  field: 'prompt',  translated: '哪個代名詞是「我」的禮貌形式？' },
  { stepId: 6,  field: 'choices', translated: ['나', '너', '저', '당신'] },
  { stepId: 9,  field: 'prompt',  translated: '為什麼韓國人在對話中很少說당신？' },
  { stepId: 9,  field: 'choices', translated: ['它的意思是「敵人」', '它聽起來冷漠或對立', '它只在書面中有效', '它太隨意了'] },
  { stepId: 15, field: 'prompt',  translated: '우리 엄마字面意思是「我們的媽媽」，但實際用來表示…' },
  { stepId: 15, field: 'choices', translated: ['別人的媽媽', '我的媽媽', '老師', '陌生人'] },
  { stepId: 17, field: 'prompt',  translated: '哪種「我們」的形式更謙遜有禮，用於對長輩說話？' },
  { stepId: 17, field: 'choices', translated: ['우리', '저희', '그들', '너희'] },
  { stepId: 23, field: 'prompt',  translated: '哪個指示詞指的是離說話者和聽話者都很遠的東西？' },
  { stepId: 23, field: 'choices', translated: ['이것', '그것', '저것', '어떤 것'] },
  { stepId: 25, field: 'prompt',  translated: '저것是正式版本。隨意版本是什麼？' },
  { stepId: 25, field: 'choices', translated: ['이거', '그거', '저거', '뭐'] },
  { stepId: 31, field: 'prompt',  translated: '哪個疑問代名詞的意思是「誰」？' },
  { stepId: 31, field: 'choices', translated: ['뭐', '어디', '누구', '왜'] },

  // Lesson complete
  { stepId: 32, field: 'message', translated: '你已掌握韓語代名詞——從禮貌的저到隨意的나，從우리（我們的／我的），到指示代名詞和疑問詞。進步很大！' },
];

// ══════════════════════════════════════════════════════════════
// shopping.json — 51 fields
// ══════════════════════════════════════════════════════════════
const SHOPPING = [
  // Reading cards
  { stepId: 1,  field: 'title', translated: '在韓國購物（쇼핑）' },
  { stepId: 1,  field: 'body',  translated: '韓國有豐富的購物文化——從傳統的戶外市場（시장）到高端百貨公司（백화점），到街角的24小時便利商店（편의점）。在傳統市場議價是正常的，但在連鎖店或商場則不行。學會用韓語詢問價格、比較商品和完成交易，將使你的購物體驗更順暢、更個人化。你最常用的關鍵問句是얼마예요？（多少錢？）' },
  { stepId: 1,  field: 'tip',   translated: { label: '廣藏市場 vs 百貨公司', text: '在首爾광장시장（廣藏市場）這樣的傳統市場，你可以議價——尤其是購買多件時。在롯데백화점（樂天百貨）或任何連鎖店，價格是固定的。留意세일（折扣）標誌和할인（優惠）促銷。' } },

  { stepId: 7,  field: 'title', translated: '購物物品詞彙（쇼핑 물건）' },
  { stepId: 7,  field: 'body',  translated: '韓語對現代產品使用許多外來語——핸드폰（手機）、노트북（筆記型電腦）、티셔츠（T恤）。固有韓語和漢字韓語涵蓋傳統物品：옷（衣服）、신발（鞋子）、가방（包）。購物時，你經常會指著某樣東西說이거（這個）——這是一個簡單有效的策略。尺寸通常以free-size（프리 사이즈）、S、M和L/XL表示。' },
  { stepId: 7,  field: 'tip',   translated: { label: '이거 주세요——你的購物救命句', text: '이거 주세요（這個，請）＋얼마예요?（多少錢？）這兩句話，即使你幾乎不懂其他韓語，也能應付大多數韓國購物場景。指著商品說這兩句話，就搞定了。' } },

  { stepId: 10, field: 'title', translated: '關鍵購物用語（쇼핑 표현）' },
  { stepId: 10, field: 'body',  translated: '幾個基本用語幾乎能應對每一次購物互動。얼마예요？（多少錢？）適用於任何詢價。이거 주세요（請給我這個）完成購買。더 싸게 해 주세요（請便宜一點）用於在傳統市場議價。있어요?（你們有……嗎？）＋物品名稱，詢問某物是否有貨。없어요表示缺貨或無貨。' },
  { stepId: 10, field: 'tip',   translated: { label: '禮貌的購物語氣', text: '在韓國商店，員工通常會用어서 오세요!（歡迎光臨！）迎接你。以點頭或안녕하세요回應。購物結束後，감사합니다（謝謝）總是受歡迎的。在店內大聲呼叫比較少見——開口前先靠近員工。' } },

  { stepId: 15, field: 'title', translated: '詢問有無（있어요? / 없어요）' },
  { stepId: 15, field: 'body',  translated: '있어요?（有嗎？／你們有……嗎？）和없어요（沒有／我們沒有）是韓語購物中最有用的兩個詞。在있어요?前加物品名：이거 있어요?（你們有這個嗎？）、더 큰 사이즈 있어요?（你們有更大的尺碼嗎？）。없어요是售罄的回答。你也可以說다 팔렸어요（全部賣完了）更詳細地說明。' },
  { stepId: 15, field: 'tip',   translated: { label: '있다 vs 없다', text: '있다 = 存在／擁有。없다 = 不存在／沒有。있어요?單獨放在句末 = 你們有……嗎？없어요. = 我們沒有。這兩個詞出現在幾乎每一個討論擁有、位置或庫存的韓語句子中。' } },

  { stepId: 19, field: 'title', translated: '韓國貨幣與價格（원）' },
  { stepId: 19, field: 'body',  translated: '韓國貨幣是원（韓圜，₩）。由於1,000韓圜 ≈ 0.75美元，價格看起來可能很大。一杯咖啡約4,500원，一頓飯8,000~12,000원。비싸다（貴）和싸다（便宜）是表達價格評論的關鍵詞。找到的零錢叫거스름돈。傳統市場的價格通常可以議價——깎아 주세요（請打折）或더 싸게요?（可以再便宜一點嗎？）開啟議價。' },
  { stepId: 19, field: 'tip',   translated: { label: '如何看懂韓語價格', text: '韓語使用漢字韓語數字計價：일(1) 이(2) 삼(3) 사(4) 오(5)。만 = 10,000。所以삼만 오천 원 = 35,000韓圜。收銀員通常會在計算機或螢幕上顯示金額，以避免混淆——指著數字完全沒問題。' } },

  { stepId: 27, field: 'title', translated: '付款方式（결제 방법）' },
  { stepId: 27, field: 'body',  translated: '韓國是一個高度無現金社會——大多數地方接受信用卡（신용카드）或金融卡（체크카드），通過KakaoPay和Samsung Pay等應用程序的行動支付也非常普遍。現金（현금）到處都能使用，但使用頻率較低。結帳時可能被問到카드요, 현금이요?（刷卡還是現金？）。索取收據是영수증 주세요。商店的Tax Refund標誌表示你作為遊客可以在機場申請退回增值稅。' },
  { stepId: 27, field: 'tip',   translated: { label: '카카오페이 & 삼성페이', text: 'KakaoPay（카카오페이）和Samsung Pay（삼성페이）是韓國最主流的行動支付應用程序。遊客幾乎到處都能使用國際信用卡。尋找非接觸式支付標誌——韓國的非接觸式支付普及率是全球最高之一。' } },

  // Listen repeats
  { stepId: 2,  field: 'meaning', translated: '商店' },
  { stepId: 3,  field: 'meaning', translated: '市場（傳統戶外市場）' },
  { stepId: 4,  field: 'meaning', translated: '百貨公司' },
  { stepId: 5,  field: 'meaning', translated: '便利商店' },
  { stepId: 8,  field: 'meaning', translated: '衣服' },
  { stepId: 9,  field: 'meaning', translated: '鞋子' },
  { stepId: 11, field: 'meaning', translated: '多少錢？' },
  { stepId: 12, field: 'meaning', translated: '請給我這個／我要這個' },
  { stepId: 13, field: 'meaning', translated: '請便宜一點／可以打折嗎？' },
  { stepId: 16, field: 'meaning', translated: '有／我有／我們有（禮貌）' },
  { stepId: 17, field: 'meaning', translated: '沒有／我們沒有／售罄' },
  { stepId: 20, field: 'meaning', translated: '韓圜——韓國貨幣（₩）' },
  { stepId: 21, field: 'meaning', translated: '貴' },
  { stepId: 22, field: 'meaning', translated: '便宜' },
  { stepId: 23, field: 'meaning', translated: '折扣' },
  { stepId: 25, field: 'meaning', translated: '零錢（付款後找回的錢）' },
  { stepId: 28, field: 'meaning', translated: '我要刷卡' },
  { stepId: 29, field: 'meaning', translated: '我要付現金（謙遜形式）' },
  { stepId: 30, field: 'meaning', translated: '請給我收據' },
  { stepId: 32, field: 'meaning', translated: '請打折／請降價' },

  // Match quizzes
  { stepId: 6,  field: 'prompt',  translated: '哪個詞表示「市場」（傳統戶外市場）？' },
  { stepId: 6,  field: 'choices', translated: ['가게', '백화점', '시장', '편의점'] },
  { stepId: 14, field: 'prompt',  translated: '韓語中「多少錢？」怎麼說？' },
  { stepId: 14, field: 'choices', translated: ['이거 주세요', '얼마예요?', '감사합니다', '있어요?'] },
  { stepId: 18, field: 'prompt',  translated: '없어요的意思是…' },
  { stepId: 18, field: 'choices', translated: ['我們有', '多少錢？', '沒有／我們沒有', '好的，請'] },
  { stepId: 24, field: 'prompt',  translated: '비싸다的意思是…' },
  { stepId: 24, field: 'choices', translated: ['便宜', '免費', '貴', '打折'] },
  { stepId: 26, field: 'prompt',  translated: '哪個詞表示「零錢」（付款後找回你的錢）？' },
  { stepId: 26, field: 'choices', translated: ['거스름돈', '비싸다', '할인', '원'] },
  { stepId: 31, field: 'prompt',  translated: '「我要刷卡」怎麼說？' },
  { stepId: 31, field: 'choices', translated: ['현금으로 드릴게요', '카드로 할게요', '거스름돈 주세요', '결제해 주세요'] },

  // Lesson complete
  { stepId: 33, field: 'message', translated: '你已準備好在韓國購物了！你知道了關鍵詞彙、詢問價格的用語、議價、確認庫存以及完成付款交易的方法。' },
];

// ══════════════════════════════════════════════════════════════
// emotions.json — 51 fields
// ══════════════════════════════════════════════════════════════
const EMOTIONS = [
  // Reading cards
  { stepId: 1,  field: 'title', translated: '韓語情緒詞彙（감정）' },
  { stepId: 1,  field: 'body',  translated: '韓語的情緒詞在其基本形式中大多是形容詞。不像英語（「I am happy」），韓語形容詞像動詞一樣直接變位：행복해요（我很幸福／很開心），不需要單獨的「am/is/are」。字典形以-다結尾：행복하다、슬프다、무섭다。去掉-다再加-아요/-어요即為禮貌現在時。情緒詞彙在談論韓劇、日常生活和個人感受時特別有用。' },
  { stepId: 1,  field: 'tip',   translated: { label: '形容詞像動詞一樣變位', text: '행복하다→행복해요（我很幸福）。슬프다→슬퍼요（我很悲傷）。피곤하다→피곤해요（我很疲倦）。-아요/-어요語尾同時使形容詞變成禮貌和現在時。' } },

  { stepId: 7,  field: 'title', translated: '情緒形容詞的變位' },
  { stepId: 7,  field: 'body',  translated: '要在禮貌對話中使用情緒形容詞，去掉字典形的-다，再加禮貌現在時語尾。詞幹以하結尾的：하다→해요（행복하다→행복해요）。詞幹最後母音為亮母音（ㅏ、ㅗ）的：加-아요。其他情況：加-어요，通常縮約——슬프다→슬프+어요→슬퍼요，무섭다→무서워요。同樣的規律適用於大多數韓語描述性動詞（形容詞）。' },
  { stepId: 7,  field: 'tip',   translated: { label: '快速變位表', text: '행복하다→행복해요。슬프다→슬퍼요。화나다→화나요。무섭다→무서워요。피곤하다→피곤해요。기쁘다→기뻐요。注意슬프다在-어요前省略了으。' } },

  { stepId: 10, field: 'title', translated: '更多感受詞彙（감정 어휘）' },
  { stepId: 10, field: 'body',  translated: '韓語除了基本情緒詞之外還有豐富的情緒詞彙。기쁘다（感到高興/喜悅）是比행복하다稍強或更具體的喜悅。걱정되다（感到擔心）字面意思是「擔心發生了」。신나다（感到興奮/亢奮）常用於充滿活力的場合——音樂會、體育賽事、慶典。피곤하다（感到疲倦）在日常生活中必不可少，尤其是在解釋無法做某事時。' },
  { stepId: 10, field: 'tip',   translated: { label: '신나다在流行文化中', text: '신나다和신나요在韓國流行文化中隨處可見。K-pop歌曲常用신나來描述令人興奮的節拍或氛圍。你也會在活動和派對上聽到신난다!（太興奮了！）這樣的感嘆詞。' } },

  { stepId: 16, field: 'title', translated: '기분——心情與感受' },
  { stepId: 16, field: 'body',  translated: '기분（gibun）是描述你的心情或一般感受狀態的關鍵詞。기분이 좋다 = 感覺良好／心情好。기분이 나쁘다 = 感覺不好／心情差。기분比單一情緒詞更廣泛地描述情感基調——它關乎你的整體狀態。你會在日常對話中聽到기분이 어때요?（你感覺怎麼樣？）。' },
  { stepId: 16, field: 'tip',   translated: { label: '기분 vs 감정', text: '기분 = 心情，一般感受狀態（隨語境而變）。감정 = 情感（更具體的感受，如憤怒、喜悅、恐懼）。기분이 좋아요 = 我現在感覺很好。감정을 표현하다 = 表達情感。' } },

  { stepId: 19, field: 'title', translated: '更深層的情緒（깊은 감정）' },
  { stepId: 19, field: 'body',  translated: '韓語有幾個在英語中沒有單詞對應的情緒詞。그립다（geuripda）描述思念某人或某事——對所愛的缺席之人或地方的渴望。외롭다（oeropda）是孤獨，但帶有更深的文化隔絕感。부끄럽다（bukkeureupda）是尷尬或害羞。뿌듯하다（ppudeuthada）是成就帶來的溫暖自豪感或滿足感——當你完成某件困難的事情，或看著你在乎的人成功時的感受。' },
  { stepId: 19, field: 'tip',   translated: { label: '한（恨）——無法翻譯的韓國悲傷', text: '한（han）是一種文化特有的情緒：深重的悲傷與堅韌混合在一起，根植於歷史苦難，卻轉化為創造性能量。它在판소리（韓國民俗音樂劇）中可以聽到，在詩歌中有所描述，在討論韓國身份認同時被提及。這不是輕易使用的詞，但對文化理解至關重要。' } },

  { stepId: 27, field: 'title', translated: '常用情緒句型' },
  { stepId: 27, field: 'body',  translated: '幾種句型在韓語中特別有用，用於表達情緒。「보고 싶어요」（我想念你／我想見你）使用보다（看）＋-고 싶다（想要）。「감동받았어요」（我被感動了）使用감동（深刻的情感）＋받다（接收）。「괜찮아요」（我沒事／沒關係）是最萬能的用語之一——用於「我沒事」「可以」「沒問題」和「算了」。' },
  { stepId: 27, field: 'tip',   translated: { label: '괜찮아요——萬能用語', text: '괜찮아요字面意思是「沒問題／好的」。用它在跌倒後讓別人放心你沒事、接受你之前拒絕的提議、說「不用謝謝」，或表達「那樣可以」。掌握它的語調是關鍵——同樣的詞，非常不同的信息。' } },

  // Listen repeats
  { stepId: 2,  field: 'meaning', translated: '幸福（字典形）' },
  { stepId: 3,  field: 'meaning', translated: '悲傷（字典形）' },
  { stepId: 4,  field: 'meaning', translated: '憤怒（字面意思：怒氣出來）' },
  { stepId: 5,  field: 'meaning', translated: '害怕／恐怖' },
  { stepId: 8,  field: 'meaning', translated: '我很幸福（禮貌現在時）' },
  { stepId: 9,  field: 'meaning', translated: '我很悲傷（禮貌現在時）' },
  { stepId: 11, field: 'meaning', translated: '感到高興／喜悅' },
  { stepId: 12, field: 'meaning', translated: '感到擔心' },
  { stepId: 13, field: 'meaning', translated: '感到疲倦／精疲力竭' },
  { stepId: 14, field: 'meaning', translated: '感到興奮／亢奮' },
  { stepId: 17, field: 'meaning', translated: '我感覺很好／我心情好' },
  { stepId: 20, field: 'meaning', translated: '思念某人／某事（渴望）' },
  { stepId: 21, field: 'meaning', translated: '感到孤獨' },
  { stepId: 22, field: 'meaning', translated: '感到尷尬／害羞' },
  { stepId: 23, field: 'meaning', translated: '感到自豪／有成就感（溫暖的成就感）' },
  { stepId: 25, field: 'meaning', translated: '感到心跳加速的興奮／心動（浪漫的期待）' },
  { stepId: 28, field: 'meaning', translated: '我想念你／我想見你' },
  { stepId: 29, field: 'meaning', translated: '我被感動了（情感上的感動）' },
  { stepId: 30, field: 'meaning', translated: '我沒事／沒關係／沒問題' },
  { stepId: 32, field: 'meaning', translated: '加油！／撐住！（字面意思：拿出力量）' },

  // Match quizzes
  { stepId: 6,  field: 'prompt',  translated: '哪個詞的意思是「幸福」？' },
  { stepId: 6,  field: 'choices', translated: ['슬프다', '무섭다', '행복하다', '화가 나다'] },
  { stepId: 15, field: 'prompt',  translated: '哪個詞的意思是「疲倦」？' },
  { stepId: 15, field: 'choices', translated: ['기쁘다', '신나다', '피곤하다', '걱정되다'] },
  { stepId: 18, field: 'prompt',  translated: '기분이 좋아요的意思是…' },
  { stepId: 18, field: 'choices', translated: ['我感覺不好', '我感覺很好', '我餓了', '我很疲倦'] },
  { stepId: 24, field: 'prompt',  translated: '그립다的意思是…' },
  { stepId: 24, field: 'choices', translated: ['感到高興', '思念某人（渴望）', '感到疲倦', '感到孤獨'] },
  { stepId: 26, field: 'prompt',  translated: '뿌듯하다的意思是…' },
  { stepId: 26, field: 'choices', translated: ['感到尷尬', '感到自豪／有成就感', '感到孤獨', '思念某人'] },
  { stepId: 31, field: 'prompt',  translated: '보고 싶어요的意思是…' },
  { stepId: 31, field: 'choices', translated: ['我沒事', '我被感動了', '我想念你／我想見你', '我很孤獨'] },

  // Lesson complete
  { stepId: 33, field: 'message', translated: '你已探索了韓語情緒詞彙——從基本感受到像그립다、뿌듯하다和설레다這樣有豐富文化內涵的詞彙。你的韓語情感表達能力在不斷成長！' },
];

// ══════════════════════════════════════════════════════════════
// speech-levels.json — 60 fields
// ══════════════════════════════════════════════════════════════
const SPEECH_LEVELS = [
  // Reading cards
  { stepId: 1,  field: 'title', translated: '韓語語言等級概覽' },
  { stepId: 1,  field: 'body',  translated: '韓語有一套稱為높임말的敬語系統，它決定了你的語言有多正式或有禮。你選擇哪個級別取決於社會關係、年齡、地位和對話的情境。你最常遇到的三個級別是：합쇼체（正式禮貌體，用於演講、軍隊和客服）、해요체（日常禮貌體，是成年人與非親密熟人交談的預設體）和반말（隨意語，用於親密朋友和年輕人）。說錯級別可能給人留下無禮、冷漠或過於熟稔的印象。' },
  { stepId: 1,  field: 'tip',   translated: { label: '為什麼語言等級在韓國很重要', text: '韓國是一個受儒家價值觀影響的等級社會——年齡、地位和關係都決定了你說話的方式。對陌生人或長輩使用반말（隨意語）是無禮的。對朋友使用過於正式的합쇼체會讓人感覺疏遠。選擇正確的等級是重要的社交技能。' } },

  { stepId: 2,  field: 'title', translated: '합쇼체——最高正式語體' },
  { stepId: 2,  field: 'body',  translated: '합쇼체是韓語中最高的正式語言級別。它用於電視新聞播報、軍令、正式演講、酒店／航空公司員工用語和客服。動詞語尾在陳述句中變為-ㅂ니다/-습니다，在疑問句中變為-ㅂ니까?/-습니까?。詞彙也會改變——밥（食物）變成식사，있어요變成있습니다。這個級別表示最高程度的尊重和專業精神。' },
  { stepId: 2,  field: 'tip',   translated: { label: '在哪裡可以聽到합쇼체', text: '打開韓國新聞頻道（KBS、MBC、SBS），你會全程聽到합쇼체。酒店員工、航班廣播、正式典禮和軍事場合都使用這個級別。它也用於正式的書面文件，但純書面體（문어체）略有不同。' } },

  { stepId: 7,  field: 'title', translated: '합쇼체動詞語尾（-ㅂ니다/-습니다）' },
  { stepId: 7,  field: 'body',  translated: '합쇼체的標誌是-ㅂ니다/-습니다語尾。以母音結尾的動詞詞幹使用-ㅂ니다：가다→갑니다（我去）。以子音結尾的詞幹使用-습니다：먹다→먹습니다（我吃）。疑問句中語尾變為-ㅂ니까?/-습니까?：가다→갑니까?（你要去嗎？）。發音備注：갑니다因鼻音同化發音為[감니다]。' },
  { stepId: 7,  field: 'tip',   translated: { label: '-ㅂ니다的發音變化', text: '갑니다（我去）拼寫為갑니다但發音為감니다。這是因為ㅂ在ㄴ前面因鼻音同化變成ㅁ（相同口型，氣流改為從鼻腔通過）。這個規律貫穿整個합쇼체的語形中。' } },

  { stepId: 10, field: 'title', translated: '해요체——日常禮貌語' },
  { stepId: 10, field: 'body',  translated: '해요체是你在韓語日常生活中使用最多的語言級別。它對陌生人和熟人來說足夠禮貌，同時又溫和自然。在動詞詞幹後加-아요/-어요/-해요。해요체用於商店、與不太親密的同事交談、與初次見面的成年人交談，以及大多數學習者與母語者的互動中。它是韓語的「預設禮貌語」。' },
  { stepId: 10, field: 'tip',   translated: { label: '해요체是你的預設設定', text: '有疑問時，使用해요체。這是韓國最安全、最普遍適用的語言級別。禮貌待人永遠不會出錯。只有當情境明確要求時，才切換到합쇼체或반말。' } },

  { stepId: 16, field: 'title', translated: '-아요 / -어요 的規律' },
  { stepId: 16, field: 'body',  translated: '해요체語尾規則：如果詞幹的最後一個母音是ㅏ或ㅗ（亮母音），加-아요；其他所有母音加-어요。하다類動詞使用-해요。例如：가다→가+아요=가요（縮約）。먹다→먹+어요=먹어요。공부하다→공부해요。實際上，아/어常與詞幹末尾母音縮約：가+아요→가요，오+아요→와요。' },
  { stepId: 16, field: 'tip',   translated: { label: '速查表', text: '가다→가요。오다→와요。먹다→먹어요。마시다→마셔요。하다→해요。보다→봐요。자다→자요。語尾遵循母音和諧規律——嘗試識別詞幹中的亮/暗母音區別。' } },

  { stepId: 19, field: 'title', translated: '반말——隨意語' },
  { stepId: 19, field: 'body',  translated: '반말（字面意思「半句話」）是年齡相近的親密朋友之間、與年輕人交談，以及家庭內部使用的隨意語。它去掉해요체語尾中的-요：가요→가，먹어요→먹어，좋아요→좋아。對年長者或陌生人使用반말可能顯得無禮——始終以해요체開始，只有當對方主動或明確建議時才切換到반말。在韓劇中，角色從해요체切換到반말標誌著親密度的重大轉變。' },
  { stepId: 19, field: 'tip',   translated: { label: '獲得使用반말的許可', text: '一個自然的請求方式：「말 놓아도 돼요?」（我可以隨意說話嗎？）或「반말해도 돼요?」（使用반말可以嗎？）。你也可以等對方自然地先切換——那就是你的邀請。' } },

  { stepId: 25, field: 'title', translated: '何時使用반말（以及何時不用）' },
  { stepId: 25, field: 'body',  translated: '可以使用반말的對象：年齡相近的親密朋友、年幼的兄弟姐妹、比你年輕的學生或兒童。不可以使用반말的對象：陌生人、任何比你年長的人、你的老闆或老師、服務人員，或剛認識的人（即使看起來年齡相近）。許多韓語學習者犯的錯誤是認為因為對方友善，就可以使用반말。友善和使用반말的許可是分開的——始終等待信號。' },
  { stepId: 25, field: 'tip',   translated: { label: '一個例外：自言自語', text: '當韓國人自言自語、低聲說話或寫日記時，他們使用반말甚至不帶語尾的中性語體。這是自然的，不是對任何人說的——所以不需要禮貌語。這也是為什麼戲劇獨白和內心想法都是반말。' } },

  { stepId: 27, field: 'title', translated: '문어체——書面／正式語體' },
  { stepId: 27, field: 'body',  translated: '문어체（「書面語體」）用於正式書寫——學術論文、新聞文章、法律文件和文學作品。動詞語尾是-다（原形字典形式）：가다、먹는다、했다。在口語對話中聽起來不自然，但在書面韓語中到處出現。當學習者閱讀韓語文章並疑惑為什麼與所學不同時——那是因為教科書教的是口語語體，而閱讀則需要識別문어체。' },
  { stepId: 27, field: 'tip',   translated: { label: '문어체 vs 합쇼체', text: '兩者都是正式的，但합쇼체用於說話（說話者對聽者）而문어체用於書寫（沒有特定聽者）。新聞主播用합쇼체說話。報紙文章用문어체。在韓劇中，當角色大聲朗讀書籍或信件時，你會聽到문어체。' } },

  { stepId: 29, field: 'title', translated: '語言等級比較表' },
  { stepId: 29, field: 'body',  translated: '以下是同一個想法在不同語言等級中的呈現方式。「我吃」：먹습니다（正式합쇼체）→먹어요（禮貌해요체）→먹어（隨意반말）→먹는다（書面문어체）。「謝謝」：감사합니다（正式）→감사해요（禮貌）→고마워（隨意）。「我去」：갑니다（正式）→가요（禮貌）→가（隨意）→간다（書面）。注意這些規律將幫助你在看韓劇或聆聽母語者說話時識別對方使用的語言等級。' },
  { stepId: 29, field: 'tip',   translated: { label: '用韓劇來訓練你的耳朵', text: '韓劇是練習語言等級的絕佳素材。老闆用합쇼체對團隊說話。朋友互相切換到반말。醫院或辦公室場景使用해요체。如果你注意到角色之間語言等級突然改變——那就是戲劇性的重要時刻。' } },

  { stepId: 32, field: 'title', translated: '混用語言等級——常見錯誤' },
  { stepId: 32, field: 'body',  translated: '學習者最常犯的錯誤之一是混用語言等級——在一個句子中使用먹어요（해요체），下一個句子卻用먹습니다（합쇼체）。母語者會立刻察覺。這聽起來像在同一口氣中混用正式和隨意語。選擇一個級別並在整個對話中保持一致。唯一的例外是為了修辭效果而刻意切換（比如正式開頭溫暖結尾的商業郵件），但即便如此也遵循清晰的規律。' },
  { stepId: 32, field: 'tip',   translated: { label: '不要在句子中途混用語尾', text: '錯誤：저는 학생이에요. 공부합니다.（混用해요체和합쇼체）。正確：저는 학생이에요. 공부해요.（全部해요체）。或：저는 학생입니다. 공부합니다.（全部합쇼체）。在對話中保持一致表現流暢度和社交意識。' } },

  // Listen repeats
  { stepId: 3,  field: 'meaning', translated: '是——正式陳述語尾' },
  { stepId: 4,  field: 'meaning', translated: '謝謝（正式）' },
  { stepId: 5,  field: 'meaning', translated: '你好？／您好？（正式問候，疑問形）' },
  { stepId: 8,  field: 'meaning', translated: '我吃／正在吃（正式）' },
  { stepId: 9,  field: 'meaning', translated: '我去／正在去（正式）——發音為감니다' },
  { stepId: 11, field: 'meaning', translated: '你好／您好（禮貌，日常問候）' },
  { stepId: 12, field: 'meaning', translated: '謝謝（禮貌，比감사합니다稍輕鬆）' },
  { stepId: 13, field: 'meaning', translated: '我吃／正在吃（禮貌）' },
  { stepId: 14, field: 'meaning', translated: '我去／正在去（禮貌）' },
  { stepId: 17, field: 'meaning', translated: '好的／我喜歡（禮貌現在時）' },
  { stepId: 20, field: 'meaning', translated: '嗨／再見（隨意問候和告別）' },
  { stepId: 21, field: 'meaning', translated: '謝了（隨意）' },
  { stepId: 22, field: 'meaning', translated: '吃／我吃（隨意）' },
  { stepId: 23, field: 'meaning', translated: '去／我去（隨意）' },
  { stepId: 28, field: 'meaning', translated: '是（系動詞，書面／字典形式）' },

  // Match quizzes
  { stepId: 6,  field: 'prompt',  translated: '합쇼체最貼切的描述是…' },
  { stepId: 6,  field: 'choices', translated: ['隨意語', '最高正式語言等級', '非正式禮貌語', '俚語'] },
  { stepId: 15, field: 'prompt',  translated: '해요체最貼切的描述是…' },
  { stepId: 15, field: 'choices', translated: ['非常正式／廣播韓語', '最隨意的形式', '日常禮貌語／成年人預設語體', '古語尊稱'] },
  { stepId: 18, field: 'prompt',  translated: '哪種「我去」的形式是해요체（日常禮貌語）？' },
  { stepId: 18, field: 'choices', translated: ['가', '갑니다', '가요', '가라'] },
  { stepId: 24, field: 'prompt',  translated: '哪種問候是반말（隨意語）？' },
  { stepId: 24, field: 'choices', translated: ['안녕하세요', '안녕하십니까', '안녕', '반갑습니다'] },
  { stepId: 26, field: 'prompt',  translated: '你在街上和同齡的陌生人說話。你應該使用哪個等級？' },
  { stepId: 26, field: 'choices', translated: ['반말', '해요체', '兩者都可以', '只有합쇼체'] },
  { stepId: 30, field: 'prompt',  translated: '감사합니다是「謝謝」的___形式' },
  { stepId: 30, field: 'choices', translated: ['반말', '해요체', '합쇼체', '문어체'] },
  { stepId: 31, field: 'prompt',  translated: '在韓國的工作面試中，你應該使用哪個語言等級？' },
  { stepId: 31, field: 'choices', translated: ['반말', '해요체', '합쇼체', '문어체'] },

  // Lesson complete
  { stepId: 33, field: 'message', translated: '你已掌握韓語語言等級系統——正式的합쇼체、日常的해요체、隨意的반말和書面的문어체。你現在有能力讀懂社交情境，並以適當的等級說話。' },
];

// ════════════════════════════════════════════════════════════════════
// Apply all translations
// ════════════════════════════════════════════════════════════════════
const FILES = {
  hangul:           HANGUL,
  'syllable-blocks': SYLLABLE_BLOCKS,
  pronunciation:    PRONUNCIATION,
  grammar:          GRAMMAR,
  nouns:            NOUNS,
  pronouns:         PRONOUNS,
  shopping:         SHOPPING,
  emotions:         EMOTIONS,
  'speech-levels':  SPEECH_LEVELS,
};

let totalFields = 0;
for (const [name, translations] of Object.entries(FILES)) {
  applyFile(name, translations);
  totalFields += translations.length;
}

console.log(`\n✓ Done — ${totalFields} zh-TW fields written across ${Object.keys(FILES).length} lesson files.`);
console.log('  Run: node scripts/translate-zh-tw-lessons.mjs   (should exit 0 with no gaps)');
