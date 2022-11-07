import { React, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createDog } from "../../redux/actions";
import FormInputs from "../FormInputs/FormInputs";
import validation from "../FormInputs/validation";
import Modal from "../modal/Modal";
import BoxSelect from "../BoxSelect/BoxSelect";
import "./create.css";

const Create = (props) => {
  let dispatch = useDispatch();
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
        life_span: values.life_span? `${values.min_life_span} - ${values.max_life_span} years`: '',
        temperaments: values.temperaments,
      };
      dispatch(createDog(newDog, props.history));
      setModal(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <div className="create">
      <button
        className="button-back"
        onClick={() => props.history.push("/home")}
      >
        <div className="gg-arrow-left"></div>
      </button>
      {modal && <Modal></Modal>}
      <form onSubmit={(e) => handleSubmit(e)}>
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
            <span className="errors">{errors.height}</span>
          </div>

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
            <span className="errors">{errors.weight}</span>
          </div>

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
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Create;
