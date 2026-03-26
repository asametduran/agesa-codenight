import { useLevel } from "../hooks/useLevel";

export default function XPBar() {
  const { level, label, xp, nextLevelXP, progressPct } = useLevel();

  return (
    <div className="w-full px-2 sm:px-4">
      <div className="flex justify-between items-center mb-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-yellow-400">
            Seviye {level}
          </span>
          <span className="text-xs text-white/60">{label}</span>
        </div>
        <span className="text-xs text-white/60">
          {xp} {nextLevelXP ? `/ ${nextLevelXP} XP` : "XP — Maksimum"}
        </span>
      </div>
      <div className="h-2 bg-white/20 rounded-full overflow-hidden">
        <div
          className="h-full bg-yellow-400 rounded-full transition-all duration-700"
          style={{ width: `${progressPct}%` }}
        />
      </div>
    </div>
  );
}