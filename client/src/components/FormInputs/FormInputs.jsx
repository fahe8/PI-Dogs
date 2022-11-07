import { React, useState } from "react";
import "./formInputs.css";
import validation from "./validation";

const FormInputs = ({ label, handleChange, ...propsInput}) => {
  
  return (
    <div className="formInput">
      <label>{label}:</label>
      <input
       {...propsInput}
       onChange={e =>handleChange(e)}
      />
    </div>
  );
};

export default FormInputs;
