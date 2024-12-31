import React from 'react';
import Clock from '../Clock/Clock';
import WeatherFeed from '../WeatherFeed/WeatherFeed';
import TwitchFeed from '../TwitchFeed/TwitchFeed';
import { useSelector } from 'react-redux';
import { getWeatherData } from '../../app/weatherSlice';
import { useAppDispatch } from '../../app/hooks';
import { selectWeatherCityName, selectWeatherRegion, selectWeatherTemp } from '../../app/selectors';
import styled from 'styled-components';
import { TWITCH_AUTH_URL } from '../../api/twitchService';

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
    <div>
      <AppContainer className="App">
        <Clock />
        <TwitchFeed />
        <WeatherFeed {...weatherProps}/>
      </AppContainer>
      <div>
        <p>Auth Links:</p>
        <a href={TWITCH_AUTH_URL}>Connect with Twitch</a>
      </div>
    </div>
  );
}

const AppContainer = styled.div`
  height:480px;
  width:800px;
  background-color: gray;
  display: grid;
  grid-template-rows: 240px 240px;
  grid-template-columns: 250px 550px;
  margin-bottom: 50px;
`;
export default App;
