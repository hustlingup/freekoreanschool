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

patch('pronunciation.json',
  {
    1: { name_id: 'Batchim (받침)' },
    2: { name_id: 'Liaison (연음화)' },
    3: { name_id: 'Asimilasi Nasal (비음화)' },
    4: { name_id: 'Tensifikasi (경음화)' },
    5: { name_id: 'Palatalisasi & ㄹ (구개음화)' },
    6: { name_id: 'Kesalahan Umum (흔한 실수)' }
  },
  {
    1: {
      title_id: 'Apa Itu Batchim?',
      body_id: "Batchim (받침, secara harfiah berarti 'penyangga') adalah konsonan yang diletakkan di bagian bawah blok suku kata Korea. Misalnya, dalam suku kata 강, ㅇ di bagian bawah adalah batchim-nya. Tidak semua suku kata memiliki batchim — banyak yang berakhir hanya dengan vokal. Batchim-lah yang membuat kata-kata Korea seperti 산, 달, dan 밥 berakhir dengan bunyi konsonan yang jelas, bukan vokal terbuka.",
      tip_id: { label: 'Suku kata mana yang memiliki batchim?', text: 'Perhatikan blok suku kata Korea mana pun. Jika ada karakter di bawah vokal, itulah batchim-nya. 가 tidak memiliki batchim. 간 memiliki batchim ㄴ. 닭 memiliki batchim ganda ㄺ (dibaca sebagai satu bunyi).' }
    },
    2: {
      title_id: '7 Kelompok Bunyi Batchim',
      body_id: '7 aturan batchim (받침 7종성) menjelaskan mengapa banyak konsonan berbeda dapat muncul sebagai batchim dalam ejaan, tetapi semuanya tereduksi menjadi hanya 7 kemungkinan bunyi ketika diucapkan. Mempelajari 7 kelompok ini sangat penting — ini menjelaskan mengapa 닭 (ayam) dan 국 (sup) sama-sama berakhir dengan bunyi k yang sama.',
      rules_id: [
        'Kelompok ㄱ: ㄱ, ㄲ, ㅋ, ㄳ, ㄺ → dilafalkan k (tidak dilepas) — contoh: 국 (sup), 닭 (ayam)',
        'Kelompok ㄴ: ㄴ, ㄵ, ㄶ → dilafalkan n — contoh: 산 (gunung), 앉다 (duduk)',
        'Kelompok ㄷ: ㄷ, ㅅ, ㅆ, ㅈ, ㅊ, ㅌ, ㅎ → dilafalkan t (tidak dilepas) — contoh: 옷 (pakaian), 꽃 (bunga)',
        'Kelompok ㄹ: ㄹ, ㄼ, ㄽ, ㄾ, ㅀ → dilafalkan l — contoh: 달 (bulan), 말 (kuda)',
        'Kelompok ㅁ: ㅁ, ㄻ → dilafalkan m — contoh: 밤 (malam), 삶 (kehidupan)',
        'Kelompok ㅂ: ㅂ, ㅍ, ㄿ, ㄼ → dilafalkan p (tidak dilepas) — contoh: 입 (mulut), 앞 (depan)',
        'Kelompok ㅇ: ㅇ → dilafalkan ng — contoh: 강 (sungai), 방 (kamar)'
      ],
      tip_id: { label: 'Bunyi hambat tak lepas — apa artinya?', text: "Bunyi batchim k, t, dan p bersifat tak lepas: mulut Anda membentuk posisinya tetapi tidak melepaskan embusan udara. Bayangkan menahan p akhir dalam kata 'cup' — cup_ — tanpa mengeluarkan udara. Batchim ㄱ/ㄷ/ㅂ dalam bahasa Korea bekerja dengan cara yang sama." }
    },
    3:  { meaning_id: 'sup — batchim kelompok ㄱ, dilafalkan k (tidak dilepas)' },
    4:  { meaning_id: 'gunung — batchim kelompok ㄴ, dilafalkan n' },
    5:  { meaning_id: 'pakaian — batchim kelompok ㄷ (ㅅ→t), dilafalkan t (tidak dilepas)' },
    6:  { meaning_id: 'bulan — batchim kelompok ㄹ, dilafalkan l' },
    7:  { meaning_id: 'malam / kastanye — batchim kelompok ㅁ, dilafalkan m' },
    8:  { meaning_id: 'mulut — batchim kelompok ㅂ, dilafalkan p (tidak dilepas)' },
    9:  { meaning_id: 'sungai — batchim kelompok ㅇ, dilafalkan ng' },
    10: { meaning_id: 'ayam — batchim ganda ㄺ (ㄹ+ㄱ) → kelompok ㄱ → bunyi k' },
    11: { meaning_id: 'bunga — batchim ㅊ termasuk kelompok ㄷ → bunyi t' },
    12: { prompt_id: 'ㅋ (kh), ㄲ (kk), dan ㄳ semuanya adalah batchim dalam kelompok yang sama. Kelompok bunyi apakah mereka?', choices_id: ['Kelompok ㄴ (n)', 'Kelompok ㄱ (k)', 'Kelompok ㅂ (p)', 'Kelompok ㄷ (t)'] },
    13: { prompt_id: '방 (kamar) berakhir dengan batchim ㅇ. Bunyi apa yang dihasilkan?', choices_id: ['Tidak ada bunyi — ㅇ selalu diam', "ng (seperti 'sing')", 'n', 'm'] },

    14: {
      title_id: 'Liaison — Bunyi Penyambung',
      body_id: 'Ketika suku kata yang berakhir dengan batchim langsung diikuti oleh suku kata yang dimulai dengan ㅇ diam, konsonan batchim tersebut bergeser maju dan menjadi konsonan awal suku kata berikutnya. Ejaannya tetap sama — hanya pelafalannya yang berubah. Ini disebut liaison (연음화) dan merupakan salah satu fenomena pelafalan paling sering terjadi dalam bahasa Korea.',
      tip_id: { label: 'Kenali polanya', text: 'Carilah: konsonan batchim + suku kata berikutnya dimulai dengan ㅇ (penanda tempat diam). Hasilnya: batchim terdengar seolah membuka suku kata berikutnya. 먹어요 → 머거요. 한국어 → 한구거. Bentuk tulisannya tidak pernah berubah — hanya pelafalan Anda yang berubah.' }
    },
    15: { meaning_id: 'Saya makan / sedang makan — batchim ㄱ dari 먹 menyambung ke 어, terdengar seperti 머거요' },
    16: { meaning_id: 'nasi (bentuk objek) — batchim ㅂ dari 밥 menyambung ke 을, terdengar seperti 바블' },
    17: { meaning_id: 'Itu bagus / Saya suka — batchim ㅎ melemah dan menyambung (lihat Tahap 4 untuk aturan ㅎ)' },
    18: { meaning_id: 'bahasa Korea — batchim ㄱ dari 국 menyambung ke 어, terdengar seperti 한구거' },

    19: {
      title_id: 'Mengapa Liaison Terjadi?',
      body_id: 'Struktur suku kata Korea sangat menyukai pola konsonan + vokal. Ketika suku kata berawalan vokal mengikuti sebuah batchim, secara fonetis lebih mudah bagi konsonan tersebut untuk menempel pada slot terbuka vokal itu. Hasilnya adalah alur bicara yang lebih alami dan tersambung. Ini bukan bahasa gaul atau pelafalan malas — ini adalah bahasa Korea standar dan akan terdengar dalam siaran berita, pidato resmi, maupun percakapan sehari-hari.',
      tip_id: { label: 'Liaison vs ejaan', text: 'Bahasa Korea tertulis mempertahankan konsonan asli pada posisi ejaannya meskipun dilafalkan pada suku kata berikutnya. Inilah sebabnya belajar membaca bahasa Korea dan belajar melafalkan bahasa Korea pada awalnya adalah dua keterampilan yang terpisah — tulisan mencatat morfem, bukan bunyi yang tepat.' }
    },
    20: { prompt_id: 'Liaison (연음화) terjadi ketika sebuah batchim diikuti oleh suku kata yang dimulai dengan…', choices_id: ['Konsonan apa pun', 'ㅇ diam (suku kata berawalan vokal)', 'Hanya ㄴ atau ㅁ', 'Konsonan beraspirasi'] },
    21: { prompt_id: '한국어 (bahasa Korea) — batchim ㄱ dari 국 menyambung ke depan. Bagaimana pelafalannya?', choices_id: ['한국어 → 항궈 (tetap di 국)', '한국어 → 한구거 (ㄱ membuka 어)', '한국어 → 한국어 (tidak berubah)', '한국어 → 한국아 (vokal berubah)'] },

    22: {
      title_id: 'Asimilasi Nasal',
      body_id: 'Ketika konsonan hambat batchim dari kelompok ㄱ, ㄷ, atau ㅂ diikuti oleh konsonan nasal ㄴ atau ㅁ, konsonan hambat tersebut berasimilasi dan berubah menjadi bunyi nasal yang sesuai. Ini murni bersifat artikulatoris: konsonan nasal membutuhkan velum untuk turun, yang menarik konsonan hambat di sebelahnya ke wilayah nasal. Ejaannya tetap sama; hanya pelafalannya yang berubah.',
      rules_id: [
        'ㅂ + ㄴ/ㅁ → ㅁ: hambat bibir menjadi nasal bibir — 입니다 → 임니다',
        'ㄱ + ㄴ/ㅁ → ㅇ: hambat velar menjadi nasal velar — 국물 → 궁물',
        'ㄷ + ㄴ/ㅁ → ㄴ: hambat alveolar menjadi nasal alveolar — 걷는다 → 건는다'
      ],
      tip_id: { label: 'Mengapa titik artikulasinya sama?', text: "Setiap pasangan (ㅂ↔ㅁ, ㄱ↔ㅇ, ㄷ↔ㄴ) berbagi titik artikulasi yang sama persis di dalam mulut — masing-masing bibir, belakang tenggorokan, dan gusi gigi. Hanya aliran udara nasalnya yang berubah. Konsonan nasal 'menular' pada hambat sebelumnya, menariknya menjadi nasal sambil mempertahankan posisi mulut." }
    },
    23: { meaning_id: 'adalah (formal) — ㅂ + ㄴ → ㅁ: dieja 입니다, terdengar seperti 임니다' },
    24: { meaning_id: 'kuah — ㄱ + ㅁ → ㅇ: dieja 국물, terdengar seperti 궁물' },
    25: { meaning_id: 'tahun ajaran / tingkat kelas — ㄱ + ㄴ → ㅇ: dieja 학년, terdengar seperti 항년' },
    26: { meaning_id: 'berjalan / jalan kaki — ㄷ + ㄴ → ㄴ: dieja 걷는다, terdengar seperti 건는다' },
    27: { meaning_id: 'halaman depan — ㅂ + ㅁ → ㅁ: dieja 앞마당, terdengar seperti 암마당' },
    28: { prompt_id: 'Batchim ㅂ (atau ㅍ) yang diikuti ㄴ atau ㅁ berubah menjadi bunyi apa?', choices_id: ['ㄴ', 'ㅁ', 'ㅇ', 'ㄱ'] },
    29: { prompt_id: 'Batchim ㄱ yang diikuti ㄴ atau ㅁ berubah menjadi bunyi apa?', choices_id: ['ㄴ', 'ㄷ', 'ㅇ (ng)', 'ㅁ'] },
    30: { prompt_id: '입니다 (adalah) — bagaimana sebenarnya cara melafalkannya?', choices_id: ['ip-ni-da', 'im-ni-da', 'ib-ni-da', 'ip-mi-da'] },

    31: {
      title_id: 'Pola Asimilasi Selalu Satu Arah',
      body_id: "Asimilasi nasal selalu berjalan dengan cara yang sama: hambat menjadi nasal, tidak pernah sebaliknya. Konsonan nasal 'menulari' bunyi sebelumnya. Begitu Anda mengenali pola ㅂ→ㅁ, ㄷ→ㄴ, ㄱ→ㅇ, Anda akan mulai mendengar dan memprediksi perubahan-perubahan ini secara otomatis dalam percakapan bahasa Korea sungguhan.",
      tip_id: { label: 'Trik mengingat', text: 'Bayangkan setiap pasangan berbagi lokasi yang sama di mulut Anda. Bibir: ㅂ (hambat) ↔ ㅁ (nasal). Tenggorokan: ㄱ (hambat) ↔ ㅇ (nasal). Gusi gigi: ㄷ (hambat) ↔ ㄴ (nasal). Lokasinya tetap; hanya katup nasal yang terbuka.' }
    },

    32: {
      title_id: 'Tensifikasi',
      body_id: 'Setelah konsonan batchim tertentu — khususnya bunyi hambat tak lepas dari kelompok ㄱ, ㄷ, dan ㅂ — konsonan berikutnya menjadi tegang (ganda). Bentuk tulisannya tidak berubah; hanya pelafalannya yang bergeser. Tensifikasi adalah alasan mengapa 학교 (sekolah) terdengar seperti 학꾜, bukan 학교.',
      tip_id: { label: 'Mengapa tensifikasi terjadi', text: 'Setelah hambat tak lepas, saluran vokal sudah berada dalam posisi tegang dan tertutup. Ketika Anda memulai konsonan berikutnya dari kondisi ini, ketegangan otot tambahan terbawa, menciptakan bunyi tegang secara otomatis. Tensifikasi bukan sesuatu yang disengaja — ini konsekuensi artikulatoris alami. Begitu Anda mendengarnya dalam percakapan sungguhan, Anda tidak akan bisa melewatkannya lagi.' }
    },
    33: { meaning_id: 'sekolah — batchim ㄱ memicu tensifikasi: ㄱ→ㄲ, terdengar seperti 학꾜' },
    34: { meaning_id: 'restoran — batchim ㄱ memicu tensifikasi: ㄷ→ㄸ, terdengar seperti 식땅' },
    35: { meaning_id: 'menutup — batchim ㄷ memicu tensifikasi: ㄷ→ㄸ, terdengar seperti 닫따' },
    36: { meaning_id: 'pintu masuk — batchim ㅂ memicu tensifikasi: ㄱ→ㄲ, terdengar seperti 입꾸' },
    37: { prompt_id: 'Tensifikasi (경음화) paling dapat diprediksi terjadi setelah jenis batchim apa?', choices_id: ['Batchim nasal (ㄴ, ㅁ, ㅇ)', 'Batchim hambat tak lepas (kelompok ㄱ, ㄷ, ㅂ)', 'Hanya batchim ㄹ', 'Konsonan batchim apa pun'] },
    38: { prompt_id: '학교 (sekolah) — bagaimana sebenarnya cara melafalkannya?', choices_id: ['hak-gyo', 'hak-kyo (beraspirasi)', 'hak-kkyo (tegang)', 'ha-gyo'] },

    39: {
      title_id: 'Pelemahan ㅎ',
      body_id: 'Konsonan ㅎ adalah salah satu bunyi paling tidak stabil dalam bahasa Korea. Di antara vokal — baik ㅎ sebagai batchim maupun konsonan awal — ia melemah secara signifikan dan sering hampir sepenuhnya menghilang. Inilah sebabnya 좋아요 (bagus) terdengar seperti 조아요, bukan 조하요. ㅎ masih dituliskan, tetapi bunyinya nyaris lenyap.',
      tip_id: { label: 'Kesalahan umum pemula', text: 'Banyak pemula mengucapkan 조하요 untuk 좋아요, mempertahankan bunyi h. Dalam percakapan bahasa Korea sungguhan, ini terdengar tidak alami dan terlalu disengaja. Pelafalan standarnya adalah 조아요 — ㅎ menghilang diam-diam di antara dua vokal. Percayai aturannya: ㅎ di antara vokal nyaris menghilang.' }
    },
    40: { meaning_id: 'Itu bagus / Saya suka — batchim ㅎ melemah: terdengar seperti 조아요 (bukan 조하요)' },
    41: { meaning_id: 'Ada banyak — ㅎ dalam batchim ㄶ melemah: terdengar seperti 마나요' },
    42: { meaning_id: 'Saya memasukkannya — batchim ㅎ melemah di antara vokal: terdengar seperti 너어요' },

    43: {
      title_id: 'ㅎ + Konsonan = Aspirasi',
      body_id: 'Ketika batchim ㅎ bertemu dengan konsonan awal suku kata berikutnya (atau sebaliknya), keduanya bergabung menjadi satu konsonan beraspirasi. ㅎ + ㄷ menjadi ㅌ. ㄱ + ㅎ menjadi ㅋ. ㅂ + ㅎ menjadi ㅍ. ㄷ + ㅎ (atau ㅎ + ㄷ) menjadi ㅌ. Bayangkan ㅎ sebagai penambah embusan udara pada konsonan di sebelahnya.',
      rules_id: [
        'ㅎ + ㄷ → ㅌ: 놓다 (meletakkan) → 노타',
        'ㄱ + ㅎ → ㅋ: 착하다 (baik hati) → 차카다',
        'ㅂ + ㅎ → ㅍ: 입학 (pendaftaran masuk sekolah) → 이팍',
        'ㄷ + ㅎ → ㅌ: 못해요 (tidak bisa) → 모태요'
      ]
    },
    44: { meaning_id: 'melepaskan / meletakkan — batchim ㅎ + ㄷ → ㅌ: dieja 놓다, terdengar seperti 노타' },
    45: { prompt_id: 'Bunyi apa yang dihasilkan ㅎ + ㄷ (atau ㄷ + ㅎ)?', choices_id: ['ㄷ (biasa)', 'ㅌ (t beraspirasi)', 'ㄸ (tegang)', 'ㅎ (tetap h)'] },

    46: {
      title_id: 'Palatalisasi',
      body_id: 'Ketika konsonan ㄷ atau ㅌ muncul sebagai batchim dan diikuti oleh vokal 이 (i), keduanya bergeser maju di dalam mulut dan berubah menjadi ㅈ dan ㅊ secara berurutan. Pergeseran ini disebut palatalisasi — konsonan bergerak dari gusi gigi ke langit-langit mulut untuk mengantisipasi vokal depan 이.',
      rules_id: [
        'ㄷ + 이 → ㅈ이 → 지: 굳이 (dengan sengaja) → 구지',
        'ㅌ + 이 → ㅊ이 → 치: 같이 (bersama) → 가치'
      ],
      tip_id: { label: 'Hanya di dalam morfem', text: 'Palatalisasi hanya berlaku di dalam kata yang sama atau ketika akhiran yang dimulai dengan 이 melekat pada akar kata. Ini tidak berlaku lintas batas kata. 같이 memicu palatalisasi karena 이 adalah bagian dari kata itu. Dalam frasa seperti 옷 입어요 (memakai baju), 이 memulai kata yang terpisah — aturan yang berbeda berlaku.' }
    },
    47: { meaning_id: 'bersama — ㅌ + 이 → ㅊ: dieja 같이, terdengar seperti 가치' },
    48: { meaning_id: 'dengan sengaja / dengan keras kepala — ㄷ + 이 → ㅈ: dieja 굳이, terdengar seperti 구지' },
    49: { prompt_id: 'Ketika batchim ㄷ diikuti oleh vokal 이, ia berubah menjadi…', choices_id: ['ㄴ', 'ㅈ', 'ㅊ', 'ㅅ'] },
    50: { prompt_id: 'Ketika batchim ㅌ diikuti oleh vokal 이, ia berubah menjadi…', choices_id: ['ㄴ', 'ㅈ', 'ㅊ', 'ㅅ'] },

    51: {
      title_id: 'Bunyi ㄹ',
      body_id: "Konsonan Korea ㄹ sering digambarkan berada di antara r dan l — dan itu sangat tepat. Realisasi persisnya bergantung pada posisinya dalam suku kata. Di antara dua vokal, ㄹ adalah satu ketukan cepat ujung lidah pada gusi tepat di belakang gigi atas — gerakan yang sama seperti bunyi r getar cepat pada bahasa Inggris Amerika 'butter' atau 'water'. Di akhir suku kata atau sebelum konsonan, tahan lidah dengan ringan pada gusi yang sama untuk bunyi l yang lembut.",
      tip_id: { label: 'Teknik ketukan lidah', text: "Jangan menggulung ㄹ (tidak seperti getaran bahasa Spanyol) dan jangan gunakan bentuk l bahasa Inggris pada posisi vokal. Dalam 라면, ㄹ adalah ketukan cepat — coba ucapkan 'la' sambil memikirkan 'ra'. Dalam 달 (bulan), ㄹ adalah l yang ditahan. Dalam 빨리 (cepat), Anda mendapat keduanya: l yang ditahan lalu ketukan." }
    },
    52: { meaning_id: 'mi instan — ㄹ di posisi awal (sebelum vokal): ketukan r cepat' },
    53: { meaning_id: 'bulan — ㄹ sebagai batchim akhir: bunyi l yang ditahan' },
    54: { meaning_id: 'cepat, segera — ㄹㄹ ganda: l ditahan lalu ketukan r' },
    55: { meaning_id: 'Aku mencintaimu — ㄹ di antara vokal (랑→해): bunyi ketukan r' },

    56: {
      title_id: 'ㄹ + ㄴ atau ㄴ + ㄹ → ㄹㄹ',
      body_id: 'Ketika ㄹ dan ㄴ muncul berdekatan lintas suku kata, keduanya sama-sama menjadi ㄹ — ini disebut lateralisasi (유음화). Contoh: 신라 (dinasti Silla) dilafalkan 실라 (silla), bukan sin-ra. Demikian pula, 연락 (kontak) dilafalkan 열락 (yeollak). ㄴ sepenuhnya berubah menjadi ㄹ ketika berdekatan dengan ㄹ.',
      tip_id: { label: 'Mengapa lateralisasi?', text: 'ㄹ dan ㄴ berbagi posisi lidah yang sangat mirip — keduanya adalah bunyi alveolar yang dibuat di gusi gigi. Ketika keduanya muncul berdampingan, ㄹ yang lebih kuat (lateral) menarik ㄴ ke wilayahnya. Ini adalah salah satu perubahan bunyi paling mencolok karena ejaannya sama sekali tidak memberi petunjuk visual bahwa hal ini sedang terjadi.' }
    },
    57: { prompt_id: '신라 (Silla — kerajaan Korea kuno) dilafalkan sebagai…', choices_id: ['sin-ra', 'sin-la', 'sil-la', 'shi-ra'] },

    58: {
      title_id: 'Kesalahan Umum yang Sering Terjadi',
      body_id: 'Bahasa Korea memiliki sistem fonologi yang sangat berbeda dari bahasa-bahasa lain. Enam langkah berikutnya masing-masing membahas satu kesalahan pelafalan umum — lengkap dengan penjelasan jelas tentang cara memperbaikinya. Mengenali pola-pola ini sejak dini akan menghemat berbulan-bulan kebiasaan buruk.',
      tip_id: { label: 'Mengapa kesalahan ini begitu umum?', text: 'Pembelajar secara otomatis menerapkan fonologi bahasa ibu mereka pada bunyi-bunyi baru. Bahasa Korea memiliki vokal, kontras konsonan, dan pola intonasi yang sama sekali tidak ada dalam banyak bahasa lain. Setiap kesalahan ini berasal dari memetakan bunyi Korea ke padanan terdekat dalam bahasa ibu — yang hampir selalu salah.' }
    },
    59: {
      title_id: "Kesalahan 1 — Melafalkan ㅡ seperti 'oo'",
      body_id: "ㅡ tidak memiliki padanan dalam bahasa Indonesia. Ini adalah vokal belakang tak bulat — lidah Anda berada pada posisi 'oo', tetapi bibir Anda sepenuhnya datar dan tidak membulat, seperti mengucapkan 'uh' dengan mulut kaku dan melebar. Kata-kata seperti 으, 크다, 든지 semuanya menggunakan bunyi ini. Begitu bibir Anda membulat, Anda menghasilkan vokal yang salah.",
      tip_id: { label: 'Cara berlatih ㅡ', text: "Ucapkan 'oo' seperti dalam 'too'. Sekarang pertahankan lidah Anda tepat pada posisi itu, tetapi lebarkan bibir Anda menjadi datar seolah tersenyum tipis. Bunyi yang keluar — kaku, tidak bulat, sedikit ke belakang — adalah ㅡ. Jangan melemaskan lidah menjadi 'uh' atau schwa; jaga agar tetap tinggi dan ke belakang." }
    },
    60: {
      title_id: "Kesalahan 2 — Menganggap ㅓ seperti 'er' dalam bahasa Inggris",
      body_id: "ㅓ sering ditranskripsi sebagai 'eo' atau 'uh' — tetapi ini bukan 'er' bahasa Inggris Amerika yang membawa warna r. ㅓ Korea adalah vokal tengah-belakang tak bulat. Bayangkan 'uh' dalam bahasa Inggris British pada kata 'but' atau 'cup' — tanpa pembulatan, tanpa bunyi r, mulut sedikit terbuka. Menambahkan sedikit saja kesan bunyi r langsung membuat vokal ini terdengar asing.",
      tip_id: { label: 'Tes cepat', text: "Ucapkan 'Uh-oh'. Suku kata pertama 'Uh' — datar, tengah-belakang, tanpa r dan tanpa pembulatan bibir — sangat dekat dengan ㅓ. Jangan menegangkannya, jangan membulatkannya, jangan menambahkan r. Cukup 'uh' yang terbuka dan polos. Kata untuk berlatih: 어, 어머니, 뭐." }
    },
    61: {
      title_id: 'Kesalahan 3 — Mengembuskan Udara pada Konsonan Ganda',
      body_id: 'Penutur bahasa lain secara alami menambahkan aspirasi pada konsonan hambat. Konsonan tegang (ganda) Korea ㄲ, ㄸ, ㅃ, ㅆ, ㅉ tidak pernah beraspirasi. Konsonan ini dihasilkan dengan otot yang tegang dan tanpa embusan udara ke luar. Pegang selembar kertas di depan mulut Anda — kertas itu tidak boleh bergerak ketika Anda mengucapkan 까, 따, 빠, 싸, 짜. Perbedaannya adalah antara tegang-dan-tertahan versus udara yang terdorong keluar.',
      tip_id: { label: 'Tes kertas', text: 'Konsonan beraspirasi (ㅋ, ㅌ, ㅍ, ㅊ) membuat kertas bergetar cukup kuat. Konsonan biasa (ㄱ, ㄷ, ㅂ, ㅈ) membuatnya bergerak sedikit. Konsonan tegang (ㄲ, ㄸ, ㅃ, ㅉ) seharusnya membuat kertas nyaris tidak bergerak sama sekali — ketegangan otot tinggi, tanpa pelepasan udara.' }
    },
    62: {
      title_id: 'Kesalahan 4 — Intonasi Naik pada Semua Kalimat Tanya',
      body_id: 'Dalam bahasa Indonesia, intonasi naik di akhir kalimat sering menandakan pertanyaan. Dalam bahasa Korea, aturan intonasinya berbeda: pertanyaan ya/tidak memang menggunakan sedikit kenaikan di akhir, tetapi pertanyaan dengan kata tanya (siapa, apa, di mana, kapan, mengapa, bagaimana) biasanya menggunakan intonasi menurun atau netral — bukan naik. Terlalu sering menggunakan intonasi naik bergaya bahasa Inggris pada semua pertanyaan Korea terdengar tidak alami dan kadang terkesan ragu-ragu atau memohon.',
      tip_id: { label: 'Pola yang perlu diingat', text: 'Pertanyaan ya/tidak: sedikit kenaikan di akhir. Contoh: 갔어요? (Apakah kamu pergi?) — berakhir naik. Pertanyaan kata tanya: netral atau menurun. Contoh: 어디 갔어요? (Ke mana kamu pergi?) — berakhir datar atau menurun. Kata tanya sudah membawa cukup informasi; tidak perlu melodi naik.' }
    },
    63: {
      title_id: "Kesalahan 5 — ㅅ sebagai 's' biasa sebelum vokal-i",
      body_id: "Sebelum vokal 이, 야, 여, 요, 유, konsonan ㅅ dilafalkan seperti 'sh' dalam bahasa Inggris. Jadi 시 adalah 'shi' bukan 'si', dan 셔츠 (kemeja) dimulai dengan 'sh'. Ini juga berlaku untuk ㅆ tegang sebelum 이 → 'sshi'. Pembelajar yang lebih dulu belajar romanisasi sering mengucapkan 'si' padahal penutur asli mengucapkan 'shi', dan ini langsung terdengar mencolok.",
      tip_id: { label: 'Vokal mana yang memicu ini?', text: "ㅅ yang mengalami palatalisasi (bunyi 'sh') muncul sebelum vokal kelas-i: 이 (i), 야 (ya), 여 (yeo), 요 (yo), 유 (yu). Sebelum semua vokal lainnya — 아, 어, 오, 우, 으, dan gabungannya — ㅅ tetap menjadi bunyi s biasa. 사 adalah 'sa', tetapi 시 adalah 'shi'." }
    },
    64: {
      title_id: 'Kesalahan 6 — Melafalkan ㅎ dalam 좋아요',
      body_id: "Pemula sering mengucapkan 'jo-ha-yo' untuk 좋아요, memperlakukan ㅎ sebagai bunyi h yang jelas dilafalkan. Namun karena pelemahan ㅎ di antara vokal (yang telah Anda pelajari di Tahap 4), pelafalan sebenarnya adalah 조아요 (jo-a-yo) — ㅎ nyaris menghilang. Ini berlaku secara luas: 많아요 → 마나요, 낳아요 → 나아요. Kapan pun ㅎ berada di antara vokal dalam konteks percakapan alami, bunyinya akan memudar.",
      tip_id: { label: 'Menghubungkan kembali ke Tahap 4', text: '좋아요 bisa dibilang adalah bentuk kata sifat yang paling banyak digunakan dalam bahasa Korea — melafalkannya dengan benar langsung menjadi penting. Kesalahan 6 hanyalah tempat paling umum di dunia nyata di mana pemula bertemu pelemahan ㅎ dan melakukannya dengan salah.' }
    },
    65: { prompt_id: 'Ketika melafalkan ㅡ, bibir Anda seharusnya…', choices_id: ["Membulat seperti 'oo'", 'Datar dan tidak membulat (melebar)', "Sedikit terbuka seperti 'ah'", 'Mengerucut seperti mencium'] },
    66: { prompt_id: 'ㅅ sebelum vokal 이 terdengar seperti…', choices_id: ["'s' biasa seperti dalam 'see'", "'sh' seperti dalam 'she'", "'z' seperti dalam 'zero'", "'t' seperti dalam 'tea'"] },
    67: { prompt_id: '좋아요 (bagus / saya suka) sebenarnya dilafalkan sebagai…', choices_id: ['jo-ha-yo', 'jo-a-yo', 'joh-a-yo', 'jo-ha'] },

    68: {
      title_id: 'Panduan Pelafalan Selesai!',
      message_id: 'Anda telah menguasai ke-8 aturan pelafalan Korea: reduksi batchim, liaison, asimilasi nasal, tensifikasi, pelemahan ㅎ, aspirasi ㅎ, palatalisasi, dan bunyi ㄹ. Ditambah 6 kesalahan paling umum yang sering dibuat pembelajar — dan cara menghindarinya. Pelafalan bahasa Korea Anda sekarang akan terdengar jauh lebih alami.'
    }
  }
);
