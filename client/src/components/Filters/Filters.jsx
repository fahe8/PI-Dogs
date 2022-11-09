import { React, useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { orderBy, filterBy } from "../../redux/actions";
import "./filters.css";

const Filters = ({ temperaments, searchDog, setSearchDog, reloadTemps}) => {
  let dispatch = useDispatch();

  const [sort, setSort] = useState("");
  const [dogsFrom, setDogsFrom] = useState("copyDogs");
  const [checked, setChecked] = useState([]);
  const [search, setSearch] = useState("");
  const [boxFilter, setbBoxFilter] = useState(false);
  const [filtersCheck, setFiltersCheck] = useState([]);

  const revealRefs = useRef([]);

  //Crea un array de referencias
  const addRefs = (el) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };
  
  const handleOnchageSearch = (e) => {
    setSearch(e.target.value.toLowerCase());
  };
  //Filtrar los temperamentos de la barra de busqueda
  useEffect(() => {
    // eslint-disable-next-line array-callback-return
    let v = revealRefs.current.filter((f) => {
      if (!f.id.toLowerCase().includes(search)) {
        f.style.display = "none";
      } else {
        f.style.display = "";
      }
    });

    v.forEach((m) => (m.style.display = "none"));

  }, [search]);

  //Activa el check de la caja
  const handleToggleCheck = (event) => {
    event.currentTarget.classList.toggle("active");
  };

  //Agrega en un array los temperamentos que se van a filtrar
  const handleToggleTemp = (value) => {
    const newChecked = [...checked];
    const currentIndex = checked.indexOf(value);
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  //Limpia los estilos de los checkBoxs
  const handleClearFilters = () => {
    console.log("object");
    revealRefs.current.forEach((t) => t.classList.remove("active"));
    setChecked([]);
  };
  

  //Limpia los filtros al realizar la busqueda de un perro
  useEffect(() => {
    if (searchDog) {
      setSearchDog(false);
      setSort("");
      setDogsFrom("");
      handleClearFilters();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchDog]);

const showFilters = () => {
  if(checked.length > 0) {
    setbBoxFilter(true)
  } else {
    setbBoxFilter(false)
  }
}
//Estilos en linea
  const boxFilterVisible = {display: boxFilter? '':'none'}

  const options = {
    sort: [
      { value: "A-Z", text: "A-Z" },
      { value: "Z-A", text: "Z-A" },
      { value: "desc", text: "Highest Weight" },
      { value: "asc", text: "Lower Weight" },
    ],
    showFrom: [
      { value: "copyDogs", text: "All dogs" },
      { value: "dogsApi", text: "Api" },
      { value: "dogsDb", text: "Created" },
    ],
  };

  return (
    <div className="containerFilter">
      <div className="selectTemp">
        <div className="selectTemp-text">
          <p>Select Temperaments</p>
        </div>
        <div className="selecTemp-content">
          <div className="search">
            <input
              type="text"
              placeholder="Search Temperaments"
              onChange={handleOnchageSearch}
              value={search}
            />
          </div>
          <div className="selectTemp-filters">
            {temperaments.length? temperaments.map((t, i) => (
              <label
                className="selectTemp-filters-text"
                key={i}
                id={t.name}
                onClick={(e) => {
                  handleToggleCheck(e);
                  handleToggleTemp(e.currentTarget.id);
                }}
                ref={addRefs}
              >
                <div className="checkBox"></div>
                {t.name}
              </label>
            )): <button className="reload-temps" onClick={reloadTemps}></button>}
          </div>
        </div>
        <div className="btns">
          <button
            onClick={() => {
              dispatch(orderBy(dogsFrom));
              dispatch(filterBy(checked, dogsFrom));
              sort && dispatch(orderBy(sort));
              setFiltersCheck(checked)
              showFilters()
            }}
          >
            Filter
          </button>
          <button onClick={handleClearFilters}>Clear</button>
        </div>
      </div>

      <div className="filter-groups">
        <div className="filter-group">
          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              dogsFrom && dispatch(orderBy(dogsFrom));
              checked.length && dispatch(filterBy(checked, dogsFrom));
              dispatch(orderBy(e.target.value));
            }}
          >
            <option value="" hidden>
              Sort By:
            </option>
            {options.sort.map((elem, idx) => (
              <option key={idx} value={elem.value}>
                {elem.text}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <select
            value={dogsFrom}
            onChange={(e) => {
              setDogsFrom(e.target.value);
              dispatch(orderBy(e.target.value));
              checked.length && dispatch(filterBy(checked, e.target.value));
              sort && dispatch(orderBy(sort));
            }}
          >
            <option value="" hidden>
              Show from:
            </option>
            {options.showFrom.map((elem, idx) => (
              <option key={idx} value={elem.value}>
                {elem.text}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="box-selected-filters" style={boxFilterVisible}>
        <p>selected filters:</p>
        <div>
        {filtersCheck?.map((t, idx) => (
          <label key={idx}>{t}</label>
        ))}
        </div>
      </div>
    </div>
  );
};

export default Filters;
