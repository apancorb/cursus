/* reducer that changes the university status of the user */

const universityReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_UNIVERSITY":
      return action.payload;
    case "REMOVE_UNIVERSITY":
      return null;
    default:
      return state;
  }
};

export default universityReducer;
