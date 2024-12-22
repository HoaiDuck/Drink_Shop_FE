import React from "react";
import { Card, Button, List } from 'antd';
import 'antd/dist/reset.css';

const Payment = () => {
    const cartItems = [
      { id: 1, name: "Zip Tote Basket", price: 140, quantity: 1 },
      { id: 2, name: "Convertible Backpack", price: 120, quantity: 2 },
    ];
  
    return (
      <div className="flex flex-col items-center p-6 bg-gray-50 min-h-screen">
        <Card bordered={false} className="w-full max-w-4xl bg-white shadow-md">
          <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
          <List
            itemLayout="horizontal"
            dataSource={cartItems}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={<span className="font-medium">{item.name}</span>}
                  description={`Quantity: ${item.quantity} x $${item.price}`}
                />
                <div className="text-right font-bold">${item.quantity * item.price}</div>
              </List.Item>
            )}
          />
          <div className="flex justify-between mt-6 font-semibold">
            <span>Total:</span>
            <span>${cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}</span>
          </div>
          <Button type="primary" className="flex-wrap w-full py-2 rounded-lg mt-6 text-white bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 shadow-md">Proceed to Checkout</Button>
        </Card>
      </div>
    );
  };
  export default Payment;