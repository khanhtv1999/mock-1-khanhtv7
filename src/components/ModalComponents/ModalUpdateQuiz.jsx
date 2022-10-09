import { Button, Modal, Input, Checkbox, Image } from "antd";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { updateAnswer } from "../../features/quiz/quizSlice";
import { setTitleCurentQuestion } from "../../features/quiz/quizSlice";
import {
  upLoadImgCurrent,
  updateQuestion,
} from "../../features/quiz/quizSlice";
import { AddAnsComponent } from "../questions/AddAnsComponent";
// import { fetchQuizbyId } from "../../features/quiz/quizSlice";

const validationSchema = yup.object({
  title: yup.string("Enter title question").required("Title is required"),
});

const ModalUpdateQuestion = () => {
  const { user } = useSelector((store) => store.user);
  const { quizCurrent } = useSelector((store) => store.quiz);
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(true);
  const toggleChecked = (id, check) => {
    dispatch(
      updateAnswer({ id: id, token: user.access_token, is_correct: !check })
    );
  };
  const handleOk = () => {
    // dispatch(setIsOpenUpdate(false))
    formik.handleSubmit();
  };
  const dispatch = useDispatch();
  const handleCheck = (id, check) => {
    console.log(id, check);
    dispatch(
      updateAnswer({ id: id, token: user.access_token, is_correct: !check })
    );
  };
  const formik = useFormik({
    initialValues: {
      title: quizCurrent.title,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(
        updateQuestion({
          title: quizCurrent.title,
          thumbnail_link: quizCurrent.thumbnail_link,
          token: user.access_token,
          id: quizCurrent.id,
        })
      );
    },
  });
  const handleUploadFile = (e) => {
    let formData = new FormData();
    formData.append("thumbnail", e.target.files[0], e.target.files[0].name);
    dispatch(
      upLoadImgCurrent({ token: user.access_token, formData: formData })
    );
  };
  const myHandleChange = (event) => {
    formik.handleChange(event);
    dispatch(setTitleCurentQuestion(event.target.value));
  };
  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Open Modal of 1000px width
      </Button>
      <Modal
        title="Update Questions"
        centered
        open={open}
        onOk={handleOk}
        onCancel={() => setOpen(false)}
        width={600}
      >
        <Input.TextArea value={quizCurrent.title} onChange={myHandleChange} />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
            marginBottom: "15px",
          }}
        >
          <Image width={200} src={quizCurrent.thumbnail_link} />
        </div>
        <Input
          style={{ marginBottom: "10px" }}
          type="file"
          onChange={handleUploadFile}
        />

        {quizCurrent.answers.map((item) => {
          return (
            <p
              style={{
                marginBottom: "20px",
              }}
            >
              <Button
                style={{ marginRight: "15px" }}
                size="small"
                type="primary"
                danger
              >
                Delete
              </Button>
              <Button
                style={{ marginRight: "35px" }}
                type="primary"
                size="small"
                onClick={() => toggleChecked(item.id, item.is_correct)}
              >
                {!item.is_correct ? "Click if true" : "Click if false"}
              </Button>
              <Checkbox
                key={item.id}
                style={{ fontWeight: "300", fontSize: "15px" }}
                checked={item.is_correct}
                onClick={() => handleCheck(item.id, item.is_correct)}
              >
                {item.content}
              </Checkbox>
            </p>
          );
        })}
        <AddAnsComponent idQuizCurrent={quizCurrent.id} />
      </Modal>
    </>
  );
};
export default ModalUpdateQuestion;
