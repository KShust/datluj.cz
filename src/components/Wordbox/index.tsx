import React, { useEffect, useState } from 'react';
import './style.css';

interface IWordboxProp {
  word: string;
  onFinish: () => void;
  active: boolean;
  onMistake: () => void;
}

const Wordbox : React.FC<IWordboxProp> = ({ word, onFinish, active, onMistake }) => {
  const [lettersLeft, setLettersLeft] = useState<string>(word);  
  const [mistake, setMistake] = useState<boolean>(false);

  useEffect(() => {
    if (!active) {
      return;
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (lettersLeft.length > 0 && e.key.toUpperCase() === lettersLeft[0].toUpperCase()) {
        const newLetLeft = lettersLeft.slice(1);
        setLettersLeft(newLetLeft);
        setMistake(false);

        if (newLetLeft.length === 0) {
          onFinish();
        }
      } else if (lettersLeft.length > 0) {
        setMistake(true);
        onMistake();
      }
    };
    
    document.addEventListener('keyup', handleKeyUp);
    return () => document.removeEventListener('keyup', handleKeyUp);
  }, [lettersLeft, onFinish, active, onMistake]);

  return <div className={`wordbox ${mistake ? "wordbox--mistake" : ""}`}>{lettersLeft} </div>;
};

export default Wordbox;
