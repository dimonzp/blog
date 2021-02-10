
import { SET_USERS, SET_USER_BY_ID } from "./actions";

const initialState = {
  users: [],
  userPage: {},
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    
    case SET_USERS:
      return {
        ...state,
        users: action.users
      }
    case SET_USER_BY_ID:
      return {
        ...state,
        userPage: action.user
      }

    default:
      return state;
  }
};

export default userReducer;
