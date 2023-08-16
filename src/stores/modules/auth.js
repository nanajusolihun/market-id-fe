// GET DATA FROM LOCAL STRORAGE
const token = localStorage.getItem("token") || null;
const user = JSON.parse(localStorage.getItem("user")) || {};

// STATE
const initialState = {
  user,
  token,
};

// REDUCERS
const useReducerAuth = (state = initialState, actions) => {
  switch (actions.type) {
    case "AUTH_TOKEN":
      return {
        ...state,
        user: actions.value,
      };

    case "AUTH_USER":
      return {
        ...state,
        user: actions.value,
      };

    default:
      return state;
  }
};

export default useReducerAuth;
