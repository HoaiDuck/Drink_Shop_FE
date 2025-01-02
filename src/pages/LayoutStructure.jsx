import Navbar from "@/components/Layout/Navbar";
import { Link, Outlet } from "react-router-dom";
import { categoryApi } from "@/service";
import React, { useEffect, useState } from "react";
const LayoutStructure = () => {
  const [categoryData, setCategoryData] = useState();
  const listCategory = async () => {
    const res = await categoryApi.getAll();
    const listCate = res.data.map((item) => ({
      Name: item.Name,
      _id: item._id,
    }));
    setCategoryData(listCate);
    console.log(">>>>CHECK CATEGORY:", res.data);
  };
  useEffect(() => {
    listCategory();
  }, []);

  return (
    <>
      <Navbar cateData={categoryData} />
      <Outlet />
    </>
  );
};
export default LayoutStructure;
