import React, { useState } from 'react';
import CardSwiper from './components/CardSwiper';
import './styles/global.css';

function App() {
  // Talha'nın statlarını şimdilik burada boş bir state olarak tutuyoruz ki hata vermesin
  const [stats, setStats] = useState({ wallet: 1000, happiness: 50, bes: 0, xp: 0 });

  return (
    <div className="app-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      {/* Sadece senin mekaniğin çalışacak */}
      <CardSwiper setStats={setStats} />
    </div>
  );
}

export default App;