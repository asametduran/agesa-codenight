// ─────────────────────────────────────────────────────────────────────────────
// data.js — FinQuest tek veri kaynağı
// Bu dosyayı sen üretiyorsun (data-insight branch).
// Başka hiç kimse CSV ile uğraşmaz, herkes buradan import eder.
// ─────────────────────────────────────────────────────────────────────────────

// ─── 1. PERSONA TANIMLARI ────────────────────────────────────────────────────
// Kaynak: users.csv → persona_id grupları ortalandı
// Oyun başlarken kullanıcı bir persona seçer, bu değerler başlangıç state'i olur

export const PERSONAS = {
  P1: {
    id: "P1",
    label: "Tutumlu Öğrenci",
    description: "Üniversite öğrencisi, düşük risk iştahı, düzenli harcama.",
    ageRange: "18–22",
    isStudent: true,
    incomeLevel: "medium",
    riskProfile: "low",
    impulseTendency: "low",
    subscriptionCount: 1,
    // Başlangıç GameContext stats değerleri (0–100 normalize edildi)
    initialStats: {
      health: 71,       // avg financial_health_score
      savings: 65,      // saving_potential_score × 100
      impulse: 1,       // low=1, medium=2, high=3
      subscriptions: 1,
    },
  },
  P2: {
    id: "P2",
    label: "Harcayan Öğrenci",
    description: "Yüksek dürtüsel harcama, orta risk, düşük birikim.",
    ageRange: "19–23",
    isStudent: true,
    incomeLevel: "medium",
    riskProfile: "medium",
    impulseTendency: "high",
    subscriptionCount: 3,
    initialStats: {
      health: 61,
      savings: 41,
      impulse: 3,
      subscriptions: 3,
    },
  },
  P3: {
    id: "P3",
    label: "Risk Alan Genç",
    description: "Yüksek risk iştahı, orta dürtüsellik, iyi finansal sağlık.",
    ageRange: "22–25",
    isStudent: true,
    incomeLevel: "medium",
    riskProfile: "high",
    impulseTendency: "medium",
    subscriptionCount: 2,
    initialStats: {
      health: 78,
      savings: 59,
      impulse: 2,
      subscriptions: 2,
    },
  },
  P4: {
    id: "P4",
    label: "Çalışan Profesyonel",
    description: "Yüksek gelir, düşük dürtüsellik, en iyi finansal sağlık.",
    ageRange: "23–26",
    isStudent: false,
    incomeLevel: "high",
    riskProfile: "medium",
    impulseTendency: "low",
    subscriptionCount: 2,
    initialStats: {
      health: 91,
      savings: 81,
      impulse: 1,
      subscriptions: 2,
    },
  },
  P5: {
    id: "P5",
    label: "Kısıtlı Öğrenci",
    description: "Düşük gelir, orta dürtüsellik, en zorlu başlangıç.",
    ageRange: "20–24",
    isStudent: true,
    incomeLevel: "low",
    riskProfile: "low",
    impulseTendency: "medium",
    subscriptionCount: 1,
    initialStats: {
      health: 52,
      savings: 53,
      impulse: 2,
      subscriptions: 1,
    },
  },
};

// ─── 2. QUIZ VERİSİ ──────────────────────────────────────────────────────────
// Kaynak: quiz_questions.csv + quiz_options.csv birleştirildi
// Her soru kendi seçeneklerini içeriyor, correctIndex hesaplandı

export const QUIZ_QUESTIONS = [
  // M1 — Bütçe Temelleri (Stage 1)
  {
    id: "Q0001", moduleId: "M1", stageId: 1,
    difficulty: 1, xp: 10,
    question: "Aşağıdakilerden hangisi 'keyfi harcama'ya örnektir?",
    options: ["Market alışverişi", "Toplu taşıma", "Yeni bir dijital abonelik", "Ev kirası"],
    correctIndex: 2,
    feedbackCorrect: "Doğru! Keyfi harcamalar ertelenebilir.",
    feedbackWrong: "Keyfi harcamalar zorunlu olmayan, ertelenebilir harcamalardır.",
  },
  {
    id: "Q0002", moduleId: "M1", stageId: 1,
    difficulty: 1, xp: 10,
    question: "Bütçe yapmak, gelirin tamamını harcamak anlamına gelir.",
    options: ["Doğru", "Yanlış"],
    correctIndex: 1,
    feedbackCorrect: "Doğru! Bütçe; planlama ve kontrol demektir.",
    feedbackWrong: "Yanlış. Bütçe; geliri planlayıp hedeflere göre yönetmektir.",
  },
  {
    id: "Q0003", moduleId: "M1", stageId: 1,
    difficulty: 2, xp: 20,
    question: "Bütçe yönetiminde en sağlıklı ilk adım hangisidir?",
    options: [
      "Harcamaları hiç takip etmemek",
      "Zorunlu giderleri ve geliri görmek",
      "Tüm harcamaları kesmek",
      "Kredi kartı kullanmak",
    ],
    correctIndex: 1,
    feedbackCorrect: "Evet! Önce tabloyu görmek gerekir.",
    feedbackWrong: "Bütçe yönetimi için önce gelir ve zorunlu giderleri görmek gerekir.",
  },
  // M2 — Harcama Davranışı (Stage 2) — quiz_questions.csv'den geri kalanları buraya ekle
  // M3 — Birikim (Stage 3)
  // M4 — Enflasyon (Stage 4)
  // M5 — BES (Stage 5)
  // NOT: Tüm 50 soruyu quiz_questions.csv + quiz_options.csv'den parse ederek eklemen lazım.
  // Şema aynı, sadece alanları doldur.
];

// Modüle göre filtrele — GameScreen bunu kullanır
export function getQuizByStage(stageId) {
  return QUIZ_QUESTIONS.filter(q => q.stageId === stageId);
}

// ─── 3. BES SENARYOLARI ──────────────────────────────────────────────────────
// Kaynak: bes_scenarios.csv — 3 satır, direkt kopyalandı

export const BES_SCENARIOS = [
  {
    id: "SCN_LOW",
    riskProfile: "low",
    label: "Düşük Risk",
    description: "Görece istikrarlı birikim. Para piyasası ve borçlanma araçları ağırlıklı.",
    fundCount: 6,
    annualReturnMin: 32.05,
    annualReturnAvg: 43.85,
    annualReturnMax: 51.38,
  },
  {
    id: "SCN_MEDIUM",
    riskProfile: "medium",
    label: "Orta Risk",
    description: "Risk ve getiri dengesi. Karma fon yaklaşımı.",
    fundCount: 14,
    annualReturnMin: 24.98,
    annualReturnAvg: 41.72,
    annualReturnMax: 50.06,
  },
  {
    id: "SCN_HIGH",
    riskProfile: "high",
    label: "Yüksek Risk",
    description: "Dalgalı ama yüksek getiri potansiyeli. Hisse ağırlıklı.",
    fundCount: 10,
    annualReturnMin: 22.64,
    annualReturnAvg: 35.18,
    annualReturnMax: 98.62,
  },
];

// Persona → BES senaryosu eşlemesi
// users.csv risk_profile kolonuyla birebir örtüşüyor
export function getScenarioByPersona(personaId) {
  const riskProfile = PERSONAS[personaId]?.riskProfile ?? "medium";
  return BES_SCENARIOS.find(s => s.riskProfile === riskProfile);
}

// ─── 4. BES HESAPLAMA FONKSİYONU ─────────────────────────────────────────────
// Kaynak: bes_scenarios.csv oranları + %20 devlet katkısı kuralı

/**
 * BES birikim projeksiyonu hesaplar.
 * @param {number} monthlyPMT  — aylık katkı payı (TL)
 * @param {number} years       — yıl sayısı
 * @param {number} annualReturn — yıllık getiri oranı (%, örn: 43.85)
 * @returns {{ chartData, totalSavings, govContrib, grandTotal }}
 */
export function calculateBES(monthlyPMT, years, annualReturn) {
  const r = annualReturn / 100 / 12;   // aylık faiz oranı
  const n = years * 12;                // toplam ay sayısı

  // Toplam birikim (bileşik faiz formülü)
  const totalSavings = r > 0
    ? monthlyPMT * ((Math.pow(1 + r, n) - 1) / r)
    : monthlyPMT * n;

  // Devlet katkısı: toplam ödenen katkı payının %20'si
  const totalPaid = monthlyPMT * n;
  const govContrib = totalPaid * 0.20;

  const grandTotal = totalSavings + govContrib;

  // Recharts için yıllık veri noktaları
  const chartData = Array.from({ length: years }, (_, i) => {
    const ni = (i + 1) * 12;
    const yearSavings = r > 0
      ? monthlyPMT * ((Math.pow(1 + r, ni) - 1) / r)
      : monthlyPMT * ni;
    const yearPaid = monthlyPMT * ni;
    const yearGov = yearPaid * 0.20;

    return {
      year: i + 1,
      birikim: Math.round(yearSavings),
      devletKatkisi: Math.round(yearGov),
      toplam: Math.round(yearSavings + yearGov),
    };
  });

  return {
    chartData,
    totalSavings: Math.round(totalSavings),
    govContrib: Math.round(govContrib),
    grandTotal: Math.round(grandTotal),
  };
}

// Kullanım örneği (BESSimulator.jsx içinde):
// import { BES_SCENARIOS, calculateBES } from '../data/data.js'
// const result = calculateBES(500, 30, 43.85)
// → result.chartData  Recharts'a ver
// → result.grandTotal kullanıcıya göster

// ─── 5. DEMO LEADERBOARD ─────────────────────────────────────────────────────
// Kaynak: users.csv'den financial_health_score yüksek 4 kullanıcı seçildi
// 5. satır aktif kullanıcı (xp GameContext'ten gelir)

export const LEADERBOARD_USERS = [
  { userId: "U0089", name: "Selin",  persona: "P4", xp: 480, level: 4 },
  { userId: "U0134", name: "Kaan",   persona: "P3", xp: 340, level: 4 },
  { userId: "U0212", name: "Defne",  persona: "P1", xp: 260, level: 3 },
  { userId: "U0301", name: "Mert",   persona: "P2", xp: 180, level: 3 },
  { userId: "YOU",   name: "Sen",    persona: null,  xp: null, level: null }, // GameContext'ten gelir
];

// Aktif kullanıcının XP'sini enjekte et ve sırala
export function buildLeaderboard(currentXP, currentLevel) {
  const filled = LEADERBOARD_USERS.map(u =>
    u.userId === "YOU"
      ? { ...u, xp: currentXP, level: currentLevel }
      : u
  );
  return [...filled].sort((a, b) => (b.xp ?? 0) - (a.xp ?? 0));
}

// ─── 6. HARCAMA KATEGORİLERİ (karar kartları için) ───────────────────────────
// Kaynak: spendings.csv kategori/sub_category analizi
// Gerçek transaction data değil — karar kartlarına senaryo üretmek için kullanılır

export const SPENDING_CATEGORIES = [
  { id: "ulasim",      label: "Ulaşım",        icon: "🚌", essentialRatio: 0.9 },
  { id: "market",      label: "Market",         icon: "🛒", essentialRatio: 0.8 },
  { id: "yemek",       label: "Yeme-İçme",      icon: "🍕", essentialRatio: 0.4 },
  { id: "eglence",     label: "Eğlence",        icon: "🎬", essentialRatio: 0.1 },
  { id: "abonelik",    label: "Abonelik",        icon: "📱", essentialRatio: 0.2 },
  { id: "alisveris",   label: "Alışveriş",       icon: "🛍️", essentialRatio: 0.2 },
  { id: "oyun",        label: "Oyun/İçerik",     icon: "🎮", essentialRatio: 0.0 },
  { id: "diger",       label: "Diğer",           icon: "📦", essentialRatio: 0.5 },
];