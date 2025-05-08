import { createContext, useContext, useState, useEffect } from "react";
import { PropTypes } from "prop-types";

import { AuthApi } from "@/service";

export const AuthContext = createContext({
  id: "",
  name: "",
  birthday: "",
  username: "",
  phoneNumber: "",
  gender: "",
  role: "",
});

export const AuthProvider = (props) => {
  const [user, setUser] = useState({
    id: "",
    name: "",
    birthday: "",
    username: "",
    phoneNumber: "",
    gender: "",
    role: "",
  });
  const [appLoading, setAppLoading] = useState(true);

  const fetchUserInfor = async () => {
    try {
      const res = await AuthApi.authMe();
      console.log(">>>CHECK ACCTOKEN At Authcontext:", res);
      console.log("==> AuthMe res:", res.data.result);
      setUser(res.data.result);
      setAppLoading(false);
    } catch (error) {
      console.error("Error fetching user info:", error);
      setAppLoading(true);
    } finally {
      setAppLoading(false);
    }
  };
  useEffect(() => {
    fetchUserInfor();
  }, []);
  return (
    <AuthContext.Provider value={{ user, setUser, fetchUserInfor, appLoading }}>
      {props.children}
    </AuthContext.Provider>
  );
};
