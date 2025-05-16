import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faPen,
  faTrash,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { AddBlog, UpdateBlog, Loading } from "@/components";
import { BannerAPI } from "@/service";
import { toast } from "react-toastify";

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
  const [dateError, setDateError] = useState("");

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        setLoading(true);

        // Validate dates before fetching
        if (
          startDateFilter &&
          endDateFilter &&
          new Date(endDateFilter) < new Date(startDateFilter)
        ) {
          setDateError("Ngày kết thúc phải sau ngày bắt đầu");
          return;
        }
        setDateError("");

        let response;
        if (statusFilter === "all" && !startDateFilter && !endDateFilter) {
          response = await BannerAPI.getAllBanners();
        } else if (statusFilter === "all") {
          const filter = { startDate: startDateFilter, endDate: endDateFilter };
          response = await BannerAPI.getBannerByFilter(filter);
        } else {
          const filter = {
            status: statusFilter,
            startDate: startDateFilter,
            endDate: endDateFilter,
          };
          response = await BannerAPI.getBannerByFilter(filter);
        }
        setBannerList(response.data.result || []);
      } catch (error) {
        console.error("Error fetching banners:", error);
        toast.error("Lỗi khi tải danh sách banner");
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, [statusFilter, startDateFilter, endDateFilter]);

  const handleStartDateChange = (e) => {
    const selectedDate = e.target.value;
    setStartDateFilter(selectedDate);

    // Reset end date if it's before the new start date
    if (
      endDateFilter &&
      selectedDate &&
      new Date(endDateFilter) < new Date(selectedDate)
    ) {
      setEndDateFilter("");
    }
  };

  const handleEndDateChange = (e) => {
    const selectedDate = e.target.value;
    if (startDateFilter && new Date(selectedDate) < new Date(startDateFilter)) {
      setDateError("Ngày kết thúc phải sau ngày bắt đầu");
      return;
    }
    setDateError("");
    setEndDateFilter(selectedDate);
  };

  const getMinEndDate = () => {
    return startDateFilter || "";
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "-";
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(timestamp).toLocaleDateString("en-GB", options);
  };

  const filteredBanners = bannerList.filter((banner) =>
    banner.url.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditClick = (banner) => {
    setSelectedBanner(banner);
    setEditFormVisible(true);
  };

  const handleDeleteClick = async (bannerId) => {
    try {
      console.log("Check del Banner:", bannerId);
      await BannerAPI.deleteBannerByID(bannerId);
      setBannerList(bannerList.filter((banner) => banner.id !== bannerId));
      toast.success("Xóa banner thành công");
    } catch (error) {
      console.error("Error deleting banner:", error);
      toast.error("Lỗi khi xóa banner");
    }
  };

  const handleResetFilters = () => {
    setStatusFilter("all");
    setStartDateFilter("");
    setEndDateFilter("");
    setSearchTerm("");
    setDateError("");
  };

  return (
    <div className="flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-7xl rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <input
              type="text"
              placeholder="Tìm kiếm bằng URL"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="rounded-md border border-gray-300 p-2"
            />

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

            <div className="relative">
              <input
                type="date"
                className="rounded-md border border-gray-300 p-2"
                value={startDateFilter}
                onChange={handleStartDateChange}
              />
              {startDateFilter && (
                <button
                  onClick={() => {
                    setStartDateFilter("");
                    if (endDateFilter) setEndDateFilter("");
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  <FontAwesomeIcon icon={faTimes} size="xs" />
                </button>
              )}
            </div>

            <div className="relative">
              <input
                type="date"
                className={`rounded-md border ${dateError ? "border-red-500" : "border-gray-300"} p-2`}
                value={endDateFilter}
                onChange={handleEndDateChange}
                min={getMinEndDate()}
                disabled={!startDateFilter}
              />
              {endDateFilter && (
                <button
                  onClick={() => setEndDateFilter("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  <FontAwesomeIcon icon={faTimes} size="xs" />
                </button>
              )}
            </div>

            <button
              onClick={handleResetFilters}
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

        {dateError && (
          <div className="mb-4 text-center text-red-500">{dateError}</div>
        )}

        {loading ? (
          <div className="flex h-[255px] w-full items-center justify-center lg:h-[200px]">
            <Loading />
          </div>
        ) : (
          <div className="overflow-hidden rounded-lg shadow-md">
            <div className="max-h-[500px] overflow-y-auto">
              <table className="min-w-full table-fixed">
                <thead className="sticky top-0 bg-gray-100 z-10">
                  <tr>
                    <th className="w-[20%] px-4 py-3 text-center">Ảnh</th>
                    <th className="w-[15%] px-4 py-3 text-center">
                      Trạng thái
                    </th>
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
                    <tr key={banner.id} className="border-b hover:bg-gray-50">
                      <td className="flex justify-center px-4 py-6">
                        <img
                          src={banner.url}
                          alt={`Banner ${banner.id}`}
                          className="h-20 w-auto object-cover"
                        />
                      </td>
                      <td className="px-4 py-6 text-center font-semibold">
                        <span
                          className={`inline-block rounded-full px-3 py-1 text-sm 
                          ${
                            banner.status === "ACTIVE"
                              ? "bg-green-100 text-green-800"
                              : banner.status === "INACTIVE"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {banner.status}
                        </span>
                      </td>
                      <td className="px-4 py-6 text-center">
                        {formatDate(banner.startDate)}
                      </td>
                      <td className="px-4 py-6 text-center">
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
                            <button
                              className="rounded-full px-3 py-1 text-red-400 hover:bg-slate-300"
                              onClick={() => handleDeleteClick(banner.id)}
                            >
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
          </div>
        )}

        {isAddFormVisible && (
          <AddBlog
            onClose={() => setAddFormVisible(false)}
            onBannerAdded={(newBanner) => {
              setBannerList((prev) => [newBanner, ...prev]);
            }}
          />
        )}

        {isEditFormVisible && selectedBanner && (
          <UpdateBlog
            blog={selectedBanner}
            onClose={() => setEditFormVisible(false)}
            onBlogUpdated={(updatedBanner) => {
              setBannerList((prev) =>
                prev.map((b) => (b.id === updatedBanner.id ? updatedBanner : b))
              );
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ManageBlog;
