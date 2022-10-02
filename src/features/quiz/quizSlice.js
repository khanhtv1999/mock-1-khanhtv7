import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getQuestionPlayThunk } from "./quizThunk";

export const getQuestionPlay = createAsyncThunk(
  "quiz/getQuestionPlay",
  async (payload, thunkAPI) => {
    const { total, token } = payload;
    return getQuestionPlayThunk(
      `https://quangnh.xyz/v1/questions/play?total=${total}`,
      token,
      thunkAPI
    );
  }
);

const initialState = {
  quiz: [],
  isSuccesQuiz: false,
  isLoadingQuiz: false,
  index: 0,
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
      state.isSuccesQuiz = false;
      state.isLoadingQuiz = true;
    },
    [getQuestionPlay.fulfilled]: (state, { payload }) => {
      state.index = 0;
      state.quiz = payload.data.data;
      state.isLoadingQuiz = false;
      state.isSuccesQuiz = true;
    },
    [getQuestionPlay.rejected]: (state) => {
      state.isLoadingQuiz = false;
      state.isSuccesQuiz = false;
    },
  },
});
export const { chooseAnswer, setQuestion } = quizSlice.actions;
export default quizSlice.reducer;
