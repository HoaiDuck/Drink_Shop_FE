import { instance } from "@/util";

const loginApi = {
  login(data) {
    const url = "login/";
    return instance.post(url, data);
  },
  get(id) {
    const url = `user/Acc/${id}`;
    return instance.get(url);
  },
  add(data) {
    const url = "user/Acc";
    return instance.post(url, data);
  },
  update(data) {
    const url = `user/Acc`;
    return instance.put(url, data);
  },
  delete(data) {
    const url = `user/Acc`;
    return instance.delete(url, data);
  },
};
export default loginApi;
