import React from "react";
import "../styles/daily.css";
import Carousel from "react-elastic-carousel";
import { useSelector } from "react-redux";
import DailyDetail from "./DailyDetail";

const Daily = () => {
  const weatherData = useSelector((state) => state.weather.data.daily);
  console.log("weather", weatherData);

  return (
    <div className="main-container-daily">
      <span className="title-daily">Daily</span>
      <Carousel itemsToShow={8} className="carousel">
        {weatherData.map((item) => (
          <DailyDetail data={item} />
        ))}
      </Carousel>
    </div>
  );
};

export default Daily;
