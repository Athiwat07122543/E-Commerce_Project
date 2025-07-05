import React, { useEffect, useState } from "react";
import useStore from "../../store/useStore";
import { getOrders } from "../../api/Admin";
import Order from "../../components/admin/Order";
const OrdersPage = () => {
  return (
    <div>
      <Order />
    </div>
  );
};

export default OrdersPage;
