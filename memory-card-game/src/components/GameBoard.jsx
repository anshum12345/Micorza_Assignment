import styled from 'styled-components';
import Card from './Card';

const GameBoardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(
    ${props => {
      if (props.difficulty === 'easy') return 4;
      if (props.difficulty === 'medium') return 6;
      return 8;
    }}, 
    1fr
  );
  gap: 0.5rem;
  width: 100%;
  max-width: ${props => {
    // Mobile-first approach
    if (window.innerWidth < 768) {
      return '100%';
    }
    return props.difficulty === 'easy' ? '400px' : 
           props.difficulty === 'medium' ? '600px' : '800px';
  }};
  margin: 1rem auto;
  padding: 0 1rem;
  box-sizing: border-box;

  @media (max-width: 768px) {
    grid-template-columns: repeat(
      ${props => {
        if (props.difficulty === 'easy') return 4;
        if (props.difficulty === 'medium') return 4;
        return 4;
      }}, 
      1fr
    );
    gap: 0.3rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(
      ${props => {
        if (props.difficulty === 'easy') return 3;
        if (props.difficulty === 'medium') return 3;
        return 4;
      }}, 
      1fr
    );
  }
`;

const CardWrapper = styled.div`
  aspect-ratio: 1;
`;

function GameBoard({ cards, flipped, solved, handleCardClick, difficulty }) {
  return (
    <GameBoardContainer difficulty={difficulty}>
      {cards.map(card => (
        <CardWrapper key={card.id}>
          <Card
            card={card}
            flipped={flipped.includes(card.id)}
            solved={solved.includes(card.id)}
            onClick={handleCardClick}
          />
        </CardWrapper>
      ))}
    </GameBoardContainer>
  );
}

export default GameBoard;