import { useStats } from "../hooks/useStats";

const BARS = [
  { key: "wallet",    label: "Cüzdan",   icon: "💰", color: "#a4d32e", glow: "rgba(164,211,46,0.4)"  },
  { key: "knowledge", label: "Bilgi",    icon: "📚", color: "#a4d32e", glow: "rgba(164,211,46,0.4)"  },
  { key: "bes",       label: "BES",      icon: "📈", color: "#a4d32e", glow: "rgba(164,211,46,0.4)"  },
  { key: "happiness", label: "Mutluluk", icon: "😊", color: "#a4d32e", glow: "rgba(164,211,46,0.4)"  },
];

function Bar({ label, icon, value, color, glow }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", width: "100%" }}>
      <span style={{ fontSize: "14px", width: "18px" }}>{icon}</span>
      <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.6)", width: "52px", flexShrink: 0 }}>{label}</span>
      <div style={{ flex: 1, height: "6px", background: "rgba(255,255,255,0.12)", borderRadius: "999px", overflow: "hidden" }}>
        <div style={{
          height: "100%",
          width: `${value}%`,
          background: color,
          borderRadius: "999px",
          transition: "width 0.5s ease",
          boxShadow: `0 0 8px ${glow}`,
        }} />
      </div>
      <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", width: "28px", textAlign: "right" }}>{value}</span>
    </div>
  );
}

export default function StatBar() {
  const stats = useStats();
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      padding: "16px 20px",
      background: "rgba(255,255,255,0.04)",
      borderBottom: "1px solid rgba(255,255,255,0.07)",
    }}>
      {BARS.map(bar => (
        <Bar key={bar.key} label={bar.label} icon={bar.icon} value={stats[bar.key]} color={bar.color} glow={bar.glow} />
      ))}
    </div>
  );
}
