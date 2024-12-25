import React, { useState } from "react";
import { itemApi } from "@/service"; // Đường dẫn này điều chỉnh theo cấu trúc thư mục của bạn.

const ImageUpload = ({ onImageSelect }) => {
  const [previewImage, setPreviewImage] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        onImageSelect(reader.result); // Truyền URL Base64 lên component cha
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-64 h-96 bg-gray-300 flex flex-col justify-center items-center rounded-md overflow-hidden">
      {previewImage ? (
        <img
          src={previewImage}
          alt="Preview"
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="flex flex-col items-center">
          <div className="flex justify-center items-center w-12 h-12 bg-black rounded-full text-white">
            ⬆️
          </div>
          <p className="text-gray-500 mt-4 text-center">Select a file</p>
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        className="mt-4"
        onChange={handleFileChange}
      />
    </div>
  );
};

const Products = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    artist: "",
    category: "",
    price: "",
    productCode: "",
    image: null, // Thêm trường lưu ảnh
  });
  const [loading, setLoading] = useState(false); // Trạng thái gửi dữ liệu

  // Xử lý thay đổi form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Xử lý ảnh được chọn
  const handleImageSelect = (image) => {
    setFormData({ ...formData, image });
  };

  // Xác thực dữ liệu
  const validateForm = () => {
    const { title, description, artist, category, price, productCode } =
      formData;
    if (!title || !description || !artist || !category || !price || !productCode) {
      alert("Vui lòng nhập đầy đủ thông tin.");
      return false;
    }
    return true;
  };

  // Gửi dữ liệu
  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await itemApi.add(formData);
      console.log("Thêm sản phẩm thành công:", response.data);
      alert("Thêm sản phẩm thành công!");

      // Reset form
      setFormData({
        title: "",
        description: "",
        artist: "",
        category: "",
        price: "",
        productCode: "",
        image: null,
      });
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm:", error);
      alert("Thêm sản phẩm thất bại! Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center p-8">
      <div className="w-1/3 flex flex-col items-center border p-4">
        <ImageUpload onImageSelect={handleImageSelect} />
      </div>
      <div className="w-2/3 px-8">
        <div className="mb-4">
          <label className="block mb-2 font-bold">Title</label>
          <input
            type="text"
            name="title"
            placeholder="Add title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-bold">Description</label>
          <textarea
            name="description"
            placeholder="Add description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-bold">Artist</label>
          <input
            type="text"
            name="artist"
            placeholder="Artist name"
            value={formData.artist}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-bold">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="">-</option>
            <option value="Art">Art</option>
            <option value="Music">Music</option>
            <option value="Books">Books</option>
          </select>
        </div>

        <div className="flex gap-4 mb-4">
          <div className="w-1/2">
            <label className="block mb-2 font-bold">Price</label>
            <input
              type="text"
              name="price"
              placeholder="Add price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="w-1/2">
            <label className="block mb-2 font-bold">Product code</label>
            <select
              name="productCode"
              value={formData.productCode}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Add product code</option>
              <option value="P001">P001</option>
              <option value="P002">P002</option>
            </select>
          </div>
        </div>
        <button
          onClick={handleSubmit}
          className="bg-gray-300 px-6 py-2 rounded-md font-bold"
          disabled={loading} // Vô hiệu hóa khi đang tải
        >
          {loading ? "Processing..." : "Post"}
        </button>
      </div>
    </div>
  );
};

export default Products;
