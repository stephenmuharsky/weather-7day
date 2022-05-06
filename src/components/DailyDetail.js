import React from "react";
import moment from "moment";
import "../styles/daily-detail.css";

const DailyDetail = ({ data }) => {
  var date = moment.unix(data.dt).format("ddd D");
  //console.log(data.weather[0].icon);
  return (
    <div className="day-element">
      <p className="date">{date}</p>
      <div>
        <img
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          alt="Weather icon"
          classname="icon"
          id="picture"
        />
      </div>

      <p className="temps">
        <span className="temp-max">{Math.floor(data.temp.max)}°</span>{" "}
        <span className="temp-min">{Math.floor(data.temp.min)}°</span>
      </p>

      <p className="weather" id="weather">
        {data.weather[0].main}
      </p>
    </div>
  );
};

export default DailyDetail;
