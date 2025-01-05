import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { itemApi, categoryApi, cartApi } from "@/service";
import { message } from "antd";
import { AuthContext } from "@/context/AuthContext";
import Masonry from "react-masonry-css";
import path from "path-browserify";
const CategoryPage = () => {
  const [imageDimensions, setImageDimensions] = useState([]);
  const { categoryId } = useParams();
  const [category, setCategory] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch thông tin category
        const categoryResponse = await categoryApi.get(categoryId);
        setCategory(categoryResponse.data);

        // Fetch các item thuộc category
        const itemsResponse = await itemApi.getWithCategory(categoryId);
        const images = itemsResponse.data;
        const loadedDimensions = images.map((image) => ({
          id: image._id, // Thêm id của item để sử dụng khi thêm vào giỏ hàng
          url: `http://localhost:8070/images/${path.basename(image.url)}`,

          name: image.name,
          description: image.description,
          artist: image.artist,
          category: image.category,
          price: image.price.$numberDecimal,
        }));
        setImageDimensions(loadedDimensions);
        setItems(itemsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Không thể tải ảnh. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryId]);
  if (!category) return <div>Loading...</div>;
  const masonryBreakpoints = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };
  const handleAddToCart = async (item) => {
    try {
      // Hiển thị hộp thoại xác nhận
      const isConfirmed = window.confirm(
        `Bạn có muốn thêm "${item.name}" vào giỏ hàng không?`
      );

      if (isConfirmed) {
        // Gọi API để thêm item vào giỏ hàng
        await cartApi.update({ _id: user.cart, item: item.id, type: "Add" });
        message.success(`Đã thêm "${item.name}" vào giỏ hàng!`);
      }
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
      message.error("Không thể thêm vào giỏ hàng. Vui lòng thử lại sau.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{category.Name}</h1>
      <p className="text-gray-600">Description: {category.Description}</p>

      <h2 className="text-xl font-semibold mt-4">
        Items ({category.TotalItem}):
      </h2>
      <div className="relative w-screen h-screen flex flex-col bg-gray-100">
        <div className="p-4">
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <Masonry
              breakpointCols={masonryBreakpoints}
              className="flex -ml-4 w-auto"
              columnClassName="pl-4 bg-clip-padding"
            >
              {imageDimensions.map((image, index) => (
                <div
                  key={index}
                  className="mb-4 bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => handleAddToCart(image)} // Thêm sự kiện onClick
                >
                  <img
                    src={image.url}
                    alt={`Image ${index}`}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="mt-2">
                    <h3 className="text-lg font-semibold">{image.name}</h3>
                    <p className="text-gray-600">{image.description}</p>
                    <p className="text-gray-600">
                      Artist: {image.artist.join(", ")}
                    </p>
                    <p className="text-gray-600">
                      Category: {image.category.join(", ")}
                    </p>
                    <p className="text-gray-600">Price: ${image.price}</p>
                  </div>
                </div>
              ))}
            </Masonry>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
