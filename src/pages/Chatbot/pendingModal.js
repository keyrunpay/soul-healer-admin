import { PlusOutlined } from "@ant-design/icons";
import React from "react";
import { Button } from "antd";

const pendingModal = (onShowAdd) => {
  const onAdd = (trigger) => {
    onShowAdd(trigger);
  };

  return [
    {
      name: "Trigger",
      selector: "trigger",
      sortable: true,
    },
    {
      name: "Actions",
      selector: "action",
      center: true,
      cell: (row) => (
        <div>
          <Button type="primary" onClick={() => onAdd(row)} icon={<PlusOutlined />} shape="circle" />
        </div>
      ),
    },
  ];
};

export default pendingModal;
