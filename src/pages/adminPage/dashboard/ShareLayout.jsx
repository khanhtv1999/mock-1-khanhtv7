import styled from "styled-components";
import { Outlet } from "react-router-dom";
import Sidebar from "../../../components/SidebarComponent/SideBar";
import Header from "../../../components/HeaderComponent/Header";
import TableQuestion from "../../../components/TableQuestionComponent/TableQuestions";
import ButtonPage from "../../../components/PaginationComponent/Pagination";
import AddQuestion from "./AddQuestion";
import ModalUpdateQuiz from "../../../components/ModalComponents/ModalUpdateQuiz";

const SharedLayout = () => {
  return (
    <Wrapper>
      <main className="dashboard">
        <Sidebar />
        <div>
          <Header />
          <div className="dashboard-page">
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  /* top: 0;
  bottom: 0;
  position: fixed;
  overflow-y: auto;
  overflow-x: hidden; */
  .dashboard {
    font-size: 1.5rem;
    display: grid;
    grid-template-columns: 1fr;
    background-color: #f0f4f8;
  }
  .dashboard-page {
    width: 90vw;
    margin: 0 auto;
    padding: 2rem 0;
  }
  @media (min-width: 992px) {
    .dashboard {
      grid-template-columns: auto 1fr;
    }
    .dashboard-page {
      width: 90%;
    }
  }
`;
export default SharedLayout;
