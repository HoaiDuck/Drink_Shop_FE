import { useState } from "react";
import { uploadImageToCloudinary, BannerAPI } from "@/service";

const AddBlog = ({ onClose, onBannerAdded }) => {
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!image || !startDate || !endDate) {
      setError("Vui lòng nhập đầy đủ các trường bắt buộc.");
      return;
    }

    try {
      console.log("Check before cloudinary!");
      // Upload ảnh lên Cloudinary
      const imageUrl = await uploadImageToCloudinary(image);
      console.log("Check after cloudinary!");
      // Gửi dữ liệu banner lên API
      const response = await BannerAPI.create({
        url: imageUrl,
        startDate,
        endDate,
      });
      console.log("Check after call API!");
      onBannerAdded(response.result); // Gọi callback cập nhật danh sách
      onClose(); // Đóng modal sau khi thêm
    } catch (err) {
      setError("Thêm banner thất bại. Vui lòng thử lại.");
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
                <img
                  src={previewImage}
                  alt="Preview"
                  className="mt-4 h-48 w-auto max-w-full object-contain"
                />
              )}
            </div>

            {/* Ngày bắt đầu & kết thúc */}
            <div>
              <label className="block text-xl font-medium text-gray-700">
                Ngày bắt đầu hiển thị
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="mt-2 w-full rounded border p-2 shadow-sm"
                required
              />

              <label className="mt-6 block text-xl font-medium text-gray-700">
                Ngày kết thúc hiển thị
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="mt-2 w-full rounded border p-2 shadow-sm"
                required
              />
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
            >
              Hủy
            </button>
            <button
              type="submit"
              className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              Thêm Banner
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
