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
  const [imageDimensions, setImageDimensions] = useState<
    { url: string; width: number; height: number }[]
  >([]);

  useEffect(() => {
    // Tải ảnh và lấy thông tin chiều rộng, chiều cao
    const loadImages = async () => {
      const loadedDimensions = await Promise.all(
        images.map(
          (image) =>
            new Promise<{ url: string; width: number; height: number }>(
              (resolve) => {
                const img = new Image();
                img.src = image.url;
                img.onload = () => {
                  resolve({
                    url: image.url,
                    width: img.width,
                    height: img.height,
                  });
                };
              }
            )
        )
      );
      setImageDimensions(loadedDimensions);
    };

    loadImages();
  }, []);

  return (
    <div className="flex flex-wrap justify-start gap-4 p-4">
      {imageDimensions.map((image, index) => {
        const aspectRatio = image.height / image.width; // Tính tỷ lệ ảnh
        return (
          <div
          key={index}
          className="overflow-hidden rounded-md"
          style={{
            width: "197.5px", // Chiều ngang cố định
            height: `${197.5 * aspectRatio}px`, // Chiều cao tự tính theo tỉ lệ
          }} 
          > 
            <img
              src={image.url}
              alt={`Image ${index}`}
              className="w-full h-full object-cover"
            />
          </div>
        );
      })}
    </div>
  );
};

export default ImageGrid;