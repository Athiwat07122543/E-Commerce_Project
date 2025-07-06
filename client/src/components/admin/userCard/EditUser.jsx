import React, { useEffect, useState } from "react";
import { MdOutlineSaveAs } from "react-icons/md";
import { editUser } from "../../../api/Admin";
import { toast } from "react-toastify";

const EditUser = ({ onClose, data, getData }) => {
  const [role, setRole] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [dataUser, setDataUser] = useState({
    role: null,
    enabled: null,
  });

  useEffect(() => {
    setDataUser(data);
  }, []);

  const handleUpdate = async () => {
    try {
      const result = await editUser(data.id, dataUser);
      onClose();
      getData();
      toast.success("อัพเดทข้อมูลบัญชีผู้ใช้งานเรียบร้อย");
      return;
    } catch (err) {
      console.log(err);
      toast.warning("มีข้อผิดพลาด");
    }
  };
  return (
    <div className="fixed inset-0 flex justify-center items-center backdrop-blur-md z-50  rounded-2xl">
      <div className="bg-white shadow-lg w-[320px] rounded-2xl">
        <div className="flex justify-between items-center bg-sky-500 text-white px-4 py-2 font-semibold rounded-t-2xl">
          <span>แก้ไขหมวดหมู่</span>
          <button onClick={onClose} className="hover:cursor-pointer">X</button>
        </div>
        <div className="px-4 py-4 space-y-4">
          <div className="relative">
            <label className="block mb-1 font-medium">สิทธิ์</label>
            <div
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-300 hover:cursor-pointer"
              onClick={() => setRole(true)}
            >
              {dataUser.role}
            </div>
            {role && (
              <div className="absolute left-0 top-full mt-1 w-full bg-white border rounded shadow-lg z-50 max-h-40 overflow-y-auto">
                <div
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setRole(false), setDataUser({ ...dataUser, role: "admin" });
                  }}
                >
                  admin
                </div>
                <div
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setRole(false), setDataUser({ ...dataUser, role: "user" });
                  }}
                >
                  user
                </div>
              </div>
            )}
          </div>
          <div className="relative">
            <label className="block mb-1 font-medium ">สถานะ</label>
            <div
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-300 hover:cursor-pointer"
              onClick={() => setEnabled(true)}
            >
              {dataUser.enabled ? "ใช้งาน" : "ปิดการใช้งาน"}
            </div>
            {enabled && (
              <div className="absolute left-0 top-full mt-1 w-full bg-white border rounded shadow-lg z-50 max-h-40 overflow-y-auto">
                <div
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setEnabled(false),
                      setDataUser({ ...dataUser, enabled: true });
                  }}
                >
                  ใช้งาน
                </div>
                <div
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setEnabled(false),
                      setDataUser({ ...dataUser, enabled: false });
                  }}
                >
                  เปิดการใช้งาน
                </div>
              </div>
            )}
            <div className="mt-4">
              <button
                className="px-2 rounded-md hover:cursor-pointer"
                onClick={async () => {
                  await onClose();
                  handleUpdate();
                }}
              >
                <MdOutlineSaveAs size={36}/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
