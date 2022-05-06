import React from "react";
import Searchbar from "./Searchbar";
import "../styles/header.css";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector, useDispatch } from "react-redux";
import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from "react-places-autocomplete";
import { locationDataActions } from "../store/locationData-slice";
import { locationNameActions } from "../store/locationName-slice";
import { locationCharsActions } from "../store/locationChars-slice";

const Header = () => {
  const dispatch = useDispatch();
  const locationChars = useSelector((state) => state.locationChars.chars);

  const handleSelect = () => {
    //console.log("location", locationChars);
    const newName = {
      name: locationChars,
    };
    //console.log("newName:", newName);
    dispatch(locationNameActions.setLocationName(newName));
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
          )
        //console.log("location data state", locationData)
      )
      .catch((error) => console.error("Error", error));
    dispatch(locationCharsActions.removeChars());
  };

  return (
    <div className="header">
      <div>
        <h2>Forecast</h2>
      </div>
      {/* <div className="searchbar">
        <Searchbar />
      </div> */}
      <SearchIcon className="search-icon" onClick={handleSelect} />
    </div>
  );
};

export default Header;
