# Japanese Translation Guide — DEEP DIVES · 심층 탐구

**File:** `js/lang-ja.js` → extend the `JA = { ... }` dictionary with every entry below.
**Scope:** `ramyeon.html`, `mandu.html`, `kchicken.html`, `kbbq.html`, `kimchi.html`

---

## Architecture Recap

`LangManager.setLang('ja')` walks every DOM text node, trims it, normalises whitespace (`/\s+/g → ' '`), and looks it up in the `JA` dictionary. The key must be the **exact visible text** of the text node — no HTML tags, no surrounding whitespace.

- `.kr-trans` div content → **leave as-is** (Korean lesson, never translate)
- Korean Hangul anywhere → **leave as-is**
- Numbers, stats, emoji, romanisation columns → **leave as-is**
- Korean proper nouns inside English sentences → **keep Korean, translate surrounding English**

---

## Shared Strings (Already in `japanese-version-guide.md`)

The following strings appear on every deep dive page and are **already defined** in the main guide. Do **not** re-add them:

```
'K-FOOD · 한국 음식'           // already: 'K-フード · 한국 음식'
'DEEP DIVES · 심층 탐구'        // already: '深掘り · 심층 탐구'
'Ramyeon Guide'               // already: 'ラーメンガイド'
'Mandu Guide'                 // already: '餃子ガイド'
'Chicken Guide'               // already: 'チキンガイド'
'K-BBQ Guide'                 // already: 'K-BBQガイド'
'Kimchi Guide'                // already: 'キムチガイド'
// All header nav, sidebar category links, and footer strings
```

---

## `ramyeon.html` — Ramyeon Bible

### Hero

```js
'Korea\'s 라면 culture goes far beyond instant noodles — it\'s a national obsession, a late-night ritual, a hangover cure, and a comfort that crosses every social class. From the original 삼양라면 (1963) to the globally viral 불닭볶음면, every packet tells a story.':
  '韓国の라면文化は単なるインスタント麺をはるかに超えています — 国民的な執着、深夜のルーティン、二日酔いの特効薬、そしてあらゆる社会階層を超える癒しです。1963年の元祖삼양라면から世界的バイラルとなった불닭볶음면まで、すべてのパックに物語があります。',

// Stat labels
'Packs sold yearly': '年間販売パック数',
'First Korean ramyeon': '韓国初のラーメン',
'Koreans eat weekly': '毎週食べる韓国人の割合',
'Average price per pack': '平均価格（1袋）',
```

### History Info-Box

```js
'삼양라면의 탄생 · The Birth of Korean Ramyeon (1963)':
  '삼양라면의 탄생 · 韓国ラーメンの誕生（1963年）',

'The late Chairman Jeon Joong-yoon, founder of Samyang Foods (삼양식품), developed Korea\'s first instant noodle — 삼양라면 — in 1963, after receiving manufacturing technology and equipment from Japan\'s Myojo Foods (明星食品) entirely free of charge. Driven by a mission to ease the food shortage facing hungry Koreans, Chairman Jeon approached Japan\'s leading ramen companies for a technology partnership but was turned away by every one of them. It was only through a meeting with Myojo Foods president Okui Kiyosumi — who understood and shared his humanitarian intent — that a breakthrough came: Myojo provided not only the full production process but even the closely guarded soup seasoning formula, all without demanding any royalties.':
  '삼양식품の창업주 고 전중윤 회장は、1963년 일본 묘조식품（明星食品）から製造技術と設備を無償で受け取り、韓国初のインスタント麺삼양라면を開発しました。飢えた韓国人の食料難を解消するという使命に駆られた全会長は、日本の大手ラーメン各社に技術提携を求めましたが、すべてに断られました。突破口を開いたのは明星食品の奥井清澄社長との出会いでした — 彼は全会長の人道的な意図を理解・共感し、製造工程はもちろん企業秘密であったスープの配合比率まで、一切のロイヤリティなしに伝授してくれたのです。',
```

### Cooking Tip-Box

```js
'How Koreans Actually Cook Ramyeon': '韓国人がラーメンを実際に作る方法',

'Real Korean ramyeon is never made with just water. Common upgrades: add an egg (계란), slice of processed cheese (치즈), kimchi (김치), spam, tteok (떡), or leftover rice. The soggy noodle is intentional — 불어도 맛있다 ("even soggy it\'s good"). The broth left over after eating is called 국물, and many Koreans add rice to finish it off.':
  '本物の韓国ラーメンは水だけで作りません。よくある追加食材：계란（卵）、치즈（チーズ）1枚、김치（キムチ）、スパム、떡（トック）、または残りご飯。麺がふやけるのは意図的 — 불어도 맛있다（「ふやけても美味しい」）。食後に残った스프を국물（スープ）といい、多くの韓国人がご飯を入れて締めます。',
```

### Nongshim — Brand Header

```js
'Founded 1965. Korea\'s #1 instant noodle brand, holding ~60% market share. Exports to 100+ countries. The red packet of 신라면 is one of the most recognized food packages in Asia.':
  '1965年創業。韓国No.1のインスタント麺ブランドで市場シェア約60%。100カ国以上に輸出。신라면の赤いパッケージはアジアで最も認知度の高い食品パッケージの一つです。',
```

### Nongshim — Product Cards (18 cards)

```js
// 신라면
'Nongshim · 농심 · Since 1986': 'Nongshim · 농심 · 1986年発売',
'Korea\'s #1 best-selling instant noodle and cultural icon. Fiery beef-bone broth with mushrooms and chewy noodles. The red packet is instantly recognizable worldwide. Available in 100+ countries.':
  '韓国No.1ベストセラーのインスタント麺にして文化的アイコン。きのこと弾力ある麺が入ったスパイシーな牛骨スープ。赤いパッケージは世界中で一目でわかります。100カ国以上で販売中。',
'Iconic': 'アイコニック',

// 신라면 블랙
'Nongshim · 농심 · Since 2011': 'Nongshim · 농심 · 2011年発売',
'Premium upgrade of the original. Richer bone broth (사골), thicker noodles, dehydrated egg. Positioned as a premium product — costs ~3× more than standard. Won a NY Times taste test in 2014.':
  '原作のプレミアムアップグレード。より濃厚な사골（牛骨）スープ、厚めの麺、乾燥卵入り。プレミアム商品として位置づけられ、通常品の約3倍の価格。2014年ニューヨーク・タイムズのテイストテストで優勝。',
'Premium': 'プレミアム',

// 너구리
'Nongshim · 농심 · Since 1982': 'Nongshim · 농심 · 1982年発売',
'Udon-style thick noodles in a spicy seafood broth with kombu (다시마). One half of the famous 짜파구리 ("Ram-don") combo from the Oscar-winning film Parasite (기생충, 2019).':
  '다시마（昆布）入りのスパイシーな海鮮スープのうどん風太麺。アカデミー賞受賞映画「기생충」（2019年）に登場した名コンビ짜파구리（「ラムドン」）の片割れ。',
'Med-Spicy': '中辛',
'Parasite 🎬': '기생충 🎬',

// 짜파게티
'Nongshim · 농심 · Since 1984': 'Nongshim · 농심 · 1984年発売',
'Black bean (짜장) instant noodle — a portmanteau of 짜장면 + spaghetti. The other half of 짜파구리. Rich, savory black bean sauce with onion and pork flavoring. A beloved comfort food.':
  '짜장면とスパゲッティを合わせた造語のブラックビーン（짜장）インスタント麺。짜파구리のもう片方の主役。玉ねぎと豚肉の風味がある濃厚でコクのあるブラックビーンソース。愛される定番コンフォートフード。',
'No Heat': '辛さなし',

// 안성탕면
'Nongshim · 농심 · Since 1983': 'Nongshim · 농심 · 1983年発売',
'Korea\'s long-running classic comfort ramyeon. Mild, savory broth with a gentle warmth. Tagline: "안성맞춤!" (Perfectly fitting!). Popular with children and those who prefer lighter flavors.':
  '長年愛される韓国のクラシック・コンフォートラーメン。ほんのりやさしい辛さのまろやかなスープ。キャッチコピー：「안성맞춤!」（ぴったり！）。子どもや軽めの味が好きな人に人気。',
'Mild': 'マイルド',
'Classic': 'クラシック',

// 육개장 사발면
'Nongshim · 농심 · Cup Noodle': 'Nongshim · 농심 · カップ麺',
'The #1 best-selling cup noodle in Korea. Inspired by 육개장 (spicy shredded beef soup). Deep red broth, glass noodle texture, strong umami. A Korean convenience store staple.':
  '韓国No.1ベストセラーのカップ麺。육개장（スパイシー牛肉スープ）からインスピレーションを得た深紅のスープ。春雨のような食感で強いうまみ。韓国のコンビニに欠かせない定番品。',
'Cup': 'カップ',

// 오징어짬뽕
'Nongshim · 농심 · Seafood Spicy': 'Nongshim · 농심 · 海鮮辛口',
'Spicy squid-based seafood broth modeled on Chinese-Korean 짬뽕 (champon). Deep red, heavy seafood umami, chewy noodles. Popular with those who want spicy seafood over beef.':
  '中韓式짬뽕をモデルにしたスパイシーなイカベースの海鮮スープ。深紅の色、濃厚な海鮮うまみ、弾力ある麺。牛肉より辛い海鮮が食べたい人に人気。',
'Seafood': '海鮮',

// 신라면 더 레드
'Nongshim · 농심 · Since 2021 · ~7,500 SHU': 'Nongshim · 농심 · 2021年発売 · 約7,500 SHU',
'Nongshim\'s premium ultra-spicy answer to the fire noodle era. Launched in 2021 at ~7,500 SHU — nearly double the original 신라면. Same signature beef umami base but with amplified chili heat. Available in bag and cup formats.':
  'ファイアーヌードル時代に応えるNongshimのプレミアム超激辛版。2021年に約7,500 SHUで発売 — 原作신라면のほぼ2倍の辛さ。シグネチャーの牛肉うまみはそのままに唐辛子の辛さを倍増。袋麺とカップ麺の両方で展開。',
'Very Hot': '超激辛',

// 새우탕
'Nongshim · 농심 · Seafood': 'Nongshim · 농심 · 海鮮',
'Mild shrimp-flavored broth with a clean, light profile. Compared to spicy options, 새우탕 is the "gentle giant" — popular with those who like seafood umami without chili heat.':
  'クリーンで軽やかな風味のマイルドなエビ風味スープ。辛い商品と比べると새우탕は「おだやかな巨人」 — 唐辛子の辛さなしに海鮮うまみを楽しみたい人に人気。',

// 스파게티
'Nongshim · 농심 · Italian-Korean Fusion': 'Nongshim · 농심 · イタリア韓国フュージョン',
'Korean interpretation of pasta — a dry sauce (stir-fry style) with tomato and bacon flavoring over spaghetti-shaped noodles. Unique in the Korean instant noodle world for its non-soup format.':
  'パスタの韓国流解釈 — スパゲッティ型の麺にトマトとベーコン風味のドライソース（炒め物スタイル）。スープなし形式で韓国のインスタント麺界でもユニークな存在。',
'Dry (Stir)': '乾麺（炒め）',

// 생생우동
'Nongshim · 농심 · Fresh Udon': 'Nongshim · 농심 · 生うどん風',
'Soft, fresh-style udon noodles in a mild dashi broth. Unlike most ramyeon, uses a softer noodle texture to mimic real udon. Light and easy on the stomach — great for late-night or recovery eating.':
  'だし汁のやさしいスープに入った柔らかい生うどん風の麺。ほとんどのラーメンと異なり、本物のうどんを再現した柔らかい麺食感。胃に優しく軽い — 夜食や回復食に最適。',
'Udon Style': 'うどんスタイル',

// 튀김우동
'Nongshim · 농심 · Fried Udon': 'Nongshim · 농심 · 揚げうどん',
'Fried (튀김) udon-style noodles with a tempura-esque crunch on the dehydrated toppings. Mild, savory dashi broth. The crispy toppings are what make this one unique — add them at the end.':
  '乾燥トッピングに天ぷら風のサクサク感がある揚げ（튀김）うどん風麺。まろやかなだし汁スープ。最後に加えるサクサクのトッピングがこの商品をユニークにしています。',

// 보글보글 부대찌개면
'Nongshim · 농심 · Army Stew': 'Nongshim · 농심 · 部隊チゲ',
'Inspired by 부대찌개 (Army Base Stew) — the post-Korean-War fusion of American military surplus (SPAM, hot dogs) with Korean kimchi and gochujang. Rich, complex, slightly sweet spicy.':
  '부대찌개（部隊チゲ）からインスピレーションを得た一品。朝鮮戦争後、米軍の食材（スパム、ホットドッグ）と韓国のキムチ・コチュジャンを融合させたフュージョン料理。濃厚で複雑、甘辛い味わい。',
'Fusion': 'フュージョン',

// 둥지냉면
'Nongshim · 농심 · Cold Noodle': 'Nongshim · 농심 · 冷麺',
'Korea\'s best-known instant cold noodle. Nest-shaped (둥지 = nest) noodles in a tangy, sweet-savory broth served cold or at room temp. A summer staple — refreshing and light.':
  '韓国で最も有名なインスタント冷麺。巣の形（둥지＝巣）の麺を甘酸っぱいスープで冷たく食べる。夏の定番 — 清涼感があって軽やか。',
'Cold · No Heat': '冷製 · 辛さなし',
'Summer': '夏限定',

// 신라면 건면
'Nongshim · 농심 · Lower Calorie': 'Nongshim · 농심 · 低カロリー',
'Air-dried (건면) version of 신라면 — lower fat than fried noodles. Same spicy broth flavor. Recommended for health-conscious ramyeon lovers. Texture is slightly different but broth is identical.':
  '신라면のエアドライ（건면）版 — 揚げ麺より脂質が少ない。スパイシーなスープの味は同じ。健康に気を使うラーメン愛好家に推奨。食感は若干異なるがスープは同一。',
'Healthier': 'よりヘルシー',

// 해물탕면
'Nongshim · 농심 · Seafood Hot Pot': 'Nongshim · 농심 · 海鮮鍋',
'Inspired by Korean seafood hot pot (해물탕). Rich, complex seafood broth with shrimp, clams, and octopus flavoring. Deep umami, moderate heat. A favorite for seafood lovers who want substance.':
  '韓国の해물탕（海鮮鍋）からインスピレーションを得た商品。エビ・アサリ・タコ風味の濃厚で複雑な海鮮スープ。深いうまみと程よい辛さ。ボリューム感のある海鮮料理が好きな人に人気。',

// 사천짜파게티
'Nongshim · 농심 · Spicy Black Bean': 'Nongshim · 농심 · 辛口ブラックビーン',
'The spicy upgrade of 짜파게티 — black bean sauce with Sichuan-inspired heat. A bold fusion: Korean 짜장 flavors meet Chinese 마라 (mala) spice. Dry stir-fry style.':
  '짜파게티のスパイシーアップグレード — 四川風の辛さを加えたブラックビーンソース。韓国の짜장の風味と中国の마라（マーラー）スパイスが出会う大胆なフュージョン。乾麺炒めスタイル。',

// 짜파구리
'농심 Combo · 짜파게티 + 너구리': '농심 コンボ · 짜파게티 + 너구리',
'Not an official product — a DIY mix of 짜파게티 + 너구리, cooked together. Made famous globally by the 2019 film Parasite (기생충). Western media coined it "Ram-don." Top with a seared sirloin steak as in the film.':
  '公式製品ではなく、짜파게티と너구리を一緒に作るDIYコンビ。2019年の映画「기생충」で世界的に有名に。欧米メディアは「ラムドン」と命名。映画のように炙ったサーロインステーキをトッピングして完成。',
'DIY Combo': 'DIYコンボ',
```

### Samyang — Brand Header

```js
'Founded 1961 — makers of Korea\'s very first instant noodle (삼양라면, 1963). Later became globally famous for 불닭볶음면, which spawned an entire "fire challenge" viral movement on YouTube and TikTok.':
  '1961年創業 — 韓国初のインスタント麺（삼양라면, 1963年）を生み出したメーカー。その後불닭볶음면でYouTubeとTikTokを中心に世界的な「ファイアーチャレンジ」バイラルムーブメントを引き起こし、グローバルな名声を獲得。',
```

### Samyang — Product Cards (11 cards)

```js
// 삼양라면
'Samyang · 삼양 · Korea\'s First (1963)': 'Samyang · 삼양 · 韓国初（1963年）',
'The first instant noodle in Korean history, introduced in 1963. Light, savory broth with a nostalgic simplicity. Many older Koreans grew up on this — it represents an era when instant noodles were a luxury and a lifeline.':
  '1963年に登場した韓国史上初のインスタント麺。ノスタルジックなシンプルさのあっさりしたスープ。多くの年配の韓国人がこの麺と共に育ちました — インスタント麺が贅沢品であり命綱だった時代を象徴する一品。',
'Historic 1963': '歴史的1963年',

// 불닭볶음면
'Samyang · 삼양 · Since 2012 · 4,404 SHU': 'Samyang · 삼양 · 2012年発売 · 4,404 SHU',
'The "Fire Chicken Noodle" — 4,404 Scoville. Started the global K-food spice challenge on YouTube. Dry stir-fry style with sweet-spicy chicken sauce. Now exported worldwide. The chicken (닭) mascot is beloved.':
  '「ファイアーチキン麺」 — 4,404スコヴィル。YouTubeでグローバルなK-フードスパイスチャレンジを開始した。甘辛チキンソースの乾麺炒めスタイル。現在世界中に輸出中。닭（鶏）のマスコットは大人気。',
'🌶️🌶️🌶️🌶️🌶️ Extreme': '🌶️🌶️🌶️🌶️🌶️ 超極辛',
'Global Viral': 'グローバルバイラル',

// 까르보불닭볶음면
'Samyang · 삼양 · Creamy Spicy': 'Samyang · 삼양 · クリーミー辛口',
'The most popular 불닭 variant globally. Creamy carbonara sauce cut with the signature buldak heat — milder than original but with a rich, addictive creaminess. A favorite for people who find original too hot.':
  'グローバルで最も人気の不닭バリエーション。シグネチャーのプルダクの辛さを抑えたクリーミーなカルボナーラソース — オリジナルよりマイルドだが濃厚でクセになるクリーミーさ。オリジナルが辛すぎる人のお気に入り。',
'Most Popular Variant': '最人気バリアント',

// 2배매운 핵불닭볶음면
'Samyang · 삼양 · 8,706 SHU': 'Samyang · 삼양 · 8,706 SHU',
'Double the Scoville of original 불닭 — 8,706 SHU. This is the noodle that made Korean medical staff shake their heads. Used in extreme food challenges. Not recommended for spice beginners or people with stomach issues.':
  'オリジナル불닭の2倍のスコヴィル — 8,706 SHU。韓国の医療従事者が頭を抱えた麺。極限フードチャレンジに使用される。辛さ初心者や胃腸に問題のある人には非推奨。',
'💀 Nuclear': '💀 核級',
'Challenge Level': 'チャレンジレベル',

// 치즈불닭볶음면
'Samyang · 삼양 · Spicy + Cheesy': 'Samyang · 삼양 · 辛口＋チーズ',
'Buldak heat balanced by a cheese powder topping. The dairy fat tones down the spice, making this one of the more approachable 불닭 variants. Mix the cheese in fully before eating — it binds everything together.':
  'チーズパウダーのトッピングでプルダクの辛さを和らげた一品。乳脂肪が辛さを抑え、불닭バリアントの中でも比較的食べやすい。食べる前にチーズをしっかり混ぜること — すべてをひとつにまとめてくれる。',
'Cheese': 'チーズ',

// 짜장불닭볶음면
'Samyang · 삼양 · Dark + Spicy': 'Samyang · 삼양 · ダーク＋辛口',
'Black bean sauce meets buldak fire — dark, savory, and spicy. The blackness of the sauce makes it visually striking. Less well-known internationally but a hit with fans who want 짜장 flavors with a kick.':
  'ブラックビーンソースにプルダクの火力を融合 — 黒く、コクがあり、辛い。ソースの黒さが視覚的なインパクトを生む。国際的な知名度は低いが、짜장の風味に辛さを求めるファンに大人気。',
'Black Bean': 'ブラックビーン',

// 커리불닭볶음면
'Samyang · 삼양 · Yellow Curry Spicy': 'Samyang · 삼양 · 黄色カレー辛口',
'Buldak heat infused with curry spice — a warm, aromatic twist on the fire chicken formula. Yellow-orange color. The curry aroma softens the impact slightly while adding turmeric depth.':
  'カレースパイスを注入したプルダクの辛さ — ファイアーチキンの公式にウォームでアロマティックな変化をもたらす。黄橙色。カレーの香りが辛さの衝撃をやや和らげながらターメリックの深みを加える。',
'Curry': 'カレー',

// 불닭볶음탕면
'Samyang · 삼양 · Soup Version': 'Samyang · 삼양 · スープ版',
'The soup (탕) version of 불닭 — all the fire chicken flavor in a broth format. The spice feels even more intense as it\'s distributed through liquid. Korea\'s spiciest mainstream soup ramyeon.':
  '불닭のスープ（탕）版 — ファイアーチキンのすべての風味をスープ形式で。液体に分散されるため辛さがより強く感じられる。韓国で最も辛い主流スープラーメン。',
'Soup': 'スープ',

// 로제불닭볶음면
'Samyang · 삼양 · Pink Creamy Spicy': 'Samyang · 삼양 · ピンク・クリーミー辛口',
'The trendy rosé pasta-inspired 불닭 — tomato cream meets buldak fire. Pink-orange color, rich and slightly sweet. Very popular with younger audiences riding the rosé pasta trend from K-drama culture.':
  'トレンディなロゼパスタにインスパイアされた불닭 — トマトクリームとプルダクの火力が融合。ピンクオレンジ色で濃厚かつほんのり甘い。K-ドラマ文化のロゼパスタトレンドに乗った若い層に大人気。',
'Trending': 'トレンド',

// 맛있는라면
'Samyang · 삼양 · Everyday Mild': 'Samyang · 삼양 · 日常マイルド',
'"Delicious Ramyun" — exactly what it says. A simple, everyday mild ramyeon with clean beef broth and balanced flavor. No gimmicks. For times you want classic comfort without spice.':
  '「美味しいラーメン」— まさにその名の通り。クリーンな牛肉スープとバランスのとれた風味のシンプルな日常マイルドラーメン。仕掛けなし。辛さなしにクラシックな癒しが欲しい時のために。',
'Everyday': '日常',

// 나가사키짬뽕
'Samyang · 삼양 · Japanese-Korean Fusion': 'Samyang · 삼양 · 日韓フュージョン',
'Inspired by the Nagasaki champon (champuru) dish — a Japanese-Korean-Chinese seafood noodle fusion. Lighter, thicker broth than standard Korean jjambbong. A niche but beloved option for those who like creamy seafood.':
  '長崎ちゃんぽんからインスパイアされた日韓中海鮮麺フュージョン。標準的な韓国짬뽕より軽くて濃厚なスープ。クリーミーな海鮮が好きな人にはニッチだが大人気。',
```

### Ottogi — Brand Header

```js
'Founded 1969. Known for quality at affordable prices. 진라면 (Jin Ramyun) is Korea\'s #2 best-selling ramyeon after 신라면 and holds a devoted following for its full, rounded flavor. Ottogi also makes 비빔면, Korea\'s definitive cold mixed noodle.':
  '1969年創業。手頃な価格の品質で有名。진라면（ジンラーメン）は신라면に次ぐ韓国売上No.2のラーメンで、豊かで丸みある風味で熱狂的なファンを持つ。오뚜기は韓国を代表する冷やし混ぜ麺비빔면も製造。',
```

### Ottogi — Product Cards (11 cards)

```js
// 진라면 매운맛
'Ottogi · 오뚜기 · Since 1988 · #2 Best-Seller': 'Ottogi · 오뚜기 · 1988年発売 · No.2ベストセラー',
'Korea\'s #2 best-selling ramyeon. Rich, complex spicy broth with a deep umami that many prefer over 신라면. Famous for the tagline "진한 라면의 표준" (The standard of rich ramyeon). The yellow packet is iconic.':
  '韓国売上No.2のラーメン。신라면より好む人も多い豊かで複雑なスパイシースープ。「진한 라면의 표준」（濃厚ラーメンの基準）というキャッチコピーで有名。黄色のパッケージがアイコニック。',
'#2 National': '全国No.2',

// 진라면 순한맛
'Ottogi · 오뚜기 · Mild Version': 'Ottogi · 오뚜기 · マイルド版',
'The mild counterpart to 진라면 매운맛 — same deep, savory broth with virtually no heat. Recommended for children, sensitive stomachs, and foreigners new to Korean ramyeon. Just as flavorful, minus the fire.':
  '진라면 매운맛のマイルド版 — 同じ深くてコクのあるスープで辛さはほぼゼロ。子ども、敏感な胃、韓国ラーメン初心者の外国人に推奨。風味はそのまま、辛さだけを除いた。',
'Family-Friendly': 'ファミリー向け',

// 비빔면
'Ottogi · 오뚜기 · Cold Mixed Noodle': 'Ottogi · 오뚜기 · 冷やし混ぜ麺',
'A summer institution — cold chewy noodles tossed in a sweet-tangy-spicy gochujang sauce. Drain the noodles, add ice, mix with sauce. Most Koreans argue about 오뚜기 vs. 팔도 비빔면. Ottogi\'s is slightly sweeter.':
  '夏の定番 — 甘酸っぱいコチュジャンソースで和えた冷たくて弾力のある麺。麺をよく切り、氷を加えソースで混ぜる。韓国人の多くが오뚜기 vs 팔도비빔면を巡って論争中。오뚜기版はやや甘い。',
'Cold': '冷製',
'Summer Ritual': '夏のルーティン',

// 참깨라면
'Ottogi · 오뚜기 · Sesame Broth': 'Ottogi · 오뚜기 · ごまスープ',
'Sesame (참깨)-flavored broth — nutty, warm, and subtly rich. A distinctive option in the Korean instant noodle world. The sesame flavor is pronounced and pairs well with a soft-boiled egg and spinach.':
  'ごま（참깨）風味のスープ — ナッティでウォーム、ほんのり濃厚。韓国インスタント麺界でもユニークな選択肢。ごまの風味が際立ち、半熟卵とほうれん草との相性が抜群。',
'Sesame': 'ごま',

// 열라면
'Ottogi · 오뚜기 · Extra Spicy': 'Ottogi · 오뚜기 · 激辛',
'Ottogi\'s extra-spicy entry — competes with 농심 열라면. Known for a different kind of heat: more capsaicin-forward with less of the umami base. Often used in hot food challenges alongside 불닭.':
  'オットギの激辛ラーメン — 농심の열라면と競合。異なる種類の辛さで知られる：うまみより唐辛子（カプサイシン）の辛さが前面に出る。불닭と共にホットフードチャレンジによく使用される。',

// 진짬뽕
'Ottogi · 오뚜기 · Since 2015 · Top 10': 'Ottogi · 오뚜기 · 2015年発売 · トップ10',
'Ottogi\'s flagship seafood jjambbong ramyeon — launched in 2015 and became an instant bestseller, challenging Nongshim\'s market dominance. Rich, deep-red spicy broth packed with shrimp, squid, and shellfish umami. Bold, satisfying, and consistently ranked in Korea\'s top 10.':
  'オットギの看板海鮮짬뽕ラーメン — 2015年発売で即座にベストセラーとなり農心の市場支配に挑戦。エビ・イカ・貝類のうまみが詰まった濃厚な深紅のスパイシースープ。大胆で満足感があり、常に韓国TOP10にランクイン。',
'Top 10': 'トップ10',

// 오동통면
'Ottogi · 오뚜기 · Thick Noodle': 'Ottogi · 오뚜기 · 太麺',
'Thick, chewy noodles (오동통 = plump/chubby) in a hearty broth. The noodle itself is the main attraction — wider and more substantial than standard ramyeon. Satisfying and filling with a solid chew.':
  '어묵（오동통＝ぽっちゃり/丸々とした）なたっぷりスープのもちもち太麺。麺自体が主役 — 標準的なラーメンより幅広くてボリューム感あり。しっかりした噛み応えで満腹感。',
'Thick Noodle': '太麺',

// 짜슐랭
'Ottogi · 오뚜기 · Premium Black Bean': 'Ottogi · 오뚜기 · プレミアムブラックビーン',
'A punny name (짜장 + Michelin) — premium instant black bean noodle positioned as a gourmet option. Rich, complex black bean sauce with notes of sesame and pork. Often cited as the best instant 짜장면 available.':
  'ダジャレな名前（짜장＋ミシュラン）のグルメ志向のプレミアムインスタントブラックビーン麺。ごまと豚肉の風味が漂う濃厚で複雑なブラックビーンソース。最高のインスタント짜장면としてよく名前が挙がる。',

// 크림진라면
'Ottogi · 오뚜기 · Creamy Upgrade': 'Ottogi · 오뚜기 · クリーミーアップグレード',
'A creamy, indulgent twist on the beloved 진라면 base. Add cream or milk for a luscious finish — the packaging even suggests adding a splash of milk. Rich, smooth, and less intense than the original.':
  '人気の진라면をベースにした濃厚でクリーミーなひねり。クリームまたは牛乳を加えると贅沢な仕上がりに — パッケージにも牛乳を少し加えることが提案されている。オリジナルより濃厚でなめらか。',
'Mild-Med': '弱中辛',
'Trendy': 'トレンディ',

// 팽이버섯라면
'Ottogi · 오뚜기 · Mushroom Broth': 'Ottogi · 오뚜기 · きのこスープ',
'Enoki mushroom (팽이버섯)-based broth — earthy, light, and savory. One of the more health-conscious Ottogi options. The umami from mushrooms creates a surprisingly deep broth without heavy seasoning.':
  'えのき茸（팽이버섯）ベースのスープ — アーシーで軽くてコクがある。オットギのヘルシー志向の選択肢のひとつ。きのこのうまみが重い調味料なしに驚くほど深いスープを生み出す。',
'Mushroom': 'きのこ',

// 컵누들
'Ottogi · 오뚜기 · Light Cup': 'Ottogi · 오뚜기 · 軽量カップ',
'Ottogi\'s lightweight cup noodle — thin noodles, light broth, quick prep. Designed for the office desk, convenience store, or anywhere you need a fast, fuss-free meal. Comes in multiple flavors.':
  'オットギの軽量カップ麺 — 細麺、あっさりスープ、素早い調理。オフィスの机、コンビニ、どこでも手軽に食べられるよう設計。複数の味で展開。',
'Light': '軽量',
```

### Paldo — Brand Header

```js
'Founded 1983. Paldo is known for the iconic 팔도비빔면, often declared the best instant cold noodle in Korea, and for 왕뚜껑 — the giant-lid cup noodle that Koreans use as both a meal and a cooking vessel on road trips.':
  '1983年創業。팔도は韓国最高のインスタント冷麺と名高い팔도비빔면と、왕뚜껑 — 旅行中に食器としても使える大型フタのカップ麺 — で知られる。',
```

### Paldo — Product Cards (6 cards)

```js
// 팔도비빔면
'Paldo · 팔도 · Since 1984 · Summer Legend': 'Paldo · 팔도 · 1984年発売 · 夏の伝説',
'THE original instant bibimmyeon — created in 1984 and still considered the gold standard. Chewy noodles, a sweet-tangy-spicy gochujang sauce. The bibimmyeon debate (팔도 vs 오뚜기) is Korea\'s greatest food argument.':
  '元祖インスタントビビンメン — 1984年誕生し今も金字塔とされる。もちもち麺に甘酸っぱいコチュジャンソース。팔도 vs 오뚜기비빔면の論争は韓国最大の食論争。',
'Cold · Mild Heat': '冷製 · 弱辛',
'Summer 1984': '1984年夏の定番',

// 왕뚜껑
'Paldo · 팔도 · Cup Noodle Icon': 'Paldo · 팔도 · カップ麺アイコン',
'Korea\'s most famous cup noodle — the lid (뚜껑) is oversized (왕 = king) to be used as a plate. Spicy seafood broth with thick noodles. A highway rest-stop and camping staple. The lid-as-bowl hack is universally known.':
  '韓国で最も有名なカップ麺 — フタ（뚜껑）が皿として使えるよう大型（왕＝王）設計。太麺入りのスパイシー海鮮スープ。高速道路のサービスエリアやキャンプの定番。フタをお椀として使う裏技は誰でも知っている。',
'Road Trip Icon': 'ロードトリップの定番',

// 일품해물라면
'Paldo · 팔도 · Premium Seafood': 'Paldo · 팔도 · プレミアム海鮮',
'일품 (First-class) seafood ramyeon — premium positioning with a richer, cleaner seafood broth than most competitors. Shrimp, clams, and squid base. Paldo\'s most upscale offering in the instant category.':
  '일품（一品）の海鮮ラーメン — ほとんどの競合より濃厚でクリーンな海鮮スープのプレミアムポジション。エビ・アサリ・イカベース。팔도のインスタントカテゴリーで最も上質な商品。',

// 팔도라면
'Paldo · 팔도 · Classic': 'Paldo · 팔도 · クラシック',
'Paldo\'s original classic ramyeon — a mild, clean beef broth with straightforward noodles. Less well-known than 신라면 or 진라면 but appreciated for its simplicity. A local staple in certain regions of Korea.':
  '팔도のオリジナルクラシックラーメン — シンプルな麺のあっさりクリーンな牛肉スープ。신라면やお진라면ほど知られていないがそのシンプルさで支持される。韓国の特定地域の定番。',

// 괄도 네넴띤
'Paldo · 팔도 · Viral Spicy Bibimmyeon': 'Paldo · 팔도 · バイラル激辛ビビンメン',
'A limited-edition ultra-spicy bibimmyeon written in the Gyeongsang (경상도) dialect — 팔도비빔면 = 괄도네넴띤 in regional pronunciation. Became a massive viral sensation in 2019. Twice as spicy as the original.':
  '경상도방언で書かれた限定版の超激辛ビビンメン — 팔도비빔면を地域の発音で괄도네넴띤と表記。2019年に大規模なバイラルセンセーションに。オリジナルの2倍の辛さ。',
'Viral 2019': '2019年バイラル',

// 킹뚜껑
'Paldo · 팔도 · XL Cup': 'Paldo · 팔도 · XLカップ',
'Even bigger than 왕뚜껑 — the XL version for truly hungry people. Larger portion, extra noodles, same spicy seafood broth. A camping and festival favorite when you need a seriously filling cup noodle.':
  '왕뚜껑より更に大きい — 本当にお腹を空かせた人のためのXL版。より大きなポーション、追加の麺、同じスパイシー海鮮スープ。本格的に満腹になるカップ麺が必要な時のキャンプやフェスのお気に入り。',
'XL Cup': 'XLカップ',
```

### Special & Trending — Section Header & Cards (7)

```js
'Beyond the big four brands — specialty instant noodles, collaboration products, and emerging trends in Korea\'s constantly evolving ramyeon market.':
  '四大ブランドを超えて — 常に進化する韓国ラーメン市場のスペシャリティインスタント麺、コラボ商品、新トレンド。',

// 틈새라면
'Tumsae · 틈새 · Restaurant Brand → Instant': 'Tumsae · 틈새 · 飲食店ブランド→インスタント',
'Started as a restaurant chain famous for extreme spice (틈새 = gap/niche). Became an instant product. Known as one of the spiciest mainstream instant noodles available. Not for the faint-hearted.':
  '극한の辛さで有名なレストランチェーンとしてスタート（틈새＝すき間/ニッチ）。インスタント商品化。市場に流通する最も辛いインスタント麺のひとつとして知られる。心臓の弱い人は要注意。',
'🌶️🌶️🌶️🌶️🌶️ Extreme': '🌶️🌶️🌶️🌶️🌶️ 超極辛',  // same as above

// 마라탕면
'Various Brands · 마라 Trend · Since ~2018': '各ブランド · 마라トレンド · 2018年頃から',
'Sichuan mala (마라) spice meets Korean ramyeon — numbing + spicy. The 마라 trend swept Korea from 2018 onward. Multiple brands released versions. The distinctive Sichuan pepper numbness is the key experience.':
  '四川マーラー（마라）スパイスと韓国ラーメンが融合 — 麻辺（しびれ）＋辛さ。마라トレンドは2018年以降韓国を席巻。複数ブランドが版を発売。四川山椒独特の痺れ感がキーとなる体験。',
'Mala Trend': 'マーラートレンド',

// 공화춘 짜장면
'Paldo x Gonghwachun · Premium Collab': 'Paldo × 공화춘 · プレミアムコラボ',
'Collaboration between Paldo and Gonghwachun — Incheon\'s oldest Chinese-Korean restaurant (founded 1905). Uses the historic black bean sauce recipe. Positioned as premium instant 짜장면. A collector\'s item in Korean food culture.':
  '팔도と공화춘（1905年創業、仁川最古の中韓料理店）のコラボ。歴史的なブラックビーンソースのレシピを使用。プレミアムインスタント짜장면としてポジション。韓国フードカルチャーのコレクターズアイテム。',
'Collab': 'コラボ',

// 라볶이
'Various · Ramen + Tteokbokki Hybrid': '各ブランド · ラーメン＋トッポッキのハイブリッド',
'Not a brand — a cooking method: ramyeon (라면) + tteokbokki (떡볶이) cooked together in gochujang sauce. Available as a dedicated product or made at home. Sweet-spicy with dual textures — chewy rice cakes and springy noodles.':
  'ブランドではなく調理法：라면（ラーメン）＋떡볶이（トッポッキ）をコチュジャンソースで一緒に調理。専用商品もあれば自宅でも作れる。甘辛で2つの食感 — もちもちの餅と弾力のある麺。',
'Rice Cake Combo': '餅コンボ',

// 비비고 왕교자라면
'CJ Bibigo · Premium Collab': 'CJ 비비고 · プレミアムコラボ',
'Collaboration between CJ\'s 비비고 dumpling brand and ramyeon culture. Comes with actual freeze-dried 왕교자 (king dumplings). One of the most filling and decadent instant noodle products on the market.':
  'CJの비비고餃子ブランドとラーメン文化のコラボ。実際のフリーズドライ왕교자（キング餃子）付き。市場で最も満腹感があり贅沢なインスタント麺商品のひとつ。',

// 크림 새우라면
'Various · Creamy Seafood Trend': '各ブランド · クリーミー海鮮トレンド',
'The creamy shrimp trend — rich, bisque-style shrimp broth meets instant convenience. Inspired by the global cream-based food trend that hit Korea in the early 2020s. Luxurious and subtle.':
  'クリーミーエビトレンド — 濃厚なビスク風エビスープとインスタントの利便性が融合。2020年代初頭に韓国を席巻したグローバルなクリームベース食品トレンドからインスピレーション。上品で繊細。',
'2020s Trend': '2020年代トレンド',

// 풀무원 생면식감
'Pulmuone · 풀무원 · Fresh Concept': 'Pulmuone · 풀무원 · 生麺コンセプト',
'Pulmuone\'s health-oriented instant ramyeon — uses fresh-style noodles (non-fried), cleaner broth, and natural ingredients. Popular with health-conscious consumers. Available in multiple flavors including 생면 udon and 비빔면.':
  'プルムウォンの健康志向インスタントラーメン — 生麺スタイル（非揚げ麺）、クリーンなスープ、天然素材を使用。健康意識の高い消費者に人気。生麺うどんやビビンメンなど複数のフレーバーで展開。',
'Fresh Noodle': '生麺',
```

### Ramyeon Vocabulary Table

```js
'instant noodle (soup type)': 'インスタント麺（スープタイプ）',
'bag/packet noodle': '袋麺',
'cup noodle': 'カップ麺',
'stir-fry (dry) noodle': '炒め（乾）麺',
'cold mixed noodle': '冷やし混ぜ麺',
'spicy flavor': '辛口',
'mild flavor': 'マイルド',
'broth / soup base': 'スープ / だし',
'noodle strands': '麺',
'even soggy, it\'s delicious': 'ふやけても美味しい',
'late-night snack/meal': '夜食',
'hangover cure food': '二日酔い解消食',
'Scoville (heat unit)': 'スコヴィル（辛さの単位）',
'짜파게티 + 너구리 mix (Ram-don)': '짜파게티 + 너구리ミックス（ラムドン）',
'ramyeon + tteokbokki mix': '라면 + 떡볶이ミックス',
```

---

## `mandu.html` — Korean Dumplings

### Hero

```js
'만두 (mandu) is Korea\'s dumpling — steamed, fried, boiled, or simmered in broth. From the ceremonial 만두국 served at Lunar New Year to the addictive frozen 비비고 왕교자 cooked at midnight, mandu sits at the heart of Korean comfort food culture.':
  '만두（マンドゥ）は韓国の餃子 — 蒸す、揚げる、茹でる、またはスープで煮込む。旧正月に食べる儀式的な만두국から深夜に作る중독性のある냉동 비비고 왕교자まで、만두は韓国のコンフォートフード文化の中心にあります。',

'History in Korea': '韓国の歴史',
'Regional varieties': '地域の種類',
'Eaten at New Year': '新年に食べる',
'Bibigo: global K-food brand': 'ビビゴ：グローバルK-フードブランド',
```

### History Info-Box

```js
'만두의 역사 · History of Korean 만두': '만두의 역사 · 韓国만두の歴史',

'Korean mandu was introduced during the Goryeo Dynasty through the Yuan (Mongol) Empire, with its first written record appearing in the Goryeosa (고려사). Initially a prestigious royal court dish, it gradually became everyday food through the modern era — first spreading via Chinese immigrant communities, then transformed by the mass production of frozen dumplings in the 1980s. Korea once had countless street-side mandu shops, but as Bibigo frozen mandu rose to dominance, there is a saying that every mandu shop making a less tasty product than Bibigo has since had to shut its doors.':
  '韓国の만두は고려시대に元（モンゴル）帝国を通じて伝来し、고려사（高麗史）に初めて文字で記録されました。当初は高貴な宮廷料理でしたが、近代に入り中国系移民コミュニティを通じて広まり、1980年代の冷凍餃子の大量生産を経て日常食となりました。韓国にはかつて無数の路面만두店がありましたが、비비고냉동만두が台頭するにつれ、비비고より美味しくないমান두店はすべて閉店を余儀なくされたという話も生まれました。',
```

### 공갈만두 Tip-Box

```js
'The 공갈만두 Legend': '공갈만두（空餃子）伝説',

'공갈만두 (gongal mandu) is a hollow mandu — the wrapper is big, the inside is nearly empty. It was traditionally sold by street vendors who deceived customers with large-looking dumplings containing minimal filling. Today "공갈만두" is used as slang for anything that looks impressive but is hollow inside. Learning this word impresses any Korean.':
  '공갈만두（ゴンガルマンドゥ）は中身がほぼ空の餃子 — 皮は大きいのに中身はほとんどない。伝統的に中身の少ない大きく見せかけた餃子を路上で売っていた行商人から生まれた。今日「공갈만두」は見かけだけ立派で中身のないものを指すスラングとして使われる。この言葉を知ると韓国人を驚かせることができる。',
```

### By Cooking Method — Section Header

```js
'The same dumpling filling transforms completely depending on how it\'s cooked. Each method brings out different textures and flavors from the same mandu.':
  '同じ餃子の具材も調理法によって全く異なる食感と味になります。それぞれの調理法が同じ만두から異なる魅力を引き出します。',
```

### By Cooking Method — Cards (6 cards)

```js
// 군만두
'Pan-Fried Dumpling · 굽다 = to grill/fry': 'フライパン焼き餃子 · 굽다 = 焼く',
'Pan-fried until the bottom is golden and crispy while the top stays soft and chewy. The most popular preparation — the contrast between crispy base and tender filling is the defining characteristic. Found at all 분식집.':
  '底が黄金色でカリカリになるまで焼き、上は柔らかくもちもちに保つ。最もポピュラーな調理法 — カリカリの底と柔らかい具材のコントラストが特徴。すべての분식집（軽食店）で見られる。',
'Most Popular': '最人気',
'Crispy Bottom': 'カリカリの底',

// 찐만두
'Steamed Dumpling · 찌다 = to steam': '蒸し餃子 · 찌다 = 蒸す',
'Steamed in a bamboo or metal steamer — soft, plump, juicy. The gentlest cooking method — preserves the most filling moisture and delicate flavor. Often served with soy dipping sauce and ginger.':
  '竹または金属製の蒸し器で蒸す — 柔らかく、ふっくら、ジューシー。最もやさしい調理法 — 具材の水分と繊細な風味を最もよく保持。醤油たれと生姜と共によく提供される。',
'Soft': '柔らか',
'Healthy': 'ヘルシー',

// 물만두
'Boiled Dumpling · 물 = water': '茹で餃子 · 물 = 水',
'Boiled in water until translucent and tender. Lighter and cleaner than fried versions. Often served with a seasoned soy dipping sauce. Pulmuone\'s 물만두 is one of Korea\'s best-loved frozen products.':
  '水で茹でて透き通るほど柔らかくなるまで火を通す。揚げた版より軽くてクリーン。味付け醤油たれと共に提供されることが多い。풀무원の물만두は韓国で最も人気の冷凍商品のひとつ。',
'Transparent Skin': '透明な皮',

// 튀김만두
'Deep-Fried Dumpling · 튀기다 = to deep-fry': '揚げ餃子 · 튀기다 = 揚げる',
'Completely submerged and deep-fried until shatteringly crispy all over. The most indulgent form — maximum crunch, rich golden exterior. A street food staple. Often served at 길거리 (street) stalls and 분식집.':
  '完全に油に沈め、全体がバリバリにカリカリになるまで揚げる。最も贅沢な形 — 最高のサクサク感と豊かな黄金の外皮。길거리（路上）の屋台や분식집の定番ストリートフード。',
'All Crispy': '全部カリカリ',

// 만두국
'Dumpling Soup · 국 = soup': '餃子スープ · 국 = スープ',
'Mandu cooked in a clear beef or anchovy broth. The ultimate winter and New Year dish — eaten on 설날 (Lunar New Year) for luck. Adding tteok (떡) makes it 떡만둣국. Garnished with egg strips and seaweed.':
  '맑은牛肉またはイワシのだしで만두を煮た料理。究極の冬と新年の料理 — 운を呼ぶために설날（旧正月）に食べる。떡（餅）を加えると떡만둣국になる。錦糸卵と海苔で飾る。',
'New Year Ritual': '新年の儀式',
'Warm Soup': '温かいスープ',

// 전골만두
'Hot Pot Mandu · 전골 = table-top hot pot': 'ホットポット餃子 · 전골 = テーブルホットポット',
'Mandu cooked in a spicy 전골 (table-top hot pot) with vegetables, mushrooms, and glass noodles. A communal eating experience — the broth becomes richer as more ingredients are added. A cold-weather favorite.':
  '野菜・きのこ・春雨と共に辛い전골（テーブルホットポット）鍋で煮た만두。食材を追加するたびにスープが豊かになる共同食事体験。寒い季節のお気に入り。',
'Group Dining': 'グループ食事',
```

### By Filling — Section Header

```js
'What\'s inside a mandu defines its identity. Korea has developed dozens of filling combinations, from simple pork-cabbage to vegan temple versions.':
  '만두の中身がその정체性を決める。韓国はシンプルな豚肉・キャベツの組み合わせから채식사찰版まで数十種類の具材の組み合わせを発展させてきた。',
```

### By Filling — Cards (12 cards)

```js
// 고기만두
'Meat Dumpling · 고기 = meat (pork)': '肉餃子 · 고기 = 肉（豚肉）',
'The classic — ground pork mixed with tofu, glass noodles, garlic, ginger, scallions, and sesame oil. Balanced and rich. The default "mandu" most Koreans think of. Bibiogo\'s version dominates the frozen market.':
  'ザ・クラシック — 豆腐・春雨・ニンニク・生姜・ねぎ・ごま油と混ぜた挽き豚肉。バランスよく濃厚。ほとんどの韓国人が「만두」と聞いて思い浮かべるデフォルト。ビビゴ版が냉동시장を支配。',
'The Classic': 'ザ・クラシック',
'Pork + Tofu': '豚肉＋豆腐',

// 김치만두
'Kimchi Dumpling · 김치 filling': 'キムチ餃子 · キムチの具',
'Fermented kimchi mixed with pork and tofu — tangy, slightly sour, deeply savory. The fermentation adds complexity that plain pork mandu lacks. Best in winter when kimchi is perfectly aged. A national favorite.':
  'よく熟れたキムチに豚肉と豆腐を混ぜた餃子。発酵の複雑さがプレーンな豚肉만두にはない深みを加える。キムチが完璧に숙성される冬が最高。国民的お気に入り。',
'Fermented': '발酵',

// 갈비만두
'Short Rib Dumpling · 갈비 = short rib': 'カルビ餃子 · 갈비 = ショートリブ',
'Premium mandu filled with braised short rib (갈비) meat. Rich, deeply savory, slightly sweet from the soy marinade. More expensive than standard mandu — considered an upscale restaurant version. Intensely satisfying.':
  'ブレイズしたショートリブ（갈비）肉を詰めたプレミアム만두。醤油マリネのほんのりとした甘さが加わる濃厚で深いコク。通常の만두より高価 — 高級レストラン版とされる。満足度極めて高い。',
'Short Rib': 'ショートリブ',

// 새우만두
'Shrimp Dumpling · 새우 = shrimp': 'エビ餃子 · 새우 = エビ',
'Minced shrimp mixed with pork and chives — the seafood cousin of standard gogi mandu. The shrimp adds sweetness and a springy bite. Common at Chinese-Korean (중국집) restaurants and upscale mandu shops.':
  '豚肉とニラと混ぜた細切りエビ — 標準的な고기만두の海鮮版。エビが甘さとプリプリの食感を加える。中韓料理店（중국집）や高級만두店によく見られる。',
'Sweet Shrimp': '甘エビ',

// 해물만두
'Seafood Dumpling · 해물 = seafood': '海鮮餃子 · 해물 = 海鮮',
'Mixed seafood filling — crab, shrimp, squid, and sometimes clams bound with pork and vegetables. Ocean umami in dumpling form. Heavier and richer than shrimp mandu alone. Popular in coastal cities like Busan.':
  'カニ・エビ・イカ・時にはアサリを豚肉と野菜で結んだ混合海鮮の具。餃子形態の海のうまみ。エビ만두単品より重くて濃厚。釜山などの海岸都市で人気。',
'Mixed Seafood': 'ミックス海鮮',
'Coastal Style': '海岸スタイル',

// 채소만두
'Vegetable Dumpling · 채소 = vegetable': '野菜餃子 · 채소 = 野菜',
'All-vegetable filling — usually tofu, glass noodles, spinach, mushrooms, chives, and seasoned well. Popular with vegetarians (채식주의자). Lighter than meat versions — a good choice for those watching fat intake.':
  '全野菜の具 — 通常豆腐・春雨・ほうれん草・きのこ・ニラを使いよく味付け。菜食主義者（채식주의자）に人気。肉版より軽め — 脂質摂取を気にする人に良い選択。',
'Veggie': '野菜',
'Lighter': '軽い',

// 두부만두
'Tofu Dumpling · 두부 = tofu': '豆腐餃子 · 두부 = 豆腐',
'Tofu-dominant filling — crumbled tofu with seasonings, garlic, scallion, and sesame oil. Subtle and clean in flavor. Often preferred for its lighter protein. A temple food (사찰음식) variant omits even scallions.':
  '豆腐主体の具 — ニンニク・ねぎ・ごま油で味付けしたほぐした豆腐。繊細でクリーンな風味。より軽いタンパク質として好まれることが多い。사찰음식（寺院料理）版はねぎも省略。',
'Temple Style': '寺院スタイル',

// 당면만두
'Glass Noodle Dumpling · 당면 = glass noodles': '春雨餃子 · 당면 = 春雨',
'Glass noodles (당면) as the primary filling along with pork and vegetables. The noodles add a chewy, slippery texture and absorb all the seasoning oil. A popular budget-friendly mandu sold by street stalls.':
  '主な具材に春雨（당면）と豚肉・野菜を使用。春雨がもちもちで滑らかな食感を加え、調味油をすべて吸収する。路上屋台が販売する人気のコスパ餃子。',
'Chewy': 'もちもち',

// 게살만두
'Crab Meat Dumpling · 게살 = crab meat': 'カニ肉餃子 · 게살 = カニ肉',
'Imitation or real crab meat mixed with cream cheese or light mayonnaise. A modern, restaurant-style creation. Often shaped differently (white, thin-skinned) to distinguish from traditional mandu. Delicate and rich.':
  'イミテーションまたは本物のカニ肉をクリームチーズまたは軽めのマヨネーズと混ぜた現代レストランスタイルの創作品。伝統的な만두と区別するため異なる形（白くて薄い皮）に成形されることが多い。上品で濃厚。',
'Modern Style': 'モダンスタイル',

// 삼겹살만두
'Pork Belly Dumpling · 삼겹살 = pork belly': 'サムギョプサル餃子 · 삼겹살 = 豚バラ',
'Diced 삼겹살 (pork belly) as the star filling — extra fatty, rich, and indulgent. Often paired with kimchi for balance. A premium street food item — thicker filling, bolder flavor than standard 고기만두.':
  'ダイスカットした삼겹살（豚バラ）がメインの具 — 余分な脂があり濃厚で贅沢。バランスのためキムチと組み合わせることが多い。標準的な고기만두より厚い具材と大胆な風味のプレミアムストリートフード。',
'Pork Belly': '豚バラ',

// 밥만두
'Rice Dumpling · 밥 = rice': 'ご飯餃子 · 밥 = ご飯',
'Rice mixed with seasoned ingredients inside the wrapper. A filling and hearty variant popular in the military (군대) and school cafeterias (학교 급식). Hearty, carb-dense, and satisfying for those who want substance.':
  '皮の中に調理済みご飯を詰めた満腹感のあるしっかりとしたバリエーション。軍隊（군대）や学校給食（학교 급식）で人気。炭水化物豊富でがっつり食べたい人に満足できる一品。',
'Filling': '満腹',
'Cafeteria': '食堂',

// 개방만두
'Open Dumpling · Modern Restaurant Style': 'オープン餃子 · モダンレストランスタイル',
'Modern restaurant-style mandu left partially open at the top so the filling is visible — a Chinese-influenced shumai (슈마이) style. Steamed, with a decorative element like a shrimp or mushroom on top.':
  '具材が見えるよう上部を開けたまま仕上げるモダンレストランスタイルの만두 — 中国の焼売（슈마이）スタイルの影響を受けた蒸し餃子。エビやきのこなどで装飾。',
'Modern': 'モダン',
'Restaurant Style': 'レストランスタイル',
```

### Major Brands — Section Header

```js
'Korea\'s frozen mandu market is dominated by a handful of brands — the most globally successful being CJ\'s 비비고, which became the #1 frozen dumpling brand in the US, China, and Southeast Asia.':
  '韓国の냉동만두市場は数ブランドが支配 — 最もグローバルに成功したのはCJの비비고で、米国・中国・東南アジアで冷凍餃子ブランドNo.1となった。',
```

### Major Brands — Cards (10 brands)

```js
// 비비고 왕교자
'CJ CheilJedang · CJ제일제당 · Global #1': 'CJ CheilJedang · CJ제일제당 · グローバルNo.1',
'CJ\'s flagship product — the large (왕 = king) gyoza-style dumpling with juicy pork, tofu, and chive filling. Became the #1 dumpling brand in multiple countries. The thin, chewy skin is the key. Available at Costco worldwide.':
  'CJの看板商品 — ジューシーな豚肉・豆腐・ニラの具を包んだ大型（왕＝王）餃子スタイルの만두。複数の国で餃子ブランドNo.1に。薄くてもちもちの皮がポイント。世界中のコストコで購入可能。',
'Global #1': 'グローバルNo.1',
'Thin Skin': '薄い皮',

// 비비고 김치만두
'CJ CheilJedang · CJ제일제당': 'CJ CheilJedang · CJ제일제당',
'Bibigo\'s kimchi dumpling — perfectly fermented kimchi filling balanced with pork and tofu. The tangy punch of kimchi works beautifully inside a dumpling skin. A fan favorite for those who want bold flavor.':
  'ビビゴのキムチ餃子 — 豚肉と豆腐でバランスよく配合された完璧に発酵したキムチの具。キムチの酸味パンチが餃子の皮の中で美しく機能する。大胆な風味を求める人のファン上位。',
'Kimchi': 'キムチ',

// 풀무원 물만두
'Pulmuone · 풀무원 · Clean Ingredients': 'Pulmuone · 풀무원 · クリーン食材',
'Pulmuone\'s health-focused boiled dumpling — cleaner ingredients, no artificial preservatives. The brand is known for organic and natural products. The 물만두 is soft, light, and less fatty than competitor versions.':
  'プルムウォンの健康志向茹で餃子 — クリーンな食材、人工保存料なし。オーガニックと自然食品で知られるブランド。물만두は競合版より柔らかく、軽く、脂質が少ない。',
'Clean': 'クリーン',
'No Preservatives': '保存料なし',

// 해태 고향만두
'Haitai · 해태제과 · Nostalgia Brand': 'Haitai · 해태제과 · ノスタルジアブランド',
'고향 means "hometown" — Haitai\'s mandu evokes nostalgia for homemade dumplings. A longtime Korean market staple that pre-dates the Bibigo era. Beloved by older generations for its familiar, home-style flavor profile.':
  '고향は「故郷」を意味する — 해태만두는家庭手製餃子へのノスタルジーを呼び起こす。비비고時代より前からある長年の韓国市場の定番。親しみある家庭風の味わいで年配世代に愛される。',
'Nostalgic': 'ノスタルジック',
'Hometown Taste': '고향の味',

// 동원 개성만두
'Dongwon · 동원 · Gaeseong Style': 'Dongwon · 동원 · 개성スタイル',
'Styled after the historical Gaeseong (개성) mandu tradition from North Korea — known for large size, rich pork filling, and distinctive half-moon shape. Gaeseong was historically the mandu capital of Korea.':
  '北朝鮮の歴史都市개성の만두伝統を模したスタイル — 大きなサイズ、豊かな豚肉の具材、独特の半月形で知られる。개성는歴史的に韓国의만두の都だった。',
'Gaeseong Historic': '개성の歴史',
'Large Size': '大型サイズ',

// 사조 대림 만두
'Sajo Daerim · 사조대림 · Budget Staple': 'Sajo Daerim · 사조대림 · 格安の定番',
'Sajo\'s budget-friendly mandu line — excellent value for money. A staple for Korean households that want large quantities at low cost. Consistent quality and widely available at discount supermarkets and 창고형 stores.':
  '사조のコスパに優れたมandu라인 — コストパフォーマンス抜群。低コストで大量に欲しい韓国家庭の定番。安定した品質でディスカウントスーパーと창고형（倉庫型）店舗で広く入手可能。',
'Budget Friendly': 'コスパ良好',
'Bulk Buy': '大容量購入',

// 할매손만두
'Grandmother\'s Hand-Made Style': 'おばあちゃんの手作りスタイル',
'Small-batch, handmade-style mandu sold at traditional markets (재래시장) — "할매" means grandmother. Often made fresh and sold in large quantities at markets like Gwangjang Market (광장시장) in Seoul. Thicker skins, more rustic.':
  '伝統市場（재래시장）で販売される少量手作りスタイルの만두 — 「할매」는おばあちゃんを意味する。ソウルの광장시장などで新鮮に作って大量販売されることが多い。厚めの皮で素朴な味わい。',
'Market Fresh': '市場の新鮮さ',
'Hand-Made': '手作り',

// 왕만두
'Multiple Brands · 왕 = King (oversized)': '各ブランド · 왕 = 王（特大サイズ）',
'Any oversized mandu — 왕 (king) denotes extra-large size. The filling is denser and more generous. Found at convenience stores (편의점) and 분식집 everywhere. A quick, filling meal in one piece. Street vendors make these fresh to order.':
  'どんな大型만두も — 왕（王）은特大サイズを意味する。具材がより密度高く豊富。편의점（コンビニ）と분식집のどこでも見つかる。1個で素早く満腹になれる食事。路上露店では注文を受けてから作る。',
'Huge Size': '特大サイズ',

// 납작만두
'Regional Style · Flat &amp; Pan-Fried': '地域スタイル · 平たく焼く',
'납작 = flat. A thinner, wider shape that maximizes crispy surface area when pan-fried. Popular in certain regions. Used in 납작만두볶음 (stir-fried flat mandu) — a popular street snack with tteokbokki sauce.':
  '납작＝平たい。フライパン焼きの際にカリカリの表面積を最大化する薄くて幅広の形。特定の地域で人気。트떡볶이ソースを使った人気のストリートスナック납작만두볶음（フラット餃子炒め）に使用。',
'Flat Style': '平たいスタイル',
'Max Crispy': '最高のカリカリ感',

// 공갈만두 (brand card)
'Cultural Legend · Street Food Deception': '文化的伝説 · 路上の詐欺',
'The infamous "fake" mandu — enormous wrapper concealing almost no filling inside. Sold by street vendors to deceive hungry customers. Now a cultural joke. "공갈" means bluffing or deceiving. Used as modern slang for anything all-show-no-substance.':
  '悪名高い「偽」만두 — 巨大な皮の中身がほぼ空。空腹の客を騙すために路上業者が販売していた。今や文化的なジョーク。「공갈」는虚偽や欺くことを意味する。外見だけ立派で中身がないものを指す現代スラングとして使用。',
'Slang Origin': 'スラングの起源',
'Cultural Joke': '文화的ジョーク',
```

### Special & Seasonal — Section Header & Cards

```js
'These mandu carry deep cultural or historical significance — from Goryeo dynasty origins to UNESCO-recognized holiday traditions.':
  'これらの만두は高麗王朝の起源からユネスコ認定の祝日伝統まで、深い文化的・歴史的意義を持つ。',

// 떡만둣국
'Lunar New Year Soup · 설날 Ritual': '旧正月スープ · 설날の儀式',
'Rice cake (떡) + mandu (만두) in clear broth — the definitive Lunar New Year (설날) dish. Eating a bowl on New Year\'s Day is believed to add one year of age and bring good fortune. Garnished with egg strips, nori, and sesame.':
  '맑은スープに떡（餅）＋만두（餃子）— 決定的な旧正月（설날）の料理。元日に一杯食べると一歳年をとり幸運をもたらすと信じられている。錦糸卵・海苔・ごまで飾る。',
'설날 Ritual': '설날の儀式',
'New Year': '新年',

// 봄나물만두
'Spring Seasonal · Wild Spring Greens': '春季限定 · 野生の春野草',
'Spring edition featuring seasonal wild herbs — 달래 (wild chive), 쑥 (mugwort), 냉이 (shepherd\'s purse). Made at home during spring when herbs are freshest. A seasonal tradition in many Korean households.':
  '달래（野생ニラ）・쑥（ヨモギ）・냉이（ナズナ）などの旬の野生ハーブを使った春版。ハーブが最も新鮮な春に自宅で作る。多くの韓国家庭の季節の伝統。',
'Spring Only': '봄限定',
'Wild Herbs': '野生ハーブ',

// 사찰만두
'Buddhist Temple Food · No 오신채': '仏教寺院料理 · 오신채なし',
'Buddhist temple cuisine mandu — absolutely no meat, no garlic, no onion, no chive, no leek (the five pungent vegetables 오신채 are forbidden). Uses mushroom, tofu, and seasonal vegetables only. Pure, delicate, and spiritual.':
  '仏教寺院料理の만두 — 肉・ニンニク・玉ねぎ・ニラ・ネギは一切なし（五辛채오신채は禁止）。きのこ・豆腐・旬の野菜のみ使用。純粋で繊細、精神的な食べ物。',
'Vegan': 'ビーガン',
'Temple Food': '寺院料理',

// 개성만두
'North Korean Style · Historical Capital': '北朝鮮スタイル · 歴史的な首都',
'The most historically prestigious Korean mandu style — from Gaeseong (개성), the Goryeo dynasty capital now in North Korea. Very large, thicker wrapper, rich pork and kimchi filling, crescent moon shape. Considered the ancestor of all Korean mandu.':
  '最も歴史的に権威ある韓国만두スタイル — 현재북朝鮮にある高麗王朝の首都개성（開城）발祥。非常に大きく、厚めの皮、豊かな豚肉とキムチの具、三日月形。全韓国만두의祖先とされる。',
'Historical': '歴史的',
'Goryeo Origin': '高麗起源',
```

### Mandu Vocabulary Table

```js
'Korean dumpling': '韓国餃子',
'dumpling wrapper/skin': '餃子の皮',
'dumpling filling': '餃子の具',
'pan-fried dumpling': 'フライパン焼き餃子',
'steamed dumpling': '蒸し餃子',
'boiled dumpling': '茹で餃子',
'deep-fried dumpling': '揚げ餃子',
'king-size dumpling': '特大餃子',
'dumpling soup': '餃子スープ',
'rice cake &amp; dumpling soup (New Year)': '餅と餃子のスープ（新年）',
'hollow mandu (slang: all show, no substance)': '空만두（スラング：見かけ倒し）',
'to fold (as in fold a dumpling)': '折る（餃子を包む）',
'pleats/folds on the wrapper': '皮のひだ',
'to dip and eat': 'つけて食べる',
'soy dipping sauce': '醤油たれ',
```

---

## `kchicken.html` — Korean Fried Chicken

### Hero

```js
'Korea\'s fried chicken (치킨) is not American fried chicken. It\'s double-fried for maximum crunch, coated in sweet-spicy glazes, and delivered within 30 minutes to your door at 11 PM. With 87,000+ chicken restaurants in Korea (more than McDonald\'s worldwide), this is a national religion.':
  '韓国の치킨（フライドチキン）はアメリカのフライドチキンとは異なる。最大限のサクサク感のために二度揚げし、甘辛のグレーズをまとわせ、夜11時でも30分以内に配達される。韓国に87,000店以上のチキン店がある（世界のマクドナルドより多い）。これは国民的な宗教だ。',

'Chicken shops in Korea': '韓国のチキン店数',
'치킨 + 맥주 (beer) combo': '치킨 + 맥주（ビール）コンボ',
'Double-fried for crunch': '二度揚げでサクサク',
'Average delivery time': '平均配達時間',
```

### History Info-Box

```js
'한국 치킨의 역사 · How Korean Fried Chicken Was Born': '한국 치킨의 역사 · 韓国フライドチキンの誕生',
```

Note: The `tip-text` here contains `<strong>` tags that split the text node. Each fragment must be a separate key:

```js
'1. The Birth of Tongdak: Electric Roasting &amp; Frying (1960s–70s)': '1. 통닭の誕生：電気焼きと揚げ物（1960〜70年代）',
// Note: the <br> splits this; the text node is the <strong> content above

'In 1960, \'Myeongdong Yeongyang Center\' in Seoul became the first to serve 전기구이 통닭 — a whole chicken cooked in an electric oven. By the 1970s, cheap cooking oils made deep-fried \'옛날 통닭\' (old-style whole fried chicken) widely popular. In 1977, Korea\'s first chicken franchise, Lim\'s Chicken (림스치킨), opened at Myeongdong\'s Shinsegae Department Store, introducing the practice of cutting chicken into pieces before frying.':
  '1960年、ソウル「明洞栄養センター」が電気オーブンで丸鶏を調理した전기구이 통닭を初めて提供した。1970年代には安価な食用油の普及により、丸鶏を揚げた「옛날 통닭」（昔風丸鶏フライ）が広く普及。1977年には韓国初のチキンフランチャイズ「림스치킨（リムスチキン）」が明洞の新世界百貨店に開業し、揚げる前に鶏を切り分けるスタイルを導入した。',

'2. K-Chicken Perfected: The Birth of Yangnyeom Chicken (1980s)': '2. K-チキンの完成：양념치킨の誕생（1980年代）',

'To suit Korean palates less accustomed to plain fried chicken, a sweet-spicy sauce of gochujang and garlic was tossed over freshly fried chicken — and 양념치킨 was born. As chains like Mexicana Chicken (맥시칸치킨) expanded through the 1980s, the custom of pairing chicken with pickled radish cubes (무) became standard, giving rise to today\'s iconic 치맥 (치킨+맥주, chicken+beer) culture.':
  'プレーンなフライドチキンに慣れていない韓国人の口に合わせ、コチュジャンとニンニクの甘辛ソースを揚げたての鶏に和えた — こうして양념치킨が誕生した。1980年代にMexicana Chicken（맥시칸치킨）などのチェーンが拡大するにつれ、チキンにピクルス大根（무）を添える習慣が定番となり、今日のアイコニックな치맥（치킨+맥주）文化が生まれた。',
```

### 치맥 Tip-Box

```js
'치맥 (Chimaek) Culture': '치맥（チメク）文化',

'치맥 = 치킨 + 맥주 (beer). This is Korea\'s most beloved food pairing — cold beer with hot crispy chicken, usually ordered for delivery. Eating 치맥 while watching football (축구), baseball (야구), or a K-drama is considered one of life\'s peak experiences by many Koreans. The combination became globally known through the drama "My Love From the Star" (별에서 온 그대, 2013).':
  '치맥 = 치킨 + 맥주（ビール）。これは韓国で最も愛されるフードペアリング — 熱くてカリカリのチキンに冷たいビール、通常は配達注文。축구（サッカー）・야구（野球）・K-ドラマを見ながら치맥を食べることは多くの韓国人に「人生最高の体験」のひとつとされる。「별에서 온 그대」（2013年）というドラマを通じて世界的に知られるようになった。',
```

### Top Chicken Chains — Section Header

```js
'Each chain has its own signature flavor identity, sauce philosophy, and loyal fanbase. Choosing the "best" chicken franchise is a deeply personal matter that Koreans debate seriously.':
  '各チェーンには独自のシグネチャーフレーバーアイデンティティ、ソース哲学、忠実なファン層がある。「最高の」チキンフランチャイズを選ぶことは韓国人が真剣に議論する非常に個人的な問題だ。',
```

### Top Chicken Chains — Cards (15 chains)

```js
// 교촌치킨
'교촌에프앤비 · Founded 1991 · Daegu · Global': '교촌에프앤비 · 1991年創業 · 大邱 · グローバル展開',
'Korea\'s most prestigious chicken chain — famous for the 교촌 허니콤보 (Honey Combo) and soy sauce (간장) base. Not sweet-spicy like most chains — instead, a sophisticated soy-garlic glaze. Higher price point, considered premium. Has stores in the US, China, Malaysia.':
  '韓国で最も権威あるチキンチェーン — 교촌허니콤보（ハニーコンボ）と간장（醤油）ベースで有名。ほとんどのチェーンのような甘辛ではなく、洗練された醤油ガーリックグレーズ。高価格帯でプレミアムとされる。米国・中国・マレーシアに店舗あり。',
'Soy Garlic': 'ソイガーリック',
'Honey Combo': 'ハニーコンボ',

// BBQ치킨
'제너시스BBQ · Founded 1995 · Global Expansion': '제너시스BBQ · 1995年創業 · グローバル展開',
'BBQ stands for "Best of the Best Quality." Famous for 황금올리브치킨 (Golden Olive Chicken) — fried in pure olive oil. The most internationally expanded Korean chicken chain, with 57+ countries. Also known for the Crispy Goldking flavor.':
  'BBQは「Best of the Best Quality」の略。純粋なオリーブオイルで揚げた황금올리브치킨（ゴールデンオリーブチキン）で有名。57カ国以上で展開する最も国際的な韓国チキンチェーン。Crispy Goldkingフレーバーでも知られる。',
'Golden Olive': 'ゴールデンオリーブ',
'57+ Countries': '57カ国以上',

// BHC치킨
'BHC그룹 · Founded 1993 · Delivery King': 'BHC그룹 · 1993年創業 · 配달の王',
'Famous for two viral menu items: 뿌링클 (Ppuringkle — cheesy powder coating) and 맛초킹 (Matzokking — crispy spicy). Both consistently rank as Korea\'s most-ordered delivery chicken. The 뿌링클 cheese powder has its own cult following.':
  '2つのバイラルメニューで有名：뿌링클（プリングル — チーズパウダーコーティング）と맛초킹（マッチョキング — サクサク辛口）。両方とも韓国で最も注문される配達チキンとして常にランクイン。뿌링클のチーズパウダーにはカルト的なファンがいる。',
'뿌링클 Viral': '뿌링클バイラル',

// 굽네치킨
'굽네 · Founded 2003 · Oven-Baked Pioneer': '굽네 · 2003年創業 · オーブン焼きの先駆者',
'Korea\'s leader in oven-baked (오븐에 구운) chicken — not fried at all. Lower fat, cleaner flavor, crispy through slow oven cooking. The signature 볼케이노 (Volcano) spicy sauce is a classic. Popular with health-conscious consumers.':
  'オーブン焼き（오븐에 구운）チキンの韓国リーダー — 一切揚げない。低脂質でクリーンな風味、スロークッキングでカリカリに。シグネチャーの볼케이노（ボルケーノ）スパイシーソースが定番。健康意識の高い消費者に人気。',
'Oven-Baked': 'オーブン焼き',
'Oven-Baked Pioneer': 'オーブン焼きの先駆者',

// 처갓집양념치킨
'처갓집 · Founded 1985 · Original Yangnyeom': '처갓집 · 1985年創業 · 양념치킨の元祖',
'처갓집 is credited with inventing or popularizing 양념치킨 (sweet-spicy sauce chicken) — the style that defines Korean fried chicken internationally. The original bright red gochujang glaze. A foundational pillar of Korean chicken culture.':
  '처갓집는양념치킨（甘辛ソースチキン）を発明または普及させたブランドとして認められている — 国際的に韓国フライドチキンを定義するスタイル。元祖の鮮やかな赤いコチュジャングレーズ。韓国チキン文화の礎。',
'양념 Pioneer': '양념치킨の先駆者',

// 멕시칸치킨
'멕시칸 · Founded 1982 · Long-Running Classic': '멕시칸 · 1982年創業 · 長寿クラシック',
'One of Korea\'s longest-running chicken chains — despite the name, it\'s 100% Korean chicken style. Known for crispy texture and a balanced sweet-spicy sauce. A nostalgic choice for Koreans who grew up in the 1980s and 90s.':
  '韓国で最も長く営業するチキンチェーンのひとつ — 名前にもかかわらず100%韓国スタイルのチキン。カリカリの食感とバランスのよい甘辛ソースで知られる。1980〜90年代に育った韓国人にとってノスタルジックな選択。',
'Since 1982': '1982年創業',

// 멕시카나치킨
'멕시카나 · Founded 1989 · Similar Name, Different Brand': '멕시카나 · 1989年創業 · 似た名前、別ブランド',
'Often confused with 멕시칸치킨 — these are entirely separate chains. 멕시카나 has its own signature spicy paste recipe and loyal regional following. Known for hand-pressed marinade applied before frying — results in deeper flavor penetration.':
  '멕시칸치킨と混同されがちだが、これらは全く別のチェーン。멕시카나는独自のシグネチャースパイシーペーストレシピと忠実な地域ファン層を持つ。揚げる前に手で押し込むマリネで知られ、より深い風味の浸透をもたらす。',
'Hand-Pressed': 'ハンドプレス',

// 페리카나치킨
'페리카나 · Founded 1982 · Soy Sauce Legend': '페리카나 · 1982年創業 · 醤油の伝説',
'One of Korea\'s oldest chicken chains — founded the same year as 멕시칸. Famous for 간장치킨 (soy sauce chicken) before it became mainstream. A regional stronghold brand with fierce loyalty in certain neighborhoods. Classic, no-frills, reliable.':
  '韓国で最も古いチキンチェーンのひとつ — 멕시칸と同じ年に창립。主流になる前から간장치킨（醤油チキン）で有名。特定の地域で強い충성度を持つ地域의강자ブランド。クラシックで飾りなく、信頼できる。',
'Soy Sauce OG': '醤油チキンの元祖',

// 지코바닭갈비
'지코바 · Stir-Fried Not Fried · Unique': '지코바 · 炒め・揚げでない · ユニーク',
'Unlike every other chain — this is not fried chicken. 지코바 specializes in 닭갈비 (dak-galbi), marinated chicken ribs stir-fried in a spicy gochujang sauce on a tabletop griddle. A completely different Korean chicken experience. Hugely popular for groups.':
  '他のすべてのチェーンとは異なり — これはフライドチキンではない。지코바는닭갈비（ダッカルビ）専門で、コチュジャンソースとテーブルグリドルで炒めるマリネした鶏リブ。全く異なる韓国のチキン体験。グループ食事に大人気。',
'Stir-Fried · Not Fried': '炒め · 揚げでない',

// 네네치킨
'네네 · Founded 1999 · Fun Brand': '네네 · 1999年創業 · ファンブランド',
'One of Korea\'s top 5 chicken chains by outlet count. Known for fun branding, vibrant visual identity, and consistent quality. Famous for 눈꽃치즈치킨 (Snow Cheese Chicken) — a creamy, cheesy powder coating that became a major trend in the 2010s.':
  '店舗数で韓国トップ5のチキンチェーンのひとつ。楽しいブランディング、鮮やかなビジュアルアイデンティティ、安定した品質で知られる。2010年代に大トレンドとなったクリーミーなチーズパウダーコーティングの눈꽃치즈치킨（スノーチーズチキン）で有名。',
'Snow Cheese': 'スノーチーズ',

// 60계치킨
'60계 · 60 Days Marination · Premium Quality': '60계 · 60日間飼育 · プレミアム品質',
'Named for their claim that chickens are raised 60 days — the name signals quality sourcing. Known for using fresher, more carefully sourced chicken than standard chains. Less sweet than competitors, more emphasis on natural chicken flavor. Beloved by purists.':
  'チキンを60日間飼育するという主張からブランド名が由来 — 品質原産地を示す名前。標準的なチェーンより新鮮で丁寧に調達したチキンの使用で知られる。競合より甘みが少なく、自然なチキンの風味を重視。純粋主義者に愛される。',
'60-Day Bird': '60日間飼育',
'Quality-Focused': '品質重視',

// 노란통닭
'노란통닭 · Whole Chicken Style · Retro': '노란통닭 · 丸鶏スタイル · レトロ',
'노란 = yellow. Specializes in whole fried chickens (통닭) with a signature yellow curry-spiced coating. Retro aesthetic and concept — harks back to the 1970s–80s era of Korean roadside chicken shops. The whole chicken format gives a different eating experience.':
  '노란＝黄色。シグネチャーの黄色いカレースパイスコーティングをまとった丸鶏（통닭）専門店。レトロな美学とコンセプト — 1970〜80年代の韓国の路上チキン店を彷彿とさせる。丸鶏形式が異なる食体験を提供する。',
'Whole Chicken': '丸鶏',
'Retro Style': 'レトロスタイル',
'Curry-Spiced': 'カレースパイス',

// 호식이두마리치킨
'호식이두마리치킨 · 2 for 1 Value Brand': '호식이두마리치킨 · 2羽で1羽分の価値ブランド',
'두마리 = two chickens. The core proposition: buy one order, get two whole chickens for approximately the price of one at premium chains. Budget-focused, high-volume brand loved by students, families, and those who need a LOT of chicken. No frills, maximum quantity.':
  '두마리＝チキン2羽。核心の提案：1オーダーでプレミアムチェーンの1羽분의価格で丸鶏2羽分。学생・가족・チキンをたくさん食べたい人に愛される格安・大量志向ブランド。飾りなし、最大の量。',
'2 Chickens': 'チキン2羽',
'Best Value': '最高コスパ',
'Budget King': '格安の王',

// 바른치킨
'바른치킨 · Health-Focused · Air-Fried': '바른치킨 · 健康志向 · エアフライ',
'바른 = right/proper/upright. Positions itself as the "clean eating" chicken choice — uses better quality oil, air-frying methods, and natural seasoning. Less greasy than competitors. Popular with 30–40 year old health-conscious consumers.':
  '바른＝正しい/適切。「クリーンイーティング」チキンの選択肢としてポジション — より良質な油・エアフライ調理法・天然調味料を使用。競合より油っぽくない。健康意識の高い30〜40代に人気。',
'Air-Fried Option': 'エアフライオプション',

// 푸라닭치킨
'푸라닭 · Founded 2006 · Spicy Specialist': '푸라닭 · 2006年創業 · スパイシースペシャリスト',
'Famous for bold, intense flavor profiles — especially their 블랙후추 (Black Pepper) and 불닭갈릭 (Buldak Garlic) flavors. Appeals to adventurous eaters who want more complex seasoning than typical sweet-red-sauce chains. Growing rapidly in 2020s.':
  '大胆で強烈なフレーバープロファイルで有名 — 特에블랙후추（ブラックペッパー）と불닭갈릭（プルダクガーリック）フレーバー。典型的な甘い赤ソースチェーンより複雑な調味料を求める冒険的な食通に訴求。2020年代에急速に成長中。',
'Bold Flavors': '大胆なフレーバー',
```

### Chicken Styles — Section Header

```js
'Korean fried chicken goes far beyond "fried chicken" — the style, sauce, and format vary dramatically between orders. Knowing these terms lets you order exactly what you want.':
  '韓国フライドチキンは「フライドチキン」をはるかに超える — スタイル・ソース・形式がオーダーごとに大きく異なる。これらの用語を知ることで、欲しいものを正確に注文できる。',
```

### Chicken Styles — Cards (10 styles)

```js
// 후라이드치킨
'Classic Fried · No Sauce': 'クラシック揚げ · ソースなし',
'Plain double-fried chicken — no sauce. The purest Korean fried chicken experience. Double-fried (두 번 튀긴) creates a shattering, crackling crust that\'s lighter than American fried chicken. The gold standard for judging a chicken shop\'s oil quality and technique.':
  'ソースなしのプレーンな二度揚げチキン。最も純粋な韓国フライドチキン体験。二度揚げ（두 번 튀긴）がアメリカのフライドチキンより軽いパリパリの衣を生み出す。チキン店の油の品질とテクニックを判断するゴールドスタンダード。',
'Double-Fried': '二度揚げ',

// 양념치킨
'Sweet-Spicy Glazed · Korean Iconic': '甘辛グレーズ · 韓国の代名詞',
'The Korean fried chicken that changed everything — fried chicken tossed in a sweet-spicy gochujang glaze. Sticky, finger-licking, addictive. Often ordered as "반반" (half-and-half) with 후라이드 so you get both styles in one order.':
  '全てを変えた韓国フライドチキン — 甘辛コチュジャングレーズで和えたフライドチキン。ネバネバして手が止まらない中毒性。1オーダーで両方のスタイルを楽しむため후라이드と「반반」（半々）で注문されることが多い。',
'Korean Icon': '韓国の代名詞',

// 간장치킨
'Soy Sauce Glazed · Savory-Sweet': '醤油グレーズ · 甘じょっぱい',
'Soy sauce (간장), garlic, and sugar glaze — savory, slightly sweet, deeply umami. No chili heat. The sophisticated alternative to 양념. Used by premium chains like 교촌 as their flagship style. Often paired with beer for a cleaner-flavored 치맥.':
  '간장（醤油）・ニンニク・砂糖のグレーズ — コクがあり、ほんのり甘く、深いうまみ。唐辛子の辛さなし。양념의洗練された代替として교촌などのプレミアムチェーンが看板スタイルとして使用。よりクリーンな風味의치맥のためによくビールとペアリング。',
'Soy Garlic': 'ソイガーリック',

// 치즈치킨
'Cheese Fondue Dip or Powder': 'チーズフォンデュディップまたはパウダー',
'Either dipped in a cheese fondue, coated in cheese powder (뿌링클 style), or served with a cheese sauce side. The sweet-salty cheese complements the fry perfectly. Korea\'s cheese obsession + chicken obsession combined into one.':
  'チーズフォンデュにつけるか、チーズパウダーをまとわせ（뿌링클スタイル）、またはチーズソースを添えて提供。甘じょっぱいチーズが揚げ物と完璧に補い合う。韓国のチーズ愛＋チキン愛が一つに合体。',

// 허니콤보
'Honey-Glazed · Kyochon Signature': 'ハニーグレーズ · 교촌のシグネチャー',
'Originated at 교촌 — a honey glaze on soy-marinated chicken. Sweet, sticky, caramelized. Now referenced as a style across multiple chains. Pairs perfectly with pickled radish (치킨무). One of the most reordered Korean chicken menus.':
  '교촌で生まれた — 醤油でマリネしたチキンにハニーグレーズ。甘く、ネバネバし、キャラメライズされる。今や複数のチェーンでスタイルとして참照される。치킨무（ピクルス大根）と완벽なペアリング。最も再注문される韓国チキンメニューのひとつ。',
'Sweet': '甘い',
'Honey Glaze': 'ハニーグレーズ',

// 갈릭치킨
'Garlic Cream Sauce · Savory': 'ガーリッククリームソース · コク',
'Roasted garlic cream sauce — rich, savory, aromatic. Became a major trend in the mid-2010s. The thick cream base makes this one of the most indulgent styles. Often combined with cheese for maximum richness. Best eaten fresh, not reheated.':
  'ローストガーリッククリームソース — 濃厚でコクがあり、アロマティック。2010年代中盤に大トレンドに。濃厚なクリームベースがこれを最も贅沢なスタイルのひとつにする。最大의リッチさのためチーズとよく組み合わせる。温め直しより新鮮な状態で食べるのがベスト。',
'Garlic Cream': 'ガーリッククリーム',

// 닭갈비
'Spicy Stir-Fried Chicken Ribs · Chuncheon': '辛口炒め鶏リブ · 춘천',
'Not fried — marinated chicken ribs stir-fried on a flat griddle with gochujang, garlic, rice cakes (떡), and cabbage. A Chuncheon (춘천) regional specialty now loved nationwide. Often ordered communally, cooked at the table. Add 볶음밥 (fried rice) to finish.':
  '揚げでない — コチュジャン・ニンニク・떡（餅）・キャベツと共にフラットグリドルで炒めるマリネした鶏リブ。今は全国で愛される춘천（春川）の地域名物。共同で注문してテーブルで調理することが多い。仕上げに볶음밥（チャーハン）を追加。',
'Stir-Fry': '炒め',
'Chuncheon': '춘천',

// 반반치킨
'Half 후라이드 + Half 양념 · Best Combo': '후라이드半分 + 양념半分 · ベストコンボ',
'반반 = half-half. Split order of plain fried (후라이드) and sweet-spicy glazed (양념) in one box. The most popular way to order chicken in Korea. Always served with 치킨무 (pickled white radish cubes) and sweet-spicy sauce on the side.':
  '반반＝半々。1つの箱にプレーン揚げ（후라이드）と甘辛グレーズ（양념）を半々。韓国で最も人気のチキン注문방法。常に치킨무（白大根のピクルス）と甘辛ソースを添えて提供。',
'Most Ordered Style': '最多注문スタイル',
'Best of Both': '両方のいいとこ取り',

// 로제치킨
'Tomato Cream + Spicy · 2020s Trend': 'トマトクリーム + 辛口 · 2020年代トレンド',
'The rosé pasta trend hit chicken — tomato cream sauce with a subtle chili kick. Pink-orange color, creamy and rich. Swept Korean food delivery apps in 2021–2022. A younger demographic favorite. Less common now but still available at trend-conscious chains.':
  'ロゼパスタのトレンドがチキンに — 微妙な唐辛子の辛さのあるトマトクリームソース。ピンクオレンジ色でクリーミーかつ濃厚。2021〜22年に韓国の배달アプリを席巻。若い層のお気に入り。今は少なくなったがトレンド意識の高いチェーンでまだ入手可能。',

// 매운치킨
'Extra Spicy · Challenge Level': '激辛 · チャレンジレベル',
'Each chain\'s dedicated "extra spicy" version — using ghost pepper, habanero, or concentrated gochugaru extract. 굽네 볼케이노, 교촌 레드콤보, BHC 맛초킹 all fall in this category. Ordered for spice tolerance bragging rights.':
  '각チェーンの「激辛」バージョン — ゴーストペッパー・ハバネロ・または濃縮고추가루エキスを使用。굽네볼케이노・교촌레드콤보・BHC맛초킹すべてこのカテゴリー에属する。辛さへの耐性自慢のために注문される。',
'🌶️🌶️🌶️🌶️ Very Hot': '🌶️🌶️🌶️🌶️ 超激辛',
'Bragging Rights': '자랑の権利',
```

### Chicken Vocabulary Table

```js
'Korean fried chicken': '韓国フライドチキン',
'chicken + beer (치킨 + 맥주)': 'チキン + ビール（치킨 + 맥주）',
'plain fried (from "fried")': '素揚げ（「fried」から）',
'sweet-spicy glazed chicken': '甘辛グレーズチキン',
'soy sauce glazed chicken': '醤油グレーズチキン',
'half-and-half (two styles)': '半々（2スタイル）',
'whole chicken': '丸鶏',
'spicy stir-fried chicken ribs': '辛口炒め鶏リブ',
'pickled radish served with chicken': 'チキンに添えるピクルス大根',
'delivery': '配達',
'Baemin (Korea\'s #1 delivery app)': 'Baemin（韓国의배달アプリNo.1）',
'to double-fry': '二度揚げする',
'crispy, crunchy (texture sound word)': 'サクサク、カリカリ（食感の擬音語）',
'chicken restaurant/shop': 'チキン屋',
'one can of beer': 'ビール1缶',
```

---

## `kbbq.html` — Korean BBQ

### Hero

```js
'Korean BBQ (고기구이) is one of Korea\'s greatest cultural exports — a communal, interactive meal cooked at the table over charcoal (숯불) or gas (가스). Every animal offers multiple distinct cuts, each with its own name, flavor, fat content, and preferred cooking technique. This is your complete guide.':
  '韓国バーベキュー（고기구이）は韓国最大の文화輸出品のひとつ — 炭火（숯불）またはガス（가스）でテーブルで調理する共同でインタラクティブな食事。すべての動物が独自の名前・風味・脂肪含量・好みの調理技術を持つ複数の部位を提供する。これが完全ガイドだ。',

'Charcoal grill (best)': '炭火グリル（最高）',
'Side dishes (free refill)': 'おかず（無料おかわり）',
'Lettuce wrap style': '野菜巻きスタイル',
'Traditional pairing': '伝統的なペアリング',
```

### 쌈 Tip-Box

```js
'쌈 (Ssam) — The Korean BBQ Wrap': '쌈（サム）— 韓国BBQの巻き方',

'쌈 means "wrap" — the Korean BBQ ritual of wrapping grilled meat in a leaf (상추 lettuce, 깻잎 perilla, 취나물 aster greens), adding a smear of 쌈장 (fermented soybean paste), raw garlic, sliced chili, and kimchi. Then fold and eat in one bite. Attempting to bite a 쌈 halfway and leaving it on the plate is considered gauche. One full wrap, one bite.':
  '쌈は「包む」を意味する — 焼いた肉を葉（상추サンチュ・깻잎エゴマ・취나물アスター）に包み、쌈장（발酵された된장ペースト）・生ニンニク・唐辛子のスライス・キムチを加えて折りたたんで一口で食べる韓国BBQの儀式。半分だけかじってお皿に残すのは不作法とされる。一巻き一口で。',
```

### Beef Cuts — Section Header

```js
'Korean beef BBQ (소고기구이) is considered premium dining. 한우 (Korean native beef) commands the highest price — certified by USDA-equivalent 등급 grading. At a top 한우집 (Korean beef house), every cut is its own conversation.':
  '韓国の소고기구이（牛肉バーベキュー）はプレミアムダイニングとされる。한우（韓国재래の牛）はUSDA同等の등급グレーディングで認証され、最高価格を誇る。一流의한우집（韓国牛肉専門店）ではすべての部位が独自の話題になる。',
```

### Beef Cuts — 13 cards

```js
// 살치살
'Beef · Chuck Flap Tail · Premium': '牛肉 · チャックフラップテール · プレミアム',
'One of the most prized cuts in Korean BBQ — taken from the chuck (어깨) area near the rib. Exceptionally fine marbling that creates a buttery, rich, melt-in-mouth experience. The fat renders quickly over high heat. Considered a connoisseur\'s cut.':
  '韓국BBQで最も珍重される부위のひとつ — 갈비（リブ）近くの肩（어깨）部位から取れる。バターのように溶けて濃厚で口でとろける体験を生み出す例外的に細かいマーブリング。高温で지방が素早く溶ける。コニュサーの部位とされる。',
'Top Premium': 'トッププレミアム',
'Heavy Marbling': '濃厚マーブリング',

// 안창살
'Beef · Hanger/Skirt Steak · Intense': '牛肉 · ハンガー/スカートステーキ · 強烈',
'Hanger steak from the diaphragm area — intensely beefy flavor due to its position near the organs. Dark red, coarser grain than 살치살. Has a slight mineral quality that BBQ fans seek out. Pairs perfectly with raw garlic and gochujang.':
  '横隔膜部位のハンガーステーキ — 内臓近くの位置により극めて강烈な牛肉の風味。深い赤色で살치살より粗い繊維。BBQファンが求める微妙なミネラル質。生ニンニクとコチュジャンと완벽なペアリング。',
'Intense Flavor': '강렬なフレーバー',
'Coarse Grain': '粗い繊維',

// 꽃등심
'Beef · Ribeye · 꽃 = Flower (marbling)': '牛肉 · リブアイ · 꽃 = 花（マーブリング）',
'The ribeye — 꽃 (flower) refers to the beautiful marbling pattern that looks like flowers. Rich, flavorful, with even fat distribution. One of the most ordered Korean beef cuts. Best cooked medium-rare over charcoal. The fat blooms beautifully over heat.':
  'リブアイ — 꽃（花）は花のように見える美しいマーブリングパターンを指す。濃厚で風味豊か、均一な脂肪分布。最も注문される韓国牛肉部위のひとつ。炭火でミディアムレアが最適。脂肪が熱で美しく開く。',
'Flower Marbling': '花マーブリング',

// 갈비살
'Beef · Short Rib Meat · Classic BBQ': '牛肉 · ショートリブ肉 · クラシックBBQ',
'Meat from around the short ribs — rich, well-marbled, deeply savory. The basis of 소갈비 (grilled beef ribs). When marinated in soy-sesame-garlic (양념갈비), it becomes one of Korea\'s most beloved BBQ dishes. Available bone-in or boneless.':
  'ショートリブ周辺の肉 — 濃厚でマーブリングよく、深いコク。소갈비（焼き牛リブ）のベース。醤油・ごま・ニンニクでマリネ（양념갈비）すると韓国で最も愛されるBBQ料理のひとつになる。骨付きまたはボーンレスで入手可能。',
'BBQ Classic': 'BBQクラシック',
'Rib Flavor': 'リブの風味',

// 채끝살
'Beef · Sirloin Strip · Lean &amp; Tender': '牛肉 · サーロインストリップ · 赤身で柔らか',
'Sirloin strip — a lean but tender cut that\'s juicy without excessive fat. Less marbled than 꽃등심, preferred by those who want clean beef flavor without richness. Sliced thin for BBQ — quick cook, high heat. Pairs well with simple salt and sesame oil dipping.':
  'サーロインストリップ — 脂肪過多なく柔らかくてジューシーな赤身의부위。꽃등심よりマーブリングが少なく、リッチさなしにクリーンな牛肉の風味を求める人が好む。BBQ用に薄切り — 高温で素早く調理。シンプルな塩とごま油つけで잘어울린다。',
'Leaner Cut': '赤身カット',
'Tender': '柔らか',

// 차돌박이
'Beef · Brisket (Thin-Sliced) · Fat-Forward': '牛肉 · ブリスケット（薄切り）· 脂肪前面',
'Paper-thin shaved brisket with layered fat striping — named for its resemblance to flint stones (차돌). Cooks in seconds on a hot grill. The fat sizzles and crisps at the edges. Dipped in sesame oil-salt or wrapped in perilla leaf. An addictive cycle of eat-wrap-repeat.':
  '층층이줄무늬の지방がある紙のように薄いブリスケット — 火打ち石（차돌）に似ることから命名。熱いグリルで数秒で調理完了。端の脂肪がジュッとカリカリになる。ごま油塩につけるかエゴマの葉に包んで食べる。食べる・巻く・繰り返すの中毒的なサイクル。',
'Brisket': 'ブリスケット',
'Thin-Sliced': '薄切り',

// 업진살
'Beef · Navel/Brisket Point · Rich': '牛肉 · ナベル/ブリスケットポイント · 濃厚',
'From the belly-brisket area — heavily marbled with a rich, unctuous quality. Less common than 차돌박이 but prized by BBQ veterans. The fat content is very high — for those who love intensely fatty beef. Best cooked over charcoal where fat drip creates flavor smoke.':
  'お腹ブリスケット部位から — 濃厚でなめらかな質の강한マーブリング。차돌박이より少なく見られるがBBQ熟練者に重宝される。脂肪含量が非常に高い — 강烈に脂肪豊富な牛肉を愛する人向け。脂肪の滴りが風味のスモークを生み出す炭火調理が최적。',
'Fat-Rich': '脂肪豊富',
'Charcoal Best': '炭火が最適',

// 치마살
'Beef · Flank Steak · 치마 = Skirt': '牛肉 · フランクステーキ · 치마 = スカート',
'치마 means "skirt" — the flank area. Long muscle fibers, lean with good beefy flavor. Coarser texture than premium cuts but very satisfying. Often marinated before grilling to tenderize. A solid mid-price BBQ option with good flavor return.':
  '치마は「スカート」을意味する — フランク部위。長い筋繊維で赤身だが良い牛肉の風味。プレミアム부위より粗い食感だが非常に満足できる。柔らかくするため焼く前によくマリネする。풍미の見返りが良い堅실な中価格帯BBQオプション。',
'Flank': 'フランク',
'Marinate Well': 'よくマリネする',

// 토시살
'Beef · Outside Skirt · Hidden Gem': '牛肉 · アウトサイドスカート · 隠れた名品',
'From the diaphragm\'s outer edge — similar to 안창살 but slightly leaner. Less well-known, often overlooked at restaurants, but delivers excellent beefy intensity at a lower price than premium cuts. A "hidden gem" favored by BBQ insiders. Cook fast over high heat.':
  '横隔膜の외側縁から — 안창살に似ているが若干赤身。덜알려져있지만飲食店では見落とされがちだが、プレミアム부위より低価格で優秀な牛肉の강도を提供する。BBQインサイダーに愛される「隠れた名品」。高温で素早く調理。',
'Hidden Gem': '隠れた名品',
'Value Cut': 'コスパカット',

// 부채살
'Beef · Flat Iron Steak · 부채 = Fan': '牛肉 · フラットアイアンステーキ · 부채 = 扇',
'Named for its fan (부채) shape — the flat iron steak from the chuck shoulder. Fine marbling, tender texture, and excellent flavor. Increasingly popular as Koreans discover Western butchery cuts. Excellent grilled over charcoal. Versatile — good for ssamjang wrap or plain.':
  '扇（부채）の形から命名 — 어깨チャックのフラットアイアンステーキ。細かいマーブリング・柔らかい食感・優秀な風味。韓国人が西洋の精肉カットを発見するにつれ인気上昇中。炭火焼きが抜群。쌈장巻きにもそのままでも使える汎用性。',
'Flat Iron': 'フラットアイアン',
'Well-Marbled': 'マーブリング良好',

// 우삼겹
'Beef · Thin-Sliced Beef Belly · Budget': '牛肉 · 薄切り牛バラ · 格安',
'소고기 삼겹살 — thin-sliced beef belly with layered fat and muscle. The beef equivalent of pork 삼겹살. Much cheaper than premium cuts, widely popular for everyday BBQ outings. Cooks quickly, fat caramelizes nicely. A practical, approachable entry into beef BBQ.':
  '소고기삼겹살 — 층층이の脂肪と筋肉のある薄切り牛バラ。豚삼겹살の牛肉バージョン。プレミアム부위より格段에安く、日常的なBBQ外食에広く人気。素早く調理完了し、脂肪がよくキャラメライズされる。牛肉BBQへの実用的で取り組みやすいエントリー。',
'Budget-Friendly': '格안',
'Layered Fat': '층층이の脂肪',

// 양념소갈비
'Beef · Marinated Beef Short Ribs': '牛肉 · マリネ牛ショートリブ',
'Short ribs marinated in soy sauce, sugar, garlic, sesame, and pear (배) or kiwi for tenderizing. One of the most beloved Korean BBQ dishes — the marinade caramelizes beautifully over charcoal. A staple at birthday celebrations (생일 잔치) and family gatherings.':
  '醤油・砂糖・ニンニク・ごま、そして柔らかくするための배（梨）またはキウイでマリネしたショートリブ。韓国で最も愛されるBBQ料理のひとつ — 炭火でマリネが美しくキャラメライズされる。생일잔치（誕生日パーティー）や家族の集まりの定番。',
'Celebration Food': '祝いの食べ物',
'Sweet-Savory': '甘じょっぱい',

// 한우 1++등급
'Korean Native Beef · Highest Grade': '韓国재래牛 · 최고등급',
'한우 (Korean native cattle) graded at 1++ — the highest beef grade in Korea, equivalent to Wagyu-level marbling. Extremely expensive. The fat is white and evenly distributed throughout the meat. Eating 한우 1++ is a special occasion in Korea — for promotions, anniversaries, or making someone feel truly celebrated.':
  '한우（韓国재래牛）の1++等級 — 和牛レベルのマーブリングに相当する韓国で最も高い牛肉等级。非常に高価。脂肪が白く肉全体에均一に分布している。韓국で한우1++を食べることは昇進・記念日・誰かを心から祝う特別な機会のためのもの。',
'Top Grade': '最高등급',
'Celebration': '祝い',
```

### Pork Cuts — Section Header

```js
'Pork BBQ (돼지고기 구이) is the everyday Korean BBQ — more affordable, less formal, and often paired with soju for a classic evening out. 삼겹살 alone has its own holiday (삼겹살데이, March 3rd = 3/3, pronounced 삼삼).':
  '돼지고기구이（豚肉BBQ）は日常的な韓国BBQ — より手頃で格式張らず、定番の夜のお出かけのためによくソジュとペアリングされる。삼겹살には独自の記念日がある（삼겹살데이、3月3日＝3/3、삼삼と発音）。',
```

### Pork Cuts — 11 cards

```js
// 삼겹살
'Pork · Pork Belly · Korea\'s #1 BBQ': '豚肉 · 豚バラ · 韓国BBQ第1位',
'The undisputed king of Korean BBQ — 삼 (3) 겹 (layers) 살 (meat). Thick strips of pork belly with three alternating layers of fat and muscle. Grilled on a iron grill or charcoal, then cut with scissors, wrapped in lettuce with garlic and 쌈장. Has its own national holiday: 삼겹살데이 (March 3rd).':
  '韓国BBQの논논리的な王 — 삼（3）겹（層）살（肉）。지방と筋肉が交互に3層になった厚めの豚バラストリップ。鉄板または炭火で焼き、ハサミで切って、ニンニクと쌈장を添えたサンチュに巻く。独自の国民記念日あり：삼겹살데이（3月3日）。',
'Korea\'s #1 BBQ': '韓国BBQ第1位',
'삼겹살데이 3/3': '삼겹살데이 3/3',

// 목살
'Pork · Pork Collar/Neck · Second Favorite': '豚肉 · 豚首/カラー · 第2のお気に入り',
'Pork neck/collar — arguably even more popular than 삼겹살 with serious BBQ lovers. Better muscle-to-fat ratio, more complex flavor from multiple muscle groups. Slightly leaner than 삼겹살 but still incredibly juicy. Thicker cut, needs slightly longer cook time.':
  '豚首/カラー — 真剣なBBQ愛好家の間では삼겹살よりさらに人気があると言えるかもしれない。より良い筋肉対脂肪比率、複数の筋肉群からの複雑な風味。삼겹살より若干赤身だが依然として驚くほどジューシー。厚めのカットで少し長い調理時間が必要。',
'Pork King #2': '豚肉BBQ第2位',
'Complex Flavor': '複雑な風味',

// 항정살
'Pork · Pork Jowl · Prized Special Cut': '豚肉 · 豚頬肉 · 珍重される特殊部位',
'Pork cheek/jowl — the muscle below the neck and above the shoulder. Fine-grained texture, beautifully marbled, with a melt-in-mouth quality when properly grilled. Only a small amount per pig, making it a premium "special cut" (특수부위). Highly sought at upscale 삼겹살집.':
  '豚の頬/ジョール — 首の下で肩の上の筋肉。細かい繊維、美しいマーブリング、正しく焼くと口でとろける食感。1頭からわずかしか取れないためプレミアムな「特殊部位」（특수부위）とされる。高級삼겹살집で非常に珍重される。',
'특수부위 Premium': '特殊部位 プレミアム',
'Jowl': '頬肉',

// 가브리살
'Pork · Boston Butt Shoulder · Juicy': '豚肉 · ボストンバット肩 · ジューシー',
'From the Boston butt (shoulder cap) area — intensely marbled, juicy, and slightly chewier than 항정살. The fat runs through the muscle in fine threads, creating incredible moisture when grilled. Less well-known than 삼겹살 or 목살, but considered superior by BBQ specialists.':
  'ボストンバット（肩キャップ）部位から — 강烈なマーブリング・ジューシー・항정살より若干噛みごたえあり。脂肪が細い糸状に筋肉を走り、焼いた時に놀라운水分を生み出す。삼겹살や목살ほど知られていないが、BBQスペシャリストには優れた部位とされる。',
'Shoulder Cap': '肩キャップ',
'Super Juicy': '超ジューシー',

// 갈매기살
'Pork · Outer Diaphragm · 갈매기 = Seagull': '豚肉 · 外横隔膜 · 갈매기 = カモメ',
'The outer diaphragm muscle — named for its shape resembling a seagull (갈매기). Extremely tender despite being a working muscle, with an excellent fat-to-meat ratio. A special cut unavailable at most restaurants. Reserved for places specializing in 특수부위 (special cuts).':
  '外横隔膜の筋肉 — カモメ（갈매기）に似た形から命名。働く筋肉であるにもかかわらず극めて柔らか、優れた脂肪対肉比率。ほとんどのレストランでは入手できない特殊부위。특수부위（特殊部위）専門店でしか食べられない。',
'Diaphragm': '横隔膜',
'Special Cut': '特殊部位',

// 오겹살
'Pork · 5-Layer Belly (with Skin) · Jeju Specialty': '豚肉 · 5層バラ（皮付き）· 済州島名物',
'오 (5) 겹 (layers) 살 — pork belly WITH the skin still attached, giving a 5th layer. The skin becomes incredibly crispy when grilled. A Jeju Island (제주도) specialty where 흑돼지 (black pig) ogyeopsal is a regional pride. The skin crunch is the entire point.':
  '오（5）겹（층）살 — 皮がまだ付いた豚バラで5層目を作る。焼くと皮が驚くほどカリカリに。흑돼지（黒豚）오겹살が地域の誇りである제주도（済州島）の名物。皮のカリカリ感がすべて。',
'Jeju Specialty': '済州島名물',
'With Skin': '皮付き',
'Crispy': 'カリカリ',

// 등갈비
'Pork · Back Ribs · Smoked or Grilled': '豚肉 · バックリブ · スモークまたはグリル',
'Pork back ribs — the Korean equivalent of baby back ribs. Often marinated in soy-garlic or gochujang, then grilled until caramelized. Different from 양념돼지갈비 in that these are cut individually rather than butterflied. Rich and succulent with good pull-from-bone texture.':
  '豚バックリブ — ベイビーバックリブの韓国版。醤油ニンニクまたはコチュジャンでマリネしてキャラメライズされるまで焼くことが多い。バタフライではなく個別にカットされる点で양념돼지갈비とは異なる。濃厚でジューシーな骨からの剥がれやすい食感。',
'Back Ribs': 'バックリブ',
'Grill or Smoke': 'グリルまたはスモーク',

// 양념돼지갈비
'Pork · Marinated Pork Ribs · Sweet-Spicy': '豚肉 · マリネ豚リブ · 甘辛',
'Butterflied pork rib meat marinated in sweet-spicy gochujang sauce. A crowd-pleasing BBQ staple — affordable, flavorful, and accessible. Available everywhere from street stalls to restaurants. The sauce caramelizes beautifully on a hot grill. A perfect entry-level Korean BBQ experience.':
  '甘辛コチュジャンソースでマリネしたバタフライ豚リブ肉。手頃で風味豊か、万人受けするBBQの定番 — 路上屋台からレストランまでどこでも入手可能。熱いグリルでソースが美しくキャラメライズされる。完璧な入門レベルの韓国BBQ体験。',
'Crowd Pleaser': '万人受け',

// 껍데기
'Pork · Pork Skin · Daejeon Specialty': '豚肉 · 豚皮 · 大田名物',
'Pork skin (껍데기 = shell/skin) grilled until shatteringly crispy. A Daejeon (대전) regional specialty — strips of pork skin cooked on a flat griddle until blackened and crunchy, then eaten with scallion salad (파절이) and raw garlic. Textural thrill — absolutely zero meat, pure collagen-fat crunch.':
  '豚皮（껍데기＝殻/皮）がバリバリにカリカリになるまで焼く。大田（대전）の地域名물 — 豚皮ストリップをフラットグリドルで黒くなってカリカリになるまで調理し、パジョリ（파절이）と生ニンニクで食べる。食感のスリル — 肉は完全にゼロ、純粋なコラーゲン脂肪のカリカリ。',
'Daejeon': '大田（대전）',
'Pork Skin': '豚皮',
'All Crunch': '全부カリカリ',

// 흑돼지
'Jeju Black Pig · Premium Pork': '済州黒豚 · プレミアム豚肉',
'Jeju Island\'s famous black pig breed — raised on a diet that historically included fermented grain and roots. The meat is darker, more intensely flavored, and firmer than standard pork. The 흑돼지 삼겹살 and 오겹살 in Jeju are considered among the best pork experiences in Korea.':
  '済州島の有名な黒豚品種 — 歴史的に発酵穀物と根を含む食事で育てられた。標準的な豚肉より色が濃く、강烈に風味豊かで締まっている。済州の흑돼지삼겹살と오겹살는韓국で最高の豚肉体験のひとつとされる。',
'Black Pig': '黒豚',

// 막창
'Pork · Large Intestine · Daegu Specialty': '豚肉 · 大腸 · 大邱名物',
'Pork large intestine — a Daegu (대구) specialty. Thick-walled, chewy intestine cleaned and grilled over charcoal. Served with dipping sauce and scallion salad. An acquired taste for many but beloved by regulars. The texture is uniquely bouncy and substantial. The 막창골목 (Makchang Street) in Daegu is legendary.':
  '豚의大腸 — 大邱（대구）の地域名物。厚い壁のもちもちした腸を洗浄して炭火で焼く。ディップソースとパジョリと共に提供。多くの人に習慣の味だが常連には愛される。食감が独特に弾力있고ボリュームがある。大邱의막창골목（막창通り）は伝説的。',
'Offal': '내장',
'Acquired Taste': '習慣が必要な味',
```

### Chicken Cuts (BBQ) — Section Header

```js
'Chicken (닭고기) at Korean BBQ ranges from charcoal-grilled dakgalbi to specialty cuts like gizzards and skin. Chicken BBQ is popular as bar food (안주) and at 포장마차 street stalls.':
  '韓国BBQの닭고기（鶏肉）は炭火닭갈비から모래집・皮などの特殊部位まで幅広い。チキンBBQはバーの食事（안주）や포장마차（屋台）で人気がある。',
```

### Chicken Cuts (BBQ) — 6 cards

```js
// 숯불닭갈비
'Chicken · Charcoal Chicken Ribs · Chuncheon': '鶏肉 · 炭火鶏リブ · 춘천',
'Charcoal (숯불) grilled version of 닭갈비 — chicken rib meat grilled over live charcoal rather than on a flat griddle. Smokier, more caramelized, with char marks. A Chuncheon (춘천) tradition elevated by charcoal fire. The smoke flavor penetrates the spicy marinade uniquely.':
  '炭火（숯불）焼き版の닭갈비 — フラットグリドルでなく生きた炭火で鶏リブ肉を焼く。よりスモーキーでキャラメライズされ焼き目がつく。炭火で格上げされた춘천（春川）の伝統。スモークの풍미がスパイシーなマリネに独特に浸透する。',
'Charcoal': '炭火',

// 닭목살
'Chicken · Chicken Neck · Unique Texture': '鶏肉 · 鶏首肉 · 独特の食感',
'Chicken neck meat — very small, tender morsels with lots of collagen from the bone structure. Often marinated and grilled on skewers. Gelatinous quality when cooked slowly; firm and juicy when grilled quickly. Popular at 포장마차 street stalls and izakaya-style bars.':
  '鶏の首肉 — 骨の構造からコラーゲンが豊富な非常に小さくて柔らかい一口サイズ。マリネして串に刺して焼くことが多い。ゆっくり調理するとゼラチン質になり、素早く焼くと締まってジューシー。포장마차（屋台）と居酒屋スタイルのバーで人気。',
'Neck Meat': '首肉',
'Bar Food': 'バーの食事',

// 닭특수부위
'Chicken · Special Cuts (Hearts, Gizzards)': '鶏肉 · 특수부위（心臓・砂肝）',
'Chicken special parts (특수부위) — hearts (닭염통), gizzards (닭모래집), liver (닭간), and skin (닭껍질). Each has a different texture and flavor profile. Grilled quickly over high heat. Popular at 호프집 (beer halls) as anju (안주 — food eaten with alcohol).':
  '鶏의특수부위 — 닭염통（心臓）・닭모래집（砂肝）・닭간（肝臓）・닭껍질（皮）。それぞれ異なる食감と風味プロファイル。高温で素早く焼く。호프집（ビアホール）でアンジュ（안주 — お酒と一緒に食べる食事）として人気。',
'Beer Food': 'ビールの食事',

// 닭날개
'Chicken · Chicken Wings · Grilled or Glazed': '鶏肉 · 手羽 · グリルまたはグレーズ',
'Chicken wings — grilled plain or with sauce. Unlike American-style wings, Korean BBQ wings are often marinated in soy-garlic or gochujang before grilling over charcoal, giving a caramelized exterior. Eaten with beer and pickled radish. One of the most casual BBQ experiences.':
  '手羽先 — プレーンまたはソースをつけて焼く。アメリカスタイルの手羽と異なり、韓国BBQの手羽は炭火で焼く前に醤油ニンニクまたはコチュジャンでマリネし、キャラメライズされた외皮に仕上げる。ビールとピクルス大根と共に食べる。最もカジュアルなBBQ体験のひとつ。',
'Wings': '手羽',
'Casual BBQ': 'カジュアルBBQ',

// 닭발
'Chicken · Chicken Feet · Extreme Spicy': '鶏肉 · 鶏足 · 超激辛',
'Chicken feet — braised in an extremely spicy gochujang sauce until the skin is gelatinous and sticky. An acquired taste for foreigners but a beloved late-night snack for Koreans. The eating process is ritualistic: suck the collagen off each tiny bone. A rite of passage in Korean food culture.':
  '鶏足 — 皮がゼラチン状でネバネバになるまで超激辛コチュジャンソースで煮込む。外国人には습관が必要な味だが韓国人には愛されるおつまみ（야식）。食べ方が儀式的：小さな骨一本ずつからコラーゲンを吸い取る。韓国食文화の通過儀礼。',
'Rite of Passage': '通過儀礼',

// 닭껍질
'Chicken · Grilled Chicken Skin · Crispy': '鶏肉 · 焼き鶏皮 · カリカリ',
'Pure chicken skin grilled until the fat renders and the skin becomes crackling-crispy. Extremely indulgent — the rendered chicken fat creates intense flavor. A bar food staple. Seasoned with salt, or marinated in soy-garlic. The Japanese yakitori (야키토리) culture influenced this Korean version.':
  '脂肪が溶けて皮がパリパリのカリカリになるまで焼いた純粋な鶏皮。非常に贅沢 — 溶けた鶏の脂肪が强烈な풍미を生み出す。バーの食事の定番。塩で味付けするか醤油ニンニクでマリネ。日本の焼き鳥（야키토리）文화がこの韓国版에影響を与えた。',
'Chicken Skin': '鶏皮',
```

### Duck Cuts — Section Header

```js
'Duck (오리고기) is a popular BBQ protein in Korea — fattier and more intensely flavored than chicken. Paired with scallion salad (파무침) and doenjang, it creates one of Korean BBQ\'s most satisfying combinations. Often also available smoked (훈제오리) at supermarkets.':
  '鴨（오리고기）는韓国で人気のBBQタンパク質 — 鶏より脂肪が多く강烈に風味豊か。파무침（ねぎサラダ）と된장とペアリングすると韓国BBQ最高の組み合わせのひとつになる。スーパーマーケットでは훈제오리（スモークダック）としても入手可能なことが多い。',
```

### Duck Cuts — 5 cards

```js
// 오리로스
'Duck · Duck Breast · Rich &amp; Gamey': '鴨肉 · 鴨胸肉 · 濃厚でゲーム感',
'Sliced duck breast — the most common duck BBQ cut. Richer and more flavorful than chicken, with a distinctive gamey character that pairs beautifully with scallion salad (파무침). The fat on duck breast crisps dramatically when grilled. Often served with green onion and doenjang dipping sauce.':
  'スライス鴨胸肉 — 最もよく見られる鴨BBQの部위。鶏より濃厚で風味豊か、파무침（ねぎサラダ）と美しくペアリングする独特のジビエキャラクター。鴨胸肉の脂肪は焼くと劇的にカリカリになる。ねぎと된장ディップソースと共に提供されることが多い。',
'Most Common Duck': '最もよく見られる鴨',
'Rich Flavor': '濃厚な風味',

// 오리주물럭
'Duck · Marinated Duck · 주물럭 = Rubbed': '鴨肉 · マリネ鴨 · 주물럭 = こすり込んだ',
'주물럭 means "rubbed by hand" — duck pieces marinated by hand-massaging with soy sauce, garlic, ginger, and sesame. The hand-rubbing technique ensures even coating and better penetration. Grilled over charcoal or stir-fried on a flat grill with onions and peppers.':
  '주물럭は「手でこすり込む」를意味する — 醤油・ニンニク・생강・ごまを手でマッサージするようにマリネした鴨。手こすり技法が均一なコーティングとより良い浸透を保証する。炭火で焼くか玉ねぎとピーマンと共にフラットグリルで炒める。',
'Hand-Marinated': '手マリネ',
'Savory-Spicy': '旨辛',

// 훈제오리
'Duck · Smoked Duck · Ready-to-Eat': '鴨肉 · スモークダック · すぐ食べられる',
'Cold-smoked duck — available pre-cooked at supermarkets and 반찬집 (side dish shops). Sliced thinly and served with scallion sauce. Can be briefly heated on a grill. One of Korea\'s most popular supermarket ready-to-eat proteins. The smokiness complements scallion and sesame beautifully.':
  '冷燻製の鴨肉 — スーパーマーケットと반찬집（おかず専門店）で調理済みで購入可能。薄くスライスしてねぎソースと共に提供。グリルで少し温めることも可能。韓国で最も人気のスーパーマーケットのすぐ食べられるタンパク질のひとつ。燻製감이ねぎとごまと美しくマッチ。',
'Supermarket Staple': 'スーパーの定番',
'Smoked': '燻製',

// 오리한마리
'Duck · Whole Duck Stew · Group Style': '鴨肉 · 丸鴨シチュー · グループスタイル',
'Whole duck (한마리 = one whole bird) slow-cooked in an herbal broth with 한약재 (Korean herbal medicine ingredients). More of a stew experience than BBQ — the duck is cooked until fall-off-the-bone. A communal dish shared by 3–4 people. Considered restorative and healthy.':
  '한약재（韓方薬の食材）の入ったハーブスープでゆっくり煮込んだ丸鴨（한마리＝丸々一羽）。BBQよりシチューの体験に近い — 骨からはらりと落ちるまで鴨を煮込む。3〜4人で共有する共同料理。보양식（滋養食）とされる。',
'Whole Duck': '丸鴨',
'Herbal Stew': 'ハーブシチュー',

// 오리불고기
'Duck · Duck Bulgogi · Sweet-Soy Marinated': '鴨肉 · 鴨불고기 · 甘醤油マリネ',
'The bulgogi treatment applied to duck — thinly sliced duck in a sweet soy-garlic-sesame marinade, then stir-fried or grilled on a flat surface. Less common than beef 불고기 but increasingly popular for its richer flavor profile. Pairs well with perilla leaf and kimchi.':
  '불고기の調理法を鴨に適用 — 甘い醤油ニンニクごまのマリネに漬けた薄切り鴨を炒めるまたはフラットサーフェスで焼く。牛불고기より少なく見られるが、より豊かな風味プロファイルで人기上昇中。エゴマの葉とキムチとよく合う。',
'Bulgogi Style': '불고기スタイル',
'Sweet-Soy': '甘醤油',
```

### Offal & Special Cuts — Section Header

```js
'Korean BBQ culture has a rich offal tradition — nothing is wasted. Each of these cuts has its own specialist restaurants and devoted following.':
  '韓国BBQ文화には豊かな내장（内臓）料理の伝統がある — 無駄にするものは何もない。これらの部위それぞれに専門店と忠실なファン層がある。',
```

### Offal & Special Cuts — 5 cards

```js
// 곱창
'Beef · Small Intestine · Most Popular Offal': '牛肉 · 小腸 · 最も人気の내장',
'Beef small intestine — the most beloved Korean offal. Cleaned thoroughly, then grilled over charcoal until the fat inside renders and the outer wall becomes crispy. Eaten with scallion salad and doenjang. 홍대 (Hongdae) and 마포 (Mapo) in Seoul have entire streets dedicated to 곱창집.':
  '牛の小腸 — 韓国で最も愛される내장料理。完全に洗浄後、内部の지방が溶けて外壁がカリカリになるまで炭火で焼く。파절이と된장と共に食べる。ソウルの홍대（弘大）と마포（麻浦）には곱창집（곱창専門店）が立ち並ぶ거리がある。',
'Most Loved Offal': '最も愛される내장',
'Inner Fat Crispy': '내부脂肪カリカリ',

// 대창
'Beef · Large Intestine · Fat-Rich': '牛肉 · 大腸 · 脂肪豊富',
'Beef large intestine — wider, thicker-walled, and with more interior fat than 곱창. The fat content is extreme — the inside is packed with white marbling. When grilled, the fat melts out and the walls crisp up. An incredibly indulgent offal experience reserved for those who love rich, fatty food.':
  '牛の大腸 — 곱창より幅広く壁が厚く、内部에더많은脂肪がある。脂肪含量は極めて高い — 内部に白いマーブリングが詰まっている。焼くと脂肪が溶け出し、壁がカリカリになる。リッチで脂肪豊かな食べ物を愛する人のための驚くほど贅沢な내장体験。',

// 양
'Beef · Tripe/Stomach · Chewy': '牛肉 · トライプ/胃 · もちもち',
'Beef tripe (stomach) — cleaned and sliced thin, then grilled until it develops a crispy exterior with a chewy, honeycomb interior. The texture is the entire experience — firm, bouncy, and deeply savory. A 곱창집 staple. Often served as a set with 곱창 and 대창.':
  '牛のトライプ（胃） — 清潔にして薄くスライスし、カリカリの外皮とハニカム状のもちもちした内部が生じるまで焼く。食감がすべての体験 — 締まっていて弾力있고深いコク。곱창집の定番。곱창と대창とセットで提供されることが多い。',
'Tripe': 'トライプ',
'Very Chewy': '超もちもち',

// 천엽
'Beef · Book Tripe (Omasum) · Texture King': '牛肉 · 오마스ム（第三胃） · 食감の王',
'The book tripe — multi-layered stomach section. Eaten raw (생 천엽) with sesame oil and salt dipping sauce, or briefly blanched. Uniquely crisp and clean in texture — the many layered folds are distinctive. A raw offal experience that\'s mild in flavor. Considered a delicacy at top offal restaurants.':
  '오마스ム（第三胃） — 多層構造の胃の部分。ごま油塩つけソースで生（생천엽）で食べるか、さっと湯がく。独特にパリパリでクリーンな食감 — 多層のひだが特徴的。風味がまろやかな생内臓体験。최고の내장専門店では珍味とされる。',
'Raw Option': '生で食べる',
'Book Tripe': 'オマスム',

// 염통
'Beef · Heart · Dense &amp; Nutritious': '牛肉 · 心臓 · 密度があり栄養豊富',
'Beef heart — cleaned, sliced thin, and grilled quickly over high heat. Dense, lean muscle with an intense beefy flavor and almost no fat. Nutritionally dense — high protein, iron, zinc. Korean traditional medicine (한의학) considers heart beneficial for 기 (qi) energy. Firm texture, strong flavor.':
  '牛の심장 — 洗浄して薄くスライスし、高温で素早く焼く。ほぼ脂肪なしの강烈な牛肉의풍미를持つ密度のある赤身筋肉。栄養密度が高く — 高タンパク질・鉄分・亜鉛。韓国의한의학（韓方医学）では기（気）エネルギーに良いとされる。締まった食감、強い風味。',
'Heart': '심장',
'High Protein': '高タンパク質',
```

### BBQ Vocabulary Table

```js
'grilled meat (BBQ)': 'グリルした肉（バーベキュー）',
'charcoal fire/charcoal grill': '炭火/炭火グリル',
'leaf wrap for grilled meat': '焼き肉を包む葉',
'fermented soybean paste for wrapping': '包み用の発酵된된장ペースト',
'pork belly (3 layers)': '豚バラ（3層）',
'Korean native beef': '韓国재래牛',
'special/premium cuts': '特殊/プレミアム部위',
'marbling (fat distribution)': 'マーブリング（脂肪분布）',
'to grill': '焼く',
'it\'s well cooked / it\'s done': 'よく焼けた/できた',
'flip it over': 'ひっくり返す',
'cut it with scissors (standard Korean BBQ)': 'ハサミで切る（標準的な韓国BBQ）',
'please change the grill plate': 'グリルプレートを変えてください',
'let\'s have a glass of soju': 'ソジュを一杯飲もう',
'more side dishes please (free refill)': 'おかずをもっとください（無料おかわり）',
```

---

## `kimchi.html` — Kimchi Bible

### Hero

```js
'김치 is not just a dish — it\'s a 2,000-year-old living tradition, a fermentation science, a cultural symbol, and Korea\'s greatest culinary ambassador. With over 200 regional varieties, kimchi appears at every Korean table, every meal, every day. This is the guide to all of them.':
  '김치はただの料理ではない — 2,000年の生きた伝統、発酵の科学、文화의象징、そして韓国最大の料理大使だ。200종류以上の地域별バリエーションがあり、キムチは毎日韓国のすべての食卓に오른다。これがその全ガイドだ。',

'Years of history': '年の歴史',
'Varieties documented': '記録されているバリエーション',
'UNESCO Intangible Heritage': 'ユネスコ無形遺産',
'Per capita per year': '1人당의年間消費量',
```

### 김장 Tip-Box

```js
'김장 (Gimjang) — The Annual Kimchi-Making Tradition': '김장（김장）— 年に一度のキムチ作りの伝統',

'Every November–December, Korean families gather to make 김장 — large batches of kimchi to last through winter. Neighbors and extended family help each other, working all day. UNESCO recognized 김장 as an Intangible Cultural Heritage of Humanity in 2013. It\'s not just food production — it\'s community bonding. The phrase "김장 담그다" (to make kimchi for the season) implies effort, togetherness, and preparation for the hard months ahead.':
  '毎年11〜12月、韓국の家族が集まって김장 — 冬を越すための大量のキムチを作る。近所や親戚が互いに助け合い、一日中作業する。ユネスコは2013年에김장を人類の無形文화遺産として認定した。食料生산だけでなく — コミュニティの絆だ。「김장 담그다」（シーズンのためにキムチを作る）という表現には努力・共同体意識・辛い季節へ의준비가담겨있다。',
```

### By Vegetable — Section Header

```js
'Most vegetables can be made into kimchi — the process (salt-brining, rinsing, seasoning with gochugaru paste, fermenting) is the constant. What changes is the vegetable, the regional recipe, and the fermentation time.':
  'ほとんどの野菜でキムチを作れる — プロセス（塩漬け・水洗い・コチュカルペーストで味付け・発酵）는一定。変わるのは野菜の種류・地域のレシピ・発酵時間だ。',
```

### By Vegetable — 16 varieties

```js
// 배추김치
'Napa Cabbage · THE Classic · 배추 = Napa Cabbage': '白菜 · ザ・クラシック · 배추 = 白菜',
'The world\'s kimchi — napa cabbage salted, rinsed, and packed with a gochugaru-garlic-ginger-fish sauce paste then fermented. The standard against which all kimchi is measured. Eaten fresh (겉절이) or fermented for weeks, months, or even years (묵은지). Never just "kimchi" — always 배추김치 to Koreans.':
  '世界が知るあのキムチ — 白菜を塩漬けにして水洗いし、코추가루・ニンニク・生姜・魚醤のペーストで和えて発酵させる。すべてのキムチが比較される基準。新鮮（겉절이）でも数週間・数ヶ月・時に数年間発酵（묵은지）でも食べる。韓국人には決して単に「キムチ」でなく、常に배추김치。',
'The Original': 'ザ・オリジナル',

// 깍두기
'Korean Radish Cubes · 깍두기 = Cubed': '韓国大根の角切り · 깍두기 = 角切り',
'Daikon radish cut into 2cm cubes, seasoned with gochugaru and fermented. Crisp, crunchy, cooling — a perfect contrast to fatty or rich dishes. The cube shape creates a different fermentation dynamic than leafy kimchi. Classically served alongside 설렁탕 (beef broth soup).':
  '大根を2cmの角切りにし、コチュカルで味付けして発酵させる。パリパリでカリカリ、冷涼感がある — 脂っぽい料理や濃厚な料理との완벽なコントラスト。角切りの形가葉物キムチとは異なる発酵ダイナミクスを生み出す。설렁탕（牛肉スープ）と共에정통에提供される。',
'Crunchy': 'カリカリ',
'Radish Cube': '大根の角切り',

// 총각김치
'Young Bachelor Radish · Whole Small Radish': '총각（ヌータリング）大根 · 丸ごと小型大根',
'Whole small radish (총각무) with the green top attached — the green ponytail resembles a bachelor\'s (총각) traditional topknot hairstyle, hence the name. Spicy, crunchy, and intensely flavored. Both the radish and the greens are eaten. One of Korea\'s most beloved side kimchis.':
  '緑の葉を付けた丸ごとの총각무（小型大根） — 葉のポニーテールが총각（独身男）の伝統的な상투（まげ）に似ていることから命名。辛くてパリパリ、강烈な風味。大根も葉も両方食べる。韓국で最も愛されるサイドキムチのひとつ。',
'Whole Radish': '丸ごと大根',

// 오이소박이
'Stuffed Cucumber Kimchi · 오이 = Cucumber': '詰め物キュウリキムチ · 오이 = キュウリ',
'Cucumber (오이) scored lengthwise and stuffed with a paste of gochugaru, garlic, scallion, and buchu (chives). 소박이 means "stuffed." Light, crisp, and refreshing — ferments much faster than 배추김치 (ready in days, not weeks). A summer specialty loved for its hydrating crunch.':
  'キュウリ（오이）に縦方향로切り込みを入れ、コチュカル・ニンニク・ねぎ・부추（ニラ）のペーストを詰める。소박이는「詰め物」를意味する。軽くてパリパリ、清涼感がある — 배추김치より格段에早く発酵（数週間でなく数日で完成）。みずみずしいカリカリ感で愛される夏の名物。',
'Stuffed': '詰め物',

// 열무김치
'Young Radish Greens · Summer Staple': '熱무（若大根の葉）· 夏の定番',
'Young radish (열무) — the leafy green tops of immature radishes. Lighter and more delicate than 총각김치. Often made as 물김치 (watery broth) style in summer. A classic base for 열무냉면 (cold noodle with young radish kimchi broth). Refreshing and slightly tangy.':
  '어린大根の葉部分열무。총각김치より軽くて繊細。夏には물김치（水キムチ）스타일でよく作る。열무냉면（若大根キムチスープの冷麺）のクラシックなベースだ。清涼感があってほんのり酸っぱい。',

// 갓김치
'Mustard Leaf · 갓 = Mustard Greens · Yeosu': 'からし菜 · 갓 = からし菜 · 여수',
'Mustard greens (갓) with a distinctive peppery, wasabi-like heat from the leaf itself. A Yeosu (여수) and Jeollanam-do (전라남도) specialty. The deep purple/green leaves with their sharp natural heat create a kimchi that\'s fiery in multiple dimensions — gochugaru AND mustard heat combined.':
  'からし菜（갓）固有のピリッとしたわさびのような辛さが葉自体から。여수（麗水）と전라남도（全羅南道）の名物。深い紫/緑の葉のシャープな自然の辛さが、コチュカル의辛さとからし菜의辛さが合わさった複数次元의辛いキムチを生み出す。',
'Yeosu 여수': '여수（麗水）',

// 파김치
'Spring Onion Kimchi · 쪽파 = Spring Onion': 'ねぎキムチ · 쪽파 = 小ねぎ',
'Whole spring onions (쪽파) — not the thick 대파 (large green onion) — seasoned with gochugaru, garlic, fish sauce, and sesame. 쪽파 is thinner, sweeter, and more tender than 대파, making it ideal for kimchi: as it ferments, it softens into silky strands and develops a complex, slightly sweet pungency without the sharp bite of larger onions. A beloved banchan especially in the south (경상도, 전라도). Often eaten alongside 삼겹살 — the two were made for each other.':
  '太い대파（大きいねぎ）ではなく丸ごとの쪽파（小ねぎ） — コチュカル・ニンニク・魚醤・ごまで味付け。쪽파は대파より細くて甘く柔らかく、キムチに理想的：発酵するにつれシルクのような細糸に柔らかくなり、大きいねぎのシャープな辛さなしに複雑でほんのり甘い辛みが生まれる。特에南部（경상도・전라도）で愛されるおかず。삼겹살と一緒によく食べる — この二つは運命의組み合わせだ。',
'BBQ Pairing': 'BBQのペアリング',

// 부추김치
'Chinese Chive Kimchi · 부추 = Chives': '韓国ニラキムチ · 부추 = ニラ',
'Chinese chives (부추) seasoned with gochugaru paste. The chive\'s natural sulfur flavor intensifies with fermentation. Often consumed for its supposed health benefits — traditional medicine claims 부추 strengthens 기 (qi) energy and is particularly good for men. A thinner, lighter kimchi with a grassy pungency.':
  '부추（韓国ニラ）をコチュカルペーストで味付け。ニラ固有の硫黄風味が발酵で강해진다。健康効果のために食べることが多い — 韓方では부추가기（気）를強化し特에男性에좋다とされる。草的な辛みのある細くて軽いキムチ。',
'Health Food': '건강食品',

// 깻잎김치
'Perilla Leaf Kimchi · 깻잎 = Perilla': 'エゴマの葉キムチ · 깻잎 = エゴマの葉',
'Perilla (sesame) leaves layered with a seasoning paste of soy sauce, gochugaru, garlic, and sesame seeds. Each leaf becomes infused with the seasoning. A beloved banchan — the aromatic perilla flavor is unmistakable. Sometimes marinated without fermentation as 깻잎나물 — but the fermented kimchi version is deeply savory.':
  '醤油・コチュカル・ニンニク・ごまの調味ペーストを重ねたエゴマ（ごま）の葉。葉一枚ずつに調味料が染み込む。愛されるおかず — アロマティックなエゴマの풍미が比類なし。時에発酵なしで깻잎나물としてマリネされる — しかし発酵キムチ版は深くてコクがある。',
'Aromatic': 'アロマティック',

// 양배추김치
'Western Cabbage Kimchi · Budget Option': '西洋キャベツキムチ · 格安オプション',
'Regular round cabbage (양배추) kimchi — not napa cabbage. More affordable and widely available year-round. The texture stays firmer longer than napa cabbage. Often made for everyday use when 배추 kimchi is running low. Slightly sweeter and crunchier than traditional baechu-kimchi.':
  '白菜でなく普通의丸いキャベツ（양배추）のキムチ。より安価で年間を通じて広く入手可能。白菜より食감が長く締まり続ける。배추김치가無くなりそうな時の日常使いによく作る。伝統的な배추김치より若干甘くカリカリ。',
'Everyday Use': '日常使い',

// 고들빼기김치
'Wild Chicory Root · Intensely Bitter': '野生チコリの根 · 강렬에苦い',
'Made from wild chicory or hawksbeard (고들빼기) — one of the most intensely bitter kimchis. The bitterness is deliberately preserved and considered a delicacy. A traditional Jeolla Province (전라도) specialty — an acquired taste that regular kimchi lovers find surprisingly addictive. Very rare outside specialty markets.':
  '野生のチコリまたはノゲシ（고들빼기）で作る — 最も강烈に苦いキムチのひとつ。苦みは意図的に保持されて珍味とされる。전라도（全羅道）의전통名物 — 普通のキムチ愛好者가놀랍도록中毒になる習慣が必要な味。専門市场以外では非常に稀。',
'Bitter': '苦い',
'Jeolla 전라도': '전라도（全羅道）',
'Rare': '希少',

// 미나리김치
'Water Parsley Kimchi · 미나리 = Dropwort': '水セリキムチ · 미나리 = 세리',
'Water parsley/dropwort (미나리) — a semi-aquatic herb with a fresh, slightly sharp flavor. Made famous internationally by the film "Minari" (2020). Lightly seasoned kimchi — the herb\'s natural freshness is the highlight. A spring seasonal kimchi, available when 미나리 is at its best.':
  '水세리/セリ（미나리） — 新鮮でほんのりシャープな风味의半水生ハーブ。2020年の映画「미나리（ミナリ）」で국際的に有名になった。軽く味付けされたキムチ — ハーブ固有の新鮮さがハイライト。미나리が最も新鮮な봄에限定の旬のキムチ。',
'Spring Seasonal': '春の旬',
'Film "Minari"': '映画「ミナリ」',

// 콩잎김치
'Soybean Leaf Kimchi · 콩잎 = Soybean Leaf': '大豆の葉キムチ · 콩잎 = 大豆の葉',
'Soybean leaves (콩잎) layered with soy sauce, gochugaru, garlic, and sesame seasoning. The leaves are large, sturdy, and deeply flavored — often eaten by wrapping a piece of rice inside the leaf. A provincial specialty, particularly in the Chungcheong (충청도) region. Earthy and robust.':
  '醤油・コチュカル・ニンニク・ごまの調味料を重ねた大豆の葉（콩잎）。葉가大きく丈夫で深い風味 — 葉にご飯を包んで食べることが多い。충청도（忠清道）地方の地方名物。アーシーでロバスト。',
'Chungcheong': '충청도（忠清道）',

// 두릅김치
'Fatsia / Aralia Shoot · Spring Delicacy': 'タラの芽 / アラリアの芽 · 春の珍味',
'Two릅 (두릅) are the young spring shoots of the aralia/fatsia plant — available only in early spring for a few weeks. Briefly blanched, then seasoned. A luxurious seasonal delicacy with a distinctive woody, forest-like fragrance. Considered one of the finest spring foods in Korean cuisine.':
  '두릅는タラノキ/ウコギ科の若い春の芽 — 早春の数週間しか出回らない。さっと湯がいてから味付け。독特な木的・森의ような香りがある贅沢な旬の珍味。韓국料理で最高の春の食べ物のひとつとされる。',
'Spring Only': '봄限定',
'Seasonal Delicacy': '旬の珍味',

// 씀바귀김치
'Bitter Chicory / Sow Thistle Kimchi': '苦いチコリ/オニタビラコのキムチ',
'씀바귀 (bitter herb) kimchi — another intensely bitter wild herb kimchi. The bitterness signals high polyphenol content. Traditional Korean medicine considers 씀바귀 a 봄나물 (spring herb) that cleanses the body after winter. Bitter-forward, complex — an adult taste that grows on you.':
  '씀바귀（苦い野草）キムチ — もうひとつの강烈에苦い野草キムチ。苦みは高いポリフェノール含量を示す。韓方では씀바귀를冬の後에体を清浄する봄나물（春野草）とみなす。苦み前面、複雑 — 慣れると病みつきになる大人の味。',
'Spring Herb': '春野草',
'Health': '건강',

// 돌나물김치
'Stonecrop / Sedum Kimchi · Spring': '石蓮花（돌나물）キムチ · 봄',
'Stonecrop (돌나물) — a succulent spring herb that grows on rocks (돌 = rock). Crispy, slightly succulent texture with a light, fresh flavor. Often made as 물김치 (watery broth kimchi). A rare spring delicacy found in traditional markets — not commercially produced. Delicate and refreshing.':
  '돌나물（石蓮花） — 石（돌）の上に育つ多肉의봄野草。パリパリしてほんのり多肉質な食感に軽くて新鮮な풍미。物김치（水キムチ）스타일でよく作る。伝統的な市장でしか見つからない希少な봄의珍味 — 市販されていない。繊細で清涼感がある。',
```

### By Fermentation Style — Section Header

```js
'The same vegetable can become completely different kimchi depending on fermentation style — broth-based, fresh-cut, deeply aged, or water-light. These represent kimchi as a spectrum, not a fixed dish.':
  '同じ野菜でも발酵方法によって全く異なるキムチになる — スープベース・新鮮カット・深く숙성・水のように軽い。これらはキムチが固定された料理でなくスペクトラムであることを示す。',
```

### By Fermentation Style — 10 types

```js
// 백김치
'White Kimchi · No Gochugaru · Elegant': '백김치（白キムチ）· コチュカルなし · 優雅',
'백 (white) kimchi — made without gochugaru (red pepper flakes). Seasoned with garlic, ginger, scallion, and sometimes pear or jujube. Pale, clean, refreshing, and mild. Popular with children, elders, and people who cannot eat spicy food. Also served at formal Korean ceremonies and royal court cuisine.':
  '백（白）キムチ — コチュカル（赤唐辛子フレーク）なしで作る。ニンニク・生姜・ねぎ、時に梨やなつめで味付け。淡くてクリーン、清涼感があってマイルド。子ども・老人・辛い食べ物が食べられない人에인기。フォーマルな韓国의儀式や宮廷料理でも供される。',
'No Heat · White': '辛さなし · 白',
'Royal Court Style': '宮廷スタイル',

// 물김치
'Water Kimchi · 물 = Water · Broth-Based': '水キムチ · 물 = 水 · スープベース',
'Vegetables (usually radish or napa cabbage) fermented in a lightly seasoned, mildly spiced broth. Refreshing and cooling — the broth is as valued as the vegetables. Served cold, particularly popular in summer. A gentler alternative to 배추김치. The brine is sometimes used as a digestive drink.':
  '軽く味付けされたマイルドなスープで発酵させた野菜（通常は大根または白菜）。清涼感があって涼しい — スープが野菜と同等に大切にされる。冷たく提供され、特에夏に人気。배추김치のよりやさしい代替。塩水は時に消化ドリンクとして飲まれる。',
'Broth-Based': 'スープベース',

// 동치미
'Winter Radish Water Kimchi · 동 = Winter': '冬の大根水キムチ · 동 = 冬',
'The quintessential winter kimchi — whole or large-cut radish in a cold, clear, lightly salty brine with ginger. 동 means "winter" — made in late fall, consumed through winter. The broth becomes naturally carbonated and refreshingly tart over weeks. Used as the base broth for 동치미냉면 (cold noodle). A Korean culinary treasure.':
  'quintessential（真髄）の冬のキムチ — 생강入りの冷たくてクリアな薄い塩水に丸ごとまたは大ぶりにカットした大根。동は「冬」를意味する — 晩秋に作り冬中食べる。数週間で自然に炭酸感が生まれほんのり酸っぱく清涼感가생긴다。동치미냉면（冷麺）のベーススープとして使用。韓国의料理의보물。',
'Winter Classic': '冬의定番',
'Cold Noodle Base': '冷麺のベース',

// 묵은지
'Aged Kimchi · 1–3 Years Old · Deeply Sour': '숙성キムチ · 1〜3年もの · 深く酸っぱい',
'묵은 = old/aged. Kimchi fermented for 1–3+ years. Deeply sour, complex, and intense — the lactobacillus flavor profile completely transforms the original. Used in cooking: 묵은지 김치찌개 (kimchi stew) and 묵은지 김치찜 (braised kimchi) are considered superior. A probiotic powerhouse.':
  '묵은＝古い/숙성された。1〜3年以上発酵させたキムチ。深く酸っぱく、複雑で강렬 — 乳酸菌のフレーバープロファイルが元のキムチを완전에変える。料理に使用：묵은지김치찌개（キムチチゲ）と묵은지김치찜（브레이즈キムチ）は優れているとされる。プロバイオティクスの宝庫。',
'Aged 1–3 Years': '숙성1〜3年',
'Cooking Kimchi': '料理用キムチ',

// 겉절이
'Fresh Kimchi · Unfermented · Immediate': '新鮮キムチ · 発酵なし · すぐ食べる',
'겉 = outside/surface. Kimchi seasoned and eaten immediately — no fermentation. The freshest possible kimchi experience: bright, crunchy, with raw garlic punch and fresh gochugaru heat. Often made tableside at Korean restaurants. The antithesis of aged kimchi — where 묵은지 is wine, 겉절이 is grape juice.':
  '겉＝外/表面。味付けして即座に食べるキムチ — 発酵なし。最も新鮮なキムチ体験：鮮明でカリカリ、生ニンニクのパンチと新鮮なコチュカルの辛さ。韓国のレストランでテーブルサイドで作られることが多い。숙성키므치の反対 — 묵은지がワインなら、겉절이는葡萄ジュース。',
'No Fermentation': '発酵なし',

// 나박김치
'Thin-Sliced Mixed Kimchi · Water-Based': '薄切りミックスキムチ · 水ベース',
'Thin slices of radish and napa cabbage in a light, spiced broth. 나박 refers to the thin-cutting technique. Pink-tinted from minimal gochugaru. A Royal Court kimchi — traditionally served at the Joseon royal palace. Delicate, clean, and visually elegant. Now widely available at traditional Korean restaurants.':
  '軽くスパイスのきいたスープに入った大根と白菜の薄切り。나박は薄切り技法을指す。最小限のコチュカルでほんのりピンク色。朝鮮王宮으로전통的に提供された宮廷キムチ。繊細でクリーン、視覚的에도優雅。今は伝統韓国レストランで広く入手可能。',
'Royal Court': '宮廷',
'Joseon': '朝鮮（조선）',

// 김장김치
'Winter Kimchi · Annual Batch · Family Event': '冬のキムチ · 年一度の仕込み · 家族イベント',
'The kimchi made during 김장 season (late November) — a full year\'s supply prepared in one massive community effort. Traditionally buried in 독 (earthenware pots) underground to maintain cold temperature through winter. The ultimate form of 배추김치. UNESCO-recognized alongside the making tradition itself.':
  '김장シーズン（11月末）에담근キムチ — 大規模な共同作業で一度に一年分を準備する。伝統的에독（항아리）に入れて冬中冷たさを保つために土中に埋めた。배추김치の극의의形。作る伝統自体と共にユネスコ認定。',
'UNESCO': 'ユネスコ',
'Winter Batch': '冬의仕込み',
'Community': 'コミュニティ',

// 섞박지
'Mixed Kimchi · Multiple Vegetables Together': 'ミックスキムチ · 複数の野菜を一緒に',
'섞 = mixed. A kimchi made from multiple vegetables together — radish, cabbage, cucumber, and green onion all fermented in the same batch. Regional recipes vary widely. The mixed fermentation creates a complex, layered flavor that single-vegetable kimchi cannot achieve. Popular in the Gyeonggi (경기도) region.':
  '섞＝混ぜた。大根・キャベツ・キュウリ・ねぎを一緒に同じバッチで発酵させた複数の野菜のキムチ。地域のレシピが大きく異なる。混合発酵が単一野菜キムチでは得られない複雑で層状의풍미を生み出す。경기도（京畿道）地方で人気。',
'Mixed Vegetables': '複数の野菜',

// 무말랭이김치
'Dried Radish Strip Kimchi · Chewy Texture': '乾燥大根ストリップキムチ · もちもち식감',
'Radish cut into thin strips and sun-dried (말리다 = to dry) before being seasoned and fermented. The drying concentrates the radish flavor and creates an intensely chewy, almost jerky-like texture. Sweet, spicy, and complex — completely different from fresh radish kimchi. A pantry kimchi that keeps for months.':
  '大根を細いストリップに切って天日干し（말리다＝乾かす）してから味付けして発酵。乾燥が大根의풍미를濃縮してジャーキーのような강렬にもちもちした食感を作り出す。甘くて辛くて複雑 — 新鮮な大根키므치와는全く異なる食べ物。数ヶ月保存できるパントリーキムチ。',
'Dried · Chewy': '乾燥 · もちもち',
'Long-Lasting': '長持ち',

// 순무김치
'Turnip Kimchi · Ganghwa Island Specialty': 'カブキムチ · 강화도名物',
'Ganghwa Island (강화도) specialty — made from the local 강화순무 (Ganghwa turnip), a purple-skinned vegetable with a distinctive earthy sweetness. The kimchi ferments to a deep magenta-purple color, dramatically beautiful. A regional heritage variety with a flavor profile unlike any other Korean kimchi.':
  '강화도（江華島）の名物 — 독特なアーシーな甘みのある紫色의강화순무（江華カブ）で作る。発酵すると深いマゼンタ紫色になり視覚的に圧倒的에美しい。他のどの韓国キムチとも異なる풍미プロファイルを持つ地域の伝統品種。',
'Ganghwa 강화도': '강화도（江華島）',
'Purple Color': '紫색',
```

### Kimchi in Cooking — Section Header

```js
'Kimchi is not only eaten as a side dish — it\'s a fundamental cooking ingredient, transforming other dishes with its fermented acidity, umami, and spice.':
  'キムチはおかずとして食べるだけでなく — 발酵された酸味・うまみ・辛さで他の料理を変える根本的な調理食材だ。',
```

### Kimchi in Cooking — 17 dishes

```js
// 돼지고기김치찌개
'Pork Kimchi Stew · The Original · Korea\'s Most Eaten': '豚肉キムチチゲ · 元祖 · 韓国で最も食べられる',
'The canonical kimchi-jjigae — pork belly or shoulder simmered with aged kimchi (묵은지), tofu, and anchovy broth in an earthenware 뚝배기. The pork fat enriches the kimchi broth into something far greater than the sum of its parts. Best made with kimchi fermented at least 2 months. Korea\'s most frequently eaten home-cooked dish — a permanent fixture on every 한정식 (set meal) and restaurant menu nationwide.':
  '正統のキムチチゲ — 三枚肉または肩ロースを묵은지・豆腐・いりこだしと뚝배기（土鍋）で煮込む。豚肉의脂肪がキムチスープを材料の合計をはるかに超えるものに豊かにする。最低2ヶ月発酵したキムチで作るのが最高。韓国で最も頻繁에食べられる家庭料理 — 全국の한정식（定食）とレストランメニューに必ず掲載される。',
'Korea\'s Most Eaten': '韓国最多消費',
'묵은지 Preferred': '묵은지推奨',

// 참치김치찌개
'Canned Tuna Kimchi Stew · Pantry Version': '缶詰ツナキムチチゲ · パントリー版',
'Canned tuna (참치 통조림) replaces pork — the most pantry-friendly kimchi-jjigae. Pour the tuna\'s oil directly into the pot: it adds a marine richness that surprisingly complements kimchi\'s fermented acidity. Faster than the 돼지고기 version, no prep required beyond opening a can. The go-to for Korean military bases (군대), dormitories, and solo apartments worldwide. The 동원 chamchi can was practically designed for this purpose.':
  '缶詰ツナ（참치통조림）が豚肉に代わる — 最もパントリーフレンドリーなキムチチゲ。ツナの油をそのまま鍋に注ぐ：驚くほどキムチ의発酵酸味を補う海の濃厚さが加わる。돼지고기版より早く、缶を開ける以外に準備不要。世界中의韓국군대（軍部隊）・寮・一人暮らしのアパートの定番。동원의참치缶は事실上이목적のために設計された。',
'Canned Tuna': '缶詰ツナ',
'Pantry-Friendly': 'パントリーフレンドリー',

// 꽁치김치찌개
'Pacific Saury Kimchi Stew · 묵은지 Magic': '太刀魚キムチチゲ · 묵은지の魔法',
'Canned Pacific saury (꽁치 통조림) in kimchi stew — the boldest, most intensely flavored of the three variants. 꽁치 is an oily, pungent fish whose strong maritime character can overwhelm if paired incorrectly. This is where 묵은지 earns its magic: the deep aged sourness cuts directly through the fish oil and smell, transforming the combination into a complex, umami-layered stew that neither ingredient could achieve alone. Using fresh kimchi here produces a flat, fishy result — 묵은지 is absolutely non-negotiable.':
  '缶詰サンマ（꽁치통조림）のキムチチゲ — 3種中最も大胆で강烈に風味豊か。꽁치은油っぽくて풍미강한魚で、ペアリングを間違えると压倒的になる。まさにここで묵은지が魔法を발揮する：深く熟成된酸味が魚の油臭さを正面からカットし、どちらの食材単独では到底実現できない複雑でうまみが層をなすチゲに변える。ここで新鮮なキムチを使うと平板で생선臭い結果になる — 묵은지는절대에必須。',
'묵은지 Only': '묵은지のみ',
'Canned Saury': '缶詰サンマ',

// 김치볶음밥
'Kimchi Fried Rice · 1-Pan Comfort': 'キムチチャーハン · 一鍋コンフォート',
'Leftover rice stir-fried with chopped kimchi, sesame oil, and pork belly or SPAM. Topped with a fried egg. The simplest, most satisfying Korean meal — ready in 5 minutes. The kimchi must be aged (익은 김치) to develop the deep, savory, caramelized flavor. A cultural staple of Korean bachelor living.':
  '残りご飯を刻んだキムチ・ごま油・삼겹살またはスパムと炒める。目玉焼きをトッピング。5분で完成する最もシンプルで満足できる韓国料理。キムチは익은김치（熟成）でないと深くてコクのあるキャラメライズされた풍미が出ない。韓国의一人暮らし文화의定番。',
'5-Minute Meal': '5分料理',

// 김치전
'Kimchi Pancake · Rainy Day Food': 'キムチのチヂミ · 雨の日の食べ物',
'Kimchi mixed into a flour batter and pan-fried into a thick, crispy-edged savory pancake. The most iconic "rainy day food" (비 오는 날 음식) in Korea — on rainy days, Korean food delivery apps are flooded with 전 orders. Served with a soy-vinegar dipping sauce. Best eaten fresh off the pan, sizzling hot.':
  'キムチを小麦粉の衣に混ぜてパリパリの縁のある厚いセイボリーパンケーキに焼く。韓국で最もアイコニックな「雨の日의食べ物」（비오는날음식） — 雨の日は韓国의배달アプリに전の注문가폭주する。醤油酢のディップソースと共に提供。フライパンから出来立てのジュージューと음을때が最高。',
'Rainy Day Food': '雨の日の食べ물',

// 김치찜
'Braised Kimchi with Pork · Celebration Dish': '豚肉煮込みキムチ · 祝い料理',
'Aged kimchi slowly braised with thick pork belly until both the kimchi and the pork become meltingly tender. Unlike 김치찌개 (quick simmer), 김치찜 requires hours of low cooking — the kimchi loses its raw acidity and develops a sweet, concentrated, jammy depth. Often served at Korean celebrations.':
  '묵은지と厚めの삼겹살을数時間저온でゆっくり煮込む。김치찌개（素早く煮る）と异なり김치찜는長時間의저온调理が必要 — キムチの生の酸味가消えて甘く濃縮された깊이が生まれる。韓国의경사스러운자리에자주提供される。',
'Slow-Braised': 'ゆっくり煮込む',

// 김치라면
'Kimchi-enhanced Instant Noodle': 'キムチ강화インスタント麺',
'Adding kimchi to instant ramyeon — one of Korea\'s universal hacks. The kimchi acidity brightens the broth, adds fermented depth, and creates an entirely different eating experience. Koreans who find regular ramyeon too simple almost always add kimchi. With aged kimchi, the result is significantly more complex than anything in a packet.':
  'インスタントラーメンにキムチを加える — 韓国の普遍的なハック。キムチの酸味がスープを明るくし、発酵의깊이を加えて全く異なる食체험を生み出す。普通のラーメンがシンプルすぎると感じる韓국人는거의常にキムチを追加する。묵은지で作ると봉지라면の何倍も複雑な結果になる。',
'Universal Hack': '普遍的なハック',

// 김치타코
'Korean-Mexican Fusion · Roy Choi · LA': '韓国-メキシコフュージョン · ロイ・チョイ · LA',
'The dish that started the Korean-Mexican food truck revolution in Los Angeles — Roy Choi\'s 코기 BBQ food truck (2008) put Korean short rib beef with kimchi slaw in a Mexican tortilla. Became a global food trend. Now symbolic of Korean food\'s adaptability and its role in the American culinary conversation.':
  'ロサンゼルスで韓国-メキシコフュージョンフードトラック革命を起こした料理 — ロイ・チョイの코기BBQフードトラック（2008年）が韓国のカルビ牛肉とキムチスローをメキシコのトルティーヤに入れた。グローバルな食のトレンドになった。今や韓国食의適応性와미국の料理の会話の中での役割의象징。',
'Fusion Revolution': 'フュージョン革命',
'LA Food Truck': 'LAフードトラック',

// 김치말이국수
'Cold Kimchi Brine Noodles · Summer Dish': 'キムチ塩水の冷たい麺 · 夏料理',
'Thin somyeon (소면) noodles served in ice-cold 물김치 brine or diluted kimchi liquid. 말이 means "rolled into" — the noodles are twirled into the chilled kimchi broth. Crunchy cucumber slices, radish, and a halved hard-boiled egg alongside. The kimchi brine acts as the soup base: tangy, lightly spicy, and deeply refreshing. A summer cooling dish with zero cooking required beyond boiling the noodles — the brine does all the flavor work.':
  '氷のように냉たい물김치の塩水または希釈したキムチ液に入った細い소면（素麺）。말이는「말아넣다」를意味する — 麺を冷たいキムチスープにくるりと入れる。カリカリのキュウリスライス・大根・半分に切った固茹で卵を添える。キムチの塩水がスープベースとして機能：酸っぱくてほんのり辛くて깊이清涼感がある。麺を茹でる以外に料理ゼロの夏の冷却料理 — 塩水がすべての풍미をこなす。',
'Mild-Tangy': '弱酸',
'Cold Noodle': '냉たい麺',

// 볶음김치
'Stir-Fried Kimchi · The Universal Banchan': '炒めキムチ · 万能おかず',
'Overly sour kimchi — too acidic to eat raw — sliced and stir-fried in sesame oil with pork belly strips, a pinch of sugar, and sesame seeds until caramelized and glossy. Heat transforms fermented acidity into something sweet, jammy, and deeply savory. The ultimate banchan for any meal: goes with rice, noodles, tofu, grilled meat. Every Korean household makes this when kimchi crosses the line into "too old to eat as-is." Also the base layer for 김치볶음밥.':
  'そのまま食べるには酸っぱすぎるキムチを스라이스してごま油・삼겹살スライス・砂糖少量・ごまでキャラメライズされてつやが出るまで炒める。熱が발酵の酸味を甘くてjam状の深いコクに変える。どんな料理にも合う究극のおかず：ご飯・麺・豆腐・焼き肉に。すべての韓국家庭がキムチが「そのまま食べるには古すぎる」ラインを越えた時에作る。김치볶음밥のベースレイヤーにもなる。',
'Caramelized': 'キャラメライズ',
'Universal Banchan': '万能おかず',

// 두부김치
'Tofu & Stir-Fried Kimchi · Classic Bar Food': '豆腐と炒めキムチ · クラシックバーフード',
'Cool sliced soft tofu (두부) plated alongside hot, glistening 볶음김치. The temperature and texture contrast is the entire dish: cold-creamy tofu meets hot-spicy-caramelized kimchi. An iconic Korean bar food (안주) — the go-to at 호프집 (beer pubs) and 막걸리 bars. Simple to prepare, endlessly satisfying. Sometimes the tofu is briefly pan-fried for a crisp outside, producing a different texture contrast. The pairing works because tofu\'s mild neutrality makes the kimchi\'s flavor pop harder.':
  '냉たく스라이스した柔らかい두부（豆腐）を열い輝く볶음키므치와함께盛り付ける。温度と食감のコントラストがこの料理のすべて：冷たくクリーミーな豆腐が熱く辛くキャラメライズされたキムチに出会う。アイコニックな韓국の바푸드（안주） — 호프집（ビアパブ）と막걸리バーの定番。準備が簡単で飽きのこない満足感。時에豆腐를さっとフライパンで焼いてカリカリの外皮を作り異なる食感コントラストを生み出す。豆腐의마일드な中립性がキムチの풍미をより引き立てるためペアリングが機能する。',
'Bar Food 안주': 'バーフード안주',
'Tofu Contrast': '豆腐のコントラスト',

// 김치콩나물국
'Kimchi & Bean Sprout Soup · Hangover Cure': 'キムチと豆モヤシのスープ · 二日酔い解消',
'Soybean sprouts (콩나물) simmered briefly with kimchi, anchovy broth, garlic, and green onion into a clean, pungent soup. The sprouts contribute a crisp snap and a light bean sweetness; the kimchi provides fermented acid and spice. Famous as one of Korea\'s most effective 해장국 (hangover soups) — the amino acids from 콩나물 and the probiotics from kimchi are considered genuinely restorative. Ready in under 15 minutes. A regular weekday breakfast soup in Korean homes.':
  '콩나물（豆モヤシ）をキムチ・いりこだし・ニンニク・ねぎで短時間煮込んだクリーンで刺激的なスープ。モヤシがパリパリした食感と軽い豆の甘さを提供；キムチが発酵의酸味와辛さを提供する。韓국최고의해장국（二日酔い解消スープ）のひとつとして有名 — 콩나물のアミノ酸とキムチのプロバイオティクスが本当에滋養になるとされる。15分以内に완성。韓국家庭の平日の朝食スープの定番。',
'해장국 Hangover Cure': '해장국（二日酔い解消）',
'15-Min': '15分',

// 묵은지참치김밥
'Aged Kimchi & Tuna Gimbap · Bold Roll': '숙성キムチとツナのキンパ · 大胆な巻き物',
'Gimbap rolled with aged kimchi (묵은지) and canned tuna mayo — assertive, intensely flavored, and not for the timid. The 묵은지 must be squeezed completely dry before rolling; residual moisture makes the seaweed go limp and the rice fall apart. The deep sourness of aged kimchi against tuna\'s richness creates a complex rice roll with layers of umami. A specialty at upscale gimbap shops (분식집) — a natural evolution of the classic chamchi-gimbap for kimchi connoisseurs.':
  '묵은지（숙성キムチ）と缶詰ツナマヨで巻いたキンパ — 주장이강하고강렬에風味豊かで気弱な人向けではない。묵은지는巻く前に完全に水気を絞り切る必要がある；残った水分が海苔をふにゃふにゃにしてご飯をバラバラにする。숙성キムチの深い酸味とツナの濃厚さが複雑なうまみの층を持つご飯ロールを生み出す。キムチのコニュサー向けの高級분식집のスペシャリティ — クラシックなツナキンパの자然な進化形。',
'묵은지 Bold': '묵은지大胆',
'Gimbap Specialty': 'キンパスペシャリティ',

// 묵은지등갈비찜
'Aged Kimchi Pork Spare Ribs Braise · Special Occasion': '숙성キムチ豚スペアリブ煮込み · 特別な機会',
'Pork spare ribs (등갈비) slowly braised with aged kimchi (묵은지) for 2–3 hours. More spectacular than 김치찜 with pork belly — the rib bones release marrow and collagen into the braise, building a glossy, deeply savory sauce that coats every surface. The 묵은지\'s sourness fully dissolves into the braise over time, leaving only concentrated sweetness and umami. A dish that demands effort but rewards with restaurant-depth flavor. Commonly served at Korean family gatherings and milestone celebrations.':
  '돼지등갈비を묵은지と共に2〜3時간걸려ゆっくり煮込む。三枚肉의김치찜より스펙터클 — リブの骨が骨髄とコラーゲンを煮込み汁에放出し、全体をコートする光沢のある深いコクのソースを作る。묵은지의酸味は時間と共에煮込み汁に완전에溶け込み、濃縮された甘さとうまみだけが残る。努力을요구するが레스토랑レベルの風味で報われる料理。韓国의家族の集まりや重要な祝い事によく提供される。',
'묵은지 Only': '묵은지のみ',  // duplicate key — already listed; use same translation
'Special Occasion': '特別な機会',

// 김치만두 (kimchi in cooking context)
'Kimchi Dumplings · The Classic Filling': 'キムチ餃子 · クラシックな具材',
'Ground pork mixed with kimchi, tofu, glass noodles (당면), garlic, and sesame oil — one of Korea\'s most beloved dumpling fillings. The kimchi must be squeezed completely dry before mixing; moisture destroys the wrapper and causes splitting during cooking. Can be steamed (찐만두), boiled (물만두), pan-fried (군만두), or deep-fried (튀김만두) — each method produces a different texture. During cooking the kimchi filling mellows and sweetens, losing rawness and gaining depth. A staple at every Korean 분식집 and 만두 shop.':
  '挽き豚肉にキムチ・豆腐・당면（春雨）・ニンニク・ごま油を混ぜた — 韓국で最も愛される餃子の具材のひとつ。キムチは混ぜる前に完全に水気を絞る必要がある；水分が皮를壊して調理中に割れる原因になる。찐만두・물만두・군만두・튀김만두 — 各方法가異なる食感を生み出す。調理中にキムチの具材が柔らかく甘くなり、生の風味が消えて깊이가生まれる。すべての韓국분식집와만두店의定番。',
'Classic Filling': 'クラシックな具材',
'4 Ways to Cook': '4種類の調理法',

// 김치국밥
'Kimchi Rice Soup · Busan/Gyeongsang Regional · Working-Class Classic': 'キムチご飯スープ · 釜山/慶尚道의地方料理 · 庶民の定番',
'Hot cooked rice poured directly into kimchi broth — or a full kimchi-jjigae base with meat and tofu — creating a thick, warming rice soup. 갱시기죽 is the Busan and Gyeongsang Province (경상도) dialect name: a deeply regional dish carrying the identity of Korea\'s southeast. Born from necessity — yesterday\'s kimchi stew + leftover rice = today\'s breakfast, nothing wasted. Some versions use plain kimchi broth for a lighter result; others are a full 찌개 with rice dissolved in. Simple, sour, intensely warming.':
  'キムチスープまたは肉と豆腐の入ったキムチチゲベースに温かいご飯을直接入れた濃くて温まるご飯スープ。갱시기죽は釜山と경상도（慶尚道）의방言名：韓국東南部의アイデンティティを담은깊이地域の料理。必然から생まれた — 昨日のキムチチゲ＋残りご飯＝今日の朝食、無駄なし。シンプルで酸っぱく강烈に温まる。',
'Busan 부산': '부산（釜山）',
'Regional Dialect': '地域方言',

// 김치나베
'Kimchi Hot Pot · Korean-Japanese Fusion · Table Cooking': 'キムチ鍋 · 韓日フュージョン · テーブル調理',
'Japanese-style communal hot pot (나베 / 鍋) with kimchi as the broth base. A kimchi-gochugaru broth simmers at the table in a wide, shallow pot; diners add tofu, mushrooms (표고버섯, 팽이버섯), pork slices, glass noodles, and vegetables gradually — eating as ingredients cook. Lighter and more refined than 김치찌개 — the kimchi flavor is present throughout but never dominates. A fixture in Korean-Japanese fusion restaurants across Seoul and Tokyo. The grand finale: cook 죽 (porridge) or 볶음밥 (fried rice) in the remaining broth.':
  'キムチをスープベースにした日本式의공동鍋（나베/鍋）料理。広くて浅い鍋でキムチ・コチュカルスープをテーブルで煮込みながら豆腐・표고버섯・팽이버섯・豚肉스라이스・春雨・野菜를순서에加えて食べる。김치찌개より軽くて洗練 — キムチの풍미が全体に存在するが決して압倒的にならない。ソウルと東京の韓日フュージョンレストランで定番。그랜드피날레：残ったスープで죽（お粥）または볶음밥（チャーハン）を作る。',
'Table Cooking': 'テーブル調理',
'Korean-Japanese': '韓日',
```

### Kimchi Vocabulary Table

```js
'fermented vegetable (general term)': '発酵野菜（総称）',
'annual winter kimchi-making tradition': '年一度の冬のキムチ作りの伝統',
'Korean red pepper flakes (key ingredient)': '韓국의赤唐辛子フレーク（主要食材）',
'salted fermented seafood (for umami)': '塩辛（うまみのため）',
'fish sauce (used in kimchi seasoning)': '魚醤（キムチの調味に使用）',
'to ferment / to ripen': '発酵する / 熟れる',
'to age (as in aged kimchi)': '숙성する（숙성キムチのように）',
'fresh, unfermented kimchi': '新鮮な発酵なしキムチ',
'aged kimchi (1+ years)': '숙성キムチ（1年以上）',
'napa cabbage': '白菜',
'to salt-brine (first step of kimchi-making)': '塩漬けにする（キムチ作りの第一ステップ）',
'lactobacillus / probiotic bacteria': '乳酸菌 / プロバイオティクス菌',
'kimchi refrigerator (dedicated appliance)': 'キムチ専用冷蔵庫',
'side dishes (kimchi is always one)': 'おかず（キムチは常にその一つ）',
'kimchi stew (most common kimchi dish)': 'キムチチゲ（最も一般的なキムチ料理）',
```

### Kimchi Refrigerator Info-Box

```js
'The Kimchi Refrigerator (김치냉장고)': 'キムチ専용冷蔵庫（김치냉장고）',

'Korean homes have a dedicated 김치냉장고 — a separate refrigerator maintained at a specific temperature (around 0°C) to slow-ferment kimchi optimally. The most popular brand is 딤채 (Dimchae) by Winia. Owning a 김치냉장고 is a standard household item, like owning a regular refrigerator in the West. Without one, the kimchi in the regular fridge can ferment too fast. This is why Korean household appliance culture developed around kimchi long before it developed around wine.':
  '韓국の家庭には専用의김치냉장고がある — キムチを最適にゆっくり발酵させるために특정温度（約0°C）에維持する別의冷蔵庫。最も人気のブランドは위니아의딤채（Dimchae）。김치냉장고를所有することは西洋で普通의冷蔵庫を持つのと同じ標準的な家庭用品だ。ないと普通의冷蔵庫のキムチが速く発酵しすぎる。これが韓국の家庭용전자제품文化がワインよりずっと前にキムチを중심으로発展した理유다。',
```

---

## Implementation Steps

### Step 1 — Open `js/lang-ja.js`
Find the `JA = {` dictionary inside `LangManager`. Add all entries from this guide inside that object.

### Step 2 — Work file by file
Add all entries for one page at a time. After each batch, do a quick browser check before moving on.

### Step 3 — Key matching rules
- The key is the **trimmed, whitespace-normalized** text node content
- For text nodes split by `<strong>`, `<b>`, or `<span>` child elements: each text fragment before/after the child element is a **separate** key
- For `.tip-text` divs that also contain a `.kr-trans` child: the key is the text node content **before** the `.kr-trans` div starts (trim trailing whitespace)

### Step 4 — Do NOT re-add keys already in `japanese-version-guide.md`
Cross-check before adding. Duplicate keys cause no errors but waste space.

---

## Verification Checklist (per page)

- [ ] Page `<title>` tag translates (note: `<title>` text nodes follow the same LangManager rules)
- [ ] Hero paragraph translates
- [ ] All `food-stat-label` elements translate
- [ ] Tip-box and info-box labels + body text translate
- [ ] All brand/section category headers translate
- [ ] All `food-card-meta` lines translate
- [ ] All `food-card-desc` paragraphs translate
- [ ] All `food-tag` labels translate
- [ ] Vocab table English column (`eng-cell`) translates
- [ ] Korean Hangul in card names is unchanged
- [ ] All `.kr-trans` div content is unchanged
- [ ] Korean words embedded in English sentences are unchanged
- [ ] Numbers and stats are unchanged
- [ ] Romanisation column in vocab tables is unchanged
