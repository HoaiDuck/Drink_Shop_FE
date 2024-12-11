import React, { useState, useEffect } from "react";
import Masonry from "react-masonry-css"; // Import thư viện Masonry
const images = [
  { url: "/img/img1.jpg" },
  { url: "/img/img2.jpg" },
  { url: "/img/img3.jpg" },
  { url: "/img/img4.jpg" },
  { url: "/img/img5.jpg" },
  { url: "/img/img6.jpg" },
  { url: "/img/img7.jpg" },
  { url: "/img/img8.jpg" },
  { url: "/img/img9.jpg" },
  { url: "/img/img10.jpg" },
  { url: "/img/img11.jpg" },
  // Thêm các ảnh khác vào đây
];

const Home = () => {
  const [imageDimensions, setImageDimensions] = useState([]);

  useEffect(() => {
    const loadImages = async () => {
      const loadedDimensions = await Promise.all(
        images.map(
          (image) =>
            new Promise((resolve) => {
              const img = new Image();
              img.src = image.url;
              img.onload = () => {
                resolve({
                  url: image.url,
                  width: img.width,
                  height: img.height,
                });
              };
              img.onerror = () => {
                resolve({
                  url: image.url,
                  width: 0,
                  height: 0, // Mặc định nếu ảnh không tải được
                });
              };
            })
        )
      );
      setImageDimensions(loadedDimensions);
    };

    loadImages();
  }, []);

  // Breakpoint cho Masonry Layout
  const masonryBreakpoints = {
    default: 7, // 4 cột trên màn hình lớn
    1500: 6,
    1250: 5, // 3 cột trên màn hình trung bình
    1000: 4,
    850: 3, // 2 cột trên màn hình nhỏ
    700: 2,
    450: 1, // 1 cột trên màn hình rất nhỏ
  };

  return (
    <div className="relative w-screen h-screen flex flex-col bg-gray-100">
      {/* <Nav /> */}
      <div className="p-4">
        <Masonry
          breakpointCols={masonryBreakpoints}
          className="flex -ml-4 w-auto"
          columnClassName="pl-4 bg-clip-padding"
        >
          {imageDimensions.map((image, index) => (
            <div key={index} className="mb-4">
              <img
                src={image.url}
                alt={`Image ${index}`}
                className="w-full object-cover rounded-lg"
                style={{ display: image.width ? "block" : "none" }} // Ẩn ảnh nếu không tải được
              />
            </div>
          ))}
        </Masonry>
      </div>
    </div>
  );
};

export default Home;
