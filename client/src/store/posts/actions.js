//For posts
export const GET_POSTS = "GET_POSTS";
export const GET_POST_BY_ID = "GET_POST_BY_ID";
export const CREATE_NEW_POST = "CREATE_NEW_POST";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";
export const UPDATE_POST_PICTURE = "UPDATE_POST_PICTURE";

export const SET_POSTS = "SET_POSTS";
export const SET_POST_PAGE = "SET_POST_PAGE";
export const SET_POST_BY_ID = "SET_POST_BY_ID";

//for saga
export const getPosts = () => ({
  type: GET_POSTS,
});

export const createNewPost = (title, fullText, description) => ({
  type: CREATE_NEW_POST,
  title,
  fullText,
  description,
});

export const getPostById = (id) => ({
  type: GET_POST_BY_ID,
  id,
});
export const updatePost = (id, title, fullText, description) => ({
  type: UPDATE_POST,
  id,
  title,
  fullText,
  description,
});
export const deletePost = (id) => ({
  type: DELETE_POST,
  id,
});
export const updatePostPicture = (id, picture) => ({
  type: UPDATE_POST_PICTURE,
  id,
  picture,
});

//action
export const setPosts = (posts) => ({
  type: SET_POSTS,
  posts,
});
export const setPostById = (post) => ({
  type: SET_POST_BY_ID,
  post,
});
