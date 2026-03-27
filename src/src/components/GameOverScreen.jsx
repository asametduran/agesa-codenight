import { useContext } from 'react';
import { GameContext } from './GameContext';
import { useStats } from '../hooks/useStats';
import {
  calculateBES,
  getScenarioByPersona,
  buildLeaderboard,
  PERSONAS,
} from '../../../data';
import ChatBot from './ChatBot';
import './GameOverScreen.css';

// ─── Stat bar satırı ──────────────────────────────────────────────
function StatRow({ label, value, color }) {
  return (
    <div className="go-stat-row">
      <span className="go-stat-label">{label}</span>
      <div className="go-stat-track">
        <div
          className="go-stat-fill"
          style={{ width: `${value}%`, background: color }}
        />
      </div>
      <span className="go-stat-value">{value}</span>
    </div>
  );
}

// ─── Ana bileşen ──────────────────────────────────────────────────
export default function GameOverScreen() {
  const { state } = useContext(GameContext);
  const stats = useStats();

  const personaId  = state.persona || 'P3';
  const persona    = PERSONAS[personaId];
  const scenario   = getScenarioByPersona(personaId);

  // BES hesabı: savings stat'tan aylık katkı türet (min 200, max 2000 TL)
  const monthly    = Math.max(200, Math.round((stats.wallet / 100) * 2000));
  const besResult  = calculateBES(monthly, 30, scenario.annualReturnAvg);

  // Leaderboard
  const board      = buildLeaderboard(state.xp, state.level);
  const myRank     = board.findIndex(u => u.userId === 'YOU') + 1;

  // Stat renk: yeşil ≥ 60, sarı ≥ 30, kırmızı < 30
  const statColor  = (v) => v >= 60 ? '#a4d32e' : v >= 30 ? '#f4db3b' : '#f97316';

  return (
    <div className="go-overlay">
      <div className="go-sheet">

        {/* Başlık */}
        <h2 className="go-heading">OYUN BİTTİ & ANALİZ</h2>
        <p className="go-persona-tag">{persona?.label ?? personaId}</p>

        {/* ─── 1. FİNANSAL ÖZET ─────────────────────────────── */}
        <section className="go-section">
          <h3 className="go-section-title">📊 Finansal Özet</h3>
          <StatRow label="Bütçe"    value={stats.wallet}    color={statColor(stats.wallet)} />
          <StatRow label="Bilgi"    value={stats.knowledge} color={statColor(stats.knowledge)} />
          <StatRow label="BES"      value={stats.bes}       color={statColor(stats.bes)} />
          <StatRow label="Mutluluk" value={stats.happiness} color={statColor(stats.happiness)} />
          <div className="go-xp-badge">
            <span>⭐ {state.xp} XP</span>
            <span>Seviye {state.level}</span>
          </div>
        </section>

        {/* ─── 2. BES PROJEKSİYONU ──────────────────────────── */}
        <section className="go-section">
          <h3 className="go-section-title">📈 BES Projeksiyonu (30 Yıl)</h3>

          <div className="go-bes-params">
            <div className="go-bes-param">
              <span className="go-bes-param-label">Aylık Katkı</span>
              <span className="go-bes-param-val">₺{monthly.toLocaleString('tr-TR')}</span>
            </div>
            <div className="go-bes-param">
              <span className="go-bes-param-label">Risk Profili</span>
              <span className="go-bes-param-val">{scenario.label}</span>
            </div>
            <div className="go-bes-param">
              <span className="go-bes-param-label">Ort. Yıllık Getiri</span>
              <span className="go-bes-param-val">%{scenario.annualReturnAvg}</span>
            </div>
          </div>

          {/* Büyüyen bar grafiği */}
          <div className="go-bes-chart">
            {[0, 5, 10, 15, 20, 25, 30].map((yr) => {
              if (yr === 0) return null;
              const data = besResult.chartData[yr - 1];
              const pct  = Math.round((data.toplam / besResult.grandTotal) * 100);
              return (
                <div key={yr} className="go-bes-bar-col">
                  <div
                    className="go-bes-bar"
                    style={{ height: `${Math.max(8, pct)}%` }}
                  />
                  <span className="go-bes-bar-label">{yr}</span>
                </div>
              );
            })}
          </div>

          {/* Sonuç kutusu */}
          <div className="go-insight-box">
            <div className="go-sparkles">✨</div>
            <p>
              Ayda <strong>₺{monthly.toLocaleString('tr-TR')}</strong> katkıyla
              30 yılda birikimin:
            </p>
            <div className="go-amount">
              ₺{besResult.grandTotal.toLocaleString('tr-TR')}
            </div>
            <p className="go-gov-note">
              (Devlet Katkısı: ₺{besResult.govContrib.toLocaleString('tr-TR')} dahil)
            </p>
          </div>
        </section>

        {/* ─── 3. LEADERBOARD ───────────────────────────────── */}
        <section className="go-section">
          <h3 className="go-section-title">🏆 Liderboard — #{myRank}. Sıra</h3>
          <div className="go-board">
            {board.map((u, i) => (
              <div key={u.userId} className={`go-board-row ${u.userId === 'YOU' ? 'you' : ''}`}>
                <span className="go-board-rank">
                  {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i + 1}.`}
                </span>
                <span className="go-board-name">{u.name}</span>
                <span className="go-board-persona">{u.persona}</span>
                <span className="go-board-xp">{(u.xp ?? 0).toLocaleString('tr-TR')} XP</span>
              </div>
            ))}
          </div>
        </section>

        {/* ─── 4. AI KOÇU ───────────────────────────────────── */}
        <ChatBot playerData={{
          persona:    persona?.label ?? personaId,
          wallet:     stats.wallet,
          knowledge:  stats.knowledge,
          bes:        stats.bes,
          happiness:  stats.happiness,
          xp:         state.xp,
          level:      state.level,
          monthly,
          grandTotal: besResult.grandTotal,
        }} />

      </div>
    </div>
  );
}
