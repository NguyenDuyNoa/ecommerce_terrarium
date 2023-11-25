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
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteProduct, getProductLists } from "../../../redux/slices/productSlice";
import CreateEditProduct from "./create-edit-Product";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    padding: '16px 10px',
    fontWeight: 'bold',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: '16px 4px',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
    maxHeight: '40px'
  },
}));

let ProductTable = ({ isCreate, setIsCreate }) => {
  const { listProducts } = useSelector((state) => state.product);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductLists());
  }, [dispatch]);

  const handleEdit = (id) => {
    const selectedProduct = listProducts.find(product => product.id === id);
    setSelectedProduct(selectedProduct);
    setIsCreate(true);
  };

  const handleDelete = async (userId) => {
    await dispatch(deleteProduct(userId));
    dispatch(getProductLists());
  };

  const handleCloseModal = () => {
    setIsCreate(false);
    setSelectedProduct(null); 
  };

  return (
    <div className="mb-5">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">ID</StyledTableCell>
              <StyledTableCell align="center">Phân loại</StyledTableCell>
              <StyledTableCell align="center">Hình ảnh</StyledTableCell>
              <StyledTableCell align="center">Tên</StyledTableCell>
              <StyledTableCell align="center">Loại bình</StyledTableCell>
              <StyledTableCell align="center">Mô tả bình</StyledTableCell>
              <StyledTableCell align="center">Kích thước</StyledTableCell>
              <StyledTableCell align="center">Loại cây</StyledTableCell>
              <StyledTableCell align="center">Thiết kế</StyledTableCell>
              <StyledTableCell align="center">Phụ kiện</StyledTableCell>
              <StyledTableCell align="center">Công dụng</StyledTableCell>
              <StyledTableCell align="center">Lưu ý</StyledTableCell>
              <StyledTableCell align="center">Giá tiền</StyledTableCell>
              <StyledTableCell align="center">Hành động</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listProducts.length > 0 &&
              listProducts.map((item) => (
                <StyledTableRow key={item.id}>
                  <StyledTableCell align="center"><div className=" w-[20px]">{item.id}</div></StyledTableCell>
                  <StyledTableCell align="center"><div className=" w-[20px]">{item.category}</div></StyledTableCell>
                  <StyledTableCell align="center"><img className=" w-[40px]" src={item.img} alt="not-found" /></StyledTableCell>
                  <StyledTableCell align="center"><div className=" truncate w-[80px]">{item.name}</div></StyledTableCell>
                  <StyledTableCell align="center"><div className=" truncate w-[80px]">{item.type}</div></StyledTableCell>
                  <StyledTableCell align="center"><div className=" truncate w-[80px]">{item.typeSub}</div></StyledTableCell>
                  <StyledTableCell align="center"><div className=" truncate w-[80px]">{item.size}</div></StyledTableCell>
                  <StyledTableCell align="center"><div className=" truncate w-[80px]">{item.plants}</div></StyledTableCell>
                  <StyledTableCell align="center"><div className=" truncate w-[80px]">{item.design}</div></StyledTableCell>
                  <StyledTableCell align="center"><div className=" truncate w-[80px]">{item.accessory}</div></StyledTableCell>
                  <StyledTableCell align="center"><div className=" truncate w-[80px]">{item.uses}</div></StyledTableCell>
                  <StyledTableCell align="center"><div className=" truncate w-[80px]">{item.note}</div></StyledTableCell>
                  <StyledTableCell align="center"><div className=" truncate w-[80px]">{parseFloat(item.price).toLocaleString().replace(/,/g, '.')}₫</div></StyledTableCell>
                  <StyledTableCell align="center">
                    <div className="flex gap-3">
                      <div onClick={() => handleEdit(item.id)} className="w-10 h-10 bg-red-500 rounded flex justify-center items-center cursor-pointer" >
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
        <CreateEditProduct
          isShow={isCreate}
          onClose={handleCloseModal}
          selectedProduct={selectedProduct}
        />
      )}
    </div>
  );
}
export default ProductTable
