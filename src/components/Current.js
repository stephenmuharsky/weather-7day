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
  const locationNameLength = locationName.length;

  function setUnit(unit) {
    if (unit === "metric") {
      console.log("metric!");
      dispatch(unitActions.setToMetric());
    } else {
      console.log("imperial!");
      dispatch(unitActions.setToImperial());
    }
  }

  console.log("Length:", locationNameLength);

  console.log("weather data!~:", weatherData);
  return (
    <div className="main-container-current">
      {locationNameLength >= 22 ? (
        <p className="location-small">{locationName}</p>
      ) : (
        <p className="location-large">{locationName}</p>
      )}

      <div className="top">
        <div className="main-image">
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`}
            alt="Weather icon"
            className="weather-icon"
          />
        </div>

        <p className="temp">{Math.floor(weatherData.current.temp)}°</p>

        <div className="units-supercontainer">
          {unit === "metric" ? (
            <div className="units-container">
              <div className="unit active" id="C">
                <p>C</p>
              </div>

              <div
                className="unit inactive"
                id="F"
                onClick={() => setUnit("imperial")}
              >
                <p>F</p>
              </div>
            </div>
          ) : (
            <div className="units-container">
              <div className="unit active" id="F">
                <p>F</p>
              </div>

              <div
                className="unit inactive"
                id="C"
                onClick={() => setUnit("metric")}
              >
                <p>C</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bottom">
        <h2 className="description">
          {weatherData.current.weather[0].description[0].toUpperCase()}
          {weatherData.current.weather[0].description.substring(1)}
        </h2>
        <p className="timestamp">
          Updated as of {convertTime(weatherData.current.dt, "HH-MM")}
        </p>
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
