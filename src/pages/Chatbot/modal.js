import React from "react";
import { Button } from "antd";
import { EditOutlined } from "@ant-design/icons";

const salesDataModal = (setShowEdit) => {
  const onEdit = (row) => {
    setShowEdit(row);
  };

  return [
    {
      name: "Trigger",
      selector: "trigger",
      sortable: true,
    },
    {
      name: "Response",
      selector: "response",
      cell: (row) => <div>{row.response.join().substr(0, 50) + "..."}</div>,
      sortable: true,
    },
    {
      name: "Actions",
      selector: "action",
      center: true,
      cell: (row) => (
        <div>
          <Button type="primary" onClick={() => onEdit(row)} icon={<EditOutlined />} shape="circle" />
        </div>
      ),
      sortable: true,
    },
  ];
};

export default salesDataModal;
