import React from "react";
import MailIcon from '@mui/icons-material/Mail';
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import { Stack } from "@mui/material";
import CustomizedButtons from "../CustomizedButtons";


const Footer = () => {
  return (
    <div>
      <footer className="px-32 bg-footer-color text-center lg:text-left ">
        <div className="py-10 text-center md:text-left">
          <div className=" flex justify-between">
            <div className=" w-[40%]">
              <img className=" h-20" src={process.env.PUBLIC_URL + "/img/logo.png"} alt="" />
              <h4 className=" mb-2 "> Ra đời với mong muốn là điểm nối của mỗi người với thiên nhiên bằng những sản phẩm chất lượng, sáng tạo, thuần Việt</h4>
              <h4 className=" mb-2 "><strong>Địa chỉ: </strong>37 Hoa Mai, Phường 2, Phú Nhuận, TP. Hồ Chí Minh</h4 >
              <h4 className=" mb-2 "><strong>Điện thoại: </strong>090 630 25 96 - 094 500 41 75</h4 >
              <h4 className=" mb-2 "><strong>Email: </strong>lejardin.terrarium@gmail.com</h4 >
            </div>
            <div className=" grid grid-cols-2 gap-5">
              <div className=" flex">
                <img className=" w-11 h-11 mr-2" src="https://bizweb.dktcdn.net/100/467/005/themes/879064/assets/policy_images_1.png?1695543284912" alt="" />
                <div>
                  <h3 className=" text-sm uppercase">Bảo hành vận chuyển</h3>
                  <span className=" text-xs">1 đổi 1 nếu sản phẩm bị lỗi, hư hỏng</span>
                </div>
              </div>
              <div className=" flex">
                <img className=" w-11 h-11 mr-2" src="https://bizweb.dktcdn.net/100/467/005/themes/879064/assets/policy_images_2.png?1695543284912" alt="" />
                <div>
                  <h3 className=" text-sm uppercase">Tuổi thọ sản phẩm cao</h3>
                  <span className=" text-xs">Đã có người nuôi Terrarium hơn 20 năm</span>
                </div>
              </div>
              <div className=" flex">
                <img className=" w-11 h-11 mr-2" src="https://bizweb.dktcdn.net/100/467/005/themes/879064/assets/policy_images_3.png?1695543284912" alt="" />
                <div>
                  <h3 className=" text-sm uppercase">Cam kết bảo hành thực vật</h3>
                  <span className=" text-xs">Bảo hành thích nghi thực vật 30 ngày</span>
                </div>
              </div>
              <div className=" flex">
                <img className=" w-11 h-11 mr-2" src="https://bizweb.dktcdn.net/100/467/005/themes/879064/assets/policy_images_4.png?1695543284912" alt="" />
                <div>
                  <h3 className=" text-sm uppercase">Thanh toán</h3>
                  <span className=" text-xs">Được bảo mật 100%</span>
                </div>
              </div>
              <div className=" w-full bg-white col-span-2 flex justify-center items-center flex-col p-4 border-dashed border border-black">
                <h3 className="mb-2">Nhận tin khuyến mãi từ cửa hàng</h3>
                <div className="flex items-center">
                  <input className="p-2 w-[550px] bg-footer-color mr-2" type="text" placeholder="Email của bạn ..." />
                  <CustomizedButtons variant="contained">Đăng ký</CustomizedButtons>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
