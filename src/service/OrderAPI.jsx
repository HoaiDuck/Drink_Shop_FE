import { instance } from "@/util";

const OrderAPI = {
  getAccountOrder() {
    const url = "orders";
    return instance.get(url);
  },
  createOrder(data) {
    const url = "orders";
    return instance.post(url, data);
  },
  getUserOrder(accountId) {
    const url = "account/{accountId}";
    return instance.get(url, accountId);
  },
  makeRevenue(data) {
    const url = "orders/revenue";
    return instance.post(url, data);
  },
  setStatus(data) {
    const url = "orders";
    return instance.get(url, data);
  },
  getOrderByID(orderID) {
    const url = "orders/{orderID}";
    return instance.put(url, orderID);
  },
};
export default OrderAPI;
