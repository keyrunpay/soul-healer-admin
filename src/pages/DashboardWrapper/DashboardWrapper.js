import React from "react";
import SideBar from "./components/SideBar";
import NavBar from "./components/NavBar";
import MainRoutes from "./components/MainRoutes";
import "./style.scss";
import { useMediaQuery } from "react-responsive";

function DashboardWrapper() {
  const [showSidebar, setShowSidebar] = React.useState(false);
  const isTabletOrMobile = useMediaQuery({ maxWidth: 767 });

  console.log(isTabletOrMobile);
  return (
    <div className="dashboard__wrapper">
      <div className="dashboard__wrapper__grid">
        {(showSidebar || !isTabletOrMobile) && (
          <aside className="pos__left animate__animated animate__slideInLeft">
            <SideBar closeSidebar={() => setShowSidebar(false)} />
            <div
              onClick={() => {
                if (isTabletOrMobile) setShowSidebar(false);
              }}
              className="overlay"
            ></div>
          </aside>
        )}
        <aside className="pos__right">
          <NavBar showMenu={isTabletOrMobile} showSidebar={() => setShowSidebar(true)} />
          <MainRoutes />
        </aside>
      </div>
    </div>
  );
}

export default DashboardWrapper;
