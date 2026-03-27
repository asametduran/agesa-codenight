import { GameProvider } from './components/GameContext';
import CardSwiper from './components/CardSwiper';
import StatBar from './components/StatBar';
import './styles/global.css';

function App() {
  return (
    <GameProvider>
      <div className="app-root">
        <StatBar />
        <CardSwiper />
      </div>
    </GameProvider>
  );
}

export default App;
