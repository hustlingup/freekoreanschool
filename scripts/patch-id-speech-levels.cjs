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

patch('speech-levels.json',
  {
    1: { name_id: '합쇼체 (Formal)' },
    2: { name_id: '해요체 (Sopan)' },
    3: { name_id: '반말 (Santai)' },
    4: { name_id: 'Memilih Level' }
  },
  {
    1: {
      title_id: 'Ikhtisar Tingkat Kesopanan Bahasa Korea',
      body_id: 'Bahasa Korea memiliki sistem tingkat kesopanan bahasa (높임말) yang menentukan seberapa formal atau sopan bahasa Anda. Tingkat yang Anda pilih bergantung pada hubungan sosial, usia, kedudukan, dan konteks percakapan. Tiga tingkat yang paling sering Anda temui adalah: 합쇼체 (formal sopan, digunakan dalam presentasi, militer, dan layanan pelanggan), 해요체 (sopan sehari-hari, standar bagi orang dewasa yang berbicara dengan kenalan yang tidak dekat), dan 반말 (bahasa santai, digunakan dengan teman dekat dan orang yang lebih muda). Salah memilih tingkat bisa terkesan kasar, dingin, atau terlalu akrab.',
      tip_id: { label: 'Mengapa tingkat kesopanan bahasa penting di Korea', text: 'Korea adalah masyarakat hierarkis yang dibentuk oleh nilai-nilai Konfusianisme — usia, kedudukan, dan hubungan semuanya menentukan cara Anda berbicara. Menggunakan 반말 (bahasa santai) dengan orang asing atau orang yang lebih tua itu kasar. Menggunakan 합쇼체 yang terlalu formal dengan teman bisa terasa kaku dan berjarak. Menyesuaikan tingkat yang tepat adalah keterampilan sosial yang penting.' }
    },
    2: {
      title_id: '합쇼체 — Ragam Formal',
      body_id: '합쇼체 adalah tingkat bahasa formal tertinggi dalam bahasa Korea. Digunakan dalam siaran berita TV, perintah militer, presentasi resmi, ucapan staf hotel/maskapai, dan layanan pelanggan. Akhiran kata kerja berubah menjadi -ㅂ니다 / -습니다 untuk kalimat pernyataan dan -ㅂ니까? / -습니까? untuk pertanyaan. Kosakata juga berubah — 밥 (makanan) menjadi 식사, 있어요 menjadi 있습니다. Tingkat ini menandakan rasa hormat dan profesionalisme maksimal.',
      tip_id: { label: 'Di mana Anda bisa mendengar 합쇼체', text: 'Nyalakan berita Korea (KBS, MBC, SBS) dan Anda akan mendengar 합쇼체 di sepanjang siaran. Staf hotel, pengumuman maskapai, upacara resmi, dan lingkungan militer semuanya menggunakan tingkat ini. Ini juga tingkat yang digunakan dalam dokumen formal tertulis, meskipun gaya tulisan murni (문어체) sedikit berbeda.' }
    },
    3:  { meaning_id: 'adalah / merupakan — akhiran pernyataan formal' },
    4:  { meaning_id: 'Terima kasih (formal)' },
    5:  { meaning_id: 'Halo? / Apa kabar? (salam formal, bentuk pertanyaan)' },
    6:  { prompt_id: '합쇼체 paling tepat digambarkan sebagai…', choices_id: ['bahasa santai', 'tingkat bahasa paling formal', 'sopan tidak formal', 'bahasa gaul'] },
    7: {
      title_id: 'Akhiran Kata Kerja 합쇼체 (-ㅂ니다/-습니다)',
      body_id: 'Ciri khas 합쇼체 adalah akhiran -ㅂ니다 / -습니다. Gunakan -ㅂ니다 setelah akar kata kerja yang berakhiran vokal: 가다 → 갑니다 (Saya pergi). Gunakan -습니다 setelah akar kata yang berakhiran konsonan: 먹다 → 먹습니다 (Saya makan). Untuk pertanyaan, akhirannya berubah menjadi -ㅂ니까? / -습니까?: 가다 → 갑니까? (Apakah Anda pergi?). Catatan pelafalan: 갑니다 dilafalkan [감니다] karena asimilasi nasal.',
      tip_id: { label: 'Perubahan pelafalan pada -ㅂ니다', text: '갑니다 (Saya pergi) dieja 갑니다 tetapi dilafalkan 감니다. Ini karena ㅂ sebelum ㄴ berubah menjadi ㅁ melalui asimilasi nasal (posisi mulut sama, aliran udara nasal). Pola ini muncul di seluruh bentuk 합쇼체.' }
    },
    8:  { meaning_id: 'Saya makan / sedang makan (formal)' },
    9:  { meaning_id: 'Saya pergi / sedang pergi (formal) — dilafalkan 감니다' },
    10: {
      title_id: '해요체 — Bahasa Sopan Sehari-hari',
      body_id: "해요체 adalah tingkat bahasa yang paling sering Anda gunakan dalam kehidupan Korea sehari-hari. Cukup sopan untuk orang asing dan kenalan tetapi cukup hangat untuk terasa alami. Akhiran -아요 / -어요 / -해요 ditambahkan pada akar kata kerja. 해요체 digunakan di toko, dengan rekan kerja yang tidak terlalu dekat, dengan orang dewasa yang baru pertama kali Anda temui, dan dalam sebagian besar interaksi pembelajar dengan penutur asli. Ini adalah 'sopan standar' dalam bahasa Korea.",
      tip_id: { label: '해요체 adalah pengaturan standar Anda', text: 'Jika ragu, gunakan 해요체. Ini adalah tingkat paling aman dan paling universal di Korea. Anda tidak akan pernah salah dengan bersikap sopan dan hormat. Beralih ke 합쇼체 atau 반말 hanya boleh terjadi ketika situasi jelas-jelas menuntutnya.' }
    },
    11: { meaning_id: 'Halo / Selamat siang (sopan, salam sehari-hari)' },
    12: { meaning_id: 'Terima kasih (sopan, kurang formal daripada 감사합니다)' },
    13: { meaning_id: 'Saya makan / sedang makan (sopan)' },
    14: { meaning_id: 'Saya pergi / sedang pergi (sopan)' },
    15: { prompt_id: '해요체 paling tepat digambarkan sebagai…', choices_id: ['sangat formal / bahasa Korea siaran', 'bentuk paling santai', 'sopan sehari-hari / ucapan standar orang dewasa', 'bentuk hormat kuno'] },
    16: {
      title_id: 'Pola -아요 / -어요',
      body_id: 'Aturan akhiran 해요체: tambahkan -아요 jika vokal terakhir akar kata adalah ㅏ atau ㅗ (vokal terang), dan tambahkan -어요 untuk semua vokal lainnya. Kata kerja 하다 menggunakan -해요. Contoh: 가다 → 가 + 아요 = 가요 (disingkat). 먹다 → 먹 + 어요 = 먹어요. 공부하다 → 공부해요. Dalam praktiknya, 아/어 sering disingkat dengan vokal terakhir akar kata: 가 + 아요 → 가요, 오 + 아요 → 와요.',
      tip_id: { label: 'Tabel cepat', text: '가다 → 가요. 오다 → 와요. 먹다 → 먹어요. 마시다 → 마셔요. 하다 → 해요. 보다 → 봐요. 자다 → 자요. Akhiran-akhiran ini mengikuti pola harmoni vokal — coba kenali perbedaan vokal terang/gelap pada akar kata.' }
    },
    17: { meaning_id: 'Ini bagus / Saya suka ini (bentuk sekarang sopan)' },
    18: { prompt_id: "Bentuk 'Saya pergi' mana yang termasuk 해요체 (sopan sehari-hari)?", choices_id: ['가', '갑니다', '가요', '가라'] },
    19: {
      title_id: '반말 — Bahasa Santai',
      body_id: "반말 (ban-mal, secara harfiah 'setengah-bicara') adalah ragam santai yang digunakan di antara teman dekat seusia, dengan orang yang lebih muda, dan dalam keluarga. Ragam ini menghilangkan -요 dari akhiran 해요체: 가요 → 가, 먹어요 → 먹어, 좋아요 → 좋아. 반말 bisa terdengar kasar jika digunakan dengan orang yang lebih tua atau orang asing — selalu mulai dengan 해요체 dan beralih ke 반말 hanya jika orang lain memulai atau secara eksplisit menyarankannya. Dalam K-drama, karakter yang beralih dari 해요체 ke 반말 menandakan pergeseran besar dalam kedekatan.",
      tip_id: { label: 'Meminta izin untuk menggunakan 반말', text: "Cara alami untuk meminta izin: '말 놓아도 돼요?' (Bolehkah saya bicara santai?) atau '반말해도 돼요?' (Apakah boleh menggunakan 반말?). Anda juga bisa menunggu orang lain beralih secara alami terlebih dahulu — itulah undangan bagi Anda." }
    },
    20: { meaning_id: 'Hai / Dah (salam dan perpisahan santai)' },
    21: { meaning_id: 'Makasih (santai)' },
    22: { meaning_id: 'makan / saya makan (santai)' },
    23: { meaning_id: 'pergi / saya pergi (santai)' },
    24: { prompt_id: 'Salam mana yang termasuk 반말 (santai)?', choices_id: ['안녕하세요', '안녕하십니까', '안녕', '반갑습니다'] },
    25: {
      title_id: 'Kapan Menggunakan 반말 (dan Kapan TIDAK)',
      body_id: 'Gunakan 반말 dengan: teman dekat seusia, adik, murid yang lebih muda, atau anak-anak. JANGAN gunakan 반말 dengan: orang asing, siapa pun yang lebih tua dari Anda, atasan atau guru Anda, staf layanan, atau orang yang baru Anda temui (bahkan jika mereka tampak seusia). Kesalahan yang sering dilakukan banyak pembelajar bahasa Korea adalah menganggap bahwa karena seseorang ramah, 반말 sudah pantas digunakan. Keramahan dan izin tingkat bahasa adalah hal yang terpisah — selalu tunggu sinyal.',
      tip_id: { label: 'Satu pengecualian: bicara pada diri sendiri', text: 'Ketika orang Korea berbicara pada diri sendiri, bergumam, atau menulis buku harian, mereka menggunakan 반말 atau bahkan gaya netral tanpa akhiran apa pun. Ini alami dan tidak ditujukan kepada siapa pun — jadi tidak diperlukan kesopanan. Inilah juga sebabnya monolog drama dan pikiran batin ditulis dalam 반말.' }
    },
    26: { prompt_id: 'Anda berbicara dengan orang asing seusia di jalan. Tingkat mana yang harus Anda gunakan?', choices_id: ['반말', '해요체', 'keduanya boleh', 'hanya 합쇼체'] },
    27: {
      title_id: '문어체 — Gaya Tulisan/Formal',
      body_id: "문어체 (mun-eo-che, 'gaya bahasa tulisan') digunakan dalam tulisan formal — makalah akademik, artikel berita, dokumen hukum, dan sastra. Akhiran kata kerjanya adalah -다 (bentuk kamus polos): 가다, 먹는다, 했다. Terdengar tidak alami dalam percakapan lisan tetapi muncul di mana-mana dalam tulisan Korea. Pembelajar menemukan ini saat membaca teks Korea dan mungkin bertanya-tanya mengapa berbeda dari yang telah mereka pelajari — itu karena buku teks mengajarkan ragam lisan, sedangkan membaca membutuhkan pengenalan 문어체.",
      tip_id: { label: '문어체 vs 합쇼체', text: 'Keduanya formal, tetapi 합쇼체 untuk berbicara (pembicara ke pendengar) dan 문어체 untuk menulis (tanpa pendengar tertentu). Presenter berita berbicara dalam 합쇼체. Artikel koran ditulis dalam 문어체. Dalam K-drama, Anda akan mendengar 문어체 ketika karakter membaca keras dari buku atau surat.' }
    },
    28: { meaning_id: 'menjadi/adalah (kopula, bentuk tulisan/kamus)' },
    29: {
      title_id: 'Tabel Perbandingan Tingkat Kesopanan Bahasa',
      body_id: "Berikut ini bagaimana ide yang sama terlihat di berbagai tingkat bahasa. 'Saya makan': 먹습니다 (formal 합쇼체) → 먹어요 (sopan 해요체) → 먹어 (santai 반말) → 먹는다 (tulisan 문어체). 'Terima kasih': 감사합니다 (formal) → 감사해요 (sopan) → 고마워 (santai). 'Saya pergi': 갑니다 (formal) → 가요 (sopan) → 가 (santai) → 간다 (tulisan). Menyadari pola-pola ini akan membantu Anda mengenali tingkat mana yang digunakan pembicara saat menonton drama Korea atau mendengarkan penutur asli.",
      tip_id: { label: 'Gunakan K-drama untuk melatih telinga Anda', text: 'K-drama adalah tambang emas untuk berlatih tingkat bahasa. Atasan berbicara dalam 합쇼체 kepada timnya. Teman beralih ke 반말 satu sama lain. Adegan di rumah sakit atau kantor menggunakan 해요체. Jika Anda memperhatikan perubahan mendadak dalam tingkat bahasa antar karakter — itu adalah momen dramatis.' }
    },
    30: { prompt_id: "감사합니다 adalah bentuk ___ dari 'terima kasih'", choices_id: ['반말', '해요체', '합쇼체', '문어체'] },
    31: { prompt_id: 'Dalam wawancara kerja di Korea, tingkat bahasa mana yang harus Anda gunakan?', choices_id: ['반말', '해요체', '합쇼체', '문어체'] },
    32: {
      title_id: 'Mencampur Tingkat Kesopanan Bahasa — Kesalahan Umum',
      body_id: 'Salah satu kesalahan pembelajar yang paling umum adalah mencampur tingkat bahasa — menggunakan 먹어요 (해요체) dalam satu kalimat dan 먹습니다 (합쇼체) di kalimat berikutnya. Penutur asli langsung menyadarinya. Ini terdengar seperti mencampur formal dan santai dalam satu tarikan napas. Pilih satu tingkat untuk percakapan dan pertahankan. Satu-satunya pengecualian adalah pergantian yang disengaja untuk efek retoris (seperti email bisnis yang dibuka secara formal dan diakhiri dengan hangat), tetapi bahkan ini mengikuti pola yang jelas.',
      tip_id: { label: 'Jangan mencampur akhiran di tengah kalimat', text: 'Salah: 저는 학생이에요. 공부합니다. (Campuran 해요체 dan 합쇼체). Benar: 저는 학생이에요. 공부해요. (Semua 해요체). Atau: 저는 학생입니다. 공부합니다. (Semua 합쇼체). Konsistensi dalam percakapan menandakan kefasihan dan kesadaran sosial.' }
    },
    33: {
      title_id: 'Tingkat Kesopanan Bahasa Selesai!',
      message_id: 'Anda telah menguasai sistem tingkat kesopanan bahasa Korea — 합쇼체 formal, 해요체 sehari-hari, 반말 santai, dan 문어체 tulisan. Anda kini siap membaca situasi sosial dan berbicara pada tingkat yang tepat.'
    }
  }
);
