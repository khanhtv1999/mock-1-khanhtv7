import styled from "styled-components";
import Header from "../../components/layout/Header";
import Circle from "../../components/questions/Circle";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormQuiz from "../../components/questions/FormQuiz";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { setQuestion } from "../../features/quiz/quizSlice";

const DoQuizPage = () => {
  const { quiz, index } = useSelector((store) => store.quiz);
  const dispatch = useDispatch();
  console.log(quiz);

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
          <Button onClick={handleClickBack} variant="contained" color="error">
            Back
          </Button>
          <Button onClick={handleClickNext} variant="contained">
            Next
          </Button>
          <Button variant="outlined" size="medium">
            Skip
          </Button>
        </Stack>
      </Wrapper>
    </>
  );
};
const Wrapper = styled.section`
  background-color: #f7f7f7;
  display: grid;
  grid-template-columns: 70vw 30vw;
  grid-template-rows: 80vh;

  .left-content {
    margin-top: 3rem;
  }
`;
export default DoQuizPage;
