import React, { useState } from "react";
import { Card, Button, List, Checkbox } from "antd";
import { useNavigate } from "react-router-dom";
import "antd/dist/reset.css";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Zip Tote Basket", price: 140, checked: false },
    { id: 2, name: "Convertible Backpack", price: 120, checked: false },
  ]);

  const handleCheckboxChange = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const totalCheckedAmount = cartItems
    .filter((item) => item.checked)
    .reduce((total, item) => total + item.price, 0);

  const handleCheckout = () => {
    // Lọc các sản phẩm đã được chọn (checked)
    const selectedItems = cartItems.filter((item) => item.checked);
    
    // Chuyển hướng đến trang Bill và truyền dữ liệu sản phẩm đã chọn
    navigate('/Bill', { state: { selectedItems } });
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-50 min-h-screen">
      <Card bordered={false} className="w-full max-w-4xl bg-white shadow-md">
        <h2 className="text-xl font-semibold mb-4">Cart</h2>
        <List
          itemLayout="horizontal"
          dataSource={cartItems}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button
                  danger
                  size="small"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  Remove
                </Button>,
              ]}
            >
              <Checkbox
                checked={item.checked}
                onChange={() => handleCheckboxChange(item.id)}
                className="mr-4"
              />
              <List.Item.Meta
                title={<span className="font-medium">{item.name}</span>}
                description={`Price: $${item.price}`}
              />
              <div className="text-right font-bold">${item.price}</div>
            </List.Item>
          )}
        />
        <div className="flex justify-between mt-6 font-semibold">
          <span>Total (Selected Items):</span>
          <span>${totalCheckedAmount}</span>
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
      </Card>
    </div>
  );
};

export default Cart;
