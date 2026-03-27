import React, { useState } from 'react';
import './GameScreen.css';

// Hem Swipe hem Quiz tipini destekleyen ve seçimlere göre statları güncelleyen veri dizisi
const questionsData = [
  {
    id: 1,
    type: 'swipe',
    text: "Sabah kahvesini \ndışarıda içmek? \n(250 TL)",
    icon: (
      <div style={{ position: 'relative', fontSize: '90px', paddingBottom: '20px' }}>
          👨‍💼
          <span style={{ position: 'absolute', right: '-45px', top: '-10px', fontSize: '60px' }}>❓</span>
          <span style={{ position: 'absolute', left: '-30px', bottom: '10px', fontSize: '70px', filter: 'drop-shadow(0px 10px 10px rgba(0,0,0,0.15))' }}>☕</span>
      </div>
    ),
    effects: {
      left: { budget: +10, heart: -10, star: 0, chart: +5 }, 
      right: { budget: -15, heart: +15, star: +5, chart: 0 } 
    }
  },
  {
    id: 2,
    type: 'quiz',
    title: "Bonus Bilgi & Quiz!",
    text: "Bireysel Emeklilik Sistem'nde (BES) Devlet Katkısı oranı yüzde kaçtır?",
    options: [
      { id: 'A', text: '%10' },
      { id: 'B', text: '%20' },
      { id: 'C', text: '%30' },
      { id: 'D', text: '%25' }
    ],
    correctOptionId: 'C',
    effects: {
      correct: { chart: +15, budget: +5, heart: +5, star: 0 }, 
      wrong: { chart: -10, heart: -5, star: 0, budget: 0 }     
    }
  },
  {
    id: 3,
    type: 'swipe',
    text: "Son model telefon\nalmak? \n(45.000 TL)",
    icon: (
      <div style={{ position: 'relative', fontSize: '100px', paddingBottom: '20px' }}>
          📱
      </div>
    ),
    effects: {
      left: { budget: +20, chart: +10, heart: -15, star: -10 }, 
      right: { budget: -40, star: +25, heart: +20, chart: -10 } 
    }
  }
];

function GameScreen() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationClass, setAnimationClass] = useState('');
  
  const [selectedOption, setSelectedOption] = useState(null);
  
  // OYUN BİTTİ DURUMU
  const [gameOver, setGameOver] = useState(false);

  // LAPSE / REIGNS mekaniği: Oyuncunun anlık değerleri
  const [statValues, setStatValues] = useState({
    budget: 65,
    star: 35,
    chart: 20,
    heart: 50
  });

  const currentQ = questionsData[currentIndex];

  const statsList = [
    { id: 'budget', value: statValues.budget, icon: <MoneyIcon /> },
    { id: 'star',   value: statValues.star,   icon: <StarIcon /> },
    { id: 'chart',  value: statValues.chart,  icon: <ChartIcon /> },
    { id: 'heart',  value: statValues.heart,  icon: <HeartIcon /> },
  ];

  // Statları güncelleyip sıfıra düşme (Game Over) kontrolü yapar
  const applyEffects = (effectObj) => {
    setStatValues(prev => {
      const newStats = { ...prev };
      let triggeredZero = false;

      Object.keys(effectObj).forEach(key => {
        const newVal = Math.max(0, Math.min(100, newStats[key] + effectObj[key]));
        newStats[key] = newVal;
        if (newVal === 0) {
           triggeredZero = true; // Simgelerden biri sıfırlandı!
        }
      });

      if (triggeredZero) {
         // Animasyonların oynatılmasını bitirmesi için kısa bir süre sonra modalı aç
         setTimeout(() => setGameOver(true), 600);
      }

      return newStats;
    });
  };

  const goToNextQuestion = () => {
    // Eğer oyun bittiyse yeni soruya geçme
    if (gameOver) return;

    setAnimationClass('fade-out');
    
    setTimeout(() => {
      if (currentIndex + 1 < questionsData.length) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex(0); 
      }
      setSelectedOption(null);
      setAnimationClass('fade-in');
      
      setTimeout(() => {
        setAnimationClass('');
      }, 300);
    }, 300); 
  };

  const handleSwipe = (direction) => {
    if (!isPlaying || currentQ.type !== 'swipe') return;
    
    setAnimationClass(direction === 'right' ? 'swipe-right' : 'swipe-left');

    if (currentQ.effects && currentQ.effects[direction]) {
      applyEffects(currentQ.effects[direction]);
    }
    
    setTimeout(() => {
        setAnimationClass('');
        goToNextQuestion();
    }, 400);
  };

  const handleOptionClick = (optionId) => {
    if (selectedOption || currentQ.type !== 'quiz') return; 
    
    setSelectedOption(optionId);
    
    if (currentQ.effects) {
      const isCorrect = (optionId === currentQ.correctOptionId);
      if (isCorrect && currentQ.effects.correct) {
         applyEffects(currentQ.effects.correct);
      } else if (!isCorrect && currentQ.effects.wrong) {
         applyEffects(currentQ.effects.wrong);
      }
    }
    
    setTimeout(() => {
        goToNextQuestion();
    }, 2000);
  };

  return (
    <div className="game-container">
      
      {/* BAŞLANGIÇ OVERLAYI */}
      {!isPlaying && (
        <div className="game-overlay initial-overlay">
          <button 
            className="bottom-button center-button" 
            onClick={() => setIsPlaying(true)}
          >
            OYUNA BAŞLA
          </button>
        </div>
      )}

      {/* GAME OVER MODALI (Beyaz Gelecek Tablosu Ekranı) */}
      {gameOver && (
        <div className="game-over-overlay">
           <div className="game-over-card fade-in-up">
              
              <div className="go-icon">
                 {/* Görseldeki gibi yeşil bar grafiği ve aşağı ok mantığı */}
                  <svg viewBox="0 0 24 24" fill="none" stroke="#65a30d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                     <path d="M18 20V10M12 20V4M6 20v-4" transform="translate(0, 4)" />
                     <path d="M14 4 l 6 6 l 0 -6 M20 10 L 12 2" stroke="#65a30d" transform="translate(0, 3) rotate(90, 16, 6)"/>
                  </svg>
              </div>

              <h2 className="go-title">OYUN BİTTİ & GELECEK TABLOSU</h2>

              {/* Grafik Alanı */}
              <div className="go-chart-container">
                 
                 {/* DÜŞÜK YATIRIM */}
                 <div className="chart-section left-section">
                     <div className="chart-badge">DÜŞÜK YATIRIM</div>
                     <div className="bars-wrapper">
                         {/* Bar Height Orantıları */}
                         <div className="go-bar green" style={{ height: '25%' }}></div>
                         <div className="go-bar green" style={{ height: '35%' }}></div>
                         <div className="go-bar green" style={{ height: '50%' }}></div>
                         <div className="go-bar green" style={{ height: '65%' }}></div>
                     </div>
                     <div className="axis-text">YILLAR<br/>SENİN SEÇİMLERİN</div>
                 </div>

                 {/* Kesik Çizgili Yukarı Doğru Ok (SVG olarak) */}
                 <svg className="go-chart-arrow" viewBox="0 0 100 100" fill="none" style={{ position: 'absolute', left: '42%', top: '30%', width: '16%' }}>
                     <path d="M0 100 L 100 0" stroke="#334155" strokeWidth="6" strokeDasharray="10,10" />
                     <path d="M60 0 L 100 0 L 100 40" stroke="#334155" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                 </svg>

                 {/* HEDEF TASARRUF */}
                 <div className="chart-section right-section">
                     <div className="chart-badge orange">HEDEF TASARRUF</div>
                     <div className="bars-wrapper">
                         <div className="go-bar orange" style={{ height: '45%' }}></div>
                         <div className="go-bar orange" style={{ height: '65%' }}></div>
                         <div className="go-bar orange" style={{ height: '85%' }}></div>
                         <div className="go-bar orange" style={{ height: '100%' }}></div>
                     </div>
                     <div className="axis-text" style={{ bottom: '-45px' }}>YILLAR<br/>İDEAL BES SENARYOSU</div>
                 </div>

              </div>

              {/* Bilgi / Geri Bildirim Kutusu */}
              <div className="go-insight-box">
                  <div className="go-sparkles">✨</div>
                  <p className="go-insight-text">
                      Bugünkü 200 TL'lik harcamanı BES'e atsaydın, 10 yıl sonra şu kadar olacaktı!
                  </p>
                  <div className="go-insight-amount">
                      ₺125,000
                  </div>
              </div>

           </div>
        </div>
      )}

      {/* OYUN İÇERİĞİ */}
      <div className={`game-content ${(!isPlaying || gameOver) ? 'blurred' : ''}`}>
        
        <div className="stats-header">
           {statsList.map(stat => (
             <div key={stat.id} className="stat-item">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-bar-wrapper">
                   <div className="stat-header-row">
                      <span className="stat-value">{stat.value}%</span>
                   </div>
                   <div className="stat-bar-bg">
                      <div className="stat-bar-fill" style={{ width: `${stat.value}%` }}></div>
                   </div>
                </div>
             </div>
           ))}
        </div>

        <div className="card-area">
          
           {currentQ.type === 'swipe' && (
             <div className="swipe-arrow left" onClick={() => handleSwipe('left')}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 19l-7-7 7-7"/>
                </svg>
             </div>
           )}
           
           {currentQ.type === 'swipe' && (
             <div className={`decision-card ${animationClass}`}
                  style={{
                    transform: animationClass === 'swipe-right' ? 'translateX(40px) rotate(8deg) scale(0.95)' :
                               animationClass === 'swipe-left'  ? 'translateX(-40px) rotate(-8deg) scale(0.95)' : 'none',
                    opacity: ['swipe-left', 'swipe-right', 'fade-out'].includes(animationClass) ? 0 : 
                             (animationClass === 'fade-in' ? 1 : 1),
                    transition: animationClass.startsWith('fade') ? 'opacity 0.3s' : 'transform 0.4s ease, opacity 0.4s ease'
                  }}
             >
                <div className="decision-illustration">
                    {currentQ.icon}
                </div>
                
                <h2 className="decision-text">
                   {currentQ.text.split('\n').map((line, i) => (
                     <React.Fragment key={i}>
                       {line}<br />
                     </React.Fragment>
                   ))}
                </h2>
             </div>
           )}

           {currentQ.type === 'quiz' && (
             <div className={`decision-card quiz-card ${animationClass}`}
                  style={{
                     opacity: animationClass === 'fade-out' ? 0 : 1,
                     transition: 'opacity 0.3s ease'
                  }}
             >
                {selectedOption && (
                  <div className={`xp-popup ${selectedOption === currentQ.correctOptionId ? 'correct' : 'wrong'}`}>
                     {selectedOption === currentQ.correctOptionId ? (
                        <>
                           <span className="stars">✨🌟✨</span>
                           <div className="xp-text correct">↑<br/>+50 XP<br/><span style={{fontSize: '0.7rem'}}>Kazandın!</span></div>
                        </>
                     ) : (
                        <>
                           <span className="stars gray" style={{filter: 'grayscale(1)'}}>⭐★</span>
                           <div className="xp-text wrong">↓<br/>-10 XP<br/><span style={{fontSize: '0.7rem'}}>Kaybedildi!</span></div>
                        </>
                     )}
                  </div>
                )}

                <div className="quiz-icon">📗</div>
                <h3 className="quiz-title">{currentQ.title}</h3>
                <p className="quiz-text">{currentQ.text}</p>
                
                <div className="quiz-options">
                   {currentQ.options.map(opt => {
                      let optClass = 'quiz-option';
                      let optLabel = `${opt.id}) ${opt.text}`;
                      let iconStr = null;
                      
                      if (selectedOption) {
                         if (opt.id === currentQ.correctOptionId && selectedOption === opt.id) {
                            optClass += ' correct-select';
                            optLabel += ' SELECTED';
                            iconStr = '✔️';
                         } else if (opt.id === selectedOption && opt.id !== currentQ.correctOptionId) {
                            optClass += ' wrong-select';
                            optLabel += ' WRONG SELECT';
                            iconStr = '❌';
                         }
                      }
                      
                      return (
                         <div key={opt.id} className={optClass} onClick={() => handleOptionClick(opt.id)}>
                            <span className="opt-label">{optLabel}</span>
                            {iconStr && <span className="opt-icon">{iconStr}</span>}
                         </div>
                      );
                   })}
                </div>
             </div>
           )}

           {currentQ.type === 'swipe' && (
             <div className="swipe-arrow right" onClick={() => handleSwipe('right')}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#a4d32e" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 5l7 7-7 7"/>
                </svg>
             </div>
           )}
           
        </div>
        
      </div>
    </div>
  );
}

/* --- İKON KOMPONENTLERİ --- */
const MoneyIcon = () => (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="white">
       <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h2.73c.12.93 1.08 1.49 1.93 1.49 1.12 0 1.93-.68 1.93-1.61 0-1.07-1.1-1.35-2.61-1.84-2.06-.68-3.41-1.74-3.41-3.64 0-1.72 1.25-2.88 2.7-3.25V4h2.67v1.92c1.47.33 2.77 1.34 2.94 3.08h-2.67c-.12-.89-.92-1.36-1.71-1.36-1.01 0-1.8.63-1.8 1.48 0 .97.94 1.32 2.53 1.83 2.22.7 3.49 1.87 3.49 3.72 0 1.76-1.29 2.97-2.82 3.32z" />
    </svg>
);
const StarIcon = () => (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="white">
       <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
    </svg>
);
const ChartIcon = () => (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="white">
        <path d="M3 3V21H21V19H5V3H3Z"/><path d="M7 11H10V17H7V11Z"/><path d="M11 7H14V17H11V7Z"/><path d="M15 13H18V17H15V13Z"/>
        <path d="M5 14L11 8L15 12L21 6" stroke="white" strokeWidth="2" fill="none" />
    </svg>
);
const HeartIcon = () => (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="white">
       <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" />
    </svg>
);

export default GameScreen;