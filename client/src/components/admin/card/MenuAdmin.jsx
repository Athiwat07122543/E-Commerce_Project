import React from "react";
import { Link } from "react-router";
import useStore from "../../../store/useStore";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const MenuAdmin = () => {
  const actionLogout = useStore((state) => state.actionLogout);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await actionLogout();
      toast.success("ออกจากระบบ");
      navigate("/");
      return;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="absolute left-0 top-full w-[160px] border bg-white border-gray-200 shadow-md rounded z-50 max-h-40 overflow-y-auto mt-2 ml-18">
      <div className="hover:cursor-pointer h-[30px] py-1 ">
        <Link to={"/"}>หน้าร้านค้า</Link>
      </div>
      <div >
        <button onClick={handleLogout} className="hover:cursor-pointer h-[30px]">ออกจากระบบ</button>
      </div>
    </div>
  );
};

export default MenuAdmin;
