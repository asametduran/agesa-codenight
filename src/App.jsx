import './index.css'
import StatBar from './components/StatBar'
import XPBar from './components/XPBar'
import { GameProvider } from './components/GameContext'

export default function App() {
  return (
    <GameProvider>
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center gap-6 p-8">
        <XPBar />
        <StatBar />
      </div>
    </GameProvider>
  )
}