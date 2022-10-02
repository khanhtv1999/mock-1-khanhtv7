import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { setQuestion } from "../../features/quiz/quizSlice";
import { useEffect, useState } from "react";
const Circle = () => {
  const { quiz, index } = useSelector((store) => store.quiz);
  const dispatch = useDispatch();
  const [classQuiz, setClassQuiz] = useState("");
  console.log(quiz);
  const getClassQuestion = (item) => {
    if (item.answersSubmittedId) return "select";
    else return "unselect";
  };
  const handleClick = (item, index) => {
    dispatch(setQuestion(index));
  };

  return (
    <Wrapper>
      {quiz.map((item, index) => {
        return (
          <div
            key={item.id}
            className={getClassQuestion(item)}
            onClick={() => handleClick(index)}
          >
            {index + 1}
          </div>
        );
      })}
    </Wrapper>
  );
};
const Wrapper = styled.section`
  display: flex;
  gap: 20px;
  margin-top: 3rem;
  margin-left: 3rem;
  flex-flow: row wrap;
  div {
    display: flex;
    border-radius: 50%;
    border: 1px solid #368add;
    height: 40px;
    width: 40px;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    cursor: pointer;
  }
  .select {
    background-color: #c3c3c3;
  }
`;
export default Circle;