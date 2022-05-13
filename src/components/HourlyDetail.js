import React from "react";
import moment from "moment";
import "../styles/hourly-detail.css";

const HourlyDetail = ({ data }) => {
  var time = moment.unix(data.dt).format("h a");
  //console.log(data.weather[0].icon);
  return (
    <div className="hour-element">
      <p className="hour">{time}</p>
      <img
        src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
        alt="Weather icon"
        classname="hourly-icon"
        id="hourly-icon"
      />

      <p className="hourly-temp" id="hourly-tempmax">
        <span className="hourly-temp-span">{Math.floor(data.temp)}°</span>
      </p>

      <p className="hourly-weather" id="hourly-weather">
        {data.weather[0].main}
      </p>
    </div>
  );
};

export default HourlyDetail;
