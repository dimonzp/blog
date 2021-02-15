import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useErrorMessage } from "../../hooks/useErrorMessage";

const Auth = ({ onHandlerSubmit, error }) => {

  const getErrorMessage = useErrorMessage(error, "Unauthorized")

  const onFinish = ({ email, password }) => {
    getErrorMessage();
    onHandlerSubmit(email, password);
  };
  useEffect(() => {
    getErrorMessage();
  }, [getErrorMessage]);

  return (
    <>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
            {
              max: 50,
              message: "Max length 50 symbols",
            },
            {
              type: "email",
              message: "Incorrect Email!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input min 6 symbols!",
              min: 6,
            },
            {
              max: 50,
              message: "Max length 50 symbols",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          <span style={{ paddingLeft: "10px", paddingRight: "10px" }}>Or</span>
          <Link to="/registrate">register now!</Link>
        </Form.Item>
      </Form>
    </>
  );
};

export default Auth;
