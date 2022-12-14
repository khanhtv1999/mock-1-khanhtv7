import styled from "styled-components";
import Header from "../../../components/HeaderComponent/Header";
import Circle from "../../../components/CircleComponent/Circle";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import FormQuiz from "../../../components/questions/DoQuizComponent/DoQuiz";
import Stack from "@mui/material/Stack";
import { setQuestion } from "../../../../src/features/quiz/quizSlice";
import { SubmitQuiz } from "../../../components/questions/SubmitQuizComponent";

const DoQuizPage = () => {
  const { quiz, index } = useSelector((store) => store.quiz);
  const dispatch = useDispatch();

  const handleClickNext = () => {
    dispatch(setQuestion(index + 1));
  };
  const handleClickBack = () => {
    dispatch(setQuestion(index - 1));
  };
  return (
    <>
      <Header />
      <Wrapper>
        <FormQuiz />
        <div className="left-content">
          <Circle />
        </div>

        <Stack
          margin={4}
          justifyContent="center"
          alignItems="center"
          direction="row"
          spacing={3}
        >
          {index > 0 ? (
            <Button onClick={handleClickBack} type="primary" size={30}>
              Back Quiz
            </Button>
          ) : (
            <></>
          )}
          {index < quiz.length - 1 ? (
            <Button onClick={handleClickNext} type="primary" size={30}>
              Next Quiz
            </Button>
          ) : (
            <></>
          )}

          {index === quiz.length - 1 ? <SubmitQuiz /> : <></>}
        </Stack>
      </Wrapper>
    </>
  );
};
const Wrapper = styled.section`
  background-color: #f7f7f7;
  display: grid;
  grid-template-columns: 75vw 25vw;
  grid-template-rows: 80vh;

  .left-content {
    margin-top: 3rem;
  }
`;
export default DoQuizPage;
