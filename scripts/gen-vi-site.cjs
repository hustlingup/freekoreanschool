#!/usr/bin/env node
// Generate vi/, culture/vi/, travel/vi/, news/vi/ pages from de/ sources.
// Strategy: path/URL substitutions + chrome text translations (German → Vietnamese).
'use strict';

const fs   = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

function mkdir(p) { fs.mkdirSync(p, { recursive: true }); }

// ── Chrome text: German → Vietnamese ──────────────────────────────
// Order matters: longer strings first to avoid partial replacements.
const CHROME = [
  // metadata titles / descriptions
  ['Koreanisch kostenlos lernen', 'Học tiếng Hàn miễn phí'],
  ['Koreanisch kostenlos lernen — Lektionen, K-Culture, Reisen und Nachrichten für alle Niveaus.',
   'Học tiếng Hàn miễn phí — bài học, K-văn hóa, du lịch và tin tức cho mọi trình độ.'],
  ['Über uns | 한국어 학교 — Korean School', 'Về chúng tôi | 한국어 학교 — Korean School'],
  ['Über Korean School — kostenlose Plattform zum Koreanisch- und Kulturlernen. Ohne Registrierung, ohne Login, Fortschritt lokal gespeichert.',
   'Về Korean School — nền tảng học tiếng Hàn và văn hóa miễn phí. Không cần đăng ký, không cần đăng nhập, tiến độ lưu cục bộ.'],
  ['Kontakt | 한국어 학교 — Korean School', 'Liên hệ | 한국어 학교 — Korean School'],
  ['Kontaktiere Korean School — schreib uns für Feedback, Fehlermeldungen oder Kooperationsanfragen.',
   'Liên hệ Korean School — viết cho chúng tôi về phản hồi, báo lỗi hoặc yêu cầu hợp tác.'],
  ['Datenschutzrichtlinie | 한국어 학교 — Korean School', 'Chính sách bảo mật | 한국어 학교 — Korean School'],
  ['Datenschutzrichtlinie von Korean School. Keine personenbezogenen Daten werden gesammelt, keine Anmeldung erforderlich. Der Fortschritt wird nur in deinem Browser gespeichert.',
   'Chính sách bảo mật của Korean School. Không thu thập dữ liệu cá nhân, không yêu cầu đăng nhập. Tiến độ chỉ lưu trong trình duyệt của bạn.'],
  ['Nutzungsbedingungen | 한국어 학교 — Korean School', 'Điều khoản sử dụng | 한국어 학교 — Korean School'],
  ['Koreanisches Quiz | 한국어 학교 — Korean School', 'Kiểm tra tiếng Hàn | 한국어 학교 — Korean School'],
  ['Vokabular, Lektionen und koreanische Kulturführer suchen | 한국어 학교', 'Tìm từ vựng, bài học và hướng dẫn văn hóa Hàn Quốc | 한국어 학교'],
  // nav links
  ['<span class="nav-icon">📚</span> Lernen', '<span class="nav-icon">📚</span> Học'],
  ['<span class="nav-icon">🎵</span> K-Culture', '<span class="nav-icon">🎵</span> K-Văn hóa'],
  ['<span class="nav-icon">🗺️</span> Reisen', '<span class="nav-icon">🗺️</span> Du lịch'],
  ['<span class="nav-icon">📰</span> Nachrichten', '<span class="nav-icon">📰</span> Tin tức'],
  ['<span class="nav-icon">📝</span> Quiz', '<span class="nav-icon">📝</span> Kiểm tra'],
  // header actions
  ['placeholder="Lektionen, Vokabular suchen…"', 'placeholder="Tìm bài học, từ vựng…"'],
  ['placeholder="Suchen…"', 'placeholder="Tìm kiếm…"'],
  ['placeholder="Suchen..."', 'placeholder="Tìm kiếm..."'],
  ['aria-label="Design wechseln"', 'aria-label="Đổi giao diện"'],
  ['aria-label="Sprache wechseln"', 'aria-label="Đổi ngôn ngữ"'],
  ['aria-label="Menü öffnen"', 'aria-label="Mở menu"'],
  ['aria-label="Menü"', 'aria-label="Menu"'],
  ['aria-label="Mobiles Menü"', 'aria-label="Menu di động"'],
  ['>🇩🇪 DE<', '>🇻🇳 VI<'],
  // footer
  ['Lernen · 학습', 'Học · 학습'],
  ['Hangul-Alphabet', 'Bảng chữ cái Hangul'],
  ['Grammatik', 'Ngữ pháp'],
  ['Vokabular', 'Từ vựng'],
  ['K-Culture · 문화', 'K-Văn hóa · 문화'],
  ['Unternehmen · 회사', 'Công ty · 회사'],
  ['Kostenlose Plattform zum Koreanischlernen — Sprachunterricht verbunden mit K-Culture, Reiseführern und realer Praxis. Für Lernende jedes Niveaus weltweit.',
   'Nền tảng học tiếng Hàn miễn phí — kết hợp học ngôn ngữ với K-văn hóa, hướng dẫn du lịch và thực hành thực tế. Dành cho mọi trình độ trên toàn thế giới.'],
  ['Mit ❤️ für Koreanischlernende weltweit gemacht.', 'Làm với ❤️ cho người học tiếng Hàn trên toàn thế giới.'],
  ['Viel Spaß beim Lernen!', 'Chúc bạn học vui!'],
  // sidebar (culture pages)
  ['KATEGORIEN · 카테고리', 'DANH MỤC · 카테고리'],
  // footer link labels (generic single words — must come after compound phrases that contain these words)
  ['Über uns', 'Về chúng tôi'],
  ['Kontakt', 'Liên hệ'],
  ['Datenschutzrichtlinie', 'Chính sách bảo mật'],
  ['Nutzungsbedingungen', 'Điều khoản sử dụng'],
  ['K-Culture', 'K-Văn hóa'],
  ['Reisen', 'Du lịch'],
  ['Koreanische Nachrichten', 'Tin tức Hàn Quốc'],
  ['Entdecken', 'Khám phá'],
  ['Unternehmen', 'Công ty'],
  ['Reiseführer', 'Hướng dẫn du lịch'],
  // hero section
  ['🇰🇷 · Kostenlos · Für jedes Niveau', '🇰🇷 · Miễn phí · Cho mọi trình độ'],
  ['Entdecke die Schönheit Koreas durch Sprache, Kultur, K-Pop, Reisen und Küche — mit kostenlosen Lektionen für Lernende weltweit.',
   'Khám phá vẻ đẹp của Hàn Quốc qua ngôn ngữ, văn hóa, K-pop, du lịch và ẩm thực — với các bài học miễn phí dành cho người học trên toàn thế giới.'],
  ['Lernen starten', 'Bắt đầu học'],
  ['K-Culture entdecken', 'Khám phá K-Văn hóa'],
  // hero stats
  ['Vokabeln', 'Từ vựng'],
  ['Lektionen', 'Bài học'],
  ['Aktive Lernende', 'Học viên đang học'],
  // features section
  ['FUNKTIONEN', 'TÍNH NĂNG'],
  ['Alles, was du brauchst, um Koreanisch zu lernen', 'Tất cả những gì bạn cần để học tiếng Hàn'],
  ['Hangul-Grundlagen · 한글 기초', 'Hangul cơ bản · 한글 기초'],
  ['Mit 한글 beginnen', 'Bắt đầu với 한글'],
  ['Lerne das koreanische Alphabet in nur 2 Stunden. 한글 (Hangul) ist bemerkenswert logisch — wenn du die 24 Grundbuchstaben kennst, kannst du alles lesen.',
   'Học bảng chữ cái tiếng Hàn chỉ trong 2 giờ. 한글 (Hangul) rất có hệ thống — một khi biết 24 chữ cái cơ bản, bạn có thể đọc bất cứ thứ gì.'],
  ['Hangul jetzt lernen →', 'Học Hangul ngay →'],
  ['K-Pop-Liedtexte · 가사', 'Lời K-Pop · 가사'],
  ['Mit K-Pop-Liedtexten lernen', 'Học qua lời K-Pop'],
  ['Lerne Koreanisch natürlich durch deine Lieblingslieder. Zeilenweise Erklärungen mit Vokabular, Grammatiknotizen und Ausspracheführern.',
   'Học tiếng Hàn tự nhiên qua các bài hát yêu thích. Phân tích từng dòng kèm từ vựng, ghi chú ngữ pháp và hướng dẫn phát âm.'],
  ['Lesen →', 'Đọc →'],
  ['K-Drama · 드라마', 'K-Drama · 드라마'],
  ['K-Drama-Vokabular', 'Từ vựng K-Drama'],
  ['Lerne Alltagskoreanisch aus deinen Lieblingsdramas. Kontextuelle Vokabellisten nach Sendung, Genre und Niveau geordnet.',
   'Học tiếng Hàn hàng ngày từ các bộ phim yêu thích. Danh sách từ vựng theo ngữ cảnh được sắp xếp theo phim, thể loại và trình độ.'],
  ['Koreanisches Essen · 음식', 'Ẩm thực Hàn Quốc · 음식'],
  ['Koreanisches Lebensmittelwörterbuch', 'Từ điển ẩm thực Hàn Quốc'],
  ['Von 김치 (Kimchi) bis 삼겹살 (Samgyeopsal) — erkunde das reiche Vokabular der koreanischen Küche mit Aussprache und Kulturkontext.',
   'Từ 김치 (kimchi) đến 삼겹살 (samgyeopsal) — khám phá từ vựng phong phú về ẩm thực Hàn Quốc kèm phát âm và bối cảnh văn hóa.'],
  ['Tägliches Vokabular · 오늘의 단어', 'Từ vựng hàng ngày · 오늘의 단어'],
  ['Wort des Tages', 'Từ của ngày'],
  ['Hallo / Guten Tag', 'Xin chào / Chào buổi sáng'],
  ['Anhören', 'Nghe'],
  ['Mehr Wörter', 'Thêm từ'],
  // learning paths
  ['Strukturierte Lernpfade · 학습 경로', 'Lộ trình học · 학습 경로'],
  ['Wähle deinen Lernpfad', 'Chọn lộ trình học của bạn'],
  ['Ob du gerade anfängst oder Fließendheit anstrebst, wir haben einen klaren Fahrplan, der dich Schritt für Schritt dorthin führt.',
   'Dù bạn mới bắt đầu hay muốn đạt trình độ lưu loát, chúng tôi có lộ trình rõ ràng để đưa bạn từng bước.'],
  ['Anfängerpfad starten →', 'Bắt đầu lộ trình người mới →'],
  ['Mittelstufenpfad starten →', 'Bắt đầu lộ trình trung cấp →'],
  ['Fortgeschrittenpfad starten →', 'Bắt đầu lộ trình nâng cao →'],
  ['Anfänger', 'Người mới'],
  ['✓ Hangul-Alphabet', '✓ Bảng chữ cái Hangul'],
  ['✓ Grundlegende Vokale & Konsonanten', '✓ Nguyên âm & Phụ âm cơ bản'],
  ['✓ Silbenblöcke', '✓ Khối âm tiết'],
  ['✓ Grundvokabular', '✓ Từ vựng cần thiết'],
  ['✓ Grundlegende Begrüßungen', '✓ Lời chào cơ bản'],
  ['Mittelstufe', 'Trung cấp'],
  ['✓ Koreanische Grammatik (SOV)', '✓ Ngữ pháp tiếng Hàn (SOV)'],
  ['✓ Partikel & Konjugation', '✓ Trợ từ & Chia động từ'],
  ['✓ Sprachebenen', '✓ Cấp độ nói'],
  ['✓ 300+ Vokabeln', '✓ 300+ từ vựng'],
  ['✓ Echte Dialoge', '✓ Hội thoại thực tế'],
  ['Fortgeschritten', 'Nâng cao'],
  ['✓ Koreanisch im Geschäftsleben', '✓ Tiếng Hàn thương mại'],
  ['✓ Klassisches Koreanisch', '✓ Tiếng Hàn cổ điển'],
  ['✓ Aufsätze schreiben', '✓ Viết luận'],
  ['✓ TOPIK-Vorbereitung', '✓ Ôn thi TOPIK'],
  ['✓ Idiomatische Ausdrücke', '✓ Thành ngữ'],
  // K-culture section
  ['K-CULTURE · 한국 문화', 'K-VĂN HÓA · 한국 문화'],
  ['Korea jenseits der Sprache erleben', 'Trải nghiệm Hàn Quốc vượt ngôn ngữ'],
  ['Sprache ist das Tor — tauche in koreanische Popkultur, Essen und Beauty ein, um dein Lernen zu beschleunigen.',
   'Ngôn ngữ là cánh cổng — hãy đắm chìm vào văn hóa đại chúng, ẩm thực và làm đẹp Hàn Quốc để thúc đẩy việc học.'],
  ['Koreanische K-Pop-Phrasen, die du kennen musst', 'Câu tiếng Hàn của ngôi sao K-Pop bạn cần biết'],
  ['Von BTS bis BLACKPINK — die häufigsten koreanischen Wörter und Phrasen deiner K-Pop-Lieblingskünstler, mit Ausspracheführern.',
   'Từ BTS đến BLACKPINK — những từ và cụm từ tiếng Hàn phổ biến nhất của nghệ sĩ K-Pop yêu thích, kèm hướng dẫn phát âm.'],
  ['Koreanische Gefühle durch K-Drama meistern', 'Nắm vững cảm xúc tiếng Hàn qua K-Drama'],
  ['K-Dramas sind vollgepackt mit emotionalem Vokabular. Lerne, wie Charaktere Freude, Trauer, Ärger und Liebe in authentischem Koreanisch ausdrücken.',
   'K-Drama chứa đầy từ vựng cảm xúc. Học cách nhân vật bày tỏ niềm vui, nỗi buồn, tức giận và tình yêu bằng tiếng Hàn chính xác.'],
  ['Wie ein Einheimischer bestellen: Koreanisch im Restaurant', 'Gọi món như người địa phương: Tiếng Hàn tại nhà hàng'],
  ['Wichtige Phrasen zum Essen bestellen, die Rechnung verlangen und sicher durch eine koreanische Speisekarte navigieren.',
   'Cụm từ cần thiết để gọi món, hỏi hóa đơn và duyệt thực đơn nhà hàng Hàn Quốc một cách tự tin.'],
  ['Beauty- & Pflege-Vokabular auf Koreanisch', 'Từ vựng làm đẹp & chăm sóc da bằng tiếng Hàn'],
  ['Erkunde die Welt der K-Beauty mit wichtigem Vokabular für Pflegeroutinen, Kosmetik und koreanische Schönheitstrends.',
   'Khám phá thế giới K-Beauty với từ vựng cần thiết về quy trình chăm sóc da, mỹ phẩm và xu hướng làm đẹp Hàn Quốc.'],
  ['Alle K-Culture-Inhalte ansehen →', 'Xem toàn bộ nội dung K-Văn hóa →'],
  // travel section
  ['REISEN · 여행', 'DU LỊCH · 여행'],
  ['Korea erkunden', 'Khám phá Hàn Quốc'],
  ['Lerne die Sprache jedes Reiseziels. Vom belebten Seoul bis zu den ruhigen Ufern von Jeju — dein Reiseführer ist bereit.',
   'Học ngôn ngữ của từng điểm đến. Từ Seoul nhộn nhịp đến bờ biển yên bình của Jeju — hướng dẫn du lịch của bạn đã sẵn sàng.'],
  ['Seoul Skyline Han-Fluss', 'Seoul Skyline Sông Hàn'],
  ['Südkoreas glanzvolle Hauptstadt — von den alten Palästen des Gyeongbokgung bis zu den Neon-Straßen von Gangnam und Hongdae.',
   'Thủ đô rực rỡ của Hàn Quốc — từ cung điện cổ Gyeongbokgung đến những con phố neon ở Gangnam và Hongdae.'],
  ['Entdecken →', 'Khám phá →'],
  ['Haeundae Strand Busan', 'Bãi biển Haeundae Busan'],
  ['Koreas lebhafte Hafenstadt mit atemberaubenden Stränden, frischen Meeresfrüchtemärkten und einem einzigartigen Dialekt.',
   'Thành phố cảng sầm uất của Hàn Quốc với bãi biển tuyệt đẹp, chợ hải sản tươi và phương ngữ độc đáo đáng khám phá.'],
  ['Hallasan Insel Jeju', 'Hallasan Đảo Jeju'],
  ['Koreas Paradiesinsel — vulkanische Landschaften, unberührte Strände, Mandarinenplantagen und die berühmte Haenyeo-Tauchkultur.',
   'Hòn đảo thiên đường của Hàn Quốc — địa hình núi lửa, bãi biển trong xanh, vườn quýt và văn hóa lặn biển haenyeo nổi tiếng.'],
  ['Vollständigen Reiseführer ansehen →', 'Xem hướng dẫn du lịch đầy đủ →'],
  // quiz section
  ['ÜBEN · 연습', 'LUYỆN TẬP · 연습'],
  ['Teste dein Koreanisch', 'Kiểm tra tiếng Hàn của bạn'],
  ['10 progressive Stufen · Multiple Choice · Hangul, Grammatik & Vokabular', '10 cấp độ · Trắc nghiệm · Hangul, Ngữ pháp & Từ vựng'],
  ['Stufe wählen', 'Chọn cấp độ'],
  // about page
  ['🇰🇷 · Über uns · 소개', '🇰🇷 · Về chúng tôi · 소개'],
  ['Über <span class="grad-text">Korean School</span>', 'Về <span class="grad-text">Korean School</span>'],
  ['Eine kostenlose Plattform zum Koreanisch- und Kulturlernen — offen für alle, überall, immer.',
   'Một nền tảng học tiếng Hàn và văn hóa miễn phí — mở cho tất cả mọi người, ở khắp nơi, mọi lúc.'],
  ['UNSER MOTTO · 슬로건', 'PHƯƠNG CHÂM · 슬로건'],
  ['„Um eine Sprache wirklich zu lernen, muss man die Kultur kennen"',
   '"Để thực sự học một ngôn ngữ, bạn phải hiểu văn hóa của nó"'],
  ['Koreanisch lernt man nicht isoliert. Es ist eingebettet in K-Drama-Dialoge, K-Pop-Texte, Gerichtsnamen, konfuzianische Höflichkeitsformen und den städtischen Alltag. Wir unterrichten die Sprache zusammen mit der Kultur, die ihr Bedeutung verleiht.',
   'Không thể học tiếng Hàn một cách cô lập. Nó gắn liền với hội thoại K-Drama, lời K-Pop, tên món ăn, nghi thức Nho giáo và cuộc sống đô thị. Chúng tôi dạy ngôn ngữ cùng với văn hóa mang lại ý nghĩa cho nó.'],
  ['WAS UNS AUSZEICHNET · 특징', 'ĐIỂM NỔI BẬT · 특징'],
  ['Für immer kostenlos', 'Miễn phí mãi mãi'],
  ['Jede Lektion, jedes Quiz und jeder Leitfaden ist völlig kostenlos — kein Abo, keine Zahlung.',
   'Mỗi bài học, kiểm tra và hướng dẫn đều hoàn toàn miễn phí — không đăng ký, không thanh toán.'],
  ['Ohne Registrierung', 'Không cần đăng ký'],
  ['Kein Konto, keine E-Mail, kein Passwort. Öffne die Seite und fang sofort an zu lernen.',
   'Không cần tài khoản, email hay mật khẩu. Mở trang và bắt đầu học ngay.'],
  ['Privater Fortschritt', 'Tiến độ riêng tư'],
  ['Dein Fortschritt wird im lokalen Speicher deines Browsers gespeichert — privat, offline und nie geteilt.',
   'Tiến độ của bạn được lưu trong bộ nhớ cục bộ của trình duyệt — riêng tư, ngoại tuyến và không bao giờ chia sẻ.'],
  ['Kultur zuerst', 'Văn hóa trước tiên'],
  ['Die Sprache im echten Kulturkontext — nicht nur Lehrbuchphrasen, sondern K-Pop, Essen, Reisen und Nachrichten.',
   'Ngôn ngữ trong bối cảnh văn hóa thực tế — không chỉ câu sách giáo khoa, mà còn K-Pop, ẩm thực, du lịch và tin tức.'],
  ['WAS DU FINDEST · 콘텐츠', 'NỘI DUNG · 콘텐츠'],
  ['Hangul, Grammatik, Vokabular, Aussprache, Sprachebenen, Dialoge und mehr.',
   'Hangul, ngữ pháp, từ vựng, phát âm, cấp độ nói, hội thoại và nhiều hơn.'],
  ['K-Pop, K-Drama, koreanisches Essen, K-Beauty, Traditionen, Gaming, Sport und Mode.',
   'K-Pop, K-Drama, ẩm thực Hàn Quốc, K-Beauty, truyền thống, gaming, thể thao và thời trang.'],
  ['Stadtführer, Reisephrasen und Reisepläne für Seoul, Busan, Jeju und mehr.',
   'Hướng dẫn thành phố, cụm từ du lịch và lịch trình cho Seoul, Busan, Jeju và nhiều hơn.'],
  ['Zweisprachige Nachrichten aus Korea — von Anfänger bis Fortgeschritten — um täglich natürlich Koreanisch zu lernen.',
   'Tin tức song ngữ từ Hàn Quốc — từ người mới đến nâng cao — để học tiếng Hàn tự nhiên mỗi ngày.'],
  ['Interaktive Quiz zu Hangul, Vokabular und Grammatik mit sofortigem Feedback.',
   'Kiểm tra tương tác về Hangul, từ vựng và ngữ pháp với phản hồi tức thì.'],
  ['Erstellt mit Claude Code', 'Được tạo với Claude Code'],
  ['Diese Website wurde vollständig mit <strong style="color:var(--text);">Claude Code</strong> — dem KI-Programmierassistenten von Anthropic — erstellt.\n          Sie wird ständig verbessert.\n          <span style="color:var(--primary);font-weight:600;">계속 업그레이드 중</span> — immer aktuell.',
   'Trang web này được xây dựng hoàn toàn bằng <strong style="color:var(--text);">Claude Code</strong> — trợ lý lập trình AI của Anthropic.\n          Nó không ngừng được cải thiện.\n          <span style="color:var(--primary);font-weight:600;">계속 업그레이드 중</span> — luôn cập nhật.'],
  ['📚 Koreanisch lernen starten →', '📚 Bắt đầu học tiếng Hàn →'],
  // contact page
  ['🇰🇷 · Kontakt · 연락', '🇰🇷 · Liên hệ · 연락'],
  ['Schreib uns', 'Viết cho chúng tôi'],
  ['Kontaktiere das Korean School-Team.', 'Liên hệ với đội ngũ Korean School.'],
  ['Feedback & Vorschläge', 'Phản hồi & Đề xuất'],
  ['Fehler melden', 'Báo lỗi'],
  ['Kooperationsanfragen', 'Yêu cầu hợp tác'],
  ['Nachricht senden', 'Gửi tin nhắn'],
  ['Dein Name', 'Tên của bạn'],
  ['Deine E-Mail-Adresse', 'Địa chỉ email của bạn'],
  ['Betreff', 'Chủ đề'],
  ['Nachricht', 'Tin nhắn'],
  ['Senden', 'Gửi'],
  // privacy page
  ['🇰🇷 · Datenschutz · 개인정보', '🇰🇷 · Bảo mật · 개인정보'],
  // terms page
  ['🇰🇷 · Nutzungsbedingungen · 이용약관', '🇰🇷 · Điều khoản · 이용약관'],
  // quiz page
  ['🇰🇷 · Quiz · 퀴즈', '🇰🇷 · Kiểm tra · 퀴즈'],
  ['Koreanisches Quiz', 'Kiểm tra tiếng Hàn'],
  ['Stufe auswählen', 'Chọn cấp độ'],
  ['Weiter →', 'Tiếp →'],
  ['← Zurück', '← Trước'],
  ['Richtig', 'Đúng'],
  ['Falsch', 'Sai'],
  // generic remaining — single words last so they don't eat compound phrases above
  ['Lernen starten', 'Bắt đầu học'],
  ['Koreanisch lernen', 'Học tiếng Hàn'],
  ['Silbenblöcke', 'Khối âm tiết'],
  ['Aussprache', 'Phát âm'],
  ['Startseite', 'Trang chủ'],
  ['Lernen', 'Học'],
];

function applyChrome(html) {
  let out = html;
  for (const [de, vi] of CHROME) {
    out = out.split(de).join(vi);
  }
  return out;
}

function applyPaths(html, depth) {
  let out = html;

  out = out.replace(/lang="de"/g, 'lang="vi"');
  out = out.replace(/lang-de\.js/g, 'lang-vi.js');

  if (depth === 1) {
    out = out
      .replace(/https:\/\/freekoreanschool\.com\/de\//g, 'https://freekoreanschool.com/vi/')
      .replace(/https:\/\/freekoreanschool\.com\/de\b/g, 'https://freekoreanschool.com/vi')
      .replace(/hreflang="de"/g, 'hreflang="vi"')
      .replace(/\.\.\/learn\/de\//g, '../learn/vi/')
      .replace(/\.\.\/culture\/de\//g, '../culture/vi/')
      .replace(/\.\.\/travel\/de\//g, '../travel/vi/')
      .replace(/\.\.\/news\/de\//g, '../news/vi/');
  } else if (depth === 2) {
    out = out
      .replace(/https:\/\/freekoreanschool\.com\/culture\/de\//g, 'https://freekoreanschool.com/culture/vi/')
      .replace(/https:\/\/freekoreanschool\.com\/culture\/de\b/g, 'https://freekoreanschool.com/culture/vi')
      .replace(/https:\/\/freekoreanschool\.com\/travel\/de\//g, 'https://freekoreanschool.com/travel/vi/')
      .replace(/https:\/\/freekoreanschool\.com\/travel\/de\b/g, 'https://freekoreanschool.com/travel/vi')
      .replace(/hreflang="de"/g, 'hreflang="vi"')
      .replace(/\.\.\/\.\.\/de\//g, '../../vi/')
      .replace(/\.\.\/\.\.\/learn\/de\//g, '../../learn/vi/')
      .replace(/\.\.\/\.\.\/culture\/de\//g, '../../culture/vi/')
      .replace(/\.\.\/\.\.\/travel\/de\//g, '../../travel/vi/')
      .replace(/\.\.\/\.\.\/news\/de\//g, '../../news/vi/');
  }

  return out;
}

// ── Generate vi/ root pages ─────────────────────────────────────
const VI_ROOT = path.join(ROOT, 'vi');
mkdir(VI_ROOT);

const rootPages = ['index.html', 'about.html', 'contact.html', 'privacy.html', 'quiz.html', 'search.html', 'terms.html'];

for (const page of rootPages) {
  const src = path.join(ROOT, 'de', page);
  if (!fs.existsSync(src)) { console.log(`⚠ skipped missing de/${page}`); continue; }

  let html = fs.readFileSync(src, 'utf8');
  html = applyChrome(html);
  html = applyPaths(html, 1);

  const dest = path.join(VI_ROOT, page);
  fs.writeFileSync(dest, html, 'utf8');
  console.log(`✓ vi/${page}`);
}

// ── Generate culture/vi/ pages ──────────────────────────────────
const CULTURE_DE = path.join(ROOT, 'culture', 'de');
const CULTURE_VI = path.join(ROOT, 'culture', 'vi');
mkdir(CULTURE_VI);

if (fs.existsSync(CULTURE_DE)) {
  const culturePages = fs.readdirSync(CULTURE_DE).filter(f => f.endsWith('.html'));
  for (const page of culturePages) {
    let html = fs.readFileSync(path.join(CULTURE_DE, page), 'utf8');
    html = applyChrome(html);
    html = applyPaths(html, 2);

    fs.writeFileSync(path.join(CULTURE_VI, page), html, 'utf8');
    console.log(`✓ culture/vi/${page}`);
  }
} else {
  console.log('⚠ culture/de/ not found, skipping culture/vi/');
}

// ── Generate travel/vi/ pages ───────────────────────────────────
const TRAVEL_DE = path.join(ROOT, 'travel', 'de');
const TRAVEL_VI = path.join(ROOT, 'travel', 'vi');
mkdir(TRAVEL_VI);

if (fs.existsSync(TRAVEL_DE)) {
  const travelPages = fs.readdirSync(TRAVEL_DE).filter(f => f.endsWith('.html'));
  for (const page of travelPages) {
    let html = fs.readFileSync(path.join(TRAVEL_DE, page), 'utf8');
    html = applyChrome(html);
    html = applyPaths(html, 2);

    fs.writeFileSync(path.join(TRAVEL_VI, page), html, 'utf8');
    console.log(`✓ travel/vi/${page}`);
  }
} else {
  console.log('⚠ travel/de/ not found, skipping travel/vi/');
}

// ── Generate news/vi/ pages ──────────────────────────────────────
const NEWS_DE = path.join(ROOT, 'de');
const NEWS_VI = path.join(ROOT, 'vi');

if (fs.existsSync(NEWS_DE)) {
  mkdir(NEWS_VI);
  const newsPages = fs.readdirSync(NEWS_DE).filter(f => f.endsWith('.html'));
  for (const page of newsPages) {
    let html = fs.readFileSync(path.join(NEWS_DE, page), 'utf8');
    html = applyChrome(html);
    html = applyPaths(html, 2);
    fs.writeFileSync(path.join(NEWS_VI, page), html, 'utf8');
    console.log(`✓ news/vi/${page}`);
  }
} else {
  console.log('⚠ news/de/ not found, skipping news/vi/');
}

console.log('\nAll vi/ pages generated.');
