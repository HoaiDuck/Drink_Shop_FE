import React, { useState, useEffect } from "react";
import Nav from "../Nav/Index";

const images = [
  { url: "./img/img1.jpg" },
  { url: "./img/img2.jpg" },
  { url: "./img/img3.jpg" },
  { url: "./img/img4.jpg" },
  { url: "./img/img5.jpg" },
  { url: "./img/img6.jpg" },
  { url: "./img/img7.jpg" },
  { url: "./img/img8.jpg" },
  { url: "./img/img9.jpg" },
  { url: "./img/img10.jpg" },
  { url: "./img/img11.jpg" },
  // Thêm các ảnh khác vào đây
];

const ImageGrid = () => {
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

  return (
    <div className="flex flex-wrap justify-start gap-4 p-4">
      <div style={{ overflow: "hidden", padding: "16px" }}>
        {imageDimensions.map((image, index) => {
          const aspectRatio = image.height / image.width;
          const imageHeight = 197.5 * aspectRatio; // Chiều cao tự tính theo tỉ lệ
          return (
            <div
              key={index}
              style={{
                float: "left",
                margin: "8px",
                width: "190px", // Chiều ngang cố định
                height: `${imageHeight}px`,
                backgroundColor: "#e0e0e0", // Màu nền mặc định nếu ảnh không tải được
              }}
            >
              <img
                src={image.url}
                alt={`Image ${index}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: image.width ? "block" : "none", // Ẩn ảnh nếu không tải được
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ImageGrid;