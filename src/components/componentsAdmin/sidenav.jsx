import { Breadcrumb, Layout, Menu, theme } from "antd";
import { useState } from "react";
import { Logo } from "@/components/Logo";
import { accountApi } from "@/service";
const { Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
const items = [
  getItem("Dashboard", "dashboard", <PieChartOutlined />),
  getItem("Account", "account", <DesktopOutlined />),
  getItem("Request", "Request_sup", <UserOutlined />, [
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

const handleMenuClick = async (e) => {
  console.log("Clicked item key:", e.key);
  const res = await accountApi.getAll();

  // Xử lý logic theo từng key
  switch (e.key) {
    case "dashboard":
      console.log("Test get all ACCOUNT:", res.data);
      break;
    case "account":
      console.log("Navigate to Account");
      break;
    case "tom":
      console.log("Tom's Request selected");
      break;
    default:
      console.log(`Unhandled menu key: ${e.key}`);
  }
};

const Sidenav = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div className="demo-logo-vertical">
        <h6 className="bg-main-green p-1 text-white font-bold font-sans m-5 border-indigo-50 text-center rounded-full">
          Graphic Design Website
        </h6>
      </div>
      <Menu
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={items}
        onClick={handleMenuClick}
      />
    </Sider>
  );
};
export default Sidenav;
