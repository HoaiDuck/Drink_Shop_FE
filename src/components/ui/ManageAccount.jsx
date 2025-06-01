import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPen, faToggleOn, faToggleOff } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { Loading } from "@/components";
import { AccountAPI } from "@/service";

const ManageAccount = () => {
  const [accounts, setAccounts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [searchType, setSearchType] = useState("name");

  useEffect(() => {
    fetchAccounts();
  }, []);

  useEffect(() => {
    setSearchTerm("");
  }, [searchType]);

  useEffect(() => {
    if (searchTerm || selectedStatus !== null) {
      handleSearchAndFilter();
    } else {
      fetchAccounts();
    }
  }, [searchTerm, selectedStatus]);

  useEffect(() => {
    if (searchTerm) {
      setSelectedStatus(null);
    }
  }, [searchTerm]);

  useEffect(() => {
    if (selectedStatus !== null) {
      setSearchTerm("");
    }
  }, [selectedStatus]);

  const fetchAccounts = async () => {
    setLoading(true);
    try {
      const response = await AccountAPI.getAllAccounts();
      setAccounts(response.data.result || []);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách tài khoản:", error);
    } finally {
      setLoading(false);
    }
  };
const handleSearchAndFilter = async () => {
  setLoading(true);
  try {
    const params = {
      phoneNumber: searchType === 'phoneNumber' ? searchTerm : '',
      username: searchType === 'username' ? searchTerm : '',
      name: searchType === 'name' ? searchTerm : '',
      deleted: selectedStatus === null ? '' : 
              selectedStatus === true ? 'false' : 'true'
    };

    const response = await AccountAPI.searchAccount(params);
    // Luôn set kết quả từ API, kể cả khi rỗng
    setAccounts(response.data.result || []);
    
    // Hiển thị thông báo nếu không có kết quả
    if (response.data.result && response.data.result.length === 0) {
      toast.info("Không tìm thấy tài khoản phù hợp");
    }
  } catch (error) {
    console.error("Lỗi khi tìm kiếm/lọc tài khoản:", error);
    // Khi có lỗi, set danh sách rỗng thay vì gọi fetchAccounts()
    setAccounts([]);
    toast.error("Có lỗi xảy ra khi tìm kiếm");
  } finally {
    setLoading(false);
  }
};

  const toggleIsActive = async (id, currentDeletedStatus) => {
    try {
      const updated = {
        id: id,
        deleted: !currentDeletedStatus,
      };
      await AccountAPI.setAccountStatus(updated);
      fetchAccounts();
      toast.success("Cập nhật trạng thái thành công");
    } catch (error) {
      console.error("Failed to update status", error);
      toast.error("Cập nhật trạng thái thất bại");
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-50">
      <div className="h-[600px] w-full max-w-7xl rounded-lg bg-white p-4 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center">
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="mr-2 rounded-md border border-gray-300 p-2"
            >
              <option value="name">Tên</option>
              <option value="username">Username</option>
              <option value="phoneNumber">Số điện thoại</option>
            </select>
            
            <input
              type="text"
              placeholder={`Tìm kiếm theo ${searchType === 'name' ? 'tên' : searchType === 'username' ? 'username' : 'số điện thoại'}`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-72 rounded-md border border-gray-300 p-2"
            />
            
            <span className="ml-8 pt-3 font-josefin text-2xl font-bold">Lọc:</span>
            <select
              className="ml-4 rounded-md border border-gray-300 p-2"
              value={selectedStatus ?? ""}
              onChange={(e) => 
                setSelectedStatus(e.target.value === "" ? null : e.target.value === "true")
              }
            >
              <option value="">Tất cả</option>
              <option value="true">Đang hoạt động</option>
              <option value="false">Tắt hoạt động</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex h-[255px] w-full items-center justify-center lg:h-[300px]">
            <Loading />
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg shadow-md">
           

 <table className="min-w-full table-auto">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-center">Tên người dùng</th>
                  <th className="px-4 py-3 text-center">Số điện thoại</th>
                  <th className="px-4 py-3 text-center">Username</th>
                  <th className="px-4 py-3 text-center">Vai trò</th>
                  <th className="px-4 py-3 text-center">Hoạt động</th>
                </tr>
              </thead>
              <tbody>
                {accounts.map((account) => (
                  <tr key={account.id} className="border-b">
                    <td className="px-4 py-3 text-center font-bold">{account.name || account.username}</td>
                    <td className="px-4 py-3 text-center">{account.phoneNumber}</td>
                    <td className="px-4 py-3 text-center">{account.username}</td>
                    <td className="px-4 py-3 text-center">{account.role}</td>
                    <td className="px-4 py-3 text-center">
                      <div className="group relative flex justify-center">
                        {account.role === "ADMIN" ? (
                          <FontAwesomeIcon
                            icon={account.deleted ? faToggleOff : faToggleOn}
                            className="text-gray-300 text-2xl cursor-not-allowed"
                          />
                        ) : (
                          <>
                            <FontAwesomeIcon
                              icon={account.deleted ? faToggleOff : faToggleOn}
                              className={
                                account.deleted
                                  ? "cursor-pointer text-gray-400 text-2xl"
                                  : "cursor-pointer text-green-500 text-2xl"
                              }
                              onClick={() => toggleIsActive(account.id, account.deleted)}
                            />
                            <span className="absolute top-full mt-1 left-1/2 transform -translate-x-1/2 rounded bg-gray-800 px-2 py-1 text-sm text-white opacity-0 transition-opacity group-hover:opacity-100 z-10">
                              {account.deleted ? "Kích hoạt" : "Vô hiệu hóa"}
                            </span>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageAccount;
