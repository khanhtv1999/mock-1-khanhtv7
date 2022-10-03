const initialFiltersState = {
  search: "",
  searchType: "Title",
  sort: "Ascending",
  sortOptions: ["Ascending", "Descending"],
};
const initialState = {
  isLoading: true,
  quizs: [],
  pageSize: 8,
  currentPage: 1,
  ...initialFiltersState,
};
const allJobsSlice = createSlice({
  name: "searchQuiz",
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true;
    },
  },
  handleChange: (state, { payload: { name, value } }) => {
    state.page = 1;
    state[name] = value;
  },
  clearFilters: (state) => {
    return { ...state, ...initialFiltersState };
  },
  changePage: (state, { payload }) => {
    state.page = payload;
  },
  clearAllJobsState: (state) => initialState,
});
