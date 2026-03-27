# BES't Choices

Finansal okuryazarlık odaklı React uygulaması.

Bu repoda **UI/Component katmanları** ile **veri katmanı** ayrıdır.  
**CSV kaynaklarından üretilen tek kanonik veri çıktısı `src/data/data.js` olmalıdır.**

---

## Kurulum / Çalıştırma

```bash
npm install
npm start
```

Test:

```bash
npm test
```

Build:

```bash
npm run build
```

---

## Veri Katmanı (data-insight sorumluluğu)

> Bu bölüm: `data-insight` branch yaklaşımını ve “tek doğruluk kaynağı” kuralını tarif eder.  
> UI geliştirenler **CSV dosyalarıyla uğraşmaz**, sadece `src/data/data.js` içinden import eder.

### Tek çıktı / tek sorumluluk

- **Tek çıktı dosyası:** `src/data/data.js`
- Veri şeması burada sabittir:
  - **Export isimlerini değiştirme**
  - **Objelerin alanlarını (schema) değiştirme**
  - Gerekirse önce ekip ile konuşulmalı

### Ham veri kaynakları (CSV)

Repoda CSV’ler şu dizinde tutulur:

```
src/data/
  users.csv
  spendings.csv
  quiz_questions.csv
  quiz_options.csv
  bes_scenarios.csv
  bes_funds_performance.csv
  learning_contents.csv
```

> Not: Bazı dokümanlarda `public/raw/*` geçebilir; bu repo düzeninde CSV’ler `src/data/*` altındadır.

---

## `src/data/data.js` Export’ları (Kanonik API)

Aşağıdaki export’lar uygulamanın diğer katmanları tarafından import edilir.

### `PERSONAS` — object, key = `P1..P5`

```js
PERSONAS.P1 = {
  id, label, description, ageRange, isStudent,
  incomeLevel, riskProfile, impulseTendency, subscriptionCount,
  initialStats: { health, savings, impulse, subscriptions }
}
```

- `initialStats` → GameContext başlangıç state’i buradan gelir
- `health`: 0–100
- `savings`: 0–100 (normalize)
- `impulse`: 1/2/3

Kaynak mantığı:
- `users.csv` içindeki `persona_id` grupları → her grup ortalanır

Referans persona özetleri:

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

Kaynak mantığı:
- `quiz_questions.csv` + `quiz_options.csv` birleştirilir
- `correct_option_id` → `option_order` ile eşleştirilip `correctIndex` üretilir

Modül → Stage eşlemesi:

```
M1 → stageId: 1   (Bütçe Temelleri)
M2 → stageId: 2   (Harcama Davranışı)
M3 → stageId: 3   (Birikim)
M4 → stageId: 4   (Enflasyon ve Faiz)
M5 → stageId: 5   (BES)
```

#### `getQuizByStage(stageId)`

```js
import { getQuizByStage } from '../data/data.js'

const stage1Questions = getQuizByStage(1) // 10 soru döner
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

Kaynak:
- `bes_scenarios.csv` — direkt kopyalanır (dönüşüm yok)

#### `getScenarioByPersona(personaId)`

```js
getScenarioByPersona("P1") // → SCN_LOW (P1 risk=low)
getScenarioByPersona("P3") // → SCN_HIGH (P3 risk=high)
```

---

### `calculateBES(monthlyPMT, years, annualReturn)`

```js
import { calculateBES } from '../data/data.js'

const result = calculateBES(
  500,    // aylık katkı (TL)
  30,     // yıl
  43.85   // yıllık getiri oranı (BES_SCENARIOS'tan)
)

result.chartData     // Recharts LineChart — [{ year, birikim, devletKatkisi, toplam }]
result.totalSavings  // sayı (TL)
result.govContrib    // sayı — toplam ödemenin %20'si
result.grandTotal    // totalSavings + govContrib
```

Formül:

```
r = annualReturn / 100 / 12
n = years * 12
FV = monthlyPMT × ((1+r)^n - 1) / r
govContrib = (monthlyPMT × n) × 0.20
```

---

### `LEADERBOARD_USERS` — array (5 eleman)

```js
{ userId, name, persona, xp, level }
// userId: "YOU" olanın xp ve level'ı null — GameContext'ten enjekte edilir
```

#### `buildLeaderboard(currentXP, currentLevel)`

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

Kaynak mantığı:
- `spendings.csv` kategori analizi (Market, Ulaşım, Yeme-İçme, Eğlence, Abonelik, Alışveriş, Oyun/İçerik, Diğer)

---

## Data-Insight TODO / Kontrol Listesi

- [ ] Quiz: `quiz_questions.csv` + `quiz_options.csv` parse edilip `QUIZ_QUESTIONS` (50 soru) üretilmeli
- [ ] Leaderboard: `users.csv` içinden `financial_health_score` yüksek 4 kullanıcı seçilip `LEADERBOARD_USERS` güncellenmeli
- [ ] Test: `calculateBES(500, 30, 43.85)` sonuçları kontrol edilmeli
- [ ] Test: `getQuizByStage(1)` → 10 soru dönmeli
- [ ] Test: `getScenarioByPersona("P2")` → `SCN_MEDIUM` dönmeli

---

## Katkı / Çalışma Prensibi

- CSV dosyalarıyla ilgili tüm dönüşümler **yalnızca veri katmanında** yapılır.
- UI tarafı:
  - CSV okuma/parsing yapmaz
  - `src/data/data.js` dışına “schema kopyalama” yapmaz
- Şema değişikliği gerekiyorsa önce ekip ile anlaşılır, sonra `data.js` güncellenir.
