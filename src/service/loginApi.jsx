import { instance } from "@/util";

const loginApi = {
  login(data) {
    const url = "login/";
    return instance.post(url, data);
  },
  register(data) {
    const url = "Acc";
    return instance.post(url, data);
  },
  forgetPassword(data) {
    const url = "user/Acc";
    return instance.put(url, data);
  },
};
export default loginApi;
