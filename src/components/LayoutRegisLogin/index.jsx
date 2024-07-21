import React from "react";
import { Link } from "react-router-dom";

const LayoutRegisLogin = ({ children, name ="Đăng ký" }) => {
  return (
    <div className="w-screen">
      <div className="w-full flex pl-20">
        <Link className="flex" to={"/"}>
          <img className="h-24" src="https://i.imgur.com/ud1SueH.png" alt="not-found" />
          <p className="flex items-center text-2xl font-medium ml-2">{name}</p>
        </Link>
      </div>
      <div className=" h-screen bg-[#D2ECED]">
        <div className="w-full flex justify-around">
          <img class="hidden lg:block" src="./img/logo2.png" alt="not-found" />
          {children}
        </div>
      </div>
    </div>
  );
};

export default LayoutRegisLogin;
