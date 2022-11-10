import React from "react";
import { useDispatch } from "react-redux";
import { orderBy, getDogsSearch } from "../../redux/actions";
import "./searchbar.css";
import {useLocalStorage} from '../../localStorage/localStorage'
const SearchBar = ({ setSearchDog }) => {
  let dispatch = useDispatch();
  const [dog, setDog] = React.useState('')
  const [copyDog, setCopyDog] = useLocalStorage('searchDog', '');



  const handleSearch = (e) => {
    e.preventDefault();
    setSearchDog(true);
    if (dog.length > 0) {
      dispatch(getDogsSearch(dog));
      setCopyDog(dog);
      setDog("");
    } else {
      dispatch(orderBy());
    }
  };
  const boxSearchVisible = { display: copyDog ? "" : "none" };
  return (
    <div>
      <form className="container-search" onSubmit={(e) => handleSearch(e)}>
        <input
          type="text"
          value={dog}
          onChange={(e) => setDog(e.target.value)}
          placeholder="Search dog"
        />
        <div onClick={(e) => handleSearch(e)}></div>
      </form>
      <div className="search" style={boxSearchVisible}>
        <p>Your last search was:</p>
        <p>"{copyDog}"</p>
      </div>
    </div>
  );
};

export default SearchBar;
