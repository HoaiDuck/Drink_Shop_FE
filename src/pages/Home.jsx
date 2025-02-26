import React, { useState, useEffect, useContext } from "react";
import Masonry from "react-masonry-css";
import { itemApi } from "@/service";
import { AuthContext } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Home = () => {
  const [imageDimensions, setImageDimensions] = useState([]);
  const [hoveredId, setHoveredId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await itemApi.getAll();
        const images = response.data;
        const loadedDimensions = await Promise.all(
          images
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map(async (image) => {
              const imgPromise = new Promise((resolve) => {
                const img = new Image();
                img.onload = () => {
                  resolve({
                    id: image._id,
                    originlUrl: image.originlUrl,
                    name: image.name,
                    description: image.description,
                    artist: image.artist,
                    price: image.price.$numberDecimal,
                    width: img.width,
                    height: img.height,
                  });
                };
                img.src = image.originlUrl;
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

  return (
    <div className="flex flex-col min-h-screen">
      hello
      <div className="w-full h-[300px] bg-gray-200 flex items-center justify-center mb-4">
        <p className="text-gray-500">Chèn ảnh tường ở đây</p>
      </div>
      <div className="w-[85%] mx-auto py-4">
        <h2 className="text-xl font-semibold text-gray-700 text-center mb-4">
          Có thể bạn sẽ thích
        </h2>
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            slidesPerView={4}
            spaceBetween={20}
            autoplay={{ delay: 3000 }}
            pagination={{ clickable: true }}
            navigation
            className="rounded-lg shadow-lg"
          >
            {imageDimensions.map((image) => (
              <SwiperSlide key={image.id} className="relative group">
                <div
                  className="relative w-full h-[250px] rounded-lg overflow-hidden cursor-pointer"
                  onClick={() => navigate(`/itemDetails/${image.id}`)}
                >
                  <img
                    src={image.originlUrl}
                    alt={image.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
      <p className="text-center text-gray-700 font-semibold mt-4">
        Wedesign - Art
      </p>
      <div className="px-10">
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <Masonry
            breakpointCols={{ default: 4, 1100: 3, 700: 2, 500: 1 }}
            className="flex -ml-2"
            columnClassName="pl-2"
          >
            {imageDimensions.map((image, index) => (
              <div
                key={index}
                className="mb-2 relative overflow-hidden rounded-lg group cursor-pointer"
                onMouseEnter={() => setHoveredId(image.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => navigate(`/itemDetails/${image.id}`)}
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
