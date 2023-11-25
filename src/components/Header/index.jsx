import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { logout } from '../../redux/slices/authSlice';
import CustomizedButtons from '../CustomizedButtons';
import SearchField from '../SearchField';
import { searchProductByName } from '../../redux/slices/productSlice';
import SearchItem from '../SearchField/SearchItem';

const Header = () => {
    const userInfor = JSON.parse(localStorage.getItem("userInfor"));
    const cart = JSON.parse(localStorage.getItem("cart"));
    const [searchText, setChangeSearchText] = useState("");
    const { cartList } = useSelector((state) => state.cart);
  const { searchList } = useSelector((state) => state.product);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const totalItems = cart ? cart.reduce((acc, curr) => acc + curr.quantity, 0) : 0;

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    const onChangeSearchText = (e) => {
        setChangeSearchText(e.target.value);
    };

    useEffect(() => {
        dispatch(searchProductByName(searchText));
    }, [searchText, dispatch]);

    return (
        <div>
            <div class="h-20 flex justify-center items-center w-screen">
                <div className="flex justify-center items-center w-full px-32 ">
                    <div className=" flex-1 float-left">
                        <SearchField
                            width="250px"
                            value={searchText}
                            onChange={onChangeSearchText}
                        />
                        <div className=" bg-white border border-gray-300 absolute top-15 z-50 overflow-hidden">
                            <section>
                                <div className="mx-auto max-w-screen-xl z-100">
                                    <div>
                                        {searchList.length > 0 &&
                                            searchList.map((item, index) => (
                                                <SearchItem item={item} key={index} />
                                            ))}
                                    </div>
                                    {searchList.length === 0 && searchText !== "" && (
                                        <div className="flex items-center gap-x-4 cursor-pointer ">
                                            <p className="text-center p-4 sm:px-6 lg:px-8 ">
                                                Không tìm thấy sản phẩm
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </section>
                        </div>
                    </div>
                    <Link to='/' className="flex flex-1 justify-center">
                        <img className="w-52 cursor-pointer" src={process.env.PUBLIC_URL + "/img/logo.png"} alt="Terrarium" />
                    </Link>
                    <div className="flex-1 float-right">
                        <div className=" float-right">
                            {token ? (
                                <div className="flex items-center gap-5">
                                    <Avatar alt="avatar default" src={userInfor.avatar} />
                                    <p className="text-base font-semibold">
                                        Chào {userInfor.firstname}
                                    </p>
                                    <Link to="/cart" className="cursor-pointer relative">
                                        <ShoppingCartIcon />
                                        <p className="text-white bg-red-700 rounded-full text-xs w-4 h-4 text-center font-semibold absolute top-0 right-[-20%]">
                                            {cartList ? totalItems : 0}
                                        </p>
                                    </Link>
                                    {userInfor.isAdmin && (
                                        <Link to="/user-management">
                                            <AdminPanelSettingsIcon />
                                        </Link>
                                    )}
                                    <CustomizedButtons
                                        onClick={handleLogout}
                                    >
                                        Đăng xuất
                                    </CustomizedButtons>
                                </div>
                            ) : (
                                <nav>
                                    <Link to="/login">
                                        <CustomizedButtons >Đăng nhập</CustomizedButtons>
                                    </Link>
                                    <Link to="/register" className='ml-4'>
                                        <CustomizedButtons>Đăng ký</CustomizedButtons>
                                    </Link>
                                </nav>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <hr className="w-full h-1 bg-primary" />
        </div>
    );
};

export default Header;