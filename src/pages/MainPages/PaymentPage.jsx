import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { Loading } from "@/components";
import { OrderAPI, ProductAPI } from "@/service";
import { AuthContext, CartContext } from "@/context";

const PaymentPage = () => {
  const location = useLocation();
  const { cartItemsAfter: initialCartItems } = location.state || {};
  const { user } = useContext(AuthContext);
  const { cartItems, removeItem } = useContext(CartContext);

  const [cartItemsAfter, setCartItemsAfter] = useState(initialCartItems || []);
  const [selectedPayment, setSelectedPayment] = useState(1);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: user?.username || "",
    address: "",
    number: user?.numbers || "",
  });

  useEffect(() => {
    const savedUserInfo = localStorage.getItem("userInfo");
    if (savedUserInfo) {
      const parsed = JSON.parse(savedUserInfo);
      setFormData((prev) => ({
        ...prev,
        name: parsed.name || "",
        address: parsed.address || "",
        number: parsed.number || "",
      }));
    }
  }, []);

  useEffect(() => {
    if (!cartItems || cartItems.length === 0) {
      setCartItemsAfter([]);
      setLoading(false);
      return;
    }

    const fetchCart = async () => {
      try {
        const productDetails = await Promise.all(
          cartItems.map(async (item) => {
            const res = await ProductAPI.getProductById(item.productId);
            const product = res.data?.result;
            return {
              productId: item.productId,
              name: product.name,
              img: product.imageUrl,
              price: product.price,
              quantity: item.quantity,
              originalQuantity: item.quantity,
            };
          })
        );
        setCartItemsAfter(productDetails);
      } catch (error) {
        console.error("Lỗi khi lấy giỏ hàng:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [cartItems]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentOptionClick = (paymentMethod) => {
    setSelectedPayment(paymentMethod);
  };

  const decreaseQuantity = (productId) => {
    setCartItemsAfter((prev) =>
      prev.map((item) =>
        item.productId === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const increaseQuantity = (productId) => {
    setCartItemsAfter((prev) =>
      prev.map((item) =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const handleQuantityChange = (e, productId) => {
    const value = e.target.value;
    const numericValue = parseInt(value, 10);
    if (!value) {
      setCartItemsAfter((prev) =>
        prev.map((item) =>
          item.productId === productId ? { ...item, quantity: "" } : item
        )
      );
    } else if (!isNaN(numericValue) && numericValue >= 1) {
      setCartItemsAfter((prev) =>
        prev.map((item) =>
          item.productId === productId
            ? { ...item, quantity: numericValue }
            : item
        )
      );
    }
  };

  const calculatedTotalPrice = cartItemsAfter.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    localStorage.setItem("userInfo", JSON.stringify(formData));

    const orderData = {
      accountId: user.id,
      address: formData.address,
      number: formData.number,
      paymentType: selectedPayment === 1 ? "VNPAY" : "MOMO",
      listItem: cartItemsAfter.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
    };

    try {
      const response = await OrderAPI.createOrder(orderData);
      const payUrl = response.data?.result?.orderResponse?.payload?.payUrl;
      console.log("Check url payment:", orderData);
      orderData.listItem.map((item) => removeItem(item.productId));
      if (payUrl) {
        window.location.href = payUrl;
      }
    } catch (error) {
      console.error("Lỗi khi tạo đơn hàng:", error);
      toast.error("Đã có lỗi xảy ra, vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  if (!cartItemsAfter || cartItemsAfter.length === 0) {
    return (
      <div className="success-container mb-28 mt-20 flex flex-col items-center text-center">
        <FontAwesomeIcon icon={faCartPlus} className="text-7xl text-black" />
        <h1 className="mt-4 font-josefin text-3xl font-bold">
          Giỏ hàng của bạn hiện đang không có sản phẩm nào!!!
        </h1>
        <p className="mt-2 font-josefin text-lg font-bold">
          Vui lòng quay trở lại trang chủ để lựa chọn mặt hàng yêu thích trước
          khi vào trang thanh toán.
        </p>
        <a
          href="/menu"
          className="mt-8 rounded-lg bg-[#d88453] px-6 pb-2 pt-4 font-josefin text-2xl text-white hover:bg-[#633c02]"
        >
          Quay lại trang mua sắm
        </a>
      </div>
    );
  }

  return (
    <div className="mx-auto mb-20 max-w-[1300px] px-4">
      <div className="grid grid-cols-1 gap-6 pt-12 sm:grid-cols-10">
        <div className="payment-left order-2 col-span-10 sm:order-1 sm:col-span-6">
          <h3 className="mb-4 pt-4 font-josefin text-4xl font-bold">
            Thông tin khách hàng
          </h3>
          <form onSubmit={handleSubmit} className="input-group space-y-4">
            <div className="input-payment">
              <input
                type="text"
                name="name"
                className="h-16 w-full rounded-2xl border border-gray-300 p-2"
                placeholder="Họ tên"
                required
                defaultValue={user?.username || ""}
              />
            </div>
            <div className="input-payment">
              <input
                type="text"
                name="address"
                className="h-16 w-full rounded-2xl border border-gray-300 p-2 pt-3"
                placeholder="Địa chỉ"
                required
              />
            </div>
            <div className="h-16">
              <input
                type="tel"
                name="number"
                className="w-full rounded-2xl border border-gray-300 p-2"
                placeholder="Số điện thoại"
                defaultValue={user?.numbers || ""}
                required
              />
            </div>

            <div className="payment-method">
              <h4 className="mb-4 py-3 font-josefin text-4xl font-bold">
                Phương tiện thanh toán
              </h4>

              <button
                type="button"
                className={`payment-option mb-4 flex w-full cursor-pointer items-center rounded-2xl border p-4 transition-colors duration-300 hover:text-black ${
                  selectedPayment === 1 ? "border-[#2f5acf]" : "border-gray-300"
                }`}
                onClick={() => handlePaymentOptionClick(1)}
              >
                <input
                  type="checkbox"
                  id="bank-transfer"
                  name="payment-method"
                  className="checkbox-method hidden"
                  checked={selectedPayment === 1}
                  readOnly
                />
                <div
                  className={`checkbox-circle relative flex h-[20px] w-[20px] items-center justify-center rounded-full border-2 bg-white transition-colors duration-300 ${
                    selectedPayment === 1
                      ? "border-[#2f5acf]"
                      : "border-gray-300"
                  }`}
                >
                  {selectedPayment === 1 && (
                    <div className="h-[10px] w-[10px] rounded-full bg-[#2f5acf]"></div>
                  )}
                </div>
                <label
                  htmlFor="bank-transfer"
                  className="ml-4 flex-grow text-left text-gray-700"
                >
                  <p
                    className={`name-option font-josefin text-[20px] font-semibold ${
                      selectedPayment === 1 ? "text-black" : "text-[#8e8e8e]"
                    }`}
                  >
                    Chuyển khoản ngân hàng
                  </p>
                </label>
              </button>

              <button
                type="button"
                className={`payment-option flex w-full cursor-pointer items-center rounded-2xl border p-4 transition-colors duration-300 hover:text-black ${
                  selectedPayment === 2 ? "border-[#2f5acf]" : "border-gray-300"
                }`}
                onClick={() => handlePaymentOptionClick(2)}
              >
                <input
                  type="checkbox"
                  id="momo-qr"
                  name="payment-method"
                  className="checkbox-method hidden"
                  checked={selectedPayment === 2}
                  readOnly
                />
                <div
                  className={`checkbox-circle relative flex h-[20px] w-[20px] items-center justify-center rounded-full border-2 bg-white transition-colors duration-300 ${
                    selectedPayment === 2
                      ? "border-[#2f5acf]"
                      : "border-gray-300"
                  }`}
                >
                  {selectedPayment === 2 && (
                    <div className="h-[10px] w-[10px] rounded-full bg-[#2f5acf]"></div>
                  )}
                </div>
                <label
                  htmlFor="momo-qr"
                  className="ml-4 flex-grow text-left text-gray-700"
                >
                  <p
                    className={`name-option font-josefin text-[20px] font-semibold ${
                      selectedPayment === 2 ? "text-black" : "text-[#8e8e8e]"
                    }`}
                  >
                    Thanh toán Momo
                  </p>
                </label>
              </button>
            </div>

            <button
              type="submit"
              className="mt-8 h-16 w-full rounded-2xl bg-black px-4 font-josefin text-xl font-bold text-white transition-transform duration-200 hover:scale-95"
              disabled={loading}
            >
              {loading ? (
                <Loading />
              ) : (
                `ĐẶT NGAY ${calculatedTotalPrice.toLocaleString()}₫`
              )}
            </button>
          </form>
        </div>

        <div className="order-1 col-span-10 sm:order-2 sm:col-span-4">
          <h3 className="name-option-payment mb-2 pt-4 font-josefin text-4xl text-[32px] font-bold">
            Thông tin sản phẩm
          </h3>
          <div className="mb-4 max-h-[580px] overflow-y-auto rounded-lg bg-white lg:p-4">
            {cartItemsAfter.length == 0 ? (
              <p>Giỏ hàng trống.</p>
            ) : (
              cartItemsAfter.map((item) => (
                <div
                  key={item.productId}
                  className="relative mb-4 flex items-center border-b pb-4"
                >
                  <div className="w-3/12 flex-shrink-0">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="h-20% w-20% rounded-lg object-cover"
                    />
                  </div>
                  <div className="w-3/5 pl-4 sm:w-[250px] lg:px-4 lg:pl-4">
                    <span className="line-clamp-1 font-josefin text-2xl font-bold text-[#00561e]">
                      {item.name}
                    </span>
                    <div className="mt-2 flex items-center space-x-2 pt-6">
                      <button
                        onClick={() => decreaseQuantity(item.productId)}
                        className="rounded-full bg-gray-200 px-3 py-1 hover:bg-gray-300"
                      >
                        -
                      </button>
                      <input
                        type="text"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(e, item.productId)
                        }
                        onBlur={() =>
                          setCartItemsAfter((prevCartItems) =>
                            prevCartItems.map((item) =>
                              item.productId === item.productId &&
                              item.quantity === ""
                                ? { ...item, quantity: 1 }
                                : item
                            )
                          )
                        }
                        className="w-12 rounded border text-center"
                      />
                      <button
                        onClick={() => increaseQuantity(item.productId)}
                        className="rounded-full bg-gray-200 px-3 py-1 hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="relative w-3/12 text-right">
                    <button
                      className="absolute right-0 top-0 text-2xl text-gray-400 hover:text-black"
                      onClick={() => {
                        removeItem(item.productId);
                      }}
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                    <span className="block pt-16 font-semibold text-black">
                      {(item.quantity * item.price).toLocaleString()}₫
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="mb-[5px] flex justify-between font-josefin text-[18px] font-semibold">
            <span>TỔNG CỘNG</span>
            <span>{calculatedTotalPrice.toLocaleString()}₫</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
