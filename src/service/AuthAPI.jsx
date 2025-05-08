import { instance } from "@/util";

const AuthApi = {
  login(data) {
    const url = "auth/login";
    return instance.post(url, data);
  },
  register(data) {
    const url = "auth/register";
    return instance.post(url, data);
  },
  forgetPassword(data) {
    const url = "user/Acc";
    return instance.put(url, data);
  },
  refreshToken() {
    const url = "auth/refreshToken";
    return instance.post(url);
  },
  authMe() {
    const url = "auth/me";
    return instance.get(url);
  },
  updateAccount(data) {
    const url = "accounts/updateAccount";
    return instance.put(url, data);
  },
  logout() {
    const url = "auth/logout";
    return instance.post(url);
  },
};
export default AuthApi;
