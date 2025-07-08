import React, { useEffect, useState } from "react";
import numeral from "numeral";
import useStore from "../../../store/useStore";
import { toast } from "react-toastify";

const DetailProduct = ({ data, onClose }) => {
  const [product, setProdct] = useState([]);
  const user = useStore((state) => state.user);
  const getProduct = async () => {
    setProdct(data);
  };
  const actionAddCart = useStore((state) => state.actionAddCart);

  useEffect(() => {
    getProduct();
  }, []);

  const handleActionAddCart = async (product) => {
    if (user === null) {
      return toast.warning("กรุณาเข้าสู่ระบบก่อน!");
    }

    await actionAddCart(product);
    onClose;
    toast.success(`เพิ่มสินค้า ${product.name} สำเร็จ`, {
      position: "top-center",
    });
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center backdrop-blur-md z-50 rounded-2xl">
      <div className="bg-white shadow-2xl w-[1225px] h-[600px] rounded-2xl">
        <div className="flex justify-between items-center bg-blue-500 text-white px-4 py-2 font-semibold rounded-t-2xl">
          <button onClick={() => onClose()} className="hover:cursor-pointer">
            X
          </button>
        </div>
        <div className="px-4 space-y-4">
          <div className="flex gap-2 overflow-auto w-full"></div>
          <div className=" w-[1200px] flex p-4  gap-2 overflow-x-scroll">
            {product.images && product.images.length > 0 ? (
              <>
                {product.images.map((item, index) => (
                  <img
                    key={index}
                    className="w-[300px] h-[300px] "
                    src={`https://e-commerce-project-backend-mu.vercel.app/uploads/${item.imageUrl}`}
                  />
                ))}
              </>
            ) : (
              <div className="w-[300px] h-[300px]">ไม่มีรูปภาพ</div>
            )}
          </div>
          <div>
            <label className="font-bold text-2xl">
              ชื่อสินค้า: {product.name}
            </label>
            <div className="h-[70px] mt-4 ">
              <label>รายละเอียด: {product.description}</label>
            </div>
            <div className="flex justify-between ">
              <div className="flex gap-10 items-center text-center">
                <div>ราคา</div>
                <div className="font-bold text-3xl text-red-500">
                  {numeral(product.price).format("0,0")}
                </div>
                <div>บาท</div>
              </div>
              <button
                className="font-bold text-xl shadow-2xl bg-red-500 h-[50px] w-[100px] rounded-md hover:bg-red-300"
                onClick={() => handleActionAddCart(product)}
              >
                สั่งซื้อ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;
