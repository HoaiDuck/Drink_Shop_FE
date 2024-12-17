import React from "react";
import { AiOutlineUser, AiOutlineLock, AiOutlineMail } from "react-icons/ai";
import PropTypes from "prop-types";
const LoginName = () => {
  return (
    <div className="flex items-center bg-gray-100 p-3 rounded-lg">
      <AiOutlineUser className="text-gray-500 mr-3" />
      <input
        type="text"
        value={value}
        placeholder="Tên đăng nhập"
        className={`bg-transparent outline-none w-full`}
        onChange={(e) => {
          onChange(e.target.value); // Gửi giá trị về parent
          onValidate(e.target.value);
        }}
      />
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default LoginName;
