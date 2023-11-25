import React, { useEffect } from "react";
import ProductItem from "./ProductItem";
import { useDispatch, useSelector } from "react-redux";
import { getProductLists } from "../../redux/slices/productSlice";

const HomeProduct = () => {
  const { listProducts } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductLists());
  }, [dispatch]);

  const newTerrarium = listProducts.slice(-12);

  return (
    <div>
      <div className="flex justify-center">
        <span className="text-3xl uppercase font-semibold border-b-4 border-second mb-5">
          Sản phẩm mới
        </span>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-5">
        {newTerrarium.length > 0 &&
          newTerrarium.map((item, index) => {
            return <ProductItem item={item} key={index} height={80} />;
          })}
      </div>
    </div >
  );
};

export default HomeProduct;
