import { React, useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { orderBy, filterBy } from "../../redux/actions";
import "./filters.css";
import { useLocalStorage } from "../../localStorage/localStorage";

const Filters = ({ temperaments, searchDog, setSearchDog, reloadTemps }) => {
  let dispatch = useDispatch();

  const [sort, setSort] = useLocalStorage("sort", "");
  const [dogsFrom, setDogsFrom] = useLocalStorage("dogsFrom", "copyDogs");
  const [checked, setChecked] = useLocalStorage("filters", []);
  const [search, setSearch] = useState("");
  const [filtersCheck, setFiltersCheck] = useState(checked);
  const [activeBox, setActiveBox] = useState(true);

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
    revealRefs.current.filter((f) => {
      if (!f.id.toLowerCase().includes(search)) {
        f.style.display = "none";
      } else {
        f.style.display = "";
      }
    });
  }, [search]);

  //Activa el check de la caja
  const handleToggleCheck = (event) => {
    // event.currentTarget.classList.toggle("active");
    if (event.currentTarget.classList.contains("active")) {
      event.currentTarget.classList.remove("active");
    } else {
      event.currentTarget.classList.add("active");
    }
  };

  //Agrega en un array los temperamentos que se van a filtrar
  const handleToggleTemp = (value) => {
    const newChecked = [...checked];

    const currentIndex = checked.indexOf(value.id);
    if (currentIndex === -1) {
      newChecked.push(value.id);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  //Limpia los estilos de los checkBoxs
  const handleClearFilters = () => {
    revealRefs.current.forEach((t) => t.classList.remove("active"));
    setChecked([]);
  };

  //Limpia los filtros al realizar la busqueda de un perro
  useEffect(() => {
    if (searchDog) {
      setSearchDog(false);
      setSort("");
      setDogsFrom("copyDogs");
      handleClearFilters();
      setActiveBox(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchDog]);

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
            {temperaments.length ? (
              temperaments.map((t, i) => (
                <label
                  className="selectTemp-filters-text"
                  key={i}
                  id={t.name}
                  onClick={(e) => {
                    handleToggleCheck(e);
                    handleToggleTemp(e.currentTarget);
                  }}
                  ref={addRefs}
                >
                  <div className="checkBox"></div>
                  {t.name}
                </label>
              ))
            ) : (
              <button className="reload-temps" onClick={reloadTemps}></button>
            )}
          </div>
        </div>
        <div className="btns">
          <button
            onClick={() => {
              // if(dogsFrom === 'copyDogs'){
              //   setDogsFrom('dogs')
              // dispatch(orderBy(dogsFrom));

              // }
              dispatch(orderBy(dogsFrom));
              dispatch(filterBy(checked, dogsFrom));
              sort && dispatch(orderBy(sort));
              setFiltersCheck(checked);
              setActiveBox(true);
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
              if (searchDog) {
                setDogsFrom("dogs");
              } else {
                setDogsFrom(e.target.value);
              }
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

      <div className="btns">
        <button 
          onClick={() => {
            setDogsFrom("copyDogs");
            setSort('')
            dispatch(orderBy("dogs"));
            handleClearFilters();
            setChecked([])
            setFiltersCheck([])
          }}
        >
          Default Page
        </button>
      </div>
      <div className="box-selected-filters">
        <p>selected filters:</p>
        <div>
          {activeBox &&
            filtersCheck?.map((t, idx) => <label key={idx}>{t}</label>)}
        </div>
      </div>
    </div>
  );
};

export default Filters;
