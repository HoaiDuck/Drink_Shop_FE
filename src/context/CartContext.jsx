import { createContext, useState, useEffect } from "react";
import { CartAPI } from "@/service";
import { toast } from "react-toastify";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);

  const fetchCart = async () => {
    const cartItem = await CartAPI.getAllCartItems();
    const items = cartItem.data?.result.items;
    setCartItems(items);
    setTotalItems(items.length);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addItem = async (data) => {
    // Gọi API thêm sản phẩm ở đây
    console.log("Check add cart context");
    const response = await CartAPI.addCartItem(data);
    if (response.data.code == 200) {
      toast.success("Thêm vào giỏ hàng thành công");
    } else {
      toast.success("Thêm vào giỏ hàng thất bại");
    }
    fetchCart(); // Cập nhật lại cart
  };
  const updateItem = async (data) => {
    if (data.quantity < data.originalQuantity) {
      const values = {
        productId: data.productId,
        quantity: data.originalQuantity - data.quantity,
      };
      await CartAPI.updateItemQuantity(values);
    } else {
      const values = {
        productId: data.productId,
        quantity: data.quantity - data.originalQuantity,
      };
      await CartAPI.addCartItem(values);
    }
    fetchCart(); // Cập nhật lại cart
  };

  const removeItem = async (id) => {
    const data = {
      items: [
        {
          productId: id,
        },
      ],
    };
    await CartAPI.deleteCartByID(data);
    fetchCart(); // Cập nhật lại cart
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalItems,
        addItem,
        removeItem,
        updateItem,
        refreshCart: fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
