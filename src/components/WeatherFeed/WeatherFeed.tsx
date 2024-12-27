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
  background-color:blue;
  border-width: 5px;
  border-color: black;
  text-align: center;
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
/*
  800 x 480

  clock: 400 x 240
  weather: 400 x 240
  twitch: 400 x 480
*/
export default WeatherFeed;
