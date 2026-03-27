import { useState } from 'react';
import { GameProvider } from './components/GameContext';
import StartScreen from './screens/StartScreen';
import PersonaScreen from './screens/PersonaScreen';
import StatBar from './components/StatBar';
import CardSwiper from './components/CardSwiper';
import './styles/global.css';

function GameFlow() {
  const [screen, setScreen] = useState('start'); // 'start' | 'persona' | 'game'

  if (screen === 'start') {
    return <StartScreen onStart={() => setScreen('persona')} />;
  }

  if (screen === 'persona') {
    return <PersonaScreen onSelect={() => setScreen('game')} />;
  }

  return (
    <div className="app-root">
      <StatBar />
      <CardSwiper />
    </div>
  );
}

export default function App() {
  return (
    <GameProvider>
      <GameFlow />
    </GameProvider>
  );
}
