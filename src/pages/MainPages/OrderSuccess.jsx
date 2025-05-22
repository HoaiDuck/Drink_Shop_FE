import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { useSearchParams } from "react-router-dom";
import { OrderAPI } from "@/service";
import { toast } from "react-toastify";

const OrderSuccess = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const vnp_TxnRef = searchParams.get("vnp_TxnRef");
    const vnp_ResponseCode = searchParams.get("vnp_ResponseCode");
    const fetchData = async () => {
      try {
        const data = {
          id: vnp_TxnRef,
          status: "SUCCESS",
        };
        const response = await OrderAPI.setStatus(data);
        console.log("Check after payment:", response);
      } catch (error) {
        console.error(error);
      }
    };
    if (vnp_TxnRef && vnp_ResponseCode === "00") {
      fetchData();
    } else {
      toast.error("Lỗi khi xác thực thanh toán!");
    }
  }, []);

  return (
    <div className="success-container mb-28 mt-20 flex flex-col place-content-center items-center sm:mb-32 sm:mt-32">
      <FontAwesomeIcon
        icon={faCircleCheck}
        className="text-7xl text-green-500"
      />
      <h1 className="mt-4 text-center font-josefin text-3xl font-bold">
        Chúc mừng! Đơn hàng của bạn đã được thanh toán thành công!
      </h1>
      <p className="mt-2 text-center font-josefin text-lg font-bold">
        Cảm ơn bạn đã mua sắm tại cửa hàng của chúng tôi. Đơn hàng của bạn sẽ
        sớm được xử lý và giao đến bạn.
      </p>
      <a
        href="/menu"
        className="mt-8 rounded-lg bg-[#d88453] px-6 pb-2 pt-4 font-josefin text-2xl text-white hover:rounded-3xl hover:bg-[#633c02]"
      >
        Tiếp tục mua sắm
      </a>
    </div>
  );
};

export default OrderSuccess;
