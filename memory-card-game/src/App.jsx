import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import GameBoard from './components/GameBoard';
import Header from './components/Header';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './styles';
import ReactConfetti from 'react-confetti';
import useSound from 'use-sound';
import flipSound from './assets/sounds/flip.mp3';
import matchSound from './assets/sounds/match.mp3';
import winSound from './assets/sounds/win.mp3';
import timesUpSound from './assets/sounds/loosing.mp3';

function App() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [moves, setMoves] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [bestScores, setBestScores] = useState({}); // ✅ FIX ADDED
  const [difficulty, setDifficulty] = useState('easy');
  const [theme, setTheme] = useState('light');
  const [cardTheme, setCardTheme] = useState('default');
  const [gameMode, setGameMode] = useState('normal'); // 'normal', 'timed', 'zen'
  const [timeLeft, setTimeLeft] = useState(60); // For timed mode
  const [isPaused, setIsPaused] = useState(false); // For zen mode
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [time, setTime] = useState(0);

  // Sound effects
  const [playFlip] = useSound(flipSound, { volume: 0.3 });
  const [playMatch] = useSound(matchSound, { volume: 0.3 });
  const [playWin] = useSound(winSound, { volume: 0.5 });
  const [playTimesUp] = useSound(timesUpSound, { volume: 0.5 });

  // Load best scores and preferences from local storage
  useEffect(() => {
    const savedScores = localStorage.getItem('memoryGameBestScores');
    const savedPreferences = localStorage.getItem('memoryGamePreferences');
    
    if (savedScores) {
      setBestScores(JSON.parse(savedScores));
    }
    
    if (savedPreferences) {
      const { theme, cardTheme } = JSON.parse(savedPreferences);
      setTheme(theme || 'light');
      setCardTheme(cardTheme || 'default');
    }
  }, []);

  // Timer logic for all game modes
  useEffect(() => {
    let interval;
    
    if (gameMode === 'timed' && !gameComplete && !isPaused) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            playTimesUp();
            setGameComplete(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } 
    else if (!gameComplete && cards.length > 0 && gameMode !== 'timed' && !isPaused) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [gameComplete, cards, gameMode, isPaused, playTimesUp]);

  const resizeWindow = useCallback(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  const initializeGame = useCallback(() => {
    const sizes = {
      easy: 8,
      medium: 18,
      hard: 32,
    };
    
    const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🐦', '🐤', '🦄', '🐝', '🦋', '🐞', '🐢', '🐍', '🦖', '🦕', '🐙', '🦑', '🦐', '🦀', '🐳', '🐬', '🐠'];
    const selectedEmojis = emojis.slice(0, sizes[difficulty]);
    const cards = [...selectedEmojis, ...selectedEmojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({ 
        id: index, 
        emoji, 
        flipped: false, 
        solved: false 
      }));

    setCards(cards);
    setFlipped([]);
    setSolved([]);
    setDisabled(false);
    setAttempts(0);
    setMoves(0);
    setTime(0);
    setGameComplete(false);
    setTimeLeft(60);
    setIsPaused(false);
  }, [difficulty]);

  useEffect(() => {
    resizeWindow();
    initializeGame();
    window.addEventListener('resize', resizeWindow);
    return () => window.removeEventListener('resize', resizeWindow);
  }, [difficulty, initializeGame, resizeWindow]);

  const handleCardClick = (id) => {
    if (disabled || flipped.includes(id) || solved.includes(id) || gameComplete || isPaused) return;

    playFlip();
    setMoves(prev => prev + 1);
    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setDisabled(true);
      setAttempts(prevAttempts => prevAttempts + 1);
      checkForMatch(newFlipped);
    }
  };

  const checkForMatch = useCallback((flippedCards) => {
    const [first, second] = flippedCards;
    const card1 = cards.find(card => card.id === first);
    const card2 = cards.find(card => card.id === second);

    if (card1.emoji === card2.emoji) {
      playMatch();
      setSolved(prevSolved => [...prevSolved, first, second]);
      setTimeout(() => {
        const allSolved = solved.length + 2 === cards.length;
        if (allSolved) {
          playWin();
          setGameComplete(true);
          updateBestScores();
        }
        setFlipped([]);
        setDisabled(false);
        
        if (gameMode === 'zen') {
          setIsPaused(true);
          setTimeout(() => setIsPaused(false), 1000);
        }
      }, 500);
    } else {
      setTimeout(() => {
        setFlipped([]);
        setDisabled(false);
      }, 1000);
    }
  }, [cards, solved, playMatch, playWin, gameMode]);

  const updateBestScores = () => {
    const scoreKey = `${difficulty}_${gameMode}`;
    const newBestScores = {
      ...bestScores,
      [scoreKey]: {
        attempts: Math.min(bestScores[scoreKey]?.attempts || Infinity, attempts + 1),
        time: gameMode === 'timed' ? 
          Math.max(bestScores[scoreKey]?.time || 0, solved.length + 2) :
          Math.min(bestScores[scoreKey]?.time || Infinity, time),
        moves: Math.min(bestScores[scoreKey]?.moves || Infinity, moves + 2)
      }
    };
    setBestScores(newBestScores);
    localStorage.setItem('memoryGameBestScores', JSON.stringify(newBestScores));
  };

  const changeDifficulty = (level) => {
    setDifficulty(level);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    savePreferences({ theme: newTheme });
  };

  const changeCardTheme = (theme) => {
    setCardTheme(theme);
    savePreferences({ cardTheme: theme });
  };

  const changeGameMode = (mode) => {
    setGameMode(mode);
    if (mode === 'timed') {
      setTimeLeft(60);
    }
    setIsPaused(false);
    initializeGame();
  };

  const savePreferences = (updates) => {
    const preferences = {
      theme,
      cardTheme,
      ...updates
    };
    localStorage.setItem('memoryGamePreferences', JSON.stringify(preferences));
  };

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <AppContainer>
        {gameComplete && (
          <ReactConfetti
            width={dimensions.width}
            height={dimensions.height}
            recycle={false}
            numberOfPieces={gameMode === 'timed' ? 300 : 500}
          />
        )}
        <Header 
          attempts={attempts} 
          moves={moves}
          time={time}
          timeLeft={timeLeft}
          solved={solved.length / 2} 
          totalPairs={cards.length / 2} 
          initializeGame={initializeGame}
          difficulty={difficulty}
          changeDifficulty={changeDifficulty}
          theme={theme}
          toggleTheme={toggleTheme}
          cardTheme={cardTheme}
          changeCardTheme={changeCardTheme}
          bestScores={bestScores}
          gameMode={gameMode}
          changeGameMode={changeGameMode}
          isPaused={isPaused}
        />
        <GameBoard 
          cards={cards} 
          flipped={flipped} 
          solved={solved} 
          handleCardClick={handleCardClick} 
          difficulty={difficulty}
          cardTheme={cardTheme}
          zenMode={gameMode === 'zen'}
        />
      </AppContainer>
    </ThemeProvider>
  );
}

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: ${props => props.theme.bgColor};
  color: ${props => props.theme.textColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  transition: all 0.3s ease;
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
`;

export default App;
