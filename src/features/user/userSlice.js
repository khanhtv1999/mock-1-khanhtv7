import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginUserThunk,
  registerUserThunk,
  forgotPasswordThunk,
  logoutUserThunk,
  deleteUserThunk,
  fetchUserbyIdThunk,
  updateUserThunk,
} from "./userThunk";
import { toast } from "react-toastify";

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
export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (payload, thunkAPI) => {
    const { id, token } = payload;
    return deleteUserThunk(`/user/${id}`, token, thunkAPI);
  }
);
export const fetchUserbyId = createAsyncThunk(
  "user/fetchUserbyId",
  async (payload, thunkAPI) => {
    const { id, token } = payload;
    return fetchUserbyIdThunk(`/user/${id}`, token, thunkAPI);
  }
);
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (payload, thunkAPI) => {
    const { token, id, email, name, roles } = payload;
    return updateUserThunk(`/user/${id}`, email, name, roles, token, thunkAPI);
  }
);
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
  userById: "",
  isModalUpdateUser: false,
  fetchUserSuccess: false,
  deleteUserSucces: false,
  isUpdate: false,
};
const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setEmail: (state, { payload }) => {
      state.userById.email = payload;
    },
    setName: (state, { payload }) => {
      state.userById.name = payload;
    },
    setRoles: (state, { payload }) => {
      state.userById.roles = payload;
    },
    openModalUpdateUser: (state) => {
      state.isModalUpdateUser = true;
    },
    closeModalUpdateUser: (state) => {
      state.isModalUpdateUser = false;
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
      state.user.id = user?.id;
      state.user.name = user?.name;
      state.user.email = user?.email;
      state.user.roles = user?.roles;
      state.user.avatar_link = user?.avatar_link;
      state.user.access_token = tokens?.access_token?.access_token;
      state.user.refresh_token = tokens?.refresh_token?.refresh_token;
      state.isAuthenticated = true;
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
    [logoutUser.fulfilled]: (state, { payload }) => {
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

    [deleteUser.pending]: (state) => {
      state.isLoading = true;
      state.deleteUserSucces = false;
    },
    [deleteUser.fulfilled]: (state, { payload }) => {
      state.deleteUserSucces = true;
      state.isLoading = false;
      toast.success("delete user success");
    },
    [deleteUser.rejected]: (state, payload) => {
      state.isLoading = false;
      state.deleteUserSucces = false;
    },
    [fetchUserbyId.pending]: (state) => {
      state.isLoading = true;
      state.fetchUserSuccess = false;
    },
    [fetchUserbyId.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.userById = payload.data;
      state.fetchUserSuccess = true;
    },
    [fetchUserbyId.rejected]: (state, payload) => {
      state.isLoading = false;
      state.fetchUserSuccess = false;
    },
    [updateUser.pending]: (state) => {
      state.isUpdate = true;
    },
    [updateUser.fulfilled]: (state, { payload }) => {
      state.isUpdate = false;
      toast.success("update user success");
    },
    [updateUser.rejected]: (state, payload) => {
      state.isUpdate = false;
    },
  },
});
export const {
  toggleSidebar,
  setName,
  setEmail,
  setRoles,
  openModalUpdateUser,
  closeModalUpdateUser,
} = userSlice.actions;
export default userSlice.reducer;
