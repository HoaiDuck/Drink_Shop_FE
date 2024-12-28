import React, { useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import { useAbility } from "@casl/react";

import { AuthContext } from "@/context/AuthContext";
import { ability, defineAbilitiesFor } from "@/ability";
const CheckRole = ({ action, subject, children }) => {
  const { user, setUser } = useContext(AuthContext);
  useEffect(() => {
    console.log(">>>CHECK context User:", user);
    const roleNumber = Number(user.userRole); // Đảm bảo role là number
    const permissions = defineAbilitiesFor(roleNumber);
    ability.update(permissions); // Cập nhật Ability
    console.log("Updated abilities:", ability);
  }, []);

  console.log("Ability:", ability); // Kiểm tra xem ability có giá trị hay không
  if (!ability.can(action, subject)) {
    return <></>;
  }

  return children;
};
export default CheckRole;
