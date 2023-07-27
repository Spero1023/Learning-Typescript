import { useState, useEffect, useCallback } from 'react';
import words from './wordList.json';
import { HangManDrawing } from './HangManDrawing';
import { HangManWord } from './HangManWord';
import { Keyboard } from './Keyboard';

function Game() {
  const [wordToGuess] = useState(() => {
    return words[Math.floor(Math.random() * words.length)];
  });
  const [guessedLetter, setGuessedLetters] = useState<string[]>([]);
  const inCorrectLetters = guessedLetter.filter(
    (letter) => !wordToGuess.includes(letter)
  );

  const isLoser = inCorrectLetters.length >= 6;
  const isWinner = wordToGuess
    .split('')
    .every((letter) => guessedLetter.includes(letter));

  const addGussedLetter = useCallback(
    (letter: string) => {
      if (guessedLetter.includes(letter) || isLoser || isWinner) return;

      setGuessedLetters((currentLetters) => [...currentLetters, letter]);
    },
    [guessedLetter, isLoser, isWinner]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (!key.match(/^[a-z]$/)) return;

      e.preventDefault();
      addGussedLetter(key);
    };
    document.addEventListener('keypress', handler);
    return () => {
      document.removeEventListener('keypress', handler);
    };
  }, [guessedLetter]);

  return (
    <div
      style={{
        maxWidth: '800px',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        margin: '0 auto',
        alignItems: 'center',
      }}
    >
      <div style={{ fontSize: '2rem', textAlign: 'center' }}>
        {isWinner && 'Winner! - refresh to play again'}
        {isLoser && 'Nice Try! - refresh to play again'}
      </div>

      <HangManDrawing numberOfGuesses={inCorrectLetters.length} />
      <HangManWord
        reveal={isLoser}
        guessedLetters={guessedLetter}
        wordToGuess={wordToGuess}
      />
      <div style={{ alignSelf: 'stretch' }}>
        <Keyboard
          disabled={isWinner || isLoser}
          activeLetters={guessedLetter.filter((letter) =>
            wordToGuess.includes(letter)
          )}
          inactiveLetters={inCorrectLetters}
          addGuessedLetter={addGussedLetter}
        />
      </div>
    </div>
  );
}

export default Game;
