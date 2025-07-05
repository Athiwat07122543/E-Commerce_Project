import React, { useState, useEffect } from "react";
import ChangeAddress from "../user/card/ChangeAddress";
import { getAddress } from "../../api/User";
import useStore from "../../store/useStore";
import { checkOut } from "../../api/Stripe";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
const stripePromise = loadStripe(
  "pk_test_51RVPSOQ6qlMlWxcnx1S4D6SOuwHqpSv6qE7jHbq2GmOm4jkmMx0FY7tvbOGXiIUO3ds4Q2m8zqk8vJDLKOzvXxag00tccbutMY"
);

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
      console.log(res.data);
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
    <div className="p-4 flex justify-between ">
      <div className="w-full ml-4 mr-4 h-[400px] flex shadow-md border-md border-gray-200">
        <div className="m-2 w-[400px] border border-gray-200 shadow-md h-[100px] p-4">
          <div className="flex justify-between">
            <div>
              ชื่อผู้รับ: {address.recipientName}, เบอร์โทรศัพทิ์:
              {address.phone}
            </div>
          </div>
          <label>ที่อยู่: {address.addressDetail}</label>
        </div>
        <div>
          <button
            className="bg-sky-400 shadow-2xl mt-2 h-[50px] w-[120px]"
            onClick={() => setPopupChangeAddress(true)}
          >
            เปลื่ยนที่จัดส่ง
          </button>
        </div>
      </div>
      <div className="w-1/2 mr-4">
        <div className="flex gap-8 p-4">
          <div className="text-3xl">ราคารวม</div>
          <div className="text-4xl font-bold text-red-500">
            {getTotalPrice()}
          </div>
          <div className="text-3xl">บาท</div>
        </div>
        <div>
          {cart.map((item, index) => (
            <div
              className="flex mb-4 border  border-gray-200 p-2 shadow-md justify-between"
              key={index}
            >
              <div className="flex">
                {item.images && item.images.length > 0 && item.images[0] ? (
                  <img
                    className="w-[200px] h-[200px] p-4"
                    src={`http://localhost:3000/uploads/${item.images[0].imageUrl}`}
                  />
                ) : (
                  <div className="w-[200px] h-[200px] p-4">NO image</div>
                )}

                <div className="ml-4">
                  <div className="font-bold">{item.name}</div>
                  <div className="flex gap-2 mt-2">
                    <div>{item.count}</div>
                    <div>x</div>
                    <div>{item.price}</div>
                    <div className="flex gap-2"></div>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex gap-2 items-center mr-2">
                  <div className="text-xl ">ราคา</div>
                  <div className="font-bold text-2xl text-red-500">
                    <div> {item.count * item.price}</div>
                  </div>
                  <div className="text-xl ">บาท</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div>
          <button
            onClick={handleCheckOut}
            className="hover:cursor-pointer h-[40px]  w-[80px] border"
          >
            ชำระเงิน
          </button>
        </div>
      </div>
      {popupAddAddress && (
        <AddAddress getClose={() => setPopupAddAddress(false)} />
      )}
      {popupChangeAddress && (
        <ChangeAddress getClose={() => setPopupChangeAddress(false)} />
      )}
    </div>
  );
};

export default Payment;
