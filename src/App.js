import React, { useState } from 'react';
import './App.css';
import StartScreen from './StartScreen';
import PersonaScreen from './PersonaScreen';
import GameScreen from './GameScreen';

function App() {
  const [currentScreen, setCurrentScreen] = useState('start');

  return (
    <div className="app-container">
      {/* 1. EKRAN: BAŞLANGIÇ */}
      {currentScreen === 'start' && (
        <StartScreen onStart={() => setCurrentScreen('persona')} />
      )}
      
      {/* 2. EKRAN: PERSONA SEÇİMİ */}
      {currentScreen === 'persona' && (
        <PersonaScreen onSelect={() => setCurrentScreen('game')} />
      )}

      {/* 3. EKRAN: OYUN */}
      {currentScreen === 'game' && (
        <GameScreen />
      )}
    </div>
  );
}

export default App;