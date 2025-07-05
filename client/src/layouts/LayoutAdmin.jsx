import React from "react";
import { Outlet } from "react-router";
import MainNavbarAdmin from "../components/admin/MainNavbarAdmin";
import SidebarAdmin from "../components/admin/SidebarAdmin";

const LayoutAdmin = () => {
  return (
    <>
      <div className="">
        <MainNavbarAdmin />
      </div>
      <div className="flex justify-between">
        <div className="w-1/9">
          <SidebarAdmin />
        </div>
        <div className="w-1/1">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default LayoutAdmin;
