import { createContext, useContext, useState } from "react";
import { PropTypes } from "prop-types";
import { ability } from "@/ability";

export const AuthContext = createContext({
  _id: "",
  email: "",
  username: "",
  userRole: "",
});

export const AuthProvider = (props) => {
  const [user, setUser] = useState({
    _id: 0,
    email: "",
    username: "",
    userRole: [],
  });
  // const [appLoading, isAppLoading] = useState(false);

  // const login = (userData) => setUser(userData);
  // const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};
