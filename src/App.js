import React, { useEffect, useState, useRef } from "react";
import useGeoLocation from "./hooks/useGeoLocation";
import { locationNameActions } from "./store/locationName-slice";
import { useSelector, useDispatch } from "react-redux";
import { fetchWeatherData } from "./store/weatherData-actions";
import Header from "./components/Header";
import "./styles/app.css";
import Current from "./components/Current";
import Searchbar from "./components/Searchbar";
import Daily from "./components/Daily";
import Hourly from "./components/Hourly";
import DailyDetails from "./components/DailyDetails";

function App() {
  const dispatch = useDispatch();
  const locationData = useSelector((state) => state.locationData);
  const locationName = useSelector((state) => state.locationName.name);
  const weatherData = useSelector((state) => state.weather);
  const weatherMain = weatherData.currentWeather;
  const [backgroundUrl, setBackgroundUrl] = useState(
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.jrotherham.co.uk%2Fwp-content%2Fuploads%2F2019%2F10%2FGrey_Mist.jpg&f=1&nofb=1"
  );
  const units = useSelector((state) => state.units.unit);

  // const [locationChars, setLocationChars] = useState("");
  //console.log(locationData);
  //console.log("location name", locationName);
  // let inputRef = useRef();
  // const handleSelect = (locationChars) => {
  //   //console.log("location", locationChars);
  //   const newName = {
  //     name: locationChars,
  //   };
  //   dispatch(locationNameActions.setLocationName(newName));
  //   //console.log(locationName);
  //   geocodeByAddress(locationChars)
  //     .then((results) => getLatLng(results[0]))
  //     .then(
  //       (latLng) =>
  //         dispatch(
  //           locationDataActions.setLocationData({
  //             lat: latLng.lat,
  //             lon: latLng.lng,
  //             loaded: true,
  //           })
  //         ),
  //       console.log("location data state", locationData)
  //     )
  //     .catch((error) => console.error("Error", error));
  //   setLocationChars("");
  // };

  // const handleChange = (text) => {
  //   setLocationChars(text);
  // };

  useGeoLocation();

  useEffect(() => {
    // switch (weatherMain) {

    if (weatherMain === "01d") {
      setBackgroundUrl("/blue.jpg");
    } else if (weatherMain === "01n") {
      setBackgroundUrl("/black.jpg");
    } else if (weatherMain === "02d") {
      setBackgroundUrl("/lightgrey.png");
    } else if (weatherMain === "02n") {
      setBackgroundUrl("/grey.png");
    } else if (weatherMain === "03d") {
      setBackgroundUrl("/lightgrey.png");
    } else if (weatherMain === "03n") {
      setBackgroundUrl("/grey.png");
    } else if (weatherMain === "04d") {
      setBackgroundUrl("/grey.png");
    } else if (weatherMain === "04n") {
      setBackgroundUrl("/grey.png");
    } else if (weatherMain === "09d") {
      setBackgroundUrl("/rain1.jpg");
    } else if (weatherMain === "09n") {
      setBackgroundUrl("/rain2.jpg");
    } else if (weatherMain === "11d") {
      setBackgroundUrl("/11d.jpg");
    } else if (weatherMain === "11n") {
      setBackgroundUrl("/11n.jpg");
    } else if (weatherMain === "13d") {
      setBackgroundUrl("/13d.jpg");
    } else if (weatherMain === "13n") {
      setBackgroundUrl("/13n.jpg");
    } else if (weatherMain === "50d") {
      setBackgroundUrl("/50d.jpg");
    } else if (weatherMain === "50n") {
      setBackgroundUrl("/50n.jpg");
    }
  }, [weatherData]);

  useEffect(() => {
    dispatch(
      locationNameActions.setLocationName({
        name: locationName,
      })
    );
  }, [locationData]);

  useEffect(() => {
    //console.log("location data: ", locationData.lat);
    //console.log("location data: ", locationData.lon);
    if (locationData.lat != null) {
      console.log("fetching the weather...");
      dispatch(fetchWeatherData(locationData.lat, locationData.lon, units));
    }
  }, [locationData]);

  useEffect(() => {
    dispatch(fetchWeatherData(locationData.lat, locationData.lon, units));
  }, [units]);

  //console.log("location data:", locationData);
  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(${backgroundUrl})`,
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
      }}
    >
      <Header />
      <Searchbar />

      {locationData.loaded && weatherData.received ? (
        <div className="main-container">
          <div className="column left">
            <Current />
            <DailyDetails />
          </div>
          <div className="column right">
            <Daily />
            <Hourly />
          </div>
        </div>
      ) : (
        // <div>
        //   Location name: {locationName}
        //   Location: Latitude: {locationData.lat} longitude: {locationData.lon}
        // </div>
        "Location data not available yet."
      )}

      {/* <PlacesAutocomplete
        value={locationChars}
        onSelect={handleSelect}
        searchOptions={{ types: ["(cities)"] }}
        onChange={handleChange}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className="search">
            <input
              ref={inputRef}
              {...getInputProps({ placeholder: "Search Location" })}
              className="search-input"
            />
            <div className="suggestions-container">
              {loading ? <div>Loading...</div> : null}
              {suggestions.map((suggestion) => {
                const style = {
                  backgroundColor: suggestion.active ? "#41b6e6" : "white",
                };
                return (
                  <div {...getSuggestionItemProps(suggestion, { style })}>
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete> */}
    </div>
  );
}

export default App;
