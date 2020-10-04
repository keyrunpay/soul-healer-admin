import React from "react";
import { Modal, Input, Form } from "antd";
import { notifySuccess, notifyFromApiErrors } from "../../utils/notifiers";
import { execChangePassword } from "../../api/apis/settings";

export default function ChangePassword(props) {
  const [loading, setLoading] = React.useState(false);
  const [form] = Form.useForm();

  const onEdit = async (val) => {
    setLoading(true);
    try {
      const res = await execChangePassword(val);
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
        title="Change Password"
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
            label="Old Password"
            name="oldPassword"
            rules={[
              {
                required: true,
                message: "Old password is required",
              },
            ]}
          >
            <Input.Password placeholder="eg. abcde" />
          </Form.Item>
          <Form.Item
            className="full"
            label="New Password"
            name="newPassword"
            rules={[
              {
                required: true,
                message: "New password is required",
              },
            ]}
          >
            <Input.Password placeholder="eg. abcde" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
