import React, { useEffect, useReducer, useState } from "react";
import useStore from "../../store/useStore";
import { Link } from "react-router";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import numeral from "numeral";

const Cart = () => {
  const cart = useStore((state) => state.cart);
  const user = useStore((state) => state.user);
  const getTotalPrice = useStore((state) => state.getTotalPrice);
  const [button, setbutton] = useState(false);
  const navigate = useNavigate();
  const actionRemoveCountCart = useStore(
    (state) => state.actionRemoveCountCart
  );
  const actionAddCountCart = useStore((state) => state.actionAddCountCart);

  const getButton = async () => {
    if (!cart || cart === null) {
      setbutton(false);
    } else if (cart.length > 0) {
      setbutton(true);
    }
  };

  useEffect(() => {
    getButton();
  }, []);

  const buttonPayment = async () => {
    if (!button) {
      toast.warning("กรุณาเลือกซื้อสินค้าก่อน");
    } else {
      navigate("/user/payment");
    }
  };

  const handleRemoveCount = async (id) => {
    try {
      const result = await actionRemoveCountCart(id);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddCount = async (id) => {
    try {
      const result = await actionAddCountCart(id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-4 flex ">
      <div className="ml-4 mt-4 w-[5000px] h-screen space-y-6">
        {cart.length > 0 ? (
          cart.map((item) => (
            <div
              className=" h-[300px] w-full flex border-gray-200 gap-4 shadow-md border"
              key={item.id}
            >
              <div className="flex max-w-[400px]">
                {item.images && item.images.length > 0 && item.images[0] ? (
                  <img
                    className="w-[500px] h-[300px] p-4"
                    src={`https://e-commerce-project-backend-mu.vercel.app/uploads/${item.images[0].imageUrl}`}
                  />
                ) : (
                  <div className="flex w-[500px] h-[300px] items-center px-40">
                    NO image
                  </div>
                )}
              </div>
              <div className="h-[250px] w-[600px] mt-10">
                <div className="font-bold text-2xl">{item.name}</div>
                <div>
                  <div className="flex gap-10">
                    <div className="text-2xl">ราคา</div>
                    <div className="text-2xl text-red-500 font-bold">
                      {numeral(item.price).format("0,0")}
                    </div>
                    <div className="text-2xl">บาท</div>
                  </div>
                  <div className="flex gap-10">
                    <div className="text-2xl ">จำนวน</div>
                    <div className="text-2xl text-red-500 font-bold ml-4">
                      {item.count}
                    </div>
                    <div className="text-2xl ml-6">ชิ้น</div>
                  </div>
                </div>
              </div>
              <div className="w-[300px]">
                <div className="flex mt-10">
                  <div className="font-bold text-2xl">ราคา</div>
                  <div className="font-bold text-4xl text-red-500 w-[150px] text-center">
                    {numeral(item.price * item.count).format("0,0")}
                  </div>
                  <div className="font-bold text-2xl">บาท</div>
                </div>
                <div className="flex h-[150px] gap-2 px-10 mt-10">
                  <button
                    className="font-bold text-xl w-[50px] h-[40px] shadow text-center bg-gray-100 hover:bg-gray-200"
                    onClick={() => handleRemoveCount(item.id)}
                  >
                    ลด
                  </button>
                  <div className="font-bold text-2xl w-[50px] h-[40px] shadow text-center py-1">
                    {item.count}
                  </div>
                  <button
                    className="font-bold text-xl w-[50px] h-[40px] shadow text-center bg-gray-100 hover:bg-gray-200"
                    onClick={() => handleAddCount(item.id)}
                  >
                    เพิ่ม
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center font-bold text-2xl">
            ไม่มีข้อมูลตะกร้าสินค้า
          </div>
        )}
      </div>
      <div className="w-full h-[150px] border border-gray-200 shadow-2xl mt-4 ml-4 ">
        <div className="mt-4 ml-4 mr-4 h-[60px] flex gap-4 w-full">
          <div className="font-bold text-xl py-4">รวมยอดทั้งหมด</div>
          <div className="font-bold text-6xl text-red-500 h-[60px] w-[250px] text-center">
            {numeral(getTotalPrice()).format("0,0")}
          </div>
          <div className="font-bold text-xl py-4">บาท</div>
        </div>
        <div className="ml-4 mr-4 mt-4">
          {user ? (
            <button
              onClick={buttonPayment}
              className=" h-[40px] w-full text-center shadow-md bg-sky-400 hover:bg-sky-500 hover:cursor-pointer"
            >
              ชำระเงิน
            </button>
          ) : (
            <button className="border border-gray-200 h-[40px] w-full text-center shadow-md">
              <Link to="/login">เข้าสู่ระบบ</Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
