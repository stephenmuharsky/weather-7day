import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "../styles/current.css";
import { convertTime } from "./convertTime";
import { unitActions } from "../store/unit-slice";

const Current = () => {
  const locationData = useSelector((state) => state.locationData);
  const locationName = useSelector((state) => state.locationName.name);
  const weatherData = useSelector((state) => state.weather.data);
  const unit = useSelector((state) => state.units.unit);
  const dispatch = useDispatch();

  console.log("unit:", unit);
  //console.log(weatherData.current.dt);

  //console.log("time", time);

  function setUnit(unit) {
    if (unit === "metric") {
      console.log("metric!");
      dispatch(unitActions.setToMetric());
    } else {
      console.log("imperial!");
      dispatch(unitActions.setToImperial());
    }
  }

  console.log("weather data!~:", weatherData);
  return (
    <div className="main-container">
      <p className="location">{locationName}</p>
      <div className="top">
        <div className="main-image">
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`}
            alt="Weather icon"
            className="weather-icon"
          />
        </div>

        <h1 className="temp">{Math.floor(weatherData.current.temp)}°</h1>
        <div className="units-container">
          {unit === "metric" ? (
            <div>
              <div className="unit active" id="C">
                <h2>C</h2>
              </div>

              <div
                className="unit inactive"
                id="F"
                onClick={() => setUnit("imperial")}
              >
                <h2>F</h2>
              </div>

              <div className="background"></div>
            </div>
          ) : (
            <div>
              <div className="unit active" id="F">
                <h2>F</h2>
              </div>

              <div
                className="unit inactive"
                id="C"
                onClick={() => setUnit("metric")}
              >
                <h2>C</h2>
              </div>

              <div className="background"></div>
            </div>
          )}
        </div>
      </div>
      <div className="bottom">
        <h2 className="description">
          {weatherData.current.weather[0].description[0].toUpperCase()}
          {weatherData.current.weather[0].description.substring(1)}
        </h2>
        <h4 className="timestamp">
          Updated as of {convertTime(weatherData.current.dt, "HH-MM")}
        </h4>
        <div className="bottom-icons">
          <div className="icons" id="top-icons">
            <div className="icon-element">
              Feels like {Math.floor(weatherData.current.feels_like)}°
            </div>
            <div className="icon-element" id="wind">
              Wind {}
              {unit === "metric"
                ? `${Math.round(weatherData.current.wind_speed * (18 / 5))} km`
                : `${Math.round(weatherData.current.wind_speed)}mph`}
            </div>
            <div className="icon-element" id="visibility">
              Visibility {}
              {unit === "metric"
                ? `${Math.round(weatherData.current.visibility / 1000)} km`
                : `${Math.round(weatherData.current.visibility / 1609.344)} mi`}
            </div>
          </div>
          <div className="icons">
            <div className="icon-element">
              Barometer {`${weatherData.current.pressure} hPa`}
            </div>
            <div className="icon-element" id="humidity">
              Humidity {weatherData.current.humidity}%
            </div>
            <div className="icon-element" id="dew">
              Dew Point {Math.round(weatherData.current.dew_point)}°
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Current;
