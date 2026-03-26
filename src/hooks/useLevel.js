import { useContext, useMemo } from "react";
import { GameContext } from "../components/GameContext";

const LEVELS = [
  { level: 1, minXP: 0,   maxXP: 49,  label: "Yeni başlayan"  },
  { level: 2, minXP: 50,  maxXP: 149, label: "Bütçe farkında" },
  { level: 3, minXP: 150, maxXP: 299, label: "Tasarruf ustası" },
  { level: 4, minXP: 300, maxXP: 499, label: "Birikim kaşifi"  },
  { level: 5, minXP: 500, maxXP: 999, label: "BES mezunu"      },
];

export function useLevel() {
  const { state } = useContext(GameContext);
  const { xp } = state;

  return useMemo(() => {
    const current = [...LEVELS].reverse().find(l => xp >= l.minXP) || LEVELS[0];
    const next = LEVELS.find(l => l.level === current.level + 1);

    const progressXP = xp - current.minXP;
    const rangeXP = next ? next.minXP - current.minXP : 1;
    const progressPct = next ? Math.round((progressXP / rangeXP) * 100) : 100;

    return {
      level: current.level,
      label: current.label,
      xp,
      nextLevelXP: next?.minXP ?? null,
      progressPct,
    };
  }, [xp]);
}