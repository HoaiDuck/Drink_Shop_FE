import React, { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { UnAuthor } from "@/pages";
import { Loading } from "@/components";

const CheckRole = ({ role, children }) => {
  const { user, appLoading } = useContext(AuthContext);

  if (appLoading) {
    return <Loading />;
  }
  console.log(">>>CHECK USER at checkrole:", user);
  if (!user || !user.role) {
    return <UnAuthor />;
  }

  return user.role === role ? children : <UnAuthor />;
};

export default CheckRole;
