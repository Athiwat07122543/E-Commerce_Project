import React, { useEffect, useState } from "react";
import useStore from "../../store/useStore";
import { getOrderBy } from "../../api/User";
import moment from "moment";

const Order = () => {
  moment.locale("th");
  const token = useStore((state) => state.token);
  const [order, setOrder] = useState([]);

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
        order.map((item,index) => (
          <div className="bg-white rounded-2xl border border-gray-200 mt-4 shadow-md w-full" key={index}>
            <div className="ml-6 mr-6 py-4">
              <div>ข้อมูลสั่งซื้อสินค้า</div>
              <div className="flex mt-2">
                <div className="w-[80px]">วันที่สั่งซื้อ:</div>
                <div className="w-[160px]">
                  {moment(item.createdAt).format("LLL")}
                </div>
                <div className="w-[60px]">สถานะ:</div>
                <div className="w-[120px]">{item.status}</div>
                <div className="w-[140px]">หมายเลขส่งสินค้า:</div>
                <div className="w-[200px]">
                  {item ? item.shippingnumber : null}
                </div>
              </div>

              {item.orderDetails.length > 0
                ? item.orderDetails.map((item,index) => (
                    <div className="flex w-full mt-4 gap-2 border border-gray-200 shadow-md" key={index}>
                      {item.product.images.length > 0 ? (
                        <img
                          className="h-[100px] w-[200px]"
                          src={`http://localhost:3000/uploads/${item.product.images[0].imageUrl}`}
                          alt="product"
                        />
                      ) : (
                        <div className="h-[100px] w-[200px] flex items-center justify-center">
                          No Image
                        </div>
                      )}
                      <div className="w-[500px] p-2">ชื่อสินค้า: {item.product.name}</div>
                      <div className="w-[500px] p-2">
                        <div>ราคา: {item.product.price}</div>
                        <div>จำนวน: {item.quantity}</div>
                      </div>
                      <div className="w-[500px] text-right mr-10 py-2">
                        ราคารวม: {item.product.price * item.quantity}
                      </div>
                    </div>
                  ))
                : null}
              <div className="flex justify-between py-4">
                <div className="">
                  <div>ข้อมูลจัดส่ง</div>
                  <div>ชื่อ: {item.address.recipientName}</div>
                  <div>เบอร์โทร: {item.address.phone}</div>
                  <div>ที่อยู่: {item.address.addressDetail}</div>
                </div>
                <div>
                  <div>ราคารวมทั้งหมด : {item.totalPrice}</div>
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
        <div>ไม่มีรายการ</div>
      )}
    </div>
  );
};

export default Order;
