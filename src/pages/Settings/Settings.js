import React from "react";
import { KeyOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useSelector } from "react-redux";
import ChangePassword from "./ChangePassword";

function Settings() {
  const system = useSelector((state) => state.system);
  const [showChange, setShowChange] = React.useState(false);

  return (
    <div className="setting__page">
      <ChangePassword visible={showChange} onCancel={() => setShowChange(false)} />

      <header className="flex jcsb ci">
        <h1 className="title">Settings</h1>
      </header>
      <br />
      <div className="card">
        <header className="flex jcsb ci">
          <h1 className="title">Your Details</h1>
        </header>
        <br />
        <main>
          <p>
            <b>Name:</b> {system.name}{" "}
          </p>
          <p>
            <b>Accessible Routes:</b> {system.accessibleRoutes}{" "}
          </p>
          <p>
            <b>Operations:</b> {system.operations}{" "}
          </p>
        </main>
      </div>
      <br />
      <main>
        <Button onClick={() => setShowChange(true)} type="primary" icon={<KeyOutlined />}>
          Change Password
        </Button>
      </main>
    </div>
  );
}

export default Settings;
