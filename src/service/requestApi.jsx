import { instance } from "@/util";

const requestApi = {
  getAll(data) {
    const url = "user/admin/request";
    return instance.get(url, data);
  },
  add(data) {
    const url = "user/admin/request";
    return instance.post(url, data);
  },
  update(data) {
    const url = `user/admin/request`;
    return instance.put(url, data);
  },
  delete(data) {
    const url = `user/admin/request`;
    return instance.delete(url, data);
  },
  getTypeAll(data) {
    const url = "user/admin/reqtype";
    return instance.get(url, data);
  },
  addType(data) {
    const url = "user/admin/reqtype";
    return instance.post(url, data);
  },
  updateType(data) {
    const url = `user/admin/reqtype`;
    return instance.put(url, data);
  },
  deleteType(data) {
    const url = `user/admin/reqtype`;
    return instance.delete(url, data);
  },
};
export default requestApi;
