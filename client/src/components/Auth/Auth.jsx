import React from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const Auth = (props) => {

  const { onHandlerSubmit } = props;

  const onFinish = ({ email, password }) => {
    onHandlerSubmit( email, password)
  };

  return (
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
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        <span style={{ paddingLeft: "10px", paddingRight: "10px" }}>Or</span>
        <Link to="/registrate">register now!</Link>
      </Form.Item>
    </Form>
    // <div>
    //   <form
    //     onSubmit={(e) => {
    //       e.preventDefault();
    //       onHandlerSubmit(email, password);
    //     }}
    //   >
    //     <div>
    //       <label>Email</label>
    //       <div>
    //         <input
    //           placeholder="Email"
    //           type="email"
    //           onChange={(e) => {
    //             setEmail(e.target.value);
    //           }}
    //         />
    //       </div>
    //     </div>
    //     <div>
    //       <label>Password</label>
    //       <div>
    //         <input
    //           placeholder="Password"
    //           type="password"
    //           onChange={(e) => {
    //             setPassword(e.target.value);
    //           }}
    //         />
    //       </div>
    //     </div>
    //     <div>
    //       <Link to={"/registrate"}>No account yet?</Link>
    //     </div>
    //     <div>
    //       <button>Login</button>
    //     </div>
    //   </form>
    // </div>
  );
};

export default Auth;
