import React, { useState } from "react";
import "../../index.css";
import { Link } from "react-router";
import useStore from "../../store/useStore";
import MenuAdmin from "../../components/admin/card/MenuAdmin";
const MainNavbarAdmin = () => {
  const [popupMenu, setPopupMenu] = useState(false);
  const username = useStore((state) => state.user);
  return (
    <div className="flex justify-between bg-sky-500 h-[100px] text-center items-center px-10">
      <div className=" flex gap-10">
        <div>
          <Link className="text-4xl font-bold text-white" to="">
            Admin Panel
          </Link>
        </div>
      </div>
      <div className="relative">
        <div className="flex ">
          <button
            className="text-4xl font-bold text-white text-right hover:cursor-pointer"
            onClick={() => setPopupMenu((prev) => !prev)}
          >
            บัญชี: {username}
          </button>
        </div>
        {popupMenu && <MenuAdmin />}
      </div>
    </div>
  );
};

export default MainNavbarAdmin;
