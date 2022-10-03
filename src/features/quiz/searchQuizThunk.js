import customFetch from "../../utils/axiosCustomize";
export const getAllQuizThunk = async (_, thunkAPI) => {
  const { totalPages, search, searchType, sort } = thunkAPI.getState().allJobs;

  let url = `/questions?oder=${sort}&sortField=${searchType}&sort=${sort}&page=${totalPages}`;
  if (search) {
    url = url + `&keyWord=${search}`;
  }
  try {
    const resp = await customFetch.get(url);
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
