import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getQuestionPlayThunk,
  deleteQuizThunk,
  submitAnsThunk,
  fetchQuizbyIdThunk,
  updateAnswerThunk,
  upLoadImgCurrentThunk,
  createAnswerThunk,
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
export const upLoadImgCurrent = createAsyncThunk(
  "creatQuiz/upLoadImgCurrent",
  async (payload, thunkAPI) => {
    const { formData, token } = payload;
    return upLoadImgCurrentThunk(
      `/questions/upload-thumbnail`,
      token,
      formData,
      thunkAPI
    );
  }
);
export const createAnswer = createAsyncThunk(
  "creatQuiz/createAnswer",
  async (payload, thunkAPI) => {
    const { content, questionId, is_correct, token } = payload;
    return createAnswerThunk(
      "/answers",
      content,
      questionId,
      is_correct,
      token,
      thunkAPI
    );
  }
);

const initialState = {
  quiz: [],
  isSuccess: false,
  isLoading: false,
  index: 0,
  questionsChecked: 0,
  number: 0,
  score: 0,
  submitSucces: false,
  quizCurrent: [],
  fetchQuizSuccess: false,
  deleteQuizSucces: false,
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
      state.submitSucces = false;
    },
    setTitleCurentQuestion: (state, { payload }) => {
      state.quizCurrent.title = payload;
    },
  },
  extraReducers: {
    [getQuestionPlay.pending]: (state) => {
      state.isSuccess = false;
      state.isLoading = true;
    },
    [getQuestionPlay.fulfilled]: (state, { payload }) => {
      state.index = 0;

      state.quiz = payload?.data;
      state.isLoading = false;
      state.isSuccess = true;
    },
    [getQuestionPlay.rejected]: (state) => {
      state.deleteQuizSucces = false;
      state.isSuccess = false;
    },
    [deleteQuiz.pending]: (state) => {
      state.deleteQuizSucces = false;
      state.isLoading = true;
    },
    [deleteQuiz.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.deleteQuizSucces = true;
    },
    [deleteQuiz.rejected]: (state) => {
      state.isLoading = false;
    },
    [submitAns.pending]: (state) => {
      state.submitSucces = false;
      state.isLoading = true;
    },
    [submitAns.fulfilled]: (state, { payload }) => {
      state.questionsChecked = payload.listQuestionChecked;
      state.number = payload.listQuestionChecked.length;
      state.score = payload.totalScore;
      state.submitSucces = true;
      state.isLoading = false;
    },
    [submitAns.rejected]: (state) => {
      state.isLoading = false;
      state.submitSucces = false;
    },
    [fetchQuizbyId.pending]: (state) => {
      state.isLoading = true;
      state.fetchQuizSuccess = false;
    },
    [fetchQuizbyId.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.fetchQuizSuccess = true;
      state.quizCurrent = payload.data;
    },
    [fetchQuizbyId.rejected]: (state) => {
      state.isLoading = false;
      state.fetchQuizSuccess = false;
    },
    [updateAnswer.pending]: (state) => {
      state.isLoading = true;
    },
    [updateAnswer.fulfilled]: (state, { payload }) => {
      state.quizCurrent.answers = state.quizCurrent.answers.map((item) => {
        if (item.id === payload.data.id) return payload.data;
        else return item;
      });
    },
    [updateAnswer.rejected]: (state) => {
      state.isLoading = false;
    },
    [upLoadImgCurrent.pending]: (state) => {
      state.isSuccess = false;
      state.isLoading = true;
    },
    [upLoadImgCurrent.fulfilled]: (state, { payload }) => {
      state.isLoading = false;

      state.quizCurrent.thumbnail_link = payload.data;
    },
    [upLoadImgCurrent.rejected]: (state) => {
      state.isLoading = false;
    },
    [createAnswer.pending]: (state) => {
      state.isLoading = true;
    },
    [createAnswer.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.quizCurrent.answers.push(payload.data);
    },
    [createAnswer.rejected]: (state) => {
      state.creatQuizSuccess = false;
    },
  },
});
export const {
  chooseAnswer,
  setQuestion,
  resetQuestions,
  setTitleCurentQuestion,
  setThumbailCurrentQuestion,
} = quizSlice.actions;
export default quizSlice.reducer;
