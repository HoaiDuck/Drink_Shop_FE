import axiosClient from "./axiosClient";

const accountApi = {
  getAll(params) {
    const url = "/accountapi";
    return axiosClient.get(url, { params });
  },
  get(id) {
    const url = `/accountapi/${id}`;
    return axiosClient.get(url);
  },
  add(data) {
    const url = "/accountapi";
    return axiosClient.post(url, data);
  },
  update(data) {
    const url = `/accountapi/${data.id}`;
    return axiosClient.put(url, data);
  },
  delete(id) {
    const url = `/accountapi/${id}`;
    return axiosClient.delete(url);
  },
};
export default accountApi;
