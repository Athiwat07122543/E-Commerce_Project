import React, { useEffect, useState } from "react";
import { listCategory } from "../../../api/Category";
import { createProduct } from "../../../api/Product";
import { MdOutlineSaveAs } from "react-icons/md";
import { toast } from "react-toastify";
import useStore from "../../../store/useStore"

const AddProduct = ({ onClose, getData }) => {
  const token = useStore((state) => state.token)
  const [dropdown, setDropdown] = useState(false);
  const [category, setCategory] = useState({});
  const [addCategory, setAddCategory] = useState({ id: null, name: null });
  const [image, setImage] = useState([]);
  const [dataProduct, setDataProduct] = useState({
    name: null,
    description: null,
    quantity: null,
    sold: null,
    price: null,
    categoryId: null,
  });

  const getCategory = async () => {
    try {
      const res = await listCategory();
      setCategory(res.data);
      return;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  const addProduct = async () => {
    try {
      const formData = new FormData();
      formData.append("name", dataProduct.name);
      formData.append("description", dataProduct.description);
      formData.append("quantity", dataProduct.quantity);
      formData.append("sold", dataProduct.sold);
      formData.append("price", dataProduct.price);
      formData.append("categoryId", dataProduct.categoryId);

      image.forEach((img) => {
        formData.append("images",img);
      })

      const res = await createProduct(token,formData);
      toast.success("สร้างสินค้าเสร็จเรียบร้อย");
    } catch (err) {
      console.log(err);
      toast.warning("มีข้อผิดพลาด");
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center backdrop-blur-md z-50  rounded-2xl">
      <div className="bg-white shadow-lg w-[500px] rounded-2xl">
        <div className="flex justify-between items-center bg-blue-500 text-white px-4 py-2 font-semibold rounded-t-2xl">
          <span>เพิ่มสินค้า</span>
          <button onClick={onClose}>X</button>
        </div>

        <div className="px-4 py-4 space-y-4">
          <div>
            <label className="block mb-1 font-medium">ชื่อสินค้า</label>
            <input
              className="w-full border h-[40px] px-1 rounded-md"
              onChange={(e) =>
                setDataProduct({ ...dataProduct, name: e.target.value })
              }
            />
          </div>

          <div className="">
            <label className="block mb-1 font-medium">รายละเอียด</label>
            <input
              className="w-full border h-[40px] px-1 rounded-md"
              onChange={(e) =>
                setDataProduct({ ...dataProduct, description: e.target.value })
              }
            />
          </div>

          <div className="flex justify-between w-full gap-2">
            <div className="w-full">
              <label>จำนวน</label>
              <input
                className="border w-full  h-[40px] px-1 rounded-md"
                onChange={(e) =>
                  setDataProduct({ ...dataProduct, quantity: e.target.value })
                }
              />
            </div>
            <div className="w-full">
              <label>จำนวนที่ขาย</label>
              <input
                className="border w-full h-[40px] px-1 rounded-md"
                onChange={(e) =>
                  setDataProduct({ ...dataProduct, sold: e.target.value })
                }
              />
            </div>
          </div>
          <div className="flex justify-between w-full gap-2">
            <div className="w-full">
              <label>ราคา</label>
              <p>
                <input
                  className="border w-full h-[40px] px-1 rounded-md"
                  onChange={(e) =>
                    setDataProduct({ ...dataProduct, price: e.target.value })
                  }
                />
              </p>
            </div>
            <div className="w-full">
              <div className="relative">
                <div className="">ประเภทสินค้า</div>
                <div
                  className="border w-full h-[40px] px-1 rounded-md items-center flex bg-gray-200"
                  onClick={() => setDropdown((prev) => !prev)}
                >
                  {addCategory.name}
                </div>
                {dropdown && (
                  <div className="absolute left-0 top-full mt-1 w-full bg-white border rounded shadow-lg z-50 max-h-40 overflow-y-auto">
                    {category.map((item, index) => (
                      <div
                        key={index}
                        className="px-4 py-2 hover:cursor-pointer"
                        onClick={() => {
                          setDropdown(false);
                          setAddCategory({
                            ...addCategory,
                            id: item.id,
                            name: item.name,
                          });
                          setDataProduct({
                            ...dataProduct,
                            categoryId: item.id,
                          });
                        }}
                      >
                        {item.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div>
            <label className="">อัพโหลดรูปภาพ</label>
            <input
              type="file"
              multiple
              onChange={(e) => setImage(Array.from(e.target.files))}
            ></input>
          </div>
          <button
            className="px-2 border rounded-md py-2"
            onClick={async () => {
              await addProduct(), onClose(), getData();
            }}
          >
            <MdOutlineSaveAs />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
