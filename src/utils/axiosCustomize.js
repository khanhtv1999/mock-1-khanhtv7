import axios from "axios";
const customFetch = axios.create({
  baseURL: "https://quangnh.xyz/v1",
  headers: { "Content-Type": "application/json" },
});
export const checkForUnauthorizedResponse = (error, thunkAPI) => {
  if (error.response.status === 401) {
    console.log("token???");
    return thunkAPI.rejectWithValue("Unauthorized! Logging Out...");
  }
  return thunkAPI.rejectWithValue(error);
};
export default customFetch;
