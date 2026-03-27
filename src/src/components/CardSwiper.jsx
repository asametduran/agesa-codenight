import { useState, useEffect, useContext } from 'react';
import { motion, useMotionValue, useTransform, useAnimation } from 'framer-motion';
import { cards } from '../data/cards';
import { GameContext } from './GameContext';
import GameOverScreen from './GameOverScreen';
import './CardSwiper.css';

// Quiz kartları swipe kartları arasına serpiştirilir (her 5 kartta bir)
const QUIZ_CARDS = [
  {
    id: 'q001',
    type: 'quiz',
    title: 'Bonus Bilgi & Quiz!',
    text: "Bireysel Emeklilik Sistemi'nde (BES) Devlet Katkısı oranı yüzde kaçtır?",
    options: [{ id: 'A', text: '%10' }, { id: 'B', text: '%20' }, { id: 'C', text: '%30' }, { id: 'D', text: '%25' }],
    correctOptionId: 'B',
    effectCorrect: { knowledge: +15, bes: +5, xp: 50 },
    effectWrong:   { knowledge: -10, xp: -10 },
  },
  {
    id: 'q002',
    type: 'quiz',
    title: 'Finansal IQ Testi!',
    text: 'Enflasyon yükseldiğinde tasarruf hesabındaki paranın satın alma gücü ne olur?',
    options: [{ id: 'A', text: 'Artar' }, { id: 'B', text: 'Aynı kalır' }, { id: 'C', text: 'Azalır' }, { id: 'D', text: 'İkiye katlanır' }],
    correctOptionId: 'C',
    effectCorrect: { knowledge: +15, xp: 50 },
    effectWrong:   { knowledge: -10, xp: -10 },
  },
  {
    id: 'q003',
    type: 'quiz',
    title: 'Bütçe Sorusu!',
    text: '50/30/20 bütçe kuralında %20 neye ayrılır?',
    options: [{ id: 'A', text: 'Eğlenceye' }, { id: 'B', text: 'Zorunlu giderlere' }, { id: 'C', text: 'Tasarruf & yatırıma' }, { id: 'D', text: 'Gıdaya' }],
    correctOptionId: 'C',
    effectCorrect: { knowledge: +15, xp: 50 },
    effectWrong:   { knowledge: -10, xp: -10 },
  },
];

// Swipe ve quiz kartlarını birleştir (her 5 swipe kartından sonra 1 quiz)
function buildDeck() {
  const deck = [];
  let quizIdx = 0;
  cards.forEach((card, i) => {
    deck.push({ ...card, type: 'swipe' });
    if ((i + 1) % 5 === 0 && quizIdx < QUIZ_CARDS.length) {
      deck.push(QUIZ_CARDS[quizIdx++]);
    }
  });
  return deck;
}

const DECK = buildDeck();

export default function CardSwiper() {
  const [index, setIndex] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const { dispatch } = useContext(GameContext);

  const card = DECK[index];
  const x = useMotionValue(0);
  const controls = useAnimation();
  const rotate = useTransform(x, [-200, 0, 200], [-15, 0, 15]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

  const dispatchEffects = (effect) => {
    dispatch({
      type: 'UPDATE_STATS',
      payload: {
        savings:   effect.wallet      ?? 0,
        health:    effect.happiness   ?? 0,
        knowledge: effect.knowledge   ?? 0,
        bes:       effect.bes         ?? 0,
      },
    });
    if (effect.xp) dispatch({ type: 'ADD_XP', payload: effect.xp });
  };

  const nextCard = async (animConfig) => {
    await controls.start({ ...animConfig, transition: { duration: 0.3 } });
    const next = index + 1;
    if (next >= DECK.length) {
      setGameOver(true);
    } else {
      setIndex(next);
      setSelectedOption(null);
      x.set(0);
      controls.set({ x: 0, rotate: 0, opacity: 1 });
    }
  };

  const handleSwipe = (direction) => {
    if (card.type !== 'swipe') return;
    const effect = direction === 'right' ? card.effectYes : card.effectNo;
    dispatchEffects(effect);
    nextCard(direction === 'right'
      ? { x: 500, rotate: 30, opacity: 0 }
      : { x: -500, rotate: -30, opacity: 0 }
    );
  };

  const handleDragEnd = (_, info) => {
    if (card.type !== 'swipe') return;
    if (info.offset.x > 100) handleSwipe('right');
    else if (info.offset.x < -100) handleSwipe('left');
    else controls.start({ x: 0, rotate: 0, transition: { type: 'spring', stiffness: 300, damping: 20 } });
  };

  const handleOptionClick = (optId) => {
    if (selectedOption || card.type !== 'quiz') return;
    setSelectedOption(optId);
    const isCorrect = optId === card.correctOptionId;
    dispatchEffects(isCorrect ? card.effectCorrect : card.effectWrong);
    setTimeout(() => nextCard({ opacity: 0 }), 1800);
  };

  useEffect(() => {
    const onKey = (e) => {
      if (card?.type !== 'swipe') return;
      if (e.key === 'ArrowRight') handleSwipe('right');
      if (e.key === 'ArrowLeft')  handleSwipe('left');
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index]);

  if (gameOver) return <GameOverScreen />;

  return (
    <div className="swiper-root">
      {/* Sol ok */}
      {card.type === 'swipe' && (
        <button className="swipe-btn left" onClick={() => handleSwipe('left')} aria-label="Hayır">
          <svg viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 19l-7-7 7-7"/>
          </svg>
        </button>
      )}

      {/* Arka plan kartı */}
      <div className="bg-card" />

      {/* Aktif kart */}
      <motion.div
        key={index}
        drag={card.type === 'swipe' ? 'x' : false}
        dragConstraints={{ left: 0, right: 0 }}
        initial={{ opacity: 1, x: 0, rotate: 0 }}
        animate={controls}
        style={{ x, rotate, opacity }}
        onDragEnd={handleDragEnd}
        whileDrag={{ scale: 1.05 }}
        className="game-card"
      >
        {card.type === 'swipe' ? (
          <SwipeCard card={card} index={index} total={DECK.length} />
        ) : (
          <QuizCard card={card} selectedOption={selectedOption} onSelect={handleOptionClick} />
        )}
      </motion.div>

      {/* Sağ ok */}
      {card.type === 'swipe' && (
        <button className="swipe-btn right" onClick={() => handleSwipe('right')} aria-label="Evet">
          <svg viewBox="0 0 24 24" fill="none" stroke="#a4d32e" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 5l7 7-7 7"/>
          </svg>
        </button>
      )}
    </div>
  );
}

function SwipeCard({ card, index, total }) {
  return (
    <>
      <div className="card-category">{card.category}</div>
      <div className="card-icon">{card.icon}</div>
      <h2 className="card-title">{card.title}</h2>
      <p className="card-desc">{card.description}</p>
      <div className="card-progress">{index + 1} / {total}</div>
      <div className="card-buttons">
        <span className="card-hint left">← Hayır</span>
        <span className="card-hint right">Evet →</span>
      </div>
    </>
  );
}

function QuizCard({ card, selectedOption, onSelect }) {
  return (
    <>
      {selectedOption && (
        <div className={`xp-popup ${selectedOption === card.correctOptionId ? 'correct' : 'wrong'}`}>
          {selectedOption === card.correctOptionId
            ? <><span>✨🌟✨</span><div className="xp-text correct">+50 XP<br/><small>Kazandın!</small></div></>
            : <><span style={{filter:'grayscale(1)'}}>⭐★</span><div className="xp-text wrong">-10 XP<br/><small>Kaybedildi!</small></div></>
          }
        </div>
      )}
      <div className="quiz-icon">📗</div>
      <h3 className="quiz-title">{card.title}</h3>
      <p className="quiz-question">{card.text}</p>
      <div className="quiz-options">
        {card.options.map(opt => {
          let cls = 'quiz-opt';
          if (selectedOption) {
            if (opt.id === card.correctOptionId) cls += ' correct-select';
            else if (opt.id === selectedOption)   cls += ' wrong-select';
          }
          return (
            <div key={opt.id} className={cls} onClick={() => onSelect(opt.id)}>
              <span>{opt.id}) {opt.text}</span>
              {selectedOption && opt.id === card.correctOptionId && <span>✔️</span>}
              {selectedOption && opt.id === selectedOption && opt.id !== card.correctOptionId && <span>❌</span>}
            </div>
          );
        })}
      </div>
    </>
  );
}

