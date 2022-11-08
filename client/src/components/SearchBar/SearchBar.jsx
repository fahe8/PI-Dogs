import React from "react";
import { useDispatch } from "react-redux";
import { orderBy, getDogsSearch } from "../../redux/actions";
import './searchbar.css'
const SearchBar = () => {
  let dispatch = useDispatch();
  const [dog, setDog] = React.useState("");
  const onChange = (search) => {
    setDog(search);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    if (dog.length > 0) {
      dispatch(getDogsSearch(dog));
    } else {
      dispatch(orderBy("default"));
    }
  };
  return (
    <form className="container-search" onSubmit={(e) => handleSearch(e)}>
      <input
        type="text"
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search dog"
      />
      <div  onClick={(e) => handleSearch(e)}></div>
    </form>
  );
};

export default SearchBar;
