import React from "react";
import OrdersToday from "../../components/admin/dashboardCard/OrdersToday";
import OrdersMonthlySales from "../../components/admin/dashboardCard/OrdersMonthlySales";
import TotalSalesToDay from "../../components/admin/dashboardCard/TotalSalesToDay"

const DashboardPage = () => {
  return (
    <div className="h-screen p-4">
      <div className="flex gap-2">
        <div className="border h-[200px] w-1/4">
          <OrdersToday />
        </div>
        <div className="border h-[200px] w-1/4">
          <TotalSalesToDay />
        </div>
      </div>
      <div className="mt-2">
        <div className="border h-[400px] max-w-full">
          <OrdersMonthlySales />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
