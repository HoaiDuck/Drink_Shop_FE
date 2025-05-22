import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App.jsx"; // Import component chính
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StrictMode } from "react";
// import { MaterialTailwindControllerProvider } from "@/context/";
import { AuthProvider, CartProvider } from "@/context";
ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <App />
        <ToastContainer
          style={{ marginTop: "50px" }} // Điều chỉnh khoảng cách từ trên
          autoClose={1000} // Thời gian hiển thị của toast là 2 giây
        />
      </CartProvider>
    </AuthProvider>
  </StrictMode>
);
