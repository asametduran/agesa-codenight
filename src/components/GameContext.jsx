// GameContext.jsx — merkezi XP ve stat store'u
import { createContext, useReducer, useEffect } from "react";

// ─── Başlangıç state'i ────────────────────────────────────────────────────────
// users.csv'den seçilen kullanıcının değerleri buraya manuel girilir
const INITIAL_STATE = {
  xp: 0,
  level: 1,
  badges: [],
  completedParts: [],   // [{ stageId, partIndex }]

  // users.csv kolonları — U0001 değerleri örnek
  stats: {
    health: 75,          // financial_health_score (0–100)
    savings: 70,         // saving_potential_score → 0–100'e normalize et
    impulse: 2,          // impulse_spend_tendency → low=1, medium=2, high=3
    subscriptions: 1,    // subscription_count
  },
};

// ─── Seviye eşikleri ─────────────────────────────────────────────────────────
const LEVELS = [
  { level: 1, minXP: 0,   label: "Yeni başlayan" },
  { level: 2, minXP: 50,  label: "Bütçe farkında" },
  { level: 3, minXP: 150, label: "Tasarruf ustası" },
  { level: 4, minXP: 300, label: "Birikim kaşifi" },
  { level: 5, minXP: 500, label: "BES mezunu"     },
];

// ─── Rozet tanımları ─────────────────────────────────────────────────────────
const BADGE_RULES = [
  { id: "first_quiz",   label: "İlk soru",      check: (s) => s.completedParts.length >= 1 },
  { id: "stage1_done",  label: "Bütçe farkında", check: (s) => s.completedParts.some(p => p.stageId === 1 && p.partIndex === 2) },
  { id: "good_saver",   label: "Tasarruf +100",  check: (s) => s.stats.savings >= 100 },
  { id: "bes_graduate", label: "BES mezunu",     check: (s) => s.completedParts.some(p => p.stageId === 5 && p.partIndex === 3) },
];

function getLevel(xp) {
  return [...LEVELS].reverse().find(l => xp >= l.minXP) || LEVELS[0];
}

function checkBadges(state) {
  const newBadges = BADGE_RULES
    .filter(rule => !state.badges.includes(rule.id) && rule.check(state))
    .map(rule => rule.id);
  return newBadges;
}

// ─── Reducer ─────────────────────────────────────────────────────────────────
function gameReducer(state, action) {
  switch (action.type) {

    case "ADD_XP": {
      const newXP = state.xp + action.payload;
      const newLevel = getLevel(newXP).level;
      return { ...state, xp: newXP, level: newLevel };
    }

    case "UPDATE_STATS": {
      const effects = action.payload;
      const newStats = {
        health:        Math.min(100, Math.max(0, state.stats.health + (effects.health ?? 0))),
        savings:       state.stats.savings + (effects.savings ?? 0),
        impulse:       Math.min(3, Math.max(1, state.stats.impulse + (effects.impulse ?? 0))),
        subscriptions: Math.max(0, state.stats.subscriptions + (effects.subscriptions ?? 0)),
      };
      return { ...state, stats: newStats };
    }

    case "COMPLETE_PART": {
      const newCompleted = [...state.completedParts, action.payload];
      const newState = { ...state, completedParts: newCompleted };
      const earnedBadges = checkBadges(newState);
      return { ...newState, badges: [...state.badges, ...earnedBadges] };
    }

    case "LOAD": {
      // localStorage'dan yükleme
      return { ...INITIAL_STATE, ...action.payload };
    }

    default:
      return state;
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────
export const GameContext = createContext(null);

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, INITIAL_STATE, (init) => {
    try {
      const saved = localStorage.getItem("finquest_state");
      return saved ? { ...init, ...JSON.parse(saved) } : init;
    } catch {
      return init;
    }
  });

  // Her state değişiminde localStorage'a yaz
  useEffect(() => {
    localStorage.setItem("finquest_state", JSON.stringify(state));
  }, [state]);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}