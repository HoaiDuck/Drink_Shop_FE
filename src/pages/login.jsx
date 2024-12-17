import React, { useState } from "react";
// import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";
// import { BsEye } from "react-icons/bs";

import { LoginName, Password } from "@/components/RegisterForm/index.js";
import { Logo } from "@/components/Logo";
import { BtnLogin } from "@/components/LoginForm";
import { useNavigate } from "react-router-dom";
const LoginForm = () => {
  const navigate = useNavigate();
  const handleClickLogin = () => {
    navigate("/register");
  };
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault(); // Ngăn chặn reload trang

    // Kiểm tra dữ liệu
    let validationErrors = {};
    if (!username.trim()) {
      validationErrors.username = "Username không được để trống.";
    }
    if (!password.trim()) {
      validationErrors.password = "Password không được để trống.";
    }

    // Cập nhật trạng thái lỗi nếu có
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Nếu không có lỗi
    alert("Đăng nhập thành công!");
    setErrors({});
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-screen flex items-center justify-center bg-gray-200"
    >
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <div className="flex items-center justify-center mb-4">
          <Logo />
        </div>
        <h1 className="text-2xl font-bold text-center mb-6">WELCOME</h1>
        <div className="space-y-4">
          <div>
            <LoginName
              label="Username:"
              value={username}
              onChange={setUsername}
              onValidate={(value) => handleSubmit("username", value)}
              error={errors.username}
            />
          </div>
          <div>
            <Password />
          </div>
        </div>
        <div className="flex justify-between text-sm text-gray-500 mt-4">
          <a
            onClick={handleClickLogin}
            href="#"
            className="hover:underline text-blue-500"
          >
            Đăng kí
          </a>
          <a href="#" className="hover:underline">
            Quên mật khẩu
          </a>
        </div>
        <BtnLogin />
      </div>
    </form>
  );
};

export default LoginForm;
