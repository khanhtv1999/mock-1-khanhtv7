import videoLandingPage from "../assets/pexels-c-technical-6334257.mp4";

const LandingPage = () => {
  return (
    <div>
      <div className="container-landing">
        <h1 className="heading-primary">Knowledge is power</h1>
        <h3 className="description">You must be logged in to do the quiz</h3>
      </div>
      <div className="container-btn">
        <button className="btn">LOGIN</button>
        <button className="btn">REGISTER</button>
      </div>

      <video autoPlay muted loop>
        <source src={videoLandingPage} type="video/mp4" />
      </video>
    </div>
  );
};
export default LandingPage;
