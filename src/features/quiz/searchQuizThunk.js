import customFetch from "../../utils/axiosCustomize";
export const getAllQuizThunk = async (url, token, thunkAPI) => {
  try {
    console.log("try");
    const resp = await customFetch.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};
