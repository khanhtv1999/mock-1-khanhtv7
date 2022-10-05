import { useNavigate } from "react-router";
const LandingPage = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };
  const handleRegister = () => {
    navigate("/login");
  };
  return (
    <div>
      <div className="container-landing">
        <h1 className="heading-primary">Knowledge is power</h1>
        <h3 className="description">You must be logged in to do the quiz</h3>
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
  );
};
export default LandingPage;
