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
  if (action.type === "BLUR") {
    return {
      value: state.value,
      isTouched: true,
    };
  }

  return intialState;
};

const useInput = () => {
  const [inputState, dispatch] = useReducer(inputReducer, intialState);

  const valueChangeHandler = (event) => {
    dispatch({ type: "INPUT", payload: event.target.value });
  };

  const inputBlurHandler = () => {
    dispatch({ type: "BLUR" });
  };
  return {
    value: inputState.value,
    valueChangeHandler,
    inputBlurHandler,
  };
};

export default useInput;
