import React, { useEffect, useState } from "react";
import { FaRegSave } from "react-icons/fa";
import useStore from "../../../store/useStore";
import { addAddress } from "../../../api/User";
import { toast } from "react-toastify";

const AddAddress = ({ getData, getClose }) => {
  const user = useStore((state) => state.user);
  const token = useStore((state) => state.token);
  const [address, setAddress] = useState([
    {
      username: null,
      recipientName: null,
      addressDetail: null,
      phone: null,
    },
  ]);

  useEffect(() => {
    setAddress((prev) => ({ ...prev, username: user }));
  }, [user]);

  const handleSave = async () => {
    try {
      const result = await addAddress(token, address);
      getClose();
      getData();
      toast.success("เพิ่มทีอยู่สำเร็จ");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="fixed inset-0 flex justify-center items-center backdrop-blur-md z-50  rounded-2xl">
      <div className="bg-white shadow-lg w-[500px] rounded-2xl">
        <div className="flex justify-between items-center bg-sky-500 text-white px-4 py-2 font-semibold rounded-t-2xl">
          <span>เพิ่มสินค้า</span>
          <button onClick={getClose}>X</button>
        </div>
        <div className="p-4 space-y-2">
          <div>ชื่อผู้รับ</div>
          <input
            maxLength={30}
            type="text"
            className="border w-full text-xl h-[40px] px-2"
            onChange={(e) =>
              setAddress({ ...address, recipientName: e.target.value })
            }
          />
          <div>เบอร์โทรศัพทิ์</div>
          <input
            maxLength={10}
            type="text"
            className="border w-full text-xl h-[40px] px-2"
            onChange={(e) => setAddress({ ...address, phone: e.target.value })}
          />
          <div>ที่อยู่จัดส่ง</div>
          <textarea
            className="border w-full text-xl h-[100px] resize-none px-2"
            onChange={(e) =>
              setAddress({ ...address, addressDetail: e.target.value })
            }
            maxLength={100}
          />
          <FaRegSave size={46} onClick={handleSave} />
        </div>
      </div>
    </div>
  );
};

export default AddAddress;
