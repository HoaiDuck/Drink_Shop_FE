import React, { useContext } from "react";
import { DownOutlined, EnterOutlined, LogoutOutlined } from "@ant-design/icons";
import { Button, Dropdown, message, Space, Avatar } from "antd";
import { CheckRole } from "@/components/PrivateComponent";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
import { Popover } from "antd";
const AccountInfo = () => (
  <div style={{ display: "flex", alignItems: "center", padding: "8px 12px" }}>
    <Avatar src="https://via.placeholder.com/150" size="large" />
    <div style={{ marginLeft: "12px" }}>
      <div style={{ fontWeight: "bold" }}>Hoài Đức</div>
      <div style={{ color: "gray" }}>fizzducnguyen@gmail.com</div>
    </div>
  </div>
);

const items = [
  {
    label: <AccountInfo />,
    key: "0",
    disabled: false, // Vô hiệu hóa click trên phần tử này
  },
  {
    type: "divider", // Thêm một đường phân cách
  },
  {
    label: "Your work space",
    key: "1",
  },
  {
    label: "Your bag",
    key: "2",
  },
  {
    label: "Manage request",
    key: "3",
  },
  {
    label: "Property",
    key: "4",
  },
  {
    label: "Settings",
    key: "5",
  },
  {
    type: "divider", // Thêm một đường phân cách
  },
  {
    label: "Log Out",
    key: "6",
    icon: <LogoutOutlined rotate="180" />,
  },
];

const BtnMenu = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const handleMenuClick = (e) => {
    switch (e.key) {
      case "0":
        navigate(`/Artist/${user._id}`);
        break;
      case "1":
        navigate("/Account/Workspace");
        break;
      case "2":
        navigate("/Account/PersonalBag");
        break;
      case "3":
        navigate("/Request");
        break;
      case "4":
        navigate("/Property");
        break;
      case "5":
        navigate("/Setting");
        break;
      case "6":
        // Xử lý đăng xuất
        message.info("Logging out...");
        localStorage.removeItem("access_token");
        navigate("/");
        window.location.reload();
        // Thêm logic đăng xuất ở đây
        break;
      default:
        console.log("Unknown menu item clicked");
    }
  };
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  console.log(">>>CHECK USER:", user);
  const content = (
    <div>
      <p>Click to login!</p>
    </div>
  );
  return (
    <>
      {user.email != "" ? (
        <Space>
          <Dropdown menu={menuProps} trigger={["click"]}>
            <Button className="relative w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400">
              <div className="relative flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
                <DownOutlined className="absolute bottom-0 right-0 size-3 bg-gray-300 rounded-full p-0.5 shadow-md" />
              </div>
            </Button>
          </Dropdown>
        </Space>
      ) : (
        <Link to="/Login">
          <Popover
            className="relative w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400"
            content={content}
            trigger="hover"
          >
            <Button>
              <EnterOutlined />
            </Button>
          </Popover>
        </Link>
      )}
    </>
  );
};

export default BtnMenu;
