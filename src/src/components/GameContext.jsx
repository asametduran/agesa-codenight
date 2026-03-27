import { createContext, useReducer, useEffect } from "react";

const STATE_VERSION = 2; // localStorage yapısı değişince artır → otomatik sıfırlanır

const INITIAL_STATE = {
  _version: STATE_VERSION,
  xp: 0,
  level: 1,
  stats: {
    health: 75,
    savings: 70,
    impulse: 2,
    subscriptions: 1,
    knowledge: 0,
    bes: 0,
  },
};

const LEVELS = [
  { level: 1, minXP: 0 },
  { level: 2, minXP: 50 },
  { level: 3, minXP: 150 },
  { level: 4, minXP: 300 },
  { level: 5, minXP: 500 },
];

function getLevel(xp) {
  return [...LEVELS].reverse().find(l => xp >= l.minXP)?.level || 1;
}

function gameReducer(state, action) {
  switch (action.type) {
    case "ADD_XP": {
      const newXP = state.xp + action.payload;
      return { ...state, xp: newXP, level: getLevel(newXP) };
    }
    case "UPDATE_STATS": {
      const e = action.payload;
      const s = state.stats;
      return {
        ...state,
        stats: {
          health:        Math.min(100, Math.max(0,  s.health        + (e.health        ?? 0))),
          savings:       Math.min(100, Math.max(0,  s.savings       + (e.savings       ?? 0))),
          impulse:       Math.min(3,  Math.max(1,   s.impulse       + (e.impulse       ?? 0))),
          subscriptions: Math.max(0,               s.subscriptions  + (e.subscriptions ?? 0)),
          knowledge:     Math.min(100, Math.max(0,  s.knowledge     + (e.knowledge     ?? 0))),
          bes:           Math.min(100, Math.max(0,  s.bes           + (e.bes           ?? 0))),
        },
      };
    }
    default:
      return state;
  }
}

export const GameContext = createContext(null);

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, INITIAL_STATE, (init) => {
    try {
      const saved = localStorage.getItem("finquest_state");
      if (!saved) return init;
      const parsed = JSON.parse(saved);
      // Eski/bozuk state → sıfırla
      if (parsed._version !== STATE_VERSION) return init;
      return parsed;
    } catch {
      return init;
    }
  });

  useEffect(() => {
    localStorage.setItem("finquest_state", JSON.stringify(state));
  }, [state]);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}
