import React from "react";
import "./notfound.css";
const NotFound = ({ handleClick,text,btnText }) => {
  return (
<div className="container-route">
        <button onClick={handleClick}>
          <svg
            height="0.8em"
            width="0.8em"
            viewBox="0 0 2 1"
            preserveAspectRatio="none"
          >
            <polyline
              fill="none"
              stroke="#777777"
              strokeWidth="0.1"
              points="0.9,0.1 0.1,0.5 0.9,0.9"
            />
          </svg>{" "}
          {btnText}
        </button>

        <div className="background-wrapper">
          <h1 id="visual">404</h1>
        </div>
        <p>{text}</p>
      </div>
  );
};

export default NotFound;
