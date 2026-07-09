# Article Vocabulary Input

Fill in the vocabulary entries below, then copy each JSON array into Supabase → `articles` table → `vocabulary` column for the corresponding `uid`.

**Vocabulary item schema:**
```json
{
  "word": "한글 단어",
  "reading": "romanization",
  "part_of_speech": "noun | verb | adjective | phrase",
  "definition_en": "concise English definition",
  "example_ko": "짧은 한국어 예문.",
  "example_en": "English translation of the example."
}
```

---

## 1. uid: `0ef27c6d-595c-4ddd-a95a-f048a25d1626`

**Title (EN):** K-Fashion Goes Global: Seoul Becomes the World's Fifth Fashion Capital  
**Title (KO):** K-패션 세계로: 서울, 글로벌 패션 중심지로 부상

**Korean content excerpt:**
> 서울은 세계 주요 패션 도시 중 하나로 자리를 굳혔습니다. K팝의 강력한 글로벌 영향력이 한국을 세계 '다섯 번째 패션 수도'로 만드는 데 핵심적인 역할을 했습니다. ... 수십 년에 걸친 아이돌 문화와 뮤직비디오 미학이 만들어낸 서울의 스트리트 패션은 독특하면서도 세계 곳곳에서 모방되고 있습니다.

**Suggested words to define:** 패션 수도, 영향력, 미학, 스트리트 패션, 부상

**vocabulary JSON (paste into Supabase):**
```json
[
  {
    "word": "패션 수도",
    "reading": "pa-syeon su-do",
    "part_of_speech": "noun",
    "definition_en": "fashion capital; a city recognized as a global center of fashion",
    "example_ko": "서울은 세계 다섯 번째 패션 수도로 불립니다.",
    "example_en": "Seoul is called the world's fifth fashion capital."
  },
  {
    "word": "영향력",
    "reading": "yeong-hyang-nyeok",
    "part_of_speech": "noun",
    "definition_en": "influence; the power to affect people or events",
    "example_ko": "K팝은 전 세계적으로 큰 영향력을 가지고 있습니다.",
    "example_en": "K-pop has great influence around the world."
  },
  {
    "word": "미학",
    "reading": "mi-hak",
    "part_of_speech": "noun",
    "definition_en": "aesthetics; a visual style or sense of beauty",
    "example_ko": "뮤직비디오의 미학이 패션 트렌드에 영향을 줍니다.",
    "example_en": "The aesthetics of music videos influence fashion trends."
  },
  {
    "word": "부상",
    "reading": "bu-sang",
    "part_of_speech": "noun",
    "definition_en": "rise; emergence to a prominent position",
    "example_ko": "서울이 글로벌 패션 도시로 부상하고 있습니다.",
    "example_en": "Seoul is rising as a global fashion city."
  },
  {
    "word": "모방하다",
    "reading": "mo-bang-ha-da",
    "part_of_speech": "verb",
    "definition_en": "to imitate; to copy a style or behavior",
    "example_ko": "한국 패션이 세계 곳곳에서 모방되고 있습니다.",
    "example_en": "Korean fashion is being imitated all over the world."
  }
]
```

---

## 2. uid: `1d218580-40b1-4d17-a36a-980f75109335`

**Title (EN):** K-Fashion and K-Beauty Take the Global Spotlight in 2026  
**Title (KO):** K패션과 K뷰티, 세계 무대 중심에 서다

**Korean content excerpt:**
> 보그 아라비아는 최근 서울을 세계 '5번째 패션 수도'라고 표현하며... 해외 언론은 한국의 소규모 독립 브랜드들에도 주목하고 있습니다. ... 로컬 브랜드들은 현대적인 디자인과 한국의 문화적 뿌리를 결합한 독창성을 보여줍니다.

**Suggested words to define:** 독창성, 강세, 광채, 독립 브랜드, 뿌리

**vocabulary JSON (paste into Supabase):**
```json
[
  {
    "word": "독창성",
    "reading": "dok-chang-seong",
    "part_of_speech": "noun",
    "definition_en": "originality; the quality of being creative and unique",
    "example_ko": "이 브랜드는 독창성으로 유명합니다.",
    "example_en": "This brand is famous for its originality."
  },
  {
    "word": "강세",
    "reading": "gang-se",
    "part_of_speech": "noun",
    "definition_en": "strong showing; dominance or upward momentum (often used in market/trend contexts)",
    "example_ko": "K뷰티 시장은 계속 강세를 이어가고 있습니다.",
    "example_en": "The K-beauty market continues its strong momentum."
  },
  {
    "word": "광채",
    "reading": "gwang-chae",
    "part_of_speech": "noun",
    "definition_en": "radiance; a glowing, luminous quality (often used for skin)",
    "example_ko": "K뷰티는 피부 광채를 중요하게 생각합니다.",
    "example_en": "K-beauty places great importance on skin radiance."
  },
  {
    "word": "주목하다",
    "reading": "ju-mok-ha-da",
    "part_of_speech": "verb",
    "definition_en": "to pay attention to; to take notice of",
    "example_ko": "해외 언론이 한국 브랜드에 주목하고 있습니다.",
    "example_en": "Foreign media is paying attention to Korean brands."
  },
  {
    "word": "문화적 뿌리",
    "reading": "mun-hwa-jeok ppu-ri",
    "part_of_speech": "noun",
    "definition_en": "cultural roots; the traditional foundation of a culture",
    "example_ko": "이 디자인은 한국의 문화적 뿌리에서 영감을 받았습니다.",
    "example_en": "This design was inspired by Korea's cultural roots."
  }
]
```

---

## 3. uid: `270789d9-c27f-4e8b-b7f0-a06a94c1f86a`

**Title (EN):** K-Pop at a Crossroads: Blackpink, BTS, and a Changing Global Music Scene  
**Title (KO):** 케이팝의 갈림길: 블랙핑크, BTS, 그리고 변화하는 음악 시장

**Korean content excerpt:**
> 일부 청취자들이 블랙핑크와 BTS 같은 대형 그룹의 세련되고 기업화된 스타일에 '피로감'을 느끼기 시작했다고 전했습니다. ... 보다 개인적이고 진정성 있는 방향을 모색하는 성찰의 시기를 보내고 있음을 시사합니다.

**Suggested words to define:** 갈림길, 피로감, 진정성, 전환점, 팬덤

**vocabulary JSON (paste into Supabase):**
```json
[
  {
    "word": "갈림길",
    "reading": "gal-rim-gil",
    "part_of_speech": "noun",
    "definition_en": "crossroads; a point where a decision must be made about direction",
    "example_ko": "케이팝 산업은 중요한 갈림길에 서 있습니다.",
    "example_en": "The K-pop industry stands at an important crossroads."
  },
  {
    "word": "피로감",
    "reading": "pi-ro-gam",
    "part_of_speech": "noun",
    "definition_en": "fatigue; a feeling of tiredness or exhaustion (can refer to audience fatigue)",
    "example_ko": "팬들이 비슷한 스타일에 피로감을 느끼고 있습니다.",
    "example_en": "Fans are feeling fatigue from similar styles."
  },
  {
    "word": "진정성",
    "reading": "jin-jeong-seong",
    "part_of_speech": "noun",
    "definition_en": "authenticity; the quality of being genuine and true to oneself",
    "example_ko": "진정성 있는 음악이 팬들의 마음을 움직입니다.",
    "example_en": "Authentic music moves the hearts of fans."
  },
  {
    "word": "전환점",
    "reading": "jeon-hwan-jeom",
    "part_of_speech": "noun",
    "definition_en": "turning point; a moment when a significant change occurs",
    "example_ko": "이것은 케이팝 역사의 중요한 전환점입니다.",
    "example_en": "This is an important turning point in K-pop history."
  },
  {
    "word": "팬덤",
    "reading": "paen-deom",
    "part_of_speech": "noun",
    "definition_en": "fandom; the community of fans of a particular artist or group",
    "example_ko": "BTS의 팬덤은 전 세계에 퍼져 있습니다.",
    "example_en": "BTS's fandom is spread across the entire world."
  }
]
```

---

## 4. uid: `7564ddbd-8df5-41ec-9629-b2eeecae08c9`

**Title (EN):** Hallyu's Global Rise: K-Culture Dominates Screens, Shelves, and Strategy  
**Title (KO):** 한류 전 세계 강타: 드라마·음악·문학까지 확산

**Korean content excerpt:**
> 한류(韓流)에 대한 전 세계적인 호감도가 크게 높아지고 있다. ... 넷플릭스를 비롯한 국제 제작사들이 서울을 단순한 관광 배경이 아니라 실질적인 촬영·제작 허브로 선택하는 경우가 늘고 있다. ... 한류가 국제 관계와 소프트 파워 전략에서 중요한 힘으로 인정받고 있음을 보여준다.

**Suggested words to define:** 한류, 호감도, 소프트 파워, 허브, 인정받다

**vocabulary JSON (paste into Supabase):**
```json
[
  {
    "word": "한류",
    "reading": "hal-lyu",
    "part_of_speech": "noun",
    "definition_en": "Korean Wave; the global spread of Korean culture, entertainment, and lifestyle",
    "example_ko": "한류 덕분에 전 세계에서 한국어를 배우는 사람이 늘었습니다.",
    "example_en": "Thanks to the Korean Wave, more people around the world are learning Korean."
  },
  {
    "word": "호감도",
    "reading": "ho-gam-do",
    "part_of_speech": "noun",
    "definition_en": "favorability rating; the degree to which something is liked or viewed positively",
    "example_ko": "한국 문화에 대한 호감도가 세계적으로 높아지고 있습니다.",
    "example_en": "Favorability toward Korean culture is rising globally."
  },
  {
    "word": "소프트 파워",
    "reading": "so-peu-teu pa-wo",
    "part_of_speech": "noun",
    "definition_en": "soft power; influence achieved through culture and diplomacy rather than force",
    "example_ko": "한국은 문화를 통해 소프트 파워를 키우고 있습니다.",
    "example_en": "Korea is building soft power through its culture."
  },
  {
    "word": "허브",
    "reading": "heo-beu",
    "part_of_speech": "noun",
    "definition_en": "hub; a central point of activity or production",
    "example_ko": "서울이 글로벌 미디어 제작 허브로 떠오르고 있습니다.",
    "example_en": "Seoul is emerging as a global media production hub."
  },
  {
    "word": "인정받다",
    "reading": "in-jeong-bat-da",
    "part_of_speech": "verb",
    "definition_en": "to be recognized; to receive acknowledgment or validation",
    "example_ko": "한류는 세계적으로 중요한 문화로 인정받고 있습니다.",
    "example_en": "Hallyu is being recognized as an important culture worldwide."
  }
]
```

---

## 5. uid: `b4104c04-e249-4500-8b9d-4f605728e3c7`

**Title (EN):** Hallyu Rises Globally: K-Culture Shapes Soft Power and Media  
**Title (KO):** 한류 세계 확산: K-문화가 소프트파워를 이끈다

**Korean content excerpt:**
> 한국 문화, 즉 '한류'는 2025년과 2026년에 걸쳐 전 세계적으로 새로운 영향력을 발휘하고 있다. ... 한국이 문화 수출국에서 글로벌 미디어 제작의 중심지로 전환되고 있음을 보여준다. ... 한국어 공부는 단순히 엔터테인먼트를 즐기는 것을 넘어, 세계에서 가장 전략적으로 중요하고 창의적으로 역동적인 문화 중 하나로 가는 문을 여는 일이다.

**Suggested words to define:** 확산, 문화 수출국, 역동적, 진입점, 영향력을 발휘하다

**vocabulary JSON (paste into Supabase):**
```json
[
  {
    "word": "확산",
    "reading": "hwak-san",
    "part_of_speech": "noun",
    "definition_en": "spread; the process of spreading or diffusing across a wider area",
    "example_ko": "한류의 확산이 전 세계에서 계속되고 있습니다.",
    "example_en": "The spread of the Korean Wave continues across the world."
  },
  {
    "word": "문화 수출국",
    "reading": "mun-hwa su-chul-guk",
    "part_of_speech": "noun",
    "definition_en": "cultural exporter; a nation that exports its culture to other countries",
    "example_ko": "한국은 세계에서 손꼽히는 문화 수출국입니다.",
    "example_en": "Korea is one of the top cultural exporters in the world."
  },
  {
    "word": "역동적",
    "reading": "yeok-dong-jeok",
    "part_of_speech": "adjective",
    "definition_en": "dynamic; characterized by constant change, energy, and progress",
    "example_ko": "한국 문화는 매우 역동적입니다.",
    "example_en": "Korean culture is very dynamic."
  },
  {
    "word": "진입점",
    "reading": "jin-ip-jeom",
    "part_of_speech": "noun",
    "definition_en": "entry point; a starting point or gateway into something",
    "example_ko": "드라마는 한국 문화로 들어가는 좋은 진입점입니다.",
    "example_en": "Dramas are a great entry point into Korean culture."
  },
  {
    "word": "중심지",
    "reading": "jung-sim-ji",
    "part_of_speech": "noun",
    "definition_en": "center; a place that is the focal point of an activity",
    "example_ko": "서울은 글로벌 미디어의 중심지가 되었습니다.",
    "example_en": "Seoul has become the center of global media."
  }
]
```

---

## 6. uid: `e7161387-d838-4494-81c4-cbd9141fd536`

**Title (EN):** South Koreans Rethink Life: Simple Living, Rural Escapes, and Viral Snacks  
**Title (KO):** 한국인의 새로운 삶: 소박한 일상, 귀촌, 그리고 유행 간식

**Korean content excerpt:**
> 점점 더 많은 한국인들이 '아보하(아주 보통의 하루)' 트렌드를 받아들이고 있습니다. ... '걱정 없는 마을'이라는 공동체가 주목받고 있습니다. 이 마을에는 바쁜 서울을 떠나 농촌에서 공동체 중심의 삶을 선택한 젊은 한국인들이 모여 살고 있습니다.

**Suggested words to define:** 아보하, 귀촌, 소소한, 공동체, 대사증후군

**vocabulary JSON (paste into Supabase):**
```json
[
  {
    "word": "아보하",
    "reading": "a-bo-ha",
    "part_of_speech": "noun",
    "definition_en": "abbreviation of '아주 보통의 하루' (a very ordinary day); a trend of finding happiness in simple, everyday moments",
    "example_ko": "요즘 젊은 사람들 사이에서 아보하가 인기입니다.",
    "example_en": "The 'aboha' trend is popular among young people these days."
  },
  {
    "word": "귀촌",
    "reading": "gwi-chon",
    "part_of_speech": "noun",
    "definition_en": "moving to the countryside; the act of relocating from a city to a rural area",
    "example_ko": "스트레스를 피해 귀촌을 선택하는 젊은이가 늘고 있습니다.",
    "example_en": "More young people are choosing to move to the countryside to escape stress."
  },
  {
    "word": "소소한",
    "reading": "so-so-han",
    "part_of_speech": "adjective",
    "definition_en": "small and simple; modest, unassuming (often used affectionately about everyday pleasures)",
    "example_ko": "소소한 일상에서 행복을 찾을 수 있습니다.",
    "example_en": "You can find happiness in small, simple everyday moments."
  },
  {
    "word": "공동체",
    "reading": "gong-dong-che",
    "part_of_speech": "noun",
    "definition_en": "community; a group of people living together or sharing common interests",
    "example_ko": "그들은 농촌에서 작은 공동체를 이루며 살고 있습니다.",
    "example_en": "They live forming a small community in the countryside."
  },
  {
    "word": "대사증후군",
    "reading": "dae-sa-jeung-hu-gun",
    "part_of_speech": "noun",
    "definition_en": "metabolic syndrome; a cluster of conditions that increase the risk of heart disease and diabetes",
    "example_ko": "건강한 생활 습관은 대사증후군 예방에 도움이 됩니다.",
    "example_en": "Healthy lifestyle habits help prevent metabolic syndrome."
  }
]
```

---

## 7. uid: `ffb5ceca-17bc-4e23-8a83-f83121d1ed77`

**Title (EN):** South Korea's Economy: Chip Exports Shine, But Overall Growth Slows  
**Title (KO):** 반도체 수출 호조에도 한국 경제 성장 둔화

**Korean content excerpt:**
> 반도체 수출이 5월에 사상 최고 실적을 기록하며 경제 성장에 크게 기여했다. ... 전체적인 경제 성장세는 둔화되고 있다. ... 내수 소비도 둔화 조짐을 보이며 성장률에 부담을 주고 있다.

**Suggested words to define:** 반도체, 수출, 내수, 둔화, 성장률

**vocabulary JSON (paste into Supabase):**
```json
[
  {
    "word": "반도체",
    "reading": "ban-do-che",
    "part_of_speech": "noun",
    "definition_en": "semiconductor; a material or device used in electronics and computer chips",
    "example_ko": "한국은 세계 최고의 반도체 생산국 중 하나입니다.",
    "example_en": "Korea is one of the world's top semiconductor producers."
  },
  {
    "word": "수출",
    "reading": "su-chul",
    "part_of_speech": "noun",
    "definition_en": "export; goods or services sold to another country",
    "example_ko": "반도체 수출이 한국 경제를 이끌고 있습니다.",
    "example_en": "Semiconductor exports are leading Korea's economy."
  },
  {
    "word": "내수",
    "reading": "nae-su",
    "part_of_speech": "noun",
    "definition_en": "domestic demand; consumption within the home country rather than exports",
    "example_ko": "내수 시장이 회복되어야 경제가 더 성장할 수 있습니다.",
    "example_en": "The domestic market must recover for the economy to grow further."
  },
  {
    "word": "둔화",
    "reading": "dun-hwa",
    "part_of_speech": "noun",
    "definition_en": "slowdown; a decrease in speed, rate, or growth",
    "example_ko": "경제 성장의 둔화가 우려되고 있습니다.",
    "example_en": "There are concerns about the slowdown in economic growth."
  },
  {
    "word": "성장률",
    "reading": "seong-jang-nyul",
    "part_of_speech": "noun",
    "definition_en": "growth rate; the percentage increase over a given period",
    "example_ko": "올해 한국의 경제 성장률은 약 1%입니다.",
    "example_en": "Korea's economic growth rate this year is about 1%."
  }
]
```

---

## How to input into Supabase

1. Go to **Supabase Dashboard → Table Editor → articles**
2. Search by the `uid` listed above
3. Click the row to edit
4. Paste the JSON array into the `vocabulary` column
5. Save

Or use the SQL editor:
```sql
UPDATE articles
SET vocabulary = '[...]'  -- paste the JSON array here
WHERE id = 'paste-uid-here';
```
