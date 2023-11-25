import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Tooltip from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";

const ProductItem = ({ item, height }) => {
  const [isHovered, setIsHovered] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleAddToCart = (item) => {
    if (!token) {
      navigate("/login");
    } else {
      dispatch(addToCart(item));
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }
  };

  return (
    <Link
      to={`/products/${item.id}`}
    >
      <div
        className="max-w-full mx-auto shadow-md hover:shadow-2xl rounded-2xl border border-black-300 flex flex-col items-center cursor-pointer"
        onMouseLeave={handleMouseLeave}
      >
        <div className={`relative h-${height}`}>
          <img
            className="rounded-t-2xl h-full object-cover"
            src={item.img}
            alt={item.name}
            onMouseEnter={handleMouseEnter}
          />
          {isHovered && (
            <div className="absolute bottom-0 right-0 flex flex-col items-center m-4 bg-white rounded-full transition-opacity duration-500 ease-in-out">
              <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }}>
                <div className="m-2">
                  <div className="hover:bg-primary rounded-full p-3">
                    <Tooltip
                      title="Xem nhanh"
                      placement="left"
                      TransitionComponent={Fade}
                      TransitionProps={{ timeout: 600 }}
                      className="hover:bg-primary rounded-full"
                    >
                      <SearchIcon />
                    </Tooltip>
                  </div>
                </div>
                <div className="m-2">
                  <div className="hover:bg-primary rounded-full p-3"
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddToCart({ ...item, quantity: 1 });
                    }}
                  >
                    <Tooltip
                      title="Thêm vào giỏ hàng"
                      placement="left"
                      TransitionComponent={Fade}
                      TransitionProps={{ timeout: 600 }}
                      className="hover:bg-primary rounded-full"
                    >
                      <AddShoppingCartIcon />
                    </Tooltip>
                  </div>
                </div>
              </Tooltip>
            </div>
          )}
        </div>
        <h5 className="font-light mb-3 mt-5">{item.category}</h5>
        <h3 className="text-base font-bold mb-3 max-w-full">
          <div className="truncate px-4">
            {item.name}
          </div>
        </h3>
        <h4 className="text-red-600 font-semibold mb-5">
          {parseFloat(item.price).toLocaleString().replace(/,/g, '.')}₫
        </h4>
      </div >
    </Link >
  );
};

export default ProductItem;
