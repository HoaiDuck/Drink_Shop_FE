import React, { useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import { useAbility } from "@casl/react";

import { AuthContext } from "@/context/AuthContext";
import { ability, defineAbilitiesFor } from "@/ability";
const CheckRole = ({ action, subject, children }) => {
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    console.log(">>>CHECK context User:", user);
    const roleNumber = Number(user.userRole); // Đảm bảo role là number
    const permissions = defineAbilitiesFor(roleNumber);
    ability.update(permissions); // Cập nhật Ability
    setLoading(false);
    console.log("Updated abilities:", ability);
  }, [user]);

  console.log("Ability:", ability); // Kiểm tra xem ability có giá trị hay không
  if (!ability.can(action, subject)) {
    return <></>;
  }
  if (loading) {
    return null; //nếu ability chưa xong, sẽ ép chạy lại
  }
  console.log("Current user role:", user.userRole);
  console.log("Permissions after update:", ability.rules);

  return children;
};
export default CheckRole;
