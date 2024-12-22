import React, { useEffect, useState } from "react";
// import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";
// import { BsEye } from "react-icons/bs";
import { AiOutlineUser, AiOutlineLock, AiOutlineMail } from "react-icons/ai";
import { Logo } from "@/components/Logo";
import { useNavigate } from "react-router-dom";

import { Button, Checkbox, Form, Input, message, notification } from "antd";
// >>>>>>> e4e6c0421aefcd3d6d4651b4b29c72a725d28a41
import { loginApi } from "@/service";

import "./login.css";

const LoginForm = () => {
  const navigate = useNavigate();
  const handleClickLogin = () => {
    navigate("/register");
  };
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [messageApi, contextHolder] = message.useMessage();
  const onFinish = async (values) => {
    const res = await loginApi.login({
      email: values.email,
      password: values.password,
    });
    console.log(">>>>>CHECK RESPONSE:", res.data);
    if (res && res.data.EC == 0) {
      localStorage.setItem("access_token", res.access_token);
      messageApi.success("Login Success!");
      console.log("LOGIN SUCCESS!!!");
      navigate("/");
    } else {
      messageApi.error("Login Failed!");
      message.error("LOGIN FAILED!!!", res?.data ?? "Unknown Error!!");
    }
  };
  const onFinishFailed = (errorInfo) => {
    messageApi.destroy("Login Failed!");
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      className="w-full h-screen flex items-center justify-center bg-gray-200"
      name="basic"
      labelCol={{
        span: 6,
      }}
      wrapperCol={{
        span: 16,
      }}
      // style={{
      //   maxWidth: 600,
      // }}
      // initialValues={{
      //   remember: true,
      // }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <div className="flex items-center justify-center mb-4">
          <Logo />
        </div>
        <h1 className="text-2xl font-bold text-center mb-6">WELCOME</h1>
        <div className="flex flex-col">
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </Form.Item>

          <Form.Item
            label="Password "
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </Form.Item>
          <div id="submitContainer" className="flex flex-col">
            <Form.Item
              name="remember"
              valuePropName="checked"
              label={null}
              className="m-0"
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <div id="buttonSubmitLogin">
              <Form.Item label={null} className="">
                {contextHolder}
                <Button
                  className="flex-wrap w-full py-2 rounded-lg mt-6 text-white bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 shadow-md"
                  type="primary"
                  htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </div>
          </div>
        </div>

        <div className="flex justify-between text-sm text-gray-500 mt-4">
          <span>
            Don`t have an account?{" "}
            <a
              onClick={handleClickLogin}
              href="#"
              className="hover:underline text-blue-500"
            >
              Sign Up
            </a>
          </span>

          <a href="#" className="hover:underline">
            Forget password?
          </a>
        </div>
      </div>
    </Form>
  );
};

export default LoginForm;
