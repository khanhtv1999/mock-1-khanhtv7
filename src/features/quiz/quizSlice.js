import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getQuestionPlayThunk, deleteQuizThunk } from "./quizThunk";

export const getQuestionPlay = createAsyncThunk(
  "quiz/getQuestionPlay",
  async (payload, thunkAPI) => {
    const { total, token } = payload;
    return getQuestionPlayThunk(
      `/questions/play?total=${total}`,
      token,
      thunkAPI
    );
  }
);
export const deleteQuiz = createAsyncThunk(
  "quiz/deleteQuiz",
  async (payload, thunkAPI) => {
    const { id, token } = payload;
    return deleteQuizThunk(`/questions/${id}`, token, thunkAPI);
  }
);
const initialState = {
  quiz: [],
  isSucces: false,
  isLoading: false,
  index: 0,
  allQuiz: [],
};
const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    chooseAnswer: (state, { payload }) => {
      state.quiz = state.quiz.map((item) => {
        if (item.id === payload.id) return payload;
        else return item;
      });
    },
    setQuestion: (state, { payload }) => {
      state.index = payload;
    },
  },
  extraReducers: {
    [getQuestionPlay.pending]: (state) => {
      state.isSuccess = false;
      state.isLoading = true;
    },
    [getQuestionPlay.fulfilled]: (state, { payload }) => {
      state.index = 0;
      console.log(payload?.data);
      state.quiz = payload?.data;
      state.isLoading = false;
      state.isSucces = true;
    },
    [getQuestionPlay.rejected]: (state) => {
      state.isLoading = false;
      state.isSucces = false;
    },
    [deleteQuiz.pending]: (state) => {
      state.isSucces = false;
      state.isLoading = true;
    },
    [deleteQuiz.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
    },
    [deleteQuiz.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});
export const { chooseAnswer, setQuestion } = quizSlice.actions;
export default quizSlice.reducer;
