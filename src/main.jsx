import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App.jsx"; // Import component chính
import "./index.css";
import { MaterialTailwindControllerProvider } from "@/context";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MaterialTailwindControllerProvider>
      <App />
    </MaterialTailwindControllerProvider>
  </React.StrictMode>
);
