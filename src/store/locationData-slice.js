import { createSlice } from "@reduxjs/toolkit";

const locationDataSlice = createSlice({
  name: "locationData",
  initialState: {
    lat: null,
    lon: null,
    loaded: false,
  },
  reducers: {
    setLocationData(state, action) {
      state.lat = action.payload.lat;
      state.lon = action.payload.lon;
      state.loaded = action.payload.loaded;
    },
  },
});

export const locationDataActions = locationDataSlice.actions;

export default locationDataSlice;
