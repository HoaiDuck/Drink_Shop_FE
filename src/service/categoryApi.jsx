import { instance } from "@/util";

const categoryApi = {
  getAll() {
    const url = "category";
    return instance.get(url);
  },
  get() {
    const url = `user/Acc`;
    return instance.get(url);
  },
  add(data) {
    const url = "user/sale/category";
    return instance.post(url, data);
  },
  update(data) {
    const url = `user/admin/category`;
    return instance.put(url, data);
  },
  delete(data) {
    const url = "user/admin/category";
    return instance.delete(url, data);
  },
};
export default categoryApi;
