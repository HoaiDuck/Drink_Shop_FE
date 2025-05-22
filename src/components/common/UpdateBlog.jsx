import { useState } from "react";
import { BannerAPI } from "@/service";
const UpdateBlog = ({ blog, onClose, onUpdateBanner }) => {
  const [startDate, setStartDate] = useState(
    blog.startDate?.slice(0, 10) || ""
  );
  const [endDate, setEndDate] = useState(blog.endDate?.slice(0, 10) || "");
  const [error, setError] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!startDate || !endDate) {
      setError("Vui lòng nhập đầy đủ ngày bắt đầu và ngày kết thúc.");
      return;
    }

    if (new Date(startDate) < new Date(today)) {
      setError("Ngày bắt đầu không được ở trong quá khứ.");
      return;
    }

    if (new Date(endDate) < new Date(startDate)) {
      setError("Ngày kết thúc không được trước ngày bắt đầu.");
      return;
    }

    setError("");
    await onUpdateBanner(blog.id, startDate, endDate);
  };

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="w-full max-w-xl rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-center text-2xl font-bold">
          Cập nhật thời gian hiển thị
        </h2>
        {error && <p className="mb-4 text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-lg font-medium">Ngày bắt đầu</label>
            <input
              type="date"
              value={startDate}
              min={today}
              onChange={(e) => setStartDate(e.target.value)}
              className="mt-1 w-full rounded border p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-medium">Ngày kết thúc</label>
            <input
              type="date"
              value={endDate}
              min={startDate || today}
              onChange={(e) => setEndDate(e.target.value)}
              className="mt-1 w-full rounded border p-2"
              required
            />
          </div>
          <div className="flex justify-center gap-8">
            <button
              type="button"
              onClick={onClose}
              className="rounded bg-gray-300 px-4 py-2 hover:bg-gray-400"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              Cập nhật
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBlog;
