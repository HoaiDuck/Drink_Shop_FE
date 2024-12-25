import React from "react";
import { Navigate } from "react-router-dom";
import { useAbility } from "@casl/react";
import { ability } from "@/ability";
function PrivateRoute({ action, subject, children }) {
  console.log("Ability:", ability); // Kiểm tra xem ability có giá trị hay không
  if (!ability.can(action, subject)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
}

export default PrivateRoute;
