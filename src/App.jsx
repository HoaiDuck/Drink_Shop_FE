// import { RouterProvider } from "react-router-dom";
// import router from "@/routes/index";
// import { useContext, useState } from "react";
// import ReactDOM from "react-dom";
// import React, { useEffect } from "react"; // AuthContext quản lý user và role
// import { ability, defineAbilitiesFor } from "@/ability";
// import { AuthContext } from "@/context/AuthContext";
// import { accountApi } from "@/service";
// const App = () => {
//   const { user, setUser } = useContext(AuthContext);
//   const [useRole, setUseRole] = useState();
//   useEffect(() => {
//     const fetchUserInfor = async () => {
//       try {
//         const res = await accountApi.get();
//         console.log(">>>>>CHECK USER DATA:", res.data);
//         if (res?.data || res?.data?.user) {
//           const dataUser = {
//             _id: res.data.data._id,
//             email: res.data.data.email,
//             username: res.data.data.username,
//             userRole: res.data.role[0],
//           };
//           setUser(dataUser);
//           console.log(">>>>>CHECK USER DATA 22:", res.data);
//         }
//       } catch (error) {
//         console.error("Error fetching user info:", error);
//       }
//     };

//     fetchUserInfor();
//   }, []); // Chỉ chạy 1 lần khi component mount

//   useEffect(() => {
//     if (user?.userRole) {
//       const roleNumber = Number(user.userRole); // Chuyển đổi userRole sang number
//       setUseRole(roleNumber);
//     }
//   }, [user]);
//   useEffect(() => {
//     if (useRole) {
//       const permissions = defineAbilitiesFor(useRole);
//       ability.update(permissions);
//     }
//   }, []);
//   return <RouterProvider router={router} />;
// };

// export default App;
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

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      fetchUserInfor(); // Fetch dữ liệu người dùng nếu có access token
    }
  }, []);

  // Cập nhật Ability khi dữ liệu user đã sẵn sàng
  useEffect(() => {
    const roleNumber = Number(user.userRole); // Đảm bảo role là number
    const permissions = defineAbilitiesFor(roleNumber);
    ability.update(permissions); // Cập nhật Ability
    console.log("Updated abilities:", permissions);
  }, []);

  return <RouterProvider router={router} />;
};

export default App;
