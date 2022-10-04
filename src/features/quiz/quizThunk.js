import customFetch from "../../utils/axiosCustomize";
export const getQuestionPlayThunk = async (url, token, thunkAPI) => {
  try {
    const res = await customFetch.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
};
export const deleteQuizThunk = async (url, token, thunkAPI) => {
  try {
    const res = await customFetch.delete(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
};
