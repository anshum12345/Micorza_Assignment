import styled from 'styled-components';

const HeaderContainer = styled.header`
  width: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
  padding: 0 1rem;
  box-sizing: border-box;

  @media (max-width: 480px) {
    padding: 0 0.5rem;
  }
`;

const Title = styled.h1`
  margin: 0;
  color: ${props => props.theme.primary};
  font-size: clamp(1.5rem, 5vw, 2rem);
  text-align: center;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
  width: 100%;
  margin: 0.5rem 0;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    gap: 0.3rem;
  }
`;

const Stat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.3rem;
  background: ${props => props.theme.cardFront};
  border-radius: 4px;
`;

const StatLabel = styled.span`
  font-size: clamp(0.7rem, 3vw, 0.8rem);
  color: ${props => props.theme.secondaryText};
`;

const StatValue = styled.span`
  font-size: clamp(1rem, 4vw, 1.2rem);
  font-weight: bold;
  color: ${props => props.$warning ? '#ff6b6b' : 'inherit'};
`;

const Controls = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
  justify-content: center;
  width: 100%;

  @media (max-width: 768px) {
    gap: 0.4rem;
  }

  @media (max-width: 480px) {
    gap: 0.3rem;
  }
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background-color: ${props => props.theme.primary};
  color: white;
  cursor: pointer;
  transition: all 0.2s;
  font-size: clamp(0.8rem, 3vw, 1rem);
  white-space: nowrap;
  min-width: fit-content;

  &:hover {
    background-color: ${props => props.theme.primaryDark};
  }

  @media (max-width: 480px) {
    padding: 0.4rem 0.8rem;
  }
`;

const DifficultyButton = styled(Button)`
  background-color: ${props => props.$active ? props.theme.primaryDark : props.theme.secondary};
`;

const ThemeButton = styled(Button)`
  background-color: ${props => props.theme.secondary};
`;

const CardThemeButton = styled(Button)`
  background-color: ${props => props.$active ? props.theme.primaryDark : '#6d6875'};
`;

const ModeButton = styled(Button)`
  background-color: ${props => props.$active ? props.theme.primaryDark : '#5f6caf'};
`;

const BestScores = styled.div`
  margin-top: 0.5rem;
  font-size: clamp(0.7rem, 3vw, 0.9rem);
  color: ${props => props.theme.secondaryText};
  text-align: center;
  width: 100%;
  padding: 0.3rem;
  background: ${props => props.theme.cardFront};
  border-radius: 4px;
`;

function Header({ 
  attempts, 
  moves,
  time,
  timeLeft,
  solved, 
  totalPairs, 
  initializeGame, 
  difficulty, 
  changeDifficulty,
  theme,
  toggleTheme,
  // cardTheme,
  // changeCardTheme,
  bestScores,
  gameMode,
  changeGameMode,
  isPaused
}) {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const formatBestTime = (seconds) => {
    if (seconds === Infinity) return '--:--';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const getModeBestScore = () => {
    const modeKey = `${difficulty}_${gameMode}`;
    const score = bestScores?.[modeKey] ?? bestScores?.[difficulty];

    if (
      score &&
      typeof score.attempts === 'number' &&
      typeof score.time === 'number' &&
      typeof score.moves === 'number' &&
      score.attempts !== Infinity
    ) {
      return `Attempts: ${score.attempts} | Time: ${formatBestTime(score.time)} | Moves: ${score.moves}`;
    }

    return 'No records yet';
  };

  return (
    <HeaderContainer>
      <Title>Memory Card Game</Title>
      
      <StatsContainer>
        <Stat>
          <StatLabel>Attempts</StatLabel>
          <StatValue>{attempts}</StatValue>
        </Stat>
        <Stat>
          <StatLabel>Moves</StatLabel>
          <StatValue>{moves}</StatValue>
        </Stat>
        <Stat>
          <StatLabel>
            {gameMode === 'timed' ? 'Time Left' : 'Time'}
          </StatLabel>
          <StatValue $warning={gameMode === 'timed' && timeLeft <= 10}>
            {gameMode === 'timed' ? 
              formatTime(timeLeft) : 
              formatTime(time)}
            {isPaused && ' (Paused)'}
          </StatValue>
        </Stat>
        <Stat>
          <StatLabel>Matches</StatLabel>
          <StatValue>{solved}/{totalPairs}</StatValue>
        </Stat>
      </StatsContainer>
      
      <BestScores>
        Best ({difficulty} {gameMode}): {getModeBestScore()}
      </BestScores>

      <Controls>
        <Button onClick={initializeGame}>New Game</Button>
        
        <ModeButton 
          $active={gameMode === 'normal'}
          onClick={() => changeGameMode('normal')}
        >
          Normal
        </ModeButton>
        <ModeButton 
          $active={gameMode === 'timed'}
          onClick={() => changeGameMode('timed')}
        >
          Timed
        </ModeButton>
        <ModeButton 
          $active={gameMode === 'zen'}
          onClick={() => changeGameMode('zen')}
        >
          Zen
        </ModeButton>

        <DifficultyButton 
          $active={difficulty === 'easy'}
          onClick={() => changeDifficulty('easy')}
        >
          Easy
        </DifficultyButton>
        <DifficultyButton 
          $active={difficulty === 'medium'}
          onClick={() => changeDifficulty('medium')}
        >
          Medium
        </DifficultyButton>
        <DifficultyButton 
          $active={difficulty === 'hard'}
          onClick={() => changeDifficulty('hard')}
        >
          Hard
        </DifficultyButton>

        <ThemeButton onClick={toggleTheme}>
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </ThemeButton>
        {/* <CardThemeButton 
          $active={cardTheme === 'default'}
          onClick={() => changeCardTheme('default')}
        >
          Default
        </CardThemeButton> */}
      </Controls>
    </HeaderContainer>
  );
}

export default Header;
