import { createSelector } from "@reduxjs/toolkit";
import { RootState, store } from "./store";

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