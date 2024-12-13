import React from "react";
import { Logo } from "@/components/Logo";
import {
  Email,
  LoginName,
  Password,
  AgainPassword,
  BtnRegister,
} from "@/components/RegisterForm";
const Register = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <div className="flex items-center justify-center mb-4">
          <Logo />
        </div>
        <h1 className="text-2xl font-bold text-center mb-6">ĐĂNG KÝ</h1>
        <div className="space-y-4">
          <LoginName />
          <Email />
          <Password />
          <AgainPassword />
        </div>
        <div className="flex justify-between text-sm text-gray-500 mt-4">
          <a href="#" className="hover:underline">
            Đã có tài khoản? Đăng nhập
          </a>
        </div>
        <BtnRegister />
      </div>
    </div>
  );
};
export default Register;
