import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { upLoadImgThunk, creatTitleQuizThunk } from "./creatQuizThunk";

export const upLoadImg = createAsyncThunk(
  "creatQuiz/upLoadImg",
  async (payload, thunkAPI) => {
    const { formData, token } = payload;
    return upLoadImgThunk(
      `/questions/upload-thumbnail`,
      token,
      formData,
      thunkAPI
    );
  }
);
export const createTitleQuiz = createAsyncThunk(
  "creatQuiz/creatTitleQuiz",
  async (payload, thunkAPI) => {
    const { title, linkImg, token } = payload;
    return creatTitleQuizThunk("/questions", token, title, linkImg, thunkAPI);
  }
);

const initialState = {
  linkImg: "",
  upLoadSuccess: false,
  creatQuizSuccess: false,
  newQuiz: "",
  isLoading: false,
};
const createQuizSlice = createSlice({
  name: "creatQuiz",
  initialState,
  reducers: {
    resetLinkImg: (state, { payload }) => {
      state.linkImg = "";
    },
    resetStatus: (state, { payload }) => {
      state.upLoadSuccess = false;
      state.creatQuizSuccess = false;
    },
  },
  extraReducers: {
    [upLoadImg.pending]: (state) => {
      state.upLoadSuccess = false;
    },
    [upLoadImg.fulfilled]: (state, { payload }) => {
      state.upLoadSuccess = true;

      state.linkImg = payload.data;
    },
    [upLoadImg.rejected]: (state) => {
      state.upLoadSuccess = false;
    },
    [createTitleQuiz.pending]: (state) => {
      state.creatQuizSuccess = false;
      state.isLoading = true;
    },
    [createTitleQuiz.fulfilled]: (state, { payload }) => {
      state.creatQuizSuccess = true;
      state.newQuiz = payload.data;
      state.isLoading = false;
    },
    [createTitleQuiz.rejected]: (state) => {
      state.creatQuizSuccess = false;
      state.isLoading = false;
    },
  },
});
export const { resetLinkImg, resetStatus } = createQuizSlice.actions;
export default createQuizSlice.reducer;
