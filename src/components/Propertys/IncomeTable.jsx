import React, { useEffect, useState, useContext } from "react";
import { incomeApi } from "@/service";
import { Table } from "antd";
import { AuthContext } from "@/context/AuthContext";
const columns = [
  {
    title: "ID",
    dataIndex: "_id",
  },
  {
    title: "Item",
    dataIndex: "item",
    // sorter: {
    //   compare: (a, b) => a.chinese - b.chinese,
    //   multiple: 3,
    // },
  },
  {
    title: "Total Income",
    dataIndex: "totalIncome",
    sorter: {
      compare: (a, b) => a.math - b.math,
      multiple: 2,
    },
  },
  {
    title: "Create At",
    dataIndex: "createdAt",
    // sorter: {
    //   compare: (a, b) => a.english - b.english,
    //   multiple: 1,
    // },
  },
];

const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};
const IncomeTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user?._id) {
      fetchData(user._id);
    }
  }, [user]);

  const fetchData = async (userId) => {
    setLoading(true);
    try {
      const response = await incomeApi.get(userId);
      setData(response.data);
    } catch (error) {
      console.error("Failed to fetch bills:", error);
    } finally {
      setLoading(false);
    }
  };

  return <Table columns={columns} dataSource={data} onChange={onChange} />;
};
export default IncomeTable;
