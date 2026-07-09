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

patch('grammar.json',
  {
    1: { name_id: 'Kalimat' },
    2: { name_id: 'Partikel' },
    3: { name_id: 'Konjugasi' },
    4: { name_id: 'Negasi' },
    5: { name_id: 'Pertanyaan' },
    6: { name_id: 'Pola' },
    7: { name_id: 'Kata Sambung' },
    8: { name_id: 'Dan/Dengan' },
    9: { name_id: 'Kepada/Dari' },
    10: { name_id: 'Waktu' },
    11: { name_id: 'Kata Bantu Bilangan' },
    12: { name_id: 'Progresif' },
    13: { name_id: 'Perkenalan Diri' },
    14: { name_id: 'Tanggal' },
    15: { name_id: 'Kata Keterangan' },
    16: { name_id: 'Nominalisasi' },
    17: { name_id: 'Perbandingan' },
    18: { name_id: 'Suka' },
    19: { name_id: 'Masih/Sudah' },
    20: { name_id: 'Tak Tentu' },
    21: { name_id: 'Perintah' },
    22: { name_id: 'Larangan' },
    23: { name_id: 'Cara' },
    24: { name_id: 'Mahir/Kurang Mahir' },
    25: { name_id: 'Semua/Lebih' },
    26: { name_id: '-도 Lanjutan' }
  },
  {
    1: {
      title_id: 'Urutan Kata — SOV',
      body_id: 'Bahasa Korea mengikuti urutan Subjek → Objek → Kata Kerja (SOV). Kata kerja selalu berada di TERAKHIR.',
      rules_id: [
        'Bahasa Indonesia (SVO): Saya makan nasi.',
        'Bahasa Korea (SOV): 나는 밥을 먹어요. (Saya nasi makan.)',
        'Tips: Dengarkan kata terakhir — itulah kata kerjanya, tindakannya!'
      ],
      tip_id: { label: 'Tips Tata Bahasa', text: 'Begitu Anda tahu kata kerja berada di akhir, semuanya jadi masuk akal. Bagian lain kalimat bisa disusun ulang — penutur Korea menggunakan partikel untuk menjaga kejelasan.' }
    },
    2: { meaning_id: 'Saya makan nasi. (Subjek + Objek + Kata Kerja)' },
    3: { prompt_id: 'Dalam kalimat Korea, kata kerja selalu berada di...', choices_id: ['Akhir', 'Awal', 'Kedua', 'Di mana saja'] },

    4: {
      title_id: 'Partikel Bahasa Korea',
      body_id: 'Partikel melekat pada kata benda untuk menunjukkan perannya: topik, subjek, objek, lokasi. Partikel menggantikan urutan kata yang tetap.',
      rules_id: [
        '은/는 → Penanda topik (은 setelah konsonan, 는 setelah vokal)',
        '이/가 → Penanda subjek (이 setelah konsonan, 가 setelah vokal)',
        '을/를 → Penanda objek (을 setelah konsonan, 를 setelah vokal)',
        '에 → Lokasi / Arah',
        '에서 → Lokasi tindakan',
        "의 → Kepemilikan ('nya / dari)"
      ]
    },
    5: { meaning_id: 'Saya seorang pelajar. (는 = penanda topik)' },
    6: { prompt_id: '은/는 menandai ___', choices_id: ['Topik', 'Subjek', 'Objek', 'Lokasi'] },
    7: { meaning_id: 'Hujan turun. / Sedang hujan. (가 = penanda subjek)' },
    8: { prompt_id: 'Untuk menandai 밥 (nasi) sebagai OBJEK: 밥___ 먹어요', choices_id: ['을', '는', '가', '에'] },
    9: { meaning_id: 'Saya minum kopi di kafe. (에서 = lokasi tindakan)' },
    10: { prompt_id: '에서 menandai...', choices_id: ['Lokasi tindakan', 'Tujuan', 'Topik', 'Objek'] },

    11: {
      title_id: 'Kata Kerja — Bentuk Kamus',
      body_id: 'Semua kata kerja Korea dalam bentuk kamus berakhiran 다 (da). Hilangkan 다 untuk mendapatkan akar kata kerja, lalu tambahkan akhiran.',
      rules_id: [
        '가다 (pergi) → akar: 가-',
        '먹다 (makan) → akar: 먹-',
        '공부하다 (belajar) → akar: 공부하-',
        '하다 (melakukan) → akar: 하-'
      ]
    },
    12: {
      title_id: 'Bentuk Waktu Sekarang: -아요 / -어요',
      body_id: 'Tambahkan -아요 setelah akar kata dengan ㅏ atau ㅗ. Tambahkan -어요 untuk yang lainnya. Kata kerja 하다 menggunakan -해요.',
      rules_id: [
        '가다 → 가요 (pergi · akar ㅏ)',
        '오다 → 와요 (datang · akar ㅗ)',
        '먹다 → 먹어요 (makan · lainnya)',
        '마시다 → 마셔요 (minum · lainnya)',
        '공부하다 → 공부해요 (belajar · 하다)'
      ],
      tip_id: { label: 'Aturan Vokal', text: "ㅏ dan ㅗ adalah vokal 'terang' → -아요. Semua vokal lainnya adalah vokal 'gelap' → -어요. Begitu Anda tahu vokal akar katanya, konjugasi menjadi otomatis." }
    },
    13: { meaning_id: 'Saya pergi / Ayo pergi. (가다 → 가요, bentuk sekarang sopan)' },
    14: { meaning_id: 'Saya makan / sedang makan. (먹다 → 먹어요, bentuk sekarang sopan)' },
    15: { prompt_id: '가다 (pergi) → bentuk sekarang sopan?', choices_id: ['가요', '가아요', '가어요', '갔어요'] },

    16: {
      title_id: 'Bentuk Waktu Lampau: -았어요 / -었어요',
      body_id: 'Tambahkan -았어요 setelah akar kata ㅏ/ㅗ dan -었어요 untuk yang lain. 하다 → 했어요.',
      rules_id: [
        '가다 → 갔어요 (telah pergi)',
        '오다 → 왔어요 (telah datang)',
        '먹다 → 먹었어요 (telah makan)',
        '마시다 → 마셨어요 (telah minum)',
        '공부하다 → 공부했어요 (telah belajar)'
      ]
    },
    17: { meaning_id: 'Saya pergi ke Seoul.' },
    18: { prompt_id: 'Bentuk lampau dari 먹다 (makan)?', choices_id: ['먹었어요', '먹아요', '먹어요', '먹을 거예요'] },

    19: {
      title_id: 'Bentuk Waktu Depan: -(으)ㄹ 거예요',
      body_id: 'Tambahkan -(으)ㄹ 거예요 pada akar kata kerja untuk membicarakan rencana atau prediksi masa depan.',
      rules_id: [
        '가다 → 갈 거예요 (akan pergi)',
        '먹다 → 먹을 거예요 (akan makan)',
        '공부하다 → 공부할 거예요 (akan belajar)'
      ]
    },
    20: { prompt_id: '가다 (pergi) → bentuk waktu depan?', choices_id: ['갈 거예요', '갔어요', '가요', '가지 마세요'] },

    21: {
      title_id: 'Membuat Kalimat Negatif',
      body_id: 'Negasi pendek: 안 + kata kerja. Negasi panjang: akar kata kerja + 지 않아요. Tidak bisa: 못 + kata kerja.',
      rules_id: [
        '안 먹어요 (tidak makan — bentuk pendek)',
        '먹지 않아요 (tidak makan — bentuk panjang)',
        '못 가요 (tidak bisa pergi — tidak mampu)'
      ]
    },
    22: { prompt_id: "'Saya tidak makan' — bentuk negasi pendek", choices_id: ['안 먹어요', '먹지 않아요', '못 먹어요', '안 가요'] },

    23: {
      title_id: 'Membentuk Pertanyaan',
      body_id: 'Pertanyaan Korea menggunakan urutan kata yang SAMA seperti kalimat pernyataan — cukup tambahkan intonasi naik (↑) atau tanda tanya.',
      rules_id: [
        '뭐 / 무엇 — Apa',
        '누구 — Siapa',
        '어디 — Di mana',
        '언제 — Kapan',
        '왜 — Mengapa',
        '어떻게 — Bagaimana',
        '얼마 — Berapa (harga)',
        '몇 — Berapa (jumlah)'
      ],
      tip_id: { label: 'Tips Tata Bahasa', text: '밥을 먹어요 = Saya makan nasi. 밥을 먹어요? = Apakah kamu makan nasi? Kata yang sama — hanya nada naik di akhir. Tidak ada pembalikan kata seperti bahasa Inggris!' }
    },
    24: { meaning_id: 'Siapa nama Anda?' },
    25: { prompt_id: "'Di mana' dalam bahasa Korea?", choices_id: ['어디', '뭐', '왜', '언제'] },

    26: {
      title_id: 'Pola Kalimat Penting',
      body_id: 'Kuasai 6 pola ini untuk mengungkapkan ide-ide paling umum dalam percakapan bahasa Korea.',
      rules_id: [
        '~이에요/예요 — adalah (kata benda): 학생이에요 (Saya seorang pelajar)',
        '~고 싶어요 — ingin: 한국에 가고 싶어요 (Saya ingin pergi ke Korea)',
        '~ㄹ/을 수 있어요 — bisa: 한국어를 할 수 있어요 (Saya bisa berbahasa Korea)',
        '~아/어야 해요 — harus: 공부해야 해요 (Saya harus belajar)',
        '~(으)면 — jika/ketika: 비가 오면 집에 있어요 (Jika hujan, saya tinggal di rumah)',
        '~때문에 — karena: 비 때문에 못 가요 (Tidak bisa pergi karena hujan)'
      ]
    },
    27: { prompt_id: "Pola untuk 'Saya ingin pergi ke Korea': 한국에 ___", choices_id: ['가고 싶어요', '가야 해요', '갈 거예요', '갈 수 있어요'] },

    28: {
      title_id: 'Kata Sambung',
      body_id: 'Keempat kata sambung ini menghubungkan kalimat. Letakkan di AWAL kalimat kedua.',
      rules_id: [
        '그리고 — Dan / Lalu (menambah informasi atau urutan)',
        '그래서 — Jadi / Oleh karena itu (sebab → akibat)',
        '그렇지만 — Tetapi / Namun (kontras kuat, formal)',
        '그런데 — Tetapi / Ngomong-ngomong (kontras lembut, santai — paling umum!)'
      ],
      tip_id: { label: 'Tips Penggunaan', text: '그런데 adalah salah satu kata paling umum dalam bahasa Korea lisan — kata ini melembutkan kontras dan mengalihkan topik secara mulus. 그렇지만 lebih kuat dan lebih formal.' }
    },
    29: { meaning_id: 'Hujan turun. Jadi saya tinggal di rumah.' },
    30: { prompt_id: 'Kontras lembut atau peralihan topik — paling umum dalam bahasa Korea lisan?', choices_id: ['그런데', '그렇지만', '그래서', '그리고'] },

    31: {
      title_id: 'Dan, Dengan',
      body_id: "Gunakan partikel ini di antara kata benda (bukan kalimat) untuk berarti 'dan' atau 'dengan'.",
      rules_id: [
        '-하고 — setelah kata benda apa pun, netral/santai: 친구하고 갔어요 (pergi dengan teman)',
        '-(이)랑 — 이랑 (konsonan) / 랑 (vokal), sangat santai: 오빠랑 놀았어요 (bermain dengan kakak laki-laki)',
        '-와/과 — 와 (vokal) / 과 (konsonan), formal/tulisan: 선생님과 상담했어요 (berkonsultasi dengan guru)'
      ]
    },

    32: {
      title_id: 'Kepada/Dari Seseorang',
      body_id: 'Gunakan partikel arah untuk orang saat memberi kepada atau menerima dari orang, bukan tempat.',
      rules_id: [
        '-한테 — kepada (seseorang): 친구한테 전화했어요 (menelepon teman saya)',
        '-한테서 — dari (seseorang): 선생님한테서 배웠어요 (belajar dari guru)',
        '-에게 / -에게서 — padanan formal',
        '-께 — kepada (bentuk hormat, untuk yang lebih tua): 선생님께 드렸어요'
      ]
    },

    33: {
      title_id: 'Menyebutkan Waktu',
      body_id: 'Gunakan angka Korea ASLI untuk jam (시) dan angka SINO-KOREA untuk menit (분). AM = 오전, PM = 오후.',
      rules_id: [
        'Jam (시): 한(1), 두(2), 세(3), 네(4), 다섯(5)... + 시',
        'Menit (분): 일(1), 이(2), 삼(3), 사(4), 오(5)... + 분',
        'Setengah: 반 — 세 시 반 = 3:30',
        'Contoh: 오후 두 시 삼십 분 = 14:30'
      ],
      tip_id: { label: 'Pola Kunci', text: 'Jam menggunakan angka Korea asli (한, 두, 세...). Menit menggunakan angka Sino-Korea (일, 이, 삼...). Setengah = 반. AM = 오전, PM = 오후.' }
    },
    34: { meaning_id: 'Sekarang jam berapa?' },
    35: { prompt_id: 'Jam dalam waktu Korea menggunakan sistem angka yang mana?', choices_id: ['Korea asli (한, 두, 세...)', 'Sino-Korea (일, 이, 삼...)', 'Keduanya bisa', 'Angka Arab'] },

    36: {
      title_id: 'Kata Bantu Bilangan',
      body_id: 'Bahasa Korea menggunakan kata bantu bilangan tertentu setelah [Kata Benda] + [Angka]. Angka Korea asli (한, 두, 세...) digunakan dengan sebagian besar kata bantu bilangan.',
      rules_id: [
        '개 — benda umum: 사과 세 개 (3 apel)',
        '명 — orang (netral): 학생 두 명 (2 pelajar)',
        '분 — orang (hormat): 손님 두 분 (2 tamu)',
        '마리 — hewan: 고양이 한 마리 (1 kucing)',
        '권 — buku: 책 세 권 (3 buku)',
        '잔 — cangkir/minuman: 커피 두 잔 (2 kopi)',
        '번 — kali/giliran: 세 번 (3 kali)'
      ]
    },
    37: { meaning_id: 'Tolong berikan saya tiga apel.' },
    38: { prompt_id: 'Kata bantu bilangan untuk orang (netral)?', choices_id: ['명', '개', '마리', '잔'] },

    39: {
      title_id: 'Bentuk Sedang Berlangsung',
      body_id: "Tambahkan -고 있어요 pada akar kata kerja untuk mengatakan seseorang SEDANG melakukan sesuatu (bentuk '-ing' dalam bahasa Korea).",
      rules_id: [
        '먹다 → 먹고 있어요 (sedang makan)',
        '가다 → 가고 있어요 (sedang pergi)',
        '공부하다 → 공부하고 있어요 (sedang belajar)',
        '읽다 → 읽고 있어요 (sedang membaca)'
      ],
      tip_id: { label: 'Progresif vs Sederhana', text: "먹어요 = Saya makan (umum atau saat ini, tergantung konteks). 먹고 있어요 = Saya sedang makan (khususnya sedang berlangsung saat ini). Bentuk progresif menambahkan makna 'sedang dalam tindakan'." }
    },
    40: { meaning_id: 'Saya sedang makan sekarang.' },
    41: { prompt_id: "'sedang belajar' → 공부하다 + -고 있어요 =", choices_id: ['공부하고 있어요', '공부고 있어요', '공부하고 있다', '공부해요'] },

    42: {
      title_id: 'Perkenalan Diri',
      body_id: 'Kosakata kunci: 이름 (nama), 나이 (usia), 나라 (negara), 직업 (pekerjaan), 취미 (hobi), 고향 (kampung halaman).',
      rules_id: [
        '안녕하세요! 저는 [nama]이에요/예요.',
        '저는 [나라]에서 왔어요. (Saya dari [negara].)',
        '저는 [직업]이에요. (Saya seorang [pekerjaan].)',
        '제 취미는 [hobi]예요. (Hobi saya adalah [hobi].)',
        '잘 부탁드려요! (Senang bertemu Anda!)'
      ],
      tip_id: { label: 'Templat', text: 'Gunakan 안녕하세요 + 잘 부탁드려요 untuk situasi formal. Dengan teman atau sebaya: 안녕! + 잘 부탁해! Selalu membungkuk sedikit saat memperkenalkan diri secara langsung.' }
    },

    43: {
      title_id: 'Tanggal dan Bulan',
      body_id: 'Tanggal Korea menggunakan angka Sino-Korea dalam urutan Tahun → Bulan → Hari. Juni = 유월, Oktober = 시월 (pengecualian).',
      rules_id: [
        '일월(1월), 이월(2월), 삼월(3월), 사월(4월), 오월(5월), 유월(6월)',
        '칠월(7월), 팔월(8월), 구월(9월), 시월(10월), 십일월(11월), 십이월(12월)',
        'Format tanggal: 2026년 6월 16일 (16 Juni 2026)',
        '오늘이 며칠이에요? — Hari ini tanggal berapa?'
      ]
    },

    44: {
      title_id: 'Kata Keterangan Derajat',
      body_id: 'Kata keterangan derajat diletakkan langsung sebelum kata yang dimodifikasi: 조금 (sedikit), 정말 (benar-benar), 아주 (sangat), 많이 (banyak).',
      rules_id: [
        '조금 / 좀 — sedikit (좀 lebih lembut/santai)',
        '정말 — benar-benar / sungguh (netral)',
        '진짜 — benar-benar (santai, kesan lebih kuat)',
        '아주 — sangat',
        '많이 — banyak',
        '별로 + negatif — tidak terlalu (별로 안 좋아요 = Saya tidak terlalu suka)',
        '전혀 + negatif — sama sekali tidak (전혀 모르겠어요 = Saya sama sekali tidak tahu)'
      ],
      tip_id: { label: 'Kata Keterangan Negatif', text: "별로 dan 전혀 HARUS digunakan dengan kata kerja negatif (안, 못, 없다, 모르다). Mengucapkan 별로 좋아요 (tanpa negasi) tidak gramatikal. Anggap keduanya sebagai 'tidak terlalu' dan 'sama sekali tidak'." }
    },
    45: { meaning_id: 'Ini benar-benar enak!' },
    46: { prompt_id: '별로 dan 전혀 harus digunakan dengan...', choices_id: ['Kata kerja negatif', 'Kata kerja positif', 'Hanya kata sifat', 'Hanya bentuk lampau'] },

    47: {
      title_id: 'Nominalisasi: -는 것',
      body_id: "Menambahkan -는 것 pada akar kata kerja menciptakan frasa kata benda — 'tindakan melakukan ~'. Ini membuat kata kerja berperan seperti kata benda.",
      rules_id: [
        '먹는 것 — tindakan makan',
        '배우는 것 — tindakan belajar',
        '한국어를 배우는 것이 재미있어요 — Belajar bahasa Korea itu menarik',
        '요리하는 것을 좋아해요 — Saya suka memasak (tindakan memasak)'
      ],
      tip_id: { label: 'Bentuk Waktu', text: '-는 것 (sekarang/kebiasaan) · -(으)ㄴ 것 (lampau/selesai) · -(으)ㄹ 것 (masa depan/rencana). Bentuk sekarang paling umum digunakan dalam percakapan sehari-hari.' }
    },
    48: { meaning_id: 'Belajar bahasa Korea itu menarik.' },
    49: { prompt_id: '-는 것 mengubah kata kerja menjadi...', choices_id: ['Frasa kata benda', 'Bentuk lampau', 'Bentuk masa depan', 'Pertanyaan'] },

    50: {
      title_id: 'Perbandingan',
      body_id: "Struktur: [A]이/가 [B]보다 더 [kata sifat]. 보다 berarti 'daripada' dan 더 berarti 'lebih'.",
      rules_id: [
        '한국어가 영어보다 더 어려워요 — Bahasa Korea lebih sulit daripada bahasa Inggris',
        '오늘이 어제보다 더 더워요 — Hari ini lebih panas daripada kemarin',
        '더 bisa dihilangkan dalam percakapan santai: 한국어가 영어보다 어려워요'
      ]
    },
    51: { meaning_id: 'Bahasa Korea lebih sulit daripada bahasa Jepang.' },
    52: { prompt_id: "Bagaimana cara mengatakan 'lebih' dalam perbandingan Korea?", choices_id: ['더', '많이', '아주', '보다'] },

    53: {
      title_id: '좋다 vs 좋아하다',
      body_id: '좋다 menggunakan partikel subjek (이/가): 한국어가 좋아요. 좋아하다 menggunakan partikel objek (을/를): 한국어를 좋아해요.',
      rules_id: [
        '좋다 — baik / merasa senang (kondisi): 커피가 좋아요 (Saya suka kopi / Kopi ini enak)',
        '좋아하다 — menyukai (preferensi aktif): 커피를 좋아해요 (Saya suka kopi)',
        "Keduanya diterjemahkan sebagai 'saya suka' tetapi 좋다 berfokus pada perasaan, 좋아하다 pada preferensi"
      ],
      tip_id: { label: 'Perbedaan Utama', text: '좋아요 → didahului partikel subjek (이/가). 좋아해요 → didahului partikel objek (을/를). Jika ragu, 좋아해요 terdengar lebih alami untuk mengungkapkan preferensi.' }
    },

    54: {
      title_id: 'Masih & Sudah',
      body_id: '아직 + kata kerja negatif = masih belum. 벌써 = sudah (lebih cepat dari perkiraan). 이미 = sudah (netral, formal).',
      rules_id: [
        '아직 안 먹었어요 — Belum makan (masih belum)',
        '아직 여기 있어요 — Masih di sini (berlangsung)',
        '벌써 도착했어요? — Sudah sampai? (terkejut)',
        '이미 알아요 — Saya sudah tahu (netral)'
      ]
    },
    55: { prompt_id: "'아직' artinya?", choices_id: ['Masih / Belum', 'Sudah', 'Bahkan', 'Lebih'] },

    56: {
      title_id: 'Seseorang, Sesuatu',
      body_id: "Gabungkan kata tanya dengan konteks untuk mengungkapkan ide tak tentu seperti 'seseorang' atau 'tidak ada apa-apa'.",
      rules_id: [
        '누군가 — seseorang: 누군가 왔어요 (Seseorang datang)',
        '무언가 / 뭔가 — sesuatu: 뭔가 이상해요 (Ada sesuatu yang aneh)',
        '어딘가 — suatu tempat: 어딘가에 있어요 (Ada di suatu tempat)',
        '아무도 + negatif — tidak seorang pun: 아무도 없어요 (Tidak ada seorang pun di sini)',
        '아무것도 + negatif — tidak ada apa-apa: 아무것도 몰라요 (Saya tidak tahu apa-apa)'
      ]
    },
    57: { prompt_id: "'Tidak ada seorang pun di sini' — 아무도 ___", choices_id: ['없어요', '있어요', '알아요', '와요'] },

    58: {
      title_id: 'Perintah: -(으)세요',
      body_id: 'Tambahkan -(으)세요 pada akar kata kerja untuk membuat permintaan atau perintah yang sopan.',
      rules_id: [
        '가다 → 가세요 (silakan pergi)',
        '앉다 → 앉으세요 (silakan duduk)',
        '먹다 → 드세요 (silakan makan — hormat)'
      ]
    },

    59: {
      title_id: 'Jangan: -지 마세요',
      body_id: 'Tambahkan -지 마세요 pada akar kata kerja untuk memberi tahu seseorang dengan sopan agar TIDAK melakukan sesuatu.',
      rules_id: [
        '말하다 → 말하지 마세요 (tolong jangan bicara)',
        '가다 → 가지 마세요 (tolong jangan pergi)',
        '먹다 → 먹지 마세요 (tolong jangan makan)'
      ]
    },
    60: { meaning_id: 'Tolong bicara pelan-pelan.' },
    61: { prompt_id: "'Tolong jangan bicara' dalam bahasa Korea?", choices_id: ['말하지 마세요', '말해 주세요', '말하세요', '말 안 해요'] },

    62: {
      title_id: 'Cara: -(으)로',
      body_id: "-(으)로 menandai cara atau alat — 'dengan' atau 'menggunakan' suatu alat/cara melakukan sesuatu.",
      rules_id: [
        '-(으)로 setelah konsonan, -로 setelah vokal: 버스로 가요 (pergi naik bus)',
        '지하철로 와요 (datang naik kereta bawah tanah)',
        '한국어로 말해요 (berbicara dalam bahasa Korea)'
      ]
    },

    63: {
      title_id: 'Mahir/Kurang Mahir',
      body_id: '잘하다 = mahir dalam. 못하다 = kurang mahir dalam. Keduanya melekat setelah partikel objek 을/를.',
      rules_id: [
        '한국어를 잘해요 (mahir bahasa Korea)',
        '수학을 못해요 (kurang mahir matematika)',
        '수영을 잘 못해요 (kurang begitu mahir berenang)'
      ]
    },
    64: { prompt_id: "'mahir bahasa Korea' — 한국어를 ___", choices_id: ['잘해요', '못해요', '좋아해요', '잘 못해요'] },

    65: {
      title_id: 'Semua, Lebih: 다, 더',
      body_id: '다 = semua/seluruhnya. 더 = lebih. Keduanya kata keterangan sederhana yang diletakkan sebelum kata kerja.',
      rules_id: [
        '다 먹었어요 — makan semuanya / habis',
        '더 주세요 — tolong beri (saya) lebih banyak',
        '다 dan 더 digunakan sangat berbeda tergantung konteks'
      ]
    },
    66: { prompt_id: "'Tolong beri saya lebih banyak' — ___ 주세요", choices_id: ['더', '다', '좀', '잘'] },

    67: {
      title_id: 'Semua, Lebih & -도',
      body_id: "-도 memiliki 4 penggunaan lanjutan selain sekadar 'juga': penekanan, negasi tegas, dan 'baik...maupun'.",
      rules_id: [
        '아이도 알아요 — bahkan anak-anak pun tahu (penekanan: inklusi tak terduga)',
        '하나도 없어요 — tidak ada satu pun (negasi tegas: 하나도 + negatif)',
        '먹기도 해요 — kadang makan / juga makan (-기도 하다)',
        '좋기도 하고 나쁘기도 해요 — baik bagus maupun buruk'
      ]
    },
    68: { meaning_id: 'Bahasa Korea itu sulit sekaligus menarik.' },
    69: { prompt_id: "'Bahkan anak-anak pun tahu' — penggunaan -도 yang mana?", choices_id: ['아이도 알아요', '아이가 알아요', '아이를 알아요', '아이는 알아요'] },

    70: {
      title_id: 'Tata Bahasa Selesai!',
      message_id: 'Anda telah menguasai seluruh 26 tahap tata bahasa — dari urutan kata SOV dan partikel hingga pola -도 tingkat lanjut. Mulai terapkan ini dalam percakapan nyata!'
    }
  }
);
