import Navbar from "@/components/Layout/Navbar";
import { Link, Outlet } from "react-router-dom";
const LayoutStructure = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
export default LayoutStructure;
