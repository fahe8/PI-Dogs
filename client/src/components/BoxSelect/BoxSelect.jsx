import React, {useEffect, useState} from "react";
import { useRef } from "react";
import "./boxSelect.css";
const BoxSelect = ({ temperaments, values, setValues, errors }) => {
  const [active, setActive] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [search, setSearch] = useState('');

  const handleClick = (value, e) => {
    const newArray = [...values.temperaments];
    const currentIndex = values.temperaments.indexOf(value);
    if (currentIndex === -1) {
      newArray.push(value);
    } else {
      newArray.splice(currentIndex, 1);
    }
    setValues({ ...values, temperaments: newArray });
  };

  const deleted = (e) => {
    const { id } = e.target;
    const elementDeleted = values.temperaments.filter((f) => f !== id);
    setValues({ ...values, temperaments: elementDeleted });
  };

  const mark = (e) => {
    let finds = revealRefs.current.find((el) => el.id === e.currentTarget.id);
    if (!values.temperaments.includes(e.currentTarget.id)) {
      finds.style.textDecoration = "line-through";
    } else {
      finds.style.textDecoration = "none";
    }
  };
  const revealRefs = useRef([]);


  const addRefs = (el) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };
  React.useEffect(() => {
    if (values.temperaments.length === 6) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [values.temperaments.length]);


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

  // const boxFilterScroll = {overflowY: filtersCheck.length>4? 'scroll':'none'}

  return (
    <div className="ContainerSelectBox">
      <div className="select">
        <div>Dog temperaments: maximum 6</div>
        <div
          className={active ? "select-label active" : "select-label"}
          onClick={() => setActive(!active)}
        >
          <p>Select temperaments</p>
          <div className="arrow"></div>
        </div>
        <div className="select-temperaments">
          <input type="text" placeholder="Search temperaments" onChange={handleOnchageSearch}/>
          {temperaments.map((t, i) => (
            <div className="option" key={i} disabled={disabled}>
              <p
                onClick={(e) => {
                  handleClick(t.name);
                  mark(e);
                }}
                ref={addRefs}
                id={t.name}
              >
                {t.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="selected">
        {values.temperaments?.map((temperaments, i) => (
          <div key={i} className="selected-temperaments">
            <p>{temperaments}</p>
            <span
              id={temperaments}
              className="delete"
              onClick={(e) => {
                deleted(e);
                mark(e);
              }}
            ></span>
          </div>
        ))}
        {errors.temperaments && <span>{errors.temperaments}</span>}
      </div>
    </div>
  );
};

export default BoxSelect;
