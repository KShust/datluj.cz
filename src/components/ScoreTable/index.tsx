import { useEffect, useState } from 'react';
import { GameResult } from '../GameScreen';
import './style.css';

interface ScoreTableProps { newResult: GameResult | null }

const ScoreTable: React.FC<ScoreTableProps> = ({ newResult }) => {
  const [results, setResults] = useState<GameResult[]>([]);
  const [lastResult, setLastResult] = useState<number | null>(null);

  useEffect(() => {
    if (!newResult) return;
    if (lastResult === newResult.finishTime) return;

  setResults((prev) => {
    let updated = [...prev, newResult].sort((a, b) => b.score - a.score);

    if (updated.length > 5) {
      updated = updated.slice(0, 5);
    }
    return updated;
  });

  setLastResult(newResult.finishTime);
}, [newResult, lastResult]);

  if (results.length === 0) {
    return (
      <div className="score-table">
        <h3>Žebříček výsledků</h3>
        <p className="score-table__empty">Zatím žádné výsledky</p>
      </div>
    );
  }

  return (
    <div className="score-table">
      <h3>Žebříček výsledků (posledních 5)</h3>
      <table className="score-table__table">
        <thead>
          <tr>
            <th>Čas</th>
            <th>Slov</th>
            <th>Skóre</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr key={`${result.finishTime}-${index}`}>
              <td>{result.time}s</td>
              <td>{result.wordsTyped}</td>
              <td>{result.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScoreTable;

