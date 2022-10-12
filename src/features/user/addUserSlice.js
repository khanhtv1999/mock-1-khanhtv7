import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createUserThunk } from "./addUserThunk";
import { toast } from "react-toastify";
export const createUser = createAsyncThunk(
  "user/createUser",
  async (payload, thunkAPI) => {
    const { token, email, name, password, roles } = payload;
    return createUserThunk(
      "/user",
      token,
      email,
      name,
      password,
      roles,
      thunkAPI
    );
  }
);
const initialState = {
  isLoading: false,
  email: "",
  name: "",
  password: "",
  roles: [],
};
const createUserSlice = createSlice({
  name: "createUser",
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    clearValues: () => {
      return {
        ...initialState,
      };
    },
  },
  extraReducers: {
    [createUser.pending]: (state) => {
      state.isLoading = true;
    },
    [createUser.fulfilled]: (state) => {
      state.isLoading = false;
      toast.success("User created");
    },
    [createUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error("User creation failed ");
    },
  },
});
export const { handleChange, clearValues } = createUserSlice.actions;
export default createUserSlice.reducer;
