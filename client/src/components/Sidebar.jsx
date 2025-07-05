import React, { use, useEffect, useState } from "react";
import useStore from "../store/useStore";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
const Sidebar = () => {
  const getCategory = useStore((state) => state.getCategory);
  const categorys = useStore((state) => state.categorys);
  const getProduct = useStore((state) => state.getProduct);
  const products = useStore((state) => state.products);
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
    <div className="p-4 h-screen bg-gray-50">
      <input
        className="border border-gray-200 rounded-md mb-2 w-full px-2 bg-white"
        onChange={(e) => setname(e.target.value)}
        type="text"
        placeholder="ค้นหาสินค้า"
      />
      {!categorys ? (
        getCategory()
      ) : (
        <div className="ml-2 mr-2 mb-2 text-xl">
          {categorys.map((item) => (
            <div key={item.id} className="flex gap-4">
              <input
                type="checkbox"
                value={item.id}
                onChange={handleCategory}
              />
              <div key={item.id}>{item.name}</div>
            </div>
          ))}
        </div>
      )}

      <div>
        <div className="flex justify-between">
          <div className="text-2xl">{price[0]}</div>
          <div>-</div>
          <div className="text-2xl">{price[1]}</div>
        </div>
        <div>
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
