import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Clock = () => {

  const [currentTime, setCurrentTime] = useState(new Date());
  
  // TODO memoize?
  const formatTime = (date: Date) => {
    const hour = date.getHours();
    const minutes = date.getMinutes(); 
    return `${hour}:${minutes}`;
  };
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  
  return (
    <ClockContainer>
      <TimeDisplay>
        {formatTime(currentTime)}
      </TimeDisplay>
      <DateDisplay>
        {currentTime.toDateString()}
      </DateDisplay>
    </ClockContainer>
  )
};

const ClockContainer = styled.div`
  text-align: center;
`;

const TimeDisplay = styled.p`

`;

const DateDisplay = styled.p`
`;

export default Clock;