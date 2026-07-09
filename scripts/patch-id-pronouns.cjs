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

patch('pronouns.json',
  {
    1: { name_id: 'Orang Pertama & Kedua' },
    2: { name_id: 'Orang Ketiga & Kami' },
    3: { name_id: 'Kata Tunjuk' },
    4: { name_id: 'Kata Ganti Tanya' }
  },
  {
    1: {
      title_id: 'Ikhtisar Kata Ganti Korea',
      body_id: "Bahasa Korea memiliki dua tingkat untuk kata ganti orang pertama: sopan dan santai. 저 (jeo) adalah 'saya' yang sopan, digunakan dengan orang asing, orang yang lebih tua, dan dalam situasi formal. 나 (na) adalah 'saya' yang santai, digunakan dengan teman dekat dan orang yang lebih muda. Yang terpenting, bahasa Korea sangat sering menghilangkan kata ganti subjek sama sekali ketika konteksnya jelas — 어디 가요? bisa berarti 'Kamu mau ke mana?' tanpa kata ganti sama sekali. Menguasai kapan TIDAK menggunakan kata ganti sama pentingnya dengan mengetahui kata ganti itu sendiri.",
      tip_id: { label: 'Bahasa yang menghilangkan subjek', text: "Bahasa Korea adalah bahasa yang menghilangkan subjek (pro-drop) — ketika subjek jelas dari konteks atau baru saja disebutkan, hilangkan kata gantinya. Menyertakannya bisa terdengar tidak alami atau bahkan sedikit kasar (terlalu langsung). 저 괜찮아요 dan 괜찮아요 sama-sama berarti 'Saya baik-baik saja', tetapi bentuk yang lebih pendek lebih alami." }
    },
    2:  { meaning_id: 'saya (sopan)' },
    3:  { meaning_id: 'saya (santai)' },
    4:  { meaning_id: 'saya (subjek, sopan) — 저 + penanda subjek 가 → 제가' },
    5:  { meaning_id: 'kamu (santai) — jarang diucapkan kepada orang dewasa' },
    6:  { prompt_id: "Kata ganti mana yang merupakan bentuk sopan dari 'saya'?", choices_id: ['나', '너', '저', '당신'] },
    7: {
      title_id: 'Mengucapkan "Kamu" dalam Bahasa Korea',
      body_id: 'Bahasa Korea menghindari kata ganti langsung "kamu" (당신) dalam sebagian besar percakapan sehari-hari — kata ini bisa terdengar dingin, konfrontatif, atau terlalu formal tergantung konteks. Sebagai gantinya, orang Korea menggunakan nama, gelar, atau istilah hubungan orang tersebut. Seorang guru akan dipanggil 선생님 (guru), bukan 당신. Seorang teman akan dipanggil dengan namanya. Kata ganti 당신 muncul dalam lagu, puisi, dan tulisan formal tetapi tidak umum dalam percakapan sehari-hari.',
      tip_id: { label: 'Cara menyapa orang tanpa 당신', text: 'Gunakan nama orang + 씨 untuk orang dewasa yang tidak Anda kenal baik: 김민준씨. Gunakan gelar pekerjaan mereka: 사장님 (bos), 과장님 (manajer). Gunakan istilah hubungan: 언니, 오빠, 아저씨. Ini jauh lebih alami daripada 당신.' }
    },
    8:  { meaning_id: 'saya (topik, sopan) — 저 + penanda topik 는 → 저는' },
    9:  { prompt_id: 'Mengapa orang Korea jarang mengucapkan 당신 dalam percakapan?', choices_id: ['Artinya \'musuh\'', 'Bisa terdengar dingin atau konfrontatif', 'Hanya berlaku dalam tulisan', 'Terlalu santai'] },

    10: {
      title_id: 'Orang Ketiga & Kami (그·그녀·우리)',
      body_id: "Bahasa Korea jarang menggunakan kata ganti dia (laki-laki/perempuan) dalam percakapan. Sebagai gantinya, orang Korea mengucapkan nama orang tersebut atau menggunakan kata tunjuk: 그 사람 (orang itu), 이 사람 (orang ini). 그 (geu) dan 그녀 (geunyeo) memang ada — dia (laki-laki)/dia (perempuan) — tetapi kebanyakan muncul dalam tulisan dan terjemahan. 우리 (uri) berarti 'kami/kita' atau 'milik kami'. Menariknya, orang Korea menggunakan 우리 di tempat bahasa Indonesia menggunakan 'saya punya': 우리 엄마 (ibu saya, secara harfiah 'ibu kami') — ini mencerminkan makna budaya kolektivis tentang keluarga bersama.",
      tip_id: { label: '우리 = milik saya (untuk keluarga & negara)', text: '우리 나라 (negara kami), 우리 집 (rumah saya/kami), 우리 엄마 (ibu saya) — ini alami dan umum. Menggunakan 나의 나라 atau 나의 집 sebagai gantinya terdengar tidak alami, hampir dingin.' }
    },
    11: { meaning_id: "kami / milik kami (sering digunakan sebagai 'milik saya' untuk hal-hal bersama)" },
    12: { meaning_id: 'kami / milik kami (bentuk merendah dan sopan dari 우리)' },
    13: { meaning_id: 'orang itu (= dia laki-laki / dia perempuan, cara santai)' },
    14: { meaning_id: 'mereka (bentuk tulisan)' },
    15: { prompt_id: "우리 엄마 secara harfiah berarti 'ibu kami' tetapi digunakan untuk berarti…", choices_id: ['ibu orang lain', 'ibu saya', 'sang guru', 'orang asing'] },
    16: { meaning_id: "negara saya/kami (Korea) — secara harfiah 'negara kami'" },
    17: { prompt_id: "Bentuk 'kami' mana yang lebih merendah dan sopan, digunakan kepada orang yang lebih tua?", choices_id: ['우리', '저희', '그들', '너희'] },

    18: {
      title_id: 'Kata Tunjuk (이·그·저)',
      body_id: "Bahasa Korea memiliki tiga tingkat kata tunjuk berdasarkan jarak ruang. 이 (i) = dekat pembicara. 그 (geu) = dekat pendengar atau telah disebutkan sebelumnya. 저 (jeo) = jauh dari pembicara maupun pendengar. Kata-kata ini melekat pada 것 (geot, 'benda') untuk membentuk kata ganti: 이것 (ini), 그것 (itu), 저것 (itu di sana). Dalam percakapan santai ini dipersingkat: 이거, 그거, 저거. Akar kata 이/그/저 yang sama juga bekerja dengan kata tempat: 여기 (di sini), 거기 (di situ), 저기 (di sana).",
      tip_id: { label: '이/그/저 vs 여기/거기/저기', text: '이/그/저 + 것 = benda ini/itu. 이/그/저 + -(e)gi = di sini/di situ/di sana. Jadi 여기 (yeo-gi) = di sini (dekat pembicara), 거기 (geo-gi) = di situ (dekat pendengar), 저기 (jeo-gi) = di sana (jauh dari keduanya).' }
    },
    19: { meaning_id: 'ini (benda) — dekat pembicara' },
    20: { meaning_id: 'itu (benda) — dekat pendengar atau sudah disebutkan' },
    21: { meaning_id: 'benda itu di sana — jauh dari keduanya' },
    22: { meaning_id: 'yang ini (bentuk santai dari 이것)' },
    23: { prompt_id: 'Kata tunjuk mana yang merujuk pada sesuatu yang jauh dari KEDUA pembicara DAN pendengar?', choices_id: ['이것', '그것', '저것', '어떤 것'] },
    24: { meaning_id: 'di sini (dekat pembicara)' },
    25: { prompt_id: '저것 adalah versi formal. Apa versi santainya?', choices_id: ['이거', '그거', '저거', '뭐'] },

    26: {
      title_id: 'Kata Ganti Tanya (의문대명사)',
      body_id: "Kata tanya Korea diletakkan di posisi kalimat yang sama dengan kata yang digantikannya — berbeda dengan bahasa Indonesia, yang cenderung menaruh 'apa' dan 'di mana' sesuai posisi alaminya juga tetapi dengan pola berbeda. Bandingkan: 영화 봐요? (Kamu nonton film?) vs 뭐 봐요? (Kamu nonton apa?). Kata tanya cukup menggantikan slot aslinya. Kata ganti tanya utama adalah: 누구 (siapa), 무엇/뭐 (apa), 어디 (di mana), 언제 (kapan), 왜 (mengapa), 어떻게 (bagaimana), 얼마 (berapa).",
      tip_id: { label: 'Tidak perlu pembalikan pertanyaan', text: "Bahasa Inggris memindahkan kata tanya ke depan dan membalik urutan subjek-kata kerja: 'What are you doing?'. Bahasa Korea mempertahankan urutan kata yang sama seperti kalimat pernyataan dan cukup menukar dengan kata tanya: 뭐 해요? (Sedang apa?) — secara harfiah 'apa lakukan?'" }
    },
    27: { meaning_id: 'siapa' },
    28: { meaning_id: 'apa (formal)' },
    29: { meaning_id: 'apa (santai, sangat umum)' },
    30: { meaning_id: 'di mana' },
    31: { prompt_id: "Kata ganti tanya mana yang berarti 'siapa'?", choices_id: ['뭐', '어디', '누구', '왜'] },

    32: {
      title_id: 'Kata Ganti Selesai!',
      message_id: 'Anda telah menguasai kata ganti Korea — dari 저 yang sopan hingga 나 yang santai, dari 우리 (kami/milik saya), hingga kata tunjuk dan kata tanya. Kemajuan yang luar biasa!'
    }
  }
);
