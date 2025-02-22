import React, { useEffect } from "react";
import Clock from "../Clock/Clock";
import WeatherFeed from "../WeatherFeed/WeatherFeed";
import TwitchFeed from "../TwitchFeed/TwitchFeed";
import { useSelector } from "react-redux";
import { getWeatherData } from "../../app/weatherSlice";
import { useAppDispatch } from "../../app/hooks";
import {
  selectWeatherCityName,
  selectWeatherIconUrl,
  selectWeatherRegion,
  selectWeatherTemp,
} from "../../app/selectors";
import styled from "styled-components";
import { TWITCH_AUTH_URL } from "../../api/twitchService";

function App() {
  // Refresh the app every 10 minutes to get fresh data
  const REFRESH_TIME = 600000;
  useEffect(() => {
    const timer = setInterval(() => {
      window.location.reload();
    }, REFRESH_TIME);
    return () => clearInterval(timer);
  }, []);

  const dispatch = useAppDispatch();
  dispatch(getWeatherData());

  const weatherCity = useSelector(selectWeatherCityName);
  const weatherRegion = useSelector(selectWeatherRegion);
  const weatherTemp = useSelector(selectWeatherTemp);
  const weatherIconUrl = useSelector(selectWeatherIconUrl);

  const weatherProps = {
    city: weatherCity,
    region: weatherRegion,
    temp: weatherTemp,
    iconUrl: weatherIconUrl,
  };

  return (
    <div>
      <AppContainer className="App">
        <Clock />
        <TwitchFeed />
        <WeatherFeed {...weatherProps} />
      </AppContainer>
      <AuthLinks>
        <p>Auth Links:</p>
        <a href={TWITCH_AUTH_URL} data-testid="twitch-auth-link">Connect with Twitch</a>
      </AuthLinks>
    </div>
  );
}

const AppContainer = styled.div`
  height: 480px;
  width: 800px;
  display: grid;
  grid-template-rows: 240px 240px;
  grid-template-columns: 250px 550px;
  margin-bottom: 50px;
  grid-gap: 1px;
  grid-template-areas:
    "clock twitch"
    "weather twitch";
  font-family: "Helvetica";
`;

const AuthLinks = styled.div`
  width: 800px;
  background-color: white;
`;
export default App;
