import { useState, useEffect, useCallback } from 'react';
import Wordbox from '../Wordbox';
import HealthBar from '../HealthBar';
import wordList from '../../word-list';
import { GameScreenSettings, GameResult } from '../GameScreen';
import './style.css';

const generateWord = (size: number): string | null => {
  const sizeIndex = size - 3;
  
  if (sizeIndex < 0 || sizeIndex >= wordList.length) {
    return null;
  }
  
  const words = wordList[sizeIndex];
  if (!words || words.length === 0) {
    return null;
  }
  
  const wordIndex = Math.floor(Math.random() * words.length);
  return words[wordIndex];
};

interface StageProps {
  settings: GameScreenSettings;
  onGameEnd: (result: GameResult) => void;
}

const Stage: React.FC<StageProps> = ({ settings, onGameEnd }) => {
  const [words, setWords] = useState<string[]>([]);
  const [health, setHealth] = useState<number>(100);
  const [timeLeft, setTimeLeft] = useState<number>(settings.time);
  const [wordsTyped, setWordsTyped] = useState<number>(0);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gameEnded, setGameEnded] = useState<boolean>(false);

  useEffect(() => {
    const initialWords: string[] = [];
    for (let i = 0; i < 3; i++) {
      const word = generateWord(settings.wordLength);
      if (word) {
        initialWords.push(word);
      }
    }
    setWords(initialWords);
  }, [settings.wordLength]);

  useEffect(() => {
    if (!gameStarted || gameEnded) {
      return;
    }

    if (timeLeft <= 0) {
      setGameEnded(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStarted, gameEnded, timeLeft]);

  useEffect(() => {
    if (!gameStarted && words.length > 0) {
      const handleFirstKey = () => setGameStarted(true);

      document.addEventListener('keyup', handleFirstKey);
      return () => document.removeEventListener('keyup', handleFirstKey);
    }
  }, [gameStarted, words.length]);

  useEffect(() => {
    if (gameEnded || health <= 0) {
      const won = health > 0 && wordsTyped >= settings.wordCount;
      const score = calculateScore(wordsTyped, timeLeft, health);
      
      const result: GameResult = {
        time: settings.time - timeLeft,
        wordsTyped,
        finishTime: Date.now(),
        score,
        won,
      };

      onGameEnd(result);
    }
  }, [gameEnded, health, wordsTyped, settings, timeLeft, onGameEnd]);

  const handleFinish = useCallback(() => {
    setWordsTyped((prev) => prev + 1);

    if (wordsTyped + 1 >= settings.wordCount) {
      setGameEnded(true);
      return;
    }

    const newWord = generateWord(settings.wordLength);
    if (newWord) {
      setWords((prev) => [...prev.slice(1), newWord]);
    }
  }, [settings.wordCount, settings.wordLength, wordsTyped]);

  const handleMistake = useCallback(() => {
    setHealth((prev) => {
      const newHealth = Math.max(0, prev - 10);
      if (newHealth <= 0) {
        setGameEnded(true);
      }
      return newHealth;
    });
  }, []);

  const calculateScore = (typed: number, remainingTime: number, remainingHealth: number) => {
    const baseScore = typed * 100;
    const timeBonus = remainingTime * 10;
    const healthBonus = remainingHealth * 2;
    return Math.round(baseScore + timeBonus + healthBonus);
  };

  if (words.length === 0) {
    return <div className="stage">Načítání...</div>;
  }

  return (
    <div className="stage">
      <div className="stage__header">
        <div className="stage__timer">Čas: {timeLeft}s</div>
        <HealthBar health={health} />
        <div className="stage__stats">
          <div className="stage__stat">Slov: {wordsTyped}/{settings.wordCount}</div>
        </div>
      </div>

      {!gameStarted && (
        <div className="stage__start-message">
          <p>Stiskněte libovolnou klávesu pro začátek!</p>
        </div>
      )}

      <div className="stage__words">
        {words.map((word, index) => (
          <Wordbox
            key={`${word}-${index}`}
            word={word}
            onFinish={handleFinish}
            active={index === 0 && gameStarted && !gameEnded}
            onMistake={handleMistake}
          />
        ))}
      </div>
    </div>
  );
};

export default Stage;
