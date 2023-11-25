import { useState } from "react";
import CustomizedButtons from "../../../components/CustomizedButtons"
import PageLayoutAdmin from "../PageLayoutAdmin/PageLayoutAdmin"
import UserTable from "./UserTable"

let UserManagement = () => {
  const [isCreate, setIsCreate] = useState(false);


  const handleCreate = () => {
    setIsCreate(true);
  };

  return (
    <PageLayoutAdmin>
      <div className="px-5">
        <div className="flex justify-between">
          <p className="font-bold text-2xl mb-5">Quản lý người dùng</p>
          <CustomizedButtons onClick={handleCreate}>Thêm người dùng</CustomizedButtons>
        </div>
        <UserTable isCreate={isCreate} setIsCreate={setIsCreate} />
      </div>
    </PageLayoutAdmin>
  )
}

export default UserManagement