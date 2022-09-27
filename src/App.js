import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPassword from "./pages/ForgotPassword";
import ChooseNumQuiz from "./pages/ChooseNumQuiz";
import DoQuizPage from "./pages/DoQuizPage";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
