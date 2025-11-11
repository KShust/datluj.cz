import GameScreen from './components/GameScreen';
import ScoreTable from './components/ScoreTable';
import { useState } from 'react';
import { GameResult } from './components/GameScreen';

const App: React.FC = () => {
  const [lastGameResult, setLastGameResult] = useState<GameResult | null>(null);

  const handleGameEnd = (result: GameResult) => {
    setLastGameResult(result);
  };

  return (
    <div className="container">
      <h1>Datlování - Hra</h1>
      <div className="app__layout">
        <div className="app__game-screen">
          <GameScreen onGameEnd={handleGameEnd} />
        </div>
        <div className="app__score-table">
          <ScoreTable newResult={lastGameResult} />
        </div>
      </div>
    </div>
  );
};

export default App;