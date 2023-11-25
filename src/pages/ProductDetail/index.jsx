import React, { useEffect, useState } from "react";
import PageLayout from "../../components/PageLayout";
import { Link, useNavigate, useParams } from "react-router-dom";
import CustomizedButtons from "../../components/CustomizedButtons";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useDispatch, useSelector } from "react-redux";
import { filterProductById } from "../../redux/slices/productSlice";
import { addToCart } from "../../redux/slices/cartSlice";
import StarIcon from "../../components/Icon/StarIcon";

const ProductDetail = () => {
    const [quantity, setQuantity] = useState(1);
    const token = localStorage.getItem("token");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { listProducts } = useSelector((state) => state.product);
    
    useEffect(() => {
        dispatch(filterProductById(id));
    }, [id, dispatch])

    const handleAddToCart = (item) => {
        if (!token) {
            navigate("/login");
        } else {
            dispatch(addToCart(item));
            setQuantity(1)
            setTimeout(() => {
                navigate("/");
            }, [1500])
        }
    };

    const handleIncrease = () => {
        setQuantity(quantity + 1);
    }

    const handleDecrease = () => {
        if (quantity <= 1) {
            setQuantity(1);
        } else {
            setQuantity(quantity - 1);
        }
    }

    return (
        <PageLayout >
            {listProducts.length > 0 &&
                listProducts.map((item, index) => (
                    <div
                        className=" mx-32 mb-10"
                        key={index}
                    >
                        <p className="mb-5 cursor-pointer">
                            <Link to="/" className="text-sm">Trang chủ |</Link> <span className=" text-primary text-sm">{item.name}</span>
                            <hr />
                        </p>
                        <div className=" mb-5">
                            <h2 className=" text-3xl mb-2">{item.name}</h2>
                            <h3 className=" text-sm mb-2 flex items-center"><StarIcon /> <StarIcon /> <StarIcon /> <StarIcon /> <StarIcon /></h3>
                            <hr />
                        </div>
                        <div className=" flex">
                            <div className="flex flex-col">
                                <div className=" mb-3">
                                    <img
                                        className=" rounded-xl max-w-lg"
                                        src={item.img}
                                        alt="not-found" />
                                </div>
                            </div>
                            <div className=" ml-7">
                                <h2 className=" text-2xl font-bold">Mô tả</h2>
                                <hr className=" mb-2" />
                                <ul className=" text-sm">
                                    <li className=" mb-4"><strong>Loại Bình:</strong> {item.type}</li>
                                    <li className=" mb-4">{item.typeSub}</li>
                                    <li className=" mb-4"><strong>Kích thước bình (dài x rộng x cao):</strong> {item.size}</li>
                                    <li className=" mb-4"><strong>Thực vật:</strong> {item.plants}</li>
                                    <li className=" mb-4"><strong>Thiết kế:</strong> {item.design}</li>
                                    <li className=" mb-4"><strong>Phụ kiện kèm theo:</strong> {item.accessory}</li>
                                    <li className=" mb-4"><strong>Ứng dụng:</strong> {item.uses}</li>
                                    <li className=" mb-4"><i>{item.note}</i></li>
                                </ul>
                                <hr className=" mb-4" />
                                <div >
                                    <h2 className="text-4xl font-bold text-primary">{parseFloat(item.price).toLocaleString().replace(/,/g, '.')}đ</h2>
                                    <h3 className=" text-sm"><strong>Tình trạng: </strong> <span className=" text-primary">Còn hàng</span></h3>
                                </div>
                                <div className="flex mt-4 items-center">
                                    <div className="flex flex-row h-10 rounded-lg bg-transparent mt-1">
                                        <button onClick={handleDecrease} className=" bg-white border border-gray-300 text-gray-600 hover:text-white hover:bg-primary h-full w-16 rounded cursor-pointer outline-none">
                                            <span className="text-2xl font-thin">-</span>
                                        </button>
                                        <input
                                            disabled
                                            value={quantity}
                                            className="text-center w-16 bg-gray-white font-semibold text-md flex items-center text-gray-700"
                                        />
                                        <button onClick={handleIncrease} className=" bg-white border border-gray-300 text-gray-600 hover:text-white hover:bg-primary h-full w-16 rounded cursor-pointer outline-none">
                                            <span className="text-2xl font-thin">+</span>
                                        </button>
                                    </div>
                                    <div className="w-full h-10 ml-10"
                                        onClick={() => handleAddToCart({ ...item, quantity: quantity })}
                                    >
                                        <CustomizedButtons variant="contained"
                                        > <AddShoppingCartIcon /> Mua ngay</CustomizedButtons>
                                    </div>
                                </div>
                                <hr className=" mt-4" />
                                <h3>Gọi điện để được tư vấn: <span className=" text-primary"> 090 630 25 96</span></h3>
                                <h3 className=" flex items-center">Chấp nhận thanh toán bằng:
                                    <img className=" w-10 mx-2" src="https://bizweb.dktcdn.net/100/467/005/themes/879064/assets/payment-1.svg?1695543284912"
                                        alt="" />
                                    <img className=" w-10 mx-2" src="https://bizweb.dktcdn.net/100/467/005/themes/879064/assets/payment-2.svg?1695543284912"
                                        alt="" />
                                    <img className=" w-10 mx-2" src="https://bizweb.dktcdn.net/100/467/005/themes/879064/assets/payment-3.svg?1695543284912"
                                        alt="" />
                                </h3>
                            </div>
                        </div>
                    </div>
                ))}
        </PageLayout >
    )
}

export default ProductDetail;