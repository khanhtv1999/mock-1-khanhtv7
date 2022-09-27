import styled from "styled-components";
import Circle from "../components/Circle";

const DoQuizPage = () => {
  return (
    <Wrapper>
      <div className="right-content">Right-content</div>
      <div className="left-content">
        <Circle />
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  display: grid;
  grid-template-columns: 70vw 30vw;
  grid-template-rows: 100vh;

  .right-content {
    border-right: 1px solid #000;
  }
  .left-content {
  }
`;
export default DoQuizPage;
