import { LOGOUT, SET_AUTH_DATA, SET_ERROR } from "./actions";

const initialState = {
  _id: "",
  email: "",
  name: "",
  dateCreated: "",
  avatar: "",
  error: "",
  message: ""
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_DATA:
      const { _id, email, name, avatar = "", dateCreated } = action.data;
      
      return {
        ...state,
        _id,
        email,
        avatar,
        name,
        dateCreated,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.error,
      };
    case LOGOUT:
      return {
        ...state,
        _id: "",
        email: "",
        name: "",
        dateCreated: "",
      };

    default:
      return state;
  }
};

export default authReducer;
