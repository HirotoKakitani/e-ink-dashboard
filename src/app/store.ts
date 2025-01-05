import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./weatherSlice";
import twitchReducer from "./twitchSlice";

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    twitch: twitchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
