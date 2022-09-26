import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUserThunk, registerUserThunk } from "./userThunk";

const initialState = {
  user: {
    id: "",
    email: "",
    name: "",
    roles: [],
    avatar_link: "",
    access_token: "",
    refresh_token: "",
  },
  isAuthenticated: false,
  isLoading: false,
};
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, thunkAPI) => {
    return registerUserThunk("/authentication/register", user, thunkAPI);
  }
);
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPI) => {
    return loginUserThunk("/authentication/login", user, thunkAPI);
  }
);
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.isLoading = true;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      const { user } = payload.data;
      state.isLoading = false;
      state.user = user;
      console.log("check user register", payload.data);
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
    },
    [loginUser.pending]: (state) => {
      state.isLoading = true;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      const { user } = payload.data;
      console.log("check user", user);
      state.user.id = user.id;
      state.user.name = user.name;
      state.user.email = user.email;
      state.user.roles = user.roles;
      state.user.avatar_link = user.avatar_link;
      state.user.access_token = user.access_token;
      state.user.refresh_token = user.refresh_token;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
    },
  },
});
export default userSlice.reducer;
