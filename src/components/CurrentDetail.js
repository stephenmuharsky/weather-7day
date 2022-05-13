import React from "react";
import { useSelector } from "react-redux";
import "../styles/current-detail.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import moment from "moment";
import Arrow from "./Arrow";

const CurrentDetail = () => {
  const weatherData = useSelector((state) => state.weather.data.daily[0]);
  console.log("day details weather", weatherData);

  return (
    <div className="main-container-current-detail">
      {/* <hr className="line" /> */}
      <div className="time-container">
        <div className="time-subcontainer">
          <p className="time-title">Sunrise </p>
          <div className="time-sub-subcontainer">
            <div className="time-image-container">
              <img
                src={`/sunrise.png`}
                alt="Sunrise icon"
                className="time-icon"
              />
            </div>
            <p className="time-text">
              {moment.unix(weatherData.sunrise).format("hh:mm A")}
            </p>
          </div>
        </div>
        <div className="time-subcontainer">
          <p className="time-title">Sunset</p>
          <div className="time-sub-subcontainer">
            <div className="time-image-container">
              <img
                src={`/sunset.png`}
                alt="Sunset icon"
                className="time-icon"
              />
            </div>
            <p className="time-text">
              {moment.unix(weatherData.sunset).format("hh:mm A")}
            </p>
          </div>
        </div>
        <div className="time-subcontainer">
          <p className="time-title">Moonrise</p>
          <div className="time-sub-subcontainer">
            <div className="time-image-container">
              <img
                src={`/moonrise.png`}
                alt="Moonrise icon"
                className="time-icon"
              />
            </div>
            <p className="time-text">
              {moment.unix(weatherData.moonrise).format("hh:mm A")}
            </p>
          </div>
        </div>
        <div className="time-subcontainer">
          <p className="time-title">Moonset</p>
          <div className="time-sub-subcontainer">
            <div className="time-image-container">
              <img
                src={`/moonset.png`}
                alt="Moonrise icon"
                className="time-icon"
              />
            </div>
            <p className="time-text">
              {moment.unix(weatherData.moonset).format("hh:mm A")}
            </p>
          </div>
        </div>
      </div>

      <div className="time-container"></div>

      {/* <hr className="line" /> */}
      <div class="progressbar-container">
        <div
          className="progressbar-subcontainer"
          style={{ paddingLeft: "1rem", paddingRight: "1rem" }}
        >
          <div class="progressbar-sub-subcontainer">
            <p className="progessbar-title">Precipitation</p>
            <CircularProgressbar
              value={weatherData.humidity}
              text={`${weatherData.humidity}%`}
              styles={buildStyles({
                strokeLineap: "butt",
                pathColor: "white",
                trailColor: "black",
                textColor: "white",
              })}
              className="progressbar"
            />
          </div>
          <div class="progressbar-sub-subcontainer">
            <p className="progessbar-title">Humidity</p>
            <CircularProgressbar
              value={weatherData.pop * 100}
              text={`${weatherData.pop * 100}%`}
              styles={buildStyles({
                strokeLineap: "butt",
                pathColor: "white",
                trailColor: "black",
                textColor: "white",
              })}
              className="progressbar"
            />
          </div>
        </div>

        <div className="progressbar-subcontainer">
          <div class="progressbar-sub-subcontainer">
            <p className="progessbar-title">UV Index</p>
            <div className="sub">
              <CircularProgressbar
                value={Math.floor(weatherData.uvi)}
                maxValue={12}
                text={`${Math.floor(weatherData.uvi)}`}
                styles={buildStyles({
                  strokeLineap: "butt",
                  pathColor: "white",
                  trailColor: "black",
                  textColor: "white",
                })}
                className="progressbar uv"
              />
            </div>
          </div>

          <div class="progressbar-sub-subcontainer" id="wind-current-details">
            <p className="progessbar-title">Wind Direction</p>
            <div className="sub">
              <Arrow
                windspeed={weatherData.wind_gust}
                direction={weatherData.wind_deg}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentDetail;
