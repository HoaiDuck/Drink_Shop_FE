import { instance } from "@/util";

const billApi = {
  getAll() {
    const url = "user/Bill";
    return instance.get(url);
  },
  get(_id) {
    const url = `user/Bill?_id=${_id}`;
    return instance.get(url);
  },
  add(data) {
    const url = `user/Bill`;
    return instance.post(url, data);
  },
  update(data) {
    const url = `user/Bill`;
    return instance.put(url, data);
  },
  delete(data) {
    const url = `user/Bill`;
    return instance.delete(url, data);
  },
};
export default billApi;
