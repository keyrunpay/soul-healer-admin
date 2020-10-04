import React from "react";
import { Input, Form, Button } from "antd";
import "./style.scss";
import { useDispatch } from "react-redux";
import { updateState } from "redux-helper-np";
import { execLogin } from "../../api/apis/auth";
import { notifyFromApiErrors } from "../../utils/notifiers";
import jwtDecode from "jwt-decode";
export default function Login() {
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();

  const doLogin = async (val) => {
    setLoading(true);
    try {
      const res = await execLogin(val);
      localStorage.setItem("admin_token", res.token);
      localStorage.setItem("admin_data", JSON.stringify(res));
      const name = jwtDecode(res.token).name;
      dispatch(
        updateState("system", {
          token: res.token,
          accessibleRoutes: res.accessibleRoutes,
          operations: res.operations,
          name,
        })
      );
    } catch (err) {
      notifyFromApiErrors(err);
      setLoading(false);
    }
  };

  return (
    <section id="login">
      <div className="login-controls">
        <div className="login-box animate__animated animate__fadeInDown">
          <header>
            <div className="title">Soul Healer</div>
          </header>
          <Form onFinish={doLogin}>
            <Form.Item
              name="username"
              label="Username"
              className="full"
              rules={[
                {
                  required: true,
                  message: "Username is required",
                },
              ]}
            >
              <Input placeholder="eg. john"></Input>
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              className="full"
              rules={[
                {
                  required: true,
                  message: "Password is required",
                },
                () => ({
                  validator(_, value) {
                    if (value && value.length > 4) {
                      return Promise.resolve();
                    }
                    return Promise.reject("Password must be of atleast 5 character");
                  },
                }),
              ]}
            >
              <Input.Password placeholder="eg. abcd1234"></Input.Password>
            </Form.Item>
            <br />
            <Button block htmlType="submit" type="primary" loading={loading}>
              Login
            </Button>
          </Form>
        </div>
      </div>
    </section>
  );
}
