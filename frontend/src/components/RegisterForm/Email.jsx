import React from 'react';
import { AiOutlineUser, AiOutlineLock, AiOutlineMail } from 'react-icons/ai';

const Email = () => {
    return(
        <div className="flex items-center bg-gray-100 p-3 rounded-lg">
            <AiOutlineMail className="text-gray-500 mr-3" />
            <input
              type="email"
              placeholder="Email"
              className="bg-transparent outline-none w-full"
            />
          </div>
    );
};
export default Email