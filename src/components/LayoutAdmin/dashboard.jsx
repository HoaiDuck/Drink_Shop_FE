import React, { useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";

import { Outlet } from "react-router-dom";
import { Sidenav } from "@/components/componentsAdmin/index";
const { Header, Content, Footer } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("Option 1", "1", <PieChartOutlined />),
  getItem("Option 2", "2", <DesktopOutlined />),
  getItem("User", "sub1", <UserOutlined />, [
    getItem("Tom", "3"),
    getItem("Bill", "4"),
    getItem("Alex", "5"),
  ]),
  getItem("Team", "sub2", <TeamOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("Files", "9", <FileOutlined />),
];
//
const DashboardLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidenav */}
      <Layout.Sider
        width={200}
        className="fixed left-0 top-0 h-full  text-white"
      >
        <Sidenav />
      </Layout.Sider>

      {/* Main Layout */}
      <Layout style={{ marginLeft: 200 }}>
        <Header
          style={{
            background: colorBgContainer,
            padding: "0 16px",
          }}
        >
          <h1 className="text-lg font-bold">Dashboard</h1>
        </Header>
        <Content style={{ margin: "16px" }}>
          <Breadcrumb style={{ marginBottom: "16px" }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <Outlet />
        </Content>
        <Footer
          style={{
            textAlign: "center",
            background: colorBgContainer,
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
