import React from "react";
import { Link } from "react-router-dom";

import "./header.css";
const Header = () => {
  return (
    <div className="header">
      <div className="logo">
        <p>PI-DOGS</p>
        <p> Fabián Carrión</p>
      </div>
      <Link to="/create">
        <button className="bone">
          <div className="c1"></div>
          <div className="c2"></div>
          <div className="c3"></div>
          <div className="c4"></div>
          <div className="b1">
            <div className="b2">
              <b>Create Dog</b>
            </div>
          </div>
        </button>
      </Link>
    </div>
  );
};

export default Header;
