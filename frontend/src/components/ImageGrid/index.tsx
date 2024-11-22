import React from "react";
import Nav from "../Nav/Index";

const images = [
    { url: "https://via.placeholder.com/300x200", width: 300, height: 200 },
    { url: "https://via.placeholder.com/300x450", width: 300, height: 450 },
    { url: "https://via.placeholder.com/200x300", width: 200, height: 300 },
    // Thêm các ảnh khác vào đây
  ];

  const ImageGrid = () => {
    return (
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] gap-4 p-4">
        {images.map((image, index) => {
          const aspectRatio = image.height / image.width;
          return (
            <div
              key={index}
              className="relative overflow-hidden w-[200px]"
              style={{
                height: `calc(200px * ${aspectRatio})`,
              }}
            >
              <img
                src={image.url}
                alt={`Image ${index}`}
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
            </div>
          );
        })}
      </div>
    );
  };
export default ImageGrid;