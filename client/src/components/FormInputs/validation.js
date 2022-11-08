const validation = (values, dogs) => {
  let errors = {};

  const verifyMinMax = (min, max) => {
    if (Number(min) >= Number(max)) {
      return true;
    } else {
      return false;
    }
  };

  const expresionReg = {
    name: /^[a-zA-Z]{3,16}$/,
    heigthAndWeight: /^[0-9]{0,3}$/,
    lifeSpan: /^[0-9]{0,2}$/,
    image: /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/,
  };

  if (!values.name) {
    errors.name = "Name is required";
  } else {
    let exist = dogs.find((f) => f.name === values.name);
    console.log(exist);
    if (exist) {
      errors.name = "Already exists in the database";
    } else if (!expresionReg.name.test(values.name)) {
      errors.name =
        "Name should be 3-16 characters, shouldn't include any special character or numbers!";
    }
  }
  if (values.image) {
    if (!expresionReg.image.test(values.image)) {
      errors.image = "It not valid url image";
    }
  }

  if (values.minHeight && values.maxHeight) {
    if (
      !expresionReg.heigthAndWeight.test(values.minHeight) ||
      !expresionReg.heigthAndWeight.test(values.maxHeight)
    ) {
      errors.height = "It should only include numbers";
    } else if (values.maxHeight > 200) {
      errors.height = "The maximum values should be 200 cm";
    } else if (verifyMinMax(values.minHeight, values.maxHeight)) {
      errors.height = "The value minimum should be less than the maximun";
    }
  } else {
    errors.height = "Min and Max Height is required";
  }

  if (values.minWeight && values.maxWeight) {
    if (
      !expresionReg.heigthAndWeight.test(values.minWeight) ||
      !expresionReg.heigthAndWeight.test(values.maxWeight)
    ) {
      errors.weight = "It should only include numbers";
    } else if (values.maxWeight > 150) {
      errors.weight = "The maximum value should be less 150kg";
    } else if (verifyMinMax(values.minWeight, values.maxWeight)) {
      errors.weight = "The value minimum should be less than the maximum";
    }
  } else {
    errors.weight = "Min and Max Weight is required ";
  }

  if (values.min_life_span || values.max_life_span) {
    if (values.min_life_span && values.max_life_span) {
      if (
        !expresionReg.lifeSpan.test(values.min_life_span) ||
        !expresionReg.lifeSpan.test(values.max_life_span)
      ) {
        errors.life = "It should only include numbers";
      } else if (values.max_life_span > 25) {
        errors.life = "The maximum value should be less 25 years";
      } else if (verifyMinMax(values.min_life_span, values.max_life_span)) {
        errors.life = "The value minimum should be less than the maximun";
      }
    } else {
      errors.life = "the other space shouldn't be empty";
    }
  }

  if (values.temperaments) {
    if (values.temperaments.length > 6) {
      errors.temperaments = "Should only have a maximum of 6 temperaments";
    }
  }

  return errors;
};

export default validation;
