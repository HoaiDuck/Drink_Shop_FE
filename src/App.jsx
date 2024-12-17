import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "@/routes/index";
import ReactDOM from "react-dom";
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
