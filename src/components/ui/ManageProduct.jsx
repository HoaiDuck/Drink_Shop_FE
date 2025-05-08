import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faPen,
  faEye,
  faEyeSlash,
  faFire,
} from "@fortawesome/free-solid-svg-icons";
import {
  AddProduct,
  UpdateProduct,
  Loading,
  CloudinaryImage,
} from "@/components";
import { ProductAPI, cloudinary, uploadImageToCloudinary } from "@/service";

const ManageProduct = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [displayTypeFilter, setDisplayTypeFilter] = useState("all");

  // Hàm fetch tất cả sản phẩm
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await ProductAPI.getAllProducts();
      const productsData = Array.isArray(response?.data.result)
        ? response?.data.result
        : [];
      setProducts(productsData);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Hàm search sản phẩm theo loại
  const searchProductsByType = async (type) => {
    try {
      setLoading(true);
      const response = await ProductAPI.searchProduct({
        type: type,
      });
      console.log("CHECK type product:", type);
      const productsData = Array.isArray(response?.data.result)
        ? response?.data.result
        : [];
      setProducts(productsData);
    } catch (error) {
      console.error("Error searching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Xử lý khi categoryFilter thay đổi
  useEffect(() => {
    if (categoryFilter === "all") {
      fetchProducts();
    } else {
      searchProductsByType(categoryFilter);
    }
  }, [categoryFilter]);

  // Xử lý khi modal đóng
  useEffect(() => {
    if (!showAddModal && !showUpdateModal) {
      if (categoryFilter === "all") {
        fetchProducts();
      } else {
        searchProductsByType(categoryFilter);
      }
    }
  }, [showAddModal, showUpdateModal]);

  const handleCreateProduct = async (product) => {
    try {
      setLoading(true);
      const imageUrl = await uploadImageToCloudinary(product.imageUrl);
      product.imageUrl = imageUrl;
      const response = await ProductAPI.createProduct(product);
      setProducts([...products, response.data.result]);
      setShowAddModal(false);
    } catch (error) {
      console.error(
        "Error creating product:",
        error?.response?.data?.message || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  // Lọc sản phẩm theo tên (phía client)
  const filteredProducts = products.filter(
    (product) =>
      product &&
      typeof product.name === "string" &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setShowUpdateModal(true);
  };

  return (
    <div className="flex items-center justify-center bg-gray-50">
      <div className="h-[600px] w-full max-w-7xl rounded-lg bg-white p-6 shadow-lg">
        {/* Tìm kiếm sản phẩm */}
        <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <input
            type="text"
            placeholder="Tìm kiếm bằng tên sản phẩm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-72 rounded-md border border-gray-300 p-2"
          />
          <div className="flex gap-4">
            <select
              className="rounded-md border border-gray-300 p-2"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">Tất cả thực đơn</option>
              <option value="FOOD">FOOD</option>
              <option value="DRINK">DRINK</option>
            </select>
            <button
              onClick={() => {
                setCategoryFilter("all");
                setSearchTerm("");
              }}
              className="rounded-md bg-gray-500 px-4 pb-2 pt-3 font-josefin text-xl text-white transition-transform duration-200 hover:scale-90"
            >
              Tất cả
            </button>
          </div>
          <div className="group relative">
            <button
              onClick={() => setShowAddModal(true)}
              className="rounded-full bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
            <span className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 transform whitespace-nowrap rounded-md bg-gray-800 px-4 py-2 text-sm text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
              Tạo sản phẩm
            </span>
          </div>
        </div>

        {/* Các modal và phần hiển thị sản phẩm giữ nguyên như cũ */}
        {showAddModal && (
          <AddProduct
            showModal={showAddModal}
            setShowModal={setShowAddModal}
            onCreateProduct={handleCreateProduct}
          />
        )}

        {selectedProduct && showUpdateModal && (
          <UpdateProduct
            showModal={showUpdateModal}
            setShowModal={setShowUpdateModal}
            product={selectedProduct}
            onUpdateProduct={(updatedProduct) => {
              setProducts((prevProducts) =>
                prevProducts
                  .filter((p) => p && p._id)
                  .map((p) =>
                    p._id === updatedProduct._id ? updatedProduct : p
                  )
              );
              setShowUpdateModal(false);
            }}
          />
        )}

        {loading ? (
          <div className="flex h-[255px] w-full items-center justify-center lg:h-[400px]">
            <Loading />
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg shadow-md max-h-[500px]">
            <table className="min-w-full table-auto">
              {/* Phần table header và body giữ nguyên */}
              <thead className="sticky top-0 bg-gray-100 z-10">
                <tr>
                  <th className="w-[150px] px-4 py-3 text-center">Ảnh</th>
                  <th className="w-[300px] px-4 py-3 text-left">
                    Tên sản phẩm
                  </th>
                  <th className="w-[200px] px-4 py-3 text-center">Loại</th>
                  <th className="w-[150px] px-4 py-3 text-center">Giá</th>
                  <th className="w-[150px] px-4 py-3 text-center">Mô tả</th>
                  <th className="w-[130px] px-4 py-3 text-center">Sửa</th>
                </tr>
              </thead>
              <tbody className="overflow-y-auto">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-gray-50">
                    <td className="w-[150px] px-4 py-4 text-center">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="h-20 w-auto rounded-md object-cover mx-auto"
                      />
                    </td>
                    <td className="w-[300px] px-4 py-4 font-semibold">
                      {product.name}
                    </td>
                    <td className="w-[200px] px-4 py-4 text-center">
                      {product.type}
                    </td>
                    <td className="w-[150px] px-4 py-4 text-center">
                      {product.price.toLocaleString()} ₫
                    </td>
                    <td className="w-[150px] px-4 py-4 text-center">
                      {product.description}
                    </td>
                    <td className="w-[130px] px-4 py-4 text-center text-xl">
                      <div className="group relative">
                        <button
                          className="rounded-full px-3 py-1 text-blue-400 hover:bg-slate-300"
                          onClick={() => handleEditProduct(product)}
                        >
                          <FontAwesomeIcon icon={faPen} />
                        </button>
                        <span className="absolute bottom-full left-1/3 mb-4 -translate-x-1/2 transform whitespace-nowrap rounded-md bg-gray-800 px-2 py-2 text-sm text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                          Chỉnh sửa
                        </span>
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

export default ManageProduct;
