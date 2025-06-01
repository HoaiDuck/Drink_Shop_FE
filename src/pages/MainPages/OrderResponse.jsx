import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { useSearchParams } from "react-router-dom";
import { OrderAPI } from "@/service";
import { toast } from "react-toastify";

const OrderResponse = () => {
  const [searchParams] = useSearchParams();
  const [paymentSuccess, setPaymentSuccess] = useState(null);

  useEffect(() => {
    const vnp_TxnRef = searchParams.get("vnp_TxnRef");
    const vnp_ResponseCode = searchParams.get("vnp_ResponseCode");

    const fetchData = async () => {
      if (!vnp_TxnRef || !vnp_ResponseCode) {
        toast.error("Không có thông tin thanh toán hợp lệ.");
        setPaymentSuccess(false);
        return;
      }

      const status = vnp_ResponseCode === "00" ? "SUCCESS" : "UNABLE";

      try {
        const response =await OrderAPI.setStatus({
          id: vnp_TxnRef,
          status,
        });

        if (status === "SUCCESS" && response.data.code ===200) {
          toast.success("Thanh toán thành công!");
          setPaymentSuccess(true);
        } else {
          toast.error("Thanh toán thất bại hoặc bị hủy.");
          setPaymentSuccess(false);
        }
      } catch (error) {
        console.error("Lỗi khi cập nhật trạng thái đơn hàng:", error);
        toast.error("Lỗi hệ thống khi xử lý đơn hàng.");
        setPaymentSuccess(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="success-container mb-28 mt-20 flex flex-col items-center sm:mb-32 sm:mt-32">
      {paymentSuccess === null ? (
        <p className="font-josefin text-xl">Đang xử lý thanh toán...</p>
      ) : paymentSuccess ? (
        <>
          <FontAwesomeIcon icon={faCircleCheck} className="text-7xl text-green-500" />
          <h1 className="mt-4 text-center font-josefin text-3xl font-bold">
            Chúc mừng! Đơn hàng của bạn đã được thanh toán thành công!
          </h1>
          <p className="mt-2 text-center font-josefin text-lg font-bold">
            Cảm ơn bạn đã mua sắm tại cửa hàng của chúng tôi. Đơn hàng của bạn sẽ sớm được xử lý và giao đến bạn.
          </p>
        </>
      ) : (
        <>
          <FontAwesomeIcon icon={faCircleXmark} className="text-7xl text-red-500" />
          <h1 className="mt-4 text-center font-josefin text-3xl font-bold text-red-600">
            Thanh toán thất bại!
          </h1>
          <p className="mt-2 text-center font-josefin text-lg font-bold">
            Vui lòng thử lại hoặc liên hệ với bộ phận hỗ trợ để được trợ giúp.
          </p>
        </>
      )}

      <a
        href="/menu"
        className="mt-8 rounded-lg bg-[#d88453] px-6 pb-2 pt-4 font-josefin text-2xl text-white hover:rounded-3xl hover:bg-[#633c02]"
      >
        Tiếp tục mua sắm
      </a>
    </div>
  );
};

export default OrderResponse;
