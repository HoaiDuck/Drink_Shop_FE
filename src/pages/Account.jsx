import React from "react";
import { AntDesignOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
const Account = () => {
  return (
    <div className="relative w-screen h-screen flex flex-col bg-gray-100">
      <div className="flex-grow flex flex-col items-center justify-center">
        <Avatar
          className="w-24 h-24 rounded-full bg-gray-300"
          size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
          icon={<AntDesignOutlined />}
        />

        <h1 className="text-2xl font-bold mt-4">Duck</h1>
        <p className="text-sm text-gray-500">Thành viên VIP</p>

        <div className="flex gap-4 mt-6">
          <button className="px-4 py-2 bg-gray-200 rounded-lg shadow hover:bg-gray-300">
            Follower
          </button>
          <button className="px-4 py-2 bg-gray-200 rounded-lg shadow hover:bg-gray-300">
            Modify Account
          </button>
          <button className="px-4 py-2 bg-gray-200 rounded-lg shadow hover:bg-gray-300">
            Chia sẻ
          </button>
        </div>

        <div className="flex gap-8 mt-8 text-gray-600">
          <a href="#" className="underline">
            Work Space
          </a>
          <a href="#" className="underline">
            Personal Bag
          </a>
        </div>

        <div className="absolute top-20 right-4 bg-gray-200 px-4 py-2 rounded-lg shadow">
          <span>Coin:</span> <span className="font-bold">20000</span>
        </div>
      </div>
    </div>
  );
};

export default Account;
