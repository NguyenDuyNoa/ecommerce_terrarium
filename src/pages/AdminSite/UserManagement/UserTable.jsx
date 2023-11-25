import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material";
import { deleteUser, getListUser } from "../../../redux/slices/authSlice";
import CreateEditUser from "./create-edit-User";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

let UserTable = ({ isCreate, setIsCreate }) => {
  const { userData } = useSelector((state) => state.auth);
  const [selectedUser, setSelectedUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListUser());
  }, [dispatch]);

  const handleEdit = (id) => {
    const selectedUser = userData.find(user => user.id === id);
    setSelectedUser(selectedUser);
    setIsCreate(true);
    console.log("handleEdit: ", selectedUser)
  };

  const handleDelete = async (userId) => {
    await dispatch(deleteUser(userId));
    dispatch(getListUser());
  };

  const handleCloseModal = () => {
    setIsCreate(false);
    setSelectedUser(null);
  };

  return (
    <div className="mb-5">
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 700 }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">ID</StyledTableCell>
              <StyledTableCell align="center">Ảnh đại diện</StyledTableCell>
              <StyledTableCell align="center">Họ</StyledTableCell>
              <StyledTableCell align="center">Tên</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">Phân quyền</StyledTableCell>
              <StyledTableCell align="center">Chức năng</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData.length > 0 &&
              userData.map((item, index) => (
                <StyledTableRow key={item.id}>
                  <StyledTableCell align="center">{item.id}</StyledTableCell>
                  <StyledTableCell align="center">
                    <div className=" flex justify-center">
                      <img
                        className="w-10 rounded-full"
                        src={item.avatar}
                        alt="not-found"
                      />
                    </div>
                  </StyledTableCell>
                  <StyledTableCell align="center">{item.lastname}</StyledTableCell>
                  <StyledTableCell align="center">{item.firstname}</StyledTableCell>
                  <StyledTableCell align="center">{item.email}</StyledTableCell>
                  <StyledTableCell align="center">{item.isAdmin ? "Admin" : "Người dùng"}</StyledTableCell>
                  <StyledTableCell align="center">
                    <div className="flex gap-3 justify-center">
                      <div onClick={() => handleEdit(item.id)} className="w-10 h-10 bg-red-500 rounded flex justify-center items-center cursor-pointer">
                        <EditIcon className="text-white" />
                      </div>
                      <div onClick={() => handleDelete(item.id)} className="w-10 h-10 bg-red-700 rounded flex justify-center items-center cursor-pointer">
                        <DeleteIcon className="text-white" />
                      </div>
                    </div>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {isCreate && (
        <CreateEditUser
          isShow={isCreate}
          onClose={handleCloseModal}
          selectedUser={selectedUser}
        />
      )}
    </div>
  );
}

export default UserTable;
