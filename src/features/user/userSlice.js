import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginUserThunk,
  registerUserThunk,
  forgotPasswordThunk,
  logoutUserThunk,
} from "./userThunk";

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
  isSidebarOpen: false,
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
export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (refresh_token, thunkAPI) => {
    return logoutUserThunk("/authentication/logout", refresh_token, thunkAPI);
  }
);
export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (email, thunkAPI) => {
    return forgotPasswordThunk(
      "/authentication/forgot-password",
      email,
      thunkAPI
    );
  }
);
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
  },
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.isLoading = true;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      const { user } = payload.data;
      state.isLoading = false;
      state.user = user;
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
    },
    [loginUser.pending]: (state) => {
      state.isLoading = true;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      const { user, tokens } = payload.data;
      state.user.id = user.id;
      state.user.name = user?.name;
      state.user.email = user?.email;
      state.user.roles = user?.roles;
      state.user.avatar_link = user?.avatar_link;
      state.user.access_token = tokens?.access_token?.access_token;
      state.user.refresh_token = tokens?.refresh_token?.refresh_token;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.isSidebarOpen = false;
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
    },
    [forgotPassword.pending]: (state) => {
      state.isLoading = true;
    },
    [forgotPassword.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
    },
    [forgotPassword.rejected]: (state, payload) => {
      state.isLoading = false;
    },
    [logoutUser.pending]: (state) => {
      state.isLoading = true;
    },
    [logoutUser.fulfilled]: (state) => {
      state.isLoading = false;
      state.user.id = "";
      state.user.name = "";
      state.user.email = "";
      state.user.roles = "";
      state.user.avatar_link = "";
      state.user.access_token = "";
      state.user.refresh_token = "";
      state.isAuthenticated = false;
    },
    [logoutUser.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});
export const { toggleSidebar } = userSlice.actions;
export default userSlice.reducer;
