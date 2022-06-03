import { useReducer } from "react";

const intialState = {
  value: "",
  isTouched: false,
};

const inputReducer = (state, action) => {
  if (action.type === "INPUT") {
    return {
      value: action.payload,
      isTouched: state.isTouched,
    };
  }
  if (action.type === "INPUT_NUMBER") {
    return {
      value: action.payload,
      isTouched: state.isTouched,
    };
  }

  if (action.type === "BLUR") {
    return {
      value: state.value,
      isTouched: true,
    };
  }

  return intialState;
};

const useInput = (validateInput) => {
  const [inputState, dispatch] = useReducer(inputReducer, intialState);

  const valueIsValid = validateInput(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (event) => {

    dispatch({ type: "INPUT", payload: event.target.value });
  };
 
  const inputOnlyNumber = (e) => {
    const onlyNumber = e.target.value.replace(/[^0-9]/g, "");

    dispatch({type: 'INPUT_NUMBER', payload: onlyNumber})
  }

  const inputBlurHandler = () => {
    dispatch({ type: "BLUR" });
  };

  return {
    value: inputState.value,
    valueChangeHandler,
    hasError,
    inputBlurHandler,
    inputOnlyNumber,
  };
};

export default useInput;
