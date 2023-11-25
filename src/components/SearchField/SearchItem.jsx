import React from "react";
import { Link } from "react-router-dom";

const SearchItem = ({item}) => {
  return (
    <Link to={`/products/${item.id}`} className="flex items-center gap-x-4 hover:bg-slate-100 p-4  sm:px-6 lg:px-8 cursor-pointer">
      <img
        src={item.img}
        alt=""
        className="h-16 w-16 rounded object-cover"
      />
      <div>
        <h3 className="text-sm text-gray-900 font-semibold ">
          {item.name}
        </h3>
        <dl className="mt-3 text-[10px] text-gray-600">
          <div>
            <dt className="inline font-semibold text-red-500">{parseFloat(item.price).toLocaleString()}đ </dt>
            <del className="inline ml-2 font-semibold ">
              3,500,000đ
            </del>
          </div>
        </dl>
      </div>
    </Link>
  );
};

export default SearchItem;
