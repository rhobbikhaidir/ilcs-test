import { createStore } from "redux";

const initialState = {
  destination: '',
  homeData: [],
  region: [],
  harbor: [],
  hsCode: [],
  finalData: [],
  idCountry: "",
  transaction: "",
};

const reducer = (state = initialState, action) => {
  if(action.type === "destination") { 
    return {
      ...state,
      destination: action.payload,
    }
  }
  if (action.type === "hsCode") {
    return {
      ...state,
      hsCode: action.payload,
    };
  }
  if (action.type === "submit") {
    return {
      ...state,
      finalData: action.payload,
    };
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
