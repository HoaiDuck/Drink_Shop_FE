import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { AuthApi } from "@/service";

const ChangePasswordCs = ({ onClose, onUpdateSuccess }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (newPassword.length < 8) {
      setError("Mật khẩu mới phải có ít nhất 8 ký tự!");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Mật khẩu mới và mật khẩu xác nhận không khớp!");
      return;
    }

    try {
      const user = await Auth.authMe(); 
      const updatedUser = {
        ...user.result,
        password: newPassword,
      };

      const response = await AuthApi.updateAccount(updatedUser);
      if (response.data.code === 200) {
        toast.success("Đổi mật khẩu thành công!");
        onUpdateSuccess();
        onClose();
      } else {
        toast.error("Không thể đổi mật khẩu!");
      }
    } catch (error) {
      toast.error("Lỗi khi đổi mật khẩu!");
    }
  };

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded bg-white p-6 shadow-lg">
        <h2 className="flex justify-center font-josefin text-4xl font-bold">
          Đổi mật khẩu
        </h2>
        <form onSubmit={handleSubmit}>
          <label className="mb-2 mt-8 block font-josefin text-2xl font-bold">
            Mật khẩu cũ
          </label>
          <div className="relative">
            <input
              type={showOldPassword ? "text" : "password"}
              className="h-14 w-full rounded border-2 px-2 pb-3 pt-4 text-xl"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
            <FontAwesomeIcon
              icon={showOldPassword ? faEye : faEyeSlash}
              className="absolute right-4 top-1/2 -translate-y-1/2 transform cursor-pointer"
              onClick={() => setShowOldPassword(!showOldPassword)}
            />
          </div>

          <label className="mb-2 mt-4 block font-josefin text-2xl font-bold">
            Mật khẩu mới
          </label>
          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              className="h-14 w-full rounded border-2 px-2 pb-3 pt-4 text-xl"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <FontAwesomeIcon
              icon={showNewPassword ? faEye : faEyeSlash}
              className="absolute right-4 top-1/2 -translate-y-1/2 transform cursor-pointer"
              onClick={() => setShowNewPassword(!showNewPassword)}
            />
          </div>

          <label className="mb-2 mt-4 block font-josefin text-2xl font-bold">
            Nhập lại mật khẩu
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="h-14 w-full rounded border-2 px-2 pb-3 pt-4 text-xl"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <FontAwesomeIcon
              icon={showConfirmPassword ? faEye : faEyeSlash}
              className="absolute right-4 top-1/2 -translate-y-1/2 transform cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            />
          </div>

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

export default ChangePasswordCs;
