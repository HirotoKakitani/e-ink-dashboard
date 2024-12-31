import React from 'react';
import styled from 'styled-components';

type IWeatherFeedProps = {
  city: string;
  region: string;
  temp: string;
};

const WeatherFeed = (props: IWeatherFeedProps) => {

  return (
    <WeatherFeedContainer>
      <Temperature>{props?.temp}</Temperature>
      <City>{props?.city}</City>
      <Region>{props?.region}</Region>
    </WeatherFeedContainer>
  )
};

const WeatherFeedContainer = styled.div`
  text-align: center;
  grid-area: weather;
  background: white;
`;

const Temperature = styled.p`
    font-size: 50px;
    margin-bottom: 0px;
`;

const City = styled.p`
  font-size: 25px;
  margin-top: 20px;
  margin-bottom: 0px;
`;

const Region = styled.p`
  font-size: 20px;
  margin-top: 0px;
`;

export default WeatherFeed;
