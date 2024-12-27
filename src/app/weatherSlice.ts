import { createSlice } from '@reduxjs/toolkit'
import { fetchWeatherData } from '../api/weatherService';

type WeatherData = {
  name: string;
  region: string;
  temp: string;
}

export const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    weatherData: {} as WeatherData,
    error: undefined,
    loading: false,
    loaded: false,
  },
  reducers: {
    setWeatherData: (state, action) => {
      state.weatherData = action.payload;
      state.error = undefined;
      state.loading = false;
      state.loaded = true;
    },
    setError: (state, action) => {
      state.weatherData = {} as WeatherData;
      state.error = action.payload;
      state.loaded = false;
      state.loading = false;
    },
    setLoading: (state) => {
      state.loading = true;
      state.error = undefined;
      state.loaded = false;
      state.weatherData = {} as WeatherData;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setWeatherData, setError, setLoading } = weatherSlice.actions

export default weatherSlice.reducer

export const getWeatherData = () => {
  return async (dispatch, getState) => {
    dispatch(setLoading);
    try {
      const weatherFetchResponse = await fetchWeatherData();
      const weatherData: WeatherData = {
        name: weatherFetchResponse?.location?.name,
        region: weatherFetchResponse?.location?.region,
        temp: `${weatherFetchResponse?.current?.temp_f}° F`,
      };

      dispatch(setWeatherData(weatherData));
    }
    catch (e: any) {
      dispatch(setError);
    }
  };
};