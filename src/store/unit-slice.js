import { createSlice } from "@reduxjs/toolkit";

const unitSlice = createSlice({
  name: "units",
  initialState: {
    unit: "metric",
  },
  reducers: {
    setToMetric(state) {
      state.unit = "metric";
    },
    setToImperial(state) {
      state.unit = "imperial";
    },
  },
});

export const unitActions = unitSlice.actions;

export default unitSlice;
