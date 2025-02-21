import { RouterProvider } from "react-router-dom";
import router from "@/routes/index";
import { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import React from "react";
import { ability, defineAbilitiesFor } from "@/ability";
import { AuthContext } from "@/context/AuthContext";
import { accountApi } from "@/service";

const App = () => {
  const { user, setUser, fetchUserInfor } = useContext(AuthContext);
  const [isInitialized, setIsInitialized] = useState(false);
  useEffect(() => {
    const initApp = async () => {
      const accessToken = localStorage.getItem("access_token");
      console.log(">>>CHECK ACCTOKEN At APP:", accessToken);
      if (accessToken) {
        await fetchUserInfor();
      }
      setIsInitialized(true);
    };
    initApp();
  }, []); // Chỉ chạy 1 lần khi mount
  useEffect(() => {
    const roleNumber = Number(user.userRole); // Đảm bảo role là number
    const permissions = defineAbilitiesFor(roleNumber);
    ability.update(permissions); // Cập nhật Ability
    console.log("Updated abilities:", permissions);
  }, [user]);

  if (!isInitialized) return null; // Đợi khởi tạo xong

  // Cập nhật Ability khi dữ liệu user đã sẵn sàng

  return <RouterProvider router={router} />;
};

export default App;
