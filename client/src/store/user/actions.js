//For user
export const REGISTRATE_USER = "REGISTRATE_USER";
export const GET_USERS = "GET_USERS";
export const GET_USER_BY_ID = "GET_USER_BY_ID";

export const SET_USERS = "SET_USERS";
export const SET_USER_BY_ID = "SET_USER_BY_ID";

//for saga
export const registrateUser = (email, password, name) => ({
  type: REGISTRATE_USER,
  email,
  password,
  name,
});
export const getUsers = () => ({
  type: GET_USERS,
});
export const getUserById = (id) => ({
  type: GET_USER_BY_ID,
  id,
});

//action
export const setUsers = (users) => ({
  type: SET_USERS,
  users,
});
export const setUserById = (user) => ({
  type: SET_USER_BY_ID,
  user,
});
