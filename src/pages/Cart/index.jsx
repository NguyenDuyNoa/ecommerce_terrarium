import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import PageLayout from "../../components/PageLayout";
import { decrease, increase, removeCart } from "../../redux/slices/cartSlice";
import { notification } from "../../utils/helper";
import CartItem from "./CartItem";

let Cart = () => {
    const { cartList } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleIncrease = (item) => {
        dispatch(increase(item));
    };

    const handleDecrease = (item) => {
        if (item.quantity <= 1) {
            dispatch(removeCart(item));
        } else {
            dispatch(decrease(item));
        }
    };

    const handleRemove = (item) => {
        dispatch(removeCart(item));
    };

    const totalPrice = cartList.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)

    const handleCheckout = () => {
        if (cartList.length !== 0) {
            navigate('/checkout')
        } else {
            notification('Không có gì trong giỏ hàng của bạn. Vui lòng thêm một cái gì đó!!!', 'question')
            navigate('/')
        }
    }
    return (
        <PageLayout>
            <div className=" mx-32 mb-10">
                <p className="mb-5 cursor-pointer">
                    <Link to="/" className="text-sm hover:text-primary">Trang chủ |</Link> <span className=" text-primary text-sm">Giỏ hàng</span>
                    <hr />
                </p>
                <div class=" h-screen">
                    <div class="container mx-auto ">
                        <h1 class="text-2xl font-semibold mb-4">Giỏ hàng</h1>
                        <div class="flex flex-col md:flex-row gap-4">
                            <div class="md:w-3/4">
                                <div class="bg-white rounded-lg border shadow-md p-6 mb-4">
                                    <table class="w-full">
                                        <thead>
                                            <tr>
                                                <th class="text-left font-semibold">Sản phẩm</th>
                                                <th class="text-center font-semibold">Giá</th>
                                                <th class="text-center font-semibold">Số lượng</th>
                                                <th class="text-center font-semibold">Tổng cộng</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cartList.length > 0 &&
                                                cartList.map((item) => (
                                                    <CartItem
                                                        key={item.id}
                                                        item={item}
                                                        handleRemove={() => handleRemove(item)}
                                                        handleIncrease={() => handleIncrease(item)}
                                                        handleDecrease={() => handleDecrease(item)}
                                                    />
                                                ))}
                                            {cartList.length == 0 && (
                                                <div className="flex flex-wrap  h-full">
                                                    <img src={process.env.PUBLIC_URL + "/img/empty_cart.png"} className="rounded-2xl" alt="not-found" />
                                                </div>)}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="md:w-1/4">
                                <div class="bg-white border rounded-lg shadow-md p-6">
                                    <div class="flex justify-between mb-2">
                                        <span>Tạm tính</span>
                                        <span>{parseFloat(totalPrice).toLocaleString().replace(/,/g, '.')}đ</span>
                                    </div>
                                    <div class="flex justify-between mb-2">
                                        <span>Phí giao hàng</span>
                                        <span>0đ</span>
                                    </div>
                                    <hr class="my-2" />
                                    <div class="flex justify-between mb-2">
                                        <span class="font-semibold">Thành tiền</span>
                                        <span class="font-semibold text-primary">{parseFloat(totalPrice).toLocaleString().replace(/,/g, '.')}đ</span>
                                    </div>
                                    <button
                                        onClick={handleCheckout}
                                        class="bg-primary text-white py-2 px-4 rounded-lg mt-4 w-full"
                                    >
                                        Thanh toán
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    )
}

export default Cart;