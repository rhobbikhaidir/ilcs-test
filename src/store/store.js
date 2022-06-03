import { createStore } from "redux";

const initialState = {
  allData: [],
  region: [],
  harbor: [],
  idCountry: "",
  transaction: "export",
};

const reducer = (state = initialState, action) => {
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
  if (action.type === "getAllData") {
    return {
      ...state,
      allData: action.payload,
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
