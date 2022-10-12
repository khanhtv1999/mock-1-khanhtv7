import "../src/assets/css/App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/generalPage/landingPage/LandingPage";
import LoginPage from "./pages/generalPage/authenticationPage/LoginPage";
import RegisterPage from "./pages/generalPage/authenticationPage/RegisterPage";
import { ForgotPassword } from "../src/pages/generalPage/authenticationPage";
import ChooseNumQuiz from "./pages/generalPage/doQuizPage/ChooseNumQuiz";
import DoQuizPage from "./pages/generalPage/doQuizPage/DoQuizPage";
import SharedLayout from "./pages/adminPage/dashboard/ShareLayout";
import { ShowResult } from "./pages/generalPage/ShowResultComponent";
import ViewAllQuestions from "./pages/adminPage/dashboard/ViewAllQuestions";
import ViewAllUsers from "./pages/adminPage/dashboard/ViewAllUsers";
import AddUser from "./pages/adminPage/dashboard/AddUser";
import AddQuestion from "./pages/adminPage/dashboard/AddQuestion";
import ProtectedRoute from "./utils/router/ProtectedRouter";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<ViewAllQuestions />} />
          <Route path="list-users" element={<ViewAllUsers />} />
          <Route path="add-user" element={<AddUser />} />
          <Route path="add-question" element={<AddQuestion />} />
        </Route>
        <Route path="landing" element={<LandingPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="choose-number" element={<ChooseNumQuiz />} />
        <Route path="do-quiz" element={<DoQuizPage />} />
        <Route path="show-result" element={<ShowResult />} />
        <Route path="admin" element={<SharedLayout />} />
      </Routes>
      <ToastContainer position="top-center" />
    </BrowserRouter>
  );
}

export default App;
