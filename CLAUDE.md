## Ben kimim

**data-insight branch** sorumlusuyum.
Tüm CSV verilerini parse edip uygulamanın kullanacağı `src/data/data.js`
dosyasını üretiyorum. Başka branch kimse CSV ile uğraşmaz — herkes benden import eder.

UI yazmıyorum. Component yazmıyorum. Sadece veri katmanı.

---

## Benim dosyalarım

```
src/data/data.js        ← tek çıktım, tek sorumlum
```

Başka dosyaya dokunmam.

---

## Ham veri kaynakları

```
public/raw/users.csv              500 kullanıcı, 16 kolon
public/raw/spendings.csv          ~60K satır harcama
public/raw/quiz_questions.csv     50 soru, 5 modül
public/raw/quiz_options.csv       ~140 seçenek
public/raw/bes_scenarios.csv      3 satır, 3 risk profili
public/raw/bes_funds_performance.csv  38 fon
```

---

## data.js içindeki export'lar

Başka branch'ler bunları import eder. Şemayı değiştirme, isim değiştirme.
Değiştireceksen önce ekiple konuş.

### `PERSONAS` — obje, key = P1..P5
```js
PERSONAS.P1 = {
  id, label, description, ageRange, isStudent,
  incomeLevel, riskProfile, impulseTendency, subscriptionCount,
  initialStats: { health, savings, impulse, subscriptions }
}
```
`initialStats` → GameContext'teki başlangıç state'i buradan gelir.
`health` 0–100, `savings` 0–100 (normalize), `impulse` 1/2/3.

Kaynak: users.csv persona_id grupları → her grup ortalandı.

| Persona | Kimlik              | health | savings | impulse | risk   |
|---------|---------------------|--------|---------|---------|--------|
| P1      | Tutumlu Öğrenci     | 71     | 65      | 1 (low) | low    |
| P2      | Harcayan Öğrenci    | 61     | 41      | 3 (high)| medium |
| P3      | Risk Alan Genç      | 78     | 59      | 2 (mid) | high   |
| P4      | Çalışan Profesyonel | 91     | 81      | 1 (low) | medium |
| P5      | Kısıtlı Öğrenci     | 52     | 53      | 2 (mid) | low    |

---

### `QUIZ_QUESTIONS` — array
```js
{
  id, moduleId, stageId,
  difficulty,   // 1 / 2 / 3
  xp,           // 10 / 20 / 30
  question,
  options,      // string[]
  correctIndex, // options[correctIndex] doğru cevap
  feedbackCorrect,
  feedbackWrong,
}
```
Kaynak: quiz_questions.csv + quiz_options.csv birleştirildi.
`correct_option_id` → option_order ile eşleştirilip `correctIndex`'e çevrildi.

Modül → Stage eşlemesi:
```
M1 → stageId: 1   (Bütçe Temelleri)
M2 → stageId: 2   (Harcama Davranışı)
M3 → stageId: 3   (Birikim)
M4 → stageId: 4   (Enflasyon ve Faiz)
M5 → stageId: 5   (BES)
```

### `getQuizByStage(stageId)` — fonksiyon
```js
import { getQuizByStage } from '../data/data.js'
const stage1Questions = getQuizByStage(1)  // 10 soru döner
```

---

### `BES_SCENARIOS` — array (3 eleman)
```js
{
  id, riskProfile, label, description,
  fundCount,
  annualReturnMin, annualReturnAvg, annualReturnMax,
}
```
Kaynak: bes_scenarios.csv — direkt kopyalandı, dönüşüm yok.

### `getScenarioByPersona(personaId)` — fonksiyon
```js
getScenarioByPersona("P1")  // → SCN_LOW döner (P1 risk=low)
getScenarioByPersona("P3")  // → SCN_HIGH döner (P3 risk=high)
```

---

### `calculateBES(monthlyPMT, years, annualReturn)` — fonksiyon
```js
import { calculateBES } from '../data/data.js'

const result = calculateBES(
  500,    // aylık katkı (TL)
  30,     // yıl
  43.85   // yıllık getiri oranı (BES_SCENARIOS'tan alınır)
)

result.chartData     // Recharts LineChart'a ver — [{ year, birikim, devletKatkisi, toplam }]
result.totalSavings  // sayı (TL)
result.govContrib    // sayı — toplam ödemenin %20'si (devlet katkısı)
result.grandTotal    // totalSavings + govContrib
```

Formül:
```
r = annualReturn / 100 / 12
n = years * 12
FV = monthlyPMT × ((1+r)^n - 1) / r       ← bileşik faiz
govContrib = (monthlyPMT × n) × 0.20       ← %20 devlet katkısı
```

---

### `LEADERBOARD_USERS` — array (5 eleman)
```js
{ userId, name, persona, xp, level }
// userId: "YOU" olanın xp ve level'ı null — GameContext'ten enjekte edilir
```

### `buildLeaderboard(currentXP, currentLevel)` — fonksiyon
```js
import { buildLeaderboard } from '../data/data.js'
const sorted = buildLeaderboard(state.xp, state.level)
// Aktif kullanıcıyı yerleştirir + XP'ye göre sıralar
```

---

### `SPENDING_CATEGORIES` — array
```js
{ id, label, icon, essentialRatio }
// essentialRatio: 0–1, ne kadar zorunlu harcama olduğu
// Karar kartı senaryolarında kullanılır
```
Kaynak: spendings.csv kategori analizi — Market, Ulaşım, Yeme-İçme, Eğlence, Abonelik, Alışveriş, Oyun/İçerik, Diğer.

---

## Yapılacaklar listesi (benim işlerim)

- [ ] Quiz: 50 sorunun tamamını quiz_questions.csv + quiz_options.csv'den parse et, QUIZ_QUESTIONS array'ini doldur
- [ ] Leaderboard: users.csv'den financial_health_score yüksek 4 kullanıcıyı seç, LEADERBOARD_USERS'ı güncelle
- [ ] Test: `calculateBES(500, 30, 43.85)` çalıştır, sonuçları kontrol et
- [ ] Test: `getQuizByStage(1)` → 10 soru dönmeli
- [ ] Test: `getScenarioByPersona("P2")` → SCN_MEDIUM dönmeli

---

## Prompt şablonu

### Yeni veri fonksiyonu yazarken:
```
CLAUDE.md: [bu dosyayı yapıştır]
Mevcut data.js: [dosyayı yapıştır]

[Şu fonksiyonu / şu export'u] eklememi istiyorum.
Mevcut export isimleri ve şemalar değişmesin.
```

### Quiz parse işlemi için:
```
CLAUDE.md: [bu dosyayı yapıştır]

quiz_questions.csv:
[ilk 5 satırı yapıştır]

quiz_options.csv:
[ilk 10 satırı yapıştır]

QUIZ_QUESTIONS array'ini tüm 50 soru için doldur.
correctIndex'i correct_option_id → option_order eşleşmesinden hesapla.
stageId'yi moduleId'den türet (M1→1, M2→2 ...).
```

### Hata ayıklarken:
```
CLAUDE.md: [bu dosyayı yapıştır]

calculateBES(500, 30, 43.85) şu sonucu veriyor: [sonucu yapıştır]
Beklenen: grandTotal yaklaşık [X] TL olmalı.
Formülde hata var mı?
```

---

## Kesinlikle yapmayacağım şeyler

- Component yazmak
- GameContext'e dispatch göndermek
- CSS / Tailwind yazmak
- Başka branch'lerin dosyalarını değiştirmek

Eğer başka branch bir veri ihtiyacı bildirirse: önce bu CLAUDE.md'ye yaz,
sonra data.js'e export ekle, sonra ilgili kişiye bildir.