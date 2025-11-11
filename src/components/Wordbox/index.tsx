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
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  useEffect(() => {
    setLettersLeft(word);
    setMistake(false);
    setShowSuccess(false);
  }, [word]);

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
          setShowSuccess(true);
          setTimeout(() => {
            onFinish();
            setShowSuccess(false);
          }, 100);
        }
      } else if (lettersLeft.length > 0) {
        setMistake(true);
        onMistake();
        setTimeout(() => setMistake(false), 300);
      }
    };
    
    document.addEventListener('keyup', handleKeyUp);
    return () => document.removeEventListener('keyup', handleKeyUp);
  }, [lettersLeft, onFinish, active, onMistake]);

  const className = `wordbox ${
    mistake ? "wordbox--mistake" : ""
  } ${
    showSuccess ? "wordbox--success" : ""
  }`.trim();

  return <div className={className}>{lettersLeft} </div>;
};

export default Wordbox;
