import React, { useEffect, useState } from "react";
import { MdOutlineSaveAs } from "react-icons/md";
import { deleteProductImageBy, editProduct } from "../../../api/Product";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useStore from "../../../store/useStore";

const EditProduct = ({ onClose, data, getData }) => {
  const token = useStore((state) => state.token);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    quantity: 0,
    sold: 0,
    price: 0,
    categoryId: null,
    images: [],
  });

  const [newImages, setNewImages] = useState([]);

  useEffect(() => {
    setProduct(data);
  }, []);

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("description", product.description);
      formData.append("quantity", product.quantity);
      formData.append("sold", product.sold);
      formData.append("price", product.price);
      formData.append("categoryId", product.categoryId);
      newImages.forEach((item) => {
        formData.append("images", item);
      });
      const res = await editProduct(token, product.id, formData);
      onClose();
      getData();
      toast.success("อัพเดทข้อมูลสินค้าเรียบร้อย");
      return;
    } catch (err) {
      console.log(err);
      toast.warning("มีข้อผิดพลาด");
    }
  };

  const handleDeleteImage = async (nameImage) => {
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
        const res = await deleteProductImageBy(token, product.id, {
          nameImage,
        });
        await Swal.fire({
          title: "ลบหมวดหมู่สินค้าเรียบร้อย",
          icon: "success",
        });
      }
      setProduct((prev) => ({
        ...prev,
        images: prev.images.filter((img) => img.imageUrl !== nameImage),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center backdrop-blur-md z-50 rounded-2xl shadow-md">
      <div className="bg-white  shadow-md w-[1000px] rounded-2xl">
        <div className="flex justify-between items-center bg-sky-500 text-white px-4 py-2 font-semibold rounded-t-2xl  shadow-md">
          <span>แก้ไขสินค้า</span>
          <button onClick={onClose} className="hover:cursor-pointer">X</button>
        </div>
        <div className="p-4 space-y-2  shadow-md">
          <div>
            <div className="flex gap-2 overflow-x-auto flex-nowrap w-full p-4">
              {product.images && product.images.length > 0 ? (
                <>
                  {product.images.map((item, index) => (
                    <div className="relative flex-shrink-0" key={index}>
                      <div
                        className="fiex absolute text-red-500 font-bold px-4 bg-white shadow-md border border-gray-100 h-[30px]"
                        onClick={() => handleDeleteImage(item.imageUrl)}
                      >
                        x
                      </div>
                      <img
                        className="w-[300px] h-[300px] object-cover max-w-full border border-gray-200 shadow-md"
                        src={`https://e-commerce-project-backend-mu.vercel.app/uploads/${item.imageUrl}`}
                      />
                    </div>
                  ))}
                </>
              ) : (
                <div className="w-[300px] h-[300px] object-cover max-w-full border border-gray-200 shadow-md text-center">
                  ไม่มีรูปภาพ
                </div>
              )}
            </div>
          </div>
          <div>ชื่อ</div>
          <input
            className="border px-2 w-[300px] shadow-md border-gray-200 h-[40px]"
            value={product.name || ""}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
          />
          <div>รายละเอียด</div>
          <label className="h-[200px]">
            <textarea
              maxLength={200}
              className="border px-2 w-full shadow-md border-gray-200 py-2"
              value={product.description || ""}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
            />
          </label>
          <div className="flex gap-2 mt-2">
            <div className="space-y-2">
              <div>จำนวนที่ขาย</div>
              <input
                min="0"
                type="number"
                className="border px-2 w-[150px] shadow-md border-gray-200 h-[40px]"
                value={product.quantity || ""}
                onChange={(e) =>
                  setProduct({ ...product, quantity: e.target.value })
                }
              />
            </div>
            <div className="space-y-2 ml-4">
              <div>จำนวนสั่งซื้อ</div>
              <input
                min="0"
                type="number"
                className="border px-2 w-[150px] shadow-md border-gray-200 h-[40px]"
                value={product.sold}
                onChange={(e) =>
                  setProduct({ ...product, sold: e.target.value })
                }
              />
            </div>
            <div className="space-y-2 ml-4">
              <div>ราคา</div>
              <input
                min="0"
                type="number"
                className="border px-2 w-[150px] shadow-md border-gray-200 h-[40px]"
                value={product.price || ""}
                onChange={(e) =>
                  setProduct({ ...product, price: e.target.value })
                }
              />
            </div>
            <div className="space-y-2 ml-4">
              <div>อัพโหลดรูปภาพ</div>
              <input
                className="border border-gray-200 shadow-md px-2 h-[40px] w-[215px] hover:cursor-pointer py-2"
                type="file"
                multiple
                onChange={(e) => setNewImages(Array.from(e.target.files))}
              />
            </div>
          </div>
          <button onClick={handleSave} className="p-2 hover:cursor-pointer">
            <MdOutlineSaveAs size={36} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
