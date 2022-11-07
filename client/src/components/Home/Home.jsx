import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getDogs } from "../../redux/actions";
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";
import SearchBar from "../SearchBar/SearchBar";
import Filters from "../Filters/Filters";
import Header from "../Header/Header";
import "./home.css";

const Home = () => {
  let dispatch = useDispatch();
  let dogs = useSelector((state) => state.dogs);
  let temperaments = useSelector((state) => state.temperaments);
  let page = useSelector((state) => state.page);
  let dogsPerPage = useSelector((state) => state.dogsPerPage);
  let pageMax = Math.ceil(dogs.length / dogsPerPage);
  const handleClick = () => {
    dispatch(getDogs());
  };
  return (
    <div className="homeContainer">
      <Header></Header>
      <div className="container-left">
        <div className="panel-left">
          <SearchBar></SearchBar>
          <Filters temperaments={temperaments}></Filters>
        </div>
      </div>
      {dogs.length ? (
        <div className="container-rigth">

            <Pagination page={page} pageMax={pageMax}></Pagination>

          <div className="container-cards">
            {dogs
              ?.slice(
                (page - 1) * dogsPerPage,
                (page - 1) * dogsPerPage + dogsPerPage
              )
              .map((dog, i) => (
                <Card
                  key={i}
                  id={dog.id}
                  name={dog.name}
                  image={dog.image}
                  minWeight={dog.minWeight}
                  maxWeight={dog.maxWeight}
                  Temperaments={dog.Temperaments?.map((t) => t.name)}
                  temperaments={dog.temperaments?.split(", ").map((t) => t)}
                ></Card>
              ))}
          </div>
          <Pagination page={page} pageMax={pageMax}></Pagination>
        </div>
      ) : (
        <div>
          <button onClick={handleClick}>View All Dogs</button>
          <div style={{ color: "red" }}>NOT FOUND</div>
        </div>
      )}
    </div>
  );
};

export default Home;
