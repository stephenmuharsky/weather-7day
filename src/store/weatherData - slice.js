import { createSlice } from "@reduxjs/toolkit";

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    data: null,
    received: false,
    currentWeather: null,
  },
  reducers: {
    replaceData(state, action) {
      state.data = action.payload.data;
      state.received = true;
      state.currentWeather = action.payload.data.current.weather[0].icon;
    },
  },
});

export const weatherActions = weatherSlice.actions;

export default weatherSlice;
