import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getDogs } from "../../redux/actions";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";
import SearchBar from "../SearchBar/SearchBar";
import Filters from "../Filters/Filters";
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
    <>
      <Link to="/create">
        <button types={temperaments}>Insert Pokemon</button>
      </Link>
      <SearchBar></SearchBar>
      {dogs.length ? (
        <div className="container">
          <Filters temperaments={temperaments}></Filters>
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
                  height={dog.height}
                  Temperaments={dog.Temperaments?.map((t) => t.name)}
                  temperaments={dog.temperaments?.map((t) => t)}
                ></Card>
              ))}
          </div>
        </div>
      ) : (
        <div>
          <button onClick={handleClick}>View All Pokemons</button>
          <div style={{ color: "red" }}>NOT FOUND</div>
        </div>
      )}
    </>
  );
};

export default Home;
