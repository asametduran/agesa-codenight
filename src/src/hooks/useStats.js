import { useContext, useMemo } from "react";
import { GameContext } from "../components/GameContext";

export function useStats() {
  const { state } = useContext(GameContext);
  const { stats } = state;

  return useMemo(() => ({
    wallet:    Math.min(100, Math.max(0, stats.savings - (stats.impulse * 10) - (stats.subscriptions * 5))),
    happiness: Math.min(100, Math.max(0, stats.health)),
    knowledge: Math.min(100, Math.max(0, stats.knowledge ?? 0)),
    bes:       Math.min(100, Math.max(0, stats.bes       ?? 0)),
  }), [stats]);
}
