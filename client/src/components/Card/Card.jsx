import React from "react";
import { Link } from "react-router-dom";
import "./card.css";

const Card = ({ id, name, image, height, temperaments, Temperaments }) => {
  let newArr = (temperaments || Temperaments)

  return (
    <div className="card">
      <figure>
        <img src={image} alt="dog-imagen" />
      </figure>
      <div className="card-content">
        <p>N°{id}</p>
        <h1>{name[0].toUpperCase() + name.slice(1)}</h1>
        <p>Height: {height}</p>
        <div className="card-temperaments">
          {newArr?.map((type, i) => (
            <div className="card-temperament" key={i}>
              {type}
            </div>
          ))}
        </div>
        <Link to={`/detail/${id}`}>
          <button>View</button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
