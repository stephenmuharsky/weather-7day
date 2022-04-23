import React from "react";
import Searchbar from "./Searchbar";
import "../styles/header.css";

const Header = () => {
  return (
    <div className="container">
      <h3>Forecast</h3>
      <Searchbar />
    </div>
  );
};

export default Header;
