import customFetch from "../../utils/axios/axiosCustomize";
export const getAllQuizThunk = async (url, token, thunkAPI) => {
  try {
    const resp = await customFetch.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};
export const updateQuestionThunk = async (
  url,
  title,
  thumbnail_link,
  token,
  thunkAPI
) => {
  try {
    const res = await customFetch.patch(
      url,
      {
        title: title,
        thumbnail_link: thumbnail_link,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
};
