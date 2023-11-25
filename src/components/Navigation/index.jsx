import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
    return (
        <ul className="flex justify-center py-3">
            <li className="py-2 px-4 uppercase text-sm hover:text-primary cursor-pointer">
                <Link to="/">Trang chủ</Link>
            </li>
            <li className="py-2 px-4 uppercase text-sm hover:text-primary cursor-pointer">
                <Link to="/close">Terrarium kín</Link>
            </li>
            <li className="py-2 px-4 uppercase text-sm hover:text-primary cursor-pointer">
                <Link to="/open">Terrarium mở</Link>
            </li>
            <li className="py-2 px-4 uppercase text-sm hover:text-primary cursor-pointer">
                <Link to="/diy">Diy</Link>
            </li>
            <li className="py-2 px-4 uppercase text-sm hover:text-primary cursor-pointer">
                <Link to="/contact">Thông tin</Link>
            </li>
        </ul>
    );
};

export default Navigation;