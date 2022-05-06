import React from "react";
import { useSelector } from "react-redux";
import "../styles/daily-details.css";
import styled from "styled-components";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import moment from "moment";

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   position: relative;
//   bottom: 10rem;
//   right: 20rem;
// `;

// const Heading = styled.div`
//   font-family: sans-serif;
//   font-size: 2rem;
// `;

const DailyDetails = () => {
  const weatherData = useSelector((state) => state.weather.data.daily[0]);
  //   console.log("day details weather", weatherData);

  return (
    <div className="main-container-dailyDetails">
      <div className="flex-container">
        <div className="column-1">
          <hr className="line" />
          <div className="time-container">
            <div className="time-subcontainer">
              <p>
                Sunrise {moment.unix(weatherData.sunrise).format("hh:mm A")}
              </p>
              <p>Sunset {moment.unix(weatherData.sunset).format("hh:mm A")}</p>
            </div>

            <div className="time-subcontainer">
              <p>
                Moonrise {moment.unix(weatherData.moonrise).format("hh:mm A")}
              </p>
              <p>
                Moonset {moment.unix(weatherData.moonset).format("hh:mm A")}
              </p>
            </div>
          </div>

          <div className="time-container"></div>
        </div>

        <div className="column-2">
          <hr className="line" />
          <div class="progressbar-container">
            <div class="progressbar-subcontainer">
              <h3>Precipitation</h3>
              <CircularProgressbar
                value={weatherData.humidity}
                text={`${weatherData.humidity}%`}
                styles={buildStyles({ strokeLineap: "butt" })}
                className="progressbar"
              />
            </div>

            <div class="progressbar-subcontainer">
              <h3>Humidity</h3>
              <CircularProgressbar
                value={weatherData.pop * 100}
                text={`${weatherData.pop * 100}%`}
                styles={buildStyles({ strokeLineap: "butt" })}
                className="progressbar"
              />
            </div>
          </div>
          <div class="progressbar-outside">
            <h3>UV Index</h3>
            <div className="sub">
              <CircularProgressbar
                value={Math.floor(weatherData.uvi)}
                maxValue={12}
                text={`${Math.floor(weatherData.uvi)}`}
                styles={buildStyles({ strokeLineap: "butt" })}
                className="progressbar uv"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyDetails;
