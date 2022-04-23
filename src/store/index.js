import { configureStore } from "@reduxjs/toolkit";
import locationDataSlice from "./locationData-slice";
import locationNameSlice from "./locationName-slice";
import weatherSlice from "./weatherData - slice";

const store = configureStore({
  reducer: {
    locationData: locationDataSlice.reducer,
    locationName: locationNameSlice.reducer,
    weather: weatherSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
