import React from "react";
import { useDispatch } from "react-redux";
import { nextPage, prevPage, currentPage } from "../../redux/actions";
import "./pagination.css";

const Pagination = ({ page, pageMax }) => {
  let [valueInput, setValueInput] = React.useState(page);
  let dispatch = useDispatch();

  const next = () => {
    setValueInput(parseInt(page) + 1);
    parseInt(dispatch(nextPage()));
  };

  const prev = () => {
    setValueInput(parseInt(page) - 1);
    parseInt(dispatch(prevPage()));
  };
  
  //Controlar el input de la paginacion
  const onKeyDown = (e) => {
    e.preventDefault();

    dispatch(currentPage(valueInput));
    if (
      parseInt(valueInput) < 1 ||
      parseInt(valueInput) > pageMax ||
      isNaN(parseInt(valueInput))
    ) {
      setValueInput(1);
      dispatch(currentPage(1));
    } else {
      dispatch(currentPage(parseInt(valueInput)));
    }
  };

  const onChange = (e) => {
    setValueInput(e.target.value);
  };

  React.useEffect(() => setValueInput(page), [page]);
  
  return (
    <div className="container-Pagination">
      <button className="btn" onClick={prev} disabled={page === 1 || page < 1}>
        <span className="fingerprint-left"></span>
      </button>
      <form
        action=""
        onSubmit={(e) => {
          onKeyDown(e);
        }}
      >
        <input onChange={(e) => onChange(e)} value={valueInput} />
      </form>

      <p>de {pageMax}</p>
      <button
        className="btn"
        onClick={next}
        disabled={page === pageMax || page > pageMax}
      >
        <span className="fingerprint-right"></span>
      </button>
    </div>
  );
};

export default Pagination;
