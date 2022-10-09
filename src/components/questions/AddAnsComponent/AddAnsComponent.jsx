import React, { useState } from "react";
import { useFormik } from "formik";
import { Typography, Input, Checkbox, Button } from "antd";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { createAnswer } from "../../../features/quiz/quizSlice";

const validationSchema = yup.object({
  title: yup.string("Enter answer").required("Answer is required"),
});
const AddAnsComponent = ({ idQuizCurrent }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const [check, setCheck] = useState(false);
  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleAdd(values);
    },
  });
  const handleAdd = (values) => {
    dispatch(
      createAnswer({
        content: values.title,
        questionId: idQuizCurrent,
        is_correct: check,
        token: user.access_token,
      })
    );

    formik.resetForm();
  };
  const handleCheck = () => {
    setCheck(!check);
  };
  const myHandleChange = (event) => {
    formik.handleChange(event);
  };
  return (
    <>
      <Typography>New answer</Typography>

      <Checkbox
        style={{ marginRight: "15px" }}
        color="primary"
        checked={check}
        onChange={handleCheck}
      />

      <Input
        placeholder="Add answer"
        style={{ width: "75%", marginRight: "15px" }}
        name="title"
        onChange={myHandleChange}
        value={formik.values.title}
      />
      {formik.touched.title && formik.errors.title && (
        <Typography style={{ color: "red" }}>{formik.errors.title}</Typography>
      )}
      <Button
        type="primary"
        size="small"
        style={{ marginRight: "20px" }}
        onClick={formik.handleSubmit}
      >
        Create
      </Button>
    </>
  );
};
export default AddAnsComponent;
