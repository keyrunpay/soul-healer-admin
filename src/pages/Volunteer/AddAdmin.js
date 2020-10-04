import React from "react";
import { Modal, Input, Form, Select } from "antd";
import { execAddAdmins, execAddVolunteer } from "../../api/apis/adminManagement";
import { notifySuccess, notifyFromApiErrors } from "../../utils/notifiers";

export default function AddAdmin(props) {
  const [loading, setLoading] = React.useState(false);
  const [form] = Form.useForm();

  const onEdit = async (val) => {
    setLoading(true);
    try {
      const res = await execAddVolunteer(val);
      setLoading(false);
      notifySuccess(res.message);
      props.onCancel(true);
    } catch (err) {
      setLoading(false);
      notifyFromApiErrors(err);
    }
  };

  return (
    <div>
      <Modal
        title="Add Volunteer"
        visible={props.visible}
        maskClosable={false}
        centered
        onCancel={() => {
          props.onCancel();
        }}
        onOk={() => {
          form.submit();
        }}
        okButtonProps={{ loading: loading }}
        cancelButtonProps={{}}
      >
        <Form form={form} onFinish={onEdit}>
          <Form.Item
            className="full"
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Name is required",
              },
            ]}
          >
            <Input placeholder="eg. John Doe" />
          </Form.Item>

          <Form.Item
            className="full"
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Email address must be valid",
              },
            ]}
          >
            <Input placeholder="eg. john@gmail.com" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
