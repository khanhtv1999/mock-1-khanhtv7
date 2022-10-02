import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/generalPage/LandingPage";
import LoginPage from "./pages/generalPage/LoginPage";
import RegisterPage from "./pages/generalPage/RegisterPage";
import ForgotPassword from "./pages/generalPage/ForgotPassword";
import ChooseNumQuiz from "./pages/generalPage/ChooseNumQuiz";
import DoQuizPage from "./pages/generalPage/DoQuizPage";
import SharedLayout from "./pages/adminPage/shareLayout";

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
        <Route path="sidebar" element={<SharedLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
