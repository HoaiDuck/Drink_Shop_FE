
import React from "react"
import Logo from "../Logo/Index"

const Index = () =>{
    return (
        <nav className="flex flex-row items-center">
          <div className="flex items-center justify-center bg-gray-100">
           <Logo />
          </div>
          <ul className="flex space-x-4">
           <li className = "text-1xl"><a href="#">Trang chủ</a></li>
           <li><a href="#">Thể loại</a></li>
           <li><a href="#">Tạo</a></li>
           <li><a href="#">Đấu giá</a></li>
          </ul> 
          <div>
            <a href="#">Tìm kiếm</a>
          </div>
          <ul className="flex flex-row">
           <li>
             <svg 
               xmlns="http://www.w3.org/2000/svg" 
               fill="none" 
               viewBox="0 0 24 24" 
               stroke-width="1.5" 
               stroke="currentColor" 
               className="size-6"
 
               >
             <path 
               stroke-linecap="round" 
               stroke-linejoin="round" 
               d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
           </svg>
           </li>
           <li>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
           </li>
           <li>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>

           </li>
          </ul>
        </nav>
    )
}

export default Index