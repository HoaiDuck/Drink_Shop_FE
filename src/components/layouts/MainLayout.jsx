import { Outlet } from "react-router-dom";
import { Navbar, Newsletter, Footer } from "@/components";
const MainLayout = () => {
  return (
    <div className="app-container">
      <Navbar />
      <Outlet />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default MainLayout;
