import { useState, useContext } from 'react';
import { GameContext } from '../components/GameContext';
import './PersonaScreen.css';

const PERSONAS = [
  { id: 'P1', name: 'Bütçe Dostu',             desc: 'Az ama öz harcarım.',                          icon: '🎒' },
  { id: 'P2', name: 'Anlık Harcayan',           desc: 'Para nereye gidiyor?',                         icon: '🛍️' },
  { id: 'P3', name: 'Bilgili Ama Hareketsiz',   desc: 'Biraz kurduyum ama harcamalarım düzensiz.',    icon: '💻' },
  { id: 'P4', name: 'Yatırım Meraklısı',        desc: 'Geleceği şimdiden planlarım.',                 icon: '📈' },
  { id: 'P5', name: 'Bütçe Stresli',            desc: 'Gelirim değişken, hesap yapmalıyım.',          icon: '💸' },
];

function PersonaScreen({ onSelect }) {
  const [selectedId, setSelectedId] = useState('P3');
  const { dispatch } = useContext(GameContext);

  const handleStart = () => {
    dispatch({ type: 'SET_PERSONA', payload: selectedId });
    onSelect(selectedId);
  };

  return (
    <div className="persona-container">
      <div className="persona-header">
        <h1>Finansal Karakterini Seç</h1>
        <p>Sana en yakın profili seçerek oyuna başla.</p>
      </div>

      <div className="persona-grid">
        {PERSONAS.map((p) => (
          <div
            key={p.id}
            className={`persona-card ${selectedId === p.id ? 'selected' : ''}`}
            onClick={() => setSelectedId(p.id)}
          >
            <span className="persona-badge">{p.id}</span>
            <span className="persona-selected-label">SELECTED</span>
            <div className="persona-icon-wrap">
              <span className="persona-icon">{p.icon}</span>
            </div>
            <h3 className="persona-name">{p.name}</h3>
            <p className="persona-desc">{p.desc}</p>
          </div>
        ))}
      </div>

      <button className="persona-action-btn" onClick={handleStart}>
        OYUNA BAŞLA
      </button>
    </div>
  );
}

export default PersonaScreen;
