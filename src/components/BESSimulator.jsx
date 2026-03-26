import { useState, useContext } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { calculateBES, getScenarioByPersona } from "../data/data.js";
import { GameContext } from "./GameContext";

function formatTL(value) {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M ₺`;
  if (value >= 1_000)     return `${(value / 1_000).toFixed(0)}K ₺`;
  return `${value} ₺`;
}

export default function BESSimulator({ personaId, onSave }) {
  const { dispatch } = useContext(GameContext);
  const [monthly, setMonthly] = useState(500);
  const [saved, setSaved] = useState(false);

  const scenario = getScenarioByPersona(personaId ?? "P1");
  const result = calculateBES(monthly, 10, scenario.annualReturnAvg);

  function handleSave() {
    if (saved) return;
    dispatch({ type: "ADD_XP", payload: 30 });
    dispatch({ type: "COMPLETE_PART", payload: { stageId: 5, partIndex: 2 } });
    setSaved(true);
    onSave?.();
  }

  return (
    <div className="w-full flex flex-col gap-4 px-2 sm:px-4">
      {/* Slider */}
      <div className="flex flex-col gap-1">
        <div className="flex justify-between text-xs text-white/70">
          <span>Aylık katkı</span>
          <span className="font-bold text-white">{monthly} ₺</span>
        </div>
        <input
          type="range" min={100} max={2000} step={50}
          value={monthly}
          onChange={e => setMonthly(Number(e.target.value))}
          className="w-full accent-teal-400"
        />
        <div className="flex justify-between text-xs text-white/40">
          <span>100 ₺</span><span>2.000 ₺</span>
        </div>
      </div>

      {/* Özet */}
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="bg-white/10 rounded-xl p-3">
          <div className="text-xs text-white/60 mb-1">10 yıl birikimi</div>
          <div className="text-sm font-bold text-teal-300">
            {formatTL(result.totalSavings)}
          </div>
        </div>
        <div className="bg-white/10 rounded-xl p-3">
          <div className="text-xs text-white/60 mb-1">Devlet katkısı</div>
          <div className="text-sm font-bold text-amber-300">
            {formatTL(result.govContrib)}
          </div>
        </div>
        <div className="bg-white/10 rounded-xl p-3">
          <div className="text-xs text-white/60 mb-1">Toplam</div>
          <div className="text-sm font-bold text-white">
            {formatTL(result.grandTotal)}
          </div>
        </div>
      </div>

      {/* Grafik */}
      <div className="w-full h-48 sm:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={result.chartData}
            margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="year" tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 10 }}
              tickFormatter={v => `${v}y`} />
            <YAxis tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 10 }}
              tickFormatter={formatTL} width={56} />
            <Tooltip
              contentStyle={{ background: "#1e1b4b", border: "none", borderRadius: 8 }}
              labelStyle={{ color: "white" }}
              formatter={(v, name) => [formatTL(v), name]}
            />
            <Legend wrapperStyle={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }} />
            <Line type="monotone" dataKey="birikim"
              stroke="#2dd4bf" strokeWidth={2} dot={false} name="Birikim" />
            <Line type="monotone" dataKey="devletKatkisi"
              stroke="#fbbf24" strokeWidth={2} dot={false} name="Devlet katkısı" />
            <Line type="monotone" dataKey="toplam"
              stroke="#ffffff" strokeWidth={2} dot={false} name="Toplam" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Risk profili notu */}
      <p className="text-xs text-white/50 text-center">
        {scenario.label} · Yıllık ort. %{scenario.annualReturnAvg} getiri
      </p>

      {/* Kaydet butonu */}
      <button
        onClick={handleSave}
        disabled={saved}
        className={`w-full py-3 rounded-2xl font-bold text-sm transition-all
          ${saved
            ? "bg-white/10 text-white/40 cursor-default"
            : "bg-teal-400 text-teal-900 hover:bg-teal-300 active:scale-95"
          }`}
      >
        {saved ? "Senaryo kaydedildi ✓" : "Bu senaryoyu kaydet → +30 XP"}
      </button>
    </div>
  );
}