import React from "react";
import { Tabs, Button } from "antd";
import "./style.scss";
import { RobotOutlined, PlusOutlined } from "@ant-design/icons";
import BotTriggers from "./BotTriggers";
import BotTriggerAdd from "./BotTriggerAdd";
import BotPending from "./BotPending";
function Chatbot() {
  const [showAdd, setShowAdd] = React.useState(false);
  const [botKey, setBotKey] = React.useState("abc");
  return (
    <div className="listing__management">
      <BotTriggerAdd
        visible={showAdd}
        onClose={(refresh = false) => {
          setShowAdd(false);
          if (refresh === true) {
            setBotKey("abc" + Math.random().toString());
          }
        }}
      />
      <header className="">
        <div className="flex jcsb">
          <h1 className="title">
            <RobotOutlined /> Chatbot
          </h1>
          <Button onClick={() => setShowAdd(true)} type="primary" shape="round" icon={<PlusOutlined />}>
            Add Trigger
          </Button>
        </div>
      </header>
      <main style={{ marginTop: 10 }}>
        <header>
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="Message Dictionary" key="1">
              <BotTriggers key={botKey} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Unanswered Messages" key="2">
              <BotPending
                onSuccess={() => {
                  setBotKey("abc" + Math.random().toString());
                }}
              />
            </Tabs.TabPane>
          </Tabs>
        </header>
      </main>
    </div>
  );
}

export default Chatbot;
