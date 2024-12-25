import { instance } from "@/util";

const accountApi = {
  getAll() {
    const url = "Acc";
    return instance.get(url);
  },
  get() {
    const url = `user/Acc`;
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
    const url = "user/Acc";
    return instance.delete(url, data);
  },
};
export default accountApi;
