import React, { act, useEffect, useState } from "react";
import { FaRegSave } from "react-icons/fa";
import useStore from "../../../store/useStore";
import { getAddress, changeAddressId } from "../../../api/User";
import { toast } from "react-toastify";
import AddAddress from "./AddAddress";

const ChangeAddress = ({ getClose }) => {
  const token = useStore((state) => state.token);
  const [popupAddAddress, setPopupAddAddress] = useState(false);
  const [address, setAddress] = useState([]);
  const [changeAddress, setChangeAddress] = useState(null);

  const listAddress = async () => {
    const res = await getAddress(token);
    if (res?.data) {
      const sortedData = [...res.data].sort((a, b) => {
        return b.isDefault - a.isDefault;
      });
      setAddress({ ...res, data: sortedData });
      res?.data.map((item) => {
        if (item.isDefault === true) {
          setChangeAddress(item.id);
        }
      });
    } else {
      setAddress(res);
    }
  };

  const getData = async () => {
    listAddress();
  };

  useEffect(() => {
    listAddress();
  }, []);

  const handleChange = async () => {
    try {
      const res = await changeAddressId(token, changeAddress);
      toast.success("เปลื่ยนที่อยู่หลักเรียบร้อย");
      getClose();
      return;
    } catch (err) {
      console.log(err);
      toast.warning("ไม่สามารถเปลื่ยนที่อยู่หลักได้");
    }
  };


  return (
    <div className="fixed inset-0 flex justify-center items-center backdrop-blur-md z-50 rounded-2xl">
      <div className="bg-white shadow-2xl w-[500px] rounded-2xl">
        <div className="flex justify-between items-center bg-sky-500 text-white px-4 py-2 font-semibold rounded-t-2xl ">
          <span>เพิ่มสินค้า</span>
          <button onClick={getClose}>X</button>
        </div>
        <div className="p-4">
          <div className="max-h-[600px] w-auto overflow-y-auto">
            <button
              className="h-[40px] w-[70px] mb-2 shadow-2xl text-white bg-sky-500 hover:bg-sky-600 hover:cursor-pointer"
              onClick={() => setPopupAddAddress(true)}
            >
              เพิ่มที่อยู่
            </button>
            {address?.data && address?.data.length > 0 ? (
              <>
                {address?.data?.map((item, index) => (
                  <div key={index}>
                    {item.isDefault ? (
                      <div
                        className="border border-gray-300 shadow-md h-[140px] w-full mb-4 p-2 bg-gray-50"
                        key={index}
                      >
                        <div className="flex gap-2">
                          <div>
                            {changeAddress === item.id ? (
                              <button className="w-6 h-6 bg-sky-600 shadow-md border border-gray-200 rounded-full mt-2"></button>
                            ) : (
                              <button
                                className="w-6 h-6 bg-gray-100 shadow-md border border-gray-200 rounded-full mt-2"
                                onClick={() => setChangeAddress(item.id)}
                              ></button>
                            )}
                          </div>
                          <div>
                            <div>ชื่อ: {item.recipientName}</div>
                            <div>เบอร์โทรศัพท์: {item.phone}</div>
                          </div>
                        </div>
                        <div className="ml-8">
                          ที่จัดส่ง: {item.addressDetail}
                        </div>
                      </div>
                    ) : (
                      <div
                        className="border border-gray-300 shadow-md h-[140px] w-full mb-4 p-2 bg-gray-50"
                        key={index}
                      >
                        <div className="flex gap-4 justify-between">
                          <div className="flex gap-2">
                            <div>
                              {changeAddress === item.id ? (
                                <button className="w-6 h-6 bg-sky-600 shadow-md border border-gray-200 rounded-full mt-2"></button>
                              ) : (
                                <button
                                  className="w-6 h-6 bg-gray-100 shadow-md border border-gray-200 rounded-full mt-2"
                                  onClick={() => setChangeAddress(item.id)}
                                ></button>
                              )}
                            </div>
                            <div>
                              <div>
                                <div>ชื่อ: {item.recipientName}</div>
                                <div>เบอร์โทรศัพท์: {item.phone}</div>
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-4"></div>
                        </div>
                        <div className="ml-8">
                          ที่จัดส่ง: {item.addressDetail}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </>
            ) : (
              <div className="p-4 text-xl">ไม่มีข้อมูลที่อยู่จัดส่ง</div>
            )}
          </div>
        </div>
        <button className="px-4 mb-4" onClick={handleChange}>
          <FaRegSave size={46} />
        </button>
        {popupAddAddress && (
          <AddAddress
            getClose={() => setPopupAddAddress(false)}
            getData={getData}
          />
        )}
      </div>
    </div>
  );
};

export default ChangeAddress;
