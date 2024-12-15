import React from "react";

const Products = () => {
  return (
    <div className="flex justify-center items-center p-8">
      <div className="w-1/3 flex flex-col items-center border p-4">
        <div className="w-64 h-96 bg-gray-300 flex flex-col justify-center items-center rounded-md">
          <div className="flex justify-center items-center w-12 h-12 bg-black rounded-full text-white">
            ⬆️
          </div>
          <p className="text-gray-500 mt-4 text-center">
            Chọn một tệp hoặc kéo thả một tệp vào đây
          </p>
        </div>
        <button className="mt-4 bg-gray-300 px-6 py-2 rounded-md text-black">
          Tạo URL
        </button>
      </div>
      <div className="w-2/3 px-8">
        <div className="mb-4">
          <label className="block mb-2 font-bold">Tiêu đề</label>
          <input
            type="text"
            placeholder="Thêm tiêu đề"
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-bold">Mô tả</label>
          <textarea
            placeholder="Thêm mô tả"
            className="w-full p-2 border rounded-md"
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-bold">Liên kết</label>
          <input
            type="text"
            placeholder="Thêm liên kết"
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-bold">Thể loại</label>
          <select className="w-full p-2 border rounded-md">
            <option>Thêm thể loại</option>
          </select>
        </div>

        <div className="flex gap-4 mb-4">
          <div className="w-1/2">
            <label className="block mb-2 font-bold">Giá</label>
            <input
              type="text"
              placeholder="Thêm giá"
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="w-1/2">
            <label className="block mb-2 font-bold">Mã hàng</label>
            <select className="w-full p-2 border rounded-md">
              <option>Thêm mã hàng</option>
            </select>
          </div>
        </div>
        <button className="bg-gray-300 px-6 py-2 rounded-md font-bold">
          Đăng
        </button>
      </div>
    </div>
  );
};

export default Products;
