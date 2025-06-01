import { instance } from "@/util";

const AccountAPI = {
  getAllAccounts() {
    const url = "accounts/users";
    return instance.get(url);
  },
  getAccountById(id) {
    const url = `accounts/${id}`;
    return instance.get(url, id);
  },
  setAccountStatus(data){
    const url = `accounts/setStatus`;
    return instance.put(url, data);
  },
  searchAccount({ name = "", username = "", phoneNumber = "", deleted = "" } = {}) {
  const params = new URLSearchParams();

  if (name !== undefined && name !== "") {
    params.append("name", name);
  }

  if (username !== undefined && username !== "") {
    params.append("username", username);
  }

  if (phoneNumber !== undefined && phoneNumber !== "") {
    params.append("phoneNumber", phoneNumber);
  }

  if (deleted !== undefined && deleted !== "") {
    params.append("deleted", deleted);
  }

  return instance.get(`accounts/filter?${params.toString()}`);
}
};
export default AccountAPI;
