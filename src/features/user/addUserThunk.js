import customFetch from "../../utils/axios/axiosCustomize";
export const createUserThunk = async (
  url,
  token,
  email,
  name,
  password,
  roles,
  thunkAPI
) => {
  try {
    const resp = await customFetch.post(
      url,
      {
        email: email,
        name: name,
        password: password,
        roles: roles,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};
