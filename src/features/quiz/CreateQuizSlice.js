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
};
const createQuizSlice = createSlice({
  name: "creatQuiz",
  initialState,
  reducers: {},
  extraReducers: {
    [upLoadImg.pending]: (state) => {
      state.upLoadSuccess = false;
    },
    [upLoadImg.fulfilled]: (state, { payload }) => {
      state.upLoadSuccess = true;
      console.log("check payload", payload);
      state.linkImg = payload.data;
    },
    [upLoadImg.rejected]: (state) => {
      state.upLoadSuccess = false;
    },
    [createTitleQuiz.pending]: (state) => {
      state.creatQuizSuccess = false;
    },
    [createTitleQuiz.fulfilled]: (state, { payload }) => {
      state.creatQuizSuccess = true;
    },
    [createTitleQuiz.rejected]: (state) => {
      state.creatQuizSuccess = false;
    },
  },
});
export default createQuizSlice.reducer;
