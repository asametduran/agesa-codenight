import React, { useState } from 'react';
import './PersonaScreen.css';

function PersonaScreen({ onSelect }) {
  // P3 görselde seçili olduğu için default olarak P3 belirledik. 
  const [selectedId, setSelectedId] = useState('P3');

  const personas = [
    { id: 'P1', name: 'Bütçe Dostu', desc: 'Az ama öz harcarım.', icon: '🎒' },
    { id: 'P2', name: 'Anlık Harcayan', desc: 'Para nereye gidiyor?', icon: '🛍️' },
    { id: 'P3', name: 'Bilgili Ama Hareketsiz', desc: 'Biraz kurduyum ama harcamalarım düzensiz.', icon: '💻' },
    { id: 'P4', name: 'Yatırım Meraklısı', desc: 'Geleceği şimdiden planlarım.', icon: '📈' },
    { id: 'P5', name: 'Bütçe Stresli', desc: 'Gelirim değişken, hesap yapmalıyım.', icon: '💸' }
  ];

  return (
    <div className="persona-container">
      <div className="header">
        <h1>Finansal Karakterini Seç</h1>
        <p>Sana en yakın profili seçerek oyuna başla.</p>
      </div>

      <div className="cards-grid">
        {personas.map((p) => (
          <div 
            key={p.id}
            className={`card ${selectedId === p.id ? 'selected' : ''}`}
            onClick={() => setSelectedId(p.id)}
          >
            <span className="badge-text">{p.id}</span>
            <span className="selected-label">SELECTED</span>
            <div className="icon-container">
                <span className="icon-emoji">{p.icon}</span>
            </div>
            <h3 className="card-title">{p.name}</h3>
            <p className="card-desc">{p.desc}</p>
          </div>
        ))}
      </div>

      <button 
        className="action-button" 
        disabled={!selectedId}
        onClick={onSelect}
      >
        OYUNA BAŞLA
      </button>
    </div>
  );
}

export default PersonaScreen;