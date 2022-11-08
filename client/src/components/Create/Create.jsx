import { React, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {useHistory } from "react-router-dom";
import { createDog } from "../../redux/actions";
import FormInputs from "../FormInputs/FormInputs";
import validation from "../FormInputs/validation";
import Modal from "../modal/Modal";
import BoxSelect from "../BoxSelect/BoxSelect";
import ButtonBack from "../ButtonBack/ButtonBack";
import "./create.css";
import Loading from "../Loading/Loading";

const Create = ({loading}) => {
  let dispatch = useDispatch();
  let history = useHistory()
  let dogs = useSelector((state) => state.copyDogs);
  let temperaments = useSelector((state) => state.temperaments);

  const [modal, setModal] = useState(false);

  const [values, setValues] = useState({
    name: "",
    image: "",
    minHeight: "",
    maxHeight: "",
    minWeight: "",
    maxWeight: "",
    min_life_span: "",
    max_life_span: "",
    temperaments: [],
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = errors;
    newErrors = validation(values, dogs);

    setErrors(validation(values, dogs));
    if (!Object.keys(newErrors).length) {
      console.log("NO HAY ERRORES");
      const newDog = {
        name: values.name,
        image: values.image,
        minHeight: values.minHeight,
        maxHeight: values.maxHeight,
        minWeight: values.minWeight,
        maxWeight: values.maxWeight,
        life_span: values.life_span
          ? `${values.min_life_span} - ${values.max_life_span} years`
          : "",
        temperaments: values.temperaments,
      };
      dispatch(createDog(newDog));
      setTimeout(() => {
        setModal(true);
      }, 500);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  if(loading){
    return <Loading></Loading>
  }
  return (
    <div className="create">
      <form onSubmit={(e) => handleSubmit(e)}>
        <ButtonBack history={history}></ButtonBack>
        {modal && <Modal history={history} setModal={setModal}></Modal>}
        <h1>Create a Dog</h1>
        <div className="inputs">
          <div>
            <FormInputs
              label={"Name*"}
              type={"text"}
              name={"name"}
              placeholder={"Name"}
              value={values.name}
              handleChange={handleChange}
            ></FormInputs>
            <span className="errors">{errors.name}</span>
          </div>

          <div>
            <FormInputs
              label={"Image"}
              type={"text"}
              name={"image"}
              placeholder={"Url"}
              value={values.image}
              handleChange={handleChange}
            ></FormInputs>
            <span className="errors">{errors.image}</span>
          </div>

          <div className="two-inputs-container">
            <div className="two-inputs">
              <FormInputs
                label={"Min-Hieght*"}
                type={"text"}
                name={"minHeight"}
                placeholder={"Heigth in cm"}
                value={values.minHeight}
                handleChange={handleChange}
              ></FormInputs>

              <FormInputs
                label={"Max-Height*"}
                type={"text"}
                name={"maxHeight"}
                placeholder={"Heigth in cm"}
                value={values.maxHeight}
                handleChange={handleChange}
              ></FormInputs>
            </div>
            <span className="errors">{errors.height}</span>
          </div>

          <div className="two-inputs-container">
            <div className="two-inputs">
              <FormInputs
                label={"Min-Weight*"}
                type={"text"}
                name={"minWeight"}
                placeholder={"Weight in Kg"}
                value={values.minWeight}
                handleChange={handleChange}
              ></FormInputs>

              <FormInputs
                label={"Max-Weight*"}
                type={"text"}
                name={"maxWeight"}
                placeholder={"Weight in Kg"}
                value={values.maxWeight}
                handleChange={handleChange}
              ></FormInputs>
            </div>
            <span className="errors">{errors.weight}</span>
          </div>

          <div className="two-inputs-container">
            <div className="two-inputs">
              <FormInputs
                label={"Min Life span"}
                type={"text"}
                name={"min_life_span"}
                placeholder={"Life span in Years"}
                value={values.min_life_span}
                handleChange={handleChange}
              ></FormInputs>
              <FormInputs
                label={"Max Life span"}
                type={"text"}
                name={"max_life_span"}
                placeholder={"Life span in Years"}
                value={values.max_life_span}
                handleChange={handleChange}
              ></FormInputs>
            </div>
            <span className="errors">{errors.life}</span>
          </div>

          <BoxSelect
            temperaments={temperaments}
            values={values}
            setValues={setValues}
            errors={errors}
          ></BoxSelect>
        </div>
        <div className="button-submit">
          {!modal && <button onClick={handleSubmit}>Submit</button>}
        </div>
      </form>
    </div>
  );
};

export default Create;
