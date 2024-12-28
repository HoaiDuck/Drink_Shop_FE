import { instance } from "@/util";

const artistApi = {
  getAll() {
    const url = "user/sale/item";
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
export default artistApi;
