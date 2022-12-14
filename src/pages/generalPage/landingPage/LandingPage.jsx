import styled from "styled-components";
import { useNavigate } from "react-router";
import backgrLanding from "../../../assets/images/backgrLanding.jpg";
const LandingPage = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };
  const handleRegister = () => {
    navigate("/register");
  };
  return (
    <Wrapper>
      <div>
        <div className="container-landing">
          <h1 className="heading-primary">Knowledge is power</h1>
          <h3 className="description">
            In this site you can take quizzes,
            <br /> which is the best way to recall what you have learned. The
            site has many modern features,
            <br /> happy to help you
          </h3>
        </div>
        <div className="container-btn">
          <button onClick={handleLogin} className="btn">
            LOGIN
          </button>
          <button onClick={handleRegister} className="btn">
            REGISTER
          </button>
        </div>
      </div>
    </Wrapper>
  );
};
export default LandingPage;
const Wrapper = styled.section`
  background-image: linear-gradient(
      to right bottom,
      rgba(31, 33, 34, 0.8),
      rgba(16, 33, 44, 0.7)
    ),
    url(${backgrLanding});
  background-size: cover;
  background-position: top;
  position: relative;
  height: 100vh;
  width: 100vw;

  .container-landing {
    position: absolute;
    margin-top: 25vh;
    left: 25%;
  }
  h1 {
    font-size: 6rem;
    color: #fff;
  }
  h3 {
    color: #edf4f8;
  }
  .container-btn {
    .btn {
      background-color: #ff951f;
      color: #f9fafa;
      width: 15rem;
      height: 5rem;
      margin-right: 5rem;
      font-size: 2rem;
      border: none;
      border-radius: 0.5rem;
      margin-top: 25rem;
    }
    .btn:hover {
      background-color: #fff;
      color: #000;
    }
  }
`;
