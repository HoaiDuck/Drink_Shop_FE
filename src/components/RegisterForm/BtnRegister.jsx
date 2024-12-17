import React from "react";
import { AiOutlineUser, AiOutlineLock, AiOutlineMail } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const BtnRegister = () => {
  const navigate = useNavigate();
  const handleClickLogin = () => {
    navigate("/");
  };
  return (
    <button
      onClick={handleClickLogin}
      className="w-full py-2 rounded-lg mt-6 text-white bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 shadow-md"
    >
      Đăng kí
    </button>
  );
};
export default BtnRegister;
