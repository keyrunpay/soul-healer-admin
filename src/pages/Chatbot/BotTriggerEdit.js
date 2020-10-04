import React from "react";
import { Drawer, Form, Input, Button } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { execEditBotTrigger } from "../../api/apis/adminManagement";
import { notifySuccess, notifyError } from "../../utils/notifiers";

export default function BotTriggerEdit(props) {
  const { onClose, visible, payload } = props;
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);

  const onOk = async (val) => {
    const trigger = val.trigger;
    const response = val.response.split("\n");
    setLoading(true);
    try {
      const res = await execEditBotTrigger({ id: payload._id, trigger, response });
      notifySuccess(res.message);
      form.resetFields();
      onClose(true);
      setLoading(false);
    } catch (err) {
      notifyError(err.message);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (payload) {
      form.setFieldsValue({ trigger: payload.trigger || "" });
      const response = payload.response;
      if (response) {
        form.setFieldsValue({ response: response.join("\n") });
      }
    }
    console.log(payload);
  }, [payload]);

  return (
    <Drawer title="Edit Bot Trigger" placement="right" width="75%" closable onClose={onClose} visible={visible}>
      <Form form={form} onFinish={onOk}>
        <Form.Item className="full" label="Trigger Keyword" name="trigger">
          <Input placeholder="eg. hello hi how are you" />
        </Form.Item>
        <Form.Item className="full" label="Response (enter for new-line)" name="response">
          <TextArea rows="10" placeholder="Response here" />
        </Form.Item>
        <br />
        <Button type="primary" htmlType="submit">
          Edit Trigger
        </Button>
      </Form>
    </Drawer>
  );
}
