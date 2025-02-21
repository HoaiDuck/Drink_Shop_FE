import React, { useContext } from "react";
import { Card, Rate, Button } from "antd";
import "antd/dist/reset.css";
import { message } from "antd";
import { AuthContext } from "@/context/AuthContext";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";

const ItemDetails = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

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
  return (
    <div className="flex flex-col items-center p-6 bg-gray-50 min-h-screen">
      <Card bordered={false} className="w-full max-w-4xl bg-white shadow-md">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src="https://via.placeholder.com/400x400" // Replace with actual image URL
              alt="Picture"
              className="rounded-md shadow-md"
            />
          </div>
          <div className="w-full md:w-1/2 p-4">
            <div className="px-4 py-2">
              <h2 className="text-xl font-semibold">Picture</h2>
              <div className="flex items-center my-2">
                <span className="text-lg font-bold text-gray-800 mr-2">
                  $140
                </span>
                <Rate disabled defaultValue={4} className="text-blue-500" />
              </div>
              <div className="my-2">
                <h3 className="font-medium">Category:</h3>
                <p className="text-sm text-gray-600">Bags & Accessories</p>
              </div>
              <div className="my-2">
                <h3 className="font-medium">Artist:</h3>
                <p className="text-sm text-gray-600">John Doe</p>{" "}
                {/* Replace with artist name */}
              </div>
              <div className="my-2">
                <h3 className="font-medium">Description:</h3>
                <p className="text-sm text-gray-600">
                  The Zip Tote Basket is the perfect midpoint between shopping
                  tote and comfy backpack. With convertible straps, you can hand
                  carry, should sling, or backpack this convenient and spacious
                  bag. The zip top and durable canvas construction keeps your
                  goods protected for all-day use.
                </p>
              </div>
              <Button
                type="primary"
                className="w-full bg-blue-500 hover:bg-blue-600 mt-4"
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ItemDetails;
