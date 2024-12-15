import React from "react";

const AddToCart = () => {
  return (
    <div className="flex flex-col items-center border rounded-md p-4 w-1/3">
      <h2 className="text-lg font-bold mb-2">Thông tin sản phẩm</h2>
      <div className="w-40 h-40 bg-gray-300 flex justify-center items-center mb-4">
        <span>Hình ảnh</span>
      </div>
      <div className="text-center">
        <p className="font-bold">{product.title || "Tên sản phẩm"}</p>
        <p className="text-gray-500">{product.price || "Giá: 0đ"}</p>
      </div>
      <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md">
        Thêm giỏ hàng
      </button>
    </div>
  );
};

export default AddToCart;
