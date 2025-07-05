import React from "react";
import { Outlet } from "react-router";
import MainNavbar from "../components/MainNavbar";
import Sidebar from "../components/Sidebar";

const Layout = () => {
  return (
    <>
      <div className="">
        <MainNavbar />
      </div>
      <div className="w-1/1">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
