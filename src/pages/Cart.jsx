import React, { useState, useEffect, useContext } from "react";
import { Card, Button, List, Checkbox, Modal, message } from "antd";
import { useNavigate } from "react-router-dom";
import "antd/dist/reset.css";
import {
  itemApi,
  cartApi,
  userItemApi,
  accountApi,
  billApi,
  incomeApi,
} from "@/service";
import { AuthContext } from "@/context/AuthContext";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        // Lấy thông tin giỏ hàng
        const cartResponse = await cartApi.get(user.cart);
        const cartData = cartResponse.data;
        console.log(">>>>CHECK Cart Response:", cartData);
        // Lấy thông tin chi tiết của từng item trong giỏ hàng
        const itemsWithDetails = await Promise.all(
          cartData.item.map(async (itemId) => {
            const itemResponse = await itemApi.getById({
              _id: itemId,
              getArtistId: 1,
            });
            console.log(">>>>>CHECK Cart ITEM:", itemResponse);
            return itemResponse.data;
          })
        );

        // Cập nhật state với thông tin chi tiết của các item
        setCartItems(itemsWithDetails);
      } catch (error) {
        console.error("Lỗi khi tải giỏ hàng:", error);
        setError("Không thể tải giỏ hàng. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const handleCheckboxChange = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleRemoveItem = async (id) => {
    try {
      // Gọi API để xóa item khỏi giỏ hàng trên server
      await cartApi.update({ _id: user.cart, item: id, type: "Delete" });

      // Cập nhật state để loại bỏ item khỏi danh sách hiển thị
      setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Lỗi khi xóa item khỏi giỏ hàng:", error);
      setError("Không thể xóa item khỏi giỏ hàng. Vui lòng thử lại sau.");
    }
  };

  const totalCheckedAmount = cartItems
    .filter((item) => item.checked)
    .reduce((total, item) => total + parseFloat(item.price.$numberDecimal), 0);

  const handleCheckout = () => {
    // Lọc các sản phẩm đã được chọn (checked)
    const selectedItems = cartItems.filter((item) => item.checked);

    // Kiểm tra nếu không có sản phẩm nào được chọn
    if (selectedItems.length === 0) {
      return;
    }

    // Hiển thị Modal xác nhận
    setIsModalVisible(true);
  };

  const checkCoinBalance = (totalAmount) => {
    return user.coin >= totalAmount;
  };

  const handleConfirmCheckout = async () => {
    try {
      // Lọc các sản phẩm đã được chọn (checked)
      const selectedItems = cartItems.filter((item) => item.checked);

      // Tính tổng số tiền cần thanh toán
      const totalAmount = selectedItems.reduce(
        (total, item) => total + parseFloat(item.price.$numberDecimal),
        0
      );

      // Kiểm tra số dư coin của người dùng
      if (!checkCoinBalance(totalAmount)) {
        message.error("Số dư coin không đủ để thanh toán.");
        setIsModalVisible(false); // Đóng Modal
        return;
      }

      // Cập nhật số dư coin của người dùng
      const updatedCoin = user.coin - totalAmount;
      await accountApi.update({
        _id: user._id,
        email: user.email,
        cart: user.cart,
        username: user.username,
        userRole: user.userRole,
        coin: updatedCoin,
        level: user.level,
        bio: user.bio,
      });

      await billApi.add({
        cartId: user.cart,
        paymentMethod: "None",
        status: "Paid",
        totalAmount: totalAmount,
      });
      // Gọi API userItem.add() cho từng sản phẩm được chọn
      await Promise.all(
        selectedItems.map(async (item) => {
          const addUserItem = await userItemApi.add({
            userId: user._id,
            item: item._id,
            type: 0,
          });
          await cartApi.update({
            _id: user.cart,
            item: item._id,
            type: "Delete",
          });
          const countArtist = item.artist.length;
          console.log(
            ">>>CHECK ARTIST:",
            item.artist,
            "Total:",
            item.price.$numberDecimal,
            "item:",
            item._id
          );
          item.artist.map(async (artist) => {
            const incomePost = await incomeApi.add({
              item: item._id,
              totalIncome: item.price.$numberDecimal / countArtist,
              artistId: artist,
            });
            console.log(">>>CHECK INCOME:", incomePost);
          });

          console.log(">>>CHECK ADD user Item:", addUserItem);
        })
      );

      // Đóng Modal
      setIsModalVisible(false);

      // Chuyển hướng đến trang PersonalBag
      navigate("/Account/PersonalBag");
    } catch (error) {
      console.error("Lỗi khi thanh toán:", error);
      setError("Không thể thanh toán. Vui lòng thử lại sau.");
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-50 min-h-screen">
      <Card bordered={false} className="w-full max-w-4xl bg-white shadow-md">
        <h2 className="text-xl font-semibold mb-4">Cart</h2>
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <>
            <List
              itemLayout="horizontal"
              dataSource={cartItems}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <Button
                      key={item._id}
                      danger
                      size="small"
                      onClick={() => handleRemoveItem(item._id)}
                    >
                      Remove
                    </Button>,
                  ]}
                >
                  <Checkbox
                    checked={item.checked || false}
                    onChange={() => handleCheckboxChange(item._id)}
                    className="mr-4"
                  />
                  <List.Item.Meta
                    title={<span className="font-medium">{item.name}</span>}
                    description={
                      <>
                        {/* <p>Artist: {item?.artist?.join(", ")}</p> */}
                        <p>Category: {item?.category?.join(", ")}</p>
                        <p>Price: ${item?.price?.$numberDecimal}</p>
                      </>
                    }
                  />
                </List.Item>
              )}
            />
            <div className="flex justify-between mt-6 font-semibold">
              <span>Total (Selected Items):</span>
              <span>${totalCheckedAmount.toFixed(2)}</span>
            </div>
            <div className="flex flex-col gap-4 mt-6">
              <Button
                type="primary"
                className="flex-wrap w-full py-2 rounded-lg text-white bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 shadow-md"
                disabled={totalCheckedAmount === 0}
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </Button>
            </div>
          </>
        )}
      </Card>

      {/* Modal xác nhận thanh toán */}
      <Modal
        title="Xác nhận thanh toán"
        visible={isModalVisible}
        onOk={handleConfirmCheckout}
        onCancel={() => setIsModalVisible(false)}
        okText="Đồng ý"
        cancelText="Hủy"
      >
        <p>Bạn có chắc chắn muốn thanh toán các sản phẩm đã chọn?</p>
      </Modal>
    </div>
  );
};

export default Cart;
