import React from "react";
import moment from "moment";
import { Button } from "antd";
import { DeleteOutlined, ExclamationCircleOutlined, UndoOutlined } from "@ant-design/icons";
import { notifySuccess, notifyFromApiErrors } from "../../utils/notifiers";
import { execDeleteVolunteer } from "../../api/apis/adminManagement";
import { Modal } from "antd";

const adminDataModal = (onSuccess) => {
  const onDelete = (id) => {
    Modal.confirm({
      title: "Are you sure?",
      content: "you want to remove this volunteer",
      icon: <ExclamationCircleOutlined />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          const res = await execDeleteVolunteer(id);
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
      selector: "name",
      sortable: true,
      cell: (row) => (
        <div className="flex jcsb ci">
          <img src={row.image} style={{ width: 32, height: 32, borderRadius: 32, marginRight: 5 }} alt="" />
          <div>{row.name}</div>
        </div>
      ),
    },
    {
      name: "Email",
      selector: "email",
      sortable: true,
    },
    {
      name: "Gender",
      selector: "gender",
      sortable: true,
      hide: "md",
    },
    {
      name: "Created At",
      selector: "createdAt",
      hide: "md",
      cell: (row) => <span>{moment(row.created_at).format("Do MMM hh:mm A")}</span>,
      sortable: true,
    },
    {
      name: "Actions",
      selector: "actions",
      center: true,
      cell: (row) => (
        <div>
          <Button type="danger" onClick={() => onDelete(row._id)} shape="circle" icon={<DeleteOutlined />}></Button>
        </div>
      ),
    },
  ];
};

export default adminDataModal;
