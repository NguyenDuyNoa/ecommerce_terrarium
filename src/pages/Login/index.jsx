import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import TextFields from "../../components/TextField";
import { login } from "../../redux/slices/authSlice";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLogin } = useSelector((state) => state.auth);
    const [tokenLogin, setTokenLogin] = useState(null);

    const validationSchema = yup.object({
        email: yup
            .string()
            .required("Chưa nhập email")
            .email("Chưa nhập đúng định dạng email"),
        password: yup.string().required("Chưa nhập password"),
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            dispatch(
                login({
                    email: values.email,
                    password: values.password,
                })
            );
            setTokenLogin(localStorage.getItem("token"));
        },
    });

    const onEnter = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            formik.handleSubmit();
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        setTokenLogin(token);
    }, [tokenLogin]);

    return (
        <div className="bg-gray-50">
            {(isLogin || tokenLogin) && navigate("/")}
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <Link to="/" className="flex items-center mb-2 text-2xl font-semibold text-gray-900">
                    <img className=" h-20" src="https://i.imgur.com/ud1SueH.png" alt="logo" />
                </Link>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Đăng nhập
                        </h1>
                        <form
                            onSubmit={formik.handleSubmit}
                            onKeyDown={(e) => onEnter(e)}
                            className="space-y-4 md:space-y-6"
                        >
                            <div className="mb-5">
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
                            </div>
                            <div className="mb-5">
                                <TextFields
                                    name="Mật khẩu"
                                    type="password"
                                    placeholder="••••••••"
                                    value={formik.values.password}
                                    onChange={formik.handleChange("password")}
                                    required={true}
                                    helperText={formik.touched.password && formik.errors.password}
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    width="382px"
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary" required="" />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label for="remember" className="text-gray-500">Nhớ mật khẩu</label>
                                    </div>
                                </div>
                                <Link href="#" className="text-sm font-medium text-primary hover:underline">Quên mật khẩu?</Link>
                            </div>
                            <button
                                type="submit"
                                className="w-full text-white bg-primary hover:opacity-70 font-medium rounded-lg text-sm px-5 py-2.5 text-center600 "
                            >
                                Đăng nhập
                            </button>
                            <p className="text-sm font-light text-gray-500">
                                Bạn chưa có tài khoản? <Link to="/register" className="font-medium text-primary hover:underline">Đăng ký</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;