#!/usr/bin/env node
// Generate th/, culture/th/, travel/th/, news/th/ pages from vi/ sources.
// Strategy: path/URL substitutions + chrome text translations (Vietnamese → Thai).
'use strict';

const fs   = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

function mkdir(p) { fs.mkdirSync(p, { recursive: true }); }

// ── Chrome text: Vietnamese → Thai ────────────────────────────────────────────
// Order matters: longer strings first to avoid partial replacements.
const CHROME = [
  // metadata titles / descriptions
  ['Học tiếng Hàn miễn phí', 'เรียนภาษาเกาหลีฟรี'],
  ['Học tiếng Hàn miễn phí — bài học, K-văn hóa, du lịch và tin tức cho mọi trình độ.',
   'เรียนภาษาเกาหลีฟรี — บทเรียน K-วัฒนธรรม การท่องเที่ยว และข่าวสำหรับทุกระดับ'],
  ['Về chúng tôi | 한국어 학교 — Korean School', 'เกี่ยวกับเรา | 한국어 학교 — Korean School'],
  ['Về Korean School — nền tảng học tiếng Hàn và văn hóa miễn phí. Không cần đăng ký, không cần đăng nhập, tiến độ lưu cục bộ.',
   'เกี่ยวกับ Korean School — แพลตฟอร์มเรียนภาษาเกาหลีและวัฒนธรรมฟรี ไม่ต้องสมัคร ไม่ต้องเข้าสู่ระบบ บันทึกความคืบหน้าในเครื่อง'],
  ['Liên hệ | 한국어 학교 — Korean School', 'ติดต่อ | 한국어 학교 — Korean School'],
  ['Liên hệ Korean School — viết cho chúng tôi về phản hồi, báo lỗi hoặc yêu cầu hợp tác.',
   'ติดต่อ Korean School — เขียนถึงเราเกี่ยวกับความคิดเห็น รายงานข้อผิดพลาด หรือข้อเสนอความร่วมมือ'],
  ['Chính sách bảo mật | 한국어 학교 — Korean School', 'นโยบายความเป็นส่วนตัว | 한국어 학교 — Korean School'],
  ['Chính sách bảo mật của Korean School. Không thu thập dữ liệu cá nhân, không yêu cầu đăng nhập. Tiến độ chỉ lưu trong trình duyệt của bạn.',
   'นโยบายความเป็นส่วนตัวของ Korean School ไม่เก็บข้อมูลส่วนบุคคล ไม่ต้องเข้าสู่ระบบ บันทึกความคืบหน้าในเบราเซอร์ของคุณเท่านั้น'],
  ['Điều khoản sử dụng | 한국어 학교 — Korean School', 'ข้อกำหนดการใช้งาน | 한국어 학교 — Korean School'],
  ['Kiểm tra tiếng Hàn | 한국어 학교 — Korean School', 'แบบทดสอบภาษาเกาหลี | 한국어 학교 — Korean School'],
  ['Tìm từ vựng, bài học và hướng dẫn văn hóa Hàn Quốc | 한국어 학교', 'ค้นหาคำศัพท์ บทเรียน และคู่มือวัฒนธรรมเกาหลี | 한국어 학교'],
  // nav links
  ['<span class="nav-icon">📚</span> Học', '<span class="nav-icon">📚</span> เรียนรู้'],
  ['<span class="nav-icon">🎵</span> K-Văn hóa', '<span class="nav-icon">🎵</span> K-วัฒนธรรม'],
  ['<span class="nav-icon">🗺️</span> Du lịch', '<span class="nav-icon">🗺️</span> ท่องเที่ยว'],
  ['<span class="nav-icon">📰</span> Tin tức', '<span class="nav-icon">📰</span> ข่าว'],
  ['<span class="nav-icon">📝</span> Kiểm tra', '<span class="nav-icon">📝</span> แบบทดสอบ'],
  // header actions
  ['placeholder="Tìm bài học, từ vựng…"', 'placeholder="ค้นหาบทเรียน คำศัพท์…"'],
  ['placeholder="Tìm kiếm…"', 'placeholder="ค้นหา…"'],
  ['placeholder="Tìm kiếm..."', 'placeholder="ค้นหา..."'],
  ['aria-label="Đổi giao diện"', 'aria-label="เปลี่ยนธีม"'],
  ['aria-label="Đổi ngôn ngữ"', 'aria-label="เปลี่ยนภาษา"'],
  ['aria-label="Mở menu"', 'aria-label="เปิดเมนู"'],
  ['aria-label="Menu"', 'aria-label="เมนู"'],
  ['aria-label="Menu di động"', 'aria-label="เมนูมือถือ"'],
  ['>🇻🇳 VI<', '>🇹🇭 TH<'],
  // footer
  ['Học · 학습', 'เรียนรู้ · 학습'],
  ['Bảng chữ cái Hangul', 'ตัวอักษรฮันกึล'],
  ['Ngữ pháp', 'ไวยากรณ์'],
  ['Từ vựng', 'คำศัพท์'],
  ['K-Văn hóa · 문화', 'K-วัฒนธรรม · 문화'],
  ['Công ty · 회사', 'บริษัท · 회사'],
  ['Nền tảng học tiếng Hàn miễn phí — kết hợp học ngôn ngữ với K-văn hóa, hướng dẫn du lịch và thực hành thực tế. Dành cho mọi trình độ trên toàn thế giới.',
   'แพลตฟอร์มเรียนภาษาเกาหลีฟรี — ผสมผสานการเรียนภาษากับ K-วัฒนธรรม คู่มือท่องเที่ยว และการฝึกจริง สำหรับผู้เรียนทุกระดับทั่วโลก'],
  ['Làm với ❤️ cho người học tiếng Hàn trên toàn thế giới.', 'สร้างด้วย ❤️ สำหรับผู้เรียนภาษาเกาหลีทั่วโลก'],
  ['Chúc bạn học vui!', 'สนุกกับการเรียน!'],
  // sidebar (culture pages)
  ['DANH MỤC · 카테고리', 'หมวดหมู่ · 카테고리'],
  // footer link labels
  ['Về chúng tôi', 'เกี่ยวกับเรา'],
  ['Liên hệ', 'ติดต่อ'],
  ['Chính sách bảo mật', 'นโยบายความเป็นส่วนตัว'],
  ['Điều khoản sử dụng', 'ข้อกำหนดการใช้งาน'],
  ['K-Văn hóa', 'K-วัฒนธรรม'],
  ['Du lịch', 'การท่องเที่ยว'],
  ['Tin tức Hàn Quốc', 'ข่าวเกาหลี'],
  ['Khám phá', 'สำรวจ'],
  ['Công ty', 'บริษัท'],
  ['Hướng dẫn du lịch', 'คู่มือการท่องเที่ยว'],
  // hero section
  ['🇰🇷 · Miễn phí · Cho mọi trình độ', '🇰🇷 · ฟรี · สำหรับทุกระดับ'],
  ['Khám phá vẻ đẹp của Hàn Quốc qua ngôn ngữ, văn hóa, K-pop, du lịch và ẩm thực — với các bài học miễn phí dành cho người học trên toàn thế giới.',
   'สัมผัสความสวยงามของเกาหลีผ่านภาษา วัฒนธรรม K-Pop การท่องเที่ยว และอาหาร — ด้วยบทเรียนฟรีสำหรับผู้เรียนทั่วโลก'],
  ['Bắt đầu học', 'เริ่มเรียน'],
  ['Khám phá K-Văn hóa', 'สำรวจ K-วัฒนธรรม'],
  // hero stats
  ['Từ vựng', 'คำศัพท์'],
  ['Bài học', 'บทเรียน'],
  ['Học viên đang học', 'ผู้เรียนที่กำลังเรียน'],
  // features section
  ['TÍNH NĂNG', 'ฟีเจอร์'],
  ['Tất cả những gì bạn cần để học tiếng Hàn', 'ทุกสิ่งที่คุณต้องการเพื่อเรียนภาษาเกาหลี'],
  ['Bắt đầu với 한글', 'เริ่มต้นกับ 한글'],
  ['Học bảng chữ cái tiếng Hàn chỉ trong 2 giờ. 한글 (Hangul) rất có hệ thống — một khi biết 24 chữ cái cơ bản, bạn có thể đọc bất cứ thứ gì.',
   'เรียนตัวอักษรเกาหลีในเพียง 2 ชั่วโมง 한글 (Hangul) มีระบบมาก — เมื่อรู้ตัวอักษรพื้นฐาน 24 ตัว คุณสามารถอ่านอะไรก็ได้'],
  ['Học Hangul ngay →', 'เรียนฮันกึลเลย →'],
  ['Học qua lời K-Pop', 'เรียนผ่านเนื้อเพลง K-Pop'],
  ['Học tiếng Hàn tự nhiên qua các bài hát yêu thích. Phân tích từng dòng kèm từ vựng, ghi chú ngữ pháp và hướng dẫn phát âm.',
   'เรียนภาษาเกาหลีอย่างเป็นธรรมชาติผ่านเพลงโปรด วิเคราะห์ทีละบรรทัดพร้อมคำศัพท์ โน้ตไวยากรณ์ และคู่มือการออกเสียง'],
  ['Đọc →', 'อ่าน →'],
  ['Từ vựng K-Drama', 'คำศัพท์ K-Drama'],
  ['Học tiếng Hàn hàng ngày từ các bộ phim yêu thích. Danh sách từ vựng theo ngữ cảnh được sắp xếp theo phim, thể loại và trình độ.',
   'เรียนภาษาเกาหลีในชีวิตประจำวันจากซีรีส์โปรด รายการคำศัพท์ตามบริบทเรียงตามเรื่อง แนว และระดับ'],
  ['Từ điển ẩm thực Hàn Quốc', 'พจนานุกรมอาหารเกาหลี'],
  ['Từ 김치 (kimchi) đến 삼겹살 (samgyeopsal) — khám phá từ vựng phong phú về ẩm thực Hàn Quốc kèm phát âm và bối cảnh văn hóa.',
   'จาก 김치 (กิมจิ) ถึง 삼겹살 (ซัมกยอปซัล) — สำรวจคำศัพท์อาหารเกาหลีมากมายพร้อมการออกเสียงและบริบทวัฒนธรรม'],
  ['Từ vựng hàng ngày · 오늘의 단어', 'คำศัพท์ประจำวัน · 오늘의 단어'],
  ['Từ của ngày', 'คำศัพท์ประจำวัน'],
  ['Xin chào / Chào buổi sáng', 'สวัสดี / อรุณสวัสดิ์'],
  ['Nghe', 'ฟัง'],
  ['Thêm từ', 'คำเพิ่มเติม'],
  // learning paths
  ['Lộ trình học · 학습 경로', 'เส้นทางการเรียน · 학습 경로'],
  ['Chọn lộ trình học của bạn', 'เลือกเส้นทางการเรียนของคุณ'],
  ['Dù bạn mới bắt đầu hay muốn đạt trình độ lưu loát, chúng tôi có lộ trình rõ ràng để đưa bạn từng bước.',
   'ไม่ว่าคุณจะเพิ่งเริ่มต้นหรือต้องการความคล่องแคล่ว เรามีแผนการเรียนที่ชัดเจนพาคุณก้าวทีละขั้น'],
  ['Bắt đầu lộ trình người mới →', 'เริ่มเส้นทางผู้เริ่มต้น →'],
  ['Bắt đầu lộ trình trung cấp →', 'เริ่มเส้นทางระดับกลาง →'],
  ['Bắt đầu lộ trình nâng cao →', 'เริ่มเส้นทางระดับสูง →'],
  ['Người mới', 'ผู้เริ่มต้น'],
  ['✓ Bảng chữ cái Hangul', '✓ ตัวอักษรฮันกึล'],
  ['✓ Nguyên âm & Phụ âm cơ bản', '✓ สระและพยัญชนะพื้นฐาน'],
  ['✓ Khối âm tiết', '✓ บล็อกพยางค์'],
  ['✓ Từ vựng cần thiết', '✓ คำศัพท์พื้นฐาน'],
  ['✓ Lời chào cơ bản', '✓ คำทักทายพื้นฐาน'],
  ['Trung cấp', 'ระดับกลาง'],
  ['✓ Ngữ pháp tiếng Hàn (SOV)', '✓ ไวยากรณ์ภาษาเกาหลี (SOV)'],
  ['✓ Trợ từ & Chia động từ', '✓ คำช่วยและการผันกริยา'],
  ['✓ Cấp độ nói', '✓ ระดับความสุภาพ'],
  ['✓ 300+ từ vựng', '✓ 300+ คำศัพท์'],
  ['✓ Hội thoại thực tế', '✓ บทสนทนาจริง'],
  ['Nâng cao', 'ระดับสูง'],
  ['✓ Tiếng Hàn thương mại', '✓ ภาษาเกาหลีธุรกิจ'],
  ['✓ Tiếng Hàn cổ điển', '✓ ภาษาเกาหลีโบราณ'],
  ['✓ Viết luận', '✓ การเขียนเรียงความ'],
  ['✓ Ôn thi TOPIK', '✓ เตรียมสอบ TOPIK'],
  ['✓ Thành ngữ', '✓ สำนวน'],
  // K-culture section
  ['K-VĂN HÓA · 한국 문화', 'K-วัฒนธรรม · 한국 문화'],
  ['Trải nghiệm Hàn Quốc vượt ngôn ngữ', 'สัมผัสเกาหลีเกินกว่าภาษา'],
  ['Ngôn ngữ là cánh cổng — hãy đắm chìm vào văn hóa đại chúng, ẩm thực và làm đẹp Hàn Quốc để thúc đẩy việc học.',
   'ภาษาคือประตู — จมตัวเองในวัฒนธรรมป๊อป อาหาร และความงามของเกาหลีเพื่อเร่งการเรียนรู้'],
  ['Câu tiếng Hàn của ngôi sao K-Pop bạn cần biết', 'ประโยคภาษาเกาหลีจากดาว K-Pop ที่คุณต้องรู้'],
  ['Từ BTS đến BLACKPINK — những từ và cụm từ tiếng Hàn phổ biến nhất của nghệ sĩ K-Pop yêu thích, kèm hướng dẫn phát âm.',
   'จาก BTS ถึง BLACKPINK — คำและสำนวนภาษาเกาหลีที่พบบ่อยที่สุดจากศิลปิน K-Pop โปรด พร้อมคู่มือการออกเสียง'],
  ['Nắm vững cảm xúc tiếng Hàn qua K-Drama', 'เชี่ยวชาญอารมณ์ภาษาเกาหลีผ่าน K-Drama'],
  ['K-Drama chứa đầy từ vựng cảm xúc. Học cách nhân vật bày tỏ niềm vui, nỗi buồn, tức giận và tình yêu bằng tiếng Hàn chính xác.',
   'K-Drama เต็มไปด้วยคำศัพท์อารมณ์ เรียนวิธีที่ตัวละครแสดงความสุข ความเศร้า ความโกรธ และความรักเป็นภาษาเกาหลีที่ถูกต้อง'],
  ['Gọi món như người địa phương: Tiếng Hàn tại nhà hàng', 'สั่งอาหารแบบคนท้องถิ่น: ภาษาเกาหลีในร้านอาหาร'],
  ['Cụm từ cần thiết để gọi món, hỏi hóa đơn và duyệt thực đơn nhà hàng Hàn Quốc một cách tự tin.',
   'สำนวนจำเป็นสำหรับการสั่งอาหาร ขอบิล และอ่านเมนูร้านอาหารเกาหลีอย่างมั่นใจ'],
  ['Từ vựng làm đẹp & chăm sóc da bằng tiếng Hàn', 'คำศัพท์ความงามและดูแลผิวเป็นภาษาเกาหลี'],
  ['Khám phá thế giới K-Beauty với từ vựng cần thiết về quy trình chăm sóc da, mỹ phẩm và xu hướng làm đẹp Hàn Quốc.',
   'สำรวจโลก K-Beauty ด้วยคำศัพท์จำเป็นเกี่ยวกับขั้นตอนดูแลผิว เครื่องสำอาง และเทรนด์ความงามเกาหลี'],
  ['Xem toàn bộ nội dung K-Văn hóa →', 'ดูเนื้อหา K-วัฒนธรรมทั้งหมด →'],
  // travel section
  ['DU LỊCH · 여행', 'ท่องเที่ยว · 여행'],
  ['Khám phá Hàn Quốc', 'สำรวจเกาหลี'],
  ['Học ngôn ngữ của từng điểm đến. Từ Seoul nhộn nhịp đến bờ biển yên bình của Jeju — hướng dẫn du lịch của bạn đã sẵn sàง.',
   'เรียนภาษาของแต่ละจุดหมาย จากโซลที่คึกคักถึงชายหาดสงบของเจจู — คู่มือท่องเที่ยวของคุณพร้อมแล้ว'],
  ['Seoul Skyline Sông Hàn', 'สกายไลน์โซลแม่น้ำฮัน'],
  ['Thủ đô rực rỡ của Hàn Quốc — từ cung điện cổ Gyeongbokgung đến những con phố neon ở Gangnam và Hongdae.',
   'เมืองหลวงที่สง่างามของเกาหลี — จากพระราชวังโบราณ Gyeongbokgung ถึงถนนนีออนใน Gangnam และ Hongdae'],
  ['Khám phá →', 'สำรวจ →'],
  ['Bãi biển Haeundae Busan', 'หาด Haeundae ปูซาน'],
  ['Thành phố cảng sầm uất của Hàn Quốc với bãi biển tuyệt đẹp, chợ hải sản tươi và phương ngữ độc đáo đáng khám phá.',
   'เมืองท่าที่มีชีวิตชีวาของเกาหลีพร้อมชายหาดสวยงาม ตลาดอาหารทะเลสด และสำเนียงท้องถิ่นที่น่าสนใจ'],
  ['Hallasan Đảo Jeju', 'ฮัลลาซาน เกาะเจจู'],
  ['Hòn đảo thiên đường của Hàn Quốc — địa hình núi lửa, bãi biển trong xanh, vườn quýt và văn hóa lặn biển haenyeo nổi tiếng.',
   'เกาะสวรรค์ของเกาหลี — ภูมิประเทศภูเขาไฟ ชายหาดใสสะอาด สวนส้มแมนดาริน และวัฒนธรรมดำน้ำ haenyeo อันโด่งดัง'],
  ['Xem hướng dẫn du lịch đầy đủ →', 'ดูคู่มือการท่องเที่ยวฉบับเต็ม →'],
  // quiz section
  ['LUYỆN TẬP · 연습', 'ฝึกฝน · 연습'],
  ['Kiểm tra tiếng Hàn của bạn', 'ทดสอบภาษาเกาหลีของคุณ'],
  ['10 cấp độ · Trắc nghiệm · Hangul, Ngữ pháp & Từ vựng', '10 ระดับ · ตัวเลือก · ฮันกึล ไวยากรณ์ และคำศัพท์'],
  ['Chọn cấp độ', 'เลือกระดับ'],
  // about page
  ['🇰🇷 · Về chúng tôi · 소개', '🇰🇷 · เกี่ยวกับเรา · 소개'],
  ['Về <span class="grad-text">Korean School</span>', 'เกี่ยวกับ <span class="grad-text">Korean School</span>'],
  ['Một nền tảng học tiếng Hàn và văn hóa miễn phí — mở cho tất cả mọi người, ở khắp nơi, mọi lúc.',
   'แพลตฟอร์มเรียนภาษาเกาหลีและวัฒนธรรมฟรี — เปิดสำหรับทุกคน ทุกที่ ทุกเวลา'],
  ['PHƯƠNG CHÂM · 슬로건', 'คำขวัญ · 슬로건'],
  ['"Để thực sự học một ngôn ngữ, bạn phải hiểu văn hóa của nó"',
   '"เพื่อเรียนรู้ภาษาอย่างแท้จริง คุณต้องเข้าใจวัฒนธรรมของมัน"'],
  ['Không thể học tiếng Hàn một cách cô lập. Nó gắn liền với hội thoại K-Drama, lời K-Pop, tên món ăn, nghi thức Nho giáo và cuộc sống đô thị. Chúng tôi dạy ngôn ngữ cùng với văn hóa mang lại ý nghĩa cho nó.',
   'ไม่สามารถเรียนภาษาเกาหลีอย่างโดดเดี่ยวได้ มันเกี่ยวพันกับบทสนทนา K-Drama เนื้อเพลง K-Pop ชื่ออาหาร มารยาทขงจื้อ และชีวิตเมือง เราสอนภาษาพร้อมกับวัฒนธรรมที่ให้ความหมายแก่มัน'],
  ['ĐIỂM NỔI BẬT · 특징', 'จุดเด่น · 특징'],
  ['Miễn phí mãi mãi', 'ฟรีตลอดไป'],
  ['Mỗi bài học, kiểm tra và hướng dẫn đều hoàn toàn miễn phí — không đăng ký, không thanh toán.',
   'ทุกบทเรียน แบบทดสอบ และคู่มือฟรีทั้งหมด — ไม่ต้องสมัคร ไม่ต้องชำระเงิน'],
  ['Không cần đăng ký', 'ไม่ต้องสมัคร'],
  ['Không cần tài khoản, email hay mật khẩu. Mở trang và bắt đầu học ngay.',
   'ไม่ต้องมีบัญชี อีเมล หรือรหัสผ่าน เปิดหน้าเว็บแล้วเริ่มเรียนได้เลย'],
  ['Tiến độ riêng tư', 'ความคืบหน้าส่วนตัว'],
  ['Tiến độ của bạn được lưu trong bộ nhớ cục bộ của trình duyệt — riêng tư, ngoại tuyến và không bao giờ chia sẻ.',
   'ความคืบหน้าของคุณบันทึกในเบราเซอร์ — ส่วนตัว ออฟไลน์ และไม่เคยแชร์'],
  ['Văn hóa trước tiên', 'วัฒนธรรมก่อน'],
  ['Ngôn ngữ trong bối cảnh văn hóa thực tế — không chỉ câu sách giáo khoa, mà còn K-Pop, ẩm thực, du lịch và tin tức.',
   'ภาษาในบริบทวัฒนธรรมจริง — ไม่ใช่แค่ประโยคในตำรา แต่รวมถึง K-Pop อาหาร การท่องเที่ยว และข่าว'],
  ['NỘI DUNG · 콘텐츠', 'เนื้อหา · 콘텐츠'],
  ['Hangul, ngữ pháp, từ vựng, phát âm, cấp độ nói, hội thoại và nhiều hơn.',
   'ฮันกึล ไวยากรณ์ คำศัพท์ การออกเสียง ระดับความสุภาพ บทสนทนา และอื่นๆ'],
  ['K-Pop, K-Drama, ẩm thực Hàn Quốc, K-Beauty, truyền thống, gaming, thể thao và thời trang.',
   'K-Pop K-Drama อาหารเกาหลี K-Beauty ประเพณี เกมส์ กีฬา และแฟชั่น'],
  ['Hướng dẫn thành phố, cụm từ du lịch và lịch trình cho Seoul, Busan, Jeju và nhiều hơn.',
   'คู่มือเมือง สำนวนการท่องเที่ยว และแผนการเดินทางสำหรับโซล ปูซาน เจจู และอื่นๆ'],
  ['Tin tức song ngữ từ Hàn Quốc — từ người mới đến nâng cao — để học tiếng Hàn tự nhiên mỗi ngày.',
   'ข่าวสองภาษาจากเกาหลี — จากผู้เริ่มต้นถึงระดับสูง — เพื่อเรียนภาษาเกาหลีอย่างเป็นธรรมชาติทุกวัน'],
  ['Kiểm tra tương tác về Hangul, từ vựng và ngữ pháp với phản hồi tức thì.',
   'แบบทดสอบโต้ตอบเกี่ยวกับฮันกึล คำศัพท์ และไวยากรณ์พร้อมคำติชมทันที'],
  ['Được tạo với Claude Code', 'สร้างด้วย Claude Code'],
  ['📚 Bắt đầu học tiếng Hàn →', '📚 เริ่มเรียนภาษาเกาหลี →'],
  // contact page
  ['🇰🇷 · Liên hệ · 연락', '🇰🇷 · ติดต่อ · 연락'],
  ['Viết cho chúng tôi', 'เขียนถึงเรา'],
  ['Liên hệ với đội ngũ Korean School.', 'ติดต่อทีมงาน Korean School'],
  ['Phản hồi & Đề xuất', 'ความคิดเห็นและข้อเสนอแนะ'],
  ['Báo lỗi', 'รายงานข้อผิดพลาด'],
  ['Yêu cầu hợp tác', 'ข้อเสนอความร่วมมือ'],
  ['Gửi tin nhắn', 'ส่งข้อความ'],
  ['Tên của bạn', 'ชื่อของคุณ'],
  ['Địa chỉ email của bạn', 'ที่อยู่อีเมลของคุณ'],
  ['Chủ đề', 'หัวข้อ'],
  ['Tin nhắn', 'ข้อความ'],
  ['Gửi', 'ส่ง'],
  // privacy page
  ['🇰🇷 · Bảo mật · 개인정보', '🇰🇷 · ความเป็นส่วนตัว · 개인정보'],
  // terms page
  ['🇰🇷 · Điều khoản · 이용약관', '🇰🇷 · ข้อกำหนด · 이용약관'],
  // quiz page
  ['🇰🇷 · Kiểm tra · 퀴즈', '🇰🇷 · แบบทดสอบ · 퀴즈'],
  ['Kiểm tra tiếng Hàn', 'แบบทดสอบภาษาเกาหลี'],
  ['Chọn cấp độ', 'เลือกระดับ'],
  ['Tiếp →', 'ถัดไป →'],
  ['← Trước', '← ก่อนหน้า'],
  ['Đúng', 'ถูก'],
  ['Sai', 'ผิด'],
  // generic remaining — single words last
  ['Bắt đầu học', 'เริ่มเรียน'],
  ['Học tiếng Hàn', 'เรียนภาษาเกาหลี'],
  ['Khối âm tiết', 'บล็อกพยางค์'],
  ['Phát âm', 'การออกเสียง'],
  ['Trang chủ', 'หน้าแรก'],
  ['Học', 'เรียนรู้'],
];

function applyChrome(html) {
  let out = html;
  for (const [vi, th] of CHROME) {
    out = out.split(vi).join(th);
  }
  return out;
}

function applyPaths(html, depth) {
  let out = html;

  out = out.replace(/lang="vi"/g, 'lang="th"');
  out = out.replace(/lang-vi\.js/g, 'lang-th.js');

  if (depth === 1) {
    out = out
      .replace(/https:\/\/freekoreanschool\.com\/vi\//g, 'https://freekoreanschool.com/th/')
      .replace(/https:\/\/freekoreanschool\.com\/vi\b/g, 'https://freekoreanschool.com/th')
      .replace(/hreflang="vi"/g, 'hreflang="th"')
      .replace(/\.\.\/learn\/vi\//g, '../learn/th/')
      .replace(/\.\.\/culture\/vi\//g, '../culture/th/')
      .replace(/\.\.\/travel\/vi\//g, '../travel/th/')
      .replace(/\.\.\/news\/vi\//g, '../news/th/');
  } else if (depth === 2) {
    out = out
      .replace(/https:\/\/freekoreanschool\.com\/culture\/vi\//g, 'https://freekoreanschool.com/culture/th/')
      .replace(/https:\/\/freekoreanschool\.com\/travel\/vi\//g, 'https://freekoreanschool.com/travel/th/')
      .replace(/hreflang="vi"/g, 'hreflang="th"')
      .replace(/\.\.\/\.\.\/vi\//g, '../../th/')
      .replace(/\.\.\/\.\.\/learn\/vi\//g, '../../learn/th/')
      .replace(/\.\.\/\.\.\/culture\/vi\//g, '../../culture/th/')
      .replace(/\.\.\/\.\.\/travel\/vi\//g, '../../travel/th/')
      .replace(/\.\.\/\.\.\/news\/vi\//g, '../../news/th/');
  }

  return out;
}

// ── Generate th/ root pages ─────────────────────────────────────
const TH_ROOT = path.join(ROOT, 'th');
mkdir(TH_ROOT);

const rootPages = ['index.html', 'about.html', 'contact.html', 'privacy.html', 'quiz.html', 'search.html', 'terms.html'];

for (const page of rootPages) {
  const src = path.join(ROOT, 'vi', page);
  if (!fs.existsSync(src)) { console.log(`⚠ skipped missing vi/${page}`); continue; }

  let html = fs.readFileSync(src, 'utf8');
  html = applyChrome(html);
  html = applyPaths(html, 1);

  const dest = path.join(TH_ROOT, page);
  fs.writeFileSync(dest, html, 'utf8');
  console.log(`✓ th/${page}`);
}

// ── Generate culture/th/ pages ──────────────────────────────────
const CULTURE_VI = path.join(ROOT, 'culture', 'vi');
const CULTURE_TH = path.join(ROOT, 'culture', 'th');
mkdir(CULTURE_TH);

if (fs.existsSync(CULTURE_VI)) {
  const culturePages = fs.readdirSync(CULTURE_VI).filter(f => f.endsWith('.html'));
  for (const page of culturePages) {
    let html = fs.readFileSync(path.join(CULTURE_VI, page), 'utf8');
    html = applyChrome(html);
    html = applyPaths(html, 2);

    fs.writeFileSync(path.join(CULTURE_TH, page), html, 'utf8');
    console.log(`✓ culture/th/${page}`);
  }
} else {
  console.log('⚠ culture/vi/ not found, skipping culture/th/');
}

// ── Generate travel/th/ pages ───────────────────────────────────
const TRAVEL_VI = path.join(ROOT, 'travel', 'vi');
const TRAVEL_TH = path.join(ROOT, 'travel', 'th');
mkdir(TRAVEL_TH);

if (fs.existsSync(TRAVEL_VI)) {
  const travelPages = fs.readdirSync(TRAVEL_VI).filter(f => f.endsWith('.html'));
  for (const page of travelPages) {
    let html = fs.readFileSync(path.join(TRAVEL_VI, page), 'utf8');
    html = applyChrome(html);
    html = applyPaths(html, 2);

    fs.writeFileSync(path.join(TRAVEL_TH, page), html, 'utf8');
    console.log(`✓ travel/th/${page}`);
  }
} else {
  console.log('⚠ travel/vi/ not found, skipping travel/th/');
}

// ── Generate news/th/ pages ──────────────────────────────────────
const NEWS_VI = path.join(ROOT, 'news', 'vi');
const NEWS_TH = path.join(ROOT, 'news', 'th');

if (fs.existsSync(NEWS_VI)) {
  mkdir(NEWS_TH);
  const newsPages = fs.readdirSync(NEWS_VI).filter(f => f.endsWith('.html'));
  for (const page of newsPages) {
    let html = fs.readFileSync(path.join(NEWS_VI, page), 'utf8');
    html = applyChrome(html);
    html = applyPaths(html, 2);
    fs.writeFileSync(path.join(NEWS_TH, page), html, 'utf8');
    console.log(`✓ news/th/${page}`);
  }
} else {
  console.log('⚠ news/vi/ not found, skipping news/th/');
}

console.log('\nAll th/ pages generated.');
