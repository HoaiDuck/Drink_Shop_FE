import React from "react";

import { Outlet } from "react-router-dom";
const RequestManage = () => {
  return (
    <>
      <div className="bg-[#f5f5f5] flex flex-col items-center">
        <div className="bg-[url('/img/BackgroundRequest.png')] h-[20vh] w-full flex justify-between items-center">
          <div className="flex-1 text-center">
            <span className="text-xl font-bold"></span>
          </div>
          <div className="bg-[url('/img/bannerRequest.png')] bg-contain h-full flex-1 text-center flex items-center justify-center">
            <img
              src="/img/TextRequest.png"
              alt="Request"
              className="h-[25%] w-auto" // Chiều cao 1/4 phần tử cha, chiều rộng tự động
            />
          </div>
          <div className="flex-1 text-center"></div>
        </div>
        <Outlet></Outlet>
      </div>
    </>
  );
};

export default RequestManage;
