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
];
