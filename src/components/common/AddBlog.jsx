import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { uploadImageToCloudinary, BannerAPI } from "@/service";
import { toast } from "react-toastify";

const AddBlog = ({ onClose, onBannerAdded }) => {
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Thêm trạng thái loading

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const validateDates = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    if (startDate && startDateObj < today) {
      setError("Ngày bắt đầu không được ở trong quá khứ");
      return false;
    }

    if (endDate && startDate && endDateObj < startDateObj) {
      setError("Ngày kết thúc phải sau ngày bắt đầu");
      return false;
    }

    setError("");
    return true;
  };
  const handleStartDateChange = (e) => {
    const selectedDate = e.target.value;
    setStartDate(selectedDate);

    // Reset end date if it's before the new start date
    if (endDate && selectedDate && new Date(endDate) < new Date(selectedDate)) {
      setEndDate("");
    }
  };

  const handleEndDateChange = (e) => {
    const selectedDate = e.target.value;
    setEndDate(selectedDate);

    // Validate immediately when end date changes
    if (startDate && new Date(selectedDate) < new Date(startDate)) {
      setError("Ngày kết thúc phải sau ngày bắt đầu");
    } else {
      setError("");
    }
  };

  const getMinStartDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const getMinEndDate = () => {
    return startDate || getMinStartDate();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return; // Ngăn chặn submit nhiều lần

    setIsSubmitting(true); // Bắt đầu loading

    try {
      // Validate required fields
      if (!image || !startDate || !endDate) {
        setError("Vui lòng nhập đầy đủ các trường bắt buộc.");
        return;
      }

      // Validate dates
      if (!validateDates()) {
        return;
      }

      const imageUrl = await uploadImageToCloudinary(image);
      const response = await BannerAPI.addBanner({
        url: imageUrl,
        startDate,
        endDate,
      });

      onBannerAdded(response.data.result);
      onClose();
      toast.success("Thêm banner thành công!");
    } catch (err) {
      console.error("Error adding banner:", err);
      setError(
        err.response?.data?.message || "Thêm banner thất bại. Vui lòng thử lại."
      );
      toast.error("Thêm banner thất bại");
    } finally {
      setIsSubmitting(false); // Kết thúc loading dù thành công hay thất bại
    }
  };
  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="w-full max-w-4xl rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-center text-4xl font-bold">Thêm Banner</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Ảnh banner */}
            <div>
              <label className="mb-2 block text-xl font-medium text-gray-700">
                Ảnh banner
              </label>
              <span className="text-base">
                + Kích thước phù hợp:{" "}
                <span className="font-bold text-red-900">1920px * 576px</span>
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-2 w-full"
                required
              />
              {previewImage && (
                <div className="mt-4 relative">
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="h-48 w-auto max-w-full object-contain"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImage(null);
                      setPreviewImage(null);
                    }}
                    className="absolute top-0 right-0 bg-gray-800 text-white rounded-full p-1"
                  >
                    <FontAwesomeIcon icon={faTimes} size="xs" />
                  </button>
                </div>
              )}
            </div>

            {/* Ngày bắt đầu & kết thúc */}
            <div>
              <div className="mb-4">
                <label className="block text-xl font-medium text-gray-700">
                  Ngày bắt đầu hiển thị
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={startDate}
                    onChange={handleStartDateChange}
                    min={getMinStartDate()}
                    className="mt-2 w-full rounded border p-2 shadow-sm"
                    required
                  />
                  {startDate && (
                    <button
                      type="button"
                      onClick={() => setStartDate("")}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      <FontAwesomeIcon icon={faTimes} size="xs" />
                    </button>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-xl font-medium text-gray-700">
                  Ngày kết thúc hiển thị
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={endDate}
                    onChange={handleEndDateChange}
                    min={getMinEndDate()}
                    disabled={!startDate}
                    className={`mt-2 w-full rounded border p-2 shadow-sm ${!startDate ? "bg-gray-100" : ""}`}
                    required
                  />
                  {endDate && (
                    <button
                      type="button"
                      onClick={() => setEndDate("")}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      <FontAwesomeIcon icon={faTimes} size="xs" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {error && (
            <p className="mb-4 text-center text-red-500 font-semibold">
              {error}
            </p>
          )}

          <div className="flex justify-center space-x-40">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400"
              disabled={isSubmitting} // Vô hiệu hóa khi đang loading
            >
              Hủy
            </button>
            <button
              type="submit"
              className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-50 flex items-center justify-center min-w-[120px]"
              disabled={!!error || isSubmitting} // Vô hiệu hóa khi có lỗi hoặc đang loading
            >
              {isSubmitting ? (
                <>
                  <FontAwesomeIcon
                    icon={faSpinner}
                    className="animate-spin mr-2"
                  />
                  Đang xử lý...
                </>
              ) : (
                "Thêm Banner"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
