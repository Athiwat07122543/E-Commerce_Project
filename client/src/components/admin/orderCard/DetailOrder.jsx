import React, { useEffect, useState } from "react";

const DetailOrder = ({ onClose, data }) => {
  const [detailOrder, setDetailOrder] = useState("");

  useEffect(() => {
    setDetailOrder(data);
  }, [data]);

  console.log(detailOrder);

  return (
    <div className="fixed inset-0 flex justify-center items-center backdrop-blur-md z-50 rounded-2xl shadow-md">
      <div className="bg-white  shadow-md w-[1000px] rounded-2xl">
        <div className="flex justify-between items-center bg-sky-500 text-white px-4 py-2 font-semibold rounded-t-2xl  shadow-md">
          <span>รายละเอียดคำสั่งซื้อ</span>
          <button onClick={onClose}>X</button>
        </div>
        <div className="p-4 space-y-2  shadow-md h-[380px] max-h-[600px]">
          <div className="flex gap-6">
            <div className=" text-2xl">คำสั่งซื้อ</div>
            <div className="py-1">วันที่สั่งซื้อ: {detailOrder.createdAt}</div>
            <div className="py-1">สถานะ: {detailOrder.status}</div>
            <div className="py-1">หมายเลขขนส่ง: {detailOrder.shippingnumber || null}</div>
          </div>
          <div className="h-[140px]">
            <div className="mb-2  text-2xl ">ข้อมูลผู้ซื้อ</div>
            <div className="mb-1">
              <div>ข้อมูลผู้ซื้อ: {detailOrder?.user?.username}</div>
              <div className="mb-1 px-2">
                ชื่อ:{detailOrder?.address?.recipientName}
              </div>
              <div className="mb-1 px-2">
                เบอร์โทร:{detailOrder?.address?.phone}
              </div>
              <div className="mb-1 px-2">
                ที่อยู่จัดส่ง: {detailOrder?.address?.addressDetail}
              </div>
            </div>
          </div>
          <div></div>
          <div className="h-[100px]">
            <div className="text-xl mb-2 mt-4 h-auto">รายการสินค้า</div>
            <div>
              {detailOrder.orderDetails?.map((item) => (
                <div className="flex justify-between">
                  <div className="px-2">{item.product.name}</div>
                  <div className="flex gap-4">
                    <div>{item.quantity}</div>
                    <div>X</div>
                    <div>{item.price}</div>
                    <div>=</div>
                    <div>{item.price * item.quantity}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="flex gap-4 text-xl">
              <div>ราคารวม:</div>
              <div className="text-red-500 text-bold">
                {detailOrder.totalPrice}
              </div>
            </div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailOrder;
