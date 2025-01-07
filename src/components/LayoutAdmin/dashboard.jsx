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
        ></Header>
        <Content style={{ margin: "16px" }}>
          <Breadcrumb style={{ marginBottom: "16px" }}>
            {/* <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item> */}
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
