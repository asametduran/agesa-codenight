export const scenarioCards = [
  {
    id: 1,
    category: "kafe",
    text: "Arkadaşlar 'Hadi kahveye!' diyor. Yeni açılan mekân da baya hype olmuş.",
    image: "/images/cards/cafe-hype.jpg",
    options: {
      left: {
        label: "Gidelim, bir kahve benden ☕",
        effects: { wallet: -18, happiness: +14, bes: -4, knowledge: 0 },
      },
      right: {
        label: "Evde demleyip takılırım",
        effects: { wallet: +10, happiness: -4, bes: +6, knowledge: +2 },
      },
    },
  },
  {
    id: 2,
    category: "taksi",
    text: "Gece geç oldu. Eve dönüşte taksi 220 TL, toplu taşıma 45 dk.",
    image: "/images/cards/taxi-night.jpg",
    options: {
      left: {
        label: "Taksi çağır 🚕",
        effects: { wallet: -22, happiness: +8, bes: -3, knowledge: 0 },
      },
      right: {
        label: "Toplu taşımayla dönerim",
        effects: { wallet: +12, happiness: -3, bes: +5, knowledge: +2 },
      },
    },
  },
  {
    id: 3,
    category: "dijital-abonelik",
    text: "Müzik + dizi + oyun abonelikleri üst üste binmiş. Kart ekstresi üzgün.",
    image: "/images/cards/subscriptions.jpg",
    options: {
      left: {
        label: "Hepsi kalsın, FOMO büyük 😵",
        effects: { wallet: -16, happiness: +7, bes: -4, knowledge: -1 },
      },
      right: {
        label: "Kullanmadıklarını iptal et",
        effects: { wallet: +14, happiness: -2, bes: +5, knowledge: +4 },
      },
    },
  },
  {
    id: 4,
    category: "bes",
    text: "İş yerinden mesaj: 'BES’e girersen katkına %20 devlet katkısı var.'",
    image: "/images/cards/bes-20.jpg",
    options: {
      left: {
        label: "BES’e başla (%20 katkı avantajı)",
        effects: { wallet: -10, happiness: +2, bes: +18, knowledge: +6 },
      },
      right: {
        label: "Şimdilik ertele",
        effects: { wallet: +6, happiness: 0, bes: -6, knowledge: -2 },
      },
    },
  },
  {
    id: 5,
    category: "kafe",
    text: "Final haftası: Kafede çalışmak mı, kütüphane + termos mu?",
    image: "/images/cards/study-place.jpg",
    options: {
      left: {
        label: "Kafede çalışırım (kahve şart)",
        effects: { wallet: -12, happiness: +6, bes: -2, knowledge: +6 },
      },
      right: {
        label: "Kütüphane + ev kahvesi",
        effects: { wallet: +9, happiness: -1, bes: +4, knowledge: +8 },
      },
    },
  },
  {
    id: 6,
    category: "yemek",
    text: "Yemek uygulamasında 1 alana 1 bedava burger kampanyası düştü.",
    image: "/images/cards/food-delivery.jpg",
    options: {
      left: {
        label: "Sipariş ver, keyif zamanı 🍔",
        effects: { wallet: -15, happiness: +12, bes: -3, knowledge: 0 },
      },
      right: {
        label: "Evde hızlı makarna yap",
        effects: { wallet: +8, happiness: -2, bes: +4, knowledge: +2 },
      },
    },
  },
  {
    id: 7,
    category: "taksi",
    text: "Sabah derse geç kalıyorsun. Taksi kurtarır ama bütçe kırmızıda.",
    image: "/images/cards/taxi-late.jpg",
    options: {
      left: {
        label: "Taksiyle yetiş",
        effects: { wallet: -14, happiness: +5, bes: -2, knowledge: +2 },
      },
      right: {
        label: "Otobüs + biraz geç kal",
        effects: { wallet: +7, happiness: -3, bes: +3, knowledge: -1 },
      },
    },
  },
  {
    id: 8,
    category: "dijital-abonelik",
    text: "Online eğitim platformu yıllık paket indirimi: pahalı ama içerik sağlam.",
    image: "/images/cards/online-course.jpg",
    options: {
      left: {
        label: "Paketi al, kendine yatırım yap",
        effects: { wallet: -13, happiness: +3, bes: -2, knowledge: +14 },
      },
      right: {
        label: "YouTube + ücretsiz kaynaklarla devam",
        effects: { wallet: +6, happiness: 0, bes: +2, knowledge: +6 },
      },
    },
  },
  {
    id: 9,
    category: "bes",
    text: "Aylık bütçenden küçük bir payı BES’e otomatik aktarma önerisi geldi.",
    image: "/images/cards/auto-bes.jpg",
    options: {
      left: {
        label: "Otomatik katkı başlat (%20 katkıdan yararlan)",
        effects: { wallet: -8, happiness: +1, bes: +15, knowledge: +5 },
      },
      right: {
        label: "Önce harcamaları toparlayayım",
        effects: { wallet: +5, happiness: +1, bes: -5, knowledge: +1 },
      },
    },
  },
  {
    id: 10,
    category: "sosyal",
    text: "Konser bileti son saat indirimi! Arkadaş grubu 'gelmezsen küseriz' modunda.",
    image: "/images/cards/concert.jpg",
    options: {
      left: {
        label: "Bileti kap 🎶",
        effects: { wallet: -20, happiness: +16, bes: -4, knowledge: 0 },
      },
      right: {
        label: "Bu ay pas geç, evde takıl",
        effects: { wallet: +11, happiness: -5, bes: +5, knowledge: +1 },
      },
    },
  },
  {
    id: 11,
    category: "kafe",
    text: "Her gün dışarıdan kahve almak mı, haftalık kahve bütçesi koymak mı?",
    image: "/images/cards/coffee-budget.jpg",
    options: {
      left: {
        label: "Günlük kahve rutini devam",
        effects: { wallet: -17, happiness: +8, bes: -4, knowledge: 0 },
      },
      right: {
        label: "Haftalık limit belirle",
        effects: { wallet: +12, happiness: -1, bes: +6, knowledge: +5 },
      },
    },
  },
  {
    id: 12,
    category: "finansal-okuryazarlik",
    text: "Okul kulübünde 'Bütçe 101 + BES ve %20 devlet katkısı' atölyesi var.",
    image: "/images/cards/workshop.jpg",
    options: {
      left: {
        label: "Katıl, not al",
        effects: { wallet: 0, happiness: +3, bes: +6, knowledge: +16 },
      },
      right: {
        label: "Boşver, reels’e devam",
        effects: { wallet: 0, happiness: +2, bes: -3, knowledge: -8 },
      },
    },
  },
];