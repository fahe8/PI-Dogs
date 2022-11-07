import React from "react";
import { Link } from "react-router-dom";
import "./card.css";

const Card = ({ id, name, image,minWeight, maxWeight, temperaments, Temperaments }) => {
  let newArr = (temperaments || Temperaments)

  return (
    <div className="card">
      <figure>
        <img src={image} alt="dog-imagen" />
      </figure>
      <div className="card-content">
        <h1>{name[0].toUpperCase() + name.slice(1)}</h1>

        <p><b>Weight:</b> {minWeight}- {maxWeight}</p>
        <div className="card-temperaments">
          {newArr?.map((type, i) => (
            <div className="card-temperament" key={i}>
              {type}
            </div>
          ))}
        </div>
        <Link  to={`/detail/${id}`}>
          <button className="button-dog">View</button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
