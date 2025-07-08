import React, { useState, useEffect, use } from "react";
import useStore from "../../store/useStore";
import { getOrders } from "../../api/Admin";
import moment from "moment";
import "moment/locale/th";
import numeral from "numeral";
import UpdateOrder from "./orderCard/UpdateOrder";
import { FaRegEdit } from "react-icons/fa";
import DetailOrder from "./orderCard/DetailOrder";

const Order = () => {
  moment.locale("th");
  const token = useStore((state) => state.token);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(2);
  const [totalPage, SetTotalPage] = useState(0);
  const [orders, setOrders] = useState([]);
  const [orderBy, setOrderBy] = useState(null);
  const [popupUpdateOrder, setPopupUpdateOrder] = useState(false);
  const [popupDetailOrder, setPopupDetailOrder] = useState(false);
  const [status, setStatus] = useState("");
  const listOrders = async () => {
    const res = await getOrders(token, page, limit, status);
    SetTotalPage(res.data.totalPages);
    setOrders(res.data.orders);
  };

  useEffect(() => {
    listOrders();
  }, [page, status]);

  const handleNextPage = () => {
    if (page < totalPage) {
      setPage((perv) => perv + 1);
    }
  };

  const handlePervPage = () => {
    if (page > 1) {
      setPage((perv) => perv - 1);
    }
  };

  return (
    <div className="p-8">
      <div>
        <div className="mb-4">
          <select
            className="border border-gray-300 rounded px-2 py-1"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
          >
            <option value="">ทั้งหมด</option>
            <option value="ยังไม่ชำระเงิน">ยังไม่ชำระ</option>
            <option value="ชำระเงินเรียบร้อย">ชำระเงินเรียบร้อย</option>
            <option value="จัดส่งสินค้า">จัดส่งสินค้า</option>
          </select>
        </div>
        {Array.isArray(orders) ? (
          orders.length > 0 ? (
            <table className="table-auto px-2 p-2 w-full shadow-md ">
              <thead>
                <tr className="bg-sky-500 h-[50px]">
                  <th className="border border-gray-300 w-[40px] p-2">ลำดับ</th>
                  <th className="border border-gray-300 w-[80px] p-2">
                    วันที่สั่งซื้อ
                  </th>
                  <th className="border border-gray-300 w-[220px] p-2">ชื่อ</th>
                  <th className="border border-gray-300 w-[40px] p-2">
                    ยอดรวม
                  </th>
                  <th className="border border-gray-300 w-[40px] p-2">สถานะ</th>
                  <th className="border border-gray-300 w-[40px] p-2">
                    อัพเดท
                  </th>
                  <th className="border border-gray-300 w-[40px] p-2">
                    ดูรายละเอียด
                  </th>
                </tr>
                {orders.map((item, index) => (
                  <tr className="border border-gray-300 p-2" key={index}>
                    <td className="border border-gray-300 p-2">{index + 1}</td>
                    <td className="border border-gray-300 p-2">
                      {moment(item.createdAt).format("LLL")}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {item.user.username}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {numeral(item.totalPrice).format("0,0")}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {item.status}
                    </td>
                    <td className="border border-gray-300 p-2">
                      <button
                        className="hover:cursor-pointer"
                        onClick={() => {
                          setPopupUpdateOrder(true), setOrderBy(item);
                        }}
                      >
                        <FaRegEdit size={24} />
                      </button>
                      {popupUpdateOrder && (
                        <UpdateOrder
                          onClose={() => setPopupUpdateOrder(false)}
                          data={orderBy}
                        />
                      )}
                    </td>
                    <td className="border border-gray-300 p-2">
                      <button
                        className="hover:cursor-pointer"
                        onClick={() => {
                          setPopupDetailOrder(true), setOrderBy(item);
                        }}
                      >
                        <FaRegEdit size={24} />
                      </button>
                      {popupDetailOrder && (
                        <DetailOrder
                          onClose={() => setPopupDetailOrder(false)}
                          data={orderBy}
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </thead>
            </table>
          ) : (
            <div className="font-bold text-center text-2xl">ไม่พบข้อมูล</div>
          )
        ) : (
          <div className="font-bold text-center text-2xl">กำลังโหลดข้อมูลรายการสั่งซื้อ</div>
        )}
      </div>
      <div className="mt-10 flex">
        <button
          className="border mr-10 w-[80px] h-[40px] shadow-md rounded-md border-gray-300 hover:bg-gray-200 hover:cursor-pointer"
          onClick={handlePervPage}
        >
          ย้อนกลับ
        </button>
        <div className="mr-10 w-[40px] h-[40px] text-center py-2 border border-gray-300 shadow-md">
          {page}
        </div>
        {page < totalPage ? (
          <button
            className="border mr-10 w-[80px] h-[40px] shadow-md rounded-md border-gray-300 hover:bg-gray-200 hover:cursor-pointer"
            onClick={handleNextPage}
          >
            ถัดไป
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Order;
