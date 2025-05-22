import { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ModalProduct, Loading } from "@/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders } from "@fortawesome/free-solid-svg-icons";
import { ProductAPI } from "@/service";
import { toast } from "react-toastify";
import { CartContext } from "@/context";
import { Button, Popover, Space } from "antd";
const Menu = () => {
  const [activeCategory, setActiveCategory] = useState("DRINK");
  const categories = ["DRINK", "FOOD"];
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Menu");
  const { addItem } = useContext(CartContext);
  const applyPriceFilter = async (min, max) => {
    setIsLoading(true);
    try {
      const data = {
        minimumPrice: min,
        maxPrice: max,
      };
      const response = await ProductAPI.searchProduct(data);
      if (response.data.code === 200) {
        setProducts(response.data.result);
        setCurrentPage(1);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Lỗi khi lọc sản phẩm theo giá:", error);
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };
  const content = (
    <div className="flex flex-col gap-2 w-48">
      <button
        onClick={() => applyPriceFilter(0, 10000)}
        className="text-left px-3 py-1 hover:bg-[#f5f5f5] rounded-md"
      >
        ... → 10.000 VND
      </button>
      <button
        onClick={() => applyPriceFilter(10000, 20000)}
        className="text-left px-3 py-1 hover:bg-[#f5f5f5] rounded-md"
      >
        10.000 VND → 20.000 VND
      </button>
      <button
        onClick={() => applyPriceFilter(20000, 30000)}
        className="text-left px-3 py-1 hover:bg-[#f5f5f5] rounded-md"
      >
        20.000 VND → 30.000 VND
      </button>
      <button
        onClick={() => applyPriceFilter(30000, 40000)}
        className="text-left px-3 py-1 hover:bg-[#f5f5f5] rounded-md"
      >
        30.000 VND → 40.000 VND
      </button>
      <button
        onClick={() => applyPriceFilter(40000, null)}
        className="text-left px-3 py-1 hover:bg-[#f5f5f5] rounded-md"
      >
        40.000 VND → ...
      </button>
      <button
        onClick={async () => {
          setCurrentPage(1);
          setIsLoading(true);
          try {
            const response = await ProductAPI.getAllProducts();
            if (response.data.code === 200) {
              setProducts(response.data.result);
            } else {
              setProducts([]);
            }
          } catch (err) {
            console.error("Lỗi khi reset bộ lọc:", err);
            setProducts([]);
          } finally {
            setIsLoading(false);
          }
        }}
        className="text-left px-3 py-1 text-red-600 hover:bg-[#f5f5f5] rounded-md"
      >
        Xóa bộ lọc
      </button>
    </div>
  );
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await ProductAPI.getAllProducts();
        console.log("CHECK menu:", response.data.result);
        if (response.data.code == 200) {
          setProducts(response.data.result || []);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    console.log(
      "CHECK TYPE:",
      products.map((p) => p.type)
    );
    const category = queryParams.get("category");
    if (category && categories.includes(category)) {
      setActiveCategory(category);
    }
  }, [location.search]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    handleCategoryClick(category);
    setIsMenuOpen(false);
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    navigate(`/menu?category=${category}`);
    setCurrentPage(1);
  };

  const handleAddToCart = async (product) => {
    try {
      const data = {
        productId: product.id,
        quantity: 1,
      };
      addItem(data);
    } catch (error) {
      toast.error("Thêm vào giỏ hàng bị lỗi");
    }
  };
  const handleCloseModal = () => {
    setSelectedProduct(null);
    setQuantity(1);
  };

  // Lọc sản phẩm theo type ("FOOD" hoặc "DRINK")
  const filteredProducts = products.filter(
    (item) => item.type === activeCategory
  );

  // Phân trang
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="p-2 text-center lg:p-5">
      <h1 className="mb-4 text-4xl font-bold">
        Thực đơn Bamos<span className="text-[#C63402]">Coffee</span>
      </h1>

      <div className="relative mb-5">
        {/* Menu cho mobile */}
        <div className="flex items-center justify-center px-4 pt-2 md:hidden">
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="flex items-center gap-2 text-lg font-bold text-gray-800"
          >
            <FontAwesomeIcon icon={faSliders} />
            <span>{selectedCategory}</span>
          </button>
        </div>

        {isMenuOpen && (
          <div className="absolute left-0 top-full z-10 w-full bg-white shadow-lg">
            {categories.map((category) => (
              <button
                key={category}
                className={`w-full border border-b-2 px-4 py-2 text-left font-josefin text-xl font-bold transition-all ease-linear ${
                  activeCategory === category
                    ? "bg-[#633c02] text-white"
                    : "text-gray-800 hover:bg-[#d88453]"
                }`}
                onClick={() => handleCategorySelect(category)}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {/* Menu cho desktop */}
        <div className="hidden md:flex items-center justify-center gap-3 mt-8 font-bold">
          {categories.map((category) => (
            <button
              key={category}
              className={`border-[0.5px] border-gray-300 px-5 py-2 text-base transition-all ease-linear ${
                activeCategory === category
                  ? "border-[#633c02] bg-[#633c02] text-white"
                  : "bg-white text-gray-800"
              } hover:bg-[#d88453]`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}

          {/* Nút Lọc */}
          <Popover
            className="flex items-center gap-2 border-gray-300 bg-white px-4 py-2"
            content={content}
            title="Các mức giá"
            trigger="click"
          >
            <Button className=" border rounded-md  text-base text-gray-800 shadow-sm hover:bg-gray-50 hover:shadow-md transition-all duration-300">
              <img
                src="https://cdnv2.tgdd.vn/webmwg/2024/ContentMwg/images/category_v2/filter.png"
                alt="Filter Icon"
                className="w-4 h-4"
              />
              <span>Lọc</span>
            </Button>
          </Popover>
        </div>
      </div>

      {isLoading ? (
        <div className="flex h-[300px] items-center justify-center">
          <Loading />
        </div>
      ) : (
        <>
          {filteredProducts.length === 0 ? (
            <div className="py-10 text-center text-lg text-gray-500">
              Không có sản phẩm nào trong danh mục này.
            </div>
          ) : (
            <div className="mx-auto flex max-w-7xl flex-wrap justify-start gap-4">
              {currentProducts.map((item) => (
                <div
                  className="group relative flex h-[340px] w-[185px] flex-col justify-between border border-gray-300 bg-white p-3 text-center transition-shadow ease-linear hover:shadow-lg lg:h-[340px] lg:w-[250px]"
                  key={item.id}
                >
                  <div>
                    <Link to={`/detailfood/${item.id}`}>
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="mx-auto h-[216px] object-cover transition-transform ease-linear group-hover:scale-[1.18]"
                        onError={(e) => (e.target.src = "/fallback-image.png")}
                      />
                    </Link>
                  </div>

                  <div className="mb-12 mt-4">
                    <h6 className="text-sm font-bold text-[#333]">
                      <Link
                        to={`/detailfood/${item.id}`}
                        className="line-clamp-1 font-josefin text-xl font-bold text-[#00561e]"
                      >
                        {item.name.length > 20
                          ? item.name.substring(0, 20) + "..."
                          : item.name}
                      </Link>
                    </h6>

                    <div className="mb-2 font-josefin text-lg font-bold text-[#925802]">
                      <span>{item.price.toLocaleString("vi-VN")}đ</span>
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 w-full opacity-0 transition-opacity ease-linear group-hover:opacity-100">
                    <button
                      className="w-full bg-[#d88453] py-3 text-sm font-medium text-white transition-colors ease-linear hover:bg-[#633c02]"
                      onClick={() => handleAddToCart(item)}
                    >
                      Thêm vào giỏ hàng
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Phân trang */}
          <div className="mt-4 flex justify-center">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`mx-1 px-3 py-1 font-bold ${
                  currentPage === index + 1
                    ? "bg-[#633c02] text-white"
                    : "bg-white text-gray-800 hover:bg-[#d88453]"
                } border border-gray-300`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}

      {selectedProduct && (
        <ModalProduct
          selectedProduct={selectedProduct}
          quantity={quantity}
          setQuantity={setQuantity}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Menu;
