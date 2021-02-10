import { takeEvery, put, call, all } from "redux-saga/effects";
import { authAPI, usersAPI, postAPI } from "../api/api";
import {
  GET_ME,
  POST_AUTH,
  setAuthDate,
  setError,
  UPDATE_AVATAR,
  UPDATE_USER,
} from "./auth/actions";
import {
  CREATE_NEW_POST,
  DELETE_POST,
  GET_POSTS,
  GET_POST_BY_ID,
  setPostById,
  setPosts,
  UPDATE_POST,
} from "./posts/actions";
import {
  REGISTRATE_USER,
  GET_USERS,
  setUsers,
  setUserById,
  GET_USER_BY_ID,
} from "./user/actions";

//check token and put user
function* workerGetMe() {
  try {
    const user = yield call(authAPI.getAuthUser);

    yield put(setAuthDate(user));
  } catch (e) {
    localStorage.clear()
    yield put(setError(e.response.data.error));
  }
}

export function* watchGetMe() {
  yield takeEvery(GET_ME, workerGetMe);
}

//post auth
function* workerPostAuth(action) {
  try {
    const res = yield call(authAPI.postAuth, action.email, action.password);

    localStorage.setItem("token", res.token);

    const user = yield call(authAPI.getAuthUser);
    yield put(setAuthDate(user));
  } catch (e) {
    localStorage.clear();
    yield put(setError(e.response.data.error));
  }
}

export function* watchPostAuth() {
  yield takeEvery(POST_AUTH, workerPostAuth);
}

//registrate new User
function* workerRegistrateUser(action) {
  try {
    yield call(usersAPI.postUser, action.email, action.password, action.name);
    const res = yield call(authAPI.postAuth, action.email, action.password);
    localStorage.setItem("token", res.token);
    const user = yield call(authAPI.getAuthUser);
    yield put(setAuthDate(user));
  } catch (e) {
    yield put(setError(e.response.data.error));
  }
}

export function* watchRegistrateUser() {
  yield takeEvery(REGISTRATE_USER, workerRegistrateUser);
}

//get all users
function* workerSetUsers() {
  try {
    const users = yield call(usersAPI.getAllUsers);
    yield put(setUsers(users));
  } catch (e) {
    yield put(setError(e.response.data.error));
  }
}

export function* watchSetUsers() {
  yield takeEvery(GET_USERS, workerSetUsers);
}

//get all posts
function* workerGetPosts() {
  try {
    const posts = yield call(postAPI.getAllPosts);
    yield put(setPosts(posts));
    const users = yield call(usersAPI.getAllUsers);
    yield put(setUsers(users));
  } catch (e) {
    yield put(setError(e.response.data.error));
  }
}

export function* watchGetPosts() {
  yield takeEvery(GET_POSTS, workerGetPosts);
}

//Get user by id
function* workerGetUserById(action) {
  try {
    const user = yield call(usersAPI.getUserById, action.id);
 
    yield put(setUserById(user));
  } catch (e) {
    yield put(setError(e.response.data.error));
  }
}

export function* watchGetUserById() {
  yield takeEvery(GET_USER_BY_ID, workerGetUserById);
}

//Create new post
function* workerCreateNewPost(action) {
  try {
    yield call(
      postAPI.newPost,
      action.title,
      action.fullText,
      action.description
    );
    const posts = yield call(postAPI.getAllPosts);
    yield put(setPosts(posts));
  } catch (e) {
    console.log(e.response.data.error);
    yield put(setError(e.response.data.error));
  }
}

export function* watchCreateNewPost() {
  yield takeEvery(CREATE_NEW_POST, workerCreateNewPost);
}

//Get post By id
function* workerGetPostById(action) {
  try {
    const post = yield call(postAPI.getPostsById, action.id);
    yield put(setPostById(post));
  } catch (e) {
    console.log(e.response.data.error);
    yield put(setError(e.response.data.error));
  }
}

export function* watchGetPostById() {
  yield takeEvery(GET_POST_BY_ID, workerGetPostById);
}

//Delete post
function* workerDeletePostById(action) {
  try {
    yield call(postAPI.deletePostById, action.id);
  } catch (e) {
    console.log(e.response.data.error);
    yield put(setError(e.response.data.error));
  }
}

export function* watchDeletePostById() {
  yield takeEvery(DELETE_POST, workerDeletePostById);
}

//Update post
function* workerUpdatePostById(action) {
  try {
    yield call(
      postAPI.updatePostById,
      action.id,
      action.title,
      action.fullText,
      action.description
    );
  } catch (e) {
    console.log(e.response.data.error);
    yield put(setError(e.response.data.error));
  }
}

export function* watchUpdatePostById() {
  yield takeEvery(UPDATE_POST, workerUpdatePostById);
}

//Update user
function* workerUpdateUser(action) {
  try {
    const user = yield call(usersAPI.patchUserById, action.id, action.name);
    yield put(setAuthDate(user));
  } catch (e) {
    console.log("error from Update user saga", e.response.data.error);
    yield put(setError(e.response.data.error));
  }
}

export function* watchUpdateUser() {
  yield takeEvery(UPDATE_USER, workerUpdateUser);
}

// Update avatar
function* workerUpdateAvatar(action) {
  try {
    const user = yield call(usersAPI.updateAvatar, action.id, action.avatar);
    yield put(setAuthDate(user))
  } catch (e) {
    console.log("error from Update Avatar saga", e.response.data.error);
    yield put(setError(e.response.data.error));
  }
}

export function* watchUpdateAvatar() {
  yield takeEvery(UPDATE_AVATAR, workerUpdateAvatar);
}

export default function* rootSaga() {
  yield all([
    watchGetMe(),
    watchPostAuth(),
    watchRegistrateUser(),
    watchSetUsers(),
    watchGetPosts(),
    watchGetUserById(),
    watchCreateNewPost(),
    watchGetPostById(),
    watchDeletePostById(),
    watchUpdatePostById(),
    watchUpdateUser(),
    watchUpdateAvatar()
  ]);
}
