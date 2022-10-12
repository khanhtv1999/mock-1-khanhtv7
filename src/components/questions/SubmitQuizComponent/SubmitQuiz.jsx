import { useSelector, useDispatch } from "react-redux";
import { message } from "antd";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router";

import {
  submitAns,
  resetQuestions,
} from "../../../../src/features/quiz/quizSlice";
import { useEffect } from "react";

const SubmitQuiz = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { quiz, isLoading, submitSucces } = useSelector((store) => store.quiz);
  const { user } = useSelector((store) => store.user);
  const emptyAnswer = (listQuizz) => {
    const emptyAns = listQuizz.map((item) => {
      return item.answersSubmittedId.length === 0;
    });
    return !emptyAns.includes(true);
  };

  const handleSubmit = async () => {
    const questionsSubmit = quiz.map((item) => {
      return {
        id: item.id,
        answersSubmittedId: item.answersSubmittedId
          ? item.answersSubmittedId
          : [],
      };
    });
    if (emptyAnswer(questionsSubmit)) {
      message.success("Successful submission", 8);
      dispatch(
        submitAns({
          questionsSubmit: questionsSubmit,
          token: user.access_token,
        })
      );
    } else {
      message.error("You haven't answered all the questions yet", 8);
    }
  };
  useEffect(() => {
    if (submitSucces) {
      navigate("/show-result");
      // dispatch(resetQuestions());
    }
  }, [submitSucces]);
  return (
    <>
      <div className="center">
        <LoadingButton
          loading={isLoading}
          color="error"
          variant="contained"
          type="submit"
          style={{ margin: "10px", width: "90px" }}
          onClick={handleSubmit}
          size="large"
        >
          Submit
        </LoadingButton>
      </div>
    </>
  );
};
export default SubmitQuiz;
