import { weatherActions } from "./weatherData - slice";
import { useSelector } from "react-redux";

export const fetchWeatherData = (lat, lon) => {
  return async (dispatch) => {
    const fetchHandler = async () => {
      const res = await fetch(
        // &appid=d864677b725d1065f1fe5443269ca607
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=d864677b725d1065f1fe5443269ca607`
      );
      const data = await res.json();
      return data;
    };
    try {
      const weatherData = await fetchHandler();
      console.log("weather data:", weatherData);
      dispatch(weatherActions.replaceData(weatherData));
    } catch (err) {
      console.log(err);
    }
  };
};
