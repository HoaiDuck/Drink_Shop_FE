import React from "react";
import Logo from "../Logo/Index";
import BtnAccount from "./Nav/BtnAccount";
import BtnMenu from "./Nav/BtnMenu";
import BtnHome from "./Nav/BtnHome";
import BtnCreate from "./Nav/BtnCreate";
import { Link, Outlet } from "react-router-dom";
const Navbar = () => {
  return (
    <div>
      <nav className="flex items-center justify-between bg-gray-100 p-3 rounded-lg shadow-md sticky top-0 z-50">
        <div className=" flex flex-row">
          <Logo />
          <div className="flex items-center space-x-4 px-5">
            <BtnHome />
            <button className="flex flex-row px-4 py-2 bg-gray-300 rounded-full font-medium hover:bg-gray-400">
              Thể loại
              <span className="ml-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </span>
            </button>
            <BtnCreate/>
            <button className="flex flex-row px-4 py-2 bg-gray-300 rounded-full font-medium hover:bg-gray-400">
              Đấu giá
              <span className="ml-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative w-80">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Tìm kiếm"
              className="px-10 py-2 bg-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>
          <button className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
                />
              </svg>
            </span>
            <span className="sr-only">Tạo mới</span>
          </button>
          <BtnAccount />
          <BtnMenu />
        </div>
      </nav>
      <Outlet />
    </div>
  );
};
export default Navbar;
