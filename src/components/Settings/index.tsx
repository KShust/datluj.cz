import { useState } from 'react';
import { GameScreenSettings, GameResult } from '../GameScreen';
import './style.css';

interface SettingsProps {
  settings: GameScreenSettings;
  onStartGame: (settings: GameScreenSettings) => void;
  lastResult: GameResult | null;
}

const Settings: React.FC<SettingsProps> = ({ settings, onStartGame, lastResult }) => {
  const [time, setTime] = useState<number>(settings.time);
  const [wordCount, setWordCount] = useState<number>(settings.wordCount);
  const [wordLength, setWordLength] = useState<number>(settings.wordLength);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStartGame({
      time,
      wordCount,
      wordLength,
    });
  };

  return (
    <div className="settings">
      <h2>Nastavení hry</h2>
      <form onSubmit={handleSubmit} className="settings__form">
        <div className="settings__field">
          <label htmlFor="time">
            Čas hry (sekundy): {time}
          </label>
          <input
            id="time"
            type="range"
            min="5"
            max="30"
            value={time}
            onChange={(e) => setTime(Number(e.target.value))}
            className="settings__slider"
          />
        </div>

        <div className="settings__field">
          <label htmlFor="wordCount">
            Počet slov: {wordCount}
          </label>
          <input
            id="wordCount"
            type="range"
            min="5"
            max="50"
            value={wordCount}
            onChange={(e) => setWordCount(Number(e.target.value))}
            className="settings__slider"
          />
        </div>

        <div className="settings__field">
          <label htmlFor="wordLength">
            Délka slov: {wordLength} {wordLength >= 3 && wordLength <= 4 ? 'písmena' : 'písmen'}
          </label>
          <input
            id="wordLength"
            type="range"
            min="3"
            max="20"
            value={wordLength}
            onChange={(e) => setWordLength(Number(e.target.value))}
            className="settings__slider"
          />
        </div>

        <button type="submit" className="settings__button">
          Začít hru
        </button>
      </form>

      {lastResult && (
        <div className="settings__last-result">
          <h3>Poslední výsledek</h3>
          <div className="settings__last-result-content">
            <p>Skóre: {lastResult.score}</p>
            <p>Slov napsáno: {lastResult.wordsTyped}</p>
            <p>Čas: {lastResult.time}s</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;

