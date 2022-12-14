import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import userSlice from "./features/user/userSlice";
import quizSlice from "./features/quiz/quizSlice";
import searchQuizSlice from "./features/quiz/searchQuizSlice";
import createQuizSlice from "./features/quiz/createQuizSlice";
import searchUserSlice from "./features/user/searchUserSlice";
import createUserSlice from "./features/user/addUserSlice";

const reducers = combineReducers({
  user: userSlice,
  quiz: quizSlice,
  searchQuiz: searchQuizSlice,
  createQuiz: createQuizSlice,
  searchUser: searchUserSlice,
  createUser: createUserSlice,
});
const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, reducers);
const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});
export default store;
