import { useState, useEffect } from "react";
import { ProductAPI } from "@/service";
import { Loading } from "@/components";

const UpdateProduct = ({
  showModal,
  setShowModal,
  product,
  onUpdateProduct,
}) => {
  const [updatedProduct, setUpdatedProduct] = useState({
    name: "",
    price: "",
    type: "DRINK",
    description: "",
    imageUrl: null,
    imageFile: null,
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [errors, setErrors] = useState({
    price: "",
    image: "",
    backend: "",
  });
  const [loading, setLoading] = useState(false);

  const categories = [
    { _id: "FOOD", name: "FOOD" },
    { _id: "DRINK", name: "DRINK" },
  ];

  // Khởi tạo dữ liệu sản phẩm khi nhận prop
  useEffect(() => {
    if (product) {
      setUpdatedProduct({
        name: product.name || "",
        price: product.price?.toString() || "",
        type: product.type || "DRINK",
        description: product.description || "",
        imageUrl: product.imageUrl || null,
        imageFile: null,
      });
      setPreviewImage(product.imageUrl || null);
    }
  }, [product]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUpdatedProduct((prev) => ({
        ...prev,
        imageFile: file,
        imageUrl: URL.createObjectURL(file),
      }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({ price: "", image: "", backend: "" });

    // Validate
    if (!updatedProduct.price || isNaN(updatedProduct.price)) {
      setErrors((prev) => ({ ...prev, price: "Giá sản phẩm phải là số" }));
      setLoading(false);
      return;
    }

    try {
      // Tạo form data để gửi ảnh
      const formData = new FormData();
      formData.append("name", updatedProduct.name);
      formData.append("price", updatedProduct.price);
      formData.append("type", updatedProduct.type);
      formData.append("description", updatedProduct.description);

      // Chỉ gửi file nếu có thay đổi
      if (updatedProduct.imageFile) {
        formData.append("image", updatedProduct.imageFile);
      }

      // Gọi API cập nhật
      const response = await ProductAPI.updateProduct({
        ...updatedProduct,
        id: product.id,
      });

      // Gọi callback để cập nhật UI
      onUpdateProduct(response.data.result);
      setShowModal(false);
    } catch (error) {
      console.error("Error updating product", error);
      setErrors((prev) => ({
        ...prev,
        backend:
          error.response?.data?.message ||
          "Có lỗi xảy ra khi cập nhật sản phẩm",
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      setLoading(true);
      try {
        console.log("Check id:", product.id);
        await ProductAPI.deleteProductById(product.id);
        onUpdateProduct(null); // Truyền null để xác định đã xóa
        setShowModal(false);
      } catch (error) {
        console.error("Error deleting product", error);
        setErrors((prev) => ({
          ...prev,
          backend:
            error.response?.data?.message || "Có lỗi xảy ra khi xóa sản phẩm",
        }));
      } finally {
        setLoading(false);
      }
    }
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-4xl rounded-lg bg-white p-6">
        <h2 className="mb-6 text-center text-3xl font-bold">
          Cập nhật sản phẩm
        </h2>

        {loading && <Loading className="my-4" />}

        <form onSubmit={handleSubmit}>
          <div className="mb-4 grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Cột 1 */}
            <div>
              <div className="mb-4">
                <label className="block pb-2 text-lg font-medium">
                  Tên sản phẩm
                </label>
                <input
                  type="text"
                  value={updatedProduct.name}
                  onChange={(e) =>
                    setUpdatedProduct((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  required
                  className={`h-10 w-full rounded-md border ${
                    errors.backend.includes("tồn tại")
                      ? "border-red-500"
                      : "border-gray-300"
                  } p-2`}
                />
              </div>

              <div className="mb-4">
                <label className="block pb-2 text-lg font-medium">Loại</label>
                <select
                  value={updatedProduct.type}
                  onChange={(e) =>
                    setUpdatedProduct((prev) => ({
                      ...prev,
                      type: e.target.value,
                    }))
                  }
                  required
                  className="h-10 w-full rounded-md border border-gray-300 p-2"
                >
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Cột 2 */}
            <div>
              <div className="mb-4">
                <label className="block pb-2 text-lg font-medium">
                  Giá sản phẩm (VND)
                </label>
                <input
                  type="number"
                  value={updatedProduct.price}
                  onChange={(e) =>
                    setUpdatedProduct((prev) => ({
                      ...prev,
                      price: e.target.value,
                    }))
                  }
                  required
                  min="0"
                  className={`h-10 w-full rounded-md border ${
                    errors.price ? "border-red-500" : "border-gray-300"
                  } p-2`}
                />
                {errors.price && (
                  <p className="mt-1 text-sm text-red-500">{errors.price}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block pb-2 text-lg font-medium">Mô tả</label>
                <input
                  type="text"
                  value={updatedProduct.description}
                  onChange={(e) =>
                    setUpdatedProduct((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="h-10 w-full rounded-md border border-gray-300 p-2"
                />
              </div>
            </div>
          </div>

          {/* Ảnh sản phẩm */}
          <div className="mb-6">
            <label className="block pb-2 text-lg font-medium">
              Ảnh sản phẩm
            </label>
            <div className="flex items-center gap-4">
              <input
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                className={`rounded-md border ${
                  errors.image ? "border-red-500" : "border-gray-300"
                } p-2`}
              />
              {previewImage && (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="h-24 w-24 rounded-md object-cover"
                />
              )}
            </div>
            <p className="mt-1 text-sm text-gray-500">
              {updatedProduct.imageFile
                ? "Ảnh mới đã được chọn"
                : "Không chọn ảnh mới sẽ giữ nguyên ảnh cũ"}
            </p>
          </div>

          {/* Thông báo lỗi */}
          {errors.backend && (
            <div className="mb-4 rounded-md bg-red-100 p-3 text-red-700">
              {errors.backend}
            </div>
          )}

          {/* Nút hành động */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={handleDelete}
              className="h-10 rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
              disabled={loading}
            >
              Xóa sản phẩm
            </button>
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="h-10 rounded-md bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400"
              disabled={loading}
            >
              Hủy
            </button>
            <button
              type="submit"
              className="h-10 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? "Đang cập nhật..." : "Cập nhật"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
