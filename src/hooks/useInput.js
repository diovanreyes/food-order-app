import React, { useState } from "react";

const useInput = (validation) => {
  const [value, setValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validation(value);
  const hasError = !valueIsValid && isTouched;

  const onChangeInputHnadler = (e) => {
    setValue(e.target.value)
    setIsTouched(true)
  }

  const onBlurHandler = () => {
    setIsTouched(true)
  }

  const reset = () => {
    setValue('')
    setIsTouched(false)
  }
  return { value, setValue, isTouched, setIsTouched, valueIsValid, hasError,onChangeInputHnadler,onBlurHandler,reset };
};

export default useInput;



