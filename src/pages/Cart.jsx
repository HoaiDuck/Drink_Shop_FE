import React, { useState, useEffect, useContext } from "react";
import { Card, Button, List, Checkbox } from "antd";
import { useNavigate } from "react-router-dom";
import "antd/dist/reset.css";
import { itemApi, cartApi } from "@/service";
import { AuthContext } from "@/context/AuthContext";
const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        // Lấy thông tin giỏ hàng
        const cartResponse = await cartApi.get(user.cart);
        const cartData = cartResponse.data;
        console.log(">>>>CHECK Cart Response:", cartData);
        // Lấy thông tin chi tiết của từng item trong giỏ hàng
        const itemsWithDetails = await Promise.all(
          cartData.item.map(async (itemId) => {
            const itemResponse = await itemApi.getById(itemId);
            console.log(">>>>>CHECK Cart ITEM:", itemResponse);
            return itemResponse.data;
          })
        );

        // Cập nhật state với thông tin chi tiết của các item
        setCartItems(itemsWithDetails);
      } catch (error) {
        console.error("Lỗi khi tải giỏ hàng:", error);
        setError("Không thể tải giỏ hàng. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const handleCheckboxChange = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
  };

  const totalCheckedAmount = cartItems
    .filter((item) => item.checked)
    .reduce((total, item) => total + parseFloat(item.price.$numberDecimal), 0);

  const handleCheckout = () => {
    // Lọc các sản phẩm đã được chọn (checked)
    const selectedItems = cartItems.filter((item) => item.checked);

    // Chuyển hướng đến trang Bill và truyền dữ liệu sản phẩm đã chọn
    navigate("/Bill", { state: { selectedItems } });
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-50 min-h-screen">
      <Card bordered={false} className="w-full max-w-4xl bg-white shadow-md">
        <h2 className="text-xl font-semibold mb-4">Cart</h2>
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <>
            <List
              itemLayout="horizontal"
              dataSource={cartItems}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <Button
                      key={item._id}
                      danger
                      size="small"
                      onClick={() => handleRemoveItem(item._id)}
                    >
                      Remove
                    </Button>,
                  ]}
                >
                  <Checkbox
                    checked={item.checked || false}
                    onChange={() => handleCheckboxChange(item._id)}
                    className="mr-4"
                  />
                  <List.Item.Meta
                    title={<span className="font-medium">{item.name}</span>}
                    description={
                      <>
                        <p>Artist: {item?.artist?.join(", ")}</p>
                        <p>Category: {item?.category?.join(", ")}</p>
                        <p>Price: ${item?.price?.$numberDecimal}</p>
                      </>
                    }
                  />
                </List.Item>
              )}
            />
            <div className="flex justify-between mt-6 font-semibold">
              <span>Total (Selected Items):</span>
              <span>${totalCheckedAmount.toFixed(2)}</span>
            </div>
            <div className="flex flex-col gap-4 mt-6">
              <Button
                type="primary"
                className="flex-wrap w-full py-2 rounded-lg text-white bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 shadow-md"
                disabled={totalCheckedAmount === 0}
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </Button>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default Cart;
