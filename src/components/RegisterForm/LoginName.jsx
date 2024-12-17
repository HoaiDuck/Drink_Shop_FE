import React from "react";
import { AiOutlineUser, AiOutlineLock, AiOutlineMail } from "react-icons/ai";
import PropTypes from "prop-types";
const LoginName = ({ label, value, onChange, onValidate, error }) => {
  return (
    <div className="flex items-center bg-gray-100 p-3 rounded-lg">
      <AiOutlineUser className="text-gray-500 mr-3" />
      <input
        type="text"
        value={value}
        placeholder="Tên đăng nhập"
        className={`bg-transparent outline-none w-full ${error ? "error" : ""}`}
        onChange={(e) => {
          onChange(e.target.value); // Gửi giá trị về parent
          onValidate(e.target.value);
        }}
      />
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};
LoginName.propTypes = {
  value: PropTypes.string.isRequired, // Xác định value là một chuỗi và bắt buộc phải có
  onChange: PropTypes.func.isRequired, // Xác định onChange là một hàm và bắt buộc phải có
  onValidate: PropTypes.func.isRequired, // Xác định value là một chuỗi và bắt buộc phải có
  error: PropTypes.string.isRequired,
};

export default LoginName;
