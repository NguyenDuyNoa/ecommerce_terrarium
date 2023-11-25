import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { editProduct, addProduct, getProductLists } from "../../../redux/slices/productSlice";
import { Box, Modal } from "@mui/material";
import TextFields from "../../../components/TextField";

const CreateEditProduct = ({ isShow = false, onClose, selectedProduct }) => {
  const [open, setOpen] = useState(isShow);
  const { listProducts } = useSelector((state) => state.product);
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
    category: yup.string().required("Chưa nhập phân loại"),
    img: yup.string().required("Chưa nhập link hình ảnh"),
    name: yup.string().required("Chưa nhập tên sản phẩm"),
    price: yup.string().required("Chưa nhập giá tiền"),
  });

  const productIds = listProducts.map((product) => product.id);
  let lastProductId = Math.max(...productIds);

  const formik = useFormik({
    initialValues: {
      category: selectedProduct ? selectedProduct.category : "",
      img: selectedProduct ? selectedProduct.img : "",
      name: selectedProduct ? selectedProduct.name : "",
      type: selectedProduct ? selectedProduct.type : "",
      typeSub: selectedProduct ? selectedProduct.typeSub : "",
      size: selectedProduct ? selectedProduct.size : "",
      plants: selectedProduct ? selectedProduct.plants : "",
      design: selectedProduct ? selectedProduct.design : "",
      accessory: selectedProduct ? selectedProduct.accessory : "",
      uses: selectedProduct ? selectedProduct.uses : "",
      note: selectedProduct ? selectedProduct.note : "",
      price: selectedProduct ? selectedProduct.price : "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (selectedProduct) {
        await dispatch(
          editProduct({
            id: selectedProduct.id,
            category: values.category,
            img: values.img,
            name: values.name,
            type: values.type,
            typeSub: values.typeSub,
            size: values.size,
            plants: values.plants,
            design: values.design,
            accessory: values.accessory,
            uses: values.uses,
            note: values.note,
            price: values.price,
          })
        );
        dispatch(getProductLists());
        onClose();
      } else {
        await dispatch(
          addProduct({
            id: lastProductId + 1,
            category: values.category,
            img: values.img,
            name: values.name,
            type: values.type,
            typeSub: values.typeSub,
            size: values.size,
            plants: values.plants,
            design: values.design,
            accessory: values.accessory,
            uses: values.uses,
            note: values.note,
            price: values.price,
          })
        );
        dispatch(getProductLists());
        onClose();
      }
    },
  });

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalConfirmStyle}>
        <form onSubmit={formik.handleSubmit}>
          <p className="text-2xl font-semibold text-center my-5">
            {selectedProduct ? "Cập nhật thông tin sản phẩm" : "Tạo mới sản phẩm"}
          </p>
          <div className="flex gap-x-5">
            <TextFields
              name="Phân loại"
              type="text"
              value={formik.values.category}
              onChange={formik.handleChange("category")}
              required={true}
              helperText={formik.touched.category && formik.errors.category}
              error={formik.touched.category && Boolean(formik.errors.category)}
              width="382px"
            />
            <TextFields
              name="Link hình ảnh"
              type="text"
              value={formik.values.img}
              onChange={formik.handleChange("img")}
              required={true}
              helperText={formik.touched.img && formik.errors.img}
              error={formik.touched.img && Boolean(formik.errors.img)}
              width="382px"
            />
            <TextFields
              name="Tên sản phẩm"
              type="text"
              value={formik.values.name}
              onChange={formik.handleChange("name")}
              required={true}
              helperText={formik.touched.name && formik.errors.name}
              error={formik.touched.name && Boolean(formik.errors.name)}
              width="382px"
            />
          </div>

          <div className="flex gap-x-5">
            <TextFields
              name="Loại bình"
              type="text"
              value={formik.values.type}
              onChange={formik.handleChange("type")}
              required={true}
              helperText={formik.touched.type && formik.errors.type}
              error={formik.touched.type && Boolean(formik.errors.type)}
              width="382px"
            />

            <TextFields
              name="Mô tả bình"
              type="text"
              value={formik.values.typeSub}
              onChange={formik.handleChange("typeSub")}
              required={true}
              helperText={formik.touched.typeSub && formik.errors.typeSub}
              error={formik.touched.typeSub && Boolean(formik.errors.typeSub)}
              width="382px"
            />
            <TextFields
              name="Kích thước"
              type="text"
              value={formik.values.size}
              onChange={formik.handleChange("size")}
              required={true}
              helperText={formik.touched.size && formik.errors.size}
              error={formik.touched.size && Boolean(formik.errors.size)}
              width="382px"
            />
          </div>

          <div className="flex gap-x-5">
            <TextFields
              name="Loại cây"
              type="text"
              value={formik.values.plants}
              onChange={formik.handleChange("plants")}
              required={true}
              helperText={formik.touched.plants && formik.errors.plants}
              error={formik.touched.plants && Boolean(formik.errors.plants)}
              width="382px"
            />
            <TextFields
              name="Thiết kế"
              type="text"
              value={formik.values.design}
              onChange={formik.handleChange("design")}
              required={true}
              helperText={formik.touched.design && formik.errors.design}
              error={formik.touched.design && Boolean(formik.errors.design)}
              width="382px"
            />

            <TextFields
              name="Phụ kiện"
              type="text"
              value={formik.values.accessory}
              onChange={formik.handleChange("accessory")}
              required={true}
              helperText={formik.touched.accessory && formik.errors.accessory}
              error={formik.touched.accessory && Boolean(formik.errors.accessory)}
              width="382px"
            />
          </div>



          <div className="flex gap-x-5">
            <TextFields
              name="Công dụng"
              type="text"
              value={formik.values.uses}
              onChange={formik.handleChange("uses")}
              required={true}
              helperText={formik.touched.uses && formik.errors.uses}
              error={formik.touched.uses && Boolean(formik.errors.uses)}
              width="382px"
            />

            <TextFields
              name="Lưu ý"
              type="text"
              value={formik.values.note}
              onChange={formik.handleChange("note")}
              required={true}
              helperText={formik.touched.note && formik.errors.note}
              error={formik.touched.note && Boolean(formik.errors.note)}
              width="382px"
            />

            <TextFields
              name="Giá tiền"
              type="number"
              value={formik.values.price}
              onChange={formik.handleChange("price")}
              required={true}
              helperText={formik.touched.price && formik.errors.price}
              error={formik.touched.price && Boolean(formik.errors.price)}
              width="382px"
            />
          </div>
          
          <button
            type="submit"
            className="uppercase w-full h-10 mt-5 mb-5 bg-gradient-to-r from-primary to-second text-white rounded-md"
          >
            {selectedProduct ? "Cập nhật" : "Thêm mới"}
          </button>
        </form>
      </Box>
    </Modal>
  );
};

export default CreateEditProduct;
