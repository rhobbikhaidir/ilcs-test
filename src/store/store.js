import { createStore } from "redux";

const initialState = {
  data: [],
  countryInput: "",
};

const reducer = (state = initialState, action) => {
  return state;
};

const store = createStore(reducer);


export default store;
