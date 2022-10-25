import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getDogDetail } from "../../redux/actions";

const Detail = () => {
  let dispatch = useDispatch();
  let dogDetail = useSelector((state) => state.dogDetail);
  let {id} = useParams();
  console.log(id)
  React.useEffect(() => {
    dispatch(getDogDetail(id));
  }, [dispatch,id]);
  return <div>
    <h1>{dogDetail.name}</h1>

  </div>;
};

export default Detail;
