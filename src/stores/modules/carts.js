// STATE
const initialState = {
  dataCart: [],
};

// REDUCERS
const useReducerCarts = (state = initialState, actions) => {
  switch (actions.type) {
    case "SET_CARTS":
      return {
        ...state,
        dataCart: actions.value,
      };

    default:
      return { ...state };
  }
};

export default useReducerCarts;
