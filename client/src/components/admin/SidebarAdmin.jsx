import React from "react";
import { Link } from "react-router";
import useStore from "../../store/useStore";


const SidebarAdmin = () => {


  return (
    <div className="p-4 bg-sky-500 h-screen">
      <div className="">
        <p>
          <Link className="text-white text-[20px]" to={""}>
            Dashboard
          </Link>
        </p>
        <p>
          <Link className="text-white text-[20px]" to={"category"}>
            Category
          </Link>
        </p>
        <p>
          <Link className="text-white text-[20px]" to={"product"}>
            Product
          </Link>
        </p>
        <p>
          <Link className="text-white text-[20px]" to={"user"}>
            User
          </Link>
        </p>
        <p>
          <Link className="text-white text-[20px]" to={"orders"}>
            Orders
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SidebarAdmin;
