import React, { useEffect, useState } from "react";
import useStore from "../../store/useStore";
import { getOrderBy } from "../../api/User";
import moment from "moment";
import numeral from "numeral";
import ReceiptPDF from "./card/ReceiptPDF";

const Order = () => {
  moment.locale("th");
  const token = useStore((state) => state.token);
  const [order, setOrder] = useState([]);
  const [popupReceipt, setPopupReceipt] = useState(false);

  const listOrder = async () => {
    const res = await getOrderBy(token);
    setOrder(res.data);
  };
  useEffect(() => {
    listOrder();
  }, []);

  return (
    <div className="px-16  h-screen">
      {order.length > 0 ? (
        order.map((item, index) => (
          <div
            className="bg-white rounded-2xl border border-gray-200 mt-4 shadow-md w-full"
            key={index}
          >
            <div className="ml-6 mr-6 py-4">
              <div className="text-xl">ข้อมูลสั่งซื้อสินค้า</div>
              <div className="flex mt-2 text-xl">
                <div className="w-[100px]">วันที่สั่งซื้อ:</div>
                <div className="w-[200px]">
                  {moment(item.createdAt).format("LLL")}
                </div>
                <div className="w-[80px]">สถานะ:</div>
                <div className="w-[160px]">{item.status}</div>
                <div className="w-[200px]">หมายเลขส่งสินค้า:</div>
                <div className="w-[200px]">
                  {item ? item.shippingnumber : null}
                </div>
              </div>

              {item.orderDetails.length > 0
                ? item.orderDetails.map((item, index) => (
                    <div
                      className="flex w-full mt-4 gap-2 border border-gray-200 shadow-md"
                      key={index}
                    >
                      {item.product.images.length > 0 ? (
                        <img
                          className="h-[140px] w-[200px]"
                          src={`https://e-commerce-project-backend-mu.vercel.app/uploads/${item.product.images[0].imageUrl}`}
                          alt="product"
                        />
                      ) : (
                        <div className="h-[140px] w-[200px] flex items-center justify-center">
                          No Image
                        </div>
                      )}
                      <div className="w-[500px] p-2 text-xl">
                        ชื่อสินค้า: {item.product.name}
                      </div>
                      <div className="w-[500px] p-2 text-xl">
                        <div>
                          ราคา: {numeral(item.product.price).format("0,0")}
                        </div>
                        <div>จำนวน: {item.quantity}</div>
                      </div>
                      <div className="w-[500px] text-right mr-10 py-2 text-xl">
                        ราคารวม:{" "}
                        {numeral(item.product.price * item.quantity).format(
                          "0,0"
                        )}
                      </div>
                    </div>
                  ))
                : null}
              <div className="flex justify-between py-4">
                <div className="">
                  <div className="text-xl">ข้อมูลจัดส่ง</div>
                  <div className="text-xl">
                    ชื่อ: {item.address.recipientName}
                  </div>
                  <div className="text-xl">เบอร์โทร: {item.address.phone}</div>
                  <div className="text-xl">
                    ที่อยู่: {item.address.addressDetail}
                  </div>
                </div>
                <div>
                  <div className="mr-4 font-bold text-xl">
                    ราคารวมทั้งหมด : {numeral(item.totalPrice).format("0,0")}
                  </div>
                  <button
                    className="mt-6 ml-12 text-2xl font-bold hover:cursor-pointer border border-gray-200 p-2 shadow hover:bg-gray-300"
                    onClick={() => setPopupReceipt((prev) => !prev)}
                  >
                    ใบสั่งซื้อสินค้า
                  </button>
                  {popupReceipt && <ReceiptPDF getData={item} onClose={() => setPopupReceipt((prev) => !prev)}/>}
                  {item.status === "ยังไม่ชำระเงิน" && item.stripeUrl && (
                    <button className="mt-6 ml-12 text-2xl font-bold hover:cursor-pointer border border-gray-200 p-2 shadow hover:bg-gray-300">
                      <a href={item.stripeUrl} target="_blank">
                        ชำระเงิน
                      </a>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="flex justify-center mt-50 font-bold text-4xl">
          ไม่มีรายการสั่งซื้อสินค้า
        </div>
      )}
    </div>
  );
};

export default Order;
