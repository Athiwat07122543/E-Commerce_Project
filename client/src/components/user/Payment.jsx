import React, { useState, useEffect } from "react";
import ChangeAddress from "../user/card/ChangeAddress";
import { getAddress } from "../../api/User";
import useStore from "../../store/useStore";
import { checkOut } from "../../api/Stripe";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import numeral from "numeral";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const Payment = () => {
  const navigate = useNavigate();
  const token = useStore((state) => state.token);
  const getTotalPrice = useStore((state) => state.getTotalPrice);
  const actionUpdateCart = useStore((state) => state.actionUpdateCart);
  const [popupAddAddress, setPopupAddAddress] = useState(false);
  const [popupChangeAddress, setPopupChangeAddress] = useState(false);
  const [address, setAddress] = useState([]);
  const cart = useStore((state) => state.cart);

  const listAddress = async () => {
    const res = await getAddress(token);
    res?.data.map((item) => {
      if (item.isDefault === true) {
        setAddress(item);
      }
    });
  };

  useEffect(() => {
    listAddress();
  }, []);

  useEffect(() => {
    listAddress();
  }, [popupChangeAddress]);

  const handleCheckOut = async () => {
    try {
      if (address.length <= 0) {
        toast.warning("กรุณาเพิ่มที่อยู่จัดส่งสินค้าก่อน");
        return;
      }
      const data = {
        addressId: address.id,
        product: cart,
      };
      const res = await checkOut(token, data);
      if (res.data.success === false) {
        if (res.data.error === "PRODUCT_DONT_MATCH_QUANTITY") {
          toast.warning(res.data.message);
          await actionUpdateCart(token);
          return navigate("/");
        }
        if (res.data.error === "PRODUCT_IS_OUT_OF_STOCK")
          toast.warning(res.data.message);
        await actionUpdateCart(token);
        return navigate("/");
      }
      const sessionId = res.data.sessionId;
      const stripeClient = await stripePromise;
      if (stripeClient) {
        await stripeClient.redirectToCheckout({ sessionId });
      } else {
        console.error("Stripe not loaded");
      }
      return;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-4 flex justify-between">
      <div className="w-7/10">
        <div className="h-[360px] ml-8 mt-8 mr-4 shadow-2xl border border-gray-100">
          <div className="ml-8 mt-8 mr-8  bg-sky-500 text-white w-[160px] h-[50px] items-center text-center py-2 shadow-md hover:bg-sky-600 hover:cursor-pointer text-xl">
            <button onClick={() => setPopupChangeAddress(true)}>
              จัดการที่อยู่จัดส่ง
            </button>
          </div>
          <div className="flex ml-8 mt-4 mr-8 space-x-10">
            <div className="h-[100px]">
              <div className="text-2xl">ชื่อผู้รับ</div>
              <div className="text-2xl mt-2 border border-gray-100 h-[40px] px-4 w-[400px] bg-gray-100 rounded-xl">
                {address.recipientName || null}
              </div>
            </div>
            <div className="h-[100px]">
              <div className="text-2xl">เบอร์โทรศัพท์</div>
              <div className="text-2xl mt-2 border border-gray-100 h-[40px] px-4 w-[400px] bg-gray-100 rounded-xl">
                {address.phone || null}
              </div>
            </div>
          </div>
          <div className="h-[100px] ml-8 mt-4 mr-8">
            <div className="text-2xl">ที่อยู่จัดส่ง</div>
            <div className="text-2xl mt-2 border border-gray-100 h-[40px] px-4 w-full bg-gray-100 rounded-xl">
              {address.addressDetail || null}
            </div>
          </div>
        </div>
        {popupAddAddress && (
          <AddAddress getClose={() => setPopupAddAddress(false)} />
        )}
        {popupChangeAddress && (
          <ChangeAddress getClose={() => setPopupChangeAddress(false)} />
        )}
        <div className="flex justify-end mt-4 pr-8">
          <button
            onClick={handleCheckOut}
            className="hover:cursor-pointer h-[40px] w-[100px] bg-green-500 text-white shadow hover:bg-green-700 text-xl rounded"
          >
            ชำระเงิน
          </button>
        </div>
      </div>

      <div className="w-3/10 ml-4 mt-8 mr-8 shadow-2xl border border-gray-100">
        <div className="h-[60px] flex mt-4">
          <div className="text-3xl w-1/3 text-center">ราคารวม</div>
          <div className="text-4xl font-bold text-red-500 w-1/3 text-center">
            {numeral(getTotalPrice()).format("0,0")}
          </div>
          <div className="text-3xl w-1/3 text-center">บาท</div>
        </div>
        <div className="m-2">
          {cart.map((item, index) => (
            <div
              className="h-[200px] flex mb-4 border border-gray-200 shadow-md"
              key={index}
            >
              <div className="w-1/2">
                {item.images && item.images.length > 0 && item.images[0] ? (
                  <img
                    className="w-[240px] h-[180px]"
                    src={`https://e-commerce-project-backend-mu.vercel.app/uploads/${item.images[0].imageUrl}`}
                  />
                ) : (
                  <div className="w-[240px] h-[180px] flex items-center px-16">
                    NO image
                  </div>
                )}
              </div>
              <div className="w-1/2 m-2 space-y-2">
                <div className="font-bold text-2xl">{item.name}</div>
                <div className="text-xl">จำนวน: {item.count} ชิ้น</div>
                <div className="flex">
                  <div className="w-1/3 text-xl">ราคา</div>
                  <div className="w-1/3 text-xl text-red-500 font-bold">
                    {numeral(item.price).format("0,0")}
                  </div>
                  <div className="w-1/3 text-xl text-center">บาท</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Payment;
