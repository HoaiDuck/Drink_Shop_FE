import React from "react"
import { Link } from "react-router-dom";  // Import Link từ react-router-dom
const BtnCreate = () =>{
    return (
        <Link to="/Product/">
          <button className="flex flex-row px-4 py-2 bg-gray-300 rounded-full font-medium hover:bg-gray-400">
              Add
              <span className="ml-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </span>
            </button>
        </Link>
    )
}
export default BtnCreate