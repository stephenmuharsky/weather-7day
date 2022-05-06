import { createSlice } from "@reduxjs/toolkit";

const locationCharsSlice = createSlice({
  name: "locationChars",
  initialState: {
    chars: "",
  },
  reducers: {
    setLocationChars(state, action) {
      state.chars = action.payload.chars;
    },
    removeChars(state) {
      state.chars = "";
    },
  },
});

export const locationCharsActions = locationCharsSlice.actions;

export default locationCharsSlice;
