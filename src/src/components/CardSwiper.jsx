import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useAnimation } from 'framer-motion';

const CardSwiper = () => {
  const [index, setIndex] = useState(0);
  
  // 1. Sürükleme ve Animasyon Değerleri
  const x = useMotionValue(0); // Sürükleme miktarını takip eder
  const controls = useAnimation(); // Programatik animasyon (tuşlar ve butonlar) için

  // 2. Dinamik Dönüşümler (Rotasyon ve Opaklık)
  // Sağa çekince sağa (+15 derece), sola çekince sola (-15 derece) yatar.
  const rotate = useTransform(x, [-200, 0, 200], [-15, 0, 15]);
  
  // Merkezden uzaklaştıkça opaklık azalır (hafif şeffaflaşır).
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

  // 3. Karar Verme ve Fırlatma Mantığı
  const handleDecision = async (direction) => {
    if (direction === 'right') {
      console.log(`Kart ${index + 1}: EVET (Sağ)`);
      // Kartı sağa fırlat
      await controls.start({ x: 500, rotate: 30, opacity: 0, transition: { duration: 0.3 } });
    } else {
      console.log(`Kart ${index + 1}: HAYIR (Sol)`);
      // Kartı sola fırlat
      await controls.start({ x: -500, rotate: -30, opacity: 0, transition: { duration: 0.3 } });
    }
    
    // Animasyon bittikten sonra bir sonraki karta geç ve kartı merkeze sıfırla
    setIndex(prev => prev + 1);
    x.set(0); 
    controls.set({ x: 0, rotate: 0, opacity: 1 });
  };

  // 4. Sürükleme Bittiğinde Kontrol
  const handleDragEnd = (event, info) => {
    // Eğer yeterince uzağa (100px) çekildiyse fırlat, yoksa merkeze geri dönsün
    if (info.offset.x > 100) {
      handleDecision('right');
    } else if (info.offset.x < -100) {
      handleDecision('left');
    } else {
      controls.start({ x: 0, rotate: 0, transition: { type: 'spring', stiffness: 300, damping: 20 } });
    }
  };

  // 5. Klavye Ok Tuşları Entegrasyonu
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight') {
        handleDecision('right');
      } else if (event.key === 'ArrowLeft') {
        handleDecision('left');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Component kapandığında event listener'ı temizle (Memory leak engelleme)
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [index]); // index her değiştiğinde listener'ı güncelle

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', overflow: 'hidden' }}>
      
      {/* Arka Plandaki Kart (Bir sonraki kartın gölgesi) */}
      <div style={{
        width: '300px', height: '450px', backgroundColor: '#e0e0e0', borderRadius: '30px', position: 'absolute', transform: 'scale(0.95)', zIndex: 1
      }} />

      {/* Ön Plandaki (Aktif) Kart */}
      <motion.div
        key={index}
        drag="x" // Sadece yatay sürükleme
        dragConstraints={{ left: 0, right: 0 }}
        animate={controls} // Animasyon kontrollerine bağla
        style={{ 
          x, rotate, opacity,
          width: '300px', 
          height: '450px', 
          backgroundColor: 'white', 
          borderRadius: '30px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'grab',
          userSelect: 'none',
          position: 'absolute',
          zIndex: 2,
          padding: '20px',
          textAlign: 'center'
        }}
        onDragEnd={handleDragEnd}
        whileDrag={{ scale: 1.05 }}
      >
        <h2 style={{ pointerEvents: 'none' }}>Kart #{index + 1}</h2>
        <p style={{ pointerEvents: 'none', padding: '10px' }}>Harcama yapmak istiyor musun?</p>
        
        <div style={{ fontSize: '60px', marginTop: '20px' }}>
          {x.get() > 50 ? "✅" : x.get() < -50 ? "❌" : "🤔"}
        </div>
        
        {/* Görsel Yardımcı Butonlar (Dokunmatik ekranlar için) */}
        <div style={{ marginTop: 'auto', display: 'flex', gap: '20px' }}>
          <button onClick={() => handleDecision('left')} style={{ padding: '8px 15px', background: '#ff4757', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Hayır</button>
          <button onClick={() => handleDecision('right')} style={{ padding: '8px 15px', background: '#2ed573', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Evet</button>
        </div>
      </motion.div>
    </div>
  );
};

export default CardSwiper;