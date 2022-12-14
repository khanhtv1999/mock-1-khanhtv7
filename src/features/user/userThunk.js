import customFetch from "../../utils/axios/axiosCustomize";
import { message } from "antd";

export const registerUserThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, user);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
};
export const loginUserThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, user);
    return resp.data;
  } catch (error) {
    message.error(error.response.data.message, 10);
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
};
export const forgotPasswordThunk = async (url, email, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, email);
    return resp.data;
  } catch (error) {
    message.error(error.response.data.message, 10);
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
export const deleteUserThunk = async (url, token, thunkAPI) => {
  try {
    const resp = await customFetch.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
};
export const fetchUserbyIdThunk = async (url, token, thunkAPI) => {
  try {
    const resp = await customFetch.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
};
export const updateUserThunk = async (
  url,
  email,
  name,
  roles,
  token,
  thunkAPI
) => {
  try {
    const resp = await customFetch.patch(
      url,
      {
        email: email,
        name: name,
        roles: roles,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
};
