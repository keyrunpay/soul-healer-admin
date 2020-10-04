import React from "react";
import { Button } from "antd";
import { LogoutOutlined, MenuOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { updateState } from "redux-helper-np";

function NavBar(props) {
  const dispatch = useDispatch();

  const onLogout = () => {
    localStorage.removeItem("admin_data");
    localStorage.removeItem("admin_token");
    dispatch(updateState("system", { token: null }));
  };

  return (
    <div className="navbar">
      <div className="wrap">
        <div className="flex jcsb ci">
          <aside className="left flex ci">
            {props.showMenu && (
              <span style={{ marginRight: 10, cursor: "pointer" }} onClick={props.showSidebar}>
                <MenuOutlined />
              </span>
            )}
            <h1>Soul Healer</h1>
          </aside>
          <div className="right">
            <Button onClick={onLogout} type="primary" shape="round" icon={<LogoutOutlined />}>
              Log Out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
