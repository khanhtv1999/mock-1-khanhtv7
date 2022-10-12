import { Button, Modal, Input, Checkbox, Image } from "antd";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { updateAnswer } from "../../features/quiz/quizSlice";
import { setTitleCurentQuestion } from "../../features/quiz/quizSlice";
import { upLoadImgCurrent } from "../../features/quiz/quizSlice";
import { updateQuestion } from "../../features/quiz/searchQuizSlice";
import { AddAnsComponent } from "../questions/AddAnsComponent";
import { resetStatus } from "../../features/quiz/createQuizSlice";
import { closeModalUpdateQuestion } from "../../features/quiz/searchQuizSlice";

const validationSchema = yup.object({
  title: yup.string("Enter title question").required("Title is required"),
});

const ModalUpdateQuestion = () => {
  const { user } = useSelector((store) => store.user);
  const { quizCurrent, fetchQuizSuccess, isUpdate } = useSelector(
    (store) => store.quiz
  );
  const { isModalUpdateQuestion } = useSelector((store) => store.searchQuiz);
  const toggleChecked = (id, check) => {
    dispatch(
      updateAnswer({ id: id, token: user.access_token, is_correct: !check })
    );
  };
  const handleOk = () => {
    formik.handleSubmit();
  };
  const dispatch = useDispatch();
  const handleCheck = (id, check) => {
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
      dispatch(resetStatus());
    },
  });
  const handleCancel = () => {
    dispatch(closeModalUpdateQuestion());
  };
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
      <Modal
        title="Update Questions"
        centered
        open={isModalUpdateQuestion}
        onOk={handleOk}
        onCancel={handleCancel}
        width={600}
        confirmLoading={isUpdate}
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
        {fetchQuizSuccess ? (
          <div>
            {quizCurrent?.answers.map((item) => {
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
          </div>
        ) : (
          <></>
        )}

        <AddAnsComponent idQuizCurrent={quizCurrent.id} />
      </Modal>
    </>
  );
};
export default ModalUpdateQuestion;
