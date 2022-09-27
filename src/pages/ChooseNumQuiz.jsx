import React from "react";
import styled from "styled-components";
import { Button } from "@mui/material";
import Header from "../components/Header";
import background from "../assets/image-chooseNumber.jpg";

const ChooseNumQuiz = () => {
  return (
    <>
      <Header />
      <Wrapper className="container-choose">
        <div>
          <h1>Enter the number of questions you want to do</h1>
          <input type="number" min={1} />

          <Button variant="contained" size="medium">
            Submit
          </Button>
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
    h1 {
      color: #fff;
      font-size: 5rem;
      font-weight: 400;
      margin-bottom: 4rem;
      margin-top: 4rem;
    }
    input {
      font-family: inherit;
      font-size: inherit;
      color: inherit;
      background-color: #f4f2f2;
      border: none;
      padding: 0.7rem 2rem;
      border-radius: 100px;
      width: 20%;
      transition: all 0.2s;
      margin-right: -3.25rem;
      margin-bottom: 2rem;
    }
    input:focus {
      outline: none;
      width: 25%;
      background-color: #f0eeee;
    }
  }
`;
export default ChooseNumQuiz;
