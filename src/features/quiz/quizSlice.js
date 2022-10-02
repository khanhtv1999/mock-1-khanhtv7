import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getQuestionPlayThunk, getAllQuestionsThunk } from "./quizThunk";

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
export const getAllQuestions = createAsyncThunk(
  "quiz/getAllQuestions",
  async (token, thunkAPI) => {
    return getAllQuestionsThunk(`/questions?sortField=id`, token, thunkAPI);
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
      state.isSuccesQuiz = false;
      state.isLoadingQuiz = true;
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
    [getAllQuestions.pending]: (state) => {
      state.isSucces = false;
      state.isLoading = true;
    },
    [getAllQuestions.fulfilled]: (state, { payload }) => {
      state.allQuiz = payload.data.result;
      state.isLoading = false;
      state.isSucces = true;
    },
    [getAllQuestions.rejected]: (state) => {
      state.isLoading = false;
      state.isSucces = false;
    },
  },
});
export const { chooseAnswer, setQuestion } = quizSlice.actions;
export default quizSlice.reducer;
