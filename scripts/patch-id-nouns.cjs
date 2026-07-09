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

patch('nouns.json',
  {
    1: { name_id: 'Orang & Keluarga' },
    2: { name_id: 'Tempat & Waktu' },
    3: { name_id: 'Benda & Kata Bantu Bilangan' },
    4: { name_id: 'Kepemilikan' }
  },
  {
    1: {
      title_id: 'Kata Benda Korea (명사)',
      body_id: "Kata benda Korea (명사) tidak berubah berdasarkan gender atau jumlah. Kata yang sama 사람 berarti 'orang', 'orang-orang', 'seseorang', dan 'orang itu'. Bentuk jamak dipahami dari konteks atau ditambahkan secara terpisah dengan kata seperti 들 (들 adalah akhiran jamak, misalnya 사람들 = orang-orang). Tidak ada kata sandang seperti 'a' atau 'the'. Ini membuat kata benda Korea sangat mudah dipelajari — Anda hanya perlu tahu kata itu sendiri.",
      tip_id: { label: 'Akhiran jamak 들', text: '들 menambahkan makna jamak secara lembut: 친구들 (teman-teman), 학생들 (para pelajar). Anda bisa melekatkan 들 pada orang atau hewan, tetapi ini opsional dan sering dihilangkan ketika konteksnya sudah jelas.' }
    },
    2: { meaning_id: 'orang / manusia' },
    3: { meaning_id: 'pria / anak laki-laki' },
    4: { meaning_id: 'wanita / anak perempuan' },
    5: { meaning_id: 'anak / anak kecil' },
    6: { meaning_id: 'teman' },
    7: { prompt_id: "Kata mana yang berarti 'teman'?", choices_id: ['남자', '여자', '친구', '아이'] },
    8: {
      title_id: 'Kata Benda Keluarga (가족 명사)',
      body_id: 'Istilah keluarga Korea sering berbeda tergantung gender penutur. 오빠 (oppa) adalah sebutan yang digunakan penutur perempuan untuk kakak laki-lakinya, sedangkan 형 (hyung) adalah sebutan penutur laki-laki untuk kakak laki-lakinya. Begitu pula, 언니 (unni) = kakak perempuan (penutur perempuan) dan 누나 (nuna) = kakak perempuan (penutur laki-laki). Untuk orang tua, 아버지 / 어머니 adalah istilah formal, sedangkan 아빠 / 엄마 adalah padanan santainya.',
      tip_id: { label: 'Sebutan khusus gender', text: "Berbeda dengan bahasa Indonesia, bahasa Korea tidak memiliki satu kata untuk 'saudara kandung'. Apakah Anda mengucapkan 오빠/형 atau 언니/누나 sepenuhnya bergantung pada gender Anda sendiri dan usia relatif saudara tersebut. Ini adalah inti dari kosakata keluarga Korea." }
    },
    9:  { meaning_id: 'ayah (formal)' },
    10: { meaning_id: 'ibu (formal)' },
    11: {
      title_id: 'Kata Benda Tempat (장소 명사)',
      body_id: "Kata benda tempat Korea mengikuti aturan tanpa kata sandang yang sama seperti kata benda lainnya. 학교 berarti 'sekolah', 'sebuah sekolah', atau 'sekolah itu' — konteks yang menentukan. Saat memberi arah atau menyatakan lokasi, bahasa Korea menambahkan partikel 에 (di/ke) setelah kata benda tempat: 학교에 가요 (Saya pergi ke sekolah). Kata benda tempat termasuk kata paling praktis untuk dipelajari sejak awal.",
      tip_id: { label: 'Partikel lokasi 에', text: "Lekatkan 에 pada kata benda tempat untuk berarti 'di', 'ke', atau 'menuju': 집에 (di rumah), 학교에 (ke sekolah), 식당에 (di restoran). 에서 berarti 'dari' atau 'di (melakukan sesuatu)': 학교에서 공부해요 (Saya belajar di sekolah)." }
    },
    12: { meaning_id: 'rumah' },
    13: { meaning_id: 'sekolah' },
    14: { meaning_id: 'restoran / kantin' },
    15: { meaning_id: 'rumah sakit / klinik' },
    16: { prompt_id: "Kata mana yang berarti 'sekolah'?", choices_id: ['집', '식당', '병원', '학교'] },
    17: {
      title_id: 'Kata Benda Waktu (시간 명사)',
      body_id: 'Kata benda waktu dalam bahasa Korea bekerja secara mandiri — tidak perlu konjugasi. Anda cukup menyebutkan kata waktu di awal kalimat: 오늘 가요 (Saya pergi hari ini), 내일 만나요 (Ayo bertemu besok). Ungkapan waktu Korea menggunakan angka Sino-Korea untuk jam dan angka Korea asli untuk menit. Kata waktu paling penting adalah 오늘 (hari ini), 내일 (besok), 어제 (kemarin), dan 지금 (sekarang).',
      tip_id: { label: 'Kata waktu sebagai pembuka kalimat', text: "Bahasa Korea sangat fleksibel dalam urutan kata, tetapi ungkapan waktu biasanya muncul di awal kalimat — sebelum subjek atau tepat setelahnya. '오늘 학교에 가요' dan '학교에 오늘 가요' keduanya benar, meski yang pertama lebih alami." }
    },
    18: { meaning_id: 'hari ini' },
    19: { prompt_id: "Kata mana yang berarti 'hari ini'?", choices_id: ['내일', '어제', '오늘', '지금'] },
    20: {
      title_id: 'Kata Benda Objek (사물 명사)',
      body_id: "Benda sehari-hari termasuk kata Korea yang paling langsung berguna. Bahasa Korea memiliki kata Korea asli maupun kata Sino-Korea (asal Tionghoa) untuk benda, dan dalam banyak kasus digunakan Konglish (kata pinjaman dari bahasa Inggris): 커피 (kopi), 핸드폰 (telepon genggam). Ketika benda tersebut menjadi penerima langsung dari kata kerja, tambahkan 을/를 setelah kata benda: 책을 읽어요 (Saya membaca buku). Ini adalah partikel penanda objek.",
      tip_id: { label: 'Partikel objek 을/를', text: 'Gunakan 을 setelah kata benda yang berakhiran konsonan: 책을. Gunakan 를 setelah kata benda yang berakhiran vokal: 가방을. Dalam percakapan santai, partikel ini sering dihilangkan sepenuhnya.' }
    },
    21: { meaning_id: 'buku' },
    22: { meaning_id: 'tas / ransel' },
    23: { meaning_id: 'uang' },
    24: { prompt_id: "Kata mana yang berarti 'uang'?", choices_id: ['책', '가방', '돈', '핸드폰'] },
    25: {
      title_id: 'Kata Bantu Bilangan Korea (수사)',
      body_id: 'Bahasa Korea menggunakan kata bantu hitung yang disebut kata bantu bilangan (수사) yang melekat pada angka saat menghitung hal-hal tertentu. Kata bantu bilangan 개 digunakan untuk benda umum: 한 개 (satu benda), 세 개 (tiga benda). 명 digunakan untuk menghitung orang: 두 명 (dua orang). 잔 digunakan untuk cangkir/gelas: 한 잔 (satu cangkir). Polanya adalah: angka + kata bantu bilangan, diletakkan tepat sebelum atau sesudah kata benda. Angka Korea untuk kata bantu bilangan menggunakan rangkaian angka Korea asli: 하나(1), 둘(2), 셋(3), 넷(4), 다섯(5).',
      tip_id: { label: 'Angka asli dengan kata bantu bilangan', text: 'Saat menggabungkan angka Korea asli dengan kata bantu bilangan, angkanya berubah sedikit: 하나 → 한, 둘 → 두, 셋 → 세, 넷 → 네. Jadi yang benar adalah 한 개 (bukan 하나 개), 두 명 (bukan 둘 명).' }
    },
    26: { meaning_id: 'tiga orang (명 = kata bantu bilangan orang)' },
    27: { prompt_id: 'Kata bantu bilangan mana yang digunakan untuk orang (menghitung individu)?', choices_id: ['개', '명', '잔', '권'] },
    28: {
      title_id: 'Penanda Kepemilikan 의',
      body_id: "Penanda kepemilikan 의 (ui, sering dilafalkan '에') melekat pada kata benda untuk menunjukkan kepemilikan, seperti 's dalam bahasa Inggris. 저의 가방 = tas saya, 친구의 집 = rumah teman. Dalam percakapan sehari-hari, 의 umumnya dihilangkan: 제 가방 (tas saya, sopan) atau 내 가방 (tas saya, santai). Kata ganti 저 dan 나 memiliki bentuk kepemilikan khusus: 제 (sopan, milik saya) dan 내 (santai, milik saya).",
      tip_id: { label: '제 vs 내', text: "제 adalah bentuk kepemilikan sopan/merendah untuk 'milik saya' (dari 저 = saya, sopan). 내 adalah bentuk kepemilikan santai untuk 'milik saya' (dari 나 = saya, santai). Gunakan 제 dengan orang asing atau yang lebih tua, 내 dengan teman dekat." }
    },
    29: { meaning_id: 'tas saya (sopan)' },
    30: { meaning_id: 'teman saya (santai)' },
    31: { prompt_id: "Bagaimana cara mengatakan 'tas saya' dalam bahasa Korea yang sopan?", choices_id: ['내 가방', '저의 책', '제 가방', '나의 집'] },
    32: { meaning_id: 'rumah teman' },
    33: {
      prompt_id: '의 adalah penanda kepemilikan dalam bahasa Korea. Apa padanannya dalam bahasa Indonesia?',
      choices_id: ['penanda subjek', "'nya / milik (kepemilikan)", 'penanda objek', 'akhiran jamak']
    },
    34: {
      title_id: 'Kata Benda Selesai!',
      message_id: 'Anda telah mempelajari kata benda Korea yang penting — orang, tempat, benda, kata waktu, kata bantu bilangan, dan kepemilikan. Lanjutkan ke Kata Ganti berikutnya.'
    }
  }
);
