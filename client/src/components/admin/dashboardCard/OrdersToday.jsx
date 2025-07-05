import React, { useState, useEffect } from "react";
import { ordersToDay } from "../../../api/Admin";
import useStore from "../../../store/useStore";
const OrdersToday = () => {
  const token = useStore((state) => state.token);
  const [orders, setOrders] = useState(null);

  const getData = async () => {
    const res = await ordersToDay(token);
    setOrders(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="py-4 text-center font-bold text-4xl">
        รายการสั่งซื้อวันนี้
      </div>
      {orders &&
        (orders.length ? (
          <div className="font-bold text-6xl text-green-500 text-center">{orders.length}</div>
        ) : (
          <div className="font-bold text-6xl text-green-500 text-center">ไม่มีข้อมูล</div>
        ))}
    </div>
  );
};

export default OrdersToday;
