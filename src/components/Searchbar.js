import React, { useRef, useState } from "react";
import { locationNameActions } from "../store/locationName-slice";
import { locationDataActions } from "../store/locationData-slice";
import { useDispatch, useSelector } from "react-redux";
import { fetchLocationData } from "../store/locationData-actions";
import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from "react-places-autocomplete";

const Searchbar = () => {
  const [locationChars, setLocationChars] = useState("");
  const [latLong, setLatLong] = useState([]);
  const dispatch = useDispatch();
  const locationName = useSelector((state) => state.locationName.name);

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

  const handleSelect = (locationChars) => {
    //console.log("location", locationChars);
    const newName = {
      name: locationChars,
    };
    dispatch(locationNameActions.setLocationName(newName));
    //console.log(locationName);
    geocodeByAddress(locationChars)
      .then((results) => getLatLng(results[0]))
      .then((latLng) =>
        dispatch(
          locationDataActions.setLocationData({
            lat: latLng.lat,
            lon: latLng.lng,
          })
        )
      )
      .catch((error) => console.error("Error", error));
    setLocationChars("");
  };

  //   const handleSelect = async (value) => {
  //     console.log("I went off");
  //     dispatch(
  //       locationNameActions.setLocationName({
  //         name: locationChars,
  //       })
  //     );
  //     dispatch(fetchLocationData(locationChars));
  //     inputRef.current?.reset();
  //   };

  //   const handleEnter = (event) => {
  //     //console.log("me too");
  //     if (event.key === "Enter") {
  //       dispatch(
  //         locationNameActions.setLocationName({
  //           name: event.target.value,
  //         })
  //       );

  //       dispatch(fetchLocationData(event.target.value));
  //       inputRef.current?.reset();
  //     }
  //   };

  const handleChange = (text) => {
    setLocationChars(text);
  };

  return (
    <div>
      {/* <form ref={inputRef} onSubmit={onSubmit}>
        <input
          placeholder="Enter Location"
          type="text"
          className="input"
          onKeyPress={setLocation}
        />
      </form> */}
      <PlacesAutocomplete
        value={locationChars}
        onSelect={handleSelect}
        searchOptions={{ types: ["(cities)"] }}
        onChange={handleChange}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              ref={inputRef}
              {...getInputProps({ placeholder: "Search Location" })}
            />
            <div>
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
      </PlacesAutocomplete>
    </div>
  );
};

export default Searchbar;
