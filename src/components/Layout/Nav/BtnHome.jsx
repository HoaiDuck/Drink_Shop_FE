import React from "react";
import { Link } from "react-router-dom";
const BtnHome = () => {
  return (
    <Link to="/">
      <button className="flex flex-row px-4 py-2 bg-gray-300 rounded-full font-medium hover:bg-gray-400">
        Home
      </button>
    </Link>
  );
};
export default BtnHome;
