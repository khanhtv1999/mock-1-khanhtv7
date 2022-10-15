import styled from "styled-components";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { styled as styleMUI } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import defaultImage from "../../../assets/images/defaultImage.png";
import { findID, setColorId } from "../../../utils/filterAnswer/setColorId";
import { chooseAnswer } from "../../../features/quiz/quizSlice";

const DoQuiz = () => {
  const { quiz, index, isSuccess } = useSelector((store) => store.quiz);
  const dispatch = useDispatch();
  const [currentQuestion, setCurrentQuestion] = useState({});
  //
  const Item = styleMUI(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const srcImg = quiz[index]?.thumbnail_link
    ? quiz[index].thumbnail_link
    : defaultImage;

  const handleClick = (id) => {
    let listId = [...currentQuestion.answersSubmittedId];

    if (findID(id, listId)) {
      listId = listId.filter((el) => el !== id);
    } else {
      listId.push(id);
    }
    const payload = { ...quiz[index], answersSubmittedId: [...listId] };
    dispatch(chooseAnswer(payload));
  };
  useEffect(() => {
    if (quiz[index]?.answersSubmittedId) {
      setCurrentQuestion({ ...quiz[index] });
    } else {
      setCurrentQuestion({ ...quiz[index], answersSubmittedId: [] });
    }
  }, [index, quiz[index]]);

  return (
    <Wrapper>
      {isSuccess ? (
        <div className="right-content">
          <div className="container-title-quiz">
            <h1 className="title-quiz">{`Quiz ${index + 1}: ${
              quiz[index].title
            }`}</h1>
          </div>

          <img className="title-picture" src={srcImg} />
          <div className="container-answer">
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={3}>
                {quiz[index].answers.map((item) => {
                  const color = setColorId(
                    item.id,
                    currentQuestion.answersSubmittedId,
                    "#9dd4ff",
                    "#f1f8f8"
                  );
                  return (
                    <Grid key={item.id} xs={6}>
                      <Item
                        style={{ backgroundColor: `${color}` }}
                        key={item.id}
                        onClick={() => handleClick(item.id)}
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
          </div>
        </div>
      ) : (
        <></>
      )}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  .right-content {
    background-color: #fff;
    display: grid;
    grid-template-rows: 10vh 45vh 45vh;

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
      margin-top: 3rem;
      margin-left: 2rem;
      margin-right: 2rem;
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
export default DoQuiz;
