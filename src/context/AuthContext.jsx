import { createContext, useContext, useState } from "react";
import { PropTypes } from "prop-types";
import { ability } from "@/ability";
import { accountApi } from "@/service";

export const AuthContext = createContext({
  _id: "",
  email: "",
  cart: "",
  username: "",
  userRole: "",
  coin: "",
  level: "",
  bio: "",
});

export const AuthProvider = (props) => {
  const [user, setUser] = useState({
    _id: 0,
    email: "",
    username: "",
    cart: "",
    userRole: [],
    coin: 0,
    level: 0,
    bio: " ",
  });
  // const [appLoading, isAppLoading] = useState(false);

  // const login = (userData) => setUser(userData);
  // const logout = () => setUser(null);
  const fetchUserInfor = async () => {
    try {
      const res = await accountApi.get();
      console.log(">>>CHECK ACCTOKEN At Authcontext:", res);
      if (res?.data?.data && Array.isArray(res?.data?.role)) {
        const dataUser = {
          _id: res.data.data._id,
          email: res.data.data.email,
          cart: res.data.data.cart,
          username: res.data.data.username,
          userRole: Number(res.data.role[0]), // Chuyển đổi role sang number
          coin: res.data.data.coin,
          level: res.data.data.level,
          bio: res.data.data.bio,
        };
        setUser(dataUser); // Cập nhật trạng thái user
        console.log(">>>>>CHECK API DATA:", dataUser);
      } else {
        console.error("Invalid user data:", res?.data);
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };
  return (
    <AuthContext.Provider value={{ user, setUser, fetchUserInfor }}>
      {props.children}
    </AuthContext.Provider>
  );
};
