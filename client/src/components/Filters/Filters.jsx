import { React, useState } from "react";
import { useDispatch } from "react-redux";
import { orderBy } from "../../redux/actions";

const Filters = () => {
  let dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const [sort, setSort] = useState("");
  const [dogsFrom, setDogsFrom] = useState("");

  const [checked, setChecked] = useState([]);
  const handleToggle = () => {
    setActive(!active);
  };

  const handleToggleTypes = (value) => {
    const newChecked = [...checked];
    const currentIndex = checked.indexOf(value);
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  return (
    <div className="containerFilter">
      {/* <div
        className={
          active === true ? "containerFilters active" : "containerFilters"
        }
      >
        <div className="label" onClick={handleToggle}>
          Filter by Genre <span>{">"}</span>
        </div>
        <div className="contentTypes">
          {types?.map((type, i) => (
            <label key={i}>
              <input
                onChange={() => handleToggleTypes(type.name)}
                type="checkbox"
                value={type.name}
              />
              {type.name}
            </label>
          ))}
          <button
            onClick={() => {
              dispatch(filterBy(checked));
              dispatch(orderBy(sort));
            }}
          >
            Filter{" "}
          </button>
        </div>
      </div> */}

      <select
        name="orderBy"
        id="orderBy"
        onChange={(e) => {
          setSort(e.target.value);
          dispatch(orderBy(e.target.value));
          dispatch(orderBy(dogsFrom));
        }}
      >
        <option value="" hidden>
          Order By
        </option>

        <option value="A-Z">A-Z</option>
        <option value="Z-A">Z-A</option>
        <option value="desc">Highest Attack</option>
        <option value="asc">Lower Attack</option>
      </select>

      <select
        name=""
        id=""
        onChange={(e) => {
          setChecked(e.target.value);
          dispatch(orderBy(e.target.value));
          dispatch(orderBy(sort));
        }}
      >
        <option value="" hidden>
          Dogs from:
        </option>
        <option value="default">Default</option>
        <option value="api">Api</option>
        <option value="db">Created</option>
      </select>
    </div>
  );
};

export default Filters;
