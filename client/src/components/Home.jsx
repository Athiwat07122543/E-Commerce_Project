import React, { useEffect, useState } from "react";
import useStore from "../store/useStore";
import { listProduct } from "../api/Product";
import Sidebar from "./Sidebar";
import DetailProduct from "./user/card/DetailProduct";
import { toast } from "react-toastify";
import numeral from "numeral";

const Home = () => {
  const actionUpdateCart = useStore((state) => state.actionUpdateCart);
  const token = useStore((state) => state.token);
  const user = useStore((state) => state.user);
  const [popUpDatilProduct, setPopUpDetailProduct] = useState(false);
  const [detailProduct, setDetailProduct] = useState([]);
  const products = useStore((state) => state.products);
  const getProduct = useStore((state) => state.getProduct);
  const actionAddCart = useStore((state) => state.actionAddCart);

  useEffect(() => {
    getProduct();

    actionUpdateCart(token);
  }, []);

  const handleActionAddCart = async (product) => {
    if (user === null) {
      return toast.warning("กรุณาเข้าสู่ระบบก่อน!");
    }
    await actionAddCart(product);
    toast.success(`เพิ่มสินค้า ${product.name} สำเร็จ`, {
      position: "top-center",
    });
  };

  return (
    <div className="flex">
      <div className="w-[250px]">
        <Sidebar />
      </div>
      <div className="p-4 flex gap-2 flex-wrap">
        {Array.isArray(products) ? (
          <>
            {products
              .sort((a, b) => a.id - b.id)
              .map((item) => (
                <div key={item.id}>
                  <div className="p-4 h-[430px] w-[400px] border border-gray-200">
                    <div className=" h-[200px] w-full text-center items-center">
                      {item.images && item.images.length > 0 ? (
                        <img
                          src={`https://e-commerce-project-backend-mu.vercel.app/uploads/${item.images[0].imageUrl}`}
                          alt={item.name}
                          className="object-cover h-full w-full hover:scale-105"
                          onClick={() => {
                            setPopUpDetailProduct(true);
                            setDetailProduct(item);
                          }}
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-400">
                          ไม่มีรูปภาพ
                        </div>
                      )}
                    </div>
                    <div className="font-bold py-2 text-xl max-h-[70px] h-[70px] w-full">
                      {item.name}
                    </div>
                    <div className="mt-2 max-h-[60px] h-[60px] w-full text-ellipsis overflow-y-scroll">
                      {item.description}
                    </div>
                    <div className="flex justify-between h-[50px] max-h-[50px] mt-3">
                      <div className="font-bold text-xl flex gap-2 w-[280px]">
                        <div className="py-2">ราคา</div>
                        <div className="px-2 text-red-500 text-4xl w-[150px] text-center">
                          {numeral(item.price).format("0,0")}
                        </div>
                        <div className="py-2">บาท</div>
                      </div>
                      {item.quantity > 1 ? (
                        <button
                          className="font-bold text-xl shadow-2xl bg-red-500 h-[50px] w-[70px] rounded-md hover:bg-red-300"
                          onClick={() => handleActionAddCart(item)}
                        >
                          สั่งซื้อ
                        </button>
                      ) : (
                        <button
                          className="font-bold text-l shadow-2xl bg-gray-200 h-[50px] w-[70px] rounded-md"
                          disabled
                        >
                          สินค้าหมด
                        </button>
                      )}
                    </div>
                  </div>
                  {popUpDatilProduct && (
                    <DetailProduct
                      data={detailProduct}
                      onClose={() => setPopUpDetailProduct(false)}
                    />
                  )}
                </div>
              ))}
          </>
        ) : (
          <div>กำลังโหลดรายการสินค้า</div>
        )}
      </div>
    </div>
  );
};

export default Home;
