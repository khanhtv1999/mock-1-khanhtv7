import customFetch from "../../utils/axios/axiosCustomize";

export const registerUserThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, user);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
};
export const loginUserThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, user);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
};
export const forgotPasswordThunk = async (url, email, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, email);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
};
export const logoutUserThunk = async (url, refresh_token, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, { refresh_token });
    return resp;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
};
