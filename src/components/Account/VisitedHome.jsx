import React, { useState, useEffect, useContext } from "react";
import Masonry from "react-masonry-css";
import { itemApi, cartApi } from "@/service";
import { message } from "antd";
import { AuthContext } from "@/context/AuthContext";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Empty } from "antd";

const VisitedHome = ({ id }) => {
  const [imageDimensions, setImageDimensions] = useState([]);
  const [hoveredId, setHoveredId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await itemApi.getByArtistId(id);
        const images = response.data;
        const loadedDimensions = await Promise.all(
          images.map(async (image) => {
            const imgPromise = new Promise((resolve) => {
              const img = new Image();
              img.onload = () => {
                resolve({
                  id: image._id,
                  originlUrl: image.originlUrl,
                  name: image.name,
                  description: image.description,
                  artist: image.artist,
                  category: image.category,
                  price: image.price.$numberDecimal,
                  width: img.width,
                  height: img.height,
                });
              };
              img.src = image.url;
            });
            return imgPromise;
          })
        );
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

  const handleAddToCart = async (item, e) => {
    e.stopPropagation(); // Prevent image click event from firing
    try {
      if (!user._id) {
        const result = await Swal.fire({
          title: "You might want login.",
          text: "To continue, you have to login first!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Oke, let me login!",
          cancelButtonText: "No thanks, I will continue watching!",
        });

        // Nếu người dùng xác nhận xóa
        if (result.isConfirmed) {
          try {
            navigate("/Login");
          } catch (error) {
            console.log(error);
            // Hiển thị thông báo lỗi nếu có lỗi xảy ra
            Swal.fire("Oops!", "Something wrong happen!.", "error");
          }
        }
      } else {
        const isConfirmed = window.confirm(
          `Bạn có muốn thêm "${item.name}" vào giỏ hàng không?`
        );
        if (isConfirmed) {
          await cartApi.update({ _id: user.cart, item: item.id, type: "Add" });
          message.success(`Đã thêm "${item.name}" vào giỏ hàng!`);
        }
      }
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
      message.error("Không thể thêm vào giỏ hàng. Vui lòng thử lại sau.");
    }
  };

  const masonryBreakpoints = {
    default: 6,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <div className="relative w-screen h-screen flex flex-col bg-gray-100">
      <div className="p-2">
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">
            {<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
          </p>
        ) : (
          <Masonry
            breakpointCols={masonryBreakpoints}
            className="flex -ml-2"
            columnClassName="pl-2"
          >
            {imageDimensions.map((image, index) => (
              <div
                key={index}
                className="mb-2 relative overflow-hidden rounded-lg group cursor-pointer"
                onMouseEnter={() => setHoveredId(image.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => navigate(`/itemDetails/${image.id}`)} // Thêm dòng này
              >
                <div
                  className="relative w-full h-0"
                  style={{
                    paddingBottom: `${(image.height / image.width) * 100}%`,
                  }}
                >
                  <img
                    src={image.originlUrl}
                    alt={`Image ${index}`}
                    className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300"
                    loading="lazy"
                  />

                  {/* Save Button */}
                  <button
                    onClick={(e) => handleAddToCart(image, e)}
                    className={`z-10 absolute top-2 right-2 px-4 py-2 bg-red-500 text-white rounded-full font-semibold 
                      transition-opacity duration-300 hover:bg-red-600
                      ${hoveredId === image.id ? "opacity-100" : "opacity-0"}`}
                  >
                    Get
                  </button>

                  {/* Dark Overlay on Hover */}
                  <div
                    className={`absolute inset-0 bg-black transition-opacity duration-300
                      ${hoveredId === image.id ? "opacity-10" : "opacity-0"}`}
                  />
                </div>
              </div>
            ))}
          </Masonry>
        )}
      </div>
    </div>
  );
};
VisitedHome.propTypes = {
  id: PropTypes.string.isRequired, // id là bắt buộc và phải là kiểu string
};

export default VisitedHome;
