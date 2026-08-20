/* ═══════════════════════════════════════════════════════════════════
   GENERATED FILE — do not edit; run node scripts/gen-locales-js.cjs
   Source of truth: scripts/_locales.cjs

   Plain ES5 <script> — no modules, no arrow functions, no optional
   chaining. It is loaded alongside js/lang-core.js, which is ES5-ish.

   window.KS_LOCALES        every record, registry order (en first)
   window.KS_LOCALE_BY_CODE code → record
   window.KS_LIVE_LOCALES   status === 'live', registry order (en first)

   `status` gates visibility: 'planned' records exist so tooling can be
   built ahead of a rollout, and must not be surfaced to readers. Read
   KS_LIVE_LOCALES unless you specifically want the planned ones too.
═══════════════════════════════════════════════════════════════════ */
(function (w) {
  'use strict';

  var LOCALES = [
    {
      "code": "en",
      "htmlLang": "en",
      "hreflang": "en",
      "suffix": "",
      "native": "English",
      "flag": "🇺🇸",
      "flagSvg": "<svg viewBox=\"0 0 60 40\"><rect width=\"60\" height=\"40\" fill=\"#B22234\"/><g fill=\"#fff\"><rect y=\"3.1\" width=\"60\" height=\"3.1\"/><rect y=\"9.2\" width=\"60\" height=\"3.1\"/><rect y=\"15.4\" width=\"60\" height=\"3.1\"/><rect y=\"21.5\" width=\"60\" height=\"3.1\"/><rect y=\"27.7\" width=\"60\" height=\"3.1\"/><rect y=\"33.8\" width=\"60\" height=\"3.1\"/></g><rect width=\"24\" height=\"21.5\" fill=\"#3C3B6E\"/><g fill=\"#fff\"><circle cx=\"4\" cy=\"4\" r=\"1.1\"/><circle cx=\"12\" cy=\"4\" r=\"1.1\"/><circle cx=\"20\" cy=\"4\" r=\"1.1\"/><circle cx=\"8\" cy=\"8\" r=\"1.1\"/><circle cx=\"16\" cy=\"8\" r=\"1.1\"/><circle cx=\"4\" cy=\"12\" r=\"1.1\"/><circle cx=\"12\" cy=\"12\" r=\"1.1\"/><circle cx=\"20\" cy=\"12\" r=\"1.1\"/><circle cx=\"8\" cy=\"16\" r=\"1.1\"/><circle cx=\"16\" cy=\"16\" r=\"1.1\"/></g></svg>",
      "writing": "ltr",
      "numberSep": ",",
      "byline": {
        "by": "By",
        "upd": "Last updated",
        "fmt": "en-GB"
      },
      "cjk": false,
      "font": null,
      "pronField": null,
      "adsense": true,
      "status": "live"
    },
    {
      "code": "zh-tw",
      "htmlLang": "zh-tw",
      "hreflang": "zh-TW",
      "suffix": "_zh_tw",
      "native": "繁體中文",
      "flag": "🇹🇼",
      "flagSvg": "<svg viewBox=\"0 0 60 40\"><rect width=\"60\" height=\"40\" fill=\"#FE0000\"/><rect width=\"30\" height=\"20\" fill=\"#000095\"/><polygon fill=\"#fff\" points=\"21,10 17.4,10.7 20.2,13 16.8,11.8 18,15.2 15.7,12.4 15,16 14.3,12.4 12,15.2 13.2,11.8 9.8,13 12.6,10.7 9,10 12.6,9.3 9.8,7 13.2,8.2 12,4.8 14.3,7.6 15,4 15.7,7.6 18,4.8 16.8,8.2 20.2,7 17.4,9.3\"/><circle cx=\"15\" cy=\"10\" r=\"2.9\" fill=\"#000095\"/><circle cx=\"15\" cy=\"10\" r=\"2.2\" fill=\"#fff\"/></svg>",
      "writing": "ltr",
      "numberSep": ",",
      "byline": {
        "by": "作者",
        "upd": "最後更新",
        "fmt": "zh-TW"
      },
      "cjk": true,
      "font": null,
      "pronField": "zhuyin",
      "adsense": true,
      "status": "live"
    },
    {
      "code": "ja",
      "htmlLang": "ja",
      "hreflang": "ja",
      "suffix": "_ja",
      "native": "日本語",
      "flag": "🇯🇵",
      "flagSvg": "<svg viewBox=\"0 0 60 40\"><rect width=\"60\" height=\"40\" fill=\"#fff\"/><circle cx=\"30\" cy=\"20\" r=\"12\" fill=\"#BC002D\"/></svg>",
      "writing": "ltr",
      "numberSep": ",",
      "byline": {
        "by": "執筆",
        "upd": "最終更新",
        "fmt": "ja-JP"
      },
      "cjk": true,
      "font": null,
      "pronField": "katakana",
      "adsense": true,
      "status": "live"
    },
    {
      "code": "es",
      "htmlLang": "es",
      "hreflang": "es",
      "suffix": "_es",
      "native": "Español",
      "flag": "🇪🇸",
      "flagSvg": "<svg viewBox=\"0 0 60 40\"><rect width=\"60\" height=\"40\" fill=\"#AA151B\"/><rect y=\"10\" width=\"60\" height=\"20\" fill=\"#F1BF00\"/></svg>",
      "writing": "ltr",
      "numberSep": ".",
      "byline": {
        "by": "Por",
        "upd": "Última actualización",
        "fmt": "es-ES"
      },
      "cjk": false,
      "font": null,
      "pronField": null,
      "adsense": true,
      "status": "live"
    },
    {
      "code": "fr",
      "htmlLang": "fr",
      "hreflang": "fr",
      "suffix": "_fr",
      "native": "Français",
      "flag": "🇫🇷",
      "flagSvg": "<svg viewBox=\"0 0 60 40\"><rect width=\"60\" height=\"40\" fill=\"#fff\"/><rect width=\"20\" height=\"40\" fill=\"#0055A4\"/><rect x=\"40\" width=\"20\" height=\"40\" fill=\"#EF4135\"/></svg>",
      "writing": "ltr",
      "numberSep": " ",
      "byline": {
        "by": "Par",
        "upd": "Dernière mise à jour",
        "fmt": "fr-FR"
      },
      "cjk": false,
      "font": null,
      "pronField": null,
      "adsense": true,
      "status": "live"
    },
    {
      "code": "de",
      "htmlLang": "de",
      "hreflang": "de",
      "suffix": "_de",
      "native": "Deutsch",
      "flag": "🇩🇪",
      "flagSvg": "<svg viewBox=\"0 0 60 40\"><rect width=\"60\" height=\"40\" fill=\"#FFCE00\"/><rect width=\"60\" height=\"13.3\" fill=\"#000\"/><rect y=\"13.3\" width=\"60\" height=\"13.4\" fill=\"#D00\"/></svg>",
      "writing": "ltr",
      "numberSep": ".",
      "byline": {
        "by": "Von",
        "upd": "Zuletzt aktualisiert",
        "fmt": "de-DE"
      },
      "cjk": false,
      "font": null,
      "pronField": null,
      "adsense": true,
      "status": "live"
    },
    {
      "code": "vi",
      "htmlLang": "vi",
      "hreflang": "vi",
      "suffix": "_vi",
      "native": "Tiếng Việt",
      "flag": "🇻🇳",
      "flagSvg": "<svg viewBox=\"0 0 60 40\"><rect width=\"60\" height=\"40\" fill=\"#DA251D\"/><polygon fill=\"#FF0\" points=\"30,8 32.8,16.1 41.4,16.3 34.6,21.5 37.1,29.7 30,24.8 22.9,29.7 25.4,21.5 18.6,16.3 27.2,16.1\"/></svg>",
      "writing": "ltr",
      "numberSep": ".",
      "byline": {
        "by": "Bởi",
        "upd": "Cập nhật lần cuối",
        "fmt": "vi-VN"
      },
      "cjk": false,
      "font": null,
      "pronField": "reading_vi",
      "adsense": true,
      "status": "live"
    },
    {
      "code": "th",
      "htmlLang": "th",
      "hreflang": "th",
      "suffix": "_th",
      "native": "ไทย",
      "flag": "🇹🇭",
      "flagSvg": "<svg viewBox=\"0 0 60 40\"><rect width=\"60\" height=\"40\" fill=\"#A51931\"/><rect y=\"6.7\" width=\"60\" height=\"26.6\" fill=\"#F4F5F8\"/><rect y=\"13.3\" width=\"60\" height=\"13.4\" fill=\"#2D2A4A\"/></svg>",
      "writing": "ltr",
      "numberSep": ",",
      "byline": {
        "by": "โดย",
        "upd": "อัปเดตล่าสุด",
        "fmt": "th-TH-u-ca-gregory"
      },
      "cjk": false,
      "font": null,
      "pronField": "reading_th",
      "adsense": true,
      "status": "live"
    },
    {
      "code": "id",
      "htmlLang": "id",
      "hreflang": "id",
      "suffix": "_id",
      "native": "Bahasa Indonesia",
      "flag": "🇮🇩",
      "flagSvg": "<svg viewBox=\"0 0 60 40\"><rect width=\"60\" height=\"40\" fill=\"#fff\"/><rect width=\"60\" height=\"20\" fill=\"#E70011\"/></svg>",
      "writing": "ltr",
      "numberSep": ".",
      "byline": {
        "by": "Oleh",
        "upd": "Terakhir diperbarui",
        "fmt": "id-ID"
      },
      "cjk": false,
      "font": null,
      "pronField": null,
      "adsense": true,
      "status": "live"
    },
    {
      "code": "pt-br",
      "htmlLang": "pt-BR",
      "hreflang": "pt-BR",
      "suffix": "_pt_br",
      "native": "Português (Brasil)",
      "flag": "🇧🇷",
      "flagSvg": "<svg viewBox=\"0 0 60 40\"><rect width=\"60\" height=\"40\" fill=\"#009B3A\"/><polygon fill=\"#FEDF00\" points=\"30,4 55,20 30,36 5,20\"/><circle cx=\"30\" cy=\"20\" r=\"9\" fill=\"#002776\"/><g fill=\"#fff\"><circle cx=\"26\" cy=\"16\" r=\"0.8\"/><circle cx=\"32\" cy=\"15.5\" r=\"0.8\"/><circle cx=\"34.8\" cy=\"23.4\" r=\"0.8\"/><circle cx=\"27\" cy=\"25\" r=\"0.8\"/><rect x=\"21.3\" y=\"19\" width=\"17.4\" height=\"3\"/></g></svg>",
      "writing": "ltr",
      "numberSep": ".",
      "byline": {
        "by": "Por",
        "upd": "Última atualização",
        "fmt": "pt-BR"
      },
      "cjk": false,
      "font": null,
      "pronField": null,
      "adsense": true,
      "status": "planned"
    },
    {
      "code": "ru",
      "htmlLang": "ru",
      "hreflang": "ru",
      "suffix": "_ru",
      "native": "Русский",
      "flag": "🇷🇺",
      "flagSvg": "<svg viewBox=\"0 0 60 40\"><rect width=\"60\" height=\"40\" fill=\"#fff\"/><rect y=\"13.3\" width=\"60\" height=\"13.4\" fill=\"#0039A6\"/><rect y=\"26.7\" width=\"60\" height=\"13.3\" fill=\"#D52B1E\"/></svg>",
      "writing": "ltr",
      "numberSep": " ",
      "byline": {
        "by": "Автор",
        "upd": "Последнее обновление",
        "fmt": "ru-RU"
      },
      "cjk": false,
      "font": null,
      "pronField": null,
      "adsense": true,
      "status": "planned"
    },
    {
      "code": "tr",
      "htmlLang": "tr",
      "hreflang": "tr",
      "suffix": "_tr",
      "native": "Türkçe",
      "flag": "🇹🇷",
      "flagSvg": "<svg viewBox=\"0 0 60 40\"><rect width=\"60\" height=\"40\" fill=\"#E30A17\"/><circle cx=\"24\" cy=\"20\" r=\"9\" fill=\"#fff\"/><circle cx=\"27.3\" cy=\"20\" r=\"7.3\" fill=\"#E30A17\"/><polygon fill=\"#fff\" points=\"41.2,20 38.38,21 38.3,23.99 36.47,21.62 33.6,22.47 35.3,20 33.6,17.53 36.47,18.38 38.3,16.01 38.38,19\"/></svg>",
      "writing": "ltr",
      "numberSep": ".",
      "byline": {
        "by": "Yazan",
        "upd": "Son güncelleme",
        "fmt": "tr-TR"
      },
      "cjk": false,
      "font": null,
      "pronField": null,
      "adsense": true,
      "status": "planned"
    },
    {
      "code": "zh-hk",
      "htmlLang": "zh-hk",
      "hreflang": "zh-HK",
      "suffix": "_zh_hk",
      "native": "繁體中文（香港）",
      "flag": "🇭🇰",
      "flagSvg": "<svg viewBox=\"0 0 60 40\"><rect width=\"60\" height=\"40\" fill=\"#BA0C2F\"/><g fill=\"#fff\"><circle cx=\"30\" cy=\"15.4\" r=\"3.4\"/><circle cx=\"34.38\" cy=\"18.58\" r=\"3.4\"/><circle cx=\"32.7\" cy=\"23.72\" r=\"3.4\"/><circle cx=\"27.3\" cy=\"23.72\" r=\"3.4\"/><circle cx=\"25.62\" cy=\"18.58\" r=\"3.4\"/><circle cx=\"30\" cy=\"20\" r=\"2.8\"/></g></svg>",
      "writing": "ltr",
      "numberSep": ",",
      "byline": {
        "by": "作者",
        "upd": "最後更新",
        "fmt": "zh-HK"
      },
      "cjk": true,
      "font": {
        "family": "Noto Sans HK",
        "href": "https://fonts.googleapis.com/css2?family=Noto+Sans+HK:wght@300;400;500;700;900&display=swap"
      },
      "pronField": null,
      "adsense": true,
      "status": "planned"
    },
    {
      "code": "zh-cn",
      "htmlLang": "zh-cn",
      "hreflang": "zh-Hans",
      "suffix": "_zh_cn",
      "native": "简体中文",
      "flag": "🇨🇳",
      "flagSvg": "<svg viewBox=\"0 0 60 40\"><rect width=\"60\" height=\"40\" fill=\"#DE2910\"/><polygon fill=\"#FFDE00\" points=\"10,4 11.4,8.1 15.7,8.2 12.3,10.7 13.5,14.9 10,12.4 6.5,14.9 7.7,10.7 4.3,8.2 8.6,8.1\"/><circle cx=\"20\" cy=\"4\" r=\"1.5\" fill=\"#FFDE00\"/><circle cx=\"23\" cy=\"8\" r=\"1.5\" fill=\"#FFDE00\"/><circle cx=\"23\" cy=\"13\" r=\"1.5\" fill=\"#FFDE00\"/><circle cx=\"20\" cy=\"17\" r=\"1.5\" fill=\"#FFDE00\"/></svg>",
      "writing": "ltr",
      "numberSep": ",",
      "byline": {
        "by": "作者",
        "upd": "最后更新",
        "fmt": "zh-CN"
      },
      "cjk": true,
      "font": {
        "family": "Noto Sans SC",
        "href": "https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700;900&display=swap"
      },
      "pronField": "pinyin",
      "adsense": true,
      "status": "planned"
    },
    {
      "code": "ar",
      "htmlLang": "ar",
      "hreflang": "ar",
      "suffix": "_ar",
      "native": "العربية",
      "flag": "🇸🇦",
      "flagSvg": "<svg viewBox=\"0 0 60 40\"><rect width=\"60\" height=\"40\" fill=\"#006C35\"/><g fill=\"#fff\"><rect x=\"12\" y=\"12.5\" width=\"36\" height=\"4.4\"/><rect x=\"14\" y=\"24\" width=\"28\" height=\"2.6\"/><rect x=\"11\" y=\"23.4\" width=\"3\" height=\"3.8\"/><polygon points=\"42,22.7 48,25.3 42,27.9\"/></g></svg>",
      "writing": "rtl",
      "numberSep": ",",
      "byline": {
        "by": "بقلم",
        "upd": "آخر تحديث",
        "fmt": "ar"
      },
      "cjk": false,
      "font": {
        "family": "Noto Sans Arabic",
        "href": "https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@300;400;500;700;900&display=swap"
      },
      "pronField": null,
      "adsense": true,
      "status": "planned"
    },
    {
      "code": "ms",
      "htmlLang": "ms",
      "hreflang": "ms",
      "suffix": "_ms",
      "native": "Bahasa Melayu",
      "flag": "🇲🇾",
      "flagSvg": "<svg viewBox=\"0 0 60 40\"><rect width=\"60\" height=\"40\" fill=\"#CC0001\"/><g fill=\"#fff\"><rect y=\"2.86\" width=\"60\" height=\"2.86\"/><rect y=\"8.57\" width=\"60\" height=\"2.86\"/><rect y=\"14.29\" width=\"60\" height=\"2.86\"/><rect y=\"20\" width=\"60\" height=\"2.86\"/><rect y=\"25.71\" width=\"60\" height=\"2.86\"/><rect y=\"31.43\" width=\"60\" height=\"2.86\"/><rect y=\"37.14\" width=\"60\" height=\"2.86\"/></g><rect width=\"30\" height=\"22.86\" fill=\"#010066\"/><circle cx=\"13\" cy=\"11.4\" r=\"6\" fill=\"#FC0\"/><circle cx=\"15.6\" cy=\"11.4\" r=\"4.9\" fill=\"#010066\"/><polygon fill=\"#FC0\" points=\"22.4,7.8 22.89,9.26 23.96,8.16 23.77,9.68 25.21,9.16 24.38,10.45 25.91,10.6 24.6,11.4 25.91,12.2 24.38,12.35 25.21,13.64 23.77,13.12 23.96,14.64 22.89,13.54 22.4,15 21.91,13.54 20.84,14.64 21.03,13.12 19.59,13.64 20.42,12.35 18.89,12.2 20.2,11.4 18.89,10.6 20.42,10.45 19.59,9.16 21.03,9.68 20.84,8.16 21.91,9.26\"/></svg>",
      "writing": "ltr",
      "numberSep": ",",
      "byline": {
        "by": "Oleh",
        "upd": "Kemas kini terakhir",
        "fmt": "ms-MY"
      },
      "cjk": false,
      "font": null,
      "pronField": null,
      "adsense": true,
      "status": "planned"
    }
  ];

  var byCode = {};
  for (var i = 0; i < LOCALES.length; i++) byCode[LOCALES[i].code] = LOCALES[i];

  var live = [];
  for (var j = 0; j < LOCALES.length; j++) if (LOCALES[j].status === 'live') live.push(LOCALES[j]);

  w.KS_LOCALES = LOCALES;
  w.KS_LOCALE_BY_CODE = byCode;
  w.KS_LIVE_LOCALES = live;
}(window));
