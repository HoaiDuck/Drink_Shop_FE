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
  deleteCartByID(data) {
    const url = `carts`;
    return instance.delete(url, {
      data: data,
    });
  },
};
export default CartAPI;
