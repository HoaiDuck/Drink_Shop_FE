import React, { useState, useEffect } from "react";
import Masonry from "react-masonry-css";
import { itemApi } from "@/service";
import path from "path-browserify";
const Home = () => {
  const [imageDimensions, setImageDimensions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await itemApi.getAll();
        const images = response.data;

        const loadedDimensions = images.map((image) => ({
          url: `http://localhost:8070/images/${path.basename(image.url)}`,
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
                className="mb-4 bg-white rounded-lg shadow-md p-4"
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

// import React, { useState, useEffect } from "react";
// import Masonry from "react-masonry-css"; // Import thư viện Masonry
// import { itemApi } from "@/service"; // Import API từ tệp đã khai báo

// const Home = () => {
//   const [imageDimensions, setImageDimensions] = useState([]); // State lưu thông tin ảnh
//   const [loading, setLoading] = useState(true); // State hiển thị trạng thái tải ảnh

//   useEffect(() => {
//     // Hàm tải dữ liệu ảnh từ API
//     const fetchImages = async () => {
//       try {
//         const response = await itemApi.getAll(); // Gọi API lấy danh sách ảnh
//         console.log(">>>CHECK RESPONE Item:", response);
//         const images = response.data; // Lấy dữ liệu từ API

//         const loadedDimensions = await Promise.all(
//           images.map(
//             (image) =>
//               new Promise((resolve) => {
//                 const img = new Image();
//                 img.src = image.url;
//                 img.onload = () => {
//                   resolve({
//                     url: image.url,
//                     width: img.width,
//                     height: img.height,
//                   });
//                 };
//                 img.onerror = () => {
//                   resolve({
//                     url: image.url,
//                     width: 0,
//                     height: 0, // Mặc định nếu ảnh không tải được
//                   });
//                 };
//               })
//           )
//         );

//         setImageDimensions(loadedDimensions); // Lưu thông tin ảnh vào state
//         setLoading(false); // Ẩn trạng thái loading sau khi tải xong
//       } catch (error) {
//         console.error("Lỗi khi tải ảnh:", error);
//         setLoading(false); // Ẩn trạng thái loading nếu gặp lỗi
//       }
//     };

//     fetchImages(); // Gọi hàm tải ảnh khi component được mount
//   }, []);

//   // Breakpoint cho Masonry Layout
//   const masonryBreakpoints = {
//     default: 7, // 4 cột trên màn hình lớn
//     1500: 6,
//     1250: 5, // 3 cột trên màn hình trung bình
//     1000: 4,
//     850: 3, // 2 cột trên màn hình nhỏ
//     700: 2,
//     450: 1, // 1 cột trên màn hình rất nhỏ
//   };

//   return (
//     <div className="relative w-screen h-screen flex flex-col bg-gray-100">
//       {/* <Nav /> */}
//       <div className="p-4">
//         {loading ? ( // Hiển thị loading khi đang tải ảnh
//           <p className="text-center text-gray-500">Loading...</p>
//         ) : (
//           <Masonry
//             breakpointCols={masonryBreakpoints}
//             className="flex -ml-4 w-auto"
//             columnClassName="pl-4 bg-clip-padding"
//           >
//             {imageDimensions.map((image, index) => (
//               <div key={index} className="mb-4">
//                 <img
//                   src={image.url}
//                   alt={`Image ${index}`}
//                   className="w-full object-cover rounded-lg"
//                   style={{ display: image.width ? "block" : "none" }} // Ẩn ảnh nếu không tải được
//                 />
//               </div>
//             ))}
//           </Masonry>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Home;
