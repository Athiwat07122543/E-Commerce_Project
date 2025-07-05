import React, { useEffect, useState } from "react";
import useStore from "../../../store/useStore";
import { updateOrder } from "../../../api/Admin";
import { FaRegSave } from "react-icons/fa";
import { toast } from "react-toastify";

const UpdateOrder = ({ onClose, data }) => {
  const token = useStore((state) => state.token);
  const [dropdown, setDropdown] = useState(false);
  const [order, setOrder] = useState({
    id: "",
    status: "",
    shippingnumber: "",
  });

  useEffect(() => {
    setOrder({
      ...order,
      id: data.id,
      status: data.status,
      shippingnumber: data.shippingnumber,
    });
  }, []);

  useEffect(() => {
    console.log(order);
  }, [order]);

  const handleUpdate = async () => {
    try {
      const res = await updateOrder(token, order);
      onClose()
      toast.success("อัพเดทรายการเรียบร้อย")
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center backdrop-blur-md z-50  rounded-2xl">
      <div className="bg-white shadow-lg w-[320px] rounded-2xl">
        <div className="flex justify-between items-center bg-sky-500 text-white px-4 py-2 font-semibold rounded-t-2xl">
          <span>แก้ไข Category</span>
          <button onClick={onClose}>X</button>
        </div>
        <div>
          <div className="p-4">
            <div className="relative">
              <label className="block mb-1 font-medium">สถานะ</label>
              <div
                className="border px-3 py-2 rounded cursor-pointer bg-gray-100 h-[40px]"
                onClick={() => setDropdown((prev) => !prev)}
              >
                {order.status}
              </div>
              {dropdown && (
                <div className="absolute left-0 top-full mt-1 w-full bg-white border rounded shadow-lg z-50 max-h-40 overflow-y-auto">
                  <div
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setOrder({ ...order, status: "ชำระเงิน" });
                      setDropdown(false);
                    }}
                  >
                    ชำระเงิน
                  </div>
                  <div
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setOrder({ ...order, status: "จัดส่งสินค้า" });
                      setDropdown(false);
                    }}
                  >
                    จัดส่งสินค้า
                  </div>
                </div>
              )}
            </div>
            <div className="mt-2">
              <div>รหัสขนส่งสินค้า</div>
              <label>
                <textarea
                  maxLength={10}
                  value={order.shippingnumber || ""}
                  className="border w-full shadow-md border-gray-200 max-h-[40px] h-[40px] p-2"
                  onChange={(e) =>
                    setOrder((prev) => ({
                      ...prev,
                      shippingnumber: e.target.value,
                    }))
                  }
                />
              </label>
            </div>
            <div className="mt-2">
              <button onClick={handleUpdate}>
                <FaRegSave size={32} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateOrder;
