import React from "react";
import logo from "../../../images/logo.png";
import {
  PieChartOutlined,
  HomeOutlined,
  CrownOutlined,
  UsergroupAddOutlined,
  FileProtectOutlined,
  SettingOutlined,
  DollarOutlined,
  CommentOutlined,
  RobotOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";

function SideBar({ closeSidebar }) {
  return (
    <div className="sidebar">
      <header>
        <img className="sidebar__logo" src={logo} alt="" />
      </header>
      <main>
        <SideBarItem onClick={closeSidebar} icon={<HomeOutlined />} title="Home" goto="/" />
        <SideBarItem onClick={closeSidebar} icon={<FileProtectOutlined />} title="Volunteer" goto="/volunteer" />
        {/* <SideBarItem onClick={closeSidebar} icon={<CommentOutlined />} title="Messages" goto="/messages" /> */}
        <SideBarItem onClick={closeSidebar} icon={<RobotOutlined />} title="Chat Bot" goto="/bot" />
      </main>
    </div>
  );
}

const SideBarItem = ({ icon, title, goto, onClick }) => {
  return (
    <NavLink onClick={onClick && onClick} to={goto} exact activeClassName="active" className="sidebar__item">
      <div className="flex ci">
        <i>{icon}</i>
        <h2 className="sidebar__title">{title}</h2>
      </div>
    </NavLink>
  );
};

export default SideBar;
