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
  const { user, setUser } = useContext(AuthContext);
  const [isUserLoaded, setIsUserLoaded] = useState(false); // Đánh dấu khi dữ liệu user đã sẵn sàng

  // Hàm gọi API để lấy thông tin người dùng
  const fetchUserInfor = async () => {
    try {
      const res = await accountApi.get();
      if (res?.data?.data && Array.isArray(res?.data?.role)) {
        const dataUser = {
          _id: res.data.data._id,
          email: res.data.data.email,
          username: res.data.data.username,
          userRole: Number(res.data.role[0]), // Chuyển đổi role sang number
        };
        setUser(dataUser); // Cập nhật trạng thái user
        setIsUserLoaded(true); // Đánh dấu dữ liệu đã được tải
        console.log(">>>>>CHECK USER DATA:", dataUser);
      } else {
        console.error("Invalid user data:", res?.data);
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  // Gọi API khi ứng dụng load lần đầu
  useEffect(() => {
    fetchUserInfor();
  }, []);

  // Cập nhật Ability khi dữ liệu user đã sẵn sàng
  useEffect(() => {
    if (isUserLoaded) {
      const roleNumber = Number(user.userRole); // Đảm bảo role là number
      const permissions = defineAbilitiesFor(roleNumber);
      ability.update(permissions); // Cập nhật Ability
      console.log("Updated abilities:", permissions);
    }
  }, [isUserLoaded, user]);

  return <RouterProvider router={router} />;
};

export default App;
