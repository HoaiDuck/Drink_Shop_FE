import React from 'react';
import { AiOutlineUser, AiOutlineLock } from 'react-icons/ai';
import { BsEye } from 'react-icons/bs';
import Logo from "../Logo/Index"
import LoginName from '../RegisterForm/LoginName';
import Password from '../RegisterForm/Password';

const LoginForm = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <div className="flex items-center justify-center mb-4">
          <Logo /> 
        </div>
        <h1 className="text-2xl font-bold text-center mb-6">WELCOME</h1>
        <div className="space-y-4">
          <LoginName/>
          <Password/>
        </div>
        <div className="flex justify-between text-sm text-gray-500 mt-4">
          <a href="#" className="hover:underline text-blue-500">Đăng kí</a>
          <a href="#" className="hover:underline">Quên mật khẩu</a>
        </div>
        <button className="w-full py-2 rounded-lg mt-6 text-white bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 shadow-md">
        Đăng nhập
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
