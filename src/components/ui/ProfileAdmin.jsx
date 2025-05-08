import { useEffect, useState, useContext } from "react";
import {
  ChangePasswordCs,
  ChangeInformation,
  Loading,
  OrderHistory,
} from "@/components";
import { toast } from "react-toastify";
import { AuthApi } from "@/service";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/context"; // Đảm bảo bạn export đúng từ index.js

const ProfileAdmin = () => {
  const [loading, setLoading] = useState(true);
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
  const [isInforModalOpen, setInforModalOpen] = useState(false);

  const { user, fetchUserInfor, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e?.preventDefault();
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
    navigate("/");
    toast.success("Đăng xuất thành công!");
  };

  useEffect(() => {
    const loadUser = async () => {
      await fetchUserInfor();
      setLoading(false);
    };
    loadUser();
  }, []);

  if (loading) return <Loading />;

  if (!user) return <div>Không thể hiển thị thông tin tài khoản!</div>;
  console.log("Check User:", user);
  return (
    <div className="flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-4xl rounded-lg bg-white p-6">
        <div className="mb-4 text-center font-josefin text-4xl font-bold">
          Trang cá nhân
        </div>

        <div className="mb-4 ml-20 flex max-w-4xl space-x-6">
          <div className="w-2/3">
            <label className="mt-4 block font-josefin text-2xl font-bold">
              Tên người dùng
            </label>
            <input
              type="text"
              value={user.name}
              disabled
              className="peer block w-3/4 border-0 border-b-2 border-gray-300 bg-transparent pl-2 pt-2 text-lg text-gray-900"
            />

            <label className="mt-8 block font-josefin text-2xl font-bold">
              Username
            </label>
            <input
              type="email"
              value={user.username}
              disabled
              className="peer block w-3/4 border-0 border-b-2 border-gray-300 bg-transparent px-0 pt-2 text-lg text-gray-900"
            />

            <label className="mt-8 block font-josefin text-2xl font-bold">
              Số điện thoại
            </label>
            <input
              type="tel"
              value={user.phoneNumber}
              disabled
              className="peer block w-3/4 border-0 border-b-2 border-gray-300 bg-transparent px-0 pt-2 text-lg text-gray-900"
            />
          </div>

          <div className="flex w-1/2 flex-col items-center justify-center">
            <button
              className="w-3/4 rounded bg-black px-4 py-2 text-white transition-transform duration-200 hover:scale-95"
              onClick={() => setPasswordModalOpen(true)}
            >
              Đổi mật khẩu
            </button>

            <button
              className="mt-8 w-3/4 rounded bg-black px-4 py-2 text-white transition-transform duration-200 hover:scale-95"
              onClick={() => setInforModalOpen(true)}
            >
              Cập nhật thông tin
            </button>
            <button
              className="mt-8 w-3/4 rounded bg-black px-4 py-2 text-white transition-transform duration-200 hover:scale-95"
              onClick={handleLogout}
            >
              Đăng xuất
            </button>
          </div>
        </div>
      </div>

      <div className="w-full max-w-7xl rounded-lg bg-white p-6">
        <OrderHistory />
      </div>

      {isPasswordModalOpen && (
        <ChangePasswordCs
          onClose={() => setPasswordModalOpen(false)}
          onUpdateSuccess={fetchUserInfor}
        />
      )}

      {isInforModalOpen && (
        <ChangeInformation
          onClose={() => setInforModalOpen(false)}
          onUpdateSuccess={fetchUserInfor}
        />
      )}
    </div>
  );
};

export default ProfileAdmin;
