import styled from "styled-components";
import { useFormik } from "formik";
import * as yup from "yup";
import { Typography } from "@mui/material";
import { useState } from "react";
import { Input, Image } from "antd";
import { LoadingButton } from "@mui/lab";
import { upLoadImg } from "../../../features/quiz/createQuizSlice";
import { createTitleQuiz } from "../../../features/quiz/createQuizSlice";
import { useSelector, useDispatch } from "react-redux";
import { message } from "antd";

const validationSchema = yup.object({
  title: yup.string("Enter title question").required("Title is required"),
});
const AddQuestion = () => {
  const { user } = useSelector((store) => store.user);
  const { linkImg } = useSelector((store) => store.createQuiz);
  const dispatch = useDispatch();
  // const [linkImage, setLinkImage] = useState("");
  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleAddQuestion(values);
    },
  });
  const myHandleChange = (event) => {
    formik.handleChange(event);
  };
  const handleAddQuestion = (values) => {
    dispatch(
      createTitleQuiz({
        title: values.title,
        linkImg: linkImg,
        token: user.access_token,
      })
    );
  };
  const handleUploadImg = (e) => {
    console.log("ok");
    let formData = new FormData();
    formData.append("thumbnail", e.target.files[0], e.target.files[0].name);
    dispatch(upLoadImg({ formData: formData, token: user.access_token }));
    console.log("okkkkk");
  };
  return (
    <Wrapper>
      <form className="form">
        <div className="form-center">
          <div>
            <Input.TextArea
              value={formik.values.title}
              name="title"
              onChange={myHandleChange}
              placeholder="Enter title question"
              autoSize={{
                minRows: 3,
                maxRows: 5,
              }}
            />
            {formik.touched.title && formik.errors.title && (
              <Typography style={{ color: "red" }}>
                {formik.errors.title}
              </Typography>
            )}
          </div>

          <Input type="file" onChange={handleUploadImg} />
        </div>
        {linkImg ? <Image width={400} src={linkImg} /> : <></>}
      </form>
      <LoadingButton
        sx={{ width: 200, padding: 1, margin: 2 }}
        variant="contained"
        fullWidth
        onClick={formik.handleSubmit}
        // loading={loading}
      >
        Add Question
      </LoadingButton>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  border-radius: 1px;
  width: 100%;
  background: #fff;
  padding: 3rem 2rem 4rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  h3 {
    margin-top: 0;
  }
  .form {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
  }

  .form-center {
    display: grid;
    row-gap: 0.5rem;
    margin-bottom: 4rem;
  }
  .form-center button {
    align-self: end;
    height: 35px;
    margin-top: 1rem;
  }
  .btn-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
    align-self: flex-end;
    margin-top: 0.5rem;
    button {
      height: 35px;
    }
  }

  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
      column-gap: 1rem;
    }
    .btn-container {
      margin-top: 0;
    }
  }
  @media (min-width: 1120px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .form-center button {
      margin-top: 0;
    }
  }
`;
export default AddQuestion;
