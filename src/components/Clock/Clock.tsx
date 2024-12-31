import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Clock = () => {

  const [currentTime, setCurrentTime] = useState(new Date());
  
  // TODO memoize?
  const formatTime = (date: Date) => {
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hour}:${formattedMinutes}`;
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
  background-color: red;
`;

const TimeDisplay = styled.p`
  font-size: 50px;
  margin-bottom: 0px;
`;

const DateDisplay = styled.p`
  font-size: 25px;
`;

export default Clock;