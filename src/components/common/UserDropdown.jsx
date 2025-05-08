import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { AuthApi } from "@/service";
import { AuthContext } from "@/context"; // Đảm bảo export đúng

const UserDropdown = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const { user, fetchUserInfor, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const checkUser = () => user?.id !== "";

  useEffect(() => {
    fetchUserInfor();
  }, []);

  const handleLoginClick = (e) => {
    e.preventDefault();
    try {
      if (user.role === "ADMIN") {
        navigate("/admin");
      } else if (user.role === "CUSTOMER") {
        navigate("/customerprofile");
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error determining role:", error);
    }
  };

  const handleLogoutClick = async () => {
    try {
      await AuthApi.logout();
      setUser({
        id: "",
        name: "",
        birthday: "",
        username: "",
        phoneNumber: "",
        gender: "",
        role: "",
      });
      toast.success("Đăng xuất thành công!");
      navigate("/login");
    } catch (error) {
      toast.error("Lỗi đăng xuất:", error);
    }
  };

  const handleUserIconClick = () => {
    if (!checkUser()) {
      navigate("/login");
    }
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        if (checkUser()) setDropdownOpen(true);
      }}
      onMouseLeave={() => setDropdownOpen(false)}
    >
      <button
        className="cursor-pointer text-2xl text-[#333] transition-all duration-300 hover:text-[#d88453] lg:px-4"
        onClick={handleUserIconClick}
      >
        <FontAwesomeIcon icon={faUser} />
      </button>

      {checkUser() && isDropdownOpen && (
        <div className="dropdown absolute -left-12 w-[180px] rounded-lg border-2 border-gray-300 bg-white shadow-md">
          <button
            className="w-full border-b-2 border-gray-300 px-4 py-3 text-center font-josefin text-sm font-bold hover:rounded-t-lg hover:bg-black hover:text-white"
            onClick={handleLoginClick}
          >
            Thông tin tài khoản
          </button>
          <button
            className="w-full px-4 py-3 text-center font-josefin text-sm font-bold hover:rounded-b-lg hover:bg-black hover:text-white"
            onClick={handleLogoutClick}
          >
            Đăng xuất
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
