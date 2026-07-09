#!/usr/bin/env node
// Generate id/, culture/id/, travel/id/, news/id/ pages from de/ sources.
// Strategy: path/URL substitutions + chrome text translations (German → Indonesian).
'use strict';

const fs   = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

function mkdir(p) { fs.mkdirSync(p, { recursive: true }); }

// ── Chrome text: German → Indonesian ──────────────────────────────
// Order matters: longer strings first to avoid partial replacements.
const CHROME = [
  // metadata titles / descriptions
  ['Koreanisch kostenlos lernen', 'Belajar Bahasa Korea Gratis'],
  ['Koreanisch kostenlos lernen — Lektionen, K-Culture, Reisen und Nachrichten für alle Niveaus.',
   'Belajar bahasa Korea gratis — pelajaran, K-budaya, wisata, dan berita untuk semua level.'],
  ['Über uns | 한국어 학교 — Korean School', 'Tentang Kami | 한국어 학교 — Korean School'],
  ['Über Korean School — kostenlose Plattform zum Koreanisch- und Kulturlernen. Ohne Registrierung, ohne Login, Fortschritt lokal gespeichert.',
   'Tentang Korean School — platform belajar bahasa Korea dan budaya gratis. Tanpa registrasi, tanpa login, kemajuan disimpan secara lokal.'],
  ['Kontakt | 한국어 학교 — Korean School', 'Kontak | 한국어 학교 — Korean School'],
  ['Kontaktiere Korean School — schreib uns für Feedback, Fehlermeldungen oder Kooperationsanfragen.',
   'Hubungi Korean School — kirimkan masukan, laporan kesalahan, atau permintaan kerja sama.'],
  ['Datenschutzrichtlinie | 한국어 학교 — Korean School', 'Kebijakan Privasi | 한국어 학교 — Korean School'],
  ['Datenschutzrichtlinie von Korean School. Keine personenbezogenen Daten werden gesammelt, keine Anmeldung erforderlich. Der Fortschritt wird nur in deinem Browser gespeichert.',
   'Kebijakan Privasi Korean School. Tidak ada data pribadi yang dikumpulkan, tidak perlu mendaftar. Kemajuan hanya disimpan di peramban Anda.'],
  ['Nutzungsbedingungen | 한국어 학교 — Korean School', 'Ketentuan Penggunaan | 한국어 학교 — Korean School'],
  ['Koreanisches Quiz | 한국어 학교 — Korean School', 'Kuis Bahasa Korea | 한국어 학교 — Korean School'],
  ['Vokabular, Lektionen und koreanische Kulturführer suchen | 한국어 학교', 'Cari kosakata, pelajaran, dan panduan budaya Korea | 한국어 학교'],
  // nav links
  ['<span class="nav-icon">📚</span> Lernen', '<span class="nav-icon">📚</span> Belajar'],
  ['<span class="nav-icon">🎵</span> K-Culture', '<span class="nav-icon">🎵</span> K-Budaya'],
  ['<span class="nav-icon">🗺️</span> Reisen', '<span class="nav-icon">🗺️</span> Wisata'],
  ['<span class="nav-icon">📰</span> Nachrichten', '<span class="nav-icon">📰</span> Berita'],
  ['<span class="nav-icon">📝</span> Quiz', '<span class="nav-icon">📝</span> Kuis'],
  // header actions
  ['placeholder="Lektionen, Vokabular suchen…"', 'placeholder="Cari pelajaran, kosakata…"'],
  ['placeholder="Suchen…"', 'placeholder="Cari..."'],
  ['placeholder="Suchen..."', 'placeholder="Cari..."'],
  ['aria-label="Design wechseln"', 'aria-label="Ganti tampilan"'],
  ['aria-label="Sprache wechseln"', 'aria-label="Ganti bahasa"'],
  ['aria-label="Menü öffnen"', 'aria-label="Buka menu"'],
  ['aria-label="Menü"', 'aria-label="Menu"'],
  ['aria-label="Mobiles Menü"', 'aria-label="Menu seluler"'],
  ['>🇩🇪 DE<', '>🇮🇩 ID<'],
  // footer
  ['Lernen · 학습', 'Belajar · 학습'],
  ['Hangul-Alphabet', 'Alfabet Hangul'],
  ['Grammatik', 'Tata Bahasa'],
  ['Vokabular', 'Kosakata'],
  ['K-Culture · 문화', 'K-Budaya · 문화'],
  ['Unternehmen · 회사', 'Perusahaan · 회사'],
  ['Kostenlose Plattform zum Koreanischlernen — Sprachunterricht verbunden mit K-Culture, Reiseführern und realer Praxis. Für Lernende jedes Niveaus weltweit.',
   'Platform belajar bahasa Korea gratis — menggabungkan pembelajaran bahasa dengan K-budaya, panduan wisata, dan praktik dunia nyata. Untuk pembelajar semua level, di seluruh dunia.'],
  ['Mit ❤️ für Koreanischlernende weltweit gemacht.', 'Dibuat dengan ❤️ untuk pembelajar bahasa Korea di seluruh dunia.'],
  ['Viel Spaß beim Lernen!', 'Selamat belajar!'],
  // sidebar (culture pages)
  ['KATEGORIEN · 카테고리', 'KATEGORI · 카테고리'],
  // hero section
  ['🇰🇷 · Kostenlos · Für jedes Niveau', '🇰🇷 · Gratis · Untuk Semua Level'],
  ['Entdecke die Schönheit Koreas durch Sprache, Kultur, K-Pop, Reisen und Küche — mit kostenlosen Lektionen für Lernende weltweit.',
   'Temukan keindahan Korea lewat bahasa, budaya, K-pop, wisata, dan kuliner — dengan pelajaran gratis yang dirancang untuk pembelajar di seluruh dunia.'],
  ['Lernen starten', 'Mulai Belajar'],
  ['K-Culture entdecken', 'Jelajahi K-Budaya'],
  // hero stats
  ['Vokabeln', 'Kosakata'],
  ['Lektionen', 'Pelajaran'],
  ['Aktive Lernende', 'Pembelajar Aktif'],
  // features section
  ['FUNKTIONEN', 'FITUR'],
  ['Alles, was du brauchst, um Koreanisch zu lernen', 'Semua yang Anda Butuhkan untuk Belajar Bahasa Korea'],
  ['Hangul-Grundlagen · 한글 기초', 'Dasar-dasar Hangul · 한글 기초'],
  ['Mit 한글 beginnen', 'Mulai dengan 한글'],
  ['Lerne das koreanische Alphabet in nur 2 Stunden. 한글 (Hangul) ist bemerkenswert logisch — wenn du die 24 Grundbuchstaben kennst, kannst du alles lesen.',
   'Pelajari alfabet Korea hanya dalam 2 jam. 한글 (Hangul) sangat logis — begitu Anda tahu 24 huruf dasarnya, Anda bisa membaca apa saja.'],
  ['Hangul jetzt lernen →', 'Belajar Hangul Sekarang →'],
  ['K-Pop-Liedtexte · 가사', 'Lirik K-Pop · 가사'],
  ['Mit K-Pop-Liedtexten lernen', 'Belajar Lewat Lirik K-Pop'],
  ['Lerne Koreanisch natürlich durch deine Lieblingslieder. Zeilenweise Erklärungen mit Vokabular, Grammatiknotizen und Ausspracheführern.',
   'Belajar bahasa Korea secara alami lewat lagu favorit Anda. Pembahasan baris per baris dengan kosakata, catatan tata bahasa, dan panduan pelafalan.'],
  ['Lesen →', 'Baca →'],
  ['K-Drama · 드라마', 'K-Drama · 드라마'],
  ['K-Drama-Vokabular', 'Kosakata K-Drama'],
  ['Lerne Alltagskoreanisch aus deinen Lieblingsdramas. Kontextuelle Vokabellisten nach Sendung, Genre und Niveau geordnet.',
   'Pelajari bahasa Korea sehari-hari dari drama favorit Anda. Daftar kosakata kontekstual yang disusun berdasarkan judul, genre, dan level kemahiran.'],
  ['Koreanisches Essen · 음식', 'Kuliner Korea · 음식'],
  ['Koreanisches Lebensmittelwörterbuch', 'Kamus Kuliner Korea'],
  ['Von 김치 (Kimchi) bis 삼겹살 (Samgyeopsal) — erkunde das reiche Vokabular der koreanischen Küche mit Aussprache und Kulturkontext.',
   'Dari 김치 (kimchi) hingga 삼겹살 (samgyeopsal) — jelajahi kosakata kaya kuliner Korea lengkap dengan pelafalan dan konteks budaya.'],
  ['Tägliches Vokabular · 오늘의 단어', 'Kosakata Harian · 오늘의 단어'],
  ['Wort des Tages', 'Kata Hari Ini'],
  ['Hallo / Guten Tag', 'Halo / Selamat siang'],
  ['Anhören', 'Dengarkan'],
  ['Mehr Wörter', 'Kata Lainnya'],
  // learning paths
  ['Strukturierte Lernpfade · 학습 경로', 'Jalur Terstruktur · 학습 경로'],
  ['Wähle deinen Lernpfad', 'Pilih Jalur Belajar Anda'],
  ['Ob du gerade anfängst oder Fließendheit anstrebst, wir haben einen klaren Fahrplan, der dich Schritt für Schritt dorthin führt.',
   'Baik Anda baru memulai atau ingin mencapai kefasihan, kami punya peta jalan yang jelas untuk membawa Anda ke sana langkah demi langkah.'],
  ['Anfängerpfad starten →', 'Mulai Jalur Pemula →'],
  ['Mittelstufenpfad starten →', 'Mulai Jalur Menengah →'],
  ['Fortgeschrittenpfad starten →', 'Mulai Jalur Mahir →'],
  ['Anfänger', 'Pemula'],
  ['✓ Hangul-Alphabet', '✓ Alfabet Hangul'],
  ['✓ Grundlegende Vokale & Konsonanten', '✓ Vokal & Konsonan Dasar'],
  ['✓ Silbenblöcke', '✓ Blok Suku Kata'],
  ['✓ Grundvokabular', '✓ Kosakata Penting'],
  ['✓ Grundlegende Begrüßungen', '✓ Salam Dasar'],
  ['Mittelstufe', 'Menengah'],
  ['✓ Koreanische Grammatik (SOV)', '✓ Tata Bahasa Korea (SOV)'],
  ['✓ Partikel & Konjugation', '✓ Partikel & Konjugasi'],
  ['✓ Sprachebenen', '✓ Tingkat Kesopanan Bahasa'],
  ['✓ 300+ Vokabeln', '✓ 300+ Kosakata'],
  ['✓ Echte Dialoge', '✓ Dialog Nyata'],
  ['Fortgeschritten', 'Mahir'],
  ['✓ Koreanisch im Geschäftsleben', '✓ Bahasa Korea Bisnis'],
  ['✓ Klassisches Koreanisch', '✓ Bahasa Korea Klasik'],
  ['✓ Aufsätze schreiben', '✓ Menulis Esai'],
  ['✓ TOPIK-Vorbereitung', '✓ Persiapan TOPIK'],
  ['✓ Idiomatische Ausdrücke', '✓ Ungkapan Idiomatik'],
  // K-culture section
  ['K-CULTURE · 한국 문화', 'K-BUDAYA · 한국 문화'],
  ['Korea jenseits der Sprache erleben', 'Rasakan Korea Melampaui Bahasa'],
  ['Sprache ist das Tor — tauche in koreanische Popkultur, Essen und Beauty ein, um dein Lernen zu beschleunigen.',
   'Bahasa adalah gerbangnya — benamkan diri Anda dalam budaya pop, kuliner, dan kecantikan Korea untuk mempercepat pembelajaran Anda.'],
  ['Koreanische K-Pop-Phrasen, die du kennen musst', 'Frasa Bahasa Korea Bintang K-Pop yang Perlu Anda Tahu'],
  ['Von BTS bis BLACKPINK — die häufigsten koreanischen Wörter und Phrasen deiner K-Pop-Lieblingskünstler, mit Ausspracheführern.',
   'Dari BTS hingga BLACKPINK — kata dan frasa Korea paling umum yang digunakan oleh artis K-Pop favorit Anda, lengkap dengan panduan pelafalan.'],
  ['Koreanische Gefühle durch K-Drama meistern', 'Kuasai Emosi Bahasa Korea Lewat K-Drama'],
  ['K-Dramas sind vollgepackt mit emotionalem Vokabular. Lerne, wie Charaktere Freude, Trauer, Ärger und Liebe in authentischem Koreanisch ausdrücken.',
   'Drama Korea penuh dengan kosakata emosional. Pelajari cara karakter mengungkapkan kebahagiaan, kesedihan, kemarahan, dan cinta dalam bahasa Korea yang otentik.'],
  ['Wie ein Einheimischer bestellen: Koreanisch im Restaurant', 'Memesan Seperti Warga Lokal: Bahasa Korea di Restoran'],
  ['Wichtige Phrasen zum Essen bestellen, die Rechnung verlangen und sicher durch eine koreanische Speisekarte navigieren.',
   'Frasa penting untuk memesan makanan, meminta tagihan, dan memahami menu restoran Korea dengan percaya diri.'],
  ['Beauty- & Pflege-Vokabular auf Koreanisch', 'Kosakata Kecantikan & Perawatan Kulit dalam Bahasa Korea'],
  ['Erkunde die Welt der K-Beauty mit wichtigem Vokabular für Pflegeroutinen, Kosmetik und koreanische Schönheitstrends.',
   'Jelajahi dunia K-Beauty dengan kosakata penting untuk rutinitas perawatan kulit, kosmetik, dan tren kecantikan Korea.'],
  ['Alle K-Culture-Inhalte ansehen →', 'Jelajahi Semua Konten K-Budaya →'],
  // travel section
  ['REISEN · 여행', 'WISATA · 여행'],
  ['Korea erkunden', 'Jelajahi Korea'],
  ['Lerne die Sprache jedes Reiseziels. Vom belebten Seoul bis zu den ruhigen Ufern von Jeju — dein Reiseführer ist bereit.',
   'Pelajari bahasa setiap destinasi. Dari Seoul yang ramai hingga pantai tenang Jeju — panduan wisata Anda sudah siap.'],
  ['Seoul Skyline Han-Fluss', 'Cakrawala Seoul Sungai Han'],
  ['Südkoreas glanzvolle Hauptstadt — von den alten Palästen des Gyeongbokgung bis zu den Neon-Straßen von Gangnam und Hongdae.',
   'Ibu kota Korea Selatan yang memukau — dari istana kuno Gyeongbokgung hingga jalanan neon Gangnam dan Hongdae.'],
  ['Entdecken →', 'Jelajahi →'],
  ['Haeundae Strand Busan', 'Pantai Haeundae Busan'],
  ['Koreas lebhafte Hafenstadt mit atemberaubenden Stränden, frischen Meeresfrüchtemärkten und einem einzigartigen Dialekt.',
   'Kota pelabuhan Korea yang dinamis dengan pantai indah, pasar makanan laut segar, dan dialek unik yang layak dijelajahi.'],
  ['Hallasan Insel Jeju', 'Hallasan Pulau Jeju'],
  ['Koreas Paradiesinsel — vulkanische Landschaften, unberührte Strände, Mandarinenplantagen und die berühmte Haenyeo-Tauchkultur.',
   'Pulau surga Korea — lanskap vulkanik, pantai murni, kebun jeruk keprok, dan budaya penyelaman haenyeo yang terkenal.'],
  ['Vollständigen Reiseführer ansehen →', 'Lihat Panduan Wisata Lengkap →'],
  // quiz section
  ['ÜBEN · 연습', 'LATIHAN · 연습'],
  ['Teste dein Koreanisch', 'Uji Bahasa Korea Anda'],
  ['10 progressive Stufen · Multiple Choice · Hangul, Grammatik & Vokabular', '10 level bertahap · Pilihan ganda · Hangul, Tata Bahasa & Kosakata'],
  ['Stufe wählen', 'Pilih Level'],
  // about page
  ['🇰🇷 · Über uns · 소개', '🇰🇷 · Tentang Kami · 소개'],
  ['Über <span class="grad-text">Korean School</span>', 'Tentang <span class="grad-text">Korean School</span>'],
  ['Eine kostenlose Plattform zum Koreanisch- und Kulturlernen — offen für alle, überall, immer.',
   'Sebuah platform belajar bahasa Korea dan budaya gratis — terbuka untuk semua orang, di mana saja, kapan saja.'],
  ['UNSER MOTTO · 슬로건', 'MOTO KAMI · 슬로건'],
  ['„Um eine Sprache wirklich zu lernen, muss man die Kultur kennen"',
   '"Untuk benar-benar mempelajari suatu bahasa, Anda harus memahami budayanya"'],
  ['Koreanisch lernt man nicht isoliert. Es ist eingebettet in K-Drama-Dialoge, K-Pop-Texte, Gerichtsnamen, konfuzianische Höflichkeitsformen und den städtischen Alltag. Wir unterrichten die Sprache zusammen mit der Kultur, die ihr Bedeutung verleiht.',
   'Bahasa Korea tidak bisa dipelajari secara terpisah. Bahasa ini melekat dalam dialog K-Drama, lirik K-Pop, nama hidangan, tata krama Konfusianisme, dan kehidupan perkotaan sehari-hari. Kami mengajarkan bahasa bersama dengan budaya yang memberinya makna.'],
  ['WAS UNS AUSZEICHNET · 특징', 'YANG MEMBUAT KAMI BERBEDA · 특징'],
  ['Für immer kostenlos', 'Gratis Selamanya'],
  ['Jede Lektion, jedes Quiz und jeder Leitfaden ist völlig kostenlos — kein Abo, keine Zahlung.',
   'Setiap pelajaran, kuis, dan panduan sepenuhnya gratis — tanpa langganan, tanpa pembayaran.'],
  ['Ohne Registrierung', 'Tanpa Registrasi'],
  ['Kein Konto, keine E-Mail, kein Passwort. Öffne die Seite und fang sofort an zu lernen.',
   'Tanpa akun, email, atau kata sandi. Buka halaman dan mulai belajar sekarang juga.'],
  ['Privater Fortschritt', 'Kemajuan Pribadi'],
  ['Dein Fortschritt wird im lokalen Speicher deines Browsers gespeichert — privat, offline und nie geteilt.',
   'Kemajuan Anda disimpan di penyimpanan lokal peramban Anda — privat, tanpa koneksi internet, dan tidak pernah dibagikan.'],
  ['Kultur zuerst', 'Budaya Lebih Dulu'],
  ['Die Sprache im echten Kulturkontext — nicht nur Lehrbuchphrasen, sondern K-Pop, Essen, Reisen und Nachrichten.',
   'Bahasa dalam konteks budaya nyata — bukan hanya frasa buku teks, tetapi K-Pop, kuliner, wisata, dan berita.'],
  ['WAS DU FINDEST · 콘텐츠', 'YANG AKAN ANDA TEMUKAN · 콘텐츠'],
  ['Hangul, Grammatik, Vokabular, Aussprache, Sprachebenen, Dialoge und mehr.',
   'Hangul, tata bahasa, kosakata, pelafalan, tingkat kesopanan bahasa, dialog, dan lainnya.'],
  ['K-Pop, K-Drama, koreanisches Essen, K-Beauty, Traditionen, Gaming, Sport und Mode.',
   'K-Pop, K-Drama, kuliner Korea, K-Beauty, tradisi, gaming, olahraga, dan fashion.'],
  ['Stadtführer, Reisephrasen und Reisepläne für Seoul, Busan, Jeju und mehr.',
   'Panduan kota, frasa wisata, dan rencana perjalanan untuk Seoul, Busan, Jeju, dan lainnya.'],
  ['Zweisprachige Nachrichten aus Korea — von Anfänger bis Fortgeschritten — um täglich natürlich Koreanisch zu lernen.',
   'Berita dwibahasa dari Korea — dari pemula hingga mahir — untuk belajar bahasa Korea secara alami setiap hari.'],
  ['Interaktive Quiz zu Hangul, Vokabular und Grammatik mit sofortigem Feedback.',
   'Kuis interaktif tentang Hangul, kosakata, dan tata bahasa dengan umpan balik instan.'],
  ['Erstellt mit Claude Code', 'Dibuat dengan Claude Code'],
  ['Diese Website wurde vollständig mit <strong style="color:var(--text);">Claude Code</strong> — dem KI-Programmierassistenten von Anthropic — erstellt.\n          Sie wird ständig verbessert.\n          <span style="color:var(--primary);font-weight:600;">계속 업그레이드 중</span> — immer aktuell.',
   'Situs web ini dibuat sepenuhnya dengan <strong style="color:var(--text);">Claude Code</strong> — asisten pemrograman AI dari Anthropic.\n          Situs ini terus ditingkatkan.\n          <span style="color:var(--primary);font-weight:600;">계속 업그레이드 중</span> — selalu diperbarui.'],
  ['📚 Koreanisch lernen starten →', '📚 Mulai Belajar Bahasa Korea →'],
  // contact page
  ['🇰🇷 · Kontakt · 연락', '🇰🇷 · Kontak · 연락'],
  ['Schreib uns', 'Hubungi Kami'],
  ['Kontaktiere das Korean School-Team.', 'Hubungi tim Korean School.'],
  ['Feedback & Vorschläge', 'Masukan & Saran'],
  ['Fehler melden', 'Laporkan Kesalahan'],
  ['Kooperationsanfragen', 'Permintaan Kerja Sama'],
  ['Nachricht senden', 'Kirim Pesan'],
  ['Dein Name', 'Nama Anda'],
  ['Deine E-Mail-Adresse', 'Alamat Email Anda'],
  ['Betreff', 'Subjek'],
  ['Nachricht', 'Pesan'],
  ['Senden', 'Kirim'],
  // privacy page
  ['🇰🇷 · Datenschutz · 개인정보', '🇰🇷 · Privasi · 개인정보'],
  // terms page
  ['🇰🇷 · Nutzungsbedingungen · 이용약관', '🇰🇷 · Ketentuan · 이용약관'],
  // quiz page
  ['🇰🇷 · Quiz · 퀴즈', '🇰🇷 · Kuis · 퀴즈'],
  ['Koreanisches Quiz', 'Kuis Bahasa Korea'],
  ['Stufe auswählen', 'Pilih Level'],
  ['Weiter →', 'Lanjut →'],
  ['← Zurück', '← Kembali'],
  ['Richtig', 'Benar'],
  ['Falsch', 'Salah'],
  // footer link labels (generic single words — must come after ALL compound phrases that contain these words)
  ['Über uns', 'Tentang Kami'],
  ['Kontakt', 'Kontak'],
  ['Datenschutzrichtlinie', 'Kebijakan Privasi'],
  ['Nutzungsbedingungen', 'Ketentuan Penggunaan'],
  ['K-Culture', 'K-Budaya'],
  ['Reisen', 'Wisata'],
  ['Koreanische Nachrichten', 'Berita Korea'],
  ['Entdecken', 'Jelajahi'],
  ['Unternehmen', 'Perusahaan'],
  ['Reiseführer', 'Panduan Wisata'],
  // generic remaining — single words last so they don't eat compound phrases above
  ['Lernen starten', 'Mulai Belajar'],
  ['Koreanisch lernen', 'Belajar Bahasa Korea'],
  ['Silbenblöcke', 'Blok Suku Kata'],
  ['Aussprache', 'Pelafalan'],
  ['Startseite', 'Beranda'],
  ['Lernen', 'Belajar'],
];

function applyChrome(html) {
  let out = html;
  for (const [de, id] of CHROME) {
    out = out.split(de).join(id);
  }
  return out;
}

function applyPaths(html, depth) {
  let out = html;

  out = out.replace(/lang="de"/g, 'lang="id"');
  out = out.replace(/lang-de\.js/g, 'lang-id.js');

  if (depth === 1) {
    out = out
      .replace(/https:\/\/freekoreanschool\.com\/de\//g, 'https://freekoreanschool.com/id/')
      .replace(/https:\/\/freekoreanschool\.com\/de\b/g, 'https://freekoreanschool.com/id')
      .replace(/hreflang="de"/g, 'hreflang="id"')
      .replace(/\.\.\/learn\/de\//g, '../learn/id/')
      .replace(/\.\.\/culture\/de\//g, '../culture/id/')
      .replace(/\.\.\/travel\/de\//g, '../travel/id/')
      .replace(/\.\.\/news\/de\//g, '../news/id/');
  } else if (depth === 2) {
    out = out
      .replace(/https:\/\/freekoreanschool\.com\/culture\/de\//g, 'https://freekoreanschool.com/culture/id/')
      .replace(/https:\/\/freekoreanschool\.com\/culture\/de\b/g, 'https://freekoreanschool.com/culture/id')
      .replace(/https:\/\/freekoreanschool\.com\/travel\/de\//g, 'https://freekoreanschool.com/travel/id/')
      .replace(/https:\/\/freekoreanschool\.com\/travel\/de\b/g, 'https://freekoreanschool.com/travel/id')
      .replace(/hreflang="de"/g, 'hreflang="id"')
      .replace(/\.\.\/\.\.\/de\//g, '../../id/')
      .replace(/\.\.\/\.\.\/learn\/de\//g, '../../learn/id/')
      .replace(/\.\.\/\.\.\/culture\/de\//g, '../../culture/id/')
      .replace(/\.\.\/\.\.\/travel\/de\//g, '../../travel/id/')
      .replace(/\.\.\/\.\.\/news\/de\//g, '../../news/id/');
  }

  return out;
}

// ── Generate id/ root pages ─────────────────────────────────────
const ID_ROOT = path.join(ROOT, 'id');
mkdir(ID_ROOT);

const rootPages = ['index.html', 'about.html', 'contact.html', 'privacy.html', 'quiz.html', 'search.html', 'terms.html'];

for (const page of rootPages) {
  const src = path.join(ROOT, 'de', page);
  if (!fs.existsSync(src)) { console.log(`⚠ skipped missing de/${page}`); continue; }

  let html = fs.readFileSync(src, 'utf8');
  html = applyChrome(html);
  html = applyPaths(html, 1);

  const dest = path.join(ID_ROOT, page);
  fs.writeFileSync(dest, html, 'utf8');
  console.log(`✓ id/${page}`);
}

// ── Generate culture/id/ pages ──────────────────────────────────
const CULTURE_DE = path.join(ROOT, 'culture', 'de');
const CULTURE_ID = path.join(ROOT, 'culture', 'id');
mkdir(CULTURE_ID);

if (fs.existsSync(CULTURE_DE)) {
  const culturePages = fs.readdirSync(CULTURE_DE).filter(f => f.endsWith('.html'));
  for (const page of culturePages) {
    let html = fs.readFileSync(path.join(CULTURE_DE, page), 'utf8');
    html = applyChrome(html);
    html = applyPaths(html, 2);

    fs.writeFileSync(path.join(CULTURE_ID, page), html, 'utf8');
    console.log(`✓ culture/id/${page}`);
  }
} else {
  console.log('⚠ culture/de/ not found, skipping culture/id/');
}

// ── Generate travel/id/ pages ───────────────────────────────────
const TRAVEL_DE = path.join(ROOT, 'travel', 'de');
const TRAVEL_ID = path.join(ROOT, 'travel', 'id');
mkdir(TRAVEL_ID);

if (fs.existsSync(TRAVEL_DE)) {
  const travelPages = fs.readdirSync(TRAVEL_DE).filter(f => f.endsWith('.html'));
  for (const page of travelPages) {
    let html = fs.readFileSync(path.join(TRAVEL_DE, page), 'utf8');
    html = applyChrome(html);
    html = applyPaths(html, 2);

    fs.writeFileSync(path.join(TRAVEL_ID, page), html, 'utf8');
    console.log(`✓ travel/id/${page}`);
  }
} else {
  console.log('⚠ travel/de/ not found, skipping travel/id/');
}

// ── Generate news/id/ pages ──────────────────────────────────────
const NEWS_DE = path.join(ROOT, 'news', 'de');
const NEWS_ID = path.join(ROOT, 'news', 'id');

if (fs.existsSync(NEWS_DE)) {
  mkdir(NEWS_ID);
  const newsPages = fs.readdirSync(NEWS_DE).filter(f => f.endsWith('.html'));
  for (const page of newsPages) {
    let html = fs.readFileSync(path.join(NEWS_DE, page), 'utf8');
    html = applyChrome(html);
    html = applyPaths(html, 2);
    fs.writeFileSync(path.join(NEWS_ID, page), html, 'utf8');
    console.log(`✓ news/id/${page}`);
  }
} else {
  console.log('⚠ news/de/ not found, skipping news/id/');
}

console.log('\nAll id/ pages generated.');
