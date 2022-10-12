import customFetch from "../../utils/axios/axiosCustomize";

export const getAllUserThunk = async (url, token, thunkAPI) => {
  try {
    const resp = await customFetch.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};
