import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import "./modal.css";
const Modal = ({history, setModal}) => {
  let createDog = useSelector((state) => state.createDog);

  const ref = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!ref.current.contains(e.target)) {
        setModal(false)
        history.go(0)

      } else {
        console.log("no");
      }
    };
    document.addEventListener("mousedown", handler);
  });
  const handleClick = () => {
    console.log('first')
    setModal(false);
    history.go(0);
  };
  return (
    <div className="container-modal" ref={ref}>
      <div className="modal">
        <span className={createDog.created ? "icon-o" : "icon-x"}></span>
        <p
          style={
            createDog.created ? { color: "#00ff2f" } : { color: "#ff0000" }
          }
        >
          {createDog.created ? "Success!" : "Oh no :("}
        </p>
        <p>{createDog.msg}</p>
        <button onClick={handleClick}>Accept</button>
      </div>
    </div>
  );
};

export default Modal;
