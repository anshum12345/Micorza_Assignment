import styled from 'styled-components';
import { useEffect, useRef } from 'react';

// Container maintaining square aspect ratio with mobile optimizations
const CardContainer = styled.div`
  width: 100%;
  aspect-ratio: 1;
  position: relative;
  perspective: 1000px;
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;

  @media (max-width: 768px) {
    min-height: 60px;
  }

  @media (max-width: 480px) {
    min-height: 50px;
  }
`;

// Flip animation logic
const CardInner = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform ${props => props.$fastFlip ? '0.3s' : '0.6s'} ease-in-out;
  transform: ${props => props.$flipped ? 'rotateY(180deg)' : 'rotateY(0deg)'};
  will-change: transform;
`;

// Common card face styling
const CardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  font-size: clamp(1.5rem, 5vw, 2rem);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;

  @media (hover: none) {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
`;

// Front (emoji)
const CardFront = styled(CardFace)`
  background-color: ${props => props.theme.cardFront};
  color: ${props => props.theme.cardFrontText};
  transform: rotateY(180deg);
`;

// Back (theme style)
const CardBack = styled(CardFace)`
  background-color: ${props => props.$cardTheme?.back || '#4a6fa5'};
  color: ${props => props.$cardTheme?.backText || '#ffffff'};
  background-image: ${props => props.$cardTheme?.pattern ? `url(${props.$cardTheme.pattern})` : 'none'};
  background-size: cover;
  background-position: center;
`;

// Overlay shown when solved
const SolvedOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  &::after {
    content: '✓';
    color: white;
    font-size: 2rem;
    font-weight: bold;
  }
`;

function Card({ card, flipped, solved, onClick, cardTheme }) {
  const cardRef = useRef(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    isFirstRender.current = false;
  }, []);

  // Desktop hover effect
  useEffect(() => {
    const cardElement = cardRef.current;
    if (!cardElement || !window.matchMedia('(hover: hover)').matches) return;

    const handleMouseEnter = () => {
      if (!flipped && !solved) {
        cardElement.style.transform = 'scale(1.03)';
      }
    };

    const handleMouseLeave = () => {
      cardElement.style.transform = 'scale(1)';
    };

    cardElement.addEventListener('mouseenter', handleMouseEnter);
    cardElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cardElement.removeEventListener('mouseenter', handleMouseEnter);
      cardElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [flipped, solved]);

  return (
    <CardContainer
      ref={cardRef}
      onClick={() => onClick(card.id)}
      aria-label={`Memory card ${flipped || solved ? 'showing ' + card.emoji : 'face down'}`}
    >
      <CardInner
        $flipped={flipped || solved}
        $fastFlip={isFirstRender.current}
      >
        <CardFront>{card.emoji}</CardFront>
        <CardBack $cardTheme={cardTheme}>
          {cardTheme?.symbol || '?'}
        </CardBack>
      </CardInner>
      {solved && <SolvedOverlay />}
    </CardContainer>
  );
}

export default Card;
