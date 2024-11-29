import React from 'react';
import { AiOutlineUser, AiOutlineLock, AiOutlineMail } from 'react-icons/ai';

const AgainPassword = () => {
    return(
        <div className="flex items-center bg-gray-100 p-3 rounded-lg">
            <AiOutlineLock className="text-gray-500 mr-3" />
            <input
              type="password"
              placeholder="Nhập lại mật khẩu"
              className="bg-transparent outline-none w-full"
            />
          </div>
    );
};
export default AgainPassword