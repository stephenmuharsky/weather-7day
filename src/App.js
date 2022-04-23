import React, { useEffect } from "react";
import useGeoLocation from "./hooks/useGeoLocation";
import { locationNameActions } from "./store/locationName-slice";
import { useSelector, useDispatch } from "react-redux";
import { fetchWeatherData } from "./store/weatherData-actions";
import Header from "./components/Header";

function App() {
  const dispatch = useDispatch();
  const locationData = useSelector((state) => state.locationData);
  const locationName = useSelector((state) => state.locationName.name);
  const weatherData = useSelector((state) => state.weather.data);
  //console.log(locationData);
  //console.log("location name", locationName);

  useGeoLocation();

  useEffect(() => {
    dispatch(
      locationNameActions.setLocationName({
        name: locationName,
      })
    );
  }, [locationData]);

  useEffect(() => {
    dispatch(fetchWeatherData(locationData.lat, locationData.lon));
  }, [locationData]);

  console.log("weather data:", weatherData);
  return (
    <div className="App">
      <Header />
      {locationData.loaded ? (
        <div>
          Location name: {locationName}
          Location: Latitude: {locationData.lat} longitude: {locationData.lon}
        </div>
      ) : (
        "Location data not available yet."
      )}
    </div>
  );
}

export default App;
