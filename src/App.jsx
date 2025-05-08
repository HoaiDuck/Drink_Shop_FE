import { RouterProvider } from "react-router-dom";
import router from "@/routes";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import React from "react";
// import { ability, defineAbilitiesFor } from "@/ability";

const App = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  // useEffect(() => {
  //   const initApp = async () => {
  //     const accessToken = localStorage.getItem("access_token");
  //     console.log(">>>CHECK ACCTOKEN At APP:", accessToken);
  //     if (accessToken) {
  //       await fetchUserInfor();
  //     }
  //     setIsInitialized(true);
  //   };
  //   initApp();
  // }, []);

  // if (!isInitialized) return null;

  return <RouterProvider router={router} />;
};

export default App;
