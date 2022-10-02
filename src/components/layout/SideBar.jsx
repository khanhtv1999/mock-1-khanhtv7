import styled from "styled-components";
import { useSelector } from "react-redux";
import NavLinks from "./NavLinks";

const Sidebar = () => {
  const { isSidebarOpen } = useSelector((store) => store.user);

  return (
    <Wrapper>
      <div
        className={
          isSidebarOpen
            ? "sidebar-container "
            : "sidebar-container show-sidebar"
        }
      >
        <div className="content">
          <header>HI ADMIN</header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.aside`
  display: none;
  @media (min-width: 992px) {
    background-color: red;
    display: block;
    box-shadow: 1px 0px 0px 0px rgba(0, 0, 0, 0.1);
    .sidebar-container {
      background: #fff;
      min-height: 100vh;
      height: 100%;
      width: 250px;
      margin-left: -250px;
      transition: 0.3s ease-in-out all;
    }
    .content {
      position: sticky;
      top: 0;
    }
    .show-sidebar {
      margin-left: 0;
    }
    header {
      height: 6rem;
      display: flex;
      align-items: center;
      padding-left: 2.5rem;
    }
    .nav-links {
      padding-top: 2rem;
      display: flex;
      flex-direction: column;
    }
    .nav-link {
      display: flex;
      align-items: center;
      color: #627d98;
      padding: 1rem 0;
      padding-left: 2.5rem;
      text-transform: capitalize;
      transition: 0.3s ease-in-out all;
    }
    .nav-link:hover {
      background: #627d98;
      padding-left: 3rem;
      color: #102a43;
    }
    .nav-link:hover .icon {
      color: #3b82f6;
    }
    .icon {
      font-size: 1.5rem;
      margin-right: 1rem;
      display: grid;
      place-items: center;
      transition: 0.3s ease-in-out all;
    }
    .active {
      color: #102a43;
    }
    .active .icon {
      color: #3b82f6;
    }
  }
`;
export default Sidebar;
