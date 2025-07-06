import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import useStore from "../../../store/useStore";
import { useNavigate } from "react-router";
import { checkRole } from "../../../api/Auth";
const MenuUser = () => {
  const token = useStore((state) => state.token);
  const actionLogout = useStore((state) => state.actionLogout);
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogout = async () => {
    try {
      await actionLogout();
      navigate("/");
      return;
    } catch (err) {
      console.log(err);
    }
  };

  const checkAdmin = async () => {
    try {
      const res = await checkRole(token);
      if (res.data.payload.role === "admin") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    checkAdmin();
  }, [token]);


  return (
    <div className="absolute left-0 top-full w-[160px] border bg-white border-gray-200 shadow-md rounded z-50 max-h-40 overflow-y-auto">
      {isAdmin && (
        <div className="hover:cursor-pointer text-center hover:bg-gray-200">
          <Link to="/admin">แดชบอร์ดแอดมิน</Link>
        </div>
      )}
      <div className="hover:cursor-pointer text-center hover:bg-gray-200">
        <Link to="/user/order">ประวัติการสั่งซื้อ</Link>
      </div>
      <div className="hover:cursor-pointer text-center hover:bg-gray-200">
        <button onClick={handleLogout}>ออกจากระบบ</button>
      </div>
    </div>
  );
};

export default MenuUser;
