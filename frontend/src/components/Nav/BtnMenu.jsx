import React from "react"
import { Link } from "react-router-dom";  // Import Link từ react-router-dom
const BtnMenu = () =>{
    return (
        <button className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          <span className="sr-only">Menu</span>
        </button>
    )
}
export default BtnMenu