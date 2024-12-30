import { instance } from "@/util";

const cartApi = {
  get(_id) {
    const url = `user/Cart?_id=${_id}`;
    return instance.get(url);
  },

  update(data) {
    const url = `user/Cart`;
    return instance.put(url, data);
  },
  delete(data) {
    const url = "user/Acc";
    return instance.delete(url, data);
  },
};
export default cartApi;
