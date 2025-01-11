import React, { useState, useEffect, useContext } from "react";
import Masonry from "react-masonry-css";
import { itemApi, cartApi } from "@/service"; // Giả sử bạn có cartApi để thêm item vào giỏ hàng
import path from "path-browserify";
import { message } from "antd"; // Sử dụng thư viện antd để hiển thị thông báo
import { AuthContext } from "@/context/AuthContext";

const Home = () => {
  const [imageDimensions, setImageDimensions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await itemApi.getAll();
        const images = response.data;

        const loadedDimensions = images.map((image) => ({
          id: image._id, // Thêm id của item để sử dụng khi thêm vào giỏ hàng
          // url: `http://localhost:8070/images/${path.basename(image.url)}`,
          url: image.url,
          name: image.name,
          description: image.description,
          artist: image.artist,
          category: image.category,
          price: image.price.$numberDecimal,
        }));

        setImageDimensions(loadedDimensions);
      } catch (error) {
        console.error("Lỗi khi tải ảnh:", error);
        setError("Không thể tải ảnh. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  // Hàm xử lý thêm item vào giỏ hàng
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

  const masonryBreakpoints = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
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
  );
};

export default Home;
