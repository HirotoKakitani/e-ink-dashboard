import React from 'react';
import styled from 'styled-components';

type IWeatherFeedProps = {
  city: string;
  region: string;
  temp: string;
  iconUrl?: string;
};

const WeatherFeed = (props: IWeatherFeedProps) => {
  const {temp, city, region, iconUrl} = {...props};
  return (
    <WeatherFeedContainer>
      <img src={iconUrl} alt='weather icon'/>
      <Temperature>{temp}</Temperature>
      <City>{city}</City>
      <Region>{region}</Region>
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
  margin: 0px;
`;

const City = styled.p`
  font-size: 25px;
  /* margin-top: 20px; */
  margin: 0px;
`;

const Region = styled.p`
  font-size: 20px;
  margin-top: 0px;
`;

export default WeatherFeed;
