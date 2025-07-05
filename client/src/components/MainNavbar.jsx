import React, { useEffect, useState } from "react";
import "../index.css";
import { Link } from "react-router";
import useStore from "../store/useStore";
import { CiShoppingCart } from "react-icons/ci";
import MenuUser from "../components/user/card/MenuUser";
import { ShoppingCart } from "lucide-react";
import { checkRole } from "../api/Auth";
const MainNavbar = () => {
  const token = useStore((state) => state.token);
  const [popupMenu, setPopupMenu] = useState(false);
  const username = useStore((state) => state.user);
  const cart = useStore((state) => state.cart);
  return (
    <div>
      <div className="flex justify-between bg-sky-500 h-[100px] items-center px-10 shadow-md">
        <Link to="" className="font-bold text-4xl text-white">
          หน้าแรก
        </Link>
        <div className="flex justify-between">
          {username ? (
            <div className="flex justify-between gap-10">
              {cart && cart.length > 0 ? (
                <div className="relative">
                  <div>
                    <Link to="/cart">
                      <ShoppingCart size={36} color="#ffffff" />
                    </Link>
                  </div>
                  <div className="absolute top-[-10px] right-[-8px] text-white">
                    {cart.length}
                  </div>
                </div>
              ) : (
                <div>
                  <Link to="/cart">
                    <ShoppingCart size={36} color="#ffffff" />
                  </Link>
                </div>
              )}
              <div className="relative">
                <div className="w-[200px]">
                  <button
                    className="font-bold w-[200px] hover:cursor-pointer  text-4xl text-white"
                    onClick={() => setPopupMenu((perv) => !perv)}
                  >
                    {username}
                  </button>
                  <div className="">{popupMenu && <MenuUser />}</div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <Link to="register">สมัครบัญชี</Link>
              <Link to="login">เข้าสู่ระบบ</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainNavbar;
