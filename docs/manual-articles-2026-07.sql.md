# Manual news backfill — 2026-06-10 … 2026-07-08 (28 articles + 29 daily summaries)

Paste each ```sql block into the Supabase SQL editor separately.
Batch 1 = articles 1–7, Batch 2 = 8–14, Batch 3 = 15–21, Batch 4 = 22–28 + daily_summaries.
Every text value is dollar-quoted with a per-article tag ($a1$…$a1$, $s1$…$s1$ for summaries).

## Batch 1 — articles 1–7

```sql
-- Article 1 — 2026-06-10 society beginner — PIPC fines Coupang over 2025 data breach
INSERT INTO articles (topic_id, slug, title_en, title_ko, title_ja, title_zh_tw, title_es, title_de, title_fr, title_vi, title_th, title_id, summary_en, summary_ko, summary_ja, summary_zh_tw, summary_es, summary_de, summary_fr, summary_vi, summary_th, summary_id, content_en, content_ko, content_ja, content_zh_tw, content_es, content_de, content_fr, content_vi, content_th, content_id, seo_description, seo_keywords, level, reading_time_en, reading_time_ko, reading_time_ja, vocabulary, status, ai_generated, view_count, published_at, created_at, updated_at) VALUES (
(SELECT id FROM topics WHERE slug = 'society'),
'society-2026-06-10',
$a1$South Korea Fines Coupang $400 Million Over 2025 Data Breach$a1$,
$a1$쿠팡, 개인정보 유출로 6246억 원 과징금$a1$,
$a1$クーパン、情報流出で6246億ウォンの制裁金$a1$,
$a1$韓國酷澎因個資外洩遭罰6246億韓元$a1$,
$a1$Corea multa a Coupang con 400 millones por filtración de datos$a1$,
$a1$Südkorea verhängt 400-Millionen-Strafe gegen Coupang$a1$,
$a1$La Corée inflige 400 M$ d'amende à Coupang pour fuite de données$a1$,
$a1$Hàn Quốc phạt Coupang 400 triệu USD vì lộ dữ liệu$a1$,
$a1$เกาหลีปรับคูปังกรณีข้อมูลผู้ใช้รั่วไหล$a1$,
$a1$Korea Denda Coupang atas Kebocoran Data 2025$a1$,
$a1$South Korea's data-protection regulator fined Coupang 624.6 billion won over a 2025 breach that exposed 37.5 million users. It is one of the largest privacy fines in Korean history.$a1$,
$a1$한국 개인정보보호위원회가 2025년 개인정보 유출로 쿠팡에 6246억 원의 과징금을 부과했다. 약 3750만 명의 정보가 새어 나간 사건으로, 한국 역사상 가장 큰 과징금 중 하나다.$a1$,
$a1$韓国の個人情報保護委員会が、2025年の情報流出でクーパンに6246億ウォンの制裁金を科した。約3750万人の情報が漏れた事件で、韓国史上最大級の金額だ。$a1$,
$a1$韓國個資保護委員會因2025年個資外洩，對酷澎開罰6246億韓元。這起事件影響約3750萬名使用者，是韓國史上金額最高的個資罰款之一。$a1$,
$a1$El regulador de datos de Corea del Sur multó a Coupang con 624.600 millones de wones por una filtración de 2025 que afectó a 37,5 millones de usuarios. Es una de las mayores multas de privacidad del país.$a1$,
$a1$Südkoreas Datenschutzbehörde verhängte gegen Coupang wegen eines Datenlecks von 2025 eine Strafe von 624,6 Milliarden Won. Rund 37,5 Millionen Nutzer waren betroffen — eine der höchsten Strafen des Landes.$a1$,
$a1$Le régulateur coréen des données a infligé 624,6 milliards de wons d'amende à Coupang pour une fuite de 2025 touchant 37,5 millions d'utilisateurs. C'est l'une des plus lourdes amendes de confidentialité du pays.$a1$,
$a1$Cơ quan bảo vệ dữ liệu Hàn Quốc phạt Coupang 624,6 tỷ won vì vụ rò rỉ năm 2025 ảnh hưởng 37,5 triệu người dùng. Đây là một trong những khoản phạt quyền riêng tư lớn nhất nước này.$a1$,
$a1$หน่วยงานคุ้มครองข้อมูลของเกาหลีใต้ปรับคูปัง 624,600 ล้านวอน จากกรณีข้อมูลรั่วไหลปี 2025 ที่กระทบผู้ใช้ 37.5 ล้านคน นับเป็นค่าปรับด้านความเป็นส่วนตัวที่สูงที่สุดครั้งหนึ่งของประเทศ$a1$,
$a1$Regulator data Korea Selatan mendenda Coupang 624,6 miliar won atas kebocoran 2025 yang menimpa 37,5 juta pengguna. Ini salah satu denda privasi terbesar di negara itu.$a1$,
$a1$South Korea's Personal Information Protection Commission (PIPC) fined Coupang 624.6 billion won, about 400 million US dollars, on June 10, 2026. The fine is punishment for a 2025 data breach that exposed the personal information of about 37.5 million users. Coupang is the largest online shopping company in South Korea.

The breach leaked customer names, phone numbers, and order details. The PIPC said Coupang did not protect its customers' data well enough. It is one of the biggest privacy fines in Korean history.

Coupang apologized and promised to make its security stronger. Millions of Koreans use Coupang every day, so many people are now worried about how companies keep their personal data safe.$a1$,
$a1$한국 개인정보보호위원회(개인정보위)가 2026년 6월 10일 쿠팡에 6246억 원, 약 4억 달러의 과징금을 부과했다. 2025년에 일어난 개인정보 유출로 약 3750만 명의 정보가 새어 나갔기 때문이다. 쿠팡은 한국에서 가장 큰 온라인 쇼핑 회사다.

이번 유출로 고객의 이름, 전화번호, 주문 내역이 빠져나갔다. 개인정보위는 쿠팡이 고객 정보를 제대로 보호하지 못했다고 밝혔다. 이는 한국 역사상 가장 큰 개인정보 과징금 중 하나다.

쿠팡은 사과하고 보안을 더 강화하겠다고 약속했다. 수많은 한국인이 매일 쿠팡을 이용하기 때문에, 많은 사람들이 회사가 개인정보를 어떻게 지키는지 걱정하게 되었다.$a1$,
$a1$韓国の個人情報保護委員会（PIPC）は2026年6月10日、クーパンに6246億ウォン（約4億ドル）の制裁金を科した。2025年に起きた情報流出で約3750万人の個人情報が漏れたためだ。クーパンは韓国最大のオンラインショッピング企業である。

今回の流出では、顧客の名前や電話番号、注文履歴が漏れた。委員会はクーパンが顧客の情報を十分に守らなかったと指摘した。韓国史上最大級の個人情報関連の制裁金の一つだ。

クーパンは謝罪し、セキュリティを強化すると約束した。多くの韓国人が毎日クーパンを利用しているため、企業が個人情報をどう守るのか心配する声が広がっている。$a1$,
$a1$韓國個人資料保護委員會（PIPC）於2026年6月10日對酷澎（Coupang）開罰6246億韓元，約4億美元。這是因為2025年發生的個資外洩事件，導致約3750萬名使用者的個人資料外流。酷澎是韓國最大的網路購物公司。

這次外洩讓顧客的姓名、電話號碼和訂單紀錄都被洩露。委員會表示，酷澎未能妥善保護顧客資料。這是韓國史上金額最高的個資罰款之一。

酷澎已道歉，並承諾加強資安。由於數百萬韓國人每天都使用酷澎，許多人開始擔心企業如何保護自己的個人資料。$a1$,
$a1$La Comisión de Protección de Información Personal de Corea del Sur (PIPC) multó a Coupang con 624.600 millones de wones, unos 400 millones de dólares, el 10 de junio de 2026. La multa castiga una filtración de datos ocurrida en 2025 que expuso la información personal de unos 37,5 millones de usuarios. Coupang es la mayor empresa de compras en línea del país.

La filtración dejó al descubierto nombres, números de teléfono y detalles de pedidos de los clientes. La PIPC dijo que Coupang no protegió bien los datos de sus usuarios. Es una de las mayores multas de privacidad en la historia de Corea.

Coupang pidió disculpas y prometió reforzar su seguridad. Millones de coreanos usan Coupang cada día, así que ahora muchos se preguntan cómo cuidan las empresas sus datos personales.$a1$,
$a1$Südkoreas Datenschutzkommission (PIPC) verhängte am 10. Juni 2026 eine Strafe von 624,6 Milliarden Won, rund 400 Millionen US-Dollar, gegen Coupang. Grund ist ein Datenleck aus dem Jahr 2025, bei dem die persönlichen Daten von etwa 37,5 Millionen Nutzern offengelegt wurden. Coupang ist das größte Online-Shopping-Unternehmen des Landes.

Bei dem Leck gelangten Namen, Telefonnummern und Bestelldaten der Kunden nach außen. Die PIPC erklärte, Coupang habe die Daten seiner Kunden nicht ausreichend geschützt. Es ist eine der höchsten Datenschutzstrafen in der Geschichte Koreas.

Coupang entschuldigte sich und versprach, die Sicherheit zu verbessern. Millionen Koreaner nutzen Coupang täglich, weshalb sich nun viele Sorgen machen, wie Unternehmen ihre persönlichen Daten schützen.$a1$,
$a1$La Commission de protection des données personnelles de Corée du Sud (PIPC) a infligé le 10 juin 2026 une amende de 624,6 milliards de wons, environ 400 millions de dollars, à Coupang. Cette amende sanctionne une fuite de données survenue en 2025 qui a exposé les informations personnelles d'environ 37,5 millions d'utilisateurs. Coupang est la plus grande entreprise de commerce en ligne du pays.

La fuite a révélé les noms, numéros de téléphone et détails de commande des clients. La PIPC a estimé que Coupang n'avait pas suffisamment protégé les données de ses clients. C'est l'une des plus grosses amendes pour atteinte à la vie privée de l'histoire coréenne.

Coupang s'est excusé et a promis de renforcer sa sécurité. Des millions de Coréens utilisent Coupang chaque jour, si bien que beaucoup s'inquiètent désormais de la façon dont les entreprises protègent leurs données personnelles.$a1$,
$a1$Ủy ban Bảo vệ Thông tin Cá nhân Hàn Quốc (PIPC) đã phạt Coupang 624,6 tỷ won, khoảng 400 triệu đô la Mỹ, vào ngày 10 tháng 6 năm 2026. Khoản phạt này nhằm xử lý vụ rò rỉ dữ liệu năm 2025 làm lộ thông tin cá nhân của khoảng 37,5 triệu người dùng. Coupang là công ty mua sắm trực tuyến lớn nhất Hàn Quốc.

Vụ rò rỉ đã để lộ tên, số điện thoại và chi tiết đơn hàng của khách hàng. PIPC cho biết Coupang đã không bảo vệ tốt dữ liệu của khách hàng. Đây là một trong những khoản phạt về quyền riêng tư lớn nhất trong lịch sử Hàn Quốc.

Coupang đã xin lỗi và hứa sẽ tăng cường bảo mật. Hàng triệu người Hàn Quốc dùng Coupang mỗi ngày, nên nhiều người giờ đây lo lắng về cách các công ty bảo vệ dữ liệu cá nhân.$a1$,
$a1$เกาหลีใต้: คณะกรรมการคุ้มครองข้อมูลส่วนบุคคล (PIPC) สั่งปรับคูปัง (Coupang) เป็นเงิน 624,600 ล้านวอน หรือราว 400 ล้านดอลลาร์สหรัฐ เมื่อวันที่ 10 มิถุนายน 2026 เพื่อลงโทษกรณีข้อมูลรั่วไหลในปี 2025 ที่ทำให้ข้อมูลส่วนตัวของผู้ใช้ราว 37.5 ล้านคนหลุดออกไป คูปังเป็นบริษัทช้อปปิงออนไลน์ที่ใหญ่ที่สุดในเกาหลีใต้

การรั่วไหลครั้งนี้ทำให้ชื่อ เบอร์โทรศัพท์ และรายละเอียดคำสั่งซื้อของลูกค้าหลุดออกไป PIPC ระบุว่าคูปังไม่ได้ปกป้องข้อมูลของลูกค้าอย่างเพียงพอ นับเป็นค่าปรับด้านความเป็นส่วนตัวที่สูงที่สุดครั้งหนึ่งในประวัติศาสตร์เกาหลี

คูปังได้ออกมาขอโทษและสัญญาว่าจะเพิ่มความปลอดภัยให้มากขึ้น เนื่องจากชาวเกาหลีหลายล้านคนใช้คูปังทุกวัน หลายคนจึงเริ่มกังวลว่าบริษัทต่าง ๆ ดูแลข้อมูลส่วนตัวของพวกเขาอย่างไร$a1$,
$a1$Komisi Perlindungan Informasi Pribadi Korea Selatan (PIPC) menjatuhkan denda 624,6 miliar won, sekitar 400 juta dolar AS, kepada Coupang pada 10 Juni 2026. Denda ini merupakan hukuman atas kebocoran data tahun 2025 yang membocorkan informasi pribadi sekitar 37,5 juta pengguna. Coupang adalah perusahaan belanja daring terbesar di Korea Selatan.

Kebocoran itu membocorkan nama, nomor telepon, dan rincian pesanan pelanggan. PIPC menyatakan Coupang tidak melindungi data pelanggannya dengan baik. Ini adalah salah satu denda privasi terbesar dalam sejarah Korea.

Coupang meminta maaf dan berjanji memperkuat keamanannya. Jutaan warga Korea menggunakan Coupang setiap hari, sehingga kini banyak yang khawatir tentang bagaimana perusahaan menjaga data pribadi mereka.$a1$,
$a1$South Korea's PIPC fined Coupang 624.6 billion won ($400M) over a 2025 data breach exposing 37.5 million users, one of the country's largest privacy fines.$a1$,
$a1$Coupang data breach, PIPC fine, Korea privacy, personal information leak, Korean e-commerce, data protection$a1$,
'beginner',
3, 4, 4,
$a1$[
{"word":"과징금","reading":"gwajinggeum","reading_ja":"クァジンググム","part_of_speech":"noun","definition_en":"a fine or penalty imposed by a regulator","definition_ja":"規制当局が科す制裁金・課徴金","definition_zh_tw":"監管機構開出的罰款","definition_es":"multa impuesta por un regulador","definition_de":"von einer Behörde verhängte Geldstrafe","definition_fr":"amende imposée par un régulateur","definition_vi":"khoản phạt do cơ quan quản lý áp đặt","definition_th":"ค่าปรับที่หน่วยงานกำกับดูแลสั่งลงโทษ","definition_id":"denda yang dijatuhkan oleh regulator","example_ko":"정부가 회사에 큰 과징금을 부과했다.","example_en":"The government imposed a large fine on the company.","example_ja":"政府は会社に多額の制裁金を科した。","example_zh_tw":"政府對公司開出巨額罰款。","example_es":"El gobierno impuso una gran multa a la empresa.","example_de":"Die Regierung verhängte eine hohe Strafe gegen das Unternehmen.","example_fr":"Le gouvernement a infligé une lourde amende à l'entreprise.","example_vi":"Chính phủ đã áp khoản phạt lớn lên công ty.","example_th":"รัฐบาลสั่งปรับบริษัทเป็นเงินจำนวนมาก","example_id":"Pemerintah menjatuhkan denda besar kepada perusahaan itu."},
{"word":"개인정보","reading":"gaeinjeongbo","reading_ja":"ケインジョンボ","part_of_speech":"noun","definition_en":"personal information; private data","definition_ja":"個人情報","definition_zh_tw":"個人資料","definition_es":"información personal","definition_de":"persönliche Daten","definition_fr":"informations personnelles","definition_vi":"thông tin cá nhân","definition_th":"ข้อมูลส่วนบุคคล","definition_id":"informasi pribadi","example_ko":"회사는 고객의 개인정보를 지켜야 한다.","example_en":"Companies must protect customers' personal information.","example_ja":"会社は顧客の個人情報を守らなければならない。","example_zh_tw":"公司必須保護顧客的個人資料。","example_es":"Las empresas deben proteger la información personal de los clientes.","example_de":"Unternehmen müssen die persönlichen Daten der Kunden schützen.","example_fr":"Les entreprises doivent protéger les informations personnelles des clients.","example_vi":"Các công ty phải bảo vệ thông tin cá nhân của khách hàng.","example_th":"บริษัทต้องปกป้องข้อมูลส่วนบุคคลของลูกค้า","example_id":"Perusahaan harus melindungi informasi pribadi pelanggan."},
{"word":"유출","reading":"yuchul","reading_ja":"ユチュル","part_of_speech":"noun","definition_en":"a leak or breach (of information)","definition_ja":"（情報の）流出・漏洩","definition_zh_tw":"（資訊）外洩","definition_es":"filtración o fuga (de datos)","definition_de":"Leck; Datenpanne","definition_fr":"fuite (de données)","definition_vi":"sự rò rỉ (dữ liệu)","definition_th":"การรั่วไหล (ของข้อมูล)","definition_id":"kebocoran (data)","example_ko":"개인정보 유출로 많은 사람이 피해를 봤다.","example_en":"Many people were harmed by the data leak.","example_ja":"情報流出で多くの人が被害を受けた。","example_zh_tw":"許多人因個資外洩而受害。","example_es":"Muchas personas resultaron afectadas por la filtración de datos.","example_de":"Viele Menschen wurden durch das Datenleck geschädigt.","example_fr":"De nombreuses personnes ont été touchées par la fuite de données.","example_vi":"Nhiều người bị ảnh hưởng bởi vụ rò rỉ dữ liệu.","example_th":"หลายคนได้รับผลกระทบจากการรั่วไหลของข้อมูล","example_id":"Banyak orang dirugikan oleh kebocoran data itu."},
{"word":"소비자","reading":"sobija","reading_ja":"ソビジャ","part_of_speech":"noun","definition_en":"consumer; customer","definition_ja":"消費者","definition_zh_tw":"消費者","definition_es":"consumidor","definition_de":"Verbraucher","definition_fr":"consommateur","definition_vi":"người tiêu dùng","definition_th":"ผู้บริโภค","definition_id":"konsumen","example_ko":"소비자들은 안전한 서비스를 원한다.","example_en":"Consumers want safe services.","example_ja":"消費者は安全なサービスを求めている。","example_zh_tw":"消費者希望有安全的服務。","example_es":"Los consumidores quieren servicios seguros.","example_de":"Verbraucher wünschen sich sichere Dienste.","example_fr":"Les consommateurs veulent des services sûrs.","example_vi":"Người tiêu dùng muốn có dịch vụ an toàn.","example_th":"ผู้บริโภคต้องการบริการที่ปลอดภัย","example_id":"Konsumen menginginkan layanan yang aman."},
{"word":"보호하다","reading":"bohohada","reading_ja":"ボホハダ","part_of_speech":"verb","definition_en":"to protect; to safeguard","definition_ja":"守る・保護する","definition_zh_tw":"保護","definition_es":"proteger","definition_de":"schützen","definition_fr":"protéger","definition_vi":"bảo vệ","definition_th":"ปกป้อง","definition_id":"melindungi","example_ko":"우리는 개인정보를 보호해야 한다.","example_en":"We must protect personal information.","example_ja":"私たちは個人情報を保護しなければならない。","example_zh_tw":"我們必須保護個人資料。","example_es":"Debemos proteger la información personal.","example_de":"Wir müssen persönliche Daten schützen.","example_fr":"Nous devons protéger les informations personnelles.","example_vi":"Chúng ta phải bảo vệ thông tin cá nhân.","example_th":"เราต้องปกป้องข้อมูลส่วนบุคคล","example_id":"Kita harus melindungi informasi pribadi."}
]$a1$::jsonb,
'published', true, 0,
'2026-06-09T23:00:00Z', '2026-06-09T23:00:00Z', '2026-06-09T23:00:00Z'
);

-- Article 2 — 2026-06-11 kpop intermediate — SHINee Onew pop-up for solo EP TOUGH LOVE
INSERT INTO articles (topic_id, slug, title_en, title_ko, title_ja, title_zh_tw, title_es, title_de, title_fr, title_vi, title_th, title_id, summary_en, summary_ko, summary_ja, summary_zh_tw, summary_es, summary_de, summary_fr, summary_vi, summary_th, summary_id, content_en, content_ko, content_ja, content_zh_tw, content_es, content_de, content_fr, content_vi, content_th, content_id, seo_description, seo_keywords, level, reading_time_en, reading_time_ko, reading_time_ja, vocabulary, status, ai_generated, view_count, published_at, created_at, updated_at) VALUES (
(SELECT id FROM topics WHERE slug = 'kpop'),
'kpop-2026-06-11',
$a2$SHINee's Onew Meets Fans at Seoul Pop-Up for New EP 'TOUGH LOVE'$a2$,
$a2$샤이니 온유, 솔로 미니앨범 '터프 러브' 팝업 개최$a2$,
$a2$SHINeeオンユ、ソロEP『TOUGH LOVE』でファンと交流$a2$,
$a2$SHINee溫流推出個人迷你專輯 首爾辦快閃店$a2$,
$a2$Onew de SHINee celebra su nuevo EP con una pop-up en Seúl$a2$,
$a2$Onew von SHINee feiert neue EP mit Pop-up in Seoul$a2$,
$a2$Onew de SHINee fête son nouvel EP avec un pop-up à Séoul$a2$,
$a2$Onew (SHINee) ra mắt EP mới, mở pop-up tại Seoul$a2$,
$a2$โอนิว SHINee เปิดป๊อปอัพฉลอง EP ใหม่ในโซล$a2$,
$a2$Onew SHINee Rayakan EP Baru Lewat Pop-Up di Seoul$a2$,
$a2$Onew of SHINee met fans at a pop-up store in Seoul's Seongsu-dong on June 11, 2026, to mark the release of his fifth solo mini-album, 'TOUGH LOVE.' Pop-up stores have become a staple of K-pop comeback promotion.$a2$,
$a2$샤이니의 온유가 2026년 6월 11일 서울 성수동 팝업스토어에서 팬들을 만나 다섯 번째 솔로 미니앨범 '터프 러브' 발매를 기념했다. 팝업스토어는 K-팝 컴백 홍보의 대표적인 방식으로 자리 잡았다.$a2$,
$a2$SHINeeのオンユが2026年6月11日、ソウル・聖水洞のポップアップストアでファンと会い、5枚目のソロEP『TOUGH LOVE』の発売を祝った。ポップアップはK-POPのカムバック定番の宣伝手法になっている。$a2$,
$a2$SHINee的溫流於2026年6月11日在首爾聖水洞快閃店與粉絲見面，慶祝第五張個人迷你專輯《TOUGH LOVE》發行。快閃店已成為K-pop回歸宣傳的常見方式。$a2$,
$a2$Onew de SHINee se reunió con sus fans en una pop-up de Seúl el 11 de junio de 2026 para celebrar su quinto EP en solitario, 'TOUGH LOVE'. Las pop-up son ya un clásico de la promoción de comebacks en el K-pop.$a2$,
$a2$Onew von SHINee traf am 11. Juni 2026 in einem Pop-up-Store in Seoul Fans, um seine fünfte Solo-EP 'TOUGH LOVE' zu feiern. Pop-up-Stores gehören inzwischen fest zur Comeback-Werbung im K-Pop.$a2$,
$a2$Onew de SHINee a rencontré ses fans dans un pop-up à Séoul le 11 juin 2026 pour célébrer son cinquième EP solo, 'TOUGH LOVE'. Les pop-up sont devenus incontournables dans la promotion des comebacks K-pop.$a2$,
$a2$Onew của SHINee đã gặp fan tại một cửa hàng pop-up ở Seoul ngày 11/6/2026 để kỷ niệm EP solo thứ năm 'TOUGH LOVE'. Cửa hàng pop-up đã trở thành cách quảng bá quen thuộc cho các màn comeback K-pop.$a2$,
$a2$โอนิวแห่ง SHINee พบแฟน ๆ ที่ร้านป๊อปอัพในกรุงโซลเมื่อวันที่ 11 มิถุนายน 2026 เพื่อฉลองมินิอัลบั้มเดี่ยวชุดที่ห้า 'TOUGH LOVE' ร้านป๊อปอัพกลายเป็นวิธีโปรโมตการคัมแบ็กที่พบเห็นได้ทั่วไปในวงการ K-pop$a2$,
$a2$Onew dari SHINee menemui penggemar di toko pop-up di Seoul pada 11 Juni 2026 untuk merayakan mini album solo kelimanya, 'TOUGH LOVE'. Toko pop-up kini menjadi cara umum promosi comeback K-pop.$a2$,
$a2$Onew, a member of the veteran K-pop group SHINee, greeted fans at a pop-up store in Seoul's trendy Seongsu-dong district on June 11, 2026, celebrating the release of his fifth solo mini-album, 'TOUGH LOVE.' The event, held at the Yeonghwa 104 Cafe, drew crowds eager to see the singer up close and pick up special merchandise.

SHINee debuted in 2008, making Onew one of K-pop's longer-serving idols. Across his career, like several of his group mates, he has balanced group activities with a steady solo career. 'TOUGH LOVE' continues that path, showcasing the warm, gentle vocal tone he is known for.

Pop-up stores have become a common promotional tool in Korea's music industry. Artists turn cafes and shops into themed spaces filled with photos, listening stations, and limited-edition goods, giving fans a physical place to gather during a comeback. Seongsu-dong, a former industrial area now full of cafes and boutiques, is a favorite spot for these events.$a2$,
$a2$베테랑 K-팝 그룹 샤이니의 멤버 온유가 2026년 6월 11일 서울의 트렌디한 동네 성수동의 팝업스토어에서 팬들을 만나 다섯 번째 솔로 미니앨범 '터프 러브'의 발매를 기념했다. 영화 104 카페에서 열린 이 행사에는 가수를 가까이서 보고 특별 굿즈를 사려는 팬들이 몰렸다.

샤이니는 2008년에 데뷔해, 온유는 K-팝에서 비교적 오래 활동한 아이돌 중 한 명이다. 여러 멤버들처럼 그도 활동 내내 그룹 활동과 꾸준한 솔로 활동을 병행해 왔다. '터프 러브'는 그가 잘 알려진 따뜻하고 부드러운 음색을 다시 보여 주며 그 길을 이어 간다.

팝업스토어는 한국 음악 산업에서 흔한 홍보 수단이 되었다. 아티스트들은 카페와 가게를 사진, 음악 감상 공간, 한정판 상품으로 채운 테마 공간으로 꾸며, 컴백 기간에 팬들이 모일 수 있는 실제 장소를 제공한다. 예전 공업 지역이었다가 지금은 카페와 편집숍으로 가득한 성수동은 이런 행사가 자주 열리는 인기 장소다.$a2$,
$a2$ベテランK-POPグループSHINeeのメンバー、オンユが2026年6月11日、ソウルの人気エリア聖水洞のポップアップストアでファンと対面し、5枚目のソロミニアルバム『TOUGH LOVE』の発売を祝った。ヨンファ104カフェで開かれたこのイベントには、歌手を間近で見て限定グッズを手に入れようとするファンが詰めかけた。

SHINeeは2008年にデビューし、オンユはK-POPの中でも活動歴の長いアイドルの一人だ。何人かのメンバーと同じく、彼もキャリアを通じてグループ活動と地道なソロ活動を両立してきた。『TOUGH LOVE』は、彼の持ち味である温かく柔らかな歌声を改めて聴かせ、その歩みを続けるものだ。

ポップアップストアは、韓国の音楽業界でよく使われる宣伝手法になっている。アーティストはカフェや店舗を写真や試聴コーナー、限定グッズで彩ったテーマ空間に変え、カムバック期間にファンが集える実際の場所を提供する。かつての工業地帯で今はカフェやセレクトショップが並ぶ聖水洞は、こうしたイベントの人気スポットだ。$a2$,
$a2$資深K-pop團體SHINee的成員溫流於2026年6月11日，在首爾時尚地區聖水洞的快閃店與粉絲見面，慶祝他第五張個人迷你專輯《TOUGH LOVE》發行。這場在「映畫104」咖啡廳舉辦的活動，吸引大批想近距離見到歌手、購買限定周邊的粉絲。

SHINee於2008年出道，讓溫流成為K-pop中資歷較深的偶像之一。和幾位團員一樣，他在整個演藝生涯中一直兼顧團體與個人活動。《TOUGH LOVE》延續了這條路線，再次展現他招牌的溫暖柔和嗓音。

快閃店已成為韓國音樂產業常見的宣傳方式。歌手把咖啡廳和店面打造成主題空間，擺滿照片、試聽區與限量商品，讓粉絲在回歸期間有個實際聚集的地方。聖水洞這個昔日工業區、如今遍布咖啡廳與選物店，正是這類活動的熱門地點。$a2$,
$a2$Onew, integrante del veterano grupo de K-pop SHINee, saludó a sus fans en una tienda pop-up del moderno barrio de Seongsu-dong, en Seúl, el 11 de junio de 2026, para celebrar el lanzamiento de su quinto EP en solitario, 'TOUGH LOVE'. El evento, en el café Yeonghwa 104, reunió a multitudes deseosas de ver de cerca al cantante y llevarse productos exclusivos.

SHINee debutó en 2008, lo que convierte a Onew en uno de los ídolos con más trayectoria del K-pop. A lo largo de su carrera, como varios de sus compañeros, ha compaginado las actividades de grupo con una constante carrera en solitario. 'TOUGH LOVE' sigue ese camino y luce el timbre cálido y suave por el que es conocido.

Las tiendas pop-up se han vuelto una herramienta habitual de promoción en la industria musical coreana. Los artistas convierten cafés y locales en espacios temáticos llenos de fotos, zonas de escucha y productos de edición limitada, ofreciendo a los fans un lugar físico donde reunirse durante un comeback. Seongsu-dong, una antigua zona industrial hoy repleta de cafés y boutiques, es uno de los lugares favoritos para estos eventos.$a2$,
$a2$Onew, Mitglied der langjährigen K-Pop-Gruppe SHINee, begrüßte am 11. Juni 2026 Fans in einem Pop-up-Store im angesagten Seouler Viertel Seongsu-dong und feierte die Veröffentlichung seiner fünften Solo-EP 'TOUGH LOVE'. Zu der Veranstaltung im Café Yeonghwa 104 kamen zahlreiche Fans, um den Sänger aus der Nähe zu sehen und besondere Fanartikel zu ergattern.

SHINee debütierte 2008, was Onew zu einem der dienstältesten Idole im K-Pop macht. Wie mehrere seiner Bandkollegen hat er im Laufe seiner Karriere Gruppenaktivitäten mit einer beständigen Solokarriere verbunden. 'TOUGH LOVE' setzt diesen Weg fort und zeigt erneut seinen bekannten warmen, sanften Gesang.

Pop-up-Stores sind zu einem gängigen Werbemittel in Koreas Musikbranche geworden. Künstler verwandeln Cafés und Läden in Themenräume voller Fotos, Hörstationen und limitierter Waren und geben Fans so einen realen Treffpunkt während eines Comebacks. Seongsu-dong, ein früheres Industriegebiet, das heute voller Cafés und Boutiquen ist, gehört zu den beliebtesten Orten für solche Events.$a2$,
$a2$Onew, membre du groupe de K-pop chevronné SHINee, a salué ses fans dans un pop-up store du quartier branché de Seongsu-dong, à Séoul, le 11 juin 2026, pour célébrer la sortie de son cinquième EP solo, 'TOUGH LOVE'. L'événement, organisé au café Yeonghwa 104, a attiré une foule venue voir le chanteur de près et repartir avec des produits exclusifs.

SHINee a débuté en 2008, ce qui fait d'Onew l'un des idoles les plus anciens du K-pop. Tout au long de sa carrière, comme plusieurs de ses camarades, il a mené de front les activités de groupe et une carrière solo régulière. 'TOUGH LOVE' poursuit cette voie et met en valeur le timbre chaleureux et doux qui le caractérise.

Les pop-up stores sont devenus un outil promotionnel courant dans l'industrie musicale coréenne. Les artistes transforment cafés et boutiques en espaces thématiques remplis de photos, de bornes d'écoute et de produits en édition limitée, offrant aux fans un lieu physique où se retrouver pendant un comeback. Seongsu-dong, ancienne zone industrielle aujourd'hui remplie de cafés et de boutiques, est l'un des endroits préférés pour ce type d'événements.$a2$,
$a2$Onew, thành viên nhóm K-pop kỳ cựu SHINee, đã chào fan tại một cửa hàng pop-up ở khu Seongsu-dong sành điệu của Seoul vào ngày 11 tháng 6 năm 2026, để kỷ niệm phát hành EP solo thứ năm của anh, 'TOUGH LOVE'. Sự kiện tổ chức tại quán cà phê Yeonghwa 104 đã thu hút đông đảo người hâm mộ muốn nhìn thấy nam ca sĩ ở cự ly gần và mua các sản phẩm đặc biệt.

SHINee ra mắt năm 2008, khiến Onew trở thành một trong những thần tượng hoạt động lâu năm của K-pop. Suốt sự nghiệp, như nhiều thành viên khác, anh vừa hoạt động nhóm vừa duy trì sự nghiệp solo đều đặn. 'TOUGH LOVE' tiếp nối con đường đó, phô diễn chất giọng ấm áp, mềm mại mà anh nổi tiếng.

Cửa hàng pop-up đã trở thành công cụ quảng bá phổ biến trong ngành âm nhạc Hàn Quốc. Nghệ sĩ biến quán cà phê và cửa tiệm thành không gian chủ đề đầy ảnh, khu nghe nhạc và hàng phiên bản giới hạn, mang đến cho fan một nơi thực để tụ họp trong dịp comeback. Seongsu-dong, khu công nghiệp cũ nay đầy quán cà phê và cửa hàng thời trang, là địa điểm được ưa chuộng cho những sự kiện này.$a2$,
$a2$โอนิว สมาชิกวง K-pop รุ่นเก๋า SHINee ทักทายแฟน ๆ ที่ร้านป๊อปอัพในย่านซองซูดงอันทันสมัยของกรุงโซล เมื่อวันที่ 11 มิถุนายน 2026 เพื่อฉลองการวางจำหน่ายมินิอัลบั้มเดี่ยวชุดที่ห้า 'TOUGH LOVE' งานที่จัดขึ้นที่คาเฟ่ยองฮวา 104 ดึงดูดแฟน ๆ จำนวนมากที่อยากเห็นนักร้องในระยะใกล้และซื้อสินค้าพิเศษ

SHINee เดบิวต์ในปี 2008 ทำให้โอนิวเป็นหนึ่งในไอดอลที่มีอายุการทำงานยาวนานในวงการ K-pop เช่นเดียวกับสมาชิกอีกหลายคน ตลอดอาชีพเขาทำทั้งกิจกรรมวงและงานเดี่ยวควบคู่กันมาโดยตลอด 'TOUGH LOVE' สานต่อเส้นทางนั้น พร้อมโชว์น้ำเสียงอบอุ่นนุ่มนวลอันเป็นเอกลักษณ์ของเขา

ร้านป๊อปอัพกลายเป็นเครื่องมือโปรโมตที่พบเห็นทั่วไปในอุตสาหกรรมเพลงเกาหลี ศิลปินเปลี่ยนคาเฟ่และร้านค้าให้เป็นพื้นที่ธีมเต็มไปด้วยภาพถ่าย มุมฟังเพลง และสินค้ารุ่นลิมิเต็ด เพื่อให้แฟน ๆ มีสถานที่จริงไว้มารวมตัวกันช่วงคัมแบ็ก ซองซูดงซึ่งเคยเป็นย่านอุตสาหกรรมและปัจจุบันเต็มไปด้วยคาเฟ่และร้านบูทีก จึงเป็นทำเลยอดนิยมสำหรับงานเหล่านี้$a2$,
$a2$Onew, anggota grup K-pop veteran SHINee, menyapa penggemar di sebuah toko pop-up di kawasan Seongsu-dong yang tren di Seoul pada 11 Juni 2026, untuk merayakan perilisan mini album solo kelimanya, 'TOUGH LOVE'. Acara di Kafe Yeonghwa 104 itu menarik kerumunan penggemar yang ingin melihat sang penyanyi dari dekat dan membeli barang khusus.

SHINee debut pada 2008, menjadikan Onew salah satu idola dengan karier terpanjang di K-pop. Sepanjang kariernya, seperti beberapa rekan satu grupnya, ia menyeimbangkan kegiatan grup dengan karier solo yang konsisten. 'TOUGH LOVE' melanjutkan jalur itu, menonjolkan warna suara hangat dan lembut yang menjadi ciri khasnya.

Toko pop-up telah menjadi alat promosi umum dalam industri musik Korea. Para artis menyulap kafe dan toko menjadi ruang bertema penuh foto, area mendengarkan lagu, dan barang edisi terbatas, memberi penggemar tempat fisik untuk berkumpul saat comeback. Seongsu-dong, bekas kawasan industri yang kini penuh kafe dan butik, menjadi lokasi favorit untuk acara seperti ini.$a2$,
$a2$SHINee's Onew celebrated his fifth solo EP 'TOUGH LOVE' with a June 11, 2026 pop-up store in Seoul's Seongsu-dong, drawing crowds of fans.$a2$,
$a2$Onew, SHINee, TOUGH LOVE, K-pop pop-up store, Seongsu-dong, solo EP, K-pop comeback$a2$,
'intermediate',
3, 4, 4,
$a2$[
{"word":"팝업스토어","reading":"paepeop-seutoeo","reading_ja":"パボプストオ","part_of_speech":"noun","definition_en":"pop-up store: a temporary themed shop","definition_ja":"ポップアップストア（期間限定の店）","definition_zh_tw":"快閃店（期間限定商店）","definition_es":"tienda pop-up (temporal)","definition_de":"Pop-up-Store (temporärer Laden)","definition_fr":"boutique éphémère (pop-up)","definition_vi":"cửa hàng pop-up (tạm thời)","definition_th":"ร้านป๊อปอัพ (ร้านชั่วคราว)","definition_id":"toko pop-up (sementara)","example_ko":"성수동에 새 팝업스토어가 문을 열었다.","example_en":"A new pop-up store opened in Seongsu-dong.","example_ja":"聖水洞に新しいポップアップストアがオープンした。","example_zh_tw":"聖水洞開了一家新的快閃店。","example_es":"Abrió una nueva tienda pop-up en Seongsu-dong.","example_de":"In Seongsu-dong eröffnete ein neuer Pop-up-Store.","example_fr":"Une nouvelle boutique éphémère a ouvert à Seongsu-dong.","example_vi":"Một cửa hàng pop-up mới đã mở ở Seongsu-dong.","example_th":"ร้านป๊อปอัพแห่งใหม่เปิดขึ้นที่ย่านซองซูดง","example_id":"Toko pop-up baru dibuka di Seongsu-dong."},
{"word":"미니앨범","reading":"mini-aelbeom","reading_ja":"ミニエルボム","part_of_speech":"noun","definition_en":"mini album; EP","definition_ja":"ミニアルバム（EP）","definition_zh_tw":"迷你專輯（EP）","definition_es":"miniálbum; EP","definition_de":"Mini-Album; EP","definition_fr":"mini-album; EP","definition_vi":"mini album; EP","definition_th":"มินิอัลบั้ม (EP)","definition_id":"mini album; EP","example_ko":"그는 새 미니앨범을 발표했다.","example_en":"He released a new mini album.","example_ja":"彼は新しいミニアルバムを発表した。","example_zh_tw":"他發行了新的迷你專輯。","example_es":"Lanzó un nuevo miniálbum.","example_de":"Er veröffentlichte ein neues Mini-Album.","example_fr":"Il a sorti un nouveau mini-album.","example_vi":"Anh ấy đã phát hành một mini album mới.","example_th":"เขาปล่อยมินิอัลบั้มใหม่","example_id":"Ia merilis mini album baru."},
{"word":"컴백","reading":"keombaek","reading_ja":"コムベク","part_of_speech":"noun","definition_en":"comeback (a new release or return to activity)","definition_ja":"カムバック（新作での活動再開）","definition_zh_tw":"回歸（推出新作）","definition_es":"regreso (comeback musical)","definition_de":"Comeback (Rückkehr mit neuem Release)","definition_fr":"comeback (retour avec une sortie)","definition_vi":"sự trở lại (comeback)","definition_th":"การคัมแบ็ก (การกลับมาพร้อมผลงานใหม่)","definition_id":"comeback (kembali dengan rilisan baru)","example_ko":"팬들은 그의 컴백을 오래 기다렸다.","example_en":"Fans waited a long time for his comeback.","example_ja":"ファンは彼のカムバックを長く待った。","example_zh_tw":"粉絲等他回歸等了很久。","example_es":"Los fans esperaron mucho su regreso.","example_de":"Die Fans warteten lange auf sein Comeback.","example_fr":"Les fans ont longtemps attendu son comeback.","example_vi":"Người hâm mộ đã chờ đợi màn comeback của anh rất lâu.","example_th":"แฟน ๆ รอการคัมแบ็กของเขานานมาก","example_id":"Penggemar lama menunggu comeback-nya."},
{"word":"솔로","reading":"sollo","reading_ja":"ソルロ","part_of_speech":"noun","definition_en":"solo (activity by one member alone)","definition_ja":"ソロ（単独での活動）","definition_zh_tw":"個人（單獨）活動","definition_es":"solo (actividad en solitario)","definition_de":"Solo (Einzelaktivität)","definition_fr":"solo (activité en solitaire)","definition_vi":"solo (hoạt động đơn)","definition_th":"เดี่ยว (กิจกรรมคนเดียว)","definition_id":"solo (kegiatan tunggal)","example_ko":"그는 솔로 활동을 시작했다.","example_en":"He started solo activities.","example_ja":"彼はソロ活動を始めた。","example_zh_tw":"他開始了個人活動。","example_es":"Comenzó su actividad en solitario.","example_de":"Er begann mit Soloaktivitäten.","example_fr":"Il a commencé sa carrière solo.","example_vi":"Anh ấy bắt đầu hoạt động solo.","example_th":"เขาเริ่มทำกิจกรรมเดี่ยว","example_id":"Ia memulai kegiatan solo."},
{"word":"발매","reading":"balmae","reading_ja":"パルメ","part_of_speech":"noun","definition_en":"release of a record or product for sale","definition_ja":"発売（レコードや商品の）","definition_zh_tw":"發行；發售","definition_es":"lanzamiento (a la venta)","definition_de":"Veröffentlichung (Verkaufsstart)","definition_fr":"sortie (mise en vente)","definition_vi":"sự phát hành (bán ra)","definition_th":"การวางจำหน่าย","definition_id":"perilisan (penjualan)","example_ko":"앨범 발매를 기념하는 행사가 열렸다.","example_en":"An event was held to mark the album's release.","example_ja":"アルバム発売を記念するイベントが開かれた。","example_zh_tw":"舉辦了慶祝專輯發行的活動。","example_es":"Se celebró un evento por el lanzamiento del álbum.","example_de":"Zur Veröffentlichung des Albums fand ein Event statt.","example_fr":"Un événement a marqué la sortie de l'album.","example_vi":"Một sự kiện được tổ chức để đánh dấu việc phát hành album.","example_th":"มีการจัดงานฉลองการวางจำหน่ายอัลบั้ม","example_id":"Sebuah acara digelar untuk merayakan perilisan album."}
]$a2$::jsonb,
'published', true, 0,
'2026-06-10T23:00:00Z', '2026-06-10T23:00:00Z', '2026-06-10T23:00:00Z'
);

-- Article 3 — 2026-06-12 travel advanced — Taiwan-Busan direct flights, regional tourism push
INSERT INTO articles (topic_id, slug, title_en, title_ko, title_ja, title_zh_tw, title_es, title_de, title_fr, title_vi, title_th, title_id, summary_en, summary_ko, summary_ja, summary_zh_tw, summary_es, summary_de, summary_fr, summary_vi, summary_th, summary_id, content_en, content_ko, content_ja, content_zh_tw, content_es, content_de, content_fr, content_vi, content_th, content_id, seo_description, seo_keywords, level, reading_time_en, reading_time_ko, reading_time_ja, vocabulary, status, ai_generated, view_count, published_at, created_at, updated_at) VALUES (
(SELECT id FROM topics WHERE slug = 'travel'),
'travel-2026-06-12',
$a3$Taiwan–Busan Direct Flights Fuel South Korea's Regional Tourism Push$a3$,
$a3$타이완–부산 직항 취항, 지방 관광 활기$a3$,
$a3$台湾―釜山の直行便就航、地方観光を後押し$a3$,
$a3$台灣—釜山直航開通 帶動韓國地方觀光$a3$,
$a3$Vuelos directos Taiwán–Busan impulsan el turismo regional coreano$a3$,
$a3$Direktflüge Taiwan–Busan beleben Südkoreas Regionaltourismus$a3$,
$a3$Les vols directs Taïwan–Busan dopent le tourisme régional coréen$a3$,
$a3$Đường bay thẳng Đài Loan–Busan thúc đẩy du lịch vùng$a3$,
$a3$เที่ยวบินตรงไต้หวัน–ปูซาน หนุนท่องเที่ยวภูมิภาคเกาหลี$a3$,
$a3$Penerbangan Langsung Taiwan–Busan Dorong Wisata Daerah Korea$a3$,
$a3$Direct flights from Taipei and Taichung to Busan launched on June 1, 2026, part of South Korea's drive to spread record tourist numbers beyond Seoul. Regional airports handled 32% more international passengers in May than a year earlier.$a3$,
$a3$2026년 6월 1일 타이베이·타이중과 부산을 잇는 직항이 취항했다. 서울에 몰린 관광객을 지방으로 분산하려는 노력의 일환으로, 5월 지방 공항의 국제선 승객은 1년 전보다 32% 늘었다.$a3$,
$a3$2026年6月1日、台北・台中と釜山を結ぶ直行便が就航した。ソウルに集中する観光客を地方へ分散させる取り組みの一環で、5月の地方空港の国際線利用者は前年比32%増えた。$a3$,
$a3$2026年6月1日，台北、台中往返釜山的直航正式開通，是韓國把破紀錄的觀光人潮從首爾分散到地方的一環。5月地方機場的國際旅客較去年增加32%。$a3$,
$a3$El 1 de junio de 2026 se estrenaron vuelos directos de Taipéi y Taichung a Busan, dentro del plan coreano para repartir el turismo récord más allá de Seúl. Los aeropuertos regionales movieron un 32% más de pasajeros internacionales en mayo.$a3$,
$a3$Am 1. Juni 2026 starteten Direktflüge von Taipeh und Taichung nach Busan — Teil von Südkoreas Plan, den Rekordtourismus über Seoul hinaus zu verteilen. Regionalflughäfen zählten im Mai 32% mehr internationale Passagiere.$a3$,
$a3$Le 1er juin 2026, des vols directs de Taipei et Taichung vers Busan ont été lancés, dans le cadre du plan coréen visant à répartir le tourisme record au-delà de Séoul. Les aéroports régionaux ont accueilli 32% de passagers internationaux en plus en mai.$a3$,
$a3$Ngày 1/6/2026, các chuyến bay thẳng từ Đài Bắc và Đài Trung đến Busan bắt đầu hoạt động, nằm trong nỗ lực của Hàn Quốc nhằm phân bổ lượng khách kỷ lục ra ngoài Seoul. Sân bay địa phương đón thêm 32% khách quốc tế trong tháng 5.$a3$,
$a3$เที่ยวบินตรงจากไทเปและไทจงสู่ปูซานเริ่มให้บริการเมื่อวันที่ 1 มิถุนายน 2026 เป็นส่วนหนึ่งของความพยายามกระจายนักท่องเที่ยวจำนวนมหาศาลออกจากโซล ท่าอากาศยานภูมิภาครับผู้โดยสารต่างชาติเพิ่มขึ้น 32% ในเดือนพฤษภาคม$a3$,
$a3$Penerbangan langsung dari Taipei dan Taichung ke Busan diluncurkan pada 1 Juni 2026, bagian dari upaya Korea menyebar rekor wisatawan ke luar Seoul. Bandara daerah melayani 32% lebih banyak penumpang internasional pada Mei.$a3$,
$a3$New direct flights linking Taipei and Taichung to Busan began operating on June 1, 2026, giving Taiwanese travelers a faster route to South Korea's largest coastal city and bypassing the traditional gateway of Seoul's Incheon airport. The routes are part of a broader push to spread inbound tourism beyond the capital region.

The strategy is showing results. Airports outside the Seoul metropolitan area handled about 360,000 international passengers in May 2026, a 32 percent jump from a year earlier, according to figures cited by the Korea Tourism Organization. Busan, with its beaches, film festival, and seafood markets, has been a particular beneficiary.

Taiwan is one of several markets driving South Korea's tourism rebound. China has returned as the single largest source of visitors, with roughly 1.45 million Chinese travelers in the first quarter alone, while arrivals from Japan, Hong Kong, and Southeast Asia have also climbed. Foreign card spending topped 2 trillion won in May for the first time on record.

For years, most foreign visitors flew into Incheon and concentrated in Seoul, straining the capital while leaving provincial regions underused. By opening international routes to cities like Busan, officials hope to ease that imbalance, support regional economies, and give repeat visitors reasons to explore beyond the well-worn Seoul itinerary.$a3$,
$a3$2026년 6월 1일, 타이베이와 타이중에서 부산을 잇는 직항 노선이 운항을 시작했다. 타이완 여행객은 이제 서울 인천공항을 거치지 않고 한국 최대 해안 도시로 더 빠르게 올 수 있게 됐다. 이 노선은 수도권에 몰린 관광객을 지방으로 넓히려는 큰 흐름의 일부다.

전략은 효과를 보이고 있다. 한국관광공사가 인용한 자료에 따르면, 2026년 5월 수도권 밖 공항이 처리한 국제선 승객은 약 36만 명으로 1년 전보다 32% 늘었다. 해변과 영화제, 수산시장을 갖춘 부산이 특히 큰 수혜를 봤다.

타이완은 한국 관광 회복을 이끄는 여러 시장 중 하나다. 중국이 다시 최대 방문국으로 돌아와 1분기에만 약 145만 명이 찾았고, 일본·홍콩·동남아시아에서 오는 방문객도 늘었다. 5월 외국인 카드 지출은 사상 처음으로 2조 원을 넘어섰다.

오랫동안 대부분의 외국인은 인천으로 들어와 서울에 집중됐고, 이는 수도권에 부담을 주면서 지방은 상대적으로 소외됐다. 부산 같은 도시에 국제선을 열어 당국은 이런 불균형을 줄이고 지역 경제를 살리며, 재방문객에게 서울 밖을 둘러볼 이유를 주려 한다.$a3$,
$a3$2026年6月1日、台北と台中から釜山を結ぶ直行便が運航を始めた。台湾の旅行者はソウルの仁川空港を経由せず、韓国最大の沿岸都市へより速く行けるようになった。この路線は、首都圏に集中する観光客を地方へ広げる大きな取り組みの一部だ。

戦略は成果を上げている。韓国観光公社が引用した統計によると、2026年5月に首都圏以外の空港が扱った国際線旅客は約36万人で、前年より32%増えた。ビーチや映画祭、海産物市場を持つ釜山は特に恩恵を受けている。

台湾は韓国観光の回復を支える複数の市場の一つだ。中国が再び最大の訪問国となり、第1四半期だけで約145万人が訪れ、日本・香港・東南アジアからの旅行者も増えた。5月の外国人カード支出は史上初めて2兆ウォンを超えた。

長年、多くの外国人は仁川から入国してソウルに集中し、首都圏に負担をかける一方で地方は生かしきれていなかった。釜山のような都市に国際線を開くことで、当局はこの偏りを和らげ、地域経済を支え、リピーターにソウル以外を巡る理由を与えたいと考えている。$a3$,
$a3$2026年6月1日，連接台北、台中與釜山的直航航線正式啟航。台灣旅客如今不必經由首爾仁川機場，就能更快抵達韓國最大的海岸城市。這條航線是把集中在首都圈的觀光客擴散到地方的大方向的一環。

這項策略正見成效。根據韓國觀光公社引用的數據，2026年5月首都圈以外機場處理的國際旅客約36萬人次，較去年增加32%。擁有海灘、電影節與水產市場的釜山尤其受惠。

台灣是推動韓國觀光復甦的多個市場之一。中國重新成為最大客源，光是第一季就有約145萬人造訪，來自日本、香港與東南亞的旅客也增加。5月外國人刷卡消費更首度突破2兆韓元。

長期以來，多數外國旅客都由仁川入境並集中於首爾，讓首都圈不堪負荷，地方卻相對被忽略。透過在釜山等城市開通國際航線，當局希望緩解這種失衡、振興地方經濟，並讓回訪旅客有理由走出首爾。$a3$,
$a3$El 1 de junio de 2026 comenzaron a operar vuelos directos que unen Taipéi y Taichung con Busan, ofreciendo a los viajeros taiwaneses una ruta más rápida hacia la mayor ciudad costera de Corea del Sur, sin pasar por el tradicional aeropuerto de Incheon, en Seúl. Las rutas forman parte de un esfuerzo mayor por repartir el turismo más allá de la capital.

La estrategia da resultados. Según cifras citadas por la Organización de Turismo de Corea, los aeropuertos fuera del área metropolitana de Seúl movieron unos 360.000 pasajeros internacionales en mayo de 2026, un 32% más que un año antes. Busan, con sus playas, su festival de cine y sus mercados de marisco, ha salido especialmente beneficiada.

Taiwán es uno de los varios mercados que impulsan la recuperación turística coreana. China ha vuelto a ser el mayor emisor de visitantes, con unos 1,45 millones de viajeros solo en el primer trimestre, mientras crecen también las llegadas desde Japón, Hong Kong y el Sudeste Asiático. El gasto extranjero con tarjeta superó los 2 billones de wones en mayo por primera vez en la historia.

Durante años, la mayoría de los visitantes extranjeros llegaban por Incheon y se concentraban en Seúl, saturando la capital mientras las regiones quedaban infrautilizadas. Al abrir rutas internacionales a ciudades como Busan, las autoridades esperan corregir ese desequilibrio, apoyar las economías regionales y dar a los visitantes que repiten motivos para explorar más allá del itinerario habitual por Seúl.$a3$,
$a3$Am 1. Juni 2026 nahmen Direktflüge von Taipeh und Taichung nach Busan den Betrieb auf. Taiwanische Reisende erreichen damit Südkoreas größte Küstenstadt schneller, ohne den üblichen Umweg über den Flughafen Incheon bei Seoul. Die Verbindungen sind Teil eines größeren Vorhabens, den Tourismus über die Hauptstadtregion hinaus zu verteilen.

Die Strategie zeigt Wirkung. Nach Zahlen der Korea Tourism Organization zählten Flughäfen außerhalb des Großraums Seoul im Mai 2026 rund 360.000 internationale Passagiere – 32 Prozent mehr als ein Jahr zuvor. Busan mit seinen Stränden, seinem Filmfestival und seinen Fischmärkten profitiert besonders.

Taiwan ist einer von mehreren Märkten, die Südkoreas Tourismuserholung tragen. China ist wieder das wichtigste Herkunftsland, allein im ersten Quartal kamen rund 1,45 Millionen Chinesen, und auch aus Japan, Hongkong und Südostasien stiegen die Ankünfte. Die Kartenausgaben ausländischer Gäste überschritten im Mai erstmals die Marke von 2 Billionen Won.

Jahrelang reisten die meisten ausländischen Gäste über Incheon ein und konzentrierten sich auf Seoul, was die Hauptstadt belastete und die Provinzen kaum einbezog. Mit internationalen Verbindungen zu Städten wie Busan wollen die Behörden dieses Ungleichgewicht mildern, regionale Wirtschaften stärken und wiederkehrenden Gästen Gründe geben, mehr als nur Seoul zu erkunden.$a3$,
$a3$Le 1er juin 2026, des vols directs reliant Taipei et Taichung à Busan ont commencé à opérer, offrant aux voyageurs taïwanais un accès plus rapide à la plus grande ville côtière de Corée du Sud, sans passer par l'aéroport d'Incheon, près de Séoul. Ces liaisons s'inscrivent dans une volonté plus large de répartir le tourisme au-delà de la capitale.

La stratégie porte ses fruits. Selon des chiffres cités par l'Office du tourisme coréen, les aéroports situés hors de la région métropolitaine de Séoul ont accueilli environ 360 000 passagers internationaux en mai 2026, soit 32 % de plus qu'un an auparavant. Busan, avec ses plages, son festival de cinéma et ses marchés aux poissons, en profite particulièrement.

Taïwan est l'un des nombreux marchés qui soutiennent la reprise touristique coréenne. La Chine est redevenue le premier pays émetteur, avec environ 1,45 million de voyageurs rien qu'au premier trimestre, tandis que les arrivées du Japon, de Hong Kong et d'Asie du Sud-Est augmentent aussi. Les dépenses par carte des étrangers ont dépassé 2 000 milliards de wons en mai, une première.

Pendant des années, la plupart des visiteurs étrangers arrivaient par Incheon et se concentraient à Séoul, saturant la capitale tandis que les régions restaient sous-exploitées. En ouvrant des liaisons internationales vers des villes comme Busan, les autorités espèrent corriger ce déséquilibre, soutenir les économies régionales et donner aux visiteurs réguliers des raisons d'explorer au-delà de l'itinéraire habituel autour de Séoul.$a3$,
$a3$Ngày 1 tháng 6 năm 2026, các chuyến bay thẳng nối Đài Bắc và Đài Trung với Busan bắt đầu hoạt động, mang đến cho du khách Đài Loan lộ trình nhanh hơn đến thành phố ven biển lớn nhất Hàn Quốc mà không phải qua sân bay Incheon truyền thống ở Seoul. Các đường bay này nằm trong nỗ lực rộng lớn hơn nhằm phân bổ du lịch ra ngoài khu vực thủ đô.

Chiến lược đang cho thấy kết quả. Theo số liệu do Tổng cục Du lịch Hàn Quốc dẫn lại, các sân bay ngoài vùng đô thị Seoul đã đón khoảng 360.000 lượt khách quốc tế trong tháng 5 năm 2026, tăng 32% so với một năm trước. Busan, với các bãi biển, liên hoan phim và chợ hải sản, được hưởng lợi đặc biệt.

Đài Loan là một trong nhiều thị trường thúc đẩy sự phục hồi du lịch của Hàn Quốc. Trung Quốc đã trở lại là nguồn khách lớn nhất, với khoảng 1,45 triệu lượt chỉ trong quý đầu, trong khi khách từ Nhật Bản, Hồng Kông và Đông Nam Á cũng tăng. Chi tiêu bằng thẻ của khách nước ngoài vượt 2 nghìn tỷ won trong tháng 5, lần đầu tiên trong lịch sử.

Trong nhiều năm, phần lớn khách nước ngoài bay đến Incheon và tập trung ở Seoul, gây quá tải cho thủ đô trong khi các vùng khác bị bỏ ngỏ. Bằng cách mở các đường bay quốc tế đến những thành phố như Busan, giới chức hy vọng giảm bớt sự mất cân bằng đó, hỗ trợ kinh tế địa phương và cho du khách quay lại lý do khám phá bên ngoài lịch trình quen thuộc ở Seoul.$a3$,
$a3$เมื่อวันที่ 1 มิถุนายน 2026 เที่ยวบินตรงเชื่อมไทเปและไทจงกับปูซานเริ่มให้บริการ ทำให้นักท่องเที่ยวไต้หวันเดินทางสู่เมืองชายฝั่งที่ใหญ่ที่สุดของเกาหลีใต้ได้เร็วขึ้นโดยไม่ต้องผ่านสนามบินอินชอนของโซลตามเดิม เส้นทางเหล่านี้เป็นส่วนหนึ่งของความพยายามครั้งใหญ่ในการกระจายการท่องเที่ยวออกไปนอกเขตเมืองหลวง

กลยุทธ์นี้เริ่มเห็นผล จากตัวเลขที่องค์การส่งเสริมการท่องเที่ยวเกาหลีอ้างอิง ท่าอากาศยานนอกเขตปริมณฑลโซลรองรับผู้โดยสารระหว่างประเทศราว 360,000 คนในเดือนพฤษภาคม 2026 เพิ่มขึ้น 32% จากปีก่อน ปูซานซึ่งมีชายหาด เทศกาลภาพยนตร์ และตลาดอาหารทะเล ได้รับอานิสงส์เป็นพิเศษ

ไต้หวันเป็นหนึ่งในหลายตลาดที่ขับเคลื่อนการฟื้นตัวของการท่องเที่ยวเกาหลี จีนกลับมาเป็นแหล่งนักท่องเที่ยวรายใหญ่ที่สุด โดยไตรมาสแรกเพียงไตรมาสเดียวมีนักท่องเที่ยวราว 1.45 ล้านคน ขณะที่นักท่องเที่ยวจากญี่ปุ่น ฮ่องกง และเอเชียตะวันออกเฉียงใต้ก็เพิ่มขึ้น ยอดใช้จ่ายผ่านบัตรของชาวต่างชาติในเดือนพฤษภาคมทะลุ 2 ล้านล้านวอนเป็นครั้งแรก

หลายปีที่ผ่านมา นักท่องเที่ยวต่างชาติส่วนใหญ่เข้ามาทางอินชอนและกระจุกตัวอยู่ในโซล ทำให้เมืองหลวงแบกภาระหนักขณะที่ภูมิภาคอื่นถูกใช้ประโยชน์ไม่เต็มที่ การเปิดเส้นทางระหว่างประเทศสู่เมืองอย่างปูซานทำให้ทางการหวังลดความไม่สมดุลนี้ หนุนเศรษฐกิจท้องถิ่น และให้นักท่องเที่ยวที่กลับมาซ้ำมีเหตุผลไปสำรวจนอกเหนือจากเส้นทางเดิมในโซล$a3$,
$a3$Pada 1 Juni 2026, penerbangan langsung yang menghubungkan Taipei dan Taichung dengan Busan mulai beroperasi, memberi wisatawan Taiwan rute lebih cepat menuju kota pesisir terbesar Korea Selatan tanpa melewati bandara Incheon di Seoul. Rute-rute ini bagian dari upaya lebih luas untuk menyebar pariwisata ke luar wilayah ibu kota.

Strategi itu mulai membuahkan hasil. Menurut angka yang dikutip Organisasi Pariwisata Korea, bandara di luar kawasan metropolitan Seoul melayani sekitar 360.000 penumpang internasional pada Mei 2026, naik 32 persen dari tahun sebelumnya. Busan, dengan pantai, festival film, dan pasar makanan lautnya, paling diuntungkan.

Taiwan adalah salah satu dari beberapa pasar yang mendorong pemulihan pariwisata Korea. China kembali menjadi sumber pengunjung terbesar, dengan sekitar 1,45 juta wisatawan hanya pada kuartal pertama, sementara kedatangan dari Jepang, Hong Kong, dan Asia Tenggara juga meningkat. Belanja kartu wisatawan asing menembus 2 triliun won pada Mei untuk pertama kalinya.

Selama bertahun-tahun, sebagian besar pengunjung asing tiba melalui Incheon dan berkumpul di Seoul, membebani ibu kota sementara daerah lain kurang dimanfaatkan. Dengan membuka rute internasional ke kota seperti Busan, pihak berwenang berharap meredakan ketimpangan itu, menopang ekonomi daerah, dan memberi wisatawan berulang alasan menjelajah di luar rute Seoul yang biasa.$a3$,
$a3$Direct Taipei–Taichung flights to Busan launched June 1, 2026 as South Korea spreads record tourism beyond Seoul; regional airports saw 32% more foreign flyers.$a3$,
$a3$Busan tourism, Taiwan Korea flights, regional tourism Korea, direct flights Busan, Korea Tourism Organization, inbound tourism$a3$,
'advanced',
3, 4, 4,
$a3$[
{"word":"직항","reading":"jikhang","reading_ja":"チカン","part_of_speech":"noun","definition_en":"direct flight (nonstop)","definition_ja":"直行便","definition_zh_tw":"直航（直飛航班）","definition_es":"vuelo directo","definition_de":"Direktflug","definition_fr":"vol direct","definition_vi":"chuyến bay thẳng","definition_th":"เที่ยวบินตรง","definition_id":"penerbangan langsung","example_ko":"부산까지 직항이 생겨서 편해졌다.","example_en":"A direct flight to Busan has made travel easier.","example_ja":"釜山までの直行便ができて便利になった。","example_zh_tw":"有了到釜山的直航，方便多了。","example_es":"Un vuelo directo a Busan ha facilitado el viaje.","example_de":"Ein Direktflug nach Busan macht das Reisen einfacher.","example_fr":"Un vol direct vers Busan a facilité le voyage.","example_vi":"Có chuyến bay thẳng đến Busan nên việc đi lại dễ hơn.","example_th":"มีเที่ยวบินตรงไปปูซานทำให้เดินทางสะดวกขึ้น","example_id":"Adanya penerbangan langsung ke Busan mempermudah perjalanan."},
{"word":"노선","reading":"noseon","reading_ja":"ノソン","part_of_speech":"noun","definition_en":"route; line (of transport)","definition_ja":"路線","definition_zh_tw":"航線；路線","definition_es":"ruta; línea","definition_de":"Route; Linie","definition_fr":"ligne; itinéraire","definition_vi":"tuyến; đường bay","definition_th":"เส้นทาง (บิน)","definition_id":"rute; jalur","example_ko":"항공사가 새 노선을 열었다.","example_en":"The airline opened a new route.","example_ja":"航空会社が新しい路線を開いた。","example_zh_tw":"航空公司開了新航線。","example_es":"La aerolínea abrió una nueva ruta.","example_de":"Die Fluggesellschaft eröffnete eine neue Route.","example_fr":"La compagnie a ouvert une nouvelle ligne.","example_vi":"Hãng hàng không đã mở một tuyến bay mới.","example_th":"สายการบินเปิดเส้นทางบินใหม่","example_id":"Maskapai membuka rute baru."},
{"word":"관광객","reading":"gwan-gwanggaek","reading_ja":"クァングァンゲク","part_of_speech":"noun","definition_en":"tourist; sightseer","definition_ja":"観光客","definition_zh_tw":"觀光客；遊客","definition_es":"turista","definition_de":"Tourist","definition_fr":"touriste","definition_vi":"khách du lịch","definition_th":"นักท่องเที่ยว","definition_id":"wisatawan","example_ko":"부산에 관광객이 크게 늘었다.","example_en":"The number of tourists in Busan has grown sharply.","example_ja":"釜山を訪れる観光客が大きく増えた。","example_zh_tw":"來釜山的觀光客大幅增加。","example_es":"El número de turistas en Busan ha crecido mucho.","example_de":"Die Zahl der Touristen in Busan ist stark gestiegen.","example_fr":"Le nombre de touristes à Busan a fortement augmenté.","example_vi":"Số khách du lịch đến Busan đã tăng mạnh.","example_th":"จำนวนนักท่องเที่ยวในปูซานเพิ่มขึ้นมาก","example_id":"Jumlah wisatawan di Busan meningkat tajam."},
{"word":"지방","reading":"jibang","reading_ja":"チバン","part_of_speech":"noun","definition_en":"the provinces; regions outside the capital","definition_ja":"地方（首都以外の地域）","definition_zh_tw":"地方（首都以外的地區）","definition_es":"las provincias; regiones fuera de la capital","definition_de":"Provinz; Regionen außerhalb der Hauptstadt","definition_fr":"la province; régions hors de la capitale","definition_vi":"địa phương; vùng ngoài thủ đô","definition_th":"ต่างจังหวัด; ภูมิภาคนอกเมืองหลวง","definition_id":"daerah; wilayah di luar ibu kota","example_ko":"정부는 지방 관광을 키우려 한다.","example_en":"The government wants to grow regional tourism.","example_ja":"政府は地方観光を育てようとしている。","example_zh_tw":"政府想發展地方觀光。","example_es":"El gobierno quiere impulsar el turismo regional.","example_de":"Die Regierung will den Regionaltourismus fördern.","example_fr":"Le gouvernement veut développer le tourisme régional.","example_vi":"Chính phủ muốn phát triển du lịch địa phương.","example_th":"รัฐบาลต้องการส่งเสริมการท่องเที่ยวในต่างจังหวัด","example_id":"Pemerintah ingin mengembangkan pariwisata daerah."},
{"word":"유치하다","reading":"yuchihada","reading_ja":"ユチハダ","part_of_speech":"verb","definition_en":"to attract or draw in (visitors, investment, events)","definition_ja":"誘致する（観光客・投資などを）","definition_zh_tw":"招攬；吸引（遊客、投資）","definition_es":"atraer (visitantes, inversiones)","definition_de":"anlocken; anwerben (Gäste, Investitionen)","definition_fr":"attirer (visiteurs, investissements)","definition_vi":"thu hút (khách, đầu tư)","definition_th":"ดึงดูด (นักท่องเที่ยว การลงทุน)","definition_id":"menarik (pengunjung, investasi)","example_ko":"부산은 외국인 관광객을 유치하려 노력한다.","example_en":"Busan is working to attract foreign tourists.","example_ja":"釜山は外国人観光客を誘致しようと努めている。","example_zh_tw":"釜山努力吸引外國觀光客。","example_es":"Busan se esfuerza por atraer turistas extranjeros.","example_de":"Busan bemüht sich, ausländische Touristen anzuziehen.","example_fr":"Busan s'efforce d'attirer les touristes étrangers.","example_vi":"Busan đang nỗ lực thu hút khách du lịch nước ngoài.","example_th":"ปูซานพยายามดึงดูดนักท่องเที่ยวต่างชาติ","example_id":"Busan berupaya menarik wisatawan asing."}
]$a3$::jsonb,
'published', true, 0,
'2026-06-11T23:00:00Z', '2026-06-11T23:00:00Z', '2026-06-11T23:00:00Z'
);

-- Article 4 — 2026-06-13 tech beginner — Naver & Kakao upgrade maps vs Google Maps
INSERT INTO articles (topic_id, slug, title_en, title_ko, title_ja, title_zh_tw, title_es, title_de, title_fr, title_vi, title_th, title_id, summary_en, summary_ko, summary_ja, summary_zh_tw, summary_es, summary_de, summary_fr, summary_vi, summary_th, summary_id, content_en, content_ko, content_ja, content_zh_tw, content_es, content_de, content_fr, content_vi, content_th, content_id, seo_description, seo_keywords, level, reading_time_en, reading_time_ko, reading_time_ja, vocabulary, status, ai_generated, view_count, published_at, created_at, updated_at) VALUES (
(SELECT id FROM topics WHERE slug = 'tech'),
'tech-2026-06-13',
$a4$Naver and Kakao Upgrade Map Apps to Fend Off Google Maps$a4$,
$a4$네이버·카카오, 구글 맞서 지도 앱 강화$a4$,
$a4$ネイバーとカカオ、地図アプリを強化しグーグルに対抗$a4$,
$a4$Naver與Kakao升級地圖 抗衡Google地圖$a4$,
$a4$Naver y Kakao mejoran sus mapas para frenar a Google Maps$a4$,
$a4$Naver und Kakao rüsten Karten-Apps gegen Google Maps auf$a4$,
$a4$Naver et Kakao renforcent leurs cartes face à Google Maps$a4$,
$a4$Naver và Kakao nâng cấp bản đồ để đấu với Google Maps$a4$,
$a4$Naver และ Kakao อัปเกรดแอปแผนที่รับมือ Google Maps$a4$,
$a4$Naver dan Kakao Tingkatkan Peta demi Lawan Google Maps$a4$,
$a4$Naver and Kakao are upgrading their map apps in 2026 to defend against Google Maps after the government agreed to let Google export high-precision Korean map data. Both are adding local 'experience data' like reviews and photos to keep users.$a4$,
$a4$정부가 구글의 고정밀 지도 데이터 반출을 조건부로 허용하자, 네이버와 카카오가 2026년 구글 지도에 맞서 지도 앱을 강화하고 있다. 두 회사는 후기와 사진 같은 현지 '경험 데이터'를 더해 이용자를 지키려 한다.$a4$,
$a4$政府がグーグルの高精度地図データの持ち出しを条件付きで認めたのを受け、ネイバーとカカオは2026年、グーグルマップに対抗して地図アプリを強化している。両社は口コミや写真など現地の「体験データ」を加え、利用者をつなぎ留めようとしている。$a4$,
$a4$在政府有條件允許Google輸出韓國高精度地圖資料後，Naver與Kakao於2026年升級地圖應用以抗衡Google地圖。兩家都加入評論、照片等在地「體驗資料」來留住用戶。$a4$,
$a4$Naver y Kakao están mejorando sus apps de mapas en 2026 para defenderse de Google Maps, después de que el gobierno permitiera a Google exportar datos cartográficos de alta precisión. Ambas añaden 'datos de experiencia' locales, como reseñas y fotos.$a4$,
$a4$Naver und Kakao rüsten 2026 ihre Karten-Apps gegen Google Maps auf, nachdem die Regierung Google den Export hochpräziser Kartendaten erlaubt hat. Beide ergänzen lokale 'Erlebnisdaten' wie Bewertungen und Fotos.$a4$,
$a4$Naver et Kakao améliorent leurs applications de cartes en 2026 pour se défendre face à Google Maps, après que le gouvernement a autorisé Google à exporter des données cartographiques de haute précision. Les deux ajoutent des 'données d'expérience' locales, avis et photos.$a4$,
$a4$Naver và Kakao đang nâng cấp ứng dụng bản đồ trong năm 2026 để đối phó Google Maps, sau khi chính phủ cho phép Google xuất dữ liệu bản đồ độ chính xác cao. Cả hai bổ sung 'dữ liệu trải nghiệm' như đánh giá và ảnh.$a4$,
$a4$Naver และ Kakao กำลังอัปเกรดแอปแผนที่ในปี 2026 เพื่อรับมือ Google Maps หลังรัฐบาลอนุญาตให้ Google ส่งออกข้อมูลแผนที่ความละเอียดสูง ทั้งคู่เพิ่ม 'ข้อมูลประสบการณ์' ในพื้นที่ เช่น รีวิวและรูปภาพ$a4$,
$a4$Naver dan Kakao meningkatkan aplikasi peta pada 2026 untuk menghadapi Google Maps setelah pemerintah mengizinkan Google mengekspor data peta presisi tinggi. Keduanya menambah 'data pengalaman' lokal seperti ulasan dan foto.$a4$,
$a4$South Korea's two biggest internet companies, Naver and Kakao, are upgrading their map apps to compete with Google Maps. The push follows a 2026 government decision to let Google export high-precision Korean map data, which could help Google Maps work better in the country for the first time.

For years, Google Maps has been limited in South Korea because the government did not allow detailed map data to leave the country for security reasons. Most Koreans use Naver Map or Kakao Map instead, which offer strong local features like bus arrival times, indoor maps, and reviews. Kakao recently added an 'Expert Profile' feature that connects users to local specialists, such as bakers, florists, and movers.

Naver and Kakao know Google is a powerful rival, so they are adding new 'experience data' — real photos, reviews, and local tips — to keep users. For visitors to Korea, the change may finally make Google Maps more useful, while locals continue to rely on the home-grown apps they know best.$a4$,
$a4$한국의 양대 인터넷 기업 네이버와 카카오가 구글 지도에 맞서기 위해 지도 앱을 강화하고 있다. 이 움직임은 2026년 정부가 구글의 고정밀 한국 지도 데이터 반출을 허용하기로 하면서 시작됐다. 이 결정으로 구글 지도가 한국에서 처음으로 더 잘 작동할 수 있게 될 전망이다.

오랫동안 구글 지도는 한국에서 제 기능을 못 했다. 보안을 이유로 정부가 상세한 지도 데이터를 나라 밖으로 내보내지 못하게 했기 때문이다. 그래서 대부분의 한국인은 버스 도착 시간, 실내 지도, 후기 같은 현지 기능이 강한 네이버 지도나 카카오맵을 쓴다. 카카오는 최근 제빵사, 플로리스트, 이사 업체 같은 현지 전문가와 이용자를 연결해 주는 '전문가 프로필' 기능을 추가했다.

네이버와 카카오는 구글이 강력한 경쟁자임을 잘 안다. 그래서 실제 사진과 후기, 현지 정보 같은 '경험 데이터'를 더해 이용자를 붙잡으려 한다. 한국을 찾는 여행자에게는 이번 변화로 구글 지도가 드디어 더 쓸 만해질 수 있고, 현지인은 익숙한 국산 앱을 계속 이용할 것으로 보인다.$a4$,
$a4$韓国の二大インターネット企業ネイバーとカカオが、グーグルマップに対抗して地図アプリを強化している。この動きは、2026年に政府がグーグルの高精度な韓国地図データの持ち出しを認めたことをきっかけに始まった。この決定で、グーグルマップが韓国で初めてより快適に使えるようになる可能性がある。

長年、グーグルマップは韓国で十分に機能してこなかった。安全保障を理由に、政府が詳細な地図データを国外へ出すことを認めなかったためだ。そのため多くの韓国人は、バス到着時刻や屋内地図、口コミといった現地機能に強いネイバー地図やカカオマップを使っている。カカオは最近、パン職人や花屋、引っ越し業者などの地元の専門家と利用者をつなぐ「専門家プロフィール」機能を追加した。

ネイバーとカカオは、グーグルが強力なライバルだとよく分かっている。だからこそ実際の写真や口コミ、地元情報といった「体験データ」を加え、利用者をつなぎ留めようとしている。韓国を訪れる旅行者にとっては、今回の変化でグーグルマップがようやく使いやすくなるかもしれず、地元の人は慣れた国産アプリを使い続けるとみられる。$a4$,
$a4$韓國兩大網路企業Naver與Kakao正強化地圖應用，以抗衡Google地圖。這波動作源於2026年政府決定允許Google把韓國高精度地圖資料帶出國外，此舉可能讓Google地圖首次在韓國更好用。

長期以來，Google地圖在韓國一直無法充分發揮功能，因為政府以國安為由，不准詳細地圖資料離開韓國。因此多數韓國人使用在地功能強大的Naver地圖或Kakao地圖，例如公車到站時間、室內地圖與評論。Kakao最近新增「專家檔案」功能，把用戶和烘焙師、花藝師、搬家業者等在地專家連結起來。

Naver與Kakao深知Google是強勁對手，因此加入真實照片、評論與在地資訊等「體驗資料」來留住用戶。對來韓旅客而言，這項改變或許終於讓Google地圖更好用；當地人則會繼續使用最熟悉的本土應用。$a4$,
$a4$Las dos mayores empresas de internet de Corea del Sur, Naver y Kakao, están reforzando sus aplicaciones de mapas para competir con Google Maps. El impulso llega tras la decisión del gobierno, en 2026, de permitir que Google exporte datos cartográficos de alta precisión de Corea, algo que podría hacer que Google Maps funcione mejor en el país por primera vez.

Durante años, Google Maps ha estado limitado en Corea del Sur porque el gobierno no permitía sacar del país los datos detallados de mapas por motivos de seguridad. Por eso la mayoría de los coreanos usan Naver Map o Kakao Map, con potentes funciones locales como horarios de autobús, mapas de interiores y reseñas. Kakao añadió hace poco una función de 'Perfil de Experto' que conecta a los usuarios con especialistas locales, como panaderos, floristas y empresas de mudanzas.

Naver y Kakao saben que Google es un rival poderoso, así que están sumando 'datos de experiencia' —fotos reales, reseñas y consejos locales— para retener a sus usuarios. Para quienes visitan Corea, el cambio quizá haga por fin más útil a Google Maps, mientras los locales siguen confiando en las apps nacionales que mejor conocen.$a4$,
$a4$Südkoreas zwei größte Internetkonzerne, Naver und Kakao, rüsten ihre Karten-Apps auf, um mit Google Maps zu konkurrieren. Anlass ist die Entscheidung der Regierung von 2026, Google den Export hochpräziser koreanischer Kartendaten zu erlauben – was Google Maps im Land erstmals besser funktionieren lassen könnte.

Jahrelang war Google Maps in Südkorea eingeschränkt, weil die Regierung detaillierte Kartendaten aus Sicherheitsgründen nicht außer Landes ließ. Die meisten Koreaner nutzen daher Naver Map oder Kakao Map mit starken lokalen Funktionen wie Bus-Ankunftszeiten, Innenraumkarten und Bewertungen. Kakao fügte kürzlich eine 'Experten-Profil'-Funktion hinzu, die Nutzer mit lokalen Fachleuten wie Bäckern, Floristen und Umzugsfirmen verbindet.

Naver und Kakao wissen, dass Google ein starker Rivale ist, und ergänzen daher 'Erlebnisdaten' – echte Fotos, Bewertungen und lokale Tipps –, um ihre Nutzer zu halten. Für Korea-Reisende könnte Google Maps dadurch endlich nützlicher werden, während Einheimische weiter auf die vertrauten heimischen Apps setzen.$a4$,
$a4$Les deux plus grandes entreprises internet de Corée du Sud, Naver et Kakao, renforcent leurs applications de cartes pour concurrencer Google Maps. Ce mouvement fait suite à la décision du gouvernement, en 2026, d'autoriser Google à exporter des données cartographiques coréennes de haute précision, ce qui pourrait rendre Google Maps plus performant dans le pays pour la première fois.

Pendant des années, Google Maps a été limité en Corée du Sud car le gouvernement n'autorisait pas la sortie des données cartographiques détaillées, pour des raisons de sécurité. La plupart des Coréens utilisent donc Naver Map ou Kakao Map, riches en fonctions locales comme les horaires de bus, les plans d'intérieur et les avis. Kakao a récemment ajouté une fonction 'Profil d'expert' qui met les utilisateurs en relation avec des spécialistes locaux, comme des boulangers, des fleuristes et des déménageurs.

Naver et Kakao savent que Google est un rival puissant : ils ajoutent donc des 'données d'expérience' — vraies photos, avis et conseils locaux — pour retenir leurs utilisateurs. Pour les visiteurs en Corée, ce changement pourrait enfin rendre Google Maps plus utile, tandis que les habitants continueront de s'appuyer sur les applications nationales qu'ils connaissent le mieux.$a4$,
$a4$Hai công ty internet lớn nhất Hàn Quốc, Naver và Kakao, đang nâng cấp ứng dụng bản đồ để cạnh tranh với Google Maps. Động thái này diễn ra sau khi chính phủ quyết định vào năm 2026 cho phép Google xuất dữ liệu bản đồ độ chính xác cao của Hàn Quốc, điều có thể giúp Google Maps hoạt động tốt hơn ở nước này lần đầu tiên.

Trong nhiều năm, Google Maps bị hạn chế ở Hàn Quốc vì chính phủ không cho phép đưa dữ liệu bản đồ chi tiết ra nước ngoài vì lý do an ninh. Vì vậy hầu hết người Hàn dùng Naver Map hoặc Kakao Map, vốn mạnh về tính năng địa phương như giờ xe buýt đến, bản đồ trong nhà và đánh giá. Kakao gần đây thêm tính năng 'Hồ sơ chuyên gia' kết nối người dùng với các chuyên gia địa phương như thợ làm bánh, người bán hoa và dịch vụ chuyển nhà.

Naver và Kakao biết Google là đối thủ mạnh, nên họ bổ sung 'dữ liệu trải nghiệm' — ảnh thật, đánh giá và mẹo địa phương — để giữ chân người dùng. Với du khách đến Hàn Quốc, thay đổi này có thể khiến Google Maps cuối cùng hữu ích hơn, trong khi người dân địa phương vẫn dựa vào các ứng dụng nội địa quen thuộc.$a4$,
$a4$สองบริษัทอินเทอร์เน็ตที่ใหญ่ที่สุดของเกาหลีใต้อย่าง Naver และ Kakao กำลังอัปเกรดแอปแผนที่เพื่อแข่งขันกับ Google Maps ความเคลื่อนไหวนี้เกิดขึ้นหลังรัฐบาลตัดสินใจในปี 2026 อนุญาตให้ Google ส่งออกข้อมูลแผนที่ความละเอียดสูงของเกาหลี ซึ่งอาจทำให้ Google Maps ใช้งานได้ดีขึ้นในประเทศเป็นครั้งแรก

หลายปีที่ผ่านมา Google Maps ถูกจำกัดในเกาหลีใต้ เพราะรัฐบาลไม่อนุญาตให้นำข้อมูลแผนที่ละเอียดออกนอกประเทศด้วยเหตุผลด้านความมั่นคง คนเกาหลีส่วนใหญ่จึงใช้ Naver Map หรือ Kakao Map ที่มีฟังก์ชันในพื้นที่แข็งแกร่ง เช่น เวลารถบัสมาถึง แผนที่ในอาคาร และรีวิว ล่าสุด Kakao เพิ่มฟีเจอร์ 'โปรไฟล์ผู้เชี่ยวชาญ' ที่เชื่อมผู้ใช้กับผู้เชี่ยวชาญในพื้นที่ เช่น คนทำขนมปัง ร้านดอกไม้ และบริการขนย้ายบ้าน

Naver และ Kakao รู้ดีว่า Google เป็นคู่แข่งที่แข็งแกร่ง จึงเพิ่ม 'ข้อมูลประสบการณ์' เช่น รูปถ่ายจริง รีวิว และเคล็ดลับในพื้นที่ เพื่อรักษาผู้ใช้ไว้ สำหรับนักท่องเที่ยวที่มาเกาหลี การเปลี่ยนแปลงนี้อาจทำให้ Google Maps ใช้งานได้ดีขึ้นในที่สุด ขณะที่คนท้องถิ่นยังคงใช้แอปสัญชาติเกาหลีที่คุ้นเคยที่สุด$a4$,
$a4$Dua perusahaan internet terbesar Korea Selatan, Naver dan Kakao, sedang meningkatkan aplikasi peta mereka untuk bersaing dengan Google Maps. Dorongan ini muncul setelah pemerintah memutuskan pada 2026 untuk mengizinkan Google mengekspor data peta presisi tinggi Korea, yang bisa membuat Google Maps bekerja lebih baik di negara itu untuk pertama kalinya.

Selama bertahun-tahun, Google Maps terbatas di Korea Selatan karena pemerintah tidak mengizinkan data peta terperinci keluar dari negara itu demi alasan keamanan. Karena itu sebagian besar warga Korea memakai Naver Map atau Kakao Map, yang punya fitur lokal kuat seperti waktu kedatangan bus, peta dalam ruangan, dan ulasan. Kakao baru-baru ini menambah fitur 'Profil Ahli' yang menghubungkan pengguna dengan spesialis lokal, seperti pembuat roti, perangkai bunga, dan jasa pindahan.

Naver dan Kakao tahu Google adalah pesaing kuat, jadi mereka menambahkan 'data pengalaman' — foto asli, ulasan, dan tip lokal — untuk mempertahankan pengguna. Bagi wisatawan ke Korea, perubahan ini mungkin akhirnya membuat Google Maps lebih berguna, sementara warga lokal tetap mengandalkan aplikasi buatan dalam negeri yang paling mereka kenal.$a4$,
$a4$Naver and Kakao are upgrading their map apps in 2026 to fend off Google Maps after Korea agreed to let Google export high-precision map data.$a4$,
$a4$Naver Map, Kakao Map, Google Maps Korea, map data export, Korean tech apps, navigation apps$a4$,
'beginner',
3, 4, 4,
$a4$[
{"word":"지도","reading":"jido","reading_ja":"チド","part_of_speech":"noun","definition_en":"map","definition_ja":"地図","definition_zh_tw":"地圖","definition_es":"mapa","definition_de":"Karte; Landkarte","definition_fr":"carte","definition_vi":"bản đồ","definition_th":"แผนที่","definition_id":"peta","example_ko":"저는 카카오 지도를 자주 써요.","example_en":"I often use Kakao Map.","example_ja":"私はよくカカオマップを使います。","example_zh_tw":"我常用Kakao地圖。","example_es":"Uso a menudo Kakao Map.","example_de":"Ich benutze oft Kakao Map.","example_fr":"J'utilise souvent Kakao Map.","example_vi":"Tôi thường dùng Kakao Map.","example_th":"ฉันใช้ Kakao Map บ่อย","example_id":"Saya sering memakai Kakao Map."},
{"word":"앱","reading":"aep","reading_ja":"エプ","part_of_speech":"noun","definition_en":"app (mobile application)","definition_ja":"アプリ","definition_zh_tw":"應用程式；App","definition_es":"aplicación; app","definition_de":"App","definition_fr":"appli; application","definition_vi":"ứng dụng; app","definition_th":"แอป (แอปพลิเคชัน)","definition_id":"aplikasi; app","example_ko":"이 앱은 사용하기 쉬워요.","example_en":"This app is easy to use.","example_ja":"このアプリは使いやすいです。","example_zh_tw":"這個App很好用。","example_es":"Esta app es fácil de usar.","example_de":"Diese App ist einfach zu bedienen.","example_fr":"Cette appli est facile à utiliser.","example_vi":"Ứng dụng này dễ dùng.","example_th":"แอปนี้ใช้งานง่าย","example_id":"Aplikasi ini mudah digunakan."},
{"word":"검색","reading":"geomsaek","reading_ja":"コムセク","part_of_speech":"noun","definition_en":"search (looking up information)","definition_ja":"検索","definition_zh_tw":"搜尋","definition_es":"búsqueda","definition_de":"Suche","definition_fr":"recherche","definition_vi":"tìm kiếm","definition_th":"การค้นหา","definition_id":"pencarian","example_ko":"지도 앱에서 식당을 검색했어요.","example_en":"I searched for a restaurant in the map app.","example_ja":"地図アプリでレストランを検索しました。","example_zh_tw":"我在地圖App裡搜尋餐廳。","example_es":"Busqué un restaurante en la app de mapas.","example_de":"Ich habe in der Karten-App ein Restaurant gesucht.","example_fr":"J'ai cherché un restaurant dans l'appli de cartes.","example_vi":"Tôi đã tìm một nhà hàng trong ứng dụng bản đồ.","example_th":"ฉันค้นหาร้านอาหารในแอปแผนที่","example_id":"Saya mencari restoran di aplikasi peta."},
{"word":"경쟁하다","reading":"gyeongjaenghada","reading_ja":"キョンジェンハダ","part_of_speech":"verb","definition_en":"to compete","definition_ja":"競争する","definition_zh_tw":"競爭","definition_es":"competir","definition_de":"konkurrieren; wetteifern","definition_fr":"concurrencer; rivaliser","definition_vi":"cạnh tranh","definition_th":"แข่งขัน","definition_id":"bersaing","example_ko":"두 회사가 서로 경쟁한다.","example_en":"The two companies compete with each other.","example_ja":"二つの会社は互いに競争している。","example_zh_tw":"兩家公司互相競爭。","example_es":"Las dos empresas compiten entre sí.","example_de":"Die beiden Firmen konkurrieren miteinander.","example_fr":"Les deux entreprises se font concurrence.","example_vi":"Hai công ty cạnh tranh với nhau.","example_th":"สองบริษัทแข่งขันกัน","example_id":"Kedua perusahaan itu saling bersaing."},
{"word":"기능","reading":"gineung","reading_ja":"キヌン","part_of_speech":"noun","definition_en":"feature; function","definition_ja":"機能","definition_zh_tw":"功能","definition_es":"función; característica","definition_de":"Funktion","definition_fr":"fonction; fonctionnalité","definition_vi":"tính năng; chức năng","definition_th":"ฟังก์ชัน; ฟีเจอร์","definition_id":"fitur; fungsi","example_ko":"새 기능이 아주 편리해요.","example_en":"The new feature is very convenient.","example_ja":"新しい機能はとても便利です。","example_zh_tw":"新功能非常方便。","example_es":"La nueva función es muy práctica.","example_de":"Die neue Funktion ist sehr praktisch.","example_fr":"La nouvelle fonction est très pratique.","example_vi":"Tính năng mới rất tiện lợi.","example_th":"ฟีเจอร์ใหม่สะดวกมาก","example_id":"Fitur baru itu sangat praktis."}
]$a4$::jsonb,
'published', true, 0,
'2026-06-12T23:00:00Z', '2026-06-12T23:00:00Z', '2026-06-12T23:00:00Z'
);

-- Article 5 — 2026-06-14 food intermediate — Seoul Food 2026 trade show & K-food export boom
INSERT INTO articles (topic_id, slug, title_en, title_ko, title_ja, title_zh_tw, title_es, title_de, title_fr, title_vi, title_th, title_id, summary_en, summary_ko, summary_ja, summary_zh_tw, summary_es, summary_de, summary_fr, summary_vi, summary_th, summary_id, content_en, content_ko, content_ja, content_zh_tw, content_es, content_de, content_fr, content_vi, content_th, content_id, seo_description, seo_keywords, level, reading_time_en, reading_time_ko, reading_time_ja, vocabulary, status, ai_generated, view_count, published_at, created_at, updated_at) VALUES (
(SELECT id FROM topics WHERE slug = 'food'),
'food-2026-06-14',
$a5$Seoul Food 2026 Trade Show Spotlights K-Food's Export Boom$a5$,
$a5$서울 푸드 2026, K-푸드 수출 열기 조명$a5$,
$a5$ソウルフード2026、K-フードの輸出好調に脚光$a5$,
$a5$首爾食品展2026 聚焦韓食出口熱潮$a5$,
$a5$La feria Seoul Food 2026 destaca el auge exportador del K-food$a5$,
$a5$Messe Seoul Food 2026 rückt K-Food-Exportboom ins Licht$a5$,
$a5$Le salon Seoul Food 2026 met en lumière l'essor du K-food$a5$,
$a5$Hội chợ Seoul Food 2026 làm nổi bật bùng nổ xuất khẩu K-food$a5$,
$a5$งาน Seoul Food 2026 ฉายภาพการส่งออกอาหารเกาหลีที่พุ่งแรง$a5$,
$a5$Pameran Seoul Food 2026 Soroti Ledakan Ekspor K-Food$a5$,
$a5$Seoul Food 2026 ran June 9–12 at KINTEX near Seoul, gathering 1,650 companies from 45 countries to promote Korean food exports. K-food sales hit a record $13.62 billion in 2025, led by a 22% jump in ramyeon exports.$a5$,
$a5$서울 푸드 2026이 6월 9일부터 12일까지 서울 근교 킨텍스에서 열려, 45개국 1650개 기업이 모여 한국 식품 수출을 알렸다. 2025년 K-푸드 수출은 사상 최대인 136억 2천만 달러를 기록했고, 라면 수출이 22% 급증하며 이를 이끌었다.$a5$,
$a5$ソウルフード2026が6月9〜12日、ソウル近郊のKINTEXで開かれ、45か国1650社が集まって韓国食品の輸出をPRした。2025年のK-フード輸出は過去最高の136億2000万ドルを記録し、ラーメン輸出の22%増がけん引した。$a5$,
$a5$首爾食品展2026於6月9至12日在首爾近郊KINTEX舉行，45國1650家企業齊聚推廣韓國食品出口。2025年韓食出口創下136.2億美元新高，其中泡麵出口大增22%領軍。$a5$,
$a5$Seoul Food 2026 se celebró del 9 al 12 de junio en KINTEX, cerca de Seúl, reuniendo a 1.650 empresas de 45 países para promover las exportaciones de comida coreana. El K-food alcanzó un récord de 13.620 millones de dólares en 2025, con la ramyeon disparándose un 22%.$a5$,
$a5$Seoul Food 2026 fand vom 9. bis 12. Juni im KINTEX bei Seoul statt und versammelte 1.650 Firmen aus 45 Ländern, um koreanische Lebensmittelexporte zu bewerben. K-Food erreichte 2025 mit 13,62 Milliarden Dollar einen Rekord, angeführt von 22 % mehr Ramyeon-Exporten.$a5$,
$a5$Seoul Food 2026 s'est tenu du 9 au 12 juin au KINTEX, près de Séoul, réunissant 1 650 entreprises de 45 pays pour promouvoir les exportations alimentaires coréennes. Le K-food a atteint un record de 13,62 milliards de dollars en 2025, porté par un bond de 22 % des exportations de ramyeon.$a5$,
$a5$Seoul Food 2026 diễn ra từ 9 đến 12/6 tại KINTEX gần Seoul, quy tụ 1.650 công ty từ 45 nước để quảng bá xuất khẩu thực phẩm Hàn Quốc. K-food đạt kỷ lục 13,62 tỷ USD năm 2025, dẫn đầu là mức tăng 22% của mì gói.$a5$,
$a5$งาน Seoul Food 2026 จัดขึ้นวันที่ 9–12 มิถุนายน ที่ KINTEX ใกล้กรุงโซล รวม 1,650 บริษัทจาก 45 ประเทศเพื่อส่งเสริมการส่งออกอาหารเกาหลี ยอดส่งออก K-food แตะระดับสูงสุดที่ 1.362 หมื่นล้านดอลลาร์ในปี 2025 นำโดยบะหมี่กึ่งสำเร็จรูปที่โต 22%$a5$,
$a5$Seoul Food 2026 digelar 9–12 Juni di KINTEX dekat Seoul, mengumpulkan 1.650 perusahaan dari 45 negara untuk mempromosikan ekspor makanan Korea. K-food mencetak rekor 13,62 miliar dolar pada 2025, dipimpin lonjakan 22% ekspor ramyeon.$a5$,
$a5$Seoul Food 2026, one of Asia's largest food trade shows, ran from June 9 to 12 at the KINTEX convention center in Goyang, just outside Seoul. The 44th edition gathered about 1,650 companies from 45 countries, with the United States serving as this year's guest country of honor.

The fair doubles as a showcase for the government's 'K-food export' drive. Korean food and farm exports reached a record 13.62 billion US dollars in 2025, up 5.1 percent from the year before. Instant noodles led the way: ramyeon exports jumped 22 percent in a single year to a record 1.52 billion dollars, helped by global fans of spicy Korean brands.

This year's show leaned into technology, hosting a conference themed 'AI and Robotics: The Era of Food Tech Convergence.' Exhibitors displayed everything from cooking robots to smart packaging, reflecting how Korean companies are pairing traditional flavors with new tech to reach buyers abroad.

For the many overseas buyers who attended, the event was a chance to taste products and sign deals. K-food's rise has been powered partly by K-pop and K-dramas, which introduce foreign audiences to dishes like tteokbokki, kimchi, and Korean fried chicken before they ever visit Korea.$a5$,
$a5$아시아 최대 규모의 식품 박람회 중 하나인 서울 푸드 2026이 6월 9일부터 12일까지 서울 근교 고양시 킨텍스에서 열렸다. 44회째를 맞은 이번 행사에는 45개국에서 약 1650개 기업이 참가했으며, 올해의 주빈국은 미국이었다.

이 박람회는 정부의 'K-푸드 수출' 정책을 알리는 자리이기도 하다. 2025년 한국의 식품·농산물 수출은 사상 최대인 136억 2천만 달러로 1년 전보다 5.1% 늘었다. 특히 라면이 앞장섰는데, 매운맛 한국 브랜드를 좋아하는 전 세계 팬들에 힘입어 라면 수출은 한 해 만에 22% 뛰어 사상 최대인 15억 2천만 달러를 기록했다.

올해 행사는 기술에 무게를 실어 'AI와 로봇: 푸드테크 융합의 시대'를 주제로 콘퍼런스를 열었다. 참가 업체들은 요리 로봇부터 스마트 포장까지 선보이며, 한국 기업이 전통의 맛과 새로운 기술을 결합해 해외 바이어를 공략하는 모습을 보여 줬다.

행사를 찾은 수많은 해외 바이어에게 이번 박람회는 제품을 맛보고 계약을 맺는 기회였다. K-푸드의 성장은 K-팝과 K-드라마의 힘도 컸다. 이들 콘텐츠가 떡볶이, 김치, 한국식 프라이드치킨 같은 음식을 외국 관객에게 미리 소개해 주기 때문이다.$a5$,
$a5$アジア最大級の食品見本市の一つ、ソウルフード2026が6月9日から12日まで、ソウル近郊の高陽市KINTEXで開かれた。44回目となる今回は45か国から約1650社が参加し、今年の主賓国はアメリカだった。

この見本市は、政府の「K-フード輸出」政策をアピールする場でもある。2025年の韓国の食品・農産物輸出は過去最高の136億2000万ドルで、前年より5.1%増えた。とりわけラーメンが先頭に立ち、辛い韓国ブランドを好む世界中のファンに支えられ、ラーメン輸出は一年で22%伸びて過去最高の15億2000万ドルを記録した。

今年のイベントは技術に重きを置き、「AIとロボット：フードテック融合の時代」をテーマに会議を開いた。出展企業は調理ロボットからスマート包装まで披露し、韓国企業が伝統の味と新技術を組み合わせて海外バイヤーに売り込む姿を見せた。

会場を訪れた多くの海外バイヤーにとって、このイベントは商品を試食し契約を結ぶ機会となった。K-フードの成長にはK-POPやK-ドラマの力も大きい。こうした作品が、トッポッキやキムチ、韓国式フライドチキンといった料理を外国の視聴者に先に紹介してくれるからだ。$a5$,
$a5$亞洲規模最大的食品展之一「首爾食品展2026」於6月9日至12日在首爾近郊高陽市的KINTEX舉行。邁入第44屆的本屆展會，共有來自45國約1650家企業參展，今年的主賓國是美國。

這場展會同時是政府「韓食出口」政策的宣傳舞台。2025年韓國食品與農產品出口創下136.2億美元新高，較前一年成長5.1%。其中泡麵一馬當先，在全球喜愛韓式辣味品牌的粉絲帶動下，泡麵出口一年內大增22%，創下15.2億美元的新紀錄。

今年展會側重科技，以「AI與機器人：食品科技融合的時代」為主題舉辦論壇。參展業者展出從烹飪機器人到智慧包裝的各種產品，展現韓國企業如何結合傳統風味與新技術，開拓海外買家。

對眾多到場的海外買家而言，這場活動是試吃產品、洽談合約的機會。韓食的崛起也大大受惠於K-pop與韓劇，因為這些作品讓外國觀眾在造訪韓國前，就先認識了辣炒年糕、泡菜與韓式炸雞等美食。$a5$,
$a5$Seoul Food 2026, una de las mayores ferias de alimentación de Asia, se celebró del 9 al 12 de junio en el centro de convenciones KINTEX, en Goyang, a las afueras de Seúl. La 44ª edición reunió a unas 1.650 empresas de 45 países, con Estados Unidos como país invitado de honor de este año.

La feria funciona también como escaparate de la política de 'exportación de K-food' del gobierno. Las exportaciones coreanas de alimentos y productos agrícolas alcanzaron un récord de 13.620 millones de dólares en 2025, un 5,1% más que el año anterior. Los fideos instantáneos encabezaron el avance: las exportaciones de ramyeon subieron un 22% en un solo año hasta un récord de 1.520 millones de dólares, impulsadas por los fans mundiales de las marcas picantes coreanas.

La edición de este año apostó por la tecnología y acogió una conferencia titulada 'IA y robótica: la era de la convergencia del food tech'. Los expositores mostraron desde robots de cocina hasta envases inteligentes, reflejando cómo las empresas coreanas combinan sabores tradicionales con nuevas tecnologías para conquistar a los compradores extranjeros.

Para los numerosos compradores internacionales que asistieron, el evento fue una oportunidad de probar productos y cerrar acuerdos. El auge del K-food se ha visto impulsado en parte por el K-pop y los K-dramas, que presentan al público extranjero platos como el tteokbokki, el kimchi y el pollo frito coreano antes incluso de que visiten Corea.$a5$,
$a5$Seoul Food 2026, eine der größten Lebensmittelmessen Asiens, fand vom 9. bis 12. Juni im Messezentrum KINTEX in Goyang am Rande Seouls statt. Die 44. Ausgabe versammelte rund 1.650 Unternehmen aus 45 Ländern, Ehrengastland war in diesem Jahr die USA.

Die Messe dient zugleich als Schaufenster für die 'K-Food-Export'-Politik der Regierung. Koreas Ausfuhren von Lebensmitteln und Agrarprodukten erreichten 2025 mit 13,62 Milliarden Dollar einen Rekord, 5,1 Prozent mehr als im Vorjahr. Instantnudeln führten die Entwicklung an: Die Ramyeon-Exporte sprangen binnen eines Jahres um 22 Prozent auf einen Rekordwert von 1,52 Milliarden Dollar, getragen von weltweiten Fans scharfer koreanischer Marken.

Die diesjährige Ausgabe setzte auf Technik und veranstaltete eine Konferenz zum Thema 'KI und Robotik: Das Zeitalter der Food-Tech-Konvergenz'. Aussteller zeigten von Kochrobotern bis zu intelligenter Verpackung alles Mögliche und verdeutlichten, wie koreanische Firmen traditionelle Aromen mit neuer Technik verbinden, um Käufer im Ausland zu gewinnen.

Für die vielen angereisten internationalen Einkäufer war die Veranstaltung eine Gelegenheit, Produkte zu probieren und Verträge abzuschließen. Der Aufstieg des K-Food wird auch von K-Pop und K-Dramen befeuert, die dem ausländischen Publikum Gerichte wie Tteokbokki, Kimchi und koreanisches Brathähnchen näherbringen, noch bevor es Korea besucht.$a5$,
$a5$Seoul Food 2026, l'un des plus grands salons alimentaires d'Asie, s'est tenu du 9 au 12 juin au centre de congrès KINTEX, à Goyang, en périphérie de Séoul. La 44e édition a réuni environ 1 650 entreprises de 45 pays, les États-Unis étant le pays invité d'honneur cette année.

Le salon fait aussi office de vitrine pour la politique d'exportation du 'K-food' menée par le gouvernement. Les exportations coréennes de produits alimentaires et agricoles ont atteint un record de 13,62 milliards de dollars en 2025, soit 5,1 % de plus qu'un an auparavant. Les nouilles instantanées ont mené la danse : les exportations de ramyeon ont bondi de 22 % en un an, à un record de 1,52 milliard de dollars, portées par les amateurs de marques coréennes épicées dans le monde entier.

L'édition de cette année a misé sur la technologie, avec une conférence intitulée 'IA et robotique : l'ère de la convergence de la food tech'. Les exposants ont présenté aussi bien des robots cuisiniers que des emballages intelligents, illustrant comment les entreprises coréennes associent saveurs traditionnelles et nouvelles technologies pour séduire les acheteurs étrangers.

Pour les nombreux acheteurs internationaux présents, l'événement a été l'occasion de goûter des produits et de conclure des accords. L'essor du K-food doit aussi beaucoup à la K-pop et aux K-dramas, qui font découvrir au public étranger des plats comme le tteokbokki, le kimchi et le poulet frit coréen avant même qu'il ne visite la Corée.$a5$,
$a5$Seoul Food 2026, một trong những hội chợ thực phẩm lớn nhất châu Á, diễn ra từ ngày 9 đến 12 tháng 6 tại trung tâm hội nghị KINTEX ở Goyang, ngoại ô Seoul. Kỳ thứ 44 này quy tụ khoảng 1.650 công ty từ 45 quốc gia, với Hoa Kỳ là quốc gia khách mời danh dự năm nay.

Hội chợ cũng là nơi trưng bày chính sách 'xuất khẩu K-food' của chính phủ. Xuất khẩu thực phẩm và nông sản của Hàn Quốc đạt mức kỷ lục 13,62 tỷ USD năm 2025, tăng 5,1% so với năm trước. Mì gói dẫn đầu: xuất khẩu ramyeon tăng vọt 22% chỉ trong một năm lên mức kỷ lục 1,52 tỷ USD, nhờ người hâm mộ các thương hiệu cay Hàn Quốc trên khắp thế giới.

Kỳ hội chợ năm nay chú trọng công nghệ, tổ chức hội nghị với chủ đề 'AI và Robot: Kỷ nguyên hội tụ công nghệ thực phẩm'. Các đơn vị trưng bày mọi thứ từ robot nấu ăn đến bao bì thông minh, phản ánh cách doanh nghiệp Hàn Quốc kết hợp hương vị truyền thống với công nghệ mới để chinh phục người mua ở nước ngoài.

Với nhiều nhà nhập khẩu quốc tế tham dự, sự kiện là cơ hội nếm thử sản phẩm và ký kết hợp đồng. Sự vươn lên của K-food một phần nhờ K-pop và phim Hàn, vốn giới thiệu cho khán giả nước ngoài những món như tteokbokki, kimchi và gà rán kiểu Hàn trước cả khi họ đến Hàn Quốc.$a5$,
$a5$Seoul Food 2026 หนึ่งในงานแสดงสินค้าอาหารที่ใหญ่ที่สุดในเอเชีย จัดขึ้นวันที่ 9 ถึง 12 มิถุนายน ที่ศูนย์ประชุม KINTEX ในเมืองโกยาง ชานกรุงโซล งานครั้งที่ 44 นี้รวบรวมบริษัทราว 1,650 แห่งจาก 45 ประเทศ โดยมีสหรัฐอเมริกาเป็นประเทศแขกรับเชิญเกียรติยศประจำปีนี้

งานนี้ยังเป็นเวทีโชว์นโยบาย 'ส่งออกอาหารเกาหลี' ของรัฐบาลด้วย การส่งออกอาหารและสินค้าเกษตรของเกาหลีแตะระดับสูงสุดที่ 1.362 หมื่นล้านดอลลาร์ในปี 2025 เพิ่มขึ้น 5.1% จากปีก่อน บะหมี่กึ่งสำเร็จรูปเป็นตัวนำ โดยการส่งออกรามยอนพุ่งขึ้น 22% ในปีเดียวสู่ระดับสูงสุด 1.52 พันล้านดอลลาร์ ด้วยแรงหนุนจากแฟน ๆ แบรนด์รสเผ็ดเกาหลีทั่วโลก

งานปีนี้เน้นเทคโนโลยี โดยจัดประชุมภายใต้หัวข้อ 'AI และหุ่นยนต์: ยุคแห่งการหลอมรวมฟู้ดเทค' ผู้ออกบูทนำเสนอตั้งแต่หุ่นยนต์ทำอาหารไปจนถึงบรรจุภัณฑ์อัจฉริยะ สะท้อนวิธีที่บริษัทเกาหลีผสานรสชาติดั้งเดิมกับเทคโนโลยีใหม่เพื่อเข้าถึงผู้ซื้อในต่างประเทศ

สำหรับผู้ซื้อจากต่างประเทศจำนวนมากที่มาร่วมงาน นี่เป็นโอกาสได้ชิมสินค้าและทำสัญญา การเติบโตของอาหารเกาหลีส่วนหนึ่งมาจากพลังของ K-pop และซีรีส์เกาหลี ที่แนะนำเมนูอย่างต๊อกโบกี กิมจิ และไก่ทอดเกาหลีให้ผู้ชมต่างชาติรู้จักก่อนจะได้ไปเยือนเกาหลีเสียอีก$a5$,
$a5$Seoul Food 2026, salah satu pameran makanan terbesar di Asia, berlangsung 9 hingga 12 Juni di pusat konvensi KINTEX di Goyang, pinggiran Seoul. Edisi ke-44 ini mengumpulkan sekitar 1.650 perusahaan dari 45 negara, dengan Amerika Serikat sebagai negara tamu kehormatan tahun ini.

Pameran ini sekaligus menjadi etalase kebijakan 'ekspor K-food' pemerintah. Ekspor makanan dan produk pertanian Korea mencapai rekor 13,62 miliar dolar AS pada 2025, naik 5,1 persen dari tahun sebelumnya. Mi instan memimpin: ekspor ramyeon melonjak 22 persen hanya dalam setahun ke rekor 1,52 miliar dolar, didorong penggemar merek pedas Korea di seluruh dunia.

Edisi tahun ini menonjolkan teknologi, dengan menggelar konferensi bertema 'AI dan Robotika: Era Konvergensi Food Tech'. Peserta pameran menampilkan mulai dari robot memasak hingga kemasan pintar, mencerminkan bagaimana perusahaan Korea memadukan cita rasa tradisional dengan teknologi baru untuk meraih pembeli di luar negeri.

Bagi banyak pembeli internasional yang hadir, acara ini menjadi kesempatan mencicipi produk dan menandatangani kesepakatan. Kebangkitan K-food sebagian didorong oleh K-pop dan drama Korea, yang memperkenalkan hidangan seperti tteokbokki, kimchi, dan ayam goreng Korea kepada penonton asing bahkan sebelum mereka mengunjungi Korea.$a5$,
$a5$Seoul Food 2026 ran June 9–12 at KINTEX, drawing 1,650 companies from 45 countries as Korean food exports hit a record $13.62 billion, led by ramyeon.$a5$,
$a5$Seoul Food 2026, K-food export, KINTEX, ramyeon exports, Korean food fair, food tech$a5$,
'intermediate',
3, 4, 4,
$a5$[
{"word":"수출","reading":"suchul","reading_ja":"スチュル","part_of_speech":"noun","definition_en":"export (sending goods abroad)","definition_ja":"輸出","definition_zh_tw":"出口；外銷","definition_es":"exportación","definition_de":"Export; Ausfuhr","definition_fr":"exportation","definition_vi":"xuất khẩu","definition_th":"การส่งออก","definition_id":"ekspor","example_ko":"라면 수출이 크게 늘었다.","example_en":"Ramyeon exports have grown a lot.","example_ja":"ラーメンの輸出が大きく増えた。","example_zh_tw":"泡麵出口大幅增加。","example_es":"Las exportaciones de ramyeon han crecido mucho.","example_de":"Die Ramyeon-Exporte sind stark gestiegen.","example_fr":"Les exportations de ramyeon ont beaucoup augmenté.","example_vi":"Xuất khẩu mì gói đã tăng mạnh.","example_th":"การส่งออกรามยอนเพิ่มขึ้นมาก","example_id":"Ekspor ramyeon meningkat pesat."},
{"word":"박람회","reading":"bangnamhoe","reading_ja":"パンナムフェ","part_of_speech":"noun","definition_en":"trade fair; exposition","definition_ja":"博覧会；見本市","definition_zh_tw":"博覽會；展會","definition_es":"feria; exposición","definition_de":"Messe; Ausstellung","definition_fr":"salon; foire","definition_vi":"hội chợ; triển lãm","definition_th":"งานแสดงสินค้า; นิทรรศการ","definition_id":"pameran; ekspo","example_ko":"식품 박람회에 많은 사람이 왔다.","example_en":"Many people came to the food fair.","example_ja":"食品見本市に多くの人が来た。","example_zh_tw":"很多人來參觀食品博覽會。","example_es":"Mucha gente vino a la feria de alimentación.","example_de":"Viele Menschen kamen zur Lebensmittelmesse.","example_fr":"Beaucoup de gens sont venus au salon de l'alimentation.","example_vi":"Nhiều người đến hội chợ thực phẩm.","example_th":"มีคนจำนวนมากมางานแสดงสินค้าอาหาร","example_id":"Banyak orang datang ke pameran makanan."},
{"word":"식품","reading":"sikpum","reading_ja":"シクプム","part_of_speech":"noun","definition_en":"food product; foodstuff","definition_ja":"食品","definition_zh_tw":"食品","definition_es":"producto alimenticio; alimentos","definition_de":"Lebensmittel","definition_fr":"produit alimentaire; denrée","definition_vi":"thực phẩm","definition_th":"ผลิตภัณฑ์อาหาร","definition_id":"produk pangan; makanan","example_ko":"이 회사는 냉동 식품을 만든다.","example_en":"This company makes frozen food.","example_ja":"この会社は冷凍食品を作っている。","example_zh_tw":"這家公司生產冷凍食品。","example_es":"Esta empresa fabrica alimentos congelados.","example_de":"Diese Firma stellt Tiefkühlkost her.","example_fr":"Cette entreprise fabrique des produits surgelés.","example_vi":"Công ty này sản xuất thực phẩm đông lạnh.","example_th":"บริษัทนี้ผลิตอาหารแช่แข็ง","example_id":"Perusahaan ini membuat makanan beku."},
{"word":"라면","reading":"ramyeon","reading_ja":"ラミョン","part_of_speech":"noun","definition_en":"ramyeon; Korean instant noodles","definition_ja":"ラーメン（韓国式インスタント麺）","definition_zh_tw":"泡麵（韓式速食麵）","definition_es":"ramyeon; fideos instantáneos coreanos","definition_de":"Ramyeon; koreanische Instantnudeln","definition_fr":"ramyeon; nouilles instantanées coréennes","definition_vi":"ramyeon; mì gói Hàn Quốc","definition_th":"รามยอน; บะหมี่กึ่งสำเร็จรูปเกาหลี","definition_id":"ramyeon; mi instan Korea","example_ko":"매운 라면이 외국에서 인기가 많다.","example_en":"Spicy ramyeon is very popular abroad.","example_ja":"辛いラーメンは海外で人気がある。","example_zh_tw":"辣味泡麵在國外很受歡迎。","example_es":"El ramyeon picante es muy popular en el extranjero.","example_de":"Scharfes Ramyeon ist im Ausland sehr beliebt.","example_fr":"Le ramyeon épicé est très populaire à l'étranger.","example_vi":"Mì ramyeon cay rất được ưa chuộng ở nước ngoài.","example_th":"รามยอนรสเผ็ดได้รับความนิยมมากในต่างประเทศ","example_id":"Ramyeon pedas sangat populer di luar negeri."},
{"word":"성장하다","reading":"seongjanghada","reading_ja":"ソンジャンハダ","part_of_speech":"verb","definition_en":"to grow; to expand","definition_ja":"成長する","definition_zh_tw":"成長；增長","definition_es":"crecer; expandirse","definition_de":"wachsen; sich ausweiten","definition_fr":"croître; se développer","definition_vi":"tăng trưởng; phát triển","definition_th":"เติบโต; ขยายตัว","definition_id":"tumbuh; berkembang","example_ko":"한국 식품 시장이 빠르게 성장하고 있다.","example_en":"The Korean food market is growing quickly.","example_ja":"韓国の食品市場は急速に成長している。","example_zh_tw":"韓國食品市場正快速成長。","example_es":"El mercado de alimentos coreano crece rápidamente.","example_de":"Der koreanische Lebensmittelmarkt wächst schnell.","example_fr":"Le marché alimentaire coréen croît rapidement.","example_vi":"Thị trường thực phẩm Hàn Quốc đang tăng trưởng nhanh.","example_th":"ตลาดอาหารเกาหลีกำลังเติบโตอย่างรวดเร็ว","example_id":"Pasar makanan Korea tumbuh dengan cepat."}
]$a5$::jsonb,
'published', true, 0,
'2026-06-13T23:00:00Z', '2026-06-13T23:00:00Z', '2026-06-13T23:00:00Z'
);

-- Article 6 — 2026-06-15 sports advanced — KBO baseball 5 million fans record pace
INSERT INTO articles (topic_id, slug, title_en, title_ko, title_ja, title_zh_tw, title_es, title_de, title_fr, title_vi, title_th, title_id, summary_en, summary_ko, summary_ja, summary_zh_tw, summary_es, summary_de, summary_fr, summary_vi, summary_th, summary_id, content_en, content_ko, content_ja, content_zh_tw, content_es, content_de, content_fr, content_vi, content_th, content_id, seo_description, seo_keywords, level, reading_time_en, reading_time_ko, reading_time_ja, vocabulary, status, ai_generated, view_count, published_at, created_at, updated_at) VALUES (
(SELECT id FROM topics WHERE slug = 'sports'),
'sports-2026-06-15',
$a6$KBO Baseball Draws 5 Million Fans at Record Pace in 2026$a6$,
$a6$KBO 프로야구, 역대 최소 경기 만에 500만 관중 돌파$a6$,
$a6$KBOプロ野球、史上最速で観客500万人突破$a6$,
$a6$KBO職棒2026 以最快速度突破500萬觀眾$a6$,
$a6$El béisbol KBO alcanza 5 millones de espectadores a ritmo récord$a6$,
$a6$KBO-Baseball erreicht 2026 in Rekordtempo 5 Millionen Fans$a6$,
$a6$Le baseball KBO atteint 5 millions de spectateurs à un rythme record$a6$,
$a6$Bóng chày KBO đạt 5 triệu khán giả với tốc độ kỷ lục 2026$a6$,
$a6$เบสบอล KBO ทำสถิติเร็วสุด แตะ 5 ล้านผู้ชมปี 2026$a6$,
$a6$Bisbol KBO Tembus 5 Juta Penonton dengan Laju Rekor 2026$a6$,
$a6$The KBO baseball league passed 5 million spectators in early June 2026, the fastest ever, and is on track to beat last year's record 12.3 million. Clubs are averaging 18,077 fans a game, up 8 percent, with nine of 10 teams drawing bigger crowds.$a6$,
$a6$KBO 프로야구가 2026년 6월 초 역대 가장 빠르게 500만 관중을 넘어섰고, 지난해 세운 1230만 명 기록도 넘어설 기세다. 구단들은 경기당 평균 1만8077명을 모아 8% 늘었고, 10개 팀 중 9개 팀의 관중이 증가했다.$a6$,
$a6$KBOプロ野球が2026年6月初め、史上最速で観客500万人を突破し、昨季の記録1230万人も超える勢いだ。1試合平均は1万8077人で8%増、10球団のうち9球団で観客が増えている。$a6$,
$a6$KBO職棒於2026年6月初以史上最快速度突破500萬觀眾，並有望刷新去年1230萬人的紀錄。各隊場均1萬8077人、成長8%，10隊中有9隊觀眾人數增加。$a6$,
$a6$La liga de béisbol KBO superó los 5 millones de espectadores a principios de junio de 2026, su ritmo más rápido, y va camino de batir el récord de 12,3 millones del año pasado. Los clubes promedian 18.077 aficionados por partido, un 8% más, y nueve de diez equipos atraen más público.$a6$,
$a6$Die KBO-Baseballliga überschritt Anfang Juni 2026 so schnell wie nie 5 Millionen Zuschauer und ist auf Kurs, den Vorjahresrekord von 12,3 Millionen zu übertreffen. Die Klubs zählen im Schnitt 18.077 Fans pro Spiel, 8 Prozent mehr, neun von zehn Teams mit größerem Zulauf.$a6$,
$a6$La ligue de baseball KBO a dépassé les 5 millions de spectateurs début juin 2026, son rythme le plus rapide, et devrait battre le record de 12,3 millions de l'an dernier. Les clubs réunissent en moyenne 18 077 fans par match, en hausse de 8 %, neuf équipes sur dix attirant plus de monde.$a6$,
$a6$Giải bóng chày KBO vượt 5 triệu khán giả vào đầu tháng 6/2026, nhanh nhất từ trước tới nay, và đang trên đà phá kỷ lục 12,3 triệu của năm ngoái. Các đội trung bình 18.077 khán giả mỗi trận, tăng 8%, với 9 trong 10 đội hút đông người hơn.$a6$,
$a6$ลีกเบสบอล KBO ทะลุ 5 ล้านผู้ชมในต้นเดือนมิถุนายน 2026 ซึ่งเร็วที่สุดเท่าที่เคยมีมา และมีแนวโน้มทำลายสถิติ 12.3 ล้านคนของปีก่อน แต่ละสโมสรมีผู้ชมเฉลี่ย 18,077 คนต่อเกม เพิ่มขึ้น 8% โดย 9 ใน 10 ทีมมีผู้ชมมากขึ้น$a6$,
$a6$Liga bisbol KBO melampaui 5 juta penonton pada awal Juni 2026, tercepat sepanjang sejarah, dan berpeluang memecahkan rekor 12,3 juta tahun lalu. Klub rata-rata menarik 18.077 penonton per laga, naik 8 persen, dengan sembilan dari sepuluh tim menarik lebih banyak orang.$a6$,
$a6$South Korea's professional baseball league, the KBO, blew past 5 million spectators in early June 2026 — the fastest it has ever reached that mark. With clubs averaging 18,077 fans per game, up 8 percent from the same point last season, the league is on pace to surpass the single-season record of 12.3 million it set in 2025.

The surge is broad. Nine of the league's 10 clubs have drawn bigger crowds than a year ago, and sellouts are piling up — 218 by early July, threatening last season's record of 331. The KBO would go on to reach 7 million fans in just 388 games, again the fewest in league history.

Several forces are driving the boom. A younger, heavily female fan base has reshaped ballpark culture, turning games into social outings full of chants, themed merchandise, and food. Star players and a competitive title race add drama, while clubs have leaned into fan experience — cheer squads, mascots, and stadium food far removed from the hot-dog-and-beer template abroad.

Baseball has been South Korea's most popular team sport for decades, but the current wave is notable for how it blends sport with entertainment, much like K-pop concerts. For clubs, packed stands mean stronger ticket and sponsorship revenue; for the sport, a new generation of fans suggests the momentum may outlast a single hot season.$a6$,
$a6$한국 프로야구 KBO가 2026년 6월 초 관중 500만 명을 넘어섰다. 역대 가장 빠른 기록이다. 구단들은 경기당 평균 1만8077명을 모으며 지난해 같은 시점보다 8% 늘었고, 2025년에 세운 단일 시즌 최다 기록 1230만 명마저 넘어설 기세다.

열기는 폭넓다. 리그 10개 구단 중 9개 구단의 관중이 1년 전보다 늘었고, 매진 경기도 쌓이고 있다. 7월 초까지 매진이 218회에 이르러 지난 시즌 기록인 331회를 위협하고 있다. KBO는 이후 388경기 만에 700만 관중에 도달하는데, 이 역시 역대 최소 경기 기록이다.

붐을 이끄는 요인은 여러 가지다. 젊고 여성 비중이 높은 팬층이 야구장 문화를 바꿔, 경기는 응원과 굿즈, 먹거리로 가득한 사교의 장이 됐다. 스타 선수들과 치열한 우승 경쟁이 드라마를 더했고, 구단들도 응원단과 마스코트, 해외와는 사뭇 다른 다양한 구장 먹거리로 팬 경험에 공을 들였다.

야구는 수십 년간 한국에서 가장 인기 있는 단체 스포츠였지만, 지금의 흐름은 스포츠와 오락을 K-팝 콘서트처럼 결합한다는 점이 특징이다. 구단에는 가득 찬 관중석이 곧 입장권과 스폰서 수익 증가를 뜻하고, 종목 전체로 보면 새로운 세대의 팬은 이 열기가 한 시즌으로 끝나지 않을 수 있음을 보여 준다.$a6$,
$a6$韓国のプロ野球KBOが2026年6月初め、観客500万人を突破した。史上最速の記録だ。各球団は1試合平均1万8077人を集め、昨年の同時期より8%増え、2025年に打ち立てたシーズン最多記録の1230万人さえ超える勢いだ。

盛り上がりは幅広い。リーグ10球団のうち9球団で観客が前年より増え、満員試合も積み上がっている。7月初めまでに完売は218回に達し、昨季の記録331回を脅かしている。KBOはその後、388試合で700万人に到達したが、これも史上最少試合の記録だ。

ブームを支える要因は複数ある。若く女性の比率が高いファン層が球場文化を変え、試合は応援やグッズ、食べ物であふれる社交の場になった。スター選手と激しい優勝争いがドラマを加え、球団も応援団やマスコット、海外とはかなり異なる多彩な球場グルメでファン体験に力を入れている。

野球は数十年にわたり韓国で最も人気のあるチームスポーツだったが、今の流れは、K-POPのコンサートのようにスポーツと娯楽を融合させている点が特徴だ。球団にとって満員の観客席は入場料やスポンサー収入の増加を意味し、競技全体で見れば、新世代のファンはこの勢いが一シーズンで終わらない可能性を示している。$a6$,
$a6$韓國職棒KBO於2026年6月初突破500萬觀眾，創下史上最快紀錄。各隊場均聚集1萬8077名球迷，比去年同期成長8%，甚至有望超越2025年締造的單季最多1230萬人紀錄。

這股熱潮相當普遍。聯盟10支球隊中有9支觀眾人數較一年前增加，完售場次也不斷累積。到7月初，售罄場次已達218場，逼近上季331場的紀錄。KBO隨後在388場比賽內達到700萬觀眾，同樣是史上最少場次的紀錄。

推動熱潮的因素不只一項。年輕且女性比例偏高的球迷族群改變了球場文化，讓比賽成為充滿加油、周邊商品與美食的社交場合。明星球員與激烈的冠軍爭奪增添戲劇性，球隊也透過啦啦隊、吉祥物，以及與國外大不相同的多樣球場美食，用心經營球迷體驗。

棒球數十年來一直是韓國最受歡迎的團隊運動，但如今的趨勢特別之處，在於它像K-pop演唱會一樣把運動與娛樂融合。對球隊而言，爆滿的看台意味著門票與贊助收入增加；就整個項目來看，新世代球迷顯示這股氣勢或許不會只維持一個球季。$a6$,
$a6$La liga de béisbol profesional de Corea del Sur, la KBO, superó los 5 millones de espectadores a principios de junio de 2026, el ritmo más rápido de su historia. Con una media de 18.077 aficionados por partido, un 8% más que en el mismo punto de la temporada pasada, la liga va camino de rebasar el récord de 12,3 millones que estableció en 2025.

El impulso es amplio. Nueve de los diez clubes de la liga atraen a más público que hace un año, y las entradas agotadas se acumulan: 218 a principios de julio, amenazando el récord de 331 de la temporada anterior. La KBO llegaría después a 7 millones de aficionados en solo 388 partidos, de nuevo la menor cantidad de la historia.

Varias fuerzas alimentan el auge. Una afición más joven y con fuerte presencia femenina ha transformado la cultura del estadio, convirtiendo los partidos en salidas sociales llenas de cánticos, productos temáticos y comida. Las estrellas y una reñida lucha por el título aportan drama, mientras los clubes cuidan la experiencia del hincha con grupos de animación, mascotas y una oferta gastronómica muy distinta de la de otros países.

El béisbol ha sido durante décadas el deporte de equipo más popular de Corea del Sur, pero lo llamativo de la ola actual es cómo mezcla deporte y espectáculo, al estilo de los conciertos de K-pop. Para los clubes, las gradas llenas significan más ingresos por entradas y patrocinios; para el deporte, una nueva generación de aficionados sugiere que el impulso podría durar más que una sola temporada brillante.$a6$,
$a6$Südkoreas Profi-Baseballliga KBO überschritt Anfang Juni 2026 die Marke von 5 Millionen Zuschauern – so schnell wie nie zuvor. Mit durchschnittlich 18.077 Fans pro Spiel, 8 Prozent mehr als zum gleichen Zeitpunkt der Vorsaison, ist die Liga auf Kurs, den 2025 aufgestellten Saisonrekord von 12,3 Millionen zu übertreffen.

Der Aufschwung ist breit angelegt. Neun der zehn Klubs ziehen mehr Publikum an als vor einem Jahr, und ausverkaufte Spiele häufen sich: 218 bis Anfang Juli, was den Vorjahresrekord von 331 gefährdet. Die KBO erreichte später in nur 388 Spielen 7 Millionen Fans – wiederum die wenigsten Spiele der Ligageschichte.

Mehrere Kräfte treiben den Boom. Eine jüngere, stark weibliche Fangemeinde hat die Stadionkultur verändert und Spiele zu geselligen Ausflügen voller Anfeuerungsrufe, Themenartikel und Essen gemacht. Starspieler und ein enges Titelrennen sorgen für Dramatik, während die Klubs auf Fanerlebnis setzen – mit Cheerleadern, Maskottchen und einem Speisenangebot, das sich deutlich vom Ausland unterscheidet.

Baseball ist seit Jahrzehnten Südkoreas beliebtester Mannschaftssport, doch das Bemerkenswerte an der aktuellen Welle ist, wie sie Sport und Unterhaltung verbindet – ähnlich wie K-Pop-Konzerte. Für die Klubs bedeuten volle Ränge höhere Einnahmen aus Tickets und Sponsoring; für die Sportart deutet eine neue Generation von Fans darauf hin, dass der Schwung länger als eine einzige starke Saison anhalten könnte.$a6$,
$a6$La ligue professionnelle de baseball sud-coréenne, la KBO, a dépassé les 5 millions de spectateurs début juin 2026, au rythme le plus rapide de son histoire. Avec une moyenne de 18 077 spectateurs par match, en hausse de 8 % par rapport au même stade de la saison passée, la ligue est en passe de battre le record de 12,3 millions établi en 2025.

L'essor est général. Neuf des dix clubs de la ligue attirent plus de public qu'un an plus tôt, et les guichets fermés s'accumulent : 218 début juillet, menaçant le record de 331 de la saison précédente. La KBO atteindra ensuite 7 millions de spectateurs en seulement 388 matchs, là encore le total de matchs le plus faible de son histoire.

Plusieurs facteurs nourrissent le boom. Un public plus jeune et fortement féminin a transformé la culture des stades, faisant des matchs des sorties sociales pleines de chants, de produits dérivés et de nourriture. Les vedettes et une course au titre serrée ajoutent du suspense, tandis que les clubs soignent l'expérience des supporters avec des groupes d'encouragement, des mascottes et une offre culinaire bien différente de celle de l'étranger.

Le baseball est depuis des décennies le sport collectif le plus populaire de Corée du Sud, mais la vague actuelle se distingue par la façon dont elle mêle sport et spectacle, à l'image des concerts de K-pop. Pour les clubs, des tribunes combles signifient davantage de recettes de billetterie et de parrainage ; pour ce sport, une nouvelle génération de supporters laisse penser que l'élan pourrait durer au-delà d'une seule saison faste.$a6$,
$a6$Giải bóng chày chuyên nghiệp Hàn Quốc KBO đã vượt mốc 5 triệu khán giả vào đầu tháng 6 năm 2026 — tốc độ nhanh nhất từ trước đến nay. Với trung bình 18.077 khán giả mỗi trận, tăng 8% so với cùng thời điểm mùa trước, giải đấu đang trên đà phá kỷ lục 12,3 triệu người mà họ lập năm 2025.

Đà tăng lan rộng. Chín trong mười câu lạc bộ thu hút đông khán giả hơn một năm trước, và số trận cháy vé ngày càng nhiều: 218 trận tính đến đầu tháng 7, đe dọa kỷ lục 331 của mùa trước. KBO sau đó chạm mốc 7 triệu khán giả chỉ trong 388 trận, một lần nữa là số trận ít nhất trong lịch sử giải.

Nhiều yếu tố thúc đẩy cơn sốt. Lượng người hâm mộ trẻ hơn và có tỷ lệ nữ cao đã định hình lại văn hóa sân bóng, biến các trận đấu thành dịp giao lưu đầy tiếng hò reo, hàng lưu niệm theo chủ đề và đồ ăn. Các ngôi sao và cuộc đua vô địch gay cấn tăng thêm kịch tính, trong khi các đội chú trọng trải nghiệm cổ động viên bằng đội cổ vũ, linh vật và ẩm thực sân vận động rất khác so với nước ngoài.

Bóng chày là môn thể thao đồng đội được yêu thích nhất Hàn Quốc suốt nhiều thập kỷ, nhưng điều đáng chú ý ở làn sóng hiện tại là cách nó hòa trộn thể thao với giải trí, giống như các buổi hòa nhạc K-pop. Với các câu lạc bộ, khán đài chật kín đồng nghĩa doanh thu vé và tài trợ mạnh hơn; với môn thể thao này, một thế hệ người hâm mộ mới cho thấy đà tăng có thể kéo dài hơn một mùa giải bùng nổ.$a6$,
$a6$ลีกเบสบอลอาชีพของเกาหลีใต้อย่าง KBO ทะลุ 5 ล้านผู้ชมเมื่อต้นเดือนมิถุนายน 2026 ซึ่งเร็วที่สุดเท่าที่เคยทำได้ ด้วยจำนวนผู้ชมเฉลี่ย 18,077 คนต่อเกม เพิ่มขึ้น 8% จากช่วงเดียวกันของฤดูกาลก่อน ลีกกำลังมีแนวโน้มทำลายสถิติ 12.3 ล้านคนที่ตั้งไว้ในปี 2025

กระแสนี้กระจายในวงกว้าง 9 ใน 10 สโมสรของลีกมีผู้ชมมากกว่าปีก่อน และจำนวนเกมที่บัตรขายหมดก็เพิ่มขึ้นเรื่อย ๆ โดยถึงต้นเดือนกรกฎาคมมีเกมขายบัตรหมดแล้ว 218 ครั้ง ซึ่งใกล้เคียงสถิติ 331 ครั้งของฤดูกาลก่อน ต่อมา KBO ทำสถิติแตะ 7 ล้านผู้ชมในเพียง 388 เกม ซึ่งก็เป็นจำนวนเกมที่น้อยที่สุดในประวัติศาสตร์ลีกเช่นกัน

มีหลายปัจจัยที่ขับเคลื่อนกระแสนี้ กลุ่มแฟนที่อายุน้อยลงและมีสัดส่วนผู้หญิงสูงได้เปลี่ยนวัฒนธรรมในสนาม ทำให้การแข่งขันกลายเป็นการออกไปสังสรรค์ที่เต็มไปด้วยการเชียร์ สินค้าตามธีม และอาหาร นักกีฬาดาวเด่นและการชิงแชมป์ที่สูสีเพิ่มความดราม่า ขณะที่สโมสรทุ่มเทกับประสบการณ์ของแฟน ทั้งกองเชียร์ มาสคอต และอาหารในสนามที่แตกต่างจากต่างประเทศอย่างมาก

เบสบอลเป็นกีฬาประเภททีมที่ได้รับความนิยมสูงสุดในเกาหลีใต้มาหลายทศวรรษ แต่สิ่งที่โดดเด่นของกระแสในปัจจุบันคือการผสานกีฬาเข้ากับความบันเทิงคล้ายคอนเสิร์ต K-pop สำหรับสโมสร อัฒจันทร์ที่เต็มหมายถึงรายได้จากบัตรและสปอนเซอร์ที่มากขึ้น ส่วนในภาพรวมของกีฬา แฟนรุ่นใหม่บ่งชี้ว่าแรงส่งนี้อาจอยู่ได้นานกว่าแค่ฤดูกาลเดียว$a6$,
$a6$Liga bisbol profesional Korea Selatan, KBO, melampaui 5 juta penonton pada awal Juni 2026 — laju tercepat sepanjang sejarahnya. Dengan rata-rata 18.077 penonton per pertandingan, naik 8 persen dari titik yang sama musim lalu, liga ini berada di jalur untuk melewati rekor 12,3 juta yang dibuatnya pada 2025.

Lonjakan itu merata. Sembilan dari sepuluh klub liga menarik lebih banyak penonton dibanding setahun lalu, dan jumlah laga yang tiketnya ludes terus bertambah: 218 hingga awal Juli, mengancam rekor 331 musim sebelumnya. KBO kemudian mencapai 7 juta penonton hanya dalam 388 pertandingan, lagi-lagi jumlah laga paling sedikit dalam sejarah liga.

Beberapa faktor mendorong ledakan ini. Basis penggemar yang lebih muda dan didominasi perempuan telah mengubah budaya stadion, menjadikan pertandingan sebagai ajang sosial penuh yel-yel, barang bertema, dan makanan. Para bintang dan persaingan gelar yang ketat menambah drama, sementara klub menekankan pengalaman penggemar dengan tim sorak, maskot, dan sajian stadion yang sangat berbeda dari luar negeri.

Bisbol telah menjadi olahraga tim paling populer di Korea Selatan selama beberapa dekade, tetapi yang menonjol dari gelombang saat ini adalah caranya memadukan olahraga dengan hiburan, mirip konser K-pop. Bagi klub, tribun penuh berarti pendapatan tiket dan sponsor yang lebih kuat; bagi olahraga ini, generasi penggemar baru menunjukkan momentum itu mungkin bertahan lebih lama dari sekadar satu musim gemilang.$a6$,
$a6$The KBO baseball league hit 5 million fans at record pace in June 2026, averaging 18,077 per game and on track to beat last year's 12.3 million record.$a6$,
$a6$KBO 2026, Korean baseball attendance, KBO fans record, professional baseball Korea, ballpark culture, KBO sellouts$a6$,
'advanced',
3, 4, 4,
$a6$[
{"word":"관중","reading":"gwanjung","reading_ja":"クァンジュン","part_of_speech":"noun","definition_en":"spectators; crowd (at an event)","definition_ja":"観客；観衆","definition_zh_tw":"觀眾","definition_es":"espectadores; público","definition_de":"Zuschauer; Publikum","definition_fr":"spectateurs; public","definition_vi":"khán giả","definition_th":"ผู้ชม","definition_id":"penonton","example_ko":"경기장에 관중이 가득 찼다.","example_en":"The stadium was packed with spectators.","example_ja":"球場は観客で埋まった。","example_zh_tw":"球場擠滿了觀眾。","example_es":"El estadio estaba lleno de espectadores.","example_de":"Das Stadion war voller Zuschauer.","example_fr":"Le stade était rempli de spectateurs.","example_vi":"Sân vận động chật kín khán giả.","example_th":"สนามเต็มไปด้วยผู้ชม","example_id":"Stadion dipenuhi penonton."},
{"word":"프로야구","reading":"peuroyagu","reading_ja":"プロヤグ","part_of_speech":"noun","definition_en":"professional baseball","definition_ja":"プロ野球","definition_zh_tw":"職業棒球；職棒","definition_es":"béisbol profesional","definition_de":"Profibaseball","definition_fr":"baseball professionnel","definition_vi":"bóng chày chuyên nghiệp","definition_th":"เบสบอลอาชีพ","definition_id":"bisbol profesional","example_ko":"그는 프로야구 경기를 보러 갔다.","example_en":"He went to watch a professional baseball game.","example_ja":"彼はプロ野球の試合を見に行った。","example_zh_tw":"他去看職棒比賽。","example_es":"Fue a ver un partido de béisbol profesional.","example_de":"Er ging zu einem Profibaseballspiel.","example_fr":"Il est allé voir un match de baseball professionnel.","example_vi":"Anh ấy đi xem một trận bóng chày chuyên nghiệp.","example_th":"เขาไปดูการแข่งขันเบสบอลอาชีพ","example_id":"Ia pergi menonton pertandingan bisbol profesional."},
{"word":"기록","reading":"girok","reading_ja":"キロク","part_of_speech":"noun","definition_en":"record (best mark or documentation)","definition_ja":"記録","definition_zh_tw":"紀錄","definition_es":"récord; registro","definition_de":"Rekord; Aufzeichnung","definition_fr":"record","definition_vi":"kỷ lục","definition_th":"สถิติ","definition_id":"rekor; catatan","example_ko":"이번 시즌에 새 기록을 세웠다.","example_en":"They set a new record this season.","example_ja":"今シーズン、新記録を打ち立てた。","example_zh_tw":"本季創下新紀錄。","example_es":"Establecieron un nuevo récord esta temporada.","example_de":"Sie stellten in dieser Saison einen neuen Rekord auf.","example_fr":"Ils ont établi un nouveau record cette saison.","example_vi":"Họ đã lập kỷ lục mới trong mùa giải này.","example_th":"พวกเขาทำสถิติใหม่ในฤดูกาลนี้","example_id":"Mereka mencetak rekor baru musim ini."},
{"word":"매진","reading":"maejin","reading_ja":"メジン","part_of_speech":"noun","definition_en":"sellout; being sold out","definition_ja":"完売；満員","definition_zh_tw":"售罄；完售","definition_es":"entradas agotadas; lleno total","definition_de":"ausverkauft","definition_fr":"guichets fermés; complet","definition_vi":"cháy vé; bán hết vé","definition_th":"บัตรขายหมด","definition_id":"tiket ludes; habis terjual","example_ko":"인기 경기는 표가 금방 매진됐다.","example_en":"Tickets for the popular game sold out quickly.","example_ja":"人気の試合はチケットがすぐ完売した。","example_zh_tw":"熱門比賽的門票很快就售罄。","example_es":"Las entradas del partido popular se agotaron rápido.","example_de":"Die Tickets für das beliebte Spiel waren schnell ausverkauft.","example_fr":"Les billets du match populaire se sont vendus en un clin d'œil.","example_vi":"Vé của trận đấu ăn khách nhanh chóng cháy hàng.","example_th":"บัตรของเกมยอดนิยมขายหมดอย่างรวดเร็ว","example_id":"Tiket pertandingan populer itu cepat ludes."},
{"word":"응원하다","reading":"eungwonhada","reading_ja":"ウンウォンハダ","part_of_speech":"verb","definition_en":"to cheer for; to root for; to support","definition_ja":"応援する","definition_zh_tw":"加油；聲援","definition_es":"animar; apoyar","definition_de":"anfeuern; unterstützen","definition_fr":"encourager; soutenir","definition_vi":"cổ vũ; ủng hộ","definition_th":"เชียร์; ให้กำลังใจ","definition_id":"menyemangati; mendukung","example_ko":"팬들이 목이 터져라 팀을 응원했다.","example_en":"Fans cheered for their team at the top of their lungs.","example_ja":"ファンは声を張り上げてチームを応援した。","example_zh_tw":"球迷聲嘶力竭地為球隊加油。","example_es":"Los aficionados animaron a su equipo a todo pulmón.","example_de":"Die Fans feuerten ihr Team lautstark an.","example_fr":"Les supporters ont encouragé leur équipe à pleins poumons.","example_vi":"Người hâm mộ hết mình cổ vũ cho đội của họ.","example_th":"แฟน ๆ เชียร์ทีมของตนสุดเสียง","example_id":"Penggemar menyemangati tim mereka sekuat tenaga."}
]$a6$::jsonb,
'published', true, 0,
'2026-06-14T23:00:00Z', '2026-06-14T23:00:00Z', '2026-06-14T23:00:00Z'
);

-- Article 7 — 2026-06-16 culture beginner — Busan Sand Festival at Haeundae Beach
INSERT INTO articles (topic_id, slug, title_en, title_ko, title_ja, title_zh_tw, title_es, title_de, title_fr, title_vi, title_th, title_id, summary_en, summary_ko, summary_ja, summary_zh_tw, summary_es, summary_de, summary_fr, summary_vi, summary_th, summary_id, content_en, content_ko, content_ja, content_zh_tw, content_es, content_de, content_fr, content_vi, content_th, content_id, seo_description, seo_keywords, level, reading_time_en, reading_time_ko, reading_time_ja, vocabulary, status, ai_generated, view_count, published_at, created_at, updated_at) VALUES (
(SELECT id FROM topics WHERE slug = 'culture'),
'culture-2026-06-16',
$a7$Giant Sand Sculptures Fill Busan's Haeundae Beach for 2026 Festival$a7$,
$a7$부산 해운대, 2026 모래축제로 거대 모래 조각 가득$a7$,
$a7$釜山・海雲台に巨大な砂像　2026砂祭り開催$a7$,
$a7$釜山海雲台沙灘 2026沙雕節巨型沙雕登場$a7$,
$a7$Esculturas de arena gigantes llenan la playa Haeundae de Busan$a7$,
$a7$Riesige Sandskulpturen füllen Busans Haeundae-Strand 2026$a7$,
$a7$Des sculptures de sable géantes envahissent la plage Haeundae$a7$,
$a7$Tượng cát khổng lồ phủ kín bãi biển Haeundae, Busan 2026$a7$,
$a7$ประติมากรรมทรายยักษ์เต็มหาดแฮอุนแดปูซาน 2026$a7$,
$a7$Patung Pasir Raksasa Penuhi Pantai Haeundae Busan 2026$a7$,
$a7$The 2026 Busan Sand Festival lined Haeundae Beach with giant sand sculptures this June, themed on the city's past, present, and future. Korea's largest sand festival is free and draws families to the coast at the start of summer.$a7$,
$a7$2026 부산 모래축제가 6월 해운대 해변을 거대한 모래 조각으로 채웠다. 부산의 과거·현재·미래를 주제로 한 이 행사는 한국 최대 규모의 모래축제로, 무료로 열려 초여름 바닷가에 가족들을 불러 모은다.$a7$,
$a7$2026釜山砂祭りが6月、海雲台の砂浜を巨大な砂像で埋めた。釜山の過去・現在・未来をテーマにしたこの催しは韓国最大の砂祭りで、入場無料。初夏の海辺に家族連れを呼び込む。$a7$,
$a7$2026釜山沙雕節於6月讓海雲台沙灘布滿巨型沙雕，以釜山的過去、現在與未來為主題。這是韓國規模最大的沙雕節，免費入場，在初夏吸引家庭前往海邊。$a7$,
$a7$El Festival de Arena de Busan 2026 llenó la playa Haeundae de esculturas gigantes en junio, con el tema del pasado, presente y futuro de la ciudad. Es el mayor festival de arena de Corea, es gratuito y atrae a las familias a la costa al inicio del verano.$a7$,
$a7$Das Busan Sandfestival 2026 säumte den Haeundae-Strand im Juni mit riesigen Sandskulpturen zum Thema Vergangenheit, Gegenwart und Zukunft der Stadt. Koreas größtes Sandfestival ist kostenlos und lockt zu Sommerbeginn Familien an die Küste.$a7$,
$a7$Le Festival du sable de Busan 2026 a couvert la plage Haeundae de sculptures géantes en juin, sur le thème du passé, du présent et de l'avenir de la ville. Plus grand festival de sable de Corée, il est gratuit et attire les familles sur la côte au début de l'été.$a7$,
$a7$Lễ hội Cát Busan 2026 phủ kín bãi biển Haeundae bằng các tượng cát khổng lồ trong tháng 6, với chủ đề quá khứ, hiện tại và tương lai của thành phố. Là lễ hội cát lớn nhất Hàn Quốc, sự kiện miễn phí và thu hút các gia đình ra biển đầu hè.$a7$,
$a7$เทศกาลทรายปูซาน 2026 เนรมิตหาดแฮอุนแดด้วยประติมากรรมทรายยักษ์ในเดือนมิถุนายน ภายใต้ธีมอดีต ปัจจุบัน และอนาคตของเมือง เทศกาลทรายที่ใหญ่ที่สุดของเกาหลีนี้เข้าชมฟรีและดึงดูดครอบครัวมาเที่ยวชายหาดในช่วงต้นฤดูร้อน$a7$,
$a7$Festival Pasir Busan 2026 memenuhi Pantai Haeundae dengan patung pasir raksasa pada Juni, bertema masa lalu, kini, dan masa depan kota itu. Festival pasir terbesar Korea ini gratis dan menarik keluarga ke pantai di awal musim panas.$a7$,
$a7$This June, Haeundae Beach in Busan filled with giant sand sculptures for the 2026 Busan Sand Festival, South Korea's largest event of its kind. This year's theme was the city of Busan itself — its past, present, and future — shaped in sand by artists from Korea and abroad.

The festival is free and family-friendly. Visitors walk among huge sculptures, try making their own sand art, and enjoy games and shows on the beach. Haeundae is Korea's most famous beach, so the festival mixes art with a day by the sea.

Busan holds many festivals through the year, from film to fireworks. Events like the Sand Festival help the coastal city draw visitors in early summer, before the beaches fill up with swimmers in July and August. For many Korean families, it is a favorite way to start the season.$a7$,
$a7$올여름 6월, 부산 해운대 해변이 2026 부산 모래축제를 맞아 거대한 모래 조각으로 뒤덮였다. 한국 최대 규모의 모래축제다. 올해 주제는 부산이라는 도시 그 자체로, 과거·현재·미래를 국내외 작가들이 모래로 표현했다.

이 축제는 무료이고 온 가족이 즐기기에 좋다. 방문객은 커다란 조각들 사이를 거닐고, 직접 모래 작품을 만들어 보며, 해변에서 열리는 게임과 공연을 즐긴다. 해운대는 한국에서 가장 유명한 해변이라, 축제는 예술과 바닷가 나들이를 함께 선사한다.

부산은 영화부터 불꽃놀이까지 일 년 내내 다양한 축제를 연다. 모래축제 같은 행사는 7~8월에 해변이 물놀이 인파로 가득 차기 전, 초여름에 이 해안 도시로 방문객을 불러 모으는 데 도움이 된다. 많은 한국 가족에게 이 축제는 여름을 시작하는 좋아하는 방법이다.$a7$,
$a7$今年の夏、6月に釜山・海雲台の砂浜が2026釜山砂祭りで巨大な砂像に覆われた。韓国最大の砂祭りだ。今年のテーマは釜山という街そのもので、その過去・現在・未来を国内外の作家が砂で表現した。

この祭りは無料で、家族みんなで楽しめる。来場者は大きな砂像の間を歩き、自分でも砂の作品を作り、砂浜で開かれるゲームやショーを楽しむ。海雲台は韓国で最も有名なビーチなので、この祭りは芸術と海辺の一日を同時に味わわせてくれる。

釜山は映画から花火まで、一年を通じてさまざまな祭りを開く。砂祭りのような催しは、7〜8月に海水浴客でビーチがあふれる前の初夏に、この沿岸都市へ来場者を呼び込むのに役立つ。多くの韓国の家族にとって、この祭りは夏の始まりを楽しむお気に入りの方法だ。$a7$,
$a7$今年夏天6月，釜山海雲台沙灘因2026釜山沙雕節布滿了巨型沙雕。這是韓國規模最大的沙雕節。今年的主題就是釜山這座城市本身，由國內外藝術家用沙子呈現它的過去、現在與未來。

這個節慶免費，適合全家同樂。遊客可以在巨大的沙雕之間漫步，親手嘗試做沙雕作品，並享受沙灘上的遊戲與表演。海雲台是韓國最有名的海灘，因此這個節慶讓人同時享受藝術與海邊時光。

釜山一整年舉辦各式各樣的節慶，從電影到煙火都有。像沙雕節這樣的活動，能在7、8月海灘擠滿戲水人潮之前，於初夏為這座海岸城市吸引遊客。對許多韓國家庭來說，這個節慶是展開夏天最愛的方式之一。$a7$,
$a7$Este junio, la playa Haeundae de Busan se cubrió de enormes esculturas de arena con motivo del Festival de Arena de Busan 2026, el mayor de su tipo en Corea del Sur. El tema de este año fue la propia ciudad de Busan —su pasado, presente y futuro— moldeada en arena por artistas de Corea y del extranjero.

El festival es gratuito y apto para toda la familia. Los visitantes pasean entre las gigantescas esculturas, prueban a crear su propio arte en arena y disfrutan de juegos y espectáculos en la playa. Haeundae es la playa más famosa de Corea, así que el festival combina el arte con un día junto al mar.

Busan celebra muchos festivales a lo largo del año, del cine a los fuegos artificiales. Eventos como el Festival de Arena ayudan a esta ciudad costera a atraer visitantes a principios del verano, antes de que las playas se llenen de bañistas en julio y agosto. Para muchas familias coreanas, es una manera favorita de empezar la temporada.$a7$,
$a7$In diesem Juni bedeckten riesige Sandskulpturen den Haeundae-Strand in Busan zum Busan Sandfestival 2026, dem größten seiner Art in Südkorea. Das diesjährige Thema war die Stadt Busan selbst – ihre Vergangenheit, Gegenwart und Zukunft, von Künstlern aus dem In- und Ausland in Sand geformt.

Das Festival ist kostenlos und familienfreundlich. Besucher spazieren zwischen den gewaltigen Skulpturen, versuchen sich an eigener Sandkunst und genießen Spiele und Shows am Strand. Haeundae ist Koreas berühmtester Strand, sodass das Festival Kunst mit einem Tag am Meer verbindet.

Busan veranstaltet das ganze Jahr über viele Festivals, von Film bis Feuerwerk. Veranstaltungen wie das Sandfestival helfen der Küstenstadt, im Frühsommer Besucher anzuziehen, bevor sich die Strände im Juli und August mit Badegästen füllen. Für viele koreanische Familien ist es eine beliebte Art, in die Saison zu starten.$a7$,
$a7$En juin, la plage Haeundae de Busan s'est couverte d'immenses sculptures de sable à l'occasion du Festival du sable de Busan 2026, le plus grand du genre en Corée du Sud. Le thème de cette année était la ville de Busan elle-même — son passé, son présent et son avenir — façonnée dans le sable par des artistes coréens et étrangers.

Le festival est gratuit et convient à toute la famille. Les visiteurs déambulent entre les sculptures géantes, essaient de créer leur propre œuvre de sable et profitent de jeux et de spectacles sur la plage. Haeundae est la plage la plus célèbre de Corée : le festival mêle donc l'art à une journée au bord de la mer.

Busan organise de nombreux festivals tout au long de l'année, du cinéma aux feux d'artifice. Des événements comme le Festival du sable aident la ville côtière à attirer des visiteurs au début de l'été, avant que les plages ne se remplissent de baigneurs en juillet et août. Pour beaucoup de familles coréennes, c'est une façon préférée d'ouvrir la saison.$a7$,
$a7$Tháng 6 này, bãi biển Haeundae ở Busan phủ đầy những tượng cát khổng lồ nhân Lễ hội Cát Busan 2026, sự kiện lớn nhất thuộc loại này ở Hàn Quốc. Chủ đề năm nay là chính thành phố Busan — quá khứ, hiện tại và tương lai — được các nghệ sĩ trong và ngoài nước tạo hình bằng cát.

Lễ hội miễn phí và thân thiện với gia đình. Du khách dạo bước giữa những bức tượng khổng lồ, thử tự làm tác phẩm từ cát, và tận hưởng các trò chơi cùng chương trình biểu diễn trên bãi biển. Haeundae là bãi biển nổi tiếng nhất Hàn Quốc, nên lễ hội kết hợp nghệ thuật với một ngày bên biển.

Busan tổ chức nhiều lễ hội quanh năm, từ điện ảnh đến pháo hoa. Những sự kiện như Lễ hội Cát giúp thành phố ven biển thu hút du khách vào đầu hè, trước khi các bãi biển chật kín người tắm vào tháng 7 và tháng 8. Với nhiều gia đình Hàn Quốc, đây là cách yêu thích để mở màn mùa hè.$a7$,
$a7$เดือนมิถุนายนนี้ หาดแฮอุนแดในปูซานเต็มไปด้วยประติมากรรมทรายขนาดยักษ์ในงานเทศกาลทรายปูซาน 2026 ซึ่งเป็นงานประเภทนี้ที่ใหญ่ที่สุดในเกาหลีใต้ ธีมของปีนี้คือตัวเมืองปูซานเอง ทั้งอดีต ปัจจุบัน และอนาคต ที่ศิลปินทั้งในและต่างประเทศรังสรรค์ขึ้นจากทราย

เทศกาลนี้เข้าชมฟรีและเหมาะกับทั้งครอบครัว ผู้มาเยือนได้เดินชมประติมากรรมขนาดใหญ่ ลองปั้นงานทรายของตัวเอง และสนุกกับเกมและการแสดงบนชายหาด แฮอุนแดเป็นชายหาดที่มีชื่อเสียงที่สุดของเกาหลี งานนี้จึงผสานศิลปะเข้ากับวันพักผ่อนริมทะเล

ปูซานจัดเทศกาลหลากหลายตลอดทั้งปี ตั้งแต่ภาพยนตร์ไปจนถึงพลุ งานอย่างเทศกาลทรายช่วยให้เมืองชายฝั่งแห่งนี้ดึงดูดนักท่องเที่ยวในช่วงต้นฤดูร้อน ก่อนที่ชายหาดจะเต็มไปด้วยผู้คนที่มาเล่นน้ำในเดือนกรกฎาคมและสิงหาคม สำหรับหลายครอบครัวชาวเกาหลี นี่คือวิธีเปิดฤดูกาลที่พวกเขาชื่นชอบ$a7$,
$a7$Juni ini, Pantai Haeundae di Busan dipenuhi patung pasir raksasa dalam Festival Pasir Busan 2026, festival sejenis terbesar di Korea Selatan. Tema tahun ini adalah kota Busan sendiri — masa lalu, kini, dan masa depannya — yang dibentuk dari pasir oleh seniman dari Korea dan luar negeri.

Festival ini gratis dan ramah keluarga. Pengunjung berjalan di antara patung-patung besar, mencoba membuat karya pasir sendiri, dan menikmati permainan serta pertunjukan di pantai. Haeundae adalah pantai paling terkenal di Korea, sehingga festival ini memadukan seni dengan hari di tepi laut.

Busan menggelar banyak festival sepanjang tahun, dari film hingga kembang api. Acara seperti Festival Pasir membantu kota pesisir ini menarik pengunjung di awal musim panas, sebelum pantai dipenuhi perenang pada Juli dan Agustus. Bagi banyak keluarga Korea, ini cara favorit untuk memulai musim.$a7$,
$a7$The 2026 Busan Sand Festival covered Haeundae Beach with giant sand sculptures themed on the city's past, present, and future — Korea's largest, and free.$a7$,
$a7$Busan Sand Festival, Haeundae Beach, Korean festivals, sand sculptures, Busan summer, Korea culture$a7$,
'beginner',
3, 4, 4,
$a7$[
{"word":"축제","reading":"chukje","reading_ja":"チュクチェ","part_of_speech":"noun","definition_en":"festival","definition_ja":"祭り；フェスティバル","definition_zh_tw":"節慶；慶典","definition_es":"festival; fiesta","definition_de":"Fest; Festival","definition_fr":"festival; fête","definition_vi":"lễ hội","definition_th":"เทศกาล","definition_id":"festival","example_ko":"여름에는 축제가 많아요.","example_en":"There are many festivals in summer.","example_ja":"夏にはお祭りが多いです。","example_zh_tw":"夏天有很多節慶。","example_es":"En verano hay muchos festivales.","example_de":"Im Sommer gibt es viele Feste.","example_fr":"En été, il y a beaucoup de festivals.","example_vi":"Mùa hè có nhiều lễ hội.","example_th":"ในฤดูร้อนมีเทศกาลมากมาย","example_id":"Di musim panas ada banyak festival."},
{"word":"모래","reading":"morae","reading_ja":"モレ","part_of_speech":"noun","definition_en":"sand","definition_ja":"砂","definition_zh_tw":"沙子","definition_es":"arena","definition_de":"Sand","definition_fr":"sable","definition_vi":"cát","definition_th":"ทราย","definition_id":"pasir","example_ko":"아이들이 모래로 성을 만들었다.","example_en":"The children built a castle out of sand.","example_ja":"子どもたちが砂でお城を作った。","example_zh_tw":"孩子們用沙子堆了城堡。","example_es":"Los niños hicieron un castillo de arena.","example_de":"Die Kinder bauten eine Burg aus Sand.","example_fr":"Les enfants ont construit un château de sable.","example_vi":"Bọn trẻ xây một lâu đài bằng cát.","example_th":"เด็ก ๆ ก่อปราสาททราย","example_id":"Anak-anak membuat istana dari pasir."},
{"word":"해변","reading":"haebyeon","reading_ja":"ヘビョン","part_of_speech":"noun","definition_en":"beach; seashore","definition_ja":"海辺；ビーチ","definition_zh_tw":"海灘；海邊","definition_es":"playa","definition_de":"Strand","definition_fr":"plage","definition_vi":"bãi biển","definition_th":"ชายหาด","definition_id":"pantai","example_ko":"우리는 해변에서 하루를 보냈다.","example_en":"We spent the day at the beach.","example_ja":"私たちは海辺で一日を過ごした。","example_zh_tw":"我們在海灘度過了一天。","example_es":"Pasamos el día en la playa.","example_de":"Wir verbrachten den Tag am Strand.","example_fr":"Nous avons passé la journée à la plage.","example_vi":"Chúng tôi đã dành cả ngày ở bãi biển.","example_th":"เราใช้เวลาทั้งวันที่ชายหาด","example_id":"Kami menghabiskan hari di pantai."},
{"word":"조각","reading":"jogak","reading_ja":"チョガク","part_of_speech":"noun","definition_en":"sculpture; carving","definition_ja":"彫刻","definition_zh_tw":"雕刻；雕塑","definition_es":"escultura","definition_de":"Skulptur; Schnitzerei","definition_fr":"sculpture","definition_vi":"tác phẩm điêu khắc","definition_th":"ประติมากรรม; งานแกะสลัก","definition_id":"patung; ukiran","example_ko":"모래 조각이 정말 멋있었다.","example_en":"The sand sculptures were really impressive.","example_ja":"砂の彫刻は本当に見事だった。","example_zh_tw":"沙雕真的很壯觀。","example_es":"Las esculturas de arena eran impresionantes.","example_de":"Die Sandskulpturen waren wirklich beeindruckend.","example_fr":"Les sculptures de sable étaient impressionnantes.","example_vi":"Các tác phẩm điêu khắc bằng cát thật ấn tượng.","example_th":"ประติมากรรมทรายน่าประทับใจมาก","example_id":"Patung-patung pasir itu sungguh mengesankan."},
{"word":"즐기다","reading":"jeulgida","reading_ja":"チュルギダ","part_of_speech":"verb","definition_en":"to enjoy","definition_ja":"楽しむ","definition_zh_tw":"享受；樂在其中","definition_es":"disfrutar","definition_de":"genießen","definition_fr":"profiter de; apprécier","definition_vi":"tận hưởng; thưởng thức","definition_th":"เพลิดเพลิน; สนุกกับ","definition_id":"menikmati","example_ko":"가족과 함께 축제를 즐겼다.","example_en":"I enjoyed the festival with my family.","example_ja":"家族と一緒にお祭りを楽しんだ。","example_zh_tw":"我和家人一起享受了這個節慶。","example_es":"Disfruté del festival con mi familia.","example_de":"Ich genoss das Fest mit meiner Familie.","example_fr":"J'ai profité du festival avec ma famille.","example_vi":"Tôi đã tận hưởng lễ hội cùng gia đình.","example_th":"ฉันเพลิดเพลินกับเทศกาลร่วมกับครอบครัว","example_id":"Saya menikmati festival bersama keluarga."}
]$a7$::jsonb,
'published', true, 0,
'2026-06-15T23:00:00Z', '2026-06-15T23:00:00Z', '2026-06-15T23:00:00Z'
);
```

## Batch 2 — articles 8–14

```sql
-- Article 8 — 2026-06-17 fashion intermediate — Musinsa global expansion & IPO
INSERT INTO articles (topic_id, slug, title_en, title_ko, title_ja, title_zh_tw, title_es, title_de, title_fr, title_vi, title_th, title_id, summary_en, summary_ko, summary_ja, summary_zh_tw, summary_es, summary_de, summary_fr, summary_vi, summary_th, summary_id, content_en, content_ko, content_ja, content_zh_tw, content_es, content_de, content_fr, content_vi, content_th, content_id, seo_description, seo_keywords, level, reading_time_en, reading_time_ko, reading_time_ja, vocabulary, status, ai_generated, view_count, published_at, created_at, updated_at) VALUES (
(SELECT id FROM topics WHERE slug = 'fashion'),
'fashion-2026-06-17',
$a8$Musinsa Pushes Global Expansion and Eyes $7.4 Billion IPO$a8$,
$a8$무신사, 글로벌 진출 가속…10조 원대 상장 준비$a8$,
$a8$ムシンサ、海外進出を加速　10兆ウォン規模の上場へ$a8$,
$a8$Musinsa加速海外擴張 籌備逾10兆韓元上市$a8$,
$a8$Musinsa acelera su expansión global y prepara una salida a bolsa$a8$,
$a8$Musinsa treibt globale Expansion voran und plant Milliarden-IPO$a8$,
$a8$Musinsa accélère son expansion mondiale et vise une entrée en Bourse$a8$,
$a8$Musinsa đẩy mạnh mở rộng toàn cầu, chuẩn bị IPO 7,4 tỷ USD$a8$,
$a8$Musinsa เร่งขยายทั่วโลก เล็งเข้าตลาดหุ้น 7.4 พันล้านดอลลาร์$a8$,
$a8$Musinsa Genjot Ekspansi Global dan Bidik IPO $7,4 Miliar$a8$,
$a8$Musinsa, Korea's biggest online fashion platform, is expanding into Singapore, Thailand, and the Middle East in 2026 while preparing an IPO valued above 10 trillion won ($7.4 billion). It leans on K-pop ties, with NewJeans as its ambassador.$a8$,
$a8$한국 최대 온라인 패션 플랫폼 무신사가 2026년 싱가포르·태국·중동으로 진출하며, 10조 원(약 74억 달러)이 넘는 기업 가치로 상장을 준비하고 있다. 뉴진스를 브랜드 앰배서더로 두는 등 K-팝과의 연계를 활용한다.$a8$,
$a8$韓国最大のオンラインファッションプラットフォーム、ムシンサが2026年にシンガポール・タイ・中東へ進出し、10兆ウォン（約74億ドル）超の企業価値で上場を準備している。NewJeansをブランドアンバサダーに起用するなど、K-POPとの連携を生かす。$a8$,
$a8$韓國最大線上時尚平台Musinsa於2026年進軍新加坡、泰國與中東，同時籌備估值逾10兆韓元（約74億美元）的上市。平台借力K-pop，由NewJeans擔任品牌大使。$a8$,
$a8$Musinsa, la mayor plataforma de moda en línea de Corea, se expande a Singapur, Tailandia y Oriente Medio en 2026 mientras prepara una salida a bolsa valorada en más de 10 billones de wones (7.400 millones de dólares). Se apoya en el K-pop, con NewJeans como embajadora.$a8$,
$a8$Musinsa, Koreas größte Online-Modeplattform, expandiert 2026 nach Singapur, Thailand und in den Nahen Osten und bereitet einen Börsengang mit über 10 Billionen Won (7,4 Milliarden Dollar) Bewertung vor. Sie setzt auf K-Pop – mit NewJeans als Markenbotschafterin.$a8$,
$a8$Musinsa, la plus grande plateforme de mode en ligne de Corée, s'étend à Singapour, en Thaïlande et au Moyen-Orient en 2026 tout en préparant une entrée en Bourse valorisée à plus de 10 000 milliards de wons (7,4 milliards de dollars). Elle mise sur la K-pop, avec NewJeans comme ambassadrice.$a8$,
$a8$Musinsa, nền tảng thời trang trực tuyến lớn nhất Hàn Quốc, mở rộng sang Singapore, Thái Lan và Trung Đông trong năm 2026 đồng thời chuẩn bị IPO định giá hơn 10 nghìn tỷ won (7,4 tỷ USD). Hãng dựa vào K-pop, với NewJeans làm đại sứ thương hiệu.$a8$,
$a8$Musinsa แพลตฟอร์มแฟชั่นออนไลน์ที่ใหญ่ที่สุดของเกาหลี ขยายสู่สิงคโปร์ ไทย และตะวันออกกลางในปี 2026 พร้อมเตรียมเข้าตลาดหุ้นด้วยมูลค่ากว่า 10 ล้านล้านวอน (7.4 พันล้านดอลลาร์) โดยอาศัยพลัง K-pop มี NewJeans เป็นแบรนด์แอมบาสเดอร์$a8$,
$a8$Musinsa, platform mode daring terbesar Korea, berekspansi ke Singapura, Thailand, dan Timur Tengah pada 2026 sambil menyiapkan IPO bernilai lebih dari 10 triliun won (7,4 miliar dolar). Ia mengandalkan K-pop, dengan NewJeans sebagai duta merek.$a8$,
$a8$Musinsa, South Korea's dominant online fashion platform, is pushing hard into overseas markets in 2026 and preparing for a stock-market listing that could value it at more than 10 trillion won — about 7.4 billion US dollars. The company has tapped Citi and JP Morgan to coordinate the planned IPO.

Founded as an online community for streetwear photos, Musinsa grew into the go-to marketplace for young Korean shoppers and the brands they follow. In 2026 it is expanding into Singapore, Thailand, and the Middle East, after earlier moves into Japan and China. One brand it carries, Matin Kim, opened a flagship store in Tokyo's Harajuku district in April 2026.

Musinsa leans heavily on Korea's cultural exports. The girl group NewJeans serves as its brand ambassador, and its in-house label, Musinsa Standard, even dressed part of South Korea's delegation at the 2024 Paris Olympics. Such tie-ins help the platform sell Korean style to fans who first discover it through K-pop and dramas.

Analysts see the IPO as a test of how far 'K-fashion' can travel as a business, not just a trend. If Musinsa can turn overseas curiosity into steady sales, it could become one of Asia's largest fashion retailers; if not, the lofty valuation may prove hard to justify.$a8$,
$a8$한국 최대의 온라인 패션 플랫폼 무신사가 2026년 해외 시장 공략에 속도를 내며, 기업 가치 10조 원, 약 74억 달러가 넘는 규모의 증시 상장을 준비하고 있다. 회사는 이번 상장을 위해 씨티와 JP모건을 주관사로 선정했다.

무신사는 스트리트 패션 사진을 공유하던 온라인 커뮤니티로 시작해, 젊은 한국 소비자와 그들이 좋아하는 브랜드가 모이는 대표 장터로 성장했다. 앞서 일본과 중국에 진출한 데 이어 2026년에는 싱가포르, 태국, 중동으로 발을 넓히고 있다. 무신사가 입점시킨 브랜드 중 하나인 마뗑킴은 2026년 4월 도쿄 하라주쿠에 플래그십 매장을 열었다.

무신사는 한국의 문화 수출에 크게 기대고 있다. 걸그룹 뉴진스가 브랜드 앰배서더를 맡고 있고, 자체 라벨인 무신사 스탠다드는 2024년 파리 올림픽에서 한국 대표단 일부의 의상을 담당하기도 했다. 이런 협업은 K-팝과 드라마를 통해 한국 스타일을 처음 접한 팬들에게 상품을 파는 데 도움이 된다.

전문가들은 이번 상장을 'K-패션'이 단순한 유행을 넘어 사업으로 얼마나 멀리 갈 수 있는지 가늠하는 시험대로 본다. 무신사가 해외의 호기심을 꾸준한 매출로 바꿀 수 있다면 아시아 최대 패션 유통사 중 하나가 될 수 있지만, 그러지 못하면 높은 기업 가치를 정당화하기 어려울 수 있다.$a8$,
$a8$韓国最大のオンラインファッションプラットフォーム、ムシンサが2026年、海外市場の開拓を加速させ、企業価値10兆ウォン、約74億ドルを超える規模での株式上場を準備している。同社はこの上場に向け、シティとJPモルガンを主幹事に選んだ。

ムシンサはストリートファッションの写真を共有するオンラインコミュニティとして始まり、若い韓国の消費者と彼らが好むブランドが集まる定番のマーケットプレイスに成長した。すでに日本と中国へ進出しており、2026年にはシンガポール、タイ、中東へと足を広げている。取り扱いブランドの一つであるマタンキムは、2026年4月に東京・原宿へ旗艦店を出した。

ムシンサは韓国の文化輸出に大きく依存している。ガールグループNewJeansがブランドアンバサダーを務め、自社レーベルのムシンサスタンダードは2024年のパリ五輪で韓国代表団の一部の衣装も手がけた。こうした連携は、K-POPやドラマを通じて韓国のスタイルに初めて触れたファンに商品を売るのに役立つ。

専門家は今回の上場を、「K-ファッション」が単なる流行を超え、ビジネスとしてどこまで広がれるかを試す場と見ている。ムシンサが海外の関心を安定した売上に変えられればアジア最大級のファッション小売企業になり得るが、そうでなければ高い企業価値を正当化するのは難しいかもしれない。$a8$,
$a8$韓國最大的線上時尚平台Musinsa於2026年加速搶攻海外市場，同時籌備企業估值逾10兆韓元、約74億美元的股票上市。公司已選定花旗與摩根大通擔任這次上市的主辦承銷商。

Musinsa起初是分享街頭時尚照片的線上社群，後來成長為年輕韓國消費者與他們喜愛品牌聚集的主要購物平台。繼先前進軍日本與中國之後，2026年又把版圖擴展到新加坡、泰國與中東。平台上的品牌之一Matin Kim於2026年4月在東京原宿開設旗艦店。

Musinsa高度倚賴韓國的文化輸出。女團NewJeans擔任品牌大使，自有品牌Musinsa Standard更曾在2024年巴黎奧運為部分韓國代表團設計服裝。這類合作有助於向那些先透過K-pop與韓劇認識韓式風格的粉絲銷售商品。

分析師將這次上市視為檢驗「韓系時尚」能否超越潮流、以生意形式走多遠的試金石。若Musinsa能把海外的好奇轉化為穩定業績，有機會成為亞洲最大的時尚零售商之一；反之，這樣的高估值恐怕難以支撐。$a8$,
$a8$Musinsa, la mayor plataforma de moda en línea de Corea del Sur, está acelerando su entrada en los mercados extranjeros en 2026 y prepara una salida a bolsa que podría valorarla en más de 10 billones de wones, unos 7.400 millones de dólares. La empresa ha elegido a Citi y JP Morgan para coordinar la operación.

Nacida como una comunidad en línea para compartir fotos de moda urbana, Musinsa se convirtió en el mercado de referencia para los jóvenes compradores coreanos y las marcas que siguen. Tras entrar antes en Japón y China, en 2026 se expande a Singapur, Tailandia y Oriente Medio. Una de las marcas que vende, Matin Kim, abrió una tienda insignia en el barrio tokiota de Harajuku en abril de 2026.

Musinsa se apoya mucho en las exportaciones culturales de Corea. El grupo NewJeans es su embajador de marca, y su línea propia, Musinsa Standard, llegó a vestir a parte de la delegación surcoreana en los Juegos Olímpicos de París 2024. Esas alianzas ayudan a vender el estilo coreano a los fans que lo descubren primero a través del K-pop y los dramas.

Los analistas ven la salida a bolsa como una prueba de hasta dónde puede llegar la 'K-fashion' como negocio, y no solo como moda pasajera. Si Musinsa logra convertir la curiosidad extranjera en ventas constantes, podría convertirse en uno de los mayores minoristas de moda de Asia; si no, la elevada valoración podría ser difícil de justificar.$a8$,
$a8$Musinsa, Südkoreas größte Online-Modeplattform, treibt 2026 die Expansion in ausländische Märkte voran und bereitet einen Börsengang vor, der das Unternehmen mit mehr als 10 Billionen Won – rund 7,4 Milliarden Dollar – bewerten könnte. Für den geplanten IPO hat die Firma Citi und JP Morgan als Koordinatoren gewählt.

Als Online-Community zum Teilen von Streetwear-Fotos gestartet, wuchs Musinsa zum wichtigsten Marktplatz für junge koreanische Käufer und die Marken, denen sie folgen. Nach früheren Schritten nach Japan und China expandiert das Unternehmen 2026 nach Singapur, Thailand und in den Nahen Osten. Eine der geführten Marken, Matin Kim, eröffnete im April 2026 einen Flagship-Store im Tokioter Viertel Harajuku.

Musinsa stützt sich stark auf Koreas Kulturexporte. Die Girlgroup NewJeans ist Markenbotschafterin, und das hauseigene Label Musinsa Standard stattete sogar einen Teil der südkoreanischen Delegation bei den Olympischen Spielen 2024 in Paris aus. Solche Kooperationen helfen, koreanischen Stil an Fans zu verkaufen, die ihn zuerst über K-Pop und Dramen entdecken.

Analysten sehen den Börsengang als Test dafür, wie weit 'K-Fashion' als Geschäft und nicht nur als Trend reichen kann. Gelingt es Musinsa, ausländische Neugier in stetige Verkäufe zu verwandeln, könnte es zu einem der größten Modehändler Asiens werden; andernfalls dürfte die hohe Bewertung schwer zu rechtfertigen sein.$a8$,
$a8$Musinsa, la plus grande plateforme de mode en ligne de Corée du Sud, accélère en 2026 sa percée sur les marchés étrangers et prépare une entrée en Bourse qui pourrait la valoriser à plus de 10 000 milliards de wons, environ 7,4 milliards de dollars. L'entreprise a choisi Citi et JP Morgan pour coordonner l'opération.

Née comme une communauté en ligne de partage de photos de streetwear, Musinsa est devenue la place de marché de référence pour les jeunes acheteurs coréens et les marques qu'ils suivent. Après s'être implantée au Japon et en Chine, elle s'étend en 2026 à Singapour, à la Thaïlande et au Moyen-Orient. Une des marques qu'elle distribue, Matin Kim, a ouvert une boutique phare dans le quartier tokyoïte de Harajuku en avril 2026.

Musinsa s'appuie fortement sur les exportations culturelles de la Corée. Le groupe NewJeans est son ambassadeur, et sa marque maison, Musinsa Standard, a même habillé une partie de la délégation sud-coréenne aux Jeux olympiques de Paris 2024. Ces partenariats aident à vendre le style coréen aux fans qui le découvrent d'abord par la K-pop et les dramas.

Les analystes voient cette introduction en Bourse comme un test de la distance que la 'K-fashion' peut parcourir en tant que business, et pas seulement comme une tendance. Si Musinsa parvient à transformer la curiosité étrangère en ventes régulières, elle pourrait devenir l'un des plus grands détaillants de mode d'Asie ; sinon, sa valorisation élevée risque d'être difficile à justifier.$a8$,
$a8$Musinsa, nền tảng thời trang trực tuyến lớn nhất Hàn Quốc, đang tăng tốc thâm nhập các thị trường nước ngoài trong năm 2026 và chuẩn bị niêm yết cổ phiếu với mức định giá có thể vượt 10 nghìn tỷ won, khoảng 7,4 tỷ đô la Mỹ. Công ty đã chọn Citi và JP Morgan làm đơn vị điều phối cho đợt IPO này.

Khởi đầu là một cộng đồng trực tuyến chia sẻ ảnh thời trang đường phố, Musinsa đã lớn mạnh thành sàn giao dịch quen thuộc của giới trẻ Hàn Quốc và các thương hiệu họ theo dõi. Sau khi vào Nhật Bản và Trung Quốc trước đó, năm 2026 hãng mở rộng sang Singapore, Thái Lan và Trung Đông. Một thương hiệu mà hãng phân phối, Matin Kim, đã mở cửa hàng flagship tại khu Harajuku ở Tokyo vào tháng 4 năm 2026.

Musinsa dựa nhiều vào xuất khẩu văn hóa của Hàn Quốc. Nhóm nhạc nữ NewJeans là đại sứ thương hiệu, và nhãn hàng riêng Musinsa Standard từng may trang phục cho một phần đoàn Hàn Quốc tại Olympic Paris 2024. Những sự hợp tác như vậy giúp bán phong cách Hàn cho những người hâm mộ vốn biết đến nó đầu tiên qua K-pop và phim truyền hình.

Giới phân tích xem đợt IPO này là phép thử xem 'thời trang Hàn' có thể tiến xa đến đâu với tư cách một ngành kinh doanh, chứ không chỉ là một trào lưu. Nếu Musinsa biến được sự tò mò ở nước ngoài thành doanh số ổn định, hãng có thể trở thành một trong những nhà bán lẻ thời trang lớn nhất châu Á; nếu không, mức định giá cao có thể khó biện minh.$a8$,
$a8$Musinsa แพลตฟอร์มแฟชั่นออนไลน์ที่ใหญ่ที่สุดของเกาหลีใต้ กำลังเร่งบุกตลาดต่างประเทศในปี 2026 พร้อมเตรียมเข้าตลาดหุ้นด้วยมูลค่าที่อาจเกิน 10 ล้านล้านวอน หรือราว 7.4 พันล้านดอลลาร์สหรัฐ บริษัทได้เลือกซิตี้และเจพีมอร์แกนเป็นผู้จัดการการเสนอขายหุ้นครั้งนี้

Musinsa เริ่มต้นจากคอมมูนิตี้ออนไลน์ที่แชร์ภาพแฟชั่นสตรีท ก่อนเติบโตเป็นตลาดซื้อขายหลักของผู้บริโภคชาวเกาหลีรุ่นใหม่และแบรนด์ที่พวกเขาติดตาม หลังจากเข้าสู่ญี่ปุ่นและจีนมาก่อน ในปี 2026 บริษัทได้ขยายไปสิงคโปร์ ไทย และตะวันออกกลาง หนึ่งในแบรนด์ที่วางขายอย่าง Matin Kim ได้เปิดร้านแฟลกชิปที่ย่านฮาราจูกุในโตเกียวเมื่อเดือนเมษายน 2026

Musinsa พึ่งพาการส่งออกวัฒนธรรมของเกาหลีอย่างมาก เกิร์ลกรุ๊ป NewJeans เป็นแบรนด์แอมบาสเดอร์ และแบรนด์ของตัวเองอย่าง Musinsa Standard ยังเคยออกแบบชุดให้คณะนักกีฬาเกาหลีใต้บางส่วนในโอลิมปิกปารีส 2024 ความร่วมมือเช่นนี้ช่วยขายสไตล์เกาหลีให้กับแฟน ๆ ที่รู้จักมันครั้งแรกผ่าน K-pop และซีรีส์

นักวิเคราะห์มองว่าการเข้าตลาดหุ้นครั้งนี้เป็นบททดสอบว่า 'แฟชั่นเกาหลี' จะไปได้ไกลแค่ไหนในฐานะธุรกิจ ไม่ใช่แค่กระแส หาก Musinsa เปลี่ยนความสนใจในต่างประเทศให้เป็นยอดขายที่มั่นคงได้ ก็อาจกลายเป็นหนึ่งในผู้ค้าปลีกแฟชั่นรายใหญ่ที่สุดในเอเชีย แต่ถ้าไม่ มูลค่าที่สูงลิ่วนี้ก็อาจอธิบายได้ยาก$a8$,
$a8$Musinsa, platform mode daring terbesar Korea Selatan, sedang memacu penetrasi pasar luar negeri pada 2026 dan menyiapkan pencatatan saham yang bisa menilainya lebih dari 10 triliun won, sekitar 7,4 miliar dolar AS. Perusahaan menunjuk Citi dan JP Morgan sebagai koordinator IPO tersebut.

Berawal sebagai komunitas daring untuk berbagi foto busana jalanan, Musinsa tumbuh menjadi lokapasar andalan konsumen muda Korea dan merek yang mereka ikuti. Setelah lebih dulu masuk Jepang dan China, pada 2026 ia meluas ke Singapura, Thailand, dan Timur Tengah. Salah satu merek yang dijualnya, Matin Kim, membuka toko unggulan di distrik Harajuku, Tokyo, pada April 2026.

Musinsa sangat bersandar pada ekspor budaya Korea. Grup perempuan NewJeans menjadi duta mereknya, dan label internalnya, Musinsa Standard, bahkan pernah mendandani sebagian delegasi Korea Selatan di Olimpiade Paris 2024. Kolaborasi semacam itu membantu menjual gaya Korea kepada penggemar yang pertama kali mengenalnya lewat K-pop dan drama.

Analis melihat IPO ini sebagai ujian seberapa jauh 'mode Korea' bisa melaju sebagai bisnis, bukan sekadar tren. Jika Musinsa mampu mengubah rasa penasaran di luar negeri menjadi penjualan yang stabil, ia bisa menjadi salah satu peritel mode terbesar di Asia; jika tidak, valuasi tingginya mungkin sulit dibenarkan.$a8$,
$a8$Musinsa, Korea's top online fashion platform, is expanding to Singapore, Thailand, and the Middle East in 2026 while preparing a $7.4 billion IPO.$a8$,
$a8$Musinsa, K-fashion, Korean fashion platform, Musinsa IPO, NewJeans ambassador, Matin Kim, global expansion$a8$,
'intermediate',
3, 4, 4,
$a8$[
{"word":"상장","reading":"sangjang","reading_ja":"サンジャン","part_of_speech":"noun","definition_en":"stock market listing; going public (IPO)","definition_ja":"株式上場（新規株式公開）","definition_zh_tw":"上市（股票）","definition_es":"salida a bolsa; cotización","definition_de":"Börsengang; Börsennotierung","definition_fr":"introduction en Bourse; cotation","definition_vi":"niêm yết cổ phiếu; IPO","definition_th":"การเข้าจดทะเบียนในตลาดหุ้น","definition_id":"pencatatan saham; IPO","example_ko":"그 회사는 올해 상장을 준비하고 있다.","example_en":"The company is preparing to go public this year.","example_ja":"その会社は今年、上場を準備している。","example_zh_tw":"那家公司正準備今年上市。","example_es":"La empresa se prepara para salir a bolsa este año.","example_de":"Das Unternehmen bereitet dieses Jahr den Börsengang vor.","example_fr":"L'entreprise prépare son entrée en Bourse cette année.","example_vi":"Công ty đang chuẩn bị niêm yết trong năm nay.","example_th":"บริษัทกำลังเตรียมเข้าตลาดหุ้นในปีนี้","example_id":"Perusahaan itu bersiap mencatatkan saham tahun ini."},
{"word":"브랜드","reading":"beurandeu","reading_ja":"ブレンドゥ","part_of_speech":"noun","definition_en":"brand","definition_ja":"ブランド","definition_zh_tw":"品牌","definition_es":"marca","definition_de":"Marke","definition_fr":"marque","definition_vi":"thương hiệu","definition_th":"แบรนด์","definition_id":"merek","example_ko":"이 브랜드는 젊은 층에게 인기가 많다.","example_en":"This brand is popular with young people.","example_ja":"このブランドは若い層に人気だ。","example_zh_tw":"這個品牌很受年輕人歡迎。","example_es":"Esta marca es popular entre los jóvenes.","example_de":"Diese Marke ist bei jungen Leuten beliebt.","example_fr":"Cette marque est populaire chez les jeunes.","example_vi":"Thương hiệu này được giới trẻ ưa chuộng.","example_th":"แบรนด์นี้ได้รับความนิยมในหมู่คนรุ่นใหม่","example_id":"Merek ini populer di kalangan anak muda."},
{"word":"진출하다","reading":"jinchulhada","reading_ja":"チンチュルハダ","part_of_speech":"verb","definition_en":"to enter or advance into (a market or field)","definition_ja":"進出する（市場などに）","definition_zh_tw":"進軍；打入（市場）","definition_es":"entrar; introducirse (en un mercado)","definition_de":"in einen Markt vordringen; expandieren","definition_fr":"s'implanter; percer (sur un marché)","definition_vi":"thâm nhập; tiến vào (thị trường)","definition_th":"บุก; ก้าวเข้าสู่ (ตลาด)","definition_id":"masuk; merambah (pasar)","example_ko":"그 브랜드는 해외 시장에 진출했다.","example_en":"The brand entered overseas markets.","example_ja":"そのブランドは海外市場に進出した。","example_zh_tw":"那個品牌進軍海外市場。","example_es":"La marca entró en los mercados extranjeros.","example_de":"Die Marke drang in ausländische Märkte vor.","example_fr":"La marque s'est implantée sur les marchés étrangers.","example_vi":"Thương hiệu đã thâm nhập thị trường nước ngoài.","example_th":"แบรนด์นั้นบุกตลาดต่างประเทศ","example_id":"Merek itu masuk ke pasar luar negeri."},
{"word":"매출","reading":"maechul","reading_ja":"メチュル","part_of_speech":"noun","definition_en":"sales; revenue","definition_ja":"売上","definition_zh_tw":"營業額；銷售額","definition_es":"ventas; facturación","definition_de":"Umsatz","definition_fr":"chiffre d'affaires; ventes","definition_vi":"doanh số; doanh thu","definition_th":"ยอดขาย; รายได้","definition_id":"penjualan; omzet","example_ko":"회사의 매출이 크게 늘었다.","example_en":"The company's sales grew significantly.","example_ja":"会社の売上が大きく伸びた。","example_zh_tw":"公司的營業額大幅增加。","example_es":"Las ventas de la empresa crecieron mucho.","example_de":"Der Umsatz des Unternehmens stieg stark.","example_fr":"Le chiffre d'affaires de l'entreprise a fortement augmenté.","example_vi":"Doanh số của công ty tăng mạnh.","example_th":"ยอดขายของบริษัทเพิ่มขึ้นมาก","example_id":"Penjualan perusahaan meningkat pesat."},
{"word":"플랫폼","reading":"peullaetpom","reading_ja":"プルレッポム","part_of_speech":"noun","definition_en":"platform (online service)","definition_ja":"プラットフォーム","definition_zh_tw":"平台","definition_es":"plataforma","definition_de":"Plattform","definition_fr":"plateforme","definition_vi":"nền tảng","definition_th":"แพลตฟอร์ม","definition_id":"platform","example_ko":"많은 사람이 이 플랫폼에서 옷을 산다.","example_en":"Many people buy clothes on this platform.","example_ja":"多くの人がこのプラットフォームで服を買う。","example_zh_tw":"很多人在這個平台買衣服。","example_es":"Mucha gente compra ropa en esta plataforma.","example_de":"Viele Menschen kaufen Kleidung auf dieser Plattform.","example_fr":"Beaucoup de gens achètent des vêtements sur cette plateforme.","example_vi":"Nhiều người mua quần áo trên nền tảng này.","example_th":"หลายคนซื้อเสื้อผ้าบนแพลตฟอร์มนี้","example_id":"Banyak orang membeli pakaian di platform ini."}
]$a8$::jsonb,
'published', true, 0,
'2026-06-16T23:00:00Z', '2026-06-16T23:00:00Z', '2026-06-16T23:00:00Z'
);

-- Article 9 — 2026-06-18 politics advanced — impeachment petition vs Defense Minister over military reform
INSERT INTO articles (topic_id, slug, title_en, title_ko, title_ja, title_zh_tw, title_es, title_de, title_fr, title_vi, title_th, title_id, summary_en, summary_ko, summary_ja, summary_zh_tw, summary_es, summary_de, summary_fr, summary_vi, summary_th, summary_id, content_en, content_ko, content_ja, content_zh_tw, content_es, content_de, content_fr, content_vi, content_th, content_id, seo_description, seo_keywords, level, reading_time_en, reading_time_ko, reading_time_ja, vocabulary, status, ai_generated, view_count, published_at, created_at, updated_at) VALUES (
(SELECT id FROM topics WHERE slug = 'politics'),
'politics-2026-06-18',
$a9$Petition Seeks Defense Minister's Impeachment Over Military Reform$a9$,
$a9$군 개혁 놓고 국방장관 탄핵 청원 등장$a9$,
$a9$軍改革めぐり国防相の弾劾請願が浮上$a9$,
$a9$軍事改革爭議 國防部長遭彈劾請願$a9$,
$a9$Piden por petición la destitución del ministro de Defensa$a9$,
$a9$Petition fordert Amtsenthebung des Verteidigungsministers$a9$,
$a9$Une pétition réclame la destitution du ministre de la Défense$a9$,
$a9$Kiến nghị đòi luận tội Bộ trưởng Quốc phòng vì cải cách quân đội$a9$,
$a9$ยื่นคำร้องถอดถอน รมว.กลาโหม ปมปฏิรูปกองทัพ$a9$,
$a9$Petisi Tuntut Pemakzulan Menteri Pertahanan soal Reformasi Militer$a9$,
$a9$A petition to impeach Defense Minister Ahn Gyu-back appeared at the National Assembly on June 18, 2026, as the opposition fought his plan to dissolve the Defense Counterintelligence Command. The body was tied to the December 2024 martial law crisis.$a9$,
$a9$2026년 6월 18일 국회에 안규백 국방장관 탄핵 청원이 올라왔다. 야당이 그의 국군방첩사령부 해체 계획에 반발한 것이다. 이 조직은 2024년 12월 계엄 사태와 얽혀 있다.$a9$,
$a9$2026年6月18日、国会に安圭伯（アン・ギュベク）国防相の弾劾請願が提出された。野党が国軍防諜司令部を解体する計画に反発したためだ。この組織は2024年12月の戒厳事態と関わりがある。$a9$,
$a9$2026年6月18日，韓國國會出現彈劾國防部長安圭伯的請願，起因是在野黨反對他解散國軍防諜司令部的計畫。該機構與2024年12月的戒嚴危機有關。$a9$,
$a9$El 18 de junio de 2026 apareció en la Asamblea Nacional una petición para destituir al ministro de Defensa, Ahn Gyu-back, mientras la oposición combatía su plan de disolver el Comando de Contrainteligencia de Defensa, vinculado a la crisis de la ley marcial de diciembre de 2024.$a9$,
$a9$Am 18. Juni 2026 tauchte im Parlament eine Petition zur Amtsenthebung von Verteidigungsminister Ahn Gyu-back auf, während die Opposition gegen seinen Plan kämpfte, das Kommando für Spionageabwehr aufzulösen – eine Behörde, die mit der Kriegsrechtskrise vom Dezember 2024 verbunden ist.$a9$,
$a9$Le 18 juin 2026, une pétition réclamant la destitution du ministre de la Défense Ahn Gyu-back est apparue à l'Assemblée nationale, l'opposition combattant son projet de dissoudre le Commandement du contre-espionnage de la Défense, lié à la crise de la loi martiale de décembre 2024.$a9$,
$a9$Ngày 18/6/2026, một kiến nghị luận tội Bộ trưởng Quốc phòng Ahn Gyu-back xuất hiện tại Quốc hội, khi phe đối lập phản đối kế hoạch giải thể Bộ Tư lệnh Phản gián Quốc phòng của ông. Cơ quan này liên quan đến khủng hoảng thiết quân luật tháng 12/2024.$a9$,
$a9$เมื่อวันที่ 18 มิถุนายน 2026 มีคำร้องถอดถอนอัน กยูแบ็ก รัฐมนตรีกลาโหม ปรากฏต่อรัฐสภา ขณะฝ่ายค้านคัดค้านแผนยุบกองบัญชาการต่อต้านข่าวกรองกลาโหมของเขา หน่วยงานนี้เกี่ยวพันกับวิกฤตกฎอัยการศึกเดือนธันวาคม 2024$a9$,
$a9$Pada 18 Juni 2026, petisi pemakzulan Menteri Pertahanan Ahn Gyu-back muncul di Majelis Nasional, seiring oposisi menentang rencananya membubarkan Komando Kontra-Intelijen Pertahanan. Lembaga itu terkait krisis darurat militer Desember 2024.$a9$,
$a9$A public petition demanding the impeachment of Defense Minister Ahn Gyu-back appeared on the National Assembly's petition website on June 18, 2026, as the conservative opposition intensified calls for his dismissal. At issue is Ahn's drive to dissolve the Defense Counterintelligence Command, a powerful military intelligence body.

The command has long been controversial in South Korea. It was implicated in the short-lived martial law declaration of December 2024, which plunged the country into crisis and ultimately led to a change of government. President Lee Jae-myung, in office since June 2025, campaigned on reining in the military's political influence, and Ahn's plan is part of that agenda.

The People Power Party, the main opposition, argues that dismantling the command would weaken national security and hand the president too much control over the armed forces. Two petitions opposing the reform gained signatures at the National Assembly, and the party pressed for Ahn's removal in parliamentary sessions.

The clash lands at a delicate moment. Lee's approval rating slipped below 50 percent in mid-June for the first time since he took office, weighed down by fallout from a local election marred by a ballot shortage. How the government handles the Defense Counterintelligence Command has become a test of both its reform promises and its ability to manage a divided legislature.$a9$,
$a9$2026년 6월 18일, 안규백 국방부 장관의 탄핵을 요구하는 국민 청원이 국회 청원 사이트에 올라왔다. 보수 야당이 그의 해임 요구 목소리를 높이는 가운데 나온 것이다. 쟁점은 강력한 군 정보기관인 국군방첩사령부를 해체하려는 안 장관의 추진이다.

이 사령부는 한국에서 오랫동안 논란의 대상이었다. 2024년 12월, 나라를 위기로 몰아넣고 결국 정권 교체로 이어진 짧은 계엄 선포에 연루된 곳이기 때문이다. 2025년 6월 취임한 이재명 대통령은 군의 정치적 영향력을 억제하겠다고 공약했고, 안 장관의 계획도 그 연장선에 있다.

제1야당인 국민의힘은 사령부를 해체하면 국가 안보가 약해지고 대통령이 군에 대한 통제권을 지나치게 갖게 된다고 주장한다. 이 개혁에 반대하는 청원 두 건이 국회에서 서명을 모았고, 당은 국회 회기에서 안 장관 해임을 압박했다.

이번 충돌은 미묘한 시점에 벌어졌다. 이 대통령의 지지율은 6월 중순 취임 이후 처음으로 50% 아래로 내려갔는데, 투표용지 부족으로 얼룩진 지방선거의 여파가 부담이 됐다. 정부가 국군방첩사령부 문제를 어떻게 다루느냐는 개혁 공약의 진정성과 분열된 국회를 다루는 능력을 함께 가늠하는 시험대가 되었다.$a9$,
$a9$2026年6月18日、安圭伯（アン・ギュベク）国防部長官の弾劾を求める国民請願が、国会の請願サイトに掲載された。保守系野党が更迭を求める声を強める中での動きだ。争点は、強力な軍情報機関である国軍防諜司令部を解体しようとする安氏の取り組みである。

この司令部は韓国で長く論争の的だった。2024年12月、国を危機に陥れ、最終的に政権交代につながった短期間の戒厳令に関与した組織だからだ。2025年6月に就任した李在明（イ・ジェミョン）大統領は、軍の政治的影響力を抑えると公約しており、安氏の計画もその一環にある。

第1野党の「国民の力」は、司令部を解体すれば安全保障が弱まり、大統領が軍に対する統制を持ちすぎると主張する。この改革に反対する請願2件が国会で署名を集め、同党は国会会期で安氏の更迭を迫った。

今回の対立は微妙な時期に起きた。李大統領の支持率は6月中旬、就任以来初めて50%を割り込み、投票用紙不足で混乱した地方選挙の余波が重しとなった。政府が国軍防諜司令部の問題をどう扱うかは、改革公約の本気度と、分裂した議会を御する能力の両方を試す場となっている。$a9$,
$a9$2026年6月18日，要求彈劾國防部長安圭伯的國民請願出現在國會請願網站上，此時保守派在野黨也加大要求他下台的力道。爭議焦點在於安圭伯推動解散國軍防諜司令部——一個實力雄厚的軍事情報機構。

這個司令部在韓國長期備受爭議。它牽涉2024年12月那場短暫的戒嚴令，該事件把國家推入危機，最終導致政權更替。2025年6月上任的李在明總統，競選時就承諾要抑制軍方的政治影響力，安圭伯的計畫正是這項議程的一環。

第一大在野黨國民力量主張，解散該司令部會削弱國家安全，並讓總統對軍隊掌握過多控制權。兩份反對這項改革的請願在國會累積連署，該黨也在國會會期中施壓要求撤換安圭伯。

這場衝突發生在敏感時刻。李在明的支持率在6月中旬首度跌破50%，因選票短缺而亂象叢生的地方選舉餘波成了負擔。政府如何處理國軍防諜司令部問題，已成為檢驗其改革誠意與駕馭分裂國會能力的雙重試金石。$a9$,
$a9$El 18 de junio de 2026, apareció en el sitio de peticiones de la Asamblea Nacional una solicitud ciudadana que reclamaba la destitución del ministro de Defensa, Ahn Gyu-back, mientras la oposición conservadora arreciaba en sus llamamientos a apartarlo. El punto de fricción es el empeño de Ahn en disolver el Comando de Contrainteligencia de Defensa, un poderoso organismo de inteligencia militar.

El comando ha sido durante mucho tiempo polémico en Corea del Sur. Estuvo implicado en la breve declaración de ley marcial de diciembre de 2024, que sumió al país en una crisis y acabó provocando un cambio de gobierno. El presidente Lee Jae-myung, en el cargo desde junio de 2025, prometió en campaña frenar la influencia política del ejército, y el plan de Ahn forma parte de esa agenda.

El Partido del Poder Popular, principal fuerza opositora, sostiene que desmantelar el comando debilitaría la seguridad nacional y otorgaría al presidente demasiado control sobre las fuerzas armadas. Dos peticiones contra la reforma reunieron firmas en la Asamblea, y el partido presionó por la salida de Ahn en las sesiones parlamentarias.

El choque llega en un momento delicado. La aprobación de Lee cayó por debajo del 50 por ciento a mediados de junio por primera vez desde que asumió, lastrada por las secuelas de unas elecciones locales empañadas por la falta de papeletas. Cómo maneje el gobierno el Comando de Contrainteligencia de Defensa se ha convertido en una prueba tanto de sus promesas de reforma como de su capacidad para lidiar con un legislativo dividido.$a9$,
$a9$Am 18. Juni 2026 erschien auf der Petitionsseite der Nationalversammlung eine Bürgerpetition, die die Amtsenthebung von Verteidigungsminister Ahn Gyu-back forderte, während die konservative Opposition ihre Rufe nach seiner Entlassung verstärkte. Streitpunkt ist Ahns Vorstoß, das Kommando für militärische Spionageabwehr aufzulösen, eine mächtige Militärgeheimdienstbehörde.

Das Kommando ist in Südkorea seit Langem umstritten. Es war in die kurzzeitige Ausrufung des Kriegsrechts vom Dezember 2024 verwickelt, die das Land in eine Krise stürzte und schließlich zu einem Regierungswechsel führte. Präsident Lee Jae-myung, seit Juni 2025 im Amt, hatte im Wahlkampf versprochen, den politischen Einfluss des Militärs einzudämmen; Ahns Plan ist Teil dieser Agenda.

Die oppositionelle People Power Party argumentiert, die Auflösung des Kommandos würde die nationale Sicherheit schwächen und dem Präsidenten zu viel Kontrolle über die Streitkräfte geben. Zwei Petitionen gegen die Reform sammelten in der Nationalversammlung Unterschriften, und die Partei drängte in Parlamentssitzungen auf Ahns Absetzung.

Der Zusammenstoß fällt in eine heikle Zeit. Lees Zustimmungswert rutschte Mitte Juni erstmals seit Amtsantritt unter 50 Prozent, belastet durch die Folgen einer Kommunalwahl, die durch einen Mangel an Stimmzetteln überschattet war. Wie die Regierung mit dem Kommando für Spionageabwehr umgeht, ist zu einem Test sowohl ihrer Reformversprechen als auch ihrer Fähigkeit geworden, ein gespaltenes Parlament zu führen.$a9$,
$a9$Le 18 juin 2026, une pétition citoyenne réclamant la destitution du ministre de la Défense Ahn Gyu-back est apparue sur le site de pétitions de l'Assemblée nationale, alors que l'opposition conservatrice intensifiait ses appels à son renvoi. Le point de friction est la volonté d'Ahn de dissoudre le Commandement du contre-espionnage de la Défense, un puissant organe de renseignement militaire.

Ce commandement est depuis longtemps controversé en Corée du Sud. Il a été impliqué dans la brève déclaration de loi martiale de décembre 2024, qui a plongé le pays dans une crise et a fini par entraîner un changement de gouvernement. Le président Lee Jae-myung, en fonction depuis juin 2025, avait promis pendant sa campagne de brider l'influence politique de l'armée, et le plan d'Ahn s'inscrit dans cette démarche.

Le Parti du pouvoir au peuple, principale formation d'opposition, soutient que démanteler ce commandement affaiblirait la sécurité nationale et donnerait au président trop de contrôle sur les forces armées. Deux pétitions contre la réforme ont recueilli des signatures à l'Assemblée, et le parti a réclamé le départ d'Ahn lors des séances parlementaires.

L'affrontement survient à un moment délicat. La cote de Lee est passée sous les 50 % à la mi-juin, pour la première fois depuis son entrée en fonction, plombée par les retombées d'élections locales entachées par une pénurie de bulletins de vote. La manière dont le gouvernement traite le Commandement du contre-espionnage de la Défense est devenue un test à la fois de ses promesses de réforme et de sa capacité à gérer un parlement divisé.$a9$,
$a9$Ngày 18 tháng 6 năm 2026, một kiến nghị của người dân đòi luận tội Bộ trưởng Quốc phòng Ahn Gyu-back xuất hiện trên trang kiến nghị của Quốc hội, giữa lúc phe đối lập bảo thủ gia tăng lời kêu gọi cách chức ông. Vấn đề gây tranh cãi là nỗ lực của ông Ahn nhằm giải thể Bộ Tư lệnh Phản gián Quốc phòng, một cơ quan tình báo quân sự đầy quyền lực.

Cơ quan này từ lâu đã gây tranh cãi ở Hàn Quốc. Nó dính líu đến lệnh thiết quân luật ngắn ngủi hồi tháng 12 năm 2024, sự kiện đẩy đất nước vào khủng hoảng và cuối cùng dẫn đến thay đổi chính phủ. Tổng thống Lee Jae-myung, nhậm chức từ tháng 6 năm 2025, đã tranh cử với cam kết kiềm chế ảnh hưởng chính trị của quân đội, và kế hoạch của ông Ahn nằm trong chương trình đó.

Đảng Quyền lực Nhân dân, phe đối lập chính, lập luận rằng giải thể cơ quan này sẽ làm suy yếu an ninh quốc gia và trao cho tổng thống quá nhiều quyền kiểm soát quân đội. Hai kiến nghị phản đối cuộc cải cách đã thu thập chữ ký tại Quốc hội, và đảng này thúc ép bãi nhiệm ông Ahn trong các phiên họp nghị viện.

Cuộc đối đầu diễn ra vào thời điểm nhạy cảm. Tỷ lệ ủng hộ ông Lee tụt xuống dưới 50% vào giữa tháng 6, lần đầu tiên kể từ khi ông nhậm chức, do hệ quả của một cuộc bầu cử địa phương bị ảnh hưởng bởi tình trạng thiếu phiếu bầu. Cách chính phủ xử lý Bộ Tư lệnh Phản gián Quốc phòng đã trở thành phép thử cho cả cam kết cải cách lẫn khả năng điều hành một cơ quan lập pháp chia rẽ.$a9$,
$a9$เมื่อวันที่ 18 มิถุนายน 2026 คำร้องของประชาชนที่เรียกร้องให้ถอดถอนอัน กยูแบ็ก รัฐมนตรีว่าการกระทรวงกลาโหม ปรากฏบนเว็บไซต์คำร้องของรัฐสภา ท่ามกลางฝ่ายค้านสายอนุรักษนิยมที่เพิ่มแรงกดดันให้ปลดเขา ประเด็นขัดแย้งคือความพยายามของอันในการยุบกองบัญชาการต่อต้านข่าวกรองกลาโหม ซึ่งเป็นหน่วยข่าวกรองทหารที่ทรงอิทธิพล

กองบัญชาการนี้เป็นที่ถกเถียงในเกาหลีใต้มานาน เพราะมีส่วนพัวพันกับการประกาศกฎอัยการศึกช่วงสั้น ๆ ในเดือนธันวาคม 2024 ที่ผลักประเทศเข้าสู่วิกฤตและนำไปสู่การเปลี่ยนรัฐบาลในที่สุด ประธานาธิบดีอี แจมยอง ซึ่งเข้ารับตำแหน่งตั้งแต่มิถุนายน 2025 หาเสียงด้วยคำมั่นที่จะควบคุมอิทธิพลทางการเมืองของกองทัพ และแผนของอันก็เป็นส่วนหนึ่งของวาระนั้น

พรรคพลังประชาชน ซึ่งเป็นฝ่ายค้านหลัก โต้แย้งว่าการยุบกองบัญชาการจะบั่นทอนความมั่นคงของชาติและมอบอำนาจควบคุมกองทัพให้ประธานาธิบดีมากเกินไป คำร้องสองฉบับที่คัดค้านการปฏิรูปได้รวบรวมรายชื่อในรัฐสภา และพรรคยังกดดันให้ปลดอันในการประชุมสภา

ความขัดแย้งนี้เกิดขึ้นในช่วงเวลาที่ละเอียดอ่อน คะแนนนิยมของอีร่วงต่ำกว่า 50% เมื่อกลางเดือนมิถุนายน เป็นครั้งแรกนับตั้งแต่เข้ารับตำแหน่ง จากผลพวงของการเลือกตั้งท้องถิ่นที่วุ่นวายเพราะบัตรลงคะแนนขาดแคลน วิธีที่รัฐบาลจัดการกับกองบัญชาการต่อต้านข่าวกรองกลาโหมจึงกลายเป็นบททดสอบทั้งคำมั่นด้านการปฏิรูปและความสามารถในการบริหารสภาที่แตกแยก$a9$,
$a9$Pada 18 Juni 2026, petisi warga yang menuntut pemakzulan Menteri Pertahanan Ahn Gyu-back muncul di situs petisi Majelis Nasional, saat oposisi konservatif memperkuat seruan agar ia dicopot. Titik persoalannya adalah upaya Ahn membubarkan Komando Kontra-Intelijen Pertahanan, sebuah badan intelijen militer yang berpengaruh.

Komando itu sudah lama kontroversial di Korea Selatan. Ia terlibat dalam deklarasi darurat militer singkat pada Desember 2024, yang menjerumuskan negara ke dalam krisis dan akhirnya memicu pergantian pemerintahan. Presiden Lee Jae-myung, yang menjabat sejak Juni 2025, berkampanye untuk mengekang pengaruh politik militer, dan rencana Ahn adalah bagian dari agenda itu.

Partai Kekuatan Rakyat, oposisi utama, berargumen bahwa membubarkan komando itu akan melemahkan keamanan nasional dan memberi presiden terlalu banyak kendali atas angkatan bersenjata. Dua petisi yang menentang reformasi tersebut mengumpulkan tanda tangan di Majelis, dan partai itu mendesak pemecatan Ahn dalam sidang parlemen.

Bentrokan ini datang pada momen yang sensitif. Tingkat dukungan Lee anjlok di bawah 50 persen pada pertengahan Juni untuk pertama kalinya sejak ia menjabat, tertekan dampak pemilihan lokal yang tercoreng kekurangan surat suara. Bagaimana pemerintah menangani Komando Kontra-Intelijen Pertahanan telah menjadi ujian bagi janji reformasinya sekaligus kemampuannya mengelola legislatif yang terbelah.$a9$,
$a9$A petition to impeach Defense Minister Ahn Gyu-back hit the National Assembly on June 18, 2026, over his plan to dissolve the Defense Counterintelligence Command.$a9$,
$a9$Ahn Gyu-back, Defense Counterintelligence Command, Lee Jae-myung, Korea military reform, impeachment petition, People Power Party$a9$,
'advanced',
3, 4, 4,
$a9$[
{"word":"국방부","reading":"gukbangbu","reading_ja":"ククパンブ","part_of_speech":"noun","definition_en":"Ministry of National Defense","definition_ja":"国防部（国防省）","definition_zh_tw":"國防部","definition_es":"Ministerio de Defensa Nacional","definition_de":"Verteidigungsministerium","definition_fr":"ministère de la Défense","definition_vi":"Bộ Quốc phòng","definition_th":"กระทรวงกลาโหม","definition_id":"Kementerian Pertahanan","example_ko":"국방부가 새 정책을 발표했다.","example_en":"The Ministry of National Defense announced a new policy.","example_ja":"国防部が新しい政策を発表した。","example_zh_tw":"國防部公布了新政策。","example_es":"El Ministerio de Defensa anunció una nueva política.","example_de":"Das Verteidigungsministerium kündigte eine neue Politik an.","example_fr":"Le ministère de la Défense a annoncé une nouvelle politique.","example_vi":"Bộ Quốc phòng đã công bố một chính sách mới.","example_th":"กระทรวงกลาโหมประกาศนโยบายใหม่","example_id":"Kementerian Pertahanan mengumumkan kebijakan baru."},
{"word":"장관","reading":"janggwan","reading_ja":"チャングァン","part_of_speech":"noun","definition_en":"(government) minister; cabinet secretary","definition_ja":"（閣僚の）長官・大臣","definition_zh_tw":"部長；首長","definition_es":"ministro (del gobierno)","definition_de":"Minister","definition_fr":"ministre","definition_vi":"bộ trưởng","definition_th":"รัฐมนตรี","definition_id":"menteri","example_ko":"새 장관이 오늘 임명되었다.","example_en":"A new minister was appointed today.","example_ja":"新しい長官が今日任命された。","example_zh_tw":"新部長今天獲任命。","example_es":"Hoy se nombró a un nuevo ministro.","example_de":"Heute wurde ein neuer Minister ernannt.","example_fr":"Un nouveau ministre a été nommé aujourd'hui.","example_vi":"Một bộ trưởng mới được bổ nhiệm hôm nay.","example_th":"วันนี้มีการแต่งตั้งรัฐมนตรีคนใหม่","example_id":"Seorang menteri baru dilantik hari ini."},
{"word":"탄핵","reading":"tanhaek","reading_ja":"タネク","part_of_speech":"noun","definition_en":"impeachment","definition_ja":"弾劾","definition_zh_tw":"彈劾","definition_es":"destitución; juicio político","definition_de":"Amtsenthebung; Impeachment","definition_fr":"destitution; mise en accusation","definition_vi":"luận tội; phế truất","definition_th":"การถอดถอน","definition_id":"pemakzulan","example_ko":"야당이 장관의 탄핵을 요구했다.","example_en":"The opposition demanded the minister's impeachment.","example_ja":"野党が長官の弾劾を求めた。","example_zh_tw":"在野黨要求彈劾部長。","example_es":"La oposición exigió la destitución del ministro.","example_de":"Die Opposition forderte die Amtsenthebung des Ministers.","example_fr":"L'opposition a exigé la destitution du ministre.","example_vi":"Phe đối lập yêu cầu luận tội bộ trưởng.","example_th":"ฝ่ายค้านเรียกร้องให้ถอดถอนรัฐมนตรี","example_id":"Oposisi menuntut pemakzulan menteri itu."},
{"word":"청원","reading":"cheongwon","reading_ja":"チョンウォン","part_of_speech":"noun","definition_en":"petition (formal request to authorities)","definition_ja":"請願","definition_zh_tw":"請願；陳情","definition_es":"petición (solicitud formal)","definition_de":"Petition; Eingabe","definition_fr":"pétition","definition_vi":"kiến nghị; thỉnh nguyện","definition_th":"คำร้อง; การยื่นเรื่อง","definition_id":"petisi","example_ko":"많은 사람이 그 청원에 서명했다.","example_en":"Many people signed the petition.","example_ja":"多くの人がその請願に署名した。","example_zh_tw":"許多人在那份請願上連署。","example_es":"Mucha gente firmó la petición.","example_de":"Viele Menschen unterschrieben die Petition.","example_fr":"Beaucoup de gens ont signé la pétition.","example_vi":"Nhiều người đã ký vào bản kiến nghị.","example_th":"หลายคนลงชื่อในคำร้องนั้น","example_id":"Banyak orang menandatangani petisi itu."},
{"word":"개혁","reading":"gaehyeok","reading_ja":"ケヒョク","part_of_speech":"noun","definition_en":"reform","definition_ja":"改革","definition_zh_tw":"改革","definition_es":"reforma","definition_de":"Reform","definition_fr":"réforme","definition_vi":"cải cách","definition_th":"การปฏิรูป","definition_id":"reformasi","example_ko":"정부는 군 개혁을 추진하고 있다.","example_en":"The government is pursuing military reform.","example_ja":"政府は軍の改革を進めている。","example_zh_tw":"政府正在推動軍事改革。","example_es":"El gobierno impulsa una reforma militar.","example_de":"Die Regierung treibt eine Militärreform voran.","example_fr":"Le gouvernement mène une réforme militaire.","example_vi":"Chính phủ đang thúc đẩy cải cách quân đội.","example_th":"รัฐบาลกำลังผลักดันการปฏิรูปกองทัพ","example_id":"Pemerintah menjalankan reformasi militer."}
]$a9$::jsonb,
'published', true, 0,
'2026-06-17T23:00:00Z', '2026-06-17T23:00:00Z', '2026-06-17T23:00:00Z'
);

-- Article 10 — 2026-06-19 education beginner — AI digital textbooks scaled back
INSERT INTO articles (topic_id, slug, title_en, title_ko, title_ja, title_zh_tw, title_es, title_de, title_fr, title_vi, title_th, title_id, summary_en, summary_ko, summary_ja, summary_zh_tw, summary_es, summary_de, summary_fr, summary_vi, summary_th, summary_id, content_en, content_ko, content_ja, content_zh_tw, content_es, content_de, content_fr, content_vi, content_th, content_id, seo_description, seo_keywords, level, reading_time_en, reading_time_ko, reading_time_ja, vocabulary, status, ai_generated, view_count, published_at, created_at, updated_at) VALUES (
(SELECT id FROM topics WHERE slug = 'education'),
'education-2026-06-19',
$a10$South Korea Scales Back AI Digital Textbooks After Backlash$a10$,
$a10$한국, 반발 속 AI 디지털 교과서 축소$a10$,
$a10$韓国、反発を受けAIデジタル教科書を縮小$a10$,
$a10$遭反彈 韓國縮減AI數位教科書$a10$,
$a10$Corea del Sur reduce los libros digitales con IA tras las críticas$a10$,
$a10$Südkorea fährt KI-Digitalschulbücher nach Kritik zurück$a10$,
$a10$La Corée du Sud réduit ses manuels numériques à IA après la fronde$a10$,
$a10$Hàn Quốc thu hẹp sách giáo khoa số AI sau phản ứng dữ dội$a10$,
$a10$เกาหลีใต้ลดบทบาทแบบเรียนดิจิทัล AI หลังเสียงคัดค้าน$a10$,
$a10$Korea Selatan Pangkas Buku Digital AI Setelah Penolakan$a10$,
$a10$South Korea has reclassified its AI digital textbooks as 'supplementary materials,' so schools no longer have to use them, after complaints from teachers, students, and parents. The program had launched only in 2025 for subjects like math and English.$a10$,
$a10$한국이 AI 디지털 교과서를 '보조 자료'로 재분류해, 학교가 더 이상 의무적으로 쓰지 않아도 되게 했다. 교사·학생·학부모의 불만이 이어진 결과다. 이 사업은 2025년 수학·영어 등 과목에서 시작된 지 얼마 되지 않았다.$a10$,
$a10$韓国がAIデジタル教科書を「補助教材」に再分類し、学校が必ずしも使わなくてよいことにした。教師・生徒・保護者の不満を受けての措置だ。この事業は2025年に数学や英語などで始まったばかりだった。$a10$,
$a10$在教師、學生與家長不斷抱怨後，韓國把AI數位教科書重新歸類為「輔助教材」，學校不再必須使用。這項計畫2025年才在數學、英語等科目啟動不久。$a10$,
$a10$Corea del Sur ha reclasificado sus libros digitales con IA como 'material complementario', de modo que las escuelas ya no están obligadas a usarlos, tras las quejas de profesores, alumnos y padres. El programa había arrancado apenas en 2025 en asignaturas como matemáticas e inglés.$a10$,
$a10$Südkorea hat seine KI-Digitalschulbücher als 'Zusatzmaterial' eingestuft, sodass Schulen sie nicht mehr verwenden müssen – nach Beschwerden von Lehrern, Schülern und Eltern. Das Programm war erst 2025 in Fächern wie Mathe und Englisch gestartet.$a10$,
$a10$La Corée du Sud a reclassé ses manuels numériques à IA comme 'matériel complémentaire', si bien que les écoles ne sont plus obligées de les utiliser, après les plaintes d'enseignants, d'élèves et de parents. Le programme n'avait démarré qu'en 2025 en maths et en anglais.$a10$,
$a10$Hàn Quốc đã xếp lại sách giáo khoa số dùng AI thành 'tài liệu bổ trợ', nên các trường không còn bắt buộc sử dụng, sau khi giáo viên, học sinh và phụ huynh phàn nàn. Chương trình mới chỉ khởi động năm 2025 cho các môn như toán và tiếng Anh.$a10$,
$a10$เกาหลีใต้จัดประเภทแบบเรียนดิจิทัล AI ใหม่ให้เป็น 'สื่อเสริม' ทำให้โรงเรียนไม่จำเป็นต้องใช้อีกต่อไป หลังครู นักเรียน และผู้ปกครองร้องเรียน โครงการนี้เพิ่งเริ่มในปี 2025 ในวิชาอย่างคณิตศาสตร์และภาษาอังกฤษ$a10$,
$a10$Korea Selatan mengklasifikasikan ulang buku digital AI-nya sebagai 'materi pelengkap', sehingga sekolah tak lagi wajib memakainya, setelah keluhan dari guru, siswa, dan orang tua. Program itu baru diluncurkan pada 2025 untuk mata pelajaran seperti matematika dan Inggris.$a10$,
$a10$South Korea has pulled back its ambitious plan to put AI-powered digital textbooks in classrooms. Lawmakers stripped the AI books of their official 'textbook' status and reclassified them as 'supplementary materials,' meaning schools no longer have to use them. The change followed complaints from many teachers, students, and parents.

The program began under the previous government in 2025, starting with math, English, and computer subjects. The digital textbooks used AI to adjust lessons to each student's level. But critics worried the tools were rushed, added screen time, and were not proven to help learning.

Education is taken very seriously in South Korea, and changes to the classroom draw strong reactions. The reversal left many schools and technology companies unsure of what comes next, as the government now studies how to use AI in education more carefully.$a10$,
$a10$한국이 인공지능(AI) 기반 디지털 교과서를 교실에 도입하려던 야심 찬 계획을 뒤로 물렸다. 국회는 이 AI 교재의 공식 '교과서' 지위를 없애고 '보조 자료'로 재분류했다. 이제 학교는 이 자료를 반드시 쓰지 않아도 된다. 이번 변화는 많은 교사와 학생, 학부모의 불만에 따른 것이다.

이 사업은 이전 정부에서 2025년에 시작됐고, 수학·영어·컴퓨터 과목부터 도입됐다. 이 디지털 교과서는 AI를 이용해 학생 개개인의 수준에 맞춰 수업 내용을 조정했다. 하지만 비판하는 이들은 이 도구가 너무 서둘러 도입됐고, 화면을 보는 시간을 늘리며, 학습에 도움이 된다는 증거가 부족하다고 우려했다.

한국에서는 교육을 매우 중요하게 여겨, 교실의 변화는 강한 반응을 부른다. 이번 방향 전환으로 많은 학교와 기술 기업은 앞으로 무엇을 해야 할지 불확실해졌고, 정부는 이제 AI를 교육에 어떻게 더 신중하게 쓸지 다시 검토하고 있다.$a10$,
$a10$韓国が、人工知能（AI）を使ったデジタル教科書を教室に導入するという野心的な計画を後退させた。国会はこのAI教材の正式な「教科書」の地位をなくし、「補助教材」に再分類した。これにより学校は必ずしもこれを使わなくてよくなった。今回の変更は、多くの教師や生徒、保護者の不満を受けたものだ。

この事業は前政権のもと2025年に始まり、数学・英語・情報の科目から導入された。このデジタル教科書はAIを使って生徒一人ひとりの理解度に合わせて授業内容を調整した。しかし批判する人々は、この仕組みが急いで導入されすぎ、画面を見る時間を増やし、学習に役立つという証拠が乏しいと懸念した。

韓国では教育が非常に重視され、教室の変化は強い反応を呼ぶ。今回の方針転換で、多くの学校や技術系企業は次に何をすべきか不透明になり、政府はいまAIを教育にどうもっと慎重に使うかを改めて検討している。$a10$,
$a10$韓國把在課堂導入AI數位教科書的雄心計畫往後撤。國會取消了這些AI教材的正式「教科書」地位，重新歸類為「輔助教材」，意味著學校不再必須使用。這項改變是在許多教師、學生與家長抱怨後做出的。

這項計畫在前政府時期於2025年啟動，先從數學、英語與資訊等科目導入。這些數位教科書利用AI依照每位學生的程度調整上課內容。但批評者擔心，這套工具推行得太倉促，增加了看螢幕的時間，也缺乏有助學習的證據。

在韓國，教育備受重視，課堂上的變動往往引起強烈反應。這次轉向讓許多學校與科技公司對下一步感到不確定，政府如今也重新研究該如何更謹慎地把AI用於教育。$a10$,
$a10$Corea del Sur ha dado marcha atrás en su ambicioso plan de llevar libros de texto digitales con inteligencia artificial a las aulas. La Asamblea Nacional retiró a estos libros con IA su condición oficial de 'libro de texto' y los reclasificó como 'material complementario', de modo que las escuelas ya no están obligadas a usarlos. El cambio llegó tras las quejas de numerosos profesores, alumnos y padres.

El programa comenzó con el gobierno anterior en 2025, empezando por matemáticas, inglés e informática. Los libros digitales usaban IA para adaptar las clases al nivel de cada alumno. Pero los críticos temían que las herramientas se hubieran lanzado con prisas, aumentaran el tiempo de pantalla y no estuvieran probadas para mejorar el aprendizaje.

La educación se toma muy en serio en Corea del Sur, y los cambios en el aula suscitan reacciones fuertes. El giro dejó a muchas escuelas y empresas tecnológicas sin saber qué viene después, mientras el gobierno estudia ahora cómo usar la IA en la educación con más cautela.$a10$,
$a10$Südkorea hat seinen ehrgeizigen Plan zurückgefahren, KI-gestützte digitale Schulbücher in die Klassenzimmer zu bringen. Die Nationalversammlung entzog diesen KI-Büchern den offiziellen Status als 'Schulbuch' und stufte sie als 'Zusatzmaterial' ein, sodass Schulen sie nicht mehr verwenden müssen. Die Änderung folgte auf Beschwerden vieler Lehrer, Schüler und Eltern.

Das Programm begann unter der Vorgängerregierung im Jahr 2025, zunächst in Mathematik, Englisch und Informatik. Die digitalen Schulbücher nutzten KI, um den Unterricht an das Niveau jedes Schülers anzupassen. Doch Kritiker befürchteten, die Werkzeuge seien überstürzt eingeführt worden, erhöhten die Bildschirmzeit und seien nicht als lernförderlich erwiesen.

Bildung wird in Südkorea sehr ernst genommen, und Veränderungen im Klassenzimmer lösen starke Reaktionen aus. Die Kehrtwende ließ viele Schulen und Technologiefirmen im Ungewissen, was als Nächstes kommt, während die Regierung nun prüft, wie sich KI vorsichtiger im Unterricht einsetzen lässt.$a10$,
$a10$La Corée du Sud a fait marche arrière sur son ambitieux projet d'introduire des manuels numériques dopés à l'intelligence artificielle dans les salles de classe. L'Assemblée nationale a retiré à ces manuels leur statut officiel de 'manuel scolaire' et les a reclassés comme 'matériel complémentaire', si bien que les écoles ne sont plus obligées de les utiliser. Le changement fait suite aux plaintes de nombreux enseignants, élèves et parents.

Le programme avait débuté sous le gouvernement précédent en 2025, en commençant par les mathématiques, l'anglais et l'informatique. Les manuels numériques utilisaient l'IA pour adapter les cours au niveau de chaque élève. Mais les critiques craignaient que ces outils aient été déployés dans la précipitation, augmentent le temps d'écran et n'aient pas fait la preuve de leur utilité pour l'apprentissage.

L'éducation est prise très au sérieux en Corée du Sud, et les changements en classe suscitent de vives réactions. Ce revirement a laissé de nombreuses écoles et entreprises technologiques dans l'incertitude quant à la suite, tandis que le gouvernement étudie désormais comment utiliser l'IA plus prudemment dans l'enseignement.$a10$,
$a10$Hàn Quốc đã rút lại kế hoạch đầy tham vọng đưa sách giáo khoa số tích hợp trí tuệ nhân tạo (AI) vào lớp học. Quốc hội đã tước bỏ tư cách 'sách giáo khoa' chính thức của những cuốn sách AI này và xếp lại chúng thành 'tài liệu bổ trợ', nghĩa là các trường không còn bắt buộc phải dùng. Sự thay đổi diễn ra sau khi nhiều giáo viên, học sinh và phụ huynh phàn nàn.

Chương trình bắt đầu dưới thời chính phủ trước vào năm 2025, khởi đầu với các môn toán, tiếng Anh và tin học. Những cuốn sách số này dùng AI để điều chỉnh bài học theo trình độ của từng học sinh. Nhưng những người phê phán lo ngại các công cụ được triển khai vội vàng, làm tăng thời gian nhìn màn hình và chưa được chứng minh là giúp ích cho việc học.

Giáo dục được xem trọng ở Hàn Quốc, nên những thay đổi trong lớp học thường gây phản ứng mạnh. Bước ngoặt này khiến nhiều trường học và công ty công nghệ không rõ điều gì sẽ đến tiếp theo, trong khi chính phủ giờ đây nghiên cứu cách dùng AI trong giáo dục một cách thận trọng hơn.$a10$,
$a10$เกาหลีใต้ถอยจากแผนอันทะเยอทะยานที่จะนำแบบเรียนดิจิทัลที่ขับเคลื่อนด้วยปัญญาประดิษฐ์ (AI) เข้าสู่ห้องเรียน รัฐสภาได้ถอดสถานะ 'แบบเรียน' อย่างเป็นทางการของหนังสือ AI เหล่านี้ และจัดประเภทใหม่เป็น 'สื่อเสริม' หมายความว่าโรงเรียนไม่จำเป็นต้องใช้อีกต่อไป การเปลี่ยนแปลงนี้เกิดขึ้นหลังครู นักเรียน และผู้ปกครองจำนวนมากร้องเรียน

โครงการนี้เริ่มขึ้นในสมัยรัฐบาลก่อนเมื่อปี 2025 โดยเริ่มจากวิชาคณิตศาสตร์ ภาษาอังกฤษ และคอมพิวเตอร์ แบบเรียนดิจิทัลเหล่านี้ใช้ AI ปรับเนื้อหาบทเรียนให้เข้ากับระดับของนักเรียนแต่ละคน แต่ผู้วิจารณ์กังวลว่าเครื่องมือเหล่านี้ถูกนำมาใช้อย่างเร่งรีบ เพิ่มเวลาจ้องหน้าจอ และยังไม่มีหลักฐานว่าช่วยการเรียนรู้

ในเกาหลีใต้ การศึกษาถูกให้ความสำคัญอย่างมาก การเปลี่ยนแปลงในห้องเรียนจึงมักก่อให้เกิดปฏิกิริยาที่รุนแรง การหันหลังครั้งนี้ทำให้หลายโรงเรียนและบริษัทเทคโนโลยีไม่แน่ใจว่าจะเกิดอะไรขึ้นต่อไป ขณะที่รัฐบาลกำลังศึกษาว่าจะใช้ AI ในการศึกษาอย่างรอบคอบมากขึ้นได้อย่างไร$a10$,
$a10$Korea Selatan menarik kembali rencana ambisiusnya menghadirkan buku teks digital bertenaga kecerdasan buatan (AI) di ruang kelas. Majelis Nasional mencabut status resmi 'buku teks' dari buku-buku AI itu dan mengklasifikasikannya ulang sebagai 'materi pelengkap', sehingga sekolah tidak lagi wajib memakainya. Perubahan itu terjadi setelah keluhan dari banyak guru, siswa, dan orang tua.

Program itu dimulai pada masa pemerintahan sebelumnya di tahun 2025, diawali dengan mata pelajaran matematika, Inggris, dan komputer. Buku digital itu menggunakan AI untuk menyesuaikan pelajaran dengan tingkat kemampuan tiap siswa. Namun para pengkritik khawatir alat itu diluncurkan terburu-buru, menambah waktu di depan layar, dan belum terbukti membantu pembelajaran.

Pendidikan sangat dijunjung di Korea Selatan, dan perubahan di ruang kelas memicu reaksi kuat. Perubahan arah ini membuat banyak sekolah dan perusahaan teknologi tidak yakin akan langkah berikutnya, sementara pemerintah kini mengkaji cara memakai AI dalam pendidikan secara lebih hati-hati.$a10$,
$a10$South Korea reclassified its AI digital textbooks as 'supplementary materials' after backlash from teachers, students, and parents, so schools need not use them.$a10$,
$a10$AI digital textbooks, Korea education, edtech, Ministry of Education, AI in schools, education policy$a10$,
'beginner',
3, 4, 4,
$a10$[
{"word":"교과서","reading":"gyogwaseo","reading_ja":"キョグァソ","part_of_speech":"noun","definition_en":"textbook","definition_ja":"教科書","definition_zh_tw":"教科書；課本","definition_es":"libro de texto","definition_de":"Schulbuch; Lehrbuch","definition_fr":"manuel scolaire","definition_vi":"sách giáo khoa","definition_th":"แบบเรียน; หนังสือเรียน","definition_id":"buku teks; buku pelajaran","example_ko":"학생들이 새 교과서를 받았다.","example_en":"The students received new textbooks.","example_ja":"生徒たちは新しい教科書を受け取った。","example_zh_tw":"學生們拿到了新課本。","example_es":"Los alumnos recibieron nuevos libros de texto.","example_de":"Die Schüler bekamen neue Schulbücher.","example_fr":"Les élèves ont reçu de nouveaux manuels.","example_vi":"Học sinh nhận sách giáo khoa mới.","example_th":"นักเรียนได้รับแบบเรียนใหม่","example_id":"Para siswa menerima buku teks baru."},
{"word":"학생","reading":"haksaeng","reading_ja":"ハクセン","part_of_speech":"noun","definition_en":"student; pupil","definition_ja":"学生；生徒","definition_zh_tw":"學生","definition_es":"estudiante; alumno","definition_de":"Schüler; Student","definition_fr":"élève; étudiant","definition_vi":"học sinh; sinh viên","definition_th":"นักเรียน; นักศึกษา","definition_id":"siswa; pelajar","example_ko":"그 학교에는 학생이 많다.","example_en":"That school has many students.","example_ja":"その学校には生徒が多い。","example_zh_tw":"那所學校學生很多。","example_es":"Esa escuela tiene muchos estudiantes.","example_de":"Diese Schule hat viele Schüler.","example_fr":"Cette école compte beaucoup d'élèves.","example_vi":"Trường đó có nhiều học sinh.","example_th":"โรงเรียนนั้นมีนักเรียนมาก","example_id":"Sekolah itu memiliki banyak siswa."},
{"word":"교사","reading":"gyosa","reading_ja":"キョサ","part_of_speech":"noun","definition_en":"teacher","definition_ja":"教師","definition_zh_tw":"教師；老師","definition_es":"profesor; docente","definition_de":"Lehrer","definition_fr":"enseignant; professeur","definition_vi":"giáo viên","definition_th":"ครู","definition_id":"guru","example_ko":"교사들이 새 정책에 반대했다.","example_en":"Teachers opposed the new policy.","example_ja":"教師たちは新しい政策に反対した。","example_zh_tw":"教師們反對新政策。","example_es":"Los profesores se opusieron a la nueva política.","example_de":"Die Lehrer lehnten die neue Regelung ab.","example_fr":"Les enseignants se sont opposés à la nouvelle politique.","example_vi":"Giáo viên phản đối chính sách mới.","example_th":"ครูคัดค้านนโยบายใหม่","example_id":"Para guru menentang kebijakan baru itu."},
{"word":"도입하다","reading":"doiphada","reading_ja":"トイパダ","part_of_speech":"verb","definition_en":"to introduce; to adopt (a system or tool)","definition_ja":"導入する","definition_zh_tw":"引進；導入","definition_es":"introducir; adoptar","definition_de":"einführen","definition_fr":"introduire; adopter","definition_vi":"áp dụng; đưa vào sử dụng","definition_th":"นำมาใช้; นำเข้ามาใช้","definition_id":"menerapkan; memperkenalkan","example_ko":"학교가 새 기술을 도입했다.","example_en":"The school introduced new technology.","example_ja":"学校が新しい技術を導入した。","example_zh_tw":"學校引進了新技術。","example_es":"La escuela introdujo nueva tecnología.","example_de":"Die Schule führte neue Technik ein.","example_fr":"L'école a introduit une nouvelle technologie.","example_vi":"Nhà trường đã áp dụng công nghệ mới.","example_th":"โรงเรียนนำเทคโนโลยีใหม่มาใช้","example_id":"Sekolah menerapkan teknologi baru."},
{"word":"수업","reading":"sueop","reading_ja":"スオプ","part_of_speech":"noun","definition_en":"class; lesson","definition_ja":"授業","definition_zh_tw":"課；上課","definition_es":"clase; lección","definition_de":"Unterricht; Unterrichtsstunde","definition_fr":"cours; leçon","definition_vi":"tiết học; buổi học","definition_th":"การเรียน; คาบเรียน","definition_id":"pelajaran; kelas","example_ko":"오늘 수업이 아주 재미있었다.","example_en":"Today's class was very interesting.","example_ja":"今日の授業はとても面白かった。","example_zh_tw":"今天的課很有趣。","example_es":"La clase de hoy fue muy interesante.","example_de":"Der heutige Unterricht war sehr interessant.","example_fr":"Le cours d'aujourd'hui était très intéressant.","example_vi":"Tiết học hôm nay rất thú vị.","example_th":"คาบเรียนวันนี้น่าสนใจมาก","example_id":"Pelajaran hari ini sangat menarik."}
]$a10$::jsonb,
'published', true, 0,
'2026-06-18T23:00:00Z', '2026-06-18T23:00:00Z', '2026-06-18T23:00:00Z'
);

-- Article 11 — 2026-06-20 economy intermediate — OECD June outlook, BOK rate hold
INSERT INTO articles (topic_id, slug, title_en, title_ko, title_ja, title_zh_tw, title_es, title_de, title_fr, title_vi, title_th, title_id, summary_en, summary_ko, summary_ja, summary_zh_tw, summary_es, summary_de, summary_fr, summary_vi, summary_th, summary_id, content_en, content_ko, content_ja, content_zh_tw, content_es, content_de, content_fr, content_vi, content_th, content_id, seo_description, seo_keywords, level, reading_time_en, reading_time_ko, reading_time_ja, vocabulary, status, ai_generated, view_count, published_at, created_at, updated_at) VALUES (
(SELECT id FROM topics WHERE slug = 'economy'),
'economy-2026-06-20',
$a11$OECD Sees Steady 2.6% Growth for South Korea in 2026$a11$,
$a11$OECD, 2026년 한국 경제 2.6% 성장 전망$a11$,
$a11$OECD、2026年の韓国経済2.6%成長と予測$a11$,
$a11$OECD預估韓國2026年經濟成長2.6%$a11$,
$a11$La OCDE prevé un crecimiento estable del 2,6% para Corea en 2026$a11$,
$a11$OECD erwartet für Südkorea 2026 ein stetiges Wachstum von 2,6 %$a11$,
$a11$L'OCDE prévoit une croissance stable de 2,6 % pour la Corée en 2026$a11$,
$a11$OECD dự báo Hàn Quốc tăng trưởng ổn định 2,6% năm 2026$a11$,
$a11$OECD คาดเศรษฐกิจเกาหลีโต 2.6% ปี 2026$a11$,
$a11$OECD Perkirakan Ekonomi Korea Tumbuh Stabil 2,6% di 2026$a11$,
$a11$The OECD's June 2026 outlook projected South Korea to grow about 2.6 percent this year, powered by strong exports but slowed by weak old-line industries. The Bank of Korea has held its key rate at 2.5 percent for eight straight meetings amid a soft won.$a11$,
$a11$OECD가 2026년 6월 발표한 전망에서 올해 한국 경제가 약 2.6% 성장할 것으로 내다봤다. 수출 호조가 이끌지만 전통 산업 부진이 발목을 잡는다. 한국은행은 약세인 원화 속에서 기준금리를 여덟 차례 연속 2.5%로 동결했다.$a11$,
$a11$OECDが2026年6月に公表した見通しで、今年の韓国経済は約2.6%成長するとされた。好調な輸出がけん引する一方、伝統産業の低迷が重しとなる。韓国銀行は弱い韓国ウォンの中、政策金利を8会合連続で2.5%に据え置いている。$a11$,
$a11$OECD在2026年6月發布的展望中預估，韓國經濟今年將成長約2.6%，出口強勁帶動，但傳統產業疲弱拖累。在韓元走弱下，韓國央行已連續八次會議把基準利率維持在2.5%。$a11$,
$a11$El panorama de junio de 2026 de la OCDE prevé que Corea del Sur crezca en torno al 2,6 por ciento este año, impulsada por fuertes exportaciones pero frenada por industrias tradicionales débiles. El Banco de Corea ha mantenido su tipo clave en el 2,5 por ciento durante ocho reuniones seguidas, con un won flojo.$a11$,
$a11$Der OECD-Ausblick vom Juni 2026 sagt für Südkorea in diesem Jahr ein Wachstum von rund 2,6 Prozent voraus, getragen von starken Exporten, aber gebremst von schwachen traditionellen Branchen. Die Bank of Korea hält ihren Leitzins bei einem schwachen Won seit acht Sitzungen bei 2,5 Prozent.$a11$,
$a11$Les perspectives de l'OCDE de juin 2026 tablent sur une croissance d'environ 2,6 % pour la Corée du Sud cette année, portée par des exportations vigoureuses mais freinée par des industries traditionnelles faibles. La Banque de Corée maintient son taux directeur à 2,5 % depuis huit réunions, sur fond de won affaibli.$a11$,
$a11$Báo cáo triển vọng tháng 6/2026 của OECD dự báo Hàn Quốc tăng khoảng 2,6% trong năm nay, nhờ xuất khẩu mạnh nhưng bị kìm hãm bởi các ngành truyền thống yếu. Ngân hàng Trung ương Hàn Quốc giữ lãi suất chủ chốt ở mức 2,5% suốt tám cuộc họp liên tiếp trong bối cảnh đồng won yếu.$a11$,
$a11$รายงานแนวโน้มเดือนมิถุนายน 2026 ของ OECD คาดว่าเกาหลีใต้จะเติบโตราว 2.6% ในปีนี้ ด้วยแรงหนุนจากการส่งออกที่แข็งแกร่ง แต่ถูกฉุดโดยอุตสาหกรรมดั้งเดิมที่อ่อนแอ ธนาคารกลางเกาหลีคงอัตราดอกเบี้ยนโยบายที่ 2.5% ติดต่อกันแปดครั้งท่ามกลางเงินวอนที่อ่อนค่า$a11$,
$a11$Prospek OECD Juni 2026 memperkirakan Korea Selatan tumbuh sekitar 2,6 persen tahun ini, didorong ekspor kuat tetapi tertahan industri lama yang lemah. Bank of Korea menahan suku bunga acuannya di 2,5 persen selama delapan pertemuan beruntun di tengah won yang melemah.$a11$,
$a11$The OECD's mid-2026 Economic Outlook, released in June, projected South Korea's economy to grow around 2.6 percent this year, a modest but steady pace helped by booming exports. The report landed as policymakers weighed how fast the recovery is really moving.

Exports have surged since early 2026, with strong demand for South Korean technology and ships. The economy grew 1.7 percent in the first quarter alone. But growth is uneven — traditional industries like steel and petrochemicals have struggled with weak overseas demand.

The Bank of Korea, the country's central bank, has kept its key interest rate at 2.5 percent for eight meetings in a row. It faces a delicate balance: a weaker Korean won and rising home prices argue against cutting rates, while some businesses want cheaper borrowing. Economists expect any change to come later in the year.

For ordinary Koreans, the numbers translate into everyday questions — mortgage costs, the price of imports, and job security. A steady but unspectacular outlook suggests neither a boom nor a slump, but a careful path as the government and central bank try to keep growth and prices in balance.$a11$,
$a11$OECD가 2026년 6월에 내놓은 경제 전망에서 올해 한국 경제가 약 2.6% 성장할 것으로 예측했다. 수출 호조에 힘입은 완만하지만 꾸준한 속도다. 이 보고서는 정책 담당자들이 경기 회복이 실제로 얼마나 빠른지 가늠하던 시점에 나왔다.

수출은 2026년 초부터 크게 늘었고, 한국의 기술 제품과 선박에 대한 수요가 강했다. 1분기에만 경제가 1.7% 성장했다. 그러나 성장은 고르지 않다. 철강과 석유화학 같은 전통 산업은 해외 수요 부진으로 어려움을 겪고 있다.

한국의 중앙은행인 한국은행은 기준금리를 여덟 차례 회의 연속으로 2.5%에 묶어 두었다. 한국은행은 미묘한 균형에 놓여 있다. 약해진 원화와 오르는 집값은 금리 인하에 반대하는 근거가 되지만, 일부 기업은 더 싼 대출을 원한다. 경제학자들은 변화가 있다면 올해 하반기에 올 것으로 본다.

보통의 한국인에게 이 숫자들은 일상의 질문으로 바뀐다. 주택담보대출 비용, 수입 물가, 일자리 안정성 같은 것들이다. 꾸준하지만 화려하지 않은 전망은 호황도 불황도 아닌, 성장과 물가의 균형을 맞추려는 정부와 중앙은행의 조심스러운 행보를 시사한다.$a11$,
$a11$OECDが2026年6月に公表した経済見通しで、今年の韓国経済は約2.6%成長すると予測された。好調な輸出に支えられた、緩やかながら着実なペースだ。この報告書は、政策担当者が景気回復の実際の速さを見極めていた時期に出された。

輸出は2026年初めから大きく伸び、韓国の技術製品や船舶への需要が強かった。第1四半期だけで経済は1.7%成長した。しかし成長には偏りがある。鉄鋼や石油化学といった伝統産業は、海外需要の弱さで苦戦している。

韓国の中央銀行である韓国銀行は、政策金利を8会合連続で2.5%に据え置いた。同行は微妙なバランスに直面している。弱含みの韓国ウォンと上昇する住宅価格は利下げに反対する材料となる一方、一部の企業はより安い借り入れを望む。エコノミストは、変化があるとすれば年後半とみている。

普通の韓国人にとって、これらの数字は日常の問いに変わる。住宅ローンの負担、輸入品の価格、雇用の安定などだ。着実だが地味な見通しは、好況でも不況でもなく、成長と物価の均衡を保とうとする政府と中央銀行の慎重な歩みを示している。$a11$,
$a11$OECD在2026年6月發布的經濟展望中預測，韓國經濟今年將成長約2.6%。這是在出口暢旺帶動下，溫和但穩健的步調。這份報告出爐時，政策制定者正評估景氣復甦究竟有多快。

出口自2026年初大幅增加，市場對韓國科技產品與船舶的需求強勁，光是第一季經濟就成長1.7%。不過成長並不平均，鋼鐵與石化等傳統產業因海外需求疲弱而陷入困境。

韓國的中央銀行韓國銀行已連續八次會議把基準利率維持在2.5%。它面臨微妙的平衡：走弱的韓元與上漲的房價成為反對降息的理由，但部分企業希望借貸成本更低。經濟學家認為，若有變動，應會落在今年下半年。

對一般韓國人而言，這些數字化為日常的問題：房貸負擔、進口物價與工作是否穩定。穩健卻不亮眼的展望，意味著既非榮景也非衰退，而是政府與央行在成長與物價之間力求平衡的謹慎步伐。$a11$,
$a11$El panorama económico que la OCDE publicó en junio de 2026 pronostica que la economía de Corea del Sur crecerá en torno al 2,6 por ciento este año, un ritmo modesto pero constante gracias al auge de las exportaciones. El informe llegó justo cuando los responsables políticos evaluaban a qué velocidad avanza realmente la recuperación.

Las exportaciones se han disparado desde principios de 2026, con una fuerte demanda de tecnología y buques surcoreanos. Solo en el primer trimestre la economía creció un 1,7 por ciento. Pero el crecimiento es desigual: industrias tradicionales como el acero y la petroquímica han sufrido por la débil demanda exterior.

El Banco de Corea, el banco central del país, ha mantenido su tipo de interés de referencia en el 2,5 por ciento durante ocho reuniones seguidas. Se enfrenta a un equilibrio delicado: un won más débil y unos precios de la vivienda al alza desaconsejan bajar los tipos, mientras algunas empresas quieren créditos más baratos. Los economistas esperan que cualquier cambio llegue más avanzado el año.

Para los coreanos de a pie, las cifras se traducen en preguntas cotidianas: el coste de la hipoteca, el precio de las importaciones y la seguridad laboral. Un panorama estable pero poco espectacular sugiere ni auge ni recesión, sino un camino prudente mientras el gobierno y el banco central intentan mantener el equilibrio entre el crecimiento y los precios.$a11$,
$a11$Der Wirtschaftsausblick, den die OECD im Juni 2026 veröffentlichte, prognostiziert für Südkoreas Wirtschaft in diesem Jahr ein Wachstum von rund 2,6 Prozent – ein bescheidenes, aber stetiges Tempo, gestützt von boomenden Exporten. Der Bericht erschien, während die politisch Verantwortlichen abwogen, wie schnell sich die Erholung tatsächlich vollzieht.

Die Exporte sind seit Anfang 2026 stark gestiegen, mit kräftiger Nachfrage nach südkoreanischer Technik und Schiffen. Allein im ersten Quartal wuchs die Wirtschaft um 1,7 Prozent. Doch das Wachstum ist ungleich: Traditionelle Branchen wie Stahl und Petrochemie leiden unter schwacher Auslandsnachfrage.

Die Bank of Korea, die Zentralbank des Landes, hält ihren Leitzins seit acht Sitzungen in Folge bei 2,5 Prozent. Sie steht vor einer heiklen Abwägung: Ein schwächerer Won und steigende Immobilienpreise sprechen gegen Zinssenkungen, während manche Unternehmen billigere Kredite wünschen. Ökonomen erwarten eine mögliche Änderung erst später im Jahr.

Für normale Koreaner werden die Zahlen zu Alltagsfragen: Hypothekenkosten, Preise für Importe und Arbeitsplatzsicherheit. Ein stetiger, aber unspektakulärer Ausblick deutet weder auf einen Boom noch auf einen Absturz hin, sondern auf einen vorsichtigen Kurs, während Regierung und Zentralbank Wachstum und Preise im Gleichgewicht halten wollen.$a11$,
$a11$Les perspectives économiques publiées par l'OCDE en juin 2026 prévoient une croissance d'environ 2,6 % pour l'économie sud-coréenne cette année, un rythme modeste mais régulier, soutenu par des exportations en plein essor. Le rapport est paru alors que les responsables politiques évaluaient la vitesse réelle de la reprise.

Les exportations ont bondi depuis le début de 2026, portées par une forte demande de technologies et de navires sud-coréens. Rien qu'au premier trimestre, l'économie a progressé de 1,7 %. Mais la croissance est inégale : des industries traditionnelles comme l'acier et la pétrochimie souffrent d'une demande extérieure faible.

La Banque de Corée, la banque centrale du pays, maintient son taux directeur à 2,5 % depuis huit réunions consécutives. Elle doit trouver un équilibre délicat : un won plus faible et des prix de l'immobilier en hausse plaident contre une baisse des taux, tandis que certaines entreprises souhaitent des emprunts moins chers. Les économistes s'attendent à un éventuel changement plus tard dans l'année.

Pour les Coréens ordinaires, ces chiffres se traduisent par des questions quotidiennes : le coût du crédit immobilier, le prix des importations et la sécurité de l'emploi. Des perspectives stables mais sans éclat n'annoncent ni boom ni récession, mais une trajectoire prudente, tandis que le gouvernement et la banque centrale tentent de préserver l'équilibre entre croissance et prix.$a11$,
$a11$Báo cáo triển vọng kinh tế mà OECD công bố vào tháng 6 năm 2026 dự báo nền kinh tế Hàn Quốc tăng khoảng 2,6% trong năm nay, một nhịp độ khiêm tốn nhưng ổn định nhờ xuất khẩu bùng nổ. Báo cáo xuất hiện đúng lúc các nhà hoạch định chính sách đang cân nhắc tốc độ phục hồi thực sự.

Xuất khẩu đã tăng vọt từ đầu năm 2026, với nhu cầu mạnh đối với công nghệ và tàu biển Hàn Quốc. Chỉ riêng quý đầu, nền kinh tế đã tăng 1,7%. Nhưng tăng trưởng không đồng đều: các ngành truyền thống như thép và hóa dầu chật vật vì nhu cầu bên ngoài yếu.

Ngân hàng Trung ương Hàn Quốc, ngân hàng trung ương của nước này, đã giữ lãi suất chủ chốt ở mức 2,5% suốt tám cuộc họp liên tiếp. Họ đối mặt với thế cân bằng nhạy cảm: đồng won yếu hơn và giá nhà tăng là lý do phản đối việc hạ lãi suất, trong khi một số doanh nghiệp muốn vay rẻ hơn. Giới kinh tế cho rằng nếu có thay đổi thì sẽ đến vào cuối năm.

Với người Hàn bình thường, những con số này chuyển thành các câu hỏi hằng ngày: chi phí vay mua nhà, giá hàng nhập khẩu và sự ổn định việc làm. Một triển vọng ổn định nhưng không ngoạn mục cho thấy không bùng nổ cũng chẳng suy thoái, mà là một lộ trình thận trọng khi chính phủ và ngân hàng trung ương cố giữ cân bằng giữa tăng trưởng và giá cả.$a11$,
$a11$รายงานแนวโน้มเศรษฐกิจที่ OECD เผยแพร่ในเดือนมิถุนายน 2026 คาดว่าเศรษฐกิจเกาหลีใต้จะเติบโตราว 2.6% ในปีนี้ ซึ่งเป็นจังหวะที่พอประมาณแต่มั่นคง โดยได้แรงหนุนจากการส่งออกที่เฟื่องฟู รายงานนี้ออกมาในช่วงที่ผู้กำหนดนโยบายกำลังประเมินว่าการฟื้นตัวเดินหน้าเร็วเพียงใดจริง ๆ

การส่งออกพุ่งขึ้นตั้งแต่ต้นปี 2026 ด้วยความต้องการสินค้าเทคโนโลยีและเรือของเกาหลีที่แข็งแกร่ง เฉพาะไตรมาสแรกเศรษฐกิจโตถึง 1.7% แต่การเติบโตไม่สม่ำเสมอ อุตสาหกรรมดั้งเดิมอย่างเหล็กและปิโตรเคมีกลับซบเซาเพราะความต้องการจากต่างประเทศอ่อนแอ

ธนาคารกลางเกาหลี ซึ่งเป็นธนาคารกลางของประเทศ คงอัตราดอกเบี้ยนโยบายไว้ที่ 2.5% ติดต่อกันแปดครั้ง ธนาคารเผชิญสมดุลที่ละเอียดอ่อน เงินวอนที่อ่อนลงและราคาบ้านที่สูงขึ้นเป็นเหตุผลไม่ให้ลดดอกเบี้ย ขณะที่ธุรกิจบางส่วนอยากได้เงินกู้ที่ถูกลง นักเศรษฐศาสตร์คาดว่าหากจะมีการเปลี่ยนแปลง ก็น่าจะเป็นช่วงปลายปี

สำหรับคนเกาหลีทั่วไป ตัวเลขเหล่านี้กลายเป็นคำถามในชีวิตประจำวัน ทั้งค่างวดสินเชื่อบ้าน ราคาสินค้านำเข้า และความมั่นคงของงาน แนวโน้มที่มั่นคงแต่ไม่หวือหวาบ่งชี้ว่าไม่ใช่ทั้งภาวะรุ่งเรืองหรือถดถอย แต่เป็นเส้นทางที่ระมัดระวัง ขณะที่รัฐบาลและธนาคารกลางพยายามรักษาสมดุลระหว่างการเติบโตกับราคาสินค้า$a11$,
$a11$Prospek ekonomi yang dirilis OECD pada Juni 2026 memperkirakan ekonomi Korea Selatan tumbuh sekitar 2,6 persen tahun ini, laju yang moderat tetapi stabil berkat ekspor yang melonjak. Laporan itu muncul saat para pembuat kebijakan menimbang seberapa cepat pemulihan benar-benar berjalan.

Ekspor melonjak sejak awal 2026, dengan permintaan kuat atas teknologi dan kapal buatan Korea. Pada kuartal pertama saja ekonomi tumbuh 1,7 persen. Namun pertumbuhannya tidak merata: industri tradisional seperti baja dan petrokimia kesulitan akibat lemahnya permintaan luar negeri.

Bank of Korea, bank sentral negara itu, menahan suku bunga acuannya di 2,5 persen selama delapan pertemuan berturut-turut. Ia menghadapi keseimbangan yang sulit: won yang melemah dan harga rumah yang naik menjadi alasan untuk tidak memangkas bunga, sementara sebagian pelaku usaha menginginkan pinjaman lebih murah. Para ekonom memperkirakan perubahan, bila ada, baru terjadi pada paruh kedua tahun ini.

Bagi warga Korea biasa, angka-angka itu berubah menjadi pertanyaan sehari-hari: biaya cicilan rumah, harga barang impor, dan keamanan pekerjaan. Prospek yang stabil tetapi tidak spektakuler menandakan bukan ledakan maupun kemerosotan, melainkan jalan yang hati-hati saat pemerintah dan bank sentral berupaya menjaga keseimbangan antara pertumbuhan dan harga.$a11$,
$a11$The OECD's June 2026 outlook sees South Korea growing about 2.6% this year on strong exports, while the Bank of Korea holds its key rate at 2.5% amid a weak won.$a11$,
$a11$Korea economy 2026, OECD outlook, Bank of Korea interest rate, Korean won, GDP growth, exports$a11$,
'intermediate',
3, 4, 4,
$a11$[
{"word":"경제","reading":"gyeongje","reading_ja":"キョンジェ","part_of_speech":"noun","definition_en":"economy","definition_ja":"経済","definition_zh_tw":"經濟","definition_es":"economía","definition_de":"Wirtschaft","definition_fr":"économie","definition_vi":"kinh tế","definition_th":"เศรษฐกิจ","definition_id":"ekonomi","example_ko":"한국 경제가 조금씩 성장하고 있다.","example_en":"The Korean economy is growing little by little.","example_ja":"韓国経済は少しずつ成長している。","example_zh_tw":"韓國經濟正逐步成長。","example_es":"La economía coreana crece poco a poco.","example_de":"Die koreanische Wirtschaft wächst allmählich.","example_fr":"L'économie coréenne croît peu à peu.","example_vi":"Kinh tế Hàn Quốc đang tăng trưởng từ từ.","example_th":"เศรษฐกิจเกาหลีกำลังเติบโตทีละน้อย","example_id":"Ekonomi Korea tumbuh sedikit demi sedikit."},
{"word":"금리","reading":"geumni","reading_ja":"クムリ","part_of_speech":"noun","definition_en":"interest rate","definition_ja":"金利","definition_zh_tw":"利率","definition_es":"tipo de interés","definition_de":"Zinssatz","definition_fr":"taux d'intérêt","definition_vi":"lãi suất","definition_th":"อัตราดอกเบี้ย","definition_id":"suku bunga","example_ko":"중앙은행이 금리를 그대로 유지했다.","example_en":"The central bank kept interest rates unchanged.","example_ja":"中央銀行は金利を据え置いた。","example_zh_tw":"央行維持利率不變。","example_es":"El banco central mantuvo los tipos de interés.","example_de":"Die Zentralbank ließ den Zinssatz unverändert.","example_fr":"La banque centrale a maintenu les taux d'intérêt.","example_vi":"Ngân hàng trung ương giữ nguyên lãi suất.","example_th":"ธนาคารกลางคงอัตราดอกเบี้ยไว้","example_id":"Bank sentral menahan suku bunga."},
{"word":"성장률","reading":"seongjangnyul","reading_ja":"ソンジャンニュル","part_of_speech":"noun","definition_en":"growth rate","definition_ja":"成長率","definition_zh_tw":"成長率","definition_es":"tasa de crecimiento","definition_de":"Wachstumsrate","definition_fr":"taux de croissance","definition_vi":"tỷ lệ tăng trưởng","definition_th":"อัตราการเติบโต","definition_id":"tingkat pertumbuhan","example_ko":"올해 성장률 전망이 발표됐다.","example_en":"This year's growth-rate forecast was announced.","example_ja":"今年の成長率の見通しが発表された。","example_zh_tw":"今年的成長率預測公布了。","example_es":"Se anunció la previsión de la tasa de crecimiento de este año.","example_de":"Die Wachstumsprognose für dieses Jahr wurde bekannt gegeben.","example_fr":"La prévision du taux de croissance de cette année a été annoncée.","example_vi":"Dự báo tỷ lệ tăng trưởng năm nay đã được công bố.","example_th":"มีการประกาศคาดการณ์อัตราการเติบโตของปีนี้","example_id":"Perkiraan tingkat pertumbuhan tahun ini diumumkan."},
{"word":"물가","reading":"mulga","reading_ja":"ムルガ","part_of_speech":"noun","definition_en":"prices; cost of living","definition_ja":"物価","definition_zh_tw":"物價","definition_es":"los precios; coste de vida","definition_de":"Preise; Lebenshaltungskosten","definition_fr":"les prix; coût de la vie","definition_vi":"giá cả; mức sống","definition_th":"ราคาสินค้า; ค่าครองชีพ","definition_id":"harga barang; biaya hidup","example_ko":"요즘 물가가 많이 올랐다.","example_en":"Prices have risen a lot lately.","example_ja":"最近、物価がかなり上がった。","example_zh_tw":"最近物價漲了不少。","example_es":"Los precios han subido mucho últimamente.","example_de":"Die Preise sind zuletzt stark gestiegen.","example_fr":"Les prix ont beaucoup augmenté récemment.","example_vi":"Giá cả dạo này đã tăng nhiều.","example_th":"ช่วงนี้ราคาสินค้าขึ้นมาก","example_id":"Harga barang naik banyak belakangan ini."},
{"word":"전망","reading":"jeonmang","reading_ja":"チョンマン","part_of_speech":"noun","definition_en":"outlook; forecast; prospects","definition_ja":"見通し；展望","definition_zh_tw":"展望；預測","definition_es":"perspectiva; previsión","definition_de":"Ausblick; Prognose","definition_fr":"perspective; prévision","definition_vi":"triển vọng; dự báo","definition_th":"แนวโน้ม; การคาดการณ์","definition_id":"prospek; proyeksi","example_ko":"경제 전망이 밝지 않다.","example_en":"The economic outlook is not bright.","example_ja":"経済の見通しは明るくない。","example_zh_tw":"經濟展望並不樂觀。","example_es":"La perspectiva económica no es alentadora.","example_de":"Der Wirtschaftsausblick ist nicht rosig.","example_fr":"Les perspectives économiques ne sont pas brillantes.","example_vi":"Triển vọng kinh tế không mấy sáng sủa.","example_th":"แนวโน้มเศรษฐกิจไม่สดใสนัก","example_id":"Prospek ekonomi tidak cerah."}
]$a11$::jsonb,
'published', true, 0,
'2026-06-19T23:00:00Z', '2026-06-19T23:00:00Z', '2026-06-19T23:00:00Z'
);

-- Article 12 — 2026-06-21 society advanced — birthrate rebound, fastest rise since 1981
INSERT INTO articles (topic_id, slug, title_en, title_ko, title_ja, title_zh_tw, title_es, title_de, title_fr, title_vi, title_th, title_id, summary_en, summary_ko, summary_ja, summary_zh_tw, summary_es, summary_de, summary_fr, summary_vi, summary_th, summary_id, content_en, content_ko, content_ja, content_zh_tw, content_es, content_de, content_fr, content_vi, content_th, content_id, seo_description, seo_keywords, level, reading_time_en, reading_time_ko, reading_time_ja, vocabulary, status, ai_generated, view_count, published_at, created_at, updated_at) VALUES (
(SELECT id FROM topics WHERE slug = 'society'),
'society-2026-06-21',
$a12$South Korea's Births Jump at Record Pace as Birthrate Ticks Up$a12$,
$a12$한국 출생아 역대 최고 증가…출산율 반등$a12$,
$a12$韓国の出生数、過去最大の伸び　出生率が反転$a12$,
$a12$韓國新生兒創最大增幅 生育率回升$a12$,
$a12$Los nacimientos en Corea del Sur suben a ritmo récord$a12$,
$a12$Südkoreas Geburten steigen so schnell wie nie – Rate erholt sich$a12$,
$a12$Les naissances en Corée du Sud bondissent à un rythme record$a12$,
$a12$Số ca sinh ở Hàn Quốc tăng kỷ lục, tỷ suất sinh nhích lên$a12$,
$a12$ยอดเกิดเกาหลีพุ่งสถิติ อัตราการเกิดกระเตื้อง$a12$,
$a12$Kelahiran Korea Melonjak Rekor, Angka Kelahiran Naik$a12$,
$a12$South Korea's births rose nearly 15 percent in early 2026, the fastest quarterly jump since 1981, with about 75,013 babies born from January to March. The fertility rate, long the world's lowest, edged back toward 1.0 after decades of decline.$a12$,
$a12$2026년 초 한국의 출생아가 약 15% 늘어 1981년 이후 분기 기준 최대폭 증가를 기록했다. 1~3월에 약 7만5013명이 태어났다. 오랫동안 세계 최저였던 출산율은 수십 년의 하락 끝에 1.0 근처로 반등했다.$a12$,
$a12$2026年初め、韓国の出生数が約15%増え、1981年以降で四半期として最大の伸びを記録した。1〜3月に約7万5013人が生まれた。長年世界最低だった出生率は、数十年の低下を経て1.0付近まで戻した。$a12$,
$a12$2026年初，韓國新生兒增加近15%，創下1981年以來單季最大增幅，1至3月約有7萬5013名嬰兒出生。長期居全球最低的生育率，在數十年下滑後回升至接近1.0。$a12$,
$a12$Los nacimientos en Corea del Sur subieron casi un 15 por ciento a principios de 2026, el mayor salto trimestral desde 1981, con unos 75.013 bebés nacidos de enero a marzo. La tasa de fecundidad, la más baja del mundo, se acercó de nuevo al 1,0 tras décadas de caída.$a12$,
$a12$Südkoreas Geburten stiegen Anfang 2026 um fast 15 Prozent – der stärkste Quartalssprung seit 1981; von Januar bis März kamen rund 75.013 Babys zur Welt. Die lange weltweit niedrigste Geburtenrate näherte sich nach Jahrzehnten des Rückgangs wieder der Marke von 1,0.$a12$,
$a12$Les naissances en Corée du Sud ont augmenté de près de 15 % début 2026, le plus fort bond trimestriel depuis 1981, avec environ 75 013 bébés nés de janvier à mars. Le taux de fécondité, longtemps le plus bas du monde, s'est rapproché de 1,0 après des décennies de baisse.$a12$,
$a12$Số ca sinh ở Hàn Quốc tăng gần 15% vào đầu năm 2026, mức tăng theo quý mạnh nhất kể từ 1981, với khoảng 75.013 em bé chào đời từ tháng 1 đến tháng 3. Tỷ suất sinh, vốn thấp nhất thế giới, đã nhích lại gần 1,0 sau nhiều thập kỷ giảm.$a12$,
$a12$ยอดการเกิดในเกาหลีใต้เพิ่มขึ้นเกือบ 15% เมื่อต้นปี 2026 ซึ่งเป็นการเพิ่มรายไตรมาสสูงสุดนับตั้งแต่ปี 1981 โดยมีทารกเกิดราว 75,013 คนช่วงเดือนมกราคมถึงมีนาคม อัตราการเกิดที่ต่ำที่สุดในโลกมานานได้ขยับกลับเข้าใกล้ 1.0 หลังลดลงมาหลายทศวรรษ$a12$,
$a12$Kelahiran di Korea Selatan naik hampir 15 persen pada awal 2026, lonjakan kuartalan tercepat sejak 1981, dengan sekitar 75.013 bayi lahir dari Januari hingga Maret. Angka kelahiran yang lama menjadi terendah di dunia kembali mendekati 1,0 setelah puluhan tahun menurun.$a12$,
$a12$South Korea recorded its fastest-ever rise in births in early 2026. About 75,013 babies were born between January and March, nearly 15 percent more than a year earlier — the largest quarterly increase since records began in 1981. The country's fertility rate, long the world's lowest, edged back toward 1.0.

The rebound is striking for a nation that has spent more than two decades and over 360 trillion won trying to reverse a demographic decline. The fertility rate — the average number of children a woman is expected to have — had fallen below 0.8, far under the 2.1 needed to keep a population stable. A figure near 0.99 is still very low, but the direction has changed.

Demographers point to several factors: a bump in marriages after pandemic-era delays, cash payments and housing support for new parents, and companies expanding parental leave. In some rural areas, local governments have even acted as matchmakers. Whether these gains reflect a lasting shift or a temporary catch-up is the central question.

The stakes are enormous. With a median age of 46 and a population of about 51.6 million now slowly shrinking, South Korea faces strains on its workforce, pensions, and military. A sustained recovery in births would ease those pressures over time; a one-off blip would not. For now, officials are cautiously optimistic but wary of declaring victory.$a12$,
$a12$2026년 초, 한국의 출생아 수가 역대 가장 빠른 속도로 늘었다. 1월부터 3월 사이 약 7만5013명이 태어나 1년 전보다 거의 15% 많았다. 1981년 통계 작성 이후 분기 기준으로 가장 큰 증가폭이다. 오랫동안 세계 최저였던 이 나라의 출산율도 다시 1.0에 가까워졌다.

이 반등은 20년 넘게, 그리고 360조 원이 넘는 돈을 들여 인구 감소를 되돌리려 애써 온 나라로서는 놀라운 일이다. 한 여성이 평생 낳을 것으로 예상되는 아이 수인 출산율은 한때 0.8 아래로 떨어졌다. 인구를 유지하는 데 필요한 2.1에 크게 못 미치는 수치다. 0.99에 가까운 수준도 여전히 매우 낮지만, 방향이 바뀌었다.

인구학자들은 몇 가지 요인을 든다. 팬데믹 시기에 미뤄졌던 결혼이 늘어난 점, 신혼·출산 가정에 대한 현금 지원과 주거 지원, 그리고 기업의 육아휴직 확대다. 일부 농촌 지역에서는 지방 정부가 직접 중매에 나서기도 했다. 다만 이런 성과가 지속적인 변화인지, 잠시 밀렸던 수요가 몰린 일시적 현상인지가 핵심 질문이다.

걸린 것이 크다. 중위 연령이 46세이고 인구 약 5160만 명이 서서히 줄어드는 가운데, 한국은 노동력과 연금, 국방에서 부담을 마주하고 있다. 출생아의 회복이 이어진다면 이런 압박이 시간이 지나며 완화되겠지만, 일회성에 그친다면 그렇지 않을 것이다. 지금으로서는 당국도 조심스레 낙관하되, 승리를 선언하기에는 신중하다.$a12$,
$a12$2026年初め、韓国の出生数が過去最速のペースで増えた。1月から3月にかけて約7万5013人が生まれ、前年より約15%多かった。1981年の統計開始以降、四半期として最大の増加幅だ。長年世界最低だったこの国の出生率も、再び1.0に近づいた。

この反転は、20年以上、そして360兆ウォンを超える資金を投じて人口減少を食い止めようとしてきた国にとって驚くべきことだ。女性が生涯に産むと見込まれる子どもの数である出生率は、一時0.8を下回った。人口を維持するのに必要な2.1を大きく下回る水準だ。0.99に近い値もなお非常に低いが、方向は変わった。

人口学者はいくつかの要因を挙げる。パンデミック期に先送りされた結婚が増えたこと、新婚・出産世帯への現金給付や住宅支援、そして企業による育児休業の拡大だ。一部の農村部では、地方自治体が自ら仲人役を務めることもあった。ただし、こうした成果が持続的な変化なのか、先送りされた需要が一時的に集中しただけなのかが核心的な問いだ。

かかっているものは大きい。中位年齢が46歳、人口約5160万人が緩やかに減る中、韓国は労働力や年金、国防で負担に直面している。出生数の回復が続けば、こうした圧力は時間とともに和らぐが、一度きりで終われば和らがない。今のところ当局は慎重ながら楽観しつつ、勝利宣言には慎重だ。$a12$,
$a12$2026年初，韓國的新生兒數量以史上最快的速度增加。1至3月約有7萬5013名嬰兒出生，比一年前多了近15%，是1981年開始統計以來單季最大增幅。這個長期居全球最低的國家，其生育率也再度接近1.0。

對一個花了20多年、投入超過360兆韓元試圖扭轉人口下滑的國家來說，這樣的回升令人驚訝。生育率——即一名女性一生預計生育的子女數——曾一度跌破0.8，遠低於維持人口所需的2.1。接近0.99的水準仍然很低，但方向已經改變。

人口學家指出幾項因素：疫情期間延後的婚姻增加、對新婚與生育家庭的現金補助與住房支援，以及企業擴大育嬰假。在部分農村地區，地方政府甚至親自當起媒人。然而，這些成果究竟是持久的轉變，還是被延後需求的一時集中，才是核心問題。

此事關係重大。在中位數年齡46歲、約5160萬人口正緩慢減少之際，韓國在勞動力、年金與國防上都面臨壓力。若新生兒回升能持續，這些壓力將隨時間緩解；若只是曇花一現，則不然。目前當局謹慎樂觀，但仍不願宣布勝利。$a12$,
$a12$Corea del Sur registró a comienzos de 2026 el aumento de nacimientos más rápido de su historia. Entre enero y marzo nacieron unos 75.013 bebés, casi un 15 por ciento más que un año antes, el mayor incremento trimestral desde que empezaron los registros en 1981. La tasa de fecundidad del país, durante mucho tiempo la más baja del mundo, volvió a acercarse al 1,0.

El repunte resulta llamativo para una nación que ha dedicado más de dos décadas y más de 360 billones de wones a intentar frenar su declive demográfico. La tasa de fecundidad —el número medio de hijos que se espera que tenga una mujer— había caído por debajo de 0,8, muy lejos del 2,1 necesario para mantener estable la población. Una cifra cercana a 0,99 sigue siendo muy baja, pero la tendencia ha cambiado.

Los demógrafos señalan varios factores: un repunte de los matrimonios tras los retrasos de la pandemia, las ayudas en efectivo y para vivienda a los nuevos padres, y la ampliación de los permisos parentales por parte de las empresas. En algunas zonas rurales, los gobiernos locales han ejercido incluso de casamenteros. La pregunta clave es si estas mejoras reflejan un cambio duradero o una recuperación pasajera.

Lo que está en juego es enorme. Con una edad media de 46 años y una población de unos 51,6 millones que ya se reduce lentamente, Corea del Sur afronta tensiones en su fuerza laboral, sus pensiones y su ejército. Una recuperación sostenida de los nacimientos aliviaría esas presiones con el tiempo; un repunte puntual, no. Por ahora, las autoridades se muestran cautelosamente optimistas, pero reacias a cantar victoria.$a12$,
$a12$Südkorea verzeichnete Anfang 2026 den schnellsten Geburtenanstieg seiner Geschichte. Zwischen Januar und März kamen rund 75.013 Babys zur Welt, fast 15 Prozent mehr als ein Jahr zuvor – der größte Quartalszuwachs seit Beginn der Aufzeichnungen 1981. Die lange weltweit niedrigste Geburtenrate des Landes näherte sich wieder der Marke von 1,0.

Der Aufschwung ist bemerkenswert für ein Land, das über zwei Jahrzehnte und mehr als 360 Billionen Won aufgewendet hat, um seinen demografischen Niedergang umzukehren. Die Geburtenrate – die durchschnittliche Kinderzahl, die eine Frau voraussichtlich bekommt – war unter 0,8 gefallen, weit unter den 2,1, die zur Stabilisierung der Bevölkerung nötig sind. Ein Wert nahe 0,99 ist noch immer sehr niedrig, doch die Richtung hat sich geändert.

Demografen nennen mehrere Faktoren: mehr Eheschließungen nach pandemiebedingten Verzögerungen, Geldzahlungen und Wohnhilfen für junge Eltern sowie ausgeweitete Elternzeit in Unternehmen. In manchen ländlichen Gebieten traten Kommunen sogar als Heiratsvermittler auf. Die zentrale Frage ist, ob diese Zugewinne einen dauerhaften Wandel oder nur einen vorübergehenden Nachholeffekt widerspiegeln.

Es steht viel auf dem Spiel. Mit einem Medianalter von 46 Jahren und einer bereits langsam schrumpfenden Bevölkerung von rund 51,6 Millionen steht Südkorea vor Belastungen bei Arbeitskräften, Renten und Militär. Eine anhaltende Erholung der Geburten würde diesen Druck mit der Zeit mildern, ein einmaliger Ausschlag nicht. Vorerst geben sich die Behörden vorsichtig optimistisch, scheuen aber davor zurück, den Sieg zu verkünden.$a12$,
$a12$La Corée du Sud a enregistré début 2026 la plus forte hausse de naissances de son histoire. Entre janvier et mars, environ 75 013 bébés sont nés, soit près de 15 % de plus qu'un an auparavant — la plus forte progression trimestrielle depuis le début des relevés en 1981. Le taux de fécondité du pays, longtemps le plus bas du monde, s'est de nouveau rapproché de 1,0.

Ce rebond est frappant pour une nation qui a consacré plus de deux décennies et plus de 360 000 milliards de wons à tenter d'inverser son déclin démographique. Le taux de fécondité — le nombre moyen d'enfants qu'une femme est censée avoir — était tombé sous 0,8, bien en deçà des 2,1 nécessaires pour stabiliser la population. Un chiffre proche de 0,99 reste très faible, mais la tendance a changé.

Les démographes citent plusieurs facteurs : une hausse des mariages après les reports liés à la pandémie, des aides financières et au logement pour les nouveaux parents, et l'extension des congés parentaux par les entreprises. Dans certaines zones rurales, des collectivités locales ont même joué les entremetteuses. La question centrale est de savoir si ces gains traduisent un changement durable ou un simple rattrapage passager.

Les enjeux sont énormes. Avec un âge médian de 46 ans et une population d'environ 51,6 millions déjà en lent recul, la Corée du Sud fait face à des tensions sur sa main-d'œuvre, ses retraites et son armée. Un redressement durable des naissances allégerait ces pressions avec le temps ; un sursaut isolé, non. Pour l'instant, les autorités affichent un optimisme prudent, tout en évitant de crier victoire.$a12$,
$a12$Hàn Quốc ghi nhận mức tăng số ca sinh nhanh nhất trong lịch sử vào đầu năm 2026. Từ tháng 1 đến tháng 3, khoảng 75.013 em bé chào đời, tăng gần 15% so với một năm trước — mức tăng theo quý lớn nhất kể từ khi bắt đầu thống kê năm 1981. Tỷ suất sinh của nước này, vốn lâu nay thấp nhất thế giới, lại tiến gần mốc 1,0.

Sự phục hồi này gây chú ý đối với một quốc gia đã bỏ ra hơn hai thập kỷ và hơn 360 nghìn tỷ won để cố đảo ngược đà suy giảm dân số. Tỷ suất sinh — số con trung bình mà một phụ nữ được kỳ vọng sinh ra — từng rơi xuống dưới 0,8, thấp hơn nhiều so với mức 2,1 cần thiết để giữ dân số ổn định. Con số gần 0,99 vẫn rất thấp, nhưng chiều hướng đã thay đổi.

Các nhà nhân khẩu học chỉ ra vài yếu tố: số cuộc kết hôn tăng sau khi bị hoãn thời đại dịch, các khoản hỗ trợ tiền mặt và nhà ở cho cha mẹ mới sinh, cùng việc doanh nghiệp mở rộng chế độ nghỉ phép nuôi con. Ở một số vùng nông thôn, chính quyền địa phương thậm chí đứng ra làm mai mối. Câu hỏi cốt lõi là những kết quả này phản ánh một sự thay đổi bền vững hay chỉ là hiện tượng bù đắp tạm thời.

Những gì đặt ra là rất lớn. Với độ tuổi trung vị 46 và dân số khoảng 51,6 triệu đang giảm dần, Hàn Quốc đối mặt với áp lực lên lực lượng lao động, hệ thống hưu trí và quân đội. Nếu số ca sinh phục hồi bền vững, những áp lực đó sẽ dịu đi theo thời gian; nếu chỉ là nhất thời thì không. Hiện tại, giới chức tỏ ra lạc quan thận trọng nhưng dè dặt trước việc tuyên bố thắng lợi.$a12$,
$a12$เกาหลีใต้บันทึกการเพิ่มขึ้นของยอดการเกิดที่รวดเร็วที่สุดในประวัติศาสตร์เมื่อต้นปี 2026 ระหว่างเดือนมกราคมถึงมีนาคมมีทารกเกิดราว 75,013 คน เพิ่มขึ้นเกือบ 15% จากปีก่อน ซึ่งเป็นการเพิ่มรายไตรมาสสูงสุดนับตั้งแต่เริ่มเก็บสถิติในปี 1981 อัตราการเกิดของประเทศที่ต่ำที่สุดในโลกมานาน ก็ขยับกลับเข้าใกล้ 1.0 อีกครั้ง

การฟื้นตัวนี้น่าทึ่งสำหรับประเทศที่ทุ่มเทมากว่าสองทศวรรษและเงินกว่า 360 ล้านล้านวอนเพื่อพยายามพลิกภาวะประชากรลดลง อัตราการเจริญพันธุ์ ซึ่งคือจำนวนบุตรโดยเฉลี่ยที่ผู้หญิงคนหนึ่งคาดว่าจะมี เคยตกลงต่ำกว่า 0.8 ซึ่งต่ำกว่าระดับ 2.1 ที่จำเป็นต่อการรักษาจำนวนประชากรอย่างมาก ตัวเลขใกล้ 0.99 ยังถือว่าต่ำมาก แต่ทิศทางได้เปลี่ยนไปแล้ว

นักประชากรศาสตร์ชี้ถึงหลายปัจจัย ทั้งการแต่งงานที่เพิ่มขึ้นหลังถูกเลื่อนในช่วงโรคระบาด เงินช่วยเหลือและการสนับสนุนที่อยู่อาศัยแก่พ่อแม่มือใหม่ และการที่บริษัทขยายวันลาเลี้ยงดูบุตร ในบางพื้นที่ชนบท รัฐบาลท้องถิ่นถึงกับทำหน้าที่แม่สื่อเอง อย่างไรก็ตาม คำถามสำคัญคือผลเหล่านี้สะท้อนการเปลี่ยนแปลงที่ยั่งยืน หรือเป็นเพียงการชดเชยชั่วคราว

เดิมพันครั้งนี้สูงมาก ด้วยอายุมัธยฐาน 46 ปี และประชากรราว 51.6 ล้านคนที่กำลังค่อย ๆ ลดลง เกาหลีใต้กำลังเผชิญแรงกดดันต่อกำลังแรงงาน เงินบำนาญ และกองทัพ หากยอดการเกิดฟื้นตัวอย่างต่อเนื่องก็จะช่วยบรรเทาแรงกดดันเหล่านั้นเมื่อเวลาผ่านไป แต่หากเป็นเพียงครั้งเดียวก็จะไม่ช่วย ในตอนนี้ทางการมองในแง่ดีอย่างระมัดระวัง แต่ยังไม่กล้าประกาศชัยชนะ$a12$,
$a12$Korea Selatan mencatat kenaikan kelahiran tercepat dalam sejarahnya pada awal 2026. Antara Januari dan Maret, sekitar 75.013 bayi lahir, hampir 15 persen lebih banyak dari tahun sebelumnya — lonjakan kuartalan terbesar sejak pencatatan dimulai pada 1981. Angka kelahiran negara itu, yang lama menjadi terendah di dunia, kembali mendekati 1,0.

Pemulihan itu mencolok bagi bangsa yang telah menghabiskan lebih dari dua dekade dan lebih dari 360 triliun won untuk mencoba membalikkan penurunan demografi. Angka kelahiran — jumlah rata-rata anak yang diperkirakan dimiliki seorang perempuan — sempat jatuh di bawah 0,8, jauh di bawah 2,1 yang diperlukan untuk menjaga populasi tetap stabil. Angka mendekati 0,99 masih sangat rendah, tetapi arahnya telah berubah.

Para pakar demografi menyebut beberapa faktor: lonjakan pernikahan setelah penundaan akibat pandemi, bantuan tunai dan perumahan untuk orang tua baru, serta perusahaan yang memperluas cuti orang tua. Di sejumlah daerah pedesaan, pemerintah lokal bahkan bertindak sebagai mak comblang. Pertanyaan utamanya adalah apakah peningkatan ini mencerminkan perubahan yang langgeng atau sekadar pemulihan sementara.

Taruhannya sangat besar. Dengan usia median 46 tahun dan populasi sekitar 51,6 juta yang kini menyusut perlahan, Korea Selatan menghadapi tekanan pada tenaga kerja, dana pensiun, dan militernya. Pemulihan kelahiran yang berkelanjutan akan meringankan tekanan itu seiring waktu; lonjakan sesaat tidak. Untuk saat ini, pihak berwenang optimistis dengan hati-hati tetapi enggan mengklaim kemenangan.$a12$,
$a12$South Korea's births jumped nearly 15% in Q1 2026 — the fastest quarterly rise since 1981 — as its long world-lowest fertility rate edged back toward 1.0.$a12$,
$a12$Korea birth rate, fertility rate rebound, Korea demographics, population decline, low birth rate, Korea 2026$a12$,
'advanced',
3, 4, 4,
$a12$[
{"word":"출산율","reading":"chulsanyul","reading_ja":"チュルサンニュル","part_of_speech":"noun","definition_en":"birth rate; fertility rate","definition_ja":"出生率；出産率","definition_zh_tw":"生育率；出生率","definition_es":"tasa de natalidad; fecundidad","definition_de":"Geburtenrate; Fruchtbarkeitsrate","definition_fr":"taux de natalité; fécondité","definition_vi":"tỷ suất sinh; tỷ lệ sinh","definition_th":"อัตราการเกิด; อัตราการเจริญพันธุ์","definition_id":"angka kelahiran; tingkat kesuburan","example_ko":"한국의 출산율이 조금 올랐다.","example_en":"South Korea's birth rate rose slightly.","example_ja":"韓国の出生率が少し上がった。","example_zh_tw":"韓國的生育率略微上升。","example_es":"La tasa de natalidad de Corea subió un poco.","example_de":"Südkoreas Geburtenrate stieg leicht.","example_fr":"Le taux de natalité de la Corée a légèrement augmenté.","example_vi":"Tỷ suất sinh của Hàn Quốc tăng nhẹ.","example_th":"อัตราการเกิดของเกาหลีเพิ่มขึ้นเล็กน้อย","example_id":"Angka kelahiran Korea naik sedikit."},
{"word":"인구","reading":"in-gu","reading_ja":"イング","part_of_speech":"noun","definition_en":"population","definition_ja":"人口","definition_zh_tw":"人口","definition_es":"población","definition_de":"Bevölkerung","definition_fr":"population","definition_vi":"dân số","definition_th":"ประชากร","definition_id":"populasi; penduduk","example_ko":"그 나라의 인구가 줄고 있다.","example_en":"That country's population is shrinking.","example_ja":"その国の人口は減っている。","example_zh_tw":"那個國家的人口正在減少。","example_es":"La población de ese país está disminuyendo.","example_de":"Die Bevölkerung dieses Landes schrumpft.","example_fr":"La population de ce pays diminue.","example_vi":"Dân số của nước đó đang giảm.","example_th":"ประชากรของประเทศนั้นกำลังลดลง","example_id":"Populasi negara itu menyusut."},
{"word":"저출산","reading":"jeochulsan","reading_ja":"チョチュルサン","part_of_speech":"noun","definition_en":"low birth rate","definition_ja":"少子化（低出生率）","definition_zh_tw":"少子化；低生育率","definition_es":"baja natalidad","definition_de":"niedrige Geburtenrate","definition_fr":"faible natalité","definition_vi":"tỷ lệ sinh thấp","definition_th":"อัตราการเกิดต่ำ","definition_id":"angka kelahiran rendah","example_ko":"저출산 문제는 오래된 고민이다.","example_en":"The low birth rate is a long-standing concern.","example_ja":"少子化問題は長年の悩みだ。","example_zh_tw":"少子化問題是長久的煩惱。","example_es":"La baja natalidad es una preocupación antigua.","example_de":"Die niedrige Geburtenrate ist ein altes Problem.","example_fr":"La faible natalité est un souci ancien.","example_vi":"Tỷ lệ sinh thấp là mối lo từ lâu.","example_th":"ปัญหาอัตราการเกิดต่ำเป็นความกังวลมานาน","example_id":"Angka kelahiran rendah adalah masalah lama."},
{"word":"고령화","reading":"goryeonghwa","reading_ja":"コリョンファ","part_of_speech":"noun","definition_en":"population aging","definition_ja":"高齢化","definition_zh_tw":"高齡化；人口老化","definition_es":"envejecimiento de la población","definition_de":"Überalterung; Alterung der Bevölkerung","definition_fr":"vieillissement de la population","definition_vi":"già hóa dân số","definition_th":"การเข้าสู่สังคมสูงวัย","definition_id":"penuaan populasi","example_ko":"고령화가 빠르게 진행되고 있다.","example_en":"Population aging is progressing rapidly.","example_ja":"高齢化が急速に進んでいる。","example_zh_tw":"高齡化正快速發展。","example_es":"El envejecimiento de la población avanza rápidamente.","example_de":"Die Alterung der Bevölkerung schreitet schnell voran.","example_fr":"Le vieillissement de la population progresse rapidement.","example_vi":"Tình trạng già hóa dân số đang diễn ra nhanh chóng.","example_th":"การเข้าสู่สังคมสูงวัยกำลังดำเนินไปอย่างรวดเร็ว","example_id":"Penuaan populasi berlangsung dengan cepat."},
{"word":"늘어나다","reading":"neureonada","reading_ja":"ヌロナダ","part_of_speech":"verb","definition_en":"to increase; to grow in number","definition_ja":"増える","definition_zh_tw":"增加；變多","definition_es":"aumentar; incrementarse","definition_de":"zunehmen; sich erhöhen","definition_fr":"augmenter; s'accroître","definition_vi":"tăng lên; nhiều lên","definition_th":"เพิ่มขึ้น; มากขึ้น","definition_id":"bertambah; meningkat","example_ko":"올해 신생아 수가 늘어났다.","example_en":"The number of newborns increased this year.","example_ja":"今年、新生児の数が増えた。","example_zh_tw":"今年新生兒的數量增加了。","example_es":"El número de recién nacidos aumentó este año.","example_de":"Die Zahl der Neugeborenen stieg dieses Jahr.","example_fr":"Le nombre de nouveau-nés a augmenté cette année.","example_vi":"Số trẻ sơ sinh năm nay đã tăng lên.","example_th":"จำนวนทารกแรกเกิดปีนี้เพิ่มขึ้น","example_id":"Jumlah bayi baru lahir meningkat tahun ini."}
]$a12$::jsonb,
'published', true, 0,
'2026-06-20T23:00:00Z', '2026-06-20T23:00:00Z', '2026-06-20T23:00:00Z'
);

-- Article 13 — 2026-06-22 kpop beginner — BTS reunites after military service
INSERT INTO articles (topic_id, slug, title_en, title_ko, title_ja, title_zh_tw, title_es, title_de, title_fr, title_vi, title_th, title_id, summary_en, summary_ko, summary_ja, summary_zh_tw, summary_es, summary_de, summary_fr, summary_vi, summary_th, summary_id, content_en, content_ko, content_ja, content_zh_tw, content_es, content_de, content_fr, content_vi, content_th, content_id, seo_description, seo_keywords, level, reading_time_en, reading_time_ko, reading_time_ja, vocabulary, status, ai_generated, view_count, published_at, created_at, updated_at) VALUES (
(SELECT id FROM topics WHERE slug = 'kpop'),
'kpop-2026-06-22',
$a13$BTS Reunites in 2026 After Members Finish Military Service$a13$,
$a13$BTS, 병역 마치고 2026년 완전체로 복귀$a13$,
$a13$BTS、兵役を終え2026年に完全体で再始動$a13$,
$a13$成員退伍後 BTS 2026年完全體回歸$a13$,
$a13$BTS se reúne en 2026 tras cumplir el servicio militar$a13$,
$a13$BTS kommt 2026 nach dem Wehrdienst wieder zusammen$a13$,
$a13$BTS se reforme en 2026 après le service militaire$a13$,
$a13$BTS tái hợp năm 2026 sau khi hoàn thành nghĩa vụ quân sự$a13$,
$a13$BTS รวมตัวปี 2026 หลังสมาชิกปลดประจำการ$a13$,
$a13$BTS Bersatu Lagi 2026 Usai Anggota Rampung Wajib Militer$a13$,
$a13$BTS, the world-famous K-pop band, is reuniting as a full group in 2026 after all seven members finished South Korea's mandatory military service. Fans called ARMY have waited years for the seven to make music together again.$a13$,
$a13$세계적으로 유명한 K-팝 그룹 BTS가 일곱 멤버 모두 한국의 의무 병역을 마치고 2026년 완전체로 다시 뭉친다. 아미(ARMY)라 불리는 팬들은 일곱 명이 다시 함께 음악을 하기를 몇 년간 기다려 왔다.$a13$,
$a13$世界的に有名なK-POPグループBTSが、7人全員が韓国の兵役を終え、2026年に完全体で再び集まる。ARMY（アーミー）と呼ばれるファンは、7人が再び一緒に音楽をする日を何年も待ってきた。$a13$,
$a13$舉世聞名的K-pop團體BTS，在七名成員全部完成韓國義務兵役後，將於2026年以完全體重新合體。名為ARMY的粉絲已等待多年，盼七人再度一起做音樂。$a13$,
$a13$BTS, la mundialmente famosa banda de K-pop, se reúne como grupo completo en 2026 tras cumplir sus siete miembros el servicio militar obligatorio de Corea del Sur. Los fans, llamados ARMY, llevan años esperando que los siete vuelvan a hacer música juntos.$a13$,
$a13$BTS, die weltberühmte K-Pop-Band, findet 2026 als komplette Gruppe wieder zusammen, nachdem alle sieben Mitglieder Südkoreas Wehrpflicht abgeleistet haben. Die ARMY genannten Fans warten seit Jahren darauf, dass die sieben wieder gemeinsam Musik machen.$a13$,
$a13$BTS, le groupe de K-pop mondialement célèbre, se reforme au complet en 2026 après que ses sept membres ont accompli le service militaire obligatoire de Corée du Sud. Les fans, appelés ARMY, attendent depuis des années que les sept refassent de la musique ensemble.$a13$,
$a13$BTS, nhóm nhạc K-pop nổi tiếng toàn cầu, tái hợp đầy đủ đội hình vào năm 2026 sau khi cả bảy thành viên hoàn thành nghĩa vụ quân sự bắt buộc của Hàn Quốc. Người hâm mộ mang tên ARMY đã chờ nhiều năm để bảy chàng trai cùng làm nhạc trở lại.$a13$,
$a13$BTS วงเคป็อปชื่อดังระดับโลก กลับมารวมตัวครบวงในปี 2026 หลังสมาชิกทั้งเจ็ดคนรับใช้ชาติในกองทัพเกาหลีใต้เสร็จสิ้น แฟน ๆ ที่เรียกว่า ARMY รอคอยหลายปีให้ทั้งเจ็ดคนได้ทำเพลงร่วมกันอีกครั้ง$a13$,
$a13$BTS, band K-pop yang tersohor di dunia, bersatu kembali sebagai grup utuh pada 2026 setelah ketujuh anggotanya merampungkan wajib militer Korea Selatan. Penggemar yang disebut ARMY telah menunggu bertahun-tahun agar ketujuhnya kembali bermusik bersama.$a13$,
$a13$BTS, the world-famous South Korean boy band, is reuniting in 2026 for new music as a full group. All seven members have now finished South Korea's mandatory military service, clearing the way for their return.

In South Korea, most young men must serve in the military for about 18 months. BTS paused group activities so its members could serve one by one while also releasing solo songs. Fans, known as ARMY, waited years for the seven to work together again.

BTS is not the only big act back in 2026 — other veteran groups are also returning after members completed their service. For the K-pop industry, the reunion of such a popular group is expected to bring huge concerts, new albums, and renewed global attention.$a13$,
$a13$세계적으로 유명한 한국 보이 밴드 BTS가 2026년 완전체로 다시 뭉쳐 새 음악을 선보인다. 이제 일곱 멤버 모두 한국의 의무 병역을 마쳐, 그룹으로 돌아올 길이 열렸다.

한국에서는 대부분의 젊은 남성이 약 18개월 동안 군대에 복무해야 한다. BTS는 멤버들이 한 명씩 군에 다녀올 수 있도록 그룹 활동을 잠시 멈췄고, 그동안 각자 솔로 곡도 냈다. 아미(ARMY)라 불리는 팬들은 일곱 명이 다시 함께 활동하기를 몇 년간 기다렸다.

2026년에 돌아오는 큰 그룹은 BTS만이 아니다. 다른 베테랑 그룹들도 멤버들이 병역을 마친 뒤 복귀하고 있다. K-팝 업계로서는 이렇게 인기 많은 그룹의 재결합이 대규모 콘서트와 새 앨범, 그리고 전 세계의 새로운 관심을 불러올 것으로 기대된다.$a13$,
$a13$世界的に有名な韓国のボーイバンドBTSが、2026年に完全体で再び集まり、新しい音楽を披露する。7人全員が韓国の兵役を終え、グループとして戻る道が開けた。

韓国では、多くの若い男性が約18か月間、軍隊に服務しなければならない。BTSはメンバーが一人ずつ兵役に行けるようグループ活動を一時休止し、その間それぞれソロ曲も出した。ARMY（アーミー）と呼ばれるファンは、7人が再び一緒に活動する日を何年も待った。

2026年に戻ってくる大きなグループはBTSだけではない。ほかのベテラングループも、メンバーが兵役を終えて復帰している。K-POP業界にとって、これほど人気のあるグループの再結成は、大規模なコンサートや新アルバム、そして世界の新たな注目をもたらすと期待されている。$a13$,
$a13$舉世聞名的韓國男團BTS將於2026年以完全體重新集結，推出新音樂。如今七名成員全部完成韓國義務兵役，回歸之路已然打開。

在韓國，大多數年輕男性都必須服役約18個月。BTS曾暫停團體活動，好讓成員一個接一個去當兵，期間也各自推出個人歌曲。名為ARMY的粉絲，已等待多年盼七人再度一起活動。

2026年回歸的大團不只BTS，其他資深團體也在成員退伍後陸續回歸。對K-pop產業而言，如此高人氣團體的重新合體，預料將帶來大型演唱會、新專輯，以及全球的重新關注。$a13$,
$a13$BTS, la mundialmente famosa banda masculina surcoreana, se reúne como grupo completo en 2026 para presentar nueva música. Ahora que sus siete miembros han cumplido el servicio militar obligatorio de Corea del Sur, el camino para su regreso está despejado.

En Corea del Sur, la mayoría de los jóvenes deben servir en el ejército durante unos 18 meses. BTS pausó su actividad grupal para que sus miembros fueran cumpliendo el servicio uno a uno, mientras publicaban canciones en solitario. Los fans, llamados ARMY, esperaron años para que los siete volvieran a trabajar juntos.

BTS no es el único gran grupo que regresa en 2026: otras bandas veteranas también vuelven tras completar sus miembros el servicio. Para la industria del K-pop, la reunión de un grupo tan popular promete grandes conciertos, nuevos álbumes y una atención global renovada.$a13$,
$a13$BTS, die weltberühmte südkoreanische Boyband, kommt 2026 als komplette Gruppe wieder zusammen, um neue Musik zu präsentieren. Da nun alle sieben Mitglieder Südkoreas Wehrpflicht abgeleistet haben, ist der Weg für ihre Rückkehr frei.

In Südkorea müssen die meisten jungen Männer rund 18 Monate beim Militär dienen. BTS legte seine Gruppenaktivitäten auf Eis, damit die Mitglieder nacheinander dienen konnten, und veröffentlichte in der Zwischenzeit Solosongs. Die ARMY genannten Fans warteten jahrelang darauf, dass die sieben wieder zusammenarbeiten.

BTS ist nicht die einzige große Gruppe, die 2026 zurückkehrt: Auch andere erfahrene Bands melden sich zurück, nachdem ihre Mitglieder den Dienst beendet haben. Für die K-Pop-Branche verspricht die Wiedervereinigung einer so beliebten Gruppe große Konzerte, neue Alben und erneute weltweite Aufmerksamkeit.$a13$,
$a13$BTS, le célébrissime boys band sud-coréen, se reforme au complet en 2026 pour présenter de nouvelles chansons. Maintenant que ses sept membres ont accompli le service militaire obligatoire de Corée du Sud, la voie est libre pour leur retour.

En Corée du Sud, la plupart des jeunes hommes doivent servir dans l'armée pendant environ 18 mois. BTS avait mis ses activités de groupe en pause pour que ses membres accomplissent leur service un par un, tout en sortant des chansons solo. Les fans, appelés ARMY, ont attendu des années que les sept retravaillent ensemble.

BTS n'est pas le seul grand groupe à revenir en 2026 : d'autres formations chevronnées reviennent aussi après le service de leurs membres. Pour l'industrie de la K-pop, la réunion d'un groupe aussi populaire promet de grands concerts, de nouveaux albums et un regain d'attention mondiale.$a13$,
$a13$BTS, nhóm nhạc nam Hàn Quốc nổi tiếng toàn cầu, tái hợp đầy đủ đội hình vào năm 2026 để giới thiệu âm nhạc mới. Nay cả bảy thành viên đã hoàn thành nghĩa vụ quân sự bắt buộc của Hàn Quốc, mở đường cho sự trở lại của nhóm.

Ở Hàn Quốc, hầu hết nam thanh niên phải phục vụ trong quân đội khoảng 18 tháng. BTS tạm dừng hoạt động nhóm để các thành viên lần lượt nhập ngũ, đồng thời phát hành các ca khúc solo. Người hâm mộ mang tên ARMY đã chờ nhiều năm để bảy chàng trai làm việc cùng nhau trở lại.

BTS không phải nhóm lớn duy nhất trở lại trong năm 2026: các nhóm kỳ cựu khác cũng tái xuất sau khi thành viên hoàn thành nghĩa vụ. Với ngành K-pop, sự tái hợp của một nhóm nổi tiếng như vậy được kỳ vọng mang lại những buổi hòa nhạc lớn, album mới và sự chú ý toàn cầu mới mẻ.$a13$,
$a13$BTS วงบอยแบนด์เกาหลีใต้ที่โด่งดังไปทั่วโลก กลับมารวมตัวครบวงในปี 2026 เพื่อนำเสนอผลงานเพลงใหม่ ตอนนี้สมาชิกทั้งเจ็ดคนรับใช้ชาติในกองทัพเกาหลีใต้ครบแล้ว จึงเปิดทางให้พวกเขากลับมา

ในเกาหลีใต้ ชายหนุ่มส่วนใหญ่ต้องรับใช้ในกองทัพราว 18 เดือน BTS พักกิจกรรมของวงเพื่อให้สมาชิกทยอยไปรับใช้ชาติทีละคน พร้อมกับปล่อยเพลงเดี่ยวในช่วงนั้น แฟน ๆ ที่เรียกว่า ARMY รอคอยหลายปีให้ทั้งเจ็ดคนได้กลับมาทำงานร่วมกันอีกครั้ง

BTS ไม่ใช่วงใหญ่วงเดียวที่กลับมาในปี 2026 วงรุ่นเก๋าอื่น ๆ ก็ทยอยกลับมาหลังสมาชิกปลดประจำการเช่นกัน สำหรับวงการ K-pop การรวมตัวของวงที่ได้รับความนิยมสูงเช่นนี้ คาดว่าจะนำมาซึ่งคอนเสิร์ตขนาดใหญ่ อัลบั้มใหม่ และความสนใจจากทั่วโลกอีกครั้ง$a13$,
$a13$BTS, band pria Korea Selatan yang tersohor di dunia, bersatu kembali sebagai grup utuh pada 2026 untuk menghadirkan musik baru. Kini ketujuh anggotanya telah merampungkan wajib militer Korea Selatan, membuka jalan bagi kepulangan mereka.

Di Korea Selatan, sebagian besar pria muda wajib bertugas di militer sekitar 18 bulan. BTS menghentikan sementara kegiatan grup agar para anggotanya bisa menjalani wajib militer satu per satu, sambil merilis lagu solo. Penggemar yang disebut ARMY menunggu bertahun-tahun agar ketujuhnya kembali berkarya bersama.

BTS bukan satu-satunya grup besar yang kembali pada 2026: grup-grup veteran lain juga comeback setelah anggotanya menuntaskan wajib militer. Bagi industri K-pop, reuni grup sepopuler ini diperkirakan akan menghadirkan konser besar, album baru, dan perhatian global yang kembali menguat.$a13$,
$a13$BTS is reuniting as a full group in 2026 after all seven members finished South Korea's mandatory military service, promising new music and huge concerts.$a13$,
$a13$BTS 2026, BTS reunion, military service, K-pop comeback, ARMY, BTS new music$a13$,
'beginner',
3, 4, 4,
$a13$[
{"word":"군대","reading":"gundae","reading_ja":"クンデ","part_of_speech":"noun","definition_en":"the military; army","definition_ja":"軍隊","definition_zh_tw":"軍隊","definition_es":"el ejército; el servicio militar","definition_de":"Militär; Armee","definition_fr":"l'armée","definition_vi":"quân đội","definition_th":"กองทัพ","definition_id":"militer; tentara","example_ko":"한국 남자들은 군대에 간다.","example_en":"Korean men go to the military.","example_ja":"韓国の男性は軍隊に行く。","example_zh_tw":"韓國男生都要去當兵。","example_es":"Los hombres coreanos van al ejército.","example_de":"Koreanische Männer gehen zum Militär.","example_fr":"Les hommes coréens font l'armée.","example_vi":"Đàn ông Hàn Quốc phải đi quân đội.","example_th":"ผู้ชายเกาหลีต้องไปเป็นทหาร","example_id":"Pria Korea wajib masuk militer."},
{"word":"가수","reading":"gasu","reading_ja":"カス","part_of_speech":"noun","definition_en":"singer","definition_ja":"歌手","definition_zh_tw":"歌手","definition_es":"cantante","definition_de":"Sänger","definition_fr":"chanteur","definition_vi":"ca sĩ","definition_th":"นักร้อง","definition_id":"penyanyi","example_ko":"그는 유명한 가수예요.","example_en":"He is a famous singer.","example_ja":"彼は有名な歌手です。","example_zh_tw":"他是有名的歌手。","example_es":"Él es un cantante famoso.","example_de":"Er ist ein berühmter Sänger.","example_fr":"C'est un chanteur célèbre.","example_vi":"Anh ấy là một ca sĩ nổi tiếng.","example_th":"เขาเป็นนักร้องที่มีชื่อเสียง","example_id":"Dia penyanyi terkenal."},
{"word":"그룹","reading":"geurup","reading_ja":"グルプ","part_of_speech":"noun","definition_en":"group (music group)","definition_ja":"グループ","definition_zh_tw":"團體；組合","definition_es":"grupo","definition_de":"Gruppe; Band","definition_fr":"groupe","definition_vi":"nhóm nhạc","definition_th":"กลุ่ม; วง","definition_id":"grup","example_ko":"그 그룹은 멤버가 일곱 명이다.","example_en":"That group has seven members.","example_ja":"そのグループはメンバーが7人だ。","example_zh_tw":"那個團體有七名成員。","example_es":"Ese grupo tiene siete miembros.","example_de":"Diese Gruppe hat sieben Mitglieder.","example_fr":"Ce groupe compte sept membres.","example_vi":"Nhóm đó có bảy thành viên.","example_th":"วงนั้นมีสมาชิกเจ็ดคน","example_id":"Grup itu punya tujuh anggota."},
{"word":"무대","reading":"mudae","reading_ja":"ムデ","part_of_speech":"noun","definition_en":"stage (for performing)","definition_ja":"舞台；ステージ","definition_zh_tw":"舞台","definition_es":"escenario","definition_de":"Bühne","definition_fr":"scène","definition_vi":"sân khấu","definition_th":"เวที","definition_id":"panggung","example_ko":"가수들이 무대에 올랐다.","example_en":"The singers took the stage.","example_ja":"歌手たちが舞台に立った。","example_zh_tw":"歌手們登上了舞台。","example_es":"Los cantantes subieron al escenario.","example_de":"Die Sänger betraten die Bühne.","example_fr":"Les chanteurs sont montés sur scène.","example_vi":"Các ca sĩ bước lên sân khấu.","example_th":"นักร้องขึ้นเวที","example_id":"Para penyanyi naik ke panggung."},
{"word":"인기","reading":"in-gi","reading_ja":"インギ","part_of_speech":"noun","definition_en":"popularity","definition_ja":"人気","definition_zh_tw":"人氣；受歡迎","definition_es":"popularidad","definition_de":"Beliebtheit","definition_fr":"popularité","definition_vi":"sự nổi tiếng; độ nổi tiếng","definition_th":"ความนิยม","definition_id":"popularitas","example_ko":"그 그룹은 인기가 아주 많다.","example_en":"That group is very popular.","example_ja":"そのグループはとても人気がある。","example_zh_tw":"那個團體非常受歡迎。","example_es":"Ese grupo es muy popular.","example_de":"Diese Gruppe ist sehr beliebt.","example_fr":"Ce groupe est très populaire.","example_vi":"Nhóm đó rất được yêu thích.","example_th":"วงนั้นได้รับความนิยมมาก","example_id":"Grup itu sangat populer."}
]$a13$::jsonb,
'published', true, 0,
'2026-06-21T23:00:00Z', '2026-06-21T23:00:00Z', '2026-06-21T23:00:00Z'
);

-- Article 14 — 2026-06-23 travel intermediate — 10 million foreign visitors reached earliest ever
INSERT INTO articles (topic_id, slug, title_en, title_ko, title_ja, title_zh_tw, title_es, title_de, title_fr, title_vi, title_th, title_id, summary_en, summary_ko, summary_ja, summary_zh_tw, summary_es, summary_de, summary_fr, summary_vi, summary_th, summary_id, content_en, content_ko, content_ja, content_zh_tw, content_es, content_de, content_fr, content_vi, content_th, content_id, seo_description, seo_keywords, level, reading_time_en, reading_time_ko, reading_time_ja, vocabulary, status, ai_generated, view_count, published_at, created_at, updated_at) VALUES (
(SELECT id FROM topics WHERE slug = 'travel'),
'travel-2026-06-23',
$a14$South Korea Hits 10 Million Foreign Visitors Earliest Ever in 2026$a14$,
$a14$한국, 2026년 역대 최단기간에 외국인 1000만 명 돌파$a14$,
$a14$韓国、2026年最速で外国人観光客1000万人突破$a14$,
$a14$韓國2026年最快突破千萬名外國旅客$a14$,
$a14$Corea del Sur alcanza 10 millones de turistas antes que nunca en 2026$a14$,
$a14$Südkorea erreicht 2026 so früh wie nie 10 Millionen Besucher$a14$,
$a14$La Corée du Sud atteint 10 millions de visiteurs plus tôt que jamais$a14$,
$a14$Hàn Quốc đón 10 triệu khách quốc tế sớm nhất từ trước tới nay$a14$,
$a14$เกาหลีแตะ 10 ล้านนักท่องเที่ยวต่างชาติเร็วสุดในปี 2026$a14$,
$a14$Korea Capai 10 Juta Wisatawan Asing Tercepat pada 2026$a14$,
$a14$South Korea welcomed its 10 millionth foreign visitor of the year around June 21, 2026 — the earliest ever, about a month faster than in 2025. China leads arrivals, and overseas card spending hit a record 2 trillion won in May.$a14$,
$a14$한국이 2026년 6월 21일 무렵 올해 외국인 방문객 1000만 명을 넘어섰다. 역대 가장 빠른 기록으로, 2025년보다 약 한 달 빠르다. 중국이 방문객 1위이며, 5월 외국인 카드 지출은 사상 최대인 2조 원을 기록했다.$a14$,
$a14$韓国が2026年6月21日ごろ、今年の外国人観光客1000万人を突破した。史上最速で、2025年より約1か月早い。訪問者は中国が最多で、5月の外国人カード支出は過去最高の2兆ウォンに達した。$a14$,
$a14$韓國在2026年6月21日前後突破今年千萬名外國旅客，創史上最快紀錄，比2025年快約一個月。旅客以中國最多，5月外國人刷卡消費更創下2兆韓元新高。$a14$,
$a14$Corea del Sur recibió a su turista número 10 millones del año hacia el 21 de junio de 2026, antes que nunca y un mes más rápido que en 2025. China encabeza las llegadas y el gasto con tarjeta de extranjeros marcó un récord de 2 billones de wones en mayo.$a14$,
$a14$Südkorea begrüßte um den 21. Juni 2026 seinen 10-millionsten ausländischen Besucher des Jahres – so früh wie nie, rund einen Monat schneller als 2025. China führt die Ankünfte an, und die Kartenausgaben ausländischer Gäste erreichten im Mai einen Rekord von 2 Billionen Won.$a14$,
$a14$La Corée du Sud a accueilli son 10 millionième visiteur étranger de l'année vers le 21 juin 2026, plus tôt que jamais, environ un mois plus vite qu'en 2025. La Chine domine les arrivées et les dépenses par carte des étrangers ont atteint un record de 2 000 milliards de wons en mai.$a14$,
$a14$Hàn Quốc đón vị khách quốc tế thứ 10 triệu của năm vào khoảng ngày 21/6/2026 — sớm nhất từ trước tới nay, nhanh hơn năm 2025 khoảng một tháng. Trung Quốc dẫn đầu lượng khách, và chi tiêu thẻ của khách nước ngoài đạt kỷ lục 2 nghìn tỷ won trong tháng 5.$a14$,
$a14$เกาหลีใต้ต้อนรับนักท่องเที่ยวต่างชาติคนที่ 10 ล้านของปีราววันที่ 21 มิถุนายน 2026 ซึ่งเร็วที่สุดเท่าที่เคยมีมา เร็วกว่าปี 2025 ราวหนึ่งเดือน จีนเป็นแหล่งนักท่องเที่ยวอันดับหนึ่ง และยอดใช้จ่ายผ่านบัตรของชาวต่างชาติแตะสถิติ 2 ล้านล้านวอนในเดือนพฤษภาคม$a14$,
$a14$Korea Selatan menyambut wisatawan asing ke-10 juta tahun ini sekitar 21 Juni 2026 — tercepat sepanjang sejarah, sekitar sebulan lebih cepat dari 2025. China memimpin kedatangan, dan belanja kartu turis asing mencetak rekor 2 triliun won pada Mei.$a14$,
$a14$South Korea welcomed its 10 millionth foreign visitor of the year around June 21, 2026 — the earliest the country has ever reached that milestone, roughly a month faster than in 2025. Officials cheered the pace as a sign that inbound tourism has fully recovered and then some.

China has returned as the single biggest source of visitors, followed by strong numbers from Japan, Taiwan, the United States, and Southeast Asia. Foreigners are also spending more once they arrive: card spending by overseas visitors topped 2 trillion won in May, a record.

Several factors are fueling the surge. A weaker Korean won makes shopping and dining cheaper for visitors, K-pop and dramas keep drawing first-time fans, and new international flight routes have opened gateways beyond Seoul. Many time their trips around big concerts and festivals.

The boom is a boost for hotels, airlines, and shops, but it also raises familiar worries about crowding in hot spots like Seoul's Myeongdong and Jeju Island. The government says it wants to spread visitors to more regions and keep the growth sustainable rather than overwhelming.$a14$,
$a14$한국이 2026년 6월 21일 무렵 올해 1000만 번째 외국인 방문객을 맞이했다. 이 나라가 이 기록에 도달한 것 중 가장 빠른 시점으로, 2025년보다 약 한 달 이르다. 당국은 이 속도를 두고 외국인 관광이 완전히 회복됐을 뿐 아니라 그 이상이라는 신호라며 반겼다.

중국이 다시 방문객 1위 국가로 돌아왔고, 일본·타이완·미국·동남아시아에서 오는 방문객도 많았다. 외국인들은 도착한 뒤 쓰는 돈도 늘었다. 5월 외국인 카드 지출은 사상 처음으로 2조 원을 넘어섰다.

이 급증에는 몇 가지 요인이 있다. 약해진 원화 덕분에 방문객에게 쇼핑과 식사가 더 저렴해졌고, K-팝과 드라마가 처음 오는 팬을 계속 끌어들이며, 새 국제선 노선이 서울 밖으로 향하는 관문을 열었다. 대형 콘서트와 축제에 맞춰 여행 일정을 잡는 사람도 많다.

이 호황은 호텔과 항공사, 상점에는 힘이 되지만, 서울 명동이나 제주도 같은 인기 지역이 붐빈다는 익숙한 걱정도 낳는다. 정부는 방문객을 더 많은 지역으로 분산하고, 감당하기 힘든 수준이 아니라 지속 가능한 성장을 유지하고 싶다고 밝혔다.$a14$,
$a14$韓国が2026年6月21日ごろ、今年1000万人目の外国人観光客を迎えた。この国がこの節目に達した中で最も早く、2025年より約1か月早い。当局はこのペースを、外国人観光が完全に回復し、さらにそれを上回る兆しだとして歓迎した。

中国が再び訪問者数で首位に戻り、日本・台湾・アメリカ・東南アジアからの旅行者も多かった。外国人は到着後に使う金額も増えている。5月の外国人カード支出は史上初めて2兆ウォンを超えた。

この急増にはいくつかの要因がある。ウォン安のおかげで旅行者にとって買い物や食事が安くなり、K-POPやドラマが初めて訪れるファンを引き寄せ続け、新しい国際線がソウル以外への玄関口を開いた。大型コンサートやフェスに合わせて旅行日程を組む人も多い。

この好況はホテルや航空会社、店舗には追い風だが、ソウルの明洞や済州島といった人気スポットが混み合うという、おなじみの懸念も生む。政府は、観光客をより多くの地域へ分散させ、抱えきれない水準ではなく持続可能な成長を保ちたいとしている。$a14$,
$a14$韓國在2026年6月21日前後迎來今年第1000萬名外國旅客。這是該國達到這項里程碑最快的一次，比2025年早約一個月。當局為此速度喝采，稱這是外國觀光不僅完全復甦、甚至更上一層樓的訊號。

中國重新成為旅客最多的來源國，來自日本、台灣、美國與東南亞的旅客也很多。外國人抵達後的消費也增加了，5月外國人刷卡消費首度突破2兆韓元。

這波激增有幾項原因：韓元走弱讓旅客購物與用餐更便宜，K-pop與韓劇持續吸引首次到訪的粉絲，新的國際航線也打開了通往首爾以外地區的門戶。不少人更配合大型演唱會與慶典安排行程。

這股榮景對飯店、航空公司與商店是助力，卻也帶來熟悉的隱憂——首爾明洞、濟州島等熱門地區人潮擁擠。政府表示，希望把旅客分散到更多地區，維持可持續而非難以負荷的成長。$a14$,
$a14$Corea del Sur dio la bienvenida a su turista número 10 millones del año hacia el 21 de junio de 2026, el momento más temprano en que el país ha alcanzado esa cifra, cerca de un mes antes que en 2025. Las autoridades celebraron el ritmo como señal de que el turismo receptor no solo se ha recuperado del todo, sino que va más allá.

China ha vuelto a ser el mayor país emisor de visitantes, seguido de cifras sólidas de Japón, Taiwán, Estados Unidos y el Sudeste Asiático. Los extranjeros también gastan más una vez que llegan: el gasto con tarjeta de los visitantes superó los 2 billones de wones en mayo, un récord.

Varios factores alimentan el auge. Un won más débil abarata las compras y las comidas para los visitantes, el K-pop y los dramas siguen atrayendo a nuevos fans, y las nuevas rutas aéreas internacionales han abierto puertas más allá de Seúl. Muchos programan sus viajes en torno a grandes conciertos y festivales.

El auge impulsa a hoteles, aerolíneas y comercios, pero también reaviva las preocupaciones habituales por la aglomeración en puntos calientes como Myeongdong, en Seúl, y la isla de Jeju. El gobierno dice que quiere repartir a los visitantes por más regiones y mantener un crecimiento sostenible, no desbordante.$a14$,
$a14$Südkorea begrüßte um den 21. Juni 2026 seinen 10-millionsten ausländischen Besucher des Jahres – so früh wie nie zuvor, rund einen Monat schneller als 2025. Die Behörden feierten das Tempo als Zeichen, dass sich der Incoming-Tourismus nicht nur vollständig erholt hat, sondern darüber hinausgeht.

China ist wieder das wichtigste Herkunftsland, gefolgt von starken Zahlen aus Japan, Taiwan, den USA und Südostasien. Ausländer geben nach ihrer Ankunft auch mehr aus: Die Kartenausgaben der Gäste überschritten im Mai mit 2 Billionen Won einen Rekordwert.

Mehrere Faktoren treiben den Boom. Ein schwächerer Won macht Einkaufen und Essen für Besucher günstiger, K-Pop und Dramen ziehen weiter Erstbesucher an, und neue internationale Flugverbindungen haben Tore jenseits von Seoul geöffnet. Viele planen ihre Reisen zudem rund um große Konzerte und Festivals.

Der Boom beflügelt Hotels, Fluggesellschaften und Geschäfte, weckt aber auch die bekannten Sorgen über Gedränge an Hotspots wie Seouls Myeongdong und der Insel Jeju. Die Regierung erklärt, sie wolle die Besucher auf mehr Regionen verteilen und ein nachhaltiges statt überwältigendes Wachstum sichern.$a14$,
$a14$La Corée du Sud a accueilli son 10 millionième visiteur étranger de l'année vers le 21 juin 2026, le moment le plus précoce où le pays a atteint ce cap, environ un mois plus tôt qu'en 2025. Les autorités ont salué ce rythme comme le signe que le tourisme entrant s'est non seulement pleinement rétabli, mais l'a même dépassé.

La Chine est redevenue le premier pays émetteur de visiteurs, suivie de chiffres solides du Japon, de Taïwan, des États-Unis et d'Asie du Sud-Est. Les étrangers dépensent aussi davantage une fois sur place : les dépenses par carte des visiteurs ont dépassé 2 000 milliards de wons en mai, un record.

Plusieurs facteurs nourrissent l'essor. Un won plus faible rend les achats et les repas moins chers pour les visiteurs, la K-pop et les dramas continuent d'attirer de nouveaux fans, et de nouvelles liaisons aériennes internationales ont ouvert des portes au-delà de Séoul. Beaucoup calent aussi leurs voyages sur de grands concerts et festivals.

Cet essor profite aux hôtels, aux compagnies aériennes et aux commerces, mais ravive les inquiétudes habituelles sur la surfréquentation de lieux prisés comme Myeongdong à Séoul et l'île de Jeju. Le gouvernement affirme vouloir répartir les visiteurs sur davantage de régions et préserver une croissance durable plutôt que débordante.$a14$,
$a14$Hàn Quốc đã đón vị khách quốc tế thứ 10 triệu của năm vào khoảng ngày 21 tháng 6 năm 2026 — thời điểm sớm nhất mà nước này từng đạt cột mốc đó, nhanh hơn năm 2025 khoảng một tháng. Giới chức ca ngợi tốc độ này như dấu hiệu cho thấy du lịch quốc tế không chỉ phục hồi hoàn toàn mà còn vượt xa hơn.

Trung Quốc đã trở lại là nguồn khách lớn nhất, theo sau là lượng khách mạnh từ Nhật Bản, Đài Loan, Hoa Kỳ và Đông Nam Á. Khách nước ngoài cũng chi tiêu nhiều hơn sau khi đến: chi tiêu qua thẻ của du khách vượt 2 nghìn tỷ won trong tháng 5, một kỷ lục.

Nhiều yếu tố thúc đẩy sự bùng nổ. Đồng won yếu hơn khiến việc mua sắm và ăn uống rẻ hơn cho du khách, K-pop và phim truyền hình tiếp tục thu hút người hâm mộ lần đầu, và các đường bay quốc tế mới đã mở cửa ngõ ra ngoài Seoul. Nhiều người còn sắp xếp chuyến đi quanh các buổi hòa nhạc và lễ hội lớn.

Sự bùng nổ là cú hích cho khách sạn, hãng bay và cửa hàng, nhưng cũng làm dấy lại nỗi lo quen thuộc về tình trạng đông đúc ở những điểm nóng như khu Myeongdong ở Seoul và đảo Jeju. Chính phủ cho biết muốn phân bổ du khách đến nhiều vùng hơn và duy trì tăng trưởng bền vững thay vì quá tải.$a14$,
$a14$เกาหลีใต้ต้อนรับนักท่องเที่ยวต่างชาติคนที่ 10 ล้านของปีราววันที่ 21 มิถุนายน 2026 ซึ่งเป็นช่วงเวลาที่เร็วที่สุดที่ประเทศเคยแตะระดับนี้ เร็วกว่าปี 2025 ราวหนึ่งเดือน ทางการชื่นชมความเร็วนี้ว่าเป็นสัญญาณว่าการท่องเที่ยวขาเข้าไม่เพียงฟื้นตัวเต็มที่ แต่ยังก้าวไกลกว่านั้น

จีนกลับมาเป็นแหล่งนักท่องเที่ยวรายใหญ่ที่สุด ตามด้วยตัวเลขที่แข็งแกร่งจากญี่ปุ่น ไต้หวัน สหรัฐฯ และเอเชียตะวันออกเฉียงใต้ นักท่องเที่ยวต่างชาติยังใช้จ่ายมากขึ้นเมื่อมาถึง โดยยอดใช้จ่ายผ่านบัตรในเดือนพฤษภาคมทะลุ 2 ล้านล้านวอนเป็นครั้งแรก

การพุ่งขึ้นนี้มีหลายปัจจัย เงินวอนที่อ่อนค่าทำให้การช้อปปิงและรับประทานอาหารถูกลงสำหรับนักท่องเที่ยว K-pop และซีรีส์ยังคงดึงดูดแฟนหน้าใหม่ และเส้นทางการบินระหว่างประเทศใหม่ ๆ ได้เปิดประตูสู่พื้นที่นอกกรุงโซล หลายคนยังจัดทริปให้ตรงกับคอนเสิร์ตและเทศกาลใหญ่

ความเฟื่องฟูนี้เป็นแรงหนุนต่อโรงแรม สายการบิน และร้านค้า แต่ก็ก่อความกังวลที่คุ้นเคยเรื่องความแออัดในจุดยอดนิยมอย่างเมียงดงในโซลและเกาะเชจู รัฐบาลระบุว่าต้องการกระจายนักท่องเที่ยวไปยังภูมิภาคต่าง ๆ มากขึ้น และรักษาการเติบโตที่ยั่งยืนแทนที่จะล้นเกินรับไหว$a14$,
$a14$Korea Selatan menyambut wisatawan asing ke-10 juta tahun ini sekitar 21 Juni 2026 — paling awal yang pernah dicapai negara itu, sekitar sebulan lebih cepat dibanding 2025. Pihak berwenang menyambut laju ini sebagai tanda bahwa pariwisata mancanegara tak hanya pulih sepenuhnya, tetapi bahkan melampauinya.

China kembali menjadi sumber pengunjung terbesar, diikuti angka kuat dari Jepang, Taiwan, Amerika Serikat, dan Asia Tenggara. Warga asing juga berbelanja lebih banyak setibanya: belanja kartu pengunjung menembus 2 triliun won pada Mei, sebuah rekor.

Beberapa faktor mendorong lonjakan ini. Won yang lebih lemah membuat belanja dan makan lebih murah bagi pengunjung, K-pop dan drama terus menarik penggemar baru, serta rute penerbangan internasional baru membuka gerbang di luar Seoul. Banyak orang juga mengatur perjalanan mereka seputar konser dan festival besar.

Lonjakan ini mengangkat hotel, maskapai, dan toko, tetapi juga membangkitkan kekhawatiran lama soal kepadatan di titik ramai seperti Myeongdong di Seoul dan Pulau Jeju. Pemerintah menyatakan ingin menyebar pengunjung ke lebih banyak daerah dan menjaga pertumbuhan tetap berkelanjutan alih-alih membeludak.$a14$,
$a14$South Korea hit 10 million foreign visitors around June 21, 2026 — its earliest ever, a month faster than 2025 — led by China, with record May card spending.$a14$,
$a14$Korea tourism record, 10 million visitors, inbound tourism 2026, Korea travel, Chinese tourists, tourist spending$a14$,
'intermediate',
3, 4, 4,
$a14$[
{"word":"방문객","reading":"bangmun-gaek","reading_ja":"パンムンゲク","part_of_speech":"noun","definition_en":"visitor","definition_ja":"訪問客；来訪者","definition_zh_tw":"訪客；來訪者","definition_es":"visitante","definition_de":"Besucher","definition_fr":"visiteur","definition_vi":"khách đến thăm; du khách","definition_th":"ผู้มาเยือน","definition_id":"pengunjung","example_ko":"올해 외국인 방문객이 크게 늘었다.","example_en":"The number of foreign visitors rose sharply this year.","example_ja":"今年、外国人の訪問客が大きく増えた。","example_zh_tw":"今年外國訪客大幅增加。","example_es":"El número de visitantes extranjeros creció mucho este año.","example_de":"Die Zahl ausländischer Besucher stieg dieses Jahr stark.","example_fr":"Le nombre de visiteurs étrangers a fortement augmenté cette année.","example_vi":"Số du khách nước ngoài tăng mạnh trong năm nay.","example_th":"จำนวนผู้มาเยือนต่างชาติเพิ่มขึ้นมากในปีนี้","example_id":"Jumlah pengunjung asing meningkat tajam tahun ini."},
{"word":"여행","reading":"yeohaeng","reading_ja":"ヨヘン","part_of_speech":"noun","definition_en":"travel; a trip","definition_ja":"旅行","definition_zh_tw":"旅行","definition_es":"viaje","definition_de":"Reise","definition_fr":"voyage","definition_vi":"chuyến du lịch; việc đi lại","definition_th":"การท่องเที่ยว; การเดินทาง","definition_id":"perjalanan; wisata","example_ko":"한국 여행이 점점 인기가 많아진다.","example_en":"Travel to Korea is becoming more popular.","example_ja":"韓国旅行がますます人気になっている。","example_zh_tw":"到韓國旅行越來越受歡迎。","example_es":"Viajar a Corea es cada vez más popular.","example_de":"Reisen nach Korea werden immer beliebter.","example_fr":"Voyager en Corée est de plus en plus populaire.","example_vi":"Du lịch Hàn Quốc ngày càng được ưa chuộng.","example_th":"การเที่ยวเกาหลีได้รับความนิยมมากขึ้นเรื่อย ๆ","example_id":"Wisata ke Korea semakin populer."},
{"word":"환율","reading":"hwan-yul","reading_ja":"ファンニュル","part_of_speech":"noun","definition_en":"exchange rate","definition_ja":"為替レート","definition_zh_tw":"匯率","definition_es":"tipo de cambio","definition_de":"Wechselkurs","definition_fr":"taux de change","definition_vi":"tỷ giá hối đoái","definition_th":"อัตราแลกเปลี่ยน","definition_id":"nilai tukar; kurs","example_ko":"환율 덕분에 여행이 더 저렴해졌다.","example_en":"Thanks to the exchange rate, travel became cheaper.","example_ja":"為替レートのおかげで旅行が安くなった。","example_zh_tw":"多虧匯率，旅行變得更便宜。","example_es":"Gracias al tipo de cambio, viajar salió más barato.","example_de":"Dank des Wechselkurses wurde das Reisen billiger.","example_fr":"Grâce au taux de change, voyager est devenu moins cher.","example_vi":"Nhờ tỷ giá, việc du lịch trở nên rẻ hơn.","example_th":"ด้วยอัตราแลกเปลี่ยน การท่องเที่ยวจึงถูกลง","example_id":"Berkat nilai tukar, perjalanan menjadi lebih murah."},
{"word":"숙박","reading":"sukbak","reading_ja":"スクパク","part_of_speech":"noun","definition_en":"lodging; overnight accommodation","definition_ja":"宿泊","definition_zh_tw":"住宿","definition_es":"alojamiento","definition_de":"Unterkunft; Übernachtung","definition_fr":"hébergement","definition_vi":"chỗ ở; lưu trú","definition_th":"ที่พัก; การเข้าพัก","definition_id":"penginapan; akomodasi","example_ko":"성수기에는 숙박이 비싸다.","example_en":"Lodging is expensive in peak season.","example_ja":"繁忙期は宿泊が高い。","example_zh_tw":"旺季時住宿很貴。","example_es":"El alojamiento es caro en temporada alta.","example_de":"In der Hauptsaison ist die Unterkunft teuer.","example_fr":"L'hébergement est cher en haute saison.","example_vi":"Vào mùa cao điểm, chỗ ở rất đắt.","example_th":"ในช่วงไฮซีซัน ที่พักราคาแพง","example_id":"Penginapan mahal saat musim ramai."},
{"word":"몰리다","reading":"mollida","reading_ja":"モルリダ","part_of_speech":"verb","definition_en":"to flock; to crowd into; to be concentrated","definition_ja":"殺到する；集中する","definition_zh_tw":"湧入；聚集","definition_es":"aglomerarse; acudir en masa","definition_de":"sich drängen; strömen","definition_fr":"affluer; se masser","definition_vi":"đổ dồn; tụ tập đông","definition_th":"แห่กันมา; กระจุกตัว","definition_id":"berbondong-bondong; menumpuk","example_ko":"관광객이 명동에 몰렸다.","example_en":"Tourists flocked to Myeongdong.","example_ja":"観光客が明洞に殺到した。","example_zh_tw":"遊客湧入明洞。","example_es":"Los turistas se agolparon en Myeongdong.","example_de":"Touristen strömten nach Myeongdong.","example_fr":"Les touristes ont afflué à Myeongdong.","example_vi":"Du khách đổ dồn về Myeongdong.","example_th":"นักท่องเที่ยวแห่กันไปเมียงดง","example_id":"Wisatawan berbondong-bondong ke Myeongdong."}
]$a14$::jsonb,
'published', true, 0,
'2026-06-22T23:00:00Z', '2026-06-22T23:00:00Z', '2026-06-22T23:00:00Z'
);
```

## Batch 3 — articles 15–21

```sql
-- Article 15 — 2026-06-24 tech advanced — won-pegged stablecoin race
INSERT INTO articles (topic_id, slug, title_en, title_ko, title_ja, title_zh_tw, title_es, title_de, title_fr, title_vi, title_th, title_id, summary_en, summary_ko, summary_ja, summary_zh_tw, summary_es, summary_de, summary_fr, summary_vi, summary_th, summary_id, content_en, content_ko, content_ja, content_zh_tw, content_es, content_de, content_fr, content_vi, content_th, content_id, seo_description, seo_keywords, level, reading_time_en, reading_time_ko, reading_time_ja, vocabulary, status, ai_generated, view_count, published_at, created_at, updated_at) VALUES (
(SELECT id FROM topics WHERE slug = 'tech'),
'tech-2026-06-24',
$a15$South Korea Races to Launch a Won-Backed Stablecoin$a15$,
$a15$한국, 원화 기반 스테이블코인 출시 경쟁$a15$,
$a15$韓国、ウォン建てステーブルコインの導入を急ぐ$a15$,
$a15$韓國搶推韓元穩定幣$a15$,
$a15$Corea del Sur se apresura a lanzar una stablecoin en wones$a15$,
$a15$Südkorea drängt auf einen Won-gedeckten Stablecoin$a15$,
$a15$La Corée du Sud se hâte de lancer un stablecoin en wons$a15$,
$a15$Hàn Quốc chạy đua ra mắt stablecoin gắn với đồng won$a15$,
$a15$เกาหลีใต้เร่งเปิดตัวสเตเบิลคอยน์อิงเงินวอน$a15$,
$a15$Korea Selatan Berpacu Luncurkan Stablecoin Berbasis Won$a15$,
$a15$South Korea's biggest banks are building a stablecoin pegged to the won, while lawmakers draft a Digital Asset Basic Act to regulate it. Officials want a home-grown alternative to dollar stablecoins, and pilots have already tested QR payments and remittances.$a15$,
$a15$한국의 대형 은행들이 원화에 연동된 스테이블코인을 만들고 있고, 국회는 이를 규제할 디지털자산기본법을 준비 중이다. 당국은 달러 스테이블코인의 대안을 원하며, 이미 QR 결제와 송금 시범이 이뤄졌다.$a15$,
$a15$韓国の大手銀行がウォンに連動したステーブルコインを開発し、国会はこれを規制するデジタル資産基本法を準備している。当局はドル建てステーブルコインに代わる自国発の選択肢を求めており、すでにQR決済や送金の実証実験が行われた。$a15$,
$a15$韓國大型銀行正打造與韓元掛鉤的穩定幣，國會則研擬「數位資產基本法」加以規範。當局希望有本土版本，取代美元穩定幣，並已試行QR支付與跨境匯款。$a15$,
$a15$Los mayores bancos de Corea del Sur están creando una stablecoin ligada al won, mientras los legisladores redactan una Ley Básica de Activos Digitales para regularla. Las autoridades quieren una alternativa propia a las stablecoins en dólares, y ya se han probado pagos por QR y remesas.$a15$,
$a15$Südkoreas größte Banken entwickeln einen an den Won gekoppelten Stablecoin, während Abgeordnete ein Digital-Asset-Grundgesetz zu seiner Regulierung entwerfen. Die Behörden wollen eine heimische Alternative zu Dollar-Stablecoins; Pilotprojekte testeten bereits QR-Zahlungen und Überweisungen.$a15$,
$a15$Les plus grandes banques de Corée du Sud élaborent un stablecoin adossé au won, tandis que les législateurs rédigent une loi-cadre sur les actifs numériques pour l'encadrer. Les autorités veulent une alternative locale aux stablecoins en dollars, et des pilotes ont déjà testé paiements par QR et transferts.$a15$,
$a15$Các ngân hàng lớn nhất Hàn Quốc đang xây dựng một stablecoin gắn với đồng won, trong khi các nhà lập pháp soạn Luật Cơ bản về Tài sản Số để quản lý. Giới chức muốn một lựa chọn nội địa thay cho stablecoin USD, và các thử nghiệm đã kiểm tra thanh toán QR và chuyển tiền.$a15$,
$a15$ธนาคารใหญ่ที่สุดของเกาหลีใต้กำลังพัฒนาสเตเบิลคอยน์ที่อิงเงินวอน ขณะที่ฝ่ายนิติบัญญัติร่างกฎหมายสินทรัพย์ดิจิทัลพื้นฐานเพื่อกำกับดูแล ทางการต้องการทางเลือกในประเทศแทนสเตเบิลคอยน์ดอลลาร์ และมีการทดลองชำระเงินผ่าน QR และการโอนเงินแล้ว$a15$,
$a15$Bank-bank terbesar Korea Selatan tengah membangun stablecoin yang dipatok ke won, sementara para legislator menyusun Undang-Undang Dasar Aset Digital untuk mengaturnya. Pihak berwenang menginginkan alternatif lokal atas stablecoin dolar, dan uji coba telah menguji pembayaran QR dan pengiriman uang.$a15$,
$a15$South Korea is racing to launch a stablecoin pegged to its own currency, the won. In 2026, a consortium of the country's largest banks — including KB Kookmin, Shinhan, and Woori — has been building a won-backed digital token, while the ruling Democratic Party has proposed a Digital Asset Basic Act to regulate it.

A stablecoin is a cryptocurrency designed to hold a steady value by being tied to a real asset, usually a national currency. Most existing stablecoins are pegged to the US dollar. Korean officials worry that heavy use of dollar stablecoins could weaken the won's role in digital payments, so they want a home-grown alternative.

Trials are already underway. In a May 2026 pilot, KB Financial let customers pay with a won stablecoin using QR codes at a Hollys Coffee outlet, and even sent a cross-border remittance to Vietnam by converting the won token into a dollar one. Supporters say such tokens could make payments and overseas transfers faster and cheaper.

The plan has sparked debate over who should be allowed to issue the coins — established banks or newer fintech firms — and how much collateral issuers must hold. Lawmakers are expected to submit a formal bill in October. The outcome will shape whether South Korea, a major tech economy, can build a trusted digital currency system on its own terms.$a15$,
$a15$한국이 자국 통화인 원화에 연동된 스테이블코인 출시를 서두르고 있다. 2026년, KB국민·신한·우리를 비롯한 국내 대형 은행들이 컨소시엄을 이뤄 원화 기반 디지털 토큰을 개발해 왔고, 집권 더불어민주당은 이를 규제할 디지털자산기본법을 발의했다.

스테이블코인은 대개 국가 통화 같은 실물 자산에 연동돼 가치를 안정적으로 유지하도록 설계된 암호화폐다. 현재 대부분의 스테이블코인은 미국 달러에 연동돼 있다. 한국 당국은 달러 스테이블코인이 많이 쓰이면 디지털 결제에서 원화의 역할이 약해질 수 있다고 우려해, 국산 대안을 원한다.

시범 사업은 이미 진행 중이다. 2026년 5월 KB금융은 고객이 할리스커피 매장에서 QR코드로 원화 스테이블코인으로 결제하게 했고, 원화 토큰을 달러 토큰으로 바꿔 베트남으로 국경 간 송금까지 시연했다. 지지자들은 이런 토큰이 결제와 해외 송금을 더 빠르고 저렴하게 만들 수 있다고 말한다.

이 계획을 둘러싸고 누가 코인을 발행할 수 있는지—기존 은행인지 신생 핀테크 기업인지—와 발행사가 담보를 얼마나 보유해야 하는지를 두고 논쟁이 벌어졌다. 국회는 10월에 정식 법안을 제출할 것으로 보인다. 그 결과는 주요 기술 강국인 한국이 자기만의 방식으로 신뢰받는 디지털 화폐 체계를 세울 수 있을지를 좌우할 것이다.$a15$,
$a15$韓国が自国通貨ウォンに連動したステーブルコインの導入を急いでいる。2026年、KB国民・新韓・ウリィなど国内大手銀行がコンソーシアムを組んでウォン建てのデジタルトークンを開発してきた。与党「共に民主党」は、これを規制するデジタル資産基本法を提出した。

ステーブルコインは、多くの場合、国の通貨などの実物資産に連動して価値を安定させるよう設計された暗号資産だ。現在、多くのステーブルコインは米ドルに連動している。韓国当局は、ドル建てステーブルコインが広く使われるとデジタル決済でウォンの役割が弱まりかねないと懸念し、国産の選択肢を求めている。

実証実験はすでに進んでいる。2026年5月、KB金融は顧客がハリスコーヒーの店舗でQRコードを使いウォン建てステーブルコインで支払えるようにし、さらにウォンのトークンをドルのトークンに換えてベトナムへ国境を越えた送金まで実演した。支持者は、こうしたトークンが決済や海外送金をより速く安くできると言う。

この計画をめぐっては、誰がコインを発行できるのか——既存の銀行か新興フィンテック企業か——、発行体がどれだけ担保を持つべきかで議論が起きている。国会は10月に正式な法案を提出するとみられる。その結果は、主要な技術大国である韓国が、自国の流儀で信頼されるデジタル通貨の仕組みを築けるかどうかを左右する。$a15$,
$a15$韓國正加緊推出與本國貨幣韓元掛鉤的穩定幣。2026年，包括KB國民、新韓與友利在內的國內大型銀行組成聯盟，開發以韓元為基礎的數位代幣；執政的共同民主黨則提出「數位資產基本法」加以規範。

穩定幣是一種通常與國家貨幣等實體資產掛鉤、以維持價值穩定的加密貨幣。目前多數穩定幣都與美元掛鉤。韓國當局擔心，若美元穩定幣被大量使用，韓元在數位支付中的角色可能被削弱，因此希望有本土替代方案。

試點已經展開。2026年5月，KB金融讓顧客在Hollys Coffee門市以QR碼用韓元穩定幣付款，甚至把韓元代幣換成美元代幣，向越南進行跨境匯款示範。支持者說，這類代幣能讓支付與海外匯款更快、更便宜。

這項計畫也引發爭論：誰可以發行這種幣——是既有銀行還是新興金融科技公司——以及發行方須持有多少擔保。國會預料將於10月提出正式法案。結果將左右身為科技強國的韓國，能否以自己的方式打造受信任的數位貨幣體系。$a15$,
$a15$Corea del Sur corre para lanzar una stablecoin ligada a su propia moneda, el won. En 2026, un consorcio de los mayores bancos del país —entre ellos KB Kookmin, Shinhan y Woori— ha estado desarrollando un token digital respaldado por el won, mientras el gobernante Partido Democrático ha propuesto una Ley Básica de Activos Digitales para regularlo.

Una stablecoin es una criptomoneda diseñada para mantener un valor estable al estar vinculada a un activo real, normalmente una moneda nacional. La mayoría de las stablecoins actuales están ligadas al dólar estadounidense. Las autoridades coreanas temen que un uso intenso de stablecoins en dólares debilite el papel del won en los pagos digitales, por lo que quieren una alternativa propia.

Las pruebas ya están en marcha. En un piloto de mayo de 2026, KB Financial permitió a sus clientes pagar con una stablecoin en wones mediante códigos QR en un local de Hollys Coffee, e incluso realizó una remesa transfronteriza a Vietnam convirtiendo el token en wones en uno en dólares. Sus defensores dicen que estos tokens podrían hacer los pagos y las transferencias al exterior más rápidos y baratos.

El plan ha desatado un debate sobre quién debería poder emitir las monedas —los bancos tradicionales o las nuevas fintech— y cuánta garantía deben mantener los emisores. Se espera que los legisladores presenten un proyecto de ley formal en octubre. El resultado determinará si Corea del Sur, una gran economía tecnológica, puede construir un sistema de moneda digital fiable en sus propios términos.$a15$,
$a15$Südkorea drängt darauf, einen an die eigene Währung, den Won, gekoppelten Stablecoin einzuführen. 2026 hat ein Konsortium der größten Banken des Landes – darunter KB Kookmin, Shinhan und Woori – einen won-gedeckten digitalen Token entwickelt, während die regierende Demokratische Partei ein Digital-Asset-Grundgesetz zu dessen Regulierung vorgeschlagen hat.

Ein Stablecoin ist eine Kryptowährung, die durch die Bindung an einen realen Vermögenswert – meist eine Landeswährung – einen stabilen Wert halten soll. Die meisten bestehenden Stablecoins sind an den US-Dollar gekoppelt. Koreanische Behörden befürchten, dass ein starker Gebrauch von Dollar-Stablecoins die Rolle des Won im digitalen Zahlungsverkehr schwächen könnte, und wünschen sich daher eine heimische Alternative.

Tests laufen bereits. In einem Pilotprojekt vom Mai 2026 ließ KB Financial Kunden in einer Filiale von Hollys Coffee per QR-Code mit einem Won-Stablecoin zahlen und wickelte sogar eine grenzüberschreitende Überweisung nach Vietnam ab, indem der Won-Token in einen Dollar-Token umgewandelt wurde. Befürworter sagen, solche Token könnten Zahlungen und Auslandsüberweisungen schneller und billiger machen.

Der Plan hat eine Debatte darüber ausgelöst, wer die Coins ausgeben darf – etablierte Banken oder neuere Fintech-Firmen – und wie viel Sicherheiten die Emittenten halten müssen. Abgeordnete dürften im Oktober einen förmlichen Gesetzentwurf einbringen. Das Ergebnis wird darüber entscheiden, ob Südkorea, eine bedeutende Technologiewirtschaft, ein vertrauenswürdiges digitales Währungssystem nach eigenen Vorstellungen aufbauen kann.$a15$,
$a15$La Corée du Sud se hâte de lancer un stablecoin adossé à sa propre monnaie, le won. En 2026, un consortium des plus grandes banques du pays — dont KB Kookmin, Shinhan et Woori — a développé un jeton numérique adossé au won, tandis que le Parti démocrate au pouvoir a proposé une loi-cadre sur les actifs numériques pour l'encadrer.

Un stablecoin est une cryptomonnaie conçue pour conserver une valeur stable en étant liée à un actif réel, le plus souvent une monnaie nationale. La plupart des stablecoins existants sont adossés au dollar américain. Les autorités coréennes craignent qu'un usage massif des stablecoins en dollars n'affaiblisse le rôle du won dans les paiements numériques, d'où leur souhait d'une solution locale.

Les essais sont déjà en cours. Lors d'un pilote de mai 2026, KB Financial a permis à ses clients de payer avec un stablecoin en wons via des QR codes dans un café Hollys Coffee, et a même effectué un transfert transfrontalier vers le Vietnam en convertissant le jeton en wons en jeton en dollars. Ses partisans affirment que de tels jetons pourraient rendre les paiements et les transferts à l'étranger plus rapides et moins chers.

Le projet a suscité un débat sur qui devrait être autorisé à émettre ces monnaies — les banques établies ou les nouvelles fintech — et sur le montant de garanties que les émetteurs doivent détenir. Les législateurs devraient déposer un projet de loi officiel en octobre. L'issue déterminera si la Corée du Sud, grande économie technologique, peut bâtir un système de monnaie numérique de confiance selon ses propres règles.$a15$,
$a15$Hàn Quốc đang chạy đua ra mắt một stablecoin gắn với đồng tiền của mình, đồng won. Trong năm 2026, một liên minh các ngân hàng lớn nhất nước — gồm KB Kookmin, Shinhan và Woori — đã phát triển một token số được bảo chứng bằng won, trong khi Đảng Dân chủ cầm quyền đề xuất Luật Cơ bản về Tài sản Số để quản lý.

Stablecoin là một loại tiền mã hóa được thiết kế để giữ giá trị ổn định bằng cách gắn với một tài sản thực, thường là một đồng tiền quốc gia. Hầu hết stablecoin hiện nay gắn với đồng đô la Mỹ. Giới chức Hàn Quốc lo ngại rằng nếu stablecoin USD được dùng nhiều, vai trò của đồng won trong thanh toán số có thể suy yếu, nên họ muốn một lựa chọn nội địa.

Các cuộc thử nghiệm đã bắt đầu. Trong một thử nghiệm tháng 5 năm 2026, KB Financial cho khách hàng thanh toán bằng stablecoin won qua mã QR tại một cửa hàng Hollys Coffee, và thậm chí thực hiện một giao dịch chuyển tiền xuyên biên giới tới Việt Nam bằng cách đổi token won thành token USD. Những người ủng hộ nói các token như vậy có thể giúp thanh toán và chuyển tiền ra nước ngoài nhanh và rẻ hơn.

Kế hoạch này làm dấy lên tranh luận về việc ai được phép phát hành đồng tiền — ngân hàng truyền thống hay các công ty fintech mới — và nhà phát hành phải giữ bao nhiêu tài sản bảo chứng. Các nhà lập pháp dự kiến trình dự luật chính thức vào tháng 10. Kết quả sẽ định đoạt liệu Hàn Quốc, một nền kinh tế công nghệ lớn, có thể xây dựng một hệ thống tiền số đáng tin cậy theo cách của riêng mình hay không.$a15$,
$a15$เกาหลีใต้กำลังเร่งเปิดตัวสเตเบิลคอยน์ที่อิงกับสกุลเงินของตนเองอย่างเงินวอน ในปี 2026 กลุ่มธนาคารใหญ่ที่สุดของประเทศ ซึ่งรวมถึง KB Kookmin, Shinhan และ Woori ได้ร่วมกันพัฒนาโทเคนดิจิทัลที่หนุนหลังด้วยเงินวอน ขณะที่พรรคประชาธิปไตยซึ่งเป็นรัฐบาลได้เสนอกฎหมายสินทรัพย์ดิจิทัลพื้นฐานเพื่อกำกับดูแล

สเตเบิลคอยน์คือคริปโทเคอร์เรนซีที่ออกแบบให้มีมูลค่าคงที่ด้วยการผูกกับสินทรัพย์จริง ซึ่งมักเป็นสกุลเงินของประเทศ สเตเบิลคอยน์ส่วนใหญ่ในปัจจุบันผูกกับดอลลาร์สหรัฐ ทางการเกาหลีกังวลว่าหากมีการใช้สเตเบิลคอยน์ดอลลาร์มาก บทบาทของเงินวอนในการชำระเงินดิจิทัลอาจอ่อนลง จึงต้องการทางเลือกในประเทศ

การทดลองได้เริ่มขึ้นแล้ว ในการทดลองเมื่อเดือนพฤษภาคม 2026 KB Financial ให้ลูกค้าชำระเงินด้วยสเตเบิลคอยน์เงินวอนผ่าน QR โค้ดที่ร้าน Hollys Coffee และยังสาธิตการโอนเงินข้ามพรมแดนไปเวียดนาม โดยแปลงโทเคนเงินวอนเป็นโทเคนดอลลาร์ ผู้สนับสนุนบอกว่าโทเคนเช่นนี้จะทำให้การชำระเงินและการโอนเงินไปต่างประเทศเร็วขึ้นและถูกลง

แผนนี้จุดประเด็นถกเถียงว่าใครควรได้รับอนุญาตให้ออกเหรียญ ระหว่างธนาคารเดิมหรือบริษัทฟินเทคหน้าใหม่ และผู้ออกต้องถือหลักประกันมากแค่ไหน คาดว่าฝ่ายนิติบัญญัติจะเสนอร่างกฎหมายอย่างเป็นทางการในเดือนตุลาคม ผลลัพธ์จะชี้ว่าเกาหลีใต้ ซึ่งเป็นเศรษฐกิจเทคโนโลยีรายใหญ่ จะสามารถสร้างระบบเงินดิจิทัลที่น่าเชื่อถือในแบบของตัวเองได้หรือไม่$a15$,
$a15$Korea Selatan berpacu meluncurkan stablecoin yang dipatok ke mata uangnya sendiri, won. Pada 2026, konsorsium bank-bank terbesar negeri itu — termasuk KB Kookmin, Shinhan, dan Woori — mengembangkan token digital yang dijamin won, sementara Partai Demokrat yang berkuasa mengusulkan Undang-Undang Dasar Aset Digital untuk mengaturnya.

Stablecoin adalah mata uang kripto yang dirancang untuk menjaga nilai tetap stabil dengan mengaitkannya pada aset nyata, biasanya mata uang suatu negara. Sebagian besar stablecoin saat ini dipatok ke dolar AS. Pihak berwenang Korea khawatir penggunaan stablecoin dolar yang masif dapat melemahkan peran won dalam pembayaran digital, sehingga mereka menginginkan alternatif buatan dalam negeri.

Uji coba sudah berjalan. Dalam pilot Mei 2026, KB Financial memungkinkan pelanggan membayar dengan stablecoin won melalui kode QR di gerai Hollys Coffee, bahkan melakukan pengiriman uang lintas batas ke Vietnam dengan mengubah token won menjadi token dolar. Para pendukung mengatakan token semacam itu bisa membuat pembayaran dan transfer ke luar negeri lebih cepat dan murah.

Rencana ini memicu perdebatan tentang siapa yang boleh menerbitkan koin — bank mapan atau perusahaan fintech baru — dan seberapa banyak jaminan yang harus dipegang penerbit. Para legislator diperkirakan mengajukan RUU resmi pada Oktober. Hasilnya akan menentukan apakah Korea Selatan, ekonomi teknologi besar, mampu membangun sistem mata uang digital yang tepercaya menurut caranya sendiri.$a15$,
$a15$South Korea's top banks are building a won-pegged stablecoin as lawmakers draft a Digital Asset Basic Act — a home-grown alternative to dollar stablecoins.$a15$,
$a15$won stablecoin, Korea digital asset, stablecoin regulation, KB Kookmin, Korean fintech, cryptocurrency Korea$a15$,
'advanced',
3, 4, 4,
$a15$[
{"word":"결제","reading":"gyeolje","reading_ja":"キョルチェ","part_of_speech":"noun","definition_en":"payment; settlement","definition_ja":"決済；支払い","definition_zh_tw":"支付；結帳","definition_es":"pago; liquidación","definition_de":"Zahlung; Bezahlung","definition_fr":"paiement; règlement","definition_vi":"thanh toán","definition_th":"การชำระเงิน","definition_id":"pembayaran","example_ko":"QR코드로 결제를 했다.","example_en":"I made the payment with a QR code.","example_ja":"QRコードで決済をした。","example_zh_tw":"我用QR碼付款。","example_es":"Hice el pago con un código QR.","example_de":"Ich habe mit einem QR-Code bezahlt.","example_fr":"J'ai réglé avec un QR code.","example_vi":"Tôi đã thanh toán bằng mã QR.","example_th":"ฉันชำระเงินด้วย QR โค้ด","example_id":"Saya melakukan pembayaran dengan kode QR."},
{"word":"은행","reading":"eunhaeng","reading_ja":"ウネン","part_of_speech":"noun","definition_en":"bank","definition_ja":"銀行","definition_zh_tw":"銀行","definition_es":"banco","definition_de":"Bank","definition_fr":"banque","definition_vi":"ngân hàng","definition_th":"ธนาคาร","definition_id":"bank","example_ko":"여러 은행이 함께 코인을 만든다.","example_en":"Several banks are creating the coin together.","example_ja":"複数の銀行が一緒にコインを作っている。","example_zh_tw":"多家銀行共同打造這種幣。","example_es":"Varios bancos crean la moneda juntos.","example_de":"Mehrere Banken erstellen die Münze gemeinsam.","example_fr":"Plusieurs banques créent la monnaie ensemble.","example_vi":"Nhiều ngân hàng cùng tạo ra đồng tiền này.","example_th":"หลายธนาคารร่วมกันสร้างเหรียญนี้","example_id":"Beberapa bank membuat koin itu bersama-sama."},
{"word":"화폐","reading":"hwapye","reading_ja":"ファペ","part_of_speech":"noun","definition_en":"currency; money","definition_ja":"貨幣；通貨","definition_zh_tw":"貨幣","definition_es":"moneda; divisa","definition_de":"Währung; Geld","definition_fr":"monnaie","definition_vi":"tiền tệ","definition_th":"เงินตรา; สกุลเงิน","definition_id":"mata uang; uang","example_ko":"디지털 화폐가 점점 늘고 있다.","example_en":"Digital currencies are increasing.","example_ja":"デジタル貨幣が次第に増えている。","example_zh_tw":"數位貨幣正逐漸增加。","example_es":"Las monedas digitales van en aumento.","example_de":"Digitale Währungen nehmen zu.","example_fr":"Les monnaies numériques se multiplient.","example_vi":"Tiền kỹ thuật số ngày càng nhiều.","example_th":"เงินดิจิทัลกำลังเพิ่มขึ้นเรื่อย ๆ","example_id":"Mata uang digital semakin banyak."},
{"word":"규제","reading":"gyuje","reading_ja":"キュジェ","part_of_speech":"noun","definition_en":"regulation; control (by rules)","definition_ja":"規制","definition_zh_tw":"規範；監管","definition_es":"regulación; normativa","definition_de":"Regulierung; Vorschrift","definition_fr":"réglementation","definition_vi":"quy định; sự quản lý","definition_th":"การกำกับดูแล; กฎระเบียบ","definition_id":"regulasi; pengaturan","example_ko":"정부가 새로운 규제를 마련하고 있다.","example_en":"The government is preparing new regulations.","example_ja":"政府が新しい規制を準備している。","example_zh_tw":"政府正在制定新的規範。","example_es":"El gobierno prepara nuevas regulaciones.","example_de":"Die Regierung bereitet neue Vorschriften vor.","example_fr":"Le gouvernement prépare une nouvelle réglementation.","example_vi":"Chính phủ đang chuẩn bị các quy định mới.","example_th":"รัฐบาลกำลังเตรียมกฎระเบียบใหม่","example_id":"Pemerintah menyiapkan regulasi baru."},
{"word":"송금","reading":"songgeum","reading_ja":"ソングム","part_of_speech":"noun","definition_en":"money transfer; remittance","definition_ja":"送金","definition_zh_tw":"匯款；轉帳","definition_es":"transferencia; remesa","definition_de":"Geldüberweisung","definition_fr":"transfert d'argent; virement","definition_vi":"chuyển tiền","definition_th":"การโอนเงิน","definition_id":"pengiriman uang; transfer","example_ko":"해외 송금이 더 빨라졌다.","example_en":"Overseas remittances have become faster.","example_ja":"海外送金がより速くなった。","example_zh_tw":"海外匯款變得更快了。","example_es":"Las remesas al extranjero se han vuelto más rápidas.","example_de":"Auslandsüberweisungen sind schneller geworden.","example_fr":"Les transferts à l'étranger sont devenus plus rapides.","example_vi":"Việc chuyển tiền ra nước ngoài đã nhanh hơn.","example_th":"การโอนเงินไปต่างประเทศเร็วขึ้น","example_id":"Pengiriman uang ke luar negeri menjadi lebih cepat."}
]$a15$::jsonb,
'published', true, 0,
'2026-06-23T23:00:00Z', '2026-06-23T23:00:00Z', '2026-06-23T23:00:00Z'
);

-- Article 16 — 2026-06-25 food beginner — banana milk viral among tourists
INSERT INTO articles (topic_id, slug, title_en, title_ko, title_ja, title_zh_tw, title_es, title_de, title_fr, title_vi, title_th, title_id, summary_en, summary_ko, summary_ja, summary_zh_tw, summary_es, summary_de, summary_fr, summary_vi, summary_th, summary_id, content_en, content_ko, content_ja, content_zh_tw, content_es, content_de, content_fr, content_vi, content_th, content_id, seo_description, seo_keywords, level, reading_time_en, reading_time_ko, reading_time_ja, vocabulary, status, ai_generated, view_count, published_at, created_at, updated_at) VALUES (
(SELECT id FROM topics WHERE slug = 'food'),
'food-2026-06-25',
$a16$Korea's Banana Milk Goes Viral Again, Led by Tourists in 2026$a16$,
$a16$한국 바나나우유, 2026년 관광객 타고 다시 유행$a16$,
$a16$韓国のバナナ牛乳、2026年に観光客で再ブーム$a16$,
$a16$韓國香蕉牛奶2026年靠遊客再度爆紅$a16$,
$a16$La leche de plátano coreana se vuelve viral otra vez en 2026$a16$,
$a16$Koreas Bananenmilch geht 2026 erneut viral – dank Touristen$a16$,
$a16$Le lait à la banane coréen redevient viral en 2026$a16$,
$a16$Sữa chuối Hàn Quốc lại gây sốt năm 2026 nhờ du khách$a16$,
$a16$นมกล้วยเกาหลีฮิตอีกครั้งปี 2026 ด้วยแรงนักท่องเที่ยว$a16$,
$a16$Susu Pisang Korea Kembali Viral pada 2026 Berkat Turis$a16$,
$a16$Korea's famous banana milk is trending again in 2026, driven by foreign tourists and a do-it-yourself 'banana milk latte.' The sweet yellow drink now sells beyond convenience stores, appearing in clothing shops, beauty stores, and hotels.$a16$,
$a16$한국의 유명한 바나나우유가 2026년 다시 유행하고 있다. 외국인 관광객과 직접 만드는 '바나나우유 라테' 덕분이다. 달콤한 노란 음료는 이제 편의점을 넘어 옷 가게, 뷰티 매장, 호텔에서도 팔린다.$a16$,
$a16$韓国の有名なバナナ牛乳が2026年に再び流行している。外国人観光客と、自分で作る「バナナ牛乳ラテ」が火付け役だ。甘い黄色い飲み物は今やコンビニだけでなく、服屋やコスメ店、ホテルでも売られている。$a16$,
$a16$韓國知名的香蕉牛奶在2026年再度爆紅，靠的是外國遊客與自製「香蕉牛奶拿鐵」。這款香甜的黃色飲料如今不只在便利商店，連服飾店、美妝店與飯店都有賣。$a16$,
$a16$La famosa leche de plátano coreana vuelve a estar de moda en 2026, impulsada por los turistas extranjeros y un 'latte de leche de plátano' casero. La dulce bebida amarilla ya se vende más allá de las tiendas de conveniencia: en tiendas de ropa, de belleza y hoteles.$a16$,
$a16$Koreas berühmte Bananenmilch liegt 2026 wieder im Trend – getrieben von ausländischen Touristen und einem selbstgemachten 'Bananenmilch-Latte'. Das süße gelbe Getränk gibt es nun nicht nur im Supermarkt, sondern auch in Kleidungs- und Beautyläden sowie Hotels.$a16$,
$a16$Le célèbre lait à la banane coréen fait de nouveau fureur en 2026, porté par les touristes étrangers et un 'latte au lait de banane' à faire soi-même. La boisson jaune sucrée se vend désormais au-delà des supérettes : boutiques de vêtements, magasins de beauté et hôtels.$a16$,
$a16$Sữa chuối nổi tiếng của Hàn Quốc lại gây sốt năm 2026, nhờ du khách nước ngoài và món 'latte sữa chuối' tự pha. Thức uống màu vàng ngọt ngào nay được bán vượt ra ngoài cửa hàng tiện lợi, xuất hiện ở cửa hàng quần áo, mỹ phẩm và khách sạn.$a16$,
$a16$นมกล้วยชื่อดังของเกาหลีกลับมาฮิตอีกครั้งในปี 2026 ด้วยแรงหนุนจากนักท่องเที่ยวต่างชาติและเมนู 'นมกล้วยลาเต้' ที่ผสมเอง เครื่องดื่มสีเหลืองหวาน ๆ นี้ตอนนี้ขายไกลเกินร้านสะดวกซื้อ ทั้งในร้านเสื้อผ้า ร้านความงาม และโรงแรม$a16$,
$a16$Susu pisang terkenal Korea kembali tren pada 2026, didorong turis asing dan 'latte susu pisang' racikan sendiri. Minuman kuning manis itu kini dijual di luar minimarket, hadir di toko pakaian, toko kecantikan, dan hotel.$a16$,
$a16$Korea's famous banana milk is having another moment in 2026, this time driven by foreign tourists. The sweet yellow drink, sold in a round jar-shaped bottle, has become so popular that it now appears not just in convenience stores but in clothing shops, beauty stores, and even hotel fridges.

Much of the buzz comes from a do-it-yourself trend called the 'banana milk latte.' Fans buy a cup of ice, a pouch of coffee, and a bottle of banana milk, then mix the three together themselves. Videos of people making it have spread widely on social media.

Banana milk has been a beloved Korean drink since the 1970s and often appears in K-dramas. For many visitors, trying it at a convenience store is now part of the Korea experience, and its comeback shows how quickly a simple snack can go viral through social media.$a16$,
$a16$한국의 유명한 바나나우유가 2026년 다시 전성기를 맞고 있다. 이번에는 외국인 관광객이 그 중심이다. 둥근 항아리 모양 병에 담긴 이 달콤한 노란 음료는 큰 인기를 얻어, 이제 편의점뿐 아니라 옷 가게, 뷰티 매장, 심지어 호텔 냉장고에서도 볼 수 있다.

화제의 상당 부분은 직접 만드는 '바나나우유 라테'라는 유행에서 나온다. 팬들은 얼음 컵, 파우치 커피, 바나나우유 한 병을 사서 세 가지를 직접 섞는다. 이걸 만드는 영상이 소셜미디어에서 널리 퍼졌다.

바나나우유는 1970년대부터 한국에서 사랑받아 온 음료이고 K-드라마에도 자주 나온다. 많은 방문객에게는 편의점에서 이걸 맛보는 것이 이제 한국 여행의 한 부분이 되었다. 이 음료의 재유행은 단순한 간식 하나가 소셜미디어를 통해 얼마나 빨리 화제가 될 수 있는지를 보여 준다.$a16$,
$a16$韓国の有名なバナナ牛乳が2026年に再びブームを迎えている。今回はその中心に外国人観光客がいる。丸い壺のような瓶に入ったこの甘い黄色い飲み物は大人気となり、今やコンビニだけでなく、服屋やコスメ店、さらにはホテルの冷蔵庫でも見かける。

話題の多くは、自分で作る「バナナ牛乳ラテ」という流行から来ている。ファンは氷のカップ、パウチのコーヒー、バナナ牛乳を1本買って、この3つを自分で混ぜる。作る様子の動画がSNSで広く拡散した。

バナナ牛乳は1970年代から韓国で愛されてきた飲み物で、K-ドラマにもよく登場する。多くの旅行者にとって、コンビニでこれを味わうことは今や韓国旅行の一部になった。この再流行は、ひとつの素朴なおやつがSNSを通じてどれほど速く話題になれるかを示している。$a16$,
$a16$韓國知名的香蕉牛奶在2026年再度迎來高峰，這次的主角是外國遊客。這款裝在圓罐狀瓶子裡、香甜的黃色飲料人氣爆棚，如今不只在便利商店，連服飾店、美妝店，甚至飯店冰箱裡都能看到。

話題有很大一部分來自自製的「香蕉牛奶拿鐵」風潮。粉絲會買一杯冰塊、一包袋裝咖啡和一瓶香蕉牛奶，再自己把三樣混在一起。製作過程的影片在社群媒體上廣為流傳。

香蕉牛奶自1970年代起就是韓國人喜愛的飲料，也經常出現在韓劇裡。對許多遊客來說，在便利商店嘗一口，如今已成為韓國之旅的一部分。這股再度流行，顯示一款簡單的小食能透過社群媒體多快就爆紅。$a16$,
$a16$La famosa leche de plátano coreana vive otro gran momento en 2026, y esta vez los turistas extranjeros están en el centro. La dulce bebida amarilla, en su característica botella con forma de tarro redondo, se ha vuelto tan popular que ya no solo está en las tiendas de conveniencia, sino también en tiendas de ropa, de belleza e incluso en los frigoríficos de los hoteles.

Buena parte del revuelo viene de una moda casera llamada 'latte de leche de plátano'. Los aficionados compran un vaso de hielo, un sobre de café y una botella de leche de plátano, y luego mezclan los tres ellos mismos. Los vídeos de gente preparándolo se han difundido mucho en redes sociales.

La leche de plátano es una bebida querida en Corea desde los años setenta y aparece a menudo en los K-dramas. Para muchos visitantes, probarla en una tienda de conveniencia ya es parte de la experiencia coreana, y su regreso muestra lo rápido que un simple aperitivo puede volverse viral en redes sociales.$a16$,
$a16$Koreas berühmte Bananenmilch erlebt 2026 einen weiteren Höhenflug, diesmal mit ausländischen Touristen im Mittelpunkt. Das süße gelbe Getränk in der runden, krugförmigen Flasche ist so beliebt, dass es nicht nur in Supermärkten, sondern auch in Kleidungs- und Beautyläden und sogar in Hotelkühlschränken zu finden ist.

Ein großer Teil des Trubels rührt von einem Selbermach-Trend her, dem 'Bananenmilch-Latte'. Fans kaufen einen Becher Eis, einen Beutel Kaffee und eine Flasche Bananenmilch und mischen die drei dann selbst. Videos, in denen Leute das zubereiten, haben sich in den sozialen Medien stark verbreitet.

Bananenmilch ist seit den 1970er-Jahren ein beliebtes koreanisches Getränk und taucht oft in K-Dramen auf. Für viele Besucher gehört es inzwischen zum Korea-Erlebnis, sie im Supermarkt zu probieren, und ihr Comeback zeigt, wie schnell ein einfacher Snack über soziale Medien viral gehen kann.$a16$,
$a16$Le célèbre lait à la banane coréen connaît un nouvel âge d'or en 2026, avec cette fois les touristes étrangers au centre du phénomène. La douce boisson jaune, dans sa bouteille ronde en forme de jarre, est devenue si populaire qu'on la trouve désormais non seulement dans les supérettes, mais aussi dans les boutiques de vêtements, les magasins de beauté et même les frigos des hôtels.

L'essentiel de l'engouement vient d'une tendance à faire soi-même appelée 'latte au lait de banane'. Les amateurs achètent un gobelet de glace, une dosette de café et une bouteille de lait à la banane, puis mélangent le tout eux-mêmes. Les vidéos de préparation se sont largement répandues sur les réseaux sociaux.

Le lait à la banane est une boisson appréciée en Corée depuis les années 1970 et apparaît souvent dans les K-dramas. Pour beaucoup de visiteurs, le goûter dans une supérette fait désormais partie de l'expérience coréenne, et son retour montre à quelle vitesse un simple en-cas peut devenir viral sur les réseaux sociaux.$a16$,
$a16$Sữa chuối nổi tiếng của Hàn Quốc lại có một thời khắc rực rỡ nữa trong năm 2026, lần này với du khách nước ngoài ở trung tâm. Thức uống màu vàng ngọt ngào, đựng trong chai hình hũ tròn đặc trưng, trở nên phổ biến đến mức nay không chỉ có ở cửa hàng tiện lợi mà còn xuất hiện tại cửa hàng quần áo, cửa hàng mỹ phẩm và thậm chí trong tủ lạnh khách sạn.

Phần lớn cơn sốt đến từ trào lưu tự pha có tên 'latte sữa chuối'. Người hâm mộ mua một ly đá, một gói cà phê và một chai sữa chuối, rồi tự trộn ba thứ lại với nhau. Video mọi người pha chế đã lan rộng trên mạng xã hội.

Sữa chuối là thức uống được người Hàn yêu thích từ những năm 1970 và thường xuất hiện trong phim Hàn. Với nhiều du khách, thử nó ở cửa hàng tiện lợi giờ đã là một phần của trải nghiệm Hàn Quốc, và sự trở lại của nó cho thấy một món ăn vặt đơn giản có thể lan truyền nhanh đến mức nào qua mạng xã hội.$a16$,
$a16$นมกล้วยชื่อดังของเกาหลีกำลังมีช่วงเวลาที่รุ่งเรืองอีกครั้งในปี 2026 คราวนี้มีนักท่องเที่ยวต่างชาติเป็นศูนย์กลาง เครื่องดื่มสีเหลืองหวาน ๆ ในขวดทรงไหกลม ๆ นี้ได้รับความนิยมมากจนตอนนี้ไม่ได้มีขายแค่ในร้านสะดวกซื้อ แต่ยังอยู่ในร้านเสื้อผ้า ร้านเครื่องสำอาง และแม้แต่ตู้เย็นในโรงแรม

กระแสส่วนใหญ่มาจากเทรนด์ที่ทำเองอย่าง 'นมกล้วยลาเต้' แฟน ๆ จะซื้อแก้วน้ำแข็ง กาแฟแบบซอง และนมกล้วยหนึ่งขวด แล้วผสมทั้งสามอย่างเข้าด้วยกันเอง คลิปที่คนทำเมนูนี้แพร่กระจายไปทั่วโซเชียลมีเดีย

นมกล้วยเป็นเครื่องดื่มที่คนเกาหลีรักมาตั้งแต่ทศวรรษ 1970 และมักปรากฏในซีรีส์เกาหลี สำหรับนักท่องเที่ยวหลายคน การได้ลองชิมที่ร้านสะดวกซื้อกลายเป็นส่วนหนึ่งของประสบการณ์เที่ยวเกาหลีไปแล้ว การกลับมาฮิตครั้งนี้แสดงให้เห็นว่าของกินง่าย ๆ ชิ้นหนึ่งสามารถแพร่ไวรัลผ่านโซเชียลมีเดียได้เร็วเพียงใด$a16$,
$a16$Susu pisang terkenal Korea kembali bersinar pada 2026, kali ini dengan turis asing sebagai pusatnya. Minuman kuning manis dalam botol bulat berbentuk kendi ini begitu populer sehingga kini tak hanya ada di minimarket, tetapi juga di toko pakaian, toko kecantikan, bahkan kulkas hotel.

Sebagian besar keramaian berasal dari tren racik sendiri bernama 'latte susu pisang'. Penggemar membeli segelas es, satu sachet kopi, dan sebotol susu pisang, lalu mencampur ketiganya sendiri. Video orang membuatnya menyebar luas di media sosial.

Susu pisang telah menjadi minuman kesayangan warga Korea sejak tahun 1970-an dan sering muncul dalam drama Korea. Bagi banyak pengunjung, mencicipinya di minimarket kini menjadi bagian dari pengalaman Korea, dan kebangkitannya menunjukkan betapa cepatnya camilan sederhana bisa viral lewat media sosial.$a16$,
$a16$Korea's banana milk is viral again in 2026, driven by tourists and a DIY 'banana milk latte' — now sold in clothing shops, beauty stores, and hotels.$a16$,
$a16$banana milk, Korean convenience store, banana milk latte, viral food Korea, K-food trend, Korea tourism$a16$,
'beginner',
3, 4, 4,
$a16$[
{"word":"우유","reading":"uyu","reading_ja":"ウユ","part_of_speech":"noun","definition_en":"milk","definition_ja":"牛乳","definition_zh_tw":"牛奶","definition_es":"leche","definition_de":"Milch","definition_fr":"lait","definition_vi":"sữa","definition_th":"นม","definition_id":"susu","example_ko":"바나나우유는 정말 달콤해요.","example_en":"Banana milk is really sweet.","example_ja":"バナナ牛乳は本当に甘いです。","example_zh_tw":"香蕉牛奶真的很甜。","example_es":"La leche de plátano es muy dulce.","example_de":"Bananenmilch ist wirklich süß.","example_fr":"Le lait à la banane est vraiment sucré.","example_vi":"Sữa chuối rất ngọt.","example_th":"นมกล้วยหวานมากจริง ๆ","example_id":"Susu pisang sangat manis."},
{"word":"편의점","reading":"pyeonuijeom","reading_ja":"ピョニジョム","part_of_speech":"noun","definition_en":"convenience store","definition_ja":"コンビニ","definition_zh_tw":"便利商店","definition_es":"tienda de conveniencia","definition_de":"Convenience-Store; Kiosk","definition_fr":"supérette; supermarché de proximité","definition_vi":"cửa hàng tiện lợi","definition_th":"ร้านสะดวกซื้อ","definition_id":"minimarket; toko 24 jam","example_ko":"편의점에서 음료수를 샀어요.","example_en":"I bought a drink at the convenience store.","example_ja":"コンビニで飲み物を買いました。","example_zh_tw":"我在便利商店買了飲料。","example_es":"Compré una bebida en la tienda de conveniencia.","example_de":"Ich habe im Convenience-Store ein Getränk gekauft.","example_fr":"J'ai acheté une boisson à la supérette.","example_vi":"Tôi đã mua nước ở cửa hàng tiện lợi.","example_th":"ฉันซื้อเครื่องดื่มที่ร้านสะดวกซื้อ","example_id":"Saya membeli minuman di minimarket."},
{"word":"맛","reading":"mat","reading_ja":"マッ","part_of_speech":"noun","definition_en":"taste; flavor","definition_ja":"味","definition_zh_tw":"味道","definition_es":"sabor","definition_de":"Geschmack","definition_fr":"goût; saveur","definition_vi":"hương vị; mùi vị","definition_th":"รสชาติ","definition_id":"rasa","example_ko":"이 음료는 맛이 좋아요.","example_en":"This drink tastes good.","example_ja":"この飲み物は味がいいです。","example_zh_tw":"這款飲料味道很好。","example_es":"Esta bebida tiene buen sabor.","example_de":"Dieses Getränk schmeckt gut.","example_fr":"Cette boisson a bon goût.","example_vi":"Thức uống này có vị ngon.","example_th":"เครื่องดื่มนี้รสชาติดี","example_id":"Minuman ini rasanya enak."},
{"word":"유행","reading":"yuhaeng","reading_ja":"ユヘン","part_of_speech":"noun","definition_en":"trend; fad; something in fashion","definition_ja":"流行","definition_zh_tw":"流行；風潮","definition_es":"moda; tendencia","definition_de":"Trend; Mode","definition_fr":"mode; tendance","definition_vi":"trào lưu; xu hướng","definition_th":"กระแส; ความนิยม","definition_id":"tren; mode","example_ko":"요즘 이 음료가 유행이에요.","example_en":"This drink is trendy these days.","example_ja":"最近この飲み物が流行しています。","example_zh_tw":"最近這款飲料很流行。","example_es":"Esta bebida está de moda últimamente.","example_de":"Dieses Getränk ist zurzeit im Trend.","example_fr":"Cette boisson est à la mode en ce moment.","example_vi":"Dạo này thức uống này đang là trào lưu.","example_th":"ช่วงนี้เครื่องดื่มนี้กำลังเป็นกระแส","example_id":"Minuman ini sedang tren belakangan ini."},
{"word":"섞다","reading":"seokda","reading_ja":"ソクタ","part_of_speech":"verb","definition_en":"to mix; to blend","definition_ja":"混ぜる","definition_zh_tw":"混合；攪拌","definition_es":"mezclar","definition_de":"mischen; vermengen","definition_fr":"mélanger","definition_vi":"trộn; pha","definition_th":"ผสม; คน","definition_id":"mencampur","example_ko":"커피와 우유를 섞으세요.","example_en":"Mix the coffee and the milk.","example_ja":"コーヒーと牛乳を混ぜてください。","example_zh_tw":"請把咖啡和牛奶混合。","example_es":"Mezcla el café y la leche.","example_de":"Mischen Sie den Kaffee und die Milch.","example_fr":"Mélangez le café et le lait.","example_vi":"Hãy trộn cà phê với sữa.","example_th":"ผสมกาแฟกับนมเข้าด้วยกัน","example_id":"Campurkan kopi dan susu."}
]$a16$::jsonb,
'published', true, 0,
'2026-06-24T23:00:00Z', '2026-06-24T23:00:00Z', '2026-06-24T23:00:00Z'
);

-- Article 17 — 2026-06-26 sports intermediate — South Korea World Cup group-stage elimination
INSERT INTO articles (topic_id, slug, title_en, title_ko, title_ja, title_zh_tw, title_es, title_de, title_fr, title_vi, title_th, title_id, summary_en, summary_ko, summary_ja, summary_zh_tw, summary_es, summary_de, summary_fr, summary_vi, summary_th, summary_id, content_en, content_ko, content_ja, content_zh_tw, content_es, content_de, content_fr, content_vi, content_th, content_id, seo_description, seo_keywords, level, reading_time_en, reading_time_ko, reading_time_ja, vocabulary, status, ai_generated, view_count, published_at, created_at, updated_at) VALUES (
(SELECT id FROM topics WHERE slug = 'sports'),
'sports-2026-06-26',
$a17$South Korea Crashes Out of 2026 World Cup in the Group Stage$a17$,
$a17$한국, 2026 월드컵 조별리그 탈락$a17$,
$a17$韓国、2026W杯グループステージで敗退$a17$,
$a17$韓國2026世界盃小組賽出局$a17$,
$a17$Corea del Sur cae en la fase de grupos del Mundial 2026$a17$,
$a17$Südkorea scheidet bei der WM 2026 in der Gruppenphase aus$a17$,
$a17$La Corée du Sud éliminée au premier tour du Mondial 2026$a17$,
$a17$Hàn Quốc bị loại từ vòng bảng World Cup 2026$a17$,
$a17$เกาหลีใต้ตกรอบแบ่งกลุ่มบอลโลก 2026$a17$,
$a17$Korea Selatan Tersingkir di Fase Grup Piala Dunia 2026$a17$,
$a17$South Korea was knocked out of the 2026 World Cup group stage after a 1-0 loss to South Africa on June 24. Captain Son Heung-min was controversially benched for the decider, and the team finished third in Group A, missing the Round of 32.$a17$,
$a17$한국이 2026년 6월 24일 남아프리카공화국에 0-1로 지며 2026 월드컵 조별리그에서 탈락했다. 주장 손흥민이 중요한 경기에 선발 제외되어 논란이 일었고, 팀은 A조 3위로 32강 진출에 실패했다.$a17$,
$a17$韓国が2026年6月24日、南アフリカに0-1で敗れ、2026年ワールドカップのグループステージで敗退した。キャプテンのソン・フンミンが大事な試合で先発から外れて物議を醸し、チームはA組3位でベスト32進出を逃した。$a17$,
$a17$韓國於2026年6月24日以0比1不敵南非，在2026世界盃小組賽出局。隊長孫興慜在關鍵戰未獲先發引發爭議，球隊以A組第三名作收，無緣32強。$a17$,
$a17$Corea del Sur quedó eliminada en la fase de grupos del Mundial 2026 tras perder 1-0 ante Sudáfrica el 24 de junio. El capitán Son Heung-min fue suplente en el partido decisivo, entre polémica, y el equipo terminó tercero del Grupo A, sin pasar a los dieciseisavos.$a17$,
$a17$Südkorea schied bei der WM 2026 in der Gruppenphase aus, nach einer 0:1-Niederlage gegen Südafrika am 24. Juni. Kapitän Son Heung-min saß im entscheidenden Spiel überraschend auf der Bank, und das Team wurde Dritter der Gruppe A und verpasste das Achtelfinale der 32.$a17$,
$a17$La Corée du Sud a été éliminée au premier tour du Mondial 2026 après une défaite 1-0 face à l'Afrique du Sud le 24 juin. Le capitaine Son Heung-min a été laissé sur le banc pour le match décisif, non sans polémique, et l'équipe a fini troisième du groupe A, ratant les seizièmes de finale.$a17$,
$a17$Hàn Quốc bị loại ở vòng bảng World Cup 2026 sau trận thua 0-1 trước Nam Phi ngày 24/6. Đội trưởng Son Heung-min gây tranh cãi khi bị gạt khỏi đội hình xuất phát ở trận quyết định, và đội xếp thứ ba bảng A, lỡ hẹn vòng 32 đội.$a17$,
$a17$เกาหลีใต้ตกรอบแบ่งกลุ่มบอลโลก 2026 หลังพ่ายแอฟริกาใต้ 0-1 เมื่อวันที่ 24 มิถุนายน กัปตันซน ฮึงมินถูกดรอปจากตัวจริงในนัดตัดสินจนเกิดเสียงวิจารณ์ และทีมจบอันดับสามของกลุ่มเอ พลาดเข้ารอบ 32 ทีม$a17$,
$a17$Korea Selatan tersingkir di fase grup Piala Dunia 2026 setelah kalah 0-1 dari Afrika Selatan pada 24 Juni. Kapten Son Heung-min mengejutkan karena dicadangkan pada laga penentuan, dan tim finis ketiga di Grup A, gagal ke babak 32 besar.$a17$,
$a17$South Korea's 2026 World Cup ended in the group stage after a 1-0 loss to South Africa on June 24. The defeat left the team third in Group A with one win and two losses, missing out on the newly expanded Round of 32.

The result was a disappointment for a country that reached the knockout rounds at the previous World Cup. Captain Son Heung-min, one of Asia's most famous players, was a surprise omission from the starting lineup for the decisive match and came on only in the second half — a decision that drew heavy criticism at home.

Son, who has starred in Europe for years, finished the tournament without a goal. It was the fourth World Cup of his career, and again it ended at the group stage. Fans and pundits debated whether the loss reflected a coaching mistake or deeper problems in Korean football.

For millions of Korean fans who stayed up late to watch, the early exit stung. The 2026 tournament, co-hosted by the United States, Canada, and Mexico, was the first with 48 teams, and expectations had been high. Attention now turns to rebuilding the national team for the next cycle.$a17$,
$a17$한국의 2026 월드컵이 조별리그에서 끝났다. 2026년 6월 24일 남아프리카공화국에 0-1로 지면서다. 이 패배로 팀은 1승 2패, A조 3위에 그쳐, 이번에 새로 늘어난 32강에 오르지 못했다.

이 결과는 직전 월드컵에서 16강에 올랐던 나라로서는 실망스러운 성적이다. 아시아에서 가장 유명한 선수 중 한 명인 주장 손흥민이 결정적인 경기에서 선발 명단에서 뜻밖에 빠졌고, 후반에야 교체 투입돼 국내에서 큰 비판을 받았다.

오랫동안 유럽에서 활약해 온 손흥민은 이번 대회를 골 없이 마쳤다. 그의 네 번째 월드컵이었지만, 이번에도 조별리그에서 끝났다. 팬과 전문가들은 이 패배가 감독의 실수 때문인지, 아니면 한국 축구의 더 깊은 문제 때문인지를 두고 논쟁을 벌였다.

밤늦게까지 경기를 지켜본 수많은 한국 팬에게 이른 탈락은 쓰라렸다. 미국·캐나다·멕시코가 공동 개최한 2026 대회는 48개 팀이 참가한 첫 월드컵이었고, 기대도 컸다. 이제 관심은 다음 주기를 위해 대표팀을 다시 세우는 일로 향한다.$a17$,
$a17$韓国の2026年ワールドカップがグループステージで終わった。2026年6月24日、南アフリカに0-1で敗れたためだ。この敗戦でチームは1勝2敗、A組3位にとどまり、今大会から拡大したベスト32に進めなかった。

前回大会でベスト16に進んだ国としては、期待外れの結果だ。アジアで最も有名な選手の一人であるキャプテンのソン・フンミンが、決定的な試合で先発から意外にも外れ、後半になってようやく交代出場したことで、国内で大きな批判を浴びた。

長年ヨーロッパで活躍してきたソンは、今大会を無得点で終えた。彼にとって4度目のワールドカップだったが、今回もグループステージで幕を閉じた。ファンや専門家は、この敗戦が監督の判断ミスによるものか、それとも韓国サッカーのより根深い問題によるものかをめぐって議論した。

夜遅くまで試合を見守った多くの韓国のファンにとって、早期敗退は痛かった。アメリカ・カナダ・メキシコが共催した2026年大会は48チームが参加する初のワールドカップで、期待も高かった。関心は今、次のサイクルに向けて代表チームを立て直すことへと移っている。$a17$,
$a17$韓國的2026世界盃止步小組賽。2026年6月24日，他們以0比1不敵南非。這場敗仗讓球隊以1勝2負、A組第三名作收，無法晉級本屆新增的32強。

對一支上屆曾闖進16強的球隊而言，這樣的成績令人失望。亞洲最知名的球員之一、隊長孫興慜在關鍵戰意外未獲先發，直到下半場才替補上場，在國內引發強烈批評。

長年在歐洲效力的孫興慜，本屆賽事零進球作收。這是他的第四次世界盃，卻再次止步小組賽。球迷與專家爭論這場失利究竟是總教練的失誤，還是韓國足球更深層的問題。

對許多熬夜看球的韓國球迷來說，提早出局格外難受。由美國、加拿大與墨西哥共同主辦的2026年賽事，是首屆有48支球隊參賽的世界盃，外界期待原本很高。如今焦點轉向為下一個週期重建國家隊。$a17$,
$a17$El Mundial 2026 de Corea del Sur terminó en la fase de grupos, tras perder 1-0 ante Sudáfrica el 24 de junio. La derrota dejó al equipo tercero del Grupo A con una victoria y dos derrotas, sin acceder a los dieciseisavos de final, novedad de esta edición ampliada.

El resultado fue una decepción para un país que había alcanzado los octavos en el Mundial anterior. El capitán Son Heung-min, uno de los jugadores más famosos de Asia, fue una sorpresa al quedarse fuera del once inicial en el partido decisivo y solo entró en la segunda parte, una decisión muy criticada en casa.

Son, que ha brillado en Europa durante años, terminó el torneo sin marcar. Era su cuarto Mundial y de nuevo se despidió en la fase de grupos. Aficionados y expertos debatieron si la derrota reflejaba un error del entrenador o problemas más profundos del fútbol coreano.

Para los millones de aficionados coreanos que trasnocharon para verlo, la eliminación temprana dolió. El torneo de 2026, coorganizado por Estados Unidos, Canadá y México, fue el primero con 48 selecciones, y las expectativas eran altas. Ahora la atención se centra en reconstruir la selección para el próximo ciclo.$a17$,
$a17$Südkoreas WM 2026 endete in der Gruppenphase, nach einer 0:1-Niederlage gegen Südafrika am 24. Juni. Die Niederlage ließ das Team als Dritter der Gruppe A mit einem Sieg und zwei Niederlagen zurück, ohne Einzug in das Achtelfinale der 32, eine Neuerung dieser erweiterten Ausgabe.

Für ein Land, das bei der vorigen WM das Achtelfinale erreicht hatte, war das Ergebnis eine Enttäuschung. Kapitän Son Heung-min, einer der bekanntesten Spieler Asiens, fehlte im entscheidenden Spiel überraschend in der Startelf und kam erst in der zweiten Halbzeit – eine Entscheidung, die zu Hause heftig kritisiert wurde.

Son, der jahrelang in Europa glänzte, beendete das Turnier ohne Tor. Es war seine vierte WM, und wieder war in der Gruppenphase Schluss. Fans und Experten stritten, ob die Niederlage einen Trainerfehler oder tiefere Probleme im koreanischen Fußball widerspiegelte.

Für die Millionen koreanischer Fans, die bis spät in die Nacht mitfieberten, schmerzte das frühe Aus. Das von den USA, Kanada und Mexiko gemeinsam ausgerichtete Turnier 2026 war das erste mit 48 Mannschaften, und die Erwartungen waren hoch. Nun richtet sich der Blick auf den Neuaufbau der Nationalmannschaft für den nächsten Zyklus.$a17$,
$a17$Le Mondial 2026 de la Corée du Sud s'est arrêté au premier tour, après une défaite 1-0 contre l'Afrique du Sud le 24 juin. Ce revers a laissé l'équipe troisième du groupe A avec une victoire et deux défaites, sans accéder aux seizièmes de finale, nouveauté de cette édition élargie.

Le résultat a déçu un pays qui avait atteint les huitièmes lors du Mondial précédent. Le capitaine Son Heung-min, l'un des joueurs les plus célèbres d'Asie, a créé la surprise en étant écarté du onze de départ pour le match décisif et n'est entré qu'en seconde période, une décision très critiquée dans le pays.

Son, qui brille en Europe depuis des années, a terminé le tournoi sans marquer. C'était sa quatrième Coupe du monde, et de nouveau elle s'est achevée au premier tour. Supporters et spécialistes ont débattu pour savoir si la défaite traduisait une erreur de l'entraîneur ou des problèmes plus profonds du football coréen.

Pour les millions de supporters coréens qui ont veillé tard pour suivre le match, l'élimination précoce a fait mal. Le tournoi de 2026, coorganisé par les États-Unis, le Canada et le Mexique, était le premier à 48 équipes, et les attentes étaient élevées. L'attention se tourne désormais vers la reconstruction de la sélection pour le prochain cycle.$a17$,
$a17$World Cup 2026 của Hàn Quốc khép lại ở vòng bảng, sau trận thua 0-1 trước Nam Phi ngày 24 tháng 6. Thất bại khiến đội đứng thứ ba bảng A với một thắng hai thua, không lọt vào vòng 32 đội mới được mở rộng của kỳ giải này.

Kết quả là nỗi thất vọng với một quốc gia từng vào vòng loại trực tiếp ở World Cup trước. Đội trưởng Son Heung-min, một trong những cầu thủ nổi tiếng nhất châu Á, bất ngờ bị gạt khỏi đội hình xuất phát ở trận quyết định và chỉ vào sân trong hiệp hai — một quyết định bị chỉ trích mạnh mẽ trong nước.

Son, người tỏa sáng ở châu Âu nhiều năm, kết thúc giải mà không ghi bàn. Đây là kỳ World Cup thứ tư của anh, và một lần nữa dừng bước ở vòng bảng. Người hâm mộ và giới chuyên môn tranh luận liệu thất bại phản ánh sai lầm của huấn luyện viên hay những vấn đề sâu xa hơn của bóng đá Hàn Quốc.

Với hàng triệu cổ động viên Hàn Quốc thức khuya theo dõi, việc bị loại sớm thật cay đắng. Giải đấu 2026, do Hoa Kỳ, Canada và Mexico đồng đăng cai, là kỳ World Cup đầu tiên có 48 đội, và kỳ vọng vốn rất cao. Giờ đây, sự chú ý chuyển sang việc tái thiết đội tuyển cho chu kỳ tiếp theo.$a17$,
$a17$ฟุตบอลโลก 2026 ของเกาหลีใต้จบลงตั้งแต่รอบแบ่งกลุ่ม หลังพ่ายแอฟริกาใต้ 0-1 เมื่อวันที่ 24 มิถุนายน ความพ่ายแพ้ทำให้ทีมจบอันดับสามของกลุ่มเอ ด้วยผลงานหนึ่งชนะสองแพ้ พลาดเข้ารอบ 32 ทีมที่เพิ่งขยายเพิ่มในครั้งนี้

ผลงานนี้น่าผิดหวังสำหรับประเทศที่เคยเข้าถึงรอบน็อกเอาต์ในบอลโลกครั้งก่อน กัปตันซน ฮึงมิน หนึ่งในนักเตะที่โด่งดังที่สุดของเอเชีย ถูกดรอปจากตัวจริงในนัดชี้ชะตาอย่างน่าประหลาดใจ และได้ลงเล่นในครึ่งหลังเท่านั้น การตัดสินใจนี้ถูกวิจารณ์อย่างหนักในประเทศ

ซนซึ่งโดดเด่นในยุโรปมาหลายปี จบทัวร์นาเมนต์โดยไม่มีประตู นี่เป็นบอลโลกครั้งที่สี่ในอาชีพของเขา และอีกครั้งที่ต้องจบเพียงรอบแบ่งกลุ่ม แฟนบอลและผู้เชี่ยวชาญถกเถียงกันว่าความพ่ายแพ้นี้สะท้อนความผิดพลาดของกุนซือ หรือปัญหาที่ลึกกว่านั้นของวงการฟุตบอลเกาหลี

สำหรับแฟนบอลเกาหลีหลายล้านคนที่อดตาหลับขับตานอนเพื่อชม การตกรอบเร็วนั้นเจ็บปวด ทัวร์นาเมนต์ปี 2026 ที่สหรัฐฯ แคนาดา และเม็กซิโกร่วมกันเป็นเจ้าภาพ เป็นบอลโลกครั้งแรกที่มี 48 ทีม และความคาดหวังเคยสูงมาก ตอนนี้ความสนใจหันไปที่การสร้างทีมชาติขึ้นใหม่สำหรับรอบต่อไป$a17$,
$a17$Piala Dunia 2026 Korea Selatan berakhir di fase grup, setelah kalah 0-1 dari Afrika Selatan pada 24 Juni. Kekalahan itu membuat tim finis ketiga di Grup A dengan satu kemenangan dan dua kekalahan, gagal masuk babak 32 besar yang baru diperluas pada edisi ini.

Hasil itu mengecewakan bagi negara yang mencapai babak gugur pada Piala Dunia sebelumnya. Kapten Son Heung-min, salah satu pemain paling terkenal di Asia, mengejutkan karena dicadangkan pada laga penentuan dan baru masuk pada babak kedua — keputusan yang menuai kritik keras di dalam negeri.

Son, yang bersinar di Eropa selama bertahun-tahun, mengakhiri turnamen tanpa gol. Ini Piala Dunia keempat dalam kariernya, dan lagi-lagi terhenti di fase grup. Penggemar dan pengamat memperdebatkan apakah kekalahan itu mencerminkan kesalahan pelatih atau masalah yang lebih dalam pada sepak bola Korea.

Bagi jutaan penggemar Korea yang begadang menonton, tersingkir lebih awal terasa menyakitkan. Turnamen 2026, yang dituanrumahi bersama oleh Amerika Serikat, Kanada, dan Meksiko, adalah Piala Dunia pertama dengan 48 tim, dan harapan sempat tinggi. Kini perhatian beralih ke pembangunan kembali tim nasional untuk siklus berikutnya.$a17$,
$a17$South Korea exited the 2026 World Cup in the group stage after a 1-0 loss to South Africa on June 24, with captain Son Heung-min benched for the decider.$a17$,
$a17$South Korea World Cup 2026, Son Heung-min, World Cup group stage, Korea football, South Africa match, national team$a17$,
'intermediate',
3, 4, 4,
$a17$[
{"word":"축구","reading":"chukgu","reading_ja":"チュック","part_of_speech":"noun","definition_en":"football; soccer","definition_ja":"サッカー","definition_zh_tw":"足球","definition_es":"fútbol","definition_de":"Fußball","definition_fr":"football","definition_vi":"bóng đá","definition_th":"ฟุตบอล","definition_id":"sepak bola","example_ko":"많은 사람이 축구를 좋아한다.","example_en":"Many people love football.","example_ja":"多くの人がサッカーが好きだ。","example_zh_tw":"很多人喜歡足球。","example_es":"A mucha gente le encanta el fútbol.","example_de":"Viele Menschen lieben Fußball.","example_fr":"Beaucoup de gens adorent le football.","example_vi":"Nhiều người yêu thích bóng đá.","example_th":"หลายคนชอบฟุตบอล","example_id":"Banyak orang menyukai sepak bola."},
{"word":"대표팀","reading":"daepyotim","reading_ja":"テピョティム","part_of_speech":"noun","definition_en":"national (representative) team","definition_ja":"代表チーム","definition_zh_tw":"國家代表隊","definition_es":"selección nacional","definition_de":"Nationalmannschaft","definition_fr":"équipe nationale","definition_vi":"đội tuyển quốc gia","definition_th":"ทีมชาติ","definition_id":"tim nasional","example_ko":"축구 대표팀이 경기에서 졌다.","example_en":"The national football team lost the match.","example_ja":"サッカー代表チームが試合に負けた。","example_zh_tw":"足球國家代表隊輸了比賽。","example_es":"La selección de fútbol perdió el partido.","example_de":"Die Fußballnationalmannschaft verlor das Spiel.","example_fr":"L'équipe nationale de football a perdu le match.","example_vi":"Đội tuyển bóng đá quốc gia đã thua trận.","example_th":"ทีมชาติฟุตบอลแพ้การแข่งขัน","example_id":"Tim nasional sepak bola kalah dalam pertandingan."},
{"word":"감독","reading":"gamdok","reading_ja":"カムドク","part_of_speech":"noun","definition_en":"head coach; manager (also film director)","definition_ja":"監督","definition_zh_tw":"總教練；教練","definition_es":"entrenador; director técnico","definition_de":"Cheftrainer; Trainer","definition_fr":"entraîneur; sélectionneur","definition_vi":"huấn luyện viên trưởng","definition_th":"ผู้จัดการทีม; โค้ช","definition_id":"pelatih kepala; manajer","example_ko":"감독이 손흥민을 뺐다.","example_en":"The coach left Son Heung-min out.","example_ja":"監督がソン・フンミンを外した。","example_zh_tw":"教練把孫興慜排除在外。","example_es":"El entrenador dejó fuera a Son Heung-min.","example_de":"Der Trainer ließ Son Heung-min draußen.","example_fr":"L'entraîneur a laissé Son Heung-min sur le banc.","example_vi":"Huấn luyện viên đã gạt Son Heung-min ra ngoài.","example_th":"โค้ชไม่ส่งซน ฮึงมินลงสนาม","example_id":"Pelatih tidak memainkan Son Heung-min."},
{"word":"탈락","reading":"tallak","reading_ja":"タルラク","part_of_speech":"noun","definition_en":"elimination; being knocked out","definition_ja":"敗退；脱落","definition_zh_tw":"淘汰；出局","definition_es":"eliminación","definition_de":"Ausscheiden","definition_fr":"élimination","definition_vi":"sự bị loại","definition_th":"การตกรอบ","definition_id":"tersingkir; gugur","example_ko":"조별리그 탈락으로 팬들이 실망했다.","example_en":"Fans were disappointed by the group-stage elimination.","example_ja":"グループステージ敗退でファンは落胆した。","example_zh_tw":"小組賽出局讓球迷失望。","example_es":"La eliminación en la fase de grupos decepcionó a los aficionados.","example_de":"Das Ausscheiden in der Gruppenphase enttäuschte die Fans.","example_fr":"L'élimination au premier tour a déçu les supporters.","example_vi":"Việc bị loại ở vòng bảng khiến người hâm mộ thất vọng.","example_th":"การตกรอบแบ่งกลุ่มทำให้แฟน ๆ ผิดหวัง","example_id":"Tersingkir di fase grup mengecewakan para penggemar."},
{"word":"지다","reading":"jida","reading_ja":"チダ","part_of_speech":"verb","definition_en":"to lose (a game or contest)","definition_ja":"負ける","definition_zh_tw":"輸；落敗","definition_es":"perder","definition_de":"verlieren","definition_fr":"perdre","definition_vi":"thua","definition_th":"แพ้","definition_id":"kalah","example_ko":"우리 팀이 1점 차로 졌다.","example_en":"Our team lost by one point.","example_ja":"私たちのチームは1点差で負けた。","example_zh_tw":"我們的球隊以一分之差落敗。","example_es":"Nuestro equipo perdió por un punto.","example_de":"Unsere Mannschaft verlor mit einem Punkt Unterschied.","example_fr":"Notre équipe a perdu d'un point.","example_vi":"Đội của chúng tôi thua một điểm.","example_th":"ทีมของเราแพ้ไปหนึ่งแต้ม","example_id":"Tim kami kalah satu poin."}
]$a17$::jsonb,
'published', true, 0,
'2026-06-25T23:00:00Z', '2026-06-25T23:00:00Z', '2026-06-25T23:00:00Z'
);

-- Article 18 — 2026-06-27 culture advanced — Korea hosts UNESCO World Heritage Committee in Busan
INSERT INTO articles (topic_id, slug, title_en, title_ko, title_ja, title_zh_tw, title_es, title_de, title_fr, title_vi, title_th, title_id, summary_en, summary_ko, summary_ja, summary_zh_tw, summary_es, summary_de, summary_fr, summary_vi, summary_th, summary_id, content_en, content_ko, content_ja, content_zh_tw, content_es, content_de, content_fr, content_vi, content_th, content_id, seo_description, seo_keywords, level, reading_time_en, reading_time_ko, reading_time_ja, vocabulary, status, ai_generated, view_count, published_at, created_at, updated_at) VALUES (
(SELECT id FROM topics WHERE slug = 'culture'),
'culture-2026-06-27',
$a18$South Korea Prepares to Host UNESCO World Heritage Meeting in Busan$a18$,
$a18$한국, 부산서 유네스코 세계유산위원회 첫 개최 준비$a18$,
$a18$韓国、釜山でユネスコ世界遺産委員会を初開催へ準備$a18$,
$a18$韓國釜山首度籌辦聯合國世界遺產大會$a18$,
$a18$Corea del Sur se prepara para acoger el comité de la Unesco en Busan$a18$,
$a18$Südkorea bereitet UNESCO-Welterbe-Sitzung in Busan vor$a18$,
$a18$La Corée du Sud prépare le comité du patrimoine de l'Unesco à Busan$a18$,
$a18$Hàn Quốc chuẩn bị đăng cai Ủy ban Di sản Thế giới UNESCO tại Busan$a18$,
$a18$เกาหลีเตรียมเป็นเจ้าภาพประชุมมรดกโลกยูเนสโกที่ปูซาน$a18$,
$a18$Korea Bersiap Jadi Tuan Rumah Sidang Warisan Dunia UNESCO di Busan$a18$,
$a18$South Korea will host the 48th UNESCO World Heritage Committee in Busan from July 20 to 29, 2026 — its first time. Ahead of the meeting, Korea is showcasing its heritage and pushing to expand its 'getbol' tidal-flat listing and a Korean War 'wartime capital' bid.$a18$,
$a18$한국이 2026년 7월 20일부터 29일까지 부산에서 제48차 유네스코 세계유산위원회를 처음으로 개최한다. 회의를 앞두고 한국은 자국 유산을 알리는 한편, 갯벌 등재 확대와 6·25전쟁 '임시수도' 유산 등재를 추진하고 있다.$a18$,
$a18$韓国が2026年7月20〜29日、釜山で第48回ユネスコ世界遺産委員会を初めて開催する。会議を前に、韓国は自国の遺産を紹介するとともに、干潟（カッボル）の登録拡大や朝鮮戦争の「臨時首都」遺産の登録を進めている。$a18$,
$a18$韓國將於2026年7月20至29日在釜山首度舉辦第48屆聯合國教科文組織世界遺產委員會。會議前夕，韓國一面展示自身遺產，一面推動擴大灘塗（getbol）登錄，以及韓戰「臨時首都」遺產的申報。$a18$,
$a18$Corea del Sur acogerá el 48º comité del Patrimonio Mundial de la Unesco en Busan, del 20 al 29 de julio de 2026, por primera vez. Antes de la reunión, muestra su patrimonio y busca ampliar la inscripción de sus marismas 'getbol' y una candidatura de la 'capital en guerra' del conflicto coreano.$a18$,
$a18$Südkorea richtet vom 20. bis 29. Juli 2026 erstmals die 48. Sitzung des UNESCO-Welterbekomitees in Busan aus. Vor dem Treffen präsentiert das Land sein Erbe und will die Eintragung seiner 'Getbol'-Wattflächen ausweiten sowie eine Bewerbung zur 'Kriegshauptstadt' des Koreakriegs voranbringen.$a18$,
$a18$La Corée du Sud accueillera la 48e session du Comité du patrimoine mondial de l'Unesco à Busan, du 20 au 29 juillet 2026, une première. Avant la réunion, elle met en valeur son patrimoine et cherche à étendre l'inscription de ses vasières 'getbol' et à faire avancer une candidature sur la 'capitale de guerre' du conflit coréen.$a18$,
$a18$Hàn Quốc sẽ đăng cai kỳ họp thứ 48 của Ủy ban Di sản Thế giới UNESCO tại Busan từ ngày 20 đến 29 tháng 7 năm 2026 — lần đầu tiên. Trước thềm cuộc họp, Hàn Quốc giới thiệu di sản của mình và thúc đẩy mở rộng danh mục bãi bồi 'getbol' cùng hồ sơ 'thủ đô thời chiến' của Chiến tranh Triều Tiên.$a18$,
$a18$เกาหลีใต้จะเป็นเจ้าภาพการประชุมคณะกรรมการมรดกโลกยูเนสโกครั้งที่ 48 ที่ปูซาน ระหว่างวันที่ 20 ถึง 29 กรกฎาคม 2026 เป็นครั้งแรก ก่อนการประชุม เกาหลีจัดแสดงมรดกของตน พร้อมผลักดันการขยายการขึ้นทะเบียนหาดเลน 'geotbol' และการเสนอ 'เมืองหลวงยามสงคราม' ของสงครามเกาหลี$a18$,
$a18$Korea Selatan akan menjadi tuan rumah Sidang ke-48 Komite Warisan Dunia UNESCO di Busan, 20 hingga 29 Juli 2026 — untuk pertama kalinya. Menjelang sidang, Korea memamerkan warisannya dan mendorong perluasan pencatatan hamparan lumpur pasang 'getbol' serta pengajuan 'ibu kota masa perang' Perang Korea.$a18$,
$a18$South Korea is preparing to host a major United Nations heritage meeting for the first time: the 48th session of the UNESCO World Heritage Committee, set for Busan from July 20 to 29, 2026. As the July gathering nears, the Korea Heritage Service has been readying exhibitions and events to showcase the country's cultural sites to delegates from around the world.

The committee decides which places join the World Heritage List, the UN's roster of sites deemed to have 'outstanding universal value.' At this session, it will weigh nominations for 30 new sites worldwide. Hosting for the first time since Korea joined the committee in 1988 is a point of national pride.

Korea is pushing two of its own causes. It hopes to expand the listing of its 'getbol,' the tidal mudflats recognized in 2022, by adding areas in Muan, Goheung, and Yeosu. It is also advancing 'Heritage of Busan: Wartime Capital of Korea,' a set of sites tied to the city's role as the country's temporary capital during the 1950–53 Korean War.

To mark the event, Korea plans media-art displays of its 17 existing World Heritage sites, along with palace changing-of-the-guard reenactments and traditional performances. For a country that has turned culture into a global export through K-pop and film, the session is a chance to spotlight an older layer of heritage — from ancient tombs to living traditions — before an international audience.$a18$,
$a18$한국이 처음으로 대형 유엔 유산 회의를 개최할 준비를 하고 있다. 2026년 7월 20일부터 29일까지 부산에서 열리는 제48차 유네스코 세계유산위원회다. 7월 회의가 다가오면서 국가유산청은 전 세계에서 오는 대표단에게 한국의 문화 유적을 선보이기 위한 전시와 행사를 준비해 왔다.

이 위원회는 어떤 장소가 세계유산목록에 오를지를 결정한다. 세계유산목록은 '탁월한 보편적 가치'가 있다고 평가된 유산들의 유엔 명단이다. 이번 회의에서는 전 세계 30곳의 신규 등재 신청을 심사한다. 1988년 한국이 위원국이 된 이래 처음으로 개최하는 것이어서 국가적 자부심이 걸려 있다.

한국은 자국의 두 가지 안건도 밀고 있다. 2022년 등재된 갯벌의 목록을 무안·고흥·여수 지역을 더해 확대하기를 바란다. 또 1950~53년 6·25전쟁 당시 임시수도였던 부산의 역할과 연결된 유적들인 '한국전쟁기 임시수도 부산의 유산' 등재도 추진하고 있다.

행사를 기념해 한국은 기존 17개 세계유산을 담은 미디어아트 전시와 함께 궁궐 수문장 교대식 재현, 전통 공연 등을 선보일 계획이다. K-팝과 영화로 문화를 세계적 수출품으로 만든 나라로서, 이번 회의는 고대 무덤부터 살아 있는 전통까지 더 오래된 유산의 층위를 국제 무대에서 조명할 기회다.$a18$,
$a18$韓国が初めて、大規模な国連の遺産会議を開催する準備を進めている。2026年7月20〜29日に釜山で開かれる第48回ユネスコ世界遺産委員会だ。7月の会議が近づく中、韓国国家遺産庁は世界各地から集まる代表団に韓国の文化遺跡を紹介するための展示や催しを準備してきた。

この委員会は、どの場所を世界遺産リストに載せるかを決める。世界遺産リストとは、「顕著な普遍的価値」があると評価された遺産の国連の名簿だ。今回の会議では、世界30件の新規登録の申請が審査される。1988年に韓国が委員国となって以来、初の開催であり、国家の誇りがかかっている。

韓国は自国の2つの案件も推し進めている。2022年に登録された干潟（カッボル）のリストを、務安・高興・麗水の地域を加えて拡大したいと考えている。また、1950〜53年の朝鮮戦争当時に臨時首都だった釜山の役割に結びつく遺跡群、「朝鮮戦争期臨時首都・釜山の遺産」の登録も進めている。

この催しを記念し、韓国は既存の17件の世界遺産を映すメディアアート展に加え、宮殿の守門将交代式の再現や伝統公演などを披露する予定だ。K-POPや映画で文化を世界的な輸出品にした国として、今回の会議は、古代の墓から生きた伝統まで、より古い層の遺産を国際舞台で照らし出す機会となる。$a18$,
$a18$韓國正準備首度舉辦大型的聯合國遺產會議——2026年7月20至29日在釜山登場的第48屆聯合國教科文組織世界遺產委員會。隨著7月會議逼近，韓國國家遺產廳一直在籌備展覽與活動，向來自世界各地的代表團展示韓國的文化遺跡。

該委員會決定哪些地方能列入世界遺產名錄，也就是聯合國認定具有「傑出普世價值」的遺產清單。本屆會議將審查全球30處新登錄的申請。這是韓國自1988年成為委員國以來首度主辦，攸關國家榮譽。

韓國也在推動自己的兩項議案。它希望把2022年登錄的灘塗（getbol）名錄，增列務安、高興與麗水等地區加以擴大。同時也在推動「韓戰時期臨時首都釜山的遺產」登錄，這批遺跡與釜山在1950至53年韓戰期間作為臨時首都的角色相連。

為紀念這場盛會，韓國計畫以媒體藝術展呈現既有的17處世界遺產，並推出宮殿守門將換崗儀式重演與傳統表演等。作為以K-pop與電影把文化打造成全球輸出品的國家，這次會議正是在國際舞台上，聚焦從古代墓葬到活態傳統等更古老遺產層面的機會。$a18$,
$a18$Corea del Sur se prepara para acoger por primera vez una gran reunión de patrimonio de las Naciones Unidas: la 48ª sesión del Comité del Patrimonio Mundial de la Unesco, prevista en Busan del 20 al 29 de julio de 2026. A medida que se acerca la cita de julio, el Servicio del Patrimonio de Corea ha preparado exposiciones y actos para mostrar los lugares culturales del país a delegados de todo el mundo.

El comité decide qué lugares se suman a la Lista del Patrimonio Mundial, el registro de la ONU de sitios considerados de 'valor universal excepcional'. En esta sesión evaluará candidaturas de 30 nuevos sitios en el mundo. Acogerla por primera vez desde que Corea entró en el comité en 1988 es motivo de orgullo nacional.

Corea impulsa dos causas propias. Espera ampliar la inscripción de sus 'getbol', las marismas mareales reconocidas en 2022, añadiendo zonas de Muan, Goheung y Yeosu. También promueve 'Patrimonio de Busan: capital en tiempos de guerra de Corea', un conjunto de lugares ligados al papel de la ciudad como capital temporal durante la Guerra de Corea de 1950-53.

Para conmemorar el evento, Corea planea muestras de arte digital de sus 17 sitios ya inscritos, junto con recreaciones del cambio de guardia en los palacios y espectáculos tradicionales. Para un país que ha convertido la cultura en una exportación global mediante el K-pop y el cine, la sesión es una oportunidad de iluminar una capa más antigua de su patrimonio —de tumbas milenarias a tradiciones vivas— ante un público internacional.$a18$,
$a18$Südkorea bereitet sich darauf vor, erstmals ein großes UN-Kulturerbetreffen auszurichten: die 48. Sitzung des UNESCO-Welterbekomitees, die vom 20. bis 29. Juli 2026 in Busan stattfindet. Mit Nahen des Juli-Treffens hat der koreanische Kulturerbedienst Ausstellungen und Veranstaltungen vorbereitet, um Delegierten aus aller Welt die Kulturstätten des Landes zu präsentieren.

Das Komitee entscheidet, welche Orte in die Welterbeliste aufgenommen werden – das UN-Verzeichnis von Stätten mit 'außergewöhnlichem universellem Wert'. In dieser Sitzung prüft es Nominierungen für 30 neue Stätten weltweit. Die Ausrichtung, erstmals seit Koreas Beitritt zum Komitee 1988, ist eine Frage des Nationalstolzes.

Korea verfolgt zwei eigene Anliegen. Es möchte die Eintragung seiner 'Getbol', der 2022 anerkannten Gezeiten-Wattflächen, um Gebiete in Muan, Goheung und Yeosu erweitern. Zudem treibt es 'Erbe von Busan: Kriegshauptstadt Koreas' voran, eine Reihe von Stätten, die mit der Rolle der Stadt als vorübergehende Hauptstadt während des Koreakriegs 1950–53 verbunden sind.

Zur Feier des Ereignisses plant Korea Medienkunst-Präsentationen seiner 17 bestehenden Welterbestätten sowie Nachstellungen der Palastwachablösung und traditionelle Aufführungen. Für ein Land, das mit K-Pop und Film Kultur zu einem globalen Exportgut gemacht hat, ist die Sitzung eine Gelegenheit, eine ältere Schicht seines Erbes – von antiken Gräbern bis zu lebendigen Traditionen – vor internationalem Publikum ins Licht zu rücken.$a18$,
$a18$La Corée du Sud se prépare à accueillir pour la première fois une grande réunion des Nations unies sur le patrimoine : la 48e session du Comité du patrimoine mondial de l'Unesco, prévue à Busan du 20 au 29 juillet 2026. À l'approche du rendez-vous de juillet, le Service du patrimoine coréen prépare expositions et événements pour présenter les sites culturels du pays aux délégués du monde entier.

Le comité décide quels lieux rejoignent la Liste du patrimoine mondial, le registre de l'ONU des sites jugés d'une 'valeur universelle exceptionnelle'. Lors de cette session, il examinera les candidatures de 30 nouveaux sites dans le monde. Accueillir la réunion pour la première fois depuis l'entrée de la Corée au comité en 1988 est une fierté nationale.

La Corée défend deux dossiers qui lui sont propres. Elle espère étendre l'inscription de ses 'getbol', les vasières intertidales reconnues en 2022, en ajoutant des zones de Muan, Goheung et Yeosu. Elle fait aussi avancer 'Patrimoine de Busan : capitale de guerre de la Corée', un ensemble de sites liés au rôle de la ville comme capitale provisoire durant la guerre de Corée de 1950-53.

Pour marquer l'événement, la Corée prévoit des installations d'art numérique de ses 17 sites déjà inscrits, ainsi que des reconstitutions de la relève de la garde des palais et des spectacles traditionnels. Pour un pays qui a fait de la culture un produit d'exportation mondial via la K-pop et le cinéma, la session est l'occasion de mettre en lumière une strate plus ancienne de son patrimoine — des tombes antiques aux traditions vivantes — devant un public international.$a18$,
$a18$Hàn Quốc đang chuẩn bị lần đầu tiên đăng cai một hội nghị di sản lớn của Liên Hợp Quốc: kỳ họp thứ 48 của Ủy ban Di sản Thế giới UNESCO, dự kiến tại Busan từ ngày 20 đến 29 tháng 7 năm 2026. Khi kỳ họp tháng 7 đến gần, Cục Di sản Hàn Quốc đã chuẩn bị các triển lãm và sự kiện để giới thiệu các di tích văn hóa của đất nước tới các đại biểu từ khắp nơi trên thế giới.

Ủy ban quyết định địa điểm nào được đưa vào Danh sách Di sản Thế giới, danh mục của Liên Hợp Quốc gồm các di sản được xem là có 'giá trị nổi bật toàn cầu'. Tại kỳ họp này, ủy ban sẽ xem xét đề cử 30 di sản mới trên toàn thế giới. Việc đăng cai lần đầu kể từ khi Hàn Quốc gia nhập ủy ban năm 1988 là niềm tự hào quốc gia.

Hàn Quốc cũng theo đuổi hai đề xuất của mình. Nước này hy vọng mở rộng danh mục 'getbol' — các bãi bồi triều được công nhận năm 2022 — bằng cách thêm các khu vực ở Muan, Goheung và Yeosu. Đồng thời, họ thúc đẩy 'Di sản Busan: Thủ đô thời chiến của Hàn Quốc', một tập hợp các địa điểm gắn với vai trò của thành phố như thủ đô tạm thời trong Chiến tranh Triều Tiên 1950–53.

Để đánh dấu sự kiện, Hàn Quốc dự kiến trình chiếu nghệ thuật đa phương tiện về 17 di sản thế giới hiện có, cùng màn tái hiện lễ đổi gác ở cung điện và các buổi biểu diễn truyền thống. Với một quốc gia đã biến văn hóa thành mặt hàng xuất khẩu toàn cầu qua K-pop và điện ảnh, kỳ họp là cơ hội làm nổi bật một tầng di sản cổ hơn — từ những ngôi mộ cổ đến các truyền thống còn sống — trước công chúng quốc tế.$a18$,
$a18$เกาหลีใต้กำลังเตรียมเป็นเจ้าภาพการประชุมมรดกครั้งใหญ่ของสหประชาชาติเป็นครั้งแรก นั่นคือการประชุมคณะกรรมการมรดกโลกยูเนสโกครั้งที่ 48 ซึ่งจะจัดขึ้นที่ปูซานระหว่างวันที่ 20 ถึง 29 กรกฎาคม 2026 เมื่อการประชุมเดือนกรกฎาคมใกล้เข้ามา สำนักงานมรดกแห่งชาติเกาหลีได้เตรียมนิทรรศการและกิจกรรมเพื่อจัดแสดงแหล่งวัฒนธรรมของประเทศให้แก่ผู้แทนจากทั่วโลก

คณะกรรมการชุดนี้เป็นผู้ตัดสินว่าสถานที่ใดจะได้ขึ้นบัญชีมรดกโลก ซึ่งเป็นรายชื่อของสหประชาชาติที่รวมแหล่งที่ถือว่ามี 'คุณค่าโดดเด่นอันเป็นสากล' ในการประชุมครั้งนี้ จะพิจารณาการเสนอชื่อแหล่งใหม่ 30 แห่งทั่วโลก การได้เป็นเจ้าภาพครั้งแรกนับตั้งแต่เกาหลีเข้าเป็นสมาชิกคณะกรรมการในปี 1988 จึงเป็นเรื่องของความภาคภูมิใจของชาติ

เกาหลียังผลักดันสองวาระของตนเอง โดยหวังจะขยายการขึ้นทะเบียน 'geotbol' หรือหาดเลนที่ได้รับการรับรองในปี 2022 ด้วยการเพิ่มพื้นที่ในมูอัน โกฮึง และยอซู อีกทั้งยังผลักดัน 'มรดกแห่งปูซาน: เมืองหลวงยามสงครามของเกาหลี' ซึ่งเป็นกลุ่มสถานที่ที่เชื่อมโยงกับบทบาทของเมืองในฐานะเมืองหลวงชั่วคราวช่วงสงครามเกาหลีปี 1950–53

เพื่อเป็นการเฉลิมฉลอง เกาหลีวางแผนจัดแสดงศิลปะสื่อผสมของแหล่งมรดกโลก 17 แห่งที่มีอยู่ พร้อมการจำลองพิธีเปลี่ยนเวรทหารยามหน้าพระราชวังและการแสดงแบบดั้งเดิม สำหรับประเทศที่เปลี่ยนวัฒนธรรมให้เป็นสินค้าส่งออกระดับโลกผ่าน K-pop และภาพยนตร์ การประชุมครั้งนี้เป็นโอกาสฉายภาพมรดกชั้นที่เก่าแก่กว่า ตั้งแต่สุสานโบราณไปจนถึงประเพณีที่ยังมีชีวิต ต่อสายตาผู้ชมนานาชาติ$a18$,
$a18$Korea Selatan bersiap menjadi tuan rumah pertemuan warisan besar Perserikatan Bangsa-Bangsa untuk pertama kalinya: Sidang ke-48 Komite Warisan Dunia UNESCO, yang dijadwalkan di Busan pada 20 hingga 29 Juli 2026. Menjelang pertemuan Juli, Layanan Warisan Korea telah menyiapkan pameran dan acara untuk memperkenalkan situs budaya negara itu kepada delegasi dari seluruh dunia.

Komite ini memutuskan tempat mana yang masuk Daftar Warisan Dunia, yakni daftar PBB berisi situs yang dinilai memiliki 'nilai universal luar biasa'. Pada sidang ini, komite akan menimbang nominasi 30 situs baru di seluruh dunia. Menjadi tuan rumah untuk pertama kalinya sejak Korea bergabung dengan komite pada 1988 merupakan kebanggaan nasional.

Korea mendorong dua agendanya sendiri. Ia berharap memperluas pencatatan 'getbol', hamparan lumpur pasang surut yang diakui pada 2022, dengan menambah kawasan di Muan, Goheung, dan Yeosu. Korea juga memajukan 'Warisan Busan: Ibu Kota Masa Perang Korea', sekumpulan situs yang terkait dengan peran kota itu sebagai ibu kota sementara selama Perang Korea 1950–53.

Untuk menandai peristiwa ini, Korea berencana menampilkan seni media dari 17 situs warisan dunianya yang ada, bersama pementasan ulang upacara pergantian penjaga istana dan pertunjukan tradisional. Bagi negara yang telah menjadikan budaya sebagai ekspor global lewat K-pop dan film, sidang ini menjadi kesempatan menyoroti lapisan warisan yang lebih tua — dari makam kuno hingga tradisi yang masih hidup — di hadapan khalayak internasional.$a18$,
$a18$South Korea will host the 48th UNESCO World Heritage Committee in Busan in July 2026 — its first time — showcasing K-heritage and new listing bids.$a18$,
$a18$UNESCO World Heritage, Busan 2026, World Heritage Committee, Korea heritage, getbol tidal flats, Korean War heritage$a18$,
'advanced',
3, 4, 4,
$a18$[
{"word":"유산","reading":"yusan","reading_ja":"ユサン","part_of_speech":"noun","definition_en":"heritage; legacy; inheritance","definition_ja":"遺産","definition_zh_tw":"遺產","definition_es":"patrimonio; herencia","definition_de":"Erbe; Vermächtnis","definition_fr":"patrimoine; héritage","definition_vi":"di sản","definition_th":"มรดก","definition_id":"warisan","example_ko":"이곳은 소중한 문화 유산이다.","example_en":"This place is a precious cultural heritage.","example_ja":"ここは貴重な文化遺産だ。","example_zh_tw":"這裡是珍貴的文化遺產。","example_es":"Este lugar es un valioso patrimonio cultural.","example_de":"Dieser Ort ist ein wertvolles Kulturerbe.","example_fr":"Ce lieu est un précieux patrimoine culturel.","example_vi":"Nơi đây là một di sản văn hóa quý giá.","example_th":"ที่แห่งนี้เป็นมรดกทางวัฒนธรรมอันล้ำค่า","example_id":"Tempat ini adalah warisan budaya yang berharga."},
{"word":"등재","reading":"deungjae","reading_ja":"トゥンジェ","part_of_speech":"noun","definition_en":"registration; inscription (on a list)","definition_ja":"登録（リストへの）","definition_zh_tw":"登錄；列入","definition_es":"inscripción; registro (en una lista)","definition_de":"Eintragung; Aufnahme (in eine Liste)","definition_fr":"inscription (sur une liste)","definition_vi":"sự ghi danh; đăng ký (vào danh sách)","definition_th":"การขึ้นทะเบียน","definition_id":"pencatatan; pendaftaran (ke daftar)","example_ko":"그 유적의 세계유산 등재를 추진한다.","example_en":"They are pushing for the site's World Heritage inscription.","example_ja":"その遺跡の世界遺産登録を進めている。","example_zh_tw":"他們正推動該遺跡列入世界遺產。","example_es":"Impulsan la inscripción del sitio como Patrimonio Mundial.","example_de":"Sie treiben die Welterbe-Eintragung der Stätte voran.","example_fr":"Ils défendent l'inscription du site au patrimoine mondial.","example_vi":"Họ đang thúc đẩy việc ghi danh di tích vào Di sản Thế giới.","example_th":"พวกเขาผลักดันการขึ้นทะเบียนแหล่งนี้เป็นมรดกโลก","example_id":"Mereka mendorong pencatatan situs itu sebagai Warisan Dunia."},
{"word":"전통","reading":"jeontong","reading_ja":"チョントン","part_of_speech":"noun","definition_en":"tradition","definition_ja":"伝統","definition_zh_tw":"傳統","definition_es":"tradición","definition_de":"Tradition","definition_fr":"tradition","definition_vi":"truyền thống","definition_th":"ประเพณี","definition_id":"tradisi","example_ko":"이 공연은 오랜 전통을 보여 준다.","example_en":"This performance shows a long tradition.","example_ja":"この公演は長い伝統を示している。","example_zh_tw":"這場表演展現了悠久的傳統。","example_es":"Este espectáculo muestra una larga tradición.","example_de":"Diese Aufführung zeigt eine lange Tradition.","example_fr":"Ce spectacle illustre une longue tradition.","example_vi":"Buổi biểu diễn này thể hiện một truyền thống lâu đời.","example_th":"การแสดงนี้สะท้อนประเพณีอันยาวนาน","example_id":"Pertunjukan ini menunjukkan tradisi yang panjang."},
{"word":"세계","reading":"segye","reading_ja":"セゲ","part_of_speech":"noun","definition_en":"the world","definition_ja":"世界","definition_zh_tw":"世界","definition_es":"el mundo","definition_de":"die Welt","definition_fr":"le monde","definition_vi":"thế giới","definition_th":"โลก","definition_id":"dunia","example_ko":"세계 곳곳에서 대표단이 왔다.","example_en":"Delegates came from around the world.","example_ja":"世界各地から代表団が来た。","example_zh_tw":"來自世界各地的代表團到場。","example_es":"Llegaron delegados de todo el mundo.","example_de":"Delegierte kamen aus der ganzen Welt.","example_fr":"Des délégués sont venus du monde entier.","example_vi":"Các đại biểu đến từ khắp nơi trên thế giới.","example_th":"ผู้แทนเดินทางมาจากทั่วโลก","example_id":"Delegasi datang dari seluruh dunia."},
{"word":"보존하다","reading":"bojonhada","reading_ja":"ポジョンハダ","part_of_speech":"verb","definition_en":"to preserve; to conserve","definition_ja":"保存する","definition_zh_tw":"保存；保護","definition_es":"preservar; conservar","definition_de":"bewahren; erhalten","definition_fr":"préserver; conserver","definition_vi":"bảo tồn; gìn giữ","definition_th":"อนุรักษ์; รักษาไว้","definition_id":"melestarikan; menjaga","example_ko":"우리는 문화 유산을 보존해야 한다.","example_en":"We must preserve our cultural heritage.","example_ja":"私たちは文化遺産を保存しなければならない。","example_zh_tw":"我們必須保存文化遺產。","example_es":"Debemos preservar el patrimonio cultural.","example_de":"Wir müssen unser Kulturerbe bewahren.","example_fr":"Nous devons préserver le patrimoine culturel.","example_vi":"Chúng ta phải bảo tồn di sản văn hóa.","example_th":"เราต้องอนุรักษ์มรดกทางวัฒนธรรม","example_id":"Kita harus melestarikan warisan budaya."}
]$a18$::jsonb,
'published', true, 0,
'2026-06-26T23:00:00Z', '2026-06-26T23:00:00Z', '2026-06-26T23:00:00Z'
);

-- Article 19 — 2026-06-28 fashion beginner — K-pop idols as luxury brand ambassadors
INSERT INTO articles (topic_id, slug, title_en, title_ko, title_ja, title_zh_tw, title_es, title_de, title_fr, title_vi, title_th, title_id, summary_en, summary_ko, summary_ja, summary_zh_tw, summary_es, summary_de, summary_fr, summary_vi, summary_th, summary_id, content_en, content_ko, content_ja, content_zh_tw, content_es, content_de, content_fr, content_vi, content_th, content_id, seo_description, seo_keywords, level, reading_time_en, reading_time_ko, reading_time_ja, vocabulary, status, ai_generated, view_count, published_at, created_at, updated_at) VALUES (
(SELECT id FROM topics WHERE slug = 'fashion'),
'fashion-2026-06-28',
$a19$K-Pop Idols Become the Faces of Global Luxury Fashion in 2026$a19$,
$a19$2026년 K-팝 아이돌, 세계 명품 패션의 얼굴로$a19$,
$a19$2026年、K-POPアイドルが世界の高級ファッションの顔に$a19$,
$a19$2026年K-pop偶像成為全球精品時尚代言人$a19$,
$a19$Los ídolos del K-pop, rostro del lujo mundial en 2026$a19$,
$a19$K-Pop-Idole werden 2026 zu Gesichtern der Luxusmode$a19$,
$a19$Les idoles de K-pop, visages du luxe mondial en 2026$a19$,
$a19$Idol K-pop trở thành gương mặt thời trang xa xỉ toàn cầu 2026$a19$,
$a19$ไอดอล K-pop ขึ้นแท่นพรีเซนเตอร์แบรนด์หรูระดับโลกปี 2026$a19$,
$a19$Idol K-Pop Jadi Wajah Mode Mewah Global pada 2026$a19$,
$a19$In 2026, K-pop idols — especially girl-group members — are top ambassadors for global luxury brands. Yuqi of (G)I-DLE became a face of Tiffany & Co., and Anna of MEOVV a global ambassador for Chloé, drawing loyal fans to the brands.$a19$,
$a19$2026년 K-팝 아이돌, 특히 걸그룹 멤버들이 세계 명품 브랜드의 대표 얼굴이 되고 있다. (여자)아이들의 우기가 티파니앤코의 얼굴이 됐고, 메이브의 애나는 클로에의 글로벌 앰배서더가 되어 충성도 높은 팬들을 브랜드로 끌어들이고 있다.$a19$,
$a19$2026年、K-POPアイドル、とりわけガールグループのメンバーが世界の高級ブランドの顔になっている。(G)I-DLEのウギがティファニーの顔となり、MEOVVのアンナがクロエのグローバルアンバサダーに就任し、熱心なファンをブランドへ引き寄せている。$a19$,
$a19$2026年，K-pop偶像，尤其是女團成員，正成為全球精品品牌的代表面孔。(G)I-DLE的雨琦成為蒂芙尼的代言人，MEOVV的Anna出任Chloé全球大使，把死忠粉絲帶向這些品牌。$a19$,
$a19$En 2026, los ídolos del K-pop —sobre todo integrantes de grupos femeninos— son los rostros de las grandes marcas de lujo. Yuqi, de (G)I-DLE, se convirtió en imagen de Tiffany & Co., y Anna, de MEOVV, en embajadora global de Chloé, atrayendo a sus fieles fans hacia las marcas.$a19$,
$a19$2026 sind K-Pop-Idole – vor allem Mitglieder von Girlgroups – die Topbotschafter globaler Luxusmarken. Yuqi von (G)I-DLE wurde Gesicht von Tiffany & Co., Anna von MEOVV globale Botschafterin von Chloé und zieht damit treue Fans zu den Marken.$a19$,
$a19$En 2026, les idoles de K-pop — surtout des membres de girls bands — sont les visages des grandes marques de luxe. Yuqi de (G)I-DLE est devenue une égérie de Tiffany & Co., et Anna de MEOVV ambassadrice mondiale de Chloé, attirant leurs fidèles fans vers les marques.$a19$,
$a19$Năm 2026, các idol K-pop — nhất là thành viên nhóm nữ — trở thành gương mặt hàng đầu của các thương hiệu xa xỉ toàn cầu. Yuqi của (G)I-DLE thành gương mặt của Tiffany & Co., còn Anna của MEOVV làm đại sứ toàn cầu cho Chloé, thu hút người hâm mộ trung thành đến với các thương hiệu.$a19$,
$a19$ในปี 2026 ไอดอล K-pop โดยเฉพาะสมาชิกเกิร์ลกรุ๊ป กลายเป็นพรีเซนเตอร์อันดับต้นของแบรนด์หรูระดับโลก อวี่ฉีจาก (G)I-DLE เป็นพรีเซนเตอร์ให้ Tiffany & Co. และแอนนาจาก MEOVV เป็นแบรนด์แอมบาสเดอร์ระดับโลกของ Chloé ดึงแฟน ๆ ที่เหนียวแน่นเข้าหาแบรนด์$a19$,
$a19$Pada 2026, idol K-pop — terutama anggota grup perempuan — menjadi wajah utama merek mewah global. Yuqi dari (G)I-DLE menjadi wajah Tiffany & Co., dan Anna dari MEOVV duta global Chloé, menarik penggemar setia ke merek-merek itu.$a19$,
$a19$In 2026, some of the biggest names in global luxury fashion are K-pop idols. Yuqi of the girl group (G)I-DLE became an ambassador for the jewelry brand Tiffany & Co., and Anna of the group MEOVV was named a global ambassador for the French fashion house Chloé.

A brand ambassador is a famous person a company chooses to represent it. They appear in ads, sit in the front row at fashion shows, and wear the brand's clothes and jewelry. Luxury companies like K-pop idols because they have huge, loyal fan bases around the world who follow what they wear.

Girl-group members have been especially popular choices in 2026. When an idol is named an ambassador, fans often rush to buy the same items, and photos spread quickly online. For many young people, K-pop stars have become a main way they learn about fashion and style.$a19$,
$a19$2026년, 세계 명품 패션의 가장 큰 이름 중에는 K-팝 아이돌이 있다. 걸그룹 (여자)아이들의 우기는 주얼리 브랜드 티파니앤코의 앰배서더가 됐고, 그룹 메이브의 애나는 프랑스 패션 하우스 클로에의 글로벌 앰배서더로 발탁됐다.

브랜드 앰배서더는 회사가 자신을 대표하도록 고른 유명한 사람이다. 이들은 광고에 나오고, 패션쇼 맨 앞줄에 앉으며, 브랜드의 옷과 주얼리를 입고 착용한다. 명품 회사들이 K-팝 아이돌을 좋아하는 이유는, 이들이 전 세계에 크고 충성도 높은 팬층을 두고 있고 팬들이 그들이 입는 것을 따라 보기 때문이다.

2026년에는 특히 걸그룹 멤버들이 인기 있는 선택이었다. 아이돌이 앰배서더로 발표되면 팬들은 같은 상품을 사려고 몰려들고, 사진이 온라인에서 빠르게 퍼진다. 많은 젊은이에게 K-팝 스타는 이제 패션과 스타일을 알아 가는 주요 통로가 되었다.$a19$,
$a19$2026年、世界の高級ファッションで最も大きな名前の中にK-POPアイドルがいる。ガールグループ(G)I-DLEのウギはジュエリーブランド、ティファニーのアンバサダーになり、グループMEOVVのアンナはフランスのファッションハウス、クロエのグローバルアンバサダーに抜擢された。

ブランドアンバサダーとは、企業が自社を代表するために選ぶ有名人のことだ。彼女たちは広告に登場し、ファッションショーの最前列に座り、ブランドの服やジュエリーを身に着ける。高級ブランドがK-POPアイドルを好むのは、世界中に大きく熱心なファン層を持ち、ファンが彼女たちの身に着けるものを追いかけるからだ。

2026年はとりわけガールグループのメンバーが人気の起用先だった。アイドルがアンバサダーに発表されると、ファンは同じ商品を買おうと殺到し、写真がネットで一気に広がる。多くの若者にとって、K-POPスターは今やファッションやスタイルを知る主要な入り口になっている。$a19$,
$a19$2026年，全球精品時尚最響亮的名字裡就有K-pop偶像。女團(G)I-DLE的雨琦成為珠寶品牌蒂芙尼的代言人，團體MEOVV的Anna則獲選為法國時裝品牌Chloé的全球大使。

品牌代言人是公司挑選來代表自己的名人。他們出現在廣告中，坐在時裝秀的第一排，穿戴品牌的服裝與珠寶。精品公司之所以喜歡K-pop偶像，是因為他們在全球擁有龐大又死忠的粉絲，而粉絲會關注他們穿什麼。

2026年，女團成員尤其受青睞。當偶像被宣布為代言人時，粉絲往往搶購同款商品，照片也在網路上迅速流傳。對許多年輕人來說，K-pop明星如今已成為他們認識時尚與風格的主要管道。$a19$,
$a19$En 2026, entre los nombres más grandes del lujo mundial hay ídolos del K-pop. Yuqi, del grupo femenino (G)I-DLE, se convirtió en embajadora de la marca de joyería Tiffany & Co., y Anna, del grupo MEOVV, fue elegida embajadora global de la casa de moda francesa Chloé.

Un embajador de marca es una persona famosa que una empresa elige para representarla. Aparecen en los anuncios, se sientan en la primera fila de los desfiles y visten la ropa y las joyas de la marca. A las firmas de lujo les gustan los ídolos del K-pop porque tienen bases de fans enormes y fieles en todo el mundo que siguen lo que ellos llevan.

En 2026, las integrantes de grupos femeninos fueron opciones especialmente populares. Cuando se anuncia a un ídolo como embajador, los fans suelen apresurarse a comprar los mismos artículos, y las fotos se difunden rápido por internet. Para muchos jóvenes, las estrellas del K-pop se han convertido en una vía principal para conocer la moda y el estilo.$a19$,
$a19$2026 gehören zu den größten Namen der globalen Luxusmode K-Pop-Idole. Yuqi von der Girlgroup (G)I-DLE wurde Botschafterin der Schmuckmarke Tiffany & Co., und Anna von der Gruppe MEOVV wurde zur globalen Botschafterin des französischen Modehauses Chloé ernannt.

Ein Markenbotschafter ist eine berühmte Person, die ein Unternehmen auswählt, um es zu vertreten. Sie treten in Werbespots auf, sitzen in der ersten Reihe bei Modenschauen und tragen die Kleidung und den Schmuck der Marke. Luxusfirmen mögen K-Pop-Idole, weil sie weltweit riesige, treue Fangemeinden haben, die verfolgen, was sie tragen.

2026 waren vor allem Mitglieder von Girlgroups beliebte Wahl. Wird ein Idol zum Botschafter ernannt, stürmen Fans oft los, um dieselben Artikel zu kaufen, und Fotos verbreiten sich schnell im Netz. Für viele junge Menschen sind K-Pop-Stars zu einem wichtigen Weg geworden, Mode und Stil kennenzulernen.$a19$,
$a19$En 2026, parmi les plus grands noms du luxe mondial figurent des idoles de K-pop. Yuqi, du groupe féminin (G)I-DLE, est devenue ambassadrice de la marque de joaillerie Tiffany & Co., et Anna, du groupe MEOVV, a été nommée ambassadrice mondiale de la maison de mode française Chloé.

Un ambassadeur de marque est une personne célèbre qu'une entreprise choisit pour la représenter. Elles apparaissent dans les publicités, s'assoient au premier rang des défilés et portent les vêtements et bijoux de la marque. Les maisons de luxe apprécient les idoles de K-pop car elles ont d'immenses bases de fans fidèles dans le monde entier, qui suivent ce qu'elles portent.

En 2026, les membres de girls bands ont été des choix particulièrement prisés. Quand une idole est nommée ambassadrice, les fans se ruent souvent sur les mêmes articles, et les photos se répandent vite en ligne. Pour beaucoup de jeunes, les stars de la K-pop sont devenues un moyen essentiel de découvrir la mode et le style.$a19$,
$a19$Năm 2026, trong số những cái tên lớn nhất của thời trang xa xỉ toàn cầu có các idol K-pop. Yuqi của nhóm nữ (G)I-DLE trở thành đại sứ cho thương hiệu trang sức Tiffany & Co., còn Anna của nhóm MEOVV được chọn làm đại sứ toàn cầu cho nhà mốt Pháp Chloé.

Đại sứ thương hiệu là một người nổi tiếng mà công ty chọn để đại diện cho mình. Họ xuất hiện trong quảng cáo, ngồi hàng ghế đầu tại các buổi trình diễn thời trang, và mặc quần áo cùng đeo trang sức của thương hiệu. Các hãng xa xỉ thích idol K-pop vì họ có lượng người hâm mộ khổng lồ và trung thành khắp thế giới, luôn theo dõi những gì họ mặc.

Năm 2026, các thành viên nhóm nữ đặc biệt được ưa chuộng. Khi một idol được công bố làm đại sứ, người hâm mộ thường đổ xô mua những món đồ giống hệt, và hình ảnh lan nhanh trên mạng. Với nhiều người trẻ, ngôi sao K-pop nay đã trở thành một cách chính để họ tìm hiểu về thời trang và phong cách.$a19$,
$a19$ในปี 2026 หนึ่งในชื่อที่ยิ่งใหญ่ที่สุดของวงการแฟชั่นหรูระดับโลกคือไอดอล K-pop อวี่ฉีจากเกิร์ลกรุ๊ป (G)I-DLE กลายเป็นพรีเซนเตอร์ให้แบรนด์เครื่องประดับ Tiffany & Co. และแอนนาจากวง MEOVV ได้รับเลือกเป็นแบรนด์แอมบาสเดอร์ระดับโลกของแบรนด์แฟชั่นฝรั่งเศส Chloé

แบรนด์แอมบาสเดอร์คือบุคคลมีชื่อเสียงที่บริษัทเลือกให้เป็นตัวแทน พวกเขาปรากฏในโฆษณา นั่งแถวหน้าในแฟชั่นโชว์ และสวมใส่เสื้อผ้ากับเครื่องประดับของแบรนด์ บริษัทแบรนด์หรูชอบไอดอล K-pop เพราะพวกเขามีฐานแฟนคลับที่ใหญ่และเหนียวแน่นทั่วโลก ซึ่งคอยติดตามว่าพวกเขาสวมใส่อะไร

ในปี 2026 สมาชิกเกิร์ลกรุ๊ปเป็นตัวเลือกที่ได้รับความนิยมเป็นพิเศษ เมื่อมีการประกาศให้ไอดอลเป็นแบรนด์แอมบาสเดอร์ แฟน ๆ มักแห่กันไปซื้อสินค้าชิ้นเดียวกัน และรูปภาพก็แพร่กระจายอย่างรวดเร็วบนโลกออนไลน์ สำหรับคนหนุ่มสาวจำนวนมาก ดาว K-pop กลายเป็นช่องทางหลักในการเรียนรู้เรื่องแฟชั่นและสไตล์$a19$,
$a19$Pada 2026, sebagian nama terbesar dalam mode mewah global adalah idol K-pop. Yuqi dari grup perempuan (G)I-DLE menjadi duta merek perhiasan Tiffany & Co., dan Anna dari grup MEOVV ditunjuk sebagai duta global rumah mode Prancis Chloé.

Duta merek adalah orang terkenal yang dipilih perusahaan untuk mewakilinya. Mereka tampil di iklan, duduk di barisan depan peragaan busana, dan mengenakan pakaian serta perhiasan merek tersebut. Perusahaan mewah menyukai idol K-pop karena mereka memiliki basis penggemar yang besar dan setia di seluruh dunia, yang mengikuti apa yang mereka kenakan.

Pada 2026, anggota grup perempuan menjadi pilihan yang sangat populer. Ketika seorang idol diumumkan sebagai duta, penggemar sering berebut membeli barang yang sama, dan foto-foto menyebar cepat di internet. Bagi banyak anak muda, bintang K-pop kini menjadi cara utama mereka mengenal mode dan gaya.$a19$,
$a19$In 2026, K-pop idols like (G)I-DLE's Yuqi and MEOVV's Anna are the faces of luxury brands such as Tiffany & Co. and Chloé, drawing legions of loyal fans.$a19$,
$a19$K-pop brand ambassador, luxury fashion, Yuqi Tiffany, MEOVV Anna Chloe, K-pop fashion, girl group idols$a19$,
'beginner',
3, 4, 4,
$a19$[
{"word":"패션","reading":"paesyeon","reading_ja":"ペション","part_of_speech":"noun","definition_en":"fashion","definition_ja":"ファッション","definition_zh_tw":"時尚","definition_es":"moda","definition_de":"Mode","definition_fr":"mode","definition_vi":"thời trang","definition_th":"แฟชั่น","definition_id":"mode; fesyen","example_ko":"그 아이돌은 패션에 관심이 많다.","example_en":"That idol is very interested in fashion.","example_ja":"そのアイドルはファッションに関心が高い。","example_zh_tw":"那位偶像對時尚很有興趣。","example_es":"A ese ídolo le interesa mucho la moda.","example_de":"Dieses Idol interessiert sich sehr für Mode.","example_fr":"Cette idole s'intéresse beaucoup à la mode.","example_vi":"Idol đó rất quan tâm đến thời trang.","example_th":"ไอดอลคนนั้นสนใจแฟชั่นมาก","example_id":"Idol itu sangat tertarik pada mode."},
{"word":"옷","reading":"ot","reading_ja":"オッ","part_of_speech":"noun","definition_en":"clothes; clothing","definition_ja":"服","definition_zh_tw":"衣服","definition_es":"ropa","definition_de":"Kleidung","definition_fr":"vêtements","definition_vi":"quần áo","definition_th":"เสื้อผ้า","definition_id":"pakaian; baju","example_ko":"그녀는 그 브랜드의 옷을 입었다.","example_en":"She wore that brand's clothes.","example_ja":"彼女はそのブランドの服を着た。","example_zh_tw":"她穿了那個品牌的衣服。","example_es":"Llevaba ropa de esa marca.","example_de":"Sie trug Kleidung dieser Marke.","example_fr":"Elle portait des vêtements de cette marque.","example_vi":"Cô ấy mặc quần áo của thương hiệu đó.","example_th":"เธอสวมเสื้อผ้าของแบรนด์นั้น","example_id":"Dia mengenakan pakaian merek itu."},
{"word":"명품","reading":"myeongpum","reading_ja":"ミョンプム","part_of_speech":"noun","definition_en":"luxury goods; designer brand items","definition_ja":"高級ブランド品","definition_zh_tw":"精品；名牌","definition_es":"artículos de lujo","definition_de":"Luxusartikel; Markenware","definition_fr":"produits de luxe","definition_vi":"hàng hiệu; hàng xa xỉ","definition_th":"สินค้าแบรนด์เนม; ของหรู","definition_id":"barang mewah; produk bermerek","example_ko":"많은 사람이 명품을 좋아한다.","example_en":"Many people love luxury goods.","example_ja":"多くの人が高級ブランド品を好む。","example_zh_tw":"很多人喜歡名牌精品。","example_es":"A mucha gente le gustan los artículos de lujo.","example_de":"Viele Menschen lieben Luxusartikel.","example_fr":"Beaucoup de gens aiment les produits de luxe.","example_vi":"Nhiều người thích hàng hiệu.","example_th":"หลายคนชอบสินค้าแบรนด์เนม","example_id":"Banyak orang menyukai barang mewah."},
{"word":"모델","reading":"model","reading_ja":"モデル","part_of_speech":"noun","definition_en":"model (for fashion or ads)","definition_ja":"モデル","definition_zh_tw":"模特兒","definition_es":"modelo","definition_de":"Model","definition_fr":"mannequin; modèle","definition_vi":"người mẫu","definition_th":"นางแบบ; นายแบบ","definition_id":"model","example_ko":"그는 광고 모델로 나왔다.","example_en":"He appeared as a model in the ad.","example_ja":"彼は広告のモデルとして出た。","example_zh_tw":"他擔任廣告模特兒。","example_es":"Apareció como modelo en el anuncio.","example_de":"Er trat als Model in der Werbung auf.","example_fr":"Il est apparu comme mannequin dans la publicité.","example_vi":"Anh ấy xuất hiện với vai trò người mẫu trong quảng cáo.","example_th":"เขาปรากฏตัวเป็นนายแบบในโฆษณา","example_id":"Ia tampil sebagai model dalam iklan."},
{"word":"입다","reading":"ipda","reading_ja":"イプタ","part_of_speech":"verb","definition_en":"to wear; to put on (clothes)","definition_ja":"着る","definition_zh_tw":"穿（衣服）","definition_es":"ponerse; llevar (ropa)","definition_de":"anziehen; tragen (Kleidung)","definition_fr":"porter; mettre (un vêtement)","definition_vi":"mặc (quần áo)","definition_th":"สวม; ใส่ (เสื้อผ้า)","definition_id":"memakai; mengenakan (pakaian)","example_ko":"그녀는 예쁜 드레스를 입었다.","example_en":"She wore a beautiful dress.","example_ja":"彼女はきれいなドレスを着た。","example_zh_tw":"她穿了一件漂亮的洋裝。","example_es":"Se puso un vestido precioso.","example_de":"Sie trug ein schönes Kleid.","example_fr":"Elle portait une belle robe.","example_vi":"Cô ấy mặc một chiếc váy đẹp.","example_th":"เธอสวมชุดเดรสสวย","example_id":"Dia mengenakan gaun yang cantik."}
]$a19$::jsonb,
'published', true, 0,
'2026-06-27T23:00:00Z', '2026-06-27T23:00:00Z', '2026-06-27T23:00:00Z'
);

-- Article 20 — 2026-06-29 politics intermediate — Lee unveils record investment drive for AI
INSERT INTO articles (topic_id, slug, title_en, title_ko, title_ja, title_zh_tw, title_es, title_de, title_fr, title_vi, title_th, title_id, summary_en, summary_ko, summary_ja, summary_zh_tw, summary_es, summary_de, summary_fr, summary_vi, summary_th, summary_id, content_en, content_ko, content_ja, content_zh_tw, content_es, content_de, content_fr, content_vi, content_th, content_id, seo_description, seo_keywords, level, reading_time_en, reading_time_ko, reading_time_ja, vocabulary, status, ai_generated, view_count, published_at, created_at, updated_at) VALUES (
(SELECT id FROM topics WHERE slug = 'politics'),
'politics-2026-06-29',
$a20$President Lee Unveils Record $650 Billion Investment Drive for AI$a20$,
$a20$이재명 대통령, 사상 최대 1000조 원 투자 계획 발표$a20$,
$a20$李在明大統領、史上最大1000兆ウォンの投資計画を発表$a20$,
$a20$李在明總統公布史上最大千兆韓元投資計畫$a20$,
$a20$El presidente Lee presenta un plan récord de inversión en IA$a20$,
$a20$Präsident Lee stellt Rekord-Investitionsplan für KI vor$a20$,
$a20$Le président Lee dévoile un plan d'investissement record pour l'IA$a20$,
$a20$Tổng thống Lee công bố kế hoạch đầu tư kỷ lục cho AI$a20$,
$a20$ปธน.อีเปิดแผนลงทุน AI ครั้งใหญ่สุดเป็นประวัติการณ์$a20$,
$a20$Presiden Lee Umumkan Rencana Investasi AI Terbesar dalam Sejarah$a20$,
$a20$On June 29, 2026, President Lee Jae-myung announced South Korea's largest-ever corporate investment pledge — about 1,000 trillion won ($650 billion) over ten years, led by Samsung — and named 'physical AI,' or robots, a national strategic industry.$a20$,
$a20$2026년 6월 29일 이재명 대통령이 한국 역사상 최대 규모의 기업 투자 계획을 발표했다. 삼성이 주도해 10년간 약 1000조 원(약 6500억 달러)을 투자하는 내용으로, 로봇을 뜻하는 '피지컬 AI'를 국가전략산업으로 지정했다.$a20$,
$a20$2026年6月29日、李在明大統領が韓国史上最大規模の企業投資計画を発表した。サムスンが主導し、10年間で約1000兆ウォン（約6500億ドル）を投じる内容で、ロボットを指す「フィジカルAI」を国家戦略産業に指定した。$a20$,
$a20$2026年6月29日，李在明總統公布韓國史上最大規模的企業投資計畫，由三星主導、未來十年投入約1000兆韓元（約6500億美元），並將意指機器人的「實體AI」列為國家戰略產業。$a20$,
$a20$El 29 de junio de 2026, el presidente Lee Jae-myung anunció el mayor compromiso de inversión empresarial de la historia de Corea del Sur —unos 1.000 billones de wones (650.000 millones de dólares) en diez años, liderado por Samsung— y designó la 'IA física', es decir los robots, industria estratégica nacional.$a20$,
$a20$Am 29. Juni 2026 kündigte Präsident Lee Jae-myung die größte Investitionszusage der Unternehmensgeschichte Südkoreas an – rund 1.000 Billionen Won (650 Milliarden Dollar) über zehn Jahre, angeführt von Samsung – und erklärte 'physische KI', also Roboter, zur nationalen strategischen Industrie.$a20$,
$a20$Le 29 juin 2026, le président Lee Jae-myung a annoncé le plus important engagement d'investissement des entreprises de l'histoire de la Corée du Sud — environ 1 000 000 milliards de wons (650 milliards de dollars) sur dix ans, mené par Samsung — et a désigné l'« IA physique », soit les robots, industrie stratégique nationale.$a20$,
$a20$Ngày 29/6/2026, Tổng thống Lee Jae-myung công bố cam kết đầu tư doanh nghiệp lớn nhất lịch sử Hàn Quốc — khoảng 1.000 nghìn tỷ won (650 tỷ USD) trong mười năm, do Samsung dẫn đầu — và xác định 'AI vật lý', tức robot, là ngành chiến lược quốc gia.$a20$,
$a20$เมื่อวันที่ 29 มิถุนายน 2026 ประธานาธิบดีอี แจมยองประกาศคำมั่นการลงทุนของภาคเอกชนครั้งใหญ่ที่สุดในประวัติศาสตร์เกาหลีใต้ ราว 1,000 ล้านล้านวอน (6.5 แสนล้านดอลลาร์) ในสิบปี นำโดยซัมซุง และกำหนดให้ 'AI เชิงกายภาพ' หรือหุ่นยนต์ เป็นอุตสาหกรรมยุทธศาสตร์ของชาติ$a20$,
$a20$Pada 29 Juni 2026, Presiden Lee Jae-myung mengumumkan komitmen investasi korporasi terbesar dalam sejarah Korea Selatan — sekitar 1.000 triliun won (650 miliar dolar) selama sepuluh tahun, dipimpin Samsung — dan menetapkan 'AI fisik', yakni robot, sebagai industri strategis nasional.$a20$,
$a20$President Lee Jae-myung on June 29, 2026, announced the largest corporate investment pledge in South Korea's history: a plan for companies to invest roughly 1,000 trillion won — about 650 billion US dollars — over the next ten years. Samsung Group anchored the commitment.

The government framed the plan around what Lee called a 'triple axis' of technology: semiconductors as the 'brain,' AI data centers as the memory, and 'physical AI' — robots and machines that can act in the real world — as the body. Seoul designated physical AI a 'national strategic industry' and set a goal of developing a homegrown general-purpose robot within a few years.

The announcement came almost exactly a year into Lee's presidency, at a moment when his approval rating had dipped below 50 percent. Big investment pledges let a government show it is driving growth and jobs, and Lee cast 2026 as 'the first year of a great transformation' for the economy.

Whether the money materializes as promised will matter more than the headline number. Corporate pledges often stretch over many years and can shrink if the economy weakens. Still, the scale signals that South Korea is betting heavily on AI and robotics to stay competitive against the United States and China.$a20$,
$a20$이재명 대통령이 2026년 6월 29일 한국 역사상 최대 규모의 기업 투자 계획을 발표했다. 앞으로 10년간 기업들이 약 1000조 원, 미화 약 6500억 달러를 투자한다는 구상이다. 삼성그룹이 이 약속의 중심을 이뤘다.

정부는 이 계획을 이 대통령이 '삼각 축'이라고 부른 기술 구조로 설명했다. 반도체는 '두뇌', AI 데이터센터는 기억 장치, 그리고 현실 세계에서 움직일 수 있는 로봇과 기계인 '피지컬 AI'는 몸에 해당한다는 것이다. 정부는 피지컬 AI를 '국가전략산업'으로 지정하고, 몇 년 안에 국산 범용 로봇을 개발하겠다는 목표를 세웠다.

이번 발표는 이 대통령 취임 약 1년째, 지지율이 50% 아래로 내려간 시점에 나왔다. 대규모 투자 약속은 정부가 성장과 일자리를 이끌고 있음을 보여 줄 수 있는 방법이며, 이 대통령은 2026년을 경제의 '대전환 원년'으로 규정했다.

다만 헤드라인 숫자보다 그 돈이 약속대로 실현되는지가 더 중요하다. 기업의 투자 약속은 여러 해에 걸쳐 있고, 경기가 나빠지면 줄어들 수 있다. 그럼에도 그 규모는 한국이 미국·중국과의 경쟁에서 앞서기 위해 AI와 로봇에 크게 걸고 있음을 보여 준다.$a20$,
$a20$李在明大統領が2026年6月29日、韓国史上最大規模の企業投資計画を発表した。今後10年間で企業が約1000兆ウォン、米ドルで約6500億ドルを投資するという構想だ。サムスングループがこの約束の中心を担った。

政府はこの計画を、李大統領が「三つの軸」と呼ぶ技術の構図で説明した。半導体は「頭脳」、AIデータセンターは記憶装置、そして現実世界で動けるロボットや機械である「フィジカルAI」は体に当たるという。政府はフィジカルAIを「国家戦略産業」に指定し、数年以内に国産の汎用ロボットを開発する目標を掲げた。

今回の発表は、李大統領の就任から約1年、支持率が50%を割り込んだ時期に出された。大規模な投資の約束は、政府が成長と雇用をけん引していることを示す手段であり、李大統領は2026年を経済の「大転換の初年」と位置づけた。

ただし、見出しの数字よりも、その資金が約束どおり実現するかどうかがより重要だ。企業の投資の約束は何年にもわたり、景気が悪化すれば縮小することもある。それでもその規模は、韓国がアメリカや中国との競争で先んじるためにAIとロボットに大きく賭けていることを示している。$a20$,
$a20$李在明總統於2026年6月29日公布韓國史上最大規模的企業投資計畫。構想是未來十年間，企業將投資約1000兆韓元、約6500億美元。三星集團是這項承諾的核心。

政府以李在明所稱的「三軸」技術架構來說明這項計畫：半導體是「大腦」，AI資料中心是記憶體，而能在現實世界行動的機器人與機器——「實體AI」——則是身體。政府將實體AI列為「國家戰略產業」，並訂下數年內開發國產通用型機器人的目標。

這項宣布出爐時，正值李在明就任約滿一年、支持率跌破50%之際。大規模投資承諾是政府展現自己正帶動成長與就業的方式，李在明並將2026年定位為經濟「大轉型元年」。

不過，比起標題數字，這筆錢是否如承諾般落實更為重要。企業的投資承諾往往橫跨多年，一旦景氣轉壞就可能縮水。即便如此，這樣的規模顯示韓國正押重注在AI與機器人上，以在與美國、中國的競爭中保持領先。$a20$,
$a20$El presidente Lee Jae-myung anunció el 29 de junio de 2026 el mayor plan de inversión empresarial de la historia de Corea del Sur. La idea es que las empresas inviertan unos 1.000 billones de wones, alrededor de 650.000 millones de dólares, durante los próximos diez años. El grupo Samsung fue el eje de ese compromiso.

El gobierno presentó el plan a partir de lo que Lee llamó un 'triple eje' tecnológico: los semiconductores como 'cerebro', los centros de datos de IA como memoria y la 'IA física' —robots y máquinas capaces de actuar en el mundo real— como cuerpo. Seúl designó la IA física 'industria estratégica nacional' y fijó la meta de desarrollar un robot de uso general propio en pocos años.

El anuncio llegó casi al cumplirse un año de la presidencia de Lee, en un momento en que su aprobación había caído por debajo del 50 por ciento. Las grandes promesas de inversión permiten a un gobierno mostrar que impulsa el crecimiento y el empleo, y Lee definió 2026 como 'el primer año de una gran transformación' de la economía.

Con todo, importará más si el dinero se materializa como se prometió que la cifra del titular. Los compromisos empresariales suelen extenderse muchos años y pueden reducirse si la economía se debilita. Aun así, la magnitud indica que Corea del Sur apuesta fuerte por la IA y la robótica para seguir siendo competitiva frente a Estados Unidos y China.$a20$,
$a20$Präsident Lee Jae-myung kündigte am 29. Juni 2026 den größten Investitionsplan der Unternehmensgeschichte Südkoreas an. Die Idee: Unternehmen sollen in den nächsten zehn Jahren rund 1.000 Billionen Won investieren, etwa 650 Milliarden US-Dollar. Die Samsung-Gruppe bildete das Rückgrat der Zusage.

Die Regierung stellte den Plan entlang dessen vor, was Lee eine 'dreifache Achse' der Technik nannte: Halbleiter als 'Gehirn', KI-Rechenzentren als Speicher und 'physische KI' – Roboter und Maschinen, die in der realen Welt handeln können – als Körper. Seoul erklärte physische KI zur 'nationalen strategischen Industrie' und setzte sich das Ziel, binnen weniger Jahre einen eigenen Universalroboter zu entwickeln.

Die Ankündigung kam fast genau ein Jahr nach Lees Amtsantritt, zu einem Zeitpunkt, als seine Zustimmung unter 50 Prozent gesunken war. Große Investitionsversprechen erlauben es einer Regierung zu zeigen, dass sie Wachstum und Arbeitsplätze antreibt, und Lee bezeichnete 2026 als 'das erste Jahr einer großen Transformation' der Wirtschaft.

Ob das Geld wie versprochen fließt, wird jedoch mehr zählen als die Schlagzeilenzahl. Unternehmenszusagen erstrecken sich oft über viele Jahre und können schrumpfen, wenn die Wirtschaft schwächelt. Dennoch signalisiert das Ausmaß, dass Südkorea stark auf KI und Robotik setzt, um im Wettbewerb mit den USA und China zu bestehen.$a20$,
$a20$Le président Lee Jae-myung a annoncé le 29 juin 2026 le plus vaste plan d'investissement des entreprises de l'histoire de la Corée du Sud. L'idée : que les entreprises investissent environ 1 000 000 milliards de wons, quelque 650 milliards de dollars, au cours des dix prochaines années. Le groupe Samsung constituait le cœur de cet engagement.

Le gouvernement a présenté le plan autour de ce que Lee a appelé un « triple axe » technologique : les semi-conducteurs comme « cerveau », les centres de données d'IA comme mémoire, et l'« IA physique » — robots et machines capables d'agir dans le monde réel — comme corps. Séoul a désigné l'IA physique « industrie stratégique nationale » et s'est fixé l'objectif de développer un robot polyvalent national d'ici quelques années.

L'annonce est intervenue presque un an jour pour jour après le début du mandat de Lee, alors que sa cote de popularité était passée sous les 50 %. Les grandes promesses d'investissement permettent à un gouvernement de montrer qu'il stimule la croissance et l'emploi, et Lee a présenté 2026 comme « la première année d'une grande transformation » de l'économie.

Reste que la concrétisation de ces fonds, comme promis, comptera plus que le chiffre affiché. Les engagements des entreprises s'étalent souvent sur de nombreuses années et peuvent se réduire si l'économie faiblit. L'ampleur du plan montre néanmoins que la Corée du Sud mise gros sur l'IA et la robotique pour rester compétitive face aux États-Unis et à la Chine.$a20$,
$a20$Tổng thống Lee Jae-myung ngày 29 tháng 6 năm 2026 công bố kế hoạch đầu tư doanh nghiệp lớn nhất trong lịch sử Hàn Quốc. Ý tưởng là các doanh nghiệp sẽ đầu tư khoảng 1.000 nghìn tỷ won, tức chừng 650 tỷ đô la Mỹ, trong mười năm tới. Tập đoàn Samsung là hạt nhân của cam kết này.

Chính phủ trình bày kế hoạch theo cái mà ông Lee gọi là 'ba trục' công nghệ: chất bán dẫn là 'bộ não', các trung tâm dữ liệu AI là bộ nhớ, và 'AI vật lý' — robot và máy móc có thể hành động trong thế giới thực — là cơ thể. Seoul xác định AI vật lý là 'ngành chiến lược quốc gia' và đặt mục tiêu phát triển một robot đa dụng nội địa trong vài năm tới.

Thông báo được đưa ra gần đúng một năm sau khi ông Lee nhậm chức, vào thời điểm tỷ lệ ủng hộ ông đã tụt xuống dưới 50%. Những cam kết đầu tư lớn giúp chính phủ cho thấy mình đang thúc đẩy tăng trưởng và việc làm, và ông Lee gọi năm 2026 là 'năm đầu tiên của một cuộc chuyển đổi lớn' cho nền kinh tế.

Dù vậy, việc số tiền có được thực hiện đúng cam kết hay không sẽ quan trọng hơn con số trên tiêu đề. Các cam kết của doanh nghiệp thường trải dài nhiều năm và có thể co lại nếu kinh tế suy yếu. Tuy nhiên, quy mô này cho thấy Hàn Quốc đang đặt cược lớn vào AI và robot để duy trì sức cạnh tranh trước Mỹ và Trung Quốc.$a20$,
$a20$ประธานาธิบดีอี แจมยองประกาศเมื่อวันที่ 29 มิถุนายน 2026 ถึงแผนการลงทุนของภาคเอกชนครั้งใหญ่ที่สุดในประวัติศาสตร์เกาหลีใต้ แนวคิดคือให้ภาคธุรกิจลงทุนราว 1,000 ล้านล้านวอน หรือประมาณ 6.5 แสนล้านดอลลาร์สหรัฐ ในสิบปีข้างหน้า โดยมีกลุ่มซัมซุงเป็นแกนหลักของคำมั่นนี้

รัฐบาลอธิบายแผนนี้ผ่านสิ่งที่อีเรียกว่า 'สามแกน' ทางเทคโนโลยี ได้แก่ เซมิคอนดักเตอร์เป็น 'สมอง' ศูนย์ข้อมูล AI เป็นหน่วยความจำ และ 'AI เชิงกายภาพ' หรือหุ่นยนต์และเครื่องจักรที่ทำงานในโลกจริงเป็นร่างกาย โซลกำหนดให้ AI เชิงกายภาพเป็น 'อุตสาหกรรมยุทธศาสตร์ของชาติ' และตั้งเป้าพัฒนาหุ่นยนต์อเนกประสงค์สัญชาติเกาหลีภายในไม่กี่ปี

การประกาศนี้เกิดขึ้นเกือบครบหนึ่งปีของการดำรงตำแหน่งของอี ในช่วงที่คะแนนนิยมของเขาร่วงต่ำกว่า 50% คำมั่นการลงทุนขนาดใหญ่ช่วยให้รัฐบาลแสดงว่ากำลังขับเคลื่อนการเติบโตและการจ้างงาน และอีนิยาม 2026 ว่าเป็น 'ปีแรกของการเปลี่ยนแปลงครั้งใหญ่' ของเศรษฐกิจ

อย่างไรก็ตาม เงินก้อนนี้จะเกิดขึ้นจริงตามที่สัญญาหรือไม่นั้นสำคัญกว่าตัวเลขพาดหัว คำมั่นของภาคเอกชนมักกินเวลาหลายปีและอาจหดตัวหากเศรษฐกิจอ่อนแรง กระนั้น ขนาดของแผนก็บ่งชี้ว่าเกาหลีใต้กำลังเดิมพันหนักกับ AI และหุ่นยนต์ เพื่อรักษาความสามารถในการแข่งขันกับสหรัฐฯ และจีน$a20$,
$a20$Presiden Lee Jae-myung pada 29 Juni 2026 mengumumkan rencana investasi korporasi terbesar dalam sejarah Korea Selatan. Idenya, perusahaan akan berinvestasi sekitar 1.000 triliun won, sekitar 650 miliar dolar AS, selama sepuluh tahun ke depan. Grup Samsung menjadi tulang punggung komitmen itu.

Pemerintah menyusun rencana itu berdasarkan apa yang disebut Lee 'tiga poros' teknologi: semikonduktor sebagai 'otak', pusat data AI sebagai memori, dan 'AI fisik' — robot dan mesin yang bisa bertindak di dunia nyata — sebagai tubuh. Seoul menetapkan AI fisik sebagai 'industri strategis nasional' dan menargetkan pengembangan robot serbaguna buatan dalam negeri dalam beberapa tahun.

Pengumuman itu datang hampir tepat setahun masa kepresidenan Lee, saat tingkat dukungannya turun di bawah 50 persen. Janji investasi besar memungkinkan pemerintah menunjukkan bahwa ia mendorong pertumbuhan dan lapangan kerja, dan Lee menyebut 2026 sebagai 'tahun pertama transformasi besar' ekonomi.

Namun, apakah dana itu benar-benar terwujud seperti dijanjikan akan lebih penting daripada angka di judul. Komitmen korporasi sering membentang bertahun-tahun dan bisa menyusut jika ekonomi melemah. Meski begitu, skalanya menandakan Korea Selatan bertaruh besar pada AI dan robotika untuk tetap bersaing dengan Amerika Serikat dan China.$a20$,
$a20$On June 29, 2026, President Lee Jae-myung announced South Korea's largest-ever investment pledge — about 1,000 trillion won ($650B) over ten years, led by Samsung.$a20$,
$a20$Lee Jae-myung, Korea investment plan, physical AI, Samsung, national strategic industry, Korea AI policy$a20$,
'intermediate',
3, 4, 4,
$a20$[
{"word":"대통령","reading":"daetongnyeong","reading_ja":"テトンニョン","part_of_speech":"noun","definition_en":"president (of a country)","definition_ja":"大統領","definition_zh_tw":"總統","definition_es":"presidente (de un país)","definition_de":"Präsident (eines Landes)","definition_fr":"président (d'un pays)","definition_vi":"tổng thống","definition_th":"ประธานาธิบดี","definition_id":"presiden","example_ko":"대통령이 새 계획을 발표했다.","example_en":"The president announced a new plan.","example_ja":"大統領が新しい計画を発表した。","example_zh_tw":"總統公布了新計畫。","example_es":"El presidente anunció un nuevo plan.","example_de":"Der Präsident kündigte einen neuen Plan an.","example_fr":"Le président a annoncé un nouveau plan.","example_vi":"Tổng thống công bố một kế hoạch mới.","example_th":"ประธานาธิบดีประกาศแผนใหม่","example_id":"Presiden mengumumkan rencana baru."},
{"word":"정부","reading":"jeongbu","reading_ja":"チョンブ","part_of_speech":"noun","definition_en":"government","definition_ja":"政府","definition_zh_tw":"政府","definition_es":"gobierno","definition_de":"Regierung","definition_fr":"gouvernement","definition_vi":"chính phủ","definition_th":"รัฐบาล","definition_id":"pemerintah","example_ko":"정부는 AI 산업을 키우려 한다.","example_en":"The government wants to grow the AI industry.","example_ja":"政府はAI産業を育てようとしている。","example_zh_tw":"政府想發展AI產業。","example_es":"El gobierno quiere impulsar la industria de la IA.","example_de":"Die Regierung will die KI-Branche fördern.","example_fr":"Le gouvernement veut développer l'industrie de l'IA.","example_vi":"Chính phủ muốn phát triển ngành AI.","example_th":"รัฐบาลต้องการพัฒนาอุตสาหกรรม AI","example_id":"Pemerintah ingin mengembangkan industri AI."},
{"word":"투자","reading":"tuja","reading_ja":"トゥジャ","part_of_speech":"noun","definition_en":"investment","definition_ja":"投資","definition_zh_tw":"投資","definition_es":"inversión","definition_de":"Investition","definition_fr":"investissement","definition_vi":"đầu tư","definition_th":"การลงทุน","definition_id":"investasi","example_ko":"회사가 큰 투자를 약속했다.","example_en":"The company promised a large investment.","example_ja":"会社は大きな投資を約束した。","example_zh_tw":"公司承諾了大筆投資。","example_es":"La empresa prometió una gran inversión.","example_de":"Das Unternehmen versprach eine große Investition.","example_fr":"L'entreprise a promis un investissement important.","example_vi":"Công ty đã cam kết một khoản đầu tư lớn.","example_th":"บริษัทให้คำมั่นการลงทุนก้อนใหญ่","example_id":"Perusahaan menjanjikan investasi besar."},
{"word":"정책","reading":"jeongchaek","reading_ja":"チョンチェク","part_of_speech":"noun","definition_en":"policy","definition_ja":"政策","definition_zh_tw":"政策","definition_es":"política (medida)","definition_de":"Politik; Maßnahme","definition_fr":"politique (mesure)","definition_vi":"chính sách","definition_th":"นโยบาย","definition_id":"kebijakan","example_ko":"새 정책이 경제에 영향을 준다.","example_en":"The new policy affects the economy.","example_ja":"新しい政策が経済に影響を与える。","example_zh_tw":"新政策會影響經濟。","example_es":"La nueva política afecta a la economía.","example_de":"Die neue Politik beeinflusst die Wirtschaft.","example_fr":"La nouvelle politique influe sur l'économie.","example_vi":"Chính sách mới ảnh hưởng đến nền kinh tế.","example_th":"นโยบายใหม่ส่งผลต่อเศรษฐกิจ","example_id":"Kebijakan baru itu memengaruhi ekonomi."},
{"word":"발표하다","reading":"balpyohada","reading_ja":"パルピョハダ","part_of_speech":"verb","definition_en":"to announce; to make public","definition_ja":"発表する","definition_zh_tw":"公布；發表","definition_es":"anunciar; hacer público","definition_de":"bekannt geben; ankündigen","definition_fr":"annoncer; rendre public","definition_vi":"công bố; tuyên bố","definition_th":"ประกาศ; แถลง","definition_id":"mengumumkan","example_ko":"정부가 투자 계획을 발표했다.","example_en":"The government announced the investment plan.","example_ja":"政府が投資計画を発表した。","example_zh_tw":"政府公布了投資計畫。","example_es":"El gobierno anunció el plan de inversión.","example_de":"Die Regierung gab den Investitionsplan bekannt.","example_fr":"Le gouvernement a annoncé le plan d'investissement.","example_vi":"Chính phủ đã công bố kế hoạch đầu tư.","example_th":"รัฐบาลประกาศแผนการลงทุน","example_id":"Pemerintah mengumumkan rencana investasi itu."}
]$a20$::jsonb,
'published', true, 0,
'2026-06-28T23:00:00Z', '2026-06-28T23:00:00Z', '2026-06-28T23:00:00Z'
);

-- Article 21 — 2026-06-30 education advanced — AI grading pilot, Suneung reform
INSERT INTO articles (topic_id, slug, title_en, title_ko, title_ja, title_zh_tw, title_es, title_de, title_fr, title_vi, title_th, title_id, summary_en, summary_ko, summary_ja, summary_zh_tw, summary_es, summary_de, summary_fr, summary_vi, summary_th, summary_id, content_en, content_ko, content_ja, content_zh_tw, content_es, content_de, content_fr, content_vi, content_th, content_id, seo_description, seo_keywords, level, reading_time_en, reading_time_ko, reading_time_ja, vocabulary, status, ai_generated, view_count, published_at, created_at, updated_at) VALUES (
(SELECT id FROM topics WHERE slug = 'education'),
'education-2026-06-30',
$a21$South Korea Tests AI Grading, Eyeing Reform of Its College Exam$a21$,
$a21$한국, AI 채점 시범…수능 개편까지 겨냥$a21$,
$a21$韓国、AI採点を試験導入　大学入試改革も視野$a21$,
$a21$韓國試行AI閱卷 目標改革大學入學考$a21$,
$a21$Corea del Sur prueba la corrección con IA y apunta a reformar su examen$a21$,
$a21$Südkorea testet KI-Benotung mit Blick auf Reform der Aufnahmeprüfung$a21$,
$a21$La Corée teste la correction par IA et vise à réformer son examen d'entrée$a21$,
$a21$Hàn Quốc thử chấm điểm bằng AI, hướng tới cải cách kỳ thi đại học$a21$,
$a21$เกาหลีทดลองใช้ AI ตรวจข้อสอบ เล็งปฏิรูปสอบเข้ามหาวิทยาลัย$a21$,
$a21$Korea Uji Penilaian AI, Incar Reformasi Ujian Masuk Kuliah$a21$,
$a21$South Korea is piloting AI to help grade written student answers, part of a plan to shift exams away from multiple-choice. A first trial in Gyeonggi Province could eventually inform the Suneung, the college entrance exam taken by nearly 500,000 students a year.$a21$,
$a21$한국이 학생들의 서술형 답안 채점을 돕는 AI를 시범 운영한다. 객관식 위주 시험에서 벗어나려는 계획의 일환이다. 경기도에서 시작하는 이 시범은 결국 매년 약 50만 명이 치르는 대학 입학시험인 수능에도 참고가 될 수 있다.$a21$,
$a21$韓国が、生徒の記述式解答の採点を助けるAIを試験導入する。選択式中心の試験から脱却しようとする計画の一環だ。京畿道で始まるこの試みは、いずれ毎年約50万人が受ける大学入試「修能」にも生かされる可能性がある。$a21$,
$a21$韓國正試行以AI協助批改學生的申論式答案，是要讓考試擺脫選擇題的計畫一環。這項於京畿道啟動的試驗，最終或可為每年約50萬人應考的大學入學考「修能」提供參考。$a21$,
$a21$Corea del Sur está probando la IA para ayudar a corregir respuestas escritas de los alumnos, dentro de un plan para alejar los exámenes del tipo test. Un primer ensayo en Gyeonggi podría, con el tiempo, servir de referencia para el Suneung, el examen de acceso que hacen casi 500.000 estudiantes al año.$a21$,
$a21$Südkorea erprobt KI zur Unterstützung bei der Benotung schriftlicher Schülerantworten – Teil eines Plans, Prüfungen vom Multiple-Choice-Format wegzuführen. Ein erster Test in Gyeonggi könnte später auch die Aufnahmeprüfung Suneung prägen, die jährlich fast 500.000 Schüler ablegen.$a21$,
$a21$La Corée du Sud teste l'IA pour aider à corriger les réponses écrites des élèves, dans le cadre d'un plan visant à éloigner les examens du QCM. Un premier essai à Gyeonggi pourrait à terme inspirer le Suneung, l'examen d'entrée que passent près de 500 000 élèves par an.$a21$,
$a21$Hàn Quốc đang thử nghiệm AI để hỗ trợ chấm bài viết của học sinh, nằm trong kế hoạch chuyển kỳ thi khỏi hình thức trắc nghiệm. Cuộc thử nghiệm đầu tiên ở tỉnh Gyeonggi cuối cùng có thể tham khảo cho Suneung, kỳ thi đại học mà gần 500.000 học sinh dự thi mỗi năm.$a21$,
$a21$เกาหลีใต้กำลังทดลองใช้ AI ช่วยตรวจคำตอบแบบเขียนของนักเรียน ซึ่งเป็นส่วนหนึ่งของแผนที่จะเปลี่ยนการสอบจากแบบปรนัย การทดลองครั้งแรกในจังหวัดคย็องกีอาจนำไปใช้กับ 'ซูนึง' การสอบเข้ามหาวิทยาลัยที่มีนักเรียนเกือบ 5 แสนคนสอบทุกปีในที่สุด$a21$,
$a21$Korea Selatan sedang menguji AI untuk membantu menilai jawaban tertulis siswa, bagian dari rencana menjauhkan ujian dari pilihan ganda. Uji coba pertama di Provinsi Gyeonggi akhirnya bisa menjadi acuan bagi Suneung, ujian masuk kuliah yang diikuti hampir 500.000 siswa tiap tahun.$a21$,
$a21$South Korea is testing whether artificial intelligence can help grade student work, part of a broader push to move school exams away from multiple-choice questions and toward written answers. Education officials have laid out a long-term roadmap that could eventually reach the Suneung, the national college entrance exam taken by nearly half a million students each year.

A first pilot is set to run in Gyeonggi Province, the country's most populous region, using AI to help grade written responses from first-year middle and high school students in Korean, social studies, and science. The aim is to make it practical to ask students to explain their reasoning, not just pick the right bubble.

The Suneung is famous for its intensity: on exam day, flights are grounded during the English listening test and the country all but stops. Because so much rides on the result, grading must be seen as fair and consistent — a high bar for any new system, human or machine. Written answers are harder and slower to grade at scale, which is one reason Korea has long leaned on multiple-choice.

The stakes explain the caution. AI grading could make essay-style testing practical at scale and ease teachers' heavy marking load. But on an exam that can decide a student's future, questions about bias, errors, and whether an algorithm's judgment can be trusted loom large. The pilots are designed to test those risks in ordinary classrooms first — long before any AI system is trusted with the Suneung.$a21$,
$a21$한국이 학생의 답안 채점을 인공지능(AI)이 도울 수 있는지 시험하고 있다. 이는 학교 시험을 객관식에서 서술형 답안 쪽으로 옮기려는 더 큰 흐름의 일부다. 교육 당국은 장기 로드맵을 내놨는데, 이는 결국 매년 약 50만 명이 치르는 대학 입학시험인 수능까지 이어질 수 있다.

첫 시범은 한국에서 인구가 가장 많은 지역인 경기도에서 진행될 예정이다. 중·고등학교 1학년 학생들이 국어·사회·과학에서 쓴 서술형 답안을 AI가 채점하도록 돕는 방식이다. 목표는 학생들에게 정답만 고르게 하는 것이 아니라, 자기 생각의 근거를 설명하도록 하는 시험을 현실적으로 가능하게 만드는 것이다.

수능은 그 치열함으로 유명하다. 시험 당일 영어 듣기 평가 시간에는 비행기 이착륙이 멈추고, 나라 전체가 사실상 멈춘다. 결과에 걸린 것이 워낙 커서 채점은 공정하고 일관돼 보여야 하는데, 이는 사람이든 기계든 어떤 새 방식에도 매우 높은 기준이다. 서술형 답안은 대규모로 채점하기가 더 어렵고 느린데, 이것이 한국이 오랫동안 객관식에 기대 온 이유 중 하나다.

이렇게 걸린 것이 크기에 신중할 수밖에 없다. AI 채점은 서술형 시험을 대규모로 실현 가능하게 하고 교사의 무거운 채점 부담을 덜어 줄 수 있다. 그러나 한 사람의 미래를 좌우할 수 있는 시험에서, 편향과 오류, 그리고 알고리즘의 판단을 믿을 수 있느냐는 물음이 크게 남는다. 이번 시범들은 어떤 AI 시스템이 수능을 맡기 훨씬 전에, 일반 교실에서 먼저 그 위험을 시험해 보려는 것이다.$a21$,
$a21$韓国が、生徒の答案の採点を人工知能（AI）が手助けできるかを試している。これは学校の試験を選択式から記述式解答へと移そうとする、より大きな動きの一部だ。教育当局は長期ロードマップを示しており、これはいずれ毎年約50万人が受ける大学入試「修能」にまで及ぶ可能性がある。

最初の試みは、韓国で最も人口の多い地域である京畿道で行われる予定だ。中学・高校1年生が国語・社会・科学で書いた記述式解答を、AIが採点する手助けをする方式である。目的は、生徒に正解を選ばせるだけでなく、自分の考えの根拠を説明させる試験を現実的に可能にすることだ。

修能はその激しさで有名だ。試験当日、英語のリスニング時間には飛行機の離着陸が止まり、国全体が事実上停止する。結果にかかるものがあまりに大きいため、採点は公正で一貫していると見なされねばならず、これは人でも機械でも、どんな新しい方式にとっても非常に高いハードルだ。記述式解答は大規模に採点するのがより難しく時間もかかる。これが韓国が長く選択式に頼ってきた理由の一つだ。

かかっているものが大きいからこそ、慎重にならざるを得ない。AI採点は記述式試験を大規模に実現可能にし、教師の重い採点負担を軽くできる。しかし、一人の将来を左右しうる試験で、偏りや誤り、そしてアルゴリズムの判断を信頼できるのかという問いが大きく残る。今回の試みは、いかなるAIシステムも修能を任される前に、まず普通の教室でその危険性を試そうとするものだ。$a21$,
$a21$韓國正在測試人工智慧（AI）能否協助批改學生的答案。這是要讓學校考試從選擇題轉向申論式作答的一環。教育當局提出了長期路線圖，最終有可能延伸到每年約50萬人應考的大學入學考「修能」。

首次試驗預計在韓國人口最多的京畿道進行，讓AI協助批改國中、高中一年級學生在國文、社會與科學科目寫的申論式答案。目標是讓要求學生說明自己推理過程、而非只是選出正確答案的考試，變得切實可行。

修能以激烈著稱。考試當天，英語聽力測驗時段飛機暫停起降，全國幾乎停擺。由於結果攸關重大，閱卷必須被視為公正且一致，這對任何新方式而言都是極高的門檻，無論由人或機器來做。申論式答案要大規模批改更難也更慢，這正是韓國長期倚賴選擇題的原因之一。

正因茲事體大，才不得不謹慎。AI閱卷可讓申論式考試得以大規模實行，並減輕教師沉重的批改負擔。但在一場可能左右一個人未來的考試裡，偏誤、錯誤，以及演算法判斷是否可信等疑問仍相當突出。這些試驗的用意，是在任何AI系統被託付修能之前，先在一般教室裡檢驗這些風險。$a21$,
$a21$Corea del Sur está comprobando si la inteligencia artificial puede ayudar a corregir el trabajo de los alumnos, dentro de un impulso más amplio para alejar los exámenes escolares de las preguntas tipo test y acercarlos a las respuestas escritas. Las autoridades educativas han trazado una hoja de ruta a largo plazo que, con el tiempo, podría llegar al Suneung, el examen nacional de acceso a la universidad que realizan casi medio millón de estudiantes al año.

Un primer ensayo se llevará a cabo en Gyeonggi, la región más poblada del país, usando IA para ayudar a corregir respuestas escritas de alumnos de primero de secundaria y bachillerato en lengua coreana, ciencias sociales y ciencias. El objetivo es hacer viable pedir a los estudiantes que expliquen su razonamiento, y no solo que marquen la casilla correcta.

El Suneung es famoso por su intensidad: el día del examen se detienen los vuelos durante la prueba de comprensión oral de inglés y el país casi se paraliza. Como tanto depende del resultado, la corrección debe percibirse como justa y coherente, un listón altísimo para cualquier sistema nuevo, humano o máquina. Las respuestas escritas son más difíciles y lentas de corregir a gran escala, una de las razones por las que Corea se ha apoyado tanto en el tipo test.

Lo que está en juego explica la cautela. La corrección con IA podría hacer viables exámenes más ricos, tipo ensayo, y aliviar la pesada carga de corrección del profesorado. Pero en un examen que puede decidir el futuro de un joven, pesan mucho las dudas sobre sesgos, errores y hasta qué punto se puede confiar en el juicio de un algoritmo. Los ensayos buscan poner a prueba esos riesgos primero en aulas corrientes, mucho antes de que cualquier sistema de IA llegue al propio Suneung.$a21$,
$a21$Südkorea prüft, ob künstliche Intelligenz beim Bewerten von Schülerarbeiten helfen kann – Teil eines größeren Vorstoßes, Schulprüfungen von Multiple-Choice-Fragen weg und hin zu schriftlichen Antworten zu führen. Die Bildungsbehörden haben einen langfristigen Fahrplan vorgelegt, der irgendwann auch das Suneung erreichen könnte, die nationale Hochschulaufnahmeprüfung, die jährlich fast eine halbe Million Schüler ablegen.

Ein erster Test soll in Gyeonggi stattfinden, der bevölkerungsreichsten Region des Landes, wobei KI bei der Bewertung schriftlicher Antworten von Schülern der ersten Mittel- und Oberschulklasse in Koreanisch, Sozialkunde und Naturwissenschaften helfen soll. Ziel ist es, es praktikabel zu machen, Schüler ihre Überlegungen erklären zu lassen, statt nur das richtige Kästchen anzukreuzen.

Das Suneung ist für seine Intensität bekannt: Am Prüfungstag ruht während des englischen Hörverständnistests der Flugverkehr, und das Land steht nahezu still. Weil so viel vom Ergebnis abhängt, muss die Bewertung als fair und einheitlich gelten – eine hohe Hürde für jedes neue System, ob Mensch oder Maschine. Schriftliche Antworten sind in großem Maßstab schwerer und langsamer zu bewerten, einer der Gründe, warum Korea lange auf Multiple Choice gesetzt hat.

Was auf dem Spiel steht, erklärt die Vorsicht. KI-Bewertung könnte anspruchsvollere, essayartige Prüfungen ermöglichen und die schwere Korrekturlast der Lehrer verringern. Doch bei einer Prüfung, die über die Zukunft eines jungen Menschen entscheiden kann, wiegen Fragen nach Verzerrungen, Fehlern und der Verlässlichkeit eines Algorithmus schwer. Die Pilotprojekte sollen diese Risiken zunächst in normalen Klassenzimmern testen – lange bevor ein KI-System dem Suneung anvertraut wird.$a21$,
$a21$La Corée du Sud teste si l'intelligence artificielle peut aider à corriger les travaux des élèves, dans le cadre d'une volonté plus large d'éloigner les examens scolaires des questions à choix multiples au profit de réponses rédigées. Les autorités éducatives ont tracé une feuille de route à long terme qui pourrait, à terme, concerner le Suneung, l'examen national d'entrée à l'université que passent près d'un demi-million d'élèves chaque année.

Un premier essai doit se dérouler à Gyeonggi, la région la plus peuplée du pays, en utilisant l'IA pour aider à corriger les réponses rédigées d'élèves de première année de collège et de lycée en coréen, sciences sociales et sciences. L'objectif est de rendre réaliste le fait de demander aux élèves d'expliquer leur raisonnement, et pas seulement de cocher la bonne case.

Le Suneung est réputé pour son intensité : le jour de l'examen, les vols sont suspendus pendant l'épreuve de compréhension orale d'anglais et le pays est quasiment à l'arrêt. Comme tant de choses dépendent du résultat, la correction doit être perçue comme juste et cohérente, une exigence très élevée pour tout nouveau système, humain ou machine. Les réponses rédigées sont plus difficiles et plus lentes à corriger à grande échelle, l'une des raisons pour lesquelles la Corée s'est longtemps appuyée sur le QCM.

Les enjeux expliquent la prudence. La correction par IA pourrait rendre possibles des examens plus riches, de type dissertation, et alléger la lourde charge de correction des enseignants. Mais pour un examen susceptible de décider de l'avenir d'un jeune, les interrogations sur les biais, les erreurs et la confiance à accorder au jugement d'un algorithme pèsent lourd. Les essais visent à éprouver ces risques d'abord dans des classes ordinaires, bien avant qu'un système d'IA ne soit confié au Suneung lui-même.$a21$,
$a21$Hàn Quốc đang thử xem trí tuệ nhân tạo (AI) có thể giúp chấm bài của học sinh hay không, nằm trong nỗ lực rộng hơn nhằm đưa các kỳ thi ở trường rời xa câu hỏi trắc nghiệm và hướng tới các câu trả lời viết. Giới chức giáo dục đã vạch ra một lộ trình dài hạn mà cuối cùng có thể chạm tới Suneung, kỳ thi tuyển sinh đại học quốc gia mà gần nửa triệu học sinh dự thi mỗi năm.

Cuộc thử nghiệm đầu tiên dự kiến diễn ra ở tỉnh Gyeonggi, vùng đông dân nhất cả nước, dùng AI để hỗ trợ chấm các câu trả lời viết của học sinh lớp đầu cấp trung học cơ sở và trung học phổ thông trong các môn Quốc ngữ, khoa học xã hội và khoa học. Mục tiêu là làm cho việc yêu cầu học sinh giải thích lập luận của mình, chứ không chỉ chọn ô đúng, trở nên khả thi.

Suneung nổi tiếng vì sự khốc liệt: vào ngày thi, máy bay ngừng cất và hạ cánh trong lúc thi nghe tiếng Anh, và cả nước gần như ngừng lại. Vì kết quả quá quan trọng, việc chấm điểm phải được xem là công bằng và nhất quán — một tiêu chuẩn rất cao cho bất kỳ hệ thống mới nào, dù là người hay máy. Câu trả lời viết khó và chậm chấm hơn ở quy mô lớn, một lý do khiến Hàn Quốc từ lâu dựa vào trắc nghiệm.

Những gì đặt ra giải thích cho sự thận trọng. Chấm điểm bằng AI có thể khiến các bài thi dạng luận trở nên khả thi ở quy mô lớn và giảm gánh nặng chấm bài cho giáo viên. Nhưng với một kỳ thi có thể định đoạt tương lai của một người trẻ, những câu hỏi về thiên lệch, sai sót và mức độ tin cậy vào phán đoán của thuật toán vẫn rất lớn. Các cuộc thử nghiệm nhằm kiểm tra những rủi ro đó ở lớp học bình thường trước — rất lâu trước khi bất kỳ hệ thống AI nào được giao phó Suneung.$a21$,
$a21$เกาหลีใต้กำลังทดสอบว่าปัญญาประดิษฐ์ (AI) จะช่วยตรวจงานของนักเรียนได้หรือไม่ ซึ่งเป็นส่วนหนึ่งของความพยายามในวงกว้างที่จะเปลี่ยนการสอบในโรงเรียนจากคำถามแบบปรนัยไปสู่คำตอบแบบเขียน หน่วยงานการศึกษาได้วางแผนระยะยาวที่ในที่สุดอาจไปถึง 'ซูนึง' การสอบเข้ามหาวิทยาลัยระดับชาติที่มีนักเรียนเกือบครึ่งล้านคนสอบทุกปี

การทดลองครั้งแรกจะจัดขึ้นในจังหวัดคย็องกี ซึ่งเป็นภูมิภาคที่มีประชากรมากที่สุดของประเทศ โดยใช้ AI ช่วยตรวจคำตอบแบบเขียนของนักเรียนชั้นปีแรกของมัธยมต้นและมัธยมปลายในวิชาภาษาเกาหลี สังคมศึกษา และวิทยาศาสตร์ เป้าหมายคือทำให้การขอให้นักเรียนอธิบายเหตุผลของตน ไม่ใช่แค่เลือกคำตอบที่ถูก เป็นเรื่องที่ทำได้จริง

ซูนึงขึ้นชื่อเรื่องความเข้มข้น ในวันสอบ เครื่องบินจะงดขึ้นลงระหว่างการสอบฟังภาษาอังกฤษ และทั้งประเทศแทบจะหยุดนิ่ง เนื่องจากผลสอบมีความสำคัญมาก การตรวจข้อสอบจึงต้องถูกมองว่ายุติธรรมและสม่ำเสมอ ซึ่งเป็นมาตรฐานที่สูงมากสำหรับระบบใหม่ใด ๆ ไม่ว่าจะเป็นคนหรือเครื่อง คำตอบแบบเขียนตรวจยากและช้ากว่าเมื่อทำในปริมาณมาก นี่เป็นเหตุผลหนึ่งที่เกาหลีพึ่งพาข้อสอบปรนัยมานาน

เพราะเดิมพันสูง จึงต้องระมัดระวัง การตรวจด้วย AI อาจทำให้การสอบแบบเรียงความเป็นไปได้ในวงกว้างและลดภาระการตรวจงานอันหนักหน่วงของครู แต่ในการสอบที่อาจกำหนดอนาคตของคนหนุ่มสาว คำถามเรื่องอคติ ความผิดพลาด และความน่าเชื่อถือของการตัดสินโดยอัลกอริทึม ยังคงเป็นเรื่องใหญ่ การทดลองเหล่านี้มีขึ้นเพื่อทดสอบความเสี่ยงในห้องเรียนทั่วไปก่อน นานก่อนที่ระบบ AI ใดจะได้รับความไว้วางใจให้ดูแลซูนึง$a21$,
$a21$Korea Selatan sedang menguji apakah kecerdasan buatan (AI) dapat membantu menilai pekerjaan siswa, bagian dari dorongan lebih luas untuk menjauhkan ujian sekolah dari soal pilihan ganda menuju jawaban tertulis. Otoritas pendidikan telah menyusun peta jalan jangka panjang yang pada akhirnya bisa mencapai Suneung, ujian masuk perguruan tinggi nasional yang diikuti hampir setengah juta siswa setiap tahun.

Uji coba pertama akan berlangsung di Provinsi Gyeonggi, wilayah terpadat di negara itu, menggunakan AI untuk membantu menilai jawaban tertulis siswa kelas awal SMP dan SMA dalam bahasa Korea, ilmu sosial, dan sains. Tujuannya adalah membuat praktis untuk meminta siswa menjelaskan penalaran mereka, bukan sekadar memilih jawaban yang benar.

Suneung terkenal dengan intensitasnya: pada hari ujian, penerbangan dihentikan selama tes mendengarkan bahasa Inggris dan negara nyaris berhenti. Karena begitu banyak bergantung pada hasilnya, penilaian harus dipandang adil dan konsisten — standar yang sangat tinggi bagi sistem baru mana pun, manusia atau mesin. Jawaban tertulis lebih sulit dan lambat dinilai dalam skala besar, salah satu alasan Korea lama bersandar pada pilihan ganda.

Taruhannya menjelaskan kehati-hatian ini. Penilaian AI bisa membuat ujian bergaya esai layak dilakukan dalam skala besar dan meringankan beban koreksi guru yang berat. Namun pada ujian yang bisa menentukan masa depan seorang anak muda, pertanyaan tentang bias, kesalahan, dan apakah penilaian algoritma bisa dipercaya tetap membayang besar. Uji coba ini dirancang untuk menguji risiko itu di ruang kelas biasa dulu — jauh sebelum sistem AI mana pun dipercaya menangani Suneung.$a21$,
$a21$South Korea is piloting AI to grade written answers in Gyeonggi Province, part of a plan to move exams away from multiple-choice and eventually reform the Suneung.$a21$,
$a21$AI grading, Suneung, Korea education reform, written-response exams, Gyeonggi pilot, college entrance exam$a21$,
'advanced',
3, 4, 4,
$a21$[
{"word":"시험","reading":"siheom","reading_ja":"シホム","part_of_speech":"noun","definition_en":"exam; test","definition_ja":"試験","definition_zh_tw":"考試","definition_es":"examen; prueba","definition_de":"Prüfung; Test","definition_fr":"examen; test","definition_vi":"kỳ thi; bài kiểm tra","definition_th":"การสอบ; ข้อสอบ","definition_id":"ujian; tes","example_ko":"학생들이 어려운 시험을 봤다.","example_en":"The students took a difficult exam.","example_ja":"生徒たちは難しい試験を受けた。","example_zh_tw":"學生們考了一場很難的考試。","example_es":"Los estudiantes hicieron un examen difícil.","example_de":"Die Schüler schrieben eine schwere Prüfung.","example_fr":"Les élèves ont passé un examen difficile.","example_vi":"Học sinh đã làm một bài thi khó.","example_th":"นักเรียนสอบข้อสอบที่ยาก","example_id":"Para siswa mengikuti ujian yang sulit."},
{"word":"채점","reading":"chaejeom","reading_ja":"チェジョム","part_of_speech":"noun","definition_en":"grading; marking (of exams)","definition_ja":"採点","definition_zh_tw":"批改；評分","definition_es":"corrección; calificación","definition_de":"Benotung; Korrektur","definition_fr":"correction; notation","definition_vi":"việc chấm điểm","definition_th":"การตรวจ (ข้อสอบ); การให้คะแนน","definition_id":"penilaian; pengoreksian","example_ko":"서술형 답안은 채점이 오래 걸린다.","example_en":"Grading written answers takes a long time.","example_ja":"記述式解答は採点に時間がかかる。","example_zh_tw":"申論式答案批改起來很花時間。","example_es":"Corregir respuestas escritas lleva mucho tiempo.","example_de":"Das Benoten schriftlicher Antworten dauert lange.","example_fr":"Corriger des réponses rédigées prend beaucoup de temps.","example_vi":"Việc chấm câu trả lời viết mất nhiều thời gian.","example_th":"การตรวจคำตอบแบบเขียนใช้เวลานาน","example_id":"Menilai jawaban tertulis memakan waktu lama."},
{"word":"대학","reading":"daehak","reading_ja":"テハク","part_of_speech":"noun","definition_en":"university; college","definition_ja":"大学","definition_zh_tw":"大學","definition_es":"universidad","definition_de":"Universität; Hochschule","definition_fr":"université","definition_vi":"trường đại học","definition_th":"มหาวิทยาลัย","definition_id":"universitas; perguruan tinggi","example_ko":"그는 좋은 대학에 가고 싶어 한다.","example_en":"He wants to get into a good university.","example_ja":"彼はいい大学に入りたがっている。","example_zh_tw":"他想進一所好大學。","example_es":"Quiere entrar en una buena universidad.","example_de":"Er möchte an eine gute Universität kommen.","example_fr":"Il veut entrer dans une bonne université.","example_vi":"Cậu ấy muốn vào một trường đại học tốt.","example_th":"เขาอยากเข้ามหาวิทยาลัยดี ๆ","example_id":"Ia ingin masuk universitas yang bagus."},
{"word":"평가","reading":"pyeongga","reading_ja":"ピョンガ","part_of_speech":"noun","definition_en":"evaluation; assessment","definition_ja":"評価","definition_zh_tw":"評量；評價","definition_es":"evaluación","definition_de":"Bewertung; Beurteilung","definition_fr":"évaluation","definition_vi":"sự đánh giá","definition_th":"การประเมิน","definition_id":"penilaian; evaluasi","example_ko":"새로운 평가 방법을 시험한다.","example_en":"They are testing a new assessment method.","example_ja":"新しい評価方法を試している。","example_zh_tw":"他們正在試行新的評量方式。","example_es":"Están probando un nuevo método de evaluación.","example_de":"Sie testen eine neue Bewertungsmethode.","example_fr":"Ils testent une nouvelle méthode d'évaluation.","example_vi":"Họ đang thử một phương pháp đánh giá mới.","example_th":"พวกเขากำลังทดลองวิธีประเมินแบบใหม่","example_id":"Mereka menguji metode penilaian baru."},
{"word":"공정하다","reading":"gongjeonghada","reading_ja":"コンジョンハダ","part_of_speech":"adjective","definition_en":"to be fair; to be impartial","definition_ja":"公正である","definition_zh_tw":"公正的","definition_es":"ser justo; imparcial","definition_de":"fair sein; gerecht sein","definition_fr":"être juste; équitable","definition_vi":"công bằng","definition_th":"ยุติธรรม; เที่ยงธรรม","definition_id":"adil; tidak berat sebelah","example_ko":"채점은 공정해야 한다.","example_en":"Grading must be fair.","example_ja":"採点は公正でなければならない。","example_zh_tw":"評分必須公正。","example_es":"La corrección debe ser justa.","example_de":"Die Benotung muss fair sein.","example_fr":"La notation doit être équitable.","example_vi":"Việc chấm điểm phải công bằng.","example_th":"การให้คะแนนต้องยุติธรรม","example_id":"Penilaian harus adil."}
]$a21$::jsonb,
'published', true, 0,
'2026-06-29T23:00:00Z', '2026-06-29T23:00:00Z', '2026-06-29T23:00:00Z'
);
```

## Batch 4 — articles 22–28 + daily_summaries

```sql
-- Article 22 — 2026-07-01 economy beginner — 2027 minimum wage negotiations
INSERT INTO articles (topic_id, slug, title_en, title_ko, title_ja, title_zh_tw, title_es, title_de, title_fr, title_vi, title_th, title_id, summary_en, summary_ko, summary_ja, summary_zh_tw, summary_es, summary_de, summary_fr, summary_vi, summary_th, summary_id, content_en, content_ko, content_ja, content_zh_tw, content_es, content_de, content_fr, content_vi, content_th, content_id, seo_description, seo_keywords, level, reading_time_en, reading_time_ko, reading_time_ja, vocabulary, status, ai_generated, view_count, published_at, created_at, updated_at) VALUES (
(SELECT id FROM topics WHERE slug = 'economy'),
'economy-2026-07-01',
$a22$South Korea Debates Its 2027 Minimum Wage$a22$,
$a22$한국, 2027년 최저임금 놓고 협상$a22$,
$a22$韓国、2027年の最低賃金めぐり交渉$a22$,
$a22$韓國就2027年最低工資展開協商$a22$,
$a22$Corea del Sur negocia su salario mínimo para 2027$a22$,
$a22$Südkorea verhandelt über den Mindestlohn 2027$a22$,
$a22$La Corée du Sud négocie son salaire minimum pour 2027$a22$,
$a22$Hàn Quốc thương lượng mức lương tối thiểu năm 2027$a22$,
$a22$เกาหลีใต้เจรจาค่าแรงขั้นต่ำปี 2027$a22$,
$a22$Korea Selatan Rundingkan Upah Minimum 2027$a22$,
$a22$In early July 2026, South Korea's Minimum Wage Commission was negotiating the 2027 minimum hourly wage. Labor asked for 11,700 won and business offered 10,410 won, up from the 2026 rate of 10,320 won — a decision affecting millions of low-wage workers.$a22$,
$a22$2026년 7월 초, 한국의 최저임금위원회가 2027년 시간당 최저임금을 협상 중이었다. 노동계는 1만1700원을, 경영계는 1만410원을 제시했다. 2026년 최저임금인 1만320원보다 오른 금액으로, 수많은 저임금 노동자에게 영향을 미치는 결정이다.$a22$,
$a22$2026年7月初め、韓国の最低賃金委員会が2027年の時給の最低賃金を交渉していた。労働側は1万1700ウォン、経営側は1万410ウォンを提示した。2026年の1万320ウォンより高い水準で、多くの低賃金労働者に影響する決定だ。$a22$,
$a22$2026年7月初，韓國最低工資委員會正就2027年的時薪最低工資協商。勞方提出1萬1700韓元，資方提出1萬410韓元，均高於2026年的1萬320韓元。這項決定將影響數以百萬計的低薪勞工。$a22$,
$a22$A comienzos de julio de 2026, la Comisión del Salario Mínimo de Corea del Sur negociaba el salario mínimo por hora de 2027. Los sindicatos pedían 11.700 wones y la patronal ofrecía 10.410, por encima de los 10.320 de 2026, en una decisión que afecta a millones de trabajadores con bajos salarios.$a22$,
$a22$Anfang Juli 2026 verhandelte Südkoreas Mindestlohnkommission über den Stundenmindestlohn 2027. Die Arbeitnehmerseite forderte 11.700 Won, die Arbeitgeber boten 10.410 Won – mehr als die 10.320 Won von 2026. Die Entscheidung betrifft Millionen Geringverdiener.$a22$,
$a22$Début juillet 2026, la Commission du salaire minimum de Corée du Sud négociait le salaire minimum horaire de 2027. Les syndicats demandaient 11 700 wons et le patronat offrait 10 410 wons, contre 10 320 en 2026 — une décision qui touche des millions de travailleurs à bas salaire.$a22$,
$a22$Đầu tháng 7 năm 2026, Ủy ban Lương tối thiểu Hàn Quốc đang thương lượng mức lương tối thiểu theo giờ cho năm 2027. Phía lao động đề nghị 11.700 won, phía doanh nghiệp đưa ra 10.410 won, cao hơn mức 10.320 won của năm 2026 — quyết định ảnh hưởng đến hàng triệu lao động lương thấp.$a22$,
$a22$ต้นเดือนกรกฎาคม 2026 คณะกรรมการค่าจ้างขั้นต่ำของเกาหลีใต้กำลังเจรจาค่าจ้างขั้นต่ำรายชั่วโมงสำหรับปี 2027 ฝ่ายแรงงานเสนอ 11,700 วอน ขณะที่ฝ่ายนายจ้างเสนอ 10,410 วอน สูงกว่าค่าจ้างปี 2026 ที่ 10,320 วอน การตัดสินใจนี้ส่งผลต่อแรงงานค่าจ้างต่ำหลายล้านคน$a22$,
$a22$Pada awal Juli 2026, Komisi Upah Minimum Korea Selatan tengah merundingkan upah minimum per jam untuk 2027. Pihak buruh meminta 11.700 won dan pihak pengusaha menawarkan 10.410 won, lebih tinggi dari tarif 2026 sebesar 10.320 won — keputusan yang memengaruhi jutaan pekerja berupah rendah.$a22$,
$a22$South Korea is deciding how much its lowest-paid workers should earn next year. In early July 2026, a group called the Minimum Wage Commission was negotiating the minimum hourly wage for 2027. Labor unions asked for 11,700 won, while employers offered 10,410 won.

The minimum wage is the least amount a company can legally pay a worker for one hour of work. In 2026 it is 10,320 won per hour, a little under 8 US dollars. Every summer, worker and business representatives meet to set the next year's rate, and they often disagree.

Workers say a higher wage helps people keep up with rising prices. Business owners, especially small shops, say paying more is hard when costs are already high. If the two sides cannot agree, neutral members of the commission help decide. The final number affects millions of part-time and low-wage workers across the country.$a22$,
$a22$한국이 내년에 가장 낮은 임금을 받는 노동자들이 얼마를 벌어야 할지 정하고 있다. 2026년 7월 초, 최저임금위원회라는 기구가 2027년 시간당 최저임금을 협상하고 있었다. 노동조합은 1만1700원을 요구했고, 사용자 측은 1만410원을 제시했다.

최저임금은 회사가 한 시간 일한 노동자에게 법적으로 줄 수 있는 가장 적은 금액이다. 2026년에는 시간당 1만320원으로, 미화로 8달러가 조금 안 된다. 매년 여름 노동자와 기업 대표가 만나 다음 해의 금액을 정하는데, 서로 의견이 다를 때가 많다.

노동자들은 임금이 오르면 물가 상승을 따라가는 데 도움이 된다고 말한다. 특히 작은 가게를 하는 사업주들은 이미 비용이 높은데 임금을 더 주기는 어렵다고 말한다. 양측이 합의하지 못하면 위원회의 중립적인 위원들이 결정을 돕는다. 최종 금액은 전국의 수많은 아르바이트생과 저임금 노동자에게 영향을 준다.$a22$,
$a22$韓国が、来年、最も低い賃金を受け取る労働者がいくら稼ぐべきかを決めようとしている。2026年7月初め、最低賃金委員会という機関が2027年の時給の最低賃金を交渉していた。労働組合は1万1700ウォンを求め、使用者側は1万410ウォンを提示した。

最低賃金とは、会社が1時間働いた労働者に法的に支払える最も少ない金額だ。2026年は時給1万320ウォンで、米ドルで8ドルに少し足りない。毎年夏、労働者と企業の代表が集まって翌年の金額を決めるが、意見が食い違うことが多い。

労働者は、賃金が上がれば物価の上昇に追いつくのに役立つと言う。特に小さな店を営む事業主は、すでにコストが高い中で賃金をさらに払うのは難しいと言う。両者が合意できなければ、委員会の中立の委員が決定を手助けする。最終的な金額は、全国の多くのアルバイトや低賃金労働者に影響する。$a22$,
$a22$韓國正在決定明年最低薪的勞工該領多少錢。2026年7月初，一個名為最低工資委員會的機構正在協商2027年的時薪最低工資。工會要求1萬1700韓元，資方則提出1萬410韓元。

最低工資是公司依法支付勞工工作一小時的最低金額。2026年為每小時1萬320韓元，換算美元略低於8美元。每年夏天，勞方與企業代表都會開會決定隔年的金額，雙方常意見不合。

勞工說，工資調高有助於跟上物價上漲。經營小店的業主則說，成本已經很高，再多付薪水很吃力。若雙方無法達成協議，委員會的中立委員會協助做出決定。最終金額將影響全國數以百萬計的兼職與低薪勞工。$a22$,
$a22$Corea del Sur está decidiendo cuánto deberían ganar el año que viene sus trabajadores peor pagados. A comienzos de julio de 2026, un organismo llamado Comisión del Salario Mínimo negociaba el salario mínimo por hora de 2027. Los sindicatos pedían 11.700 wones y la parte empresarial ofrecía 10.410 wones.

El salario mínimo es la cantidad más baja que una empresa puede pagar legalmente a un trabajador por una hora de trabajo. En 2026 es de 10.320 wones la hora, algo menos de 8 dólares. Cada verano, representantes de los trabajadores y de las empresas se reúnen para fijar la cifra del año siguiente, y a menudo no se ponen de acuerdo.

Los trabajadores dicen que un salario más alto ayuda a seguir el ritmo de la subida de precios. Los empresarios, sobre todo los de pequeños comercios, dicen que pagar más es difícil cuando los costes ya son altos. Si las dos partes no llegan a un acuerdo, los miembros neutrales de la comisión ayudan a decidir. La cifra final afecta a millones de trabajadores a tiempo parcial y con salarios bajos en todo el país.$a22$,
$a22$Südkorea entscheidet, wie viel seine am schlechtesten bezahlten Arbeitnehmer im nächsten Jahr verdienen sollen. Anfang Juli 2026 verhandelte ein Gremium namens Mindestlohnkommission über den Stundenmindestlohn für 2027. Die Gewerkschaften forderten 11.700 Won, die Arbeitgeberseite bot 10.410 Won.

Der Mindestlohn ist der niedrigste Betrag, den ein Unternehmen einem Arbeitnehmer für eine Arbeitsstunde gesetzlich zahlen darf. 2026 sind es 10.320 Won pro Stunde, etwas weniger als 8 US-Dollar. Jeden Sommer treffen sich Vertreter von Arbeitnehmern und Unternehmen, um den Betrag für das nächste Jahr festzulegen, und oft sind sie sich uneinig.

Arbeitnehmer sagen, ein höherer Lohn helfe, mit steigenden Preisen Schritt zu halten. Unternehmer, vor allem kleine Läden, sagen, mehr zu zahlen sei schwierig, wenn die Kosten ohnehin hoch sind. Können sich beide Seiten nicht einigen, helfen die neutralen Mitglieder der Kommission bei der Entscheidung. Die endgültige Zahl betrifft Millionen von Teilzeit- und Geringverdienern im ganzen Land.$a22$,
$a22$La Corée du Sud est en train de décider combien devraient gagner l'an prochain ses travailleurs les moins payés. Début juillet 2026, un organisme appelé Commission du salaire minimum négociait le salaire minimum horaire pour 2027. Les syndicats demandaient 11 700 wons et le patronat proposait 10 410 wons.

Le salaire minimum est le montant le plus bas qu'une entreprise peut légalement verser à un salarié pour une heure de travail. En 2026, il est de 10 320 wons de l'heure, un peu moins de 8 dollars. Chaque été, des représentants des salariés et des entreprises se réunissent pour fixer le montant de l'année suivante, et ils sont souvent en désaccord.

Les travailleurs disent qu'un salaire plus élevé aide à suivre la hausse des prix. Les patrons, surtout des petits commerces, disent qu'il est difficile de payer davantage quand les coûts sont déjà élevés. Si les deux parties ne parviennent pas à s'entendre, les membres neutres de la commission aident à trancher. Le chiffre final concerne des millions de travailleurs à temps partiel et à bas salaire dans tout le pays.$a22$,
$a22$Hàn Quốc đang quyết định người lao động được trả thấp nhất nên kiếm bao nhiêu vào năm tới. Đầu tháng 7 năm 2026, một cơ quan có tên Ủy ban Lương tối thiểu đang thương lượng mức lương tối thiểu theo giờ cho năm 2027. Các công đoàn yêu cầu 11.700 won, trong khi phía chủ sử dụng lao động đưa ra 10.410 won.

Lương tối thiểu là số tiền thấp nhất mà một công ty được phép trả hợp pháp cho người lao động cho một giờ làm việc. Năm 2026, mức này là 10.320 won mỗi giờ, hơi dưới 8 đô la Mỹ. Mỗi mùa hè, đại diện người lao động và doanh nghiệp gặp nhau để ấn định mức của năm sau, và họ thường bất đồng.

Người lao động nói rằng mức lương cao hơn giúp theo kịp giá cả tăng. Các chủ doanh nghiệp, nhất là những cửa hàng nhỏ, nói rằng trả thêm là khó khi chi phí đã cao. Nếu hai bên không thể thống nhất, các thành viên trung lập của ủy ban sẽ giúp quyết định. Con số cuối cùng ảnh hưởng đến hàng triệu lao động bán thời gian và lương thấp trên khắp cả nước.$a22$,
$a22$เกาหลีใต้กำลังตัดสินใจว่าปีหน้าแรงงานที่ได้ค่าจ้างต่ำที่สุดควรได้รับเท่าใด ต้นเดือนกรกฎาคม 2026 หน่วยงานที่เรียกว่าคณะกรรมการค่าจ้างขั้นต่ำกำลังเจรจาค่าจ้างขั้นต่ำรายชั่วโมงสำหรับปี 2027 สหภาพแรงงานเรียกร้อง 11,700 วอน ขณะที่ฝ่ายนายจ้างเสนอ 10,410 วอน

ค่าจ้างขั้นต่ำคือจำนวนเงินต่ำที่สุดที่บริษัทสามารถจ่ายให้ลูกจ้างตามกฎหมายสำหรับการทำงานหนึ่งชั่วโมง ในปี 2026 อยู่ที่ 10,320 วอนต่อชั่วโมง หรือน้อยกว่า 8 ดอลลาร์สหรัฐเล็กน้อย ทุกฤดูร้อน ตัวแทนฝ่ายแรงงานและฝ่ายธุรกิจจะมาประชุมกันเพื่อกำหนดตัวเลขของปีถัดไป และมักมีความเห็นไม่ตรงกัน

ฝ่ายแรงงานบอกว่าค่าจ้างที่สูงขึ้นช่วยให้ตามทันราคาสินค้าที่แพงขึ้น ส่วนเจ้าของธุรกิจ โดยเฉพาะร้านเล็ก ๆ บอกว่าการจ่ายเพิ่มเป็นเรื่องยากเมื่อต้นทุนสูงอยู่แล้ว หากทั้งสองฝ่ายตกลงกันไม่ได้ กรรมการที่เป็นกลางของคณะกรรมการจะช่วยตัดสิน ตัวเลขสุดท้ายส่งผลต่อแรงงานพาร์ตไทม์และแรงงานค่าจ้างต่ำหลายล้านคนทั่วประเทศ$a22$,
$a22$Korea Selatan sedang menentukan berapa yang seharusnya diterima pekerja dengan bayaran terendah tahun depan. Pada awal Juli 2026, sebuah lembaga bernama Komisi Upah Minimum tengah merundingkan upah minimum per jam untuk 2027. Serikat buruh meminta 11.700 won, sementara pihak pengusaha menawarkan 10.410 won.

Upah minimum adalah jumlah terendah yang secara hukum boleh dibayarkan perusahaan kepada pekerja untuk satu jam kerja. Pada 2026, jumlahnya 10.320 won per jam, sedikit di bawah 8 dolar AS. Setiap musim panas, perwakilan pekerja dan perusahaan bertemu untuk menetapkan angka tahun berikutnya, dan mereka sering berbeda pendapat.

Para pekerja mengatakan upah yang lebih tinggi membantu mengimbangi kenaikan harga. Para pemilik usaha, terutama toko kecil, mengatakan membayar lebih itu sulit ketika biaya sudah tinggi. Jika kedua pihak tak bisa sepakat, anggota netral komisi membantu memutuskan. Angka akhir memengaruhi jutaan pekerja paruh waktu dan berupah rendah di seluruh negeri.$a22$,
$a22$In early July 2026, South Korea's Minimum Wage Commission negotiated the 2027 rate: labor asked 11,700 won, business offered 10,410 won, up from 2026's 10,320 won.$a22$,
$a22$Korea minimum wage, 2027 minimum wage, Minimum Wage Commission, Korean workers, wage negotiation, low-wage workers$a22$,
'beginner',
3, 4, 4,
$a22$[
{"word":"최저임금","reading":"choejeoimgeum","reading_ja":"チェジョイムグム","part_of_speech":"noun","definition_en":"minimum wage","definition_ja":"最低賃金","definition_zh_tw":"最低工資","definition_es":"salario mínimo","definition_de":"Mindestlohn","definition_fr":"salaire minimum","definition_vi":"lương tối thiểu","definition_th":"ค่าจ้างขั้นต่ำ","definition_id":"upah minimum","example_ko":"최저임금이 조금 올랐다.","example_en":"The minimum wage rose a little.","example_ja":"最低賃金が少し上がった。","example_zh_tw":"最低工資漲了一點。","example_es":"El salario mínimo subió un poco.","example_de":"Der Mindestlohn ist etwas gestiegen.","example_fr":"Le salaire minimum a un peu augmenté.","example_vi":"Lương tối thiểu đã tăng một chút.","example_th":"ค่าจ้างขั้นต่ำเพิ่มขึ้นเล็กน้อย","example_id":"Upah minimum naik sedikit."},
{"word":"노동자","reading":"nodongja","reading_ja":"ノドンジャ","part_of_speech":"noun","definition_en":"worker; laborer","definition_ja":"労働者","definition_zh_tw":"勞工","definition_es":"trabajador","definition_de":"Arbeiter; Arbeitnehmer","definition_fr":"travailleur","definition_vi":"người lao động","definition_th":"แรงงาน; คนงาน","definition_id":"pekerja; buruh","example_ko":"많은 노동자가 임금 인상을 원한다.","example_en":"Many workers want a pay raise.","example_ja":"多くの労働者が賃上げを望んでいる。","example_zh_tw":"許多勞工希望加薪。","example_es":"Muchos trabajadores quieren un aumento de sueldo.","example_de":"Viele Arbeitnehmer wünschen sich eine Lohnerhöhung.","example_fr":"Beaucoup de travailleurs veulent une hausse de salaire.","example_vi":"Nhiều người lao động muốn được tăng lương.","example_th":"แรงงานจำนวนมากต้องการขึ้นค่าจ้าง","example_id":"Banyak pekerja menginginkan kenaikan upah."},
{"word":"임금","reading":"imgeum","reading_ja":"イムグム","part_of_speech":"noun","definition_en":"wage; pay","definition_ja":"賃金","definition_zh_tw":"工資；薪資","definition_es":"salario; sueldo","definition_de":"Lohn","definition_fr":"salaire","definition_vi":"tiền lương","definition_th":"ค่าจ้าง","definition_id":"upah; gaji","example_ko":"임금이 물가보다 천천히 오른다.","example_en":"Wages rise more slowly than prices.","example_ja":"賃金は物価よりゆっくり上がる。","example_zh_tw":"工資漲得比物價慢。","example_es":"Los salarios suben más despacio que los precios.","example_de":"Die Löhne steigen langsamer als die Preise.","example_fr":"Les salaires augmentent plus lentement que les prix.","example_vi":"Tiền lương tăng chậm hơn giá cả.","example_th":"ค่าจ้างขึ้นช้ากว่าราคาสินค้า","example_id":"Upah naik lebih lambat daripada harga."},
{"word":"협상","reading":"hyeopsang","reading_ja":"ヒョプサン","part_of_speech":"noun","definition_en":"negotiation","definition_ja":"交渉","definition_zh_tw":"協商；談判","definition_es":"negociación","definition_de":"Verhandlung","definition_fr":"négociation","definition_vi":"sự thương lượng; đàm phán","definition_th":"การเจรจา","definition_id":"negosiasi; perundingan","example_ko":"임금 협상이 아직 끝나지 않았다.","example_en":"The wage negotiations are not over yet.","example_ja":"賃金交渉はまだ終わっていない。","example_zh_tw":"工資協商還沒結束。","example_es":"La negociación salarial aún no ha terminado.","example_de":"Die Lohnverhandlungen sind noch nicht beendet.","example_fr":"Les négociations salariales ne sont pas encore terminées.","example_vi":"Cuộc thương lượng tiền lương vẫn chưa kết thúc.","example_th":"การเจรจาค่าจ้างยังไม่สิ้นสุด","example_id":"Negosiasi upah belum selesai."},
{"word":"오르다","reading":"oreuda","reading_ja":"オルダ","part_of_speech":"verb","definition_en":"to rise; to go up","definition_ja":"上がる","definition_zh_tw":"上漲；上升","definition_es":"subir; aumentar","definition_de":"steigen","definition_fr":"augmenter; monter","definition_vi":"tăng; lên","definition_th":"ขึ้น; เพิ่มขึ้น","definition_id":"naik; meningkat","example_ko":"내년에 임금이 오를 것이다.","example_en":"Wages will go up next year.","example_ja":"来年、賃金が上がるだろう。","example_zh_tw":"明年工資會上漲。","example_es":"Los salarios subirán el año que viene.","example_de":"Nächstes Jahr werden die Löhne steigen.","example_fr":"Les salaires augmenteront l'an prochain.","example_vi":"Sang năm tiền lương sẽ tăng.","example_th":"ปีหน้าค่าจ้างจะขึ้น","example_id":"Tahun depan upah akan naik."}
]$a22$::jsonb,
'published', true, 0,
'2026-06-30T23:00:00Z', '2026-06-30T23:00:00Z', '2026-06-30T23:00:00Z'
);

-- Article 23 — 2026-07-03 society intermediate — deadly heat wave, outdoor worker protections
INSERT INTO articles (topic_id, slug, title_en, title_ko, title_ja, title_zh_tw, title_es, title_de, title_fr, title_vi, title_th, title_id, summary_en, summary_ko, summary_ja, summary_zh_tw, summary_es, summary_de, summary_fr, summary_vi, summary_th, summary_id, content_en, content_ko, content_ja, content_zh_tw, content_es, content_de, content_fr, content_vi, content_th, content_id, seo_description, seo_keywords, level, reading_time_en, reading_time_ko, reading_time_ja, vocabulary, status, ai_generated, view_count, published_at, created_at, updated_at) VALUES (
(SELECT id FROM topics WHERE slug = 'society'),
'society-2026-07-03',
$a23$Deadly Heat Wave Prompts New Rest Rules for Korea's Outdoor Workers$a23$,
$a23$살인적 폭염에 야외 노동자 휴식 의무화$a23$,
$a23$猛烈な暑さで屋外労働者に休憩義務化$a23$,
$a23$致命熱浪 韓國強制戶外勞工休息$a23$,
$a23$Ola de calor mortal obliga a nuevas pausas para trabajadores al aire libre$a23$,
$a23$Tödliche Hitzewelle: neue Pausenregeln für Koreas Außenarbeiter$a23$,
$a23$Canicule meurtrière : nouvelles pauses pour les travailleurs en extérieur$a23$,
$a23$Nắng nóng chết người: quy định nghỉ mới cho lao động ngoài trời$a23$,
$a23$คลื่นความร้อนคร่าชีวิต เกาหลีบังคับพักงานกลางแจ้ง$a23$,
$a23$Gelombang Panas Mematikan Picu Aturan Istirahat Pekerja Luar Ruang$a23$,
$a23$A deadly heat wave in early July 2026 killed and sickened outdoor workers in South Korea, with over 1,000 heat-illness cases reported. The government now requires outdoor workers to rest 20 minutes every two hours when the apparent temperature tops 33°C.$a23$,
$a23$2026년 7월 초 살인적인 폭염으로 한국의 야외 노동자들이 숨지거나 병원에 실려 갔고, 온열질환 사례가 1000건 넘게 보고됐다. 정부는 체감온도가 33도를 넘으면 야외 노동자에게 2시간마다 20분씩 쉬도록 의무화했다.$a23$,
$a23$2026年7月初めの猛烈な暑さで韓国の屋外労働者が死亡・搬送され、熱中症の症例が1000件超報告された。政府は体感温度が33度を超える場合、屋外労働者に2時間ごとに20分の休憩を義務づけた。$a23$,
$a23$2026年7月初的致命熱浪造成韓國戶外勞工死亡或送醫，通報的熱傷害病例超過1000件。政府現規定，體感溫度超過33度時，戶外勞工每兩小時須休息20分鐘。$a23$,
$a23$Una ola de calor mortal a principios de julio de 2026 mató y enfermó a trabajadores al aire libre en Corea del Sur, con más de 1.000 casos de golpe de calor. El gobierno exige ahora que descansen 20 minutos cada dos horas cuando la sensación térmica supera los 33 °C.$a23$,
$a23$Eine tödliche Hitzewelle Anfang Juli 2026 tötete und erkrankte Außenarbeiter in Südkorea; über 1.000 Fälle von Hitzeerkrankung wurden gemeldet. Die Regierung verlangt nun 20 Minuten Pause alle zwei Stunden, wenn die gefühlte Temperatur 33 °C übersteigt.$a23$,
$a23$Une canicule meurtrière début juillet 2026 a tué et rendu malades des travailleurs en extérieur en Corée du Sud, avec plus de 1 000 cas de malaise dus à la chaleur. Le gouvernement impose désormais 20 minutes de repos toutes les deux heures quand la température ressentie dépasse 33 °C.$a23$,
$a23$Đợt nắng nóng chết người đầu tháng 7 năm 2026 đã khiến lao động ngoài trời ở Hàn Quốc tử vong và đổ bệnh, với hơn 1.000 ca bệnh do nóng được ghi nhận. Chính phủ nay yêu cầu lao động ngoài trời nghỉ 20 phút mỗi hai giờ khi nhiệt độ cảm nhận vượt 33°C.$a23$,
$a23$คลื่นความร้อนอันตรายต้นเดือนกรกฎาคม 2026 คร่าชีวิตและทำให้แรงงานกลางแจ้งในเกาหลีใต้ล้มป่วย โดยมีรายงานผู้ป่วยจากความร้อนกว่า 1,000 ราย รัฐบาลกำหนดให้แรงงานกลางแจ้งพัก 20 นาทีทุกสองชั่วโมงเมื่ออุณหภูมิที่รู้สึกได้เกิน 33 องศาเซลเซียส$a23$,
$a23$Gelombang panas mematikan pada awal Juli 2026 menewaskan dan menyakiti pekerja luar ruang di Korea Selatan, dengan lebih dari 1.000 kasus sakit akibat panas dilaporkan. Pemerintah kini mewajibkan pekerja luar ruang beristirahat 20 menit setiap dua jam saat suhu terasa melewati 33°C.$a23$,
$a23$A severe heat wave gripping South Korea in early July 2026 has killed and hospitalized outdoor workers, pushing the government to tighten safety rules. On July 3, a Filipino seasonal worker in his 30s was found unconscious in a field in Yeongju, and days earlier a Vietnamese day laborer in his 20s died at a construction site in Gumi, both in North Gyeongsang Province.

More than 1,000 cases of heat-related illness had been reported in recent days — over twice as many as at the same point last year. Many of the victims are outdoor laborers, including migrant workers, who work through the hottest hours at construction sites, farms, and factories.

In response, South Korea revised its workplace safety standards to require that outdoor workers get at least 20 minutes of rest every two hours when the 'apparent temperature' — how hot it feels with humidity — passes 33 degrees Celsius. The rule was set to take effect within days, after labor groups had pressed for stronger protections.

Summers in Korea have grown hotter and more humid, and heat waves now arrive earlier and last longer. The deaths have renewed a debate about how to protect the most vulnerable workers, from mandatory breaks to cooling stations and limits on outdoor work during peak heat. For millions of Koreans, staying safe in summer has become a serious daily concern.$a23$,
$a23$2026년 7월 초 한국을 덮친 심각한 폭염으로 야외 노동자들이 숨지거나 병원에 실려 가면서, 정부가 안전 규정을 강화했다. 7월 3일 경상북도 영주의 한 밭에서 30대 필리핀 계절노동자가 의식을 잃은 채 발견됐고, 며칠 전에는 같은 경북 구미의 한 건설 현장에서 20대 베트남 일용직 노동자가 숨졌다.

최근 며칠 사이 온열질환 사례가 1000건 넘게 보고됐는데, 이는 지난해 같은 시점의 두 배가 넘는다. 피해자 상당수는 건설 현장과 농장, 공장에서 가장 더운 시간에 일하는 이주노동자를 포함한 야외 노동자들이다.

이에 한국은 산업안전보건 기준을 개정해, 습도까지 반영해 실제로 얼마나 덥게 느껴지는지를 나타내는 '체감온도'가 33도를 넘을 때 야외 노동자에게 2시간마다 최소 20분의 휴식을 주도록 했다. 노동단체들이 더 강한 보호를 요구해 온 끝에, 이 규정은 며칠 안에 시행될 예정이었다.

한국의 여름은 점점 더 덥고 습해졌으며, 폭염도 더 일찍 시작되고 더 오래 이어진다. 이번 사망 사고들은 가장 취약한 노동자를 어떻게 보호할지를 두고, 의무 휴식부터 무더위 쉼터, 폭염 시간대 야외 작업 제한까지 다시 논의에 불을 붙였다. 수많은 한국인에게 여름을 안전하게 나는 일은 심각한 일상의 걱정거리가 되었다.$a23$,
$a23$2026年7月初め、韓国を襲った深刻な猛暑で屋外労働者が死亡・搬送され、政府が安全規定を強化した。7月3日、慶尚北道・栄州の畑で30代のフィリピン人季節労働者が意識を失った状態で見つかり、その数日前には同じ慶北・亀尾の建設現場で20代のベトナム人日雇い労働者が亡くなった。

ここ数日で熱中症の症例が1000件を超えて報告され、これは昨年の同時期の2倍以上だ。被害者の多くは、建設現場や農場、工場で最も暑い時間帯に働く移住労働者を含む屋外労働者だ。

これを受けて韓国は労働安全衛生基準を改定し、湿度も反映して実際にどれだけ暑く感じるかを示す「体感温度」が33度を超えるとき、屋外労働者に2時間ごとに少なくとも20分の休憩を与えるよう義務づけた。労働団体がより強い保護を求めてきた末に、この規定は数日以内に施行される予定だった。

韓国の夏はますます暑く湿度も高くなり、猛暑も早く始まって長く続くようになった。今回の死亡事故は、最も弱い立場の労働者をどう守るかをめぐり、休憩の義務化から涼み処の設置、猛暑時間帯の屋外作業の制限まで、議論に改めて火をつけた。多くの韓国人にとって、夏を安全に過ごすことは深刻な日常の悩みになっている。$a23$,
$a23$2026年7月初，一波嚴重熱浪襲擊韓國，造成戶外勞工死亡或送醫，促使政府強化安全規定。7月3日，慶尚北道榮州的一處田地發現一名30多歲的菲律賓季節工人昏迷；數天前，同樣位於慶北的龜尾一處工地，一名20多歲的越南日薪工人身亡。

近日通報的熱傷害病例超過1000件，是去年同期的兩倍多。多數受害者是在工地、農場與工廠最熱時段工作的戶外勞工，其中包括移工。

為此，韓國修訂了職業安全衛生標準，規定當反映濕度、代表實際體感有多熱的「體感溫度」超過33度時，戶外勞工每兩小時至少須休息20分鐘。在勞工團體不斷要求加強保護後，這項規定預計數天內生效。

韓國的夏天愈來愈熱、愈來愈潮濕，熱浪也來得更早、持續更久。這些死亡事件再次掀起討論：該如何保護最脆弱的勞工，從強制休息、消暑站，到在酷熱時段限制戶外作業。對許多韓國人而言，安全度過夏天已成為切身的日常煩惱。$a23$,
$a23$Una grave ola de calor que azotó Corea del Sur a principios de julio de 2026 mató y hospitalizó a trabajadores al aire libre, lo que llevó al gobierno a endurecer las normas de seguridad. El 3 de julio, un trabajador temporal filipino de unos 30 años fue hallado inconsciente en un campo de Yeongju, y días antes un jornalero vietnamita de unos 20 años murió en una obra de Gumi, ambas en la provincia de Gyeongsang del Norte.

En los últimos días se habían notificado más de 1.000 casos de enfermedad por calor, más del doble que en el mismo periodo del año anterior. Muchas de las víctimas son trabajadores al aire libre, incluidos migrantes, que trabajan en las horas más calurosas en obras, campos y fábricas.

En respuesta, Corea del Sur revisó sus normas de seguridad laboral para exigir que los trabajadores al aire libre descansen al menos 20 minutos cada dos horas cuando la 'sensación térmica' —lo caluroso que se siente con la humedad— supera los 33 grados Celsius. La norma iba a entrar en vigor en cuestión de días, tras la presión de los sindicatos por mayores protecciones.

Los veranos en Corea son cada vez más calurosos y húmedos, y las olas de calor llegan antes y duran más. Las muertes han reavivado el debate sobre cómo proteger a los trabajadores más vulnerables, desde las pausas obligatorias hasta los puntos de refrigeración y los límites al trabajo al aire libre en las horas de más calor. Para millones de coreanos, mantenerse a salvo en verano se ha vuelto una seria preocupación diaria.$a23$,
$a23$Eine schwere Hitzewelle, die Anfang Juli 2026 Südkorea erfasste, tötete Außenarbeiter und brachte sie ins Krankenhaus – die Regierung verschärfte daraufhin die Sicherheitsregeln. Am 3. Juli wurde ein philippinischer Saisonarbeiter Anfang 30 bewusstlos auf einem Feld in Yeongju gefunden, und Tage zuvor starb ein vietnamesischer Tagelöhner Anfang 20 auf einer Baustelle in Gumi, beide in der Provinz Nord-Gyeongsang.

In den vergangenen Tagen waren mehr als 1.000 Fälle von Hitzeerkrankung gemeldet worden, mehr als doppelt so viele wie im gleichen Zeitraum des Vorjahres. Viele der Opfer sind Außenarbeiter, darunter Wanderarbeiter, die in den heißesten Stunden auf Baustellen, Feldern und in Fabriken arbeiten.

Als Reaktion überarbeitete Südkorea seine Arbeitsschutzstandards und verlangt nun, dass Außenarbeiter mindestens 20 Minuten pro zwei Stunden ruhen, wenn die 'gefühlte Temperatur' – wie heiß es sich mit der Luftfeuchtigkeit anfühlt – 33 Grad Celsius übersteigt. Die Regel sollte binnen weniger Tage in Kraft treten, nachdem Gewerkschaften auf stärkeren Schutz gedrängt hatten.

Koreas Sommer sind heißer und feuchter geworden, und Hitzewellen kommen früher und dauern länger. Die Todesfälle haben die Debatte neu entfacht, wie sich die verletzlichsten Arbeiter schützen lassen – von Pflichtpausen über Kühlstationen bis zu Grenzen für Außenarbeit in der größten Hitze. Für Millionen Koreaner ist es zu einer ernsten Alltagssorge geworden, im Sommer sicher zu bleiben.$a23$,
$a23$Une grave canicule qui a frappé la Corée du Sud début juillet 2026 a tué et hospitalisé des travailleurs en extérieur, poussant le gouvernement à durcir les règles de sécurité. Le 3 juillet, un saisonnier philippin d'une trentaine d'années a été retrouvé inconscient dans un champ à Yeongju, et quelques jours plus tôt un journalier vietnamien d'une vingtaine d'années est mort sur un chantier à Gumi, tous deux dans la province de Gyeongsang du Nord.

Ces derniers jours, plus de 1 000 cas de malaise dû à la chaleur avaient été signalés, plus du double par rapport à la même période l'an dernier. Beaucoup des victimes sont des travailleurs en extérieur, dont des migrants, qui œuvrent aux heures les plus chaudes sur les chantiers, dans les champs et les usines.

En réponse, la Corée du Sud a révisé ses normes de sécurité au travail pour exiger que les travailleurs en extérieur se reposent au moins 20 minutes toutes les deux heures lorsque la 'température ressentie' — la chaleur perçue avec l'humidité — dépasse 33 degrés Celsius. La règle devait entrer en vigueur en quelques jours, après que les syndicats eurent réclamé des protections renforcées.

Les étés coréens sont devenus plus chauds et plus humides, et les canicules arrivent plus tôt et durent plus longtemps. Ces décès ont relancé le débat sur la manière de protéger les travailleurs les plus vulnérables, des pauses obligatoires aux stations de rafraîchissement en passant par des limites au travail extérieur aux heures les plus chaudes. Pour des millions de Coréens, rester en sécurité l'été est devenu une sérieuse préoccupation quotidienne.$a23$,
$a23$Một đợt nắng nóng nghiêm trọng bao trùm Hàn Quốc vào đầu tháng 7 năm 2026 đã khiến lao động ngoài trời tử vong và nhập viện, buộc chính phủ siết chặt quy định an toàn. Ngày 3 tháng 7, một lao động thời vụ người Philippines ngoài 30 tuổi được tìm thấy bất tỉnh trên một cánh đồng ở Yeongju, và vài ngày trước đó một lao động nhật công người Việt ngoài 20 tuổi tử vong tại một công trường ở Gumi, cả hai đều thuộc tỉnh Bắc Gyeongsang.

Những ngày gần đây, hơn 1.000 ca bệnh do nóng đã được ghi nhận, hơn gấp đôi so với cùng kỳ năm ngoái. Nhiều nạn nhân là lao động ngoài trời, gồm cả lao động nhập cư, làm việc vào những giờ nóng nhất tại công trường, nông trại và nhà máy.

Đáp lại, Hàn Quốc đã sửa đổi tiêu chuẩn an toàn lao động, yêu cầu lao động ngoài trời nghỉ ít nhất 20 phút mỗi hai giờ khi 'nhiệt độ cảm nhận' — độ nóng cảm thấy được cùng với độ ẩm — vượt 33 độ C. Quy định dự kiến có hiệu lực trong vài ngày, sau khi các tổ chức lao động thúc ép bảo vệ mạnh mẽ hơn.

Mùa hè ở Hàn Quốc ngày càng nóng và ẩm hơn, và các đợt nắng nóng đến sớm hơn và kéo dài hơn. Những cái chết này làm sống lại cuộc tranh luận về cách bảo vệ những lao động dễ tổn thương nhất, từ nghỉ bắt buộc đến các trạm làm mát và giới hạn làm việc ngoài trời vào lúc nóng đỉnh điểm. Với hàng triệu người Hàn, giữ an toàn trong mùa hè đã trở thành mối lo hằng ngày nghiêm túc.$a23$,
$a23$คลื่นความร้อนรุนแรงที่ปกคลุมเกาหลีใต้เมื่อต้นเดือนกรกฎาคม 2026 คร่าชีวิตและทำให้แรงงานกลางแจ้งต้องเข้าโรงพยาบาล จนรัฐบาลต้องเพิ่มความเข้มงวดของกฎความปลอดภัย เมื่อวันที่ 3 กรกฎาคม แรงงานตามฤดูกาลชาวฟิลิปปินส์วัย 30 กว่าถูกพบหมดสติในทุ่งนาที่ยองจู และก่อนหน้านั้นไม่กี่วัน แรงงานรายวันชาวเวียดนามวัย 20 กว่าเสียชีวิตที่ไซต์ก่อสร้างในกูมี ทั้งสองแห่งอยู่ในจังหวัดคย็องซังเหนือ

ในช่วงไม่กี่วันที่ผ่านมามีรายงานผู้ป่วยจากความร้อนกว่า 1,000 ราย ซึ่งมากกว่าช่วงเดียวกันของปีก่อนกว่าสองเท่า ผู้ประสบเหตุจำนวนมากเป็นแรงงานกลางแจ้ง รวมถึงแรงงานข้ามชาติ ที่ทำงานในช่วงเวลาที่ร้อนที่สุดตามไซต์ก่อสร้าง ไร่นา และโรงงาน

เพื่อรับมือ เกาหลีใต้ได้แก้ไขมาตรฐานความปลอดภัยในการทำงาน กำหนดให้แรงงานกลางแจ้งพักอย่างน้อย 20 นาทีทุกสองชั่วโมง เมื่อ 'อุณหภูมิที่รู้สึกได้' ซึ่งสะท้อนความร้อนเมื่อรวมความชื้น เกิน 33 องศาเซลเซียส กฎนี้มีกำหนดเริ่มบังคับใช้ภายในไม่กี่วัน หลังกลุ่มแรงงานเรียกร้องให้คุ้มครองมากขึ้น

ฤดูร้อนในเกาหลีร้อนขึ้นและชื้นขึ้นเรื่อย ๆ และคลื่นความร้อนก็มาถึงเร็วขึ้นและอยู่นานขึ้น การเสียชีวิตเหล่านี้จุดประเด็นถกเถียงอีกครั้งว่าจะปกป้องแรงงานที่เปราะบางที่สุดอย่างไร ตั้งแต่การพักภาคบังคับ จุดคลายร้อน ไปจนถึงการจำกัดงานกลางแจ้งในช่วงร้อนจัด สำหรับชาวเกาหลีหลายล้านคน การอยู่อย่างปลอดภัยในฤดูร้อนกลายเป็นความกังวลในชีวิตประจำวันที่จริงจัง$a23$,
$a23$Gelombang panas parah yang mencengkeram Korea Selatan pada awal Juli 2026 menewaskan dan merawat pekerja luar ruang di rumah sakit, mendorong pemerintah memperketat aturan keselamatan. Pada 3 Juli, seorang pekerja musiman asal Filipina berusia 30-an ditemukan tak sadarkan diri di sebuah ladang di Yeongju, dan beberapa hari sebelumnya seorang buruh harian asal Vietnam berusia 20-an meninggal di lokasi konstruksi di Gumi, keduanya di Provinsi Gyeongsang Utara.

Dalam beberapa hari terakhir, lebih dari 1.000 kasus penyakit akibat panas dilaporkan, lebih dari dua kali lipat dibanding periode yang sama tahun lalu. Banyak korban adalah pekerja luar ruang, termasuk pekerja migran, yang bekerja pada jam terpanas di lokasi konstruksi, ladang, dan pabrik.

Sebagai tanggapan, Korea Selatan merevisi standar keselamatan kerja untuk mewajibkan pekerja luar ruang beristirahat setidaknya 20 menit setiap dua jam ketika 'suhu terasa' — seberapa panas terasa dengan kelembapan — melewati 33 derajat Celsius. Aturan itu akan berlaku dalam hitungan hari, setelah kelompok buruh mendesak perlindungan yang lebih kuat.

Musim panas di Korea makin panas dan lembap, dan gelombang panas kini datang lebih awal dan bertahan lebih lama. Kematian-kematian itu menghidupkan kembali perdebatan tentang cara melindungi pekerja paling rentan, dari istirahat wajib hingga pos pendingin dan pembatasan kerja luar ruang saat panas puncak. Bagi jutaan warga Korea, tetap aman di musim panas telah menjadi kekhawatiran serius sehari-hari.$a23$,
$a23$A deadly July 2026 heat wave killed and sickened outdoor workers in South Korea, prompting a new rule of 20-minute rest breaks every two hours above 33°C.$a23$,
$a23$Korea heat wave, outdoor workers, heat illness, worker safety, migrant workers, rest breaks$a23$,
'intermediate',
3, 4, 4,
$a23$[
{"word":"폭염","reading":"pongyeom","reading_ja":"ポギョム","part_of_speech":"noun","definition_en":"heat wave","definition_ja":"猛暑；酷暑","definition_zh_tw":"熱浪；酷暑","definition_es":"ola de calor","definition_de":"Hitzewelle","definition_fr":"canicule; vague de chaleur","definition_vi":"đợt nắng nóng","definition_th":"คลื่นความร้อน","definition_id":"gelombang panas","example_ko":"올여름 폭염이 매우 심하다.","example_en":"This summer's heat wave is very severe.","example_ja":"今年の夏の猛暑は非常に厳しい。","example_zh_tw":"今年夏天的熱浪非常嚴重。","example_es":"La ola de calor de este verano es muy intensa.","example_de":"Die Hitzewelle in diesem Sommer ist sehr heftig.","example_fr":"La canicule de cet été est très intense.","example_vi":"Đợt nắng nóng mùa hè này rất gay gắt.","example_th":"คลื่นความร้อนหน้าร้อนปีนี้รุนแรงมาก","example_id":"Gelombang panas musim panas ini sangat parah."},
{"word":"날씨","reading":"nalssi","reading_ja":"ナルシ","part_of_speech":"noun","definition_en":"weather","definition_ja":"天気","definition_zh_tw":"天氣","definition_es":"el tiempo; clima","definition_de":"Wetter","definition_fr":"temps; météo","definition_vi":"thời tiết","definition_th":"อากาศ; สภาพอากาศ","definition_id":"cuaca","example_ko":"요즘 날씨가 너무 덥다.","example_en":"The weather is very hot these days.","example_ja":"最近、天気がとても暑い。","example_zh_tw":"最近天氣非常熱。","example_es":"El tiempo está muy caluroso estos días.","example_de":"Das Wetter ist dieser Tage sehr heiß.","example_fr":"Le temps est très chaud ces jours-ci.","example_vi":"Dạo này thời tiết rất nóng.","example_th":"ช่วงนี้อากาศร้อนมาก","example_id":"Cuaca sangat panas belakangan ini."},
{"word":"안전","reading":"anjeon","reading_ja":"アンジョン","part_of_speech":"noun","definition_en":"safety","definition_ja":"安全","definition_zh_tw":"安全","definition_es":"seguridad","definition_de":"Sicherheit","definition_fr":"sécurité","definition_vi":"sự an toàn","definition_th":"ความปลอดภัย","definition_id":"keselamatan; keamanan","example_ko":"노동자의 안전이 가장 중요하다.","example_en":"Workers' safety is the most important thing.","example_ja":"労働者の安全が最も重要だ。","example_zh_tw":"勞工的安全最重要。","example_es":"La seguridad de los trabajadores es lo más importante.","example_de":"Die Sicherheit der Arbeiter ist am wichtigsten.","example_fr":"La sécurité des travailleurs est primordiale.","example_vi":"An toàn của người lao động là quan trọng nhất.","example_th":"ความปลอดภัยของแรงงานสำคัญที่สุด","example_id":"Keselamatan pekerja adalah yang terpenting."},
{"word":"휴식","reading":"hyusik","reading_ja":"ヒュシク","part_of_speech":"noun","definition_en":"rest; break","definition_ja":"休息；休憩","definition_zh_tw":"休息","definition_es":"descanso; pausa","definition_de":"Ruhe; Pause","definition_fr":"repos; pause","definition_vi":"sự nghỉ ngơi","definition_th":"การพักผ่อน; การพัก","definition_id":"istirahat","example_ko":"더울 때는 휴식이 꼭 필요하다.","example_en":"Rest is essential when it's hot.","example_ja":"暑いときは休息が欠かせない。","example_zh_tw":"天熱時休息不可或缺。","example_es":"El descanso es esencial cuando hace calor.","example_de":"Bei Hitze ist Ruhe unerlässlich.","example_fr":"Le repos est essentiel quand il fait chaud.","example_vi":"Khi trời nóng, việc nghỉ ngơi là cần thiết.","example_th":"เมื่ออากาศร้อน การพักเป็นสิ่งจำเป็น","example_id":"Istirahat sangat penting saat cuaca panas."},
{"word":"덥다","reading":"deopda","reading_ja":"トプタ","part_of_speech":"adjective","definition_en":"to be hot (weather)","definition_ja":"暑い","definition_zh_tw":"熱（天氣）","definition_es":"hacer calor; estar caluroso","definition_de":"heiß sein (Wetter)","definition_fr":"faire chaud","definition_vi":"nóng (thời tiết)","definition_th":"ร้อน (อากาศ)","definition_id":"panas (cuaca)","example_ko":"오늘은 정말 덥다.","example_en":"It's really hot today.","example_ja":"今日は本当に暑い。","example_zh_tw":"今天真的很熱。","example_es":"Hoy hace mucho calor.","example_de":"Heute ist es wirklich heiß.","example_fr":"Il fait vraiment chaud aujourd'hui.","example_vi":"Hôm nay trời rất nóng.","example_th":"วันนี้ร้อนมากจริง ๆ","example_id":"Hari ini benar-benar panas."}
]$a23$::jsonb,
'published', true, 0,
'2026-07-02T23:00:00Z', '2026-07-02T23:00:00Z', '2026-07-02T23:00:00Z'
);

-- Article 24 — 2026-07-04 kpop advanced — K-pop trainee contract reform assessment
INSERT INTO articles (topic_id, slug, title_en, title_ko, title_ja, title_zh_tw, title_es, title_de, title_fr, title_vi, title_th, title_id, summary_en, summary_ko, summary_ja, summary_zh_tw, summary_es, summary_de, summary_fr, summary_vi, summary_th, summary_id, content_en, content_ko, content_ja, content_zh_tw, content_es, content_de, content_fr, content_vi, content_th, content_id, seo_description, seo_keywords, level, reading_time_en, reading_time_ko, reading_time_ja, vocabulary, status, ai_generated, view_count, published_at, created_at, updated_at) VALUES (
(SELECT id FROM topics WHERE slug = 'kpop'),
'kpop-2026-07-04',
$a24$Korea's 2026 K-Pop Trainee Reforms: Progress, and Gaps That Remain$a24$,
$a24$2026 K-팝 연습생 계약 개혁…진전과 남은 과제$a24$,
$a24$2026年K-POP練習生契約改革　前進と残る課題$a24$,
$a24$2026 K-pop練習生合約改革：進展與未竟之處$a24$,
$a24$La reforma de contratos de aprendices del K-pop en 2026: avances y lagunas$a24$,
$a24$K-Pop-Trainee-Reform 2026: Fortschritte und offene Lücken$a24$,
$a24$Réforme des contrats de trainees K-pop en 2026 : avancées et lacunes$a24$,
$a24$Cải cách hợp đồng thực tập sinh K-pop 2026: tiến bộ và lỗ hổng$a24$,
$a24$ปฏิรูปสัญญาเด็กฝึก K-pop ปี 2026: ก้าวหน้าและช่องโหว่ที่เหลือ$a24$,
$a24$Reformasi Kontrak Trainee K-Pop 2026: Kemajuan dan Celah Tersisa$a24$,
$a24$New standard contracts for K-pop trainees took effect in 2026, requiring agencies to be transparent about money and to protect minors' health and schooling. But idols are still often classified as independent contractors, and the contracts barely address the growing number of foreign trainees.$a24$,
$a24$2026년 K-팝 연습생을 위한 새 표준계약서가 시행돼, 소속사가 돈 문제를 투명하게 밝히고 미성년자의 건강과 학업을 보호하도록 했다. 그러나 아이돌은 여전히 독립계약자로 분류되는 경우가 많고, 계약서는 늘어나는 외국인 연습생을 거의 다루지 않는다.$a24$,
$a24$2026年、K-POP練習生のための新しい標準契約書が施行され、事務所に金銭面の透明化と、未成年者の健康・学業の保護を義務づけた。しかしアイドルは今も個人事業主に分類されることが多く、契約書は増える外国人練習生をほとんど扱っていない。$a24$,
$a24$2026年，K-pop練習生的新版標準合約上路，要求經紀公司在金錢上更透明，並保護未成年人的健康與學業。但偶像仍常被歸類為獨立承攬者，合約也幾乎沒有處理日益增加的外籍練習生。$a24$,
$a24$En 2026 entraron en vigor nuevos contratos estándar para los aprendices del K-pop, que obligan a las agencias a ser transparentes con el dinero y a proteger la salud y los estudios de los menores. Pero los ídolos siguen clasificados a menudo como autónomos, y los contratos apenas contemplan al creciente número de aprendices extranjeros.$a24$,
$a24$2026 traten neue Standardverträge für K-Pop-Trainees in Kraft, die Agenturen zu finanzieller Transparenz und zum Schutz der Gesundheit und Schulbildung Minderjähriger verpflichten. Doch Idole gelten weiterhin oft als selbstständig, und die Verträge behandeln die wachsende Zahl ausländischer Trainees kaum.$a24$,
$a24$De nouveaux contrats types pour les trainees de K-pop sont entrés en vigueur en 2026, obligeant les agences à la transparence financière et à protéger la santé et la scolarité des mineurs. Mais les idoles restent souvent classées comme indépendantes, et les contrats n'abordent quasiment pas le nombre croissant de trainees étrangers.$a24$,
$a24$Các hợp đồng chuẩn mới cho thực tập sinh K-pop có hiệu lực năm 2026, yêu cầu công ty minh bạch về tiền bạc và bảo vệ sức khỏe cùng việc học của trẻ vị thành niên. Nhưng thần tượng vẫn thường bị xếp là nhà thầu độc lập, và hợp đồng gần như chưa đề cập số thực tập sinh nước ngoài ngày càng tăng.$a24$,
$a24$สัญญามาตรฐานใหม่สำหรับเด็กฝึก K-pop เริ่มมีผลในปี 2026 บังคับให้ค่ายโปร่งใสเรื่องเงินและคุ้มครองสุขภาพกับการเรียนของผู้เยาว์ แต่ไอดอลก็ยังมักถูกจัดเป็นผู้รับจ้างอิสระ และสัญญาแทบไม่ได้กล่าวถึงเด็กฝึกต่างชาติที่เพิ่มขึ้น$a24$,
$a24$Kontrak standar baru untuk trainee K-pop berlaku pada 2026, mewajibkan agensi transparan soal uang dan melindungi kesehatan serta pendidikan anak di bawah umur. Namun idol masih sering digolongkan sebagai kontraktor mandiri, dan kontrak nyaris tak menyentuh jumlah trainee asing yang terus bertambah.$a24$,
$a24$South Korea's overhauled rules for K-pop trainees took effect at the start of 2026, and by mid-year the industry was still weighing their impact. New standard contracts require talent agencies to be far more transparent about money and to protect young trainees' health and schooling — a response to years of complaints about how the star-making system treats the hopefuls at its base.

Historically, agencies deducted training costs — vocal lessons, dance classes, even plastic surgery — from a performer's future earnings with little documentation. The reformed contracts require regular, itemized settlement reports. They also expand mental-health support beyond only severe cases, and, for minors, ban interfering with school, add verbal abuse and harassment to prohibited conduct, and require agencies to appoint dedicated protection officers.

Yet significant gaps remain. Many idols are still classified as independent contractors rather than employees, which limits their access to minimum-wage rules and collective bargaining. And as K-pop globalizes, the standard contract barely addresses foreign trainees: it is written only in Korean and assumes every trainee holds a Korean passport, even though a large share of some agencies' trainees are now from abroad.

The stakes reach beyond individual careers. K-pop is one of South Korea's most visible exports, and how it treats its workers has drawn international scrutiny, including from labor scholars abroad. The 2026 reforms mark real progress on transparency and youth protection, but the debate over whether idols are artists, employees, or something in between is far from settled.$a24$,
$a24$K-팝 연습생을 위한 대폭 손질된 규정이 2026년 초 시행됐고, 연중반까지도 업계는 그 영향을 가늠하고 있었다. 새 표준계약서는 기획사가 돈 문제를 훨씬 투명하게 밝히고, 어린 연습생의 건강과 학업을 보호하도록 요구한다. 이는 스타를 길러 내는 시스템이 그 밑바닥의 지망생들을 어떻게 대하는지에 대한 오랜 불만에 대한 응답이다.

과거에는 기획사가 보컬 레슨, 댄스 수업, 심지어 성형 비용까지 훈련 비용을 명확한 기록 없이 연습생의 미래 수입에서 공제하곤 했다. 개정된 계약서는 정기적이고 항목별로 구분된 정산 보고서를 의무화한다. 또 정신 건강 지원을 심각한 경우로만 한정하던 데서 넓혔고, 미성년자의 경우 학업 방해를 금지하고, 언어폭력과 괴롭힘을 금지 행위에 추가했으며, 기획사가 전담 보호 담당자를 두도록 했다.

그러나 큰 공백이 남아 있다. 많은 아이돌은 여전히 근로자가 아니라 독립계약자로 분류돼 최저임금 규정과 단체교섭에 접근하기 어렵다. 그리고 K-팝이 세계화되는 가운데, 표준계약서는 외국인 연습생을 거의 다루지 않는다. 계약서는 한국어로만 작성돼 있고, 일부 기획사에서는 외국 출신 연습생 비중이 이미 상당한데도 모든 연습생이 한국 여권을 가졌다고 전제한다.

걸린 것은 개인의 경력을 넘어선다. K-팝은 한국에서 가장 눈에 띄는 수출품 중 하나이고, 그 노동자를 어떻게 대하는지는 해외 노동 연구자들을 포함해 국제적인 관심을 받아 왔다. 2026년 개혁은 투명성과 청소년 보호에서 실질적 진전을 이뤘지만, 아이돌이 예술가인지, 근로자인지, 그 사이의 무엇인지를 둘러싼 논쟁은 아직 끝나려면 멀었다.$a24$,
$a24$K-POP練習生のための大幅に見直された規定が2026年初めに施行され、年央になっても業界はその影響を見極めていた。新しい標準契約書は、事務所に金銭面の透明化を強く求め、若い練習生の健康と学業を守るよう義務づける。これは、スターを生み出すシステムがその土台にいる志望者をどう扱ってきたかへの長年の不満への応答だ。

かつて事務所は、ボーカルレッスンやダンス、さらには美容整形の費用まで、トレーニング費用を明確な記録なしに練習生の将来の収入から差し引いていた。改定後の契約書は、定期的で項目別の精算報告を義務づける。またメンタルヘルスの支援を重度の場合だけに限っていたのを広げ、未成年者については学業の妨害を禁止し、暴言やハラスメントを禁止行為に加え、事務所に専任の保護担当者を置くよう求めた。

だが大きな空白が残る。多くのアイドルは今も労働者ではなく個人事業主に分類され、最低賃金の規定や団体交渉を利用しにくい。そしてK-POPがグローバル化する中、標準契約書は外国人練習生をほとんど扱っていない。契約書は韓国語だけで書かれ、一部の事務所では外国出身の練習生の割合がすでに高いにもかかわらず、すべての練習生が韓国のパスポートを持っていると前提している。

かかっているものは個人のキャリアにとどまらない。K-POPは韓国で最も目立つ輸出品の一つであり、その労働者の扱いは海外の労働研究者を含め国際的な注目を集めてきた。2026年の改革は透明性と青少年保護で実質的な前進をもたらしたが、アイドルは芸術家なのか、労働者なのか、その中間の何かなのかをめぐる議論は、決着にはほど遠い。$a24$,
$a24$為K-pop練習生大幅修訂的規定於2026年初上路，到了年中，業界仍在評估其影響。新版標準合約要求經紀公司在金錢上更加透明，並保護年輕練習生的健康與學業。這是對「造星系統如何對待底層追夢者」長年不滿的回應。

過去，經紀公司常把聲樂課、舞蹈課，甚至整形費用等訓練成本，在沒有明確紀錄的情況下，從練習生未來的收入中扣除。修訂後的合約要求提供定期、逐項的結算報告。它也把心理健康支援從僅限重症擴大，對未成年人則禁止妨礙學業，把言語暴力與騷擾列入禁止行為，並要求經紀公司指派專責的保護人員。

然而重大缺口依舊存在。許多偶像仍被歸類為獨立承攬者而非受僱者，難以享有最低工資規定與集體協商權。而在K-pop走向全球之際，標準合約幾乎沒有處理外籍練習生：合約只以韓文撰寫，並假設每位練習生都持有韓國護照，即使在部分經紀公司，外籍練習生的比例其實已相當高。

其影響超越個人的演藝生涯。K-pop是韓國最受矚目的輸出品之一，它如何對待勞工，已引起包括國外勞動學者在內的國際關注。2026年的改革在透明度與青少年保護上取得實質進展，但偶像究竟是藝術家、受僱者，還是介於兩者之間，這場爭論仍遠未落幕。$a24$,
$a24$Las reglas profundamente revisadas para los aprendices del K-pop entraron en vigor a comienzos de 2026 y, a mitad de año, la industria aún medía su impacto. Los nuevos contratos estándar obligan a las agencias a ser mucho más transparentes con el dinero y a proteger la salud y la educación de los jóvenes aprendices, en respuesta a años de quejas sobre cómo el sistema que fabrica estrellas trata a los aspirantes de su base.

Antes, las agencias descontaban los costes de formación —clases de canto, de baile, incluso cirugía estética— de las futuras ganancias del artista con escasa documentación. Los contratos reformados exigen informes de liquidación periódicos y detallados. También amplían el apoyo de salud mental más allá de los casos graves y, para los menores, prohíben interferir en sus estudios, añaden el abuso verbal y el acoso a las conductas vetadas y obligan a las agencias a nombrar responsables de protección específicos.

Aun así, quedan lagunas importantes. Muchos ídolos siguen clasificados como autónomos y no como empleados, lo que limita su acceso a las normas del salario mínimo y a la negociación colectiva. Y a medida que el K-pop se globaliza, el contrato estándar apenas contempla a los aprendices extranjeros: está redactado solo en coreano y da por hecho que todos tienen pasaporte coreano, aunque en algunas agencias buena parte de los aprendices ya proceden del extranjero.

Lo que está en juego va más allá de las carreras individuales. El K-pop es una de las exportaciones más visibles de Corea del Sur, y su trato a los trabajadores ha atraído la atención internacional, incluida la de estudiosos del trabajo en el extranjero. Las reformas de 2026 suponen un avance real en transparencia y protección juvenil, pero el debate sobre si los ídolos son artistas, empleados o algo intermedio dista mucho de estar cerrado.$a24$,
$a24$Die grundlegend überarbeiteten Regeln für K-Pop-Trainees traten Anfang 2026 in Kraft, und zur Jahresmitte wog die Branche noch immer ihre Wirkung ab. Die neuen Standardverträge verpflichten Agenturen zu weit mehr finanzieller Transparenz und zum Schutz der Gesundheit und Schulbildung junger Trainees – eine Antwort auf jahrelange Klagen darüber, wie das Sternenmach-System die Anwärter an seiner Basis behandelt.

Früher zogen Agenturen Ausbildungskosten – Gesangsstunden, Tanzkurse, selbst Schönheitsoperationen – ohne klare Belege von den künftigen Einnahmen der Künstler ab. Die reformierten Verträge verlangen regelmäßige, aufgeschlüsselte Abrechnungsberichte. Sie weiten außerdem die Unterstützung für psychische Gesundheit über schwere Fälle hinaus aus und verbieten bei Minderjährigen die Beeinträchtigung der Schule, ergänzen verbale Gewalt und Belästigung als verbotenes Verhalten und verpflichten Agenturen, eigene Schutzbeauftragte zu benennen.

Dennoch bleiben erhebliche Lücken. Viele Idole gelten weiterhin als Selbstständige statt als Angestellte, was ihren Zugang zu Mindestlohnregeln und Tarifverhandlungen einschränkt. Und während K-Pop globaler wird, behandelt der Standardvertrag ausländische Trainees kaum: Er ist nur auf Koreanisch verfasst und setzt voraus, dass jeder Trainee einen koreanischen Pass besitzt – obwohl in manchen Agenturen bereits ein großer Teil der Trainees aus dem Ausland stammt.

Es geht um mehr als einzelne Karrieren. K-Pop ist eines der sichtbarsten Exportgüter Südkoreas, und der Umgang mit seinen Arbeitern hat internationale Aufmerksamkeit erregt, auch von Arbeitsforschern im Ausland. Die Reformen von 2026 bedeuten echten Fortschritt bei Transparenz und Jugendschutz, doch die Debatte, ob Idole Künstler, Angestellte oder etwas dazwischen sind, ist längst nicht entschieden.$a24$,
$a24$Les règles profondément remaniées pour les trainees de K-pop sont entrées en vigueur début 2026 et, à mi-année, l'industrie en mesurait encore l'impact. Les nouveaux contrats types obligent les agences à bien plus de transparence financière et à protéger la santé et la scolarité des jeunes trainees, en réponse à des années de plaintes sur la façon dont le système de fabrication de stars traite les aspirants de sa base.

Autrefois, les agences déduisaient les coûts de formation — cours de chant, de danse, voire chirurgie esthétique — des futurs revenus de l'artiste avec peu de documentation. Les contrats réformés exigent des rapports de règlement réguliers et détaillés. Ils élargissent aussi le soutien en santé mentale au-delà des cas graves et, pour les mineurs, interdisent d'entraver leur scolarité, ajoutent la violence verbale et le harcèlement aux conduites prohibées et obligent les agences à nommer des responsables de protection dédiés.

Des lacunes importantes subsistent pourtant. De nombreuses idoles restent classées comme indépendantes plutôt que salariées, ce qui limite leur accès aux règles du salaire minimum et à la négociation collective. Et à mesure que la K-pop se mondialise, le contrat type n'aborde quasiment pas les trainees étrangers : il n'est rédigé qu'en coréen et suppose que chaque trainee détient un passeport coréen, alors que dans certaines agences une large part des trainees vient désormais de l'étranger.

Les enjeux dépassent les carrières individuelles. La K-pop est l'une des exportations les plus visibles de la Corée du Sud, et son traitement des travailleurs a suscité une attention internationale, y compris de chercheurs en droit du travail à l'étranger. Les réformes de 2026 marquent de réels progrès en matière de transparence et de protection des jeunes, mais le débat sur le statut des idoles — artistes, salariés ou entre les deux — est loin d'être tranché.$a24$,
$a24$Các quy định được sửa đổi sâu rộng cho thực tập sinh K-pop có hiệu lực đầu năm 2026, và đến giữa năm ngành công nghiệp vẫn đang cân nhắc tác động của chúng. Các hợp đồng chuẩn mới buộc các công ty phải minh bạch hơn nhiều về tiền bạc và bảo vệ sức khỏe cùng việc học của các thực tập sinh trẻ — một phản hồi trước nhiều năm phàn nàn về cách hệ thống tạo sao đối xử với những người mơ ước ở tầng đáy.

Trước đây, các công ty khấu trừ chi phí đào tạo — học thanh nhạc, học nhảy, thậm chí phẫu thuật thẩm mỹ — từ thu nhập tương lai của nghệ sĩ mà gần như không có chứng từ. Hợp đồng cải cách yêu cầu báo cáo quyết toán định kỳ và chi tiết theo từng khoản. Chúng cũng mở rộng hỗ trợ sức khỏe tâm thần ra ngoài các trường hợp nghiêm trọng, và với trẻ vị thành niên thì cấm cản trở việc học, bổ sung bạo hành lời nói và quấy rối vào danh mục hành vi bị cấm, đồng thời buộc công ty bổ nhiệm cán bộ bảo vệ chuyên trách.

Tuy vậy, những lỗ hổng lớn vẫn còn. Nhiều thần tượng vẫn bị xếp là nhà thầu độc lập chứ không phải người lao động, khiến họ khó tiếp cận quy định lương tối thiểu và thương lượng tập thể. Và khi K-pop toàn cầu hóa, hợp đồng chuẩn gần như không đề cập thực tập sinh nước ngoài: nó chỉ được viết bằng tiếng Hàn và mặc định mọi thực tập sinh đều mang hộ chiếu Hàn Quốc, dù ở một số công ty tỷ lệ thực tập sinh đến từ nước ngoài đã khá lớn.

Những gì đặt ra vượt ra ngoài sự nghiệp cá nhân. K-pop là một trong những mặt hàng xuất khẩu dễ thấy nhất của Hàn Quốc, và cách nó đối xử với người lao động đã thu hút sự chú ý quốc tế, kể cả từ các học giả về lao động ở nước ngoài. Cải cách năm 2026 đánh dấu tiến bộ thực sự về minh bạch và bảo vệ thanh thiếu niên, nhưng cuộc tranh luận về việc thần tượng là nghệ sĩ, người lao động hay điều gì đó ở giữa vẫn còn lâu mới ngã ngũ.$a24$,
$a24$กฎที่ปรับปรุงครั้งใหญ่สำหรับเด็กฝึก K-pop เริ่มมีผลตั้งแต่ต้นปี 2026 และเมื่อถึงกลางปี วงการก็ยังประเมินผลกระทบอยู่ สัญญามาตรฐานฉบับใหม่บังคับให้ค่ายเพลงโปร่งใสเรื่องเงินมากขึ้นมาก และปกป้องสุขภาพกับการเรียนของเด็กฝึกรุ่นเยาว์ ซึ่งเป็นการตอบสนองต่อเสียงบ่นมาหลายปีว่าระบบปั้นดาราปฏิบัติต่อผู้ใฝ่ฝันในระดับล่างอย่างไร

ในอดีต ค่ายมักหักค่าฝึก ทั้งเรียนร้อง เรียนเต้น ไปจนถึงค่าศัลยกรรม จากรายได้ในอนาคตของศิลปินโดยแทบไม่มีเอกสารชัดเจน สัญญาที่ปฏิรูปแล้วกำหนดให้ต้องมีรายงานการหักบัญชีเป็นระยะและแยกรายการ อีกทั้งขยายการดูแลสุขภาพจิตให้ครอบคลุมมากกว่ากรณีรุนแรง และสำหรับผู้เยาว์ก็ห้ามขัดขวางการเรียน เพิ่มการใช้วาจารุนแรงและการคุกคามเข้าไปในรายการพฤติกรรมต้องห้าม และกำหนดให้ค่ายแต่งตั้งเจ้าหน้าที่คุ้มครองโดยเฉพาะ

ทว่าช่องโหว่สำคัญยังคงอยู่ ไอดอลจำนวนมากยังถูกจัดเป็นผู้รับจ้างอิสระ ไม่ใช่ลูกจ้าง ทำให้เข้าถึงกฎค่าจ้างขั้นต่ำและการเจรจาต่อรองร่วมได้ยาก และในขณะที่ K-pop ก้าวสู่ระดับโลก สัญญามาตรฐานแทบไม่กล่าวถึงเด็กฝึกต่างชาติ โดยเขียนเป็นภาษาเกาหลีเท่านั้นและตั้งสมมติฐานว่าเด็กฝึกทุกคนถือหนังสือเดินทางเกาหลี ทั้งที่ในบางค่าย สัดส่วนเด็กฝึกจากต่างประเทศสูงอยู่แล้ว

เดิมพันนี้เกินกว่าอาชีพของแต่ละคน K-pop เป็นหนึ่งในสินค้าส่งออกที่โดดเด่นที่สุดของเกาหลีใต้ และการปฏิบัติต่อแรงงานก็ดึงดูดความสนใจระดับนานาชาติ รวมถึงจากนักวิชาการด้านแรงงานในต่างประเทศ การปฏิรูปปี 2026 ถือเป็นความก้าวหน้าที่แท้จริงด้านความโปร่งใสและการคุ้มครองเยาวชน แต่การถกเถียงว่าไอดอลเป็นศิลปิน ลูกจ้าง หรือบางอย่างที่อยู่ตรงกลาง ยังห่างไกลจากข้อสรุป$a24$,
$a24$Aturan yang dirombak besar-besaran untuk trainee K-pop mulai berlaku pada awal 2026, dan hingga pertengahan tahun industri masih menimbang dampaknya. Kontrak standar baru mewajibkan agensi jauh lebih transparan soal uang serta melindungi kesehatan dan pendidikan trainee muda — jawaban atas keluhan bertahun-tahun tentang cara sistem pencetak bintang memperlakukan para calon di dasarnya.

Dahulu, agensi memotong biaya pelatihan — les vokal, kelas tari, bahkan operasi plastik — dari penghasilan masa depan artis tanpa dokumentasi jelas. Kontrak yang direformasi mewajibkan laporan penyelesaian yang rutin dan terperinci. Kontrak itu juga memperluas dukungan kesehatan mental di luar kasus berat, dan bagi anak di bawah umur melarang mengganggu sekolah, menambahkan kekerasan verbal dan pelecehan ke daftar perilaku terlarang, serta mewajibkan agensi menunjuk petugas perlindungan khusus.

Namun, celah besar masih ada. Banyak idol tetap digolongkan sebagai kontraktor mandiri, bukan karyawan, yang membatasi akses mereka ke aturan upah minimum dan perundingan bersama. Dan saat K-pop mengglobal, kontrak standar nyaris tak menyentuh trainee asing: kontrak itu hanya ditulis dalam bahasa Korea dan mengasumsikan setiap trainee memegang paspor Korea, padahal di sejumlah agensi proporsi trainee dari luar negeri sudah cukup besar.

Taruhannya melampaui karier individu. K-pop adalah salah satu ekspor Korea Selatan yang paling menonjol, dan cara ia memperlakukan pekerjanya telah menarik perhatian internasional, termasuk dari akademisi ketenagakerjaan di luar negeri. Reformasi 2026 menandai kemajuan nyata dalam transparansi dan perlindungan remaja, tetapi perdebatan tentang apakah idol itu seniman, karyawan, atau sesuatu di antaranya masih jauh dari selesai.$a24$,
$a24$Korea's 2026 K-pop trainee contract reform brings financial transparency and minor protections, but idols remain independent contractors and foreign trainees are unaddressed.$a24$,
$a24$K-pop trainee, standard contract, K-pop labor, trainee rights, HYBE, entertainment agency, idol contract$a24$,
'advanced',
3, 4, 4,
$a24$[
{"word":"연습생","reading":"yeonseupsaeng","reading_ja":"ヨンスプセン","part_of_speech":"noun","definition_en":"trainee (aspiring idol in training)","definition_ja":"練習生（デビュー前の育成生）","definition_zh_tw":"練習生","definition_es":"aprendiz (en formación para ser ídolo)","definition_de":"Trainee (angehendes Idol in Ausbildung)","definition_fr":"trainee (stagiaire en formation d'idole)","definition_vi":"thực tập sinh (idol tập sự)","definition_th":"เด็กฝึก (ผู้ฝึกเป็นไอดอล)","definition_id":"trainee (calon idol yang berlatih)","example_ko":"그 연습생은 5년 동안 훈련했다.","example_en":"That trainee trained for five years.","example_ja":"その練習生は5年間訓練した。","example_zh_tw":"那名練習生受訓了五年。","example_es":"Ese aprendiz se formó durante cinco años.","example_de":"Dieser Trainee trainierte fünf Jahre lang.","example_fr":"Ce trainee s'est formé pendant cinq ans.","example_vi":"Thực tập sinh đó đã tập luyện suốt năm năm.","example_th":"เด็กฝึกคนนั้นฝึกฝนมาห้าปี","example_id":"Trainee itu berlatih selama lima tahun."},
{"word":"소속사","reading":"sosoksa","reading_ja":"ソソクサ","part_of_speech":"noun","definition_en":"talent agency; the company an artist belongs to","definition_ja":"所属事務所","definition_zh_tw":"經紀公司","definition_es":"agencia; sello al que pertenece un artista","definition_de":"Agentur; Label eines Künstlers","definition_fr":"agence; label auquel appartient un artiste","definition_vi":"công ty chủ quản","definition_th":"ต้นสังกัด; ค่าย","definition_id":"agensi; label naungan artis","example_ko":"그는 큰 소속사에 들어갔다.","example_en":"He joined a big agency.","example_ja":"彼は大手の事務所に入った。","example_zh_tw":"他進了一家大型經紀公司。","example_es":"Entró en una gran agencia.","example_de":"Er kam bei einer großen Agentur unter.","example_fr":"Il a rejoint une grande agence.","example_vi":"Anh ấy đã gia nhập một công ty chủ quản lớn.","example_th":"เขาเข้าสังกัดค่ายใหญ่","example_id":"Ia bergabung dengan agensi besar."},
{"word":"계약","reading":"gyeyak","reading_ja":"ケヤク","part_of_speech":"noun","definition_en":"contract","definition_ja":"契約","definition_zh_tw":"合約；契約","definition_es":"contrato","definition_de":"Vertrag","definition_fr":"contrat","definition_vi":"hợp đồng","definition_th":"สัญญา","definition_id":"kontrak","example_ko":"새 계약이 연습생을 보호한다.","example_en":"The new contract protects trainees.","example_ja":"新しい契約が練習生を守る。","example_zh_tw":"新合約保護練習生。","example_es":"El nuevo contrato protege a los aprendices.","example_de":"Der neue Vertrag schützt die Trainees.","example_fr":"Le nouveau contrat protège les trainees.","example_vi":"Hợp đồng mới bảo vệ thực tập sinh.","example_th":"สัญญาใหม่คุ้มครองเด็กฝึก","example_id":"Kontrak baru melindungi trainee."},
{"word":"권리","reading":"gwolli","reading_ja":"クォルリ","part_of_speech":"noun","definition_en":"a right (legal or moral)","definition_ja":"権利","definition_zh_tw":"權利","definition_es":"derecho","definition_de":"Recht (Anspruch)","definition_fr":"droit","definition_vi":"quyền lợi; quyền","definition_th":"สิทธิ","definition_id":"hak","example_ko":"연습생의 권리가 강화됐다.","example_en":"Trainees' rights have been strengthened.","example_ja":"練習生の権利が強化された。","example_zh_tw":"練習生的權利獲得強化。","example_es":"Se han reforzado los derechos de los aprendices.","example_de":"Die Rechte der Trainees wurden gestärkt.","example_fr":"Les droits des trainees ont été renforcés.","example_vi":"Quyền lợi của thực tập sinh đã được củng cố.","example_th":"สิทธิของเด็กฝึกได้รับการเสริมความแข็งแกร่ง","example_id":"Hak para trainee telah diperkuat."},
{"word":"보호","reading":"boho","reading_ja":"ポホ","part_of_speech":"noun","definition_en":"protection","definition_ja":"保護","definition_zh_tw":"保護","definition_es":"protección","definition_de":"Schutz","definition_fr":"protection","definition_vi":"sự bảo vệ","definition_th":"การคุ้มครอง; การปกป้อง","definition_id":"perlindungan","example_ko":"미성년자 보호가 특히 중요하다.","example_en":"Protecting minors is especially important.","example_ja":"未成年者の保護は特に重要だ。","example_zh_tw":"保護未成年人尤其重要。","example_es":"La protección de los menores es especialmente importante.","example_de":"Der Schutz Minderjähriger ist besonders wichtig.","example_fr":"La protection des mineurs est particulièrement importante.","example_vi":"Việc bảo vệ trẻ vị thành niên đặc biệt quan trọng.","example_th":"การคุ้มครองผู้เยาว์สำคัญเป็นพิเศษ","example_id":"Perlindungan anak di bawah umur sangat penting."}
]$a24$::jsonb,
'published', true, 0,
'2026-07-03T23:00:00Z', '2026-07-03T23:00:00Z', '2026-07-03T23:00:00Z'
);

-- Article 25 — 2026-07-05 travel beginner — Dongseo Trail coast-to-coast hiking route
INSERT INTO articles (topic_id, slug, title_en, title_ko, title_ja, title_zh_tw, title_es, title_de, title_fr, title_vi, title_th, title_id, summary_en, summary_ko, summary_ja, summary_zh_tw, summary_es, summary_de, summary_fr, summary_vi, summary_th, summary_id, content_en, content_ko, content_ja, content_zh_tw, content_es, content_de, content_fr, content_vi, content_th, content_id, seo_description, seo_keywords, level, reading_time_en, reading_time_ko, reading_time_ja, vocabulary, status, ai_generated, view_count, published_at, created_at, updated_at) VALUES (
(SELECT id FROM topics WHERE slug = 'travel'),
'travel-2026-07-05',
$a25$South Korea's First Coast-to-Coast Hiking Trail Opens in 2026$a25$,
$a25$한국 첫 동서 횡단 장거리 트레일, 2026년 개통$a25$,
$a25$韓国初の東西横断ロングトレイル、2026年に開通$a25$,
$a25$韓國首條橫貫東西長程步道 2026年啟用$a25$,
$a25$Corea del Sur abre en 2026 su primera ruta de senderismo costa a costa$a25$,
$a25$Südkoreas erster Küste-zu-Küste-Wanderweg öffnet 2026$a25$,
$a25$Le premier sentier côte à côte de Corée du Sud ouvre en 2026$a25$,
$a25$Đường mòn xuyên đông–tây đầu tiên của Hàn Quốc mở năm 2026$a25$,
$a25$เส้นทางเดินป่าข้ามฝั่งตะวันออก-ตะวันตกแห่งแรกของเกาหลี เปิดปี 2026$a25$,
$a25$Jalur Hiking Lintas Pantai Pertama Korea Dibuka pada 2026$a25$,
$a25$The Dongseo Trail, South Korea's first coast-to-coast long-distance hiking route, is set to partially open in 2026. When finished it will run about 849 km, crossing mountains and small towns to link the east and west coasts — part of a push to spread tourism beyond big cities.$a25$,
$a25$한국 첫 동서 횡단 장거리 걷기 길인 '동서트레일'이 2026년 일부 구간을 연다. 완공되면 약 849km에 이르며, 산과 작은 마을을 지나 동해안과 서해안을 잇는다. 대도시를 넘어 관광을 넓히려는 노력의 일환이다.$a25$,
$a25$韓国初の東西横断ロングトレイル「東西トレイル」が2026年に一部区間を開通させる。完成すれば約849kmに及び、山や小さな町を通って東海岸と西海岸を結ぶ。大都市を越えて観光を広げる取り組みの一環だ。$a25$,
$a25$韓國首條橫貫東西的長程步道「東西步道」將於2026年先開放部分路段。全線完工後約849公里，穿越山林與小鎮，連接東海岸與西海岸，是把觀光擴展到大城市以外的一環。$a25$,
$a25$El Sendero Dongseo, la primera ruta de senderismo de larga distancia de costa a costa de Corea del Sur, abrirá parcialmente en 2026. Cuando esté terminado tendrá unos 849 km, cruzando montañas y pequeños pueblos para unir las costas este y oeste, dentro de un plan para llevar el turismo más allá de las grandes ciudades.$a25$,
$a25$Der Dongseo-Weg, Südkoreas erster Küste-zu-Küste-Fernwanderweg, soll 2026 teilweise öffnen. Fertig gestellt wird er rund 849 km lang sein, führt über Berge und durch kleine Orte und verbindet die Ost- und Westküste – Teil eines Plans, den Tourismus über die Großstädte hinaus zu verteilen.$a25$,
$a25$Le sentier Dongseo, premier itinéraire de randonnée longue distance de côte à côte de Corée du Sud, doit ouvrir partiellement en 2026. Une fois achevé, il fera environ 849 km, traversant montagnes et petits villages pour relier les côtes est et ouest — dans le cadre d'un effort pour étendre le tourisme au-delà des grandes villes.$a25$,
$a25$Đường mòn Dongseo, tuyến đi bộ đường dài xuyên hai bờ biển đầu tiên của Hàn Quốc, dự kiến mở một phần vào năm 2026. Khi hoàn thành, nó dài khoảng 849 km, băng qua núi non và các thị trấn nhỏ để nối bờ đông với bờ tây — nằm trong nỗ lực đưa du lịch ra ngoài các thành phố lớn.$a25$,
$a25$เส้นทางเดินป่าตงซอ เส้นทางเดินระยะไกลข้ามฝั่งตะวันออก-ตะวันตกแห่งแรกของเกาหลีใต้ มีกำหนดเปิดบางส่วนในปี 2026 เมื่อเสร็จสมบูรณ์จะยาวราว 849 กิโลเมตร ผ่านภูเขาและเมืองเล็ก ๆ เชื่อมชายฝั่งตะวันออกกับตะวันตก เป็นส่วนหนึ่งของความพยายามกระจายการท่องเที่ยวออกไปนอกเมืองใหญ่$a25$,
$a25$Jalur Dongseo, rute hiking jarak jauh lintas pantai pertama di Korea Selatan, dijadwalkan dibuka sebagian pada 2026. Setelah rampung, panjangnya sekitar 849 km, melintasi pegunungan dan kota kecil untuk menghubungkan pantai timur dan barat — bagian dari upaya menyebar pariwisata ke luar kota besar.$a25$,
$a25$South Korea is opening a brand-new way to explore the country on foot. The Dongseo Trail, the country's first coast-to-coast long-distance hiking route, is set to partially open in 2026. When finished, it will run about 849 kilometers (527 miles), linking the east coast ('dong') and the west coast ('seo').

The trail crosses mountains, forests, and small towns, giving walkers a slower, quieter side of Korea far from the busy streets of Seoul. Hikers can walk short sections in a day or take on longer stretches over many days, stopping in local villages along the way.

Hiking is a beloved pastime in South Korea, which is famous for its mountains. The new trail is part of a wider effort to spread tourism beyond big cities and toward nature and small-town experiences. For visitors, it offers a chance to see parts of the country that few foreign tourists ever reach.$a25$,
$a25$한국을 걸어서 둘러보는 완전히 새로운 방법이 생긴다. 한국 첫 해안에서 해안까지 이어지는 장거리 걷기 길인 '동서트레일'이 2026년에 일부 구간을 연다. 완공되면 약 849km에 이르며, 동해안('동')과 서해안('서')을 잇는다.

이 길은 산과 숲, 작은 마을을 지나며, 서울의 번잡한 거리와는 멀리 떨어진, 더 느리고 조용한 한국의 모습을 걷는 이에게 보여 준다. 하이커는 하루에 짧은 구간을 걷거나, 여러 날에 걸쳐 더 긴 구간에 도전하면서 도중에 지역 마을에 들를 수 있다.

산으로 유명한 한국에서 등산은 사랑받는 취미다. 이 새 길은 관광을 대도시를 넘어 자연과 작은 마을 체험 쪽으로 넓히려는 더 큰 노력의 일부다. 방문객에게는 외국 관광객이 거의 가 보지 못한 한국의 곳곳을 볼 기회를 준다.$a25$,
$a25$韓国を歩いて巡る、まったく新しい方法ができる。韓国初の海岸から海岸まで続くロングトレイル「東西トレイル」が2026年に一部区間を開通させる。完成すれば約849kmに及び、東海岸（「東（トン）」）と西海岸（「西（ソ）」）を結ぶ。

この道は山や森、小さな町を通り、ソウルのにぎやかな通りから遠く離れた、よりゆっくりと静かな韓国の姿を歩く人に見せてくれる。ハイカーは1日で短い区間を歩いたり、何日もかけてより長い区間に挑戦したりしながら、途中の地元の村に立ち寄ることができる。

山で有名な韓国では、登山は愛される趣味だ。この新しい道は、観光を大都市を越えて自然や小さな町の体験へと広げる、より大きな取り組みの一部だ。旅行者にとっては、外国人観光客がほとんど訪れない韓国の各地を見る機会になる。$a25$,
$a25$一種用雙腳認識韓國的全新方式即將登場。韓國首條從海岸連到海岸的長程步道「東西步道」將於2026年先開放部分路段。全線完工後約849公里，連接東海岸（韓語「東」）與西海岸（「西」）。

這條步道穿越山林與小鎮，讓行走的人看見遠離首爾繁華街道、更緩慢也更安靜的韓國。健行者可以一天走一小段，或花上好幾天挑戰更長的路段，並在途中造訪在地村莊。

在以山聞名的韓國，登山是深受喜愛的休閒活動。這條新步道，是把觀光從大城市擴展到自然與小鎮體驗的更大努力的一環。對旅客而言，它提供了一個機會，去看見鮮少外國遊客到訪的韓國角落。$a25$,
$a25$Corea del Sur estrena una forma completamente nueva de recorrer el país a pie. El Sendero Dongseo, la primera ruta de senderismo de larga distancia de costa a costa del país, abrirá parcialmente en 2026. Cuando esté terminado tendrá unos 849 kilómetros y unirá la costa este ('dong') con la oeste ('seo').

El sendero cruza montañas, bosques y pequeños pueblos, y muestra a quien camina un lado más lento y tranquilo de Corea, lejos de las bulliciosas calles de Seúl. Los excursionistas pueden recorrer tramos cortos en un día o afrontar trayectos más largos durante varias jornadas, deteniéndose en aldeas locales por el camino.

El senderismo es un pasatiempo muy querido en Corea del Sur, famosa por sus montañas. El nuevo sendero forma parte de un esfuerzo mayor por llevar el turismo más allá de las grandes ciudades, hacia la naturaleza y las experiencias de pueblo. Para los visitantes, ofrece la oportunidad de ver rincones del país a los que pocos turistas extranjeros llegan.$a25$,
$a25$Südkorea eröffnet eine ganz neue Art, das Land zu Fuß zu erkunden. Der Dongseo-Weg, der erste Küste-zu-Küste-Fernwanderweg des Landes, soll 2026 teilweise öffnen. Fertiggestellt wird er rund 849 Kilometer lang sein und die Ostküste ('Dong') mit der Westküste ('Seo') verbinden.

Der Weg führt über Berge, durch Wälder und kleine Orte und zeigt Wandernden eine langsamere, ruhigere Seite Koreas, fernab der belebten Straßen Seouls. Wanderer können kurze Abschnitte an einem Tag gehen oder längere Etappen über mehrere Tage angehen und unterwegs in örtlichen Dörfern Halt machen.

Wandern ist in Südkorea, das für seine Berge bekannt ist, ein beliebter Zeitvertreib. Der neue Weg ist Teil eines größeren Bestrebens, den Tourismus über die Großstädte hinaus zur Natur und zu Erlebnissen in kleinen Orten zu lenken. Besuchern bietet er die Chance, Teile des Landes zu sehen, die kaum ein ausländischer Tourist je erreicht.$a25$,
$a25$La Corée du Sud inaugure une toute nouvelle façon de découvrir le pays à pied. Le sentier Dongseo, premier itinéraire de randonnée longue distance de côte à côte du pays, doit ouvrir partiellement en 2026. Une fois achevé, il fera environ 849 kilomètres et reliera la côte est (« dong ») à la côte ouest (« seo »).

Le sentier traverse montagnes, forêts et petits villages, offrant aux marcheurs un visage plus lent et plus paisible de la Corée, loin des rues animées de Séoul. Les randonneurs peuvent parcourir de courts tronçons en une journée ou s'attaquer à de plus longues portions sur plusieurs jours, en s'arrêtant dans des villages locaux en chemin.

La randonnée est un passe-temps très apprécié en Corée du Sud, célèbre pour ses montagnes. Ce nouveau sentier s'inscrit dans un effort plus large pour étendre le tourisme au-delà des grandes villes, vers la nature et les expériences de village. Pour les visiteurs, il offre l'occasion de voir des coins du pays que peu de touristes étrangers atteignent.$a25$,
$a25$Hàn Quốc mở ra một cách hoàn toàn mới để khám phá đất nước bằng đôi chân. Đường mòn Dongseo, tuyến đi bộ đường dài từ bờ biển này sang bờ biển kia đầu tiên của nước này, dự kiến mở một phần vào năm 2026. Khi hoàn thành, nó dài khoảng 849 km, nối bờ đông ('dong') với bờ tây ('seo').

Con đường băng qua núi, rừng và các thị trấn nhỏ, cho người đi bộ thấy một Hàn Quốc chậm rãi và yên tĩnh hơn, xa những con phố nhộn nhịp của Seoul. Người đi bộ có thể đi những đoạn ngắn trong một ngày hoặc chinh phục những chặng dài hơn trong nhiều ngày, dừng chân ở các ngôi làng địa phương dọc đường.

Đi bộ đường dài là thú vui được yêu thích ở Hàn Quốc, đất nước nổi tiếng với núi non. Con đường mới nằm trong nỗ lực rộng lớn hơn nhằm đưa du lịch ra ngoài các thành phố lớn, hướng tới thiên nhiên và trải nghiệm ở thị trấn nhỏ. Với du khách, nó mang đến cơ hội nhìn thấy những vùng của đất nước mà ít khách nước ngoài từng đặt chân tới.$a25$,
$a25$เกาหลีใต้เปิดวิธีใหม่ในการสำรวจประเทศด้วยการเดินเท้า เส้นทางเดินป่าตงซอ ซึ่งเป็นเส้นทางเดินระยะไกลจากชายฝั่งถึงชายฝั่งแห่งแรกของประเทศ มีกำหนดเปิดบางส่วนในปี 2026 เมื่อเสร็จสมบูรณ์จะยาวราว 849 กิโลเมตร เชื่อมชายฝั่งตะวันออก ('ตง') กับชายฝั่งตะวันตก ('ซอ')

เส้นทางนี้ตัดผ่านภูเขา ป่าไม้ และเมืองเล็ก ๆ เผยให้ผู้เดินได้เห็นเกาหลีในมุมที่ช้าลงและเงียบสงบกว่า ห่างไกลจากถนนที่พลุกพล่านของโซล นักเดินป่าสามารถเดินช่วงสั้น ๆ ในหนึ่งวัน หรือลองเดินช่วงยาวหลายวัน พร้อมแวะพักตามหมู่บ้านท้องถิ่นระหว่างทาง

การเดินเขาเป็นงานอดิเรกที่ชาวเกาหลีรักใคร่ ในประเทศที่ขึ้นชื่อเรื่องภูเขา เส้นทางใหม่นี้เป็นส่วนหนึ่งของความพยายามครั้งใหญ่ในการกระจายการท่องเที่ยวออกไปนอกเมืองใหญ่ สู่ธรรมชาติและประสบการณ์ในเมืองเล็ก สำหรับนักท่องเที่ยว มันเปิดโอกาสให้ได้เห็นส่วนต่าง ๆ ของประเทศที่นักท่องเที่ยวต่างชาติน้อยคนจะได้ไปถึง$a25$,
$a25$Korea Selatan membuka cara yang benar-benar baru untuk menjelajahi negeri ini dengan berjalan kaki. Jalur Dongseo, rute hiking jarak jauh dari pantai ke pantai pertama di negara itu, dijadwalkan dibuka sebagian pada 2026. Setelah rampung, panjangnya sekitar 849 kilometer, menghubungkan pantai timur ('dong') dengan pantai barat ('seo').

Jalur ini melintasi pegunungan, hutan, dan kota-kota kecil, memperlihatkan sisi Korea yang lebih lambat dan tenang bagi para pejalan, jauh dari jalanan Seoul yang sibuk. Pendaki bisa menempuh bagian pendek dalam sehari atau menaklukkan rute lebih panjang selama beberapa hari, singgah di desa-desa lokal sepanjang jalan.

Hiking adalah hobi yang dicintai di Korea Selatan, yang terkenal dengan pegunungannya. Jalur baru ini bagian dari upaya lebih luas untuk menyebar pariwisata ke luar kota besar, menuju alam dan pengalaman kota kecil. Bagi pengunjung, ia menawarkan kesempatan melihat bagian-bagian negeri yang jarang dijangkau wisatawan asing.$a25$,
$a25$The Dongseo Trail, South Korea's first coast-to-coast hiking route (~849 km), partially opens in 2026, linking the east and west coasts through mountains and towns.$a25$,
$a25$Dongseo Trail, Korea hiking, long-distance trail, Korea nature travel, coast-to-coast trail, regional tourism$a25$,
'beginner',
3, 4, 4,
$a25$[
{"word":"산","reading":"san","reading_ja":"サン","part_of_speech":"noun","definition_en":"mountain","definition_ja":"山","definition_zh_tw":"山","definition_es":"montaña","definition_de":"Berg","definition_fr":"montagne","definition_vi":"núi","definition_th":"ภูเขา","definition_id":"gunung","example_ko":"한국에는 산이 많다.","example_en":"There are many mountains in Korea.","example_ja":"韓国には山が多い。","example_zh_tw":"韓國有很多山。","example_es":"En Corea hay muchas montañas.","example_de":"In Korea gibt es viele Berge.","example_fr":"Il y a beaucoup de montagnes en Corée.","example_vi":"Ở Hàn Quốc có nhiều núi.","example_th":"ในเกาหลีมีภูเขาเยอะ","example_id":"Di Korea ada banyak gunung."},
{"word":"길","reading":"gil","reading_ja":"キル","part_of_speech":"noun","definition_en":"road; path; trail","definition_ja":"道","definition_zh_tw":"路；步道","definition_es":"camino; sendero","definition_de":"Weg; Straße","definition_fr":"chemin; route","definition_vi":"con đường; đường mòn","definition_th":"ถนน; เส้นทาง","definition_id":"jalan; jalur","example_ko":"이 길은 바다까지 이어진다.","example_en":"This path leads all the way to the sea.","example_ja":"この道は海まで続いている。","example_zh_tw":"這條路一直通到海邊。","example_es":"Este camino llega hasta el mar.","example_de":"Dieser Weg führt bis zum Meer.","example_fr":"Ce chemin mène jusqu'à la mer.","example_vi":"Con đường này dẫn ra tận biển.","example_th":"เส้นทางนี้ทอดยาวไปจนถึงทะเล","example_id":"Jalan ini menuju hingga ke laut."},
{"word":"자연","reading":"jayeon","reading_ja":"チャヨン","part_of_speech":"noun","definition_en":"nature","definition_ja":"自然","definition_zh_tw":"大自然；自然","definition_es":"naturaleza","definition_de":"Natur","definition_fr":"nature","definition_vi":"thiên nhiên","definition_th":"ธรรมชาติ","definition_id":"alam","example_ko":"사람들은 자연 속에서 쉬고 싶어 한다.","example_en":"People want to relax in nature.","example_ja":"人々は自然の中で休みたがる。","example_zh_tw":"人們想在大自然中放鬆。","example_es":"La gente quiere descansar en la naturaleza.","example_de":"Menschen wollen sich in der Natur erholen.","example_fr":"Les gens veulent se détendre dans la nature.","example_vi":"Mọi người muốn nghỉ ngơi giữa thiên nhiên.","example_th":"ผู้คนอยากพักผ่อนท่ามกลางธรรมชาติ","example_id":"Orang ingin bersantai di alam."},
{"word":"걷다","reading":"geotda","reading_ja":"コッタ","part_of_speech":"verb","definition_en":"to walk","definition_ja":"歩く","definition_zh_tw":"走；步行","definition_es":"caminar; andar","definition_de":"gehen; laufen","definition_fr":"marcher","definition_vi":"đi bộ","definition_th":"เดิน","definition_id":"berjalan","example_ko":"우리는 산길을 오래 걸었다.","example_en":"We walked the mountain path for a long time.","example_ja":"私たちは山道を長く歩いた。","example_zh_tw":"我們在山路上走了很久。","example_es":"Caminamos mucho por el sendero de montaña.","example_de":"Wir gingen lange den Bergpfad entlang.","example_fr":"Nous avons longtemps marché sur le sentier de montagne.","example_vi":"Chúng tôi đã đi bộ trên đường núi rất lâu.","example_th":"เราเดินบนเส้นทางภูเขานานมาก","example_id":"Kami berjalan lama di jalur gunung."},
{"word":"경치","reading":"gyeongchi","reading_ja":"キョンチ","part_of_speech":"noun","definition_en":"scenery; view","definition_ja":"景色","definition_zh_tw":"景色；風景","definition_es":"paisaje; vistas","definition_de":"Landschaft; Aussicht","definition_fr":"paysage; vue","definition_vi":"phong cảnh; cảnh sắc","definition_th":"ทิวทัศน์; วิว","definition_id":"pemandangan","example_ko":"산 위에서 본 경치가 아름다웠다.","example_en":"The scenery from the mountain was beautiful.","example_ja":"山の上から見た景色は美しかった。","example_zh_tw":"從山上看到的景色很美。","example_es":"El paisaje desde la montaña era hermoso.","example_de":"Die Aussicht vom Berg war wunderschön.","example_fr":"Le paysage depuis la montagne était magnifique.","example_vi":"Phong cảnh nhìn từ trên núi thật đẹp.","example_th":"ทิวทัศน์จากบนภูเขาสวยงามมาก","example_id":"Pemandangan dari gunung sangat indah."}
]$a25$::jsonb,
'published', true, 0,
'2026-07-04T23:00:00Z', '2026-07-04T23:00:00Z', '2026-07-04T23:00:00Z'
);

-- Article 26 — 2026-07-06 tech intermediate — delivery robots on sidewalks
INSERT INTO articles (topic_id, slug, title_en, title_ko, title_ja, title_zh_tw, title_es, title_de, title_fr, title_vi, title_th, title_id, summary_en, summary_ko, summary_ja, summary_zh_tw, summary_es, summary_de, summary_fr, summary_vi, summary_th, summary_id, content_en, content_ko, content_ja, content_zh_tw, content_es, content_de, content_fr, content_vi, content_th, content_id, seo_description, seo_keywords, level, reading_time_en, reading_time_ko, reading_time_ja, vocabulary, status, ai_generated, view_count, published_at, created_at, updated_at) VALUES (
(SELECT id FROM topics WHERE slug = 'tech'),
'tech-2026-07-06',
$a26$Delivery Robots Become a Common Sight on Korea's Sidewalks$a26$,
$a26$한국 인도 위 배달 로봇, 흔한 풍경으로$a26$,
$a26$韓国の歩道に配達ロボット、日常の風景に$a26$,
$a26$外送機器人成韓國人行道上的日常風景$a26$,
$a26$Los robots de reparto ya son habituales en las aceras de Corea$a26$,
$a26$Lieferroboter gehören auf Koreas Gehwegen zum Alltag$a26$,
$a26$Les robots livreurs, désormais courants sur les trottoirs coréens$a26$,
$a26$Robot giao hàng thành cảnh quen trên vỉa hè Hàn Quốc$a26$,
$a26$หุ่นยนต์ส่งของกลายเป็นภาพชินตาบนทางเท้าเกาหลี$a26$,
$a26$Robot Pengantar Jadi Pemandangan Umum di Trotoar Korea$a26$,
$a26$In 2026, delivery robots are a common sight on South Korea's sidewalks after the government gave them a legal status like human pedestrians. Companies such as Neubility send robots to carry food and parcels to customers' doors, part of Korea's push to lead in robotics.$a26$,
$a26$2026년 한국에서는 정부가 배달 로봇에 사람 보행자와 비슷한 법적 지위를 주면서, 인도 위 배달 로봇이 흔한 풍경이 됐다. 뉴빌리티 같은 회사가 음식과 택배를 고객의 문 앞까지 나르는 로봇을 운영하며, 이는 로봇 강국을 노리는 한국의 노력의 일부다.$a26$,
$a26$2026年、韓国では政府が配達ロボットに人の歩行者と同様の法的地位を与えたことで、歩道の配達ロボットが日常の風景になった。ニュービリティなどの企業が、食べ物や荷物を客の玄関先まで運ぶロボットを運用しており、ロボット大国を目指す韓国の取り組みの一部だ。$a26$,
$a26$2026年，韓國政府賦予外送機器人類似人類行人的法律地位後，人行道上的外送機器人成了日常景象。Neubility等公司運營把食物與包裹送到顧客門口的機器人，這是韓國力圖領先機器人領域的一環。$a26$,
$a26$En 2026, los robots de reparto son habituales en las aceras de Corea del Sur después de que el gobierno les diera un estatus legal parecido al de los peatones. Empresas como Neubility usan robots para llevar comida y paquetes hasta la puerta del cliente, dentro del empeño coreano por liderar la robótica.$a26$,
$a26$2026 gehören Lieferroboter auf Südkoreas Gehwegen zum Alltag, nachdem die Regierung ihnen einen rechtlichen Status ähnlich dem von Fußgängern gab. Firmen wie Neubility schicken Roboter, die Essen und Pakete bis vor die Haustür bringen – Teil von Koreas Streben, in der Robotik führend zu sein.$a26$,
$a26$En 2026, les robots livreurs sont courants sur les trottoirs de Corée du Sud, après que le gouvernement leur a accordé un statut légal proche de celui des piétons. Des entreprises comme Neubility envoient des robots livrer nourriture et colis jusqu'à la porte des clients, dans le cadre de l'ambition coréenne de dominer la robotique.$a26$,
$a26$Năm 2026, robot giao hàng trở thành cảnh quen trên vỉa hè Hàn Quốc sau khi chính phủ trao cho chúng địa vị pháp lý giống người đi bộ. Các công ty như Neubility dùng robot mang đồ ăn và bưu kiện đến tận cửa khách hàng, một phần trong nỗ lực dẫn đầu về robot của Hàn Quốc.$a26$,
$a26$ในปี 2026 หุ่นยนต์ส่งของกลายเป็นภาพชินตาบนทางเท้าของเกาหลีใต้ หลังรัฐบาลให้สถานะทางกฎหมายแก่พวกมันคล้ายคนเดินเท้า บริษัทอย่าง Neubility ใช้หุ่นยนต์นำอาหารและพัสดุไปส่งถึงหน้าประตูลูกค้า เป็นส่วนหนึ่งของความพยายามของเกาหลีที่จะเป็นผู้นำด้านหุ่นยนต์$a26$,
$a26$Pada 2026, robot pengantar menjadi pemandangan umum di trotoar Korea Selatan setelah pemerintah memberi mereka status hukum mirip pejalan kaki. Perusahaan seperti Neubility mengirim robot untuk mengantar makanan dan paket ke depan pintu pelanggan, bagian dari upaya Korea memimpin di bidang robotika.$a26$,
$a26$Small wheeled robots delivering food and packages have become a normal sight on South Korea's sidewalks in 2026. After the government gave delivery robots a legal status similar to that of human pedestrians, the machines can now roll along footpaths, ride apartment elevators, and enter office buildings on their own.

Companies such as Neubility, which makes autonomous delivery robots, have led the rollout. A robot can carry a coffee or a parcel from a shop to a customer's door, using cameras and sensors to avoid people and obstacles. Customers often unlock the robot's storage box with a code on their phone.

The change is part of South Korea's push to become a leader in robotics and 'smart cities.' The government has set ambitious targets for building robots and wants them used across many industries. Allowing robots on sidewalks was a key legal step, because until recently it was unclear where such machines were even allowed to go.

For residents, the robots promise cheaper, round-the-clock deliveries and help in a country with a shrinking, aging workforce. But their spread also raises everyday questions — about crowded sidewalks, safety around children and older people, and what happens when a robot and a pedestrian want the same narrow path.$a26$,
$a26$음식과 택배를 나르는 작은 바퀴 로봇이 2026년 한국의 인도에서 흔히 볼 수 있는 풍경이 됐다. 정부가 배달 로봇에 사람 보행자와 비슷한 법적 지위를 부여한 뒤, 이 기계들은 이제 스스로 인도를 달리고, 아파트 엘리베이터를 타며, 사무실 건물 안까지 들어갈 수 있다.

자율주행 배달 로봇을 만드는 뉴빌리티 같은 회사들이 이 확산을 이끌었다. 로봇은 카메라와 센서로 사람과 장애물을 피하며, 가게에서 커피나 소포를 고객의 문 앞까지 옮긴다. 고객은 보통 휴대폰의 코드로 로봇의 보관함을 연다.

이 변화는 로봇과 '스마트시티' 분야를 선도하려는 한국의 노력의 일부다. 정부는 로봇 생산에 야심 찬 목표를 세우고, 여러 산업에서 로봇이 쓰이기를 바란다. 로봇을 인도에 다니게 허용한 것은 중요한 법적 단계였다. 얼마 전까지만 해도 이런 기계가 어디를 다녀도 되는지조차 분명하지 않았기 때문이다.

주민들에게 로봇은 더 저렴하고 24시간 이용 가능한 배달을 약속하며, 노동력이 줄고 고령화하는 나라에서 도움이 된다. 그러나 로봇의 확산은 일상의 물음도 낳는다. 붐비는 인도, 아이와 노인 주변에서의 안전, 그리고 로봇과 보행자가 같은 좁은 길을 원할 때 어떻게 할지 같은 것들이다.$a26$,
$a26$食べ物や荷物を運ぶ小さな車輪付きロボットが、2026年の韓国の歩道でよく見かける光景になった。政府が配達ロボットに人の歩行者と同様の法的地位を与えたことで、これらの機械は今や自分で歩道を走り、マンションのエレベーターに乗り、オフィスビルの中まで入っていける。

自律走行の配達ロボットを作るニュービリティなどの企業が、この普及をけん引した。ロボットはカメラとセンサーで人や障害物を避けながら、店からコーヒーや小包を客の玄関先まで運ぶ。客はたいてい携帯電話のコードでロボットの収納ボックスを開ける。

この変化は、ロボットや「スマートシティ」の分野で先頭に立とうとする韓国の取り組みの一部だ。政府はロボット生産に野心的な目標を掲げ、さまざまな産業で使われることを望んでいる。ロボットを歩道に通せるようにしたことは重要な法的一歩だった。少し前まで、こうした機械がどこを通ってよいのかさえはっきりしていなかったからだ。

住民にとってロボットは、より安く24時間使える配達を約束し、労働力が減り高齢化する国で助けになる。しかしロボットの拡大は日常の問いも生む。混み合う歩道、子どもや高齢者のそばでの安全、そしてロボットと歩行者が同じ狭い道を通りたいときにどうするか、といったことだ。$a26$,
$a26$載運食物與包裹的小型輪式機器人，在2026年成了韓國人行道上常見的景象。政府賦予外送機器人類似人類行人的法律地位後，這些機器如今能自行在人行道上行駛、搭乘公寓電梯，甚至進入辦公大樓內部。

打造自駕外送機器人的Neubility等公司帶動了這波普及。機器人以攝影機與感測器閃避行人和障礙物，把咖啡或包裹從店家送到顧客門口。顧客通常用手機上的密碼打開機器人的置物箱。

這項改變，是韓國力圖在機器人與「智慧城市」領域領先的一環。政府為機器人生產訂下雄心目標，並希望它們被用於各行各業。允許機器人上人行道是關鍵的法律一步，因為直到不久前，這類機器究竟能走哪裡都還不明確。

對居民而言，機器人帶來更便宜、全天候的配送，在勞動力萎縮、人口老化的國家很有幫助。但機器人的擴散也引發日常疑問：擁擠的人行道、在孩童與長者身旁的安全，以及當機器人與行人都想走同一條窄路時該怎麼辦。$a26$,
$a26$Pequeños robots con ruedas que llevan comida y paquetes se han vuelto una imagen habitual en las aceras de Corea del Sur en 2026. Después de que el gobierno les diera un estatus legal parecido al de los peatones, estas máquinas ya pueden circular por las aceras, subir en los ascensores de los edificios de viviendas y entrar solas en las oficinas.

Empresas como Neubility, que fabrica robots de reparto autónomos, han liderado la expansión. Un robot puede llevar un café o un paquete desde una tienda hasta la puerta del cliente, usando cámaras y sensores para esquivar a personas y obstáculos. El cliente suele abrir el compartimento del robot con un código en el móvil.

El cambio forma parte del empeño de Corea del Sur por liderar la robótica y las 'ciudades inteligentes'. El gobierno ha fijado metas ambiciosas para fabricar robots y quiere que se usen en muchos sectores. Permitir robots en las aceras fue un paso legal clave, porque hasta hace poco ni siquiera estaba claro por dónde podían circular esas máquinas.

Para los vecinos, los robots prometen entregas más baratas y a cualquier hora, y ayudan en un país con una población activa que se reduce y envejece. Pero su expansión también plantea preguntas cotidianas: aceras abarrotadas, seguridad cerca de niños y mayores, y qué pasa cuando un robot y un peatón quieren el mismo camino estrecho.$a26$,
$a26$Kleine Roboter auf Rädern, die Essen und Pakete transportieren, sind 2026 auf Südkoreas Gehwegen ein alltäglicher Anblick geworden. Nachdem die Regierung Lieferrobotern einen rechtlichen Status ähnlich dem von Fußgängern gab, können die Maschinen nun selbstständig über Gehwege rollen, in Wohnhausaufzügen mitfahren und Bürogebäude betreten.

Firmen wie Neubility, das autonome Lieferroboter baut, trieben die Verbreitung voran. Ein Roboter kann einen Kaffee oder ein Paket vom Geschäft bis vor die Tür des Kunden bringen und weicht mit Kameras und Sensoren Menschen und Hindernissen aus. Kunden öffnen das Fach des Roboters meist mit einem Code auf dem Handy.

Der Wandel ist Teil von Südkoreas Bestreben, in Robotik und 'Smart Cities' führend zu werden. Die Regierung hat ehrgeizige Ziele für den Roboterbau gesetzt und will, dass sie in vielen Branchen eingesetzt werden. Roboter auf Gehwegen zuzulassen war ein wichtiger rechtlicher Schritt, denn bis vor Kurzem war unklar, wo solche Maschinen überhaupt fahren durften.

Für Anwohner versprechen die Roboter günstigere Lieferungen rund um die Uhr und helfen in einem Land mit schrumpfender, alternder Erwerbsbevölkerung. Doch ihre Ausbreitung wirft auch Alltagsfragen auf – zu überfüllten Gehwegen, zur Sicherheit neben Kindern und Älteren und dazu, was passiert, wenn Roboter und Fußgänger denselben schmalen Weg wollen.$a26$,
$a26$De petits robots à roues transportant repas et colis sont devenus un spectacle courant sur les trottoirs de Corée du Sud en 2026. Après que le gouvernement leur a accordé un statut légal proche de celui des piétons, ces machines peuvent désormais rouler seules sur les trottoirs, prendre les ascenseurs des immeubles et entrer dans les bureaux.

Des entreprises comme Neubility, qui fabrique des robots livreurs autonomes, ont mené ce déploiement. Un robot peut apporter un café ou un colis d'un magasin jusqu'à la porte du client, en utilisant caméras et capteurs pour éviter personnes et obstacles. Le client ouvre en général le compartiment du robot avec un code sur son téléphone.

Ce changement s'inscrit dans l'ambition de la Corée du Sud de dominer la robotique et les 'villes intelligentes'. Le gouvernement a fixé des objectifs ambitieux de fabrication de robots et veut qu'ils servent dans de nombreux secteurs. Autoriser les robots sur les trottoirs a été une étape juridique clé, car jusqu'à récemment on ne savait même pas où ces machines avaient le droit de circuler.

Pour les habitants, les robots promettent des livraisons moins chères et à toute heure, et aident dans un pays à la population active qui diminue et vieillit. Mais leur multiplication soulève aussi des questions quotidiennes : trottoirs encombrés, sécurité près des enfants et des personnes âgées, et que faire quand un robot et un piéton veulent le même passage étroit.$a26$,
$a26$Những chú robot nhỏ có bánh xe chở đồ ăn và bưu kiện đã trở thành cảnh thường thấy trên vỉa hè Hàn Quốc năm 2026. Sau khi chính phủ trao cho robot giao hàng địa vị pháp lý giống người đi bộ, các cỗ máy này giờ có thể tự lăn bánh trên vỉa hè, đi thang máy chung cư và vào trong tòa nhà văn phòng.

Các công ty như Neubility, hãng chế tạo robot giao hàng tự hành, đã dẫn đầu quá trình phổ biến này. Một robot có thể mang cà phê hay bưu kiện từ cửa hàng đến tận cửa khách, dùng camera và cảm biến để tránh người và chướng ngại vật. Khách thường mở khoang chứa của robot bằng một mã trên điện thoại.

Sự thay đổi này nằm trong nỗ lực của Hàn Quốc nhằm dẫn đầu về robot và 'thành phố thông minh'. Chính phủ đặt các mục tiêu tham vọng về chế tạo robot và muốn chúng được dùng trong nhiều ngành. Cho phép robot đi trên vỉa hè là một bước pháp lý then chốt, bởi cho đến gần đây vẫn chưa rõ những cỗ máy như vậy được phép đi ở đâu.

Với người dân, robot hứa hẹn giao hàng rẻ hơn và suốt ngày đêm, và hỗ trợ ở một đất nước có lực lượng lao động đang thu hẹp và già đi. Nhưng sự lan rộng của chúng cũng đặt ra những câu hỏi thường nhật: vỉa hè đông đúc, an toàn quanh trẻ em và người già, và chuyện gì xảy ra khi robot và người đi bộ cùng muốn đi trên một lối hẹp.$a26$,
$a26$หุ่นยนต์ล้อเลื่อนขนาดเล็กที่ขนอาหารและพัสดุกลายเป็นภาพที่พบเห็นได้ทั่วไปบนทางเท้าของเกาหลีใต้ในปี 2026 หลังรัฐบาลให้สถานะทางกฎหมายแก่หุ่นยนต์ส่งของคล้ายคนเดินเท้า เครื่องเหล่านี้จึงสามารถวิ่งบนทางเท้า ขึ้นลิฟต์อพาร์ตเมนต์ และเข้าไปในอาคารสำนักงานได้ด้วยตัวเอง

บริษัทอย่าง Neubility ซึ่งผลิตหุ่นยนต์ส่งของอัตโนมัติ เป็นผู้นำการแพร่หลายนี้ หุ่นยนต์สามารถนำกาแฟหรือพัสดุจากร้านไปส่งถึงหน้าประตูลูกค้า โดยใช้กล้องและเซนเซอร์หลบผู้คนและสิ่งกีดขวาง ลูกค้ามักปลดล็อกกล่องเก็บของของหุ่นยนต์ด้วยรหัสบนโทรศัพท์

การเปลี่ยนแปลงนี้เป็นส่วนหนึ่งของความพยายามของเกาหลีใต้ที่จะเป็นผู้นำด้านหุ่นยนต์และ 'เมืองอัจฉริยะ' รัฐบาลตั้งเป้าหมายอันทะเยอทะยานในการผลิตหุ่นยนต์ และต้องการให้มีการใช้งานในหลายอุตสาหกรรม การอนุญาตให้หุ่นยนต์อยู่บนทางเท้าเป็นก้าวทางกฎหมายที่สำคัญ เพราะจนกระทั่งไม่นานมานี้ ยังไม่ชัดเจนด้วยซ้ำว่าเครื่องเหล่านี้ได้รับอนุญาตให้ไปที่ไหนบ้าง

สำหรับผู้อยู่อาศัย หุ่นยนต์ให้คำมั่นเรื่องการส่งของที่ถูกลงและตลอด 24 ชั่วโมง และช่วยได้ในประเทศที่กำลังแรงงานหดตัวและเข้าสู่สังคมสูงวัย แต่การแพร่หลายของมันก็ก่อคำถามในชีวิตประจำวันเช่นกัน ทั้งทางเท้าที่แออัด ความปลอดภัยใกล้เด็กและผู้สูงอายุ และจะทำอย่างไรเมื่อหุ่นยนต์กับคนเดินเท้าต่างต้องการใช้ทางแคบเดียวกัน$a26$,
$a26$Robot beroda kecil yang mengangkut makanan dan paket telah menjadi pemandangan umum di trotoar Korea Selatan pada 2026. Setelah pemerintah memberi robot pengantar status hukum mirip pejalan kaki, mesin-mesin ini kini dapat melaju sendiri di trotoar, naik lift apartemen, dan masuk ke gedung perkantoran.

Perusahaan seperti Neubility, yang membuat robot pengantar otonom, memimpin penyebaran ini. Sebuah robot dapat membawa kopi atau paket dari toko hingga ke depan pintu pelanggan, menggunakan kamera dan sensor untuk menghindari orang dan rintangan. Pelanggan biasanya membuka kotak penyimpanan robot dengan kode di ponsel.

Perubahan ini bagian dari upaya Korea Selatan menjadi pemimpin dalam robotika dan 'kota pintar'. Pemerintah menetapkan target ambisius untuk membuat robot dan ingin robot dipakai di banyak industri. Mengizinkan robot di trotoar adalah langkah hukum penting, karena hingga baru-baru ini belum jelas ke mana mesin semacam itu boleh pergi.

Bagi warga, robot menjanjikan pengantaran yang lebih murah dan sepanjang waktu, serta membantu di negara dengan tenaga kerja yang menyusut dan menua. Namun penyebarannya juga menimbulkan pertanyaan sehari-hari — soal trotoar yang padat, keselamatan di dekat anak-anak dan lansia, serta apa yang terjadi ketika robot dan pejalan kaki sama-sama menginginkan jalur sempit yang sama.$a26$,
$a26$In 2026, delivery robots are common on South Korea's sidewalks after the government gave them pedestrian-like legal status; firms like Neubility deliver to the door.$a26$,
$a26$delivery robots, Korea robotics, Neubility, smart city, autonomous robots, sidewalk robots$a26$,
'intermediate',
3, 4, 4,
$a26$[
{"word":"로봇","reading":"robot","reading_ja":"ロボッ","part_of_speech":"noun","definition_en":"robot","definition_ja":"ロボット","definition_zh_tw":"機器人","definition_es":"robot","definition_de":"Roboter","definition_fr":"robot","definition_vi":"robot","definition_th":"หุ่นยนต์","definition_id":"robot","example_ko":"로봇이 커피를 배달했다.","example_en":"A robot delivered the coffee.","example_ja":"ロボットがコーヒーを配達した。","example_zh_tw":"機器人送來了咖啡。","example_es":"Un robot entregó el café.","example_de":"Ein Roboter lieferte den Kaffee.","example_fr":"Un robot a livré le café.","example_vi":"Một robot đã giao cà phê.","example_th":"หุ่นยนต์นำกาแฟมาส่ง","example_id":"Sebuah robot mengantar kopi."},
{"word":"배달","reading":"baedal","reading_ja":"ペダル","part_of_speech":"noun","definition_en":"delivery","definition_ja":"配達","definition_zh_tw":"外送；配送","definition_es":"reparto; entrega a domicilio","definition_de":"Lieferung","definition_fr":"livraison","definition_vi":"sự giao hàng","definition_th":"การส่งของ; การจัดส่ง","definition_id":"pengantaran; pesan-antar","example_ko":"요즘 로봇 배달이 늘고 있다.","example_en":"Robot delivery is increasing these days.","example_ja":"最近、ロボット配達が増えている。","example_zh_tw":"最近機器人外送越來越多。","example_es":"El reparto con robots va en aumento.","example_de":"Roboterlieferungen nehmen derzeit zu.","example_fr":"Les livraisons par robot se multiplient.","example_vi":"Dạo này việc giao hàng bằng robot ngày càng nhiều.","example_th":"ช่วงนี้การส่งของด้วยหุ่นยนต์เพิ่มขึ้น","example_id":"Pengantaran dengan robot kini meningkat."},
{"word":"기술","reading":"gisul","reading_ja":"キスル","part_of_speech":"noun","definition_en":"technology; technique","definition_ja":"技術","definition_zh_tw":"技術","definition_es":"tecnología; técnica","definition_de":"Technik; Technologie","definition_fr":"technologie; technique","definition_vi":"công nghệ; kỹ thuật","definition_th":"เทคโนโลยี; เทคนิค","definition_id":"teknologi; teknik","example_ko":"한국은 로봇 기술이 발달했다.","example_en":"Korea has advanced robot technology.","example_ja":"韓国はロボット技術が進んでいる。","example_zh_tw":"韓國的機器人技術很發達。","example_es":"Corea tiene una tecnología robótica avanzada.","example_de":"Korea verfügt über fortschrittliche Robotertechnik.","example_fr":"La Corée dispose d'une technologie robotique avancée.","example_vi":"Hàn Quốc có công nghệ robot phát triển.","example_th":"เกาหลีมีเทคโนโลยีหุ่นยนต์ที่ก้าวหน้า","example_id":"Korea memiliki teknologi robot yang maju."},
{"word":"인공지능","reading":"in-gongjineung","reading_ja":"インゴンジヌン","part_of_speech":"noun","definition_en":"artificial intelligence (AI)","definition_ja":"人工知能（AI）","definition_zh_tw":"人工智慧（AI）","definition_es":"inteligencia artificial (IA)","definition_de":"künstliche Intelligenz (KI)","definition_fr":"intelligence artificielle (IA)","definition_vi":"trí tuệ nhân tạo (AI)","definition_th":"ปัญญาประดิษฐ์ (AI)","definition_id":"kecerdasan buatan (AI)","example_ko":"이 로봇은 인공지능으로 길을 찾는다.","example_en":"This robot finds its way using artificial intelligence.","example_ja":"このロボットは人工知能で道を見つける。","example_zh_tw":"這台機器人用人工智慧找路。","example_es":"Este robot encuentra el camino con inteligencia artificial.","example_de":"Dieser Roboter findet mit künstlicher Intelligenz seinen Weg.","example_fr":"Ce robot trouve son chemin grâce à l'intelligence artificielle.","example_vi":"Robot này tìm đường bằng trí tuệ nhân tạo.","example_th":"หุ่นยนต์นี้หาเส้นทางด้วยปัญญาประดิษฐ์","example_id":"Robot ini mencari jalan menggunakan kecerdasan buatan."},
{"word":"편리하다","reading":"pyeollihada","reading_ja":"ピョルリハダ","part_of_speech":"adjective","definition_en":"to be convenient","definition_ja":"便利である","definition_zh_tw":"方便的","definition_es":"ser cómodo; práctico","definition_de":"praktisch sein; bequem sein","definition_fr":"être pratique; commode","definition_vi":"tiện lợi","definition_th":"สะดวก","definition_id":"praktis; nyaman","example_ko":"로봇 배달은 아주 편리하다.","example_en":"Robot delivery is very convenient.","example_ja":"ロボット配達はとても便利だ。","example_zh_tw":"機器人外送非常方便。","example_es":"El reparto con robots es muy cómodo.","example_de":"Roboterlieferung ist sehr praktisch.","example_fr":"La livraison par robot est très pratique.","example_vi":"Giao hàng bằng robot rất tiện lợi.","example_th":"การส่งของด้วยหุ่นยนต์สะดวกมาก","example_id":"Pengantaran dengan robot sangat praktis."}
]$a26$::jsonb,
'published', true, 0,
'2026-07-05T23:00:00Z', '2026-07-05T23:00:00Z', '2026-07-05T23:00:00Z'
);

-- Article 27 — 2026-07-07 food advanced — Michelin Guide Seoul & Busan 2026 record
INSERT INTO articles (topic_id, slug, title_en, title_ko, title_ja, title_zh_tw, title_es, title_de, title_fr, title_vi, title_th, title_id, summary_en, summary_ko, summary_ja, summary_zh_tw, summary_es, summary_de, summary_fr, summary_vi, summary_th, summary_id, content_en, content_ko, content_ja, content_zh_tw, content_es, content_de, content_fr, content_vi, content_th, content_id, seo_description, seo_keywords, level, reading_time_en, reading_time_ko, reading_time_ja, vocabulary, status, ai_generated, view_count, published_at, created_at, updated_at) VALUES (
(SELECT id FROM topics WHERE slug = 'food'),
'food-2026-07-07',
$a27$Michelin's 2026 Seoul-Busan Guide Hits a Record for Starred Restaurants$a27$,
$a27$미쉐린 2026 서울·부산, 별 단 식당 역대 최다$a27$,
$a27$ミシュラン2026ソウル・釜山、星付き店が過去最多$a27$,
$a27$米其林2026首爾釜山 星級餐廳數創新高$a27$,
$a27$La guía Michelin 2026 de Seúl y Busan bate su récord de estrellas$a27$,
$a27$Michelin-Guide 2026 für Seoul und Busan mit Sterne-Rekord$a27$,
$a27$Le guide Michelin 2026 Séoul-Busan bat son record d'étoiles$a27$,
$a27$Michelin 2026 Seoul–Busan lập kỷ lục nhà hàng gắn sao$a27$,
$a27$มิชลิน 2026 โซล-ปูซาน ทำสถิติร้านติดดาวมากสุด$a27$,
$a27$Panduan Michelin 2026 Seoul-Busan Cetak Rekor Restoran Berbintang$a27$,
$a27$The 2026 Michelin Guide for Seoul and Busan lists a record 233 restaurants — with 42 starred in Seoul alone — marking a decade of the guide in Korea. It reflects the rise of Korean fine dining, though much of the country's best food is still found in unrated markets and family spots.$a27$,
$a27$2026 미쉐린 가이드 서울·부산 편이 역대 최다인 233개 식당을 소개했고, 서울에서만 42곳이 별을 받았다. 한국 진출 10년을 맞은 이번 가이드는 한국 파인다이닝의 성장을 보여 준다. 다만 한국 최고의 음식 상당수는 여전히 별을 받지 않는 시장과 가족 식당에 있다.$a27$,
$a27$2026年版ミシュランガイド・ソウル&釜山が、過去最多の233店を掲載し、ソウルだけで42店が星を獲得した。韓国進出10年を迎えた今回のガイドは、韓国のファインダイニングの成長を映す。ただし韓国で最高の料理の多くは、今も星のつかない市場や家族経営の店にある。$a27$,
$a27$2026米其林指南首爾&釜山版收錄創紀錄的233家餐廳，光是首爾就有42家摘星。邁入進軍韓國第10年，這份指南展現韓國精緻餐飲的崛起。不過，韓國最頂級的美食有很多仍在未獲評星的市場與家庭餐館裡。$a27$,
$a27$La Guía Michelin 2026 de Seúl y Busan incluye un récord de 233 restaurantes —42 con estrella solo en Seúl— al cumplirse una década de la guía en Corea. Refleja el auge de la alta cocina coreana, aunque buena parte de la mejor comida del país sigue en mercados y locales familiares sin estrella.$a27$,
$a27$Der Michelin-Guide 2026 für Seoul und Busan führt mit 233 Restaurants einen Rekord – allein 42 mit Stern in Seoul – zum zehnjährigen Bestehen des Guides in Korea. Er zeigt den Aufstieg der koreanischen Spitzenküche, auch wenn vieles vom besten Essen des Landes weiter auf Märkten und in Familienlokalen ohne Stern zu finden ist.$a27$,
$a27$Le guide Michelin 2026 de Séoul et Busan recense un record de 233 restaurants — dont 42 étoilés rien qu'à Séoul — pour les dix ans du guide en Corée. Il reflète l'essor de la haute cuisine coréenne, même si une grande partie de la meilleure cuisine du pays se trouve encore dans des marchés et des adresses familiales non notés.$a27$,
$a27$Cẩm nang Michelin 2026 cho Seoul và Busan liệt kê kỷ lục 233 nhà hàng — riêng Seoul đã có 42 nhà hàng gắn sao — nhân một thập kỷ cẩm nang có mặt ở Hàn Quốc. Nó phản ánh sự vươn lên của ẩm thực cao cấp Hàn, dù nhiều món ngon nhất vẫn nằm ở các khu chợ và quán gia đình không được xếp hạng.$a27$,
$a27$คู่มือมิชลิน 2026 สำหรับโซลและปูซานรวบรวมร้านอาหารสูงเป็นสถิติ 233 ร้าน โดยเฉพาะในโซลมี 42 ร้านที่ได้ดาว ในโอกาสครบ 10 ปีของคู่มือในเกาหลี สะท้อนการเติบโตของอาหารระดับไฟน์ไดนิงเกาหลี แม้อาหารที่ดีที่สุดของประเทศจำนวนมากยังอยู่ในตลาดและร้านครอบครัวที่ไม่ได้รับดาว$a27$,
$a27$Panduan Michelin 2026 untuk Seoul dan Busan mencantumkan rekor 233 restoran — 42 berbintang di Seoul saja — menandai satu dekade panduan itu di Korea. Ia mencerminkan kebangkitan santapan mewah Korea, meski banyak makanan terbaik negeri itu masih ada di pasar dan warung keluarga tanpa bintang.$a27$,
$a27$The 2026 Michelin Guide for Seoul and Busan lists a record 233 restaurants, marking a decade since the famous dining guide arrived in South Korea. Of those, 42 hold Michelin stars in Seoul alone — one with the top three stars, 10 with two, and 31 with one — the largest tally in the guide's Korean history.

The numbers reflect how far Korea's fine-dining scene has come in ten years. When the guide launched in Korea, high-end Korean cuisine was little known abroad. Today, chefs in Seoul and Busan win recognition for dishes that reinterpret Korean traditions — fermented flavors, temple food, royal-court cooking — using modern technique and local ingredients.

Food has become central to how South Korea presents itself to the world. The government promotes 'K-food' alongside K-pop and film, and record numbers of tourists now come partly to eat. Michelin stars help put Korean restaurants on the map for international travelers, and a strong showing burnishes the country's image as a culinary destination, not just a place for street snacks.

Still, the Michelin lens captures only part of the picture. Much of Korea's most loved food is found in humble markets and family-run spots that no inspector will ever rate. The 2026 guide's record count is a milestone, but the country's food culture stretches far beyond its starred tables.$a27$,
$a27$2026 미쉐린 가이드 서울·부산 편이 역대 최다인 233개 식당을 실으며, 이 유명한 미식 안내서가 한국에 온 지 10년을 맞았다. 그중 서울에서만 42곳이 미쉐린 별을 받았는데, 최고 등급인 3스타 1곳, 2스타 10곳, 1스타 31곳으로, 한국판 역사상 가장 많은 수다.

이 숫자는 한국의 파인다이닝이 10년 사이 얼마나 발전했는지를 보여 준다. 가이드가 한국에 처음 나왔을 때만 해도 고급 한식은 해외에 거의 알려지지 않았다. 오늘날 서울과 부산의 요리사들은 발효의 맛, 사찰 음식, 궁중 요리 같은 한국 전통을 현대 기술과 지역 재료로 재해석한 요리로 인정받고 있다.

음식은 한국이 세계에 자신을 보여 주는 방식의 중심이 됐다. 정부는 K-팝, 영화와 함께 'K-푸드'를 알리고, 이제 사상 최대 규모의 관광객이 어느 정도는 먹으러 온다. 미쉐린 별은 한국 식당을 외국 여행자의 지도 위에 올려 주며, 좋은 성적은 이 나라를 길거리 간식만의 곳이 아니라 미식 여행지로서의 이미지를 다듬어 준다.

그럼에도 미쉐린이라는 렌즈는 그림의 일부만 담는다. 한국에서 가장 사랑받는 음식의 상당수는 어떤 심사원도 평가하지 않는 소박한 시장과 가족이 운영하는 가게에 있다. 2026년 가이드의 역대 최다 기록은 하나의 이정표이지만, 한국의 음식 문화는 별을 받은 식탁을 훨씬 넘어 뻗어 있다.$a27$,
$a27$2026年版ミシュランガイド・ソウル&釜山が過去最多の233店を掲載し、この有名な美食ガイドが韓国に来て10年を迎えた。そのうちソウルだけで42店がミシュランの星を獲得し、最高ランクの3つ星が1店、2つ星が10店、1つ星が31店と、韓国版の歴史で最も多い。

この数字は、韓国のファインダイニングがこの10年でどれほど発展したかを示している。ガイドが韓国で初めて登場したころ、高級な韓国料理は海外ではほとんど知られていなかった。今日、ソウルと釜山の料理人たちは、発酵の味、精進料理、宮廷料理といった韓国の伝統を、現代の技術と地元の食材で再解釈した料理で評価を得ている。

食は、韓国が世界に自らを示す方法の中心になった。政府はK-POPや映画とともに「K-フード」をアピールし、今や過去最多の観光客がある程度は食べるために訪れる。ミシュランの星は韓国の店を外国人旅行者の地図に載せ、好成績はこの国を屋台の軽食だけの場所ではなく、美食の旅先としてのイメージに磨きをかける。

それでも、ミシュランというレンズは全体像の一部しか写さない。韓国で最も愛される料理の多くは、どの調査員も評価しない素朴な市場や、家族経営の店にある。2026年版の過去最多の記録は一つの節目だが、韓国の食文化は星のついた食卓をはるかに超えて広がっている。$a27$,
$a27$2026米其林指南首爾&釜山版收錄創紀錄的233家餐廳，適逢這本知名美食指南進軍韓國滿10年。其中光是首爾就有42家摘下米其林星，包括最高等級的三星1家、二星10家與一星31家，是韓國版歷來最多。

這些數字顯示韓國精緻餐飲在10年間有多大進步。指南剛進韓國時，高級韓式料理在海外幾乎不為人知。如今，首爾與釜山的廚師以現代技法與在地食材，重新詮釋發酵風味、寺廟素食、宮廷料理等韓國傳統，贏得肯定。

美食已成為韓國向世界展現自己的核心。政府和K-pop、電影一起推廣「韓食」，如今破紀錄的觀光人潮，有一部分正是為了吃而來。米其林星讓韓國餐廳登上外國旅客的地圖，亮眼成績也把這個國家從「只有街頭小吃」擦亮為「美食旅遊目的地」的形象。

不過，米其林這面鏡子只映出局部。韓國最受喜愛的美食有很多，藏在沒有任何評審會去評分的樸實市場與家庭小館裡。2026年指南的新高紀錄是一座里程碑，但韓國的飲食文化，遠遠超出那些摘星的餐桌。$a27$,
$a27$La Guía Michelin 2026 de Seúl y Busan recoge un récord de 233 restaurantes, al cumplirse una década desde que la famosa guía gastronómica llegó a Corea del Sur. De ellos, 42 tienen estrella solo en Seúl —uno con las máximas tres estrellas, 10 con dos y 31 con una—, la mayor cifra de la historia coreana de la guía.

Las cifras reflejan cuánto ha avanzado la alta cocina coreana en diez años. Cuando la guía se estrenó en Corea, la cocina coreana de lujo era poco conocida fuera del país. Hoy, chefs de Seúl y Busan reciben reconocimiento por platos que reinterpretan tradiciones coreanas —sabores fermentados, cocina de templo, cocina de la corte real— con técnica moderna e ingredientes locales.

La comida se ha vuelto central en la forma en que Corea del Sur se presenta al mundo. El gobierno promueve el 'K-food' junto al K-pop y el cine, y un número récord de turistas viene ahora en parte a comer. Las estrellas Michelin ayudan a poner los restaurantes coreanos en el mapa para los viajeros internacionales, y un buen resultado pule la imagen del país como destino gastronómico, y no solo como lugar de aperitivos callejeros.

Aun así, la lente de Michelin capta solo una parte del cuadro. Buena parte de la comida más querida de Corea está en mercados humildes y locales familiares que ningún inspector calificará jamás. El récord de la guía de 2026 es un hito, pero la cultura gastronómica del país va mucho más allá de sus mesas con estrella.$a27$,
$a27$Der Michelin-Guide 2026 für Seoul und Busan verzeichnet mit 233 Restaurants einen Rekord – ein Jahrzehnt nachdem der berühmte Gastroführer nach Südkorea kam. Davon tragen allein in Seoul 42 einen Michelin-Stern – einer die höchsten drei Sterne, zehn zwei und 31 einen –, die höchste Zahl in der koreanischen Geschichte des Guides.

Die Zahlen zeigen, wie weit sich Koreas Spitzengastronomie in zehn Jahren entwickelt hat. Als der Guide in Korea startete, war gehobene koreanische Küche im Ausland kaum bekannt. Heute erhalten Köche in Seoul und Busan Anerkennung für Gerichte, die koreanische Traditionen – Fermentationsaromen, Tempelküche, Hofküche – mit moderner Technik und lokalen Zutaten neu interpretieren.

Essen ist zentral dafür geworden, wie sich Südkorea der Welt präsentiert. Die Regierung bewirbt 'K-Food' neben K-Pop und Film, und rekordviele Touristen kommen inzwischen auch zum Essen. Michelin-Sterne helfen, koreanische Restaurants auf die Landkarte internationaler Reisender zu setzen, und ein starkes Abschneiden poliert das Image des Landes als kulinarisches Reiseziel, nicht bloß als Ort für Straßensnacks.

Dennoch erfasst die Michelin-Linse nur einen Ausschnitt. Viel vom beliebtesten Essen Koreas findet sich auf einfachen Märkten und in familiengeführten Lokalen, die kein Inspektor je bewerten wird. Die Rekordzahl des Guides von 2026 ist ein Meilenstein, doch Koreas Esskultur reicht weit über seine besternten Tische hinaus.$a27$,
$a27$Le guide Michelin 2026 de Séoul et Busan recense un record de 233 restaurants, dix ans après l'arrivée du célèbre guide gastronomique en Corée du Sud. Parmi eux, 42 sont étoilés rien qu'à Séoul — un avec les trois étoiles suprêmes, dix avec deux et 31 avec une —, le plus grand total de l'histoire coréenne du guide.

Les chiffres montrent le chemin parcouru par la haute cuisine coréenne en dix ans. Quand le guide est arrivé en Corée, la gastronomie coréenne de luxe était peu connue à l'étranger. Aujourd'hui, des chefs de Séoul et de Busan sont récompensés pour des plats qui réinterprètent les traditions coréennes — saveurs fermentées, cuisine des temples, cuisine de la cour royale — avec une technique moderne et des produits locaux.

La cuisine est devenue centrale dans la façon dont la Corée du Sud se présente au monde. Le gouvernement promeut le 'K-food' aux côtés de la K-pop et du cinéma, et un nombre record de touristes vient désormais en partie pour manger. Les étoiles Michelin aident à faire connaître les restaurants coréens aux voyageurs internationaux, et une belle performance dore l'image du pays comme destination gastronomique, et pas seulement comme lieu de snacks de rue.

Pourtant, le prisme Michelin ne saisit qu'une partie du tableau. Une grande part des mets les plus aimés de Corée se trouve dans des marchés modestes et des adresses familiales qu'aucun inspecteur ne notera jamais. Le record du guide 2026 est une étape marquante, mais la culture culinaire du pays dépasse de loin ses tables étoilées.$a27$,
$a27$Cẩm nang Michelin 2026 cho Seoul và Busan ghi nhận con số kỷ lục 233 nhà hàng, đánh dấu một thập kỷ kể từ khi cuốn cẩm nang ẩm thực nổi tiếng này đến Hàn Quốc. Trong số đó, riêng Seoul có 42 nhà hàng gắn sao — một nơi đạt ba sao cao nhất, 10 nơi hai sao và 31 nơi một sao — con số lớn nhất trong lịch sử phiên bản Hàn Quốc.

Những con số phản ánh ẩm thực cao cấp Hàn Quốc đã tiến xa đến đâu trong mười năm. Khi cẩm nang mới ra mắt ở Hàn Quốc, ẩm thực Hàn cao cấp gần như không được biết đến ở nước ngoài. Ngày nay, các đầu bếp ở Seoul và Busan được ghi nhận nhờ những món tái diễn giải truyền thống Hàn — hương vị lên men, món ăn chùa chiền, ẩm thực cung đình — bằng kỹ thuật hiện đại và nguyên liệu địa phương.

Ẩm thực đã trở thành trung tâm trong cách Hàn Quốc giới thiệu bản thân với thế giới. Chính phủ quảng bá 'K-food' song song với K-pop và điện ảnh, và lượng du khách kỷ lục nay một phần đến để ăn. Sao Michelin giúp đưa các nhà hàng Hàn lên bản đồ của du khách quốc tế, và một kết quả tốt làm bóng thêm hình ảnh đất nước như một điểm đến ẩm thực, chứ không chỉ là nơi của quà vặt đường phố.

Dù vậy, lăng kính Michelin chỉ ghi lại một phần bức tranh. Phần lớn món ăn được yêu thích nhất của Hàn Quốc nằm ở những khu chợ bình dị và quán gia đình mà không thanh tra nào từng xếp hạng. Con số kỷ lục của cẩm nang 2026 là một cột mốc, nhưng văn hóa ẩm thực của đất nước vươn xa hơn nhiều so với những bàn tiệc gắn sao.$a27$,
$a27$คู่มือมิชลิน 2026 สำหรับโซลและปูซานรวบรวมร้านอาหารเป็นสถิติสูงถึง 233 ร้าน ในโอกาสครบ 10 ปีที่คู่มืออาหารชื่อดังเล่มนี้เข้ามาในเกาหลีใต้ ในจำนวนนี้ เฉพาะในโซลมี 42 ร้านที่ได้ดาวมิชลิน โดยเป็นร้านสามดาวระดับสูงสุด 1 ร้าน สองดาว 10 ร้าน และหนึ่งดาว 31 ร้าน ซึ่งมากที่สุดในประวัติศาสตร์ฉบับเกาหลี

ตัวเลขเหล่านี้สะท้อนว่าวงการอาหารระดับไฟน์ไดนิงของเกาหลีก้าวไกลเพียงใดในสิบปี เมื่อคู่มือเปิดตัวในเกาหลีครั้งแรก อาหารเกาหลีระดับหรูแทบไม่เป็นที่รู้จักในต่างประเทศ ทุกวันนี้ เชฟในโซลและปูซานได้รับการยกย่องจากเมนูที่ตีความประเพณีเกาหลีใหม่ ทั้งรสหมักดอง อาหารวัด และอาหารชาววัง ด้วยเทคนิคสมัยใหม่และวัตถุดิบท้องถิ่น

อาหารกลายเป็นแกนกลางในการนำเสนอตัวตนของเกาหลีใต้ต่อโลก รัฐบาลส่งเสริม 'อาหารเกาหลี' ควบคู่กับ K-pop และภาพยนตร์ และนักท่องเที่ยวจำนวนมากเป็นประวัติการณ์ในตอนนี้ ส่วนหนึ่งก็มาเพื่อกิน ดาวมิชลินช่วยให้ร้านอาหารเกาหลีขึ้นแผนที่ของนักเดินทางต่างชาติ และผลงานที่ดีก็ช่วยขัดเกลาภาพลักษณ์ของประเทศให้เป็นจุดหมายด้านอาหาร ไม่ใช่แค่แหล่งอาหารริมทาง

กระนั้น เลนส์ของมิชลินก็จับภาพได้เพียงบางส่วน อาหารที่คนเกาหลีรักที่สุดจำนวนมากอยู่ในตลาดเรียบง่ายและร้านที่ครอบครัวดูแล ซึ่งไม่มีผู้ตรวจคนใดจะให้ดาว สถิติใหม่ของคู่มือปี 2026 เป็นหมุดหมายสำคัญ แต่วัฒนธรรมอาหารของเกาหลีทอดยาวไกลเกินกว่าโต๊ะที่ติดดาวมากนัก$a27$,
$a27$Panduan Michelin 2026 untuk Seoul dan Busan mencantumkan rekor 233 restoran, menandai satu dekade sejak panduan kuliner terkenal itu tiba di Korea Selatan. Dari jumlah itu, 42 berbintang di Seoul saja — satu meraih tiga bintang tertinggi, 10 dua bintang, dan 31 satu bintang — jumlah terbesar dalam sejarah versi Korea.

Angka-angka itu mencerminkan sejauh mana santapan mewah Korea berkembang dalam sepuluh tahun. Ketika panduan itu diluncurkan di Korea, masakan Korea kelas atas nyaris tak dikenal di luar negeri. Kini, para koki di Seoul dan Busan diakui lewat hidangan yang menafsirkan ulang tradisi Korea — cita rasa fermentasi, masakan kuil, masakan istana — dengan teknik modern dan bahan lokal.

Makanan telah menjadi pusat cara Korea Selatan menampilkan diri ke dunia. Pemerintah mempromosikan 'K-food' bersama K-pop dan film, dan jumlah wisatawan yang memecahkan rekor kini sebagian datang untuk makan. Bintang Michelin membantu menempatkan restoran Korea di peta bagi pelancong internasional, dan hasil yang kuat memoles citra negara sebagai destinasi kuliner, bukan sekadar tempat jajanan kaki lima.

Meski begitu, lensa Michelin hanya menangkap sebagian gambar. Banyak makanan paling dicintai di Korea ada di pasar sederhana dan warung keluarga yang tak akan pernah dinilai inspektur mana pun. Rekor panduan 2026 adalah tonggak, tetapi budaya kuliner negeri itu membentang jauh melampaui meja-meja berbintangnya.$a27$,
$a27$The 2026 Michelin Guide for Seoul and Busan lists a record 233 restaurants, with 42 starred in Seoul, marking a decade in Korea and the rise of Korean fine dining.$a27$,
$a27$Michelin Guide Korea, Seoul Busan 2026, Michelin stars, Korean fine dining, K-food, culinary tourism$a27$,
'advanced',
3, 4, 4,
$a27$[
{"word":"요리","reading":"yori","reading_ja":"ヨリ","part_of_speech":"noun","definition_en":"dish; cuisine; cooking","definition_ja":"料理","definition_zh_tw":"料理；菜餚","definition_es":"plato; cocina","definition_de":"Gericht; Küche","definition_fr":"plat; cuisine","definition_vi":"món ăn; ẩm thực","definition_th":"อาหาร; การทำอาหาร","definition_id":"masakan; hidangan","example_ko":"이 식당의 요리는 아주 훌륭하다.","example_en":"This restaurant's cuisine is excellent.","example_ja":"この店の料理はとても素晴らしい。","example_zh_tw":"這家餐廳的料理非常出色。","example_es":"La cocina de este restaurante es excelente.","example_de":"Die Küche dieses Restaurants ist ausgezeichnet.","example_fr":"La cuisine de ce restaurant est excellente.","example_vi":"Món ăn của nhà hàng này rất tuyệt.","example_th":"อาหารของร้านนี้ยอดเยี่ยมมาก","example_id":"Masakan restoran ini sangat lezat."},
{"word":"식당","reading":"sikdang","reading_ja":"シクタン","part_of_speech":"noun","definition_en":"restaurant; eatery","definition_ja":"食堂；レストラン","definition_zh_tw":"餐廳；飯館","definition_es":"restaurante","definition_de":"Restaurant; Lokal","definition_fr":"restaurant","definition_vi":"nhà hàng; quán ăn","definition_th":"ร้านอาหาร","definition_id":"restoran; rumah makan","example_ko":"그 식당은 별을 받았다.","example_en":"That restaurant received a star.","example_ja":"その食堂は星を獲得した。","example_zh_tw":"那家餐廳摘下了星。","example_es":"Ese restaurante consiguió una estrella.","example_de":"Dieses Restaurant erhielt einen Stern.","example_fr":"Ce restaurant a décroché une étoile.","example_vi":"Nhà hàng đó đã được gắn sao.","example_th":"ร้านอาหารนั้นได้รับดาว","example_id":"Restoran itu meraih bintang."},
{"word":"요리사","reading":"yorisa","reading_ja":"ヨリサ","part_of_speech":"noun","definition_en":"chef; cook","definition_ja":"料理人；シェフ","definition_zh_tw":"廚師","definition_es":"chef; cocinero","definition_de":"Koch; Küchenchef","definition_fr":"cuisinier; chef","definition_vi":"đầu bếp","definition_th":"เชฟ; พ่อครัว","definition_id":"koki; juru masak","example_ko":"젊은 요리사들이 한식을 새롭게 만든다.","example_en":"Young chefs are reinventing Korean food.","example_ja":"若い料理人が韓国料理を新しくしている。","example_zh_tw":"年輕廚師正在為韓食注入新意。","example_es":"Chefs jóvenes están renovando la comida coreana.","example_de":"Junge Köche erfinden die koreanische Küche neu.","example_fr":"De jeunes chefs réinventent la cuisine coréenne.","example_vi":"Các đầu bếp trẻ đang làm mới ẩm thực Hàn.","example_th":"เชฟรุ่นใหม่กำลังสร้างสรรค์อาหารเกาหลีในแบบใหม่","example_id":"Para koki muda memperbarui masakan Korea."},
{"word":"별","reading":"byeol","reading_ja":"ピョル","part_of_speech":"noun","definition_en":"star (including a rating star)","definition_ja":"星","definition_zh_tw":"星星；星級","definition_es":"estrella","definition_de":"Stern","definition_fr":"étoile","definition_vi":"ngôi sao","definition_th":"ดาว","definition_id":"bintang","example_ko":"그 식당은 별 세 개를 받았다.","example_en":"That restaurant earned three stars.","example_ja":"その食堂は星を3つ獲得した。","example_zh_tw":"那家餐廳拿下三顆星。","example_es":"Ese restaurante logró tres estrellas.","example_de":"Dieses Restaurant erhielt drei Sterne.","example_fr":"Ce restaurant a obtenu trois étoiles.","example_vi":"Nhà hàng đó đạt ba sao.","example_th":"ร้านอาหารนั้นได้สามดาว","example_id":"Restoran itu meraih tiga bintang."},
{"word":"유명하다","reading":"yumyeonghada","reading_ja":"ユミョンハダ","part_of_speech":"adjective","definition_en":"to be famous","definition_ja":"有名である","definition_zh_tw":"有名的；著名的","definition_es":"ser famoso","definition_de":"berühmt sein","definition_fr":"être célèbre","definition_vi":"nổi tiếng","definition_th":"มีชื่อเสียง","definition_id":"terkenal","example_ko":"이 가이드는 세계적으로 유명하다.","example_en":"This guide is famous worldwide.","example_ja":"このガイドは世界的に有名だ。","example_zh_tw":"這本指南舉世聞名。","example_es":"Esta guía es famosa en todo el mundo.","example_de":"Dieser Guide ist weltberühmt.","example_fr":"Ce guide est célèbre dans le monde entier.","example_vi":"Cẩm nang này nổi tiếng khắp thế giới.","example_th":"คู่มือนี้มีชื่อเสียงไปทั่วโลก","example_id":"Panduan ini terkenal di seluruh dunia."}
]$a27$::jsonb,
'published', true, 0,
'2026-07-06T23:00:00Z', '2026-07-06T23:00:00Z', '2026-07-06T23:00:00Z'
);

-- Article 28 — 2026-07-08 sports beginner — LG Twins 1 million home fans record
INSERT INTO articles (topic_id, slug, title_en, title_ko, title_ja, title_zh_tw, title_es, title_de, title_fr, title_vi, title_th, title_id, summary_en, summary_ko, summary_ja, summary_zh_tw, summary_es, summary_de, summary_fr, summary_vi, summary_th, summary_id, content_en, content_ko, content_ja, content_zh_tw, content_es, content_de, content_fr, content_vi, content_th, content_id, seo_description, seo_keywords, level, reading_time_en, reading_time_ko, reading_time_ja, vocabulary, status, ai_generated, view_count, published_at, created_at, updated_at) VALUES (
(SELECT id FROM topics WHERE slug = 'sports'),
'sports-2026-07-08',
$a28$LG Twins Set a Record: 1 Million Home Fans in Just 43 Games$a28$,
$a28$LG 트윈스, 43경기 만에 홈 관중 100만 돌파 신기록$a28$,
$a28$LGツインズ、43試合でホーム観客100万人の新記録$a28$,
$a28$LG雙子隊43場破百萬主場觀眾 創新猷$a28$,
$a28$Los LG Twins baten un récord: un millón de aficionados en 43 partidos$a28$,
$a28$LG Twins mit Rekord: 1 Million Heimfans in nur 43 Spielen$a28$,
$a28$Les LG Twins battent un record : 1 million de fans en 43 matchs$a28$,
$a28$LG Twins lập kỷ lục: 1 triệu khán giả sân nhà chỉ sau 43 trận$a28$,
$a28$LG ทวินส์ ทำสถิติ แฟนเหย้า 1 ล้านคนใน 43 เกม$a28$,
$a28$LG Twins Cetak Rekor: 1 Juta Penonton Kandang dalam 43 Laga$a28$,
$a28$On July 4, 2026, the LG Twins became the fastest Korean baseball team to reach one million home fans, in just their 43rd home game — a record since 2001. It reflects a wider KBO attendance boom fueled by younger fans and a festive ballpark atmosphere.$a28$,
$a28$2026년 7월 4일, LG 트윈스가 홈 43경기 만에 홈 관중 100만 명을 넘어서 한국 야구에서 가장 빠른 기록을 세웠다. 이는 2001년 이후 최고 기록으로, 젊은 팬과 축제 같은 분위기에 힘입은 KBO 관중 붐을 보여 준다.$a28$,
$a28$2026年7月4日、LGツインズがホーム43試合でホーム観客100万人に到達し、韓国野球で最速の記録を打ち立てた。これは2001年以降で最速で、若いファンと祭りのような雰囲気に支えられたKBOの観客ブームを映している。$a28$,
$a28$2026年7月4日，LG雙子隊在主場第43場就突破100萬名主場觀眾，創下韓國棒球最快紀錄。這是2001年以來最快，反映出在年輕球迷與嘉年華般氛圍帶動下的KBO觀眾熱潮。$a28$,
$a28$El 4 de julio de 2026, los LG Twins se convirtieron en el equipo de béisbol coreano más rápido en llegar al millón de aficionados en casa, en su partido número 43, un récord desde 2001. Refleja el auge de asistencia de la KBO, impulsado por hinchas jóvenes y un ambiente festivo.$a28$,
$a28$Am 4. Juli 2026 erreichten die LG Twins als schnellstes koreanisches Baseballteam eine Million Heimfans – schon im 43. Heimspiel, ein Rekord seit 2001. Das spiegelt den KBO-Zuschauerboom wider, angetrieben von jungen Fans und festlicher Stadionstimmung.$a28$,
$a28$Le 4 juillet 2026, les LG Twins sont devenus l'équipe de baseball coréenne la plus rapide à atteindre un million de spectateurs à domicile, dès leur 43e match, un record depuis 2001. Cela reflète le boom d'affluence de la KBO, porté par de jeunes fans et une ambiance festive.$a28$,
$a28$Ngày 4/7/2026, LG Twins trở thành đội bóng chày Hàn Quốc nhanh nhất chạm mốc một triệu khán giả sân nhà, chỉ sau 43 trận — kỷ lục kể từ năm 2001. Điều này phản ánh cơn sốt khán giả của KBO, được thúc đẩy bởi fan trẻ và bầu không khí lễ hội.$a28$,
$a28$เมื่อวันที่ 4 กรกฎาคม 2026 LG ทวินส์กลายเป็นทีมเบสบอลเกาหลีที่แตะ 1 ล้านผู้ชมเหย้าได้เร็วที่สุด เพียงเกมเหย้าที่ 43 ซึ่งเป็นสถิตินับตั้งแต่ปี 2001 สะท้อนกระแสผู้ชม KBO ที่มาแรง ด้วยแฟนรุ่นใหม่และบรรยากาศแบบเทศกาล$a28$,
$a28$Pada 4 Juli 2026, LG Twins menjadi tim bisbol Korea tercepat mencapai satu juta penonton kandang, hanya pada laga ke-43 — rekor sejak 2001. Ini mencerminkan lonjakan penonton KBO yang didorong penggemar muda dan suasana meriah di stadion.$a28$,
$a28$The LG Twins, a popular Seoul baseball team, welcomed their one-millionth home fan of the 2026 season on July 4 — in just their 43rd home game. It was the fastest any Korean team has reached one million home fans since such records began in 2001.

The Twins play in the KBO, South Korea's top professional baseball league. Their home stadium, Jamsil Baseball Stadium in Seoul, is one of the biggest in the country, and their fans are known for loud, colorful cheering. Reaching a million so early shows how strong the demand for tickets has been this year.

The record is part of a bigger baseball boom. Across the KBO, attendance has been breaking records all season, helped by younger fans and a lively, festival-like atmosphere at the ballpark. For teams like the Twins, packed stands mean more excitement — and more money from tickets and merchandise.$a28$,
$a28$인기 있는 서울 야구팀 LG 트윈스가 2026년 7월 4일, 홈 43번째 경기 만에 올 시즌 100만 번째 홈 관중을 맞이했다. 이런 기록을 집계하기 시작한 2001년 이후, 한국 어느 팀보다도 빠르게 홈 관중 100만 명에 도달한 것이다.

트윈스는 한국 최고의 프로야구 리그인 KBO에서 뛴다. 이들의 홈구장인 서울 잠실야구장은 국내에서 가장 큰 구장 중 하나이고, 팬들은 크고 화려한 응원으로 유명하다. 이렇게 이른 시점에 100만 명을 넘은 것은 올해 표를 향한 수요가 얼마나 강했는지를 보여 준다.

이 기록은 더 큰 야구 붐의 일부다. KBO 전체에서 관중 기록이 시즌 내내 깨지고 있는데, 젊은 팬들과 경기장의 활기차고 축제 같은 분위기가 큰 힘이 됐다. 트윈스 같은 팀에게 가득 찬 관중석은 더 큰 열기를, 그리고 입장권과 상품에서 더 많은 수익을 뜻한다.$a28$,
$a28$人気のあるソウルの野球チーム、LGツインズが2026年7月4日、ホーム43試合目で今季100万人目のホーム観客を迎えた。こうした記録の集計が始まった2001年以降、韓国のどのチームよりも速くホーム観客100万人に到達した。

ツインズは韓国最高のプロ野球リーグKBOでプレーする。彼らのホーム球場、ソウルの蚕室野球場は国内最大級の球場の一つで、ファンは大きく華やかな応援で知られる。これほど早い時期に100万人を超えたことは、今年のチケット需要がいかに強かったかを示している。

この記録は、より大きな野球ブームの一部だ。KBO全体で観客記録がシーズンを通じて更新されており、若いファンと球場の活気ある祭りのような雰囲気が大きな後押しとなった。ツインズのようなチームにとって、満員の観客席はより大きな盛り上がりを、そして入場券やグッズからのより多くの収益を意味する。$a28$,
$a28$人氣十足的首爾棒球隊LG雙子隊，於2026年7月4日在主場第43場比賽就迎來本季第100萬名主場觀眾。自2001年開始統計這類紀錄以來，這是韓國各隊中最快突破主場百萬觀眾的一次。

雙子隊征戰韓國最高等級的職棒聯盟KBO。他們的主場——首爾蠶室棒球場，是國內數一數二大的球場，球迷更以熱烈又繽紛的加油聞名。能這麼早突破百萬，顯示今年球迷對門票的需求有多旺盛。

這項紀錄是更大棒球熱潮的一環。整個KBO的觀眾紀錄整季不斷被刷新，年輕球迷與球場嘉年華般的熱鬧氛圍功不可沒。對雙子隊這樣的球隊而言，爆滿的看台意味著更高的熱度，以及來自門票與周邊商品的更多收入。$a28$,
$a28$Los LG Twins, un popular equipo de béisbol de Seúl, recibieron a su aficionado número un millón de la temporada 2026 el 4 de julio, en apenas su partido número 43 en casa. Fue la vez que más rápido un equipo coreano ha llegado al millón de aficionados en casa desde que se llevan esos registros, en 2001.

Los Twins juegan en la KBO, la principal liga de béisbol profesional de Corea del Sur. Su estadio, el Jamsil de Seúl, es uno de los más grandes del país, y sus aficionados son conocidos por sus cánticos ruidosos y vistosos. Llegar al millón tan pronto muestra lo fuerte que ha sido la demanda de entradas este año.

El récord forma parte de un auge mayor del béisbol. En toda la KBO, la asistencia ha batido récords durante toda la temporada, impulsada por hinchas más jóvenes y un ambiente animado, casi de fiesta, en el estadio. Para equipos como los Twins, las gradas llenas significan más emoción y más dinero por entradas y productos.$a28$,
$a28$Die LG Twins, ein beliebtes Baseballteam aus Seoul, begrüßten am 4. Juli 2026 ihren millionsten Heimfan der Saison – schon im 43. Heimspiel. So schnell hat seit Beginn dieser Aufzeichnungen im Jahr 2001 kein koreanisches Team eine Million Heimfans erreicht.

Die Twins spielen in der KBO, Südkoreas höchster Baseball-Profiliga. Ihr Heimstadion, das Jamsil-Stadion in Seoul, gehört zu den größten des Landes, und ihre Fans sind für lautstarke, farbenfrohe Anfeuerung bekannt. So früh die Million zu erreichen zeigt, wie stark die Ticketnachfrage in diesem Jahr war.

Der Rekord ist Teil eines größeren Baseballbooms. In der gesamten KBO wurden die ganze Saison über Zuschauerrekorde gebrochen, getragen von jüngeren Fans und einer lebhaften, festlichen Stadionatmosphäre. Für Teams wie die Twins bedeuten volle Ränge mehr Begeisterung – und mehr Einnahmen aus Tickets und Fanartikeln.$a28$,
$a28$Les LG Twins, une équipe de baseball populaire de Séoul, ont accueilli leur millionième spectateur à domicile de la saison 2026 le 4 juillet, dès leur 43e match à la maison. C'est la fois où une équipe coréenne a atteint le plus vite le million de spectateurs à domicile depuis le début de ces relevés, en 2001.

Les Twins évoluent en KBO, la première ligue de baseball professionnel de Corée du Sud. Leur stade, le Jamsil de Séoul, est l'un des plus grands du pays, et leurs supporters sont connus pour leurs encouragements bruyants et colorés. Atteindre le million aussi tôt montre à quel point la demande de billets a été forte cette année.

Ce record s'inscrit dans un boom plus large du baseball. Dans toute la KBO, l'affluence a battu des records toute la saison, portée par un public plus jeune et une ambiance vive, proche de la fête, dans les stades. Pour des équipes comme les Twins, des tribunes combles signifient plus de ferveur — et plus de recettes de billetterie et de produits dérivés.$a28$,
$a28$LG Twins, một đội bóng chày được yêu thích ở Seoul, đã chào đón khán giả sân nhà thứ một triệu của mùa giải 2026 vào ngày 4 tháng 7, chỉ trong trận sân nhà thứ 43. Đây là lần một đội Hàn Quốc chạm mốc một triệu khán giả sân nhà nhanh nhất kể từ khi bắt đầu ghi nhận các số liệu này vào năm 2001.

Twins thi đấu ở KBO, giải bóng chày chuyên nghiệp hàng đầu Hàn Quốc. Sân nhà của họ, sân vận động Jamsil ở Seoul, là một trong những sân lớn nhất cả nước, và cổ động viên của họ nổi tiếng với những màn cổ vũ ồn ào, rực rỡ. Đạt mốc một triệu sớm như vậy cho thấy nhu cầu vé năm nay mạnh đến mức nào.

Kỷ lục này nằm trong một cơn sốt bóng chày lớn hơn. Trên toàn KBO, lượng khán giả liên tục phá kỷ lục suốt mùa giải, nhờ những fan trẻ hơn và bầu không khí sôi động như lễ hội ở sân bóng. Với các đội như Twins, khán đài chật kín đồng nghĩa với nhiều hào hứng hơn — và nhiều tiền hơn từ vé và hàng lưu niệm.$a28$,
$a28$LG ทวินส์ ทีมเบสบอลยอดนิยมของกรุงโซล ต้อนรับผู้ชมเหย้าคนที่หนึ่งล้านของฤดูกาล 2026 เมื่อวันที่ 4 กรกฎาคม ในเกมเหย้าเพียงนัดที่ 43 ซึ่งเป็นการที่ทีมเกาหลีแตะ 1 ล้านผู้ชมเหย้าได้เร็วที่สุดนับตั้งแต่เริ่มเก็บสถิติเช่นนี้ในปี 2001

ทวินส์เล่นในลีก KBO ซึ่งเป็นลีกเบสบอลอาชีพสูงสุดของเกาหลีใต้ สนามเหย้าของพวกเขาคือสนามเบสบอลจัมซิลในโซล เป็นหนึ่งในสนามที่ใหญ่ที่สุดของประเทศ และแฟน ๆ ก็ขึ้นชื่อเรื่องการเชียร์ที่เสียงดังและสีสันจัดจ้าน การแตะหนึ่งล้านได้เร็วขนาดนี้แสดงให้เห็นว่าความต้องการบัตรในปีนี้แข็งแกร่งเพียงใด

สถิตินี้เป็นส่วนหนึ่งของกระแสเบสบอลที่ใหญ่ขึ้น ทั่วทั้ง KBO สถิติผู้ชมถูกทำลายตลอดทั้งฤดูกาล โดยได้แรงหนุนจากแฟนรุ่นใหม่และบรรยากาศคึกคักราวกับงานเทศกาลในสนาม สำหรับทีมอย่างทวินส์ อัฒจันทร์ที่เต็มหมายถึงความตื่นเต้นที่มากขึ้น และรายได้ที่มากขึ้นจากบัตรและสินค้าที่ระลึก$a28$,
$a28$LG Twins, tim bisbol populer dari Seoul, menyambut penonton kandang ke-satu juta musim 2026 pada 4 Juli, hanya pada laga kandang ke-43 mereka. Itu adalah kali tercepat sebuah tim Korea mencapai satu juta penonton kandang sejak pencatatan seperti ini dimulai pada 2001.

Twins bermain di KBO, liga bisbol profesional papan atas Korea Selatan. Stadion kandang mereka, Stadion Bisbol Jamsil di Seoul, termasuk yang terbesar di negara itu, dan penggemarnya dikenal dengan sorakan yang lantang dan berwarna-warni. Mencapai satu juta sedini ini menunjukkan betapa kuatnya permintaan tiket tahun ini.

Rekor itu bagian dari ledakan bisbol yang lebih besar. Di seluruh KBO, jumlah penonton terus memecahkan rekor sepanjang musim, didukung penggemar yang lebih muda dan suasana stadion yang hidup bak festival. Bagi tim seperti Twins, tribun yang penuh berarti lebih banyak kegembiraan — dan lebih banyak uang dari tiket serta merchandise.$a28$,
$a28$On July 4, 2026, the LG Twins reached one million home fans in just 43 games — the fastest by any Korean baseball team since 2001, amid a KBO attendance boom.$a28$,
$a28$LG Twins, KBO attendance, one million fans, Korean baseball, Jamsil Stadium, baseball boom$a28$,
'beginner',
3, 4, 4,
$a28$[
{"word":"야구","reading":"yagu","reading_ja":"ヤグ","part_of_speech":"noun","definition_en":"baseball","definition_ja":"野球","definition_zh_tw":"棒球","definition_es":"béisbol","definition_de":"Baseball","definition_fr":"baseball","definition_vi":"bóng chày","definition_th":"เบสบอล","definition_id":"bisbol","example_ko":"한국에서 야구는 아주 인기 있다.","example_en":"Baseball is very popular in Korea.","example_ja":"韓国で野球はとても人気がある。","example_zh_tw":"棒球在韓國非常受歡迎。","example_es":"El béisbol es muy popular en Corea.","example_de":"Baseball ist in Korea sehr beliebt.","example_fr":"Le baseball est très populaire en Corée.","example_vi":"Bóng chày rất được yêu thích ở Hàn Quốc.","example_th":"เบสบอลได้รับความนิยมมากในเกาหลี","example_id":"Bisbol sangat populer di Korea."},
{"word":"팀","reading":"tim","reading_ja":"ティム","part_of_speech":"noun","definition_en":"team","definition_ja":"チーム","definition_zh_tw":"隊；團隊","definition_es":"equipo","definition_de":"Team; Mannschaft","definition_fr":"équipe","definition_vi":"đội","definition_th":"ทีม","definition_id":"tim","example_ko":"그 팀은 팬이 아주 많다.","example_en":"That team has many fans.","example_ja":"そのチームはファンがとても多い。","example_zh_tw":"那支隊伍球迷很多。","example_es":"Ese equipo tiene muchos aficionados.","example_de":"Dieses Team hat viele Fans.","example_fr":"Cette équipe a beaucoup de supporters.","example_vi":"Đội đó có rất nhiều người hâm mộ.","example_th":"ทีมนั้นมีแฟน ๆ มากมาย","example_id":"Tim itu punya banyak penggemar."},
{"word":"경기장","reading":"gyeonggijang","reading_ja":"キョンギジャン","part_of_speech":"noun","definition_en":"stadium; arena","definition_ja":"競技場；スタジアム","definition_zh_tw":"體育場；球場","definition_es":"estadio","definition_de":"Stadion; Arena","definition_fr":"stade","definition_vi":"sân vận động","definition_th":"สนามกีฬา","definition_id":"stadion","example_ko":"경기장이 팬들로 가득 찼다.","example_en":"The stadium was full of fans.","example_ja":"競技場はファンで埋まった。","example_zh_tw":"球場擠滿了球迷。","example_es":"El estadio estaba lleno de aficionados.","example_de":"Das Stadion war voller Fans.","example_fr":"Le stade était rempli de supporters.","example_vi":"Sân vận động chật kín người hâm mộ.","example_th":"สนามเต็มไปด้วยแฟน ๆ","example_id":"Stadion penuh dengan penggemar."},
{"word":"표","reading":"pyo","reading_ja":"ピョ","part_of_speech":"noun","definition_en":"ticket","definition_ja":"チケット；切符","definition_zh_tw":"票","definition_es":"entrada; boleto","definition_de":"Ticket; Eintrittskarte","definition_fr":"billet","definition_vi":"vé","definition_th":"ตั๋ว; บัตร","definition_id":"tiket","example_ko":"야구 표가 빨리 팔렸다.","example_en":"The baseball tickets sold out quickly.","example_ja":"野球のチケットはすぐ売れた。","example_zh_tw":"棒球票很快就賣光了。","example_es":"Las entradas de béisbol se vendieron rápido.","example_de":"Die Baseballtickets waren schnell ausverkauft.","example_fr":"Les billets de baseball se sont vendus vite.","example_vi":"Vé bóng chày bán hết rất nhanh.","example_th":"บัตรเบสบอลขายหมดอย่างรวดเร็ว","example_id":"Tiket bisbol cepat terjual habis."},
{"word":"이기다","reading":"igida","reading_ja":"イギダ","part_of_speech":"verb","definition_en":"to win; to beat","definition_ja":"勝つ","definition_zh_tw":"贏；獲勝","definition_es":"ganar; vencer","definition_de":"gewinnen; siegen","definition_fr":"gagner; l'emporter","definition_vi":"thắng; giành chiến thắng","definition_th":"ชนะ","definition_id":"menang","example_ko":"우리 팀이 경기를 이겼다.","example_en":"Our team won the game.","example_ja":"私たちのチームが試合に勝った。","example_zh_tw":"我們的球隊贏了比賽。","example_es":"Nuestro equipo ganó el partido.","example_de":"Unsere Mannschaft gewann das Spiel.","example_fr":"Notre équipe a gagné le match.","example_vi":"Đội của chúng tôi đã thắng trận.","example_th":"ทีมของเราชนะการแข่งขัน","example_id":"Tim kami memenangkan pertandingan."}
]$a28$::jsonb,
'published', true, 0,
'2026-07-07T23:00:00Z', '2026-07-07T23:00:00Z', '2026-07-07T23:00:00Z'
);

-- DAILY SUMMARIES (29 rows: 2026-06-10 … 2026-07-08, including 2026-07-02)
INSERT INTO daily_summaries (date, summary_en, summary_ko, summary_ja) VALUES ('2026-06-10', $s1$South Korea's privacy regulator hit Coupang with a 624.6 billion won fine (과징금, a penalty) over a 2025 data leak affecting 37.5 million users. It is one of the country's largest privacy penalties ever.$s1$, $s1$한국 개인정보보호위원회가 3750만 명이 영향을 받은 2025년 개인정보 유출로 쿠팡에 6246억 원의 과징금(penalty)을 부과했다. 역대 최대 규모의 개인정보 과징금 중 하나다.$s1$, $s1$韓国の個人情報保護委員会が、3750万人が影響を受けた2025年の情報流出でクーパンに6246億ウォンの制裁金（과징금、penalty）を科した。史上最大級の個人情報関連の制裁金の一つだ。$s1$) ON CONFLICT (date) DO UPDATE SET summary_en = EXCLUDED.summary_en, summary_ko = EXCLUDED.summary_ko, summary_ja = EXCLUDED.summary_ja;
INSERT INTO daily_summaries (date, summary_en, summary_ko, summary_ja) VALUES ('2026-06-11', $s2$SHINee's Onew celebrated his fifth solo EP 'TOUGH LOVE' with a pop-up store in Seoul's Seongsu-dong. Such comebacks (컴백, a return with new music) increasingly rely on pop-up events to draw fans.$s2$, $s2$샤이니의 온유가 다섯 번째 솔로 EP '터프 러브'를 서울 성수동 팝업스토어에서 기념했다. 이런 컴백(comeback)은 팬을 모으기 위해 점점 팝업 행사를 활용한다.$s2$, $s2$SHINeeのオンユが5枚目のソロEP『TOUGH LOVE』をソウル・聖水洞のポップアップで祝った。こうしたカムバック（컴백）はファンを集めるためにポップアップを活用することが増えている。$s2$) ON CONFLICT (date) DO UPDATE SET summary_en = EXCLUDED.summary_en, summary_ko = EXCLUDED.summary_ko, summary_ja = EXCLUDED.summary_ja;
INSERT INTO daily_summaries (date, summary_en, summary_ko, summary_ja) VALUES ('2026-06-12', $s3$New direct flights (직항, nonstop flights) from Taipei and Taichung to Busan began on June 1, helping spread South Korea's record tourism beyond Seoul. Regional airports saw a 32% jump in foreign passengers in May.$s3$, $s3$6월 1일 타이베이·타이중에서 부산으로 가는 직항(direct flights)이 시작돼, 한국의 기록적인 관광을 서울 밖으로 넓히는 데 도움이 됐다. 5월 지방 공항의 외국인 승객은 32% 늘었다.$s3$, $s3$6月1日、台北・台中から釜山への直行便（직항）が就航し、韓国の記録的な観光をソウル以外へ広げるのに役立った。5月の地方空港の外国人利用者は32%増えた。$s3$) ON CONFLICT (date) DO UPDATE SET summary_en = EXCLUDED.summary_en, summary_ko = EXCLUDED.summary_ko, summary_ja = EXCLUDED.summary_ja;
INSERT INTO daily_summaries (date, summary_en, summary_ko, summary_ja) VALUES ('2026-06-13', $s4$Naver and Kakao are upgrading their map (지도, map) apps to fend off Google Maps after Korea agreed to let Google export high-precision map data. Both are adding local reviews and photos to keep users.$s4$, $s4$정부가 구글의 고정밀 지도 데이터 반출을 허용하자, 네이버와 카카오가 구글 지도에 맞서 지도(map) 앱을 강화하고 있다. 두 회사는 현지 후기와 사진을 더해 이용자를 지키려 한다.$s4$, $s4$政府がグーグルの高精度地図データの持ち出しを認めたのを受け、ネイバーとカカオが地図（지도）アプリを強化している。両社は現地の口コミや写真を加えて利用者をつなぎ留めようとしている。$s4$) ON CONFLICT (date) DO UPDATE SET summary_en = EXCLUDED.summary_en, summary_ko = EXCLUDED.summary_ko, summary_ja = EXCLUDED.summary_ja;
INSERT INTO daily_summaries (date, summary_en, summary_ko, summary_ja) VALUES ('2026-06-14', $s5$Seoul Food 2026 gathered 1,650 companies from 45 countries to promote Korea's food exports (수출, exports). K-food sales hit a record $13.62 billion in 2025, led by a 22% jump in ramyeon.$s5$, $s5$서울 푸드 2026이 45개국 1650개 기업을 모아 한국의 식품 수출(exports)을 알렸다. 2025년 K-푸드 수출은 라면이 22% 급증하며 사상 최대인 136억 달러를 기록했다.$s5$, $s5$ソウルフード2026が45か国1650社を集め、韓国の食品輸出（수출）をPRした。2025年のK-フード輸出はラーメンの22%増に支えられ、過去最高の136億ドルを記録した。$s5$) ON CONFLICT (date) DO UPDATE SET summary_en = EXCLUDED.summary_en, summary_ko = EXCLUDED.summary_ko, summary_ja = EXCLUDED.summary_ja;
INSERT INTO daily_summaries (date, summary_en, summary_ko, summary_ja) VALUES ('2026-06-15', $s6$The KBO baseball league drew five million spectators (관중, spectators) at record speed in early June and is on track to break last year's 12.3 million mark. Younger, festive fans are driving the boom.$s6$, $s6$KBO 프로야구가 6월 초 역대 가장 빠르게 관중(spectators) 500만 명을 넘었고, 지난해 1230만 명 기록도 넘어설 기세다. 젊고 축제 같은 팬들이 붐을 이끈다.$s6$, $s6$KBOプロ野球が6月初めに史上最速で観客（관중）500万人を突破し、昨季の1230万人も超える勢いだ。若く祭り好きなファンがブームをけん引している。$s6$) ON CONFLICT (date) DO UPDATE SET summary_en = EXCLUDED.summary_en, summary_ko = EXCLUDED.summary_ko, summary_ja = EXCLUDED.summary_ja;
INSERT INTO daily_summaries (date, summary_en, summary_ko, summary_ja) VALUES ('2026-06-16', $s7$The Busan Sand Festival (축제, festival) filled Haeundae Beach with giant sand sculptures themed on the city's past, present, and future. Korea's largest sand event is free and family-friendly.$s7$, $s7$부산 모래축제(festival)가 해운대 해변을 도시의 과거·현재·미래를 주제로 한 거대한 모래 조각으로 채웠다. 한국 최대 규모의 모래축제는 무료이고 가족이 즐기기 좋다.$s7$, $s7$釜山の砂祭り（축제）が海雲台の砂浜を、街の過去・現在・未来をテーマにした巨大な砂像で埋めた。韓国最大の砂祭りは入場無料で家族連れにも人気だ。$s7$) ON CONFLICT (date) DO UPDATE SET summary_en = EXCLUDED.summary_en, summary_ko = EXCLUDED.summary_ko, summary_ja = EXCLUDED.summary_ja;
INSERT INTO daily_summaries (date, summary_en, summary_ko, summary_ja) VALUES ('2026-06-17', $s8$Musinsa, Korea's top online fashion platform, is expanding abroad and preparing a stock listing (상장, IPO) valued above $7.4 billion. NewJeans serves as its ambassador as it sells K-style overseas.$s8$, $s8$한국 최대 온라인 패션 플랫폼 무신사가 해외로 확장하며 74억 달러가 넘는 상장(IPO)을 준비하고 있다. 뉴진스를 앰배서더로 두고 해외에 K-스타일을 판다.$s8$, $s8$韓国最大のオンラインファッションプラットフォーム、ムシンサが海外進出を進め、74億ドル超の上場（상장）を準備している。NewJeansをアンバサダーに起用し、海外にK-スタイルを売り込む。$s8$) ON CONFLICT (date) DO UPDATE SET summary_en = EXCLUDED.summary_en, summary_ko = EXCLUDED.summary_ko, summary_ja = EXCLUDED.summary_ja;
INSERT INTO daily_summaries (date, summary_en, summary_ko, summary_ja) VALUES ('2026-06-18', $s9$A petition seeking the impeachment (탄핵, impeachment) of Defense Minister Ahn Gyu-back appeared at the National Assembly over his plan to dissolve the Defense Counterintelligence Command. The body was tied to the December 2024 martial law crisis.$s9$, $s9$안규백 국방장관의 탄핵(impeachment)을 요구하는 청원이 그의 국군방첩사령부 해체 계획을 두고 국회에 올라왔다. 이 조직은 2024년 12월 계엄 사태와 얽혀 있다.$s9$, $s9$安圭伯国防相の弾劾（탄핵）を求める請願が、国軍防諜司令部を解体する計画をめぐって国会に提出された。この組織は2024年12月の戒厳事態と関わりがある。$s9$) ON CONFLICT (date) DO UPDATE SET summary_en = EXCLUDED.summary_en, summary_ko = EXCLUDED.summary_ko, summary_ja = EXCLUDED.summary_ja;
INSERT INTO daily_summaries (date, summary_en, summary_ko, summary_ja) VALUES ('2026-06-19', $s10$South Korea reclassified its AI digital textbooks (교과서, textbooks) as 'supplementary materials' after complaints from teachers, students, and parents. Schools no longer have to use them.$s10$, $s10$한국이 교사·학생·학부모의 불만 끝에 AI 디지털 교과서(textbooks)를 '보조 자료'로 재분류했다. 학교는 더 이상 이를 의무적으로 쓰지 않아도 된다.$s10$, $s10$韓国が教師・生徒・保護者の不満を受け、AIデジタル教科書（교과서）を「補助教材」に再分類した。学校は必ずしもこれを使わなくてよくなった。$s10$) ON CONFLICT (date) DO UPDATE SET summary_en = EXCLUDED.summary_en, summary_ko = EXCLUDED.summary_ko, summary_ja = EXCLUDED.summary_ja;
INSERT INTO daily_summaries (date, summary_en, summary_ko, summary_ja) VALUES ('2026-06-20', $s11$The OECD projected South Korea to grow about 2.6% in 2026 on strong exports, while the Bank of Korea held its interest rate (금리, interest rate) at 2.5% amid a weak won. Growth is steady but uneven.$s11$, $s11$OECD가 강한 수출에 힘입어 2026년 한국 성장률을 약 2.6%로 전망했고, 한국은행은 약한 원화 속에 금리(interest rate)를 2.5%로 유지했다. 성장은 꾸준하지만 고르지 않다.$s11$, $s11$OECDが好調な輸出を背景に2026年の韓国成長率を約2.6%と予測し、韓国銀行は弱いウォンの中で金利（금리）を2.5%に据え置いた。成長は着実だが偏りがある。$s11$) ON CONFLICT (date) DO UPDATE SET summary_en = EXCLUDED.summary_en, summary_ko = EXCLUDED.summary_ko, summary_ja = EXCLUDED.summary_ja;
INSERT INTO daily_summaries (date, summary_en, summary_ko, summary_ja) VALUES ('2026-06-21', $s12$South Korea's births jumped nearly 15% in early 2026, the fastest quarterly rise since 1981, lifting the birth rate (출산율, birth rate) back toward 1.0. Officials are cautiously hopeful about the long decline reversing.$s12$, $s12$2026년 초 한국의 출생아가 1981년 이후 분기 기준 최고인 약 15% 늘며, 출산율(birth rate)이 다시 1.0에 가까워졌다. 당국은 오랜 하락세 반전에 조심스레 기대를 건다.$s12$, $s12$2026年初め、韓国の出生数が1981年以降で四半期最大の約15%増え、出生率（출산율）が再び1.0に近づいた。当局は長い低下の反転に慎重ながら期待している。$s12$) ON CONFLICT (date) DO UPDATE SET summary_en = EXCLUDED.summary_en, summary_ko = EXCLUDED.summary_ko, summary_ja = EXCLUDED.summary_ja;
INSERT INTO daily_summaries (date, summary_en, summary_ko, summary_ja) VALUES ('2026-06-22', $s13$BTS is reuniting as a full group in 2026 after all seven members finished South Korea's mandatory military service (군대, the military). Fans have waited years for the seven to make music together again.$s13$, $s13$BTS가 일곱 멤버 모두 한국의 의무 군대(the military)를 마치고 2026년 완전체로 다시 뭉친다. 팬들은 일곱 명이 다시 함께 음악을 하기를 몇 년간 기다렸다.$s13$, $s13$BTSが7人全員の兵役（군대、the military）を終え、2026年に完全体で再結成する。ファンは7人が再び一緒に音楽をする日を何年も待ってきた。$s13$) ON CONFLICT (date) DO UPDATE SET summary_en = EXCLUDED.summary_en, summary_ko = EXCLUDED.summary_ko, summary_ja = EXCLUDED.summary_ja;
INSERT INTO daily_summaries (date, summary_en, summary_ko, summary_ja) VALUES ('2026-06-23', $s14$South Korea welcomed its 10-millionth foreign visitor (방문객, visitor) of the year around June 21, the earliest ever and a month faster than 2025. China led arrivals, and card spending hit a record in May.$s14$, $s14$한국이 6월 21일 무렵 올해 외국인 방문객(visitor) 1000만 명을 넘어 역대 가장 빠르고 2025년보다 한 달 이르게 도달했다. 중국이 1위였고 5월 카드 지출은 사상 최대였다.$s14$, $s14$韓国が6月21日ごろ、今年の外国人訪問客（방문객）1000万人を突破し、史上最速で2025年より1か月早かった。中国が最多で、5月のカード支出は過去最高だった。$s14$) ON CONFLICT (date) DO UPDATE SET summary_en = EXCLUDED.summary_en, summary_ko = EXCLUDED.summary_ko, summary_ja = EXCLUDED.summary_ja;
INSERT INTO daily_summaries (date, summary_en, summary_ko, summary_ja) VALUES ('2026-06-24', $s15$South Korea's biggest banks are building a won-pegged stablecoin as lawmakers draft a Digital Asset Basic Act, seeking a home-grown alternative to dollar coins in digital money (화폐, currency). Pilots have tested QR payments and remittances.$s15$, $s15$한국 대형 은행들이 원화 기반 스테이블코인을 만들고 국회는 디지털자산기본법을 준비하며, 디지털 화폐(currency)에서 달러 코인의 대안을 찾고 있다. 이미 QR 결제와 송금 시범이 이뤄졌다.$s15$, $s15$韓国の大手銀行がウォン建てステーブルコインを開発し、国会はデジタル資産基本法を準備、デジタル貨幣（화폐）でドル建ての代替を目指す。すでにQR決済や送金の実証が行われた。$s15$) ON CONFLICT (date) DO UPDATE SET summary_en = EXCLUDED.summary_en, summary_ko = EXCLUDED.summary_ko, summary_ja = EXCLUDED.summary_ja;
INSERT INTO daily_summaries (date, summary_en, summary_ko, summary_ja) VALUES ('2026-06-25', $s16$Korea's banana milk is a viral trend (유행, a fad) again in 2026, driven by tourists and a DIY 'banana milk latte.' The yellow drink now sells beyond convenience stores in shops and hotels.$s16$, $s16$한국 바나나우유가 2026년 관광객과 직접 만드는 '바나나우유 라테' 덕분에 다시 유행(fad)이다. 노란 음료는 이제 편의점을 넘어 가게와 호텔에서도 팔린다.$s16$, $s16$韓国のバナナ牛乳が2026年、観光客と自作の「バナナ牛乳ラテ」で再び流行（유행）している。黄色い飲み物は今やコンビニを越えて店やホテルでも売られている。$s16$) ON CONFLICT (date) DO UPDATE SET summary_en = EXCLUDED.summary_en, summary_ko = EXCLUDED.summary_ko, summary_ja = EXCLUDED.summary_ja;
INSERT INTO daily_summaries (date, summary_en, summary_ko, summary_ja) VALUES ('2026-06-26', $s17$South Korea was eliminated (탈락, elimination) from the 2026 World Cup group stage after a 1-0 loss to South Africa. Captain Son Heung-min was controversially benched for the decisive match.$s17$, $s17$한국이 남아프리카공화국에 0-1로 지며 2026 월드컵 조별리그에서 탈락(elimination)했다. 주장 손흥민이 결정적인 경기에 선발 제외돼 논란이 일었다.$s17$, $s17$韓国が南アフリカに0-1で敗れ、2026年ワールドカップのグループステージで敗退（탈락）した。キャプテンのソン・フンミンが決定的な試合で先発から外れ、物議を醸した。$s17$) ON CONFLICT (date) DO UPDATE SET summary_en = EXCLUDED.summary_en, summary_ko = EXCLUDED.summary_ko, summary_ja = EXCLUDED.summary_ja;
INSERT INTO daily_summaries (date, summary_en, summary_ko, summary_ja) VALUES ('2026-06-27', $s18$South Korea is preparing to host the UNESCO World Heritage Committee in Busan for the first time, showcasing its heritage (유산, heritage). It is pushing to expand its 'getbol' tidal-flat listing and a wartime-capital bid.$s18$, $s18$한국이 부산에서 유네스코 세계유산위원회를 처음으로 개최할 준비를 하며 자국 유산(heritage)을 알린다. 갯벌 등재 확대와 임시수도 유산 등재를 추진하고 있다.$s18$, $s18$韓国が釜山でユネスコ世界遺産委員会を初めて開催する準備を進め、自国の遺産（유산）を紹介する。干潟の登録拡大や臨時首都遺産の登録を目指している。$s18$) ON CONFLICT (date) DO UPDATE SET summary_en = EXCLUDED.summary_en, summary_ko = EXCLUDED.summary_ko, summary_ja = EXCLUDED.summary_ja;
INSERT INTO daily_summaries (date, summary_en, summary_ko, summary_ja) VALUES ('2026-06-28', $s19$K-pop idols like (G)I-DLE's Yuqi and MEOVV's Anna have become faces of luxury brands (명품, luxury goods) such as Tiffany and Chloé in 2026. Their loyal fans help luxury houses reach young shoppers.$s19$, $s19$(여자)아이들의 우기, 메이브의 애나 같은 K-팝 아이돌이 2026년 티파니, 클로에 같은 명품(luxury goods) 브랜드의 얼굴이 됐다. 충성도 높은 팬이 명품 브랜드의 젊은 고객 공략을 돕는다.$s19$, $s19$(G)I-DLEのウギやMEOVVのアンナといったK-POPアイドルが2026年、ティファニーやクロエなど高級ブランド（명품）の顔になった。熱心なファンが高級ブランドの若い顧客獲得を後押しする。$s19$) ON CONFLICT (date) DO UPDATE SET summary_en = EXCLUDED.summary_en, summary_ko = EXCLUDED.summary_ko, summary_ja = EXCLUDED.summary_ja;
INSERT INTO daily_summaries (date, summary_en, summary_ko, summary_ja) VALUES ('2026-06-29', $s20$President Lee Jae-myung unveiled Korea's largest-ever investment (투자, investment) pledge — about 1,000 trillion won over ten years, led by Samsung — and named 'physical AI,' or robots, a national strategic industry.$s20$, $s20$이재명 대통령이 삼성이 주도해 10년간 약 1000조 원에 이르는 사상 최대 투자(investment) 계획을 발표하고, 로봇을 뜻하는 '피지컬 AI'를 국가전략산업으로 지정했다.$s20$, $s20$李在明大統領が、サムスン主導で10年間約1000兆ウォンに上る史上最大の投資（투자）計画を発表し、ロボットを指す「フィジカルAI」を国家戦略産業に指定した。$s20$) ON CONFLICT (date) DO UPDATE SET summary_en = EXCLUDED.summary_en, summary_ko = EXCLUDED.summary_ko, summary_ja = EXCLUDED.summary_ja;
INSERT INTO daily_summaries (date, summary_en, summary_ko, summary_ja) VALUES ('2026-06-30', $s21$South Korea is piloting AI to grade written answers in Gyeonggi Province, part of a plan to move its exams (시험, exams) away from multiple-choice and eventually reform the Suneung. Fairness is the biggest concern.$s21$, $s21$한국이 경기도에서 서술형 답안을 채점하는 AI를 시범 운영하며, 시험(exams)을 객관식에서 벗어나게 하고 결국 수능까지 바꾸려 한다. 가장 큰 걱정은 공정성이다.$s21$, $s21$韓国が京畿道で記述式解答を採点するAIを試験導入し、試験（시험）を選択式から脱却させ、いずれ修能も変えようとしている。最大の懸念は公正さだ。$s21$) ON CONFLICT (date) DO UPDATE SET summary_en = EXCLUDED.summary_en, summary_ko = EXCLUDED.summary_ko, summary_ja = EXCLUDED.summary_ja;
INSERT INTO daily_summaries (date, summary_en, summary_ko, summary_ja) VALUES ('2026-07-01', $s22$South Korea's Minimum Wage Commission is negotiating the 2027 minimum wage (임금, wage): labor asked 11,700 won, business offered 10,410 won, up from 2026's 10,320 won. The result affects millions of low-paid workers.$s22$, $s22$한국 최저임금위원회가 2027년 최저임금(wage)을 협상 중이다. 노동계는 1만1700원, 경영계는 1만410원을 제시했고, 2026년은 1만320원이다. 결과는 수많은 저임금 노동자에게 영향을 준다.$s22$, $s22$韓国の最低賃金委員会が2027年の最低賃金（임금）を交渉中だ。労働側は1万1700ウォン、経営側は1万410ウォンを提示し、2026年は1万320ウォン。結果は多くの低賃金労働者に影響する。$s22$) ON CONFLICT (date) DO UPDATE SET summary_en = EXCLUDED.summary_en, summary_ko = EXCLUDED.summary_ko, summary_ja = EXCLUDED.summary_ja;
INSERT INTO daily_summaries (date, summary_en, summary_ko, summary_ja) VALUES ('2026-07-02', $s23$Two features published on July 2 looked at Korean life from different angles: one on families choosing unaccredited alternative schools (학교, school) over the mainstream system, and another on chip workers riding an unexpected economic wave.$s23$, $s23$7월 2일에 나온 두 기사는 한국의 삶을 다른 각도에서 조명했다. 하나는 주류 대신 비인가 대안 학교(school)를 택한 가족들을, 다른 하나는 예상 밖 경제 호황을 탄 반도체 노동자들을 다뤘다.$s23$, $s23$7月2日に公開された二つの特集は韓国の暮らしを別々の角度から描いた。一つは主流ではなく無認可の代替学校（학교）を選ぶ家族を、もう一つは予想外の好況に乗る半導体労働者を取り上げた。$s23$) ON CONFLICT (date) DO UPDATE SET summary_en = EXCLUDED.summary_en, summary_ko = EXCLUDED.summary_ko, summary_ja = EXCLUDED.summary_ja;
INSERT INTO daily_summaries (date, summary_en, summary_ko, summary_ja) VALUES ('2026-07-03', $s24$A deadly heat wave (폭염, heat wave) in early July killed and sickened outdoor workers in South Korea, with over 1,000 heat-illness cases reported. New rules require 20-minute rest breaks every two hours above 33°C.$s24$, $s24$7월 초 살인적인 폭염(heat wave)으로 한국의 야외 노동자들이 숨지거나 병원에 실려 갔고, 온열질환이 1000건 넘게 보고됐다. 새 규정은 체감 33도가 넘으면 2시간마다 20분 휴식을 의무화한다.$s24$, $s24$7月初めの猛烈な暑さ（폭염）で韓国の屋外労働者が死亡・搬送され、熱中症が1000件超報告された。新ルールは体感33度を超えると2時間ごとに20分の休憩を義務づける。$s24$) ON CONFLICT (date) DO UPDATE SET summary_en = EXCLUDED.summary_en, summary_ko = EXCLUDED.summary_ko, summary_ja = EXCLUDED.summary_ja;
INSERT INTO daily_summaries (date, summary_en, summary_ko, summary_ja) VALUES ('2026-07-04', $s25$Korea's 2026 reforms to K-pop trainee (연습생, trainee) contracts brought financial transparency and protections for minors. But idols are still often independent contractors, and foreign trainees remain largely unaddressed.$s25$, $s25$2026년 한국의 K-팝 연습생(trainee) 계약 개혁으로 금전 투명성과 미성년자 보호가 강화됐다. 그러나 아이돌은 여전히 독립계약자인 경우가 많고, 외국인 연습생은 거의 다뤄지지 않는다.$s25$, $s25$2026年の韓国のK-POP練習生（연습생）契約改革で、金銭の透明化と未成年者保護が進んだ。しかしアイドルは今も個人事業主が多く、外国人練習生はほとんど扱われていない。$s25$) ON CONFLICT (date) DO UPDATE SET summary_en = EXCLUDED.summary_en, summary_ko = EXCLUDED.summary_ko, summary_ja = EXCLUDED.summary_ja;
INSERT INTO daily_summaries (date, summary_en, summary_ko, summary_ja) VALUES ('2026-07-05', $s26$The Dongseo Trail, South Korea's first coast-to-coast hiking route, partially opens in 2026, crossing mountains (산, mountain) and small towns to link the east and west coasts. It aims to spread tourism beyond big cities.$s26$, $s26$한국 첫 동서 횡단 트레일인 '동서트레일'이 2026년 일부 개통해, 산(mountain)과 작은 마을을 지나 동서 해안을 잇는다. 대도시 밖으로 관광을 넓히려는 목적이다.$s26$, $s26$韓国初の東西横断ルート「東西トレイル」が2026年に一部開通し、山（산）や小さな町を通って東西の海岸を結ぶ。大都市以外へ観光を広げるのが狙いだ。$s26$) ON CONFLICT (date) DO UPDATE SET summary_en = EXCLUDED.summary_en, summary_ko = EXCLUDED.summary_ko, summary_ja = EXCLUDED.summary_ja;
INSERT INTO daily_summaries (date, summary_en, summary_ko, summary_ja) VALUES ('2026-07-06', $s27$Delivery robots (로봇, robot) are now a common sight on South Korea's sidewalks after the government gave them pedestrian-like legal status. Firms like Neubility send them to carry food and parcels to the door.$s27$, $s27$정부가 배달 로봇(robot)에 보행자와 비슷한 법적 지위를 주면서, 인도 위 배달 로봇이 한국에서 흔한 풍경이 됐다. 뉴빌리티 같은 회사가 음식과 택배를 문 앞까지 나른다.$s27$, $s27$政府が配達ロボット（로봇）に歩行者と同様の法的地位を与え、歩道の配達ロボットが韓国で日常の風景になった。ニュービリティなどが食べ物や荷物を玄関先まで運ぶ。$s27$) ON CONFLICT (date) DO UPDATE SET summary_en = EXCLUDED.summary_en, summary_ko = EXCLUDED.summary_ko, summary_ja = EXCLUDED.summary_ja;
INSERT INTO daily_summaries (date, summary_en, summary_ko, summary_ja) VALUES ('2026-07-07', $s28$The 2026 Michelin Guide for Seoul and Busan listed a record 233 restaurants (식당, restaurant), with 42 starred in Seoul, marking a decade in Korea. Much of Korea's best food, though, is still found in unrated markets.$s28$, $s28$2026 미쉐린 가이드 서울·부산 편이 역대 최다인 233개 식당(restaurant)을 실었고, 서울에서만 42곳이 별을 받아 한국 진출 10년을 맞았다. 다만 한국 최고의 음식은 여전히 별 없는 시장에도 많다.$s28$, $s28$2026年版ミシュランガイド・ソウル&釜山が過去最多の233店の食堂（식당）を掲載し、ソウルだけで42店が星を獲得、韓国進出10年を迎えた。ただし韓国の絶品は今も星のない市場に多い。$s28$) ON CONFLICT (date) DO UPDATE SET summary_en = EXCLUDED.summary_en, summary_ko = EXCLUDED.summary_ko, summary_ja = EXCLUDED.summary_ja;
INSERT INTO daily_summaries (date, summary_en, summary_ko, summary_ja) VALUES ('2026-07-08', $s29$The LG Twins reached one million home fans in just 43 games on July 4, the fastest by any Korean baseball (야구, baseball) team since 2001. It reflects a wider KBO attendance boom led by younger fans.$s29$, $s29$LG 트윈스가 7월 4일 홈 43경기 만에 홈 관중 100만 명을 넘어, 2001년 이후 한국 야구(baseball)에서 가장 빠른 기록을 세웠다. 젊은 팬들이 이끄는 KBO 관중 붐을 보여 준다.$s29$, $s29$LGツインズが7月4日、ホーム43試合で観客100万人に到達し、2001年以降で韓国野球（야구）最速の記録を打ち立てた。若いファンがけん引するKBOの観客ブームを映している。$s29$) ON CONFLICT (date) DO UPDATE SET summary_en = EXCLUDED.summary_en, summary_ko = EXCLUDED.summary_ko, summary_ja = EXCLUDED.summary_ja;
```
