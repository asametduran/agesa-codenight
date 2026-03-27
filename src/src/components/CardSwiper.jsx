import React, { useState, useEffect, useContext } from 'react';
import { motion, useMotionValue, useTransform, useAnimation } from 'framer-motion';
import { cards } from '../data/cards';
import { GameContext } from './GameContext';

const CardSwiper = () => {
  const [index, setIndex] = useState(0);
  const card = cards[index];
  const { dispatch } = useContext(GameContext);

  // 1. Sürükleme ve Animasyon Değerleri
  const x = useMotionValue(0);
  const controls = useAnimation();

  // 2. Dinamik Dönüşümler (Rotasyon ve Opaklık)
  const rotate = useTransform(x, [-200, 0, 200], [-15, 0, 15]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

  // 3. Karar Verme ve Fırlatma Mantığı
  const handleDecision = async (direction) => {
    const effect = direction === 'right' ? card.effectYes : card.effectNo;

    // Stats güncelle
    dispatch({
      type: 'UPDATE_STATS',
      payload: {
        savings:   effect.wallet      ?? 0,
        health:    effect.happiness   ?? 0,
        knowledge: effect.knowledge   ?? 0,
        bes:       effect.bes         ?? 0,
      },
    });

    // XP ekle
    if (effect.xp) dispatch({ type: 'ADD_XP', payload: effect.xp });

    if (direction === 'right') {
      await controls.start({ x: 500, rotate: 30, opacity: 0, transition: { duration: 0.3 } });
    } else {
      await controls.start({ x: -500, rotate: -30, opacity: 0, transition: { duration: 0.3 } });
    }

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

      {index >= cards.length ? (
        <div style={{ textAlign: 'center', color: 'white' }}>
          <div style={{ fontSize: '60px' }}>🎉</div>
          <h2>Tüm kartlar bitti!</h2>
        </div>
      ) : (
        <>
          {/* Arka Plandaki Kart (Bir sonraki kartın gölgesi) */}
          <div style={{
            width: '300px',
            height: '460px',
            backgroundColor: 'rgba(255,255,255,0.15)',
            borderRadius: '24px',
            position: 'absolute',
            transform: 'scale(0.95) translateY(10px)',
            zIndex: 1,
          }} />

          {/* Ön Plandaki (Aktif) Kart */}
          <motion.div
            key={index}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            initial={{ opacity: 1, x: 0, rotate: 0 }}
            animate={controls}
            style={{
              x, rotate, opacity,
              width: '300px',
              height: '460px',
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              boxShadow: '0 24px 60px rgba(2,11,24,0.7)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'grab',
              userSelect: 'none',
              position: 'absolute',
              zIndex: 2,
              padding: '28px 20px 20px',
              textAlign: 'center',
            }}
            onDragEnd={handleDragEnd}
            whileDrag={{ scale: 1.05 }}
          >
            {/* Kategori etiketi */}
            <div style={{
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.08em',
              color: '#92be26',
              textTransform: 'uppercase',
              pointerEvents: 'none',
            }}>{card.category}</div>

            {/* İkon */}
            <div style={{ fontSize: '56px', margin: '16px 0 12px', pointerEvents: 'none' }}>{card.icon}</div>

            {/* Başlık */}
            <h2 style={{
              pointerEvents: 'none',
              margin: '0 0 10px',
              fontSize: '18px',
              fontWeight: 700,
              color: '#1e293b',
            }}>{card.title}</h2>

            {/* Açıklama */}
            <p style={{
              pointerEvents: 'none',
              padding: '0 8px',
              fontSize: '13px',
              color: '#334155',
              lineHeight: '1.6',
            }}>{card.description}</p>

            {/* Kart ilerleme */}
            <div style={{
              marginTop: 'auto',
              marginBottom: '12px',
              fontSize: '11px',
              color: '#94a3b8',
              pointerEvents: 'none',
            }}>{index + 1} / {cards.length}</div>

            {/* Butonlar */}
            <div style={{ display: 'flex', gap: '16px' }}>
              <button
                onClick={() => handleDecision('left')}
                style={{
                  padding: '10px 28px',
                  background: 'linear-gradient(135deg, #f97316, #c2410c)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontWeight: 700,
                  fontSize: '14px',
                  boxShadow: '0 4px 16px rgba(249,115,22,0.45)',
                }}
              >Hayır</button>
              <button
                onClick={() => handleDecision('right')}
                style={{
                  padding: '10px 28px',
                  background: 'linear-gradient(135deg, #a4d32e, #92be26)',
                  color: '#1e293b',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontWeight: 700,
                  fontSize: '14px',
                  boxShadow: '0 4px 16px rgba(164,211,46,0.45)',
                }}
              >Evet</button>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default CardSwiper;