import React, { useRef, useState } from "react";
import { locationNameActions } from "../store/locationName-slice";
import { locationDataActions } from "../store/locationData-slice";
import { useDispatch, useSelector } from "react-redux";
import { fetchLocationData } from "../store/locationData-actions";
import ReplayIcon from "@mui/icons-material/Replay";
import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from "react-places-autocomplete";
import "../styles/searchbar.css";
import { locationCharsActions } from "../store/locationChars-slice";
import { fetchWeatherData } from "../store/weatherData-actions";

const Searchbar = () => {
  const [locationChars, setLocationChars] = useState("");
  const [latLong, setLatLong] = useState([]);
  const dispatch = useDispatch();
  const locationName = useSelector((state) => state.locationName.name);
  const locationData = useSelector((state) => state.locationData);
  const locationCharss = useSelector((state) => state.locationChars);
  const unit = useSelector((state) => state.units.unit);

  let inputRef = useRef();
  //search location

  const onSubmit = (e) => {
    e.preventDefault();
  };

  //   const setLocation = (event) => {
  //     //event.preventDefault();
  //     if (event.key === "Enter") {
  //       //   axios.get(geoUrl).then((response) => {
  //       //     setGeodata(response);
  //       //     console.log(response);
  //       //   });
  //       //   setGeodata("");
  //       dispatch(
  //         locationNameActions.setLocationName({
  //           name: event.target.value,
  //         })
  //       );

  //       dispatch(fetchLocationData(event.target.value));
  //       inputRef.current?.reset();
  //     }
  //   };

  const handleSelect = (locationCharss) => {
    //console.log("location", locationCharss);
    const newName = {
      name: locationCharss,
    };
    //console.log("newName:", newName);
    dispatch(locationNameActions.setLocationName(newName));
    console.log("WTF");
    console.log("new name state:", newName.name);
    // console.log("location name:", locationName);
    // console.log("location name:", locationName);
    console.log("location chars:", locationChars);
    geocodeByAddress(locationChars)
      .then((results) => getLatLng(results[0]))
      .then(
        (latLng) =>
          dispatch(
            locationDataActions.setLocationData({
              lat: latLng.lat,
              lon: latLng.lng,
              loaded: true,
            })
          ),
        console.log("location data state", locationData)
      )
      .catch((error) => console.error("Error", error));
    dispatch(locationCharsActions.removeChars());
  };

  const handleChange = (text) => {
    setLocationChars(text);
    //console.log("input:", text);
    //console.log("location chars state:", locationChars);
    const chars = {
      chars: text,
    };
    //console.log(chars);
    dispatch(locationCharsActions.setLocationChars(chars));
    //console.log("location chars redux state:", locationCharss);
  };

  return (
    <div className="container">
      <ReplayIcon
        className="reload-icon"
        // onClick={dispatch(
        //   fetchWeatherData(locationData.lat, locationData.lon, unit)
        // )}
      />
      <PlacesAutocomplete
        value={locationCharss.chars}
        onSelect={handleSelect}
        searchOptions={{ types: ["(cities)"] }}
        onChange={handleChange}
        highlightFirstSuggestion={true}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className="search">
            <input
              ref={inputRef}
              {...getInputProps({ placeholder: "Search Location" })}
              className="search-input"
            />
            <div className="suggestions-container">
              {loading ? null : null}
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
      </PlacesAutocomplete>
    </div>
  );
};

export default Searchbar;
