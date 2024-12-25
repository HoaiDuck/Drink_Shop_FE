import React from "react";
import { Card, Rate, Button } from 'antd';
import 'antd/dist/reset.css';

const AddToCart = () => {
  return (
    <div className="flex flex-col items-center p-6 bg-gray-50 min-h-screen">
      <Card bordered={false} className="w-full max-w-4xl bg-white shadow-md">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src="https://via.placeholder.com/400x400" // Replace with actual image URL
              alt="Picture"
              className="rounded-md shadow-md"
            />
          </div>
          <div className="w-full md:w-1/2 p-4">
            <div className="px-4 py-2">
              <h2 className="text-xl font-semibold">Picture</h2>
              <div className="flex items-center my-2">
                <span className="text-lg font-bold text-gray-800 mr-2">$140</span>
                <Rate disabled defaultValue={4} className="text-blue-500" />
              </div>
              <div className="my-2">
                <h3 className="font-medium">Category:</h3>
                <p className="text-sm text-gray-600">Bags & Accessories</p>
              </div>
              <div className="my-2">
                <h3 className="font-medium">Artist:</h3>
                <p className="text-sm text-gray-600">John Doe</p> {/* Replace with artist name */}
              </div>
              <div className="my-2">
                <h3 className="font-medium">Description:</h3>
                <p className="text-sm text-gray-600">
                  The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.
                </p>
              </div>
              <Button type="primary" className="w-full bg-blue-500 hover:bg-blue-600 mt-4">Add to Cart</Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AddToCart;
