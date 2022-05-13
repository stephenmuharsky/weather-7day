import React from "react";
import "../styles/arrow.css";

const Arrow = ({ direction }) => {
  const directionDeducer = (direction) => {
    if (direction <= 22.5) {
      return "north";
    } else if (direction > 22.5 && direction <= 67.5) {
      return "north-east";
    } else if (direction > 67.5 && direction <= 112.5) {
      return "east";
    } else if (direction > 112.5 && direction <= 157.5) {
      return "south-east";
    } else if (direction > 157.5 && direction <= 202.5) {
      return "south";
    } else if (direction > 202.5 && direction <= 247.5) {
      return "south-west";
    } else if (direction > 247.5 && direction <= 292.5) {
      return "west";
    } else if ((direction > 292.5) & (direction <= 337.5)) {
      return "north-west";
    } else if (direction > 337.5) {
      return "north";
    }
  };

  const windDirection = directionDeducer(direction);
  return (
    <div className="wind-container">
      <img
        src={`/${windDirection}.png`}
        alt="Wind direction icon"
        className="wind-direction-icon"
      />
    </div>
  );
};

export default Arrow;
