import { configureStore } from "@reduxjs/toolkit";
import locationDataSlice from "./locationData-slice";
import locationNameSlice from "./locationName-slice";
import weatherSlice from "./weatherData - slice";
import locationCharsSlice from "./locationChars-slice";
import unitSlice from "./unit-slice";

const store = configureStore({
  reducer: {
    locationData: locationDataSlice.reducer,
    locationName: locationNameSlice.reducer,
    weather: weatherSlice.reducer,
    locationChars: locationCharsSlice.reducer,
    units: unitSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
