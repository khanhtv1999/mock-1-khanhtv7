import styled from "styled-components";
import { useSelector } from "react-redux";
import NavLinks from "../NavlinkComponent/NavLinks";

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
  background: #102a43;

  @media (min-width: 992px) {
    display: block;
    box-shadow: 1px 0px 0px 0px rgba(0, 0, 0, 0.1);
    color: #fff;

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
      height: 6.4rem;
      display: flex;
      align-items: center;
      justify-content: center;
      padding-left: 1rem;
      background-color: #1976d2 !important;
      padding-bottom: 1px;
      box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%),
        0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
      color: #fff;
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
      padding: 2rem 0;
      padding-left: 2.5rem;
      text-transform: capitalize;
      transition: 0.3s ease-in-out all;
    }
    .nav-link:hover {
      background: #f0f4f8;
      padding-left: 3rem;
      color: #102a43;
    }
    .nav-link:hover .icon {
      color: #3b82f6;
      font-size: 2.25rem;
    }
    .icon {
      font-size: 1.75rem;
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
