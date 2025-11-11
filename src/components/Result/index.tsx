import { GameResult } from '../GameScreen';
import './style.css';

interface ResultProps {
  result: GameResult;
  onNewGame: () => void;
}

const Result: React.FC<ResultProps> = ({ result, onNewGame }) => {
  return (
    <div className={`result ${result.won ? 'result--won' : 'result--lost'}`}>
      <div className="result__header">
        <h2 className="result__title">
          {result.won ? '🎉 Gratulujeme!' : '😔 Prohráli jste'}
        </h2>
      </div>

      <div className="result__content">
        <div className="result__score">
          <div className="result__score-label">Skóre</div>
          <div className="result__score-value">{result.score}</div>
        </div>

        <div className="result__stats">
          <div className="result__stat">
            <span className="result__stat-label">Slov napsáno:</span>
            <span className="result__stat-value">{result.wordsTyped}</span>
          </div>
          <div className="result__stat">
            <span className="result__stat-label">Čas:</span>
            <span className="result__stat-value">{result.time}s</span>
          </div>
        </div>

        <button onClick={onNewGame} className="result__button">
          Nová hra
        </button>
      </div>
    </div>
  );
};

export default Result;

