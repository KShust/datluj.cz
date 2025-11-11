import { useState } from 'react';
import Settings from '../Settings';
import Stage from '../Stage';
import Result from '../Result';
import './style.css';

type Screen = 'settings' | 'game' | 'result';

export interface GameResult {
  time: number;
  wordsTyped: number;
  finishTime: number; 
  score: number;
  won: boolean;
}

export interface GameScreenSettings {
  time: number; 
  wordCount: number;
  wordLength: number; 
}

interface GameScreenProps {
  onGameEnd?: (result: GameResult) => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ onGameEnd }) => {
  const [screen, setScreen] = useState<Screen>('settings');
  const [settings, setSettings] = useState<GameScreenSettings>({
    time: 30,
    wordCount: 10,
    wordLength: 6,
  });
  const [lastResult, setLastResult] = useState<GameResult | null>(null);

  const handleStartGame = (newSettings: GameScreenSettings) => {
    setSettings(newSettings);
    setScreen('game');
  };

  const handleEndGame = (result: GameResult) => {
    setLastResult(result);
    setScreen('result');
    if (onGameEnd) {
      onGameEnd(result);
    }
  };

  const handleNewGame = () => {
    setScreen('settings');
  };

  return (
    <div className="start-screen">
      {screen === 'settings' && (
        <Settings
          settings={settings}
          onStartGame={handleStartGame}
          lastResult={lastResult}
        />
      )}
      {screen === 'game' && (
        <Stage
          settings={settings}
          onGameEnd={handleEndGame}
        />
      )}
      {screen === 'result' && lastResult && (
        <Result
          result={lastResult}
          onNewGame={handleNewGame}
        />
      )}
    </div>
  );
};

export default GameScreen;

