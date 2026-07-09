'use strict';
const fs   = require('fs');
const path = require('path');
const DATA = path.join(__dirname, '..', 'learn', 'data');

function patch(filename, stagePatch, stepPatches) {
  const file = path.join(DATA, filename);
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  if (stagePatch) data.stages.forEach(s => {
    if (stagePatch[s.id]) Object.assign(s, stagePatch[s.id]);
  });
  data.steps.forEach(step => {
    const p = stepPatches[step.id];
    if (!p) return;
    Object.entries(p).forEach(([k, v]) => { step[k] = v; });
  });
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log('✓ patched', filename);
}

patch('hangul.json',
  {
    1: { name_id: 'Konsonan' },
    2: { name_id: 'Vokal' },
    3: { name_id: 'Suku Kata' },
    4: { name_id: 'Spesial' },
    5: { name_id: 'Vokal Majemuk' },
    6: { name_id: 'Membaca Kata' }
  },
  {
    // Stage 1: Consonants
    1:  { hint_id: 'Berbentuk seperti bagian belakang tenggorokan yang menghalangi aliran udara.', example_meaning_id: 'pergi' },
    2:  { hint_id: 'Berbentuk seperti ujung lidah menyentuh langit-langit mulut.', example_meaning_id: 'saya / aku' },
    3:  { hint_id: 'Seperti ㄴ dengan atap — lidah menutup sepenuhnya langit-langit mulut.', example_meaning_id: 'semua / setiap' },
    4:  { hint_id: "Bunyi getar — di antara 'r' dan 'l' dalam bahasa Inggris. Lidah mengetuk langit-langit mulut.", example_meaning_id: 'alasan (awalan)' },
    5:  { hint_id: "Berbentuk seperti bibir tertutup yang saling menekan untuk membuat bunyi 'm'.", example_meaning_id: 'hati / pikiran' },
    6:  { hint_id: "Berbentuk seperti bibir yang terbuka untuk melepaskan bunyi 'b' atau 'p'.", example_meaning_id: 'nasi / makanan' },
    7:  { hint_id: "Berbentuk seperti dua gigi — udara mendesis melewatinya untuk bunyi 's'.", example_meaning_id: 'orang' },
    8:  { hint_id: "Diam di awal suku kata. Berbunyi seperti 'ng' di akhir.", example_meaning_id: 'anak' },
    9:  { hint_id: "Seperti 'j' dalam 'juice'. Lidah menekan di belakang gigi atas.", example_meaning_id: 'sekarang' },
    10: { hint_id: "'ch' beraspirasi — embusan udara keluar. Seperti 'ch' dalam 'cheese'.", example_meaning_id: 'teh / mobil' },
    11: { hint_id: "'k' beraspirasi — embusan udara kuat. Pegang tisu dan tisu itu akan bergetar.", example_meaning_id: 'kopi' },
    12: { hint_id: "'t' beraspirasi — seperti 't' dalam 'ten' (di awal kata). Letupan kuat.", example_meaning_id: 'menaiki / naik' },
    13: { hint_id: "'p' beraspirasi — seperti 'p' dalam 'pot'. Bibir terbuka dengan embusan udara.", example_meaning_id: 'daun bawang' },
    14: { hint_id: 'Bunyi \'h\' berdesah — seperti mengembuskan napas hangat ke tangan Anda.', example_meaning_id: 'langit' },

    // Stage 1 quizzes
    15: { prompt_id: 'ㄱ diromanisasi sebagai…', choices_id: ['n', 'g/k', 'd/t', 'm'] },
    16: { prompt_id: 'Konsonan mana yang DIAM di awal suku kata?', choices_id: ['ㄱ', 'ㄴ', 'ㅇ', 'ㅅ'] },
    17: { prompt_id: 'ㄴ diromanisasi sebagai…', choices_id: ['r/l', 'm', 'n', 'b/p'] },
    18: { prompt_id: "Konsonan mana yang berbunyi seperti 'j' dalam 'juice'?", choices_id: ['ㅂ', 'ㅈ', 'ㅅ', 'ㄷ'] },
    19: { prompt_id: 'ㅁ diromanisasi sebagai…', choices_id: ['b', 'n', 'm', 'h'] },
    20: { prompt_id: 'ㄹ diromanisasi sebagai…', choices_id: ['n', 'd/t', 'r/l', 's'] },
    21: { prompt_id: '밥 (nasi) dimulai dengan konsonan apa?', choices_id: ['ㅂ', 'ㅍ', 'ㅁ', 'ㅂ'] },

    // Stage 2: Vowels
    22: { hint_id: "Buka mulut lebar-lebar, seperti mengucapkan 'ah' saat diperiksa dokter." },
    23: { hint_id: "Seperti 'ya' dalam 'yard'. Goresan tambahan berarti ada bunyi 'y' yang ditambahkan." },
    24: { hint_id: "Mirip dengan 'uh' atau 'o' dalam 'the other'. Bibir sedikit membulat." },
    25: { hint_id: "Seperti 'yuh' dengan bibir membulat. Dua goresan = awalan 'y'." },
    26: { hint_id: 'Seperti \'o\' dalam \'more\'. Bulatkan bibir Anda seolah meniup lilin.' },
    27: { hint_id: "Seperti 'yo!' — dua goresan menambahkan bunyi 'y'. Sering digunakan dalam percakapan." },
    28: { hint_id: "Seperti 'oo' dalam 'boot'. Garis mengarah ke BAWAH — mulut turun." },
    29: { hint_id: "Seperti 'you'. Dua goresan ke bawah menandakan awalan 'y'." },
    30: { hint_id: "Seperti bunyi 'e' saat Anda merasa tidak puas: 'euugh'. Bibir datar." },
    31: { hint_id: "Seperti 'ee' dalam 'bee'. Goresan vertikal sederhana — vokal depan tinggi murni." },

    // Stage 2 quizzes
    32: { prompt_id: "Vokal mana yang berbunyi seperti 'a' (seperti dalam 'father')?", choices_id: ['ㅏ', 'ㅗ', 'ㅜ', 'ㅣ'] },
    33: { prompt_id: "Vokal mana yang berbunyi seperti 'o' (seperti dalam 'more')?", choices_id: ['ㅓ', 'ㅗ', 'ㅡ', 'ㅑ'] },
    34: { prompt_id: "Vokal mana yang berbunyi seperti 'ee' (seperti dalam 'bee')?", choices_id: ['ㅓ', 'ㅛ', 'ㅣ', 'ㅠ'] },
    35: { prompt_id: 'ㅠ diromanisasi sebagai…', choices_id: ['u', 'eu', 'yo', 'yu'] },
    36: { prompt_id: 'ㅡ berbunyi seperti…', choices_id: ['ya', 'i', 'eu', 'yo'] },

    // Stage 3: Syllables
    37: { meaning_id: 'ba — seperti dalam 바나나 (pisang)' },
    38: { meaning_id: 'na — seperti dalam 나 (aku)' },
    39: { meaning_id: 'sa — seperti dalam 사랑 (cinta)' },
    40: { meaning_id: 'go — seperti dalam 고마워 (terima kasih)' },
    41: { meaning_id: 'ha — seperti dalam 하늘 (langit)' },
    42: { meaning_id: 'mu — seperti dalam 무엇 (apa)' },

    // Stage 4: Special
    43: { hint_id: "'k' tegang — tahan napas lalu lepaskan. Tanpa embusan udara." },
    44: { hint_id: "'t' tegang — tenggorokan mengencang sebelum melepaskan. Berbeda dari ㄷ dan ㅌ." },
    45: { hint_id: "'p' tegang — bibir menekan kuat sebelum terbuka. Tidak ada udara yang keluar." },
    46: { hint_id: "'s' tegang — desisan tajam dan ketat. Digunakan dalam 있다 (ada / memiliki)." },
    47: { hint_id: "'j' tegang — lebih tajam dan tiba-tiba daripada ㅈ. Tanpa letupan udara." },
    48: { hint_id: 'Beraspirasi — letupan udara kuat mengikuti konsonan tersebut.' },
    49: { hint_id: 'Beraspirasi — lidah lepas dari langit-langit mulut dengan embusan udara.' },
    50: { hint_id: "Beraspirasi — bibir terbuka lebar dengan letupan udara. Seperti 'pot'." },
    51: { hint_id: "'ch' beraspirasi — seperti awal kata 'cheese'. Udara keluar." },
    52: { hint_id: 'Konsonan beraspirasi yang berdesah. Mengeluarkan udara paling banyak di antara semua konsonan Korea.' },

    // Stage 4 quizzes
    53: { prompt_id: 'ㄲ diromanisasi sebagai…', choices_id: ['k', 'kk', 'g/k', 'ng'] },
    54: { prompt_id: 'Mana yang merupakan konsonan TEGANG (쌍자음)?', choices_id: ['ㅋ', 'ㅌ', 'ㅆ', 'ㅊ'] },
    55: { prompt_id: 'ㅃ diromanisasi sebagai…', choices_id: ['b', 'p', 'pp', 'bb'] },
    56: { prompt_id: 'Konsonan beraspirasi dihasilkan dengan…', choices_id: ['Tanpa udara', 'Embusan udara yang kuat', 'Tenggorokan yang tegang', 'Bunyi sengau'] },
    57: { prompt_id: 'ㅉ diromanisasi sebagai…', choices_id: ['ss', 'ch', 'jj', 'tt'] },

    // Stage 5: Compound Vowels
    58: { hint_id: "Gabungan ㅏ + ㅣ. Seperti 'e' dalam 'bed'. Bahasa Korea modern = sama dengan 에." },
    59: { hint_id: "Gabungan ㅓ + ㅣ. Seperti 'e' dalam 'bed'. Kini terdengar sama dengan 애." },
    60: { hint_id: 'ㅑ + ㅣ. Jarang — muncul dalam 얘 (anak ini, bahasa percakapan).' },
    61: { hint_id: "ㅕ + ㅣ. Seperti 'ye' dalam 'yes'. 예쁘다 = cantik." },
    62: { hint_id: "ㅗ + ㅏ. Seperti 'wa' dalam 'water'. 와! = Wow!" },
    63: { hint_id: "ㅗ + ㅐ. Berbunyi seperti 'wae'. 왜 = mengapa." },
    64: { hint_id: "ㅗ + ㅣ. Seperti 'we'. 외국인 = orang asing." },
    65: { hint_id: "ㅜ + ㅓ. Seperti 'wuh'. 뭐 = apa (bahasa percakapan)." },
    66: { hint_id: "ㅜ + ㅔ. Seperti 'we'. Sangat jarang dalam bahasa Korea." },
    67: { hint_id: "ㅜ + ㅣ. Seperti 'wee'. 위 = di atas / lambung." },
    68: { hint_id: 'ㅡ + ㅣ. Luncuran unik. 의사 = dokter. Digunakan sebagai partikel kepemilikan 의.' },

    // Stage 5 quizzes
    69: { prompt_id: 'ㅘ diromanisasi sebagai…', choices_id: ['wo', 'wa', 'wae', 'oe'] },
    70: { prompt_id: '왜 berarti…', choices_id: ['apa', 'siapa', 'mengapa', 'di mana'] },
    71: { prompt_id: 'ㅢ diromanisasi sebagai…', choices_id: ['wi', 'ui', 'we', 'eu'] },
    72: { prompt_id: 'Vokal majemuk mana yang menggunakan ㅗ + ㅣ?', choices_id: ['ㅘ', 'ㅙ', 'ㅚ', 'ㅝ'] },
    73: { prompt_id: '예 diromanisasi sebagai…', choices_id: ['yae', 'ye', 'ae', 'e'] },

    // Stage 6: Read Words
    74: { meaning_id: 'halo / sampai jumpa (tidak resmi)' },
    75: { meaning_id: 'sekolah' },
    76: { meaning_id: 'Korea' },
    77: { meaning_id: 'cinta' },
    78: { meaning_id: 'air' },
    79: { meaning_id: 'nasi / makanan' },
    80: { meaning_id: 'orang' },
    81: { meaning_id: 'teman' },
    82: { meaning_id: 'langit' },
    83: { meaning_id: 'terima kasih (tidak resmi)' },

    84: {
      title_id: 'Anda bisa membaca bahasa Korea!',
      message_id: 'Kerja luar biasa — Anda telah menyelesaikan semua 6 tahap Hangul. Sekarang Anda bisa membaca dan menulis setiap karakter dalam alfabet Korea. 화이팅!'
    }
  }
);
