import { useState } from "react";
import CustomizedButtons from "../../../components/CustomizedButtons";
import PageLayoutAdmin from "../PageLayoutAdmin/PageLayoutAdmin";
import ProductTable from "./ProductTable";

let ProductManagement = () => {
  const [isCreate, setIsCreate] = useState(false);

  const handleCreate = () => {
    setIsCreate(true);
  };

  return (
    <PageLayoutAdmin>
      <div className="px-5">
        <div className="flex justify-between">
          <p className="font-bold text-2xl mb-5">Quản lý sản phẩm</p>
          <CustomizedButtons onClick={handleCreate}>Thêm sản phẩm</CustomizedButtons>
        </div>
        <ProductTable isCreate={isCreate} setIsCreate={setIsCreate} />
      </div>
    </PageLayoutAdmin>
  );
}

export default ProductManagement;
