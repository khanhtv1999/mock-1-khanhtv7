import "../src/assets/css/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/generalPage/landingPage/LandingPage";
import LoginPage from "./pages/generalPage/authenticationPage/LoginPage";
import RegisterPage from "./pages/generalPage/authenticationPage/RegisterPage";
import { ForgotPassword } from "../src/pages/generalPage/authenticationPage";
import ChooseNumQuiz from "./pages/generalPage/doQuizPage/ChooseNumQuiz";
import DoQuizPage from "./pages/generalPage/doQuizPage/DoQuizPage";
import SharedLayout from "./pages/adminPage/dashboard/ShareLayout";
import TableQuestions from "./components/TableQuestionComponent/TableQuestions";
import SearchContainer from "./components/SearchQuizComponent/SearchContainer";
import ShowResult from "./components/questions/ShowResultComponent/ShowResult";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="choose-number" element={<ChooseNumQuiz />} />
        <Route path="do-quiz" element={<DoQuizPage />} />
        <Route path="show-result" element={<ShowResult />} />
        <Route path="admin" element={<SharedLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
