import * as yup from "yup";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
// import Pagelayout from "../components/Pagelayout";
// import TextFields from "../components/TextField/TextField";
import { getListUser, register } from "../../redux/slices/authSlice";
import { notification } from "../../utils/helper";
import TextFields from "../../components/TextField";

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userData } = useSelector(state => state.auth)

    const validationSchema = yup.object({
        firstname: yup.string().required("Chưa nhập tên"),
        lastname: yup.string().required("Chưa nhập họ"),
        email: yup
            .string()
            .required("Chưa nhập email")
            .email("Chưa nhập đúng định dạng email"),
        password: yup
            .string()
            .required("Chưa nhập mật khẩu")
            .min(6, "Mật khẩu tối thiểu 6 ký tự"),
        cpassword: yup
            .string()
            .required("Chưa nhập xác nhận mật khẩu")
            .oneOf([yup.ref("password")], "Mật khẩu không trùng khớp"),
    });

    const randomId = () => {
        return Math.floor(Math.random() * 9999)
    }

    const formik = useFormik({
        initialValues: {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            cpassword: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const newData = {
                id: randomId(),
                firstname: values.firstname,
                lastName: values.lastname,
                email: values.email,
                password: values.password,
                isAdmin: false,
                avatar: "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg"
            }
            let checkExistEmail = userData.find(x => x.email === values.email)
            if (checkExistEmail) {
                notification("Email tồn tại. Vui lòng thử lại", 'error');
            } else {
                dispatch(register(newData))
                // notification("Đăng ký thành công");
                navigate('/login');
            }
        },
    });

    const onEnter = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            formik.handleSubmit();
        }
    };

    useEffect(() => {
        dispatch(getListUser())
    }, []);

    return (
        <section className="bg-gray-50">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <Link to="/" className="flex items-center mb-2 text-2xl font-semibold text-gray-900">
                    <img className=" h-20" src="./img/logo.png" alt="logo" />
                </Link>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Đăng ký
                        </h1>
                        <form
                            onKeyDown={(e) => onEnter(e)}
                            onSubmit={formik.handleSubmit}
                        >
                            <div className="flex gap-x-5">
                                <TextFields
                                    name="Họ"
                                    type="text"
                                    placeholder='Nguyễn'
                                    value={formik.values.lastname}
                                    onChange={formik.handleChange("lastname")}
                                    required={true}
                                    helperText={formik.touched.lastname && formik.errors.lastname}
                                    error={
                                        formik.touched.lastname && Boolean(formik.errors.lastname)
                                    }
                                    width="181px"
                                />
                                <TextFields
                                    name="Tên"
                                    type="text"
                                    placeholder='Văn A'
                                    value={formik.values.firstname}
                                    onChange={formik.handleChange("firstname")}
                                    required={true}
                                    helperText={
                                        formik.touched.firstname && formik.errors.firstname
                                    }
                                    error={
                                        formik.touched.firstname && Boolean(formik.errors.firstname)
                                    }
                                    width="181px"
                                />
                            </div>

                            <TextFields
                                name="Email"
                                type="email"
                                placeholder='email@gmail.com'
                                value={formik.values.email}
                                onChange={formik.handleChange("email")}
                                required={true}
                                helperText={formik.touched.email && formik.errors.email}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                width="382px"
                            />

                            <TextFields
                                name="Mật khẩu"
                                type="password"
                                placeholder="••••••••"
                                value={formik.values.password}
                                onChange={formik.handleChange("password")}
                                required={true}
                                helperText={formik.touched.password && formik.errors.password}
                                error={
                                    formik.touched.password && Boolean(formik.errors.password)
                                }
                                width="382px"
                            />
                            <TextFields
                                name="Xác nhận mật khẩu"
                                type="password"
                                placeholder="••••••••"
                                value={formik.values.cpassword}
                                onChange={formik.handleChange("cpassword")}
                                required={true}
                                helperText={formik.touched.cpassword && formik.errors.cpassword}
                                error={
                                    formik.touched.cpassword && Boolean(formik.errors.cpassword)
                                }
                                width="382px"
                            />
                            <button
                                type="submit"
                                className="w-full text-white mb-5 bg-primary hover:opacity-70 font-medium rounded-lg text-sm px-5 py-2.5 text-center600 uppercase">
                                Đăng ký
                            </button>
                            <p className="text-sm font-light text-gray-500">
                                Bạn đã có tài khoản? <Link to="/login" className="font-medium text-primary hover:underline">Đăng nhập</Link>
                            </p>

                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Register;