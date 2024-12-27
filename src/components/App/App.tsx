import React from 'react';
import Clock from '../Clock/Clock';
import WeatherFeed from '../WeatherFeed/WeatherFeed';
import TwitchFeed from '../TwitchFeed/TwitchFeed';
import { useSelector } from 'react-redux';
import { getWeatherData } from '../../app/weatherSlice';
import { useAppDispatch } from '../../app/hooks';
import { selectWeatherCityName, selectWeatherRegion, selectWeatherTemp } from '../../app/selectors';
import styled from 'styled-components';

function App() {

  const dispatch = useAppDispatch();
  dispatch(getWeatherData());

  const weatherCity = useSelector(selectWeatherCityName);
  const weatherRegion = useSelector(selectWeatherRegion);
  const weatherTemp = useSelector(selectWeatherTemp);
  const weatherProps = {
    city: weatherCity, region: weatherRegion, temp: weatherTemp
  }
  return (
    <AppContainer className="App">
      <Clock />
      <TwitchFeed />
      <WeatherFeed {...weatherProps}/>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  height:480px;
  width:800px;
  background-color: gray;
  display: grid;
  grid-template-rows: 240px 240px;
  grid-template-columns: 400px 400px;

`;
export default App;
