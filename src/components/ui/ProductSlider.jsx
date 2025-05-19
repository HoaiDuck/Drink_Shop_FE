import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import ModalProduct from "./ModalProduct";
import { ProductAPI, CartAPI } from "@/service";
import { toast } from "react-toastify";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Loading } from "@/components";

const ProductSlider = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const swiperRef = useRef(null);
  const [showArrows, setShowArrows] = useState(false);
  const [loading, setLoading] = useState(true);

  const [hasAnimated, setHasAnimated] = useState(false);
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.5 });

  useEffect(() => {
    if (inView && !hasAnimated) {
      controls.start("visible");
      setHasAnimated(true); // Đánh dấu là đã chạy
    }
  }, [controls, inView, hasAnimated]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1); // hôm qua

        const past = new Date(yesterday);
        past.setDate(yesterday.getDate() - 29); // 29 ngày trước hôm qua
        const format = (date) => date.toISOString().split("T")[0]; // yyyy-mm-dd
        const time = {
          startDate: format(past),
          endDate: format(yesterday),
        };
        setLoading(true);
        const response = await ProductAPI.getTopSellingProduct(time);
        console.log(">>CHECK product Response:", response);
        if (response.data.code === 200) {
          setProducts(response.data.result);
        } else {
          console.error("Failed to fetch products.");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (product) => {
    try {
      const data = {
        productId: product.id,
        quantity: quantity,
      };
      const response = await CartAPI.addCartItem(data);
      if (response.data.code == 200) {
        toast.success("Thêm vào giỏ hàng thành công");
      } else {
        toast.success("Thêm vào giỏ hàng thất bại");
      }
    } catch (error) {
      toast.error("Thêm vào giỏ hàng bị lỗi");
    }
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setQuantity(1);
  };

  return (
    <div
      className="product-slider relative mx-auto mb-20 max-w-screen-xl overflow-visible bg-white px-2 py-10 lg:px-5"
      ref={ref}
      onMouseEnter={() => setShowArrows(true)}
      onMouseLeave={() => setShowArrows(false)}
    >
      <div className="slider-title my-6 text-center text-4xl font-bold text-[#633c02]">
        Sản phẩm bán chạy
      </div>
      <div className="divider mx-auto mb-14 h-1 w-12 bg-[#633c02]"></div>
      {loading ? (
        // Hiển thị phần loading nếu dữ liệu chưa được tải
        <div className="flex h-[255px] w-full items-center justify-center lg:h-[350px]">
          <Loading /> {/* Hiển thị Loading khi đang tải dữ liệu */}
        </div>
      ) : (
        <Swiper
          ref={swiperRef}
          spaceBetween={0}
          slidesPerView={5}
          navigation={{
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
          }}
          breakpoints={{
            375: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
          }}
        >
          {products.map((product, index) => (
            <SwiperSlide key={product.id}>
              <motion.div
                className="product-card group relative flex h-[350px] flex-col justify-between border-l border-r border-[#e7e6e6] bg-white p-4 text-center hover:border-l-2 hover:border-r-2 hover:border-t-2 hover:border-[#d5d5d5]"
                initial="hidden"
                animate={controls}
                variants={{
                  hidden: { opacity: 0, y: 100 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      delay: index * 0.2,
                      type: "spring",
                      stiffness: 80,
                    },
                  },
                }}
              >
                <div className="product-image">
                  <Link to={`/detailfood/${product.id}`}>
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="mx-auto h-[223px] transform transition-transform duration-300 ease-in-out group-hover:scale-110"
                    />
                  </Link>
                </div>
                <div className="product-bubble absolute right-4 top-2 rounded-full bg-[#ff4d4f] px-2 pb-1 pt-2 font-josefin text-sm text-white">
                  HOT
                </div>
                <div className="product-info mb-10 mt-2">
                  <h6 className="product-name font-josefin text-xl line-clamp-1 font-bold text-[#00561e]">
                    <Link to={`/detailfood/${product.id}`}>
                      {product.name.split(" ").slice(0, 4).join(" ")}
                      {/* Giới hạn 20 từ */}
                      {product.name.split(" ").length > 4 && "..."}{" "}
                      {/* Hiển thị ... nếu vượt quá 20 từ */}
                    </Link>
                  </h6>

                  <div className="product-price">
                    <span className="font-josefin text-base font-bold text-[#9d6817]">
                      {product.price.toLocaleString("vi-VN")} đ
                    </span>
                  </div>
                </div>

                <div className="red-button absolute bottom-0 left-0 w-full opacity-100 lg:opacity-0 transition-opacity duration-300 ease-in-out lg:group-hover:opacity-100">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full cursor-pointer bg-[#d88453] py-3 text-sm font-semibold text-white transition-colors duration-300 ease-in-out hover:bg-[#633c02]"
                  >
                    Thêm vào giỏ hàng
                  </button>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      <div
        className="swiper-button-prev"
        style={{
          backgroundColor: "rgba(78, 78, 78, 0.5)",
          color: "#fff",
          width: "40px",
          height: "70px",
          marginTop: "10px",
          marginLeft: "10px",
          display: showArrows ? "flex" : "none", // Hiển thị khi hover
          justifyContent: "center", // Căn giữa theo chiều ngang
          alignItems: "center", // Căn giữa theo chiều dọc
          fontSize: "30px", // Kích thước chữ
        }}
        onClick={() => swiperRef.current?.swiper.slidePrev()}
      ></div>

      <div
        className="swiper-button-next"
        style={{
          backgroundColor: "rgba(78, 78, 78, 0.5)",
          color: "#fff",
          width: "40px",
          height: "70px",
          marginTop: "10px",
          marginRight: "10px",
          display: showArrows ? "flex" : "none", // Hiển thị khi hover
          justifyContent: "center", // Căn giữa theo chiều ngang
          alignItems: "center", // Căn giữa theo chiều dọc
          fontSize: "30px", // Kích thước chữ
        }}
        onClick={() => swiperRef.current?.swiper.slideNext()}
      ></div>

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

export default ProductSlider;
