import { useState, useEffect } from 'react';
import styled from 'styled-components';

const TimerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TimerLabel = styled.span`
  font-size: 0.8rem;
  color: ${props => props.theme.secondaryText};
`;

const TimerValue = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
`;

function Timer({ gameComplete }) {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (gameComplete) {
      setIsRunning(false);
      return;
    }

    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, gameComplete]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <TimerContainer>
      <TimerLabel>Time</TimerLabel>
      <TimerValue>{formatTime(time)}</TimerValue>
    </TimerContainer>
  );
}

export default Timer;