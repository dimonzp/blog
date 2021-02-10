//For auth
export const GET_ME = "GET_ME";
export const POST_AUTH = "POST_AUTH";
export const UPDATE_USER = "UPDATE_USER";
export const UPDATE_AVATAR = "UPDATE_AVATAR";

export const SET_AUTH_DATA = "SET_AUTH_DATA";
export const SET_ERROR = "SET_ERROR";

export const LOGOUT = "LOGOUT";

//for saga
export const getMe = () => ({ type: GET_ME });
export const postAuth = (email, password) => ({
  type: POST_AUTH,
  email,
  password,
});
export const updateUser = (id, name) => ({
  type: UPDATE_USER,
  id,
  name
});
export const updateAvatar = (id, avatar) => ({
  type: UPDATE_AVATAR,
  id,
  avatar,
});

//action
export const setAuthDate = (data) => ({
  type: SET_AUTH_DATA,
  data,
});
export const setError = (error) => ({
  type: SET_ERROR,
  error,
});
export const logout = () => ({
  type: LOGOUT,
});
