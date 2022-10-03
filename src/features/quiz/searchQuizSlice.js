const initialFiltersState = {
  search: "",
  searchType: "All",
  sort: "Ascending",
  sortOptions: ["Ascending", "Descending"],
};
const initialState = {
  isLoading: true,
  quizs: [],
  pageSize: 10,
  currentPage: 1,
  totalPages: 0,
  totalQuiz: 0,
  ...initialFiltersState,
};
export const getAllQuiz = createAsyncThunk("allJobs/getJobs", getAllQuizThunk);
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
      state.quizs = payload?.result;
      state.currentPage = payload.currentPage;
      state.totalPages = payload.totalPages;
      state.totalQuiz = state.total;
    },
    [getAllQuiz.rejected]: (state, { payload }) => {
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
export default searchQuizSlice;
