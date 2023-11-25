import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { register, editUser, getListUser } from "../../../redux/slices/authSlice";
import { Box, Modal } from "@mui/material";
import { notification } from "../../../utils/helper";
import TextFields from "../../../components/TextField";

const CreateEditUser = ({ isShow = false, onClose, selectedUser }) => {
  const [open, setOpen] = useState(isShow);
  const { userData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const modalConfirmStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    p: "21px",
    pl: "32px",
    borderRadius: "10px",
  };

  useEffect(() => {
    setOpen(isShow);
  }, [isShow]);

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

  const userIds = userData.map((user) => user.id);
  let lastUserId = Math.max(...userIds);

  const formik = useFormik({
    initialValues: {
      firstname: selectedUser ? selectedUser.firstname : "",
      lastname: selectedUser ? selectedUser.lastname : "",
      email: selectedUser ? selectedUser.email : "",
      password: "",
      cpassword: "",
    },

    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (selectedUser) {
        await dispatch(
          editUser({
            id: selectedUser.id,
            firstname: values.firstname,
            lastname: values.lastname,
            email: values.email,
          })
        );
        dispatch(getListUser());
        onClose();
      } else {
        let checkExistEmail = userData.find((x) => x.email === values.email);
        if (checkExistEmail) {
          notification("Email tồn tại. Vui lòng thử lại", "error");
          onClose();
        } else {
          await dispatch(
            register({
              id: lastUserId + 1,
              firstname: values.firstname,
              lastname: values.lastname,
              email: values.email,
              password: values.password,
              isAdmin: false,
              avatar:
                "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg",
            })
          );
          dispatch(getListUser());
          onClose();
        }
      }
    },
  });

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalConfirmStyle}>
        <form onSubmit={formik.handleSubmit}>
          <p className="text-2xl font-semibold text-center my-5">
            {selectedUser ? "Cập nhật thông tin người dùng" : "Tạo mới người dùng"}
          </p>
          <div className="flex gap-x-5">
            <TextFields
              name="Họ"
              type="text"
              placeholder="Nguyễn"
              value={formik.values.lastname}
              onChange={formik.handleChange("lastname")}
              required={true}
              helperText={formik.touched.lastname && formik.errors.lastname}
              error={formik.touched.lastname && Boolean(formik.errors.lastname)}
              width="181px"
            />
            <TextFields
              name="Tên"
              type="text"
              placeholder="Văn A"
              value={formik.values.firstname}
              onChange={formik.handleChange("firstname")}
              required={true}
              helperText={formik.touched.firstname && formik.errors.firstname}
              error={formik.touched.firstname && Boolean(formik.errors.firstname)}
              width="181px"
            />
          </div>
          <TextFields
            name="Email"
            type="email"
            placeholder="email@gmail.com"
            value={formik.values.email}
            onChange={formik.handleChange("email")}
            required={true}
            helperText={formik.touched.email && formik.errors.email}
            error={formik.touched.email && Boolean(formik.errors.email)}
            width="382px"
          />

          {!selectedUser && ( // Chỉ hiển thị mật khẩu và xác nhận mật khẩu khi thêm mới, không hiển thị khi sửa
            <>
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
              <TextFields
                name="Xác nhận mật khẩu"
                type="password"
                placeholder="••••••••"
                value={formik.values.cpassword}
                onChange={formik.handleChange("cpassword")}
                required={true}
                helperText={formik.touched.cpassword && formik.errors.cpassword}
                error={formik.touched.cpassword && Boolean(formik.errors.cpassword)}
                width="382px"
              />
            </>
          )}

          <button
            type="submit"
            className="uppercase w-full h-10 mt-5 mb-5 bg-gradient-to-r from-primary to-second text-white rounded-md"
          >
            {selectedUser ? "Cập nhật" : "Đăng Ký"}
          </button>
        </form>
      </Box>
    </Modal>
  );
};

export default CreateEditUser;
