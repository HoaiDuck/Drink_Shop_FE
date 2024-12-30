import React from "react";
import { useLocation } from "react-router-dom";
import { Card, List, Button } from "antd";
import "antd/dist/reset.css";

const Bill = () => {
  const location = useLocation();
  const { selectedItems } = location.state || {}; // Lấy dữ liệu từ state

  const totalAmount = selectedItems
    ? selectedItems.reduce((total, item) => total + item.price, 0)
    : 0;

  return (
    <div className="flex flex-col items-center p-6 bg-gray-50 min-h-screen">
      <Card bordered={false} className="w-full max-w-4xl bg-white shadow-md">
        <h2 className="text-xl font-semibold mb-4">Bill</h2>
        {selectedItems && selectedItems.length > 0 ? (
          <>
            <List
              itemLayout="horizontal"
              dataSource={selectedItems}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={<span className="font-medium">{item.name}</span>}
                    description={`Price: $${item.price}`}
                  />
                  <div className="text-right font-bold">${item.price}</div>
                </List.Item>
              )}
            />
            <div className="flex justify-between mt-6 font-semibold">
              <span>Total:</span>
              <span>${totalAmount}</span>
            </div>
            <Button
              type="primary"
              className="flex-wrap w-full py-2 rounded-lg mt-6 text-white bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 shadow-md"
            >
              Confirm Payment
            </Button>
          </>
        ) : (
          <p>No items selected for checkout</p>
        )}
      </Card>
    </div>
  );
};

export default Bill;
