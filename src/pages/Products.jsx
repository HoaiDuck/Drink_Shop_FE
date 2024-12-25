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
            Select a file
          </p>
        </div>
        <button className="mt-4 bg-gray-300 px-6 py-2 rounded-md text-black">
          Create URL
        </button>
      </div>
      <div className="w-2/3 px-8">
        <div className="mb-4">
          <label className="block mb-2 font-bold">Title</label>
          <input
            type="text"
            placeholder="Add tittle"
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-bold">Description</label>
          <textarea
            placeholder="Add description"
            className="w-full p-2 border rounded-md"
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-bold">Link</label>
          <input
            type="text"
            placeholder="Add link"
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-bold">Category</label>
          <select className="w-full p-2 border rounded-md">
            <option>-</option>
          </select>
        </div>

        <div className="flex gap-4 mb-4">
          <div className="w-1/2">
            <label className="block mb-2 font-bold">Price</label>
            <input
              type="text"
              placeholder="Add price"
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="w-1/2">
            <label className="block mb-2 font-bold">Product code</label>
            <select className="w-full p-2 border rounded-md">
              <option>Add product code</option>
            </select>
          </div>
        </div>
        <button className="bg-gray-300 px-6 py-2 rounded-md font-bold">
          Post
        </button>
      </div>
    </div>
  );
};

export default Products;
