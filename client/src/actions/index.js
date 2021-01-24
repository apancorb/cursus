/* This index contains all the actions for the Cursus React App */

// action to set a user as logged in
export const isLogin = () => {
  return {
    type: "IS_LOGIN",
  };
};

// action to set a user as not logged in
export const notLogin = () => {
  return {
    type: "NOT_LOGIN",
  };
};

// action to set a user university
export const setUniversity = (name) => {
  return {
    type: "SET_UNIVERSITY",
    payload: name,
  };
};

// action to remove a user university
export const removeUniversity = () => {
  return {
    type: "REMOVE_UNIVERSITY",
  };
};
