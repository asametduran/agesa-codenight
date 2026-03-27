// src/data/cards.js
// Abdulsamet'in yazdığı senaryo kartları burada tanımlanır.
// spendings.csv kategorilerine göre: kafe, taksi, abonelik, yemek, eğlence...

export const cards = [
  {
    id: "c001",
    category: "☕ Kafe",
    icon: "☕",
    title: "Günlük kahven",
    description:
      "Her sabah ofise giderken 60 TL'lik kahven alıyorsun. Bu alışkanlığı sürdürmek istiyor musun?",
    effectYes: { wallet: -10, happiness: +8, bes: 0, xp: 5 },
    effectNo: { wallet: +10, happiness: -5, knowledge: +5, xp: 8 },
    triggerQuiz: false,
  },
  {
    id: "c002",
    category: "📈 BES",
    icon: "🏦",
    title: "BES'e katıl",
    description:
      "İşveren sana BES teklifinde bulundu. Maaşının %3'ü otomatik kesilecek ama devlet %25 katkı sağlayacak!",
    effectYes: { wallet: -15, bes: +20, knowledge: +10, xp: 15 },
    effectNo: { wallet: 0, bes: -5, happiness: -5, xp: 3 },
    triggerQuiz: true,
    quizId: "q001",
  },
  {
    id: "c003",
    category: "🚕 Ulaşım",
    icon: "🚕",
    title: "Taksi mi, metro mu?",
    description:
      "Toplantıya geç kaldın! Taksi 180 TL ama 15 dakika kazandırır. Metro 10 TL ama 30 dakika sürer.",
    effectYes: { wallet: -20, happiness: +10, xp: 5 },
    effectNo: { wallet: +20, happiness: -8, knowledge: +3, xp: 6 },
    triggerQuiz: false,
  },
  {
    id: "c004",
    category: "📱 Abonelik",
    icon: "📱",
    title: "Streaming aboneliği",
    description:
      "3 farklı streaming platformuna abonesin. Birini iptal etmek ister misin?",
    effectYes: { wallet: +8, happiness: -5, bes: +3, xp: 10 },
    effectNo: { wallet: -8, happiness: +5, xp: 4 },
    triggerQuiz: false,
  },
  {
    id: "c005",
    category: "🍔 Yemek",
    icon: "🍔",
    title: "Eve yemek siparişi",
    description:
      "Yorgun bir günün ardından yemek siparişi vermek istiyorsun. 120 TL tutacak. Sipariş verir misin?",
    effectYes: { wallet: -12, happiness: +10, xp: 5 },
    effectNo: { wallet: +12, happiness: -5, knowledge: +3, xp: 7 },
    triggerQuiz: false,
  },
  {
    id: "c006",
    category: "📚 Eğitim",
    icon: "📚",
    title: "Online kurs fırsatı",
    description:
      "Fintech alanında 1.500 TL'lik bir online kurs bulundu. Kariyerine değer katabilir. Satın alır mısın?",
    effectYes: { wallet: -18, knowledge: +25, happiness: +8, xp: 20 },
    effectNo: { wallet: 0, knowledge: -5, xp: 4 },
    triggerQuiz: true,
    quizId: "q002",
  },
  {
    id: "c007",
    category: "🎮 Eğlence",
    icon: "🎮",
    title: "Hafta sonu konseri",
    description:
      "Favori sanatçın şehrine geliyor! Bilet 400 TL. Gitmeye değer mi?",
    effectYes: { wallet: -20, happiness: +20, xp: 8 },
    effectNo: { wallet: +20, happiness: -15, xp: 5 },
    triggerQuiz: false,
  },
  {
    id: "c008",
    category: "💳 Kredi",
    icon: "💳",
    title: "Kredi kartı taksidi",
    description:
      "Bu ay kredi kartı ekstranda beklenmedik bir ödeme çıktı. Minimum ödeme mi yaparsın, yoksa tamamını öder misin?",
    effectYes: { wallet: -25, bes: +5, happiness: +5, knowledge: +10, xp: 15 },
    effectNo: { wallet: +15, bes: -10, knowledge: -5, xp: 3 },
    triggerQuiz: true,
    quizId: "q003",
  },
  {
    id: "c009",
    category: "🏠 Ev",
    icon: "🏠",
    title: "Ev arkadaşı teklifi",
    description:
      "Bir arkadaşın ev paylaşmayı teklif etti. Kira giderin yarıya inecek ama mahremiyetinden taviz vereceksin.",
    effectYes: { wallet: +25, happiness: -5, knowledge: +5, xp: 10 },
    effectNo: { wallet: -20, happiness: +10, xp: 5 },
    triggerQuiz: false,
  },
  {
    id: "c010",
    category: "💰 Yatırım",
    icon: "💰",
    title: "Acil fon oluştur",
    description:
      "Bir finans danışmanı 3 aylık giderini acil fon olarak ayırmanı öneriyor. Başlamak ister misin?",
    effectYes: { wallet: -15, bes: +15, knowledge: +15, happiness: +5, xp: 20 },
    effectNo: { wallet: +15, bes: -10, knowledge: -5, xp: 3 },
    triggerQuiz: false,
  },
  {
    id: "c011",
    category: "🛍️ Alışveriş",
    icon: "🛍️",
    title: "İndirim tuzağı",
    description:
      "Favori markan %50 indirim yapıyor. İhtiyacın olmasa da fırsat kaçar diye 500 TL harcamayı düşünüyorsun.",
    effectYes: { wallet: -18, happiness: +10, xp: 4 },
    effectNo: { wallet: +18, happiness: -3, knowledge: +8, xp: 10 },
    triggerQuiz: false,
  },
  {
    id: "c012",
    category: "📊 Bütçe",
    icon: "📊",
    title: "Aylık bütçe takibi",
    description:
      "Bir uygulama harcamalarını otomatik kategorilere ayırıp sana haftalık rapor sunuyor. Kullanmak ister misin?",
    effectYes: { wallet: 0, knowledge: +15, happiness: +5, xp: 12 },
    effectNo: { wallet: 0, knowledge: -5, xp: 3 },
    triggerQuiz: false,
  },
  {
    id: "c013",
    category: "🎓 Burs",
    icon: "🎓",
    title: "Burs başvurusu",
    description:
      "Yeni bir burs programı açıldı. Başvuru 2 saat alacak ama aylık 1.500 TL kazanabilirsin.",
    effectYes: { wallet: +20, knowledge: +10, happiness: +8, xp: 18 },
    effectNo: { wallet: 0, happiness: +3, xp: 2 },
    triggerQuiz: false,
  },
  {
    id: "c014",
    category: "⚡ Fatura",
    icon: "⚡",
    title: "Elektrik faturası şoku",
    description:
      "Bu ayki elektrik faturan normalin 2 katı geldi. Tasarruf önlemleri almak ister misin?",
    effectYes: { wallet: +12, knowledge: +8, happiness: -3, xp: 10 },
    effectNo: { wallet: -12, happiness: +2, xp: 3 },
    triggerQuiz: false,
  },
  {
    id: "c015",
    category: "🤝 Borç",
    icon: "🤝",
    title: "Arkadaşa borç",
    description:
      "Arkadaşın acil 500 TL istiyor, geri ödeyeceğini söylüyor ama daha önce geç ödemişti.",
    effectYes: { wallet: -10, happiness: +8, knowledge: -3, xp: 5 },
    effectNo: { wallet: 0, happiness: -8, knowledge: +5, xp: 7 },
    triggerQuiz: false,
  },
  {
    id: "c016",
    category: "📈 BES",
    icon: "📈",
    title: "BES katkını artır",
    description:
      "BES danışmanın aylık katkını %1 artırmayı öneriyor. Küçük fark ama 30 yılda büyük birikim.",
    effectYes: { wallet: -8, bes: +18, knowledge: +8, xp: 15 },
    effectNo: { wallet: 0, bes: -5, xp: 3 },
    triggerQuiz: false,
  },
  {
    id: "c017",
    category: "🚲 Ulaşım",
    icon: "🚲",
    title: "Bisiklete geç",
    description:
      "İşyerin 4 km uzakta. Bisiklet alırsan ulaşım masrafını sıfırlarsın, 1.200 TL'ye mal olur.",
    effectYes: { wallet: -5, happiness: +12, knowledge: +5, xp: 12 },
    effectNo: { wallet: 0, happiness: -2, xp: 3 },
    triggerQuiz: false,
  },
  {
    id: "c018",
    category: "🍳 Yemek",
    icon: "🍳",
    title: "Haftalık yemek planı",
    description:
      "Hafta başında yemek planlayıp market alışverişi yaparsan hem sağlıklı hem ucuz olur. Dener misin?",
    effectYes: { wallet: +15, happiness: +5, knowledge: +8, xp: 12 },
    effectNo: { wallet: -10, happiness: +5, xp: 3 },
    triggerQuiz: false,
  },
  {
    id: "c019",
    category: "💡 Yatırım",
    icon: "💡",
    title: "Altın mı, döviz mi?",
    description:
      "Birikiminin küçük bir kısmını değerlendirmek istiyorsun. Altın mı alırsın, döviz mi tutarsın?",
    effectYes: { wallet: -10, bes: +8, knowledge: +12, xp: 14 },
    effectNo: { wallet: +5, knowledge: +5, xp: 8 },
    triggerQuiz: false,
  },
  {
    id: "c020",
    category: "🏋️ Sağlık",
    icon: "🏋️",
    title: "Spor salonu üyeliği",
    description:
      "Yıllık spor salonu üyeliği 3.600 TL. Aylık ödersen 4.200 TL tutar. Yıllık mı ödersin?",
    effectYes: { wallet: -20, happiness: +15, knowledge: +5, xp: 12 },
    effectNo: { wallet: -5, happiness: +10, xp: 5 },
    triggerQuiz: false,
  },
];
