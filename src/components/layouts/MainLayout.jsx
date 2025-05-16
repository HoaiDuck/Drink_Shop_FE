import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { Navbar, Newsletter, Footer } from "@/components";
import { AuthContext } from "@/context";
const MainLayout = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="app-container">
      <Navbar user={user} />
      <Outlet />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default MainLayout;
