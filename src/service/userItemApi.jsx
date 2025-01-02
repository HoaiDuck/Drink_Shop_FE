import { instance } from "@/util";

const userItemApi = {
  get(data) {
    console.log(">>>CHECK data:", data._id, "AND :", data.type);
    const url = `user/sale/userItem?_id=${data._id}&type=${data.type}`;
    return instance.get(url);
  },

  add(data) {
    const url = "user/sale/userItem";
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
export default userItemApi;
