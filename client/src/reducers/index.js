import { combineReducers } from "redux";

import loggedReducer from "./isLogged.js";
import universityReducer from "./setUniversity.js";

const allReducers = combineReducers({
  isLogged: loggedReducer,
  university: universityReducer,
});

export default allReducers;
