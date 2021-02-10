import { SET_POSTS, SET_POST_BY_ID } from "./actions";

const initialState = {
  posts: [],
  postPage: {},
};

export const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_POSTS:
      return {
        ...state,
        posts: [...action.posts.reverse()],
      };
    case SET_POST_BY_ID:
      return {
        ...state,
        postPage: action.post,
      };

    default:
      return state;
  }
};

export default postsReducer;
