import React, { useEffect, useState } from "react";
import { editCategory } from "../../../api/Category";
import { MdOutlineSaveAs } from "react-icons/md";
import { toast } from "react-toastify";
import useStore from "../../../store/useStore";

const EditCategory = ({ onClose, category, getData }) => {
  const token = useStore((state) => state.token);
  const [dropdown, setDropdown] = useState(false);
  const [data, setData] = useState({
    name: "",
    enabled: Boolean,
  });

  useEffect(() => {
    setData(category);
  }, []);

  const handleSave = async () => {
    if (!data.name || data.name === "") {
      return toast.warning("กรุณาใส่ชื่อหมวดหมู่สินค้า");
    }
    try {
      const res = await editCategory(token, category.id, data);
      toast.success("อัพเดทหมวดหมู่สินค้าสำเร็จ");
      onClose();
      getData();
    } catch (err) {
      console.log(err);
      toast.warning("มีข้อผิดพลาด");
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center backdrop-blur-md z-50  rounded-2xl">
      <div className="bg-white shadow-lg w-[320px] rounded-2xl">
        <div className="flex justify-between items-center bg-sky-500 text-white px-4 py-2 font-semibold rounded-t-2xl">
          <span>แก้ไข Category</span>
          <button onClick={onClose} className="hover:cursor-pointer">
            X
          </button>
        </div>

        <div className="px-4 py-4 space-y-4">
          <div>
            <label className="block mb-1 font-medium">ชื่อ</label>
            <input
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-300"
              onChange={(e) => setData({ ...data, name: e.target.value })}
              placeholder={category.name}
            />
          </div>
          <div className="relative">
            <label className="block mb-1 font-medium">สถานะ</label>
            <div
              className="border px-3 py-2 rounded cursor-pointer bg-gray-100"
              onClick={() => setDropdown((prev) => !prev)}
            >
              {data.enabled ? "ขาย" : "ยกเลิก"}
            </div>

            {dropdown && (
              <div className="absolute left-0 top-full mt-1 w-full bg-white border rounded shadow-lg z-50 max-h-40 overflow-y-auto">
                <div
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setData({ ...data, enabled: true });
                    setDropdown(false);
                  }}
                >
                  ขาย
                </div>
                <div
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setData({ ...data, enabled: false });
                    setDropdown(false);
                  }}
                >
                  ยกเลิกขาย
                </div>
              </div>
            )}
          </div>
          <button
            className="px-2 rounded-md py-2 hover:cursor-pointer"
            onClick={handleSave}
          >
            <MdOutlineSaveAs size={36} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCategory;
