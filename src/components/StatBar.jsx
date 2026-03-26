import { useStats } from "../hooks/useStats";

const BARS = [
  { key: "wallet",    label: "Cüzdan",   icon: "💰", color: "bg-amber-400"  },
  { key: "knowledge", label: "Bilgi",    icon: "📚", color: "bg-blue-400"   },
  { key: "bes",       label: "BES",      icon: "📈", color: "bg-teal-400"   },
  { key: "happiness", label: "Mutluluk", icon: "😊", color: "bg-pink-400"   },
];

function Bar({ label, icon, value, color }) {
  return (
    <div className="flex items-center gap-2 w-full">
      <span className="text-sm w-4">{icon}</span>
      <span className="text-xs text-white/70 w-14 shrink-0">{label}</span>
      <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="text-xs text-white/60 w-8 text-right">{value}</span>
    </div>
  );
}

export default function StatBar() {
  const stats = useStats();
  return (
    <div className="flex flex-col gap-2 w-full px-2 sm:px-4">
      {BARS.map(bar => (
        <Bar
          key={bar.key}
          label={bar.label}
          icon={bar.icon}
          value={stats[bar.key]}
          color={bar.color}
        />
      ))}
    </div>
  );
}