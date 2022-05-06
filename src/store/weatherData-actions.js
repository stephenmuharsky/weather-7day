import { weatherActions } from "./weatherData - slice";
import { useSelector } from "react-redux";

export const fetchWeatherData = (lat, lon, units) => {
  return async (dispatch) => {
    const fetchHandler = async () => {
      const res = await fetch(
        // &appid=d864677b725d1065f1fe5443269ca607
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&units=${units}&appid=d864677b725d1065f1fe5443269ca607`
      );
      //console.log("lat and lon", lat, lon);
      const data = await res.json();
      return data;
    };
    try {
      const weatherData = await fetchHandler();
      console.log("weather data:", weatherData);
      const newWeatherData = {
        data: weatherData,
      };
      dispatch(weatherActions.replaceData(newWeatherData));
    } catch (err) {
      console.log(err);
    }
  };
};
