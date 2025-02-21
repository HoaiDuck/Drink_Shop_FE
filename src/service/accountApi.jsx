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
  getAccById(_id) {
    const url = `Artist?_id=${_id}`;
    return instance.get(url);
  },

  getByRole() {
    const url = `user/Account?_id=${2}`;
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
    const url = `user/Acc?_id=${data._id}`; // Gửi _id qua query parameters
    return instance.delete(url);
  },
};
export default accountApi;
