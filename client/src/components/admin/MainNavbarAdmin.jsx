import React from "react";
import "../../index.css";
import { Link } from "react-router";
import useStore from "../../store/useStore";

const MainNavbarAdmin = () => {
  const username = useStore((state) => state.user);
  return (
    <div className="flex justify-between bg-sky-500 h-[100px] text-center items-center px-10">
      <div className=" flex gap-10">
        <div>
          <Link className="text-4xl font-bold text-white" to="">
            Admin Panel
          </Link>
        </div>
        <div className="mt-2  shadow-2xl h-[40px] w-[130px] items-center py-1 bg-sky-400 hover:bg-sky-300">
          <Link className="text-xl text-white" to="/">
            เข้าหน้าร้านค้า
          </Link>
        </div>
      </div>
      <div>
        <div className="flex">
          <p className="text-4xl font-bold text-white text-right">
            บัญชี: {username}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MainNavbarAdmin;
