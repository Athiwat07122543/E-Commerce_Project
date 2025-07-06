import React, { useEffect, useState } from "react";
import AddProduct from "./productCard/AddProduct";
import { listProduct, deleteProduct } from "../../api/Product";
import EditProduct from "./productCard/EditProduct";
import { CgAddR } from "react-icons/cg";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import useStore from "../../store/useStore";
import numeral from "numeral";

const Product = () => {
  const token = useStore((state) => state.token);
  const [popupAdd, setPopupAdd] = useState(false);
  const [popupEdit, setPopupEdit] = useState(false);
  const [editData, setEditData] = useState([]);
  const [data, setData] = useState(null);
  const count = 20;

  const getData = async () => {
    try {
      const res = await listProduct({ count });
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDeleteProduct = async (id) => {
    try {
      const result = await Swal.fire({
        title: "แน่ใจว่าจะลบหมวดหมู่นี้หรือไม่ ?",
        text: "ถ้าลบแล้ว คุณจะไม่สามารถย้อนข้อมูลนี้กลับมาได้อีกต่อไป",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ลบ",
      });

      if (result.isConfirmed) {
        const res = await deleteProduct(token, id);
        await getData();
        await Swal.fire({
          title: "ลบหมวดหมู่สินค้าเรียบร้อย",
          icon: "success",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="px-4 h-screen bg-gray-100">
      <div className="flex gap-10 py-3 items-center px-2">
        <button
          className=" hover:cursor-pointer"
          onClick={() => setPopupAdd(true)}
        >
          <CgAddR size={30} />
        </button>
        {popupAdd && (
          <AddProduct onClose={() => setPopupAdd(false)} getData={getData} />
        )}
      </div>
      <div>
        <table className="table-auto px-2 p-2 w-full shadow-md border border-gray-300">
          <thead>
            <tr className="bg-sky-500 h-[50px]">
              <th className="w-[50px] border border-gray-300 text-white">
                ลำดับ
              </th>
              <th className="border border-gray-300 text-white">ชื่อสินค้า</th>
              <th className="w-[100px] border border-gray-300 text-white">
                จำนวนที่มี
              </th>
              <th className="w-[100px] border border-gray-300 text-white">
                จำนวนที่ขาย
              </th>
              <th className="w-[100px] border border-gray-300 text-white">
                แก้ไข
              </th>
              <th className="w-[100px] border border-gray-300 text-white">
                ลบ
              </th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data
                ?.sort((a, b) => a.id - b.id)
                .map((item, index) => (
                  <tr key={index}>
                    <td className="p-2 border border-gray-300 bg-white">
                      {item.id}
                    </td>
                    <td className="p-2 border border-gray-300 bg-white">
                      {item.name}
                    </td>
                    <td className="p-2 border border-gray-300 bg-white">
                      {numeral(item.quantity).format("0,0")}
                    </td>
                    <td className="p-2 border border-gray-300 bg-white">
                      {item.sold}
                    </td>
                    <td className="p-2 border border-gray-300 bg-white">
                      <button
                        value={item}
                        className="rounded-md hover:cursor-pointer"
                        onClick={() => {
                          setPopupEdit(true), setEditData(item);
                        }}
                      >
                        <CiEdit />
                      </button>
                      {popupEdit && (
                        <EditProduct
                          onClose={() => setPopupEdit(false)}
                          data={editData}
                          getData={() => getData()}
                        />
                      )}
                    </td>
                    <td className="p-2 border border-gray-300 bg-white">
                      <button
                        className="hover:cursor-pointer"
                        onClick={() => handleDeleteProduct(item.id)}
                      >
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  ไม่มีข้อมูลให้แสดง
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Product;
