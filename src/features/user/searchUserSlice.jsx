import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllUserThunk } from "./searchUserThunk";
const initialFiltersState = {
  search: "",
  searchType: "id",
  sort: "ACS",
  searchTypeOptions: ["id", "name", "email", "createdAt", "updatedAt"],
  sortOptions: ["ASC", "DESC"],
  roleOptions: ["admin", "user"],
  role1: "",
};
const initialState = {
  isLoading: false,
  users: [],
  pageSize: 10,
  currentPage: 1,
  totalPages: 1,
  totalUser: 0,
  ...initialFiltersState,
};
export const getAllUser = createAsyncThunk(
  "searchUser/getAllUser",
  async (payload, thunkAPI) => {
    const { token, sort, searchType, currentPage, search, role1, role2 } =
      payload;
    let url = `/user?oder=${sort}&sortField=${searchType}&page=${currentPage}`;

    if (search) {
      url = url + `&keyWord=${search}`;
    }
    if (role1) {
      url = url + `&role1=${role1}`;
    }

    return getAllUserThunk(url, token, thunkAPI);
  }
);
const searchUserSlice = createSlice({
  name: "searchUser",
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      console.log("handle change name");
      state.currentPage = 1;
      state[name] = value;
    },
    changePageUser: (state, { payload }) => {
      state.currentPage = payload;
    },
  },
  extraReducers: {
    [getAllUser.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.users = payload?.data?.result;
      state.currentPage = payload?.data?.currentPage;
      state.totalPages = payload?.data?.totalPages;
      state.totalUser = payload?.data?.total;
    },
    [getAllUser.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});
export const { handleChange, changePageUser } = searchUserSlice.actions;
export default searchUserSlice.reducer;
