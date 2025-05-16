import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { CartAPI, ProductAPI } from "@/service";

const SidebarCart = ({ handleCartClick }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Gọi API để lấy danh sách giỏ hàng
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await CartAPI.getAllCartItems();
        const cartData = response.data?.result.items;

        // Gọi thêm thông tin từng sản phẩm
        console.log("Check cart response:", response.data?.result.items);
        const productDetails = await Promise.all(
          cartData.map(async (item) => {
            const res = await ProductAPI.getProductById(item.productId);
            const product = res.data?.result;
            return {
              productId: item.productId,
              name: product.name,
              img: product.imageUrl,
              price: product.price,
              quantity: item.quantity, // current quantity
              originalQuantity: item.quantity, // quantity from server
            };
          })
        );

        setCartItems(productDetails);
      } catch (error) {
        console.error("Lỗi khi lấy giỏ hàng:", error);
      }
    };

    fetchCart();
  }, []);

  useEffect(() => {
    const total = cartItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
    setTotalPrice(total);
  }, [cartItems]);

  const removeItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.productId !== id);
    setCartItems(updatedCart);
    // TODO: Gọi CartAPI để xóa khỏi server
  };

  const updateQuantity = (productId, quantity) => {
    const updatedCart = cartItems.map((item) =>
      item.productId === productId ? { ...item, quantity } : item
    );
    setCartItems(updatedCart);
    // TODO: Gọi CartAPI để cập nhật quantity
  };

  const decreaseQuantity = (productId) => {
    const item = cartItems.find((i) => i.productId === productId);
    if (item.quantity > 1) updateQuantity(productId, item.quantity - 1);
  };

  const increaseQuantity = (productId) => {
    const item = cartItems.find((i) => i.productId === productId);
    updateQuantity(productId, item.quantity + 1);
  };

  const handleQuantityChange = (e, productId) => {
    const newQuantity = parseInt(e.target.value || "1");
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.productId === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleBlur = (productId) => {
    const item = cartItems.find((i) => i.productId === productId);
    if (!item.quantity || item.quantity < 1) {
      updateQuantity(productId, 1);
    }
  };

  const handlePaymentClick = () => {
    toast.info(
      <div>
        <strong>Hãy đăng nhập</strong> để có thể xem lại lịch sử đơn hàng
      </div>,
      {
        autoClose: 2000,
        style: {
          color: "black",
          fontSize: "20px",
          fontFamily: "Josefin Sans",
          padding: "12px 20px",
          borderRadius: "8px",
        },
      }
    );
  };
  const handleCartClose = async () => {
    const changedItems = cartItems.filter(
      (item) => item.quantity !== item.originalQuantity
    );

    try {
      await Promise.all(
        changedItems.map((item) => {
          if (item.quantity > item.originalQuantity) {
            CartAPI.addCartItem({
              productId: item.productId,
              quantity: item.quantity - item.originalQuantity,
            });
          } else if (item.quantity < item.originalQuantity) {
            CartAPI.updateItemQuantity({
              productId: item.productId,
              quantity: item.originalQuantity - item.quantity,
            });
          }
        })
      );
      console.log("Cập nhật thành công các thay đổi giỏ hàng");
    } catch (err) {
      console.error("Lỗi cập nhật giỏ hàng:", err);
    }
  };
  return (
    <div className="fixed right-0 top-0 z-[1000] flex h-full w-[370px] flex-col overflow-y-auto bg-white p-3 shadow-lg transition-transform ease-in-out">
      <button
        className="absolute right-5 top-2 text-3xl text-[#909090] hover:text-black"
        onClick={async () => {
          await handleCartClose();
          handleCartClick();
        }}
      >
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <div className="mb-2 text-center text-2xl font-bold text-[#633c02]">
        Giỏ hàng
      </div>
      <div className="mb-5 border-b-2 border-[#ccc]" />

      <div className="flex-grow overflow-y-auto">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div
              key={item.productId}
              className="relative mb-4 flex h-[120px] w-[328px] items-start rounded-lg border p-2"
            >
              <img
                src={item.img}
                alt={item.name}
                className="mt-2 mr-4 h-[85px] w-[50px] object-cover"
              />
              <div className="flex flex-grow flex-col">
                <div className="mb-3 h-[50px] w-[170px] font-josefin text-xl font-bold text-[#00561e]">
                  {item.name}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <button
                      onClick={() => decreaseQuantity(item.productId)}
                      className="rounded-full bg-gray-200 px-3 py-1 hover:bg-gray-300"
                    >
                      -
                    </button>
                    <input
                      type="text"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(e, item.productId)}
                      onBlur={() => handleBlur(item.productId)}
                      className="w-12 h-8 mx-1 rounded border text-center"
                    />
                    <button
                      onClick={() => increaseQuantity(item.productId)}
                      className="rounded-full bg-gray-200 px-3 py-1 hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-end font-josefin text-lg text-black mt-1">
                    {(item.quantity * item.price).toLocaleString()}₫
                  </div>
                </div>
              </div>
              <button
                className="absolute right-3 top-2 text-xl text-red-300 hover:text-red-500"
                onClick={() => removeItem(item.productId)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          ))
        ) : (
          <p className="text-center font-josefin text-lg font-bold text-black">
            Bạn chưa thêm sản phẩm vào giỏ hàng
          </p>
        )}
      </div>

      <div className="mt-2 flex justify-between font-bold">
        <span className="text-2xl font-josefin mt-2">Tổng cộng:</span>
        <span className="text-2xl font-josefin mt-2 mr-2">
          {totalPrice.toLocaleString()}đ
        </span>
      </div>

      <Link to="/payment" state={{ cartItems, totalPrice }}>
        <button
          className="mt-3 w-full bg-black p-2 text-white hover:scale-95"
          onClick={() => {
            handleCartClick();
            handlePaymentClick();
          }}
        >
          Thanh toán
        </button>
      </Link>
    </div>
  );
};

export default SidebarCart;
