import { createStore } from "redux";

const initialState = {
  homeData: [],
  region: [],
  harbor: [],
  finalData: [],
  idCountry: "",
  transaction: "export",
};

const reducer = (state = initialState, action) => {
  if(action.type === "submit") {
    return{
      ...state,
      finalData: action.payload
    }
  }
  if (action.type === "idCountry") {
    return {
      ...state,
      idCountry: action.payload,
    };
  }
  if (action.type === "getHarbor") {
    return {
      ...state,
      harbor: action.payload,
    };
  }
  if (action.type === "getRegion") {
    return {
      ...state,
      region: action.payload,
    };
  }
  if (action.type === "homeData") {
    return {
      ...state,
      homeData: action.payload,
    };
  }
  if (action.type === "transaction") {
    return {
      ...state,
      transaction: action.payload,
    };
  }
  return state;
};

const store = createStore(reducer);

export default store;
