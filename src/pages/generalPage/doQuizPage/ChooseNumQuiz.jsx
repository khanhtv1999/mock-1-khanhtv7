import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Input } from "antd";
import LoadingButton from "@mui/lab/LoadingButton";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../../components/HeaderComponent/Header";
import background from "../../../assets/images/image-chooseNumber.jpg";
import { getQuestionPlay } from "../../../features/quiz/quizSlice";
import { useNavigate } from "react-router";

const ChooseNumQuiz = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const { isSuccess } = useSelector((store) => store.quiz);
  const [number, setNumber] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    dispatch(getQuestionPlay({ total: number, token: user.access_token }));
  };
  useEffect(() => {
    setLoading(false);
    if (isSuccess === true) {
      navigate("/do-quiz");
    }
  }, [isSuccess]);
  return (
    <>
      <Header />
      <Wrapper>
        <div>
          <h1>Enter the number of questions you want to do</h1>
          <Input
            value={number}
            onChange={(e) => {
              setNumber(e.target.value);
            }}
          />
          <LoadingButton
            onClick={handleClick}
            loading={loading}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </LoadingButton>
        </div>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.section`
  background-image: linear-gradient(
      to right bottom,
      rgba(58, 66, 70, 0.8),
      rgba(149, 160, 166, 0.8)
    ),
    url(${background});

  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-position: top;
  position: relative;
  div {
    display: flex;
    z-index: 10;
    align-items: center;
    flex-direction: column;
    gap: 2rem;
    h1 {
      color: #fff;
      font-size: 5rem;
      font-weight: 400;
      margin-bottom: 4rem;
      margin-top: 4rem;
    }
    button {
      width: 10%;
      margin-top: 2rem;
    }
    input {
      background-color: #f4f2f2;
      border: none;
      padding: 0.7rem 2rem;
      width: 40%;
      margin-right: -3.25rem;
      margin-bottom: 2rem;
    }
  }
`;
export default ChooseNumQuiz;
