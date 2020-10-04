import React from "react";
import { execDeleteFromList } from "../../api/apis/listingManagement";
import { ExclamationCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import { notifySuccess, notifyFromApiErrors } from "../../utils/notifiers";
import { Button, Modal } from "antd";

const listingDataModal = (id, onSuccess) => {
  const onDelete = (val) => {
    Modal.confirm({
      title: "Are you sure?",
      content: "you want to delete this list item",
      icon: <ExclamationCircleOutlined />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          const res = await execDeleteFromList(id, { item: val });
          onSuccess();
          notifySuccess(res.message);
        } catch (err) {
          notifyFromApiErrors(err);
        }
      },
    });
  };

  return [
    {
      name: "Name",
      sortable: false,
      cell: (row) => (
        <div>
          <div>{row}</div>
        </div>
      ),
    },
    {
      name: "Actions",
      selector: "actions",
      center: true,
      cell: (row) => (
        <div>
          <Button type="danger" onClick={() => onDelete(row)} shape="circle" icon={<DeleteOutlined />}></Button>
        </div>
      ),
    },
  ];
};

export default listingDataModal;
