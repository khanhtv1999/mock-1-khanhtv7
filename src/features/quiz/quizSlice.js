import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getQuestionPlayThunk,
  deleteQuizThunk,
  submitAnsThunk,
  fetchQuizbyIdThunk,
  updateAnswerThunk,
} from "./quizThunk";

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
export const submitAns = createAsyncThunk(
  "quiz/submitAns",
  async (payload, thunkAPI) => {
    const { questionsSubmit, token } = payload;
    return submitAnsThunk("questions/submit", token, questionsSubmit, thunkAPI);
  }
);
export const fetchQuizbyId = createAsyncThunk(
  "quiz/fetchQuizbyId",
  async (payload, thunkAPI) => {
    const { id, token } = payload;
    return fetchQuizbyIdThunk(`questions/${id}`, token, thunkAPI);
  }
);
export const updateAnswer = createAsyncThunk(
  "creatQuiz/updateAnswer",
  async (payload, thunkAPI) => {
    const { id, is_correct, token } = payload;
    return updateAnswerThunk(`/answers/${id}`, token, is_correct, thunkAPI);
  }
);
const initialState = {
  quiz: [],
  isSuccess: false,
  isLoading: false,
  index: 0,
  allQuiz: [],
  questionsChecked: 0,
  number: 0,
  score: 0,
  submitSucces: false,
  quizCurrent: "",
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
    resetQuestions: (state, { payload }) => {
      state.quiz = [];
      state.index = 0;
      state.isSuccess = false;
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
      state.isSuccess = true;
    },
    [getQuestionPlay.rejected]: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
    },
    [deleteQuiz.pending]: (state) => {
      state.isSuccess = false;
      state.isLoading = true;
    },
    [deleteQuiz.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
    },
    [deleteQuiz.rejected]: (state) => {
      state.isLoading = false;
    },
    [submitAns.pending]: (state) => {
      state.isSuccess = false;
    },
    [submitAns.fulfilled]: (state, { payload }) => {
      state.questionsChecked = payload.listQuestionChecked;
      state.number = payload.listQuestionChecked.length;
      state.score = payload.totalScore;
    },
    [submitAns.rejected]: (state) => {
      state.isLoading = false;
    },
    [fetchQuizbyId.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchQuizbyId.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      console.log("check p", payload.data);
      state.quizCurrent = payload.data;
    },
    [fetchQuizbyId.rejected]: (state) => {
      state.isLoading = false;
    },
    [updateAnswer.pending]: (state) => {
      state.isLoading = true;
    },
    [updateAnswer.fulfilled]: (state, { payload }) => {
      console.log("checkkkk", payload);
      state.quizCurrent.answers = state.quizCurrent.answers.map((item) => {
        if (item.id === payload.data.id) return payload.data;
        else return item;
      });
    },
    [updateAnswer.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});
export const { chooseAnswer, setQuestion, resetQuestions } = quizSlice.actions;
export default quizSlice.reducer;
