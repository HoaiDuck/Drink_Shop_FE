import { useState } from "react";

const AddProduct = ({ showModal, setShowModal, onCreateProduct }) => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    type: "DRINK",
    description: "",
    imageUrl: null,
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [priceError, setPriceError] = useState("");
  const [imageError, setImageError] = useState("");
  const [backendError, setBackendError] = useState("");

  const categories = [
    { _id: "FOOD", name: "FOOD" },
    { _id: "DRINK", name: "DRINK" },
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProduct({ ...newProduct, imageUrl: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setPriceError("");
    setImageError("");
    setBackendError("");

    if (!newProduct.imageUrl) {
      setImageError("Hãy chọn ảnh cho sản phẩm");
      return;
    }

    try {
      await onCreateProduct(newProduct);
      setShowModal(false);
    } catch (error) {
      console.error("Error adding product", error);
      setBackendError(
        error.response?.data?.message || "Có lỗi xảy ra khi tạo sản phẩm"
      );
    }
  };

  const handleNumericInput = (value, field) => {
    if (/^\d*$/.test(value)) {
      setNewProduct({ ...newProduct, [field]: value });
    }
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-7xl rounded-lg bg-white p-6">
        <h2 className="mb-12 flex justify-center text-4xl font-bold">
          Tạo sản phẩm
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex space-x-6">
            <div className="w-2/3">
              <label className="block pb-2 text-xl font-medium">
                Tên sản phẩm
              </label>
              <input
                type="text"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
                required
                className={`h-12 w-full rounded-md border ${
                  backendError.includes("Sản phẩm đã tồn tại")
                    ? "border-red-500"
                    : "border-gray-300"
                } p-2`}
              />
              {backendError && (
                <p className="text-sm text-red-500">{backendError}</p>
              )}
              <label className="block pb-2 text-xl font-medium">Thực đơn</label>
              <select
                value={newProduct.type}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, type: e.target.value })
                }
                required
                className="h-12 w-1/2 rounded-md border border-gray-300 p-2"
              >
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-2/3">
              <label className="block pb-2 text-xl font-medium">
                Giá sản phẩm
              </label>
              <input
                type="text"
                value={newProduct.price}
                onChange={(e) => handleNumericInput(e.target.value, "price")}
                required
                className="h-12 w-full rounded-md border border-gray-300 p-2"
              />
              <label className="mt-4 block pb-2 text-xl font-medium">
                Description
              </label>
              <input
                type="text"
                value={newProduct.description}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, description: e.target.value })
                }
                className={`h-12 w-full rounded-md border ${
                  priceError ? "border-red-500" : "border-gray-300"
                } p-2`}
              />
              {priceError && (
                <p className="mt-1 text-sm text-red-500">{priceError}</p>
              )}
            </div>
            <div className="w-2/3">
              <label className="block pb-2 text-xl font-medium">
                Ảnh sản phẩm
              </label>
              <input
                type="file"
                onChange={handleImageChange}
                required
                accept="image/*"
                className={`w-full rounded-md border ${
                  imageError ? "border-red-500" : "border-gray-300"
                } p-2`}
              />
              {imageError && (
                <p className="mt-1 text-sm text-red-500">{imageError}</p>
              )}
              {previewImage && (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="mt-4 h-48 w-auto max-w-full object-contain"
                />
              )}
            </div>
          </div>
          <div className="mt-12 flex justify-center pt-6">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="mr-32 h-12 w-32 rounded-md bg-gray-300 px-4 py-2 text-black hover:bg-gray-400"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="h-12 w-36 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-800"
            >
              Tạo sản phẩm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
