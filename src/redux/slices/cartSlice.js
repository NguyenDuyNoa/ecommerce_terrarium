import { createSlice } from "@reduxjs/toolkit";
import { notification } from "../../utils/helper";
const cartList = JSON.parse(localStorage.getItem("cart")) || []

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    isLoading: false,
    cartList: [...cartList],
    isSuccess: false,
    isError: false,
    message: "",
  },
  reducers: {
    addToCart: (state, action) => {
      let index = state.cartList.findIndex((x) => x.id == action.payload.id);
      //hàm findIndex nếu có thì trả về cái vị trí thành phần đó trong mảng, nếu không trả về -1
      if (index !== -1) {
        state.cartList[index].quantity += 1
      } else {
        state.cartList.push(action.payload);
      }
      state.cartList = [...state.cartList];
      localStorage.setItem("cart",JSON.stringify(state.cartList))
      notification('Thêm thành công')
    },
    increase: (state, action) => {
      let index = state.cartList.findIndex((x) => x.id == action.payload.id);
      if (index !== -1) {
        state.cartList[index].quantity += 1
      }
      state.cartList = [...state.cartList];
      localStorage.setItem("cart",JSON.stringify(state.cartList))
    },
    decrease: (state, action) => {
      let index = state.cartList.findIndex((x) => x.id == action.payload.id);
      if (index !== -1) {
        state.cartList[index].quantity -= 1
      }
      state.cartList = [...state.cartList];
      localStorage.setItem("cart",JSON.stringify(state.cartList))
    },
    removeCart: (state, action) => {
      let index = state.cartList.findIndex((x) => x.id == action.payload.id);
      if (index !== -1) {
        //Xóa đối tượng
        state.cartList.splice(index,1)
      }
      state.cartList = [...state.cartList];
      localStorage.setItem("cart",JSON.stringify(state.cartList))
      notification('Xóa sản phẩm thành công')
    }
  },
});

export const { addToCart, increase, decrease ,removeCart} = cartSlice.actions;
export default cartSlice.reducer;
