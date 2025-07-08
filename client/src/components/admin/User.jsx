import React, { use, useEffect, useState } from "react";
import { listUser } from "../../api/Admin";
import { CiEdit } from "react-icons/ci";
import EditUser from "./userCard/EditUser";
import useStore from "../../store/useStore";

const User = () => {
  const token = useStore((state) => state.token);
  const [user, setUser] = useState([]);
  const [editUser, setEditUser] = useState({
    id: null,
    enabled: null,
    role: null,
  });
  const [dropdown, setDropDown] = useState(false);

  const getData = async () => {
    try {
      const res = await listUser(token);
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="px-4 py-4 h-screen bg-gray-100">
      {Array.isArray(user) ? (
        <div>
          <table className="table-auto px-2 w-full shadow-md border border-gray-300">
            <thead>
              <tr className="bg-sky-500 h-[50px] ">
                <th className="w-[70px] border border-gray-300 text-white">
                  ลำดับ
                </th>
                <th className="w-[750px] border border-gray-300 text-white">
                  ชื่อบัญชี
                </th>
                <th className="w-[750px] border border-gray-300 text-white">
                  อีเมล
                </th>
                <th className="w-[100px]  border border-gray-300 text-white">
                  สิทธิ์
                </th>
                <th className="w-[150px]  border border-gray-300 text-white">
                  สถานะ
                </th>
                <th className="w-[70px]  border border-gray-300 text-white">
                  แก้ไข
                </th>
              </tr>
              {user === null ? (
                <div>ไม่มีข้อมูล</div>
              ) : (
                <>
                  {user?.map((item, index) => (
                    <tr key={index}>
                      <td className=" p-2 border border-gray-300 bg-white">
                        {item.id}
                      </td>
                      <td className=" p-2 border border-gray-300 bg-white">
                        {item.username}
                      </td>
                      <td className=" p-2 border border-gray-300 bg-white">
                        {item.email}
                      </td>
                      <td className=" p-2 border border-gray-300 bg-white">
                        {item.role}
                      </td>
                      <td className=" p-2 border border-gray-300 bg-white">
                        {item.enabled ? "ใช้งาน" : "ปิดการใช้งาน"}
                      </td>
                      <td className=" p-2 border border-gray-300 bg-white">
                        <button
                          className="hover:cursor-pointer"
                          onClick={() => {
                            setDropDown(true), setEditUser(item);
                          }}
                        >
                          <CiEdit />
                        </button>
                        {dropdown && (
                          <EditUser
                            onClose={() => setDropDown(false)}
                            data={editUser}
                            getData={() => getData()}
                          />
                        )}
                      </td>
                    </tr>
                  ))}
                </>
              )}
            </thead>
          </table>
        </div>
      ) : (
        <tr>
          <td colSpan="6" className="text-center p-4 text-gray-500">
            กำลังโหลดข้อมูลบัญชีผู้ใช้งาน
          </td>
        </tr>
      )}
    </div>
  );
};

export default User;
