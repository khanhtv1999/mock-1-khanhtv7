import { Button, Modal, Input, Checkbox, Image } from "antd";
import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { updateAnswer } from "../../features/quiz/quizSlice";
// import { fetchQuizbyId } from "../../features/quiz/quizSlice";
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
  const dispatch = useDispatch();
  const handleCheck = (id, check) => {
    console.log(id, check);
    dispatch(
      updateAnswer({ id: id, token: user.access_token, is_correct: !check })
    );
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
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={600}
      >
        <Input.TextArea value={quizCurrent.title} />
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
        <Input style={{ marginBottom: "10px" }} type="file" />

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
      </Modal>
    </>
  );
};
export default ModalUpdateQuestion;
