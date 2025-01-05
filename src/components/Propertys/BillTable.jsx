import React, { useEffect, useState, useContext } from "react";
import { Table } from "antd";
import { billApi } from "@/service";
import { AuthContext } from "@/context/AuthContext"; // Giả sử bạn có AuthContext để lấy thông tin người dùng

const columns = [
  {
    title: "ID",
    dataIndex: "_id",
  },

  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Total Amount",
    dataIndex: "totalAmount",
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
  },
];

const BillTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext); // Lấy thông tin người dùng từ AuthContext

  useEffect(() => {
    if (user?._id) {
      fetchData(user._id);
    }
  }, [user]);

  const fetchData = async (userId) => {
    setLoading(true);
    try {
      const response = await billApi.get(userId); // Gọi API để lấy dữ liệu hóa đơn
      setData(response.data); // Cập nhật state với dữ liệu từ API
    } catch (error) {
      console.error("Failed to fetch bills:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={loading}
      rowKey="_id" // Sử dụng _id làm key cho mỗi row
    />
  );
};

export default BillTable;
