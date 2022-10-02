import CircularProgress from "@mui/material/CircularProgress";
import styled from "styled-components";
const Loading = () => {
  return (
    <Wrapper>
      <div className="container-loading">
        <CircularProgress />
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #000 !important;

  .container-loading {
    position: fixed;
    top: 50%;
    left: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
export default Loading;
