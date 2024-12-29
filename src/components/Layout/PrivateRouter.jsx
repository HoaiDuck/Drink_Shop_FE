import React, { useEffect, useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAbility } from "@casl/react";

import { AuthContext } from "@/context/AuthContext";
import { ability, defineAbilitiesFor } from "@/ability";

function PrivateRoute({ action, subject, children }) {
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      console.log(">>>CHECK context User:", user);
      const roleNumber = Number(user.userRole); // Đảm bảo role là number
      const permissions = defineAbilitiesFor(roleNumber);
      ability.update(permissions); // Cập nhật Ability
      setLoading(false); // Đánh dấu rằng quá trình cập nhật đã hoàn tất
      console.log("Updated abilities:", ability);
    }
  }, [user]);

  if (loading) {
    return null; //nếu ability chưa xong, sẽ ép chạy lại
  }

  if (!ability.can(action, subject)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
}

export default PrivateRoute;
