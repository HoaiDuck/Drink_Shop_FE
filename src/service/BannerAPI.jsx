import { instance } from "@/util";

const BannerAPI = {
  getAllBanners() {
    const url = "banners";
    return instance.get(url);
  },
  getBannerByFilter(data) {
    const url = "banners/filter";
    return instance.post(url, data);
  },
  addBanner(data) {
    const url = "banners";
    return instance.get(url, data);
  },
  setStatus(data) {
    const url = "banners";
    return instance.put(url, data);
  },
  deleteBannerByID(id) {
    const url = "banners/{id}";
    return instance.put(url, id);
  },
};
export default BannerAPI;
