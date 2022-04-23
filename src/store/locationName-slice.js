import { createSlice } from "@reduxjs/toolkit";

const locationNameSlice = createSlice({
  name: "locationName",
  initialState: {
    name: null,
  },
  reducers: {
    setLocationName(state, action) {
      state.name = action.payload.name;
    },
  },
});

export const locationNameActions = locationNameSlice.actions;

export default locationNameSlice;
