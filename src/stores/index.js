import { combineReducers, createStore } from "redux";
import useReducerAuth from "./modules/auth";

const rootReducers = combineReducers({
  auth: useReducerAuth,
});

export default createStore(rootReducers);
