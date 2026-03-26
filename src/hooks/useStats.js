import { useContext, useMemo } from "react";
import { GameContext } from "../components/GameContext";

export function useStats() {
  const { state } = useContext(GameContext);
  const { stats, completedParts } = state;

  return useMemo(() => {
    // Cüzdan: savings eksi impulse ve abonelik yükü
    const wallet = Math.min(100, Math.max(0,
      stats.savings - (stats.impulse * 10) - (stats.subscriptions * 5)
    ));

    // Bilgi: tamamlanan part / toplam 12 part
    const knowledge = Math.min(100, Math.round(
      (completedParts.length / 12) * 100
    ));

    // BES: stage 5 part'ları (4 part)
    const besParts = completedParts.filter(p => p.stageId === 5).length;
    const bes = Math.round((besParts / 4) * 100);

    // Mutluluk: direkt health
    const happiness = Math.min(100, Math.max(0, stats.health));

    return { wallet, knowledge, bes, happiness };
  }, [stats, completedParts]);
}