export const initialState = {
  user: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        user: action.user,
      };
    default:
      return state;
  }
};

export default reducer;
