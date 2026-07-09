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

patch('syllable-blocks.json',
  {
    1: { name_id: 'Dasar-dasar Blok' },
    2: { name_id: 'Bentuk Vokal' },
    3: { name_id: 'Membangunnya' },
    4: { name_id: 'Batchim' },
    5: { name_id: 'Membaca Kata' }
  },
  {
    1: {
      title_id: 'Apa Itu Blok Suku Kata?',
      body_id: 'Setiap suku kata Korea ditulis di dalam sebuah blok persegi yang tak terlihat. Berbeda dengan bahasa Indonesia yang huruf-hurufnya berjajar dari kiri ke kanan, bahasa Korea menyusun konsonan dan vokal bersama-sama menjadi blok yang ringkas dan seimbang secara visual. Setiap blok mewakili tepat satu suku kata — satu unit bunyi.',
      tip_id: { label: 'Tahukah Anda?', text: 'Setiap blok suku kata selalu memiliki tepat satu vokal. Blok itu bisa memiliki 0, 1, atau 2 konsonan — tetapi tidak pernah lebih dari satu vokal.' }
    },
    2: {
      title_id: 'Tiga Posisi',
      body_id: 'Setiap blok suku kata Korea memiliki tiga posisi bernama. Dua di antaranya wajib (konsonan awal dan vokal tengah) dan satu bersifat opsional (konsonan akhir). Mempelajari posisi-posisi ini berdasarkan namanya sangat penting — tata bahasa Korea terus-menerus merujuknya.',
      tip_id: { label: 'Tips', text: 'Untuk vokal vertikal seperti ㅏ, ㅓ, dan ㅣ: konsonan awal berada di kiri, vokal di kanan. Untuk vokal horizontal seperti ㅗ, ㅜ, dan ㅡ: konsonan awal berada di atas, vokal di bawah.' }
    },
    3: {
      title_id: 'Empat Pola Blok Suku Kata',
      body_id: 'Suku kata Korea mengikuti empat pola struktur dasar tergantung pada ada tidaknya konsonan akhir (받침) dan apakah suku kata dimulai dengan vokal atau konsonan.',
      patterns_label_id: ['awal + vokal', 'ㅇ diam + vokal', 'awal + vokal + 받침', 'ㅇ diam + vokal + 받침'],
      tip_id: { label: 'Aturan Penanda Tempat ㅇ', text: 'Ketika sebuah suku kata dimulai dengan bunyi vokal, Anda harus menulis ㅇ sebagai penanda tempat di posisi awal. ㅇ sepenuhnya diam di awal suku kata — ia hanya menandakan bahwa blok tersebut dimulai dengan vokal. Contoh: 아 = ㅇ+ㅏ   이 = ㅇ+ㅣ   우 = ㅇ+ㅜ' }
    },
    4:  { example_meaning_id: 'Korea', hint_id: 'Setiap suku kata adalah blok persegi — konsonan awal, vokal, dan konsonan akhir opsional.' },
    5:  { example_meaning_id: 'Korea', hint_id: 'Blok ini memiliki ketiga posisi: 초성 (ㄱ) + 중성 (ㅜ) + 받침 (ㄱ).' },
    6:  { example_meaning_id: 'bahasa Korea', hint_id: 'Suku kata yang diawali vokal menggunakan ㅇ diam sebagai penanda tempat. ㅇ di sini tidak berbunyi.' },
    7:  { prompt_id: 'Setiap blok suku kata Korea berisi tepat berapa vokal?', choices_id: ['Nol', 'Tepat satu', 'Satu atau dua', 'Sebanyak yang dibutuhkan'] },
    8:  { prompt_id: 'Posisi konsonan AWAL (konsonan pertama) disebut…', choices_id: ['받침', '중성', '초성', '모음'] },
    9:  { prompt_id: 'Ketika suku kata dimulai dengan bunyi VOKAL, Anda menulis __ sebagai konsonan awal penanda tempat.', choices_id: ['ㄱ', 'ㄴ', 'ㄹ', 'ㅇ'] },
    10: { example_meaning_id: 'pergi', hint_id: 'Pola CV — jenis blok paling sederhana. Hanya konsonan awal dan vokal.' },
    11: { example_meaning_id: 'bayi', hint_id: 'Pola V-saja — ㅇ diam di posisi awal, hanya vokal yang berbunyi.' },
    12: { example_meaning_id: 'hati / pergi (bentuk lampau)', hint_id: 'Pola CVC — konsonan awal + vokal + konsonan akhir (받침). Tiga bagian.' },
    13: { prompt_id: '안 (di dalam / tidak) — pola struktur apakah ini?', choices_id: ['CV', 'CVC', 'VC (ㅇ diam + vokal + akhir)', 'Hanya V'] },

    14: {
      title_id: 'Vokal Vertikal vs Horizontal',
      body_id: 'Bentuk vokal menentukan di mana konsonan awal berada di dalam blok. Vokal tinggi dan vertikal mendorong konsonan ke kiri; vokal lebar dan horizontal mendorongnya ke atas. Inilah yang memberi bahasa Korea tampilan persegi khasnya.',
      tip_id: { label: 'Trik Visual Cepat', text: 'Ketika Anda melihat vokal tinggi (ㅏ, ㅓ, ㅣ dan variannya), konsonan awal berada di kirinya. Ketika Anda melihat vokal lebar (ㅗ, ㅜ, ㅡ dan variannya), konsonan awal berada di atasnya. Vokal majemuk seperti ㅘ, ㅝ, ㅚ berperilaku seperti vokal vertikal — konsonan berada di kiri.' }
    },
    15: { hint_id: 'ㅏ adalah vokal TINGGI vertikal. Konsonan awal berada di KIRInya.' },
    16: { example_meaning_id: 'kamu (santai)', hint_id: 'ㅓ juga vokal tinggi vertikal — konsonan di KIRI, vokal di KANAN.' },
    17: { example_meaning_id: 'waktu', hint_id: 'ㅣ adalah vokal tertinggi. Konsonan selalu berada di kirinya.' },
    18: { example_meaning_id: 'terima kasih', hint_id: 'ㅗ adalah vokal LEBAR horizontal. Konsonan awal berada DI ATAS vokal.' },
    19: { example_meaning_id: 'siapa', hint_id: 'ㅜ adalah vokal lebar horizontal — konsonan di atas, vokal di bawah. Garis mengarah ke BAWAH.' },
    20: { example_meaning_id: 'dan', hint_id: 'ㅡ adalah vokal horizontal datar — konsonan berada di atasnya.' },
    21: { prompt_id: 'Dengan vokal TINGGI seperti ㅏ, ㅓ, atau ㅣ — di mana letak konsonan awal?', choices_id: ['Di atas', 'Di kiri', 'Di kanan', 'Di bawah'] },
    22: { prompt_id: 'Dengan vokal LEBAR seperti ㅗ, ㅜ, atau ㅡ — di mana letak konsonan awal?', choices_id: ['Di kiri', 'Di kanan', 'Di atas', 'Di bawah'] },
    23: { prompt_id: '배 (perut / kapal) mengandung ㅐ — ㅐ termasuk jenis vokal apa?', choices_id: ['Lebar horizontal', 'Tinggi vertikal', 'Majemuk lebar', 'Diam'] },
    24: { prompt_id: 'Manakah dari berikut ini yang merupakan vokal LEBAR (horizontal)?', choices_id: ['ㅏ', 'ㅓ', 'ㅣ', 'ㅜ'] },

    25: {
      title_id: 'Membangun Suku Kata Pertama Anda',
      body_id: 'Sekarang mari berlatih membangun suku kata CV sederhana — konsonan + vokal, tanpa batchim. Ini adalah blok yang paling mudah dibaca dan ditulis. Dengarkan masing-masing dan coba hasilkan sendiri bunyinya.'
    },
    26: { meaning_id: 'ba — 바나나 (pisang)' },
    27: { meaning_id: 'na — 나 (aku)' },
    28: { meaning_id: 'sa — 사랑 (cinta)' },
    29: { meaning_id: 'ha — 하늘 (langit)' },
    30: { meaning_id: 'go — 고마워 (terima kasih, tidak resmi)' },
    31: { meaning_id: 'nu — 누구 (siapa)' },
    32: { meaning_id: 'mi — 미래 (masa depan)' },
    33: { meaning_id: 'gi — 기다리다 (menunggu)' },

    34: {
      title_id: 'Menambahkan Batchim — Konsonan Akhir',
      body_id: 'Ketika Anda menambahkan konsonan di bagian bawah sebuah blok, konsonan tersebut menjadi 받침 (batchim) — konsonan akhir. Batchim adalah yang memberi banyak kata Korea akhiran yang kaya dan beresonansi. Perhatikan bagaimana penambahan batchim mengubah suku kata sederhana menjadi kata-kata sungguhan.',
      tip_id: { label: 'Tips', text: 'Blok suku kata dengan batchim sedikit dipadatkan secara vertikal untuk memberi ruang di bagian bawah. Konsonan batchim berada di bawah konsonan awal dan vokal, melengkapi bentuk persegi blok tersebut.' }
    },
    35: { example_meaning_id: 'gunung', hint_id: 'ㄴ adalah 받침 di sini — berada di bagian bawah blok, di bawah ㅅ dan ㅏ.' },
    36: { example_meaning_id: 'bulan / bulan (kalender)', hint_id: '받침 ㄹ — lidah mengetuk ringan langit-langit mulut untuk menghasilkan akhiran.' },
    37: { example_meaning_id: 'nasi / makanan', hint_id: "받침 ㅂ — bibir menutup di akhir tanpa terbuka. Bunyi 'p' tidak dilepaskan." },
    38: { example_meaning_id: 'musim semi', hint_id: '받침 ㅁ — bibir menutup lembut di akhir. Akhiran sengau yang beresonansi.' },
    39: { example_meaning_id: 'jalan / cara', hint_id: "받침 ㄹ lagi — lidah tertahan di langit-langit mulut. Terdengar seperti 'l' yang lembut." },
    40: { prompt_id: '밥 (nasi) — apa 받침 (batchim)-nya?', choices_id: ['ㅏ', 'ㅂ', 'ㄴ', 'ㄱ'] },
    41: { prompt_id: '달 (bulan) berakhir dengan bunyi konsonan apa?', choices_id: ['n', 'm', 'l/r', 'k'] },
    42: { prompt_id: 'Dalam blok suku kata CVC, di mana letak 받침 (batchim)?', choices_id: ['Di atas vokal', 'Di kanan vokal', 'Di bagian bawah, di bawah semuanya', 'Di samping konsonan awal'] },
    43: { prompt_id: 'Manakah dari kata-kata berikut yang TIDAK memiliki 받침?', choices_id: ['산', '달', '가', '봄'] },
    44: { prompt_id: '봄 (musim semi) = ㅂ + ㅗ + ? — apa batchim-nya?', choices_id: ['ㄴ', 'ㄱ', 'ㅁ', 'ㄹ'] },

    45: {
      title_id: 'Membaca Kata Korea yang Sesungguhnya',
      body_id: 'Sekarang Anda memiliki semua yang dibutuhkan untuk menguraikan kata-kata Korea yang sesungguhnya. Mari kita bedah 10 kata penting suku kata demi suku kata, mengidentifikasi setiap komponennya. Ketuk tombol speaker untuk mendengar kata-kata tersebut diucapkan.'
    },
    46: { meaning_id: 'Korea' },
    47: { meaning_id: 'orang' },
    48: { meaning_id: 'sekolah' },
    49: { meaning_id: 'halo / damai' },
    50: { meaning_id: 'rasa syukur' },
    51: { meaning_id: 'cinta' },
    52: { meaning_id: 'musik' },
    53: { meaning_id: 'teman' },
    54: { meaning_id: 'keluarga' },
    55: { meaning_id: 'laut / samudra' },
    56: { meaning_id: 'mimpi' },

    57: {
      title_id: 'Latihan & Ringkasan',
      body_id: 'Selamat — Anda telah mempelajari struktur inti blok suku kata Korea! Berikut ringkasan cepat lima aturan yang mengatur setiap suku kata dalam sistem penulisan Korea.',
      rules_id: [
        'Setiap blok memiliki tepat satu vokal (중성 / Jungseong)',
        'Suku kata yang diawali vokal menggunakan ㅇ diam sebagai konsonan awal penanda tempat',
        'Vokal tinggi (ㅏ, ㅓ, ㅣ) — konsonan awal berada di kiri, vokal di kanan',
        'Vokal lebar (ㅗ, ㅜ, ㅡ) — konsonan awal berada di atas, vokal di bawah',
        '받침 (batchim) opsional berada di bagian bawah blok, di bawah semua elemen lainnya'
      ],
      tip_id: { label: 'Tes Mandiri akan datang!', text: 'Tiga pertanyaan singkat di bawah untuk memastikan Anda sudah memahaminya. Identifikasi komponen setiap suku kata.' }
    },
    58: { prompt_id: '남 (selatan) — apa 초성 (konsonan awal)-nya?', choices_id: ['ㄴ', 'ㅏ', 'ㅁ', 'ㄱ'] },
    59: { prompt_id: '달 (bulan) — identifikasi 받침 (batchim / konsonan akhir).', choices_id: ['ㄷ', 'ㅏ', 'ㄹ', 'ㄴ'] },
    60: { prompt_id: '봄 (musim semi) — apa ketiga komponennya secara berurutan?', choices_id: ['ㅂ + ㅗ + ㅁ', 'ㅂ + ㅜ + ㄴ', 'ㅍ + ㅗ + ㄴ', 'ㅂ + ㅗ + ㄴ'] },

    61: {
      title_id: 'Anda bisa membaca blok suku kata Korea!',
      message_id: 'Anda telah menguasai blok pembangun seluruh tulisan Korea — 5 tahap, 61 langkah. Setiap kata Korea dibuat persis dari blok-blok ini. 화이팅!'
    }
  }
);
