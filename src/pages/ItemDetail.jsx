import React, { useState, useEffect, useContext } from "react";
import { Card, Rate, Button } from "antd";
import "antd/dist/reset.css";
import { useParams } from "react-router-dom";
import { itemApi, cartApi } from "@/service";
import { Link } from "react-router-dom";

const ItemDetails = () => {
  const [itemDetail, setItemDetail] = useState(null); // Khởi tạo itemDetail là null
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await itemApi.getDetailById({
          _id: id,
          getArtistId: 0,
        });
        console.log("API Response:", response); // Kiểm tra dữ liệu trả về
        const images = response.data;
        console.log(">>>CHECK Detail:", images);
        setItemDetail(images);
      } catch (error) {
        console.error("Lỗi khi tải ảnh:", error);
        setItemDetail(null); // Đặt itemDetail thành null nếu có lỗi
      }
    };

    fetchImages();
  }, [id]);
  const handleAddToCart = async (e) => {
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
          `Bạn có muốn thêm "${itemDetail.name}" có id "${itemDetail._id}" vào giỏ hàng không?`
        );
        if (isConfirmed) {
          await cartApi.update({
            _id: user.cart,
            item: itemDetail._id,
            type: "Add",
          });
          message.success(`Đã thêm "${itemDetail.name}" vào giỏ hàng!`);
        }
      }
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
      message.error("Không thể thêm vào giỏ hàng. Vui lòng thử lại sau.");
    }
  };
  return (
    <div className="flex flex-col items-center p-6 bg-gray-50 min-h-screen">
      {itemDetail ? ( // Kiểm tra itemDetail có tồn tại không
        <Card bordered={false} className="w-full max-w-4xl bg-white shadow-md">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 flex justify-center">
              <img
                src={itemDetail.url} // Sử dụng itemDetail.url khi itemDetail tồn tại
                alt={itemDetail.name}
                className="rounded-md shadow-md"
              />
            </div>
            <div className="w-full md:w-1/2 p-4">
              <div className="px-4 py-2">
                <h2 className="text-xl font-semibold">{itemDetail.name}</h2>
                <div className="flex items-center my-2">
                  <span className="text-lg font-bold text-gray-800 mr-2">
                    ${itemDetail.price.$numberDecimal}
                  </span>
                  <Rate disabled defaultValue={4} className="text-blue-500" />
                </div>
                <div className="my-2">
                  <h3 className="font-medium">Category:</h3>
                  <p className="text-sm text-gray-600">
                    {/* Kiểm tra nếu category là mảng */}
                    {Array.isArray(itemDetail.category) && itemDetail.category.length > 0 ? (
                      itemDetail.category.map((category, index) => (
                        <span key={index}>
                          {category}
                          {index < itemDetail.category.length - 1 ? ", " : ""}
                        </span>
                      ))
                    ) : (
                      <span>No categories available</span>
                    )}
                  </p>
                </div>
                <div className="my-2">
                  <h3 className="font-medium">Artist:</h3>
                  <p className="text-sm text-gray-600">
                    {/* Kiểm tra nếu artist và artistId là mảng */}
                    {Array.isArray(itemDetail.artist) && itemDetail.artist.length > 0 ? (
                      itemDetail.artist.map((artist, index) => (
                        <Link
                          to={`/Artist/${Array.isArray(itemDetail.artistId) && itemDetail.artistId[index] ? itemDetail.artistId[index] : ''}`}
                          key={itemDetail.artistId[index] || index}
                        >
                          <span
                            className="text-blue-500 hover:text-blue-700 hover:underline cursor-pointer"
                            title="Click to see more"
                          >
                            {artist}
                            {index < itemDetail.artist.length - 1 ? ", " : ""}
                          </span>
                        </Link>
                      ))
                    ) : (
                      <span>No artists available</span>
                    )}
                  </p>
                </div>
                <div className="my-2">
                  <h3 className="font-medium">Description:</h3>
                  <p className="text-sm text-gray-600">
                    {itemDetail.description || "No description available"}
                  </p>
                </div>
                <Button
                  type="primary"
                  className="w-full bg-blue-500 hover:bg-blue-600 mt-4"
                  onClick={(e) => handleAddToCart(e)}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ) : (
        <p>Loading...</p> // Hiển thị thông báo loading khi itemDetail chưa có
      )}
    </div>
  );
};

export default ItemDetails;
