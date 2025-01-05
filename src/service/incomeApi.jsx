import { instance } from "@/util";

const incomeApi = {
  getAll() {
    const url = "user/Income";
    return instance.get(url);
  },
  get(_id) {
    const url = `user/Income?_id=${_id}`;
    return instance.get(url);
  },

  add(data) {
    const url = "user/Income";
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
export default incomeApi;
