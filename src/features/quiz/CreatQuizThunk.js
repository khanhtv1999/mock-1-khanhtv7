import customFetch from "../../utils/axios/axiosCustomize";
import { message } from "antd";
export const upLoadImgThunk = async (url, token, formData, thunkAPI) => {
  try {
    const res = await customFetch.post(url, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
};

export const creatTitleQuizThunk = async (
  url,
  token,
  title,
  linkImg,
  thunkAPI
) => {
  try {
    const res = await customFetch.post(
      url,
      {
        title: title,
        thumbnail_link: linkImg,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
};
