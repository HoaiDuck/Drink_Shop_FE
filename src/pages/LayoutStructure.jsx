import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import Navbar from "@/components/Layout/Navbar";
import { Outlet } from "react-router-dom";
import { categoryApi } from "@/service";

const LayoutStructure = () => {
  const [categoryData, setCategoryData] = useState();
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  const listCategory = async () => {
    const res = await categoryApi.getAll();
    const listCate = res.data.map((item) => ({
      Name: item.Name,
      _id: item._id,
      Description: item.Description,
    }));
    setCategoryData(listCate);
    console.log(">>>>CHECK CATEGORY:", res.data);
  };

  useEffect(() => {
    listCategory();
    setLoading(false);
  }, [user]);

  if (loading) {
    return null; // Nếu dữ liệu chưa tải xong, không hiển thị gì
  }

  return (
    <>
      <Navbar cateData={categoryData} />
      <Outlet />
    </>
  );
};

export default LayoutStructure;
