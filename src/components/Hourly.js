import React from "react";
import "../styles/hourly.css";
import Carousel from "react-elastic-carousel";
import { useSelector } from "react-redux";
import HourlyDetail from "./HourlyDetail";

const Hourly = () => {
  const weatherData = useSelector((state) => state.weather.data.hourly);
  console.log("hourly weather", weatherData);

  return (
    <div className="main-container-hourly">
      <span className="title-hourly">Hourly</span>
      <Carousel itemsToShow={8} itemsToScroll={8} className="carousel">
        {weatherData.map((item) => (
          <HourlyDetail data={item} />
        ))}
      </Carousel>
    </div>
  );
};

export default Hourly;
