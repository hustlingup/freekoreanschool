'use strict';
(function() {
  const JA = {
    'Learn': '学ぶ', 'Quiz': 'クイズ', 'K-Culture': 'K-カルチャー', 'Travel': '旅行', 'News': 'ニュース',
    'Search...': '検索...', 'Search lessons, vocabulary…': 'レッスン・語彙を検索…',
    '🇰🇷 · Free · For Every Level': '🇰🇷 · 無料 · すべてのレベル対応',
    'Learn Korean': '韓国語を学ぼう', 'Start Learning': '学習を始める', 'Explore K-Culture': 'K-カルチャーを探る',
    'Vocabulary Words': '語彙数', 'Lessons': 'レッスン数', 'Active Learners': '学習者数', '% Free': '% 無料',
    'FEATURES': '機能', 'Everything You Need to Learn Korean': '韓国語学習に必要なすべて',
    'Start with 한글': 'ハングルから始めよう', 'Learn Hangul Now →': '今すぐハングルを学ぶ →',
    'Hear It': '音を聞く', 'More Words': 'もっと見る', 'Word of the Day': '今日の単語',
    'STRUCTURED PATHS · 학습 경로': '体系的な学習パス · 학습 경로',
    'Choose Your Learning Path': '学習パスを選択',
    'Beginner': '初級', 'Intermediate': '中級', 'Advanced': '上級',
    'Start Beginner Path →': '初級パスを始める →', 'Start Intermediate Path →': '中級パスを始める →',
    'Start Advanced Path →': '上級パスを始める →', 'POPULAR': '人気',
    'Beginner–Intermediate': '初級〜中級', 'Intermediate–Advanced': '中級〜上級',
    'Beg–Int': '初中級',
    'K-CULTURE': 'K-カルチャー', 'K-CULTURE · 한국 문화': 'K-カルチャー · 한국 문화',
    'Experience Korea Beyond Language': '言語を超えて韓国を体験',
    'Explore All K-Culture Content →': 'K-カルチャーをすべて見る →',
    'TRAVEL · 여행': '旅行 · 여행', 'Explore Korea': '韓国を探索',
    'View Full Travel Guide →': '旅行ガイドを全て見る →',
    'PRACTICE · 연습': '練習 · 연습',
    '10 progressive levels · multiple choice · covers Hangul, Grammar & Vocabulary': '10段階のレベル · 多肢選択式 · ハングル・文法・語彙を網羅',
    'Choose a Level': 'レベルを選んでください', 'questions': '問',
    '← All Levels': '← レベル一覧', 'Try Again': 'もう一度',
    'Next Level': '次のレベル', 'All Levels': '全レベル', 'Next Level →': '次のレベル →',
    '🇰🇷 · South Korea Travel Guide · 여행 안내': '🇰🇷 · 韓国旅行ガイド · 여행 안내',
    'South Korea Travel Guide': '韓国旅行ガイド',
    'Population': '人口', 'UNESCO Sites': 'ユネスコ遺産', 'Great to visit': '訪問に最適', 'Visa-free nations': 'ビザ免除国',
    'EXPLORE THE GUIDES · 가이드 탐색': 'ガイドを探索 · 가이드 탐색',
    'Plan Your Perfect Korea Trip': '完璧な韓国旅行を計画しよう',
    'TOP DESTINATIONS · 인기 여행지': '人気の旅行先 · 인기 여행지', 'Where Will You Explore?': 'どこを探索しますか？',
    'ESSENTIAL PHRASES · 필수 표현': '必須フレーズ · 필수 표현', 'Travel Korean Phrasebook': '旅行韓国語フレーズブック',
    'TRANSPORTATION · 교통': '交通 · 교통', 'Getting Around Korea': '韓国の交通手段',
    'FOOD TOUR · 음식 여행': 'グルメツアー · 음식 여행', 'Regional Korean Specialties': '地域別韓国料理',
    'CULTURAL ETIQUETTE · 예절': '文化的エチケット · 예절', 'Korean Cultural Tips': '韓国文化のヒント',
    'TRAVEL APPS · 여행 앱': '旅行アプリ · 여행 앱', 'Essential Apps for Korea Travel': '韓国旅行に必須のアプリ',
    'READY TO LEARN?': '学習を始めましょう！', 'Start Speaking Korean Today': '今日から韓国語を話そう',
    'Start Learning Korean →': '韓国語の学習を始める →', 'Plan Your Trip': '旅行を計画する',
    'K-Pop': 'K-ポップ', 'K-Drama': 'K-ドラマ', 'K-Beauty': 'K-ビューティー',
    'All': '全て',
    'Learn · 학습': '学ぶ · 학습', 'K-Culture · 문화': 'K-カルチャー · 문화', 'Company · 회사': '会社情報 · 회사',
    'Explore': '探索', 'Company': '会社情報',
    'Hangul Alphabet': 'ハングルアルファベット', 'Grammar': '文法', 'Vocabulary': '語彙',
    'Travel Guide': '旅行ガイド', 'Korean News': '韓国ニュース',
    'About Us': '私たちについて', 'Contact': 'お問い合わせ', 'Privacy Policy': 'プライバシーポリシー', 'Terms of Use': '利用規約',
    'Made with ❤️ for Korean learners worldwide.': '世界中の韓国語学習者のために ❤️',
    '🇰🇷 학습을 즐기세요! (Enjoy your learning!)': '🇰🇷 학습을 즐기세요！（学習を楽しんでください！）',

    // ── Breadcrumb & common nav ─────────────────────────
    'Home': 'ホーム', 'Hangul': 'ハングル',
    'A free Korean language learning platform — combining language study with K-culture, travel guides, and real-world practice. For learners of every level, worldwide.': '無料の韓国語学習プラットフォーム — 言語学習とK-カルチャー、旅行ガイド、実践練習を組み合わせた、あらゆるレベルの学習者向けのサービスです。',

    // ── Sidebar section dividers ────────────────────────
    'Getting Started': '始め方', 'Tools': 'ツール',
    'CATEGORIES · 카테고리': 'カテゴリー · 카테고리',
    'DEEP DIVES · 심층 탐구': '詳細ガイド · 심층 탐구',

    // ── Learn sidebar links ─────────────────────────────
    'Introduction': 'はじめに', 'Syllable Blocks': '音節ブロック', 'Pronunciation Guide': '発音ガイド',
    'Vocab': '語彙', 'Greetings': 'あいさつ', 'Numbers': '数字', 'Family': '家族',
    'Food & Drink': '食べ物・飲み物', 'Colors': '色', 'Days & Time': '曜日・時間',
    'Places': '場所', 'Emotions': '感情', 'Body Parts': '体の部位',
    'Shopping': '買い物', 'Weather': '天気', 'Verbs & Actions': '動詞・動作',
    'Adjectives': '形容詞', 'Workplace': '職場', 'Health & Medicine': '健康・医療',
    'Media & K-Culture': 'メディア・K-カルチャー', 'Proverbs & Idioms': 'ことわざ・慣用句',
    'Academic Korean': 'アカデミック韓国語', 'News & Society': 'ニュース・社会', 'Konglish': 'コングリッシュ',
    'Pronouns': '代名詞', 'Common Nouns': '一般名詞',
    'Sentence Structure': '文の構造', 'Korean Particles': '助詞', 'Verb Conjugation': '動詞の活用',
    'Question Forms': '疑問文の形', 'Connectors': '接続詞', 'And, With': 'と/と一緒に',
    'To/From Someone': '〜に/〜から', 'Telling Time': '時間の言い方', 'Counters': '助数詞',
    'Present Progressive': '現在進行形', 'Self Introduction': '自己紹介', 'Dates and Months': '日付と月',
    'Degree Adverbs': '程度副詞', 'Nominalizer -는 것': '名詞化 -는 것', 'Comparatives': '比較表現',
    'Still, Already': 'まだ/すでに', 'Someone, Something': '誰か・何か',
    'Imperative -(으)세요': '命令形 -(으)세요', 'Don\'t: -지 마세요': 'するな：-지 마세요',
    'Method: -(으)로': '手段：-(으)로', 'Good/Poor At': '得意・不得意', '-도 Advanced Uses': 'も（応用）',
    'Formal vs Informal': 'フォーマル vs インフォーマル', 'Expressing Emotions': '感情を表現する',
    'Shopping Phrases': '買い物フレーズ', 'Writing Essays': '作文',
    'Business Korean': 'ビジネス韓国語', 'Classical Korean': '古典韓国語',
    'Korean Dialogues': '韓国語の会話', 'Flashcards': 'フラッシュカード',

    // ── Culture sidebar category buttons ───────────────
    'K-Movie': 'K-ムービー', 'K-Food': 'K-フード', 'K-Fashion': 'K-ファッション',
    'Korean Thing': '韓国あるある', 'K-Gaming': 'Kゲーミング', 'K-Sports': 'Kスポーツ',
    'K-Pop, K-Drama, food, beauty, fashion, gaming, sports & traditions.': 'K-ポップ、K-ドラマ、料理、美容、ファッション、ゲーミング、スポーツ＆伝統。',

    // ── Culture sidebar sub-links ───────────────────────
    'K-Pop History': 'K-ポップの歴史', 'Agencies': 'プロダクション', 'Generations': '世代',
    'Genres': 'ジャンル', 'Variety Shows': 'バラエティ番組', 'Film & Acting': '映画と演技',
    'Idol Phrases': 'アイドルのフレーズ', 'Fan Slang': 'ファンスラング', 'Fan Chants': 'ファンチャント',
    'Drama History': 'ドラマの歴史', 'Drama Genres': 'ドラマのジャンル',
    'Must-Watch Dramas': '必見ドラマ', 'K-Drama Tropes': 'K-ドラマの定番設定',
    'Speech Levels': '敬語レベル', 'Dialogue Practice': '会話練習',
    'Fan Culture & Slang': 'ファン文化とスラング',
    'Movie History': '映画の歴史', 'Movie Genres': '映画のジャンル',
    'Must-Watch Films': '必見映画', 'Directors': '映画監督',
    'Iconic Lines': '名セリフ', 'Fan Culture': 'ファン文化',
    'K-Food Goes Global': 'K-フードの世界進出', 'Foods That Went Global': '世界に広まった料理',
    'K-Food Timeline': 'K-フードの歴史', 'Essential Dishes': '定番料理',
    'World-Famous Chefs': '世界的シェフ', 'Ordering & Dining': '注文と食事',
    'Street Food': '屋台料理', 'Food Culture & Drinking': '食文化と飲酒文化',
    'Ramyeon Guide': 'ラーメンガイド', 'Mandu Guide': '餃子ガイド',
    'Chicken Guide': 'チキンガイド', 'K-BBQ Guide': 'K-BBQガイド', 'Kimchi Guide': 'キムチガイド',
    'K-Beauty Goes Global': 'K-ビューティーの世界進出', 'K-Beauty Timeline': 'K-ビューティーの歴史',
    'Iconic Brands': 'アイコニックブランド', 'Beauty Vocabulary': '美容語彙',
    '10-Step Skincare': '10ステップスキンケア', 'Key Ingredients': '主要成分',
    'Beauty Trends': '美容トレンド', 'Makeup Philosophy': 'メイクの哲学',
    'Skin Clinic Culture': '皮膚科文化', 'K-Beauty Dialogue': 'K-ビューティー会話',
    'K-Fashion Global': 'K-ファッションの世界進出', 'Fashion Icons': 'ファッションアイコン',
    'Fashion Timeline': 'ファッションの歴史', 'Style Aesthetics': 'スタイル美学',
    'Idol Fashion': 'アイドルファッション', 'Seoul Fashion Week': 'ソウルファッションウィーク',
    'Fashion Vocabulary': 'ファッション語彙', 'Fashion Districts': 'ファッションエリア',
    'Shopping Dialogue': '買い物会話', 'Hanbok & Traditional Fashion': '韓服と伝統衣装',
    'Rice Obsession': 'ご飯愛', 'Youth Protection Laws': '未成年者保護法',
    'Fast Delivery Culture': '超速配達文化', 'Invasive Species Crisis': '外来種危機',
    'Table Call Culture': 'テーブル呼び出し文化', 'Public Transport': '公共交通機関',
    'Jjimjilbang': 'チムジルバン', 'Plastic Surgery Culture': '整形文化',
    'Outdoor Drinking': '屋外飲酒', 'Jeonse Housing': '전세制度',
    'Traditions & Holidays': '伝統と祝日', '100 Korean Proverbs': '韓国のことわざ100選',
    'K-Gaming Stats': 'Kゲーミング統計', 'Gaming Timeline': 'ゲーミングの歴史',
    'Gaming Legends': 'ゲーミング界の伝説', 'Iconic Games': '名作ゲーム',
    'Streaming Culture': 'ストリーミング文化', 'PC Bang Culture': 'PCバン文化',
    'PC방 Culture': 'PCバン文化',
    'Esports Leagues': 'eスポーツリーグ', 'Gamer Slang': 'ゲーマースラング',
    'Gaming Vocabulary': 'ゲーミング語彙', 'Sports Overview': 'スポーツ概要',
    'Football Heroes': 'サッカーの英雄', 'Baseball Heroes': '野球の英雄',
    'Marathon Legends': 'マラソンの伝説', 'Individual Legends': '個人の伝説',
    'Traditional Sports': '伝統スポーツ', 'Cheer Chants': '応援チャント',

    // ── Travel sidebar ──────────────────────────────────
    'Travel Guide · 여행 안내': '旅行ガイド · 여행 안내', 'South Korea': '韓国',
    'By Days · 일수별': '日数別 · 일수별',
    '1 Day Trip · 당일치기': '日帰り旅行 · 당일치기', '2 Days · 1박 2일': '2日間 · 1박 2일',
    '3 Days · 2박 3일': '3日間 · 2박 3일', '5 Days · 4박 5일': '5日間 · 4박 5일',
    '1 Week · 일주일': '1週間 · 일주일', '10 Days': '10日間',
    '2 Weeks · 2주': '2週間 · 2주', '1 Month+ · 한달': '1ヶ月以上 · 한달',
    'By City · 도시별': '都市別 · 도시별',
    'Seoul · 서울': 'ソウル · 서울', 'Incheon · 인천': '仁川 · 인천',
    'Busan · 부산': '釜山 · 부산', 'Suwon · 수원': '水原 · 수원',
    'Jeju · 제주도': '済州島 · 제주도', 'Gyeongju · 경주': '慶州 · 경주',
    'Other Cities': 'その他の都市', 'By Theme · 테마별': 'テーマ別 · 테마별',
    'Food Tour · 음식 여행': 'グルメツアー · 음식 여행',
    'Events & Festivals · 이벤트': 'イベント・祭り · 이벤트',
    'Sightseeing · 관광': '観光 · 관광', 'Cross-Country · 장거리': '長距離移動 · 장거리',
    '📋 Trip Planner · 여행 계획표': '📋 旅行プランナー · 여행 계획표',
    'Day-by-Day Itineraries': '日程別旅程', 'City Travel Guides': '都市旅行ガイド',
    'Themed Travel': 'テーマ別旅行',
    'Bus': 'バス', 'Subway': '地下鉄', 'Taxi': 'タクシー',
    'KTX High-speed Rail': 'KTX高速鉄道',
    'Age': '年齢', 'Bowing': 'お辞儀', 'Drinking': '飲酒', 'Eating': '食事',
    'Quiet': '静粛', 'Shoes': '靴', 'Tipping': 'チップ', 'Two Hands': '両手',

    'International': '国際', 'Politics': '政治', 'Economy': '経済', 'Society': '社会',
    'Science': '科学', 'Culture': '文化', 'Sports': 'スポーツ',
    'Education': '教育', 'Environment': '環境',

    // ── Homepage article/card titles ───────────────────
    'K-Pop Lyrics Learning': 'K-ポップ歌詞で学ぶ', 'K-Drama Vocabulary': 'K-ドラマ語彙',
    'Korean Food Dictionary': '韓国料理辞典',
    'Master Korean Emotions Through K-Drama': 'K-ドラマで感情を学ぶ',
    'Order Like a Local: Restaurant Korean': 'ローカルのように注文：レストラン韓国語',
    'Beauty & Skincare Vocabulary in Korean': '韓国語の美容・スキンケア語彙',
    'K-Pop Stars\' Korean Phrases You Need to Know': 'K-ポップスターの必見フレーズ',
    'Read →': '読む →',

    // ── Homepage Word of Day & learning path checklist ──
    'Hello / Good day': 'こんにちは / 良い一日を',
    '✓ Hangul Alphabet': '✓ ハングルアルファベット',
    '✓ Basic Vowels & Consonants': '✓ 基本母音と子音',
    '✓ Syllable Blocks': '✓ 音節ブロック',
    '✓ Essential Vocabulary': '✓ 基本語彙',
    '✓ Basic Greetings': '✓ 基本的な挨拶',
    '✓ Korean Grammar (SOV)': '✓ 韓国語文法（SOV）',
    '✓ Particles & Conjugation': '✓ 助詞と活用',
    '✓ Speech Levels': '✓ 敬語レベル',
    '✓ 300+ Vocabulary Words': '✓ 語彙300語以上',
    '✓ Real Dialogues': '✓ リアルな会話',
    '✓ Business Korean': '✓ ビジネス韓国語',
    '✓ Classical Korean': '✓ 古典韓国語',
    '✓ Essay Writing': '✓ 作文',
    '✓ TOPIK Preparation': '✓ TOPIK対策',
    '✓ Idiomatic Expressions': '✓ 慣用表現',

    // ── Homepage with-Korean eyebrow labels ─────────────
    'Hangul Basics · 한글 기초': 'ハングル基礎 · 한글 기초',
    'Korean Grammar · 문법': '韓国語文法 · 문법',
    'Vocabulary · 어휘': '語彙 · 어휘', 'Pronunciation · 발음': '発音 · 발음',
     'Korean Food · 음식': '韓国料理 · 음식',
    'K-Beauty · 뷰티': 'K-ビューティー · 뷰티', 'K-Drama · 드라마': 'K-ドラマ · 드라마',
    'K-Pop Lyrics · 가사': 'K-ポップ歌詞 · 가사', 'TOPIK Prep · 토픽 준비': 'TOPIK対策 · 토픽 준비',
    'Flashcards · 플래시카드': 'フラッシュカード · 플래시카드',
    'Start Here · 여기서 시작': 'ここから始める · 여기서 시작',
    'Daily Vocabulary · 오늘의 단어': '今日の語彙 · 오늘의 단어',
    'Travel Guide · 여행': '旅行ガイド · 여행',
    'Blog · 블로그': 'ブログ · 블로그', 'About Us · 소개': '私たちについて · 소개',
    'Contact · 연락처': 'お問い合わせ · 연락처',
    'Seoul · 서울': 'ソウル · 서울', 'Busan · 부산': '釜山 · 부산', 'Jeju · 제주': '済州 · 제주',
    'Privacy': 'プライバシー', 'Terms': '利用規約', 'Terms of Service': '利用規約',
    'K-FOOD · 한국 음식': 'K-フード · 한국 음식',

    // ── K-BBQ / food page stat labels ──────────────────
    'Charcoal grill (best)': '炭火グリル（最高）',
    'Side dishes (free refill)': '副菜（おかわり自由）',
    'Lettuce wrap style': 'サンチュ包みスタイル',

    // ── Lesson header meta ─────────────────────────────────────
    'About this lesson': 'このレッスンについて',
    'Korean Grammar': '韓国語文法',
    '✏️ Beginner · Lesson 1': '✏️ 初級 · レッスン 1',
    '📐 Intermediate · Lesson 7': '📐 中級 · レッスン 7',
    '60 min read': '60分読了',
    'Alphabet': 'アルファベット',

    // ── grammar.html lesson-tag & lesson-meta ──────────────────
    '📐 Intermediate · Lesson 5': '📐 中級 · レッスン 5',
    '🎯 26 Stages · 70 Steps': '🎯 26段階 · 70ステップ',
    '📊 Beginner–Advanced': '📊 初級〜上級',
    '⏱️ ~90 min': '⏱️ 約90分',
    '⚡ XP + Streak system': '⚡ XP + 連続学習システム',

    // ── writing-essays.html lesson-tag & lesson-meta ───────────
    '📝 Advanced · Lesson 12': '📝 上級 · レッスン 12',
    '✍️ Essay Structure Guide': '✍️ 作文構成ガイド',
    '📊 Advanced': '📊 上級',
    '🔖 Writing': '🔖 作文',
    '🔗 Connective Grammar': '🔗 接続文法',

    // ── business-korean.html lesson-tag & lesson-meta ──────────
    '💼 Advanced · Lesson 13': '💼 上級 · レッスン 13',
    '🏢 Workplace Expressions': '🏢 職場表現',
    '🔖 Professional': '🔖 プロフェッショナル',
    '🤝 Business Etiquette': '🤝 ビジネスマナー',

    // ── classical-korean.html lesson-tag & lesson-meta ─────────
    '📜 Advanced · Lesson 14': '📜 上級 · レッスン 14',
    '📜 Hanja (한자) Roots': '📜 漢字（한자）の語源',
    '🔖 History & Literature': '🔖 歴史と文学',
    '🏛️ Historical Korean Texts': '🏛️ 韓国古典文献',

    // ── dialogues.html lesson-tag & lesson-meta ────────────────
    '💬 All Levels · 40 Dialogues': '💬 全レベル · 40の会話',
    '💬 40 Full Dialogues': '💬 40本の完全な会話',
    '📊 All Levels': '📊 全レベル',
    '🔖 Real-world Korean': '🔖 実践韓国語',
    '🔊 Audio on Every Line': '🔊 全行に音声付き',

    // ── Hangul page headings ────────────────────────────────────
    'What is Hangul? (한글이란?)': 'ハングルとは？（한글이란？）',
    'Basic Vowels (기본 모음)': '基本母音（기본 모음）',
    'Hangul at a Glance': 'ハングル概要',
    'Basic Consonants': '基本子音',
    'Basic Vowels': '基本母音',
    'Double Consonants': '濃音',
    'Compound Vowels': '合成母音',
    'Fun Fact': '豆知識',
    'Why does ㅇ appear at the start?': 'なぜ ㅇ が最初に来るの？',
    'Vowel Shape Mnemonics': '母音の形のニーモニック',

    // ── Hangul page — lesson header ────────────────────────────
    '✏️ Starter · Lesson 1': '✏️ 入門 · レッスン 1',
    'Hangul Alphabet:': 'ハングルアルファベット：',
    '⏱ 45 min read': '⏱ 45分読了',
    '📊 Beginner': '📊 初級',
    '🔖 Hangul Basics · 한글 기초': '🔖 ハングル基礎 · 한글 기초',
    '🔡 Syllable Block Patterns': '🔡 音節ブロックのパターン',
    '📘 Common Compound Batchim Examples': '📘 複合パッチムの例',
    '👁 18,204 views': '👁 18,204 回閲覧',

    // ── Hangul page — section headings ─────────────────────────
    'About Hangul (한글)': 'ハングルについて (한글)',
    'Basic Vowels (모음)': '基本母音 (모음)',
    'Compound Vowels (복합 모음)': '合成母音 (복합 모음)',
    'Basic Consonants (자음)': '基本子音 (자음)',
    'Syllable Blocks (음절)': '音節ブロック (음절)',
    'Tense (Double) Consonants — 쌍자음': '濃音（二重子音） — 쌍자음',
    'Compound Batchim (겹받침)': '複合パッチム (겹받침)',
    'Aspirated Consonants — 거센소리': '激音 — 거센소리',
    'Quick Practice Quiz': 'クイック練習クイズ',

    // ── Hangul page — tip labels ────────────────────────────────
    'Did you know?': 'ご存じでしたか？',
    'Vowel Harmony': '母音調和',
    'Reading Practice': '読む練習',
    'The Tissue Test': 'ティッシュテスト',

    // ── Hangul page — About section list items ──────────────────
    '10 basic vowels': '10の基本母音',
    '11 compound vowels': '11の複合母音',
    '14 basic consonants': '14の基本子音',
    '5 tense consonants': '5の濃音',
    '5 aspirated consonants': '5の激音',

    // ── Hangul page — tip texts ─────────────────────────────────
    'October 9 is Hangul Day (한글날) in South Korea — a national holiday celebrating the invention of the alphabet in 1443.': '10月9日は韓国のハングルの日（한글날）です — 1443年にハングルが創製されたことを祝う祝日です。',
    'ㅏ and ㅗ are "bright" vowels that pair with -아요 in conjugation. All other vowels are "dark" and pair with -어요. This pattern is consistent throughout the language.': 'ㅏとㅗは「明るい」母音で、活用時に-아요と組み合わせます。他の母音はすべて「暗い」母音で-어요と組み合わせます。このパターンは言語全体で一貫しています。',
    '한국어 = 한(han) + 국(guk) + 어(eo) = "Korean language". Each syllable block is exactly one beat when spoken aloud. Try tapping the rhythm as you read!': '한국어 = 한(han) + 국(guk) + 어(eo) = 「韓国語」。各音節ブロックは発話時にちょうど1拍です。読みながらリズムを叩いてみましょう！',
    'Hold a tissue in front of your mouth. For aspirated consonants (ㅋㅌㅍㅊ), the tissue should flutter. For regular consonants (ㄱㄷㅂㅈ), it stays still. This is a great way to feel the difference!': 'ティッシュを口の前に持ってください。激音（ㅋㅌㅍㅊ）ではティッシュが揺れます。通常の子音（ㄱㄷㅂㅈ）では揺れません。違いを体感するのに最適な方法です！',

    // ── Hangul page — syllable blocks table ────────────────────
    'Structure': '構造',
    'Example': '例文',
    'Reading': '読み方',
    'Meaning': '意味',
    'Consonant + Vowel': '子音 + 母音',
    'go (verb stem)': '行く（動詞語幹）',
    'Consonant + Vowel + Consonant': '子音 + 母音 + 子音',
    'Korean (prefix)': '韓国語（接頭辞）',
    'Silent ㅇ + Vowel': '無音ㅇ + 母音',
    'ah! (exclamation)': 'ああ！（感嘆詞）',

    // ── Hangul page — compound batchim table ───────────────────
    'Batchim': 'パッチム',
    'Example Word': '例語',
    'Note': '補足',
    'to read': '読む',
    'Pronounce ㄱ; ㄹ carries to next syllable before vowel': 'ㄱと発音；ㄹは母音の前で次の音節へ',
    'to sit': '座る',
    'Pronounce ㄴ; ㅈ carries to next syllable before vowel': 'ㄴと発音；ㅈは母音の前で次の音節へ',
    'life': '人生',
    'Pronounce ㅁ; ㄹ carries to next syllable before vowel': 'ㅁと発音；ㄹは母音の前で次の音節へ',

    // ── Hangul page — aspirated rom labels ─────────────────────
    'k (aspirated)': 'k（激音）',
    't (aspirated)': 't（激音）',
    'p (aspirated)': 'p（激音）',
    'ch (aspirated)': 'ch（激音）',

    // ── Hangul page — lesson navigation ────────────────────────
    '← Home': '← ホーム',
    'Mark as Complete ✓': '完了にする ✓',
    'Syllable Blocks →': '音節ブロック →',

    // ── Grammar page section headings ──────────────────────────
    'Word Order — SOV Structure (어순)': '語順 — SOV構造（어순）',
    'Korean Particles (조사)': '韓国語の助詞（조사）',
    'Particle Practice': '助詞の練習',
    'Speech Levels (존댓말 vs 반말)': '敬語レベル（존댓말 vs 반말）',
    'Present Tense (-아요/-어요)': '現在形（-아요/-어요）',
    'Past Tense (-았어요/-었어요)': '過去形（-았어요/-었어요）',
    'Future Tense (-을 거예요/-ㄹ 거예요)': '未来形（-을 거예요/-ㄹ 거예요）',
    'Making Sentences Negative (부정문)': '否定文の作り方（부정문）',
    'Forming Questions (의문문)': '疑問文の形成（의문문）',
    'WH- Question Words': 'WH疑問詞',
    'Essential Sentence Patterns (문형)': '必須文型（문형）',
    'Connectors: 그리고, 그래서, 그렇지만, 그런데': '接続詞：그리고・그래서・그렇지만・그런데',
    'And, With: -하고, -(이)랑': 'と/と一緒に：-하고・-(이)랑',
    'To/From Someone: -한테, -한테서': '〜に/〜から：-한테・-한테서',
    'Telling Time (시간 말하기)': '時間の言い方（시간 말하기）',
    'Counters (단위 명사)': '助数詞（단위 명사）',
    'Present Progressive: -고 있어요': '現在進行形：-고 있어요',

    // ── Grammar table headers ───────────────────────────────────
    'Particle': '助詞',
    'Function': '機能',
    'Rule': '規則',
    'Level': 'レベル',
    'When to Use': '使用場面',
    'Dictionary Form': '辞書形',
    'Stem': '語幹',
    'Conjugated': '活用形',
    'Counter': '助数詞',
    'Used for': '対象',
    'Vowel': '母音',
    'Shape Mnemonic': '形のイメージ',
    'Mouth Position': '口の形',
    'Time': '時刻',
    'Register': '丁寧さのレベル',
    'Used with': '使用対象',
    'Formal equivalent': 'フォーマルな同等表現',
    'Korean · 한국어': '韓国語 · 한국어',
    'Translation · 번역': '訳 · 번역',

    // ── Grammar table cells ─────────────────────────────────────
    'Topic marker': 'トピックマーカー',
    'Subject marker': '主語マーカー',
    'Object marker': '目的語マーカー',
    'Location / Direction': '場所・方向',
    'Location of action': '動作の場所',
    'Possessive': '所有格',
    'And (with nouns)': 'そして（名詞に使う）',
    'Also / Too': 'も',
    'Only': 'だけ',
    '은 after consonant, 는 after vowel': '子音の後：은、母音の後：는',
    '이 after consonant, 가 after vowel': '子音の後：이、母音の後：가',
    '을 after consonant, 를 after vowel': '子音の後：을、母音の後：를',
    'Destination or static location': '目的地または静的な位置',
    'Where an action takes place': '動作が行われる場所',
    'Like "of" or "\'s"': '「の」を表す',
    '와 after vowel, 과 after consonant': '母音の後：와、子音の後：과',
    'Replaces 은/는 or 이/가': '은/는 または 이/가 の代替',
    'Exclusive focus': '排他的な強調',
    'Official settings, strangers, broadcast': '公式の場・初対面・放送',
    'Most daily use, adults, strangers': '日常会話・大人・初対面',
    'Close friends, younger people, informal': '親しい友人・年下・くだけた場面',
    'And / And then': 'そして・それから',
    'So / Therefore': 'だから・したがって',
    'But / However': 'しかし・ところが',
    'But / By the way': 'でも・ところで',
    'Adds information; lists items or sequential actions': '情報の追加・列挙・連続した動作',
    'Cause → result; the result follows logically': '原因→結果；論理的な帰結',
    'Strong contrast; more formal than 그런데': '強い対比；그런데より丁寧',
    'Soft contrast or topic shift; very common in conversation': '柔らかい対比または話題転換；会話でよく使われる',
    'After any noun (no variation)': 'すべての名詞の後（変化なし）',
    'Neutral / casual': '中立・くだけた',
    'Casual / colloquial': 'くだけた・口語',
    'Formal / written': 'フォーマル・書き言葉',
    'to (a person)': '（人）に',
    'from (a person)': '（人）から',
    'to (a place/object)': '（場所・物）に',
    'from (a place)': '（場所）から',
    'People, animals': '人・動物',
    'Places, things': '場所・物',
    'Places': '場所',
    'General objects / things': '一般的な物',
    'People (neutral)': '人（一般）',
    'People (honorific)': '人（敬意）',
    'Animals': '動物',
    'Books, bound volumes': '本・冊子',
    'Flat sheets (paper, tickets)': '平らなもの（紙・チケット）',
    'Cups, glasses of liquid': 'カップ・グラス（液体）',
    'Bottles': 'ボトル',
    'Times / turns / occurrences': '回数・番数',
    'Age (years old)': '年齢（歳）',
    'Floors of a building': '（建物の）階',
    'Vehicles, machines': '乗り物・機械',

    // ── Tip labels ──────────────────────────────────────────────
    'Grammar Tip': '文法ポイント',
    'Usage Tip': '使い方のポイント',
    'Register Note': '丁寧さのレベルについて',
    'Key Pattern': '重要パターン',
    'Word Order': '語順',

    // ── Index page content ──────────────────────────────────────
    'Learn Korean naturally through your favourite songs. Line-by-line breakdowns with vocabulary, grammar notes, and pronunciation guides.': 'お気に入りの曲で自然に韓国語を学べます。語彙・文法・発音ガイド付きの行ごとの解説。',
    'Pick up everyday Korean from your favourite dramas. Contextual vocabulary lists organised by show, genre, and proficiency level.': 'お気に入りのドラマで日常の韓国語を習得。番組・ジャンル・レベル別に整理された語彙リスト。',
    'Language is the gateway — immerse yourself in Korean pop culture, food, and beauty to supercharge your learning.': '言語は入り口 — 韓国のポップカルチャー・料理・美容に浸かって学習を加速しましょう。',
    'From BTS to BLACKPINK — the most common Korean words and phrases used by your favourite K-Pop artists, with pronunciation guides.': 'BTSからBLACKPINKまで — お気に入りのK-POPアーティストが使う定番の韓国語フレーズ（発音ガイド付き）。',
    'Korean dramas are packed with emotional vocabulary. Learn how characters express joy, sadness, anger, and love in authentic Korean.': '韓国ドラマは感情表現の宝庫。登場人物が喜び・悲しみ・怒り・愛を本物の韓国語でどう表現するか学べます。',
    'Essential phrases for ordering food, asking for the bill, and navigating a Korean restaurant menu with confidence.': '食べ物の注文・お会計の依頼・韓国レストランのメニューを自信を持って使いこなすための必須フレーズ。',
    'Explore the world of K-Beauty with essential vocabulary for skincare routines, cosmetics, and Korean beauty trends.': 'スキンケアルーティン・コスメ・韓国ビューティートレンドの必須語彙でK-ビューティーの世界を探索しよう。',
    '한글 (Hangul) Alphabet': 'ハングル（Hangul）アルファベット',
    'Greetings & Basic Phrases': 'あいさつ＆基本フレーズ',
    'Numbers (Sino & Native Korean)': '数字（漢数字＆固有朝鮮語）',
    'Days, Months & Dates': '曜日・月・日付',
    'Basic Sentence Structure (SOV)': '基本文構造（SOV）',
    'Essential Vocabulary (500 words)': '基本語彙（500語）',
    'Formal vs Informal Speech (존댓말)': 'フォーマル vs インフォーマル敬語（존댓말）',
    'Verb Conjugation & Tenses': '動詞の活用と時制',
    'Particles & Postpositions': '助詞と後置詞',
    'Topic vs Subject Markers': 'トピックマーカー vs 主語マーカー',
    'Intermediate Vocabulary (2,000 words)': '中級語彙（2,000語）',
    'Complex Grammar Patterns': '複合文法パターン',
    'Hanja (Chinese Characters) Basics': '漢字（한자）の基礎',
    'Business & Academic Korean': 'ビジネス＆アカデミック韓国語',
    'TOPIK II Exam Preparation': 'TOPIK II 試験対策',
    'Advanced Vocabulary (5,000+ words)': '上級語彙（5,000語以上）',
    'Culture · 문화': 'カルチャー · 문화',
    'Drama · 드라마': 'ドラマ · 드라마',
    'Food · 음식': '料理 · 음식',
    'Korean School': 'コリアンスクール',
    'Love': '愛',
    'Pronunciation: sa·rang': '発音：sa·rang',
    '"사랑해요" — I love you': '「사랑해요」— 愛してるよ',
    'Explore →': '探索 →',
    '🏯 Palaces': '🏯 宮殿',
    '🛍️ Shopping': '🛍️ 買い物',
    '🍜 Street Food': '🍜 屋台料理',
    '🏖️ Beaches': '🏖️ ビーチ',
    '🐟 Seafood': '🐟 海鮮',
    '🏔️ Hiking': '🏔️ ハイキング',
    '🌉 Bridges': '🌉 橋',
    '🌋 Hallasan': '🌋 漢拏山',
    '🤿 Diving': '🤿 ダイビング',
    '🍊 Citrus': '🍊 柑橘類',
    '🐴 Nature': '🐴 自然',

    // ── Travel page ─────────────────────────────────────────────
    'Explore the Land of the Morning Calm — from futuristic Seoul to scenic Jeju Island. Learn essential travel Korean and navigate like a local.': '朝鮮の地を探索しましょう — 未来的なソウルから景勝地の済州島まで。旅行に必須の韓国語を学んでローカルのように旅しましょう。',
    'Year-round': '年中',
    '1-day city dashes to 1-month cross-country adventures — fully planned, time-blocked schedules.': '1日の市内旅行から1ヶ月の全国縦断まで — 完全に計画されたタイムスケジュール。',
    'Deep-dives into Seoul, Busan, Jeju, Gyeongju, Incheon, Suwon and beyond — attractions, food, transport, and stay.': 'ソウル・釜山・済州・慶州・仁川・水原などを深掘り — 観光スポット・食事・交通・宿泊まで。',
    'Food tours, festivals, sightseeing, coastal walks, river bike rides, and mountain hike trails.': 'グルメツアー・祭り・観光・海岸散策・川沿いサイクリング・山岳ハイキング。',
    'Build & Print Your Schedule': 'スケジュールを作成＆印刷',
    'Interactive time-blocking tool — add flights, meals, sightseeing, and sleep. Export or print your plan.': '時間割ツール — フライト・食事・観光・宿泊を追加し、計画をエクスポートまたは印刷。',
    'South Korea\'s vibrant capital — palaces, street food, K-Pop, and cutting-edge tech all in one extraordinary city.': '韓国の活気ある首都 — 宮殿・屋台料理・K-ポップ・最先端テクノロジーが集まる特別な都市。',
    'Korea\'s second city — coastal beauty, seafood markets, and colourful hillside villages between mountains and sea.': '韓国第2の都市 — 海と山の間に広がる美しい海岸・海鮮市場・カラフルな山の村。',
    'Jeju Island · 제주도': '済州島 · 제주도',
    'Korea\'s volcanic island paradise — UNESCO World Heritage landscapes, pristine beaches, and haenyeo diving culture.': '韓国の火山島パラダイス — ユネスコ世界遺産の景観・美しいビーチ・海女文化。',
    'Gyeongju · 경주': '慶州 · 경주',
    'Korea\'s ancient capital — an open-air museum bursting with royal tombs, temples, and Silla dynasty treasures.': '韓国の古都 — 王陵・寺院・新羅王朝の宝物が溢れる野外博物館。',
    'Incheon · 인천': '仁川 · 인천',
    'Korea\'s gateway city — futuristic Songdo smart city, vibrant Chinatown, and the world-renowned Incheon International Airport.': '韓国の玄関口 — 未来的な松都スマートシティ・活気あるチャイナタウン・世界有数の仁川国際空港。',
    'Suwon · 수원': '水原 · 수원',
    'Home of the magnificent UNESCO-listed Hwaseong Fortress — and famous for its legendary galbi BBQ ribs.': 'ユネスコ登録の壮大な水原華城の地 — 伝説のカルビBBQでも有名。',
    '🏯 Gyeongbokgung': '🏯 景福宮',
    '🎵 Hongdae': '🎵 ホンデ',
    '🛍️ Myeongdong': '🛍️ 明洞',
    '🌊 Han River': '🌊 漢江',
    '🏖️ Haeundae Beach': '🏖️ 海雲台ビーチ',
    '🎨 Gamcheon Village': '🎨 甘川文化村',
    '🐟 Jagalchi Market': '🐟 チャガルチ市場',
    '🌉 Gwangalli Bridge': '🌉 広安大橋',
    '🏔️ Hallasan Mountain': '🏔️ 漢拏山',
    '🌅 Seongsan Peak': '🌅 城山日出峰',
    '🕳️ Manjanggul Cave': '🕳️ 万丈窟',
    '🐷 Black Pig BBQ': '🐷 黒豚BBQ',
    '🛕 Bulguksa Temple': '🛕 仏国寺',
    '🔭 Cheomseongdae': '🔭 瞻星台',
    '⛰️ Royal Tumuli Park': '⛰️ 古墳公園',
    '🏙️ Songdo': '🏙️ 松島',
    '🏮 Chinatown': '🏮 チャイナタウン',
    '✈️ Best Airport': '✈️ 最優秀空港',
    '🌊 Wolmido Island': '🌊 月尾島',
    '🏰 Hwaseong Fortress': '🏰 水原華城',
    '🥩 Suwon Galbi': '🥩 水原カルビ',
    '🎎 Korean Folk Village': '🎎 韓国民俗村',
    '✈️ Arrival · 도착': '✈️ 到着 · 도착',
    '🚇 Getting Around · 교통': '🚇 移動方法 · 교통',
    '🍜 Food & Dining · 식사': '🍜 食事 · 식사',
    '🛍️ Shopping · 쇼핑': '🛍️ 買い物 · 쇼핑',
    '🚨 Emergency · 비상': '🚨 緊急時 · 비상',
    '🏨 Hotel · 호텔': '🏨 ホテル · 호텔',
    'Passport please': 'パスポートをお願いします',
    'Applying for tourist visa': '観光ビザ申請',
    'I am learning Korean': '韓国語を勉強しています',
    'Please take me to this address': 'この住所まで連れて行ってください',
    'Where is the subway station?': '地下鉄の駅はどこですか？',
    'Where is the bus stop?': 'バス停はどこですか？',
    'How much is it?': 'いくらですか？',
    'Please call a taxi': 'タクシーを呼んでください',
    'Please drop me here': 'ここで降ろしてください',
    'It\'s delicious!': '美味しいです！',
    'Menu please': 'メニューをください',
    'I\'m vegetarian': 'ベジタリアンです',
    'Please make it not spicy': '辛くしないでください',
    'Bill please': 'お会計をお願いします',
    'Please wrap this to go': '持ち帰りにしてください',
    'How much is this?': 'これはいくらですか？',
    'Please give me a discount': '割引してください',
    'Receipt please': '領収書をください',
    'Do you accept credit cards?': 'クレジットカードは使えますか？',
    'Help me!': '助けてください！',
    'Please call the police': '警察を呼んでください',
    'Where is the hospital?': '病院はどこですか？',
    'I need medicine': '薬が必要です',
    'I\'d like to check in': 'チェックインしたいです',
    'Do you have rooms available?': '部屋はありますか？',
    'What\'s the WiFi password?': 'WiFiのパスワードは何ですか？',
    'Seoul\'s subway has 9 lines covering the entire metropolitan area — clean, safe, and punctual to the minute. Also in Busan, Daegu, and Incheon.': 'ソウルの地下鉄は9路線で首都圏全体をカバー — 清潔・安全・分刻みで正確。釜山・大邱・仁川でも運行。',
    'Korea Train Express links Seoul to Busan in just 2 hours 15 minutes at speeds up to 305 km/h. Tickets via the Korail app.': 'KTXはソウル〜釜山を最高時速305kmでわずか2時間15分で結びます。コレールアプリで購入可能。',
    'Korean cuisine varies dramatically by region. Every city has its signature dish — knowing the local food vocabulary makes every meal an adventure.': '韓国料理は地域によって大きく異なります。各都市に名物料理があり、地元の食語彙を知ることで毎食が冒険になります。',
    'Knowing Korean etiquette shows respect and earns genuine warmth from locals. Eight things every visitor should know.': '韓国のマナーを知ることは敬意を示し、地元の人から本物の温かさを得られます。訪問者が知っておくべき8つのこと。',
    'Always bow when greeting someone. A 15° nod is casual; a 45° bow shows deep respect. Koreans appreciate even small efforts.': '人に挨拶するときは必ずお辞儀をしましょう。15°は軽い挨拶、45°は深い敬意を示します。韓国人は小さな努力も評価します。',
    'Koreans often ask your age shortly after meeting — it\'s not rude. Age determines the speech level (존댓말 vs 반말) used.': '韓国人は会ってすぐに年齢を聞くことがありますが、無礼ではありません。年齢によって話し方（존댓말 vs 반말）が決まります。',
    'Always remove shoes when entering a Korean home, many guesthouses, and some traditional restaurants. Look for a shoe rack.': '韓国の家・多くのゲストハウス・一部の伝統料理店に入るときは必ず靴を脱ぎましょう。靴棚を探してください。',
    'Give and receive items — money, gifts, business cards — with both hands or the right hand supported by the left.': 'お金・贈り物・名刺などを渡したり受け取ったりするときは、両手または左手で右腕を支えて使いましょう。',
    'Wait for the eldest person at the table to pick up their spoon before eating — a core part of Korean Confucian table etiquette.': '食事の前に、席の最年長者がスプーンを持つまで待ちましょう — 韓国の儒教的な食卓マナーの核心です。',
    'Never pour your own drink — always fill others\' glasses first. Hold your glass with two hands when someone pours for you.': '自分のグラスに自分で注がないでください — 常に他の人のグラスを先に満たしましょう。誰かが注いでくれるときは両手でグラスを持ちましょう。',
    'Keep your voice down on the subway — it\'s rude to speak loudly or take phone calls in quiet carriages.': '地下鉄では声を小さくしてください — 静かな車両で大声で話したり電話をかけたりするのは失礼です。',

    // ── News page ───────────────────────────────────────────────
    '⚠ AI-Generated Content Notice': '⚠ AIコンテンツに関するご注意',
    '💻 Tech': '💻 テック',
    '🍜 Food': '🍜 フード',
    '⚽ Sports': '⚽ スポーツ',
    '🎬 Culture': '🎬 カルチャー',
    '🏙️ Society': '🏙️ 社会',
    '📚 Education': '📚 教育',
    '👗 Fashion': '👗 ファッション',
    '✈️ Travel': '✈️ 旅行',
    '📈 Economy': '📈 経済',
    '🏛️ Politics': '🏛️ 政治',

    // ── K-Culture page ──────────────────────────────────────────
    'From BTS to BLACKPINK — learn the language of K-Pop: fan chants, idol phrases, and the slang that unites the global fandom.': 'BTSからBLACKPINKまで — K-ポップの言語を学ぼう：ファンチャント・アイドルフレーズ・グローバルファンをつなぐスラング。',
    'The Korean Karaoke Room': '韓国のカラオケルーム',
    'Norebang & K-Pop': 'ノレバンとK-ポップ',
    'How to Norebang': 'ノレバンの楽しみ方',

    // ── K-BBQ food tags ─────────────────────────────────────────
    'Traditional pairing': '定番ペアリング',
    '13 cuts': '13種類',
    '11 cuts': '11種類',
    'Top Premium': '最高プレミアム',
    'Heavy Marbling': 'マーブリング豊富',
    'Intense Flavor': '濃厚な風味',
    'Coarse Grain': '粗い繊維',
    'Flower Marbling': '花マーブリング',
    'BBQ Classic': 'BBQの定番',
    'Rib Flavor': 'リブの味わい',
    'Leaner Cut': '赤身が多い部位',
    'Tender': '柔らかい',
    'Brisket': 'ブリスケット',
    'Thin-Sliced': '薄切り',
    'Fat-Rich': '脂質豊富',
    'Charcoal Best': '炭火がベスト',
    'Flank': 'フランク',
    'Marinate Well': 'よく漬け込む',
    'Hidden Gem': '隠れた名部位',
    'Value Cut': 'コスパ部位',
    'Flat Iron': 'フラットアイアン',
    'Well-Marbled': 'マーブリング良好',
    'Budget-Friendly': '手頃な価格',
    'Layered Fat': '重なった脂身',
    'Celebration Food': 'お祝い料理',
    'Sweet-Savory': '甘辛い',
    'Korea\'s #1 BBQ': '韓国BBQ第1位',
    'Pork King #2': '豚BBQ第2位',
    'Complex Flavor': '複合的な風味',
    'Shoulder Cap': 'ショルダーキャップ',
    'Super Juicy': '超ジューシー',

    // ── Vocabulary page metadata ────────────────────────────────
    '📚 Beginner · Lesson 4': '📚 初級 · レッスン 4',
    '🗂 20+ Categories': '🗂 20以上のカテゴリ',
    '📊 All Levels': '📊 全レベル',
    '🔊 Audio-ready': '🔊 音声対応',
    'Build your flashcard deck': 'フラッシュカードを作成する',

    // ── Flashcard page dynamic UI ───────────────────────────────
    'My Words': 'マイ単語',
    'No cards': 'カードなし',
    '☆ Add to My Words': '☆ マイ単語に追加',
    '★ Remove from My Words': '★ マイ単語から削除',
    'click to flip · 뒤집기': 'クリックで裏返す · 뒤집기',

    'Vocabulary': '語彙',
    'Romanization': 'ローマ字表記',
    'Example': '例文',
    'Audio': '音声',
    'Two Number Systems': '2つの数字体系',
    'When to use each system': '各体系の使い分け',

    // ── Vocabulary section headings ─────────────────────────────
    '👋 Greetings & Polite Phrases (인사말)': '👋 あいさつと丁寧なフレーズ（인사말）',
    '🔢 Numbers (숫자)': '🔢 数字（숫자）',
    '👨‍👩‍👧 Family (가족)': '👨‍👩‍👧 家族（가족）',
    '🍜 Food & Drink (음식·음료)': '🍜 食べ物と飲み物（음식·음료）',
    '🎨 Colors (색깔)': '🎨 色（색깔）',
    '📅 Days & Time (날짜·시간)': '📅 曜日と時間（날짜·시간）',
    '🏙️ Places (장소)': '🏙️ 場所（장소）',
    '😊 Emotions (감정)': '😊 感情（감정）',
    '🫁 Body Parts (신체)': '🫁 身体の部位（신체）',
    '✈️ Travel (여행)': '✈️ 旅行（여행）',
    '🛒 Shopping (쇼핑)': '🛒 買い物（쇼핑）',
    '🌤️ Weather (날씨)': '🌤️ 天気（날씨）',
    '⚡ Verbs & Actions (동사)': '⚡ 動詞と行動（동사）',
    '✨ Adjectives (형용사)': '✨ 形容詞（형용사）',
    '💼 Workplace (직장)': '💼 職場（직장）',
    '🏥 Health & Medicine (건강)': '🏥 健康と医療（건강）',
    '🎬 Media & K-Culture (미디어)': '🎬 メディアとK-カルチャー（미디어）',
    '📜 Proverbs & Idioms (속담)': '📜 ことわざと慣用句（속담）',
    '🎓 Academic Korean (학문)': '🎓 アカデミック韓国語（학문）',
    '🌐 Konglish (콩글리쉬)': '🌐 コングリッシュ（콩글리쉬）',
    'Native Korean 고유어': '固有韓国語 고유어',
    'Sino-Korean 한자어': '漢字系韓国語 한자어',

    // ── Greetings vocabulary English translations ───────────────
    'Hello (formal)': 'こんにちは（フォーマル）',
    'Hi / Bye (casual)': 'やあ / バイバイ（カジュアル）',
    'Thank you (formal)': 'ありがとうございます（フォーマル）',
    'Thank you (polite)': 'ありがとうございます（丁寧）',
    'I\'m sorry (formal)': '申し訳ありません（フォーマル）',
    'Sorry (polite)': 'すみません（丁寧）',
    'It\'s okay / Are you okay?': '大丈夫です / 大丈夫ですか？',
    'Yes / No': 'はい / いいえ',
    'Nice to meet you': 'はじめまして',
    'How have you been?': 'お元気でしたか？',
    'Welcome (to a store)': 'いらっしゃいませ（店舗で）',
    'You can do it! / Fighting!': '頑張れ！',
    'Nice to meet you (formal, first time)': 'はじめまして（フォーマル・初対面）',
    'Please take care of me / Best regards': 'よろしくお願いします',
    'Goodbye (said to person leaving)': 'さようなら（去る人に言う）',
    'Goodbye (said when you are leaving)': 'さようなら（自分が去るときに言う）',
    'Long time no see': 'お久しぶりです',
    'See you again': 'またお会いしましょう',
    'You\'re welcome / Not at all': 'どういたしまして',
    'I will eat well (said before meals)': 'いただきます（食前に言う）',
    'I ate well / That was delicious (after meals)': 'ごちそうさまでした（食後に言う）',
    'Good work / Take care (to someone continuing to work)': 'お疲れ様です（働き続ける人に言う）',

    // ── Family vocabulary English translations ──────────────────
    'Father / Dad': 'お父さん / パパ',
    'Mother / Mom': 'お母さん / ママ',
    'Older brother (male/female speaker)': 'お兄さん（男性話者/女性話者）',
    'Older sister (male/female speaker)': 'お姉さん（男性話者/女性話者）',
    'Younger brother': '弟',
    'Younger sister': '妹',
    'Grandfather': '祖父',
    'Grandmother': '祖母',
    'Husband': '夫',
    'Wife': '妻',
    'Son': '息子',
    'Daughter': '娘',
    "Uncle (father's brother)": '叔父（父方）',
    "Aunt (mother's sister)": '叔母（母方）',
    "Aunt (father's sister)": '叔母（父方の姉妹）',
    'Cousin': 'いとこ',
    'Nephew / Niece': '甥 / 姪',
    'Maternal grandfather': '外祖父',
    'Maternal grandmother': '外祖母',
    'Father-in-law': '義父',
    'Mother-in-law': '義母',

    // ── Travel vocabulary English translations ──────────────────
    'Passport': 'パスポート',
    'Airplane': '飛行機',
    'Train': '電車',
    'Bus': 'バス',
    'Taxi': 'タクシー',
    'Subway': '地下鉄',
    'Ticket': 'チケット / 切符',
    'Hotel': 'ホテル',
    'Tourist attraction': '観光スポット',
    'Map': '地図',
    'Currency exchange': '両替',
    'Admission fee': '入場料',
    'Reservation / Booking': '予約',
    'Cancellation': 'キャンセル',
    'Luggage / Baggage': '荷物',
    'Immigration / Passport control': '入国審査',
    'Arrival': '到着',
    'Departure': '出発',
    'Boarding gate': '搭乗ゲート',

    // ── Shopping vocabulary English translations ─────────────────
    // 'How much is it?' already defined above
    'Expensive': '高い',
    'Cheap / Inexpensive': '安い',
    'Discount': '割引',
    'Please check out / bill me': 'お会計をお願いします',
    "I'll pay by card": 'カードで払います',
    'Please give me a receipt': '領収書をください',
    "I'd like to exchange": '交換したいのですが',
    "It's sold out": '売り切れです',
    'Please give me a bag': '袋をください',
    'Is it in stock?': '在庫はありますか？',
    'May I try this on?': '試着できますか？',
    'Size': 'サイズ',
    'Please wrap it / gift wrap': '包んでください / ギフト包装してください',
    'Delivery / Shipping': '配達 / 配送',

    // ── Verbs & Actions vocabulary English translations ──────────
    'To go': '行く',
    'To come': '来る',
    'To eat': '食べる',
    'To drink': '飲む',
    'To sleep': '寝る',
    'To wake up / get up': '起きる',
    'To work': '働く',
    'To study': '勉強する',
    'To see / watch': '見る',
    'To listen / hear': '聞く',
    'To speak / say': '話す / 言う',
    'To read': '読む',
    'To write': '書く',
    'To buy': '買う',
    'To sell': '売る',
    'To make / create': '作る',
    'To give': 'あげる / 与える',
    'To receive / get': 'もらう',
    'To help': '助ける / 手伝う',
    'To think': '思う / 考える',
    'To feel': '感じる',
    'To like': '好む',
    'To dislike / hate': '嫌う',
    'To know': '知る',
    'To not know': '知らない',

    // ── Workplace vocabulary English translations ────────────────
    'Company / Firm': '会社',
    'Office': 'オフィス',
    'Employee / Staff': '社員 / スタッフ',
    'Boss / Superior': '上司',
    'Subordinate / Junior staff': '部下',
    'Colleague / Coworker': '同僚',
    'Meeting': '会議',
    'Report / Document': '報告書 / 書類',
    'Project': 'プロジェクト',
    'Deadline': '締め切り',
    'Going to work / Clocking in': '出勤',
    'Leaving work / Clocking out': '退勤',
    'Overtime / Night work': '残業 / 夜間勤務',
    'Monthly salary': '月給',
    'Annual salary': '年収',
    'Job interview': '就職面接',
    'Resume / CV': '履歴書',
    'Contract': '契約',
    'Department / Division': '部署',
    'HR / Human Resources': '人事部',
    'Work tasks / Duties': '業務 / 仕事内容',
    'Cooperation / Collaboration': '協力 / 協業',

    // ── Health & Medicine vocabulary English translations ─────────
    'Doctor / Physician': '医師 / 医者',
    'Nurse': '看護師',
    'Medicine / Medication': '薬',
    'Prescription': '処方箋',
    'Symptom': '症状',
    'Headache': '頭痛',
    'Fever': '発熱 / 熱',
    'Cough': '咳',
    'Runny nose': '鼻水',
    'Upset stomach': '腹痛 / 胃の不調',
    'Allergy': 'アレルギー',
    'Surgery / Operation': '手術',
    'Medical examination / Test': '検査',
    'Blood pressure': '血圧',
    'Blood type': '血液型',
    'Vaccination / Immunization': '予防接種',
    'Emergency room': '救急室',
    'Hospitalization': '入院',
    'Hospital discharge': '退院',
    'Health insurance': '健康保険',

    // ── Academic Korean vocabulary English translations ───────────
    'Thesis / Academic paper': '論文',
    'Research': '研究',
    'Analysis': '分析',
    'Theory': '理論',
    'Hypothesis': '仮説',
    'Experiment': '実験',
    'Conclusion': '結論',
    'References / Bibliography': '参考文献',
    'Citation / Quotation': '引用',
    'Source / Origin': '出典',
    'Presentation / Announcement': '発表 / プレゼン',
    'Discussion / Debate': '議論 / ディベート',
    'Concept / Notion': '概念',
    'Definition': '定義',
    'Principle': '原則 / 原理',
    'Methodology': '方法論',
    'Statistics': '統計',
    'Data': 'データ',
    'Academic degree': '学位',
    'Major / Academic specialization': '専攻',

    // ── News & Society vocabulary English translations ────────────
    'Politics': '政治',
    'Economy': '経済',
    'Society': '社会',
    'National Assembly (Parliament)': '国会（議会）',
    'Election': '選挙',
    'Government': '政府',
    'President': '大統領',
    'Prime Minister': '首相',
    'Diplomacy': '外交',
    'Trade': '貿易',
    'Exchange rate': '為替レート',
    'Prices / Cost of living': '物価 / 生活費',
    'Unemployment rate': '失業率',
    'Inflation': 'インフレ',
    'Environment': '環境',
    'Climate change': '気候変動',
    'Human rights': '人権',
    'Incident / Case / Event': '事件 / 事故 / 出来事',
    'Investigation': '捜査 / 調査',
    'Verdict / Court ruling': '判決',

    // ── Konglish vocabulary English translations ──────────────────
    'Electrical outlet / Socket': 'コンセント',
    'Cheating on a test': 'カンニング（試験での）',
    'Buy one get one free (BOGO)': '一個買うと一個無料（BOGO）',
    'Treadmill': 'トレッドミル',
    'One size fits all': 'フリーサイズ',
    'Bottoms up! / Drink in one go': '乾杯！ / 一気飲み',
    'Convertible car': 'オープンカー',
    'Autograph / Signature': 'サイン',
    'Steering wheel': 'ハンドル',
    'Laptop computer': 'ノートパソコン',
    "I'm not feeling well": '気分が悪いです',
    'Cozy sit-in café (more specific than in English)': '居心地の良いカフェ（英語より具体的）',
    'Part-time job': 'アルバイト',
    'Restaurant floor staff / Head waiter': '給仕 / ウェイター',
    'Disposable plastic bag': '使い捨てビニール袋',
    'Mobile phone / Cell phone': '携帯電話 / スマホ',
    'TV remote (any remote)': 'リモコン（テレビ以外も含む）',
    'Air conditioner / AC unit': 'エアコン',
    'Rearview mirror': 'バックミラー',
    'Cheer meaning "You can do it!" / Go for it!': '「頑張れ！」の応援（ファイティン）',
    'Free extra item given by a store / Complimentary': 'お店からのおまけ / サービス品',
    'Casual physical affection between close friends': '親友間の気軽なスキンシップ',
    'Window shopping (browsing without buying)': 'ウィンドウショッピング（買わずに見て回る）',
    'Academic/career qualifications on a resume': '履歴書の学歴・職歴',
    'Selfie photo': '自撮り写真',
    'Studio apartment': 'ワンルームマンション',
    'Mid-rise apartment building (not a luxury home!)': '中層マンション（高級住宅ではない！）',
    'Any trench coat (not just Burberry brand)': 'トレンチコート（バーバリー限定ではない）',
    'Male comedian / Stand-up comic': '男性コメディアン / 漫才師',
    'TV actor / actress': 'テレビ俳優 / 女優',
    'Gym / Fitness center': 'ジム / フィットネスセンター',
    'Pantyhose / Tights (not just stockings)': 'パンスト / タイツ（ストッキングだけでなく）',
    'Supermarket / Large grocery store': 'スーパーマーケット / 大型食料品店',
    'Intercom / Door buzzer / Door phone': 'インターホン / ドアフォン',
    'Motorcycle / Scooter': 'バイク / スクーター',
    'Any glue / Strong adhesive': '接着剤 / 強力糊',
    'Car horn': 'クラクション',
    'To vomit / Throw up': '吐く / 嘔吐する',
    'Pool / Billiards': 'ビリヤード',
    'Small 2-4 story apartment building (not a villa!)': '小規模集合住宅（2〜4階建て、ヴィラではない！）',
    'Studio apartment in a commercial/office building': '商業・オフィスビル内のワンルームマンション',
    'Specifically Korean fried chicken (an entire food category!)': '韓国フライドチキン（一つの食文化！）',
    'High-rise apartment complex (the dominant housing type)': '高層マンション（最も一般的な住宅形態）',
    'Eating broadcast; watching someone eat live online': '食事配信（먹방）；オンラインで食べる様子を見る',
    'The art of reading the room / social awareness': '空気を読む力 / 社会的感受性（눈치）',

    // ── K-Drama page headings and captions ─────────────────────
    '📺 K-Drama History · 드라마 역사': '📺 K-ドラマの歴史 · 드라마 역사',
    '🏆 K-Drama History Timeline · 역사 타임라인': '🏆 K-ドラマ歴史タイムライン · 역사 타임라인',
    '🎬 How K-Dramas Are Made · 드라마 제작 방식': '🎬 K-ドラマの制作方法 · 드라마 제작 방식',
    'The Golden Age of Korean Broadcast': '韓国放送の黄金期',
    'Winter Sonata & the Hallyu Wave': '冬のソナタと韓流ブーム',
    'Squid Game Goes Global': 'イカゲームの世界的成功',
    'The Live-Shoot System 생방송 제작': '生放送制作システム 생방송 제작',
    'Drama OSTs — Music That Sells Emotion': 'ドラマOST — 感動を売る音楽',
    'Webtoon Adaptations — Comics to Screen': 'ウェブトゥーン原作 — マンガから映像へ',

    // ── K-Drama page — full content translations ─────────────────────

    // Hero description — <em> tags split into separate text nodes
    'Squid Game': 'イカゲーム',
    'Crash Landing on You': '愛の不時着',
    '— K-Dramas have captivated global streaming audiences and built one of the most passionate fandoms on Earth. Learn the language, history, genres, and fan culture behind Korean television\'s remarkable global rise.':
      '— K-ドラマは世界中のストリーミング視聴者を魅了し、地球上で最も熱狂的なファンダムの一つを生み出しました。韓国テレビの驚くべきグローバルな台頭の裏にある言語、歴史、ジャンル、ファン文化を学びましょう。',

    // History intro paragraph
    'Korean drama has evolved from government-regulated broadcast programming into a global entertainment industry worth billions. From the first black-and-white soap operas of the 1960s to Netflix\'s first non-English #1 series, each decade brought a transformation that shaped the Korean Wave.':
      '韓国ドラマは政府規制の放送プログラムから数十億ドル規模のグローバルエンタメ産業へと発展しました。1960年代初の白黒ソープオペラからNetflixの非英語圏初の1位シリーズまで、10年ごとに韓流を形成する変革が起きました。',

    // History photo caption body texts
    'KBS launched in 1962, followed by MBC in 1969 and SBS in 1991. These three networks remain the backbone of Korean drama production, airing new episodes twice a week in "miniseries" format — typically 16 episodes per season.':
      'KBSは1962年に開局し、1969年にMBC、1991年にSBSが続きました。この3放送局は韓国ドラマ制作の根幹として現在も週2回「ミニシリーズ」形式で新エピソードを放映しています — 通常1シーズン16話です。',
    '겨울연가 (Winter Sonata, 2002) starring Bae Yong-joon ignited Korean drama fever across Japan when it aired on NHK. Middle-aged Japanese fans — nicknamed "욘사마 팬" — sparked a Korean cultural tourism boom that forever changed Korea\'s global image.':
      '배용준主演の겨울연가（冬のソナタ、2002年）はNHK放映で日本中に韓国ドラマブームを巻き起こしました。「욘사마ファン」と呼ばれた中年の日本人ファンが韓国文化観光ブームを起こし、韓国のグローバルイメージを永遠に変えました。',
    '오징어 게임 (Squid Game, 2021) became Netflix\'s most-watched series ever — 1.65 billion viewing hours in its first 28 days, #1 in 94 countries. It won Emmy Awards and showed that Korean content could resonate deeply with audiences worldwide without dubbing.':
      '오징어 게임（イカゲーム、2021年）はNetflix史上最多視聴シリーズになりました — 最初の28日間で16億5000万視聴時間、94カ国で1位。エミー賞を受賞し、韓国コンテンツが吹き替えなしで世界中の視聴者に深く響くことを証明しました。',

    // Timeline titles
    'KBS Founded — Korean TV Begins': 'KBS設立 — 韓国テレビの始まり',
    'Daily Dramas & Family Serials Dominate': '日常ドラマと家族連続劇の時代',
    '질투 — The First Modern Romance Drama': '질투 — 最初の現代ロマンスドラマ',
    'Hallyu Drama Wave Begins in Asia': 'アジアで韓流ドラマの波が始まる',
    '겨울연가 — Korea Wins Hearts in Japan': '겨울연가 — 日本の心を掴んだ韓国',
    'Historical Dramas Dominate — Daejanggeum Era': '時代劇全盛期 — 대장금の時代',
    '별에서 온 그대 — China Boom': '별에서 온 그대 — 中国ブーム',
    'Netflix Era — 사랑의 불시착 & 이태원 클라쓰': 'ネットフリックス時代 — 사랑의 불시착 & 이태원 클라쓰',
    '오징어 게임 — History Is Made': '오징어 게임 — 歴史が作られた',
    'The Global K-Drama Era': 'グローバルK-ドラマ時代',

    // Timeline descriptions
    'The Korean Broadcasting System launches Korea\'s first official television station. Early dramas are short, government-supervised productions focused on social and moral themes. Black-and-white TV reaches only a small percentage of households.':
      '韓国放送公社が韓国初の公式テレビ局を開局しました。初期のドラマは短く、社会的・道徳的テーマに焦点を当てた政府監督の作品でした。白黒テレビは少数の家庭にしか普及していませんでした。',
    'Korean households gather around nightly soap operas airing 5–6 days a week. Family dramas (가족 드라마) dealing with generational conflict, marriage, and in-law relationships become the dominant genre. The formula still survives on morning broadcasts today.':
      '韓国の家庭が週5〜6日放映される夜の連続ドラマを中心に集まりました。世代間の葛藤、結婚、嫁姑関係を扱う家族ドラマが主流ジャンルになりました。このパターンは今日も朝の放送で生き続けています。',
    '질투 (Jealousy, 1992) introduces the modern K-Drama romance formula: young urban professionals, will-they-won\'t-they tension, and stylish cinematography. This marks a shift from family serials to youth-targeted melodrama — a template still used today.':
      '질투（嫉妬、1992年）は現代K-ドラマのロマンス公式を確立しました：若い都市の専門職、いつ付き合うかの緊張感、スタイリッシュな映像美。家族連続劇から若者向けメロドラマへの転換を示し、今日でも使われる定番です。',
    '별은 내 가슴에 (Star in My Heart, 1997) and 가을동화 (Autumn in My Heart, 2000) export to China, Vietnam, and Southeast Asia, triggering the first Korean Wave. Audiences fall in love with Korean actors, fashion, and music through drama OSTs.':
      '별은 내 가슴에（1997年）と가을동화（2000年）が中国、ベトナム、東南アジアに輸出され、最初の韓流を巻き起こしました。視聴者はドラマOSTを通じて韓国の俳優、ファッション、音楽に恋しました。',
    '겨울연가 (Winter Sonata) airs on NHK Japan and becomes a cultural phenomenon. Bae Yong-joon becomes "욘사마" overnight. The drama sparks a Korean cultural tourism explosion — hundreds of thousands of Japanese fans travel to filming locations. Korea\'s soft power strategy is born.':
      '겨울연가（冬のソナタ）が日本NHKで放映され文化的現象になりました。배용준が一夜にして「욘사마」になりました。このドラマは韓国文化観光ブームを引き起こし — 数十万人の日本人ファンが撮影地を訪れました。韓国のソフトパワー戦略が生まれました。',
    '대장금 (Jewel in the Palace, 2003) achieves 57% domestic ratings and exports to 90+ countries, introducing Korean culture through Joseon-era food and palace life. 주몽 (Jumong, 2006) breaks records in China and the Middle East, expanding Hallyu beyond romance.':
      '대장금（2003年）は国内視聴率57%を達成し90カ国以上に輸出、朝鮮時代の料理と宮廷生活を通じて韓国文化を紹介しました。주몽（2006年）は中国と中東で記録を更新し、韓流をロマンス以上に広げました。',
    '별에서 온 그대 (My Love from the Star, 2013) becomes a massive hit in China. The "치맥" (chicken + beer) scene single-handedly boosted Korean chicken restaurant exports to China. Korean drama product placement becomes a billion-dollar industry.':
      '별에서 온 그대（2013年）が中国で大ヒットになりました。「치맥」（チキン＋ビール）のシーン一つで中国への韓国チキンレストラン輸出が急増しました。韓国ドラマのPPLが数十億ドル産業になりました。',
    'Netflix begins licensing and co-producing K-Dramas, giving global audiences simultaneous access with subtitles in 30+ languages. 사랑의 불시착 and 이태원 클라쓰 reach audiences in over 100 countries without any broadcast adaptation.':
      'Netflixがk-ドラマのライセンスと共同制作を開始し、30カ国語以上の字幕で世界の視聴者に同時配信されるようになりました。사랑의 불시착와 이태원 클라쓰は放送改編なしで100カ国以上の視聴者に届きました。',
    '오징어 게임 premieres September 17, 2021. It becomes Netflix\'s most-watched series ever — 1.65 billion hours in its first 28 days, #1 in 94 countries. It wins Emmy Awards for directing and acting (Lee Jung-jae). The word 달고나 (dalgona) trends worldwide.':
      '오징어 게임が2021年9月17日に初公開されました。Netflix史上最多視聴シリーズになりました — 最初の28日間で16億5000万時間、94カ国で1位。監督・演技（이정재）部門でエミー賞を受賞し、달고나という言葉が世界的にトレンド入りしました。',
    '더 글로리 (The Glory), 무빙 (Moving), 마스크걸 (Mask Girl), and 경성크리처 demonstrate the breadth of Korean storytelling — revenge melodrama to monster horror. Netflix, Disney+, and Apple TV+ all compete for K-Drama content deals.':
      '더 글로리、무빙、마스크걸、경성크리처が韓国ストーリーテリングの幅を示しました — 復讐メロドラマからモンスターホラーまで。Netflix、Disney+、Apple TV+がK-ドラマのコンテンツ契約をめぐって競争しています。',

    // How K-Dramas Are Made intro and photo captions
    'Korean drama production is unlike Hollywood. Most dramas are shot while airing — writers and directors respond to audience reactions in real time. Understanding this system explains why K-Dramas feel so immediate and emotionally unpredictable.':
      '韓国ドラマ制作はハリウッドとは異なります。ほとんどのドラマは放映中に撮影されます — 脚本家と監督がリアルタイムで視聴者の反応に応じます。このシステムを理解すれば、K-ドラマがなぜそれほど即時的で感情的に予測不可能に感じられるかが分かります。',
    'Unlike American TV which films entire seasons before broadcast, most K-Dramas film episodes days — sometimes hours — before they air. Writers can change storylines based on viewer ratings, fan comments, and trending social media reactions. Actors have been known to receive scripts the night before filming.':
      '放映前にシーズン全体を撮影するアメリカのTVと違い、ほとんどのK-ドラマは放映の数日前 — 時には数時間前 — にエピソードを撮影します。脚本家は視聴率、ファンのコメント、SNSのトレンドに基づいてストーリーラインを変えることができます。俳優が撮影前夜に台本を受け取ることもあります。',
    'K-Drama OSTs are chart-topping releases in their own right. Major artists like IU, Taeyeon, Baekhyun, and Paul Kim record drama songs that become national hits. OST songs replay during emotional scenes so frequently that hearing the song outside the drama instantly triggers the emotional memory.':
      'K-ドラマのOSTはそれ自体がチャートトップを記録します。IU、テヨン、ベクヒョン、폴 킴などの大物アーティストが国民的ヒットになるドラマソングを録音します。感動的なシーンで何度もOSTが流れるため、ドラマ以外でその曲を聞くだけで感動の記憶が甦ります。',
    'Korean webtoons (vertical-scroll digital comics) have become a primary source for drama scripts. 이태원 클라쓰, 유미의 세포들, 무빙, 지금 우리 학교는, and 스위트홈 all began as Naver Webtoon series. Reading the webtoon before watching is a popular Korean fan activity.':
      '韓国のウェブトゥーン（縦スクロールのデジタルコミック）がドラマ脚本の主要な原作になりました。이태원 클라쓰、유미의 세포들、무빙、지금 우리 학교는、스위트홈はすべてNAVERウェブトゥーン連載作品として始まりました。視聴前にウェブトゥーンを読むことが人気の韓国ファン活動です。',

    // Comparison table header and cells
    '🌍 K-Drama vs American TV vs J-Drama': '🌍 K-ドラマ vs アメリカTV vs 日本ドラマ',
    'Episodes per season': '1シーズンのエピソード数',
    'Production style': '制作スタイル',
    'Seasons / Continuity': 'シーズン・継続性',
    'Romance pacing': 'ロマンスの展開ペース',
    'OST / Music role': 'OST・音楽の役割',
    'Platform': 'プラットフォーム',
    'Fan influence on plot': 'ファンのストーリーへの影響',
    'Usually 16 (range: 6–32)': '通常16話（範囲：6〜32話）',
    '13–24 (or unlimited seasons)': '13〜24話（または無制限のシーズン）',
    'Usually 10–12': '通常10〜12話',
    'Live-shoot (filming airs in days)': '生放送撮影（撮影は数日で放映）',
    'Pre-produced (months ahead)': '事前制作（数ヶ月前）',
    'Semi-live (2–3 weeks ahead)': 'セミライブ（2〜3週間前）',
    'Mostly single-season complete stories': '主に単一シーズンの完結した物語',
    'Multi-season with returning casts': '同じキャストで複数シーズン',
    'Usually single-season; sequels rare': '通常単一シーズン；続編は稀',
    'Slow burn — confession often episode 14+': 'スローバーン — 告白はエピソード14以降が多い',
    'Fast relationship progression': '関係の発展が早い',
    'Very slow; physical distance common': '非常に遅い；物理的な距離が一般的',
    'Central; released as standalone hits': '中心的；スタンドアロンのヒットとしてリリース',
    'Background; licensing-driven': '背景音楽；ライセンス主導',
    'J-Pop tie-ins common': 'J-Popタイアップが一般的',
    'KBS, MBC, SBS, tvN + Netflix': 'KBS、MBC、SBS、tvN + Netflix',
    'Netflix, HBO, ABC, NBC, etc.': 'Netflix、HBO、ABC、NBC など',
    'Fuji TV, TBS + Netflix': 'フジテレビ、TBS + Netflix',
    'Very high — can change storylines': '非常に高い — ストーリーラインを変えることができる',
    'Some (petition campaigns)': '一部（請願キャンペーン）',
    'Moderate': '中程度',

    // kr-trans parenthetical after comparison table practice sentence
    '(How many episodes does a K-Drama usually have?)': '（韓国ドラマは通常何話ありますか？）',

    // Drama Genres section
    '🎭 Drama Genres · 드라마 장르': '🎭 ドラマジャンル · 드라마 장르',
    'K-Drama spans far beyond romance. From epic historical costume dramas to brutal revenge thrillers, Korean television has perfected every genre. Each genre carries its own vocabulary, character archetypes, and emotional language patterns.':
      'K-ドラマはロマンスをはるかに超えます。壮大な時代劇コスチュームドラマから残酷な復讐スリラーまで、韓国テレビはあらゆるジャンルを完成させました。各ジャンルには独自の語彙、キャラクターのアーキタイプ、感情的な言語パターンがあります。',
    'Romance': 'ロマンス',
    'Historical / Sageuk': '時代劇 / 사극',
    'Thriller / Mystery': 'スリラー / ミステリー',
    'Fantasy': 'ファンタジー',
    'Medical Drama': '医療ドラマ',
    'Legal / Crime Drama': '法廷 / 犯罪ドラマ',
    'Family Drama': '家族ドラマ',
    'Youth / Coming-of-Age': '青春 / 成長ドラマ',
    'The backbone of K-Drama. Slow-burn attraction, misunderstandings, and an emotionally satisfying confession are the formula. Often paired with another genre (fantasy romance, medical romance, office romance).':
      'K-ドラマの根幹。じわじわ燃え上がる引き合い、すれ違い、感動的な告白が定番公式です。別のジャンルと組み合わせることが多い（ファンタジーロマンス、医療ロマンス、職場ロマンス）。',
    'Set in Joseon Dynasty (1392–1897) or earlier kingdoms. Features elaborate costumes, palace politics, and formal Korean speech (존댓말). One of Korea\'s most exported genres — audiences worldwide love the epic scale.':
      '朝鮮王朝（1392〜1897年）またはそれ以前の王国を舞台にしています。精巧な衣装、宮廷政治、格式体の韓国語（존댓말）が特徴です。韓国で最も輸出されるジャンルの一つ — 世界中の視聴者が壮大なスケールを愛しています。',
    'Known for tight plotting, morally complex villains, and social commentary. Often exposes dark sides of Korean society — class divide, corporate corruption, family secrets. Cliffhangers are especially brutal in this genre.':
      '緊密な構成、道徳的に複雑な悪役、社会的批評で知られています。韓国社会の暗い側面をしばしば露わにします — 階級格差、企業腐敗、家族の秘密。このジャンルのクリフハンガーは特に残酷です。',
    'Combines supernatural elements with romance and emotion. Gods, goblins, time travelers, and immortals fall in love with humans. Fantasy dramas often have the most iconic OSTs and visual storytelling in the entire genre.':
      '超自然的要素をロマンスと感動と組み合わせています。神、ゴブリン、タイムトラベラー、不死者が人間と恋に落ちます。ファンタジードラマはジャンル全体の中で最も象徴的なOSTと視覚的ストーリーテリングを持つことが多いです。',
    'Korean medical dramas blend high-stakes surgery scenes with office romance and ethical dilemmas. Also great for learning medical and formal Korean vocabulary in context. Hospital settings allow natural speech level mixing.':
      '韓国の医療ドラマは高リスクの手術シーンを職場ロマンスと倫理的ジレンマと融合させています。また、文脈の中で医療と格式体の韓国語語彙を学ぶのにも最適です。病院の設定は自然な敬語レベルの混在を可能にします。',
    'Lawyers, prosecutors, and detectives navigating a justice system that often favors the powerful. Korean legal dramas frequently target corruption and social inequality — making them both entertaining and politically resonant.':
      '強者に有利な司法制度を乗り越えようとする弁護士、検察官、刑事たち。韓国の法廷ドラマは汚職と社会的不平等を頻繁にテーマにし、娯楽と政治的共鳴を両立させています。',
    'The oldest and most consistently popular K-Drama genre. Multi-generational stories about family conflict, inheritance, marriage, and reconciliation. The best examples of natural Korean speech — especially polite speech between family members of different ages.':
      '最も古くコンスタントに人気のあるK-ドラマジャンルです。家族の葛藤、相続、結婚、和解に関する多世代の物語。自然な韓国語の最良の例 — 特に異なる年齢の家族間の丁寧な言葉遣い。',
    'School settings, first loves, college entrance exams, and the pressures of Korean youth culture. Excellent for beginners — the vocabulary is everyday and relatable. Characters speak natural 반말 (casual speech) among peers.':
      '学校を舞台に、初恋、大学入試、韓国の青年文化のプレッシャーを描きます。初心者に最適 — 語彙が日常的で共感しやすいです。登場人物が仲間内で自然な반말（カジュアルな話し方）を使います。',
    // Genre notable works
    'Notable: 사랑의 불시착, 도깨비, 별에서 온 그대': '注目作：사랑의 불시착, 도깨비, 별에서 온 그대',
    'Notable: 대장금, 주몽, 미스터 션샤인, 킹덤': '注目作：대장금, 주몽, 미스터 션샤인, 킹덤',
    'Notable: 오징어 게임, 빈센조, 더 글로리, 비밀의 숲': '注目作：오징어 게임, 빈센조, 더 글로리, 비밀의 숲',
    'Notable: 도깨비, 별에서 온 그대, 호텔 델루나, 무빙': '注目作：도깨비, 별에서 온 그대, 호텔 델루나, 무빙',
    'Notable: 슬기로운 의사생활, 낭만닥터 김사부, 뷰티 인사이드': '注目作：슬기로운 의사생활, 낭만닥터 김사부, 뷰티 인사이드',
    'Notable: 빈센조, 이상한 변호사 우영우, 비밀의 숲, 악의 꽃': '注目作：빈센조, 이상한 변호사 우영우, 비밀의 숲, 악의 꽃',
    'Notable: 응답하라 1988, 스카이 캐슬, 나의 아저씨': '注目作：응답하라 1988, 스카이 캐슬, 나의 아저씨',
    'Notable: 응답하라 1988, 학교 2015, 지금 우리 학교는': '注目作：응답하라 1988, 학교 2015, 지금 우리 학교는',

    // Must-Watch K-Dramas
    '🎭 Must-Watch K-Dramas · 필수 드라마': '🎭 必見K-ドラマ · 필수 드라마',
    'These dramas defined K-Drama history, broke viewership records, or represent the best entry points for Korean learners. Each one teaches different vocabulary, speech styles, and cultural context.':
      'これらのドラマはK-ドラマの歴史を定義し、視聴率記録を塗り替え、または韓国語学習者にとって最良の入口を提供します。それぞれが異なる語彙、話し方のスタイル、文化的背景を教えてくれます。',
    'A South Korean heiress paragliding accident crash-lands her in North Korea, where she falls for a military officer. One of the highest-rated K-dramas of all time. Excellent for hearing both South and North Korean speech differences.':
      'パラグライダーの事故で北朝鮮に不時着した韓国財閥の相続人が、軍人と恋に落ちます。歴代最高視聴率K-ドラマの一つ。南北韓国の話し方の違いを比較して聞くのに最適。',
    'Debt-ridden contestants play deadly children\'s games for ₩45.6 billion. Netflix\'s most-watched series ever. Teaches raw, colloquial, working-class Korean alongside sharp social commentary on Korea\'s wealth gap.':
      '借金まみれの参加者が456億ウォンをかけて命懸けの子どものゲームをします。Netflix史上最多視聴シリーズ。韓国の格差社会への鋭い社会批評とともに、生の口語的な庶民の韓国語を教えてくれます。',
    'An immortal goblin seeks a human bride to end his eternal life. Stunning OST and breathtaking cinematography shot in Quebec. Gong Yoo\'s delivery is a masterclass in formal-to-casual Korean speech transitions.':
      '永遠の命を終わらせるために人間の花嫁を探す不死のゴブリンの物語。カナダのケベックで撮影された絶美のOSTと映像美。공유の演技は格式体からカジュアルな韓国語への移行の傑作です。',
    'Five families on the same alley in Dobong-gu, Seoul in 1988. The most beloved K-Drama among Koreans themselves — a nostalgic portrait of neighborhood culture and family warmth. Best drama for learning natural, everyday Korean speech.':
      '1988年のソウル道峰区の同じ路地に住む5家族の物語。韓国人自身が最も愛するK-ドラマ — 近所の文化と家族の温かさを描いたノスタルジックな肖像。自然で日常的な韓国語を学ぶための最高のドラマ。',
    'An alien who landed on Earth during the Joseon era falls in love with a top actress 400 years later. Sparked an enormous Korean drama boom in China — the "치맥" (chicken + beer) scene became a food export phenomenon.':
      '朝鮮時代に地球に着陸した宇宙人が400年後に人気女優と恋に落ちます。中国で巨大な韓国ドラマブームを引き起こし — 「치맥」（チキン＋ビール）のシーンが食品輸出現象になりました。',
    'A soldier and a doctor fall in love amid conflict zones and humanitarian crises. Sparked the Korean Wave across China and Southeast Asia. Taught global audiences Korean military courtesy speech — 충성! (loyalty!).':
      '紛争地帯と人道的危機の中で兵士と医師が恋に落ちます。中国と東南アジア全体で韓流を引き起こしました。世界の視聴者に韓国の軍隊敬語を教えました — 충성!（忠誠！）。',
    'A psychiatric ward caregiver and a children\'s book author with antisocial personality disorder heal each other. A rare drama openly discussing mental health in Korean society. Rich, poetic Korean vocabulary throughout.':
      '精神病棟の介護士と反社会性パーソナリティ障害を持つ絵本作家がお互いを癒します。韓国社会でメンタルヘルスを公に議論する稀なドラマ。全編を通じて豊かで詩的な韓国語語彙が特徴です。',
    'A Korean-Italian mafia consigliere returns to Korea and battles corrupt conglomerates. Teaches Korean legal vocabulary, corporate speech, and sharp dark humor. 송중기\'s Italian-Korean code-switching is iconic.':
      '韓国系イタリア人マフィアの法律顧問が韓国に戻り、腐敗した大企業と戦います。韓国の法律語彙、企業言語、鋭いブラックユーモアを教えてくれます。송중기のイタリア語−韓国語のコードスイッチングは象徴的です。',
    'A woman who suffered brutal school bullying orchestrates a meticulous 20-year revenge plan. One of the most-watched K-Dramas on Netflix globally in 2023. Teaches formal, cold, calculated Korean — and social dynamics vocabulary.':
      '壮絶ないじめを受けた女性が20年にわたる綿密な復讐計画を実行します。2023年に世界のNetflixで最も視聴されたK-ドラマの一つ。格式的で、冷静で、計算された韓国語と社会力学の語彙を教えてくれます。',
    'A brilliant autistic lawyer navigates the Korean legal system and human connection. Became a global phenomenon — #2 on Netflix worldwide in 2022. Features exceptionally clear, precise Korean speech ideal for intermediate learners.':
      '自閉症スペクトラムを持つ天才弁護士が韓国の法制度と人間関係を乗り越えます。グローバル現象となり — 2022年世界のNetflixで第2位。中級学習者に理想的な非常に明確で正確な韓国語が特徴です。',
    'Five doctors who\'ve been friends since medical school navigate hospital life, friendship, and love. Warm ensemble storytelling with one of the best soundtracks in K-Drama history. Excellent for learning Korean medical vocabulary and friendship speech patterns.':
      '医学部からの友人である5人の医師が病院生活、友情、愛を乗り越えます。K-ドラマ史上最高のサントラの一つを持つ温かいアンサンブルストーリーテリング。韓国の医療語彙と友情の話し方パターンを学ぶのに最適。',
    'A zombie plague during the Joseon Dynasty threatens the kingdom as the Crown Prince races to uncover a conspiracy. Netflix\'s first Korean original series. Combines historical Korean (사극체) with modern production values.':
      '朝鮮王朝のゾンビの疫病が王国を脅かす中、世子が陰謀を暴こうと奔走します。Netflixの最初の韓国オリジナルシリーズ。史劇体（사극체）の韓国語を現代的な制作価値と組み合わせています。',

    // Drama tags
    'Netflix': 'ネットフリックス',
    'Best for Learners': '学習者におすすめ',
    'Thriller': 'スリラー',
    'Colloquial Korean': '口語韓国語',
    'Classic': 'クラシック',
    'Family': '家族',
    'Melodrama': 'メロドラマ',
    'Crime': '犯罪',
    'Legal': '法廷',
    'Medical': '医療',
    'Historical': '時代劇',

    // K-Drama Tropes
    '🎯 K-Drama Tropes & Clichés · 드라마 클리셰': '🎯 K-ドラマの定番 & クリシェ · 드라마 클리셰',
    'K-Drama viewers around the world have come to love — and lovingly mock — the genre\'s recurring storytelling devices. Knowing these tropes helps you predict what\'s coming, laugh along with Korean fans, and learn the specific vocabulary each one brings.':
      '世界中のK-ドラマ視聴者がこのジャンルの繰り返すストーリーテリング装置を愛し — 愛情込めて笑いのネタにしています。これらの定番を知ることで、次の展開を予測し、韓国ファンと笑い合い、それぞれが持つ特定の語彙を学べます。',
    'Trope · 클리셰': '定番 · 클리셰',
    'Chaebol Male Lead': '재벌（チェボル）男性主人公',
    'Birth Secret': '出生の秘密',
    'Amnesia': '記憶喪失',
    'Umbrella Scene': '傘のシーン',
    'Wrist Grab': '手首つかみ',
    'Misunderstanding & Reconciliation': '誤解と和解',
    'Mother-in-Law Conflict': '姑との葛藤',
    'Airport Running Scene': '空港のランニングシーン',
    'The arrogant but secretly warm CEO or heir of a massive Korean conglomerate who falls for an ordinary woman. His cold exterior melts slowly across 14 episodes. Often drives a black Porsche, lives in a penthouse, and has an evil mother.':
      '巨大な韓国財閥のCEOまたは後継者で、傲慢だが内心は温かく、普通の女性に恋をします。冷たい外見が14話にわたってゆっくりと解けていきます。よく黒のポルシェを運転し、ペントハウスに住み、意地悪な母親がいます。',
    'A character discovers they are not who they thought — adopted, secretly royalty, or the lost child of a villain. This revelation always arrives at a dramatically convenient moment, usually just as the romance was going well.':
      '登場人物が自分が思っていた人物ではないことを発見します — 養子、秘密の王族、または悪役の迷子の子供。この告白は常に劇的に都合のよい瞬間に到来します、通常ちょうどロマンスが順調に進んでいたときに。',
    'A character loses all memory of the love story — often triggered by a car accident, trauma, or magical curse. Forces the couple to fall in love all over again. Teaches vocabulary for hospitals, emotions of loss, and gentle reintroduction scenes.':
      '登場人物が恋愛の記憶をすべて失います — 多くの場合、交通事故、トラウマ、または魔法の呪いによって引き起こされます。カップルを再び恋に落ちるように強います。病院の語彙、喪失の感情、優しい再紹介シーンの語彙を教えます。',
    'Two characters share an umbrella in the rain — one covers the other, getting wet themselves. This selfless act signals romantic interest more clearly than any words. If the male lead gets wet protecting the female lead, viewers know it\'s serious.':
      '二人の登場人物が雨の中で傘を共有します — 一人が相手を傘で覆い、自分が濡れます。この無私な行為はいかなる言葉よりも明確に恋愛感情を示します。男性主人公が女性主人公を守るために濡れると、視聴者は本気だと分かります。',
    'The lead grabs the other character\'s wrist and pulls them away from danger or toward a confession. A classic K-Drama substitute for handholding — more dramatic, more urgent. Key lines for these scenes: 잠깐만요! (Wait!) and 어디 가요? (Where are you going?)':
      '主人公が相手の手首をつかんで危険から遠ざけるか、告白へと引き寄せます。手を握ることの定番のK-ドラマ代替 — より劇的で、より緊急。このシーンの主要なセリフ：잠깐만요!（待って！）와 어디 가요?（どこへ行くの？）。',
    'A misunderstanding tears the couple apart near the finale. They spend 2 episodes in cold silence before reconciling. Key Korean for the reunion scene: 미안해 (I\'m sorry) + 보고 싶었어 (I missed you).':
      '誤解がフィナーレ近くでカップルを引き離します。和解前に2話にわたって冷たい沈黙が続きます。再会シーンの主要な韓国語：미안해（ごめん）＋보고 싶었어（会いたかった）。',
    'The male lead\'s mother opposes the relationship because the female lead is from a lower social class. This conflict drives half of all K-Drama plots. Great for learning hierarchical Korean speech — formal vs informal language signaling respect, defiance, or submission.':
      '女性主人公の低い社会階層を理由に、男性主人公の母親が関係に反対します。この葛藤がすべてのK-ドラマプロットの半分を動かします。階層的な韓国語の話し方を学ぶのに最適 — 尊重、反抗、服従を示す格式体と非格式体。',
    'A character races through Incheon Airport to stop their love from leaving Korea forever — barely catching them at the gate. Classic K-Drama finale material. Key vocabulary: 가지 마세요! (Don\'t go!), 사랑해! (I love you!), 잠깐만요! (Wait!)':
      '登場人物が仁川空港を走り、愛する人が永遠に韓国を離れるのを止めようとします — ギリギリでゲートで捕まえます。定番のK-ドラマフィナーレ素材。主要語彙：가지 마세요!（行かないで！）、사랑해!（愛してる！）、잠깐만요!（待って！）。',

    // Speech Levels
    '💡 Speech Levels in K-Dramas · 드라마 속 말투': '💡 K-ドラマの敬語レベル · 드라마 속 말투',
    'Korean has multiple speech levels (경어법). K-Dramas are a living classroom for seeing how speech changes based on relationship, hierarchy, and emotional state. When a character switches speech levels, it is always a storytelling moment.':
      '韓国語には複数の敬語レベル（경어법）があります。K-ドラマは関係、階層、感情状態に基づいて話し方がどのように変わるかを見るための生きた教室です。登場人物が敬語レベルを切り替えるとき、それは常にストーリーテリングの瞬間です。',
    'Speech Level Switching · 말 놓기': '敬語レベルの切り替え · 말 놓기',
    // show-desc text nodes split by <span style="font-family:var(--font-korean)">
    'The most formal speech level. Used in news broadcasts, military, official settings, and when addressing strangers with maximum respect. Example:':
      '最も格式ある話し方。ニュース放送、軍隊、公式の場、そして最大限の敬意で見知らぬ人に話しかける際に使われます。例：',
    '(Where are you going? — very formal). Used heavily in 사극 (historical dramas).':
      '（どこに行かれますか？ — 非常に格式体）。사극（時代劇）でよく使われます。',
    'The most common drama speech level. Polite but not stiff — used between coworkers, acquaintances, and characters who haven\'t yet become close. Ends in -아요/어요/해요. Example:':
      '最も一般的なドラマの話し方。丁寧だが堅苦しくない — 同僚、知人、まだ親しくなっていない登場人物間で使われます。-아요/어요/해요で終わります。例：',
    '(Are you okay?). Beginners should learn this level first.':
      '（大丈夫ですか？）。初心者はこのレベルを最初に学ぶべきです。',
    'Casual speech used among close friends, couples, or older speaking to younger. In dramas, characters switching from 해요체 to 반말 is a major romantic milestone — signaling "we\'re close now." Example:':
      '親しい友人、恋人、または年上から年下に使うカジュアルな話し方。ドラマでは、登場人物が해요체から반말に切り替えることが重要なロマンティックな節目です — 「今は親しい仲だよ」を示します。例：',
    '— shorter, warmer, more intimate.': '— より短く、より温かく、より親密。',
    'When a drama couple switches from 해요체 to 반말, it is a cinematic event. Often preceded by:':
      'ドラマのカップルが해요체から반말に切り替えるとき、それは映画的な出来事です。しばしば前置きとして：',
    '(Shall we drop formal speech?) — meaning "shall we become closer?" The answer yes signals a relationship turning point.':
      '（格式体をやめにしましょうか？）— 「もっと親しくなりましょうか？」を意味します。返答の「はい」が関係の転換点を示します。',

    // Speech Level grammar box
    '📘 Speech Level Conversion — Same Sentence, Four Registers': '📘 敬語レベル変換 — 同じ文の4つのレジスター',
    '— "Are you leaving?" (formal / military / news)': '— 「行かれますか？」（フォーマル・軍隊・ニュース）',
    '— "Are you leaving?" (polite, everyday)': '— 「行きますか？」（丁寧・日常）',
    '— "You leaving?" (casual, friends / couples)': '— 「行く？」（カジュアル・友人・恋人）',
    '— "Get out!" / "Go!" (commanding, angry — drama villain territory)': '— 「出て行け！」/「行け！」（命令・怒り — ドラマの悪役的）',

    // Vocabulary section
    '📖 Essential Drama Vocabulary · 드라마 핵심 어휘': '📖 ドラマ必須語彙 · 드라마 핵심 어휘',
    'K-Dramas are one of the best ways to absorb natural Korean. The vocabulary below covers the story terms, character names, and emotional language you\'ll hear in almost every drama.':
      'K-ドラマは自然な韓国語を吸収する最良の方法の一つです。以下の語彙は、ほぼすべてのドラマで耳にするストーリー用語、キャラクター名、感情的な言語を網羅しています。',
    '📺 이야기 · Story & Plot': '📺 이야기 · ストーリーとプロット',
    '👥 인물 · Characters & Relationships': '👥 인물 · 登場人物と関係',
    '💗 감정 · Emotions & Feelings': '💗 감정 · 感情と気持ち',

    // Vocab table — Story & Plot (text nodes after <span class="kor-trans">)
    'TV drama / series': 'TVドラマ / シリーズ',
    'Episode': 'エピソード',
    'Ending / conclusion': '結末 / 結論',
    'Foreshadowing': '伏線',
    'Plot twist / reversal': 'どんでん返し / 逆転',
    'Cliffhanger': 'クリフハンガー',
    'Flashback': 'フラッシュバック',
    'Filming location': '撮影地',
    'Original Soundtrack (drama songs)': 'オリジナルサウンドトラック（ドラマの歌）',
    'Historical drama': '時代劇',

    // Vocab table — Characters & Relationships
    'Protagonist / main character': '主人公 / メインキャラクター',
    'Male lead': '男性主人公',
    'Female lead': '女性主人公',
    'Supporting actor / side character': '助演俳優 / サブキャラクター',
    'Villain / antagonist role': '悪役 / 敵役',
    'Chaebol / wealthy conglomerate heir': '財閥 / 裕福な財閥の後継者',
    'Love triangle': '三角関係',
    'First love': '初恋',
    'One-sided / unrequited love': '片思い / 報われない愛',
    'Fate / destiny': '運命 / 宿命',

    // Vocab table — Emotions & Feelings
    'Heart flutters with excitement (no direct English equivalent)': '胸がときめく（直訳なし）',
    'Thump-thump (heartbeat sound — nervous or excited)': 'ドキドキ（心拍音 — 緊張または興奮）',
    'Tears / crying': '涙 / 泣くこと',
    'Longing / deep yearning for someone': '切望 / 誰かへの深い恋しさ',
    'Misunderstanding': '誤解',
    'Lie / deception': '嘘 / 欺き',
    'Forgiveness': '許し',
    'Revenge': '復讐',
    'Emotional wound / hurt': '心の傷 / 傷つき',
    'Healing / recovery': '癒し / 回復',

    // Grammar box — Expressing Emotions (text nodes split by <b>)
    '📘 Grammar Pattern: Expressing Emotions in K-Dramas': '📘 文法パターン：K-ドラマで感情を表現する',
    'Want to do ~ |': '〜したい |',
    '= "I miss you" (lit. "I want to see you") — the most iconic drama confession line': '= 「会いたい」（直訳：「会いたかった」）— 最も象徴的なドラマの告白セリフ',
    'You know that ~ |': '〜だよね |',
    '= "I was worried, you know" — adds emotional weight': '= 「心配してたんだよ」— 感情的な重みを加えます',
    'Are you really ~ing? |': '本当に〜するの？ |',
    '= "Are you really leaving?" — shocked accusation': '= 「本当に行くの？」— ショックと非難',
    '"Why are you acting like this?" — drama staple in conflict scenes with hurt or frustration': '「なんでそんなことするの？」— 傷つきや苛立ちの葛藤シーンでよく使うドラマの定番',

    // Dialogue Practice
    '💬 Dialogue Practice · 대사 연습': '💬 セリフ練習 · 대사 연습',
    'Read, listen, and shadow these drama-style conversations. Each scene uses a different speech level and emotional register — from tense first meeting to sweet confession.':
      'これらのドラマスタイルの会話を読み、聞き、シャドーイングしましょう。各シーンは緊張した初対面から甘い告白まで、異なる敬語レベルと感情的レジスターを使用します。',
    '☔ 비 오는 밤에 — A rainy night (해요체 · Polite)': '☔ 비 오는 밤에 — 雨の夜（해요체 · 丁寧体）',
    '🏢 회사에서 첫 만남 — First meeting at the office (해요체 · Polite)': '🏢 회사에서 첫 만남 — 職場での初対面（해요체 · 丁寧体）',
    '💕 고백 장면 — The confession (반말 · Casual)': '💕 고백 장면 — 告白シーン（반말 · カジュアル）',
    'Why are you so late today?': '今日なぜそんなに遅かったの？',
    'I\'m sorry. The rain was too heavy.': 'ごめんなさい。雨が強すぎて。',
    'I was worried about you, you know.': '心配してたんですよ。',
    'Those words scare me more.': 'その言葉の方が怖いです。',
    'Hello. Starting today, I\'ll be working on this team.': 'こんにちは。今日からこのチームで働くことになりました。',
    'Nice to meet you. I look forward to working with you.': 'はじめまして。よろしくお願いします。',
    'By any chance, do you know a good restaurant nearby?': 'もしかして、近くにいいレストランを知っていますか？',
    'Would you like to go together? I\'ll show you the way.': '一緒に行きませんか？ご案内します。',
    'I have something to tell you.': '伝えたいことがあるんだ。',
    'What is it? What\'s the matter?': '何？どうしたの？',
    'I... like you. A lot.': '俺...好きだよ。すごく。',
    'Me too. I like you too.': '私も。私も好き。',

    // Iconic Drama Lines section
    '🗣️ Iconic Korean Drama Lines · 드라마 명대사': '🗣️ 韓国ドラマの名セリフ · 드라마 명대사',
    'These are the lines that made Korean drama fans cry, gasp, and immediately screenshot their screens. Learn them as complete sentences — each teaches grammar, emotion vocabulary, and real Korean speech patterns.':
      'これらは韓国ドラマファンを泣かせ、息をのませ、すぐにスクリーンショットを撮らせたセリフです。完全な文として学びましょう — それぞれが文法、感情語彙、実際の韓国語の話し方パターンを教えてくれます。',

    // phrase-eng (English translations of iconic lines)
    'I missed you. (lit. "I wanted to see you.")': '会いたかった。（直訳：「会いたかった」）',
    'I\'ll protect you.': '守ってあげる。',
    'Just stay by my side.': 'ただそばにいてよ。',
    'Why did you only appear in my life now?': 'なぜ今頃になってやっと現れたの？',
    'I\'m sorry. I\'m really sorry.': 'ごめん。本当にごめん。',
    'Forget me.': '私のことを忘れて。',
    'It must be fate. / Seems like destiny.': 'これが運命なのかも。/ 運命みたいだ。',
    'I\'m okay. I\'m fine.': '大丈夫。私は大丈夫。',
    'So it was you, all along, back then.': 'あの頃、あなただったんですね。ずっと。',
    'I love you. A lot.': '愛してる。たくさん。',
    'You have to be happy. You understand?': '幸せにならなきゃ。わかった？',
    'Why are you doing this to me?': '私に何をするんですか？',

    // phrase-context notes
    '반말 · The most iconic K-Drama line. Used in reunions, confessions, and final scenes. Formal version: 보고 싶었어요.': '반말 · 最も象徴的なK-ドラマのセリフ。再会、告白、最終シーンで使われます。格式体：보고 싶었어요。',
    '반말 · Said by the male lead during a crisis. A promise of protection and devotion rolled into one sentence.': '반말 · 危機の場面で男性主人公が言います。一文に込めた守護と献身の誓い。',
    '반말 · Said when a character is emotionally vulnerable, asking for presence over promises. Extremely common at emotional peaks.': '반말 · 登場人物が感情的に傷つきやすいとき、約束よりも寄り添いを求めます。感情的な山場で非常によく使われます。',
    '반말 · Said with joy and bittersweet regret. The word 이제야 carries a unique "only now, after so long" nuance English can\'t fully capture.': '반말 · 喜びと切ない後悔を込めて言います。이제야という言葉は英語では完全に表現できない「こんなに長い時間が経ってやっと今」というニュアンスを持ちます。',
    '반말 · The reconciliation scene staple. Repetition in Korean adds emotional weight. Formal version: 죄송해요.': '반말 · 和解シーンの定番。韓国語での繰り返しが感情的な重みを加えます。格式体：죄송해요。',
    '반말 · The tragic self-sacrifice line. A character pushing away the one they love for their protection. Korean audiences know: the angst is just beginning.': '반말 · 悲劇的な自己犠牲のセリフ。登場人物が愛する人を守るために遠ざけます。韓国の視聴者は分かっています：苦悩はここから始まるのです。',
    '반말 · Said after a coincidence feels too perfect to be accidental. -인가 봐 expresses speculation based on evidence.': '반말 · 偶然が完璧すぎて偶然に見えないときに言います。-인가 봐 は証拠に基づく推測を表します。',
    '반말 · Said while clearly not being okay. One of the most used lines in K-Drama — a quiet denial of pain. When a Korean drama character says this, cry harder.': '반말 · 明らかに大丈夫ではないのに言います。K-ドラマで最も使われるセリフの一つ — 痛みの静かな否定。韓国ドラマの登場人物がこれを言ったら、もっと泣いてください。',
    '해요체 · The grand revelation line — when a character realizes the mystery person from their past is standing right in front of them.': '해요체 · 大いなる啓示のセリフ — 登場人物が自分の過去の謎の人物が目の前に立っていることに気づくとき。',
    '반말 · The most direct confession in K-Drama. 사랑해 is reserved for deep romantic love. 많이 (a lot) added after a pause makes it more vulnerable.': '반말 · K-ドラマで最も直接的な告白。사랑해 は深い恋愛的な愛のために取っておかれます。間を置いて많이（たくさん）を加えることでより傷つきやすくなります。',
    '반말 · Said during a goodbye scene — a desperate wish for the other person\'s happiness when they can no longer be together.': '반말 · さよならのシーンで言います — もう一緒にいられないときの、相手の幸せへの切実な願い。',
    '해요체 · Emotional confrontation. Confusion, hurt, and accusation combined. Can be romantic frustration or genuine anger depending on context.': '해요체 · 感情的な対決。混乱、傷つき、非難が混合します。文脈によってロマンティックな苛立ちにも本物の怒りにもなり得ます。',

    // phrase-breakdown fragments (text nodes after Korean <b> tags)
    '(to see) +': '（見る）+',
    '(wanted to) — -고 싶다 is the grammar pattern for expressing desire': '（したかった）— -고 싶다 は欲求を表す文法パターン',
    '(protect) +': '（守る）+',
    '(do for someone) +': '（〜してあげる）+',
    '(I will / promise) = "I\'ll protect (you)"': '（〜する / 約束）= 「守ってあげる」',
    '(just) +': '（ただ）+',
    '(by my side) +': '（そばに）+',
    '(please stay for me)': '（いてくれ）',
    '(why) +': '（なぜ）+',
    '(only now, finally) +': '（今になってやっと）+',
    '(appeared) — 이제야 carries regret at timing': '（現れた）— 이제야 はタイミングへの後悔を含みます',
    '= to feel apologetic (internal) vs': '= 内面的に申し訳なく感じる vs',
    '= formal apology (respect-based)': '= 格式的な謝罪（敬意ベース）',
    '(me) +': '（私）+',
    '(please / softener) +': '（ちょっと / 和らげ）+',
    '(forget, casual imperative) — 좀 softens harsh commands into pleas': '（忘れろ、カジュアル命令形）— 좀 は厳しい命令を懇願に和らげます',
    '(fate) +': '（運命）+',
    '(it seems it must be) — -인가 보다 = deducing or speculating': '（そうに違いない）— -인가 보다 = 推測や推論を表します',
    '= to be okay — when repeated, it signals the opposite: deep pain being suppressed': '= 大丈夫である — 繰り返すとき、逆を示します：深い痛みが抑えられている',
    '(back then) +': '（あの頃）+',
    '(that person) +': '（あの人）+',
    '(was you — -군요 shows surprise / realization)': '（あなただった — -군요 は驚き・気づきを示します）',
    '= to love (romantic) ·': '= 愛する（恋愛的）·',
    '= to like / have feelings for · In K-Drama, 좋아해 always precedes 사랑해 by several episodes': '= 好きである / 気持ちを持つ · K-ドラマでは좋아해 は常に사랑해 より数話先に来ます',
    '(to be happy) +': '（幸せである）+',
    '(must / have to) +': '（〜しなければならない）+',
    '(you got it?) — -야 해 expresses obligation or strong wish': '（わかった？）— -야 해 は義務または強い願いを表します',
    '(to me) +': '（私に）+',
    '(are you like this / doing this) — 이래요 is casual-polite for "acting like this"': '（こんなの / こんなことして）— 이래요 は「こんなふうに」のカジュアル丁寧語です',

    // Fan Culture & Slang
    '🍿 Drama Fan Culture & Slang · 드라마 팬 문화': '🍿 ドラマファン文化 & スラング · 드라마 팬 문화',
    'K-Drama has built a dedicated global fan culture with its own vocabulary. Korean fans invented many of these terms, and they\'ve spread globally through social media. Knowing them lets you talk about dramas like a native speaker.':
      'K-ドラマは独自の語彙を持つ熱心なグローバルファン文化を構築しました。韓国のファンがこれらの多くの用語を発明し、ソーシャルメディアを通じて世界中に広まりました。これらを知ることで、母語話者のようにドラマについて話せます。',
    'Binge-watching from episode 1 to the end in order': '第1話から最後まで順番にイッキ見すること',
    'Watching a broadcast live in real time': '放送をリアルタイムで生視聴すること',
    'Chemistry (between actors / characters)': 'ケミストリー（俳優・キャラクター間）',
    'Cringe / second-hand embarrassment (blanket kick)': '悶え / 他人の恥ずかしさで自分が恥ずかしい（布団キック）',
    'Second Lead Syndrome — rooting for the "wrong" guy': '第2主人公症候群 — 「違う」男性を応援してしまうこと',
    'Drama filming location tourism': 'ドラマ撮影地観光',
    'An iconic / legendary scene': '象徴的な / 伝説的なシーン',
    'Shipping a romantic pairing (rooting for a couple)': 'ロマンティックなカップリングを応援すること（カップルを支持すること）',
    'Literally "straight-through run." Binge-watching in sequence without skipping. The opposite is 역주행 (rewatching old content that\'s gone viral).':
      '直訳は「一直線の走り」。スキップなしに順番にイッキ見すること。反対は역주행（バイラルになった古いコンテンツを見直すこと）。',
    'Literally "protect the main broadcast." Die-hard fans 본방사수 to boost live ratings, which directly affect production decisions including script changes and episode counts.':
      '直訳は「本放送を守れ」。熱狂的なファンがライブ視聴率を上げるために본방사수します。視聴率は脚本の変更やエピソード数を含む制作の決定に直接影響します。',
    'From English "chemistry." 케미가 좋다 (great chemistry) vs 케미가 없다 (no chemistry). Also used for bromance / friendship pairs between same-sex costars.':
      '英語の「chemistry」から。케미가 좋다（ケミが良い）vs 케미가 없다（ケミがない）。同性の共演者間のブロマンス・友情ペアにも使われます。',
    'Literally "blanket kick" — the physical act of kicking your blanket from cringe/embarrassment while watching alone. A uniquely Korean expression for vicarious embarrassment.':
      '直訳は「布団蹴り」— 一人で視聴中に悶えや恥ずかしさで布団を蹴る行為。代理恥の独特の韓国語表現。',
    'The heartbreaking condition of falling in love with the secondary male lead who treats the female lead perfectly — but loses to the main lead. Named after subway Line 2. An extremely common K-Drama fan experience.':
      '女性主人公を完璧に扱うのに本命に負けてしまう第2主人公に恋してしまう、胸が痛い状態。地下鉄2号線にちなんで命名。K-ドラマファンに非常によくある体験。',
    'Visiting the actual locations where famous dramas were filmed. A massive Korean tourism driver — 겨울연가 filming locations on 남이섬 still draw tourists 20+ years later.':
      '有名なドラマが撮影された実際の場所を訪れること。韓国観光の大きな牽引力 — 남이섬の겨울연가撮影地は20年以上経った今でも観光客を集めています。',
    'Literally "famous great scene." K-Drama fan culture is built around discussing 명장면 — the umbrella scene, the rooftop confession, the wrist grab. Also used sarcastically for hilariously bad scenes.':
      '直訳は「有名な名シーン」。K-ドラマファン文化は명장면を語り合うことを中心に構築されています — 傘のシーン、屋上の告白、手首つかみ。面白いほど悪いシーンに皮肉的にも使われます。',
    '쉽 (from English "ship") is now widely used. 커플링 (coupling) is the original Korean fan term. Fans debate endlessly whether the leads should end up together or whether the second lead deserves the win.':
      '쉽（英語の「ship」から）は今や広く使われています。커플링（カップリング）が元々の韓国のファン用語。主人公たちが結ばれるべきか、第2主人公が勝ちを得るべきかをファンが延々と議論します。',

    // Fan culture phrase-breakdown example sentences (text node after <span style> Korean)
    '— "I\'m going to binge Vincenzo tonight from start to finish."': '— 「今夜빈센조を最初から最後までイッキ見するよ。」',
    '— "I have to watch it live tonight!" — reflects how ratings still matter in Korean TV culture.': '— 「今夜リアルタイムで見なきゃ！」— 視聴率が韓国TV文化においてまだ重要であることを反映しています。',
    '— "Their chemistry is insane!" — a standard comment under any good drama clip.': '— 「二人のケミが最高！」— 良いドラマクリップの下に必ずあるコメント。',
    '— "Every time I watch this scene I cringe so hard (blanket-kick)."': '— 「このシーンを見るたびに悶える（布団蹴り）。」',
    '— "I\'ve caught Second Lead Syndrome..." — said with tragic resignation.': '— 「2호선 증후군になっちゃった…」— 悲劇的な諦めと共に言われます。',
    'Famous locations: 남이섬 (Nami Island · 겨울연가), 광화문 (Gwanghwamun · 도깨비), 인천 차이나타운 (빈센조 filming area)': '有名な場所：남이섬（ナミ島 · 겨울연가）、광화문（光化門 · 도깨비）、인천 차이나타운（빈센조 撮影エリア）',
    '— "This is a legendary scene for the ages."': '— 「これは永遠に語り継がれる名シーンだ。」',
    '— "I genuinely ship this couple."': '— 「このカップルを本当に応援してる。」',

    // Tip box
    '드라마로 한국어 공부하기 — How to Study Korean with K-Dramas': 'K-ドラマで韓国語を学ぶ方法',
    'The most effective method is': '最も効果的な方法は',
    'active watching': '能動的視聴',
    '— pause when you hear an unfamiliar word, rewind and listen again, then shadow (repeat aloud) the line. Korean subtitles (한국어 자막) train your reading speed. Start with': '— 聞き慣れない単語が出たら一時停止し、巻き戻してもう一度聞き、セリフをシャドーイング（声に出して繰り返す）しましょう。韓国語字幕（한국어 자막）が読書速度を鍛えます。まず',
    'for natural everyday Korean, then': 'で自然な日常韓国語を学び、次に',
    'for clear, precise speech at intermediate level.': 'で中級レベルの明確で正確な話し方を練習しましょう。',

    // ── K-Food page headings and captions ─────────────────────
    '🌍 K-Food Goes Global · 한국 음식의 세계화': '🌍 K-フードの世界進出 · 한국 음식의 세계화',
    '🔥 Foods That Conquered the World · 세계를 정복한 한국 음식': '🔥 世界を制した韓国料理 · 세계를 정복한 한국 음식',
    '📅 K-Food History Timeline · 한국 음식 역사': '📅 K-フード歴史タイムライン · 한국 음식 역사',
    'Ramyeon: $1.52B Exported in 2025': 'ラーメン：2025年輸出額15億2千万ドル',
    'Bibigo Mandu: 50+ Countries': 'ビビゴ餃子：50カ国以上',
    'Korean Fried Chicken: 56 Countries': '韓国フライドチキン：56カ国',

    // ── K-Food page — hero ─────────────────────────────────────
    'From kimchi in every fridge to 불닭볶음면 breaking Scoville records worldwide — Korean food has become a global phenomenon. Learn the language, history, and cultural meaning behind one of the world\'s most exciting food movements.':
      'どの冷蔵庫にもキムチがある時代から世界のスコビル記録を塗り替える불닭볶음면まで — 韓国料理は世界的な現象となりました。世界で最もエキサイティングな食の革命の言語、歴史、文化的意味を学びましょう。',

    // K-Food Goes Global — split text nodes (paragraph has <strong> tags)
    'Korean food exports reached an all-time record of': '韓国料理の輸出は',
    'in 2025 — growing for the 10th consecutive year. Ramyeon alone crossed $1.52 billion in exports, the first single Korean food to surpass that mark. The South Korean government has set a': '2025年に過去最高を記録し — 10年連続の成長です。ラーメンだけで15億2千万ドルの輸出を達成し、単一の韓国食品として初めてこの記録を突破しました。韓国政府は',
    'K-food export target for 2026.': 'のK-フード輸出目標を2026年に設定しました。',

    // Photo card captions
    'Korean instant noodle exports rose 21.8% in 2025. Samyang\'s 불닭볶음면 and Nongshim\'s 신라면 lead global demand. Nongshim is building an export-only factory in Busan capable of producing 500 million packs annually.':
      '韓国のインスタント麺輸出は2025年に21.8%増加しました。農心は年間5億パックを生産可能な輸出専用工場を釜山に建設中です。',
    'CJ CheilJedang\'s Bibigo Mandu leads the US frozen dumpling market and is sold in 50+ countries. The global dumplings market is valued at $21.4 billion — growing at 8.9% annually toward $44.8 billion by 2034.':
      'CJチェイルジェダンのビビゴ餃子は米国の冷凍餃子市場をリードし、50カ国以上で販売されています。世界の餃子市場は214億ドル規模で、2034年までに448億ドルへと年率8.9%で成長中です。',
    'Korean restaurant brands operate 4,644 stores across 56 countries. BBQ Chicken covers 57 countries. Korean fried chicken ranked #1 as "most preferred Korean food" in international consumer surveys.':
      '韓国の外食ブランドが56カ国で4,644店舗を運営しています。BBQチキンは57カ国をカバー。韓国フライドチキンは国際消費者調査で「最も好まれる韓国料理」第1位に選ばれました。',

    // Foods That Conquered the World — intro
    'These five Korean foods didn\'t just export — they built global food cultures, inspired culinary movements, and changed how the world eats. Each one has a remarkable story behind it.':
      'これら5つの韓国料理は単に輸出されただけでなく、世界的な食文化を築き、料理ムーブメントに刺激を与え、世界の食習慣を変えました。それぞれに驚くべきストーリーがあります。',

    // Food spotlight English name spans
    'Ramyeon / Korean Instant Noodles': 'ラーメン / 韓国インスタント麺',
    'Mandu / Korean Dumplings': '餃子 / 韓国餃子',
    'Korean Fried Chicken': '韓国フライドチキン',
    'Sesame Oil · Perilla Oil': 'ごま油・エゴマ油',
    'Korean Seasoned Chicken Breast': '韓国風味付けサラダチキン',

    // Food spotlight stats
    '📦 $1.52 Billion Exported in 2025 · 21.8% Year-on-Year Growth': '📦 2025年輸出額15億2千万ドル · 前年比21.8%成長',
    '🌍 Bibigo Mandu in 50+ Countries · $21.4B Global Dumpling Market': '🌍 ビビゴ餃子 50カ国以上 · 世界餃子市場214億ドル',
    '🏪 4,644 Korean Food Stores in 56 Countries · BBQ Chicken in 57 Countries': '🏪 56カ国で4,644店舗 · BBQチキンは57カ国',
    '🫙 Premium Cold-Pressed Artisan Export — Global Gourmet Discovery': '🫙 プレミアム低温圧搾職人輸出品 — 世界的グルメの発見',
    '📈 Chicken Product Export +14.1% in Q1 2025 · "Healthy Pleasure" Global Trend': '📈 2025年Q1鶏肉製品輸出+14.1% · 「健康的な喜び」世界的トレンド',

    // Food spotlight descriptions
    'In 1963, Samyang Foods released Korea\'s first instant ramen — a government-backed project to solve post-Korean War food shortages using cheap US wheat imports. Six decades later, 불닭볶음면 (Buldak Ramen) became a global internet phenomenon through "Fire Noodle Challenge" videos generating billions of views. Nongshim\'s 신라면 (Shin Ramyun) is sold in 100+ countries with localized flavors. In Q1 2026 alone, Korea\'s instant noodle exports hit $435 million — up 26% year-on-year. Nongshim is building an export-only factory in Busan producing 500 million packs annually. Samyang invested $143.5M in its first overseas factory in China.':
      '1963年、三養食品が韓国初のインスタントラーメンを発売しました — 安価な米国産小麦を活用して朝鮮戦争後の食糧難を解決する政府主導プロジェクトです。60年後、불닭볶음면は「ファイアーヌードルチャレンジ」動画で数十億回再生を記録し世界的なインターネット現象となりました。농심의 신라면は100カ国以上で販売されています。2026年Q1だけで韓国のインスタント麺輸出は4億3,500万ドルに達し、前年比26%増です。',

    'Korean mandu (만두) is distinct from Chinese dumplings and Japanese gyoza — thinner skin, lighter filling, often including glass noodles (당면) and tofu. CJ CheilJedang\'s Bibigo brand made mandu a global staple, now leading the US frozen dumpling market and available at Costco, Walmart, and H-Mart worldwide. The global dumplings market valued at $21.4 billion in 2025 is growing at 8.9% CAGR toward $44.8 billion by 2034. Korean mandu is gaining traction as a "healthy" Asian option — a balanced meal with protein, vegetables, and clean ingredients.':
      '韓国の만두は中国の餃子や日本のギョーザとは異なります — より薄い皮、軽い具材、당면（春雨）と豆腐がよく入ります。ビビゴブランドが만두をグローバルな定番食品にし、米国の冷凍餃子市場をリードしコストコ・ウォルマート・H-Martで販売されています。2025年に214億ドル規模の世界餃子市場は年率8.9%で2034年には448億ドルに達する見込みです。',

    'Korean fried chicken (치킨) revolutionized the global concept of fried chicken — double-fried for maximum crunch, coated in yangnyeom (양념) sweet-spicy sauce, served by the whole bird with beer (치맥). The 치맥 (chicken + 맥주/beer) culture went global after a 별에서 온 그대 scene showed actress Jun Ji-hyun craving it in winter. By 2026, Korean restaurant chains operated across 56 countries with 4,644 locations. BBQ Chicken has stores in 57 countries and ~250 US locations across 33 states. bhc expanded to Thailand hitting 11 stores in 11 months. Bonchon has 147+ US locations. Korean fried chicken ranked #1 among international consumers as "most preferred Korean food."':
      '韓国フライドチキン（치킨）はフライドチキンのグローバルな概念を革新しました — 最大のカリカリ感のために二度揚げし、甘辛い양념ソースをまとい、丸ごと一羽でビールと一緒に（치맥として）提供されます。2026年までに韓国の飲食チェーンが56カ国で4,644店舗を展開。韓国フライドチキンは国際消費者の間で「最も好まれる韓国料理」第1位に選ばれました。',

    'Korean sesame oil (참기름) and perilla oil (들기름) are the secret flavors behind almost every Korean dish — drizzled on bibimbap, stirred into marinades, and used as finishing oils. Premium cold-pressed sesame oil from regions like Yecheon and Yangpyeong is now sought by high-end chefs worldwide. Perilla oil (들기름) contains up to 60 times more omega-3 fatty acids than olive oil — a nutritional discovery driving global gourmet appeal. Artisan producers press only small batches monthly for maximum freshness, shipping worldwide through Korean specialty platforms. 들기름 막국수 (perilla oil buckwheat noodles) became a food media sensation in 2024–2025, introducing the oil to Western audiences who had never tasted it.':
      '韓国の참기름（ごま油）と들기름（エゴマ油）は、비빔밥にかけ、マリネに混ぜ、仕上げオイルとして使われる、ほぼすべての韓国料理の隠れた風味です。들기름はオリーブオイルより最大60倍多いオメガ3脂肪酸を含んでいます。들기름 막국수は2024〜2025年に食品メディアのセンセーションとなりました。',

    'While the world knows Korean fried chicken for indulgence, Korea\'s fitness culture created a completely different chicken phenomenon — 닭가슴살 (seasoned chicken breast). Korean convenience stores and delivery apps sell marinated, fully cooked chicken breast in flavors like 고추장, soy garlic, and herb — high protein, low fat, and genuinely delicious. Harim\'s "e-chicken" line brought Korean-seasoned chicken breast to global health food markets. Exports of Korean chicken products rose 14.1% in Q1 2025, led by growth in the US and Vietnam. 삼계탕 (ginseng chicken soup), as a heat-treated export product, has earned a dedicated following in North America and earned a 25.1% export increase to the US in Q1 2025.':
      '世界が知る韓国フライドチキンとは全く異なる、韓国のフィットネス文化が生み出した現象が닭가슴살（味付けサラダチキン）です。韓国のコンビニや配達アプリでは고추장・醤油ガーリック・ハーブ味のマリネ済みサラダチキンが販売されています — 高タンパク・低脂肪で本当においしいです。2025年Q1に韓国鶏肉製品の輸出は14.1%増加しました。',

    // K-Food Timeline — intro
    'Korean food\'s journey from wartime survival food to global gourmet sensation spans just six decades — one of the fastest food culture evolutions in history.':
      '韓国料理が戦時の生存食から世界的なグルメの感動へと変貌するまでの道のりはわずか60年 — 歴史上最も速い食文化の進化の一つです。',

    // Timeline title English parts (inside <span class="timeline-title-kr"> or as main text)
    'LA Koreatown BBQ': 'LAコリアタウンBBQ',
    'Seoul Olympics': 'ソウル五輪',
    '대장금 — Jewel in the Palace': '대장금 — 宮廷女官チャングムの誓い',
    'Danji NYC — World\'s First Michelin Korean Restaurant': 'ダンジNYC — 世界初のミシュラン韓国レストラン',
    '불닭볶음면 Fire Noodle Challenge': '불닭볶음면 ファイアーヌードルチャレンジ',
    'Parasite\'s 짜파구리 (Ram-Don)': '《기생충》의 짜파구리（ラムドン）',
    '달고나 Candy Challenge': '달고나 キャンディチャレンジ',
    'K-Food Export Record: $13.62 Billion': 'K-フード輸出記録：136億2千万ドル',
    '· Korea\'s First Instant Ramen': '· 韓国初のインスタントラーメン',

    // Timeline descriptions
    'Samyang Foods releases Korea\'s first instant ramen — a government-backed project to feed a post-war nation using cheap US wheat imports. The simple, spicy noodle becomes a national staple overnight and the foundation of a multi-billion dollar export industry six decades later.':
      '三養食品が韓国初のインスタントラーメンを発売 — 安価な米国産小麦を使い戦後の国民を養うための政府主導プロジェクトです。シンプルで辛いこの麺は一夜にして国民食となり、60年後に数十億ドル規模の輸出産業の基盤となりました。',

    'Korean immigrants establish restaurants in Los Angeles, New York, and Chicago. Korean BBQ — grilling 삼겹살 and 불고기 at the table — introduces a social dining revolution to America. LA Koreatown becomes a culinary destination that predates the broader Hallyu wave by decades.':
      '韓国系移民がロサンゼルス・ニューヨーク・シカゴにレストランを開きます。テーブルで삼겹살と불고기を焼く韓国式BBQがアメリカにソーシャルダイニング革命をもたらします。LAコリアタウンは韓流ブームより数十年前から美食の目的地となっていました。',

    'The Seoul Summer Olympics expose Korean food to the global stage for the first time. International visitors taste 비빔밥, 갈비, and 냉면 — the first mass Western encounter with authentic Korean cuisine. The event sparks early tourism interest in Korean food and culture.':
      'ソウル夏季オリンピックが初めて韓国料理を世界の舞台に披露しました。外国からの訪問者が비빔밥・갈비・냉면を味わい、本格的な韓国料理との大規模な西洋初の出会いとなりました。このイベントが韓国料理と文化への初期の観光関心を生み出しました。',

    'Historical drama 대장금 achieves 57% domestic ratings and exports to 90+ countries, teaching the world about Joseon-era Korean royal cuisine. The drama directly boosts Korean food tourism and introduces the concept of 한식 as a unified cultural identity to international audiences.':
      '歴史ドラマ《대장금》が国内視聴率57%を達成し90カ国以上に輸出され、朝鮮時代の韓国宮廷料理を世界に教えました。このドラマが韓国グルメ観光を直接後押しし、한식という統一文化アイデンティティの概念を国際的な観客に紹介しました。',

    'Chef Hooni Kim\'s Danji in New York City becomes the first Korean restaurant in the world to earn a Michelin star, legitimizing Korean fine dining globally. The New York Times names Kim "the city\'s leading interpreter of Korean cuisine," sparking interest in Korean food as high gastronomy.':
      'ニューヨークのフーニ・キムシェフのダンジが世界初のミシュランスターを獲得した韓国レストランとなり、韓国のファインダイニングをグローバルに認知させました。ニューヨーク・タイムズはキム氏を「市の先導的な韓国料理の解釈者」と称しました。',

    'Samyang\'s 불닭볶음면 goes viral globally through YouTube and social media, creating a challenge culture around Korean spicy food. Videos in Korean, English, Spanish, Japanese, and dozens of other languages generate billions of views — introducing a new generation to Korean food through entertainment.':
      '三養の불닭볶음면がYouTubeとソーシャルメディアを通じてグローバルにバイラルし、韓国のスパイシーフードを中心とするチャレンジ文化を生み出しました。韓国語・英語・スペイン語・日本語など数十言語の動画が数十億回再生を記録しました。',

    'Bong Joon-ho\'s Parasite wins Best Picture at the Academy Awards. A single scene featuring 짜파구리 (Chapaghetti + Neoguri instant noodles with premium beef) creates a global food phenomenon overnight. Korean instant noodle searches spike worldwide, Nongshim\'s stock surges, and "ram-don" enters the food media lexicon permanently.':
      'ポン・ジュノ監督の《기생충》がアカデミー作品賞を受賞。高級牛肉を使った짜파구리（짜파게티+너구리）を描く一つのシーンが一夜にして世界的な食の現象を生み出しました。全世界で韓国インスタント麺の検索が急増し、農心の株価が急騰、「ラムドン」が食品メディアの語彙に永久に加わりました。',

    'Netflix\'s Squid Game becomes the platform\'s most-watched series ever. The 달고나 candy challenge — recreating the honeycomb candy from the show — spreads globally across TikTok and Instagram. Dalgona whipped coffee also goes viral, introducing Korean café culture worldwide.':
      'Netflixの《오징어 게임》がプラットフォーム史上最も視聴されたシリーズになりました。ドラマのはちみつキャンディーを再現する달고나キャンディーチャレンジがTikTokとInstagramで世界に広まりました。달고나ホイップコーヒーもバイラルし、韓国カフェ文化を世界に紹介しました。',

    'K-Food+ exports hit $13.62 billion — growing for the 10th consecutive year. Ramyeon crosses $1.52 billion alone. Mingles becomes Korea\'s only Michelin 3-star restaurant. Seoul hosts the Asia\'s 50 Best Restaurants awards with 6 Seoul restaurants on the list. Korea is now recognized as a global fine dining destination alongside Paris and Tokyo.':
      'K-フード+輸出が136億2千万ドルを達成 — 10年連続の成長です。ラーメンだけで15億2千万ドルを突破。밍글스が韓国唯一のミシュラン3スターレストランになります。ソウルがアジアの50ベストレストラン賞を主催し、ソウルの6店舗がリストに入りました。韓国はパリや東京と並ぶグローバルなファインダイニングの目的地として認められています。',

    // Comparison table — Korean vs Japanese vs Chinese
    '🌏 Korean vs Japanese vs Chinese Food Culture': '🌏 韓国・日本・中国の食文化比較',
    'Spice Level': '辛さレベル',
    'High — gochujang, kimchi, buldak': '高い — コチュジャン、キムチ、불닭',
    'Low — umami-focused, subtle': '低い — うま味重視、繊細',
    'Varies widely — mild to very spicy by region': '地域により様々 — マイルドから激辛まで',
    'Fermentation': '発酵',
    'Central — kimchi, doenjang, ganjang are daily staples': '中心的 — キムチ、된장、간장が毎日の食卓に欠かせない',
    'Present — miso, soy, pickles': 'あり — 味噌、醤油、漬物',
    'Present but less prominent in everyday eating': 'あるが日常食では目立たない',
    'Dining Style': '食事スタイル',
    'Communal — all dishes shared simultaneously; 반찬 always free-refillable': '共食 — 全料理を同時に共有；반찬は常に無料おかわり可',
    'Individual — each person gets their own set of dishes': '個人 — 各自に料理セット',
    'Communal — lazy Susan, shared dishes at table': '共食 — 回転テーブル、テーブルでのシェア',
    'BBQ Culture': 'BBQ文化',
    'Central social event — cook together at the table': '中心的な社交イベント — テーブルで一緒に調理',
    'Yakitori / yakiniku — specialty experience': '焼き鳥 / 焼き肉 — 専門的な体験',
    'Regional (Xinjiang, Sichuan) — less universal': '地域的（新疆、四川）— より普遍的でない',
    'Global Export 2025': '2025年グローバル輸出',
    'Fastest growing — $13.62B record, 10th consecutive year': '最速成長 — 136億2千万ドル記録、10年連続',
    'Mature — ramen, sushi globally established': '成熟 — ラーメン、寿司はグローバルに確立',
    'Most widespread — oldest global presence': '最も普及 — 最古のグローバルプレゼンス',
    'Trending Now': '現在のトレンド',
    'Buldak ramen, Bibigo mandu, K-BBQ, tteokbokki, bingsu': '불닭ラーメン、ビビゴ餃子、K-BBQ、떡볶이、빙수',
    'Wagyu, omakase, matcha, Japanese whisky': '和牛、オマカセ、抹茶、日本ウイスキー',
    'Hot pot, xiao long bao, char siu, mapo tofu': '火鍋、小籠包、チャーシュー、麻婆豆腐',
    'Signature Oils': '代表的なオイル',
    '참기름 (sesame), 들기름 (perilla), 고추장 paste': '참기름（ごま油）、들기름（エゴマ油）、고추장ペースト',
    'Sake, mirin, dashi — subtle, clean umami': '酒、みりん、だし — 繊細でクリーンなうま味',
    'Soy sauce, black vinegar, chili oil, doubanjiang': '醤油、黒酢、ラー油、豆板醤',

    // Essential Dishes section
    '🍽️ Essential Korean Dishes · 필수 한국 음식': '🍽️ 必須韓国料理 · 필수 한국 음식',
    'Every Korean learner should know these dishes — not just the names, but the cultural stories, the vocabulary, and why each one matters in Korean life and language.':
      'すべての韓国語学習者はこれらの料理を知るべきです — 名前だけでなく、文化的なストーリー、語彙、そしてそれぞれが韓国の生活と言語においてなぜ重要なのかも。',

    // Genre-name English subtitles (spans inside genre-name)
    'Kimchi': 'キムチ',
    'Bibimbap': 'ビビンバ',
    'Samgyeopsal': 'サムギョプサル',
    'Tteokbokki': 'トッポッキ',
    'Samgyetang': 'サムゲタン',
    'Naengmyeon': '냉면（冷麺）',
    'Kimchi Jjigae': 'キムチチゲ',
    'Pajeon': 'パジョン',
    'Dwaejigukbap · Pork Bone Soup': 'テジクッパ · 豚骨スープ',
    'Jjajangmyeon · Korean Black Bean Noodles': 'チャジャン麺 · 韓国黒豆麺',
    'Jjamppong · Spicy Seafood Noodle Soup': 'チャンポン · 辛い海鮮麺',
    'Korean Malatang · Build-Your-Own Spicy Soup': '韓国マーラータン · カスタム辛スープ',
    'Hongeo · Fermented Skate': 'ホンオ · 発酵エイ',
    'Sannakji · Live Octopus': 'サンナクジ · 活タコ',
    'Seonji · Congealed Cow Blood': 'ソンジ · 凝固牛血',

    // Essential Dishes descriptions
    'Korea\'s most iconic food — fermented napa cabbage seasoned with gochugaru, garlic, ginger, and jeotgal. 김치 is on every Korean table at every meal. UNESCO recognized kimchi-making (김장 문화) as Intangible Cultural Heritage in 2013. Over 200 types of kimchi exist across Korea\'s regions.':
      '韓国最も象徴的な食べ物 — コチュカル・ニンニク・生姜・ジョッカルで味付けした発酵白菜。김치はすべての韓国の食卓に毎食のぼります。ユネスコは2013年にキムチ作り（김장 문화）を無形文化遺産に登録しました。韓国各地に200種類以上のキムチがあります。',

    'A bowl of rice topped with sautéed vegetables, gochujang, a fried egg, and sesame oil — all mixed together before eating. 비빔 = "mixed," 밥 = "rice." Jeonju (전주) is the bibimbap capital. Ranked among the most nutritious meals in the world by multiple studies and regularly served on Korean Air flights.':
      '炒め野菜・コチュジャン・目玉焼き・ごま油をのせた御飯を食べる前にすべて混ぜ合わせる料理。비빔 = 「混ぜた」、밥 = 「ご飯」。全州（전주）がビビンバの首都です。複数の研究で世界で最も栄養価の高い食事の一つとして評価され、大韓航空機内食として定期的に提供されています。',

    'Thick pork belly slices grilled at the table, wrapped in lettuce with garlic, green onion, and ssamjang. March 3rd (3/3) is unofficial "삼겹살 데이" because 삼 = 3. A quintessential Korean social eating experience — the table becomes a kitchen and a gathering.':
      'テーブルで焼く厚切り豚バラ肉を、ニンニク・ネギ・サムジャンとともにレタスで包んで食べる料理。3月3日（3/3）は삼（3）が首音節と同じことから非公式「삼겹살デー」です。韓国を代表するソーシャルダイニング体験です。',

    'Chewy rice cakes (떡) in a fiery gochujang sauce with fish cakes and green onions. The defining Korean street food — sold from pojangmacha (포장마차) carts across every city. Modern variants include 로제 (rose cream), curry, and cheese. Now exported as instant products globally and found in Trader Joe\'s and Whole Foods.':
      'コチュジャンソースにおでん（어묵）とネギを加えた弾力ある떡（餅）の料理。韓国を代表する屋台フード — 全国の포장마차で販売されています。現代のバリエーションにはロゼ（クリーム）・カレー・チーズがあります。インスタント製品として世界に輸出されています。',

    'A whole young chicken stuffed with glutinous rice, ginseng, garlic, and jujubes, slow-boiled in rich herbal broth. Eaten on the three hottest days of the Korean calendar (삼복) to restore strength through the philosophy of 이열치열 — fighting heat with heat. A key export product growing 25% in the US market.':
      '若鶏一羽にもち米・高麗人参・ニンニク・ナツメを詰め、豊かな薬膳出汁でゆっくり煮た料理。「熱で熱を制する」이열치열の哲学に基づき、韓国暦で最も暑い三伏（삼복）に食べます。米国市場で25%成長している主要輸出製品です。',

    'Cold buckwheat noodles in icy dongchimi broth (물냉면) or with spicy gochujang sauce (비빔냉면). Originally from North Korea — Pyongyang naengmyeon (평양냉면) is celebrated for its elegant, mild flavor. One of Korea\'s most beloved summer dishes. A food that cuts across politics — 2018 inter-Korean summit featured 평양냉면 as a diplomatic meal.':
      '氷冷した동치미出汁の冷たいそば（물냉면）、またはコチュジャンソースで混ぜる（비빔냉면）。元々は北朝鮮発祥 — 平壌냉면は上品でまろやかな味で知られています。2018年南北首脳会談では평양냉면が外交的食事として提供されました。',

    'A bubbling stew of aged kimchi, pork (or tuna), tofu, and gochugaru in rich broth — best made with 묵은지 (well-aged kimchi, 6+ months). The older the kimchi, the deeper the flavor. Every Korean considers this "mom\'s best cooking." Consistently ranks as the #1 most-loved Korean food in domestic surveys.':
      '熟成キムチ・豚肉（またはツナ）・豆腐・コチュカルを豊かな出汁で煮込むぐつぐつ煮立つチゲ — 6カ月以上熟成した묵은지で作るのが最高です。すべての韓国人が「お母さんの手料理」と考えており、国内調査で最も愛される韓国料理第1位を常に占めます。',

    'A large, crispy savory pancake packed with green onions (파), often with seafood (해물파전) or kimchi. Korea\'s legendary rainy-day food — Koreans say rain sounds like pajeon frying in oil. Traditionally served with makgeolli (막걸리) rice wine. A must at traditional markets like Gwangjang (광장시장).':
      'ネギ（파）をたっぷり詰めた大きくてカリカリのセイヴォリーパンケーキで、しばしば海鮮（해물파전）またはキムチ入りです。韓国の伝説的な雨の日の料理 — 雨音がパジョンを油で焼く音のようだと言われています。伝統的に막걸리と一緒に食べます。광장시장などの伝統市場の名物です。',

    'Busan\'s soul food — milky pork bone broth served with rice, pork slices, and green onion; seasoned with salted shrimp (새우젓) and kkakdugi. Born during the Korean War (1950s): refugees couldn\'t afford meat, so they boiled pork bones discarded by US military. Seomyeon, Busan has an entire 돼지국밥 골목 (alley). 순대국밥 adds blood sausage (순대) and intestines to the bowl for extra richness and depth.':
      '釜山のソウルフード — 白い豚骨出汁にご飯・豚肉スライス・ネギを合わせ、塩漬けエビ（새우젓）とカクテキで味付けします。韓国戦争（1950年代）に難民が米軍が捨てた豚骨を煮て作り始めました。釜山西面には돼지국밥 골목（路地）があります。순대국밥は순대（ブラッドソーセージ）と内臓を加えて更に豊かな味にします。',

    'Korea\'s iconic Chinese-Korean dish — thick noodles in a dark, glossy black bean paste (춘장) sauce with diced pork and onion. Inspired by Chinese zhajiangmian but completely transformed by Korean-Chinese immigrants (화교) in Incheon\'s Chinatown from the 1880s. Today\'s 짜장면 does not exist in China — it is an entirely Korean creation. Korea\'s entire delivery culture (배달 문화) was built on 짜장면 deliveries. Incheon has a 짜장면 박물관 (Museum). April 14th is Black Day (블랙데이) — singles eat 짜장면 together.':
      '韓国の象徴的な中華韓国料理 — 黒豆ペースト（춘장）ソースと角切り豚肉・玉ねぎを合わせた太麺料理。1880年代から仁川チャイナタウンの韓国系中国人移民（화교）が中国の炸醤麺を完全に韓国式に変形しました。今日の짜장면は中国には存在しない完全に韓国的な創造物です。韓国の배달 문화全体が짜장면配達から始まりました。4月14日はブラックデー — 独身者が一緒に짜장면を食べます。',

    'Fiery red seafood noodle soup loaded with squid, shrimp, clams, pork, and vegetables. Adapted from Japanese chanpon (ちゃんぽん) but Koreanized in the 1970s by adding gochugaru — transforming a mild noodle soup into a boldly spicy Korean staple. Now one of two defining menus at every Korean-Chinese restaurant (중화요리): the eternal debate, 짬뽕 or 짜장면? The 2024-2025 trend: 짬뽕전문점 (jjamppong-only specialist restaurants) booming nationwide — entire restaurants dedicated to perfecting just this one dish.':
      'イカ・エビ・あさり・豚肉・野菜がたっぷり入った真っ赤な辛い海鮮麺スープ。日本のちゃんぽんから着想を得て1970年代にコチュカルを加えることで韓国化されました。韓国中華料理店（중화요리）の永遠の議題：짬뽕か짜장면か？2024〜2025年のトレンド：짬뽕전문점（チャンポン専門店）が全国的に急増しています。',

    'A Korean adaptation of Sichuan malatang — a customizable hot soup where you choose your own ingredients (vegetables, tofu, fish balls, noodles, meat) priced by weight, then the kitchen cooks everything in a spicy broth. Compared to the Chinese original, Korean 마라탕 is milder (less 마 — numbing Sichuan pepper), more vegetable-forward, and marketed as a "healthy" Asian meal. Tang Huo Kung Fu alone has 560+ locations in Korea. 마라탕 instant cups from Samyang, Ottogi, and CU now sell globally. Especially popular with Korean women in their 20s and 30s.':
      '四川省の麻辣烫の韓国版 — 野菜・豆腐・つみれ・麺・肉など自分で具材を選び重量で価格が決まり、辛いスープで調理してもらえるカスタマイズできる鍋料理です。中国の原型と比べ、韓国の마라탕はより穏やか（しびれる四川山椒が少ない）で野菜が豊富、「健康食」として販売されています。韓国国内だけで560以上の店舗があります。',

    'Korea\'s most notorious extreme food — fermented skate from Heuksando island (흑산도), Jeolla Province. Skate fish have 100× more urea than humans; during fermentation this converts to ammonia, producing a smell so intense it clears a room and makes eyes water. Served as 홍어삼합: thin slices of fermented skate + boiled pork bossam + aged kimchi, paired with makgeolli (막걸리). A prized Jeolla delicacy — serving 흑산도 홍어 at a ceremony signals respect and wealth. A true rite of passage even for many Koreans.':
      '韓国で最も悪名高い極端な食べ物 — 全羅道の흑산도産の発酵したガンギエイです。発酵中に尿素がアンモニアに変わり、目に涙が出るほど強烈な臭いが発生します。홍어삼합（発酵홍어 + 茹で豚肉 + 熟成キムチ）として막걸리と一緒に食べます。全羅道の珍重な名物で、흑산도 홍어を儀式で出すことが敬意と富の象徴です。',

    'Small octopus cut while still alive and served immediately — tentacles continue moving on the plate. Tossed with sesame oil and sesame seeds. The suction cups remain fully active and can attach to the throat — each year, deaths from choking are reported, requiring slow, thorough chewing. Best experienced at Noryangjin Fish Market (노량진 수산시장), coastal pojangmacha, or a 횟집 (raw fish restaurant). A famous challenge for adventurous foreigners — a test of nerve, technique, and trust in Korean food culture.':
      '生きたまま切ってすぐに提供する小ダコ — 触手がお皿の上で動き続けます。ごま油とゴマで和えます。吸盤が完全に活性化しており喉に付くことがあるため、ゆっくりしっかり噛む必要があります。毎年窒息による死亡事故が報告されています。노량진 수산시장や海岸の포장마차・횟집で体験できます。',

    'Congealed and cooked cow blood — served as deep crimson cubes in 선지해장국 (blood soup, a legendary hangover cure), 순대국밥, and 설렁탕. When properly cooked, 선지 has a mild, iron-rich flavor with a soft tofu-like texture — far gentler than its appearance suggests. A traditional Korean restorative food — believed to rebuild blood and energy after illness or a rough night. Many Korean grandmothers still insist 선지해장국 is the only true cure for a hangover (해장). An ingredient that separates the adventurous from the cautious.':
      '凝固させた牛の血を調理したもの — 선지해장국（血のスープ、伝説的な二日酔い解消法）・순대국밥・설렁탕に深紅色のキューブとして入れます。適切に調理すると穏やかで鉄分豊富な味わいで、軟らかい豆腐のような食感 — 見た目よりずっと優しいです。多くのお婆さんが선지해장국だけが真の二日酔い解消法（해장）だと今も主張します。',

    // World-Famous Chefs
    '👨‍🍳 World-Famous Korean Chefs & Food Personalities · 세계적인 한국 셰프 & 푸드 퍼스널리티': '👨‍🍳 世界的な韓国人シェフ＆フードパーソナリティ · 세계적인 한국 셰프 & 푸드 퍼스널리티',
    'Korean chefs and food personalities are reshaping global dining — earning Michelin stars, winning Netflix cooking competitions, and bringing Korean flavors, philosophy, and cultural storytelling to the world\'s most prestigious stages.':
      '韓国人シェフとフードパーソナリティがグローバルダイニングを再形成しています — ミシュランスターを獲得し、Netflixの料理コンテストで優勝し、韓国の味・哲学・文化的ストーリーテリングを世界最高峰の舞台に届けています。',

    // Chef award banners
    'MICHELIN 3 STARS': 'ミシュラン3つ星',
    'NYC 3★ · SEOUL 2★ · NEW KOREAN PIONEER': 'NYC 3★ · ソウル 2★ · 新韓国料理のパイオニア',
    'WORLD\'S FIRST MICHELIN KOREAN RESTAURANT': '世界初のミシュラン韓国レストラン',
    'KOREAN-AMERICAN FUSION · CULINARY CLASS WARS': '韓国系アメリカ人フュージョン · 흑백요리사',
    'ASIA\'S 50 BEST · HIGHEST NEW ENTRY 2025': 'アジアの50ベスト · 2025年最高新入賞',
    'FRENCH-KOREAN CUISINE · TV JUDGE · MENTOR': 'フランス韓国料理 · TV審査員 · メンター',
    'KOREA\'S TOP FOOD ENTREPRENEUR · 1,299 BRANCHES': '韓国トップフードアントレプレナー · 1,299店舗',

    // Chef names (chef-name div)
    'Kang Mingoo · 강민구': 'カン・ミング · 강민구',
    'Lim Jung-sik · 임정식': 'イム・ジョンシク · 임정식',
    'Hooni Kim · 김훈이': 'フーニ・キム · 김훈이',
    'Edward Lee · 에드워드 이': 'エドワード・リー · 에드워드 이',
    'Kwon Woo-joong · 권우중': 'クォン・ウジュン · 권우중',
    'Kwon Sung-joon · 권성준': 'クォン・ソンジュン · 권성준',
    'Choi Kang-rok · 최강록': 'チェ・ガンロク · 최강록',
    'Lee Ha-sung · 이하성': 'イ・ハソン · 이하성',
    'Leo Kang · 강레오': 'レオ・カン · 강레오',
    'Baek Jong-won · 백종원': 'ペク・ジョンウォン · 백종원',
    'Kim Poong · 김풍': 'キム・プン · 김풍',

    // Chef restaurants
    'Mingles 밍글스': 'ミングルス 밍글스',
    'Jungsik 정식당': 'ジョンシクダン 정식당',
    'Danji + Meju · New York City': 'ダンジ + メジュ · ニューヨーク',
    'SHIA · Washington D.C.': 'シア · ワシントンD.C.',
    'Eatanic Garden 이타닉 가든': 'イータニックガーデン 이타닉 가든',
    'Italian Fine Dining · Self-Taught from Naples, Italy': 'イタリアンファインダイニング · イタリア・ナポリで独学',
    'Korean Contemporary · Master of 조림 (Braised Dishes)': '韓国コンテンポラリー · 조림（煮付け料理）の達人',
    'Korean Fine Dining': '韓国ファインダイニング',
    'French Fine Dining · Seoul': 'フランスファインダイニング · ソウル',
    'Theborn Korea — 새마을식당, PAIK\'s Noodle, PAIK\'s Coffee, BORNGA, 홍콩반점0410': 'ザボーンコリア — 새마을식당、빽스누들、빽다방、BORNGA、홍콩반점0410',
    '1st-Generation Webtoon Artist (데뷔 2002) · Broadcaster': '第1世代ウェブトゥーン作家（2002年デビュー） · 放送人',

    // Chef locations
    '📍 Gangnam, Seoul · Asia\'s 50 Best #4 (2026)': '📍 ソウル江南 · アジアの50ベスト第4位（2026年）',
    '📍 Seoul (2★) + New York City (3★)': '📍 ソウル（2★）+ ニューヨーク（3★）',
    '📍 New York City · First-Ever Michelin Korean Restaurant (2011)': '📍 ニューヨーク · 世界初のミシュラン韓国レストラン（2011年）',
    '📍 Washington D.C. · Opened November 2024': '📍 ワシントンD.C. · 2024年11月オープン',
    '📍 Seoul · Asia\'s 50 Best #25 (2025) — Highest New Entry': '📍 ソウル · アジアの50ベスト第25位（2025年）— 最高新入賞',
    '📍 Seoul · 흑백요리사 Season 1 Champion (2024)': '📍 ソウル · 흑백요리사 シーズン1優勝（2024年）',
    '📍 Seoul · 흑백요리사 Season 2 Champion (2025)': '📍 ソウル · 흑백요리사 シーズン2優勝（2025年）',
    '📍 Seoul · 흑백요리사 Season 2 Runner-Up (2025)': '📍 ソウル · 흑백요리사 シーズン2準優勝（2025年）',
    '📍 Seoul · French-Korean Cuisine Specialist': '📍 ソウル · フランス韓国料理スペシャリスト',
    '📍 Seoul · CEO, 26 Franchise Brands · 1,299 Branches Nationwide': '📍 ソウル · CEO、26フランチャイズブランド · 全国1,299店舗',
    '📍 Seoul · Debuted 2002 · 냉장고를 부탁해 (JTBC)': '📍 ソウル · 2002年デビュー · 냉장고를 부탁해（JTBC）',

    // Chef descriptions
    'Korea\'s most celebrated chef. Mingles earned its 3rd Michelin star in 2025 — the only 3-star restaurant in Korea for two consecutive years. Chef Kang blends traditional Korean fermentation (jang: doenjang, ganjang, gochujang) with contemporary fine dining technique. Seasonal tasting menus built around the Korean pantry and aged kimchi. Widely considered the most important Korean restaurant in the world.':
      '韓国で最も称えられるシェフ。밍글스は2025年に3つ目のミシュランスターを獲得しました — 2年連続で韓国唯一の3スターレストランです。カン・シェフは伝統的な韓国発酵（장：된장・간장・고추장）と現代のファインダイニング技術を融合させます。韓国のパントリーと熟成キムチを中心とした季節のテイスティングメニュー。世界で最も重要な韓国レストランとして広く認められています。',

    'Pioneer of "New Korean Cuisine" — Michelin-level tasting menus built around Korean flavors and techniques. Jungsik NYC holds 3 Michelin stars, one of the most decorated Korean restaurants outside Korea. Chef Lim trained in Europe and brought modern French technique to traditional Korean ingredients, creating a culinary bridge that changed how the world perceives Korean food.':
      '「新韓国料理」のパイオニア — 韓国の味と技術を中心としたミシュランレベルのテイスティングメニュー。정식당 NYCはミシュラン3スターを保有し、韓国国外で最も輝かしい韓国レストランの一つです。イム・シェフはヨーロッパで訓練を受け、現代フランス技術を伝統的な韓国食材に持ち込み、世界が韓国料理を認識する方法を変えた料理の架け橋を作りました。',

    'Chef Hooni Kim trained at Daniel and Masa before opening Danji — the first Korean restaurant in the world to earn a Michelin star (2011). His second restaurant Hanjan was named one of the 10 best new restaurants of 2013 by the New York Times, which called Kim "the city\'s leading interpreter of Korean cuisine." His latest project, Meju, explores Korean fermentation traditions.':
      'フーニ・キムシェフはダニエルとマサで訓練を受けた後、2011年に世界初のミシュランスターを獲得した韓国レストラン「ダンジ」を開きました。ニューヨーク・タイムズはキム氏を「市の先導的な韓国料理の解釈者」と称しました。最新プロジェクト「メジュ」は韓国発酵伝統を探求しています。',

    'Korean-American chef, author, and TV personality — known for Top Chef and the globally-watched Netflix show Culinary Class Wars (흑백요리사). His D.C. restaurant SHIA (opened November 2024) serves Korean-American fusion with sustainable sourcing — reimagining Korean cuisine through a Southern-American lens. His memoir "Smoke & Pickles" is celebrated for exploring Korean-American identity through food.':
      '韓国系アメリカ人シェフ・著者・TVパーソナリティ — トップシェフとグローバルに視聴されたNetflixショー「흑백요리사」で知られます。D.C.のレストラン「SHIA」（2024年11月オープン）はサステナブルな食材調達で韓国系アメリカ人フュージョン料理を提供しています。回顧録「Smoke & Pickles」は食を通じた韓国系アメリカ人のアイデンティティ探求で称えられています。',

    'Chef Kwon\'s Eatanic Garden debuted at #25 on Asia\'s 50 Best Restaurants 2025 — the highest new entry of the year. The restaurant focuses on sustainability — garden-to-table philosophy using Korean native ingredients, heirloom vegetables, and hyper-seasonal menus. Represents a new generation of Korean chefs building on Korea\'s fermentation heritage and terroir tradition.':
      'クォン・シェフのイータニックガーデンは2025年アジアの50ベストレストランで25位にデビューしました — その年最高の新入賞です。韓国在来食材・受け継がれた野菜・ハイパーシーズナルメニューを使ったガーデンツーテーブルの哲学でサステナビリティに焦点を当てています。韓国の発酵遺産とテロワール伝統に基づいた新世代韓国シェフを代表します。',

    'Winner of Netflix\'s landmark cooking competition 흑백요리사: 요리 계급 전쟁 (Culinary Class Wars) Season 1, taking home 300 million KRW. Self-taught in Naples, Italy — nicknamed 나폴리 맛피아 (Napoli Mafia) for his Italian mastery. Specializes in Italian and Piedmont-style fine dining. After the show, his restaurant reservation rate surged by up to 4,937%. His victory — a 흑수저 (black spoon) defeating White Spoons (백수저) — sparked a national conversation about formal training vs. passionate self-teaching.':
      'Netflixの画期的な料理コンテスト「흑백요리사」シーズン1の優勝者で、3億ウォンを獲得。イタリア・ナポリで독학（独学）— イタリア料理の달인として「나폴리 맛피아（ナポリマフィア）」の愛称で知られます。番組後、レストランの予約率が最大4,937%急増しました。흑수저（黒スプーン）が백수저（白スプーン）を打ち負かした勝利は、正規教育対情熱的独学についての全国的な議論を巻き起こしました。',

    'Winner of 흑백요리사 Season 2 by unanimous 2:0 judges\' decision, defeating 이하성 in the finale. Trained at Tsuji Professional School in Japan. Throughout the competition he became famous as the 조림요정 (Stew Fairy) — earning the nickname 연쇄조림마 (serial braiser) for his mastery of 조림 (Korean dishes simmered in sauce until sauce is absorbed and intensified). Had appeared in Season 1 before returning to dominate Season 2. His braised dishes became some of the show\'s most iconic moments.':
      '2:0全会一致の審査員決定で흑백요리사シーズン2に優勝し、決勝で이하성を下しました。日本の辻専門学校で訓練を受けました。大会を通じて「조림요정（煮付け妖精）」として有名になり、ソースを吸い込んで凝縮させるまで煮る韓国料理の달인として「연쇄조림마（連続煮付け魔）」の愛称を得ました。',

    'Runner-up of 흑백요리사 Season 2, finishing second to 최강록 in the dramatic finale. His exceptional performance throughout the competition earned widespread admiration and a large dedicated fanbase. Like all competitors on the show, his restaurant reservations surged after broadcast. 흑백요리사 Season 2 generated over 100 million views globally in its first month — one of Netflix\'s most-watched Korean reality programs.':
      '흑백요리사シーズン2で準優勝し、ドラマチックな決勝戦で최강록에 続く2位でした。大会を通じた卓越した料理パフォーマンスで広く賞賛を受け、大きな専任ファンベースを獲得しました。흑백요리사シーズン2は초月に全世界で1億ビューを超えました。',

    'One of Korea\'s most beloved culinary figures — a French cuisine specialist who studied and worked extensively in France before bringing his craft back to Korea. Known for his elegant French technique and warm, approachable mentoring style. A celebrated judge on MasterChef Korea Season 2 and multiple Korean cooking programs. His ability to bridge French classical training with Korean culinary sensibility has made him an influential figure for a generation of Korean chefs aspiring to master European cuisine.':
      '韓国で最も愛される料理界の人物の一人 — フランスで長期間学び活動した後、韓국にフランス料理を持ち帰ったフランス料理スペシャリストです。エレガントなフランス技術と温かく親しみやすいメンタリングスタイルで知られています。MasterChef Koreaシーズン2など複数の韓国料理番組の名物審査員です。',

    'South Korea\'s most famous food personality — not a formally trained chef, but the person who democratized Korean home cooking and restaurant culture for an entire generation. CEO of Theborn Korea, operating 26 franchise brands with 1,299 branches nationwide, including 새마을식당 (Korean BBQ), PAIK\'s Noodle (the definitive 짜장면 and 짬뽕 chain), and PAIK\'s Coffee. Served as judge on Culinary Class Wars (흑백요리사) both seasons. His TV programs helped millions of Koreans learn to cook. Opened a barbecue restaurant in Hong Kong; planning global expansion.':
      '韓国で最も有名なフードパーソナリティ — 正規教育を受けたシェフではありませんが、一世代全体に韓国の家庭料理と外食文化を一般化した人物です。더본코리아のCEOで、새마을식당（韓国式BBQ）・빽스누들・빽다방など26フランチャイズブランド・全国1,299店舗を運営します。흑백요리사の両シーズンで審査員を務めました。',

    'Not a chef — a 1st-generation Korean webtoon artist who debuted in 2002 and became a celebrated broadcaster. His culinary fame came from JTBC\'s hit show 냉장고를 부탁해 (Please Take Care of My Refrigerator), where he repeatedly defeated professional star chefs using only his years of 자취 (solo-living) experience and wild self-taught improvisation — earning the nicknames 자취요리 연구가 (solo-living cooking researcher) and 사파 요리사 (unorthodox cook). His 무근본 야매 요리 (rootless, rule-breaking cooking) resonated with millions of young Koreans who cook the same way.':
      'シェフではない — 2002年にデビューした第1世代の韓国ウェブトゥーン作家であり、著名な放送人です。JTBCのヒット番組「냉장고를 부탁해」で、長年の자취（一人暮らし）경험과 野생的な독학 즉興だけでプロのスターシェフを何度も打ち負かし、「자취요리 연구가」と「사파 요리사（流派なし料理人）」の愛称を得ました。',

    // Chef tags
    '3 Michelin Stars': 'ミシュラン3つ星',
    'Asia\'s 50 Best #4': 'アジアの50ベスト第4位',
    '3 Michelin Stars NYC': 'ニューヨーク・ミシュラン3つ星',
    'New Korean Cuisine': '新韓国料理',
    'First Michelin Korean': '初のミシュラン韓국',
    'NYC Legend': 'NYCレジェンド',
    'Korean Fermentation': '韓国発酵',
    'K-American Fusion': '韓국系アメリカ人フュージョン',
    'Asia\'s 50 Best #25': 'アジアの50ベスト第25位',
    'Garden-to-Table': 'ガーデンツーテーブル',
    'Sustainability': 'サステナビリティ',
    'Italian Fine Dining': 'イタリアンファインダイニング',
    'Self-Taught': '독학（独学）',
    'Japanese-Trained': '日本で訓練',
    'Food Entrepreneur': 'フードアントレプレナー',
    '26 Franchise Brands': '26フランチャイズブランド',
    'French Cuisine': 'フランス料理',
    'MasterChef Judge': 'MasterChef審査員',
    'TV Mentor': 'TVメンター',

    // Food Vocabulary section
    '📖 Food Vocabulary · 음식 어휘': '📖 食事語彙 · 음식 어휘',
    'Master these Korean food words to read menus, cook Korean recipes, and talk about food like a local. Korean food vocabulary is a gateway into culture, history, and everyday life.':
      'これらの韓국語の食事用語をマスターして、メニューを読み、韓国料理を作り、地元民のように食事について話しましょう。韓国料理の語彙は文化・歴史・日常生활への入り口です。',

    // Vocab category labels
    '🍽️ 핵심 음식 · Essential Foods & Dishes': '🍽️ 핵심 음식 · 必須料理と食べ物',
    '🌶️ 양념 · Seasonings & Condiments': '🌶️ 양념 · 調味料・薬味',
    '🏪 식당 · Restaurant Words': '🏪 식당 · レストラン용語',

    // Vocab eng-cell text nodes (after kor-trans span)
    'Cooked rice / a meal (central to every meal)': '炊いたご飯 / 食事（すべての食事의 中心）',
    'Soup (broth-based, lighter)': 'スープ（出汁ベース、より軽め）',
    'Stew (thick, bubbling, spicier than 국)': 'チゲ（濃く、ぐつぐつ煮立ちで、국より辛い）',
    'Side dishes (served free and always refillable)': 'おかず（無料で常におかわり自由）',
    'Wrap — meat in a lettuce or perilla leaf': '包み — レタスまたはエゴマの葉に肉を包んだもの',
    'Stir-fried dish (e.g. 김치볶음밥 = kimchi fried rice)': '炒め料理（例：김치볶음밥 = キムチチャーハン）',
    'Grilled dish (e.g. 삼겹살 구이)': '焼き料理（例：삼겹살 구이）',
    'Seasoned / dressed vegetables': '和え物 / 야채のあえ物',
    'Braised dish simmered in sauce (e.g. 갈비조림)': '煮込み料理（例：갈비조림）',
    'Savory pancake (파전, 김치전, 해물전)': 'セイヴォリーパンケーキ（파전・김치전・해물전）',
    'Fermented red chili paste — Korea\'s most essential condiment': '発酵唐辛子ペースト — 韓国で最も欠かせない調味料',
    'Soybean paste — fermented, earthy, deeply savory': '大豆ペースト — 発酵した、土っぽい、深いうま味',
    'Soy sauce (Korean-style, rich umami)': '醤油（韓국スタイル、豊かなうま味）',
    'Dipping paste for BBQ wraps (된장 + 고추장 blend)': 'BBQの包み料理用ディッピングペースト（된장 + 고추장ブレンド）',
    'Sesame oil — nutty finishing oil, used on almost everything': 'ごま油 — ナッティな仕上げオイル、ほぼすべてに使用',
    'Perilla oil — nutty, grassy, 60× more omega-3 than olive oil': 'エゴマ油 — ナッティで草の香り、オリーブオイルより60倍以上のオメガ3',
    'Korean red pepper flakes — essential for kimchi': '韓国粉唐辛子 — キムチに必須',
    'Garlic — used abundantly in nearly all Korean cooking': 'にんにく — ほぼすべての韓国料理に豊富に使用',
    'Ginger — used in kimchi, soups, and marinades': '生姜 — キムチ・スープ・マリネに使用',
    'Sugar — added to most marinades for balance': '砂糖 — ほとんどのマリネにバランスのために加える',
    'Restaurant / dining hall': 'レストラン / 食堂',
    'A restaurant famous for its outstanding food': '美味しい食べ物で有名なレストラン',
    'Excuse me! (to get a waiter\'s attention)': 'すみません！（ウェイターの注意を引くため）',
    'Order (주문할게요 = I\'d like to order)': '注文（주문할게요 = 注文したいです）',
    'Takeout / to-go packaging': 'テイクアウト / 持ち帰り包装',
    'Food delivery (배달의민족 = #1 delivery app)': 'フードデリバリー（배달의민족 = 配達アプリNo.1）',
    'Bill / payment (계산해 주세요 = check, please)': 'お会計 / 支払い（계산해 주세요 = お会計をお願いします）',
    'Serving / portion (2인분 = for 2 people)': '一人前 / 분량（2인분 = 2人分）',
    'Refill (반찬 is always free refill in Korea)': 'おかわり（韓国では반찬は常に無料おかわり）',
    'Eating alone (solo dining — now a proud lifestyle)': '一人で食べること（혼밥 — 今では誇らしいライフスタイル）',

    // Grammar box (grammar-meaning text handled via en-only/ja-only spans in HTML)
    '📘 Essential Food Grammar Patterns': '📘 必須食事文法パターン',

    // Ordering & Dining section
    '🏪 Ordering & Dining · 식당에서': '🏪 注文と食事 · 식당에서',
    'Korean restaurants have their own rituals — calling the waiter, ordering by 인분 (servings), requesting free refills, and letting one person pay. These conversations cover every situation.':
      '韓国のレストランには独自の作法があります — ウェイターを呼ぶ・인분（人前）単位で注文する・無料おかわりを要求する・一人が払う。これらの会話ですべての韓国での食事シーンを乗り切れます。',

    // Dialogue scene titles
    '🏪 식당에서 — At a Korean Restaurant (해요체 · Polite)': '🏪 식당에서 — 韓国レストランで（해요체 · 丁寧語）',
    '🔄 반찬 리필 & 계산 — Banchan Refill & Paying the Bill': '🔄 반찬 리필 & 계산 — バンチャンおかわり＆お会計',

    // Dialogue English lines
    'Excuse me! I\'d like to order.': 'すみません！注文したいです。',
    'Yes, what would you like?': 'はい、何になさいますか？',
    'Pork belly for 2 and one soybean stew, please.': 'サムギョプサル2人前と된장チゲ一つください。',
    'And drinks? (alcohol)': 'お飲み物は？（アルコール）',
    'One bottle of soju and one bottle of beer, please.': '焼酎1本とビール1本ください。',
    'Which brand of soju and beer would you like?': '焼酎とビールはどのブランドになさいますか？',
    '"Tesla combo" please. 💡 테슬라 = Korean slang for 테라 (beer brand) + 참이슬 (soju brand). Named by combining 테 from 테라 + 슬 from 참이슬 = 테슬라 — like the car brand. Korea\'s most popular soju-beer pairing.':
      '「テスラコンボ」をください。 💡 테슬라 = 테라（ビールブランド）と참이슬（焼酎ブランド）を組み合わせた韓国スラング。테라の「테」と참이슬の「슬」を組み合わせて테슬라 — 自動車ブランドと同じ名前。韓国で最も人気の焼酎ビールコンボ。',
    '이모! (Auntie!) More kimchi please.': '이모！（おばさん！）キムチをもっとください。',
    'Banchan is self-service!': 'バンチャンはセルフサービスです！',
    'Thank you! I will eat well.': 'ありがとうございます！잘 먹겠습니다。',
    'It\'s on me! Today is my turn.': '私が払います！今日は私の番です。',

    // Info box labels & text
    '왜 이모? — Why Call the Server 이모?': '왜 이모? — なぜウェイターを이모と呼ぶのか？',
    'In Korean restaurants, female servers are commonly called 이모 (아줌마, "auntie") — even total strangers. This isn\'t rude: it reflects the deep Korean cultural value of 정 (jeong), the emotional bond that treats familiar strangers like family. Calling a server 이모 is warm, friendly, and expected. Male servers are often called 사장님 (owner) or just 저기요 (excuse me). Foreigners who use 이모 naturally will immediately earn a warmer reception. Never call a server 야! (hey!) — that\'s considered very rude.':
      '韓国のレストランでは女性スタッフを見知らぬ人にも이모（おばさん）と呼ぶのが一般的です。これは失礼ではなく、見慣れた他人を家族のように扱う韓国の深い文化的価値「정（ジョン）」を反映しています。이모と呼ぶことは温かく、親しみがあり、期待されます。男性スタッフは사장님（オーナー）や저기요（すみません）と呼びます。야！と呼ぶのはとても失礼とみなされます。',

    '셀프 문화 — The Self-Service Side Dish Culture': '셀프 문화 — セルフサービスのバンチャン文化',
    'Many Korean casual restaurants — especially 국밥집, 김치찌개집, 보쌈집, and cafeteria-style eateries — operate a 셀프바 (self-service bar) for 반찬 (side dishes). A sign near the counter reads "반찬 셀프" and customers are expected to walk up and refill their own kimchi, bean sprouts, 깍두기, and soup. Asking the server to do it for you at a 셀프 restaurant may confuse or slow down the staff. This system also reflects a cultural value: unlimited refills are a given in Korea — no extra charge, ever.':
      '多くの韓国のカジュアルレストラン — 特に국밥집・김치찌개집・보쌈집・カフェテリア式 — は반찬（おかず）のセルフバーを運営しています。「반찬 셀프」サインを見たら、お客様が自分でキムチ・もやし・깍두기・スープをおかわりすることになっています。セルフレストランでスタッフにおかわりを頼むとスタッフが困ることがあります。韓国ではおかわりは常に無料で当然です。',

    // Table Manners
    '🥢 Table Manners & Dining Culture · 식사 예절': '🥢 テーブルマナーと食事文化 · 식사 예절',
    'Korean dining etiquette reflects Confucian values of hierarchy, respect, and community. Knowing the unspoken rules transforms every meal into a cultural experience.':
      '韓国の食事エチケットは階層・尊重・共同体の儒教的価値を反映しています。暗黙のルールを知ることで、すべての食事が文化的体験になります。',

    // Table manners phrase-eng
    'I will eat well. (said before the meal)': 'よくいただきます。（食事前に言う）',
    'I ate well. (said after the meal)': 'よくいただきました。（食事後に言う）',
    'Please eat first (elders eat first)': '先にお召し上がりください（年長者が先）',
    'It\'s on me! I\'ll pay.': '私が払います！',
    'Let\'s have a drink together!': '一緒に一杯飲みましょう！',
    'Fight heat with heat (eating hot food in summer)': '熱で熱を制する（夏に熱い料理を食べる）',

    // Table manners phrase-context
    'Said by everyone at the table simultaneously before eating. A Confucian expression of gratitude — for the food, the cook, and the companions. Not saying it is considered rude in Korean culture.':
      '食事前にテーブルの全員が同時に言います。食べ物・料理人・仲間への儒教的な感謝の表現です。言わないことは韓国文化では失礼とされています。',

    'Said to the host or restaurant staff when leaving. Saying this while exiting a restaurant shows appreciation to the kitchen. The appropriate closing to every Korean meal.':
      '帰る際にホストまたはレストランのスタッフに言います。レストランを出る際にこう言うことは厨房への感謝を示します。すべての韓国の食事の適切な締めくくりです。',

    'Younger people wait for the oldest person at the table to take the first bite. One of Korea\'s most fundamental dining customs, rooted in Confucian filial piety (효도). The eldest is also usually offered the best seat.':
      '若い人は席の最年長者が最初の一口を食べるまで待ちます。孝道（효도）に根ざした韓国の最も根本的な食事習慣の一つです。最年長者には通常最良の席も提供されます。',

    'In Korea, one person typically pays for the whole table — splitting bills is less common than in the West. The eldest or most senior person usually pays. Gracious acceptance is culturally appropriate — refusing too hard can create awkwardness.':
      '韓国では通常一人がテーブル全体の分を払います — 割り勘は西洋ほど一般的ではありません。最年長者または最上位の人が通常払います。快く受け入れることが文化的に適切 — 強く断ることで気まずさが生まれることがあります。',

    'In Korean drinking culture, you never pour your own drink — you pour for others, they pour for you. Receiving a drink with two hands shows respect. Refusing from a senior is handled by touching the glass to your lips even without drinking.':
      '韓国の飲酒文化では自分のグラスには自分で注がない — 他の人に注ぎ、他の人があなたに注ぎます。両手でグラスを受け取ることが敬意を示します。目上の人からの誘いを断る場合は、飲まなくてもグラスを唇に触れることで対処します。',

    'Korea\'s unique food philosophy: eating hot, spicy food in summer is believed to regulate body temperature by inducing a sweat that then cools the body. This is why 삼계탕 is a summer dish. Used to justify ordering the spiciest, hottest soup in 35°C heat.':
      '韓国独自の食哲学：夏に熱くて辛い食べ物を食べることで汗をかき、それが体を冷やすと信じられています。これが삼계탕が夏の料理である理由です。35°Cの暑さでも最も辛い熱いスープを注文することの正当化に使われます。',

    // Street Food
    '🌶️ Street Food Culture · 길거리 음식': '🌶️ 屋台フード文化 · 길거리 음식',
    'Korean street food is an entire culinary universe — sold from pojangmacha (포장마차) carts, night markets, and school gate tents. Gwangjang Market (광장시장), Myeongdong, and Noryangjin are the legendary destinations.':
      '韓国の屋台フードは一つの完全な料理宇宙です — 포장마차カート・夜市・学校門前のテントで販売されます。광장시장・明洞・노량진が伝説的な目的地です。',

    // Street food genre-name subtitles
    'Korean Corn Dog': '韓国コーンドッグ',
    'Hotteok': 'ホットク',
    'Eomuk / Odeng': 'オムク / オデン',
    'Bungeoppang': 'プンオッパン',
    'Bingsu': 'ビンス',
    'Korean Soft Serve': '韓国ソフトクリーム',

    // Street food descriptions
    'The undisputed king of Korean street food. Chewy cylindrical rice cakes in a fiery gochujang sauce with fish cakes and boiled eggs. Now available globally in rose (크림), curry, and cheese variants. One of the first Korean foods to be widely exported as an instant product.':
      '韓国屋台フードの揺るぎない王様。コチュジャンソースにおでん（어묵）と茹で卵を加えた弾力ある筒型의 떡。現在ロゼ（クリーム）・カレー・チーズのバリエーションが世界で入手可能です。インスタント製品として広く輸出された最初の韓국料理の一つです。',

    'Not the American corn dog — the Korean version is a revelation. A sausage or mozzarella skewered, coated in batter and crispy panko, deep-fried, then rolled in sugar and drizzled with ketchup and mustard. Myungrang Hotdog has gone global with this creation — now in multiple countries.':
      'アメリカのコーンドッグではありません — 韓国バージョンは驚異的です。ソーセージまたはモッツァレラをクシに刺し、衣とカリカリのパン粉でコーティングして揚げ、砂糖をまぶしてケチャップとマスタードをかけます。명랑ホットドッグがこの창作물で世界進出し、現在多くの国で展開中です。',

    'A thick, chewy pancake filled with brown sugar syrup, cinnamon, and chopped peanuts — pressed on a griddle until the outside caramelizes and the inside bursts with hot syrup. A winter street food staple. Dangerous levels of deliciousness — the syrup is extremely hot. Let it cool before biting.':
      '黒砂糖シロップ・シナモン・刻んだピーナッツが入った厚くて弾力あるパンケーキ — 外側がカラメル화し中から熱いシロップが飛び出るまでグリドルで焼きます。冬의 屋台フードの定番。危険なほど美味しい — シロップが非常に熱いので噛む前に冷ましてください。',

    'Fish cake skewers simmered in savory anchovy broth — the broth is drunk directly from the stall\'s communal pot. One of Korea\'s most comforting winter foods. The 국물 (broth) is often free to drink while eating other street foods nearby. Essential pojangmacha phrase: 국물 주세요 (give me the broth).':
      '旨みのある煮干し出汁で煮たおでん串 — 出汁は屋台の共用鍋から直接飲みます。韓국最もほっとする冬의 食べ物の一つ。국물（出汁）は近くで他의 屋台フードを食べている間は無料で飲めることが多いです。필수포장마차フレーズ：국물 주세요。',

    'Fish-shaped waffle pastry filled with sweet red bean paste (팥) or custard cream. A winter icon — vendors appear with the first cold snap. Inspired by Japanese taiyaki, perfected in Korea. A nostalgic comfort food across all generations — the smell of 붕어빵 cooking is a Seoul winter sensory memory.':
      'あんこ（팥）またはカスタードクリームが詰まった魚の形のワッフルペストリー。冬のアイコン — 最初の寒波と一緒에 屋台が登場します。日本のたい焼きからヒントを得て韓국でまさに完成されました。全世代にわたるノスタルジックなコンフォートフード — 붕어빵を焼く匂いがソウルの冬의 感覚的な記憶です。',

    'A large, crispy savory pancake with green onions (파), seafood (해물파전), or kimchi. Korea\'s legendary rainy-day food — the sound of rain is said to sound like 파전 frying in oil. Traditionally paired with makgeolli (막걸리) rice wine. A must at Gwangjang Market (광장시장), Seoul\'s oldest traditional market.':
      'ネギ（파）・海鮮（해물파전）・またはキムチを使った大きくカリカリのセイヴォリーパンケーキ。韓국의 伝説的な雨の日の料理 — 雨音がパジョンを油で焼く音のようだと言われています。전통적으로 막걸리ライスワインとペアリングされます。ソウル最古의 伝統市場광장시장의 필견です。',

    'Shaved milk ice topped with sweetened red beans, fruit, rice cakes, condensed milk, and ice cream. 팥빙수 (red bean bingsu) is the original classic — a summer institution for 100+ years. Modern variations: mango, strawberry, matcha, injeolmi (인절미). Now found in Korean cafés worldwide and a major food tourism draw.':
      '甘い小豆・フルーツ・떡（餅）・練乳・アイスクリームをのせたミルクかき氷。팥빙수（小豆ビンス）は100年以上の夏의 定番 — オリジナルクラシックです。現代のバリエーション：マンゴー・イチゴ・抹茶・인절미。現在世界中의 韓국カフェで見られ、食문화観光の大きな魅力です。',

    'Korean soft serve is an industry — matcha, black sesame, taro, and corn flavors available on every corner. The 소프트콘 (soft cone) is a Myeongdong, Insadong, and Bukchon food tour staple. Korean dessert culture — bingsu, dalgona, and soft serve — has made Seoul one of the world\'s top food tourism cities.':
      '韓국ソフトクリームは一つの産業 — あらゆる角で抹茶・黒ごま・タロイモ・とうもろこし味が入手可能です。소프트콘（ソフトコーン）は明洞・인사동・北村の푸드ツアーの定番です。韓국의 デザート文화 — 빙수・달고나・ソフトクリーム — がソウルを世界トップの食문화観光都市の一つにしました。',

    // Iconic Food Phrases
    '💬 Iconic Korean Food Phrases · 음식 표현': '💬 韓国料理のアイコニックフレーズ · 음식 표현',
    'These expressions are the backbone of Korean food conversation — from complimenting the chef to expressing deep food longing. Every Korean learner should master these.':
      'これらの表現は韓国の食事会話の基盤です — シェフを褒めることから深い食への渇望を表現するまで。すべての韓国語学習者がマスターすべきものです。',

    // Iconic phrases — phrase-eng
    'Delicious! (casual exclamation)': '美味しい！（カジュアルな감탄）',
    'I\'m starving to death!': 'お腹が空いて死にそう！',
    'What should we eat today?': '今日何食べようか？',
    'Let\'s do chicken and beer!': 'チキンとビールしよう！',
    'It melts in my mouth.': '口の中で溶ける。',
    'Have you eaten? (a way of saying "I care")': 'ご飯食べた？（「あなたのことが気になる」의 表현）',
    'Recommend a good restaurant!': '맛집를 教えて！',
    'The broth is killer! (highest soup praise)': 'このスープは最高！（スープへの最高의 賛辞）',

    // Iconic phrases — phrase-context
    '반말 · The most used food expression in Korea. 맛있어요 (polite) vs 맛있다 (casual). Yelling 맛있다! in a restaurant is a compliment — cooks and owners genuinely love hearing it.':
      '반말 · 韓国で最も使われる食事表現。맛있어요（丁寧）vs 맛있다（カジュアル）。レストランで맛있다！と叫ぶのは褒め言葉 — 料理人やオーナーは本当に喜びます。',

    '반말 · Dramatic hunger expression. 죽겠다 = "I\'ll die" — used as extreme positive emphasis, not literal. Koreans use hyperbole in emotion expression constantly. Closely related: 배터져 죽겠어 (I\'m so full I\'ll die).':
      '반말 · ドラマティックな空腹表現。죽겠다 = 「死にそう」— 極端なポジティブ強調で文字通りではありません。韓国人は感情表現に常に誇張を使います。関련：배터져 죽겠어（お腹がはち切れそうで死にそう）。',

    '반말 · Korea\'s most debated question. Groups of Koreans can spend 30 minutes trying to answer this. The correct answer is always 삼겹살 or 치킨. The national food decision paralysis — 아무거나 (anything) is the most unhelpful answer.':
      '반말 · 韓国で最も議論される質問。韓国人のグループはこれに答えるために30分費やすことがあります。正解は常に삼겹살か치킨です。国民の食事決定麻痺 — 아무거나（何でもいい）が最も役に立たない答えです。',

    '반말 · 치 from 치킨 + 맥 from 맥주 (beer). Korea\'s ultimate social activity. Made globally famous by 별에서 온 그대 (2014). An invitation to relax, celebrate, or just enjoy each other\'s company — Korean culture at its most joyful.':
      '반말 · 치킨의 치 + 맥주의 맥。韓国の究極のソーシャル活動。2014年の《별에서 온 그대》で世界的に有名になりました。リラックスし・お祝いし・ただ一緒にいることを楽しむための誘い — 韓国文化の最も楽しい瞬間。',

    '해요체 · The highest compliment for food texture in Korean. 살살 is onomatopoeia for gentle melting. Used for wagyu beef, perfect 삼겹살 fat cap, or ripe fruit. A phrase that makes Korean cooks beam with pride.':
      '해요체 · 韓国の食べ物の食感に対する最高の賛辞。살살は優しく溶けることを表現する擬音語。和牛・완벽한 삼겹살の脂身・または熟したフルーツに使います。韓国の料理人が誇りに思って目を輝かせるフレーズです。',

    '반말 · One of Korea\'s most culturally loaded phrases. Asking "have you eaten?" is how Koreans say "I care about you." Historically rooted in times of food scarcity. Answering 아니 (no) often results in being immediately fed by the person who asked.':
      '반말 · 韓国で最も文化的に重みあるフレーズの一つ。「ご飯食べた？」という質問は韓国人が「あなたのことが気になる」と言う方法です。아니（いいえ）と言うと質問した人に即座に食べさせてもらえることがよくあります。',

    '반말 · Koreans take 맛집 recommendations extremely seriously — a bad tip is a social liability. Food recommendation culture is central to Korean friendship, powered by Naver Map, 카카오맵, and 배달의민족 reviews that run hundreds of entries deep.':
      '반말 · 韓国人は맛집の推薦を非常に真剣に受け止めます。食事推薦文化は韓国の友情の中心にあり、Naver Map・카카오맵・배달의민족の数百件のレビューで支えられています。',

    '반말 · 죽여준다 literally "it kills me" but means "it\'s absolutely incredible." Used specifically for soups, stews, and noodle broths. 국물 (broth) is considered the soul of Korean cooking — a perfect 국물 means the whole dish succeeds.':
      '반말 · 죽여준다は文字通り「殺してくれる」ですが「絶対に信じられないほど素晴らしい」を意味します。スープ・チゲ・麺のスープに特に使います。국물（スープ）は韓国料理の魂とされています — 완벽한 국물は料理全体の成功を意味します。',

    // Phrase breakdown — text node fragments (split by <b> tags in phrase-cards)
    '= taste ·': '= 味 ·',
    '= to exist / have — literally "there is taste" — taste exists and it\'s wonderful': '= ある / 持つ — 文字通り「味がある」— 味があって素晴らしい',
    '= stomach ·': '= お腹 ·',
    '= to be empty/hungry ·': '= 空腹 ·',
    "= I'm going to die (of ___)": '= 〜で死にそう',
    '= today ·': '= 今日 ·',
    '= what ·': '= 何 ·',
    '= to eat ·': '= 食べる ·',
    '= shall we ~?': '= 〜しようか？',
    '= fried chicken ·': '= フライドチキン ·',
    '= beer ·': '= ビール ·',
    "= let's do it (casual proposal)": '= しよう（カジュアルな提案）',
    '= mouth ·': '= 口 ·',
    '= from/in ·': '= から/で ·',
    '= gently (onomatopoeia) ·': '= ふんわりと（擬音語） ·',
    '= to melt': '= 溶ける',
    '= rice / a meal ·': '= ご飯 / 食事 ·',
    '= did you ~? (past tense, casual question)': '= 〜した？（過去形、カジュアルな質問）',
    '= house/place → 맛집 = "taste place" ·': '= 家/場所 → 맛집 = 「味の場所」·',
    '= to recommend': '= 推薦する',
    '= broth / soup liquid ·': '= スープ/出汁 ·',
    '= to kill (used as extreme praise) — Korean food slang for "outstanding"': '= 殺す（極端な賛辞として使う）— 韓国の食スラングで「最高」',

    // K-Food Slang
    '🔥 K-Food Slang & Culture · 음식 문화 슬랭': '🔥 K-フードスラングと文化 · 음식 문화 슬랭',
    'Korean food culture has its own vocabulary that reflects how deeply food is woven into social life — from solo dining culture to viral global food challenges.':
      '韓国の食文化には、食がどれほど社会生活に深く溶け込んでいるかを反映する独自の語彙があります — 혼밥（ひとり食い）文化からバイラルなグローバル食チャレンジまで。',

    // Slang phrase-eng
    'Mukbang — broadcast eating show': 'モッパン — 食事配信ショー',
    'Korean fried chicken + beer': '韓국フライドチキン + ビール',
    'Eating alone (solo dining)': '一人食い（ソロダイニング）',
    'Late-night food / midnight snack': '夜食 / 深夜のおやつ',
    'Pork Belly Day — March 3rd (3/3)': '삼겹살デー — 3月3日（3/3）',
    'Food photo for social media (proof shot)': 'SNS用フード写真（証明ショット）',
    'Chapaghetti + Neoguri instant noodles mixed': 'チャパゲティ + 너구리インスタント麺를 混ぜたもの',

    // Slang phrase-context
    'From 맛 (taste) + 집 (place). Korea\'s most sacred culinary designation. Finding the best 맛집 for any dish is a national obsession. Naver Map and Kakao Map reviews for 맛집 are taken more seriously than Michelin by most Koreans in daily dining decisions.':
      '맛（味）+ 집（場所）から。韓国で最も神聖な料理の称号。あらゆる料理の最高の맛집を見つけることは国民的なこだわりです。맛집のNaver Map・카카오MapのレビューはMichelin以上に真剣に受け止められています。',

    'From 먹다 (eat) + 방송 (broadcast). A global phenomenon born in Korea — streamers eat large quantities of food while talking to live audiences. Started on AfreecaTV, spread to YouTube globally. Now a recognized genre of entertainment in 30+ countries with millions of followers.':
      '먹다（食べる）+ 방송（放送）から。韓国で生まれたグローバル現象 — ストリーマーが大量の食べ物を食べながらライブ観客と話します。AfreecaTVで始まり、全世界でYouTubeに広まりました。現在30カ国以上で数百万人のフォロワーを持つ認知されたエンターテインメントのジャンルです。',

    'From 치킨 + 맥주. Korea\'s defining social eating experience. Best enjoyed watching football, on a rooftop in summer, or during a drama marathon. The 별에서 온 그대 scene of Jun Ji-hyun craving 치맥 in a snowstorm made it a global food term overnight.':
      '치킨 + 맥주から。韓국を定義するソーシャル食事体험。サッカーを見ながら・夏の屋上で・またはドラママラソン中에 最も楽しめます。《별에서 온 그대》의 チョン・ジヒョンが吹雪の中で치맥을 渇望するシーンが一夜에서 世界的な食品用語にしました。',

    'From 혼자 (alone) + 밥 (meal). Solo dining culture exploded with single-person households. Solo dining restaurants with individual booths (1인석) are now widespread in Seoul. 혼밥 has become a proud lifestyle choice — celebrated on social media, no longer stigmatized.':
      '혼자（一人）+ 밥（食事）から。一人世帯の増加とともにソロダイニング文化が爆発的に広まりました。個人ブース（1인석）を持つソロダイニングレストランが今やソウルで広く見られます。혼밥は誇りあるライフスタイルの選択となり、SNSで称えられもはや偏見されることはありません。',

    'From 야간 (nighttime) + 식사 (meal). Korea\'s 24-hour delivery culture made 야식 a national institution. Popular orders: 치킨, 피자, 족발, 보쌈. Delivery apps run through the night, and eating 야식 together is a K-Drama staple of romantic intimacy.':
      '야간（夜間）+ 식사（食事）から。韓国の24時間配達文化が야식を国民的な習慣にしました。人気注文：치킨・피자・족발・보쌈。配達アプリは夜通し動き、야식を一緒に食べることはK-ドラマのロマンチックな親密さの定番です。',

    'An unofficial Korean food holiday on March 3rd because 삼 (3) matches the date. Industry marketing that became a genuine cultural tradition. Many Korean BBQ restaurants offer special deals on 3/3. A great reminder of how Korean food culture turns everything into a shared moment.':
      '3月3日の非公式韓国料理の日。삼（3）が日付と一致するためです。業界マーケティングが本物の文化的伝統になりました。多くの韓国式BBQレストランが3/3に特別割引を提供します。韓国の食文化がすべてを共有の瞬間に変える素晴らしい伝統です。',

    'From 인증 (proof/verification) + 샷 (shot). Taking a food photo before eating is universal in Korea — restaurants design plating specifically for 인증샷. Korean food photography Instagram culture has made food tourism one of Korea\'s fastest-growing sectors, with visitors planning itineraries around 맛집 visits.':
      '인증（証明）+ 샷（ショット）から。食べる前にフード写真を撮ることは韓国で普遍的です — レストランが인증샷専用に盛り付けをデザインします。韓国の食文化観光が最速成長分野の一つとなり、訪問者が맛집訪問を中心に旅程を計画しています。',

    'A home-cooking hack — mixing Nongshim\'s 짜파게티 (jjajang noodles) and 너구리 (spicy udon) into one elevated bowl. Became globally famous after Parasite (기생충) won the 2020 Academy Award for Best Picture, with a scene of the dish topped with premium beef. Called "ram-don" in English subtitles. Nongshim\'s stock surged the next day.':
      '家庭料理のハック — 農心の짜파게티（チャジャン麺）と너구리（辛いうどん）を一つの上質なボウルに混ぜたもの。2020年にアカデミー作品賞を受賞した《기생충》で高級牛肉をトッピングした料理のシーンで世界的に有名になりました。英語字幕では「ラムドン」と呼ばれます。翌日農心の株価が急騰しました。',

    // Food Culture & Dining
    '🏮 Korean Food Culture & Dining · 한국 식문화': '🏮 韓国의 食文화と食事 · 한국 식문화',
    'Korean food culture runs deeper than any single dish — it lives in the spaces where people eat, the rituals around drinking, and the unspoken social codes of who orders what and when. Understanding these is key to understanding Korea.':
      '韓国の食文化はどんな一つの料理より深いところにあります — 人々が食べる空間・飲酒の儀式・誰が何をいつ注文するかという暗黙の社会コードの中に生きています。これらを理解することが韓国を理解する鍵です。',

    '🍢 Korean Dining Spots · 식사 공간': '🍢 韓国の食事スポット · 식사 공간',

    // Dining spots genre-name subtitles
    'Pojangmacha · Street Tent Bar': 'ポジャンマチャ · 屋台テントバー',
    'Bunsikjip · Korean Snack Bar': '분식집 · 韓国スナックバー',
    'Imokase · Auntie\'s Omakase': '이모카세 · おばさんのオマカセ',
    'Hambajip · Korean Canteen': '함바집 · 韓国食堂',
    'Cup Rice · From Seoul to Utah to the World': 'カップご飯 · ソウルからユタ、そして世界へ',

    // Cupbop genre-desc text node fragments (split by <strong>Cupbop</strong>)
    '노량진 (Noryangjin) in Seoul is famous for two things: Korea\'s largest fish market and the 공무원 학원가 — packed with cram schools for students grinding for civil service exams. 컵밥 (cup rice) — toppings over rice in a disposable cup — became the iconic student food here, sold by street vendors for ₩2,000–4,000. That humble concept jumped continents: in 2013, Korean immigrant Junghun Song spent his entire savings ($13,000 / ₩15M) on a second-hand food truck in Salt Lake City, Utah — inspired directly by Noryangjin-style cup rice. When Korean food went unrepresented at a Utah food convention, he showed up anyway.':
      'ソウルの노량진（ノリャンジン）は二つで有名です：韓国最大の水産市場と공무원 학원가（公務員試験受験塾街）。컵밥（カップご飯）— 使い捨てカップにご飯とトッピングを盛ったもの — が2,000〜4,000ウォンで屋台販売される象徴的な学生食として定着しました。そのシンプルなコンセプトが大陸を超えました：2013年、韓国系移民のソン・ジョンフンがユタ州ソルトレイクシティで全財産（約1,500万ウォン / 13,000ドル）をつぎ込んで中古フードトラックを購入 — ノリャンジンスタイルのカップご飯に触発されたものです。ユタ州のフードフェアで韓国料理が出展されていないとわかると、彼はとにかく乗り込みました。',
    'was born. Hedge fund investor Dok Kwon became a customer, then co-founder and COO. In 2022 they went on Shark Tank asking $1M for 3% — Mark Cuban invested $1M for 5%. By 2025: 60 US stores across 7 states, 220 stores in Indonesia, and a Dubai expansion underway.':
      'が誕生しました。ヘッジファンド投資家のドク・クォンが顧客となり、共同創業者兼COOとなりました。2022年にはシャーク・タンクで100万ドルの3%株式を求めて出演 — マーク・キューバンが100万ドルの5%で投資。2025年現在：米国7州に60店舗、インドネシアに220店舗、ドバイへの拡大も進行中。',

    // Dining spots descriptions
    'Orange-tented street stalls serving food and alcohol late into the night — Korea\'s most atmospheric dining spot. 포장 = wrapping, 마차 = cart. Serves 어묵 (fish cake skewers), 떡볶이, 순대, 라면, and soju/beer at plastic outdoor tables. A K-drama staple — characters drink here after heartbreak or celebration. Now a cultural export: 88포장마차 operates in Jakarta, Indonesia, and Korean pojangmacha chains are spreading across Southeast Asia, adapted as non-alcoholic for Muslim markets.':
      '食べ物とお酒を深夜まで提供するオレンジ色の天幕屋台 — 韓国最も雰囲気ある食事スポット。포장 = 包み、마차 = カート。어묵（おでん串）・떡볶이・순대・라면・焼酎/ビールをプラスチックの屋外テーブルで提供します。K-ドラマの定番 — キャラクターが失恋や祝福の後にここで飲みます。今や文化輸出品：88ポジャンマチャがインドネシア・ジャカルタで運営し、韓国ポジャンマチャチェーンが東南アジアに広まりつつあります。',


    'Budget snack restaurants serving everyday Korean comfort food: 떡볶이, 김밥, 순대, 라면, and 튀김 (fried snacks). Famous for 창문에 서서 먹는 문화 (window-stand eating culture) — customers stand at a counter window on the sidewalk, eating a quick bowl without entering. Originally emerged as cheap food for students and workers. The ultimate Korean working-class rite of passage: a ₩3,000 떡볶이 standing at a 분식집 window on a cold day, steam rising from the bowl.':
      '떡볶이・김밥・순대・라면・튀김（揚げ物スナック）などの日常の韓国コンフォートフードを提供する格安スナックレストランです。歩道のカウンター窓に立って入店せずに素早く一杯食べる「창문 문화（窓立ち食い文化）」で有名です。もともと学生や労働者向けの安価な食事として始まりました。韓国の労働者文化の真骨頂：寒い日に분식집の窓に立って湯気の上がる3,000ウォンの떡볶이を食べること。',

    'A portmanteau of 이모 (auntie) + 오마카세 (omakase). A Korean home-style tasting course where a middle-aged "이모" (auntie) serves a rotating menu of traditional home-cooked dishes in a small, intimate setting — pacing and choosing each course herself. Prices are a fraction of formal omakase (₩20,000–50,000 vs ₩200,000+), offering warmth and personal connection that fine dining cannot replicate. A major Korean food trend since 2022, representing a cultural rediscovery of 손맛 (hand taste — the irreplaceable flavor of food made with love).':
      '이모（おばさん）+ 오마카세の合成語。中年の「이모（おばさん）」が小さくて親密な設定で伝統的な家庭料理をコースに自ら選んで提供する韓国式家庭味テイスティングコースです。価格は正式オマカセの一部（2～5万ウォン vs 20万ウォン以上）で、ファインダイニングが再現できない温もりと個人的なつながりを提供します　2022年以降の韓国食の大きなトレンドで、손맛（手の味 — 愛を込めて作った料理の代替不可能な風味）の文化的再発見を代表します。',

    'Originally 함바 (from Japanese 飯場 hamba, "meal site") — no-frills cafeterias serving cheap, hearty meals to construction workers. The classic 함바집 menu: rice, soup, stir-fried pork, kimchi, bean sprout soup — unlimited, hot, and ₩5,000 or less. This concept evolved into the modern 한식뷔페 (Korean food buffet): self-service restaurants open to the public offering 30+ banchan dishes. Beloved by anyone who wants a mountain of 반찬 and unlimited rice without fuss — Korea\'s unpretentious answer to fine dining, and often tastier.':
      '元々は함바（日本語の飯場「식사 장소」から）— 건설 노동자に安価で心のある食事を提供する格式張らないカフェテリアです。함바집のクラシックメニュー：ご飯・スープ・豚肉炒め・キムチ・もやしスープ — 無限・熱く・5,000ウォン以下。このコンセプトが進化して現代の한식뷔페（韓国食뷔페）となりました。30品以上の반찬をセルフサービスで提供します。格式なく반찬の山と無限ご飯を望む人に愛されます。',

    // Bomb shots section
    '💣 폭탄주 · Korean Bomb Shots': '💣 폭탄주 · 韓国のボムショット',
    '폭탄주 (폭탄 = bomb + 주 = alcohol) — a bomb shot made by dropping a smaller glass of spirits into a larger glass of beer. Central to Korea\'s 회식 (company dinner) culture and any serious group gathering. Makes you tipsy 3× faster than drinking either alone. Each combination has its own name, personality, and social meaning:':
      '폭탄주（폭탄 = 폭탄 + 주 = アルコール）— 大きなビールグラスに小さなスピリッツグラスを落とすボムショットです。韓国の회식（会社での飲み会）文化と本格的なグループの集まりに欠かせません。どちらか一つだけ飲むより3倍速く酔います。各組み合わせには独自の名前・個性・社会的意味があります：',

    // Bomb shot phrase-eng
    'Soju + Beer — the ultimate classic': '焼酎 + ビール — 究極のクラシック',
    'Whiskey (양주) + Beer — the serious one': 'ウイスキー（양주）+ ビール — 本格的な一杯',
    'Soju + Beer + Cola — "pleasure follows pain"': '焼酎 + ビール + コーラ — 「苦あれば楽あり」',
    'Chaos Shot — mixed spirits + beer, no rules': 'カオスショット — 混合スピリッツ + ビール、ルールなし',

    // Bomb shot contexts
    'From 소주 + 맥주. Korea\'s defining bomb shot. Golden ratio: 3 parts soju to 7 parts beer. Mixing technique matters: spin the soju shot glass in the beer to create a whirlpool before drinking (황금 비율 소맥). The most common drink at any Korean gathering — from 회식 to a plastic table outside a pojangmacha. If a Korean says "한잔해요," they probably mean 소맥.':
      '소주 + 맥주から。韓国を定義するボムショット。황금 비율：焼酎3対ビール7。飲む前に焼酎のショットグラスをビールの中で回して渦を作る混ぜ方が重要（황금 비율 소맥）。회식からポジャンマチャ外のプラスチックテーブルまで、あらゆる韓国の集まりで最も一般的な飲み物。韓国人が「한잔해요」と言えば、おそらく소맥を意味します。',

    'From 양주 (Western spirits, typically whiskey) + 맥주. A stronger, more "serious" bomb shot — signals the occasion calls for real drinking. Often ordered at business dinners or when the 선배 (sunbae) is paying. More intense than 소맥. Ordering 양맥 when others are drinking 소맥 is a statement of intent for how the rest of the evening will go.':
      '양주（洋酒、通常ウイスキー）+ 맥주から。より強く、より「本格的な」ボムショット — 本物の飲み会を意味する場面のシグナル。ビジネス夕食や선배が奢ってくれる時によく注文されます。소맥より強力。他の人が소맥を飲んでいる時に양맥を注文するのは夜残りの展開についての意図表明です。',

    'Named after the proverb 고진감래 (苦盡甘來) — "bitterness ends, sweetness comes." Cola sweetens the back end of a harsh soju-beer combo. A gentler bomb shot for those who want the ritual without the full punch of 양맥. Philosophically, it\'s Korean life in a glass: endure the hard part, enjoy the reward. A wise choice for long 회식 nights.':
      'ことわざ고진감래（苦盡甘來 — 「苦あれば楽あり」）から命名。コーラが厳しい焼酎ビールコンボの後半を甘くします。양맥のフルパンチなしに儀式を望む人のためのより穏やかなボムショット。哲学的には、グラスの中の韓国人生：辛い部分を耐え、報いを楽しむ。長い회식の夜のための賢明な選択。',

    '혼돈 = chaos. Made by mixing multiple different spirits before dropping into beer — exact recipe varies by what is on the table. When someone orders 혼돈주, the night has escalated past the planning stage. No fixed recipe, no fixed rule, maximum effect. A late-night signal that the gathering has taken on a life of its own and no one is going home soon.':
      '혼돈 = カオス。複数の異なるスピリッツを混ぜてビールに落とします — 正確なレシピはテーブル上の物に依存します。誰かが혼돈주を注文したら、夜は計画の段階を超えました。固定レシピなし・固定ルールなし・最大効果。集まりが独自の生命を持ち、誰も早く帰らないという深夜のシグナル。',

    // Korean Men's comfort food
    '🍽️ 한국남자 픽 · Korean Men\'s Comfort Food Trinity': '🍽️ 한국남자 픽 · 韓国男子のコンフォートフード三冠',
    'Ask any Korean man what he wants for lunch and one of three answers comes back almost every time. These three dishes form an unofficial trinity — reliable, filling, and deeply Korean. Not flashy, not complicated, just satisfying.':
      'どの韓国男性に昼食に何を望むか聞けば、ほぼ常に3つの答えのいずれかが返ってきます。これらの3つの料理は非公式の三冠を形成します — 信頼でき・お腹が満たされ・深く韓国的です。派手でもなく、複雑でもなく、ただ満足できます。',

    // Men's comfort food genre-name subtitles
    'Dongas · Breaded Pork Cutlet': '돈가스 · 衣付き豚カツレツ',
    'Jeyuk Bokkeum · Spicy Stir-Fried Pork': 'チェユクポックム · 辛い豚肉炒め',
    'Gukbap · Rice in Hot Broth': '국밥 · 熱い出汁のご飯',

    // Men's comfort food descriptions
    'Korea\'s adaptation of Japanese tonkatsu — a breaded, deep-fried pork cutlet served with shredded cabbage and a thick, sweet-savory 돈가스 sauce. The Korean version is distinct: darker, sweeter sauce; larger portions; almost always served as a set (돈가스 정식) with rice and soup. A staple of Korean military mess halls (군인 식당) — every soldier\'s most-requested meal during leave. The ultimate childhood nostalgia food: school cafeteria 돈가스 day was always special. Found everywhere from 분식집 counters to dedicated 경양식 restaurants.':
      '日本の豚カツの韓国版 — 衣を付けて揚げた豚のカツレツに千切りキャベツと濃い甘辛돈가스ソースを添えます。韓国版は独特：より黒く甘いソース・大きめのポーション・ほぼ常に밥とスープのセット（돈가스 정식）で提供されます。韓国軍人食堂の定番 — すべての군인が休暇中に最も食べたがる食事です。究極の子供のノスタルジーフード：학교 급식の돈가스の日は常に特別でした。',

    'Thin slices of pork (제육 = pork) stir-fried (볶음) in a fiery gochujang, ginger, and garlic sauce — served over rice. Available at every 한식당 and school cafeteria. 제육덮밥 at a neighborhood 백반집 for ₩7,000–9,000 is considered by many Korean men the perfect lunch: spicy, fatty, energizing, and fast. A Korean army base staple. The dish most associated with the energy of a working Korean man — uncomplicated, maximally satisfying, built for effort. When a Korean man says "점심 뭐 먹을까?" this is often the answer.':
      'コチュジャン・生姜・にんにくソースで炒めた薄切り豚肉（제육）の炒め物 — ご飯の上に提供します。すべての한식당と학교 급식で提供されます。近所の백반집での7,000〜9,000ウォンの제육덮밥は、多くの韓国男性にとって완벽な昼食です：辛く・脂っこく・エネルギーが出て・速い。韓国軍基地の定番。働く韓国男性の活力に最も関連付けられる料理 — シンプルで最大限に満足でき、努力のために作られています。',

    'Rice served in or alongside hot broth — the simplest, most reliable Korean meal. Variants: 돼지국밥 (pork bone, Busan), 소고기국밥 (beef), 순대국밥 (blood sausage), 뼈해장국 (pork bone hangover soup). Open 24 hours at most 국밥 restaurants. The phrase "그냥 국밥이나 먹자" ("let\'s just eat gukbap") means embracing the reliable over the flashy. Deeply democratic: the same 국밥 is eaten by construction workers, company executives, and hungover students at 7 AM alike. A comfort that transcends class, generation, and occasion.':
      '熱い出汁の中またはそれと一緒に提供されるご飯 — 最もシンプルで信頼できる韓国料理。バリエーション：돼지국밥（豚骨・釜山）・소고기국밥（牛肉）・순대국밥（ブラッドソーセージ）・뼈해장국（豚骨二日酔いスープ）。ほとんどの국밥レストランは24時間営業です。「그냥 국밥이나 먹자」というフレーズは派手さより信頼性を受け入れることを意味します。건설 노동자から会社員・朝7時の二日酔いの학생まで同じ국밥を食べます。階層・世代・場面を超えたコンフォートです。',

    // Study tip box
    'Study Korean Through Food': '食を通じて韓国語を学ぼう',
    'The fastest way to absorb Korean naturally is through its food culture. When you cook 된장찌개, you\'re reading Hangul on ingredient labels. When you watch 먹방, you\'re training your ear to natural speech rhythms. When you use 배달의민족 (Korean delivery app), you\'re reading menus in real Korean at speed. Korean food is not just a meal — it\'s a full immersive language lesson.':
      '韓国語を自然に吸収する最速の方法は食文化を通じてです。된장찌개を作る時、食材ラベルのハングルを読んでいます。먹방を見る時、自然な韓国語の話し方に耳を訓練しています。배달의민족を使う時、本物の韓国語でメニューをスピードで読んでいます。韓国料理は単なる食事ではありません — 完全な没入型言語レッスンです。',

    // ── K-Beauty page headings ──────────────────────────────────
    '🌍 K-Beauty Goes Global · 글로벌 K-뷰티': '🌍 K-ビューティーの世界進出 · 글로벌 K-뷰티',
    '✨ K-Beauty 피부 관리': '✨ K-ビューティー 피부 관리',
    'Korean skincare and beauty is a global phenomenon worth $17 billion annually — from the revolutionary 10-step routine to game-changing inventions like cushion foundation, sheet masks, and the glass skin philosophy that redefined what beautiful skin means.':
      '韓国のスキンケアとビューティーは年間170億ドル規模のグローバルな現象 — 革新的な10ステップルーティンから、クッションファンデーション、シートマスク、そして美しい肌の定義を変えたガラス肌哲学まで。',

    // K-Beauty Global stats
    'Global K-beauty market 2024': 'グローバルK-ビューティー市場 2024年',
    'Korea top beauty exporter to US, surpassing France (2023)': '韓国、米国への美容品輸出1位（フランスを抜いた、2023年）',
    'Sheet masks sold globally per year': '年間グローバル販売シートマスク枚数',
    'Olive Young stores across Korea': '韓国国内オリーブヤング店舗数',
    'Dermatology clinics in Korea': '韓国の皮膚科クリニック数',
    'Projected global market by 2030': '2030年グローバル市場規模予測',

    // K-Beauty vs Western comparison table
    '🇰🇷 K-Beauty': '🇰🇷 K-ビューティー',
    '🌍 Western Beauty': '🌍 西洋ビューティー',
    'Core Philosophy': '基本哲学',
    'Routine Length': 'ルーティンの長さ',
    'SPF Culture': '日焼け止め文化',
    'Makeup Finish': 'メイクアップの仕上がり',
    'Key Ingredients': '主要成分',
    'Clinic Culture': 'クリニック文化',
    'Skin health first — 피부 관리. Goal: 유리 피부 (glass skin) — luminous, pore-less, from within.':
      '피부の健康最優先 — 피부 관리。目標：유리 피부（ガラス肌）— 透明感、毛穴レス、内側から輝く。',
    'Coverage and color. Conceal imperfections. Foundation as the first step.':
      'カバレッジとカラー。欠点を隠す。ファンデーションが最初のステップ。',
    '7–10 steps. Layering light hydrating products. Prevention-focused.':
      '7〜10ステップ。軽い保湿製品を重ね付け。予防重視。',
    '3–5 steps. Efficiency-focused. Correction when problems arise.':
      '3〜5ステップ。効率重視。問題が起きたら対処する。',
    'SPF 50+ PA++++ — daily, reapplied midday. Rain or shine, indoors or out.':
      'SPF50+ PA++++ — 毎日、お昼に塗り直し。雨でも晴れでも、室内外問わず。',
    'SPF often only in moisturizer. Summer or outdoor activity focused.':
      '日焼け止めはモイスチャライザーにのみ含まれることが多い。夏や屋外活動時重視。',
    'Dewy, glowing, 물광 (mulgwang / water-glow). Skin texture over coverage.':
      'ツヤ・輝き、물광（ムルグァン / ウォーターグロウ）。カバレッジより肌質。',
    'Matte, full-coverage, sharp contoured. Color drama.':
      'マット、フルカバレッジ、シャープなコントゥア。カラードラマ。',
    'Snail mucin, cica, fermented rice, ginseng, propolis, galactomyces.':
      'カタツムリムチン、ツボクサ、発酵米、人参、プロポリス、ガラクトミセス。',
    'Retinol, vitamin C, hyaluronic acid, salicylic acid.':
      'レチノール、ビタミンC、ヒアルロン酸、サリチル酸。',
    'Regular dermatologist visits for prevention — as casual as the gym.':
      '予防のための定期的な皮膚科受診 — ジムに行くのと同じくらい気軽。',
    'Derm visits for specific conditions. Stigma around cosmetic procedures.':
      '特定の症状のための皮膚科受診。美容施術への偏見がある。',

    // K-Beauty Timeline
    '⏳ K-Beauty Timeline · 뷰티의 역사': '⏳ K-ビューティー年表 · 뷰티의 역사',
    'Joseon Era · 조선시대': '朝鮮時代 · 조선시대',
    '2008 · Milestone': '2008 · マイルストーン',
    '2020 · Milestone': '2020 · マイルストーン',
    '2023 · Milestone': '2023 · マイルストーン',
    'Ancient Korean Beauty Rituals': '古代韓国の美容儀式',
    'Amorepacific Founded': 'アモーレパシフィック創設',
    'BB Cream Perfected by Korea': 'BBクリームを韓国が完成させた',
    'Cushion Foundation Invented · 쿠션 파운데이션 발명': 'クッションファンデーション発明 · 쿠션 파운데이션 발명',
    'The 10-Step Routine Meets the West': '10ステップルーティン、西洋へ',
    'Sheet Mask Craze Goes Global': 'シートマスク旋風、世界へ',
    'COSRX Snail Mucin Goes Viral': 'COSRXのカタツムリムチンがバイラルに',
    'Glass Skin Takes Over the World · 유리 피부 트렌드': 'ガラス肌が世界を席巻 · 유리 피부 트렌드',
    'Korea #1 Beauty Exporter to the US · 한국, 미국 최대 뷰티 수출국':
      '韓国、米国への美容品輸出1位 · 한국, 미국 최대 뷰티 수출국',
    'TirTir Viral for Inclusivity · 다양성 쿠션 바이럴': 'ティルティル、多様性で世界的話題 · 다양성 쿠션 바이럴',
    'Korean women used 동백기름 (camellia oil) for skin and hair, 쌀뜨물 (rice water) for brightening, and fermented herbal pastes. 한방 (hanbang) — traditional Korean herbal medicine — formed the philosophical core of Korean beauty: treat skin from within, not just cover it. These traditions are still central to premium K-beauty brands today.':
      '朝鮮時代の女性は동백기름（椿油）で肌と髪を、쌀뜨물（米のとぎ汁）で美白を、発酵薬草ペーストを使用していました。한방（ハンバン）— 伝統的な韓国漢方医学 — が韓国美容の哲学的核心を形成：表面を覆うだけでなく内側から肌を治療する。これらの伝統は今日のプレミアムK-ビューティーブランドにも受け継がれています。',
    'Suh Sung-hwan founded Taepyeong Co. (later renamed Amorepacific) — Korea\'s first major beauty company. It would grow into one of Asia\'s largest beauty conglomerates, eventually owning Sulwhasoo, Laneige, Innisfree, Etude House, and COSRX.':
      '徐成煥が太平洋化学工業社（後にアモーレパシフィックに改名）を設立 — 韓国初の主要化粧品会社。アジア最大の美容コングロマリットの一つに成長し、やがて설화수、라네즈、이니스프리、에뛰드 하우스、COSRXを擁するまでになりました。',
    'BB cream — originally a German post-laser recovery cream — was adopted and reimagined by Korean dermatologists and beauty brands. Korean versions became lighter, more wearable, SPF-infused, and skin-tone-adjusting. Korea didn\'t invent it, but made it the global foundation-alternative it is today.':
      'BBクリーム — 元々はドイツのレーザー施術後回復クリーム — が韓国の皮膚科医と美容ブランドによって採用・再解釈されました。韓国版はより軽く、使いやすく、SPF配合で肌トーン補正を可能にしました。韓国が発明したわけではないが、今日のグローバルなファンデーション代替品として完成させたのは韓国です。',
    'Amorepacific invented and patented the cushion foundation — liquid foundation soaked into a sponge puffer inside an air-tight compact. A revolutionary delivery format that every global makeup brand (Dior, Chanel, NARS, L\'Oréal) now uses. A $3+ billion global product category, started entirely in a Korean lab.':
      'アモーレパシフィックがクッションファンデーションを発明・特許取得 — 密閉コンパクト内のスポンジパフに液体ファンデーションを含浸させたもの。すべてのグローバルメイクアップブランド（ディオール、シャネル、NARS、ロレアル）が現在使用する革新的なデリバリー形式。30億ドル超のグローバル製品カテゴリーが韓国の研究室から生まれました。',
    'Western beauty editors and bloggers discovered Korean skincare via Into The Gloss and early YouTube. The term "K-beauty" was coined. The concept of layering light products — toner → essence → ampoule → serum — was entirely new to Western consumers accustomed to cleanser-toner-moisturizer routines.':
      '西洋の美容エディターとブロガーがInto The GlossとYouTube黎明期を通じて韓国スキンケアを発見しました。「K-ビューティー」という言葉が生まれました。軽い製品を重ねるコンセプト — トナー → エッセンス → アンプル → セラム — はクレンザー・トナー・モイスチャライザーのルーティンに慣れた西洋の消費者にとって全く新しいものでした。',
    'Korean sheet masks exploded onto Western beauty shelves. Mediheal became the world\'s #1 sheet mask brand by sales volume. Sephora, Target, and Ulta dedicated entire sections to K-beauty for the first time. The self-care ritual of the sheet mask — lying back with a face-shaped mask on — became an internationally recognizable K-beauty image.':
      '韓国のシートマスクが西洋の美容棚に爆発的に登場しました。メディヒールが販売量で世界第1位のシートマスクブランドになりました。セフォラ、ターゲット、ウルタが初めてK-ビューティー専用セクションを設置しました。シートマスクのセルフケア儀式 — 顔形のマスクをつけて横になる — が国際的に認知されるK-ビューティーイメージになりました。',
    'COSRX\'s Advanced Snail 96 Mucin Power Essence became a global cult product — the first K-beauty ingredient that made non-Korean consumers actively seek out an unfamiliar ingredient. It surpassed 30 million units sold, made "snail skincare" a mainstream concept, and proved K-beauty could win on efficacy alone, not just packaging.':
      'COSRXのアドバンスドスネイル96ムチンパワーエッセンスがグローバルなカルト製品になりました — 非韓国人消費者が積極的に求めた初のK-ビューティー成分。3,000万個以上の販売を達成し、「カタツムリスキンケア」を主流の概念にし、K-ビューティーがパッケージングだけでなく有効性だけで勝てることを証明しました。',
    '유리 피부 (glass skin) — skin so clear, smooth, and hydrated it appears translucent — became the world\'s #1 beauty search term. TikTok and Instagram turned K-beauty into the dominant global beauty philosophy. Over 28 billion views of K-beauty content on TikTok. The concept that skin health IS the beauty goal, not just its foundation, went fully mainstream.':
      '유리 피부（ガラス肌）— 透明に見えるほど澄んで滑らかで潤いのある肌 — が世界第1位の美容検索ワードになりました。TikTokとInstagramがK-ビューティーを支配的なグローバル美容哲学にしました。TikTokのK-ビューティーコンテンツが280億回以上再生。肌の健康こそが美の目標であるというコンセプトが完全に主流になりました。',
    'For the first time in history, South Korea overtook France as the #1 source of beauty imports to the United States — a seismic shift in global beauty trade unimaginable a decade earlier. In the same year, COSRX was acquired by Amorepacific for ~$400 million, marking K-beauty\'s full arrival as a financial powerhouse.':
      '史上初めて、韓国が米国への美容品輸入国第1位としてフランスを抜きました — 10年前には想像もできなかったグローバル美容貿易の地殻変動。同年、COSRXが約4億ドルでアモーレパシフィックに買収され、K-ビューティーが金融的強国としての完全な地位を確立しました。',
    'TirTir\'s Mask Fit Real Cover Cushion went viral on TikTok for a breakthrough: 40 shades including deep, dark, and richly pigmented tones — rare in K-beauty. A turning point where K-beauty led in shade inclusivity. TirTir landed in Sephora and Ulta across North America, opening K-beauty to new demographics worldwide.':
      'ティルティルのマスクフィットリアルカバークッションが、K-ビューティーでは珍しい深みのあるダーク系40色というブレークスルーでTikTokにバイラルしました。K-ビューティーがシェードの包括性でリードする転換点。ティルティルが北米全域のセフォラとウルタに入り、K-ビューティーを世界中の新たな顧客層に開きました。',

    // Iconic Brands section
    '🏢 Iconic K-Beauty Brands · 대표 뷰티 브랜드': '🏢 アイコニックK-ビューティーブランド · 대표 뷰티 브랜드',
    'From century-spanning conglomerates to viral TikTok brands — these are the Korean beauty companies reshaping the global industry.':
      '百年以上の歴史を持つコングロマリットからバイラルTikTokブランドまで — グローバル産業を再形成している韓国の美容企業たち。',
    'Founded 1945 · Korea\'s #1 Beauty Conglomerate': '1945年創設 · 韓国No.1美容コングロマリット',
    'Founded 2013 · TikTok\'s Most Viral K-Beauty Brand': '2013年創設 · TikTokで最もバイラルなK-ビューティーブランド',
    'Founded 1994 · "The Water Brand" · Lip Mask Icon': '1994年創設 · 「ウォーターブランド」· リップマスクの代名詞',
    'Founded 1987 · Korea\'s Most Prestigious Luxury Skincare': '1987年創設 · 韓国最高峰の高級スキンケア',
    'Founded 2017 · Heritage + Hanbang · TikTok Viral': '2017年創設 · ヘリテージ + ハンバン · TikTokバイラル',
    'Founded 2020 · 40 Shades · Inclusivity Pioneer': '2020年創設 · 40色 · インクルーシビティの先駆者',
    'Parent Conglomerate · 30+ Brands': '親会社コングロマリット · 30以上のブランド',
    '"Cosmetics + Rx" · Effective Minimalism': '「コスメ + Rx」· 効果的ミニマリズム',
    'Hydration Skincare · Amorepacific Brand': '保湿スキンケア · アモーレパシフィックブランド',
    'Luxury Hanbang Skincare · 한방 뷰티': '高級ハンバンスキンケア · 한방 뷰티',
    'Hanbang Modern · Heritage Aesthetic': '現代ハンバン · ヘリテージ美学',
    'Cushion · Foundation · SPF · Inclusivity': 'クッション · ファンデーション · SPF · インクルーシビティ',
    '📍 Seoul · Global · KRX Listed · ~$3B Annual Revenue': '📍 ソウル · グローバル · KRX上場 · 年間売上約30億ドル',
    '📍 Seoul · Amazon #1 · Acquired by Amorepacific 2023 (~$400M)': '📍 ソウル · Amazon1位 · 2023年アモーレパシフィックに買収（約4億ドル）',
    '📍 Seoul · Sephora · Ulta · Global': '📍 ソウル · セフォラ · ウルタ · グローバル',
    '📍 Seoul · Global Luxury · $200–500 Products': '📍 ソウル · グローバルラグジュアリー · 商品価格200〜500ドル',
    '📍 Seoul · Sephora US · Urban Outfitters · TikTok Viral': '📍 ソウル · セフォラUS · アーバンアウトフィッターズ · TikTokバイラル',
    '📍 Seoul · Sephora US · Ulta · TikTok Viral 2023–2024': '📍 ソウル · セフォラUS · ウルタ · TikTokバイラル 2023〜2024',
    'Korea\'s largest beauty company — founded in 1945. Inventor of the cushion foundation (patented 2008), which changed global makeup forever. Parent company of Sulwhasoo, Laneige, Innisfree, Etude House, Mamonde, IOPE, and COSRX (acquired 2023 for ~$400M). Their research labs hold hundreds of patents in fermentation science, traditional Korean herbal formulations, and delivery technology. Amorepacific\'s rise mirrors Korea\'s own transformation into a global soft-power leader.':
      '1945年設立の韓国最大の美容企業。クッションファンデーション（2008年特許）の発明者で、世界のメイクアップを永遠に変えました。설화수、라네즈、이니스프리、에뛰드 하우스、マモンド、IOPE、COSRX（2023年買収、約4億ドル）の親会社。研究所は発酵科学、伝統的な韓国漢方処方、デリバリーテクノロジーに関する数百件の特許を保有。アモーレパシフィックの台頭は韓国自身のグローバルソフトパワーリーダーへの変革を映し出しています。',
    'The brand that put snail mucin on the global map. Founded in 2013 with a philosophy of "skincare as prescription" — effective, minimal ingredients at accessible prices. Their Advanced Snail 96 Mucin Power Essence (30M+ units sold) became one of Amazon\'s all-time best-selling skincare products. Their AHA 7 Whitehead Power Liquid and Low pH Good Morning Gel Cleanser are equally iconic. Acquired by Amorepacific in 2023 in a deal valuing the brand at ~$400 million.':
      'カタツムリムチンを世界地図に乗せたブランド。2013年に「スキンケアを処方として」というフィロソフィーで設立 — 手ごろな価格で効果的でミニマルな成分。アドバンスドスネイル96ムチンパワーエッセンス（3,000万個以上販売）はAmazonの歴代ベストセラースキンケア製品の一つになりました。AHA 7ホワイトヘッドパワーリキッドとLow pH グッドモーニングゲルクレンザーも同様にアイコニック。2023年にアモーレパシフィックに約4億ドルで買収されました。',
    'Laneige (French for "snow") is Amorepacific\'s hydration-focused line built around water science. Their Water Sleeping Mask introduced Western consumers to sleeping pack culture — apply at night, wash off in the morning. Their Lip Sleeping Mask went mega-viral on TikTok with 50M+ units sold and Sydney Sweeney as brand ambassador. A crossover K-beauty staple now found in bathrooms worldwide.':
      'ラネージュ（フランス語で「雪」）はアモーレパシフィックの水科学を基盤とした保湿特化ラインです。ウォータースリーピングマスクが西洋の消費者にスリーピングパック文化を紹介 — 夜に塗り、朝に洗い流す。リップスリーピングマスクはTikTokで大バイラルとなり、5,000万個以上販売、シドニー・スウィーニーがブランドアンバサダー。今や世界中のバスルームで見かけるK-ビューティーの定番。',
    'Korea\'s most prestigious luxury skincare brand — built on 한방 (hanbang), the principles of traditional Korean herbal medicine. Their First Care Activating Serum uses ginseng, licorice root, and peony to balance skin from within — not target surface symptoms. Sulwhasoo is to Korean beauty what La Mer is to Western skincare: an aspirational luxury backed by genuine research. Sold in luxury department stores and its own flagship spas globally.':
      '한방（ハンバン）、伝統的な韓国漢方医学の原則に基づいた韓国最高峰の高級スキンケアブランド。ファーストケアアクティベーティングセラムは人参、甘草の根、牡丹を使い、表面の症状ではなく内側から肌のバランスを整えます。설화수の韓国美容における位置づけは、西洋スキンケアにおけるラ・メールと同じ：本物の研究に裏打ちされた憧れの高級品。世界中の高級百貨店と直営フラッグシップスパで販売。',
    'Positioned at the intersection of Joseon-era tradition and modern K-beauty science. Their Glow Serum (propolis + niacinamide) and Dynasty Cream (ginseng + royal jelly) deliver hanbang heritage with contemporary clinical formulations — at accessible prices. Exploded on TikTok with an aesthetic that feels like opening a Korean antique lacquerware chest. One of the fastest-growing K-beauty brands in the US market.':
      '朝鮮時代の伝統と現代K-ビューティーサイエンスの交差点に位置。グロウセラム（プロポリス + ナイアシンアミド）とダイナスティクリーム（人参 + ローヤルゼリー）は手ごろな価格で現代的な臨床処方とハンバンヘリテージを提供。韓国の古美術漆器を開けるような美学でTikTokに爆発的に広まりました。米国市場で最も急成長しているK-ビューティーブランドの一つ。',
    'The youngest brand on this list — and the most viral of 2023–2024. TirTir\'s Mask Fit Real Cover Cushion exploded on TikTok for something unprecedented in K-beauty: 40 shades including deep and dark skin tones. K-beauty had historically been criticized for limited shade ranges. TirTir answered with science-backed, inclusive technology matching any complexion — earning Sephora and Ulta placement across North America and opening K-beauty to an entirely new global audience.':
      'このリスト最年少のブランド — そして2023〜2024年最もバイラルなブランド。ティルティルのマスクフィットリアルカバークッションがK-ビューティーで前例のないこと、深みのあるダーク系を含む40色でTikTokに爆発しました。K-ビューティーは歴史的に限られたシェードレンジを批判されてきました。ティルティルは科学に基づいたどんな肌色にも対応するインクルーシブテクノロジーで答え、北米全域のセフォラとウルタへの入店を獲得し、K-ビューティーを全く新しいグローバル観客層に開きました。',
    'Global Leader': 'グローバルリーダー',
    'Amazon Best-Seller': 'Amazonベストセラー',
    'Water Science': '水科学',
    'Sephora Icon': 'セフォラのアイコン',
    'Luxury Skincare': '高級スキンケア',

    // Beauty Vocabulary table
    '📖 Beauty Vocabulary': '📖 ビューティー語彙',
    'Skin': '肌',
    'Face cleansing / washing': '洗顔 / 洗い',
    'Toner': '化粧水',
    'Essence': 'エッセンス',
    'Serum': 'セラム',
    'Moisturizer / hydration cream': 'モイスチャライザー / 保湿クリーム',
    'Sunscreen': '日焼け止め',
    'Sheet mask': 'シートマスク',
    'Dead skin cells': '角質 / 死んだ皮膚細胞',
    'Pores': '毛穴',
    'Moist / dewy (ideal skin descriptor)': '潤い / しっとり（理想の肌の表現）',
    'Elasticity / firmness': '弾力 / 引き締まり',
    'Skin trouble / breakout': '肌トラブル / ニキビ',
    'Oil-moisture balance': '油分・水分バランス',

    // 10-Step Skincare Routine
    '🧴 The 10-Step Korean Skincare Routine': '🧴 韓国スキンケア10ステップルーティン',
    'Oil Cleanser': 'オイルクレンザー',
    'Water-Based Cleanser': '水性クレンザー',
    'Exfoliator': '角質除去剤',
    'Treatments / Serums': '美容液 / セラム',
    'Sheet Mask': 'シートマスク',
    'Eye Cream': 'アイクリーム',
    'Moisturizer': 'モイスチャライザー',
    'Sunscreen (AM) / Sleeping Pack (PM)': '日焼け止め（AM）/ スリーピングパック（PM）',

    // Shopping Phrases at Olive Young
    '🛍️ Shopping Phrases at Olive Young': '🛍️ オリーブヤングでのショッピングフレーズ',
    'Can I try this out?': '試してもいいですか？',
    'Is this suitable for my skin type?': '私の肌タイプに合いますか？',
    'Is this good for sensitive skin?': '敏感肌に良いですか？',
    'Is this popular / trending right now?': 'これは今人気がありますか？',
    'Is there a sale / discount event?': 'セール・割引イベントはありますか？',
    'Can you give me samples?': 'サンプルをいただけますか？',

    // Key Ingredients section
    '🌿 Must-Know K-Beauty Ingredients · 핵심 성분': '🌿 K-ビューティーの必須成分 · 핵심 성분',
    'Korean skincare introduced the world to ingredients that were unusual, unfamiliar — and incredibly effective. These hero ingredients define K-beauty\'s global appeal.':
      '韓国スキンケアは、珍しく馴染みのない — しかし信じられないほど効果的な成分を世界に紹介しました。これらのヒーロー成分がK-ビューティーのグローバルな魅力を定義しています。',
    'Snail Mucin': 'カタツムリムチン',
    'Cica · Centella Asiatica': 'ツボクサ（センテラ・アジアティカ）',
    'Niacinamide': 'ナイアシンアミド',
    'Ginseng · 인삼': '人参 · 인삼',
    'Galactomyces · Fermented': 'ガラクトミセス · 発酵',
    'Propolis': 'プロポリス',
    'Hyaluronic Acid': 'ヒアルロン酸',
    'Korean Sunscreen': '韓国の日焼け止め',
    'Glycoproteins secreted by snails — filtered and purified for skincare. Deeply hydrating, promotes healing and cell turnover, fades scars, and smooths texture. Sounds unusual; works remarkably well on all skin types with zero irritation.':
      'カタツムリが分泌する糖タンパク質 — スキンケア用に濾過・精製されたもの。深い保湿、治癒と細胞ターンオーバーの促進、傷跡の薄化、テクスチャーの改善。珍しく聞こえますが、刺激ゼロであらゆる肌タイプに驚くほど効果的です。',
    'An ancient Asian healing herb with powerful anti-inflammatory and calming properties. K-beauty pioneered its mass commercial use for barrier repair, redness reduction, and post-acne recovery. Now a global standard for sensitive skin.':
      '強力な抗炎症・鎮静効果を持つ古代アジアの治癒ハーブ。K-ビューティーがバリア修復、赤み軽減、ニキビ後の回復のための大量商業利用の先駆けとなりました。今や敏感肌のグローバルスタンダード。',
    'Vitamin B3. Brightens skin tone, minimizes pores, reduces hyperpigmentation, and strengthens the barrier. K-beauty brands mainstreamed niacinamide globally at high concentrations — it\'s now the world\'s most-used skincare active, and K-beauty led that shift.':
      'ビタミンB3。肌トーンを明るくし、毛穴を最小化し、色素沈着を軽減し、バリアを強化します。K-ビューティーブランドが高濃度のナイアシンアミドをグローバルに主流化 — 今や世界で最も使用されるスキンケア成分であり、K-ビューティーがその変化をリードしました。',
    'Korea\'s most treasured natural ingredient — used medicinally for 5,000 years. In skincare: boosts collagen production, brightens dull complexions, improves elasticity, and acts as an adaptogen reducing environmental skin stress. The centerpiece of luxury hanbang skincare.':
      '5,000年以上にわたり薬用として使用されてきた韓国の最も珍重される天然成分。スキンケアにおいては：コラーゲン生成を促進し、くすんだ肌を明るくし、弾力を改善し、環境ストレスから肌を守るアダプトゲンとして機能します。高級ハンバンスキンケアの中心的成分。',
    'A byproduct of sake (rice wine) fermentation — famously discovered when sake brewery workers had remarkably youthful, soft hands despite harsh labor. Brightens, hydrates, and penetrates deeper than most actives. Korea\'s fermentation beauty philosophy traces back to centuries of kimchi and doenjang culture.':
      '日本酒（米酒）発酵の副産物 — 酒蔵の職人が過酷な労働にもかかわらず驚くほど若々しく柔らかい手をしていたことで有名な発見。明るくし、保湿し、ほとんどの成分より深く浸透します。韓国の発酵ビューティー哲学は、数百年にわたるキムチとテンジャン文化に遡ります。',
    'A resin produced by honeybees to seal and sterilize their hives. Naturally antibacterial, antifungal, and powerfully healing. Calms breakouts, promotes cell regeneration, and gives skin a natural luminosity. Beauty of Joseon\'s signature ingredient.':
      'ミツバチが巣を密封・殺菌するために生産する樹脂。天然の抗菌・抗真菌効果と強力な治癒力。ニキビを鎮静し、細胞再生を促進し、肌に自然な輝きを与えます。조선미녀のシグニチャー成分。',
    'A molecule that holds up to 1,000× its own weight in water. Korean brands pioneered multi-weight HA formulas — different molecular chain lengths that penetrate different skin layers for hydration at every depth. Now the world\'s #1 most-used skincare ingredient, popularized by K-beauty toner culture.':
      '自重の最大1,000倍の水分を保持する分子。韓国ブランドがマルチウェイトHA処方の先駆者 — 異なる分子鎖長が異なる皮膚層に浸透し、あらゆる深さで保湿。今や世界第1位の最も使用されるスキンケア成分で、K-ビューティートナー文化によって普及しました。',
    'Korean SPF is a different category from Western sunscreen — lightweight, invisible, non-greasy, and skin-care infused. Korea pioneered SPF50+ PA++++ ratings (PA measures UVA protection depth). Applied every morning, reapplied midday — rain, shine, or indoors. The single most important step in the Korean anti-aging philosophy.':
      '韓国のSPFは西洋の日焼け止めとは異なるカテゴリー — 軽量、透明、べたつかず、スキンケア成分配合。韓国がSPF50+ PA++++レーティングの先駆者（PAはUVA防護深度を測定）。毎朝塗り、昼に塗り直し — 雨でも晴れでも、室内でも。韓国のアンチエイジング哲学で唯一最も重要なステップ。',
    'Key brands: COSRX Advanced Snail 96 Mucin Essence · Benton Snail Bee High Content Serum':
      '主要ブランド：COSRX アドバンスドスネイル96ムチンエッセンス · ベントン スネイルビーハイコンテントセラム',
    'Key brands: Dr. Jart+ Cicapair · COSRX Pure Fit Cica Serum · Purito Centella Unscented Serum':
      '主要ブランド：Dr. Jart+ シカペア · COSRX ピュアフィットシカセラム · プリト センテラ無香料セラム',
    'Key brands: Beauty of Joseon Glow Serum · COSRX Niacinamide 15% · Isntree Hyaluronic Acid Toner':
      '主要ブランド：조선미녀 グロウセラム · COSRX ナイアシンアミド15% · イズンツリー ヒアルロン酸トナー',
    'Key brands: Sulwhasoo First Care Activating Serum · Beauty of Joseon Dynasty Cream · History of Whoo':
      '主要ブランド：설화수 ファーストケアアクティベーティングセラム · 조선미녀 ダイナスティクリーム · 후（フー）',
    'Key brands: SK-II Facial Treatment Essence (Pitera) · COSRX Galactomyces 95 Tone Balancing Essence':
      '主要ブランド：SK-II フェイシャルトリートメントエッセンス（ピテラ）· COSRX ガラクトミセス95トーンバランシングエッセンス',
    'Key brands: Beauty of Joseon Glow Serum · COSRX Propolis Light Ampule · Benton Aloe Propolis Soothing Gel':
      '主要ブランド：조선미녀 グロウセラム · COSRX プロポリスライトアンプル · ベントン アロエプロポリスソーシングジェル',
    'Key brands: Laneige Water Bank Hydration Serum · Isntree Hyaluronic Acid Toner · Some By Mi':
      '主要ブランド：라네즈 ウォーターバンク保湿セラム · イズンツリー ヒアルロン酸トナー · サムバイミー',
    'Key brands: TirTir Milk Sun Cushion · Beauty of Joseon Relief Sun · COSRX Aloe Soothing Sun Cream':
      '主要ブランド：티르티르 ミルクサンクッション · 조선미녀 リリーフサン · COSRX アロエスージングサンクリーム',

    // Beauty Trends section
    '✨ K-Beauty Trends · 뷰티 트렌드': '✨ K-ビューティートレンド · 뷰티 트렌드',
    'Glass Skin': 'ガラス肌',
    '2020 → Now': '2020年 → 現在',
    'No-Makeup Makeup': 'すっぴんメイク',
    'Cushion Foundation': 'クッションファンデーション',
    'Korean Invention': '韓国発明',
    'Gradient Lips': 'グラデーションリップ',
    'Cute Eye Pouches': 'かわいいアイポーチ（目の下の脂肪）',
    'Straight Brows': '一字眉',
    'Korean Signature': '韓国の代名詞',
    'Water-Glow': 'ウォーターグロウ',
    'Skip-Care': 'スキップケア',
    'Minimalism': 'ミニマリズム',
    'Skin so clear, smooth, and hydrated it appears translucent — like glass. NOT a makeup look; it\'s the result of consistent skincare: layered hydration, SPF discipline, and treating skin health as beauty itself. Became the world\'s #1 beauty trend in 2020 and hasn\'t left.':
      'ガラスのように透明に見えるほど澄んで滑らかで潤いのある肌。メイクアップルックではない；一貫したスキンケアの結果：重ね保湿、SPFの習慣、肌の健康を美そのものとして扱うこと。2020年に世界第1位の美容トレンドになり、今も変わりません。',
    '"Looks made up but not made up" — the Korean makeup philosophy in one phrase. The goal is to look effortlessly natural while wearing a full routine. Emphasis on skin texture over coverage; dewy finish over matte; subtle color, never drama.':
      '「メイクしているけどしていない」— 韓国のメイクアップ哲学を一言で表す。目標はフルルーティンをしながらも自然に見えること。カバレッジより肌のテクスチャー、マットよりツヤ仕上げ、ドラマではなく繊細なカラーを重視。',
    'Invented and patented by Amorepacific in 2008. Liquid foundation infused into an air-tight puffer sponge compact — delivering a thin, breathable, buildable layer with a dewy finish. Changed global makeup permanently. Dior, Chanel, NARS all followed. Every major brand now has one.':
      '2008年にアモーレパシフィックが発明・特許取得。密閉パフスポンジコンパクトに液体ファンデーションを含浸 — ツヤ仕上げで薄く、通気性があり、重ねられる層を提供。グローバルメイクアップを永久に変えました。ディオール、シャネル、NARSがすべて追随。すべての主要ブランドが今や同様の製品を持っています。',
    'The iconic Korean lip technique: concentrate color in the center of the lips and blend outward. Creates a soft, bitten, naturally flushed look — not a defined edge. Known internationally as the "Korean gradient lip" or "jelly lip." Widely copied in global beauty tutorials.':
      'アイコニックな韓国リップテクニック：唇の中心にカラーを集中させ外側にぼかす。明確なエッジではなく、柔らかくかまれたような自然に上気したルックを作ります。「コリアングラデーションリップ」または「ジェリーリップ」として国際的に知られています。グローバルな美容チュートリアルで広く模倣されています。',
    'The small under-eye fat pads that create a slightly puffy, youthful look. In the West, people conceal these with color correctors. In Korea, 애교살 is considered cute and youthful — Koreans enhance it with light shimmer or even filler. A completely opposite cultural beauty standard.':
      '少しふっくらとした若々しいルックを作る目の下の小さな脂肪パッド。西洋では、カラーコレクターで隠します。韓国では、애교살はかわいく若々しいとみなされます — 韓国人はライトシマーやフィラーで애교살を強調します。完全に反対の文化的美の基準。',
    'Korean beauty favors straight, flat, horizontal eyebrows — opposite of Western arched dramatic brows. Straight brows create a softer, more youthful appearance and work with the 꾸민 듯 안 꾼 듯 philosophy. Became a global beauty conversation point when Korean influencers went viral for this distinct look.':
      '韓国ビューティーは西洋のアーチ型ドラマチックな眉とは反対に、まっすぐで平らな水平の眉を好みます。一字眉はよりソフトで若々しい外見を作り、꾸민 듯 안 꾼 듯哲学と調和します。韓国のインフルエンサーがこの独特なルックでバイラルになったとき、グローバルな美容議論ポイントになりました。',
    '물광 (mulgwang) = "water-glow" — skin that looks dewy, luminous, and deeply hydrated. Achieved through hydrating skin prep, illuminating primers, dewy foundations, and subtle highlighting. The antithesis of heavy Western matte coverage culture. Inspired the global "glass skin makeup" movement.':
      '물광（ムルグァン）= 「ウォーターグロウ」— ツヤがあり、輝き、深く潤いのある肌。保湿スキンケアプレップ、イルミネーティングプライマー、ツヤ系ファンデーション、繊細なハイライトで実現。重い西洋式マットカバレッジ文化の対極。グローバルな「ガラス肌メイク」ムーブメントにインスピレーションを与えました。',
    'The countertrend to the 10-step routine — 2–4 targeted, effective products rather than layering many steps. Focus on getting the RIGHT actives, not more steps. Popularized by minimalist lifestyle trends post-2020. Proof that K-beauty can identify its own excesses and self-correct.':
      '10ステップルーティンへの対抗トレンド — 多くのステップを重ねるのではなく、2〜4つの的を絞った効果的な製品。より多くのステップではなく、正しい成分を選ぶことに集中。2020年以降のミニマリストライフスタイルトレンドによって普及。K-ビューティーが自身の過剰を識別し自己修正できることの証明。',

    // Korean Makeup Philosophy section
    '💄 Korean Makeup Philosophy · 메이크업 철학': '💄 韓国メイクアップ哲学 · 메이크업 철학',
    'Skin Prep First': '肌プレップ優先',
    'Dewy Over Matte': 'マットよりツヤ',
    'Subtle Contouring': '繊細なコントゥアリング',
    'Monolid Beauty': '一重まぶたの美',
    '꾸민 듯 안 꾼 듯 — The Golden Standard of Korean Makeup': '꾸민 듯 안 꾼 듯 — 韓国メイクアップのゴールデンスタンダード',
    '꾸민 듯 안 꾼 듯 (kumin deut an kkun deut) — "it looks like you made an effort, but also like you didn\'t" — is the defining philosophy of Korean beauty. The goal is never to look heavily made up. Makeup enhances, it doesn\'t transform. Skin is the canvas — and good skin matters more than anything applied on top of it.':
      '꾸민 듯 안 꾼 듯（クミン・デウッ・アン・クン・デウッ）— 「努力したようで、していないよう」— 韓国ビューティーの定義的哲学。目標は決してしっかりメイクをしているように見えることではありません。メイクアップは変えるのではなく引き立てるもの。肌はキャンバス — そして良い肌は何より上に塗るものよりも大切。',
    'Korean makeup starts with thorough skincare prep — toner, essence, serum — before any color product. The theory: well-prepared skin makes any makeup look 10× better on top. Foundation is a last resort, not the first step. Skin texture over coverage, always.':
      '韓国メイクアップは、カラー製品の前に徹底的なスキンケアプレップ — トナー、エッセンス、セラム — から始まります。理論：よく準備された肌はその上のあらゆるメイクアップを10倍良く見せます。ファンデーションは最後の手段であり、最初のステップではありません。常にカバレッジより肌のテクスチャーを優先。',
    'Korean beauty embraces a dewy, hydrated finish over a powdered matte one. Setting spray, not setting powder, is the preferred final step. Even sunscreen is chosen partly for its glow and skin-feel contribution. If your skin looks cakey, you\'ve gone too far.':
      '韓国ビューティーはパウダーのマット仕上げよりツヤのある潤いある仕上げを好みます。セッティングパウダーではなくセッティングスプレーが好まれる最終ステップ。日焼け止めさえもそのグロウと肌感への貢献で選ばれます。肌がケーキのように見えたら、やりすぎです。',
    'Korean contouring is light, soft, and diffused — opposite of the sharp-edge Western technique. The focus is enhancing natural bone structure, not sculpting a new one. A soft bronzer swept under the cheekbones is typical; heavy nose contour is avoided as too obvious.':
      '韓国のコントゥアリングは軽く、柔らかく、広がる — シャープエッジの西洋テクニックの反対。新しい骨格を彫刻するのではなく、自然な骨格構造を引き立てることに焦点。頬骨の下にソフトなブロンザーをさっと塗るのが典型的；重い鼻のコントゥアは目立ちすぎとして避けられます。',
    'Korean makeup celebrates monolid (단꺼풀) eyes with its own technique — smudged lower lash liner, light shimmer on the inner corner, and 애교살 enhancement create a distinctive look that has its own global fan base. Korean beauty channels taught the world how to apply makeup for monolid eye shapes.':
      '韓国メイクアップは独自のテクニックで단꺼풀（一重まぶた）の目を称えます — にじんだ下まつ毛ライナー、目頭への軽いシマー、애교살の強調が独特のルックを作り、独自のグローバルファン層を持ちます。韓国の美容チャンネルが一重まぶたの目のメイクアップの仕方を世界に教えました。',

    // 피부과 Culture section
    '🏥 피부과 Culture · Korea\'s Dermatology-First Mindset': '🏥 피부과 文化 · 韓国の皮膚科ファーストの考え方',
    '피부과 — Not Just for Problem Skin': '피부과 — 問題肌のためだけではない',
    'Korea has over 7,000 dermatology clinics (피부과) — one of the highest densities per capita in the world. But unlike most countries, visiting the dermatologist in Korea is regular and casual — not reserved for emergencies. Koreans go to manage and prevent, not just treat. Saying "피부과 갔다 왔어" (I just went to the derm) is completely normal — like saying "I went to the gym." Treatments like 레이저 토닝 (laser toning), 보톡스 (jaw-slimming Botox), 필러 (fillers), and 물광주사 (skin booster injections) carry no stigma. Medical beauty tourism is a major industry — foreigners fly to Seoul specifically for affordable, high-quality cosmetic procedures.':
      '韓国には7,000以上の皮膚科クリニック（피부과）があり、世界最高水準の人口あたりの密度の一つ。しかし、ほとんどの国とは異なり、韓国での皮膚科受診は定期的で気軽 — 緊急時のためだけではありません。韓国人は治療だけでなく管理と予防のために行きます。「피부과 갔다 왔어」（皮膚科に行ってきた）と言うのはごく普通 — ジムに行ってきたと言うようなもの。레이저 토닝（レーザートーニング）、보톡스（顎やせボトックス）、필러（フィラー）、물광주사（スキンブースター注射）などの施術に偏見はありません。医療美容ツーリズムは主要産業 — 外国人が手頃で高品質な美容施術のために特にソウルに飛んできます。',
    'Dermatology clinic': '皮膚科クリニック',
    'Laser toning': 'レーザートーニング',
    'Botox': 'ボトックス',
    'Skin booster injection': 'スキンブースター注射',
    'Filler': 'フィラー',
    'I just went to the dermatologist.': '皮膚科に行ってきました。',
    'Literally "skin department." For both medical conditions and cosmetic management — no distinction between the two in Korea.':
      '文字通り「肌の部門」。韓国では医学的な症状と美容管理の両方を担当し、両者の区別がありません。',
    'Low-intensity laser for brightening and removing pigmentation. Very common routine treatment — often done monthly.':
      '明るくし色素を除去するための低強度レーザー。非常に一般的なルーティン施術 — 毎月行われることが多い。',
    'Common for forehead lines and 사각턱 (jaw slimming). Completely unstigmatized at any age. Both men and women get it regularly.':
      'おでこのしわと사각턱（顎やせ）に一般的。どの年齢でも全く偏見なし。男女ともに定期的に受けます。',
    'Hyaluronic acid injected directly into the skin — creates intense glass-skin glow from within. Also called 스킨부스터. Very popular for 물광 (water-glow) effect.':
      'ヒアルロン酸を皮膚に直接注射 — 内側から強烈なガラス肌の輝きを作ります。스킨부스터とも呼ばれます。물광（ウォーターグロウ）効果に非常に人気。',
    'Dermal fillers for under-eyes, nose bridge, and lips. Korea is a global destination for affordable, skilled, natural-looking filler work.':
      '目の下、鼻筋、唇のための真皮フィラー。韓国は手頃で熟練した自然なフィラー施術のグローバルな目的地。',
    'A completely casual, unstigmatized statement in Korea — as normal as saying you went for a haircut or to the gym.':
      '韓国では完全に気軽で偏見のない発言 — 美容院やジムに行ったと言うのと同じくらい普通。',

    // K-Beauty Dialogue section
    '💬 K-Beauty Dialogue · 올리브영에서 (At Olive Young)': '💬 K-ビューティー会話 · 올리브영에서 (At Olive Young)',
    '올리브영 — Korea\'s Essential Beauty Destination': 'オリーブヤング — 韓国の必須ビューティー目的地',
    '올리브영 (Olive Young) is THE K-beauty shopping experience — a 1,300+ store health & beauty retailer owned by CJ Corp, founded 1999. Part pharmacy, part beauty store, part impulse-buy paradise. The Myeongdong flagship store is one of Seoul\'s most visited tourist destinations. Staff are knowledgeable and generous with samples (샘플). Many K-beauty tourists plan their entire Seoul shopping itinerary around Olive Young hauls.':
      'オリーブヤングはK-ビューティーショッピング体験の代名詞 — CJコープ所有、1999年創設の1,300以上の店舗を持つヘルス&ビューティーリテーラー。薬局であり、美容店であり、衝動買い天国でもある。明洞フラッグシップストアはソウルで最も訪問される観光地の一つ。スタッフは知識豊富でサンプル（샘플）に気前が良い。多くのK-ビューティーツーリストがオリーブヤングのハウルを中心にソウルのショッピング旅程を計画します。',
    '🛍️ 추천 요청 — Getting a Recommendation at Olive Young': '🛍️ 추천 요청 — オリーブヤングでのおすすめ依頼',
    '🛒 계산할 때 — At the Register · Samples & Membership': '🛒 계산할 때 — レジで · サンプルと会員について',
    'I have dry skin — can you recommend a moisturizer?': '乾燥肌なのですが、モイスチャライザーをおすすめしていただけますか？',
    'This one is selling like crazy lately! It\'s intensely hydrating and absorbs really fast.':
      '最近これがすごく売れています！保湿力がすごく、吸収も速いです。',
    'Can I try the tester?': 'テスターを試してもいいですか？',
    'Of course! The tester is right here. Try it on the back of your hand.':
      'もちろん！テスターはこちらです。手の甲で試してみてください。',
    'I\'ll take two of these. Please throw in some samples!': 'これを2つください。サンプルも少し入れてください！',
    'Do you have an Olive Young membership card?': 'オリーブヤングの会員カードはお持ちですか？',
    'No, can I make a new one?': 'いいえ、新しく作れますか？',
    'Yes! Sign up on the app right now and points are credited immediately. Here are your samples — please come again if you like them!':
      'はい！今すぐアプリで登録するとポイントがすぐに付きます。こちらがサンプルです — 気に入ったらぜひまたいらしてください！',
    '샘플 문화 — Korea\'s Sample Culture': '샘플 문화 — 韓国のサンプル文化',
    'Asking for samples (샘플 주세요!) is completely normal and expected in Korean beauty stores. Staff often proactively include them in your bag without asking. Olive Young, Innisfree, and Etude House are famous for generous sample culture. Many K-beauty tourists report their Seoul haul doubles in volume from free samples alone — it\'s a real part of the K-beauty shopping experience, not just a bonus.':
      'サンプルを要求すること（샘플 주세요！）は韓国の美容店では完全に普通で期待されることです。スタッフがしばしばお願いしなくても積極的に袋に入れてくれます。올리브영、이니스프리、에뛰드 하우스が気前の良いサンプル文化で有名。多くのK-ビューティーツーリストがソウルのハウルが無料サンプルだけで量が倍になると報告 — これはボーナスではなく、K-ビューティーショッピング体験の本物の一部です。',

    // ── Traditions page headings ────────────────────────────────
    '🎊 Major Korean Holidays': '🎊 韓国の主要な祝日',
    '🎂 Korean Rites of Passage': '🎂 韓国の通過儀礼',
    '🙏 Korean Social Etiquette': '🙏 韓国の社会的マナー',
    'Children\'s Day': '子供の日',
    'Parents\' Day': '両親の日',
    'Bowing (절)': 'お辞儀（절）',

    // ── Footer description ──────────────────────────────────────
    'A free Korean language learning platform — combining language study with K-culture, travel guides, and real-world practice. For learners of every level, worldwide.': '無料の韓国語学習プラットフォーム — 語学学習・K-カルチャー・旅行ガイド・実践練習をひとつに。世界中のあらゆるレベルの学習者向け。',

    // ── Kimchi page ─────────────────────────────────────────────
    'Years of history': '年の歴史',
    'Varieties documented': '確認されている種類',
    'UNESCO Intangible Heritage': 'ユネスコ無形文化遺産',
    'Per capita per year': '一人当たり年間消費量',
    '김장 (Gimjang) — The Annual Kimchi-Making Tradition': 'キムジャン — 年間キムチ作りの伝統',
    '🥬 채소별 종류 By Vegetable': '🥬 채소별 종류 野菜別の種類',
    '16 varieties': '16種類',
    'The Original': 'オリジナル',
    'Crunchy': 'サクサク',
    'Radish Cube': '大根角切り',
    'Whole Radish': '丸ごと大根',
    'Stuffed': '詰め物入り',

    // ── Ramyeon page ────────────────────────────────────────────
    'Packs sold yearly': '年間販売パック数',
    'First Korean ramyeon': '初の韓国ラーメン',
    'Koreans eat weekly': '週1回以上食べる韓国人',
    'Average price per pack': '1袋の平均価格',
    '삼양라면의 탄생 · The Birth of Korean Ramyeon (1963)': '삼양라면의 탄생 · 韓国ラーメン誕生（1963）',
    'How Koreans Actually Cook Ramyeon': '韓国人のラーメンの本当の作り方',
    '18 products': '18製品',
    'Iconic': 'アイコニック',
    'Med-Spicy': '中辛',

    // ── Mandu page ──────────────────────────────────────────────
    'History in Korea': '韓国の歴史',
    'Regional varieties': '地域別の種類',
    'Eaten at New Year': '正月に食べる',
    'Bibigo: global K-food brand': 'ビビゴ：グローバルK-フードブランド',
    '만두의 역사 · History of Korean 만두': '만두의 역사 · 韓国万頭の歴史',
    'The 공갈만두 Legend': '공갈만두の伝説',
    '🍳 조리법별 종류 By Cooking Method': '🍳 조리법별 종류 調理法別の種類',
    '6 types': '6種類',
    'Most Popular': '最も人気',
    'Crispy Bottom': 'サクサクの底',

    // ── Kchicken page ───────────────────────────────────────────
    'Chicken shops in Korea': '韓国のチキン店数',
    'Double-fried for crunch': 'サクサクのために二度揚げ',
    'Average delivery time': '平均配達時間',
    '한국 치킨의 역사 · How Korean Fried Chicken Was Born': '한국 치킨의 역사 · 韓国フライドチキンの誕生',
    '치맥 (Chimaek) Culture': '치맥（チマク）文化',
    '🏆 프랜차이즈 Top Chicken Chains': '🏆 프랜차이즈 人気チキンチェーン',
    '15 chains': '15チェーン',

    // ══════════════════════════════════════════════════════════════
    // DEEP DIVES — Complete translations (ramyeon · mandu · kchicken · kbbq · kimchi)
    // ══════════════════════════════════════════════════════════════

    // ── ramyeon.html ─────────────────────────────────────────────
    // hero
    'Korea\'s 라면 culture goes far beyond instant noodles — it\'s a national obsession, a late-night ritual, a hangover cure, and a comfort that crosses every social class. From the original 삼양라면 (1963) to the globally viral 불닭볶음면, every packet tells a story.':
      '韓国の라면文化は単なるインスタント麺をはるかに超えています — 国民的な執着、深夜のルーティン、二日酔いの特効薬、そしてあらゆる社会階層を超える癒しです。1963年の元祖삼양라면から世界的バイラルとなった불닭볶음면まで、すべてのパックに物語があります。',
    // info-box history text
    'The late Chairman Jeon Joong-yoon, founder of Samyang Foods (삼양식품), developed Korea\'s first instant noodle — 삼양라면 — in 1963, after receiving manufacturing technology and equipment from Japan\'s Myojo Foods (明星食品) entirely free of charge. Driven by a mission to ease the food shortage facing hungry Koreans, Chairman Jeon approached Japan\'s leading ramen companies for a technology partnership but was turned away by every one of them. It was only through a meeting with Myojo Foods president Okui Kiyosumi — who understood and shared his humanitarian intent — that a breakthrough came: Myojo provided not only the full production process but even the closely guarded soup seasoning formula, all without demanding any royalties.':
      '삼양식품の창업주、故전중윤会長은1963年、日本의묘조식품（明星食品）から製造技術と設備を無償で受け取り、韓国초の인스턴트라면삼양라면을開発しました。飢えた韓国人の食료不足を解消するという使命から、田会長は日本의大手ラーメン各社에技術提携를求めましたが、すべてに断られました。転機は明星食品의奥井清澄社長との出会い — 彼は田会長의人道的な意図를理解・共感し、製造工程はもちろん企業秘密のスープ配合比율まで、一切のロイヤリティなしに伝授してくれたのです。',
    // cooking tip-box
    'Real Korean ramyeon is never made with just water. Common upgrades: add an egg (계란), slice of processed cheese (치즈), kimchi (김치), spam, tteok (떡), or leftover rice. The soggy noodle is intentional — 불어도 맛있다 ("even soggy it\'s good"). The broth left over after eating is called 국물, and many Koreans add rice to finish it off.':
      '本物の韓国ラーメンは水だけで作りません。よくある追加食材：계란（卵）、치즈（チーズ）1枚、김치、スパム、떡、または残りご飯。麺がふやけるのは意図的 — 불어도 맛있다（「ふやけても美味しい」）。食後に残ったスープを국물といい、多くの韓国人がご飯を入れて締めます。',
    // Nongshim brand header
    'Founded 1965. Korea\'s #1 instant noodle brand, holding ~60% market share. Exports to 100+ countries. The red packet of 신라면 is one of the most recognized food packages in Asia.':
      '1965年創業。韓国No.1のインスタント麺ブランドで市場シェア約60%。100カ国以上に輸출。신라면の赤いパッケージはアジアで最も認知度の高い食品パッケージの一つです。',
    // Nongshim cards
    'Nongshim · 농심 · Since 1986': 'Nongshim · 농심 · 1986年発売',
    'Korea\'s #1 best-selling instant noodle and cultural icon. Fiery beef-bone broth with mushrooms and chewy noodles. The red packet is instantly recognizable worldwide. Available in 100+ countries.':
      '韓国No.1베스트셀러のインスタント麺にして文化的アイコン。きのこと弾力ある麺が入ったスパイシーな牛骨スープ。赤いパッケージは世界中で一目でわかります。100カ国以上で販売中。',
    'Nongshim · 농심 · Since 2011': 'Nongshim · 농심 · 2011年発売',
    'Premium upgrade of the original. Richer bone broth (사골), thicker noodles, dehydrated egg. Positioned as a premium product — costs ~3× more than standard. Won a NY Times taste test in 2014.':
      '原作のプレミアムアップグレード。より濃厚な사골スープ、厚めの麺、乾燥卵入り。プレミアム商品として位置づけられ通常品의約3倍の価格。2014年NYTimes味覚テストで優勝。',
    'Premium': 'プレミアム',
    'Nongshim · 농심 · Since 1982': 'Nongshim · 농심 · 1982年発売',
    'Udon-style thick noodles in a spicy seafood broth with kombu (다시마). One half of the famous 짜파구리 ("Ram-don") combo from the Oscar-winning film Parasite (기생충, 2019).':
      '다시마（昆布）入りのスパイシー海鮮スープのうどん風太麺。아카데미賞受賞映画「기생충」（2019）に登場した名コンビ짜파구리（「ラムドン」）の片割れ。',
    'Parasite 🎬': '기생충 🎬',
    'Nongshim · 농심 · Since 1984': 'Nongshim · 농심 · 1984年発売',
    'Black bean (짜장) instant noodle — a portmanteau of 짜장면 + spaghetti. The other half of 짜파구리. Rich, savory black bean sauce with onion and pork flavoring. A beloved comfort food.':
      '짜장면とスパゲッティを合わせた造語のブラックビーン인스턴트麺。짜파구리のもう片方の主役。玉ねぎと豚肉の風味がある濃厚でコクのあるブラックビーンソース。愛される定番コンフォートフード。',
    'No Heat': '辛さなし',
    'Nongshim · 농심 · Since 1983': 'Nongshim · 농심 · 1983年発売',
    'Korea\'s long-running classic comfort ramyeon. Mild, savory broth with a gentle warmth. Tagline: "안성맞춤!" (Perfectly fitting!). Popular with children and those who prefer lighter flavors.':
      '長年愛される韓国のクラシック・コンフォートラーメン。ほんのりやさしい辛さのまろやかなスープ。キャッチコピー：「안성맞춤!」。子どもや軽めの味が好きな人に人気。',
    'Mild': 'マイルド',
    'Classic': 'クラシック',
    'Nongshim · 농심 · Cup Noodle': 'Nongshim · 농심 · カップ麺',
    'The #1 best-selling cup noodle in Korea. Inspired by 육개장 (spicy shredded beef soup). Deep red broth, glass noodle texture, strong umami. A Korean convenience store staple.':
      '韓国No.1ベストセラーカップ麺。육개장（スパイシー牛肉スープ）からインスピレーションを得た深紅のスープ。春雨のような食感で強いうまみ。韓国のコンビニに欠かせない定番。',
    'Cup': 'カップ',
    'Nongshim · 농심 · Seafood Spicy': 'Nongshim · 농심 · 海鮮辛口',
    'Spicy squid-based seafood broth modeled on Chinese-Korean 짬뽕 (champon). Deep red, heavy seafood umami, chewy noodles. Popular with those who want spicy seafood over beef.':
      '中韓式짬뽕をモデルにしたスパイシーなイカベースの海鮮スープ。深紅の色、濃厚な海鮮うまみ、弾力ある麺。牛肉より辛い海鮮を食べたい人に人気。',
    'Seafood': '海鮮',
    'Nongshim · 농심 · Since 2021 · ~7,500 SHU': 'Nongshim · 농심 · 2021年発売 · 約7,500 SHU',
    'Nongshim\'s premium ultra-spicy answer to the fire noodle era. Launched in 2021 at ~7,500 SHU — nearly double the original 신라면. Same signature beef umami base but with amplified chili heat. Available in bag and cup formats.':
      'ファイアーヌードル時代に応えるNongshimのプレミアム超激辛版。2021年に約7,500 SHUで発売 — 原作신라면のほぼ2倍。シグネチャーの牛肉うまみはそのままに唐辛子の辛さを倍増。袋麺とカップ麺の両方で展開。',
    'Very Hot': '超激辛',
    'Nongshim · 농심 · Seafood': 'Nongshim · 농심 · 海鮮',
    'Mild shrimp-flavored broth with a clean, light profile. Compared to spicy options, 새우탕 is the "gentle giant" — popular with those who like seafood umami without chili heat.':
      'クリーンで軽やかな風味のマイルドなエビ風味スープ。辛い商品と比べると새우탕は「穏やかな巨人」 — 唐辛子の辛さなしに海鮮うまみを楽しみたい人に人気。',
    'Nongshim · 농심 · Italian-Korean Fusion': 'Nongshim · 농심 · イタリア韓国フュージョン',
    'Korean interpretation of pasta — a dry sauce (stir-fry style) with tomato and bacon flavoring over spaghetti-shaped noodles. Unique in the Korean instant noodle world for its non-soup format.':
      'パスタの韓国流解釈 — スパゲッティ型の麺にトマトとベーコン風味のドライソース（炒め物スタイル）。スープなし형식で韓국인스턴트麺界でもユニーク。',
    'Dry (Stir)': '乾麺（炒め）',
    'Nongshim · 농심 · Fresh Udon': 'Nongshim · 농심 · 生うどん風',
    'Soft, fresh-style udon noodles in a mild dashi broth. Unlike most ramyeon, uses a softer noodle texture to mimic real udon. Light and easy on the stomach — great for late-night or recovery eating.':
      'だし汁のやさしいスープに入った柔らかい生うどん風の麺。ほとんどのラーメンと異なり、本物のうどんを再現した柔らかい麺食感。胃に優しく軽い — 夜食や回復食に最適。',
    'Udon Style': 'うどんスタイル',
    'Nongshim · 농심 · Fried Udon': 'Nongshim · 농심 · 揚げうどん',
    'Fried (튀김) udon-style noodles with a tempura-esque crunch on the dehydrated toppings. Mild, savory dashi broth. The crispy toppings are what make this one unique — add them at the end.':
      '乾燥トッピングに天ぷら風のサクサク感がある揚げうどん風麺。まろやかなだし汁スープ。最後に加えるサクサクのトッピングがこの商品をユニークにしています。',
    'Nongshim · 농심 · Army Stew': 'Nongshim · 농심 · 部隊チゲ',
    'Inspired by 부대찌개 (Army Base Stew) — the post-Korean-War fusion of American military surplus (SPAM, hot dogs) with Korean kimchi and gochujang. Rich, complex, slightly sweet spicy.':
      '부대찌개からインスピレーションを得た一품。朝鮮戦争後、米軍の食재（スパム、ホットドッグ）と韓国のキムチ・コチュジャンを融合させたフュージョン。濃厚で複雑、甘辛い味わい。',
    'Fusion': 'フュージョン',
    'Nongshim · 농심 · Cold Noodle': 'Nongshim · 농심 · 冷麺',
    'Korea\'s best-known instant cold noodle. Nest-shaped (둥지 = nest) noodles in a tangy, sweet-savory broth served cold or at room temp. A summer staple — refreshing and light.':
      '韓国で最も有名なインスタント冷麺。巣の形（둥지＝巣）の麺を甘酸っぱいスープで冷たく食べる。夏の定番 — 清涼感があって軽やか。',
    'Cold · No Heat': '冷製 · 辛さなし',
    'Summer': '夏',
    'Nongshim · 농심 · Lower Calorie': 'Nongshim · 농심 · 低カロリー',
    'Air-dried (건면) version of 신라면 — lower fat than fried noodles. Same spicy broth flavor. Recommended for health-conscious ramyeon lovers. Texture is slightly different but broth is identical.':
      '신라면のエアドライ（건면）版 — 揚げ麺より脂질が少ない。スパイシーなスープの味は同じ。健康에気を使うラーメン愛好家に推奨。食感は若干異なるがスープは同一。',
    'Healthier': 'よりヘルシー',
    'Nongshim · 농심 · Seafood Hot Pot': 'Nongshim · 농심 · 海鮮鍋',
    'Inspired by Korean seafood hot pot (해물탕). Rich, complex seafood broth with shrimp, clams, and octopus flavoring. Deep umami, moderate heat. A favorite for seafood lovers who want substance.':
      '韓国の해물탕からインスピレーションを得た一품。エビ・アサリ・タコ風味の濃厚で複雑な海鮮スープ。深いうまみと程よい辛さ。ボリューム感のある海鮮料理が好きな人に人気。',
    'Nongshim · 농심 · Spicy Black Bean': 'Nongshim · 농심 · 辛口ブラックビーン',
    'The spicy upgrade of 짜파게티 — black bean sauce with Sichuan-inspired heat. A bold fusion: Korean 짜장 flavors meet Chinese 마라 (mala) spice. Dry stir-fry style.':
      '짜파게티のスパイシーアップグレード — 四川風の辛さを加えたブラックビーンソース。韓国の짜장の風味と中国의마라（マーラー）スパイスが出会う大胆なフュージョン。乾麺炒めスタイル。',
    '농심 Combo · 짜파게티 + 너구리': '농심コンボ · 짜파게티 + 너구리',
    'Not an official product — a DIY mix of 짜파게티 + 너구리, cooked together. Made famous globally by the 2019 film Parasite (기생충). Western media coined it "Ram-don." Top with a seared sirloin steak as in the film.':
      '公式製品ではなく、짜파게티と너구리를一緒に作るDIYコンビ。2019年의영화「기생충」で世界的に有名に。欧米メディアは「ラムドン」と命名。映画のように炙ったサーロインステーキをトッピングして完성。',
    'DIY Combo': 'DIYコンボ',
    // Samyang brand header
    'Founded 1961 — makers of Korea\'s very first instant noodle (삼양라면, 1963). Later became globally famous for 불닭볶음면, which spawned an entire "fire challenge" viral movement on YouTube and TikTok.':
      '1961年창업 — 韓国초の인스턴트라면（삼양라면, 1963年）를만든메이커。その後불닭볶음면でYouTubeとTikTokを中心에世界的な「ファイアーチャレンジ」バイラルムーブメントを引き起こし、グローバルな名声を獲得。',
    // Samyang cards
    'Samyang · 삼양 · Korea\'s First (1963)': 'Samyang · 삼양 · 韓国초（1963年）',
    'The first instant noodle in Korean history, introduced in 1963. Light, savory broth with a nostalgic simplicity. Many older Koreans grew up on this — it represents an era when instant noodles were a luxury and a lifeline.':
      '1963年에登場した韓国史上초のインスタント麺。ノスタルジックなシンプルさのあっさりしたスープ。多くの年配の韓国人がこの麺と共에育ちました — インスタント麺が贅沢品であり命綱だった時代를象징する一品。',
    'Historic 1963': '歴史的1963年',
    'Samyang · 삼양 · Since 2012 · 4,404 SHU': 'Samyang · 삼양 · 2012年発売 · 4,404 SHU',
    'The "Fire Chicken Noodle" — 4,404 Scoville. Started the global K-food spice challenge on YouTube. Dry stir-fry style with sweet-spicy chicken sauce. Now exported worldwide. The chicken (닭) mascot is beloved.':
      '「ファイアーチキン麺」 — 4,404スコヴィル。YouTubeでグローバルなK-フードスパイスチャレンジを開始。甘辛チキンソースの乾麺炒めスタイル。現在世界中에輸出中。닭のマスコットは大人気。',
    'Global Viral': 'グローバルバイラル',
    'Samyang · 삼양 · Creamy Spicy': 'Samyang · 삼양 · クリーミー辛口',
    'The most popular 불닭 variant globally. Creamy carbonara sauce cut with the signature buldak heat — milder than original but with a rich, addictive creaminess. A favorite for people who find original too hot.':
      'グローバルで最も人気の불닭バリエーション。シグネチャーのプルダクの辛さを抑えたクリーミーなカルボナーラソース — オリジナルよりマイルドだが濃厚でクセになるクリーミーさ。オリジナルが辛すぎる人のお気に入り。',
    'Most Popular Variant': '最人気バリアント',
    'Samyang · 삼양 · 8,706 SHU': 'Samyang · 삼양 · 8,706 SHU',
    'Double the Scoville of original 불닭 — 8,706 SHU. This is the noodle that made Korean medical staff shake their heads. Used in extreme food challenges. Not recommended for spice beginners or people with stomach issues.':
      'オリジナル불닭의2倍のスコヴィル — 8,706 SHU。韓国의医療従事者が頭를抱えた麺。극한フードチャレンジに使用される。辛さ初心者や胃腸에問題のある人には非推奨。',
    '💀 Nuclear': '💀 核級',
    'Challenge Level': 'チャレンジレベル',
    'Samyang · 삼양 · Spicy + Cheesy': 'Samyang · 삼양 · 辛口＋チーズ',
    'Buldak heat balanced by a cheese powder topping. The dairy fat tones down the spice, making this one of the more approachable 불닭 variants. Mix the cheese in fully before eating — it binds everything together.':
      'チーズパウダーのトッピングでプルダクの辛さを和らげた一品。乳脂肪が辛さを抑え、불닭バリアントの中でも比較的食べやすい。食べる前にチーズをしっかり混ぜること — すべてをひとつにまとめてくれる。',
    'Cheese': 'チーズ',
    'Samyang · 삼양 · Dark + Spicy': 'Samyang · 삼양 · ダーク＋辛口',
    'Black bean sauce meets buldak fire — dark, savory, and spicy. The blackness of the sauce makes it visually striking. Less well-known internationally but a hit with fans who want 짜장 flavors with a kick.':
      'ブラックビーンソースにプルダクの火力를융합 — 黒く、コクがあり、辛い。ソースの黒さが視覚的なインパクトを生む。国際的な知名度は低いが、짜장の風味에辛さを求めるファンに大人気。',
    'Black Bean': 'ブラックビーン',
    'Samyang · 삼양 · Yellow Curry Spicy': 'Samyang · 삼양 · 黄色カレー辛口',
    'Buldak heat infused with curry spice — a warm, aromatic twist on the fire chicken formula. Yellow-orange color. The curry aroma softens the impact slightly while adding turmeric depth.':
      'カレースパイスを注入したプルダクの辛さ — ファイアーチキンの公式にウォームでアロマティックな変化をもたらす。黄橙色。カレーの香りが辛さの衝격をやや和らげながらターメリックの深みを加える。',
    'Curry': 'カレー',
    'Samyang · 삼양 · Soup Version': 'Samyang · 삼양 · スープ版',
    'The soup (탕) version of 불닭 — all the fire chicken flavor in a broth format. The spice feels even more intense as it\'s distributed through liquid. Korea\'s spiciest mainstream soup ramyeon.':
      '불닭のスープ（탕）版 — ファイアーチキンのすべての風味をスープ形式で。液体에分散されるため辛さがより강烈에感じられる。韓国で最も辛い주류スープラーメン。',
    'Soup': 'スープ',
    'Samyang · 삼양 · Pink Creamy Spicy': 'Samyang · 삼양 · ピンク・クリーミー辛口',
    'The trendy rosé pasta-inspired 불닭 — tomato cream meets buldak fire. Pink-orange color, rich and slightly sweet. Very popular with younger audiences riding the rosé pasta trend from K-drama culture.':
      'トレンディなロゼパスタにインスパイアされた불닭 — トマトクリームとプルダクの火力が융합。ピンクオレンジ色で濃厚かつほんのり甘い。K-드라마文化のロゼパスタトレンドに乗った若い層に大人気。',
    'Trending': 'トレンド',
    'Samyang · 삼양 · Everyday Mild': 'Samyang · 삼양 · 日常マイルド',
    '"Delicious Ramyun" — exactly what it says. A simple, everyday mild ramyeon with clean beef broth and balanced flavor. No gimmicks. For times you want classic comfort without spice.':
      '「美味しいラーメン」— まさにその名の通り。クリーンな牛肉スープとバランスのとれた風味のシンプルな日常マイルドラーメン。仕掛けなし。辛さなしにクラシックな癒しが欲しい時のために。',
    'Everyday': '日常',
    'Samyang · 삼양 · Japanese-Korean Fusion': 'Samyang · 삼양 · 日韓フュージョン',
    'Inspired by the Nagasaki champon (champuru) dish — a Japanese-Korean-Chinese seafood noodle fusion. Lighter, thicker broth than standard Korean jjambbong. A niche but beloved option for those who like creamy seafood.':
      '長崎ちゃんぽんからインスパイアされた日韓中海鮮麺フュージョン。標準的な韓国짬뽕より軽くて濃厚なスープ。クリーミーな海鮮が好きな人にはニッチだが大人気。',
    // Ottogi brand header
    'Founded 1969. Known for quality at affordable prices. 진라면 (Jin Ramyun) is Korea\'s #2 best-selling ramyeon after 신라면 and holds a devoted following for its full, rounded flavor. Ottogi also makes 비빔면, Korea\'s definitive cold mixed noodle.':
      '1969年창업。手頃な価格の品질で有名。진라면は신라면에이어韓国売上No.2のラーメンで、豊かで丸みある風味で熱狂的なファンを持つ。오뚜기은韓国을대표する冷やし混ぜ麺비빔면도製造。',
    // Ottogi cards
    'Ottogi · 오뚜기 · Since 1988 · #2 Best-Seller': 'Ottogi · 오뚜기 · 1988年発売 · No.2ベストセラー',
    'Korea\'s #2 best-selling ramyeon. Rich, complex spicy broth with a deep umami that many prefer over 신라면. Famous for the tagline "진한 라면의 표준" (The standard of rich ramyeon). The yellow packet is iconic.':
      '韓国売上No.2のラーメン。신라면より好む人も多い豊かで複雑なスパイシースープ。「진한 라면의 표준」というキャッチコピーで有名。黄色のパッケージがアイコニック。',
    '#2 National': '全国No.2',
    'Ottogi · 오뚜기 · Mild Version': 'Ottogi · 오뚜기 · マイルド版',
    'The mild counterpart to 진라면 매운맛 — same deep, savory broth with virtually no heat. Recommended for children, sensitive stomachs, and foreigners new to Korean ramyeon. Just as flavorful, minus the fire.':
      '진라면 매운맛のマイルド版 — 同じ深くてコクのあるスープで辛さはほぼゼロ。子ども、敏感な胃、韓国ラーメン初心者の外国人에推奨。風味はそのまま、辛さだけを除いた。',
    'Family-Friendly': 'ファミリー向け',
    'Ottogi · 오뚜기 · Cold Mixed Noodle': 'Ottogi · 오뚜기 · 冷やし混ぜ麺',
    'A summer institution — cold chewy noodles tossed in a sweet-tangy-spicy gochujang sauce. Drain the noodles, add ice, mix with sauce. Most Koreans argue about 오뚜기 vs. 팔도 비빔면. Ottogi\'s is slightly sweeter.':
      '夏の定番 — 甘酸っぱいコチュジャンソースで和えた冷たくて弾力のある麺。麺를잘切り、氷を加えソースで混ぜる。韓国人의多くが오뚜기 vs 팔도비빔면を巡って논争中。오뚜기版はやや甘い。',
    'Cold': '冷製',
    'Summer Ritual': '夏のルーティン',
    'Ottogi · 오뚜기 · Sesame Broth': 'Ottogi · 오뚜기 · ごまスープ',
    'Sesame (참깨)-flavored broth — nutty, warm, and subtly rich. A distinctive option in the Korean instant noodle world. The sesame flavor is pronounced and pairs well with a soft-boiled egg and spinach.':
      'ごま（참깨）風味のスープ — ナッティでウォーム、ほんのり濃厚。韓국인스턴트麺界でもユニークな選択肢。ごまの風味が際立ち、半熟卵とほうれん草との相性が抜群。',
    'Sesame': 'ごま',
    'Ottogi · 오뚜기 · Extra Spicy': 'Ottogi · 오뚜기 · 激辛',
    'Ottogi\'s extra-spicy entry — competes with 농심 열라면. Known for a different kind of heat: more capsaicin-forward with less of the umami base. Often used in hot food challenges alongside 불닭.':
      'オットギの激辛ラーメン — 농심의열라면と競合。異なる種類の辛さで知られる：うまみより唐辛子（カプサイシン）の辛さが前面に出る。불닭と共에ホットフードチャレンジによく使用される。',
    'Ottogi · 오뚜기 · Since 2015 · Top 10': 'Ottogi · 오뚜기 · 2015年発売 · トップ10',
    'Ottogi\'s flagship seafood jjambbong ramyeon — launched in 2015 and became an instant bestseller, challenging Nongshim\'s market dominance. Rich, deep-red spicy broth packed with shrimp, squid, and shellfish umami. Bold, satisfying, and consistently ranked in Korea\'s top 10.':
      'オットギの看板海鮮짬뽕ラーメン — 2015年発売で即座にベストセラーとなり農心の市場支配에挑戦。エビ・イカ・貝類のうまみが詰まった濃厚な深紅のスパイシースープ。大胆で満足感があり、常에韓국TOP10にランクイン。',
    'Top 10': 'トップ10',
    'Ottogi · 오뚜기 · Thick Noodle': 'Ottogi · 오뚜기 · 太麺',
    'Thick, chewy noodles (오동통 = plump/chubby) in a hearty broth. The noodle itself is the main attraction — wider and more substantial than standard ramyeon. Satisfying and filling with a solid chew.':
      'たっぷりスープのもちもち太麺（오동통＝ぽっちゃり）。麺自体が主役 — 標準的なラーメンより幅広くてボリューム感あり。しっかりした噛み応えで満腹感。',
    'Thick Noodle': '太麺',
    'Ottogi · 오뚜기 · Premium Black Bean': 'Ottogi · 오뚜기 · プレミアムブラックビーン',
    'A punny name (짜장 + Michelin) — premium instant black bean noodle positioned as a gourmet option. Rich, complex black bean sauce with notes of sesame and pork. Often cited as the best instant 짜장면 available.':
      'ダジャレな名前（짜장＋ミシュラン）のグルメ志향のプレミアムインスタントブラックビーン麺。ごまと豚肉の風味が漂う濃厚で複雑なブラックビーンソース。最高のインスタント짜장면としてよく名前が挙がる。',
    'Ottogi · 오뚜기 · Creamy Upgrade': 'Ottogi · 오뚜기 · クリーミーアップグレード',
    'A creamy, indulgent twist on the beloved 진라면 base. Add cream or milk for a luscious finish — the packaging even suggests adding a splash of milk. Rich, smooth, and less intense than the original.':
      '人気의진라면をベースにした濃厚でクリーミーなひねり。クリームまたは牛乳를加えると贅沢な仕上がりに — パッケージにも牛乳を少し加えることが提案されている。オリジナルより濃厚でなめらか。',
    'Mild-Med': '弱中辛',
    'Trendy': 'トレンディ',
    'Ottogi · 오뚜기 · Mushroom Broth': 'Ottogi · 오뚜기 · きのこスープ',
    'Enoki mushroom (팽이버섯)-based broth — earthy, light, and savory. One of the more health-conscious Ottogi options. The umami from mushrooms creates a surprisingly deep broth without heavy seasoning.':
      'えのき茸（팽이버섯）ベースのスープ — アーシーで軽くてコクがある。オットギのヘルシー志향의选択肢のひとつ。きのこのうまみが重い調味料なしに驚くほど深いスープを生み出す。',
    'Mushroom': 'きのこ',
    'Ottogi · 오뚜기 · Light Cup': 'Ottogi · 오뚜기 · 軽量カップ',
    'Ottogi\'s lightweight cup noodle — thin noodles, light broth, quick prep. Designed for the office desk, convenience store, or anywhere you need a fast, fuss-free meal. Comes in multiple flavors.':
      'オットギの軽量カップ麺 — 細麺、あっさりスープ、素早い調理。オフィスの机、コンビニ、どこでも手軽에食べられるよう設計。複数の味で展開。',
    'Light': '軽量',
    // Paldo brand header
    'Founded 1983. Paldo is known for the iconic 팔도비빔면, often declared the best instant cold noodle in Korea, and for 왕뚜껑 — the giant-lid cup noodle that Koreans use as both a meal and a cooking vessel on road trips.':
      '1983年창업。팔도は韓国最高のインスタント冷麺と名高い팔도비빔면と、왕뚜껑 — 旅行中에식기としても使える大型フタのカップ麺 — で知られる。',
    // Paldo cards
    'Paldo · 팔도 · Since 1984 · Summer Legend': 'Paldo · 팔도 · 1984年発売 · 夏の伝説',
    'THE original instant bibimmyeon — created in 1984 and still considered the gold standard. Chewy noodles, a sweet-tangy-spicy gochujang sauce. The bibimmyeon debate (팔도 vs 오뚜기) is Korea\'s greatest food argument.':
      '元祖インスタントビビンメン — 1984年誕生し今もゴールドスタンダードとされる。もちもち麺에甘酸っぱいコチュジャンソース。팔도 vs 오뚜기비빔면の論争は韓国最大の食논쟁。',
    'Cold · Mild Heat': '冷製 · 弱辛',
    'Summer 1984': '1984年夏の定番',
    'Paldo · 팔도 · Cup Noodle Icon': 'Paldo · 팔도 · カップ麺アイコン',
    'Korea\'s most famous cup noodle — the lid (뚜껑) is oversized (왕 = king) to be used as a plate. Spicy seafood broth with thick noodles. A highway rest-stop and camping staple. The lid-as-bowl hack is universally known.':
      '韓国で最も有名なカップ麺 — フタ（뚜껑）が皿として使えるよう大型（왕＝王）設계。太麺入りのスパイシー海鮮スープ。高速道路のサービスエリアやキャンプの定番。フタをお椀として使う裏技は誰でも知っている。',
    'Road Trip Icon': 'ロードトリップの定番',
    'Paldo · 팔도 · Premium Seafood': 'Paldo · 팔도 · プレミアム海鮮',
    'Paldo · 팔도 · Classic': 'Paldo · 팔도 · クラシック',
    'Paldo\'s original classic ramyeon — a mild, clean beef broth with straightforward noodles. Less well-known than 신라면 or 진라면 but appreciated for its simplicity. A local staple in certain regions of Korea.':
      '팔도의오리지널クラシックラーメン — シンプルな麺のあっさりクリーンな牛肉スープ。신라면やお진라면ほど知られていないがそのシンプルさで支持される。韓국の特定地域의定番。',
    'Paldo · 팔도 · Viral Spicy Bibimmyeon': 'Paldo · 팔도 · バイラル激辛ビビンメン',
    'A limited-edition ultra-spicy bibimmyeon written in the Gyeongsang (경상도) dialect — 팔도비빔면 = 괄도네넴띤 in regional pronunciation. Became a massive viral sensation in 2019. Twice as spicy as the original.':
      '경상도방언で書かれた限定版의超激辛ビビンメン。2019年에大規模なバイラルセンセーションに。オリジナルの2倍の辛さ。',
    'Viral 2019': '2019年バイラル',
    'Paldo · 팔도 · XL Cup': 'Paldo · 팔도 · XLカップ',
    'Even bigger than 왕뚜껑 — the XL version for truly hungry people. Larger portion, extra noodles, same spicy seafood broth. A camping and festival favorite when you need a seriously filling cup noodle.':
      '왕뚜껑より更에大きい — 本当にお腹를空かせた人のためのXL版。より大きなポーション、追加의麺、同じスパイシー海鮮スープ。本格的에満腹になるカップ麺が必要な時のキャンプやフェスのお気に入り。',
    'XL Cup': 'XLカップ',
    // Special & Trending
    'Beyond the big four brands — specialty instant noodles, collaboration products, and emerging trends in Korea\'s constantly evolving ramyeon market.':
      '四大ブランドを超えて — 常에進化する韓国ラーメン市장의スペシャリティインスタント麺、コラボ商品、新トレンド。',
    'Tumsae · 틈새 · Restaurant Brand → Instant': 'Tumsae · 틈새 · 飲食店ブランド→インスタント',
    'Started as a restaurant chain famous for extreme spice (틈새 = gap/niche). Became an instant product. Known as one of the spiciest mainstream instant noodles available. Not for the faint-hearted.':
      '극한の辛さで有名なレストランチェーンとしてスタート（틈새＝すき間）。インスタント商品化。市場에流通する最も辛いインスタント麺のひとつとして知られる。心臓의弱い人は要注意。',
    'Various Brands · 마라 Trend · Since ~2018': '各ブランド · 마라トレンド · 2018年頃から',
    'Sichuan mala (마라) spice meets Korean ramyeon — numbing + spicy. The 마라 trend swept Korea from 2018 onward. Multiple brands released versions. The distinctive Sichuan pepper numbness is the key experience.':
      '四川マーラー（마라）スパイスと韓国ラーメンが융합 — 麻辺（しびれ）＋辛さ。마라トレンドは2018年以降韓国を席巻。複数ブランドが版を발売。四川山椒独特의痺れ感がキーとなる체험。',
    'Mala Trend': 'マーラートレンド',
    'Paldo x Gonghwachun · Premium Collab': 'Paldo × 공화춘 · プレミアムコラボ',
    'Collaboration between Paldo and Gonghwachun — Incheon\'s oldest Chinese-Korean restaurant (founded 1905). Uses the historic black bean sauce recipe. Positioned as premium instant 짜장면. A collector\'s item in Korean food culture.':
      '팔도と공화춘（1905年창업、인천最古의中韓料理店）のコラボ。歴史的なブラックビーンソースのレシピを使용。プレミアムインスタント짜장면としてポジション。韓国フードカルチャーのコレクターズアイテム。',
    'Collab': 'コラボ',
    'Various · Ramen + Tteokbokki Hybrid': '各ブランド · ラーメン＋トッポッキのハイブリッド',
    'Not a brand — a cooking method: ramyeon (라면) + tteokbokki (떡볶이) cooked together in gochujang sauce. Available as a dedicated product or made at home. Sweet-spicy with dual textures — chewy rice cakes and springy noodles.':
      'ブランドではなく調理法：라면＋떡볶이をコチュジャンソースで一緒に調理。専用商品もあれば自宅でも作れる。甘辛で2つの食感 — もちもちの餅と弾力のある麺。',
    'Rice Cake Combo': '餅コンボ',
    'CJ Bibigo · Premium Collab': 'CJ 비비고 · プレミアムコラボ',
    'Collaboration between CJ\'s 비비고 dumpling brand and ramyeon culture. Comes with actual freeze-dried 왕교자 (king dumplings). One of the most filling and decadent instant noodle products on the market.':
      'CJの비비고餃子ブランドとラーメン文化のコラボ。実際のフリーズドライ왕교자（キング餃子）付き。市場で最も満腹感があり贅沢なインスタント麺商品のひとつ。',
    'Various · Creamy Seafood Trend': '各ブランド · クリーミー海鮮トレンド',
    'The creamy shrimp trend — rich, bisque-style shrimp broth meets instant convenience. Inspired by the global cream-based food trend that hit Korea in the early 2020s. Luxurious and subtle.':
      'クリーミーエビトレンド — 濃厚なビスク風エビスープとインスタントの利便성が融합。2020년代初頭에韓国를席巻したグローバルなクリームベース食品トレンドからインスピレーション。上品で繊細。',
    '2020s Trend': '2020年代トレンド',
    'Pulmuone · 풀무원 · Fresh Concept': 'Pulmuone · 풀무원 · 生麺コンセプト',
    'Pulmuone\'s health-oriented instant ramyeon — uses fresh-style noodles (non-fried), cleaner broth, and natural ingredients. Popular with health-conscious consumers. Available in multiple flavors including 생면 udon and 비빔면.':
      'プルムウォンの健康志향인스턴트라면 — 生麺スタイル（非揚げ麺）、クリーンなスープ、天然素材を使용。健康意識の高い消費者에人気。生麺うどんやビビンメンなど複数のフレーバーで展開。',
    'Fresh Noodle': '生麺',
    // ramyeon vocab
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
    // brand section headers with emoji
    '🔴 농심 (Nongshim)': '🔴 농심（Nongshim）',
    '🔥 삼양 (Samyang)': '🔥 삼양（Samyang）',
    '🟡 오뚜기 (Ottogi)': '🟡 오뚜기（Ottogi）',
    '🔵 팔도 (Paldo)': '🔵 팔도（Paldo）',
    '✨ 기타 Special &amp; Trending': '✨ 기타 スペシャル＆トレンド',
    '7 products': '7製品',
    '11 products': '11製品',
    '6 products': '6製品',
    '📖 라면 어휘 · Ramyeon Vocabulary': '📖 라면 어휘 · ラーメン語彙',

    // ── mandu.html ───────────────────────────────────────────────
    // hero paragraph
    '만두 (mandu) is Korea\'s dumpling — steamed, fried, boiled, or simmered in broth. From the ceremonial 만두국 served at Lunar New Year to the addictive frozen 비비고 왕교자 cooked at midnight, mandu sits at the heart of Korean comfort food culture.':
      '만두（マンドゥ）は韓국の餃子 — 蒸す、揚げる、茹でる、またはスープで煮込む。旧正月に食べる儀式的な만두국から深夜에作る중독성のある냉동 비비고 왕교자まで、만두は韓国のコンフォートフード文화의中心にあります。',
    // info-box history
    'Korean mandu was introduced during the Goryeo Dynasty through the Yuan (Mongol) Empire, with its first written record appearing in the Goryeosa (고려사). Initially a prestigious royal court dish, it gradually became everyday food through the modern era — first spreading via Chinese immigrant communities, then transformed by the mass production of frozen dumplings in the 1980s. Korea once had countless street-side mandu shops, but as Bibigo frozen mandu rose to dominance, there is a saying that every mandu shop making a less tasty product than Bibigo has since had to shut its doors.':
      '韓국의만두は고려시대에元（モンゴル）帝국을通じて伝来し、고려사에初めて文字로記録されました。当初는高貴な宮廷料理でしたが、近代에入り中国系移民コミュニティを通じて広まり、1980年代의냉동餃子의大量生産을経て日常食となりました。韓国にはかつて無数の路面만두店がありましたが、비비고냉동만두가台頭するにつれ、비비고より美味しくない만두店はすべて閉店を余儀なくされたという話も生まれました。',
    // gongal tip-box
    '공갈만두 (gongal mandu) is a hollow mandu — the wrapper is big, the inside is nearly empty. It was traditionally sold by street vendors who deceived customers with large-looking dumplings containing minimal filling. Today "공갈만두" is used as slang for anything that looks impressive but is hollow inside. Learning this word impresses any Korean.':
      '공갈만두는中身がほぼ空の餃子 — 皮は大きいのに中身はほとんどない。伝統的에中身의少ない大きく見せかけた餃子를路上で売っていた行商人から生まれた。今日「공갈만두」는見かけだけ立派で中身のないものを指すスラングとして使われる。この言葉を知ると韓国人를驚かせることができる。',
    // cooking method section
    'The same dumpling filling transforms completely depending on how it\'s cooked. Each method brings out different textures and flavors from the same mandu.':
      '同じ餃子의具材도調理法によって全く異なる食感と味になります。それぞれの調理法が同じ만두から異なる魅力を引き出します。',
    // cooking method cards
    'Pan-Fried Dumpling · 굽다 = to grill/fry': 'フライパン焼き餃子 · 굽다 = 焼く',
    'Pan-fried until the bottom is golden and crispy while the top stays soft and chewy. The most popular preparation — the contrast between crispy base and tender filling is the defining characteristic. Found at all 분식집.':
      '底が黄金色でカリカリになるまで焼き、上は柔らかくもちもちに保つ。最もポピュラーな調理法 — カリカリの底と柔らかい具材のコントラストが特징。すべての분식집で見られる。',
    'Steamed Dumpling · 찌다 = to steam': '蒸し餃子 · 찌다 = 蒸す',
    'Steamed in a bamboo or metal steamer — soft, plump, juicy. The gentlest cooking method — preserves the most filling moisture and delicate flavor. Often served with soy dipping sauce and ginger.':
      '竹または金속製の蒸し器で蒸す — 柔らかく、ふっくら、ジューシー。最もやさしい調理法 — 具材의水分と繊細な風味を最もよく保持。醤油たれと生姜と共によく提供される。',
    'Soft': '柔らか',
    'Healthy': 'ヘルシー',
    'Boiled Dumpling · 물 = water': '茹で餃子 · 물 = 水',
    'Boiled in water until translucent and tender. Lighter and cleaner than fried versions. Often served with a seasoned soy dipping sauce. Pulmuone\'s 물만두 is one of Korea\'s best-loved frozen products.':
      '水で茹でて透き通るほど柔らかくなるまで火を通す。揚げた版より軽くてクリーン。味付け醤油たれと共에提供されることが多い。풀무원의물만두는韓国で最も人気の冷凍商品のひとつ。',
    'Transparent Skin': '透明な皮',
    'Deep-Fried Dumpling · 튀기다 = to deep-fry': '揚げ餃子 · 튀기다 = 揚げる',
    'Completely submerged and deep-fried until shatteringly crispy all over. The most indulgent form — maximum crunch, rich golden exterior. A street food staple. Often served at 길거리 (street) stalls and 분식집.':
      '完全に油에沈め、全体がバリバリにカリカリになるまで揚げる。最も贅沢な형식 — 最高のサクサク感と豊かな黄금의外皮。길거리의屋台や분식집의定番ストリートフード。',
    'All Crispy': '全部カリカリ',
    'Dumpling Soup · 국 = soup': '餃子スープ · 국 = スープ',
    'Mandu cooked in a clear beef or anchovy broth. The ultimate winter and New Year dish — eaten on 설날 (Lunar New Year) for luck. Adding tteok (떡) makes it 떡만둣국. Garnished with egg strips and seaweed.':
      '맑은牛肉またはイワシのだしで만두를煮た料理。究極의冬と新年の料理 — 운을呼ぶために설날에食べる。떡를加えると떡만둣국になる。錦糸卵と海苔で飾る。',
    'New Year Ritual': '新年の儀式',
    'Warm Soup': '温かいスープ',
    'Hot Pot Mandu · 전골 = table-top hot pot': 'ホットポット餃子 · 전골 = テーブルホットポット',
    'Mandu cooked in a spicy 전골 (table-top hot pot) with vegetables, mushrooms, and glass noodles. A communal eating experience — the broth becomes richer as more ingredients are added. A cold-weather favorite.':
      '野菜・きのこ・春雨と共에辛い전골鍋で煮た만두。食材を追加するたびにスープが豊かになる共同食事체험。寒い季節のお気に入り。',
    'Group Dining': 'グループ食事',
    // filling section
    'What\'s inside a mandu defines its identity. Korea has developed dozens of filling combinations, from simple pork-cabbage to vegan temple versions.':
      '만두의中身がその정체성を決める。韓国はシンプルな豚肉・キャベツの組み합わせから채식사찰版まで数十種류의具材의組み합わせを発展させてきた。',
    // filling cards
    'Meat Dumpling · 고기 = meat (pork)': '肉餃子 · 고기 = 肉（豚肉）',
    'The classic — ground pork mixed with tofu, glass noodles, garlic, ginger, scallions, and sesame oil. Balanced and rich. The default "mandu" most Koreans think of. Bibiogo\'s version dominates the frozen market.':
      'ザ・クラシック — 豆腐・春雨・ニンニク・生姜・ねぎ・ごま油と混ぜた挽き豚肉。バランスよく濃厚。ほとんどの韓国人が「만두」と聞いて思い浮かべるデフォルト。ビビゴ版が냉동시場을支配。',
    'The Classic': 'ザ・クラシック',
    'Pork + Tofu': '豚肉＋豆腐',
    'Kimchi Dumpling · 김치 filling': 'キムチ餃子 · キムチの具',
    'Fermented kimchi mixed with pork and tofu — tangy, slightly sour, deeply savory. The fermentation adds complexity that plain pork mandu lacks. Best in winter when kimchi is perfectly aged. A national favorite.':
      'よく熟れたキムチに豚肉と豆腐を混ぜた餃子。発酵の複雑さがプレーンな豚肉만두にはない深みを加える。キムチが完璧에숙성される冬が最高。国民的お気に入り。',
    'Short Rib Dumpling · 갈비 = short rib': 'カルビ餃子 · 갈비 = ショートリブ',
    'Premium mandu filled with braised short rib (갈비) meat. Rich, deeply savory, slightly sweet from the soy marinade. More expensive than standard mandu — considered an upscale restaurant version. Intensely satisfying.':
      'ブレイズしたショートリブ（갈비）肉を詰めたプレミアム만두。醤油マリネのほんのりとした甘さが加わる濃厚で深いコク。通常の만두より高価 — 高級レストラン版とされる。満足度극めて高い。',
    'Short Rib': 'ショートリブ',
    'Shrimp Dumpling · 새우 = shrimp': 'エビ餃子 · 새우 = エビ',
    'Minced shrimp mixed with pork and chives — the seafood cousin of standard gogi mandu. The shrimp adds sweetness and a springy bite. Common at Chinese-Korean (중국집) restaurants and upscale mandu shops.':
      '豚肉とニラと混ぜた細切りエビ — 標準的な고기만두の海鮮版。エビが甘さとプリプリの食感を加える。中韓料理店（중국집）や高級만두店によく見られる。',
    'Sweet Shrimp': '甘エビ',
    'Seafood Dumpling · 해물 = seafood': '海鮮餃子 · 해물 = 海鮮',
    'Mixed seafood filling — crab, shrimp, squid, and sometimes clams bound with pork and vegetables. Ocean umami in dumpling form. Heavier and richer than shrimp mandu alone. Popular in coastal cities like Busan.':
      'カニ・エビ・イカ・時にはアサリを豚肉と野菜で결한混合海鮮の具。餃子형태의海のうまみ。エビ만두単品より重くて濃厚。釜山などの海岸都市で人気。',
    'Mixed Seafood': 'ミックス海鮮',
    'Coastal Style': '海岸スタイル',
    'Vegetable Dumpling · 채소 = vegetable': '野菜餃子 · 채소 = 野菜',
    'All-vegetable filling — usually tofu, glass noodles, spinach, mushrooms, chives, and seasoned well. Popular with vegetarians (채식주의자). Lighter than meat versions — a good choice for those watching fat intake.':
      '全野菜の具 — 通常豆腐・春雨・ほうれん草・きのこ・ニラを使いよく味付け。菜食主義者에人気。肉版より軽め — 脂질摂取를気にする人に良い選択。',
    'Veggie': '野菜',
    'Lighter': '軽い',
    'Tofu Dumpling · 두부 = tofu': '豆腐餃子 · 두부 = 豆腐',
    'Tofu-dominant filling — crumbled tofu with seasonings, garlic, scallion, and sesame oil. Subtle and clean in flavor. Often preferred for its lighter protein. A temple food (사찰음식) variant omits even scallions.':
      '豆腐主体の具 — ニンニク・ねぎ・ごま油で味付けしたほぐした豆腐。繊細でクリーンな風味。より軽いタンパク질として好まれることが多い。사찰음식版はねぎも省略。',
    'Temple Style': '寺院スタイル',
    'Glass Noodle Dumpling · 당면 = glass noodles': '春雨餃子 · 당면 = 春雨',
    'Glass noodles (당면) as the primary filling along with pork and vegetables. The noodles add a chewy, slippery texture and absorb all the seasoning oil. A popular budget-friendly mandu sold by street stalls.':
      '主な具材에春雨（당면）と豚肉・野菜를使용。春雨がもちもちで滑らかな食感を加え、調味油をすべて吸収する。路上屋台が販売する人気のコスパ餃子。',
    'Chewy': 'もちもち',
    'Crab Meat Dumpling · 게살 = crab meat': 'カニ肉餃子 · 게살 = カニ肉',
    'Imitation or real crab meat mixed with cream cheese or light mayonnaise. A modern, restaurant-style creation. Often shaped differently (white, thin-skinned) to distinguish from traditional mandu. Delicate and rich.':
      'イミテーションまたは本物のカニ肉をクリームチーズまたは軽めのマヨネーズと混ぜた現代レストランスタイルの창작품。伝統的な만두と区別するため異なる形（白くて薄い皮）에成形されることが多い。上品で濃厚。',
    'Modern Style': 'モダンスタイル',
    'Pork Belly Dumpling · 삼겹살 = pork belly': 'サムギョプサル餃子 · 삼겹살 = 豚バラ',
    'Diced 삼겹살 (pork belly) as the star filling — extra fatty, rich, and indulgent. Often paired with kimchi for balance. A premium street food item — thicker filling, bolder flavor than standard 고기만두.':
      'ダイスカットした삼겹살（豚バラ）がメインの具 — 余分な脂があり濃厚で贅沢。バランスのためキムチと組み합わせることが多い。標準的な고기만두より厚い具材と大胆な風味のプレミアムストリートフード。',
    'Pork Belly': '豚バラ',
    'Rice Dumpling · 밥 = rice': 'ご飯餃子 · 밥 = ご飯',
    'Rice mixed with seasoned ingredients inside the wrapper. A filling and hearty variant popular in the military (군대) and school cafeterias (학교 급식). Hearty, carb-dense, and satisfying for those who want substance.':
      '皮の中に調理済みご飯를詰めた満腹感のあるしっかりとしたバリエーション。軍隊（군대）や학교급식で人気。炭水化物豊富でがっつり食べたい人에満足できる一品。',
    'Filling': '満腹',
    'Cafeteria': '食堂',
    'Open Dumpling · Modern Restaurant Style': 'オープン餃子 · モダンレストランスタイル',
    'Modern restaurant-style mandu left partially open at the top so the filling is visible — a Chinese-influenced shumai (슈마이) style. Steamed, with a decorative element like a shrimp or mushroom on top.':
      '具材が見えるよう上部を開けたまま仕上げるモダンレストランスタイルの만두 — 中国의焼売（슈마이）スタイルの影響を受けた蒸し餃子。エビやきのこなどで装飾。',
    'Modern': 'モダン',
    'Restaurant Style': 'レストランスタイル',
    // major brands section
    'Korea\'s frozen mandu market is dominated by a handful of brands — the most globally successful being CJ\'s 비비고, which became the #1 frozen dumpling brand in the US, China, and Southeast Asia.':
      '韓국의냉동만두市場は数ブランドが支配 — 最もグローバルに成功したのはCJの비비고で、米국・中国・東南アジアで冷凍餃子ブランドNo.1となった。',
    // brand cards
    'CJ CheilJedang · CJ제일제당 · Global #1': 'CJ CheilJedang · CJ제일제당 · グローバルNo.1',
    'CJ\'s flagship product — the large (왕 = king) gyoza-style dumpling with juicy pork, tofu, and chive filling. Became the #1 dumpling brand in multiple countries. The thin, chewy skin is the key. Available at Costco worldwide.':
      'CJの看板商품 — ジューシーな豚肉・豆腐・ニラの具を包んだ大型（왕＝王）餃子スタイルの만두。複数の国で餃子ブランドNo.1에。薄くてもちもちの皮がポイント。世界中のコストコで購입可能。',
    'Global #1': 'グローバルNo.1',
    'Thin Skin': '薄い皮',
    'CJ CheilJedang · CJ제일제당': 'CJ CheilJedang · CJ제일제당',
    'Bibigo\'s kimchi dumpling — perfectly fermented kimchi filling balanced with pork and tofu. The tangy punch of kimchi works beautifully inside a dumpling skin. A fan favorite for those who want bold flavor.':
      'ビビゴのキムチ餃子 — 豚肉と豆腐でバランスよく配합された完璧에発酵したキムチの具。キムチの酸味パンチが餃子の皮の中で美しく機능する。大胆な風味を求める人のファン上位。',
    'Pulmuone · 풀무원 · Clean Ingredients': 'Pulmuone · 풀무원 · クリーン食材',
    'Pulmuone\'s health-focused boiled dumpling — cleaner ingredients, no artificial preservatives. The brand is known for organic and natural products. The 물만두 is soft, light, and less fatty than competitor versions.':
      'プルムウォンの健康志향茹で餃子 — クリーンな食材、人工保存料なし。오가닉と自然食품で知られるブランド。물만두는競합版より柔らかく、軽く、脂질が少ない。',
    'Clean': 'クリーン',
    'No Preservatives': '保存料なし',
    'Haitai · 해태제과 · Nostalgia Brand': 'Haitai · 해태제과 · ノスタルジアブランド',
    '고향 means "hometown" — Haitai\'s mandu evokes nostalgia for homemade dumplings. A longtime Korean market staple that pre-dates the Bibigo era. Beloved by older generations for its familiar, home-style flavor profile.':
      '고향は「故郷」를意味する — 해태만두は家庭手製餃子へのノスタルジーを呼び起こす。비비고時代より前からある長年の韓국市場の定番。親しみある가정식の味わいで年配世代에愛される。',
    'Nostalgic': 'ノスタルジック',
    'Hometown Taste': '고향の味',
    'Dongwon · 동원 · Gaeseong Style': 'Dongwon · 동원 · 개성スタイル',
    'Styled after the historical Gaeseong (개성) mandu tradition from North Korea — known for large size, rich pork filling, and distinctive half-moon shape. Gaeseong was historically the mandu capital of Korea.':
      '北朝鮮の歴史都市개성의만두伝統を模したスタイル — 大きなサイズ、豊かな豚肉의具材、独특의半月形で知られる。개성は歴史的에韓国의만두의都だった。',
    'Gaeseong Historic': '개성の歴史',
    'Large Size': '大型サイズ',
    'Sajo Daerim · 사조대림 · Budget Staple': 'Sajo Daerim · 사조대림 · 格安の定番',
    'Sajo\'s budget-friendly mandu line — excellent value for money. A staple for Korean households that want large quantities at low cost. Consistent quality and widely available at discount supermarkets and 창고형 stores.':
      '사조のコスパに優れたまんまduライン — コストパフォーマンス抜群。低コストで大量에欲しい韓국家庭의定番。安定した品質でディスカウントスーパーと창고형（倉庫型）店舗で広く入手可能。',
    'Budget Friendly': 'コスパ良好',
    'Bulk Buy': '大容量購入',
    'Grandmother\'s Hand-Made Style': 'おばあちゃんの手作りスタイル',
    'Small-batch, handmade-style mandu sold at traditional markets (재래시장) — "할매" means grandmother. Often made fresh and sold in large quantities at markets like Gwangjang Market (광장시장) in Seoul. Thicker skins, more rustic.':
      '伝統市場（재래시장）で販売される少量手作りスタイルの만두 — 「할매」はおばあちゃんを意味する。ソウルの광장시장などで新鮮에作って大量販売されることが多い。厚めの皮で素朴な味わい。',
    'Market Fresh': '市場の新鮮さ',
    'Hand-Made': '手作り',
    'Multiple Brands · 왕 = King (oversized)': '各ブランド · 왕 = 王（特大サイズ）',
    'Any oversized mandu — 왕 (king) denotes extra-large size. The filling is denser and more generous. Found at convenience stores (편의점) and 분식집 everywhere. A quick, filling meal in one piece. Street vendors make these fresh to order.':
      'どんな大型만두も — 왕（王）は特大サイズを意味する。具材がより密度高く豊富。편의점와분식집のどこでも見つかる。1個で素早く満腹になれる食사。路上露店では注문를받けてから作る。',
    'Huge Size': '特大サイズ',
    'Regional Style · Flat &amp; Pan-Fried': '地域スタイル · 平たく焼く',
    '납작 = flat. A thinner, wider shape that maximizes crispy surface area when pan-fried. Popular in certain regions. Used in 납작만두볶음 (stir-fried flat mandu) — a popular street snack with tteokbokki sauce.':
      '납작＝平たい。フライパン焼きの際にカリカリの表면積を最大化する薄くて幅広の形。特定의地域で人기。떡볶이ソースを使った人기のストリートスナック납작만두볶음에使용。',
    'Flat Style': 'フラットスタイル',
    'Max Crispy': '最高のカリカリ感',
    'Cultural Legend · Street Food Deception': '文化的伝説 · 路上の詐欺',
    'The infamous "fake" mandu — enormous wrapper concealing almost no filling inside. Sold by street vendors to deceive hungry customers. Now a cultural joke. "공갈" means bluffing or deceiving. Used as modern slang for anything all-show-no-substance.':
      '悪名高い「偽」만두 — 巨大な皮の中身がほぼ空。空腹の客을騙すために路上業者が販売していた。今や文화적인ジョーク。「공갈」는虚偽や欺くことを意味する。外見だけ立派で中身のないものを指す現代スラングとして使用。',
    'Slang Origin': 'スラングの起源',
    'Cultural Joke': '文化的ジョーク',
    // special mandu section
    'These mandu carry deep cultural or historical significance — from Goryeo dynasty origins to UNESCO-recognized holiday traditions.':
      'これらの만두は高麗王朝의起源からユネスコ認定의祝日伝統まで、深い文화的・역사적意義を持つ。',
    'Lunar New Year Soup · 설날 Ritual': '旧正月スープ · 설날의儀式',
    'Rice cake (떡) + mandu (만두) in clear broth — the definitive Lunar New Year (설날) dish. Eating a bowl on New Year\'s Day is believed to add one year of age and bring good fortune. Garnished with egg strips, nori, and sesame.':
      '맑은スープに떡＋만두 — 決정的인旧正月（설날）의料理。元日に一杯食べると一歳年をとり幸運をもたらすと信じられている。錦糸卵・海苔・ごまで飾る。',
    '설날 Ritual': '설날の儀式',
    'New Year': '新年',
    'Spring Seasonal · Wild Spring Greens': '春季限定 · 野生의春野草',
    'Spring edition featuring seasonal wild herbs — 달래 (wild chive), 쑥 (mugwort), 냉이 (shepherd\'s purse). Made at home during spring when herbs are freshest. A seasonal tradition in many Korean households.':
      '달래（野生ニラ）・쑥（ヨモギ）・냉이（ナズナ）などの旬의野生ハーブを使った春版。ハーブが最も新鮮な봄に自宅で作る。多くの韓国家庭의季節の伝統。',
    'Spring Only': '봄限定',
    'Wild Herbs': '野生ハーブ',
    'Buddhist Temple Food · No 오신채': '仏教寺院料理 · 오신채なし',
    'Buddhist temple cuisine mandu — absolutely no meat, no garlic, no onion, no chive, no leek (the five pungent vegetables 오신채 are forbidden). Uses mushroom, tofu, and seasonal vegetables only. Pure, delicate, and spiritual.':
      '仏教寺院料理の만두 — 肉・ニンニク・玉ねぎ・ニラ・ネギは一切なし（五辛채오신채は禁止）。きのこ・豆腐・旬の野菜のみ使용。純粋で繊細、精神的な食べ物。',
    'Vegan': 'ビーガン',
    'Temple Food': '寺院料理',
    'North Korean Style · Historical Capital': '北朝鮮スタイル · 역사적な首都',
    'The most historically prestigious Korean mandu style — from Gaeseong (개성), the Goryeo dynasty capital now in North Korea. Very large, thicker wrapper, rich pork and kimchi filling, crescent moon shape. Considered the ancestor of all Korean mandu.':
      '最も역사적에権威ある韓국만두スタイル — 現在北朝鮮にある高麗王朝의首都개성발祥。非常に大きく、厚めの皮、豊かな豚肉とキムチの具、三日月形。全韓국만두의祖先とされる。',
    'Goryeo Origin': '高麗起源',
    // mandu vocab
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
    '📖 만두 어휘 · Mandu Vocabulary': '📖 만두 어휘 · 餃子語彙',
    '🥩 소에 따른 종류 By Filling': '🥩 소에 따른 종류 具材別',
    '🏪 주요 브랜드 Major Brands': '🏪 주요 브랜드 主要ブランド',
    '10 brands': '10ブランド',
    '🎊 특별한 만두 Special &amp; Seasonal': '🎊 특별한 만두 特別・季節限定',
    '4 varieties': '4種類',
    '12 varieties': '12種類',

    // ── kchicken.html ────────────────────────────────────────────
    // hero paragraph
    'Korea\'s fried chicken (치킨) is not American fried chicken. It\'s double-fried for maximum crunch, coated in sweet-spicy glazes, and delivered within 30 minutes to your door at 11 PM. With 87,000+ chicken restaurants in Korea (more than McDonald\'s worldwide), this is a national religion.':
      '韓국의치킨（フライドチキン）はアメリカのフライドチキンとは異なる。最大限のサクサク感のために二度揚げし、甘辛のグレーズをまとわせ、夜11時でも30分以内에配達される。韓国에87,000店以上のチキン店がある（世界のマクドナルドより多い）。これは国民的な宗教だ。',
    '치킨 + 맥주 (beer) combo': '치킨 + 맥주（ビール）コンボ',
    // history info-box text parts (split by <strong> tags)
    '1. The Birth of Tongdak: Electric Roasting &amp; Frying (1960s–70s)': '1. 통닭의誕生：電気焼きと揚げ物（1960〜70年代）',
    'In 1960, \'Myeongdong Yeongyang Center\' in Seoul became the first to serve 전기구이 통닭 — a whole chicken cooked in an electric oven. By the 1970s, cheap cooking oils made deep-fried \'옛날 통닭\' (old-style whole fried chicken) widely popular. In 1977, Korea\'s first chicken franchise, Lim\'s Chicken (림스치킨), opened at Myeongdong\'s Shinsegae Department Store, introducing the practice of cutting chicken into pieces before frying.':
      '1960年、ソウル「明洞栄養センター」が電気オーブンで丸鶏を調理した전기구이통닭을初めて提供した。1970年代には安価な食用油의普及により、丸鶏を揚げた「옛날 통닭」が広く普及。1977年には韓国初のチキンフランチャイズ「림스치킨」が明洞의신세계백화점에開業し、揚げる前에鶏を切り分けるスタイルを導입했다。',
    '2. K-Chicken Perfected: The Birth of Yangnyeom Chicken (1980s)': '2. K-チキンの完成：양념치킨의誕생（1980年代）',
    'To suit Korean palates less accustomed to plain fried chicken, a sweet-spicy sauce of gochujang and garlic was tossed over freshly fried chicken — and 양념치킨 was born. As chains like Mexicana Chicken (맥시칸치킨) expanded through the 1980s, the custom of pairing chicken with pickled radish cubes (무) became standard, giving rise to today\'s iconic 치맥 (치킨+맥주, chicken+beer) culture.':
      'プレーンなフライドチキンに慣れていない韓국人의口에합わせ、コチュジャンとニンニクの甘辛ソースを揚げたての鶏에和えた — こうして양념치킨が誕生した。1980년대에맥시칸치킨などのチェーンが拡大するにつれ、チキンにピクルス大根（무）를添える習慣が定番となり、今日의아이코닉한치맥（치킨+맥주）文化が生まれた。',
    // chimaek tip-box
    '치맥 = 치킨 + 맥주 (beer). This is Korea\'s most beloved food pairing — cold beer with hot crispy chicken, usually ordered for delivery. Eating 치맥 while watching football (축구), baseball (야구), or a K-drama is considered one of life\'s peak experiences by many Koreans. The combination became globally known through the drama "My Love From the Star" (별에서 온 그대, 2013).':
      '치맥 = 치킨 + 맥주（ビール）。これは韓국で最も愛されるフードペアリング — 熱くてカリカリのチキンに冷たいビール、通常は配달注문。축구・야구・K-드라마를見ながら치맥를食べることは多くの韓국人에「人生最高의体험」のひとつとされる。「별에서 온 그대」（2013年）というドラマを通じて世界的に知られるようになった。',
    // chain section header
    'Each chain has its own signature flavor identity, sauce philosophy, and loyal fanbase. Choosing the "best" chicken franchise is a deeply personal matter that Koreans debate seriously.':
      '각チェーンには独自のシグネチャーフレーバーアイデンティティ、ソース哲학、忠실なファン層がある。「最高의」チキンフランチャイズを選ぶことは韓국人が真剣에議論する非常に個人적인問題だ。',
    // chain cards
    '교촌에프앤비 · Founded 1991 · Daegu · Global': '교촌에프앤비 · 1991年창업 · 大邱 · グローバル展開',
    'Korea\'s most prestigious chicken chain — famous for the 교촌 허니콤보 (Honey Combo) and soy sauce (간장) base. Not sweet-spicy like most chains — instead, a sophisticated soy-garlic glaze. Higher price point, considered premium. Has stores in the US, China, Malaysia.':
      '韓国で最も権威あるチキンチェーン — 교촌허니콤보와간장ベースで有名。ほとんどのチェーンのような甘辛ではなく、洗練された醤油ガーリックグレーズ。高価格帯でプレミアムとされる。米国・中国・マレーシアに店舗あり。',
    'Soy Garlic': 'ソイガーリック',
    'Honey Combo': 'ハニーコンボ',
    '제너시스BBQ · Founded 1995 · Global Expansion': '제너시스BBQ · 1995年창업 · グローバル展開',
    'BBQ stands for "Best of the Best Quality." Famous for 황금올리브치킨 (Golden Olive Chicken) — fried in pure olive oil. The most internationally expanded Korean chicken chain, with 57+ countries. Also known for the Crispy Goldking flavor.':
      'BBQは「Best of the Best Quality」의略。純粋なオリーブオイルで揚げた황금올리브치킨으로有名。57カ国以上で展開する最も국제的な韓국チキンチェーン。Crispy Goldkingフレーバーでも知られる。',
    'Golden Olive': 'ゴールデンオリーブ',
    '57+ Countries': '57カ国以上',
    'BHC그룹 · Founded 1993 · Delivery King': 'BHC그룹 · 1993年창업 · 配達の王',
    'Famous for two viral menu items: 뿌링클 (Ppuringkle — cheesy powder coating) and 맛초킹 (Matzokking — crispy spicy). Both consistently rank as Korea\'s most-ordered delivery chicken. The 뿌링클 cheese powder has its own cult following.':
      '2つのバイラルメニューで有名：뿌링클（チーズパウダーコーティング）と맛초킹（サクサク辛口）。両方とも韓국で最も注문される配달チキンとして常にランクイン。뿌링클のチーズパウダーにはカルト的なファンがいる。',
    '뿌링클 Viral': '뿌링클バイラル',
    '굽네 · Founded 2003 · Oven-Baked Pioneer': '굽네 · 2003年창업 · オーブン焼きの先駆者',
    'Korea\'s leader in oven-baked (오븐에 구운) chicken — not fried at all. Lower fat, cleaner flavor, crispy through slow oven cooking. The signature 볼케이노 (Volcano) spicy sauce is a classic. Popular with health-conscious consumers.':
      'オーブン焼き（오븐에 구운）チキンの韓국리더 — 一切揚げない。低脂질でクリーンな風味、스로우쿠킹でカリカリに。シグネチャーの볼케이노（ボルケーノ）スパイシーソースが定番。健康意識の高い消費者에人気。',
    'Oven-Baked Pioneer': 'オーブン焼きの先駆者',
    '처갓집 · Founded 1985 · Original Yangnyeom': '처갓집 · 1985年창업 · 양념치킨의元祖',
    '처갓집 is credited with inventing or popularizing 양념치킨 (sweet-spicy sauce chicken) — the style that defines Korean fried chicken internationally. The original bright red gochujang glaze. A foundational pillar of Korean chicken culture.':
      '처갓집는양념치킨（甘辛ソースチキン）を発明または普及させたブランドとして認められている。国際的에韓국フライドチキンを定義するスタイルの元祖。韓국チキン文화의礎。',
    '양념 Pioneer': '양념치킨의先駆者',
    '멕시칸 · Founded 1982 · Long-Running Classic': '멕시칸 · 1982年창업 · 長寿クラシック',
    'One of Korea\'s longest-running chicken chains — despite the name, it\'s 100% Korean chicken style. Known for crispy texture and a balanced sweet-spicy sauce. A nostalgic choice for Koreans who grew up in the 1980s and 90s.':
      '韓국で最も長く営業するチキンチェーンのひとつ — 名前にもかかわらず100%韓国スタイルのチキン。カリカリの食感とバランスのよい甘辛ソースで知られる。1980〜90年代에育った韓국人にとってノスタルジックな選択。',
    'Since 1982': '1982年창업',
    '멕시카나 · Founded 1989 · Similar Name, Different Brand': '멕시카나 · 1989年창업 · 似た名前、別ブランド',
    'Often confused with 멕시칸치킨 — these are entirely separate chains. 멕시카나 has its own signature spicy paste recipe and loyal regional following. Known for hand-pressed marinade applied before frying — results in deeper flavor penetration.':
      '멕시칸치킨と混同されがちだが、これらは全く別のチェーン。멕시카나는独自のシグネチャースパイシーペーストレシピと忠실なRegional팬층을持つ。揚げる前에手で押し込むマリネで知られ、より深い風味의浸透をもたらす。',
    'Hand-Pressed': 'ハンドプレス',
    '페리카나 · Founded 1982 · Soy Sauce Legend': '페리카나 · 1982年창업 · 醤油の伝説',
    'One of Korea\'s oldest chicken chains — founded the same year as 멕시칸. Famous for 간장치킨 (soy sauce chicken) before it became mainstream. A regional stronghold brand with fierce loyalty in certain neighborhoods. Classic, no-frills, reliable.':
      '韓국で最も古いチキンチェーンのひとつ — 멕시칸과같은年에창립。주류화되기 前부터간장치킨으로有名。特定의지역에서강한충성도를가진지역の強者ブランド。クラシックで飾りなく、信頼できる。',
    'Soy Sauce OG': '醤油チキンの元祖',
    '지코바 · Stir-Fried Not Fried · Unique': '지코바 · 炒め・揚げでない · ユニーク',
    'Unlike every other chain — this is not fried chicken. 지코바 specializes in 닭갈비 (dak-galbi), marinated chicken ribs stir-fried in a spicy gochujang sauce on a tabletop griddle. A completely different Korean chicken experience. Hugely popular for groups.':
      '他のすべてのチェーンとは異なり — これはフライドチキンではない。지코바는닭갈비専門で、コチュジャンソースとテーブルグリドルで炒めるマリネした鶏リブ。全く異なる韓국の치킨체験。グループ식사에大人気。',
    'Stir-Fried · Not Fried': '炒め · 揚げでない',
    '네네 · Founded 1999 · Fun Brand': '네네 · 1999年창업 · ファンブランド',
    'One of Korea\'s top 5 chicken chains by outlet count. Known for fun branding, vibrant visual identity, and consistent quality. Famous for 눈꽃치즈치킨 (Snow Cheese Chicken) — a creamy, cheesy powder coating that became a major trend in the 2010s.':
      '店舗数で韓국トップ5のチキンチェーンのひとつ。楽しいブランディング、鮮やかなビジュアルアイデンティティ、안정적인품질로知られる。2010년代에大トレンドとなったクリーミーなチーズパウダーコーティングの눈꽃치즈치킨으로有名。',
    'Snow Cheese': 'スノーチーズ',
    '60계 · 60 Days Marination · Premium Quality': '60계 · 60日間飼育 · プレミアム品질',
    'Named for their claim that chickens are raised 60 days — the name signals quality sourcing. Known for using fresher, more carefully sourced chicken than standard chains. Less sweet than competitors, more emphasis on natural chicken flavor. Beloved by purists.':
      'チキンを60日間飼育するという主장からブランド名が由来 — 품질원산지를示す名前。標準的なチェーンより新鮮에丁寧に調達したチキンの使用で知られる。競합より甘みが少なく、自然なチキンの風味を重視。純粋주의자에愛される。',
    '60-Day Bird': '60日間飼育',
    'Quality-Focused': '품질重視',
    '노란통닭 · Whole Chicken Style · Retro': '노란통닭 · 丸鶏スタイル · レトロ',
    'Specializes in whole fried chickens (통닭) with a signature yellow curry-spiced coating. Retro aesthetic and concept — harks back to the 1970s–80s era of Korean roadside chicken shops. The whole chicken format gives a different eating experience.':
      'シグネチャーの黄色いカレースパイスコーティングをまとった丸鶏（통닭）専門店。レトロな美学とコンセプト — 1970〜80년대の韓국の路上치킨店를彷彿とさせる。丸鶏형식が異なる식사体験を提供する。',
    'Whole Chicken': '丸鶏',
    'Retro Style': 'レトロスタイル',
    'Curry-Spiced': 'カレースパイス',
    '호식이두마리치킨 · 2 for 1 Value Brand': '호식이두마리치킨 · 2羽で1羽분의価値ブランド',
    '두마리 = two chickens. The core proposition: buy one order, get two whole chickens for approximately the price of one at premium chains. Budget-focused, high-volume brand loved by students, families, and those who need a LOT of chicken. No frills, maximum quantity.':
      '두마리＝チキン2羽。핵심の提案：1オーダーでプレミアムチェーン의1羽분의価격で丸鶏2羽분。学생・가족・チキンをたくさん食べたい人에愛される格安・大량志향ブランド。飾りなし、最大の量。',
    '2 Chickens': 'チキン2羽',
    'Best Value': '最高コスパ',
    'Budget King': '格安の王',
    '바른치킨 · Health-Focused · Air-Fried': '바른치킨 · 健康志향 · エアフライ',
    '바른 = right/proper/upright. Positions itself as the "clean eating" chicken choice — uses better quality oil, air-frying methods, and natural seasoning. Less greasy than competitors. Popular with 30–40 year old health-conscious consumers.':
      '바른＝正しい/適切。「クリーンイーティング」チキンの選択肢としてポジション — より良질な油・에어프라이調理法・천연調味料を使용。競합より油っぽくない。健康意識の高い30〜40代에人気。',
    'Air-Fried Option': 'エアフライオプション',
    '푸라닭 · Founded 2006 · Spicy Specialist': '푸라닭 · 2006年창업 · スパイシースペシャリスト',
    'Famous for bold, intense flavor profiles — especially their 블랙후추 (Black Pepper) and 불닭갈릭 (Buldak Garlic) flavors. Appeals to adventurous eaters who want more complex seasoning than typical sweet-red-sauce chains. Growing rapidly in 2020s.':
      '大胆で강렬한フレーバープロファイルで有名 — 特에블랙후추（ブラックペッパー）와불닭갈릭（プルダクガーリック）フレーバー。典型的な甘い赤ソースチェーンより複雑な調味료를求める冒険的な미식가에訴求。2020년代에急速に成長中。',
    'Bold Flavors': '大胆なフレーバー',
    // chicken styles section
    'Korean fried chicken goes far beyond "fried chicken" — the style, sauce, and format vary dramatically between orders. Knowing these terms lets you order exactly what you want.':
      '韓국フライドチキンは「フライドチキン」をはるかに超える — スタイル・ソース・형식가오더마다大きく異なる。これらの용어를知ることで、欲しいものを正확에注문できる。',
    // style cards
    'Classic Fried · No Sauce': 'クラシック揚げ · ソースなし',
    'Plain double-fried chicken — no sauce. The purest Korean fried chicken experience. Double-fried (두 번 튀긴) creates a shattering, crackling crust that\'s lighter than American fried chicken. The gold standard for judging a chicken shop\'s oil quality and technique.':
      'ソースなしのプレーンな二度揚げチキン。最も純粋な韓국フライドチキン체험。二度揚げ（두 번 튀긴）がアメリカのフライドチキンより軽いパリパリの衣を生み出す。치킨店의油의품질とテクニックを판断するゴールドスタンダード。',
    'Double-Fried': '二度揚げ',
    'Sweet-Spicy Glazed · Korean Iconic': '甘辛グレーズ · 韓국의代名詞',
    'The Korean fried chicken that changed everything — fried chicken tossed in a sweet-spicy gochujang glaze. Sticky, finger-licking, addictive. Often ordered as "반반" (half-and-half) with 후라이드 so you get both styles in one order.':
      '全てを変えた韓국フライドチキン — 甘辛コチュジャングレーズで和えたフライドチキン。ネバネバして手が止まらない중독성。1오더로両方のスタイルを楽しむため후라이드と「반반」で注문されることが多い。',
    'Korean Icon': '韓국의代名詞',
    'Soy Sauce Glazed · Savory-Sweet': '醤油グレーズ · 甘じょっぱい',
    'Soy sauce (간장), garlic, and sugar glaze — savory, slightly sweet, deeply umami. No chili heat. The sophisticated alternative to 양념. Used by premium chains like 교촌 as their flagship style. Often paired with beer for a cleaner-flavored 치맥.':
      '간장（醤油）・ニンニク・砂糖のグレーズ — コクがあり、ほんのり甘く、深いうまみ。唐辛子の辛さなし。양념의洗練された代替として교촌などのプレミアムチェーンが看板スタイルとして使용。よりクリーンな風味의치맥のためによくビールとペアリング。',
    'Cheese Fondue Dip or Powder': 'チーズフォンデュディップまたはパウダー',
    'Either dipped in a cheese fondue, coated in cheese powder (뿌링클 style), or served with a cheese sauce side. The sweet-salty cheese complements the fry perfectly. Korea\'s cheese obsession + chicken obsession combined into one.':
      'チーズフォンデュにつけるか、チーズパウダーをまとわせ（뿌링클スタイル）、またはチーズソースを添えて提供。甘じょっぱいチーズが揚げ物と完璧에補い合う。韓국의치즈愛＋치킨愛が一つに합체。',
    'Honey-Glazed · Kyochon Signature': 'ハニーグレーズ · 교촌のシグネチャー',
    'Originated at 교촌 — a honey glaze on soy-marinated chicken. Sweet, sticky, caramelized. Now referenced as a style across multiple chains. Pairs perfectly with pickled radish (치킨무). One of the most reordered Korean chicken menus.':
      '교촌で生まれた — 醤油でマリネしたチキンにハニーグレーズ。甘く、ネバネバし、キャラメライズされる。今や複数のチェーンでスタイルとして参照される。치킨무（ピクルス大根）と完璧なペアリング。最も再注문される韓국치킨메뉴のひとつ。',
    'Sweet': '甘い',
    'Honey Glaze': 'ハニーグレーズ',
    'Garlic Cream Sauce · Savory': 'ガーリッククリームソース · コク',
    'Roasted garlic cream sauce — rich, savory, aromatic. Became a major trend in the mid-2010s. The thick cream base makes this one of the most indulgent styles. Often combined with cheese for maximum richness. Best eaten fresh, not reheated.':
      'ローストガーリッククリームソース — 濃厚でコクがあり、アロマティック。2010년대中盤에大トレンドに。濃厚なクリームベースがこれを最も贅沢なスタイルのひとつにする。最大のリッチさのためチーズとよく組み합わせる。温め直しより新鮮な状態で食べるのがベスト。',
    'Garlic Cream': 'ガーリッククリーム',
    'Spicy Stir-Fried Chicken Ribs · Chuncheon': '辛口炒め鶏リブ · 춘천',
    'Not fried — marinated chicken ribs stir-fried on a flat griddle with gochujang, garlic, rice cakes (떡), and cabbage. A Chuncheon (춘천) regional specialty now loved nationwide. Often ordered communally, cooked at the table. Add 볶음밥 (fried rice) to finish.':
      '揚げでない — コチュジャン・ニンニク・떡（餅）・キャベツと共にフラットグリドルで炒めるマリネした鶏リブ。今は全国で愛される춘천（春川）의地域名物。共同으로注문してテーブルで調理することが多い。仕上げに볶음밥를追加。',
    'Chuncheon': '춘천',
    'Half 후라이드 + Half 양념 · Best Combo': '후라이드半분 + 양념半분 · ベストコンボ',
    '반반 = half-half. Split order of plain fried (후라이드) and sweet-spicy glazed (양념) in one box. The most popular way to order chicken in Korea. Always served with 치킨무 (pickled white radish cubes) and sweet-spicy sauce on the side.':
      '반반＝半々。1つの박스에후라이드와양념를半々。韓국で最も人気の치킨注문방법。常에치킨무（白大根のピクルス）와甘辛ソースを添えて提供。',
    'Most Ordered Style': '最多注문スタイル',
    'Best of Both': '両方のいいとこ取り',
    'Tomato Cream + Spicy · 2020s Trend': 'トマトクリーム + 辛口 · 2020년代トレンド',
    'The rosé pasta trend hit chicken — tomato cream sauce with a subtle chili kick. Pink-orange color, creamy and rich. Swept Korean food delivery apps in 2021–2022. A younger demographic favorite. Less common now but still available at trend-conscious chains.':
      'ロゼパスタのトレンドがチキンに — 微妙な唐辛子の辛さのあるトマトクリームソース。ピンクオレンジ色でクリーミーかつ濃厚。2021〜22年에韓国의배달앱를席巻。若い層のお気に入り。今は少なくなったがトレンド意識の高いチェーンでまだ入手可能。',
    'Extra Spicy · Challenge Level': '激辛 · チャレンジレベル',
    'Each chain\'s dedicated "extra spicy" version — using ghost pepper, habanero, or concentrated gochugaru extract. 굽네 볼케이노, 교촌 레드콤보, BHC 맛초킹 all fall in this category. Ordered for spice tolerance bragging rights.':
      '各チェーンの「激辛」バージョン — ゴーストペッパー・ハバネロ・または濃縮고추가루エキスを使용。굽네볼케이노・교촌레드콤보・BHC맛초킹すべてこのカテゴリーに属する。辛さへの耐성자랑のために注문される。',
    'Bragging Rights': '자랑の権利',
    // chicken vocab
    'Korean fried chicken': '韓국フライドチキン',
    'chicken + beer (치킨 + 맥주)': 'チキン + ビール（치킨 + 맥주）',
    'plain fried (from "fried")': '素揚げ（「fried」から）',
    'sweet-spicy glazed chicken': '甘辛グレーズチキン',
    'soy sauce glazed chicken': '醤油グレーズチキン',
    'half-and-half (two styles)': '半々（2スタイル）',
    'whole chicken': '丸鶏',
    'spicy stir-fried chicken ribs': '辛口炒め鶏リブ',
    'pickled radish served with chicken': 'チキンに添えるピクルス大根',
    'Baemin (Korea\'s #1 delivery app)': 'Baemin（韓国의배달アプリNo.1）',
    'to double-fry': '二度揚げする',
    'crispy, crunchy (texture sound word)': 'サクサク、カリカリ（食感の擬音語）',
    'chicken restaurant/shop': 'チキン屋',
    'one can of beer': 'ビール1缶',
    '📖 치킨 어휘 · Chicken Vocabulary': '📖 치킨 어휘 · チキン語彙',
    '🍗 치킨 종류 Chicken Styles': '🍗 치킨 종류 チキンスタイル',
    '10 styles': '10スタイル',

    // ── kbbq.html ────────────────────────────────────────────────
    // hero paragraph
    'Korean BBQ (고기구이) is one of Korea\'s greatest cultural exports — a communal, interactive meal cooked at the table over charcoal (숯불) or gas (가스). Every animal offers multiple distinct cuts, each with its own name, flavor, fat content, and preferred cooking technique. This is your complete guide.':
      '韓국바비큐（고기구이）は韓国最大の文화輸出品のひとつ — 炭火（숯불）またはガス（가스）でテーブルで調理する共同でインタラクティブな食事。すべての동물が독자の名前・風味・脂肪함량・好みの調理기술を持つ複数의部위を提供する。これが完全ガイドだ。',
    // ssam tip-box
    '쌈 (Ssam) — The Korean BBQ Wrap': '쌈（サム）— 韓국BBQの巻き方',
    '쌈 means "wrap" — the Korean BBQ ritual of wrapping grilled meat in a leaf (상추 lettuce, 깻잎 perilla, 취나물 aster greens), adding a smear of 쌈장 (fermented soybean paste), raw garlic, sliced chili, and kimchi. Then fold and eat in one bite. Attempting to bite a 쌈 halfway and leaving it on the plate is considered gauche. One full wrap, one bite.':
      '쌈は「包む」を意味する — 焼いた肉を葉（상추・깻잎・취나물）에包み、쌈장・生ニンニク・唐辛子のスライス・キムチを加えて折りたたんで一口で食べる韓국BBQの儀式。半分だけかじってお皿에残すのは不作法とされる。一巻き一口で。',
    // beef section header
    'Korean beef BBQ (소고기구이) is considered premium dining. 한우 (Korean native beef) commands the highest price — certified by USDA-equivalent 등급 grading. At a top 한우집 (Korean beef house), every cut is its own conversation.':
      '韓국의소고기구이はプレミアムダイニングとされる。한우はUSDA同等의등급グレーディングで認証され、最高価格를誇る。一流의한우집では全ての部위が독자의話題になる。',
    // beef cards
    'Beef · Chuck Flap Tail · Premium': '牛肉 · チャックフラップテール · プレミアム',
    'One of the most prized cuts in Korean BBQ — taken from the chuck (어깨) area near the rib. Exceptionally fine marbling that creates a buttery, rich, melt-in-mouth experience. The fat renders quickly over high heat. Considered a connoisseur\'s cut.':
      '韓국BBQで最も珍重される部위のひとつ — 갈비近くの肩（어깨）部位から取れる。バターのように溶けて濃厚で口でとろける체험を生み出す例外的에細かいマーブリング。高温で脂肪が素早く溶ける。コニュサーの部位とされる。',
    'Beef · Hanger/Skirt Steak · Intense': '牛肉 · ハンガー/スカートステーキ · 강렬',
    'Hanger steak from the diaphragm area — intensely beefy flavor due to its position near the organs. Dark red, coarser grain than 살치살. Has a slight mineral quality that BBQ fans seek out. Pairs perfectly with raw garlic and gochujang.':
      '횡격막部位のハンガーステーキ — 内臓近くの位置によりg극めて강렬な牛肉의風味。深い赤色で살치살より粗い繊維。BBQファンが求める微妙なミネラル질。生ニンニクとコチュジャンと完璧なペアリング。',
    'Beef · Ribeye · 꽃 = Flower (marbling)': '牛肉 · リブアイ · 꽃 = 花（マーブリング）',
    'The ribeye — 꽃 (flower) refers to the beautiful marbling pattern that looks like flowers. Rich, flavorful, with even fat distribution. One of the most ordered Korean beef cuts. Best cooked medium-rare over charcoal. The fat blooms beautifully over heat.':
      'リブアイ — 꽃（花）は花のように見える美しいマーブリングパターンを指す。濃厚で風味豊か、균일한脂肪분布。最も注문される韓국牛肉部위のひとつ。炭火でミディアムレアが最適。脂肪が熱で美しく開く。',
    'Beef · Short Rib Meat · Classic BBQ': '牛肉 · ショートリブ肉 · クラシックBBQ',
    'Meat from around the short ribs — rich, well-marbled, deeply savory. The basis of 소갈비 (grilled beef ribs). When marinated in soy-sesame-garlic (양념갈비), it becomes one of Korea\'s most beloved BBQ dishes. Available bone-in or boneless.':
      'ショートリブ周辺の肉 — 濃厚でマーブリングよく、深いコク。소갈비（焼き牛リブ）のベース。醤油・ごま・ニンニクでマリネ（양념갈비）すると韓국で最も愛されるBBQ料理のひとつになる。뼈있는것와없는것으로入手可能。',
    'BBQ Classic': 'BBQクラシック',
    'Rib Flavor': 'リブの風味',
    'Beef · Sirloin Strip · Lean &amp; Tender': '牛肉 · サーロインストリップ · 赤身で柔らか',
    'Sirloin strip — a lean but tender cut that\'s juicy without excessive fat. Less marbled than 꽃등심, preferred by those who want clean beef flavor without richness. Sliced thin for BBQ — quick cook, high heat. Pairs well with simple salt and sesame oil dipping.':
      'サーロインストリップ — 지방過多なく柔らかくてジューシーな赤身의部位。꽃등심よりマーブリングが少なく、リッチさなしにクリーンな牛肉の風味을求める人が好む。BBQ용에薄切り — 高温で素早く調理。シンプルな塩とごま油つけで잘어울린다。',
    'Beef · Brisket (Thin-Sliced) · Fat-Forward': '牛肉 · ブリスケット（薄切り）· 脂肪前面',
    'Paper-thin shaved brisket with layered fat striping — named for its resemblance to flint stones (차돌). Cooks in seconds on a hot grill. The fat sizzles and crisps at the edges. Dipped in sesame oil-salt or wrapped in perilla leaf. An addictive cycle of eat-wrap-repeat.':
      '층층이줄무늬の脂肪がある紙のように薄いブリスケット — 火打ち석（차돌）에似ることから命名。熱いグリルで数秒で調理完了。端의脂肪がジュッとカリカリになる。ごま油塩につけるかエゴマの葉에包んで食べる。食べる・巻く・繰り返すの중독적인サイクル。',
    'Beef · Navel/Brisket Point · Rich': '牛肉 · ナベル/ブリスケットポイント · 濃厚',
    'From the belly-brisket area — heavily marbled with a rich, unctuous quality. Less common than 차돌박이 but prized by BBQ veterans. The fat content is very high — for those who love intensely fatty beef. Best cooked over charcoal where fat drip creates flavor smoke.':
      'お腹ブリスケット部位から — 濃厚でなめらかな质의강한マーブリング。차돌박이より少なく見られるがBBQ熟練者에重宝される。脂肪함량が非常에高い。脂肪의滴りが風味のスモークを生み出す炭火調理が最適。',
    'Beef · Flank Steak · 치마 = Skirt': '牛肉 · フランクステーキ · 치마 = スカート',
    '치마 means "skirt" — the flank area. Long muscle fibers, lean with good beefy flavor. Coarser texture than premium cuts but very satisfying. Often marinated before grilling to tenderize. A solid mid-price BBQ option with good flavor return.':
      '치마は「スカート」을意味する — フランク部위。長い근섬유로赤身だが良い牛肉의風味。プレミアム部위より粗い食感だが非常에満足できる。柔らかくするため焼く前によくマリネする。풍미の見返りが良い堅실な中価格帯BBQオプション。',
    'Beef · Outside Skirt · Hidden Gem': '牛肉 · アウトサイドスカート · 隠れた名品',
    'From the diaphragm\'s outer edge — similar to 안창살 but slightly leaner. Less well-known, often overlooked at restaurants, but delivers excellent beefy intensity at a lower price than premium cuts. A "hidden gem" favored by BBQ insiders. Cook fast over high heat.':
      '横格膜의外側縁から — 안창살에似ているが若干赤身。식당에서덜알려져있지만프레미엄部位より低価格で優秀な牛肉의강도를提供する。BBQインサイダーに愛される「隠れた名品」。高温で素早く調理。',
    'Beef · Flat Iron Steak · 부채 = Fan': '牛肉 · フラットアイアンステーキ · 부채 = 扇',
    'Named for its fan (부채) shape — the flat iron steak from the chuck shoulder. Fine marbling, tender texture, and excellent flavor. Increasingly popular as Koreans discover Western butchery cuts. Excellent grilled over charcoal. Versatile — good for ssamjang wrap or plain.':
      '扇（부채）の形から命名 — 어깨チャックのフラットアイアンステーキ。細かいマーブリング・柔らかい食감・優秀な風味。韓국人が西洋의정육カットを発見するにつれ人気上昇中。炭火焼きが抜群。쌈장巻きにもそのままでも使える汎用性。',
    'Beef · Thin-Sliced Beef Belly · Budget': '牛肉 · 薄切り牛バラ · 格安',
    '소고기 삼겹살 — thin-sliced beef belly with layered fat and muscle. The beef equivalent of pork 삼겹살. Much cheaper than premium cuts, widely popular for everyday BBQ outings. Cooks quickly, fat caramelizes nicely. A practical, approachable entry into beef BBQ.':
      '소고기삼겹살 — 층층이의脂肪과근육의얇게 썬 소 뱃살。豚삼겹살의牛肉バージョン。프레미엄部位より格段에安く、日常的なBBQ外식에広く人기。素早く調理完了し、脂肪がよくキャラメライズされる。牛肉BBQへの実用적으로取り組みやすいエントリー。',
    'Beef · Marinated Beef Short Ribs': '牛肉 · マリネ牛ショートリブ',
    'Short ribs marinated in soy sauce, sugar, garlic, sesame, and pear (배) or kiwi for tenderizing. One of the most beloved Korean BBQ dishes — the marinade caramelizes beautifully over charcoal. A staple at birthday celebrations (생일 잔치) and family gatherings.':
      '醤油・砂糖・ニンニク・ごま、そして柔らかくするための배（梨）またはキウイでマリネしたショートリブ。韓국で最も愛されるBBQ料理のひとつ — 炭火でマリネが美しくキャラメライズされる。생일잔치와가족모임의定番。',
    'Korean Native Beef · Highest Grade': '韓국재래牛 · 最高等级',
    '한우 (Korean native cattle) graded at 1++ — the highest beef grade in Korea, equivalent to Wagyu-level marbling. Extremely expensive. The fat is white and evenly distributed throughout the meat. Eating 한우 1++ is a special occasion in Korea — for promotions, anniversaries, or making someone feel truly celebrated.':
      '한우（韓国재래牛）의1++等級 — 와규レベルのマーブリングに相当する韓국で最も高い牛肉等级。非常에高価。脂肪が白く肉전체에均一에分布している。韓国에서한우1++를食べることは昇進・記念日・誰かを心から祝う特別な機会のためのもの。',
    'Top Grade': '最高等级',
    'Celebration': '祝い',
    // pork section header
    'Pork BBQ (돼지고기 구이) is the everyday Korean BBQ — more affordable, less formal, and often paired with soju for a classic evening out. 삼겹살 alone has its own holiday (삼겹살데이, March 3rd = 3/3, pronounced 삼삼).':
      '돼지고기구이（豚肉BBQ）は日常的な韓국BBQ — より手頃で格式張らず、定番の夜のお出かけのためによくソジュとペアリングされる。삼겹살には独자의記念日がある（삼겹살데이、3月3日＝3/3、삼삼と発音）。',
    // pork cards
    'Pork · Pork Belly · Korea\'s #1 BBQ': '豚肉 · 豚バラ · 韓국BBQ第1位',
    'The undisputed king of Korean BBQ — 삼 (3) 겹 (layers) 살 (meat). Thick strips of pork belly with three alternating layers of fat and muscle. Grilled on a iron grill or charcoal, then cut with scissors, wrapped in lettuce with garlic and 쌈장. Has its own national holiday: 삼겹살데이 (March 3rd).':
      '韓국BBQの論논리적인王 — 삼（3）겹（層）살（肉）。脂肪와근육が交互に3層になった厚めの豚バラストリップ。鉄板または炭火で焼き、ハサミで切って、ニンニクと쌈장을添えたサンチュに巻く。独자의国民記念日あり：삼겹살데이（3月3日）。',
    '삼겹살데이 3/3': '삼겹살데이 3/3',
    'Pork · Pork Collar/Neck · Second Favorite': '豚肉 · 豚首/カラー · 第2のお気に입り',
    'Pork neck/collar — arguably even more popular than 삼겹살 with serious BBQ lovers. Better muscle-to-fat ratio, more complex flavor from multiple muscle groups. Slightly leaner than 삼겹살 but still incredibly juicy. Thicker cut, needs slightly longer cook time.':
      '豚首/カラー — 真剣なBBQ愛好家의間では삼겹살よりさらに人気があると言えるかもしれない。より良い근육対脂肪比率、複数의근육그룹からの複雑な風味。삼겹살より若干赤身だが依然として驚くほどジューシー。厚めのカットで少し長い調理時間が必要。',
    'Pork King #2': '豚BBQ第2位',
    'Pork · Pork Jowl · Prized Special Cut': '豚肉 · 豚頬肉 · 珍重される特殊部위',
    'Pork cheek/jowl — the muscle below the neck and above the shoulder. Fine-grained texture, beautifully marbled, with a melt-in-mouth quality when properly grilled. Only a small amount per pig, making it a premium "special cut" (특수부위). Highly sought at upscale 삼겹살집.':
      '豚의頬/ジョール — 首の下で肩の上의근육。細かい繊維、美しいマーブリング、제대로焼くと口でとろける食感。1頭からわずかしか取れないためプレミアムな「特殊部위」（특수부위）とされる。高級삼겹살집で非常에珍重される。',
    '특수부위 Premium': '特殊部위プレミアム',
    'Pork · Boston Butt Shoulder · Juicy': '豚肉 · ボストンバット肩 · ジューシー',
    'From the Boston butt (shoulder cap) area — intensely marbled, juicy, and slightly chewier than 항정살. The fat runs through the muscle in fine threads, creating incredible moisture when grilled. Less well-known than 삼겹살 or 목살, but considered superior by BBQ specialists.':
      'ボストンバット（肩キャップ）部위から — 강렬なマーブリング・ジューシー・항정살より若干噛みごたえあり。脂肪が細い실状에근육을走り、焼いた時에놀라운水分を生み出す。삼겹살や목살ほど知られていないが、BBQスペシャリストには優れた部位とされる。',
    'Pork · Outer Diaphragm · 갈매기 = Seagull': '豚肉 · 外横隔膜 · 갈매기 = カモメ',
    'The outer diaphragm muscle — named for its shape resembling a seagull (갈매기). Extremely tender despite being a working muscle, with an excellent fat-to-meat ratio. A special cut unavailable at most restaurants. Reserved for places specializing in 특수부위 (special cuts).':
      '外横隔膜의근육 — カモメ（갈매기）에似た形から命名。働く근육임에도불구하고극めて柔らか、優れた脂肪対근육比率。ほとんどのレストランでは入手できない特殊部位専門店でしか食べられない。',
    'Diaphragm': '横隔膜',
    'Pork · 5-Layer Belly (with Skin) · Jeju Specialty': '豚肉 · 5層バラ（皮付き）· 済州島名物',
    '오 (5) 겹 (layers) 살 — pork belly WITH the skin still attached, giving a 5th layer. The skin becomes incredibly crispy when grilled. A Jeju Island (제주도) specialty where 흑돼지 (black pig) ogyeopsal is a regional pride. The skin crunch is the entire point.':
      '오（5）겹（層）살 — 皮がまだ付いた豚バラで5層目を作る。焼くと皮が驚くほどカリカリに。흑돼지（黒豚）오겹살が地域의誇りである제주도（済州島）의名物。皮のカリカリ感がすべて。',
    'Jeju Specialty': '済州島名物',
    'With Skin': '皮付き',
    'Pork · Back Ribs · Smoked or Grilled': '豚肉 · バックリブ · スモークまたはグリル',
    'Pork back ribs — the Korean equivalent of baby back ribs. Often marinated in soy-garlic or gochujang, then grilled until caramelized. Different from 양념돼지갈비 in that these are cut individually rather than butterflied. Rich and succulent with good pull-from-bone texture.':
      '豚バックリブ — 베이비백립의韓국版。醤油ニンニクまたはコチュジャンでマリネしてキャラメライズされるまで焼くことが多い。バタフライではなく個別にカットされる点で양념돼지갈비とは異なる。濃厚でジューシーな骨からの剥がれやすい食感。',
    'Back Ribs': 'バックリブ',
    'Grill or Smoke': 'グリルまたはスモーク',
    'Pork · Marinated Pork Ribs · Sweet-Spicy': '豚肉 · マリネ豚リブ · 甘辛',
    'Butterflied pork rib meat marinated in sweet-spicy gochujang sauce. A crowd-pleasing BBQ staple — affordable, flavorful, and accessible. Available everywhere from street stalls to restaurants. The sauce caramelizes beautifully on a hot grill. A perfect entry-level Korean BBQ experience.':
      '甘辛コチュジャンソースでマリネしたバタフライ豚リブ肉。手頃で風味豊か、万人受けするBBQの定番 — 路上屋台からレストランまでどこでも入手可能。熱いグリルでソースが美しくキャラメライズされる。完璧な入門レベルの韓국BBQ체験。',
    'Crowd Pleaser': '万人受け',
    'Pork · Pork Skin · Daejeon Specialty': '豚肉 · 豚皮 · 大田名物',
    'Pork skin (껍데기 = shell/skin) grilled until shatteringly crispy. A Daejeon (대전) regional specialty — strips of pork skin cooked on a flat griddle until blackened and crunchy, then eaten with scallion salad (파절이) and raw garlic. Textural thrill — absolutely zero meat, pure collagen-fat crunch.':
      '豚皮（껍데기＝殻/皮）がバリバリにカリカリになるまで焼く。대전（大田）의地域名物 — 豚皮ストリップをフラットグリドルで黒くなってカリカリになるまで調理し、파절이（ねぎサラダ）와生ニンニクで食べる。食感의スリル — 肉は完全にゼロ、純粋なコラーゲン脂肪のカリカリ。',
    'Daejeon': '大田（대전）',
    'Pork Skin': '豚皮',
    'All Crunch': '全部カリカリ',
    'Jeju Black Pig · Premium Pork': '済州黒豚 · プレミアム豚肉',
    'Jeju Island\'s famous black pig breed — raised on a diet that historically included fermented grain and roots. The meat is darker, more intensely flavored, and firmer than standard pork. The 흑돼지 삼겹살 and 오겹살 in Jeju are considered among the best pork experiences in Korea.':
      '済州島의有名な黒豚品種 — 歴史的に発酵穀물과뿌리를포함する食事で育てられた。標準的な豚肉より色が濃く、강렬에풍미豊かで締まっている。済州의흑돼지삼겹살와오겹살는韓국で最高의豚肉体험のひとつとされる。',
    'Black Pig': '黒豚',
    'Pork · Large Intestine · Daegu Specialty': '豚肉 · 大腸 · 大邱名物',
    'Pork large intestine — a Daegu (대구) specialty. Thick-walled, chewy intestine cleaned and grilled over charcoal. Served with dipping sauce and scallion salad. An acquired taste for many but beloved by regulars. The texture is uniquely bouncy and substantial. The 막창골목 (Makchang Street) in Daegu is legendary.':
      '豚의大腸 — 대구（大邱）의地域名物。厚い壁のもちもちした腸を洗浄して炭火で焼く。ディップソースとパジョリと共에提供。多くの人에習慣が必要な味だが常連には愛される。食감が독특에弾力있고ボリュームがある。大邱의막창골목は伝説的。',
    'Acquired Taste': '習慣が必要な味',
    // chicken BBQ section
    'Chicken (닭고기) at Korean BBQ ranges from charcoal-grilled dakgalbi to specialty cuts like gizzards and skin. Chicken BBQ is popular as bar food (안주) and at 포장마차 street stalls.':
      '韓국BBQの닭고기は炭火닭갈비から모래집・皮などの特殊部위まで幅広い。チキンBBQはバーの食事（안주）や포장마차（屋台）で人기가高い。',
    'Chicken · Charcoal Chicken Ribs · Chuncheon': '鶏肉 · 炭火鶏リブ · 춘천',
    'Charcoal (숯불) grilled version of 닭갈비 — chicken rib meat grilled over live charcoal rather than on a flat griddle. Smokier, more caramelized, with char marks. A Chuncheon (춘천) tradition elevated by charcoal fire. The smoke flavor penetrates the spicy marinade uniquely.':
      '炭火（숯불）焼き版の닭갈비 — フラットグリドルでなく生きた炭火で鶏リブ肉을焼く。よりスモーキーでキャラメライズされ焼き目がつく。炭火で格上げされた춘천의伝統。スモークの풍미がスパイシーなマリネに독특에浸透する。',
    'Chicken · Chicken Neck · Unique Texture': '鶏肉 · 鶏首肉 · 독특の食感',
    'Chicken neck meat — very small, tender morsels with lots of collagen from the bone structure. Often marinated and grilled on skewers. Gelatinous quality when cooked slowly; firm and juicy when grilled quickly. Popular at 포장마차 street stalls and izakaya-style bars.':
      '鶏의首肉 — 骨의構造からコラーゲンが豊富な非常에小さくて柔らかい一口サイズ。マリネして串에刺して焼くことが多い。포장마차와이자카야スタイルのバーで人気。',
    'Neck Meat': '首肉',
    'Bar Food': 'バーフード',
    'Chicken · Special Cuts (Hearts, Gizzards)': '鶏肉 · 특수부위（心臓・砂肝）',
    'Chicken special parts (특수부위) — hearts (닭염통), gizzards (닭모래집), liver (닭간), and skin (닭껍질). Each has a different texture and flavor profile. Grilled quickly over high heat. Popular at 호프집 (beer halls) as anju (안주 — food eaten with alcohol).':
      '鶏의특수부위 — 닭염통（心臓）・닭모래집（砂肝）・닭간（肝臓）・닭껍질（皮）。それぞれ異なる食감と風味プロファイル。高温で素早く焼く。호프집（ビアホール）でアンジュ（안주）として人기。',
    'Beer Food': 'ビールのお供',
    'Chicken · Chicken Wings · Grilled or Glazed': '鶏肉 · 手羽 · グリルまたはグレーズ',
    'Chicken wings — grilled plain or with sauce. Unlike American-style wings, Korean BBQ wings are often marinated in soy-garlic or gochujang before grilling over charcoal, giving a caramelized exterior. Eaten with beer and pickled radish. One of the most casual BBQ experiences.':
      '手羽先 — プレーンまたはソースをつけて焼く。アメリカスタイルの手羽와異なり、韓국BBQの手羽は炭火で焼く前에醤油ニンニクまたはコチュジャンでマリネし、キャラメライズされた外皮に仕上げる。ビールとピクルス大根と共에食べる。最もカジュアルなBBQ体験のひとつ。',
    'Wings': '手羽',
    'Casual BBQ': 'カジュアルBBQ',
    'Chicken · Chicken Feet · Extreme Spicy': '鶏肉 · 鶏足 · 超激辛',
    'Chicken feet — braised in an extremely spicy gochujang sauce until the skin is gelatinous and sticky. An acquired taste for foreigners but a beloved late-night snack for Koreans. The eating process is ritualistic: suck the collagen off each tiny bone. A rite of passage in Korean food culture.':
      '鶏足 — 皮がゼラチン状でネバネバになるまで超激辛コチュジャンソースで煮込む。外국人에는習慣が必要な味だが韓국人에는愛される야식。食べ方が儀式的：小さな骨一本ずつからコラーゲンを吸い取る。韓국식文化의通過儀礼。',
    'Rite of Passage': '通過儀礼',
    'Chicken · Grilled Chicken Skin · Crispy': '鶏肉 · 焼き鶏皮 · カリカリ',
    'Pure chicken skin grilled until the fat renders and the skin becomes crackling-crispy. Extremely indulgent — the rendered chicken fat creates intense flavor. A bar food staple. Seasoned with salt, or marinated in soy-garlic. The Japanese yakitori (야키토리) culture influenced this Korean version.':
      '脂肪が溶けて皮がパリパリのカリカリになるまで焼いた純粋な鶏皮。非常에贅沢 — 溶けた鶏의脂肪が강렬な풍미를生み出す。바푸드의定番。塩で味付けするか醤油ニンニクでマリネ。日本의야키토리文化がこの韓국版에影響を与えた。',
    'Chicken Skin': '鶏皮',
    // duck section
    'Duck (오리고기) is a popular BBQ protein in Korea — fattier and more intensely flavored than chicken. Paired with scallion salad (파무침) and doenjang, it creates one of Korean BBQ\'s most satisfying combinations. Often also available smoked (훈제오리) at supermarkets.':
      '鴨（오리고기）は韓国で人기のBBQタンパク质 — 鶏より脂肪が多く강렬에풍미豊か。파무침（ねぎサラダ）와된장とペアリングすると韓국BBQ最高의組み합わせのひとつになる。スーパーマーケットでは훈제오리（スモークダック）としても入手可能なことが多い。',
    'Duck · Duck Breast · Rich &amp; Gamey': '鴨肉 · 鴨胸肉 · 濃厚でゲーム感',
    'Sliced duck breast — the most common duck BBQ cut. Richer and more flavorful than chicken, with a distinctive gamey character that pairs beautifully with scallion salad (파무침). The fat on duck breast crisps dramatically when grilled. Often served with green onion and doenjang dipping sauce.':
      'スライス鴨胸肉 — 最もよく見られる鴨BBQの部위。鶏より濃厚で풍미豊か、파무침와美しくペアリングする독특のジビエキャラクター。鴨胸肉의脂肪は焼くと劇的にカリカリになる。ねぎと된장ディップソースと共에提供されることが多い。',
    'Most Common Duck': '最もよく見られる鴨',
    'Rich Flavor': '濃厚な風味',
    'Duck · Marinated Duck · 주물럭 = Rubbed': '鴨肉 · マリネ鴨 · 주물럭 = こすり込んだ',
    '주물럭 means "rubbed by hand" — duck pieces marinated by hand-massaging with soy sauce, garlic, ginger, and sesame. The hand-rubbing technique ensures even coating and better penetration. Grilled over charcoal or stir-fried on a flat grill with onions and peppers.':
      '주물럭は「手でこすり込む」를意味する — 醤油・ニンニク・生姜・ごまを手でマッサージするようにマリネした鴨。手こすり技法が균일なコーティングとより良い浸透を保証する。炭火で焼くか玉ねぎとピーマンと共에フラットグリルで炒める。',
    'Hand-Marinated': '手マリネ',
    'Savory-Spicy': '旨辛',
    'Duck · Smoked Duck · Ready-to-Eat': '鴨肉 · スモークダック · すぐ食べられる',
    'Cold-smoked duck — available pre-cooked at supermarkets and 반찬집 (side dish shops). Sliced thinly and served with scallion sauce. Can be briefly heated on a grill. One of Korea\'s most popular supermarket ready-to-eat proteins. The smokiness complements scallion and sesame beautifully.':
      '冷燻製의鴨肉 — スーパーマーケットと반찬집（おかず専門店）で調理済みで購入可能。薄くスライスしてねぎソースと共에提供。グリルで少し温めることも可능。韓국で最も人기のスーパーマーケットのすぐ食べられるタンパク질のひとつ。燻製感がねぎとごまと美しくマッチ。',
    'Supermarket Staple': 'スーパーの定番',
    'Duck · Whole Duck Stew · Group Style': '鴨肉 · 丸鴨シチュー · グループスタイル',
    'Whole duck (한마리 = one whole bird) slow-cooked in an herbal broth with 한약재 (Korean herbal medicine ingredients). More of a stew experience than BBQ — the duck is cooked until fall-off-the-bone. A communal dish shared by 3–4 people. Considered restorative and healthy.':
      '한약재（한방薬の食材）の入ったハーブスープでゆっくり煮込んだ丸鴨（한마리＝丸々一羽）。BBQよりシチューの체험에近い — 骨からはらりと落ちるまで鴨を煮込む。3〜4人で共有する공동料理。보양식とされる。',
    'Whole Duck': '丸鴨',
    'Herbal Stew': 'ハーブシチュー',
    'Duck · Duck Bulgogi · Sweet-Soy Marinated': '鴨肉 · 鴨불고기 · 甘醤油マリネ',
    'The bulgogi treatment applied to duck — thinly sliced duck in a sweet soy-garlic-sesame marinade, then stir-fried or grilled on a flat surface. Less common than beef 불고기 but increasingly popular for its richer flavor profile. Pairs well with perilla leaf and kimchi.':
      '불고기の調理法을鴨에適用 — 甘い醤油ニンニクごまのマリネに漬けた薄切り鴨을炒めるまたはフラットサーフェスで焼く。牛불고기より少なく見られるが、より豊かな풍미프로파일로人기上昇中。エゴマの葉とキムチとよく合う。',
    'Bulgogi Style': '불고기スタイル',
    'Sweet-Soy': '甘醤油',
    // offal section
    'Korean BBQ culture has a rich offal tradition — nothing is wasted. Each of these cuts has its own specialist restaurants and devoted following.':
      '韓국BBQ文화には豊かな내장（内臓）料理の伝統がある — 無駄にするものは何もない。これらの部위それぞれに専門店と忠실なファン層がある。',
    'Beef · Small Intestine · Most Popular Offal': '牛肉 · 小腸 · 最も人기の내장',
    'Beef small intestine — the most beloved Korean offal. Cleaned thoroughly, then grilled over charcoal until the fat inside renders and the outer wall becomes crispy. Eaten with scallion salad and doenjang. 홍대 (Hongdae) and 마포 (Mapo) in Seoul have entire streets dedicated to 곱창집.':
      '牛의小腸 — 韓국で最も愛される내장料理。完全에洗浄후、内部의脂肪が溶けて外壁がカリカリになるまで炭火で焼く。파절이와된장と共에食べる。ソウルの홍대와마포에는곱창집が立ち並ぶ거리がある。',
    'Most Loved Offal': '最も愛される내장',
    'Inner Fat Crispy': '内部脂肪カリカリ',
    'Beef · Large Intestine · Fat-Rich': '牛肉 · 大腸 · 脂肪豊富',
    'Beef large intestine — wider, thicker-walled, and with more interior fat than 곱창. The fat content is extreme — the inside is packed with white marbling. When grilled, the fat melts out and the walls crisp up. An incredibly indulgent offal experience reserved for those who love rich, fatty food.':
      '牛의大腸 — 곱창より幅広く壁が厚く、内부에더많은脂肪がある。脂肪함량は극めて高い。焼くと脂肪が溶け出し、壁がカリカリになる。リッチで脂肪豊かな食べ物을愛する人のための驚くほど贅沢な내장체험。',
    'Beef · Tripe/Stomach · Chewy': '牛肉 · トライプ/胃 · もちもち',
    'Beef tripe (stomach) — cleaned and sliced thin, then grilled until it develops a crispy exterior with a chewy, honeycomb interior. The texture is the entire experience — firm, bouncy, and deeply savory. A 곱창집 staple. Often served as a set with 곱창 and 대창.':
      '牛のトライプ（胃） — 清潔에して薄くスライスし、カリカリの外皮とハニカム状のもちもちした内部가생じるまで焼く。食감がすべての体험 — 締まっていて弾力있고深いコク。곱창집의定番。곱창와대창とセットで提供されることが多い。',
    'Tripe': 'トライプ',
    'Very Chewy': '超もちもち',
    'Beef · Book Tripe (Omasum) · Texture King': '牛肉 · オマスム（第三胃） · 食감의王',
    'The book tripe — multi-layered stomach section. Eaten raw (생 천엽) with sesame oil and salt dipping sauce, or briefly blanched. Uniquely crisp and clean in texture — the many layered folds are distinctive. A raw offal experience that\'s mild in flavor. Considered a delicacy at top offal restaurants.':
      'オマスム（第三胃） — 多層構造의胃의部分。ごま油塩つけソースで生（생천엽）으로食べるか、さっと湯がく。독특에パリパリでクリーンな食감 — 多層のひだが特징的。最高级의내장専門店では珍味とされる。',
    'Raw Option': '生で食べる',
    'Book Tripe': 'オマスム',
    'Beef · Heart · Dense &amp; Nutritious': '牛肉 · 心臓 · 密度があり栄養豊富',
    'Beef heart — cleaned, sliced thin, and grilled quickly over high heat. Dense, lean muscle with an intense beefy flavor and almost no fat. Nutritionally dense — high protein, iron, zinc. Korean traditional medicine (한의학) considers heart beneficial for 기 (qi) energy. Firm texture, strong flavor.':
      '牛의심장 — 洗浄して薄くスライスし、高温で素早く焼く。ほぼ脂肪なしの강렬な牛肉의풍미를持つ密度のある赤身근육。栄養密度が高く — 高タンパク질・鉄分・亜鉛。한의학では기（気）에良いとされる。締まった食감、強い風味。',
    'High Protein': '高タンパク질',
    // BBQ vocab
    'grilled meat (BBQ)': 'グリルした肉（バーベキュー）',
    'charcoal fire/charcoal grill': '炭火/炭火グリル',
    'leaf wrap for grilled meat': '焼き肉を包む葉',
    'fermented soybean paste for wrapping': '包み用の発酵된장ペースト',
    'pork belly (3 layers)': '豚バラ（3層）',
    'Korean native beef': '韓国재래牛',
    'special/premium cuts': '特殊/プレミアム部위',
    'marbling (fat distribution)': 'マーブリング（脂肪분布）',
    'to grill': '焼く',
    'it\'s well cooked / it\'s done': 'よく焼けた/できた',
    'flip it over': 'ひっくり返す',
    'cut it with scissors (standard Korean BBQ)': 'ハサミで切る（標準的な韓국BBQ）',
    'please change the grill plate': 'グリルプレートを変えてください',
    'let\'s have a glass of soju': 'ソジュを一杯飲もう',
    'more side dishes please (free refill)': 'おかずをもっとください（無料おかわり）',
    '📖 고기구이 어휘 · BBQ Vocabulary': '📖 고기구이 어휘 · BBQ語彙',
    '🥩 소고기 Beef Cuts': '🥩 소고기 牛肉의部위',
    '🐷 돼지고기 Pork Cuts': '🐷 돼지고기 豚肉의部위',
    '🍗 닭고기 Chicken Cuts': '🍗 닭고기 鶏肉의部위',
    '🦆 오리고기 Duck': '🦆 오리고기 鴨肉',
    '💜 내장 Offal &amp; Special Cuts': '💜 내장 내장・特殊部위',
    '5 cuts': '5部위',

    // ── kimchi.html ──────────────────────────────────────────────
    // hero paragraph
    '김치 is not just a dish — it\'s a 2,000-year-old living tradition, a fermentation science, a cultural symbol, and Korea\'s greatest culinary ambassador. With over 200 regional varieties, kimchi appears at every Korean table, every meal, every day. This is the guide to all of them.':
      '김치はただの料理ではない — 2,000年의生きた伝統、発酵의科学、文화의象징、そして韓国最大の料理大使だ。200種類以上の地域別バリエーションがあり、キムチは毎日韓国のすべての食卓에오른다。これがその全ガイドだ。',
    // gimjang tip-box body
    'Every November–December, Korean families gather to make 김장 — large batches of kimchi to last through winter. Neighbors and extended family help each other, working all day. UNESCO recognized 김장 as an Intangible Cultural Heritage of Humanity in 2013. It\'s not just food production — it\'s community bonding. The phrase "김장 담그다" (to make kimchi for the season) implies effort, togetherness, and preparation for the hard months ahead.':
      '毎年11〜12月、韓국の家族が集まって김장 — 冬を越すための大量のキムチを作る。近所や親戚が互いに助け合い、一日中作業する。ユネスコは2013年에김장을人類의無形文化遺産として認定した。食料생산だけでなく — コミュニティの絆だ。「김장 담그다」（シーズンのためにキムチを作る）という表現には努力・공동体의식・辛い季節へ의準備が담겨있다。',
    // vegetable section
    'Most vegetables can be made into kimchi — the process (salt-brining, rinsing, seasoning with gochugaru paste, fermenting) is the constant. What changes is the vegetable, the regional recipe, and the fermentation time.':
      'ほとんどの野菜でキムチを作れる — プロセス（塩漬け・水洗い・コチュカルペーストで味付け・発酵）は一定。変わるのは野菜의種류・地域のレシピ・発酵時間だ。',
    // vegetable cards
    'Napa Cabbage · THE Classic · 배추 = Napa Cabbage': '白菜 · ザ・クラシック · 배추 = 白菜',
    'The world\'s kimchi — napa cabbage salted, rinsed, and packed with a gochugaru-garlic-ginger-fish sauce paste then fermented. The standard against which all kimchi is measured. Eaten fresh (겉절이) or fermented for weeks, months, or even years (묵은지). Never just "kimchi" — always 배추김치 to Koreans.':
      '世界が知るあのキムチ — 白菜を塩漬けにして水洗いし、코추가루・ニンニク・生姜・魚醤のペーストで和えて発酵させる。すべてのキムチが比較される基準。新鮮（겉절이）でも数週間・数ヶ月・時に数年間発酵（묵은지）でも食べる。韓국人には決して단순히「キムチ」でなく、常에배추김치。',
    'Korean Radish Cubes · 깍두기 = Cubed': '韓국大根의角切り · 깍두기 = 角切り',
    'Daikon radish cut into 2cm cubes, seasoned with gochugaru and fermented. Crisp, crunchy, cooling — a perfect contrast to fatty or rich dishes. The cube shape creates a different fermentation dynamic than leafy kimchi. Classically served alongside 설렁탕 (beef broth soup).':
      '大根を2cmの角切りにし、コチュカルで味付けして発酵させる。パリパリでカリカリ、冷涼感がある — 脂っぽい料理や濃厚な料理との完璧なコントラスト。角切りの形が葉物キムチとは異なる発酵ダイナミクスを生み出す。설렁탕（牛肉スープ）と共에정통에提供される。',
    'Radish Cube': '大根의角切り',
    'Young Bachelor Radish · Whole Small Radish': '총각（ヌータリング）大根 · 丸ごと小型大根',
    'Whole small radish (총각무) with the green top attached — the green ponytail resembles a bachelor\'s (총각) traditional topknot hairstyle, hence the name. Spicy, crunchy, and intensely flavored. Both the radish and the greens are eaten. One of Korea\'s most beloved side kimchis.':
      '緑의葉を付けた丸ごとの총각무（小型大根） — 葉のポニーテールが총각（独身男）의伝統的な상투（まげ）에似ていることから命名。辛くてパリパリ、강렬な風味。大根も葉も両方食べる。韓국で最も愛されるサイドキムチのひとつ。',
    'Stuffed Cucumber Kimchi · 오이 = Cucumber': '詰め物キュウリキムチ · 오이 = キュウリ',
    'Cucumber (오이) scored lengthwise and stuffed with a paste of gochugaru, garlic, scallion, and buchu (chives). 소박이 means "stuffed." Light, crisp, and refreshing — ferments much faster than 배추김치 (ready in days, not weeks). A summer specialty loved for its hydrating crunch.':
      'キュウリ（오이）에縦に切り込みを入れ、コチュカル・ニンニク・ねぎ・부추（ニラ）のペーストを詰める。소박이は「詰め物」를意味する。軽くてパリパリ、清涼感がある — 배추김치より格段에早く発酵（数週間でなく数日で完成）。みずみずしいカリカリ感で愛される夏の名物。',
    'Stuffed': '詰め物',
    'Young Radish Greens · Summer Staple': '热む（若大根의葉）· 夏의定番',
    'Young radish (열무) — the leafy green tops of immature radishes. Lighter and more delicate than 총각김치. Often made as 물김치 (watery broth) style in summer. A classic base for 열무냉면 (cold noodle with young radish kimchi broth). Refreshing and slightly tangy.':
      '어린大根의葉部分열무。총각김치より軽くて繊細。夏には물김치スタイルでよく作る。열무냉면의クラシックなベースだ。清涼感があってほんのり酸っぱい。',
    'Mustard Leaf · 갓 = Mustard Greens · Yeosu': 'からし菜 · 갓 = からし菜 · 여수',
    'Mustard greens (갓) with a distinctive peppery, wasabi-like heat from the leaf itself. A Yeosu (여수) and Jeollanam-do (전라남도) specialty. The deep purple/green leaves with their sharp natural heat create a kimchi that\'s fiery in multiple dimensions — gochugaru AND mustard heat combined.':
      'からし菜（갓）固유のピリッとしたわさびのような辛さが葉自体から。여수와전라남도의名物。深い紫/緑의葉のシャープな自然의辛さが、コチュカル의辛さとからし菜의辛さが合わさった複数次元의辛いキムチを生み出す。',
    'Yeosu 여수': '여수（麗水）',
    'Spring Onion Kimchi · 쪽파 = Spring Onion': 'ねぎキムチ · 쪽파 = 小ねぎ',
    'Whole spring onions (쪽파) — not the thick 대파 (large green onion) — seasoned with gochugaru, garlic, fish sauce, and sesame. 쪽파 is thinner, sweeter, and more tender than 대파, making it ideal for kimchi: as it ferments, it softens into silky strands and develops a complex, slightly sweet pungency without the sharp bite of larger onions. A beloved banchan especially in the south (경상도, 전라도). Often eaten alongside 삼겹살 — the two were made for each other.':
      '太い대파（大きいねぎ）ではなく丸ごとの쪽파（小ねぎ） — コチュカル・ニンニク・魚醤・ごまで味付け。쪽파는대파より細くて甘く柔らかく、キムチに理想적：発酵するにつれシルクのような細糸에柔らかくなり、大きいねぎのシャープな辛さなしに複雑でほんのり甘い辛みが生まれる。特에南部（경상도・전라도）で愛されるおかず。삼겹살と一緒によく食べる。',
    'BBQ Pairing': 'BBQのペアリング',
    'Chinese Chive Kimchi · 부추 = Chives': '韓国ニラキムチ · 부추 = ニラ',
    'Chinese chives (부추) seasoned with gochugaru paste. The chive\'s natural sulfur flavor intensifies with fermentation. Often consumed for its supposed health benefits — traditional medicine claims 부추 strengthens 기 (qi) energy and is particularly good for men. A thinner, lighter kimchi with a grassy pungency.':
      '부추（韓국ニラ）をコチュカルペーストで味付け。ニラ固유의硫黄風味が発酵で강해진다。健康効果のために食べることが多い — 한방では부추가기（気）를強化し特에男性에好いとされる。草的な辛みのある細くて軽いキムチ。',
    'Health Food': '건강食品',
    'Perilla Leaf Kimchi · 깻잎 = Perilla': 'エゴマの葉キムチ · 깻잎 = エゴマの葉',
    'Perilla (sesame) leaves layered with a seasoning paste of soy sauce, gochugaru, garlic, and sesame seeds. Each leaf becomes infused with the seasoning. A beloved banchan — the aromatic perilla flavor is unmistakable. Sometimes marinated without fermentation as 깻잎나물 — but the fermented kimchi version is deeply savory.':
      '醤油・コチュカル・ニンニク・ごまの調味ペーストを重ねたエゴマ（ごま）의葉。葉一枚ずつに調味料が染み込む。愛されるおかず — アロマティックなエゴマ의풍미가比類なし。時에発酵なしで깻잎나물としてマリネされる — しかし発酵キムチ版は深くてコクがある。',
    'Aromatic': 'アロマティック',
    'Western Cabbage Kimchi · Budget Option': '西洋キャベツキムチ · 格安オプション',
    'Regular round cabbage (양배추) kimchi — not napa cabbage. More affordable and widely available year-round. The texture stays firmer longer than napa cabbage. Often made for everyday use when 배추 kimchi is running low. Slightly sweeter and crunchier than traditional baechu-kimchi.':
      '白菜でなく普通의丸いキャベツ（양배추）のキムチ。より安価で年間を通じて広く入手可能。白菜より食감が長く締まり続ける。배추김치가無くなりそうな時의日常使いによく作る。伝統的な배추김치より若干甘くカリカリ。',
    'Everyday Use': '日常使い',
    'Wild Chicory Root · Intensely Bitter': '野生チコリの根 · 강렬に苦い',
    'Made from wild chicory or hawksbeard (고들빼기) — one of the most intensely bitter kimchis. The bitterness is deliberately preserved and considered a delicacy. A traditional Jeolla Province (전라도) specialty — an acquired taste that regular kimchi lovers find surprisingly addictive. Very rare outside specialty markets.':
      '野生のチコリまたはノゲシ（고들빼기）で作る — 最も강렬에苦いキムチのひとつ。苦みは意図的에保持されて珍味とされる。전라도의传統名物 — 普通のキムチ愛好者가놀랍도록中毒になる習慣が必要な味。専門市場以外では非常에稀。',
    'Bitter': '苦い',
    'Jeolla 전라도': '전라도（全羅道）',
    'Rare': '希少',
    'Water Parsley Kimchi · 미나리 = Dropwort': '水セリキムチ · 미나리 = セリ',
    'Water parsley/dropwort (미나리) — a semi-aquatic herb with a fresh, slightly sharp flavor. Made famous internationally by the film "Minari" (2020). Lightly seasoned kimchi — the herb\'s natural freshness is the highlight. A spring seasonal kimchi, available when 미나리 is at its best.':
      '水세리/セリ（미나리） — 新鮮でほんのりシャープな風味의半水生ハーブ。2020年의영화「미나리（ミナリ）」で국際的에有名になった。軽く味付けされたキムチ — ハーブ固有의新鮮さがハイライト。미나리が最も新鮮な봄에限定의旬のキムチ。',
    'Spring Seasonal': '봄의旬',
    'Film "Minari"': '영화「ミナリ」',
    'Soybean Leaf Kimchi · 콩잎 = Soybean Leaf': '大豆の葉キムチ · 콩잎 = 大豆の葉',
    'Soybean leaves (콩잎) layered with soy sauce, gochugaru, garlic, and sesame seasoning. The leaves are large, sturdy, and deeply flavored — often eaten by wrapping a piece of rice inside the leaf. A provincial specialty, particularly in the Chungcheong (충청도) region. Earthy and robust.':
      '醤油・コチュカル・ニンニク・ごまの調味料を重ねた大豆의葉（콩잎）。葉が大きく丈夫で深い風味 — 葉にご飯を包んで食べることが多い。충청도（忠清道）地方의地方名物。アーシーでロバスト。',
    'Chungcheong': '충청도（忠清道）',
    'Fatsia / Aralia Shoot · Spring Delicacy': 'タラの芽 / アラリアの芽 · 봄의珍味',
    'Two릅 (두릅) are the young spring shoots of the aralia/fatsia plant — available only in early spring for a few weeks. Briefly blanched, then seasoned. A luxurious seasonal delicacy with a distinctive woody, forest-like fragrance. Considered one of the finest spring foods in Korean cuisine.':
      '두릅はタラノキ/ウコギ科의若い봄의芽 — 早봄의数週間しか出回らない。さっと湯がいてから味付け。独특な木的・森のような香りがある贅沢な旬의珍味。韓国料理で最高의봄の食べ物のひとつとされる。',
    'Seasonal Delicacy': '旬의珍味',
    'Bitter Chicory / Sow Thistle Kimchi': '苦いチコリ/オニタビラコのキムチ',
    '씀바귀 (bitter herb) kimchi — another intensely bitter wild herb kimchi. The bitterness signals high polyphenol content. Traditional Korean medicine considers 씀바귀 a 봄나물 (spring herb) that cleanses the body after winter. Bitter-forward, complex — an adult taste that grows on you.':
      '씀바귀（苦い野草）キムチ — もうひとつの강렬에苦い野草キムチ。苦みは高いポリフェノール함량를示す。한방では씀바귀를冬の後에体を清浄する봄나물（봄野草）とみなす。苦み前面、複雑 — 慣れると病みつきになる大人의味。',
    'Spring Herb': '봄野草',
    'Stonecrop / Sedum Kimchi · Spring': '石蓮花（돌나물）キムチ · 봄',
    'Stonecrop (돌나물) — a succulent spring herb that grows on rocks (돌 = rock). Crispy, slightly succulent texture with a light, fresh flavor. Often made as 물김치 (watery broth kimchi). A rare spring delicacy found in traditional markets — not commercially produced. Delicate and refreshing.':
      '돌나물（石蓮花） — 石（돌）의上에育つ多肉의봄野草。パリパリしてほんのり多肉질な食감에軽くて新鮮な風味。물김치スタイルでよく作る。伝統的な市場でしか見つからない希少な봄의珍味 — 市販されていない。繊細で清涼感がある。',
    // fermentation section
    'The same vegetable can become completely different kimchi depending on fermentation style — broth-based, fresh-cut, deeply aged, or water-light. These represent kimchi as a spectrum, not a fixed dish.':
      '同じ野菜でも발酵方法によって全く異なるキムチになる — スープベース・新鮮カット・深く숙성・水のように軽い。これらはキムチが固定された料理でなくスペクトラムであることを示す。',
    // fermentation cards
    'White Kimchi · No Gochugaru · Elegant': '白キムチ（백김치）· コチュカルなし · 優雅',
    '백 (white) kimchi — made without gochugaru (red pepper flakes). Seasoned with garlic, ginger, scallion, and sometimes pear or jujube. Pale, clean, refreshing, and mild. Popular with children, elders, and people who cannot eat spicy food. Also served at formal Korean ceremonies and royal court cuisine.':
      '백（白）キムチ — コチュカル（赤唐辛子フレーク）なしで作る。ニンニク・生姜・ねぎ、時에梨やなつめで味付け。淡くてクリーン、清涼感があってマイルド。子ども・老人・辛い食べ물이食べられない人에人기。フォーマルな韓국의儀式や宮廷料理でも供される。',
    'No Heat · White': '辛さなし · 白',
    'Royal Court Style': '宮廷スタイル',
    'Water Kimchi · 물 = Water · Broth-Based': '水キムチ · 물 = 水 · スープベース',
    'Vegetables (usually radish or napa cabbage) fermented in a lightly seasoned, mildly spiced broth. Refreshing and cooling — the broth is as valued as the vegetables. Served cold, particularly popular in summer. A gentler alternative to 배추김치. The brine is sometimes used as a digestive drink.':
      '軽く味付けされたマイルドなスープで発酵させた野菜（通常は大根または白菜）。清涼感があって涼しい — スープが野菜와同等에大切にされる。冷たく提供され、特에夏에人기。배추김치のよりやさしい代替。塩水は時에消化ドリンクとして飲まれる。',
    'Broth-Based': 'スープベース',
    'Winter Radish Water Kimchi · 동 = Winter': '冬の大根水キムチ · 동 = 冬',
    'The quintessential winter kimchi — whole or large-cut radish in a cold, clear, lightly salty brine with ginger. 동 means "winter" — made in late fall, consumed through winter. The broth becomes naturally carbonated and refreshingly tart over weeks. Used as the base broth for 동치미냉면 (cold noodle). A Korean culinary treasure.':
      'quintessential의冬のキムチ — 生姜入りの冷たくてクリアな薄い塩水에丸ごとまたは大ぶりにカットした大根。동은「冬」를意味する — 晩秋에作り冬中食べる。数週間で自然に炭酸感가생겨ほんのり酸っぱく清涼感가생긴다。동치미냉면의ベーススープとして使용。韓국의料理의보물。',
    'Winter Classic': '冬의定番',
    'Cold Noodle Base': '冷麺のベース',
    'Aged Kimchi · 1–3 Years Old · Deeply Sour': '숙성キムチ · 1〜3年もの · 深く酸っぱい',
    '묵은 = old/aged. Kimchi fermented for 1–3+ years. Deeply sour, complex, and intense — the lactobacillus flavor profile completely transforms the original. Used in cooking: 묵은지 김치찌개 (kimchi stew) and 묵은지 김치찜 (braised kimchi) are considered superior. A probiotic powerhouse.':
      '묵은＝古い/숙성된。1〜3年以上発酵させたキムチ。深く酸っぱく、複雑で강렬 — 乳酸菌のフレーバープロファイルが元のキムチを完全에変える。料理에使용：묵은지김치찌개와묵은지김치찜은優れているとされる。プロバイオティクスの宝庫。',
    'Aged 1–3 Years': '숙성1〜3年',
    'Cooking Kimchi': '料理用キムチ',
    'Fresh Kimchi · Unfermented · Immediate': '新鮮キムチ · 発酵なし · すぐ食べる',
    '겉 = outside/surface. Kimchi seasoned and eaten immediately — no fermentation. The freshest possible kimchi experience: bright, crunchy, with raw garlic punch and fresh gochugaru heat. Often made tableside at Korean restaurants. The antithesis of aged kimchi — where 묵은지 is wine, 겉절이 is grape juice.':
      '겉＝外/表面。味付けして即座に食べるキムチ — 発酵なし。最も新鮮なキムチ체험：鮮明でカリカリ、生ニンニクのパンチと新鮮なコチュカルの辛さ。韓국のレストランでテーブルサイドで作られることが多い。숙성키므치의反対 — 묵은지がワインなら、겉절이는葡萄ジュース。',
    'No Fermentation': '発酵なし',
    'Thin-Sliced Mixed Kimchi · Water-Based': '薄切りミックスキムチ · 水ベース',
    'Thin slices of radish and napa cabbage in a light, spiced broth. 나박 refers to the thin-cutting technique. Pink-tinted from minimal gochugaru. A Royal Court kimchi — traditionally served at the Joseon royal palace. Delicate, clean, and visually elegant. Now widely available at traditional Korean restaurants.':
      '軽くスパイスのきいたスープに入った大根と白菜の薄切り。나박은薄切り技法을指す。最小限のコチュカルでほんのりピンク色。朝鮮王宮で伝統的에提供された宮廷キムチ。繊細でクリーン、視覚的에も優雅。今は伝統韓国レストランで広く入手可能。',
    'Royal Court': '宮廷',
    'Winter Kimchi · Annual Batch · Family Event': '冬のキムチ · 年一度의仕込み · 家族イベント',
    'The kimchi made during 김장 season (late November) — a full year\'s supply prepared in one massive community effort. Traditionally buried in 독 (earthenware pots) underground to maintain cold temperature through winter. The ultimate form of 배추김치. UNESCO-recognized alongside the making tradition itself.':
      '김장시즌（11月末）에담근キムチ — 大規모な공동作業で一度に一年分を準備する。伝統的에독（항아리）에入れて冬中冷たさを保つために土中에埋めた。배추김치의究極의形。作る伝統自体と共にユネスコ認定。',
    'Winter Batch': '冬의仕込み',
    'Community': 'コミュニティ',
    'Mixed Kimchi · Multiple Vegetables Together': 'ミックスキムチ · 複数の野菜を一緒に',
    '섞 = mixed. A kimchi made from multiple vegetables together — radish, cabbage, cucumber, and green onion all fermented in the same batch. Regional recipes vary widely. The mixed fermentation creates a complex, layered flavor that single-vegetable kimchi cannot achieve. Popular in the Gyeonggi (경기도) region.':
      '섞＝混ぜた。大根・キャベツ・キュウリ・ねぎを一緒에同じバッチで発酵させた複数の野菜のキムチ。地域のレシピが大きく異なる。混合発酵が単一野菜キムチでは得られない複雑で層状의풍미を生み出す。경기도（京畿道）地方で人기。',
    'Mixed Vegetables': '複数の野菜',
    'Dried Radish Strip Kimchi · Chewy Texture': '乾燥大根ストリップキムチ · もちもち食感',
    'Radish cut into thin strips and sun-dried (말리다 = to dry) before being seasoned and fermented. The drying concentrates the radish flavor and creates an intensely chewy, almost jerky-like texture. Sweet, spicy, and complex — completely different from fresh radish kimchi. A pantry kimchi that keeps for months.':
      '大根を細いストリップに切って天日干し（말리다＝乾かす）してから味付けして発酵。乾燥が大根의풍미를濃縮してジャーキーのような강렬にもちもちした食感を作り出す。甘くて辛くて複雑 — 新鮮な大根키므치とは全く異なる食べ物。数ヶ月保存できるパントリーキムチ。',
    'Dried · Chewy': '乾燥 · もちもち',
    'Long-Lasting': '長持ち',
    'Turnip Kimchi · Ganghwa Island Specialty': 'カブキムチ · 강화도名物',
    'Ganghwa Island (강화도) specialty — made from the local 강화순무 (Ganghwa turnip), a purple-skinned vegetable with a distinctive earthy sweetness. The kimchi ferments to a deep magenta-purple color, dramatically beautiful. A regional heritage variety with a flavor profile unlike any other Korean kimchi.':
      '강화도（江華島）の名物 — 독특なアーシーな甘みのある紫色의강화순무（江華カブ）で作る。発酵すると深いマゼンタ紫色になり視覚的에圧倒的에美しい。他のどの韓国キムチとも異なる풍미プロファイルを持つ地域の伝統品種。',
    'Ganghwa 강화도': '강화도（江華島）',
    'Purple Color': '紫色',
    // kimchi in cooking section
    'Kimchi is not only eaten as a side dish — it\'s a fundamental cooking ingredient, transforming other dishes with its fermented acidity, umami, and spice.':
      'キムチはおかずとして食べるだけでなく — 발酵された酸味・うまみ・辛さで他の料理를変える根本的な調理食材だ。',
    // cooking dishes
    'Pork Kimchi Stew · The Original · Korea\'s Most Eaten': '豚肉キムチチゲ · 元祖 · 韓국で最も食べられる',
    'The canonical kimchi-jjigae — pork belly or shoulder simmered with aged kimchi (묵은지), tofu, and anchovy broth in an earthenware 뚝배기. The pork fat enriches the kimchi broth into something far greater than the sum of its parts. Best made with kimchi fermented at least 2 months. Korea\'s most frequently eaten home-cooked dish — a permanent fixture on every 한정식 (set meal) and restaurant menu nationwide.':
      '正統のキムチチゲ — 三枚肉または肩ロースを묵은지・豆腐・いりこだしと뚝배기（土鍋）で煮込む。豚肉의脂肪がキムチスープを材料의합계をはるかに超えるものに豊かにする。最低2ヶ月発酵したキムチで作るのが最高。韓국で最も頻繁에食べられる家庭料理 — 全国의한정식와레스토랑메뉴에必ず掲載される。',
    'Korea\'s Most Eaten': '韓국最多消費',
    '묵은지 Preferred': '묵은지推奨',
    'Canned Tuna Kimchi Stew · Pantry Version': '缶詰ツナキムチチゲ · パントリー版',
    'Canned tuna (참치 통조림) replaces pork — the most pantry-friendly kimchi-jjigae. Pour the tuna\'s oil directly into the pot: it adds a marine richness that surprisingly complements kimchi\'s fermented acidity. Faster than the 돼지고기 version, no prep required beyond opening a can. The go-to for Korean military bases (군대), dormitories, and solo apartments worldwide. The 동원 chamchi can was practically designed for this purpose.':
      '缶詰ツナ（참치통조림）が豚肉에代わる — 最もパントリーフレンドリーなキムチチゲ。ツナの油をそのまま鍋에注ぐ：驚くほどキムチ의発酵酸味를補う海の濃厚さが加わる。돼지고기版より早く、缶を開ける以外에準備不要。世界中의韓국군대・寮・一人暮らしのアパートの定番。동원의참치缶は事実上이目的のために設計された。',
    'Canned Tuna': '缶詰ツナ',
    'Pantry-Friendly': 'パントリーフレンドリー',
    'Pacific Saury Kimchi Stew · 묵은지 Magic': 'サンマキムチチゲ · 묵은지의魔法',
    'Canned Pacific saury (꽁치 통조림) in kimchi stew — the boldest, most intensely flavored of the three variants. 꽁치 is an oily, pungent fish whose strong maritime character can overwhelm if paired incorrectly. This is where 묵은지 earns its magic: the deep aged sourness cuts directly through the fish oil and smell, transforming the combination into a complex, umami-layered stew that neither ingredient could achieve alone. Using fresh kimchi here produces a flat, fishy result — 묵은지 is absolutely non-negotiable.':
      '缶詰サンマ（꽁치통조림）のキムチチゲ — 3種中最も大胆で강렬에풍미豊か。꽁치은油っぽくて풍미강한魚で、ペアリングを間違えると압倒的になる。まさにここで묵은지が魔法를발揮する：深く熟成された酸味が魚의油臭さを正面からカットし、どちらの食材単独では到底実現できない複雑でうまみが層をなすチゲに変える。ここで新鮮なキムチを使うと平板で生선臭い結果になる — 묵은지는절대에必須。',
    '묵은지 Only': '묵은지のみ',
    'Canned Saury': '缶詰サンマ',
    'Kimchi Fried Rice · 1-Pan Comfort': 'キムチチャーハン · 一鍋コンフォート',
    'Leftover rice stir-fried with chopped kimchi, sesame oil, and pork belly or SPAM. Topped with a fried egg. The simplest, most satisfying Korean meal — ready in 5 minutes. The kimchi must be aged (익은 김치) to develop the deep, savory, caramelized flavor. A cultural staple of Korean bachelor living.':
      '残りご飯を刻んだキムチ・ごま油・삼겹살またはスパムと炒める。目玉焼きをトッピング。5분으로完成する最もシンプルで満足できる韓국料理。キムチは익은김치（熟成）でないと深くてコクのあるキャラメライズされた풍미가出ない。韓국의一人暮らし文化의定番。',
    '5-Minute Meal': '5分料理',
    'Kimchi Pancake · Rainy Day Food': 'キムチのチヂミ · 雨の日의食べ物',
    'Kimchi mixed into a flour batter and pan-fried into a thick, crispy-edged savory pancake. The most iconic "rainy day food" (비 오는 날 음식) in Korea — on rainy days, Korean food delivery apps are flooded with 전 orders. Served with a soy-vinegar dipping sauce. Best eaten fresh off the pan, sizzling hot.':
      'キムチを小麦粉の衣에混ぜてパリパリの縁のある厚いセイボリーパンケーキに焼く。韓국で最もアイコニックな「雨の日의食べ물」（비오는날음식） — 雨의日은韓국의배달앱에전의注문가폭주한다。醤油酢のディップソースと共에提供。フライパンから出来立てのジュージューな時が最高。',
    'Rainy Day Food': '雨の日의食べ物',
    'Braised Kimchi with Pork · Celebration Dish': '豚肉煮込みキムチ · 祝い料理',
    'Aged kimchi slowly braised with thick pork belly until both the kimchi and the pork become meltingly tender. Unlike 김치찌개 (quick simmer), 김치찜 requires hours of low cooking — the kimchi loses its raw acidity and develops a sweet, concentrated, jammy depth. Often served at Korean celebrations.':
      '묵은지와厚めの삼겹살을数時間저온でゆっくり煮込む。김치찌개（素早く煮る）와異なり김치찜는長時間의저온調理が必要 — キムチの生の酸味が消えて甘く濃縮された깊이が生まれる。韓国의경사스러운자리에자주提供される。',
    'Slow-Braised': 'ゆっくり煮込む',
    'Kimchi-enhanced Instant Noodle': 'キムチ강화インスタント麺',
    'Adding kimchi to instant ramyeon — one of Korea\'s universal hacks. The kimchi acidity brightens the broth, adds fermented depth, and creates an entirely different eating experience. Koreans who find regular ramyeon too simple almost always add kimchi. With aged kimchi, the result is significantly more complex than anything in a packet.':
      'インスタントラーメンにキムチを加える — 韓国의普遍的なハック。キムチの酸味がスープを明るくし、発酵의깊이를加えて全く異なる食체험を生み出す。普通のラーメンがシンプルすぎると感じる韓국人는거의常えキムチを追加する。묵은지로作ると봉지라면의何倍も複雑な結果になる。',
    'Universal Hack': '普遍的なハック',
    'Korean-Mexican Fusion · Roy Choi · LA': '韓国-メキシコフュージョン · ロイ・チョイ · LA',
    'The dish that started the Korean-Mexican food truck revolution in Los Angeles — Roy Choi\'s 코기 BBQ food truck (2008) put Korean short rib beef with kimchi slaw in a Mexican tortilla. Became a global food trend. Now symbolic of Korean food\'s adaptability and its role in the American culinary conversation.':
      'ロサンゼルスで韓国-メキシコフュージョンフードトラック革命을起こした料理 — ロイ・チョイの코기BBQフードトラック（2008年）が韓国のカルビ牛肉とキムチスローをメキシコのトルティーヤに入れた。グローバルな食のトレンドになった。今や韓국食의適応性와미국의料理의会話の中での役割의象징。',
    'Fusion Revolution': 'フュージョン革命',
    'LA Food Truck': 'LAフードトラック',
    'Cold Kimchi Brine Noodles · Summer Dish': 'キムチ塩水의冷たい麺 · 夏料理',
    'Thin somyeon (소면) noodles served in ice-cold 물김치 brine or diluted kimchi liquid. 말이 means "rolled into" — the noodles are twirled into the chilled kimchi broth. Crunchy cucumber slices, radish, and a halved hard-boiled egg alongside. The kimchi brine acts as the soup base: tangy, lightly spicy, and deeply refreshing. A summer cooling dish with zero cooking required beyond boiling the noodles — the brine does all the flavor work.':
      '氷のように冷たい물김치의塩水または희석したキムチ液에入った細い소면（素麺）。말이는「말아넣다」를意味する — 麺を冷たいキムチスープにくるりと入れる。カリカリのキュウリスライス・大根・半分에切った固茹で卵を添える。キムチの塩水がスープベースとして機능：酸っぱくてほんのり辛くて깊이清涼感がある。麺を茹でる以外에料理ゼロの夏の冷却料理 — 塩水がすべての풍미をこなす。',
    'Mild-Tangy': '弱酸',
    'Cold Noodle': '冷たい麺',
    'Stir-Fried Kimchi · The Universal Banchan': '炒めキムチ · 万能おかず',
    'Overly sour kimchi — too acidic to eat raw — sliced and stir-fried in sesame oil with pork belly strips, a pinch of sugar, and sesame seeds until caramelized and glossy. Heat transforms fermented acidity into something sweet, jammy, and deeply savory. The ultimate banchan for any meal: goes with rice, noodles, tofu, grilled meat. Every Korean household makes this when kimchi crosses the line into "too old to eat as-is." Also the base layer for 김치볶음밥.':
      'そのまま食べるには酸っぱすぎるキムチをスライスしてごま油・삼겹살スライス・砂糖少量・ごまでキャラメライズされてつやが出るまで炒める。熱が발酵の酸味を甘くてジャム状의深いコクに変える。どんな料理にも合う究極のおかず：ご飯・麺・豆腐・焼き肉に。すべての韓국家庭がキムチが「そのまま食べるには古すぎる」ラインを越えた時에作る。김치볶음밥のベースレイヤーにもなる。',
    'Caramelized': 'キャラメライズ',
    'Universal Banchan': '万能おかず',
    'Tofu & Stir-Fried Kimchi · Classic Bar Food': '豆腐と炒めキムチ · クラシックバーフード',
    'Cool sliced soft tofu (두부) plated alongside hot, glistening 볶음김치. The temperature and texture contrast is the entire dish: cold-creamy tofu meets hot-spicy-caramelized kimchi. An iconic Korean bar food (안주) — the go-to at 호프집 (beer pubs) and 막걸리 bars. Simple to prepare, endlessly satisfying. Sometimes the tofu is briefly pan-fried for a crisp outside, producing a different texture contrast. The pairing works because tofu\'s mild neutrality makes the kimchi\'s flavor pop harder.':
      '냉たく스라이스した柔らかい두부（豆腐）를熱く輝く볶음김치와함께盛り付ける。温度와食感のコントラストがこの料理のすべて：冷たくクリーミーな豆腐が熱く辛くキャラメライズされたキムチに出会う。アイコニックな韓国의바푸드（안주） — 호프집（ビアパブ）와막걸리バーの定番。準備が簡単で飽きのこない満足感。豆腐의마일드한中립性がキムチの풍미를より引き立てるためペアリングが機능する。',
    'Bar Food 안주': 'バーフード안주',
    'Tofu Contrast': '豆腐のコントラスト',
    'Kimchi & Bean Sprout Soup · Hangover Cure': 'キムチと豆モヤシのスープ · 二日酔い解消',
    'Soybean sprouts (콩나물) simmered briefly with kimchi, anchovy broth, garlic, and green onion into a clean, pungent soup. The sprouts contribute a crisp snap and a light bean sweetness; the kimchi provides fermented acid and spice. Famous as one of Korea\'s most effective 해장국 (hangover soups) — the amino acids from 콩나물 and the probiotics from kimchi are considered genuinely restorative. Ready in under 15 minutes. A regular weekday breakfast soup in Korean homes.':
      '콩나물（豆モヤシ）をキムチ・いりこだし・ニンニク・ねぎで短時間煮込んだクリーンで刺激的なスープ。モヤシがパリパリした食감と軽い豆の甘さを提供；キムチが発酵의酸味와辛さを提供する。韓国최고의해장국（二日酔い解消スープ）のひとつとして有名 — 콩나물のアミノ酸とキムチのプロバイオティクスが本当에滋養になるとされる。15분以内에完成。韓국家庭의平日の朝食スープの定番。',
    '해장국 Hangover Cure': '해장국（二日酔い解消）',
    '15-Min': '15分',
    'Aged Kimchi & Tuna Gimbap · Bold Roll': '숙성キムチとツナのキンパ · 大胆な巻き物',
    'Gimbap rolled with aged kimchi (묵은지) and canned tuna mayo — assertive, intensely flavored, and not for the timid. The 묵은지 must be squeezed completely dry before rolling; residual moisture makes the seaweed go limp and the rice fall apart. The deep sourness of aged kimchi against tuna\'s richness creates a complex rice roll with layers of umami. A specialty at upscale gimbap shops (분식집) — a natural evolution of the classic chamchi-gimbap for kimchi connoisseurs.':
      '묵은지（숙성キムチ）와缶詰ツナマヨで巻いたキンパ — 주장이강하고강렬에풍미豊かで気弱な人向けではない。묵은지는巻く前に完全에水気を絞り切る必要がある；残った水分が海苔をふにゃふにゃにしてご飯をバラバラにする。숙성キムチの深い酸味とツナの濃厚さが複雑なうまみの층を持つご飯ロールを生み出す。キムチのコニュサー向けの高級분식집のスペシャリティ。',
    '묵은지 Bold': '묵은지大胆',
    'Gimbap Specialty': 'キンパスペシャリティ',
    'Aged Kimchi Pork Spare Ribs Braise · Special Occasion': '숙성キムチ豚スペアリブ煮込み · 特別な機会',
    'Pork spare ribs (등갈비) slowly braised with aged kimchi (묵은지) for 2–3 hours. More spectacular than 김치찜 with pork belly — the rib bones release marrow and collagen into the braise, building a glossy, deeply savory sauce that coats every surface. The 묵은지\'s sourness fully dissolves into the braise over time, leaving only concentrated sweetness and umami. A dish that demands effort but rewards with restaurant-depth flavor. Commonly served at Korean family gatherings and milestone celebrations.':
      '돼지등갈비를묵은지와함께2〜3시간걸려ゆっくり煮込む。三枚肉의김치찜よりスペクタクル — リブの骨が骨髄とコラーゲンを煮込み汁에放出し、全体をコートする光沢のある深いコクのソースを作る。묵은지의酸味는時間と共에煮込み汁에完全에溶け込み、濃縮された甘さとうまみだけが残る。努力을要求するが레스토랑レベルの풍미로報われる料理。韓국의家族모임이나重要な祝い事によく提供される。',
    'Special Occasion': '特別な機会',
    'Kimchi Dumplings · The Classic Filling': 'キムチ餃子 · クラシックな具材',
    'Ground pork mixed with kimchi, tofu, glass noodles (당면), garlic, and sesame oil — one of Korea\'s most beloved dumpling fillings. The kimchi must be squeezed completely dry before mixing; moisture destroys the wrapper and causes splitting during cooking. Can be steamed (찐만두), boiled (물만두), pan-fried (군만두), or deep-fried (튀김만두) — each method produces a different texture. During cooking the kimchi filling mellows and sweetens, losing rawness and gaining depth. A staple at every Korean 분식집 and 만두 shop.':
      '挽き豚肉にキムチ・豆腐・당면（春雨）・ニンニク・ごま油를混ぜた — 韓국で最も愛される餃子의具材のひとつ。キムチは混ぜる前에完全에水気を絞る必要がある；水分が皮를壊して調理中에割れる原因になる。찐만두・물만두・군만두・튀김만두 — 各方法가異なる食感を生み出す。調理中にキムチの具材が柔らかく甘くなり、生の풍미가消えて깊이가生まれる。すべての韓국분식집와만두店의定番。',
    'Classic Filling': 'クラシックな具材',
    '4 Ways to Cook': '4種類の調理法',
    'Kimchi Rice Soup · Busan/Gyeongsang Regional · Working-Class Classic': 'キムチご飯スープ · 釜山/慶尚道의地方料理 · 庶民の定番',
    'Hot cooked rice poured directly into kimchi broth — or a full kimchi-jjigae base with meat and tofu — creating a thick, warming rice soup. 갱시기죽 is the Busan and Gyeongsang Province (경상도) dialect name: a deeply regional dish carrying the identity of Korea\'s southeast. Born from necessity — yesterday\'s kimchi stew + leftover rice = today\'s breakfast, nothing wasted. Some versions use plain kimchi broth for a lighter result; others are a full 찌개 with rice dissolved in. Simple, sour, intensely warming.':
      'キムチスープまたはキムチチゲベースに温かいご飯을直接入れた濃くて温まるご飯スープ。갱시기죽은釜山と경상도（慶尚道）의방言名：韓국東南部のアイデンティティを담은깊이地域의料理。必然から생まれた — 昨日のキムチチゲ＋残りご飯＝今日の朝食、無駄なし。シンプルで酸っぱく강렬에温まる。',
    'Busan 부산': '부산（釜山）',
    'Regional Dialect': '地域方言',
    'Kimchi Hot Pot · Korean-Japanese Fusion · Table Cooking': 'キムチ鍋 · 韓日フュージョン · テーブル調理',
    'Japanese-style communal hot pot (나베 / 鍋) with kimchi as the broth base. A kimchi-gochugaru broth simmers at the table in a wide, shallow pot; diners add tofu, mushrooms (표고버섯, 팽이버섯), pork slices, glass noodles, and vegetables gradually — eating as ingredients cook. Lighter and more refined than 김치찌개 — the kimchi flavor is present throughout but never dominates. A fixture in Korean-Japanese fusion restaurants across Seoul and Tokyo. The grand finale: cook 죽 (porridge) or 볶음밥 (fried rice) in the remaining broth.':
      'キムチをスープベースにした日本式의공동鍋（나베/鍋）料理。김치・코추장スープを広くて浅い냄비에서テーブルで煮込みながら豆腐・버섯・豚肉スライス・春雨・野菜를차례에加えて食べる。김치찌개より軽くて洗練 — キムチの풍미가全体에存在するが決して圧倒的にならない。ソウルと東京의韓日フュージョンレストランで定番。그랜드피날레：残ったスープで죽（お粥）または볶음밥（チャーハン）를作る。',
    'Table Cooking': 'テーブル調理',
    'Korean-Japanese': '韓日',
    // kimchi vocab
    'fermented vegetable (general term)': '発酵野菜（総称）',
    'annual winter kimchi-making tradition': '年一度의冬のキムチ作りの伝統',
    'Korean red pepper flakes (key ingredient)': '韓국의赤唐辛子フレーク（主要食材）',
    'salted fermented seafood (for umami)': '塩辛（うまみのため）',
    'fish sauce (used in kimchi seasoning)': '魚醤（キムチ의調味에使용）',
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
    '📖 김치 어휘 · Kimchi Vocabulary': '📖 김치 어휘 · キムチ語彙',
    // kimchi fridge info-box
    'The Kimchi Refrigerator (김치냉장고)': 'キムチ専用冷蔵庫（김치냉장고）',
    'Korean homes have a dedicated 김치냉장고 — a separate refrigerator maintained at a specific temperature (around 0°C) to slow-ferment kimchi optimally. The most popular brand is 딤채 (Dimchae) by Winia. Owning a 김치냉장고 is a standard household item, like owning a regular refrigerator in the West. Without one, the kimchi in the regular fridge can ferment too fast. This is why Korean household appliance culture developed around kimchi long before it developed around wine.':
      '韓국의家庭には専用의김치냉장고がある — キムチを最適にゆっくり発酵させるために特定の温度（約0°C）에維持する別의冷蔵庫。最も人기のブランドは위니아의딤채（Dimchae）。김치냉장고를所有することは西洋で普通의冷蔵庫を持つのと同じ標準的な家庭用品だ。ないと普通의冷蔵庫のキムチが速く発酵しすぎる。これが韓국의家庭用電子製品文화がワインよりずっと前にキムチを中心으로発展した이유다。',
    // kimchi section labels
    '🌊 발효 방식 By Fermentation Style': '🌊 발효 방식 発酵方式別',
    '10 types': '10種類',
    '🍳 요리에 쓰이는 김치 Kimchi in Cooking': '🍳 요리에 쓰이는 김치 料理에使うキムチ',
    '17 dishes': '17料理',

    // ── K-Fashion page (kfashion.html) — full translation ──────────────────

    // Page hero
    '👗 K-Fashion': '👗 K-ファッション',
    'From the underground streets of Hongdae to luxury boutiques in Cheongdam-dong, K-Fashion has earned Seoul a place alongside Paris, Milan, and New York as a global fashion capital. BTS, BLACKPINK, and a new wave of boundary-pushing Korean designers have placed Korean aesthetics on every major runway and TikTok feed worldwide — making K-fashion one of the most powerful cultural exports of the 21st century.':
      '홍대のアンダーグラウンドなストリートから청담동の高級ブティックまで — K-ファッションはソウルをパリ、ミラノ、ニューヨークと並ぶグローバルなファッション都市に押し上げました。BTS、BLACKPINK、そして新世代の革新的な韓国人デザイナーたちが、韓国の美学を世界中の主要ランウェイとTikTokフィードに届け — K-ファッションを21世紀最も強力な文化輸出品の一つにしました。',

    // K-Fashion Goes Global — stat labels
    '🌍 K-Fashion Goes Global · 글로벌 K-패션': '🌍 K-ファッションの世界進出 · 글로벌 K-패션',
    'Korean fashion & textiles exports 2024': '韓国ファッション・繊維輸出額（2024年）',
    'APAC youth fashion influence ranking': 'アジア太平洋若者ファッション影響力ランキング',
    '#KFashion views across social media': '#KFashionのSNS総閲覧数',
    'Designers at Seoul Fashion Week per season': 'ソウルファッションウィーク参加デザイナー数（1シーズン）',
    'K-pop stars as global luxury brand ambassadors': 'K-ポップスターのグローバル高級ブランドアンバサダー数',
    'Shops across Dongdaemun market district': '東大門ファッションタウン内店舗数',

    // Compare table — K-Fashion vs Western Fashion
    'Aspect': '観点',
    'K-Fashion 한국 패션': 'K-ファッション 한국 패션',
    'Western Fashion': '西洋のファッション',
    'Trend Cycle': 'トレンドサイクル',
    'Hyper-fast — idol-driven drops weekly via social media': '超高速 — アイドル主導でSNS経由で毎週新作が登場',
    'Seasonal — 4 major collections per year': '季節ごと — 年4回の主要コレクション',
    'Sizing Philosophy': 'サイジング哲学',
    '"프리 사이즈" (Free Size) dominates; petite-focused': '「프리 사이즈」（フリーサイズ）が主流；小柄向け',
    'Standardized XS–XXL spectrum': 'XS〜XXLの標準サイズ展開',
    'Key Trend Driver': '主要トレンドドライバー',
    'K-pop idols, airport fashion, TikTok viral moments': 'K-ポップアイドル、空港ファッション、TikTokバイラル',
    'Fashion editors, runway models, celebrities': 'ファッションエディター、ランウェイモデル、セレブ',
    'Shopping Ecosystem': 'ショッピングエコシステム',
    'Dongdaemun 24hr market + same-day online delivery': '東大門24時間マーケット＋当日オンライン配送',
    'Department stores, seasonal boutiques': 'デパート、季節ブティック',
    'Aesthetic Ideal': '美的理想',
    '귀엽다 (cute) + 멋있다 (cool) in balance': '귀엽다（可愛い）＋멋있다（かっこいい）のバランス',
    'Bold individuality and self-expression': '大胆な個性と自己表現',
    'Traditional Fusion': '伝統との融合',
    'Hanbok fusion actively trending in mainstream fashion': '한복フュージョンが主流ファッションでトレンド中',
    'Traditional dress largely ceremonial only': '伝統衣装は主に儀礼的な場でのみ着用',

    // Fashion Icons section
    '👑 Korean Fashion Icons · 패션 아이콘': '👑 韓国のファッションアイコン · 패션 아이콘',
    '남의 시선 & 유행은 돌고 돈다 — Why Icons Stand Apart': '남의 시선 & 유행은 돌고 돈다 — アイコンが特別である理由',
    'Koreans are uniquely sensitive to 남의 시선 (the gaze of others) — social awareness and group conformity run very deep. 유행 (fashion trends) are followed intensely and change fast. The saying 유행은 돌고 돈다 (trends go around and come back around) describes how Korean fashion cycles continuously. This is precisely why those who break the cycle entirely — who dress with total conviction regardless of 남의 시선 — are remembered as legends long after the trends have moved on. The icons below didn\'t follow trends. They defined, subverted, and transcended them.':
      '韓国人は「남의 시선（他人の目）」に対して独自の敏感さを持ち、社会的意識と集団への同調が非常に深く根付いています。「유행（ファッショントレンド）」は強烈に追求され、変化も速い。「유행은 돌고 돈다（トレンドはめぐりめぐる）」という言葉が韓国ファッションの循環を表しています。だからこそ、「남의 시선」を一切気にせず完全な確信をもって着こなす者が、トレンドが過ぎ去った後も伝説として語り継がれるのです。以下のアイコンたちはトレンドに従いませんでした。彼らはトレンドを定義し、覆し、超越したのです。',

    // Icon cards — banner sub
    '1990s · K-Fashion Revolutionary': '1990年代 · K-ファッション革命家',
    '1960s–2010 · Haute Couture Pioneer': '1960年代〜2010 · オートクチュールの先駆者',
    '2000s · Effortless Cool': '2000年代 · 力みのないクール',
    '2000s– · K-Fashion Deity': '2000年代〜 · K-ファッションの神',
    '2010s · Comedy as Fashion Statement': '2010年代 · コメディとしてのファッション表明',

    // Icon cards — chef-restaurant
    '서태지와 아이들 · Culture President': '서태지와 아이들 · 文化大統領',
    'Korea\'s First Couturier · Legend': '韓国初のクチュリエ · レジェンド',
    'Actor · Korea\'s Style Icon': '俳優 · 韓国のスタイルアイコン',
    'BIGBANG · Global Style Setter': 'BIGBANG · グローバルスタイルセッター',
    'Comedian · Accidental Icon': 'コメディアン · 偶然のアイコン',

    // Icon cards — chef-location
    '📍 Seoul · Active 1992–': '📍 ソウル · 1992年〜活動中',
    '📍 Seoul / Paris · 1935–2010': '📍 ソウル / パリ · 1935〜2010',
    '📍 Seoul · Active 1990s–': '📍 ソウル · 1990年代〜活動中',
    '📍 Seoul · Active 2006–': '📍 ソウル · 2006年〜活動中',
    '📍 Seoul · Active 2000s–': '📍 ソウル · 2000年代〜活動中',

    // Icon cards — chef-desc paragraphs
    'When 서태지와 아이들 debuted in 1992, baggy hip-hop pants, oversized hoodies, and unconventional styling smashed Korea\'s conservative dress norms overnight. 서태지 invented the template for all K-pop idol fashion that followed — and earned the title 문화 대통령 (Culture President). Still referenced as a style icon 30+ years later.':
      '1992年に서태지와 아이들がデビューした時、バギーなヒップホップパンツ、オーバーサイズのフーディー、型破りなスタイリングが韓国の保守的なドレス規範を一夜にして打ち砕きました。서태지はその後のすべてのK-ポップアイドルファッションの雛形を作り、「문화 대통령（文化大統領）」の称号を得ました。30年以上経った今もスタイルアイコンとして語り継がれています。',
    'Korea\'s first internationally recognized haute couture designer. His signature all-white personal style — white suits, white scarves — became as iconic as his dramatic runway shows. He brought Korean fashion to Paris and proved Korean design could stand on the world stage, decades before it became expected.':
      '韓国初の国際的に認められたオートクチュールデザイナー。トレードマークのオールホワイトの個人スタイル — 白いスーツ、白いスカーフ — は劇的なランウェイショーと同様にアイコニックになりました。パリに韓国ファッションを持ち込み、世界舞台に立てることを証明しました。',
    'Korea\'s ultimate 남자의 패션 (men\'s fashion) icon of the 2000s. His effortlessly cool layering — leather jackets, vintage tees, loose-fitting trousers — inspired a generation of Korean men to dress without trying too hard. Proof that attitude is the most powerful accessory. His looks circulated in 패션 잡지 (fashion magazines) for years after each film.':
      '2000年代の韓国における男性ファッションの究極のアイコン。레더 재킷、빈티지 티셔츠、루즈핏 팬츠のさりげないレイヤリングが、一世代の韓国人男性に「頑張りすぎずに着こなす術」を教えました。態度こそ最強のアクセサリーであることを証明した人物です。',
    'The living definition of K-fashion trendsetter. G-Dragon wears something once — it sells out globally that same day. His fearless blending of high fashion (Chanel, Dior) with streetwear and avant-garde styling redefined what Korean men could wear. Named one of TIME\'s 100 Most Influential People. The phrase "GD 입으면 다 산다" (if GD wears it, it sells out) is literal truth.':
      'K-ファッショントレンドセッターの生きた定義。G-Dragonが一度着用すると、その日のうちに世界中で完売します。ハイファッション（シャネル、ディオール）とストリートウェア、アバンギャルドスタイリングの大胆な融合が韓国男性ファッションの可能性を再定義しました。TIME誌「世界で最も影響力のある100人」に選出。「GD 입으면 다 산다（GDが着ると完売する）」は文字通りの真実です。',
    'The most unexpected fashion icon in Korean history — a comedian who turned deliberate "아저씨 fashion" (middle-aged man style) into high art. Mismatched patterns, oversized blazers, trot-adjacent styling executed with absolute confidence. His look was so committed it looped back from "나쁜 패션" (bad fashion) to undeniably cool. Proof that in Korea, where 남의 시선 rules, wearing the "wrong" thing with complete conviction is the bravest fashion statement of all.':
      '韓国史上最も予想外のファッションアイコン — 意図的な「아저씨ファッション（中年男性スタイル）」を高芸術の域に昇華させたコメディアン。ミスマッチなパターン、オーバーサイズのブレザー、トロット調スタイリングを絶対的な自信で着こなしました。そのルックは「나쁜 패션（悪いファッション）」から間違いなくクールな境地へと還ってきました。남의 시선が支配する韓国で「間違った」ものを完全な確信で着ることが最も勇敢なファッション表明であることを証明しました。',

    // Icon tags
    '#HipHop': '#ヒップホップ',
    '#Revolutionary': '#革命的',
    '#HauteCouture': '#オートクチュール',
    '#AllWhite': '#オールホワイト',
    '#Legend': '#レジェンド',
    '#Effortless': '#さりげない',
    '#Actor': '#俳優',
    '#Comedy': '#コメディ',
    '#AccidentalIcon': '#偶然のアイコン',

    // K-Fashion Timeline
    '⏳ K-Fashion Timeline · 패션의 역사': '⏳ K-ファッション年表 · 패션의 역사',

    // Timeline dates (English-dominant ones)
    'Joseon Dynasty · 조선시대': '朝鮮王朝 · 조선시대',

    // Timeline titles
    '한복 — The Birth of Korean Dress': '한복 — 韓国衣装の誕生',
    'Opening of Ports — Western Dress Arrives': '港の開放 — 西洋服の到来',
    'New Women — Fashion as Resistance': '新しい女性たち — 抵抗としてのファッション',
    'Liberation & American Influence': '光復とアメリカの影響',
    'The Garment Industry — Rise, Dominance, and Decline': '衣料産業 — 台頭、支配、そして衰退',
    'Myeongdong — Korea\'s First Fashion Hub': '명동 — 韓国初のファッション拠点',
    'From Japan Imitation to Korean Identity': '日本の模倣から韓国のアイデンティティへ',
    '🏆 IMF Crisis Forges Hongdae Street Culture': '🏆 IMF危機が弘大ストリートカルチャーを鍛える',
    'Dongdaemun — Fast Fashion Before Fast Fashion': '東大門 — ファストファッション以前のファストファッション',
    'Dongmyo — Grandfather Fashion & Vintage Seoul': '東廟 — おじいさんファッションとヴィンテージソウル',
    'Internet + Same-Day Delivery — The Online Fashion Revolution': 'インターネット＋当日配達 — オンラインファッション革命',
    'K-Pop Sets the Idol Fashion Template': 'K-ポップがアイドルファッションの雛形を定める',
    '🏆 Seoul Fashion Week Goes International': '🏆 ソウルファッションウィーク、国際舞台へ',
    '🏆 K-Pop × Luxury — The Ambassador Era': '🏆 K-ポップ × 高級ブランド — アンバサダーの時代',
    'TikTok Era & the Hanbok Renaissance': 'TikTok時代と한복ルネサンス',

    // Timeline descriptions
    'Hanbok evolved over 500 years with strictly color-coded social hierarchies — commoners wore white, earning Korea the lasting name 백의민족 (people of white clothing). The silhouettes, fabrics, and ornaments of Joseon-era hanbok remain the spiritual foundation of modern K-fashion.':
      '한복は500年にわたり厳格な色分けされた社会的階層とともに発展しました — 庶民は白を着用し、韓国は「백의민족（白衣の民族）」という名で知られることになります。朝鮮王朝時代の한복のシルエット、素材、装飾は現代K-ファッションの精神的基盤として今も息づいています。',
    'Korea opens its ports to foreign trade. Western-style clothing enters Korea for the first time, worn by diplomats and progressives. Traditional hanbok and modern dress begin to coexist, creating Korea\'s first fashion identity tension.':
      '韓国が外国との通商を開放。西洋式の衣服が外交官や開明的な人々によって韓国に初めて持ち込まれました。伝統的な한복と近代的な服が共存し始め、韓国初のファッションアイデンティティの緊張が生まれました。',
    'The 신여성 (New Women) movement embraces Western dress and short hair, blending traditional and modern aesthetics. Korean women challenge social norms through fashion, making clothing a form of political expression for the first time.':
      '신여성（新女性）運動が西洋服と短髪を受け入れ、伝統と近代の美学を融合させました。韓国の女性たちはファッションを通じて社会規範に挑戦し、衣服を初めて政治的表現の手段としました。',
    'Post-liberation, American military culture floods Korea with jeans, T-shirts, and Western style. Western clothing rapidly normalizes as everyday wear. Korean fashion loses traditional roots but gains cosmopolitan aspirations that will define the next 50 years.':
      '光復後、米軍文化がジーンズ、Tシャツ、西洋スタイルを韓国に溢れさせました。西洋服が日常着として急速に普及。韓国ファッションは伝統的なルーツを失いましたが、次の50年を定義するコスモポリタンな志向を得ました。',
    'Korea\'s textile and garment (봉제) industry became the backbone of national exports from the 1960s through the 1980s — the original K-fashion export story. Factories in Pyounghwa Clothing Market (평화시장) and Dongdaemun earned vital foreign currency, driving Korea\'s economic miracle. But rising wages, SPA brand competition (H&M, Zara), and cheaper overseas manufacturing hollowed out the sector. Today Korea is rebuilding — not as an OEM factory, but as a premium branding and high-value fabric technology hub.':
      '韓国の繊維・봉제（縫製）産業は1960年代から1980年代にかけて国家輸出の骨格となりました — K-ファッション輸出の原点です。평화시장（平和市場）と東大門の工場が貴重な外貨を稼ぎ、韓国の経済の奇跡を牽引しました。しかし賃金上昇、SPAブランドの競争（H&M、Zara）、海外の安価な生産拠点に圧迫され衰退。現在は単純OEM工場としてではなく、プレミアムブランディングと高付加価値ファブリック技術のハブとして再構築中です。',
    'Myeongdong emerges as Seoul\'s first dedicated fashion district. Boutique culture blooms for the first time. Domestic Korean fashion brands begin growing independently — the origin story of Korea\'s fashion industry.':
      '명동がソウル初の専用ファッション地区として台頭。ブティック文化が初めて花開きます。韓国の国産ファッションブランドが自生的に成長し始めました — これが韓国ファッション産業の原点です。',
    'Throughout the 1980s, Korean fashion consumers and brands heavily referenced Japanese fashion magazines — non-no, JJ, POPEYE. Boutiques reverse-engineered Japanese trends, and Korean designers learned by imitation. This "copying phase" was actually an accelerator: Korea absorbed Japanese aesthetics, then began adding local sensibility — creating the distinctly Korean look that would emerge in the 1990s and eventually surpass its source of inspiration.':
      '1980年代を通じて、韓国のファッション消費者とブランドはnon-no、JJ、POPEYEなど日本のファッション誌を強く参照しました。ブティックは日本のトレンドをリバースエンジニアリングし、韓国のデザイナーは模倣によって腕を磨きました。この「模倣の時代」は実際には加速装置でした：韓国は日本の美学を吸収し、そこにローカルな感性を加え始め — 1990年代に台頭し、最終的にインスピレーションの源を超えていく独自の韓国的スタイルを生み出しました。',
    'The 1997 IMF financial crisis hits Korea hard. But in Hongdae, young creatives respond with bold underground fashion — individuality born from economic adversity. The Hongdae street style scene emerges as a counterculture that will eventually influence global fashion.':
      '1997年のIMF金融危機が韓国を直撃しました。しかし弘大では、若いクリエイターたちが大胆なアンダーグラウンドファッションで応えました — 経済的逆境から生まれた個性。弘大のストリートスタイルシーンは、やがてグローバルファッションに影響を与えるカウンターカルチャーとして台頭します。',
    'Dongdaemun\'s 보세 (bose — unlicensed, unbranded) clothing market was Korea\'s original fast fashion revolution. Young Koreans could buy Seoul-designed, overnight-sewn clothes at rock-bottom prices. Designers arrived before sunrise to buy fabric samples; finished garments were on racks by morning. This "bosse sensibility" — affordable, trend-forward, streets-first — became the DNA of Korean fast fashion culture and inspired the speed of today\'s 무신사 platform era.':
      '東大門の보세（無認可・無ブランド）衣料市場は韓国オリジナルのファストファッション革命でした。ソウルデザイン・一夜仕立ての服を格安で購入できました。デザイナーたちは夜明け前に生地サンプルを買いに来て、完成品が朝には棚に並んでいました。この「보세感性」— 手頃で、トレンドを先取りし、ストリート最優先 — が韓国ファストファッション文化のDNAとなり、今日の무신사プラットフォーム時代の速度感に受け継がれています。',
    'Dongmyo Flea Market (동묘 벼룩시장) became Seoul\'s best-kept fashion secret: a sprawling second-hand market where 아저씨 trade decades-old clothing alongside fashion-forward Gen Z hunters seeking rare vintage finds. The "할아버지 패션" (grandfather fashion) — old military jackets, retro golf wear, 80s blazers — transformed from middle-aged market staple to cult trend celebrated in street style photography worldwide.':
      '東廟のフリーマーケット（동묘 벼룩시장）はソウル最大の隠れたファッションの秘宝となりました：아저씨たちが数十年前の服を取引する傍ら、レアなヴィンテージを探すZ世代ハンターが共存するフリーマーケット。「할아버지 패션（おじいさんファッション）」— 古い軍用ジャケット、レトロゴルフウェア、80年代のブレザー — が中高年市場の定番から世界のストリートスタイル写真誌で称賛されるカルトトレンドへと変貌しました。',
    'Korea\'s world-leading internet infrastructure combined with an unmatched same-day delivery logistics system (당일 배송) transformed fashion shopping completely. Online shopping malls (인터넷 쇼핑몰), platforms like Musinsa and StyleShare, and thousands of individual designer boutiques exploded. What took days to arrive anywhere else arrived in Korea by evening. Korean fashion became hyper-responsive to trends because supply chains were now measured in hours, not months.':
      '世界トップクラスの韓国のインターネットインフラが、無類の당일 배송（当日配送）物流システムと組み合わさり、ファッションショッピングを完全に変革しました。인터넷 쇼핑몰、무신사やStyleShareなどのプラットフォーム、数千の個人デザイナーブティックが爆発的に成長。他の場所では数日かかる配送が韓国では夕方までに届きます。供給網が「月」単位ではなく「時間」単位で計られるようになり、韓国ファッションはトレンドへの対応が超高速化しました。',
    'H.O.T., Baby V.O.X., BoA, and TVXQ define the idol fashion formula — coordinated outfits, logo-heavy streetwear, denim, and matching accessories. Youth fashion is now idol fashion. Korean fast fashion accelerates to meet the demand of "아이돌 따라하기" (copying idol style).':
      'H.O.T.、Baby V.O.X.、BoA、TVXQがアイドルファッションの公式を確立しました — 統一されたコーデ、ロゴ重視のストリートウェア、デニム、マッチングアクセサリー。若者ファッション＝アイドルファッションに。韓国のファストファッションは「아이돌 따라하기（アイドルスタイルの模倣）」の需要を満たすために加速しました。',
    'Seoul Fashion Week gains full international press accreditation. Korean designers debut at Paris Fashion Week. Seoul is officially recognized as a global fashion capital — the first Asian city to earn this status organically through its own creative culture.':
      'ソウルファッションウィークが完全な国際プレス認定を取得。韓国人デザイナーがパリファッションウィークでデビュー。ソウルは公式にグローバルなファッション都市として認定されました — 自国の創造的文化を通じてこの地位を有機的に獲得した最初のアジア都市。',
    'BTS × Louis Vuitton. BLACKPINK × Chanel, Dior, Saint Laurent, and Celine. K-pop idols become the world\'s most coveted luxury brand ambassadors — surpassing Hollywood stars in engagement and commercial impact. Airport fashion becomes international fashion news.':
      'BTS × ルイ・ヴィトン。BLACKPINK × シャネル、ディオール、サンローラン、セリーヌ。K-ポップアイドルがエンゲージメントと商業的影響力の両面でハリウッドスターを凌駕し、世界で最も注目される高級ブランドアンバサダーになりました。空港ファッションが国際的なファッションニュースになります。',
    'K-fashion floods TikTok and Instagram, setting global Gen Z aesthetics in real time. Simultaneously, a new generation of Korean designers leads the "Hanbok Renaissance" — reinterpreting 500-year-old silhouettes for daily wear and high fashion, closing the circle from Joseon to now.':
      'K-ファッションがTikTokとInstagramを席巻し、グローバルなZ世代の美学をリアルタイムで形成。同時に、新世代の韓国デザイナーたちが「한복ルネサンス」を牽引 — 500年前のシルエットを日常着とハイファッションとして再解釈し、朝鮮王朝から現代へと円環を閉じています。',

    // Iconic K-Fashion Brands
    '🏢 Iconic K-Fashion Brands · 아이코닉 K-패션 브랜드': '🏢 アイコニックなK-ファッションブランド · 아이코닉 K-패션 브랜드',

    // Brand banner subs
    'Founded 2014 · Minimalist Streetwear': '2014年設立 · ミニマリストストリートウェア',
    'Founded 2008 · Luxury Maximalism': '2008年設立 · ラグジュアリーマキシマリズム',
    'Founded 2011 · Fashion × Art': '2011年設立 · ファッション × アート',
    'Founded 2004 · Fashion-Beauty Crossover': '2004年設立 · ファッション×ビューティークロスオーバー',
    'Founded 2013 · Avant-Garde': '2013年設立 · アバンギャルド',
    'Founded 2006 · Preppy-Street': '2006年設立 · プレッピーストリート',
    'Founded 2001 · Korea\'s Fashion Platform': '2001年設立 · 韓国最大ファッションプラットフォーム',
    'Founded 1989 · Samsung Premium Casual': '1989年設立 · サムスンプレミアムカジュアル',
    'Founded 1997 · Korean Basics Pioneer': '1997年設立 · 韓国ベーシックスの先駆者',

    // Brand chef-restaurant
    'Seoul Creative Collective · Streetwear': 'ソウルクリエイティブコレクティブ · ストリートウェア',
    'Park Seung-gun 박승건 · Luxury Designer': 'Park Seung-gun 박승건 · ラグジュアリーデザイナー',
    'Kim Han-kook · Fashion-Art Experience': 'Kim Han-kook · ファッション×アート体験',
    'Kim So-hee 김소희 · Fashion & Beauty': 'Kim So-hee 김소희 · ファッション&ビューティー',
    'Ji Sun-woo & Ji Youngji · Conceptual Fashion': 'Ji Sun-woo & Ji Youngji · コンセプチュアルファッション',
    'Koh Tae-yong 고태용 · Preppy Streetwear': 'Koh Tae-yong 고태용 · プレッピーストリートウェア',
    '조만호 · Korea\'s Dominant Fashion Platform': '조만호 · 韓国最大のファッションプラットフォーム',
    'Samsung C&T · Premium Casual Brand': 'サムスンC&T · プレミアムカジュアルブランド',
    '·  Affordable Basics Brand': '· リーズナブルなベーシックブランド',

    // Brand chef-location
    '📍 Seoul, Korea · Est. 2014': '📍 ソウル、韓国 · 2014年設立',
    '📍 Seoul / Paris · Est. 2008': '📍 ソウル / パリ · 2008年設立',
    '📍 Seoul, Korea · Est. 2011': '📍 ソウル、韓国 · 2011年設立',
    '📍 Seoul, Korea · Est. 2004': '📍 ソウル、韓国 · 2004年設立',
    '📍 Seoul, Korea · Est. 2013': '📍 ソウル、韓国 · 2013年設立',
    '📍 Seoul, Korea · Est. 2006': '📍 ソウル、韓国 · 2006年設立',
    '📍 Seoul, Korea · Est. 2001': '📍 ソウル、韓国 · 2001年設立',
    '📍 Seoul, Korea · Est. 1989': '📍 ソウル、韓国 · 1989年設立',
    '📍 Seoul, Korea · Est. 1997': '📍 ソウル、韓国 · 1997年設立',

    // Brand descriptions
    'Founded by a nameless Seoul creative collective, Ader Error redefines Korean streetwear with oversized silhouettes, bold lowercase typography, and a signature playful-serious aesthetic. Notable collaborations with New Balance, Maison Margiela, and Puma cemented its global cult following.':
      '名のないソウルのクリエイティブ集団によって設立されたAder Errorは、オーバーサイズシルエット、大胆な小文字タイポグラフィ、シグネチャーの遊び心×シリアスな美学で韓国のストリートウェアを再定義します。ニューバランス、メゾン・マルジェラ、プーマとの注目のコラボレーションがグローバルなカルト的支持層を確立しました。',
    'Founded by designer Park Seung-gun (박승건), Pushbutton showcases at both Seoul and Paris Fashion Weeks. Its candy-colored maximalism, dramatic volumes, and playful luxury aesthetic have made it the go-to brand for BTS, aespa, and international celebrities. Korea\'s answer to Moschino.':
      'デザイナー박승건（パク・スンゴン）が設立したプッシュボタンは、ソウルとパリのファッションウィーク両方でショーを行います。キャンディカラーのマキシマリズム、劇的なボリューム、遊び心あるラグジュアリー美学がBTS、aespa、国際的セレブのご用達ブランドにしました。韓国版モスキーノ。',
    'More than an eyewear brand — an immersive art experience. Each Gentle Monster store worldwide is redesigned every two months with museum-quality sculptural installations. Collaborations with BLACKPINK\'s Jennie, Jacquemus, and Maison Margiela make every drop a global sell-out event.':
      '単なるアイウェアブランドを超えた没入型アート体験。世界中のジェントルモンスターの店舗は2ヶ月ごとに美術館クオリティの彫刻的なインスタレーションで刷新されます。BLACKPINKのジェニー、ジャクムス、メゾン・マルジェラとのコラボレーションで毎回のドロップが世界的な完売イベントとなります。',
    'Kim So-hee started Stylenanda in 2004 as a simple online boutique. By fusing fashion with the revolutionary 3CE makeup line, she built a K-pop lifestyle empire — acquired by L\'Oréal for approximately ₩460 billion (~$400M) in 2018, one of the largest exits in Korean fashion history.':
      '김소희は2004年にスタイルナンダをシンプルなオンラインブティックとして始めました。革新的な3CEメイクラインとファッションを融合させることでK-ポップライフスタイル帝国を築き上げ、2018年にL\'Oréalに約4,600億ウォン（〜4億ドル）で買収されました — 韓国ファッション史上最大規模の売却の一つ。',
    'Co-founded by Ji Sun-woo and Ji Youngji, Blindness creates conceptual, gender-fluid collections that challenge Korean social norms. A consistent Seoul Fashion Week presence, the brand explores identity and beauty through dark architectural silhouettes worn by BTS members and international art directors.':
      'Ji Sun-wooとJi Youngjiが共同設立したブラインドネスは、韓国の社会規範に挑戦するコンセプチュアルでジェンダーフルイドなコレクションを制作します。ソウルファッションウィーク常連として、BTSメンバーや国際的なアートディレクターが着用するダークで建築的なシルエットを通じてアイデンティティと美を探求します。',
    'Koh Tae-yong\'s (고태용) brainchild fuses Ivy League aesthetics with Korean street culture. The signature plaid patterns, the bear mascot "BC Bear," and bright orange accents make every piece instantly recognizable — a campus fashion staple across Korea and East Asia since 2006.':
      '고태용が考案したビヨンドクロゼットは、アイビーリーグ美学と韓国のストリートカルチャーを融合させます。シグネチャーのプレイドパターン、クマのマスコット「BCベア」、鮮やかなオレンジのアクセントで、全てのアイテムが一目でわかります — 2006年以来、韓国と東アジア全体でキャンパスファッションの定番です。',
    'Started as an online sneaker community forum in 2001, Musinsa evolved into Korea\'s dominant fashion platform — a one-stop marketplace for thousands of Korean indie designers and global brands. Valued at over ₩2.5 trillion, it democratized K-fashion by giving small designers direct access to millions of consumers. 무신사 스탠다드 (Musinsa Standard) is its in-house basics line beloved by Korean men.':
      '2001年にオンラインスニーカーコミュニティフォーラムとして始まった무신사は、韓国最大のファッションプラットフォームへと進化しました — 何千もの韓国インディーデザイナーとグローバルブランドが揃う一箇所のマーケットプレイス。企業価値2.5兆ウォン超。中小デザイナーに数百万の消費者への直接アクセスを与えることでK-ファッションを民主化しました。「무신사 스탠다드（ムシンサ・スタンダード）」は韓国男性に愛されるインハウスベーシックラインです。',
    'Samsung\'s fashion brand founded in 1989, Bean Pole is one of Korea\'s most enduring premium casual labels. Known for clean preppy aesthetics, high-quality basics, and the signature cycling-and-outdoor lifestyle motifs. Worn by Korean families across generations — evidence that a Korean conglomerate could build a genuine fashion brand, not just a licensed copy.':
      '1989年にサムスンが設立したファッションブランド、빈폴は韓国で最も長続きしているプレミアムカジュアルラベルの一つです。クリーンなプレッピー美学、高品質なベーシック、シグネチャーのサイクリング&アウトドアライフスタイルモチーフで知られています。世代を超えて韓国の家族に着用されている証 — 韓国の財閥がライセンスコピーでなく本物のファッションブランドを作れることを示しました。',
    'Launched in 1997, Basic House became Korea\'s go-to brand for affordable, well-made everyday basics. Famous for "기본에 충실한" (faithful to the basics) philosophy — clean cuts, neutral palettes, accessible pricing. Became one of the first Korean fashion brands to successfully expand into China, pioneering K-fashion\'s first wave of pan-Asian retail expansion in the early 2000s.':
      '1997年に立ち上げられたベーシックハウスは、手頃な価格の高品質な日常ベーシックの韓国定番ブランドとなりました。「기본에 충실한（ベーシックに忠実）」の哲学 — クリーンなカット、ニュートラルなカラーパレット、アクセシブルな価格設定で有名です。2000年代初頭、K-ファッションの最初のアジア展開の波を先導し、中国市場への進出に成功した最初の韓国ファッションブランドの一つとなりました。',

    // Brand tags
    '#Streetwear': '#ストリートウェア',
    '#Minimalist': '#ミニマリスト',
    '#Collaboration': '#コラボレーション',
    '#Luxury': '#ラグジュアリー',
    '#Maximalist': '#マキシマリスト',
    '#Paris': '#パリ',
    '#Eyewear': '#アイウェア',
    '#ArtSpace': '#アートスペース',
    '#Experience': '#体験型',
    '#Digital-First': '#デジタルファースト',
    '#Avant-Garde': '#アバンギャルド',
    '#Gender-Fluid': '#ジェンダーフルイド',
    '#Conceptual': '#コンセプチュアル',
    '#Preppy': '#プレッピー',
    '#Street': '#ストリート',
    '#Campus': '#キャンパス',
    '#Platform': '#プラットフォーム',
    '#Digital': '#デジタル',
    '#Premium': '#プレミアム',
    '#Samsung': '#サムスン',
    '#Basics': '#ベーシック',
    '#Affordable': '#リーズナブル',
    '#China': '#中国',

    // K-Fashion Aesthetics
    '🎨 K-Fashion Aesthetics · 스타일 미학': '🎨 K-ファッション美学 · 스타일 미학',

    // Aesthetic genre names (Korean + English)
    '홍대 스트릿 (Hongdae Street)': '홍대 스트릿（弘大ストリート）',
    '청담 럭셔리 (Cheongdam Luxury)': '청담 럭셔리（清潭ラグジュアリー）',
    'Y2K 리바이벌 (Y2K Revival)': 'Y2K 리바이벌（Y2Kリバイバル）',
    '한복 퓨전 (Hanbok Fusion)': '한복 퓨전（한복フュージョン）',
    '공항 패션 (Airport Fashion)': '공항 패션（空港ファッション）',
    '고프코어 (Gorpcore)': '고프코어（ゴープコア）',
    '뉴트로 (Newtro)': '뉴트로（ニュートロ）',
    '미니멀 오피스 룩 (Minimal Office Look)': '미니멀 오피스 룩（ミニマルオフィスルック）',
    '고딩룩 (High School Look)': '고딩룩（高校生ルック）',
    '남친룩 (Boyfriend Look)': '남친룩（彼氏ルック）',
    '동탄미시룩 (Dongtan Missy Look)': '동탄미시룩（東灘ミシールック）',

    // Aesthetic descriptions
    'Born in the underground indie music scene around Hongik University. Bold graphic tees, oversized hoodies, distressed denim, chunky platform shoes, and statement accessories define this anti-conformist style. Key concept: 힙하다 (hip/cool).':
      '弘益大学周辺のアンダーグラウンドインディー音楽シーンから生まれました。大胆なグラフィックTシャツ、オーバーサイズフーディー、ダメージデニム、チャンキープラットフォームシューズ、インパクトのあるアクセサリーが反主流のスタイルを定義します。キーコンセプト：힙하다（ヒップ/クール）。',
    'Seoul\'s equivalent of Paris\'s 8th arrondissement. Clean lines, neutral palettes (beige, ivory, black), quality fabrics, and understated designer accessories. The goal is 우아하다 (elegant) and 세련됐다 (refined). Less is more.':
      'パリの第8区に相当するソウル。クリーンなライン、ニュートラルなパレット（ベージュ、アイボリー、ブラック）、上質な素材、控えめなデザイナーアクセサリー。目標は우아하다（エレガント）と세련됐다（洗練された）。少ないほど豊か。',
    '2000s nostalgia repackaged for Gen Z. Low-rise jeans, crop tops, velour tracksuits, metallic fabrics, butterfly clips, and tiny handbags are back — fueled by idol groups revisiting Y2K aesthetics. The era your parents warned you about is now the hottest trend.':
      '2000年代ノスタルジーをZ世代向けに再パッケージ。ローライズジーンズ、クロップトップ、ベロアジャージ、メタリック素材、バタフライクリップ、ミニバッグが帰ってきました — アイドルグループのY2K美学回帰がけん引。親世代が警告したあの時代が今最もホットなトレンドです。',
    'Contemporary designers weave traditional hanbok elements into modern wear — jeogori necklines on blazers, chima silhouettes in mini skirts, norigae (노리개) pendants as jewelry, and jeogori-inspired sleeves on contemporary tops. Fashion that honors 5,000 years of heritage.':
      '現代のデザイナーが伝統的な한복の要素を現代の衣服に織り込みます — ブレイザーへの저고리の襟、ミニスカートへの치마のシルエット、ジュエリーとしての노리개ペンダント、現代トップスへの저고리インスパイアのスリーブ。5,000年の文化遺産を敬うファッション。',
    'Korean celebrity culture transformed airports into impromptu runways. Formula: designer oversized hoodie/coat + luxury sneakers + designer mini bag + accessory mask. Every outfit gets photographed, analyzed on fashion blogs, and sells out within hours. 공항 패션 is its own genre.':
      '韓国のセレブ文化が空港を即興のランウェイに変えました。公式：デザイナーオーバーサイズフーディー/コート + 高級スニーカー + デザイナーミニバッグ + アクセサリーマスク。すべてのコーデが撮影・分析され、数時間で完売します。공항 패션はそれ自体がジャンルです。',
    'Outdoor gear reframed as high fashion. Technical fleece jackets, trail running shoes, waterproof cargo pants, and hiking backpacks worn on Seoul streets, not trails. Fueled by Korea\'s deeply embedded 등산 (hiking) culture and the weekend mountain-trip tradition.':
      'アウトドアギアをハイファッションとして再解釈。テクニカルフリースジャケット、トレイルランニングシューズ、防水カーゴパンツ、ハイキングバックパックをトレイルではなくソウルの街で着用。韓国に深く根付いた등산（登山）文化と週末の山行き伝統が後押し。',
    '"New" + "Retro" — Gen Z nostalgia for Korea\'s 1980s and 90s repackaged with modern irony. 통바지 (wide-leg pants), striped knits, retro sneakers (Fila, Reebok, Adidas Originals), and vintage-wash denim define the aesthetic dominating Korean street photography.':
      '「ニュー（New）」+「レトロ（Retro）」— Z世代が韓国の1980〜90年代へのノスタルジーを現代的なアイロニーで再パッケージ。통바지（ワイドレッグパンツ）、ストライプニット、レトロスニーカー（Fila、Reebok、Adidas Originals）、ヴィンテージウォッシュデニムが韓国ストリートフォトグラフィーを席巻する美学を定義します。',
    'Gangnam and Yeouido\'s corporate fashion identity. Tailored trousers in earth tones, structured blazers, slim-fit turtlenecks, leather oxfords. Korean office fashion emphasizes clean lines over bold statements — 단정하다 (neat and tidy) is the ultimate compliment.':
      '江南と여의도のコーポレートファッションアイデンティティ。アースカラーのテーラードトラウザー、構造的なブレザー、スリムフィットタートルネック、レザーオックスフォード。韓国のオフィスファッションは大胆な主張よりクリーンなラインを重視 — 단정하다（きちんとしている）が最高の褒め言葉。',
    'The quintessential Korean high-school style: heavy puffer 패딩 (down jacket) layered over a sports brand hoodie (언더아머, 나이키), paired with baggy shorts or tracksuit bottoms — regardless of winter temperature. The 패딩+반바지 combo (puffer coat + shorts) became an internationally viral meme. Pure Korean practical logic: warm on top, free on the bottom.':
      '韓国の高校生スタイルの真髓：厚い패딩（ダウンジャケット）をスポーツブランドのフーディー（언더아머、나이키）の上に着て、気温に関わらずバギーショーツやジャージのボトムスと合わせます。「패딩+반바지コンボ（ダウン+ショーツ）」は国際的にバイラルなミームとなりました。上は温かく、下は自由に — 韓国特有の実用ロジック。',
    'Oversized men\'s clothing worn by women — big hoodies, dad caps, oversize tees, baggy jeans, oversized blazers. The goal is 편해 보이는데 예쁜 (looks comfortable yet still pretty). Popularized by K-drama heroines borrowing their boyfriend\'s clothes. The boyfriend look has crossed into all genders and remains one of K-fashion\'s most enduring export aesthetics, widely replicated globally.':
      '女性が着る男性のオーバーサイズ服 — ビッグフーディー、ダッドキャップ、オーバーサイズTシャツ、バギージーンズ、オーバーサイズブレザー。目標は편해 보이는데 예쁜（楽そうなのに可愛い）。K-ドラマのヒロインが彼氏の服を借りるシーンで広まりました。彼氏ルックはあらゆる性別を超え、K-ファッション最も長続きする輸出美学の一つとなり、世界中で広く模倣されています。',
    'A uniquely Korean internet phenomenon — the "동탄 미시룩" describes the polished, brand-forward style of young 미시 (married women) in Dongtan new city suburbs. Key items: sleek puffer vest, slim-fit athleisure, Chanel belt bag, sneakers with hidden heel inserts, and a "put-together while running errands" aesthetic. Simultaneously admired, envied, and lovingly memed online.':
      '独自の韓国的インターネット現象 — 「동탄 미시룩」は東灘新都市郊外の若い미시（既婚女性）の洗練されたブランド重視のスタイルを表します。キーアイテム：スリークなパファーベスト、スリムフィットアスレジャー、シャネルベルトバッグ、隠れヒール入りスニーカー、「用事を済ませながらも完璧に整えた」美学。同時に羨望され、嫉妬され、愛情込めてネタにされています。',
    'SPECIAL: 패완얼 (패.션의 완.성은 얼.굴이다) — "Fashion is completed by the face." This brutally honest Korean proverb captures Korea\'s extreme 외모지상주의 (lookism): no outfit can elevate you unless your physical appearance already meets the standard. It\'s dark humor that reveals a real cultural truth — fueling the world-leading plastic surgery industry, obsessive skincare, and the phenomenon of 성형 tourism. Fashion in Korea is always, ultimately, personal.':
      'SPECIAL: 패완얼（패.션의 완.성은 얼.굴이다）— 「ファッションを完成させるのは顔だ」。この残酷なほど正直な韓国のことわざは、韓国の極端な외모지상주의（容貌至上主義）を凝縮しています：どんな服を着ても、外見が基準を満たしていなければ意味がない。これは暗いユーモアですが、真実の文化的洞察を示しています — 世界トップの美容整形産業、スキンケアへの執着、성형観光現象を生み出す源泉。韓国のファッションは、最終的には常に個人的なものです。',

    // Aesthetic tags
    'Streetwear': 'ストリートウェア',
    'Indie': 'インディー',
    'Bold': '大胆',
    'Elegant': 'エレガント',
    'Nostalgia': 'ノスタルジー',
    'Gen-Z': 'Z世代',
    'HanbokFusion': 'ハンボクフュージョン',
    'Traditional': '伝統的',
    'Modern': 'モダン',
    'Airport': 'エアポート',
    'Idol': 'アイドル',
    'Gorpcore': 'ゴープコア',
    'Outdoor': 'アウトドア',
    'Technical': 'テクニカル',
    'Newtro': 'ニュートロ',
    '80s-90s': '80〜90年代',
    'Office': 'オフィス',
    'Professional': 'プロフェッショナル',
    'High School': '高校生',
    'Practical': '実用的',
    'Oversized': 'オーバーサイズ',
    'Suburban': 'サバーバン',
    'Athleisure': 'アスレジャー',
    'Korean-Reality': '韓国の現実',

    // Idol Fashion section
    '⭐ Idol Fashion & Global Influence · 아이돌 패션': '⭐ アイドルファッションとグローバルな影響力 · 아이돌 패션',
    '아이돌 = 패션 아이콘 — Idols as Fashion Icons': '아이돌 = 패션 아이콘 — アイドルたちをファッションアイコンとして',
    'In Korea, K-pop idols don\'t just wear fashion — they create it. A single airport photo wearing a specific brand sells it out globally within hours. The "idol economy" has made Seoul the world\'s most efficient fashion trend accelerator. Every luxury house from Chanel to Bulgari now courts K-pop stars as their primary Asia brand ambassador, recognizing that a single idol endorsement outperforms any traditional advertising campaign.':
      '韓国では、K-ポップアイドルはファッションを着るだけでなく、ファッションを作り出します。特定のブランドを着た空港での一枚の写真が、数時間以内にグローバルで完売させます。「アイドル経済」はソウルを世界で最も効率的なファッショントレンド加速装置にしました。シャネルからブルガリまであらゆるラグジュアリーハウスが、一人のアイドルによる推薦が従来のどんな広告キャンペーンをも凌ぐことを認識し、K-ポップスターをアジアの主要ブランドアンバサダーとして迎え入れています。',

    // Idol fashion table headers
    'Artist 아티스트': 'アーティスト 아티스트',
    'Brand Partnership 브랜드': 'ブランドパートナーシップ 브랜드',
    'Since': '開始年',

    // Brand partnerships
    'Bottega Veneta Global Ambassador': 'ボッテガ・ヴェネタ グローバルアンバサダー',
    'Chanel House Ambassador + Jacquemus': 'シャネルハウスアンバサダー + ジャクムス',
    'Saint Laurent + Tiffany & Co.': 'サンローラン + ティファニー＆コー',
    'Dior + Cartier Global Ambassador': 'ディオール + カルティエ グローバルアンバサダー',
    'Celine + Bulgari Global Ambassador': 'セリーヌ + ブルガリ グローバルアンバサダー',
    'Celine Global Ambassador': 'セリーヌ グローバルアンバサダー',

    // Seoul Fashion Week section
    '🗓️ Seoul Fashion Week · 서울 패션위크': '🗓️ ソウルファッションウィーク · 서울 패션위크',
    '서울 패션위크 — Korea\'s Global Fashion Stage': '서울 패션위크 — 韓国のグローバルファッションステージ',
    'Seoul Fashion Week (서울 패션위크) is held twice yearly — March (S/S) and October (F/W) — at the iconic Dongdaemun Design Plaza (DDP). Founded in 2000 and achieving international press accreditation by 2010, it now attracts 300+ international buyers, journalists, and influencers from Paris, New York, and Tokyo. Over 60 Korean designers show each season, making Seoul one of the five most important fashion cities in the world.':
      'ソウルファッションウィーク（서울 패션위크）は年2回 — 3月（春夏）と10月（秋冬）— 象徴的な東大門デザインプラザ（DDP）で開催されます。2000年に創設され、2010年までに国際プレス認定を取得し、現在はパリ、ニューヨーク、東京から300人以上の国際バイヤー、ジャーナリスト、インフルエンサーを集めています。毎シーズン60以上の韓国人デザイナーがショーを行い、ソウルを世界で最も重要な5つのファッション都市の一つにしています。',
    'DDP — 동대문 디자인 플라자': 'DDP — 동대문 디자인 플라자（東大門デザインプラザ）',
    'Designed by the late Zaha Hadid, the Dongdaemun Design Plaza is one of Seoul\'s most striking architectural landmarks — a flowing, organic aluminum structure that appears to have landed from another dimension in the heart of Seoul\'s historic fashion district. During Seoul Fashion Week, every surface becomes a projection screen, every corridor a runway, every corner a pop-up installation. Visiting DDP is a K-fashion rite of passage.':
      '故ザハ・ハディドが設計した東大門デザインプラザは、ソウルで最も印象的な建築ランドマークの一つです — まるで別次元から着陸したかのような流動的で有機的なアルミ構造が、ソウルの歴史的なファッション地区の中心に立ちます。ソウルファッションウィーク期間中、あらゆる面がプロジェクションスクリーンに、あらゆる通路がランウェイに、あらゆる角がポップアップインスタレーションになります。DDPを訪れることはK-ファッションの通過儀礼です。',

    // Fashion Vocabulary table
    '📖 Fashion Vocabulary': '📖 ファッション語彙',
    'Fashion': 'ファッション',
    'Clothes / clothing': '服 / 衣服',
    'Style': 'スタイル',
    'Trend': 'トレンド',
    'Traditional Korean clothing': '韓国の伝統衣装',
    'Skirt': 'スカート',
    'Traditional jacket top (Hanbok)': '伝統的な上着（한복）',
    'Shoes': '靴',
    'Bag / purse': 'バッグ / 財布',
    'Accessories': 'アクセサリー',
    'Sale / discount': 'セール / 割引',
    'Brand': 'ブランド',
    'Influencer': 'インフルエンサー',

    // Seoul Fashion Districts
    '🏙️ Seoul Fashion Districts': '🏙️ ソウルのファッション地区',
    'Hongdae': '弘大',
    'Cheongdam-dong & Galleria': '清潭洞＆ガレリア',
    'Myeongdong': '明洞',
    'Garosu-gil': 'カロスキル',
    'Dongdaemun Market': '東大門市場',
    'Dongmyo Flea Market': '東廟フリーマーケット',

    // District descriptions
    'Indie streetwear, vintage shops, and youth culture near Hongik University. The birthplace of Korean underground fashion and still Seoul\'s most energetic creative district.':
      '弘益大学近くのインディーストリートウェア、ヴィンテージショップ、若者文化の中心地。韓国アンダーグラウンドファッションの発祥地であり、今もソウルで最もエネルギッシュなクリエイティブ地区です。',
    'Seoul\'s luxury fashion hub — Chanel, Louis Vuitton, and flagship K-Beauty stores alongside the iconic Galleria Department Store (갤러리아 백화점), whose APMT hall is covered in LED glass discs. Galleria is Korea\'s most prestigious luxury department store: Hermès, Prada, Bottega Veneta, and the legendary basement food market. Korea\'s Avenue Montaigne.':
      'ソウルのラグジュアリーファッションハブ — シャネル、ルイ・ヴィトン、K-ビューティーの旗艦店が、LEDガラスディスクで覆われたAPMTホールが象徴的な갤러리아 백화점（ガレリアデパート）と並びます。ガレリアはエルメス、プラダ、ボッテガ・ヴェネタ、伝説的な地下食品館を持つ韓国最高格のデパートです。韓国のモンテーニュ大通り。',
    'Once Seoul\'s top fashion destination, Myeongdong is now overwhelmingly a tourist area — streets are filled with foreign visitors and souvenir shops have replaced local fashion boutiques. Most Korean fashionistas have moved elsewhere. K-beauty stores, street food, and duty-free shopping still attract tourists, but it is rare to spot Korean fashion-conscious shoppers here today.':
      'かつてソウルのトップファッション目的地だった명동は、今や圧倒的に観光地となっています — 通りは外国人観光客で溢れ、地元のファッションブティックはお土産屋に取って代わられました。韓国のファッショニスタのほとんどは別の場所に移りました。K-ビューティーストア、屋台グルメ、免税ショッピングは今も観光客を惹きつけていますが、韓国人のファッション意識が高いショッパーを見かけることは今日では稀です。',
    'Garosu-gil\'s golden age has faded — a classic gentrification story. Soaring rents driven by its own fame pushed out the original boutiques and cafes that made it special. The beautiful tree-lined avenue remains, but the cutting-edge boutique scene has largely migrated to Seongsu-dong (성수동), Seoul\'s new creative district across the Han River.':
      '가로수길の黄金期は過ぎ去りました — 典型的なジェントリフィケーションの物語。自らの名声が生んだ高騰する賃貸料が、その特別さを生み出した元々のブティックやカフェを追い出しました。美しい並木道は残っていますが、最先端ブティックシーンは漢江の対岸にあるソウルの新しいクリエイティブ地区、성수동（聖水洞）へと大移動しました。',
    'The engine of Korean fast fashion — a labyrinth of 30,000+ shops operating 24 hours, 6 days a week. Wholesale buyers from across Asia arrive before sunrise. A designer can discover a trend Monday, manufacture it overnight, and have it in shops across Korea by Tuesday. The DDP sits at its center, bridging heritage market with global fashion week ambitions.':
      '韓国ファストファッションのエンジン — 週6日24時間稼働する3万以上の店舗の迷宮。アジア全域からの卸売りバイヤーが夜明け前に到着します。デザイナーは月曜にトレンドを発見し、一夜で製造し、火曜には韓国中の店舗に届けることができます。DDPがその中心に位置し、歴史的な市場とグローバルなファッションウィークの野望を橋渡ししています。',
    'Seoul\'s vintage fashion secret — a sprawling outdoor flea market where decades of Korean clothing history sell for near nothing. Military surplus, retro golf wear, 80s blazers. The "할아버지 패션" (grandfather fashion) that went from middle-aged men\'s market staple to Gen Z cult trend photographed in global street style magazines. Best bargain hunting in Seoul.':
      'ソウルのヴィンテージファッションの秘宝 — 数十年分の韓国の衣服の歴史がほぼただ同然で売られる広大な野外フリーマーケット。軍用サープラス、レトロゴルフウェア、80年代のブレザー。「할아버지 패션（おじいさんファッション）」が中高年男性の市場の定番からZ世代のカルトトレンドへと進化し、世界のストリートスタイル誌に撮影されています。ソウルで最高のバーゲンハンティングの場。',

    // Shopping Phrases
    '🛍️ Shopping Phrases': '🛍️ ショッピングフレーズ',
    'Can I try this on?': '試着してもいいですか？',
    'Do you have other colors?': '他の色はありますか？',
    'Do you have a smaller size?': 'もっと小さいサイズはありますか？',
    'How much is this?': 'これはいくらですか？',
    'It\'s too expensive.': '高すぎます。',
    'I\'ll take this one.': 'これにします。',

    // Hanbok section
    '👘 Hanbok — Traditional Korean Dress': '👘 한복 — 韓国の伝統衣装',
    'Hanbok Vocabulary': '한복語彙',
    '한복 (hanbok) is Korea\'s traditional clothing, characterized by vibrant colors and graceful lines. Women wear 저고리 (jeo-go-ri, jacket) + 치마 (chi-ma, skirt). Men wear 저고리 + 바지 (ba-ji, trousers). Visitors can rent 한복 near Gyeongbokgung Palace for free entry.':
      '한복は鮮やかな色彩と優美な線が特徴の韓国の伝統衣装です。女性は저고리（ジョゴリ、上着）+ 치마（チマ、スカート）を着用。男性は저고리 + 바지（バジ、ズボン）を着用します。경복궁（景福宮）近くで한복を借りると無料入場できます。',
    'The hanbok is so beautiful!': '한복はとても美しい！',
    'I want to try on a hanbok.': '한복を試着したいです。',
    'Where is the hanbok rental shop?': '한복レンタルショップはどこですか？',
    'May I take a photo?': '写真を撮ってもいいですか？',

    // Traditional Dress in Depth
    '🎩 한복, 갓, 상투 — Korea\'s Traditional Dress in Depth': '🎩 한복, 갓, 상투 — 韓国の伝統衣装を深掘り',
    '한복 (Hanbok)': '한복（ハンボク）',
    '갓 (Gat)': '갓（ガット）',
    '상투 (Sangtu)': '상투（サントゥ）',
    'Korea\'s traditional dress, worn throughout the Joseon Dynasty and still donned for major occasions. Women\'s hanbok: 저고리 (short wrap jacket) + 치마 (full, flowing skirt). Men\'s: 저고리 + 바지 (wide-legged trousers). Colors carried deep meaning — white for commoners (백의민족), bright primary colors for celebration. Today designers like 이영희 and 이상봉 bring hanbok to international runways, and 생활한복 (everyday hanbok) offers comfortable daily-wear versions.':
      '朝鮮王朝を通じて着用された韓国の伝統衣装で、今も主要な行事で着られています。女性用한복：저고리（短い上着）+ 치마（豊かで流れるようなスカート）。男性用：저고리 + 바지（広いズボン）。色には深い意味がありました — 庶民は白（백의민족）、お祝いには明るい原色。今日では이영희、이상봉などのデザイナーが한복を国際ランウェイに持ち込み、생활한복（生活한복）は日常着として快適に着られるバージョンを提供しています。',
    'The iconic black hat of the Joseon nobleman — a masterpiece of traditional craftsmanship woven from horsehair (말총) and bamboo. Its wide brim (양태) and cylindrical crown (모통) were markers of social status: only 양반 (nobility) could wear one in public. Different ranks wore different hats. The craft of gat-making (갓일) is now an UNESCO-recognized Intangible Cultural Heritage — one of Korea\'s most refined traditional art forms.':
      '朝鮮の양반（両班）の象徴的な黒い帽子 — 말총（馬の尾毛）と竹を編んで作られた伝統工芸の傑作。広い縁（양태）と円筒状の冠（모통）は社会的地位の印であり、공공장소では양반（貴族）のみが着用できました。異なる階級は異なる帽子を着用しました。갓일（갓을 만드는 기술）は現在UNESCO認定の無形文化遺産であり — 韓国の最も洗練された伝統芸術の一つです。',
    'The traditional Korean men\'s topknot — tied at the crown and worn under the 갓. Rooted in Confucian filial piety: one\'s body and hair, received from parents, must not be carelessly cut. When Emperor Gojong issued the 단발령 (Topknot Cutting Decree) in 1895 as part of modernization reforms, the backlash was enormous — nationwide protests and 의병 (righteous army) uprisings erupted, proving how deeply dress was tied to Korean identity and national honor.':
      '韓国の男性の伝統的な頭上でまとめたまげ — 頭頂部に縛り갓の下に着用。儒教的な孝行に根ざしており：親から受け継いだ体と髪を軽々しく切ることはできない。1895年に고종（高宗）皇帝が近代化改革の一環として단발령（断髪令）を出すと、反発は甚大でした — 全国的な抗議と의병（義兵）の봉기（蜂起）が勃発し、衣装と髪型が韓国のアイデンティティと国民的誇りにいかに深く結びついているかを証明しました。',

    // Traditional dress tags
    'Identity': 'アイデンティティ',

    // Asian Traditional Dress comparison
    'How Does Hanbok Compare to Other Asian Traditional Dress?': '한복は他のアジアの伝統衣装とどう違う？',
    'Each East and Southeast Asian country has a distinct traditional dress. Understanding the differences helps appreciate the unique cultural identity each garment carries.':
      '東アジアと東南アジアの各国には独自の伝統衣装があります。その違いを理解することで、それぞれの衣装が持つ独自の文化的アイデンティティをより深く鑑賞できます。',
    'Garment': '衣装',
    'Country': '国',
    'Key Silhouette & Features': '主なシルエット＆特徴',
    'Key Occasions': '主な着用場面',
    'Flowing A-line chi-ma, short wrap jeogori, vibrant block colors, curved neckline, norigae pendants. Seams are straight, silhouette is created by volume of fabric.':
      '流れるようなAラインの치마、短い巻き저고리、鮮やかなブロックカラー、丸みのある首元、노리개のペンダント。縫い目はまっすぐで、シルエットは生地のボリュームで作られます。',
    '설날, Chuseok, weddings, palace visits, 생활한복 for daily use': '설날、추석、結婚式、宮殿訪問、생활한복として日常使用',
    'T-shaped, straight-cut robe with wide obi (sash) tied elaborately at the back. Long sleeves, wooden geta sandals, tabi socks. Colors and patterns denote season and occasion.':
      'T字型の直線カットの着物で、幅広の帯（obi）を後ろで精巧に結びます。長い袖、木製の下駄、足袋。色と柄が季節と場面を表します。',
    'Coming-of-Age Day, tea ceremony, summer festivals (yukata), weddings': '成人の日、茶道、夏祭り（浴衣）、結婚式',
    'Body-hugging, form-fitting silhouette. Mandarin (high, stand-up) collar, side slits for movement, silk or brocade fabric. Originally Manchu, modernized in 1920s Shanghai.':
      '体にフィットするシルエット。マンダリンカラー（高い立ち衿）、動きやすい横スリット、シルクまたは錦の生地。元々は満州族のもので、1920年代の上海で近代化されました。',
    'Chinese New Year, formal banquets, weddings, national events': '旧正月、正式な宴席、結婚式、国家行事',
    'Long, tight-fitting tunic split at the sides from the waist down, worn over wide-leg trousers. High neckline, usually silk. White version is the iconic school uniform.':
      '腰から下が両サイドにスリットの入った長くタイトなチュニック、ワイドレッグのトラウザーの上に着用。高い首元、通常はシルク。白いバージョンが象徴的な学校制服です。',
    'National dress, school uniforms, weddings, Tết (New Year), formal occasions': '民族衣装、学校の制服、結婚式、テト（新年）、正式な場',
    'Long, loose-fitting wrap robe secured with a sash, knee-length felt boots (gutuls). Heavy wool or silk lined with felt for extreme cold. Animal motifs and bold colors for festivals.':
      '帯で留めた長くゆったりとしたラップローブ、膝丈のフェルトブーツ（グトル）。厳しい寒さのための重い羊毛またはフェルト裏地のシルク。祭りには動物モチーフと鮮やかな色。',
    'Naadam festival, Tsagaan Sar, daily wear in rural/steppe areas': 'ナーダム祭り、ツァガーンサル、農村・ステップ地帯での日常着',

    // Shopping Dialogue
    '💬 K-Fashion Shopping Dialogue · 쇼핑 대화': '💬 K-ファッションショッピング会話 · 쇼핑 대화',
    '🛍️ Scene 1: Hongdae Streetwear Store · 홍대 스트릿웨어 가게에서': '🛍️ シーン1：弘大ストリートウェアショップ · 홍대 스트릿웨어 가게에서',
    '💳 Scene 2: At the Checkout · 계산대에서': '💳 シーン2：レジにて · 계산대에서',
    'Do you have oversized hoodies?': 'オーバーサイズのフーディーはありますか？',
    'Yes, come this way. What color do you want?': 'はい、こちらへどうぞ。どの色をご希望ですか？',
    'Black or gray tones, please. Is it free size?': '黒かグレー系でお願いします。フリーサイズですか？',
    'Yes, it\'s free size! How tall are you? If over 175cm, I recommend XL.': 'はい、フリーサイズです！身長はどのくらいですか？175cm以上であればXLをお勧めします。',
    'How much is this? Can I pay by card?': 'これはいくらですか？カードで払えますか？',
    'It\'s 49,000 won. Of course you can use a card! Do you have a membership card?': '49,000ウォンです。もちろんカードでお支払いできます！メンバーシップカードはお持ちですか？',
    'No. I don\'t need a receipt. Thank you!': 'いいえ。レシートは要りません。ありがとうございます！',
    'Thank you! Please come again~ It\'ll suit you perfectly!': 'ありがとうございます！またお越しください〜 きっと似合いますよ！',

    // Free Size Culture tip
    '프리 사이즈 문화 — Free Size Culture': '프리 사이즈 문화 — フリーサイズ文化',
    'Korean clothing stores heavily favor "프리 사이즈" (Free Size / One Size Fits All) — typically fitting Korean sizes 44–66 (roughly XS to M in Western sizing). For larger frames, look for "빅 사이즈" sections. Online platforms like Musinsa (무신사) and W Concept have dramatically expanded size ranges due to global demand. Before browsing, always ask 사이즈가 어떻게 돼요? (What sizes do you carry?)':
      '韓国の衣料品店は「프리 사이즈」（フリーサイズ / ワンサイズフィット）を強く好みます — 通常、韓国サイズ44〜66（西洋のXS〜Mに相当）に対応。大きめの体型の方は「빅 사이즈」セクションをお探しください。무신사やW Conceptなどのオンラインプラットフォームはグローバルな需要によりサイズ展開を大幅に拡大しました。ブラウズ前には「사이즈가 어떻게 돼요?（どんなサイズを取り扱っていますか？）」と必ず聞きましょう。',

    // ── K-Gaming page (kgaming.html) ────────────────────────────

    // Hero
    '🎮 K-Gaming ': '🎮 K-ゲーミング ',
    'South Korea invented competitive gaming culture. The PC방, professional esports, and the greatest players in the world — this is where gaming became a national sport.':
      '韓国は競技ゲーミング文化を世界で最初に作り上げた国です。PC방、プロeスポーツ、そして世界最高のプレイヤーたち — ここでゲームは本物のスポーツになりました。',

    // Stats labels
    'Korean game market value': '韓国ゲーム市場規模',
    'PC방 nationwide': '全国PC방数',
    'LoL World Championship wins': 'LoL世界選手権優勝数',
    'Faker World titles': 'Faker世界タイトル数',
    'Year pro gaming was born': 'プロゲーミング誕生年',
    'Koreans who game regularly': '定期的にゲームする韓国人の割合',

    // Section headings (correct keys matching actual HTML)
    '⏳ K-Gaming Timeline · 한국 게임의 역사': '⏳ K-ゲームタイムライン · 한국 게임의 역사',
    '🌟 Korean Gaming Legends · 한국 게임 영웅들': '🌟 韓国ゲーミングレジェンド · 한국 게임 영웅들',
    '🎮 Iconic Korean Games & Franchises · 한국을 대표하는 게임들': '🎮 韓国を代表するゲームとフランチャイズ · 한국을 대표하는 게임들',
    '📺 Korean Game Streaming Culture · 인터넷 방송 문화': '📺 韓国ゲームストリーミング文化 · 인터넷 방송 문화',
    '🏆 Esports Leagues & Teams · e스포츠 리그와 팀': '🏆 eスポーツリーグ＆チーム · e스포츠 리그와 팀',
    '🏪 PC방 Culture · 피씨방 문화': '🏪 PC방文化 · 피씨방 문화',
    '☕ PC방 Inside Stories · 피씨방 뒷이야기': '☕ PC방裏話 · 피씨방 뒷이야기',
    '💬 Korean Gamer Slang · 게이머 은어': '💬 韓国ゲーマースラング · 게이머 은어',
    '📖 Gaming Vocabulary · 게임 어휘': '📖 ゲーム語彙 · 게임 어휘',

    // Timeline — titles
    'Korea Builds the World\'s Fastest Internet': '韓国が世界最速のインターネットを構築',
    '🏆 IMF Crisis Accidentally Creates PC방 Culture': '🏆 IMF危機が偶発的にPC방文化を生み出す',
    'OGN — The World\'s First Esports TV Channel': 'OGN — 世界初のeスポーツ専門TVチャンネル',
    '🏆 Korea Creates the World\'s First Professional Gaming Association': '🏆 韓国が世界初のプロゲーミング協会を設立',
    '— Emperor of Terran vs. Storm Zerg': '— テラン皇帝 vs. 嵐のザーグ',
    '🏆 Faker Debuts at 16 — "The Unkillable Demon King"': '🏆 Fakerが16歳でデビュー —「不滅の魔王」',
    'PUBG — Korea Defines the Battle Royale Genre': 'PUBG — 韓国がバトルロイヤルジャンルを定義する',
    '🏆 Faker Wins His Fourth World Title — At Home in Seoul': '🏆 Fakerがソウルのホームで4度目の世界タイトルを獲得',

    // Timeline — descriptions
    'Korea\'s government launches a national broadband initiative. By the mid-1990s, Korea has one of the world\'s fastest and most affordable internet infrastructures — laying the technological foundation for an entire gaming culture. Without this, there is no PC방, no StarCraft, no Faker.':
      '韓国政府の超高速インターネット普及政策により、1990年代中頃に韓国は世界最高水準のインターネットインフラを整備しました。PC방、スタークラフト、ペイカー — これらすべてはここから始まりました。',
    'The 1997 Asian Financial Crisis devastated Korea. Hundreds of thousands lost their jobs overnight. To survive, unemployed Koreans converted underground spaces into PC방 — charging ₩1,000/hour. Then Blizzard released StarCraft in 1998. The perfect storm: cheap broadband PCs, desperate entrepreneurs, and a game that rewarded pure skill. PC방 count exploded from hundreds to over 20,000 within two years.':
      '1997年のアジア通貨危機が韓国を直撃しました。一夜にして数十万人が職を失い、生き残るために地下室や空き店舗をPC방へと改装しました。時給1,000ウォン。そして1998年にブリザードがスタークラフトをリリース。安価な高速PC・窮地に立たされた起業家・純粋なスキルが報われるゲームが揃い、PC방の数は2年以内に数百から20,000店以上へと爆発的に増加しました。',
    'OGN (OnGameNet) launches as the world\'s first cable TV channel dedicated entirely to competitive gaming. StarCraft matches are broadcast with full sports-production quality — commentary, slow-motion replays, player close-ups. Korean pro gamers become celebrities appearing in ads and teen magazines. A decade before Twitch, Korea invented livestreamed gaming as entertainment.':
      'OGN（オンゲームネット）が世界初の競技ゲーミング専門ケーブルTVチャンネルとして開局。スタークラフトの試合がスポーツ中継クオリティ — 実況、スローモーション、選手のクローズアップ — で放送されました。韓国のプロゲーマーが広告や少年誌に登場する有名人になりました。Twitchの10年前に、韓国はゲーム配信をエンターテインメントとして発明したのです。',
    'The Korea e-Sports Association (KeSPA / 한국e스포츠협회) is founded, officially recognizing esports as a profession. For the first time anywhere in the world, video game players have signed contracts, monthly salaries, team houses, coaches, and regulated competition rules. Korea becomes the first country on Earth to treat competitive gaming as a legitimate career.':
      '韓国eスポーツ協会（KeSPA / 한국e스포츠협회）が設立され、eスポーツが公式職業として認定されました。世界で初めて、ビデオゲームプレイヤーが正式な契約書、月給、チームハウス、コーチ、規定された競技ルールを持つことになりました。韓国は競技ゲーミングを正規のキャリアとして扱った世界初の国となりました。',
    '임요환 (테란의 황제 — Emperor of Terran) and 홍진호 (폭풍 저그 — Storm Zerg) become Korea\'s first true gaming celebrities — appearing on variety shows, making cosmetics ads, and selling out stadiums. 홍진호\'s perennial runner-up career earns him the affectionate title 콩라인 (second-place curse) — a meme still used in Korean internet culture today. Fan clubs of tens of thousands gather for every match.':
      '임요환（테란의 황제 — テランの皇帝）と홍진호（폭풍 저그 — 嵐のザーグ）は韓国初の真のゲーミングセレブとなり、バラエティ番組出演、化粧品広告、スタジアムを満員にしました。홍진호の万年準優勝キャリアは「콩라인（2位の呪い）」という愛称を生み出し、今も韓国インターネット文化で使われるミームです。数万人のファンクラブが毎試合集まりました。',
    'Lee Sang-hyeok (이상혁), 16 years old, debuts for SKT T1 in the LCK — and wins the World Championship in his very first season. His skill earns him the title 불멸의 악마왕 (Unkillable Demon King), coined by a Chinese caster who failed to kill him during a match and named him on the spot. The debate about the greatest esports player of all time begins — and largely ends — with Faker.':
      '이상혁（ペイカー）、16歳でSKT T1としてLCKにデビューし、最初のシーズンでそのまま世界チャンピオンになりました。불멸의 악마왕（不滅の魔王）の称号は、試合中に彼を倒せなかった中国のキャスターがその場でつけた名前です。歴代最高のeスポーツ選手の議論は、ペイカーから始まり、ペイカーで終わります。',
    'Krafton releases PUBG: Battlegrounds — one of the highest-selling PC games of all time, peaking at 3.2 million concurrent players. The battle royale format (100 players, shrinking map, one winner) is now a global design standard, directly inspiring Fortnite, Apex Legends, and dozens of successors. Korean game development proves it can define global genres.':
      'クラフトンがPUBG: バトルグラウンドをリリース — 史上最多販売PCゲームの一つで、同時接続者数320万人を記録。100人が戦い、マップが縮小し、一人が勝つバトルロイヤル形式は今やグローバルなデザイン標準となり、フォートナイト、エイペックスレジェンド、数十の後続作に直接影響を与えました。韓国のゲーム開発はグローバルなジャンルを定義できることを証明しました。',
    'The 2023 World Championship final is held at Gocheok Sky Dome (고척 스카이돔) in Seoul. Faker, now 27, leads T1 to a fourth world title. The roar of the home crowd is deafening. Korean media covers it like a national sporting moment. The greatest player in the game\'s history, at the biggest match of his career, in his home city, winning his fourth championship. A moment that transcended esports.':
      '2023年の世界選手権決勝がソウルの고척 스카이돔（高尺スカイドーム）で開催されました。27歳となったFakerがT1を4度目の世界タイトルへと導きました。ホームの大歓声は耳をつんざくほど。韓国メディアは国家的スポーツの瞬間として報道しました。ゲーム史上最高の選手が、キャリア最大の試合で、地元の都市で、4度目の優勝を果たす — eスポーツを超えた瞬間でした。',

    // Gaming Legends — info-box
    'Why Korean Gamers Are Different · 연습 벌레 문화': 'なぜ韓国ゲーマーは違うのか · 연습 벌레 문화',
    'Korean pro gamers live and train together in 팀 하우스 (team houses), grinding 12–14 hours daily. The culture of 연습 벌레 (practice obsessive) is not just dedication — it is a national identity. Korea\'s gaming legends are not just athletes; they are cultural icons with fan clubs, national media coverage, and the same celebrity status as K-pop idols.':
      '韓国のプロゲーマーたちは팀 하우스（チームハウス）で共同生活し、毎日12〜14時間グラインドします。연습 벌레（練習の虫）文化は単なる献身ではなく — 国民的アイデンティティです。韓国のゲーミングレジェンドは単なるアスリートではありません。K-POPアイドルと同等のファンクラブ、全国メディア露出、セレブリティ地位を持つ文化的アイコンです。',

    // Gaming Legends — chef cards
    'T1 · League of Legends Mid Laner': 'T1 · リーグ・オブ・レジェンド ミッドレーナー',
    'The universally acknowledged greatest esports player who ever lived. Debuted for SKT T1 at 16 and won his first World Championship that same year. Four total titles (2013, 2015, 2016, 2023) — a record that may never be broken. His alias "불멸의 악마왕" (Unkillable Demon King) was coined by a Chinese caster who tried to kill him during a tournament and failed. Appeared in TIME\'s 100 Most Influential People. When T1 won in Seoul in 2023, his childhood neighbourhood held a street festival in his honour.':
      '普遍的に認められた史上最高のeスポーツ選手。16歳でSKT T1にデビューし、同年に初の世界チャンピオンになりました。合計4つのタイトル（2013、2015、2016、2023年）— 破られることのない記録かもしれません。別名「불멸의 악마왕（不滅の魔王）」は、トーナメント中に彼を倒そうとして失敗した中国のキャスターが命名しました。TIMEの「最も影響力のある100人」に選出。2023年T1がソウルで優勝した際、彼の幼少期の地元では彼を称えるストリートフェスティバルが開催されました。',
    'SKT T1 · StarCraft: Brood War Terran': 'SKT T1 · スタークラフト: ブルードウォー テラン',
    'The original superstar of Korean esports — nicknamed 황제 (The Emperor). Lim Yo-hwan was the blueprint for what a gaming celebrity could be: cosmetics ads, brand endorsements, variety TV appearances, and over 500,000 fan cafe members. He also served in the Korean Air Force Esports Team (공군 ACE) as his mandatory military service — staying competitive while in uniform. The pioneer who made it possible for Faker to exist.':
      '韓国eスポーツ最初のスーパースター — 황제（皇帝）の愛称を持つ。임요환はゲームセレブのあり方の原型でした：化粧品広告、ブランドエンドースメント、バラエティTV出演、50万人以上のファンカフェ会員。また공군 ACE（空軍eスポーツチーム）に所属し、軍服を着ながらも競技を続けました。Fakerが存在することを可能にした先駆者です。',
    'SKT T1 · StarCraft: Brood War Zerg': 'SKT T1 · スタークラフト: ブルードウォー ザーグ',
    'Perhaps the most beloved player in Korean esports — not for winning, but for a legend of glorious eternal second place. Despite being one of the most gifted Zerg players ever, 홍진호 finished runner-up 3 times in the OSL and became the face of 콩라인 (Bean Line — Second-Place Curse). 콩라인 is still widely used in Korean internet culture to describe anyone cursed to always finish second. After retiring he became a beloved variety show personality and content creator.':
      'おそらく韓国eスポーツで最も愛されている選手 — 勝利のためではなく、栄光の永遠の準優勝という伝説で。史上最も才能あるザーグプレイヤーの一人であるにもかかわらず、홍진호はOSLで3回準優勝し、콩라인（コンライン — 2位の呪い）の顔となりました。콩라인は今も韓国インターネット文化で常に2位になる人を表す言葉として広く使われています。引退後はバラエティ番組の人気者とコンテンツクリエイターとして活躍しています。',
    'KT Rolster · StarCraft: Brood War Terran': 'KTロルスター · スタークラフト: ブルードウォー テラン',
    'Known as the 완성형 테란 (Complete Terran) and often considered the greatest StarCraft: Brood War player ever. Flash\'s APM routinely exceeded 400, with mechanical precision rarely seen before or since. 4 OSL titles and 3 MSL titles — the most decorated individual in StarCraft history. Korean gamers say: "임요환 made you want to become a gamer; Flash made you want to quit because you\'d never be as good."':
      '완성형 테란（完成形テラン）として知られ、スタークラフト: ブルードウォー史上最高の選手と見なされることも多い。FlashのAPMは常に400を超え、その機械的精度は前後にほとんど見られないものでした。OSL4回・MSL3回優勝 — スタークラフト史上最多の個人タイトル保持者。韓国のゲーマーはこう言います：「임요환はゲーマーになりたいと思わせる。Flashは自分が決してそこまで到達できないと知ってゲームをやめたいと思わせる。」',
    'DRX · League of Legends ADC': 'DRX · リーグ・オブ・レジェンド ADC',
    'For ten years, Deft was considered one of the world\'s best ADC players — but never a World Champion. A veteran of near-misses. Then in 2022, leading underdog DRX — who had even needed to qualify through the play-in stage — he won the World Championship at age 26. In the post-match interview, his voice broke: "I never gave up." The entire Korean esports community wept with him.':
      '10年間、Deftは世界最高のADCプレイヤーの一人とされながら — 一度も世界チャンピオンになれませんでした。惜しい場面を経験し続けたベテラン。そして2022年、プレイイン予選からの出場が必要だったアンダードッグのDRXを率いて、26歳で世界選手権を制しました。試合後のインタビューで、彼の声は震えました：「諦めたことはなかった。」韓国eスポーツコミュニティ全体が彼と共に涙を流しました。',
    'Hwaseung OZ · StarCraft: Brood War Zerg': '화승OZ · スタークラフト: ブルードウォー ザーグ',
    '저그의 황제 (King of Zerg) — the most dominant Zerg player in StarCraft history. Known for revolutionary aggression and multi-pronged attacks that redefined how Zerg could be played. Alongside Flash he formed one of the greatest rivalries in esports — the two dominated the entire Brood War era between them. Often described as the most gifted natural talent the game produced, combining Flash-level mechanics with unpredictability no opponent could fully prepare for.':
      '저그의 황제（ザーグの皇帝）— スタークラフト史上最も支配的なザーグプレイヤー。ザーグの可能性を再定義した革命的な攻撃性と多方面への攻撃で知られています。Flashと並んでeスポーツ史上最も偉大なライバル関係の一つを形成し、二人でブルードウォーの時代全体を支配しました。Flash級のメカニクスと誰も完全に準備できない予測不可能性を兼ね備えた、ゲームが生み出した最も才能ある選手としてよく語られます。',

    // Iconic Games — drama tags (English only; Korean tags left as-is)
    'Esports Pioneer': 'eスポーツの先駆者',
    'Nostalgic Classic': 'ノスタルジックな名作',
    'Childhood Classic': '子ども時代の名作',
    'MMORPG Pioneer': 'MMORPGの先駆者',

    // Iconic Games — drama descriptions
    'The game that created Korean esports. Released in 1998, StarCraft became a cultural phenomenon — a national sport. The strategic depth between Terran, Zerg, and Protoss at elite APM levels elevated it to a mind sport comparable to chess. OGN and MBC Game broadcast StarCraft 24/7 for over a decade. 스타리그 matches sold out arenas. Pro players had fan clubs, CF appearances, and action figures.':
      '韓国eスポーツを作ったゲーム。1998年のリリース後すぐに文化的現象、国民的スポーツとなりました。エリートAPMレベルでのテラン・ザーグ・プロトス間の戦略的深さは、チェスに匹敵するマインドスポーツへと昇華しました。OGNとMBCゲームが10年以上24時間スタークラフトを放映し、스타리그の試合がアリーナを満員にしました。プロ選手にはファンクラブ、CF出演、アクションフィギュアがありました。',
    'The current home of Korean esports dominance. Korean teams have won more World Championships than any other country. The LCK (League Champions Korea) is the world\'s most prestigious esports league. T1 with Faker is the most successful team in esports history. Korean training methods became the global standard — every region imports Korean coaches and players. "한국 서버" (Korean server) is synonymous with the highest skill level on Earth.':
      '現在の韓国eスポーツ支配の中心地。韓国チームは他のどの国よりも多くの世界選手権で優勝しています。LCK（リーグチャンピオンズコリア）は世界で最も権威あるeスポーツリーグです。FakerとのT1はeスポーツ史上最も成功したチームです。韓国のトレーニング方法がグローバル標準となり、すべての地域が韓国のコーチと選手をインポートしています。「한국 서버」（韓国サーバー）は地球上で最高のスキルレベルと同義です。',
    'Korea\'s defining domestic MMORPG — a clan-war medieval fantasy where player kingdoms rise and fall. Lineage introduced blood pledge clan systems and open-world PvP so intense that real-world court cases occurred over in-game territory disputes. Its mobile successors 리니지M and 리니지2M became multi-billion-dollar franchises. Lineage\'s clan politics inspired a generation of Korean online game design.':
      '韓国を代表する国産MMORPG — プレイヤーの王国が栄枯盛衰する血盟クランの中世ファンタジー。リネージュは血盟クランシステムとオープンワールドPvPを導入し、ゲーム内領土争いが実際の裁判にまで発展するほど激しいものでした。モバイル後継作리니지Mと리니지2Mは数兆円規模のフランチャイズに成長しました。リネージュのクラン政治は韓国オンラインゲームデザインの世代を刺激しました。',
    'Korea\'s most nostalgic game — a 2D side-scrolling MMORPG that captured an entire generation. For Korean millennials, 메이플스토리 is the ultimate childhood memory: mushroom dungeons at Henesys, grinding for hours in PC방 after school. Still actively maintained with 180 million registered accounts globally. The franchise expanded into mobile and spinoffs. Nexon is now a global gaming conglomerate worth billions.':
      '韓国で最もノスタルジックなゲーム — 世代全体を虜にした2Dサイドスクロールのオンラインゲーム。韓国のミレニアル世代にとって、메이플스토리は究極の子ども時代の記憶です：ヘネシスのキノコダンジョン、放課後にPC방で何時間もグラインド。現在もグローバルで1億8千万のアカウントが登録されており活発に運営されています。フランチャイズはモバイルやスピンオフに拡大。Nexonは今や数十億ドル規模のグローバルゲームコングロマリットです。',
    'Krafton\'s PUBG popularized battle royale globally — the template Fortnite, Apex Legends, and Warzone were built from. Peak concurrent players: 3.2 million. Krafton IPO\'d in 2021 at over ₩24 trillion valuation. The in-game victory message "치킨 먹자" (let\'s eat chicken = let\'s win) became a cultural export. PUBG Mobile dominates Southeast Asian mobile markets.':
      'クラフトンのPUBGはバトルロイヤルをグローバルに普及させました — フォートナイト、エイペックスレジェンド、ウォーゾーンが構築された原型です。最大同時接続プレイヤー数：320万人。クラフトンは2021年に24兆ウォン以上の評価額でIPOしました。ゲーム内の勝利メッセージ「치킨 먹자」（チキンを食べよう = 勝った）は文化的輸出品となりました。PUBG Mobileは東南アジアのモバイル市場を支配しています。',
    'Officially the highest-grossing PC game in history — over $20 billion in lifetime revenue, surpassing World of Warcraft. A 2D beat-em-up MMORPG with deep class systems. Wildly dominant in China (地下城与勇士), where Chinese servers account for most of its revenue. Despite enormous financial success, it remains little-known in Western gaming — the quintessential invisible giant of Korean game development.':
      '公式に史上最高収益のPCゲーム — 累計収益200億ドル以上でワールド・オブ・ウォークラフトを超えています。深いクラスシステムを持つ2Dベルトスクロールアクションオンラインゲーム。中国（地下城与勇士）で圧倒的な人気を誇り、そこからの収益が大半を占めます。莫大な財務的成功にもかかわらず、西洋のゲーミングではほとんど知られていない — 韓国ゲーム開発の典型的な「見えない巨人」です。',
    'Korea\'s beloved mascot racer — often called the "Korean Mario Kart" but with deeper cultural roots in East Asia. The PC game of Korean elementary students throughout the 2000s, played endlessly in PC방 with friends. Its Korean-designed characters and drifting mechanics made it a cultural institution broadcast on OGN. 카트라이더: 드리프트 (2023) relaunched the franchise globally. Its character 다오 is one of Korea\'s most recognizable game icons.':
      '韓国が愛するマスコットレーサー — しばしば「韓国版マリオカート」と呼ばれますが、東アジアではより深い文化的ルーツがあります。2000年代を通じて韓国の小学生がPC방で友達と延々と遊んだPCゲームです。韓国デザインのキャラクターとドリフトメカニクスがOGNで放映される文化的なものとなりました。카트라이더: 드리프트（2023）がフランチャイズをグローバルに再スタートさせました。キャラクターの다오は韓国で最も認知度の高いゲームアイコンの一つです。',
    'Officially certified by Guinness World Records as the world\'s longest-running commercial MMORPG — and it predates Ultima Online, commonly mislabeled as the "first MMORPG." Based on cartoonist Kim Jin\'s (김진) manhwa set in the Goguryeo Kingdom era, 바람의 나라 launched in 1996 and is still running in 2026 — 30 years and counting. It introduced the foundational systems of online RPGs: persistent world, player-driven economy, guild communities, and leveling progression. Every MMORPG that came after owed a debt to this Korean creation.':
      'ギネス世界記録により世界最長運営の商用MMORPGとして公式認定 — 「最初のMMORPG」とよく誤称されるウルティマ・オンラインよりも先に存在していました。漫画家김진（キム・ジン）の高句麗時代を舞台にした漫画を原作として、바람의 나라は1996年にローンチされ、2026年現在も運営中 — 30年以上続いています。永続的なワールド、プレイヤー主導の経済、ギルドコミュニティ、レベリング進行など、オンラインRPGの基礎システムを導入しました。その後に続くすべてのMMORPGはこの韓国の創造物に恩義があります。',
    'Korea\'s beloved artillery cult classic — a free-to-play turn-based multiplayer game where players aim cannon shots across terrain, calculating wind direction and gravity to destroy each other\'s tanks. In PC방 of the early 2000s, 포트리스 was the "in-between game" — played in 20-minute sessions between StarCraft matches. Its physics-based aiming system created fierce competition despite simple graphics, and its free-to-play model was a decade ahead of the industry. The concept predates Angry Birds by ten years. A classic of the 아포칼립스 era, it remains one of Korea\'s most nostalgic gaming memories.':
      '韓国が愛する砲撃カルトクラシック — 風向と重力を計算して互いのタンクを破壊する無料ターン制マルチプレイゲーム。2000年代初頭のPC방では、포트리스はスタークラフトの試合の合間に20分セッションで遊ぶ「間のゲーム」でした。シンプルなグラフィックにもかかわらず物理ベースの照準システムが激しい競争を生み出し、無料プレイモデルは業界の10年先を行っていました。この概念はアングリーバードより10年前に存在しました。アポカリプス時代のクラシックとして、韓国で最もノスタルジックなゲームの記憶の一つです。',
    'Nexon\'s colorful bubble-shooting multiplayer — trap your opponents in bubbles before they trap you. 크레이지아케이드 BnB was Korea\'s great equalizer: the entry-point game for kids who found StarCraft overwhelming, for girls who were told "games aren\'t for you," and for anyone wanting quick fun in PC방. At its peak it had millions of concurrent Korean players. Its cheerful OST became meme material decades later, and the game\'s community-chat culture — mixing competition with friendship — was unlike anything else. It remains the gateway game of 2000s Korean childhood nostalgia.':
      'ネクソンのカラフルなバブルシューティングマルチプレイ — 相手があなたをバブルに閉じ込める前に相手をバブルに閉じ込めよう。크레이지아케이드 BnBは韓国の偉大な平等化装置でした：スタークラフトが難しすぎた子どもたち、「ゲームは女の子のものじゃない」と言われた女の子たち、PC방でサクッと楽しみたい人全員の入り口ゲーム。最盛期には何百万ものアカウントが同時接続していました。明るいOSTは数十年後にもミームの素材となり、競争と友情が交じるコミュニティチャット文化は他に類を見ないものでした。2000年代韓国の子ども時代ノスタルジアの定番ゲームとして残っています。',
    'Made in California, spiritually belonging to Korea. Diablo II was arguably more culturally embedded in Korean PC방 than anywhere else on Earth. The phrase "배틀넷 하러 가자" (let\'s go on Battle.net) was near-synonymous with Diablo II. Korean players pioneered the power-leveling and item-trading markets that predated modern gaming black economies. The 소서리스 (Sorceress) and 팔라딘 (Paladin) build debates were the subject of serious PC방 discussions. Its 2021 remaster Diablo II: Resurrected sold massively in Korea — 20 years of nostalgia had not faded in the slightest.':
      'カリフォルニアで作られ、精神的な故郷は韓国。ディアブロIIはおそらく地球上のどこよりも韓国のPC방に文化的に浸透していました。「배틀넷 하러 가자」（バトルネットに行こう）というフレーズはディアブロIIとほぼ同義でした。韓国のプレイヤーは現代のゲームブラック経済に先行するパワーレベリングとアイテム取引市場を開拓しました。ソーサレスとパラディンのビルド議論はPC방での真剣な議題でした。2021年のリマスター「ディアブロII: リザレクテッド」は韓国で爆発的に売れました — 20年分のノスタルジアはまったく褪せていませんでした。',
    'The Korean MMORPG that conquered Southeast Asia. Gravity\'s Ragnarok Online — based on Lee Myung-Jin\'s (이명진) manhwa — brought bright 2D sprite aesthetics and European medieval fantasy to Korean online gaming, a distinct shift from Lineage\'s darker world. Its 공성전 (Castle Siege) guild-vs-guild PvP, where guilds fight to control castle ownership for economic bonuses, became a defining Korean game mechanic copied by dozens of successors. Ragnarok Online exported Korean gaming culture to the Philippines, Thailand, Indonesia, and Brazil — where it built active communities that persist to this day.':
      '東南アジアを征服した韓国のMMORPG。Gravityのラグナロクオンライン — 이명진（イ・ミョンジン）の漫画を原作とし — 明るい2Dスプライト美学とヨーロッパ中世ファンタジーを韓国オンラインゲームにもたらし、リネージュの暗い世界からの明確な転換でした。경제ボーナスのためにギルドが城の支配権を争う공성전（城攻め）ギルドvs.ギルドPvPは、数十の後継作がコピーした韓国ゲームの定義的なメカニクスとなりました。ラグナロクオンラインは韓国ゲーミング文化をフィリピン、タイ、インドネシア、ブラジルへと輸出し、今日まで続く活発なコミュニティを築きました。',
    'Korea\'s homegrown FPS powerhouse — at its peak, 서든어택 was played in more Korean PC방 than Counter-Strike. Developed by GameHi and published by Nexon, it offered a PC방-optimized Korean FPS experience: fast matchmaking, Korean-specific maps, and a 클랜 시스템 (clan system) with 명예 계급 (honor ranks) that created deep community loyalty. The game\'s distinctly Korean FPS culture — dramatic callouts, high-APM aim, clan tournaments at 오락실-style local events — shaped a generation of Korean FPS players. Though now largely retired, veterans of 서든어택 form a significant portion of Korea\'s professional FPS talent pipeline.':
      '韓国産FPSのプライド — 最盛期、서든어택は韓国のPC방でカウンターストライクよりも多く遊ばれていました。GameHiが開発しNexonが配信し、PC방最適化された韓国FPS体験を提供しました：高速マッチメイキング、韓国特有のマップ、深いコミュニティ忠誠心を生み出す명예 계급（名誉ランク）付きのクランシステム。劇的なコールアウト、高APMエイム、오락실スタイルのローカルイベントでのクラントーナメントという、明確に韓国らしいFPS文化が韓国FPSプレイヤーの世代を形成しました。現在ほとんど引退しましたが、서든어택のベテランは韓国のプロFPS人材パイプラインの相当部分を占めています。',

    // Streaming Culture — info-box
    'Korea Invented Game Streaming — Before Twitch Existed': 'Twitchより先に — 韓国がゲーム配信を発明した',
    '아프리카TV (AfreecaTV) launched in 2006 — four years before Twitch — as the world\'s first platform built around live video streaming. Its donation currency 별풍선 (star balloons) is the direct ancestor of Twitch Bits and YouTube Super Chats. The culture of BJ (Broadcasting Jockey) — a solo streamer earning income through fan donations — was entirely a Korean invention.':
      '아프리카TV（AfreecaTV）は2006年にTwitchより4年早く、ライブ動画配信を中心とした世界初のプラットフォームとして登場しました。その寄付通貨별풍선（スターバルーン）はTwitchビッツとYouTubeスーパーチャットの直接の祖先です。ファンの寄付で収入を得るソロストリーマーであるBJ（放送ジョッキー）の文化は、完全に韓国の発明でした。',

    // Streaming Culture — genre cards
    'Korea\'s original live-streaming platform (2006). Home of BJ culture — personal broadcasters who build audiences through personality and skill. 아프리카 = "Any Free Cast." Dominated Korean gaming streaming through the 2010s. Known for epic StarCraft and LoL marathon sessions, 먹방 eating broadcasts, and legendary 별풍선 donation moments.':
      '韓国のオリジナルライブ配信プラットフォーム（2006年）。BJ文化の発祥地 — 個性とスキルで視聴者を築く個人放送者。아프리카 = "Any Free Cast."。2010年代を通じて韓国のゲーム配信を支配しました。叙事詩的なスタークラフトとLoLのマラソン配信、먹방グルメ放送、伝説的な별풍선寄付の瞬間で知られています。',
    'Naver\'s 2023 streaming platform that rapidly became AfreecaTV\'s main rival, winning top streamers with better revenue splits. The name 치지직 mimics the sound of TV static — a clever onomatopoeia. Within one year it attracted top-tier Korean streamers including LCK pro players during off-season. A sign that Korea\'s streaming market remains fiercely competitive.':
      'Naverの2023年のストリーミングプラットフォームで、より良い収益配分で上位ストリーマーを獲得し、急速にAfreecaTVの主要ライバルとなりました。치지직という名前はTVのザザーという音を模した巧みな擬音語です。1年以内にオフシーズン中のLCKプロ選手を含む最高峰の韓国ストリーマーを獲得しました。韓国の配信市場が激しい競争状態を維持している証です。',
    'AfreecaTV\'s donation currency — virtual star balloons purchased with real money and gifted to BJs live. Each 별풍선 is worth ~₩100 to the broadcaster. Top BJs earn tens of millions of won per session. Invented by Afreeca in 2006, the 별풍선 system directly inspired Twitch Bits, channel points, and YouTube Super Chat. Korea monetized live streaming patronage before the world knew what a streamer was.':
      'AfreecaTVの寄付通貨 — 実際のお金で購入してライブ中にBJに贈る仮想スターバルーン。별풍선1つはブロードキャスターに約100ウォンの価値があります。トップBJは1セッションで数千万ウォンを稼ぎます。2006年にAfreecaが発明した별풍선システムはTwitchビッツ、チャンネルポイント、YouTubeスーパーチャットに直接影響を与えました。韓国はストリーマーが何かを世界が知る前にライブ配信のパトロネージュを収益化しました。',
    'BJ (Broadcasting Jockey) is Korea\'s term for a live-streamer — predating "streamer" by years. A successful BJ earns celebrity-level income. 인터넷 방송인 (internet broadcaster) is now a recognized career path. Some of Korea\'s most famous BJs have crossed into mainstream media. The dark side: 자극적 방송 (shock content) and regulatory debates about platform responsibility remain ongoing.':
      'BJ（放送ジョッキー）は韓国のライブストリーマーを指す言葉で、「ストリーマー」より数年先に生まれました。成功したBJは有名人レベルの収入を得ます。인터넷 방송인（インターネット放送人）は今や認められたキャリアパスです。韓国で最も有名なBJの一部は主流メディアに進出しました。ダークサイド：자극적 방송（衝撃的コンテンツ）とプラットフォームの責任に関する規制の議論は現在も続いています。',

    // Esports Leagues — district cards
    'LCK — League Champions Korea': 'LCK — リーグチャンピオンズコリア',
    'The world\'s most prestigious LoL league. 10 teams compete in Spring and Summer splits. Broadcast globally with English and Korean commentary. LCK pros train 12+ hours daily in team facilities with full coaching, nutrition, and mental health staff. Korean teams routinely dominate international events — Worlds and MSI.':
      '世界で最も権威あるLoLリーグ。10チームがスプリングとサマーシーズンを競います。英語・韓国語の解説でグローバルに放映されます。LCKのプロは完全なコーチング・栄養・メンタルヘルスのスタッフを備えたチーム施設で毎日12時間以上トレーニングします。韓国チームは国際大会 — ワールズとMSI — を定期的に制覇します。',
    'The most successful LoL team in history — 4 World titles. Founded by SK Telecom and now a standalone esports org. Faker is its franchise player. T1 has expanded into VALORANT, Fortnite, and more. Its games consistently break viewership records. Comparable to the Yankees or Real Madrid in their sport.':
      'LoL史上最も成功したチーム — 4度の世界タイトル。SKテレコムが設立し、現在は独立したeスポーツ法人。Fakerがフランチャイズプレイヤーです。T1はVALORANT、フォートナイトなどに拡大。そのゲームは常に視聴記録を塗り替えます。スポーツにおけるヤンキースやレアル・マドリードに匹敵します。',
    'Originally Samsung Galaxy — 2017 World Champions. Rebranded as Gen.G in 2018 with US investment. Consistently a top-2 Korean team. Gen.G has partnered with Puma, Red Bull, and global brands. Operates one of Korea\'s most advanced training facilities and is deeply invested in youth development programmes.':
      'もともとサムスンギャラクシー — 2017年世界チャンピオン。2018年に米国投資を受けてGen.Gにリブランドしました。常に韓国トップ2チームです。Gen.Gはプーマやレッドブルなどのグローバルブランドとパートナーシップを結んでいます。韓国で最も高度なトレーニング施設の一つを運営し、ユース育成プログラムに深く投資しています。',
    'Korea\'s oldest esports organisation — founded in 1999 by telecom giant KT. Home to StarCraft legend Flash (이영호). In LoL, KT has reached the World Championship semifinals multiple times but never won — creating its own 콩라인 reputation. Their rivalry with T1 is one of esports\' most historic.':
      '韓国最古のeスポーツ組織 — 1999年に通信大手KTが設立。スタークラフトの伝説Flash（이영호）の出身チーム。LoLではKTは世界選手権準決勝に何度も進出しましたが優勝なし — 独自の콩라인評判を作り上げました。T1とのライバル関係はeスポーツ史上最も歴史的なものの一つです。',
    'A real military unit where top pro gamers serve their mandatory service while continuing to compete. Korea\'s conscription law requires all men to serve — rather than losing stars for two years, the Air Force created a competitive gaming unit. 임요환 served here. The only military esports unit in the world.':
      'トップのプロゲーマーが競技を続けながら兵役義務を果たす実際の軍部隊。韓国の徴兵制法はすべての男性が服務することを要求しています — 2年間スターを失う代わりに、空軍が競技ゲーミング部隊を創設しました。임요환はここで服務しました。世界唯一の軍eスポーツ部隊です。',
    'Korea\'s Global Coaching Export': '韓国のグローバルコーチング輸出',
    'Almost every major LoL team in North America, Europe, and China employs Korean head coaches or analysts. Korean "bootcamps" — where international teams travel to Korea to train against the LCK — are standard competitive preparation. The KeSPA model (full-time coaches, psychologists, nutritionists, housing) has been copied worldwide.':
      '北米、ヨーロッパ、中国のほぼすべての主要LoLチームが韓国人ヘッドコーチまたはアナリストを雇用しています。国際チームがLCKに対抗するために韓国でトレーニングする「ブートキャンプ」は標準的な競技準備です。KeSPAモデル（フルタイムコーチ、心理士、栄養士、住宅）は世界中でコピーされています。',

    // PC방 Culture — tip-box
    'What is a PC방 (피씨방)?': 'PC방（피씨방）とは？',
    'PC방 (pi-ssi-bang) are internet cafés open 24 hours with high-spec gaming PCs, fast fiber internet, and full food service. Born from the 1997 IMF crisis — unemployed Koreans converted basements into gaming businesses just as StarCraft arrived. Prices: ₩1,000–1,500/hour. In Korea, PC방 is not just a place to game — it is where friendships are made, all-nighters are pulled, and professional careers begin.':
      'PC방（ピッシバン）は24時間営業の高スペックゲーミングPC、高速光ファイバーインターネット、フルフードサービスを備えたインターネットカフェです。1997年のIMF危機から生まれました — スタークラフトが登場する時に失業した韓国人が地下室をゲームビジネスに転換しました。料金：1,000〜1,500ウォン/時間。韓国でPC방はゲームをする場所だけではありません — 友情が育まれ、徹夜が行われ、プロキャリアが始まる場所です。',

    // PC방 Culture — etiquette cards
    'PC방 Food Culture': 'PC방フード文化',
    'Most PC방 have full kitchen service. The classic order: 컵라면, 삼각김밥, 토스트, 치킨. You order via a desktop menu system without leaving your seat. The smell of instant ramen mixed with PC hum is a core memory for Korean millennials. Some premium PC방 now serve proper meal sets.':
      'ほとんどのPC방にフルキッチンサービスがあります。定番の注文：컵라면、삼각김밥、토스트、치킨。席を離れずにデスクトップメニューシステムで注文します。インスタントラーメンの香りとPCのブーンという音が混ざる感覚は、韓国ミレニアル世代の核心的な記憶です。一部のプレミアムPC방では今やまともな食事セットも提供しています。',
    '1인실 (Private Booths)': '1인실（個室ブース）',
    'Premium PC방 offer 1인실 — private enclosed booths with reclining chairs and personal AC. A trend from the 2010s driven by demand for privacy. Costs slightly more (₩1,500–2,000/hour). Some high-end PC방 feel closer to a luxury pod hotel than an internet café.':
      'プレミアムPC방はリクライニングチェアと個人用エアコン付きの個室ブース1인실を提供しています。プライバシーへの需要から2010年代に始まったトレンド。少し高め（1,500〜2,000ウォン/時間）。高級PC방の一部はインターネットカフェよりも高級ポッドホテルに近い感覚です。',
    'Many Korean games reward players who play from a registered PC방 with bonus XP, items, or event currency. This "PC방 advantage" means your account literally improves faster from PC방. Games like LoL and MapleStory integrate PC방 partnerships directly into their reward systems.':
      '多くの韓国ゲームは登録されたPC방からプレイするプレイヤーにボーナスXP、アイテム、またはイベント通貨で報酬を与えます。この「PC방アドバンテージ」はアカウントがPC방からより速く向上することを意味します。LoLやMapleStoryなどのゲームはPC방パートナーシップを報酬システムに直接組み込んでいます。',
    'Missing the last subway (막차) means staying in PC방 until morning — a rite of passage for every Korean youth. PC방 are safe and open at 3 AM. Groups game, eat ramen, sleep in chairs, and emerge bleary-eyed at dawn. 밤새 게임했어 (I gamed all night) is said with both exhaustion and pride.':
      '終電（막차）を逃すと朝までPC방に滞在することになります — 韓国の若者全員の通過儀礼。PC방は深夜3時でも安全で開いています。グループでゲームし、ラーメンを食べ、椅子で眠り、夜明けに眠い目で出てきます。「밤새 게임했어」（ゲームを徹夜した）は疲労と誇りの両方を込めて言われます。',

    // PC방 Culture — kiosk info-box
    '키오스크 시대 — No More Counter Ordering': '키오스크 시대 — カウンターでの注文は過去のこと',
    'Modern PC방 are fully self-service via 키오스크 (kiosk) touchscreen terminals at the entrance. You select your seat, set your time, order food, and pay — all without speaking to staff. The old phrases "자리 있어요?", "한 시간 주세요", or "라면 시켜도 돼요?" are effectively extinct — everything is done on-screen. The staff\'s main job is now bringing food to your seat and cleaning up.':
      '現代のPC방は入口のキオスク（키오스크）タッチスクリーン端末で完全にセルフサービスです。席を選び、時間を設定し、食べ物を注文し、支払いまで — すべてスタッフと一言も話さずにできます。「자리 있어요?」、「한 시간 주세요」、「라면 시켜도 돼요?」という古いフレーズは事実上絶滅しました — すべてが画面上で行われます。スタッフの主な仕事は今や食べ物を席まで持ってきて片付けることです。',

    // PC방 Culture — phrase cards
    'Do you want to game together?': '一緒にゲームしませんか？',
    '💡 Still human — asking a stranger next to you. Rare, but magic when it happens.': '💡 まだ人間的 — 隣の見知らぬ人に声をかける。稀ですが、起きたとき魔法のよう。',
    'Are there private booths available?': '個室ブースはありますか？',
    '💡 Sometimes you still ask staff if private booths are free — not shown on kiosk.': '💡 個室ブースが空いているかどうかスタッフに聞くこともあります — キオスクには表示されないので。',
    'I gamed all night.': '徹夜でゲームした。',
    '💡 Said with both exhaustion and pride. A badge of honour in Korean gaming culture.': '💡 疲労と誇りの両方を込めて言われます。韓国ゲーミング文化の名誉の証。',

    // PC방 Inside Stories
    'A very Korean phenomenon': '非常に韓国的な現象',
    'It is an open secret in Korea that PC방 preferentially hire attractive part-time staff (알바). The logic: attractive staff attract more customers — particularly male gamers — who come back for the ambience as much as the bandwidth. Some PC방 even market themselves by the reputation of their staff\'s looks. This reflects Korea\'s broader 외모지상주의 (lookism) culture bleeding into everyday commerce. The phenomenon is casually discussed online without the controversy it would generate in other countries.':
      '韓国のPC방が魅力的なアルバイト（알바）を優先的に採用するのは公然の秘密です。論理：魅力的なスタッフはより多くの客を引き付ける — 特に男性ゲーマー — 帯域幅と同じくらいその雰囲気のために戻ってきます。一部のPC방はスタッフの外見の評判でマーケティングさえしています。これは韓国の広い외모지상주의（ルッキズム）文化が日常的な商業に染み込んでいることを反映しています。この現象は他の国で引き起こすような論争なしにオンラインでカジュアルに議論されます。',
    'The ramen-talent economy': 'ラーメン技術の経済学',
    'In the serious business of PC방 customer loyalty, the ability to cook 라면 and 짜파게티 well is a genuine competitive advantage. A PC방 where the staff cook instant noodles to perfection — right firmness, right broth ratio, perfectly timed — builds regulars who return specifically for the food. Online communities discuss which PC방 near which subway station has the "라면 맛있는 PC방" (PC방 with good ramen). It sounds absurd until you realize how much time Koreans spend in PC방 and how important the ramen break is to the ritual.':
      'PC방の顧客ロイヤルティという真剣なビジネスにおいて、라면と짜파게티をうまく調理する能力は真の競争優位性です。麺の硬さ、スープの比率、タイミングが完璧なインスタント麺を出すPC방は、食べ物のために特別に戻ってくる常連客を作ります。オンラインコミュニティはどの駅の近くのPC방が「라면 맛있는 PC방」（ラーメンが美味しいPC방）かを議論します。韓国人がPC방でどれだけの時間を過ごし、ラーメン休憩がその儀式にとってどれほど重要かを実感すると、馬鹿げているように聞こえなくなります。',
    'Even in Korea\'s esports paradise': '韓国のeスポーツ楽園でさえ',
    'Here is the great Korean gaming paradox: the country that invented professional esports, that built PC방 on every corner, that produces the world\'s greatest players — and yet, the overwhelming majority of Korean parents still believe that gaming will ruin their child\'s life. 공부해! (Study!) remains the battle cry. Telling your parents "I want to be a pro gamer" is still one of the most anxiety-inducing statements a Korean teenager can make. Faker\'s own parents reportedly did not support his gaming career early on. The generation gap between Korea\'s gaming culture and its Confucian parenting values creates a specific and very Korean tension that has yet to fully resolve — even in 2025.':
      'これが韓国のゲーミングにおける大きなパラドックスです：プロeスポーツを発明し、あらゆる角にPC방を建て、世界最高のプレイヤーを輩出した国 — それでも韓国の親の圧倒的多数はまだゲームが子どもの人生を台無しにすると信じています。「공부해！」（勉強しろ！）は変わらない叫びです。「プロゲーマーになりたい」と親に告げることは、まだ韓国の十代が口にする最も不安を引き起こす言葉の一つです。Faker自身の両親も最初は彼のゲームキャリアを支持しなかったと言われています。韓国のゲーミング文化と儒教的な子育て価値観の世代ギャップは、2025年になっても完全には解決されていない特定の非常に韓国的な緊張を生み出しています。',
    'Despite being the world\'s leading esports nation, Korea operates one of the most opaque and criticised game rating and censorship systems in the developed world. The 게임물관리위원회 (Game Rating and Administration Committee / GRAC) controls which games can be sold or played in Korea — and has repeatedly drawn fire for inconsistent, unpredictable, and arguably politically motivated decisions. YouTuber 김성회 (channel: 김성회의 G식백과) has become one of Korea\'s most prominent voices exposing the system\'s absurdities: the vague standards that allow one game through while blocking a near-identical one; the pre-censorship model (games must be approved before release, not after); and the real economic harm caused by delayed approvals. His channel is essential viewing for anyone interested in Korean game policy. The irony is not lost: the country that professionalized gaming is also the country that still treats game content like a public health hazard requiring bureaucratic approval.':
      '世界をリードするeスポーツ国家であるにもかかわらず、韓国は先進国の中で最も不透明で批判されているゲームレーティングと検閲システムの一つを運営しています。게임물관리위원회（ゲームレーティング管理委員会 / GRAC）は韓国でどのゲームが販売またはプレイできるかを管理しており、一貫性がなく予測不可能で、議論の余地があり政治的に動機付けられた決定で繰り返し批判を浴びています。YouTuberの김성회（チャンネル：김성회의 G식백과）はシステムの不合理性を暴露する韓国で最も著名な声の一つとなっています：ほぼ同一のゲームを通過させながら一方をブロックする曖昧な基準、事前検閲モデル（ゲームはリリース後ではなく前に承認が必要）、そして遅延した承認によって引き起こされる実際の経済的損害。彼のチャンネルは韓国のゲーム政策に関心のある人には必見です。アイロニーは見逃されません：ゲーミングを職業化した国は、ゲームコンテンツを官僚的承認が必要な公衆衛生上の危険として扱い続けている国でもあります。',

    // Gamer Slang — phrase-eng
    'Expert / skilled player': 'エキスパート / 上手いプレイヤー',
    'Carry (win it for the team)': 'キャリー（チームを勝利に導く）',
    'Troll / intentionally ruining the game': 'トロール / 意図的にゲームを妨害すること',
    'Rage quit / deserter': '途中離脱 / 逃走',
    'Solo ranked queue': 'ソロランク戦',
    'Jungle difference (blaming the jungler)': 'ジャングル差（ジャングラーのせいにする）',
    'LoL World Championship': 'LoL世界選手権',
    'Hacker / cheater (accusation)': 'ハッカー / チーター（非難）',
    'Let\'s eat chicken — we won': 'チキンを食べよう — 勝った',
    'Lol / haha (chat laugh)': '笑 / ハハ（チャットの笑い）',
    'Lucky win (not skill, just luck)': '運勝ち（スキルではなく運で勝つ）',
    'Bye bye (post-game chat)': 'バイバイ（試合後のチャット）',
    'GG / I give up / game over': 'GG / 降参 / ゲームオーバー',
    'Veteran who never left (stagnant water)': 'ずっとここにいるベテラン（澱んだ水）',
    'PUBG newbie (배그 + 어린이)': 'PUBGの初心者（배그 + 어린이）',
    '"How are your parents?" — extreme trash talk': '「ご両親はお元気ですか？」— 極上の罵倒',
    'Real-life fight after online conflict': 'オンラインの争いから現実の喧嘩へ',

    // Gamer Slang — phrase-context
    '💡 Opposite: 하수 (ha-su). 고수 = upper stream; 하수 = lower stream — a poetic skill metaphor.': '💡 反対語：하수（下手）。고수 = 上流；하수 = 下流 — 詩的なスキルの比喩。',
    '💡 캐리해줘 = Please carry us. Said with faith — or total surrender.': '💡 캐리해줘 = キャリーして。信頼、または完全な降伏で言われる。',
    '💡 트롤 짓 하지 마 = Stop trolling. 트롤러 = a troll player. The ultimate insult.': '💡 트롤 짓 하지 마 = トロールするな。트롤러 = トロールプレイヤー。最大の侮辱。',
    '💡 탈주범 = habitual quitter. From 탈주 (escape/desertion). Causes rank ban. Universally hated.': '💡 탈주범 = 常習的な途中離脱者。탈주（脱走・離脱）から。ランクBAN原因。誰もが嫌う。',
    '💡 Short for 솔로 랭크 게임. The true measure of individual skill — no friends to blame.': '💡 솔로 랭크 게임の略。個人スキルの真の尺度 — 友達のせいにできない。',
    '💡 정글 + 차이 (gap). 정글차이야 = "It\'s the jungler\'s fault." Korea\'s most common LoL excuse.': '💡 정글 + 차이（差）。정글차이야 = 「ジャングラーのせいだ。」韓国で最もよくあるLoLの言い訳。',
    '💡 Short for 리그 오브 레전드 월드 챔피언십. Autumn = 롤드컵 시즌 = everyone watches together.': '💡 리그 오브 레전드 월드 챔피언십の略。秋 = 롤드컵シーズン = みんなで一緒に観戦。',
    '💡 핵 (hack) + 쟁이 (person suffix). 핵쟁이야! = "You\'re hacking!" The go-to when someone is much better than you.': '💡 핵（hack）+ 쟁이（〜する人）。핵쟁이야！=「チートじゃん！」自分より格段に上手い人への定番の言葉。',
    '💡 PUBG\'s Korean victory screen phrase. 치킨 먹었다 = "We ate chicken" = we won. Now used for any decisive win.': '💡 PUBGの韓国語勝利画面フレーズ。치킨 먹었다 = 「チキンを食べた」= 勝った。今は圧勝にも使われる。',
    '💡 ㅋ = chuckle. ㅋㅋ = actual laugh. ㅋㅋㅋㅋㅋ = losing it. The most Korean sound in digital text.': '💡 ㅋ = クスッ。ㅋㅋ = 笑い。ㅋㅋㅋㅋㅋ = 爆笑。デジタルテキストで最も韓国らしい音。',
    '💡 운 (luck) + 빨 (speed/force). 운빨로 이겼다 = "You only won by luck." The ultimate insult to a winner.': '💡 운（運）+ 빨（勢い/力）。운빨로 이겼다 = 「運だけで勝った。」勝者への最大の侮辱。',
    '💡 gg ㅂㅂ = "Good game, bye." A rare moment of civility in competitive gaming.': '💡 gg ㅂㅂ = 「Good game、バイバイ。」競技ゲームでの稀な礼儀ある瞬間。',
    '💡 Short for 지지 (GG). Typed in all-chat to signal surrender or acknowledge defeat. ㅈㅈ 치다 = to type GG = to give up. Also used in real life: "오늘 시험 ㅈㅈ쳤어" = "I bombed today\'s exam."':
      '💡 지지（GG）の略。全チャットで打ち込み降伏または敗北を認める。ㅈㅈ 치다 = GGを打つ = 諦める。実生活でも使用：「오늘 시험 ㅈㅈ쳤어」= 「今日の試験は玉砕した。」',
    '💡 고인물 literally means "stagnant water" — water that has been sitting so long it stops flowing. In gaming: someone who has played the same game for so many years they are deeply skilled but also deeply entrenched, unable to adapt or move on. Unlike 고수 (pure admiration), 고인물 has a faintly mocking edge — they\'ve been here too long. "저 사람 완전 고인물이야" = "That person is a total veteran fossil."':
      '💡 고인물は文字通り「澱んだ水」を意味します — 長く止まりすぎて流れが止まった水。ゲームでは：何年も同じゲームをプレイし、深いスキルを持つが同時に深く固定化されて適応したり前に進んだりできない人。고수（純粋な称賛）と異なり、고인물にはかすかに揶揄のニュアンスがあります — 彼らは長くいすぎた。「저 사람 완전 고인물이야」= 「あの人は完全にベテラン化石だ。」',
    '💡 배그 (PUBG / 배틀그라운드) + 어린이 (child) = 배린이. The Korean internet loves this suffix pattern: 골린이 (golf newbie), 헬린이 (gym newbie), 주린이 (stock market newbie). Any hobbyist domain + 린이 = a beginner in that field. "나 배린이라 아직 치킨 못 먹었어" = "I\'m a PUBG newbie, I still haven\'t won a chicken."':
      '💡 배그（PUBG / 배틀그라운드）+ 어린이（子ども）= 배린이。韓国のインターネットはこの接尾辞パターンが大好き：골린이（ゴルフ初心者）、헬린이（ジム初心者）、주린이（株式市場初心者）。どんな趣味の領域 + 린이 = その分野の初心者。「나 배린이라 아직 치킨 못 먹었어」= 「僕はPUBG初心者だから、まだチキンを食べたことがない。」',
    '💡 Literally "greetings to your parents" — but in gaming, typing 부모님 안부 여쭤봐 after destroying someone is one of the most cutting insults possible. The subtext: "You played so badly I feel sorry for your parents." In Korean culture where parents are deeply respected, weaponizing them as trash talk hits harder than any direct insult. Guaranteed to cause rage. Use with caution.':
      '💡 文字通り「ご両親への挨拶」— しかしゲームで、誰かを倒した後に부모님 안부 여쭤봐と打つのは最も切れ味鋭い侮辱の一つです。サブテキスト：「あなたのプレイが下手すぎて、ご両親が気の毒に思います。」親が深く尊重される韓国文化では、親を罵倒に使うことはどんな直接的な侮辱より深く刺さります。確実に怒りを引き起こします。使用する際は注意してください。',
    '💡 현실 (reality) + PK (Player Kill). When an online argument escalates to "let\'s settle this IRL." 현피 뜨자 = "Let\'s meet up and fight for real." Born from the Lineage 혈맹 clan wars era where territorial disputes were so intense players actually tracked down opponents offline. Rare in modern gaming but the word remains — a testament to how seriously Koreans once took their online games.':
      '💡 현실（現実）+ PK（プレイヤーキル）。オンラインの口論が「リアルで決着をつけよう」にエスカレートするとき。현피 뜨자 = 「会って本当に戦おう。」리네ージュの혈맹クラン戦争時代から生まれ、領土争いが激しくてプレイヤーが実際にオフラインで相手を追跡していました。現代のゲームでは稀ですが言葉は残っています — 韓国人がかつてオンラインゲームをどれほど真剣に受け止めていたかの証です。',

    // Gaming Vocabulary — eng-cell text nodes (after <span class="kor-trans">)
    'Game': 'ゲーム',
    'PC Bang (internet café)': 'PCバン（インターネットカフェ）',
    'Character': 'キャラクター',
    'Item / in-game equipment': 'アイテム / ゲーム内装備',
    'Level up': 'レベルアップ',
    'Clear (complete a stage)': 'クリア（ステージ完了）',
    'Dungeon': 'ダンジョン',
    'Attack': '攻撃',
    'Defense': '防御',
    'Skill / ability': 'スキル / 能力',
    'Teammate': 'チームメイト',
    'Professional gamer': 'プロゲーマー',
    'Practice': '練習',
    'Tournament / competition': '大会 / 競技',
    'Ranking': 'ランキング',
    'Game streaming / broadcast': 'ゲーム配信 / 放送',
    'Bug / glitch': 'バグ / 不具合',
    'Patch / game update': 'パッチ / ゲームアップデート',
    'Internet broadcaster / streamer': 'インターネット放送人 / ストリーマー',
    'Star balloon (streaming donation)': 'スターバルーン（配信の寄付）',
    'Esports': 'eスポーツ',
    'Team house (player residence)': 'チームハウス（選手の宿舎）',

    // ── K-Sports page ───────────────────────────────────────────
    '⚽ Football Heroes · 축구 영웅들': '⚽ フットボールヒーロー · 축구 영웅들',
    '⚾ Baseball Heroes · 야구 영웅들': '⚾ ベースボールヒーロー · 야구 영웅들',
    '🏃 Marathon Legends · 마라톤 전설': '🏃 マラソンレジェンド · 마라톤 전설',
    '🌟 Individual Sport Legends · 개인 종목 레전드': '🌟 個人競技レジェンド · 개인 종목 레전드',
    '🥋 Traditional Korean Sports · 전통 스포츠': '🥋 韓国伝統スポーツ · 전통 스포츠',
    '📣 Korean Sports Chants · 응원 구호': '📣 韓国スポーツ応援 · 응원 구호',
    'The Korean National Football Team — 태극전사': '韓国サッカー代表チーム — 태극전사',

    // ── K-Sports page (ksports.html) — full translation ─────────

    // Page hero
    'Korea punches far above its weight on the world stage. From a single footballer in the Bundesliga in 1978 to dominating the Premier League, MLB, the Olympics, and esports simultaneously — Korean athletes carry the pride of an entire nation.':
      '韓国は世界の舞台で体格以上の力を発揮してきました。1978年にブンデスリーガへ乗り込んだ一人のサッカー選手から、プレミアリーグ・MLB・オリンピック・eスポーツを同時に席巻するまで — 韓国のアスリートたちは国全体の誇りを背負っています。',

    // Stat labels
    'Olympic medals (Summer Games)': '夏季五輪メダル総数',
    'FIFA World Cup 4th place': 'FIFAワールドカップ4強',
    'Years of Olympic archery dominance': '五輪アーチェリー制覇年数',
    'Korean players in MLB history': 'MLB歴代韓国人選手数',
    'Faker LoL World Championship': 'Faker LoL世界選手権',
    '손기정 — First Korean Olympic gold': '손기정 — 韓国初の五輪金メダル',

    // Section headings (HTML-accurate strings)
    '🏃 Marathon Legends · 마라톤의 전설': '🏃 マラソン伝説 · 마라톤의 전설',
    '🌟 Individual Sports Legends · 개인 종목의 영웅들': '🌟 個人競技の英雄たち · 개인 종목의 영웅들',
    '🥋 Traditional Korean Sports': '🥋 韓国伝統スポーツ',
    '⚾ KBO 야구 문화 · Korean Baseball Culture': '⚾ KBO 야구 문화 · 韓国野球文化',
    '🍗 야구장 먹거리 · Stadium Food Culture': '🍗 야구장 먹거리 · 球場グルメ文化',
    '💃 치어리더 · KBO Cheerleaders': '💃 치어리더 · KBOチアリーダー',
    '🏏 빠던 · The Korean Bat Flip': '🏏 빠던 · 韓国のバットフリップ',
    '🎵 응원가 · KBO Player Cheer Songs': '🎵 응원가 · KBO選手応援歌',
    '📖 Sports Vocabulary': '📖 スポーツ語彙',
    '⚾ Baseball Vocabulary': '⚾ 野球語彙',
    '📣 Stadium Cheer Chants': '📣 スタジアム応援チャント',

    // Football tip box text
    'The Korean national team is called 태극전사 (Taeguk Warriors). Their greatest moment: the 2002 FIFA World Cup, co-hosted with Japan, where Korea reached the semi-finals — the first non-European, non-South American team ever to do so. The chant 대~한민국! was born that summer and is still sung today.':
      '韓国代表チームは태극전사（テグクジョンサ）と呼ばれています。最大の瞬間：2002年日韓共催FIFAワールドカップでの4強進出 — ヨーロッパ・南米以外のチームとして史上初でした。その夏生まれた응원 구호 대~한민국！は今でも歌われています。',

    // Football heroes — chef-restaurant labels
    'Eintracht Frankfurt · Bayer Leverkusen (1978–1989)': 'アインラハト・フランクフルト · バイエル・レバークーゼン (1978–1989)',
    'Manchester United (2005–2012)': 'マンチェスター・ユナイテッド (2005–2012)',
    'Tottenham Hotspur (2015–현재)': 'トットナム・ホットスパー (2015–현재)',
    'Napoli (2022–23) · Bayern Munich (2023–현재)': 'ナポリ (2022–23) · バイエルン・ミュンヘン (2023–현재)',
    'Perugia (Serie A) → 2002 FIFA World Cup': 'ペルージャ (セリエA) → 2002 FIFA ワールドカップ',
    'Paris Saint-Germain (2023–현재)': 'パリ・サンジェルマン (2023–현재)',
    'La Masia → 유럽 → K리그': 'ラ・マシア → ヨーロッパ → Kリーグ',

    // Football heroes — chef descriptions
    'Before Park Ji-sung, before Son Heung-min — there was 차범근. The first Asian footballer to become a genuine star in Europe\'s top flight. 98 Bundesliga goals. Two UEFA Cup titles (1980 Frankfurt, 1988 Leverkusen). Korean fans with no access to Bundesliga broadcasts would gather around smuggled VHS tapes to watch him. He proved Asian players could dominate European football a generation before anyone believed it.':
      '박지성、손흥민の前に차범근がいました。欧州トップリーグで真のスターとなった最初のアジア人サッカー選手。ブンデスリーガ98ゴール。UEFAカップ2連覇（1980年フランクフルト、1988年レバークーゼン）。ブンデスリーガの放送にアクセスできなかった韓国のファンたちは密輸VHSテープを集めて彼の試合を観ました。誰もそれを信じる前に、アジア人選手が欧州サッカーを制覇できることを証明しました。',
    'Sir Alex Ferguson called him "Three Lungs" for his relentless stamina. At Manchester United, Park Ji-sung won four Premier League titles and the 2008 Champions League — the first Asian player to score in a UCL final. His role: a defensive midfielder assigned to shut down the opposing team\'s best player (Ronaldo, Messi, Kaká). Korean fans felt represented on the world\'s biggest stage for the very first time.':
      'アレックス・ファーガソン監督は彼の疲れ知らずのスタミナを称えて「三つ肺」と呼びました。マンチェスター・ユナイテッドでプレミアリーグ4連覇と2008年チャンピオンズリーグ優勝 — UCL決勝でゴールを決めた初のアジア人選手。その役割：相手チームの最優秀選手（ロナウド、メッシ、カカ）を封じる守備的MF。韓国のファンたちは初めて世界最大の舞台で代表されていると感じました。',
    'The greatest Asian footballer in history — and the numbers prove it. In 2022, Son shared the Premier League Golden Boot with Mo Salah: the first Asian player ever to win the EPL top-scorer award. His 2019 solo run vs. Burnley (60 metres, zero touches) is a Puskas Award–level moment. A 2019 UCL finalist. His 2018 Asian Games gold medal earned military exemption — a national news story. Zero controversies. The smile. Universally loved.':
      '史上最高のアジア人サッカー選手 — そして数字がそれを証明しています。2022年にモハメド・サラーとプレミアリーグ得点王を分かち合った最初のアジア人選手。2019年のバーンリー戦での60メートル独走ゴールはプスカス賞級の瞬間。2019年UCL決勝進出。2018年アジア大会の金メダルで兵役免除を受けたことは全国的なニュースに。論争ゼロ。あの笑顔。誰もが愛する選手。',
    '"The Monster" — named by fans for his physical dominance, aerial power, and surprisingly elegant ball-playing ability. Kim arrived at Napoli in 2022 and led them to their first Serie A title in 33 years. Named Serie A Defender of the Year. Bayern Munich paid €50 million to bring him north. Korean fans who watched their defenders struggle against European forwards now watch Kim dominate the world\'s best strikers.':
      '「괴물（モンスター）」— ファンたちが彼の圧倒的なフィジカル、空中戦の強さ、そして意外なほど洗練されたボール扱いから名付けました。2022年にナポリへ加入し33年ぶりのセリエA優勝を牽引。セリエA最優秀DF賞を受賞。バイエルン・ミュンヘンは彼を獲得するために5,000万ユーロを支払いました。欧州FWに苦しむDFを見てきた韓国のファンたちは今、世界最高のストライカーを制圧する김민재を見ています。',
    'June 18, 2002. Extra time. Korea vs. Italy. Ahn Jung-hwan — a Perugia player — headed in the golden goal to eliminate Italy. The single greatest moment in Korean football history. What followed: Perugia\'s owner cancelled his contract in fury ("He has ruined Italian football"), making Ahn an even bigger national hero. Korea reached the semi-finals — the first non-European, non-South American team to ever do so.':
      '2002年6月18日。延長戦。韓国対イタリア。ペルージャ所属の안정환がヘッドでゴールデンゴールを決め、イタリアを脱落させました。韓国サッカー史上最大の瞬間。その後：ペルージャのオーナーが激怒して契約を解除（「彼はイタリアサッカーを台無しにした」）し、それがかえって安を一層大きな国民的英雄にしました。韓国は4強進出 — ヨーロッパ・南米以外のチームとして史上初。',
    'At 13, Lee Kang-in left Korea for Barcelona\'s La Masia — the academy of Messi, Xavi, and Iniesta. In 2019, aged 18, he won the FIFA U-20 World Cup Golden Ball as the tournament\'s best player. PSG signed him in 2023. His creativity and dribbling mark him as perhaps the most naturally gifted Korean footballer ever. Fans debate whether he will reach his ceiling; his talent suggests there is none.':
      '13歳で韓国を離れバルセロナのラ・マシアへ — メッシ、シャビ、イニエスタが巣立ったアカデミーです。2019年18歳でFIFA U-20ワールドカップ・ゴールデンボール賞を受賞し大会最優秀選手に。2023年にPSGが獲得しました。その創造性とドリブルは彼を史上最も天性の才能を持つ韓国人サッカー選手と位置付けています。ファンたちは彼の限界を議論しますが、才能はその限界が存在しないことを示唆しています。',
    'Tagged "The Korean Messi" at La Masia aged 13. FIFA named him one of the world\'s top five youth players. Unlike Lee Kang-in who flourished, Lee Seung-woo was expelled over registration issues — a devastating blow before his career began. His story resonates because of the struggle: immense talent, obstacles, persistence across European leagues and the K-League. Not every story ends with a golden boot — and fans respect him for continuing anyway.':
      '13歳でラ・マシアにて「韓国のメッシ」と称されました。FIFAに世界トップ5ユース選手の一人に選ばれています。成功した이강인とは異なり、이승우は登録問題でアカデミーを退会させられるという、キャリア開始前の壊滅的な打撃を受けました。彼の物語が共鳴するのは闘いがあるから — 膨大な才能、障害、ヨーロッパリーグとKリーグを越えた粘り強さ。すべての物語が黄金のブーツで終わるわけではない — それでも続ける彼をファンたちは尊敬しています。',

    // Baseball Heroes tip box
    'KBO — The World\'s Most Atmospheric Baseball': 'KBO — 世界で最も熱い雰囲気の野球',
    'KBO games are legendary for their atmosphere: player-specific 응원가 (cheer songs), drums, 치맥 (fried chicken + beer), and cheerleaders leading entire stadiums in synchronized chants. It\'s one of the most vibrant live sports experiences in the world — and it produced a steady stream of MLB superstars.':
      'KBOの試合はその雰囲気で伝説的です：選手別の응원가（応援歌）、太鼓、치맥（フライドチキン＋ビール）、そしてスタジアム全体をシンクロした応援で導くチアリーダー。世界で最も活気あるライブスポーツ体験の一つであり、MLB大スターを次々と輩出してきました。',

    // Baseball heroes — chef-restaurant labels
    'Los Angeles Dodgers (1994–2002) · 통산 124승': 'ロサンゼルス・ドジャース (1994–2002) · 통산 124승',
    'Samsung Lions (KBO) · Yomiuri Giants (NPB)': 'サムスン・ライオンズ (KBO) · 読売ジャイアンツ (NPB)',
    'LA Dodgers (2013–2019) · Toronto Blue Jays': 'LAドジャース (2013–2019) · トロント・ブルージェイズ',
    'Cleveland · Cincinnati · Texas Rangers (2005–2020)': 'クリーブランド · シンシナティ · テキサス・レンジャーズ (2005–2020)',
    'Lotte Giants (KBO) · Fukuoka SoftBank (NPB) · Seattle Mariners (MLB)': 'ロッテ・ジャイアンツ (KBO) · 福岡ソフトバンク (NPB) · シアトル・マリナーズ (MLB)',
    'San Diego Padres (2021–2024) · New York Mets (2025–)': 'サンディエゴ・パドレス (2021–2024) · ニューヨーク・メッツ (2025–)',

    // Baseball heroes — chef descriptions
    'The first South Korean player in MLB. Park Chan-ho didn\'t just open a door — he blasted it open. Signing with the LA Dodgers in 1994, he became one of their most reliable starters at his peak. 124 career MLB wins. Korean fans who had never watched baseball started staying up until 3am in Seoul to catch Dodger games on satellite TV. Every Korean MLB player since cites him as the reason they believed it was possible.':
      '韓国人初のMLB選手。박찬호はドアを開けただけでなく — 吹き飛ばしました。1994年LAドジャースに入団し、全盛期にはチームで最も信頼できる先発投手の一人となりました。MLB通算124勝。野球を一度も見たことがなかった韓国のファンたちがドジャースの試合を衛星テレビで追うために早朝3時まで起きていました。それ以降のすべての韓国人MLB選手が、それが可能だと信じた理由として彼を挙げます。',
    'The greatest hitter in KBO history — 467 career home runs. "국민타자" (The Nation\'s Hitter) carries a generation\'s baseball memories. Samsung Lions games sold out because fans wanted to see if he\'d hit one that night. He crossed to Japan\'s NPB (Yomiuri Giants), winning titles there too. He later returned to Samsung to retire in Korea — and fans loved him all the more for that loyalty.':
      'KBO史上最高の打者 — 通算467本塁打。「국민타자（国民打者）」は一世代の野球の記憶を担っています。サムスン・ライオンズの試合は今夜ホームランを打つかどうか見たいファンたちで満員になりました。日本のNPB（読売ジャイアンツ）へ渡りそこでも優勝。後にサムスンに戻り韓国でキャリアを終えました — そしてその義理のためにファンはさらに彼を愛しました。',
    'The best Korean starting pitcher in MLB history. In 2019, Ryu posted a 2.32 ERA — lowest in the NL — winning the ERA title and finishing 2nd in Cy Young voting. Unlike Park Chan-ho (power), Ryu is an artisan: his changeup is considered one of the best pitches in baseball, his control near-perfect. He pitched in the NLCS helping the Dodgers reach the World Series. Watching Ryu is watching pitching as chess.':
      'MLB史上最高の韓国人先発投手。2019年に류현진はNLで最低の2.32のERAを記録しERA王を獲得、サイ・ヤング賞投票で2位。박찬호（パワー型）と異なり류현진は職人です：そのチェンジアップは野球界でも最高の球種の一つと評され、コントロールはほぼ完璧。NLCSで登板しドジャースのワールドシリーズ進出に貢献しました。류현진の投球を観ることはチェスとして投球を観ることです。',
    'The model of consistency — 16 MLB seasons, a feat few Asian players have matched. Known for exceptional 선구안 (plate discipline — reading pitches before they arrive), he compiled on-base percentages consistently above .380. Texas Rangers gave him a $130 million contract. He wasn\'t the most thrilling star; he was something rarer: a decade-long MLB regular who played every game with quiet, elite excellence.':
      '一貫性の手本 — MLBでの16シーズン、アジア人選手でこれに匹敵する者はほとんどいません。卓越した선구안（打席での見極め — 投球が来る前に読む力）で知られ、通算出塁率.380台を安定的に維持しました。テキサス・レンジャーズは彼に1億3,000万ドルの契約を提示しました。最もスリリングなスターではありませんでしたが、彼はより稀なものでした：静かなエリートの卓越さでどの試合も全力でプレーした10年間のMLBレギュラー。',
    'Korea\'s most complete power hitter — a big man with a bigger bat who dominated every league he entered. KBO batting titles and MVPs with Lotte Giants. Japan Series champion with Fukuoka SoftBank. MLB career with Seattle Mariners — only the third Korean position player in MLB history. Fans love him most for what he did last: returned to Lotte and finished his career in Busan where he started.':
      '韓国で最も完成された強打者 — 入るリーグすべてを制圧した大柄な男と大きなバット。ロッテ・ジャイアンツでKBOの打撃王とMVPを複数回獲得。福岡ソフトバンクで日本シリーズ優勝。シアトル・マリナーズでMLBに挑戦 — 韓国人野手としては史上3人目。ファンが最も愛したのは彼が最後にしたこと：ロッテに戻り、出発点の釜山でキャリアを終えたことです。',
    'The most versatile Korean position player in MLB history. Kim plays shortstop, second base, and third base at Gold Glove level. His 2023 season: .260 avg, 17 HR, defensive metrics placing him among the best infielders in baseball. Korean fans who once watched only pitchers in MLB now watch Kim\'s diving stops and double-play pivots with equal passion. He is the new era of Korean MLB — the position player.':
      'MLB史上最も多才な韓国人野手。김하성は遊撃手・二塁手・三塁手をゴールドグラブ水準でこなします。2023年シーズン：打率.260、17本塁打、守備指標は野球界で最高レベルの内野手に。投手しかMLBで注目しなかった韓国のファンたちが今や김하성のダイビングキャッチとダブルプレーを同じ情熱で見守ります。彼は韓国MLBの新時代 — 野手の時代。',

    // Marathon heroes — chef-restaurant labels
    '1936 Berlin Olympics — 세계 기록 2:29:19': '1936年ベルリン五輪 — 세계 기록 2:29:19',
    '1992 Barcelona Olympics — 2:13:23': '1992年バルセロナ五輪 — 2:13:23',
    '1996 Atlanta Olympics 은메달 · 2001 Boston Marathon 우승': '1996年アトランタ五輪 은메달 · 2001年ボストンマラソン 우승',

    // Marathon heroes — chef descriptions
    'In 1936, Sohn Kee-chung won the Olympic marathon in Berlin with a world record — but had to run under the Japanese flag and a Japanese name (Kitei Son) because Korea was colonized. On the victory podium, he bowed his head in silent protest. A Korean newspaper (동아일보) published his photo with the Japanese flag erased — the editor was jailed. Sohn lived 66 more years, long enough to carry the Olympic torch at the 1988 Seoul Games. His story is not just sports history — it is Korean history.':
      '1936年、손기정はベルリン五輪のマラソンを世界記録で制しました — しかし朝鮮が植民地支配下にあったため、日の丸を付け日本名（孫基禎）で走らなければなりませんでした。表彰台で彼は無言の抗議として頭を垂れました。韓国の新聞（동아일보）がユニフォームの日の丸を消した写真を掲載し、編集者は投獄されました。손기정はその後66年生き、1988年ソウル五輪の聖火ランナーを務めるほど長生きしました。彼の物語はスポーツ史だけでなく — 韓国の歴史そのものです。',
    '56 years after Sohn Kee-chung ran under the Japanese flag, Hwang Young-cho ran under the Korean flag — and won. The 1992 Barcelona Olympic marathon gold was the fulfillment of a national dream deferred for half a century. When Hwang crossed the finish line, the entire Korean nation erupted. Sohn Kee-chung — still alive — watched the race. Korea finally had a marathon gold under its own name, its own flag, its own pride.':
      '손기정が日の丸を付けて走ってから56年後、황영조は太極旗を付けて走り — 勝利しました。1992年バルセロナ五輪マラソンの金メダルは、半世紀延ばされてきた国民の夢の実現でした。황영조がゴールラインを越えた瞬間、韓国全土が沸き上がりました。손기정 — まだ生きていた — がその試合を見守りました。韓国はついに自国の名前、自国の旗、自国の誇りの下でマラソンの金メダルを手にしました。',
    'Korea\'s most persistent marathon hero. At the 1996 Atlanta Olympics, Lee Bong-ju lost the marathon gold by just 3 seconds to South Africa\'s Josia Thugwane — one of the closest marathon finishes in Olympic history. Rather than stopping, he ran on — for years. In 2001, he won the Boston Marathon. His decade-long rivalry with Hwang Young-cho defined the golden age of Korean marathon.':
      '韓国で最も粘り強いマラソンの英雄。1996年アトランタ五輪で이봉주は南アフリカのジョシア・ウグワーニに僅か3秒差で金メダルを逃しました — 五輪マラソン史上最も接近したフィニッシュの一つ。しかし止まることなく走り続けました — 何年も。2001年にはボストンマラソンで優勝。황영조との10年にわたるライバル関係が韓国マラソンの黄金時代を定義しました。',

    // Individual sports heroes — chef descriptions
    'The 1998 US Women\'s Open. Park Se-ri, age 20, faced a ball deep in a water hazard. She removed her shoes and socks, stepped barefoot into the lake, and made the shot — then won the tournament. The image aired during Korea\'s deepest economic crisis (1997 IMF). The country needed a hero. Her greatest legacy: "박세리 키즈" — the generation who watched her and became the greatest LPGA dynasty in history: 박인비, 신지애, 유소연, 고진영, 김세영.':
      '1998年全米女子オープン。20歳の박세리がウォーターハザードの深いところにボールが入った場面に直面しました。靴と靴下を脱ぎ、湖に素足で入ってショットを成功させ — そして優勝しました。その映像は韓国最大の経済危機（1997年IMF）の最中に放映されました。国はヒーローを必要としていました。最大の遺産：「박세리 키즈」— 彼女を見てゴルフを始め、歴史上最大のLPGAダイナスティとなった世代：박인비、신지애、유소연、고진영、김세영。',
    'There is before Kim Yuna, and after Kim Yuna. In 2010 Vancouver, she won gold with a 228.56 world record score — judges and audiences wept. She revolutionized women\'s figure skating: triple-triple combinations others feared, combined with emotional depth that transcended technical scoring. The 2014 Sochi silver remains one of the most controversial decisions in Olympic history. Kim Yuna is the most beloved Korean athlete of all time.':
      '김연아以前と以後があります。2010年バンクーバーで228.56の世界記録スコアで金メダルを獲得 — 審判も観客も涙を流しました。彼女は女子フィギュアスケートを革命しました：他の選手が恐れるトリプル・トリプルの組み合わせと、技術点を超越した感情の深さを融合させて。2014年ソチの銀メダルは五輪史上最も物議を醸す判定の一つとして残っています。김연아は史上最も愛される韓国人アスリートです。',
    'Korean swimming was invisible on the world stage before Park Tae-hwan. In 2008 Beijing, he won 400m freestyle gold — the first Korean Olympic gold in swimming, and the first Asian man to win a freestyle Olympic gold. He followed it with 200m bronze in the same Games. "마린보이" became a national icon, transforming swimming from a fringe sport in Korea into an aspirational discipline for a new generation.':
      '박태환以前、韓国の水泳は世界の舞台で存在感がありませんでした。2008年北京で400m自由形の金メダルを獲得 — 韓国初の五輪水泳金メダルであり、自由形で五輪金メダルを獲得した初のアジア人男性でした。同大会で200m銅メダルも続けて獲得しました。「마린보이」は国民的アイコンとなり、水泳を韓国の周辺的なスポーツから新世代にとって憧れの競技へと変えました。',
    '2018 평창 올림픽 스켈레톤 금메달 — 4 Runs, 4 Track Records': '2018年平昌五輪スケルトン金メダル — 4走、4コース新記録',
    'Korea had no skeleton tradition before Yun Sung-bin. He discovered the sport at 19, trained in a niche program, and at the 2018 PyeongChang home Olympics — won gold with four track records in four runs. The most dominant skeleton performance in Olympic history. He wore a custom Iron Man helmet, sprinting to his sled in front of his home crowd. A kid from nowhere who found a niche sport, trained obsessively, and was perfect on the biggest night.':
      '윤성빈以前、韓国にスケルトンの伝統はありませんでした。19歳でこの競技を発見し、ニッチなプログラムでトレーニングを積み、2018年平昌のホーム五輪で — 4走すべてにコース新記録を出して金メダルを獲得しました。五輪スケルトン史上最も支配的なパフォーマンス。カスタムのアイアンマン・ヘルメットを被り、ホームの観衆の前でそりに向かってダッシュしました。どこにでもいる若者がニッチなスポーツを見つけ、執念深くトレーニングし、最大の夜に完璧でした。',
    'Korean archery has dominated the Olympics for over 40 years — the world\'s most consistent sporting dynasty. Kim Woo-jin is its current peak. At the 2024 Paris Olympics, he won three golds: individual, team, and mixed team — the first male archer to achieve a Paris triple gold. He holds world records in the recurve discipline. Korea\'s secret: a brutal national selection process where dozens compete for three team spots, forging athletes who are perfect under pressure.':
      '韓国のアーチェリーは40年以上にわたって五輪を制覇 — 世界で最も一貫したスポーツ王朝。김우진はその現在の頂点です。2024年パリ五輪で個人・団体・混合団体の3冠を達成 — パリで男子アーチェリー3冠を達成した初の選手。リカーブ競技で世界記録を保有しています。韓国の秘訣：数十人が3つの代表枠を争う過酷な選考過程が、プレッシャーの下で完璧なアスリートを鍛えます。',
    'Rhythmic gymnastics was not a mainstream Korean sport before Son Yeon-jae. She changed that single-handedly. Training from age 6, she competed at London 2012 and Rio 2016, consistently finishing in the top 5 in a discipline dominated by Russia and Eastern Europe — the first Korean to be genuinely competitive at global level. She brought rhythmic gymnastics into Korean mainstream consciousness and inspired thousands of girls to begin training.':
      '손연재以前、新体操は韓国の主流スポーツではありませんでした。彼女はそれをたった一人で変えました。6歳からトレーニングを始め、ロンドン2012とリオ2016の両五輪に出場し、ロシアと東欧が支配する競技で一貫してトップ5内に入りました — 世界レベルで真に競争力を持った初の韓国人。彼女は新体操を韓国の主流意識の中に持ち込み、何千人もの女の子たちにトレーニングを始めるきっかけを与えました。',
    'Esports is now an Olympic-recognized discipline, and Faker is its greatest athlete. Four World Championship titles spanning a decade. As traditional athletes age and decline, Faker won his fourth title at 27 — when most esports players have already retired. His 1v1 against Ryu in 2013 is the most replayed moment in esports history. Korea treats him with the reverence of any Olympic gold medalist. Full story in the K-Gaming section.':
      'eスポーツは今や五輪公認競技であり、Fakerはその最高のアスリートです。10年にわたる4回の世界選手権タイトル。伝統的なアスリートが老いて衰えていく一方で、Fakerは多くのeスポーツ選手がすでに引退している27歳でその4度目のタイトルを獲得しました。2013年のRyuとの1v1はeスポーツ史上最も多く再生される瞬間です。韓国は彼をどの五輪金メダリストとも同じ崇敬の念で扱っています。詳細はK-Gamingセクションで。',

    // Sports vocabulary table (eng-cell text nodes after .kor-trans span)
    'Football / Soccer': 'サッカー / フットボール',
    'Baseball': '野球',
    'Basketball': 'バスケットボール',
    'Taekwondo (Korean martial art)': 'テコンドー（韓国の武道）',
    'Korean wrestling': '韓国相撲（シルム）',
    'Athlete / player': 'アスリート / 選手',
    'Coach / director': 'コーチ / 監督',
    'Team': 'チーム',
    'Cheering / supporting': '応援 / サポート',
    'Stadium / arena': 'スタジアム / アリーナ',
    'Championship / winning': '優勝 / 勝利',
    'Scoring a point / goal': '得点 / ゴール',
    'Foul / rule violation': '反則 / ルール違反',
    'Olympics': 'オリンピック',
    'Gold medal': '金メダル',
    'National representative / team': '国家代表 / チーム',

    // Traditional Korean Sports (etiquette cards)
    'Taekwondo': 'テコンドー',
    'Korea\'s national martial art. Known for fast, high kicks and jumping/spinning techniques. Olympic sport since 2000. The word means "the way of foot and fist" — 태 (foot) + 권 (fist) + 도 (way).':
      '韓国の国技。速くて高い蹴り技やジャンプ・回転技で知られています。2000年から五輪正式競技。その名は「足と拳の道」を意味します — 태（足）＋권（拳）＋도（道）。',
    'Ssireum': 'シルム',
    'Traditional Korean wrestling. Two opponents grab each other\'s cloth belt (샅바) and try to throw the other to the ground. Traditionally held at festivals. Winners receive an ox as a prize.':
      '韓国伝統の相撲。二人の競技者が互いの布ベルト（샅바）をつかみ相手を地面に投げ倒そうとします。伝統的に祭りで行われます。優勝者は牛が贈られます。',
    'Gukgung': '国弓（クッグン）',
    'Traditional Korean archery. Uses a recurve composite bow (각궁) from horseback or standing. Korea is world-famous for its Olympic archery prowess, dominating for decades.':
      '韓国伝統のアーチェリー。馬上または立位でリカーブ複合弓（각궁）を使います。韓国は数十年にわたって五輪アーチェリーを制覇し世界的に有名です。',
    'Jegichagi': '제기차기',
    'Traditional Korean hacky-sack. A weighted shuttlecock (제기) is kept in the air using only the feet. A popular children\'s game traditionally played during Seollal (Lunar New Year).':
      '韓国伝統のけまり。重りの付いた羽根（제기）を足だけで宙に浮かし続けます。설날（旧正月）に伝統的に遊ばれる子どもたちの人気ゲームです。',

    // KBO culture info box
    'KBO — A Sports Experience Unlike Anywhere Else on Earth': 'KBO — 地球上のどこにもないスポーツ体験',
    'Going to a KBO game is not just watching baseball — it\'s attending a full-scale live performance. Every batter has a personalized cheer song the entire stadium sings in unison. Professional cheerleaders lead synchronized dances on the dugout roof. Fans wave team-colored props, eat fried chicken and ramen, and continue cheering win or lose. Foreign visitors consistently describe it as the most fun they\'ve ever had at a sporting event.':
      'KBOの試合に行くことは単なる野球観戦ではありません — フルスケールのライブパフォーマンスに参加することです。すべての打者にはスタジアム全体が合唱する個人応援歌があります。プロのチアリーダーがダグアウトの屋根の上でシンクロダンスを披露します。ファンはチームカラーの小道具を振り、チキンとラーメンを食べ、勝敗に関わらず応援し続けます。外国人訪問者はスポーツイベントで最高に楽しかったと一致して語ります。',

    // Stadium food descriptions
    'The soul food of KBO. Fried chicken paired with cold beer — delivered right to your seat by stadium vendors. The combination is so inseparable from baseball that 치맥 is practically synonymous with a KBO night. Vendors walk the aisles every half-inning; chicken arrives in boxes, beer in large plastic cups. Order early, watch the game, repeat.':
      'KBOのソウルフード。フライドチキンと冷たいビールのペアリング — スタジアムの売り子があなたの席まで届けてくれます。その組み合わせは野球と切り離せないため、치맥はKBOの夜の代名詞です。売り子は半イニングごとに通路を歩き、チキンは箱で、ビールは大きなプラスチックカップで届きます。早めに注文して、試合を観て、繰り返す。',
    'Korean baseball stadiums serve instant noodles (라면) — hot, in a paper cup, eaten with chopsticks right in the stands. The combination of cold night air, a tight ballgame, and steaming broth is a quintessentially Korean experience that no overseas ballpark can replicate. On a cold April or October evening, stadium 라면 sells out fast.':
      '韓国の野球場ではインスタント麺（라면）が提供されます — 熱々のまま紙コップに入れて、スタンドでそのまま箸を使って食べます。冷たい夜の空気、緊張した試合、湯気の立つスープの組み合わせは、海外の球場では再現できない韓国ならではの体験です。4月や10月の寒い夜には球場の라면はすぐに売り切れます。',
    'Dried squid (오징어) and pressed filefish strips (쥐포) are iconic Korean ballpark snacks — grilled on flat presses at concession stands. The smell of roasting squid drifting through a stadium on a warm summer night is an unmistakable sensory memory for anyone who grew up going to KBO games. Served with 고추장 on the side.':
      '乾燥イカ（오징어）と圧縮カワハギの細切り（쥐포）は韓国の球場を代表するスナックで、売店のフラットプレスで焼かれます。温かな夏の夜にスタジアムに漂うイカを焼く香りは、KBOの試合で育った誰にとっても忘れられない感覚の記憶です。고추장を添えて提供されます。',
    'Sajik Baseball Stadium in Busan — home of the Lotte Giants — has one of the most iconic traditions in all of Korean sports. Lotte fans fill orange plastic bags (주황색봉지) with air, seal them, and wave them in unison — creating a rippling sea of orange visible from every corner of the stadium. The orange bag is the symbol of Busan baseball spirit: loud, passionate, and impossible to forget.':
      '釜山のサジク野球場 — ロッテ・ジャイアンツの本拠地 — は韓国スポーツ全体で最も象徴的な伝統の一つを持っています。ロッテのファンたちはオレンジ色のビニール袋（주황색봉지）に空気を入れ、縛り、一斉に振ります — スタジアムのどの角からも見えるオレンジ色の波が生まれます。オレンジ袋は釜山野球魂の象徴：大きな声、情熱的、忘れることができません。',

    // KBO cheerleaders tip box
    '치어리더 — Not Sideline Decoration: They Are the MC of the Stadium': '치어리더 — サイドラインの飾りではなく：彼女たちがスタジアムのMCです',
    'KBO cheerleaders stand on top of the home team\'s dugout roof and lead the entire stadium through every inning of every game. They are central, not peripheral. Each team\'s cheerleader squad has choreographed routines for every player\'s 응원가. When a batter walks to the plate, the cheerleader cues the crowd and thousands of fans begin singing and dancing in perfect sync. Successful KBO cheerleaders build their own celebrity following and cross over into TV and social media — the role is a legitimate professional performance career.':
      'KBOのチアリーダーはホームチームのダグアウトの屋根の上に立ち、全試合の全イニングを通じてスタジアム全体をリードします。彼女たちは周辺ではなく、中心的な存在です。各チームのチアリーダー部隊はすべての선수の응원가に振り付けルーティンを持っています。打者が打席に向かうとき、チアリーダーが合図を送り、何千人ものファンが完璧なシンクロで歌い踊り始めます。人気のあるKBOチアリーダーは独自のセレブとしての追随者を築き、TVやSNSに進出します — この役割は正当なプロフェッショナルのパフォーマンスキャリアです。',

    // KBO cheerleader card descriptions
    'Unlike American baseball where staff stay on ground level, KBO cheerleaders perform elevated on the dugout roof — at home plate height, visible from every seat. This positioning makes them the visual anchor of the entire ballpark during a home half-inning. The PA system blasts the 응원가; the cheerleader leads the movement; the crowd follows.':
      'スタッフがグラウンドレベルに留まるアメリカ野球と異なり、KBOのチアリーダーはダグアウトの屋根の上 — ホームプレートの高さで、すべての席から見える位置でパフォーマンスします。このポジションが彼女たちをホームの攻撃時の球場全体のビジュアル的な錨にしています。PAシステムが응원가を流し、チアリーダーが動きをリードし、観客が続きます。',
    'Every player on the roster gets a unique 응원가 with its own choreography. Cheerleaders know all of them — switching instantly as each batter is announced. Fans know them too. Visiting a KBO game for the first time and watching 30,000 people spontaneously break into synchronized dance for a specific batter is a genuinely astonishing experience.':
      'ロスターのすべての選手が独自の振り付けを持つ응원가を持ちます。チアリーダーはすべてを知っています — 各打者がアナウンスされるたびに瞬時に切り替えます。ファンたちも知っています。初めてKBOの試合を訪れ、特定の打者のために30,000人が自発的にシンクロダンスを始めるのを観ることは、本当に驚くべき体験です。',
    'Hardcore KBO fans travel to away games with full gear: banners, thunder sticks, and their team\'s full 응원가 repertoire. When home and away cheer sections face each other in a KBO stadium — both singing simultaneously — the layered noise creates an atmosphere that rivals any sporting event in the world. 원정 응원단 members are treated as heroes by their clubs.':
      'ハードコアのKBOファンたちはバナー、サンダースティック、チームの全응원가レパートリーを持って遠征試合へ旅行します。KBOスタジアムでホームとアウェイの応援団が向き合い — 両方が同時に歌うとき — 重層的な騒音が世界のどんなスポーツイベントにも匹敵する雰囲気を作ります。원정 응원단のメンバーはクラブからヒーローとして扱われます。',

    // Bat flip info box
    '빠던 (빠따를 던지다) — Korea Made the Bat Flip an Art Form': '빠던（빠따를 던지다）— 韓国はバットフリップを芸術にした',
    'In American baseball, a bat flip after a home run is considered disrespectful — "showing up" the pitcher. In KBO, the bat flip (빠던 — shortened from 빠따를 던지다, "to throw the bat") is celebrated as pure self-expression. Korean sluggers flip, twirl, and admire their bat with individual style after a big hit. When José Bautista\'s epic bat flip in the 2015 MLB playoffs became a worldwide viral moment, Korean fans smiled knowingly: "We\'ve been doing this for decades."':
      'アメリカ野球ではホームランの後のバットフリップは失礼 — 「投手を見せしめにする」と見なされます。KBOでは、バットフリップ（빠던 — 빠따를 던지다「バットを投げる」の略）は純粋な自己表現として称えられます。韓国の強打者たちは大きなヒットの後に個性的なスタイルでバットをはじき、くるくる回し、眺めます。2015年MLBプレーオフでホセ・バウティスタの伝説的なバットフリップが世界的なバイラルモーメントになったとき、韓国のファンたちは知ったように微笑みました：「私たちは数十年これをやってきた。」',

    // Bat flip card descriptions
    'Every KBO slugger develops a signature 빠던 — some spin the bat 180°, some let it drop with casual cool, some launch it high in celebration. Fans discuss and rank whose 빠던 is the most stylish. A dramatic walk-off 빠던 becomes a GIF shared across Korean social media for weeks. It is a form of personal brand as much as athletic celebration.':
      'すべてのKBOの強打者はシグネチャーの빠던を開発します — 180°スピンさせる者、さりげなくクールに落とす者、高く打ち上げる者。ファンたちは誰の빠던が最もスタイリッシュか議論し順位をつけます。劇的なサヨナラ빠던は韓国のSNSで何週間もシェアされるGIFになります。それはアスリートのお祝いと同じくらい個人ブランドの一形態です。',
    'Foreign pitchers playing in the KBO occasionally take offense at bat flip culture — a culture clash that makes Korean sports headlines. The Korean view: the bat flip is celebration of the moment, not taunting of the pitcher. This is a fundamental cultural distinction. Understanding 빠던 means understanding that Korean baseball has a different emotional vocabulary than the American game.':
      'KBOでプレーする外国人投手がバットフリップ文化に時々不快感を示すことがあります — 韓国スポーツ紙で話題になる文化の衝突です。韓国の見方：バットフリップはその瞬間の祝福であり、投手への挑発ではありません。これは根本的な文化的区別です。빠던を理解することは、韓国野球がアメリカの野球とは異なる感情の語彙を持っていることを理解することを意味します。',
    'Korean-born MLB players brought their 빠던 habits to the major leagues, normalizing expressive bat celebrations. Today\'s bat flip culture in MLB — increasingly accepted and celebrated — owes something to the Korean standard that practiced it openly for decades before it was cool. KBO was ahead of the cultural curve by a generation.':
      '韓国出身のMLB選手たちが빠던の習慣をメジャーリーグに持ち込み、表現豊かなバットのお祝いを標準化しました。今日のMLBのバットフリップ文化 — ますます受け入れられ称えられるようになっている — は、それがカッコよくなる前から何十年も公然と実践してきた韓国の基準に何かを負っています。KBOは文化的な潮流において一世代先を行っていました。',

    // 응원가 tip box
    'Every Batter Gets Their Own Song — 전 선수 개인 응원가': 'すべての打者に自分だけの歌 — 전 선수 개인 응원가',
    'The KBO 응원가 system is unique in world sports: every player on the active roster has a personalized cheer song, composed specifically for them. When the batter\'s name is announced, tens of thousands of fans immediately begin singing from memory. New 응원가 are released before each season — teams hire professional composers for this. Some 응원가 become genuine hits listened to outside the stadium, even charting on Korean music platforms. The phenomenon has no direct equivalent anywhere else in professional sports.':
      'KBOの응원가システムは世界のスポーツで唯一無二です：アクティブロスターのすべての選手が、彼ら専用に作曲された個人응원가を持っています。打者の名前がアナウンスされると、何万人ものファンが即座に暗記した歌を歌い始めます。シーズン前に新しい응원가がリリースされます — チームはそのためにプロの作曲家を雇います。一部의응원가はスタジアム外でも聴かれる本物のヒット曲となり、韓国の音楽プラットフォームでチャートに入ることもあります。このフェノメノンはプロスポーツの他のどこにも直接的な同等物がありません。',

    // Phrase card eng translations
    '"[Player], let\'s go!" — A common hook structure in KBO 응원가, leading into the chorus where the crowd claps in unison. Instantly recognizable pattern to any regular KBO fan.':
      '「[選手]、行こう！」— KBOの응원가でよく使われるフック構造で、観客が一斉に手を叩くサビへと続きます。どのKBOファンにも瞬時に認識されるパターンです。',
    '"Hit a home run!" — Erupts spontaneously when a power hitter steps up with runners on base. The crowd volume surges to match the stakes. Not choreographed — purely organic crowd energy.':
      '「ホームランを打て！」— ランナーがいる場面で強打者が打席に立つと自然発生的に沸き起こります。観客の音量は状況の緊張感に合わせて高まります。振り付けではなく — 純粋に有機的な群衆のエネルギーです。',
    '"Our team, fighting! Win!" — A versatile chant that works in any situation. The rhythm matches the percussion of the 응원단 (cheering section). Even a first-time visitor picks it up within two innings.':
      '「我がチーム、ファイティング！勝て！」— どんな状況でも使える汎用性の高いチャントです。そのリズムは응원단（応援団）の打楽器に合っています。初めての訪問者でも2イニング以内に覚えられます。',
    '"You worked hard! You fought well!" — Said after a loss. KBO fans cheer their team\'s effort regardless of the score — a culture of respect that distinguishes Korean fandom from win-only mentalities.':
      '「よく頑張った！よく戦った！」— 負けた後に言われます。KBOのファンたちはスコアに関わらずチームの努力を応援します — 勝ちだけを重視するメンタリティとは一線を画す韓国ファンダムの尊重の文化です。',

    // Baseball vocabulary table
    'Pitcher': 'ピッチャー',
    'Batter': 'バッター',
    'Home run': 'ホームラン',
    'Fried chicken + beer (stadium food)': 'フライドチキン＋ビール（球場の定番）',
    'Cheer song': '応援歌',

    // Stadium cheer chant explanations
    'Republic of Korea! (famous fan chant from 2002 World Cup)': '大韓民国！（2002年W杯の有名なファンチャント）',
    'Win! Win! (general sports cheer)': '勝て！勝て！（一般的なスポーツ応援）',
    'Fighting! Go for it! (universal Korean cheer)': 'ファイティング！頑張れ！（韓国の万能応援コール）',
    'We are the best!': '私たちが最高だ！',
    'Home run! Home run! Home run! (baseball chant)': 'ホームラン！ホームラン！ホームラン！（野球チャント）',
    'You worked hard! (said to players after a match, win or lose)': 'お疲れ様！（勝敗に関わらず試合後に選手に贈る言葉）',

    // Korea at the Olympics info box
    'Korea at the Olympics': '韓国とオリンピック',
    'South Korea has hosted the Olympics twice: Summer 1988 in Seoul (올림픽) and Winter 2018 in Pyeongchang (평창). Korea consistently ranks highly in archery (양궁), short-track speed skating (쇼트트랙), and taekwondo (태권도). The national team is called 국가대표 (guk-ga-dae-pyo).':
      '韓国はオリンピックを2回開催しています：1988年夏季ソウル大会（올림픽）と2018年冬季平昌大会（평창）。韓国はアーチェリー（양궁）、ショートトラック・スピードスケーティング（쇼트트랙）、テコンドー（태권도）で常に上位にランクされます。代表チームは국가대표（guk-ga-dae-pyo）と呼ばれています。',

    // ── K-Movie page (kmovie.html) — full translation ──────────

    // sidebar brand desc (kmovie.html has "K-Movie" in the list)
    'K-Pop, K-Drama, K-Movie, food, beauty, fashion, gaming, sports & traditions.': 'K-ポップ、K-ドラマ、K-映画、料理、美容、ファッション、ゲーム、スポーツ＆伝統。',

    // page header — hero paragraph (split by <em>Parasite</em>)
    'From intimate art-house dramas to genre-bending thrillers, Korean cinema has earned a cherished place in world film culture. Bong Joon Ho\'s historic victories at Cannes and the Academy Awards with':
      '親密な芸術映画からジャンルを超えたスリラーまで、韓国映画は世界映画文化に大切な地位を確立しました。ポン・ジュノ監督の「パラサイト 半地下の家族」によるカンヌとアカデミー賞での歴史的勝利は、',
    'Parasite': 'パラサイト 半地下の家族',
    'showed that Korean stories resonate deeply with audiences everywhere. Explore the history, genres, directors, and language behind one of the world\'s most celebrated film traditions.':
      '韓国の物語が世界中の観客に深く響くことを示しました。世界で最も称賛される映画の伝統の一つの歴史、ジャンル、監督、言語を探求しましょう。',

    // History section
    '📽️ Korean Cinema History · 한국 영화 역사': '📽️ 韓国映画の歴史 · 한국 영화 역사',
    'Korean cinema has evolved from government-censored melodramas of the 1960s into one of the most critically acclaimed film industries in the world. Each decade brought a transformation — from the first black-and-white features to Palme d\'Or glory and beyond.':
      '韓国映画は1960年代の政府検閲下のメロドラマから世界で最も高く評価される映画産業の一つへと発展しました。毎十年ごとに変革が訪れました — 最初の白黒作品からパルム・ドールの栄光まで。',

    // Photo card titles & captions
    'The Birth of Korean Cinema': '韓国映画の誕生',
    'Korea\'s first motion picture, 의리적 구투 (Righteous Revenge), screened in 1919 at Danseongsa theater in Seoul. The 1950s and 60s brought a melodrama golden era. By the 1970s Korean cinema had a distinct identity — though government censorship sharply limited creative expression until the 1990s.':
      '韓国初の映画「의리적 구투」（義理の仇討ち）が1919年ソウルの団成社劇場で上映されました。1950〜60年代にメロドラマの黄金時代が到来。1970年代には韓国映画が独自のアイデンティティを確立しましたが、1990年代まで政府検閲が創作表現を大きく制限しました。',
    'Korean New Wave — Genre Breakthrough': '韓国ニューウェーブ — ジャンルの突破口',
    '쉬리 (Shiri, 1999) broke domestic box office records and outsold Hollywood in Korea for the first time. 공동경비구역 JSA (2000) by Park Chan-wook introduced Korean political thriller filmmaking to the world. Within a few years, Bong Joon Ho, Park Chan-wook, and 이창동 all emerged — and the Korean New Wave was born.':
      '「シュリ」（1999）が国内興行記録を塗り替え、初めて韓国でハリウッドを上回りました。パク・チャヌク監督の「JSA ジョイント・セキュリティ・エリア」（2000）が韓国の政治スリラー映画を世界に紹介しました。数年のうちにポン・ジュノ、パク・チャヌク、イ・チャンドンが台頭し、韓国ニューウェーブが誕生しました。',
    'Parasite — Historic Night at the Oscars': '「パラサイト 半地下の家族」— アカデミー賞の歴史的な夜',
    '기생충 (Parasite, 2019) by Bong Joon-ho won the Cannes Palme d\'Or AND became the first non-English language film to win the Academy Award for Best Picture — also taking Director, International Film, and Original Screenplay. Four Oscars in one night, a milestone for world cinema.':
      'ポン・ジュノ監督の「パラサイト 半地下の家族」（2019）はカンヌ・パルム・ドールを受賞し、非英語圏映画として初めてアカデミー作品賞を獲得しました。監督賞・国際長編映画賞・脚本賞も受賞し、一夜で4冠達成は世界映画史のマイルストーンです。',

    // Timeline
    '🏆 K-Movie History Timeline · 역사 타임라인': '🏆 韓国映画歴史年表 · 역사 타임라인',
    '의리적 구투 — Korea\'s First Film': '의리적 구투 — 韓国初の映画',
    'Korea\'s first motion picture screened at Danseongsa theater in Seoul. Silent film with live narration (변사) — a tradition that survived into the 1930s. Early Korean cinema focused on melodrama, independence themes, and adapted stage plays.':
      '韓国初の映画がソウルの団成社劇場で上映されました。라이브 해설（변사）を伴う無声映画で1930年代まで続く伝統でした。初期の韓国映画はメロドラマ、独立運動のテーマ、舞台劇の映画化に集中していました。',
    'The Golden Age of Melodrama': 'メロドラマの黄金期',
    'Post-Korean War cinema flourished with emotional family and romance melodramas. Directors like 신상옥 (Shin Sang-ok) produced hundreds of films. At its peak, Korea had over 200 domestic films produced per year and a thriving theatrical culture nationwide.':
      '朝鮮戦争後、感情豊かな家族・ロマンスメロドラマが花開きました。신상옥（シン・サンオク）監督らが数百本の映画を制作。最盛期には年間200本以上の国内映画が制作され、全国的に映画館文化が栄えました。',
    '씨받이 — First International Recognition': '씨받이 — 初の国際的認知',
    '임권택 (Im Kwon-taek)\'s 씨받이 (Surrogate Mother) won Best Actress at the Venice Film Festival — Korea\'s first major international film award. Im Kwon-taek went on to win the Cannes Best Director award in 2002 for 취화선 (Painted Fire), cementing Korea\'s art-house credentials.':
      '임권택（イム・グォンテク）監督の「씨받이」（씨받이〜種の哀歌〜）がヴェネツィア映画祭で主演女優賞を受賞 — 韓国初の主要国際映画賞です。임권택監督は2002年「취화선」（酔画仙）でカンヌ監督賞も受賞し、韓国アート映画の地位を確立しました。',
    '서편제 — Korea\'s First Million-Audience Film': '서편제 — 韓国初の百万観客映画',
    '임권택\'s 서편제 (Sopyonje), about a family of traditional 판소리 singers, became the first Korean film to surpass 1 million admissions in Seoul alone. It ignited national pride in Korean traditional culture and proved domestic cinema could draw large audiences without Hollywood-style spectacle.':
      '임권택監督の「서편제」（風の丘を越えて）は伝統的な판소리歌手の家族の物語で、ソウルだけで100万人を超えた最初の韓国映画となりました。韓国伝統文化への国民的誇りを呼び覚まし、ハリウッド式スペクタクルなしに大勢の観客を集められることを証明しました。',
    '쉬리 — Korea\'s First Blockbuster': '쉬리 — 韓国初のブロックバスター',
    '쉬리 (Shiri), a spy thriller about North and South Korean agents, beat Titanic\'s domestic box office record in Korea. Produced for $5 million USD, it earned 10× returns and launched the era of high-budget Korean commercial cinema — and Hollywood studios finally noticed Korean film.':
      '「シュリ」は南北朝鮮の工作員を描いたスパイスリラーで、韓国国内の「タイタニック」興行記録を塗り替えました。500万ドルで製作され10倍の収益を上げ、大予算の韓国商業映画時代を切り開きました。ハリウッドスタジオもついに韓国映画に注目しました。',
    '살인의 추억 & 올드보이 — Korean New Wave Peak': '殺人の追憶 & オールド・ボーイ — 韓国ニューウェーブの頂点',
    'Bong Joon Ho\'s 살인의 추억 (Memories of Murder) and Park Chan-wook\'s 올드보이 (Oldboy) both released in 2003 — a landmark year. 올드보이 won the Cannes Grand Prix. Critics globally recognized Korean cinema as a distinct, vital new voice in world film that year.':
      'ポン・ジュノ監督の「殺人の追憶」とパク・チャヌク監督の「オールド・ボーイ」がともに2003年に公開 — 記念碑的な年でした。「オールド・ボーイ」はカンヌ審査員特別大賞を受賞。その年、世界の批評家が韓国映画を世界映画の独自で活気ある新しい声として認めました。',
    '괴물 — Genre Milestone': 'グエムル 漢江の怪物 — ジャンルのマイルストーン',
    'Bong Joon Ho\'s 괴물 (The Host) became Korea\'s highest-grossing film at the time with 13 million admissions. It blended creature feature, family drama, and government satire in a way no one had seen before — and proved Korean genre cinema could work at any scale.':
      'ポン・ジュノ監督の「グエムル 漢江の怪物」は当時1,300万観客で韓国最高興行作となりました。クリーチャー映画・家族ドラマ・政府風刺を前例のない形で融合させ、韓国ジャンル映画がどんな規模でも通用することを証明しました。',
    '부산행 & 곡성 — Horror Finds a Global Audience': '新感染 ファイナル・エクスプレス & 哭声/コクソン — ホラーが世界的観客を獲得',
    '연상호\'s 부산행 (Train to Busan) and 나홍진\'s 곡성 (The Wailing) both released in 2016, showing two very different approaches to horror. Train to Busan became the benchmark for modern zombie cinema; The Wailing appeared on international critics\' year-end lists worldwide.':
      '연상호監督の「新感染 ファイナル・エクスプレス」と나홍진監督の「哭声/コクソン」がともに2016年に公開され、ホラーへの全く異なる二つのアプローチを見せました。「新感染」は現代ゾンビ映画の基準となり、「哭声」は世界中の批評家の年間ベスト作品に選ばれました。',
    '기생충 — Palme d\'Or & Best Picture Oscar': 'パラサイト 半地下の家族 — パルム・ドールとアカデミー作品賞',
    'Bong Joon Ho\'s 기생충 (Parasite) wins the Cannes Palme d\'Or (the first Korean film to do so) and then sweeps the Academy Awards — Best Picture, Best Director, Best International Film, Best Original Screenplay. The night of February 9, 2020 rewrote global cinema history.':
      'ポン・ジュノ監督の「パラサイト 半地下の家族」がカンヌ・パルム・ドール（韓国映画初）を受賞し、アカデミー賞を席巻 — 作品賞・監督賞・国際長編映画賞・脚本賞を獲得。2020年2月9日の夜は世界映画史を書き換えました。',
    '파묘 — Cultural Phenomenon': '破墓/パミョ — 文化的現象',
    '장재현\'s 파묘 (Exhuma), a shaman horror film exploring Korean folk tradition and Japanese colonial trauma, surpassed 12 million admissions in Korea — the highest for any Korean film since 2019. It sparked national conversations about shamanism, history, and cultural memory.':
      '장재현監督の「破墓/パミョ」は韓国の民俗伝統と日本植民地時代のトラウマを探求したシャーマンホラーで国内1,200万人を突破 — 2019年以降の韓国映画最高記録。シャーマニズム、歴史、文化的記憶について全国的な議論を巻き起こしました。',

    // How K-Movies Are Made
    '🎬 How K-Movies Are Made · 제작 방식': '🎬 韓国映画はどう作られるか · 제작 방식',
    'Korean filmmaking has a director-driven culture that differs significantly from Hollywood\'s studio system. Understanding how Korean films are financed, shot, and distributed reveals why they feel so uniquely authored — and so emotionally uncompromising.':
      '韓国映画制作はハリウッドのスタジオシステムとは大きく異なる監督主導の文化を持っています。韓国映画がどのように資金調達・撮影・配給されるかを理解することで、なぜそれが独特に作家的で感情的に妥協しないのかがわかります。',
    'Director-Driven Cinema · 감독 중심 영화': '監督主導の映画 · 감독 중심 영화',
    'Korean cinema is largely director-driven rather than studio-driven. The 감독 (director) holds creative control in a way rare in Hollywood. 봉준호 prepares meticulous storyboards (콘티) for every scene. Park Chan-wook is known to design every camera angle months in advance. The director\'s vision comes first.':
      '韓国映画はスタジオ主導ではなく主に監督主導です。감독（監督）はハリウッドでは稀なほどの創作的コントロールを持ちます。ポン・ジュノはすべてのシーンの콘티（絵コンテ）を丁寧に準備し、パク・チャヌクは数カ月前からすべてのカメラアングルを設計します。監督のビジョンが最優先です。',
    'Investment & Distribution System · 투자·배급': '投資・配給システム · 투자·배급',
    'Korean film investment is structured through 투자·배급사 (investor-distributor companies). The "Big Three" — CJ ENM, Lotte Entertainment, and Showbox — control most theatrical distribution. Independent films rely on Korea\'s vibrant festival circuit, anchored by 부산국제영화제 (BIFF), Asia\'s largest film festival.':
      '韓国映画の投資は투자·배급사（投資・配給会社）の構造で行われます。「ビッグ3」— CJ ENM、ロッテエンターテインメント、ショウボックス — が劇場配給の大部分を担います。独立映画はアジア最大の映画祭である부산국제영화제（BIFF）を軸とした活発な映画祭回路に依存しています。',
    'Film Culture & Shooting Locations · 촬영 문화': '映画文化と撮影地 · 촬영 문화',
    'Korean crews are known for intensive shoots and long hours. Korea\'s diverse geography — dense urban Seoul, forested mountains, dramatic coastlines — provides rich settings. Many Korean films use actual locations rather than sets, giving them a documentary texture. 기생충\'s 반지하 (semi-basement) is a real Seoul housing type that viewers worldwide came to recognize.':
      '韓国の撮影チームは集中した撮影と長時間労働で知られています。密集した都市ソウル、森林の山々、ドラマチックな海岸線など韓国の多様な地形が豊かな舞台を提供します。多くの韓国映画はセットではなく実際の場所を使用し、ドキュメンタリー的な質感を与えます。「パラサイト」の반지하（半地下）は世界中の観客が知ることになった実際のソウルの住居形態です。',

    // Comparison table
    '🌍 K-Movie vs Hollywood vs French Cinema': '🌍 韓国映画 vs ハリウッド vs フランス映画',
    'Creative control': 'クリエイティブコントロール',
    'Dominant genres': '主要ジャンル',
    'Endings': 'エンディング',
    'Social commentary': '社会的批評',
    'Average runtime': '平均上映時間',
    'Box office driver': '興行を牽引する要素',
    'Festival presence': '映画祭への参加',
    'Director-driven': '監督主導',
    'Studio / producer-driven': 'スタジオ / プロデューサー主導',
    'Director-driven (auteur)': '監督主導（作家主義）',
    'Thriller, melodrama, horror': 'スリラー、メロドラマ、ホラー',
    'Action, superhero, comedy': 'アクション、スーパーヒーロー、コメディ',
    'Drama, romance, art-house': 'ドラマ、ロマンス、アート系',
    'Often bittersweet or tragic': 'しばしば甘苦く、または悲劇的',
    'Often happy / resolved': 'しばしばハッピーエンド / 解決',
    'Often ambiguous': 'しばしば曖昧',
    'Very prominent': '非常に目立つ',
    'Moderate (wrapped in genre)': '中程度（ジャンルに包まれて）',
    'Prominent (often political)': '目立つ（しばしば政治的）',
    'Word-of-mouth': '口コミ',
    'Marketing budget': 'マーケティング予算',
    'Critical acclaim': '批評家の絶賛',
    'Cannes, Venice, Berlin, BIFF': 'カンヌ、ヴェネツィア、ベルリン、BIFF',
    'Sundance, TIFF': 'サンダンス、TIFF',
    'Cannes (home territory)': 'カンヌ（ホームフィールド）',

    // Genres section
    '🎭 Movie Genres · 영화 장르': '🎭 映画ジャンル · 영화 장르',
    'Korean cinema spans far beyond melodrama. Each genre has developed its own visual style, vocabulary, and emotional language — and Korean filmmakers have consistently subverted genre expectations to create something genuinely new.':
      '韓国映画はメロドラマを遥かに超えます。各ジャンルは独自の視覚的スタイル、語彙、感情的言語を発展させてきました — 韓国の映画制作者たちは一貫してジャンルの期待を覆し、真に新しいものを創造してきました。',
    'Drama / Melodrama': 'ドラマ / メロドラマ',
    'The heart of Korean cinema. Korean melodrama explores grief, class conflict, family bonds, and social pressure with an emotional intensity rarely found elsewhere. Korean characters often hold back tears — making the eventual release far more powerful. Slow pacing is always deliberate.':
      '韓国映画の核心です。韓国のメロドラマは悲しみ、階層対立、家族の絆、社会的プレッシャーを他ではほとんど見られない感情の強度で探求します。韓国の登場人物はしばしば涙をこらえ、それが最終的な解放をはるかに強力なものにします。ゆっくりしたペースは常に意図的です。',
    'Notable: 버닝, 오아시스, 밀양, 시 (Poetry)': '注目作品：バーニング 劇場版、오아시스、밀양、ポエトリー アグネスの詩',
    'Thriller / Crime': 'スリラー / 犯罪',
    'Among the most acclaimed in world cinema. Korean thrillers are known for moral complexity, social commentary, and endings that refuse easy resolution. The Korean thriller formula prioritizes atmosphere and character psychology over pure action — and trusts audiences to sit with discomfort.':
      '世界映画で最も高く評価されるジャンルの一つです。韓国スリラーは道徳的複雑さ、社会的批評、容易な解決を拒むエンディングで知られています。韓国スリラーの公式は純粋なアクションよりも雰囲気と人物心理を優先し、観客が不快感と共にいることを信頼します。',
    'Notable: 기생충, 살인의 추억, 악마를 보았다, 비밀은 없다': '注目作品：パラサイト 半地下の家族、殺人の追憶、악마를 보았다、비밀은 없다',
    'Korean horror blends psychological dread with folklore, family trauma, and social anxiety. Rather than jump scares, the best Korean horror builds suffocating dread through atmosphere. The 무당 (shaman) and traditional ghost stories (귀신) are uniquely Korean elements that give the genre cultural depth absent in Western horror.':
      '韓国ホラーは心理的恐怖を民間伝承、家族のトラウマ、社会的不安と融合させます。ジャンプスケアよりも、最高の韓国ホラーは雰囲気を通じて息苦しいほどの恐怖を構築します。무당（シャーマン）と伝統的な幽霊話（귀신）は西洋ホラーにない文化的深みをジャンルに与えるユニークな韓国的要素です。',
    'Notable: 장화홍련, 곡성, 파묘, 검은 사제들': '注目作品：장화홍련（箪笥）、哭声/コクソン、破墓/パミョ、검은 사제들',
    'Korean action cinema developed a visceral, kinetic style distinct from Hollywood CGI spectacle. Close-quarters combat, choreographed street fights, and practical stunts are hallmarks. The 마동석 (Ma Dong-seok) school of action — one devastating punch, problem solved — is uniquely Korean in its comedic-brutal balance.':
      '韓国アクション映画はハリウッドのCGIスペクタクルとは異なる内臓的で躍動的なスタイルを発展させました。近距離格闘、振り付けられた街頭戦闘、実践的なスタントが特徴です。마동석（マ・ドンソク）流のアクション — 一発の決定的なパンチで問題解決 — はコミカルと残酷のバランスでユニークに韓国的です。',
    'Notable: 아저씨, 범죄도시 시리즈, 신세계, 베테랑': '注目作品：아저씨（アジョシ）、범죄도시シリーズ（犯罪都市シリーズ）、신세계、베테랑',
    'Historical': '歴史劇',
    'Korean historical films explore Joseon dynasty politics, Japanese colonial occupation, and Korean War memory with epic production values. Many deal with national wounds — comfort women (위안부), the Gwangju Uprising (5·18) — making them profoundly emotionally and historically charged.':
      '韓国の歴史映画は朝鮮王朝の政治、日本植民地支配、朝鮮戦争の記憶を壮大な製作規模で探求します。多くが위안부（慰安婦）、光州蜂起（5·18）などの国家的傷を扱い、深く感情的・歴史的に充電された作品となっています。',
    'Notable: 암살, 귀향, 택시운전사, 1987': '注目作品：암살、귀향、タクシー運転手 約束は海を越えて、1987、ある闘いの真実',
    'Korean comedy is built on situational humor, family dynamics, and 빨리빨리 (hurry-hurry) culture pushed to absurd extremes. Slapstick is rarer than character comedy. The most successful Korean comedies carry social commentary beneath the laughs — a distinctly Korean double-track.':
      '韓国コメディは状況的ユーモア、家族ダイナミクス、빨리빨리（急げ急げ）文化を不条理な極限まで押し進めたものから構成されます。スラップスティックよりもキャラクターコメディが主流です。最も成功した韓国コメディは笑いの下に社会的批評を持つ — 独特の韓国的二重構造です。',
    'Notable: 극한직업, 엽기적인 그녀, 과속스캔들, 건축학개론': '注目作品：エクストリーム・ジョブ、엽기적인 그녀（猟奇的な彼女）、과속스캔들、건축학개론',
    'Art House': 'アート映画',
    'Korea has a rich tradition of internationally acclaimed art-house cinema championed at Cannes and Venice. Directors like 홍상수 (Hong Sang-soo) and 이창동 (Lee Chang-dong) make slow-cinema explorations of memory, longing, and human connection. Korean art-house films look simple but reward patient, attentive viewers.':
      '韓国はカンヌやヴェネツィアで称賛される国際的なアート映画の豊かな伝統を持っています。홍상수（ホン・サンス）や이창동（イ・チャンドン）のような監督が記憶、憧れ、人間的つながりのスローシネマ探求を行います。韓国のアート映画はシンプルに見えますが、辛抱強く注意深い観客に報います。',
    'Notable: 버닝, 시 (Poetry), 오아시스, 우리 선희': '注目作品：バーニング 劇場版、시（ポエトリー アグネスの詩）、오아시스、우리 선희',
    'Creature Feature': 'クリーチャー映画',
    'Bong Joon Ho\'s 괴물 (The Host) established the Korean template: the real monster is often the government, the system, or human indifference — while the creature attack provides the backdrop for family drama. Korean creature films blend social satire with monster thrills in ways Hollywood rarely attempts.':
      'ポン・ジュノ監督の「グエムル 漢江の怪物」が韓国の型を確立しました：本当の怪物はしばしば政府、システム、または人間の無関心であり、クリーチャーの攻撃は家族ドラマの背景となります。韓国のクリーチャー映画はハリウッドがほとんど試みない方法で社会諷刺とモンスタースリルを融合させます。',
    'Notable: 괴물, 승리호, 지구를 지켜라!': '注目作品：グエムル 漢江の怪物、승리호（勝利号 SPACE SWEEPERS）、지구를 지켜라！',

    // Must-Watch Films section
    '🎭 Must-Watch K-Movies · 필수 한국 영화': '🎭 必見K-映画 · 필수 한국 영화',
    'These films define Korean cinema\'s international reputation, broke box office records, or offer the best entry points for Korean learners. Each teaches different vocabulary, speech patterns, and cultural context — from Seoul slang to Joseon-era formal speech.':
      'これらの映画は韓国映画の国際的評判を定義し、興行記録を塗り替えるか、韓国語学習者に最高の入り口を提供します。それぞれがソウルのスラングから朝鮮時代の格式張った話し方まで、異なる語彙、話し方のパターン、文化的背景を教えてくれます。',

    // Film titles (drama-title text nodes)
    'Oldboy': 'オールド・ボーイ',
    'Memories of Murder': '殺人の追憶',
    'The Handmaiden': 'お嬢さん',
    'Burning': 'バーニング 劇場版',
    'The Host': 'グエムル 漢江の怪物',
    'Train to Busan': '新感染 ファイナル・エクスプレス',
    'The Wailing': '哭声/コクソン',
    'Extreme Job': 'エクストリーム・ジョブ',
    'The Roundup Series': '犯罪都市シリーズ',
    'Exhuma': '破墓/パミョ',
    'The Man from Nowhere': 'アジョシ',

    // Film 1: Parasite
    'The Kim family, living in a 반지하 (semi-basement), schemes their way into the wealthy Park household — until an unexpected discovery unravels everything. First non-English film to win Best Picture at the Academy Awards. Every dialogue line is deliberately chosen; rich in class vocabulary and Seoul informal speech.':
      '반지하（半地下）に住むキム家が裕福なパク家に入り込もうと計略を巡らせますが、予期せぬ発見ですべてが崩れていきます。非英語映画として初めてアカデミー作品賞を受賞。すべての台詞が意図的に選ばれており、階層の語彙とソウルの口語体が豊富です。',
    // Film 2: Oldboy
    'A man imprisoned without explanation for 15 years is suddenly released with five days to find out why. Part of Park Chan-wook\'s Vengeance Trilogy (복수 삼부작). Won the Cannes Grand Prix. The hallway fight sequence is studied in film schools globally — filmed in a single unbroken take.':
      '理由もなく15年間監禁された男が突然解放され、5日間でその理由を探します。パク・チャヌク監督の復讐三部作（복수 삼부작）の一部。カンヌ審査員特別大賞受賞。廊下の格闘シーンは世界の映画学校で研究されています — 一発の長回しで撮影されました。',
    // Film 3: Memories of Murder
    'Based on Korea\'s first serial murder case (1986–1991), two detectives with opposite methods chase an uncatchable killer in rural Gyeonggi-do. Teaches authentic 1980s Korean regional dialect (경기도 사투리) and police vocabulary. One of cinema\'s most haunting final images — the closing look to camera.':
      '韓国初の連続殺人事件（1986〜1991年）をもとに、正反対の方法を持つ二人の刑事が京畿道の農村で捕まえられない殺人犯を追います。1980年代の韓国地方方言（京畿道 사투리）と警察用語が学べます。映画史上最も印象的なラストシーン — カメラへの最後の眼差し。',
    // Film 4: The Handmaiden
    'A female pickpocket poses as a Japanese heiress\'s handmaiden to assist a con — but layers of deception unfold in unexpected directions. Set during Japan\'s colonial occupation of Korea, with dialogue in both Korean and Japanese. Formal Joseon-era speech patterns throughout, stunning visual composition.':
      '女性のすりが日本人相続女のお付き女中に変装して詐欺を手伝いますが、欺きの層が予想外の方向に展開します。朝鮮の日本植民地時代を舞台に、韓国語と日本語の両方の台詞が登場します。朝鮮時代の格式張った話し方のパターンと、息をのむビジュアル構成。',
    // Film 5: Burning
    'A young man falls for a free-spirited woman who returns from Africa with an ambiguous, unsettling companion. Based on a Haruki Murakami story. Slow-burning ambiguity and rich vocabulary of modern Korean youth alienation, class anxiety, and rural loneliness. Patience is deeply rewarded.':
      '若い男性がアフリカから曖昧で不穏な同伴者を連れて帰ってきた自由奔放な女性に恋をします。村上春樹の小説が原作。じりじり燃える曖昧さと、現代韓国青年の疎外感、階層的不安、田舎の孤独の豊かな語彙。忍耐が深く報われます。',
    // Film 6: The Host
    'A mutated creature from the Han River snatches a young girl — and her chaotic family must save her while evading a government cover-up. Korea\'s highest box office record at release: 13 million admissions. Teaches family vocabulary, government and bureaucracy terms, and Han River geography.':
      '漢江の突然変異した怪物が少女をさらい — 混乱した家族が政府の隠蔽を避けながら彼女を救わなければなりません。公開時の韓国興行記録：1,300万人。家族の語彙、政府・官僚制の用語、漢江の地理が学べます。',
    // Film 7: Train to Busan
    'A zombie outbreak spreads through a high-speed KTX train from Seoul to Busan. Pure genre thrills alongside sharp class commentary — white-collar passengers vs. working class vs. the infected. Became the benchmark for modern zombie cinema. Clear dialogue and recognizable settings — excellent for building vocabulary.':
      'ソウルから釜山へ向かうKTX高速列車の中でゾンビの感染が広がります。鋭い階層的批評と純粋なジャンルのスリル — ホワイトカラーの乗客 vs. 労働者階級 vs. 感染者。現代ゾンビ映画の基準となりました。明確な台詞と馴染みのある舞台設定 — 語彙構築に最適です。',
    // Film 8: The Wailing
    'A mysterious stranger arrives in a remote village and a plague of violence follows. A deeply unsettling blend of Korean folk horror, 무당 (shamanism), Christian imagery, and pure evil. Deliberately offers no clear answers. One of the most debated endings in Korean film history.':
      '謎の見知らぬ人が辺鄙な村に現れ、暴力の疫病が続きます。韓国民俗ホラー、무당（シャーマニズム）、キリスト教的イメージ、純粋な悪の深く不安な融合。意図的に明確な答えを提供しません。韓国映画史上最も議論されたエンディングの一つ。',
    // Film 9: Extreme Job
    'An undercover narcotics squad takes over a fried chicken restaurant as their stakeout post — then accidentally becomes Korea\'s most popular restaurant. Korea\'s second highest domestic box office record: 16 million admissions. Dialogue is natural, fast, and colloquial — ideal for intermediate learners.':
      '潜入麻薬捜査班が張り込みの拠点としてフライドチキン店を引き継いだところ、偶然にも韓国で最も人気のある店になってしまいます。韓国国内興行記録第2位：1,600万人。台詞が自然でテンポが速く口語的 — 中級学習者に理想的です。',
    // Film 10: The Roundup Series
    'Detective 마석도 (Ma Seok-do, played by 마동석) dismantles international crime syndicates with devastating, often comedic efficiency. Each film broke domestic box office records. Essential for learning authentic Korean detective slang, criminal underworld vocabulary, and working-class speech patterns.':
      'マ・ドンソクが演じる刑事マ・ソクドが国際犯罪組織を破滅的で、しばしばコミカルな効率で解体します。編ごとに国内興行記録を塗り替えました。正真正銘の韓国刑事スラング、犯罪アンダーワールドの語彙、労働者階級の話し方のパターンを学ぶのに必須です。',
    // Film 11: Exhuma
    'A 무당 (shaman) and a geomancer are hired to relocate a wealthy family\'s ancestor\'s grave — and unearth something far darker. Surpassed 12 million admissions in Korea. Deeply rooted in Korean folk religion, feng shui vocabulary (풍수), and Japanese colonial-era trauma.':
      'シャーマン（무당）と風水師が裕福な家族の先祖の墓を移転するために雇われますが、はるかに暗いものを掘り出します。韓国で1,200万人を突破。韓国の民間信仰、風水の語彙（풍수）、日本植民地時代のトラウマに深く根ざしています。',
    // Film 12: The Man from Nowhere
    'A mysterious former special agent forms a quiet bond with his only neighbor — a young girl from a neglected home. When she\'s taken, he unleashes everything to get her back. Won Best Film at Korea\'s Grand Bell Awards (대종상). Simple, emotionally rich vocabulary throughout — excellent for all levels.':
      '謎めいた元特殊エージェントが唯一の隣人 — 放置された家庭の幼い少女 — と静かな絆を結びます。彼女が連れ去られると、彼はすべてを解き放ちます。韓国大鐘賞最優秀作品賞受賞。全体的に単純で感情的に豊かな語彙 — すべてのレベルに最適です。',

    // Film tags
    'Oscar Winner': 'アカデミー賞受賞',
    'Cannes Grand Prix': 'カンヌ審査員特別大賞',
    'Regional Dialect': '地方方言',
    'Formal Korean': '格式体韓国語',
    'Youth Vocab': '若者語彙',
    'Social Satire': '社会諷刺',
    'Shamanism Vocab': 'シャーマニズム語彙',
    'Box Office Record': '興行記録',
    'Colloquial Korean': '口語韓国語',
    'Detective Slang': '刑事スラング',
    'Cultural Vocab': '文化語彙',

    // Directors section
    '🎖️ Iconic Directors · 전설의 감독들': '🎖️ 伝説の監督たち · 전설의 감독들',
    'Korean cinema\'s international reputation rests on a handful of filmmakers who built singular visual and narrative languages. Each director\'s films teach different Korean vocabulary, reflect different social realities, and reward repeated viewing.':
      '韓国映画の国際的評判は独自の視覚的・物語的言語を構築した少数の映画人たちの上に成り立っています。各監督の映画は異なる韓国語語彙を教え、異なる社会的現実を反映し、繰り返し観る価値があります。',
    'Director · 감독': '監督 · 감독',
    'Bong Joon-ho': 'ポン・ジュノ (봉준호)',
    'Park Chan-wook': 'パク・チャヌク (박찬욱)',
    'Lee Chang-dong': 'イ・チャンドン (이창동)',
    'Na Hong-jin': 'ナ・ホンジン (나홍진)',
    'Ryoo Seung-wan': 'リュ・スンワン (류승완)',
    'Yeon Sang-ho': 'ヨン・サンホ (연상호)',
    // Director bios (gen-desc)
    'The genre alchemist. Every Bong Joon-ho film mixes social commentary with precise genre mechanics — creature horror, thriller, family drama — into something entirely his own. His recurring theme: systems that protect the powerful at the expense of everyone else. Winner of Cannes Palme d\'Or and four Academy Awards for 기생충.':
      'ジャンルの錬金術師です。ポン・ジュノのすべての映画は社会的批評をクリーチャーホラー・スリラー・家族ドラマなど精密なジャンルメカニクスと融合させ、完全に独自のものを生み出します。繰り返し現れるテーマ：みんなの犠牲で権力者を守るシステム。「パラサイト 半地下の家族」でカンヌ・パルム・ドールとアカデミー賞4冠を達成。',
    'The virtuoso stylist. Known for the Vengeance Trilogy (복수 삼부작) — 복수는 나의 것, 올드보이, 친절한 금자씨 — and for visual compositions of stunning, sometimes disturbing beauty. His films ask how far revenge corrodes the soul of those who seek it. Won Cannes Grand Prix for 올드보이.':
      '巨匠スタイリストです。復讐三部作（복수 삼부작） — 「復讐者に憐れみを」、「オールド・ボーイ」、「親切なクムジャさん」 — と、時に不穏なほど美しい視覚構成で知られています。彼の映画は復讐がそれを求める者の魂をどれほど腐食させるかを問います。「オールド・ボーイ」でカンヌ審査員特別大賞受賞。',
    'The humanist. His films move slowly, deliberately, and with complete faith in their characters\' inner lives. Former teacher, novelist, and Korea\'s Minister of Culture — his screenplay precision reflects all three careers. 버닝 appeared on dozens of critics\' decade-best lists. Cannes Grand Prix winner for 오아시스.':
      'ヒューマニストです。彼の映画はゆっくりと、意図的に、登場人物の内面生活への完全な信頼を持って進みます。元教師、小説家、韓国文化部長官 — シナリオの精緻さは3つのキャリアすべてを反映しています。「バーニング 劇場版」は何十もの批評家の10年ベストリストに登場しました。「오아시스」でカンヌ審査員特別大賞受賞。',
    'Three films, each a landmark. 추격자 (The Chaser, 2008), 황해 (The Yellow Sea, 2010), 곡성 (The Wailing, 2016). Na Hong-jin\'s cinema is about the universe\'s indifference to human suffering — people trying desperately to do right in situations with no right answers. Deeply, profoundly unsettling.':
      '3本、どれも傑作です。「추격자」（チェイサー、2008）、「황해」（哀しき獣、2010）、「哭声/コクソン」（2016）。나홍진の映画は人間の苦しみに対する宇宙の無関心について — 正しい答えのない状況で正しいことをしようと必死に試みる人々。深く、根本的に不安を感じさせます。',
    'The action craftsman. Built Korean action cinema\'s reputation for kinetic, choreographed realism. His protagonists are working-class heroes — cops, soldiers, ordinary people pushed too far. 모가디슈 (Mogadishu, 2021) showed his full dramatic range. His films are essential for learning Korean working-class speech.':
      'アクションの職人です。韓国アクション映画の躍動感のある振り付けられたリアリズムの評判を築きました。彼の主人公は警察官、兵士、追い詰められた普通の人々などの労働者階級の英雄です。「モガディシュ 脱出までの14日間」（2021）は彼の完全な劇的幅を見せました。彼の映画は韓国の労働者階級の話し方を学ぶのに必須です。',
    'Began in dark animation — 돼지의 왕 (The King of Pigs) and 서울역 (Seoul Station) — before his live-action debut with 부산행 (Train to Busan). His recurring subject: ordinary people failing each other under extreme pressure. Extended his reach into K-Drama with 지옥 (Hellbound) on Netflix.':
      '暗いアニメーション「돼지의 왕」（豚の王）と「서울역」（ソウル・ステーション パンデミック）から始まり、「新感染 ファイナル・エクスプレス」で実写デビューしました。繰り返し現れるテーマ：極限の圧力下で互いに失敗する普通の人々。Netflixの「지옥」（地獄が呼んでいる）でK-ドラマにも活躍の場を広げました。',

    // Vocabulary section
    '📖 Essential Movie Vocabulary · 영화 핵심 어휘': '📖 映画必須語彙 · 영화 핵심 어휘',
    'Korean movies are a rich resource for absorbing authentic Korean. The vocabulary below covers the film terms, production language, and review expressions you\'ll use when watching and discussing Korean cinema.':
      '韓国映画は本物の韓国語を吸収するための豊かな資源です。以下の語彙は韓国映画を観て議論する際に使用する映画用語、制作言語、批評表現をカバーしています。',
    '🎬 영화 용어 · Movie Terms': '🎬 영화 용어 · 映画用語',
    '🎭 제작 & 인물 · Production & Characters': '🎭 제작 & 인물 · 製作・登場人物',
    '🏆 평론 & 시상 · Reviews & Awards': '🏆 평론 & 시상 · 批評・授賞',
    // Vocab table English column (text after .kor-trans span)
    'Movie / film': '映画',
    'Director': '監督',
    'Actor / actress': '俳優 / 女優',
    'Movie release / premiere': '映画公開 / プレミア',
    'Audience / moviegoers': '観客 / 映画鑑賞者',
    'Box office success': '興行的成功',
    'Subtitles': '字幕',
    'Dubbing': '吹き替え',
    'Filming / cinematography': '撮影 / 撮影技法',
    'Screening / showing': '上映 / 上演',
    'Lead actor / starring role': '主演俳優 / 主役',
    'Supporting actor': '助演俳優',
    'Cameo appearance': 'カメオ出演',
    'Screenplay / script': '脚本 / スクリプト',
    'Post-credits scene': 'エンドクレジット後のシーン',
    'Spoiler': 'ネタバレ',
    'Sequel': '続編',
    'Original source material': '原作',
    'Storyboard (from "continuity")': '絵コンテ（「continuity」から）',
    'Remake': 'リメイク',
    'Positive review / acclaim': '好評 / 称賛',
    'Harsh criticism / panning': '酷評 / こき下ろし',
    'Winning an award': '受賞',
    'Palme d\'Or (Cannes Film Festival)': 'パルム・ドール（カンヌ国際映画祭）',
    'Academy Awards / Oscars': 'アカデミー賞 / オスカー',
    'Busan International Film Festival (BIFF)': '釜山国際映画祭（BIFF）',
    'Masterpiece / classic work': '傑作 / 名作',
    'Independent film': '独立映画',
    'Grand Bell Awards — Korea\'s oldest film awards': '大鐘賞 — 韓国最古の映画賞',

    // Grammar box
    '📘 Grammar Pattern: Talking About Movies in Korean': '📘 文法パターン：韓国語で映画について話す',
    'To watch (a movie) |': '（映画を）観る |',
    '= "I watched Parasite" — most natural way to say you\'ve seen a film': '=「パラサイト 半地下の家族を観ました」— 映画を観たと言う最も自然な表現',
    'It seems like ~ |': '〜のようです |',
    '= "It seems like the director intentionally left an open ending"': '=「監督が意図的にオープンエンディングにしたようです」',
    'To be helpful in ~ing |': '〜するのに役立つ |',
    '= "Korean films help with studying Korean"': '=「韓国映画は韓国語の勉強に役立ちます」',
    '"You must watch it" — the most common movie recommendation phrase among Korean speakers. Add 진짜 (really) for emphasis: 진짜 꼭 보세요!': '「絶対観てください」— 韓国語話者の間で最もよくある映画推薦フレーズ。진짜（本当に）を加えて強調：진짜 꼭 보세요！',

    // Dialogue Practice
    '💬 Dialogue Practice · 대사 연습': '💬 台詞練習 · 대사 연습',
    'Read, listen, and shadow these movie-themed conversations. Each scene teaches different vocabulary and speech levels — from buying tickets at the theater to debating a film\'s meaning with a friend.':
      'これらの映画テーマの会話を読み、聞き、シャドーイングしましょう。各シーンは映画館でのチケット購入から友人と映画の意味を議論するまで、異なる語彙と話し方のレベルを教えてくれます。',
    '🎬 영화표 예매 — Buying tickets (해요체 · Polite)': '🎬 영화표 예매 — チケット購入（해요체 · 丁寧）',
    '🍿 영화 추천하기 — Recommending a movie (반말 · Casual)': '🍿 영화 추천하기 — 映画の推薦（반말 · カジュアル）',
    '🎭 영화 보고 나서 — After watching (해요체 · Polite)': '🎭 영화 보고 나서 — 鑑賞後（해요체 · 丁寧）',
    'Welcome. How can I help you?': 'ようこそ。どのようにお手伝いできますか？',
    'Two tickets for Parasite, please. The 7 PM showing.': '「パラサイト 半地下の家族」を2枚ください。午後7時の上映です。',
    'Which seats would you like?': 'どのお席がよろしいですか？',
    'Two center seats, please.': '中央の席を2つお願いします。',
    'Is there a good Korean movie worth watching lately?': '最近、観る価値のある良い韓国映画はありますか？',
    'Have you seen The Roundup? The one with Ma Dong-seok. It\'s really fun.': '「犯罪都市」を観ましたか？マ・ドンソクが出ているやつです。本当に面白いですよ。',
    'Are there many scary or violent scenes?': '怖いシーンや暴力的なシーンが多いですか？',
    'There\'s action, but you can watch it without feeling burdened. You must see it.': 'アクションはありますが、気負わず観られます。絶対に観てください。',
    'What did you think? After watching Parasite.': 'どう思いましたか？「パラサイト 半地下の家族」を観た後で。',
    'It was a much deeper film than I expected. The ending keeps lingering in my head.': '予想よりずっと深い映画でした。エンディングがずっと頭の中で響いています。',
    'The semi-basement scenes especially made a strong impression. The social message was powerful.': '特に半地下のシーンが強い印象を残しました。社会的メッセージが力強かったです。',
    'Make sure to watch Bong Joon-ho\'s other films too. Memories of Murder is a masterpiece.': 'ポン・ジュノ監督の他の作品もぜひ観てください。「殺人の追憶」は傑作です。',

    // Iconic Lines section
    '🗣️ Iconic Korean Film Lines · 영화 명대사': '🗣️ 韓国映画の名台詞 · 영화 명대사',
    'These are the lines that made Korean cinema audiences go silent, rewind, or stare at the screen long after they ended. Each teaches a grammar pattern, emotion vocabulary, or social insight that reaches far beyond the film itself.':
      'これらは韓国映画の観客を沈黙させ、巻き戻させ、または映画が終わった後も長い間スクリーンを見つめさせた台詞です。それぞれが映画自体をはるかに超えた文法パターン、感情の語彙、社会的洞察を教えてくれます。',
    // phrase-eng (English translations of Korean lines)
    'People like us shouldn\'t make plans.': '私たちのような者は計画を立ててはいけない。',
    'You don\'t remember anything. But I can never forget.': '君は何も覚えていない。でも私は絶対に忘れられない。',
    'There\'s nowhere left to go.': 'もう行くところがない。',
    'Just knowing that someone like you exists in this world is a comfort to me.': 'あなたのような人がこの世界にいるということを知るだけで、私には慰めになります。',
    'Being alive is a sin.': '生きていることが罪だ。',
    'Am I the bad guy?': '私が悪者ですか？',
    'I\'m a bad guy anyway. You know that.': 'どうせ私は悪い野郎だ。そうだろ。',
    'Hey, is that how a detective acts?': 'おい、それが刑事のすることか？',
    // phrase-context
    '해요체 · 기생충 (Parasite) · Ki-taek\'s quiet thesis — people at the bottom can\'t afford to be disappointed by plans that fall apart. The film\'s entire class argument compressed into one sentence.':
      '해요체 · パラサイト 半地下の家族 · キテクの静かな持論 — 底辺の人々は崩れ去る計画に失望する余裕がありません。映画全体の階層的議論を一文に凝縮。',
    '반말 · 올드보이 (Oldboy) · The tragic asymmetry at the film\'s core — two people in the same story carrying completely different burdens of memory.':
      '반말 · オールド・ボーイ · 映画の核心にある悲劇的な非対称性 — 同じ物語の中で全く異なる記憶の重荷を背負う二人。',
    '반말 · 부산행 (Train to Busan) · Said with tragic resignation as options run out. Works as both literal (on the train) and metaphorical (in life) — a Korean-cinema speciality for layered meaning.':
      '반말 · 新感染 ファイナル・エクスプレス · 選択肢がなくなるにつれて悲劇的な諦めを持って言われます。文字通り（電車で）かつ比喩的（人生で）の両方として機能 — 層を重ねた意味の韓国映画の特性。',
    '해요체 · 버닝 (Burning) · Jong-su\'s quiet, restrained declaration — the most understated confession in Korean cinema. Everything said without saying anything directly.':
      '해요체 · バーニング 劇場版 · ジョンスの静かで抑制された宣言 — 韓国映画で最も控えめな告白。何も直接言わずにすべてを語っています。',
    '해라체 · 곡성 (The Wailing) · Spoken during the shaman ritual. A line that captures the film\'s theological horror — when existence itself becomes guilt and innocence offers no protection.':
      '해라체 · 哭声/コクソン · シャーマンの儀式の間に語られます。存在自体が罪となり、無実が保護を提供しない映画の神学的恐怖を捉えた台詞。',
    '해요체 · 기생충 (Parasite) · Ki-taek\'s desperate question that forces the audience to examine their own judgment. A question with no clean answer — by deliberate design.':
      '해요체 · パラサイト 半地下の家族 · キテクの絶望的な問いは観客に自分自身の判断を検証させます。明確な答えのない問い — 意図的なデザインで。',
    '반말 · 아저씨 (The Man from Nowhere) · Cha Tae-sik quietly accepting how the world sees him — before proving otherwise entirely through his actions.':
      '반말 · アジョシ · チャ・テシクが世界が彼をどう見ているかを静かに受け入れています — 行動によって全く正反対を証明する前に。',
    '반말 · 살인의 추억 (Memories of Murder) · Spoken in Gyeonggi-do regional dialect. 임마 is a rough casual address — essential for regional dialect exposure. You\'ll hear similar forms across Korean action films.':
      '반말 · 殺人の追憶 · 京畿道の地方方言で語られます。임마は荒っぽいカジュアルな呼びかけ — 地方方言への露出に必須。韓国アクション映画全体で同様の形を聞くことができます。',
    // phrase-breakdown fragments (split by <b> Korean elements)
    '(people like us, subject) +': '（私たちのような人、主語）+',
    '(plan) +': '（計画）+',
    '(shouldn\'t have) — -면 안 되다 = should not / must not': '（持ってはいけない）— -면 안 되다 = してはならない',
    '(nothing at all) +': '（まったく何も）+',
    '(can\'t remember) +': '（覚えられない）+',
    '(never, absolutely) +': '（決して、絶対に）+',
    '(can\'t forget — -는데 adds emotional contrast)': '（忘れられない — -는데が感情的対比を加える）',
    '(no longer / anymore) +': '（もはや）+',
    '(a place to go) +': '（行く場所）+',
    '(doesn\'t exist) — 더 이상 + negative verb = "no longer"': '（存在しない）— 더 이상 + 否定動詞 =「もはや〜ない」',
    '(in this world) +': '（この世界に）+',
    '(just the fact that a person like you exists) +': '（あなたのような人が存在するという事実だけで）+',
    '(is a comfort)': '（慰めになります）',
    '(to be alive) +': '（生きている）+',
    '(the thing that is ~) +': '（〜であること）+',
    '(is a sin) — -는 게 turns a verb into a noun phrase': '（罪だ）— -는 게は動詞を名詞句に変換',
    '(I + subject marker) +': '（私 + 主格助詞）+',
    '(bad person / guy) +': '（悪い人 / 野郎）+',
    '(am I? — polite question) — 놈 is rough/casual; here it carries self-deprecation and social accusation': '（私は？— 丁寧な疑問）— 놈は荒っぽい・カジュアルな表現で、ここでは自虐と社会的非難を帯びる',
    '(anyway, regardless) +': '（どうせ、とにかく）+',
    '(I am a bad guy, as you know) — -잖아 appeals to shared knowledge or mild assertion': '（どうせ悪い野郎でしょ）— -잖아は共有知識や軽い主張に訴える',
    '(rough address: shortened 이 + 놈 + 아) +': '（荒っぽい呼びかけ：이+놈+아の短縮形）+',
    '(is that) +': '（それが）+',
    '(a detective? — informal) — regional Korean speech is rich with address forms like 임마': '（刑事か？— 非公式）— 韓国の地方語はimmaのような呼びかけ形に富んでいる',

    // Fan Culture section
    '🍿 Movie Fan Culture & Slang · 영화 팬 문화': '🍿 映画ファン文化とスラング · 영화 팬 문화',
    'Korean film culture has its own vocabulary built around the theatrical experience, review culture, and online fan communities. Knowing these terms lets you talk about movies the way Korean audiences actually do.':
      '韓国の映画文化は、映画館体験、批評文化、オンラインファンコミュニティを中心に構築された独自の語彙を持っています。これらの用語を知ることで、韓国の観客が実際に映画について話す方法で会話できます。',
    'Newly released film / current release': '新公開映画 / 現在公開中の作品',
    'Literally "opened work." The first week of a major 개봉 is crucial — Korean word-of-mouth moves fast and can make or break a film in days. Online communities shift rapidly around 개봉작 reactions.':
      '文字通り「公開された作品」。주요 개봉の最初の週は重要 — 韓国の口コミは早く動き、数日で映画の成否を左右します。オンラインコミュニティは개봉작への反応を中心に急速に変化します。',
    '— "What new films are out this week?"': '— 「今週の新公開映画は何ですか？」',
    'Spoiler (short for 스포일러)': 'ネタバレ（스포일러の短縮形）',
    '스포 금지 (no spoilers) or 스포 주의 (spoiler warning) are essential phrases online and in conversation. Korean film communities take spoiler etiquette seriously — especially during a film\'s opening weekend.':
      '스포 금지（ネタバレ禁止）または스포 주의（ネタバレ注意）はオンラインや会話で必須のフレーズです。韓国の映画コミュニティはネタバレのエチケットを重視します — 特に映画の公開初週末は。',
    '— "Don\'t spoil it!" — the most urgent phrase when someone hasn\'t seen a film yet.': '— 「ネタバレしないで！」— まだ映画を観ていない人への最も緊急なフレーズ。',
    'Literally "cookie footage." Korean audiences increasingly stay through credits to catch 쿠키 영상. Online communities post "쿠키 있어요?" (Is there a post-credits scene?) before major releases. Some Korean films use them for humor, sequel teasers, or character closure.':
      '文字通り「クッキー映像」。韓国の観客はますます쿠키 영상を見るためにクレジットまで残るようになっています。오라인コミュニティは主要公開前に「쿠키 있어요?」を投稿します。',
    '— "Does this movie have a post-credits scene?" — always checked before leaving the theater.': '— 「この映画にエンドクレジット後のシーンはありますか？」— 映画館を出る前に必ず確認します。',
    'Rewatching a film in theaters': '映画館で映画を再鑑賞すること',
    'Literally "watching again." Korean audiences are known for high 재관람 rates for beloved films — especially 명작. 기생충 had record 재관람 numbers. Returning to the theater (not just home streaming) is considered the fuller experience.':
      '文字通り「再び観ること」。韓国の観客は愛する映画の高い재관람率で知られています — 特に명작。「パラサイト 半地下の家族」は記録的な재관람数を達成しました。映画館に戻ること（家でのストリーミングだけでなく）がより完全な体験と考えられています。',
    '— "Would you like to watch this film again in theaters?"': '— 「この映画を映画館でもう一度観たいですか？」',
    'Post-screening Q&A with the director or cast': '上映後の監督またはキャストとのQ&A',
    'GV is a post-screening audience Q&A. Common at 부산국제영화제 (BIFF) and special screenings in Seoul. Independent films use GVs to build audience connection. Attending a GV with a well-known director is a coveted experience for Korean cinephiles.':
      'GVは上映後の観客Q&Aです。부산국제영화제（BIFF）やソウルの特別上映で一般的。独立映画はGVを使って観客との繋がりを構築します。著名な監督とのGVに参加することは韓国の映画愛好家にとって憧れの体験です。',
    '— "Is there a Q&A today? Is the director coming?"': '— 「今日はGVがありますか？監督は来ますか？」',
    'A poor / terrible piece of work (opposite of 명작)': '駄作 / ひどい作品（명작の反対）',
    'Literally "a clumsy work." The polar opposite of 명작 (masterpiece). Korean film communities can be very direct about 졸작 — negative word-of-mouth spreads fast and can dramatically cut a film\'s second-week box office.':
      '文字通り「粗雑な作品」。명작（傑作）の正反対。韓国の映画コミュニティは졸작について非常に率直であることがあります — ネガティブな口コミは素早く広がり、映画の2週目の興行収入を劇的に削減することがあります。',
    '— "I had high hopes but it was a complete disappointment."': '— 「期待していたのに完全な失望作でした。」',
    'A film that surpassed 10 million admissions in Korea': '韓国で1,000万人を突破した映画',
    'Reaching 천만 (10 million) admissions is the gold standard of Korean box office — remarkable for a country of 51 million. Only about 30 films in Korean history have done this. 기생충, 극한직업, 부산행, 괴물, and the 범죄도시 series are all 천만 영화.':
      '천만（1,000万人）に達することは韓国興行収入の黄金基準 — 5,100万人の国としては驚異的です。韓国の歴史でこれを達成した映画は約30本のみ。「パラサイト 半地下の家族」、「エクストリーム・ジョブ」、「新感染」、「グエムル」、「犯罪都市」シリーズがすべて천만 영화です。',
    '— "They say it finally passed 10 million!" — the announcement that triggers nationwide excitement.': '— 「ついに1,000万人を突破したそうです！」— 全国的な興奮を引き起こす発表。',
    'Independent film theater / art-house cinema': '独立映画館 / アートハウス系映画館',
    'Independent cinemas like 인디스페이스 (Seoul) and 부산 아트씨어터 serve as the backbone of Korean art-house film culture. They screen foreign films, domestic indie films, and retrospectives. The entry point for Korean cinephiles who want more than the multiplex.':
      'インディスペース（ソウル）や釜山アートシアターのような独立系映画館が韓国アートハウス映画文化の基盤となっています。外国映画、国内インディーズ映画、回顧展を上映します。マルチプレックス以上を求める韓国の映画愛好家の入り口です。',
    '— "Hong Sang-soo\'s new film opened at the independent cinema."': '— 「홍상수（ホン・サンス）監督の新作が独立系映画館で公開されました。」',

    // Tip box
    '영화로 한국어 공부하기 — How to Study Korean with K-Movies': '映画で韓国語を学ぶ — K-映画で韓国語を勉強する方法',
    'Films are more challenging than dramas for learners — faster speech, no episode breaks, more regional dialects. Start with': '映画は学習者にとってドラマより難しいです — 速い発話、エピソードの間の休憩なし、より多くの地方方言。以下から始めましょう：',
    'for clear, accessible dialogue. For cultural vocabulary,': '明確でアクセスしやすい台詞のために。文化的語彙のためには、',
    '\'s class terms — 반지하, 상류층 — are highly applicable to modern Korean conversation. Always try Korean subtitles (한국어 자막) rather than English — your reading speed improves faster than you expect. Shadow key lines from': 'の階層用語 — 반지하、상류층 — が現代の韓国語会話に非常に適用できます。英語ではなく常に韓国語字幕（한국어 자막）を試してみてください — 読解速度が予想より早く向上します。以下の主要台詞をシャドーイングして',
    'for authentic everyday speech patterns.': '本物の日常会話パターンを身につけましょう。',

    // ── Koreanthing / traditions page ───────────────────────────
    '🏮 Korean Culture Guide · 한국 문화': '🏮 韓国文化ガイド · 한국 문화',
    '⛩️ Palaces & Historic Sites · 궁궐과 유적지': '⛩️ 宮殿と史跡 · 궁궐과 유적지',
    '📜 Top 100 Korean Proverbs · 속담 100선': '📜 韓国ことわざ100選 · 속담 100선',
    '🎎 Traditional Arts & Crafts · 전통 예술': '🎎 伝統芸術と工芸 · 전통 예술',

    // ── Hangul additional table headers ────────────────────────
    'Compound Vowel': '合成母音',
    'Formed From': '構成要素',
    'Example Word': '例語',
    'Listen': '聞く',
    'Memory Tip': '覚え方のヒント',
    'Compound Vowels (복합 모음)': '合成母音（복합 모음）',
    'Consonant': '子音',
    'Sound': '音',
    'Name': '名前',
    'Position': '位置',
    'Basic Consonants (기본 자음)': '基本子音（기본 자음）',
    'Double Consonants (쌍자음)': '濃音（쌍자음）',
    'Batchim (받침)': 'パッチム（받침）',
    'Aspirated Consonants (격음)': '激音（격음）',

    // ── Travel transport names ──────────────────────────────────
    'Subway': '地下鉄',
    'KTX High-speed Rail': 'KTX 高速鉄道',
    'Bus': 'バス',
    'Taxi': 'タクシー',

    // ── Travel additional section descriptions ──────────────────
    '30 must-know phrases organised by situation — from touching down at Incheon to ordering 삼겹살 at a local restaurant.': '状況別の必須フレーズ30選 — 仁川到着から地元レストランで삼겹살を注文するまで。',
    'South Korea has one of the world\'s best public transport systems.': '韓国は世界最高水準の公共交通機関を持っています。',

    // ── Quiz page ───────────────────────────────────────────────
    'Korean Quiz': '韓国語クイズ',
    'Test your Korean with 10 levels of multiple-choice quizzes — Hangul, grammar, vocabulary, and more.': '10段階の多肢選択クイズで韓国語を試そう — ハングル・文法・語彙など。',

    // ── Index: hero-sub, section-desc, bento-desc, place-desc ───
    'Discover the beauty of Korea through language, culture, K-pop, travel, and cuisine — with free lessons designed for learners worldwide.': '韓国語・文化・K-ポップ・旅行・料理を通じて韓国の美しさを発見しましょう — 世界中の学習者向けの無料レッスンで。',
    'From the very first letter of Hangul to fluent conversation — all in one beautifully designed platform.': 'ハングルの最初の一文字から流暢な会話まで — 美しくデザインされたひとつのプラットフォームで。',
    'Learn the Korean alphabet in just 2 hours. 한글 (Hangul) is remarkably logical — once you know the 24 basic letters, you can read anything.': 'たった2時間で韓国語のアルファベットを習得。ハングルは驚くほど論理的 — 24の基本文字を覚えれば何でも読めます。',
    'From 김치 (kimchi) to 삼겹살 (samgyeopsal) — explore the rich vocabulary of Korean cuisine with pronunciation and cultural context.': 'kim치から삼겹살まで — 発音と文化的背景とともに韓国料理の豊かな語彙を探索しましょう。',
    'Whether you are just starting or aiming for fluency, we have a clear roadmap to take you there step by step.': '初めての方も流暢さを目指す方も、一歩一歩進めるための明確なロードマップをご用意しています。',
    'Learn the language of every destination. From bustling Seoul to the serene shores of Jeju — your AI travel guide is ready.': 'すべての目的地の言葉を学びましょう。賑やかなソウルから静かな済州の海岸まで — AIトラベルガイドが準備万端です。',
    'South Korea\'s dazzling capital — from the ancient palaces of Gyeongbokgung to the neon streets of Gangnam and Hongdae.': '韓国のきらびやかな首都 — 景福宮の古宮から江南とホンデのネオン街まで。',
    'Korea\'s vibrant port city with stunning beaches, fresh seafood markets, and a unique dialect worth discovering.': '絶景のビーチ・新鮮な海鮮市場・独自の方言が魅力の韓国の活気ある港町。',
    'Korea\'s paradise island — volcanic landscapes, pristine beaches, tangerine groves, and the famous haenyeo diving culture.': '韓国の楽園の島 — 火山地形・美しいビーチ・ミカン園・有名な海女ダイビング文化。',

    // ── Index: emoji-prefixed button / link texts ────────────────
    '📚 Learn Hangul Now →': '📚 今すぐハングルを学ぶ →',
    '🔊 Hear It': '🔊 音を聞く',
    '📚 More Words': '📚 もっと見る',
    '🎵 Explore All K-Culture Content →': '🎵 K-カルチャーをすべて見る →',
    '🗺️ View Full Travel Guide →': '🗺️ 旅行ガイドを全て見る →',
    '시작하기 — Start Learning': '시작하기 — 学習を始める',
    '🎓 Beginner': '🎓 初級',
    '🔥 Intermediate': '🔥 中級',
    '🌱 Beginner': '🌱 初級',
    '💜 Culture': '💜 カルチャー',
    '🎵 K-Pop': '🎵 K-ポップ',
    '🎬 K-Drama': '🎬 K-ドラマ',

    // ── Hangul lesson: intro + section body paragraphs ───────────
    'Hangul (한글) is the official writing system of South Korea, created in 1443 by King Sejong the Great (세종대왕). Unlike Chinese characters, Hangul is a phonetic alphabet — each symbol represents a sound. This lesson covers the complete alphabet: all 10 basic vowels, 11 compound vowels, 14 consonants, tensed and aspirated variants, vowel harmony, and how syllables are built. Most learners can read and write basic Hangul within a few hours!': 'ハングル（한글）は1443年に世宗大王（세종대왕）が作った韓国の公式文字体系です。漢字と異なり、ハングルは表音文字 — 各記号が音を表します。このレッスンでは全アルファベット（基本母音10個・合成母音11個・子音14個・濃音・激音・母音調和・音節構造）を学びます。ほとんどの学習者は数時間でハングルの読み書きができるようになります！',
    'Hangul was scientifically designed — an extraordinary achievement for its time. King Sejong assembled a team of scholars called the Hall of Worthies (집현전) to create a writing system that ordinary people could learn quickly, unlike the complex Chinese characters used by scholars of the era.': 'ハングルは科学的に設計されました — その時代における驚異的な偉業です。世宗大王は集賢殿（집현전）と呼ばれる学者チームを集め、当時の学者が使っていた複雑な漢字とは異なり、一般の人々がすぐに覚えられる文字体系を作りました。',
    'What makes Hangul remarkable is that the shapes of the consonants mimic the physical position of the mouth and tongue when producing each sound. This logical design means the alphabet is internally consistent and highly learnable.': 'ハングルが特に優れている点は、子音の形がその音を出すときの口と舌の位置を模していることです。この論理的な設計により、アルファベットは内部的に一貫していて非常に覚えやすくなっています。',
    'The complete Hangul system contains:': 'ハングルの完全なシステムには以下が含まれます：',
    'Hangul Day (한글날) is celebrated on October 9th in South Korea as a national holiday! It commemorates the promulgation of Hangul in 1446 and the genius of King Sejong the Great.': 'ハングルの日（한글날）は韓国の祝日として10月9日に祝われます！1446年のハングル公布と世宗大王の卓越した知恵を記念する日です。',

    // ── Grammar lesson: section body paragraphs ──────────────────
    'Particles are suffixes attached to nouns that indicate grammatical function. They are the backbone of Korean sentence structure — once you master particles, grammar becomes much clearer!': '助詞は名詞に付く接尾辞で、文法的な機能を示します。韓国語の文構造の根幹であり — 助詞をマスターすれば文法がはっきりわかります！',

    // ── Travel page: section descriptions ───────────────────────
    'South Korea\'s vibrant capital — palaces, street food, K-Pop, and cutting-edge tech all in one extraordinary city.': '韓国の活気ある首都 — 宮殿・屋台料理・K-ポップ・最先端テクノロジーが集まる特別な都市。',
    'Korea\'s second city — coastal beauty, seafood markets, and colourful hillside villages between mountains and sea.': '韓国第2の都市 — 海と山の間に広がる美しい海岸・海鮮市場・カラフルな山の村。',

    // ── Vocabulary lesson: intro description ─────────────────────
    'Building vocabulary is key to Korean fluency. Click any word card to hear its pronunciation. Start with the most common words and work your way up — learning just': '語彙を増やすことが韓国語上達の鍵です。単語カードをクリックして発音を聞いてみましょう。最も基本的な単語から始めて上のレベルへ — たった',
    'will cover about 75% of everyday Korean conversation!': 'で日常の韓国語会話の約75%をカバーできます！',

    // ── NEW: Hangul lesson body paragraphs ──────────────────────
    'Every Korean syllable contains exactly one vowel. The 10 basic vowels are the foundation of the entire system. Each one attaches to the silent consonant ㅇ when written alone, producing a pure vowel sound.': 'すべての韓国語の音節には必ず1つの母音が含まれます。10の基本母音はシステム全体の土台です。単独で書く場合は無音の子音ㅇに付けて、純粋な母音音を出します。',
    'King Sejong designed the vowel shapes to reflect the physical position of the mouth. Three base shapes — ㆍ (heaven / dot), ㅡ (earth / flat line), and ㅣ (human / upright line) — combine to form all vowels.': '世宗大王は口の物理的な位置を反映した母音の形を設計しました。3つの基本形 — ㆍ（天・点）、ㅡ（地・横線）、ㅣ（人・縦線）— を組み合わせてすべての母音を形成します。',
    'Compound vowels are formed by combining two basic vowels. They are written as a single character and produce a blended sound. There are 11 compound vowels, making Korean\'s total vowel count 21. Memorising which two vowels form each compound helps you read unfamiliar words.': '合成母音は基本母音を2つ組み合わせて作られます。1つの文字として書かれ、混合した音を出します。合成母音は11個あり、韓国語の母音の総数は21個になります。どの2つの母音が各合成母音を形成するかを覚えると、未知の単語を読む助けになります。',
    'Korean has 14 basic consonants. Each consonant was designed to represent the shape of the mouth or throat when producing that sound — a remarkable feat of linguistic engineering. Each consonant name follows a pattern: it starts with the consonant sound and ends with the consonant sound (e.g., ㄱ is named 기역 — it starts and ends with the "k" sound).': '韓国語には14の基本子音があります。各子音はその音を出すときの口または喉の形を表すように設計されました — 言語工学の驚くべき偉業です。各子音名はパターンに従います：子音音で始まり子音音で終わります（例：ㄱは기역と呼ばれ、「k」の音で始まり終わります）。',
    'One of the most elegant features of Hangul is how syllables are formed. Rather than writing letters in a line (like English), Korean letters are grouped into syllable blocks. Each block represents one spoken syllable.': 'ハングルの最も優れた特徴の一つは音節の形成方法です。ひらがなのように文字を一列に書くのではなく、韓国語の文字は音節ブロックにグループ化されます。各ブロックは発話された1つの音節を表します。',
    'Every syllable must contain at least one consonant and one vowel. An optional final consonant — called 받침 (batchim) — can be added at the bottom of the block.': 'すべての音節には少なくとも1つの子音と1つの母音が必要です。オプションの最終子音 — 받침（パッチム）と呼ばれる — をブロックの下に追加できます。',
    'Five Korean consonants have a "tensed" version formed by doubling the basic consonant. They are pronounced with tightened throat muscles and no puff of air (unaspirated). Native speakers describe the feeling as holding your breath slightly before releasing the sound.': '韓国語の子音5つには、基本子音を二重にした「濃音」があります。喉の筋肉を締め、息を出さずに（無気音で）発音します。ネイティブスピーカーは、音を出す前に少し息を止めるような感覚と表現します。',
    'Korean syllables can also end with a compound batchim (겹받침) — two consonants stacked together in the final position. There are 11 compound batchim. When speaking, only one consonant is pronounced at a time, depending on what follows.': '韓国語の音節は複合パッチム（겹받침）— 最終位置に2つの子音が重なったもの — で終わることもあります。複合パッチムは11種類あります。発話時は、後に続く音によって一度に1つの子音のみが発音されます。',
    'Four Korean consonants have an "aspirated" version — produced with a strong burst of air. In English, you naturally aspirate consonants at the start of stressed syllables: the "p" in pot is aspirated, while the "p" in spot is not. Korean makes this distinction phonemic, meaning it changes the meaning of words entirely.': '韓国語の子音4つには「激音」があります — 強い息の爆発で発音されます。日本語には韓国語のような帯気音と非帯気音の区別がないため、日本語話者にはこれが全く新しい概念です。韓国語では「激音（激しい息を伴う子音）」が意味を変える重要な役割を果たします。',

    // ── NEW: Grammar lesson body paragraphs ─────────────────────
    'Korean grammar is logical and consistent once you learn the core rules. The biggest shift from English is the word order: Korean is SOV (Subject–Object–Verb), meaning the verb always comes at the end. Particles (조사) attach to nouns to show their grammatical role — no need to memorize rigid word positions!': '韓国語の文法は核心ルールを覚えれば論理的で一貫しています。日本語と同様に、韓国語はSOV（主語-目的語-動詞）の語順で、動詞は常に文末に来ます。助詞（조사）が名詞に付いて文法的な役割を示します — 語順は日本語と似ているので覚えやすいでしょう！',
    'Unlike English (Subject-Verb-Object), Korean follows Subject → Object → Verb order. The verb (동사) always comes at the END of the sentence.': '日本語と同様に、韓国語は主語→目的語→動詞の語順に従います。動詞（동사）は常に文末に来ます。',
    'Korean verbs always end in 다 (da) in their dictionary form. To use them in sentences, replace 다 and add the appropriate ending based on formality level and tense.': '韓国語の動詞は辞書形では常に다（da）で終わります。文中で使うには、다を取り除き、丁寧さのレベルと時制に応じた適切な語尾を付けます。',
    'The most common form is the polite present tense. Add -아요 after stems with ㅏ or ㅗ vowels, and -어요 for all other vowels.': '最も一般的な形は丁寧な現在形です。ㅏまたはㅗ母音の語幹には-아요を、その他の母音には-어요を付けます。',
    'Add -았어요 (after ㅏ/ㅗ stems) or -었어요 (all others) to form past tense.': '-았어요（ㅏ/ㅗ語幹の後）または-었어요（その他）を付けて過去形を作ります。',
    'There are two ways to negate in Korean:': '韓国語には2つの否定の方法があります：',
    'In Korean, questions are formed simply by changing the intonation (rising) or adding a question mark. The word order does NOT change unlike English!': '韓国語では、イントネーションを上げるか疑問符を付けるだけで疑問文が作れます。日本語と同様に、語順は変わりません！',
    'Connectors (접속사) are conjunctions placed at the beginning of a new clause or sentence to link ideas together. These four are the most essential for flowing Korean speech.': '接続詞（접속사）は新しい節や文の冒頭に置いて考えをつなぐ接続語です。この4つが流暢な韓国語会話に最も重要です。',
    'While 그리고 connects sentences, Korean uses specific particles to say "and/with" between nouns. The two most common casual particles are -하고 and -(이)랑.': 'グリゴが文をつなぐ一方、名詞間の「と/と一緒に」には特定の助詞を使います。最も一般的なカジュアルな助詞は-하고と-(이)랑です。',
    'When saying you gave something to a person or received something from a person, Korean uses specific particles. These are different from the location particles 에 and 에서.': '人に何かをあげたり、人から何かもらったりするとき、韓国語は特定の助詞を使います。これらは場所の助詞에と에서とは異なります。',
    'Korean uses a mix of two number systems for time: Sino-Korean numbers for minutes (분) and Native Korean numbers for hours (시). Mastering this distinction is essential!': '韓国語は時間に二つの数字体系を混用します：分（분）には漢数字、時（시）には固有韓国語数字を使います。この区別をマスターすることが不可欠です！',
    'Korean uses specific counting words (counters or classifiers) depending on what is being counted. The counter follows the number, and Native Korean numbers are used with most counters.': '韓国語は数えるものによって特定の助数詞（カウンターまたは分類詞）を使います。助数詞は数字の後に続き、ほとんどの助数詞には固有韓国語数字が使われます。',
    'To say someone is currently doing something, attach -고 있어요 to the verb stem. This is equivalent to the English "-ing" continuous form.': '誰かが現在何かをしていることを言うには、動詞の語幹に-고 있어요を付けます。これは日本語の「〜ている」形に相当します。',
    'Knowing how to introduce yourself is one of the most practical Korean skills. Here is the vocabulary you need and a complete template to follow.': '自己紹介ができることは最も実用的な韓国語スキルの一つです。必要な語彙と従うべき完全なテンプレートをご紹介します。',
    'Korean dates use Sino-Korean numbers throughout — for years (년), months (월), and days (일). The order is: Year → Month → Day.': '韓国語の日付は年（년）・月（월）・日（일）すべてに漢数字を使います。順序は：年→月→日です。',
    'Degree adverbs modify adjectives and verbs to express how much. They are placed directly before the word they modify.': '程度副詞は形容詞や動詞を修飾してどれくらいかを表します。修飾する語の直前に置かれます。',
    'Adding -는 것 to a verb stem turns the verb into a noun phrase — the act of doing something. This is called nominalization and is extremely common in Korean.': '動詞の語幹に-는 것を付けると動詞が名詞句 — 何かをする行為 — になります。これは名詞化と呼ばれ、韓国語では非常によく使われます。',
    'To compare two things in Korean, use the structure: [A]가/이 [B]보다 더 [adjective] — meaning "A is more [adjective] than B."': '韓国語で2つのものを比べるには「[A]가/이 [B]보다 더 [形容詞]」という構文を使います — 「AはBより〜だ」という意味です。',
    'Two words that learners often confuse: 좋다 (to be good / feel good) is an adjective, while 좋아하다 (to like) is a verb. They take different particles!': '学習者がよく混同する2つの単語：좋다（良い/気分が良い）は形容詞で、좋아하다（好き）は動詞です。それぞれ異なる助詞を取ります！',
    'These two time adverbs are essential for expressing whether something has happened yet or is still ongoing.': 'これら2つの時間副詞は、何かがまだ起きていないか、まだ続いているかを表現するのに不可欠です。',
    'Korean has specific words for indefinite references (someone, something, somewhere) and their negative counterparts used with negative verbs.': '韓国語には不定の参照（誰か・何か・どこか）と、否定動詞と共に使う否定の対応語があります。',
    'To make a polite request or command ("Please do..."), attach -(으)세요 to the verb stem. This is the standard polite imperative used with adults and in public situations.': '丁寧な依頼や命令（「〜してください」）を作るには、動詞の語幹に-(으)세요を付けます。これは大人や公共の場で使う標準的な丁寧な命令形です。',
    'To tell someone politely not to do something, use [verb stem] + 지 마세요. This pattern works with any verb.': '何かをしないように丁寧に言うには、[動詞語幹]+지 마세요を使います。このパターンはすべての動詞に使えます。',
    'The particle -(으)로 is versatile: it marks direction toward somewhere, the means or method of doing something, and the material something is made of.': '助詞-(으)로は多用途です：どこかへの方向、何かをする手段または方法、そして何かが作られる材料を示します。',

    // ── NEW: Vocabulary lesson body paragraphs ───────────────────
    'Sino-Korean numbers are built by placing a digit multiplier before each unit, reading from largest to smallest. No filler words needed.': '漢数字は各単位の前に数字の乗数を置いて作られ、大きい方から読みます。補助語は不要です。',
    'Korean verbs always end in 다 in dictionary form. They conjugate based on formality and tense.': '韓国語の動詞は辞書形では常に다で終わります。丁寧さと時制に応じて活用します。',
    'Korean adjectives conjugate just like verbs. The forms shown below are in dictionary form (다 form). In speech, use the polite 해요 ending.': '韓国語の形容詞は動詞と同様に活用します。以下は辞書形（다形）です。会話では丁寧な해요形を使います。',
    'Korean proverbs (속담) reflect centuries of wisdom. Understanding them gives deep insight into Korean culture and values.': '韓国のことわざ（속담）は何世紀にもわたる知恵を反映しています。理解することで韓国の文化や価値観への深い洞察が得られます。',
    'Your AI-powered gateway to the Korean language and culture. Learn at your own pace with our multi-agent teaching team.': '韓国語と文化へのAI搭載ゲートウェイ。マルチエージェント教育チームとともに自分のペースで学びましょう。',

    // ── Syllable Blocks page — common reusable terms ────────────────
    'Korean Language': '韓国語',
    'Basic Vocab': '基本語彙',
    'Course Progress': 'コース進捗',
    'Search lessons...': 'レッスンを検索...',
    'Tip': 'ポイント',
    'Result': '結果',
    'Result:': '結果：',
    'Korean Name': '韓国語名',
    'Role': '役割',
    'Block': 'ブロック',
    'Components': '構成要素',
    'Pattern': 'パターン',
    'Initial': '初声',
    'Medial': '中声',
    'Final': '終声',
    'Syllable': '音節',
    'Example block': 'ブロック例',
    'Previous': '前へ',
    'Next': '次へ',
    'Vowels & Consonants': '母音と子音',
    'Mark Lesson Complete ✓': 'レッスン完了にする ✓',
    'Korean': '韓国語',
    'Korea': '韓国',
    'Korean (language)': '韓国語（言語）',
    'V only': '母音のみ',
    'ㅇ (silent)': 'ㅇ（無音）',
    '— (none)': '—（なし）',
    '초성 (Initial)': '초성（初声）',
    '중성 (Medial)': '중성（中声）',
    '종성 (Final)': '종성（終声）',

    // Fragment keys — produced when <strong> splits a paragraph into text nodes
    'left': '左',
    'right': '右',
    'on top': '上',
    'below': '下',
    'above': '上',
    'must': '必ず',
    'Optional': '任意の',
    'bottom': '底',
    'Tall vowels': '縦型母音',
    'Wide vowels': '横型母音',
    'tall vowel': '縦型母音',
    'wide vowel': '横型母音',
    'silent ㅇ': '無音の ㅇ',
    'exactly one vowel': '母音がちょうど1つあります',
    '받침 (batchim)': '받침（バッチム）',
    'Every block has': 'すべてのブロックには',
    'Vowel-initial syllables use': '母音始まりの音節は',
    'as a placeholder initial consonant': 'を初声のプレースホルダーとして使います',
    '(ㅏ, ㅓ, ㅣ) — initial consonant sits to the': '（ㅏ・ㅓ・ㅣ）— 初声子音は',
    ', vowel to the right': '、母音は右に来ます',
    '(ㅗ, ㅜ, ㅡ) — initial consonant sits': '（ㅗ・ㅜ・ㅡ）— 初声子音は',
    ', vowel below': '、母音は下に来ます',
    'sits at the': 'は',
    'of the block, below everything else': '底に位置します（他すべての下）',
    'For vertical vowels like ㅏ, ㅓ, and ㅣ: the initial consonant sits to the': 'ㅏ・ㅓ・ㅣのような縦型母音では、初声子音は',
    ', the vowel to the': 'に、母音は',
    '. For horizontal vowels like ㅗ, ㅜ, and ㅡ: the initial consonant sits': 'に来ます。ㅗ・ㅜ・ㅡのような横型母音では、初声子音は',
    ', the vowel': 'に、母音は',
    'When a syllable starts with a vowel sound, you': '音節が母音の音で始まるとき、',
    'write ㅇ as a placeholder in the initial position. ㅇ is completely silent at the start of a syllable — it simply signals that the block begins with a vowel. Examples:': '初声の位置にプレースホルダーとして ㅇ を書きます。ㅇ は音節の最初では完全に無音です — 単にそのブロックが母音で始まることを示しているだけです。例：',
    'When you see a': '縦型・横型母音を見たとき、',
    '(ㅏ, ㅓ, ㅣ and their variants), the initial consonant sits to its': '（ㅏ・ㅓ・ㅣとその変形）では、初声子音は',
    '. When you see a': '。次に、',
    '(ㅗ, ㅜ, ㅡ and their variants), the initial consonant sits': '（ㅗ・ㅜ・ㅡとその変形）では、初声子音は',
    'it. Compound vowels like ㅘ, ㅝ, ㅚ behave like vertical vowels — consonant goes left.': 'に来ます。ㅘ・ㅝ・ㅚのような合成母音は縦型母音のように振る舞います — 子音は左に来ます。',
    'When you add a consonant at the bottom of a block, that consonant becomes the': 'ブロックの下に子音を追加すると、その子音は',
    '— the final consonant. Batchim is what gives many Korean words their rich, resonant endings. Watch how adding batchim transforms simple syllables into real words.': '— 終声子音になります。バッチムは多くの韓国語の単語に豊かで響き渡る語尾をもたらします。バッチムを追加することで、単純な音節がどのように実際の単語に変わるかを見てみましょう。',
    'Vertical vowels — initial consonant goes': '縦型母音 — 初声子音は',
    'LEFT': '左',
    ', vowel goes RIGHT': '、母音は右',
    'Horizontal vowels — initial consonant goes': '横型母音 — 初声子音は',
    'ON TOP': '上',
    ', vowel goes BELOW': '、母音は下',

    // eng-line meanings — Section 7 example boxes
    'person': '人',
    'school': '学校',
    'hello / peace': 'こんにちは / 平和',
    'gratitude / thank you': '感謝 / ありがとう',
    'love': '愛',
    'music': '音楽',
    'friend': '友達',
    'family': '家族',
    'sea / ocean': '海',

    // Batchim word table meanings — Section 6
    'mountain': '山',
    'moon / month': '月',
    'rice / meal': 'ご飯 / 食事',
    'hand': '手',
    'door': 'ドア',
    'road / way': '道 / 道のり',
    'water': '水',
    'star': '星',
    'spring (season)': '春（季節）',
    'forest': '森',
    'dream': '夢',
    'strength / power': '力',

    // ── Syllable Blocks page — lesson header ────────────────────────
    '🔷 Beginner · Lesson 2': '🔷 初級 · レッスン 2',
    'Korean Syllable Blocks:': '韓国語の音節ブロック：',
    '⏱ 30 min read': '⏱ 30分読了',
    '🔖 Writing System': '🔖 書記体系',
    'In Korean, every syllable is written as a compact square block — not in a horizontal line like English. Understanding how these blocks are assembled is the key to reading and writing Korean fluently. Once you master syllable block structure, you can sound out any Korean word!': '韓国語では、すべての音節は日本語のかなのように横一列ではなく、コンパクトな正方形のブロックとして書かれます。これらのブロックの組み立て方を理解することが、韓国語を流暢に読み書きする鍵です。音節ブロックの構造をマスターすれば、どんな韓国語の単語も発音できます！',

    // ── Section 1: What Is a Syllable Block? ────────────────────────
    'What Is a Syllable Block?': '音節ブロックとは？',
    'Every Korean syllable is written inside an invisible square block. Unlike English where letters go left to right in a row, Korean stacks consonants and vowels together into compact, visually balanced blocks. Each block represents exactly one syllable — one unit of sound.': '韓国語のすべての音節は見えない正方形のブロックの中に書かれます。日本語のかなのように文字が一列に並ぶのとは異なり、韓国語は子音と母音をコンパクトで視覚的にバランスの取れたブロックに積み重ねます。各ブロックはちょうど1つの音節 — 1つの音の単位 — を表します。',
    '🔷 How Syllable Blocks Are Built': '🔷 音節ブロックの構成方法',
    'Here are 10 common single syllables broken into their components:': 'よく使われる1音節を10個、構成要素に分けて紹介します：',
    'Each syllable block always has exactly one vowel. It may have 0, 1, or 2 consonants — but never more than one vowel.': '各音節ブロックには常に母音がちょうど1つあります。子音は0・1・2個あっても構いませんが、母音は必ず1つだけです。',

    // ── Section 2: The Three Positions ──────────────────────────────
    'The Three Positions': '3つの位置',
    'Every Korean syllable block has three named positions. Two are required (initial consonant and medial vowel) and one is optional (the final consonant). Learning these positions by name is essential — Korean grammar references them constantly.': 'すべての韓国語の音節ブロックには3つの名前のある位置があります。2つは必須（初声子音と中声母音）で、1つは任意（終声子音）です。これらの位置を名前で覚えることが大切です — 韓国語文法では常にこれらを参照します。',
    'First consonant — required': '最初の子音 — 必須',
    'ㅎ in 한': '한 の ㅎ',
    'Vowel — always exactly one': '母音 — 常にちょうど1つ',
    'ㅏ in 한': '한 の ㅏ',
    'Last consonant — optional': '最後の子音 — 任意',
    'ㄴ in 한': '한 の ㄴ',
    '🔷 Visual Block Structure': '🔷 ブロック構造の視覚化',
    'With a vertical vowel (e.g., ㅏ)': '縦型母音の場合（例：ㅏ）',
    'With a horizontal vowel (e.g., ㅜ)': '横型母音の場合（例：ㅜ）',

    // ── Section 3: Four Syllable Block Patterns ──────────────────────
    'Four Syllable Block Patterns': '4種類の音節ブロックのパターン',
    'Korean syllables follow four basic structural patterns depending on whether a final consonant (받침) is present and whether the syllable begins with a vowel or consonant.': '韓国語の音節は、終声（받침）の有無と、音節が母音・子音のどちらで始まるかによって、4つの基本的な構造パターンに従います。',
    'go / to go': '行く / 行くこと',
    'ㅇ (silent) + Vowel': 'ㅇ（無音）+ 母音',
    'ah / younger sibling': 'ああ / 弟・妹',
    'Consonant + Vowel + Final': '子音 + 母音 + 終声',
    'went / liver': '行った / 肝臓',
    'ㅇ (silent) + Vowel + Final': 'ㅇ（無音）+ 母音 + 終声',
    'inside / no': '中 / いいえ',
    'The ㅇ Placeholder Rule': 'ㅇプレースホルダーの規則',

    // ── Section 4: Vertical vs Horizontal Vowels ─────────────────────
    'Vertical vs Horizontal Vowels': '縦型母音 vs 横型母音',
    'The shape of the vowel determines where the initial consonant goes inside the block. Tall, vertical vowels push the consonant to the left; wide, horizontal vowels push it to the top. This is what gives Korean its distinctive square appearance.': '母音の形によって、初声子音がブロック内のどこに来るかが決まります。縦に長い縦型母音は子音を左に押し出し、横に広い横型母音は上に押し出します。これが韓国語の特徴的な正方形の外観を生み出しています。',
    'Quick Visual Trick': '視覚的なコツ',

    // ── Section 5: Building Your First Syllables ─────────────────────
    'Building Your First Syllables': '最初の音節を作ろう',
    'Now let\'s practice building simple CV syllables — consonant + vowel, no batchim. These are the easiest blocks to read and write. Listen to each one and try to produce the sound yourself.': '簡単なCV音節（子音＋母音、バッチムなし）を作る練習をしましょう。これらは読み書きが最も簡単なブロックです。それぞれを聴いて、自分で音を出してみましょう。',
    'With vowel ㅏ (a)': '母音ㅏ（a）を使って',
    'With vowel ㅗ (o)': '母音ㅗ（o）を使って',

    // ── Section 6: Adding Batchim ────────────────────────────────────
    'Adding Batchim — The Final Consonant': 'バッチムを追加 — 終声子音',
    '🔷 Batchim Progressions': '🔷 バッチムの変化',
    'Add ㄱ at the bottom of 가': '가 の下に ㄱ を追加',
    'Add ㄴ at the bottom of 나': '나 の下に ㄴ を追加',
    'Add ㄴ at the bottom of 사 — mountain!': '사 の下に ㄴ を追加 — 山！',
    'Add ㅁ at the bottom of 보 — spring!': '보 の下に ㅁ を追加 — 春！',
    'Here are 12 everyday Korean words built with batchim:': 'バッチムを使った日常韓国語の単語12個を紹介します：',
    'Syllable blocks with batchim are slightly compressed vertically to make room at the bottom. The batchim consonant sits below both the initial consonant and the vowel, completing the square shape of the block.': 'バッチムのある音節ブロックは、下にスペースを確保するために縦方向に少し圧縮されます。バッチム子音は初声子音と母音の両方の下に位置し、ブロックの正方形の形を完成させます。',

    // ── Section 7: Reading Real Korean Words ─────────────────────────
    'Reading Real Korean Words': '実際の韓国語の単語を読もう',
    'You now have everything you need to decode real Korean words. Let\'s break down 10 essential words syllable by syllable, identifying each component. Tap the speaker buttons to hear the words spoken aloud.': '実際の韓国語の単語を解読するために必要なものがすべて揃いました。10の基本単語を音節ごとに分解し、各構成要素を確認しましょう。スピーカーボタンをタップして単語を声に出して聞いてみましょう。',
    '🇰🇷 한국 — Korea': '🇰🇷 한국 — 韓国',
    '👤 사람 — Person': '👤 사람 — 人',
    '🏫 학교 — School': '🏫 학교 — 学校',
    '👋 안녕 — Hello / Peace': '👋 안녕 — こんにちは / 平和',
    '🙏 감사 — Gratitude / Thank you': '🙏 감사 — 感謝 / ありがとう',
    '❤️ 사랑 — Love': '❤️ 사랑 — 愛',
    '🎵 음악 — Music': '🎵 음악 — 音楽',
    '🤝 친구 — Friend': '🤝 친구 — 友達',
    '👨‍👩‍👧 가족 — Family': '👨‍👩‍👧 가족 — 家族',
    '🌊 바다 — Sea / Ocean': '🌊 바다 — 海',

    // ── Section 8: Practice & Summary ────────────────────────────────
    'Practice & Summary': '練習 & まとめ',
    'Congratulations — you have learned the core structure of Korean syllable blocks! Here is a quick summary of the five rules that govern every syllable in the Korean writing system.': 'おめでとうございます — 韓国語の音節ブロックの基本構造を学びました！韓国語の書記体系のすべての音節を支配する5つのルールの簡単なまとめです。',
    '5 Rules for Korean Syllable Blocks': '韓国語音節ブロックの5つのルール',
    '📝 Self-Test: Identify the Components': '📝 自己テスト：構成要素を識別しよう',
    'For each syllable below, identify the initial (초성), medial (중성), and final (종성) components. Try it yourself before reading the answers!': '以下の各音節について、초성（初声）・중성（中声）・종성（終声）の構成要素を識別してください。答えを見る前に自分で試してみましょう！',

    // ── Footer (short brand description used on learn/ pages) ────────
    'A free Korean language learning platform for learners of every level, worldwide.': '世界中のあらゆるレベルの学習者向け、無料の韓国語学習プラットフォーム。',
    '© 2026 한국어 학교. Made with ❤️ for Korean learners worldwide.': '© 2026 한국어 학교. 世界中の韓国語学習者のために ❤️',

    // ── Pronunciation page ────────────────────────────────────────────
    // Lesson header
    '🔊 Beginner · Lesson 3': '🔊 初級 · レッスン 3',
    'Pronunciation Guide:': '発音ガイド：',
    '⏱ 50 min read': '⏱ 50分読了',
    '🔖 Pronunciation': '🔖 発音',
    '👁 14,837 views': '👁 14,837 回閲覧',

    // Lesson intro — <strong> splits paragraph into text nodes
    'Korean is highly phonetic — once you know the rules, you can read and pronounce any word correctly. However, Korean has several': '韓国語は非常に表音的です — ルールさえ覚えれば、どんな単語でも正しく読んで発音できます。しかし、韓国語には複数の',
    'sound change rules': '音変化ルール',
    'that apply when syllables combine. Spelling and pronunciation often differ, and this lesson covers the eight most important rules every learner needs to know.': 'があり、音節が組み合わさるときに適用されます。綴りと発音が異なることが多く、このレッスンでは学習者が知っておくべき8つの最重要ルールを解説します。',

    // Section 1: Batchim
    'Batchim — Syllable-Final Consonants (받침)': 'パッチム — 音節末子音（받침）',
    '(받침, literally "support") is a consonant placed at the bottom of a Korean syllable block. For example, in the syllable': '（받침、文字通り「支え」）は韓国語の音節ブロックの下部に置かれる子音です。例えば、音節',
    ', the ㅇ at the bottom is the batchim. Not all syllables have a batchim — many end with just the vowel.': 'の下にあるㅇがパッチムです。すべての音節にパッチムがあるわけではなく、母音だけで終わるものも多くあります。',
    'Although many consonants can appear as batchim in spelling, they all reduce to': '綴りではさまざまな子音がパッチムとして現れますが、発音するとすべて',
    '7 possible sounds': '7つの音',
    'when pronounced. This is called the "7 rules of batchim" (받침 7종성).': 'のいずれかに収束します。これを「パッチム7種声」（받침 7종성）と呼びます。',

    // Batchim table headers
    'Sound Group': '音グループ',
    'Written As': '表記',
    'Pronounced As': '発音形',

    // Batchim tip
    'Unreleased stops': '無開放閉鎖音',
    'The k, t, and p batchim sounds are "unreleased" — your mouth forms the position but does not release the air. Think of the final "p" in the English word "cup" when you hold it in:': 'k・t・pのパッチム音は「無開放」です — 口は形を作りますが、空気を解放しません。日本語の促音（っ）のように、口の形を作り空気を解放しない感じです：',
    '. Korean batchim ㅂ/ㄷ/ㄱ work the same way — position formed, no air puff out.': '。韓国語のパッチムㅂ・ㄷ・ㄱも同じです — 形は作るが、空気は出しません。',

    // Section 2: Liaison
    'Liaison — Linking Sound (연음화)': '連音化 — リンキング音（연음화）',
    'When a syllable ending in a batchim is': 'パッチムで終わる音節の直後に',
    'immediately followed': 'すぐ続いて',
    'by a syllable that': '来る音節が',
    'begins with the silent ㅇ': '無音のㅇで始まる場合',
    ', the batchim consonant moves forward and becomes the initial consonant of the next syllable. The spelling stays the same; only the pronunciation shifts.': '、パッチム子音が前に移動して次の音節の初声子音になります。綴りは変わらず、発音だけが変わります。',
    'This rule makes spoken Korean sound flowing and connected. It is one of the most frequent pronunciation phenomena you will hear.': 'このルールにより、話し言葉の韓国語は流れるようにつながって聞こえます。これは最も頻繁に耳にする発音現象の一つです。',

    // Liaison example box header
    '🔗 Liaison in Action (연음화 예시)': '🔗 連音化の実例（연음화 예시）',

    // Liaison eng-lines
    'I eat / am eating — ㄱ batchim moves to next syllable': '食べる / 食べています — ㄱパッチムが次の音節に移動',
    'I eat rice — ㅂ batchim of 밥 moves into 을': 'ご飯を食べる — 밥のㅂパッチムが을に移動',
    'It is good / I like it — ㅎ batchim weakens and moves (see ㅎ section)': '良い / 好き — ㅎパッチムが弱まり移動します（ㅎセクション参照）',
    'Korean language — ㄱ batchim of 국 moves into 어': '韓国語 — 국のㄱパッチムが어に移動',

    // Liaison info box
    'Why does liaison happen?': 'なぜ連音化が起きるのか？',
    'Korean syllable structure strongly prefers the pattern': '韓国語の音節構造はこのパターンを強く好みます：',
    'consonant + vowel': '子音 + 母音',
    '. When a vowel-initial syllable follows a batchim, it is phonetically "easier" for the consonant to attach to that vowel\'s slot. The result is a more natural, connected flow of speech. This is not slang or lazy pronunciation — it is standard Korean.': '。母音で始まる音節がパッチムの後に来ると、その子音がその母音のスロットに付く方が音声的に「簡単」です。結果として、より自然でつながりのある話し方になります。これはスラングや怠惰な発音ではなく、標準的な韓国語です。',

    // Section 3: Nasal Assimilation
    'Nasal Assimilation (비음화)': '鼻音化（비음화）',
    'When a stop consonant batchim (ㄱ, ㄷ, ㅂ group) is followed by the nasal consonants': '閉鎖音パッチム（ㄱ・ㄷ・ㅂグループ）の後に鼻音子音',
    ', it assimilates and changes to its corresponding nasal sound. This is purely articulatory — nasal consonants require the velum to lower, which pulls nearby stops into nasal territory.': 'が続くとき、同化して対応する鼻音に変わります。これは純粋に調音上の現象です — 鼻音子音は軟口蓋を下げる必要があり、それが隣接する閉鎖音を鼻音領域に引き込みます。',

    // Nasal table headers
    'Written Form': '表記形',
    'Romanized Pronunciation': 'ローマ字発音',

    // Nasal tip
    'The pattern is always the same': 'パターンは常に同じ',
    'The assimilation always goes in the same direction: the stop becomes nasal, not the other way around. Think of it as the nasal consonant "infecting" the previous sound. ㅂ → ㅁ, ㄷ → ㄴ, ㄱ → ㅇ. Spot the pattern: each pair shares the same place of articulation in the mouth (lips, teeth ridge, throat).': '同化は常に同じ方向に進みます：閉鎖音が鼻音になるのであって、その逆ではありません。鼻音子音が前の音を「感染」させるようなイメージです。ㅂ→ㅁ、ㄷ→ㄴ、ㄱ→ㅇ。パターンに気づきましたか：各ペアは口の中で同じ調音位置を共有しています（唇・歯茎・喉）。',

    // Section 4: Tensification
    'Tensification (경음화)': '濃音化（경음화）',
    'After certain batchim consonants, the following consonant becomes tensed (doubled). This happens most predictably after unreleased stop batchim sounds — the ㄱ, ㄷ, and ㅂ groups. The written form does not change; only the pronunciation shifts.': '特定のパッチム子音の後、続く子音が濃音化（二重化）します。これは特に無開放閉鎖音パッチム（ㄱ・ㄷ・ㅂグループ）の後に最も規則的に起こります。書き方は変わらず、発音だけが変わります。',

    // Tensification table headers
    'Word (Spelling)': '単語（綴り）',
    'Actual Pronunciation': '実際の発音',
    'Romanized': 'ローマ字',

    // Table cells shared across sections
    'restaurant': 'レストラン',
    'rice soup': 'ご飯スープ',
    'entrance': '入口',
    'to close': '閉める',
    'Word': '単語',

    // Tensification info box
    'Why tensification happens': 'なぜ濃音化が起きるのか',
    'After an unreleased stop, the vocal tract is already in a tense, closed position. When you start the next consonant from this state, extra muscular tension carries over — creating the tensed sound automatically. Tensification is not deliberate; it is a natural articulatory consequence. Once you hear it in real speech, you cannot unhear it.': '無開放閉鎖音の後、声道はすでに緊張した閉じた状態にあります。この状態から次の子音を発音し始めると、余分な筋肉の緊張が持ち越されて — 自動的に濃音が生成されます。濃音化は意図的なものではなく、自然な調音上の結果です。実際の会話でこの音を聞いたら、聞き分けられるようになります。',

    // Section 5: ㅎ Weakening
    'ㅎ Weakening (ㅎ 약화)': 'ㅎ弱化（ㅎ 약화）',
    'is one of Korean\'s most unstable sounds. It weakens significantly — often to near-silence — when it appears between vowels. In other positions, it combines with adjacent consonants to create aspirated sounds.': 'は韓国語の中で最も不安定な音の一つです。母音間に現れると著しく弱まり — ほぼ無音になることもあります。その他の位置では、隣接する子音と結合して激音を生成します。',

    // ㅎ table headers (shared across both sub-tables)
    'Spelling': '綴り',
    'Pronunciation': '発音',
    'Rule Applied': '適用規則',

    // ㅎ h3 sub-headings
    'ㅎ Between Vowels → Nearly Silent': 'ㅎが母音間にある → ほぼ無音',
    'ㅎ + Consonant → Aspiration': 'ㅎ + 子音 → 激音化',

    // ㅎ aspiration paragraph (<strong> splits it)
    'batchim meets the next syllable\'s consonant (or vice versa), the two merge into a single aspirated consonant.': 'パッチムが次の音節の子音と出会うとき（またはその逆）、両者が合わさって一つの激音になります。',

    // ㅎ table cells
    'It is good / I like it': '良い / 好き',
    'There is a lot': 'たくさんある',
    'I put it in': '入れる',
    'How? In what way?': 'どうやって？どんな方法で？',
    'to let go / to place': '放す / 置く',
    'to be kind / good-natured': '優しい / 親切な',
    'school enrollment': '入学',
    'I can\'t do it': 'できない',

    // Section 6: Palatalization
    'Palatalization (구개음화)': '口蓋音化（구개음화）',
    'When the consonants': '子音',
    'appear as batchim and are followed by the vowel': 'がパッチムとして現れ、母音',
    '(i), they change into': '（i）に続く場合、それぞれ',
    'respectively. This shift is called palatalization — the consonant moves from the tooth ridge to the palate to anticipate the front vowel.': 'に変わります。この変化を口蓋音化と呼びます — 子音が前母音を予期して歯茎から口蓋に移動します。',

    // Palatalization example box header
    '🗣️ Palatalization Examples (구개음화 예시)': '🗣️ 口蓋音化の例（구개음화 예시）',

    // Palatalization eng-lines
    'together — ㅌ + 이 → ㅊ이 → 치': '一緒に — ㅌ + 이 → ㅊ이 → 치',
    'deliberately / stubbornly — ㄷ + 이 → ㅈ이 → 지': 'わざと / しぶしぶ — ㄷ + 이 → ㅈ이 → 지',
    'sunrise — ㄷ + 이 → 지': '日の出 — ㄷ + 이 → 지',
    'sliding door — ㄷ + 이 → 지': '引き戸 — ㄷ + 이 → 지',

    // Palatalization tip (<strong> splits tip-text)
    'Palatalization is morpheme-internal only': '口蓋音化は形態素内のみ',
    'This rule applies only within the same word or when a grammatical suffix beginning with 이 attaches. It does not apply across word boundaries. So': 'このルールは同じ単語内、または이で始まる文法的な語尾が付くときのみ適用されます。単語の境界をまたいでは適用されません。例えば',
    '같이 (together)': '같이（一緒に）',
    'triggers palatalization because 이 is part of the same word, but in a phrase like': 'は口蓋音化を引き起こします。이が同じ単語の一部だからです。しかし',
    '(putting on clothes), 이 starts a separate word and different rules apply.': '（服を着る）のような語句では、이は別の単語として始まり、別のルールが適用されます。',

    // Section 7: ㄹ Sound
    'The ㄹ Sound (리을)': 'ㄹの音（리을）',
    'is often described as "between r and l" — and that is precisely correct. Its exact realisation depends on position within the syllable. Mastering ㄹ is one of the first major pronunciation goals for learners.': 'はよく「rとlの間」と表現されますが、それはまさに正確です。その正確な実現は音節内の位置によって異なります。ㄹをマスターすることは、学習者の最初の主要な発音目標の一つです。',

    // ㄹ tip (<strong> and <em> split the text)
    'The tongue-tap technique': '舌打ちテクニック',
    'When ㄹ appears': 'ㄹが',
    'between two vowels': '2つの母音の間に現れる場合',
    ', produce it with a single fast tap of the tongue tip against the ridge just behind the upper teeth — the same motion as the American English "r" in': '、舌先を上の歯のすぐ後ろの歯茎に素早く1回当てて発音します — 日本語のら行（ら・り・る・れ・ろ）と同じ舌の動きです（',
    '. Do not roll it (no Spanish r-trill) and do not use an English "l" shape. At the end of a syllable or before a consonant, hold the tongue lightly at that ridge for a gentle "l" sound.': '）。舌を転がさず（スペイン語のrトリルなし）。音節の末尾や子音の前では、舌を軽くその歯茎に当てて柔らかい「l」の音を出します。',

    // ㄹ table headers
    'ㄹ Position': 'ㄹの位置',

    // ㄹ table cells
    'Initial (before vowel)': '語頭（母音の前）',
    'r-tap': 'r弾き音',
    'instant noodles': 'インスタントラーメン',
    'Final batchim': '語末パッチム',
    'l (held)': 'l（保持）',
    'moon': '月',
    'Batchim before consonant': '子音の前のパッチム',
    'I speak / please speak': '話す / 話してください',
    'Between vowels (doubled)': '母音間（二重）',
    'll (held, then tap)': 'll（保持してから弾き音）',
    'quickly, fast': '素早く、速く',
    'No ㄹ — contrast check': 'ㄹなし — 対照チェック',
    'Korean language': '韓国語',
    'Between vowels': '母音間',
    'I love you': '愛してるよ',

    // ㄹ info box (<strong> splits text)
    'ㄹ + ㄴ or ㄴ + ㄹ → ㄹㄹ': 'ㄹ + ㄴ または ㄴ + ㄹ → ㄹㄹ',
    'When ㄹ and ㄴ appear adjacent across syllables, they both become ㄹ — called': 'ㄹとㄴが音節をまたいで隣接する場合、両方ともㄹになります — これを',
    'lateralisation (유음화)': '流音化（유음화）',
    '. Example:': '。例：',
    '(Silla dynasty) is pronounced': '（新羅王朝）は',
    '(silla), not sin-ra. Similarly': '（silla）と発音され、sin-raではありません。同様に',
    '(contact) is pronounced': '（連絡）は',
    '(yeollak).': '（yeollak）と発音されます。',

    // Section 8: Common Mistakes
    'Common Mistakes for English Speakers': '日本語話者のよくある間違い',
    'Korean and English have very different phonological systems. Below are the six most common pronunciation errors made by English speakers — with clear explanations of how to correct them.': '韓国語と日本語は音韻体系が異なる部分があります。以下は日本語話者がよく犯す発音ミスです — 修正方法を分かりやすく解説します。',

    // Mistake tip labels
    'Mistake 1: Pronouncing ㅡ (eu) like "oo"': 'ミス1：ㅡ（eu）を「oo」のように発音する',
    'Mistake 2: Treating ㅓ (eo) like English "er"': 'ミス2：ㅓ（eo）を日本語の「オ」のように丸めて発音する',
    'Mistake 3: Puffing air on double consonants': 'ミス3：二重子音で息を吐き出す',
    'Mistake 4: Rising intonation on all questions': 'ミス4：すべての疑問文で語尾を上げる',
    'Mistake 5: Pronouncing ㅅ as "s" before i-vowels': 'ミス5：i母音の前でㅅを「s」と発音する',
    'Mistake 6: Pronouncing the ㅎ in 좋아요': 'ミス6：좋아요のㅎを発音する',

    // Mistake 1 tip text fragments
    'has no English equivalent. It is a': '日本語の「う」に近い音ですが、同じではありません。これは',
    'back unrounded': '後舌非円唇',
    'vowel — your tongue is in the "oo" position but your lips are completely flat and unrounded, as if you are saying "uh" with a stiff mouth. Words like': '母音です — 舌は「oo」の位置にありますが、唇は完全に平らで丸めていません。まるで硬い口で「uh」と言うかのようです。次の単語で使われます：',
    'all use this sound.': 'これらすべてでこの音が使われます。',

    // Mistake 2 tip text fragments
    'is often transcribed as "eo" or "uh" — but it is NOT the American English "er" (which has an r-colouring). Korean': 'はよく「eo」または「uh」と表記されますが、日本語の「オ」のように唇を丸めずに発音します。韓国語の',
    'is a mid-back unrounded vowel. Think of the British English "uh" in': 'は中後舌非円唇母音です。日本語の「ア」と「オ」の中間の高さで（',
    '. No rounding, no r-sound.': '）を思い浮かべてください。丸めなし、r音なし。',

    // Mistake 3 tip text fragments
    'English speakers naturally add aspiration to stops. Korean tensed (double) consonants': '日本語には韓国語の三種類の子音区別（平音・激音・濃音）がないため、日本語話者には韓国語の濃音（二重）子音',
    'aspirated. Hold a piece of paper in front of your mouth — it should not move when you say': 'は気息音化しません。口の前に紙を持ってください — 発音するときに動いてはいけません：',

    // Mistake 4 tip text fragments
    'In English, rising intonation signals a question. In Korean, intonation rules differ:': '日本語では語尾を上げたり「か」を付けて疑問を表します。韓国語ではイントネーションのルールが異なります：',
    'yes/no questions': 'はい/いいえの疑問文',
    'do use a slight rise at the end, but': 'は語尾が少し上がりますが、',
    'wh-questions': 'WH疑問文',
    '(who/what/where/when/why/how) typically use a falling or neutral intonation — not rising. Overusing rising intonation makes speech sound uncertain or unnatural in Korean.': '（誰・何・どこ・いつ・なぜ・どうやって）は通常、下降または中立のイントネーションを使います — 上昇ではありません。上昇イントネーションを使いすぎると、韓国語では不確かまたは不自然に聞こえます。',

    // Mistake 5 tip text fragments
    'Before the vowels': '母音の前では',
    ', the consonant': '、子音の',
    'is pronounced like English "sh". So': 'は日本語の「シャ行」（シ・シャ・シュ・ショ）のように発音されます。したがって',
    'is "shi" not "si",': 'は「si」ではなく「shi」、',
    '(shirt) begins with "sh". This also applies to': '（シャツ）も「sh」で始まります。これはさらに',
    '(tensed) → "sshi".': '（濃音）→「sshi」にも適用されます。',

    // Mistake 6 tip text fragments
    'Beginners often say "jo-ha-yo" for': '初学者はよく',
    ', treating ㅎ as a clear h-sound. But due to ㅎ weakening between vowels, the actual pronunciation is': 'を「jo-ha-yo」と言いますが、ㅎを明確なh音として扱っています。しかし母音間でのㅎ弱化により、実際の発音は',
    '(jo-a-yo) — the ㅎ nearly disappears. This applies broadly:': '（jo-a-yo）で、ㅎはほぼ消えます。これは広く適用されます：',

    // Quick Pronunciation Checklist
    '🎯 Quick Pronunciation Checklist': '🎯 発音クイックチェックリスト',
    'Wrong Approach': '間違ったアプローチ',
    'Correct Approach': '正しいアプローチ',
    'Practice Word': '練習単語',
    'Round lips like "oo"': '「oo」のように唇を丸める',
    'Flat spread lips, tongue back': '唇を平らに広げ、舌を引く',
    'r-coloured "er" sound': 'r音色のある「er」音',
    'Pure "uh" — no r, no rounding': '純粋な「uh」 — rなし、丸めなし',
    'Strong air puff': '強い息の吐き出し',
    'Tight muscles, no air': '筋肉を緊張させ、息なし',
    '"si" with clear s': '明確なsの「si」',
    '"shi" — palatalised': '「shi」 — 口蓋音化',
    'jo-a-yo (ㅎ silent)': 'jo-a-yo（ㅎ無音）',

    // Lesson nav footer
    'Basic Greetings': '基本的なあいさつ',

    // ── Vocabulary page ──────────────────────────────────────────────

    // Page meta
    '📚 Lesson 4 · vocabulary': '📚 レッスン4・語彙',
    'Vocabulary': '語彙',
    '🗂 20+ Categories': '🗂 20以上のカテゴリー',
    '📊 All Levels': '📊 全レベル',
    '🔊 Audio-ready': '🔊 音声対応',
    '👁 22,104 views': '👁 22,104回閲覧',

    // Shared table headers
    'English': '日本語',
    'Example use': '使用例',
    'Counter': 'カウンター',
    'Used for': '使用対象',
    'Day': '曜日',
    'Month': '月',
    'Season': '季節',
    'Meaning': '意味',
    'Source / Korean meaning': 'ソース / 韓国語の意味',
    'Korean (Dict.)': '韓国語（辞書形）',

    // Tab buttons
    'All': 'すべて',
    'Formal': '丁寧語',
    'Casual': 'カジュアル',

    // Lesson intro (split by <strong>)
    'Building vocabulary is key to Korean fluency. Click any word card to hear its pronunciation. Start with the most common words and work your way up — learning just': '語彙を増やすことは韓国語習得の鍵です。単語カードをクリックして発音を聞きましょう。最もよく使われる単語から始めてレベルアップしていきましょう — たった',
    '500 words': '500語',
    'will cover about 75% of everyday Korean conversation!': 'を覚えるだけで日常の韓国語会話の約75%をカバーできます！',

    // Section headings (h3 — Korean chars are kept in key and translation)
    '👋 Greetings & Polite Phrases (인사말)': '👋 あいさつと礼儀正しいフレーズ (인사말)',
    '🔢 Numbers (숫자)': '🔢 数字 (숫자)',
    '🍜 Food & Drink (음식과 음료)': '🍜 食べ物と飲み物 (음식과 음료)',
    '🎨 Colors (색깔)': '🎨 色 (색깔)',
    '📅 Days & Time (날짜와 시간)': '📅 曜日と時間 (날짜와 시간)',
    '😊 Emotions & Feelings (감정)': '😊 感情 (감정)',
    '👨‍👩‍👧 Family (가족)': '👨‍👩‍👧 家族 (가족)',
    '🏙️ Places (장소)': '🏙️ 場所 (장소)',
    '🫁 Body Parts (신체)': '🫁 体の部位 (신체)',
    '✈️ Travel (여행)': '✈️ 旅行 (여행)',
    '🛒 Shopping (쇼핑)': '🛒 ショッピング (쇼핑)',
    '🌤️ Weather (날씨)': '🌤️ 天気 (날씨)',
    '⚡ Verbs & Actions (동사)': '⚡ 動詞とアクション (동사)',
    '✨ Adjectives (형용사)': '✨ 形容詞 (형용사)',
    '💼 Workplace & Office (직장)': '💼 職場とオフィス (직장)',
    '🏥 Health & Medicine (건강과 의학)': '🏥 健康と医療 (건강과 의학)',
    '🎬 Media & K-Culture (미디어와 한류)': '🎬 メディアとK文化 (미디어와 한류)',
    '📜 Proverbs & Idioms (속담과 관용어)': '📜 ことわざと慣用句 (속담과 관용어)',
    '🎓 Academic Korean (학문 어휘)': '🎓 学術韓国語 (학문 어휘)',
    '🌐 Konglish (콩글리시)': '🌐 コングリッシュ (콩글리시)',
    '📇 Quick Review Flashcards (핵심 단어 복습)': '📇 クイックレビューフラッシュカード (핵심 단어 복습)',

    // Sub-headings h4 (mixed Korean/English — key includes Korean chars)
    'Native Korean 고유어': '固有語 고유어',
    'Sino-Korean 한자어': '漢字語 한자어',
    'Large Native Numbers 큰 고유어 숫자': '大きな固有語の数字 큰 고유어 숫자',
    'Useful Counters 단위': '便利な助数詞 단위',
    'Days of the Week 요일': '曜日 요일',
    'Months 월': '月 월',
    'Seasons 계절': '季節 계절',
    'Time Expressions 시간 표현': '時間表現 시간 표현',

    // Numbers info box
    'Two Number Systems': '二つの数字システム',
    'Korean has': '韓国語には',
    'Native Korean numbers': '固有語の数字',
    '(for counting, age, hours) and': '（カウント・年齢・時間に使う）と',
    'Sino-Korean numbers': '漢字語の数字',
    '(for money, dates, minutes, phone numbers). You need both!': '（お金・日付・分・電話番号に使う）があります。両方必要です！',
    'When to use each system': 'それぞれのシステムの使い方',
    'Native Korean:': '固有語：',
    'age (살), hours (시), counting items (개), floors (층) — e.g., 스물다섯 살 (25 years old).': '年齢（살）、時間（시）、物を数える（개）、階（층）— 例：스물다섯 살（25歳）。',
    'Sino-Korean:': '漢字語：',
    'money (원), minutes (분), dates, phone numbers, addresses — e.g., 이만 원 (20,000 won).': 'お金（원）、分（분）、日付、電話番号、住所 — 例：이만 원（20,000ウォン）。',

    // Verbs section intro (split by <strong>)
    'Korean verbs always end in': '韓国語の動詞は辞書形において',
    'in dictionary form. They conjugate based on formality and tense.': 'で終わります。丁寧さと時制によって活用します。',

    // Adjectives section intro (split by <strong>)
    'Korean adjectives conjugate just like verbs. The forms shown below are in': '韓国語の形容詞は動詞と同じように活用します。以下の形は',
    'polite present': '丁寧な現在形',
    '(해요 form).': '（해요形）です。',

    // Proverbs section intro
    'Korean proverbs (속담) reflect centuries of wisdom. Understanding them gives deep insight into Korean culture and values.': '韓国のことわざ（속담）は何世紀にもわたる知恵を反映しています。それらを理解することで韓国文化と価値観への深い洞察が得られます。',

    // Konglish section
    '🌐 What is Konglish? 콩글리시란?': '🌐 コングリッシュとは？콩글리시란?',
    'Words that look and sound like English — but carry completely different meanings in Korea. Koreans borrowed English words and gave them new Korean lives!': '英語から借用されましたが、韓国では英語とは異なる意味で使われる言葉です。日本語の「和製英語」（コンセント・ナイターなど）と同じ概念です！',
    'Warning for English Speakers': '日本語話者への参考',
    'Using these words with their original English meanings in Korea will cause confusion! For example, saying "컨센트" (consent) in a hardware store means you need an electrical outlet — not that you\'re agreeing to something.': '日本語の「コンセント」が電気ソケットを意味するように、これらの言葉は英語の本来の意味とは異なります。例えば「컨센트」は電気コンセントを意味します — 日本語のコンセントとほぼ同じですね！',
    'Konglish evolves constantly! New words appear as Korean pop culture spreads globally.': 'コングリッシュは常に進化しています！韓国のポップカルチャーが世界中に広がるにつれて新しい言葉が生まれています。',
    '(nunchi) is the reverse — a Korean word with no English equivalent that English speakers are now borrowing!': '（ヌンチ）は逆のパターンです — 「空気を読む」と似ていますが、日本語に完全に相当する言葉はない韓国語の単語です！',

    // Completion & nav
    '✓ Mark Vocabulary Lesson Complete': '✓ 語彙レッスンを完了にする',
    'Korean Grammar': '韓国語の文法',
    'K-Culture →': 'K文化 →',
    'Explore': '探索する',
    'Previous': '前へ',

    // Greetings table eng-cells
    'Hello (formal)': 'こんにちは（丁寧）',
    'Hi / Bye (casual)': 'やあ / じゃあね（カジュアル）',
    'Thank you (formal)': 'ありがとうございます（丁寧）',
    'Thank you (polite)': 'ありがとうございます（ていねい）',
    "I'm sorry (formal)": '申し訳ありません（丁寧）',
    'Sorry (polite)': 'ごめんなさい（ていねい）',
    "It's okay / Are you okay?": '大丈夫です / 大丈夫ですか？',
    'Yes / No': 'はい / いいえ',
    'Nice to meet you': 'はじめまして',
    'How have you been?': 'お元気でしたか？',
    'Welcome (to a store)': 'いらっしゃいませ',
    'You can do it! / Fighting!': 'ファイト！/ がんばれ！',
    'Nice to meet you (formal, first time)': 'はじめまして（丁寧、初対面）',
    'Please take care of me / Best regards': 'よろしくお願いします',
    'Goodbye (said to person leaving)': 'さようなら（去る人に言う）',
    'Goodbye (said when you are leaving)': 'さようなら（自分が去る時に言う）',
    'Long time no see': 'お久しぶりです',
    'See you again': 'またね',
    "You're welcome / Not at all": 'どういたしまして',
    'I will eat well (said before meals)': 'いただきます',
    'I ate well / That was delicious (after meals)': 'ごちそうさまでした',
    'Good work / Take care (to someone continuing to work)': 'お疲れ様です',

    // Days of the week
    'Monday': '月曜日',
    'Tuesday': '火曜日',
    'Wednesday': '水曜日',
    'Thursday': '木曜日',
    'Friday': '金曜日',
    'Saturday': '土曜日',
    'Sunday': '日曜日',

    // Months
    'January': '1月',
    'February': '2月',
    'March': '3月',
    'April': '4月',
    'May': '5月',
    'June': '6月',
    'July': '7月',
    'August': '8月',
    'September': '9月',
    'October': '10月',
    'November': '11月',
    'December': '12月',

    // Seasons
    'Spring': '春',
    'Summer': '夏',
    'Autumn / Fall': '秋',
    'Winter': '冬',

    // Time expressions
    'AM / Morning': '午前 / 朝',
    'PM / Afternoon': '午後',
    'Morning': '朝',
    'Noon / Lunch time': '昼 / お昼時',
    'Evening / Dinner time': '夕方 / 夕食時',
    'Night': '夜',
    'Yesterday': '昨日',
    'The day before yesterday': '一昨日',
    'The day before the day before yesterday': '一昨々日',
    'Today': '今日',
    'Tomorrow': '明日',
    'The day after tomorrow': '明後日',
    'The day after the day after tomorrow': '明々後日',
    'Now / Right now': '今 / ちょうど今',

    // Counters "used for"
    'general objects': '一般的な物',
    'people (formal)': '人（丁寧）',
    'people (honorific)': '人（敬語）',
    'age (years old)': '年齢（歳）',
    'flat things (paper)': '平たい物（紙）',
    'books / volumes': '本 / 巻',
    'cups / glasses': 'コップ / グラス',
    'bottles': 'ボトル',
    'times / occurrences': '回 / 度',
    'floors / stories': '階',

    // Family eng-cells
    'Father / Dad': 'お父さん / パパ',
    'Mother / Mom': 'お母さん / ママ',
    'Older brother (male/female speaker)': '兄（男性から）/ お兄さん（女性から）',
    'Older sister (male/female speaker)': '姉（男性から）/ お姉さん（女性から）',
    'Younger brother': '弟',
    'Younger sister': '妹',
    'Grandfather': '祖父 / おじいさん',
    'Grandmother': '祖母 / おばあさん',
    'Husband': '夫',
    'Wife': '妻',
    'Son': '息子',
    'Daughter': '娘',
    "Uncle (father's brother)": 'おじさん（父方の兄弟）',
    "Aunt (mother's sister)": 'おばさん（母方の姉妹）',
    "Aunt (father's sister)": 'おばさん（父方の姉妹）',
    'Cousin': 'いとこ',
    'Nephew / Niece': '甥 / 姪',
    'Maternal grandfather': '外祖父 / 母方のおじいさん',
    'Maternal grandmother': '外祖母 / 母方のおばあさん',
    'Father-in-law': '義父',
    'Mother-in-law': '義母',

    // Travel eng-cells
    'Passport': 'パスポート',
    'Airplane': '飛行機',
    'Train': '電車',
    'Bus': 'バス',
    'Taxi': 'タクシー',
    'Subway': '地下鉄',
    'Ticket': '切符 / チケット',
    'Hotel': 'ホテル',
    'Tourist attraction': '観光地',
    'Map': '地図',
    'Currency exchange': '両替',
    'Admission fee': '入場料',
    'Reservation / Booking': '予約',
    'Cancellation': 'キャンセル',
    'Luggage / Baggage': '荷物',
    'Immigration / Passport control': '入国審査',
    'Arrival': '到着',
    'Departure': '出発',
    'Boarding gate': '搭乗ゲート',

    // Shopping eng-cells
    'How much is it?': 'いくらですか？',
    'Expensive': '高い',
    'Cheap / Inexpensive': '安い',
    'Discount': '割引',
    'Please check out / bill me': 'お会計をお願いします',
    "I'll pay by card": 'カードで支払います',
    'Please give me a receipt': 'レシートをください',
    "I'd like to exchange": '交換したいのですが',
    "It's sold out": '売り切れです',
    'Please give me a bag': '袋をください',
    'Is it in stock?': '在庫はありますか？',
    'May I try this on?': '試着してもいいですか？',
    'Size': 'サイズ',
    'Please wrap it / gift wrap': '包んでください',
    'Delivery / Shipping': '配送',

    // Verbs eng-cells
    'To go': '行く',
    'To come': '来る',
    'To eat': '食べる',
    'To drink': '飲む',
    'To sleep': '寝る',
    'To wake up / get up': '起きる / 起き上がる',
    'To work': '働く',
    'To study': '勉強する',
    'To see / watch': '見る',
    'To listen / hear': '聞く / 聞こえる',
    'To speak / say': '話す / 言う',
    'To read': '読む',
    'To write': '書く',
    'To buy': '買う',
    'To sell': '売る',
    'To make / create': '作る / 創る',
    'To give': 'あげる / 与える',
    'To receive / get': 'もらう / 受け取る',
    'To help': '助ける / 手伝う',
    'To think': '思う / 考える',
    'To feel': '感じる',
    'To like': '好きだ / 好む',
    'To dislike / hate': '嫌いだ / 嫌う',
    'To know': '知る / 知っている',
    'To not know': '知らない / 分からない',

    // Workplace eng-cells
    'Company / Firm': '会社',
    'Employee / Staff': '従業員 / スタッフ',
    'Boss / Superior': '上司 / ボス',
    'Subordinate / Junior staff': '部下 / 後輩スタッフ',
    'Colleague / Coworker': '同僚',
    'Meeting': '会議',
    'Report / Document': '報告書 / 書類',
    'Project': 'プロジェクト',
    'Deadline': '締め切り',
    'Going to work / Clocking in': '出勤',
    'Leaving work / Clocking out': '退勤',
    'Overtime / Night work': '残業 / 夜間勤務',
    'Monthly salary': '月給',
    'Annual salary': '年俸',
    'Job interview': '就職面接',
    'Resume / CV': '履歴書',
    'Contract': '契約書',
    'Department / Division': '部署 / 部門',
    'HR / Human Resources': '人事部',
    'Work tasks / Duties': '業務 / 職務',
    'Cooperation / Collaboration': '協力 / コラボレーション',

    // Health eng-cells
    'Doctor / Physician': '医師 / 医者',
    'Nurse': '看護師',
    'Medicine / Medication': '薬',
    'Prescription': '処方箋',
    'Symptom': '症状',
    'Headache': '頭痛',
    'Fever': '発熱 / 熱',
    'Cough': '咳',
    'Runny nose': '鼻水',
    'Upset stomach': '腹痛 / 胃の不調',
    'Allergy': 'アレルギー',
    'Surgery / Operation': '手術',
    'Medical examination / Test': '検査',
    'Blood pressure': '血圧',
    'Blood type': '血液型',
    'Vaccination / Immunization': '予防接種',
    'Emergency room': '救急室',
    'Hospitalization': '入院',
    'Hospital discharge': '退院',
    'Health insurance': '健康保険',

    // Academic eng-cells
    'Thesis / Academic paper': '論文 / 学術論文',
    'Research': '研究',
    'Analysis': '分析',
    'Theory': '理論',
    'Hypothesis': '仮説',
    'Experiment': '実験',
    'Conclusion': '結論',
    'References / Bibliography': '参考文献',
    'Citation / Quotation': '引用',
    'Source / Origin': '出典 / 出所',
    'Presentation / Announcement': '発表',
    'Discussion / Debate': '討論 / ディベート',
    'Concept / Notion': '概念',
    'Definition': '定義',
    'Principle': '原則 / 原理',
    'Methodology': '方法論',
    'Statistics': '統計',
    'Data': 'データ',
    'Academic degree': '学位',
    'Major / Academic specialization': '専攻',

    // News & Society eng-cells
    'Politics': '政治',
    'Economy': '経済',
    'Society': '社会',
    'National Assembly (Parliament)': '国会（議会）',
    'Election': '選挙',
    'Government': '政府',
    'President': '大統領',
    'Prime Minister': '首相',
    'Diplomacy': '外交',
    'Trade': '貿易',
    'Exchange rate': '為替レート',
    'Prices / Cost of living': '物価 / 生活費',
    'Unemployment rate': '失業率',
    'Inflation': 'インフレーション',
    'Environment': '環境',
    'Climate change': '気候変動',
    'Human rights': '人権',
    'Incident / Case / Event': '事件 / 出来事',
    'Investigation': '捜査',
    'Verdict / Court ruling': '判決 / 裁判の判決',

    // Search placeholder
    'Search vocabulary...': '語彙を検索...',

    // ── Pronouns page ────────────────────────────────────────────────

    // Lesson tag & meta
    '👥 Beginner · Lesson 5': '👥 初級 · レッスン 5',
    '⏱ 25 min read': '⏱ 25分読了',
    '🔖 Grammar': '🔖 文法',

    // Lesson intro — <strong> splits paragraph
    'Korean pronouns work very differently from English. The language has distinct levels of formality built into its pronoun system — who you\'re talking to determines which words you use. You\'ll also find that Korean often': '韓国語の代名詞は日本語と似た特徴があります。敬語レベルが代名詞システムに組み込まれており — 話し相手によって使う言葉が変わります。また、韓国語では文脈が明確な場合に',
    'omits pronouns entirely': '代名詞を完全に省略する',
    'when context makes them clear. This lesson covers every pronoun category you need to communicate naturally in Korean.': 'ことがよくあります。このレッスンでは韓国語で自然にコミュニケーションするために必要なすべての代名詞カテゴリを解説します。',

    // Section headings (text node after section-num span)
    'First Person Pronouns — I/Me (1인칭)': '一人称代名詞 — 私/私を (1인칭)',
    'Second Person Pronouns — You (2인칭)': '二人称代名詞 — あなた (2인칭)',
    'Third Person — He / She / They (3인칭)': '三人称 — 彼/彼女/彼ら (3인칭)',
    'We / Our (우리)': '私たち / 私たちの (우리)',
    'Demonstrative Pronouns — This / That (지시대명사)': '指示代名詞 — これ / それ (지시대명사)',
    'Reflexive Pronouns (재귀대명사)': '再帰代名詞 (재귀대명사)',
    'Question Pronouns (의문대명사)': '疑問代名詞 (의문대명사)',
    'Plural Marker — 들': '複数マーカー — 들',

    // Section 1 body paragraph — <strong> splits into text nodes
    'Korean has two words for "I":': '「私」を表す韓国語の単語は2つあります：',
    '(na) for casual speech and': '（na）はくだけた表現で、',
    '(jeo) for polite speech. Choosing the wrong one signals disrespect — or sounds overly stiff with close friends. Each pronoun changes form depending on its grammatical role in the sentence.': '（jeo）は丁寧な表現です。間違って使うと失礼に聞こえたり、親しい友達に対して堅苦しく感じられたりします。代名詞は文中での文法的役割によって形が変わります。',

    // Section 1 tip
    'Formality Tip': '丁寧さのヒント',
    'Use': '使いましょう：',
    '(jeo) when speaking to strangers, elders, teachers, bosses, or anyone you want to show respect to. Use': '（jeo）は見知らぬ人、目上の人、先生、上司など、敬意を示したい相手に使います。',
    '(na) with close friends, family members younger than you, or people of equal or lower social standing. When in doubt — use 저.': '（na）は親しい友人、年下の家族、対等または目下の立場の人に使います。迷ったときは저を使いましょう。',

    // Section 1 example header
    '📘 나 vs 저 in Context': '📘 나 vs 저 の使い分け',

    // Section 1 table cells
    'I / me (subject, casual)': '私/私を（主語、カジュアル）',
    'me (object, casual)': '私を（目的語、カジュアル）',
    'my (possessive, casual)': '私の（所有格、カジュアル）',
    'to me / for me (casual)': '私に/私のために（カジュアル）',
    'I / me (subject, polite)': '私/私を（主語、丁寧）',
    'me (object, polite)': '私を（目的語、丁寧）',
    'my (possessive, polite)': '私の（所有格、丁寧）',
    'to me / for me (polite)': '私に/私のために（丁寧）',

    // Section 2 body paragraph — <strong> splits into text nodes
    'This is one of the most important differences between Korean and English:': 'これは韓国語と英語の重要な違いですが、日本語と韓国語の共通の特徴でもあります：',
    'Korean speakers almost never say "you" directly.': '韓国語話者は「あなた」を直接言うことがほとんどありません。',
    'Instead, they use the listener\'s name, their title, or a respectful term. Direct use of "you" can easily sound cold or even rude.': '代わりに、聞き手の名前、肩書き、または敬称を使います。「あなた」を直接使うと冷たく、または失礼に聞こえやすいです。',

    // Section 2 table header
    'Usage': '使い方',

    // Section 2 table cells
    'you (very casual)': 'あなた（非常にカジュアル）',
    'With close friends / children only': '親しい友人・子どもにのみ',
    'you (formal / literary)': 'あなた（フォーマル・文語）',
    'Songs, formal writing, spouses': '歌・公式な文章・配偶者間',
    '"that side" — polite you': '「そちら」— 丁寧な二人称',
    'Politely addressing a stranger': '見知らぬ人への丁寧な呼びかけ',
    'Mr./Ms. [Name] — polite': '[名前]さん — 丁寧',
    'Professional / semi-formal settings': '仕事・やや改まった場面',
    'teacher (used as "you")': '先生（「あなた」として使う）',
    'Addressing a teacher directly': '先生への直接の呼びかけ',
    'older sister / older brother (used as "you")': 'お姉さん / お兄さん（「あなた」として使う）',
    'Addressing older friends as family': '年上の友人を家族のように呼ぶ',

    // Section 2 info box tip text — <strong> splits text node
    '(dangshin) appears frequently in K-Pop lyrics and love songs, but using it in everyday conversation can sound cold, confrontational, or even combative. Between married couples it can be affectionate, but in other contexts it may feel like a challenge. Stick to names and titles in real conversation.': '（dangshin）はK-POPの歌詞や愛の歌によく登場しますが、日常会話で使うと冷たく、対立的、または攻撃的に聞こえることがあります。夫婦間では愛情表現になることがありますが、他の文脈では挑戦的に感じられるかもしれません。実際の会話では名前と肩書きを使いましょう。',

    // Section 2 example header
    '📘 Addressing Someone Without Saying "You"': '📘「あなた」を使わずに呼びかける',

    // Section 3 body paragraph — <strong> splits text nodes
    'Just as with "you," Korean speakers rarely use third-person pronouns in spoken conversation. Instead they use names, titles, or demonstrative expressions like': '「あなた」と同様に、韓国語話者は会話で三人称代名詞をほとんど使いません。代わりに名前、肩書き、または',
    '(this person) and': '（この人）や',
    '(that person over there). The words 그 and 그녀 exist mainly in translated literature.': '（あちらの方）のような指示表現を使います。그と그녀は主に翻訳文学に登場します。',

    // Section 3 table cells
    'he / that person': '彼 / あの人',
    'Written / literary': '書き言葉・文語',
    'she (literary)': '彼女（文語）',
    'Written only — rare in speech': '書き言葉のみ — 口語ではまれ',
    'they': '彼ら',
    'Written / formal contexts': '書き言葉・フォーマルな文脈',
    'it / that thing': 'それ / あのもの',
    'Common in speech': '口語でよく使われる',
    'this person (formal)': 'この方（フォーマル）',
    'Introducing someone respectfully': '丁寧に人を紹介するとき',
    'that person over there (formal)': 'あちらの方（フォーマル）',
    'Pointing to someone at a distance': '遠くにいる人を指すとき',

    // Section 3 tip
    'Speaking Tip': '会話のヒント',
    'and': 'と',
    'are mostly encountered in book translations from English. In natural spoken Korean, you would say the person\'s name, use': 'は主に外国語（英語や日本語など）からの翻訳本に登場します。自然な口語の韓国語では、人の名前を言うか、',
    ', or simply omit the pronoun entirely if context is clear.': 'を使うか、文脈が明確な場合は代名詞を省略します。',

    // Section 3 example header
    '📘 Third Person in Natural Korean': '📘 自然な韓国語での三人称',

    // Section 4 body paragraph — <strong> splits text nodes
    'The word': '「',
    '(uri) literally means "we" or "our," but Koreans use it where English speakers would say "my." This reflects a cultural emphasis on collective identity — family, relationships, and belonging are expressed communally even when one person is speaking.': '」（uri）は文字通り「私たち」や「私たちの」を意味しますが、韓国語では「私の」を意味する場面でよく使います。日本語の「うちの」に近い感覚ですが、韓国語ではさらに広い文脈で使われます。',

    // Section 4 info box
    'Cultural Note': '文化的なノート',
    'In Korean, saying': '韓国語では、',
    '("my mom") can sound distant or cold. The natural expression is': '（「私のお母さん」）と言うと距離感や冷たさを感じさせることがあります。自然な表現は',
    '("our mom"), even when talking about your own individual mother. The same applies to your home (': '（「うちのお母さん」）で、個人の母親について話すときでもこう言います。同様に自分の家（',
    '), your school (': '）、学校（',
    '), and your country (': '）、国（',
    '). This reflects how deeply Koreans value communal bonds.': '）にも使います。これは韓国人がいかに共同体的なつながりを大切にしているかを反映しています。',

    // Section 4 table cells
    'we / our / my (collective)': '私たち / 私たちの / 私の（集合的）',
    'our / we (humble, polite)': '私どもの / 私ども（謙遜・丁寧）',
    'everyone / ladies and gentlemen': '皆さん / ご来場の皆様',

    // Section 4 example header
    '📘 우리 Used for "My"': '📘「私の」に使われる우리',

    // Section 5 body paragraph — <strong> splits text nodes
    'Korean uses a three-way demonstrative system built on the roots': '韓国語は3方向の指示体系を使い、語根は',
    '(near the speaker),': '（話し手の近く）、',
    '(near the listener or previously mentioned), and': '（聞き手の近くまたは前述のもの）、',
    '(far from both). These roots combine with nouns like 것 (thing), 분 (person), and 곳 (place).': '（両者から遠い）の3つです。これらの語根は것（もの）、분（人）、곳（場所）などの名詞と組み合わせます。',

    // Section 5 table cells
    'this (thing near speaker)': 'これ（話し手の近くのもの）',
    'that (near listener / previously mentioned)': 'それ（聞き手の近く / 前述のもの）',
    'that (far from both, over there)': 'あれ（両者から遠い、あちら）',
    'that person / he / she (formal)': 'その方 / 彼 / 彼女（フォーマル）',
    'this place / here': 'この場所 / ここ',
    'that place over there': 'あそこ',

    // Section 5 example header
    '📘 Demonstrative Dialogue': '📘 指示代名詞の会話例',

    // Section 6 body paragraph
    'Reflexive pronouns in Korean express actions done by oneself, to oneself, or independently. They are used when the subject and object of a sentence are the same, or to emphasize independent action.': '韓国語の再帰代名詞は、自分自身に対して行う行動や、独立した行動を表します。文の主語と目的語が同じ場合や、独立した行動を強調するときに使います。',

    // Section 6 table cells
    'oneself / himself / herself': '自分自身 / 彼自身 / 彼女自身',
    'by oneself / on one\'s own': '自分で / 独力で',
    'alone / by oneself': '一人で / 独りで',

    // Section 6 example header
    '📘 Reflexive Pronouns in Sentences': '📘 文中での再帰代名詞',

    // Section 7 body paragraph
    'Question pronouns are the "who, what, which, where, when" words of Korean. Unlike English, Korean question words stay in the same position as the noun they replace — they do not move to the front of the sentence.': '疑問代名詞は韓国語の「誰・何・どれ・どこ・いつ」に相当する言葉です。日本語と同様に、韓国語の疑問詞は置き換える名詞と同じ位置に留まり — 文の先頭に移動しません。',

    // Section 7 hangul-card names
    'who': '誰',
    'what (casual)': '何（カジュアル）',
    'what (formal)': '何（フォーマル）',
    'which': 'どれ',
    'where': 'どこ',
    'when': 'いつ',

    // Section 7 example header
    '📘 Question Pronouns in Sentences': '📘 文中での疑問代名詞',

    // Section 8 body paragraph — <strong> splits text nodes
    'Korean nouns and pronouns do not change form for plural by default. To explicitly mark something as plural, you attach the suffix': '韓国語の名詞と代名詞はデフォルトでは複数形に変化しません。複数を明示的に示すには、接尾辞',
    '(-deul). However, this suffix is often optional — Korean speakers rely on context, numbers, or quantity words to indicate plural meaning.': '（-deul）を付けます。ただし、この接尾辞はしばしば任意です — 韓国語話者は複数の意味を示すために文脈・数字・量の言葉に頼ります。',

    // Section 8 table cells
    'people (plural of 사람)': '人々（사람の複数形）',
    'students (plural)': '学生たち（複数）',
    'friends (plural)': '友達たち（複数）',
    'those things (plural)': 'それらのもの（複数）',
    'we / us (emphasised plural)': '私たち（強調された複数）',

    // Section 8 tip — <strong> splits text nodes
    'is optional in Korean. You can say': 'は韓国語では任意です。',
    'and it can mean "student" or "students" — context will usually make the number clear. Adding -들 simply emphasises that you mean more than one. It can even be attached to verbs and adverbs for a colloquial flavour:': 'と言えば「学生」または「学生たち」を意味することができます — 文脈によって数が明確になります。-들を追加することは単に複数を強調するだけです。動詞や副詞に付けて口語的なニュアンスを出すこともできます：',
    '(Are you all doing well?)': '（皆さんお元気ですか？）',

    // ── Nouns page ────────────────────────────────────────
    '🏠 Beginner · Lesson 6': '🏠 初級 · レッスン 6',
    'Common Korean Nouns:': '韓国語の一般名詞：',
    '🔖 Vocabulary': '🔖 語彙',

    // Lesson intro — split by <strong>명사</strong>
    'Nouns (': '名詞（',
    ') are the building blocks of every Korean sentence. Unlike English, Korean nouns do not change form for gender or number — one word covers both singular and plural. This lesson organises the most essential Korean nouns into eight practical categories, from people and family to counters and possessives, so you can start building real sentences right away.': '）はすべての韓国語文の基本です。日本語と同様に、韓国語の名詞は性別や数によって形が変わりません — 一つの言葉が単数・複数の両方をカバーします。このレッスンでは、人物・家族からカウンター・所有格まで、最も重要な韓国語名詞を8つの実践的なカテゴリに整理しています。',

    // Section headings
    'People Nouns (사람 명사)': '人の名詞（사람 명사）',
    'Family Nouns (가족 명사)': '家族の名詞（가족 명사）',
    'Place Nouns (장소 명사)': '場所の名詞（장소 명사）',
    'Time Nouns (시간 명사)': '時間の名詞（시간 명사）',
    'Object Nouns — Everyday Things (사물 명사)': '物の名詞 — 日常のもの（사물 명사）',
    'Korean Counters (수사 / 단위 명사)': '韓国語の助数詞（수사 / 단위 명사）',
    'Possessives with Nouns (의)': '名詞の所有格（의）',
    'Practice — Noun Sentences': '練習 — 名詞の文',

    // Section body paragraphs
    'These words describe people and their roles. They are among the first nouns you will use in real Korean conversations — introducing yourself, asking about others, or talking about your day.': 'これらの言葉は人々とその役割を表します。自己紹介・他者についての質問・日常の話など、実際の韓国語会話で最初に使う名詞です。',

    // Section 2 — split by <strong>your gender</strong>
    'Korean family vocabulary is more complex than English — many terms change depending on': '韓国語の家族語彙は日本語と同様に複雑です — 多くの言葉は',
    'your gender': '話者の性別',
    'as the speaker. For example, an older brother is called 형 by male speakers and 오빠 by female speakers. Always learn both forms.': 'によって変わります。例えば、兄は男性話者には형、女性話者にはオッパ（오빠）と呼びます。両方の形を覚えましょう。',

    'Place nouns are essential for giving and receiving directions, making plans, and describing your daily routine. These fifteen locations cover the most common places in everyday Korean life.': '場所の名詞は道を教えたり受けたり、計画を立てたり、日常を描写するのに欠かせません。これら15の場所は日常の韓国語生活で最もよく使われる場所です。',
    'Korean time expressions are used very frequently in daily conversation. Unlike English, these words typically appear before the verb they modify. Mastering them lets you place any action in past, present, or future time.': '韓国語の時間表現は日常会話で非常に頻繁に使われます。日本語と同様に、これらの言葉は通常修飾する動詞の前に置かれます。これらをマスターすることで、あらゆる動作を過去・現在・未来に位置づけることができます。',

    // Section 5 — split by <strong>차</strong>
    'These everyday objects appear in beginner conversations about daily life, shopping, and describing your surroundings. Note that': 'これらの日常の物は、日常生活・買い物・周囲の描写についての初級会話に登場します。なお、',
    'can mean both "tea" and "car" — context always makes the meaning clear.': 'は「お茶」と「車」の両方を意味できます — 文脈で常に意味が明らかになります。',

    // Section 6 — split by <strong>counter word</strong>, <em>after</em>, <strong>사과 세 개</strong>
    'In Korean, you cannot simply put a number before a noun the way English does. You must use a': '韓国語でも日本語と同様に、数字を名詞の前に置くだけではいけません。',
    'counter word': '助数詞',
    '— a classifier that categorises the type of object being counted. The counter comes': '— 数える物の種類を分類する語を使う必要があります。助数詞は',
    'after': '後に',
    'the noun and after the number:': 'に来ます — 名詞と数字の後に：',
    '(apple three [general-object-counter] = three apples). This is similar to English "two cups of coffee" or "a sheet of paper" — except Korean requires this for everything.': '（りんご 三 [一般助数詞] = りんご三つ）。これは日本語の「コーヒー二杯」や「紙一枚」の助数詞と同じ概念です。日本語と同様に、韓国語でもすべての物に助数詞が必要です。',

    // Section 7 — split by <strong>의</strong> (Korean spans)
    'To show possession in Korean — "A\'s B" — you place the particle': '韓国語で所有を表すには「AのB」— 所有者と所有物の名詞の間に助詞',
    '(ui) between the possessor and the possessed noun. In natural spoken Korean,': '（ui）を置きます。自然な話し言葉では、',
    'is often dropped or contracted, especially in pronouns.': 'は特に代名詞でよく省略・縮約されます。',

    'Put it all together. Read each sentence aloud, listen to the pronunciation, and try to build similar sentences using the vocabulary from this lesson.': 'すべてをまとめましょう。各文を声に出して読み、発音を聞いて、このレッスンの語彙を使って同様の文を作ってみましょう。',

    // Table header (capital F — different from existing 'Used for')
    'Used For': '使用対象',

    // People table — English meanings
    'person / human': '人・人間',
    'man / boy': '男性・男の子',
    'woman / girl': '女性・女の子',
    'child / kid': '子供',
    'adult': '大人',
    'student': '学生',
    'teacher': '先生',
    'friend': '友達',
    'neighbor': '隣人',
    'guest / customer': 'お客様・顧客',
    'doctor': '医者',
    'employee / staff member': '従業員・スタッフ',

    // Family table — English meanings
    'father / dad': '父・お父さん',
    'mother / mom': '母・お母さん',
    'older brother': '兄（お兄さん）',
    'older sister': '姉（お姉さん）',
    'younger brother': '弟',
    'younger sister': '妹',
    'grandfather': '祖父',
    'grandmother': '祖母',
    'husband': '夫',
    'wife': '妻',

    // Family table — Note column (mixed Korean + English)
    'Formal / informal': 'フォーマル・インフォーマル',
    '형 = male speaker · 오빠 = female speaker': '형 = 男性話者 · 오빠 = 女性話者',
    '누나 = male speaker · 언니 = female speaker': '누나 = 男性話者 · 언니 = 女性話者',
    'Any speaker': 'どちらの話者でも',
    '아내 = plain · 부인 = formal/respectful': '아내 = 普通 · 부인 = フォーマル・丁寧',

    // Place table — English meanings
    'house / home': '家・自宅',
    'school': '学校',
    'company / office': '会社・オフィス',
    'restaurant': 'レストラン・食堂',
    'café': 'カフェ',
    'hospital / clinic': '病院・クリニック',
    'bank': '銀行',
    'convenience store': 'コンビニ',
    'airport': '空港',
    'subway station': '地下鉄の駅',
    'market': '市場',
    'library': '図書館',
    'park': '公園',
    'cinema / movie theater': '映画館',
    'hotel': 'ホテル',

    // Time table — English meanings
    'today': '今日',
    'tomorrow': '明日',
    'yesterday': '昨日',
    'day after tomorrow': '明後日',
    'now': '今',
    'morning / breakfast': '朝・朝ご飯',
    'noon / lunch': '昼・昼ご飯',
    'evening / dinner': '夕方・夕ご飯',
    'night': '夜',
    'weekend': '週末',
    'weekday': '平日',
    'this week': '今週',
    'next week': '来週',
    'last week': '先週',
    'this month': '今月',
    'this year': '今年',
    'Monday': '月曜日',
    'Friday': '金曜日',

    // Object table — English meanings
    'book': '本',
    'bag': 'バッグ・かばん',
    'clothes / clothing': '服・衣類',
    'shoes / footwear': '靴・履物',
    'mobile phone / smartphone': '携帯電話・スマートフォン',
    'computer': 'コンピュータ',
    'key': '鍵',
    'wallet': '財布',
    'food': '食べ物',
    'water': '水',
    'coffee': 'コーヒー',
    'tea (hot drink) / car — context determines meaning': 'お茶（飲み物）/ 車 — 文脈で意味が決まる',
    'money': 'お金',
    'ticket': 'チケット',
    'umbrella': '傘',
    'gift / present': 'プレゼント・贈り物',

    // Counter table — Used For column
    'general objects (most things)': '一般的な物（ほとんどの物）',
    'people (명 = plain, 분 = respectful)': '人（명 = 一般, 분 = 丁寧）',
    'books, bound volumes': '本・冊子類',
    'drinks served in cups or glasses': 'カップやグラスで提供される飲み物',
    'flat thin things (paper, photos, tickets)': '平らで薄いもの（紙・写真・チケット）',
    'bottles': '瓶',
    'animals': '動物',
    'times (occurrences) / ordinal numbers': '回数（出来事） / 序数',

    // Counter table — Example column text nodes (after Korean span)
    '— 3 apples': '— りんご3つ',
    '— 5 students': '— 学生5人',
    '— 2 books': '— 本2冊',
    '— 1 cup of coffee': '— コーヒー1杯',
    '— 10 sheets of paper': '— 紙10枚',
    '— 1 bottle of water': '— 水1本',
    '— 2 cats': '— 猫2匹',
    '— first / 세 번 — 3 times': '— 1番目 / 세 번 — 3回',

    // Possessives table — English meanings
    'friend\'s book': '友達の本',
    'teacher\'s classroom': '先生の教室',
    'my (casual — contracted in speech)': '私の（カジュアル — 話し言葉で縮約）',
    'my (polite — contracted in speech)': '私の（丁寧 — 話し言葉で縮約）',
    'your (casual — contracted in speech)': 'あなたの（カジュアル — 話し言葉で縮約）',
    'my bag (polite, contracted)': '私のバッグ（丁寧・縮約形）',

    // Tip labels
    'Important!': '重要！',
    'Pronunciation Tip': '発音ポイント',
    'Study Tip': '学習のポイント',

    // Section 2 tip — split by Korean <strong> tags
    'Korean has': '韓国語には',
    'different words for "older sibling" depending on your own gender': '「兄・姉」の言い方が話者の性別によって異なります',
    '. If you are male: your older brother is': '。男性の場合：兄は',
    'and your older sister is': '、姉は',
    '. If you are female: your older brother is': '。女性の場合：兄は',
    '. Using the wrong word is a very common mistake among learners — memorise both sets early!': '。間違った言葉を使うことは学習者によくある間違いです — 両方のセットを早めに覚えましょう！',

    // Section 7 tip — split by Korean <strong> tags
    'In spoken Korean,': '話し言葉では、',
    'after pronouns is almost always contracted:': 'は代名詞の後でほぼ常に縮約されます：',
    '. When written or in formal contexts,': '。書き言葉やフォーマルな場面では、',
    'is kept. Note that': 'が保たれます。なお、',
    '(my) and': '（私の）と',
    '(your) sound very similar in many regional accents, so speakers sometimes add': '（あなたの）は多くの方言で非常によく似た音のため、話者は明確にするために',
    'in full for clarity.': 'を省略せずに使うことがあります。',

    // Study tip text
    'The fastest way to build vocabulary is to connect each noun to a real memory. Walk through your home and label objects in Korean. Name the places on your commute. Write today\'s date using Korean time words. Active recall — retrieving a word without looking — is far more effective than passive reading. Try covering the Korean column and testing yourself after each section.': '語彙を増やす最速の方法は、各名詞をリアルな記憶と結びつけることです。家の中を歩きながら物を韓国語でラベリングしましょう。通勤中の場所を名付けましょう。今日の日付を韓国語の時間の言葉で書きましょう。アクティブリコール — 見ずに言葉を思い出すこと — は受動的な読みよりずっと効果的です。各セクションの後に韓国語の列を隠して自分テストしてみましょう。',

    // Example box headers
    '📘 Counters in Full Sentences': '📘 助数詞を使った例文',
    '📘 Full Sentences with Nouns': '📘 名詞を使った例文',

    // Example sentences — eng-line divs
    'I bought three apples.': 'りんごを3つ買いました。',
    'There are ten students.': '学生が10人います。',
    'Please give me one cup of coffee.': 'コーヒーを1杯ください。',
    'There are two cats.': '猫が2匹います。',
    'I am a student.': '私は学生です。',
    'Today I\'m meeting a friend.': '今日、友達に会います。',
    'I\'m going to school.': '学校へ行きます。',
    'I have three books.': '本が3冊あります。',
    'I\'m going to the hospital tomorrow.': '明日、病院に行きます。',
    'This coffee is mine.': 'このコーヒーは私のものです。',

  // ── Grammar page ──────────────────────────────────────────────

  // Lesson header
  'Korean Grammar:': '韓国語文法：',
  '📐 Intermediate · Lesson 7': '📐 中級 · レッスン7',
  '⏱ 60 min read': '⏱ 60分読了',
  '📊 Beginner–Intermediate': '📊 初級〜中級',
  '🔖 Grammar': '🔖 文法',
  '👁 9,412 views': '👁 9,412 回閲覧',
  'Korean Grammar': '韓国語文法',

  // Lesson intro paragraph (split by <strong>)
  'Korean grammar is logical and consistent once you learn the core rules. The biggest shift from English is the': '韓国語の文法は、基本ルールを覚えれば論理的で一貫しています。日本語と共通する点も多いですが、注目すべき点は',
  'word order: Korean is SOV (Subject–Object–Verb)': '語順：韓国語はSOV（主語・目的語・動詞）',
  ', meaning the verb always comes at the end. Particles (조사) attach to nouns to show their grammatical role — no need to memorize rigid word positions!': 'で、動詞は常に文末に来ます。助詞（조사）は名詞に付いて文法的役割を示します。語順を厳密に覚える必要はありません！',

  // Section 1 paragraph (split by <strong>)
  'Unlike English (Subject-Verb-Object), Korean follows': '日本語と同様に、韓国語は',
  'Subject → Object → Verb': '主語 → 目的語 → 動詞',
  'order. The verb (동사) always comes at the END of the sentence.': 'の語順に従います。動詞（동사）は常に文末に来ます。',

  // Section 1 example box
  '📘 English vs Korean Word Order': '📘 日本語と韓国語の語順比較',
  'English (SVO)': '日本語（SOV）',
  'Korean (SOV)': '韓国語（SOV）',
  'Literal Korean': '直訳（韓国語）',
  'I eat rice.': '私はご飯を食べます。',
  'She loves Korea.': '彼女は韓国を愛しています。',
  'They study Korean.': '彼らは韓国語を勉強します。',
  'I go to Seoul.': '私はソウルに行きます。',
  'I (topic) rice (object) eat.': '私（主題）ご飯（目的）食べる。',
  'She (topic) Korea (object) loves.': '彼女（主題）韓国（目的）愛する。',
  'They (topic) Korean (object) study.': '彼ら（主題）韓国語（目的）勉強する。',
  'I (topic) Seoul (to) go.': '私（主題）ソウル（方向）行く。',

  // Section 1 tip (split by <strong>)
  'In Korean,': '韓国語では、',
  'the verb always comes last': '動詞は常に最後に来ます',
  '. If someone starts speaking and you hear the word 먹어요 (eat) at the end, you know eating is the action! This lets Korean speakers be flexible with other word positions.': '。誰かが話し始めて最後に먹어요（食べる）という単語が来れば、食べることが動作だとわかります！これにより、韓国語話者は他の語の位置を柔軟に変えられます。',

  // Section 2 intro paragraph
  'Particles are suffixes attached to nouns that indicate grammatical function. They are the backbone of Korean sentence structure — once you master particles, grammar becomes much clearer!': '助詞は名詞に付いて文法的機能を示す接尾語です。韓国語の文構造の根幹であり、助詞をマスターすれば文法がずっとわかりやすくなります！',

  // Section 2 example box headers
  '🔗 Essential Korean Particles': '🔗 必須の韓国語助詞',
  '💬 Example Sentences with Particles': '💬 助詞を使った例文',

  // Section 2 particle table cells
  'I am a student (topic)': '私は学生です（主題）',
  'Rain is coming (rain = subject)': '雨が降っています（雨＝主語）',
  'I eat rice (rice = object)': '私はご飯を食べます（ご飯＝目的語）',
  'I go to school': '学校に行きます',
  'I study at school': '学校で勉強します',
  'My friend (friend of me)': '私の友人',
  'Apple and banana': 'りんごとバナナ',
  'I like it too': '私も好きです',
  'I only drink water': '水だけ飲みます',

  // Section 2 eng-lines
  'I am learning Korean. (는=topic, 를=object)': '私は韓国語を勉強しています。（는＝主題、를＝目的語）',
  'My friend is in Seoul. (가=subject, 에=location)': '私の友達はソウルにいます。（가＝主語、에＝場所）',
  'I drink coffee at the café. (에서=action location, 를=object)': 'カフェでコーヒーを飲みます。（에서＝行動場所、를＝目的語）',
  'I also like kimchi. (도=also, 를=object)': '私もキムチが好きです。（도＝も、를＝目的語）',

  // Section 3 heading (was missing)
  'Verb Conjugation (동사 변화)': '動詞の活用（동사 변화）',

  // Section 3 intro paragraph (split by <strong>)
  'Korean verbs always end in': '韓国語の動詞は辞書形で必ず',
  '다 (da)': '다（da）',
  'in their dictionary form. To use them in sentences, replace 다 and add the appropriate ending based on formality level and tense.': 'で終わります。文で使うときは다を取り除き、敬意レベルや時制に応じた語尾を付けます。',

  // Section 3 present tense paragraph (split by <strong>)
  'The most common form is the': '最も一般的な形は',
  'polite present tense': '丁寧な現在形',
  '. Add': 'です。語幹に',
  'after stems with ㅏ or ㅗ vowels, and': 'はㅏまたはㅗ母音の語幹の後に、',
  'for all other vowels.': 'はその他の母音の語幹の後に付けます。',

  // Section 3 past tense paragraph (split by <strong>)
  '(after ㅏ/ㅗ stems) or': '（ㅏ/ㅗ語幹の後）または',
  '(all others) to form past tense.': '（その他すべて）で過去形を作ります。',

  // Section 3 example box headers
  '⏰ Common Verbs Conjugated (Polite Present)': '⏰ よく使う動詞の活用（丁寧な現在形）',
  '📅 Past Tense Examples': '📅 過去形の例',
  '🔮 Future Tense Examples': '🔮 未来形の例',

  // Section 3 table headers
  'English': '日本語',
  'Translation': '訳',
  '"To eat" (먹다)': '「食べる」（먹다）',

  // Section 3 speech level table cells
  'I eat (formal)': '食べます（丁寧・格式体）',
  'I eat (polite)': '食べます（丁寧）',
  'I eat (casual)': '食べます（くだけた）',

  // Section 3 verb conjugation table cells
  'goes/I go': '行く',
  'comes/I come': '来る',
  'eats/I eat': '食べる',
  'drinks/I drink': '飲む',
  'sleeps/I sleep': '寝る',
  'studies/I study': '勉強する',
  'likes/I like': '好きだ',
  'learns/I learn': '学ぶ',
  'sees/I see': '見る',
  'does/I do': 'する',

  // Section 3 eng-lines
  'I ate rice yesterday.': '昨日、ご飯を食べました。',
  'I went to Seoul.': 'ソウルに行きました。',
  'I studied Korean.': '韓国語を勉強しました。',
  'I will go to Korea tomorrow.': '明日、韓国に行きます。',
  'I will learn Korean.': '韓国語を学びます。',

  // Section 4 intro paragraph
  'There are two ways to negate in Korean:': '韓国語の否定には2つの方法があります：',

  // Section 4 example box
  '🚫 Two Ways to Negate': '🚫 否定の2つの方法',

  // Section 4 table headers
  'Method': '方法',
  'Pattern': 'パターン',

  // Section 4 table cells (strong tags)
  'Short negation': '短縮否定',
  'Long negation': '長形否定',
  'Cannot': '不可能',
  'Is not': '〜ではない',

  // Section 4 table cells
  '안 + verb': '안 + 動詞',
  'verb stem + 지 않아요': '動詞語幹 + 지 않아요',
  '못 + verb': '못 + 動詞',
  'noun + 이/가 아니에요': '名詞 + 이/가 아니에요',
  'I don\'t eat': '食べません',
  'I can\'t eat': '食べられません',
  'I\'m not a student': '学生ではありません',

  // Section 5 intro paragraph
  'In Korean, questions are formed simply by changing the intonation (rising) or adding a question mark. The word order does NOT change unlike English!': '韓国語では、イントネーションを上げるか疑問符を付けるだけで疑問文になります。日本語と同様に、語順は変わりません！',

  // Section 5 example boxes
  '❓ Question Formation': '❓ 疑問文の作り方',
  '💬 Question Word Examples': '💬 疑問詞を使った例文',

  // Section 5 eng-line
  'You eat rice. → Do you eat rice? (same words, rising tone)': 'ご飯を食べます。→ ご飯を食べますか？（同じ語、上がり調子）',

  // Section 5 WH card names
  'What': '何',
  'Who': '誰',
  'Where': 'どこ',
  'When': 'いつ',
  'Why': 'なぜ',
  'How': 'どうやって',
  'How much': 'いくら',
  'How many': 'いくつ',

  // Section 5 eng-lines
  'What is your name?': 'お名前は何ですか？',
  'Where are you from?': 'どこから来ましたか？',
  'Why are you learning Korean?': 'なぜ韓国語を勉強しているのですか？',
  'How do I get to the subway station?': '地下鉄の駅にはどうやって行くのですか？',

  // Section 6 example box
  '📋 Must-Know Grammar Patterns': '📋 必須文法パターン',

  // Section 6 table headers
  'Meaning': '意味',

  // Section 6 pattern meanings
  'is/am/are (noun)': '〜です（名詞）',
  'want to ~': '〜したい',
  'Please do ~': '〜してください',
  'can / be able to': '〜できる',
  'must / have to': '〜しなければならない',
  'if / when': 'もし〜なら・〜するとき',
  'because of': '〜のせいで',
  'It seems like / I think': '〜のようだ・〜と思う',

  // Section 6 example cells (text after Korean span)
  '— (I\'m) a student': '—（私は）学生です',
  '— I want to go to Korea': '— 韓国に行きたいです',
  '— Please speak slowly': '— ゆっくり話してください',
  '— I can speak Korean': '— 韓国語を話せます',
  '— I must study': '— 勉強しなければなりません',
  '— If I go to Korea, I eat kimchi': '— 韓国に行ったらキムチを食べます',
  '— Can\'t go because of rain': '— 雨のせいで行けません',
  '— It seems delicious': '— おいしそうです',

  // Section 7 intro paragraph (split by <strong>)
  'Connectors (접속사) are conjunctions placed at the': '接続詞（접속사）は新しい節や文の',
  'beginning of a new clause or sentence': '冒頭に置かれる接続詞',
  'to link ideas together. These four are the most essential for flowing Korean speech.': 'で、アイデアをつなぎます。この4つは韓国語を流暢に話すために最も重要です。',

  // Section 7 example box headers
  '🔗 Four Core Connectors': '🔗 4つの主要な接続詞',
  '💬 Connector Examples in Context': '💬 接続詞の文脈での使用例',

  // Section 7 connector romanization (table cells)
  'geurigo': 'geurigo',
  'geuraeseo': 'geuraeseo',
  'geureochiman': 'geureochiman',
  'geureonde': 'geureonde',

  // Section 7 eng-lines
  'I am learning Korean. And I also study Japanese.': '私は韓国語を学んでいます。そして日本語も勉強しています。',
  'It rained. So I stayed home.': '雨が降りました。だから家にいました。',
  'Korean is difficult. But it is interesting.': '韓国語は難しいです。でも面白いです。',
  'I am hungry. But (the thing is) I have no money.': 'お腹が空いています。でもお金がありません。',

  // Section 7 tip (split by <strong>)
  'is one of the most common words in spoken Korean — it softens contrast and smoothly shifts topics.': 'は韓国語の口語で最もよく使われる単語の一つです。対比を和らげ、話題を自然に転換します。',
  'is stronger and more formal. When in doubt, 그런데 sounds more natural in conversation.': 'はより強く、よりフォーマルです。迷ったときは、그런데の方が会話で自然に聞こえます。',

  // Section 8 intro paragraph (split by <strong>)
  'While 그리고 connects sentences, Korean uses specific particles to say "and/with" between': 'グリゴ（그리고）が文をつなぐ一方、韓国語では',
  'nouns': '名詞',
  '. The two most common casual particles are': '間の「〜と/〜と一緒に」に特定の助詞を使います。最もよく使われるカジュアルな助詞は',

  // Section 8 example box headers
  '➕ Noun Connectors: -하고 vs -(이)랑 vs 와/과': '➕ 名詞接続：-하고 vs -(이)랑 vs 와/과',
  '💬 Using -하고 and -랑 for "and" (listing)': '💬 -하고と-랑の「〜と」（列挙）の使い方',

  // Section 8 table cells
  '이랑 after consonant, 랑 after vowel': '子音の後は이랑、母音の後は랑',
  'Went with a friend': '友人と行きました',
  'Ate with my older brother': 'お兄さんと食べました',
  'Consulted with the teacher': '先生と相談しました',

  // Section 8 eng-lines
  'I bought apples and bananas.': 'りんごとバナナを買いました。',
  'I played with my older sister and my younger brother.': 'お姉さんと弟と一緒に遊びました。',

  // Section 8 tip (split by <strong>)
  'In everyday speech,': '日常会話では、',
  'are interchangeable. Use': 'は互いに換えて使えます。',
  'in formal writing, business emails, and academic Korean. Mixing registers sounds unnatural.': 'はフォーマルな文書、ビジネスメール、学術的な韓国語で使います。レジスターを混ぜると不自然に聞こえます。',

  // Section 9 intro paragraph (split by <em>)
  'When saying you gave something': '何かを人に渡したと言う場合や、人から受け取ったと言う場合に、',
  'a person or received something': '韓国語では特定の助詞を使います。',
  'a person, Korean uses specific particles. These are different from the location particles 에 and 에서.': 'これらは場所の助詞에と에서とは異なります。',

  // Section 9 example box headers
  '📨 Person-Directional Particles': '📨 人を指す方向の助詞',
  '💬 -한테 and -한테서 in Sentences': '💬 -한테と-한테서の例文',

  // Section 9 eng-lines
  'I called my friend. (to my friend)': '友達に電話しました。',
  'I learned Korean from my teacher.': '先生から韓国語を学びました。',
  'I gave a gift to my younger sibling.': '弟・妹にプレゼントをあげました。',
  'Don\'t take your eyes off the puppy. (from the puppy)': '子犬から目を離さないでください。',

  // Section 9 info-box tip (split by <strong>)
  'Honorific form for "to a person" is': '「人に」の敬語形は',
  '(e.g., 선생님께 드렸어요 — I gave it to the teacher). Use 께 when speaking respectfully about elders or superiors.': '（例：선생님께 드렸어요 — 先生に差し上げました）。目上の人や上司に丁寧に話すときに께を使います。',

  // Section 10 intro paragraph (split by <strong> and <em>)
  'Korean uses a': '韓国語では',
  'mix of two number systems': '2種類の数詞を混在して',
  'for time:': '時刻に使います：',
  'Sino-Korean': '漢数字',
  'numbers for minutes (분) and': '系数字を分（분）に、',
  'Native Korean': '固有語',
  'numbers for hours (시). Mastering this distinction is essential!': '系数字を時（시）に使います。この区別をマスターすることが重要です！',

  // Section 10 example box headers
  '🕐 Hours: Native Korean Numbers + 시': '🕐 時間：固有語数字 + 시',
  '💬 Time Expressions in Use': '💬 時間表現の使い方',

  // Section 10 eng-lines
  'What time is it now?': '今、何時ですか？',
  'It is half past three. (3:30)': '3時半です。',
  'Let\'s meet at 10:50 AM.': '午前10時50分に会いましょう。',
  'Class starts at 2:00 PM.': '午後2時に授業が始まります。',

  // Section 10 tip (split by <strong>)
  'Hours use': '時には',
  'Native Korean numbers': '固有語数字',
  '(한, 두, 세...) + 시. Minutes use': '（한、두、세…）＋시を使います。分には',
  'Sino-Korean numbers': '漢数字系数字',
  '(일, 이, 삼...) + 분. Half past is': '（일、이、삼…）＋분を使います。半は',
  '. AM =': 'です。午前は',
  ', PM =': '、午後は',
  '.': '。',

  // Section 11 intro paragraph (split by <strong>)
  'Korean uses': '韓国語では',
  'specific counting words': '特定の数詞（助数詞）',
  '(counters or classifiers) depending on what is being counted. The counter follows the number, and': '（数えるものによって異なる）を使います。助数詞は数の後に続き、ほとんどの助数詞には',
  'are used with most counters.': 'が使われます。',

  // Section 11 example box header
  '🔢 Essential Korean Counters': '🔢 必須の韓国語助数詞',

  // Section 11 counter translations
  'Three apples': 'りんご3つ',
  'Five students': '学生5人',
  'Two guests': 'お客様2名',
  'One cat': '猫1匹',
  'Three books': '本3冊',
  'Two sheets of paper': '紙2枚',
  'Two cups of coffee': 'コーヒー2杯',
  'One bottle of water': '水1本',
  'Saw it three times': '3回見ました',
  '25 years old': '25歳',
  'Third floor': '3階',
  'Two cars': '車2台',

  // Section 11 tip (split by <strong>)
  'In Korean, counters follow the noun:': '韓国語では助数詞は名詞の後に来ます：',
  '[Noun] + [Number] + [Counter]': '【名詞】＋【数】＋【助数詞】',
  '. Example: 사과 세 개 (apple three pieces). The number 1–4 has special native forms: 하나→한, 둘→두, 셋→세, 넷→네 before a counter.': '。例：사과 세 개（りんご3つ）。1〜4には助数詞の前で특별한 형태가 있습니다：하나→한、둘→두、셋→세、넷→네。',

  // Section 12 intro paragraph (split by <em> and <strong>)
  'To say someone': '誰かが今',
  'is currently doing': '〜している',
  'something, attach': 'と言うとき、動詞語幹に',
  'to the verb stem. This is equivalent to the English "-ing" continuous form.': 'を付けます。日本語の「〜ている」形に相当します。',

  // Section 12 example box headers
  '▶️ -고 있어요 Conjugation Table': '▶️ -고 있어요の活用表',
  '💬 Progressive in Sentences': '💬 進行形の例文',

  // Section 12 table header
  'Present Progressive': '現在進行形',

  // Section 12 conjugation translations
  'is eating': '食べています',
  'is going': '行っています',
  'is sleeping': '寝ています',
  'is studying': '勉強しています',
  'is reading': '読んでいます',
  'is working': '働いています',

  // Section 12 eng-lines
  'I am eating right now.': '今、食べています。',
  'My friend is on the phone.': '友達が電話しています。',
  'At this time yesterday, I was sleeping. (past progressive)': '昨日この時間、寝ていました。（過去進行形）',

  // Section 12 tip (split by <strong>)
  '= I eat (general habit or right now, context-dependent).': '＝食べます（一般的な習慣または今、文脈による）。',
  '= I am eating (specifically in progress at this moment). The progressive is more precise for ongoing actions.': '＝食べています（この瞬間に進行中）。進行形は継続中の動作をより正確に表します。',

  // Section 13 heading
  'Self Introduction (자기소개)': '自己紹介（자기소개）',

  // Section 13 intro paragraph
  'Knowing how to introduce yourself is one of the most practical Korean skills. Here is the vocabulary you need and a complete template to follow.': '自己紹介の仕方を知っていることは、最も実用的な韓国語スキルの一つです。必要な語彙と完全なテンプレートを紹介します。',

  // Section 13 example box headers
  '👋 Self-Introduction Vocabulary': '👋 自己紹介の語彙',
  '💬 Sample Self Introduction': '💬 自己紹介の例文',

  // Section 13 vocabulary table cells
  'Name': '名前',
  'Age': '年齢',
  'Country': '国',
  'Job / Occupation': '職業',
  'Hobby': '趣味',
  'Major (in school)': '専攻',
  'Hometown': '出身地',

  // Section 13 eng-lines
  'Hello! My name is Jimin. (이름 — name)': 'こんにちは！私はジミンです。（이름 — 名前）',
  'I am 25 years old. (나이 — age)': '私は25歳です。（나이 — 年齢）',
  'I am from America. (나라 — country)': '私はアメリカから来ました。（나라 — 国）',
  'I am a student. I am studying Korean. (직업 — job)': '私は学生です。韓国語を勉強しています。（직업 — 職業）',
  'My hobby is listening to K-Pop. Nice to meet you! (취미 — hobby)': '私の趣味はK-POPを聴くことです。よろしくお願いします！（취미 — 趣味）',

  // Section 13 tip (split by <strong>)
  'in formal or semi-formal settings (meeting adults, first encounters). With friends or peers:': 'はフォーマルまたは半フォーマルな場（大人に会うとき、初対面）で使います。友人や同年代の人には：',
  '. Always bow slightly when introducing yourself in person.': '。対面で自己紹介するときは、軽くお辞儀をしましょう。',

  // Section 14 heading
  'Dates and Months (날짜)': '日付と月（날짜）',

  // Section 14 intro paragraph (split by <strong>)
  'Korean dates use': '韓国語の日付は全体を通じて',
  'throughout — for years (년), months (월), and days (일). The order is:': 'を使います — 年（년）・月（월）・日（일）すべてに。順序は：',
  'Year → Month → Day': '年 → 月 → 日',

  // Section 14 example box headers
  '📅 All 12 Months': '📅 12か月すべて',
  '💬 Reading Dates': '💬 日付の読み方',

  // Section 14 table header
  'Month': '月',

  // Section 14 month names
  'January': '1月',
  'February': '2月',
  'March': '3月',
  'April': '4月',
  'May': '5月',
  'June': '6月',
  'July': '7月',
  'August': '8月',
  'September': '9月',
  'October': '10月',
  'November': '11月',
  'December': '12月',

  // Section 14 eng-lines
  'Today is May 11th, 2026. (2026년 5월 11일)': '今日は2026年5月11日です。',
  'What is today\'s date?': '今日は何日ですか？',
  'My birthday is March 25th.': '私の誕生日は3月25日です。',

  // Section 14 info-box tip (split by <strong>)
  'June (6월) is pronounced': '6月（6월）の発音は',
  'not 육월, and October (10월) is': '（육월ではありません）。10月（10월）は',
  'not 십월 — these are historical exceptions that dropped a consonant for easier pronunciation.': '（십월ではありません）。これらは発音しやすくするため子音が脱落した歴史的な例外です。',

  // Section 15 heading
  'Degree Adverbs (정도 부사)': '程度の副詞（정도 부사）',

  // Section 15 intro paragraph (split by <em>)
  'Degree adverbs modify adjectives and verbs to express': '程度の副詞は形容詞や動詞を修飾して',
  'how much': 'どの程度か',
  '. They are placed directly before the word they modify.': 'を表します。修飾する語の直前に置きます。',

  // Section 15 example box header
  '💯 Essential Degree Adverbs': '💯 必須の程度副詞',

  // Section 15 table header
  'Example Sentence': '例文',

  // Section 15 adverb meanings
  'A little / slightly': '少し',
  'A little (softer/casual)': '少し（より穏やか・カジュアル）',
  'Really / truly': '本当に',
  'Really / genuinely (casual)': 'マジで・本当に（カジュアル）',
  'Very': 'とても',
  'A lot / much': 'たくさん',
  'Not really (+ negative verb)': 'あまり〜ない（否定動詞と使用）',
  'Not at all (+ negative verb)': '全然〜ない（否定動詞と使用）',

  // Section 15 example sentences (text after Korean span)
  '— It\'s a little spicy': '— 少し辛いです',
  '— Please help me a bit': '— 少し手伝ってください',
  '— It\'s really delicious': '— 本当においしいです',
  '— That\'s genuinely cool': '— マジでかっこいい',
  '— Very good': '— とても良いです',
  '— I ate a lot': '— たくさん食べました',
  '— I don\'t really like it': '— あまり好きじゃないです',
  '— I have no idea at all': '— 全然わかりません',

  // Section 15 tip (split by <strong> and <em>)
  'must always be used with a': 'は',
  'negative': '否定',
  'verb form (안, 못, 없다, 모르다, etc.). Saying 별로 좋아요 (without negation) sounds ungrammatical. Think of them like "not really" and "not at all" — they need the negation to be complete.': '動詞形（안、못、없다、모르다など）と共に使わなければなりません。별로 좋아요（否定なし）は非文法的です。「あまり〜ない」「全然〜ない」のように、否定が必要です。',

  // Section 16 heading
  'Making Verbs Into Nouns: -는 것': '動詞を名詞にする：-는 것',

  // Section 16 intro paragraph (split by <strong> and <em>)
  'Adding': '動詞語幹に',
  'to a verb stem turns the verb into a noun phrase — the act of doing something. This is called': 'を付けると動詞が名詞句になります — 何かをするという行為。これを',
  'nominalization': '名詞化',
  'and is extremely common in Korean.': 'と言い、韓国語で非常によく使われます。',

  // Section 16 example box headers
  '🔤 Nominalization Tense Forms': '🔤 名詞化の時制形',
  '💬 Nominalization in Sentences': '💬 名詞化の例文',

  // Section 16 table header
  'Tense': '時制',

  // Section 16 tense table cells
  'Present / Habitual': '現在・習慣',
  'the act of eating': '食べること',
  'Past': '過去',
  'the thing (that was) eaten': '食べられたもの',
  'Future / Planned': '未来・予定',
  'the thing to eat / will eat': '食べるもの・食べる予定のもの',

  // Section 16 eng-lines
  'Learning Korean is interesting.': '韓国語を学ぶことは面白いです。',
  'I like cooking. (the act of cooking)': '料理することが好きです。',
  'Are you listening to what I am saying?': '私が言っていることを聞いていますか？',

  // Section 16 tip (split by <strong>)
  'is shortened to': 'は日常会話では',
  'in casual speech. So 먹는 것이에요 →': 'に短縮されます。つまり먹는 것이에요 →',
  '. You will hear 거 far more often in everyday conversation.': '。日常会話では거の方がずっとよく聞かれます。',

  // Section 17 heading
  'More … Than …: -보다 더': '〜より〜：-보다 더',

  // Section 17 intro paragraph (split by <strong>)
  'To compare two things in Korean, use the structure:': '韓国語で2つのものを比較するには、この構造を使います：',
  '[A]가/이 [B]보다 더 [adjective]': '【A】가/이 【B】보다 더 【形容詞】',
  '— meaning "A is more [adjective] than B."': '— 意味：「AはBより〜だ」',

  // Section 17 example box header
  '⚖️ Comparative Sentences': '⚖️ 比較文',

  // Section 17 eng-lines
  'Korean is more difficult than English.': '韓国語は日本語より難しいです。',
  'This bag is more expensive than that bag.': 'このバッグはあのバッグより高いです。',
  'Today is hotter than yesterday.': '今日は昨日より暑いです。',
  'Seoul is bigger than Busan.': 'ソウルは釜山より大きいです。',

  // Section 17 tip (split by <strong>)
  'For "the most" (superlative), use': '「最も〜」（最上級）を表すには、',
  'before the adjective: 제일 맛있어요 (It\'s the most delicious).': 'を形容詞の前に使います：제일 맛있어요（最もおいしいです）。',
  'in comparatives is often optional but makes the comparison explicit and natural-sounding.': 'は比較文では省略可能ですが、使うと比較を明確にし、より自然に聞こえます。',

  // Section 18 heading
  'To Like: 좋다 vs 좋아하다': '好き：좋다 vs 좋아하다',

  // Section 18 intro paragraph (split by <strong> and <em>)
  'Two words that learners often confuse:': '学習者がよく混同する2つの単語：',
  '(to be good / feel good) is an': '（良い・気持ちが良い）は',
  'adjective': '形容詞',
  ', while': '、一方で',
  '(to like) is a': '（好きだ）は',
  'verb': '動詞',
  '. They take different particles!': 'です。それぞれ異なる助詞を使います！',

  // Section 18 example box header
  '❤️ 좋다 vs 좋아하다 — Key Contrast': '❤️ 좋다 vs 좋아하다 — 重要な違い',

  // Section 18 table headers
  'Word': '単語',
  'Type': '品詞',
  'Particle Used': '使う助詞',

  // Section 18 table cells
  'Adjective (to be good)': '形容詞（良い）',
  'Subject: 이/가': '主語：이/가',
  'Korea is good / I feel good about Korea': '韓国が良い・韓国についていい気分',
  'Verb (to like)': '動詞（好きだ）',
  'Object: 을/를': '目的語：을/를',
  'I like Korea': '韓国が好きです',
  'Adjective (to feel bad/averse)': '形容詞（嫌な気持ち）',
  'I don\'t like this food / feel averse to it': 'この食べ物が嫌い・嫌な気持ちがする',
  'Verb (to dislike)': '動詞（嫌いだ）',
  'I dislike this food': 'この食べ物が嫌いです',

  // Section 18 example box header 2
  '💬 More Examples': '💬 さらなる例文',

  // Section 18 eng-lines
  'The weather is nice! (adjective — weather = subject)': '天気が良いです！（形容詞 — 天気が主語）',
  'I like K-Pop. (verb — K-Pop = object)': 'K-POPが好きです。（動詞 — K-POPが目的語）',

  // Section 18 tip (split by <strong>)
  'If you can replace "like" with "is good," use': '「好き」を「良い」に置き換えられる場合は',
  'with 이/가. If it\'s truly "I like [something]," use': 'を이/가と使います。本当に「〜が好き」なら',
  'with 을/를. Both are correct Korean — the nuance is subtle but important for accuracy.': 'を을/를と使います。どちらも正しい韓国語ですが、ニュアンスの違いは微妙でも正確さに重要です。',

  // Section 19 heading
  'Still, Already: 아직, 벌써': 'まだ・もう：아직・벌써',

  // Section 19 intro paragraph
  'These two time adverbs are essential for expressing whether something has happened yet or is still ongoing.': 'この2つの時間副詞は、何かがまだ起きていないか、まだ続いているかを表すのに必須です。',

  // Section 19 example box header
  '⏳ 아직 and 벌써 in Context': '⏳ 아직と벌써の使い方',

  // Section 19 eng-lines
  'I am still eating. (아직 + positive = still ongoing)': 'まだ食べています。（아직 + 肯定 = まだ進行中）',
  'I haven\'t eaten yet. (아직 + negative = not yet)': 'まだ食べていません。（아직 + 否定 = まだ〜ない）',
  'You\'re already here? (벌써 = already, with surprise)': 'もう来たんですか？（벌써 = もう、驚きを伴う）',
  'You\'ve already eaten everything! (expressing surprise)': 'もう全部食べたんですか！（驚きを表す）',

  // Section 19 tip (split by <strong>)
  'carries a sense of surprise ("already?!").': 'は驚きのニュアンスを含みます（「もう？！」）。',
  'also means "already" but is more neutral and matter-of-fact: 이미 알고 있어요 (I already know — stated plainly). Use 벌써 when something happened sooner than expected.': 'も「すでに」を意味しますが、より中立的・事実的です：이미 알고 있어요（もう知っています — 淡々と）。予想より早く何かが起きたときは벌써を使います。',

  // Section 20 heading
  'Someone, Something, Somewhere: 누군가, 무언가, 어딘가, 언젠가': '誰か・何か・どこか：누군가・무언가・어딘가・언젠가',

  // Section 20 intro paragraph
  'Korean has specific words for indefinite references (someone, something, somewhere) and their negative counterparts used with negative verbs.': '韓国語には不定的な表現（誰か、何か、どこか）とその否定形（否定動詞と共に使う）に相当する言葉があります。',

  // Section 20 example box header
  '❓ Indefinite Pronouns': '❓ 不定代名詞',

  // Section 20 meaning cells
  'Someone': '誰か',
  'Something': '何か',
  'Somewhere': 'どこか',
  'Someday / sometime': 'いつか',
  'Nobody (+ negative verb)': '誰も〜ない（否定動詞と使用）',
  'Nothing (+ negative verb)': '何も〜ない（否定動詞と使用）',
  'Nowhere (+ negative verb)': 'どこも〜ない（否定動詞と使用）',

  // Section 20 example cells (text after Korean span)
  '— Someone came': '— 誰かが来ました',
  '— Something is strange': '— 何かおかしい',
  '— I want to go somewhere': '— どこかに行きたい',
  '— Let\'s meet someday': '— いつか会いましょう',
  '— Nobody is here': '— 誰もいません',
  '— I ate nothing': '— 何も食べませんでした',
  '— I went nowhere': '— どこにも行きませんでした',

  // Section 20 tip (split by <em>)
  'pattern (아무도, 아무것도, 아무데도)': 'のパターン（아무도・아무것도・아무데도）は',
  'always': '必ず',
  'requires a negative verb to follow. Think of it as the Korean equivalent of "nobody," "nothing," "nowhere" — the negation is built into the meaning but the verb must also be negative.': '否定動詞が続きます。「誰も〜ない」「何も〜ない」「どこも〜ない」に相当しますが、意味に否定が含まれていても動詞も否定にする必要があります。',

  // Section 21 heading
  'Imperative: -(으)세요': '命令形：-(으)세요',

  // Section 21 intro paragraph (split by <strong>)
  'To make a': '動詞語幹に',
  'polite request or command': '丁寧な依頼や命令',
  '("Please do..."), attach': '（「〜してください」）を作るには、',
  'to the verb stem. This is the standard polite imperative used with adults and in public situations.': 'を動詞語幹に付けます。これは大人や公共の場で使う標準的な丁寧命令形です。',

  // Section 21 example box headers
  '📢 -(으)세요 Conjugation Table': '📢 -(으)세요の活用表',
  '💬 Fixed Imperative Phrases': '💬 決まり文句の命令形',

  // Section 21 table header
  'Imperative': '命令形',

  // Section 21 conjugation table cells
  'vowel stem → 세요': '母音語幹 → 세요',
  'Please come': '来てください',
  'consonant stem → 으세요': '子音語幹 → 으세요',
  'Please sit': '座ってください',
  'honorific for 먹다': '먹다の敬語形',
  'Please eat (honorific)': '召し上がってください',
  'Please look / watch': '見てください',
  'Please wait': '待ってください',
  'Please speak': '話してください',

  // Section 21 eng-lines
  'Goodbye. (said to someone who is leaving — "Please go in peace")': 'さようなら。（去る人に言う — 「安らかにお行きください」）',
  'Goodbye. (said by the person leaving — "Please stay in peace")': 'さようなら。（去る側が言う — 「安らかにお過ごしください」）',
  'Please speak slowly.': 'ゆっくり話してください。',

  // Section 21 tip (split by <strong>)
  'is the standard polite imperative — use it with strangers, older people, and in public. It is slightly softer than a direct command. Adding': 'は標準的な丁寧命令形です — 見知らぬ人、年上の人、公共の場で使います。直接的な命令よりやや柔らかい。',
  '(please give/do for me) makes requests even more polite: 말해 주세요 (please speak for me).': '（〜してください）を付けるとさらに丁寧になります：말해 주세요（話してください）。',

  // Section 22 heading
  'Don\'t Do It: -지 마세요': '〜しないでください：-지 마세요',

  // Section 22 intro paragraph (split by <em>)
  'To tell someone politely': '人に丁寧に',
  'to do something, use': 'ないよう伝えるには、',
  '. This pattern works with any verb.': '。このパターンはあらゆる動詞に使えます。',

  // Section 22 example box header
  '🚫 -지 마세요 in Use': '🚫 -지 마세요の使い方',

  // Section 22 eng-lines
  'Please don\'t worry.': '心配しないでください。',
  'Please don\'t be late.': '遅れないでください。',
  'Please don\'t smoke here.': 'ここでタバコを吸わないでください。',
  'Please don\'t run.': '走らないでください。',
  'Please don\'t forget!': '忘れないでください！',

  // Section 22 tip (split by <strong>)
  'The casual version of -지 마세요 is simply': '-지 마세요のカジュアルな形は単に',
  '(jima). Use this with close friends or younger people: 걱정하지 마! (Don\'t worry!). On signs and public notices, you may also see': '（지마）です。親しい友人や年下の人に使います：걱정하지 마!（心配しないで！）。掲示物や公告では',
  '(very formal written command).': '（非常にフォーマルな書き言葉の命令形）も見られます。',

  // Section 23 heading
  'Method, Way, Direction: -(으)로': '方法・手段・方向：-(으)로',

  // Section 23 intro paragraph (split by <strong>)
  'The particle': '助詞',
  'is versatile: it marks direction toward somewhere, the means or method of doing something, and the material something is made of.': 'は多目的です：方向・手段・方法・材料を表します。',

  // Section 23 example box header
  '🛤️ Three Uses of -(으)로': '🛤️ -(으)로の3つの使い方',

  // Section 23 table headers
  'Use': '用法',
  'Korean Example': '韓国語の例',

  // Section 23 table cells (strong)
  '1. Direction': '1. 方向',
  '2. Means / Method': '2. 手段・方法',
  '2. Method cont.': '2. 方法（続き）',
  '3. Material': '3. 材料',

  // Section 23 table cells
  'toward / in the direction of': '〜の方向に・〜へ',
  'Going toward Seoul': 'ソウルに向かいます',
  'by / using / in (language)': '〜で（手段）・〜語で',
  'Going by bus': 'バスで行きます',
  'in (a language)': '〜語で',
  'Speaking in Korean': '韓国語で話します',
  'with (a tool)': '〜を使って',
  'Eating with chopsticks': '箸で食べます',
  'made of / from': '〜で作られた',
  'Made of wood': '木で作られています',

  // Section 23 tip (split by <strong>)
  'after a vowel or the consonant ㄹ (e.g., 서울': 'は母音またはㄹの後に使います（例：서울',
  '). Use': '）。',
  'after other consonants (e.g., 젓가락': 'は他の子音の後に使います（例：젓가락',
  '— note 나무 ends in vowel so just 로). The exception is ㄹ which takes 로 not 으로 even though it is a consonant.': '— 나무は母音で終わるので로のみ）。例外はㄹで、子音ですが으로ではなく로を使います。',

  // Section 24 heading
  'To be Good/Poor at: 잘하다, 못하다': '得意・苦手：잘하다・못하다',

  // Section 24 intro paragraph (split by <strong>)
  'to say someone does something well, and': 'で人が上手にできると言い、',
  'to say they do it poorly or cannot do it.': 'で下手またはできないと言います。',

  // Section 24 example box headers
  '🎯 Ability Expressions': '🎯 能力の表現',
  '💬 Examples in Sentences': '💬 文中の例',

  // Section 24 table cells
  'To do well / be good at': '上手にする・得意だ',
  'To be unable to / do poorly': 'できない・苦手だ',
  'To not be good at': 'あまり得意ではない',
  'To do [verb] well': '上手に〜する',
  '— I am good at Korean': '— 韓国語が得意です',
  '— I can\'t swim / am bad at swimming': '— 泳げません・水泳が苦手です',
  '— I\'m not good at singing': '— 歌があまり上手ではありません',
  '— Sleep well': '— よく眠れます',

  // Section 24 eng-lines
  'That player is really good at soccer.': 'あの選手はサッカーが本当に上手いです。',
  'I\'m not very good at cooking.': '私は料理があまり上手ではありません。',

  // Section 24 tip (split by <strong>)
  '+ verb = inability (physically or circumstantially can\'t): 못 먹어요 (can\'t eat — allergic, sick, etc.).': '＋動詞 ＝ 不可能（身体的・状況的にできない）：못 먹어요（食べられません — アレルギー、病気など）。',
  '+ verb = choice not to: 안 먹어요 (not eating — by choice). Confusing these changes meaning significantly!': '＋動詞 ＝ しない選択：안 먹어요（食べません — 自分の意志）。混同すると意味が大きく変わります！',

  // Section 25 heading
  'All, More: 다, 더': 'すべて・もっと：다・더',

  // Section 25 intro paragraph (split by <strong>)
  'means "all" or "entirely" (completion), while': 'は「すべて」または「全部」（完了）を意味し、',
  'means "more" (addition). Both are simple but extremely frequent in everyday Korean.': 'は「もっと」（追加）を意味します。どちらもシンプルですが、日常の韓国語で非常によく使われます。',

  // Section 25 example box header
  '📦 다 and 더 in Use': '📦 다と더の使い方',

  // Section 25 eng-lines
  'I ate it all. / I finished eating. (다 = entirely done)': '全部食べました。（다 ＝ 完了）',
  'I say it all in Korean. (다 = everything)': '全部韓国語で言います。（다 ＝ すべて）',
  'Please give me more.': 'もっとください。',
  'I don\'t do it anymore. (더 이상 = no more / no longer)': 'もうしません。（더 이상 ＝ これ以上）',
  'All done! / It\'s ready! (very common expression)': '全部できました！（非常によく使う表現）',

  // Section 25 tip (split by <strong> and <em>)
  'emphasizes': 'は',
  'completion': '完了',
  'or entirety of an action: 다 먹었어요 (ate it all).': 'または動作の全体性を強調します：다 먹었어요（全部食べました）。',
  'means "all" for countable items or people: 모두 왔어요 (everyone came). In casual speech, 다 is used for both, but 모두 is more precise for groups of people.': 'は数えられるものや人に対して「すべて」を意味します：모두 왔어요（全員来ました）。日常会話ではどちらにも다を使いますが、人のグループにはモドゥの方が正確です。',

  // Section 26 heading
  'Also, Too: -도 (Advanced Uses)': '〜も（上級の使い方）：-도',

  // Section 26 intro paragraph (split by <strong>)
  'Beyond the basic "also/too" meaning covered in Section 2, the particle': 'セクション2で扱った基本的な「〜も」の意味を超えて、助詞',
  'has several advanced uses that give your Korean a more natural, native-like feel.': 'にはいくつかの上級用法があり、韓国語をより自然でネイティブらしく聞こえさせます。',

  // Section 26 example box headers
  '✳️ Four Advanced Uses of -도': '✳️ -도の4つの上級用法',
  '💬 Advanced -도 Examples': '💬 -도の上級用法の例文',

  // Section 26 table cells (strong)
  '1. Even': '1. 〜でさえ',
  '2. Both…and': '2. 〜も〜も',
  '3. Not even': '3. 〜さえない',
  '4. Also/Sometimes': '4. 〜もする・時々する',

  // Section 26 table cells
  'Emphasizes inclusion of unexpected subject': '予期しない主語の含意を強調',
  'Even children know (it)': '子供でも知っています',
  '-기도 하고 -기도 하다': '-기도 하고 -기도 하다',
  'It\'s both good and bad': '良くもあり悪くもあります',
  'Emphatic negation with quantity': '量を伴う強調否定',
  'There isn\'t even one': '一つもありません',
  'verb + 기도 하다 = also does / sometimes does': '動詞 + 기도 하다 ＝ 〜もする・時々する',
  'I also eat it / I sometimes eat it': '私も食べます・時々食べます',

  // Section 26 eng-lines
  'Even the teacher doesn\'t know.': '先生でも知りません。',
  'Korean is both difficult and interesting.': '韓国語は難しくもあり面白くもあります。',
  'I don\'t have even a single (penny).': '一銭もありません。',
  'I sometimes also watch Korean dramas.': '時々韓国ドラマも見ます。',

  // Section 26 info-box tip (split by <strong> and <em>)
  'Common Learner Errors': 'よくある学習者のミス',
  'A common mistake is using -도 with a positive verb when a negative is needed:': 'よくあるミスは、否定が必要なのに-도を肯定動詞と使うことです：',
  '(correct) vs. 하나도 있어요 (ungrammatical for "not even one"). Also, remember -도': '（正しい）vs. 하나도 있어요（「一つもない」は非文法的）。また、-도は',
  'replaces': '置き換える',
  '은/는 and 이/가 — never stack them: say 저도 (not 저는도 or 저가도).': '은/는と이/가を置き換えます — 重ねてはいけません：저도（저는도や저가도ではない）。',

  // Complete button
  '✓ Mark Grammar Lesson Complete': '✓ 文法レッスン完了にする',

  // Nav footer
  'Vocabulary Builder': '語彙ビルダー',

  // ── Common lesson-nav labels ─────────────────────────────
  'Previous': '前のレッスン',
  'Next': '次のレッスン',
  'English': '日本語',

  // ── speech-levels page ───────────────────────────────────
  '🗣️ Intermediate · Lesson 8': '🗣️ 中級 · レッスン 8',
  'Formal vs Informal Korean:': 'フォーマル vs インフォーマル韓国語：',
  '⏱ 40 min read': '⏱ 40分読了',
  '🔖 Speech Levels': '🔖 敬語レベル',

  'One of the most important — and uniquely Korean — aspects of the language is its': '言語の中で最も重要で、韓国語に独特な側面のひとつが',
  'grammaticalized politeness system': '文法化された丁寧さのシステム',
  '. Unlike English, where politeness is mostly about vocabulary choice ("Can you help me?" vs "Help me!"), Korean encodes social relationships directly into verb endings. Knowing': 'です。日本語と同様に、韓国語も社会的関係を動詞の語尾に直接反映します。ただし韓国語の丁寧さシステムは日本語の敬語（尊敬語・謙譲語・丁寧語）より比較的シンプルです。',
  'when': 'いつ',
  'to use each speech level is just as critical as knowing': '使うかを知ることは同様に重要です。',
  'how': 'どのように',

  '📊 Intermediate': '📊 中級',
  'The 6 Korean Speech Levels — Overview': '6つの韓国語敬語レベル — 概要',
  'Why Korean Has Speech Levels (왜 존댓말이 필요한가)': '韓国語に敬語レベルがある理由（왜 존댓말이 필요한가）',
  'Korean society places great importance on hierarchy, age, and social relationships. These values are reflected directly in the language — the verb endings you choose signal whether you respect someone, see them as a peer, or hold authority over them. Using the wrong speech level is not merely awkward; it can be genuinely offensive. A learner who speaks 반말 (casual speech) to a new Korean acquaintance older than them will immediately be seen as rude, regardless of intent.': '韓国社会は序列・年齢・社会的な人間関係を非常に重視します。この価値観は言語に直接反映され、選ぶ動詞語尾によって相手への敬意・対等な立場・または権威関係を示します。誤った敬語レベルを使うことは単に不自然なだけでなく、本当に失礼にあたります。自分より年上の新しい韓国人の知人に反말を使う学習者は、意図に関わらず即座に無礼と見なされます。',
  'This system is called': 'このシステムは',
  '— the honorific speech system. Korean linguists traditionally recognize six speech levels, though in modern everyday speech, three dominate: 합쇼체, 해요체, and 해체.': '— 敬語システムと呼ばれます。韓国の言語学者は伝統的に6つの敬語レベルを認識しますが、現代の日常会話では3つが主流です：합쇼체、해요체、해체。',

  'Level Name': 'レベル名',
  'Also Called': '別名',
  'When Used': '使用場面',
  '합니다체 / Formal Polite': '합니다体 / フォーマル丁寧',
  'Informal Polite': 'インフォーマル丁寧',
  'Daily default for most situations — strangers, coworkers, elders you know, service industry': 'ほとんどの場面での日常語 — 初対面・同僚・知り合いの年配者・サービス業',
  '반말 / Casual': '반말 / カジュアル',
  'Very close friends of same age, adults speaking to young children, older to younger in close relationship': '同い年の親しい友人・大人が幼い子どもに・親密な年上から年下',
  'Plain / Literary': '平叙 / 文語',
  'Middle Formal': '中程度のフォーマル',
  'Elderly speaking to a younger adult — relatively rare in modern speech': '年配者が若い成人に話すとき — 現代語ではまれ',
  'Archaic': '古語',
  'Rarely used today — occasionally in historical dramas or formal documents': '今日ではほぼ使われない — 時代劇や公文書に時折登場',

  'Learner Focus': '学習者へのアドバイス',
  'As a learner, focus on mastering': '学習者として、まず',
  'first (your everyday default), then': 'をマスターすることに集中しましょう（日常の基本）、次に',
  '(for formal settings), and finally': '（フォーマルな場面）、そして最後に',
  '(only when a Korean friend invites you to use it). The remaining three levels appear mainly in literature and historical contexts.': '（韓国人の友人が誘ったときだけ）の順に習得しましょう。残り3つのレベルは主に文学と歴史的文脈に登場します。',

  'Formal Polite — 합쇼체 (합니다체)': 'フォーマル丁寧 — 합쇼체（합니다体）',
  'Key endings:': '主要な語尾：',
  '— statement (declarative)': '— 平叙文（陳述）',
  '— question (interrogative)': '— 疑問文',
  '— polite command / request': '— 丁寧な命令・依頼',
  'The rule: if the verb stem ends in a consonant, use': 'ルール：動詞語幹が子音で終わる場合は',
  '; if it ends in a vowel or': 'を使い、母音または',
  ', use': 'で終わる場合は',
  '(and drop the ㄹ first).': 'を使います（先にㄹを削除）。',
  '합쇼체 (Statement)': '합쇼체（陳述文）',
  '합쇼체 (Question)': '합쇼체（疑問文）',
  'to go': '行く',
  'to come': '来る',
  'to eat': '食べる',
  'to drink': '飲む',
  'to study': '勉強する',
  'to exist / to have': 'ある / 持っている',
  'to not exist / to not have': 'ない / 持っていない',
  'to be (copula)': '〜である（コピュラ）',
  'to see / to watch': '見る / 観る',
  'to rest': '休む',
  'to sleep': '眠る',
  'to like': '好む',
  'to do': 'する',
  'go': '行く',
  'come': '来る',
  'eat': '食べる',
  'drink': '飲む',
  'do': 'する',
  'see / watch': '見る / 観る',
  'sleep': '眠る',
  'like': '好む',
  'study': '勉強する',
  '🎙️ 합쇼체 — Formal Sentences': '🎙️ 합쇼체 — フォーマルな文',
  'When to Use 합쇼체': '합쇼체を使う場面',

  'Informal Polite — 해요체': 'インフォーマル丁寧 — 해요체',
  '해요체 is the everyday workhorse of Korean politeness. It is polite enough to use with strangers and elders, yet relaxed enough for general adult conversation. Most Korean textbooks teach this level first, and for good reason — if you learn one speech level, make it this one.': '해요체は韓국語の丁寧さの日常の核です。見知らぬ人や年上に使えるほど丁寧で、一般的な大人の会話には十分くだけています。ほとんどの韓국語教材がこのレベルを最初に教えるのには理由があります — 一つだけ学ぶならこれを選んでください。',
  '— statement or question (distinguished by intonation: rising = question)': '— 平叙文または疑問文（イントネーションで区別：上昇 = 疑問）',
  '— polite request or command': '— 丁寧な依頼や命令',
  'To form 해요체: find the verb stem, check the last vowel. If the last vowel is': '해요체の作り方：動詞語幹を見つけ、最後の母音を確認します。最後の母音が',
  'or': 'または',
  ', add': 'なら',
  '. All other vowels take': 'を付けます。他のすべての母音には',
  '. Irregular verbs (하다 → 해요, 오다 → 와요) must be memorized.': 'を付けます。不規則動詞（하다 → 해요、오다 → 와요）は暗記が必要です。',
  'Past (해요체)': '過去形（해요체）',
  'Start Here': 'ここから始めよう',
  '해요체 is what most Korean textbooks (TTMIK, Sogang, Yonsei) teach from day one. It\'s polite enough for strangers, natural enough for adults, and flexible enough for almost any situation. Master 해요체 before worrying about the other levels.': '해요체はほとんどの韓국語教材（TTMIK・ソガン大・延世大）が初日から教えるレベルです。見知らぬ人にも丁寧で大人の会話にも自然で、ほぼすべての場面に対応できます。他のレベルを気にする前にまず해요체をマスターしましょう。',
  '💬 해요체 — Daily Conversation': '💬 해요체 — 日常会話',

  'Casual Speech — 반말 (해체)': 'カジュアルな話し方 — 반말（해体）',
  '반말 (literally "half-speech") is the informal, casual register used between close friends of the same age, from adults to young children, and between older and younger people in very close relationships. Forming 반말 is simple: take the 해요체 form and drop the 요.': '반말（直訳「半分の話し方」）は同い年の親しい友人間・大人が幼い子どもに・非常に親密な関係での年上から年下への会話に使うカジュアルな話し方です。반말の作り方はシンプルで、해요체から요を取るだけです。',
  'Core rule:': '基本ルール：',
  '→ drop': '→ 요を削除',
  'For the copula "to be" (이다): use': '「〜である」（이다）には：母音の後は',
  'after a vowel,': 'を使い、子音の後は',
  'after a consonant.': 'を使います。',
  'Social Warning': '社会的な注意',
  'Never use 반말 with someone older than you unless they have explicitly invited you to (': '自分より年上の人が明示的に誘った場合（',
  '— "you can speak casually"). Using 반말 uninvited is a serious social mistake that signals disrespect. When in doubt, always default to 해요체.': '— 「気楽に話していいよ」）を除き、年上の方に반말を使わないでください。誘われていない반말は深刻な社会的ミスです。迷ったときは必ず해요체にしてください。',
  '해요체 (Polite)': '해요체（丁寧）',
  '반말 (Casual)': '반말（カジュアル）',
  '👫 반말 — Close Friends Dialogue': '👫 반말 — 親友同士の会話',

  'Full Conjugation Comparison': '完全活用比較',
  'Use this table as your reference chart. Notice how the three main speech levels share the same stem — only the ending changes.': 'この表を参照チャートとして使ってください。3つの主要な敬語レベルが同じ語幹を共有し、語尾だけが変わることに注目してください。',
  'Verb (Dictionary)': '動詞（辞書形）',
  '합쇼체 (Formal)': '합쇼체（フォーマル）',
  '해요체 (Polite)': '해요체（丁寧）',

  'Tense Across Speech Levels': '敬語レベルをまたいだ時制',
  'Tense endings stack onto the speech level endings. The structure is always:': '時制の語尾は敬語レベルの語尾に重なります。構造は常に：',
  'verb stem + tense marker + speech level ending': '動詞語幹 + 時制マーカー + 敬語レベル語尾',
  '. Here is how past and future tenses work across the three main speech levels.': 'です。以下は3つの主要な敬語レベルにわたる過去・未来時制の説明です。',
  'Tense Marker Rules': '時制マーカーのルール',
  'Past:': '過去：',
  '(bright vowels: 아/오) or': '（明るい母音：아/오）または',
  '(all other vowels) before the speech level ending.': '（その他すべての母音）を敬語レベル語尾の前に付けます。',
  'Future/Intent:': '未来/意図：',
  '(formal intent/will) before the speech level ending.': '（公式な意志/意図）を敬語レベル語尾の前に付けます。',
  'Tense': '時制',
  'Present': '現在',
  'Past': '過去',
  'Future': '未来',
  'expresses the speaker\'s strong will or determination — common in formal contexts ("I will certainly...").': 'は話し手の強い意志や決意を表します — フォーマルな文脈で一般的（「必ず〜します...」）。',
  'expresses a plan or prediction — more natural in everyday speech ("I\'m going to..."). Both are "future," but the nuance differs.': 'は計画や予測を表します — 日常会話でより自然（「〜するつもり...」）。どちらも「未来」ですが、ニュアンスが異なります。',

  'Honorific Vocabulary (특수 경어)': '敬語語彙（특수 경어）',
  'Beyond verb endings, Korean has a set of entirely different vocabulary items used when speaking': '動詞語尾に加え、韓국語には',
  'honored people. These are called': '敬うべき人々に話すときに使う全く異なる語彙があります。これらは',
  '— literally "high words." Using a regular word for a respected person (e.g., saying 먹어요 about your teacher\'s eating) is considered impolite even if your verb ending is formal.': '— 文字通り「高い言葉」と呼ばれます。敬うべき人に普通の言葉を使うことは（例：先生の食事について먹어요と言う）、動詞語尾が丁寧でも失礼と見なされます。',
  'Regular Word': '通常語',
  'Honorific Form': '敬語形',
  'to eat / to drink (honorific)': '食べる / 飲む（敬語）',
  'to sleep (honorific)': '眠る（敬語）',
  'to be / to exist (honorific)': 'いる / ある（敬語）',
  'to be ill (honorific)': '病気である（敬語）',
  'to speak / to say (honorific)': '話す / 言う（敬語）',
  'to pass away (honorific)': 'お亡くなりになる（敬語）',
  'home / house (honorific)': 'お宅（敬語）',
  'name (honorific)': 'お名前（敬語）',
  'age (honorific)': 'お歳（敬語）',
  'Always Use Honorific Vocabulary For...': '敬語語彙を必ず使う場合…',
  'Use 높임말 vocabulary whenever speaking': '높임말語彙は以下の人々に話す場合は必ず使います',
  ': grandparents and elderly relatives, teachers and professors, bosses and senior colleagues, customers (in business contexts), and anyone noticeably older than you. For example: 할머니께서 진지를 드세요 (Grandmother is eating) — NOT 할머니가 밥을 먹어요.': '：祖父母・年配の親族・教師・教授・上司・先輩・お客様（ビジネス）・自分より明らかに年上の方。例：할머니께서 진지를 드세요（おばあさんがお食事されています）— 할머니가 밥을 먹어요ではありません。',

  'Real-Life Speech Level Scenarios': '実際の敬語レベル活用場面',
  'Knowing which speech level to use comes with practice and cultural awareness. These four scenarios illustrate the most common real-world situations you will encounter as a Korean learner.': 'どの敬語レベルを使うかは練習と文化的理解によって身につきます。この4つのシナリオは韓国語学習者として最もよく出会うリアルな場面を示しています。',
  'Meeting Your Partner\'s Parents': 'パートナーの両親に会う',
  'Speech level:': '敬語レベル：',
  'Texting a Same-Age Friend': '同い年の友人にメッセージを送る',
  'Ordering at a Café': 'カフェで注文する',
  'Company Presentation': '会社でのプレゼン',
  'Golden Rule': '黄金ルール',
  'When uncertain, always go one level more formal than you think necessary. Koreans will appreciate the respect, and a native speaker will often invite you to be more casual (': '迷ったときは必ず自分が必要と思う一段階上のフォーマルさを選んでください。韓国人はその敬意を評価し、ネイティブスピーカーはよりくだけた話し方を誘ってくれることがあります（',
  '— "speak comfortably"). The reverse — being too casual — is much harder to recover from.': '— 「楽に話してください」）。逆に、カジュアルすぎることは回復がはるかに難しいです。',
  '✅ Mark Lesson Complete': '✅ レッスンを完了にする',
  'Question Forms': '疑問文の形',
  'Expressing Emotions': '感情を表現する',

  // ── emotions page ────────────────────────────────────────
  '😊 Intermediate · Lesson 9': '😊 中級 · レッスン 9',
  'Expressing Emotions:': '感情を表現する：',
  '⏱ 30 min read': '⏱ 30分読了',
  '🔖 Vocabulary & Expression': '🔖 語彙と表現',

  'Basic Emotion Vocabulary (기본 감정 어휘)': '基本感情語彙（기본 감정 어휘）',
  'Korean emotion words are primarily': '韓국語の感情語は主に',
  'adjectives (형용사)': '形容詞（형용사）',
  '. You conjugate them just like descriptive verbs — not as nouns. This means you say': 'です。記述動詞と同じように活用します — 名詞としてではありません。つまり',
  '(I am happy), not': '（嬉しいです）と言い、',
  '. The cards below show the dictionary (base) form; conjugation is covered in the next section.': 'とは言いません。以下のカードは辞書形（基本形）を示します。活用は次のセクションで扱います。',
  'happy / joyful': '嬉しい / 喜ばしい',
  'sad': '悲しい',
  'angry': '怒っている',
  'scared / frightening': '怖い / 恐ろしい',
  'surprised / amazing': '驚いた / すごい',
  'lonely': '寂しい',
  'tired / fatigued': '疲れた / 疲労した',
  'happy / content': '嬉しい / 満足した',
  'worried / anxious': '心配した / 不安な',
  'embarrassed / shy': '恥ずかしい / 照れた',
  'miss / nostalgic': '恋しい / 懐かしい',
  'excited / heart flutter': 'ドキドキワクワクする',
  'Adjectives, Not Nouns': '形容詞、名詞ではない',
  'Korean emotion words are adjectives (형용사), so they conjugate like verbs. Say': '韓국語の感情語は形容詞（형용사）なので、動詞のように活用します。',
  '(I\'m happy),': '（嬉しいです）、',
  '(I\'m sad). Do not say': '（悲しいです）と言いましょう。',
  '— this is unnatural. The noun form (기쁨 = joy) exists but is used differently, as in': '— これは不自然です。名詞形（기쁨 = 喜び）は存在しますが、',
  '(joy overflows).': '（喜びが溢れる）のように異なる形で使われます。',

  'How to Express "I Feel..." (감정 표현 방법)': '「〜な気持ちです」の表現方法（감정 표현 방법）',
  'There are three main patterns for expressing emotions in Korean. Each has slightly different nuance and is used in different contexts.': '韓国語で感情を表現する主なパターンは3つあります。それぞれ微妙にニュアンスが異なり、異なる場面で使われます。',
  '📐 Three Expression Patterns': '📐 3つの表現パターン',
  'Pattern A — Direct: Emotion adjective + 아요/어요': 'パターンA — 直接的：感情形容詞 + 아요/어요',
  'Pattern B — Via 기분: 기분이 + adjective/noun': 'パターンB — 기분を通じて：기분이 + 形容詞/名詞',
  'Pattern C — Softer expression: ~(으)ㄴ 것 같아요 (seems / I think I feel)': 'パターンC — やわらかい表現：~(으)ㄴ 것 같아요（〜な気がする）',
  'Below is a full conjugation chart for all 12 emotions in 해요체 (present and past tense):': '以下は12の感情すべての해요체（現在形と過去形）活用一覧表です：',
  '해요체 (Present)': '해요체（現在形）',
  '해요체 (Past)': '해요체（過去形）',
  'scared': '怖い',
  'surprised': '驚いた',
  'tired': '疲れた',
  'worried': '心配した',
  'embarrassed': '恥ずかしい',
  'fluttery excitement': 'ドキドキワクワク',

  'Intensifying Emotions (강조 표현)': '感情の強調（강조 표현）',
  'Korean uses adverbs placed directly before the emotion adjective to intensify or soften the feeling. These intensifiers work with any emotion word and significantly expand your expressive range.': '韓국語では感情形容詞の直前に副詞を置いて感情を強調したり和らげたりします。これらの強調語はあらゆる感情語と使えて、表現の幅を大幅に広げます。',
  'Intensifier': '強調語',
  'really / truly': '本当に',
  'so / too (very)': 'すごく / とても',
  'extremely': '非常に',
  'incredibly / insanely': 'ものすごく',
  'a little / slightly': '少し / やや',
  'not really (with negation)': 'あまり（否定と共に）',
  '🔊 Intensified Emotion Sentences': '🔊 強調された感情の文',
  '너무 — Overused in a Good Way': '너무 — 良い意味での多用',
  'Traditionally 너무 means "too much" (negative connotation), but in modern spoken Korean it is widely used as a simple intensifier meaning "so" or "very" —': '伝統的に너무は「過度に」（否定的ニュアンス）を意味しますが、現代の口語韓국語では「すごく」や「とても」の単純な強調語として広く使われています —',
  '(I love it so much!) is extremely common and completely natural.': '（最高に好きです！）は非常によく使われ、完全に自然です。',

  'Asking About Feelings (기분 묻기)': '気持ちを尋ねる（기분 묻기）',
  'Asking how someone feels is a fundamental social skill. Korean has several phrases ranging from casual check-ins to more concerned inquiries. The correct choice depends on context and your relationship with the person.': '相手の気持ちを尋ねることは基本的な社会スキルです。韓国語にはカジュアルな確認から心配を示す質問まで様々なフレーズがあります。適切な選択は状況と相手との関係によります。',
  'How is it? / How are things?': 'どうですか？ / 調子はどうですか？',
  'How do you feel? / What\'s your mood?': '気分はどうですか？',
  'Why are you acting like that? / What\'s wrong?': 'なぜそんな様子ですか？ / どうしたの？',
  'Did something happen? / Is something going on?': '何かあったの？',
  'Are you okay? / Are you alright?': '大丈夫ですか？',
  'General check-in about a situation': '状況についての一般的な確認',
  'Asking directly about someone\'s emotional state': '相手の感情状態を直接尋ねるとき',
  'When you notice someone behaving unusually or upset': '相手が普段と違う様子や動揺しているとき',
  'When you sense something is wrong or different': '何かがおかしいと感じたとき',
  'Expressing concern; also used to offer comfort': '心配を表すとき・慰めるときにも使う',
  '💬 Checking In — Dialogue': '💬 気持ちを確認する会話',

  'Responding to Others\' Emotions (공감 표현)': '他者の感情への反応（공감 표현）',
  'Showing empathy and reacting appropriately to others\' feelings is a core social skill in any language. These phrases will help you comfort, celebrate, and connect with Korean speakers authentically.': '他者の感情に共感し適切に反応することはあらゆる言語での核心的な社会スキルです。これらのフレーズで韓国語話者を慰め・祝い・つながることができます。',
  'Me too!': '私もです！',
  'Cheer up! / You\'ve got this! (Fighting!)': '頑張って！ / ファイティング！',
  'Don\'t worry.': '心配しないでください。',
  'It\'ll work out. / It\'ll be fine.': 'うまくいきますよ。 / 大丈夫ですよ。',
  'That\'s too bad. / I\'m sorry to hear that.': 'それは残念ですね。',
  'Congratulations!': 'おめでとうございます！',
  'That\'s amazing! / Jackpot! (colloquial)': 'すごい！ / 大当たり！（口語）',
  'Really? / For real?': '本当に？',
  'Did that happen? / Is that so?': 'そうだったんですか？',
  'Culture Note — 힘내세요': '文化メモ — 힘내세요',
  '(literally "draw out your strength") is the Korean equivalent of cheering someone on. You will also hear': '（直訳「力を出して」）は韓국語で人を応援する表現です。また',
  '(from English "fighting") used interchangeably — it is one of the most iconic expressions in Korean culture, heard in K-Dramas, at sports events, and between friends before an exam.': '（英語のfightingから）も同様に使われます — K-ドラマ・スポーツイベント・試験前の友人間で聞かれる韓国文화の代表的な表現です。',

  'Emotion Idioms and Expressions (감정 관용어)': '感情のイディオムと表現（감정 관용어）',
  'Korean has a vivid set of idiomatic expressions rooted in physical sensations. Many describe emotions through body metaphors — the heart, stomach, eyes, and breath all carry emotional meaning. These appear constantly in K-Dramas and literary Korean.': '韓국語には身体的感覚に根ざした鮮やかなイディオム表現が豊富です。多くは心・胃・目・息などの身体のメタファーで感情を表現します。K-ドラマや文学的な韓국語に頻繁に登場します。',
  'Korean Idiom': '韓국語イディオム',
  'Literal Meaning': '直訳',
  'Actual Meaning': '実際の意味',
  'heart (mind) is heavy': '心（気持ち）が重い',
  'feel burdened / weighed down': '重荷を感じる / 気が重い',
  'inside is hurt / damaged': '内側が傷ついた',
  'feel emotionally hurt / upset': '心が傷ついた / 気落ちした',
  'eyes meet / match': '目が合う',
  'fall for each other / make eye contact romantically': 'お互いに惹かれる / ロマンチックにアイコンタクト',
  'hearts connect / pass through': '心が通じる',
  'understand each other deeply / be on the same wavelength': '深く分かり合う / 波長が合う',
  'chest pounds / throbs': '胸がドキドキする',
  'heart racing from excitement or nervousness': '胸がドキドキする（興奮や緊張から）',
  'tears come out': '涙が出る',
  'start crying / tears well up': '泣き始める / 涙があふれる',
  'breath / spirit is blocked': '息が詰まる',
  'speechless (from shock, absurdity, or amazement)': '言葉が出ない（衝撃・不条理・驚きから）',
  'spirit rises / energy comes out': '気力が湧いてくる',
  'excited / thrilled / pumped up': '興奮した / ワクワクする / 気合が入った',
  '🎭 Idioms in Context': '🎭 文脈の中のイディオム',

  'Practice Dialogues (연습 대화)': '練習会話（연습 대화）',
  'Study these three mini-dialogues to see emotion vocabulary working naturally in real conversational situations.': 'この3つのミニ会話を学んで、感情語彙が実際の会話でどのように自然に機能するかを確認してください。',
  '🫂 Dialogue 2 — Comforting a Sad Friend': '🫂 会話2 — 悲しい友人を慰める',
  '🎤 Dialogue 3 — Nervousness Before a Performance': '🎤 会話3 — 本番前の緊張',

  'K-Pop & K-Drama Emotion Phrases': 'K-ポップ＆K-ドラマの感情フレーズ',
  'If you have been watching Korean dramas or listening to K-Pop, you have already been absorbing emotional vocabulary without realizing it. These ten phrases appear in countless songs and dramatic scenes — knowing them will deepen your enjoyment of Korean content and help you understand lyrics and dialogue immediately.': 'K-ドラマを見たりK-ポップを聴いたりしているなら、気づかないうちに感情語彙を吸収しています。この10のフレーズは無数の楽曲とドラマシーンに登場します — これらを知ることで韓国コンテンツをより深く楽しめます。',
  'Culture Note — Learning Through K-Media': '文化メモ — K-メディアで学ぶ',
  'K-Pop lyrics and K-Drama dialogue are excellent learning tools because they use emotional, conversational Korean rather than textbook-formal language. Pay attention to which speech level each phrase uses: 보고 싶어 and 사랑해 are 반말 (casual) — typical in romantic contexts. 괜찮아요 is 해요체 (polite). Mixing these up would sound strange in context.': 'K-ポップの歌詞とK-ドラマの台詞は教科書的なフォーマルな言語ではなく感情的で会話的な韓국語を使うため、優れた学習ツールです。各フレーズの敬語レベルに注意してください：보고 싶어と사랑해は반말（カジュアル）— ロマンチックな文脈に典型的。괜찮아요は해요体（丁寧）です。',
  'Korean Phrase': '韓국語フレーズ',
  'Context': '使う場面',
  'I miss you': '会いたい',
  'I love you (casual)': '愛してる（カジュアル）',
  'It\'s hard / I\'m struggling': 'つらい / 苦しんでいる',
  'It\'s okay / I\'m fine': '大丈夫',
  'I\'m sorry (casual)': 'ごめんね（カジュアル）',
  'Thank you (casual)': 'ありがとう（カジュアル）',
  'I\'m fluttery / excited (casual)': 'ドキドキする（カジュアル）',
  'Don\'t leave': '行かないで',
  'You\'re not alone': '一人じゃない',
  'Don\'t forget': '忘れないで',
  'Romantic songs, longing scenes': 'ロマンチックな曲・切ない場面',
  'Confessions, romantic K-Dramas': '告白・ロマンチックなK-ドラマ',
  'Emotional ballads, vulnerable moments': '感情的なバラード・脆弱な瞬間',
  'Comforting others, reassuring self': '他者を慰める・自分を安心させる',
  'Apologies between close people': '親しい人同士の謝罪',
  'Heartfelt gratitude in informal settings': '打ち解けた場での心からの感謝',
  'Romantic tension, anticipation in K-Pop': 'K-ポップのロマンチックな緊張・期待',
  'Emotional breakup scenes, sad ballads': '感情的な別れのシーン・悲しいバラード',
  'Fan songs, comforting lyrics': 'ファンソング・慰めの歌詞',
  'Parting scenes, nostalgic lyrics': '別れのシーン・懐かしい歌詞',
  'Learning Tip — Shadowing': '学習のヒント — シャドーイング',
  'Pick one K-Pop song you love and look up the Korean lyrics with romanization. Identify the emotion words from this lesson. Try to sing along — this "shadowing" technique dramatically improves pronunciation and helps emotional vocabulary stick in memory far better than flashcards alone.': '好きなK-ポップの曲を1つ選び、ローマ字表記付きの韓국語歌詞を調べましょう。このレッスンの感情語を見つけてください。一緒に歌ってみましょう — この「シャドーイング」技法は発音を劇的に向上させ、感情語彙をフラッシュカードだけより記憶に定着させます。',
  'Formal vs Informal': 'フォーマル vs インフォーマル',
  'Shopping Phrases': '買い物フレーズ',

  // ── shopping page ────────────────────────────────────────
  '🛒 Intermediate · Lesson 10': '🛒 中級 · レッスン 10',
  'Shopping Korean:': '買い物韓国語：',
  '⏱ 35 min read': '⏱ 35分読了',
  '🔖 Practical Korean': '🔖 実践韓国語',
  'Master the language of Korean shopping — from browsing traditional markets to paying at department stores. These phrases will make your shopping experience in Korea confident and enjoyable.': '韓国での買い物を自信を持って楽しめるよう、伝統市場での品物選びからデパートでの支払いまで、買い物韓国語をマスターしましょう。',
  'Practical': '実践',

  'Entering a Store': '店に入る',
  'The moment you walk into a Korean shop, you\'ll hear': '韓国のお店に入ると、すぐに',
  '— the warm welcome phrase every shopkeeper uses. Here are the essential phrases for those first moments.': 'というすべての店主が使う温かい歓迎フレーズが聞こえます。最初の瞬間に使う必須フレーズです。',
  'Korean': '韓국語',
  'Listen': '音声',
  'Welcome! (Come right in!)': 'いらっしゃいませ！',
  'What are you looking for?': '何かお探しですか？',
  'Just browsing': 'ただ見ているだけです',
  'Do you need help?': 'お手伝いしましょうか？',
  'Just a moment': '少々お待ちください',
  'Excuse me / Sorry': 'すみません',

  'Asking About Items': '商品について尋ねる',
  'These are the most practical shopping questions — learn them and you can navigate almost any Korean shop confidently.': 'これらは最も実践的な買い物の質問です — これらを覚えれば、ほぼどんな韓国のお店でも自信を持って対応できます。',
  'How much is this?': 'これはいくらですか？',
  'Do you have this?': 'これはありますか？',
  'Do you have other colors?': '他の色はありますか？',
  'Do you have other sizes?': '他のサイズはありますか？',
  'Can I try this on?': '試着してもいいですか？',
  'Is there a discount?': '割引はありますか？',
  'Is it on sale?': 'セール中ですか？',
  'Is it sold out?': '売り切れですか？',
  '💬 Asking About an Item': '💬 商品について尋ねる',

  'Clothing & Size Vocabulary': '衣類・サイズの語彙',
  'From the fitting room to the checkout, these words cover all the clothes and accessories you\'ll encounter while shopping in Korea.': '試着室からレジまで、韓国での買い物で出会うすべての衣類とアクセサリーをカバーします。',
  'clothes': '服',
  'pants / trousers': 'ズボン',
  'shirt': 'シャツ',
  'dress (one-piece)': 'ワンピース',
  'skirt': 'スカート',
  'jacket': 'ジャケット',
  'shoes': '靴',
  'hat / cap': '帽子',
  'bag': 'バッグ',
  'wallet': '財布',
  'Fit & Size': 'サイズ感',
  'too small': '小さすぎる',
  'too big': '大きすぎる',
  'fits perfectly': 'ぴったりです',
  'Size S / M / L / XL': 'サイズ S / M / L / XL',
  'Colors': '色',
  'red': '赤',
  'blue': '青',
  'white': '白',
  'black': '黒',
  'yellow': '黄色',
  'green': '緑',
  'pink': 'ピンク',

  'Prices and Numbers in Shopping': '買い物における価格と数字',
  'Korean currency is the 원 (won). Prices in Korea can seem large because the won has no cent equivalent — a coffee costs around 5,000–6,000원. Here are the key denominations to know.': '韓国の通貨はウォン（원）です。ウォンにはセントに相当するものがないため価格が大きく見えます — コーヒーは約5,000〜6,000원です。知っておくべき主な金額はこちらです。',
  'Korean Won (원) Key Amounts': '韓国ウォン（원）主な金額',
  'How much?': 'いくらですか？',
  'It\'s ~ won': '~ウォンです',
  'expensive': '高い',
  'cheap / inexpensive': '安い',
  'discount': '割引',
  'Can you lower the price?': '値引きしてもらえますか？',
  'Tax included?': '税込みですか？',
  '💬 Price Negotiation at the Market': '💬 市場での値段交渉',

  'Traditional Market vs Department Store': '伝統市場 vs デパート',
  'Shopping in Korea means two very different worlds — the bustling traditional market where bargaining is expected, and the polished department store where prices are fixed. Here\'s what you need for the market.': '韓국での買い物は2つの全く異なる世界があります — 値段交渉が当たり前の活気ある伝統市場と、値段が固定されたデパートです。市場で必要なフレーズはこちらです。',
  'Must-Visit Korean Markets': 'ぜひ訪れたい韓国の市場',
  'Cheaper if I buy more?': 'まとめ買いすると安くなりますか？',
  'Please give me a little extra': 'おまけをください',
  'Please give me a bag': '袋をください',
  'Please wrap it (as a gift)': '包んでください（ギフト用に）',
  'Tip: Bargaining Culture': 'ヒント：値段交渉の文化',
  'Bargaining is acceptable at traditional markets (시장) but NOT at department stores (백화점), convenience stores (편의점), or branded shops. At markets, always ask politely — being friendly and using Korean phrases greatly increases your chances of a discount!': '値段交渉は伝統市場（시장）では受け入れられますが、デパート（백화점）・コンビニ（편의점）・ブランドショップではNGです。市場では常に丁寧に聞きましょう — 友好的な態度と韓국語フレーズの使用で割引の可能性が大幅に上がります！',

  'Payment': 'お会計',
  'Korea is one of the world\'s most cashless societies — cards and QR-code payment are widely accepted almost everywhere. Know these phrases for a smooth checkout.': '韓国は世界有数のキャッシュレス社会です — カードとQRコード決済はほぼどこでも広く使えます。スムーズなチェックアウトのためにこれらのフレーズを覚えましょう。',
  'Please process the payment / bill please': 'お会計をお願いします',
  'I\'ll pay by card': 'カードで払います',
  'I\'ll pay cash': '現金で払います',
  'Receipt please': '領収書をください',
  'change (from payment)': 'お釣り',
  'Do you have exact change?': 'ちょうどのお金はありますか？',
  'I\'ll pay by QR code': 'QRコードで払います',
  '💬 Complete Checkout Dialogue': '💬 完全なレジ会話',

  'Returns and Exchanges': '返品と交換',
  'Sometimes things don\'t work out — here\'s how to return or exchange items in Korean.': 'うまくいかないこともあります — 韓국語での返品・交換のフレーズです。',
  'I want to return this': '返品したいです',
  'I want to exchange this': '交換したいです',
  'I have the receipt': 'レシートがあります',
  'It\'s defective': '不良品です',
  'The size doesn\'t fit': 'サイズが合いません',
  'Can I get a refund?': '返金してもらえますか？',
  'Tip: Return Policies in Korea': 'ヒント：韓국での返品ポリシー',
  'Most stores allow returns within 7–14 days with the original receipt and tags attached. Department stores generally have more lenient return policies than small independent shops. Always ask 환불 돼요? before purchasing if you\'re unsure about sizing.': 'ほとんどのお店では、元のレシートとタグが付いていれば7〜14日以内の返品が可能です。デパートは一般的に小さなお店より返品ポリシーが寛大です。サイズが不安なら購入前に환불 돼요?と聞きましょう。',

  'Online Shopping Korean': 'オンラインショッピング韓국語',
  'South Korea has one of the world\'s most advanced e-commerce systems. Whether you\'re using Coupang, Naver Shopping, or 11번가, these terms are essential.': '韓국は世界最先端のEコマースシステムのひとつを持っています。クーパン・ネイバーショッピング・11번가を使う際にもこれらの用語は必須です。',
  'shipping fee / delivery fee': '送料',
  'free shipping': '送料無料',
  'shopping cart': 'ショッピングカート',
  'purchase / buy now': '購入 / 今すぐ買う',
  'add to wishlist / save': 'お気に入り登録',
  'review': 'レビュー',
  'star rating': '星評価',
  'sold out': '売り切れ',
  'restock notification': '再入荷通知',
  'fast delivery': '速達',
  'Tip: Major Korean Online Shopping Platforms': 'ヒント：韓国の主要オンラインショッピングプラットフォーム',
  '— Korea\'s Amazon equivalent; famous for "로켓배송" (Rocket Delivery) — next-day or same-day shipping.': '— 韓国版Amazonに相当；「로켓배송」（ロケット配送）で有名 — 翌日または当日配送。',
  '— aggregates sellers; integrated with Naver Pay (네이버페이).': '— 複数の販売者を集約；Naver Pay（네이버페이）と連携。',
  '— Large marketplace with regular sales events.': '— 定期的なセールイベントがある大型マーケットプレイス。',
  '— Korea\'s top fashion e-commerce platform for streetwear and K-fashion.': '— ストリートウェアとK-ファッションの韓国トップファッションECサイト。',

  'Complete Shopping Dialogue': '完全な買い物会話',
  'Put it all together! Here\'s a full shopping conversation at a Korean clothing store — from greeting to goodbye.': 'すべてをまとめましょう！韓国の服屋での完全な買い物会話です — 挨拶からお別れまで。',
  '💬 At a Clothing Store — Full Dialogue': '💬 服屋にて — 完全な会話',
  'Mark Lesson Complete ✓': 'レッスンを完了にする ✓',
  'Writing Essays': '作文',

  // ── Writing Essays page ────────────────────────────────────────
  '📝 Advanced · Lesson 12': '📝 上級 · レッスン12',
  'Writing Korean Essays:': '韓国語の作文：',
  '📊 Advanced': '📊 上級',
  '🔖 Writing': '🔖 ライティング',
  'Elevate your Korean from conversation to composition. This lesson covers essay structure, formal written style, connective grammar, transition words, and common mistakes — everything you need to write polished Korean prose.': '韓国語を会話から作文へと高めましょう。このレッスンでは文章構成・公式の書き言葉スタイル・接続文法・接続表現・よくあるミスを扱います — 洗練された韓国語の文章を書くのに必要なすべてです。',
  'Korean Essay Structure': '韓国語作文の構造',
  'Like essays in most languages, Korean academic writing follows a three-part structure. Each part has a distinct role and characteristic opening phrases.': 'ほとんどの言語のエッセイと同様に、韓国語のアカデミックライティングは三部構成に従います。各パートには明確な役割と特徴的な書き出しフレーズがあります。',
  'Part': 'パート',
  'Typical Opening Phrases': '典型的な書き出しフレーズ',
  'Introduction': '序論',
  'Body': '本論',
  'Conclusion': '結論',
  'Tip: Korean Essay Length': 'ヒント：韓国語エッセイの文字数',
  'Korean academic essays are often measured in 글자 수 (character count) rather than word count. A standard university essay is typically 2,000–5,000 characters (글자). School assignments may specify 원고지 (a grid writing paper format) based on 200 or 400 character grids.': '韓国語のアカデミックエッセイは語数ではなく글자 수（文字数）で測られることが多いです。標準的な大学レポートは通常2,000〜5,000字（글자）です。学校の課題では200字または400字の원고지（原稿用紙）形式で指定されることもあります。',
  'Formal Written vs Spoken Style': '書き言葉 vs 話し言葉スタイル',
  'One of the biggest shifts in Korean writing is moving from conversational speech (구어체) to formal written style (문어체). Essays use -다 plain style endings — never the 해요체 you use in conversation.': '韓国語ライティングにおける最大の変化の一つは、口語体（구어체）から書き言葉体（문어체）への移行です。エッセイでは-다形の語尾を使います — 会話で使う해요체は使ってはいけません。',
  'Key Rule: Written Style Endings': '重要ルール：書き言葉の語尾',
  'In formal Korean essays, always use the': '公式の韓国語エッセイでは常に',
  '(plain style) or': '（普通体）または',
  '(formal polite). Never use': '（公式丁寧体）を使いましょう。絶対に',
  '(-아요/-어요 endings) — it sounds like a text message, not an essay. Academic papers almost exclusively use the plain -다 style.': '（-아요/-어요 語尾）は使わないでください — エッセイではなくテキストメッセージのように聞こえます。学術論文ではほぼ例外なく普通体-다スタイルを使います。',
  'Spoken Form (구어체)': '話し言葉（구어체）',
  'Formal Written Form (문어체)': '書き言葉（문어체）',
  'eats / I eat': '食べる',
  'there is / I have': 'ある / 持っている',
  'is / am / are': 'だ / です / である',
  'does not do': 'しない',
  'therefore / so': 'したがって / なので',
  'Connective Endings': '接続語尾',
  'Korean is a language of connective endings — verb and adjective endings that link clauses smoothly. Mastering these is essential for writing fluid, complex sentences.': '韓国語は接続語尾の言語です — 節を滑らかにつなぐ動詞・形容詞の語尾です。これらをマスターすることが流暢で複雑な文を書く上で不可欠です。',
  'Connector': '接続語尾',
  'Meaning / Function': '意味 / 機能',
  'Example Sentence': '例文',
  'and; sequential action': 'そして；連続動作',
  'but; contrast': 'しかし；対比',
  'background / soft contrast': '背景 / 穏やかな対比',
  'because; so (result follows)': 'ので；だから（結果が続く）',
  'because (reason; more formal)': 'なぜなら（理由；よりフォーマル）',
  'if / when (conditional)': 'もし / とき（条件）',
  'or (alternative)': 'または（代替）',
  'while doing; simultaneously': 'しながら；同時に',
  'while / in the middle of (interrupted)': '〜している途中で（中断）',
  'so that / until / in order to': '〜するように / まで / 〜するために',
  'I read the book and wrote the report.': '本を読んでレポートを書きました。',
  'It\'s difficult but important.': '難しいですが重要です。',
  'I study Korean, but it\'s hard.': '韓국語を勉強しているが、難しい。',
  'It rained so I stayed home.': '雨が降ったので家にいました。',
  'Because it is important, we must discuss it.': '重要なので議論しなければなりません。',
  'If you make an effort, you can succeed.': '努力すれば成功できます。',
  'You can understand by reading or listening.': '読んだり聞いたりすることで理解できます。',
  'I studied while listening to music.': '音楽を聴きながら勉強しました。',
  'I fell asleep while studying.': '勉強している途中で眠ってしまいました。',
  'I explained so that they could understand.': '理解できるように説明しました。',
  '📘 Connectives in Action': '📘 接続語尾の実例',
  'Because I study Korean, I can better understand Korean culture.': '韓国語を勉強しているため、韓国文化をより深く理解することができます。',
  'Although it\'s difficult, if you consistently make an effort, your skills will surely improve.': '難しくても、継続的に努力すれば必ず実力が上がります。',
  'One must strive to naturally develop conversational skills by watching dramas.': 'ドラマを見ながら自然に会話力を伸ばせるよう努力しなければなりません。',
  'After studying grammar and learning vocabulary, it is important to actually try using them.': '文法を勉強して語彙を覚えた後、実際に使ってみることが大切です。',
  'Transition Words': '接続表現',
  'Sentence-level connectives link your ideas across paragraphs. Knowing a variety of these words lifts your essay from basic to polished.': '段落をまたいでアイデアをつなぐ文レベルの接続語です。これらを多様に知ることでエッセイが基礎から洗練されたものになります。',
  'Adding': '付加',
  'Contrasting': '対比',
  'Cause & Result': '原因と結果',
  'Sequence': '順序',
  'Concession': '譲歩',
  'also; in addition': 'また；さらに',
  'moreover; on top of that': 'さらに；その上に',
  'not only that; furthermore': 'それだけでなく；さらには',
  'however': 'しかしながら',
  'on the other hand': '一方で',
  'but; nevertheless': 'しかし；それでも',
  'therefore; accordingly': 'したがって；それゆえ',
  'as a result': '結果として',
  'because (sentence-opener)': 'なぜなら（文頭表現）',
  'first; first of all': 'まず；まず最初に',
  'next; following that': '次に；それに続いて',
  'finally; lastly': '最後に',
  'although; even though': '〜にもかかわらず；たとえ〜でも',
  'despite; in spite of': '〜にもかかわらず',
  'Topic Sentences and Thesis': 'トピックセンテンスと主張',
  'Strong academic writing begins each paragraph with a clear topic sentence. These academic sentence patterns are essential for expressing arguments in Korean essays.': '優れたアカデミックライティングは各段落を明確なトピックセンテンスで始めます。これらのアカデミックな文型は、韓国語エッセイで論点を表現するのに不可欠です。',
  '📘 Academic Sentence Starters': '📘 アカデミックな書き出し表現',
  '~ plays an important role.': '〜は重要な役割を果たしています。',
  'There is an argument that ~.': '〜という主張があります。',
  'According to ~, it can be said that ~.': '〜によると、〜と言えます。',
  'We can see/know through ~.': '〜を通じてわかります。',
  'I think that ~ is necessary.': '〜が必要だと思います。',
  'Citing and Quoting': '引用・参照',
  'Academic Korean writing requires citing sources and referencing evidence. These expressions are standard in Korean essays, journal articles, and research papers.': '韓国語のアカデミックライティングでは資料の引用と証拠の参照が求められます。これらの表現は韓国語のエッセイ・学術論文・研究論文で標準的に使われます。',
  'According to ~': '〜によると',
  'It is known that ~': '〜であることが知られています',
  'stated / revealed that ~': '〜と述べた / 明らかにした',
  'According to research': '研究によると',
  'According to the claim of ~': '〜の主張によると',
  'Common Writing Mistakes': 'よくある作文ミス',
  'Even advanced Korean learners fall into predictable traps when writing formal essays. Here are the eight most common mistakes — and how to avoid them.': '上級の韓国語学習者でも公式エッセイを書くときには定番の落とし穴にはまりがちです。最もよくある8つのミスとその避け方をご紹介します。',
  '8 Common Essay Writing Mistakes': 'よくある作文ミス8つ',
  '1. Using -요 endings': '1. -요語尾の使用',
  '— Essays require -다 (plain) or -습니다 (formal polite) style. 해요체 belongs in text messages, not essays.': '— エッセイでは-다（普通体）または-습니다（公式丁寧体）スタイルが必要です。해요체はテキストメッセージ用で、エッセイには不向きです。',
  '2. Direct translation from English word order': '2. 日本語の語感での直訳',
  '— Complex Korean sentences have different clause ordering. Korean clauses flow from most specific to most general, opposite of English.': '— 日本語と韓国語は語順が似ていますが、複雑な文での接続助詞の使い方や節の展開が異なる場合があります。日本語語感のまま直訳すると不自然な韓国語になることがあります。',
  '3. Overusing 그리고 (and)': '3. 그리고（and）の多用',
  '— Vary your connectives: use 또한, 게다가, 뿐만 아니라. Starting every sentence with 그리고 reads as elementary.': '— 接続語を変化させましょう：또한、게다가、뿐만 아니라を使いましょう。毎文を그리고で始めると初歩的に見えます。',
  '4. Starting sentences with 저는 in formal essays': '4. 公式エッセイで저는を文頭に使う',
  '— Avoid first-person or use 필자는 (this writer) in formal academic writing. First-person makes essays feel like diaries.': '— 公式のアカデミックライティングでは一人称を避けるか、필자는（この筆者は）を使いましょう。一人称ではエッセイが日記のように感じられます。',
  '5. Forgetting to nominalize verbs': '5. 動詞の名詞化を忘れる',
  '— Korean essays frequently turn verbs into noun clauses using -기, -(으)ㅁ, or -는 것. E.g., 배우는 것이 중요하다 (Learning is important).': '— 韓국語のエッセイでは-기、-(으)ㅁ、-는 것を使って動詞を名詞句に変換することが多いです。例：배우는 것이 중요하다（학ぶことが重要だ）。',
  '6. Mixing speech levels': '6. 語体レベルの混在',
  '— Pick either plain style (-다) or formal polite (-습니다) and use it consistently throughout the entire essay.': '— 普通体（-다）または公式丁寧体（-습니다）のどちらかを選び、エッセイ全体を通じて一貫して使いましょう。',
  '7. Weak conclusion': '7. 弱い結論',
  '— A good Korean conclusion 결론 must synthesize your arguments, not simply repeat them. Use phrases like 이상에서 살펴본 바와 같이... to signal a genuine synthesis.': '— 良い결론は論点を単に繰り返すのではなく総合する必要があります。이상에서 살펴본 바와 같이...などのフレーズで真の総合を示しましょう。',
  '8. No topic sentence per paragraph': '8. 段落ごとにトピックセンテンスがない',
  '— Every paragraph needs a clear 주제문 (topic sentence). Korean paragraphs should be organized and focused, not stream-of-consciousness.': '— すべての段落には明確な주제문（トピックセンテンス）が必要です。韓国語の段落は意識の流れではなく整理されフォーカスされたものであるべきです。',
  'Sample Essay Paragraph': '作文段落の例',
  'Here is a model paragraph in formal Korean essay style on the topic of why learning Korean is beneficial. Notice the use of connective endings, transition words, and formal -다 style throughout.': '韓国語学習がなぜ有益かというテーマで、公式な韓国語エッセイスタイルのモデル段落を示します。接続語尾・接続表現・公式の-다スタイルの使い方に注目してください。',
  '📝 Sample Paragraph: Benefits of Learning Korean': '📝 例文段落：韓国語学習のメリット',
  'Connectives Used in the Sample': 'サンプルで使われた接続表現',
  '(not only... but also) — adding': '（〜だけでなく〜も）— 付加',
  '(first) — sequencing': '（まず）— 順序',
  '(because) — cause': '（なぜなら）— 原因',
  '(moreover) — adding': '（さらに）— 付加',
  '(however) — contrasting': '（しかし）— 対比',
  '(therefore) — conclusion': '（したがって）— 結論',

  // ── Business Korean page ──────────────────────────────────────
  '💼 Advanced · Lesson 13': '💼 上級 · レッスン13',
  '⏱ 55 min read': '⏱ 55分読了',
  '🔖 Professional': '🔖 プロフェッショナル',
  '👁 7,841 views': '👁 7,841 閲覧',
  'Korean business culture places great importance on': '韓국ビジネス文化は、',
  'hierarchy, formality, and respect': '階層・格式・礼節',
  '. Whether you are joining a Korean company, working with Korean partners, or attending a business meeting in Korea, mastering professional Korean (비즈니스 한국어) will set you apart. The formal speech level (격식체) is essential — never use casual speech (반말) in a business setting.': '。韓国企業に入社する場合も、韓国パートナーと仕事をする場合も、韓国でのビジネス会議に出席する場合も、プロの韓国語（비즈니스 한국어）をマスターすることで差をつけることができます。公式語体（격식체）は欠かせません — ビジネスの場では반말（カジュアル語）を絶対に使わないでください。',
  'Formal Speech in Business (격식체)': 'ビジネスにおける公式語体（격식체）',
  'Korean businesses use': '韓国企業では',
  'formal polite speech (격식체/합쇼체)': '公式丁寧語体（격식체/합쇼체）',
  '— the most respectful register. This is more formal than everyday 존댓말 (해요체). Mastering these endings is non-negotiable in professional settings.': '— 最も敬意を示す語体が使われます。これは日常の존댓말（해요체）よりも格式張っています。これらの語尾をマスターすることはプロの場では必須です。',
  '🗣️ Formal vs Polite Register Comparison': '🗣️ 公式体 vs 丁寧体 比較',
  'Meaning': '意味',
  'Polite (everyday 해요체)': '丁寧体（日常の해요체）',
  'Formal (business 합쇼체)': '公式体（ビジネスの합쇼체）',
  'Yes': 'はい',
  'I / Me (subject)': '私（主語）',
  'I eat': '食べる',
  'I go': '行く',
  'I don\'t know': 'わかりません',
  'I understand': 'わかりました',
  'It is difficult': '難しい',
  'The Key Pattern': '重要なパターン',
  'In formal speech: verbs end in': '公式語体では：動詞の語尾が',
  '(statements) and': '（述語）と',
  '(questions). Replace the -(아/어)요 ending you use in daily conversation. This instantly communicates professionalism.': '（疑問）になります。日常会話で使う-(아/어)요語尾を置き換えましょう。これによりプロフェッショナルさが即座に伝わります。',
  'Business Greetings (비즈니스 인사)': 'ビジネスの挨拶（비즈니스 인사）',
  'First impressions in Korean business settings are critical. A deep bow (고개를 숙이다) accompanies formal greetings. Learn these phrases to make a strong professional impression.': '韓国のビジネスの場での第一印象は非常に重要です。正式な挨拶には深いお辞儀（고개를 숙이다）が伴います。強い専門的な印象を与えるためにこれらのフレーズを学びましょう。',
  '🤝 Essential Business Greetings': '🤝 必須ビジネス挨拶',
  'When to Use': '使う場面',
  'How do you do? (first meeting)': 'はじめまして（初対面）',
  'Please take care of me / I look forward to working with you': 'よろしくお願いいたします',
  'Good day (formal greeting)': 'こんにちは（公式の挨拶）',
  'You\'ve worked hard / Well done': 'お疲れ様でした',
  'Thank you (formal, humble)': 'ありがとうございます（公式・謙遜）',
  'I sincerely apologize': '深くお詫び申し上げます',
  'First time meeting someone professionally': 'プロとして初めて会うとき',
  'After introductions; starting new project': '紹介後；新しいプロジェクト開始時',
  'Formal meeting; presentations': '公式会議；プレゼンテーション',
  'End of meeting; after completing a task': '会議終了後；タスク完了後',
  'More respectful than 감사합니다': '감사합니다より丁寧',
  'Business apology; more formal than 미안해요': 'ビジネスでの謝罪；미안해요よりフォーマル',
  'Business Card Exchange (명함 교환)': '名刺交換（명함 교환）',
  'Exchanging business cards (명함) is a formal ritual in Korean business culture. Cards are presented and received with': '名刺（명함）の交換は韓国ビジネス文化における正式な儀式です。名刺は',
  'two hands': '両手',
  ', with a slight bow. Never write on a card or put it in your back pocket — it is seen as disrespectful.': '、軽いお辞儀とともに渡され受け取られます。名刺に書き込んだり後ろポケットに入れたりしてはいけません — 失礼にあたります。',
  '📇 명함 Exchange Phrases': '📇 名刺交換のフレーズ',
  '📋 Key Business Card Vocabulary': '📋 名刺の主要語彙',
  'Business card': '名刺',
  'Job title': '役職',
  'Company': '会社',
  'Department': '部署',
  'Contact information': '連絡先',
  'Korean Business Hierarchy & Job Titles (직급)': '韓国ビジネスの階層と役職（직급）',
  'Korean companies follow a strict hierarchy. Understanding titles (직급) is essential for addressing colleagues correctly — always use their title, not their first name.': '韓国企業は厳格な階層構造に従っています。役職（직급）を理解することは同僚に正しく話しかける上で不可欠です — 名前ではなく必ず役職を使いましょう。',
  '🏢 Common Korean Corporate Titles': '🏢 韓国企業の主な役職',
  'Title': '役職名',
  'Level': 'レベル',
  'Chairman / Chairperson': '会長',
  'CEO / President': 'CEO・社長',
  'General Manager / Director': '部長・ディレクター',
  'Section Chief / Manager': '課長・マネージャー',
  'Assistant Manager': '代理・アシスタントマネージャー',
  'Staff Member / Employee': '社員',
  'Intern': 'インターン',
  'Highest': '最高位',
  'Executive': '役員',
  'Senior Management': '上級管理職',
  'Mid Management': '中間管理職',
  'Junior Management': '下位管理職',
  'Entry Level': '一般社員',
  'Trainee': '研修生',
  'Addressing by Title': '役職で呼びかける',
  'In Korea, you address colleagues by their title + 님:': '韓国では、同僚を役職＋님で呼びます：',
  '. Only use a person\'s name if they explicitly invite you to. Using someone\'s first name in a business context without invitation is considered rude.': '。相手から明示的に招待された場合のみ名前を使いましょう。招待なしにビジネスの場で名前を使うのは失礼とみなされます。',
  'Meeting Vocabulary (회의 어휘)': '会議の語彙（회의 어휘）',
  'Korean business meetings (회의) are highly structured. Being able to participate actively — from requesting the floor to agreeing or disagreeing formally — is key to professional success.': '韓국のビジネス会議（회의）は高度に構造化されています。発言を求めることから公式に賛成・反対することまで、積극的に참加できることがプロとして成功する鍵です。',
  '📊 Key Meeting Phrases': '📊 会議の主要フレーズ',
  'Let us begin the meeting.': '会議を始めましょう。',
  'Does anyone have an opinion / question?': 'ご意見やご質問のある方はいらっしゃいますか？',
  'May I share my opinion?': '意見を申し上げてもよろしいでしょうか？',
  'I agree.': '同意いたします。',
  'I think we need to reconsider. (polite disagreement)': '再考が必要かと存じます。（丁寧な反対意見）',
  'I will check and get back to you.': '確認してからご回答いたします。',
  'That concludes our meeting.': '以上で会議を終了いたします。',
  'When shall we hold the next meeting?': '次回の会議はいつにしましょうか？',
  '📋 Meeting-Related Vocabulary': '📋 会議関連の語彙',
  'Meeting': '会議',
  'Agenda item': '議題',
  'Report': '報告書',
  'Presentation': 'プレゼンテーション',
  'Presentation (Konglish)': 'プレゼンテーション（コングリッシュ）',
  'Decision': '決定',
  'Deadline': '締め切り',
  'Budget': '予算',
  'Goal / Target': '目標',
  'Office Phrases (사무실 표현)': 'オフィスのフレーズ（사무실 표현）',
  'Everyday office communication in Korean requires specific polite expressions. These phrases help you navigate the workplace naturally and professionally.': '韓国語の日常的なオフィスコミュニケーションには特定の丁寧な表現が必要です。これらのフレーズで職場を自然かつプロフェッショナルに乗り切りましょう。',
  '🏢 Daily Office Communication': '🏢 日常のオフィスコミュニケーション',
  'Email & Written Communication (이메일)': 'メール・書面コミュニケーション（이메일）',
  'Korean business emails follow strict conventions. Always open with a respectful greeting, state your purpose clearly, and close with a polite sign-off. Written Korean uses more Sino-Korean (한자어) vocabulary than spoken Korean.': '韓国のビジネスメールは厳格な慣例に従います。常に敬意ある挨拶で始め、目的を明確に述べ、丁寧な結びで終えましょう。書き言葉の韓국語は話し言葉よりも漢字語（한자어）を多く使います。',
  '📧 Email Phrase Templates': '📧 メールフレーズテンプレート',
  'Opening': '書き出し',
  'Self-intro': '自己紹介',
  'Purpose': '目的',
  'Request': '依頼',
  'Closing': '結び',
  'Sign-off': '署名',
  'Dear [Name],': '拝啓、[お名前] 様',
  'I am [Name] from [Company].': '[会社]の[お名前]と申します。',
  'I am writing to you regarding ~.': '〜に関してご連絡申し上げます。',
  'I would be grateful if you could review this.': 'ご確認いただければ幸いです。',
  'I look forward to your continued support.': '今後ともよろしくお願いいたします。',
  'Thank you. Sincerely, [Name]': 'ありがとうございます。敬具、[お名前]',
  'When signing emails, use': 'メールの署名には',
  'dreim': '드림',
  '(e.g., 김민수 드림) for general professional sign-offs. Use': '（例：김민수 드림）を一般的なプロの結びに使います。',
  'ollim': '올림',
  'when writing to someone significantly senior — it expresses extra humility. Both mean "from" but differ in level of respect.': 'はかなり上位の方への手紙に使います — より謙遜を表します。どちらも「より」を意味しますが、敬意のレベルが異なります。',
  'Business Culture & Key Terms (비즈니스 문화)': 'ビジネス文化と主要用語（비즈니스 문화）',
  '🇰🇷 Essential Korean Business Culture Vocabulary': '🇰🇷 必須の韓国ビジネス文化語彙',
  'Term': '用語',
  'Context': '使う場面',
  'Social awareness / Reading the room': '空気を読む / 状況察知',
  'Quickly, quickly! / The Korean work ethic': '빨리빨리！/ 韓国の仕事倫理',
  'Company dinner / Work dinner': '会社の飲み会 / 職場の夕食',
  'Working overtime / Late-night work': '残業 / 夜遅くまで仕事',
  'Superior / Boss': '上司',
  'Junior / Senior (at work or school)': '후배 / 선배（職場や学校での）',
  'Power imbalance relationship (client-vendor / boss-employee)': '力関係（甲乙関係；クライアント-ベンダー / 上司-部下）',
  'Being able to sense unspoken expectations without being told explicitly': '明示されなくても暗黙の期待を察知できる能力',
  'Korea\'s famous speed-driven culture — things must be done fast and efficiently': '韓국の有名なスピード重視文化 — 物事は速く効率的に行わなければならない',
  'A team dinner where bonding and seniority dynamics are displayed; often involves 소주': '絆と年功序列のダイナミクスが現れるチームの飲み会；しばしば소주を伴う',
  'Common in Korean work culture; leaving before your boss can be seen as disrespectful': '韓国の職場文化で一般的；上司より先に帰ることは失礼とみなされることがある',
  'Always use honorific speech with 상사': '상사には常に敬語を使う',
  '선배 is treated with special respect; 후배 follows and assists': '선배は特別な敬意を持って扱われる；후배は後輩として従い補佐する',
  '갑 (Gap) = the party with power; 을 (Eul) = the party in a weaker position': '갑（甲）= 力のある側；을（乙）= 弱い立場の側',
  '✓ Mark Business Korean Complete': '✓ ビジネス韓国語を完了にする',

  // ── Classical Korean page ─────────────────────────────────────
  '📜 Advanced · Lesson 14': '📜 上級 · レッスン14',
  '⏱ 60 min read': '⏱ 60分読了',
  '🔖 History & Literature': '🔖 歴史と文学',
  '👁 5,203 views': '👁 5,203 閲覧',
  'Classical Korean': '古典韓国語',
  'Classical Korean (고전 한국어) refers to the literary and written language used before the 20th century, heavily influenced by': '古典韓国語（고전 한국어）とは、20世紀以前に使われた文語・書き言葉で、',
  'Chinese characters (한자, Hanja)': '漢字（한자、ハンジャ）',
  '. Understanding classical forms illuminates the deep roots of modern Korean vocabulary — over': 'の影響を強く受けています。古典的な形式を理解することで、現代韓国語語彙の深いルーツが明らかになります — 韓国語の語彙の',
  '60% of Korean words have Sino-Korean (한자어) origins': '60%以上が漢字語（한자어）起源',
  '. Knowing classical Korean gives you access to historical texts, poetry, and a deeper understanding of why modern Korean works the way it does.': 'です。古典韓国語を知ることで、歴史的なテキストや詩にアクセスでき、現代韓国語がなぜそのように機能するのかについてより深く理解できます。',
  'Introduction to Hanja (한자)': '漢字（한자）入門',
  'Hanja (한자) are Chinese characters that were used to write Korean before and alongside Hangul. While modern Korean primarily uses Hangul, hanja still appear in newspapers, academic texts, names, and legal documents. More importantly, understanding hanja roots unlocks the meaning of thousands of Korean words.': '漢字（한자）は、ハングル以前およびハングルと並行して韓国語を表記するのに使われた中国の文字です。現代韓国語は主にハングルを使いますが、漢字は新聞・学術テキスト・人名・法律文書にまだ登場します。さらに重要なのは、漢字の語根を理解することで何千もの韓国語の意味が解き明かされることです。',
  '📖 Why Hanja Matters for Modern Korean': '📖 漢字が現代韓国語に重要な理由',
  'Pronunciation': '発音',
  'Korean Words Using This Hanja': 'この漢字を使う韓国語',
  'Water': '水',
  'Study / Learning': '学習',
  'Love': '愛',
  'Country / Nation': '国 / 国家',
  'Person / Human': '人 / 人間',
  'Time / Hour': '時間 / 時',
  'The 60% Rule': '60%ルール',
  'Approximately 60% of Korean vocabulary comes from Sino-Korean (한자어) roots. This is why Korean learners who also know some Chinese or Japanese often find Korean vocabulary much easier to acquire — the underlying roots overlap significantly.': '韓国語語彙の約60%が漢字語（한자어）のルーツを持ちます。だからこそ、中国語や日本語も知っている韓国語学習者はしばしば韓国語の語彙をはるかに習得しやすいと感じます — 基底のルーツが大きく重なるからです。',
  'Sino-Korean vs. Native Korean (한자어 vs 순우리말)': '漢字語 vs 固有朝鮮語（한자어 vs 순우리말）',
  'Korean vocabulary is divided into three layers:': '韓国語語彙は三層に分かれています：',
  '순우리말': '純固有語（순우리말）',
  '(pure native Korean),': '（純粋な固有韓国語）、',
  '한자어': '漢字語（한자어）',
  '(Sino-Korean, from Chinese characters), and': '（漢字由来）、そして',
  '외래어': '外来語（외래어）',
  '(loanwords, mostly from English). Each layer carries different nuances.': '（外来語、主に英語から）。各層は異なるニュアンスを持ちます。',
  '🔍 Native Korean vs Sino-Korean Pairs': '🔍 固有韓국語 vs 漢字語 対比',
  'Native Korean (순우리말)': '固有韓国語（순우리말）',
  'Sino-Korean (한자어)': '漢字語（한자어）',
  'Key Difference': '主な違い',
  'Sky': '空',
  'Fire': '火',
  'Mountain': '山',
  '사랑 = emotional love; 애정 = deeper, literary attachment': '사랑 = 感情的な愛；애정 = より深い、文学的な愛着',
  '하늘 = everyday sky; 천 used in compounds: 천국 (heaven)': '하늘 = 日常の空；천は複合語に使用：천국（天国）',
  '불 = fire; 화 in compounds: 화재 (fire disaster), 화요일 (Tuesday)': '불 = 火；화は複合語に：화재（火災）、화요일（火曜日）',
  '물 = water; 수 in compounds: 수도 (water + road = capital), 수요일 (Wednesday)': '물 = 水；수は複合語に：수도（水道／首都）、수요일（水曜日）',
  'In this case, the Sino-Korean 산 replaced the native 뫼 over time': 'この場合、漢字語の산が時とともに固有語の뫼に取って代わりました',
  'Classical Grammar Patterns (고문 문법)': '古典文法パターン（고문 문법）',
  'Classical Korean texts use grammatical patterns that differ significantly from modern Korean. You will encounter these in historical documents, classical literature, and formal inscriptions. Understanding them gives you access to Korea\'s literary heritage.': '古典韓국語のテキストは現代韓国語と大きく異なる文法パターンを使います。歴史的文書・古典文学・正式な碑文でこれらに出会うことがあります。理解することで韓国の文学遺産にアクセスできます。',
  '📜 Key Classical Endings and Their Modern Equivalents': '📜 主要な古典語尾とその現代語相当形',
  'Classical Form': '古典形',
  'Modern Korean': '現代韓国語',
  '"Is" (declarative)': '「〜である」（宣言的）',
  'Declarative (I do...)': '宣言的（〜する）',
  'Exclamatory / poetic declaration': '感嘆 / 詩的な宣言',
  'Will / Shall (future intent)': '〜するだろう / 意志（未来）',
  'Honorific "to be" / exist': '尊敬語「いる / ある」',
  'Concession / contrast': '譲歩 / 対比',
  'Classical Text in Modern Life': '現代生活における古典テキスト',
  'Classical Korean endings still appear in modern literature, song lyrics, and formal speeches to convey poetic or elevated tone. K-drama historical shows (사극) use classical speech. Even popular songs sometimes use archaic forms like': '古典韓国語の語尾は現代文学・歌詞・公式スピーチに詩的または格調高い調子を伝えるため今も現れます。K-ドラマの時代劇（사극）では古典語を使います。人気の歌でさえ時に',
  'and': 'や',
  'for artistic effect.': 'などの古風な형式を芸術的効果のために使います。',
  'Classical Particles (고문 조사)': '古典助詞（고문 조사）',
  'Many classical Korean particles differ from their modern counterparts. Recognizing these is essential for reading historical texts, literature, and inscriptions.': '多くの古典韓国語の助詞は現代語の相当形と異なります。歴史的テキスト・文学・碑文を読む上でこれらを認識することが不可欠です。',
  '🔗 Classical vs Modern Particle Comparison': '🔗 古典助詞 vs 現代助詞 比較',
  'Classical': '古典形',
  'Modern Equivalent': '現代語相当',
  'Subject marker (unchanged)': '主格助詞（変化なし）',
  'Object marker (same)': '目的格助詞（同じ）',
  'Possessive (same character)': '所有格助詞（同じ文字）',
  'Listing / and (with honor)': '列挙 / 〜と（敬語付き）',
  'Location of action (from)': '動作の場所（〜から）',
  'By means of / direction': '手段 / 方向',
  'To (a person) — still sometimes used poetically': '（人）に — 今も詩的に使われることがある',
  'Important Historical & Literary Vocabulary (역사 어휘)': '重要な歴史・文学語彙（역사 어휘）',
  'These words appear frequently in historical dramas (사극), classical literature, and Korean cultural heritage texts. Knowing them enriches your understanding of Korean history and culture.': 'これらの言葉は歴史ドラマ（사극）・古典文学・韓国文化遺産のテキストに頻繁に登場します。知ることで韓국の歴史と文化の理解が深まります。',
  '🏯 Joseon Dynasty & Historical Korean Terms': '🏯 朝鮮王朝と歴史的な韓国語用語',
  'Hanja': '漢字',
  'King / Your Majesty': '王 / 陛下',
  'Retainer / Official / Vassal': '臣下 / 官僚 / 家臣',
  'The people / Common people': '民 / 庶民',
  'Joseon (1392–1897 Korean Dynasty)': '朝鮮（1392〜1897年の朝鮮王朝）',
  'Aristocratic class / Nobleman': '貴族階級 / 両班',
  'The Correct Sounds for Teaching the People': '訓民正音（民を教えるための正しい音）',
  'King Sejong the Great': '世宗大王',
  '임금 = older native term; 폐하 = Chinese-derived formal address': '임금 = より古い固有語；폐하 = 中国語由来の公式呼称',
  'Government official serving the king': '王に仕える官僚',
  'Used in historical texts; modern equivalent: 국민 (citizens)': '歴史的テキストで使用；現代語相当：국민（国民）',
  'The dynasty that created Hangul in 1443': '1443年にハングルを創制した王朝',
  'The ruling scholar-official class of the Joseon dynasty': '朝鮮王朝の支配的な学者・官僚階級',
  'Original name for the Hangul alphabet created by King Sejong in 1443': '1443年に世宗大王が창制したハングルの元の名称',
  'The inventor of Hangul (1397–1450); revered as Korea\'s greatest king': 'ハングルの発明者（1397〜1450年）；韓国最高の王として崇められる',
  'Key Classical Korean Texts (고전 문학)': '主要な古典韓国語テキスト（고전 문학）',
  'Korea has a rich tradition of classical literature. These works are foundations of Korean literary culture and are still studied in Korean schools today.': '韓国には豊かな古典文学の伝統があります。これらの作品は韓国の文学文化の基盤であり、今日の韓国の学校でも学ばれています。',
  '📚 Famous Classical Korean Works': '📚 有名な古典韓国語の作品',
  'Era': '時代',
  'Form': '形式',
  'Significance': '重要性',
  '1446 (Joseon)': '1446年（朝鮮）',
  '1445 (Joseon)': '1445年（朝鮮）',
  'Early 17th century (Joseon)': '17世紀初頭（朝鮮）',
  '17th–18th century (Joseon)': '17〜18世紀（朝鮮）',
  'Goryeo era (918–1392)': '高麗時代（918〜1392年）',
  'Scholarly document': '学術文書',
  'Goryeo Gayo (고려 가요) — folk song': '高麗歌謡（고려 가요）— 民謡',
  'Epic poem in Hangul': 'ハングルによる叙事詩',
  'Novel (소설)': '小説（소설）',
  'Pansori novel': 'パンソリ小説',
  'The original explanation of Hangul\'s creation; UNESCO Memory of the World': 'ハングル創制の元の説明書；ユネスコ世界記憶遺産',
  'Famous lament about longing and the beauty of nature; contains archaic Korean': '憧れと自然の美についての有名な哀歌；古風な韓国語を含む',
  'One of the first works written in Hangul; celebrates the founding of the Joseon dynasty': 'ハングルで書かれた最初の作品の一つ；朝鮮王朝の建国を称える',
  'Korea\'s first novel written in Hangul; story of a social rebel fighting injustice': '韓国초最初のハングルで書かれた小説；社会的反逆者が不正義と戦う物語',
  'Korea\'s most beloved classical love story; still adapted into films and K-dramas': '韓国で最も愛される古典的な恋愛物語；今も映画やK-ドラマに翻案される',
  'Classical Expressions Still Used Today (현대에 남은 고문 표현)': '現代でも使われる古典表現（현대에 남은 고문 표현）',
  'Some classical Korean phrases and expressions have survived into modern Korean and are used in formal speech, poetry, and literature. Recognizing them will enrich your Korean and impress native speakers.': '一部の古典韓国語のフレーズや表現が現代韓国語に生き残り、公式スピーチ・詩・文학で使われています。これらを認識することで韓국語が豊かになりネイティブスピーカーに感銘を与えます。',
  '🌸 Classical Expressions in Modern Korean': '🌸 現代韓국語に残る古典표현',
  '📜 Classical Proverbs (고전 속담)': '📜 古典ことわざ（고전 속담）',
  'Classical Proverb': '古典ことわざ',
  'Modern Reading': '現代語読み',
  'Is it not a joy to learn and review what you have learned? (Confucius — Analects)': '学んで時に習えば、また悦ばしからずや（孔子 — 論語）',
  'Among three walking together, there is always one who can be my teacher.': '三人行けば必ず我が師あり（孔子）',
  '✓ Mark Classical Korean Complete': '✓ 古典韓国語を完了にする',
  'Business Korean': 'ビジネス韓国語',
  'Korean Dialogues': '韓国語の会話',
  'Writing': 'ライティング',
  'Business Korean:': 'ビジネス韓국語：',
  'Classical Korean:': '古典韓国語：',
  // ── Dialogues page ────────────────────────────────────────
  // page meta
  '💬 All Levels · 40 Dialogues': '💬 全レベル · 40の会話',
  'Korean Dialogues:': '韓国語会話：',
  '🔖 Real-world Korean': '🔖 実用韓国語',
  '👁 14,820 views': '👁 14,820 回閲覧',
  'Forty complete, authentic Korean conversations across everyday situations — from self-introductions to job interviews, first dates to hospital visits. Every dialogue includes Korean text, romanization, and English. Audio buttons let you hear each line spoken naturally. Study them as scripts, then use them as templates for real conversations.': '日常のあらゆる場面を網羅した40の完全な韓国語会話 — 自己紹介から就職面接、初デートから病院まで。すべての会話に韓国語テキスト・ローマ字・日本語訳が付いています。音声ボタンで自然な発音を聴くことができます。スクリプトとして学び、実際の会話テンプレートとして活用してください。',

  // section headings
  'Introductions (소개)': '自己紹介（소개）',
  'Friends (친구)': '友達（친구）',
  'Invitations (초대)': '招待（초대）',
  'Family (가족)': '家族（가족）',
  'Shopping (쇼핑)': 'ショッピング（쇼핑）',
  'On a Date (데이트)': 'デート（데이트）',
  'At Work (직장에서)': '職場で（직장에서）',
  'School (학교)': '学校（학교）',
  'Food (음식)': '食べ物（음식）',
  'Health (건강)': '健康（건강）',
  'Transportation (교통)': '交通（교통）',

  // section intro paragraphs
  'The first words you say in Korean matter. Learn to introduce yourself naturally and exchange contact info the way Koreans actually do.': '韓国語で最初に口にする言葉はとても大切です。自然な自己紹介の仕方と、韓国人のような連絡先交換を学びましょう。',
  'Casual Korean between friends uses informal speech (반말). These dialogues show how Koreans catch up and make plans together.': '友達同士のカジュアルな韓国語は반말（タメ語）を使います。韓国人が近況報告をしたり一緒に計画を立てたりする様子をこの会話で学びましょう。',
  'Inviting someone to dinner or a wedding requires specific polite phrasing. Note how speech formality shifts between close friends and acquaintances.': '夕食や結婚式に誘う際は特定の丁寧な表現が必要です。親しい友人と知人の間で敬語レベルがどのように変わるかに注目してください。',
  'Family interactions are central to Korean daily life. These dialogues reflect the natural, warm informality of home conversations.': '家族との会話は韓国の日常生活の中心です。これらの会話は家庭でのナチュラルで温かいくだけた話し方を反映しています。',
  'Korean shopping culture spans traditional markets, department stores, and online apps. These 7 dialogues cover the most common retail situations.': '韓国のショッピング文化は伝統市場・デパート・オンラインアプリにまたがります。この7つの会話は最もよくある買い物シーンをカバーしています。',
  'Korean dating culture has its own rich vocabulary — from the blind date (소개팅) to confessing feelings (고백). These dialogues cover the full arc.': '韓国のデート文化には独自の豊かな語彙があります — 紹介デート（소개팅）から告白（고백）まで。これらの会話では恋愛の全プロセスをカバーします。',
  'Korean workplace culture is formal and hierarchical. These dialogues reflect real office conversations — from meetings to job interviews to the all-important company dinner (회식).': '韓国の職場文化はフォーマルで上下関係があります。これらの会話は会議・就職面接・重要な会社の食事会（회식）など実際のオフィス会話を反映しています。',
  'Academic Korean involves specific polite forms when speaking to teachers and the informal speech used between classmates.': '学術的な韓国語では先生に話すときの特定の敬語と、クラスメート間の반말が含まれます。',
  'Eating is a social ritual in Korea. From ordering in a restaurant to cooking with friends and calling in a delivery, these dialogues cover every food situation.': '食事は韓国では社交的な儀式です。レストランでの注文から友達と料理、デリバリー注文まで、あらゆる食事シーンをカバーします。',
  'Medical Korean can be critical in an emergency. Learn to describe symptoms clearly at a pharmacy, hospital, and when telling a friend you\'re unwell.': '緊急時には医療韓国語が重要になることがあります。薬局・病院・友人に体調不良を伝えるときの症状の表現を学びましょう。',
  'Korea\'s transport system is world-class. Whether you\'re in a taxi, on the subway, or boarding a plane, these dialogues prepare you for every journey.': '韓国の交通システムは世界トップクラスです。タクシー・地下鉄・飛行機搭乗など、あらゆる旅に備えましょう。',

  // dialogue headers — section 1 Introductions
  '💬 Dialogue #1 · Self-Introductions': '💬 会話 #1 · 自己紹介',
  '💬 Dialogue #2 · Exchanging Numbers': '💬 会話 #2 · 連絡先交換',

  // section 1 eng-lines
  'Hello! Nice to meet you. My name is Kim Minjun.': 'こんにちは！はじめまして。キム・ミンジュンと申します。',
  'Nice to meet you! I\'m Park Jiwoo. Where are you from?': 'はじめまして！パク・ジウです。どちらのご出身ですか？',
  'I\'m from the United States. What about you, Jiwoo?': 'アメリカ出身です。ジウさんは？',
  'I\'m from Seoul. When did you come to Korea?': 'ソウル出身です。いつ韓国に来られたんですか？',
  'I came last month. I\'m still diligently studying Korean.': '先月来ました。まだ一生懸命韓国語を勉強中です。',
  'Your Korean is really good! I look forward to getting to know you.': '韓国語がとても上手ですね！これからよろしくお願いします。',
  'Hey, would it be okay to exchange contact info?': 'あの、連絡先を交換してもいいですか？',
  'Of course! Do you use KakaoTalk?': 'もちろんです！カカオトーク使ってますか？',
  'Yes, I do. What\'s your KakaoTalk ID?': 'はい、使ってます。カカオトークのIDは何ですか？',
  'My ID is jiwoo1234. Please add me as a friend!': '私のIDはjiwoo1234です。友達追加してください！',
  'Just added you. Let\'s keep in touch!': 'たった今追加しました。またご連絡しましょう！',

  // dialogue headers — section 2 Friends
  '💬 Dialogue #3 · How Are You?': '💬 会話 #3 · 元気？',
  '💬 Dialogue #4 · Plans': '💬 会話 #4 · 予定',

  // section 2 eng-lines
  'Hey, long time no see! Have you been well?': 'やあ、久しぶり！元気だった？',
  'Eh, so-so. I\'ve been really busy lately. What about you?': 'うーん、まあまあかな。最近ずっと忙しくてさ。あなたは？',
  'Me too. I started a new job.': '私も。新しい仕事始めたんだ。',
  'Oh, really? Where? How is it?': 'え、本当に？どこ？どう？',
  'It\'s an IT company in Gangnam. It\'s tough but fun. Let\'s grab food sometime!': '江南にあるIT会社だよ。大変だけど楽しい。今度ご飯食べようよ！',
  'What are you doing this weekend?': '今週末は何するの？',
  'No plans yet. Why?': 'まだ予定ないよ。なんで？',
  'Want to go to Han River Park together? The weather looks like it\'ll be nice.': '漢江公園に一緒に行かない？天気良さそうだよ。',
  'Sounds good! What time should we meet?': 'いいね！何時に会う？',
  'How about 3 PM? Let\'s meet at Yeouido Station.': '午後3時はどう？汝矣島駅で会おうよ。',

  // dialogue headers — section 3 Invitations
  '💬 Dialogue #5 · Dinner Invitation': '💬 会話 #5 · 夕食の誘い',
  '💬 Dialogue #6 · Wedding Invitation': '💬 会話 #6 · 結婚式の招待',

  // section 3 eng-lines
  'Would you like to have dinner together this Friday?': '今週金曜日に一緒に夕食はどうですか？',
  'Sounds good! Where?': 'いいですね！どこで？',
  'There\'s a great samgyeopsal place near Gangnam Station.': '江南駅の近くに美味しいサムギョプサル屋があります。',
  'I love samgyeopsal! What time?': 'サムギョプサル大好きです！何時ですか？',
  'Is 7 PM okay? I\'ll make the reservation.': '夜7時でいいですか？私が予約しますね。',
  'This is a wedding invitation. I\'m getting married next month!': 'これは結婚式の招待状です。来月結婚します！',
  'Wow, really? Congratulations! Who with?': 'わあ、本当ですか？おめでとうございます！どなたとですか？',
  'It\'s someone I met at a blind date last year. Please definitely come!': '去年の紹介デートで出会った方です。必ず来てくださいね！',
  'Of course! Where is the venue? What would be a good gift?': 'もちろん！式場はどこですか？何がいいプレゼントになりますか？',
  'It\'s the Gangnam Wedding Hall, at 11 AM. Just a cash gift is plenty!': '江南ウェディングホールです、午前11時です。ご祝儀だけで十分ですよ！',

  // dialogue headers — section 4 Family
  '💬 Dialogue #7 · Coming Home': '💬 会話 #7 · 帰宅',
  '💬 Dialogue #8 · Waking Up': '💬 会話 #8 · 起床',

  // section 4 eng-lines
  'I\'m home! (lit. "I\'ve been out and returned")': 'ただいま！（直訳：「出かけて戻ってきました」）',
  'Welcome back! How was school today?': 'おかえり！今日学校はどうだった？',
  'It was fine. But I\'m hungry. Is there food?': '普通でした。でもお腹すいた。ご飯ある？',
  'Yeah, I made spicy pork. Wash up first, then eat.': 'うん、チェユクポックム作ったよ。先に洗ってから食べて。',
  'Okay! I have a lot of homework today, so I\'ll probably sleep early.': 'はい！今日は宿題が多いから、早く寝ると思います。',
  'Get up! You\'ll be late for school!': '起きて！学校に遅刻するよ！',
  'Just a little more... What time is it?': 'もう少しだけ...何時ですか？',
  'It\'s already 7:30. Get up quickly and wash.': 'もう7時半だよ。早く起きて洗顔して。',
  'Oh, really? (getting up) What about breakfast?': 'え、本当に？（起き上がりながら）朝ご飯は？',
  'It\'s on the dining table. Eat quickly and go. Will you be late tonight?': 'テーブルにあるよ。早く食べて行きなさい。今夜は遅くなる？',

  // dialogue headers — section 5 Shopping
  '💬 Dialogue #9 · Marketplace (전통시장)': '💬 会話 #9 · 市場（전통시장）',
  '💬 Dialogue #10 · Clothing Store': '💬 会話 #10 · 服屋',
  '💬 Dialogue #11 · Shoe Store': '💬 会話 #11 · 靴屋',
  '💬 Dialogue #12 · Electronics Store': '💬 会話 #12 · 電器店',
  '💬 Dialogue #13 · Furniture Store': '💬 会話 #13 · 家具店',
  '💬 Dialogue #14 · Cosmetics Store': '💬 会話 #14 · コスメ店',
  '💬 Dialogue #15 · Bookstore': '💬 会話 #15 · 書店',

  // section 5 eng-lines
  'Sir, how much are these apples?': 'おじさん、このリンゴいくらですか？',
  '5,000 won for ten.': '10個で5,000ウォンです。',
  'Could you give me a little discount?': '少し値引きしてもらえませんか？',
  'Hey, I\'m already giving it to you cheap. Okay, twelve for 5,000 won!': 'もう安くしてあげてるんですよ。じゃあ12個で5,000ウォンでどうです！',
  'Thank you! And one box of strawberries too, please.': 'ありがとうございます！イチゴも1箱ください。',
  'May I try on this jacket?': 'このジャケットを試着してもいいですか？',
  'Of course! What\'s your size?': 'もちろんです！サイズはいくつですか？',
  'Usually size M. (after trying) It\'s a bit big. Do you have S?': 'いつもMサイズです。（試着後）少し大きいです。Sはありますか？',
  'Yes, one moment. Shall I show you other colors? We have black and white.': 'はい、少々お待ちください。他の色もお見せしましょうか？黒と白があります。',
  'May I try these sneakers? My foot size is 265.': 'このスニーカーを試着してもいいですか？足のサイズは265です。',
  'One moment... Here you go. Please try them on.': '少々お待ちください...こちらです。試し履きしてみてください。',
  'The toe box is a bit uncomfortable. Do you have a wider option?': 'つま先が少し窮屈です。もっと幅広のものはありますか？',
  'We have a wide version of the same design. I\'ll bring it for you.': '同じデザインのワイド版があります。持ってきますね。',
  'I\'d like to change my phone. Can you recommend one? My budget is around 1,000,000 won.': 'スマートフォンを替えたいのですが、おすすめを教えてもらえますか？予算は100万ウォン程度です。',
  'How about the Galaxy S25? The camera is great and the battery lasts long.': 'ギャラクシーS25はいかがでしょうか？カメラが素晴らしくバッテリーも長持ちします。',
  'Is installment payment available?': '分割払いはできますか？',
  'Yes, 24-month interest-free installment is available.': 'はい、24回払い無金利の分割払いが可能です。',
  'I\'m looking for a desk. Something simple with drawers.': '机を探しています。シンプルで引き出し付きのものがいいです。',
  'This style is popular lately. Delivery is also free.': 'このスタイルが最近人気です。配送も無料ですよ。',
  'Is assembly available too? I don\'t think I can do it alone.': '組み立てサービスもありますか？一人ではできそうにないので。',
  'Yes, the assembly service is an extra 30,000 won.': 'はい、組み立てサービスは3万ウォン追加になります。',
  'I\'m looking for a sunscreen suited for oily skin.': '脂性肌に合う日焼け止めを探しています。',
  'This one is selling well lately. It\'s light without greasiness. Would you like to try the tester?': 'これが最近よく売れています。べたつかずさらっとしてます。テスターを試してみますか？',
  'It\'s nice! How much is it?': 'いいですね！おいくらですか？',
  'It\'s 30,000 won. Buy one now and we\'ll give you another one free!': '3万ウォンです。今1つ買ってくださればもう1つプレゼントします！',
  'Do you by any chance have Korean grammar books for foreigners?': '外国人向けの韓国語文法の本はありますか？',
  'Yes, the foreign language learning section is on the 2nd floor.': 'はい、外国語学習コーナーは2階にあります。',
  'Thanks. Also, do you have stock of the latest edition of this novel?': 'ありがとうございます。それと、この小説の最新版の在庫はありますか？',
  'I\'m sorry, it\'s sold out right now. If you order it, it\'ll take 3–5 days.': '申し訳ありませんが、今は品切れです。ご注文いただくと3〜5日かかります。',

  // dialogue headers — section 6 On a Date
  '💬 Dialogue #16 · Blind Date (소개팅)': '💬 会話 #16 · 紹介デート（소개팅）',
  '💬 Dialogue #17 · Movie Date': '💬 会話 #17 · 映画デート',
  '💬 Dialogue #18 · Park': '💬 会話 #18 · 公園',
  '💬 Dialogue #19 · Confessing (고백)': '💬 会話 #19 · 告白（고백）',
  '💬 Dialogue #20 · Rejection (거절)': '💬 会話 #20 · 断り（거절）',

  // section 6 eng-lines
  'Hello! I\'m Lee Junhyuk. Did I keep you waiting long?': 'こんにちは！イ・ジュニョクです。長くお待たせしましたか？',
  'Not at all! I just got here too. I\'m Choi Sua.': 'いいえ！私もたった今来たところです。チェ・スアです。',
  'The atmosphere here is nice. What will you have to drink?': 'ここの雰囲気いいですね。何を飲みますか？',
  'Iced Americano for me. By the way, what do you do for work?': 'アイスアメリカーノをください。ところで、お仕事は何をされていますか？',
  'I\'m a designer. What about you, Sua?': 'デザイナーです。スアさんは？',
  'Which movie shall we watch?': 'どの映画を見ましょうか？',
  'How about this romance film? I heard the ratings are high.': 'このラブストーリー映画はどうですか？評判が良いと聞きました。',
  'Sounds good! Shall we get popcorn too?': 'いいですね！ポップコーンも買いますか？',
  'Of course! Butter popcorn and cola, please. I\'ll pay.': 'もちろん！バターポップコーンとコーラをください。私が払います。',
  'I didn\'t know the cherry blossoms would be this beautiful. Do you come here often?': '桜がこんなに綺麗だとは思いませんでした。よく来るんですか？',
  'I come every spring. Walking relieves my stress. Do you like walking too, Junhyuk?': '毎春来ます。散歩するとストレスが発散されます。ジュニョクさんも散歩好きですか？',
  'Yes, especially along the Han River. Let\'s do a Han River picnic together next time!': 'はい、特に漢江沿いが好きです。今度一緒に漢江でピクニックしましょう！',
  'I\'m looking forward to it!': '楽しみにしています！',
  'Sua, there\'s actually something I\'d like to tell you.': 'スアさん、実はお話ししたいことがあるんです。',
  'What is it? Why do you have that expression?': '何ですか？なんでそんな表情してるんですか？',
  'I\'ve liked you since the day we first met. Will you go out with me?': '初めて会った日からずっと好きでした。付き合ってもらえますか？',
  'I... liked you too, Junhyuk. Yes!': '私も...ジュニョクさんのことが好きでした。はい！',
  'Really? I\'m so happy! I look forward to being with you.': '本当に？とても嬉しいです！これからよろしくお願いします。',
  'Jieun, I actually like you. Would you go out with me?': 'ジウンさん、実は好きです。付き合ってもらえますか？',
  'Thank you. But I\'m not thinking about dating right now. I\'m sorry.': 'ありがとうございます。でも今は交際するつもりがないんです。ごめんなさい。',
  'It\'s okay. Thank you for being honest. We can still be friends, right?': '大丈夫です。正直に言ってくれてありがとう。それでも友達でいられますよね？',
  'Of course. As long as it\'s not uncomfortable for you.': 'もちろんです。あなたが不都合でなければ。',

  // dialogue headers — section 7 At Work
  '💬 Dialogue #21 · Overtime Work (야근)': '💬 会話 #21 · 残業（야근）',
  '💬 Dialogue #22 · Meeting (회의)': '💬 会話 #22 · 会議（회의）',
  '💬 Dialogue #23 · Work Schedule': '💬 会話 #23 · 勤務スケジュール',
  '💬 Dialogue #24 · Getting a Job (취업 면접)': '💬 会話 #24 · 就職面接（취업 면접）',
  '💬 Dialogue #25 · Company Dinner (회식)': '💬 会話 #25 · 会社の食事会（회식）',

  // section 7 eng-lines
  'Are you working overtime again today?': '今日もまた残業ですか？',
  'Yes, I have a presentation tomorrow. Team lead, could you review these materials?': 'はい、明日発表があるんです。チームリーダー、この資料を確認していただけますか？',
  'Let me take a quick look. (reviews) There\'s a typo on page 3. Fix it.': 'ちょっと見てみるよ。（確認後）3ページに誤字があるよ。直して。',
  'Thank you! I\'m really worried about tomorrow\'s presentation.': 'ありがとうございます！明日の発表がとても心配です。',
  'You can do it. You\'ve prepared a lot. Fighting!': 'できるよ。たくさん準備したじゃないか。ファイティング！',
  'Alright, let\'s start the meeting. Please present last week\'s sales results.': 'では、会議を始めましょう。先週の売上結果を発表してください。',
  'Yes. Last week\'s sales increased by 15% compared to the previous week.': 'はい。先週の売上は前週比で15%増加しました。',
  'Well done. What target are we setting for this month?': 'よくやりました。今月の目標はどのように設定しますか？',
  'We\'ll target 20% growth. I\'ll report the progress every week.': '20%成長を目標にします。進捗は毎週報告いたします。',
  'What does your schedule look like this week?': '今週のスケジュールはどうなっていますか？',
  'Monday I have a team meeting, Wednesday an external meeting. Afternoons are relatively free.': '月曜日にチームミーティング、水曜日に外部ミーティングがあります。午後は比較的余裕があります。',
  'How about reviewing the documents together on Tuesday morning? At 10?': '火曜日の午前に一緒に資料を確認するのはどうですか？10時ですが。',
  'Yes, that works. Understood.': 'はい、大丈夫です。分かりました。',
  'Could you introduce yourself?': '自己紹介をしていただけますか？',
  'Yes. My name is Kim Minjun. I have 3 years of experience in marketing.': 'はい。キム・ミンジュンと申します。マーケティング分野で3年の経験があります。',
  'Why did you apply to our company?': 'なぜ弊社に応募されたのですか？',
  'I wanted to contribute to your company\'s innovative culture and global projects.': '御社の革新的な文化とグローバルプロジェクトに貢献したかったからです。',
  'Finally, do you have any questions?': '最後に、何かご質問はありますか？',
  'May I ask what the training program looks like after joining?': '入社後の研修プログラムについてお聞きしてもよいですか？',
  'Great work today everyone. Let\'s all go out for team dinner!': '今日は皆さんお疲れさまでした。みんなで食事に行きましょう！',
  'Sounds good! Where are we going?': 'いいですね！どこに行くんですか？',
  'How about the samgyeopsal place nearby? My treat!': '近くのサムギョプサル屋はどうですか？私がおごります！',
  'Thank you! Cheers!': 'ありがとうございます！乾杯！',

  // dialogue headers — section 8 School
  '💬 Dialogue #26 · Class': '💬 会話 #26 · 授業',
  '💬 Dialogue #27 · Exam (시험)': '💬 会話 #27 · 試験（시험）',

  // section 8 eng-lines
  'Teacher, could you explain this grammar again? I\'m confused.': '先生、この文法をもう一度説明していただけますか？混乱しています。',
  'Of course. Which part is difficult?': 'もちろんです。どの部分が難しいですか？',
  'I\'m confused about the difference between -아/어서 and -(으)니까.': '-아/어서と-(으)니까の違いが分からなくて混乱しています。',
  'Great question. -아/어서 is for sequence or objective reasons; -(으)니까 is for more subjective reasons.': 'いい質問です。-아/어서は順序や客観的な理由に使い、-(으)니까はより主観的な理由に使います。',
  'Ah, I understand now! Thank you.': 'ああ、今わかりました！ありがとうございます。',
  'How was yesterday\'s exam?': '昨日の試験はどうだった？',
  'It was so hard. I couldn\'t solve the last problem. What about you?': 'すごく難しかった。最後の問題が解けなかった。あなたは？',
  'Me too. I studied hard, but I got nervous at the actual test site.': '私も。一生懸命勉強したのに、いざ試験会場で緊張してしまった。',
  'When do the results come out? Waiting is even harder.': '結果はいつ出るの？待つ方がもっと辛い。',
  'I heard next Friday. Let\'s just forget about it and enjoy the weekend.': '来週金曜日だって。もう忘れて週末を楽しもうよ。',

  // dialogue headers — section 9 Food
  '💬 Dialogue #28 · Restaurant': '💬 会話 #28 · レストラン',
  '💬 Dialogue #29 · Coffee Shop': '💬 会話 #29 · カフェ',
  '💬 Dialogue #30 · Friend\'s House': '💬 会話 #30 · 友達の家',
  '💬 Dialogue #31 · Cooking Together': '💬 会話 #31 · 一緒に料理',
  '💬 Dialogue #32 · Ordering Delivery (배달 주문)': '💬 会話 #32 · デリバリー注文（배달 주문）',

  // section 9 eng-lines
  'Excuse me! May we order?': 'すみません！注文してもいいですか？',
  'Yes, what will you have?': 'はい、何になさいますか？',
  'One doenjang-jjigae and one spicy pork, please. And two bowls of rice too.': 'テンジャンチゲ一つとチェユクポックム一つください。ご飯も2つ。',
  'Understood. Please wait a moment.': 'かしこまりました。少々お待ちください。',
  'Hello! What would you like to order?': 'こんにちは！ご注文はお決まりですか？',
  'One tall iced café latte, please. Without sugar.': 'アイスカフェラテのトールサイズを一つください。砂糖なしで。',
  'For here or takeaway? What\'s your name?': 'こちらでお召し上がりですか、テイクアウトですか？お名前は？',
  'For here, please. My name is Minsu.': 'こちらでいただきます。名前はミンスです。',
  'Come in! Long time no see. Come inside.': '入って！久しぶりだね。入ってきて。',
  'Thanks. Your place is so pretty! Did you redecorate? I brought this for you.': 'ありがとう。お部屋すごく綺麗！模様替えしたの？これ買ってきたよ。',
  'Thanks! Are you hungry? I made japchae and braised short ribs.': 'ありがとう！お腹すいてる？チャプチェとカルビチムを作ったよ。',
  'Wow, it smells amazing just from here! Thanks for the meal.': 'わあ、ここからでも美味しそうな匂いがする！いただきます。',
  'What should we cook today?': '今日は何を作ろうか？',
  'How about bibimbap? I think we have all the vegetables.': 'ビビンバはどう？野菜が全部あると思うんだけど。',
  'Great! Can you slice the carrots and spinach? I\'ll make the gochujang sauce.': 'いいね！にんじんとほうれん草を切ってくれる？私はコチュジャンソースを作るね。',
  'Sure! It\'ll be even tastier with a fried egg on top!': 'うん！目玉焼きを乗せたらもっと美味しくなるよ！',
  'What should we order? Open Baemin (delivery app).': '何注文しようか？배민（デリバリーアプリ）開けてみて。',
  'How about pizza? Bulgogi pizza and a chicken set.': 'ピザはどう？プルコギピザとチキンセット。',
  'We need to meet the minimum order amount. Let\'s add a cola too.': '最低注文金額に合わせないとね。コーラも追加しよう。',
  'Okay! Delivery is 40 minutes they say. Let\'s order quickly, I\'m hungry!': 'オーケー！配達は40分かかるって。早く注文しよう、お腹すいた！',

  // dialogue headers — section 10 Health
  '💬 Dialogue #33 · Pharmacy (약국)': '💬 会話 #33 · 薬局（약국）',
  '💬 Dialogue #34 · Hospital (병원)': '💬 会話 #34 · 病院（병원）',
  '💬 Dialogue #35 · Not Feeling Well': '💬 会話 #35 · 体調不良',
  '📋 Common Symptom Phrases': '📋 よくある症状フレーズ',

  // section 10 eng-lines
  'Do you have headache medicine? I have a headache and runny nose.': '頭痛薬はありますか？頭も痛いし鼻水も出るんです。',
  'Then a general cold medicine would be better. This one works well.': 'では総合風邪薬の方がいいと思います。これがよく効きますよ。',
  'How many times a day should I take it?': '1日何回飲めばいいですか？',
  'Three times a day, 30 minutes after meals. And drink plenty of water.': '1日3回、食後30分に飲んでください。水もたくさん飲んでください。',
  'My throat has been very sore for 3 days. Can I be seen today?': '3日前から喉がとても痛いんです。今日診ていただけますか？',
  'Have you had a fever? Any other symptoms?': '熱はありましたか？他に症状はありますか？',
  'I\'ve had a mild fever since yesterday. Around 38 degrees. A slight cough too.': '昨日から微熱があります。38度くらいです。少し咳も出ます。',
  'Your tonsils are very swollen. I\'ll prescribe antibiotics. You should rest for two days.': '扁桃腺がかなり腫れていますね。抗生物質を処方します。2日間は休んだ方がいいです。',
  'Hey, you don\'t look well. Are you okay?': 'ねえ、顔色悪いよ。大丈夫？',
  'No, I\'ve had a terrible headache since this morning and feel nauseous.': 'ううん、今朝からひどい頭痛がして気持ち悪いんだ。',
  'Did you eat? Do you have medicine? Should I run to the convenience store?': 'ご飯食べた？薬ある？コンビニ行ってこようか？',
  'It\'s okay, I think I\'ll be fine with a bit of rest. Thanks for looking out for me.': '大丈夫、少し休んだら治ると思う。気にかけてくれてありがとう。',

  // symptom table meanings
  'I have a headache': '頭が痛いです',
  'My throat hurts': '喉が痛いです',
  'I have a fever': '熱があります',
  'I have a cough': '咳が出ます',
  'I feel nauseous / My stomach is unsettled': '気持ち悪いです／胃が不安定です',
  'It hurts here (point to the area)': 'ここが痛いです（部位を指して）',
  'I have an allergy': 'アレルギーがあります',

  // dialogue headers — section 11 Transportation
  '💬 Dialogue #36 · Taxi': '💬 会話 #36 · タクシー',
  '💬 Dialogue #37 · Bus': '💬 会話 #37 · バス',
  '💬 Dialogue #38 · Subway (지하철)': '💬 会話 #38 · 地下鉄（지하철）',
  '💬 Dialogue #39 · Airplane (비행기)': '💬 会話 #39 · 飛行機（비행기）',
  '💬 Dialogue #40 · Bicycle (자전거)': '💬 会話 #40 · 自転車（자전거）',
  '📋 Key Transport Vocabulary': '📋 主要交通語彙',

  // section 11 eng-lines
  'Driver, please take me to Insadong.': '運転手さん、仁寺洞まで行ってください。',
  'Yes, understood. About 15 minutes if there\'s no traffic.': 'はい、かしこまりました。渋滞がなければ15分ほどです。',
  'Do you accept card payment?': 'カード払いはできますか？',
  'Yes, we do. (arrives) We\'re here.': 'はい、できます。（到着）着きましたよ。',
  'Thank you, driver! Keep up the good work.': 'ありがとうございました、運転手さん！お仕事頑張ってください。',
  'Excuse me, does this bus go to Myeongdong?': 'すみません、このバスは明洞に行きますか？',
  'No, this goes toward Jongno. Take bus 402 from that stop over there.': 'いいえ、これは鍾路方面です。あちらのバス停から402番に乗ってください。',
  'Does the bus come frequently?': 'バスはよく来ますか？',
  'It comes every 10 minutes. It\'ll be here soon.': '10分ごとに来ます。すぐ来ますよ。',
  'How do I get to Hongdae Entrance Station?': '弘大入口駅へはどうやって行けばいいですか？',
  'Take Line 2. It\'s three stops. Exit through exit 9.': '2号線に乗ってください。3駅です。9番出口から出てください。',
  'What if I don\'t have a transit card?': '交通カードがなければどうすればいいですか？',
  'You can buy a single-use transit card with cash at the ticket machine over there.': 'あちらの発券機で現金を使って1回用交通カードを購入できます。',
  'Excuse me, I think my earphones aren\'t working. Can you replace them?': 'すみません、イヤホンが壊れているようです。交換していただけますか？',
  'I\'m sorry. I\'ll bring one right away. And a drink?': '申し訳ありません。すぐにお持ちします。お飲み物は？',
  'Orange juice, please. And I\'d appreciate an extra blanket too.': 'オレンジジュースをください。毛布もう1枚いただけると助かります。',
  'Of course. Please wait a moment.': 'もちろんです。少々お待ちください。',
  'Where can I rent a bicycle?': '自転車を借りられる場所はどこですか？',
  'Have you tried Ttareungi? It\'s Seoul\'s public bicycle system. You can rent through an app.': 'タルンイを使ったことがありますか？ソウルの公共自転車システムです。アプリから借りられます。',
  'How much is it? Can I rent it for the whole day?': 'いくらですか？1日中借りられますか？',
  'The first 30 min is 1,000 won, and there\'s also a day pass. You can return it to any station.': '最初の30分は1,000ウォンで、1日券もあります。どのステーションへでも返却できます。',

  // transport vocab table meanings
  '__ Station (attach station name)': '__駅（駅名を付けて使う）',
  'Exit number __ (e.g., 3번 출구 = Exit 3)': '__番出口（例：3번 출구 = 3番出口）',
  'Transfer (between lines or modes)': '乗り換え（路線または交通機関の切り替え）',
  'Bus / bicycle stop / station': 'バス／自転車停留所・駅',
  'To be congested / stuck in traffic': '渋滞している／渋滞にはまる',
  'To get off (bus / subway / taxi)': '降りる（バス／地下鉄／タクシー）',
  'To board / ride (any vehicle)': '乗る（あらゆる乗り物）',

  // mark complete button
  '✓ Mark Dialogues Complete': '✓ 会話レッスン完了にする',

  // ── culture/index.html — K-Culture Hub ───────────────────────────────
  'Overview · 전체 보기': '概要 · 전체 보기',
  'K-Pop, K-Drama, food, beauty, fashion, gaming, sports & traditions.': 'K-Pop、K-ドラマ、食べ物、美容、ファッション、ゲーム、スポーツ＆伝統。',

  // Hero
  'Korean Culture Hub': '韓国文化ハブ',
  'From K-Pop idols to spicy street food — explore the culture that\'s captivating the world and learn the Korean language through it.': 'K-Popアイドルからスパイシーな屋台グルメまで — 世界を虜にするその文化を探り、韓国語を学びましょう。',
  'Culture Topics': '文化トピック',
  'Deep-dive Guides': '深掘りガイド',
  'Countries Reached': '到達国数',
  'Korean Wave': '韓流',

  // Category grid
  'EXPLORE · 탐색하기': '探索する · 탐색하기',
  'All K-Culture Topics': 'K-カルチャーのすべてのトピック',
  'Pick a topic and dive deep — each guide covers history, vocabulary, dialogues, and cultural context to help you learn real Korean.': 'トピックを選んで深く掘り下げましょう — 各ガイドは歴史、語彙、会話、文化的背景を網羅し、本物の韓国語学習をサポートします。',

  'Music · 음악': '音楽 · 음악',
  'History, idols, agencies, generations, fan chants, slang, and vocabulary — learn Korean through the music the world loves.': '歴史、アイドル、芸能事務所、世代、ファンチャント、スラング、語彙 — 世界が愛する音楽で韓国語を学ぼう。',

  'Television · 드라마': 'テレビ · 드라마',
  'Drama history, genres, must-watch titles, speech levels, dialogue practice, and the fan culture behind Korea\'s biggest TV export.': 'ドラマの歴史、ジャンル、必見作品、敬語レベル、会話練習、そして韓国最大のテレビ輸出品の裏にあるファン文化。',

  'Cinema · 영화': '映画 · 영화',
  'From Parasite to Train to Busan — discover Korean cinema\'s directors, iconic films, genres, and the vocabulary to talk about them.': '「기생충」から「부산行」まで — 韓国映画の監督、名作、ジャンル、そしてそれらを語るための語彙を学ぼう。',

  'Food · 음식': '料理 · 음식',
  'Essential dishes, world-famous chefs, ordering phrases, street food, and 5 deep-dive guides: 라면, 만두, 치킨, K-BBQ, 김치.': '必須料理、世界的シェフ、注文フレーズ、屋台グルメ、そして5つの深掘りガイド：ラーメン、餃子、チキン、K-BBQ、キムチ。',

  'Beauty · 뷰티': '美容 · 뷰티',
  'The 10-step skincare routine, iconic brands, key ingredients, beauty trends, 피부과 culture, and shopping phrases.': '10ステップのスキンケアルーティン、アイコニックブランド、主要成分、ビューティートレンド、피부과（皮膚科）文化、ショッピングフレーズ。',

  'Fashion · 패션': 'ファッション · 패션',
  'Idol fashion, street-style aesthetics, Seoul Fashion Week, iconic brands, fashion districts, 한복, and shopping vocabulary.': 'アイドルファッション、ストリートスタイル美学、ソウルファッションウィーク、アイコニックブランド、ファッション地区、한복、ショッピング語彙。',

  'Culture · 한국 문화': '文化 · 한국 문화',
  '밥 obsession, 빠른 배달, 찜질방, MBTI fever, 군대 culture, 전세, outdoor drinking, and 100 essential Korean proverbs.': '밥（ご飯）へのこだわり、빠른 배달（超速配達）、찜질방（汗蒸幕）、MBTIブーム、軍隊文化、전세（チョンセ）、野外飲酒、そして韓国のことわざ100選。',

  'Gaming · 게임': 'ゲーム · 게임',
  'PC방 culture, esports legends, iconic games, streaming culture, esports leagues, gamer slang, and gaming vocabulary.': 'PCバン文化、eスポーツの伝説、名作ゲーム、ストリーミング文化、eスポーツリーグ、ゲーマースラング、ゲーム語彙。',

  'Sports · 스포츠': 'スポーツ · 스포츠',
  'Football and baseball heroes, marathon legends, traditional sports like taekwondo and ssireum, cheer chants, and vocabulary.': 'サッカーと野球の英雄、マラソンの伝説、テコンドーやシルムなどの伝統スポーツ、応援チャント、語彙。',

  // ── culture/kpop.html — K-Pop ─────────────────────────────────────────

  // Page header
  'From BTS to BLACKPINK — learn the language of K-Pop: fan chants, idol phrases, and the slang that unites the global fandom.': 'BTSからBLACKPINKまで — K-Popの言語を学ぼう：ファンチャント、アイドルフレーズ、グローバルなファンダムをつなぐスラング。',

  // K-Pop History section
  '📜 K-Pop History · K-팝 역사': '📜 K-Popの歴史 · K-팝 역사',
  'K-Pop is not just music — it is a cultural industry built over three decades, combining Korean passion for performance with global marketing strategy. Here is the full story, from the origins of 노래방 culture to BTS at the Grammys.': 'K-Popは単なる音楽ではありません — 30年にわたって構築された文化産業で、韓国人の熱いパフォーマンスへの情熱とグローバルなマーケティング戦略が融合したものです。노래방文化の起源からグラミー賞のBTSまで、その全貌をご紹介します。',

  // Norebang photo captions
  'The Korean Karaoke Room': '韓国式カラオケルーム',
  'Norebang & K-Pop': 'ノレバンとK-Pop',
  'How to Norebang': 'ノレバンの楽しみ方',
  '노래방 (nore-bang, "song room") are private karaoke rooms rented by the hour. Unlike Japanese karaoke bars where you sing in public, Korean norebang are private booths for friend groups — singing together without embarrassment.': '노래방（ノレバン、「歌部屋」）は時間単位で借りられる個室カラオケルームです。人前で歌う日本のカラオケバーとは違い、韓国のノレバンは友人グループのためのプライベートな個室 — 恥ずかしさなく一緒に歌えます。',
  '노래방 culture from the late 1980s created a nation of passionate singers and song lovers — the perfect fertile ground for the K-Pop explosion to follow. By 2000, Korea had over 35,000 norebang locations.': '1980年代後半の노래방文化は、熱狂的な歌い手と音楽ファンの国を作り上げました — その後のK-Pop爆発への完璧な土壌となりました。2000年までに韓国には35,000か所以上のノレバンが誕生しました。',
  'Groups rent a private room (1~2 hours), choose songs from a touchscreen catalog, sing with a microphone and tambourine, order fried chicken and drinks. It\'s a cornerstone of Korean social life from school to company dinners.': 'グループが個室（1〜2時間）を借り、タッチスクリーンのカタログから曲を選び、マイクとタンバリンで歌い、フライドチキンと飲み物を注文します。学校から会社の飲み会まで、韓国の社交生活の基盤です。',

  // Norebang vocabulary box
  '📚 노래방 핵심 어휘 — Norebang Vocabulary': '📚 노래방 핵심 어휘 — ノレバン語彙',
  'Song room / karaoke room': '歌部屋／カラオケルーム',
  'Song': '歌',
  'To sing (a song)': '（歌を）歌う',
  'Beat / rhythm': 'ビート／リズム',
  'Score / points': 'スコア／点数',
  'Song lyrics': '歌詞',

  // Comparison table
  'Category': 'カテゴリ',
  '🇺🇸 American Pop': '🇺🇸 アメリカンポップ',
  'Artist focus': 'アーティスト重点',
  'Individual singer / solo artists': '個人歌手 / ソロアーティスト',
  'Groups & solo artists': 'グループ＆ソロアーティスト',
  'Highly trained idol groups': '高度に訓練されたアイドルグループ',
  'Training system': 'トレーニングシステム',
  'Record deal after audition': 'オーディション後のレコード契約',
  'Agency training, 1–3 yrs': '事務所訓練、1〜3年',
  'Trainee system, 3–7+ yrs': 'トレーニー制度、3〜7年以上',
  'Dance style': 'ダンススタイル',
  'Varies; less choreography emphasis': '様々；振り付けの強調は少ない',
  'Synchronized, cute': 'シンクロ、かわいい',
  'Precision synchronized, high energy': '精密なシンクロ、高エネルギー',
  'Visual concept': 'ビジュアルコンセプト',
  'Artist-driven style': 'アーティスト主導のスタイル',
  'Kawaii / theatrical': 'かわいい / 演劇的',
  'Agency-defined concept per album era': '事務所定義のアルバムごとのコンセプト',
  'Fan engagement': 'ファンエンゲージメント',
  'Concert, streaming, social': 'コンサート、ストリーミング、SNS',
  'Handshake events, CDs': '握手会、CD',
  'Fan signs, Weverse, lightsticks, albums with photocards': 'ファンサイン、Weverse、ペンライト、フォトカード付きアルバム',
  'Language reach': '言語の到達範囲',
  'Globally dominant English': 'グローバルに支配的な英語',
  'Mainly Japanese market': '主に日本市場',
  'Korean + English; global streaming dominance': '韓国語＋英語；グローバルストリーミング支配',
  'Content engine': 'コンテンツエンジン',
  'Radio, Spotify, award shows': 'ラジオ、Spotify、アワードショー',
  'Oricon charts, anime tie-ins': 'オリコンチャート、アニメタイアップ',
  'YouTube MVs, TikTok, Weverse, Vlive, reality shows': 'YouTube MV、TikTok、Weverse、Vlive、リアリティ番組',
  'Key influence on K-Pop': 'K-Popへの主な影響',
  'Song structure, R&B, hip-hop': '曲構成、R&B、ヒップホップ',
  'Idol group format, fan culture': 'アイドルグループ形式、ファン文化',

  // Timeline heading
  '🏆 K-Pop History Timeline · 역사 타임라인': '🏆 K-Pop歴史年表 · 역사 타임라인',

  // Timeline year milestones
  '1992 ⭐ Milestone': '1992 ⭐ マイルストーン',
  '2012 ⭐ Milestone': '2012 ⭐ マイルストーン',
  '2018 ⭐ Milestone': '2018 ⭐ マイルストーン',
  '2020 ⭐ Milestone': '2020 ⭐ マイルストーン',
  '2021 ⭐ Milestone': '2021 ⭐ マイルストーン',

  // Timeline title text nodes (English spans / text before Korean spans)
  '노래방 arrives in Korea': 'ノレバンが韓国に登場',
  '— Birth of Modern K-Pop': '— 現代K-Popの誕生',
  '— 1st Generation Idols': '— 第1世代アイドル',
  '— 2nd Generation Global Push': '— 第2世代グローバル展開',
  '· Global Viral Phenomenon': '· グローバルバイラル現象',
  '— BTS, BLACKPINK, TWICE Era': '— BTS、BLACKPINK、TWICEの時代',
  'BTS at the United Nations': 'BTSの国連演説',
  'BTS "Dynamite" #1 on Billboard Hot 100': 'BTS「Dynamite」ビルボードホット100首位',
  'BTS Grammy Nomination + BLACKPINK\'s Record': 'BTSグラミーノミネート＋BLACKPINKの記録',
  '— New Generation Dominates': '— 新世代が席巻',

  // Timeline descriptions
  'The first 노래방 (song room / karaoke room) opens in Busan, adapted from Japan\'s karaoke concept. Within a decade, norebang becomes one of Korea\'s most popular social activities, nurturing a nation of music enthusiasts.': '初の노래방（歌部屋/カラオケルーム）が日本のカラオケ概念を取り入れ、釜山でオープンしました。10年以内にノレバンは韓国で最も人気の社交活動の一つとなり、音楽を愛する国の土台を作りました。',
  'Seo Taiji and Boys (서태지와 아이들) debut on live TV — judges give them the lowest score of the night. The public thinks otherwise: their single "난 알아요" tops charts for 17 consecutive weeks. They blend American hip-hop, rock, and Korean pop — permanently transforming Korean music.': '서태지와 아이들が生放送TVにデビューしましたが、審査員から最低点を付けられました。しかし大衆の反応は違いました — シングル「난 알아요」が17週連続でチャート1位を記録。アメリカのヒップホップ、ロック、韓国ポップを融合させ、韓国音楽を永遠に変えました。',
  'SM Entertainment\'s H.O.T. (1996) launches the idol group era. S.E.S., Fin.K.L, Shinhwa, g.o.d follow. The idol training system — years of dance, vocal, and language training before debut — is born. Korea\'s "Hallyu Wave" begins spreading to China and Southeast Asia.': 'SM엔터테인먼트のH.O.T.（1996年）がアイドルグループ時代を開始。S.E.S.、Fin.K.L、神話、g.o.dが続きました。数年間のダンス・ボーカル・語学トレーニングを経てデビューするアイドル育成システムが誕生。韓国の「韓流」が中国や東南アジアへ広がり始めました。',
  '동방신기 (TVXQ), 슈퍼주니어 (Super Junior), 소녀시대 (Girls\' Generation), 원더걸스 (Wonder Girls), 빅뱅 (BIGBANG), 2NE1, 샤이니 (SHINee) dominate. The Wonder Girls become the first K-Pop group to chart on the US Billboard Hot 100 in 2009.': '동방신기、슈퍼주니어、소녀시대、원더걸스、빅뱅、2NE1、샤이니が席巻しました。원더걸스は2009年に米国ビルボードホット100にチャートインした最初のK-Popグループとなりました。',
  '"강남스타일" (Gangnam Style) by PSY (박재상) becomes the first YouTube video to reach 1 billion views. The horse-dance becomes a global meme; PSY performs at the UN and the White House. The world finally knows Korea makes music — and it\'s infectious. K-Pop\'s commercial potential becomes undeniable.': '「강남스타일」がYouTube初の10億再生動画になりました。馬ダンスが世界的ミームとなり、PSYは国連とホワイトハウスで公演。世界がついに韓国の音楽を知り、K-Popの商業的可能性が無視できなくなりました。',
  '방탄소년단 (BTS) debuts in 2013 under smaller label Big Hit. Despite no major TV promotion, they build a global fanbase "ARMY" through genuine social media presence. 블랙핑크 (BLACKPINK) debuts in 2016 under YG. 트와이스 (TWICE) under JYP redefines the girl group. 엑소 (EXO) becomes SM\'s global powerhouse.': 'BTS（방탄소년단）が2013年に中小レーベルのBig Hitからデビュー。主要TV宣伝なしに、真摯なSNS活動でグローバルファンダム「ARMY」を構築。BLACKPINK（블랙핑크）が2016年にYGからデビュー。TRICEがJYPの新基準を作り、EXOがSMのグローバル主力になりました。',
  'BTS leader RM delivers a speech at the United Nations General Assembly in New York, becoming the first K-Pop group to address the UN. BTS becomes the first Korean act to top the US Billboard 200 chart with "Love Yourself: Tear" — a historic achievement for non-English music.': 'BTSのリーダーRMがニューヨークの国連総会で演説し、国連に登壇した初のK-Popグループとなりました。BTSは「Love Yourself: Tear」で米国ビルボード200首位を記録した最初の韓国人アーティストとなり、非英語圏音楽として歴史的な快挙を達成しました。',
  '"Dynamite" — BTS\'s first all-English single — debuts at #1 on the Billboard Hot 100, making them the first Korean act to top the chart. Amid COVID-19, the song becomes a global anthem of joy. BTS is officially the world\'s biggest music act by social media metrics.': '「Dynamite」— BTS初の全英語シングル — がビルボードホット100の1位でデビューし、同チャートを制覇した初の韓国人アーティストとなりました。COVID-19の中、この曲は世界的な喜びの歌となりました。BTSはSNS指標で世界最大の音楽アクトとなりました。',
  'BTS receives their first Grammy nomination for Best Pop Duo/Group Performance. BLACKPINK\'s "How You Like That" breaks multiple YouTube records. K-Pop becomes a recognized category in global music industry discussions. Korea\'s music exports exceed $700 million USD annually.': 'BTSが「Best Pop Duo/Group Performance」部門で初のグラミーノミネートを受賞。BLACKPINKの「How You Like That」が複数のYouTube記録を更新。K-Popがグローバル音楽業界の正式なカテゴリとして認知され、韓国の音楽輸出額が年間7億ドルを超えました。',
  '뉴진스 (NewJeans), 아이브 (IVE), 르세라핌 (LE SSERAFIM), 에스파 (aespa), 스트레이 키즈 (Stray Kids), ATEEZ push K-Pop into new sonic and visual territories. Fourth-gen idols are younger, more self-produced, and more culturally cross-genre than ever before.': '뉴진스、아이브、르세라핌、에스파、스트레이 키즈、ATEEZがK-Popを新たなサウンドとビジュアルの領域へ。第4世代アイドルはより若く、より自主制作型で、これまで以上に様々なジャンルを横断しています。',

  // Timeline photo captions
  'Gangnam Style Breaks YouTube': '강남スタイルがYouTubeを塗り替えた',
  'PSY\'s 강남스타일 was the first video to 1 billion views (Jul 2012), then 2 billion (2014). YouTube had to upgrade its view counter from a 32-bit integer — it literally couldn\'t count that high.': 'PSYの강남ス타일は2012年7月にYouTube初の10億再生動画となり、2014年には20億再生を達成。YouTubeは32ビット整数の再生カウンターをアップグレードしなければなりませんでした — 文字通りその数を数えられなかったのです。',
  'BTS at the United Nations': 'BTSの国連演説',
  'RM\'s 2018 UN address, "Speak Yourself," urged youth worldwide to find their own voice. BTS became the first musical act in decades to address the UN General Assembly.': 'RMの2018年国連演説「Speak Yourself」は世界中の若者に自分の声を見つけるよう呼びかけました。BTSは数十年ぶりに国連総会で演説した初の音楽グループとなりました。',
  'K-Pop Goes Global': 'K-Popが世界へ',
  'By 2023, K-Pop is a $10 billion global industry. Korean artists top charts in over 100 countries. K-Pop fan communities exist on every continent — from Brazil to Nigeria to Indonesia.': '2023年までにK-Popは100億ドル規模のグローバル産業に。韓国のアーティストが100か国以上でチャートを席巻。ブラジルからナイジェリア、インドネシアまで、あらゆる大陸にK-Popファンコミュニティが存在します。',

  // Agencies section
  '🏢 Entertainment Agencies · 연예기획사': '🏢 芸能事務所 · 연예기획사',
  'Behind every K-Pop group is an entertainment company that trains, produces, and manages them. These agencies define each group\'s concept, sound, and visual identity — and their CEOs are powerful cultural figures in their own right.': 'すべてのK-Popグループの背後には、彼らをトレーニングし、プロデュースし、マネジメントする芸能事務所があります。これらの事務所が各グループのコンセプト、サウンド、ビジュアルアイデンティティを決定します — そしてそのCEOたちは独自に強力な文化的人物です。',
  'Founded 1995 by Lee Soo-man · "The Big 3"': '1995年 イ・スマン設立 · 「ビッグ3」',
  'The pioneer and architect of the K-Pop idol system. SM is known for its signature polished "SM Sound" — sophisticated harmonies, precision choreography, and high-budget visuals. SM introduced the idol factory model that the entire industry follows today.': 'K-Popアイドルシステムの先駆者にして設計者。SMは洗練された「SMサウンド」— 精巧なハーモニー、精密な振り付け、高予算ビジュアルで知られています。業界全体が今日も踏襲するアイドルファクトリーモデルを確立しました。',
  'Representative Artists': '代表アーティスト',
  'Founded 1996 by Yang Hyun-suk · "The Big 3"': '1996年 ヤン・ヒョンソク設立 · 「ビッグ3」',
  'YG\'s identity is hip-hop, swag, and musical authenticity. Unlike SM\'s polished concept, YG artists have more freedom in creative expression and self-production. YG artists are known for their individual personalities and genre-blending music.': 'YGのアイデンティティはヒップホップ、スワッグ、音楽的真正性です。SMの洗練されたコンセプトとは異なり、YGのアーティストはクリエイティブな表現と自主制作においてより多くの自由を持ちます。',
  'Founded 1997 by Park Jin-young · "The Big 3"': '1997年 パク・ジニョン設立 · 「ビッグ3」',
  'JYP is the cheerful, personality-driven agency. Its acts are known for bright concepts, catchy pop hooks, strong dance focus, and an emphasis on showing genuine personality. JYP has had massive success across generations of idol groups.': 'JYPは明るく個性重視の事務所です。所属アーティストは明るいコンセプト、キャッチーなポップフック、強力なダンス、そして本物の個性を見せることで知られています。JYPは世代を超えて数多くのアイドルグループで大きな成功を収めています。',
  'Founded 2005 by Bang Si-hyuk · "The Big 4"': '2005年 パン・シヒョク設立 · 「ビッグ4」',
  'HYBE (formerly Big Hit Entertainment) transformed from a small studio into K-Pop\'s largest company through BTS. Known for deep narrative storytelling (the BTS Universe), cross-genre experimentation, and aggressive international expansion through acquisitions of US labels.': 'HYBE（旧ビッグヒット・エンターテインメント）はBTSを通じて小さなスタジオからK-Pop最大企業へと成長しました。BTSユニバースに代表される深い物語的ストーリーテリング、ジャンルを超えた実験、米国レーベルの買収による積極的な国際展開で知られています。',
  'Founded 2009 (relaunched) · Mid-tier powerhouse': '2009年（再スタート） · 中堅有力事務所',
  'Starship has quietly built an impressive roster across generations. Known for sophisticated girl groups and performance-focused boy groups, Starship punches above its weight class and has produced multiple chart-topping acts without Big 3/4 backing.': 'スターシップは世代を超えて印象的なラインナップを静かに構築してきました。洗練されたガールグループとパフォーマンス重視のボーイグループで知られ、ビッグ4の支援なしに複数のチャートトップアクトを輩出しています。',
  'Founded 2008 by Hong Seung-sung · Former VP of JYP': '2008年 ホン・スンソン設立 · 元JYP副社長',
  'Founded by a former JYP executive, Cube has a reputation for creating diverse, talented artists across genres. Known for supporting artists with strong vocal and acting abilities alongside performance skills.': '元JYP役員が設立したキューブは、様々なジャンルにわたって多様で才能あるアーティストを育成することで知られています。ボーカルと演技力の強いアーティストをパフォーマンス能力と共に支援することで有名です。',

  // Agency CEO bios
  'Dubbed the "Father of K-Pop." A former pop singer turned music producer, he engineered the idol training system and international expansion strategy. Known for his perfectionist standards and systematic approach to creating stars.': '「K-Popの父」と呼ばれる。元ポップ歌手から音楽プロデューサーに転身し、アイドル育成システムと国際展開戦略を構築。スターを生み出す完璧主義的な基準と体系的なアプローチで知られています。',
  'Former member of 서태지와 아이들, Korea\'s first modern idol group. As CEO, he prioritized musical substance over visual perfection — and gave artists like G-Dragon creative control that was unheard of at other agencies.': '韓国初の現代アイドルグループ、서태지와 아이들の元メンバー。CEOとしてビジュアルの完璧さより音楽的内容を優先し、G-Dragonのような아티스트에게に他の事務所では考えられなかったクリエイティブコントロールを与えました。',
  'A legendary producer and performer himself (the "Pied Piper of Korea"). Famous for personally appearing in music videos and ads, for auditioning every trainee, and for his philosophy: "talent, looks, and attitude" in that order.': '自身も伝説的なプロデューサーでありパフォーマー（「韓国のハーメルンの笛吹き」）。MVやCMに自ら出演し、すべてのトレーニーをオーディションすることで有名。その哲学は「才能、外見、態度」の順。',
  'A music producer background (worked at JYP), founded Big Hit in 2005. Recognized BTS\'s potential when no major agency would sign them. His artist-centric philosophy — letting BTS write their own music, tell their own stories — changed K-Pop forever. HYBE is now publicly listed on the Korean Stock Exchange.': '音楽プロデューサー出身（JYP勤務経験あり）、2005年にビッグヒットを設立。大手事務所がサインしなかったBTSの可能性を見出しました。BTSが自分たちの音楽を書き、自分たちのストーリーを語ることを許すアーティスト中心の哲学でK-Popを永遠に変えました。HYBEは現在韓国証券取引所に上場しています。',
  'Built Starship from a mid-tier label into a major player. 아이브 (IVE)\'s global success (2022–present) validated Starship\'s strategy of refined, quality-over-quantity artist development.': 'スターシップを中堅レーベルから主要企業へと成長させました。아이브（IVE）のグローバルな成功（2022年〜現在）が、洗練された量より質のアーティスト育成戦略を実証しました。',
  'Former JYP VP who took the JYP philosophy of artist development and built his own roster. Cube is known for giving artists a degree of creative freedom that distinguishes their acts from more rigid label systems.': 'JYPの元副社長で、JYPのアーティスト育成哲学を持ち込み独自のラインナップを構築。キューブはアーティストに他の事務所より自由なクリエイティブな自由を与えることで知られています。',

  // Agency tip box
  '빅3 → 빅4 — The Big 3 Became the Big 4': '빅3 → 빅4 — ビッグ3がビッグ4に',
  'SM, YG, and JYP were long known as the "빅3" (Big 3) of K-Pop. When Big Hit (now HYBE) achieved global dominance through BTS and went public in 2020 at a valuation of over $4 billion USD, the industry officially recognized four major agencies — making it the "빅4."': 'SM、YG、JYPは長らくK-Popの「빅3（ビッグ3）」として知られていました。ビッグヒット（現HYBE）がBTSを通じてグローバルな覇権を確立し、2020年に40億ドル以上の企業価値で上場すると、業界は4つの主要事務所を公式に認め「빅4」となりました。',

  // Agency vocab box
  '📚 연예기획사 핵심 어휘 — Agency Vocabulary': '📚 연예기획사 핵심 어휘 — 事務所語彙',
  'Entertainment agency / company': '芸能事務所 / 会社',
  'Trainee': 'トレーニー',
  'Contract': '契約',
  'Affiliated with / belonging to': '所属する',
  'Representative / CEO': '代表 / CEO',
  'Training': 'トレーニング',

  // Generations section
  '⭐ K-Pop Idol Generations · 세대별 아이돌': '⭐ K-Popアイドルの世代 · 세대별 아이돌',
  'K-Pop fans and historians divide idol groups into generations based on debut year, musical style, and cultural impact. Each generation built on the last — and the 4th generation is currently rewriting the rulebook again.': 'K-Popファンや研究者は、デビュー年、音楽スタイル、文化的影響力によってアイドルグループを世代に分けています。各世代はその前の世代の上に構築され、現在4世代が再びルールブックを書き換えています。',
  '1st Generation · 1세대': '第1世代 · 1세대',
  'The Pioneers': '先駆者たち',
  'Defined by the shift from trot/ballad to Western-influenced pop and hip-hop. Idols were packaged into groups with specific roles (leader, vocalist, dancer). Fan culture (lightsticks, fan clubs, fan letters) was born. Hallyu began spreading to China and Japan.': 'トロット/バラードから西洋的なポップとヒップホップへのシフトが特徴です。アイドルは特定の役割（リーダー、ボーカル、ダンサー）を持つグループとして構成されました。ファン文化（ペンライト、ファンクラブ、ファンレター）が誕生。韓流が中国と日本へ広がり始めました。',
  '2nd Generation · 2세대': '第2世代 · 2세대',
  'The Hallyu Wave': '韓流の波',
  'Groups became larger (Super Junior: 13 members), more visually polished, and internationally touring. YouTube and early social media amplified reach. This generation conquered Japan and Southeast Asia. Group concepts (e.g., "cute" vs "strong") became more defined.': 'グループはより大きくなり（슈퍼주니어：13名）、ビジュアルがさらに洗練され、国際ツアーが拡大しました。YouTubeと初期SNSが影響力を拡大。この世代は日本と東南アジアを制覇し、グループコンセプト（例：「かわいい」vs「力強い」）がより明確になりました。',
  '3rd Generation · 3세대': '第3世代 · 3세대',
  'The Global Breakthrough': 'グローバルブレイクスルー',
  'K-Pop transcended Asia and became a global phenomenon. BTS built a fanbase through authentic storytelling and social media. BLACKPINK broke YouTube records. Weverse, fan sign events, and digital album culture deepened fan-idol relationships. World Tours became standard.': 'K-Popはアジアを超えてグローバルな現象となりました。BTSは真摯なストーリーテリングとSNSでファンダムを構築。BLACKPINKはYouTube記録を塗り替えました。Weverse、ファンサインイベント、デジタルアルバム文化がファンとアイドルの関係を深め、ワールドツアーが標準となりました。',
  '4th Generation · 4세대': '第4世代 · 4세대',
  'The New Wave': 'ニューウェーブ',
  'Marked by younger idols, more self-production, genre experimentation, and a blurring of cultural boundaries. Many 4th gen artists are multilingual from debut. TikTok and short-form video have replaced TV music shows as the primary discovery platform. Concepts are bolder and more conceptually complex.': 'より若いアイドル、より多くの自主制作、ジャンル実験、文化的境界の融合が特徴です。多くの4世代アーティストはデビュー時から多言語対応。TikTokとショート動画がTV音楽番組に代わる主要発見プラットフォームになりました。コンセプトはより大胆で概念的に複雑になっています。',

  // Generations photo captions
  'H.O.T. — Korea\'s First Idol Group': 'H.O.T. — 韓国初のアイドルグループ',
  'H.O.T. (High-five Of Teenagers) debuted in 1996 under SM Entertainment, launching Korea\'s modern idol era. Their fan club "Club H.O.T." introduced white balloons as fan symbols — a tradition that evolved into today\'s official lightstick culture.': 'H.O.T.（ハイファイブ・オブ・ティーンエイジャーズ）は1996年にSMエンターテインメントからデビューし、韓国の現代アイドル時代を開きました。ファンクラブ「Club H.O.T.」は白い風船をファンのシンボルとして導入し、この伝統が今日の公式ペンライト文化へと発展しました。',
  'BTS — The Global Standard': 'BTS — グローバルスタンダード',
  'Debuting in 2013, BTS redefined what a K-Pop group could achieve — Billboard #1, Grammy nominations, UN speeches, White House meetings. Their fanbase ARMY (Adorable Representative MC for Youth) is recognized as one of the most organized fandoms in history.': '2013年にデビューしたBTSは、K-Popグループが達成できることを再定義しました — ビルボード1位、グラミーノミネート、国連演説、ホワイトハウス訪問。ファンダムARMY（Adorable Representative MC for Youth）は歴史上最も組織化されたファンダムの一つとして認められています。',
  '4th Gen — Cool, Not Cute': '第4世代 — クール、かわいいではなく',
  '뉴진스 (NewJeans) broke all debut records in 2022. Their Y2K-aesthetic and genre-blending (R&B, pop, Jersey club) signaled 4th gen\'s shift away from "idol concept" toward authentic artistic identity — a trend reshaping the entire industry.': '뉴진스（NewJeans）は2022年にすべてのデビュー記録を塗り替えました。Y2K美学とジャンル融合（R&B、ポップ、ジャージークラブ）は、4世代が「アイドルコンセプト」から真の芸術的アイデンティティへシフトしていることを示し、業界全体を再編するトレンドとなっています。',

  // Generation vocab box
  '📚 세대별 핵심 어휘 — Generation Vocabulary': '📚 세대별 핵심 어휘 — 世代語彙',
  'Generation': '世代',
  'Senior (debuted earlier)': '先輩（先にデビューした）',
  'Junior (debuted later)': '後輩（後でデビューした）',
  'Korean Wave / Hallyu': '韓流',
  'Popularity': '人気',
  'Fan club': 'ファンクラブ',

  // Music Genres section
  '🎼 Music Genres · 음악 장르': '🎼 音楽ジャンル · 음악 장르',
  'Korean popular music spans far beyond idol pop. Understanding the full genre landscape reveals a rich musical culture with deep roots in tradition and bold innovation.': '韓国の大衆音楽はアイドルポップをはるかに超えています。全ジャンルの生態系を理解することで、伝統に深く根ざしながら大胆に革新する豊かな音楽文化が見えてきます。',
  'Idol Pop (아이돌 음악)': 'アイドルポップ（아이돌 음악）',
  'The backbone of K-Pop: perfectly produced pop songs with synchronized dance routines, visual concepts, and high production value. Sub-genres include bubblegum pop, concept-pop, and performance-pop. SM, YG, JYP, and HYBE dominate this space.': 'K-Popの根幹：シンクロした振り付け、ビジュアルコンセプト、高い制作価値を持つ完璧に制作されたポップソング。サブジャンルにはバブルガムポップ、コンセプトポップ、パフォーマンスポップがあります。SM、YG、JYP、HYBEがこの分野を支配しています。',
  'Ballad (발라드)': 'バラード（발라드）',
  'Korea\'s most beloved genre — slow, emotional songs built on piano, strings, and powerful vocals. Korean ballads (발라드) dominate streaming in Korea more than idol pop. They are the go-to music for emotional moments, heartbreak, and norebang.': '韓国で最も愛されるジャンル — ピアノ、弦楽器、強力なボーカルで構成されたスロウで感情豊かな曲。韓国バラード（발라드）はアイドルポップよりも韓国のストリーミングを支配しています。感動的な瞬間、失恋、ノレバンにかかせない音楽です。',
  'Trot (트로트)': 'トロット（트로트）',
  'Korea\'s oldest pop genre — upbeat, bouncy rhythms with a distinctive "뽕짝" (bbong-jjak) beat. Trot dominated Korean music from the 1920s–1970s. After a decline, it experienced a massive revival through TV survival shows like "미스터 트롯" (Mr. Trot) in 2020, attracting a new young fanbase.': '韓国最古のポップジャンル — 独特の「뽕짝」ビートを持つアップビートでバウンシーなリズム。1920〜70年代に韓国音楽を席巻した後、2020年の「미스터 트롯」（ミスタートロット）などのTV서바이벌番組を通じて新しい若いファン層を引き付け、大復活を遂げました。',
  'Hip-Hop (힙합)': 'ヒップホップ（힙합）',
  'Korean hip-hop began with Seo Taiji\'s rap verses in 1992 and grew into a thriving underground then mainstream scene. TV show "쇼 미 더 머니" (Show Me the Money) made Korean hip-hop mainstream from 2012 onwards, launching countless careers.': '韓国ヒップホップは1992年のソ・テジのラップから始まり、地下シーンから主流へと成長しました。TVショー「쇼 미 더 머니」が2012年以降に韓国ヒップホップを主流にし、無数のキャリアを生み出しました。',
  'R&B / Soul': 'R&B / ソウル',
  'Korean R&B has produced a sophisticated, internationally acclaimed scene. Often blending lo-fi production with introspective lyricism, Korean R&B artists have massive followings in the US and Europe without relying on the idol machine.': '韓国R&Bは洗練された国際的に高く評価されるシーンを生み出しました。ローファイプロダクションと内省的な歌詞を融合させ、アイドルシステムに頼らずに米国やヨーロッパで大きなフォロワーを持つアーティストを輩出しています。',
  'Indie / Alternative (인디)': 'インディー / オルタナティブ（인디）',
  'Korea\'s indie music scene is centered in Hongdae (홍대) in Seoul — home to live music clubs, experimental artists, and DIY culture. Korean indie covers everything from folk to shoegaze to jazz-pop. Platforms like MelOn and Bugs help indie artists reach wider audiences.': '韓国インディー音楽シーンの中心はソウルの弘大（홍대）— ライブミュージッククラブ、実験的アーティスト、DIY文化の本拠地です。フォークからシューゲイザー、ジャズポップまであらゆるものをカバーします。MelOnやBugsなどのプラットフォームがインディーアーティストのリーチ拡大を支援しています。',
  'Dance / Electronic (댄스)': 'ダンス / 電子音楽（댄스）',
  'Beyond idol pop, Korea has a thriving club and dance music scene. Electronic dance music (EDM), house, and techno are popular in Seoul clubs. Festival culture (Ultra Korea, World DJ Festival) has grown significantly, and Korean producers are gaining global attention.': 'アイドルポップを超えて、韓国には活発なクラブとダンス音楽シーンがあります。EDM、ハウス、テクノがソウルのクラブで人気です。フェスティバル文化（ウルトラコリア、ワールドDJフェスティバル）が大きく成長し、韓国のプロデューサーが世界的な注目を集めています。',
  'Classical Fusion (국악 융합)': '伝統音楽フュージョン（국악 융합）',
  'Traditional Korean instruments (가야금 gayageum, 해금 haegeum, 대금 daegeum) are being fused with modern pop, hip-hop, and electronic music. Acts like 이날치 (Leenalchi) went viral globally by blending traditional pansori vocals with funky bass — and were featured in Korean tourism campaigns.': '伝統的な韓国楽器（가야금、해금、대금）が現代ポップ、ヒップホップ、電子音楽と融合されています。이날치（Leenalchi）などは伝統的なパンソリボーカルとファンキーなベースを融合させてグローバルにバイラルとなり、韓国の観光キャンペーンに登場しました。',

  // Variety Shows section
  '📺 Korean Variety Shows & Idols · 아이돌과 예능': '📺 韓国バラエティ番組とアイドル · 아이돌과 예능',
  'In Korea, appearing on variety shows (예능 프로그램) is as important for an idol\'s career as releasing music. Variety shows let the public see idols\' real personalities — turning "performers" into beloved personalities.': '韓国では、バラエティ番組（예능 프로그램）への出演は音楽リリースと同じくらいアイドルのキャリアにとって重要です。バラエティ番組は「パフォーマー」を愛される個性に変え、アイドルの本当の個性を大衆に見せます。',

  // Variety Shows photo captions
  'Why Variety Matters': 'なぜバラエティが重要か',
  'Korean variety shows are broadcast weekly on major networks (KBS, MBC, SBS, tvN). Idols who show a fun or relatable personality on variety shows often see their fandom grow more than from music releases alone.': '韓国のバラエティ番組は主要ネットワーク（KBS、MBC、SBS、tvN）で毎週放送されます。バラエティで楽しく共感できる個性を見せたアイドルは、音楽リリースだけよりもファンダムが大きく成長することがよくあります。',
  'Running Man — The Global Hit': 'ランニングマン — グローバルヒット',
  'Running Man (2010–present) became one of the most watched Korean shows internationally in Southeast Asia and beyond. Regular idol guest appearances made it a must-watch for K-Pop fans wanting to see their favorites in a casual setting.': 'ランニングマン（2010〜現在）は東南アジアを中心に国際的に最も視聴された韓国番組の一つとなりました。アイドルのゲスト出演により、気軽な設定でお気に入りを見たいK-Popファンの必見番組となりました。',
  'Idol Survival Shows': 'アイドルサバイバル番組',
  '프로듀스 101 (Produce 101) let fans vote for which trainees debut in a temporary group. This format revolutionized Korean entertainment — fan voting directly shapes who becomes an idol. IZ*ONE, Wanna One, and X1 were all formed this way.': '프로듀스 101はファンがどのトレーニーが期間限定グループでデビューするかを投票できる番組でした。このフォーマットは韓国エンターテインメントを革命的に変えました — ファン投票がアイドルになる人物を直接決定します。',

  // Show list descriptions
  'Korea\'s most internationally recognized variety show. Cast members and guest idols compete in games, missions, and investigations across Korean landmarks. Famous for making idols drop their "stage persona" and show genuine humor. Episodes are available subtitled in 20+ languages.': '韓国で最も国際的に認知されているバラエティ番組。出演者とゲストアイドルが韓国の名所でゲームやミッションを競います。アイドルの「ステージペルソナ」を外させ、本物のユーモアを見せることで有名。20以上の言語で字幕付きエピソードが視聴可能です。',
  'A classroom-themed comedy show where celebrity guests (including top idols) visit as "transfer students." Known for brutal roasting, comedy games, and revealing conversations. One of the best formats for showing idol personalities — BLACKPINK\'s 2019 appearance became one of the most-watched episodes ever.': '教室テーマのコメディ番組で、有名人（トップアイドル含む）が「転校生」として訪問します。容赦ないいじり、コメディゲーム、本音トークで知られています。アイドルの個性を見せる最高のフォーマットの一つで、BLACKPINKの2019年出演は歴代最も視聴されたエピソードの一つになりました。',
  'A warm, interview-style variety show hosted by comedian Yoo Jae-suk and Cho Se-ho. Guests (from idols to ordinary Koreans) share personal stories and answer quiz questions. BTS\'s 2021 appearance during their UN speech period drew massive international attention.': 'コメディアンのユ・ジェソクとチョ・セホが進行する温かいインタビュー形式のバラエティ番組。アイドルから一般韓国人まで出演者が個人的な話を共有しクイズに答えます。BTS의 2021年の国連演説期間中の出演は国際的に大きな注目を集めました。',
  'Korea\'s longest-running variety show. A cast of celebrities (often including idol members) travel to rural Korean regions, complete outdoor missions, and compete for privileges like sleeping indoors or eating well. Known for turning idol members into national personalities through unscripted moments.': '韓国で最も長く続いているバラエティ番組。出演者（アイドルメンバーを含むことが多い）が韓国の地方を旅行し、屋外ミッションをこなし、室内での睡眠や食事などの特権を争います。脚本のない瞬間を通じてアイドルメンバーを国民的有名人に変えることで知られています。',
  'Widely considered the greatest Korean variety show of all time. Idol collaborations on 무한도전\'s annual music festival (가요제) produced some of Korea\'s best-selling songs. A landmark of Korean pop culture that ran for 13 years with no scripted episodes.': '歴代最高の韓国バラエティ番組として広く認められています。무한도전の年次音楽フェスティバル（가요제）でのアイドルコラボから韓国で最もよく売れた曲のいくつかが生まれました。13年間脚本なしで放送された韓国ポップカルチャーの里程標です。',
  'A groundbreaking survival show where 101 trainees competed for 11 debut spots in a project group chosen by nationwide public vote. Viewers became "national producers" (국민 프로듀서). The show birthed Wanna One, IZ*ONE, and X1 — some of the most successful K-Pop acts of the late 2010s.': '101名のトレーニーが全国視聴者投票で選ばれたプロジェクトグループの11つのデビュー枠を争う画期的なサバイバル番組。視聴者は「国民プロデューサー」（국민 프로듀서）となりました。ワナワン、IZ*ONE、X1を生み出した2010年代後半最も成功したK-Popアクトの誕生地です。',
  'Korea\'s premier hip-hop competition show. Idol rappers (including BTS members, BIGBANG\'s G-Dragon in early rounds) and underground artists compete for recognition. The show launched the careers of dozens of Korea\'s biggest rappers and reshaped the perception of hip-hop in Korea.': '韓国最高のヒップホップコンペティション番組。アイドルラッパー（BTSメンバー、BIGBANGのG-Dragonも初期回に出場）とアンダーグラウンドアーティストが認知を争います。韓国の大手ラッパー数十人のキャリアを立ち上げ、韓国でのヒップホップの認識を塑り直しました。',

  // Variety info box
  '예능 감 — "Variety Sense"': '예능 감 — 「バラエティ感」',
  'In Korean entertainment, 예능 감 (ye-neung gam) means an idol\'s natural talent for variety shows — the ability to be funny, spontaneous, and entertaining without a script. Idols with strong 예능 감 become household names beyond music. Members known for variety talent often become the most recognized faces of their groups in Korea.': '韓国エンターテインメントでは、예능감（イェヌンガム）とはアイドルのバラエティ番組における生まれながらの才能 — 脚本なしで面白く、自発的で、楽しませる能力を意味します。강한 예능감を持つアイドルは音楽を超えて家庭の名前となります。',

  // Variety vocab box
  '📚 예능 핵심 어휘 — Variety Show Vocabulary': '📚 예능 핵심 어휘 — バラエティ番組語彙',
  'Variety show / entertainment program': 'バラエティ番組 / 娯楽番組',
  'Guest (on a show)': 'ゲスト（番組の）',
  'Laughter / smile': '笑い / 笑顔',
  'Reaction': 'リアクション',
  'Watching live broadcast (not rerun)': 'ライブ放送を見る（再放送ではなく）',
  'Natural variety talent / charisma': '生まれながらのバラエティ才能 / カリスマ',

  // Film & Drama section
  '🎬 Idols in Film & Drama · 영화계·드라마 진출': '🎬 映画・ドラマに進出するアイドル · 영화계·드라마 진출',
  'Many K-Pop idols have successfully transitioned into acting — starring in box office films and award-winning dramas. The "triple threat" idol (sing, dance, act) is increasingly the norm, not the exception.': '多くのK-Popアイドルが俳優へと成功裏に転身し、興行映画や受賞ドラマに主演しています。「トリプルスレット」アイドル（歌、ダンス、演技）はますます例外ではなく標準となっています。',
  'Idol to Actor Pipeline': 'アイドルから俳優へのパイプライン',
  'Korean agencies proactively cast their idols in dramas and films to extend career longevity. An idol who succeeds in acting can work decades beyond their idol peak years. Companies often sign acting management separately from music management.': '韓国の事務所はアイドルのキャリア寿命を延ばすために積極的にドラマや映画に起用します。演技で成功したアイドルはアイドルの全盛期を大きく超えて何十年も活動できます。会社は音楽マネジメントとは別に演技マネジメント契約を締結することが多いです。',
  'IU at Cannes Film Festival': 'カンヌ映画祭のIU',
  '아이유 (IU) starred in Hirokazu Kore-eda\'s "Broker" (브로커, 2022), which competed at the Cannes Film Festival. Her performance earned critical acclaim internationally, proving that K-Pop idols can reach the highest levels of serious cinema.': 'IU（아이유）是枝裕和監督の「ブローカー」（브로커、2022年）に出演し、カンヌ映画祭に参加しました。彼女の演技は国際的に高い評価を受け、K-Popアイドルが真剣な映画の最高レベルに到達できることを証明しました。',
  'Idols Dominate K-Drama Casting': 'アイドルがKドラマキャスティングを席巻',
  'Top K-Drama casts regularly feature current or former idol members. Shows like "My Love from the Star" (EXO\'s Kim Joon-myeon), "My ID is Gangnam Beauty" (Cha Eun-woo), and "Moon Lovers" (EXO\'s Baekhyun) drew massive viewership from combined drama and idol fandoms.': 'トップKドラマのキャストには現役または元アイドルメンバーが定期的に出演します。「내 아이디는 강남미인」（チャ・ウヌ）や「달의 연인」（EXOのベクヒョン）などのドラマファンダムとアイドルファンダムが合わさって莫大な視聴者数を集めました。',

  // Film grid
  'Solo Artist · K-Pop\'s "Nation\'s Little Sister"': 'ソロアーティスト · K-Popの「国民の妹」',
  'IU is perhaps Korea\'s most successful idol-actor crossover. A top-tier ballad and pop singer who became a critically respected actress. Her role in "My Mister" (나의 아저씨) won her the Grand Prize at the Baeksang Arts Awards.': 'IUはおそらく韓国で最も成功したアイドル俳優クロスオーバーです。最高クラスのバラードとポップ歌手が批評的に尊敬される女優になりました。「나의 아저씨」での役で百想芸術大賞の大賞を受賞しました。',
  'EXO · Vocalist / Main Actor': 'EXO · ボーカリスト / 主要俳優',
  'D.O. (도경수) is widely considered K-Pop\'s most talented actor-idol. Critics frequently note his ability to disappear completely into a role, making audiences forget he is one of K-Pop\'s biggest stars.': 'D.O.（도경수）はK-Popで最も才能のある俳優アイドルとして広く認められています。批評家は彼が役に完全に没入し、観客にK-Popの最大スターの一人であることを忘れさせる能力を頻繁に指摘します。',
  'BIGBANG · Rapper / Actor': 'BIGBANG · ラッパー / 俳優',
  'BIGBANG\'s T.O.P built a parallel career as a serious film actor, starring in multiple Korean war films. His imposing screen presence and deep voice made him a natural fit for intense dramatic roles far from his idol persona.': 'BIGBANGのT.O.Pは複数の韓国戦争映画に主演し、真剣な映画俳優としての並行キャリアを築きました。威圧的なスクリーン存在感と低い声が彼をアイドルペルソナから遠い強烈なドラマティックな役割に自然にフィットさせました。',
  'ZE:A (제국의 아이들) · Actor / Singer': 'ZE:A（제국의 아이들）· 俳優 / 歌手',
  '임시완 is one of the clearest examples of a K-Pop idol successfully pivoting to serious acting. His role in "The Attorney" (변호인) — Korea\'s third highest-grossing film ever — proved idol actors could carry prestige dramas.': '임시완はK-Popアイドルから真剣な演技へ成功裏に転身した最も明確な例の一つです。韓国映画史上興行収入3位の「변호인」での役はアイドル俳優が権威あるドラマを主演できることを証明しました。',
  'miss A (JYP) · Actor / Solo Artist': 'miss A（JYP）· 俳優 / ソロアーティスト',
  '수지 became one of K-Pop\'s first major female idol-to-actress crossover successes. She was dubbed "Nation\'s First Love" in Korea for her sweet, relatable image. After miss A disbanded, she transitioned fully into acting and high-profile commercial endorsements.': '수지はK-Popの最初の主要女性アイドルから女優へのクロスオーバー成功の一人となりました。甘く共感できるイメージで韓国では「国民の初恋」と呼ばれました。miss A解散後、演技と大手商業広告に完全に転身しました。',
  'ASTRO (아스트로) · Actor / Vocalist': 'ASTRO（아스트로）· 俳優 / ボーカリスト',
  '차은우 is considered one of Korea\'s most handsome men ("visual idol"). His role in "True Beauty" (여신강림) made him one of the most searched Korean celebrities globally in 2021. His acting journey shows the growing importance of on-screen charisma as part of an idol\'s total package.': '차은우は韓国で最もハンサムな男性の一人（「ビジュアルアイドル」）と見なされています。「여신강림」での役で2021年に世界的に最も検索された韓国の有名人の一人になりました。彼の演技の旅はアイドルの総合パッケージにおけるスクリーンカリスマの重要性の高まりを示しています。',

  // Film tip box
  '삼위일체 아이돌 — The "Triple Threat" Idol': '삼위일체 아이돌 — 「トリプルスレット」アイドル',
  'Korean agencies now deliberately train and cast their idols as 삼위일체 (sam-wi-il-che, "triple threat") entertainers: singer + dancer + actor. An idol who can headline a drama or film generates additional revenue streams for the agency and extends their relevance well beyond typical idol career spans of 5–10 years.': '韓国の事務所は今や意図的にアイドルを삼위일체（サムウィイルチェ、「トリプルスレット」）エンターテイナーとして訓練しキャスティングします：歌手＋ダンサー＋俳優。ドラマや映画の主演を務めることができるアイドルは事務所に追加の収益源を生み出し、典型的な5〜10年のアイドルキャリアスパンをはるかに超えて活躍し続けます。',

  // Vocabulary section
  '📖 Essential Vocabulary · 필수 어휘': '📖 必須語彙 · 필수 어휘',
  '어떻게 공부할까요? — How to Study This Vocabulary': '어떻게 공부할까요？— この語彙の勉強法',
  'Click 🔊 to hear each word spoken aloud. Read the example sentences and try saying them yourself — real K-Pop fans use most of these words daily. Organized by category to build your vocabulary in context.': '🔊をクリックして各単語の発音を聞きましょう。例文を読んで自分でも言ってみてください — 本物のK-Popファンはこれらの単語のほとんどを毎日使います。文脈の中で語彙を構築するためにカテゴリ別に整理されています。',
  'Translation · 번역': '翻訳 · 번역',
  'Idol / K-Pop star': 'アイドル / K-Popスター',
  'Trainee (pre-debut)': 'トレーニー（デビュー前）',
  'Debut': 'デビュー',
  'Comeback (new release)': 'カムバック（新リリース）',
  'Member (of a group)': 'メンバー（グループの）',
  'Group leader': 'グループリーダー',
  'Center (visual focus)': 'センター（視覚的フォーカス）',
  'Rapper': 'ラッパー',
  'Vocalist': 'ボーカリスト',
  'Entertainment agency': '芸能事務所',
  'Real name (not stage name)': '本名（芸名ではない）',
  'Fandom': 'ファンダム',
  'Becoming a fan (fall in)': 'ファンになること（ハマる）',
  'Leaving a fandom': 'ファンダムを離れること',
  'Bias (favorite member)': '推し（お気に入りのメンバー）',
  'Official lightstick': '公式ペンライト',
  'Fan meeting event': 'ファンミーティングイベント',
  'Fancam (직접 촬영)': 'ファンカム（직접 촬영）',
  'Mass streaming push': 'マスストリーミング活動',
  'Streaming (chart support)': 'スミン（チャート応援ストリーミング）',
  'Photocard (포토카드)': 'フォトカード（포토카드）',
  'Choreography': '振り付け',
  'Music show (음악 방송)': '音楽番組（음악 방송）',
  'Music video (MV)': 'ミュージックビデオ（MV）',
  'Title track (lead single)': 'タイトル曲（リードシングル）',
  'B-side / album track': 'カップリング / アルバムトラック',
  'Concert': 'コンサート',
  'Stage / performance': 'ステージ / パフォーマンス',

  // Idol Phrases section
  '💬 What Idols Say to Fans · 아이돌 팬 말': '💬 アイドルがファンに言うこと · 아이돌 팬 말',
  '🗣️ Korean Speech Levels · 말투 레벨 — Why They Matter': '🗣️ 韓国語の敬語レベル · 말투 레벨 — なぜ重要か',
  'I love you!': '愛してるよ！',
  'Because of you all, I\'m happy.': 'あなたたちのおかげで、私は幸せです。',
  'I will work hard!': '頑張ります！',
  'I missed you (all).': '（みんなのことを）恋しかったです。',
  'I will always be by your side.': 'いつもそばにいます。',
  'Our fans are the best!': '私たちのファンは最高！',
  'I sincerely thank you.': '心からありがとうございます。',
  'Please continue to support us.': 'これからもよろしくお願いします。',
  'Because you all exist, I\'m happy.': 'みんながいてくれるから、私は幸せです。',
  'Please stay healthy.': 'どうか健康でいてください。',
  'Being together makes me happy.': '一緒にいられることが幸せです。',
  'I love you all too.': '私もみんなを愛しています。',

  // Fan Slang section
  '🔥 Fan Slang You Need to Know · 팬덤 은어': '🔥 知っておきたいファンスラング · 팬덤 은어',
  'K-Pop fan communities have developed a rich vocabulary — a mix of Korean words, English loanwords, shortened compound words, and internet slang born on Korean forums. Learning this slang helps you understand fan communities and feel like a real': 'K-Popファンコミュニティは豊かな語彙を発展させました — 韓国語、英語の外来語、短縮複合語、韓国のフォーラムで生まれたネットスラングの混合です。このスラングを学ぶことでファンコミュニティを理解し、本物の',
  '(genuine fan). Each entry below includes a real sentence example.': '（本物のファン）のように感じられます。以下の各エントリには実際の例文が含まれています。',
  'Hardcore fan / superfan': '熱狂的ファン / スーパーファン',
  'God-tier / amazing (prefix)': '神レベル / すごい（接頭辞）',
  'Legendary / iconic moment': '伝説的 / アイコニックな瞬間',
  'Amazing! / Jackpot! / Wow!': 'すごい！/ 大当たり！/ ワー！',
  'Heart flutter / skip a heartbeat': '胸キュン / 心臓が止まりそう',
  'In real life (IRL) appearance': '実物（リアルでの見た目）',
  'Older brother / older sister (fan → idol)': 'お兄ちゃん / お姉ちゃん（ファン→アイドル）',
  'Ugly crying / tear explosion': '号泣 / 涙が爆発',
  'Nuisance / troublemaker': '迷惑 / 問題ファン',
  '"I\'m done for" / "I\'m ruined" (lovingly)': '「終わった」/「もうダメだ」（愛情込めて）',
  'Reality check / the blow of reality': '現実直撃',
  '"My life is ruined" (by an idol)': '「この人生は終わった」（アイドルによって）',
  'True/genuine fan (not a casual listener)': '本物のファン（カジュアルリスナーではなく）',
  'Flower-boy / Flower-girl (exceptionally beautiful)': '꽃男子 / 꽃女子（際立って美しい）',
  'Vocal timbre / tone color': '声質 / 声のカラー',
  '"To crumble" (emotionally overwhelmed by idol)': '「崩れる」（アイドルに感情的に圧倒される）',
  'I\'m a total K-Pop superfan.': '私は完全なK-Popオタクです。',
  'This performance is totally god-tier!': 'この舞台は完全に神レベル！',
  'That performance was truly legendary.': 'あの舞台は本当に伝説的でした。',
  'This song is truly amazing!': 'この曲は本当に大박です！',
  'That look made my heart completely skip a beat.': 'そのまなざしで完全に胸キュンしました。',
  'Seeing them in person, they\'re really beautiful!': '実物で見ると、本当に美しいです！',
  'Oppa, you\'re the best! Unnie, I love you!': 'オッパ、最高！オンニ、愛してる！',
  'I was ugly crying after watching that video.': 'その動画を見て号泣しました。',
  'Don\'t be a troublesome/toxic fan.': '迷惑なファンにならないでください。',
  'After watching this fancam, I\'m completely done for.': 'このファンカムを見て完全に終わりました。',
  'Reality hit me hard after the concert ended.': 'コンサートが終わった後、現実が押し寄せました。',
  'After hearing this album, my life is ruined (in the best way).': 'このアルバムを聴いてから、人生が終わりました（最高の意味で）。',
  'I\'ve been a true fan for 5 years.': '5年間、本物のファンです。',
  'Cha Eun-woo is a true flower-boy!': 'チャ・ウヌは真の꽃男子！',
  'That singer has a truly unique vocal tone.': 'そのシンガーは本当にユニークな声質を持っています。',
  'I completely crumbled after watching this stage.': 'この舞台を見て完全に崩れました。',

  // Fan Chants section
  '📣 Fan Chants · 응원법': '📣 ファンチャント · 응원법',
  '응원법이란? — What Is a Fan Chant?': '응원법이란？— ファンチャントとは？',
  '응원법 (eung-won-beop, "cheering method") is the organized chant fans shout at concerts and music shows during instrumental breaks. Each idol group has an official 응원법 — fans memorize these to cheer in unison. The call-and-response rhythm between fans and idols is unique to Korean fan culture.': '응원법（ウンウォンボプ、「応援法」）は、コンサートや音楽番組のインストルメンタルブレイク中にファンが叫ぶ組織化されたチャントです。各アイドルグループには公式の응원법があり、ファンはこれを暗記して一斉に応援します。ファンとアイドルのコールアンドレスポンスのリズムは韓国ファン文化に独特です。',
  '📌 During instrumental breaks, fans call each member\'s name in order, then shout the full group name together. ARMY (아미) is BTS\'s fan name. 방탄 (bulletproof) + 소년단 (boy scouts/youth group) = "Bulletproof Boy Scouts."': '📌 インストルメンタルブレイク中、ファンは順番に各メンバーの名前を呼び、次にグループ名全体を一緒に叫びます。ARMY（아미）はBTSのファン名。방탄（防弾）+ 소년단（少年団）= 「防弾少年団」。',
  '📌 BLINK (블링크) is BLACKPINK\'s fan name — BLACK + PINK combined. Fans hold pink and black lightsticks. Notice the member names are called in official order (지수→제니→로제→리사).': '📌 BLINK（블링크）はBLACKPINKのファン名 — BLACKとPINKを組み合わせました。ファンはピンクと黒のペンライトを持ちます。メンバー名は公式順序（지수→제니→로제→리사）で呼ばれることに注目してください。',
  '📌 ONCE (원스) is TWICE\'s fan name — because fans love them TWICE as much. Nine members = one of the longest name-chants in K-Pop. The order of names always follows official lineup order, never changed.': '📌 ONCE（원스）はTWICEのファン名 — ファンが彼女たちをTWICE（2倍）愛しているから。9メンバー = K-Pop最長の名前チャントの一つ。名前の順序は常に公式ラインアップ順に従い、変更されることはありません。',
  '📌 파이팅 is Konglish from "fighting" — used as a motivational cheer. 최고야 is casual (no 요), showing warm familiarity. Notice the idol\'s response can shift from polite 저도 (formal I) to casual 나도 depending on how close they feel to fans.': '📌 파이팅は「fighting」からのコングリッシュ — モチベーション応援として使われます。최고야はカジュアル（요なし）で温かい親しみを示します。アイドルの応答はファンとの親しさに応じて丁寧な저도から카지ない나도に変わることに注目してください。',
  '📌 한 번 더 = "one more time" (한 = one, 번 = time/occurrence, 더 = more). A beloved K-Pop concert ritual: fans chant this after the final song; idols pretend to leave, then return for the encore. 보고 싶을 거야 is casual future tense — "will want to see you."': '📌 한 번 더 =「もう一度」（한 = 1、번 = 回、더 = もっと）。愛されるK-Popコンサートの儀式：ファンが最後の曲の後にこれをチャントし、アイドルが去る振りをしてからアンコールに戻ってきます。보고 싶을 거야はカジュアルな未来形 — 「あなたに会いたくなるだろう」。',

  // Learning Tips
  '💡 Learning Tips': '💡 学習のヒント',
  'Use K-Pop to Learn Korean': 'K-Popで韓国語を学ぼう',
  'Listen for repeated words in song lyrics. Many K-Pop songs use simple, emotional vocabulary — words like': '歌詞の中で繰り返される単語を聞いてみましょう。多くのK-Popの曲はシンプルで感情的な語彙を使っています — 例えば',
  'appear constantly across songs from every group.': 'などの言葉はすべてのグループの曲に絶えず登場します。',
  'Why do fans say "파이팅" (Fighting)?': 'ファンはなぜ「파이팅」（ファイティング）と言うの？',
  '파이팅 (pa-i-ting) is a Konglish cheer meaning "Go!" or "You got this!" It comes from the English word "fighting" used as a motivational shout. Koreans use it to encourage athletes, students, and idols alike.': '파이팅（パイティング）は「行け！」または「頑張れ！」を意味するコングリッシュの応援です。モチベーションを高める叫びとして使われる英語の「fighting」から来ています。韓国人はアスリート、学生、アイドルを同様に励ますために使います。',

  // ── kpop.html — Fixed & Missing Entries ──────────────────────────────

  // agency-ceo: FIXED keys — text node after </strong> starts with "— " (em dash + space)
  // The previous entries used wrong keys missing the "— " prefix.
  '— Dubbed the "Father of K-Pop." A former pop singer turned music producer, he engineered the idol training system and international expansion strategy. Known for his perfectionist standards and systematic approach to creating stars.': '「K-Popの父」と称される。元ポップ歌手から音楽プロデューサーに転身し、アイドル育成システムと国際展開戦略を構築。スターを生み出す完璧主義的な基準と体系的なアプローチで知られています。',
  '— Former member of 서태지와 아이들, Korea\'s first modern idol group. As CEO, he prioritized musical substance over visual perfection — and gave artists like G-Dragon creative control that was unheard of at other agencies.': '서태지와 아이들（韓国初の現代アイドルグループ）の元メンバー。CEOとしてビジュアルの完璧さより音楽的内容を優先し、G-Dragonのようなアーティストに他社では前例のないクリエイティブコントロールを与えました。',
  '— A legendary producer and performer himself (the "Pied Piper of Korea"). Famous for personally appearing in music videos and ads, for auditioning every trainee, and for his philosophy: "talent, looks, and attitude" in that order.': '自身も伝説的なプロデューサーでありパフォーマー（「韓国のハーメルンの笛吹き」）。MVやCMに自ら出演し、すべてのトレーニーをオーディションすることで有名。「才能、外見、姿勢」の順という哲学を持ちます。',
  '— A music producer background (worked at JYP), founded Big Hit in 2005. Recognized BTS\'s potential when no major agency would sign them. His artist-centric philosophy — letting BTS write their own music, tell their own stories — changed K-Pop forever. HYBE is now publicly listed on the Korean Stock Exchange.': '音楽プロデューサー出身（JYP勤務経験あり）、2005年にビッグヒットを設立。大手事務所がサインしなかったBTSの可能性を見出しました。BTSが自分たちの音楽を書き、自分たちの物語を語ることを許すアーティスト中心の哲学でK-Popを永遠に変えました。HYBEは現在韓国証券取引所に上場しています。',
  '— Built Starship from a mid-tier label into a major player. 아이브 (IVE)\'s global success (2022–present) validated Starship\'s strategy of refined, quality-over-quantity artist development.': 'スターシップを中堅レーベルから主要企業へと成長させました。아이브（IVE）の2022年以降のグローバルな成功が、洗練された量より質のアーティスト育成戦略を実証しました。',
  '— Former JYP VP who took the JYP philosophy of artist development and built his own roster. Cube is known for giving artists a degree of creative freedom that distinguishes their acts from more rigid label systems.': '元JYP副社長でJYPのアーティスト育成哲学を持ち込み独自のラインナップを構築。キューブは他の厳格な事務所システムとは一線を画す、アーティストへのクリエイティブな自由で知られています。',

  // film-works: <strong>Films:</strong> and <strong>Dramas:</strong> labels + title list text nodes
  'Films:': '映画：',
  'Dramas:': 'ドラマ：',
  'Broker (브로커, Cannes 2022), Dream (드림, 2023) ·': 'ブローカー（브로커、カンヌ2022）、ドリーム（드림、2023）·',
  'My Mister, Hotel Del Luna, Moon Lovers': '나의 아저씨、ホテルデルーナ、달의 연인',
  'Cart (카트), Pure Love (순정), Room No.7 (7호실), The Moon (달), My Annoying Brother ·': '카트、순정、7호실、달、My Annoying Brother·',
  '100 Days My Prince': '百日の郎君様',
  'Into the Fire (포화속으로), 71 Into the Fire, The Commitment (동창생), Tazza: The Hidden Card ·': '포화속으로、71・イントゥ・ザ・ファイア、동창생、タッジャ：ヒドゥンカード·',
  'IRIS, Iris II': 'IRIS、Iris II',
  'The Attorney (변호인), The Prison (더 킹), Mishmash ·': '변호인、더 킹、Mishmash·',
  'Triangle, The King\'s Face, Run On, Tracer': 'トライアングル、왕의 얼굴、ランオン、トレーサー',
  'Architecture 101 (건축학개론), Dorihwaga ·': '건축학개론、Dorihwaga·',
  'Dream High, Gu Family Book, Vagabond (배가본드), Start-Up': 'ドリームハイ、구가의 서、배가본드、스타트업',
  'My ID is Gangnam Beauty (내 아이디는 강남미인), True Beauty (여신강림), Island (아일랜드) ·': '내 아이디는 강남미인、여신강림、아일랜드·',
  'Hit the Top': 'ヒット・ザ・トップ',

  // lang-box-phrase: <b> splits the div into multiple text nodes — translate each fragment
  '💬 Try it:': '💬 試してみよう：',
  '(no-re-bang ga-go si-peo-yo!) = "I want to go to norebang!" |': '（ノレバン・ガゴ・シポヨ！）＝「ノレバンに行きたい！」 |',
  '= "Let\'s sing a song!"': '＝「一緒に歌いましょう！」',
  '💬 Practice:': '💬 練習：',
  '(eo-neu so-sok-sa-ye-yo?) = "Which agency are they from?" |': '（オ・ヌ・ソソクサイェヨ？）＝「どの事務所の所属ですか？」 |',
  '= "They\'re from SM (Entertainment)."': '＝「SM（エンターテインメント）の所属です。」',
  '💬 Sentence:': '💬 例文：',
  '(myeot se-dae a-i-do-reul jo-a-hae-yo?) = "Which generation idols do you like?" |': '（ミョッ・セデ・アイドゥレル・チョアヘヨ？）＝「何世代のアイドルが好きですか？」 |',
  '= "I like 3rd generation the most."': '＝「3世代が一番好きです。」',
  '💬 Fan phrase:': '💬 ファンフレーズ：',
  '(ye-neung-ga-mi neom-cheo-yo!) = "Their variety show talent overflows!" |': '（イェヌンガミ・ノムチョヨ！）＝「バラエティの才能があふれています！」 |',
  '= "This episode was so funny."': '＝「このエピソードは本当に面白かった。」',

  // grammar-meaning: vocab grammar box text node fragments (<b> splits examples)
  'I like ~ — e.g.,': '〜が好きです — 例：',
  '(I like BTS) |': '（BTSが好きです）|',
  '(I like K-Pop)': '（K-Popが好きです）',
  'I like ~ (with direct object) — e.g.,': '〜が好きです（目的語付き）— 例：',
  '(I like idols)': '（アイドルが好きです）',
  'Is / am — e.g.,': '〜です / 〜だ — 例：',
  '(My bias is V) |': '（私の推しはVです）|',
  '(They\'re a vocalist)': '（ボーカリストです）',
  'Did (past tense) — e.g.,': '〜しました（過去形）— 例：',
  '(I got into K-Pop through BTS) |': '（BTSでK-Popにハマりました）|',
  '(They debuted)': '（デビューしました）',
  'So good! / I love it! — e.g.,': '最高！/ 大好き！— 例：',
  '(This song is so good!)': '（この曲、最高！）',
  // grammar-meaning: phrase grammar box (speech level descriptions)
  'Volitional "I will ~" — idols use this to make promises to fans. e.g.,': '意志を表す「〜します」— アイドルがファンへの約束に使います。例：',
  '= I will work hard': '= 一生懸命頑張ります',
  '"Thanks to ~ / Because of ~" — used to credit fans. e.g.,': '「〜のおかげで / 〜のせいで」— ファンへの感謝に使います。例：',
  '= Because of the fandom, I\'m happy': '= ファンダムのおかげで幸せです',
  'Most formal speech level — used in award speeches, official statements. e.g.,': '最も丁寧な敬語レベル — 授賞スピーチや公式声明に使います。例：',
  '= Thank you (formal)': '= ありがとうございます（フォーマル）',
  'Informal speech — idols use this in V-Lives with fans they feel close to. e.g.,': 'タメ口 — 親しいファンとのV-Liveでアイドルが使います。例：',
  '= I love you (casual)': '= 愛してる（カジュアル）',
  // speech-badge span text nodes
  'Polite': '丁寧体',
  'Formal': 'フォーマル',
  'Casual': 'カジュアル',

  // phrase-context: idol phrases section (💡 notes with <strong> splits)
  '💡 Said at concerts and fan meetings. Casual form:': '💡 コンサートやファンミーティングで言われます。カジュアル：',
  '(same meaning, used on V-Lives)': '（同じ意味、V-Liveで使用）',
  '= "thanks to / because of" — a key gratitude expression in Korean': '= 「〜のおかげで」— 韓国語の重要な感謝表現',
  '💡 Said at award wins or after criticism.': '💡 受賞時や批判を受けた後に言われます。',
  '= "I will ~" (speaker\'s promise)': '= 「〜します」（話者の約束）',
  '💡 Literally "wanted to see you."': '💡 直訳：「会いたかった」',
  '= want to ~ (apply to any verb!)': '= 〜したい（どの動詞にも使えます！）',
  '💡 A promise of loyalty — common at final concerts before hiatus': '💡 忠誠の誓い — 活動休止前の最後のコンサートでよく見られます',
  '= the best / #1. Casual -야 ending shows warmth': '= 最高 / 1位。カジュアルな-야語尾が温かみを示します',
  '💡 Used in award speeches. vs. casual:': '💡 授賞スピーチで使用。カジュアル版：',
  '(casual thank you)': '（カジュアルなありがとう）',
  '💡 Classic idol debut / award phrase.': '💡 定番のアイドルデビュー・受賞フレーズ。',
  '= to humbly ask (respectful)': '= 謙虚にお願いする（丁寧）',
  '= "because ~ exists/is here" — a deep expression of gratitude': '= 「〜がいてくれるから」— 深い感謝の表現',
  '💡 Polite command / wish with': '💡 丁寧な命令・願いの表現（',
  '. Also said:': '。また：',
  '= "Eat well"': '= 「ご飯をちゃんと食べてね」',
  '= together. Common at fan meetings and encores': '= 一緒に。ファンミーティングやアンコールでよく見られます',
  '= "I also/too" — 도 particle adds "also" to any word': '= 「私も」— 도助詞はどの語にも「も」を加えます',

  // phrase-context: fan slang section
  '💡 Japanese オタク → 오타쿠 → shortened to 덕후. 덕질 = the act of fan activity': '💡 日本語のオタク → 오타쿠 → 덕후に短縮。덕질 = ファン活動のこと',
  '💡 Prefix applied to any group or performance: 갓세븐, 갓 무대. From English "God"': '💡 どのグループやパフォーマンスにも付く接頭辞：갓세븐、갓 무대。英語の「God」から',
  '💡 이거 레전드다 = This is legendary. Also: 레전드 무대 = iconic stage performance': '💡 이거 레전드다 = これは伝説。また：레전드 무대 = アイコニックなステージ',
  '💡 대 (big/great) + 박 (hit). Used for anything shocking or impressive. Very common in daily speech': '💡 대（大）+ 박（ヒット）。驚くべき・印象的なものに使います。日常会話でよく使われます',
  '💡 심장 (heart) + 쿵 (thump sound effect) = compound onomatopoeia word': '💡 심장（心臓）+ 쿵（ドキンという音）= 擬音複合語',
  '💡 실 (real/actual) + 물 (thing) → 실물이 더 예뻐요 = They\'re more beautiful IRL': '💡 실（実際の）+ 물（もの）→ 실물이 더 예뻐요 = 実物の方がもっと美しい',
  '💡 Family terms repurposed for fan affection. 오빠 = female fan → older male idol; 언니 = female fan → older female idol': '💡 家族の呼称をファンの愛情表現に転用。오빠 = 女性ファン→年上の男性アイドル；언니 = 女性ファン→年上の女性アイドル',
  '💡 눈물 (tears) + 폭발 (explosion). Describes uncontrollable crying at an emotional performance': '💡 눈물（涙）+ 폭발（爆発）。感動的なパフォーマンスで止められない泣き方を表します',
  '💡 민 (people/public) + 폐 (harm/burden). 민폐 팬 = toxic fan that causes problems for others': '💡 민（公衆）+ 폐（迷惑・害）。민폐 팬 = 他人に問題を引き起こす問題ファン',
  '💡 Literally "failed/ruined" — used fondly when an idol is so perfect you can\'t function. 완전 망했다': '💡 直訳：「失敗した・終わった」— アイドルが完璧すぎて機能できないときに愛情込めて使います。완전 망했다',
  '💡 현실 타격감 (hyeonsil ta-gyeok-gam = "reality impact") → abbreviated to 현타. Post-concert depression': '💡 현실 타격감（現実の衝撃感）→ 현타に略。コンサート後の虚脱感',
  '💡 이번 생은 망했다 (this life is ruined) → 이생망. Said affectionately when obsessed with an idol': '💡 이번 생은 망했다（今世は終わった）→ 이생망に略。アイドルに夢中のときに愛情込めて使います',
  '💡 찐 = genuine/real (from 진짜 = real) → 찐팬 = true-blue fan who knows everything': '💡 찐 = 本物（진짜「本物」から）→ 찐팬 = 何でも知っている真のファン',
  '💡 꽃 (flower) + 미남 (handsome man) / 미녀 (beautiful woman). A high compliment for visual idols': '💡 꽃（花）+ 미남（イケメン）/ 미녀（美女）。ビジュアルアイドルへの最高の褒め言葉',
  '💡 음 (sound/music) + 색 (color). A deep compliment about a singer\'s unique voice quality': '💡 음（音楽）+ 색（色）。歌手のユニークな声質への深い褒め言葉',
  '💡 Literally "to collapse/crumble." Said when a fancam or performance is too perfect to handle': '💡 直訳：「崩れる」。ファンカムやパフォーマンスが完璧すぎてどうにもならないときに言います',

  // phrase-breakdown: each <b> tag splits into multiple text nodes — translate the English meaning fragments
  '(love) +': '（愛）+',
  '(do, polite present) → literally "do love"': '（します、丁寧現在形）→ 直訳：「愛します」',
  '(everyone) +': '（みんな）+',
  '(thanks to) +': '（のおかげで）+',
  '(am happy)': '（幸せです）',
  '(hard/diligently) +': '（一生懸命に）+',
  '(I will do, volitional ~겠어요 form)': '（します、意志形〜겠어요）',
  '(see, gerund form) +': '（見る、動名詞形）+',
  '(wanted to, past of 싶다)': '（〜したかった、싶다の過去形）',
  '(always) +': '（いつも）+',
  '(beside / by [one\'s] side) +': '（そばに）+',
  '(I will be, future volitional)': '（います、未来意志形）',
  '(our) +': '（私たちの）+',
  '(fans, plural) +': '（ファンたち）+',
  '(the best, casual declarative)': '（最高、カジュアル宣言形）',
  '(truly/really) +': '（本当に）+',
  '(thank you, formal ~합니다 ending)': '（ありがとうございます、フォーマル〜합니다語尾）',
  '(in the future too) +': '（これからも）+',
  '(well) +': '（よく）+',
  '(I humbly ask/request)': '（謹んでお願いします）',
  '(you all, subject) +': '（みなさんが、主語）+',
  '(because [you] are here) +': '（いてくれるから）+',
  '(happy)': '（幸せ）',
  '(healthily) +': '（健康に）+',
  '(please live/get by, polite imperative)': '（お過ごしください、丁寧命令形）',
  '(together) +': '（一緒に）+',
  '(because we are) +': '（一緒にいるから）+',
  '(I also) +': '（私も）+',
  '(you all, object marker 을) +': '（みなさんを、目的格 을）+',
  '(love)': '（愛）',

  // chant-line-rom: romanization lines that contain English notes in parentheses
  '"…from before the universe was born…" (DNA lyrics)': '「…宇宙が生まれる前から…」（DNA 가사）',
  'Bang-tan-so-nyeon-dan! (full group name)': 'Bang-tan-so-nyeon-dan!（グループ正式名）',
  'Beullaek-ping-keu in yu-eo e-eo-ri-eo! (concert intro)': 'Beullaek-ping-keu in yu-eo e-eo-ri-eo!（コンサートイントロ）',
  '(hook from the song)': '（曲のフック）',
  'Jeo-do sa-rang-hae-yo! / Na-do sa-rang-hae! (casual)': 'Jeo-do sa-rang-hae-yo! / Na-do sa-rang-hae!（タメ口）',
  'Bo-go si-peul geo-ya! (casual — "will want to see you")': 'Bo-go si-peul geo-ya!（タメ口 ― 「あなたに会いたくなる」）',

  // eng-cell example column: full text node = Korean sentence + (English translation in parens)
  '그 아이돌 정말 잘 춰요. (That idol dances really well.)': '그 아이돌 정말 잘 춰요。（そのアイドルは本当にダンスが上手です。）',
  '5년 동안 연습생이었어요. (Was a trainee for 5 years.)': '5년 동안 연습생이었어요。（5年間トレーニーでした。）',
  '올해 데뷔했어요. (They debuted this year.)': '올해 데뷔했어요。（今年デビューしました。）',
  '다음 달에 컴백해요! (Comeback next month!)': '다음 달에 컴백해요！（来月カムバックします！）',
  '몇 명 멤버예요? (How many members are there?)': '몇 명 멤버예요？（メンバーは何人ですか？）',
  '그가 그룹의 리더예요. (He is the group\'s leader.)': '그가 그룹의 리더예요。（彼はグループのリーダーです。）',
  '그녀가 안무 센터예요. (She is the choreography center.)': '그녀가 안무 센터예요。（彼女は振り付けのセンターです。）',
  '래퍼가 가사를 직접 썼어요. (The rapper wrote the lyrics themselves.)': '래퍼가 가사를 직접 썼어요。（ラッパーが歌詞を自分で書きました。）',
  '메인 보컬 목소리가 정말 좋아요. (The main vocalist has a great voice.)': '메인 보컬 목소리가 정말 좋아요。（メインボーカルの声は本当に素晴らしいです。）',
  '어느 소속사예요? (Which agency are they from?)': '어느 소속사예요？（どの事務所の所属ですか？）',
  '본명이 뭐예요? (What\'s their real name?)': '본명이 뭐예요？（本名は何ですか？）',
  '팬덤이 정말 커요. (The fandom is huge.)': '팬덤이 정말 커요。（ファンダムは本当に大きいです。）',
  'BTS로 입덕했어요. (I got into K-Pop through BTS.)': 'BTS로 입덕했어요。（BTSでK-Popにハマりました。）',
  '탈덕하고 싶지 않아요. (I don\'t want to leave the fandom.)': '탈덕하고 싶지 않아요。（ファンダムを離れたくありません。）',
  '제 최애는 뷔예요. (My bias is V.)': '제 최애는 뷔예요。（私の推しはVです。）',
  '응원봉을 흔들어요! (Wave your lightstick!)': '응원봉을 흔들어요！（ペンライトを振りましょう！）',
  '팬미팅 티켓 샀어요! (I bought fan meeting tickets!)': '팬미팅 티켓 샀어요！（ファンミーティングのチケットを買いました！）',
  '직캠이 바이럴됐어요. (The fancam went viral.)': '직캠이 바이럴됐어요。（ファンカムがバイラルになりました。）',
  '총공 시작! (Mass streaming starts now!)': '총공 시작！（一斉ストリーミング開始！）',
  '스밍으로 1위 하자! (Let\'s stream to #1!)': '스밍으로 1위 하자！（スミンで1位を目指そう！）',
  '포카 트레이딩 할래요? (Want to trade photocards?)': '포카 트레이딩 할래요？（フォトカードトレードしますか？）',
  '안무가 너무 어려워요. (The choreography is very difficult.)': '안무가 너무 어려워요。（振り付けがとても難しいです。）',
  '오늘 음방에 출연해요. (They appear on the music show today.)': '오늘 음방에 출연해요。（今日音楽番組に出演します。）',
  '뮤직비디오 조회수가 1억이에요. (The MV has 100 million views.)': '뮤직비디오 조회수가 1억이에요。（MVの再生回数が1億回です。）',
  '타이틀곡이 1위예요. (The title track is #1.)': '타이틀곡이 1위예요。（タイトル曲が1位です。）',
  '수록곡도 너무 좋아요! (The b-sides are so good too!)': '수록곡도 너무 좋아요！（カップリング曲も本当に良いです！）',
  '콘서트 티켓이 매진됐어요. (Concert tickets sold out.)': '콘서트 티켓이 매진됐어요。（コンサートチケットが売り切れました。）',
  '가사가 너무 감동적이에요. (The lyrics are so moving.)': '가사가 너무 감동적이에요。（歌詞がとても感動的です。）',
  '무대가 대박이었어요! (The stage performance was amazing!)': '무대가 대박이었어요！（ステージが最高でした！）',

  // learning tips: <strong> fragments inside tip-text
  '사랑 (love)': '사랑（愛）',
  '꿈 (dream)': '꿈（夢）',
  '함께 (together)': '함께（一緒に）',
  ', and': '、そして',

  // ── culture/koreanthing.html — Korean Thing ──────────────────────────────

  // Page header / hero
  'KOREAN THING · 한국만의 것': '韓国あるある · 한국만의 것',
  'The untranslatable, unimitable, unmistakably Korean — the habits, customs, systems, and obsessions that make Korea unlike anywhere else on Earth.': '翻訳不可能で、真似できない、紛れもなく韓국的なもの — 韓国を地球上の他のどことも異なるものにする習慣、文化、制度、そしてこだわり。',

  // Sidebar links (koreanthing-specific)
  'Minor Protection': '未成年者保護',
  'Fast Delivery': '超速配達',
  'Unique Ecosystem': '独自の生態系',
  'Table Culture': 'テーブル文화',
  'Plastic Surgery': '整形',
  'Jeonse System': '전세制度',
  'Traditions': '伝統',
  'Korean Proverbs': '韓국のことわざ',

  // § Rice section
  'A Nation Obsessed with Rice · The Language of Bap': 'お米に取り憑かれた民族 · 밥の言語',
  'In Korean culture, 밥 (bap) — cooked rice — transcends mere food. It is a social thermometer, a measure of relationships, a moral standard, and the most versatile word in the entire Korean lexicon. When Koreans greet each other, threaten each other, thank each other, or insult each other, they do it with rice. This is not metaphor — 밥 is literally woven into dozens of everyday expressions that collectively reveal a deep cultural truth: in Korea, sharing a meal is sharing your life.': '韓국 文化において、밥（バプ）—炊いたご飯—は単なる食べ物をはるかに超えています。社会的な温度計であり、人間관係の尺度であり、道徳的な基準であり、韓国語全体で最も多용途な言葉です。韓国人は挨拶するとき、脅すとき、感謝するとき、相手を侮辱するときも、すべてご飯を使います。これは比喩ではありません — 밥は文字通り数十の日常表現에 織り込まれており、深い文化的真実を明らかにしています：韓国では、食事を共にすることは人生を分かち合うことです。',
  '🗣️ The Rice Phrase Almanac · 밥 표현 사전': '🗣️ ご飯フレーズ大全 · 밥 표현 사전',
  'Every situation in Korean life has a corresponding rice-based expression. These are not old-fashioned idioms — Koreans use all of them naturally in daily speech today. Learn these phrases and you\'ll understand a whole layer of Korean culture that no textbook covers.': '韓국人の生活のあらゆる状況に、それに対応する밥関連の表現があります。これらは古くさい慣用句ではありません — 韓国人は今日の日常会話でも自然에 使っています。これらのフレーズを학습すれば、どの教科書も扱わない韓国文화の層을 理解できます。',

  // Bap situation labels
  '😡 When scolding someone': '😡 誰かを叱るとき',
  '🙏 When expressing gratitude': '🙏 感謝を표すとき',
  '👋 Korean casual greeting': '👋 韓국식 カジュアルな挨拶',
  '🤒 When someone is sick': '🤒 誰かが病気のとき',
  '🙋 Formal greeting / check-in': '🙋 フォーマルな挨拶',
  '😤 When someone is annoying': '😤 誰かがうっとうしいとき',
  '😩 When doubting someone\'s competence': '😩 誰かの能力を疑うとき',
  '💪 When setting performance expectations': '💪 期待値を설정するとき',
  '😠 When you hate someone': '😠 誰かを嫌いなとき',
  '😆 The ultimate insult (playful)': '😆 究極の悪口（遊び심あり）',
  '😰 Serious crisis situation': '😰 深刻な危機の状況',
  '🙄 When a parent opposes a hobby': '🙄 親が趣味에 反対するとき',
  '🤢 Losing appetite / disgust': '🤢 食欲를 失う / 嫌悪感',
  '😏 Sarcastic praise': '😏 皮肉な称賛',
  '❤️ The ideal person': '❤️ 理想的な人',
  '💪 The ultimate power source': '💪 究極のエネルギー源',
  '😤 Taking credit for someone else\'s work': '😤 他人の功績을 横取りするとき',
  '🎲 Whatever happens, happens': '🎲 なるようになる',
  '💼 Stable government jobs': '💼 安定した公務員の仕事',
  '👨‍👩‍👧‍👦 Family': '👨‍👩‍👧‍👦 家族',
  '🚔 Going to prison': '🚔 刑務所에 行く',
  '😤 Not protecting your position/interests': '😤 自分の立場를 守れないとき',
  '😒 Wasting time on pointless things': '😒 無意味なことに時間를 無駄にするとき',
  '🚫 Refusing to dine with someone': '🚫 誰かと食事를 拒否するとき',
  '😏 A "polite" curse': '😏 「丁寧な」呪い',

  // Bap phrase English meanings (bap-eng divs)
  '"You won\'t even have rice!" — The ultimate threat. Not about literal food, but about consequences so severe you\'ll be left with nothing.': '「お前には飯も残らないぞ！」— 究極の脅し。文字通りの食べ物ではなく、何も残らないほど深刻な結果についてです。',
  '"I\'m truly grateful. I\'ll buy you a meal someday." — In Korea, offering a meal IS the expression of deep gratitude. It\'s heartfelt, not hollow.': '「本当にありがとう。いつかご飯をごちそうするよ。」— 韓국では、食事の申し出こそが深い感謝の표현です。心からの言葉であり、空虚ではありません。',
  '"Are you eating well (these days)?" — The Korean equivalent of "How are you?" Among close friends, checking if someone is eating is checking if they\'re okay.': '「最近ちゃんとご飯食べてる？」— 「元気？」에 相当する韓국式표현。親しい友人の間では、食事が아できているか확인することは、調子がいいか확인することと同じです。',
  '"Make sure you eat." — Korean mothers say this for every occasion. Tired? Eat. Sick? Eat. Heartbroken? Eat. Rice is medicine.': '「ちゃんとご飯食べなさいよ。」— 韓국のお母さんがどんな場面でも言う言葉。疲れた？食べなさい。病気？食べなさい。失恋した？食べなさい。ご飯は薬です。',
  '"Have you had your meal?" — A polite formal greeting used in offices, meetings, and even phone calls. More sincere than "nice to see you."': '「お食事はお済みですか？」— 職場、会議、電話でも使われる丁寧なフォーマルな挨拶。「お会いできて嬉しいです」より誠実な표현です。',
  '"Isn\'t that person really unappetizing?" — 밥맛없다 (bammateopsda) literally means "rice tastes bad" but means someone is so irritating they ruin your appetite.': '「あの人、本当에 食欲失わせるよね？」— 밥맛없다は文字通り「ご飯がまずい」を意味しますが、誰かがとても不快で食欲를 失わせることを意味します。',
  '"Being like that, can they even earn their rice?" — Questioning someone\'s ability to survive / provide for themselves. The harshest form of dismissal.': '「あんなで、ちゃんと食い扶持稼げるのか？」— 誰かの生活능력 / 自立능력을 疑う표현。最も厳しい형태의 軽蔑です。',
  '"You need to earn your rice (do your part)." — The minimum standard of pulling your weight. Said to employees, soldiers, students, and athletes.': '「せめて飯代くらいは稼げ。」— 自分の分を果たすための最低限の基準。従業員、軍人、학생、アスリートすべてに言われる言葉です。',
  '"I don\'t even want to eat rice with that person." — In Korea, sharing a meal = sharing trust and intimacy. Not wanting to eat together is total social rejection.': '「あの人とは飯も食いたくない。」— 韓国では、食事を共にすること＝信頼と親密さを分かち合うことです。一緒に食事をしたくないということは完全な사회적 拒絶です。',
  '"You rice dummy!" — 밥팅이 is a playful insult combining 밥 (rice) + 팅이 (suffix for a foolish person). Like calling someone a "rice-brain." Used between close friends.': '「このご飯バカ！」— 밥팅이는 밥（米）と팅이（愚かな人를 表す接尾辞）를 合わせた遊び心ある悪口。親しい友人の間で使われます。',
  '"Can you even swallow rice down your throat?" — Said to someone acting casually during a crisis, implying: "How can you eat when things are this serious?"': '「そんな深刻な상황에서 ご飯が喉를 通るのか？」— 危機的状況で平然としている人に言う言葉。「こんな深刻なのにどうしてご飯が食べられるの？」という意味です。',
  '"Does that feed you rice?" — The classic Korean parent shutdown of any impractical pursuit. Art? Music? Game streaming? "Does it put food on the table?"': '「それでご飯食べられるの？」— 非実用的な追求에 対する典型的な韓国の親의 制止。芸術？音楽？게임 배송？「それで食卓が賄えるの？」',
  '"You\'ve ruined my appetite for rice." — Said when someone\'s behavior is so revolting that it kills your hunger. The most powerful expression of disgust.': '「食欲なくした。」— 誰かの行動があまりに不快で空腹感がなくなるときに言う표현。不快感의 最強表現です。',
  '"They sure eat well, at least." — Sarcastic: the person is useless but eats enthusiastically. The passive-aggressive way of saying someone contributes nothing.': '「少なくとも、よく食べるよね。」— 皮肉：その人は役立たずだが熱心に食べる。誰かが何も貢献していないという回りくどい言い方です。',
  '"A person who buys meals for others well." — In surveys of ideal partners and mentors, this phrase appears constantly. Generosity with food = generosity of character.': '「人によくご飯をごちそうしてくれる人。」— 理想のパートナーやメンターの調査で常に登장するフレーズ。食べ物への寛大さ＝人格の寛大さです。',
  '"Rice power!" — 밥심 is the energy and strength you get from eating a proper rice meal. Koreans say you can\'t work out, study, or do anything meaningful without 밥심.': '「ご飯パワー！」— 밥심は、きちんとしたご飯를 食べることで得られるエネルギーと力です。韓国人は밥심なしでは運動も、勉強も、何か意味のあることもできないと言います。',
  '"The guy who puts his spoon on an already-set table." — Someone who swoops in at the end to take credit without doing any work. Pure freeloader.': '「全部整った食卓にスプーンだけ乗せるやつ。」— 何もせず최후에 現れて手柄를 横取りする人。純粋なフリーライダーです。',
  '"Whether it becomes porridge or rice." — 죽 (porridge) = failure; 밥 (rice) = success. Used to mean "come what may — we\'ll see how it turns out."': '「죽（おかゆ）になろうが밥（ご飯）になろうが。」— 죽＝失敗；밥＝成功。「どうなろうと — やってみればわかる」という意味で使います。',
  '"Iron rice bowl." — A job with iron-clad job security, especially civil servant positions. Your 밥통 (rice container) is made of 철 (iron) — it can never be taken away.': '「鉄のご飯茶碗。」— 鉄壁の雇用보장を持つ仕事、特に公務員ポスト。あなたの밥통は철（鉄）でできている — 決して奪われることはありません。',
  '"Those who eat together." — The Korean word for family member (식구) literally means "eating mouth." Family is defined by who shares your rice table — not just blood.': '「一緒に食べる者たち。」— 家族（식구）という韓国語は문자 그대로「食べる口」を意味します。家族は単に血縁だけでなく、あなたの食卓を共にする人によって定義されます。',
  '"You\'ll eat bean rice." — Prison rice in Korea historically contained beans. Saying "you\'ll eat 콩밥" = "you\'re going to jail." A threat or a warning.': '「豆ご飯を食うことになるぞ。」— 韓국의 刑務所のご飯は歴史的에 豆가 入っていました。「콩밥を食う」＝「刑務所に行く」。脅しや警告として使います。',
  '"Can\'t you even look after your own rice bowl?" — 밥그릇 (rice bowl) = your livelihood / position / turf. Someone who can\'t protect their own interests is hopelessly weak.': '「自分の飯椀も守れないのか？」— 밥그릇（飯椀）＝生計 / 地位 / 縄張り。자분의 利益も守れない人は絶望的なほど弱いです。',
  '"Does XX give you rice to eat?" — Insert any activity: gaming, YouTube, drawing, dancing. Korean elders\' universal rejection of anything they consider unproductive.': '「XXがご飯를 食わせてくれるの？」— ゲーム、YouTube、絵을 描く、ダンスなど何でも当てはまります。生産的でないと考えるものすべてに対する韓国의 年配者의 万能な拒絶표현。',
  '"I do not share a table." — 겸상 means sharing a dining table. Refusing to 겸상 with someone is a formal, cutting declaration of broken relationship.': '「私はあの人と同じ食卓には着かない。」— 겸상は食卓を共にすることを意味します。誰かとの겸상を拒否することは、関係断절의 公式で断固たる宣言です。',
  '"Eat well and live well." — Sounds like a blessing but is actually a passive-aggressive curse when said with the right tone: "Good luck without me. Go enjoy your life."': '「よく食べてよく生きてください。」— 祝福のように聞こえますが、適切なトーンで言うと受動攻撃的な呪いです：「私なしで頑張ってね。」',

  // Rice tip box
  'The Rice Dessert Paradox · 밥 디저트 문화': 'ご飯デザートの逆説 · 밥 디저트 문화',
  'Koreans sometimes order rice or 볶음밥 (fried rice) after finishing their main meal — not as a main course but as a "finisher." This baffles foreigners but makes perfect sense in Korean food culture: the meal isn\'t complete without rice. You might also see people take the leftover soup or sauce and fry rice in the same pan (남은 양념에 밥 볶기). True 밥심 in action.': '韓国人はメイン料理を食べた後に밥や볶음밥を追加주문することがあります — メイン料理としてではなく「締め」として。外国人は当惑しますが、韓国의 食文化では完全に理にかなっています：ご飯なしでは食事が完성되지않습니다。남은 양념에 밥 볶기（残った양념でご飯を炒める）人も見かけます。真の밥심의 実践です。',

  // Rice vocabulary table
  '📚 Rice Vocabulary · 밥 관련 단어': '📚 ご飯の語彙 · 밥 관련 단어',
  'Cooked rice / meal': '炊いたご飯 / 食事',
  'Uncooked rice (the grain)': '生米（米粒）',
  'Strength/energy from eating rice': 'ご飯を食べることで得られる力 / エネルギー',
  'Family member (lit. "eating mouth")': '家族（直訳：「食べる口」）',
  'Sharing a dining table': '食卓를 共にすること',
  'Rice bowl / one\'s livelihood': '飯椀 / 生計手段',
  'Iron rice bowl (secure job)': '鉄の飯椀（安定した仕事）',
  'Bean rice / prison (slang)': '豆ご飯 / 刑務所（スラング）',
  'Dining table set with food': '料理が並んだ食卓',
  'Fried rice': 'チャーハン',

  // § Minor protection section
  'Over-Protection of Minors · When the Law Tilts Too Far': '未成年者の過保護 · 法律が行き過ぎたとき',
  'Korea has progressively tightened laws protecting children and minors — but many Koreans argue the pendulum has swung too far, creating systems that protect perpetrators, paralyze teachers, and create dangerous imbalances in accountability. These are among the most hotly debated domestic issues in contemporary Korean society.': '韓国は子どもや未성년을 보호する法律を段階的에 強化してきましたが、많은 韓国人はふり子が行き過ぎて、가해자를 保護し、教師を麻痺させ、책임의 危険なアンバランスを生み출す制度を作ったと主張しています。これらは현대韓国社会で最も激しく議論されている국내문제です。',
  '📋 Criminal Immunity for Children': '📋 子どもの刑事免責',
  '🚗 Child Death → Driver Liability Law': '🚗 子どもの死亡 → ドライバー責任法',
  '🏫 School Zones Speed Restriction': '🏫 スクールゾーンの速度制限',
  '🍎 Teacher Rights in Free Fall': '🍎 急落する教師の権利',
  'Juvenile Law (Under-14 Criminal Immunity)': '少年法（14歳未満の刑事免責）',
  'The "Minsik Law" (2020) — School Zone Strictness': '「ミンシク法」（2020年）— スクールゾーンの厳格화',
  '30 km/h Maximum — 24 Hours a Day, 7 Days a Week': '最高30km/h — 24時間・週7日',
  'When Student Protection Becomes Teacher Persecution': '학생보호が教師迫害になるとき',
  'Children under 14 cannot be criminally prosecuted under Korean law. Instead of prison, they receive "보호처분 (boyho cheoobun)" — protective measures like probation, short-term detention facilities, or counseling. Critics argue that this creates a loophole exploited by minors who commit serious crimes knowing they face no real consequences. Violent school bullying cases involving children under 14 regularly go unpunished, and headlines about minors committing robbery, assault, or even worse crimes have intensified public pressure to revise the law. The debate: how do you balance rehabilitation potential with accountability and victim protection?': '14歳未満の子どもは韓국法の下では刑事訴追を受けることができません。刑務所の代わりに「보호처분（保護処分）」— 保護観察、短期拘留施設、カウンセリングなどの保護措置を受けます。批評家は、これが深刻な犯罪を犯しても実際의 結果를 恐れないことを知っている未성년자에 悪用される抜け穴を작성していると주장します。14歳未満の子どもを含む暴力的ないじめ사건は定期的に처벌されないままとなり、国民의 法改正への압력が高まっています。',
  'Named after a child (김민식, Kim Min-sik) who died in a school zone accident in 2019, this law mandates that drivers who injure or kill a child in a school zone face enhanced penalties — even if they were not at fault. A driver going within the speed limit, with a green light, can still be criminally charged if a child darts into the road. This has caused enormous controversy: many Koreans believe the law punishes innocent drivers based on outcome rather than intent or negligence. Some drivers report anxiety attacks from driving near school zones; dashcam footage businesses boomed after the law passed.': '2019年のスクールゾーン事故で亡くなった子ども（김민식）にちなんで命名されたこの法律は、たとえ過失がなくても、スクールゾーンで子どもを負傷させたり死亡させたりしたドライバーに加重ペナルティを課すことを義務付けています。制限速度内で青信号で走行しているドライバーでも、子どもが飛び출してきた場合は刑事告訴される可能性があります。この법은大きな논란を引き起こしました。',
  'School zones (스쿨존, seukul-jon) enforce a 30 km/h speed limit — not just during school hours, but 24/7, including weekends and midnight. Red light cameras are placed every few meters, and fines are doubled compared to regular roads. Critics point out that these zones can extend far from actual schools and that the 24-hour enforcement regardless of child presence creates inefficiency and frustration without proportional safety benefits. Comparisons to European school zones — where limits apply only during school hours with proper signage — fuel the debate about whether Korea\'s approach is evidence-based or performative.': 'スクールゾーン（스쿨존）では30km/hの速度制限が施행されています — 학교授業時間だけでなく、週末や深夜を含む24時間。信号무시カメラは数メートルごとに설치され、罰金は通常の道路의 2倍です。批評家은、これらのゾーンが実際の学校から遠くまで延びている場合があり、子どもの存在に関わらず24時間施行することが比例的な안전メリットなしに非효율と불만을 생み출していると指摘します。',
  'By 2023, Korean teachers were staging mass protests — 수만 명의 교사들이 거리로 나왔다 (tens of thousands of teachers took to the streets). The trigger: a Seoul elementary school teacher took her own life after relentless harassment from a student\'s parents. Korean "student protection law" (학생인권조례) had, in practice, made it nearly impossible for teachers to discipline students. Parents increasingly weaponized child protection laws against teachers, filing criminal complaints for acts as minor as asking a student to sit down. The result: teachers stopped teaching out of fear of litigation. In 2023, the government began revising the law to rebalance teacher authority.': '2023年までに、韓국의 教師たちは大規模な抗議活動を행했ます。きっかけは、ソウルの小학교教師가 保護者からの絶え間ないハラスメントの末에 自ら命を絶ったことでした。韓국의 「학생인권조례」은 実際에는、教師が생徒を指導することをほぼ不可能にしていました。保護者は儿童보호法를 教師に対する武器として使い、「座りなさい」と言っただけで刑事告訴를 申し立てました。2023年、政府は法律의 改正を開始했습니다。',
  '📚 Legal Vocabulary · 법 관련 단어': '📚 法律語彙 · 법 관련 단어',
  'Juvenile below criminal age of responsibility': '刑事責任年齢未満の少年',
  'School zone / children\'s protection zone': 'スクールゾーン / 児童보호구역',
  'Protective disposition (juvenile)': '保護処分（少年）',
  'Student rights ordinance': '학생인권조례',
  'School zone (loanword)': 'スクールゾーン（외래어）',

  // § Delivery section
  'The Speed Culture · Same-Day Delivery & 대리운전': 'スピード文化 · 当日配達 & 대리운전',
  'Korea has built the world\'s fastest delivery infrastructure — not just for packages, but for hot food, alcohol, and even cars. The country\'s obsession with speed, efficiency, and service has created an on-demand culture that makes the rest of the world feel frustratingly slow. Once you\'ve lived in Korea, Amazon 2-day delivery feels like medieval logistics.': '韓国은 世界最速의 配達インフラを구築しました — 荷物だけでなく、温かい食べ物、お酒、さらには車まで。スピード、効율、サービスへの執着が온디맨드文化를 生み出し、世界의 他の国がとても遅く感じられます。韓국에서 一度暮らしたことがある人에게는、Amazonの2日配達が中世の物流のように感じます。',
  'Average food delivery time in Seoul': 'ソウルの平균フード配達時間',
  'World\'s highest online food delivery rate per capita': '1人당 온라인フード配達 世界最高率',
  'Annual food delivery orders in Korea': '韓국の年間配達注文件数',
  'Coupang "Dawn Delivery" — ordered by midnight, arrives by 7am': 'クーパン「夜明け配達」— 深夜0時までに주문、午前7時までに到着',
  '30 minutes': '30分',
  '배달의민족 standard': '배달의민족のスタンダード',
  '배달의민족 (Baemin) — Korea\'s Delivery King': '배달의민족（Baemin）— 韓국의 配達王',
  '배달의민족 (Delivery Nation) is Korea\'s dominant food delivery app, handling over half a billion orders per year. The app is so deeply embedded in Korean life that it created its own font (배민 폰트), runs its own humor campaigns, and sponsors K-Pop artists. You can order치킨 (fried chicken), 삼겹살 (pork belly), 분식 (street food), coffee, and even grocery items for delivery within the hour — often in 30 minutes. Competitors Coupang Eats and Yogiyo fight for the remainder of the massive market.': '배달의민족（配達民族）は韓国最大のフードデリバリーアプリで、年間5億件以上의 주문을 処理しています。このアプリは韓国의 生活에 深く根ざしており、독자적인フォント（배민 폰트）를 作成し、독자적인ユーモアキャンペーンを展開し、K-Popアーティストをスポンサーしています。치킨、삼겹살、분식、コーヒー、食料품まで1時間以内 — 많은 경우30分以내 — で配達注문できます。',
  'Delivery riders are a massive workforce in Korea. Working as 배달 라이더 is a common side job (알바). Riders are known for extreme speed and agility — weaving between traffic on motorcycles. The job is financially lucrative but physically dangerous on busy urban streets.': '配달ライダーは韓국의 膨大な労働力です。배달 라이더として働くことは一般的な副業（알바）です。ライダーはオートバイで交통の間を縫う極限のスピードと敏捷さで知られています。収入은 良いですが、賑やかな都市의 道路では身体的에 危険な仕事です。',
  'Coupang\'s "Dawn Delivery" (새벽배송) lets you order groceries, household goods, and electronics by midnight and receive them before 7am. The service uses massive logistics networks and night-shift workers to achieve what seemed impossible — next-day before breakfast delivery.': 'クーパンの「夜明け配達」（새벽배송）では、深夜0時までに食料品、日用品、電子機器를 주문し、午前7時前に受け取ることができます。このサービスは大規模な물류ネットワークと夜勤労働者를 使って、不可能에 思えることを実現しています — 朝食前의 翌日配達。',
  'Designated driver service, uniquely Korean. After drinking, you call a 대리기사 (designated driver) who arrives by taxi or motorcycle, drives your car home, and you pay per kilometer. This service made it possible for Koreans to drink freely without abandoning their car — and spawned an entire industry of professional sober drivers who work nights.': '指定ドライバーサービス、韓国독자のもの。飲酒後에 대리기사（指定ドライバー）を呼ぶと、タクシーやオートバイで来て、自分의 車를 家まで運転してくれ、キロ単位で料金を支払います。このサービスにより、韓국人은 車를 放棄せずに自由에 飲酒できるようになり、夜間에 働くプロのソバードライバーの産業가 생まれました。',
  'Korea\'s delivery app ecosystem (배달의민족, 쿠팡이츠, 요기요) has turned every restaurant into a virtual delivery service. Even small, traditional pojangmacha (street food stalls) now deliver. The pandemic supercharged this trend — Korea\'s delivery market doubled between 2019 and 2022.': '韓국의 配달アプリエコシステム（배달의민족、쿠팡이츠、요기요）はすべてのレストランを仮想配달サービスに変えました。小さな伝統的なポジャンマチャ（屋台）も今や配達します。パンデミックがこのトレンドを加速させ、韓국의 配달市場は2019年から2022年の間에 2倍になりました。',
  '📖 Delivery Vocabulary · 배달 단어': '📖 配달語彙 · 배달 단어',
  'Delivery': '配達',
  'Same-day delivery': '当日配達',
  'Dawn delivery (before 7am)': '夜明け配達（午前7時前）',
  'Designated driver service': '代行運転サービス',
  'Delivery fee': '配達料金',
  'Delivery person / rider': '配達員 / ライダー',

  // § Ecology section
  'Where the Globally Endangered Are Locally Abundant': 'グローバルに절멸위기종가 地元では豊富な나라',
  'Korea has a paradoxical ecological profile: species that are critically endangered or extinct everywhere else in the world thrive in such numbers in Korea that they\'re considered pests or nuisances. Meanwhile, species that cause ecological damage elsewhere have been largely eliminated by Korean appetite. The relationship between Koreans and their natural environment is uniquely shaped by centuries of dense human settlement and a culture that eats almost everything.': '韓국は역설적な生態的特性을 持っています：世界의 他の場所では深刻에 절멸위기または멸종한 種가、韓国では害虫や厄介者とみなされるほどの数で繁栄しています。一方、他の場所で生態系에 損害를 与える種は、韓국인의 食욕によって大部分が排除されています。',
  'Abundant in Korea': '韓국では豊富',
  'Population: Thriving': '個体数：繁栄中',
  'Rare Elsewhere, Eaten Here': '他では희귀、ここでは食べる',
  'Urban Forest Wildlife': '都市近郊の野생動物',
  'Agricultural Pest': '農業害虫',
  'Water Deer · Hydropotes inermis': 'ヤマネコシカ · Hydropotes inermis',
  'Ginkgo Tree · Ginkgo biloba': 'イチョウ · Ginkgo biloba',
  'Korean Magpie · National Bird': 'カササギ · 韓국의 国鳥',
  'Invasive Species That Couldn\'t Survive Korean Appetite': '韓국인의 食욕에서 生き延びられなかった外来種',
  'Wild Boar · Urban Mountain Encounters': 'イノシシ · 都市의 山での遭遇',
  'Ring-Necked Pheasant · National Game Bird': 'キジ · 韓국의 狩猟国鳥',
  'The water deer (고라니) is listed as Vulnerable on the IUCN Red List globally — its wild population in China has collapsed. In Korea, however, it\'s so numerous that it\'s an agricultural pest, causing crop damage and frequent road accidents. Korea holds roughly 90% of the world\'s wild water deer population. Farmers curse them; wildlife photographers in other countries envy Korea\'s abundance.': 'ヤマネコシカ（고라니）는 世界的にIUCNレッドリストで脆弱種에 分類されています — 中国의 野生個体群은 崩壊しました。しかし韓국에서は、農業害虫となるほど多く、作物被害や頻繁な交통事故를 引き起こしています。韓国は世界의 野生ヤマネコシカの約90%を보유しています。',
  'The ginkgo tree is classified as Endangered in the wild globally — it survives naturally only in small pockets of eastern China. In Korea, it lines almost every major street in every city. Seoul\'s autumn streets turn brilliant gold from millions of ginkgo trees. The pungent smell of fallen ginkgo nuts (은행, eunhaeng) in autumn is one of the most recognizable Korean urban scents. Many Koreans consider them a nuisance while the rest of the world struggles to preserve them.': 'イチョウの木는 世界的에 野生では絶滅危惧種에 分類されています — 中国東部のわずかな地域でのみ自然に생존しています。韓국에서は、ほぼすべての都市のほぼすべての主要な通りに並んでいます。ソウルの秋의 街路は수백만 본の이はイチョウの木で鮮やかな金色になります。',
  'The magpie (까치, kkachi) is Korea\'s national bird, believed to bring good news. Unlike many regions where human development destroys bird populations, Korean magpies have thrived in urban environments — adapting to city life and nesting in power poles and apartment balconies. They\'re so numerous and loud that they\'ve become something of an urban noise complaint. Koreans have a saying: "까치가 울면 손님이 온다 (When a magpie calls, guests are coming)."': 'カササギ（까치）는 韓국의 国鳥で、良い知らせをもたらすと信じられています。人間의 開発が鳥의 個体群를 破壊する多くの地域とは異なり、韓国のカササギは都市環境で繁栄しています — 都市생활에 適応し、電柱やマンションのバルコニーに巣を作っています。',
  'Many species that cause ecological devastation elsewhere — bullfrog (황소개구리), coypu (뉴트리아), snapping turtle (늑대거북) — were introduced to Korea but struggled because Koreans simply ate them. The bullfrog was introduced in the 1970s for its legs and is now strictly controlled; the coypu was farmed for fur and escaped but Koreans caught and ate them. This "eat the invasive" phenomenon, while not formalized policy, has shaped Korea\'s ecosystem in unexpected ways.': '他の場所で生態系의 破壊를 引き起こす多くの種 — ウシガエル（황소개구리）、ヌートリア（뉴트리아）、カミツキガメ（늑대거북）— が韓국에 導入されましたが、韓국인가 단순히食べてしまったために苦境에 立たされました。ウシガエルは1970年代に脚のために도입され、現在は厳しく관리されています。',
  'Wild boars (멧돼지, metdwaejji) have become a growing urban problem in Seoul and other cities built around mountains. Korea\'s "greenbelt mountains" (개발제한구역 산) surrounding cities harbor thriving wildlife. As human-wildlife boundaries blur, boar sightings in apartment complex parking lots have become newsworthy. The 잡식성 boar has thrived partly because strict mountain preservation laws in Korea have created undisturbed habitat.': 'イノシシ（멧돼지）는ソウルや山を囲む他의 都市で増大する都시問題となっています。都市를 取り巻く韓국의 「개발제한구역 산（グリーンベルト）」は繁栄する野生生物를 抱えています。人間と野生動物의 境界が曖昧になるにつれ、マンションの駐車場でのイノシシ目撃がニュースになっています。',
  'The pheasant (꿩, kkwong) appears in Korean proverbs, folk art, and cuisine. It\'s abundant across Korean mountains and farmland — so common that its feathers are used for traditional hat decorations (갓) and it appears in the expression "꿩 먹고 알 먹기 (eat the pheasant and its egg)." Pheasant soup (꿩 요리) is a regional specialty in some areas, especially 제주도.': 'キジ（꿩）は韓국의 ことわざ、民俗芸術、料理に登장합니다。韓국의 山や農地에 豊富で — とても一般的なため、その羽は伝統的な帽子の飾り（갓）에 使われ、「꿩 먹고 알 먹기」という표현에 登場します。一部の地域、特に제주도의 地域료리です。',

  // § Table culture section
  'Korean Table Culture · The World\'s Most Efficient Restaurant Dining': '韓국의 テーブル문화 · 世界最効率のレストランダイニング',
  'Korean restaurant dining involves several practices that confuse or delight foreign visitors. The table call bell, the scissors for cutting meat, the strict separation of dining and dessert venues — all of these reflect a Korean culture of efficiency, directness, and the belief that food deserves full, undivided attention in the right setting.': '韓국의 レストランでの食事は、外国人訪問者를 당惑させたり喜ばせたりする様々な慣行を含んでいます。テーブルコールベル、肉를 切るハサミ、食事とデザートの場所를 厳格에 分けること — これらすべてが、효율性、直接性、そして適切な環境で食べ物は完全な集中에 値するという韓국문화를 반영しています。',
  'Every Korean restaurant table has a call bell. You press it when you want a server — never wave your arms or shout awkwardly across the room. The bell system is the most dignified solution to the age-old restaurant problem of flagging down staff. It respects both the customer\'s time and the server\'s workflow. High-end restaurants now use wireless buttons; fast-casual spots use touchscreen panels. The concept is so sensible that foreigners always ask: "Why doesn\'t every country do this?"': 'すべての韓국의 レストランテーブルにはコールベルがあります。スタッフが必要なときはボタンを押します — 腕を振ったり、部屋の向こうに向かって奇妙에 叫んだりする必要はありません。ベルシステムはスタッフを呼び止めるというレストランの古くからの問題에 対する最も上品な解決策です。外国人は常에 尋ねます：「なぜすべての国がこうしないの？」',
  'Tablet-based table ordering is rapidly replacing the call bell in Korea. Touchscreen tablets are mounted on each table — browse the menu, order directly, pay without ever speaking to a server. This system reduces wait times, language barriers for foreign tourists, and labor costs for restaurants. Many 편의점 (convenience stores) and fast food chains have adopted fully automated ordering kiosks. Korea\'s transition from bell → tablet → AI ordering is among the fastest in the world.': 'タブレットベースのテーブルオーダーが韓국에서 急速에 コールベルに取って代わっています。各テーブルにタッチスクリーンタブレットが설치されており、メニューを閲覧し、直接注문し、スタッフと一言도 話さずに支払いができます。このシステムは待ち時間、外국인観光客의 言語バリア、레스토랑의 労働コストを削減します。',
  'In Korean restaurants, scissors are a standard utensil. Server will often cut your samgyeopsal (삼겹살 pork belly), galbi (갈비 ribs), or noodles with scissors right at the table. Foreign visitors often look shocked — but it\'s hygienic, practical, and fast. Scissors cut meat more cleanly than knives in the context of Korean BBQ, where cuts are done mid-cook directly on the grill. They\'re also used to portion 냉면 noodles, 보쌈 cuts, and even 족발(pork feet).': '韓국의 レストランでは、ハサミは標準的な食器です。スタッフがテーブルで直접삼겹살、갈비、または麺をハサミで切ってくれることがよくあります。外国人訪問者はしばしば驚いた様子를 見せますが — 衛生的で、実用的で、速いです。ハサミはナイフよりもきれいに肉를 切れます（特にグリルの上で調理中に行うKBBQの場면에서）。',
  'Koreans almost never have dessert at the same restaurant where they ate the main meal. After dining, the group moves to a separate café or dessert shop — 카페 거리 (café street), 디저트 카페 (dessert café), or 빙수 집 (shaved ice shop). This separation creates two distinct experiences: the meal is the meal; dessert is its own event. It\'s also economically smart — café profit margins are higher than restaurant margins, so this custom naturally benefits the local dessert industry.': '韓국人はメインの食事をした同じレストランでデザートを食べることはほとんどありません。食사の後、グループは별도の카페やデザートショップ — 카페 거리、디저트 카페、または빙수 집 — に移動します。この분리가 2つの異なる체験을 生み출します：食事は食事；デザートは독자のイベント。',
  '💬 Restaurant Korean Phrases · 식당 회화': '💬 レストランの韓국語フレーズ · 식당 회화',
  '"Over here!" — Call a server. Still used even with bells.': '「すみません！」— スタッフを呼ぶ。ベルがあっても使われる。',
  '"Please cut it (for me)." — Request for scissors service.': '「切ってください。」— ハサミサービスのリクエスト。',
  '"Please give me the check." — Standard bill request.': '「お会計をお願いします。」— 標準的な会계リクエスト。',
  '"Is a refill possible?" — Refills on side dishes (반찬) are free at most Korean restaurants.': '「おかわりできますか？」— ほとんどの韓국レストランで반찬のおかわりは無料。',

  // § Transport section
  'Public Transport Heaven · Fast, Cheap, Dense, Integrated': '公共交通機関의 天国 · 速くて安くて密で統合された',
  'Seoul\'s public transport system is consistently ranked among the top 3 in the world — and for good reason. It\'s cheaper, cleaner, more punctual, and more comprehensive than almost any city on Earth. Understanding how it works also requires understanding key Korean vocabulary that reflects how deeply transportation is woven into daily life.': 'ソウルの公共交通機관システムは世界トップ3에 一貫してランクされています — それには十分な理由があります。地球上のほぼすべての都市よりも安く、清潔で、정시운행으로、包括的です。その仕組みを理解するには、교통이 日常생活에 いかに深く織り込まれているかを반영する重要な韓国語語彙도 理解する必要があります。',
  'Base subway fare (~$1.10 USD) — among world\'s cheapest': '地下鉄基本料金（約150円）— 世界最安値水準',
  'Seoul has 9 main subway lines + multiple additional lines': 'ソウルには9つのメイン地下鉄路線 + 複数의 追加路線',
  'On-time rate for Seoul Metropolitan Subway': 'ソウル都市鉄道의 定時運行率',
  'Average Seoul commute distance covered in 30 minutes by subway': '地下鉄で30分でカバーできるソウルの平均通勤距離',
  'Seoul Metro is the world\'s 3rd busiest subway system by annual ridership. Trains run every 2-3 minutes during rush hour, have free WiFi in every car, and feature heated seats, quiet cars, priority seating (노약자석), and real-time status apps. Stations are malls in themselves — you can get a haircut, eat a meal, and buy electronics without surfacing. The system connects to Incheon Airport via AREX direct express (43 minutes city to terminal).': 'ソウルメトロは年間利用者数で世界第3位の地下鉄システムです。電車はラッシュアワー時에 2〜3分ごとに운行し、全車両에 無料WiFiがあり、温熱シート、静粛車、優先席（노약자석）、リアルタイムアプリを備えています。駅自体がモールになっており、地上に出ることなく散髪し、食事をとり、電子機器를 買えます。',
  'Seoul\'s bus system is color-coded by function: 파란버스 (blue) for long-distance express routes; 초록버스 (green) for local neighborhood coverage; 빨간버스 (red) for metropolitan region connections; 노란버스 (yellow) for city center circular loops. Buses are GPS-tracked and arrival times are shown at every stop on electronic displays and in real-time smartphone apps — no waiting in uncertainty.': 'ソウルのバスシステムは機能でカラーコード화されています：파란버스（青）は長距離急行路線、초록버스（緑）は地域노선、빨간버스（赤）は首都圏接続、노란버스（黄）は都心環状ループ。バスはGPS追跡され、到着時間はすべての停留所의 電光掲示板とリアルタイムアプリで표시されます。',
  'The T-money card (티머니) or credit card is tapped on every bus and subway. Korea\'s genius is the 환승 할인 (transfer discount): transfer between bus and subway within 30 minutes and you pay only the additional distance — not a new fare. A journey combining bus + two subway lines can cost the same as one subway trip. This integrated fare system incentivizes multi-modal travel and reduces car use dramatically.': 'T-moneyカード（티머니）またはクレジットカードをすべてのバスと地下鉄でタップします。韓국의 天才的な点は환승 할인（乗り換え割引）：30分以내에 バスと地下鉄를 乗り換えると、新しい運賃ではなく追加距離分だけ払います。バス + 地下鉄2路線를 組み合わせた旅程が地下鉄1回分と同じ料金になることがあります。',
  'Seoul\'s "Owl Bus" (올빼미버스, named for the night owl) runs after midnight when the subway closes — covering 9 routes across the city based on big-data analysis of late-night taxi travel patterns. The city used anonymized mobile data to determine where people actually need rides at 2am, then designed the routes accordingly. It\'s an example of Seoul\'s data-driven urban governance.': 'ソウルの「フクロウバス」（올빼미버스）は地下鉄が終了する深夜0時以降에 운행します — 深夜のタクシー移동패턴의 빅データ분석에 基づいて市内9路線をカバーします。市は익명화된モバイルデータを使用して午前2時に人々가 実際にどこで乗車が必要かを決定し、それに応じて路線를 설계しました。',
  'Even outside Seoul, Korean cities like Busan, Daegu, Incheon, Daejeon, and Gwangju have excellent metro and bus systems. KTX (Korea Train Express) bullet trains connect Seoul to Busan in 2 hours 15 minutes — the cities are 400km apart. SRT connects the Gangnam area directly to the same high-speed network. Train punctuality in Korea rivals Japan\'s famous Shinkansen.': 'ソウル以外でも、釜山、大邱、仁川、大田、光州などの韓국都市에 優れた地下鉄とバスシステムがあります。KTX（韓国鉄道）の新幹線はソウルと釜山を2時間15分で結びます — 両都市間は400kmです。SRTは江南エリアを同じ고속ネットワークに直接接続します。',
  'Korean taxis (택시, taekshi) are affordable and abundant. 카카오택시 (Kakao Taxi) app lets you book and track taxis seamlessly — the Korean equivalent of Uber. Premium "모범 택시 (model taxis)" in black feature more professional drivers. There are also 반반택시 (half-half taxis) that match strangers going the same direction to split the fare — a uniquely Korean carpooling innovation.': '韓국의 택시는手頃な価格で豊富です。카카오택시アプリでシームレスにタクシーを予約・추적できます — Uberに相当する韓国版。プレミアムな「모범 택시」は黒色で、よりプロフェッショナルなドライバーが특징です。同じ方向に行く見知らぬ人をマッチングして料金を分담する반반택시もあります。',
  '📖 Transport Vocabulary · 교통 단어': '📖 交通語彙 · 교통 단어',
  'Subway / metro': '地下鉄 / 電鉄',
  'Transfer (bus ↔ subway)': '乗り換え（バス ↔ 地下鉄）',
  'Transit card (T-money)': '交通カード（T-money）',
  'Priority seat (elderly/disabled)': '優先席（高齢者 / 障害者）',
  'Last train / last bus': '終電 / 終バス',
  'Exit (subway station)': '出口（地下鉄駅）',
  'Express train': '急行列車',

  // § Jjimjilbang section
  'Jjimjilbang · Korea\'s All-Night Sauna Culture': 'チムジルバン · 韓国의 徹夜サウナ文화',
  '찜질방 (jjimjilbang) is a uniquely Korean institution — a large public bathhouse, sauna, and social space that serves as a hotel for the night, a hangover cure, a family outing destination, a date spot, and a refuge for people who missed the last train home. Open 24 hours, costing around 10,000–15,000 won (~$7-11), a jjimjilbang offers multiple heated rooms, cold pools, hot tubs, food stalls, a sleeping hall, and entertainment areas — all under one roof.': '찜질방は独自에 韓国的な施設です — 大型の公共浴場、サウナ、社交スペースが一つになり、一晩のホテル、二日酔い治療、家族のお出かけ先、デートスポット、そして終電를 逃した人々의 避難場所として機能します。24時間営업で약10,000〜15,000ウォンで、찜질방は複数의 暖かい部屋、냉水プール、온수浴槽、屋台、仮眠ホール、エンターテイメントエリアを一つ屋根の下で提供します。',
  '🔥 Jjimjilbang Room Types · 찜질방 방 종류': '🔥 찜질방의 部屋の種類 · 찜질방 방 종류',
  'The hottest room — a "fire kiln" sauna built from clay and fired like a pottery kiln. Intense dry heat that induces maximum sweating. People stay 5-10 minutes max, then cool down in cooler rooms.': '最も熱い部屋 — 粘土から作られ、陶器의 窯のように焼かれた「火의 窯」サウナ。最大의 発汗를 促す強烈な乾燥した熱。人々は最大5〜10分滞在し、その後涼しい部屋で冷やします。',
  'The yellow soil (황토) room — walls made from ocher clay believed to emit far-infrared radiation and negative ions. Popular for skin health. The warm earthy smell is characteristic of traditional Korean wellness.': '황토部屋 — 遠赤外線と陰イオンを放射すると信じられている黄土粘土で作られた壁。肌의 健康에 人気。温かい土の香りは伝統的な韓국 wellness의 特징です。',
  'Salt room — the walls, floor, and ceiling are covered in crystallized salt. Believed to have antibacterial properties and beneficial effects on respiratory health. The room has a distinctive sharp, mineral smell.': '塩의 部屋 — 壁、床、天井が結晶화した塩で覆われています。抗菌性と呼吸器의 健康への有益な効果があると信じられています。部屋には独特의 鋭いミネラルの匂いがあります。',
  'Jade or elvan stone room — a gentler heat option lined with semi-precious stones. Suitable for longer stays and families with children. The stone floor is often where families lie down together to chat.': '玉石またはエルヴァン石의 部屋 — 半貴石で並んだ穏やかな熱のオプション。長時間の滞在や子連れの家族에 適しています。石의 床は家族が一緒に横になってお喋りする場所になることが多いです。',
  'The ice room — a shocking contrast room chilled to near-freezing. After sweating in the hot rooms, sitting in the ice room triggers a powerful circulatory response. The contrast therapy is considered highly rejuvenating.': 'アイスルーム — 氷点近くまで冷やされた衝撃的なコントラスト부屋。熱い부屋で汗をかいた後、アイスルームに入ると強力な循環반응이 引き起こされます。コントラスト療法は非常에 若返り効果があると考えられています。',
  'Hot pool (온탕) and cold pool (냉탕) in the segregated bath areas. Alternating between the two stimulates circulation and is the foundation of Korean 목욕 (mokyok) bathing culture.': '分離された浴場エリアの온탕（温浴槽）と냉탕（冷水プール）。この2つを交互に使うことで血行が促進され、韓国의 목욕入浴文화의 基盤となっています。',
  '찜질방 Food Culture — 맥반석 달걀 & 식혜': '찜질방の食文화 — 맥반석 달걀 & 식혜',
  'Two foods are inseparable from the jjimjilbang experience: 맥반석 달걀 (elvan stone eggs — hard-boiled slowly in the heated rooms until the shell turns brown and the white caramelizes slightly) and 식혜 (sikhye — a cold, sweet rice drink). Both are sold at jjimjilbang snack counters for 500-1,000 won. Eating brown eggs while sitting on a heated floor mat, wearing the hospital-style uniforms provided by the jjimjilbang, is a quintessentially Korean experience. First-timers immediately understand why Koreans say "찜질방 가자!" (Let\'s go to the jjimjilbang!) whenever they\'re stressed, tired, or need to bond.': '찜질방체험에 欠かせない2つの食べ物：맥반석 달걀（エルヴァン石卵 — 暖かい部屋でゆっくりゆで、殻が茶색になり白身が少しカラメル화するまで加熱）と식혜（冷たい甘い米飲料）。どちらも찜질방のスナックカウンターで500〜1,000ウォンで販売されています。찜질방が提供する病院スタイルのユニフォームを着て、暖かい床マットに座って茶색의 卵を食べることは、典型的に韓국的な体験です。',
  '📖 Jjimjilbang Vocabulary · 찜질방 단어': '📖 찜질방語彙 · 찜질방 단어',
  'Korean sauna / bathhouse complex': '韓국의 サウナ / 浴場複合施設',
  'Public bathhouse (smaller, traditional)': '公衆浴場（小規模、伝統的）',
  'Body scrub service (removes dead skin)': 'ボディスクラブサービス（角質除去）',
  'Exfoliating mitt ("Italy towel")': '垢擦りミット（「イタリアタオル」）',
  'Stone-heated brown eggs (jjimjilbang snack)': '石焼き茶色卵（찜질방의 스낵）',
  'Sweet rice drink (jjimjilbang staple)': '甘い米ドリンク（찜질방의 정番）',
  'Traditional Korean sauna room': '伝統的な韓국サウナ室',

  // § Plastic surgery section
  'Korea\'s Plastic Surgery Culture · Beauty Redefined': '韓국의 整形文화 · 再定義される美',
  'Korea leads the world in cosmetic surgery per capita — a position that reflects not vanity but a complex interplay of fierce job market competition, the cultural importance of appearance, the influence of K-Pop beauty standards, and a highly advanced, affordable medical industry. Understanding Korean plastic surgery culture means understanding why Koreans see self-investment through beauty as logical, not shameful.': '韓국は一人당の美容外科手術で世界をリードしています — これは虚栄심이 아닌、激しい취업市場競争、外見의 文화的重要性、K-Popの美的基準의 影響、そして高度에 発達した手頃な価格의 医療産業의 複雑な相互作用를 반영しています。',
  'World\'s highest cosmetic surgery rate per capita': '一人당의 美容整形率 世界最高',
  'Estimated % of Seoul women aged 20-29 who\'ve had a procedure': 'ソウルの20代女性で整形経験者의 推定割合',
  'Gangnam district — world\'s densest concentration of plastic surgery clinics': '江南区 — 世界最密度의 美容整形クリニック集積',
  'Male plastic surgery rates rising fastest in Korea': '男性整形率의 上昇が韓국で世界最速',
  'Most Common #1': '最多実施 #1',
  'Most Common #2': '最多実施 #2',
  'Face Structure': '顔面構造',
  'Non-Surgical': '非外科的',
  'Cultural Context': '文화的背景',
  'Medical Tourism': 'メディカルツーリズム',
  'Double eyelid surgery — creating an upper eyelid crease that many East Asians don\'t naturally have. One of the most common cosmetic procedures in the world, and in Korea it\'s performed in under an hour, costing as little as 500,000 won (~$370 USD). Some parents gift it to children as a high school graduation present.': '二重まぶた手術 — 多くの東アジア人가 自然には持たない上まぶたのクリースを作ります。世界で最も一般的な美容処置의 一つで、韓국에서는1時間以内에 行われ、費用は50万ウォンからです。高校卒業プレゼントとして子どもにプレゼントする親もいます。',
  'Rhinoplasty (nose job) — typically to add a bridge (콧대 높이기) or refine the tip (코끝 수술). The "tall nose bridge" aesthetic is deeply linked to Korean beauty standards. Implants or cartilage from the ear/ribs are used. Korea\'s surgical techniques for rhinoplasty are considered among the world\'s most advanced.': '鼻形成術 — 通常、鼻筋를 高くする（콧대 높이기）または鼻先를 整える（코끝 수술）ために行います。「高い鼻筋」の美学は韓국의 美의 基準와 深く결부されています。耳または肋骨の軟骨またはインプラントが使用されます。',
  'Jaw reduction surgery — shaving the jaw bone (사각턱) to achieve the V-line (V라인) face shape that dominates Korean beauty standards. This is major surgery requiring general anesthesia and weeks of recovery. Korea is the only country where this procedure is performed routinely and affordably, drawing medical tourists from across Asia.': 'あご骨削り手術 — 韓국의 美의 基準를 支配するVライン（V라인）の顔型를 達成するために顎骨（사각턱）를 削ります。これは全身麻酔と数週間의 回復를 필요とする大手術です。韓국は이 手術가 日常的かつ手頃에 行われる唯一의 国であり、アジア全域からメディカルツーリストを集めています。',
  'Botox and filler injections are so normalized in Korea that many office workers get them during lunch breaks. Gangnam\'s "Medicine Street" (의원 거리) has clinics offering 15-minute botox sessions. The 피부과 (dermatology clinic) culture means Koreans maintain skin and facial appearance with the same regularity others maintain a gym membership.': 'ボトックスとフィラー注射は韓국에서 非常에 日常化されており、多くのオフィスワーカーが昼休みに受けます。江南의 「医院通り」（의원 거리）には15分のボトックスセッションを提供するクリニックがあります。피부과文화은、韓国人が他の人がジム会원권을 維持するのと同じ정기성으로 肌と顔의 외모를 管理することを意味します。',
  'Korean job applications commonly require a photo and specify "neat appearance" (단정한 외모). Research shows appearance significantly affects hiring decisions in Korea. In this context, many Koreans view plastic surgery as a pragmatic investment in career prospects — not mere vanity. The phenomenon is called 외모지상주의 (appearance supremacism), and it\'s hotly debated domestically.': '韓국의 求人応募は通常写真를 要求し、「端正な外見」（단정한 외모）を指定します。研究は外見が韓국의 採用決定에 大きく影響することを示しています。この文脈で、多くの韓国人は整形を単なる虚栄심이 아닌、キャリアの見通しへの실용的な投資として見ています。',
  'Korea actively markets itself as a medical tourism destination. Patients from China, Japan, Southeast Asia, and increasingly the West fly to Korea for procedures that cost 20-50% less than in their home countries — with superior technique and faster recovery. Gangnam has hotels specifically designed for post-surgery recovery, and some clinics provide airport pickup and full concierge services.': '韓국は메디컬투어리즘の目的地として積極的에 自国をアピールしています。中国、日本、東南アジア、そしてますます西洋からの患者が、自国より20〜50%安い費用で、より優れた技術와 早い回復のために韓国에 飛んできます。江南には手術後의 回復のために特별히 設計されたホテルがあり、一部의 クリニックは空港送迎とフルコンシェルジュサービスを提供しています。',

  // § Outdoor drinking section
  'Outdoor Drinking Culture · Korea\'s Open-Air Alcohol Philosophy': '野外飲酒문화 · 韓국의 野外飲酒哲학',
  'Drinking alcohol in public spaces is legal in Korea — and deeply embedded in social culture. From Han River picnics with convenience store beer to riverside 포차 tents at midnight, Koreans have developed a rich outdoor drinking culture that is social, affordable, and genuinely joyful. This section explores the vocabulary, etiquette, and cultural significance of Korea\'s outdoor drinking scene.': '公共の場所での飲酒は韓국では合法です — そして社会문화에 深く根ざしています。コンビニのビールを持ってハン川ピクニックから、真夜中の川沿りの포차テントまで、韓国人は社交的で手頃な価格で本当에 楽しい野外飲酒文化를 発展させてきました。',
  'The Han River (한강, Hangang) parks are Seoul\'s most famous outdoor social spaces. Thousands of people gather every weekend to eat, drink, and socialize on the river banks. You bring your own from a nearby convenience store (편의점) or order food delivery to the park\'s exact GPS location.': 'ハン川（한강）의 公園はソウルで最も유명な野外社交スペースです。毎週末、何千人もの人々が川岸で食べ、飲み、交流するために集まります。近くのコンビニ（편의점）から持参するか、公園의 正確なGPS위치에 フードデリバリーを注문します。',
  'Convenience store outdoor drinking — buying beer, soju, or makgeolli at a 7-Eleven or GS25 and sitting at the plastic tables outside. This is an iconic Korean experience: cheap, immediate, no dress code, no minimum spend. The 편의점 is Korea\'s second living room.': 'コンビニ野外飲酒 — 7-ElevenやGS25でビール、소주、막걸리를 買って外のプラスチックテーブルに座ります。これはアイコニックな韓국体験です：安く、すぐに、ドレスコードなし、最低消費額なし。편의점은 韓국의 第2のリビングルームです。',
  'Pojangmacha — covered street stalls serving food and alcohol late at night. The orange tent glowing on a dark street is one of Korea\'s most recognizable images. You sit on plastic stools, eat 오뎅 (fish cakes), 떡볶이, and drink soju. The atmosphere is communal and unpretentious.': 'ポジャンマチャ — 深夜에 食べ物とお酒를 提供する屋根付きの屋台。暗い通りで輝くオレンジ色のテントは韓국で最も認識できるイメージの一つです。プラスチックのスツールに座り、오뎅、떡볶이를 食べ、소주を飲みます。',
  '야장 (outdoor tables set up by restaurants for evening drinking) transform Korean street life after dark. Restaurants push tables out onto sidewalks and rooftops from spring through autumn, creating a spontaneous café culture that\'s especially vibrant in Hongdae, Itaewon, and Insadong.': '야장（レストランが夕方의 飲酒のために設置する野外テーブル）は日が暮れた後의 韓국의 거리生活를 変えます。春から秋にかけてレストランが歩道や屋上にテーブルを出し、弘大、梨泰院、仁寺洞で特에 活気のある自然発생的なカフェ문화를 生み出します。',
  'Korean festivals (축제) from 불꽃 축제 (fireworks festival, October) to cherry blossom picnics (벚꽃 피크닉, April) are synonymous with outdoor group drinking. The 한강 불꽃 축제 draws over 1 million people who bring blankets, food, and soju — forming an enormous social outdoor celebration unlike any in the world.': '불꽃 축제（花火まつり、10月）から벚꽃 피크닉（桜ピクニック、4月）まで、韓국의 축제は야외グループ飲酒と同義です。한강 불꽃 축제에는100万人以上が集まり、毛布、食べ物、소주를 持参して、世界에 類のない巨大な社交的野外お祝いを형성합니다。',
  '치킨 + 맥주 = 치맥 — Korea\'s ultimate outdoor combo. Fried chicken and beer, often consumed outside: on a rooftop, at a river park, in an alley. 치맥 has become an international phenomenon thanks to K-Drama exposure. The combination is so beloved it has its own annual festival in Daegu.': 'チキン + ビール = 치맥 — 韓국究極의 野外コンボ。フライドチキンとビールは、しばしば屋外で消費されます：屋上で、川公園で、골목에서。치맥はKドラマのおかげで国際的な現象となりました。この組み合わせは非常에 愛されており、大邱で年間まつりがあります。',
  '🍺 Korean Drinking Vocabulary · 술 관련 단어': '🍺 韓국의 飲酒語彙 · 술 관련 단어',
  'Outdoor drinking': '野外飲酒',
  'Cheers! (formal toast)': '乾杯！（フォーマルな乾杯）',
  'Bottoms up! / Drink it all': '一気飲み！ / 全部飲む',
  'Bomb shot — soju dropped into beer': '폭탄주 — ビールに소주를 落とす',
  'Soju + beer mix (=폭탄주)': '소주 + ビールのミックス（=폭탄주）',
  'Korean rice wine (milky, slightly fizzy)': '韓국의 막걸리（白濁、わずかに発泡）',
  'Food eaten while drinking': 'お酒を飲みながら食べる食べ物',
  'Hangover soup (e.g., 콩나물국)': '해장국（例：콩나물국）',

  // § Jeonse section
  'The Jeonse System · Korea\'s Unique Housing Arrangement': '전세制度 · 韓국独自의 住宅制度',
  '전세 (jeonse) is a housing system found almost nowhere else on Earth. Instead of paying monthly rent, a tenant deposits a large lump sum (보증금, typically 50–80% of the property value) with the landlord for a 2-year contract. The landlord uses this money to invest or pay off mortgages; the tenant lives rent-free for 2 years and receives the full deposit back at the end. For decades it was a beloved system — but recent 전세 사기 (jeonse fraud) scandals have shaken Korea\'s trust in it.': '전세（チョンセ）は地球上のほぼどこにも見られない住宅制度です。月々の家賃を支払う代わりに、賃借人は2年契約で大きな一括払い（보증금、通常は不동산価値의 50〜80%）를 大家에 預けます。大家はこのお金を投資したり住宅ローンを返済するために使い、賃借人は2年간 家賃なしで생활し、契約終了時에 全額를 受け取ります。',
  '🏠 전세 · Jeonse': '🏠 전세 · チョンセ',
  '💸 월세 · Monthly Rent (Wolse)': '💸 월세 · 月次家賃（ウォルセ）',
  'Large lump sum deposit (보증금) paid to landlord — typically 50–80% of property value': '大家에 支払う大きな一括払い보증금 — 通常は불동산価値의 50〜80%',
  'Zero monthly rent payment during the 2-year contract period': '2年契約期間中의 月払い家賃ゼロ',
  'Full deposit returned at contract end — essentially free housing if you have the capital': '契約終了時에 全額返金 — 資金があれば実質無料의 住宅',
  'Landlord invests the deposit money — historically in the rising Korean property market': '大家가 보증금을 投資する — 歴史的에 上昇する韓국의 不동산市場에서',
  'Favored by young Koreans as a stepping stone toward home ownership': '住宅所有への足がかりとして若い韓国人에게 好まれる',
  'Risk: if property prices fall and landlord is overleveraged, deposit may not be returned (전세 사기)': 'リスク：불동산価格が下落し大家가 過剰レバレッジの場合、보증금가 返金されない可能性（전세 사기）',
  'Smaller deposit (보증금) + monthly rent payment (월세)': '小さな보증금 + 毎月의 家賃（월세）',
  'More accessible for those without large lump-sum capital': '大きな一括払い資금がない人에게 アクセスしやすい',
  'Ongoing monthly cost — money "lost" each month like Western rent': '毎月의 継続的なコスト — 西洋式家賃のように毎月「失う」お金',
  'Less financial risk — no large sum at stake': '금融リスクが低い — 大きな金額가 かかっていない',
  'Increasingly common as jeonse deposits have ballooned with rising property prices': '불동산価格上昇으로 전세보증금가 膨らむにつれてますます一般的에 なっている',
  'More common in smaller cities; Seoul still heavily jeonse-weighted': 'より小さな都市에 多く見られる；ソウルは依然として전세의 割合が高い',
  '⚠️ Recent Crisis': '⚠️ 최근의 危機',
  '전세 사기 · Jeonse Fraud Epidemic': '전세 사기 · チョンセ詐欺의 蔓延',
  '2022–2024: Thousands of tenants lost their life savings': '2022〜2024年：何千もの賃借人が生涯의 貯蓄を失う',
  'When Korean property prices began falling sharply in 2022–2023, a systemic vulnerability in the jeonse system was exposed. Unscrupulous landlords (and sometimes organized fraudsters) had taken jeonse deposits from multiple tenants on properties that were already heavily mortgaged — leaving no money to return when contracts ended. Thousands of young Koreans lost their entire savings — often 50–200 million won ($37,000–$150,000) — their entire life savings. The scandal triggered political crisis, government emergency relief funds, and calls to reform or abolish the jeonse system. The phrase "전세 사기 피해자 (jeonse fraud victim)" became one of the most tragic headlines of the decade.': '2022〜2023年에 韓국의 不동산価格が急落したとき、전세システムの構造的な脆弱性が露呈しました。不誠実な大家（そして時には組織的な詐欺師）が、すでに重い住宅ローンが課せられた불동산で複数の賃借人から전세보증금을 受け取っていました — 契約終了時에 返金するお金がなくなりました。何千もの若い韓국人가 全貯蓄 — しばしば5,000万〜2億ウォン — を失いました。このスキャンダルは政治危機、政府의 긴급救済基金、そして전세システムの改革또는廃止요구를 引き起こしました。',
  '📖 Housing Vocabulary · 주거 단어': '📖 住宅語彙 · 주거 단어',
  'Lump-sum deposit housing arrangement': '一括払い보증금住宅制度',
  'Monthly rent': '月次家賃',
  'Security deposit / lump sum': '保証金 / 一括払い',
  'Landlord': '大家',
  'Tenant': '賃借人',
  'Real estate / real estate agent': '不동산 / 不동산業者',
  'Apartment (dominant Korean housing type)': 'アパート（韓国의 主要住宅タイプ）',
  'Studio apartment / officetel': 'スタジオアパート / オフィステル',

  // § Traditions section
  '전통 문화 · Korean Traditions': '전통 문화 · 韓국의 伝統',
  'Holidays, Rites of Passage & Social Etiquette': '祝日、通過儀礼 & 社会的マナー',
  'Beneath the fast delivery and the plastic surgery clinics, Korea preserves a deeply rooted traditional culture — one of the world\'s longest continuous civilizations. The major holidays, the rites that mark every stage of life, and the unspoken social codes that govern interaction between generations: these are the foundations on which all of modern Korean life is built.': '超速配達と美容整形クリニックの裏에、韓국は深く根ざした伝統文화 — 世界で最も長い継続的文명의 一つ — を保存しています。삶의 모든 단계를 彩る主要명절と通過儀礼、そして世代間の交流를 지배する暗黙의 社会규범：これらはすべての現代韓国人의 生活が築かれた基盤です。',
  '🎊 Major Korean Holidays · 한국의 주요 명절': '🎊 韓国의 主要な祝日 · 한국의 주요 명절',
  'Chuseok': '추석（チュソク）',
  'Korean Harvest Festival / Thanksgiving. Families gather, prepare ancestral rites (차례, chare), and eat 송편 (songpyeon, half-moon rice cakes). Held on the 15th day of the 8th lunar month. The biggest travel period of the year — roads and trains sell out weeks in advance.': '韓国의 秋夕祭。家族が集まり、先祖의 祭儀（차례）を行い、송편（ソンピョン、半月型のお餅）を食べます。陰暦8月15日에 行われます。年간最大의 帰省ラッシュ — 道路と電車は数週間前に売り切れます。',
  'Seollal': '설날（ソルラル）',
  'Korean Lunar New Year. Children bow (세배, sebae) to elders and receive money (세뱃돈, sebaedon). Families eat 떡국 (tteokguk, rice cake soup) — eating a bowl makes you one year older. Wearing 한복 (hanbok) on Seollal morning is a treasured tradition.': '韓국의 旧正月。子どもたちが年長者에게 お辞儀（세배）をして、お年玉（세뱃돈）를 受け取ります。家族は떡국を食べます — 一杯食べると1歳年を取ります。설날의 朝에 한복を着ることは大切な伝統です。',
  'Daeboreum': '대보름（テボルム）',
  'The Great Full Moon — 15th day of the first lunar month. People crack nuts (부럼, bureom) with their teeth to ward off skin diseases, eat five-grain rice (오곡밥), and light lanterns. Children tie wishes to lanterns and release them skyward.': '大望月 — 陰暦1月15日。人々は皮膚病를 防ぐために歯で木の実（부럼）를 割り、오곡밥を食べ、ランタンを灯します。子どもたちはランタンに願いを결び付けて空에 放ちます。',
  'Children\'s Day': '어린이날（オリニナル）',
  'May 5th national holiday — dedicated entirely to children. Parents take them to amusement parks, zoos, aquariums, and museums. Seoul\'s parks fill with families. Gift-giving expectations have grown dramatically alongside Korea\'s rising economic standard.': '5月5日의 国民의 祝日 — 完全に子どもたちに捧げられます。親が遊園地、動物園、水族館、博物館에 連れて行きます。ソウルの公園が家族で溢れます。韓국의 経済基準의 向上とともに、プレゼントへの期待도 劇的에 高まっています。',
  'Dongji': '동지（ドンジ）',
  'Winter Solstice. Koreans eat 팥죽 (patjuk, red bean porridge) — the red color believed to repel evil spirits and bad fortune entering with the new year. Families make the porridge together and sometimes smear it on doorposts as a protective ritual.': '冬至。韓국人은 팥죽（小豆粥）を食べます — 赤い色가 新年에 入ってくる悪霊と不運を追い払うと信じられています。家族が一緒에 粥を作り、時には扉柱에 塗って保護儀式として行います。',
  'Parents\' Day': '어버이날（オボイナル）',
  'May 8th — children present red carnations (카네이션) to parents and grandparents. Schools hold performances where children wash parents\' feet as a gesture of filial piety (효도). One of the most emotionally significant days in the Korean calendar.': '5月8日 — 子どもたちが親と祖父母에게 赤いカーネーション（카네이션）를 贈ります。学교では子どもたちが효도의 表れとして親의 足を洗う공연이 行われます。韓国의 カレンダーで最も感情的에 重要な日의 一つです。',
  '🎂 Korean Rites of Passage · 통과의례': '🎂 韓국의 通過儀礼 · 통과의례',
  'Baek-il': '백일（ペギル）',
  '100-day celebration of a baby\'s survival. Historically, infant mortality was high, so reaching 100 days was a milestone. 백설기 (white rice cake) and 수수경단 (sorghum rice ball) are prepared and shared with neighbors to invite community blessing for the child\'s health.': '赤ちゃんの生存를 祝う100日お祝い。歴史的에 유아사망률が高かったため、100日를 맞이することは大きな節目でした。백설기와 수수경단를 準備し、隣人と分かち合って子どもの健康への地域의 祝福를 招きます。',
  'Doljanchi': '돌잔치（ドルジャンチ）',
  'Baby\'s 1st birthday. The highlight is 돌잡이 (doljabi) — the baby sits before an array of objects (thread for long life, money for wealth, books for scholarship, stethoscope for medicine, microphone for entertainment) and whichever the baby picks is believed to predict their future path.': '赤ちゃんの1歳의 誕生日。ハイライトは돌잡이（ドルジャビ）— 赤ちゃんが様々な物（長寿의 糸、富의 金、学問의 本、医学의 聴診器、エンターテイメントのマイク）의 前에 座り、赤ちゃんが何を選ぶかで将来의 道가 予言されると信じられています。',
  'Coming of Age Day': '성년의 날（ソンニョニ ナル）',
  'The 3rd Monday of May. Koreans who turn 20 that year are celebrated — they receive red roses, a bottle of perfume, and a kiss (the "three gifts of adulthood"). University campuses come alive with celebrations for newly recognized adults.': '5月의 第3月曜日。その年에 20歳になる韓국인가 祝われます — 赤いバラ、香水一本、キス（「成人의 3つのプレゼント」）를 受け取ります。大학캠퍼스가 新たに認められた成人의 たための祝賀で活気付きます。',
  'Korean Wedding': '결혼식（ケロンシク）',
  'Korean weddings blend Western ceremony (white dress, ceremony hall) with traditional 폐백 (pyebaek) — the bride bows to in-laws who toss dates (대추) and chestnuts (밤) for her to catch in her skirt, predicting the number of children. Wedding halls (예식장) in Korea are assembly-line efficient — multiple weddings per day, buffet-style receptions, guests giving cash (축의금) in envelopes.': '韓국의 結婚式은 西洋式式典（白いドレス、式場）와 伝統的な폐백를 融合します — 花嫁가 義父母에게 お辞儀をし、義父母가 스커트でキャッチするためにナツメ（대추）와 栗（밤）를 投げ、子어どもの数를 予言します。韓국의 예식장은流れ作業のように効율的 — 1日에 複数의 결혼식、ビュッフェ式의 披露宴、ゲストが現金（축의금）를 封筒에 넣어 渡します。',
  '🙏 Korean Social Etiquette · 사회적 예절': '🙏 韓국의 社会的マナー · 사회적 예절',
  'Bowing (절)': 'お辞儀（절）',
  'A slight bow (15°) for casual greetings; a deeper bow (45°+) for formal thanks or apologies. The angle communicates the depth of respect. Never look away while bowing to an elder — eye contact throughout shows sincerity.': 'カジュアルな挨拶には軽いお辞儀（15°）、フォーマルな感謝やお詫びには深いお辞儀（45°以上）。角度が敬意의 深さを伝えます。年長者에게 お辞儀するときは絶対에 視線을 外さないこと — 始終目를 合わせることが誠実さを示します。',
  '두 손으로 받기': '두 손으로 받기（両手で受け取る）',
  'Always receive business cards, gifts, drinks, and money with two hands — or with your right hand supported at the wrist by your left. This gesture of support shows you\'re giving full attention and respect to the exchange.': '名刺、贈り物、飲み物、お金は常에 両手で受け取ります — または右手를 左手で手首を支えて。このサポートのジェスチャーは、あなたがやり取りに完全な注意와 敬意を払っていることを示します。',
  '술 따르기 (Pouring Drinks)': 'お酒を注ぐ（술 따르기）',
  'Never pour your own drink at a Korean table — pour for others first, especially elders. Hold your glass with two hands when an elder pours for you. The eldest at the table traditionally drinks first. 건배 (geonbae) = Cheers!': '韓국의 テーブルでは絶対에 自分で自分의 飲み物を注がないこと — まず他의 人에게、特에 年長者에게 注ぎます。年長者가 あなたに注いでくれるときは両手でグラスを持ちます。テーブルで最年長의 人이 伝統的에 最初에 飲みます。건배＝乾杯！',
  '공공장소 예절': '公共의 場のマナー（공공장소 예절）',
  'Korean public spaces — especially the subway — are kept remarkably quiet. Phone calls are brief and hushed. Priority seats (노약자석) are religiously left for the elderly, pregnant women, and disabled. Eating on the subway is frowned upon except on long-distance trains.': '韓국의 公共의 場 — 特에 地下鉄 — は驚くほど静かに保たれています。電話は짧고 小声で。優先席（노약자석）은 高齢者、妊婦、障害者의 ために宗교적으로 空けられます。長距離電車以外での地下鉄내 飲食は눈총을 受けます。',
  'Thank you (formal).': 'ありがとうございます（フォーマル）。',
  'I\'m very sorry (formal).': '大変申し訳ありません（フォーマル）。',
  'Elder, please go first.': 'お先にどうぞ。',
  'Please take good care of me.': 'どうぞよろしくお願いします。',
  'You\'ve worked hard. (end of day)': 'お疲れ様でした。（一日の終わりに）',
  '눈치 — The Unspoken Social Intelligence': '눈치 — 暗黙의 社会的知性',
  '눈치 (nunchi) is the Korean concept of reading the room — sensing what others feel or need without being told. High 눈치 means you know when to speak, when to stay silent, when to pour someone\'s drink, or when to excuse yourself. Low 눈치 (눈치 없다) is considered one of the most socially damaging things a Korean can say about another person. It\'s considered more important than intelligence or talent in many Korean social and professional contexts.': '눈치（ヌンチ）は空気를 読むという韓국의 概念です — 言われなくても他의 人が感じていること또는 필요としていることを感じ取ること。高い눈치는 いつ話すべきか、いつ黙っているべきか、いつ誰かの飲み物を注ぐべきか、いつ席를 外すべきかを知っていることを意味します。低い눈치（눈치 없다）は韓국人가 他의 人에게 言える最も社会的에 有害なことの一つとされています。',

  // § Proverbs section
  '100 Korean Proverbs · Wisdom Passed Through Generations': '韓국のことわざ100選 · 世代を超えて受け継がれる知恵',
  'Korean proverbs (속담, soktam) are compact packets of cultural wisdom — observations about human nature, social relationships, cause and effect, and the natural world that Koreans have refined over centuries. Many proverbs reference rice, farming, animals, and the natural world, revealing what Korean people have always valued. Learning these unlocks a deeper understanding of Korean thinking and gives you an authenticity in conversation that grammar and vocabulary alone cannot.': '韓国のことわざ（속담、ソクタム）는 文化的知恵のコンパクトなパッケージです — 韓国人가 何世紀もかけて洗練させた人間의 本性、社会的関係、因果関係、自然界についての観察です。많은 ことわざがご飯、農業、動物、自然界를 인용し、韓국人가 常에 大切에 してきたものを明らかにします。',
  '🌱 시작과 노력 · Beginning & Effort': '🌱 시작과 노력 · 始まりと努力',
  '🤝 인간관계 · Human Relationships': '🤝 인간관계 · 人間関係',
  '🗣️ 말의 힘 · The Power of Words': '🗣️ 말의 힘 · 言葉의 力',
  '🌾 인과응보 · You Reap What You Sow': '🌾 인과응보 · 因果応報',
  '🦁 지혜와 판단 · Wisdom & Judgment': '🦁 지혜와 판단 · 知恵と判断',
  '🌸 외모와 본질 · Appearance vs. Reality': '🌸 외모와 본질 · 外見と本質',
  '⚡ 기회와 용기 · Opportunity & Courage': '⚡ 기회와 용기 · 機会と勇気',
  '💸 삶과 경제 · Life & Economy': '💸 삶과 경제 · 生活と経済',
  '🌱 성장과 습관 · Growth & Habits': '🌱 성장과 습관 · 成長と習慣',
  '🍀 운명과 우연 · Fate & Chance': '🍀 운명과 우연 · 運命と偶然',
  '🍚 쉬운 것과 어려운 것 · Easy & Hard': '🍚 쉬운 것과 어려운 것 · 易と難',
  '🌿 건강과 자연 · Health & Nature': '🌿 건강과 자연 · 健康と自然',
  '😂 웃기고 찌르는 속담 · Funny & Sharp Proverbs': '😂 웃기고 찌르는 속담 · 面白くて鋭いことわざ',

  // Proverb literals
  'Literal: "The beginning is half."': '直訳：「始まりは半分だ。」',
  'Literal: "Even a journey of a thousand li starts with a single step."': '直訳：「千里の道も一歩から始まる。」',
  'Literal: "Even a full sack of gems must be strung to become a treasure."': '直訳：「玉をひと袋持っていても、糸で通さなければ宝にならない。」',
  'Literal: "Even a stone bridge — tap it before you cross."': '直訳：「石橋でも叩いて渡れ。」',
  'Literal: "Hurrying will ruin the work."': '直訳：「急いては事を仕損じる。」',
  'Literal: "Even a sheet of white paper is lighter when two people lift it."': '直訳：「白紙一枚でも二人で持てば軽い。」',
  'Literal: "There is no tree that won\'t fall after ten chops."': '直訳：「十回切っても倒れない木はない。」',
  'Literal: "Heaven helps those who help themselves."': '直訳：「天は自ら助くる者を助く。」',
  'Literal: "If the words you send out are kind, the words that return will be kind."': '直訳：「出す言葉が美しければ、返ってくる言葉も美しい。」',
  'Literal: "If the water upstream is clear, the water downstream will be clear."': '直訳：「上流の水が清ければ、下流の水も清い。」',
  'Literal: "Give one more rice cake to the person you hate."': '直訳：「嫌いな人にお餅をもう一つあげなさい。」',
  'Literal: "A close neighbor is better than a distant relative."': '直訳：「近い隣人は遠い親戚より良い。」',
  'Literal: "Blood is thicker than water."': '直訳：「血は水よりも濃い。」',
  'Literal: "If the family is harmonious, all things prosper."': '直訳：「家庭が調和していれば、すべてのことが栄える。」',
  'Literal: "There is no parent who wins against their child."': '直訳：「自分の子どもに勝てる親はいない。」',
  'Literal: "You can\'t spit on a smiling face."': '直訳：「笑顔に唾は吐けない。」',
  'Literal: "One word can repay a debt of a thousand nyang."': '直訳：「一言が千両の借金を返せる。」',
  'Literal: "A word with no legs travels a thousand li."': '直訳：「脚のない言葉が千里を行く。」',
  'Literal: "Birds hear daytime words; mice hear nighttime words."': '直訳：「昼の言葉は鳥が聞き、夜の言葉はネズミが聞く。」',
  'Literal: "\'A\' is different from \'eo\'."': '直訳：「아と어は違う。」',
  'Literal: "Even if your mouth is crooked, speak straight."': '直訳：「口が曲がっていても、言葉は真っ直ぐ言いなさい。」',
  'Literal: "Plant beans, get beans; plant red beans, get red beans."': '直訳：「豆を植えれば豆が育ち、小豆を植えれば小豆が育つ。」',
  'Literal: "You get soaked in a light drizzle too."': '直訳：「小雨でも濡れる。」',
  'Literal: "Gather dust and you get a mountain."': '直訳：「塵も積もれば山となる。」',
  'Literal: "You fix the barn after the cow is lost."': '直訳：「牛を失ってから牛小屋を修理する。」',
  'Literal: "When whales fight, a shrimp\'s back breaks."': '直訳：「クジラが싸우면エビの背中が割れる。」',
  'Literal: "An empty cart makes the most noise."': '直訳：「空の荷車が一番うるさい。」',
  'Literal: "Covering your eyes and saying \'aung\'."': '直訳：「目を覆って「アウン」と言う。」',
  'Literal: "It\'s darkest beneath the lamp."': '直訳：「灯台下暗し。」',
  'Literal: "Too many boatmen and the boat goes up the mountain."': '直訳：「船頭多くして船山に上る。」',
  'Literal: "Even the tiger comes when you talk about it."': '直訳：「噂をすれば虎が来る。」',
  'Literal: "A frog in a well."': '直訳：「井の中の蛙。」',
  'Literal: "Even monkeys fall from trees."': '直訳：「猿も木から落ちる。」',
  'Literal: "The outside is different; the inside is different."': '直訳：「外と中は違う。」',
  'Literal: "A bright but sour wild apricot."': '直訳：「見た目は良いが酸っぱい山桃。」',
  'Literal: "Clothes are wings."': '直訳：「服は翼だ。」',
  'Literal: "The fermented sauce tastes better than the earthenware pot."': '直訳：「土鍋より味噌の味が良い。」',
  'Literal: "Pull out the ox\'s horn while the iron is hot."': '直訳：「熱いうちに牛の角を一気に抜け。」',
  'Literal: "To catch a tiger, you must enter the tiger\'s den."': '直訳：「虎を捕まえるには虎穴に入らなければならない。」',
  'Literal: "Even an earthworm wriggles when stepped on."': '直訳：「ミミズでも踏まれれば身をくねらせる。」',
  'Literal: "Even if the sky falls, there is a hole to escape through."': '直訳：「天が崩れ落ちても、逃げ出す穴がある。」',
  'Literal: "Another person\'s rice cake always looks bigger."': '直訳：「人のお餅はいつも大きく見える。」',
  'Literal: "With enough money, even ghosts can be commanded."': '直訳：「お金があれば鬼でも使える。」',
  'Literal: "Rice cake in a picture."': '直訳：「絵に描いたお餅。」',
  'Literal: "Even Geumgangsan Mountain should be seen after eating."': '直訳：「金剛山も食後에 見よ。」',
  'Literal: "A habit from age three lasts until eighty."': '直訳：「三歳의 習慣は八十まで続く。」',
  'Literal: "You can tell a tree that will thrive from its first sprout."': '直訳：「育つ木は葉っぱを見ればわかる。」',
  'Literal: "A dragon rises from a small stream."': '直訳：「小川から龍が現れる。」',
  'Literal: "Where the needle goes, the thread follows."': '直訳：「針が行くところに糸が続く。」',
  'Literal: "After suffering, joy comes."': '直訳：「苦しみの後に喜びが来る。」',
  'Literal: "The day you go happens to be market day."': '直訳：「行った日がちょうど市の日だった。」',
  'Literal: "A pumpkin rolls in on its whole vine."': '直訳：「カボチャがつるごと転がり込んでくる。」',
  'Literal: "A dog that chased a chicken stares at the roof."': '直訳：「鶏を追いかけていた犬が屋根를 見上げる。」',
  'Literal: "Eating the pheasant and the egg too."': '直訳：「キジを食べて卵も食べる。」',
  'Literal: "This too shall pass."': '直訳：「これもまた過ぎ去るだろう。」',
  'Literal: "Eating cold porridge."': '直訳：「冷めたお粥를 食べる。」',
  'Literal: "Eating rice cake while lying down."': '直訳：「寝ながらお餅を食べる。」',
  'Literal: "Reading scripture into a cow\'s ear."': '直訳：「牛의 耳にお経를 読む。」',
  'Literal: "Spilled water is hard to gather again."': '直訳：「こぼれた水は集めにくい。」',
  'Literal: "Rice is medicine."': '直訳：「ご飯は薬だ。」',
  'Literal: "Excess is as bad as deficiency."': '直訳：「過ぎたるは及ばざるがごとし。」',
  'Literal: "Behind the clouds, the sun is shining."': '直訳：「雲의 後ろに太陽が輝いている。」',
  'Literal: "Walk only on flower paths."': '直訳：「花道だけを歩きなさい。」',
  'Literal: "Ignorance is medicine; knowledge is disease."': '直訳：「知らぬが薬；知ることが病だ。」',
  'Literal: "Alcohol drinks alcohol."': '直訳：「酒が酒를 飲む。」',
  'Literal: "Following a friend to Gangnam."': '直訳：「友達の後を追って江南に行く。」',
  'Literal: "In the blink of an eye."': '直訳：「目をぱちくりさせる間に。」',
  'Literal: "Don\'t poke a sleeping tiger."': '直訳：「眠っている虎를 突くな。」',
  'Literal: "Beyond one mountain, there is another mountain."': '直訳：「山를 越えるとまた山がある。」',
  'Literal: "Don\'t put off until tomorrow what you can do today."': '直訳：「今日できることを明日に延ばすな。」',
  'Literal: "Pearls around a pig\'s neck."': '直訳：「豚の首에 真珠。」',
  'Literal: "A puppy a day old doesn\'t know to fear a tiger."': '直訳：「1日の子犬は虎を恐れることを知らない。」',

  // Proverb meanings
  'Starting something is the hardest part. Once you begin, you\'ve already done half the work.': '何かを始めることが最も難しい部分です。一度始めれば、すでに半分의 仕事を終えたことになります。',
  'Every great achievement begins with one small action. Don\'t be paralyzed by the magnitude of the goal.': 'すべての偉大な성과는 一つの小さな行動から始まります。目標の大きさに麻痺しないでください。',
  'Knowledge, talent, and resources mean nothing until you actually put them together and use them.': '知識、才能、資源は実際에 組み合わせて使うまでは何の意味もありません。',
  'Be cautious even when things seem safe and obvious. Double-check before you commit.': '物事が安全で明らかに見えるときでも慎重에。決断する前에 二度확인しましょう。',
  'Haste makes waste. Rushing through something almost always creates errors that waste more time to fix.': '急いては事를 仕損じる。何かを急ぐと、修正에 さらに時間을 無駄にするエラーがほぼ必ず発生します。',
  'Cooperation makes even trivial tasks easier. There is always value in working together.': '協力することで些細なことでも楽になります。一緒에 働くことには常에 価値があります。',
  'Persistence beats talent. Keep at something long enough and you will eventually succeed.': '粘り強さは才能に勝ります。十分에 長く続ければ、最終的에는 성공します。',
  'Don\'t wait for luck or fate — take initiative. The universe rewards those who act.': '運や運命를 待たないでください — 主体的에 行動しましょう。宇宙は行動する人에게 報います。',
  'Treat others as you wish to be treated. Kind words generate kind responses.': '他者를 自分がされたいように扱いなさい。親切な言葉は親切な반응을 生みます。',
  'Leaders set the standard. If those at the top behave well, those below will follow.': 'リーダーが基準를 設定します。上の人がよく振る舞えば、下の人も따릅니다。',
  'Disarming enemies with kindness is smarter than confrontation. Kill them with generosity.': '親切で敵を無力화することは対立よりも賢明です。寛大さで相手を攻략しましょう。',
  'Physical presence and reliability matter more than blood ties when you actually need help.': '本当에 助けが必要なとき、物理的な存在와 信頼性は血縁よりも重要です。',
  'Family bonds ultimately run deeper than friendships or social connections.': '家族의 絆は究極的에는 友情や社会的つながりよりも深いものです。',
  'Family harmony is the foundation of success in every area of life. A phrase still displayed in Korean homes.': '家族의 調和は人生のあらゆる分野での成功의 基盤です。今でも韓국의 家庭에 飾られることわざです。',
  'Parents always end up giving in to their children\'s wishes. Children are parents\' greatest weakness.': '親は結局子どもの願いに折れてしまいます。子どもは親의 最大의 弱点です。',
  'It\'s almost impossible to be cruel or aggressive toward someone who is consistently warm and cheerful.': '常에 温かく陽気な人に対して残酷または攻撃的であることはほぼ不可能です。',
  'The right words at the right moment are worth more than money. Eloquence and tact are invaluable.': '適切なタイミングでの適切な言葉はお金よりも価値があります。雄弁と機転は非常에 貴重です。',
  'Gossip and rumors spread faster than anything. Be careful what you say; it will reach places you never intended.': '噂と風評は何よりも速く広まります。何を言うか気をつけてください；意図しない場所まで届きます。',
  'Walls have ears. Never say anything in private that you wouldn\'t want the world to hear.': '壁에 耳あり。世界에 聞かれたくないことはプライベートでも絶対에 言わないでください。',
  'How you say something matters as much as what you say. Tone, word choice, and nuance change everything.': '何を言うかと同じくらい、どのように言うかが重要です。口調、言葉의 選択、ニュアンスがすべてを変えます。',
  'Always tell the truth, regardless of your circumstances or discomfort. Honesty has no excuses.': 'どんな状況や不快感があっても、常에 真実을 言いなさい。誠実さに言い訳はありません。',
  'You reap exactly what you sow. Actions have natural, unavoidable consequences.': '蒔いたものを刈り取ります。行動には自然で避けられない結果があります。',
  'Small things accumulate into big ones. Don\'t underestimate gradual exposure to anything — good or bad.': '小さなことが積み重なって大きなものになります。良いことにせよ悪いことにせよ、段階的な暴露를 過小評価しないでください。',
  'Small savings and small efforts accumulate into enormous results. Don\'t dismiss what is small.': '小さな貯蓄와 小さな努力が膨大な結果에 積み重なります。小さなものを軽視しないでください。',
  'Taking precautions only after the damage is done. Prepare before, not after, disaster strikes.': '被害が出た後にのみ予防措置를 講じること。災害が起きる前에 備えてください、後ではなく。',
  'Innocent bystanders suffer when the powerful clash. Stay away from conflicts that aren\'t yours.': '強者가 衝突するとき、無実의 傍観者가 苦しみます。自分에 関係のない争いには近づかないでください。',
  'Those who know the least talk the most. True competence is quiet; incompetence is loud.': '最も知らない人が最も多く話します。真의 有能さは静かで；無能さは騒がしいです。',
  'A transparent, childish attempt to deceive. Said of people who lie so obviously that everyone can see through it.': '見え透いた子どもっぽい欺こうとする試み。誰もが見抜けるほど明らかに嘘をつく人에게 言われます。',
  'We are often blind to what is closest to us. The answer to your problem might be right in front of you.': '私たちはしばしば最も身近なものに盲目的です。問題의 答えはすぐ目의 前にあるかもしれません。',
  'Too many decision-makers create chaos. Projects need clear leadership, not endless committee input.': '意思決定者가 多すぎると混乱を招きます。プロジェクトには延々와 続く委員会의 意見ではなく、明確なリーダーシップが必요합니다。',
  '"Speak of the devil." Talking about someone often makes them appear. A warning about gossiping.': '「噂をすれば影がさす。」誰かについて話すとその人が現れることがよくあります。噂話についての警告です。',
  'Someone with a narrow worldview who believes their small world is all there is. Closed-minded, limited perspective.': '自分의 小さな世界がすべてだと信じる狭い世界観을 持つ人。閉鎖的で限られた視野。',
  'Even experts make mistakes. No one is infallible. Don\'t mock others for failing at things they normally excel at.': '専門家でも間違いを犯します。誰も無謬ではありません。通常得意なことで失敗した他人を嘲らないでください。',
  'Two-faced. Acting one way in public while thinking or feeling something entirely different in private.': '二枚舌。公の場では一つの方법으로 振る舞いながら、プライベートでは全く異なることを考えたり感じたりすること。',
  'Something that looks appealing but disappoints on closer inspection. All looks, no substance.': '見た目は魅力的だが、よく見ると失望させるもの。見た目だけで中身がない。',
  'The right clothes can elevate a person. Dress to impress — appearance shapes how the world receives you.': '適切な服装は人を高めることができます。印象を与えるように着こなしましょう — 外見は世界があなたをどのように受け入れるかを形作ります。',
  'What\'s inside matters more than the packaging. Content beats container. Inner quality over outward appearance.': '中身が包装より重要です。コンテンツがコンテナに勝ります。外見より内側의 質를。',
  'Strike while the iron is hot. Act decisively when the moment is right — hesitation kills opportunity.': '鉄は熱いうちに打て。機が熟したときに決断力을 持って行動してください — 躊躇は機会를 殺します。',
  'No risk, no reward. You must put yourself in danger or discomfort to achieve great things.': 'リスクなければリターンなし。偉大なことを成し遂げるためには、自分を危険또는 不快な状況에 置かなければなりません。',
  'Everyone has a breaking point. Even the most patient or meek person will eventually fight back if pushed far enough.': '誰にでも限界があります。最も忍耐強いまたは温和な人でも、十分에 追い詰められれば最終的에는 反撃します。',
  'No matter how hopeless a situation seems, there is always a way out. Never lose hope in the darkest moment.': 'どんなに絶望的な状況에 見えても、常에 出口があります。最も暗い瞬間に希望を失わないでください。',
  'The grass is always greener on the other side. We consistently overvalue what others have and undervalue what we have.': '隣の芝生は常에 青く見えます。私たちは一貫して他人が持つものを過大評価し、自分が持つものを過小評価します。',
  'Money is the most powerful force in the world. With sufficient wealth, almost anything is possible.': 'お金は世界で最も強力な力です。十分な富があれば、ほぼ何でも可능합니다。',
  'Something desirable but completely unattainable — you can see it but never have it. A beautiful dream that can\'t be real.': '望ましいが完全에 手의 届かないもの — 見ることはできても決して持てないもの。現実になれない美しい夢。',
  'Basic needs come before beauty or pleasure. No matter how magnificent something is, you can\'t appreciate it on an empty stomach.': '基本的な必要性は美や喜びより先です。どんなに壮大なものでも、空腹では鑑賞できません。',
  'Childhood habits and personality traits persist throughout life. Early formation shapes everything.': '幼少期의 習慣와 性格特性は生涯を通じて持続します。초기の形성がすべてを形作ります。',
  'A talented person shows promise from early on. You can spot real potential from the beginning.': '才能のある人は早い段階から将来性を見せます。本物의 可能性は最初から見分けられます。',
  'A great person can emerge from humble origins. Remarkable talent transcends disadvantaged circumstances.': '偉大な人物は謙虚な출신から現れることがあります。卓越した才능は不利な状況를 超えます。',
  'Inseparable companions always move together. Used for best friends, loyal followers, or logically connected ideas.': '切り離せない仲間は常에 共에 動きます。親友、忠実な支持者、または論理的에 결부されたアイデアに使われます。',
  'After hardship comes happiness. The harder the struggle, the sweeter the reward. A core Korean motivational belief.': '苦難의 後に幸せが来ます。苦しみが強いほど、報酬はより甘い。韓국의 中心的な動機付けの信念です。',
  'Coincidence — you arrive and something unexpected is happening. Can be lucky or inconvenient depending on context.': '偶然의 一致 — あなたが到着すると予期しないことが起きています。文脈によって幸運にも不便にもなります。',
  'Unexpected windfall. Good fortune arrives uninvited and in abundance. You didn\'t plan for it — it just came.': '予期せぬ棚ぼた。幸運が招かれることなく豊富에 訪れます。計画していなかった — ただやってきた。',
  'The feeling of helpless defeat when something you almost had escapes at the last moment. So close, yet so far.': 'もう少しで手에 入るものが最後의 瞬間에 逃げてしまうときの無力な敗北感。惜しかったが、そんなに遠い。',
  'Getting two benefits from one action. Kill two birds with one stone — and eat both.': '一つの行動から二つの利益を得ること。一石二鳥 — そして両方食べる。',
  'No situation — good or bad — lasts forever. A comfort in hardship, and a reminder not to become complacent in good times.': 'どんな状況も — 良くても悪くても — 永遠には続きません。苦難での慰め、そして好況のときに慢心しないための戒め。',
  '"Easy as pie." Something so effortless it\'s like eating cooled, soft porridge — no chewing required.': '「朝飯前。」あまりにも楽なことで、冷めた柔らかいお粥を食べるようなもの — 噛む必要なし。',
  'Something extremely easy — so easy you don\'t even need to sit up to do it. The laziest, most comfortable possible action.': '非常에 簡単なこと — 起き上がる必要すらないほど簡単。最も怠惰で快適な行動。',
  'Completely wasted advice or instruction. Said of someone so closed-minded or stubborn that no wisdom can penetrate.': '完全에 無駄になったアドバイスや指示。どんな知恵도浸透しないほど閉鎖的또는 頑固な人에게 言われます。',
  'What\'s done cannot be undone. Some mistakes cannot be fixed, no matter how hard you try.': 'やってしまったことは元には戻せません。どんなに頑張っても直せないミスもあります。',
  'Good food, especially a proper rice meal, is the best medicine. Nourishment cures both body and spirit.': '良い食べ物、特にきちんとしたご飯は最高의 薬です。栄養は体와 心의 両方를 癒します。',
  'Too much of anything is harmful. The middle path is best. Moderation in all things.': '何でも過ぎると有害です。中道が最善です。すべてにおいて適度를。',
  'After every period of darkness comes light. Things that seem blocked or hidden are still there — waiting for the right moment.': '暗闇의 時期의 後에는 必ず光が来ます。ブロックされたり隠れているように見えるものは、まだそこにあります — 適切な瞬間を待っています。',
  'A blessing: may your life be beautiful and easy. A heartfelt wish for someone\'s happiness and smooth fortune.': '祝福：あなたの人生が美しく簡単であるように。誰かの幸福と順風満帆な운명への心からの願い。',
  'Sometimes not knowing is bliss. Knowledge can bring worry, responsibility, and suffering that ignorance spares you.': '時에 知らないことが幸せです。知識は無知가 免れさせる心配、責任、苦しみをもたらすことがあります。',
  'One drink inevitably leads to many more. The alcohol itself takes control once you start. Perfectly captures Korean drinking culture.': '一杯が必然的にもっと多くにつながります。飲み始めるとアルコール자체가 支配権를 握ります。韓국의 飲酒文화를 완벽に表現しています。',
  'Going somewhere or doing something solely because a friend is doing it — peer pressure, FOMO, or blind following.': '友達がやっているからというだけで、どこかに行ったり何かをすること — 同調圧力、FOMO、또는 盲目的な追従。',
  'In an instant. Something that happens so fast it\'s done before you even process it.': '一瞬のうちに。처리する前에 終わってしまうほど速く起こること。',
  'Don\'t disturb something dangerous that\'s currently inactive. Let sleeping dogs — or tigers — lie.': '現在活動していない危険なものを乱さないでください。眠っている犬 — または虎 — を刺激しないでください。',
  'Life\'s challenges never truly end. You solve one problem and another appears. Perseverance is the only option.': '人生의 挑戦は真に終わることはありません。一つの問題を解決すると別の問題が現れます。粘り強さだけが選択肢です。',
  'Procrastination compounds. Do what needs doing now. Tomorrow has its own problems.': '先延ばしは積み重なります。今やるべきことをやってください。明日は明日의 問題があります。',
  'Wasting precious things on those who cannot appreciate them. A gift or opportunity lost on the wrong recipient.': '貴重なものをそれを感謝できない人에게 無駄にすること。間違った受け取り手에 失われた贈り物や機会。',
  'The young and inexperienced rush in where the wise fear to tread. Ignorance of danger creates reckless courage.': '若くて経験のない人は賢者が足を踏み入れることを恐れるところに突진합니다。危険への無知が無謀な勇気を生み出します。',

  // Proverbs info box
  'How to Use Proverbs in Korean Conversation': '韓국語会話でことわざをどのように使うか',
  'Koreans use 속담 often in speech and writing — in editorials, in advice, in scolding, and even in comedy. Using a 속담 at the right moment shows cultural fluency that natives immediately recognize and appreciate. Start with #09 (가는 말이 고와야...) and #27 (빈 수레가 요란하다) — these come up constantly.': '韓국人은 속담を演説や文章でよく使います — 社説、アドバイス、叱責、さらにはコメディでも。適切なタイミングで속담을 使うことは、네이티브가 すぐに認識し評価する文化的流暢さを示します。#09（가는 말이 고와야...）와 #27（빈 수레가 요란하다）から始めましょう — これらは常에 登場します。',


  // ── Bite-Sized Paged Lessons — step-runner dynamic content ──────────

  // Lesson page header — shared
  '📊 Beginner': '📊 初級',
  '⚡ XP + Streak system': '⚡ XP + ストリークシステム',

  // syllable-blocks.html lesson-meta & lesson-intro-bullets
  '🎯 5 Stages · 61 Steps': '🎯 5ステージ · 61ステップ',
  '⏱️ ~50 min': '⏱️ 約50分',
  'Every syllable is a compact square block — not a horizontal letter string': 'すべての音節はコンパクトな正方形のブロック — 横に並んだ文字列ではありません',
  'Each block holds exactly 1 vowel plus up to 2 consonants': '各ブロックには母音がちょうど1つ、子音が最大2つ含まれます',
  '4 structural patterns: CV, V, CVC, VC — all follow the same rules': '4つの構造パターン：CV、V、CVC、VC — すべて同じルールに従います',
  'Master the block structure and you can sound out any Korean word': 'ブロック構造をマスターすれば、どんな韓国語の単語も読み上げられます',

  // hangul.html lesson-meta & lesson-intro-bullets
  '🎯 6 Stages · 84 Steps': '🎯 6ステージ · 84ステップ',
  '⏱️ ~60–90 min': '⏱️ 約60〜90分',
  'Created in 1443 by King Sejong the Great': '1443年に世宗大王によって創られました',
  'Phonetic alphabet — each symbol = one sound': '表音文字 — 各記号が一つの音を表します',
  '6 stages to cover every character': 'すべての文字を網羅する6つのステージ',
  'Most learners finish in under 90 minutes': 'ほとんどの学習者は90分以内に終わります',

  // pronunciation.html lesson-meta & lesson-intro-bullets
  '🎯 6 Stages · 68 Steps': '🎯 6ステージ · 68ステップ',
  '📊 Beginner–Intermediate': '📊 初級〜中級',
  '⏱️ ~60 min': '⏱️ 約60分',
  '8 sound change rules — why Korean spelling and pronunciation differ': '8つの音変化ルール — 韓国語の綴りと発音が異なる理由',
  'Batchim, liaison, assimilation, tensification, palatalization, and more': 'パッチム、連音化、鼻音化、濃音化、口蓋音化など',
  'Fix the 6 most common mistakes English speakers make': '英語話者がよく犯す6つの間違いを修正する',
  'Audio examples on every step — tap any word to hear it': 'すべてのステップに音声例 — 任意の単語をタップして聴く',

  // Step-runner UI chrome
  '← Prev': '← 前へ',
  'Next →': '次へ →',
  '🔊 Hear it': '🔊 聞く',
  '🔊 Listen': '🔊 聞く',
  'Combine these pieces into a syllable block:': 'これらのパーツを組み合わせて音節ブロックを作りましょう：',
  'Reveal Syllable': '音節を確認する',
  '🗣️ I said it — Next': '🗣️ 言えた — 次へ',
  'Start Again': 'もう一度',
  'Next Lesson →': '次のレッスン →',
  '✗ Not quite — try again!': '✗ 惜しい — もう一度！',
  'Loading lesson…': 'レッスンを読み込み中…',

  // Syllable block pattern names
  'CV Pattern': 'CVパターン',
  'V Pattern': 'Vパターン',
  'CVC Pattern': 'CVCパターン',
  'VC Pattern': 'VCパターン',
  'initial + vowel': '初声＋中声',
  'silent ㅇ + vowel': '無音ㅇ＋中声',
  'initial + vowel + 받침': '初声＋中声＋받침',
  'silent ㅇ + vowel + 받침': '無音ㅇ＋中声＋받침',

  // Stage names (all 3 lessons)
  'Vowels': '母音',
  'Consonants': '子音',
  'Syllables': '音節',
  'Special': '特殊音',
  'Compound Vowels': '複合母音',
  'Read Words': '単語を読む',
  'Block Basics': 'ブロック基礎',
  'Vowel Shapes': '母音の形',
  'Build It': '作ってみよう',
  'Batchim': 'パッチム',
  'Liaison': '連音化',
  'Assimilation': '鼻音化',
  'Tensification': '濃音化',
  'Palatal & ㄹ': '口蓋音化とㄹ',
  'Mistakes': 'よくある間違い',

  // syllable-blocks card_reveal hints (rendered as "💡 " + hint text)
  '💡 Every syllable is a square block — initial consonant, vowel, and optional final consonant.': '💡 すべての音節は正方形のブロック — 初声（子音）、中声（母音）、任意の終声（子音）から成ります。',
  '💡 This block has all three positions: 초성 (ㄱ) + 중성 (ㅜ) + 받침 (ㄱ).': '💡 このブロックはすべての3つの位置を持っています：초성 (ㄱ) + 중성 (ㅜ) + 받침 (ㄱ)。',
  '💡 Vowel-initial syllables use silent ㅇ as a placeholder. The ㅇ here makes no sound.': '💡 母音で始まる音節では、無音のㅇをプレースホルダーとして使います。ここでのㅇは音を発しません。',
  '💡 CV pattern — the simplest block type. Just an initial consonant and a vowel.': '💡 CVパターン — 最もシンプルなブロック。初声（子音）と中声（母音）だけです。',
  '💡 V-only pattern — silent ㅇ in the initial position, vowel only sounds.': '💡 Vのみパターン — 初声に無音のㅇを置き、母音の音だけが聞こえます。',
  '💡 CVC pattern — initial consonant + vowel + final consonant (받침). Three parts.': '💡 CVCパターン — 初声（子音）＋中声（母音）＋終声（받침）。3つのパーツ。',
  '💡 ㅏ is a TALL vertical vowel. The initial consonant sits to its LEFT.': '💡 ㅏは縦長の母音です。初声（子音）はその左側に置かれます。',
  '💡 ㅓ is also a tall vertical vowel — consonant LEFT, vowel RIGHT.': '💡 ㅓも縦長の母音 — 子音は左、母音は右に置かれます。',
  '💡 ㅣ is the tallest vowel. Consonant always goes to its left.': '💡 ㅣは最も縦長の母音です。子音は常にその左側に置かれます。',
  '💡 ㅗ is a WIDE horizontal vowel. The initial consonant sits ON TOP of the vowel.': '💡 ㅗは横長の母音です。初声（子音）は母音の上に置かれます。',
  '💡 ㅜ is a wide horizontal vowel — consonant on top, vowel below. The line points DOWN.': '💡 ㅜは横長の母音 — 子音は上、母音は下。線は下を向いています。',
  '💡 ㅡ is a flat horizontal vowel — the consonant sits above it.': '💡 ㅡは平らな横長の母音 — 子音はその上に置かれます。',
  '💡 ㄴ is the 받침 here — it sits at the bottom of the block below ㅅ and ㅏ.': '💡 ここでのㄴは받침（終声）です — ㅅとㅏの下、ブロックの一番下に位置します。',
  '💡 ㄹ 받침 — tongue taps the roof of your mouth lightly to produce the ending.': '💡 ㄹ받침 — 舌先が口蓋を軽く叩いて語尾の音を作ります。',
  "💡 ㅂ받침 — lips close at the end without releasing. The 'p' is unreleased.": "💡 ㅂ받침 — 語尾で唇が閉じますが解放しません。'p'は未開放音です。",
  '💡 ㅁ 받침 — lips close gently at the end. A nasal resonant ending.': '💡 ㅁ받침 — 語尾で唇が優しく閉じます。鼻音の共鳴する語尾です。',
  "💡 ㄹ 받침 again — the tongue lingers against the palate. Sounds like a soft 'l'.": "💡 再びㄹ받침 — 舌が口蓋に当たったままになります。柔らかい'l'のような音がします。",

  // hangul card_reveal hints — vowels (steps 1–10)
  "💡 Open your mouth wide, like saying 'ah' at the doctor.": '💡 口を大きく開けて、医者で「あー」と言うように。',
  "💡 Like 'ya' in 'yard'. The extra stroke means a 'y' is added.": "💡 「yard」の「ya」のように。余分な画が'y'の追加を示します。",
  "💡 Similar to 'uh' or 'o' in 'the other'. Lips slightly rounded.": '💡 「uh」や「the other」の「o」に似た音。唇をわずかに丸めます。',
  "💡 Like 'yuh' with rounded lips. Two strokes = 'y' prefix.": "💡 唇を丸めた「ヨ」のような音。二画は'y'が付くことを示します。",
  "💡 Like 'o' in 'more'. Round your lips as if blowing a candle.": '💡 「more」の「o」のように。ろうそくを吹き消すように唇を丸めます。',
  "💡 Like 'yo!' — two strokes add the 'y'. Used a lot in speech.": "💡 「よ！」のように — 二画が'y'を加えます。会話でよく使われます。",
  "💡 Like 'oo' in 'boot'. The line points DOWN — mouth drops.": '💡 「boot」の「oo」のように。線は下向き — 口が下がります。',
  "💡 Like 'you'. Two downward strokes signal the 'y' prefix.": "💡 「ユ」のように。二本の下向きの画が'y'の接頭辞を示します。",
  "💡 Like the 'e' sound when you're unsatisfied: 'euugh'. Flat lips.": '💡 不満そうな「うー」という音のように。唇を平らにします。',
  "💡 Like 'ee' in 'bee'. A simple vertical stroke — pure high front vowel.": '💡 「bee」の「ee」のように。シンプルな縦の一画 — 純粋な高前舌母音。',

  // hangul card_reveal hints — consonants (steps 16–29)
  '💡 Shaped like the back of the throat blocking airflow.': '💡 喉の奥が気流をせき止めている形に似ています。',
  '💡 Shaped like a tongue tip touching the roof of the mouth.': '💡 舌先が口の天井に触れている形に似ています。',
  "💡 Like ㄴ with a roof — tongue fully blocks the palate.": '💡 ㄴに屋根をのせた形 — 舌が口蓋を完全にふさぎます。',
  "💡 A flap — between English 'r' and 'l'. Tongue taps the palate.": "💡 はじき音 — 英語の'r'と'l'の中間。舌が口蓋を叩きます。",
  "💡 Shaped like closed lips pressing together to make 'm'.": "💡 「m」の音を出すために唇が閉じた形に似ています。",
  "💡 Shaped like lips opening to release the 'b' or 'p' sound.": "💡 「b」または「p」の音を出すために唇が開く形に似ています。",
  "💡 Shaped like two teeth — air hisses through for the 's' sound.": "💡 二本の歯の形 — 「ス」の音を出すために空気が漏れます。",
  "💡 Silent at the start of a syllable. Sounds like 'ng' at the end.": "💡 音節の最初では無音。最後では「ng」（ング）の音になります。",
  "💡 Like 'j' in 'juice'. Tongue presses behind upper teeth.": "💡 「juice」の「j」のように。舌が上の歯の裏側を押します。",
  "💡 Aspirated 'ch' — a puff of air comes out. Like 'ch' in 'cheese'.": "💡 激音の「ch」 — 息が出ます。「cheese」の「ch」のように。",
  "💡 Aspirated 'k' — strong puff of air. Hold a tissue and it flutters.": "💡 激音の「k」 — 強い息。ティッシュを持つとなびきます。",
  "💡 Aspirated 't' — like 't' in 'ten' (at word start). Strong burst.": "💡 激音の「t」 — 語頭の「ten」の「t」のように。強い破裂音。",
  "💡 Aspirated 'p' — like 'p' in 'pot'. Lips pop apart with air.": "💡 激音の「p」 — 「pot」の「p」のように。唇が息とともに開きます。",
  "💡 A breathy 'h' — like exhaling warmth onto your hand.": "💡 息の多い「h」 — 手のひらに温かい息を吐くように。",

  // hangul card_reveal hints — tense & aspirated (steps 43–52)
  "💡 Tense 'k' — hold your breath then release. No air puff.": "💡 濃音の「k」 — 息を止めてから解放します。息は出ません。",
  "💡 Tense 't' — throat tightens before releasing. Distinct from ㄷ and ㅌ.": "💡 濃音の「t」 — 解放前に喉が緊張します。ㄷやㅌとは異なります。",
  "💡 Tense 'p' — lips press hard before popping open. No air escapes.": "💡 濃音の「p」 — 唇を強く押し合わせてから開きます。息は出ません。",
  "💡 Tense 's' — a sharp, tight hiss. Used in 있다 (to exist / to have).": "💡 濃音の「s」 — 鋭く締まった摩擦音。있다（存在する・持つ）に使われます。",
  "💡 Tense 'j' — sharper and more abrupt than ㅈ. No air burst.": "💡 濃音の「j」 — ㅈより鋭く急激。息の破裂はありません。",
  '💡 Aspirated — a strong burst of air follows the consonant.': '💡 激音 — 子音の後に強い息が続きます。',
  '💡 Aspirated — tongue snaps off the palate with a puff of air.': '💡 激音 — 舌が息とともに口蓋から離れます。',
  "💡 Aspirated — lips burst open with a pop of air. Like 'pot'.": "💡 激音 — 唇が息の破裂とともに開きます。「pot」のように。",
  "💡 Aspirated 'ch' — like 'cheese' at the start. Air comes out.": "💡 激音の「ch」 — 語頭の「cheese」のように。息が出ます。",
  '💡 A breathy aspirated consonant. The most air of any Korean consonant.': '💡 息の多い激音。韓国語の子音の中で最も多くの息を使います。',

  // hangul card_reveal hints — compound vowels (steps 58–68)
  "💡 ㅏ + ㅣ combined. Like 'e' in 'bed'. Modern Korean = same as 에.": "💡 ㅏ＋ㅣの組み合わせ。「bed」の「e」のように。現代韓国語ではㅔと同じ音。",
  "💡 ㅓ + ㅣ combined. Like 'e' in 'bed'. Sounds the same as 애 today.": "💡 ㅓ＋ㅣの組み合わせ。「bed」の「e」のように。現代では애と同じ音。",
  '💡 ㅑ + ㅣ. Rare — appears in 얘 (this child, colloquial).': '💡 ㅑ＋ㅣ。まれな母音 — 얘（この子、話し言葉）に現れます。',
  "💡 ㅕ + ㅣ. Like 'ye' in 'yes'. 예쁘다 = beautiful.": "💡 ㅕ＋ㅣ。「yes」の「ye」のように。예쁘다 = 美しい。",
  "💡 ㅗ + ㅏ. Like 'wa' in 'water'. 와! = Wow!": "💡 ㅗ＋ㅏ。「water」の「wa」のように。와！= わあ！",
  "💡 ㅗ + ㅐ. Sounds like 'wae'. 왜 = why.": "💡 ㅗ＋ㅐ。「wae」のように聞こえます。왜 = なぜ。",
  "💡 ㅗ + ㅣ. Like 'we'. 외국인 = foreigner.": "💡 ㅗ＋ㅣ。「we」のように。외국인 = 外国人。",
  "💡 ㅜ + ㅓ. Like 'wuh'. 뭐 = what (colloquial).": "💡 ㅜ＋ㅓ。「wuh」のように。뭐 = 何（話し言葉）。",
  "💡 ㅜ + ㅔ. Like 'we'. Very rare in Korean.": "💡 ㅜ＋ㅔ。「we」のように。韓国語では非常にまれな母音。",
  "💡 ㅜ + ㅣ. Like 'wee'. 위 = above / stomach.": "💡 ㅜ＋ㅣ。「wee」のように。위 = 上 / 胃。",
  "💡 ㅡ + ㅣ. A unique glide. 의사 = doctor. Used as possessive particle 의.": "💡 ㅡ＋ㅣ。独特の滑走母音。의사 = 医者。所有を示す助詞「의」として使われます。",

  // syllable-blocks quiz prompts
  'Every Korean syllable block contains exactly how many vowels?': 'すべての韓国語の音節ブロックには母音がいくつ含まれますか？',
  'The INITIAL consonant position (first consonant) is called…': '最初の子音（初声）の位置は何と呼ばれますか？',
  'When a syllable starts with a VOWEL sound, you write __ as a placeholder initial consonant.': '音節が母音の音で始まるとき、プレースホルダーの初声として何を書きますか？',
  '안 (inside / no) — what structural pattern is this?': '안（中 / いいえ）— これはどの構造パターンですか？',
  'With a TALL vowel like ㅏ, ㅓ, or ㅣ — where does the initial consonant go?': 'ㅏ、ㅓ、ㅣなどの縦長母音の場合 — 初声（子音）はどこに入りますか？',
  'With a WIDE vowel like ㅗ, ㅜ, or ㅡ — where does the initial consonant go?': 'ㅗ、ㅜ、ㅡなどの横長母音の場合 — 初声（子音）はどこに入りますか？',
  '배 (stomach / ship) contains ㅐ — which type of vowel is ㅐ?': '배（お腹 / 船）にはㅐが含まれます — ㅐはどの種類の母音ですか？',
  'Which of these is a WIDE (horizontal) vowel?': 'これらのうち、横長（水平）母音はどれですか？',
  '밥 (rice) — what is its 받침 (batchim)?': '밥（ご飯）の받침（終声）は何ですか？',
  '달 (moon) ends with which consonant sound?': '달（月）はどの子音の音で終わりますか？',
  'In a CVC syllable block, where does the 받침 (batchim) sit?': 'CVCの音節ブロックで、받침（終声）はどこに位置しますか？',
  'Which of these words has NO 받침?': 'これらの単語のうち、받침がないものはどれですか？',
  '봄 (spring) = ㅂ + ㅗ + ? — what is the batchim?': '봄（春）= ㅂ＋ㅗ＋？ — 받침は何ですか？',
  '남 (south) — what is its 초성 (initial consonant)?': '남（南）の초성（初声）は何ですか？',
  '달 (moon) — identify the 받침 (batchim / final consonant).': '달（月）の받침（終声）を特定してください。',
  '봄 (spring) — what are all three components in order?': '봄（春）の3つの構成要素を順番に答えてください。',

  // syllable-blocks quiz choices
  'Zero': 'ゼロ',
  'Exactly one': 'ちょうど一つ',
  'One or two': '一つまたは二つ',
  'As many as needed': '必要なだけ',
  'On top': '上に',
  'To the left': '左側に',
  'To the right': '右側に',
  'At the bottom': '一番下に',
  'Wide horizontal': '横長（水平）',
  'Tall vertical': '縦長（垂直）',
  'Compound wide': '複合横長',
  'VC (silent ㅇ + vowel + final)': 'VC（無音ㅇ＋母音＋終声）',
  'Above the vowel': '母音の上に',
  'To the right of the vowel': '母音の右側に',
  'At the bottom, below everything': '一番下、すべての下に',
  'Beside the initial consonant': '初声の横に',

  // syllable-blocks syllable_builder meanings
  'ba — 바나나 (banana)': 'バ — 바나나（バナナ）',
  'na — 나 (I / me)': 'ナ — 나（私）',
  'sa — 사랑 (love)': 'サ — 사랑（愛）',
  'ha — 하늘 (sky)': 'ハ — 하늘（空）',
  'go — 고마워 (thank you, informal)': 'ゴ — 고마워（ありがとう、くだけた表現）',
  'nu — 누구 (who)': 'ヌ — 누구（誰）',
  'mi — 미래 (future)': 'ミ — 미래（未来）',
  'gi — 기다리다 (to wait)': 'ギ — 기다리다（待つ）',

  // syllable-blocks listen_repeat meanings (missing from old HTML)
  'gratitude': '感謝',

  // syllable-blocks step 57 tip & summary rules
  'Self-Test coming up!': '自己テスト！',
  'Three quick questions below to confirm you\'ve got this. Identify the components of each syllable.': '以下の3問で確認しましょう。各音節の構成要素を特定してください。',
  'Every block has exactly one vowel (중성 / Jungseong)': 'すべてのブロックには母音がちょうど一つあります（중성 / 中声）',
  'Vowel-initial syllables use silent ㅇ as a placeholder initial consonant': '母音で始まる音節では、初声のプレースホルダーとして無音のㅇを使います',
  'Tall vowels (ㅏ, ㅓ, ㅣ) — initial consonant sits to the left, vowel to the right': '縦長母音（ㅏ、ㅓ、ㅣ）— 初声は左、母音は右に置かれます',
  'Wide vowels (ㅗ, ㅜ, ㅡ) — initial consonant sits on top, vowel below': '横長母音（ㅗ、ㅜ、ㅡ）— 初声は上、母音は下に置かれます',
  'Optional 받침 (batchim) sits at the bottom of the block, below everything else': '任意の받침（バッチム）はブロックの一番下、他すべての下に位置します',

  // syllable-blocks lesson_complete
  'You can read Korean syllable blocks!': '韓国語の音節ブロックが読めます！',
  'You\'ve mastered the building blocks of all Korean writing — 5 stages, 61 steps. Every Korean word is made of exactly these blocks. 화이팅!': 'すべての韓国語の文字の基礎をマスターしました — 5ステージ、61ステップ。すべての韓국語の単語はまさにこれらのブロックで作られています。화이팅！',

  // hangul quiz prompts
  "Which vowel sounds like 'a' (as in 'father')?": '「a」（「father」の「a」のような）の音の母音はどれですか？',
  "Which vowel sounds like 'o' (as in 'more')?": '「o」（「more」の「o」のような）の音の母音はどれですか？',
  "Which vowel sounds like 'ee' (as in 'bee')?": '「ee」（「bee」の「ee」のような）の音の母音はどれですか？',
  'ㅠ romanizes as…': 'ㅠのローマ字表記は…',
  'ㅡ sounds like…': 'ㅡの音は…',
  'ㄱ romanizes as…': 'ㄱのローマ字表記は…',
  'Which consonant is SILENT at the start of a syllable?': '音節の最初で無音になる子音はどれですか？',
  'ㄴ romanizes as…': 'ㄴのローマ字表記は…',
  "Which consonant sounds like 'j' in 'juice'?": '「juice」の「j」のような音の子音はどれですか？',
  'ㅁ romanizes as…': 'ㅁのローマ字表記は…',
  'ㄹ romanizes as…': 'ㄹのローマ字表記は…',
  '밥 (rice) starts with which consonant?': '밥（ご飯）はどの子音で始まりますか？',
  'ㄲ romanizes as…': 'ㄲのローマ字表記は…',
  'Which is a TENSE consonant (쌍자음)?': '濃音（쌍자음）はどれですか？',
  'ㅃ romanizes as…': 'ㅃのローマ字表記は…',
  'Aspirated consonants are produced with…': '激音はどのように発音されますか？',
  'ㅉ romanizes as…': 'ㅉのローマ字表記は…',
  'ㅘ romanizes as…': 'ㅘのローマ字表記は…',
  '왜 means…': '왜の意味は…',
  'ㅢ romanizes as…': 'ㅢのローマ字表記は…',
  'Which compound vowel uses ㅗ + ㅣ?': 'ㅗ＋ㅣを使う複合母音はどれですか？',
  '예 romanizes as…': '예のローマ字表記は…',

  // hangul quiz choices
  'No air': '息なし',
  'A strong puff of air': '強い息',
  'A tense throat': '喉の緊張',
  'A nasal sound': '鼻音',
  'what': '何',
  'who': '誰',
  'why': 'なぜ',
  'where': 'どこ',

  // hangul syllable_builder meanings
  'ba — as in 바나나 (banana)': 'バ — 바나나（バナナ）',
  'na — as in 나 (me)': 'ナ — 나（私）',
  'sa — as in 사랑 (love)': 'サ — 사랑（愛）',
  'go — as in 고마워 (thank you)': 'ゴ — 고마워（ありがとう）',
  'ha — as in 하늘 (sky)': 'ハ — 하늘（空）',
  'mu — as in 무엇 (what)': 'ム — 무엇（何）',

  // hangul listen_repeat meanings (new — not in old static HTML)
  'hello / goodbye (informal)': 'こんにちは / さようなら（くだけた表現）',
  'sky': '空',
  'thank you (informal)': 'ありがとう（くだけた表現）',

  // hangul lesson_complete
  'You can read Korean!': '韓国語が読めます！',
  'Incredible work — you\'ve completed all 6 stages of Hangul. You can now read and write every character in the Korean alphabet. 화이팅!': '素晴らしい取り組みです — ハングルの全6ステージを完了しました。これで韓国語アルファベットのすべての文字を読み書きできます。화이팅！',

  // pronunciation reading_card titles (new titles — differ from old section headers)
  'What is Batchim?': 'パッチムとは？',
  'The 7 Batchim Sound Groups': 'パッチムの7つの音グループ',
  'Liaison — Linking Sound': '連音化（リエゾン）',
  'Why Does Liaison Happen?': 'なぜ連音化が起こるのか？',
  'Nasal Assimilation': '鼻音化（비음화）',
  'The Assimilation Pattern is Always One Direction': '同化パターンは常に一方向',
  'ㅎ Weakening': 'ㅎの弱化',
  'ㅎ + Consonant = Aspiration': 'ㅎ＋子音＝激音',
  'Palatalization': '口蓋音化（구개음화）',
  'The ㄹ Sound': 'ㄹの音',
  'ㄹ + ㄴ or ㄴ + ㄹ → ㄹㄹ': 'ㄹ＋ㄴまたはㄴ＋ㄹ → ㄹㄹ',
  '6 Common Mistakes for English Speakers': '英語話者がよく犯す6つの間違い',
  "Mistake 1 — Pronouncing ㅡ like 'oo'": "間違い1 — ㅡを「oo」のように発音する",
  "Mistake 2 — Treating ㅓ as English 'er'": "間違い2 — ㅓを英語の「er」として扱う",
  'Mistake 3 — Puffing Air on Double Consonants': '間違い3 — 二重子音に息を吹き出す',
  'Mistake 4 — Rising Intonation on All Questions': '間違い4 — すべての質問に上昇イントネーションを使う',
  "Mistake 5 — ㅅ as Plain 's' before i-Vowels": "間違い5 — i系母音の前でㅅを普通の「s」として発音する",
  'Mistake 6 — Pronouncing the ㅎ in 좋아요': '間違い6 — 좋아요のㅎを発音する',

  // pronunciation quiz prompts
  'ㅋ (kh), ㄲ (kk), and ㄳ are all batchim in the same group. Which sound group are they in?': 'ㅋ（kh）、ㄲ（kk）、ㄳはすべて同じグループのパッチムです。どの音グループですか？',
  '방 (room) ends with batchim ㅇ. What sound does this make?': '방（部屋）はパッチムㅇで終わります。この音はどんな音ですか？',
  'Liaison (연음화) occurs when a batchim is followed by a syllable that begins with…': '連音化（연음화）はパッチムの後に___で始まる音節が来るときに起こります。',
  'In 한국어 (Korean language), the ㄱ batchim of 국 links forward. How is it pronounced?': '한국어（韓国語）では、국のㄱパッチムが前方につながります。どのように発音されますか？',
  'ㅂ (or ㅍ) batchim followed by ㄴ or ㅁ changes to which sound?': 'ㅂ（またはㅍ）パッチムの後にㄴまたはㅁが来るとき、どの音に変わりますか？',
  'ㄱ batchim followed by ㄴ or ㅁ changes to which sound?': 'ㄱパッチムの後にㄴまたはㅁが来るとき、どの音に変わりますか？',
  '입니다 (is / am / are) — how is it actually pronounced?': '입니다（です）— 実際にはどのように発音されますか？',
  'Tensification (경음화) occurs most predictably after which type of batchim?': '濃音化（경음화）はどの種類のパッチムの後に最も規則的に起こりますか？',
  '학교 (school) — how is it actually pronounced?': '학교（学校）— 実際にはどのように発音されますか？',
  'What sound does ㅎ + ㄷ (or ㄷ + ㅎ) produce?': 'ㅎ＋ㄷ（またはㄷ＋ㅎ）はどんな音を生み出しますか？',
  'When ㄷ batchim is followed by the vowel 이, it changes to…': 'ㄷパッチムの後に母音이が来るとき、___に変わります。',
  'When ㅌ batchim is followed by the vowel 이, it changes to…': 'ㅌパッチムの後に母音이が来るとき、___に変わります。',
  '신라 (Silla — a historical Korean kingdom) is pronounced as…': '신라（新羅 — 韓国の歴史的な王朝）の発音は…',
  'When pronouncing ㅡ, your lips should be…': 'ㅡを発音するとき、唇は…',
  'ㅅ before the vowel 이 sounds like…': '母音이の前のㅅは___のような音になります。',
  '좋아요 (it is good / I like it) is actually pronounced as…': '좋아요（良い / 好きです）の実際の発音は…',

  // pronunciation quiz choices
  'ㄴ-group (n)': 'ㄴグループ（n）',
  'ㄱ-group (k)': 'ㄱグループ（k）',
  'ㅂ-group (p)': 'ㅂグループ（p）',
  'ㄷ-group (t)': 'ㄷグループ（t）',
  'No sound — ㅇ is always silent': '無音 — ㅇは常に無音',
  "ng (like 'sing')": '「sing」のようなng',
  'Any consonant': '任意の子音',
  'Silent ㅇ (vowel-initial syllable)': '無音のㅇ（母音で始まる音節）',
  'ㄴ or ㅁ only': 'ㄴまたはㅁのみ',
  'An aspirated consonant': '激音',
  '한국어 → 항궈 (stays in 국)': '한국어 → 항궈（국に留まる）',
  '한국어 → 한구거 (ㄱ opens 어)': '한국어 → 한구거（ㄱが어を開く）',
  '한국어 → 한국어 (no change)': '한국어 → 한국어（変化なし）',
  '한국어 → 한국아 (vowel changes)': '한국어 → 한국아（母音が変わる）',
  'ㅇ (ng)': 'ㅇ（ng）',
  'Nasal batchim (ㄴ, ㅁ, ㅇ)': '鼻音パッチム（ㄴ、ㅁ、ㅇ）',
  'Unreleased stop batchim (ㄱ, ㄷ, ㅂ groups)': '未開放閉鎖音パッチム（ㄱ、ㄷ、ㅂグループ）',
  'The ㄹ batchim only': 'ㄹパッチムのみ',
  'Any batchim consonant': '任意のパッチム子音',
  'hak-kyo (aspirated)': 'hak-kyo（激音）',
  'hak-kkyo (tensed)': 'hak-kkyo（濃音）',
  'ㄷ (plain)': 'ㄷ（平音）',
  'ㅌ (aspirated t)': 'ㅌ（激音t）',
  'ㄸ (tensed)': 'ㄸ（濃音）',
  'ㅎ (stays h)': 'ㅎ（hのまま）',
  "Rounded like 'oo'": '「oo」のように丸める',
  'Flat and unrounded (spread)': '平らで丸めない（広げる）',
  "Slightly open like 'ah'": '「ah」のようにわずかに開ける',
  'Puckered like a kiss': 'キスをするように突き出す',
  "Plain 's' as in 'see'": '「see」のような普通の「s」',
  "'sh' as in 'she'": '「she」のような「sh」',
  "'z' as in 'zero'": '「zero」の「z」',
  "'t' as in 'tea'": '「tea」の「t」',

  // pronunciation listen_repeat meanings
  'soup — ㄱ-group batchim, pronounced k (unreleased)': 'スープ — ㄱグループパッチム、k（未開放）の発音',
  'mountain — ㄴ-group batchim, pronounced n': '山 — ㄴグループパッチム、nの発音',
  'clothes — ㄷ-group batchim (ㅅ→t), pronounced t (unreleased)': '服 — ㄷグループパッチム（ㅅ→t）、t（未開放）の発音',
  'moon — ㄹ-group batchim, pronounced l': '月 — ㄹグループパッチム、lの発音',
  'night / chestnut — ㅁ-group batchim, pronounced m': '夜 / 栗 — ㅁグループパッチム、mの発音',
  'mouth — ㅂ-group batchim, pronounced p (unreleased)': '口 — ㅂグループパッチム、p（未開放）の発音',
  'river — ㅇ-group batchim, pronounced ng': '川 — ㅇグループパッチム、ngの発音',
  'chicken — double batchim ㄺ (ㄹ+ㄱ) → ㄱ group → k sound': '鶏 — 複合パッチムㄺ（ㄹ+ㄱ）→ ㄱグループ → kの音',
  'flower — batchim ㅊ belongs to the ㄷ-group → t sound': '花 — パッチムㅊはㄷグループに属する → tの音',
  'I eat / am eating — ㄱ batchim of 먹 links into 어, sounds like 머거요': '食べます — 먹のㄱパッチムが어につながり、머거요のように聞こえます',
  'rice (object form) — ㅂ batchim of 밥 links into 을, sounds like 바블': 'ご飯（目的語形）— 밥のㅂパッチムが을につながり、바블のように聞こえます',
  'It is good / I like it — ㅎ batchim weakens and links (see Stage 4 for ㅎ rules)': 'よい / 好きです — ㅎパッチムが弱化してつながります（ㅎのルールはステージ4で）',
  'Korean language — ㄱ batchim of 국 links into 어, sounds like 한구거': '韓国語 — 국のㄱパッチムが어につながり、한구거のように聞こえます',
  'is / am / are (formal) — ㅂ + ㄴ → ㅁ: spelled 입니다, sounds like 임니다': 'です（丁寧語）— ㅂ＋ㄴ → ㅁ：綴りは입니다、発音は임니다',
  'broth — ㄱ + ㅁ → ㅇ: spelled 국물, sounds like 궁물': 'ブロス — ㄱ＋ㅁ → ㅇ：綴りは국물、発音は궁물',
  'school year / grade — ㄱ + ㄴ → ㅇ: spelled 학년, sounds like 항년': '学年 — ㄱ＋ㄴ → ㅇ：綴りは학년、発音は항년',
  'walks / to walk — ㄷ + ㄴ → ㄴ: spelled 걷는다, sounds like 건는다': '歩く — ㄷ＋ㄴ → ㄴ：綴りは걷는다、発音は건는다',
  'front yard — ㅂ + ㅁ → ㅁ: spelled 앞마당, sounds like 암마당': '前庭 — ㅂ＋ㅁ → ㅁ：綴りは앞마당、発音は암마당',
  'school — ㄱ batchim triggers tensification: ㄱ→ㄲ, sounds like 학꾜': '学校 — ㄱパッチムが濃音化を引き起こす：ㄱ→ㄲ、학꾜のように聞こえます',
  'restaurant — ㄱ batchim triggers tensification: ㄷ→ㄸ, sounds like 식땅': 'レストラン — ㄱパッチムが濃音化を引き起こす：ㄷ→ㄸ、식땅のように聞こえます',
  'to close — ㄷ batchim triggers tensification: ㄷ→ㄸ, sounds like 닫따': '閉じる — ㄷパッチムが濃音化を引き起こす：ㄷ→ㄸ、닫따のように聞こえます',
  'entrance — ㅂ batchim triggers tensification: ㄱ→ㄲ, sounds like 입꾸': '入口 — ㅂパッチムが濃音化を引き起こす：ㄱ→ㄲ、입꾸のように聞こえます',
  'It is good / I like it — ㅎ batchim weakens: sounds like 조아요 (not 조하요)': 'よい / 好きです — ㅎパッチムが弱化：조아요のように聞こえます（조하요ではない）',
  'There is a lot — ㅎ in ㄶ batchim weakens: sounds like 마나요': 'たくさんあります — ㄶパッチムのㅎが弱化：마나요のように聞こえます',
  'I put it in — ㅎ batchim weakens between vowels: sounds like 너어요': '入れます — 母音間でㅎパッチムが弱化：너어요のように聞こえます',
  'to let go / to place — ㅎ batchim + ㄷ → ㅌ: spelled 놓다, sounds like 노타': '手放す / 置く — ㅎパッチム＋ㄷ → ㅌ：綴りは놓다、発音は노타',
  'together — ㅌ + 이 → ㅊ: spelled 같이, sounds like 가치': '一緒に — ㅌ＋이 → ㅊ：綴りは같이、発音は가치',
  'deliberately / stubbornly — ㄷ + 이 → ㅈ: spelled 굳이, sounds like 구지': 'わざと / 頑固に — ㄷ＋이 → ㅈ：綴りは굳이、発音は구지',
  'instant noodles — ㄹ in initial position (before vowel): quick r-tap': 'インスタントラーメン — 語頭のㄹ（母音の前）：素早いrのはじき音',
  'moon — ㄹ as final batchim: held l sound': '月 — 終声パッチムとしてのㄹ：保持されたlの音',
  'quickly, fast — doubled ㄹㄹ: held l then r-tap': '速く — 二重ㄹㄹ：保持されたlに続くrのはじき音',
  'I love you — ㄹ between vowels (랑→해): r-tap sound': '사랑해요（愛してる）— 母音間のㄹ（랑→해）：rのはじき音',

  // pronunciation lesson_complete
  'Pronunciation Guide Complete!': '発音ガイド完了！',
  'You have mastered all 8 Korean pronunciation rules: batchim reduction, liaison, nasal assimilation, tensification, ㅎ weakening, ㅎ aspiration, palatalization, and the ㄹ sound. Plus the 6 most common mistakes English speakers make — and how to avoid them. Your Korean pronunciation will now sound far more natural.': '韓国語の発音ルール8つをすべてマスターしました：パッチムの縮約、連音化、鼻音化、濃音化、ㅎの弱化、ㅎの激音化、口蓋音化、そしてㄹの音。さらに、英語話者がよく犯す6つの間違いとその回避方法も習得しました。あなたの韓国語の発音は、これからずっと自然になります。',

  // ── Vocabulary lesson (vocabulary.html) ─────────────────────────────

  // Static lesson-meta and lesson-intro-bullets (translated by initial TreeWalker)
  '🗂 6 Stages · 80 Steps': '🗂 6ステージ・80ステップ',
  '🔊 Audio on every card': '🔊 全カードに音声付き',
  '⚡ XP + Streak system': '⚡ XP・連続正解システム',
  'Covers 500+ core Korean words across 6 categories': '6カテゴリーで500語以上の基礎韓国語単語をカバー',
  'Bite-sized steps with instant audio — tap any card to hear it': '即時音声付きの小さなステップ — カードをタップして聞いてみよう',
  'Quizzes after every category to lock in your memory': 'カテゴリーごとのクイズで記憶を定着',
  'Most learners finish all 6 stages in under 90 minutes': 'ほとんどの学習者は90分以内に全6ステージを完了',

  // Sidebar vocab accordion links (static, TreeWalker)
  'Food & Colors': '食べ物・色',
  'Places & Travel': '場所・旅行',
  'Verbs & Adjectives': '動詞・形容詞',

  // Stage names (step-runner stage-nav, MutationObserver)
  'Family & Body': '家族・体',
  'Verbs & Adj.': '動詞・形容詞',

  // ── Stage 1: Greetings ───────────────────────────────────────────────
  'Greetings in Korean': '韓国語のあいさつ',
  'Korean greetings change depending on who you are talking to and the situation. The most important distinction is formal vs. casual speech. Use formal forms with strangers, elders, and in professional settings. Casual forms are for friends and people younger than you.': '韓国語の挨拶は、話し相手や状況によって変わります。最も重要な区別は丁寧語とカジュアル語の違いです。初対面の人、目上の方、ビジネスの場では丁寧な表現を使いましょう。カジュアルな表現は友人や年下の人に使います。',
  'Key rule: when in doubt, be formal': '重要なポイント：迷ったら丁寧語を使おう',
  'Koreans appreciate effort. Using the formal 하세요 ending is always safe with people you just met. Switching to casual 안녕 with a close friend shows warmth.': '韓国人は努力を高く評価します。初対面の人には丁寧な하세요の語尾が常に無難です。親しい友人には안녕というカジュアル表現に切り替えると親しみが伝わります。',
  'Hello — formal, the most common greeting': 'こんにちは — 丁寧な表現、最もよく使われる挨拶',
  'Hi / Bye (casual) — used with friends': 'やあ／バイバイ（カジュアル）— 友人に使う',
  'Thank you — formal, very polite': 'ありがとうございます — 丁寧で非常に礼儀正しい表現',
  'Thank you — polite but less formal than 감사합니다': 'ありがとうございます — 丁寧だが감사합니다より少しカジュアル',
  "I'm sorry — formal apology": '申し訳ございません — 丁寧な謝罪表現',
  "It's okay / Are you okay? — very versatile phrase": '大丈夫ですよ／大丈夫ですか？— とても汎用性の高いフレーズ',
  'Nice to meet you — used when meeting someone for the first time': 'はじめまして — 初対面の時に使う表現',
  'Goodbye — said to the person who is leaving': 'さようなら — 去る人に言う表現',
  'Fighting! / You can do it! — a Korean cheer of encouragement': 'ファイティング！／あなたならできる！— 韓国の応援の掛け声',
  "Which phrase means 'Hello' in the most formal way?": '最も丁寧な「こんにちは」の表現はどれですか？',
  "How do you say 'Thank you' in the most formal Korean?": '最も丁寧な「ありがとう」の韓国語は何ですか？',

  // ── Stage 2: Numbers ────────────────────────────────────────────────
  'Two Number Systems': '二つの数詞体系',
  'Korean uses two separate number systems: Native Korean numbers (고유어) and Sino-Korean numbers (한자어). You must know both — they are used in different situations.': '韓国語には二つの数詞体系があります：固有語（고유어）と漢数字（한자어）。どちらも必須です — 状況によって使い分けます。',
  'Native Korean: use for counting items (개), age (살), and hours of the clock (시) — e.g., 하나, 둘, 셋': '固有語：物を数える（개）、年齢（살）、時計の時間（시）に使用 — 例：하나、둘、셋',
  'Sino-Korean: use for money (원), minutes (분), dates, phone numbers, and addresses — e.g., 일, 이, 삼': '漢数字：お金（원）、分（분）、日付・電話番号・住所に使用 — 例：일、이、삼',
  'Large numbers always use Sino-Korean — 백 (100), 천 (1,000), 만 (10,000)': '大きな数は常に漢数字を使います — 백（100）、천（1,000）、만（10,000）',
  'Quick memory trick': '覚え方のコツ',
  'Think: Native = natural body rhythms (heartbeat, age, counting on your fingers). Sino = systematic/official contexts (clocks, money, calendars).': '覚え方：固有語 ＝ 自然な身体のリズム（鼓動・年齢・指での数え方）。漢数字 ＝ 体系的・公式の場面（時計・お金・カレンダー）。',
  'Please give me one apple · Native Korean 1': 'りんごを一つください · 固有語の1',
  'Two friends · Native Korean 2': '友達二人 · 固有語の2',
  'Count to three · Native Korean 3': '三まで数えて · 固有語の3',
  "10 o'clock · Native Korean 10 (used for hours)": '10時 · 固有語の10（時間に使用）',
  'January 1st · Sino-Korean 1': '1月1日 · 漢数字の1',
  'Ten minutes · Sino-Korean 10 (used for minutes)': '10分 · 漢数字の10（分に使用）',
  '100 won · Sino-Korean 100': '100ウォン · 漢数字の100',
  '1,000 won · Sino-Korean 1,000': '1,000ウォン · 漢数字の1,000',
  'You are telling someone your age in Korean. Which number system do you use?': '韓国語で年齢を伝えるとき、どちらの数詞体系を使いますか？',
  'Sino-Korean (일, 이, 삼)': '漢数字（일、이、삼）',
  'Native Korean (하나, 둘, 셋)': '固有語（하나、둘、셋）',
  'Either one is fine': 'どちらでも構わない',
  'Neither — use English numbers': 'どちらでもなく — 英語の数字を使う',
  'Korean Counters': '韓国語の助数詞',
  'Korean numbers must be paired with counters (단위명사) — special words that indicate what kind of thing you are counting. The counter comes after the number.': '韓国語の数詞は助数詞（단위명사）と組み合わせる必要があります — 数えるものの種類を示す特別な語です。助数詞は数字の後に来ます。',
  '개 (gae) — general objects: 사과 두 개 (two apples)': '개（gae）— 一般的な物：사과 두 개（りんご二つ）',
  '명 (myeong) — people (formal): 학생 세 명 (three students)': '명（myeong）— 人（丁寧）：학생 세 명（学生三人）',
  '분 (bun) — people (honorific): 선생님 두 분 (two teachers)': '분（bun）— 人（敬語）：선생님 두 분（先生二名）',
  '살 (sal) — age: 스물다섯 살 (25 years old)': '살（sal）— 年齢：스물다섯 살（25歳）',
  '권 (gwon) — books: 책 한 권 (one book)': '권（gwon）— 本：책 한 권（本一冊）',
  '잔 (jan) — cups / glasses: 커피 한 잔 (one cup of coffee)': '잔（jan）— カップ・グラス：커피 한 잔（コーヒー一杯）',
  'Three candies · general objects counter': 'キャンディー三つ · 一般的な物の助数詞',
  'Two friends · people counter (formal)': '友達二人 · 人の助数詞（丁寧）',
  'Which counter do you use for books (책)?': '本（책）に使う助数詞はどれですか？',

  // ── Stage 3: Family & Body ───────────────────────────────────────────
  'Family in Korean': '韓国語の家族',
  "Korean has different words for family members depending on your gender and theirs. For example, an older brother is 형 if the speaker is male, but 오빠 if the speaker is female. This reflects Korean culture's emphasis on relative seniority.": '韓国語では、話し手と相手の性別によって家族を表す語が異なります。例えば、兄は話し手が男性なら형、女性なら오빠です。これは相対的な年上を重視する韓国文化を反映しています。',
  'Honorific family titles': '敬称としての家族呼称',
  "Koreans often address even non-relatives with family titles as a mark of respect: 언니 (older sister) to a woman you know, 아저씨 (middle-aged man) to a stranger. It's warmer than using names.": '韓国人はよく、親族以外にも家族の呼称を敬意の表れとして使います：知人の女性に언니（お姉さん）、見知らぬ中年男性に아저씨。名前で呼ぶより親しみを感じさせます。',
  'Father · 아빠 is the casual form (Dad)': '父 · 아빠はカジュアルな言い方（パパ）',
  'Mother · 엄마 is the casual form (Mom)': '母 · 엄마はカジュアルな言い方（ママ）',
  'Older brother · 형 for male speakers, 오빠 for female speakers': '兄 · 話し手が男性なら형、女性なら오빠',
  'Older sister · 누나 for male speakers, 언니 for female speakers': '姉 · 話し手が男性なら누나、女性なら언니',
  'Grandfather (paternal) · Are you well, grandfather?': '祖父（父方）· おじいちゃん、お元気ですか？',
  "Grandmother · I'm going to grandmother's house": '祖母 · おばあちゃんの家に行きます',
  'A female speaker calls her older brother ___.': '女性話者が兄を呼ぶとき＿＿＿と言います。',
  "Knowing body parts is essential for describing pain at a clinic, understanding directions, or describing someone's appearance. Many Korean body-part words are also used idiomatically — for example, 눈이 높다 (literally 'high eyes') means 'having high standards.'": '体の部位を知ることは、病院で痛みを伝えたり、道案内を理解したり、人の外見を描写したりするために不可欠です。韓国語の体の部位の語は慣用的にも使われます — 例えば、눈이 높다（直訳：目が高い）は「目が高い・要求水準が高い」という意味です。',
  'Head / Hair · I have a headache': '頭 / 髪 · 頭が痛いです',
  "Eyes · (Their) eyes are big — 눈 also means 'snow'!": '目 · （その人の）目が大きい — 눈は「雪」も意味します！',
  'Hand(s) · Wash your hands': '手 · 手を洗ってください',
  'Foot / Feet · My feet hurt': '足 · 足が痛いです',
  "Which Korean word means 'ear'?": '「耳」を意味する韓国語はどれですか？',

  // ── Stage 4: Food & Colors ───────────────────────────────────────────
  'Korean Food': '韓国料理',
  'Food is central to Korean culture. A meal almost always comes with 반찬 (banchan) — small side dishes served alongside the main dish. The table phrase 잘 먹겠습니다 (jal meokgesseumnida) is said before eating; 잘 먹었습니다 (jal meogeosseumnida) is said after.': '食事は韓国文化の中心です。食事にはほぼ必ず반찬（バンチャン）— メインディッシュと一緒に出される小さなおかず — が付いてきます。食前の挨拶は잘 먹겠습니다（頂きます）、食後は잘 먹었습니다（ご馳走様でした）と言います。',
  'Must-know K-food vocabulary': '必須の韓国料理語彙',
  "밥 (bap) means both 'rice' and 'meal' — so 밥 먹었어요? (did you eat?) is a common greeting among Koreans, similar to asking 'how are you?'": '밥（bap）は「ご飯」と「食事」の両方を意味します — そのため、밥 먹었어요？（ご飯食べた？）は韓国人の一般的な挨拶で、「元気ですか？」に近い使い方です。',
  'Rice / Meal — the cornerstone of Korean cuisine': 'ご飯 / 食事 — 韓国料理の要',
  "Kimchi — fermented vegetables, Korea's most iconic side dish": 'キムチ — 発酵野菜、韓国で最も有名なおかず',
  'Bibimbap — mixed rice bowl with vegetables, egg, and gochujang': 'ビビンバ — 野菜・卵・コチュジャン入りの混ぜご飯',
  'Samgyeopsal — grilled pork belly, a classic Korean BBQ cut': 'サムギョプサル — 豚バラの焼き肉、定番の韓国BBQ',
  'Tteokbokki — spicy rice cakes, a beloved Korean street food': 'トッポッキ — 辛い餅、大人気の韓国屋台グルメ',
  'What is 불고기 (bulgogi)?': '불고기（プルコギ）とは何ですか？',
  'Spicy tofu stew': '辛い豆腐チゲ',
  'Korean BBQ beef': '韓国式BBQ牛肉',
  'Cold noodles': '冷麺',
  'Grilled pork belly': '豚バラの焼き肉',
  "Korean color words end in 색 (saek), meaning 'color.' For example: 빨간색 (ppalgansaek) = red color. In everyday speech, 색 is often dropped — 빨간 (ppalgan) is also used as an adjective. Some colors have poetic native Korean forms alongside the Sino-Korean -색 compounds.": '韓国語の色彩語は「色」を意味する색（saek）で終わります。例：빨간색（ppalgansaek）＝赤い色。日常会話では색が省略されることが多く、빨간（ppalgan）という形容詞としても使われます。一部の色には、漢字語の-색複合語と並んで詩的な固有語形があります。',
  'Adjective form': '形容詞の形',
  "To say 'a red bag', drop 색: 빨간 가방 (red bag). Add the noun directly after the color adjective — no extra particle needed.": '「赤いバッグ」と言うには색を省略して：빨간 가방。色の形容詞の直後に名詞を置くだけ — 助詞は不要です。',
  'Red · a red apple': '赤 · 赤いりんご',
  'Blue · a blue sky': '青 · 青い空',
  'Yellow · a yellow banana': '黄色 · 黄色いバナナ',
  'Green · a green tree': '緑 · 緑の木',
  '흰색 (huinsaek) is which color?': '흰색（huinsaek）は何色ですか？',
  'Black': '黒',
  'Gray': '灰色',
  'White': '白',
  'Silver': '銀色',

  // ── Stage 5: Places & Travel ─────────────────────────────────────────
  'Places in Korea': '韓国の場所',
  'Korea is famous for its convenience — 편의점 (convenience stores) are open 24/7 on nearly every block. Learning the names of common places helps you navigate cities, ask for directions, and understand public signs.': '韓国は利便性で有名です — 편의점（コンビニ）はほぼ全ての街角で24時間営業しています。よく使う場所の名前を知ることで、都市をナビゲートしたり、道を尋ねたり、公共のサインを理解したりするのに役立ちます。',
  'Essential city places': '必須の都市スポット',
  'Two uniquely Korean places: 노래방 (noraebang) — private karaoke rooms where you sing with friends, not strangers. 찜질방 (jjimjilbang) — Korean sauna and communal rest space, open 24h.': '韓国ならではの2つの場所：노래방（ノラエバン）— 見知らぬ人とではなく、友人と歌う個室カラオケ。찜질방（チムジルバン）— 韓国式サウナと共用休憩スペース、24時間営業。',
  "School · I'm going to school": '学校 · 学校に行きます',
  'Hospital · I need to go to the hospital': '病院 · 病院に行かなければなりません',
  'Convenience store · I bought it at the convenience store': 'コンビニ · コンビニで買いました',
  'Subway station · Where is the subway station?': '地下鉄の駅 · 地下鉄の駅はどこですか？',
  'Where do you go in Korea to buy medicine?': '韓国で薬を買うにはどこに行きますか？',
  'Travel Vocabulary': '旅行語彙',
  "Whether you're booking a trip or navigating an airport, these travel words are essential. Korean airports and transit systems display signs in Korean and English, but knowing the Korean terms helps you ask questions confidently.": '旅行の予約から空港のナビゲートまで、これらの旅行語彙は必須です。韓国の空港や交通機関の案内板は韓国語と英語で表示されていますが、韓国語の用語を知っていれば自信を持って質問できます。',
  '여권 (yeogwon) — passport': '여권（yeogwon）— パスポート',
  '예약 (yeyak) — reservation / booking': '예약（yeyak）— 予約',
  '환전 (hwanjeon) — currency exchange': '환전（hwanjeon）— 両替',
  '도착 (dochak) — arrival': '도착（dochak）— 到着',
  '출발 (chulbal) — departure': '출발（chulbal）— 出発',
  '수하물 (suhamul) — luggage / baggage': '수하물（suhamul）— 荷物',
  'Passport — keep it with you at all times when traveling': 'パスポート — 旅行中は常に携帯しましょう',
  'Reservation / Booking — used for hotels, restaurants, flights': '予約 — ホテル・レストラン・フライトに使う',
  'Arrival — displayed on airport arrival boards': '到着 — 空港の到着案内板に表示される',
  'Departure — displayed on airport departure boards': '出発 — 空港の出発案内板に表示される',
  'How much is it? — essential shopping phrase': 'いくらですか？— 必須のショッピングフレーズ',
  "How do you say 'airport' in Korean?": '「空港」の韓国語は何ですか？',

  // ── Stage 6: Verbs & Adjectives ──────────────────────────────────────
  'Korean Verbs': '韓国語の動詞',
  'All Korean verbs end in 다 (da) in their dictionary form — this is called the infinitive. When speaking, verbs are conjugated by replacing 다 with endings that show tense, formality, and mood. The polite present tense uses 아요 / 어요 endings.': '韓国語の動詞はすべて辞書形では다（da）で終わります — これを原形と呼びます。会話では、다を時制・丁寧さ・語調を示す語尾に置き換えて活用します。丁寧な現在形は아요 / 어요の語尾を使います。',
  '가다 → 가요 (to go → goes/going)': '가다 → 가요（行く → 行きます）',
  '먹다 → 먹어요 (to eat → eats/eating)': '먹다 → 먹어요（食べる → 食べます）',
  '공부하다 → 공부해요 (to study → studies/studying)': '공부하다 → 공부해요（勉強する → 勉強します）',
  'Start with these 5 essential verbs': 'まずこの5つの必須動詞から',
  '가다 (go) · 오다 (come) · 먹다 (eat) · 보다 (see/watch) · 하다 (do). 하다 is the most versatile — it attaches to nouns to make verbs: 공부하다 (study), 일하다 (work), 사랑하다 (love).': '가다（行く）· 오다（来る）· 먹다（食べる）· 보다（見る・観る）· 하다（する）。하다は最も汎用性が高く、名詞に付けて動詞を作れます：공부하다（勉強する）、일하다（働く）、사랑하다（愛する）。',
  'To go · (I) go to school': '行く · 学校に行きます',
  'To eat · (I) eat rice': '食べる · ご飯を食べます',
  'To speak / say · (I) speak in Korean': '話す・言う · 韓国語で話します',
  'To study · (I) study Korean': '勉強する · 韓国語を勉強します',
  'To like · (I) like music': '好きだ · 音楽が好きです',
  "Which verb means 'to drink'?": '「飲む」を意味する動詞はどれですか？',
  'Korean Adjectives': '韓国語の形容詞',
  "In Korean, adjectives work like verbs — they conjugate for tense and formality. The dictionary form ends in 다, just like verbs. In the polite present: 좋다 → 좋아요 (it's good), 크다 → 커요 (it's big). This is very different from English where adjectives never conjugate.": '韓国語では形容詞は動詞のように働き、時制や丁寧さに合わせて活用します。辞書形は動詞と同様に다で終わります。丁寧な現在形：좋다 → 좋아요（良いです）、크다 → 커요（大きいです）。形容詞が活用しない英語とは大きく異なります。',
  'Pairs to learn together': '対で覚えよう',
  'Learn opposites as pairs: 크다 / 작다 (big/small), 빠르다 / 느리다 (fast/slow), 쉽다 / 어렵다 (easy/hard), 좋다 / 나쁘다 (good/bad). Pairs halve your memorization effort.': '反意語をペアで覚えましょう：크다 / 작다（大きい/小さい）、빠르다 / 느리다（速い/遅い）、쉽다 / 어렵다（簡単/難しい）、좋다 / 나쁘다（良い/悪い）。ペアで覚えると記憶量が半分になります。',
  'Good / Nice · The weather is nice': '良い / 素敵 · 天気が良いです',
  'Delicious · The kimchi is delicious': 'おいしい · キムチがおいしいです',
  'Interesting / Fun · Korean is fun': '面白い / 楽しい · 韓国語は楽しいです',
  'Big / Large · Seoul is a big city': '大きい · ソウルは大きな都市です',
  "Which adjective means 'difficult' or 'hard'?": '「難しい」を意味する形容詞はどれですか？',

  // Lesson complete (original combined vocabulary.json)
  'Vocabulary Complete!': '語彙完成！',
  "You've covered 6 vocabulary categories — greetings, numbers, family, food, places, and verbs. Keep building your word bank and you'll be having Korean conversations sooner than you think.": '6つの語彙カテゴリーを学びました — あいさつ・数字・家族・食べ物・場所・動詞。語彙を増やし続ければ、思ったより早く韓国語で会話できるようになります。',

  // ── Updated lesson-meta (21 categories) ─────────────────────────────
  '🗂 21 Categories': '🗂 21カテゴリー',
  'Covers 500+ core Korean words across 21 categories': '21カテゴリーで500語以上の基礎韓国語単語をカバー',
  'Most learners finish each category in under 15 minutes': 'ほとんどの学習者は15分以内に各カテゴリーを完了',

  // ── Sidebar link labels / stage-nav names (new) ──────────────────────
  'Greetings': 'あいさつ',
  'Numbers': '数字',
  'Family': '家族',
  'Colors': '色',
  'Body Parts': '体の部位',
  'Food & Drink': '食べ物・飲み物',
  'Days & Time': '日付・時間',
  'Places': '場所',
  'Emotions': '感情',
  'Travel': '旅行',
  'Shopping': 'ショッピング',
  'Weather': '天気',
  'Verbs & Actions': '動詞・行動',
  'Adjectives': '形容詞',
  'Workplace': '職場',
  'Health & Medicine': '健康・医学',
  'Media & K-Culture': 'メディア・韓流',
  'Proverbs & Idioms': 'ことわざ・慣用句',
  'Academic Korean': '学術韓国語',
  'News & Society': 'ニュース・社会',
  'Konglish': 'コングリッシュ',

  // ── Greetings lesson_complete ─────────────────────────────────────────
  'Greetings Complete!': 'あいさつ完成！',
  "You've learned 8 essential Korean greetings — from formal hellos to cheerful goodbyes. These phrases alone will make a huge impression on Korean speakers you meet.": '韓国語の必須あいさつ8つを学びました — 丁寧なこんにちはから明るいさようならまで。これらのフレーズだけで、出会う韓国語話者に大きな印象を与えられます。',

  // ── Numbers lesson_complete ───────────────────────────────────────────
  'Numbers Complete!': '数字完成！',
  "You've mastered both Korean number systems and key counters. Numbers unlock a huge part of daily life — telling time, shopping, giving your age, and more.": '韓国語の両方の数詞体系と主要な助数詞をマスターしました。数字を知ることで日常生活の多くの場面が開けます — 時間・ショッピング・年齢を伝えることなど。',

  // ── Family category (new entries) ────────────────────────────────────
  'Younger sibling · 남동생 = younger brother, 여동생 = younger sister': '兄弟姉妹（下）· 남동생＝弟、여동생＝妹',
  "Parents (honorific) · I'll give it to my parents": '両親（敬称）· 両親に差し上げます',
  'Husband / Wife · My husband cooks': '夫 / 妻 · 夫が料理します',
  "Which word means 'parents' (honorific)?": '「両親」を意味する語はどれですか？（敬称）',
  'Family Complete!': '家族完成！',
  "You've learned Korean family vocabulary — one of the most culturally rich areas of the language. Remember that family titles in Korean reflect seniority, gender, and relationship.": '韓国語の家族語彙を学びました — 言語の中で最も文化的に豊かな分野の一つです。韓国語の家族の呼称は年功序列・性別・関係性を反映することを覚えておきましょう。',

  // ── Body Parts category ───────────────────────────────────────────────
  'Body Parts in Korean': '韓国語の体の部位',
  'Useful at the clinic': '病院で役立つ',
  'When you visit a Korean clinic, point and say 여기가 아파요 (It hurts here) with any body-part word: 머리 (head), 배 (stomach), 등 (back), 다리 (leg). Doctors appreciate the effort.': '韓国のクリニックを受診する際は、指さして여기가 아파요（ここが痛いです）と体の部位の語を添えて言いましょう：머리（頭）、배（お腹）、등（背中）、다리（足）。医師は努力を評価します。',
  'Face · (Your) face is pretty': '顔 · （あなたの）顔がきれいです',
  'Nose · (Their) nose is high/prominent': '鼻 · （その人の）鼻が高い',
  'Mouth · Open your mouth wide': '口 · 口を大きく開けてください',
  "Ear(s) · Literally 'thin ears' = easily influenced by others": '耳 · 文字通り「薄い耳」＝人に影響されやすい',
  "Stomach / Belly · I'm hungry (lit. my stomach is empty)": 'お腹 · お腹が空きました（直訳：お腹が空っぽ）',
  'Back · My back hurts': '背中 · 背中が痛いです',
  'Body Parts Complete!': '体の部位完成！',
  "Great work! You can now name key body parts in Korean — perfect for clinic visits, sports, or daily conversations. Try using 아파요 (it hurts) with any body part you learned.": 'よくできました！韓国語で主な体の部位を言えるようになりました — 病院の受診・スポーツ・日常会話に最適です。学んだ体の部位に아파요（痛い）を付けて練習してみましょう。',

  // ── Food & Drink category (new entries) ──────────────────────────────
  'Korean Food & Drink': '韓国料理と飲み物',
  'Water — the most essential drink; 물 주세요 = water, please': '水 — 最も基本的な飲み物；물 주세요＝お水をください',
  'Coffee — Korea has a massive café culture; 커피 한 잔 = one cup of coffee': 'コーヒー — 韓国には巨大なカフェ文化がある；커피 한 잔＝コーヒー一杯',
  "Soju — Korea's most popular distilled spirit, often shared at meals": '焼酎 — 韓国で最も人気の高い蒸留酒、食事によく一緒に飲まれる',
  'What does 잘 먹겠습니다 mean?': '잘 먹겠습니다はどういう意味ですか？',
  'This is delicious!': 'これはおいしい！',
  'Please give me food.': '食べ物をください。',
  'I will eat well — said before a meal': 'いただきます — 食事前に言う',
  "I'm full, thank you.": 'お腹がいっぱいです、ありがとうございます。',
  'Beer — commonly enjoyed with Korean fried chicken (치맥)': 'ビール — 韓国のフライドチキンと一緒によく楽しまれる（치맥）',
  'Food & Drink Complete!': '食べ物・飲み物完成！',
  "Excellent! You've learned key Korean food and drink vocabulary. Next time you're at a Korean restaurant, try ordering with these words — 주세요 after any item means 'please give me one.'": "素晴らしい！韓国料理と飲み物の重要語彙を学びました。次に韓国料理店を訪れる際は、これらの語彙で注文してみましょう — 品物の後に주세요を付けると「一つください」の意味になります。",

  // ── Colors category (new entries) ────────────────────────────────────
  'Colors in Korean': '韓国語の色',
  "Korean color words typically end in 색 (saek), meaning 'color.' For example: 빨간색 = red color. In everyday speech, 색 is often dropped and the color word becomes an adjective directly: 빨간 가방 (red bag). Some colors have poetic native Korean forms alongside the Sino-Korean -색 compounds.": "韓国語の色彩語は通常、「色」を意味する색（saek）で終わります。例：빨간색＝赤い色。日常会話では색が省かれ、直接形容詞として使われます：빨간 가방（赤いバッグ）。一部の色には漢字語の-색複合語と並んで詩的な固有語形があります。",
  'White · white snow': '白 · 白い雪',
  'Black · a black cat': '黒 · 黒い猫',
  'Pink · pink flowers': 'ピンク · ピンクの花',
  'Purple · purple grapes': '紫 · 紫のブドウ',
  'Orange · orange carrots': 'オレンジ · オレンジ色のニンジン',
  'Brown · a brown bear': '茶色 · 茶色い熊',
  'Colors Complete!': '色完成！',
  "Colorful work! You can now describe the colors of things around you in Korean. Try looking at objects nearby and naming their color with 이에요/예요: 파란색이에요 (It's blue).": 'カラフルな学習でした！韓国語で周りのものの色を描写できるようになりました。近くの物を見て색이에요/예요で色を言ってみましょう：파란색이에요（青いです）。',

  // ── Days & Time category ──────────────────────────────────────────────
  'Days & Time in Korean': '韓国語の日付と時間',
  'Korean days of the week are based on the five classical elements plus the sun and moon: 월 (moon/Monday), 화 (fire/Tuesday), 수 (water/Wednesday), 목 (wood/Thursday), 금 (gold/Friday), 토 (earth/Saturday), 일 (sun/Sunday). Each day ends with 요일 (yoil).': '韓国語の曜日は五行と太陽・月に基づいています：월（月）、화（火）、수（水）、목（木）、금（金）、토（土）、일（日）。それぞれ요일（曜日）で終わります。',
  'Time expressions': '時間表現',
  '오늘 (today), 내일 (tomorrow), 어제 (yesterday) are the three most useful time words. Add 아침/점심/저녁 (morning/lunch/evening) to specify when: 내일 저녁 = tomorrow evening.': '오늘（今日）、내일（明日）、어제（昨日）の3つが最も便利な時間語です。아침/점심/저녁（朝/昼/夜）を加えて時間帯を指定：내일 저녁＝明日の夜。',
  'Monday · I go to school on Monday': '月曜日 · 月曜日に学校に行きます',
  'Tuesday · Tuesday is busy': '火曜日 · 火曜日は忙しいです',
  "Wednesday · Let's meet on Wednesday": '水曜日 · 水曜日に会いましょう',
  'Thursday · Thursday evening': '木曜日 · 木曜日の夜',
  "Friday · It's 'fire Friday' (불금 = exciting Friday night)": '金曜日 · 「불금」（燃える金曜日＝わくわくする金曜の夜）',
  'Saturday · I rest on Saturday': '土曜日 · 土曜日は休みます',
  'Sunday · Sunday is family day': '日曜日 · 日曜日は家族の日',
  'Today — 오늘 뭐 해요? = What are you doing today?': '今日 — 오늘 뭐 해요？＝今日は何をしますか？',
  'Tomorrow — 내일 봐요 = See you tomorrow': '明日 — 내일 봐요＝また明日',
  'Yesterday — 어제 뭐 했어요? = What did you do yesterday?': '昨日 — 어제 뭐 했어요？＝昨日は何をしましたか？',
  '금요일 (geumyoil) means which day?': '금요일（geumyoil）は何曜日ですか？',
  'Thursday': '木曜日',
  'Friday': '金曜日',
  'Saturday': '土曜日',
  'Wednesday': '水曜日',
  'Days & Time Complete!': '日付・時間完成！',
  "You can now talk about days and time in Korean. Try making plans with 요일에 (on [day]) — 토요일에 뭐 해요? (What are you doing on Saturday?) is a great conversation starter!": '韓国語で曜日と時間を話せるようになりました。요일에（〜曜日に）を使って予定を立ててみましょう — 토요일에 뭐 해요？（土曜日は何をしますか？）は素晴らしい会話の糸口です！',

  // ── Places category (new entries) ────────────────────────────────────
  'Pharmacy / Drugstore · Where is the pharmacy?': '薬局 · 薬局はどこですか？',
  'Bank · I exchange money at the bank': '銀行 · 銀行で両替します',
  'Restaurant · This restaurant is delicious': 'レストラン · このレストランはおいしいです',
  'Café · I study at the café': 'カフェ · カフェで勉強します',
  "Karaoke room · Let's go to noraebang together!": 'カラオケ室 · 一緒にノレバンに行きましょう！',
  'Department store · I shop at the department store': 'デパート · デパートでショッピングします',
  'Places Complete!': '場所完成！',
  "You can now navigate Korean cities with confidence! Practice by asking 어디예요? (Where is it?) followed by any place you learned. Locals will be impressed.": '韓国の都市を自信を持って移動できるようになりました！어디예요？（どこですか？）の後に学んだ場所を続けて練習しましょう。地元の人々は感心するでしょう。',

  // ── Emotions category ─────────────────────────────────────────────────
  'Expressing Emotions in Korean': '韓国語での感情表現',
  "Korean emotion words often function as verbs and adjectives together — they conjugate like verbs but describe states like adjectives. For example, 행복하다 (to be happy) → 행복해요 (I'm happy). This makes emotions easy to express once you learn the pattern.": '韓国語の感情語は動詞と形容詞の両方として機能することが多く、動詞のように活用しながら形容詞のように状態を表します。例：행복하다（幸せだ）→ 행복해요（幸せです）。パターンを覚えれば感情を簡単に表現できます。',
  'Emotional vocabulary unlocks connection': '感情語彙が繋がりを生む',
  "Knowing how to say 설레요 (I feel excited/fluttery) or 그리워요 (I miss you/it) impresses native speakers because these are deeply Korean emotional concepts without direct English equivalents.": '설레요（ドキドキします）や그리워요（恋しいです）の言い方を知っていると、ネイティブスピーカーは感心します。これらは英語に直訳できない、深く韓国的な感情概念です。',
  "Happy · I'm really happy": '幸せ · 本当に幸せです',
  'Sad · Why are you sad?': '悲しい · なぜ悲しんでいるのですか？',
  'Angry · I got angry': '怒った · 怒りました',
  'Scared / Scary · Ghosts are scary': '怖い · 幽霊は怖いです',
  "Tired · I'm very tired today": '疲れた · 今日はとても疲れました',
  "Joyful / Glad · I'm glad I passed": '嬉しい · 合格できて嬉しいです',
  "To worry · Don't worry": '心配する · 心配しないでください',
  'Surprised · I was so surprised': '驚いた · とても驚きました',
  "Lonely · I'm lonely because I'm alone": '寂しい · 一人なので寂しいです',
  "Fluttery excitement · I'm excited about tomorrow (uniquely Korean feeling)": 'ドキドキした高揚感 · 明日が楽しみでドキドキしています（韓国独自の感情）',
  'Which word best expresses the feeling of nervous excitement or fluttering anticipation?': 'ドキドキした期待感や高揚感を最もよく表す語はどれですか？',
  '슬프다 (sad)': '슬프다（悲しい）',
  '설레다 (flutter/excited)': '설레다（ドキドキ・期待）',
  '무섭다 (scared)': '무섭다（怖い）',
  '피곤하다 (tired)': '피곤하다（疲れた）',
  'Emotions Complete!': '感情完成！',
  "You can now express your feelings in Korean! Remember that Koreans deeply value emotional communication — sharing how you feel using these words will create real connection.": '韓国語で気持ちを表現できるようになりました！韓国人は感情的なコミュニケーションを深く大切にします — これらの語を使って気持ちを伝えることで、本当の繋がりが生まれます。',

  // ── Travel category (new entries) ────────────────────────────────────
  "Whether you're booking a trip to Korea or navigating an airport, these travel words are essential. Korean airports and transit systems display signs in Korean and English, but knowing the Korean terms helps you ask questions confidently and connect with locals.": '韓国への旅行予約から空港のナビゲートまで、これらの旅行語彙は必須です。韓国の空港や交通機関の案内板は韓国語と英語で表示されていますが、韓国語の用語を知っていれば自信を持って質問でき、地元の人々と繋がれます。',
  'Airport · I arrived at the airport': '空港 · 空港に到着しました',
  'Airplane · I bought a plane ticket': '飛行機 · 飛行機のチケットを買いました',
  "Train · I take the KTX (Korea's bullet train)": '電車 · KTX（韓国の新幹線）に乗ります',
  'Currency exchange · Where can I exchange currency?': '両替 · どこで両替できますか？',
  'Luggage / Baggage · Where is the baggage claim?': '荷物 / 手荷物 · 手荷物受取所はどこですか？',
  'Travel Complete!': '旅行完成！',
  "You're ready to travel Korea! These travel words will help you at airports, train stations, and hotels. Remember: 도와주세요 (help me please) is the phrase to know in any emergency.": '韓国旅行の準備が整いました！これらの旅行語彙は空港・駅・ホテルで役立ちます。緊急時には도와주세요（助けてください）を覚えておきましょう。',

  // ── Shopping category ─────────────────────────────────────────────────
  'Shopping in Korean': '韓国語のショッピング',
  "Korea is a shopper's paradise — from sprawling markets like Namdaemun to high-end department stores. Knowing shopping phrases helps you bargain at markets, ask for discounts, and handle transactions confidently.": '韓国はショッパーの楽園です — 南大門のような広大な市場から高級デパートまで。ショッピングフレーズを知っていれば、市場での値引き交渉や割引の要求、支払いを自信を持って対応できます。',
  'Magic phrase': '魔法のフレーズ',
  "이거 얼마예요? (How much is this?) + 깎아 주세요 (Please give me a discount) will take you far at any Korean traditional market (전통시장). Most vendors appreciate customers who speak a little Korean.": 'いくらですか？と깎아 주세요（割引してください）の組み合わせで、どんな韓国の伝統市場（전통시장）でも重宝します。ほとんどの売り手は少し韓国語を話せるお客さんを喜びます。',
  'Shop / Store · Where is the store?': '店 · お店はどこですか？',
  "Market · I'm going to the traditional market": '市場 · 伝統市場に行きます',
  'Price · The price is expensive': '値段 · 値段が高いです',
  'Discount · Is there a discount?': '割引 · 割引はありますか？',
  'Receipt · Please give me a receipt': 'レシート · レシートをください',
  "Cash · I'll pay in cash": '現金 · 現金で払います',
  'Card (credit/debit) · Can I pay by card?': 'カード（クレジット/デビット）· カードで払えますか？',
  'Exchange / Return · Can I exchange this?': '交換 / 返品 · これを交換できますか？',
  'Please give me a discount — the essential bargaining phrase': '割引してください — 必須の値引き交渉フレーズ',
  'Please give me this — the most useful shopping phrase': 'これをください — 最も便利なショッピングフレーズ',
  'You want to ask if you can pay by credit card. What do you say?': 'クレジットカードで払えるか聞きたいとき、何と言いますか？',
  'Shopping Complete!': 'ショッピング完成！',
  "You can now shop in Korean! Armed with 얼마예요? and 깎아 주세요, you'll navigate any Korean market like a pro. Dongdaemun and Namdaemun await!": '韓国語でショッピングができるようになりました！얼마예요？と깎아 주세요を武器に、どんな韓国の市場もプロのように歩き回れます。東大門と南大門が待っています！',

  // ── Weather category ──────────────────────────────────────────────────
  'Korean Weather Vocabulary': '韓国語の天気語彙',
  'Korea experiences four distinct seasons, making weather a common conversation topic. Spring brings cherry blossoms, summer is hot and humid with monsoon rains, autumn is crisp and colorful, and winter can be bitterly cold. Knowing weather words helps you plan activities and chat naturally with Koreans.': '韓国は四季がはっきりしており、天気は日常的な会話の話題です。春は桜、夏は暑くて湿気が多く梅雨があり、秋は爽やかで色鮮やか、冬は厳しい寒さになることがあります。天気の語彙を知ることで、活動の計画を立てたり韓国人と自然に会話したりできます。',
  'Start any conversation': '会話の糸口に',
  "오늘 날씨 어때요? (What's the weather like today?) is a perfect conversation opener in Korean, just like in English. It naturally leads into plans: 날씨 좋으면 같이 산책해요! (If the weather's nice, let's take a walk!)": 'オヌル・ナルシ・オテヨ？（今日の天気はどうですか？）は英語と同様、韓国語でも完璧な会話の糸口です。自然に予定へと繋がります：날씨 좋으면 같이 산책해요！（天気が良ければ一緒に散歩しましょう！）',
  "Weather · What's the weather like today?": '天気 · 今日の天気はどうですか？',
  'Clear / Sunny · It\'s clear today': '晴れ · 今日は晴れています',
  'Cloudy / Overcast · The sky is cloudy': '曇り · 空が曇っています',
  "Rain — 비가 와요 = It's raining · 비가 많이 와요 = It's raining a lot": '雨 — 비가 와요＝雨が降っています · 비가 많이 와요＝雨がたくさん降っています',
  "Snow — 눈이 와요 = It's snowing (note: 눈 also means 'eyes'!)": "雪 — 눈이 와요＝雪が降っています（注：눈は「目」も意味します！）",
  "Wind · It's very windy": '風 · とても風が強いです',
  "Hot · It's too hot today": '暑い · 今日はとても暑いです',
  "Cold · It's very cold in winter": '寒い · 冬はとても寒いです',
  'Warm · Spring weather is warm': '暖かい · 春の天気は暖かいです',
  'Cool / Refreshing · Autumn is refreshing': '涼しい / 爽やか · 秋は爽やかです',
  "It's raining heavily. Which sentence do you use?": '大雨が降っています。どの文を使いますか？',
  'Weather Complete!': '天気完成！',
  "Perfect! You can now talk about Korean weather. Korea's four seasons give you plenty to discuss — from spring cherry blossoms (벚꽃) to winter snowfall. Try describing today's weather!": '完璧！韓国の天気について話せるようになりました。韓国の四季は話題が尽きません — 春の桜（벚꽃）から冬の降雪まで。今日の天気を描写してみましょう！',

  // ── Verbs category (new entries) ─────────────────────────────────────
  'To come · My friend is coming': '来る · 友人が来ます',
  'To drink · (I) drink water': '飲む · 水を飲みます',
  "To sleep · (I) sleep early": '寝る · 早く寝ます',
  'To work · (I) work at a company': '働く · 会社で働きます',
  'To see / watch · (I) watch dramas': '見る / 観る · ドラマを観ます',
  'To listen · (I) listen to music': '聴く · 音楽を聴きます',
  'Verbs Complete!': '動詞完成！',
  'Great work! Korean verbs are powerful — once you know the dictionary form (다), you can conjugate for any situation. Keep practicing by narrating what you do each day in Korean.': 'よくできました！韓国語の動詞は強力です — 辞書形（다）を知れば、どんな状況でも活用できます。毎日していることを韓国語で実況しながら練習を続けましょう。',

  // ── Adjectives category (new entries) ────────────────────────────────
  "Bad · It's a bad habit": '悪い · 悪い習慣です',
  'Small · This room is too small': '小さい · この部屋は小さすぎます',
  'Easy · This is easier': '簡単 · これの方が簡単です',
  'Difficult / Hard · Chinese characters are difficult': '難しい · 漢字は難しいです',
  'Fast · The KTX is fast': '速い · KTXは速いです',
  'Slow · A turtle is slow': '遅い · カメは遅いです',
  'Adjectives Complete!': '形容詞完成！',
  "Excellent! Korean adjectives conjugate just like verbs, so you've essentially doubled your verb knowledge. Describe the world around you: 맛있어요, 재미있어요, 좋아요!": '素晴らしい！韓国語の形容詞は動詞と全く同じように活用するので、実質的に動詞の知識が倍になりました。周りの世界を描写しましょう：맛있어요、재미있어요、좋아요！',

  // ── Workplace category ────────────────────────────────────────────────
  'Workplace Korean': '職場の韓国語',
  "Korea's business culture (빨리빨리 culture — 'hurry hurry') values efficiency and hierarchy. In the workplace, formal language (존댓말) is always used with superiors and clients. Titles are used instead of names: 김 과장님 (Manager Kim) rather than 김철수씨.": '韓国のビジネス文化（빨리빨리文化 — 「早く早く」）は効率と階層を重視します。職場では上司やクライアントには常に丁寧語（존댓말）を使います。名前の代わりに役職で呼びます：김철수씨ではなく김 과장님（金課長）。',
  'Key workplace culture': '職場文化のポイント',
  "회식 (hoesik) — mandatory team dinner/drinks — is a core Korean workplace tradition. Understanding phrases like 오늘 회식 있어요 (There's a team dinner today) and 먼저 가세요 (Please go ahead) helps you navigate office social dynamics.": '회식（フェシク）— 義務的なチームディナー/飲み会 — は韓国職場文化の核心です。오늘 회식 있어요（今日は회식があります）や먼저 가세요（お先にどうぞ）などのフレーズを理解すると、職場の社交的な場面をうまく乗り切れます。',
  'Company / Office · I work at a company': '会社 · 会社に勤めています',
  'Employee · How many employees are there?': '従業員 · 従業員は何人いますか？',
  'CEO / Boss (honorific) · I report to the boss': '社長 / 上司（敬称）· 上司に報告します',
  'Meeting · Currently in a meeting': '会議 · 現在会議中です',
  'Work tasks / Duties · I have a lot of work today': '業務 · 今日は仕事が多いです',
  'Report · I submitted the report': 'レポート · レポートを提出しました',
  'Colleague · My colleagues are kind': '同僚 · 同僚たちは親切です',
  'Going to work / Clocking in · What time do you start work today?': '出勤 · 今日は何時から仕事ですか？',
  'Leaving work / Clocking out · What do you do after work?': '退勤 · 仕事の後は何をしますか？',
  "Work dinner / Team outing · There's a team dinner today": '飲み会 / チームの集まり · 今日は会食があります',
  'The boss is leaving the office and you want to say goodbye respectfully. What do you say?': '上司が帰るとき、丁寧にお見送りしたい場合、何と言いますか？',
  '먼저 가세요 (Please go ahead / Goodbye)': '먼저 가세요（お先にどうぞ）',
  "퇴근해요 (I'm leaving work)": '퇴근해요（退勤します）',
  "회식 가요 (Let's go to dinner)": '회식 가요（会食に行きましょう）',
  "보고서 드려요 (Here's the report)": '보고서 드려요（レポートをどうぞ）',
  'Workplace Complete!': '職場完成！',
  "You're ready for Korean office life! Remember that formal language (존댓말) and using job titles are key. Saying 수고하셨습니다 (You've worked hard — goodbye) at the end of the day shows real cultural fluency.": '韓国の職場生活に備えました！丁寧語（존댓말）と役職名の使用が鍵です。一日の終わりに수고하셨습니다（お疲れ様でした）と言うと、本物の文化的流暢さが伝わります。',

  // ── Health & Medicine category ────────────────────────────────────────
  'Health & Medicine in Korean': '韓国語の健康・医学',
  'Korea has an excellent healthcare system with affordable clinics. When visiting a clinic (의원) or hospital (병원), doctors typically speak some English in cities, but knowing key symptoms in Korean ensures accurate communication. Always say 여기가 아파요 (It hurts here) and point to the affected area.': '韓国は手頃な価格のクリニックを備えた優れた医療制度を持っています。クリニック（의원）や病院（병원）を受診する際、都市部では医師は通常少し英語を話しますが、主な症状を韓国語で知っていれば正確に伝えられます。常に여기가 아파요（ここが痛いです）と言って患部を指さしましょう。',
  'At the clinic': '病院で',
  '아프다 (to be sick/hurt) is the core word. Combine it with body parts: 머리가 아파요 (headache), 배가 아파요 (stomachache). For serious pain: 너무 아파요 (It hurts a lot). 구급차 (ambulance) and 응급실 (emergency room) are critical emergency words.': '아프다（痛い/具合が悪い）が核心の語です。体の部位と組み合わせます：머리가 아파요（頭痛）、배가 아파요（腹痛）。重症の痛みには：너무 아파요（とても痛いです）。구급차（救急車）と응급실（救急室）は重要な緊急語彙です。',
  'To hurt / Be sick · My stomach hurts': '痛い / 具合が悪い · お腹が痛いです',
  'Doctor · Where is the doctor?': '医師 · 医師はどこにいますか？',
  'Nurse · Please call the nurse': '看護師 · 看護師を呼んでください',
  'Medicine / Medication · I need to take medicine': '薬 · 薬を飲まなければなりません',
  'Headache · I have a severe headache': '頭痛 · ひどい頭痛がします',
  'Fever · I have a fever': '熱 · 熱があります',
  "Cough · My cough won't stop": '咳 · 咳が止まりません',
  'Ambulance · Please call an ambulance!': '救急車 · 救急車を呼んでください！',
  'Emergency room · Where is the emergency room?': '救急室 · 救急室はどこですか？',
  'Allergy · I have an allergy': 'アレルギー · アレルギーがあります',
  'You need to call for emergency help. Which word do you shout?': '緊急の助けを呼ぶ必要があります。どの語を叫びますか？',
  '약 (medicine)': '약（薬）',
  '의사 (doctor)': '의사（医師）',
  '구급차 (ambulance)': '구급차（救急車）',
  '기침 (cough)': '기침（咳）',
  'Health Complete!': '健康完成！',
  "Excellent! Health vocabulary could be the most important set you learn — knowing 구급차 (ambulance) and 응급실 (emergency room) could make a real difference in a crisis. Stay safe and healthy!": '素晴らしい！健康語彙は最も重要な語彙かもしれません — 구급차（救急車）と응급실（救急室）を知っていることが、緊急時に本当の違いをもたらすことがあります。安全に、健康に！',

  // ── Media & K-Culture category ────────────────────────────────────────
  'Hallyu (한류 — Korean Wave) has taken the world by storm. K-dramas, K-pop, K-movies, and Korean webtoons have built a global fanbase. This vocabulary unlocks your ability to discuss Korean entertainment culture and connect with fellow fans worldwide.': 'ハルリュ（한류 — 韓流）は世界を席巻しました。韓国ドラマ・K-POP・韓国映画・韓国ウェブトゥーンは世界的なファン層を築きました。この語彙で韓国のエンターテインメント文化について語り合い、世界中のファンと繋がれます。',
  'The Korean Wave': '韓流',
  "한류 (Hallyu) literally means 'Korean Wave.' It started in the late 1990s when Korean dramas became popular across Asia, then went global with PSY's Gangnam Style in 2012 and BTS thereafter. K-dramas on Netflix now reach 190+ countries.": "한류（ハルリュ）は文字通り「韓流」を意味します。1990年代後半に韓国ドラマがアジア全体で人気を博したことに始まり、2012年のPSYの江南スタイルとその後のBTSで世界へ広まりました。NetflixのK-ドラマは現在190以上の国に届いています。",
  'Drama (TV series) · I want to watch a drama': 'ドラマ（TVシリーズ）· ドラマを見たいです',
  "Movie / Film · I'm going to the cinema": '映画 · 映画館に行きます',
  'Music · I like Korean music': '音楽 · 韓国音楽が好きです',
  'Singer / Artist · This is my favorite singer': '歌手 · これは私のお気に入りの歌手です',
  'Actor / Actress · That actor is so handsome': '俳優 · あの俳優はとてもかっこいいです',
  'K-pop idol · K-pop idol group member': 'K-POPアイドル · K-POPアイドルグループのメンバー',
  'Korean Wave (Hallyu) · The Korean Wave has spread worldwide': '韓流（ハルリュ）· 韓流が世界中に広まりました',
  'Webtoon · Korean webtoons are fun — many K-dramas are based on webtoons': 'ウェブトゥーン · 韓国のウェブトゥーンは楽しい — 多くのK-ドラマはウェブトゥーンが原作',
  "Fandom · BTS's fandom is called ARMY": 'ファンダム · BTSのファンダムはARMYと呼ばれる',
  'Original Soundtrack · The OST of this drama is so good': 'オリジナルサウンドトラック · このドラマのOSTがとても良いです',
  'What is 한류 (hallyu)?': '한류（ハルリュ）とは何ですか？',
  'A Korean music genre': '韓国の音楽ジャンル',
  'The Korean Wave — global spread of Korean culture': '韓流 — 韓国文化の世界的な広がり',
  'A type of Korean drama': '韓国ドラマの一種',
  'A Korean streaming platform': '韓国のストリーミングプラットフォーム',
  'Media & K-Culture Complete!': 'メディア・韓流完成！',
  "You're officially part of the 한류 (Hallyu) community! These words will help you join conversations with fans worldwide and understand Korean entertainment more deeply. 화이팅!": '한류（韓流）コミュニティの正式メンバーになりました！これらの語彙で世界中のファンとの会話に参加し、韓国のエンターテインメントをより深く理解できます。화이팅！',

  // ── Proverbs & Idioms category ────────────────────────────────────────
  'Korean Proverbs & Idioms': '韓国のことわざ・慣用句',
  'Korean proverbs (속담, sokdam) contain centuries of wisdom and cultural values. Learning them gives you insight into Korean thinking — about perseverance, relationships, and humility. Using even one proverb correctly impresses native speakers enormously.': '韓国のことわざ（속담、ソクタム）には何世紀にもわたる知恵と文化的価値観が詰まっています。これらを学ぶことで韓国人の思考 — 忍耐・人間関係・謙虚さ — への洞察が深まります。ことわざを一つでも正しく使うと、ネイティブスピーカーに大きな印象を与えます。',
  'Why learn proverbs?': 'なぜことわざを学ぶのか？',
  "Literal meaning: 'For words going out to be beautiful, words coming back must be beautiful.' English equivalent: 'Treat others as you want to be treated.' This is one of the most commonly used Korean proverbs about kindness and respect in conversation.": "直訳：「出る言葉が美しければ、返ってくる言葉も美しい。」英語の等価：「自分がされたいように人に接しなさい。」これは会話での親切さと敬意についての、最もよく使われる韓国のことわざの一つです。",
  'When to use it': '使い方',
  "Use this proverb when someone complains about being treated rudely: 가는 말이 고와야 오는 말이 곱잖아요 — meaning 'you get what you give in conversation.'": "このことわざは、誰かが無礼な扱いを受けたと不満を言うときに使います：가는 말이 고와야 오는 말이 곱잖아요 — 「会話では与えたものが返ってくる」という意味。",
  "Literal meaning: 'At the end of hardship, joy comes.' English equivalent: 'No pain, no gain' / 'After the storm comes the calm.' This proverb is used to encourage someone going through a difficult time — hardship is temporary, and reward follows perseverance.": "直訳：「苦労の末に楽しみが来る。」英語の等価：「苦あれば楽あり」。このことわざは困難な時期にある人を励ますために使います — 苦労は一時的で、忍耐の後には報酬が続きます。",
  'Encouragement': '励まし',
  'Koreans say this to students before exams, workers during tough projects, or anyone facing difficulty. It reflects the Korean cultural value of endurance (인내). A short form: 고진감래 (苦盡甘來) — the Sino-Korean version.': '韓国人は試験前の学生、困難なプロジェクト中の社員、困難に直面している人に対してこれを言います。忍耐（인내）という韓国文化の価値観を反映しています。短縮形：고진감래（苦盡甘來）— 漢韓国語バージョン。',
  "Literal meaning: 'Habits formed at age three last until eighty.' English equivalent: 'You can't teach an old dog new tricks' / 'Old habits die hard.' This proverb warns about the importance of good habits formed in childhood.": "直訳：「3歳で身についた習慣は80歳まで続く。」英語の等価：「三つ子の魂百まで」。このことわざは幼少期に形成された良い習慣の重要性について警告しています。",
  'Parenting & education': '子育て・教育',
  "Often said by parents or teachers to children. It emphasizes that character and habits formed early in life are extremely persistent. The number 여든 (80) symbolizes 'a very long time' in Korean culture.": '親や教師が子供によく言います。幼少期に形成された性格や習慣が非常に持続的であることを強調します。여든（80）という数字は韓国文化で「非常に長い時間」を象徴します。',
  "Literal meaning: 'It's dark under the lamp.' English equivalent: 'The darkest place is under the candlestick' / 'You can't see what's right in front of you.' Used when someone misses something obvious that's close to them.": "直訳：「ランプの下は暗い。」英語の等価：「灯台下暗し」。何か明らかなことを見落としたときに使います。",
  'Used for irony': '皮肉として使う',
  'This proverb is used humorously when someone searches everywhere for something only to find it right in front of them, or misses an obvious answer in a conversation.': 'このことわざは、どこを探しても見つからなかったものが目の前にあったり、会話の中で明らかな答えを見落とすときにユーモラスに使います。',
  "Literal meaning: 'Eyes are high.' Idiomatic meaning: 'To have high standards' — especially used about romantic preferences or taste in general. Someone who only likes very attractive or high-quality things is said to have 눈이 높다.": "直訳：「目が高い。」慣用的意味：「目が高い / 基準が高い」— 特に恋愛の好みや全般的な趣味について使われます。非常に魅力的または高品質なものだけを好む人は눈이 높다と言われます。",
  'Dating culture': '恋愛文化',
  "This idiom appears frequently in K-dramas when a character is too picky about romantic partners. 눈을 낮춰요 (Lower your standards!) is the common response.": 'この慣用表現は、キャラクターが恋愛相手に対して選り好みしすぎているK-ドラマでよく登場します。눈을 낮춰요（目を下げて！基準を下げて！）が一般的な返し言葉です。',
  "Literal meaning: 'Feet are wide.' Idiomatic meaning: 'To have a wide social network / to know a lot of people.' The opposite, 발이 좁다 (narrow feet), means you don't know many people. Wide feet = you've walked many places and met many people.": "直訳：「足が広い。」慣用的意味：「人脈が広い / 多くの人を知っている。」反対語の발이 좁다（狭い足）は人脈が狭いことを意味します。広い足 ＝ 多くの場所を歩き多くの人と出会ってきた。",
  'Networking culture': 'ネットワーキング文化',
  'In Korean business culture, 발이 넓다 is a compliment. Networking (인맥) is highly valued, and people with wide connections can open many doors.': '韓国のビジネス文化では、발이 넓다は褒め言葉です。人脈（인맥）は非常に重視され、広いコネクションを持つ人は多くの扉を開けることができます。',
  "Literal meaning: 'The navel is bigger than the belly.' English equivalent: 'The tail wags the dog.' Used when secondary costs, efforts, or side effects are bigger than the main thing itself.": "直訳：「へそがお腹より大きい。」英語の等価：「本末転倒」。副次的なコスト・努力・副作用が主体そのものより大きいときに使います。",
  'When to use': '使い方',
  'Used when service fees are higher than the item purchased, or when the preparation for an event takes more time than the event itself: 준비하는 게 배보다 배꼽이 더 크네요 (The preparation is bigger than the actual event).': 'サービス手数料が購入品より高い場合や、イベントの準備がイベント自体より時間がかかる場合に使います：준비하는 게 배보다 배꼽이 더 크네요（準備がイベント本体より大きいですね）。',
  '고생 끝에 낙이 온다 means...': '고생 끝에 낙이 온다の意味は...',
  'Good words bring good words back': '良い言葉が良い言葉を呼ぶ',
  'Habits from childhood last a lifetime': '幼少期の習慣は一生続く',
  'After hardship, joy comes': '苦労の後に喜びが来る',
  'The navel is bigger than the belly': 'へそがお腹より大きい',
  "눈이 높다 literally means 'eyes are high' but idiomatically means...": '눈이 높다は文字通り「目が高い」を意味しますが、慣用的には...',
  'Being physically tall': '背が高い',
  'Having high standards / being picky': '基準が高い / 選り好みする',
  'Feeling proud': '誇りを感じる',
  'Watching carefully': '注意深く見る',
  'Proverbs Complete!': 'ことわざ完成！',
  "Impressive! Korean proverbs are windows into the culture's soul — perseverance, relationships, and wisdom. Try using one in conversation: even a single proverb earns deep respect from Korean speakers.": '素晴らしい！韓国のことわざは文化の魂への窓 — 忍耐・人間関係・知恵。会話でひとつ使ってみましょう：一つのことわざでも、韓国語話者から深い敬意を得られます。',

  // ── Academic Korean category ──────────────────────────────────────────
  "Korea places enormous emphasis on education (교육열 — literally 'education fever'). Academic vocabulary is essential whether you're studying at a Korean university, taking a TOPIK exam, or reading academic materials. The education system is highly competitive, with 대학교 (university) entrance being a major life milestone.": "韓国は教育（교육열 — 文字通り「教育熱」）を非常に重視しています。韓国の大学への進学は人生の主要なマイルストーンであり、TOPIK試験の受験や学術資料の読解においても、学術語彙は不可欠です。",
  'TOPIK & University': 'TOPIK・大学',
  'TOPIK (Test of Proficiency in Korean) is the official Korean language exam used worldwide for university admission and job applications. Academic vocabulary appears heavily in TOPIK Level 3+. Learning these words boosts your reading comprehension significantly.': 'TOPIK（韓国語能力試験）は、大学入学や就職応募のために世界中で使用される公式の韓国語試験です。学術語彙はTOPIKレベル3+に多く登場します。これらの語を学ぶと読解力が大幅に向上します。',
  'University · I attend Seoul National University': '大学 · ソウル国立大学に通っています',
  'Professor · I have a question for the professor': '教授 · 教授に質問があります',
  'Lecture · The lecture is interesting': '講義 · 講義が面白いです',
  'Assignment · When is the assignment deadline?': '課題 · 課題の締め切りはいつですか？',
  'Exam / Test · Did you do well on the exam?': '試験 · 試験はうまくいきましたか？',
  'Score / Grade · The score came out well': '点数 / 成績 · 点数が良かったです',
  'Graduation · Congratulations on your graduation!': '卒業 · ご卒業おめでとうございます！',
  'Scholarship · I received a scholarship': '奨学金 · 奨学金をいただきました',
  'Library · I study at the library': '図書館 · 図書館で勉強します',
  'Research · What is your research topic?': '研究 · あなたの研究テーマは何ですか？',
  'You received money to help pay for your studies. What do you call it?': '学費の助けとしてお金を受け取りました。それを何と呼びますか？',
  '과제 (gwaje)': '과제（課題）',
  '점수 (jeomssu)': '점수（点数）',
  '장학금 (janghaggeum)': '장학금（奨学金）',
  '강의 (gangi)': '강의（講義）',
  'Academic Korean Complete!': '学術韓国語完成！',
  'Excellent work! Academic Korean opens doors to Korean universities, TOPIK certification, and intellectual conversations. 열심히 공부하세요! (Study hard!)': '素晴らしい！学術韓国語は韓国の大学・TOPIK認定・知的な会話への扉を開きます。열심히 공부하세요！（一生懸命勉強してください！）',

  // ── News & Society category ───────────────────────────────────────────
  "Politics · It's a politics news story": '政治 · 政治ニュースです',
  'Economy · The economy is difficult': '経済 · 経済が難しいです',
  "Society · It's a social issue": '社会 · 社会問題です',
  "Culture · I'm learning Korean culture": '文化 · 韓国文化を学んでいます',
  'Environment · Environmental protection is important': '環境 · 環境保護は重要です',
  "Election · There's a presidential election": '選挙 · 大統領選挙があります',
  'Government · The government policy changed': '政府 · 政府の政策が変わりました',
  'Law · We must follow the law': '法律 · 法律を守らなければなりません',
  "Citizen · It's a citizen's right": '市民 · 市民の権利です',
  "Which word means 'election'?": '「選挙」を意味する語はどれですか？',
  '정치 (politics)': '정치（政治）',
  '정부 (government)': '정부（政府）',
  '선거 (election)': '선거（選挙）',
  '법 (law)': '법（法律）',

  // ── Konglish category ─────────────────────────────────────────────────
  'Konglish — Korean + English': 'コングリッシュ — 韓国語＋英語',
  "Konglish (콩글리시) refers to English loanwords adapted into Korean pronunciation and sometimes with shifted meanings. Korea has adopted thousands of English words, making them sound Korean. The trick: if you know the English word, you can often guess the Korean by applying Korean pronunciation patterns — just replace 'r' with 'ㄹ', add vowels between consonants, and end with a vowel.": 'コングリッシュ（콩글리시）は韓国語の発音に適応した英語の外来語を指し、意味が変化することもあります。韓国は何千もの英語を採用し、韓国語らしく聞こえるようにしています。コツ：英語の単語を知っていれば、韓国語の発音パターンを適用することで推測できます — 「r」を「ㄹ」に、子音間に母音を追加し、最後に母音で終わらせます。',
  'Pronunciation key': '発音のポイント',
  "English 'f' → ㅍ (p sound): file → 파일. English 'v' → ㅂ (b sound): video → 비디오. Final consonant clusters get a vowel: desk → 데스크, style → 스타일. Once you know the pattern, hundreds of words unlock instantly!": '英語の「f」→ ㅍ（pの音）：file → 파일。英語の「v」→ ㅂ（bの音）：video → 비디오。語末の子音連続には母音が入る：desk → 데스크、style → 스타일。パターンを覚えれば、数百の語が一気に解読できます！',
  'Computer · I use a computer': 'コンピューター · コンピューターを使います',
  "Smartphone · I can't live without my smartphone": 'スマートフォン · スマートフォンなしでは生きられません',
  'Internet · The internet is fast': 'インターネット · インターネットが速いです',
  'Sofa · I sit on the sofa': 'ソファ · ソファに座ります',
  'Apartment · There are many apartments in Seoul': 'アパート · ソウルにはアパートが多いです',
  'Pizza · Shall we order pizza?': 'ピザ · ピザを注文しましょうか？',
  'Chocolate · On White Day, you give chocolate': 'チョコレート · ホワイトデーにチョコレートを贈ります',
  'Ice cream · Do you want to eat ice cream?': 'アイスクリーム · アイスクリームを食べますか？',
  "Stress · I'm stressed (lit. receiving stress)": 'ストレス · ストレスを受けています（直訳：ストレスを受ける）',
  "Selfie · Let's take a selfie together! (셀카 = self-camera)": 'セルフィー · 一緒にセルフィーを撮りましょう！（셀카＝セルフカメラ）',
  '아파트 (apateu) is which English loanword?': '아파트（アパトゥ）はどの英語の外来語ですか？',
  'Avenue': 'アベニュー',
  'Apartment': 'アパートメント',
  'Apparatus': '装置',
  'Airport': '空港',
  "Incredible! You've completed all 21 vocabulary categories! Konglish shows how global Korean has become. Now you have a massive vocabulary foundation — keep building with grammar lessons to start forming full sentences. 대단해요! (You're amazing!)": '信じられない！21の語彙カテゴリーをすべて完了しました！コングリッシュは韓国語がいかにグローバルになったかを示しています。今や膨大な語彙の基盤があります — 文法レッスンで学び続けて完全な文を作り始めましょう。대단해요！（あなたは素晴らしい！）',
  'Konglish Complete!': 'コングリッシュ完成！',

  // ── Grammar lesson — lesson-header & stage nav ─────────────────────────
  'Korean Grammar: 문법': '韓国語文法：문법',
  '26 Stages · 70 Steps': '26ステージ・70ステップ',
  'Beginner–Advanced': '初級〜上級',
  '~90 min': '〜90分',
  'SOV word order — the verb always comes last': 'SOV語順 — 動詞は必ず最後に来る',
  'Particles replace rigid word-position rules': '助詞が厳密な語順を置き換える',
  '26 stages: sentences to advanced patterns': '26ステージ：文章から上級パターンまで',
  'Most learners complete in under 90 minutes': 'ほとんどの学習者は90分以内に完了',
  'Sentence': '文章',
  'Particles': '助詞',
  'Conjugation': '活用',
  'Negation': '否定文',
  'Questions': '質問',
  'Patterns': '文型',
  'Connectors': '接続詞',
  'And/With': '〜と',
  'To/From': '〜に・から',
  'Time': '時間',
  'Counters': '数助詞',
  'Progressive': '進行形',
  'Self-Intro': '自己紹介',
  'Dates': '日付',
  'Adverbs': '副詞',
  'Nominalizer': '名詞化',
  'Comparatives': '比較',
  'Like': '好み',
  'Still/Already': 'まだ・もう',
  'Indefinite': '不定代名詞',
  'Imperative': '命令形',
  "Don't": '禁止形',
  'Method': '方法',
  'Good/Poor': '得意・不得意',
  'All/More': '全部・もっと',
  '-도 Advanced': '-도の応用',

  // ── Grammar lesson — reading_card titles ──────────────────────────────
  'Word Order — SOV': '語順 — SOV',
  'Korean Particles': '韓国語の助詞',
  'Verbs — Dictionary Form': '動詞 — 基本形',
  'Present Tense: -아요 / -어요': '現在形：-아요 / -어요',
  'Past Tense: -았어요 / -었어요': '過去形：-았어요 / -었어요',
  'Future Tense: -(으)ㄹ 거예요': '未来形：-(으)ㄹ 거예요',
  'Making Sentences Negative': '否定文の作り方',
  'Forming Questions': '疑問文の作り方',
  'Essential Sentence Patterns': '重要な文型',
  'And, With': '〜と、〜と一緒に',
  'To/From Someone': '〜に、〜から（人）',
  'Telling Time': '時刻の言い方',
  'Present Progressive': '現在進行形',
  'Self Introduction': '自己紹介',
  'Dates and Months': '日付と月',
  'Degree Adverbs': '程度の副詞',
  'Nominalizer: -는 것': '名詞化：-는 것',
  '좋다 vs 좋아하다': '좋다 vs 좋아하다',
  'Still & Already': 'まだ・すでに・もう',
  'Someone, Something': '誰か・何か',
  'Imperative: -(으)세요': '命令形：-(으)세요',
  "Don't: -지 마세요": '禁止形：-지 마세요',
  'Method: -(으)로': '方法：-(으)로',
  'Good/Poor At': '〜が得意・不得意',
  'All, More: 다, 더': '全部・もっと：다, 더',
  'All, More & -도': '全部・もっと＆-도の応用',

  // ── Grammar lesson — reading_card bodies ──────────────────────────────
  'Korean follows Subject → Object → Verb (SOV) order. The verb always comes LAST.': '韓国語は主語→目的語→動詞（SOV）の順に従います。動詞は必ず最後に来ます。',
  'Particles attach to nouns to show their role: topic, subject, object, location. They replace fixed word order.': '助詞は名詞に付いて役割（トピック・主語・目的語・場所）を示します。固定された語順を置き換えます。',
  'All Korean verbs in dictionary form end in 다 (da). Remove 다 to get the verb stem, then add an ending.': '韓国語の動詞の基本形はすべて다（da）で終わります。다を取り除いて語幹を得て、語尾を付けます。',
  'Add -아요 after ㅏ or ㅗ stems. Add -어요 for all others. 하다 verbs use -해요.': 'ㅏまたはㅗ語幹の後に-아요を付けます。それ以外は-어요。하다動詞は-해요を使います。',
  'Add -았어요 after ㅏ/ㅗ stems and -었어요 for others. 하다 → 했어요.': 'ㅏ/ㅗ語幹の後に-았어요、それ以外は-었어요。하다 → 했어요。',
  'Add -(으)ㄹ 거예요 to the verb stem to talk about future plans or predictions.': '動詞語幹に-(으)ㄹ 거예요を付けて、未来の計画や予測を表します。',
  'Short negation: 안 + verb. Long negation: verb stem + 지 않아요. Cannot: 못 + verb.': '短い否定：안＋動詞。長い否定：語幹＋지 않아요。不可能：못＋動詞。',
  'Korean questions use the SAME word order as statements — just add rising intonation (↑) or a question mark.': '韓国語の疑問文は平叙文と同じ語順です — 上昇イントネーション（↑）か疑問符を付けるだけです。',
  'Master these 6 patterns to express the most common ideas in Korean conversations.': 'これら6つのパターンをマスターすれば、韓国語の会話でよく使うアイデアを表現できます。',
  'These 4 conjunctions connect sentences. Place them at the START of the second sentence.': 'これら4つの接続詞は文をつなぎます。2番目の文の冒頭に置きます。',
  'Use these particles between nouns (not sentences) to mean \'and\' or \'with\'.': 'これらの助詞を名詞間（文ではなく）に使って「〜と」や「〜と一緒に」を表します。',
  'Use person-directional particles when giving to or receiving from people, not places.': '人に対して与える・受け取る場合は人方向の助詞を使います（場所ではなく）。',
  'Use NATIVE Korean numbers for hours (시) and SINO-KOREAN numbers for minutes (분). AM = 오전, PM = 오후.': '時（시）には固有語数詞、分（분）には漢数詞を使います。午前＝오전、午後＝오후。',
  'Korean uses specific counters after [Noun] + [Number]. Native Korean numbers (한, 두, 세...) are used with most counters.': '韓国語では[名詞]＋[数字]の後に専用の助数詞を使います。ほとんどは固有語数詞（한、두、세...）と共に使います。',
  'Add -고 있어요 to the verb stem to say someone IS CURRENTLY doing something (the Korean \'-ing\' form).': '動詞語幹に-고 있어요を付けて、今まさに〜していることを表します（韓国語の進行形）。',
  'Key vocabulary: 이름 (name), 나이 (age), 나라 (country), 직업 (job), 취미 (hobby), 고향 (hometown).': '重要な語彙：이름（名前）、나이（年齢）、나라（国）、직업（職業）、취미（趣味）、고향（出身地）。',
  'Korean dates use Sino-Korean numbers in Year → Month → Day order. June = 유월, October = 시월 (exceptions).': '韓国語の日付は漢数詞を使い、年→月→日の順序です。6月＝유월、10月＝시월（例外）。',
  'Degree adverbs go directly before the word they modify: 조금 (a little), 정말 (really), 아주 (very), 많이 (a lot).': '程度副詞は修飾する語の直前に置きます：조금（少し）、정말（本当に）、아주（とても）、많이（たくさん）。',
  'Adding -는 것 to a verb stem creates a noun phrase — \'the act of doing ~\'. It makes verbs act like nouns.': '動詞語幹に-는 것を付けると名詞句「〜すること」が作れます。動詞を名詞のように使えるようにします。',
  'Structure: [A]이/가 [B]보다 더 [adjective]. 보다 means \'than\' and 더 means \'more\'.': '構造：[A]이/가 [B]보다 더 [形容詞]。보다は「〜より」、더は「もっと」を意味します。',
  '좋다 uses subject particle (이/가): 한국어가 좋아요. 좋아하다 uses object particle (을/를): 한국어를 좋아해요.': '좋다は主語助詞（이/가）を使います：한국어가 좋아요。좋아하다は目的語助詞（을/를）を使います：한국어를 좋아해요。',
  '아직 + negative verb = still not. 벌써 = already (sooner than expected). 이미 = already (neutral, formal).': '아직＋否定動詞＝まだ〜ない。벌써＝もう（予想より早い）。이미＝すでに（中立・フォーマル）。',
  'Combine question words with context to express indefinite ideas like \'someone\' or \'nothing\'.': '疑問詞を文脈と組み合わせて、「誰か」や「何もない」などの不定の意味を表します。',
  'Add -(으)세요 to a verb stem to make a polite request or command.': '動詞語幹に-(으)세요を付けて、丁寧な依頼や命令を作ります。',
  'Add -지 마세요 to a verb stem to politely tell someone NOT to do something.': '動詞語幹に-지 마세요を付けて、丁寧に〜しないでくださいと伝えます。',
  '-(으)로 marks method or means — \'by\' or \'with\' a tool/way of doing something.': '-(으)로は手段・方法を示します — ある道具や方法で「〜で」という意味。',
  '잘하다 = good at. 못하다 = poor at. Both attach after the object particle 을/를.': '잘하다＝〜が得意。못하다＝〜が苦手。どちらも目的語助詞을/를の後に続きます。',
  '다 = all/everything. 더 = more. Both are simple adverbs placed before the verb.': '다＝全部・すべて。더＝もっと。どちらも動詞の前に置く単純な副詞です。',
  '-도 has 4 advanced uses beyond simple \'also\': emphasis, emphatic negation, and \'both...and\'.': '-도には「〜も」以外に4つの上級用法があります：強調、強意否定、「〜も〜も」。',

  // ── Grammar lesson — reading_card rules ───────────────────────────────
  'English (SVO): I eat rice.': '英語（SVO）：I eat rice.',
  'Korean (SOV): 나는 밥을 먹어요. (I rice eat.)': '韓国語（SOV）：나는 밥을 먹어요.（私はご飯を食べます。）',
  'Tip: Listen for the final word — that\'s the verb, the action!': 'ヒント：最後の語を聞き取りましょう — それが動詞、つまりアクションです！',
  '은/는 → Topic marker (은 after consonant, 는 after vowel)': '은/는 → トピックマーカー（子音の後は은、母音の後は는）',
  '이/가 → Subject marker (이 after consonant, 가 after vowel)': '이/가 → 主語マーカー（子音の後は이、母音の後は가）',
  '을/를 → Object marker (을 after consonant, 를 after vowel)': '을/를 → 目的語マーカー（子音の後は을、母音の後는를）',
  '에 → Location / Direction': '에 → 場所・方向',
  '에서 → Location of action': '에서 → 動作の場所',
  '의 → Possessive (\'s / of)': '의 → 所有格（〜の）',
  '가다 (to go) → stem: 가-': '가다（行く）→ 語幹：가-',
  '먹다 (to eat) → stem: 먹-': '먹다（食べる）→ 語幹：먹-',
  '공부하다 (to study) → stem: 공부하-': '공부하다（勉強する）→ 語幹：공부하-',
  '하다 (to do) → stem: 하-': '하다（する）→ 語幹：하-',
  '가다 → 가요 (go · ㅏ stem)': '가다 → 가요（行きます・ㅏ語幹）',
  '오다 → 와요 (come · ㅗ stem)': '오다 → 와요（来ます・ㅗ語幹）',
  '먹다 → 먹어요 (eat · other)': '먹다 → 먹어요（食べます・その他）',
  '마시다 → 마셔요 (drink · other)': '마시다 → 마셔요（飲みます・その他）',
  '공부하다 → 공부해요 (study · 하다)': '공부하다 → 공부해요（勉強します・하다）',
  '가다 → 갔어요 (went)': '가다 → 갔어요（行きました）',
  '오다 → 왔어요 (came)': '오다 → 왔어요（来ました）',
  '먹다 → 먹었어요 (ate)': '먹다 → 먹었어요（食べました）',
  '마시다 → 마셨어요 (drank)': '마시다 → 마셨어요（飲みました）',
  '공부하다 → 공부했어요 (studied)': '공부하다 → 공부했어요（勉強しました）',
  '가다 → 갈 거예요 (will go)': '가다 → 갈 거예요（行くつもりです）',
  '먹다 → 먹을 거예요 (will eat)': '먹다 → 먹을 거예요（食べるつもりです）',
  '공부하다 → 공부할 거예요 (will study)': '공부하다 → 공부할 거예요（勉強するつもりです）',
  '안 먹어요 (don\'t eat — short form)': '안 먹어요（食べません — 短い否定形）',
  '먹지 않아요 (don\'t eat — long form)': '먹지 않아요（食べません — 長い否定形）',
  '못 가요 (can\'t go — unable to)': '못 가요（行けません — 不可能）',
  '뭐 / 무엇 — What': '뭐 / 무엇 — 何',
  '누구 — Who': '누구 — 誰',
  '어디 — Where': '어디 — どこ',
  '언제 — When': '언제 — いつ',
  '왜 — Why': '왜 — なぜ',
  '어떻게 — How': '어떻게 — どのように',
  '얼마 — How much': '얼마 — いくら',
  '몇 — How many': '몇 — いくつ',
  '~이에요/예요 — is/am/are (noun): 학생이에요 (I\'m a student)': '~이에요/예요 — です/だ（名詞）：학생이에요（学生です）',
  '~고 싶어요 — want to: 한국에 가고 싶어요 (I want to go to Korea)': '~고 싶어요 — したい：한국에 가고 싶어요（韓国に行きたいです）',
  '~ㄹ/을 수 있어요 — can: 한국어를 할 수 있어요 (I can speak Korean)': '~ㄹ/을 수 있어요 — できる：한국어를 할 수 있어요（韓国語が話せます）',
  '~아/어야 해요 — must: 공부해야 해요 (I must study)': '~아/어야 해요 — しなければなりません：공부해야 해요（勉強しなければなりません）',
  '~(으)면 — if/when: 비가 오면 집에 있어요 (If it rains, I stay home)': '~(으)면 — もし〜なら：비가 오면 집에 있어요（雨が降ったら家にいます）',
  '~때문에 — because of: 비 때문에 못 가요 (Can\'t go because of rain)': '~때문에 — 〜のせいで：비 때문에 못 가요（雨のせいで行けません）',
  '그리고 — And / And then (adds information or sequence)': '그리고 — そして / それから（情報の追加・順序）',
  '그래서 — So / Therefore (cause → result)': '그래서 — だから / そのため（原因→結果）',
  '그렇지만 — But / However (strong contrast, formal)': '그렇지만 — しかし / でも（強い対比、フォーマル）',
  '그런데 — But / By the way (soft contrast, casual — most common!)': '그런데 — でも / ところで（柔らかい対比、カジュアル — 最も一般的！）',
  '-하고 — after any noun, neutral/casual: 친구하고 갔어요 (went with a friend)': '-하고 — 任意の名詞の後、中立的・カジュアル：친구하고 갔어요（友達と行きました）',
  '-(이)랑 — 이랑 (consonant) / 랑 (vowel), very casual: 오빠랑 놀았어요 (played with older brother)': '-(이)랑 — 이랑（子音後）/ 랑（母音後）、とてもカジュアル：오빠랑 놀았어요（お兄ちゃんと遊びました）',
  '-와/과 — 와 (vowel) / 과 (consonant), formal/written: 선생님과 상담했어요 (consulted with teacher)': '-와/과 — 와（母音後）/ 과（子音後）、フォーマル・書き言葉：선생님과 상담했어요（先生と相談しました）',
  '-한테 — to (a person): 친구한테 전화했어요 (called my friend)': '-한테 — 〜に（人）：친구한테 전화했어요（友達に電話しました）',
  '-한테서 — from (a person): 선생님한테서 배웠어요 (learned from teacher)': '-한테서 — 〜から（人）：선생님한테서 배웠어요（先生から習いました）',
  '-에게 / -에게서 — formal equivalents': '-에게 / -에게서 — フォーマルな同等表現',
  '-께 — to (honorific, for elders): 선생님께 드렸어요': '-께 — 〜に（敬語、目上の人向け）：선생님께 드렸어요',
  'Hours (시): 한(1), 두(2), 세(3), 네(4), 다섯(5)... + 시': '時（시）：한(1)、두(2)、세(3)、네(4)、다섯(5)... + 시',
  'Minutes (분): 일(1), 이(2), 삼(3), 사(4), 오(5)... + 분': '分（분）：일(1)、이(2)、삼(3)、사(4)、오(5)... + 분',
  'Half past: 반 — 세 시 반 = 3:30': '半：반 — 세 시 반 = 3時30分',
  'Example: 오후 두 시 삼십 분 = 2:30 PM': '例：오후 두 시 삼십 분 = 午後2時30分',
  '개 — general objects: 사과 세 개 (3 apples)': '개 — 一般的な物：사과 세 개（りんご3個）',
  '명 — people (neutral): 학생 두 명 (2 students)': '명 — 人（中立）：학생 두 명（学生2人）',
  '분 — people (honorific): 손님 두 분 (2 guests)': '분 — 人（敬語）：손님 두 분（お客様2名）',
  '마리 — animals: 고양이 한 마리 (1 cat)': '마리 — 動物：고양이 한 마리（猫1匹）',
  '권 — books: 책 세 권 (3 books)': '권 — 本：책 세 권（本3冊）',
  '잔 — cups/drinks: 커피 두 잔 (2 coffees)': '잔 — カップ・飲み物：커피 두 잔（コーヒー2杯）',
  '번 — times/turns: 세 번 (3 times)': '번 — 回数・番：세 번（3回）',
  '먹다 → 먹고 있어요 (is eating)': '먹다 → 먹고 있어요（食べています）',
  '가다 → 가고 있어요 (is going)': '가다 → 가고 있어요（行っています）',
  '공부하다 → 공부하고 있어요 (is studying)': '공부하다 → 공부하고 있어요（勉強しています）',
  '읽다 → 읽고 있어요 (is reading)': '읽다 → 읽고 있어요（読んでいます）',
  '안녕하세요! 저는 [name]이에요/예요.': 'はじめまして！私は[name]です。',
  '저는 [나라]에서 왔어요. (I\'m from [country].)': '私は[나라]から来ました。（私は[国]出身です。）',
  '저는 [직업]이에요. (I\'m a [job].)': '私は[직업]です。（私は[職業]です。）',
  '제 취미는 [hobby]예요. (My hobby is [hobby].)': '私の趣味は[hobby]です。',
  '잘 부탁드려요! (Nice to meet you!)': 'よろしくお願いします！',
  '일월(1월), 이월(2월), 삼월(3월), 사월(4월), 오월(5월), 유월(6월)': '1월（1月）、2월（2月）、3월（3月）、4월（4月）、5월（5月）、6월（6月）',
  '칠월(7월), 팔월(8월), 구월(9월), 시월(10월), 십일월(11월), 십이월(12월)': '7월（7月）、8월（8月）、9월（9月）、10월（10月）、11월（11月）、12월（12月）',
  'Date format: 2026년 6월 16일 (June 16, 2026)': '日付の形式：2026년 6월 16일（2026年6月16日）',
  '오늘이 며칠이에요? — What is today\'s date?': '오늘이 며칠이에요？ — 今日は何日ですか？',
  '조금 / 좀 — a little (좀 is softer/casual)': '조금 / 좀 — 少し（좀はより柔らか・カジュアル）',
  '정말 — really / truly (neutral)': '정말 — 本当に（中立的）',
  '진짜 — really (casual, stronger feel)': '진짜 — 本当に（カジュアル、より強い感じ）',
  '아주 — very': '아주 — とても',
  '많이 — a lot / much': '많이 — たくさん・多く',
  '별로 + negative — not really (별로 안 좋아요 = I don\'t really like it)': '별로 + 否定 — あまり〜ない（별로 안 좋아요 = あまり好きじゃないです）',
  '전혀 + negative — not at all (전혀 모르겠어요 = I have no idea at all)': '전혀 + 否定 — 全然〜ない（전혀 모르겠어요 = 全然わかりません）',
  '먹는 것 — the act of eating': '먹는 것 — 食べること',
  '배우는 것 — the act of learning': '배우는 것 — 学ぶこと',
  '한국어를 배우는 것이 재미있어요 — Learning Korean is interesting': '한국어를 배우는 것이 재미있어요 — 韓国語を学ぶことは面白いです',
  '요리하는 것을 좋아해요 — I like cooking (the act of cooking)': '요리하는 것을 좋아해요 — 料理をすることが好きです',
  '-는 것 (present/habitual) · -(으)ㄴ 것 (past/completed) · -(으)ㄹ 것 (future/planned). The present form is the most common in daily speech.': '-는 것（現在・習慣的）・-(으)ㄴ 것（過去・完了）・-(으)ㄹ 것（未来・計画）。日常会話では現在形が最も一般的。',
  '한국어가 영어보다 더 어려워요 — Korean is harder than English': '한국어가 영어보다 더 어려워요 — 韓国語は英語より難しいです',
  '오늘이 어제보다 더 더워요 — Today is hotter than yesterday': '오늘이 어제보다 더 더워요 — 今日は昨日より暑いです',
  '더 can be dropped in casual speech: 한국어가 영어보다 어려워요': '더はカジュアルな会話では省略できます：한국어가 영어보다 어려워요',
  '좋다 — to be good / feel good (state): 커피가 좋아요 (I like coffee / Coffee is good)': '좋다 — 良い・気持ちが良い（状態）：커피가 좋아요（コーヒーが好きです）',
  '좋아하다 — to like (active preference): 커피를 좋아해요 (I like coffee)': '좋아하다 — 好む（能動的な好み）：커피를 좋아해요（コーヒーが好きです）',
  'Both translate as \'I like\' but 좋다 focuses on the feeling, 좋아하다 on the preference': '両方とも「好きです」と訳せますが、좋다は感情に、좋아하다は好みに焦点を当てます',
  '아직 안 먹었어요 — Haven\'t eaten yet (still not)': '아직 안 먹었어요 — まだ食べていません',
  '아직 여기 있어요 — Still here (ongoing)': '아직 여기 있어요 — まだここにいます',
  '벌써 도착했어요? — Already arrived? (surprised)': '벌써 도착했어요？ — もう着いたんですか？（驚き）',
  '이미 알아요 — I already know (neutral)': '이미 알아요 — すでに知っています（中立）',
  '누군가 — someone: 누군가 왔어요 (Someone came)': '누군가 — 誰か：누군가 왔어요（誰かが来ました）',
  '무언가 / 뭔가 — something: 뭔가 이상해요 (Something is strange)': '무언가 / 뭔가 — 何か：뭔가 이상해요（何かがおかしいです）',
  '어딘가 — somewhere: 어딘가에 있어요 (It\'s somewhere)': '어딘가 — どこか：어딘가에 있어요（どこかにあります）',
  '아무도 + negative — no one: 아무도 없어요 (No one is here)': '아무도 + 否定 — 誰も〜ない：아무도 없어요（誰もいません）',
  '아무것도 + negative — nothing: 아무것도 몰라요 (I know nothing)': '아무것도 + 否定 — 何も〜ない：아무것도 몰라요（何も知りません）',
  '가다 → 가세요 (please go)': '가다 → 가세요（行ってください）',
  '앉다 → 앉으세요 (please sit)': '앉다 → 앉으세요（座ってください）',
  '먹다 → 드세요 (please eat — honorific)': '먹다 → 드세요（召し上がってください — 敬語）',
  '말하다 → 말하지 마세요 (please don\'t speak)': '말하다 → 말하지 마세요（話さないでください）',
  '가다 → 가지 마세요 (please don\'t go)': '가다 → 가지 마세요（行かないでください）',
  '먹다 → 먹지 마세요 (please don\'t eat)': '먹다 → 먹지 마세요（食べないでください）',
  '-(으)로 after consonant, -로 after vowel: 버스로 가요 (go by bus)': '-(으)로：子音の後、-로：母音の後。버스로 가요（バスで行きます）',
  '지하철로 와요 (come by subway)': '지하철로 와요（地下鉄で来ます）',
  '한국어로 말해요 (speak in Korean)': '한국어로 말해요（韓国語で話します）',
  '한국어를 잘해요 (good at Korean)': '한국어를 잘해요（韓国語が得意です）',
  '수학을 못해요 (bad at math)': '수학을 못해요（数学が苦手です）',
  '수영을 잘 못해요 (not very good at swimming)': '수영을 잘 못해요（水泳があまり得意じゃないです）',
  '다 먹었어요 — ate everything / all of it': '다 먹었어요 — 全部食べました',
  '더 주세요 — please give (me) more': '더 주세요 — もっとください',
  '다 더 다르게 쓰여요 — both are used very differently in context': '다 더 다르게 쓰여요 — 문마によって使い方がまったく異なります',
  '아이도 알아요 — even children know (emphasis: unexpected inclusion)': '아이도 알아요 — 子供でも知っています（強調：予想外の含まれ方）',
  '하나도 없어요 — not even one (emphatic negation: 하나도 + negative)': '하나도 없어요 — 一つもありません（強調否定：하나도 + 否定）',
  '먹기도 해요 — sometimes eats / also eats (-기도 하다)': '먹기도 해요 — 食べることもあります（-기도 하다）',
  '좋기도 하고 나쁘기도 해요 — both good and bad': '좋기도 하고 나쁘기도 해요 — 良くもあり悪くもあります',

  // ── Grammar lesson — tip texts ────────────────────────────────────────
  'Grammar Tip': '文法のヒント',
  'Once you know the verb comes last, everything clicks. The rest of the sentence can rearrange — Korean speakers use particles to keep things clear.': '動詞が最後に来ると分かれば、すべてが理解できます。残りの文は並び替えても大丈夫 — 助詞で文脈を明確にします。',
  'Vowel Rule': '母音のルール',
  'ㅏ and ㅗ are \'bright\' vowels → -아요. All other vowels are \'dark\' → -어요. Once you know the stem vowel, conjugation is automatic.': 'ㅏとㅗは「明るい」母音 → -아요。その他の母音は「暗い」 → -어요。語幹の母音が分かれば活用は自動的です。',
  'Usage Tip': '使い方のヒント',
  '그런데 is one of the most common words in spoken Korean — it softens contrast and shifts topics smoothly. 그렇지만 is stronger and more formal.': '그런데は口語韓国語で最もよく使われる語のひとつで、対比を和らげ話題転換を滑らかにします。그렇지만はより強くフォーマルです。',
  'Key Pattern': '重要パターン',
  'Hours use Native Korean numbers (한, 두, 세...). Minutes use Sino-Korean numbers (일, 이, 삼...). Half past = 반. AM = 오전, PM = 오후.': '時には固有語数詞（한、두、세...）。分には漢数詞（일、이、삼...）。半＝반。午前＝오전、午後＝오후。',
  'Progressive vs Simple': '進行形と単純形',
  '먹어요 = I eat (general or right now, context-dependent). 먹고 있어요 = I am eating (specifically in progress at this moment). The progressive adds \'currently in action.\'': '먹어요 = 食べます（一般的または今、文脈による）。먹고 있어요 = 食べています（まさに今進行中）。進行形は「現在行動中」という意味を追加します。',
  'Template': 'テンプレート',
  'Use 안녕하세요 + 잘 부탁드려요 for formal settings. With friends or peers: 안녕! + 잘 부탁해! Always bow slightly when introducing yourself in person.': 'フォーマルな場面では안녕하세요 + 잘 부탁드려요。友達や同僚には안녕！+ 잘 부탁해！対面での自己紹介時は軽くお辞儀をしましょう。',
  'Negative Adverbs': '否定の副詞',
  '별로 and 전혀 MUST be used with a negative verb (안, 못, 없다, 모르다). Saying 별로 좋아요 (without negation) is ungrammatical. Think of them as \'not really\' and \'not at all\'.': '별로と전혀は否定動詞（안、못、없다、모르다）と一緒に使わなければなりません。별로 좋아요（否定なし）は非文法的です。「あまり〜ない」と「全然〜ない」とイメージしてください。',
  'Tense Forms': '時制の形',
  'Key Difference': '重要な違い',
  '좋아요 → subject particle (이/가) precedes it. 좋아해요 → object particle (을/를) precedes it. When in doubt, 좋아해요 sounds more natural for expressing preferences.': '좋아요 → 前に主語助詞（이/가）。좋아해요 → 前に目的語助詞（을/를）。迷ったら、好みを表現するには좋아해요がより自然に聞こえます。',
  'Pattern': '文型',
  '밥을 먹어요 = I eat rice. 밥을 먹어요? = Do you eat rice? Same words — just a rising tone at the end. No word inversion like English!': '밥을 먹어요 = ご飯を食べます。밥을 먹어요？= ご飯を食べますか？同じ語 — 語尾を上げるだけ。英語のような語順の逆転はなし！',

  // ── Grammar lesson — match_quiz prompts & choices ─────────────────────
  'In a Korean sentence, the verb always comes...': '韓国語の文で、動詞は常に...',
  'Last': '最後',
  'First': '最初',
  'Second': '2番目',
  'Anywhere': 'どこでも',
  '은/는 marks the ___': '은/는は___を示す',
  'Topic': 'トピック',
  'Subject': '主語',
  'Object': '目的語',
  'Location': '場所',
  'To mark 밥 (rice) as the OBJECT: 밥___ 먹어요': '밥（ご飯）を目的語にする：밥___ 먹어요',
  '을': '을',
  '는': '는',
  '가': '가',
  '에': '에',
  '에서 marks...': '에서は...を示す',
  'Location of action': '動作の場所',
  'Destination': '目的地',
  '가다 (to go) → polite present form?': '가다（行く）→ 丁寧な現在形は？',
  '가요': '가요',
  '가아요': '가아요',
  '가어요': '가어요',
  '갔어요': '갔어요',
  'Past tense of 먹다 (to eat)?': '먹다（食べる）の過去形は？',
  '먹었어요': '먹었어요',
  '먹아요': '먹아요',
  '먹어요': '먹어요',
  '먹을 거예요': '먹을 거예요',
  '가다 (to go) → future tense?': '가다（行く）→ 未来形は？',
  '갈 거예요': '갈 거예요',
  '가지 마세요': '가지 마세요',
  '\'I don\'t eat\' — short negation form': '「食べません」— 短い否定形',
  '안 먹어요': '안 먹어요',
  '먹지 않아요': '먹지 않아요',
  '못 먹어요': '못 먹어요',
  '안 가요': '안 가요',
  '\'Where\' in Korean?': '韓国語で「どこ」は？',
  '어디': '어디',
  '뭐': '뭐',
  '왜': '왜',
  '언제': '언제',
  'Pattern for \'I want to go to Korea\': 한국에 ___': '「韓国に行きたいです」の文型：한국에___',
  '가고 싶어요': '가고 싶어요',
  '가야 해요': '가야 해요',
  '갈 수 있어요': '갈 수 있어요',
  'Soft contrast or topic shift — most common in spoken Korean?': '柔らかい対比や話題転換 — 口語で最も一般的なものは？',
  '그런데': '그런데',
  '그렇지만': '그렇지만',
  '그래서': '그래서',
  '그리고': '그리고',
  'Hours in Korean time use which number system?': '時間表現の「時」はどちらの数字体系？',
  'Native Korean (한, 두, 세...)': '固有語数詞（한、두、세...）',
  'Sino-Korean (일, 이, 삼...)': '漢数詞（일、이、삼...）',
  'Either one': 'どちらでも',
  'Arabic numerals': 'アラビア数字',
  'Counter for people (neutral)?': '人を数える助数詞（中立）は？',
  '명': '명',
  '개': '개',
  '마리': '마리',
  '잔': '잔',
  '\'is studying\' → 공부하다 + -고 있어요 =': '「勉強しています」→ 공부하다 + -고 있어요 =',
  '공부하고 있어요': '공부하고 있어요',
  '공부고 있어요': '공부고 있어요',
  '공부하고 있다': '공부하고 있다',
  '공부해요': '공부해요',
  '별로 and 전혀 must be used with...': '별로と전혀は必ず一緒に使う...',
  'A negative verb': '否定動詞',
  'A positive verb': '肯定動詞',
  'An adjective only': '形容詞のみ',
  'Past tense only': '過去形のみ',
  '-는 것 turns a verb into...': '-는 것は動詞を...に変える',
  'A noun phrase': '名詞句',
  'Past tense': '過去形',
  'Future tense': '未来形',
  'A question': '疑問文',
  'How to say \'more\' in a Korean comparison?': '韓国語の比較で「もっと」は？',
  '더': '더',
  '많이': '많이',
  '아주': '아주',
  '보다': '보다',
  '\'아직\' means?': '「아직」の意味は？',
  'Still / Not yet': 'まだ / まだ〜ない',
  'Already': 'すでに・もう',
  'Even': 'でさえ',
  'More': 'もっと',
  '\'No one is here\' — 아무도 ___': '「誰もいません」— 아무도 ___',
  '없어요': '없어요',
  '있어요': '있어요',
  '알아요': '알아요',
  '와요': '와요',
  '\'Please don\'t speak\' in Korean?': '「話さないでください」は韓国語で？',
  '말하지 마세요': '말하지 마세요',
  '말해 주세요': '말해 주세요',
  '말하세요': '말하세요',
  '말 안 해요': '말 안 해요',
  '\'good at Korean\' — 한국어를 ___': '「韓国語が得意です」— 한국어를 ___',
  '잘해요': '잘해요',
  '못해요': '못해요',
  '좋아해요': '좋아해요',
  '잘 못해요': '잘 못해요',
  '\'Please give me more\' — ___ 주세요': '「もっとください」— ___ 주세요',
  '다': '다',
  '좀': '좀',
  '잘': '잘',
  '\'Even children know\' — which -도 use?': '「子供でも知っている」— どの-도の用法？',
  '아이도 알아요': '아이도 알아요',
  '아이가 알아요': '아이가 알아요',
  '아이를 알아요': '아이를 알아요',
  '아이는 알아요': '아이는 알아요',

  // ── Grammar lesson — lesson_complete ──────────────────────────────────
  'Grammar Complete!': '文法完成！',
  '문법 완료!': '문법 완료！',
  'You\'ve mastered all 26 grammar stages — from SOV word order and particles to advanced -도 patterns. Start applying these in real conversations!': '26の文法ステージをすべてマスターしました — SOV語順と助詞から上級の-도パターンまで。実際の会話でこれらを使い始めましょう！',

  // ── Lesson meta spans (step-runner pages) ────────────────────
  '⏱ 28 min': '⏱ 28分',
  '⏱ 29 min': '⏱ 29分',
  '⏱ 30 min': '⏱ 30分',
  '🔊 Audio on every word': '🔊 全単語に音声付き',
  '🔊 Audio on every phrase': '🔊 全フレーズに音声付き',
  '🔊 Audio on every form': '🔊 全語形に音声付き',

  '4 stages with listen-and-repeat audio and quizzes throughout': '全ステージに音声リピートとクイズを搭載した4段階構成',

  // ── Nouns page ───────────────────────────────────────────────
  '🏠 Beginner · Lesson 5': '🏠 初級 · レッスン 5',
  'Common Nouns': '一般名詞',
  'Master people, family, place, time, and object nouns in Korean': '韓国語の人・家族・場所・時間・物の名詞をマスターしよう',
  'Learn how Korean counters (개, 명, 잔) work with numbers': '韓国語の助数詞（개・명・잔）と数字の組み合わせを学ぼう',
  'Understand the possessive marker 의 and polite vs casual forms': '所有格助詞의と丁寧・カジュアル形の違いを理解しよう',
  'People & Family': '人・家族',
  'Places & Time': '場所・時間',
  'Objects & Counters': '物・助数詞',
  'Possessives': '所有格・まとめ',
  'Korean Nouns (명사)': '韓国語の名詞（명사）',
  'Family Nouns (가족 명사)': '家族の名詞（가족 명사）',
  'Place Nouns (장소 명사)': '場所の名詞（장소 명사）',
  'Time Nouns (시간 명사)': '時間の名詞（시간 명사）',
  'Object Nouns (사물 명사)': '物の名詞（사물 명사）',
  'Korean Counters (수사)': '韓国語の助数詞（수사）',
  'Possessive Marker 의': '所有格助詞 의',
  "Which word means 'friend'?": '「友達」を意味する単語はどれですか？',
  "Which word means 'school'?": '「学校」を意味する単語はどれですか？',
  "Which word means 'today'?": '「今日」を意味する単語はどれですか？',
  "Which word means 'money'?": '「お金」を意味する単語はどれですか？',
  'Which counter is used for people (counting persons)?': '人を数えるときに使う助数詞はどれですか？',
  "How do you say 'my bag' in polite Korean?": '丁寧な韓国語で「私のバッグ」はどれですか？',
  '의 is the Korean possessive marker. What does it correspond to in English?': '의は韓国語の所有格助詞です。英語の何に相当しますか？',
  'Nouns Complete!': '名詞 完了！',

  // ── Pronouns page ────────────────────────────────────────────
  '👥 Beginner · Lesson 4': '👥 初級 · レッスン 4',
  'Learn polite 저 vs casual 나, and why Korean often drops pronouns entirely': '丁寧な저とカジュアルな나の違いと、代名詞が省略される理由を学ぼう',
  'Understand why 당신 is rarely used and how to address people naturally': '당신がほとんど使われない理由と自然な呼びかけ方を理解しよう',
  'Master 우리 (our/my), demonstratives (이것·그것·저것), and question words': 'うり（우리）・指示代名詞（이것・그것・저것）・疑問詞をマスターしよう',
  'First & Second Person': '1・2人称',
  'Third Person & We': '3人称・우리',
  'Demonstratives': '指示代名詞',
  'Question Pronouns': '疑問代名詞',
  'Korean Pronouns Overview': '韓国語の代名詞 概要',
  "Saying 'You' in Korean": '韓国語での「あなた」の言い方',
  'Third Person & We (그·그녀·우리)': '3人称・우리（그・그녀・우리）',
  'Demonstrative Pronouns (이·그·저)': '指示代名詞（이・그・저）',
  'Question Pronouns (의문대명사)': '疑問代名詞（의문대명사）',
  "Which pronoun is the polite form of 'I'?": '「私」の丁寧な形はどれですか？',
  "Why do Koreans rarely say 당신 in conversation?": '韓国人が会話でめったに당신を使わない理由は？',
  '우리 엄마 literally means \'our mom\' but is used to mean…': 'うり엄마は文字通り「私たちのお母さん」ですが、実際には何を意味しますか？',
  "Which form of 'we' is more humble and polite, used toward seniors?": 'どちらの「私たち」がより謙譲的で、目上の人に使いますか？',
  'Which demonstrative refers to something far from BOTH the speaker AND the listener?': '話者・聞き手両方から遠いものを指す指示代名詞はどれですか？',
  '저것 is the formal version. What is the casual version?': '저것のカジュアルな形はどれですか？',
  "Which question pronoun means 'who'?": '「誰」を意味する疑問代名詞はどれですか？',
  'Pronouns Complete!': '代名詞 完了！',

  // ── Emotions page ────────────────────────────────────────────
  '😊 Intermediate · Lesson 7': '😊 中級 · レッスン 7',
  'Expressing Emotions': '感情を表現する',
  'Learn how Korean emotion adjectives conjugate directly — no \'am/is/are\' needed': '韓国語の感情形容詞が直接活用する方法を学ぼう（be動詞不要）',
  'Discover culturally unique Korean emotion words like 그립다, 뿌듯하다, and 설레다': '그립다・뿌듯하다・설레다など文化固有の感情語を学ぼう',
  'Master key emotion phrases: 보고 싶어요, 감동받았어요, 괜찮아요': '重要な感情表現フレーズ「보고 싶어요」「감동받았어요」「괜찮아요」をマスターしよう',
  'Core Emotions': '基本感情',
  'Expressing Feelings': '感情の表現',
  'Complex Emotions': '複雑な感情',
  'Emotional Phrases': '感情のフレーズ',
  'Emotions in Korean (감정)': '韓国語の感情（감정）',
  'Conjugating Emotion Adjectives': '感情形容詞の活用',
  'More Feeling Words (감정 어휘)': 'さらなる感情語（감정 어휘）',
  '기분 — Mood & Feeling': '기분 — 気分と感情',
  'Deeper Emotions (깊은 감정)': '深い感情（깊은 감정）',
  'Common Emotional Sentence Patterns': '感情を表す定番の文パターン',
  "Which word means 'to be happy'?": '「幸せだ」を意味する単語はどれですか？',
  "Which word means 'to be tired'?": '「疲れている」を意味する単語はどれですか？',
  '기분이 좋아요 means…': '기분이 좋아요はどういう意味ですか？',
  '그립다 means…': '그립다はどういう意味ですか？',
  '뿌듯하다 means…': '뿌듯하다はどういう意味ですか？',
  '보고 싶어요 means…': '보고 싶어요はどういう意味ですか？',
  'Emotions Complete!': '感情 完了！',

  // ── Shopping page ────────────────────────────────────────────
  '🛒 Intermediate · Lesson 8': '🛒 中級 · レッスン 8',
  'Shopping Phrases': '買い物フレーズ',
  'Learn Korean store vocabulary — 가게, 시장, 백화점, 편의점': '韓国語の店舗語彙「가게・시장・백화점・편의점」を学ぼう',
  'Master the two most useful phrases: 얼마예요? and 이거 주세요': '最も便利な2つのフレーズ「얼마예요?」「이거 주세요」をマスターしよう',
  'Understand prices in 원 (won) and how to bargain at traditional markets': 'ウォン（원）での価格表現と伝統市場での値引き交渉を理解しよう',
  '4 stages covering vocabulary, in-store phrases, prices, and payment': '語彙・店内フレーズ・価格・支払いを扱う4ステージ',
  'Shopping Vocabulary': 'ショッピング語彙',
  'In the Store': '店内で',
  'Prices & Numbers': '価格・数字',
  'Transactions': '取引・まとめ',
  'Shopping in Korea (쇼핑)': '韓国でのショッピング（쇼핑）',
  'Shopping Item Words (쇼핑 물건)': 'ショッピング品物語（쇼핑 물건）',
  'Key Shopping Phrases (쇼핑 표현)': '重要なショッピングフレーズ（쇼핑 표현）',
  'Asking About Availability (있어요? / 없어요)': 'あるかどうか聞く（있어요? / 없어요）',
  'Korean Money & Prices (원)': '韓国のお金と価格（원）',
  'Payment Methods (결제 방법)': '支払い方法（결제 방법）',
  "Which word means 'market' (traditional outdoor market)?": '「市場（伝統的な屋外市場）」を意味する単語はどれですか？',
  "How do you ask 'How much is it?' in Korean?": '韓国語で「いくらですか？」はどれですか？',
  '없어요 means…': '없어요はどういう意味ですか？',
  '비싸다 means…': '비싸다はどういう意味ですか？',
  "Which word means 'change' (money returned to you after paying)?": '「お釣り」を意味する単語はどれですか？',
  "How do you say 'I'll pay by card'?": '「カードで支払います」はどれですか？',
  'Shopping Complete!': 'ショッピング 完了！',

  // ── Speech Levels page ───────────────────────────────────────
  '🗣️ Intermediate · Lesson 6': '🗣️ 中級 · レッスン 6',
  'Formal vs Informal': 'フォーマル vs インフォーマル',
  'Learn the 4 Korean speech levels: formal 합쇼체, polite 해요체, casual 반말, written 문어체': '韓国語の4つの敬語レベルを学ぼう：合쇼체・해요체・반말・문어체',
  'Understand when to use each level — who you\'re talking to and why it matters': 'どのレベルをいつ使うか——相手と理由を理解しよう',
  'Compare the same phrases across all levels side by side': '同じフレーズを全レベルで並べて比較しよう',
  '합쇼체 (Formal)': '합쇼체（フォーマル）',
  '해요체 (Polite)': '해요체（ポライト）',
  '반말 (Casual)': '반말（カジュアル）',
  'Choosing a Level': 'レベルの選び方',
  'Korean Speech Levels Overview': '韓国語の敬語レベル概要',
  '합쇼체 — The Formal Register': '합쇼체 — フォーマルな敬語',
  '합쇼체 Verb Endings (-ㅂ니다/-습니다)': '합쇼체の動詞語尾（-ㅂ니다/-습니다）',
  '해요체 — Everyday Polite Speech': '해요체 — 日常の丁寧語',
  '-아요 / -어요 Pattern': '-아요 / -어요 パターン',
  '반말 — Casual Speech': '반말 — カジュアルな話し方',
  'When to Use 반말 (and When NOT to)': '반말を使う場面（と使ってはいけない場面）',
  '문어체 — Written/Formal Style': '문어체 — 書き言葉スタイル',
  'Speech Level Comparison Chart': '敬語レベル比較表',
  'Mixing Speech Levels — A Common Mistake': '敬語レベルの混用 — よくある間違い',
  '합쇼체 is best described as…': '합쇼체を最もよく表すのは？',
  '해요체 is best described as…': '해요체を最もよく表すのは？',
  "Which form of 'I go' is 해요체 (everyday polite)?": '「行く」の해요체（日常丁寧語）はどれですか？',
  'Which greeting is 반말 (casual)?': '반말（カジュアル）の挨拶はどれですか？',
  "You're talking to a stranger your same age on the street. Which level should you use?": '同年代の見知らぬ人に話しかけるとき、どのレベルを使いますか？',
  '감사합니다 is the ___ form of \'thank you\'': '감사합니다は「ありがとう」の___形です',
  'In a job interview in Korea, which speech level should you use?': '韓国の就職面接ではどの敬語レベルを使いますか？',
  'Speech Levels Complete!': '敬語レベル 完了！',

  // ── Vocab Browser ───────────────────────────────────
  'Vocab Browser': '単語ブラウザ',
  'saved to flashcards': '件フラッシュカードに保存済み',
  'Loading vocabulary…': '読み込み中…',
  'No words match your search.': '検索に一致する単語がありません。',
  'Failed to load vocabulary.': '語彙の読み込みに失敗しました。',
  'Search Korean, English, or romanization…': '韓国語・英語・ローマ字で検索…',
  '★ Add all in category': '★ このカテゴリを全て追加',
  'Verbs': '動詞',
  'Health': '健康',
  'Media': 'メディア',
  'Proverbs': 'ことわざ',
  'Academic': 'アカデミック',
  // ── Progress system (streak / counters / resume) ────
  '✓ Correct!': '✓ 正解！',
  '{n}-day streak': '{n}日連続学習',
  '{n} steps today': '今日 {n} ステップ',
  'Continue': '続きから',
  'Step {n} of {m}': 'ステップ {n} / {m}',
  'Steps completed': '完了したステップ',
  'Words & phrases learned': '学んだ単語・フレーズ',
  'Letters & syllables learned': '学んだ文字・音節',
  'Best streak': '最長連続記録',
  'Progress': '進捗',
  'Reset all progress': '進捗をすべてリセット',
  '🔥 Daily streak + real progress tracking': '🔥 毎日の連続学習 + 本物の進捗トラッキング'
  };
  if (window.LangManager) window.LangManager.register('ja', JA);

window.QUIZ_JA = {
  'What sound does ㅏ make?': { qja: 'ㅏはどんな音ですか？' },
  'What sound does ㅓ make?': { qja: 'ㅓはどんな音ですか？' },
  'What sound does ㅗ make?': { qja: 'ㅗはどんな音ですか？' },
  'What sound does ㅜ make?': { qja: 'ㅜはどんな音ですか？' },
  'What sound does ㅡ make?': { qja: 'ㅡはどんな音ですか？' },
  'What sound does ㅣ make?': { qja: 'ㅣはどんな音ですか？' },
  'What sound does ㅑ make?': { qja: 'ㅑはどんな音ですか？' },
  'What sound does ㅕ make?': { qja: 'ㅕはどんな音ですか？' },
  'What sound does ㅛ make?': { qja: 'ㅛはどんな音ですか？' },
  'What sound does ㅠ make?': { qja: 'ㅠはどんな音ですか？' },
  'Which vowel makes the sound "a"?': { qja: '「a」の音を表す母音はどれですか？' },
  'Which vowel makes the sound "eo"?': { qja: '「eo」の音を表す母音はどれですか？' },
  'What sound does ㅐ make?': { qja: 'ㅐはどんな音ですか？' },
  'What sound does ㅔ make?': { qja: 'ㅔはどんな音ですか？' },
  'What sound does ㅘ make?': { qja: 'ㅘはどんな音ですか？' },
  'What sound does ㅝ make?': { qja: 'ㅝはどんな音ですか？' },
  'What sound does ㅟ make?': { qja: 'ㅟはどんな音ですか？' },
  'What sound does ㅢ make?': { qja: 'ㅢはどんな音ですか？' },
  'Which vowel is formed by combining ㅗ + ㅏ?': { qja: 'ㅗ＋ㅏを合わせた母音はどれですか？' },
  'Which vowel is formed by combining ㅜ + ㅣ?': { qja: 'ㅜ＋ㅣを合わせた母音はどれですか？' },
  'What sound does ㄱ make?': { qja: 'ㄱはどんな音ですか？' },
  'What sound does ㄴ make?': { qja: 'ㄴはどんな音ですか？' },
  'What sound does ㄷ make?': { qja: 'ㄷはどんな音ですか？' },
  'What sound does ㄹ make?': { qja: 'ㄹはどんな音ですか？' },
  'What sound does ㅁ make?': { qja: 'ㅁはどんな音ですか？' },
  'What sound does ㅂ make?': { qja: 'ㅂはどんな音ですか？' },
  'What sound does ㅅ make?': { qja: 'ㅅはどんな音ですか？' },
  'What sound does ㅇ make at the START of a syllable?': { qja: '音節の最初にくる場合、ㅇはどんな音ですか？' },
  'What sound does ㅇ make at the END of a syllable?': { qja: '音節の最後にくる場合、ㅇはどんな音ですか？' },
  'What sound does ㅈ make?': { qja: 'ㅈはどんな音ですか？' },
  'Which is the tensed (double) version of ㄱ?': { qja: 'ㄱの濃音（二重子音）はどれですか？' },
  'Which is the tensed (double) version of ㄷ?': { qja: 'ㄷの濃音はどれですか？' },
  'Which is the tensed (double) version of ㅂ?': { qja: 'ㅂの濃音はどれですか？' },
  'Which is the aspirated version of ㄱ?': { qja: 'ㄱの激音はどれですか？' },
  'Which is the aspirated version of ㄷ?': { qja: 'ㄷの激音はどれですか？' },
  'Which is the aspirated version of ㅂ?': { qja: 'ㅂの激音はどれですか？' },
  'What sound does ㄲ make?': { qja: 'ㄲはどんな音ですか？' },
  'What sound does ㅋ make?': { qja: 'ㅋはどんな音ですか？' },
  'What sound does ㅎ make?': { qja: 'ㅎはどんな音ですか？' },
  'The compound batchim ㄳ is made of which two consonants?': { qja: '複合パッチムㄳはどの二つの子音からできていますか？' },
  '안녕하세요 is read as?': { qja: '안녕하세요はどう読みますか？' },
  'Which word means "love"?': { qja: '「愛・恋」を意味する単語はどれですか？' },
  '감사합니다 is read as?': { qja: '감사합니다はどう読みますか？' },
  'Which word means "school"?': { qja: '「学校」を意味する単語はどれですか？' },
  'What does 물 mean?': { qja: '물はどういう意味ですか？', choicesja: ['水', 'ミルク', 'ご飯', '食べ物'] },
  'What does 밥 mean?': { qja: '밥はどういう意味ですか？', choicesja: ['ご飯・食事', '魚', 'パン', '麺'] },
  'Which word means "person / people"?': { qja: '「人・人々」を意味する単語はどれですか？' },
  '한국 is the Korean word for?': { qja: '한국は何を意味しますか？', choicesja: ['韓国', '日本', '中国', 'アメリカ'] },
  'What does 집 mean?': { qja: '집はどういう意味ですか？', choicesja: ['家', '通り', '街', 'ビル'] },
  'Which word means "friend"?': { qja: '「友達」を意味する単語はどれですか？' },
  'What does 하늘 mean?': { qja: '하늘はどういう意味ですか？', choicesja: ['空', '太陽', '星', '月'] },
  'Which word means "sea / ocean"?': { qja: '「海」を意味する単語はどれですか？' },
  '화이팅 / 파이팅 is an expression meaning?': { qja: '화이팅／파이팅はどういう意味の表現ですか？', choicesja: ['頑張って！／やれる！', '愛してる！', 'おいしい！', 'ありがとう！'] },
  'What does 맛있어요 mean?': { qja: '맛있어요はどういう意味ですか？', choicesja: ['おいしい', 'お腹が空いた', 'お腹がいっぱい', '辛い'] },
  'Which word means "heart / mind"?': { qja: '「心」を意味する単語はどれですか？' },
  'In Hangul syllable blocks, 받침 refers to?': { qja: 'ハングルの音節で、받침とは何を指しますか？', choicesja: ['終声（末尾の子音）', '初声（最初の子音）', '母音', '音節の境界'] },
  'What does 영어 mean?': { qja: '영어はどういう意味ですか？', choicesja: ['英語', '韓国語', '日本語', '中国語'] },
  'Which word means "tree"?': { qja: '「木」を意味する単語はどれですか？' },
  '카메라 is a loanword meaning?': { qja: '카메라は何を意味する外来語ですか？', choicesja: ['カメラ', 'コンピューター', '車', 'カレンダー'] },
  'What does 가방 mean?': { qja: '가방はどういう意味ですか？', choicesja: ['バッグ', '通り', '店', 'テーブル'] },
  'How do you say "Hello" formally?': { qja: '「こんにちは」を丁寧に言うとどれですか？' },
  'What does 감사합니다 mean?': { qja: '감사합니다はどういう意味ですか？', choicesja: ['ありがとうございます（丁寧）', 'すみません', 'どういたしまして', 'こんにちは'] },
  'How do you say "Nice to meet you"?': { qja: '「はじめまして」はどれですか？' },
  'What does 죄송합니다 mean?': { qja: '죄송합니다はどういう意味ですか？', choicesja: ['大変申し訳ございません（丁寧）', 'すみません', 'さようなら', 'お願いします'] },
  'What does 괜찮아요 mean?': { qja: '괜찮아요はどういう意味ですか？', choicesja: ['大丈夫です', 'お腹が空いた', 'ありがとう', 'すみません'] },
  'How do you say "Long time no see"?': { qja: '「久しぶりですね」はどれですか？' },
  '어서 오세요 is said when...?': { qja: '어서 오세요はどんなときに言いますか？', choicesja: ['店や家に人を迎えるとき', 'さようならを言うとき', '相手の調子を聞くとき', '初めて会うとき'] },
  'What does 잘 먹겠습니다 mean?': { qja: '잘 먹겠습니다はどういう意味ですか？', choicesja: ['いただきます（食事前に言う）', 'おいしく食べた', '食べ物をください', 'これはおいしい'] },
  'What does 잘 먹었습니다 mean?': { qja: '잘 먹었습니다はどういう意味ですか？', choicesja: ['ごちそうさまでした（食事後）', '食べるつもりです', 'おいしい', '食べ物をありがとう'] },
  'How do you say "See you again"?': { qja: '「またね」はどれですか？' },
  '안녕히 가세요 is said to...?': { qja: '안녕히 가세요はどんな相手に言いますか？', choicesja: ['去る人に', 'その場に残る人に', '周りの全員に', '道で出会った見知らぬ人に'] },
  '안녕히 계세요 is said when...?': { qja: '안녕히 계세요はどんなときに言いますか？', choicesja: ['自分が去るとき', '相手が去るとき', '朝に挨拶するとき', '新しい人に会うとき'] },
  'What does 수고하세요 mean?': { qja: '수고하세요はどういう意味ですか？', choicesja: ['お疲れ様です／頑張ってください', 'どういたしまして', '申し訳ありません', 'おめでとうございます'] },
  '천만에요 means?': { qja: '천만에요はどういう意味ですか？', choicesja: ['どういたしまして', 'ありがとう', 'わかりました', 'もちろん'] },
  'How do you say "How have you been?"?': { qja: '「最近どうですか？」はどれですか？' },
  '처음 뵙겠습니다 is a formal phrase used when?': { qja: '처음 뵙겠습니다はどんなときに使う丁寧な表現ですか？', choicesja: ['初めて人に会うとき', '仲の良い友達に会うとき', '丁寧にさようならを言うとき', '電話に出るとき'] },
  'What does 잘 부탁드립니다 mean?': { qja: '잘 부탁드립니다はどういう意味ですか？', choicesja: ['よろしくお願いします', 'さようなら', 'またね', '本当にありがとうございます'] },
  '고마워요 is which speech level?': { qja: '고마워요はどんな語調ですか？', choicesja: ['丁寧なカジュアル（해요体）', '丁寧な公式体（합쇼体）', 'タメ口（반말）', '敬語（존칭）'] },
  'What does 미안해요 mean?': { qja: '미안해요はどういう意味ですか？', choicesja: ['ごめんなさい（丁寧）', 'ありがとう', 'どういたしまして', 'すみません'] },
  '네 / 아니요 means?': { qja: '네／아니요はどういう意味ですか？', choicesja: ['はい／いいえ', 'こんにちは／さようなら', 'お願い／ありがとう', '知ってる／知らない'] },
  'What is the Sino-Korean word for "one"?': { qja: '「一」を表す漢字系韓国語は？' },
  'What is the native Korean word for "two"?': { qja: '「ふたつ」を表す固有韓国語は？' },
  'What is the Sino-Korean word for "ten"?': { qja: '「十」を表す漢字系韓国語は？' },
  'What is the native Korean word for "three"?': { qja: '「みっつ」を表す固有韓国語は？' },
  'What is the Sino-Korean word for "hundred"?': { qja: '「百」を表す漢字系韓国語は？' },
  'When counting hours on a clock, which number system is used?': { qja: '時計で時間を数えるとき、どの数詞を使いますか？', choicesja: ['固有韓国語（하나, 둘...）', '漢字系韓国語（일, 이...）', 'どちらでもよい', 'どちらでもない'] },
  'When talking about money (price), which number system is used?': { qja: 'お金（値段）を言うとき、どの数詞を使いますか？', choicesja: ['漢字系韓国語（일, 이...）', '固有韓国語（하나, 둘...）', 'どちらでもよい', '決まりはない'] },
  'How does a MALE speaker say "older brother"?': { qja: '男性が「お兄さん（兄）」を呼ぶときはどれですか？' },
  'How does a FEMALE speaker say "older brother"?': { qja: '女性が「お兄さん（兄）」を呼ぶときはどれですか？' },
  'How does a FEMALE speaker say "older sister"?': { qja: '女性が「お姉さん（姉）」を呼ぶときはどれですか？' },
  'How does a MALE speaker say "older sister"?': { qja: '男性が「お姉さん（姉）」を呼ぶときはどれですか？' },
  'What is the Korean word for "grandmother"?': { qja: '韓国語で「祖母（おばあさん）」は？' },
  'What does 남동생 mean?': { qja: '남동생はどういう意味ですか？', choicesja: ['弟', '兄', '妹', 'おじ'] },
  'What does 여동생 mean?': { qja: '여동생はどういう意味ですか？', choicesja: ['妹', '姉', '姪', 'いとこ（女性）'] },
  'What is the Sino-Korean number for "four"?': { qja: '「四」を表す漢字系韓国語は？' },
  'What is the native Korean word for "ten"?': { qja: '「とお」を表す固有韓国語は？' },
  'What does 아버지 / 아빠 mean?': { qja: '아버지／아빠はどういう意味ですか？', choicesja: ['父／お父さん', '母／お母さん', '祖父', 'おじ'] },
  'What does 이모 mean?': { qja: '이모はどういう意味ですか？', choicesja: ['叔母（母方）', '叔母（父方）', 'おじ', '祖母'] },
  'What does 삼촌 mean?': { qja: '삼촌はどういう意味ですか？', choicesja: ['おじ（父方）', 'おじ（母方）', 'いとこ', '甥'] },
  'What is the Sino-Korean word for "ten thousand"?': { qja: '「一万」を表す漢字系韓国語は？' },
  '나___ 학생이에요. (I am a student — topic marker)': { qja: '나___ 학생이에요。（私は学生です — 主題を表す助詞）' },
  '비___ 와요. (The rain is coming — subject marker)': { qja: '비___ 와요。（雨が来る — 主語を表す助詞）' },
  '밥___ 먹어요. (I eat rice — object marker)': { qja: '밥___ 먹어요。（ご飯を食べる — 目的語を表す助詞）' },
  '학교___ 가요. (I go to school — direction/destination)': { qja: '학교___ 가요。（学校へ行く — 方向を表す助詞）' },
  '학교___ 공부해요. (I study at school — location of action)': { qja: '학교___ 공부해요。（学校で勉強する — 場所を表す助詞）' },
  '나___ 친구 (my friend — possessive)': { qja: '나___ 친구（私の友達 — 所有を表す助詞）' },
  '사과___ 바나나 (apple AND banana — noun connector)': { qja: '사과___ 바나나（リンゴとバナナ — 名詞をつなぐ助詞）' },
  '은/는 is the ___ marker': { qja: '은/는は___マーカーです', choicesja: ['主題', '主語', '目的語', '場所'] },
  '이/가 is the ___ marker': { qja: '이/가は___マーカーです', choicesja: ['主語', '主題', '目的語', '方向'] },
  '을/를 is the ___ marker': { qja: '을/를は___マーカーです', choicesja: ['目的語', '主語', '主題', '所有'] },
  'Which particle marks a direction or destination?': { qja: '方向や目的地を表す助詞はどれですか？' },
  'Which particle marks WHERE an action takes place?': { qja: '動作が行われる場所を表す助詞はどれですか？' },
  '친구___ 만났어요. (I met WITH a friend)': { qja: '친구___ 만났어요。（友達に会った — 対象を表す助詞）' },
  '엄마___ 물었어요. (I asked Mom — to a person)': { qja: '엄마___ 물었어요。（お母さんに聞いた — 人への助詞）' },
  '친구___ 선물을 받았어요. (I received a gift FROM a friend)': { qja: '친구___ 선물을 받았어요。（友達からプレゼントをもらった）' },
  'When do you use 은 vs 는?': { qja: '은と는はどう使い分けますか？', choicesja: ['子音の後は은、母音の後は는', '子音の後は는、母音の後は은', '常に入れ替えられる', '丁寧さによって異なる'] },
  'When do you use 이 vs 가?': { qja: '이と가はどう使い分けますか？', choicesja: ['子音の後は이、母音の後は가', '子音の後は가、母音の後は이', '이はより丁寧', '가はより丁寧'] },
  'When do you use 을 vs 를?': { qja: '을と를はどう使い分けますか？', choicesja: ['子音の後は을、母音の後は를', '子音の後は를、母音の後は을', '을はより丁寧', '違いはない'] },
  '버스___ 가요. (I go BY bus — method/means)': { qja: '버스___ 가요。（バスで行く — 手段を表す助詞）' },
  'The particle -도 can mean?': { qja: '助詞-도はどういう意味ですか？', choicesja: ['〜も・〜さえ', '〜と・一緒に', '〜から', '〜まで'] },
  'Which word means "hospital"?': { qja: '「病院」を意味する単語はどれですか？' },
  'What does 슬프다 mean?': { qja: '슬프다はどういう意味ですか？', choicesja: ['悲しい', '嬉しい', '怒っている', '怖い'] },
  'Which word means "restaurant"?': { qja: '「食堂・レストラン」を意味する単語はどれですか？' },
  'What does 빨간색 mean?': { qja: '빨간색はどういう意味ですか？', choicesja: ['赤', '青', '黄色', '緑'] },
  'Which word means "airport"?': { qja: '「空港」を意味する単語はどれですか？' },
  'What does 무섭다 mean?': { qja: '무섭다はどういう意味ですか？', choicesja: ['怖い', '怒っている', '悲しい', '驚いた'] },
  'Which word means "pharmacy"?': { qja: '「薬局」を意味する単語はどれですか？' },
  'What does 피곤하다 mean?': { qja: '피곤하다はどういう意味ですか？', choicesja: ['疲れている', 'お腹が空いた', 'お腹がいっぱい', '具合が悪い'] },
  'What does 파란색 mean?': { qja: '파란색はどういう意味ですか？', choicesja: ['青', '緑', '紫', '赤'] },
  'Which body part is 눈?': { qja: '눈は体のどの部分ですか？', choicesja: ['目', '耳', '鼻', '口'] },
  'Which body part is 입?': { qja: '입は体のどの部分ですか？', choicesja: ['口', '目', '手', '足'] },
  'What does 배고프다 mean?': { qja: '배고프다はどういう意味ですか？', choicesja: ['お腹が空いた', 'お腹がいっぱい', '疲れている', '喉が渇いた'] },
  'Which word means "train station"?': { qja: '「駅」を意味する単語はどれですか？' },
  'What does 기쁘다 mean?': { qja: '기쁘다はどういう意味ですか？', choicesja: ['嬉しい・喜んでいる', '悲しい', '怒っている', '驚いた'] },
  'Which word is "green" in Korean?': { qja: '韓国語で「緑色」はどれですか？' },
  'What does 배부르다 mean?': { qja: '배부르다はどういう意味ですか？', choicesja: ['お腹がいっぱい（食後）', 'お腹が空いた', '喉が渇いた', '疲れている'] },
  '손 refers to which body part?': { qja: '손は体のどの部分ですか？', choicesja: ['手', '足', '腕', '脚'] },
  'Which word means "bookstore"?': { qja: '「本屋」を意味する単語はどれですか？' },
  'What does 화나다 mean?': { qja: '화나다はどういう意味ですか？', choicesja: ['怒る', '嬉しい', '悲しい', '怖い'] },
  'Which word is "yellow" in Korean?': { qja: '韓国語で「黄色」はどれですか？' },
  'Polite present form of 가다 (to go)?': { qja: '가다（行く）の丁寧な現在形は？' },
  'Formal present form of 먹다 (to eat)?': { qja: '먹다（食べる）の公式な現在形は？' },
  'Past tense (polite) of 가다?': { qja: '가다の丁寧な過去形は？' },
  'Past tense (polite) of 먹다?': { qja: '먹다の丁寧な過去形は？' },
  'Future tense of 가다?': { qja: '가다の未来形は？' },
  'Present progressive of 먹다?': { qja: '먹다の現在進行形は？' },
  'Polite present of 오다 (to come)?': { qja: '오다（来る）の丁寧な現在形は？' },
  'Korean dictionary form verbs always end in?': { qja: '韓国語の辞書形の動詞は常に何で終わりますか？' },
  '공부하다 (to study) in polite present is?': { qja: '공부하다（勉強する）の丁寧な現在形は？' },
  'Polite present tense uses which ending?': { qja: '丁寧な現在形はどんな語尾を使いますか？' },
  '마시다 (to drink) in polite present is?': { qja: '마시다（飲む）の丁寧な現在形は？' },
  '하다 verbs in polite present use?': { qja: 'ハダ動詞の丁寧な現在形は？' },
  'The polite past tense ending is?': { qja: '丁寧な過去形の語尾は？' },
  '자다 (to sleep) in polite present is?': { qja: '자다（寝る）の丁寧な現在形は？' },
  'Which verb ending shows an ONGOING action?': { qja: '進行中の動作を示す動詞語尾はどれですか？' },
  '배우다 (to learn) in polite present is?': { qja: '배우다（学ぶ）の丁寧な現在形は？' },
  'Casual (반말) form of 가요 is?': { qja: '가요のタメ口（반말）形は？' },
  'Which marker indicates the formal/written style?': { qja: '公式・書き言葉スタイルを示す語尾はどれですか？' },
  '좋아하다 (to like) in polite present is?': { qja: '좋아하다（好きだ）の丁寧な現在形は？' },
  '오다 (to come) in past tense (polite) is?': { qja: '오다の丁寧な過去形は？' },
  '"Seoul is bigger than Busan" in Korean is?': { qja: '「ソウルは釜山より大きい」は韓国語でどれですか？' },
  'Polite imperative of 앉다 (to sit) is?': { qja: '앉다（座る）の丁寧な命令形は？' },
  '걱정하지 마세요 means?': { qja: '걱정하지 마세요はどういう意味ですか？', choicesja: ['心配しないでください', '心配してください', '心配していますか？', '私は心配していない'] },
  '공부하는 것이 재미있어요 means?': { qja: '공부하는 것이 재미있어요はどういう意味ですか？', choicesja: ['勉強は楽しい', '勉強はつまらない', '勉強を楽しんでいる', '一緒に勉強しよう'] },
  'Which connector means "therefore / so"?': { qja: '「だから・そのため」を意味するつなぎ言葉はどれですか？' },
  'Which connector means "but / however"?': { qja: '「でも・しかし」を意味するつなぎ言葉はどれですか？' },
  '아직 먹고 있어요 means?': { qja: '아직 먹고 있어요はどういう意味ですか？', choicesja: ['まだ食べている', 'もう食べた', 'もう食べていない', '今から食べる'] },
  '벌써 끝났어요 means?': { qja: '벌써 끝났어요はどういう意味ですか？', choicesja: ['もう終わった', 'まだ終わっていない', 'ちょうど終わるところ', 'もうすぐ終わる'] },
  'The pattern -(으)로 can express?': { qja: 'パターン-(으)로は何を表しますか？', choicesja: ['方向・手段・材料', '時間・場所・理由', '主語または主題', '比較'] },
  '버스로 가요 means?': { qja: '버스로 가요はどういう意味ですか？', choicesja: ['バスで行く', 'バスのところへ行く', 'バスがそこへ行く', 'バスで到着した'] },
  '한국어를 잘해요 means?': { qja: '한국어를 잘해요はどういう意味ですか？', choicesja: ['韓国語が上手です', '韓国語を勉強しています', '韓国語を学んでいます', '韓国語が好きです'] },
  '수영을 못해요 means?': { qja: '수영을 못해요はどういう意味ですか？', choicesja: ['泳げない', '泳ぎたくない', '泳ぐのが苦手', '泳がない'] },
  'The pattern -는 것 turns a verb into a?': { qja: 'パターン-는 것は動詞を何に変えますか？', choicesja: ['名詞（動名詞）', '形容詞', '副詞', '別の動詞形'] },
  '더 주세요 means?': { qja: '더 주세요はどういう意味ですか？', choicesja: ['もっとください', '全部ください', 'やめてください', 'これ以上いらない'] },
  '다 먹었어요 means?': { qja: '다 먹었어요はどういう意味ですか？', choicesja: ['全部食べた', '食べなかった', '少し食べた', '今食べている'] },
  '누군가 means?': { qja: '누군가はどういう意味ですか？', choicesja: ['誰か', '何か', 'どこか', 'いつか'] },
  '어딘가 means?': { qja: '어딘가はどういう意味ですか？', choicesja: ['どこか', '誰か', 'いつか', '何か'] },
  'The pattern -보다 더 expresses?': { qja: 'パターン-보다 더は何を表しますか？', choicesja: ['比較（〜より〜の方が）', '対比（でも）', '付加（〜も）', '能力（できる）'] },
  '좋다 is used for?': { qja: '좋다はどんな場合に使いますか？', choicesja: ['何かが良い・素敵な状態を表す', '何かや誰かを積極的に好む', '何かを欲しいと思う', '一方を好む'] },
  '좋아하다 is used for?': { qja: '좋아하다はどんな場合に使いますか？', choicesja: ['何かや誰かを積極的に好む', '何かが良い状態を表す', '感情的に良い気分', '何かを好む'] },
  'What does the proverb 백지장도 맞들면 낫다 mean?': { qja: 'ことわざ「백지장도 맞들면 낫다」の意味は？', choicesja: ['三人寄れば文殊の知恵', '三人寄ると内輪もめ', '文は武より強し', '去る者は日々に疎し'] },
  '아이쇼핑 (Konglish) means?': { qja: '아이쇼핑（コングリッシュ）はどういう意味ですか？', choicesja: ['ウィンドウショッピング', '目薬', '子ども向けショッピング', 'ネットショッピング'] },
  'The idiom 발이 넓다 (lit. "wide feet") means?': { qja: 'イディオム「발이 넓다（足が広い）」の意味は？', choicesja: ['顔が広い・人脈がある', 'よく歩く', '不器用', 'とても忙しい'] },
  '핸드폰 (Konglish) refers to?': { qja: '핸드폰（コングリッシュ）は何を指しますか？', choicesja: ['携帯電話', '携帯型ゲーム機', 'ヘッドフォン', '固定電話'] },
  'The proverb 가는 말이 고와야 오는 말이 곱다 means?': { qja: 'ことわざ「가는 말이 고와야 오는 말이 곱다」の意味は？', choicesja: ['人にされたいようにしなさい', '第一印象が大事', '行動は言葉より雄弁', '沈黙は金'] },
  '오피스텔 (Konglish) refers to?': { qja: '오피스텔（コングリッシュ）は何を指しますか？', choicesja: ['オフィステル（小型住居ユニット）', 'オフィス付きホテル', '大型オフィスビル', 'マンション'] },
  'The idiom 눈이 높다 (lit. "high eyes") means?': { qja: 'イディオム「눈이 높다（目が高い）」の意味は？', choicesja: ['目が高い・基準が高い', '傲慢である', '先を見通す', '観察力が鋭い'] },
  '파이팅 / 화이팅 is best described as?': { qja: '파이팅／화이팅を最もよく表すのはどれですか？', choicesja: ['「頑張れ！」を意味する応援の言葉', '軍の命令', '怒りの表現', '公式な挨拶'] },
  'The academic term 민주주의 means?': { qja: '学術用語「민주주의」の意味は？', choicesja: ['民主主義', '共産主義', '資本主義', '民族主義'] },
  'The idiom 손이 크다 (lit. "big hands") means?': { qja: 'イディオム「손이 크다（手が大きい）」の意味は？', choicesja: ['気前が良い・たっぷり与える', '手先が器用', '不器用', '懸命に働く'] },
  '매너있다 (Konglish) means?': { qja: '매너있다（コングリッシュ）はどういう意味ですか？', choicesja: ['礼儀正しい', 'センスが良い', 'トレンディ', '人気がある'] },
  'The academic term 경제 means?': { qja: '学術用語「경제」の意味は？', choicesja: ['経済', '社会', '文化', '政治'] },
  'The idiom 배보다 배꼽이 더 크다 means?': { qja: 'イディオム「배보다 배꼽이 더 크다」の意味は？', choicesja: ['本末転倒（枝葉が本質より大きい）', '稼ぐより使う方が多い', '恩知らず', '大局が見えていない'] },
  '원샷 (Konglish) in drinking culture means?': { qja: '원샷（コングリッシュ）は飲み文化でどういう意味ですか？', choicesja: ['一気飲み', '1杯だけ', '最初の乾杯', '乾杯'] },
  'The proverb 세 살 버릇 여든까지 간다 means?': { qja: 'ことわざ「세 살 버릇 여든까지 간다」の意味は？', choicesja: ['三つ子の魂百まで', '学ぶに遅すぎることはない', '継続は力なり', '遅くてもやらないよりまし'] },
  '글로벌 (Konglish) means?': { qja: '글로벌（コングリッシュ）はどういう意味ですか？', choicesja: ['グローバル・世界的な', '大学院', '輝いている', '光沢のある'] },
  'The idiom 귀가 얇다 (lit. "thin ears") means?': { qja: 'イディオム「귀가 얇다（耳が薄い）」の意味は？', choicesja: ['人の意見に流されやすい', '聞き上手', 'とても繊細', '耳が遠い'] },
  'The academic word 사회 means?': { qja: '学術語「사회」の意味は？', choicesja: ['社会', '会社', '歴史', '理科・科学'] },
  '아르바이트 (from German Arbeit) means in Korean?': { qja: '아르바이트（ドイツ語のArbeitから）は韓国語でどういう意味ですか？', choicesja: ['アルバイト・パートタイム', 'ボランティア', 'インターンシップ', '正社員雇用'] },
  'The idiom 간이 크다 (lit. "big liver") means?': { qja: 'イディオム「간이 크다（肝が大きい）」の意味は？', choicesja: ['度胸がある・大胆', '自己中心的', 'とても健康', 'たくさん食べる'] },

  '4 stages with listen-and-repeat audio and quizzes throughout': '全ステージに音声リピートとクイズを搭載した4段階構成',

  // ── Nouns page — lesson header ─────────────────────────────
  '🏠 Beginner · Lesson 5': '🏠 初級 · レッスン 5',
  'Common Nouns': '一般名詞',
  'Master people, family, place, time, and object nouns in Korean': '韓国語の人・家族・場所・時間・物の名詞をマスターしよう',
  'Learn how Korean counters (개, 명, 잔) work with numbers': '韓国語の助数詞（개・명・잔）と数字の組み合わせを学ぼう',
  'Understand the possessive marker 의 and polite vs casual forms': '所有格助詞의と丁寧・カジュアル形の違いを理解しよう',

  // ── Nouns page — stage names ───────────────────────────────
  'People & Family': '人・家族',
  'Places & Time': '場所・時間',
  'Objects & Counters': '物・助数詞',
  'Possessives': '所有格・まとめ',

  // ── Nouns page — reading card titles ──────────────────────
  'Korean Nouns (명사)': '韓国語の名詞（명사）',
  'Family Nouns (가족 명사)': '家族の名詞（가족 명사）',
  'Place Nouns (장소 명사)': '場所の名詞（장소 명사）',
  'Time Nouns (시간 명사)': '時間の名詞（시간 명사）',
  'Object Nouns (사물 명사)': '物の名詞（사물 명사）',
  'Korean Counters (수사)': '韓国語の助数詞（수사）',
  'Possessive Marker 의': '所有格助詞 의',

  // ── Nouns page — quiz prompts ──────────────────────────────
  "Which word means 'friend'?": '「友達」を意味する単語はどれですか？',
  "Which word means 'school'?": '「学校」を意味する単語はどれですか？',
  "Which word means 'today'?": '「今日」を意味する単語はどれですか？',
  "Which word means 'money'?": '「お金」を意味する単語はどれですか？',
  'Which counter is used for people (counting persons)?': '人を数えるときに使う助数詞はどれですか？',
  "How do you say 'my bag' in polite Korean?": '丁寧な韓国語で「私のバッグ」はどれですか？',
  '의 is the Korean possessive marker. What does it correspond to in English?': '의は韓国語の所有格助詞です。英語の何に相当しますか？',

  // ── Nouns page — complete ─────────────────────────────────
  'Nouns Complete!': '名詞 完了！',

  // ── Pronouns page — lesson header ──────────────────────────
  '👥 Beginner · Lesson 4': '👥 初級 · レッスン 4',
  'Learn polite 저 vs casual 나, and why Korean often drops pronouns entirely': '丁寧な저とカジュアルな나の違いと、代名詞が省略される理由を学ぼう',
  'Understand why 당신 is rarely used and how to address people naturally': '당신がほとんど使われない理由と自然な呼びかけ方を理解しよう',
  'Master 우리 (our/my), demonstratives (이것·그것·저것), and question words': 'うり（우리）・指示代名詞（이것・그것・저것）・疑問詞をマスターしよう',

  // ── Pronouns page — stage names ───────────────────────────
  'First & Second Person': '1・2人称',
  'Third Person & We': '3人称・우리',
  'Demonstratives': '指示代名詞',
  'Question Pronouns': '疑問代名詞',

  // ── Pronouns page — reading card titles ───────────────────
  'Korean Pronouns Overview': '韓国語の代名詞 概要',
  "Saying 'You' in Korean": '韓国語での「あなた」の言い方',
  'Third Person & We (그·그녀·우리)': '3人称・우리（그・그녀・우리）',
  'Demonstrative Pronouns (이·그·저)': '指示代名詞（이・그・저）',
  'Question Pronouns (의문대명사)': '疑問代名詞（의문대명사）',

  // ── Pronouns page — quiz prompts ──────────────────────────
  "Which pronoun is the polite form of 'I'?": '「私」の丁寧な形はどれですか？',
  "Why do Koreans rarely say 당신 in conversation?": '韓国人が会話でめったに당신を使わない理由は？',
  '우리 엄마 literally means \'our mom\' but is used to mean…': 'うり엄마は文字通り「私たちのお母さん」ですが、実際には何を意味しますか？',
  "Which form of 'we' is more humble and polite, used toward seniors?": 'どちらの「私たち」がより謙譲的で、目上の人に使いますか？',
  'Which demonstrative refers to something far from BOTH the speaker AND the listener?': '話者・聞き手両方から遠いものを指す指示代名詞はどれですか？',
  '저것 is the formal version. What is the casual version?': '저것のカジュアルな形はどれですか？',
  "Which question pronoun means 'who'?": '「誰」を意味する疑問代名詞はどれですか？',

  // ── Pronouns page — complete ──────────────────────────────
  'Pronouns Complete!': '代名詞 完了！',

  // ── Emotions page — lesson header ──────────────────────────
  '😊 Intermediate · Lesson 7': '😊 中級 · レッスン 7',
  'Expressing Emotions': '感情を表現する',
  'Learn how Korean emotion adjectives conjugate directly — no \'am/is/are\' needed': '韓国語の感情形容詞が直接活用する方法を学ぼう（be動詞不要）',
  'Discover culturally unique Korean emotion words like 그립다, 뿌듯하다, and 설레다': '그립다・뿌듯하다・설레다など文化固有の感情語を学ぼう',
  'Master key emotion phrases: 보고 싶어요, 감동받았어요, 괜찮아요': '重要な感情表現フレーズ「보고 싶어요」「감동받았어요」「괜찮아요」をマスターしよう',

  // ── Emotions page — stage names ───────────────────────────
  'Core Emotions': '基本感情',
  'Expressing Feelings': '感情の表現',
  'Complex Emotions': '複雑な感情',
  'Emotional Phrases': '感情のフレーズ',

  // ── Emotions page — reading card titles ───────────────────
  'Emotions in Korean (감정)': '韓国語の感情（감정）',
  'Conjugating Emotion Adjectives': '感情形容詞の活用',
  'More Feeling Words (감정 어휘)': 'さらなる感情語（감정 어휘）',
  '기분 — Mood & Feeling': '기분 — 気分と感情',
  'Deeper Emotions (깊은 감정)': '深い感情（깊은 감정）',
  'Common Emotional Sentence Patterns': '感情を表す定番の文パターン',

  // ── Emotions page — quiz prompts ──────────────────────────
  "Which word means 'to be happy'?": '「幸せだ」を意味する単語はどれですか？',
  "Which word means 'to be tired'?": '「疲れている」を意味する単語はどれですか？',
  '기분이 좋아요 means…': '기분이 좋아요はどういう意味ですか？',
  '그립다 means…': '그립다はどういう意味ですか？',
  '뿌듯하다 means…': '뿌듯하다はどういう意味ですか？',
  '보고 싶어요 means…': '보고 싶어요はどういう意味ですか？',

  // ── Emotions page — complete ──────────────────────────────
  'Emotions Complete!': '感情 完了！',

  // ── Shopping page — lesson header ──────────────────────────
  '🛒 Intermediate · Lesson 8': '🛒 中級 · レッスン 8',
  'Shopping Phrases': '買い物フレーズ',
  'Learn Korean store vocabulary — 가게, 시장, 백화점, 편의점': '韓国語の店舗語彙「가게・시장・백화점・편의점」を学ぼう',
  'Master the two most useful phrases: 얼마예요? and 이거 주세요': '最も便利な2つのフレーズ「얼마예요?」「이거 주세요」をマスターしよう',
  'Understand prices in 원 (won) and how to bargain at traditional markets': 'ウォン（원）での価格表現と伝統市場での値引き交渉を理解しよう',
  '4 stages covering vocabulary, in-store phrases, prices, and payment': '語彙・店内フレーズ・価格・支払いを扱う4ステージ',

  // ── Shopping page — stage names ───────────────────────────
  'Shopping Vocabulary': 'ショッピング語彙',
  'In the Store': '店内で',
  'Prices & Numbers': '価格・数字',
  'Transactions': '取引・まとめ',

  // ── Shopping page — reading card titles ───────────────────
  'Shopping in Korea (쇼핑)': '韓国でのショッピング（쇼핑）',
  'Shopping Item Words (쇼핑 물건)': 'ショッピング品物語（쇼핑 물건）',
  'Key Shopping Phrases (쇼핑 표현)': '重要なショッピングフレーズ（쇼핑 표현）',
  'Asking About Availability (있어요? / 없어요)': 'あるかどうか聞く（있어요? / 없어요）',
  'Korean Money & Prices (원)': '韓国のお金と価格（원）',
  'Payment Methods (결제 방법)': '支払い方法（결제 방법）',

  // ── Shopping page — quiz prompts ──────────────────────────
  "Which word means 'market' (traditional outdoor market)?": '「市場（伝統的な屋外市場）」を意味する単語はどれですか？',
  "How do you ask 'How much is it?' in Korean?": '韓国語で「いくらですか？」はどれですか？',
  '없어요 means…': '없어요はどういう意味ですか？',
  '비싸다 means…': '비싸다はどういう意味ですか？',
  "Which word means 'change' (money returned to you after paying)?": '「お釣り」を意味する単語はどれですか？',
  "How do you say 'I'll pay by card'?": '「カードで支払います」はどれですか？',

  // ── Shopping page — complete ──────────────────────────────
  'Shopping Complete!': 'ショッピング 完了！',

  // ── Speech Levels page — lesson header ─────────────────────
  '🗣️ Intermediate · Lesson 6': '🗣️ 中級 · レッスン 6',
  'Formal vs Informal': 'フォーマル vs インフォーマル',
  'Learn the 4 Korean speech levels: formal 합쇼체, polite 해요체, casual 반말, written 문어체': '韓国語の4つの敬語レベルを学ぼう：合쇼체・해요체・반말・문어체',
  'Understand when to use each level — who you\'re talking to and why it matters': 'どのレベルをいつ使うか——相手と理由を理解しよう',
  'Compare the same phrases across all levels side by side': '同じフレーズを全レベルで並べて比較しよう',

  // ── Speech Levels page — stage names ──────────────────────
  '합쇼체 (Formal)': '합쇼체（フォーマル）',
  '해요체 (Polite)': '해요체（ポライト）',
  '반말 (Casual)': '반말（カジュアル）',
  'Choosing a Level': 'レベルの選び方',

  // ── Speech Levels page — reading card titles ───────────────
  'Korean Speech Levels Overview': '韓国語の敬語レベル概要',
  '합쇼체 — The Formal Register': '합쇼체 — フォーマルな敬語',
  '합쇼체 Verb Endings (-ㅂ니다/-습니다)': '합쇼체の動詞語尾（-ㅂ니다/-습니다）',
  '해요체 — Everyday Polite Speech': '해요체 — 日常の丁寧語',
  '-아요 / -어요 Pattern': '-아요 / -어요 パターン',
  '반말 — Casual Speech': '반말 — カジュアルな話し方',
  'When to Use 반말 (and When NOT to)': '반말を使う場面（と使ってはいけない場面）',
  '문어체 — Written/Formal Style': '문어체 — 書き言葉スタイル',
  'Speech Level Comparison Chart': '敬語レベル比較表',
  'Mixing Speech Levels — A Common Mistake': '敬語レベルの混用 — よくある間違い',

  // ── Speech Levels page — quiz prompts ─────────────────────
  '합쇼체 is best described as…': '합쇼체を最もよく表すのは？',
  '해요체 is best described as…': '해요체を最もよく表すのは？',
  "Which form of 'I go' is 해요체 (everyday polite)?": '「行く」の해요체（日常丁寧語）はどれですか？',
  'Which greeting is 반말 (casual)?': '반말（カジュアル）の挨拶はどれですか？',
  "You're talking to a stranger your same age on the street. Which level should you use?": '同年代の見知らぬ人に話しかけるとき、どのレベルを使いますか？',
  '감사합니다 is the ___ form of \'thank you\'': '감사합니다は「ありがとう」の___形です',
  'In a job interview in Korea, which speech level should you use?': '韓国の就職面接ではどの敬語レベルを使いますか？',

  // ── Speech Levels page — complete ─────────────────────────
  'Speech Levels Complete!': '敬語レベル 完了！',
};

})();
