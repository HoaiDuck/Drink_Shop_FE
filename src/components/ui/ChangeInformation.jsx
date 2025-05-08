import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { AuthApi } from "@/service";

const ChangeInformation = ({ onClose, onUpdateSuccess }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    id: "241e1d9b-257c-4dd2-a17b-0707f52d35ea",
    name: "duck",
    birthday: "1990-05-15",
    username: "duck12345",
    phoneNumber: "0333333333",
    gender: "MALE",
    role: "CUSTOMER",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await AuthApi.authMe();
        if (response.data.code == 200) {
          setUser({
            ...user,
            username: response.data.result.username,
            phoneNumber: response.data.result.phoneNumber,
          });
        } else {
          toast.error("Không thể tải thông tin tài khoản!");
        }
      } catch (error) {
        toast.error("Lỗi khi tải thông tin tài khoản!");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!user.id) {
      toast.error("Token không hợp lệ!");
      return;
    }

    if (!user.username && !user.phoneNumber) {
      setError(
        "Vui lòng nhập ít nhất một trong hai thông tin email hoặc số điện thoại."
      );
      return;
    }

    // Validate phone number (starts with 0 and is 9-10 digits long)
    const phonePattern = /^0\d{8,9}$/;
    if (user.phoneNumber && !phonePattern.test(user.phoneNumber)) {
      setError(
        "Số điện thoại phải bắt đầu bằng 0 và có độ dài từ 9 đến 10 chữ số."
      );
      return;
    }
    try {
      const response = await AuthApi.updateAccount({});
      if (response.data.success) {
        toast.success("Cập nhật thông tin thành công!");
        onUpdateSuccess();
        onClose();
      } else {
        toast.error("Không thể cập nhật thông tin!");
      }
    } catch (error) {
      toast.error("Lỗi khi cập nhật thông tin!");
    }
  };

  if (loading) return <div>Đang tải...</div>;

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded bg-white p-6 shadow-lg">
        <h2 className="flex justify-center font-josefin text-4xl font-bold">
          Cập nhật thông tin
        </h2>
        <form onSubmit={handleSubmit}>
          <label className="mb-2 mt-8 block font-josefin text-2xl font-bold">
            Username
          </label>
          <input
            type="email"
            value={user.username}
            onChange={(prevUser, e) =>
              setUser((prevUser) => ({
                ...prevUser,
                username: e.target.value,
              }))
            }
            className="h-11 w-full rounded border-2 p-2"
          />
          <label className="mb-2 mt-8 block font-josefin text-2xl font-bold">
            Số điện thoại
          </label>
          <input
            type="tel"
            value={user.phoneNumber}
            onChange={(e) =>
              setUser((prevUser) => ({
                ...prevUser,
                phoneNumber: e.target.value,
              }))
            }
            className="h-11 w-full rounded border-2 p-2"
          />
          {error && (
            <p className="mt-4 font-josefin text-lg text-red-500">{error}</p>
          )}
          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={onClose}
              className="mt-4 w-20 rounded-md bg-gray-300 px-4 py-2 text-black transition-transform duration-200 hover:scale-95"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="mt-4 rounded-md bg-black px-8 py-2 text-white transition-transform duration-200 hover:scale-95"
            >
              Cập nhật
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangeInformation;
