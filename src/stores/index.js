import { combineReducers, createStore } from "redux";
import useReducerAuth from "./modules/auth";
import useReducerLoading from "./modules/loading";
import useReducerParamsProduct from "./modules/products";
import useReducerCarts from "./modules/carts";

const rootReducers = combineReducers({
  auth: useReducerAuth,
  loading: useReducerLoading,
  product: useReducerParamsProduct,
  carts: useReducerCarts,
});

export default createStore(rootReducers);
