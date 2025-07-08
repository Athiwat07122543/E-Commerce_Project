import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "../layouts/Layout";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import CheckRole from "./CheckRole";
import DashboardPage from "../pages/admin/DashboardPage";
import CategoryPage from "../pages/admin/CategoryPage";
import ProductPage from "../pages/admin/ProductPage";
import UserPage from "../pages/admin/UserPage";
import HomePage from "../pages/HomePage";
import UploadPage from "../pages/UploadPage";
import PaymentPage from "../pages/user/PaymentPage";
import CheckUser from "./CheckUser";
import Success from "../pages/Success";
import Cancel from "../pages/Cancel";
import CartPage from "../pages/user/CartPage";
import OrderPage from "../pages/user/OrderPage";
import OrdersPage from "../pages/admin/OrdersPage";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: "register",
        Component: RegisterPage,
      },
      {
        path: "login",
        Component: LoginPage,
      },
      {
        path: "upload",
        Component: UploadPage,
      },
      {
        path: "cart",
        Component: CartPage,
      },
      {
        path: "Success",
        Component: Success,
      },
      {
        path: "cancel",
        Component: Cancel,
      },
    ],
  },
  {
    path: "/admin",
    Component: CheckRole,
    children: [
      {
        index: true,
        Component: DashboardPage,
      },
      {
        path: "category",
        Component: CategoryPage,
      },
      {
        path: "product",
        Component: ProductPage,
      },
      {
        path: "user",
        Component: UserPage,
      },
      {
        path: "orders",
        Component: OrdersPage
      }
    ],
  },
  {
    path: "/user",
    Component: CheckUser,
    children: [
      { index: true, Component: HomePage },
      {
        path: "payment",
        Component: PaymentPage,
      },
      {
        path: "order",
        Component: OrderPage
      }
    ],
  },
]);
const WebRouter = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default WebRouter;
