import { instance } from "@/util";

const CartAPI = {
  getAllCartItems() {
    const url = "carts";
    return instance.get(url);
  },
  addCartItem(data) {
    const url = "carts";
    return instance.post(url, data);
  },
  updateItemQuantity(data) {
    const url = "carts";
    return instance.put(url, data);
  },
  deleteBannerByID(data) {
    const url = `carts`;
    return instance.delete(url, data);
  },
};
export default CartAPI;
