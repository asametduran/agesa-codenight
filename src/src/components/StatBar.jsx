import { useStats } from "../hooks/useStats";

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
    <path d="M3 3V21H21V19H5V3H3Z"/>
    <path d="M7 11H10V17H7V11Z"/>
    <path d="M11 7H14V17H11V7Z"/>
    <path d="M15 13H18V17H15V13Z"/>
    <path d="M5 14L11 8L15 12L21 6" stroke="white" strokeWidth="2" fill="none"/>
  </svg>
);

const HeartIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="white">
    <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" />
  </svg>
);

const BARS = [
  { key: "wallet",    label: "Bütçe",    Icon: MoneyIcon },
  { key: "knowledge", label: "Bilgi",    Icon: StarIcon  },
  { key: "bes",       label: "BES",      Icon: ChartIcon },
  { key: "happiness", label: "Mutluluk", Icon: HeartIcon },
];

function StatItem({ Icon, value }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <div style={{ width: 36, height: 36, flexShrink: 0 }}>
        <Icon />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 6 }}>
          <span style={{ fontSize: "0.95rem", fontWeight: 800, color: "white" }}>{value}%</span>
        </div>
        <div style={{
          width: "100%", height: 10,
          background: "rgba(255,255,255,0.15)",
          borderRadius: 10, overflow: "hidden",
        }}>
          <div style={{
            height: "100%",
            width: `${value}%`,
            background: "#a4d32e",
            borderRadius: 10,
            backgroundImage: "repeating-linear-gradient(45deg,rgba(255,255,255,0.2),rgba(255,255,255,0.2) 4px,transparent 4px,transparent 8px)",
            boxShadow: "0 0 12px rgba(164,211,46,0.7)",
            transition: "width 0.5s ease-out",
          }} />
        </div>
      </div>
    </div>
  );
}

export default function StatBar() {
  const stats = useStats();
  return (
    <div style={{
      width: "100%",
      maxWidth: 420,
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "24px 36px",
      padding: "20px 16px",
    }}>
      {BARS.map(bar => (
        <StatItem key={bar.key} label={bar.label} Icon={bar.Icon} value={stats[bar.key]} />
      ))}
    </div>
  );
}
