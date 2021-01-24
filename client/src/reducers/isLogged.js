/* reducer that changes the login status of the user */

const loggedReducer = (state = false, action) => {
  switch (action.type) {
    case "IS_LOGIN":
      return true;
    case "NOT_LOGIN":
      return false;
    default:
      return state;
  }
};

export default loggedReducer;
