import customFetch from "../../utils/axios/axiosCustomize";
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
export const submitAnsThunk = async (url, token, questionsSubmit, thunkAPI) => {
  try {
    const res = await customFetch.post(
      url,
      { listQuestionSubmitted: [...questionsSubmit] },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
};
export const fetchQuizbyIdThunk = async (url, token, thunkAPI) => {
  try {
    const res = await customFetch.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
};
export const updateAnswerThunk = async (url, token, is_correct, thunkAPI) => {
  try {
    const res = await customFetch.patch(
      url,
      { is_correct },
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
export const upLoadImgCurrentThunk = async (url, token, formData, thunkAPI) => {
  try {
    const res = await customFetch.post(url, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
};
export const createAnswerThunk = async (
  url,
  content,
  questionId,
  is_correct,
  token,
  thunkAPI
) => {
  try {
    const res = await customFetch.post(
      url,
      {
        content: content,
        questionId: questionId,
        is_correct: is_correct,
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
