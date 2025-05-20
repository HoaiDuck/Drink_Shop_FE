import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBasketShopping } from "@fortawesome/free-solid-svg-icons";
import { ProductAPI } from "@/service";
import { CartAPI } from "@/service";
import { toast } from "react-toastify";
import { Loading, Review, RelatedProduct } from "@/components";
import { CartContext } from "@/context";
const DetailFood = () => {
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { addItem } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await ProductAPI.getProductById(id);
        if (response.data.code == 200) {
          const data = response.data.result;
          const mappedProduct = {
            id: data.id,
            name: data.name,
            imageUrl: data.imageUrl,
            price: data.price,
            description: data.description,
            quantity: data.quantity,
          };
          setProduct(mappedProduct);
        } else {
          console.error("Sản phẩm không tồn tại hoặc API lỗi.");
        }
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);
  if (loading) {
    return (
      <div className="flex h-[255px] w-full items-center justify-center lg:h-[550px]">
        <Loading />
      </div>
    );
  }

  if (!product) {
    return (
      <button
        type="button"
        className="mx-auto mb-20 mt-20 flex h-24 w-1/3 items-center justify-center rounded-full bg-black text-2xl text-white"
      >
        <a href="/menu" className="flex items-center space-x-2">
          <span className="text-xl">QUAY TRỞ LẠI THỰC ĐƠN</span>
        </a>
      </button>
    );
  }
  const handleQuantityChange = (e) => {
    const value = e.target.value;
    if (value === "") {
      setQuantity("");
    } else {
      const numericValue = parseInt(value, 10);
      if (!isNaN(numericValue) && numericValue >= 1) {
        setQuantity(numericValue);
      }
    }
  };

  const handleBlur = () => {
    if (quantity === "") {
      setQuantity(1);
    }
  };

  const handleAddToCart = async () => {
    try {
      const data = {
        productId: product.id,
        quantity: quantity,
      };
      addItem(data);
    } catch (error) {
      toast.error("Thêm vào giỏ hàng bị lỗi");
    }
  };

  return (
    <div className="mx-auto w-full max-w-[1200px] pb-16 pt-8">
      <div className="flex flex-col md:flex-row">
        {/* Left Section */}
        <div className="w-full scale-90 cursor-pointer overflow-hidden rounded-lg md:w-[300px]">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Center Section */}
        <div className="items-center justify-center pt-14 md:px-16 md:pt-16">
          <div className="text-center md:text-left">
            <h1 className="w-[370px] px-1 pb-4 font-josefin text-5xl font-bold text-[#00561e] md:pl-0 lg:w-[393px]">
              {product.name}
            </h1>
            <p>
              <span className="font-josefin text-[30px] font-bold text-[#663402]">
                {product.price.toLocaleString()}đ
              </span>
            </p>
            <div className="mb-4 mt-2 h-[1px] w-full bg-gray-300 lg:mb-2 lg:mt-0"></div>
            <span className="font-josefin-sans text-lg font-semibold">
              Số lượng:
            </span>
            <div className="mt-2 flex items-center justify-center gap-2 md:justify-start">
              <button
                className="flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-full bg-gray-300 text-[18px] font-bold"
                onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
              >
                -
              </button>
              <input
                type="text"
                value={quantity}
                onChange={handleQuantityChange}
                onBlur={handleBlur}
                className="h-[36px] w-[60px] rounded-md border border-gray-300 text-center text-[18px]"
              />
              <button
                className="flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-full bg-gray-300 text-[18px] font-bold"
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                +
              </button>
            </div>
            <button
              className="mt-6 w-[330px] cursor-pointer rounded-full bg-gradient-to-r from-[#00864a] to-[#925802] pb-3 pt-4 font-josefin text-[28px] font-bold text-white transition-transform duration-200 hover:scale-95 lg:mt-4 lg:w-[393px]"
              onClick={handleAddToCart}
            >
              <FontAwesomeIcon icon={faBasketShopping} /> Thêm vào giỏ
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-[370px] pl-6 pt-16 md:w-[290px] lg:w-[400px] lg:pl-2">
          <h3 className="text-center font-josefin text-3xl font-bold text-[#663402] md:text-start">
            Danh mục thực đơn
          </h3>
        </div>
      </div>

      {/* Review Section */}
      <div className="mt-8">
        <Review productId={product.id} />
      </div>

      <div>
        <RelatedProduct productId={product.id} />
      </div>
    </div>
  );
};

export default DetailFood;
