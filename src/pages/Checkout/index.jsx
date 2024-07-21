import { useDispatch, useSelector } from "react-redux";
import Pagelayout from "../../components/PageLayout";
import { decrease, increase, removeCart } from "../../redux/slices/cartSlice";
import { useNavigate } from "react-router";
import TextFields from "../../components/TextField";
import { useEffect, useState } from "react";
import SingleSelect from "../../components/Dropdown";
import { apiGetPublicDistricts, apiGetPublicProvinces, apiGetPublicWards } from "../../services/api/apiLocation";
import * as yup from "yup";
import { useFormik } from "formik";
import moment from "moment";
import { notification } from "../../utils/helper";
import { Link } from "react-router-dom";
import CartItemCheckout from "../Cart/CartItemCheckout";

let Checkout = () => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [formState, setFormState] = useState({
    province: 0,
    district: 0,
    ward: 0
  });
  const { cartList } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userEmail = JSON.parse(localStorage.getItem("userInfor")).email;
  const history = JSON.parse(localStorage.getItem("history")) ?? [];

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

  const totalPrice = cartList.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0
  );

  useEffect(() => {
    const fetchPublicProvince = async () => {
      const response = await apiGetPublicProvinces();
      if (response.status === 200) {
        setProvinces(response?.data.results);
      }
    };
    fetchPublicProvince();
  }, []);

  useEffect(() => {
    const fetchPublicDistrict = async () => {
      const response = await apiGetPublicDistricts(formState.province);
      if (response.status === 200) {
        setDistricts(response?.data.results);
      }
    };
    formState.province !== 0 && fetchPublicDistrict();
  }, [formState.province])

  useEffect(() => {
    const fetchPublicWard = async () => {
      const response = await apiGetPublicWards(formState.district);
      if (response.status === 200) {
        setWards(response?.data.results);
      }
    };
    formState.district && fetchPublicWard();
  }, [formState.district])

  const convertDataProvince = (array) => {
    const ProvinceList = array.map((item) => ({
      value: item.province_id,
      label: item.province_name,
    }));
    return ProvinceList;
  };

  const convertDataDistrict = (array) => {
    const DistrictList = array.map((item) => ({
      value: item.district_id,
      label: item.district_name,
    }));
    return DistrictList;
  };

  const convertDataWard = (array) => {
    const WardList = array.map((item) => ({
      value: item.ward_id,
      label: item.ward_name,
    }));
    return WardList;
  };

  const randomId = () => {
    return Math.floor(Math.random() * 99999)
  }

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

  const validationSchema = yup.object({
    email: yup.string().required("Vui lòng nhập email").email("Email không hợp lệ"),
    firstname: yup.string().required("Vui lòng nhập tên"),
    lastname: yup.string().required("Vui lòng nhập họ"),
    address: yup.string().required("Vui lòng nhập địa chỉ"),
    phone: yup.string().required("Vui lòng nhập số điện thoại").matches(phoneRegExp, 'Số điện thoại không hợp lệ').min(10, "Số điện thoại quá ngắn").max(10, "Số điện thoại quá dài")
  });

  const formik = useFormik({
    initialValues: {
      email: userEmail,
      firstname: "",
      lastname: "",
      address: "",
      phone: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const newData = {
        id: randomId(),
        email: values.email,
        firstname: values.firstname,
        lastname: values.lastname,
        province: provinces.filter(x => x.province_id == formState.province)[0].province_name,
        district: districts.filter(x => x.district_id == formState.district)[0].district_name,
        ward: wards.filter(x => x.ward_id == formState.ward)[0].ward_name,
        address: values.address,
        phone: values.phone,
        cart: [...cartList],
        totalPrice: totalPrice,
        dateplaced: moment()
      }
      notification("Order Success");
      localStorage.setItem("history", JSON.stringify([...history, newData]));
      localStorage.removeItem("cart");
      navigate("/");
    },
  });

  return (
    <Pagelayout>
      <p className=" mx-32 cursor-pointer">
        <Link to="/" className="text-sm hover:text-primary">Trang chủ |</Link> <Link to="/cart" className="text-sm hover:text-primary">Giỏ hàng |</Link> <span className="text-primary text-sm">Thanh toán</span>
        <hr />
      </p>
      {cartList.length === 0}
      <form
        onSubmit={formik.handleSubmit}
        className=" flex mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8 "
      >
        <div className="w-3/5 p-5">
          <p className="text-2xl font-semibold mb-4">Thông tin liên lạc</p>
          <TextFields
            name="Địa chỉ email"
            type="email"
            required={true}
            width="650px"
            value={formik.values.email}
            onChange={formik.handleChange("email")}
            helperText={
              formik.touched.email && formik.errors.email
            }
            error={
              formik.touched.email && Boolean(formik.errors.email)
            }
          />
          <p className="text-2xl font-semibold mt-6">Thông tin vận chuyển</p>
          <div className="flex gap-7">
            <TextFields
              name="Họ"
              required={true}
              width="311px"
              value={formik.values.lastname}
              onChange={formik.handleChange("lastname")}
              helperText={
                formik.touched.lastname && formik.errors.lastname
              }
              error={
                formik.touched.lastname && Boolean(formik.errors.lastname)
              }
            />
            <TextFields
              name="Tên"
              required={true}
              width="311px"
              value={formik.values.firstname}
              onChange={formik.handleChange("firstname")}
              helperText={
                formik.touched.firstname && formik.errors.firstname
              }
              error={
                formik.touched.firstname && Boolean(formik.errors.firstname)
              }
            />
          </div>
          <div className="flex gap-7">
            <SingleSelect
              name="Tỉnh / Thành phố"
              width="311px"
              options={convertDataProvince(provinces)}
              required={true}
              value={formState.province}
              onChange={(e) => setFormState({ ...formState, province: e.target.value })}
            />
            <SingleSelect
              name="Quận / Huyện"
              width="311px"
              options={convertDataDistrict(districts)}
              required={true}
              value={formState.district}
              onChange={(e) => setFormState({ ...formState, district: e.target.value })}
            />
          </div>
          <div className="flex gap-7">
            <SingleSelect
              name="Phường / Xã / Thị trấn"
              width="311px"
              options={convertDataWard(wards)}
              required={true}
              value={formState.ward}
              onChange={(e) => setFormState({ ...formState, ward: e.target.value })}
            />
            <TextFields
              name="Số nhà / Thôn"
              required={true}
              width="311px"
              value={formik.values.address}
              onChange={formik.handleChange("address")}
              helperText={
                formik.touched.address && formik.errors.address
              }
              error={
                formik.touched.address && Boolean(formik.errors.address)
              }
            />
          </div>
          <TextFields
            name="Số điện thoại"
            type="phone"
            required={true}
            width="650px"
            value={formik.values.phone}
            onChange={formik.handleChange("phone")}
            helperText={
              formik.touched.phone && formik.errors.phone
            }
            error={
              formik.touched.phone && Boolean(formik.errors.phone)
            }
          />
        </div>
        <div className="w-2/5 p-5 bg-white rounded-lg border shadow-md mt-5 mb-4">
          <p className="text-2xl font-semibold mb-4">Tổng quan đơn hàng</p>
          <div>
            <div class=" p-3 border-solid border ">
              <table class="w-[444px]">
                <thead>
                  <tr className="w-full">
                    <th class="text-left font-semibold w-1/3">Sản phẩm</th>
                    <th class="text-center font-semibold w-1/3">Số lượng</th>
                    <th class="text-center font-semibold w-1/3">Giá</th>
                  </tr>
                </thead>
                <tbody>
                  {cartList.length > 0 &&
                    cartList.map((item) => (
                      <CartItemCheckout
                        key={item.id}
                        item={item}
                        handleRemove={() => handleRemove(item)}
                        handleIncrease={() => handleIncrease(item)}
                        handleDecrease={() => handleDecrease(item)}
                      />
                    ))}
                  {cartList.length === 0 && (
                    <img src="https://i.imgur.com/TziGrmn.png" alt="not-found" />
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="bg-white p-2 ">
            <div className="flex justify-between">
              <p className="font-medium">Tạm tính</p>
              <p>{parseFloat(totalPrice).toLocaleString().replace(/,/g, '.')}đ</p>
            </div>
            <div className="flex justify-between mt-3">
              <p className="font-medium">Phí giao hàng</p>
              <p>0đ</p>
            </div>
            <div className="flex justify-between mt-3 font-semibold">
              <p>Thành tiền</p>
              <p>{parseFloat(totalPrice).toLocaleString().replace(/,/g, '.')}đ</p>
            </div>
          </div>
          <button
            type="submit"
            className="mb-1.5 w-full text-center text-white bg-primary hover:bg-second px-2 py-1.5 rounded-md mt-5"
          >
            Xác nhận đơn hàng
          </button>
        </div>
      </form>
    </Pagelayout>
  );
}

export default Checkout;
