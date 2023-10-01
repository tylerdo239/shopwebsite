import { useState } from "react";

// UseInput custom hooke for validate input data
function UseInput(validateValue) {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;

  const valueInputChange = (event) => {
    setEnteredValue(event.target.value);
  };

  const valueInputBlur = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    valueInputChange,
    valueInputBlur,
    setIsTouched,
    reset,
  };
}

export default UseInput;
