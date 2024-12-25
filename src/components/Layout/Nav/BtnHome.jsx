import React from "react";
import { Link } from "react-router-dom";
const BtnHome = () => {
  return (
    <Link to="/">
      <button className="font-medium px-4 py-2 bg-gray-300 rounded-full hover:bg-gray-300 hover:text-black">
        Home
      </button>
    </Link>
  );
};
export default BtnHome;
