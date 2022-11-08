import React from "react";
import ButtonBack from '../ButtonBack/ButtonBack'
import Loading from "../Loading/Loading";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getDogDetail } from "../../redux/actions";

import "./detail.css";
const Detail = (props) => {
  let dispatch = useDispatch();
  let dogDetail = useSelector((state) => state.dogDetail);
  let { id } = useParams();
  let temperaments =
    dogDetail.temperaments?.split(", ").map((t) => t) ||
    dogDetail.Temperaments?.map((t) => t.name);
  React.useEffect(() => {
    dispatch(getDogDetail(id));
  }, [dispatch, id]);
  if(props.loading){
    return <Loading></Loading>
  }
  return (
    < div className="detail">

      <div className="container-button">
        <ButtonBack></ButtonBack>
      </div>
      <div className="container-detail">
        <figure>
          <img src={dogDetail.image} alt="Image dog" />
        </figure>
        <div className="content">
          <h1 className="name">{dogDetail.name}</h1>
          <div className="height">
            <b>Heigth:</b>
            <div>
              {" "}
              <p>{dogDetail.minHeight} -</p>
              <p>{dogDetail.maxHeight} cm</p>
            </div>
          </div>
          <div className="weight">
            <b>Weight:</b>
            <div>
              {" "}
              <p>{dogDetail.minWeight} -</p>
              <p>{dogDetail.maxWeight} Kg</p>
            </div>
          </div>
          <div className="life">
            <b>Life span:</b>
            <p>{dogDetail.life_span} </p>
          </div>

          <div className="temp">
            <b>Temperaments</b>
            <div>
              {temperaments?.map((temperament, i) => (
                <p key={i}>{temperament}</p>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Detail;
