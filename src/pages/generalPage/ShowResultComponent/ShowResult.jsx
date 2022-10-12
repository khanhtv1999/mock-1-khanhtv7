import styled from "styled-components";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { styled as styleMUI } from "@mui/material/styles";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import defaultImage from "../../../assets/images/defaultImage.png";
import { setQuestion, resetQuestions } from "../../../features/quiz/quizSlice";
import { Header } from "../../../components/HeaderComponent";

const ShowResult = () => {
  const navigate = useNavigate();
  const { questionsChecked, score, index } = useSelector((store) => store.quiz);
  const dispatch = useDispatch();

  const handleBack = () => {
    dispatch(setQuestion(index - 1));
  };
  const handleNext = () => {
    dispatch(setQuestion(index + 1));
  };
  const handlePlayAgain = () => {
    navigate("/choose-number");
    dispatch(resetQuestions());
  };
  const Item = styleMUI(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  const srcImg = questionsChecked[index]?.thumbnail_link
    ? questionsChecked[index]?.thumbnail_link
    : defaultImage;
  return (
    <>
      <Header />
      <Wrapper>
        <div className="right-content">
          <div className="container-title-quiz">
            <h1 className="title-quiz">{`Quiz ${index + 1}: ${
              questionsChecked[index].title
            }`}</h1>
          </div>

          <img className="title-picture" src={srcImg} />
          <div className="container-answer">
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={3}>
                {questionsChecked[index]?.answers?.map((item) => {
                  let color = item.is_correct ? "#468b61" : "#fff";
                  if (item.is_submit_correct === false) color = "#da0039";
                  return (
                    <Grid key={item.id} xs={6}>
                      <Item
                        style={{ backgroundColor: `${color}` }}
                        key={item.id}
                        className="answer"
                        elevation={2}
                      >
                        {item.content}
                      </Item>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
            <h1>{`Total score ${score}`}</h1>
          </div>
          <div className="btn-result">
            <Button onClick={handleBack} type="danger">
              Back Result
            </Button>
            <Button onClick={handleNext} type="primary">
              Next Result
            </Button>
            <Button onClick={handlePlayAgain} type="primary">
              Play Again
            </Button>
          </div>
        </div>
      </Wrapper>
    </>
  );
};
const Wrapper = styled.div`
  .right-content {
    background-color: #f0f4f8;
    display: grid;
    grid-template-rows: 10vh 30vh 25vh 35vh;
    .btn-result {
      display: flex;
      justify-content: center;
      gap: 4rem;
    }

    .container-title-quiz {
      display: flex;
      align-items: center;
      justify-content: left;
      margin-left: 2rem;
      .title-quiz {
        font-size: 3rem;
        font-weight: 450;
      }
    }
    .container-answer {
      margin-top: 2rem;
      margin-left: 2rem;
      margin-right: 2rem;
      h1 {
        margin: 0;
        font-weight: 600;
        line-height: 1.3;
      }
      .answer {
        /* background-color: #f1f8f8; */
        color: #000;
        font-size: 2rem;
        cursor: pointer;
      }

      .answer:hover {
        box-shadow: 2px 4px 15px #a2a2a2;
        transition: all 0.3s;
      }
    }
  }
  .title-picture {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
export default ShowResult;
