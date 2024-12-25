import { instance } from "@/util";

const loginApi = {
  login(data) {
    const url = "login/";
    return instance.post(url, data);
  },
  register(id) {
    const url = `user/Acc/${id}`;
    return instance.post(url);
  },
  forgetPassword(data) {
    const url = "user/Acc";
    return instance.put(url, data);
  },
};
export default loginApi;
