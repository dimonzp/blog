import createSagaMiddleware from "redux-saga";
import authReducer from "./auth/reducer";
import postsReducer from "./posts/reducer";
import rootSaga from "./sagas";
import { userReducer } from "./user/reducer";

const { createStore, combineReducers, applyMiddleware } = require("redux");

const reducers = combineReducers({
  authPage: authReducer,
  usersPage:userReducer,
  postsPage: postsReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);
export default store;
