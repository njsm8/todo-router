export const initialState = {
  user: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: state.user,
      };
    default:
      return state;
  }
};

export default reducer;
