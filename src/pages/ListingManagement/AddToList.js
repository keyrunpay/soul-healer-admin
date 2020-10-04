import React from "react";
import { Modal, Input, Form } from "antd";
import { notifySuccess, notifyFromApiErrors } from "../../utils/notifiers";
import { execAddToList } from "../../api/apis/listingManagement";

export default function AddToList(props) {
  const [loading, setLoading] = React.useState(false);
  const [form] = Form.useForm();

  const onEdit = async (val) => {
    setLoading(true);
    try {
      const res = await execAddToList(props.id, val);
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
        title="Add to list"
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
            name="item"
            rules={[
              {
                required: true,
                message: "Name is required",
              },
            ]}
          >
            <Input placeholder="eg. Smth" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
