import React, { useEffect, useState } from "react";
import "../index.css";
import { Link } from "react-router";
import useStore from "../store/useStore";
import MenuUser from "../components/user/card/MenuUser";
import { ShoppingCart } from "lucide-react";

const MainNavbar = () => {
  const token = useStore((state) => state.token);
  const [popupMenu, setPopupMenu] = useState(false);
  const username = useStore((state) => state.user);
  const cart = useStore((state) => state.cart);
  return (
    <div>
      <div className="flex justify-between bg-sky-500 h-[100px] items-center">
        <Link to="" className="font-bold text-4xl text-gray-100 ml-10">
          หน้าแรก
        </Link>
        <div className="flex justify-between">
          {username ? (
            <div className="flex justify-between gap-10">
              {cart && cart.length > 0 ? (
                <div className="relative py-4">
                  <div>
                    <Link to="/cart">
                      <ShoppingCart size={36} color="#ffffff" />
                    </Link>
                  </div>
                  <div className="absolute top-[-10px] right-[-8px] text-white mt-4 font-bold">
                    {cart.length}
                  </div>
                </div>
              ) : (
                <div className="mt-2">
                  <Link to="/cart">
                    <ShoppingCart size={36} color="#ffffff" />
                  </Link>
                </div>
              )}
              <div className="relative">
                <div className="w-[200px]">
                  <button
                    className="font-bold w-auto hover:cursor-pointer text-4xl text-gray-100 hover:bg-sky-600 ml-4 px-4 py-2"
                    onClick={() => setPopupMenu((perv) => !perv)}
                  >
                    {username}
                  </button>
                  {popupMenu && <MenuUser />}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex gap-10 text-gray-100 font-bold text-2xl mr-10">
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
