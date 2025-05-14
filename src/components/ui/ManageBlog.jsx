import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { AddBlog, UpdateBlog, Loading } from "@/components";
import { BannerAPI } from "@/service";

const ManageBlog = () => {
  const [bannerList, setBannerList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddFormVisible, setAddFormVisible] = useState(false);
  const [isEditFormVisible, setEditFormVisible] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [startDateFilter, setStartDateFilter] = useState("");
  const [endDateFilter, setEndDateFilter] = useState("");
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        setLoading(true);

        let response;
        if (
          statusFilter === "all" &&
          startDateFilter === "" &&
          endDateFilter === ""
        ) {
          response = await BannerAPI.getAllBanners();
        } else {
          const filter = {
            status: statusFilter === "all" ? "" : statusFilter,
            startDate: startDateFilter,
            endDate: endDateFilter,
          };
          response = await BannerAPI.getBannerByFilter(filter);
        }

        setBannerList(response.data.result || []);
      } catch (error) {
        console.error("Error fetching banners:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, [statusFilter, startDateFilter, endDateFilter]);

  const formatDate = (timestamp) => {
    if (!timestamp) return "-";
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(timestamp).toLocaleDateString("en-GB", options);
  };

  const filteredBanners = bannerList.filter((banner) =>
    banner.url.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const resetFilters = () => {
    setStatusFilter("all");
  };

  return (
    <div className="flex items-center justify-center bg-gray-50">
      <div className="h-[600px] w-full max-w-7xl rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <select
              className="rounded-md border border-gray-300 p-2"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="PENDING">PENDING</option>
              <option value="INACTIVE">INACTIVE</option>
              <option value="ACTIVE">ACTIVE</option>
            </select>

            <input
              type="date"
              className="rounded-md border border-gray-300 p-2"
              value={startDateFilter}
              onChange={(e) => setStartDateFilter(e.target.value)}
            />

            <input
              type="date"
              className="rounded-md border border-gray-300 p-2"
              value={endDateFilter}
              onChange={(e) => setEndDateFilter(e.target.value)}
            />

            <button
              onClick={() => {
                setStatusFilter("all");
                setStartDateFilter("");
                setEndDateFilter("");
              }}
              className="rounded-md bg-gray-500 px-4 py-2 text-white transition-transform duration-200 hover:scale-90"
            >
              Tất cả
            </button>
          </div>

          <div className="group relative">
            <button
              onClick={() => setAddFormVisible(true)}
              className="rounded-full bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
            <span className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 transform whitespace-nowrap rounded-md bg-gray-800 px-4 py-2 text-sm text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
              Thêm Banner
            </span>
          </div>
        </div>

        {loading ? (
          <div className="flex h-[255px] w-full items-center justify-center lg:h-[200px]">
            <Loading />
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg shadow-md">
            <table className="min-w-full table-fixed">
              <thead className="bg-gray-100">
                <tr>
                  <th className="w-[20%] px-4 py-3 text-center">Ảnh</th>
                  <th className="w-[15%] px-4 py-3 text-center">Trạng thái</th>
                  <th className="w-[20%] px-4 py-3 text-center">
                    Ngày bắt đầu
                  </th>
                  <th className="w-[20%] px-4 py-3 text-center">
                    Ngày kết thúc
                  </th>
                  <th className="w-[25%] px-4 py-3 text-center">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {filteredBanners.map((banner) => (
                  <tr key={banner.id} className="border-b">
                    <td className="flex justify-center px-4 py-6">
                      <img
                        src={banner.url}
                        alt={`Banner ${banner.id}`}
                        className="h-20 w-auto object-cover"
                      />
                    </td>
                    <td className="text-center px-4 py-6 font-semibold">
                      {banner.status}
                    </td>
                    <td className="text-center px-4 py-6">
                      {formatDate(banner.startDate)}
                    </td>
                    <td className="text-center px-4 py-6">
                      {formatDate(banner.endDate)}
                    </td>
                    <td className="px-4 py-6 text-center">
                      <div className="flex justify-center space-x-4 text-xl">
                        <div className="group relative">
                          <button
                            className="rounded-full px-3 py-1 text-blue-400 hover:bg-slate-300"
                            onClick={() => handleEditClick(banner)}
                          >
                            <FontAwesomeIcon icon={faPen} />
                          </button>
                          <span className="absolute bottom-full left-1/2 mb-4 -translate-x-1/2 transform whitespace-nowrap rounded-md bg-gray-800 px-2 py-2 text-sm text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                            Chỉnh sửa
                          </span>
                        </div>
                        <div className="group relative">
                          <button className="rounded-full px-3 py-1 text-red-400 hover:bg-slate-300">
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                          <span className="absolute bottom-full left-1/2 mb-4 -translate-x-1/2 transform whitespace-nowrap rounded-md bg-gray-800 px-2 py-2 text-sm text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                            Xóa Banner
                          </span>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal thêm */}
      {isAddFormVisible && (
        <AddBlog
          onClose={() => setAddFormVisible(false)}
          onBlogAdded={(newBanner) =>
            setBannerList((prev) => [newBanner, ...prev])
          }
        />
      )}

      {/* Modal cập nhật */}
      {isEditFormVisible && selectedBanner && (
        <UpdateBlog
          blog={selectedBanner}
          onClose={() => setEditFormVisible(false)}
          onBlogUpdated={(updatedBanner) =>
            setBannerList((prev) =>
              prev.map((b) => (b.id === updatedBanner.id ? updatedBanner : b))
            )
          }
        />
      )}
    </div>
  );
};

export default ManageBlog;
