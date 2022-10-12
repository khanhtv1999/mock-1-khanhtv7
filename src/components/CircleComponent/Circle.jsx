import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { setQuestion } from "../../features/quiz/quizSlice";
import { useEffect, useState, useRef } from "react";
const Circle = () => {
  const refDiv = useRef([]);
  const { quiz, index } = useSelector((store) => store.quiz);
  const dispatch = useDispatch();

  const getClassQuestion = (item) => {
    if (item.answersSubmittedId === undefined) return "question";
    else if (item.answersSubmittedId.length === 0) return "question";
    else return "question select";
  };
  const handleClick = (item, index) => {
    dispatch(setQuestion(index));
    console.log("check def", refDiv.current);
    if (refDiv.current) {
      refDiv.current.forEach((item) => {
        if (item && item.className === "question clicked") {
          item.className = "question";
        }
      });
    }
    // if (item.answersSubmittedId.length > 0) {

    //   item.className = "question select";
    // }

    refDiv.current[index].className =
      refDiv.current[index].className === "question select"
        ? "question select"
        : "question clicked";
  };

  return (
    <Wrapper>
      {quiz?.map((item, index) => {
        return (
          <div
            key={item.id}
            className={getClassQuestion(item)}
            onClick={() => handleClick(item, index)}
            ref={(element) => (refDiv.current[index] = element)}
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
  .clicked {
    color: #ed082a;
  }
`;
export default Circle;
