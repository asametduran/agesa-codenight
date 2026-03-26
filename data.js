// ─────────────────────────────────────────────────────────────────────────────
// data.js — FinQuest tek veri kaynağı
// data-insight branch çıktısı. Başka hiç kimse CSV ile uğraşmaz.
// ─────────────────────────────────────────────────────────────────────────────

// ─── 1. PERSONA TANIMLARI ────────────────────────────────────────────────────
export const PERSONAS = {
  P1: {
    id: "P1", label: "Tutumlu Öğrenci",
    description: "Üniversite öğrencisi, düşük risk iştahı, düzenli harcama.",
    ageRange: "18–22", isStudent: true, incomeLevel: "medium",
    riskProfile: "low", impulseTendency: "low", subscriptionCount: 1,
    initialStats: { health: 71, savings: 65, impulse: 1, subscriptions: 1 },
  },
  P2: {
    id: "P2", label: "Harcayan Öğrenci",
    description: "Yüksek dürtüsel harcama, orta risk, düşük birikim.",
    ageRange: "19–23", isStudent: true, incomeLevel: "medium",
    riskProfile: "medium", impulseTendency: "high", subscriptionCount: 3,
    initialStats: { health: 61, savings: 41, impulse: 3, subscriptions: 3 },
  },
  P3: {
    id: "P3", label: "Risk Alan Genç",
    description: "Yüksek risk iştahı, orta dürtüsellik, iyi finansal sağlık.",
    ageRange: "22–25", isStudent: true, incomeLevel: "medium",
    riskProfile: "high", impulseTendency: "medium", subscriptionCount: 2,
    initialStats: { health: 78, savings: 59, impulse: 2, subscriptions: 2 },
  },
  P4: {
    id: "P4", label: "Çalışan Profesyonel",
    description: "Yüksek gelir, düşük dürtüsellik, en iyi finansal sağlık.",
    ageRange: "23–26", isStudent: false, incomeLevel: "high",
    riskProfile: "medium", impulseTendency: "low", subscriptionCount: 2,
    initialStats: { health: 91, savings: 81, impulse: 1, subscriptions: 2 },
  },
  P5: {
    id: "P5", label: "Kısıtlı Öğrenci",
    description: "Düşük gelir, orta dürtüsellik, en zorlu başlangıç.",
    ageRange: "20–24", isStudent: true, incomeLevel: "low",
    riskProfile: "low", impulseTendency: "medium", subscriptionCount: 1,
    initialStats: { health: 52, savings: 53, impulse: 2, subscriptions: 1 },
  },
};

// ─── 2. QUIZ VERİSİ ──────────────────────────────────────────────────────────
// Kaynak: quiz_questions.csv + quiz_options.csv — 50 soru, 5 modül
export const QUIZ_QUESTIONS = [
  {
    id: "Q0001", moduleId: "M1", stageId: 1,
    difficulty: 1, xp: 10,
    question: "Aşağıdakilerden hangisi ‘keyfi harcama’ya örnektir?",
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
    options: ["Harcamaları hiç takip etmemek", "Zorunlu giderleri ve geliri görmek", "Sadece keyfi harcamaları artırmak"],
    correctIndex: 1,
    feedbackCorrect: "Evet! Önce tabloyu görmek gerekir.",
    feedbackWrong: "Bütçe yönetimi için önce gelir ve zorunlu giderleri görmek gerekir.",
  },
  {
    id: "Q0004", moduleId: "M1", stageId: 1,
    difficulty: 2, xp: 20,
    question: "Senaryo: Ay sonunda 300 TL açığın çıkıyor. İlk olarak ne yaparsın?",
    options: ["Bir hafta harcamaları kategori bazında yazmak", "Hiçbir şey yapmamak", "Yeni abonelik almak"],
    correctIndex: 0,
    feedbackCorrect: "Harika! Önce farkındalık ve ölçüm.",
    feedbackWrong: "En iyi ilk adım harcamaları ölçmek ve nerede arttığını görmektir.",
  },
  {
    id: "Q0005", moduleId: "M1", stageId: 1,
    difficulty: 1, xp: 10,
    question: "Aşağıdakilerden hangisi ‘ihtiyaç’ harcamasına daha yakındır?",
    options: ["Konser bileti", "Abonelik yenileme", "Temel gıda alışverişi", "Oyun içi satın alma"],
    correctIndex: 2,
    feedbackCorrect: "Doğru! Temel gıda çoğunlukla ihtiyaçtır.",
    feedbackWrong: "İhtiyaç harcamaları günlük yaşam için zorunlu olanlardır.",
  },
  {
    id: "Q0006", moduleId: "M1", stageId: 1,
    difficulty: 2, xp: 20,
    question: "Bütçe hedefi koyarken en uygulanabilir yaklaşım hangisidir?",
    options: ["Gerçekçi ve ölçülebilir hedef", "Belirsiz hedef", "Sadece büyük hedef"],
    correctIndex: 0,
    feedbackCorrect: "Evet! Ölçülebilir hedef sürdürülebilir olur.",
    feedbackWrong: "Hedefin ölçülebilir ve gerçekçi olması, takip etmeyi kolaylaştırır.",
  },
  {
    id: "Q0007", moduleId: "M1", stageId: 1,
    difficulty: 2, xp: 20,
    question: "Harcamaları kategori bazında takip etmek, gereksiz harcamaları fark etmeyi kolaylaştırır.",
    options: ["Doğru", "Yanlış"],
    correctIndex: 0,
    feedbackCorrect: "Kesinlikle! Kategori takibi farkındalık sağlar.",
    feedbackWrong: "Yanlış. Kategori takibi gereksiz harcamaları görünür kılar.",
  },
  {
    id: "Q0008", moduleId: "M1", stageId: 1,
    difficulty: 3, xp: 30,
    question: "Senaryo: Düzenli birikim yapmak istiyorsun. En sağlam yöntem hangisi?",
    options: ["Ay başında otomatik ayırmak", "Ay sonunda artarsa ayırmak", "Sadece canım isterse ayırmak"],
    correctIndex: 0,
    feedbackCorrect: "Doğru! Otomatik ve ay başı ayırmak en etkilidir.",
    feedbackWrong: "En etkili yöntem, gelir gelir gelmez birikimi otomatik ayırmaktır.",
  },
  {
    id: "Q0009", moduleId: "M1", stageId: 1,
    difficulty: 1, xp: 10,
    question: "Bütçede ‘sabit gider’ örneği hangisidir?",
    options: ["Dışarıda kahve", "Abonelik ödemesi", "Anlık taksi", "Oyun içi satın alma"],
    correctIndex: 1,
    feedbackCorrect: "Evet! Abonelik genellikle düzenli giderdir.",
    feedbackWrong: "Sabit giderler genellikle düzenli tekrar eden ödemelerdir.",
  },
  {
    id: "Q0010", moduleId: "M1", stageId: 1,
    difficulty: 1, xp: 10,
    question: "Küçük harcamalar (örn. 40 TL) ay sonunda birikerek büyük toplam oluşturabilir.",
    options: ["Doğru", "Yanlış"],
    correctIndex: 0,
    feedbackCorrect: "Doğru! Sıklık toplamı büyütür.",
    feedbackWrong: "Yanlış. Sık yapılan küçük harcamalar ay sonunda büyür.",
  },
  {
    id: "Q0011", moduleId: "M2", stageId: 2,
    difficulty: 1, xp: 10,
    question: "‘Harcamada farkındalık’ için en iyi başlangıç hangisidir?",
    options: ["Harcamaları hiç yazmamak", "Harcamaları 1 hafta boyunca kaydetmek", "Sadece gelir artırmaya odaklanmak"],
    correctIndex: 1,
    feedbackCorrect: "Doğru! Ölçmeden yönetmek zor.",
    feedbackWrong: "Farkındalık için önce harcamaları kaydetmek gerekir.",
  },
  {
    id: "Q0012", moduleId: "M2", stageId: 2,
    difficulty: 1, xp: 10,
    question: "Abonelikler küçük görünse de toplamda bütçeyi zorlayabilir.",
    options: ["Doğru", "Yanlış"],
    correctIndex: 0,
    feedbackCorrect: "Evet! Abonelikler birikince büyür.",
    feedbackWrong: "Yanlış. Abonelikler toplamda ciddi gider oluşturabilir.",
  },
  {
    id: "Q0013", moduleId: "M2", stageId: 2,
    difficulty: 2, xp: 20,
    question: "Aşağıdakilerden hangisi ‘harcama tuzağı’na örnektir?",
    options: ["Listeyle market alışverişi", "İndirim var diye ihtiyaç dışı alışveriş", "Toplu taşımayı kullanmak"],
    correctIndex: 1,
    feedbackCorrect: "Doğru! İndirim tuzağı sık görülür.",
    feedbackWrong: "İndirim var diye ihtiyaç dışı almak bir harcama tuzağıdır.",
  },
  {
    id: "Q0014", moduleId: "M2", stageId: 2,
    difficulty: 2, xp: 20,
    question: "Senaryo: Haftasonu eğlence harcaman artıyor. Ne yaparsın?",
    options: ["Haftasonu için harcama limiti belirlemek", "Limiti kaldırmak", "Hiç bakmamak"],
    correctIndex: 0,
    feedbackCorrect: "Harika! Limit koymak kontrol sağlar.",
    feedbackWrong: "Haftasonu için limit belirlemek harcama kontrolünü artırır.",
  },
  {
    id: "Q0015", moduleId: "M2", stageId: 2,
    difficulty: 1, xp: 10,
    question: "Aşağıdakilerden hangisi ‘keyfi’ harcama sınıfına daha yakındır?",
    options: ["İlaç", "Simit", "Yeni oyun paketi", "Temel ulaşım"],
    correctIndex: 2,
    feedbackCorrect: "Doğru! Oyun paketi çoğunlukla keyfidir.",
    feedbackWrong: "Keyfi harcamalar ertelenebilir ve zorunlu değildir.",
  },
  {
    id: "Q0016", moduleId: "M2", stageId: 2,
    difficulty: 2, xp: 20,
    question: "‘Tek seferlik büyük harcama’ bütçeyi ‘çok’ zorlayabilir.",
    options: ["Doğru", "Yanlış"],
    correctIndex: 0,
    feedbackCorrect: "Evet! Büyük harcamalar bütçe etkisini yükseltir.",
    feedbackWrong: "Yanlış. Büyük harcamalar çoğu zaman bütçeyi zorlar.",
  },
  {
    id: "Q0017", moduleId: "M2", stageId: 2,
    difficulty: 2, xp: 20,
    question: "En sağlıklı abonelik yönetimi yaklaşımı hangisidir?",
    options: ["Kullandıklarını tutup kullanmadıklarını iptal etmek", "Hepsini artırmak", "Hiç kontrol etmemek"],
    correctIndex: 0,
    feedbackCorrect: "Evet! Kullanmadığını iptal etmek tasarruf sağlar.",
    feedbackWrong: "En sağlıklısı, kullanılan abonelikleri tutup diğerlerini iptal etmektir.",
  },
  {
    id: "Q0018", moduleId: "M2", stageId: 2,
    difficulty: 3, xp: 30,
    question: "Senaryo: Gün içinde sık kahve alıyorsun. İlk mikro hedefin ne olur?",
    options: ["Haftada 1 gün kahve almamak", "Her gün daha pahalı kahve", "Kahveyi takip etmemek"],
    correctIndex: 0,
    feedbackCorrect: "Doğru! Küçük hedef sürdürülebilir.",
    feedbackWrong: "Mikro hedef küçük ve sürdürülebilir olmalıdır.",
  },
  {
    id: "Q0019", moduleId: "M2", stageId: 2,
    difficulty: 1, xp: 10,
    question: "Harcama analizinde ‘kategori’ kullanmanın faydası nedir?",
    options: ["Harcamayı gizlemek", "Hangi alanın öne çıktığını görmek", "Harcamayı artırmak"],
    correctIndex: 1,
    feedbackCorrect: "Evet! Kategori analizi görünürlük sağlar.",
    feedbackWrong: "Kategori analizi, hangi alanda harcamanın arttığını gösterir.",
  },
  {
    id: "Q0020", moduleId: "M2", stageId: 2,
    difficulty: 1, xp: 10,
    question: "Harcama alışkanlığı değişimi, bir anda ‘tamamen kesmek’ ile daha kolay olur.",
    options: ["Doğru", "Yanlış"],
    correctIndex: 1,
    feedbackCorrect: "Doğru! Kademeli değişim daha sürdürülebilirdir.",
    feedbackWrong: "Yanlış. Kademeli, küçük adımlar daha sürdürülebilir değişim sağlar.",
  },
  {
    id: "Q0021", moduleId: "M3", stageId: 3,
    difficulty: 1, xp: 10,
    question: "Acil durum fonunun temel amacı nedir?",
    options: ["Eğlence harcamasını artırmak", "Beklenmedik giderlere hazırlık", "Borcu artırmak"],
    correctIndex: 1,
    feedbackCorrect: "Doğru! Beklenmedik giderler için yastık sağlar.",
    feedbackWrong: "Acil durum fonu, beklenmedik giderlere hazırlık içindir.",
  },
  {
    id: "Q0022", moduleId: "M3", stageId: 3,
    difficulty: 1, xp: 10,
    question: "Birikim için ‘düzenli’ olmak, ‘büyük’ olmaktan daha önemlidir.",
    options: ["Doğru", "Yanlış"],
    correctIndex: 0,
    feedbackCorrect: "Evet! Düzenli alışkanlık kazandırır.",
    feedbackWrong: "Yanlış. Düzenli birikim alışkanlığı daha etkilidir.",
  },
  {
    id: "Q0023", moduleId: "M3", stageId: 3,
    difficulty: 2, xp: 20,
    question: "Hedef belirlerken hangisi daha doğrudur?",
    options: ["Belirsiz hedef", "Tutar + zaman içeren hedef", "Sadece hayal kurmak"],
    correctIndex: 1,
    feedbackCorrect: "Doğru! Ölçülebilir hedef takip edilebilir.",
    feedbackWrong: "Tutar ve zaman içeren hedefler daha uygulanabilir olur.",
  },
  {
    id: "Q0024", moduleId: "M3", stageId: 3,
    difficulty: 2, xp: 20,
    question: "Senaryo: Her ay 300 TL biriktirmek istiyorsun. Ne yaparsın?",
    options: ["Ay başında otomatik ayırmak", "Ay sonunda kalırsa ayırmak", "Sadece bazı aylar ayırmak"],
    correctIndex: 0,
    feedbackCorrect: "Harika! Otomatik birikim süreklilik sağlar.",
    feedbackWrong: "En sağlam yöntem ay başında otomatik ayırmaktır.",
  },
  {
    id: "Q0025", moduleId: "M3", stageId: 3,
    difficulty: 1, xp: 10,
    question: "Aşağıdakilerden hangisi kısa vadeli hedefe örnektir?",
    options: ["Emeklilik birikimi", "3 ay içinde laptop için birikim", "20 yıl sonraya yatırım"],
    correctIndex: 1,
    feedbackCorrect: "Doğru! Kısa vadeli hedef yakın tarihlidir.",
    feedbackWrong: "Kısa vadeli hedefler daha yakın süreli planlardır.",
  },
  {
    id: "Q0026", moduleId: "M3", stageId: 3,
    difficulty: 2, xp: 20,
    question: "Birikimi ‘harcama kalanı’ olarak görmek genellikle sürdürülemez.",
    options: ["Doğru", "Yanlış"],
    correctIndex: 0,
    feedbackCorrect: "Evet! Birikim öncelik olmalı.",
    feedbackWrong: "Yanlış. Birikim öncelik olursa sürdürülebilir olur.",
  },
  {
    id: "Q0027", moduleId: "M3", stageId: 3,
    difficulty: 2, xp: 20,
    question: "Birikimi artırmak için en etkili yöntemlerden biri hangisidir?",
    options: ["Harcamaları hiç izlememek", "Mikro tasarruf görevleri belirlemek", "Daha çok abonelik"],
    correctIndex: 1,
    feedbackCorrect: "Doğru! Mikro görevler davranışı değiştirir.",
    feedbackWrong: "Mikro tasarruf görevleri küçük ama etkili iyileştirme sağlar.",
  },
  {
    id: "Q0028", moduleId: "M3", stageId: 3,
    difficulty: 3, xp: 30,
    question: "Senaryo: Beklenmedik 1.200 TL gider çıktı. En sağlıklı yaklaşım?",
    options: ["Acil durum fonundan karşılamak", "Hepsini keyfi harcamadan kısmadan ödemek", "Hiç plan yapmamak"],
    correctIndex: 0,
    feedbackCorrect: "Doğru! Acil durum fonu tam bunun içindir.",
    feedbackWrong: "Acil durum fonu, beklenmedik giderleri daha az stresle karşılamayı sağlar.",
  },
  {
    id: "Q0029", moduleId: "M3", stageId: 3,
    difficulty: 1, xp: 10,
    question: "‘Otomatik birikim’ ne demektir?",
    options: ["Birikimi rastgele yapmak", "Belirli aralıklarla sistemli ayırmak", "Sadece yıl sonunda biriktirmek"],
    correctIndex: 1,
    feedbackCorrect: "Evet! Sistemli ayırmak otomatik birikimdir.",
    feedbackWrong: "Otomatik birikim, düzenli aralıklarla planlı ayırmaktır.",
  },
  {
    id: "Q0030", moduleId: "M3", stageId: 3,
    difficulty: 1, xp: 10,
    question: "Birikim hedefi koymak motivasyonu artırabilir.",
    options: ["Doğru", "Yanlış"],
    correctIndex: 0,
    feedbackCorrect: "Doğru! Hedef motivasyon sağlar.",
    feedbackWrong: "Yanlış. Hedef koymak motivasyonu artırabilir.",
  },
  {
    id: "Q0031", moduleId: "M4", stageId: 4,
    difficulty: 1, xp: 10,
    question: "Enflasyon neyi ifade eder?",
    options: ["Fiyatların genel seviyesinin artması", "Paranın her zaman değer kazanması", "Harcamaların sıfırlanması"],
    correctIndex: 0,
    feedbackCorrect: "Doğru! Enflasyon fiyatların genel artışıdır.",
    feedbackWrong: "Enflasyon, fiyatların genel seviyesinin artmasıdır.",
  },
  {
    id: "Q0032", moduleId: "M4", stageId: 4,
    difficulty: 1, xp: 10,
    question: "Enflasyon arttığında aynı parayla daha çok ürün alınır.",
    options: ["Doğru", "Yanlış"],
    correctIndex: 1,
    feedbackCorrect: "Doğru! Enflasyon satın alma gücünü düşürür.",
    feedbackWrong: "Yanlış. Enflasyon arttığında satın alma gücü düşer.",
  },
  {
    id: "Q0033", moduleId: "M4", stageId: 4,
    difficulty: 2, xp: 20,
    question: "Birikimin değerini korumak için genel prensip hangisidir?",
    options: ["Getiri enflasyonun altında kalsın", "Getiri enflasyonun üzerinde olsun", "Enflasyonu yok say"],
    correctIndex: 1,
    feedbackCorrect: "Evet! Enflasyonun üzerinde getiri değer korur.",
    feedbackWrong: "Değeri korumak için getirinin enflasyonun üzerinde olması hedeflenir.",
  },
  {
    id: "Q0034", moduleId: "M4", stageId: 4,
    difficulty: 2, xp: 20,
    question: "Senaryo: 1 yıl sonra 1.000 TL ile daha az şey alacağını düşünüyorsun. Bu hangi kavramla ilgilidir?",
    options: ["Enflasyon", "Seviye sistemi", "Rozet"],
    correctIndex: 0,
    feedbackCorrect: "Doğru! Bu satın alma gücü (enflasyon) etkisidir.",
    feedbackWrong: "Bu durum enflasyonla ilgilidir.",
  },
  {
    id: "Q0035", moduleId: "M4", stageId: 4,
    difficulty: 1, xp: 10,
    question: "Faiz/getiri en basit haliyle neyi anlatır?",
    options: ["Paranın zaman içinde artması", "Paranın her zaman azalması", "Paranın taşınması"],
    correctIndex: 0,
    feedbackCorrect: "Evet! Getiri zamanla artışı ifade eder.",
    feedbackWrong: "Getiri, paranın zaman içinde artmasıdır.",
  },
  {
    id: "Q0036", moduleId: "M4", stageId: 4,
    difficulty: 2, xp: 20,
    question: "Bileşik getiri, getirinin de getiri üretmesi demektir.",
    options: ["Doğru", "Yanlış"],
    correctIndex: 0,
    feedbackCorrect: "Doğru! Bileşik etki büyütür.",
    feedbackWrong: "Yanlış. Bileşik getiri, getirinin de getiri üretmesidir.",
  },
  {
    id: "Q0037", moduleId: "M4", stageId: 4,
    difficulty: 2, xp: 20,
    question: "Aşağıdakilerden hangisi enflasyon karşısında daha risklidir?",
    options: ["Parayı hiç değerlendirmeden uzun süre tutmak", "Bütçe yapmak", "Hedef belirlemek"],
    correctIndex: 0,
    feedbackCorrect: "Doğru! Değerlendirmeden tutmak satın alma gücünü azaltır.",
    feedbackWrong: "Uzun süre değerlendirmeden tutmak enflasyon karşısında risklidir.",
  },
  {
    id: "Q0038", moduleId: "M4", stageId: 4,
    difficulty: 3, xp: 30,
    question: "Senaryo: 10 yıl birikim yapacaksın. Hangi yaklaşım daha avantajlı olabilir?",
    options: ["Düzenli birikim + uzun vade", "Sadece ara sıra birikim", "Hiç birikim yapmamak"],
    correctIndex: 0,
    feedbackCorrect: "Doğru! Düzenlilik ve zaman birikimi büyütür.",
    feedbackWrong: "Uzun vadede düzenli birikim daha avantajlıdır.",
  },
  {
    id: "Q0039", moduleId: "M4", stageId: 4,
    difficulty: 1, xp: 10,
    question: "Satın alma gücü hangi kavramla yakından ilişkilidir?",
    options: ["Enflasyon", "Oyun puanı", "Liderlik tablosu"],
    correctIndex: 0,
    feedbackCorrect: "Evet! Enflasyon satın alma gücünü etkiler.",
    feedbackWrong: "Satın alma gücü enflasyonla ilgilidir.",
  },
  {
    id: "Q0040", moduleId: "M4", stageId: 4,
    difficulty: 1, xp: 10,
    question: "Enflasyon düşükse, fiyatlar genelde daha yavaş artar.",
    options: ["Doğru", "Yanlış"],
    correctIndex: 0,
    feedbackCorrect: "Doğru! Artış hızı düşüktür.",
    feedbackWrong: "Yanlış. Enflasyon düşükse fiyat artışları daha yavaştır.",
  },
  {
    id: "Q0041", moduleId: "M5", stageId: 5,
    difficulty: 1, xp: 10,
    question: "BES en basit haliyle neyi amaçlar?",
    options: ["Kısa vadede anlık harcamayı artırmak", "Uzun vadeli birikimi desteklemek", "Harcamaları sınırsız yapmak"],
    correctIndex: 1,
    feedbackCorrect: "Doğru! BES uzun vadeli birikim yaklaşımıdır.",
    feedbackWrong: "BES’in temel amacı uzun vadeli birikimi desteklemektir.",
  },
  {
    id: "Q0042", moduleId: "M5", stageId: 5,
    difficulty: 1, xp: 10,
    question: "Uzun vadede birikimin büyümesinde ‘zaman’ önemli bir etkendir.",
    options: ["Doğru", "Yanlış"],
    correctIndex: 0,
    feedbackCorrect: "Evet! Zaman bileşik etkiyi büyütür.",
    feedbackWrong: "Yanlış. Zaman, uzun vadede birikimi büyüten temel etkendir.",
  },
  {
    id: "Q0043", moduleId: "M5", stageId: 5,
    difficulty: 2, xp: 20,
    question: "Uzun vadeli birikimde en güçlü etkiyi artıran faktör hangisidir?",
    options: ["Zamana yaymak", "Sadece bir kere yatırmak", "Hiç yatırım yapmamak"],
    correctIndex: 0,
    feedbackCorrect: "Doğru! Zaman ve düzenlilik etkiyi büyütür.",
    feedbackWrong: "Uzun vadede zaman ve düzenlilik birikimi büyütür.",
  },
  {
    id: "Q0044", moduleId: "M5", stageId: 5,
    difficulty: 2, xp: 20,
    question: "Senaryo: 10 yıl boyunca her ay düzenli katkı yapıyorsun. Bu yaklaşımın avantajı nedir?",
    options: ["Bileşik etkiyle birikimin büyümesi", "Bütçe takibinin gereksiz olması", "Harcamaların artması"],
    correctIndex: 0,
    feedbackCorrect: "Harika! Düzenlilik bileşik etkiyi güçlendirir.",
    feedbackWrong: "Düzenli katkı, bileşik etkiyle birikimi büyütür.",
  },
  {
    id: "Q0045", moduleId: "M5", stageId: 5,
    difficulty: 1, xp: 10,
    question: "Aşağıdakilerden hangisi uzun vadeli hedefe örnektir?",
    options: ["Haftasonu etkinliği", "Emeklilik için birikim", "Bugün kahve"],
    correctIndex: 1,
    feedbackCorrect: "Doğru! Emeklilik uzun vadeli hedeftir.",
    feedbackWrong: "Uzun vadeli hedefler yıllara yayılan planlardır.",
  },
  {
    id: "Q0046", moduleId: "M5", stageId: 5,
    difficulty: 2, xp: 20,
    question: "BES senaryolarında daha uzun süre, aynı katkı ile daha yüksek birikime yol açabilir.",
    options: ["Doğru", "Yanlış"],
    correctIndex: 0,
    feedbackCorrect: "Evet! Süre uzadıkça birikim artabilir.",
    feedbackWrong: "Yanlış. Süre uzadıkça aynı katkı daha yüksek birikime yol açabilir.",
  },
  {
    id: "Q0047", moduleId: "M5", stageId: 5,
    difficulty: 2, xp: 20,
    question: "Risk profili neyi ifade eder?",
    options: ["Kişinin risk almaya yaklaşımı", "Kişinin yaşı", "Kişinin öğrenci olması"],
    correctIndex: 0,
    feedbackCorrect: "Doğru! Risk profili risk iştahını anlatır.",
    feedbackWrong: "Risk profili, kişinin risk almaya yaklaşımını ifade eder.",
  },
  {
    id: "Q0048", moduleId: "M5", stageId: 5,
    difficulty: 3, xp: 30,
    question: "Senaryo: Aylık 300 TL yerine 200 TL ile başlarsan ama 5 yıl daha erken başlarsan ne olur?",
    options: ["Erken başlamak, toplam birikimi artırabilir", "Hiçbir fark olmaz", "Birikim kesin azalır"],
    correctIndex: 0,
    feedbackCorrect: "Doğru! Erken başlamak güçlü bir avantajdır.",
    feedbackWrong: "Erken başlamak, uzun vadede toplam birikimi artırabilir.",
  },
  {
    id: "Q0049", moduleId: "M5", stageId: 5,
    difficulty: 1, xp: 10,
    question: "Birikim kararlarında ‘uzun vade’ yaklaşımı ne sağlar?",
    options: ["Dalgalanmaları zamanla dengeleyebilir", "Her zaman anında kazanç", "Hiçbir fayda"],
    correctIndex: 0,
    feedbackCorrect: "Evet! Zaman dalgalanmayı yumuşatabilir.",
    feedbackWrong: "Uzun vade, dalgalanmaları zaman içinde dengelemeye yardımcı olabilir.",
  },
  {
    id: "Q0050", moduleId: "M5", stageId: 5,
    difficulty: 1, xp: 10,
    question: "Birikim yapmaya başlamak için ‘mükemmel zaman’ı beklemek her zaman en iyisidir.",
    options: ["Doğru", "Yanlış"],
    correctIndex: 1,
    feedbackCorrect: "Doğru! Başlamak çoğu zaman beklemekten iyidir.",
    feedbackWrong: "Yanlış. Çoğu durumda erken başlamak, mükemmel zamanı beklemekten iyidir.",
  }
];

export function getQuizByStage(stageId) {
  return QUIZ_QUESTIONS.filter(q => q.stageId === stageId);
}

// ─── 3. BES SENARYOLARI ──────────────────────────────────────────────────────
// Kaynak: bes_scenarios.csv
export const BES_SCENARIOS = [
  {
    id: "SCN_LOW", riskProfile: "low", label: "Düşük Risk",
    description: "Görece istikrarlı birikim. Para piyasası ve borçlanma araçları ağırlıklı.",
    fundCount: 6, annualReturnMin: 32.05, annualReturnAvg: 43.85, annualReturnMax: 51.38,
  },
  {
    id: "SCN_MEDIUM", riskProfile: "medium", label: "Orta Risk",
    description: "Risk ve getiri dengesi. Karma fon yaklaşımı.",
    fundCount: 14, annualReturnMin: 24.98, annualReturnAvg: 41.72, annualReturnMax: 50.06,
  },
  {
    id: "SCN_HIGH", riskProfile: "high", label: "Yüksek Risk",
    description: "Dalgalı ama yüksek getiri potansiyeli. Hisse ağırlıklı.",
    fundCount: 10, annualReturnMin: 22.64, annualReturnAvg: 35.18, annualReturnMax: 98.62,
  },
];

export function getScenarioByPersona(personaId) {
  const riskProfile = PERSONAS[personaId]?.riskProfile ?? "medium";
  return BES_SCENARIOS.find(s => s.riskProfile === riskProfile);
}

// ─── 4. BES HESAPLAMA ────────────────────────────────────────────────────────
export function calculateBES(monthlyPMT, years, annualReturn) {
  const r = annualReturn / 100 / 12;
  const n = years * 12;
  const totalSavings = r > 0
    ? monthlyPMT * ((Math.pow(1 + r, n) - 1) / r)
    : monthlyPMT * n;
  const govContrib = (monthlyPMT * n) * 0.20;
  const chartData = Array.from({ length: years }, (_, i) => {
    const ni = (i + 1) * 12;
    const yearSavings = r > 0
      ? monthlyPMT * ((Math.pow(1 + r, ni) - 1) / r)
      : monthlyPMT * ni;
    const yearGov = monthlyPMT * ni * 0.20;
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
    grandTotal: Math.round(totalSavings + govContrib),
  };
}

// ─── 5. LEADERBOARD ──────────────────────────────────────────────────────────
export const LEADERBOARD_USERS = [
  { userId: "U0089", name: "Selin",  persona: "P4", xp: 480, level: 4 },
  { userId: "U0134", name: "Kaan",   persona: "P3", xp: 340, level: 4 },
  { userId: "U0212", name: "Defne",  persona: "P1", xp: 260, level: 3 },
  { userId: "U0301", name: "Mert",   persona: "P2", xp: 180, level: 3 },
  { userId: "YOU",   name: "Sen",    persona: null,  xp: null, level: null },
];

export function buildLeaderboard(currentXP, currentLevel) {
  const filled = LEADERBOARD_USERS.map(u =>
    u.userId === "YOU" ? { ...u, xp: currentXP, level: currentLevel } : u
  );
  return [...filled].sort((a, b) => (b.xp ?? 0) - (a.xp ?? 0));
}

// ─── 6. HARCAMA KATEGORİLERİ ─────────────────────────────────────────────────
export const SPENDING_CATEGORIES = [
  { id: "ulasim",    label: "Ulaşım",      icon: "🚌", essentialRatio: 0.9 },
  { id: "market",    label: "Market",       icon: "🛒", essentialRatio: 0.8 },
  { id: "yemek",     label: "Yeme-İçme",    icon: "🍕", essentialRatio: 0.4 },
  { id: "eglence",   label: "Eğlence",      icon: "🎬", essentialRatio: 0.1 },
  { id: "abonelik",  label: "Abonelik",      icon: "📱", essentialRatio: 0.2 },
  { id: "alisveris", label: "Alışveriş",     icon: "🛍️", essentialRatio: 0.2 },
  { id: "oyun",      label: "Oyun/İçerik",   icon: "🎮", essentialRatio: 0.0 },
  { id: "diger",     label: "Diğer",         icon: "📦", essentialRatio: 0.5 },
];
