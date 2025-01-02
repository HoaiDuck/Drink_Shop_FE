import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, message, Select } from "antd";
import { AiOutlineMail, AiOutlineLock, AiOutlineUser } from "react-icons/ai";
import { Logo } from "@/components/Logo";
import { loginApi } from "@/service";
// import "./register.css"; // Tạo file CSS tương tự như login.css nếu cần

const { Option } = Select;

const Register = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values) => {
    if (values.password !== values.confirmPassword) {
      messageApi.open({
        type: "error",
        content: "Passwords do not match!",
        duration: 2,
      });
      return;
    }

    try {
      const res = await loginApi.register({
        username: values.username,
        email: values.email,
        password: values.password,
        roleId: values.role,
      });

      if (res.status === 200) {
        messageApi.open({
          type: "success",
          content: "Registration successful!",
          duration: 2,
        });
        navigate("/login");
      } else {
        const errorData = await res.json();
        messageApi.open({
          type: "error",
          content: errorData.message || "Register Failed!",
          duration: 2,
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
      messageApi.open({
        type: "error",
        content: "An error occurred during registration!",
        duration: 2,
      });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    messageApi.open({
      type: "error",
      content: "Please fill in all required fields!",
      duration: 2,
    });
  };

  return (
    <Form
      className="w-full h-screen flex items-center justify-center bg-gray-200"
      name="register"
      labelCol={{
        span: 10,
      }}
      wrapperCol={{
        span: 1000,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <div className="flex items-center justify-center mb-4">
          <Logo />
        </div>
        <h1 className="text-2xl font-bold text-center mb-6">SIGN UP</h1>
        <div className="flex flex-col">
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
              {
                min: 3,
                message: "Username must be at least 3 characters!",
              },
            ]}
          >
            <Input prefix={<AiOutlineUser />} />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
              {
                type: "email",
                message: "Please enter a valid email!",
              },
            ]}
          >
            <Input prefix={<AiOutlineMail />} />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
              {
                min: 6,
                message: "Password must be at least 6 characters!",
              },
            ]}
          >
            <Input.Password prefix={<AiOutlineLock />} />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("The two passwords do not match!");
                },
              }),
            ]}
          >
            <Input.Password prefix={<AiOutlineLock />} />
          </Form.Item>

          <Form.Item
            label="Role"
            name="role"
            rules={[
              {
                required: true,
                message: "Please select a role!",
              },
            ]}
          >
            <Select placeholder="Select a role">
              <Option value={3}>Normal</Option>
              <Option value={2}>Artist</Option>
            </Select>
          </Form.Item>

          <div id="submitContainer" className="flex flex-col">
            <div id="buttonSubmitRegister">
              <Form.Item label={null} className="">
                {contextHolder}
                <Button
                  className="flex-wrap w-full py-2 rounded-lg mt-6 text-white bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 shadow-md"
                  type="primary"
                  htmlType="submit"
                >
                  Register
                </Button>
              </Form.Item>
            </div>
          </div>
        </div>

        <div className="flex justify-between text-sm text-gray-500 mt-4">
          <span>
            Already have an account?{" "}
            <a href="/login" className="hover:underline text-blue-500">
              Sign In
            </a>
          </span>
        </div>
      </div>
    </Form>
  );
};

export default Register;
