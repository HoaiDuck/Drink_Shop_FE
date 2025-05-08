import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { LoadingWhite } from "@/components";
import { AuthApi } from "@/service";
import { AuthContext } from "@/context"; // Đảm bảo export đúng
const Login = () => {
  const { user, fetchUserInfor, setUser } = useContext(AuthContext);
  const [isRegisterMode, setRegisterMode] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [gender, setGender] = useState("MALE");
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await AuthApi.login({ username, password });
      const authMe = await AuthApi.authMe();
      setUser(authMe.data.result);
      if (response.data.code == 200) {
        toast.success("Đăng nhập thành công!");
        const checkRole = await AuthApi.authMe();
        if (checkRole.data.result.role === "ADMIN") {
          navigate("/admin");
        } else {
          navigate("/customerprofile");
        }
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Đã xảy ra lỗi. Vui lòng thử lại.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Kiểm tra tên không chứa số
    const nameRegex = /^[^\d]+$/;
    if (!nameRegex.test(name)) {
      setErrorMessage("Tên không được chứa số!");
      return;
    }

    // Kiểm tra số điện thoại hợp lệ
    const phoneRegex = /^0\d{8,9}$/;
    if (!phoneRegex.test(phoneNumber)) {
      setErrorMessage(
        "Số điện thoại phải bắt đầu bằng số 0 và có từ 9 đến 10 chữ số!"
      );
      return;
    }

    // Kiểm tra độ dài mật khẩu
    if (password.length < 8) {
      setErrorMessage("Mật khẩu phải có ít nhất 8 ký tự!");
      return;
    }

    // Kiểm tra mật khẩu trùng khớp
    if (password !== confirmPassword) {
      setErrorMessage("Mật khẩu không khớp!");
      return;
    }

    setLoading(true);
    try {
      const response = await AuthApi.register({
        username,
        password,
        name,
        birthday,
        phoneNumber,
        gender, // Thêm gender vào dữ liệu gửi đi
      });
      console.log("CHECK REGISTER: ", response.data.code);
      if (response.data.code == 200) {
        toast.success("Đăng ký thành công!");
        setErrorMessage("");
        setRegisterMode(false);
      } else {
        setErrorMessage(response.data.message || "Đăng ký thất bại!");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Có lỗi xảy ra. Vui lòng thử lại."
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="mt-2 flex min-h-[85%] justify-center bg-white">
      <div className="w-full max-w-md rounded-lg bg-white p-8 text-center">
        <div className="mb-8 flex justify-center">
          <h2
            className={`w-1/2 cursor-pointer px-4 py-2 font-josefin text-xl lg:text-2xl font-bold ${
              !isRegisterMode ? "border-b-2 border-black" : "text-gray-500"
            }`}
            onClick={() => setRegisterMode(false)}
          >
            Đăng Nhập
          </h2>
          <h2
            className={`w-1/2 cursor-pointer px-4 py-2 font-josefin text-xl lg:text-2xl font-bold ${
              isRegisterMode ? "border-b-2 border-black" : "text-gray-500"
            }`}
            onClick={() => setRegisterMode(true)}
          >
            Đăng Ký
          </h2>
        </div>

        {isRegisterMode ? (
          <form onSubmit={handleRegister}>
            <h3 className="font-josefin text-gray-600">
              Hãy tạo tài khoản để có thể xem lại lịch sử đơn hàng và sản phẩm
              yêu thích
            </h3>
            <h4 className="pb-4 font-josefin text-gray-600">
              Vui lòng nhập đầy đủ thông tin!
            </h4>

            {/* Thêm trường name */}
            <div className="relative z-0 mb-8">
              <input
                type="text"
                id="register_name"
                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-lg text-gray-900 focus:border-black focus:outline-none focus:ring-0"
                placeholder=" "
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <label
                htmlFor="register_name"
                className="absolute top-1 z-10 flex origin-[0] -translate-y-6 scale-75 transform items-start font-josefin text-lg text-gray-500 duration-300 peer-placeholder-shown:z-0 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:z-10 peer-focus:-translate-y-6 peer-focus:scale-75"
              >
                Họ và tên
              </label>
            </div>

            {/* Trường username */}
            <div className="relative z-0 mb-8">
              <input
                type="text"
                id="register_username"
                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-lg text-gray-900 focus:border-black focus:outline-none focus:ring-0"
                placeholder=" "
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label
                htmlFor="register_username"
                className="absolute top-1 z-10 flex origin-[0] -translate-y-6 scale-75 transform items-start font-josefin text-lg text-gray-500 duration-300 peer-placeholder-shown:z-0 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:z-10 peer-focus:-translate-y-6 peer-focus:scale-75"
              >
                Tên đăng nhập
              </label>
            </div>
            {/* Trường phoneNumber */}
            <div className="relative z-0 mb-8">
              <input
                type="text"
                id="register_phone"
                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-lg text-gray-900 focus:border-black focus:outline-none focus:ring-0"
                placeholder=" "
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
              <label
                htmlFor="register_phone"
                className="absolute top-1 z-10 flex origin-[0] -translate-y-6 scale-75 transform items-start font-josefin text-lg text-gray-500 duration-300 peer-placeholder-shown:z-0 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:z-10 peer-focus:-translate-y-6 peer-focus:scale-75"
              >
                Số điện thoại
              </label>
            </div>

            {/* Trường birthday */}
            <div className="relative z-0 mb-8">
              <input
                type="date"
                id="register_birthday"
                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-lg text-gray-900 focus:border-black focus:outline-none focus:ring-0"
                placeholder=" "
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                required
              />
              <label
                htmlFor="register_birthday"
                className="absolute top-1 z-10 flex origin-[0] -translate-y-6 scale-75 transform items-start font-josefin text-lg text-gray-500 duration-300 peer-placeholder-shown:z-0 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:z-10 peer-focus:-translate-y-6 peer-focus:scale-75"
              >
                Ngày sinh
              </label>
            </div>
            {/* Thêm trường giới tính */}
            <div className="relative z-0 mb-8">
              <select
                id="register_gender"
                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-lg text-gray-900 focus:border-black focus:outline-none focus:ring-0"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value="MALE">Nam</option>
                <option value="FEMALE">Nữ</option>
                <option value="OTHER">Khác</option>
              </select>
              <label
                htmlFor="register_gender"
                className="absolute top-1 z-10 flex origin-[0] -translate-y-6 scale-75 transform items-start font-josefin text-lg text-gray-500 duration-300 peer-placeholder-shown:z-0 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:z-10 peer-focus:-translate-y-6 peer-focus:scale-75"
              >
                Giới tính
              </label>
            </div>
            {/* Trường password */}
            <div className="relative z-0 mb-8">
              <input
                type={isPasswordVisible ? "text" : "password"}
                id="register_password"
                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-lg text-gray-900 focus:border-black focus:outline-none focus:ring-0"
                placeholder=" "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label
                htmlFor="register_password"
                className="absolute top-1 z-10 flex origin-[0] -translate-y-6 scale-75 transform items-start font-josefin text-lg text-gray-500 duration-300 peer-placeholder-shown:z-0 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:z-10 peer-focus:-translate-y-6 peer-focus:scale-75"
              >
                Mật khẩu
              </label>
              <button
                type="button"
                onClick={() => setPasswordVisible(!isPasswordVisible)}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
              >
                <FontAwesomeIcon
                  icon={isPasswordVisible ? faEye : faEyeSlash}
                />
              </button>
            </div>

            {/* Trường confirmPassword */}
            <div className="relative z-0 mb-8">
              <input
                type={isConfirmPasswordVisible ? "text" : "password"}
                id="register_confirm_password"
                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-lg text-gray-900 focus:border-black focus:outline-none focus:ring-0"
                placeholder=" "
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <label
                htmlFor="register_confirm_password"
                className="absolute top-1 z-10 flex origin-[0] -translate-y-6 scale-75 transform items-start font-josefin text-lg text-gray-500 duration-300 peer-placeholder-shown:z-0 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:z-10 peer-focus:-translate-y-6 peer-focus:scale-75"
              >
                Nhập lại mật khẩu
              </label>
              <button
                type="button"
                onClick={() =>
                  setConfirmPasswordVisible(!isConfirmPasswordVisible)
                }
                className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
              >
                <FontAwesomeIcon
                  icon={isConfirmPasswordVisible ? faEye : faEyeSlash}
                />
              </button>
            </div>

            {errorMessage && (
              <p className="mb-8 text-red-500">{errorMessage}</p>
            )}
            <button
              type="submit"
              className="mt-3 w-full rounded bg-black py-3 font-josefin text-white transition-transform duration-200 hover:scale-95"
              disabled={loading}
            >
              {loading ? <LoadingWhite /> : "Đăng Ký"}
            </button>

            <button
              className="mt-2 text-lg text-gray-500 hover:text-black"
              onClick={() => setRegisterMode(false)}
            >
              Đã có tài khoản?
            </button>
          </form>
        ) : (
          <form onSubmit={handleLogin}>
            <h3 className="font-josefin text-gray-600">
              Chào mừng quay trở lại
            </h3>
            <h4 className="mb-2 pb-4 font-josefin text-gray-600">
              Đăng nhập bằng tên đăng nhập và mật khẩu
            </h4>
            <div className="relative z-0 mb-8">
              <input
                type="text"
                id="login_username"
                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-lg text-gray-900 focus:border-black focus:outline-none focus:ring-0"
                placeholder=" "
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label
                htmlFor="login_username"
                className="absolute top-1 z-10 flex origin-[0] -translate-y-6 scale-75 transform items-start font-josefin text-lg text-gray-500 duration-300 peer-placeholder-shown:z-0 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:z-10 peer-focus:-translate-y-6 peer-focus:scale-75"
              >
                Tên đăng nhập hoặc email
              </label>
            </div>

            <div className="relative z-0 mb-8">
              <input
                type={isPasswordVisible ? "text" : "password"}
                id="login_password"
                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-lg text-gray-900 focus:border-black focus:outline-none focus:ring-0"
                placeholder=" "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label
                htmlFor="login_password"
                className="absolute top-1 z-10 flex origin-[0] -translate-y-6 scale-75 transform items-start font-josefin text-lg text-gray-500 duration-300 peer-placeholder-shown:z-0 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:z-10 peer-focus:-translate-y-6 peer-focus:scale-75"
              >
                Mật khẩu
              </label>

              <button
                type="button"
                onClick={() => setPasswordVisible(!isPasswordVisible)}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
              >
                <FontAwesomeIcon
                  icon={isPasswordVisible ? faEye : faEyeSlash}
                />
              </button>
            </div>
            {errorMessage && (
              <p className="mb-8 text-red-500">{errorMessage}</p>
            )}
            <button
              type="submit"
              className="mb-2 mt-3 w-full rounded bg-black py-3 font-josefin text-base text-white transition-transform duration-200 hover:scale-95"
              disabled={loading}
            >
              {loading ? <LoadingWhite /> : "Đăng Nhập"}
            </button>
            <a
              href="/forgotpassword"
              className="text-lg text-gray-500 hover:text-black"
            >
              Bạn quên mật khẩu?
            </a>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
