import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "./store";

export const selectWeatherRoot = (state: RootState) => {
  return state.weather;
};

export const selectWeatherData = createSelector(selectWeatherRoot, (weatherRoot) => {
  return weatherRoot.weatherData;
});

export const selectWeatherCityName = createSelector(selectWeatherData, (weatherData) => {
  return weatherData.name;
});

export const selectWeatherRegion = createSelector(selectWeatherData, (weatherData) => {
  return weatherData.region;
});

export const selectWeatherTemp = createSelector(selectWeatherData, (weatherData) => {
  return weatherData.temp;
});

export const selectTwitchRoot = (state: RootState) => {
  return state.twitch;
}

export const selectTwitchData = createSelector(selectTwitchRoot, (twitchRoot) => {
  return twitchRoot.twitchData;
});

export const selectTwitchStreams = createSelector(selectTwitchData, (twitchData) => {
  return twitchData.streams;
});

export const selectIsTwitchDataLoaded = createSelector(selectTwitchRoot, (twitchRoot) => {
  return twitchRoot.loaded;
}); 