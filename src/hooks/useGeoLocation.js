import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { locationDataActions } from "../store/locationData-slice";
import { locationNameActions } from "../store/locationName-slice";

const useGeoLocation = () => {
  const dispatch = useDispatch();
  const city = useSelector((state) => state.locationName.name);
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: "", lng: "" },
  });

  const [name, setName] = useState("");

  const reverseGeoCoding = (lat, lon) => {
    //const dispatch = useDispatch();
    //const [cityName, setCityName] = useState("");
    //console.log(`lat ${lat} lon ${lon}`);
    //20.2114185 -87.46535019999999

    let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=AIzaSyCv30vijnE_hnWctAFjspNXbVemYFEwZsE`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        let parts = data.results[0].address_components;
        parts.forEach((part) => {
          if (part.types.includes("locality")) {
            //we found the city/town name
            //console.log("part:", part);
            // setName(part.long_name);
            const cityName = {
              name: part.long_name,
            };
            dispatch(locationNameActions.setLocationName(cityName));
          }
        });
      })
      .catch((err) => console.warn(err.message));
  };

  const onSuccess = (location) => {
    // setLocation({
    //   loaded: true,
    //   coordinates: {
    //     lat: location.coords.latitude,
    //     lng: location.coords.longitude,
    //   },
    // });

    dispatch(
      locationDataActions.setLocationData({
        lat: location.coords.latitude,
        lon: location.coords.longitude,
        loaded: true,
      })
    );

    reverseGeoCoding(location.coords.latitude, location.coords.longitude);
    // console.log(city);
    // const cityName = reverseGeoCoding(
    //   location.coords.latitude,
    //   location.coords.longitude
    // );

    // console.log("city name", cityName);
    // const name = {
    //   name: cityName,
    // };

    //console.log(name);
    //dispatch(locationNameActions.setLocationName(name));
  };

  const onError = (error) => {
    setLocation({
      loaded: true,
      error: {
        code: error.code,
        message: error.message,
      },
    });
  };

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation not supported",
      });
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  //return location;
};

export default useGeoLocation;
