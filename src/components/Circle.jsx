import styled from "styled-components";
const Circle = () => {
  const arrQuiz = [1, 2, 3, 4, 5, 6];
  return (
    <Wrapper>
      {arrQuiz.map((item) => (
        <div>{item}</div>
      ))}
    </Wrapper>
  );
};
const Wrapper = styled.section`
  display: flex;
  gap: 20px;
  margin-top: 3rem;
  margin-left: 3rem;
  div {
    display: flex;
    border-radius: 50%;
    border: 1px solid #368add;
    height: 40px;
    width: 40px;
    align-items: center;
    justify-content: center;
  }
`;
export default Circle;
