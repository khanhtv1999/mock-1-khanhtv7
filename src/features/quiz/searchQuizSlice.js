import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllQuizThunk } from "./searchQuizThunk";
import customFetch from "../../utils/axios/axiosCustomize";
const initialFiltersState = {
  search: "",
  searchType: "id",
  sort: "ACS",
  searchTypeOptions: ["id", "thumbnail", "createdAt", "updatedAt"],
  sortOptions: ["ASC", "DESC"],
};
const initialState = {
  isLoading: false,
  quizs: [],
  pageSize: 10,
  currentPage: 1,
  totalPages: 1,
  totalQuiz: 0,
  ...initialFiltersState,
};
export const getAllQuiz = createAsyncThunk(
  "searchQuiz/getAllQuiz",
  async (payload, thunkAPI) => {
    const { token, sort, searchType, currentPage, search } = payload;
    let url = `/questions?oder=${sort}&sortField=${searchType}&page=${currentPage}`;

    if (search) {
      url = url + `&keyWord=${search}`;
    }
    return getAllQuizThunk(url, token, thunkAPI);
  }
);
const searchQuizSlice = createSlice({
  name: "searchQuiz",
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
    handleChange: (state, { payload: { name, value } }) => {
      console.log("handle change");
      state.currentPage = 1;
      state[name] = value;
    },
    clearFilters: (state) => {
      return { ...state, ...initialFiltersState };
    },
    changePage: (state, { payload }) => {
      state.currentPage = payload;
    },
    clearAllQuizState: (state) => initialState,
  },

  extraReducers: {
    [getAllQuiz.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllQuiz.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.quizs = payload?.data?.result;
      state.currentPage = payload?.data?.currentPage;
      state.totalPages = payload?.data?.totalPages;
      state.totalQuiz = payload?.data?.total;
    },
    [getAllQuiz.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});
export const {
  showLoading,
  hideLoading,
  handleChange,
  clearFilters,
  changePage,
  clearAllQuizState,
} = searchQuizSlice.actions;
export default searchQuizSlice.reducer;
