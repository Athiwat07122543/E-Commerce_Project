import React, { useEffect, useRef } from "react";
import useStore from "../store/useStore";

const Success = () => {
  const actionAfterPayment = useStore((state) => state.actionAfterPayment);
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;
    const doAfterPayment = async () => {
      try {
        await actionAfterPayment();
      } catch (err) {
        console.error("Error after payment:", err);
      }
    };

    doAfterPayment();
  }, []);

  return <div className="flex justify-center items-center mt-20 font-bold text-4xl">ชำระเงินสำเร็จ ขอบคุณสำหรับการสั่งซื้อ!</div>;
};

export default Success;
