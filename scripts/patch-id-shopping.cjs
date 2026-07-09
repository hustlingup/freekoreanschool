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

patch('shopping.json',
  {
    1: { name_id: 'Kosakata Belanja' },
    2: { name_id: 'Di Toko' },
    3: { name_id: 'Harga & Angka' },
    4: { name_id: 'Transaksi' }
  },
  {
    1: {
      title_id: 'Belanja di Korea (쇼핑)',
      body_id: 'Korea memiliki budaya belanja yang kaya — dari pasar tradisional terbuka (시장) hingga department store mewah (백화점) sampai minimarket 24 jam (편의점) di setiap sudut. Tawar-menawar itu wajar di pasar tradisional tetapi tidak di toko waralaba atau mal. Belajar menanyakan harga, membandingkan barang, dan menyelesaikan transaksi dalam bahasa Korea akan membuat pengalaman belanja Anda jauh lebih lancar dan personal. Pertanyaan kunci yang akan sering Anda gunakan adalah 얼마예요? (Berapa harganya?)',
      tip_id: { label: 'Pasar Gwangjang vs department store', text: 'Di pasar tradisional seperti 광장시장 (Pasar Gwangjang) di Seoul, Anda bisa menawar — terutama jika membeli beberapa barang sekaligus. Di 롯데백화점 (Lotte Department Store) atau toko waralaba mana pun, harganya tetap. Perhatikan tanda 세일 (obral) dan promosi 할인 (diskon).' }
    },
    2:  { meaning_id: 'toko / kios' },
    3:  { meaning_id: 'pasar (tradisional terbuka)' },
    4:  { meaning_id: 'department store' },
    5:  { meaning_id: 'minimarket' },
    6:  { prompt_id: "Kata mana yang berarti 'pasar' (pasar tradisional terbuka)?", choices_id: ['가게', '백화점', '시장', '편의점'] },
    7: {
      title_id: 'Kosakata Barang Belanja (쇼핑 물건)',
      body_id: 'Bahasa Korea menggunakan banyak kata pinjaman untuk produk modern — 핸드폰 (ponsel), 노트북 (laptop), 티셔츠 (kaos). Kata Korea asli dan Sino-Korea mencakup barang tradisional: 옷 (pakaian), 신발 (sepatu), 가방 (tas). Saat berbelanja, Anda akan sering menunjuk sesuatu dan berkata 이거 (yang ini) — strategi sederhana dan efektif. Ukuran sering diberikan dalam free-size (프리 사이즈), kecil (S), sedang (M), dan besar (L/XL).',
      tip_id: { label: '이거 주세요 — penyelamat belanja Anda', text: '이거 주세요 (Saya ambil yang ini) + 얼마예요? (Berapa harganya?) akan membawa Anda melewati sebagian besar situasi belanja Korea bahkan jika Anda tidak tahu banyak hal lain. Tunjuk, ucapkan dua frasa ini, dan selesai.' }
    },
    8:  { meaning_id: 'pakaian / busana' },
    9:  { meaning_id: 'sepatu / alas kaki' },
    10: {
      title_id: 'Frasa Belanja Penting (쇼핑 표현)',
      body_id: "Beberapa frasa penting mencakup hampir semua interaksi belanja. 얼마예요? (Berapa harganya?) berlaku untuk pertanyaan harga apa pun. 이거 주세요 (Tolong berikan saya ini) menyelesaikan pembelian. 더 싸게 해 주세요 (Tolong buat lebih murah) digunakan untuk menawar di pasar tradisional. 있어요? (Apakah ada...?) + nama barang menanyakan apakah sesuatu tersedia. 없어요 berarti stok habis atau tidak tersedia.",
      tip_id: { label: 'Nada sopan saat berbelanja', text: 'Di toko-toko Korea, staf sering menyambut Anda dengan 어서 오세요! (Selamat datang!). Balas dengan anggukan atau 안녕하세요. Setelah selesai berbelanja, 감사합니다 (terima kasih) selalu dihargai. Berteriak melintasi toko jarang terjadi — dekati staf sebelum berbicara.' }
    },
    11: { meaning_id: 'Berapa harganya?' },
    12: { meaning_id: 'Tolong berikan saya ini / Saya ambil yang ini' },
    13: { meaning_id: 'Tolong buat lebih murah / Bisakah dapat diskon?' },
    14: { prompt_id: "Bagaimana cara bertanya 'Berapa harganya?' dalam bahasa Korea?", choices_id: ['이거 주세요', '얼마예요?', '감사합니다', '있어요?'] },
    15: {
      title_id: 'Menanyakan Ketersediaan (있어요? / 없어요)',
      body_id: '있어요? (Apakah ada? / Apakah Anda punya?) dan 없어요 (Tidak ada / Kami tidak punya) adalah dua kata paling berguna dalam belanja bahasa Korea. Tambahkan nama barang sebelum 있어요?: 이거 있어요? (Apakah Anda punya ini?), 더 큰 사이즈 있어요? (Apakah Anda punya ukuran lebih besar?). 없어요 adalah jawaban jika barangnya habis. Anda juga bisa mengatakan 다 팔렸어요 (Sudah terjual habis) lebih rinci.',
      tip_id: { label: '있다 vs 없다', text: '있다 = ada / memiliki. 없다 = tidak ada / tidak memiliki. 있어요? sendiri di akhir kalimat = Apakah Anda punya...? 없어요. = Kami tidak punya. Kedua kata ini muncul di hampir setiap kalimat Korea yang membahas kepemilikan, lokasi, atau ketersediaan.' }
    },
    16: { meaning_id: 'Ada / Saya punya / Kami punya (sopan)' },
    17: { meaning_id: 'Tidak ada / Kami tidak punya / Habis terjual' },
    18: { prompt_id: '없어요 berarti…', choices_id: ['Kami punya', 'Berapa harganya?', 'Tidak ada / Kami tidak punya', 'Ya, boleh'] },
    19: {
      title_id: 'Uang & Harga Korea (원)',
      body_id: 'Mata uang Korea adalah 원 (won, ₩). Harga bisa terlihat besar karena 1.000 won ≈ 0,75 USD. Secangkir kopi mungkin 4.500원, satu porsi makanan 8.000~12.000원. 비싸다 (mahal) dan 싸다 (murah) adalah kata pendapat utama. Saat menerima kembalian, jumlah yang dikembalikan disebut 거스름돈. Harga di pasar tradisional sering bisa dinegosiasikan — 깎아 주세요 (Tolong beri saya diskon) atau 더 싸게요? (Bisa lebih murah?) membuka tawar-menawar.',
      tip_id: { label: 'Membaca harga Korea', text: 'Bahasa Korea menggunakan angka Sino-Korea untuk harga: 일(1) 이(2) 삼(3) 사(4) 오(5). 만 = 10.000. Jadi 삼만 오천 원 = 35.000 won. Kasir sering menunjukkan jumlahnya di kalkulator atau layar untuk menghindari kebingungan — menunjuk angka juga berhasil dengan baik.' }
    },
    20: { meaning_id: 'won — mata uang Korea (₩)' },
    21: { meaning_id: 'mahal' },
    22: { meaning_id: 'murah' },
    23: { meaning_id: 'diskon / obral' },
    24: { prompt_id: '비싸다 berarti…', choices_id: ['murah', 'gratis', 'mahal', 'sedang diobral'] },
    25: { meaning_id: 'kembalian (uang yang dikembalikan setelah membayar)' },
    26: { prompt_id: "Kata mana yang berarti 'kembalian' (uang yang dikembalikan setelah membayar)?", choices_id: ['거스름돈', '비싸다', '할인', '원'] },
    27: {
      title_id: 'Metode Pembayaran (결제 방법)',
      body_id: 'Korea adalah masyarakat yang sangat minim tunai — sebagian besar tempat menerima kartu kredit (신용카드) atau kartu debit (체크카드), dan pembayaran seluler melalui aplikasi seperti KakaoPay dan Samsung Pay sangat umum. Uang tunai (현금) masih diterima di mana-mana tetapi lebih jarang digunakan. Saat membayar, Anda mungkin ditanya 카드요, 현금이요? (Kartu atau tunai?). Meminta struk adalah 영수증 주세요. Tanda Tax Refund di toko berarti Anda bisa mengklaim kembali PPN di bandara sebagai turis.',
      tip_id: { label: '카카오페이 & 삼성페이', text: 'KakaoPay (카카오페이) dan Samsung Pay (삼성페이) adalah aplikasi pembayaran seluler yang dominan di Korea. Turis bisa menggunakan kartu kredit internasional hampir di mana saja. Perhatikan simbol pembayaran nirkontak — adopsi pembayaran nirkontak di Korea termasuk yang tertinggi di dunia.' }
    },
    28: { meaning_id: 'Saya akan bayar dengan kartu' },
    29: { meaning_id: 'Saya akan bayar tunai (bentuk merendah)' },
    30: { meaning_id: 'Tolong berikan saya struk' },
    31: { prompt_id: "Bagaimana cara mengatakan 'Saya akan bayar dengan kartu'?", choices_id: ['현금으로 드릴게요', '카드로 할게요', '거스름돈 주세요', '결제해 주세요'] },
    32: { meaning_id: 'Tolong beri saya diskon / Tolong turunkan harganya' },
    33: {
      title_id: 'Belanja Selesai!',
      message_id: 'Anda siap berbelanja di Korea! Anda tahu kosakata penting, frasa untuk menanyakan harga, menawar, memeriksa ketersediaan, dan menyelesaikan transaksi pembayaran.'
    }
  }
);
