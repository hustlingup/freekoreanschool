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

patch('emotions.json',
  {
    1: { name_id: 'Emosi Inti' },
    2: { name_id: 'Mengungkapkan Perasaan' },
    3: { name_id: 'Emosi Kompleks' },
    4: { name_id: 'Frasa Emosional' }
  },
  {
    1: {
      title_id: 'Emosi dalam Bahasa Korea (감정)',
      body_id: "Kata emosi Korea kebanyakan berupa kata sifat dalam bentuk dasarnya. Berbeda dengan bahasa Indonesia ('Saya senang'), kata sifat Korea bertindak seperti kata kerja dan langsung dikonjugasikan: 행복해요 (Saya bahagia / Ini bagus) tanpa perlu 'adalah' terpisah. Bentuk kamus berakhiran -다: 행복하다, 슬프다, 무섭다. Hilangkan -다 dan tambahkan -아요/-어요 untuk bentuk sekarang yang sopan. Kosakata emosi sangat berguna untuk membicarakan K-drama, kehidupan sehari-hari, dan perasaan pribadi.",
      tip_id: { label: 'Kata sifat dikonjugasikan seperti kata kerja', text: '행복하다 → 행복해요 (Saya bahagia). 슬프다 → 슬퍼요 (Saya sedih). 피곤하다 → 피곤해요 (Saya lelah). Akhiran -아요/-어요 membuat kata sifat sekaligus sopan dan berbentuk sekarang.' }
    },
    2: { meaning_id: 'bahagia (bentuk kamus)' },
    3: { meaning_id: 'sedih (bentuk kamus)' },
    4: { meaning_id: 'marah (secara harfiah: kemarahan keluar)' },
    5: { meaning_id: 'takut / menakutkan' },
    6: { prompt_id: "Kata mana yang berarti 'bahagia'?", choices_id: ['슬프다', '무섭다', '행복하다', '화가 나다'] },
    7: {
      title_id: 'Mengonjugasikan Kata Sifat Emosi',
      body_id: 'Untuk menggunakan kata sifat emosi dalam percakapan sopan, hilangkan -다 dari bentuk kamus dan tambahkan akhiran sekarang yang sopan. Untuk akar kata berakhiran 하: 하다 → 해요 (행복하다 → 행복해요). Untuk akar kata berakhiran vokal terang (ㅏ, ㅗ): tambahkan -아요. Untuk yang lainnya: tambahkan -어요, sering disingkat — 슬프다 → 슬프 + 어요 → 슬퍼요, 무섭다 → 무서워요. Pola yang sama berlaku untuk sebagian besar kata kerja deskriptif Korea (kata sifat).',
      tip_id: { label: 'Tabel konjugasi cepat', text: '행복하다 → 행복해요. 슬프다 → 슬퍼요. 화나다 → 화나요. 무섭다 → 무서워요. 피곤하다 → 피곤해요. 기쁘다 → 기뻐요. Perhatikan bahwa 슬프다 menghilangkan 으 sebelum -어요.' }
    },
    8: { meaning_id: 'Saya bahagia / Ini menyenangkan (bentuk sekarang sopan)' },
    9: { meaning_id: 'Saya sedih (bentuk sekarang sopan)' },
    10: {
      title_id: 'Kata Perasaan Lainnya (감정 어휘)',
      body_id: 'Bahasa Korea memiliki kumpulan kata emosi yang kaya di luar dasar-dasarnya. 기쁘다 (senang/gembira) adalah kebahagiaan yang sedikit lebih kuat atau lebih spesifik daripada 행복하다. 걱정되다 (khawatir) secara harfiah berarti \'kekhawatiran muncul/terjadi\'. 신나다 (bersemangat/bergairah) umumnya digunakan untuk situasi yang penuh energi — konser, olahraga, perayaan. 피곤하다 (lelah) penting untuk kehidupan sehari-hari, terutama saat menjelaskan bahwa Anda tidak bisa melakukan sesuatu.',
      tip_id: { label: '신나다 dalam budaya pop', text: '신나다 dan 신나요 ada di mana-mana dalam budaya pop Korea. Lagu K-pop sering menggunakan 신나 untuk menggambarkan irama atau suasana yang menyenangkan. Anda juga akan mendengar 신난다! sebagai seruan (Ini sangat seru!) di acara dan pesta.' }
    },
    11: { meaning_id: 'senang / gembira' },
    12: { meaning_id: 'khawatir' },
    13: { meaning_id: 'lelah / kelelahan' },
    14: { meaning_id: 'bersemangat / bergairah' },
    15: { prompt_id: "Kata mana yang berarti 'lelah'?", choices_id: ['기쁘다', '신나다', '피곤하다', '걱정되다'] },
    16: {
      title_id: '기분 — Suasana Hati & Perasaan',
      body_id: '기분 (gibun) adalah kata kunci untuk menggambarkan suasana hati atau keadaan perasaan umum Anda. 기분이 좋다 (gibuneul jota) = merasa senang / suasana hati baik. 기분이 나쁘다 = merasa tidak enak / suasana hati buruk. 기분 dapat menggambarkan nada emosional secara lebih luas daripada kata emosi tunggal — ini tentang keadaan keseluruhan Anda. Anda akan mendengar 기분이 어때요? (Bagaimana perasaan Anda?) dalam percakapan sehari-hari.',
      tip_id: { label: '기분 vs 감정', text: '기분 = suasana hati, keadaan perasaan umum (kontekstual, bisa berubah). 감정 = emosi (perasaan yang lebih spesifik seperti marah, senang, takut). 기분이 좋아요 = Saya merasa senang sekarang. 감정을 표현하다 = mengungkapkan emosi.' }
    },
    17: { meaning_id: 'Saya merasa senang / Suasana hati saya baik' },
    18: { prompt_id: '기분이 좋아요 berarti…', choices_id: ['Saya merasa buruk', 'Saya merasa senang', 'Saya lapar', 'Saya lelah'] },
    19: {
      title_id: 'Emosi yang Lebih Dalam (깊은 감정)',
      body_id: 'Bahasa Korea memiliki beberapa kata emosi yang tidak memiliki padanan satu kata dalam bahasa Indonesia. 그립다 (geuripda) menggambarkan merindukan seseorang atau sesuatu — kerinduan akan orang atau tempat tercinta yang tidak ada. 외롭다 (oeropda) adalah kesepian, tetapi dengan kedalaman budaya berupa keterasingan. 부끄럽다 (bukkeureupda) adalah rasa malu atau canggung. 뿌듯하다 (ppudeuthada) adalah kebanggaan hangat atau kepuasan atas pencapaian — perasaan yang Anda dapatkan ketika menyelesaikan sesuatu yang sulit atau melihat orang yang Anda pedulikan berhasil.',
      tip_id: { label: '한 (Han) — kesedihan Korea yang tak dapat diterjemahkan', text: '한 (han) adalah emosi yang khas secara budaya: kesedihan mendalam bercampur dengan ketangguhan, berakar pada penderitaan sejarah tetapi berubah menjadi energi kreatif. Kata ini terdengar dalam pansori (opera rakyat Korea), digambarkan dalam puisi, dan disebut dalam diskusi tentang identitas Korea. Bukan kata yang digunakan santai, tetapi penting untuk pemahaman budaya.' }
    },
    20: { meaning_id: 'merindukan seseorang/sesuatu (kerinduan)' },
    21: { meaning_id: 'kesepian' },
    22: { meaning_id: 'malu / canggung' },
    23: { meaning_id: 'merasa bangga / puas (rasa pencapaian yang hangat)' },
    24: { prompt_id: '그립다 berarti…', choices_id: ['senang', 'merindukan seseorang (kerinduan)', 'lelah', 'kesepian'] },
    25: { meaning_id: 'merasakan getaran kegembiraan / hati berdebar (antisipasi romantis)' },
    26: { prompt_id: '뿌듯하다 berarti…', choices_id: ['malu', 'merasa bangga/puas', 'kesepian', 'merindukan seseorang'] },
    27: {
      title_id: 'Pola Kalimat Emosional yang Umum',
      body_id: "Beberapa pola kalimat sangat berguna untuk mengungkapkan emosi dalam bahasa Korea. '보고 싶어요' (Saya merindukanmu / Saya ingin melihatmu) menggunakan 보다 (melihat) + -고 싶다 (ingin). '감동받았어요' (Saya terharu/tersentuh) menggunakan 감동 (emosi mendalam) + 받다 (menerima). '괜찮아요' (Saya baik-baik saja / Tidak apa-apa) adalah salah satu frasa paling serbaguna — digunakan untuk 'saya baik-baik saja', 'tidak apa-apa', 'tidak masalah', dan 'lupakan saja'.",
      tip_id: { label: '괜찮아요 — frasa serbaguna', text: "괜찮아요 secara harfiah berarti 'baik-baik saja/tidak apa-apa'. Gunakan untuk meyakinkan seseorang bahwa Anda baik-baik saja (setelah tersandung), untuk menerima tawaran yang sebelumnya Anda tolak, untuk mengatakan 'tidak, terima kasih', atau untuk mengungkapkan 'itu bisa diterima'. Menguasai nadanya adalah kuncinya — kata yang sama, pesan yang sangat berbeda." }
    },
    28: { meaning_id: 'Saya merindukanmu / Saya ingin bertemu denganmu' },
    29: { meaning_id: 'Saya terharu / tersentuh (secara emosional)' },
    30: { meaning_id: 'Saya baik-baik saja / Tidak apa-apa / Tidak masalah' },
    31: { prompt_id: '보고 싶어요 berarti…', choices_id: ['Saya baik-baik saja', 'Saya terharu', 'Saya merindukanmu / Saya ingin bertemu denganmu', 'Saya kesepian'] },
    32: { meaning_id: 'Semangat! / Tetap bertahan! (secara harfiah: keluarkan kekuatan)' },
    33: {
      title_id: 'Emosi Selesai!',
      message_id: 'Anda telah menjelajahi kosakata emosi Korea — dari perasaan dasar hingga kata-kata yang kaya secara budaya seperti 그립다, 뿌듯하다, dan 설레다. Kemampuan bahasa Korea emosional Anda terus berkembang!'
    }
  }
);
