import React, { useEffect, useState } from "react";
import useStore from "../../../store/useStore";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { getOrdersMonthlySales } from "../../../api/Admin";
const OrdersMonthlySales = () => {
  const token = useStore((state) => state.token);
  const [orders, setOrders] = useState({ labels: [], data: [] });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await getOrdersMonthlySales(token);
      setOrders({ labels: res.data.labels, data: res.data.data });
    } catch (err) {
      console.log(err);
    }
  };

  const showData = {
    labels: orders.labels,
    datasets: [
      {
        label: "รายการสั่งซื้อวันนี้",
        data: orders.data,
        backgroundColor: "#008000",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "ยอดขายรายเดือน",
      },
    },
  };
  return (
    <div className="relative w-full h-[400px]">
      <Bar data={showData}
      options={options}
       />
    </div>
  );
};

export default OrdersMonthlySales;
