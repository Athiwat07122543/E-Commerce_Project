import React, { use, useEffect, useState } from "react";
import "../../index.css";
import { toast } from "react-toastify";
import { addCategory, deleteCategory, listCategory } from "../../api/Category";
import EditCategory from "./categoryCard/EditCategory";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import useStore from "../../store/useStore";

const Category = () => {
  const token = useStore((state) => state.token);
  const MySwal = withReactContent(Swal);
  const [data, setData] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [editCategoryData, setEditCategoryData] = useState(null);
  const [nameCategory, setNameCategory] = useState({
    name: "",
  });

  const getData = async () => {
    try {
      const res = await listCategory();
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleAddCategory = async () => {
    if (!nameCategory.name || nameCategory.name === "") {
      return toast.warning("กรุณาใส่ชื่อหมวดหมู่สินค้า");
    }
    try {
      const res = await addCategory(token, nameCategory);
      if (!res.data.success) {
        if (res.data.error === "CAN'T_ADD_CATEGORY") {
          return toast.warning(res.data.message);
        }
      }
      toast.success("เพิ่ม Category สำเร็จ");
      getData();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteCategory = async (id) => {
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
        const res = await deleteCategory(token, id);
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
      <div className="flex gap-10 h-[60px] items-center px-2">
        <p className="flex items-center">เพิ่มหมวดหมู่สินค้า</p>
        <input
          className="border border-gray-300 text-center h-[40px] w-[200px] shadow-md "
          placeholder="ชื่อหมวดหมู่สินค้า"
          onChange={(e) =>
            setNameCategory({ ...nameCategory, name: e.target.value })
          }
        ></input>
        <button
          className="text-center w-[150px] h-[40px] bg-sky-500 text-white font-bold shadow-md hover:cursor-pointer"
          onClick={handleAddCategory}
        >
          เพิ่มหมวดหมู่สินค้า
        </button>
      </div>
      <table className="table-auto px-2 p-2 w-full shadow-md border border-gray-300">
        <thead>
          <tr className="bg-sky-500 h-[50px]">
            <th className="w-[50px] border border-gray-300 text-white">
              ลำดับ
            </th>
            <th className="border border-gray-300 text-white">หมวดหมู่</th>
            <th className="w-[100px] border border-gray-300 text-white">
              สถานะ
            </th>
            <th className="w-[100px] border border-gray-300 text-white">
              แก้ไข
            </th>
            <th className="w-[100px] border border-gray-300 text-white ">ลบ</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data
              ?.sort((a, b) => a.id - b.id)
              .map((item, index) => (
                <tr key={index}>
                  <td className=" p-2 border border-gray-300 bg-white">
                    {index + 1}
                  </td>
                  <td className=" p-2 border border-gray-300 bg-white">
                    {item.name}
                  </td>
                  <td className=" p-2 border border-gray-300 bg-white">
                    {item.enabled ? "ขาย" : "ยกเลิกขาย"}
                  </td>
                  <td className=" p-2 border border-gray-300 bg-white">
                    <button
                      className=" p-2 text-center rounded-md bg-white hover:cursor-pointer"
                      onClick={() => {
                        setEditCategoryData(item), setShowEdit(true);
                      }}
                    >
                      <CiEdit />
                    </button>
                  </td>

                  <td className="p-2 border border-gray-300 bg-white ">
                    <button
                      className="p-2 text-center bg-white hover:cursor-pointer"
                      onClick={() => handleDeleteCategory(item.id)}
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
      {showEdit && (
        <EditCategory
          onClose={() => setShowEdit(false)}
          category={editCategoryData}
          getData={() => getData()}
        />
      )}
    </div>
  );
};

export default Category;
