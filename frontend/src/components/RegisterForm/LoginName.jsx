import React from 'react';
import { AiOutlineUser, AiOutlineLock, AiOutlineMail } from 'react-icons/ai';
const LoginName = () => {
    return(
        <div className="flex items-center bg-gray-100 p-3 rounded-lg">
            <AiOutlineUser className="text-gray-500 mr-3" />
            <input
              type="text"
              placeholder="Tên đăng nhập"
              className="bg-transparent outline-none w-full"
            />
          </div>
    );
};
export default LoginName