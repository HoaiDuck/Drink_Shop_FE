import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="admin-container">
      <Outlet />
    </div>
  );
};

export default AdminLayout;
