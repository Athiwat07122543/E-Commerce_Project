import React, { use, useEffect, useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import numeral from "numeral";
import useStore from "../store/useStore";

const Sidebar = () => {
  const getCategory = useStore((state) => state.getCategory);
  const categorys = useStore((state) => state.categorys);
  const getProduct = useStore((state) => state.getProduct);
  const getFilters = useStore((state) => state.getFilters);
  const [name, setname] = useState("");
  const [categorySelected, setCategorySelected] = useState([]);
  const [price, setPrice] = useState([0, 1000000]);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    getCategory();
  }, []);

  useEffect(() => {
    getFilters({ name });
    if (!name) {
      getProduct();
    }
  }, [name]);

  const handleCategory = (e) => {
    const categoryId = e.target.value;
    const inState = [...categorySelected];
    const findId = inState.indexOf(categoryId);

    if (findId === -1) {
      inState.push(categoryId);
    } else {
      inState.splice(findId, 1);
    }
    setCategorySelected(inState);

    if (inState.length > 0) {
      getFilters({ categoryId: inState });
    } else {
      getProduct();
    }
  };

  useEffect(() => {
    getFilters({ price });
  }, [ok]);

  const handlePrice = (value) => {
    setPrice(value);

    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };
  
  return (
    <div className="p-4 h-screen bg-sky-50">
      <input
        className="border border-gray-200 rounded-md mb-2 w-full px-2 h-[40px] bg-white hover:cursor-pointer"
        onChange={(e) => setname(e.target.value)}
        type="text"
        placeholder="ค้นหาสินค้า"
      />
      {Array.isArray(categorys) ? (
        <div className="ml-2 mr-2 mb-2">
          {categorys.map((item) => (
            <div key={item.id} className="flex gap-4">
              <input
                type="checkbox"
                value={item.id}
                onChange={handleCategory}
              />
              <div>{item.name}</div>
            </div>
          ))}
        </div>
      ) : (
        <div></div>
      )}

      <div>
        <div className="flex justify-between">
          <div className="ml-4 w-1/3 font-bold">
            {numeral(price[0]).format("0,0")}
          </div>
          <div className="w-1/3">-</div>
          <div className="w-1/3 font-bold">
            {numeral(price[1]).format("0,0")}
          </div>
        </div>
        <div className="px-4">
          <Slider
            onChange={handlePrice}
            range
            min={0}
            max={100000}
            defaultValue={[0, 100000]}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
