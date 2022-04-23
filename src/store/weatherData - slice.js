import { createSlice } from "@reduxjs/toolkit";

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    data: null,
    received: false,
  },
  reducers: {
    replaceData(state, action) {
      state.data = action.payload.data;
      state.received = true;
    },
  },
});

export const weatherActions = weatherSlice.actions;

export default weatherSlice;
